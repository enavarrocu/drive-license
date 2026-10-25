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
  /** Objectif quotidien : réponses en mode étude par jour (10, 20, 30 ou 50). */
  dailyGoal: number
}
/** Objectif quotidien et série de jours (jours civils de Bruxelles). */
export interface Daily {
  goal: number
  today: number
  /** Jours consécutifs avec l'objectif atteint, jusqu'à aujourd'hui (ou hier si aujourd'hui n'est pas encore atteint). */
  streak: number
  /** 7 derniers jours, du plus ancien à aujourd'hui. */
  last7: { day: string; answers: number }[]
}
export const DAILY_GOALS = [10, 20, 30, 50] as const
export interface ProgressEntry {
  ok: number
  ko: number
  flagged: boolean
  /** Bonnes réponses consécutives en mode étude (0 après une erreur). */
  streak: number
  /** Dernière réponse en mode étude (ISO), null si jamais ou avant la révision espacée. */
  seenAt: string | null
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
  isAdmin: boolean
  prefs: Prefs
  progress: Record<string, ProgressEntry>
  courseRead: string[]
  exams: ExamSummary[]
  daily: Daily
}

const emptyEntry = (): ProgressEntry => ({ ok: 0, ko: 0, flagged: false, streak: 0, seenAt: null })

const dayFmt = new Intl.DateTimeFormat('en-CA', { timeZone: 'Europe/Brussels', year: 'numeric', month: '2-digit', day: '2-digit' })
/** Jour civil à Bruxelles (YYYY-MM-DD), comme côté serveur. */
function brusselsDay(at: Date = new Date()): string {
  const p = Object.fromEntries(dayFmt.formatToParts(at).map((x) => [x.type, x.value]))
  return `${p.year}-${p.month}-${p.day}`
}
function shiftDay(day: string, n: number): string {
  const d = new Date(`${day}T12:00:00Z`)
  d.setUTCDate(d.getUTCDate() + n)
  return d.toISOString().slice(0, 10)
}
const emptyDaily = (goal = 20): Daily => {
  const today = brusselsDay()
  return { goal, today: 0, streak: 0, last7: Array.from({ length: 7 }, (_, i) => ({ day: shiftDay(today, i - 6), answers: 0 })) }
}

export function useStore() {
  // Idioma elegido en este dispositivo, también antes de iniciar sesión (login/registro).
  // Al cargar el usuario se sincroniza con sus preferencias en el servidor.
  const langCookie = useCookie<Lang>('lang', { default: () => 'fr', maxAge: 60 * 60 * 24 * 365, sameSite: 'lax' })
  const { loggedIn, user } = useUserSession()
  const prefs = useState<Prefs>('prefs', () => ({ lang: langCookie.value === 'es' ? 'es' : 'fr', speak: true, helpEs: false, answerSeconds: 15, dailyGoal: 20 }))
  const progress = useState<Record<string, ProgressEntry>>('progress', () => ({}))
  const courseRead = useState<Record<string, true>>('courseRead', () => ({}))
  const exams = useState<ExamSummary[]>('exams', () => [])
  const loaded = useState<boolean>('storeLoaded', () => false)
  const isAdmin = useState<boolean>('isAdmin', () => false)
  const daily = useState<Daily>('daily', () => emptyDaily())
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
    isAdmin.value = me.isAdmin
    daily.value = me.daily
    loaded.value = true
    if (import.meta.client) void refreshPending(me.user.id)
  }

  function reset() {
    loaded.value = false
    progress.value = {}
    courseRead.value = {}
    exams.value = []
    isAdmin.value = false
    daily.value = emptyDaily()
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
    if (patch.dailyGoal && patch.dailyGoal !== daily.value.goal) {
      // La série dépend de l'objectif sur tout l'historique : on change l'objectif localement,
      // puis on recharge le résumé exact (série comprise) depuis le serveur.
      daily.value = { ...daily.value, goal: patch.dailyGoal }
    }
    await send('/api/prefs', 'PUT', patch)
    if (patch.dailyGoal && loggedIn.value) {
      const me = await $fetch<Me>('/api/me').catch(() => null)
      if (me) daily.value = me.daily
    }
  }

  /** Compte une réponse d'étude pour l'objectif du jour (optimiste, change de jour si minuit est passé). */
  function bumpDaily(at: Date) {
    const day = brusselsDay(at)
    let d = daily.value
    const last = d.last7[d.last7.length - 1]?.day
    if (last && day > last) {
      // Nouveau jour depuis le chargement : on décale la fenêtre ; la série survit si hier était atteint.
      const known = new Map(d.last7.map((x) => [x.day, x.answers]))
      const last7 = Array.from({ length: 7 }, (_, i) => {
        const k = shiftDay(day, i - 6)
        return { day: k, answers: known.get(k) ?? 0 }
      })
      const yesterday = known.get(shiftDay(day, -1)) ?? 0
      d = { ...d, today: 0, last7, streak: yesterday >= d.goal ? d.streak : 0 }
    } else if (last && day < last) return // horloge incohérente : le serveur tranchera
    const today = d.today + 1
    const streak = d.today < d.goal && today >= d.goal ? d.streak + 1 : d.streak
    const last7 = d.last7.map((x, i) => (i === d.last7.length - 1 ? { ...x, answers: today } : x))
    daily.value = { ...d, today, streak, last7 }
  }


  const lang = computed<Lang>({
    get: () => prefs.value.lang,
    set: (v) => void setPrefs({ lang: v }),
  })

  async function recordStudy(questionId: string, ok: boolean) {
    const cur = progress.value[questionId] ?? emptyEntry()
    const now = new Date()
    const at = now.toISOString()
    bumpDaily(now)
    progress.value = {
      ...progress.value,
      [questionId]: { ...cur, ok: cur.ok + (ok ? 1 : 0), ko: cur.ko + (ok ? 0 : 1), streak: ok ? cur.streak + 1 : 0, seenAt: at },
    }
    await send('/api/progress/record', 'POST', { questionId, ok, at })
  }

  async function toggleFlag(questionId: string) {
    const cur = progress.value[questionId] ?? emptyEntry()
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

  /**
   * Signale une erreur sur une question. Sans réseau, le signalement part dans la file hors ligne ;
   * les autres erreurs (limite quotidienne, texte trop court) remontent pour être affichées.
   */
  async function reportQuestion(questionId: string, message: string) {
    const body = { questionId, message, lang: prefs.value.lang }
    try {
      await $fetch('/api/reports', { method: 'POST', body })
    } catch (e) {
      if (isNetworkError(e) && user.value) await enqueue({ userId: user.value.id, url: '/api/reports', method: 'POST', body })
      else throw e
    }
  }

  async function resetAll() {
    await $fetch('/api/progress/reset', { method: 'POST' })
    progress.value = {}
    courseRead.value = {}
    exams.value = []
    daily.value = emptyDaily(prefs.value.dailyGoal)
  }

  return { prefs, lang, progress, courseRead, exams, daily, loaded, isAdmin, pendingCount, load, reset, setPrefs, recordStudy, toggleFlag, markChapter, saveExam, reportQuestion, resetAll, syncOutbox }
}
