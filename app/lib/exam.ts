import type { ExamAnswer, ExamResult, Question, ThemeId } from '../types'

/** Barème officiel de l'examen théorique B (Bruxelles / Wallonie / Flandre). */
export const EXAM = {
  questions: 50,
  passMark: 41,
  /** Points perdus pour une erreur simple. */
  minorPenalty: 1,
  /** Points perdus pour une faute grave. */
  gravePenalty: 5,
  /** Secondes pour répondre, une fois la question lue. */
  answerSeconds: 15,
  /** Temps de lecture (simulé) quand la synthèse vocale n'est pas disponible. */
  readSecondsFallback: 10,
} as const

/** Mélange (Fisher–Yates) sans muter l'original. */
export function shuffle<T>(items: readonly T[], rng: () => number = Math.random): T[] {
  const a = items.slice()
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(rng() * (i + 1))
    ;[a[i], a[j]] = [a[j]!, a[i]!]
  }
  return a
}

/**
 * Tire `n` questions avec un quota par thème proportionnel à la taille du
 * thème dans la banque (minimum 2 par thème), comme à l'examen réel où la
 * priorité et la vitesse pèsent davantage.
 */
export function sampleExam(pool: readonly Question[], n: number = EXAM.questions, rng: () => number = Math.random, seen: Readonly<Record<string, number>> = {}): Question[] {
  const byTheme = new Map<ThemeId, Question[]>()
  // Mélange, puis les questions les moins souvent sorties en premier : on ne revoit une question
  // qu'une fois le reste du thème épuisé.
  const ordered = shuffle(pool, rng).sort((a, b) => (seen[a.id] ?? 0) - (seen[b.id] ?? 0))
  for (const q of ordered) {
    const list = byTheme.get(q.theme) ?? []
    list.push(q)
    byTheme.set(q.theme, list)
  }
  const themes = [...byTheme.entries()]
  const total = pool.length
  const quotas = new Map<ThemeId, number>()
  let assigned = 0
  for (const [t, list] of themes) {
    const q = Math.min(list.length, Math.max(2, Math.round((n * list.length) / total)))
    quotas.set(t, q)
    assigned += q
  }
  // Ajuste au total exact : on retire/ajoute un par thème, les plus gros d'abord.
  const sorted = themes.slice().sort((a, b) => b[1].length - a[1].length)
  let guard = 0
  while (assigned !== n && guard++ < 1000) {
    for (const [t, list] of sorted) {
      if (assigned === n) break
      const cur = quotas.get(t)!
      if (assigned > n && cur > 2) {
        quotas.set(t, cur - 1)
        assigned--
      } else if (assigned < n && cur < list.length) {
        quotas.set(t, cur + 1)
        assigned++
      }
    }
  }
  const out: Question[] = []
  for (const [t, list] of themes) out.push(...list.slice(0, quotas.get(t)))
  return shuffle(out, rng).slice(0, n)
}

/** Calcule le score selon le barème officiel. */
export function score(answers: readonly ExamAnswer[], total: number = answers.length): Omit<ExamResult, 'date' | 'durationSec' | 'answers'> {
  let graveErrors = 0
  let minorErrors = 0
  for (const a of answers) {
    if (a.correct) continue
    if (a.grave) graveErrors++
    else minorErrors++
  }
  const lost = graveErrors * EXAM.gravePenalty + minorErrors * EXAM.minorPenalty
  const s = Math.max(0, total - lost)
  return { score: s, total, passed: s >= EXAM.passMark, graveErrors, minorErrors }
}

export function grade(q: Question, chosen: number | null): ExamAnswer {
  return {
    questionId: q.id,
    chosen,
    correct: chosen !== null && chosen === q.answer,
    grave: q.grave === true,
  }
}
