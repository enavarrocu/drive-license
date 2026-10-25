<script setup lang="ts">
/**
 * Formulaire « signaler une erreur » sous une question : texte libre envoyé avec l'id de la
 * question. Les signalements sont relus par un administrateur (page /reports).
 */
const props = defineProps<{ questionId: string }>()
const emit = defineEmits<{ close: [] }>()
const { lang, reportQuestion } = useStore()
const message = ref('')
const state = ref<'idle' | 'sending' | 'sent' | 'error'>('idle')
const errorText = ref('')

async function submit() {
  if (message.value.trim().length < 3 || state.value === 'sending') return
  state.value = 'sending'
  try {
    await reportQuestion(props.questionId, message.value.trim())
    state.value = 'sent'
  } catch (e) {
    const status = (e as { statusCode?: number }).statusCode
    errorText.value =
      status === 429
        ? lang.value === 'fr' ? 'Trop de signalements aujourd\'hui, réessayez demain.' : 'Demasiados avisos hoy, inténtalo mañana.'
        : lang.value === 'fr' ? 'Envoi impossible, réessayez.' : 'No se pudo enviar, inténtalo de nuevo.'
    state.value = 'error'
  }
}
</script>

<template>
  <div class="report-form" @click.stop>
    <template v-if="state === 'sent'">
      <p class="small" style="margin: 0">{{ lang === 'fr' ? 'Merci ! Le signalement sera vérifié.' : '¡Gracias! Revisaremos el aviso.' }}</p>
      <button class="btn sm ghost" type="button" @click="emit('close')">{{ lang === 'fr' ? 'Fermer' : 'Cerrar' }}</button>
    </template>
    <template v-else>
      <label class="small" :for="`report-${questionId}`">
        {{ lang === 'fr' ? 'Qu\'est-ce qui ne va pas dans cette question ?' : '¿Qué está mal en esta pregunta?' }}
        <span class="muted">({{ questionId }})</span>
      </label>
      <textarea
        :id="`report-${questionId}`"
        v-model="message"
        rows="3"
        maxlength="1000"
        :placeholder="lang === 'fr' ? 'Ex. : la bonne réponse devrait être B, car l\'article… / faute de traduction…' : 'Ej.: la respuesta correcta debería ser la B, porque el artículo… / error de traducción…'"
      ></textarea>
      <p v-if="state === 'error'" class="small" style="color: var(--ko); margin: 0">{{ errorText }}</p>
      <div class="row">
        <button class="btn sm primary" type="button" :disabled="message.trim().length < 3 || state === 'sending'" @click="submit">{{ lang === 'fr' ? 'Envoyer' : 'Enviar' }}</button>
        <button class="btn sm ghost" type="button" @click="emit('close')">{{ lang === 'fr' ? 'Annuler' : 'Cancelar' }}</button>
      </div>
    </template>
  </div>
</template>
