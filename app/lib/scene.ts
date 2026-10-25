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
/** `lane-left`/`lane-right` = cambio de carril; `overtake` = sale a la izquierda y vuelve (adelantamiento o rodeo). */
export type Turn = 'straight' | 'left' | 'right' | 'none' | 'lane-left' | 'lane-right' | 'overtake'
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
  /** Rotonda: el vehículo ya circula por el anillo (a la altura del brazo `arm`, avanzando en sentido antihorario). */
  inRing?: boolean
  /** Rotonda de dos carriles (`ringLanes: 2`): carril del anillo (default 'outer'). */
  ringLane?: 'inner' | 'outer'
  /** Rotonda: grados recorridos desde el brazo `arm` (default 25). */
  ringAt?: number
  /** Tramo con `layout`: índice del carril (de izquierda a derecha) y ordenada del centro del vehículo (0 = arriba). */
  lane?: number
  y?: number
  /** Desplazamiento lateral dentro del carril (px, + = hacia la derecha de la imagen). */
  dx?: number
  /** Tramo con `layout`: sentido de marcha si no es el del carril (p. ej., adelantando por el carril contrario). */
  heading?: 'up' | 'down'
  /** Posición absoluta (centro) y sentido de marcha; prima sobre `arm`/`back` y `lane`/`y`. */
  pos?: { x: number; y: number; dir: Arm }
  /** Trayectoria en coordenadas absolutas (path SVG); sustituye a la flecha de `turn`. */
  path?: string
  /** Intermitentes encendidos: izquierdo, derecho o los dos (warnings). */
  blink?: 'left' | 'right' | 'both'
}

/** Carril de un tramo dibujado (`Scene.layout`). */
export type LaneKind = 'car' | 'bike' | 'bus' | 'emergency' | 'peak' | 'parking' | 'sidewalk' | 'shoulder'
/** Separador entre dos carriles contiguos. Para las dobles: la primera palabra es la línea de la izquierda (oeste). */
export type LaneLine = 'dashed' | 'solid' | 'solid-dashed' | 'dashed-solid' | 'short-dashed' | 'wide-dashed' | 'none'
/** Flecha de selección pintada en el carril (art. 77.1). */
export type SelArrow = 'left' | 'straight' | 'right' | 'straight-left' | 'straight-right'

export interface Lane {
  /** Sentido de marcha: 'up' = hacia arriba (norte), 'down' = hacia abajo. Default 'up'. */
  dir?: 'up' | 'down'
  kind?: LaneKind
  /** Ancho en px (default 40; acera 22, carril bici 24, banda de estacionamiento 28). */
  w?: number
  arrow?: SelArrow
  /** Raíles de tranvía en el centro del carril. */
  rails?: boolean
  /** El carril termina (en bisel) a esta ordenada: existe solo por debajo (carril de aceleración, carril que se cierra). */
  end?: number
}

export interface RoadLayout {
  /** Carriles de izquierda (oeste) a derecha (este). */
  lanes: Lane[]
  /** Separadores (lanes.length - 1). Un trío [abajo, y, arriba] cambia de línea a esa ordenada. Default: 'dashed' entre carriles, nada junto a aceras. */
  lines?: (LaneLine | [LaneLine, number, LaneLine])[]
  /** Calle transversal (cruce) centrada en `y`, a ambos lados o solo a uno. */
  crossStreet?: { y: number; side?: 'both' | 'left' | 'right' }
  /** Ordenada de las flechas de selección (default 230). */
  arrowsY?: number
  /** Pasos de peatones o de ciclistas que cruzan los carriles `from`..`to` (default: todos menos aceras). */
  zebras?: { y: number; bike?: boolean; from?: number; to?: number }[]
}

