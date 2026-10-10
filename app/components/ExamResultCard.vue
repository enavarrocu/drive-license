<script setup lang="ts">
import type { Lang } from '../types'
import type { ExamSummary } from '../composables/useStore'
import { questionById } from '../data/questions'

const props = defineProps<{ exam: ExamSummary; lang: Lang; showReview?: boolean }>()
const wrong = computed(() => (props.exam.answers ?? []).filter((a) => !a.correct))
</script>

<template>
  <div>
    <div class="card">
      <div class="row">
        <div class="result-big" :style="{ color: exam.passed ? 'var(--ok)' : 'var(--ko)' }">{{ exam.score }} / {{ exam.total }}</div>
        <span class="pill" :class="exam.passed ? 'ok' : 'grave'">{{ exam.passed ? (lang === 'fr' ? 'RÉUSSI' : 'APROBADO') : (lang === 'fr' ? 'ÉCHEC' : 'SUSPENSO') }}</span>
      </div>
      <p class="muted" style="margin-bottom: 0">
        {{ exam.minorErrors }} {{ lang === 'fr' ? 'erreur(s) simple(s)' : 'error(es) simple(s)' }} ·
        {{ exam.graveErrors }} {{ lang === 'fr' ? 'faute(s) grave(s)' : 'falta(s) grave(s)' }} ·
        {{ Math.floor(exam.durationSec / 60) }} min {{ exam.durationSec % 60 }} s
        <span v-if="exam.helpEs"> · {{ lang === 'fr' ? 'avec aide ES' : 'con ayuda ES' }}</span>
        <span v-if="exam.answerSeconds !== 15"> · {{ exam.answerSeconds }} s</span>
      </p>
    </div>
    <div v-if="showReview !== false && wrong.length" class="card">
      <h2>{{ lang === 'fr' ? 'À revoir' : 'Para repasar' }}</h2>
      <template v-for="a in wrong" :key="a.questionId">
        <div v-if="questionById[a.questionId]" class="review-item">
          <QuestionCard :question="questionById[a.questionId]!" :lang="lang" :show-alt="true" :chosen="a.chosen" :revealed="true" />
          <TheoryPanel :theory-id="questionById[a.questionId]!.theoryId" />
        </div>
      </template>
    </div>
  </div>
</template>
