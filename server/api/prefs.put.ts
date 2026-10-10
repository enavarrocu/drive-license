import { z } from 'zod'

const schema = z.object({
  lang: z.enum(['fr', 'es']).optional(),
  speak: z.boolean().optional(),
  helpEs: z.boolean().optional(),
  answerSeconds: z.number().int().min(5).max(120).optional(),
})

export default defineEventHandler(async (event) => {
  const { user } = await requireUserSession(event)
  const body = await readValidatedBody(event, schema.parse)
  const cur = getPrefs(user.id)
  useDb()
    .prepare('UPDATE prefs SET lang = ?, speak = ?, help_es = ?, answer_seconds = ?, updated_at = datetime(\'now\') WHERE user_id = ?')
    .run(body.lang ?? cur.lang, body.speak === undefined ? cur.speak : body.speak ? 1 : 0, body.helpEs === undefined ? cur.help_es : body.helpEs ? 1 : 0, body.answerSeconds ?? cur.answer_seconds, user.id)
  return { ok: true }
})
