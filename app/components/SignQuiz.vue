<script setup lang="ts">
import type { SignCategory } from '../types'
import { signs } from '../data/signs'
import { RELEARN_GAP } from '../lib/srs'
import { makeSignQuestion, signPlan, signProgressId, signsOf, type SignQuizKind, type SignQuizQuestion } from '../lib/signQuiz'
import type { SignWithSvg } from '../data/signs'

/** Quiz de signaux : image → nom (ou l'inverse), deux distracteurs de la même famille. */
const props = defineProps<{ category: SignCategory | 'all' }>()

const { lang, progress, recordStudy } = useStore()
const showAlt = ref(true)
const kindMode = ref<SignQuizKind | 'mix'>('name')
const letters = ['A', 'B', 'C']

const pool = computed(() => signsOf(signs, props.category))
const plan = computed(() => signPlan(pool.value, progress.value))

const queue = ref<SignWithSvg[]>([])
const index = ref(0)
const question = ref<SignQuizQuestion | null>(null)
const chosen = ref<number | null>(null)
const score = reactive({ ok: 0, ko: 0 })

function build() {
  const s = queue.value[index.value]
  if (!s) return void (question.value = null)
  const kind: SignQuizKind = kindMode.value === 'mix' ? (Math.random() < 0.5 ? 'name' : 'image') : kindMode.value
  question.value = makeSignQuestion(s, signs, kind)
  chosen.value = null
}
function restart() {
  // Signaux à revoir d'abord ; si tout est à jour, on repasse toute la famille (dans le désordre).
  const p = signPlan(pool.value, progress.value)
  queue.value = p.queue.length ? p.queue : signPlan(pool.value, {}).queue
  index.value = 0
  build()
}
watch(() => props.category, () => {
  score.ok = score.ko = 0
  restart()
})
watch(kindMode, build)
onMounted(restart)

const revealed = computed(() => chosen.value !== null)
const current = computed(() => question.value?.sign)

function choose(i: number) {
  const q = question.value
  if (!q || revealed.value) return
  chosen.value = i
  const ok = i === q.answer
  if (ok) score.ok++
  else score.ko++
  void recordStudy(signProgressId(q.sign.code), ok)
  // Erreur : le signal revient quelques questions plus loin dans la séance.
  if (!ok) {
    const rest = queue.value.slice(index.value + 1).filter((s) => s.code !== q.sign.code)
    rest.splice(Math.min(RELEARN_GAP - 1, rest.length), 0, q.sign)
    queue.value = [...queue.value.slice(0, index.value + 1), ...rest]
  }
}
function next() {
  if (index.value >= queue.value.length - 1) return restart()
  index.value++
  build()
}

function classFor(i: number) {
  if (!revealed.value) return {}
  if (i === question.value!.answer) return { correct: true }
  if (chosen.value === i) return { wrong: true }
  return {}
}

const cardEl = ref<HTMLElement | null>(null)
const { offset: swipeOffset } = useSwipe(cardEl, { onLeft: () => question.value && next() })

useHotkeys((key) => {
  if (!question.value) return
  const i = answerIndex(key)
  if (i !== null) {
    if (i < question.value.options.length) choose(i)
    return true
  }
  if (key === 'enter' || key === 'space' || key === 'arrowright') {
    if (!revealed.value) return
    next()
    return true
  }
  if (key === 't') return void (showAlt.value = !showAlt.value)
})
</script>

