<script setup lang="ts">
import { signByCode } from '../data/signs'

const { current, close } = useSignPopup()
const { lang } = useStore()
const sign = computed(() => (current.value ? signByCode[current.value] : undefined))

function onKey(e: KeyboardEvent) {
  if (e.key === 'Escape') close()
}
onMounted(() => window.addEventListener('keydown', onKey))
onBeforeUnmount(() => window.removeEventListener('keydown', onKey))
</script>

<template>
  <Teleport to="body">
    <div v-if="sign" class="sign-popup-backdrop" @click="close">
      <div class="sign-popup" role="dialog" aria-modal="true" @click.stop>
        <button type="button" class="sign-popup-close" aria-label="Fermer" @click="close">×</button>
        <div class="sign-popup-img"><SignImage :sign="sign" /></div>
        <div class="code">{{ sign.code }}</div>
        <h3>{{ sign.name[lang] }}</h3>
        <div class="muted">{{ lang === 'fr' ? sign.name.es : sign.name.fr }}</div>
        <p>{{ sign.meaning }}</p>
        <NuxtLink :to="{ path: '/signs', query: { code: sign.code } }" class="btn sm" @click="close">{{ lang === 'fr' ? 'Voir dans le catalogue' : 'Ver en el catálogo' }}</NuxtLink>
      </div>
    </div>
  </Teleport>
</template>
