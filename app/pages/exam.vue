<script setup lang="ts">
import type { ExamAnswer, Question } from '../types'
import { questions } from '../data/questions'
import { EXAM, grade, sampleExam, score } from '../lib/exam'
import { speakText, stopSpeaking, speechAvailable } from '../lib/speech'
import type { ExamSummary } from '../composables/useStore'

type Phase = 'setup' | 'reading' | 'answering' | 'result'

const { lang, prefs, setPrefs, saveExam } = useStore()

const phase = ref<Phase>('setup')
const { locked: signPopupLocked } = useSignPopup()
// Sin popups de señales mientras dura el examen (revelarían la respuesta).
watch(phase, (p) => (signPopupLocked.value = p === 'reading' || p === 'answering'), { immediate: true })
onBeforeUnmount(() => (signPopupLocked.value = false))
const helpEs = computed({ get: () => prefs.value.helpEs, set: (v: boolean) => void setPrefs({ helpEs: v }) })
const speak = computed({ get: () => prefs.value.speak, set: (v: boolean) => void setPrefs({ speak: v }) })
const answerSeconds = computed({ get: () => prefs.value.answerSeconds, set: (v: number) => void setPrefs({ answerSeconds: v }) })
const canSpeak = ref(false)
onMounted(() => (canSpeak.value = speechAvailable()))

const exam = ref<Question[]>([])
const index = ref(0)
const chosen = ref<number | null>(null)
const answers = ref<ExamAnswer[]>([])
const remaining = ref(0)
const result = ref<ExamSummary | null>(null)
const saving = ref(false)
const startedAt = ref(0)
let tick: number | undefined
let readTimer: number | undefined
/** Identifie la lecture en cours : une lecture périmée (question précédente) ne doit jamais lancer le décompte. */
let readToken = 0

const current = computed(() => exam.value[index.value])
const pct = computed(() => (remaining.value / answerSeconds.value) * 100)

function start() {
  exam.value = sampleExam(questions, EXAM.questions)
  index.value = 0
  answers.value = []
  result.value = null
  startedAt.value = Date.now()
  present()
}
function present() {
  chosen.value = null
  phase.value = 'reading'
  clearTimers()
  const q = current.value
  if (!q) return void finish()
  const text = `${q.fr.q} ${q.fr.options.map((o, i) => `Réponse ${'ABCD'[i]} : ${o}`).join('. ')}`
  const token = ++readToken
  if (speak.value && canSpeak.value) {
    void speakText(text, 'fr').then(() => {
      if (token === readToken && phase.value === 'reading') startCountdown()
    })
  } else {
    readTimer = window.setTimeout(startCountdown, EXAM.readSecondsFallback * 1000)
  }
}
function startCountdown() {
  if (phase.value === 'answering') return
  clearTimers()
  phase.value = 'answering'
  remaining.value = answerSeconds.value
  tick = window.setInterval(() => {
    remaining.value -= 0.1
    if (remaining.value <= 0) {
      remaining.value = 0
      commit()
    }
  }, 100)
}
function skipReading() {
  readToken++
  stopSpeaking()
  if (phase.value === 'reading') startCountdown()
}
function choose(i: number) {
  if (phase.value === 'answering') chosen.value = i
}
function commit() {
  if (phase.value !== 'answering') return
  clearTimers()
  const q = current.value
  if (!q) return
  answers.value.push(grade(q, chosen.value))
  if (index.value < exam.value.length - 1) {
    index.value++
    present()
  } else {
    void finish()
  }
}
async function finish() {
  readToken++
  clearTimers()
  stopSpeaking()
  const s = score(answers.value, exam.value.length)
  const payload = {
    ...s,
    date: new Date().toISOString(),
    durationSec: Math.round((Date.now() - startedAt.value) / 1000),
    helpEs: helpEs.value,
    answerSeconds: answerSeconds.value,
    answers: answers.value,
  }
  phase.value = 'result'
  saving.value = true
  try {
    result.value = await saveExam(payload)
  } catch {
    // Si le serveur ne répond pas, on affiche quand même le résultat local.
    result.value = { id: 0, ...payload }
  } finally {
    saving.value = false
  }
}
function abort() {
  readToken++
  clearTimers()
  stopSpeaking()
  phase.value = 'setup'
}
function clearTimers() {
  if (tick) clearInterval(tick)
  if (readTimer) clearTimeout(readTimer)
  tick = undefined
  readTimer = undefined
}
onBeforeUnmount(() => {
  clearTimers()
  stopSpeaking()
})
</script>

