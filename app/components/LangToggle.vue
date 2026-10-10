<script setup lang="ts">
import type { Lang } from '../types'

const model = defineModel<Lang>({ required: true })
</script>

<template>
  <div class="lang-toggle" role="group" aria-label="Langue">
    <button type="button" :class="{ active: model === 'fr' }" @click="model = 'fr'">FR</button>
    <button type="button" :class="{ active: model === 'es' }" @click="model = 'es'">ES</button>
  </div>
</template>
