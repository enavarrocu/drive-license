import type { Theme } from '../types'

export const themes: Theme[] = [
  { id: 'priorite', fr: 'Priorité', es: 'Prioridad', grave: true },
  { id: 'vitesse', fr: 'Vitesse et distances', es: 'Velocidad y distancias', grave: true },
  { id: 'depassement', fr: 'Dépassement et croisement', es: 'Adelantamiento y cruce', grave: true },
  { id: 'alcool', fr: 'Alcool, drogues, fatigue', es: 'Alcohol, drogas, fatiga', grave: true },
  { id: 'signaux', fr: 'Feux, agents et marquages', es: 'Semáforos, agentes y marcas viales', grave: false },
  { id: 'stationnement', fr: 'Arrêt et stationnement', es: 'Parada y estacionamiento', grave: false },
  { id: 'autoroute', fr: 'Autoroute et route pour automobiles', es: 'Autopista y vía para automóviles', grave: false },
  { id: 'usagers-faibles', fr: 'Piétons, cyclistes, trams', es: 'Peatones, ciclistas, tranvías', grave: false },
  { id: 'manoeuvres', fr: 'Manœuvres, virages, ronds-points', es: 'Maniobras, giros, rotondas', grave: false },
  { id: 'eclairage', fr: 'Éclairage et conditions difficiles', es: 'Alumbrado y condiciones difíciles', grave: false },
  { id: 'vehicule', fr: 'Véhicule, documents, sécurité', es: 'Vehículo, documentos, seguridad', grave: false },
  { id: 'permis', fr: 'Permis provisoire et règles générales', es: 'Permiso provisional y reglas generales', grave: false },
]

export const themeById = Object.fromEntries(themes.map((t) => [t.id, t])) as Record<Theme['id'], Theme>
