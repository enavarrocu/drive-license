import { z } from 'zod'

const schema = z.object({ chapterId: z.string().min(1).max(64), read: z.boolean() })

export default defineEventHandler(async (event) => {
  const { user } = await requireUserSession(event)
  const { chapterId, read } = await readValidatedBody(event, schema.parse)
  const db = useDb()
  if (read) db.prepare('INSERT OR IGNORE INTO course_read (user_id, chapter_id) VALUES (?, ?)').run(user.id, chapterId)
  else db.prepare('DELETE FROM course_read WHERE user_id = ? AND chapter_id = ?').run(user.id, chapterId)
  return { ok: true }
})
