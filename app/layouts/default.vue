<script setup lang="ts">
const { loggedIn, user, clear } = useUserSession()
const store = useStore()
const { lang, pendingCount } = store
const route = useRoute()
const { online } = usePwa()

const tabs = [
  { to: '/', fr: 'Accueil', es: 'Inicio' },
  { to: '/course', fr: 'Cours', es: 'Curso' },
  { to: '/study', fr: 'Étudier', es: 'Estudiar' },
  { to: '/exam', fr: 'Examen', es: 'Examen' },
  { to: '/glossary', fr: 'Glossaire', es: 'Glosario' },
  { to: '/signs', fr: 'Signaux', es: 'Señales' },
]

async function logout() {
  await $fetch('/api/auth/logout', { method: 'POST' })
  await clear()
  store.reset()
  await navigateTo('/login')
}
</script>

<template>
  <div class="app">
    <header class="topbar">
      <NuxtLink to="/" class="brand"><span class="dot"></span> Permis Trainer <span class="muted small">· théorie B</span></NuxtLink>
      <div class="spacer"></div>
      <span v-if="!online" class="pill warn" :title="lang === 'fr' ? 'Pas de connexion : la progression sera envoyée au retour du réseau' : 'Sin conexión: el progreso se enviará cuando vuelva la red'">{{ lang === 'fr' ? 'hors ligne' : 'sin conexión' }}</span>
      <span v-else-if="pendingCount > 0" class="pill" :title="lang === 'fr' ? 'Envois en attente de synchronisation' : 'Envíos pendientes de sincronizar'">{{ pendingCount }} {{ lang === 'fr' ? 'à synchroniser' : 'por sincronizar' }}</span>
      <LangToggle v-model="lang" />
      <button v-if="loggedIn" class="btn sm ghost" type="button" :title="user?.username" @click="logout">⎋</button>
    </header>
    <nav v-if="loggedIn" class="nav">
      <NuxtLink v-for="t in tabs" :key="t.to" :to="t.to" :class="{ active: route.path === t.to || (t.to !== '/' && route.path.startsWith(t.to)) }">{{ t[lang] }}</NuxtLink>
    </nav>
    <main>
      <slot />
    </main>
    <SignPopup />
    <footer>
      {{ lang === 'fr'
        ? 'Cours et banque de questions originaux, rédigés pour l\'entraînement à l\'examen théorique B (Bruxelles). Ce n\'est pas la banque officielle GOCA.'
        : 'Curso y banco de preguntas originales, redactados para preparar el examen teórico B (Bruselas). No es el banco oficial de GOCA.' }}
    </footer>
  </div>
</template>
