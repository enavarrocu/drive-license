/**
 * Motor de reglas de prioridad (Code de la route belga) para las escenas de `scene.ts`.
 * Calcula quién cede a quién y el orden de paso, para comprobar las respuestas del banco
 * (`scripts/check-scenes.ts`). Sin dependencias de Vue.
 *
 * Jerarquía aplicada (art. 6.1–6.3, 12, 19.3, 37–38, 61):
 *  1. vehículo prioritario con sirena (`siren`) — art. 38;
 *  2. tranvía (`kind: 'tram'`), salvo que su brazo tenga B1/B5 o semáforo en rojo — art. 12.1 + 6.2;
 *  3. nivel de control del brazo: semáforo (rojo < verde; anula las señales de prioridad, art. 6.3),
 *     si no señales (B1/B5 < sin señal < B9/B15/`mainAxis`); en rotonda señalizada, el anillo pasa
 *     por delante de las entradas (art. 12.3.1); quien llega de un sentido prohibido pierde la prioridad;
 *  4. a igual nivel: brazos opuestos → quien gira a la izquierda cede al que viene de frente
 *     recto o a la derecha (art. 19.3.3°); brazos perpendiculares → prioridad de la derecha (art. 12.3.1).
 *
 * El agente (art. 6.1) no está en el modelo `Scene`, así que no se trata.
 */
import type { Arm, Scene, SceneSign, SceneVehicle } from './scene'

/** Derecha de quien llega por cada brazo: desde S es E, desde E es N, desde N es W, desde W es S. */
export const RIGHT_OF: Record<Arm, Arm> = { S: 'E', E: 'N', N: 'W', W: 'S' }
export const OPPOSITE: Record<Arm, Arm> = { S: 'N', N: 'S', E: 'W', W: 'E' }

export type PriorityResult =
  /** `levels[i]` = vehículos que pasan en la oleada i (varios = a la vez, sin conflicto). */
  | { kind: 'order'; levels: string[][]; reasons: string[] }
  /** Bloqueo circular: `passed` pudieron pasar antes, `blocked` se ceden mutuamente. */
  | { kind: 'deadlock'; passed: string[][]; blocked: string[]; reasons: string[] }
  | { kind: 'unsupported'; reason: string }

const LIGHTS: SceneSign[] = ['light-red', 'light-green', 'light-orange']

/** Captions que describen una maniobra (art. 12.4) o un camino de tierra (art. 12.3.1 b) que `Scene` no modela. */
const MANEUVER_CAPTION = /parking|propri[ée]t[ée]|sort d|chemin de terre|stationnement|marche arri[èe]re|demi-tour/i
/** Sentido único con contramano autorizado a los ciclistas (SUL, C1 + M2). */
const SUL_CAPTION = /except[ée] cyclistes/i

interface Ctx {
  sc: Scene
  lightsOn: boolean
  legalRoundabout: boolean
}

function label(v: SceneVehicle): string {
  return v.you ? 'moi' : v.id
}

/** Lleva un vehículo de un sentido prohibido (`oneWay` = brazos por los que no se puede entrar)? */
function wrongWay(ctx: Ctx, v: SceneVehicle): boolean {
  if (v.inRing || !ctx.sc.oneWay?.includes(v.arm)) return false
  if (v.kind === 'bike' && SUL_CAPTION.test(ctx.sc.caption ?? '')) return false
  return true
}

/** Nivel de control del vehículo (más alto = más prioridad) y su motivo. */
function level(ctx: Ctx, v: SceneVehicle): { n: number; why: string } {
  if (wrongWay(ctx, v)) return { n: 0, why: 'viene de un sentido prohibido (art. 12.3.1)' }
  if (ctx.sc.type === 'roundabout' && ctx.legalRoundabout) {
    if (v.inRing) return { n: 3, why: 'circula por el anillo de una rotonda señalizada (art. 12.3.1)' }
  }
  const s = ctx.sc.signs?.[v.arm]
  if (ctx.lightsOn && s === 'light-red') return { n: 0, why: 'semáforo en rojo' }
  if (ctx.lightsOn && s === 'light-green') return { n: 3, why: 'semáforo en verde' }
  if (s === 'B1' || s === 'B5') return { n: 1, why: `señal ${s} (art. 12.3.1 a)` }
  if (s === 'B9' || s === 'B15') return { n: 3, why: `señal ${s} (vía con prioridad)` }
  if (ctx.sc.mainAxis && !s && (ctx.sc.mainAxis === 'EW') === (v.arm === 'E' || v.arm === 'W')) return { n: 3, why: 'vía con prioridad (mainAxis)' }
  return { n: 2, why: 'sin señal de prioridad' }
}

