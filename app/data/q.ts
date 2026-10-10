import type { Question, ThemeId } from '../types'

/**
 * Helper compacto para declarar preguntas.
 * Q(id, theme, theoryId, [pregunta FR, ...opciones FR], [pregunta ES, ...opciones ES],
 *   índice de la respuesta correcta, por qué (ES), grave?)
 */
export function Q(
  id: string,
  theme: ThemeId,
  theoryId: string,
  fr: [string, ...string[]],
  es: [string, ...string[]],
  answer: number,
  why: string,
  grave = false,
): Question {
  const [fq, ...fo] = fr
  const [eq, ...eo] = es
  if (fo.length !== eo.length) throw new Error(`Question ${id}: nombre d'options FR/ES différent`)
  if (answer < 0 || answer >= fo.length) throw new Error(`Question ${id}: index de réponse invalide`)
  return { id, theme, theoryId, fr: { q: fq, options: fo }, es: { q: eq, options: eo }, answer, why, grave: grave || undefined }
}

/** Variante con escena. */
export function QS(q: Question, scene: NonNullable<Question['scene']>): Question {
  return { ...q, scene }
}
