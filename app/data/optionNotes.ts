/**
 * Explication par option : pourquoi chaque mauvaise réponse est fausse.
 * Clé = id de la question ; une entrée par option, dans le même ordre que les options ;
 * `null` pour la bonne réponse (ou quand la note n'apporte rien).
 * Textes en espagnol, une phrase, sans répéter le `why` de la question.
 * Pour l'instant : toutes les questions de faute grave (`grave: true`).
 */
export const optionNotes: Record<string, (string | null)[]> = {
  // ── Priorité ─────────────────────────────────────────────────────────────
  'prio-01': [
    'Una calle ancha no es «vía con prioridad»: sin señal B9 o B15 manda la derecha, no el tamaño de la vía.',
    null,
    'La velocidad no da ningún derecho: la prioridad depende de por dónde llega cada uno, no de quién va más rápido.',
  ],
  'prio-02': [
    null,
    'Parar no es renunciar: el art. 12.3.1 no prevé que la prioridad se pierda por detenerse, y pasar delante de él puede acabar en choque si arranca.',
    'La prioridad la da la regla, no un gesto: el conductor de la derecha no tiene que hacer ninguna señal para conservarla.',
  ],
  'prio-03': [
    'Salir de un aparcamiento es una maniobra (art. 12.4): quien la hace no puede invocar la prioridad de la derecha.',
    null,
    'El orden de llegada no cuenta nunca en el código: quien sale de la propiedad cede a los que circulan por la calzada.',
  ],
  'prio-04': [
    'Reducir y pasar si está libre es lo que permite el «ceder el paso» B1; el STOP exige parar del todo.',
    null,
    'Con STOP la parada es obligatoria aunque no llegue nadie; solo después se mira a quién ceder.',
  ],
  'prio-08': [
    'El semáforo está por debajo del agente en la jerarquía: su verde queda anulado por la orden de parar.',
    null,
    'El claxon no da derecho de paso (solo sirve para evitar un accidente, art. 33.2): hay que obedecer al agente.',
  ],
  'prio-09': [
    'El ámbar intermitente no da prioridad a nadie: solo avisa de que el semáforo no regula el cruce y obliga a pasar con prudencia.',
    null,
    'La prioridad de la derecha solo se aplica cuando no hay señales; aquí hay una B1 y es ella la que manda.',
  ],
  'prio-10': [
    'Entrar en la rotonda no me da la prioridad de la derecha: la B1 de mi entrada me obliga a ceder a los del anillo.',
    null,
    'La velocidad no da prioridad: en una rotonda señalizada cede siempre quien entra.',
  ],
  'sc-01': [
    'A llega por mi derecha (E): sin señales soy yo quien debe cederle.',
    'No hay bloqueo con dos vehículos: la prioridad de la derecha decide, A pasa y después yo.',
    null,
  ],
  'sc-02': [
    null,
    'A llega por mi izquierda: yo estoy a su derecha, así que es A quien debe cederme.',
    'No hay bloqueo con dos vehículos: la prioridad de la derecha decide a mi favor.',
  ],
  'sc-03': [
    null,
    'No puedo pasar primero: A llega por mi derecha (E) y tengo que cederle.',
    'B no puede pasar primero: yo estoy a su derecha, así que B me cede a mí.',
  ],
  'sc-04': [
    'No puedo pasar primero: A está a mi derecha y debo cederle.',
    'A no puede pasar antes que B: B llega por la derecha de A (la derecha de quien viene del E es el N).',
    null,
  ],
  'sc-05': [
    'Girar a la izquierda no da prioridad: corto la trayectoria de A, que va recto, y debo cederle.',
    'El orden de llegada no cuenta: el que gira a la izquierda cede al que viene de frente.',
    null,
  ],
  'sc-06': [
    null,
    'A gira a su izquierda y corta mi trayectoria: es él quien cede al que viene de frente.',
    'Hay una regla clara para este caso (el giro a la izquierda cede), así que nadie tiene que quedarse esperando.',
  ],
  'sc-07': [
    'Que A también gire no cambia nada: viene de frente y el que gira a la izquierda le cede.',
    'El claxon no da prioridad (art. 33.2): decide la regla del giro a la izquierda.',
    null,
  ],
  'sc-08': [
    'Estar en la vía que continúa no da prioridad sin una señal B9 o B15: A sigue viniendo por mi derecha.',
    'A no tiene ni B1 ni STOP: no tiene por qué detenerse ni cederme.',
    null,
  ],
  'sc-09': [
    'Pararse no es renunciar a la prioridad; si paso y A arranca en ese momento, el choque sería culpa mía.',
    'La bocina no le quita la prioridad ni le obliga a arrancar (art. 33.2): le cedo el paso.',
    null,
  ],
  'sc-10': [
    'A circula en sentido prohibido: ha perdido la prioridad de la derecha.',
    'Hay una regla aplicable: como A pierde la prioridad, paso yo, con prudencia.',
    null,
  ],
  'sc-11': [
    'Para el ciclista la calle no es de sentido prohibido: la placa M lo autoriza, así que conserva la prioridad.',
    'Ninguna norma obliga al ciclista a bajarse: circula legalmente y tiene prioridad.',
    null,
  ],
  'sc-12': [
    'Con B1 no basta con mirar a la derecha: cedo a todos los de la vía transversal, también a los de la izquierda.',
    'El orden de llegada no cuenta: la señal B1 me obliga a ceder.',
    null,
  ],
  'sc-13': [
    'La prioridad de la derecha no se aplica cuando hay señales: A tiene B1 y debe cederme.',
    'Hay una regla clara (las señales B9 y B1): paso yo.',
    null,
  ],
  'sc-14': [
    'Con STOP no basta con reducir aunque la vía parezca libre: hay que inmovilizarse del todo.',
    'La parada en el STOP no depende de la distancia de A: es obligatoria siempre.',
    null,
  ],
  'sc-15': [
    'La B15 anula la prioridad de la derecha en ese cruce: A tiene B1 o STOP y debe cederme.',
    'La velocidad no cuenta para la prioridad: deciden las señales.',
    null,
  ],
  'sc-16': [
    'La B17 no me da prioridad: anuncia justamente que en ese cruce se cede a la derecha.',
    'A no tiene ninguna señal que le obligue a detenerse: viene por mi derecha y pasa.',
    null,
  ],
  'sc-17': [
    'La vía con prioridad no me libra de ceder al que viene de frente cuando giro a la izquierda.',
    'El orden de llegada no cuenta: el giro a la izquierda me obliga a ceder.',
    null,
  ],
  'sc-18': [
    null,
    'Con B1 no puedo pasar primero: cedo a A y a B, que circulan por la vía con prioridad.',
    'B gira a la izquierda y debe ceder a A, que va recto de frente; y yo, con B1, paso el último.',
  ],
  'sc-19': [
    'A tiene un STOP: debe parar y cederme, aunque venga por mi derecha.',
    'El ámbar intermitente no bloquea el cruce: deciden las señales y paso yo con prudencia.',
    null,
  ],
  'sc-20': [
    'El ámbar intermitente es igual para todos y no da prioridad: vuelve la regla de la derecha.',
    'No hay que esperar a que se repare: con ámbar intermitente se pasa con prudencia aplicando las reglas de prioridad.',
    null,
  ],
  'sc-21': [
    'El verde permite girar, pero no quita la prioridad al peatón que cruza la calle en la que entro (art. 19.5).',
    'La bocina no sirve para meter prisa: solo para evitar un accidente (art. 33.2).',
    null,
  ],
  'sc-22': [
    'El rojo prohíbe rebasar la línea de detención sin excepción, aunque no venga nadie.',
    'Avanzar hasta el centro ya es pasar en rojo: hay que quedarse antes de la línea de detención.',
    null,
  ],
  'sc-23': [
    'Que el tranvía venga por mi izquierda no me da prioridad: los vehículos sobre raíles no siguen la regla de la derecha.',
    'El orden de llegada no cuenta: en un cruce sin señales el tranvía pasa siempre primero.',
    null,
  ],
  'sc-24': [
    'El tranvía no tiene prioridad absoluta: si su vía tiene B1, cede como cualquier otro.',
    null,
    'Hay una regla clara: las señales dan la prioridad a mi vía.',
  ],
  'sc-25': [
    'El verde no prevalece frente a un vehículo prioritario con luz azul y sirena (art. 38).',
    null,
    'Acelerar para cruzar antes es competir con la ambulancia: hay que dejarle el paso y, si hace falta, pararse.',
  ],
  'sc-26': [
    'Sin sirena el coche de policía no es prioritario: vale la regla normal y él viene por mi izquierda.',
    null,
    'No hay bloqueo: la prioridad de la derecha decide a mi favor.',
  ],
  'sc-27': [
    'La B1 de mi entrada me obliga a ceder a A, que ya circula por el anillo.',
    null,
    'No pasa el primero que entra: quien ya está en el anillo tiene prioridad sobre quien entra.',
  ],
  'sc-28': [
    'Girar alrededor de una isleta no da prioridad: sin D5 ni B1/B5 no es una rotonda en sentido legal.',
    null,
    'Hay una regla clara, la prioridad de la derecha, y yo estoy a la derecha de A.',
  ],
  'sc-29': [
    null,
    'Circular por la rotonda no da prioridad sobre los peatones y ciclistas que cruzan la salida: al salir, les cedo.',
    'Para salir se indica a la derecha, no a la izquierda, y se cede a peatones y ciclistas, no a los vehículos.',
  ],
  'sc-30': [
    'Al girar, el peatón que cruza tiene prioridad: no se le gana la carrera.',
    null,
    'El claxon no da prioridad ni sirve para apremiar (art. 33.2): cedo y espero a que cruce.',
  ],
  'sc-31': [
    'La prioridad de la derecha no se aplica al incorporarse: es un cambio de carril y quien lo hace cede (art. 12.4).',
    null,
    'La velocidad no da prioridad: quien se incorpora cede a los que ya circulan.',
  ],
  'sc-32': [
    'A sale de un aparcamiento privado: aunque llegue por mi derecha, no puede invocar la prioridad de la derecha.',
    null,
    'Hay una regla clara: quien sale de una propiedad cede, así que paso yo.',
  ],
  'sc-33': [
    'A no tiene ningún obstáculo en su lado: cede quien tiene el obstáculo en su carril, es decir, yo.',
    null,
    'Alguien tiene que ceder: el obstáculo está en mi lado, así que soy yo.',
  ],
  'sc-34': [
    null,
    'Paso primero: mi derecha está libre y B, que gira a la izquierda de frente, me cede.',
    'B no puede pasar primero: tiene a A a su derecha y además gira a la izquierda delante de mí.',
  ],
  'sc-35': [
    'Que no cruce su trayectoria no me exime: la prioridad de la derecha no depende de hacia dónde voy.',
    null,
    'El orden de llegada no cuenta: A viene por mi derecha y tiene prioridad.',
  ],
  'y-pri-01': [
    'El giro de A no cambia nada: viene por mi derecha y conserva la prioridad.',
    'La velocidad no cuenta: sin señales manda la prioridad de la derecha.',
    null,
  ],
  'y-pri-02': [
    null,
    'El tamaño del vehículo no da ninguna prioridad en el código.',
    'Pasar todos a la vez es provocar un choque: uno tiene que ceder primero para desbloquear.',
  ],
  'y-pri-03': [
    'A está a mi izquierda: entre los dos, la prioridad de la derecha me favorece a mí.',
    'Hay una regla clara: tras ceder a la vía prioritaria, entre A y yo manda la derecha.',
    null,
  ],
  'y-pri-04': [
    'Aunque el peatón esté en infracción, debo dejarle terminar: nunca se le pone en peligro.',
    'La bocina no sirve para apremiar a un peatón (art. 33.2): se espera a que termine.',
    null,
  ],
  'y-pri-05': [
    'A tiene B1 en su entrada: aunque esté a mi derecha, debe cederme a mí, que ya estoy en el anillo.',
    'Hay una regla clara: el que está en el anillo pasa.',
    null,
  ],
  'y-pri-06': [
    'Ante un vehículo prioritario con sirena hay que dejar el paso (art. 38): quedarse inmóvil si puedo apartarme sin peligro no cumple.',
    'Huir por varias calles delante de él lo retrasa y crea peligro: hay que apartarse en cuanto se pueda.',
    null,
  ],
  'z-prio-01': [
    null,
    'Giro a la izquierda: aunque esté en la vía con prioridad, cedo a A, que viene de frente.',
    'No paso primero (cedo a A), y B, con B1, pasa el último, después de los dos.',
  ],
  'z-prio-02': [
    'A no puede pasar antes que el tranvía: los vehículos sobre raíles tienen prioridad sobre todos.',
    null,
    'A debe ceder al tranvía, que pasa primero, aunque A llegue por mi derecha.',
  ],
  'z-prio-03': [
    null,
    'El intermitente no es una garantía: si A sigue por el anillo, le corto el paso.',
    'El claxon no cambia la prioridad (art. 33.2): A puede seguir por el anillo y tiene derecho a hacerlo.',
  ],
  'z-prio-04': [
    'El sentido único no da prioridad: solo la dan las señales (B9, B15) o los semáforos.',
    null,
    'El orden de llegada no cuenta: A viene por mi derecha.',
  ],
  'z-prio-05': [
    'La ambulancia con sirena pasa antes que yo, aunque yo esté en la vía con prioridad.',
    'A no puede pasar antes que yo: tiene B1 y cede a la vía con prioridad.',
    null,
  ],
  'z-prio-06': [
    'B tiene B1: cede a los dos que circulan por la vía con prioridad, así que no puede pasar primero.',
    'A gira a la izquierda: cede al que viene de frente, es decir, a mí.',
    null,
  ],
  'z-prio-07': [
    'Los dos tenemos verde: entre nosotros manda la regla del giro a la izquierda, que me obliga a ceder.',
    'Girar rápido delante de A es justamente no cederle el paso, con riesgo de choque lateral.',
    null,
  ],
  'z-prio-09': [
    'B no puede pasar primero: yo estoy a su derecha, así que B me cede.',
    null,
    'No paso primero: A viene por mi derecha y le cedo.',
  ],
  'z-prio-10': [
    null,
    'Un coche no tiene prioridad sobre una bici: la regla de la derecha vale para todos los conductores.',
    'El orden de llegada no cuenta: el ciclista viene por la derecha.',
  ],
  'z-prio-11': [
    'Tras la B11 ya no estoy en una vía con prioridad: en el cruce siguiente vuelve la regla general.',
    'No hay que detenerse sistemáticamente en cada cruce: basta con ceder a la derecha (parando si hace falta).',
    null,
  ],
  'z-prio-12': [
    'Quien sale de un camino de tierra no puede invocar la prioridad de la derecha (art. 12.3.1 b).',
    'El orden de llegada no cuenta: quien sale del camino de tierra cede.',
    null,
  ],
  'z-prio-13': [
    'El verde no autoriza a entrar si voy a quedarme parado bloqueando el cruce.',
    null,
    'Entrar y apremiar a la fila con el claxon no la hace avanzar y bloquea el cruce igual.',
  ],
  'z-prio-14': [
    null,
    'El semáforo está por debajo del agente: su orden de avanzar prevalece sobre el rojo.',
    'La orden del agente no está condicionada a mi apreciación: avanzo, con prudencia, porque él lo ordena.',
  ],
  'z-prio-15': [
    'La obligación de dejar salir al autobús solo existe dentro de población (art. 39).',
    null,
    'Llevar pasajeros no cambia nada: fuera de población no hay obligación.',
  ],

  // ── Vitesse et distance ──────────────────────────────────────────────────
  'vit-01': [
    '50 km/h es el límite general en población en Flandes y Valonia; en Bruselas solo vale donde una señal lo indique.',
    null,
    '70 km/h es un límite de fuera de población (o de ejes señalizados), nunca el de por defecto en ciudad.',
  ],
  'vit-02': [
    '70 km/h es el límite fuera de población en Flandes y Bruselas, no en Valonia.',
    null,
    '120 km/h es el límite de autopista y de las vías de 2×2 carriles con mediana, no el de una carretera ordinaria.',
  ],
  'vit-03': [
    null,
    '90 km/h es el límite fuera de población en Valonia, no en Flandes.',
    'Ninguna región belga fija 100 km/h por defecto en carretera ordinaria: Flandes 70, Valonia 90.',
  ],
  'vit-04': [
    null,
    'En Bélgica no existen los 130 km/h (son el límite francés) y el mínimo en autopista es 70.',
    'En autopista sí hay mínimo: nadie puede circular a menos de 70 km/h salvo que una señal C43 lo baje (art. 21.2).',
  ],
  'vit-05': [
    '30 km/h es el límite de una «zone 30», no el de una zona residencial.',
    null,
    '10 km/h no es el límite reglamentario de esta zona: el código fija 20 km/h.',
  ],
  'vit-06': [
    null,
    'En la calle ciclista el máximo es 30 km/h y no se adelanta a los ciclistas: las dos partes de esta respuesta son falsas.',
    'En la calle ciclista no se adelanta a los ciclistas ni dejando 1 m, y sí hay límite: 30 km/h.',
  ],
  'vit-07': [
    null,
    'Un segundo apenas cubre el tiempo de reacción: no deja margen si el de delante frena en seco.',
    'Una distancia fija no sirve: la necesaria crece con la velocidad, y 10 m es muy poco ya a 50 km/h.',
  ],
  'vit-10': [
    'El límite es un máximo para buenas condiciones: con lluvia fuerte, ir a 90 puede ser una velocidad inadaptada (art. 10.1).',
    null,
    'Las luces largas no compensan la lluvia (el agua las refleja y deslumbran a los demás): lo que exige la ley es adaptar la velocidad.',
  ],
  'x-voie-05': [
    '20 km/h solo vale dentro de la zona residencial; la señal F12b marca su final.',
    '30 km/h es el límite por defecto en Bruselas; en una población valona sin señal son 50.',
    null,
  ],
  'x-vit-01': [
    null,
    'El agua reduce la adherencia de los neumáticos: hace falta más distancia para detenerse, no la misma.',
    'Con menos adherencia la distancia de frenado nunca disminuye: aumenta.',
  ],
  'x-vit-02': [
    'A 90 km/h necesitaría más del doble de los 50 m que veo para detenerme.',
    'A 70 km/h ya necesito unos 70 m, más de los 50 m que iluminan las luces de cruce.',
    null,
  ],
  'x-vit-04': [
    'Bélgica sí lo prohíbe: el art. 10.1, 2° exige una distancia suficiente con el vehículo de delante.',
    'La obligación de guardar distancia vale en todas las vías, no solo en autopista.',
    null,
  ],
  'y-ecl-07': [
    null,
    'Seguir las luces del de delante da una falsa seguridad y lleva a ir pegado: si frena, no tengo margen.',
    'La velocidad máxima está pensada para buenas condiciones: con niebla hay que ir mucho más despacio.',
  ],
  'y-vit-01': [
    '90 km/h es el límite de una carretera ordinaria fuera de población en Valonia, no el de una 2×2 con mediana.',
    'El código no fija 100 km/h para estas vías: el límite general es 120, salvo señal.',
    null,
  ],
  'y-vit-02': [
    null,
    'El C43 no vale hasta la siguiente señal: termina en el siguiente cruce, salvo validez zonal.',
    'No pasa automáticamente a 50: vuelve el límite general del lugar, que depende de si es población y de la región.',
  ],
  'y-vit-04': [
    null,
    '30 m es menos de un segundo a 120 km/h (unos 33 m/s): demasiado poco.',
    '120 m son casi 4 segundos a esa velocidad: no es la distancia de 2 segundos que se pregunta.',
  ],
  'z-vit-01': [
    'El límite de 90 km/h en autopista afecta a los vehículos o conjuntos de más de 3,5 t de MMA, no a uno de 3 t.',
    'No hay un límite especial de 100 km/h para un coche con remolque ligero: valen los límites del coche.',
    null,
  ],
  'z-vit-02': [
    '10 m es lo que se recorre en menos de medio segundo a 90 km/h.',
    null,
    '80 m es aproximadamente la distancia de frenado a 90 km/h, no la de reacción.',
  ],
  'z-vit-03': [
    'La distancia de frenado no crece en proporción a la velocidad, sino con su cuadrado.',
    '6 sería el doble de 3, pero el frenado crece con el cuadrado: 3 × 3.',
    null,
  ],
  'z-vit-04': [
    null,
    'La de frenado depende de la velocidad, los frenos, los neumáticos y la calzada, no del estado del conductor.',
    'Sí alargan una: la de reacción, porque tardo más en empezar a frenar.',
  ],
  'z-vit-05': [
    null,
    'Dos segundos es el mínimo con tiempo seco: con calzada mojada no basta.',
    'Ir algo más despacio no compensa: con mojado la adherencia baja y necesito más distancia, no menos.',
  ],
  'z-vit-06': [
    null,
    'En Bélgica el permiso provisional no tiene un límite especial de 100 km/h.',
    '90 km/h es el límite en autopista para los vehículos de más de 3,5 t, no para los conductores con permiso provisional.',
  ],
  'z-vit-07': [
    'Sí puede ser una falta: circular sin motivo a una velocidad anormalmente baja y molestar a los demás está prohibido.',
    'No hay un mínimo fijo de 30 km/h en carretera: lo que cuenta es no ir anormalmente despacio sin motivo.',
    null,
  ],
  'z-vit-08': [
    'Sí hay excepciones: una señal C43 puede fijar 50 o 70 en algunos ejes.',
    null,
    'El 30 no se limita a las escuelas: es el límite por defecto en toda la región.',
  ],
  'z-vit-09': [
    null,
    'El límite es un máximo: ante niños que juegan hay que reducir para poder parar.',
    'El claxon no sustituye a reducir la velocidad: un niño puede salir corriendo sin mirar.',
  ],
  'z-vit-10': [
    '30 m es demasiado: a 30 km/h reacción y frenado suman unos 15–18 m.',
    null,
    '5 m es imposible: solo el tiempo de reacción ya ocupa unos 9 m a 30 km/h.',
  ],
  'z-vit-11': [
    '30 km/h es el límite de una «zone 30», no el de una zona peatonal.',
    null,
    'En zona peatonal no se llega a 20 km/h: los vehículos autorizados van al paso.',
  ],
  'z-vit-12': [
    'No cuenta solo la media: el límite se aplica en cada punto del tramo.',
    'Adelantar nunca autoriza a superar el límite de velocidad.',
    null,
  ],

  // ── Dépassement ──────────────────────────────────────────────────────────
  'dep-01': [
    'Por la derecha es la excepción: solo cuando el otro gira a la izquierda (art. 16.3), con el tranvía o en filas.',
    null,
    'El lado no se elige según el hueco: la regla fija la izquierda (art. 16.3).',
  ],
  'dep-03': [
    'La prohibición no depende de dónde esté el peatón: el vehículo parado puede ocultar a otro que empieza a cruzar.',
    null,
    'Ir despacio no levanta la prohibición: adelantar a un vehículo detenido ante un paso de peatones está prohibido a cualquier velocidad.',
  ],
  'dep-04': [
    'La velocidad no compensa la falta de visibilidad: no puedo ver lo que viene tras la cima (art. 17.1).',
    null,
    'La anchura no basta: la prohibición se basa en la visibilidad, salvo que pueda adelantar sin cruzar la continua del centro.',
  ],
  'dep-05': [
    'La línea continua prohíbe cruzarla aunque el carril contrario esté libre: manda la marca, no mi apreciación.',
    null,
    'Pisarla ya es infracción: la línea continua no se puede franquear ni montar.',
  ],
  'dep-06': [
    'Sin isleta los viajeros bajan directamente a la calzada por la derecha: hay que parar (art. 40.3.2), no pasar por su lado.',
    null,
    'Por la izquierda tampoco: hay que detenerse mientras suben y bajan, y después seguir a velocidad moderada.',
  ],
  'dep-08': [
    '50 cm es demasiado poco: un ciclista se desvía con facilidad y la ley exige al menos 1 m en población.',
    null,
    '1,5 m es el mínimo fuera de población; en población el mínimo legal es 1 m (dejar más nunca está mal).',
  ],
  'dep-10': [
    'Tener la flecha roja de mi lado significa lo contrario: es mi sentido el que debe ceder.',
    null,
    'La prohibición de paso en ambos sentidos es la C3 (círculo rojo vacío); la B19 solo regula quién cede.',
  ],
  'dep-12': [
    'El claxon nunca es obligatorio para adelantar (solo está permitido fuera de población, art. 33.2): el aviso obligatorio es el intermitente.',
    null,
    'El límite sigue vigente durante el adelantamiento: si hace falta superarlo, es que no hay que adelantar.',
  ],
  'dep-13': [
    'Dejar 1 m es la regla en una vía normal; en la calle ciclista adelantar a los ciclistas está prohibido sin más.',
    null,
    'El claxon no da derecho a adelantar (art. 33.2): en la calle ciclista el ciclista puede ocupar el carril.',
  ],
  'x-dep-01': [
    null,
    'La anchura no levanta la prohibición: solo la levanta tener tres carriles o más en mi sentido.',
    'El claxon no autoriza a adelantar a quien ya está adelantando a un vehículo.',
  ],
  'x-dep-02': [
    'Acelerar alarga el adelantamiento del otro y lo deja más tiempo en el carril contrario.',
    'Frenar en seco puede provocar un choque por detrás y desconcierta al que adelanta: basta con no acelerar.',
    null,
  ],
  'x-dep-03': [
    null,
    'Volver en cuanto mi frontal lo rebasa es cerrarle el paso al adelantado.',
    'No hay una distancia fija: depende de la velocidad y de ver al adelantado en el retrovisor.',
  ],
  'y-dep-01': [
    null,
    'Adelantar a un vehículo que se acerca a un paso de peatones está prohibido aunque crea llegar antes que el peatón (art. 17.2, 5°).',
    'Adelantar por la derecha está prohibido en general (art. 16.3) y aquí además pondría en peligro al peatón.',
  ],
  'y-dep-02': [
    'La prohibición vale aunque no se vea a nadie a la derecha: alguien puede aparecer en cualquier momento.',
    'Acelerar no levanta la prohibición: en un cruce con prioridad de la derecha no se adelanta.',
    null,
  ],
  'y-dep-04': [
    null,
    'La línea continua no se cruza sea cual sea el vehículo de delante.',
    'Adelantar por la derecha solo se permite en los casos previstos (giro a la izquierda, tranvía, filas).',
  ],
  'y-dep-06': [
    null,
    'La prioridad del ciclista no autoriza a cruzar la continua: hay que esperar.',
    '30 cm es muy peligroso e ilegal: en población hay que dejar al menos 1 m.',
  ],
  'y-dep-08': [
    null,
    'Ver lejos no basta: la C35 prohíbe adelantar hasta el próximo cruce, y en el túnel no lo hay.',
    'Por la derecha tampoco: está prohibido salvo los casos previstos, y la C35 sigue vigente.',
  ],
  'y-aut-01': [
    'Su infracción no autoriza la mía: con tráfico fluido no se adelanta por la derecha.',
    'Las ráfagas para presionar son un comportamiento agresivo que crea peligro: hay que esperar.',
    null,
  ],
  'z-dep-01': [
    null,
    'La circulación en filas no se considera adelantamiento (art. 16.2): no es un adelantamiento por la derecha prohibido.',
    'La regla de las filas vale para todos los vehículos, no solo para los camiones.',
  ],
  'z-dep-02': [
    'El art. 16.2bis permite a todo motorista circular entre filas lentas, no solo a la policía.',
    null,
    'Hay límites: 50 km/h como máximo y no más de 20 km/h por encima de las filas.',
  ],
  'z-dep-03': [
    'La prohibición vale aunque no venga nadie de frente: el peligro es el propio paso a nivel.',
    'Sin barreras ni semáforos no hay aviso fiable de un tren: por eso está prohibido adelantar en él.',
    null,
  ],
  'z-dep-05': [
    null,
    'La C35 no prohíbe todo adelantamiento: un ciclista sí se puede adelantar.',
    'No hace falta que se detenga: se le adelanta en marcha respetando la distancia lateral.',
  ],
  'z-dep-06': [
    'La prohibición de adelantar para todos es la C35; la C39 solo se dirige a los conductores de vehículos de más de 3,5 t.',
    'La C39 no protege a los camiones de ser adelantados: son los conductores de más de 3,5 t los que no pueden adelantar.',
    null,
  ],
  'z-dep-07': [
    'Que A no se ciña a la derecha no autoriza a adelantarlo por la derecha.',
    null,
    'Respetar el límite de velocidad no hace legal un adelantamiento por la derecha.',
  ],
  'z-dep-08': [
    'Cuenta la línea más cercana a mí, y la de mi lado es discontinua.',
    'La discontinua de mi lado permite adelantar a cualquier vehículo, no solo a ciclistas.',
    null,
  ],
  'z-dep-09': [
    null,
    'Por la derecha es la regla general, pero en sentido único el art. 16.9 permite también la izquierda.',
    'Un tranvía en marcha sí se puede adelantar, normalmente por la derecha.',
  ],
  'z-dep-10': [
    'La prohibición en los cruces solo vale donde rige la prioridad de la derecha o para quien debe ceder (art. 17.2, 2°).',
    null,
    'Que el otro gire a la derecha no es la condición: lo que cuenta es que yo tenga prioridad en el cruce.',
  ],
  'z-dep-11': [
    'Acelerar a fondo no garantiza terminar: en la duda no se empieza el adelantamiento.',
    'No puedo obligar a B a frenar: el adelantamiento no debe molestar a los que vienen de frente.',
    null,
  ],
  'z-dep-12': [
    'El arcén de emergencia está reservado a las paradas de emergencia y a los servicios de socorro, aunque esté libre.',
    null,
    'No hay velocidad permitida en el arcén de emergencia: circular por él está prohibido.',
  ],

  // ── Alcool, drogues, fatigue ─────────────────────────────────────────────
  'alc-01': [
    '0,2 g/l es el límite de los conductores profesionales, no del conductor ordinario.',
    null,
    '0,8 g/l es el umbral de las sanciones más duras, no el límite permitido: desde 0,5 ya es infracción.',
  ],
  'alc-02': [
    '0,5 g/l es el límite general; a los profesionales se les exige más.',
    null,
    'El código belga no fija tolerancia cero para los profesionales, sino 0,2 g/l.',
  ],
  'alc-03': [
    'Entre 0,5 y 0,8 g/l la sanción inmediata es multa y prohibición de conducir de 3 h, sin retirada del permiso.',
    null,
    '1,5 g/l es demasiado alto: la retirada inmediata empieza ya por encima de 0,8 g/l.',
  ],
  'alc-05': [
    'No hay un nivel «bajo» permitido de cannabis: el test se considera positivo desde umbrales mínimos.',
    null,
    'Un test positivo no se queda en advertencia: lleva prohibición de conducir, retirada del permiso y proceso penal.',
  ],
  'alc-06': [
    'El aire fresco y la radio solo despejan unos minutos: no eliminan la somnolencia ni el riesgo de microsueño.',
    null,
    'El café tarda en hacer efecto y solo retrasa un poco el sueño: no sustituye a la pausa.',
  ],
  'alc-07': [
    'No es un derecho: el conductor está obligado a someterse al test y negarse es una infracción en sí.',
    null,
    'No es una sanción leve: la negativa se castiga como una intoxicación alcohólica grave.',
  ],
  'x-con-01': [
    'Media unidad sube la tasa apenas 0,1–0,15 g/l, lejos del límite de 0,5.',
    'Con seis unidades un conductor medio estaría muy por encima del límite (más de 1 g/l).',
    null,
  ],
  'x-con-02': [
    null,
    'El sueño no acelera la eliminación del alcohol: siete horas pueden no bastar para cuatro copas.',
    'El café despeja un poco, pero no baja la tasa de alcohol.',
  ],
  'y-alc-01': [
    'Desde 0,5 g/l ya hay infracción, conduzca con prudencia o no.',
    'La retirada inmediata de 15 días es para tasas de más de 0,8 g/l.',
    null,
  ],
  'y-alc-03': [
    'El THC puede seguir detectándose al día siguiente y seguir alterando la atención.',
    'Sentirse bien no garantiza nada: el test puede dar positivo y las capacidades estar disminuidas.',
    null,
  ],
  'z-alc-01': [
    '0,09 mg/l equivale al límite de 0,2 g/l, no al de 0,5.',
    null,
    'Sangre y aire no tienen la misma escala: 0,50 mg/l en aire equivaldría a más de 1 g/l en sangre.',
  ],
  'z-alc-02': [
    null,
    'El alcolock se ajusta por debajo del límite general: bloquea ya desde 0,2 g/l.',
    '0,8 g/l es el umbral de la retirada inmediata, no el del alcolock.',
  ],
  'z-alc-03': [
    'Desde 0,8 g/l el juez puede imponer el alcolock, pero no está obligado a hacerlo.',
    '1,2 g/l es el umbral obligatorio en caso de reincidencia, no en una primera condena.',
    null,
  ],
  'z-alc-04': [
    null,
    'Estar por debajo de 0,5 g/l no impide la sanción por embriaguez: es una infracción distinta.',
    'No solo cuenta la tasa: los signos de embriaguez se sancionan por sí mismos.',
  ],
  'z-alc-05': [
    'El código sanciona el «état analogue» a la embriaguez, sea cual sea la sustancia que lo provoca.',
    'No es una advertencia: se castiga como la embriaguez.',
    null,
  ],
  'z-alc-11': [
    'La radio no evita los microsueños: seguir conduciendo así es muy peligroso.',
    null,
    'Ir más rápido con microsueños multiplica el riesgo: hay que parar ya.',
  ],

  // ── Passages à niveau ────────────────────────────────────────────────────
  'man-05': [
    'Las luces rojas intermitentes ya prohíben entrar: el tren puede llegar antes de que bajen las barreras.',
    null,
    'No ver un tren no basta: las luces se encienden porque se acerca uno y prohíben entrar (art. 20.3).',
  ],
  'man-06': [
    'Quedarse sobre las vías es lo más peligroso: si las barreras bajan, el coche queda atrapado ante el tren.',
    null,
    'El claxon no hace avanzar la fila: si no puedo salir del paso, no entro.',
  ],
  'x-sig-07': [
    null,
    'Las luces rojas intermitentes anuncian un tren: pasar rápido es lo más peligroso.',
    'No basta con reducir: la luz roja intermitente prohíbe entrar en el paso.',
  ],
  'x-man-04': [
    'Zigzaguear entre las barreras es entrar con las barreras en movimiento: prohibido y muy peligroso.',
    'Las barreras bajan porque se acerca un tren: pasar rápido es jugarse la vida.',
    null,
  ],
  'y-man-10': [
    'Rodear las medias barreras está prohibido: bajadas significan que viene un tren.',
    'No ver ni oír el tren no basta: las barreras bajadas prohíben entrar.',
    null,
  ],
  'z-man-07': [
    'Tocar el claxon no detiene un tren: hay que reducir y comprobar antes de entrar.',
    null,
    'Acelerar sin comprobar si viene un tren es lo contrario de lo que exige el art. 20.2.',
  ],
  'z-man-08': [
    'No solo cuentan las luces: basta la señal acústica para prohibir el paso.',
    'La señal acústica anuncia un tren: pasar rápido es jugarse la vida.',
    null,
  ],

  // ── Usagers faibles, manœuvres, autoroute ────────────────────────────────
  'usa-01': [
    'Acelerar para pasar antes es justo lo prohibido: el peatón que se dispone a cruzar ya tiene prioridad.',
    null,
    'El claxon no da prioridad ni sirve para apremiar (art. 33.2), y además asusta al peatón.',
  ],
  'usa-06': [
    'Mi verde y el de los peatones pueden estar encendidos a la vez: el verde me deja girar, pero cediendo a los que cruzan.',
    null,
    'Tocar la bocina no quita la prioridad a los peatones (art. 33.2): hay que esperar.',
  ],
  'sc-36': [
    'Ir delante no da prioridad: al girar corto el carril bici y cedo a quien sigue recto por él.',
    null,
    'Acelerar para girar antes que el ciclista es muy peligroso (ángulo muerto) y sigue siendo no cederle el paso.',
  ],
  'y-usa-01': [
    null,
    'No se mete prisa con el claxon a un grupo de niños (art. 33.2): se espera.',
    'Cortar un grupo guiado está prohibido y es muy peligroso.',
  ],
  'y-usa-03': [
    null,
    'El bastón blanco levantado no es un saludo: es la señal de que quiere cruzar.',
    'No tiene nada que ver con un taxi: indica que va a cruzar y hay que dejarle paso.',
  ],
  'y-usa-06': [
    'En un anillo de un solo carril no queda sitio para dejar 1 m al ciclista.',
    'El claxon no le obliga a apartarse (art. 33.2): en el anillo puede ir por el centro del carril.',
    null,
  ],
  'y-usa-11': [
    '1 m es el mínimo en población; fuera de población el mínimo es mayor.',
    '2 m es más de lo que exige la ley: el mínimo fuera de población es 1,5 m.',
    null,
  ],
  'y-man-08': [
    'Pasar a vehículos parados no es un adelantamiento (art. 16.1): el ciclista puede hacerlo por la derecha.',
    'En cuanto la fila arranca, pasar por la derecha se convierte en un adelantamiento por la derecha, prohibido.',
    null,
  ],
  'man-02': [
    'Maniobrar no da prioridad, al contrario: quien hace una maniobra cede a todos (art. 12.4).',
    null,
    'No se cede solo a los de la izquierda: la marcha atrás obliga a ceder a todos, peatones incluidos.',
  ],
  'aut-02': [
    'La marcha atrás está prohibida en autopista, también por el arcén de emergencia.',
    null,
    'Cruzar la mediana para cambiar de sentido está prohibido y es extremadamente peligroso.',
  ],
}
