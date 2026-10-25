import Database from 'better-sqlite3'
import { mkdirSync, readdirSync, renameSync, rmSync, statSync } from 'node:fs'
import { basename, dirname, extname, join } from 'node:path'

/**
 * Copies de sécurité de la base SQLite (better-sqlite3 `.backup()`, cohérent avec la WAL).
 * Destination : `<dossier de la BD>/backups/<nom>-YYYY-MM-DD.db` ; on garde les N plus récentes.
 * Le cœur (backupDatabase, rotateBackups, listBackups, checkIntegrity) n'utilise pas les
 * auto-imports de Nitro pour pouvoir être testé avec tsx ; runBackup() est l'entrée côté serveur.
 */

export interface BackupFile {
  name: string
  size: number
  /** ISO (UTC) de la dernière modification du fichier. */
  mtime: string
}

export interface BackupResult {
  path: string
  size: number
  durationMs: number
  integrity: string
  removed: string[]
}

const DAY_MS = 24 * 60 * 60 * 1000

/** Une ligne JSON par évènement, facile à filtrer dans les logs de Coolify (`"type":"backup"`). */
export function logJson(level: 'info' | 'warn' | 'error', type: string, data: Record<string, unknown>) {
  const line = JSON.stringify({ level, type, time: new Date().toISOString(), ...data })
  if (level === 'error') console.error(line)
  else if (level === 'warn') console.warn(line)
  else console.log(line)
}

export function backupDirFor(dbPath: string): string {
  return join(dirname(dbPath), 'backups')
}

function prefixFor(dbPath: string): string {
  return basename(dbPath, extname(dbPath)) || 'permis'
}

function backupPattern(prefix: string): RegExp {
  const esc = prefix.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
  return new RegExp(`^${esc}-\\d{4}-\\d{2}-\\d{2}\\.db$`)
}

/** Copies existantes, la plus récente en premier (le nom contient la date, donc tri par nom). */
export function listBackups(dbPath: string): BackupFile[] {
  const dir = backupDirFor(dbPath)
  const re = backupPattern(prefixFor(dbPath))
  let names: string[]
  try {
    names = readdirSync(dir)
  } catch {
    return []
  }
  return names
    .filter((n) => re.test(n))
    .sort()
    .reverse()
    .map((name) => {
      const st = statSync(join(dir, name))
      return { name, size: st.size, mtime: st.mtime.toISOString() }
    })
}

/** true s'il n'y a aucune copie ou si la plus récente a plus de 24 h. */
export function backupIsDue(dbPath: string, now = Date.now()): boolean {
  const latest = listBackups(dbPath).reduce((max, b) => Math.max(max, Date.parse(b.mtime)), 0)
  return now - latest >= DAY_MS
}

/** Supprime les copies au-delà des `keep` plus récentes. Renvoie les noms supprimés. */
export function rotateBackups(dbPath: string, keep: number): string[] {
  const dir = backupDirFor(dbPath)
  const old = listBackups(dbPath).slice(Math.max(1, keep))
  for (const b of old) {
    for (const suffix of ['', '-wal', '-shm']) rmSync(join(dir, b.name + suffix), { force: true })
  }
  return old.map((b) => b.name)
}

/** PRAGMA integrity_check sur un fichier ouvert en lecture seule ; « ok » si tout va bien. */
export function checkIntegrity(file: string): string {
  let d: Database.Database | null = null
  try {
    d = new Database(file, { readonly: true, fileMustExist: true })
    const rows = d.pragma('integrity_check') as { integrity_check: string }[]
    return rows.map((r) => r.integrity_check).join('; ')
  } catch (e) {
    // Fichier illisible (« database disk image is malformed »…) : résultat ≠ ok, pas d'exception.
    return `erreur : ${(e as Error)?.message ?? String(e)}`
  } finally {
    d?.close()
  }
}

/**
 * Copie `db` vers backups/<nom>-<date du jour UTC>.db (fichier temporaire puis rename : une copie
 * forcée le même jour remplace proprement celle du matin), vérifie l'intégrité, puis fait la rotation.
 */
export async function backupDatabase(db: Database.Database, dbPath: string, keep: number, now = new Date()): Promise<BackupResult> {
  const dir = backupDirFor(dbPath)
  mkdirSync(dir, { recursive: true })
  const file = join(dir, `${prefixFor(dbPath)}-${now.toISOString().slice(0, 10)}.db`)
  const tmp = `${file}.tmp`
  const t0 = Date.now()
  try {
    await db.backup(tmp)
    // La copie hérite du mode WAL : on la repasse en journal classique pour qu'elle soit un
    // fichier autonome (pas de -wal/-shm créés à la lecture, restauration = copier un seul fichier).
    const c = new Database(tmp)
    try {
      c.pragma('journal_mode = DELETE')
    } finally {
      c.close()
    }
    renameSync(tmp, file)
  } catch (e) {
    rmSync(tmp, { force: true })
    throw e
  }
  const durationMs = Date.now() - t0
  const integrity = checkIntegrity(file)
  const removed = rotateBackups(dbPath, keep)
  return { path: file, size: statSync(file).size, durationMs, integrity, removed }
}

/* ---------- côté serveur (auto-imports Nitro) ---------- */

export interface BackupSettings {
  disabled: boolean
  keep: number
}

/**
 * NUXT_BACKUP_DISABLED (défaut false) et NUXT_BACKUP_KEEP (défaut 14). Lues dans runtimeConfig
 * (backupDisabled / backupKeep) si elles y sont déclarées, sinon directement dans l'environnement.
 */
export function backupSettings(): BackupSettings {
  const rc = useRuntimeConfig() as Record<string, unknown>
  const disabledRaw = String(rc.backupDisabled ?? process.env.NUXT_BACKUP_DISABLED ?? 'false')
  const keepRaw = Number(rc.backupKeep ?? process.env.NUXT_BACKUP_KEEP ?? 14)
  return {
    disabled: ['true', '1', 'yes'].includes(disabledRaw.trim().toLowerCase()),
    keep: Number.isFinite(keepRaw) && keepRaw >= 1 ? Math.floor(keepRaw) : 14,
  }
}

let running: Promise<BackupResult | null> | null = null

/**
 * Lance une copie (une seule à la fois) et journalise le résultat. Ne lève jamais :
 * renvoie null en cas d'erreur pour ne pas faire tomber le serveur.
 */
export function runBackup(reason: 'startup' | 'interval' | 'manual'): Promise<BackupResult | null> {
  if (running) return running
  running = (async () => {
    const dbPath = useRuntimeConfig().dbPath as string
    try {
      const { keep } = backupSettings()
      const r = await backupDatabase(useDb(), dbPath, keep)
      logJson('info', 'backup', { reason, path: r.path, size: r.size, durationMs: r.durationMs, removed: r.removed })
      if (r.integrity !== 'ok') logJson('error', 'backup-integrity', { path: r.path, result: r.integrity.slice(0, 2000) })
      return r
    } catch (e) {
      const err = e as Error
      logJson('error', 'backup-failed', { reason, dbPath, message: err?.message ?? String(e) })
      return null
    } finally {
      running = null
    }
  })()
  return running
}
