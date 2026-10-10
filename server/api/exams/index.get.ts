
export default defineEventHandler(async (event) => {
  const { user } = await requireUserSession(event)
  const rows = useDb()
    .prepare('SELECT id, date, score, total, passed, grave_errors, minor_errors, duration_sec, help_es, answer_seconds FROM exams WHERE user_id = ? ORDER BY date DESC LIMIT 200')
    .all(user.id) as Omit<ExamRow, 'answers' | 'user_id'>[]
  return rows.map(serializeExam)
})
