import { z } from 'zod'

const schema = z.object({
  lang: z.enum(['fr', 'es']).optional(),
  speak: z.boolean().optional(),
  helpEs: z.boolean().optional(),
  answerSeconds: z.number().int().min(0).max(120).optional(), // 0 = sans limite de temps
  dailyGoal: z.union([z.literal(10), z.literal(20), z.literal(30), z.literal(50)]).optional(),
})

export default defineEventHandler(async (event) => {
  const { user } = await requireUserSession(event)
  const body = await readValidatedBody(event, schema.parse)
  const cur = getPrefs(user.id)
  useDb()
    .prepare('UPDATE prefs SET lang = ?, speak = ?, help_es = ?, answer_seconds = ?, daily_goal = ?, updated_at = datetime(\'now\') WHERE user_id = ?')
    .run(body.lang ?? cur.lang, body.speak === undefined ? cur.speak : body.speak ? 1 : 0, body.helpEs === undefined ? cur.help_es : body.helpEs ? 1 : 0, body.answerSeconds ?? cur.answer_seconds, body.dailyGoal ?? cur.daily_goal, user.id)
  return { ok: true }
})
