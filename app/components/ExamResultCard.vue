<script setup lang="ts">
import type { Lang } from '../types'
import type { ExamSummary } from '../composables/useStore'
import { questionById } from '../data/questions'

const props = defineProps<{
  exam: ExamSummary
  lang: Lang
  /** 'none' = seulement le score ; 'wrong' = les erreurs ; 'all' = les 50 questions (défaut). */
  review?: 'none' | 'wrong' | 'all'
}>()

const answers = computed(() => props.exam.answers ?? [])
const wrong = computed(() => answers.value.filter((a) => !a.correct))
const onlyWrong = ref(props.review === 'wrong')
const shown = computed(() => (onlyWrong.value ? wrong.value : answers.value))
/** Numéro de la question dans l'examen (1..50), même en mode « erreurs ». */
function num(a: { questionId: string }) {
  return answers.value.findIndex((x) => x.questionId === a.questionId) + 1
}
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
        <span v-if="exam.answerSeconds === 0"> · {{ lang === 'fr' ? 'sans limite' : 'sin límite' }}</span>
        <span v-else-if="exam.answerSeconds !== 15"> · {{ exam.answerSeconds }} s</span>
      </p>
    </div>

    <template v-if="review !== 'none' && answers.length">
      <div class="card review-bar">
        <h2 style="margin: 0">{{ lang === 'fr' ? 'Correction' : 'Corrección' }}</h2>
        <div class="row">
          <button type="button" class="btn" :class="{ primary: !onlyWrong }" @click="onlyWrong = false">
            {{ lang === 'fr' ? 'Toutes' : 'Todas' }} ({{ answers.length }})
          </button>
          <button type="button" class="btn" :class="{ primary: onlyWrong }" :disabled="!wrong.length" @click="onlyWrong = true">
            {{ lang === 'fr' ? 'Erreurs' : 'Errores' }} ({{ wrong.length }})
          </button>
        </div>
      </div>
      <p v-if="!shown.length" class="muted">{{ lang === 'fr' ? 'Aucune erreur.' : 'Ningún error.' }}</p>
      <template v-for="a in shown" :key="a.questionId">
        <div v-if="questionById[a.questionId]" class="card review-item" :class="a.correct ? 'review-ok' : 'review-ko'">
          <QuestionCard
            :question="questionById[a.questionId]!"
            :lang="lang"
            :show-alt="true"
            :chosen="a.chosen"
            :revealed="true"
            :label="`${num(a)} / ${exam.total}`"
          />
          <TheoryPanel v-if="!a.correct" :theory-id="questionById[a.questionId]!.theoryId" />
        </div>
      </template>
    </template>
  </div>
</template>
