<script setup lang="ts">
import { computed } from 'vue'
import type { Lang, Question } from '../types'
import { themeById } from '../data/themes'
import { renderScene } from '../lib/scene'
import { splitSignRefs } from '../lib/signRefs'
import { signByCode } from '../data/signs'
import { signImages } from '../data/signImages'

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
/** Señales citadas en el enunciado: se muestran como imagen antes de la pregunta, como en el examen. */
const questionSigns = computed(() => {
  const codes = new Set<string>()
  const q = props.question.fr.q
  for (const p of splitSignRefs(q)) if (p.type === 'sign') codes.add(p.code)
  return [...codes]
    .slice(0, 4)
    .map((c) => {
      const s = signByCode[c]
      if (!s) return undefined
      // « C43 « 70 » » / « C43 70 » : variante con esa cifra si existe la imagen oficial (C43-70.svg).
      const m = new RegExp(`\\b${c}\\s*[«(]?\\s*(\\d{2,3})\\s*[»)]?`).exec(q)
      const variant = m && signImages.get(`${c}-${m[1]}`)
      return variant ? { ...s, img: variant } : s
    })
    .filter((s): s is NonNullable<typeof s> => !!s)
})
const { open } = useSignPopup()
const hasVisual = computed(() => !!sceneSvg.value || !!props.question.image || questionSigns.value.length > 0)

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
    <div class="q-layout" :class="{ 'has-visual': hasVisual }">
      <div v-if="hasVisual" class="q-visual">
        <div v-if="sceneSvg" class="scene-wrap" v-html="sceneSvg"></div>
        <div v-if="question.image" class="question-image" v-html="question.image"></div>
        <div v-else-if="questionSigns.length" class="question-signs">
          <button v-for="s in questionSigns" :key="s.code" type="button" class="question-sign" :title="s.code" @click="open(s.code)">
            <SignImage :sign="s" />
          </button>
        </div>
      </div>
      <div class="q-body">
    <p class="q"><SignText :text="main.q" /></p>
    <p v-if="showAlt" class="q alt"><SignText :text="other.q" /></p>
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
            <SignText :text="opt" />
            <span v-if="showAlt" class="alt"><SignText :text="other.options[i] ?? ''" /></span>
          </span>
        </button>
      </li>
    </ul>
    <div v-if="revealed" class="feedback" :class="chosen === question.answer ? 'ok' : 'ko'">
      <b v-if="chosen === null">{{ lang === 'fr' ? 'Pas de réponse' : 'Sin respuesta' }} — </b>
      <b v-else-if="chosen === question.answer">{{ lang === 'fr' ? 'Correct.' : 'Correcto.' }}</b>
      <b v-else>{{ lang === 'fr' ? 'Incorrect.' : 'Incorrecto.' }}</b>
      <b v-if="chosen !== question.answer">&nbsp;{{ lang === 'fr' ? 'Bonne réponse' : 'Respuesta correcta' }} : {{ letters[question.answer] }}.</b>
      {{ ' ' }}
      <SignText :text="question.why" />
    </div>
      </div>
    </div>
  </div>
</template>
