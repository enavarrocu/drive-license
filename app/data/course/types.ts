import type { Bilingual, ThemeId } from '../../types'

/**
 * Curso completo. El cuerpo de cada sección es "markdown ligero":
 *   - párrafos separados por línea en blanco
 *   - `### Subtítulo`
 *   - listas con `- `
 *   - **negrita** y `código`
 *   - términos franceses entre « »
 * Se renderiza con src/lib/md.ts (sin dependencias).
 */
export interface CourseSection {
  id: string
  title: Bilingual
  body: string
  /** Códigos de señales a mostrar junto a la sección (ver data/signs). */
  signs?: string[]
}

export interface CourseChapter {
  id: string
  number: number
  title: Bilingual
  /** Tema de las preguntas relacionadas (para el enlace «practicar»). */
  theme: ThemeId
  intro: string
  sections: CourseSection[]
}
