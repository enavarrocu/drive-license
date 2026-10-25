/**
 * Verificador de las escenas de prioridad: calcula el orden de paso con `app/lib/priority.ts`
 * y lo compara con la opción marcada como correcta.
 *
 *   mise exec -- npx tsx scripts/check-scenes.ts [-v]
 *
 * OK = coincide; MISMATCH = no coincide (exit 1); UNSUPPORTED = escena o pregunta que el
 * motor no cubre (no es una pregunta de orden, o el caso no está modelado).
 * `checkScenes(questions)` se exporta para integrarlo en `pnpm validate`.
 */
import { existsSync, readdirSync } from 'node:fs'
import { fileURLToPath, pathToFileURL } from 'node:url'
import type { Question } from '../app/types'
import type { Scene, SceneVehicle } from '../app/lib/scene'
import { computePriority, type PriorityResult } from '../app/lib/priority'

export type SceneStatus = 'OK' | 'MISMATCH' | 'UNSUPPORTED'

export interface SceneCheck {
  id: string
  status: SceneStatus
  /** Resumen legible de lo que calcula el motor. */
  computed: string
  /** Opciones que concuerdan con el motor (0-based). */
  matching: number[]
  answer: number
  note: string
  reasons: string[]
}

/* ---------- parser de opciones ---------- */

type Claim =
  | { t: 'first'; id: string } // «X passe en premier»
  | { t: 'notme' } // «céder le passage» sin destinatario: otro pasa antes que yo
  | { t: 'order'; ids: string[] } // «A, puis moi, puis B.»
  | { t: 'deadlock' } // bloqueo: alguien renuncia por cortesía

const norm = (s: string) =>
  s
    .toLowerCase()
    .replace(/[’]/g, "'")
    .replace(/\s+/g, ' ')
    .trim()
    .replace(/[.!…]+$/, '')
    .trim()

