<script setup lang="ts">
import type { GlossaryEntry } from '../types'

/**
 * Terme français du glossaire dans une question : souligné en pointillé, un clic (ou Entrée)
 * affiche la traduction sans choisir la réponse. Un seul terme ouvert à la fois.
 */
const props = defineProps<{ text: string; entry: GlossaryEntry }>()
const id = useId()
const openId = useState<string | null>('glossOpen', () => null)
const open = computed(() => openId.value === id)
function toggle() {
  openId.value = open.value ? null : id
}
</script>

<template>
  <span class="gloss" :class="{ open }" role="button" tabindex="0" :aria-expanded="open" @click.stop.prevent="toggle" @keydown.enter.stop.prevent="toggle"
    >{{ props.text }}<span v-if="open" class="gloss-tip" role="tooltip" @click.stop
      ><b>{{ entry.fr }}</b> — {{ entry.es }}<span v-if="entry.note" class="gloss-note">{{ entry.note }}</span></span
    ></span
  >
</template>
