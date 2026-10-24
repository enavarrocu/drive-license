/**
 * Lecture à voix haute des questions (comme à l'examen réel, où chaque
 * question est lue avant le décompte des 15 secondes).
 * Utilise l'API Web Speech du navigateur — aucune dépendance.
 */

export function speechAvailable(): boolean {
  return typeof window !== 'undefined' && 'speechSynthesis' in window
}

function pickVoice(lang: string): SpeechSynthesisVoice | undefined {
  const voices = window.speechSynthesis.getVoices()
  return (
    voices.find((v) => v.lang.toLowerCase() === 'fr-be') ??
    voices.find((v) => v.lang.toLowerCase().startsWith(lang.toLowerCase())) ??
    undefined
  )
}

/** Lecture en cours : permet de la clore proprement quand une nouvelle lecture commence ou qu'on l'arrête. */
let pending: (() => void) | undefined

/**
 * Lit `text` et résout quand la lecture est finie (ou immédiatement si indisponible).
 * Une lecture précédente encore en attente est résolue tout de suite : son garde-fou
 * ne peut donc plus se déclencher pendant la question suivante.
 */
export function speakText(text: string, lang: 'fr' | 'es' = 'fr'): Promise<void> {
  if (!speechAvailable()) return Promise.resolve()
  return new Promise((resolve) => {
    const synth = window.speechSynthesis
    pending?.()
    synth.cancel()
    const u = new SpeechSynthesisUtterance(text)
    u.lang = lang === 'fr' ? 'fr-BE' : 'es-ES'
    const voice = pickVoice(lang === 'fr' ? 'fr' : 'es')
    if (voice) u.voice = voice
    u.rate = 0.95
    let done = false
    let guard: number | undefined
    const finish = () => {
      if (done) return
      done = true
      if (guard) clearTimeout(guard)
      if (pending === finish) pending = undefined
      resolve()
    }
    pending = finish
    u.onend = finish
    u.onerror = finish
    synth.speak(u)
    // Garde-fou : certains navigateurs n'émettent jamais onend.
    const words = text.split(/\s+/).length
    guard = window.setTimeout(finish, 1500 + words * 450)
  })
}

export function stopSpeaking() {
  pending?.()
  if (speechAvailable()) window.speechSynthesis.cancel()
}
