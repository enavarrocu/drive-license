<script setup lang="ts">
const { loggedIn } = useUserSession()
const store = useStore()

// <html lang="…"> sigue al idioma de la interfaz (lectores de pantalla, corrector, traducción automática).
useHead({ htmlAttrs: { lang: computed(() => store.lang.value) } })

// Charge l'état utilisateur dès qu'une session existe (SSR + client).
await callOnce(async () => {
  if (loggedIn.value) await store.load().catch(() => {})
})
watch(loggedIn, async (v) => {
  if (v) await store.load(true).catch(() => {})
  else store.reset()
})
</script>

<template>
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
</template>
