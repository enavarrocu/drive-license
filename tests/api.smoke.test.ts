/**
 * Test de fumée de l'API sur le build de production (.output). Ne compile pas : lancer
 * `pnpm build` avant pour tester le code courant. Sans .output, la suite est ignorée.
 * Port 3132, BD temporaire ; l'utilisateur de test est inséré directement en base (le registre
 * est fermé dans le code) avec le même hachage que nuxt-auth-utils (@adonisjs/hash, scrypt).
 */
import { spawn, type ChildProcess } from 'node:child_process'
import { existsSync, mkdtempSync, realpathSync, rmSync } from 'node:fs'
import { tmpdir } from 'node:os'
import { join } from 'node:path'
import { pathToFileURL } from 'node:url'
import { randomBytes } from 'node:crypto'
import Database from 'better-sqlite3'
import { afterAll, beforeAll, describe, expect, it } from 'vitest'

const root = new URL('..', import.meta.url).pathname
const entry = join(root, '.output/server/index.mjs')
const PORT = 3132
const BASE = `http://127.0.0.1:${PORT}`
const hasBuild = existsSync(entry)

if (!hasBuild) console.warn('[api.smoke] .output absent : lancez `pnpm build` pour exécuter le test de fumée de l’API.')

/** Hachage identique à hashPassword() de nuxt-auth-utils (options scrypt par défaut). */
async function hashPassword(pw: string): Promise<string> {
  const pkg = realpathSync(join(root, 'node_modules/nuxt-auth-utils'))
  const base = join(pkg, '..', '@adonisjs/hash/build')
  const { Hash } = await import(pathToFileURL(join(base, 'index.js')).href)
  const { Scrypt } = await import(pathToFileURL(join(base, 'src/drivers/scrypt.js')).href)
  return new Hash(new Scrypt({})).make(pw)
}

describe.skipIf(!hasBuild)('API (smoke, .output)', () => {
  let server: ChildProcess
  let dir: string
  let dbPath: string
  let cookie = ''
  const USER = 'smoketest'
  const PASS = 'motdepasse-smoke'

  const api = (path: string, init: RequestInit = {}, withCookie = true) =>
    fetch(BASE + path, {
      redirect: 'manual',
      ...init,
      headers: { 'content-type': 'application/json', ...(withCookie && cookie ? { cookie } : {}), ...(init.headers ?? {}) },
    })

  beforeAll(async () => {
    dir = mkdtempSync(join(tmpdir(), 'permis-smoke-'))
    dbPath = join(dir, 'test.db')
    server = spawn(process.execPath, [entry], {
      env: {
        ...process.env,
        PORT: String(PORT),
        HOST: '127.0.0.1',
        NITRO_PORT: String(PORT),
        NITRO_HOST: '127.0.0.1',
        NUXT_DB_PATH: dbPath,
        NUXT_SESSION_PASSWORD: randomBytes(48).toString('base64'),
        NUXT_ADMIN_USERS: 'quelquunautre',
      },
      stdio: 'pipe',
    })
    // Attendre que le serveur réponde.
    for (let i = 0; i < 100; i++) {
      try {
        const r = await fetch(BASE + '/api/auth/config')
        if (r.ok) break
      } catch {}
      await new Promise((r) => setTimeout(r, 100))
    }
    // Un premier accès à la BD crée le schéma (login inconnu → 401), puis on insère l'utilisateur.
    const r = await api('/api/auth/login', { method: 'POST', body: JSON.stringify({ username: 'nobody', password: 'x' }) })
    expect(r.status).toBe(401)
    const db = new Database(dbPath)
    db.prepare('INSERT INTO users (username, password_hash) VALUES (?, ?)').run(USER, await hashPassword(PASS))
    db.close()
  })

  afterAll(() => {
    server?.kill()
    if (dir) rmSync(dir, { recursive: true, force: true })
  })

  it('/api/auth/config : inscriptions fermées', async () => {
    const r = await api('/api/auth/config')
    expect(r.status).toBe(200)
    expect(await r.json()).toEqual({ allowRegistration: false })
  })

  it('registre fermé → 403', async () => {
    const r = await api('/api/auth/register', { method: 'POST', body: JSON.stringify({ username: 'nouveau', password: 'motdepasse123' }) })
    expect(r.status).toBe(403)
  })

  it('sans session : / redirige vers /bienvenue, /api/me → 401', async () => {
    const r = await api('/', {}, false)
    expect([301, 302, 307]).toContain(r.status)
    expect(r.headers.get('location')).toMatch(/\/bienvenue$/)
    expect((await api('/api/me', {}, false)).status).toBe(401)
  })

  it('login', async () => {
    const bad = await api('/api/auth/login', { method: 'POST', body: JSON.stringify({ username: USER, password: 'faux' }) })
    expect(bad.status).toBe(401)
    const r = await api('/api/auth/login', { method: 'POST', body: JSON.stringify({ username: USER, password: PASS, lang: 'es' }) })
    expect(r.status).toBe(200)
    cookie = r.headers.getSetCookie().map((c) => c.split(';')[0]).join('; ')
    expect(cookie).not.toBe('')
  })

  it('/api/me', async () => {
    const r = await api('/api/me')
    expect(r.status).toBe(200)
    const me = await r.json()
    expect(me.user.username).toBe(USER)
    expect(me.isAdmin).toBe(false)
    expect(me.prefs.lang).toBe('es')
    expect(me.progress).toEqual({})
  })

  it('POST /api/progress/record met à jour ok/ko/streak', async () => {
    const id = 'prio-01'
    const rec = (ok: boolean) => api('/api/progress/record', { method: 'POST', body: JSON.stringify({ questionId: id, ok }) })
    expect((await rec(true)).status).toBe(200)
    expect((await rec(true)).status).toBe(200)
    let p = (await (await api('/api/me')).json()).progress[id]
    expect(p).toMatchObject({ ok: 2, ko: 0, streak: 2 })
    expect(typeof p.seenAt).toBe('string')
    expect((await rec(false)).status).toBe(200)
    p = (await (await api('/api/me')).json()).progress[id]
    expect(p).toMatchObject({ ok: 2, ko: 1, streak: 0 })
    expect((await api('/api/progress/record', { method: 'POST', body: JSON.stringify({ questionId: id }) })).status).toBe(400)
  })

  it('POST /api/reports : 400 si la question n’existe pas, 200 sinon', async () => {
    const send = (questionId: string) => api('/api/reports', { method: 'POST', body: JSON.stringify({ questionId, message: 'Erreur de test' }) })
    expect((await send('n-existe-pas-999')).status).toBe(400)
    expect((await send('prio-01')).status).toBe(200)
  })

  it('GET /api/reports : 403 sans droit admin, 401 sans session', async () => {
    expect((await api('/api/reports')).status).toBe(403)
    expect((await api('/api/reports', {}, false)).status).toBe(401)
  })
})
