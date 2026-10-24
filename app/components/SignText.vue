<script setup lang="ts">
import { splitSignRefs } from '../lib/signRefs'
import { signByCode } from '../data/signs'

/**
 * Texto plano en el que los códigos de señal se vuelven clicables.
 * Con `inline`, cada código se muestra como miniatura de la señal (como en el examen,
 * donde las respuestas llevan la imagen y no el código).
 */
const props = defineProps<{ text: string; inline?: boolean }>()
const { open } = useSignPopup()
const parts = computed(() => splitSignRefs(props.text))
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
      <template v-else>{{ p.value }}</template>
    </template>
  </span>
</template>
