import { describe, expect, it } from 'vitest'
import { renderMd } from '../app/lib/md'

describe('md.renderMd', () => {
  it('### titre → h4', () => {
    expect(renderMd('### Priorité')).toBe('<h4>Priorité</h4>')
  })

  it('paragraphe avec **gras**, `code` et « terme FR »', () => {
    expect(renderMd('Le **feu** `x` « la chaussée »\nsuite')).toBe(
      '<p>Le <strong>feu</strong> <code>x</code> <span class="fr">«la chaussée»</span> suite</p>',
    )
  })

  it('listes à puces et numérotées, avec continuation', () => {
    expect(renderMd('- un\n  suite\n- deux')).toBe('<ul><li>un suite</li><li>deux</li></ul>')
    expect(renderMd('1. a\n2. b')).toBe('<ol><li>a</li><li>b</li></ol>')
  })

  it('tableau avec séparateur', () => {
    expect(renderMd('| A | B |\n|---|---|\n| 1 | **2** |')).toBe(
      '<div class="table-wrap"><table><thead><tr><th>A</th><th>B</th></tr></thead><tbody><tr><td>1</td><td><strong>2</strong></td></tr></tbody></table></div>',
    )
  })

  it('échappe le HTML', () => {
    expect(renderMd('a < b & c')).toBe('<p>a &lt; b &amp; c</p>')
  })
})
