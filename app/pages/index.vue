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

/** Statistiques des examens (questions sorties / ratées), chargées côté client. */
const { data: examStats } = useLazyFetch<{ exams: number; seen: Record<string, number>; wrong: Record<string, number> }>('/api/exams/stats', { server: false })

/** Réponses cumulées (étude + examens) d'une question. */
function answered(id: string) {
  const p = progress.value[id]
  const seen = examStats.value?.seen[id] ?? 0
  const wrong = examStats.value?.wrong[id] ?? 0
  return { ok: (p?.ok ?? 0) + seen - wrong, ko: (p?.ko ?? 0) + wrong }
}

const perTheme = computed(() =>
  themes.map((t) => {
    const qs = questions.filter((q) => q.theme === t.id)
    // « Maîtrisée » = dernière réponse en étude correcte.
    const mastered = qs.filter((q) => (progress.value[q.id]?.streak ?? 0) > 0).length
    let ok = 0
    let ko = 0
    for (const q of qs) {
      const a = answered(q.id)
      ok += a.ok
      ko += a.ko
    }
    const due = reviewPlan(qs, progress.value).due
    return { theme: t, total: qs.length, mastered, due, answers: ok + ko, accuracy: ok + ko ? Math.round((ok / (ok + ko)) * 100) : null }
  }),
)

/**
 * « Suis-je prêt ? » — critères explicites : au moins 3 examens, les 3 derniers ≥ 45/50 sans faute
 * grave, et au moins 70 % de la banque déjà vue (étude ou examen).
 */
const ready = computed(() => {
  const last5 = exams.value.slice(0, 5)
  const last3 = exams.value.slice(0, 3)
  const seenCount = questions.filter((q) => {
    const a = answered(q.id)
    return a.ok + a.ko > 0
  }).length
  const coverage = Math.round((seenCount / questions.length) * 100)
  const passed5 = last5.filter((e) => e.passed).length
  const avg = last5.length ? Math.round(last5.reduce((n, e) => n + e.score, 0) / last5.length) : null
  const grave5 = last5.reduce((n, e) => n + e.graveErrors, 0)
  const weak = perTheme.value
    .filter((t) => t.answers >= 5 && t.accuracy !== null)
    .sort((a, b) => a.accuracy! - b.accuracy!)
    .slice(0, 3)
    .filter((t) => t.accuracy! < 85)
  const criteria = {
    exams: last3.length === 3,
    scores: last3.length === 3 && last3.every((e) => e.score >= 45),
    noGrave: last3.length === 3 && last3.every((e) => e.graveErrors === 0),
    coverage: coverage >= 70,
  }
  const level = Object.values(criteria).every(Boolean) ? 'ready' : last5.length >= 3 && passed5 / last5.length >= 0.6 ? 'close' : 'notyet'
  return { level, criteria, coverage, seenCount, passed5, n5: last5.length, avg, grave5, weak }
})
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
    </div>

    <div class="card ready-card" :class="ready.level">
      <h2>
        {{ lang === 'fr' ? 'Suis-je prêt ?' : '¿Estoy listo?' }}
        <span class="pill" :class="ready.level === 'ready' ? 'ok' : ready.level === 'close' ? 'warn' : 'grave'">
          {{ ready.level === 'ready'
            ? (lang === 'fr' ? 'Prêt à réserver' : 'Listo para reservar')
            : ready.level === 'close'
              ? (lang === 'fr' ? 'Presque' : 'Casi')
              : (lang === 'fr' ? 'Pas encore' : 'Todavía no') }}
        </span>
      </h2>
      <ul class="checklist small">
        <li :class="{ done: ready.criteria.exams }">{{ lang === 'fr' ? 'Au moins 3 simulations' : 'Al menos 3 simulacros' }} ({{ exams.length }})</li>
        <li :class="{ done: ready.criteria.scores }">{{ lang === 'fr' ? 'Les 3 dernières ≥ 45/50' : 'Los 3 últimos ≥ 45/50' }}</li>
        <li :class="{ done: ready.criteria.noGrave }">{{ lang === 'fr' ? 'Aucune faute grave dans les 3 dernières' : 'Ninguna falta grave en los 3 últimos' }}</li>
        <li :class="{ done: ready.criteria.coverage }">{{ lang === 'fr' ? 'Au moins 70 % des questions déjà vues' : 'Al menos el 70 % de las preguntas ya vistas' }} ({{ ready.coverage }} % · {{ ready.seenCount }}/{{ questions.length }})</li>
      </ul>
      <p v-if="ready.n5" class="small muted">
        {{ lang === 'fr'
          ? `${ready.n5} derniers examens : ${ready.passed5} réussi(s), moyenne ${ready.avg}/50, ${ready.grave5} faute(s) grave(s).`
          : `${ready.n5} últimos exámenes: ${ready.passed5} aprobado(s), media ${ready.avg}/50, ${ready.grave5} falta(s) grave(s).` }}
      </p>
      <p v-if="ready.weak.length" class="small" style="margin-bottom: 0">
        {{ lang === 'fr' ? 'Points faibles :' : 'Puntos débiles:' }}
        <template v-for="(t, i) in ready.weak" :key="t.theme.id">
          <NuxtLink :to="{ path: '/study', query: { theme: t.theme.id } }">{{ t.theme[lang] }} ({{ t.accuracy }} %)</NuxtLink><span v-if="i < ready.weak.length - 1"> · </span>
        </template>
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
        <NuxtLink v-for="p in perTheme" :key="p.theme.id" :to="{ path: '/study', query: { theme: p.theme.id } }" class="theme-tile">
          <b>{{ p.theme[lang] }} <span v-if="p.theme.grave" class="pill grave" style="font-size: 0.65rem">−5</span></b>
          <span class="small muted">
            {{ p.mastered }} / {{ p.total }} {{ lang === 'fr' ? 'maîtrisées' : 'dominadas' }}<template v-if="p.accuracy !== null"> · {{ p.accuracy }} % {{ lang === 'fr' ? 'de réussite' : 'de acierto' }}</template><span v-if="p.due" style="color: var(--ko)"> · {{ p.due }} {{ lang === 'fr' ? 'à revoir' : 'a repasar' }}</span>
          </span>
          <div class="bar"><div :style="{ width: (p.total ? (p.mastered / p.total) * 100 : 0) + '%' }"></div></div>
        </NuxtLink>
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
