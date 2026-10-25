import { questions } from '../app/data/questions'
import { theory, theoryById } from '../app/data/theory'
import { themes, themeById } from '../app/data/themes'
import { glossary } from '../app/data/glossary'
import { signs } from '../app/data/signs'
import { sampleExam, score, grade, EXAM } from '../app/lib/exam'
import { checkQuestions } from './checks'
import { checkScenes } from './check-scenes'
import { optionNotes } from '../app/data/optionNotes'
import { questionById } from '../app/data/questions'

const strict = process.argv.includes('--strict')

const errors: string[] = []
const ids = new Set<string>()
for (const q of questions) {
  if (ids.has(q.id)) errors.push(`id dupliqué ${q.id}`)
  ids.add(q.id)
  if (!themeById[q.theme]) errors.push(`${q.id}: thème inconnu ${q.theme}`)
  if (!theoryById[q.theoryId]) errors.push(`${q.id}: theoryId inconnu ${q.theoryId}`)
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

// qualité du banc (options, signaux, indices, quasi-doublons)
const quality = checkQuestions(questions)
errors.push(...quality.errors)
for (const l of quality.info) console.log(l)
// notas por opción (app/data/optionNotes.ts): misma longitud que las opciones, null en la correcta
for (const [id, notes] of Object.entries(optionNotes)) {
  const q = questionById[id]
  if (!q) errors.push(`optionNotes: pregunta inexistente ${id}`)
  else if (notes.length !== q.fr.options.length) errors.push(`optionNotes ${id}: ${notes.length} notas para ${q.fr.options.length} opciones`)
  else if (notes[q.answer] !== null) errors.push(`optionNotes ${id}: la opción correcta (${q.answer}) debe ser null`)
}
const graveWithoutNotes = questions.filter((q) => q.grave && !optionNotes[q.id]).map((q) => q.id)
if (graveWithoutNotes.length) console.warn(`(info) preguntas graves sin notas por opción: ${graveWithoutNotes.join(', ')}`)

// escenas de prioridad: el orden calculado por las reglas (app/lib/priority.ts) debe coincidir con la respuesta
const scenes = checkScenes(questions)
for (const s of scenes) if (s.status === 'MISMATCH') errors.push(`${s.id}: escena — ${s.note}`)
console.log(`escenas : ${scenes.filter((s) => s.status === 'OK').length} OK, ${scenes.filter((s) => s.status === 'MISMATCH').length} MISMATCH, ${scenes.filter((s) => s.status === 'UNSUPPORTED').length} no comprobadas`)
if (quality.warnings.length) console.warn(`\nAvertissements (${quality.warnings.length}) :\n` + quality.warnings.map((w) => `  ⚠ ${w}`).join('\n'))

console.log(`\nRésumé : ${errors.length} erreur(s), ${quality.warnings.length} avertissement(s)${strict ? ' [--strict]' : ''}`)
if (errors.length) {
  console.error(errors.map((e) => `  ✖ ${e}`).join('\n'))
  process.exit(1)
}
if (strict && quality.warnings.length) {
  console.error('--strict : les avertissements font échouer la validation')
  process.exit(1)
}
console.log('OK ✔')
