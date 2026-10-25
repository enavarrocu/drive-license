import type { H3Event } from 'h3'

/**
 * Journal des erreurs serveur : une ligne JSON par erreur (`"type":"server-error"`), avec méthode,
 * route, utilisateur s'il y en a un et une pile résumée. Couvre les erreurs non capturées des
 * handlers et du rendu (hook `error`, statut ≥ 500 ou sans statut), les promesses rejetées hors
 * requête, et les réponses 5xx renvoyées sans exception (hook `afterResponse`).
 * Les 4xx (401, 403, 404, validation zod…) sont normales et ne sont pas journalisées.
 * Filtrer dans Coolify : rechercher `server-error`.
 */

const LOGGED = '__errorLogged'

function shortStack(stack: string | undefined): string[] | undefined {
  if (!stack) return undefined
  return stack
    .split('\n')
    .slice(1)
    .map((l) => l.trim().replace(/file:\/\/\S*?\/\.output\//, ''))
    .filter((l) => l.startsWith('at ') && !l.includes('node:internal') && !l.includes('/node_modules/'))
    .slice(0, 6)
}

async function userOf(event: H3Event): Promise<string | undefined> {
  try {
    const s = await getUserSession(event)
    return s.user ? `${s.user.username}#${s.user.id}` : undefined
  } catch {
    return undefined
  }
}

async function logServerError(event: H3Event | undefined, status: number | undefined, err: unknown, tags?: string[]) {
  const e = (err ?? {}) as { message?: string; stack?: string; cause?: unknown; statusMessage?: string }
  const cause = e.cause as { message?: string; stack?: string } | undefined
  const line: Record<string, unknown> = {
    level: 'error',
    type: 'server-error',
    time: new Date().toISOString(),
    status: status ?? 500,
    method: event?.method,
    path: event?.path,
    user: event ? await userOf(event) : undefined,
    message: (cause?.message || e.message || e.statusMessage || String(err)).slice(0, 500),
    stack: shortStack(cause?.stack || e.stack),
    tags,
  }
  console.error(JSON.stringify(line))
}

export default defineNitroPlugin((nitroApp) => {
  nitroApp.hooks.hook('error', async (error, { event, tags }) => {
    try {
      const status = (error as { statusCode?: number }).statusCode
      if (status !== undefined && status < 500) return
      if (event) {
        if (event.context[LOGGED]) return
        event.context[LOGGED] = true
      }
      await logServerError(event, status, error, tags)
    } catch {
      /* ne jamais faire échouer la journalisation */
    }
  })

  nitroApp.hooks.hook('afterResponse', async (event) => {
    try {
      const status = event.node?.res?.statusCode
      if (!status || status < 500 || event.context[LOGGED]) return
      event.context[LOGGED] = true
      await logServerError(event, status, new Error(`Réponse ${status} sans exception`), ['response'])
    } catch {
      /* idem */
    }
  })
})
