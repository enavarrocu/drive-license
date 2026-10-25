<script setup lang="ts">
import type { ThemeId } from '../types'
import { questions } from '../data/questions'
import { themes } from '../data/themes'
import { shuffle } from '../lib/exam'
import { RELEARN_GAP, reviewPlan } from '../lib/srs'
import { speakText, stopSpeaking, speechAvailable } from '../lib/speech'

type Filter = ThemeId | 'smart' | 'all' | 'flagged' | 'weak' | 'scene'

const { lang, prefs, progress, recordStudy, toggleFlag, setPrefs } = useStore()
const route = useRoute()

const filter = ref<Filter>(typeof route.query.theme === 'string' ? (route.query.theme as Filter) : 'smart')
const showAlt = ref(true)
const showTheory = ref(true)
const speak = computed({ get: () => prefs.value.speak, set: (v: boolean) => void setPrefs({ speak: v }) })
const canSpeak = ref(false)
onMounted(() => (canSpeak.value = speechAvailable()))

const pool = ref(buildPool())
const index = ref(0)
const chosen = ref<number | null>(null)
const revealed = ref(false)

const current = computed(() => pool.value[index.value])
const isFlagged = computed(() => !!(current.value && progress.value[current.value.id]?.flagged))

/** Compteurs de la révision intelligente (à revoir / nouvelles / prochaine échéance). */
const plan = computed(() => reviewPlan(questions, progress.value))
const nextDueLabel = computed(() =>
  plan.value.nextDue ? new Date(plan.value.nextDue).toLocaleString(lang.value === 'fr' ? 'fr-BE' : 'es-ES', { weekday: 'long', day: 'numeric', month: 'long', hour: '2-digit', minute: '2-digit' }) : '',
)

function buildPool() {
  if (filter.value === 'smart') return reviewPlan(questions, progress.value).queue
  let list = questions
  if (filter.value === 'flagged') list = questions.filter((q) => progress.value[q.id]?.flagged)
  else if (filter.value === 'weak') list = questions.filter((q) => (progress.value[q.id]?.ko ?? 0) > 0)
  else if (filter.value === 'scene') list = questions.filter((q) => !!q.scene)
  else if (filter.value !== 'all') list = questions.filter((q) => q.theme === filter.value)
  return shuffle(list)
}
function restart() {
  pool.value = buildPool()
  index.value = 0
  chosen.value = null
  revealed.value = false
  readCurrent()
}
watch(filter, restart)

function choose(i: number) {
  if (!current.value || revealed.value) return
  chosen.value = i
  revealed.value = true
  const ok = i === current.value.answer
  void recordStudy(current.value.id, ok)
  // Révision intelligente : une erreur revient quelques questions plus tard dans la même séance.
  if (filter.value === 'smart' && !ok) {
    const q = current.value
    const rest = pool.value.slice(index.value + 1).filter((x) => x.id !== q.id)
    rest.splice(Math.min(RELEARN_GAP - 1, rest.length), 0, q)
    pool.value = [...pool.value.slice(0, index.value + 1), ...rest]
  }
}
function next() {
  // En révision intelligente, la file terminée est recalculée (les échéances ont bougé).
  if (filter.value === 'smart' && index.value >= pool.value.length - 1) return restart()
  index.value = index.value < pool.value.length - 1 ? index.value + 1 : 0
  chosen.value = null
  revealed.value = false
  readCurrent()
}
function readCurrent() {
  stopSpeaking()
  if (!speak.value || !current.value || !canSpeak.value) return
  const t = current.value.fr
  void speakText(`${t.q} ${t.options.map((o, i) => `Réponse ${'ABCD'[i]} : ${o}`).join('. ')}`, 'fr')
}
onBeforeUnmount(stopSpeaking)

useHotkeys((key) => {
  if (!current.value) return
  const i = answerIndex(key)
  if (i !== null) {
    if (i < current.value.fr.options.length) choose(i)
    return true
  }
  if (key === 'enter' || key === 'space' || key === 'arrowright') {
    if (revealed.value) next()
    else revealed.value = true
    return true
  }
  if (key === 'm') return void toggleFlag(current.value.id)
  if (key === 't') return void (showAlt.value = !showAlt.value)
  if (key === 'l' && canSpeak.value) return void readCurrent()
})
</script>

