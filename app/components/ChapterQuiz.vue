<script setup lang="ts">
import type { Question, ThemeId } from '../types'
import { questions } from '../data/questions'
import { reviewPlan } from '../lib/srs'

/**
 * Mini-test en fin de chapitre : 5 questions du thème du chapitre, en priorité celles à revoir
 * ou jamais vues (révision espacée). Le tirage est aléatoire : il se fait uniquement côté client
 * (onMounted) pour éviter un mismatch d'hydratation sur la page du cours rendue en SSR.
 */
const props = defineProps<{ chapterId: string; theme: ThemeId }>()

const SIZE = 5

/**
 * Plusieurs chapitres partagent un thème : on les distingue par les entrées de théorie
 * (theoryId) des questions. Si le filtre donne moins de SIZE questions, on prend tout le thème.
 */
const theoryByChapter: Record<string, string[]> = {
  'ch01-permis': ['per-provisoire', 'x4-per-categories'],
  'ch04-voie': ['per-general'],
  'ch16-infractions': ['per-sanctions'],
  'ch05-signaux': ['sig-feux', 'sig-agent', 'sig-categories', 'x4-sig-feux-agents'],
  'ch06-marques': ['sig-marquages', 'x4-sig-marques'],
  'ch07-place': ['man-bandes'],
  'ch11-manoeuvres': ['man-virages', 'man-passage-niveau', 'x4-man-manoeuvres'],
}

const { lang, progress, recordStudy } = useStore()

const items = ref<Question[]>([])
const index = ref(0)
const chosen = ref<number | null>(null)
const revealed = ref(false)
const score = ref(0)
const finished = ref(false)
const ready = ref(false)

const current = computed(() => items.value[index.value])
const isLast = computed(() => index.value >= items.value.length - 1)

function pool(): Question[] {
  const theme = questions.filter((q) => q.theme === props.theme)
  const ids = theoryByChapter[props.chapterId]
  if (!ids) return theme
  const narrowed = theme.filter((q) => ids.includes(q.theoryId))
  return narrowed.length >= SIZE ? narrowed : theme
}

function start() {
  items.value = reviewPlan(pool(), progress.value).queue.slice(0, SIZE)
  index.value = 0
  chosen.value = null
  revealed.value = false
  score.value = 0
  finished.value = false
  ready.value = true
}

function choose(i: number) {
  if (revealed.value) return
  chosen.value = i
}
function validate() {
  const q = current.value
  if (!q || chosen.value === null || revealed.value) return
  revealed.value = true
  const ok = chosen.value === q.answer
  if (ok) score.value++
  void recordStudy(q.id, ok)
}
function next() {
  if (isLast.value) {
    finished.value = true
    return
  }
  index.value++
  chosen.value = null
  revealed.value = false
}

onMounted(start)
watch(() => props.chapterId, start)

const verdict = computed(() => {
  const n = items.value.length
  if (score.value === n) return lang.value === 'fr' ? 'Parfait ! Chapitre maîtrisé.' : '¡Perfecto! Capítulo dominado.'
  if (score.value >= Math.ceil(n * 0.6)) return lang.value === 'fr' ? 'Bien. Relisez les points manqués.' : 'Bien. Repasa los puntos fallados.'
  return lang.value === 'fr' ? 'À retravailler : relisez le chapitre puis réessayez.' : 'Hay que repasarlo: vuelve a leer el capítulo y repite.'
})
</script>

<template>
  <section class="chapter-quiz">
    <h3>{{ lang === 'fr' ? 'Testez-vous sur ce chapitre' : 'Ponte a prueba con este capítulo' }}</h3>
    <p class="muted small" style="margin-top: 0">
      {{ lang === 'fr'
        ? `${SIZE} questions du thème, d'abord celles à revoir ou jamais vues. Elles comptent pour la révision espacée.`
        : `${SIZE} preguntas del tema, primero las que toca repasar o nunca has visto. Cuentan para el repaso espaciado.` }}
    </p>

    <p v-if="!ready" class="muted small">{{ lang === 'fr' ? 'Chargement…' : 'Cargando…' }}</p>
    <p v-else-if="!items.length" class="muted small">{{ lang === 'fr' ? 'Pas encore de questions pour ce chapitre.' : 'Aún no hay preguntas para este capítulo.' }}</p>

    <div v-else-if="finished" class="quiz-result">
      <div class="quiz-score" :class="score === items.length ? 'ok' : score >= Math.ceil(items.length * 0.6) ? '' : 'ko'">
        {{ score }} / {{ items.length }}
      </div>
      <p>{{ verdict }}</p>
      <div class="row quiz-actions">
        <button class="btn" type="button" @click="start">↻ {{ lang === 'fr' ? 'Recommencer' : 'Repetir' }}</button>
        <NuxtLink :to="{ path: '/study', query: { theme } }" class="btn primary">{{ lang === 'fr' ? 'Pratiquer ce thème' : 'Practicar este tema' }}</NuxtLink>
      </div>
    </div>

    <template v-else-if="current">
      <QuestionCard
        :question="current"
        :lang="lang"
        gloss
        reportable
        :chosen="chosen"
        :revealed="revealed"
        :label="`${index + 1} / ${items.length}`"
        @choose="choose"
      />
      <div class="row quiz-actions">
        <span class="muted small grow">{{ lang === 'fr' ? 'Score' : 'Aciertos' }} : {{ score }}</span>
        <button v-if="!revealed" class="btn primary" type="button" :disabled="chosen === null" @click="validate">
          {{ lang === 'fr' ? 'Valider' : 'Validar' }}
        </button>
        <button v-else class="btn primary" type="button" @click="next">
          {{ isLast ? (lang === 'fr' ? 'Voir le score' : 'Ver el resultado') : (lang === 'fr' ? 'Suivante →' : 'Siguiente →') }}
        </button>
      </div>
    </template>
  </section>
</template>
