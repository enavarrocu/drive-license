import { z } from 'zod'

const schema = z.object({
  date: z.string().datetime(),
  score: z.number().int().min(0).max(50),
  total: z.number().int().min(1).max(50),
  passed: z.boolean(),
  graveErrors: z.number().int().min(0),
  minorErrors: z.number().int().min(0),
  durationSec: z.number().int().min(0),
  helpEs: z.boolean(),
  answerSeconds: z.number().int().min(0).max(120), // 0 = sans limite
  answers: z.array(z.object({ questionId: z.string(), chosen: z.number().int().nullable(), correct: z.boolean(), grave: z.boolean() })).max(50),
})

export default defineEventHandler(async (event) => {
  const { user } = await requireUserSession(event)
  const b = await readValidatedBody(event, schema.parse)
  const db = useDb()
  const info = db
    .prepare(
      `INSERT INTO exams (user_id, date, score, total, passed, grave_errors, minor_errors, duration_sec, help_es, answer_seconds, answers)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
    )
    .run(user.id, b.date, b.score, b.total, b.passed ? 1 : 0, b.graveErrors, b.minorErrors, b.durationSec, b.helpEs ? 1 : 0, b.answerSeconds, JSON.stringify(b.answers))
  const row = db.prepare('SELECT * FROM exams WHERE id = ?').get(Number(info.lastInsertRowid)) as ExamRow
  return serializeExam(row)
})
