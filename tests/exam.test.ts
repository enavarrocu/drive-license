import { describe, expect, it } from 'vitest'
import { EXAM, grade, sampleExam, score } from '../app/lib/exam'
import { questions } from '../app/data/questions'
import type { Question, ThemeId } from '../app/types'

/** Générateur pseudo-aléatoire déterministe (mulberry32) pour des tests reproductibles. */
function rng(seed = 42) {
  let a = seed
  return () => {
    a |= 0
    a = (a + 0x6d2b79f5) | 0
    let t = Math.imul(a ^ (a >>> 15), 1 | a)
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296
  }
}

const fake = (id: string, theme: ThemeId, grave = false): Question => ({
  id, theme, grave, theoryId: 't', why: '', answer: 0,
  fr: { q: id, options: ['a', 'b', 'c'] }, es: { q: id, options: ['a', 'b', 'c'] },
})

describe('barème (score)', () => {
  const exam = Array.from({ length: 50 }, (_, i) => fake(`q${i}`, 'priorite', i < 10))

  it('50/50 quand tout est juste', () => {
    const r = score(exam.map((q) => grade(q, q.answer)))
    expect(r).toMatchObject({ score: 50, total: 50, passed: true, graveErrors: 0, minorErrors: 0 })
  })

  it('2 fautes graves = 40/50, échec', () => {
    const r = score(exam.map((q, i) => grade(q, i < 2 ? 1 : 0)))
    expect(r).toMatchObject({ score: 40, passed: false, graveErrors: 2, minorErrors: 0 })
  })

  it('9 erreurs simples = 41/50, réussi (seuil)', () => {
    const r = score(exam.map((q, i) => grade(q, i >= 10 && i < 19 ? 2 : 0)))
    expect(r).toMatchObject({ score: 41, passed: true, minorErrors: 9 })
  })

  it('10 erreurs simples = 40/50, échec', () => {
    const r = score(exam.map((q, i) => grade(q, i >= 10 && i < 20 ? 2 : 0)))
    expect(r.passed).toBe(false)
  })

  it('sans réponse = erreur', () => {
    const a = grade(exam[20]!, null)
    expect(a.correct).toBe(false)
    expect(score([a], 1).minorErrors).toBe(1)
    const g = grade(exam[0]!, null)
    expect(g.grave).toBe(true)
    expect(score([g], 1).graveErrors).toBe(1)
  })

  it('le score ne descend pas sous 0', () => {
    const r = score(exam.map((q) => grade(q, 1)))
    expect(r.score).toBe(0)
  })
})

describe('sampleExam', () => {
  it('50 questions sans doublons, au moins 2 par thème (banque réelle)', () => {
    for (let seed = 1; seed <= 20; seed++) {
      const exam = sampleExam(questions, EXAM.questions, rng(seed))
      expect(exam).toHaveLength(50)
      expect(new Set(exam.map((q) => q.id)).size).toBe(50)
      const per: Record<string, number> = {}
      for (const q of exam) per[q.theme] = (per[q.theme] ?? 0) + 1
      const themesInPool = new Set(questions.map((q) => q.theme))
      for (const t of themesInPool) expect(per[t] ?? 0, `thème ${t}`).toBeGreaterThanOrEqual(2)
    }
  })

  it('minimum 2 même pour un petit thème', () => {
    const pool = [
      ...Array.from({ length: 3 }, (_, i) => fake(`s${i}`, 'alcool')),
      ...Array.from({ length: 200 }, (_, i) => fake(`b${i}`, 'priorite')),
    ]
    const exam = sampleExam(pool, 50, rng(7))
    expect(exam).toHaveLength(50)
    expect(exam.filter((q) => q.theme === 'alcool').length).toBeGreaterThanOrEqual(2)
  })

  it('priorise les questions les moins vues (seen)', () => {
    const themes: ThemeId[] = ['priorite', 'vitesse', 'alcool', 'signaux', 'permis']
    const pool = themes.flatMap((t) => Array.from({ length: 20 }, (_, i) => fake(`${t}-${i}`, t)))
    // Dans chaque thème, les 10 dernières ont déjà été tirées 3 fois.
    const seen = Object.fromEntries(pool.filter((q) => Number(q.id.split('-').pop()) >= 10).map((q) => [q.id, 3]))
    for (let seed = 1; seed <= 10; seed++) {
      const exam = sampleExam(pool, 50, rng(seed), seen)
      expect(exam).toHaveLength(50)
      expect(exam.filter((q) => seen[q.id]).length).toBe(0)
    }
  })
})
