import { z } from 'zod'

const schema = z.object({
  username: z.string().trim().min(3).max(32).regex(/^[\w.-]+$/, 'Lettres, chiffres, . _ - uniquement'),
  password: z.string().min(8).max(200),
})

export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig()
  if (String(config.allowRegistration) !== 'true') {
    throw createError({ statusCode: 403, statusMessage: 'Les inscriptions sont fermées' })
  }
  const body = await readValidatedBody(event, schema.parse)
  const db = useDb()
  const exists = db.prepare('SELECT id FROM users WHERE username = ?').get(body.username)
  if (exists) throw createError({ statusCode: 409, statusMessage: 'Ce nom est déjà pris' })
  const hash = await hashPassword(body.password)
  const info = db.prepare('INSERT INTO users (username, password_hash) VALUES (?, ?)').run(body.username, hash)
  const id = Number(info.lastInsertRowid)
  db.prepare('INSERT INTO prefs (user_id) VALUES (?)').run(id)
  await setUserSession(event, { user: { id, username: body.username } })
  return { ok: true }
})
