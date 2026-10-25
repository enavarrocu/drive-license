import { existsSync } from 'node:fs'
import { fileURLToPath } from 'node:url'
import { describe, expect, it } from 'vitest'
import { questions } from '../app/data/questions'
import { theoryById } from '../app/data/theory'
import { themeById } from '../app/data/themes'
import { signByCode } from '../app/data/signs'
import { signImages } from '../app/data/signImages'

const publicDir = fileURLToPath(new URL('../public', import.meta.url))

describe('intégrité de la banque', () => {
  it('ids uniques', () => {
    const seen = new Set<string>()
    const dup = questions.filter((q) => (seen.has(q.id) ? true : (seen.add(q.id), false))).map((q) => q.id)
    expect(dup).toEqual([])
  })

  it('answer dans les bornes, options FR/ES alignées', () => {
    const bad = questions.filter((q) => q.answer < 0 || q.answer >= q.fr.options.length || q.fr.options.length !== q.es.options.length).map((q) => q.id)
    expect(bad).toEqual([])
  })

  it('chaque theoryId et chaque thème existent', () => {
    expect(questions.filter((q) => !theoryById[q.theoryId]).map((q) => `${q.id}:${q.theoryId}`)).toEqual([])
    expect(questions.filter((q) => !themeById[q.theme]).map((q) => q.id)).toEqual([])
  })

  it('chaque code de `signs` existe dans le catalogue', () => {
    const bad = questions.flatMap((q) => (q.signs ?? []).filter((c) => !signByCode[c]).map((c) => `${q.id}:${c}`))
    expect(bad).toEqual([])
  })

  it('chaque image de signImages existe dans public/', () => {
    const missing = [...signImages.values()].filter((p) => !existsSync(publicDir + p))
    expect(missing).toEqual([])
  })
})
