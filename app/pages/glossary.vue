<script setup lang="ts">
import type { ThemeId } from '../types'
import { glossary } from '../data/glossary'
import { themes } from '../data/themes'

const { lang } = useStore()
const search = ref('')
const theme = ref<ThemeId | 'all'>('all')

function norm(s: string) {
  return s.normalize('NFD').replace(/[̀-ͯ]/g, '').toLowerCase()
}
const filtered = computed(() => {
  const q = norm(search.value.trim())
  return glossary.filter((g) => (theme.value === 'all' || g.theme === theme.value) && (!q || norm(g.fr).includes(q) || norm(g.es).includes(q) || (g.note ? norm(g.note).includes(q) : false)))
})
</script>

<template>
  <div>
    <div class="card">
      <h2>{{ lang === 'fr' ? 'Glossaire FR – ES' : 'Glosario FR – ES' }}</h2>
      <div class="row">
        <input v-model="search" class="search grow" type="search" :placeholder="lang === 'fr' ? 'Rechercher…' : 'Buscar…'" />
        <select v-model="theme" class="search" style="width: auto">
          <option value="all">{{ lang === 'fr' ? 'Tous' : 'Todos' }}</option>
          <option v-for="t in themes" :key="t.id" :value="t.id">{{ t[lang] }}</option>
        </select>
      </div>
    </div>
    <div class="card">
      <table class="glossary-table">
        <tbody>
          <tr v-for="g in filtered" :key="g.fr">
            <td>{{ g.fr }}</td>
            <td>{{ g.es }}<div v-if="g.note" class="small muted">{{ g.note }}</div></td>
          </tr>
        </tbody>
      </table>
      <p v-if="!filtered.length" class="muted">{{ lang === 'fr' ? 'Aucun résultat.' : 'Sin resultados.' }}</p>
      <p class="small muted" style="margin-bottom: 0">{{ filtered.length }} / {{ glossary.length }}</p>
    </div>
  </div>
</template>