function privilegedTram(ctx: Ctx, v: SceneVehicle): boolean {
  return v.kind === 'tram' && level(ctx, v).n >= 2
}

/** ¿Debe `x` ceder el paso a `y`? Devuelve el motivo o null. */
function mustYield(ctx: Ctx, x: SceneVehicle, y: SceneVehicle): string | null {
  const X = label(x)
  const Y = label(y)
  if (y.siren && !x.siren) return `${X} cede a ${Y}: vehículo prioritario con sirena (art. 38)`
  if (x.siren && !y.siren) return null
  const tx = privilegedTram(ctx, x)
  const ty = privilegedTram(ctx, y)
  if (ty && !tx) return `${X} cede a ${Y}: vehículo sobre raíles (art. 12.1)`
  if (tx && !ty) return null
  const lx = level(ctx, x)
  const ly = level(ctx, y)
  if (lx.n < ly.n) return `${X} cede a ${Y}: ${X} ${lx.why} / ${Y} ${ly.why}`
  if (lx.n > ly.n) return null
  // mismo nivel
  if (OPPOSITE[x.arm] === y.arm) {
    const tY = y.turn ?? 'straight'
    if (x.turn === 'left' && (tY === 'straight' || tY === 'right')) return `${X} gira a la izquierda y cede a ${Y}, que viene de frente (art. 19.3.3°)`
    return null
  }
  if (RIGHT_OF[x.arm] === y.arm) return `${X} cede a ${Y}, que viene por su derecha (art. 12.3.1)`
  return null
}

/** Calcula el orden de paso de una escena. */
export function computePriority(sc: Scene): PriorityResult {
  if (sc.type === 'road') return { kind: 'unsupported', reason: 'tramo sin cruce (type road)' }
  if (sc.crossing?.pedestrian) return { kind: 'unsupported', reason: 'peatón en la escena (peatones no modelados)' }
  if (sc.caption && MANEUVER_CAPTION.test(sc.caption)) return { kind: 'unsupported', reason: `maniobra o salida no modelada: «${sc.caption}»` }
  if (Object.values(sc.signs ?? {}).includes('light-orange')) return { kind: 'unsupported', reason: 'semáforo en ámbar fijo' }

  if (sc.type === 'merge') {
    // Incorporación desde el carril de aceleración = cambio de carril, maniobra (art. 12.4).
    const me = sc.vehicles.find((v) => v.you)
    const others = sc.vehicles.filter((v) => !v.you).map(label)
    if (!me || !others.length) return { kind: 'unsupported', reason: 'incorporación sin otros vehículos' }
    return { kind: 'order', levels: [others, ['moi']], reasons: ['moi me incorporo (maniobra, art. 12.4) y cedo a los que ya circulan'] }
  }

  const isRb = sc.type === 'roundabout'
  const vs = sc.vehicles.filter((v) => isRb || (v.turn ?? 'straight') !== 'none')
  if (vs.length < 2) return { kind: 'unsupported', reason: 'menos de dos vehículos en el cruce' }
  for (let i = 0; i < vs.length; i++)
    for (let j = i + 1; j < vs.length; j++)
      if (vs[i]!.arm === vs[j]!.arm && !vs[i]!.inRing && !vs[j]!.inRing)
        return { kind: 'unsupported', reason: `dos vehículos en el mismo brazo (${label(vs[i]!)}, ${label(vs[j]!)}): adelantamiento o fila, no cruce` }
  if (vs.filter((v) => v.siren).length > 1) return { kind: 'unsupported', reason: 'varios vehículos con sirena' }

  const ctx: Ctx = {
    sc,
    lightsOn: vs.some((v) => LIGHTS.includes(sc.signs?.[v.arm] as SceneSign)),
    // rond-point legal: B1/B5 en las entradas (art. 2.39; el D5 no se modela)
    legalRoundabout: isRb && Object.values(sc.signs ?? {}).some((s) => s === 'B1' || s === 'B5'),
  }

  const reasons: string[] = []
  const yields = new Map<SceneVehicle, SceneVehicle[]>()
  for (const x of vs) {
    const list: SceneVehicle[] = []
    for (const y of vs) {
      if (x === y) continue
      const r = mustYield(ctx, x, y)
      if (r) {
        list.push(y)
        reasons.push(r)
      }
    }
    yields.set(x, list)
  }

  let remaining = [...vs]
  const levels: string[][] = []
  while (remaining.length) {
    const free = remaining.filter((x) => !yields.get(x)!.some((y) => remaining.includes(y)))
    if (!free.length) return { kind: 'deadlock', passed: levels, blocked: remaining.map(label), reasons }
    levels.push(free.map(label))
    remaining = remaining.filter((x) => !free.includes(x))
  }
  return { kind: 'order', levels, reasons }
}
