import { z } from 'zod'
import { questionById } from '../../../app/data/questions'

const schema = z.object({
  questionId: z.string().min(1).max(64),
  message: z.string().trim().min(3).max(1000),
  lang: z.enum(['fr', 'es']).default('fr'),
})

/** Plafond de signalements par utilisateur et par 24 h (anti-abus). */
const DAILY_LIMIT = 30

export default defineEventHandler(async (event) => {
  const { user } = await requireUserSession(event)
  const { questionId, message, lang } = await readValidatedBody(event, schema.parse)
  if (!questionById[questionId]) throw createError({ statusCode: 400, statusMessage: 'Question inconnue' })
  const db = useDb()
  const { n } = db.prepare("SELECT COUNT(*) AS n FROM reports WHERE user_id = ? AND created_at > datetime('now', '-1 day')").get(user.id) as { n: number }
  if (n >= DAILY_LIMIT) throw createError({ statusCode: 429, statusMessage: 'Trop de signalements aujourd\'hui' })
  db.prepare('INSERT INTO reports (user_id, question_id, message, lang) VALUES (?, ?, ?, ?)').run(user.id, questionId, message, lang)
  return { ok: true }
})
