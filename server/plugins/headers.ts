/**
 * Retire l'en-tête `x-powered-by: Nuxt` que le renderer HTML ajoute (il est
 * posé via setResponseHeader avant le hook render:response, d'où beforeResponse).
 */
export default defineNitroPlugin((nitroApp) => {
  nitroApp.hooks.hook('beforeResponse', (event) => {
    const res = (event as unknown as { res?: { headers?: Headers } }).res
    if (res?.headers?.delete) res.headers.delete('x-powered-by')
    else removeResponseHeader(event, 'x-powered-by')
  })
})