/** Anotaciones libres sobre la escena (coordenadas absolutas, lienzo 320×320). */
export type SceneMark =
  | { t: 'text'; x: number; y: number; text: string; size?: number }
  /** Emplacement numeroté (rectangle en pointillés) pour les questions « où puis-je… ». */
  | { t: 'spot'; x: number; y: number; label: string; horizontal?: boolean }
  /** Cota vertical (de y1 a y2) o horizontal (`h`) con su texto. */
  | { t: 'dim'; x: number; y: number; to: number; label: string; h?: boolean }
  | { t: 'sign'; x: number; y: number; sign: SceneSign }
  /** Poste de parada de bus o de tranvía. */
  | { t: 'stop'; x: number; y: number; label: 'BUS' | 'TRAM' }
  /** Entrada de garaje (acceso para vehículos) en la acera. */
  | { t: 'garage'; x: number; y: number; w?: number }
  /** Cima de una cuesta: banda sombreada que tapa la vista. */
  | { t: 'crest'; y: number }
  /** Semáforo de carril (art. 62bis) sobre el carril de centro x. */
  | { t: 'lanesig'; x: number; y: number; s: 'cross' | 'down' | 'diag-left' | 'diag-right' }
  /** Valla de obras (bandas rojas y blancas). */
  | { t: 'barrier'; x: number; y: number; w: number }
  /** Trayectoria alternativa (flecha discontinua) con etiqueta. */
  | { t: 'path'; d: string; label?: string; lx?: number; ly?: number; color?: string }
  /** Peatón (con etiqueta opcional). */
  | { t: 'person'; x: number; y: number; label?: string }
  /** Franja pintada sobre la calzada (carril bici que termina en bisel en `y1`), de x a x + w. */
  | { t: 'strip'; x: number; w: number; y1: number; y2: number }

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
  /** Tramo (`type: 'road'`) con carriles a medida; sin él se dibuja la calzada simple de dos sentidos. */
  layout?: RoadLayout
  /** Rotonda: número de carriles del anillo (default 1). */
  ringLanes?: 1 | 2
  marks?: SceneMark[]
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
  if (turn === 'lane-left' || turn === 'lane-right') {
    const s = turn === 'lane-left' ? -40 : 40
    return `<path d="M0 ${y0} v-14 c0 -24 ${s} -20 ${s} -44 v-${d - 20}" stroke="${color}" stroke-width="3" fill="none" marker-end="url(#ah-${color.slice(1)})"/>`
  }
  if (turn === 'overtake') return `<path d="M0 ${y0} v-10 c0 -24 -40 -18 -40 -42 v-${d + 30} c0 -24 40 -18 40 -42 v-10" stroke="${color}" stroke-width="3" fill="none" marker-end="url(#ah-${color.slice(1)})"/>`
  return `<path d="M0 ${y0} v-${d + 18} a22 22 0 0 0 -22 -22 h-30" stroke="${color}" stroke-width="3" fill="none" marker-end="url(#ah-${color.slice(1)})"/>`
}

/** Intermitentes: puntos naranja en las esquinas (coordenadas locales: el vehículo mira al norte). */
function blinkers(v: SceneVehicle): string {
  if (!v.blink) return ''
  const k = v.kind ?? 'car'
  const hw = k === 'truck' || k === 'bus' || k === 'tram' ? 12 : k === 'bike' || k === 'moto' ? 7 : 11
  const hh = k === 'truck' || k === 'bus' || k === 'tram' ? 28 : k === 'bike' || k === 'moto' ? 10 : 20
  const xs = v.blink === 'left' ? [-hw] : v.blink === 'right' ? [hw] : [-hw, hw]
  return xs.map((x) => `<circle cx="${x}" cy="${-hh + 2}" r="3.6" fill="#ff9f1a" stroke="#fff" stroke-width="1"/><circle cx="${x}" cy="${hh - 2}" r="3.6" fill="#ff9f1a" stroke="#fff" stroke-width="1"/>`).join('')
}

const LANE_W: Record<LaneKind, number> = { car: 40, bike: 24, bus: 40, emergency: 34, peak: 40, parking: 28, sidewalk: 22, shoulder: 30 }

/** Geometría de un `layout`: borde izquierdo y centro de cada carril. */
function laneGeometry(l: RoadLayout): { x0: number; x1: number; left: number[]; center: number[]; width: number[] } {
  const width = l.lanes.map((ln) => ln.w ?? LANE_W[ln.kind ?? 'car'])
  const total = width.reduce((a, b) => a + b, 0)
  const x0 = C - total / 2
  const left: number[] = []
  const center: number[] = []
  let x = x0
  for (const w of width) {
    left.push(x)
    center.push(x + w / 2)
    x += w
  }
  return { x0, x1: x0 + total, left, center, width }
}

