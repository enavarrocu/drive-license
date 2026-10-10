import type { Lang } from '../types'

/**
 * Mensajes de error de login/registro en el idioma de la interfaz. La API
 * devuelve `statusMessage` en francés; aquí se traduce por código HTTP para
 * no depender del texto del servidor.
 */
const MESSAGES: Record<number, { fr: string; es: string }> = {
  400: { fr: 'Données invalides : vérifie le nom (3–32, lettres/chiffres) et le mot de passe (min. 8).', es: 'Datos no válidos: revisa el nombre (3–32, letras/cifras) y la contraseña (mín. 8).' },
  401: { fr: 'Identifiants incorrects.', es: 'Usuario o contraseña incorrectos.' },
  403: { fr: 'Les inscriptions sont fermées.', es: 'Las inscripciones están cerradas.' },
  409: { fr: 'Ce nom est déjà pris.', es: 'Ese nombre ya está en uso.' },
}
const FALLBACK = { fr: 'Erreur de connexion au serveur. Réessaie.', es: 'Error de conexión con el servidor. Vuelve a intentarlo.' }

export function authErrorMessage(e: unknown, lang: Lang): string {
  const err = e as { statusCode?: number; status?: number; response?: { status?: number } }
  const status = err?.statusCode ?? err?.status ?? err?.response?.status
  return (status !== undefined && MESSAGES[status]) ? MESSAGES[status][lang] : FALLBACK[lang]
}
