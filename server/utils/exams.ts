/** Convertit une ligne SQLite d'examen en objet API (camelCase, booléens). */
export function serializeExam(e: Omit<ExamRow, 'answers' | 'user_id'> & { answers?: string }) {
  return {
    id: e.id,
    date: e.date,
    score: e.score,
    total: e.total,
    passed: !!e.passed,
    graveErrors: e.grave_errors,
    minorErrors: e.minor_errors,
    durationSec: e.duration_sec,
    helpEs: !!e.help_es,
    answerSeconds: e.answer_seconds,
    answers: e.answers ? (JSON.parse(e.answers) as unknown) : undefined,
  }
}
