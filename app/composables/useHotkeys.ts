/** Touche normalisée : lettre en minuscule, chiffre, « enter », « space », « arrowright »… */
export type Hotkey = string

/** Index de réponse pour A/B/C/D ou 1/2/3/4 (null sinon). */
export function answerIndex(key: Hotkey): number | null {
  const i = 'abcd'.indexOf(key)
  if (i >= 0 && key.length === 1) return i
  const n = '1234'.indexOf(key)
  return n >= 0 && key.length === 1 ? n : null
}

/**
 * Raccourcis clavier de la page (étude, examen). Ignorés pendant la saisie dans un champ,
 * avec Ctrl/Alt/Cmd, et quand la fenêtre d'une señal est ouverte.
 * Le handler renvoie true s'il a traité la touche : on annule alors l'action par défaut
 * (sinon Entrée/Espace « cliquerait » aussi le bouton qui a le focus).
 */
export function useHotkeys(handler: (key: Hotkey) => boolean | void) {
  const { current: popup } = useSignPopup()
  function onKey(e: KeyboardEvent) {
    if (e.ctrlKey || e.metaKey || e.altKey || e.repeat || popup.value) return
    const t = e.target as HTMLElement | null
    if (t && (t.isContentEditable || ['INPUT', 'SELECT', 'TEXTAREA'].includes(t.tagName))) return
    const key = e.key === ' ' ? 'space' : e.key.toLowerCase()
    if (handler(key) === true) e.preventDefault()
  }
  onMounted(() => window.addEventListener('keydown', onKey))
  onBeforeUnmount(() => window.removeEventListener('keydown', onKey))
}
