
export default defineEventHandler(async (event) => {
  const { user } = await requireUserSession(event)
  const id = Number(getRouterParam(event, 'id'))
  if (!Number.isInteger(id)) throw createError({ statusCode: 400 })
  const row = useDb().prepare('SELECT * FROM exams WHERE id = ? AND user_id = ?').get(id, user.id) as ExamRow | undefined
  if (!row) throw createError({ statusCode: 404, statusMessage: 'Examen introuvable' })
  return serializeExam(row)
})
