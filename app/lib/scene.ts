/**
 * Renderizador de escenas de tráfico (cruces, rotondas, tramos) en SVG,
 * para las preguntas de prioridad / maniobras, al estilo de las imágenes
 * esquemáticas del examen. Sin dependencias.
 *
 * Convenciones: vista cenital, norte arriba. Los brazos del cruce son
 * N, E, S, W. "arm" = por dónde llega el vehículo; "turn" = adónde va.
 * El vehículo marcado `you: true` es el del candidato (dibujado en azul).
 */

export type Arm = 'N' | 'E' | 'S' | 'W'
export type Turn = 'straight' | 'left' | 'right' | 'none'
export type VehicleKind = 'car' | 'tram' | 'bike' | 'truck' | 'bus' | 'emergency' | 'moto'

export interface SceneVehicle {
  /** Etiqueta mostrada (A, B, C… o «moi»). */
  id: string
  kind?: VehicleKind
  arm: Arm
  turn?: Turn
  you?: boolean
  /** Distancia al cruce, 0 = pegado, 1 = lejos (default 0). */
  back?: number
  /** Luz azul / sirena (vehículo prioritario). */
  siren?: boolean
}

export type SceneSign = 'B1' | 'B5' | 'B9' | 'B15' | 'B17' | 'C1' | 'C3' | 'F19' | 'light-red' | 'light-green' | 'light-orange' | 'light-blink'

export interface Scene {
  type: 'cross' | 'T' | 'roundabout' | 'road' | 'merge'
  /** Para 'T': brazo que falta (default 'N'). */
  missing?: Arm
  /** Señales/semáforos por brazo (lo que ve el conductor que llega por ese brazo). */
  signs?: Partial<Record<Arm, SceneSign>>
  vehicles: SceneVehicle[]
  /** Paso de peatones en un brazo, con peatón opcional. */
  crossing?: { arm: Arm; pedestrian?: boolean }
  /** Raíles de tranvía en el eje E–W (default) o N–S. */
  tramRails?: 'EW' | 'NS'
  /** Sentido único: brazos por los que NO se puede entrar al cruce (flecha). */
  oneWay?: Arm[]
  /** Vía prioritaria dibujada más ancha (B9) sobre un eje. */
  mainAxis?: 'EW' | 'NS'
  /** Texto opcional bajo la escena. */
  caption?: string
}

const W = 320
const ROAD = 92
const C = W / 2
const COLORS: Record<string, string> = {
  you: '#1d5bbf',
  A: '#d1232a',
  B: '#1a8f4c',
  C: '#e0a800',
  D: '#8e44ad',
  tram: '#555',
  bike: '#111',
  emergency: '#fff',
}

/** Rotación para que un elemento dibujado "llegando desde el sur, mirando al norte" quede en el brazo dado. */
function rot(arm: Arm): number {
  return { S: 0, W: 90, N: 180, E: 270 }[arm]
}

function vehicleShape(v: SceneVehicle, color: string): string {
  const k = v.kind ?? 'car'
  if (k === 'tram') return `<rect x="-11" y="-30" width="22" height="60" rx="4" fill="${color}" stroke="#fff" stroke-width="2"/><rect x="-7" y="-24" width="14" height="10" fill="#fff" opacity="0.8"/><rect x="-7" y="-10" width="14" height="10" fill="#fff" opacity="0.8"/><rect x="-7" y="4" width="14" height="10" fill="#fff" opacity="0.8"/>`
  if (k === 'bike' || k === 'moto') return `<circle cx="0" cy="-10" r="4" fill="none" stroke="${color}" stroke-width="2.5"/><circle cx="0" cy="8" r="4" fill="none" stroke="${color}" stroke-width="2.5"/><line x1="0" y1="-6" x2="0" y2="4" stroke="${color}" stroke-width="3"/><line x1="-7" y1="-4" x2="7" y2="-4" stroke="${color}" stroke-width="3"/>`
  if (k === 'truck' || k === 'bus') return `<rect x="-12" y="-28" width="24" height="56" rx="4" fill="${color}" stroke="#fff" stroke-width="2"/><rect x="-9" y="-24" width="18" height="8" fill="#fff" opacity="0.8"/>`
  const siren = v.siren ? `<circle cx="0" cy="-2" r="4" fill="#2d7cff" stroke="#fff" stroke-width="1"/>` : ''
  const fill = k === 'emergency' ? '#f4f4f4' : color
  const stroke = k === 'emergency' ? '#d1232a' : '#fff'
  return `<rect x="-11" y="-20" width="22" height="40" rx="5" fill="${fill}" stroke="${stroke}" stroke-width="2"/><rect x="-8" y="-14" width="16" height="7" rx="2" fill="#fff" opacity="0.85"/><rect x="-8" y="8" width="16" height="5" rx="2" fill="#fff" opacity="0.6"/>${siren}`
}

