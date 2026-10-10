<script setup lang="ts">
import type { SignCategory } from '../types'
import { signs, signCategories } from '../data/signs'
import { shuffle } from '../lib/exam'

const { lang } = useStore()
const mode = ref<'grid' | 'flash'>('grid')
const category = ref<SignCategory | 'all'>('all')
const list = computed(() => signs.filter((s) => category.value === 'all' || s.category === category.value))

const deck = ref(signs.slice())
const pos = ref(0)
const flipped = ref(false)
const card = computed(() => deck.value[pos.value])

function startFlash() {
  deck.value = shuffle(list.value)
  pos.value = 0
  flipped.value = false
  mode.value = 'flash'
}
function nextCard() {
  pos.value = (pos.value + 1) % deck.value.length
  flipped.value = false
}
</script>

<template>
  <div>
    <div class="card">
      <div class="row">
        <h2 class="grow" style="margin: 0">{{ lang === 'fr' ? 'Signaux routiers' : 'Señales de tráfico' }} <span class="muted small">({{ list.length }})</span></h2>
        <select v-model="category" class="search" style="width: auto">
          <option value="all">{{ lang === 'fr' ? 'Toutes les familles' : 'Todas las familias' }}</option>
          <option v-for="c in signCategories" :key="c.id" :value="c.id">{{ c[lang] }}</option>
        </select>
        <button v-if="mode === 'grid'" class="btn primary" type="button" @click="startFlash">Flashcards</button>
        <button v-else class="btn" type="button" @click="mode = 'grid'">{{ lang === 'fr' ? 'Liste' : 'Lista' }}</button>
      </div>
      <p class="muted small" style="margin-bottom: 0">{{ lang === 'fr' ? 'Dessins schématiques : forme, couleur et symbole conformes, tracé simplifié.' : 'Dibujos esquemáticos: forma, color y símbolo fieles, trazado simplificado.' }}</p>
    </div>

    <div v-if="mode === 'grid'" class="signs-grid">
      <div v-for="s in list" :key="s.code" class="sign-card">
        <div v-html="s.svg"></div>
        <div class="code">{{ s.code }}</div>
        <div><b>{{ s.name[lang] }}</b></div>
        <div class="small muted">{{ lang === 'fr' ? s.name.es : s.name.fr }}</div>
        <p class="small" style="margin: 6px 0 0; text-align: left">{{ s.meaning }}</p>
      </div>
    </div>

    <div v-else-if="card" class="card flash">
      <p class="muted small">{{ pos + 1 }} / {{ deck.length }}</p>
      <div v-html="card.svg"></div>
      <div v-if="!flipped">
        <button class="btn primary" type="button" @click="flipped = true">{{ lang === 'fr' ? 'Voir la réponse' : 'Ver la respuesta' }}</button>
      </div>
      <div v-else class="answer">
        <div class="code">{{ card.code }}</div>
        <h3 style="margin: 4px 0">{{ card.name.fr }}</h3>
        <div class="muted">{{ card.name.es }}</div>
        <p>{{ card.meaning }}</p>
        <button class="btn primary" type="button" @click="nextCard">{{ lang === 'fr' ? 'Suivante →' : 'Siguiente →' }}</button>
      </div>
    </div>
  </div>
</template>