/** Flecha de selección (local: carril hacia arriba, centrada en 0,0). */
function selArrow(a: SelArrow): string {
  const st = 'stroke="#fff" stroke-width="3.5" fill="none" stroke-linejoin="round"'
  const head = (x: number, y: number, r: number) => `<path d="M0 -6 L6 2 L-6 2z" fill="#fff" transform="translate(${x} ${y}) rotate(${r})"/>`
  const up = `<path d="M0 16 V-8" ${st}/>${head(0, -12, 0)}`
  const left = `<path d="M0 16 V0 q0 -6 -6 -6 H-10" ${st}/>${head(-14, -6, -90)}`
  const right = `<path d="M0 16 V0 q0 -6 6 -6 H10" ${st}/>${head(14, -6, 90)}`
  if (a === 'straight') return up
  if (a === 'left') return left
  if (a === 'right') return right
  if (a === 'straight-left') return `<path d="M0 16 V-8" ${st}/>${head(0, -12, 0)}<path d="M0 8 q0 -6 -6 -6 H-10" ${st}/>${head(-14, 2, -90)}`
  return `<path d="M0 16 V-8" ${st}/>${head(0, -12, 0)}<path d="M0 8 q0 -6 6 -6 H10" ${st}/>${head(14, 2, 90)}`
}

/** Calzada dibujada a partir de `layout` (tramo recto vertical). */
function renderLayout(l: RoadLayout): string {
  const g = laneGeometry(l)
  const out: string[] = []
  const FILL: Record<LaneKind, string> = { car: '#6b6b6b', bike: '#a4574c', bus: '#6b6b6b', emergency: '#777', peak: '#6b6b6b', parking: '#7a7a7a', sidewalk: '#c9c6bf', shoulder: '#b9b29c' }
  l.lanes.forEach((ln, i) => {
    const k = ln.kind ?? 'car'
    const x = g.left[i]!
    const w = g.width[i]!
    if (ln.end === undefined) out.push(`<rect x="${x}" y="0" width="${w}" height="${W}" fill="${FILL[k]}"/>`)
    else {
      // carril que termina en bisel hacia el carril vecino
      const toLeft = i === l.lanes.length - 1 || l.lanes[i + 1]?.kind === 'sidewalk'
      const e = ln.end
      const pts = toLeft ? `${x},${W} ${x + w},${W} ${x + w},${e + 50} ${x},${e}` : `${x},${W} ${x + w},${W} ${x + w},${e} ${x},${e + 50}`
      out.push(`<polygon points="${pts}" fill="${FILL[k]}"/>`)
    }
    if (ln.rails) out.push(`<path d="M${g.center[i]! - 8} 0 V${W} M${g.center[i]! + 8} 0 V${W}" stroke="#bbb" stroke-width="2" fill="none"/>`)
    if (k === 'bus') for (const y of [70, 250]) out.push(`<text x="${g.center[i]}" y="${y}" font-size="11" font-weight="700" text-anchor="middle" fill="#fff" font-family="Arial" transform="rotate(${ln.dir === 'down' ? 180 : 0} ${g.center[i]} ${y - 4})">BUS</text>`)
    if (k === 'bike') for (const y of [60, 240]) out.push(`<g transform="translate(${g.center[i]} ${y}) scale(0.8)"><circle cx="-6" cy="0" r="4.5" fill="none" stroke="#fff" stroke-width="1.8"/><circle cx="6" cy="0" r="4.5" fill="none" stroke="#fff" stroke-width="1.8"/><path d="M-6 0 L-1 -7 L6 0 M-1 -7 H4" stroke="#fff" stroke-width="1.8" fill="none"/></g>`)
    if (ln.arrow && k !== 'sidewalk') out.push(`<g transform="translate(${g.center[i]} ${l.arrowsY ?? 230}) rotate(${ln.dir === 'down' ? 180 : 0})">${selArrow(ln.arrow)}</g>`)
  })
  // líneas entre carriles
  const lineSvg = (kind: LaneLine, x: number, y1: number, y2: number): string => {
    const seg = (dx: number, dash: string, w = 2) => `<line x1="${x + dx}" y1="${y1}" x2="${x + dx}" y2="${y2}" stroke="#fff" stroke-width="${w}"${dash ? ` stroke-dasharray="${dash}"` : ''}/>`
    switch (kind) {
      case 'none':
        return ''
      case 'solid':
        return seg(0, '')
      case 'dashed':
        return seg(0, '14 10')
      case 'short-dashed':
        return seg(0, '7 5')
      case 'wide-dashed':
        return seg(0, '10 6', 4)
      case 'solid-dashed':
        return seg(-3.5, '') + seg(3.5, '14 10')
      case 'dashed-solid':
        return seg(-3.5, '14 10') + seg(3.5, '')
    }
  }
  for (let i = 0; i < l.lanes.length - 1; i++) {
    const a = l.lanes[i]!
    const b = l.lanes[i + 1]!
    const x = g.left[i + 1]!
    const edge = (k?: LaneKind) => k === 'sidewalk' || k === 'parking' || k === 'shoulder'
    const def: LaneLine = edge(a.kind) || edge(b.kind) ? 'none' : 'dashed'
    const spec = l.lines?.[i] ?? def
    const yEnd = Math.max(a.end ?? 0, b.end ?? 0)
    const top = yEnd ? yEnd + 50 : 0
    if (typeof spec === 'string') out.push(lineSvg(spec, x, top, W))
    else out.push(lineSvg(spec[2], x, top, Math.max(top, spec[1])) + lineSvg(spec[0], x, Math.max(top, spec[1]), W))
  }
  // bordillos de las aceras
  l.lanes.forEach((ln, i) => {
    if (ln.kind === 'sidewalk') out.push(`<rect x="${g.left[i]}" y="0" width="${g.width[i]}" height="${W}" fill="none" stroke="#9a968c" stroke-width="1"/>`)
  })
  if (l.crossStreet) {
    const { y, side = 'both' } = l.crossStreet
    // del lado sin calle transversal, la acera exterior sigue entera
    const n = l.lanes.length
    const xa = side === 'right' ? (l.lanes[0]?.kind === 'sidewalk' ? g.left[1]! : g.x0) : 0
    const xb = side === 'left' ? (l.lanes[n - 1]?.kind === 'sidewalk' ? g.left[n - 1]! : g.x1) : W
    out.push(`<rect x="${xa}" y="${y - 32}" width="${xb - xa}" height="64" fill="#6b6b6b"/>`)
    if (side !== 'right') out.push(`<line x1="0" y1="${y}" x2="${g.x0 - 6}" y2="${y}" stroke="#fff" stroke-width="2" stroke-dasharray="12 9"/>`)
    if (side !== 'left') out.push(`<line x1="${g.x1 + 6}" y1="${y}" x2="${W}" y2="${y}" stroke="#fff" stroke-width="2" stroke-dasharray="12 9"/>`)
  }
  for (const z of l.zebras ?? []) {
    const idx = l.lanes.map((ln, i) => (ln.kind === 'sidewalk' ? -1 : i)).filter((i) => i >= 0)
    const from = z.from ?? idx[0] ?? 0
    const to = z.to ?? idx[idx.length - 1] ?? 0
    const xa = g.left[from]!
    const xb = g.left[to]! + g.width[to]!
    if (z.bike) {
      for (let x = xa + 2; x < xb - 4; x += 10) out.push(`<rect x="${x}" y="${z.y - 11}" width="5" height="5" fill="#fff"/><rect x="${x}" y="${z.y + 6}" width="5" height="5" fill="#fff"/>`)
    } else {
      for (let x = xa + 3; x < xb - 6; x += 12) out.push(`<rect x="${x}" y="${z.y - 9}" width="7" height="18" fill="#fff"/>`)
    }
  }
  return out.join('')
}

