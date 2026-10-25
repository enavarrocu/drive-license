/** Liste des copies de sécurité de la base (administrateurs). */
export default defineEventHandler(async (event) => {
  await requireAdmin(event)
  const dbPath = useRuntimeConfig().dbPath as string
  return { dir: backupDirFor(dbPath), ...backupSettings(), backups: listBackups(dbPath) }
})
