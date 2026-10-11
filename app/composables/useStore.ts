import type { ExamAnswer, Lang } from '../types'
import { enqueue, flush, isNetworkError, pendingCount, refreshPending } from '../lib/outbox'

/**
 * Estado del usuario (preferencias, progreso, curso, exámenes) cargado desde
 * /api/me tras el login y actualizado de forma optimista en cada acción.
 * Reemplaza al antiguo localStorage: ahora todo vive en SQLite.
 *
 * Sin conexión, las escrituras se guardan en la cola `lib/outbox` (IndexedDB)
 * y se reenvían con `syncOutbox()` cuando vuelve la red o al abrir la app.
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
  // Idioma elegido en este dispositivo, también antes de iniciar sesión (login/registro).
  // Al cargar el usuario se sincroniza con sus preferencias en el servidor.
  const langCookie = useCookie<Lang>('lang', { default: () => 'fr', maxAge: 60 * 60 * 24 * 365, sameSite: 'lax' })
  const { loggedIn, user } = useUserSession()
  const prefs = useState<Prefs>('prefs', () => ({ lang: langCookie.value === 'es' ? 'es' : 'fr', speak: true, helpEs: false, answerSeconds: 15 }))
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
    langCookie.value = me.prefs.lang
    progress.value = me.progress
    courseRead.value = Object.fromEntries(me.courseRead.map((c) => [c, true]))
    exams.value = me.exams
    loaded.value = true
    if (import.meta.client) void refreshPending(me.user.id)
  }

  function reset() {
    loaded.value = false
    progress.value = {}
    courseRead.value = {}
    exams.value = []
    pendingCount.value = 0
  }

  /**
   * Envía una escritura a la API. Si falla por red, la encola para reenviarla
   * más tarde (el estado local ya se actualizó de forma optimista).
   */
  async function send(url: string, method: 'POST' | 'PUT', body: Record<string, unknown>) {
    if (!loggedIn.value) return
    try {
      await $fetch(url, { method, body })
    } catch (e) {
      if (isNetworkError(e) && user.value) await enqueue({ userId: user.value.id, url, method, body })
    }
  }

  /** Reenvía la cola pendiente y, si envió algo, recarga el estado del servidor. */
  async function syncOutbox() {
    if (!loggedIn.value || !user.value) return
    const sent = await flush(user.value.id)
    if (sent > 0) await load(true).catch(() => {})
  }

  /** Guarda las preferencias (optimista). */
  async function setPrefs(patch: Partial<Prefs>) {
    prefs.value = { ...prefs.value, ...patch }
    if (patch.lang) langCookie.value = patch.lang
    await send('/api/prefs', 'PUT', patch)
  }

  const lang = computed<Lang>({
    get: () => prefs.value.lang,
    set: (v) => void setPrefs({ lang: v }),
  })

  async function recordStudy(questionId: string, ok: boolean) {
    const cur = progress.value[questionId] ?? { ok: 0, ko: 0, flagged: false }
    progress.value = { ...progress.value, [questionId]: { ...cur, ok: cur.ok + (ok ? 1 : 0), ko: cur.ko + (ok ? 0 : 1) } }
    await send('/api/progress/record', 'POST', { questionId, ok })
  }

  async function toggleFlag(questionId: string) {
    const cur = progress.value[questionId] ?? { ok: 0, ko: 0, flagged: false }
    const flagged = !cur.flagged
    progress.value = { ...progress.value, [questionId]: { ...cur, flagged } }
    await send('/api/progress/flag', 'POST', { questionId, flagged })
  }

  async function markChapter(chapterId: string, read = true) {
    const next = { ...courseRead.value }
    if (read) next[chapterId] = true
    else delete next[chapterId]
    courseRead.value = next
    await send('/api/course/read', 'POST', { chapterId, read })
  }

  /**
   * Guarda un examen. Sin red, lo encola y devuelve un resumen local (id 0):
   * aparecerá en el historial cuando se reenvíe la cola.
   */
  async function saveExam(exam: Omit<ExamSummary, 'id'> & { answers: ExamAnswer[] }) {
    try {
      const saved = await $fetch<ExamSummary>('/api/exams', { method: 'POST', body: exam })
      exams.value = [saved, ...exams.value].slice(0, 50)
      return saved
    } catch (e) {
      if (!isNetworkError(e) || !user.value) throw e
      await enqueue({ userId: user.value.id, url: '/api/exams', method: 'POST', body: exam as unknown as Record<string, unknown> })
      return { id: 0, ...exam }
    }
  }

  async function resetAll() {
    await $fetch('/api/progress/reset', { method: 'POST' })
    progress.value = {}
    courseRead.value = {}
    exams.value = []
  }

  return { prefs, lang, progress, courseRead, exams, loaded, pendingCount, load, reset, setPrefs, recordStudy, toggleFlag, markChapter, saveExam, resetAll, syncOutbox }
}
