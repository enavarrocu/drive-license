import type { SignCategory } from '../types'
import type { SignWithSvg } from '../data/signs'
import type { ProgressEntry } from '../composables/useStore'
import { shuffle } from './exam'
import { dueAt, isNew } from './srs'

/**
 * Quiz de signaux généré automatiquement à partir du catalogue (`data/signs.ts`).
 * Sans Vue : testable avec tsx. Chaque réponse s'enregistre sous l'id `sign:<code>`.
 */

/** Sens « image → nom » (Que signifie ce signal ?) ou inverse « nom → image » (Quel signal indique… ?). */
export type SignQuizKind = 'name' | 'image'

export interface SignQuizQuestion {
  kind: SignQuizKind
  sign: SignWithSvg
  /** 3 signaux : la bonne réponse et deux distracteurs de la même famille, ordre aléatoire. */
  options: SignWithSvg[]
  answer: number
}

export const signProgressId = (code: string) => `sign:${code}`

/** Famille = lettre du code (A, B, C, D, E, F, M). */
export function signFamily(code: string): string {
  return code.charAt(0).toUpperCase()
}

/** Paires que l'on confond souvent (en plus de la proximité des numéros). */
const CONFUSABLE: [string, string][] = [
  ['B1', 'B5'], ['B1', 'B3'], ['B5', 'B7'], ['B9', 'B11'], ['B9', 'B15'], ['B15', 'B17'], ['B19', 'B21'],
  ['C1', 'C3'], ['C1', 'F19'], ['C35', 'C37'], ['C35', 'C39'], ['C43', 'C45'], ['C45', 'C46'],
  ['D1a', 'D3a'], ['D7', 'D9'], ['D9', 'D10'],
  ['E1', 'E3'], ['E5', 'E7'], ['E9a', 'E9a-disque'],
  ['F1', 'F3'], ['F4a', 'F4b'], ['F5', 'F9'], ['F7', 'F11'], ['F12a', 'F103'], ['F45', 'F45b'], ['F49', 'F50'],
  ['A7a', 'A7b'], ['A7a', 'A7c'], ['A41', 'A43'], ['A45', 'A47'], ['A21', 'A23'],
]
const confusable = new Set(CONFUSABLE.flatMap(([a, b]) => [`${a}|${b}`, `${b}|${a}`]))

const norm = (s: string) =>
  s
    .toLowerCase()
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
    .replace(/[^a-z0-9]+/g, ' ')
    .trim()

const STOP = new Set(['de', 'du', 'des', 'la', 'le', 'les', 'l', 'd', 'a', 'au', 'aux', 'et', 'ou', 'sur', 'pour', 'en', 'un', 'une'])
const words = (s: string) => new Set(norm(s).split(' ').filter((w) => w.length > 1 && !STOP.has(w)))

/** Numéro et suffixe d'un code : « A7b » → [7, 'b'] ; « M-distance » → [NaN, '-distance']. */
function parts(code: string): [number, string] {
  const m = /^[A-Z](\d+)(.*)$/i.exec(code)
  return m ? [Number(m[1]), m[2]!] : [Number.NaN, code.slice(1)]
}

/** Ressemblance entre deux signaux de la même famille (plus c'est haut, plus ils se confondent). */
export function similarity(a: SignWithSvg, b: SignWithSvg): number {
  let s = 0
  if (confusable.has(`${a.code}|${b.code}`)) s += 10
  const [na, sa] = parts(a.code)
  const [nb, sb] = parts(b.code)
  if (Number.isFinite(na) && Number.isFinite(nb)) {
    if (na === nb && sa !== sb) s += 6 // A7a / A7b, F4a / F4b
    else s += Math.max(0, 4 - Math.abs(na - nb) / 2) // C43 / C45 > C43 / C29
  }
  // Mots communs du nom français (« Stationnement interdit » / « Stationnement réservé… »).
  const wa = words(a.name.fr)
  const wb = words(b.name.fr)
  let common = 0
  for (const w of wa) if (wb.has(w)) common++
  if (wa.size && wb.size) s += (4 * common) / Math.min(wa.size, wb.size)
  return s
}

/** Deux signaux ne peuvent pas être proposés ensemble s'ils ont le même nom (FR ou ES). */
function sameName(a: SignWithSvg, b: SignWithSvg): boolean {
  return norm(a.name.fr) === norm(b.name.fr) || norm(a.name.es) === norm(b.name.es)
}

/**
 * Deux distracteurs de la même famille, parmi les plus ressemblants (tirage parmi les meilleurs
 * pour varier d'une fois à l'autre). Si la famille est trop petite, on complète avec la même catégorie.
 */
export function pickDistractors(sign: SignWithSvg, catalog: readonly SignWithSvg[], n = 2, rng: () => number = Math.random): SignWithSvg[] {
  const fam = signFamily(sign.code)
  const sameFam = catalog.filter((s) => s.code !== sign.code && signFamily(s.code) === fam)
  const pool = sameFam.length >= n ? sameFam : catalog.filter((s) => s.code !== sign.code && (signFamily(s.code) === fam || s.category === sign.category))
  // Un peu de hasard dans le score pour que les distracteurs varient entre les plus ressemblants.
  const ranked = pool.map((s) => ({ s, score: similarity(sign, s) + rng() * 3 })).sort((x, y) => y.score - x.score)
  const out: SignWithSvg[] = []
  for (const { s } of ranked) {
    if (out.length >= n) break
    if (sameName(s, sign) || out.some((o) => o.code === s.code || sameName(o, s))) continue
    out.push(s)
  }
  return out
}

export function makeSignQuestion(sign: SignWithSvg, catalog: readonly SignWithSvg[], kind: SignQuizKind = 'name', rng: () => number = Math.random): SignQuizQuestion {
  const options = shuffle([sign, ...pickDistractors(sign, catalog, 2, rng)], rng)
  return { kind, sign, options, answer: options.indexOf(sign) }
}

export interface SignPlan {
  /** Signaux à travailler : à revoir d'abord (les plus fragiles d'abord), puis les nouveaux. */
  queue: SignWithSvg[]
  due: number
  fresh: number
  /** Prochaine échéance (ms) quand il n'y a rien à revoir, sinon null. */
  nextDue: number | null
}

/** Même logique que `reviewPlan` (lib/srs.ts), appliquée aux signaux (ids `sign:<code>`). */
export function signPlan(
  pool: readonly SignWithSvg[],
  progress: Readonly<Record<string, ProgressEntry>>,
  now: number = Date.now(),
  rng: () => number = Math.random,
): SignPlan {
  const due: { s: SignWithSvg; at: number; streak: number }[] = []
  const fresh: SignWithSvg[] = []
  let nextDue: number | null = null
  for (const s of pool) {
    const e = progress[signProgressId(s.code)]
    if (isNew(e)) {
      fresh.push(s)
      continue
    }
    const at = dueAt(e)
    if (at <= now) due.push({ s, at, streak: e!.streak })
    else nextDue = nextDue === null ? at : Math.min(nextDue, at)
  }
  const ordered = shuffle(due, rng).sort((a, b) => a.streak - b.streak || a.at - b.at)
  return {
    queue: [...ordered.map((d) => d.s), ...shuffle(fresh, rng)],
    due: due.length,
    fresh: fresh.length,
    nextDue: due.length || fresh.length ? null : nextDue,
  }
}

/** Filtre par famille du catalogue (A…F) ; « indication » inclut les panneaux additionnels M. */
export function signsOf(catalog: readonly SignWithSvg[], category: SignCategory | 'all'): SignWithSvg[] {
  return catalog.filter((s) => category === 'all' || s.category === category)
}
