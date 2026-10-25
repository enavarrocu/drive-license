import type { Sign, SignCategory } from '../types'
import { shapes as S_, P, T, g, svg, arrowPanel, SLASH, RED, BLUE, BLK, WHT, GRY } from './signPictos'
import { signImages } from './signImages'

/**
 * Catálogo de señales belgas (familias A, B, C, D, E, F + placas M).
 * Dibujos esquemáticos propios en SVG inline.
 */
export interface SignWithSvg extends Sign {
  /** Dibujo esquemático propio (siempre disponible). */
  svg: string
  /** Imagen oficial (SPW Wallonie), si existe: se prefiere al dibujo. */
  img?: string
}

const tri = (i = '') => svg(S_.triangle(i))
const triDown = (i = '') => svg(S_.triangleDown(i))
const cRed = (i = '') => svg(S_.circleRed(i))
const cEnd = (i = '') => svg(S_.circleEnd(i))
const cBlue = (i = '') => svg(S_.circleBlue(i))
const cPark = (i = '') => svg(S_.circlePark(i))
const rBlue = (i = '') => svg(S_.rectBlue(i))
const rWhite = (i = '') => svg(S_.rectWhite(i))
const rEnd = (i = '') => svg(S_.rectEnd(i))
const rBlueEnd = (i = '') => svg(S_.rectBlueEnd(i))
const sq = (i = '') => svg(S_.squareBlue(i))
const tall = (i = '') => svg(S_.tallBlue(i))

/** Placa adicional debajo (texto pequeño) */
const sub = (txt: string) => `<rect x="14" y="84" width="72" height="13" fill="${WHT}" stroke="#333" stroke-width="1.5"/>${T(txt, 94, 9, BLK)}`

function S(code: string, category: SignCategory, fr: string, es: string, meaning: string, image: string): SignWithSvg {
  return { code, category, name: { fr, es }, meaning, svg: image, img: signImages.get(code) }
}

