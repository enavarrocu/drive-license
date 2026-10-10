/**
 * Renderizador "markdown ligero" → HTML, sin dependencias.
 * Soporta: ### títulos, párrafos, listas "- ", listas "1. ", tablas |a|b|,
 * **negrita**, `código`, y resalta los términos franceses entre « ».
 * Solo se usa con contenido propio (data/course), no con entrada del usuario.
 */

function esc(s: string): string {
  return s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
}

function inline(s: string): string {
  let out = esc(s)
  out = out.replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
  out = out.replace(/`(.+?)`/g, '<code>$1</code>')
  out = out.replace(/«\s*(.+?)\s*»/g, '<span class="fr">«$1»</span>')
  return out
}

export function renderMd(src: string): string {
  const lines = src.replace(/\r/g, '').split('\n')
  const html: string[] = []
  let para: string[] = []
  let list: { type: 'ul' | 'ol'; items: string[] } | null = null
  let table: string[][] | null = null

  const flushPara = () => {
    if (para.length) {
      html.push(`<p>${inline(para.join(' '))}</p>`)
      para = []
    }
  }
  const flushList = () => {
    if (list) {
      html.push(`<${list.type}>${list.items.map((i) => `<li>${inline(i)}</li>`).join('')}</${list.type}>`)
      list = null
    }
  }
  const flushTable = () => {
    if (table && table.length) {
      const [head, ...rows] = table
      const th = head!.map((c) => `<th>${inline(c)}</th>`).join('')
      const trs = rows.map((r) => `<tr>${r.map((c) => `<td>${inline(c)}</td>`).join('')}</tr>`).join('')
      html.push(`<div class="table-wrap"><table><thead><tr>${th}</tr></thead><tbody>${trs}</tbody></table></div>`)
    }
    table = null
  }
  const flushAll = () => {
    flushPara()
    flushList()
    flushTable()
  }

  for (const raw of lines) {
    const line = raw.trimEnd()
    if (!line.trim()) {
      flushAll()
      continue
    }
    const h = /^(#{1,4})\s+(.*)$/.exec(line)
    if (h) {
      flushAll()
      const level = Math.min(h[1]!.length + 1, 5)
      html.push(`<h${level}>${inline(h[2]!)}</h${level}>`)
      continue
    }
    if (/^\|.*\|$/.test(line.trim())) {
      flushPara()
      flushList()
      const cells = line.trim().slice(1, -1).split('|').map((c) => c.trim())
      if (cells.every((c) => /^-{3,}$/.test(c))) continue // separador
      table = table ?? []
      table.push(cells)
      continue
    }
    const ul = /^\s*[-•]\s+(.*)$/.exec(line)
    const ol = /^\s*\d+[.)]\s+(.*)$/.exec(line)
    if (ul || ol) {
      flushPara()
      flushTable()
      const type = ul ? 'ul' : 'ol'
      if (!list || list.type !== type) {
        flushList()
        list = { type, items: [] }
      }
      list.items.push((ul ?? ol)![1]!)
      continue
    }
    // continuación de un item de lista (línea indentada)
    if (list && /^\s{2,}\S/.test(raw)) {
      list.items[list.items.length - 1] += ' ' + line.trim()
      continue
    }
    flushList()
    flushTable()
    para.push(line.trim())
  }
  flushAll()
  return html.join('\n')
}