/** Nombre de un participante → id en la escena (o null). */
function resolve(raw: string, vs: SceneVehicle[]): string | null {
  let s = norm(raw)
  if (s === 'moi' || s === 'je') return vs.some((v) => v.you) ? 'moi' : null
  if (/^les (autres )?v[ée]hicules d[ée]j[àa] /.test(s)) return '*others'
  s = s.replace(/^(la |le |l'|les )/, '').replace(/^(voiture|véhicule|cycliste|camion|tram|tramway|moto|bus) ([a-z])$/, '$2')
  const byId = vs.find((v) => !v.you && v.id.toLowerCase() === s)
  if (byId) return byId.id
  const byKind = (pred: (v: SceneVehicle) => boolean) => {
    const m = vs.filter((v) => !v.you && pred(v))
    return m.length === 1 ? m[0]!.id : null
  }
  if (/^(tram|tramway)$/.test(s)) return byKind((v) => v.kind === 'tram')
  if (/^(ambulance|police|pompiers|camion de pompiers|v[ée]hicule prioritaire)$/.test(s)) return byKind((v) => v.kind === 'emergency')
  if (/^(cycliste|vélo)$/.test(s)) return byKind((v) => v.kind === 'bike')
  return null
}

export function parseOption(text: string, vs: SceneVehicle[]): Claim | null {
  const s = norm(text)
  if (/courtoisie|renoncer par/.test(s)) return { t: 'deadlock' }
  // acciones: «laisser passer X», «céder le passage (à X)», «passer / tourner / entrer»
  let m = s.match(/^(?:m'arr[êe]ter et )?laisser passer (.+?)(?:,|$| puis )/)
  if (m) {
    const id = resolve(m[1]!, vs)
    return id ? { t: 'first', id } : null
  }
  m = s.match(/^c[ée]der le passage(?: (?:à|au|aux) (.+?))?(?:\s*[,:;]|$)/)
  if (m) {
    if (!m[1]) return { t: 'notme' }
    const id = resolve(m[1].replace(/^(la |le |l')/, ''), vs)
    return id ? { t: 'first', id } : null
  }
  if (/^(passer|tourner|entrer)\b/.test(s)) return { t: 'first', id: 'moi' }
  // orden: «A, puis moi, puis B»
  const parts = s.split(/,?\s+puis\s+/)
  if (parts.length > 1) {
    const ids = parts.map((p) => resolve(p, vs))
    return ids.every((x) => x) ? { t: 'order', ids: ids as string[] } : null
  }
  // «X.» / «X, car …» / «X : …»
  const head = s.split(/\s*[,:;]\s*/)[0]!
  const id = resolve(head, vs)
  return id ? { t: 'first', id } : null
}

/* ---------- comparación ---------- */

function describe(r: PriorityResult): string {
  if (r.kind === 'unsupported') return `— (${r.reason})`
  const lv = (l: string[][]) => l.map((x) => x.join(' + ')).join(' → ')
  if (r.kind === 'order') return lv(r.levels)
  return `${r.passed.length ? lv(r.passed) + ' → ' : ''}BLOQUEO [${r.blocked.join(', ')}]`
}

function matches(c: Claim, r: Exclude<PriorityResult, { kind: 'unsupported' }>): boolean {
  if (c.t === 'deadlock') return r.kind === 'deadlock'
  const levels = r.kind === 'order' ? r.levels : r.passed
  const first = levels[0]
  if (c.t === 'order') {
    if (r.kind !== 'order') return false
    const all = levels.flat()
    if (c.ids.length !== all.length || new Set(c.ids).size !== all.length || !c.ids.every((x) => all.includes(x))) return false
    const lvl = (id: string) => levels.findIndex((l) => l.includes(id))
    return c.ids.every((id, i) => i === 0 || lvl(c.ids[i - 1]!) <= lvl(id))
  }
  if (!first) return false
  if (c.t === 'notme') return !first.includes('moi')
  if (c.id === '*others') return !first.includes('moi')
  return first.length === 1 && first[0] === c.id
}

export function checkScene(q: Question & { scene: Scene }): SceneCheck {
  const r = computePriority(q.scene)
  const base = { id: q.id, computed: describe(r), answer: q.answer, reasons: r.kind === 'unsupported' ? [] : r.reasons }
  if (r.kind === 'unsupported') return { ...base, status: 'UNSUPPORTED', matching: [], note: r.reason }
  const claims = q.fr.options.map((o) => parseOption(o, q.scene.vehicles))
  if (claims.every((c) => !c)) return { ...base, status: 'UNSUPPORTED', matching: [], note: 'ninguna opción expresa un orden o quién pasa' }
  const matching = claims.flatMap((c, i) => (c && matches(c, r) ? [i] : []))
  if (matching.includes(q.answer)) {
    return { ...base, status: 'OK', matching, note: matching.length > 1 ? `varias opciones concuerdan (${matching.join(', ')})` : '' }
  }
  if (claims[q.answer] || matching.length) {
    const exp = matching.length ? `el motor elige «${q.fr.options[matching[0]!]}»` : 'ninguna opción concuerda con el motor'
    return { ...base, status: 'MISMATCH', matching, note: `marcada «${q.fr.options[q.answer]}»; ${exp}` }
  }
  return { ...base, status: 'UNSUPPORTED', matching, note: `la opción marcada no se puede interpretar: «${q.fr.options[q.answer]}»` }
}

/** Comprueba todas las preguntas con escena. */
export function checkScenes(questions: Question[]): SceneCheck[] {
  return questions.filter((q): q is Question & { scene: Scene } => !!q.scene).map(checkScene)
}

/* ---------- CLI ---------- */

async function loadQuestions(): Promise<Question[]> {
  const { questions } = await import('../app/data/questions')
  const all = new Map(questions.map((q) => [q.id, q]))
  // ficheros de preguntas que quizá aún no estén enlazados en questions.ts (p. ej. questions-extra5.ts)
  const dir = fileURLToPath(new URL('../app/data/', import.meta.url))
  for (const f of readdirSync(dir).filter((f) => /^questions-.*\.ts$/.test(f))) {
    const path = dir + f
    if (!existsSync(path)) continue
    const mod: Record<string, unknown> = await import(pathToFileURL(path).href)
    for (const val of Object.values(mod))
      if (Array.isArray(val)) for (const q of val as Question[]) if (q && typeof q === 'object' && 'id' in q && 'fr' in q && !all.has(q.id)) all.set(q.id, q)
  }
  return [...all.values()]
}

async function main() {
  const verbose = process.argv.includes('-v')
  const res = checkScenes(await loadQuestions())
  const icon = { OK: 'OK', MISMATCH: 'MISMATCH', UNSUPPORTED: 'UNSUPPORTED' }
  console.table(res.map((r) => ({ id: r.id, status: icon[r.status], motor: r.computed, ok: r.matching.join(','), marcada: r.answer, nota: r.note })))
  for (const r of res.filter((x) => x.status === 'MISMATCH' || (verbose && x.status === 'OK'))) {
    console.log(`\n${r.status} ${r.id}: ${r.note}\n  motor: ${r.computed}`)
    for (const why of r.reasons) console.log(`  - ${why}`)
  }
  const count = (s: SceneStatus) => res.filter((r) => r.status === s).length
  console.log(`\nescenas: ${res.length} · OK ${count('OK')} · MISMATCH ${count('MISMATCH')} · UNSUPPORTED ${count('UNSUPPORTED')}`)
  if (count('MISMATCH')) process.exit(1)
}

if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href) void main()
