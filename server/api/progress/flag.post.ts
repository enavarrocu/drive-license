import { z } from 'zod'

const schema = z.object({ questionId: z.string().min(1).max(64), flagged: z.boolean() })

export default defineEventHandler(async (event) => {
  const { user } = await requireUserSession(event)
  const { questionId, flagged } = await readValidatedBody(event, schema.parse)
  useDb()
    .prepare(
      `INSERT INTO progress (user_id, question_id, flagged) VALUES (?, ?, ?)
       ON CONFLICT(user_id, question_id) DO UPDATE SET flagged = excluded.flagged, updated_at = datetime('now')`,
    )
    .run(user.id, questionId, flagged ? 1 : 0)
  return { ok: true }
})
