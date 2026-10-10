/** Toutes les pages exigent une session, sauf /login et /register. */
export default defineNuxtRouteMiddleware((to) => {
  const { loggedIn } = useUserSession()
  const open = ['/login', '/register']
  if (!loggedIn.value && !open.includes(to.path)) return navigateTo('/login')
  if (loggedIn.value && open.includes(to.path)) return navigateTo('/')
})
