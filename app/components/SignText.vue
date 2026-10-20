<script setup lang="ts">
import { splitSignRefs } from '../lib/signRefs'

/** Texto plano en el que los códigos de señal se vuelven clicables. */
const props = defineProps<{ text: string }>()
const { open } = useSignPopup()
const parts = computed(() => splitSignRefs(props.text))
</script>

<template>
  <span>
    <template v-for="(p, i) in parts" :key="i">
      <span v-if="p.type === 'sign'" class="sign-ref" role="button" tabindex="0" @click.stop.prevent="open(p.code)" @keydown.enter.stop.prevent="open(p.code)">{{ p.code }}</span>
      <template v-else>{{ p.value }}</template>
    </template>
  </span>
</template>
