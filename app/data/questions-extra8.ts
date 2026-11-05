import type { Question } from '../types'
import { Q } from './q'

/**
 * Bloque 8 (nov 2026): caminos reservados (F99a/b/c, F101a/b/c, art. 22quinquies y 22octies del Code de la route).
 * Ids `z8-<tema>-NN`.
 */
export const extraQuestions8: Question[] = [
  { ...Q('z8-pan-01', 'panneaux', 'pan-indication',
    ['Sur ce chemin, un cycliste peut-il rouler sur la partie prévue pour les piétons ?', "Oui, s'il cède le passage aux piétons qui s'y trouvent.", 'Non, cette partie est toujours interdite aux cyclistes.', "Oui, et les piétons doivent lui laisser la place."],
    ['En este camino, ¿puede un ciclista ir por la parte prevista para los peatones?', 'Sí, si cede el paso a los peatones que están en ella.', 'No, esa parte siempre está prohibida a los ciclistas.', 'Sí, y los peatones deben dejarle sitio.'],
    0, 'Con la F99b cada categoría tiene su parte, pero se puede circular por la otra «à condition de céder le passage aux usagers qui s\'y trouvent régulièrement» (art. 22quinquies.3).'), signs: ['F99b'] },
  { ...Q('z8-pan-02', 'panneaux', 'pan-indication',
    ['Que signifie ce signal ?', "L'accès est interdit aux véhicules agricoles.", 'Les tracteurs ne sont plus prioritaires.', 'Fin du chemin réservé, aussi aux tracteurs.'],
    ['¿Qué significa esta señal?', 'Acceso prohibido a los vehículos agrícolas.', 'Los tractores dejan de tener prioridad.', 'Fin del camino reservado, también a tractores.'],
    2, 'La F101c marca el fin del camino reservado a los vehículos agrícolas, peatones, ciclistas, jinetes y speed pedelecs que empezó con la F99c (art. 22octies.1). La franja roja indica el fin, no una prohibición.'), signs: ['F101c'] },
  { ...Q('z8-pan-03', 'panneaux', 'pan-indication',
    ['Quelle est la vitesse maximale sur le chemin qui commence à ce signal ?', '20 km/h.', '30 km/h.', '50 km/h.'],
    ['¿Cuál es la velocidad máxima en el camino que empieza en esta señal?', '20 km/h.', '30 km/h.', '50 km/h.'],
    1, 'En los caminos reservados de la F99a/F99b «la vitesse est limitée à 30 km par heure» (art. 22quinquies.4); también en los de la F99c (art. 22octies.3).'), signs: ['F99a'] },
  { ...Q('z8-pan-04', 'panneaux', 'pan-indication',
    ['Un conducteur de speed pedelec peut-il emprunter ce chemin ?', 'Oui.', 'Non.'],
    ['¿Puede un conductor de speed pedelec usar este camino?', 'Sí.', 'No.'],
    0, 'Sí. En este camino solo circulan las categorías dibujadas en la señal (art. 22quinquies.1), y la F99a lleva el ciclomotor con la «P» de los speed pedelecs: es un camino «réservé à la circulation des piétons, cyclistes, cavaliers et conducteurs de speed pedelecs» (art. 71, F99a).'), signs: ['F99a'] },
  { ...Q('z8-pan-05', 'panneaux', 'pan-indication',
    ['En voiture, puis-je emprunter ce chemin pour éviter un embouteillage ?', 'Oui.', 'Non.'],
    ['En coche, ¿puedo usar este camino para evitar un atasco?', 'Sí.', 'No.'],
    1, 'No. Solo pueden circular las categorías dibujadas en la señal; los coches no están, salvo prioritarios en misión o vehículos autorizados por el gestor (art. 22quinquies.1).'), signs: ['F99a'] },
]
