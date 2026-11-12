import type { Question } from '../types'
import type { Lane, SceneVehicle } from '../lib/scene'
import { Q, QS } from './q'

/**
 * Bloque 6 (nov 2026): huecos detectados al comparar el banco con simulacros reales.
 * Escenas y temas graves (prioridad, adelantamiento, maniobras, autopista…), ids `z6-<tema>-NN`.
 * Para los tramos con `layout`, 'up' = hacia arriba, el sentido del candidato.
 */

/** Vehículo en un cruce (brazo + giro). */
const at = (id: string, arm: SceneVehicle['arm'], turn: SceneVehicle['turn'] = 'straight', extra: Partial<SceneVehicle> = {}): SceneVehicle => ({ id, arm, turn, ...extra })
const meAt = (arm: SceneVehicle['arm'], turn: SceneVehicle['turn'] = 'straight', extra: Partial<SceneVehicle> = {}): SceneVehicle => at('moi', arm, turn, { you: true, ...extra })
/** Vehículo en un tramo con `layout` (carril + ordenada). */
const me = (extra: Partial<SceneVehicle>): SceneVehicle => ({ id: 'moi', arm: 'S', you: true, turn: 'straight', ...extra })
const v = (id: string, extra: Partial<SceneVehicle>): SceneVehicle => ({ id, arm: 'S', turn: 'straight', ...extra })

const SW: Lane = { kind: 'sidewalk' }
const DOWN: Lane = { dir: 'down' }
const UP: Lane = { dir: 'up' }

