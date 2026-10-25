import { z } from 'zod'

const schema = z.object({ status: z.enum(['open', 'done']) })

/** Marque un signalement comme traité (ou le rouvre). Administrateurs. */
export default defineEventHandler(async (event) => {
  await requireAdmin(event)
  const id = Number(getRouterParam(event, 'id'))
  if (!Number.isInteger(id)) throw createError({ statusCode: 400 })
  const { status } = await readValidatedBody(event, schema.parse)
  const res = useDb().prepare('UPDATE reports SET status = ? WHERE id = ?').run(status, id)
  if (!res.changes) throw createError({ statusCode: 404 })
  return { ok: true }
})
