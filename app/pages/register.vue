<script setup lang="ts">
const { fetch: refreshSession } = useUserSession()
const { data: cfg } = await useFetch('/api/auth/config')
const username = ref('')
const password = ref('')
const password2 = ref('')
const error = ref('')
const busy = ref(false)

async function submit() {
  error.value = ''
  if (password.value !== password2.value) {
    error.value = 'Les mots de passe ne correspondent pas · Las contraseñas no coinciden'
    return
  }
  busy.value = true
  try {
    await $fetch('/api/auth/register', { method: 'POST', body: { username: username.value, password: password.value } })
    await refreshSession()
    await navigateTo('/')
  } catch (e: unknown) {
    const err = e as { statusMessage?: string; data?: { statusMessage?: string } }
    error.value = err.data?.statusMessage ?? err.statusMessage ?? 'Erreur'
  } finally {
    busy.value = false
  }
}
</script>

<template>
  <div class="card auth">
    <h2>Créer un compte · Crear cuenta</h2>
    <p v-if="cfg && !cfg.allowRegistration" class="muted">Les inscriptions sont fermées. · Las inscripciones están cerradas.</p>
    <form v-else @submit.prevent="submit">
      <label for="u">Nom d'utilisateur · Usuario (3–32, lettres/chiffres)</label>
      <input id="u" v-model="username" autocomplete="username" minlength="3" maxlength="32" required />
      <label for="p">Mot de passe · Contraseña (min. 8)</label>
      <input id="p" v-model="password" type="password" autocomplete="new-password" minlength="8" required />
      <label for="p2">Confirmer · Confirmar</label>
      <input id="p2" v-model="password2" type="password" autocomplete="new-password" minlength="8" required />
      <p v-if="error" class="error">{{ error }}</p>
      <div class="row" style="margin-top: 14px">
        <button class="btn primary" type="submit" :disabled="busy">Créer · Crear</button>
        <span class="grow"></span>
        <NuxtLink to="/login" class="small">J'ai déjà un compte · Ya tengo cuenta</NuxtLink>
      </div>
    </form>
  </div>
</template>
