/** Efface progression, chapitres lus et examens de l'utilisateur. */
export default defineEventHandler(async (event) => {
  const { user } = await requireUserSession(event)
  const db = useDb()
  db.transaction(() => {
    db.prepare('DELETE FROM progress WHERE user_id = ?').run(user.id)
    db.prepare('DELETE FROM course_read WHERE user_id = ?').run(user.id)
    db.prepare('DELETE FROM exams WHERE user_id = ?').run(user.id)
  })()
  return { ok: true }
})