<template>
  <div>
    <div v-if="phase === 'setup'" class="card">
      <h2>{{ lang === 'fr' ? 'Simulation d\'examen' : 'Simulacro de examen' }}</h2>
      <p class="muted">
        {{ EXAM.questions }} {{ lang === 'fr' ? 'questions' : 'preguntas' }} · {{ lang === 'fr' ? 'réussite à' : 'aprobado con' }} {{ EXAM.passMark }}/{{ EXAM.questions }} ·
        {{ lang === 'fr' ? 'erreur simple −1, faute grave −5 (2 fautes graves = échec)' : 'error simple −1, falta grave −5 (2 faltas graves = suspenso)' }}
      </p>
      <p class="small">
        {{ lang === 'fr'
          ? 'Comme au centre d\'examen : la question est lue, puis vous avez 15 secondes pour répondre. Une réponse validée ne peut plus être modifiée.'
          : 'Como en el centro de examen: se lee la pregunta y después tienes 15 segundos para responder. Una respuesta validada no se puede cambiar.' }}
      </p>
      <div class="row small" style="margin: 12px 0">
        <label><input v-model="helpEs" type="checkbox" /> {{ lang === 'fr' ? 'Aide : afficher l\'espagnol sous le français' : 'Ayuda: mostrar el español bajo el francés' }}</label>
        <label v-if="canSpeak"><input v-model="speak" type="checkbox" /> {{ lang === 'fr' ? 'Lecture à voix haute' : 'Lectura en voz alta' }}</label>
        <label>
          {{ lang === 'fr' ? 'Temps de réponse' : 'Tiempo de respuesta' }}
          <select v-model.number="answerSeconds">
            <option :value="15">15 s ({{ lang === 'fr' ? 'réel' : 'real' }})</option>
            <option :value="30">30 s</option>
            <option :value="45">45 s</option>
          </select>
        </label>
      </div>
      <button class="btn primary" type="button" @click="start">{{ lang === 'fr' ? 'Commencer' : 'Empezar' }}</button>
    </div>

    <div v-else-if="phase === 'reading' || phase === 'answering'" class="card">
      <div class="row small">
        <span class="timer-label">{{ index + 1 }} / {{ exam.length }}</span>
        <span class="grow"></span>
        <span v-if="phase === 'reading'" class="pill warn">{{ lang === 'fr' ? 'Lecture…' : 'Lectura…' }}</span>
        <span v-else class="timer-label" :style="{ color: remaining < 5 ? 'var(--ko)' : undefined }">{{ Math.ceil(remaining) }} s</span>
      </div>
      <div class="timer" :class="{ low: remaining < 5 }"><div :style="{ width: (phase === 'answering' ? pct : 100) + '%' }"></div></div>
      <QuestionCard v-if="current" :question="current" lang="fr" :show-alt="helpEs" :chosen="chosen" :disabled="phase !== 'answering'" @choose="choose" />
      <div class="row" style="margin-top: 14px">
        <button class="btn sm ghost danger" type="button" @click="abort">{{ lang === 'fr' ? 'Abandonner' : 'Abandonar' }}</button>
        <span class="grow"></span>
        <button v-if="phase === 'reading'" class="btn" type="button" @click="skipReading">{{ lang === 'fr' ? 'Passer la lecture' : 'Saltar la lectura' }}</button>
        <button v-else class="btn primary" type="button" :disabled="chosen === null" @click="commit">{{ lang === 'fr' ? 'Valider' : 'Validar' }}</button>
      </div>
    </div>

    <div v-else-if="phase === 'result'">
      <div v-if="!result" class="card"><p class="muted">{{ lang === 'fr' ? 'Enregistrement…' : 'Guardando…' }}</p></div>
      <template v-else>
        <ExamResultCard :exam="result" :lang="lang" review="wrong" />
        <div class="card">
          <div class="row">
            <button class="btn primary" type="button" @click="phase = 'setup'">{{ lang === 'fr' ? 'Nouvel examen' : 'Nuevo examen' }}</button>
            <NuxtLink v-if="result.id" :to="`/exams/${result.id}`" class="btn">{{ lang === 'fr' ? 'Revoir en détail' : 'Ver en detalle' }}</NuxtLink>
          </div>
        </div>
      </template>
    </div>
  </div>
</template>
