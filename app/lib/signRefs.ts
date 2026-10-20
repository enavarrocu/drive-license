import { signByCode } from '../data/signs'

/** Códigos de señal reconocibles en un texto: A1a, B1, C35, D5, E9a, F12a, F50bis, M2… */
const CODE_RE = /\b([A-F]\d{1,3}(?:[a-z]|bis)?|M\d{1,2})\b/g

export function isSignCode(code: string): boolean {
  return code in signByCode
}

export type TextPart = { type: 'text'; value: string } | { type: 'sign'; code: string }

/** Divide un texto plano en trozos de texto y referencias a señales existentes. */
export function splitSignRefs(text: string): TextPart[] {
  const parts: TextPart[] = []
  let last = 0
  for (const m of text.matchAll(CODE_RE)) {
    const code = m[1]!
    const idx = m.index ?? 0
    if (!isSignCode(code)) continue
    if (idx > last) parts.push({ type: 'text', value: text.slice(last, idx) })
    parts.push({ type: 'sign', code })
    last = idx + code.length
  }
  if (last < text.length) parts.push({ type: 'text', value: text.slice(last) })
  return parts
}

/**
 * Para HTML ya renderizado (curso): envuelve los códigos en <button class="sign-ref">.
 * Solo toca los nodos de texto (no los atributos ni las etiquetas).
 */
export function linkifySignsHtml(html: string): string {
  return html
    .split(/(<[^>]+>)/)
    .map((chunk) => {
      if (chunk.startsWith('<')) return chunk
      return chunk.replace(CODE_RE, (code) => (isSignCode(code) ? `<button type="button" class="sign-ref" data-sign="${code}">${code}</button>` : code))
    })
    .join('')
}
