/** Force une copie de sécurité immédiate (administrateurs). */
export default defineEventHandler(async (event) => {
  const { user } = await requireAdmin(event)
  logJson('info', 'backup-requested', { user: user.username })
  const r = await runBackup('manual')
  if (!r) throw createError({ statusCode: 500, message: 'Échec de la sauvegarde (voir les logs)' })
  return { name: r.path.split('/').pop(), size: r.size, durationMs: r.durationMs, integrity: r.integrity, removed: r.removed }
})