function personSvg(x: number, y: number, label?: string): string {
  return `<g transform="translate(${x} ${y})"><circle cy="-7" r="4" fill="#111"/><rect x="-2.5" y="-3" width="5" height="10" fill="#111"/>${label ? `<text x="0" y="18" font-size="8" text-anchor="middle" fill="#111" font-family="Arial" stroke="#fff" stroke-width="2.5" paint-order="stroke">${label}</text>` : ''}</g>`
}

/** Anotaciones que van debajo de los vehículos. */
function markUnder(m: SceneMark): string {
  switch (m.t) {
    case 'crest':
      return `<defs><linearGradient id="crest" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#dfe9d3" stop-opacity="0.95"/><stop offset="0.75" stop-color="#dfe9d3" stop-opacity="0.85"/><stop offset="1" stop-color="#dfe9d3" stop-opacity="0"/></linearGradient></defs><rect x="0" y="0" width="${W}" height="${m.y}" fill="url(#crest)"/><text x="${W - 8}" y="${m.y - 26}" font-size="10" text-anchor="end" fill="#555" font-family="Arial" font-style="italic">sommet de côte</text><path d="M8 ${m.y - 10} H${W - 8}" stroke="#8a8a6a" stroke-width="1.5" stroke-dasharray="4 4"/>`
    case 'garage':
      return `<g transform="translate(${m.x} ${m.y})"><rect x="-6" y="${-(m.w ?? 44) / 2}" width="12" height="${m.w ?? 44}" fill="#b5b1a6" stroke="#777" stroke-width="1"/><text x="${m.x > C ? 20 : -20}" y="3" font-size="9" text-anchor="middle" fill="#333" font-family="Arial" transform="rotate(${m.x > C ? 90 : -90} ${m.x > C ? 20 : -20} 0)">garage</text></g>`
    case 'strip':
      return `<polygon points="${m.x},${m.y2} ${m.x + m.w},${m.y2} ${m.x + m.w},${m.y1} ${m.x},${m.y1 + 30}" fill="#a4574c"/><line x1="${m.x}" y1="${m.y1 + 30}" x2="${m.x}" y2="${m.y2}" stroke="#fff" stroke-width="2" stroke-dasharray="8 6"/><g transform="translate(${m.x + m.w / 2} ${(m.y1 + m.y2) / 2 + 10}) scale(0.8)"><circle cx="-6" cy="0" r="4.5" fill="none" stroke="#fff" stroke-width="1.8"/><circle cx="6" cy="0" r="4.5" fill="none" stroke="#fff" stroke-width="1.8"/><path d="M-6 0 L-1 -7 L6 0 M-1 -7 H4" stroke="#fff" stroke-width="1.8" fill="none"/></g>`
    case 'barrier':
      return `<g transform="translate(${m.x - m.w / 2} ${m.y})"><rect width="${m.w}" height="8" fill="#fff" stroke="#d1232a" stroke-width="1"/>${Array.from({ length: Math.floor(m.w / 8) }, (_, i) => `<path d="M${i * 8 + 1} 8 l6 -8" stroke="#d1232a" stroke-width="3"/>`).join('')}</g>`
    default:
      return ''
  }
}