<template>
  <div>
    <div class="card sq-head">
      <div class="row small">
        <span class="muted">
          {{ plan.due }} {{ lang === 'fr' ? 'à revoir' : 'para repasar' }} · {{ plan.fresh }} {{ lang === 'fr' ? 'nouveaux' : 'nuevas' }}
          <template v-if="score.ok + score.ko"> · <b class="sq-ok">{{ score.ok }} ✓</b> <b class="sq-ko">{{ score.ko }} ✗</b></template>
        </span>
        <span class="grow"></span>
        <select v-model="kindMode" class="search" style="width: auto">
          <option value="name">{{ lang === 'fr' ? 'Signal → nom' : 'Señal → nombre' }}</option>
          <option value="image">{{ lang === 'fr' ? 'Nom → signal' : 'Nombre → señal' }}</option>
          <option value="mix">{{ lang === 'fr' ? 'Les deux' : 'Mezclado' }}</option>
        </select>
        <label><input v-model="showAlt" type="checkbox" /> {{ lang === 'fr' ? 'Traduction' : 'Traducción' }}</label>
      </div>
    </div>

    <div
      v-if="question && current"
      ref="cardEl"
      class="card swipe-card question sign-quiz"
      :style="swipeOffset ? { transform: `translateX(${swipeOffset}px)`, opacity: 1 - Math.min(Math.abs(swipeOffset) / 200, 0.4), transition: 'none' } : undefined"
    >
      <p class="muted small sq-count">{{ index + 1 }} / {{ queue.length }}</p>

      <template v-if="question.kind === 'name'">
        <div class="sq-sign"><SignImage :sign="current" /></div>
        <p class="q">Que signifie ce signal ?</p>
        <p v-if="showAlt" class="q alt">¿Qué significa esta señal?</p>
        <ul class="options">
          <li v-for="(o, i) in question.options" :key="o.code">
            <button type="button" class="option" :class="classFor(i)" :disabled="revealed" @click="choose(i)">
              <span class="idx">{{ letters[i] }}</span>
              <span class="txt">
                {{ o.name.fr }}
                <span v-if="showAlt" class="alt">{{ o.name.es }}</span>
                <span v-if="revealed" class="sq-code">{{ o.code }}</span>
              </span>
            </button>
          </li>
        </ul>
      </template>

      <template v-else>
        <p class="q">Quel signal indique : « {{ current.name.fr }} » ?</p>
        <p v-if="showAlt" class="q alt">¿Qué señal indica: «{{ current.name.es }}»?</p>
        <ul class="sq-images">
          <li v-for="(o, i) in question.options" :key="o.code">
            <button type="button" class="option sq-image-opt" :class="classFor(i)" :disabled="revealed" :aria-label="letters[i]" @click="choose(i)">
              <span class="idx">{{ letters[i] }}</span>
              <SignImage :sign="o" />
              <span v-if="revealed" class="sq-code">{{ o.code }}<template v-if="i !== question.answer"> · {{ o.name[lang] }}</template></span>
            </button>
          </li>
        </ul>
      </template>

      <div v-if="revealed" class="feedback sq-feedback" :class="chosen === question.answer ? 'ok' : 'ko'">
        <b>{{ chosen === question.answer ? (lang === 'fr' ? 'Correct !' : '¡Correcto!') : lang === 'fr' ? 'Faux.' : 'Incorrecto.' }}</b>
        <span class="sq-code">{{ current.code }}</span> — {{ current.name.fr }}<span v-if="showAlt" class="muted"> ({{ current.name.es }})</span>
        <p style="margin: 6px 0 0">{{ current.meaning }}</p>
      </div>

      <div class="row" style="margin-top: 14px">
        <span class="grow"></span>
        <button class="btn primary" type="button" @click="next">{{ revealed ? (lang === 'fr' ? 'Suivant →' : 'Siguiente →') : lang === 'fr' ? 'Passer →' : 'Saltar →' }}</button>
      </div>
      <p class="swipe-hint small muted">{{ lang === 'fr' ? 'Glissez vers la gauche pour le signal suivant.' : 'Desliza hacia la izquierda para pasar a la siguiente.' }}</p>
      <p class="kbd-hint small muted">
        <kbd>A</kbd> <kbd>B</kbd> <kbd>C</kbd> {{ lang === 'fr' ? 'répondre' : 'responder' }} ·
        <kbd>{{ lang === 'fr' ? 'Entrée' : 'Intro' }}</kbd> {{ lang === 'fr' ? 'suivant' : 'siguiente' }} ·
        <kbd>T</kbd> {{ lang === 'fr' ? 'traduction' : 'traducción' }}
      </p>
    </div>
    <p v-else class="card muted">{{ lang === 'fr' ? 'Aucun signal dans cette famille.' : 'No hay señales en esta familia.' }}</p>
  </div>
</template>
