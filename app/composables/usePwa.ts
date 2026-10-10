/**
 * Estado de la PWA (solo cliente): evento de instalación diferido de Chrome/Android,
 * si la app ya corre instalada, si es iOS (sin `beforeinstallprompt`) y si hay red.
 * Lo rellena app/plugins/pwa.client.ts; las páginas solo lo leen.
 */

interface BeforeInstallPromptEvent extends Event {
  prompt(): Promise<void>
  userChoice: Promise<{ outcome: 'accepted' | 'dismissed' }>
}

const installEvent = shallowRef<BeforeInstallPromptEvent | null>(null)
const standalone = ref(false)
const ios = ref(false)
const online = ref(true)

export function usePwa() {
  /** Lanza el diálogo nativo de instalación (Chrome, Edge, Android). */
  async function install(): Promise<boolean> {
    const ev = installEvent.value
    if (!ev) return false
    await ev.prompt()
    const { outcome } = await ev.userChoice
    if (outcome === 'accepted') installEvent.value = null
    return outcome === 'accepted'
  }

  /** Se puede ofrecer la instalación: navegador con prompt, o iOS Safari (instrucciones manuales). */
  const canInstall = computed(() => !standalone.value && (installEvent.value !== null || ios.value))

  return { installEvent, standalone, ios, online, canInstall, install }
}

/** Inicializa los listeners del navegador (llamado una vez por el plugin). */
export function setupPwa() {
  standalone.value = window.matchMedia('(display-mode: standalone)').matches || (navigator as { standalone?: boolean }).standalone === true
  ios.value = /iphone|ipad|ipod/i.test(navigator.userAgent) && !(window as { MSStream?: unknown }).MSStream
  online.value = navigator.onLine
  window.addEventListener('online', () => (online.value = true))
  window.addEventListener('offline', () => (online.value = false))
  window.addEventListener('beforeinstallprompt', (e) => {
    e.preventDefault()
    installEvent.value = e as BeforeInstallPromptEvent
  })
  window.addEventListener('appinstalled', () => {
    installEvent.value = null
    standalone.value = true
  })
}