/** Anotaciones que van encima de todo. */
function markOver(m: SceneMark, arrow: (c: string) => void): string {
  switch (m.t) {
    case 'text':
      return `<text x="${m.x}" y="${m.y}" font-size="${m.size ?? 10}" text-anchor="middle" fill="#222" font-family="Arial" stroke="#fff" stroke-width="3" paint-order="stroke">${m.text}</text>`
    case 'spot': {
      const [w, h] = m.horizontal ? [40, 22] : [22, 40]
      return `<rect x="${m.x - w / 2}" y="${m.y - h / 2}" width="${w}" height="${h}" rx="4" fill="#fff" fill-opacity="0.25" stroke="#fff" stroke-width="2" stroke-dasharray="4 3"/><circle cx="${m.x}" cy="${m.y}" r="9" fill="#fff" stroke="#333" stroke-width="1.5"/><text x="${m.x}" y="${m.y + 4}" font-size="11" font-weight="700" text-anchor="middle" fill="#333" font-family="Arial">${m.label}</text>`
    }
    case 'dim': {
      const t = (x1: number, y1: number, x2: number, y2: number) => `<line x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}" stroke="#ffe14d" stroke-width="1.5"/>`
      if (m.h) return t(m.x, m.y, m.to, m.y) + t(m.x, m.y - 4, m.x, m.y + 4) + t(m.to, m.y - 4, m.to, m.y + 4) + `<text x="${(m.x + m.to) / 2}" y="${m.y - 5}" font-size="10" font-weight="700" text-anchor="middle" fill="#222" font-family="Arial" stroke="#ffe14d" stroke-width="3" paint-order="stroke">${m.label}</text>`
      return t(m.x, m.y, m.x, m.to) + t(m.x - 4, m.y, m.x + 4, m.y) + t(m.x - 4, m.to, m.x + 4, m.to) + `<text x="${m.x + 6}" y="${(m.y + m.to) / 2 + 4}" font-size="10" font-weight="700" fill="#222" font-family="Arial" stroke="#ffe14d" stroke-width="3" paint-order="stroke">${m.label}</text>`
    }
    case 'sign':
      return `<g transform="translate(${m.x} ${m.y})">${signSvg(m.sign)}</g>`
    case 'stop':
      return `<g transform="translate(${m.x} ${m.y})"><rect x="-1" y="0" width="2" height="12" fill="#555"/><rect x="-14" y="-12" width="28" height="13" rx="2" fill="#fff" stroke="#1d5bbf" stroke-width="1.5"/><text x="0" y="-2" font-size="8" font-weight="700" text-anchor="middle" fill="#1d5bbf" font-family="Arial">${m.label}</text></g>`
    case 'lanesig': {
      const inner =
        m.s === 'cross'
          ? `<path d="M-6 -6 L6 6 M6 -6 L-6 6" stroke="#ff3b30" stroke-width="3"/>`
          : m.s === 'down'
            ? `<path d="M0 -7 V5 M-5 1 L0 7 L5 1" stroke="#2ecc71" stroke-width="2.6" fill="none"/>`
            : `<path d="M${m.s === 'diag-left' ? '5 -6 L-4 3' : '-5 -6 L4 3'} M${m.s === 'diag-left' ? '-5 -3 V4 H2' : '5 -3 V4 H-2'}" stroke="#ff9f1a" stroke-width="2.6" fill="none"/>`
      return `<g transform="translate(${m.x} ${m.y})"><rect x="-11" y="-11" width="22" height="22" rx="3" fill="#111"/>${inner}</g>`
    }
    case 'path': {
      const c = m.color ?? '#ffffff'
      arrow(c)
      return `<path d="${m.d}" stroke="${c}" stroke-width="3" fill="none" stroke-dasharray="7 5" marker-end="url(#ah-${c.slice(1)})"/>${m.label ? `<circle cx="${m.lx}" cy="${m.ly}" r="9" fill="#fff" stroke="#333" stroke-width="1.5"/><text x="${m.lx}" y="${(m.ly ?? 0) + 4}" font-size="11" font-weight="700" text-anchor="middle" fill="#333" font-family="Arial">${m.label}</text>` : ''}`
    }
    case 'person':
      return personSvg(m.x, m.y, m.label)
    default:
      return ''
  }
}

