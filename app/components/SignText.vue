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
      <button v-if="p.type === 'sign'" type="button" class="sign-ref" @click.stop="open(p.code)">{{ p.code }}</button>
      <template v-else>{{ p.value }}</template>
    </template>
  </span>
</template>
