import { describe, expect, it } from 'vitest'
import { INTERVAL_DAYS, dueAt, isNew, reviewPlan } from '../app/lib/srs'
import type { ProgressEntry } from '../app/composables/useStore'
import type { Question } from '../app/types'

const DAY = 86_400_000
const NOW = Date.parse('2026-10-25T12:00:00Z')
const iso = (ms: number) => new Date(ms).toISOString()
const q = (id: string): Question => ({ id, theme: 'priorite', theoryId: 't', why: '', answer: 0, fr: { q: id, options: ['a', 'b'] }, es: { q: id, options: ['a', 'b'] } })
const entry = (p: Partial<ProgressEntry>): ProgressEntry => ({ ok: 1, ko: 0, flagged: false, streak: 0, seenAt: null, ...p })

describe('srs: intervalles', () => {
  it('dueAt = seenAt + INTERVAL_DAYS[streak]', () => {
    const seen = NOW - 10 * DAY
    INTERVAL_DAYS.forEach((d, streak) => {
      expect(dueAt(entry({ streak, seenAt: iso(seen) }))).toBe(seen + d * DAY)
    })
  })

  it('au-delà du dernier intervalle, on garde le dernier', () => {
    const seen = NOW
    expect(dueAt(entry({ streak: 99, seenAt: iso(seen) }))).toBe(seen + INTERVAL_DAYS.at(-1)! * DAY)
  })

  it('ligne ancienne sans seenAt, ou jamais vue : à revoir maintenant (0)', () => {
    expect(dueAt(undefined)).toBe(0)
    expect(dueAt(entry({ streak: 4, seenAt: null }))).toBe(0)
  })

  it('isNew', () => {
    expect(isNew(undefined)).toBe(true)
    expect(isNew(entry({ ok: 0, ko: 0 }))).toBe(true)
    expect(isNew(entry({ ok: 0, ko: 1 }))).toBe(false)
  })
})

describe('srs: reviewPlan', () => {
  it('à revoir d’abord (streak 0 en tête), puis les nouvelles ; les futures exclues', () => {
    const pool = ['s2', 'new1', 's0', 'future', 'old', 's1', 'new2'].map(q)
    const progress: Record<string, ProgressEntry> = {
      s2: entry({ streak: 2, seenAt: iso(NOW - 5 * DAY) }), // 3 j → due
      s0: entry({ ok: 0, ko: 1, streak: 0, seenAt: iso(NOW - 1000) }),
      s1: entry({ streak: 1, seenAt: iso(NOW - 2 * DAY) }), // 1 j → due
      future: entry({ streak: 3, seenAt: iso(NOW - DAY) }), // 7 j → pas encore
      old: entry({ ok: 3, streak: 3, seenAt: null }), // ligne d'avant la révision espacée
    }
    for (let seed = 0; seed < 5; seed++) {
      let s = seed
      const plan = reviewPlan(pool, progress, NOW, () => ((s = (s * 9301 + 49297) % 233280) / 233280))
      const ids = plan.queue.map((x) => x.id)
      expect(plan.due).toBe(4)
      expect(plan.fresh).toBe(2)
      expect(ids).not.toContain('future')
      expect(ids[0]).toBe('s0')
      expect(ids.slice(1, 4)).toEqual(['s1', 's2', 'old'])
      expect(ids.slice(4).sort()).toEqual(['new1', 'new2'])
      expect(plan.nextDue).toBeNull()
    }
  })

  it('à égalité de streak, la plus ancienne échéance d’abord', () => {
    const pool = ['a', 'b'].map(q)
    const progress = {
      a: entry({ ok: 0, ko: 1, seenAt: iso(NOW - 1000) }),
      b: entry({ ok: 0, ko: 1, seenAt: iso(NOW - 5000) }),
    }
    expect(reviewPlan(pool, progress, NOW).queue.map((x) => x.id)).toEqual(['b', 'a'])
  })

  it('nextDue = prochaine échéance quand rien n’est à revoir', () => {
    const pool = ['a', 'b'].map(q)
    const progress = {
      a: entry({ streak: 3, seenAt: iso(NOW - DAY) }), // NOW + 6 j
      b: entry({ streak: 2, seenAt: iso(NOW) }), // NOW + 3 j
    }
    const plan = reviewPlan(pool, progress, NOW)
    expect(plan.queue).toHaveLength(0)
    expect(plan.nextDue).toBe(NOW + 3 * DAY)
  })
})
