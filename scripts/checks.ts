/**
 * Comprobaciones de calidad del banco de preguntas (usadas por validate-data.ts).
 * Errores = el banco está roto; avisos = posibles pistas o duplicados a revisar (fallan solo con --strict).
 */
import type { Question } from '../app/types'
import { signByCode } from '../app/data/signs'

export interface CheckResult {
  errors: string[]
  warnings: string[]
  /** Líneas informativas (reparto de respuestas…). */
  info: string[]
}

/** Mismo patrón que CODE_RE de app/lib/signRefs.ts (no exportado allí). */
const CODE_RE = /\b([A-F]\d{1,3}(?:[a-z]|bis)?|M\d{1,2})\b/g

/** Señales de escena que no son códigos del catálogo (semáforos). */
const isSceneLight = (s: string) => s.startsWith('light-')

const EXPECTED_OPTIONS = 3

/** Minúsculas, sin acentos, sin puntuación, espacios simples. */
export function normalize(s: string): string {
  return s
    .toLowerCase()
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
    .replace(/[^a-z0-9]+/g, ' ')
    .trim()
}

function trigrams(s: string): Set<string> {
  const t = ` ${normalize(s)} `
  const out = new Set<string>()
  for (let i = 0; i + 3 <= t.length; i++) out.add(t.slice(i, i + 3))
  return out
}

function jaccard<T>(a: Set<T>, b: Set<T>): number {
  if (!a.size && !b.size) return 1
  let inter = 0
  for (const x of a) if (b.has(x)) inter++
  return inter / (a.size + b.size - inter)
}

// « : » salvo en horas (19:30); « car » como palabra suelta (no « Car-Pass »).
const JUSTIF_FR = /((?<!\d):|:(?!\d)|(?<![\w-])car(?![\w-])|\bparce que?\b|\bpuisque\b)/i
const JUSTIF_ES = /((?<!\d):|:(?!\d)|\bporque\b|\bya que\b|\bpues\b)/i

export function checkQuestions(questions: Question[]): CheckResult {
  const errors: string[] = []
  const warnings: string[] = []
  const info: string[] = []

  for (const q of questions) {
    // 1. Errores estructurales
    if (q.fr.options.length !== q.es.options.length) errors.push(`${q.id}: ${q.fr.options.length} options FR ≠ ${q.es.options.length} ES`)
    if (q.fr.options.length !== EXPECTED_OPTIONS) errors.push(`${q.id}: ${q.fr.options.length} options (attendu ${EXPECTED_OPTIONS})`)
    for (const code of q.signs ?? []) if (!signByCode[code]) errors.push(`${q.id}: signs → code inconnu ${code}`)
    for (const code of Object.values(q.scene?.signs ?? {})) {
      if (code && !isSceneLight(code) && !signByCode[code]) errors.push(`${q.id}: scene.signs → code inconnu ${code}`)
    }
    for (const [lang, text] of [['FR', q.fr.q], ['ES', q.es.q]] as const) {
      const codes = [...text.matchAll(CODE_RE)].map((m) => m[1]!).filter((c) => c in signByCode)
      if (codes.length) errors.push(`${q.id}: code de signal dans l'énoncé ${lang} (${[...new Set(codes)].join(', ')}) — il donne la réponse`)
    }

    // 2. Avisos: pistas en la opción correcta
    const right = q.fr.options[q.answer] ?? ''
    const others = q.fr.options.filter((_, i) => i !== q.answer)
    const maxOther = Math.max(0, ...others.map((o) => o.length))
    if (others.length && right.length >= maxOther * 1.3 && right.length - maxOther >= 8) {
      warnings.push(`${q.id}: bonne réponse nettement plus longue (${right.length} vs ${maxOther} car.)`)
    }
    const hint = (opts: string[], re: RegExp) => re.test(opts[q.answer] ?? '') && !opts.some((o, i) => i !== q.answer && re.test(o))
    if (hint(q.fr.options, JUSTIF_FR) || hint(q.es.options, JUSTIF_ES)) {
      warnings.push(`${q.id}: seule la bonne réponse contient « : » ou une justification`)
    }
    if (q.why.trim().length < 20) warnings.push(`${q.id}: why vide ou trop court (${q.why.trim().length} car.)`)
  }

  // Reparto de respuestas por posición (solo preguntas de 3 opciones)
  const three = questions.filter((q) => q.fr.options.length === EXPECTED_OPTIONS)
  if (three.length) {
    const counts = [0, 0, 0]
    for (const q of three) counts[q.answer]!++
    const pct = counts.map((c) => (100 * c) / three.length)
    info.push(`réponses par position (A/B/C) : ${counts.map((c, i) => `${'ABC'[i]}=${c} (${pct[i]!.toFixed(1)} %)`).join(', ')}`)
    pct.forEach((p, i) => {
      if (Math.abs(p - 100 / 3) > 10) warnings.push(`position ${'ABC'[i]} : ${p.toFixed(1)} % des bonnes réponses (écart > 10 points du tiers)`)
    })
  }

  // Casi duplicados: enunciado FR parecido Y misma respuesta correcta normalizada.
  const prepared = questions.map((q) => ({
    q,
    tri: trigrams(q.fr.q),
    words: new Set(normalize(q.fr.q).split(' ').filter((w) => w.length > 2)),
    ans: normalize(q.fr.options[q.answer] ?? ''),
    visual: q.scene || q.signs || q.image ? JSON.stringify([q.scene, q.signs, q.image]) : '',
  }))
  for (let i = 0; i < prepared.length; i++) {
    for (let j = i + 1; j < prepared.length; j++) {
      const a = prepared[i]!
      const b = prepared[j]!
      if (a.ans !== b.ans) continue
      // « Qui passe en premier ? » → « Moi. » sobre dos escenas distintas no es un duplicado.
      if (a.visual && b.visual && a.visual !== b.visual) continue
      const sim = Math.max(jaccard(a.tri, b.tri), jaccard(a.words, b.words))
      if (sim >= 0.8) warnings.push(`quasi-doublon ${a.q.id} ~ ${b.q.id} (similarité ${sim.toFixed(2)}, même réponse « ${a.q.fr.options[a.q.answer]} »)`)
    }
  }

  return { errors, warnings, info }
}
