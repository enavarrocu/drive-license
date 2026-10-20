/** Señal abierta en el popup (null = cerrado). Estado global para toda la app. */
export function useSignPopup() {
  const current = useState<string | null>('signPopup', () => null)
  const open = (code: string) => (current.value = code)
  const close = () => (current.value = null)
  /** Handler delegado para contenedores con HTML (v-html) que contienen .sign-ref */
  const onClickDelegated = (e: MouseEvent) => {
    const el = (e.target as HTMLElement | null)?.closest?.('.sign-ref') as HTMLElement | null
    if (el?.dataset.sign) {
      e.preventDefault()
      open(el.dataset.sign)
    }
  }
  return { current, open, close, onClickDelegated }
}
