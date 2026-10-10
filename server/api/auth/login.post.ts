import { z } from 'zod'

const schema = z.object({
  username: z.string().trim().min(1).max(32),
  password: z.string().min(1).max(200),
})

export default defineEventHandler(async (event) => {
  const body = await readValidatedBody(event, schema.parse)
  const user = useDb().prepare('SELECT * FROM users WHERE username = ?').get(body.username) as UserRow | undefined
  // Même message dans les deux cas pour ne pas révéler l'existence d'un compte.
  if (!user || !(await verifyPassword(user.password_hash, body.password))) {
    throw createError({ statusCode: 401, statusMessage: 'Identifiants incorrects' })
  }
  await setUserSession(event, { user: { id: user.id, username: user.username } })
  return { ok: true }
})
