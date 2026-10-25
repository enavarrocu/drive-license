import type { Scene } from './lib/scene'

export type Lang = 'fr' | 'es'

export type ThemeId =
  | 'priorite'
  | 'vitesse'
  | 'depassement'
  | 'stationnement'
  | 'signaux'
  | 'autoroute'
  | 'usagers-faibles'
  | 'alcool'
  | 'vehicule'
  | 'eclairage'
  | 'permis'
  | 'manoeuvres'
  | 'panneaux'
  | 'mecanique'
  | 'accidents'
  | 'comportement'

export interface Theme {
  id: ThemeId
  fr: string
  es: string
  /** Thème où les erreurs sont typiquement des « fautes graves » (−5 points). */
  grave: boolean
}

export interface Bilingual {
  fr: string
  es: string
}

export interface Question {
  id: string
  theme: ThemeId
  /** Faute grave si mal répondu (−5 au lieu de −1). */
  grave?: boolean
  fr: { q: string; options: string[] }
  es: { q: string; options: string[] }
  /** Index (0-based) de la bonne réponse. */
  answer: number
  /** Id de l'entrée de théorie associée. */
  theoryId: string
  /** Explication courte en espagnol (pourquoi c'est la bonne réponse). */
  why: string
  /** Escena esquemática (cruce, rotonda…) dibujada por código. */
  scene?: Scene
  /** Imagen SVG (señal con placa adicional, etc.) mostrada antes de la pregunta; sustituye a las señales citadas. */
  image?: string
  /** Señales a mostrar antes de la pregunta (códigos); si falta, se deducen de los códigos citados en el enunciado. */
  signs?: string[]
}

export interface KeyTerm {
  fr: string
  es: string
}

export interface TheoryEntry {
  id: string
  theme: ThemeId
  title: Bilingual
  /** Explication en espagnol. Les termes français importants sont entre « » . */
  body: string
  keyTerms: KeyTerm[]
}

export interface GlossaryEntry {
  fr: string
  es: string
  /** Note d'usage (en espagnol). */
  note?: string
  theme?: ThemeId
}

export type SignCategory = 'danger' | 'priorite' | 'interdiction' | 'obligation' | 'stationnement' | 'indication'

export interface Sign {
  code: string
  category: SignCategory
  name: Bilingual
  /** Ce qu'il faut retenir (en espagnol). */
  meaning: string
}

/* ---------- Examen ---------- */

export interface ExamAnswer {
  questionId: string
  chosen: number | null
  correct: boolean
  grave: boolean
}

export interface ExamResult {
  date: string
  score: number
  total: number
  passed: boolean
  graveErrors: number
  minorErrors: number
  answers: ExamAnswer[]
  durationSec: number
}
