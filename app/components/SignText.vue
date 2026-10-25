<script setup lang="ts">
import { splitSignRefs } from '../lib/signRefs'
import { signByCode } from '../data/signs'
import { splitGloss } from '../lib/glossRefs'

/**
 * Texto plano en el que los códigos de señal se vuelven clicables.
 * Con `inline`, cada código se muestra como miniatura de la señal (como en el examen,
 * donde las respuestas llevan la imagen y no el código).
 */
const props = defineProps<{
  text: string
  inline?: boolean
  /** Texte français : les termes du glossaire deviennent cliquables (traduction). */
  gloss?: boolean
}>()
const { open } = useSignPopup()
const parts = computed(() => splitSignRefs(props.text).map((p) => (p.type === 'text' && props.gloss ? { ...p, gloss: splitGloss(p.value) } : p)))
</script>

<template>
  <span>
    <template v-for="(p, i) in parts" :key="i">
      <template v-if="p.type === 'sign'">
        <span v-if="inline && signByCode[p.code]" class="sign-ref sign-ref-inline" role="button" tabindex="0" :title="p.code" @click.stop.prevent="open(p.code)" @keydown.enter.stop.prevent="open(p.code)">
          <SignImage :sign="signByCode[p.code]!" />
        </span>
        <span v-else class="sign-ref" role="button" tabindex="0" @click.stop.prevent="open(p.code)" @keydown.enter.stop.prevent="open(p.code)">{{ p.code }}</span>
      </template>
      <template v-else-if="'gloss' in p && p.gloss">
        <template v-for="(g, j) in p.gloss" :key="j">
          <GlossTerm v-if="g.type === 'term'" :text="g.value" :entry="g.entry" />
          <template v-else>{{ g.value }}</template>
        </template>
      </template>
      <template v-else>{{ p.value }}</template>
    </template>
  </span>
</template>
