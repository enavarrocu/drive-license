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
-- Objectif quotidien : réponses en mode étude par jour civil de Bruxelles (YYYY-MM-DD).
CREATE TABLE IF NOT EXISTS study_days (
  user_id INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  day TEXT NOT NULL,
  answers INTEGER NOT NULL DEFAULT 0,
  PRIMARY KEY (user_id, day)
);
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
  const prefCols = new Set((d.prepare('PRAGMA table_info(prefs)').all() as { name: string }[]).map((c) => c.name))
  // Objectif quotidien (réponses par jour en mode étude).
  if (!prefCols.has('daily_goal')) d.exec('ALTER TABLE prefs ADD COLUMN daily_goal INTEGER NOT NULL DEFAULT 20')
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
  daily_goal: number
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

/* ---------- objectif quotidien ---------- */
const TZ = 'Europe/Brussels'
const dayFmt = new Intl.DateTimeFormat('en-CA', { timeZone: TZ, year: 'numeric', month: '2-digit', day: '2-digit' })

/** Jour civil à Bruxelles (YYYY-MM-DD) d'un instant donné. */
export function brusselsDay(at: Date | number = Date.now()): string {
  // en-CA formate déjà en AAAA-MM-JJ ; formatToParts évite de dépendre de ce détail.
  const parts = Object.fromEntries(dayFmt.formatToParts(at).map((p) => [p.type, p.value]))
  return `${parts.year}-${parts.month}-${parts.day}`
}

/** Jour précédent d'une date YYYY-MM-DD (arithmétique sur le calendrier, sans fuseau). */
function prevDay(day: string, n = 1): string {
  const d = new Date(`${day}T12:00:00Z`)
  d.setUTCDate(d.getUTCDate() - n)
  return d.toISOString().slice(0, 10)
}

export interface DailySummary {
  goal: number
  today: number
  /** Jours consécutifs avec answers ≥ goal, finissant aujourd'hui (ou hier si aujourd'hui n'est pas encore atteint). */
  streak: number
  /** 7 derniers jours, du plus ancien à aujourd'hui. */
  last7: { day: string; answers: number }[]
}

export function addStudyAnswer(userId: number, at: Date) {
  useDb()
    .prepare('INSERT INTO study_days (user_id, day, answers) VALUES (?, ?, 1) ON CONFLICT(user_id, day) DO UPDATE SET answers = answers + 1')
    .run(userId, brusselsDay(at))
}

export function getDaily(userId: number, goal: number): DailySummary {
  const today = brusselsDay()
  const rows = useDb()
    .prepare('SELECT day, answers FROM study_days WHERE user_id = ? AND day <= ? ORDER BY day DESC LIMIT 400')
    .all(userId, today) as { day: string; answers: number }[]
  const byDay = new Map(rows.map((r) => [r.day, r.answers]))
  const todayCount = byDay.get(today) ?? 0
  let streak = 0
  let day = todayCount >= goal ? today : prevDay(today)
  while ((byDay.get(day) ?? 0) >= goal) {
    streak++
    day = prevDay(day)
  }
  const last7 = Array.from({ length: 7 }, (_, i) => {
    const d = prevDay(today, 6 - i)
    return { day: d, answers: byDay.get(d) ?? 0 }
  })
  return { goal, today: todayCount, streak, last7 }
}
