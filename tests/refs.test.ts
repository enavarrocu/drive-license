import { describe, expect, it } from 'vitest'
import { splitGloss } from '../app/lib/glossRefs'
import { isSignCode, linkifySignsHtml, splitSignRefs } from '../app/lib/signRefs'
import { answerIndex } from '../app/composables/useHotkeys'

const terms = (text: string) => splitGloss(text).flatMap((p) => (p.type === 'term' ? [[p.value, p.entry.fr]] : []))

describe('glossRefs.splitGloss', () => {
  it('« la chaussée » → terme du glossaire', () => {
    expect(terms('Sur la chaussée.')).toEqual([['chaussée', 'la chaussée']])
  })

  it('pluriel', () => {
    expect(terms('Les chaussées et les carrefours')).toEqual([
      ['chaussées', 'la chaussée'],
      ['carrefours', 'le carrefour'],
    ])
  })

  it('« à droite » seul (fragment) n’est pas souligné', () => {
    expect(terms('Il roule à droite.')).toEqual([])
  })

  it('chaque terme une seule fois par texte', () => {
    expect(terms('La chaussée, puis encore la chaussée.')).toHaveLength(1)
  })

  it('majuscules et apostrophe typographique', () => {
    expect(terms('LA CHAUSSÉE')).toEqual([['CHAUSSÉE', 'la chaussée']])
    expect(terms('Le taux d’alcool')).toEqual([['taux d’alcool', "le taux d'alcool"]])
  })

  it('le texte est reconstitué à l’identique', () => {
    const t = 'Dans l’agglomération, la chaussée glissante et le carrefour.'
    expect(splitGloss(t).map((p) => p.value).join('')).toBe(t)
  })
})

describe('signRefs', () => {
  it('détecte les codes existants, ignore les inexistants', () => {
    expect(isSignCode('B1')).toBe(true)
    expect(isSignCode('A1a')).toBe(true)
    expect(isSignCode('M18')).toBe(false)
    const parts = splitSignRefs('Voir B1, M18, M2, C43 et Z9 ou A1a.')
    expect(parts.filter((p) => p.type === 'sign').map((p) => (p as { code: string }).code)).toEqual(['B1', 'M2', 'C43', 'A1a'])
    expect(parts.map((p) => (p.type === 'sign' ? p.code : p.value)).join('')).toBe('Voir B1, M18, M2, C43 et Z9 ou A1a.')
  })

  it('linkifySignsHtml ne touche que le texte', () => {
    const html = linkifySignsHtml('<p class="B1">B1 et M18</p>')
    expect(html).toBe('<p class="B1"><button type="button" class="sign-ref" data-sign="B1">B1</button> et M18</p>')
  })
})

describe('useHotkeys.answerIndex', () => {
  it('A/B/C/D et 1/2/3/4', () => {
    expect(['a', 'b', 'c', 'd'].map(answerIndex)).toEqual([0, 1, 2, 3])
    expect(['1', '2', '3', '4'].map(answerIndex)).toEqual([0, 1, 2, 3])
  })
  it('autres touches → null', () => {
    for (const k of ['e', '5', '0', 'enter', 'space', 'ab', '', 'arrowright']) expect(answerIndex(k), k).toBeNull()
  })
})