export const signs: SignWithSvg[] = [
  /* ================= A — DANGER ================= */
  S('A1a', 'danger', 'Virage dangereux à gauche', 'Curva peligrosa a la izquierda', 'Reduce antes de la curva, nunca dentro; no adelantar fuera de población si la visibilidad es insuficiente.', tri(P.curveLeft())),
  S('A1b', 'danger', 'Virage dangereux à droite', 'Curva peligrosa a la derecha', 'Igual que A1a, hacia la derecha. Mantente a la derecha: el tráfico de frente puede cerrar la curva.', tri(P.curveRight())),
  S('A1c', 'danger', 'Double virage, le premier à gauche', 'Doble curva, la primera a la izquierda', 'Sucesión de curvas; una placa puede indicar la longitud del tramo.', tri(P.doubleCurve())),
  S('A3', 'danger', 'Descente dangereuse', 'Bajada peligrosa', 'Pendiente fuerte en bajada: usa el freno motor (marcha corta) para no sobrecalentar los frenos.', tri(P.hillDown())),
  S('A5', 'danger', 'Montée à forte inclinaison', 'Subida pronunciada', 'Pendiente fuerte en subida: marcha adecuada, cuidado con los vehículos lentos y con la poca visibilidad cerca de la cima.', tri(P.hillUp())),
  S('A7a', 'danger', 'Rétrécissement de la chaussée', 'Estrechamiento de la calzada', 'La calzada se estrecha por los dos lados; aplica la cremallera si un carril desaparece.', tri(P.roadNarrow())),
  S('A7b', 'danger', 'Rétrécissement par la gauche', 'Estrechamiento por la izquierda', 'La calzada se estrecha por el lado izquierdo (se desplaza la línea izquierda).', tri(P.roadNarrowLeft())),
  S('A7c', 'danger', 'Rétrécissement par la droite', 'Estrechamiento por la derecha', 'La calzada se estrecha por el lado derecho (se desplaza la línea derecha); si un carril desaparece, cremallera.', tri(P.roadNarrowRight())),
  S('A9', 'danger', 'Pont mobile', 'Puente móvil', 'Puente que puede abrirse: prepárate a parar; respeta las barreras y luces.', tri(P.bridgeOpen())),
  S('A11', 'danger', 'Débouché sur un quai ou une berge', 'Salida a un muelle o ribera', 'La vía desemboca en el agua: prudencia máxima, sobre todo de noche o con niebla.', tri(P.quay())),
  S('A13', 'danger', 'Cassis ou dos d\'âne', 'Bache o badén', 'Irregularidad del firme: reduce.', tri(P.bump())),
  S('A14', 'danger', 'Dispositif(s) surélevé(s)', 'Resalto(s) / lomo(s)', 'Lomo o plataforma elevada: pasa a 30 km/h máximo; prohibido parar o estacionar encima.', tri(P.raised())),
  S('A15', 'danger', 'Chaussée glissante', 'Calzada resbaladiza', 'Riesgo de derrape (lluvia, hielo, barro, gravilla): reduce, sin maniobras bruscas, más distancia.', tri(P.slippery())),
  S('A17', 'danger', 'Projection de gravillons', 'Proyección de gravilla', 'Gravilla suelta: reduce y aumenta la distancia para no romper cristales ni derrapar.', tri(P.gravel())),
  S('A19', 'danger', 'Chutes de pierres', 'Desprendimientos', 'Piedras en la calzada posibles; no te detengas en el tramo.', tri(P.rocks())),
  S('A21', 'danger', 'Passage pour piétons', 'Paso de peatones', 'Anuncia un paso de peatones: reduce y prepárate a ceder.', tri(P.walker())),
  S('A23', 'danger', 'Endroit fréquenté par des enfants', 'Lugar frecuentado por niños', 'Escuela, parque: niños imprevisibles. A menudo con zona 30 («abords d\'école»).', tri(P.children())),
  S('A25', 'danger', 'Passage pour cyclistes et cyclomoteurs', 'Cruce de ciclistas y ciclomotores', 'Ciclistas que entran o cruzan la calzada: mira a ambos lados.', tri(P.bike())),
  S('A27', 'danger', 'Traversée de gros gibier', 'Paso de animales salvajes', 'Ciervos, jabalíes: sobre todo al amanecer y anochecer; frena en línea recta, no des volantazos.', tri(P.deer())),
  S('A29', 'danger', 'Traversée de bétail', 'Paso de ganado', 'Vacas, ovejas: pueden ocupar la calzada.', tri(P.cow())),
  S('A31', 'danger', 'Travaux', 'Obras', 'Obras: reduce, respeta a los operarios, las señales y marcas provisionales (naranjas) y la cremallera.', tri(P.works())),
  S('A33', 'danger', 'Signaux lumineux de circulation', 'Semáforos', 'Anuncia un semáforo (poco visible o nuevo).', tri(P.trafficLight())),
  S('A35', 'danger', 'Survol d\'avions à basse altitude', 'Aviones a baja altura', 'Cerca de un aeropuerto: el ruido o la sombra puede sorprender; no te distraigas.', tri(P.plane())),
  S('A37', 'danger', 'Vent latéral', 'Viento lateral', 'Manga de viento: sujeta el volante, cuidado al adelantar camiones y al salir de zonas protegidas.', tri(P.wind())),
  S('A39', 'danger', 'Circulation dans les deux sens', 'Circulación en ambos sentidos', 'Tras un tramo de sentido único vuelve la circulación en ambos sentidos: llega tráfico de frente, mantente a la derecha (art. 66.4).', tri(P.twoWay())),
  S('A41', 'danger', 'Passage à niveau avec barrières', 'Paso a nivel con barreras', 'Valla: paso a nivel con barreras, a unos 150 m (balizas de 3, 2 y 1 barras). Nunca entres si no puedes salir.', tri(P.barrierGate())),
  S('A43', 'danger', 'Passage à niveau sans barrières', 'Paso a nivel sin barreras', 'Locomotora: paso a nivel sin barreras (puede tener luces). Si no tiene luces, prohibido adelantar en él; para si hay luz roja o viene un tren.', tri(P.train())),
  S('A45', 'danger', 'Croix de Saint-André (voie unique)', 'Cruz de San Andrés (una vía)', 'Justo en el paso a nivel de una sola vía. Detente si viene un tren o hay señal.', rWhite(P.crossSaintAndre())),
  S('A47', 'danger', 'Croix de Saint-André (plusieurs voies)', 'Cruz de San Andrés (varias vías)', 'Paso a nivel con varias vías (cruz doble). Un tren puede ocultar otro.', rWhite(`<path d="M15 20 L85 70 M85 20 L15 70 M15 34 L85 84 M85 34 L15 84" stroke="${RED}" stroke-width="8"/>`)),
  S('A49', 'danger', 'Croisement de voies ferrées sur la chaussée', 'Cruce con raíles de tranvía', 'Raíles de tranvía en la calzada: el tranvía tiene prioridad; cuidado con las ruedas de bici en los raíles.', tri(P.tram())),
  S('A50', 'danger', 'Formation de file', 'Formación de retenciones', 'Riesgo de atasco: reduce, luces de emergencia si frenas en cola.', tri(P.queue())),
  S('A51', 'danger', 'Danger non défini', 'Peligro no definido', 'Signo de exclamación: una placa adicional precisa el peligro.', tri(P.exclaim())),

  /* ================= B — PRIORITÉ ================= */
  S('B1', 'priorite', 'Céder le passage', 'Ceder el paso', 'Triángulo invertido. Cedes el paso en el próximo cruce, sin obligación de parar si está libre. Marca en el suelo: triángulos blancos.', triDown()),
  S('B3', 'priorite', 'Annonce de B1', 'Anuncio de ceder el paso', 'B1 con placa de distancia (p. ej. 150 m): dentro de esa distancia tendrás que ceder.', triDown(sub('150 m'))),
  S('B5', 'priorite', 'Arrêt obligatoire (STOP)', 'Parada obligatoria (STOP)', 'Parar completamente en la línea de detención (o antes del cruce) y ceder el paso, aunque no venga nadie.', svg(S_.octagon(T('STOP', 60, 26, WHT)))),
  S('B7', 'priorite', 'Annonce de B5', 'Anuncio de STOP', 'Triángulo invertido con la mención STOP y la distancia.', triDown(T('STOP', 48, 16) + sub('150 m'))),
  S('B9', 'priorite', 'Voie prioritaire', 'Vía con prioridad', 'Rombo amarillo. Tienes prioridad en todos los cruces hasta B11.', svg(S_.diamond(''))),
  S('B11', 'priorite', 'Fin de voie prioritaire', 'Fin de vía con prioridad', 'Rombo con barra negra: vuelve a aplicarse la prioridad de la derecha.', svg(S_.diamond(`<line x1="22" y1="78" x2="78" y2="22" stroke="${BLK}" stroke-width="7"/>`))),
  S('B13', 'priorite', 'Annonce de fin de voie prioritaire', 'Anuncio de fin de vía con prioridad', 'B11 con placa de distancia.', svg(S_.diamond(`<line x1="22" y1="78" x2="78" y2="22" stroke="${BLK}" stroke-width="7"/>`) + sub('200 m'))),
  S('B15', 'priorite', 'Priorité au prochain carrefour', 'Prioridad en el próximo cruce', 'Flecha gruesa vertical (la fina indica la vía secundaria): prioridad solo en el cruce siguiente. Variantes B15a–g según la forma del cruce.', tri(`<rect x="45" y="30" width="10" height="46" fill="${BLK}"/><rect x="30" y="52" width="40" height="7" fill="${GRY}"/>`)),
  S('B17', 'priorite', 'Priorité de droite', 'Prioridad de la derecha', 'Triángulo con una cruz negra en X: en el próximo cruce se aplica la prioridad de la derecha.', tri(`<path d="M34 42 L66 76 M66 42 L34 76" stroke="${BLK}" stroke-width="10"/>`)),
  S('B19', 'priorite', 'Passage étroit : céder le passage', 'Paso estrecho: ceder el paso', 'Flecha negra hacia abajo (los que vienen de frente) y flecha roja hacia arriba (tú): cedes el paso en el paso estrecho.', cRed(`<path d="M34 22 h8 v38 h9 l-13 18 l-13 -18 h9z" fill="${BLK}"/><path d="M58 78 h8 v-38 h9 l-13 -18 l-13 18 h9z" fill="${RED}"/>`)),
  S('B21', 'priorite', 'Passage étroit : priorité', 'Paso estrecho: prioridad', 'Azul: flecha roja hacia abajo (los que vienen de frente) y flecha blanca hacia arriba (tú): tienes prioridad en el paso estrecho.', rBlue(`<path d="M34 22 h8 v38 h9 l-13 18 l-13 -18 h9z" fill="${RED}"/><path d="M58 78 h8 v-38 h9 l-13 -18 l-13 18 h9z" fill="${WHT}"/>`)),
  S('B22', 'priorite', 'Cyclistes : à droite au feu rouge', 'Ciclistas: a la derecha en rojo', 'Los ciclistas pueden girar a la derecha con el semáforo en rojo/ámbar cediendo el paso. No aplica a coches.', tri(`<path d="M44 74 v-24 h12 M56 50 l-6-6 M56 50 l-6 6" stroke="#e0a800" stroke-width="5" fill="none"/>${g(P.bike(), 'translate(0,8) scale(0.55) translate(40,10)')}`)),
  S('B23', 'priorite', 'Cyclistes : tout droit au feu rouge', 'Ciclistas: recto en rojo', 'Los ciclistas pueden seguir recto en rojo/ámbar cediendo el paso.', tri(`<path d="M50 72 v-26 M50 46 l-6 6 M50 46 l6 6" stroke="#e0a800" stroke-width="5" fill="none"/>${g(P.bike(), 'translate(0,8) scale(0.55) translate(40,10)')}`)),

  /* ================= C — INTERDICTION ================= */
  S('C1', 'interdiction', 'Sens interdit', 'Dirección prohibida', 'Disco rojo con barra blanca: no puedes entrar (la calle es de sentido único para ti). Con placa M2, los ciclistas sí (SUL).', svg(S_.circleRedFull(`<rect x="18" y="43" width="64" height="14" fill="${WHT}"/>`))),
  S('C3', 'interdiction', 'Accès interdit dans les deux sens', 'Acceso prohibido en ambos sentidos', 'Círculo rojo vacío: prohibido a todo conductor en los dos sentidos.', cRed()),
  S('C5', 'interdiction', 'Accès interdit aux véhicules à moteur à plus de deux roues', 'Prohibido a vehículos a motor de más de dos ruedas', 'Coche negro: prohibido a todos los vehículos a motor de más de dos ruedas (coches, camiones, autobuses, quads, tractores…) y a las motos con sidecar; motos de dos ruedas, ciclomotores de dos ruedas y bicis pueden pasar. Con la placa «Excepté 2+» o «3+», la calzada o el carril solo es accesible a los vehículos con al menos 2 o 3 ocupantes y al transporte público regular; los demás solo pueden entrar para acceder o salir, cambiar de dirección o llegar a una propiedad (art. 68.3).', cRed(P.car())),
  S('C6', 'interdiction', 'Accès interdit aux quads', 'Prohibido a quads', 'Prohibido a cuadriciclos.', cRed(`<rect x="30" y="52" width="40" height="14" rx="4" fill="${BLK}"/><circle cx="34" cy="70" r="6" fill="${BLK}"/><circle cx="66" cy="70" r="6" fill="${BLK}"/><path d="M50 52 v-10 h10" stroke="${BLK}" stroke-width="4" fill="none"/>`)),
  S('C7', 'interdiction', 'Accès interdit aux motocyclettes', 'Prohibido a motocicletas', 'Prohibido a motos.', cRed(P.moto())),
  S('C9', 'interdiction', 'Accès interdit aux cyclomoteurs', 'Prohibido a ciclomotores', 'Prohibido a ciclomotores (A y B).', cRed(P.moped())),
  S('C11', 'interdiction', 'Accès interdit aux cyclistes', 'Prohibido a ciclistas', 'Prohibido a bicicletas.', cRed(P.bike())),
  S('C13', 'interdiction', 'Accès interdit aux véhicules attelés', 'Prohibido a vehículos de tracción animal', 'Prohibido a carros tirados por animales.', cRed(P.horseCart())),
  S('C15', 'interdiction', 'Accès interdit aux cavaliers', 'Prohibido a jinetes', 'Prohibido a caballos montados.', cRed(P.rider())),
  S('C17', 'interdiction', 'Accès interdit aux charrettes à bras', 'Prohibido a carretillas', 'Prohibido a carros empujados a mano.', cRed(P.cart())),
  S('C19', 'interdiction', 'Accès interdit aux piétons', 'Prohibido a peatones', 'Prohibido a peatones (p. ej. entrada de autopista).', cRed(P.walker())),
  S('C21', 'interdiction', 'Accès interdit au-delà d\'une masse', 'Prohibido por masa en carga', 'Prohibido a vehículos cuya masa en carga supere el valor (p. ej. 3,5 t).', cRed(T('3,5t', 60, 24))),
  S('C22', 'interdiction', 'Accès interdit aux autocars', 'Prohibido a autocares', 'Prohibido a autobuses/autocares.', cRed(P.bus())),
  S('C23', 'interdiction', 'Accès interdit aux véhicules de transport de marchandises', 'Prohibido a vehículos de mercancías', 'Prohibido a todos los vehículos (o conjuntos) a motor construidos para el transporte de mercancías, furgonetas incluidas, sea cual sea su masa; una placa puede limitarla a partir de cierto tonelaje (art. 68.3).', cRed(P.truck())),
  S('C24a', 'interdiction', 'Accès interdit aux marchandises dangereuses', 'Prohibido a mercancías peligrosas', 'Prohibido a vehículos con mercancías peligrosas (panel naranja); variantes b (inflamables/explosivas) y c (contaminantes del agua).', cRed(`<rect x="28" y="40" width="44" height="22" fill="#f28c28" stroke="${BLK}" stroke-width="3"/>${g(P.truck(), 'translate(0,18) scale(0.5) translate(50,40)')}`)),
  S('C25', 'interdiction', 'Longueur maximale', 'Longitud máxima', 'Prohibido a vehículos o conjuntos de longitud superior al valor.', cRed(`<rect x="26" y="46" width="48" height="12" fill="${BLK}"/>${T('10 m', 74, 14)}`)),
  S('C27', 'interdiction', 'Largeur maximale', 'Anchura máxima', 'Prohibido a vehículos más anchos que el valor (triángulos a los lados).', cRed(`<path d="M24 50 l8-6 v12z M76 50 l-8-6 v12z" fill="${BLK}"/>${T('2 m', 58, 20)}`)),
  S('C29', 'interdiction', 'Hauteur maximale', 'Altura máxima', 'Prohibido a vehículos más altos que el valor (triángulos arriba y abajo): túneles, puentes.', cRed(`<path d="M50 24 l-6 8 h12z M50 76 l-6-8 h12z" fill="${BLK}"/>${T('3,5 m', 58, 16)}`)),
  S('C31a', 'interdiction', 'Interdiction de tourner à gauche', 'Prohibido girar a la izquierda', 'Prohibido girar en esa dirección en el próximo cruce.', cRed(P.arrowTurnLeft(BLK) + SLASH)),
  S('C31b', 'interdiction', 'Interdiction de tourner à droite', 'Prohibido girar a la derecha', 'Prohibido girar a la derecha en el próximo cruce.', cRed(P.arrowTurnRight(BLK) + SLASH)),
  S('C33', 'interdiction', 'Interdiction de faire demi-tour', 'Prohibido cambiar de sentido', 'Prohibido el giro en U desde la señal hasta el próximo cruce inclusive.', cRed(P.arrowUTurn() + SLASH)),
  S('C35', 'interdiction', 'Interdiction de dépasser', 'Prohibido adelantar', 'Coche rojo a la izquierda: prohibido adelantar por la izquierda a vehículos de más de dos ruedas (y atelados), desde la señal hasta el próximo cruce inclusive, o hasta C37 si está antes.', cRed(g(P.car(RED), 'scale(0.62) translate(-8,32)') + g(P.car(BLK), 'scale(0.62) translate(52,32)'))),
  S('C37', 'interdiction', 'Fin d\'interdiction de dépasser', 'Fin de prohibición de adelantar', 'Misma señal en gris y tachada: se puede volver a adelantar.', cEnd(g(P.car(GRY), 'scale(0.62) translate(-8,32)') + g(P.car(GRY), 'scale(0.62) translate(52,32)'))),
  S('C39', 'interdiction', 'Interdiction de dépasser pour les plus de 3,5 t', 'Prohibido adelantar para los vehículos de mercancías de más de 3,5 t', 'Camión rojo: los vehículos de mercancías de más de 3,5 t (masa máxima autorizada) no pueden adelantar por la izquierda a vehículos de más de dos ruedas ni a vehículos de tracción animal, desde la señal hasta el próximo cruce inclusive, o hasta C41 si está antes.', cRed(g(P.truck(RED), 'scale(0.62) translate(-6,32)') + g(P.car(BLK), 'scale(0.62) translate(54,32)'))),
  S('C41', 'interdiction', 'Fin de C39', 'Fin de prohibición para camiones', 'Fin de la prohibición de adelantar para camiones.', cEnd(g(P.truck(GRY), 'scale(0.62) translate(-6,32)') + g(P.car(GRY), 'scale(0.62) translate(54,32)'))),
  S('C43', 'interdiction', 'Vitesse maximale autorisée', 'Velocidad máxima', 'No superar la velocidad indicada desde la señal hasta el próximo cruce inclusive, o hasta otra C43, C45 o una señal de inicio/fin de población o de zona.', cRed(T('50', 62, 36))),
  S('C45', 'interdiction', 'Fin de limitation de vitesse', 'Fin de limitación de velocidad', 'Vuelve el límite general del lugar (región, población...).', cEnd(T('50', 62, 36, GRY))),
  S('C46', 'interdiction', 'Fin de toutes les interdictions locales', 'Fin de todas las prohibiciones', 'Disco blanco con una sola barra negra en diagonal: terminan todas las prohibiciones locales impuestas a los vehículos en movimiento (velocidad, adelantamiento…) (art. 68.3).', cEnd()),
  S('C47', 'interdiction', 'Poste de péage', 'Peaje', 'Prohibido pasar sin detenerse (la inscripción puede ser «Taxes»).', cRed(`${T('PÉAGE', 56, 16)}<rect x="28" y="60" width="44" height="3" fill="${BLK}"/>`)),

  /* ================= D — OBLIGATION ================= */
  S('D1a', 'obligation', 'Direction obligatoire : tout droit', 'Dirección obligatoria: recto', 'Flecha blanca en azul: obligatorio seguir esa dirección. Variantes D1b–f: izquierda, derecha, giros.', cBlue(P.arrowUp())),
  S('D1c', 'obligation', 'Direction obligatoire : passer à gauche', 'Dirección obligatoria: pasar por la izquierda', 'Flecha oblicua hacia abajo a la izquierda: hay que pasar por la izquierda del obstáculo o de la isleta.', cBlue(`<path d="M70 22 l-40 40 l-8-8 v26 h26 l-8-8 l40-40z" fill="${WHT}"/>`)),
  S('D1d', 'obligation', 'Direction obligatoire : passer à droite', 'Dirección obligatoria: pasar por la derecha', 'Flecha oblicua hacia abajo a la derecha: hay que pasar por la derecha del obstáculo o de la isleta.', cBlue(`<path d="M30 22 l40 40 l8-8 v26 h-26 l8-8 l-40-40z" fill="${WHT}"/>`)),
  S('D1e', 'obligation', 'Direction obligatoire : à gauche', 'Dirección obligatoria: a la izquierda', 'Obligatorio girar a la izquierda en el próximo cruce.', cBlue(P.arrowTurnLeft())),
  S('D3a', 'obligation', 'Directions obligatoires : à gauche ou tout droit', 'Direcciones obligatorias: izquierda o recto', 'Hay que seguir una de las dos direcciones indicadas: girar a la izquierda o seguir recto.', cBlue(`<path d="M50 20 l12 16 h-7 v44 h-10 v-44 h-7z M42 52 h-14 v-8 l-16 12 l16 12 v-8 h14z" fill="${WHT}"/>`)),
  S('D3b', 'obligation', 'Directions obligatoires : tout droit ou à droite', 'Direcciones obligatorias: recto o derecha', 'Hay que seguir una de las dos direcciones indicadas: seguir recto o girar a la derecha.', cBlue(`<path d="M50 20 l12 16 h-7 v44 h-10 v-44 h-7z M58 52 h14 v-8 l16 12 l-16 12 v-8 h-14z" fill="${WHT}"/>`)),
  S('D5', 'obligation', 'Sens giratoire obligatoire', 'Rotonda', 'Rotonda: circula en el sentido de las flechas; con B1 en la entrada, prioridad a los del anillo.', cBlue(P.roundabout())),
  S('D7', 'obligation', 'Piste cyclable obligatoire', 'Carril bici obligatorio', 'Los ciclistas y los ciclomotores de dos ruedas clase A deben usar la pista. Los ciclomotores clase B (y speed pedelecs) deben usarla donde el límite supera 50 km/h y pueden usarla donde es de 50 km/h o menos (art. 9.1.2). La placa M6 obliga a los clase B a usarla y la M7 se lo prohíbe (art. 69.4). Los coches no pueden circular ni parar en ella.', cBlue(P.bike(WHT))),
  S('D9', 'obligation', 'Partie de la voie réservée aux piétons, cyclistes et cyclomoteurs A', 'Parte reservada a peatones, ciclistas y ciclomotores A', 'Vía separada (línea vertical) entre peatones y ciclos.', cBlue(`<line x1="50" y1="24" x2="50" y2="80" stroke="${WHT}" stroke-width="3"/>${g(P.walker(WHT), 'translate(-22,0) scale(0.6) translate(30,20)')}${g(P.bike(WHT), 'translate(22,0) scale(0.6) translate(30,20)')}`)),
  S('D10', 'obligation', 'Partie réservée aux piétons et cyclistes', 'Parte reservada a peatones y ciclistas', 'Compartida entre peatones y ciclistas (sin separación).', cBlue(`${g(P.walker(WHT), 'translate(-18,0) scale(0.6) translate(30,20)')}${g(P.bike(WHT), 'translate(18,0) scale(0.6) translate(30,20)')}`)),
  S('D11', 'obligation', 'Chemin obligatoire pour les piétons', 'Camino obligatorio para peatones', 'Peatones obligados a usar este camino.', cBlue(P.walker(WHT))),
  S('D13', 'obligation', 'Chemin obligatoire pour les cavaliers', 'Camino obligatorio para jinetes', 'Jinetes obligados a usar este camino.', cBlue(P.rider(WHT))),

  /* ================= E — ARRÊT ET STATIONNEMENT ================= */
  S('E1', 'stationnement', 'Stationnement interdit', 'Estacionamiento prohibido', 'Una barra: prohibido estacionar; la parada breve está permitida.', cPark(`<line x1="22" y1="22" x2="78" y2="78" stroke="${RED}" stroke-width="8"/>`)),
  S('E3', 'stationnement', 'Arrêt et stationnement interdits', 'Parada y estacionamiento prohibidos', 'Cruz: ni parar ni estacionar.', cPark(`<path d="M22 22 L78 78 M78 22 L22 78" stroke="${RED}" stroke-width="8"/>`)),
  S('E5', 'stationnement', 'Stationnement interdit du 1er au 15', 'Prohibido estacionar del 1 al 15', 'Alterno quincenal: de este lado de la calzada está prohibido estacionar del 1 al 15 del mes.', cPark(`<line x1="22" y1="22" x2="78" y2="78" stroke="${RED}" stroke-width="8"/>${T('1-15', 42, 16, WHT)}`)),
  S('E7', 'stationnement', 'Stationnement interdit du 16 à la fin du mois', 'Prohibido estacionar del 16 al final', 'Alterno quincenal: de este lado de la calzada está prohibido estacionar del 16 al final del mes.', cPark(`<line x1="22" y1="22" x2="78" y2="78" stroke="${RED}" stroke-width="8"/>${T('16-31', 42, 16, WHT)}`)),
  S('E9a', 'stationnement', 'Stationnement autorisé', 'Estacionamiento autorizado', 'P blanca sobre azul: se puede estacionar; las placas indican cómo y para quién (disco, PMR, horario).', tall(P.parkingPTall())),
  S('E9a-disque', 'stationnement', 'Stationnement avec disque (zone bleue)', 'Estacionamiento con disco (zona azul)', 'E9a con el disco: obligatorio colocar el disco horario; 2 h máx. salvo indicación, laborables 9–18 h.', tall(P.parkingPTall() + g(P.parkingDisc(), 'translate(47 62)'))),
  S('E9a-pmr', 'stationnement', 'Stationnement réservé aux PMR', 'Reservado a personas con movilidad reducida', 'Solo para vehículos de personas con discapacidad, con la tarjeta especial visible.', tall(P.parkingPTall() + g(P.wheelchair(), 'translate(42 58) scale(0.4)'))),
  S('E9b', 'stationnement', 'Stationnement réservé aux voitures', 'Reservado a coches', 'Solo motos, coches, coches mixtos y minibuses.', sq(T('P', 56, 40, WHT) + g(P.car(WHT), 'translate(0,24) scale(0.5) translate(50,40)'))),
  S('E9c', 'stationnement', 'Stationnement réservé aux camionnettes et camions', 'Reservado a camiones y furgonetas', 'Solo camionetas y camiones.', sq(T('P', 56, 40, WHT) + g(P.truck(WHT), 'translate(0,24) scale(0.5) translate(50,40)'))),
  S('E9d', 'stationnement', 'Stationnement réservé aux autocars', 'Reservado a autocares', 'Solo autobuses y autocares.', sq(T('P', 56, 40, WHT) + g(P.bus(WHT), 'translate(0,24) scale(0.5) translate(50,40)'))),
  S('E9e', 'stationnement', 'Stationnement obligatoire sur l\'accotement ou le trottoir', 'Estacionar sobre el arcén o la acera', 'El pictograma muestra el coche entero sobre la acera: obligatorio estacionar así.', sq(T('P', 50, 34, WHT) + `<rect x="20" y="72" width="60" height="6" fill="${WHT}"/>` + g(P.car(WHT), 'translate(0,14) scale(0.45) translate(55,50)'))),
  S('E9f', 'stationnement', 'Stationnement en partie sur le trottoir', 'Estacionar parcialmente sobre la acera', 'Coche a medias sobre el bordillo: obligatorio estacionar así.', sq(T('P', 50, 34, WHT) + `<rect x="20" y="72" width="34" height="6" fill="${WHT}"/>` + g(P.car(WHT), 'translate(0,14) scale(0.45) translate(55,50)'))),
  S('E9g', 'stationnement', 'Stationnement sur la chaussée', 'Estacionar en la calzada', 'Obligatorio estacionar en la calzada (no en la acera).', sq(T('P', 50, 34, WHT) + `<rect x="20" y="72" width="20" height="6" fill="${WHT}"/>` + g(P.car(WHT), 'translate(0,14) scale(0.45) translate(55,50)'))),
  S('E9h', 'stationnement', 'Stationnement réservé aux camping-cars', 'Reservado a autocaravanas', 'Solo autocaravanas.', sq(T('P', 56, 40, WHT) + `<path d="M26 78 v-14 h14 v-6 h30 v20z" fill="${WHT}"/>`)),
  S('E9i', 'stationnement', 'Stationnement réservé aux motos', 'Reservado a motos', 'Solo motocicletas.', sq(T('P', 56, 40, WHT) + g(P.moto(WHT), 'translate(0,24) scale(0.5) translate(50,40)'))),
  S('E9j', 'stationnement', 'Stationnement alterné selon le type de véhicule', 'Estacionamiento alternado según tipo de vehículo', 'La misma plaza se reserva a distintos tipos de vehículo según la franja horaria indicada (p. ej. bicis de 7:30 a 18:00, coches de 18:00 a 7:30).', sq(T('P', 50, 34, WHT) + g(P.car(WHT), 'translate(0,20) scale(0.4) translate(40,60)') + g(P.bike(WHT), 'translate(0,20) scale(0.4) translate(140,60)'))),
  S('E11', 'stationnement', 'Stationnement alterné semi-mensuel (agglomération)', 'Alterno quincenal en toda la población', 'Encima del cartel de entrada de la población: en todas sus calzadas se estaciona del 1 al 15 del lado de los números impares y del 16 al final del lado de los pares.', rWhite(`<circle cx="32" cy="50" r="18" fill="${BLUE}" stroke="${RED}" stroke-width="4"/><line x1="22" y1="40" x2="42" y2="60" stroke="${RED}" stroke-width="4"/>${T('1-15', 54, 8, WHT, 32)}<circle cx="68" cy="50" r="18" fill="${BLUE}" stroke="${RED}" stroke-width="4"/><line x1="58" y1="40" x2="78" y2="60" stroke="${RED}" stroke-width="4"/>${T('16-31', 54, 8, WHT, 68)}`)),

  /* ================= F — INDICATION ================= */
  S('F1', 'indication', 'Début d\'agglomération', 'Inicio de población', 'Modelo F1a (nombre de la localidad y silueta; F1b = solo la silueta; «F1» era el modelo antiguo): desde aquí 50 km/h (30 en Bruselas) salvo señal, y las reglas de población (art. 71.2).', rWhite(`<rect x="14" y="26" width="72" height="48" fill="${WHT}" stroke="${BLK}" stroke-width="3"/>${T('Ixelles', 56, 15)}`)),
  S('F3', 'indication', 'Fin d\'agglomération', 'Fin de población', 'Modelo F3a (cartel de población tachado en rojo; F3b = solo la silueta tachada; «F3» era el modelo antiguo): vuelve el límite de fuera de población (90 Valonia / 70 Flandes / 70 Bruselas).', rWhite(`<rect x="14" y="26" width="72" height="48" fill="${WHT}" stroke="${BLK}" stroke-width="3"/>${T('Ixelles', 56, 15)}<line x1="14" y1="74" x2="86" y2="26" stroke="${RED}" stroke-width="6"/>`)),
  S('F4a', 'indication', 'Zone 30', 'Zona 30', 'Todo el sector a 30 km/h hasta F4b.', rWhite(`<circle cx="50" cy="50" r="30" fill="${WHT}" stroke="${RED}" stroke-width="7"/>${T('30', 60, 26)}`)),
  S('F4b', 'indication', 'Fin de zone 30', 'Fin de zona 30', 'Fin del sector a 30: vuelve el límite general.', rEnd(`<circle cx="50" cy="50" r="30" fill="${WHT}" stroke="${GRY}" stroke-width="5"/>${T('30', 60, 26, GRY)}`)),
  S('F5', 'indication', 'Autoroute', 'Autopista', 'Inicio de autopista: mín. 70, máx. 120 km/h; prohibido parar, marcha atrás, giro en U, peatones, bicis, ciclomotores.', rBlue(`<path d="M30 80 l8-56 h6 l-4 56z M62 80 l-4-56 h6 l8 56z" fill="${WHT}"/><rect x="30" y="34" width="40" height="6" fill="${WHT}"/><rect x="26" y="48" width="48" height="6" fill="${WHT}"/>`)),
  S('F7', 'indication', 'Fin d\'autoroute', 'Fin de autopista', 'Fin de las reglas de autopista.', rBlueEnd(`<path d="M30 80 l8-56 h6 l-4 56z M62 80 l-4-56 h6 l8 56z" fill="${WHT}"/><rect x="30" y="34" width="40" height="6" fill="${WHT}"/><rect x="26" y="48" width="48" height="6" fill="${WHT}"/>`)),
  S('F8', 'indication', 'Tunnel', 'Túnel', 'Entrada a un túnel: luces de cruce, distancia, prohibido parar, dar marcha atrás o cambiar de sentido.', rBlue(P.tunnel())),
  S('F9', 'indication', 'Route pour automobiles', 'Vía para automóviles', 'Reglas parecidas a la autopista (sin peatones, ciclistas, ciclomotores, tractores), límite según la región, sin velocidad mínima.', rBlue(P.carFront(WHT))),
  S('F11', 'indication', 'Fin de route pour automobiles', 'Fin de vía para automóviles', 'Fin de las reglas de la vía para automóviles.', rBlueEnd(P.carFront(WHT))),
  S('F12a', 'indication', 'Zone résidentielle / de rencontre', 'Zona residencial / de encuentro', '20 km/h, peatones en toda la calzada, juegos permitidos, estacionamiento solo en plazas marcadas.', rBlue(`<path d="M18 46 l32-24 32 24 v34 h-64z" fill="${WHT}"/>` + g(P.walker(BLUE), 'scale(0.55) translate(18,46)') + g(P.car(BLUE), 'scale(0.5) translate(62,56)'))),
  S('F12b', 'indication', 'Fin de zone résidentielle', 'Fin de zona residencial', 'Fin de la zona: vuelven las reglas normales.', rBlueEnd(P.house())),
  S('F13', 'indication', 'Flèches de sélection', 'Flechas de selección', 'Anuncia las direcciones de cada carril en el próximo cruce: elige el carril a tiempo.', rBlue(`<path d="M30 80 v-36 l-8 8 M30 44 l8 8 M50 80 v-40 l-6 8 M50 40 l6 8 M70 80 v-36 l8 8 M70 44 l-8 8" stroke="${WHT}" stroke-width="5" fill="none"/>`)),
  S('F14', 'indication', 'Zone avancée pour cyclistes', 'Zona adelantada para ciclistas', 'Espacio ante el semáforo reservado a bicis y ciclomotores: los coches paran en la primera línea, detrás.', rBlue(`<rect x="18" y="24" width="64" height="26" fill="${WHT}"/>${g(P.bike(BLUE), 'scale(0.42) translate(70,22)')}<rect x="18" y="54" width="64" height="3" fill="${WHT}"/>${g(P.car(WHT), 'scale(0.5) translate(50,66)')}`)),
  S('F17', 'indication', 'Bande bus', 'Carril bus', 'Carril reservado a autobuses (y a los usuarios de la placa: taxi, bici...). Los demás solo pueden entrar para girar justo antes de un cruce, esquivar un obstáculo o cruzarlo.', rBlue(`<path d="M34 24 v52 M66 24 v52" stroke="${WHT}" stroke-width="4" stroke-dasharray="10 6"/>${g(P.bus(WHT), 'translate(-18,10) scale(0.5) translate(50,40)')}${T('BUS', 90, 12, WHT)}`)),
  S('F18', 'indication', 'Site spécial franchissable', 'Plataforma reservada (bus/tram)', 'Reservado a transporte público; se puede cruzar pero no circular por él.', rBlue(`<path d="M34 24 v52 M66 24 v52" stroke="${WHT}" stroke-width="4" stroke-dasharray="10 6"/>${g(P.tram(WHT), 'translate(0,6) scale(0.55) translate(40,30)')}`)),
  S('F19', 'indication', 'Voie à sens unique', 'Vía de sentido único', 'Flecha blanca sobre azul: sentido único; con placa M4 los ciclistas van a contramano (SUL).', rBlue(`<path d="M14 42 h52 v-12 l22 20 l-22 20 v-12 h-52z" fill="${WHT}"/>`)),
  S('F21', 'indication', 'Passage autorisé à droite ou à gauche', 'Paso permitido por la derecha o por la izquierda', 'Se puede pasar por cualquiera de los dos lados del obstáculo.', rBlue(`<path d="M50 24 v24 l-22 22 l6 6 l22-22 l22 22 l6-6 l-22-22 v-24z" fill="${WHT}"/>`)),
  S('F23a', 'indication', 'Numéro de route', 'Número de carretera', 'Número de una carretera ordinaria (N). Variantes: F23b autopista (A), F23c ruta europea (E), F23d ring (R).', rWhite(`<rect x="18" y="38" width="64" height="24" fill="${WHT}" stroke="${BLK}" stroke-width="3"/>${T('N 5', 56, 16)}`)),
  S('F25', 'indication', 'Signal de préavis', 'Señal de preaviso', 'Anuncia las direcciones antes de un cruce; en autopista, fondo azul (F27).', rWhite(`<path d="M50 80 v-50 M50 50 h22 M50 50 h-22 v-14" stroke="${BLK}" stroke-width="5" fill="none"/>${T('Liège', 26, 10, BLK, 70)}${T('Mons', 26, 10, BLK, 28)}`)),
  S('F29', 'indication', 'Signal de direction', 'Señal de dirección', 'Flecha con destino; puede indicar la distancia en km. El itinerario por autopista es F31.', rWhite(arrowPanel('Namur', WHT, BLK, BLK))),
  S('F31', 'indication', 'Direction par autoroute', 'Dirección por autopista', 'El símbolo de autopista indica que el destino se alcanza por autopista.', rBlue(arrowPanel('Gent', BLUE, WHT, WHT))),
  S('F33a', 'indication', 'Direction à distance', 'Dirección a lugares concretos', 'Dirección de un aeropuerto, hospital, zona industrial, barrio…; puede indicar la distancia en km.', rWhite(`${T('Leuven 24', 44, 12)}${T('Liège 92', 64, 12)}`)),
  S('F35', 'indication', 'Direction vers un site touristique', 'Dirección turística', 'Fondo marrón: monumentos, lugares de interés.', svg(`<rect x="6" y="6" width="88" height="88" rx="6" fill="#8a5a2b" stroke="${WHT}" stroke-width="3"/>${arrowPanel('Château', '#8a5a2b', WHT, WHT)}`)),
  S('F39', 'indication', 'Préavis de déviation', 'Preaviso de desvío', 'Anuncia un desvío («déviation») por obras o cierre.', svg(`<rect x="6" y="6" width="88" height="88" rx="6" fill="#f0b400" stroke="${WHT}" stroke-width="3"/>${T('Déviation', 40, 12)}<path d="M30 54 h40 l-8-8 M70 54 l-8 8" stroke="${BLK}" stroke-width="5" fill="none"/>`)),
  S('F41', 'indication', 'Itinéraire de déviation', 'Itinerario de desvío', 'Sigue los carteles «Déviation» hasta volver a tu ruta.', svg(`<rect x="6" y="6" width="88" height="88" rx="6" fill="#f0b400" stroke="${WHT}" stroke-width="3"/>${arrowPanel('Déviation', '#f0b400', BLK, BLK)}`)),
  S('F43', 'indication', 'Signal de localité', 'Indicación de localidad', 'Nombre de un lugar (sin valor de agglomération: no cambia el límite).', rWhite(`<rect x="14" y="36" width="72" height="28" fill="${WHT}" stroke="${BLK}" stroke-width="2"/>${T('Boitsfort', 55, 13)}`)),
  S('F45', 'indication', 'Voie sans issue', 'Callejón sin salida', 'T roja sobre azul: sin salida para vehículos.', rBlue(`<rect x="44" y="30" width="12" height="52" fill="${WHT}"/><rect x="24" y="22" width="52" height="12" fill="${RED}"/>`)),
  S('F45b', 'indication', 'Voie sans issue sauf piétons et cyclistes', 'Sin salida excepto peatones y ciclistas', 'Sin salida para los vehículos, pero con paso para peatones y ciclistas (el dibujo muestra quién puede pasar).', rBlue(`<rect x="44" y="42" width="12" height="40" fill="${WHT}"/><rect x="24" y="34" width="52" height="10" fill="${RED}"/><rect x="44" y="18" width="12" height="10" fill="${WHT}"/>${g(P.walker(WHT), 'translate(-26,-30) scale(0.28) translate(40,10)')}${g(P.bike(WHT), 'translate(26,-30) scale(0.28) translate(40,10)')}`)),
  S('F47', 'indication', 'Fin des travaux', 'Fin de obras', 'Terminan las obras y las reglas temporales.', svg(`<rect x="6" y="6" width="88" height="88" rx="6" fill="#f0b400" stroke="${WHT}" stroke-width="3"/>${P.works()}<line x1="12" y1="88" x2="88" y2="12" stroke="${RED}" stroke-width="7"/>`)),
  S('F49', 'indication', 'Passage pour piétons', 'Paso de peatones', 'Señala el paso de peatones (azul): ceder al peatón que cruza o se dispone a cruzar.', rBlue(P.pedCross())),
  S('F50', 'indication', 'Passage pour cyclistes et cyclomoteurs', 'Paso de ciclistas', 'Paso de ciclistas (cuadrados blancos en el suelo): ceder a los que cruzan.', rBlue(`<rect x="22" y="70" width="56" height="8" fill="${WHT}"/>${g(P.bike(WHT), 'translate(0,-14) scale(0.7) translate(20,10)')}`)),
  S('F50bis', 'indication', 'Cyclistes suivant la même voie', 'Ciclistas que siguen la misma vía', 'Para quien cambia de dirección: ciclistas y ciclomotores de dos ruedas siguen la misma vía (p. ej. recto por su pista) y vas a cruzarlos. Con A21, peatones.', rBlue(`<path d="M50 24 l10 12 h-6 v40 h-8 v-40 h-6z" fill="${WHT}"/>${g(P.bike(WHT), 'translate(14,16) scale(0.45) translate(50,40)')}`)),
  S('F51a', 'indication', 'Passage souterrain pour piétons', 'Paso subterráneo para peatones', 'Peatones por el paso subterráneo.', rBlue(`<path d="M30 78 v-30 a20 20 0 0 1 40 0 v30" fill="none" stroke="${WHT}" stroke-width="5"/>${g(P.walker(WHT), 'translate(0,10) scale(0.5) translate(50,40)')}`)),
  S('F52', 'indication', 'Issue de secours (tunnel)', 'Salida de emergencia (túnel)', 'Pictograma verde: salida de emergencia más cercana en un túnel.', svg(S_.rectGreen(P.exitRun()))),
  S('F52bis', 'indication', 'Voie d\'évacuation', 'Vía de evacuación', 'Indica la distancia a las salidas de emergencia en los dos sentidos.', svg(S_.rectGreen(`${g(P.walker(WHT), 'scale(0.5) translate(50,30)')}${T('← 50 m   150 m →', 80, 9, WHT)}`))),
  S('F53', 'indication', 'Établissement sanitaire', 'Hospital', 'Hospital o clínica.', rBlue(P.hospital())),
  S('F55', 'indication', 'Poste de secours', 'Puesto de socorro', 'Puesto de primeros auxilios.', rBlue(`<rect x="24" y="30" width="52" height="40" fill="${WHT}"/><path d="M50 36 v28 M36 50 h28" stroke="${RED}" stroke-width="7"/>`)),
  S('F56', 'indication', 'Extincteur', 'Extintor', 'Extintor (túneles).', svg(S_.rectGreen(P.extinguisher()))),
  S('F59', 'indication', 'Annonce de parking', 'Anuncio de aparcamiento', 'Aparcamiento (con distancia o dirección).', rBlue(`${T('P', 58, 40, WHT, 36)}<path d="M56 50 h20 l-6-6 M76 50 l-6 6" stroke="${WHT}" stroke-width="4" fill="none"/>`)),
  S('F61', 'indication', 'Téléphone', 'Teléfono', 'Teléfono público.', rBlue(P.phone(WHT))),
  S('F62', 'indication', 'Téléphone d\'appel d\'urgence', 'Poste de llamada de emergencia', 'Poste SOS (autopistas y túneles).', rBlue(P.phone(WHT) + T('SOS', 26, 12, WHT))),
  S('F63', 'indication', 'Station-service', 'Gasolinera', 'Estación de servicio (modelo F63a, surtidor de carburante). Hay variantes según el carburante: F63b LPG, F63c LNG, F63d CNG, F63e hidrógeno (H2), F63f recarga eléctrica.', rBlue(P.fuel(WHT))),
  S('F65', 'indication', 'Hôtel ou motel', 'Hotel', 'Alojamiento.', rBlue(P.bed(WHT))),
  S('F67', 'indication', 'Restaurant', 'Restaurante', 'Restaurante.', rBlue(P.cutlery(WHT))),
  S('F79', 'indication', 'Préavis de réduction du nombre de bandes', 'Preaviso de reducción de carriles', 'Un carril desaparece más adelante: cambia a tiempo (cremallera).', rBlue(`<path d="M30 80 v-40 M50 80 v-40 M70 80 v-20 l-16-20" stroke="${WHT}" stroke-width="5" fill="none"/><path d="M30 40 l-5 8 h10z M50 40 l-5 8 h10z" fill="${WHT}"/>`)),
  S('F81', 'indication', 'Préavis d\'évitement', 'Preaviso de desvío de carril', 'Los carriles se desplazan (obras): sigue las flechas.', rBlue(`<path d="M40 80 v-20 l20-16 v-20 M60 80 v-16 l20-16 v-24" stroke="${WHT}" stroke-width="5" fill="none"/>`)),
  S('F85', 'indication', 'Circulation dans les deux sens sur une section à sens unique', 'Doble sentido en un tramo de sentido único', 'Tramo donde, excepcionalmente, hay tráfico en los dos sentidos.', rBlue(`<path d="M40 82 v-40 l-8 10 M40 42 l8 10 M60 42 v40 l-8-10 M60 82 l8-10" stroke="${WHT}" stroke-width="6" fill="none"/>`)),
  S('F87', 'indication', 'Dispositif surélevé', 'Resalto', 'Señala el lomo o la plataforma elevada justo delante: 30 km/h máximo.', rBlue(P.raised(WHT))),
  S('F89', 'indication', 'Danger ne concernant qu\'une bande', 'Peligro que afecta a un carril', 'Preaviso: anuncia, antes de llegar, un peligro o una regla que solo valdrá para uno o varios carriles (el dibujo de cada carril lleva la señal que le afecta). La señal que se aplica sobre el propio carril es la F91 (art. 71.2).', rBlue(`<path d="M30 80 v-50 M50 80 v-50 M70 80 v-50" stroke="${WHT}" stroke-width="4"/><polygon points="70,34 80,50 60,50" fill="${WHT}" stroke="${RED}" stroke-width="3"/>`)),
  S('F91', 'indication', 'Réglementation ne concernant qu\'une bande', 'Regla que afecta a un carril', 'Colocada a la altura del peligro o de la regla: indica que solo vale para el carril o carriles en los que figura la señal (art. 71.2). La F89 es su preaviso.', rBlue(`<path d="M30 80 v-50 M50 80 v-50 M70 80 v-50" stroke="${WHT}" stroke-width="4"/><circle cx="70" cy="44" r="10" fill="${WHT}" stroke="${RED}" stroke-width="3"/>${T('50', 48, 9, BLK, 70)}`)),
  S('F93', 'indication', 'Station de radio d\'informations routières', 'Emisora de información de tráfico', 'Frecuencia de radio con información de tráfico (túneles, autopistas).', rBlue(`<rect x="24" y="40" width="52" height="30" rx="4" fill="${WHT}"/>${T('FM 103.5', 60, 10, BLUE)}<path d="M62 40 l10-14" stroke="${WHT}" stroke-width="3"/>`)),
  S('F95', 'indication', 'Piste de détresse', 'Lecho de frenado', 'Vía de escape en bajada para vehículos sin frenos.', rBlue(`<path d="M20 80 l20-40 h30" stroke="${WHT}" stroke-width="5" fill="none"/><rect x="60" y="30" width="22" height="12" fill="${WHT}"/>`)),
  S('F97', 'indication', 'Rétrécissement d\'une bande de circulation', 'Estrechamiento de un carril', 'Un carril desaparece (el dibujo muestra cuál): incorpórate al que continúa, en cremallera.', rBlue(`<path d="M34 80 v-40 M66 80 v-14 l-16-26" stroke="${WHT}" stroke-width="5" fill="none"/>`)),
  S('F99a', 'indication', 'Chemin réservé aux piétons, cyclistes et cavaliers', 'Camino reservado (peatones, ciclistas, jinetes)', 'Reservado a las categorías dibujadas; prohibido a los demás vehículos. F99b: con la parte de cada categoría separada. F99c: también vehículos agrícolas.', rBlue(`${g(P.walker(WHT), 'translate(-24,-10) scale(0.5) translate(40,20)')}${g(P.bike(WHT), 'translate(14,-10) scale(0.5) translate(40,20)')}${g(P.rider(WHT), 'translate(-6,24) scale(0.5) translate(40,20)')}`)),
  S('F101a', 'indication', 'Fin de chemin réservé', 'Fin de camino reservado', 'Fin de la reserva.', rBlueEnd(`${g(P.walker(WHT), 'translate(-24,-10) scale(0.5) translate(40,20)')}${g(P.bike(WHT), 'translate(14,-10) scale(0.5) translate(40,20)')}`)),
  S('F103', 'indication', 'Zone piétonne', 'Zona peatonal', 'Solo peatones; vehículos autorizados por la placa, a paso de persona, sin estacionar.', rBlue(`<rect x="22" y="22" width="56" height="56" fill="${WHT}"/>${g(P.walker(BLUE), 'translate(-10,0) scale(0.7) translate(20,14)')}${g(P.children(BLUE), 'translate(22,8) scale(0.5) translate(30,30)')}`)),
  S('F105', 'indication', 'Fin de zone piétonne', 'Fin de zona peatonal', 'Fin de la zona peatonal.', rBlueEnd(`<rect x="22" y="22" width="56" height="56" fill="${WHT}"/>${g(P.walker(BLUE), 'translate(0,0) scale(0.7) translate(20,14)')}`)),
  S('F111', 'indication', 'Zone cyclable', 'Zona (calle) ciclista', 'Máx. 30 km/h; los ciclistas pueden ocupar toda la anchura de su sentido y los vehículos a motor no pueden adelantarlos.', rBlue(`<circle cx="50" cy="46" r="26" fill="${WHT}"/>${g(P.bike(BLK), 'translate(0,-14)')}`)),
  S('F113', 'indication', 'Fin de zone cyclable', 'Fin de zona ciclista', 'Fin de la calle o zona ciclista: vuelven las reglas normales de adelantamiento y velocidad.', rBlueEnd(`<circle cx="50" cy="46" r="26" fill="${WHT}"/>${g(P.bike(BLK), 'translate(0,-14)')}`)),

  /* ================= PLACAS ADICIONALES ================= */
  S('M2', 'indication', 'Panneau additionnel : excepté cyclistes', 'Placa: excepto ciclistas', 'Bajo C1, C3, C31 o D1: la prohibición u obligación no vale para los ciclistas (C1 + M2 = SUL). M3: tampoco para ciclomotores A.', rWhite(`${g(P.bike(BLK), 'translate(0,-14) scale(0.6) translate(34,20)')}${T('EXCEPTÉ', 76, 11)}`)),
  S('M4', 'indication', 'Panneau additionnel : cyclistes dans les deux sens', 'Placa: ciclistas en ambos sentidos', 'Bajo un F19: los ciclistas circulan en los dos sentidos del sentido único.', rWhite(`${g(P.bike(BLK), 'translate(0,-14) scale(0.6) translate(34,20)')}<path d="M30 74 h14 M56 74 h14 M34 70 l-4 4 l4 4 M66 70 l4 4 l-4 4" stroke="${BLK}" stroke-width="3" fill="none"/>`)),
  S('M-distance', 'indication', 'Panneau additionnel (type Ia) : distance', 'Placa adicional (tipo Ia): distancia', 'Placa adicional del SPW (no es una placa M). Indica a qué distancia empieza lo que anuncia la señal (p. ej. «150 m»).', rWhite(T('150 m', 58, 20))),
  S('M-longueur', 'indication', 'Panneau additionnel (type II) : longueur', 'Placa adicional (tipo II): longitud del tramo', 'Placa adicional del SPW (no es una placa M). Flechas verticales con la longitud: la señal vale en todo el tramo (p. ej. «2 km»).', rWhite(`<path d="M30 24 v52 M30 24 l-6 8 M30 24 l6 8 M30 76 l-6-8 M30 76 l6-8" stroke="${BLK}" stroke-width="4" fill="none"/>${T('2 km', 56, 16, BLK, 62)}`)),
  S('M-horaire', 'indication', 'Panneau additionnel (type V) : horaire', 'Placa adicional (tipo V): horario', 'Placa adicional del SPW (no es una placa M). La señal solo se aplica en el horario indicado (p. ej. estacionamiento prohibido de 8 a 18 h, excepto domingos).', rWhite(`${T('8h – 18h', 46, 14)}${T('sauf dimanche', 68, 10)}`)),
]