<template>
  <div>
    <div class="card">
      <div class="row">
        <label class="grow">
          <span class="small muted">{{ lang === 'fr' ? 'Thème' : 'Tema' }}</span><br />
          <select v-model="filter" class="search">
            <option value="smart">{{ lang === 'fr' ? 'Révision intelligente' : 'Repaso inteligente' }} ({{ plan.due }} {{ lang === 'fr' ? 'à revoir' : 'para repasar' }} · {{ plan.fresh }} {{ lang === 'fr' ? 'nouvelles' : 'nuevas' }})</option>
            <option value="all">{{ lang === 'fr' ? 'Tous les thèmes' : 'Todos los temas' }} ({{ questions.length }})</option>
            <option v-for="t in themes" :key="t.id" :value="t.id">{{ t[lang] }} ({{ questions.filter((q) => q.theme === t.id).length }})</option>
            <option value="scene">{{ lang === 'fr' ? 'Situations dessinées (carrefours…)' : 'Situaciones dibujadas (cruces…)' }} ({{ questions.filter((q) => q.scene).length }})</option>
            <option value="weak">{{ lang === 'fr' ? 'Mes erreurs' : 'Mis errores' }}</option>
            <option value="flagged">{{ lang === 'fr' ? 'Questions marquées' : 'Preguntas marcadas' }}</option>
          </select>
        </label>
      </div>
      <div class="row small" style="margin-top: 10px">
        <label><input v-model="showAlt" type="checkbox" /> {{ lang === 'fr' ? 'Afficher la traduction' : 'Mostrar la traducción' }}</label>
        <label><input v-model="showTheory" type="checkbox" /> {{ lang === 'fr' ? 'Théorie après réponse' : 'Teoría tras responder' }}</label>
        <label v-if="canSpeak"><input v-model="speak" type="checkbox" /> {{ lang === 'fr' ? 'Lire à voix haute (FR)' : 'Leer en voz alta (FR)' }}</label>
      </div>
    </div>

    <div v-if="!current" class="card">
      <p v-if="filter === 'smart'">
        {{ lang === 'fr' ? 'Tout est à jour : aucune question à revoir pour l\'instant.' : 'Todo al día: no hay preguntas para repasar por ahora.' }}
        <template v-if="nextDueLabel"><br /><span class="muted small">{{ lang === 'fr' ? 'Prochaine révision :' : 'Próximo repaso:' }} {{ nextDueLabel }}</span></template>
      </p>
      <p v-else class="muted">{{ lang === 'fr' ? 'Aucune question dans cette sélection.' : 'No hay preguntas en esta selección.' }}</p>
    </div>

    <div v-else class="card">
      <QuestionCard :question="current" :lang="lang" :show-alt="showAlt" :chosen="chosen" :revealed="revealed" :label="`${index + 1} / ${pool.length}`" @choose="choose" />
      <TheoryPanel v-if="revealed && showTheory" :theory-id="current.theoryId" />
      <div class="row" style="margin-top: 14px">
        <button class="btn sm ghost" type="button" @click="toggleFlag(current.id)">{{ isFlagged ? '★' : '☆' }} {{ lang === 'fr' ? 'À revoir' : 'Repasar' }}</button>
        <button v-if="canSpeak" class="btn sm ghost" type="button" @click="readCurrent">🔊 {{ lang === 'fr' ? 'Relire' : 'Releer' }}</button>
        <span class="grow"></span>
        <button v-if="!revealed" class="btn" type="button" @click="revealed = true">{{ lang === 'fr' ? 'Voir la réponse' : 'Ver la respuesta' }}</button>
        <button class="btn primary" type="button" @click="next">{{ lang === 'fr' ? 'Suivante →' : 'Siguiente →' }}</button>
      </div>
      <p class="kbd-hint small muted">
        <kbd>A</kbd> <kbd>B</kbd> <kbd>C</kbd> {{ lang === 'fr' ? 'répondre' : 'responder' }} ·
        <kbd>{{ lang === 'fr' ? 'Entrée' : 'Intro' }}</kbd> {{ lang === 'fr' ? 'réponse / suivante' : 'respuesta / siguiente' }} ·
        <kbd>M</kbd> {{ lang === 'fr' ? 'à revoir' : 'repasar' }} · <kbd>T</kbd> {{ lang === 'fr' ? 'traduction' : 'traducción' }}<template v-if="canSpeak"> · <kbd>L</kbd> {{ lang === 'fr' ? 'relire' : 'releer' }}</template>
      </p>
    </div>
  </div>
</template>
