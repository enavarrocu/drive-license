import { z } from 'zod'

const schema = z.object({
  questionId: z.string().min(1).max(64),
  ok: z.boolean(),
  /** Moment de la réponse côté client (utile quand la requête est rejouée depuis la file hors ligne). */
  at: z.string().datetime().optional(),
})

export default defineEventHandler(async (event) => {
  const { user } = await requireUserSession(event)
  const { questionId, ok, at } = await readValidatedBody(event, schema.parse)
  // Jamais dans le futur (horloge du client en avance).
  const now = Date.now()
  const seenAt = new Date(at ? Math.min(Date.parse(at), now) : now).toISOString()
  useDb()
    .prepare(
      `INSERT INTO progress (user_id, question_id, ok, ko, streak, seen_at) VALUES (?, ?, ?, ?, ?, ?)
       ON CONFLICT(user_id, question_id) DO UPDATE SET ok = ok + excluded.ok, ko = ko + excluded.ko,
         streak = CASE WHEN excluded.ok = 1 THEN streak + 1 ELSE 0 END,
         seen_at = excluded.seen_at, updated_at = datetime('now')`,
    )
    .run(user.id, questionId, ok ? 1 : 0, ok ? 0 : 1, ok ? 1 : 0, seenAt)
  return { ok: true }
})
