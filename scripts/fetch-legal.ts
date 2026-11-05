import { mkdirSync, writeFileSync } from 'node:fs'
import { join } from 'node:path'

/**
 * Descarga de ejustice (Banque de données Justel, versión consolidada vigente) los textos
 * legales que sirven de referencia para el contenido y los guarda como texto plano en
 * docs/legal/, para poder consultarlos sin internet.
 *
 *   pnpm legal
 *
 * Cada fichero empieza con la fuente, el numac y la fecha «mise à jour au» de ejustice.
 * Vuelve a ejecutarlo de vez en cuando (o antes de una revisión del contenido) y mira el
 * diff: es la forma más rápida de ver qué ha cambiado en la ley.
 */

const TEXTS = [
  { file: 'code-de-la-route-AR-1975-12-01.txt', eli: 'arrete/1975/12/01/1975120109', name: 'Code de la route (AR 1/12/1975)' },
  { file: 'loi-circulation-1968-03-16.txt', eli: 'loi/1968/03/16/1968031601', name: 'Loi relative à la police de la circulation routière (16/3/1968)' },
  { file: 'permis-de-conduire-AR-1998-03-23.txt', eli: 'arrete/1998/03/23/1998014078', name: 'AR relatif au permis de conduire (23/3/1998)' },
  { file: 'permis-B-provisoire-AR-2006-07-10.txt', eli: 'arrete/2006/07/10/2006014162', name: 'AR relatif au permis de conduire pour les véhicules de catégorie B (10/7/2006)' },
  { file: 'degres-infractions-AR-2005-09-30.txt', eli: 'arrete/2005/09/30/2005014182', name: 'AR désignant les infractions par degré (30/9/2005)' },
  { file: 'assurance-RC-auto-loi-1989-11-21.txt', eli: 'loi/1989/11/21/1989011371', name: 'Loi relative à l’assurance obligatoire RC véhicules automoteurs (21/11/1989)' },
]

const ENTITIES: Record<string, string> = { nbsp: ' ', amp: '&', lt: '<', gt: '>', quot: '"', apos: "'", laquo: '«', raquo: '»', eacute: 'é', egrave: 'è', ecirc: 'ê', agrave: 'à', acirc: 'â', ccedil: 'ç', ocirc: 'ô', ucirc: 'û', icirc: 'î', iuml: 'ï', euml: 'ë', ugrave: 'ù', Eacute: 'É', sect: '§', deg: '°', ordm: 'º', rsquo: '’', lsquo: '‘', ldquo: '“', rdquo: '”', hellip: '…', ndash: '–', mdash: '—' }

function toText(html: string): string {
  let t = html
    .replace(/<(script|style|nav|header|footer)\b[\s\S]*?<\/\1>/gi, '')
    .replace(/<br\s*\/?>/gi, '\n')
    // ejustice usa tablas sin cerrar (<tr><td>…): una fila por línea, celdas separadas por «|».
    .replace(/<tr\b[^>]*>/gi, '\n')
    .replace(/<td\b[^>]*>/gi, ' | ')
    .replace(/<\/(p|div|h\d|li|tr|table|section|article)>/gi, '\n')
    .replace(/<[^>]+>/g, '')
    .replace(/&#(\d+);/g, (_, n) => String.fromCodePoint(+n))
    .replace(/&#x([0-9a-f]+);/gi, (_, n) => String.fromCodePoint(parseInt(n, 16)))
    .replace(/&([a-z]+);/gi, (m, n) => ENTITIES[n] ?? m)
  t = t.split('\n').map(l => l.replace(/[ \t ]+/g, ' ').trim().replace(/^\|\s*/, '').replace(/(\s*\|)+$/, '')).join('\n').replace(/\n{3,}/g, '\n\n')
  // Quita la cabecera del sitio (menús): el texto útil empieza en «Titre».
  const start = t.search(/^Titre\s*$/m)
  return (start >= 0 ? t.slice(start) : t).trim() + '\n'
}

const outDir = join(process.cwd(), 'docs', 'legal')
mkdirSync(outDir, { recursive: true })
const today = new Date().toISOString().slice(0, 10)

for (const x of TEXTS) {
  const url = `https://www.ejustice.just.fgov.be/eli/${x.eli}/justel`
  const res = await fetch(url, { headers: { 'User-Agent': 'Mozilla/5.0 (permis-trainer legal fetch)' } })
  if (!res.ok) throw new Error(`${url}: HTTP ${res.status}`)
  const html = new TextDecoder('latin1').decode(await res.arrayBuffer())
  const text = toText(html)
  const numac = x.eli.split('/').pop()!
  if (!text.includes(numac) || text.length < 20000) throw new Error(`${url}: la página no parece el texto esperado (${text.length} caracteres)`)
  const updated = text.match(/mise à jour au (\d\d-\d\d-\d{4})/)?.[1] ?? '?'
  const head = `${x.name}\nFuente: ${url}\nNumac: ${numac} · ejustice «mise à jour au» ${updated} · descargado el ${today}\n${'='.repeat(80)}\n\n`
  writeFileSync(join(outDir, x.file), head + text)
  console.log(`${x.file}: ${(text.length / 1024).toFixed(0)} KB, mise à jour au ${updated}`)
}
