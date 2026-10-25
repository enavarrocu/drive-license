/**
 * Sauvegarde automatique de la base SQLite : une copie au démarrage si la dernière a plus de 24 h,
 * puis vérification toutes les heures (copie dès que la dernière a 24 h). Désactivable avec
 * NUXT_BACKUP_DISABLED=true. Les erreurs sont journalisées (runBackup ne lève jamais) : une sauvegarde ratée ne fait pas tomber le serveur.
 */
const HOUR_MS = 60 * 60 * 1000

export default defineNitroPlugin(() => {
  // Pas pendant `nuxt build` / prerender ni en dev (la BD locale n'a pas besoin de copies).
  if (import.meta.prerender || import.meta.dev) return
  const { disabled } = backupSettings()
  if (disabled) {
    logJson('info', 'backup', { message: 'désactivé (NUXT_BACKUP_DISABLED)' })
    return
  }
  const check = (reason: 'startup' | 'interval') => {
    try {
      if (backupIsDue(useRuntimeConfig().dbPath as string)) void runBackup(reason)
    } catch (e) {
      logJson('error', 'backup-failed', { reason, message: (e as Error)?.message ?? String(e) })
    }
  }
  check('startup')
  // Vérification horaire plutôt qu'un intervalle de 24 h fixe : après un redémarrage, la
  // copie suivante tombe 24 h après la précédente, pas 24 h après le démarrage.
  const timer = setInterval(() => check('interval'), HOUR_MS)
  timer.unref()
})