/** Flecha de trayectoria desde el vehículo (en coordenadas locales: llega desde el sur). */
function pathArrow(turn: Turn, color: string, back: number): string {
  if (turn === 'none') return ''
  const y0 = -24 // morro del vehículo
  const d = 40 + back * 26
  if (turn === 'straight') return `<path d="M0 ${y0} v-${d + 36}" stroke="${color}" stroke-width="3" fill="none" marker-end="url(#ah-${color.slice(1)})"/>`
  if (turn === 'right') return `<path d="M0 ${y0} v-${d} a16 16 0 0 1 16 -16 h28" stroke="${color}" stroke-width="3" fill="none" marker-end="url(#ah-${color.slice(1)})"/>`
  return `<path d="M0 ${y0} v-${d + 18} a22 22 0 0 0 -22 -22 h-30" stroke="${color}" stroke-width="3" fill="none" marker-end="url(#ah-${color.slice(1)})"/>`
}

function signSvg(s: SceneSign): string {
  switch (s) {
    case 'B1':
      return `<polygon points="-10,-9 10,-9 0,9" fill="#fff" stroke="#d1232a" stroke-width="3"/>`
    case 'B5':
      return `<polygon points="-6,-10 6,-10 10,-6 10,6 6,10 -6,10 -10,6 -10,-6" fill="#d1232a" stroke="#fff" stroke-width="1.5"/><text x="0" y="3" font-size="6" font-weight="700" text-anchor="middle" fill="#fff" font-family="Arial">STOP</text>`
    case 'B9':
      return `<polygon points="0,-11 11,0 0,11 -11,0" fill="#fff" stroke="#333" stroke-width="1"/><polygon points="0,-6 6,0 0,6 -6,0" fill="#f6c700"/>`
    case 'B15':
      return `<polygon points="0,-11 11,9 -11,9" fill="#fff" stroke="#d1232a" stroke-width="2.5"/><rect x="-1.5" y="-4" width="3" height="11" fill="#111"/><rect x="-5" y="2" width="10" height="2" fill="#888"/>`
    case 'B17':
      return `<polygon points="0,-11 11,9 -11,9" fill="#fff" stroke="#d1232a" stroke-width="2.5"/><path d="M0 -4 v11 M-5 2 h10" stroke="#111" stroke-width="2"/>`
    case 'C1':
      return `<circle r="10" fill="#d1232a"/><rect x="-6" y="-2" width="12" height="4" fill="#fff"/>`
    case 'C3':
      return `<circle r="10" fill="#fff" stroke="#d1232a" stroke-width="3"/>`
    case 'F19':
      return `<rect x="-10" y="-10" width="20" height="20" rx="2" fill="#1d5bbf"/><path d="M-6 0 h8 v-4 l5 4 l-5 4 v-4" fill="#fff"/>`
    case 'light-red':
    case 'light-green':
    case 'light-orange':
    case 'light-blink': {
      const col = s === 'light-red' ? '#d1232a' : s === 'light-green' ? '#2ecc71' : '#f0a500'
      const extra = s === 'light-blink' ? `<text x="0" y="22" font-size="7" text-anchor="middle" fill="#333" font-family="Arial">clignote</text>` : ''
      return `<rect x="-6" y="-14" width="12" height="28" rx="3" fill="#111"/><circle cy="-8" r="3.5" fill="${s === 'light-red' ? col : '#3a3a3a'}"/><circle cy="0" r="3.5" fill="${s === 'light-orange' || s === 'light-blink' ? col : '#3a3a3a'}"/><circle cy="8" r="3.5" fill="${s === 'light-green' ? col : '#3a3a3a'}"/>${extra}`
    }
  }
}

