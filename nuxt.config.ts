import { readdirSync, statSync, writeFileSync } from 'node:fs'
import { join, relative } from 'node:path'

/** Liste récursive des fichiers d'un dossier (chemins absolus). */
function walk(dir: string): string[] {
  return readdirSync(dir).flatMap((name) => {
    const full = join(dir, name)
    return statSync(full).isDirectory() ? walk(full) : [full]
  })
}

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  hooks: {
    // PWA : liste de tous les chunks client (/_nuxt/*.js|css|…) dans public/precache.json,
    // que public/sw.js met en cache à l'installation pour que toute l'app marche hors ligne.
    'nitro:build:public-assets'(nitro) {
      const publicDir = nitro.options.output.publicDir
      const assetsDir = join(publicDir, '_nuxt')
      const files = walk(assetsDir)
        .filter((f) => /\.(js|mjs|css|woff2?|svg|png|webp)$/.test(f) && !f.includes(`${join('_nuxt', 'builds')}`))
        .map((f) => '/' + relative(publicDir, f).split('\\').join('/'))
        .sort()
      writeFileSync(join(publicDir, 'precache.json'), JSON.stringify(files))
      console.log(`✔ precache.json : ${files.length} fichiers`)
    },
  },
  compatibilityDate: '2026-10-01',
  devtools: { enabled: false },
  modules: ['nuxt-auth-utils'],
  css: ['~/assets/style.css'],
  ssr: true,
  app: {
    head: {
      htmlAttrs: { lang: 'fr' },
      title: 'Permis Trainer — théorie B (FR/ES)',
      meta: [
        { name: 'viewport', content: 'width=device-width, initial-scale=1, viewport-fit=cover' },
        { name: 'theme-color', content: '#1b2a41' },
        { name: 'description', content: "Entraînement à l'examen théorique du permis B (Bruxelles) : cours, questions FR/ES, signaux et simulation d'examen." },
        // PWA : plein écran une fois installée (Android / iOS)
        { name: 'mobile-web-app-capable', content: 'yes' },
        { name: 'apple-mobile-web-app-capable', content: 'yes' },
        { name: 'apple-mobile-web-app-title', content: 'Permis' },
        { name: 'apple-mobile-web-app-status-bar-style', content: 'default' },
      ],
      link: [
        { rel: 'manifest', href: '/manifest.webmanifest' },
        { rel: 'icon', type: 'image/svg+xml', href: '/icons/icon.svg' },
        { rel: 'apple-touch-icon', href: '/icons/apple-touch-icon.png' },
      ],
    },
  },
  runtimeConfig: {
    // Surchargés par les variables d'env NUXT_DB_PATH, NUXT_ALLOW_REGISTRATION, NUXT_SESSION_PASSWORD
    dbPath: './data/permis.db',
    allowRegistration: 'true',
    session: {
      password: process.env.NUXT_SESSION_PASSWORD || '',
      maxAge: 60 * 60 * 24 * 90, // 90 jours
    },
  },
  routeRules: {
    // Pages avec tirage aléatoire / timers : rendu côté client uniquement (pas de mismatch d'hydratation)
    '/study': { ssr: false },
    '/exam': { ssr: false },
    '/signs': { ssr: false },
  },
  nitro: {
    // better-sqlite3 est un module natif : on le laisse hors du bundle
    externals: { external: ['better-sqlite3'] },
  },
})
