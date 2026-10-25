<script setup lang="ts">
import { questions } from '../data/questions'
import { themes } from '../data/themes'
import { course } from '../data/course'
import { EXAM } from '../lib/exam'
import { reviewPlan } from '../lib/srs'

const { lang, progress, exams, courseRead, resetAll } = useStore()
const { user } = useUserSession()
const pwa = usePwa()
const installHintHidden = ref(true)
onMounted(() => {
  try {
    installHintHidden.value = localStorage.getItem('pwa-hint-hidden') === '1'
  } catch {
    installHintHidden.value = false
  }
})
const showInstall = computed(() => pwa.canInstall.value && !installHintHidden.value)
async function installApp() {
  if (await pwa.install()) installHintHidden.value = true
}
function hideInstallHint() {
  installHintHidden.value = true
  try {
    localStorage.setItem('pwa-hint-hidden', '1')
  } catch {
    /* mode privé : on cache juste pour cette visite */
  }
}

const perTheme = computed(() =>
  themes.map((t) => {
    const qs = questions.filter((q) => q.theme === t.id)
    const mastered = qs.filter((q) => (progress.value[q.id]?.ok ?? 0) >= 1).length
    const wrong = qs.filter((q) => (progress.value[q.id]?.ko ?? 0) > 0).length
    return { theme: t, total: qs.length, mastered, wrong }
  }),
)
const lastExams = computed(() => exams.value.slice(0, 8))

/** Fautes graves : −5 chacune à l'examen, deux suffisent pour échouer. */
const graveQuestions = questions.filter((q) => q.grave)
const grave = computed(() => {
  const plan = reviewPlan(graveQuestions, progress.value)
  // « Maîtrisée » = dernière réponse en étude correcte.
  const mastered = graveQuestions.filter((q) => (progress.value[q.id]?.streak ?? 0) > 0).length
  const recent = exams.value.slice(0, 5)
  return {
    total: graveQuestions.length,
    mastered,
    due: plan.due,
    recentExams: recent.length,
    recentGrave: recent.reduce((n, e) => n + e.graveErrors, 0),
  }
})
const readiness = computed(() => {
  const last3 = exams.value.slice(0, 3)
  if (last3.length < 3) return null
  return last3.every((r) => r.score >= 45)
})
const chaptersRead = computed(() => course.filter((c) => courseRead.value[c.id]).length)

function fmtDate(iso: string) {
  return new Date(iso).toLocaleDateString(lang.value === 'fr' ? 'fr-BE' : 'es-ES', { day: '2-digit', month: 'short', hour: '2-digit', minute: '2-digit' })
}
async function confirmReset() {
  if (confirm(lang.value === 'fr' ? 'Effacer toute la progression ?' : '¿Borrar todo el progreso?')) await resetAll()
}
</script>

