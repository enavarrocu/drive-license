/* eslint-disable no-restricted-globals */
/**
 * Service worker de Permis Trainer (sans dépendances, pas de build).
 *
 * Il est enregistré avec `/sw.js?v=<buildId>` (voir app/plugins/pwa.client.ts) :
 * chaque build de Nuxt change l'URL, le navigateur réinstalle le SW et les
 * caches de la version précédente sont supprimés à l'activation.
 *
 * Stratégies :
 *  - /api/_auth/session, /api/me → réseau d'abord, sinon la dernière réponse en cache
 *    (sans ça, hors ligne, nuxt-auth-utils croit l'utilisateur déconnecté et le
 *    middleware renvoie vers /login). Vidé à la déconnexion (DELETE session).
 *  - autres /api/*     → réseau uniquement (jamais en cache)
 *  - /_nuxt/*          → cache d'abord (assets hachés, immuables)
 *  - navigations       → réseau d'abord, sinon la page en cache, sinon /offline.html
 *  - icônes, manifest, offline.html → cache puis mise à jour en arrière-plan
 *  - tout autre GET  → réseau, sans cache
 *
 * Limite connue : seules les pages (et leurs chunks JS) déjà visitées en ligne sont
 * disponibles hors ligne ; la progression faite hors ligne n'est pas enregistrée.
 */

const VERSION = new URL(self.location.href).searchParams.get('v') || 'dev'
const SHELL = `permis-shell-${VERSION}`
const ASSETS = `permis-assets-${VERSION}`
const PAGES = `permis-pages-${VERSION}`
const OWN = new Set([SHELL, ASSETS, PAGES])

const OFFLINE_URL = '/offline.html'
/** Réponses d'API liées à l'utilisateur qu'on garde pour le hors-ligne (cache PAGES, vidé à la déconnexion). */
const SESSION_URLS = new Set(['/api/_auth/session', '/api/me'])
const PRECACHE = [OFFLINE_URL, '/manifest.webmanifest', '/icons/icon.svg', '/icons/icon-192.png', '/icons/icon-512.png']

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches
      .open(SHELL)
      .then((cache) => cache.addAll(PRECACHE))
      .then(() => self.skipWaiting()),
  )
})

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches
      .keys()
      .then((keys) => Promise.all(keys.filter((k) => k.startsWith('permis-') && !OWN.has(k)).map((k) => caches.delete(k))))
      .then(() => self.clients.claim()),
  )
})

self.addEventListener('message', (event) => {
  if (event.data === 'skipWaiting') self.skipWaiting()
})

/** Une réponse qu'on peut mettre en cache : 200, même origine, non redirigée. */
function cacheable(res) {
  return res && res.ok && res.type === 'basic' && !res.redirected
}

async function cacheFirst(request, cacheName) {
  const cache = await caches.open(cacheName)
  const hit = await cache.match(request)
  if (hit) return hit
  const res = await fetch(request)
  if (cacheable(res)) cache.put(request, res.clone())
  return res
}

async function staleWhileRevalidate(request, cacheName) {
  const cache = await caches.open(cacheName)
  const hit = await cache.match(request)
  const refresh = fetch(request)
    .then((res) => {
      if (cacheable(res)) cache.put(request, res.clone())
      return res
    })
    .catch(() => undefined)
  return hit || (await refresh) || Response.error()
}

async function networkFirst(request, cacheName) {
  const cache = await caches.open(cacheName)
  try {
    const res = await fetch(request)
    if (cacheable(res)) cache.put(request, res.clone())
    return res
  } catch (err) {
    const hit = await cache.match(request, { ignoreSearch: request.mode === 'navigate' })
    if (hit) return hit
    throw err
  }
}

async function navigate(request) {
  try {
    return await networkFirst(request, PAGES)
  } catch {
    const offline = await caches.match(OFFLINE_URL)
    return offline || new Response('Hors ligne', { status: 503, headers: { 'Content-Type': 'text/plain; charset=utf-8' } })
  }
}

self.addEventListener('fetch', (event) => {
  const { request } = event
  const url = new URL(request.url)
  if (url.origin !== self.location.origin) return

  // Déconnexion : on oublie les pages rendues pour cet utilisateur et sa session.
  if (request.method === 'DELETE' && url.pathname === '/api/_auth/session') {
    event.waitUntil(caches.delete(PAGES))
    return
  }
  if (request.method !== 'GET') return

  if (request.mode === 'navigate') {
    event.respondWith(navigate(request))
  } else if (SESSION_URLS.has(url.pathname)) {
    event.respondWith(networkFirst(request, PAGES).catch(() => Response.error()))
  } else if (url.pathname.startsWith('/api/')) {
    return
  } else if (url.pathname.startsWith('/_nuxt/')) {
    event.respondWith(cacheFirst(request, ASSETS))
  } else if (url.pathname.startsWith('/icons/') || PRECACHE.includes(url.pathname)) {
    event.respondWith(staleWhileRevalidate(request, SHELL))
  }
  // Tout le reste (y compris un fetch() d'une page HTML depuis le JS) : réseau, sans cache.
})
