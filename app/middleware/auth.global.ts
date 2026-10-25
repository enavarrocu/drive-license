/**
 * Toutes les pages exigent une session, sauf la présentation publique (/bienvenue), /login et
 * /register. Sans session, l'accueil mène à la présentation et les autres pages à la connexion.
 */
export default defineNuxtRouteMiddleware((to) => {
  const { loggedIn } = useUserSession()
  const open = ['/bienvenue', '/login', '/register']
  if (!loggedIn.value && !open.includes(to.path)) return navigateTo(to.path === '/' ? '/bienvenue' : '/login')
  if (loggedIn.value && open.includes(to.path)) return navigateTo('/')
})
