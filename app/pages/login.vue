<script setup lang="ts">
definePageMeta({ layout: 'default' })
const { fetch: refreshSession } = useUserSession()
const { data: cfg } = await useFetch('/api/auth/config')
const username = ref('')
const password = ref('')
const error = ref('')
const busy = ref(false)

async function submit() {
  error.value = ''
  busy.value = true
  try {
    await $fetch('/api/auth/login', { method: 'POST', body: { username: username.value, password: password.value } })
    await refreshSession()
    await navigateTo('/')
  } catch (e: unknown) {
    const err = e as { statusMessage?: string; data?: { statusMessage?: string } }
    error.value = err.data?.statusMessage ?? err.statusMessage ?? 'Erreur de connexion'
  } finally {
    busy.value = false
  }
}
</script>

<template>
  <div class="card auth">
    <h2>Connexion · Iniciar sesión</h2>
    <form @submit.prevent="submit">
      <label for="u">Nom d'utilisateur · Usuario</label>
      <input id="u" v-model="username" autocomplete="username" required />
      <label for="p">Mot de passe · Contraseña</label>
      <input id="p" v-model="password" type="password" autocomplete="current-password" required />
      <p v-if="error" class="error">{{ error }}</p>
      <div class="row" style="margin-top: 14px">
        <button class="btn primary" type="submit" :disabled="busy">Entrer · Entrar</button>
        <span class="grow"></span>
        <NuxtLink v-if="cfg?.allowRegistration" to="/register" class="small">Créer un compte · Crear cuenta</NuxtLink>
      </div>
    </form>
  </div>
</template>
