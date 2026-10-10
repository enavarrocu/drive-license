import type { ExamAnswer, Lang } from '../types'

/**
 * Estado del usuario (preferencias, progreso, curso, exámenes) cargado desde
 * /api/me tras el login y actualizado de forma optimista en cada acción.
 * Reemplaza al antiguo localStorage: ahora todo vive en SQLite.
 */

export interface Prefs {
  lang: Lang
  speak: boolean
  helpEs: boolean
  answerSeconds: number
}
export interface ProgressEntry {
  ok: number
  ko: number
  flagged: boolean
}
export interface ExamSummary {
  id: number
  date: string
  score: number
  total: number
  passed: boolean
  graveErrors: number
  minorErrors: number
  durationSec: number
  helpEs: boolean
  answerSeconds: number
  answers?: ExamAnswer[]
}
interface Me {
  user: { id: number; username: string }
  prefs: Prefs
  progress: Record<string, ProgressEntry>
  courseRead: string[]
  exams: ExamSummary[]
}

export function useStore() {
  const prefs = useState<Prefs>('prefs', () => ({ lang: 'fr', speak: true, helpEs: false, answerSeconds: 15 }))
  const progress = useState<Record<string, ProgressEntry>>('progress', () => ({}))
  const courseRead = useState<Record<string, true>>('courseRead', () => ({}))
  const exams = useState<ExamSummary[]>('exams', () => [])
  const loaded = useState<boolean>('storeLoaded', () => false)
  // Côté serveur, $fetch n'envoie pas les cookies de la requête : useRequestFetch les transmet.
  const requestFetch = useRequestFetch()

  async function load(force = false) {
    if (loaded.value && !force) return
    const me = await requestFetch<Me>('/api/me')
    prefs.value = me.prefs
    progress.value = me.progress
    courseRead.value = Object.fromEntries(me.courseRead.map((c) => [c, true]))
    exams.value = me.exams
    loaded.value = true
  }

  function reset() {
    loaded.value = false
    progress.value = {}
    courseRead.value = {}
    exams.value = []
  }

  /** Guarda las preferencias (optimista). */
  async function setPrefs(patch: Partial<Prefs>) {
    prefs.value = { ...prefs.value, ...patch }
    await $fetch('/api/prefs', { method: 'PUT', body: patch }).catch(() => {})
  }

  const lang = computed<Lang>({
    get: () => prefs.value.lang,
    set: (v) => void setPrefs({ lang: v }),
  })

  async function recordStudy(questionId: string, ok: boolean) {
    const cur = progress.value[questionId] ?? { ok: 0, ko: 0, flagged: false }
    progress.value = { ...progress.value, [questionId]: { ...cur, ok: cur.ok + (ok ? 1 : 0), ko: cur.ko + (ok ? 0 : 1) } }
    await $fetch('/api/progress/record', { method: 'POST', body: { questionId, ok } }).catch(() => {})
  }

  async function toggleFlag(questionId: string) {
    const cur = progress.value[questionId] ?? { ok: 0, ko: 0, flagged: false }
    const flagged = !cur.flagged
    progress.value = { ...progress.value, [questionId]: { ...cur, flagged } }
    await $fetch('/api/progress/flag', { method: 'POST', body: { questionId, flagged } }).catch(() => {})
  }

  async function markChapter(chapterId: string, read = true) {
    const next = { ...courseRead.value }
    if (read) next[chapterId] = true
    else delete next[chapterId]
    courseRead.value = next
    await $fetch('/api/course/read', { method: 'POST', body: { chapterId, read } }).catch(() => {})
  }

  async function saveExam(exam: Omit<ExamSummary, 'id'> & { answers: ExamAnswer[] }) {
    const saved = await $fetch<ExamSummary>('/api/exams', { method: 'POST', body: exam })
    exams.value = [saved, ...exams.value].slice(0, 50)
    return saved
  }

  async function resetAll() {
    await $fetch('/api/progress/reset', { method: 'POST' })
    progress.value = {}
    courseRead.value = {}
    exams.value = []
  }

  return { prefs, lang, progress, courseRead, exams, loaded, load, reset, setPrefs, recordStudy, toggleFlag, markChapter, saveExam, resetAll }
}
