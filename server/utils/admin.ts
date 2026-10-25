import type { H3Event } from 'h3'

/** Administrateurs = noms listés dans NUXT_ADMIN_USERS (séparés par des virgules, sans casse). */
export function isAdmin(username: string): boolean {
  const list = String(useRuntimeConfig().adminUsers || '')
    .split(',')
    .map((s) => s.trim().toLowerCase())
    .filter(Boolean)
  return list.includes(username.toLowerCase())
}

export async function requireAdmin(event: H3Event) {
  const session = await requireUserSession(event)
  if (!isAdmin(session.user.username)) throw createError({ statusCode: 403, statusMessage: 'Réservé aux administrateurs' })
  return session
}
