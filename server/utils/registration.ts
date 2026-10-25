/**
 * Interrupteur dans le code : tant que l'application n'est pas ouverte au public, les inscriptions
 * restent fermées quoi que dise NUXT_ALLOW_REGISTRATION. Pour rouvrir : mettre `true` (et la
 * variable d'env à `true`). Les comptes existants ne sont pas concernés.
 */
export const REGISTRATION_OPEN = false

export function registrationAllowed(): boolean {
  return REGISTRATION_OPEN && String(useRuntimeConfig().allowRegistration) === 'true'
}
