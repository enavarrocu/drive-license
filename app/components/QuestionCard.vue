<script setup lang="ts">
import { computed } from 'vue'
import type { Lang, Question } from '../types'
import { themeById } from '../data/themes'
import { renderScene } from '../lib/scene'

const props = defineProps<{
  question: Question
  lang: Lang
  /** Afficher aussi l'autre langue sous chaque texte. */
  showAlt?: boolean
  chosen: number | null
  /** Montre la correction (bonne/mauvaise réponse). */
  revealed?: boolean
  /** Numéro affiché (ex. « 12 / 50 »). */
  label?: string
  disabled?: boolean
}>()

const emit = defineEmits<{ choose: [index: number] }>()

const alt = computed<Lang>(() => (props.lang === 'fr' ? 'es' : 'fr'))
const main = computed(() => props.question[props.lang])
const other = computed(() => props.question[alt.value])
const letters = ['A', 'B', 'C', 'D']
const sceneSvg = computed(() => (props.question.scene ? renderScene(props.question.scene) : ''))

function classFor(i: number) {
  if (!props.revealed) return { chosen: props.chosen === i }
  if (i === props.question.answer) return { correct: true }
  if (props.chosen === i) return { wrong: true }
  return {}
}
</script>

<template>
  <div class="question">
    <div class="row small">
      <span v-if="label" class="muted">{{ label }}</span>
      <span class="pill">{{ themeById[question.theme][lang] }}</span>
      <span v-if="question.grave" class="pill grave">{{ lang === 'fr' ? 'faute grave' : 'falta grave' }}</span>
    </div>
    <div v-if="sceneSvg" class="scene-wrap" v-html="sceneSvg"></div>
    <p class="q">{{ main.q }}</p>
    <p v-if="showAlt" class="q alt">{{ other.q }}</p>
    <ul class="options">
      <li v-for="(opt, i) in main.options" :key="i">
        <button
          type="button"
          class="option"
          :class="classFor(i)"
          :disabled="disabled || revealed"
          @click="emit('choose', i)"
        >
          <span class="idx">{{ letters[i] }}</span>
          <span class="txt">
            {{ opt }}
            <span v-if="showAlt" class="alt">{{ other.options[i] }}</span>
          </span>
        </button>
      </li>
    </ul>
    <div v-if="revealed" class="feedback" :class="chosen === question.answer ? 'ok' : 'ko'">
      <b v-if="chosen === null">{{ lang === 'fr' ? 'Pas de réponse' : 'Sin respuesta' }} — </b>
      <b v-else-if="chosen === question.answer">{{ lang === 'fr' ? 'Correct.' : 'Correcto.' }}</b>
      <b v-else>{{ lang === 'fr' ? 'Incorrect.' : 'Incorrecto.' }}</b>
      {{ question.why }}
    </div>
  </div>
</template>
