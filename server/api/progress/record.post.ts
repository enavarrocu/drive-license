import { z } from 'zod'

const schema = z.object({ questionId: z.string().min(1).max(64), ok: z.boolean() })

export default defineEventHandler(async (event) => {
  const { user } = await requireUserSession(event)
  const { questionId, ok } = await readValidatedBody(event, schema.parse)
  useDb()
    .prepare(
      `INSERT INTO progress (user_id, question_id, ok, ko) VALUES (?, ?, ?, ?)
       ON CONFLICT(user_id, question_id) DO UPDATE SET ok = ok + excluded.ok, ko = ko + excluded.ko, updated_at = datetime('now')`,
    )
    .run(user.id, questionId, ok ? 1 : 0, ok ? 0 : 1)
  return { ok: true }
})