export const signCategories: { id: SignCategory; fr: string; es: string }[] = [
  { id: 'priorite', fr: 'Priorité (B)', es: 'Prioridad (B)' },
  { id: 'danger', fr: 'Danger (A)', es: 'Peligro (A)' },
  { id: 'interdiction', fr: 'Interdiction (C)', es: 'Prohibición (C)' },
  { id: 'obligation', fr: 'Obligation (D)', es: 'Obligación (D)' },
  { id: 'stationnement', fr: 'Arrêt et stationnement (E)', es: 'Parada y estacionamiento (E)' },
  { id: 'indication', fr: 'Indication (F) et panneaux additionnels', es: 'Indicación (F) y placas' },
]

export const signByCode = Object.fromEntries(signs.map((s) => [s.code, s])) as Record<string, SignWithSvg>

/** Placa adicional (rectángulo blanco con borde negro) con un contenido SVG en coordenadas 0..80 × 0..40. */
function panel(inner: string): string {
  // Imagen oficial de la placa (ruta /signs/…) o contenido SVG dibujado.
  if (inner.startsWith('/signs/')) return `<rect x="0" y="104" width="100" height="46" rx="6" fill="${WHT}"/><image href="${inner}" x="4" y="107" width="92" height="40" preserveAspectRatio="xMidYMid meet"/>`
  return `<g transform="translate(10 104)"><rect width="80" height="40" rx="2" fill="${WHT}" stroke="${BLK}" stroke-width="2.5"/>${inner}</g>`
}

