<script setup lang="ts">
import type { ExamSummary } from '../../composables/useStore'
import { questions } from '../../data/questions'
import { themeById } from '../../data/themes'

const { lang } = useStore()
const { data: list } = await useFetch<ExamSummary[]>('/api/exams')
const { data: qstats } = await useFetch<{ exams: number; seen: Record<string, number>; wrong: Record<string, number> }>('/api/exams/stats')
const showAll = ref(false)

/** Fréquence de sortie de chaque question du banc sur tous les examens. */
const freq = computed(() => {
  const seen = qstats.value?.seen ?? {}
  const wrong = qstats.value?.wrong ?? {}
  const rows = questions.map((q) => ({ q, n: seen[q.id] ?? 0, ko: wrong[q.id] ?? 0 }))
  const dist = [0, 0, 0, 0] // 0, 1, 2, 3+
  for (const r of rows) dist[Math.min(r.n, 3)]!++
  const top = rows.filter((r) => r.n > 0).sort((a, b) => b.n - a.n || b.ko - a.ko)
  return { rows, dist, top, total: questions.length }
})

function fmtDate(iso: string) {
  return new Date(iso).toLocaleString(lang.value === 'fr' ? 'fr-BE' : 'es-ES', { day: '2-digit', month: 'short', year: '2-digit', hour: '2-digit', minute: '2-digit' })
}
const stats = computed(() => {
  const l = list.value ?? []
  if (!l.length) return null
  const avg = l.reduce((a, e) => a + e.score, 0) / l.length
  const passed = l.filter((e) => e.passed).length
  return { n: l.length, avg: avg.toFixed(1), passed, best: Math.max(...l.map((e) => e.score)) }
})
</script>

<template>
  <div>
    <div class="card">
      <h2>{{ lang === 'fr' ? 'Historique des examens' : 'Historial de exámenes' }}</h2>
      <p v-if="stats" class="muted small">
        {{ stats.n }} {{ lang === 'fr' ? 'examens' : 'exámenes' }} · {{ lang === 'fr' ? 'moyenne' : 'media' }} {{ stats.avg }} · {{ lang === 'fr' ? 'réussis' : 'aprobados' }} {{ stats.passed }} · {{ lang === 'fr' ? 'meilleur' : 'mejor' }} {{ stats.best }}
      </p>
      <p v-if="!list?.length" class="muted">{{ lang === 'fr' ? 'Aucun examen pour l\'instant.' : 'Todavía ningún examen.' }}</p>
      <table v-else class="glossary-table">
        <tbody>
          <tr v-for="r in list" :key="r.id">
            <td><NuxtLink :to="`/exams/${r.id}`">{{ fmtDate(r.date) }}</NuxtLink> <code class="qid">#{{ r.id }}</code></td>
            <td>
              <b :style="{ color: r.passed ? 'var(--ok)' : 'var(--ko)' }">{{ r.score }} / {{ r.total }}</b>
              <span class="small muted"> · {{ r.graveErrors }} grave(s) · {{ r.minorErrors }} simple(s)<span v-if="r.helpEs"> · ES</span><span v-if="r.answerSeconds !== 15"> · {{ r.answerSeconds }} s</span></span>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <div v-if="list?.length" class="card">
      <h2>{{ lang === 'fr' ? 'Fréquence des questions' : 'Frecuencia de las preguntas' }}</h2>
      <p class="muted small">
        {{ freq.total }} {{ lang === 'fr' ? 'questions dans la banque' : 'preguntas en el banco' }} ·
        {{ lang === 'fr' ? 'jamais sorties' : 'nunca han salido' }} : <b>{{ freq.dist[0] }}</b> ·
        1× : <b>{{ freq.dist[1] }}</b> · 2× : <b>{{ freq.dist[2] }}</b> · 3× {{ lang === 'fr' ? 'ou plus' : 'o más' }} : <b>{{ freq.dist[3] }}</b>
      </p>
      <p class="muted small">
        {{ lang === 'fr'
          ? 'Le tirage privilégie désormais les questions les moins vues : une question ne revient qu\'une fois les autres de son thème épuisées.'
          : 'El sorteo prioriza ahora las preguntas menos vistas: una pregunta solo vuelve a salir cuando se han agotado las demás de su tema.' }}
      </p>
      <table class="glossary-table">
        <thead>
          <tr>
            <th>{{ lang === 'fr' ? 'Question' : 'Pregunta' }}</th>
            <th>{{ lang === 'fr' ? 'Thème' : 'Tema' }}</th>
            <th>{{ lang === 'fr' ? 'Sorties' : 'Veces' }}</th>
            <th>{{ lang === 'fr' ? 'Ratées' : 'Falladas' }}</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="r in showAll ? freq.top : freq.top.slice(0, 15)" :key="r.q.id">
            <td class="small"><code class="qid">{{ r.q.id }}</code> {{ r.q[lang].q.replace(/\s+$/, '') }}</td>
            <td class="small muted">{{ themeById[r.q.theme][lang] }}</td>
            <td><b>{{ r.n }}</b></td>
            <td :style="{ color: r.ko ? 'var(--ko)' : undefined }">{{ r.ko }}</td>
          </tr>
        </tbody>
      </table>
      <button v-if="freq.top.length > 15" class="btn" type="button" style="margin-top: 10px" @click="showAll = !showAll">
        {{ showAll ? (lang === 'fr' ? 'Réduire' : 'Mostrar menos') : (lang === 'fr' ? `Tout afficher (${freq.top.length})` : `Mostrar todas (${freq.top.length})`) }}
      </button>
    </div>
  </div>
</template>