export function renderScene(sc: Scene): string {
  const parts: string[] = []
  const defs = new Set<string>()
  const arrow = (color: string) => {
    defs.add(`<marker id="ah-${color.slice(1)}" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="5" markerHeight="5" orient="auto-start-reverse"><path d="M0 0 L10 5 L0 10z" fill="${color}"/></marker>`)
  }

  parts.push(`<rect width="${W}" height="${W}" fill="#dfe9d3"/>`)

  if (sc.type === 'roundabout') {
    parts.push(`<rect x="${C - ROAD / 2}" y="0" width="${ROAD}" height="${W}" fill="#6b6b6b"/><rect x="0" y="${C - ROAD / 2}" width="${W}" height="${ROAD}" fill="#6b6b6b"/>`)
    parts.push(`<circle cx="${C}" cy="${C}" r="78" fill="#6b6b6b"/><circle cx="${C}" cy="${C}" r="34" fill="#dfe9d3" stroke="#fff" stroke-width="2"/>`)
    // flechas del anillo
    parts.push(`<path d="M${C + 56} ${C} a56 56 0 0 1 -56 56" stroke="#fff" stroke-width="2" fill="none" stroke-dasharray="6 5"/><path d="M${C - 56} ${C} a56 56 0 0 1 56 -56" stroke="#fff" stroke-width="2" fill="none" stroke-dasharray="6 5"/>`)
  } else if (sc.type === 'road' || sc.type === 'merge') {
    parts.push(`<rect x="${C - ROAD / 2}" y="0" width="${ROAD}" height="${W}" fill="#6b6b6b"/>`)
    parts.push(`<line x1="${C}" y1="0" x2="${C}" y2="${W}" stroke="#fff" stroke-width="2" stroke-dasharray="14 10"/>`)
    if (sc.type === 'merge') parts.push(`<path d="M${C + ROAD / 2} ${W} v-120 l40 -40 v-10 h30 v10 l-70 70z" fill="#6b6b6b"/>`)
  } else {
    const arms: Arm[] = sc.type === 'T' ? (['N', 'E', 'S', 'W'] as Arm[]).filter((a) => a !== (sc.missing ?? 'N')) : ['N', 'E', 'S', 'W']
    const wide = (axis: 'EW' | 'NS') => (sc.mainAxis === axis ? ROAD + 16 : ROAD)
    for (const a of arms) {
      if (a === 'N') parts.push(`<rect x="${C - wide('NS') / 2}" y="0" width="${wide('NS')}" height="${C}" fill="#6b6b6b"/>`)
      if (a === 'S') parts.push(`<rect x="${C - wide('NS') / 2}" y="${C}" width="${wide('NS')}" height="${C}" fill="#6b6b6b"/>`)
      if (a === 'W') parts.push(`<rect x="0" y="${C - wide('EW') / 2}" width="${C}" height="${wide('EW')}" fill="#6b6b6b"/>`)
      if (a === 'E') parts.push(`<rect x="${C}" y="${C - wide('EW') / 2}" width="${C}" height="${wide('EW')}" fill="#6b6b6b"/>`)
    }
    // líneas centrales discontinuas fuera del cruce
    for (const a of arms) {
      const seg =
        a === 'N' ? `M${C} 0 V${C - ROAD / 2}` : a === 'S' ? `M${C} ${C + ROAD / 2} V${W}` : a === 'W' ? `M0 ${C} H${C - ROAD / 2}` : `M${C + ROAD / 2} ${C} H${W}`
      if (!sc.oneWay?.includes(a)) parts.push(`<path d="${seg}" stroke="#fff" stroke-width="2" stroke-dasharray="12 9" fill="none"/>`)
    }
    if (sc.tramRails) {
      const r = sc.tramRails === 'EW' ? `M0 ${C - 8} H${W} M0 ${C + 8} H${W}` : `M${C - 8} 0 V${W} M${C + 8} 0 V${W}`
      parts.push(`<path d="${r}" stroke="#bbb" stroke-width="2" fill="none"/>`)
    }
  }

  // sentido único: flecha blanca grande en el brazo
  for (const a of sc.oneWay ?? []) {
    parts.push(`<g transform="translate(${C} ${C}) rotate(${rot(a)}) translate(0 -110)"><path d="M-10 10 h20 v-14 h8 l-18 -18 l-18 18 h8z" fill="#fff" opacity="0.9"/></g>`)
  }

  // paso de peatones
  if (sc.crossing) {
    const a = sc.crossing.arm
    const bars = Array.from({ length: 7 }, (_, i) => `<rect x="${-42 + i * 12}" y="-8" width="7" height="16" fill="#fff"/>`).join('')
    parts.push(`<g transform="translate(${C} ${C}) rotate(${rot(a)}) translate(0 ${ROAD / 2 + 26})">${bars}${sc.crossing.pedestrian ? `<g transform="translate(-56 0) rotate(${-rot(a)})"><circle r="4" fill="#111"/><rect x="-2.5" y="4" width="5" height="10" fill="#111"/><text x="0" y="26" font-size="8" text-anchor="middle" fill="#111" font-family="Arial">piéton</text></g>` : ''}</g>`)
  }

  // señales por brazo (a la derecha del conductor que llega)
  for (const [arm, s] of Object.entries(sc.signs ?? {}) as [Arm, SceneSign][]) {
    parts.push(`<g transform="translate(${C} ${C}) rotate(${rot(arm)}) translate(${ROAD / 2 + 14} ${ROAD / 2 + 12}) rotate(${-rot(arm)})">${signSvg(s)}</g>`)
  }

  // vehículos
  for (const v of sc.vehicles) {
    const color = v.you ? COLORS.you! : (COLORS[v.kind === 'tram' ? 'tram' : v.kind === 'bike' ? 'bike' : v.id] ?? '#444')
    arrow(color)
    const back = v.back ?? 0
    const dist = Math.min(ROAD / 2 + 34 + back * 52, C - 24)
    const lane = v.kind === 'tram' && sc.tramRails ? 0 : 22 // carril derecho
    const turn = v.turn ?? 'straight'
    parts.push(
      `<g transform="translate(${C} ${C}) rotate(${rot(v.arm)}) translate(${lane} ${dist})">${pathArrow(turn, color, back)}${vehicleShape(v, color)}<g transform="rotate(${-rot(v.arm)})"><circle r="10" fill="#fff" stroke="${color}" stroke-width="2"/><text x="0" y="3" font-size="${v.you ? 7 : 10}" font-weight="700" text-anchor="middle" fill="${color}" font-family="Arial">${v.you ? 'moi' : v.id}</text></g></g>`,
    )
  }

  if (sc.caption) parts.push(`<rect x="${C - 110}" y="4" width="220" height="16" rx="4" fill="#fff" opacity="0.85"/><text x="${C}" y="16" font-size="11" text-anchor="middle" fill="#333" font-family="Arial">${sc.caption}</text>`)

  return `<svg viewBox="0 0 ${W} ${W}" xmlns="http://www.w3.org/2000/svg" role="img" class="scene"><defs>${[...defs].join('')}</defs>${parts.join('')}</svg>`
}
