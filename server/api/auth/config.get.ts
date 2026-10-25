/** Info publique pour la page de login (inscriptions ouvertes ?). */
export default defineEventHandler(() => ({
  allowRegistration: registrationAllowed(),
}))
