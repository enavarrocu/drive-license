import type { Question } from '../types'
import type { ProgressEntry } from '../composables/useStore'
import { shuffle } from './exam'

/**
 * Révision espacée (système de Leitner simplifié). Chaque bonne réponse consécutive allonge
 * l'intervalle avant de revoir la question ; une erreur la remet à zéro (à revoir tout de suite).
 * Intervalles en jours, indexés par `streak` (au-delà du dernier, on garde le dernier).
 */
export const INTERVAL_DAYS = [0, 1, 3, 7, 16, 35] as const
const DAY = 24 * 60 * 60 * 1000

/** Une question mal répondue pendant la séance revient après ce nombre de questions. */
export const RELEARN_GAP = 5

/** Moment (ms) où la question redevient « à revoir » ; 0 si elle n'a jamais été vue en étude. */
export function dueAt(e: ProgressEntry | undefined): number {
  // Jamais vue, ou ligne d'avant la révision espacée (sans date) : à revoir maintenant.
  if (!e?.seenAt) return 0
  const days = INTERVAL_DAYS[Math.min(e.streak, INTERVAL_DAYS.length - 1)]!
  return Date.parse(e.seenAt) + days * DAY
}

export function isNew(e: ProgressEntry | undefined): boolean {
  return !e || e.ok + e.ko === 0
}

export interface ReviewPlan {
  /** Questions à travailler : d'abord celles à revoir (les plus fragiles d'abord), puis les nouvelles. */
  queue: Question[]
  due: number
  fresh: number
  /** Prochaine échéance (ms) quand il n'y a rien à revoir, sinon null. */
  nextDue: number | null
}

export function reviewPlan(
  pool: readonly Question[],
  progress: Readonly<Record<string, ProgressEntry>>,
  now: number = Date.now(),
  rng: () => number = Math.random,
): ReviewPlan {
  const due: { q: Question; at: number; streak: number }[] = []
  const fresh: Question[] = []
  let nextDue: number | null = null
  for (const q of pool) {
    const e = progress[q.id]
    if (isNew(e)) {
      fresh.push(q)
      continue
    }
    const at = dueAt(e)
    if (at <= now) due.push({ q, at, streak: e!.streak })
    else nextDue = nextDue === null ? at : Math.min(nextDue, at)
  }
  // Mélange d'abord pour que l'ordre entre égales varie d'une séance à l'autre.
  const ordered = shuffle(due, rng).sort((a, b) => a.streak - b.streak || a.at - b.at)
  return {
    queue: [...ordered.map((d) => d.q), ...shuffle(fresh, rng)],
    due: due.length,
    fresh: fresh.length,
    nextDue: due.length || fresh.length ? null : nextDue,
  }
}
