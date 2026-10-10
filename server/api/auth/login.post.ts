import { z } from 'zod'

const schema = z.object({
  username: z.string().trim().min(1).max(32),
  password: z.string().min(1).max(200),
  /** Idioma activo en la pantalla de login : se aplica a las preferencias del usuario. */
  lang: z.enum(['fr', 'es']).optional(),
})

export default defineEventHandler(async (event) => {
  const body = await readValidatedBody(event, schema.parse)
  const user = useDb().prepare('SELECT * FROM users WHERE username = ?').get(body.username) as UserRow | undefined
  // Même message dans les deux cas pour ne pas révéler l'existence d'un compte.
  if (!user || !(await verifyPassword(user.password_hash, body.password))) {
    throw createError({ statusCode: 401, statusMessage: 'Identifiants incorrects' })
  }
  if (body.lang) {
    useDb()
      .prepare(`INSERT INTO prefs (user_id, lang) VALUES (?, ?) ON CONFLICT(user_id) DO UPDATE SET lang = excluded.lang, updated_at = datetime('now')`)
      .run(user.id, body.lang)
  }
  await setUserSession(event, { user: { id: user.id, username: user.username } })
  return { ok: true }
})