/** Señales con imagen oficial: se pintan como imagen sobre una tarjeta blanca; el resto (semáforos) se dibuja. */
const OFFICIAL: Partial<Record<SceneSign, string>> = { B1: '/signs/B1.svg', B5: '/signs/B5.svg', B9: '/signs/B9.svg', B15: '/signs/B15.svg', B17: '/signs/B17.svg', C1: '/signs/C1.svg', C3: '/signs/C3.svg', F19: '/signs/F19.svg' }

function signSvg(s: SceneSign): string {
  const img = OFFICIAL[s]
  if (img) return `<rect x="-13" y="-13" width="26" height="26" rx="3" fill="#fff" stroke="#999" stroke-width="0.5"/><image href="${img}" x="-11.5" y="-11.5" width="23" height="23" preserveAspectRatio="xMidYMid meet"/>`
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
      return `<polygon points="0,-11 11,9 -11,9" fill="#fff" stroke="#d1232a" stroke-width="2.5"/><path d="M-4.5 -1.5 L4.5 7.5 M4.5 -1.5 L-4.5 7.5" stroke="#111" stroke-width="2.6"/>`
    case 'C1':
      return `<circle r="10" fill="#d1232a"/><rect x="-6" y="-2" width="12" height="4" fill="#fff"/>`
    case 'C3':
      return `<circle r="10" fill="#fff" stroke="#d1232a" stroke-width="3"/>`
    case 'F19':
      return `<rect x="-10" y="-10" width="20" height="20" rx="2" fill="#1d5bbf"/><path d="M-7 -2 h8 v-4 l6 6 l-6 6 v-4 h-8z" fill="#fff"/>`
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
    // flechas del anillo (o, con dos carriles, la línea discontinua que los separa)
    if (sc.ringLanes === 2) parts.push(`<circle cx="${C}" cy="${C}" r="56" stroke="#fff" stroke-width="2" fill="none" stroke-dasharray="9 7"/>`)
    else parts.push(`<path d="M${C + 56} ${C} a56 56 0 0 1 -56 56" stroke="#fff" stroke-width="2" fill="none" stroke-dasharray="6 5"/><path d="M${C - 56} ${C} a56 56 0 0 1 56 -56" stroke="#fff" stroke-width="2" fill="none" stroke-dasharray="6 5"/>`)
    // vehículos ya dentro del anillo: sobre el anillo, en sentido antihorario, un poco más allá de su brazo
    for (const v of sc.vehicles.filter((x) => x.inRing)) {
      const color = v.you ? COLORS.you! : (COLORS[v.id] ?? '#444')
      arrow(color)
      const R = sc.ringLanes === 2 ? (v.ringLane === 'inner' ? 45 : 67) : 56
      const base = { S: 90, E: 0, N: 270, W: 180 }[v.arm]
      const th = ((base - (v.ringAt ?? 25)) * Math.PI) / 180 // 25° más adelante en el sentido de la marcha
      const x = C + R * Math.cos(th)
      const y = C + R * Math.sin(th)
      const heading = (Math.atan2(-Math.cos(th), Math.sin(th)) * 180) / Math.PI + 90
      const a0 = th - (20 * Math.PI) / 180
      const a1 = th - (75 * Math.PI) / 180
      if (v.path) parts.push(`<path d="${v.path}" stroke="${color}" stroke-width="3" fill="none" marker-end="url(#ah-${color.slice(1)})"/>`)
      else parts.push(`<path d="M${(C + R * Math.cos(a0)).toFixed(1)} ${(C + R * Math.sin(a0)).toFixed(1)} A${R} ${R} 0 0 0 ${(C + R * Math.cos(a1)).toFixed(1)} ${(C + R * Math.sin(a1)).toFixed(1)}" stroke="${color}" stroke-width="3" fill="none" marker-end="url(#ah-${color.slice(1)})"/>`)
      parts.push(`<g transform="translate(${x.toFixed(1)} ${y.toFixed(1)}) rotate(${heading.toFixed(1)})">${vehicleShape(v, color)}${blinkers(v)}<g transform="rotate(${(-heading).toFixed(1)})"><circle r="10" fill="#fff" stroke="${color}" stroke-width="2"/><text x="0" y="3" font-size="${v.you ? 7 : 10}" font-weight="700" text-anchor="middle" fill="${color}" font-family="Arial">${v.you ? 'moi' : v.id}</text></g></g>`)
    }
  } else if (sc.type === 'merge') {
    // Autopista: dos carriles en el mismo sentido (hacia arriba) + carril de aceleración a la derecha que se funde en el carril derecho.
    const L = C - ROAD / 2
    const R = C + ROAD / 2
    const AW = 46 // ancho del carril de aceleración
    parts.push(`<rect x="${L}" y="0" width="${ROAD}" height="${W}" fill="#6b6b6b"/>`)
    parts.push(`<path d="M${R} ${W} h${AW} v-110 L${R} 96 z" fill="#6b6b6b"/>`)
    parts.push(`<line x1="${L + 3}" y1="0" x2="${L + 3}" y2="${W}" stroke="#fff" stroke-width="2"/>`)
    parts.push(`<line x1="${C}" y1="0" x2="${C}" y2="${W}" stroke="#fff" stroke-width="2" stroke-dasharray="14 10"/>`)
    parts.push(`<line x1="${R}" y1="${W}" x2="${R}" y2="96" stroke="#fff" stroke-width="2" stroke-dasharray="8 8"/>`)
    parts.push(`<line x1="${R + 3}" y1="0" x2="${R + 3}" y2="96" stroke="#fff" stroke-width="2"/>`)
    parts.push(`<line x1="${R + AW}" y1="${W}" x2="${R + AW}" y2="210" stroke="#fff" stroke-width="2"/>`)
    // flechas de sentido en los carriles de la autopista
    for (const x of [L + ROAD / 4, C + ROAD / 4]) parts.push(`<path d="M${x} 40 v-22 M${x - 5} 24 l5 -6 l5 6" stroke="#fff" stroke-width="2" fill="none" opacity="0.8"/>`)
    for (const v of sc.vehicles) {
      const color = v.you ? COLORS.you! : (COLORS[v.id] ?? '#444')
      arrow(color)
      const label = `<g><circle r="10" fill="#fff" stroke="${color}" stroke-width="2"/><text x="0" y="3" font-size="${v.you ? 7 : 10}" font-weight="700" text-anchor="middle" fill="${color}" font-family="Arial">${v.you ? 'moi' : v.id}</text></g>`
      if (v.you) {
        // yo, en el carril de aceleración, insertándome en el carril derecho
        const x = R + AW / 2
        const y = 250
        parts.push(`<path d="M${x} ${y - 18} v-40 q0 -30 -24 -40 l-${x - (C + ROAD / 4) - 24} -10" stroke="${color}" stroke-width="3" fill="none" marker-end="url(#ah-${color.slice(1)})"/>`)
        parts.push(`<g transform="translate(${x} ${y})">${vehicleShape(v, color)}${label}</g>`)
      } else {
        // los demás, ya en la autopista (carril derecho), más o menos atrás según `back`
        const x = C + ROAD / 4
        const y = 212 + (v.back ?? 0) * 60
        parts.push(`<path d="M${x} ${y - 18} v-70" stroke="${color}" stroke-width="3" fill="none" marker-end="url(#ah-${color.slice(1)})"/>`)
        parts.push(`<g transform="translate(${x} ${y})">${vehicleShape(v, color)}${label}</g>`)
      }
    }
  } else if (sc.type === 'road' && sc.layout) {
    parts.push(renderLayout(sc.layout))
  } else if (sc.type === 'road') {
    parts.push(`<rect x="${C - ROAD / 2}" y="0" width="${ROAD}" height="${W}" fill="#6b6b6b"/>`)
    parts.push(`<line x1="${C}" y1="0" x2="${C}" y2="${W}" stroke="#fff" stroke-width="2" stroke-dasharray="14 10"/>`)
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

  for (const m of sc.marks ?? []) parts.push(markUnder(m))

  // sentido único: flecha blanca grande en el brazo
  for (const a of sc.oneWay ?? []) {
    // Flecha blanca sobre el brazo en cuestión, apuntando hacia fuera del cruce: el tráfico solo sale por ahí, nadie puede entrar.
    parts.push(`<g transform="translate(${C} ${C}) rotate(${rot(a)}) translate(0 112)"><path d="M-10 -12 h20 v14 h8 l-18 18 l-18 -18 h8z" fill="#fff" opacity="0.9"/></g>`)
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
  const geo = sc.layout ? laneGeometry(sc.layout) : null
  for (const v of sc.type === 'merge' ? [] : sc.vehicles.filter((x) => !x.inRing)) {
    const color = v.you ? COLORS.you! : (COLORS[v.kind === 'tram' ? 'tram' : v.kind === 'bike' ? 'bike' : v.id] ?? '#444')
    arrow(color)
    // posición libre: absoluta (`pos`) o por carril del layout (`lane` + `y`)
    const free = v.pos ?? (geo && v.lane !== undefined ? { x: (geo.center[v.lane] ?? C) + (v.dx ?? 0), y: v.y ?? 200, dir: ((v.heading ?? sc.layout!.lanes[v.lane]?.dir ?? 'up') === 'up' ? 'N' : 'S') as Arm } : null)
    if (free) {
      const r = { N: 0, E: 90, S: 180, W: 270 }[free.dir]
      const label = `<g transform="rotate(${-r})"><circle r="10" fill="#fff" stroke="${color}" stroke-width="2"/><text x="0" y="3" font-size="${v.you ? 7 : 10}" font-weight="700" text-anchor="middle" fill="${color}" font-family="Arial">${v.you ? 'moi' : v.id}</text></g>`
      if (v.path) parts.push(`<path d="${v.path}" stroke="${color}" stroke-width="3" fill="none" marker-end="url(#ah-${color.slice(1)})"/>`)
      parts.push(`<g transform="translate(${free.x} ${free.y}) rotate(${r})">${v.path ? '' : pathArrow(v.turn ?? 'straight', color, v.back ?? 0)}${vehicleShape(v, color)}${blinkers(v)}${label}</g>`)
      continue
    }
    const back = v.back ?? 0
    if (v.path) parts.push(`<path d="${v.path}" stroke="${color}" stroke-width="3" fill="none" marker-end="url(#ah-${color.slice(1)})"/>`)
    const dist = Math.min(ROAD / 2 + 34 + back * 52, C - 24)
    const lane = v.kind === 'tram' && sc.tramRails ? 0 : 22 // carril derecho
    const turn = v.turn ?? 'straight'
    parts.push(
      `<g transform="translate(${C} ${C}) rotate(${rot(v.arm)}) translate(${lane} ${dist})">${pathArrow(turn, color, back)}${vehicleShape(v, color)}${blinkers(v)}<g transform="rotate(${-rot(v.arm)})"><circle r="10" fill="#fff" stroke="${color}" stroke-width="2"/><text x="0" y="3" font-size="${v.you ? 7 : 10}" font-weight="700" text-anchor="middle" fill="${color}" font-family="Arial">${v.you ? 'moi' : v.id}</text></g></g>`,
    )
  }

  for (const m of sc.marks ?? []) parts.push(markOver(m, arrow))

  if (sc.caption) parts.push(`<rect x="${C - 110}" y="4" width="220" height="16" rx="4" fill="#fff" opacity="0.85"/><text x="${C}" y="16" font-size="11" text-anchor="middle" fill="#333" font-family="Arial">${sc.caption}</text>`)

  return `<svg viewBox="0 0 ${W} ${W}" xmlns="http://www.w3.org/2000/svg" role="img" class="scene"><defs>${[...defs].join('')}</defs>${parts.join('')}</svg>`
}
