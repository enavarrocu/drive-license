<script setup lang="ts">
import { questionById } from '../data/questions'

/** Erreurs signalées par les utilisateurs (réservé aux administrateurs : NUXT_ADMIN_USERS). */
interface Report {
  id: number
  questionId: string
  message: string
  lang: 'fr' | 'es'
  status: 'open' | 'done'
  createdAt: string
  username: string
}

const { lang, isAdmin } = useStore()
const status = ref<'open' | 'done' | 'all'>('open')
const { data: reports, refresh, error } = await useFetch<Report[]>('/api/reports', { query: { status }, watch: [status] })

async function setStatus(r: Report, s: 'open' | 'done') {
  await $fetch(`/api/reports/${r.id}`, { method: 'PUT', body: { status: s } })
  await refresh()
}
function fmtDate(sqlite: string) {
  return new Date(sqlite.replace(' ', 'T') + 'Z').toLocaleString(lang.value === 'fr' ? 'fr-BE' : 'es-ES')
}
</script>

<template>
  <div>
    <div class="card">
      <h2>⚑ {{ lang === 'fr' ? 'Erreurs signalées' : 'Errores avisados' }}</h2>
      <p v-if="!isAdmin || error" class="muted">{{ lang === 'fr' ? 'Réservé aux administrateurs.' : 'Reservado a los administradores.' }}</p>
      <div v-else class="row">
        <button v-for="s in (['open', 'done', 'all'] as const)" :key="s" type="button" class="btn sm" :class="{ primary: status === s }" @click="status = s">
          {{ s === 'open' ? (lang === 'fr' ? 'À traiter' : 'Pendientes') : s === 'done' ? (lang === 'fr' ? 'Traités' : 'Resueltos') : (lang === 'fr' ? 'Tous' : 'Todos') }}
        </button>
      </div>
    </div>
    <p v-if="isAdmin && reports && !reports.length" class="muted">{{ lang === 'fr' ? 'Aucun signalement.' : 'Ningún aviso.' }}</p>
    <div v-for="r in reports ?? []" :key="r.id" class="card" :class="r.status === 'open' ? 'review-ko' : 'review-ok'">
      <p class="small muted" style="margin-top: 0">
        #{{ r.id }} · {{ fmtDate(r.createdAt) }} · {{ r.username }} · {{ r.lang.toUpperCase() }}
      </p>
      <p class="report-message">{{ r.message }}</p>
      <QuestionCard v-if="questionById[r.questionId]" :question="questionById[r.questionId]!" :lang="lang" show-alt :chosen="null" revealed neutral />
      <p v-else class="muted">{{ lang === 'fr' ? 'Question supprimée' : 'Pregunta eliminada' }} ({{ r.questionId }})</p>
      <div class="row" style="margin-top: 10px">
        <button v-if="r.status === 'open'" class="btn sm primary" type="button" @click="setStatus(r, 'done')">{{ lang === 'fr' ? 'Marquer comme traité' : 'Marcar como resuelto' }}</button>
        <button v-else class="btn sm" type="button" @click="setStatus(r, 'open')">{{ lang === 'fr' ? 'Rouvrir' : 'Reabrir' }}</button>
      </div>
    </div>
  </div>
</template>
