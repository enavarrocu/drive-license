import type { Question } from '../types'
import { Q } from './q'

/**
 * Bloque 7 (nov 2026): huecos detectados al comparar el banco con simulacros reales.
 * Preguntas de texto o con señal (alcohol, permiso, alumbrado, usuarios, mecánica…), ids `z7-<tema>-NN`.
 * Incluye preguntas «oui / non» de dos opciones, como en el examen real.
 */
export const extraQuestions7: Question[] = [
  /* ============ ALCOOL ============ */
  Q('z7-alc-01', 'alcool', 'alc-taux',
    ["J'ai un permis provisoire et mon guide est assis à côté de moi. La police peut-elle lui imposer, à lui aussi, un test de l'haleine ?", 'Oui.', 'Non.'],
    ['Tengo permiso provisional y mi guía va sentado a mi lado. ¿Puede la policía imponerle también a él una prueba de alcoholemia?', 'Sí.', 'No.'],
    0, 'Sí. La ley de 16/3/1968 (art. 59 §1, 2°) permite imponer el «test de l\'haleine» a quien conduce y también a quien «accompagne un conducteur en vue de l\'apprentissage». El guía está sometido a los mismos límites que el conductor y, si da positivo, tampoco puede acompañar durante 12 h (art. 60 §3).', true),
  Q('z7-alc-02', 'alcool', 'alc-taux',
    ["Mon analyse de l'haleine indique 0,25 mg/l : on m'interdit de conduire pendant 12 heures. Puis-je rentrer chez moi à vélo pendant ce temps ?", 'Oui.', 'Non.'],
    ['Mi prueba de aire espirado da 0,25 mg/l: me prohíben conducir durante 12 horas. ¿Puedo volver a casa en bici durante ese tiempo?', 'Sí.', 'No.'],
    1, 'No. Desde 0,22 mg/l (0,5 g/l) la ley prohíbe durante 12 h conducir «un véhicule ou une monture» (ley de 16/3/1968, art. 60 §3), y la bici es un vehículo (Code de la route, art. 2.14: «tout moyen de transport par terre»). Conducir durante la prohibición es una infracción aparte (ley, art. 34 §2, 2°).', true),
  Q('z7-alc-03', 'alcool', 'alc-taux',
    ["Après un contrôle positif, je suis interdit de conduire pendant 12 heures. Pendant ce délai, je peux :", 'Rentrer à cheval, ce n\'est pas un véhicule.', 'Accompagner un ami qui a un permis provisoire.', 'Rentrer comme passager dans une autre voiture.'],
    ['Tras un control positivo, me prohíben conducir durante 12 horas. Durante ese plazo, puedo:', 'Volver a caballo, no es un vehículo.', 'Acompañar a un amigo con permiso provisional.', 'Volver como pasajero en otro coche.'],
    2, 'La prohibición de 12 h (ley de 16/3/1968, art. 60 §3) afecta a conducir un vehículo, montar a caballo («une monture») y acompañar a un aprendiz. Ir de pasajero no está prohibido: lo más sensato es que te lleve alguien sobrio o volver en transporte público.', true),
  Q('z7-alc-04', 'alcool', 'alc-taux',
    ["Je ne bois plus et mon taux est de 0,8 g/l. Le corps élimine environ 0,15 g/l par heure. Combien de temps faut-il, au minimum, pour redescendre à 0,5 g/l ?", 'Environ 30 minutes.', 'Au moins 2 heures.', 'Il suffit de boire un café.'],
    ['Ya no bebo y mi tasa es de 0,8 g/l. El cuerpo elimina unos 0,15 g/l por hora. ¿Cuánto tiempo hace falta, como mínimo, para bajar a 0,5 g/l?', 'Unos 30 minutos.', 'Al menos 2 horas.', 'Basta con tomar un café.'],
    1, 'Hay que eliminar 0,3 g/l: a ~0,15 g/l por hora son unas 2 horas, y más si el hígado va más lento (unos 0,1 g/l por hora en algunas personas). Café, agua o ducha no aceleran nada. Y bajar a 0,5 no es estar en forma: lo seguro es no conducir tras beber.'),

  /* ============ PERMIS ============ */
  Q('z7-per-01', 'permis', 'per-provisoire',
    ["Je n'ai qu'un permis de conduire provisoire pour la catégorie B. Puis-je conduire un cyclomoteur ?", 'Oui.', 'Non.'],
    ['Solo tengo un permiso de conducir provisional de la categoría B. ¿Puedo conducir un ciclomotor?', 'Sí.', 'No.'],
    1, 'No. El permiso provisional solo vale para aprender a conducir los vehículos de la categoría para la que se expide (AR de 23/3/1998, art. 8 §3). Es el permiso B definitivo el que vale también para la categoría AM (art. 20 §1, 4°); hasta entonces, para un ciclomotor hace falta el permiso AM.'),
  Q('z7-per-02', 'permis', 'per-sanctions',
    ["J'ai mon permis B depuis un an. Je suis condamné pour une infraction commise en voiture qui peut entraîner une déchéance. Le juge :", 'Doit prononcer la déchéance et m\'imposer un examen.', 'Peut seulement me donner une amende plus forte.', 'Me traite comme un conducteur expérimenté.'],
    ['Tengo el permiso B desde hace un año. Me condenan por una infracción cometida en coche que puede conllevar una retirada. El juez:', 'Debe imponer la retirada y exigirme un examen.', 'Solo puede ponerme una multa más alta.', 'Me trata como a un conductor experimentado.'],
    0, 'Ley de 16/3/1968, art. 38 §5: si el condenado tiene el permiso B desde hace menos de dos años y la infracción, cometida con un vehículo a motor, puede dar lugar a «déchéance du droit de conduire», el juez debe pronunciarla y supeditar la recuperación del derecho a conducir al menos al examen teórico o práctico (puede añadir o sustituirlo por una formación).'),

  /* ============ ÉCLAIRAGE ============ */
  Q('z7-ecl-01', 'eclairage', 'x4-ecl-usage',
    ['La nuit, hors agglomération, je roule en feux de route. Un cavalier arrive en face de moi sur le bord de la route. Dois-je passer en feux de croisement ?', 'Oui.', 'Non.'],
    ['De noche, fuera de población, circulo con las luces largas. Un jinete viene de frente por el borde de la carretera. ¿Debo pasar a las luces de cruce?', 'Sí.', 'No.'],
    0, 'Sí. Las largas se cambian por las de cruce «à l\'approche d\'un usager venant en sens inverse» (art. 30.1, 1°, a): no solo ante un coche, sino ante cualquier usuario que viene de frente, también un jinete, un ciclista o un peatón, a la distancia necesaria para que siga sin peligro.'),
  Q('z7-ecl-02', 'eclairage', 'ecl-feux',
    ['Il pleut très fort et je ne vois plus distinctement à 200 m. Ma voiture a des feux de brouillard avant et arrière. Que dit le code ?', 'Les deux sont interdits, ils sont réservés au brouillard.', 'Les deux doivent être allumés en même temps.', 'Le feu arrière est obligatoire, ceux de l\'avant sont permis.'],
    ['Llueve muy fuerte y ya no veo con claridad a 200 m. Mi coche tiene antiniebla delanteros y trasero. ¿Qué dice el código?', 'Los dos están prohibidos, son solo para la niebla.', 'Los dos deben ir encendidos a la vez.', 'El trasero es obligatorio, los delanteros están permitidos.'],
    2, 'Art. 30.1: los antiniebla delanteros «ne peuvent être utilisés qu\'en cas de brouillard, de chute de neige ou de forte pluie» (permitidos, no obligatorios); el antiniebla trasero «doit être utilisé» con niebla o nieve que reducen la visibilidad a menos de unos 100 m «ainsi qu\'en cas de forte pluie», y está prohibido en cualquier otro caso.'),

  /* ============ USAGERS FAIBLES ============ */
  Q('z7-usa-01', 'usagers-faibles', 'x4-usa-protection',
    ["Un enfant sur une trottinette sans moteur s'engage au pas sur un passage pour piétons. Dois-je lui céder le passage comme à un piéton ?", 'Oui.', 'Non.'],
    ['Un niño en un patinete sin motor entra al paso en un paso de peatones. ¿Debo cederle el paso como a un peatón?', 'Sí.', 'No.'],
    0, 'Sí. Un patinete sin motor es un «engin de déplacement non motorisé» (art. 2.15.2); quien lo usa sin superar el paso de una persona se asimila a un peatón (art. 7bis), y las reglas que los demás deben respetar frente a los peatones valen también para él. Si fuera más rápido, se asimilaría a un ciclista.'),
  { ...Q('z7-usa-02', 'usagers-faibles', 'x4-usa-protection',
    ['Ce signal est placé le long de la route. Concerne-t-il l\'utilisateur d\'une trottinette électrique ?', 'Non, il ne vise que les vélos.', 'Oui, il est assimilé à un cycliste.', 'Non, il doit rouler sur le trottoir.'],
    ['Esta señal está colocada a lo largo de la carretera. ¿Afecta al usuario de un patinete eléctrico?', 'No, solo se refiere a las bicis.', 'Sí, se asimila a un ciclista.', 'No, debe circular por la acera.'],
    1, 'La señal indica un carril bici obligatorio (art. 9.1.2). Los usuarios de «engins de déplacement motorisés» se asimilan a los ciclistas (art. 7bis), así que deben seguirlo como ellos y no van por la acera. Excepción: la persona con movilidad reducida que usa un aparato destinado a ella y va al paso se asimila a un peatón.'), signs: ['D7'] },
  { ...Q('z7-usa-03', 'usagers-faibles', 'usa-cyclistes',
    ['Je suis en voiture et je vois ce signal à l\'entrée d\'une rue. Puis-je y entrer ?', 'Oui.', 'Non.'],
    ['Voy en coche y veo esta señal a la entrada de una calle. ¿Puedo entrar?', 'Sí.', 'No.'],
    0, 'Sí. Art. 22novies: toda «zone cyclable» es accesible a los vehículos a motor, pero no pueden adelantar a los ciclistas (ni a los speed pedelecs) y la velocidad nunca puede superar 30 km/h. Los ciclistas pueden usar toda la anchura de la calzada si es de sentido único, o la mitad derecha si es de doble sentido.'), signs: ['F111'] },

  /* ============ ACCIDENTS / PANNE ============ */
  Q('z7-acc-01', 'accidents', 'acc-panne',
    ["Ma voiture tombe en panne dans un tunnel et s'immobilise sur la chaussée. Pour avertir aussitôt ceux qui me suivent, je commence par :", 'Allumer les feux de détresse.', 'Allumer les feux de brouillard avant.', 'Klaxonner de façon prolongée.'],
    ['Mi coche se avería en un túnel y se queda parado en la calzada. Para avisar enseguida a los que vienen detrás, empiezo por:', 'Encender las luces de emergencia.', 'Encender los antiniebla delanteros.', 'Tocar el claxon de forma prolongada.'],
    0, 'Los cuatro intermitentes («feux de détresse») sirven precisamente para señalar un vehículo averiado (art. 32bis y art. 51.1). Ojo: legalmente no sustituyen al «triangle de danger», que es obligatorio si el coche queda donde la parada está prohibida (art. 51.1); en un túnel, después, sal con el chaleco puesto, ponte a salvo y avisa (poste SOS o 112).'),

  /* ============ MÉCANIQUE ============ */
  Q('z7-mec-01', 'mecanique', 'mec-moteur',
    ['Pourquoi ne faut-il jamais laisser tourner le moteur dans un garage fermé ?', 'Le moteur risque de surchauffer sans vent.', 'La batterie se décharge plus vite.', 'Les gaz d\'échappement contiennent un gaz mortel.'],
    ['¿Por qué nunca hay que dejar el motor en marcha en un garaje cerrado?', 'El motor puede calentarse sin viento.', 'La batería se descarga más deprisa.', 'Los gases de escape contienen un gas mortal.'],
    2, 'Los gases de escape contienen «monoxyde de carbone» (monóxido de carbono, CO): incoloro e inodoro, en un local cerrado se acumula y puede causar mareo, pérdida de conciencia y la muerte en pocos minutos. Arranca y sal enseguida, o abre la puerta del garaje antes (conocimiento general de seguridad; el catalizador reduce el CO pero no lo elimina).'),
  Q('z7-mec-02', 'mecanique', 'mec-moteur',
    ["Je retire la jauge pour contrôler l'huile du moteur. Le niveau correct se situe :", 'Au-dessus du repère maximum.', 'Entre les repères minimum et maximum.', 'Juste sous le repère minimum.'],
    ['Saco la varilla para comprobar el aceite del motor. El nivel correcto está:', 'Por encima de la marca máxima.', 'Entre las marcas mínima y máxima.', 'Justo por debajo de la marca mínima.'],
    1, 'El aceite se mide con la «jauge» (varilla), con el motor parado (unos minutos, para que el aceite baje al cárter) y el coche en llano. El nivel debe estar entre «min» y «max»: por debajo del mínimo, el motor se lubrica mal; por encima del máximo, el exceso también lo daña. Se completa con el aceite que indica el fabricante.'),

  /* ============ COMPORTEMENT ============ */
  Q('z7-com-01', 'comportement', 'com-eco',
    ["J'attends devant un passage à niveau fermé ; un long train de marchandises passe. Puis-je laisser tourner le moteur au point mort pendant toute l'attente ?", 'Oui.', 'Non.'],
    ['Espero ante un paso a nivel cerrado; pasa un largo tren de mercancías. ¿Puedo dejar el motor en marcha en punto muerto durante toda la espera?', 'Sí.', 'No.'],
    1, 'No. El conductor debe «veiller à ne pas laisser le moteur en marche au point mort sauf en cas de nécessité» (art. 8.6): es una regla general, no propia de los pasos a nivel. En una espera larga se corta el motor: al ralentí consume y contamina sin avanzar.'),
]
