import type { GlossaryEntry } from '../types'
import { glossary } from '../data/glossary'

/**
 * Repère dans un texte français les termes du glossaire (« la chaussée », « céder le passage »…)
 * pour les rendre cliquables avec leur traduction. Les entrées du glossaire s'écrivent avec
 * article et variantes séparées par « / » : on en tire des formes simples à chercher.
 */

const ARTICLE = /^(?:le|la|les|un|une|des)\s+|^l['’]/i
/** Variantes trop vagues ou fragments (« vert », « à droite ») : on ne les cherche pas seules. */
const FRAGMENT = /^(?:de|d['’]|à|du)\s/i

function variants(fr: string): string[] {
  if (fr.includes('…')) return []
  const segments = fr
    .replace(/\([^)]*\)/g, '')
    .split('/')
    .map((s) => s.trim())
    .filter(Boolean)
  const firstHasArticle = ARTICLE.test(segments[0] ?? '')
  const out: string[] = []
  segments.forEach((seg, i) => {
    if (i > 0 && (FRAGMENT.test(seg) || (firstHasArticle && !ARTICLE.test(seg) && !seg.includes(' ')))) return
    const bare = seg.replace(ARTICLE, '').trim()
    if (bare.length >= 4) out.push(bare)
  })
  return out
}

const escape = (s: string) => s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&').replace(/['’]/g, "['’]")

/** Mots trop fréquents et évidents (« ce signal » dans presque chaque question) : pas de soulignement. */
const SKIP = new Set(['signal'])

const byForm = new Map<string, GlossaryEntry>()
for (const e of glossary) for (const v of variants(e.fr)) if (!SKIP.has(v.toLowerCase()) && !byForm.has(v.toLowerCase())) byForm.set(v.toLowerCase(), e)

// Les plus longues d'abord : « feux de croisement » avant « croisement ».
const forms = [...byForm.keys()].sort((a, b) => b.length - a.length)
const TERM_RE = new RegExp(`(?<![\\p{L}\\p{N}])(?:${forms.map(escape).join('|')})(?:s|x)?(?![\\p{L}\\p{N}])`, 'giu')

function entryFor(match: string): GlossaryEntry | undefined {
  const m = match.toLowerCase().replace(/’/g, "'")
  return byForm.get(m) ?? byForm.get(m.replace(/[sx]$/, ''))
}

export type GlossPart = { type: 'text'; value: string } | { type: 'term'; value: string; entry: GlossaryEntry }

/** Divise un texte en morceaux de texte et termes du glossaire (chaque terme au plus une fois par texte). */
export function splitGloss(text: string): GlossPart[] {
  const parts: GlossPart[] = []
  const used = new Set<GlossaryEntry>()
  let last = 0
  for (const m of text.matchAll(TERM_RE)) {
    const entry = entryFor(m[0])
    const idx = m.index ?? 0
    if (!entry || used.has(entry)) continue
    used.add(entry)
    if (idx > last) parts.push({ type: 'text', value: text.slice(last, idx) })
    parts.push({ type: 'term', value: m[0], entry })
    last = idx + m[0].length
  }
  if (last < text.length) parts.push({ type: 'text', value: text.slice(last) })
  return parts
}