export const extraQuestions6: Question[] = [
  /* ============ PRIORITÉ ============ */
  QS(Q('z6-prio-01', 'priorite', 'prio-signaux',
    ['Le signal placé à mon accès montre que la route prioritaire va de bas en haut ; aucune route n\'arrive à ma droite. Je tourne à gauche. Dans quel ordre passe-t-on ?', 'Moi, puis A, puis B.', 'A, puis moi, puis B.', 'B, puis A, puis moi.'],
    ['La señal colocada en mi acceso muestra que la vía con prioridad va de abajo arriba; por mi derecha no llega ninguna vía. Giro a la izquierda. ¿En qué orden se pasa?', 'Yo, luego A, luego B.', 'A, luego yo, luego B.', 'B, luego A, luego yo.'],
    1, 'La señal de «priorité de passage» me da prioridad en este cruce; su barra horizontal puede adaptarse para representar el trazado del cruce (art. 67.3). Por mi derecha no llega ninguna vía, así que no hay nadie a quien ceder por la derecha. B, con «céder le passage», cede a todos los que circulan por la vía que aborda (art. 12.3.1 a). Pero A está en la misma vía prioritaria y viene de frente: al girar a la izquierda le cedo el paso (art. 19.3 3°). Orden: A, yo, B.', true),
    { type: 'T', missing: 'E', signs: { S: 'B15', N: 'B15', W: 'B1' }, vehicles: [meAt('S', 'left'), at('A', 'N'), at('B', 'W', 'right')] }),
  QS(Q('z6-prio-02', 'priorite', 'z5-arrets-passages',
    ['En agglomération, le bus B met son clignotant gauche pour quitter son arrêt, juste avant le carrefour. J\'arrive par la rue de sa droite et je vais tout droit. Qui passe en premier ?', 'Moi.', 'Le bus B.', 'Le premier arrivé.'],
    ['En población, el autobús B pone el intermitente izquierdo para salir de su parada, justo antes del cruce. Llego por la calle de su derecha y sigo recto. ¿Quién pasa primero?', 'Yo.', 'El autobús B.', 'El primero que llega.'],
    0, 'El art. 39 solo obliga a dejar salir al autobús a quien sigue su misma dirección; yo llego por una calle transversal, así que no se me aplica. Rige la regla general: el autobús que sale de su parada hace una maniobra y cede el paso (art. 12.4) y, además, en el cruce yo llego por su derecha (art. 12.3.1).', true),
    { type: 'cross', marks: [{ t: 'stop', x: 216, y: 268, label: 'BUS' }], vehicles: [at('B', 'S', 'straight', { kind: 'bus', back: 0.5, blink: 'left' }), meAt('E')], caption: 'en agglomération' }),
  QS(Q('z6-prio-03', 'priorite', 'prio-droite',
    ['Je sors d\'un chemin de terre pour tourner à droite sur la route. Le cycliste C arrive par ma gauche. Qui passe en premier ?', 'Moi, il vient de ma gauche.', 'Le plus rapide des deux.', 'Le cycliste C.'],
    ['Salgo de un camino de tierra para girar a la derecha en la carretera. El ciclista C llega por mi izquierda. ¿Quién pasa primero?', 'Yo, viene por mi izquierda.', 'El más rápido de los dos.', 'El ciclista C.'],
    2, 'Quien sale de un «chemin de terre» o de un sendero a una vía con calzada cede el paso a todo conductor que circula por ella (art. 12.3.1 b), venga por la derecha o por la izquierda. Un ciclista es un conductor como los demás.', true),
    { type: 'T', dirt: ['S'], vehicles: [meAt('S', 'right'), at('C', 'W', 'straight', { kind: 'bike', back: 0.6 })], caption: 'je sors d\'un chemin de terre' }),
  { ...Q('z6-prio-04', 'priorite', 'dep-croisement',
    ['Ce signal est placé à l\'entrée d\'un pont étroit. Une voiture arrive en face, à la même distance que moi du pont. Ai-je la priorité ?', 'Oui.', 'Non.'],
    ['Esta señal está a la entrada de un puente estrecho. Un coche viene de frente, a la misma distancia del puente que yo. ¿Tengo prioridad?', 'Sí.', 'No.'],
    0, 'Esta señal de «passage étroit» da prioridad de paso frente a los conductores que vienen en sentido contrario (art. 67.3); es la contraria de la que obliga a ceder a los que vienen de frente. Quien viene de frente tiene la señal que le obliga a cederme el paso.', true), signs: ['B21'] },

  /* ============ DÉPASSEMENT ============ */
  QS(Q('z6-dep-01', 'depassement', 'dep-interdit',
    ['Deux bandes dans mon sens, une dans l\'autre. A dépasse le camion C. Rien ne vient en face. Puis-je dépasser A par la bande de gauche ?', 'Non, pas tant que A dépasse.', 'Oui, rien ne vient en face.', 'Oui, si je klaxonne d\'abord.'],
    ['Dos carriles en mi sentido, uno en el otro. A adelanta al camión C. No viene nadie de frente. ¿Puedo adelantar a A por el carril de la izquierda?', 'No, mientras A esté adelantando.', 'Sí, no viene nadie de frente.', 'Sí, si toco antes el claxon.'],
    0, 'Está prohibido adelantar por la izquierda a un conductor que está adelantando a un vehículo que no sea una bici, un ciclomotor de dos ruedas o una moto de dos ruedas (art. 17.2 4°). La excepción exige tres carriles o más en mi sentido: aquí solo hay dos, y tendría que meterme en el del sentido contrario.', true),
    {
      type: 'road',
      layout: { lanes: [DOWN, UP, UP], lines: ['dashed', 'dashed'] },
      vehicles: [me({ lane: 1, y: 272, turn: 'overtake' }), v('A', { lane: 1, y: 168 }), v('C', { lane: 2, y: 150, kind: 'truck' })],
    }),
  { ...Q('z6-dep-02', 'depassement', 'z3-dep-complements',
    ['Je roule sous ce signal, hors agglomération, et je rattrape un cuistax (cycle à quatre roues) qui roule lentement. Que puis-je faire ?', 'Le dépasser, comme une bicyclette.', 'Le dépasser à 1,5 m au moins.', 'Rester derrière lui pour l\'instant.'],
    ['Circulo bajo esta señal, fuera de población, y alcanzo a un cuistax (ciclo de cuatro ruedas) que va despacio. ¿Qué puedo hacer?', 'Adelantarlo, como a una bicicleta.', 'Adelantarlo dejándole al menos 1,5 m.', 'Quedarme detrás de él por ahora.'],
    2, 'La señal prohíbe adelantar por la izquierda a un vehículo de tracción animal o a un vehículo de más de dos ruedas, desde la señal hasta el próximo cruce inclusive (art. 68, C35). Un cuistax es un ciclo (art. 2.15.1), pero tiene cuatro ruedas: no se le puede adelantar. Solo se libran los de dos ruedas (bicis, ciclomotores y motos).', true), signs: ['C35'] },

  /* ============ MANŒUVRES ============ */
  QS(Q('z6-man-01', 'manoeuvres', 'x4-man-manoeuvres',
    ['Circulation fortement ralentie. Les bandes de gauche et de droite se terminent ; je suis sur celle du milieu, juste devant le rétrécissement. Qui dois-je laisser s\'intercaler en premier ?', 'A, sur la bande de gauche.', 'B, sur la bande de droite.', 'Aucun, je passe avant eux.'],
    ['Tráfico muy ralentizado. Los carriles de la izquierda y de la derecha terminan; estoy en el del centro, justo antes del estrechamiento. ¿A quién debo dejar incorporarse primero?', 'A A, en el carril de la izquierda.', 'A B, en el carril de la derecha.', 'A ninguno, paso antes que ellos.'],
    1, 'Con tráfico muy ralentizado se aplica la «tirette»: los del carril libre ceden por turnos el paso a quien se incorpora justo antes del estrechamiento. Si terminan a la vez el carril de la izquierda y el de la derecha, se cede primero al conductor del carril de la derecha y después al del carril de la izquierda (art. 12bis).'),
    {
      type: 'road',
      layout: { lanes: [{ dir: 'up', end: 110 }, UP, { dir: 'up', end: 110 }] },
      vehicles: [me({ lane: 1, y: 196, turn: 'none' }), v('A', { lane: 0, y: 200, turn: 'lane-right' }), v('B', { lane: 2, y: 200, turn: 'lane-left' }), v('C', { lane: 1, y: 262, turn: 'none' }), v('D', { lane: 0, y: 270, turn: 'none' })],
      caption: 'circulation fortement ralentie',
    }),
  QS(Q('z6-man-02', 'manoeuvres', 'man-bandes',
    ['En agglomération, sur une chaussée à sens unique divisée en deux bandes, je vais tout droit. Puis-je rouler sur la bande de gauche ?', 'Oui.', 'Non.'],
    ['En población, en una calzada de sentido único dividida en dos carriles, sigo recto. ¿Puedo circular por el carril de la izquierda?', 'Sí.', 'No.'],
    0, 'En población, en las calzadas de sentido único divididas en carriles, cada uno puede usar el carril que mejor convenga a su destino (art. 9.4 1°): no hay obligación de ir por el de la derecha si sigo recto.'),
    { type: 'road', layout: { lanes: [SW, UP, UP, SW], crossStreet: { y: 60 } }, vehicles: [me({ lane: 1, y: 250 })], caption: 'sens unique, en agglomération' }),
  Q('z6-man-03', 'manoeuvres', 'man-bandes',
    ['Hors agglomération, sur une route à sens unique à deux bandes, la circulation est fluide et je ne dépasse personne. Puis-je rester sur la bande de gauche ?', 'Oui.', 'Non.'],
    ['Fuera de población, en una carretera de sentido único con dos carriles, el tráfico es fluido y no adelanto a nadie. ¿Puedo seguir en el carril de la izquierda?', 'Sí.', 'No.'],
    1, 'Fuera de población hay que circular lo más cerca posible del borde derecho (art. 9.3.1). La libre elección del carril (art. 9.4) solo vale en población, y la circulación en filas (art. 9.5) solo cuando la densidad del tráfico lo justifica. Termino de adelantar y vuelvo a la derecha (art. 16.6).'),

  /* ============ AUTOROUTE ============ */
  QS(Q('z6-aut-01', 'autoroute', 'x4-sig-marques',
    ['Je voulais prendre la sortie, mais la ligne qui me sépare de la bande de décélération est déjà devenue continue. Puis-je encore la franchir ?', 'Oui.', 'Non.'],
    ['Quería tomar la salida, pero la línea que me separa del carril de deceleración ya se ha vuelto continua. ¿Puedo cruzarla todavía?', 'Sí.', 'No.'],
    1, 'Una línea continua no se cruza nunca (art. 72.2); la discontinua del principio del carril de deceleración sí permite cambiar de carril (art. 72.3). Si he llegado tarde, sigo hasta la salida siguiente: en autopista también están prohibidos la marcha atrás y el media vuelta (art. 21.4).'),
    {
      type: 'road',
      layout: { lanes: [UP, UP, UP], lines: ['dashed', ['wide-dashed', 170, 'solid']] },
      marks: [{ t: 'text', x: 200, y: 40, text: 'sortie' }],
      vehicles: [me({ lane: 1, y: 140, turn: 'lane-right' }), v('A', { lane: 0, y: 230, turn: 'none' })],
      caption: 'autoroute',
    }),

  /* ============ SIGNAUX, FEUX, MARQUES ============ */
  QS(Q('z6-sig-01', 'signaux', 'x4-sig-feux-agents',
    ['Le feu est vert, et un panneau « stop » est placé sur le même accès. Puis-je passer sans marquer l\'arrêt ?', 'Oui.', 'Non.'],
    ['El semáforo está en verde y hay una señal de «stop» en el mismo acceso. ¿Puedo pasar sin detenerme?', 'Sí.', 'No.'],
    0, 'Cuando el semáforo funciona, las señales de prioridad colocadas en la misma vía quedan sin efecto (art. 6.3): el verde me autoriza a pasar (art. 61.1 3°). El «stop» vuelve a valer si el semáforo se apaga o pasa a ámbar intermitente.'),
    { type: 'cross', signs: { S: 'light-green', E: 'light-red', W: 'light-red' }, marks: [{ t: 'sign', x: 248, y: 218, sign: 'B5' }], vehicles: [meAt('S')] }),
  Q('z6-sig-02', 'signaux', 'sig-feux',
    ['Au carrefour, une flèche rouge pointée vers la gauche est allumée. Je vais tout droit. Cette flèche m\'interdit-elle de passer ?', 'Oui.', 'Non.'],
    ['En el cruce está encendida una flecha roja que apunta a la izquierda. Sigo recto. ¿Me prohíbe pasar esta flecha?', 'Sí.', 'No.'],
    1, 'Las flechas rojas, ámbar o verdes tienen el mismo significado que los semáforos redondos, pero la prohibición o la autorización se limita a las direcciones que indican (art. 61.1 4°). La flecha roja a la izquierda solo prohíbe girar a la izquierda; para seguir recto miro el semáforo de mi dirección.'),
  Q('z6-sig-03', 'signaux', 'sig-marquages',
    ['Avant un carrefour, un îlot directionnel est marqué au sol par des lignes blanches obliques, devant moi. Je vais tout droit. Comment dois-je passer ?', 'En le laissant à ma droite.', 'En le laissant à ma gauche.', 'En roulant dessus, au ralenti.'],
    ['Antes de un cruce, delante de mí, hay una isleta direccional marcada en el suelo con líneas blancas oblicuas. Sigo recto. ¿Cómo debo pasar?', 'Dejándola a mi derecha.', 'Dejándola a mi izquierda.', 'Pasando por encima, despacio.'],
    1, 'Hay que dejar a la izquierda los dispositivos que canalizan el tráfico, como las isletas direccionales, salvo reglamentación local (art. 9.6); es decir, se pasa por su derecha. Por las líneas oblicuas que marcan una isleta o una zona de «évitement» no se puede circular, ni parar, ni estacionar (art. 77.4).'),

  /* ============ COMPORTEMENT ============ */
  Q('z6-com-01', 'comportement', 'com-perception',
    ['Une voiture est stationnée à droite, ses roues avant braquées vers la chaussée, et quelqu\'un est au volant. Que dois-je faire ?', 'Ralentir et m\'écarter si je peux.', 'Garder ma vitesse, j\'ai la priorité.', 'Klaxonner longuement en passant.'],
    ['Un coche está estacionado a la derecha, con las ruedas delanteras giradas hacia la calzada, y hay alguien al volante. ¿Qué debo hacer?', 'Reducir y apartarme si puedo.', 'Mantener mi velocidad, tengo prioridad.', 'Tocar el claxon largo al pasar.'],
    0, 'Las ruedas giradas y alguien al volante anuncian que puede arrancar. Quien sale de un estacionamiento debe cederme el paso (art. 12.4), pero yo debo adaptar la velocidad a la presencia de otros usuarios y poder detenerme ante un obstáculo previsible (art. 10.1 1° y 3°). En población, el claxon solo sirve para evitar un accidente (art. 33.2).'),
]
