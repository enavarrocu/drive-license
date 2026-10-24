/**
 * Statistiques par question sur tous les examens de l'utilisateur :
 * combien de fois chaque question est sortie, et combien de fois elle a été ratée.
 * Sert à l'écran d'historique et au tirage des examens (les questions les moins vues d'abord).
 */
export default defineEventHandler(async (event) => {
  const { user } = await requireUserSession(event)
  const rows = useDb().prepare('SELECT answers FROM exams WHERE user_id = ?').all(user.id) as { answers: string }[]
  const seen: Record<string, number> = {}
  const wrong: Record<string, number> = {}
  for (const r of rows) {
    let answers: { questionId: string; correct: boolean }[] = []
    try {
      answers = JSON.parse(r.answers)
    } catch {
      continue
    }
    for (const a of answers) {
      seen[a.questionId] = (seen[a.questionId] ?? 0) + 1
      if (!a.correct) wrong[a.questionId] = (wrong[a.questionId] ?? 0) + 1
    }
  }
  return { exams: rows.length, seen, wrong }
})
