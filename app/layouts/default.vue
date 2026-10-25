<script setup lang="ts">
const { loggedIn, user, clear } = useUserSession()
const store = useStore()
const { lang, pendingCount, isAdmin } = store
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
      <NuxtLink v-if="isAdmin" to="/reports" :class="{ active: route.path === '/reports' }">⚑ {{ lang === 'fr' ? 'Signalements' : 'Avisos' }}</NuxtLink>
    </nav>
    <main>
      <slot />
    </main>
    <SignPopup />
    <footer>
      <p>
        <b>{{ lang === 'fr' ? 'Outil d\'entraînement non officiel.' : 'Herramienta de práctica no oficial.' }}</b>
        {{ lang === 'fr'
          ? 'Cours et banque de questions originaux, rédigés pour préparer l\'examen théorique B (Bruxelles) ; ce n\'est pas la banque officielle GOCA. Le contenu a été vérifié avec soin, mais la seule référence est la réglementation :'
          : 'Curso y banco de preguntas originales, redactados para preparar el examen teórico B (Bruselas); no es el banco oficial de GOCA. El contenido se ha revisado con cuidado, pero la única referencia es la normativa:' }}
        <a href="https://www.codedelaroute.be/fr/reglementation/1975120109~hra8v386pu" target="_blank" rel="noopener">Code de la route</a>.
      </p>
      <p v-if="loggedIn">
        {{ lang === 'fr' ? 'Une erreur ? Utilisez « ⚑ Signaler » sur la question concernée.' : '¿Un error? Usa «⚑ Avisar» en la pregunta afectada.' }}
      </p>
    </footer>
  </div>
</template>