<template>
  <div>
    <div class="card">
      <h2>{{ lang === 'fr' ? 'Bonjour' : 'Hola' }}, {{ user?.username }}</h2>
      <p class="muted">
        {{ lang === 'fr'
          ? 'Tout pour l\'examen théorique B (Bruxelles) : cours complet, questions avec traduction, signaux, glossaire et simulation avec le barème réel. Ta progression est enregistrée sur le serveur.'
          : 'Todo para el examen teórico B (Bruselas): curso completo, preguntas con traducción, señales, glosario y simulacro con el baremo real. Tu progreso se guarda en el servidor.' }}
      </p>
      <div class="row">
        <NuxtLink to="/course" class="btn primary">{{ lang === 'fr' ? 'Lire le cours' : 'Leer el curso' }} ({{ chaptersRead }}/{{ course.length }})</NuxtLink>
        <NuxtLink to="/study" class="btn">{{ lang === 'fr' ? 'Questions par thème' : 'Preguntas por tema' }}</NuxtLink>
        <NuxtLink to="/exam" class="btn">{{ lang === 'fr' ? 'Simulation d\'examen' : 'Simulacro de examen' }}</NuxtLink>
      </div>
      <p v-if="readiness !== null" class="small" style="margin-bottom: 0">
        <span class="pill" :class="readiness ? 'ok' : 'warn'">
          {{ readiness
            ? (lang === 'fr' ? 'Prêt : 3 derniers examens ≥ 45/50' : 'Listo: los 3 últimos exámenes ≥ 45/50')
            : (lang === 'fr' ? 'Objectif : 3 examens de suite ≥ 45/50 avant de réserver' : 'Objetivo: 3 exámenes seguidos ≥ 45/50 antes de reservar') }}
        </span>
      </p>
    </div>

    <div class="card grave-card">
      <h2>{{ lang === 'fr' ? 'Fautes graves' : 'Faltas graves' }} <span class="pill grave">−5</span></h2>
      <p class="small muted">
        {{ lang === 'fr'
          ? 'Une faute grave coûte 5 points au lieu de 1 : deux suffisent pour échouer. C\'est là qu\'il faut être sans faille.'
          : 'Una falta grave quita 5 puntos en lugar de 1: con dos ya suspendes. Es donde no puedes fallar.' }}
      </p>
      <div class="bar"><div :style="{ width: (grave.mastered / grave.total) * 100 + '%' }"></div></div>
      <p class="small">
        {{ grave.mastered }} / {{ grave.total }} {{ lang === 'fr' ? 'maîtrisées' : 'dominadas' }}<span v-if="grave.due" style="color: var(--ko)"> · {{ grave.due }} {{ lang === 'fr' ? 'à revoir' : 'para repasar' }}</span>
        <template v-if="grave.recentExams">
          · {{ lang === 'fr' ? `${grave.recentGrave} faute(s) grave(s) sur tes ${grave.recentExams} derniers examens` : `${grave.recentGrave} falta(s) grave(s) en tus ${grave.recentExams} últimos exámenes` }}
        </template>
      </p>
      <div class="row">
        <NuxtLink :to="{ path: '/study', query: { theme: 'grave' } }" class="btn primary">{{ lang === 'fr' ? 'S\'entraîner sur les fautes graves' : 'Practicar las faltas graves' }}</NuxtLink>
        <NuxtLink :to="{ path: '/exam', query: { mode: 'sudden' } }" class="btn">{{ lang === 'fr' ? 'Mort subite' : 'Muerte súbita' }}</NuxtLink>
      </div>
    </div>

    <div v-if="showInstall" class="card install-card">
      <img src="/icons/icon-192.png" alt="" width="44" height="44" />
      <div class="grow">
        <b>{{ lang === 'fr' ? 'Installer l\'application' : 'Instalar la aplicación' }}</b>
        <p class="small muted" style="margin: 2px 0 0">
          <template v-if="pwa.installEvent.value">
            {{ lang === 'fr' ? 'Sur l\'écran d\'accueil, en plein écran, avec les pages déjà vues disponibles hors ligne.' : 'En la pantalla de inicio, a pantalla completa y con las páginas ya vistas disponibles sin conexión.' }}
          </template>
          <template v-else>
            {{ lang === 'fr' ? 'Sur iPhone / iPad : bouton Partager, puis « Sur l\'écran d\'accueil ».' : 'En iPhone / iPad: botón Compartir y luego «Añadir a pantalla de inicio».' }}
          </template>
        </p>
      </div>
      <div class="row">
        <button v-if="pwa.installEvent.value" class="btn primary sm" type="button" @click="installApp">{{ lang === 'fr' ? 'Installer' : 'Instalar' }}</button>
        <button class="btn ghost sm" type="button" @click="hideInstallHint">{{ lang === 'fr' ? 'Plus tard' : 'Más tarde' }}</button>
      </div>
    </div>

    <div class="card">
      <h2>{{ lang === 'fr' ? 'Progression par thème' : 'Progreso por tema' }}</h2>
      <div class="progress-grid">
        <div v-for="p in perTheme" :key="p.theme.id" class="theme-tile">
          <b>{{ p.theme[lang] }} <span v-if="p.theme.grave" class="pill grave" style="font-size: 0.65rem">−5</span></b>
          <span class="small muted">{{ p.mastered }} / {{ p.total }}<span v-if="p.wrong" style="color: var(--ko)"> · {{ p.wrong }} {{ lang === 'fr' ? 'à revoir' : 'a repasar' }}</span></span>
          <div class="bar"><div :style="{ width: (p.total ? (p.mastered / p.total) * 100 : 0) + '%' }"></div></div>
        </div>
      </div>
    </div>

    <div class="card">
      <h2>{{ lang === 'fr' ? 'Derniers examens' : 'Últimos exámenes' }}</h2>
      <p v-if="!lastExams.length" class="muted">{{ lang === 'fr' ? 'Aucun examen pour l\'instant.' : 'Todavía ningún examen.' }}</p>
      <table v-else class="glossary-table">
        <tbody>
          <tr v-for="r in lastExams" :key="r.id">
            <td><NuxtLink :to="`/exams/${r.id}`">{{ fmtDate(r.date) }}</NuxtLink></td>
            <td>
              <b :style="{ color: r.passed ? 'var(--ok)' : 'var(--ko)' }">{{ r.score }} / {{ r.total }}</b>
              <span class="small muted"> · {{ r.graveErrors }} {{ lang === 'fr' ? 'grave(s)' : 'grave(s)' }} · {{ r.minorErrors }} {{ lang === 'fr' ? 'simple(s)' : 'simple(s)' }}<span v-if="r.helpEs"> · ES</span></span>
            </td>
          </tr>
        </tbody>
      </table>
      <p class="small muted">{{ lang === 'fr' ? 'Seuil de réussite' : 'Umbral de aprobado' }} : {{ EXAM.passMark }}/{{ EXAM.questions }} · <NuxtLink to="/exams">{{ lang === 'fr' ? 'tout l\'historique' : 'todo el historial' }}</NuxtLink></p>
      <button class="btn sm ghost danger" type="button" @click="confirmReset">{{ lang === 'fr' ? 'Réinitialiser la progression' : 'Reiniciar el progreso' }}</button>
    </div>
  </div>
</template>
