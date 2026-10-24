<script setup lang="ts">
import type { ExamSummary } from '../../composables/useStore'

const { lang } = useStore()
const route = useRoute()
const { data: exam, error } = await useFetch<ExamSummary>(`/api/exams/${route.params.id}`)

function fmtDate(iso: string) {
  return new Date(iso).toLocaleString(lang.value === 'fr' ? 'fr-BE' : 'es-ES')
}
</script>

<template>
  <div>
    <p class="small"><NuxtLink to="/exams">← {{ lang === 'fr' ? 'Historique' : 'Historial' }}</NuxtLink></p>
    <div v-if="error" class="card"><p class="muted">{{ lang === 'fr' ? 'Examen introuvable.' : 'Examen no encontrado.' }}</p></div>
    <template v-else-if="exam">
      <p class="muted small">{{ fmtDate(exam.date) }}</p>
      <ExamResultCard :exam="exam" :lang="lang" review="all" />
    </template>
  </div>
</template>
