/** Tout l'état de l'utilisateur en un appel : prefs, progression, chapitres lus, résumé des examens. */
export default defineEventHandler(async (event) => {
  const { user } = await requireUserSession(event)
  const prefs = getPrefs(user.id)
  const progress = getProgress(user.id)
  const courseRead = getCourseRead(user.id)
  const exams = useDb()
    .prepare('SELECT id, date, score, total, passed, grave_errors, minor_errors, duration_sec, help_es, answer_seconds FROM exams WHERE user_id = ? ORDER BY date DESC LIMIT 50')
    .all(user.id) as Omit<ExamRow, 'answers' | 'user_id'>[]
  return {
    user: { id: user.id, username: user.username },
    isAdmin: isAdmin(user.username),
    prefs: { lang: prefs.lang, speak: !!prefs.speak, helpEs: !!prefs.help_es, answerSeconds: prefs.answer_seconds },
    progress: Object.fromEntries(progress.map((p) => [p.question_id, { ok: p.ok, ko: p.ko, flagged: !!p.flagged, streak: p.streak, seenAt: p.seen_at }])),
    courseRead,
    exams: exams.map(serializeExam),
  }
})