/** Señal con una placa adicional debajo (viewBox 100×150), para mostrarla antes de una pregunta. */
export function signWithPanel(code: string, panelInner: string): string {
  const sign = signByCode[code]!
  const s = sign.img
    ? `<rect x="0" y="0" width="100" height="100" rx="8" fill="${WHT}"/><image href="${sign.img}" x="4" y="4" width="92" height="92" preserveAspectRatio="xMidYMid meet"/>`
    : sign.svg.replace('<svg viewBox=', '<svg x="0" y="0" width="100" height="100" viewBox=')
  return `<svg viewBox="0 0 100 150" xmlns="http://www.w3.org/2000/svg" role="img">${s}${panel(panelInner)}</svg>`
}

/**
 * Señal con un valor concreto (velocidad, masa, longitud…) para mostrarla antes de una pregunta
 * sin tener que citar la cifra en el enunciado, como en el examen real. Usa la imagen oficial
 * si existe esa variante (C43-70, C45-90…) o si la imagen base ya lleva esa cifra
 * (C43.svg = 50, F4a.svg = 30…); si no, la dibuja.
 */
const baseImageValue: Record<string, string> = { C43: '50', C45: '50', F4a: '30', F4b: '30', C29: '3,5', C27: '2,5' }

export function signWithValue(code: string, value: string): string {
  const official = signImages.get(`${code}-${value}`) ?? (baseImageValue[code] === value ? signImages.get(code) : undefined)
  if (official) return `<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg" role="img"><rect width="100" height="100" rx="8" fill="${WHT}"/><image href="${official}" x="1" y="1" width="98" height="98" preserveAspectRatio="xMidYMid meet"/></svg>`
  const size = value.length <= 2 ? 40 : value.length <= 3 ? 32 : 24
  switch (code) {
    case 'C43':
      return cRed(T(value, 50 + size * 0.36, size))
    case 'C45':
      return cEnd(T(value, 50 + size * 0.36, size, GRY))
    case 'C21':
      return cRed(T(`${value} t`, 60, 24))
    case 'C25':
      return cRed(`<rect x="26" y="46" width="48" height="12" fill="${BLK}"/>${T(`${value} m`, 74, 14)}`)
    case 'C27':
      return cRed(`<path d="M16 50 l8-6 v12z M84 50 l-8-6 v12z" fill="${BLK}"/>${T(`${value} m`, 56, 15)}`)
    case 'C29':
      return cRed(`<path d="M50 24 l-6 8 h12z M50 76 l-6-8 h12z" fill="${BLK}"/>${T(`${value} m`, 58, 16)}`)
    case 'F4a':
      return rWhite(`${T('ZONE', 24, 11, BLK, 50, 700)}<circle cx="50" cy="56" r="28" fill="${WHT}" stroke="${RED}" stroke-width="7"/>${T(value, 65, 24)}`)
    case 'F4b':
      return rEnd(`${T('ZONE', 24, 11, GRY, 50, 700)}<circle cx="50" cy="56" r="28" fill="${WHT}" stroke="${GRY}" stroke-width="5"/>${T(value, 65, 24, GRY)}`)
    default:
      return signByCode[code]?.svg ?? ''
  }
}

/** Placas adicionales usadas en las preguntas. */
export const panels = {
  /** Duración máxima (placa adicional oficial tipo VIIc, no es una placa M). */
  min30: '/signs/panel-30min.svg',
  /** Longitud del tramo (placa oficial tipo II). */
  length2km: '/signs/M-longueur.svg',
  /** Tres barras rojas oblicuas (paso a nivel a ~150 m). */
  bars3: `<path d="M22 32 l12-24 M38 32 l12-24 M54 32 l12-24" stroke="${RED}" stroke-width="5"/>`,
  /** Excepto ciclistas (M2 oficial: bajo C1, C3, C31, D1). */
  exceptCyclists: '/signs/M2.svg',
  /** Ciclistas en los dos sentidos (M4 oficial: bajo F19, calle SUL). */
  cyclistsBothWays: '/signs/M4.svg',
}
