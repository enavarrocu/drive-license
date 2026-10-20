<script setup lang="ts">
import { computed } from 'vue'
import { theoryById } from '../data/theory'
import { themeById } from '../data/themes'

const props = defineProps<{ theoryId: string }>()
const entry = computed(() => theoryById[props.theoryId])
</script>

<template>
  <section v-if="entry" class="theory">
    <div class="theory-head">
      <span class="pill">{{ themeById[entry.theme].es }}</span>
      <h3>{{ entry.title.es }} <span class="muted small">— {{ entry.title.fr }}</span></h3>
    </div>
    <p class="body"><SignText :text="entry.body" /></p>
    <div class="terms">
      <div v-for="t in entry.keyTerms" :key="t.fr" class="term"><b>{{ t.fr }}</b><span>{{ t.es }}</span></div>
    </div>
  </section>
</template>
