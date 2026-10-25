import { z } from 'zod'

const query = z.object({ status: z.enum(['open', 'done', 'all']).default('open') })

/** Liste des erreurs signalées (administrateurs). */
export default defineEventHandler(async (event) => {
  await requireAdmin(event)
  const { status } = await getValidatedQuery(event, query.parse)
  const rows = useDb()
    .prepare(
      `SELECT r.id, r.question_id, r.message, r.lang, r.status, r.created_at, u.username
       FROM reports r JOIN users u ON u.id = r.user_id
       ${status === 'all' ? '' : 'WHERE r.status = ?'}
       ORDER BY r.created_at DESC LIMIT 500`,
    )
    .all(...(status === 'all' ? [] : [status])) as (ReportRow & { username: string })[]
  return rows.map((r) => ({ id: r.id, questionId: r.question_id, message: r.message, lang: r.lang, status: r.status, createdAt: r.created_at, username: r.username }))
})
