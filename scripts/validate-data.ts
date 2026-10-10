import { questions } from '../app/data/questions'
import { theory, theoryById } from '../app/data/theory'
import { themes, themeById } from '../app/data/themes'
import { glossary } from '../app/data/glossary'
import { signs } from '../app/data/signs'
import { sampleExam, score, grade, EXAM } from '../app/lib/exam'

const errors: string[] = []
const ids = new Set<string>()
for (const q of questions) {
  if (ids.has(q.id)) errors.push(`id dupliqué ${q.id}`)
  ids.add(q.id)
  if (!themeById[q.theme]) errors.push(`${q.id}: thème inconnu ${q.theme}`)
  if (!theoryById[q.theoryId]) errors.push(`${q.id}: theoryId inconnu ${q.theoryId}`)
  if (q.fr.options.length < 2 || q.fr.options.length > 4) errors.push(`${q.id}: ${q.fr.options.length} options`)
  if (!q.fr.q.trim() || !q.es.q.trim() || !q.why.trim()) errors.push(`${q.id}: texte vide`)
  if (q.fr.options.some((o) => !o.trim()) || q.es.options.some((o) => !o.trim())) errors.push(`${q.id}: option vide`)
}
for (const t of theory) if (!themeById[t.theme]) errors.push(`théorie ${t.id}: thème inconnu`)
const usedTheory = new Set(questions.map((q) => q.theoryId))
for (const t of theory) if (!usedTheory.has(t.id)) console.warn(`(info) théorie sans question : ${t.id}`)

// répartition
const perTheme: Record<string, number> = {}
for (const q of questions) perTheme[q.theme] = (perTheme[q.theme] ?? 0) + 1
console.table(themes.map((t) => ({ theme: t.id, questions: perTheme[t.id] ?? 0, grave: questions.filter((q) => q.theme === t.id && q.grave).length })))
console.log(`questions: ${questions.length}, théorie: ${theory.length}, glossaire: ${glossary.length}, signaux: ${signs.length}`)

// barème
const exam = sampleExam(questions, EXAM.questions)
if (exam.length !== EXAM.questions) errors.push(`sampleExam a renvoyé ${exam.length} questions`)
if (new Set(exam.map((q) => q.id)).size !== exam.length) errors.push('sampleExam: doublons')
const allRight = score(exam.map((q) => grade(q, q.answer)))
if (allRight.score !== 50 || !allRight.passed) errors.push('score parfait attendu 50/50')
const twoGrave = exam.filter((q) => q.grave).slice(0, 2)
if (twoGrave.length === 2) {
  const answers = exam.map((q) => grade(q, twoGrave.includes(q) ? (q.answer + 1) % q.fr.options.length : q.answer))
  const r = score(answers)
  if (r.score !== 40 || r.passed) errors.push(`2 fautes graves devraient donner 40/50 échec, obtenu ${r.score} passed=${r.passed}`)
}
const nineMinor = exam.filter((q) => !q.grave).slice(0, 9)
{
  const answers = exam.map((q) => grade(q, nineMinor.includes(q) ? null : q.answer))
  const r = score(answers)
  if (r.score !== 41 || !r.passed) errors.push(`9 erreurs simples devraient donner 41/50 réussi, obtenu ${r.score}`)
}

if (errors.length) {
  console.error(errors.join('\n'))
  process.exit(1)
}
console.log('OK ✔')
