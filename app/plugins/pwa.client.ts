/**
 * Enregistre le service worker (public/sw.js) en production et branche l'état
 * PWA (installation, hors ligne, file d'attente des envois). En dev on
 * désenregistre tout SW restant d'un `pnpm preview` précédent sur la même
 * origine, pour ne pas servir des assets périmés à la place du HMR.
 *
 * Mise à jour : l'URL du SW contient le buildId, donc chaque déploiement installe
 * un nouveau worker. On lui demande de prendre la main tout de suite (skipWaiting)
 * et on recharge la page une fois qu'il contrôle l'onglet, pour que les chunks
 * demandés ensuite soient ceux du nouveau build.
 */
export default defineNuxtPlugin((nuxtApp) => {
  setupPwa()

  // File d'attente hors ligne : on renvoie ce qui est en attente au retour du réseau
  // et à l'ouverture de l'app (une fois l'état utilisateur chargé).
  const store = useStore()
  window.addEventListener('online', () => void store.syncOutbox())
  nuxtApp.hook('app:mounted', () => void store.syncOutbox())

  if (!('serviceWorker' in navigator)) return

  if (import.meta.dev) {
    void navigator.serviceWorker.getRegistrations().then((regs) => regs.forEach((r) => void r.unregister()))
    return
  }

  const buildId = useRuntimeConfig().app.buildId
  const activate = (worker: ServiceWorker | null) => worker?.postMessage('skipWaiting')

  let hadController = !!navigator.serviceWorker.controller
  navigator.serviceWorker.addEventListener('controllerchange', () => {
    // Premier contrôle (première visite) : rien à recharger. Changement de version : on recharge.
    if (hadController) window.location.reload()
    hadController = true
  })

  window.addEventListener('load', () => {
    navigator.serviceWorker
      .register(`/sw.js?v=${encodeURIComponent(buildId)}`, { scope: '/' })
      .then((reg) => {
        activate(reg.waiting)
        reg.addEventListener('updatefound', () => {
          const worker = reg.installing
          worker?.addEventListener('statechange', () => {
            if (worker.state === 'installed' && navigator.serviceWorker.controller) activate(worker)
          })
        })
      })
      .catch((err) => console.warn('[pwa] service worker non enregistré :', err))
  })
})
