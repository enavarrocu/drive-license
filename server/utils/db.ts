import Database from 'better-sqlite3'
import { mkdirSync } from 'node:fs'
import { dirname } from 'node:path'

/**
 * Base SQLite unique pour l'app (better-sqlite3, synchrone, fichier sur disque).
 * Le chemin vient de runtimeConfig.dbPath (env NUXT_DB_PATH). Les tables sont
 * créées au premier accès ; les migrations sont de simples ALTER idempotents.
 */

let db: Database.Database | null = null

const SCHEMA = `
CREATE TABLE IF NOT EXISTS users (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  username TEXT NOT NULL UNIQUE COLLATE NOCASE,
  password_hash TEXT NOT NULL,
  created_at TEXT NOT NULL DEFAULT (datetime('now'))
);
CREATE TABLE IF NOT EXISTS prefs (
  user_id INTEGER PRIMARY KEY REFERENCES users(id) ON DELETE CASCADE,
  lang TEXT NOT NULL DEFAULT 'fr',
  speak INTEGER NOT NULL DEFAULT 1,
  help_es INTEGER NOT NULL DEFAULT 0,
  answer_seconds INTEGER NOT NULL DEFAULT 15,
  updated_at TEXT NOT NULL DEFAULT (datetime('now'))
);
CREATE TABLE IF NOT EXISTS progress (
  user_id INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  question_id TEXT NOT NULL,
  ok INTEGER NOT NULL DEFAULT 0,
  ko INTEGER NOT NULL DEFAULT 0,
  flagged INTEGER NOT NULL DEFAULT 0,
  updated_at TEXT NOT NULL DEFAULT (datetime('now')),
  PRIMARY KEY (user_id, question_id)
);
CREATE TABLE IF NOT EXISTS course_read (
  user_id INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  chapter_id TEXT NOT NULL,
  read_at TEXT NOT NULL DEFAULT (datetime('now')),
  PRIMARY KEY (user_id, chapter_id)
);
CREATE TABLE IF NOT EXISTS exams (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  user_id INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  date TEXT NOT NULL,
  score INTEGER NOT NULL,
  total INTEGER NOT NULL,
  passed INTEGER NOT NULL,
  grave_errors INTEGER NOT NULL,
  minor_errors INTEGER NOT NULL,
  duration_sec INTEGER NOT NULL,
  help_es INTEGER NOT NULL DEFAULT 0,
  answer_seconds INTEGER NOT NULL DEFAULT 15,
  answers TEXT NOT NULL
);
CREATE INDEX IF NOT EXISTS exams_user_date ON exams(user_id, date DESC);
-- Erreurs signalées par les utilisateurs sur une question (traitées par un administrateur).
CREATE TABLE IF NOT EXISTS reports (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  user_id INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  question_id TEXT NOT NULL,
  message TEXT NOT NULL,
  lang TEXT NOT NULL DEFAULT 'fr',
  status TEXT NOT NULL DEFAULT 'open',
  created_at TEXT NOT NULL DEFAULT (datetime('now'))
);
CREATE INDEX IF NOT EXISTS reports_status ON reports(status, created_at DESC);
`

export function useDb(): Database.Database {
  if (db) return db
  const path = useRuntimeConfig().dbPath as string
  mkdirSync(dirname(path), { recursive: true })
  db = new Database(path)
  db.pragma('journal_mode = WAL')
  db.pragma('foreign_keys = ON')
  db.exec(SCHEMA)
  migrate(db)
  return db
}

/** Migrations idempotentes (colonnes ajoutées après la création des tables). */
function migrate(d: Database.Database) {
  const cols = new Set((d.prepare('PRAGMA table_info(progress)').all() as { name: string }[]).map((c) => c.name))
  // Révision espacée : bonnes réponses consécutives (remis à 0 sur une erreur) et date de la dernière réponse.
  if (!cols.has('streak')) d.exec('ALTER TABLE progress ADD COLUMN streak INTEGER NOT NULL DEFAULT 0')
  if (!cols.has('seen_at')) d.exec('ALTER TABLE progress ADD COLUMN seen_at TEXT')
}

/* ---------- types des lignes ---------- */
export interface UserRow {
  id: number
  username: string
  password_hash: string
  created_at: string
}
export interface PrefsRow {
  user_id: number
  lang: 'fr' | 'es'
  speak: number
  help_es: number
  answer_seconds: number
}
export interface ProgressRow {
  question_id: string
  ok: number
  ko: number
  flagged: number
  streak: number
  /** ISO (UTC) de la dernière réponse en mode étude ; null pour les lignes antérieures. */
  seen_at: string | null
}
export interface ReportRow {
  id: number
  user_id: number
  question_id: string
  message: string
  lang: 'fr' | 'es'
  status: 'open' | 'done'
  created_at: string
}
export interface ExamRow {
  id: number
  user_id: number
  date: string
  score: number
  total: number
  passed: number
  grave_errors: number
  minor_errors: number
  duration_sec: number
  help_es: number
  answer_seconds: number
  answers: string
}

/* ---------- helpers ---------- */
export function getPrefs(userId: number): PrefsRow {
  const d = useDb()
  let row = d.prepare('SELECT * FROM prefs WHERE user_id = ?').get(userId) as PrefsRow | undefined
  if (!row) {
    d.prepare('INSERT INTO prefs (user_id) VALUES (?)').run(userId)
    row = d.prepare('SELECT * FROM prefs WHERE user_id = ?').get(userId) as PrefsRow
  }
  return row
}

export function getProgress(userId: number): ProgressRow[] {
  return useDb().prepare('SELECT question_id, ok, ko, flagged, streak, seen_at FROM progress WHERE user_id = ?').all(userId) as ProgressRow[]
}

export function getCourseRead(userId: number): string[] {
  return (useDb().prepare('SELECT chapter_id FROM course_read WHERE user_id = ?').all(userId) as { chapter_id: string }[]).map((r) => r.chapter_id)
}

export function requireUserId(event: Parameters<typeof requireUserSession>[0]): Promise<number> {
  return requireUserSession(event).then((s) => s.user.id)
}
