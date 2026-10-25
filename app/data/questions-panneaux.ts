import type { Question } from '../types'
import { Q } from './q'
import { panels, signWithPanel, signWithValue } from './signs'

/** Placas adicionales oficiales usadas aquí (además de `panels`). */
const distance200 = '/signs/M-distance.svg'
const horaire7a19 = '/signs/M-horaire.svg'

/**
 * Tema «panneaux»: reconocimiento y aplicación de las señales A, C, D, E, F y placas M
 * (las de prioridad B están en el tema priorite). La señal se muestra con `signs` o `image`;
 * el enunciado nunca cita el código.
 */
export const panneauxQuestions: Question[] = [
  /* ================= A — DANGER ================= */
  { ...Q('z-pan-01', 'panneaux', 'pan-danger',
    ['Que signifie ce signal ?', 'La chaussée se rétrécit par la gauche.', 'La chaussée se rétrécit par la droite.', 'La chaussée se rétrécit des deux côtés.'],
    ['¿Qué significa esta señal?', 'La calzada se estrecha por la izquierda.', 'La calzada se estrecha por la derecha.', 'La calzada se estrecha por los dos lados.'],
    1, 'A7c: estrechamiento por la derecha; la línea del lado derecho se desplaza hacia dentro. Por la izquierda es A7b y por los dos lados A7a.'), signs: ['A7c'] },

  { ...Q('z-pan-02', 'panneaux', 'pan-danger',
    ['Ce signal m\'annonce :', 'Un double virage, le premier à droite.', 'Un double virage, le premier à gauche.', 'Un virage à gauche suivi d\'une côte.'],
    ['Esta señal me anuncia:', 'Una doble curva, la primera a la derecha.', 'Una doble curva, la primera a la izquierda.', 'Una curva a la izquierda seguida de una subida.'],
    1, 'A1c: doble curva (o sucesión de curvas) cuya primera curva es a la izquierda, como muestra el dibujo de abajo arriba.'), signs: ['A1c'] },

  { ...Q('z-pan-03', 'panneaux', 'pan-danger',
    ['Après ce signal, la meilleure façon de garder le contrôle est :', 'De rouler au point mort pour économiser.', 'De freiner sans arrêt du début à la fin.', 'D\'utiliser le frein moteur (rapport bas).'],
    ['Después de esta señal, la mejor forma de mantener el control es:', 'Circular en punto muerto para ahorrar.', 'Frenar sin parar desde el principio hasta el final.', 'Usar el freno motor (marcha corta).'],
    2, 'A3 anuncia una bajada peligrosa: con una marcha corta el motor retiene el coche y los frenos no se recalientan. En punto muerto se pierde ese freno.'), signs: ['A3'] },

  { ...Q('z-pan-04', 'panneaux', 'pan-danger',
    ['Que m\'annonce ce signal ?', 'Une route inondée en cas de pluie.', 'Un pont qui peut s\'ouvrir.', 'Une route qui débouche sur un quai.'],
    ['¿Qué me anuncia esta señal?', 'Una carretera inundada cuando llueve.', 'Un puente que puede abrirse.', 'Una vía que desemboca en un muelle.'],
    2, 'A11: la vía desemboca en un muelle o una ribera, con riesgo de caer al agua. Extrema la prudencia, sobre todo de noche o con niebla.'), signs: ['A11'] },

  { ...Q('z-pan-05', 'panneaux', 'pan-danger',
    ['Ce signal annonce :', 'Un cassis ou un dos d\'âne.', 'Une chaussée en pavés.', 'Une zone de travaux.'],
    ['Esta señal anuncia:', 'Un badén o un lomo.', 'Una calzada adoquinada.', 'Una zona de obras.'],
    0, 'A13 («cassis ou dos d\'âne»): irregularidad del firme que puede hacer rebotar el coche; reduce antes.'), signs: ['A13'] },

  { ...Q('z-pan-06', 'panneaux', 'pan-danger',
    ['À quelle vitesse maximale puis-je franchir le dispositif annoncé par ce signal ?', '20 km/h.', '30 km/h.', '50 km/h.'],
    ['¿A qué velocidad máxima puedo pasar el dispositivo que anuncia esta señal?', '20 km/h.', '30 km/h.', '50 km/h.'],
    1, 'A14 anuncia un resalto («dispositif surélevé»). El código (art. 22ter) exige acercarse con prudencia y pasarlo a 30 km/h como máximo.'), signs: ['A14'] },

  { ...Q('z-pan-07', 'panneaux', 'pan-danger',
    ['Ce signal m\'avertit d\'un risque :', 'De dérapage.', 'De chute de pierres.', 'De brouillard.'],
    ['Esta señal me avisa de un riesgo:', 'De derrape.', 'De caída de piedras.', 'De niebla.'],
    0, 'A15: calzada resbaladiza (lluvia, hielo, barro, hojas). Reduce, aumenta la distancia y evita maniobras bruscas.'), signs: ['A15'] },

  { ...Q('z-pan-08', 'panneaux', 'pan-danger',
    ['Je vois ce signal. Que dois-je faire ?', 'Accélérer pour sortir vite de la zone.', 'Allumer mes feux antibrouillard arrière.', 'Ralentir et augmenter ma distance.'],
    ['Veo esta señal. ¿Qué debo hacer?', 'Acelerar para salir rápido de la zona.', 'Encender las luces antiniebla traseras.', 'Reducir y aumentar mi distancia.'],
    2, 'A17: proyección de gravilla. Reducir evita derrapar y aumentar la distancia evita que la gravilla que lanza el de delante rompa el parabrisas.'), signs: ['A17'] },

  { ...Q('z-pan-09', 'panneaux', 'pan-danger',
    ['Quelle est la différence entre ces deux signaux ?', 'Le triangle annonce le passage, le carré bleu est au passage.', 'Le carré bleu annonce le passage, le triangle est au passage.', 'Aucune, ils sont placés au même endroit.'],
    ['¿Qué diferencia hay entre estas dos señales?', 'El triángulo anuncia el paso; el cuadrado azul está en el paso.', 'El cuadrado azul anuncia el paso; el triángulo está en el paso.', 'Ninguna, se colocan en el mismo lugar.'],
    0, 'A21 (triángulo, señal de peligro) anuncia un paso de peatones, normalmente a unos 150 m. F49 (cuadrado azul, indicación) se coloca en el mismo paso.'), signs: ['A21', 'F49'] },

  { ...Q('z-pan-10', 'panneaux', 'pan-danger',
    ['Je passe ce signal près d\'une école. Je dois :', 'Redoubler de prudence et ralentir.', 'Klaxonner pour avertir les enfants.', 'M\'arrêter devant l\'école.'],
    ['Paso esta señal cerca de una escuela. Debo:', 'Extremar la prudencia y reducir.', 'Tocar el claxon para avisar a los niños.', 'Detenerme delante de la escuela.'],
    0, 'A23: lugar frecuentado por niños, que pueden aparecer de repente. No obliga a parar, sino a reducir y a estar preparado.'), signs: ['A23'] },

  { ...Q('z-pan-11', 'panneaux', 'pan-danger',
    ['Ce signal annonce :', 'Une piste cyclable obligatoire pour moi.', 'Une rue réservée aux cyclistes.', 'Un endroit où des cyclistes traversent.'],
    ['Esta señal anuncia:', 'Un carril bici obligatorio para mí.', 'Una calle reservada a los ciclistas.', 'Un lugar donde cruzan ciclistas.'],
    2, 'A25: paso de ciclistas y ciclomotores de dos ruedas, o lugar donde salen de una pista ciclable a la calzada. Es un aviso, no una obligación.'), signs: ['A25'] },

  { ...Q('z-pan-12', 'panneaux', 'pan-danger',
    ['Après ce signal, un chevreuil surgit juste devant moi. Le plus sûr est de :', 'Freiner fort en gardant ma trajectoire.', 'Donner un coup de volant pour l\'éviter.', 'Accélérer pour passer avant lui.'],
    ['Tras esta señal, un corzo aparece justo delante de mí. Lo más seguro es:', 'Frenar fuerte manteniendo mi trayectoria.', 'Dar un volantazo para esquivarlo.', 'Acelerar para pasar antes que él.'],
    0, 'A27 avisa de paso de animales salvajes. Un volantazo puede llevarte contra un árbol o al carril contrario; frenar en línea recta es lo más seguro.'), signs: ['A27'] },

  { ...Q('z-pan-13', 'panneaux', 'pan-danger',
    ['Je quitte une chaussée à sens unique et je vois ce signal. Cela signifie :', 'Qu\'il y a deux bandes dans mon sens à présent.', 'Que je peux dépasser par la droite.', 'Que le trafic revient dans les deux sens.'],
    ['Salgo de una calzada de sentido único y veo esta señal. Significa:', 'Que hay dos carriles en mi sentido.', 'Que puedo adelantar por la derecha.', 'Que vuelve el tráfico en los dos sentidos.'],
    2, 'A39: tras un tramo de sentido único, vuelve a haber tráfico de frente. Mantente a la derecha.'), signs: ['A39'] },

  { ...Q('z-pan-14', 'panneaux', 'pan-danger',
    ['Ce signal annonce un passage à niveau :', 'Avec barrières.', 'Hors service.', 'Sans barrières.'],
    ['Esta señal anuncia un paso a nivel:', 'Con barreras.', 'Fuera de servicio.', 'Sin barreras.'],
    2, 'A43 (locomotora): paso a nivel sin barreras. El de barreras es A41 (valla). En ambos hay que detenerse si se acerca un tren o la señal luminosa está en rojo.'), signs: ['A43'] },

  { ...Q('z-pan-15', 'panneaux', 'pan-danger',
    ['À Bruxelles, où ce signal est-il placé ?', 'À environ 150 m du passage à niveau.', 'Juste au passage à niveau.', 'Après le passage à niveau.'],
    ['En Bruselas, ¿dónde se coloca esta señal?', 'A unos 150 m del paso a nivel.', 'Justo en el paso a nivel.', 'Después del paso a nivel.'],
    1, 'En Bruselas (y en Flandes) las señales de peligro se colocan a unos 150 m del peligro (art. 66.2, escrito para estas dos regiones); las cruces de San Andrés (A45, A47) son la excepción: se colocan en el mismo paso a nivel o justo al lado.'), signs: ['A45'] },

  { ...Q('z-pan-16', 'panneaux', 'pan-danger',
    ['Ce signal se trouve à un passage à niveau :', 'À une seule voie ferrée.', 'Désaffecté, sans trains.', 'À deux voies ferrées ou plus.'],
    ['Esta señal está en un paso a nivel:', 'De una sola vía.', 'Desafectado, sin trenes.', 'De dos vías o más.'],
    2, 'A47 (cruz doble): dos vías o más. Un tren puede ocultar otro que viene en sentido contrario: espera a ver las dos vías libres.'), signs: ['A47'] },

  { ...Q('z-pan-17', 'panneaux', 'pan-danger',
    ['Que signifie ce signal ?', 'Des rails (tram) traversent la chaussée.', 'Un arrêt de tram sans refuge piéton.', 'La sortie d\'un dépôt de trams.'],
    ['¿Qué significa esta señal?', 'Raíles (tranvía) cruzan la calzada.', 'Una parada de tranvía sin isleta peatonal.', 'La salida de una cochera de tranvías.'],
    0, 'A49: la calzada es cruzada por vías férreas tendidas en ella, normalmente de tranvía. Cuidado con el tranvía y con los raíles mojados.'), signs: ['A49'] },

  { ...Q('z-pan-18', 'panneaux', 'pan-additionnels',
    ['Que m\'indique le panneau additionnel sous ce signal ?', 'Le danger commence à environ 200 m.', 'Le danger s\'étend sur 200 m.', 'La vitesse est limitée sur 200 m.'],
    ['¿Qué me indica la placa adicional bajo esta señal?', 'El peligro empieza a unos 200 m.', 'El peligro se extiende durante 200 m.', 'La velocidad está limitada durante 200 m.'],
    0, 'Una placa con solo una distancia indica dónde empieza el peligro, cuando no está a los 150 m habituales. La longitud del tramo se indica con flechas verticales.'), image: signWithPanel('A15', distance200) },

  /* ================= C — INTERDICTION ================= */
  { ...Q('z-pan-19', 'panneaux', 'pan-interdiction',
    ['Que signifie ce signal ?', 'Sens interdit, accès possible par l\'autre bout.', 'Accès interdit à tous, dans les deux sens.', 'Fin de toutes les interdictions locales.'],
    ['¿Qué significa esta señal?', 'Sentido prohibido, se puede entrar por el otro extremo.', 'Acceso prohibido a todos, en los dos sentidos.', 'Fin de todas las prohibiciones locales.'],
    1, 'C3 (círculo rojo vacío): ningún conductor puede entrar, en ningún sentido. El sentido prohibido es C1 (barra blanca).'), signs: ['C3'] },

  { ...Q('z-pan-20', 'panneaux', 'pan-interdiction',
    ['Ce signal est placé à l\'entrée d\'une rue. Des voitures peuvent-elles y circuler ?', 'Non, la rue est fermée à toute circulation.', 'Oui, mais seulement les riverains.', 'Oui, dans l\'autre sens (sens unique).'],
    ['Esta señal está a la entrada de una calle. ¿Pueden circular coches por ella?', 'No, la calle está cerrada a todo tráfico.', 'Sí, pero solo los vecinos.', 'Sí, en el otro sentido (sentido único).'],
    2, 'C1 prohíbe entrar por ese lado: la calle es de sentido único y los vehículos circulan en sentido contrario. Cerrada a todos en los dos sentidos sería C3.'), signs: ['C1'] },

  { ...Q('z-pan-21', 'panneaux', 'pan-additionnels',
    ['Je suis en voiture devant ce signal et son panneau additionnel. Que puis-je faire ?', 'Entrer, car le panneau lève l\'interdiction.', 'Ne pas entrer, seuls les cyclistes peuvent.', 'Entrer à l\'allure du pas.'],
    ['Voy en coche y veo esta señal con su placa. ¿Qué puedo hacer?', 'Entrar, porque la placa anula la prohibición.', 'No entrar; solo los ciclistas pueden.', 'Entrar al paso de una persona.'],
    1, 'La placa M2 («excepté» + bicicleta) solo exime a los ciclistas (calle de sentido único limitado). Para los coches el sentido prohibido sigue valiendo.'), image: signWithPanel('C1', panels.exceptCyclists) },

  { ...Q('z-pan-22', 'panneaux', 'pan-interdiction',
    ['Ce signal interdit l\'accès :', 'Aux motocyclettes.', 'Aux cyclomoteurs.', 'À tous les deux-roues.'],
    ['Esta señal prohíbe el acceso:', 'A las motocicletas.', 'A los ciclomotores.', 'A todos los vehículos de dos ruedas.'],
    0, 'C7: acceso prohibido a las motocicletas. Las bicicletas y los ciclomotores no están afectados (tienen sus propias señales C11 y C9).'), signs: ['C7'] },

  { ...Q('z-pan-23', 'panneaux', 'pan-interdiction',
    ['Je suis en voiture. Puis-je entrer dans une rue munie de ce signal ?', 'Oui, il ne concerne que les cyclistes.', 'Non, il concerne tous les véhicules.', 'Oui, mais sans dépasser 30 km/h.'],
    ['Voy en coche. ¿Puedo entrar en una calle con esta señal?', 'Sí, solo afecta a los ciclistas.', 'No, afecta a todos los vehículos.', 'Sí, pero sin superar 30 km/h.'],
    0, 'C11 prohíbe el acceso solo a los ciclistas. Una señal de prohibición de acceso afecta únicamente a la categoría dibujada.'), signs: ['C11'] },

  { ...Q('z-pan-24', 'panneaux', 'pan-interdiction',
    ['Ma voiture pèse 1 500 kg à vide et 2 000 kg chargée. Puis-je passer ce signal ?', 'Non, il interdit toutes les voitures.', 'Oui, je reste sous la masse indiquée.', 'Oui, mais seulement si elle est vide.'],
    ['Mi coche pesa 1 500 kg vacío y 2 000 kg cargado. ¿Puedo pasar esta señal?', 'No, prohíbe todos los coches.', 'Sí, estoy por debajo de la masa indicada.', 'Sí, pero solo si va vacío.'],
    1, 'C21 prohíbe el paso a los vehículos cuya masa en carga (con lo que llevan) supera la indicada, aquí 3,5 t. Con 2 000 kg en carga puedo pasar.'), signs: ['C21'] },

  { ...Q('z-pan-25', 'panneaux', 'pan-interdiction',
    ['Sans panneau additionnel, ce signal interdit l\'accès :', 'Aux camions de plus de 3,5 t.', 'Aux véhicules de marchandises.', 'Aux camping-cars et aux caravanes.'],
    ['Sin placa adicional, esta señal prohíbe el acceso:', 'Solo a los camiones de más de 3,5 t.', 'A los vehículos de mercancías.', 'A las autocaravanas y las caravanas.'],
    1, 'C23 prohíbe el acceso a todos los vehículos construidos para transportar mercancías, incluidas las furgonetas. Solo si una placa indica una masa se limita a los que la superan.'), signs: ['C23'] },

  { ...Q('z-pan-26', 'panneaux', 'pan-interdiction',
    ['Ce signal interdit l\'accès aux véhicules :', 'De livraison à domicile.', 'De plus de 2,5 m de largeur.', 'Chargés de matières dangereuses.'],
    ['Esta señal prohíbe el acceso a los vehículos:', 'De reparto a domicilio.', 'De más de 2,5 m de ancho.', 'Cargados de materias peligrosas.'],
    2, 'C24a: acceso prohibido a los vehículos que transportan mercancías peligrosas (los que llevan la placa naranja dibujada).'), signs: ['C24a'] },

  { ...Q('z-pan-27', 'panneaux', 'pan-interdiction',
    ['La longueur indiquée sur ce signal concerne :', 'Le véhicule, chargement compris.', 'La distance entre deux véhicules.', 'La longueur du tronçon interdit.'],
    ['La longitud indicada en esta señal se refiere a:', 'El vehículo, carga incluida.', 'La distancia entre dos vehículos.', 'La longitud del tramo prohibido.'],
    0, 'C25: prohibido a los vehículos o conjuntos que, con la carga, midan más que la longitud indicada.'), signs: ['C25'] },

  { ...Q('z-pan-28', 'panneaux', 'pan-interdiction',
    ['Que signifie ce signal ?', 'Une largeur maximale.', 'Une hauteur maximale.', 'Un passage étroit à céder.'],
    ['¿Qué significa esta señal?', 'Una anchura máxima.', 'Una altura máxima.', 'Un paso estrecho en el que ceder.'],
    0, 'C27: los triángulos a los lados indican la anchura; prohibido a los vehículos más anchos (carga incluida). La altura (C29) tiene los triángulos arriba y abajo.'), signs: ['C27'] },

  { ...Q('z-pan-29', 'panneaux', 'pan-interdiction',
    ['Ce signal est placé avant un carrefour. Qu\'est-ce qui m\'est interdit ?', 'De faire demi-tour jusqu\'au carrefour.', 'De tourner à gauche dans toute la rue.', 'De tourner à gauche au prochain carrefour.'],
    ['Esta señal está antes de un cruce. ¿Qué me está prohibido?', 'Cambiar de sentido hasta el cruce.', 'Girar a la izquierda en toda la calle.', 'Girar a la izquierda en el próximo cruce.'],
    2, 'C31a prohíbe girar a la izquierda en el próximo cruce. No prohíbe el cambio de sentido (C33).'), signs: ['C31a'] },

  { ...Q('z-pan-30', 'panneaux', 'pan-interdiction',
    ['Au prochain carrefour, ce signal me permet :', 'D\'aller tout droit ou à gauche.', 'Uniquement de tourner à droite.', 'De tourner à droite après un arrêt.'],
    ['En el próximo cruce, esta señal me permite:', 'Seguir recto o girar a la izquierda.', 'Solo girar a la derecha.', 'Girar a la derecha tras detenerme.'],
    0, 'C31b prohíbe girar a la derecha en el próximo cruce; las demás direcciones siguen permitidas (salvo otra señal).'), signs: ['C31b'] },

  { ...Q('z-pan-31', 'panneaux', 'pan-interdiction',
    ['Jusqu\'où s\'applique l\'interdiction de ce signal ?', 'Jusqu\'au signal de fin d\'interdiction.', 'Jusqu\'au prochain carrefour inclus.', 'Sur 150 m après le signal.'],
    ['¿Hasta dónde vale la prohibición de esta señal?', 'Hasta la señal de fin de prohibición.', 'Hasta el próximo cruce inclusive.', 'Durante 150 m después de la señal.'],
    1, 'C33 prohíbe el cambio de sentido desde la señal hasta el próximo cruce inclusive (art. 68.3): tampoco en ese cruce.'), signs: ['C33'] },

  { ...Q('z-pan-32', 'panneaux', 'pan-interdiction',
    ['Après ce signal, puis-je dépasser une moto qui roule lentement ?', 'Oui, avec les règles habituelles.', 'Non, tout dépassement est interdit.', 'Oui, mais seulement par la droite.'],
    ['Después de esta señal, ¿puedo adelantar a una moto que va despacio?', 'Sí, con las reglas habituales.', 'No, todo adelantamiento está prohibido.', 'Sí, pero solo por la derecha.'],
    0, 'C35 prohíbe adelantar por la izquierda a vehículos de más de dos ruedas y a vehículos de tracción animal. Una moto de dos ruedas sí se puede adelantar, con las reglas normales.'), signs: ['C35'] },

  { ...Q('z-pan-33', 'panneaux', 'pan-interdiction',
    ['Avant le prochain carrefour, quel signal met fin à cette interdiction ?', 'C41', 'C45', 'C37'],
    ['Antes del próximo cruce, ¿qué señal pone fin a esta prohibición?', 'C41', 'C45', 'C37'],
    2, 'C37 (la misma señal en gris, tachada) pone fin a la prohibición de adelantar C35. C41 es el fin de la prohibición para camiones (C39) y C45 el fin de una limitación de velocidad.'), signs: ['C35'] },

  { ...Q('z-pan-34', 'panneaux', 'pan-interdiction',
    ['À qui s\'adresse ce signal ?', 'Aux camions de plus de 3,5 t, qui ne peuvent pas dépasser.', 'À moi : il m\'interdit de dépasser les camions.', 'Aux camions, qui doivent rouler sur la bande de droite.'],
    ['¿A quién se dirige esta señal?', 'A los camiones de más de 3,5 t, que no pueden adelantar.', 'A mí: me prohíbe adelantar a los camiones.', 'A los camiones, que deben ir por el carril derecho.'],
    0, 'C39 (camión rojo): los vehículos de mercancías de más de 3,5 t no pueden adelantar a vehículos de más de dos ruedas. Un coche sí puede adelantar a un camión.'), signs: ['C39'] },

  { ...Q('z-pan-35', 'panneaux', 'pan-interdiction',
    ['Que signifie ce signal ?', 'Fin de l\'interdiction de dépasser pour tous.', 'Fin de l\'interdiction de dépasser pour les camions.', 'Fin de la zone d\'accès interdit aux camions.'],
    ['¿Qué significa esta señal?', 'Fin de la prohibición de adelantar para todos.', 'Fin de la prohibición de adelantar para los camiones.', 'Fin de la zona prohibida a los camiones.'],
    1, 'C41 pone fin a la prohibición C39: los camiones de más de 3,5 t pueden volver a adelantar. Para todos los vehículos sería C37.'), signs: ['C41'] },

  { ...Q('z-pan-36', 'panneaux', 'pan-interdiction',
    ['Après ce signal, sans carrefour, j\'arrive au panneau de début d\'agglomération. Cette limite :', 'Reste valable jusqu\'au prochain carrefour.', 'Reste valable jusqu\'à un signal de fin.', 'Prend fin au panneau d\'agglomération.'],
    ['Tras esta señal, sin pasar ningún cruce, llego al cartel de inicio de población. Este límite:', 'Sigue valiendo hasta el próximo cruce.', 'Sigue valiendo hasta una señal de fin.', 'Termina en el cartel de población.'],
    2, 'C43 vale hasta el próximo cruce inclusive, o hasta otra C43, o hasta la señal de inicio o fin de población o de zona residencial, de encuentro o peatonal (art. 68.3). Desde F1 rige el límite de la población.'), image: signWithValue('C43', '70') },

  { ...Q('z-pan-37', 'panneaux', 'pan-interdiction',
    ['Que signifie ce signal ?', 'Je dois réduire ma vitesse à 70 km/h.', 'La limite de 70 km/h prend fin.', 'Je dois rouler à 70 km/h au minimum.'],
    ['¿Qué significa esta señal?', 'Debo reducir la velocidad a 70 km/h.', 'Termina el límite de 70 km/h.', 'Debo circular como mínimo a 70 km/h.'],
    1, 'C45 (gris y tachada): fin de la limitación de velocidad impuesta por C43. Vuelve el límite general del lugar.'), image: signWithValue('C45', '70') },

  { ...Q('z-pan-38', 'panneaux', 'pan-interdiction',
    ['Plus tôt, une interdiction de dépasser a été placée. Après ce signal :', 'Elle reste valable jusqu\'au signal C37.', 'Elle ne vaut plus que pour les camions.', 'Elle prend fin, comme toutes les autres.'],
    ['Antes había una prohibición de adelantar. Después de esta señal:', 'Sigue valiendo hasta la señal C37.', 'Ya solo vale para los camiones.', 'Termina, igual que todas las demás.'],
    2, 'C46 pone fin a todas las prohibiciones locales impuestas a los vehículos en marcha: adelantamiento, velocidad, etc.'), signs: ['C46'] },

  { ...Q('z-pan-39', 'panneaux', 'pan-interdiction',
    ['Que dois-je faire à hauteur de ce signal ?', 'M\'arrêter au poste de péage.', 'Ralentir sans m\'arrêter.', 'Payer plus tard en ligne.'],
    ['¿Qué debo hacer a la altura de esta señal?', 'Detenerme en el puesto de peaje.', 'Reducir sin detenerme.', 'Pagar más tarde por internet.'],
    0, 'C47: puesto de peaje; prohibido pasar sin detenerse.'), signs: ['C47'] },

  { ...Q('z-pan-40', 'panneaux', 'pan-additionnels',
    ['Ce signal porte un panneau additionnel. Où commence l\'interdiction ?', 'Ici, et elle vaut sur 200 m.', 'À environ 200 m, plus loin.', 'Elle vaut 200 m avant le signal.'],
    ['Esta señal lleva una placa adicional. ¿Dónde empieza la prohibición?', 'Aquí, y vale durante 200 m.', 'A unos 200 m, más adelante.', 'Vale 200 m antes de la señal.'],
    1, 'Una prohibición puede anunciarse con la misma señal y una placa de distancia (art. 68.2): empieza a esa distancia aproximada.'), image: signWithPanel('C33', distance200) },

  { ...Q('z-pan-41', 'panneaux', 'pan-interdiction',
    ['Ce signal interdit l\'accès :', 'Aux voitures tout-terrain (4×4).', 'Aux quads.', 'Aux motocyclettes à side-car.'],
    ['Esta señal prohíbe el acceso:', 'A los todoterrenos (4×4).', 'A los quads.', 'A las motos con sidecar.'],
    1, 'C6: acceso prohibido a los quads (vehículos de cuatro ruedas para terreno difícil, con manillar y sillín, sin carrocería cerrada).'), signs: ['C6'] },

  /* ================= D — OBLIGATION ================= */
  { ...Q('z-pan-42', 'panneaux', 'pan-obligation',
    ['Que m\'impose ce signal ?', 'D\'aller tout droit.', 'De rouler à sens unique.', 'De rester sur ma bande.'],
    ['¿Qué me impone esta señal?', 'Seguir recto.', 'Circular en sentido único.', 'Mantenerme en mi carril.'],
    0, 'D1 (flecha blanca en círculo azul) obliga a seguir la dirección de la flecha, aquí recto. El sentido único se indica con F19 (rectángulo).'), signs: ['D1a'] },

  { ...Q('z-pan-43', 'panneaux', 'pan-indication',
    ['Ce signal m\'informe que :', 'Je dois aller tout droit au carrefour.', 'La voie est à sens unique.', 'J\'ai la priorité sur cette voie.'],
    ['Esta señal me informa de que:', 'Debo seguir recto en el cruce.', 'La vía es de sentido único.', 'Tengo prioridad en esta vía.'],
    1, 'F19 (flecha blanca en rectángulo azul) indica una vía de sentido único. No obliga a seguir recto en el cruce (eso sería D1, círculo azul).'), signs: ['F19'] },

  { ...Q('z-pan-44', 'panneaux', 'pan-obligation',
    ['Ce signal oblige d\'abord :', 'Les piétons à marcher à droite.', 'Les cyclistes à suivre la piste.', 'Tous les deux-roues à la suivre.'],
    ['Esta señal obliga ante todo:', 'A los peatones a ir por la derecha.', 'A los ciclistas a usar la pista.', 'A todos los de dos ruedas a usarla.'],
    1, 'D7: carril bici obligatorio. Los ciclistas deben usarlo; las motos no pueden circular por él.'), signs: ['D7'] },

  { ...Q('z-pan-45', 'panneaux', 'pan-obligation',
    ['Que signifie ce signal ?', 'Une rue réservée aux jeux d\'enfants.', 'Une zone piétonne interdite aux vélos.', 'Une partie réservée aux piétons et cyclistes.'],
    ['¿Qué significa esta señal?', 'Una calle reservada al juego infantil.', 'Una zona peatonal prohibida a las bicis.', 'Una parte reservada a peatones y ciclistas.'],
    2, 'D10: parte de la vía pública reservada a la circulación de peatones y ciclistas. Los coches no pueden usarla.'), signs: ['D10'] },

  { ...Q('z-pan-46', 'panneaux', 'pan-obligation',
    ['Ce signal (rond bleu) signifie :', 'Un chemin obligatoire pour les piétons.', 'Un passage pour piétons tout proche.', 'Le début d\'une zone piétonne.'],
    ['Esta señal (círculo azul) significa:', 'Un camino obligatorio para peatones.', 'Un paso de peatones muy próximo.', 'El inicio de una zona peatonal.'],
    0, 'D11: camino obligatorio para los peatones. El paso de peatones es F49 y la zona peatonal F103 (rectángulos).'), signs: ['D11'] },

  { ...Q('z-pan-47', 'panneaux', 'pan-obligation',
    ['Ces deux signaux montrent un cavalier. Lequel oblige les cavaliers à emprunter ce chemin ?', 'C15', 'D13', 'Les deux.'],
    ['Estas dos señales muestran un jinete. ¿Cuál obliga a los jinetes a usar ese camino?', 'C15', 'D13', 'Las dos.'],
    1, 'D13 (círculo azul, obligación): camino obligatorio para jinetes. C15 (círculo rojo, prohibición) les prohíbe el acceso.'), signs: ['C15', 'D13'] },

  { ...Q('z-pan-48', 'panneaux', 'pan-obligation',
    ['Ce signal m\'impose :', 'De faire demi-tour.', 'De céder le passage à gauche.', 'De suivre le sens giratoire.'],
    ['Esta señal me impone:', 'Cambiar de sentido.', 'Ceder el paso a la izquierda.', 'Seguir el sentido giratorio.'],
    2, 'D5: sentido giratorio obligatorio; se circula en el sentido de las flechas. La prioridad en la rotonda depende de las señales de prioridad (B1 en la entrada).'), signs: ['D5'] },

  /* ================= Formes ================= */
  Q('z-pan-49', 'panneaux', 'pan-formes',
    ['Un signal rond à fond bleu avec un symbole blanc est un signal :', 'D\'interdiction.', 'D\'obligation.', 'D\'indication.'],
    ['Una señal redonda de fondo azul con símbolo blanco es una señal:', 'De prohibición.', 'De obligación.', 'De indicación.'],
    1, 'Círculo azul = obligación (familia D). Círculo con borde rojo = prohibición (C). Rectángulo = indicación (F).'),

  Q('z-pan-50', 'panneaux', 'pan-formes',
    ['Un signal barré d\'une bande oblique noire ou grise indique en général :', 'La fin de ce qu\'il annonçait.', 'Un danger temporaire.', 'Une interdiction renforcée.'],
    ['Una señal tachada con una banda oblicua negra o gris indica en general:', 'El fin de lo que anunciaba.', 'Un peligro temporal.', 'Una prohibición reforzada.'],
    0, 'La barra oblicua marca el fin: fin de prohibición (C37, C45, C46), fin de zona (F4b, F12b) o fin de población (F3).'),

  Q('z-pan-51', 'panneaux', 'pan-formes',
    ['Un panneau de direction à fond orange signale le plus souvent :', 'Un site touristique.', 'Une sortie d\'autoroute.', 'Une déviation ou des travaux.'],
    ['Un cartel de dirección de fondo naranja indica casi siempre:', 'Un lugar turístico.', 'Una salida de autopista.', 'Un desvío u obras.'],
    2, 'El naranja se usa en la señalización provisional: preaviso e itinerario de desvío (F39, F41) y señales de obras (F79, F85). El marrón es turístico.'),

  /* ================= E — ARRÊT ET STATIONNEMENT ================= */
  { ...Q('z-pan-52', 'panneaux', 'pan-arret',
    ['Ce signal me permet :', 'De stationner moins de 15 minutes.', 'De m\'arrêter pour déposer un passager.', 'De stationner feux de détresse allumés.'],
    ['Esta señal me permite:', 'Estacionar menos de 15 minutos.', 'Pararme para dejar a un pasajero.', 'Estacionar con las luces de emergencia.'],
    1, 'E1 prohíbe el estacionamiento, pero no la parada: subir o bajar personas o cargar y descargar el tiempo necesario. E3 prohibiría también la parada.'), signs: ['E1'] },

  { ...Q('z-pan-53', 'panneaux', 'pan-arret',
    ['Où s\'applique ce signal ?', 'Des deux côtés, jusqu\'au prochain carrefour.', 'De son côté, sur 100 m seulement.', 'De son côté, jusqu\'au prochain carrefour.'],
    ['¿Dónde se aplica esta señal?', 'A los dos lados, hasta el próximo cruce.', 'De su lado, solo durante 100 m.', 'De su lado, hasta el próximo cruce.'],
    2, 'Las señales E valen del lado de la vía donde están colocadas, desde la señal hasta el próximo cruce, salvo placa que indique otra cosa (art. 70.2.2).'), signs: ['E3'] },

  { ...Q('z-pan-54', 'panneaux', 'pan-additionnels',
    ['À 20 h, puis-je m\'arrêter ici pour déposer un passager ?', 'Oui, elle ne vaut que de 7 à 19 h.', 'Non, l\'arrêt y est toujours interdit.', 'Oui, mais seulement le dimanche.'],
    ['A las 20 h, ¿puedo pararme aquí para dejar a un pasajero?', 'Sí, solo vale de 7 a 19 h.', 'No, la parada está siempre prohibida.', 'Sí, pero solo el domingo.'],
    0, 'La placa de horario limita la prohibición de parar y estacionar (E3) a esas horas. Fuera de ellas, la señal no se aplica.'), image: signWithPanel('E3', horaire7a19) },

  { ...Q('z-pan-55', 'panneaux', 'pan-arret',
    ['Nous sommes le 10 du mois. Puis-je stationner du côté de ce signal ?', 'Oui, l\'interdiction commence le 15.', 'Non, c\'est interdit du 1er au 15.', 'Oui, si je mets le disque.'],
    ['Estamos a día 10. ¿Puedo estacionar del lado de esta señal?', 'Sí, la prohibición empieza el 15.', 'No, está prohibido del 1 al 15.', 'Sí, si pongo el disco.'],
    1, 'E5: estacionamiento prohibido del 1 al 15 del mes de ese lado. El cambio de lado se hace el último día del periodo entre las 19 h 30 y las 20 h.'), signs: ['E5'] },

  { ...Q('z-pan-56', 'panneaux', 'pan-arret',
    ['Ce signal est placé au-dessus du panneau d\'entrée de l\'agglomération. Le 5 du mois, je stationne :', 'Du côté des numéros pairs.', 'Des deux côtés, sans restriction.', 'Du côté des numéros impairs.'],
    ['Esta señal está encima del cartel de entrada de la población. El día 5 del mes estaciono:', 'Del lado de los números pares.', 'A los dos lados, sin restricción.', 'Del lado de los números impares.'],
    2, 'E11: estacionamiento alterno quincenal en toda la población. Del 1 al 15 se estaciona del lado de los números impares y del 16 al final del mes del lado de los pares (art. 26).'), signs: ['E11'] },

  { ...Q('z-pan-57', 'panneaux', 'pan-arret',
    ['Je conduis une voiture. Puis-je stationner sur cet emplacement ?', 'Non, il est réservé aux camions.', 'Oui, si je charge des marchandises.', 'Oui, mais la nuit seulement.'],
    ['Conduzco un coche. ¿Puedo estacionar en esta plaza?', 'No, está reservada a los camiones.', 'Sí, si cargo mercancías.', 'Sí, solo de noche.'],
    0, 'E9c: estacionamiento reservado a camionetas y camiones. Un turismo no puede ocuparlo.'), signs: ['E9c'] },

  { ...Q('z-pan-58', 'panneaux', 'pan-arret',
    ['Comment ce signal m\'oblige-t-il à stationner ?', 'Entièrement sur le trottoir.', 'En partie sur le trottoir.', 'Entièrement sur la chaussée.'],
    ['¿Cómo me obliga a estacionar esta señal?', 'Enteramente sobre la acera.', 'En parte sobre la acera.', 'Enteramente en la calzada.'],
    1, 'E9f: estacionamiento obligatorio en parte sobre el arcén o la acera. E9e sería enteramente sobre la acera y E9g en la calzada.'), signs: ['E9f'] },

  { ...Q('z-pan-59', 'panneaux', 'pan-arret',
    ['Il est 20 h. À qui cet emplacement est-il réservé ?', 'Aux bicyclettes.', 'Aux voitures.', 'À tous les véhicules.'],
    ['Son las 20 h. ¿A quién está reservada esta plaza?', 'A las bicicletas.', 'A los coches.', 'A todos los vehículos.'],
    1, 'E9j: la misma plaza se reserva según la hora; aquí bicicletas de 7 h 30 a 18 h y coches (motos, coches, minibuses) de 18 h a 7 h 30.'), signs: ['E9j'] },

  /* ================= F — INDICATION ================= */
  { ...Q('z-pan-60', 'panneaux', 'pan-indication',
    ['Que signifie ce signal ?', 'Une route fermée à toute circulation.', 'Un carrefour en T à 150 m.', 'Une voie sans issue.'],
    ['¿Qué significa esta señal?', 'Una vía cerrada a todo tráfico.', 'Un cruce en T a 150 m.', 'Una vía sin salida.'],
    2, 'F45: vía sin salida (callejón). Se puede entrar, pero habrá que volver por el mismo camino.'), signs: ['F45'] },

  { ...Q('z-pan-61', 'panneaux', 'pan-indication',
    ['Ce signal indique une voie :', 'Sans issue, sauf pour les usagers dessinés.', 'Réservée aux piétons et aux cyclistes.', 'Sans issue pour tous les usagers.'],
    ['Esta señal indica una vía:', 'Sin salida, salvo para los usuarios dibujados.', 'Reservada a peatones y ciclistas.', 'Sin salida para todos los usuarios.'],
    0, 'F45b: vía sin salida, salvo para los usuarios dibujados en la señal, que pueden continuar: en el código, peatones y ciclistas (el dibujo puede añadir otros, como aquí los vehículos agrícolas).'), signs: ['F45b'] },

  { ...Q('z-pan-62', 'panneaux', 'pan-indication',
    ['Que signifie ce signal ?', 'Fin de route pour automobiles.', 'Interdit aux voitures.', 'Fin de l\'autoroute.'],
    ['¿Qué significa esta señal?', 'Fin de vía para automóviles.', 'Prohibido a los coches.', 'Fin de la autopista.'],
    0, 'F11 (el coche de F9 tachado): fin de la vía para automóviles y de sus reglas especiales. El fin de autopista es F7.'), signs: ['F11'] },

  { ...Q('z-pan-63', 'panneaux', 'pan-indication',
    ['Ce signal est placé à l\'entrée d\'un tunnel d\'une longueur de plus de :', '100 m.', '1 000 m.', '500 m.'],
    ['Esta señal se coloca a la entrada de un túnel de una longitud de más de:', '100 m.', '1 000 m.', '500 m.'],
    2, 'F8 señala un túnel de más de 500 m; una placa indica su longitud y a veces su nombre (art. 71.2).'), signs: ['F8'] },

  { ...Q('z-pan-64', 'panneaux', 'pan-indication',
    ['Après ce signal, puis-je de nouveau dépasser un cycliste ?', 'Non, jamais dans une agglomération.', 'Oui, avec les règles habituelles.', 'Oui, mais seulement à 30 km/h.'],
    ['Después de esta señal, ¿puedo volver a adelantar a un ciclista?', 'No, nunca dentro de una población.', 'Sí, con las reglas habituales.', 'Sí, pero solo a 30 km/h.'],
    1, 'F113: fin de la zona o calle ciclista. Termina la prohibición de adelantar a los ciclistas y el límite de 30 km/h propio de la zona; vuelven las reglas normales.'), signs: ['F113'] },

  { ...Q('z-pan-65', 'panneaux', 'pan-indication',
    ['Ce signal indique :', 'Un site bus et tram que je peux franchir.', 'Une bande que je peux emprunter la nuit.', 'Une gare de bus et de trams à proximité.'],
    ['Esta señal indica:', 'Una plataforma bus y tranvía que puedo cruzar.', 'Un carril que puedo usar de noche.', 'Una estación de autobuses y tranvías cerca.'],
    0, 'F18: «site spécial franchissable» reservado al transporte público regular. Se puede cruzar, pero no circular por él.'), signs: ['F18'] },

  { ...Q('z-pan-66', 'panneaux', 'pan-indication',
    ['Ce signal, placé avant un carrefour, me demande :', 'De rester sur la bande de droite.', 'De choisir à temps ma bande.', 'De céder le passage aux bus.'],
    ['Esta señal, colocada antes de un cruce, me pide:', 'Quedarme en el carril derecho.', 'Elegir a tiempo mi carril.', 'Ceder el paso a los autobuses.'],
    1, 'F13 anuncia las flechas pintadas en la calzada: cada carril corresponde a una dirección. Colócate a tiempo en el carril bueno.'), signs: ['F13'] },

  { ...Q('z-pan-67', 'panneaux', 'pan-indication',
    ['Que signifie ce signal ?', 'Circulation dans les deux sens.', 'Passage autorisé à droite ou à gauche.', 'Interdiction de changer de bande.'],
    ['¿Qué significa esta señal?', 'Circulación en los dos sentidos.', 'Se puede pasar por la derecha o por la izquierda.', 'Prohibido cambiar de carril.'],
    1, 'F21: se puede pasar el obstáculo (isleta) por la derecha o por la izquierda. La circulación en los dos sentidos se anuncia con A39.'), signs: ['F21'] },

  { ...Q('z-pan-68', 'panneaux', 'pan-indication',
    ['Ce signal m\'indique que la destination est atteinte :', 'Par une route touristique.', 'Par une déviation.', 'Par l\'autoroute.'],
    ['Esta señal me indica que al destino se llega:', 'Por una ruta turística.', 'Por un desvío.', 'Por la autopista.'],
    2, 'F31: señal de dirección con el símbolo de autopista: el itinerario hasta ese destino sigue una autopista.'), signs: ['F31'] },

  { ...Q('z-pan-69', 'panneaux', 'pan-indication',
    ['Ce signal m\'indique :', 'Un chantier sur la route.', 'Une sortie provisoire fermée.', 'L\'itinéraire de déviation à suivre.'],
    ['Esta señal me indica:', 'Una obra en la carretera.', 'Una salida provisional cerrada.', 'El itinerario de desvío que hay que seguir.'],
    2, 'F41: itinerario de desvío («déviation»), en naranja: síguelo hasta volver a tu ruta. F39 lo anuncia antes.'), signs: ['F41'] },

  { ...Q('z-pan-70', 'panneaux', 'pan-indication',
    ['Ce signal indique :', 'Une piste cyclable obligatoire.', 'Une rue cyclable à 30 km/h.', 'Un passage pour cyclistes.'],
    ['Esta señal indica:', 'Un carril bici obligatorio.', 'Una calle ciclista a 30 km/h.', 'Un paso para ciclistas.'],
    2, 'F50: paso para ciclistas y ciclomotores de dos ruedas (se coloca en el mismo paso; A25 lo anuncia). Debo cederles el paso cuando cruzan.'), signs: ['F50'] },

  { ...Q('z-pan-71', 'panneaux', 'pan-indication',
    ['Ce signal s\'adresse aux conducteurs qui tournent. Il indique que :', 'La piste cyclable est interdite.', 'Des cyclistes suivent la même voie.', 'Les cyclistes doivent céder le passage.'],
    ['Esta señal se dirige a los conductores que giran. Indica que:', 'La pista ciclable está prohibida.', 'Hay ciclistas que siguen por la misma vía.', 'Los ciclistas deben ceder el paso.'],
    1, 'F50bis avisa a quien cambia de dirección de que ciclistas y ciclomotores siguen la misma vía (suelen ir recto por su pista): al girar hay que cederles el paso.'), signs: ['F50bis'] },

  { ...Q('z-pan-72', 'panneaux', 'pan-indication',
    ['Dans un tunnel, ce signal indique :', 'Une issue de secours.', 'Un local technique.', 'Une sortie pour véhicules.'],
    ['En un túnel, esta señal indica:', 'Una salida de emergencia.', 'Un local técnico.', 'Una salida para vehículos.'],
    0, 'F52 (verde, persona corriendo hacia una puerta): salida de emergencia del túnel, para evacuar a pie en caso de incendio.'), signs: ['F52'] },

  { ...Q('z-pan-73', 'panneaux', 'pan-indication',
    ['Ce signal indique :', 'Une bretelle de sortie.', 'Une aire de repos.', 'Une piste de détresse.'],
    ['Esta señal indica:', 'Un ramal de salida.', 'Un área de descanso.', 'Un lecho de frenado.'],
    2, 'F95: «piste de détresse», vía de escape para un vehículo que se queda sin frenos en bajada.'), signs: ['F95'] },

  { ...Q('z-pan-74', 'panneaux', 'pan-indication',
    ['Je roule sur la bande de gauche. Les limites de vitesse de ce signal me concernent-elles ?', 'Oui, elles valent pour toute la chaussée.', 'Oui, la plus basse vaut pour tous.', 'Non, elles ne valent que pour leurs bandes.'],
    ['Circulo por el carril izquierdo. ¿Me afectan los límites de velocidad de esta señal?', 'Sí, valen para toda la calzada.', 'Sí, el más bajo vale para todos.', 'No, solo valen para sus carriles.'],
    2, 'F91: las señales dibujadas sobre un carril solo valen para ese carril (art. 65.4). En el carril izquierdo, sin señal, rige el límite general.'), signs: ['F91'] },

  { ...Q('z-pan-75', 'panneaux', 'pan-indication',
    ['Ce signal orange m\'indique que sur ce tronçon :', 'La circulation se fait dans les deux sens.', 'Il y a quatre bandes dans mon sens.', 'Il est interdit de changer de bande.'],
    ['Esta señal naranja me indica que en este tramo:', 'Se circula en los dos sentidos.', 'Hay cuatro carriles en mi sentido.', 'Está prohibido cambiar de carril.'],
    0, 'F85 (señal provisional de obras): circulación en los dos sentidos en una calzada que normalmente es de sentido único, como en los desvíos de autopista por obras.'), signs: ['F85'] },

  { ...Q('z-pan-76', 'panneaux', 'pan-indication',
    ['Ce signal, placé juste devant moi, indique :', 'Une plaine de jeux.', 'Un dispositif surélevé.', 'Un passage pour piétons.'],
    ['Esta señal, justo delante de mí, indica:', 'Un parque infantil.', 'Un resalto (dispositivo elevado).', 'Un paso de peatones.'],
    1, 'F87 se coloca en el propio resalto («dispositif surélevé»), que A14 anuncia antes. Se pasa a 30 km/h como máximo.'), signs: ['F87'] },

]
