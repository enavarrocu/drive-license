<script setup lang="ts">
import { authErrorMessage } from '../lib/authErrors'

const { fetch: refreshSession } = useUserSession()
const { lang } = useStore()
const { data: cfg } = await useFetch('/api/auth/config')
const username = ref('')
const password = ref('')
const password2 = ref('')
const error = ref('')
const busy = ref(false)

async function submit() {
  error.value = ''
  if (password.value !== password2.value) {
    error.value = lang.value === 'fr' ? 'Les mots de passe ne correspondent pas.' : 'Las contraseñas no coinciden.'
    return
  }
  busy.value = true
  try {
    await $fetch('/api/auth/register', { method: 'POST', body: { username: username.value, password: password.value, lang: lang.value } })
    await refreshSession()
    await navigateTo('/')
  } catch (e: unknown) {
    error.value = authErrorMessage(e, lang.value)
  } finally {
    busy.value = false
  }
}
</script>

<template>
  <div class="card auth">
    <h2>{{ lang === 'fr' ? 'Créer un compte' : 'Crear cuenta' }}</h2>
    <p v-if="cfg && !cfg.allowRegistration" class="muted">{{ lang === 'fr' ? 'Les inscriptions sont fermées.' : 'Las inscripciones están cerradas.' }}</p>
    <form v-else @submit.prevent="submit">
      <label for="u">{{ lang === 'fr' ? 'Nom d\'utilisateur (3–32, lettres/chiffres)' : 'Usuario (3–32, letras/cifras)' }}</label>
      <input id="u" v-model="username" autocomplete="username" minlength="3" maxlength="32" required />
      <label for="p">{{ lang === 'fr' ? 'Mot de passe (min. 8)' : 'Contraseña (mín. 8)' }}</label>
      <input id="p" v-model="password" type="password" autocomplete="new-password" minlength="8" required />
      <label for="p2">{{ lang === 'fr' ? 'Confirmer' : 'Confirmar' }}</label>
      <input id="p2" v-model="password2" type="password" autocomplete="new-password" minlength="8" required />
      <p v-if="error" class="error">{{ error }}</p>
      <div class="row" style="margin-top: 14px">
        <button class="btn primary" type="submit" :disabled="busy">{{ lang === 'fr' ? 'Créer' : 'Crear' }}</button>
        <span class="grow"></span>
        <NuxtLink to="/login" class="small">{{ lang === 'fr' ? 'J\'ai déjà un compte' : 'Ya tengo cuenta' }}</NuxtLink>
      </div>
    </form>
  </div>
</template>
