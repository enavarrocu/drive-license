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

/** Lit `text` et résout quand la lecture est finie (ou immédiatement si indisponible). */
export function speakText(text: string, lang: 'fr' | 'es' = 'fr'): Promise<void> {
  if (!speechAvailable()) return Promise.resolve()
  return new Promise((resolve) => {
    const synth = window.speechSynthesis
    synth.cancel()
    const u = new SpeechSynthesisUtterance(text)
    u.lang = lang === 'fr' ? 'fr-BE' : 'es-ES'
    const voice = pickVoice(lang === 'fr' ? 'fr' : 'es')
    if (voice) u.voice = voice
    u.rate = 0.95
    let done = false
    const finish = () => {
      if (!done) {
        done = true
        resolve()
      }
    }
    u.onend = finish
    u.onerror = finish
    synth.speak(u)
    // Garde-fou : certains navigateurs n'émettent jamais onend.
    const words = text.split(/\s+/).length
    setTimeout(finish, 1500 + words * 450)
  })
}

export function stopSpeaking() {
  if (speechAvailable()) window.speechSynthesis.cancel()
}
