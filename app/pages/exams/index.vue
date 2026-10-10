<script setup lang="ts">
import type { ExamSummary } from '../../composables/useStore'

const { lang } = useStore()
const { data: list } = await useFetch<ExamSummary[]>('/api/exams')

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
            <td><NuxtLink :to="`/exams/${r.id}`">{{ fmtDate(r.date) }}</NuxtLink></td>
            <td>
              <b :style="{ color: r.passed ? 'var(--ok)' : 'var(--ko)' }">{{ r.score }} / {{ r.total }}</b>
              <span class="small muted"> · {{ r.graveErrors }} grave(s) · {{ r.minorErrors }} simple(s)<span v-if="r.helpEs"> · ES</span><span v-if="r.answerSeconds !== 15"> · {{ r.answerSeconds }} s</span></span>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>
