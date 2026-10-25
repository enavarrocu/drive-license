import type { TheoryEntry } from '../types'

/**
 * Teoría del examen, explicada en español. Los términos franceses que
 * aparecen en el examen van entre « ». Cada pregunta enlaza aquí por `id`.
 */
export const theory: TheoryEntry[] = [
  /* ---------------- PRIORITÉ ---------------- */
  {
    id: 'prio-hierarchie',
    theme: 'priorite',
    title: { fr: 'Hiérarchie des règles de priorité', es: 'Jerarquía de las reglas de prioridad' },
    body:
      'En un cruce, las reglas se aplican en este orden: 1) las indicaciones de un «agent qualifié» (policía) mandan sobre todo; 2) después los «feux lumineux» (semáforos); 3) después las «signaux» (señales B1, B5, B9, B15, B17) y las «marques au sol»; 4) si no hay nada de lo anterior, se aplica la «priorité de droite». Si el semáforo está en «orange clignotant» (ámbar intermitente) equivale a que no funciona: vuelven a valer las señales y, en su defecto, la prioridad de la derecha.',
    keyTerms: [
      { fr: 'agent qualifié', es: 'agente de policía que regula el tráfico' },
      { fr: 'feux lumineux de circulation', es: 'semáforos' },
      { fr: 'priorité de droite', es: 'prioridad de la derecha' },
      { fr: 'carrefour', es: 'cruce / intersección' },
    ],
  },
  {
    id: 'prio-droite',
    theme: 'priorite',
    title: { fr: 'La priorité de droite', es: 'La prioridad de la derecha' },
    body:
      'Regla por defecto en Bélgica: en cualquier «carrefour» sin señales ni semáforos, debes «céder le passage» (ceder el paso) al conductor que viene por tu derecha. Se aplica también en cruces con caminos pequeños y en aparcamientos abiertos al público. El conductor que viene por la derecha CONSERVA su prioridad aunque se haya detenido o haya reducido mucho la velocidad. En cambio, la PIERDE si circula en «sens interdit» (dirección prohibida). La prioridad de la derecha no se aplica frente a un tranvía: todo usuario debe ceder el paso a los vehículos sobre raíles (art. 12.1), venga por donde venga; solo un semáforo o un agente pueden detener al «tram». Un conductor que sale de una propiedad privada, un garaje, un aparcamiento o un «chemin de terre» (camino de tierra) debe ceder el paso a todos.',
    keyTerms: [
      { fr: 'céder le passage', es: 'ceder el paso' },
      { fr: 'venant de droite', es: 'que viene por la derecha' },
      { fr: 'sens interdit', es: 'dirección prohibida' },
      { fr: 'débouche', es: 'desemboca / sale (de una vía)' },
      { fr: 'propriété riveraine', es: 'propiedad colindante (privada)' },
    ],
  },
  {
    id: 'prio-signaux',
    theme: 'priorite',
    title: { fr: 'Signaux de priorité B1, B5, B9, B15, B17', es: 'Señales de prioridad B1, B5, B9, B15, B17' },
    body:
      '«B1» (triángulo invertido): «céder le passage», ceder el paso sin obligación de parar. «B5» (octógono STOP): «arrêt obligatoire», parar completamente en la línea (o antes del cruce si no la hay) y ceder el paso. «B9» (rombo amarillo): «voie prioritaire», circulas por una vía con prioridad hasta el «B11» (fin de vía prioritaria). «B15» (triángulo con flecha gruesa): tienes prioridad únicamente en el próximo cruce. «B17» (triángulo con cruz negra en X): en el próximo cruce se aplica la «priorité de droite». Truco: B15 y B17 se colocan poco antes del cruce y solo valen para ese cruce.',
    keyTerms: [
      { fr: 'arrêt obligatoire', es: 'parada obligatoria (STOP)' },
      { fr: 'voie prioritaire', es: 'vía con prioridad' },
      { fr: 'fin de voie prioritaire', es: 'fin de vía con prioridad' },
      { fr: 'au prochain carrefour', es: 'en el próximo cruce' },
    ],
  },
  {
    id: 'prio-rondpoint',
    theme: 'priorite',
    title: { fr: 'Ronds-points', es: 'Rotondas' },
    body:
      'Para el código belga, una «rond-point» es la que lleva la señal «D5» (sentido giratorio obligatorio) y una «B1» (ceder el paso) o «B5» (STOP) en cada entrada. Entonces los vehículos que YA circulan por el anillo tienen prioridad: el que circula por una rotonda no cede a su derecha (art. 12.3.1). Una plaza giratoria sin esas señales no es una «rond-point»: se aplicaría la «priorité de droite», es decir, prioridad al que entra. Al salir de la rotonda hay que poner el «clignotant» (intermitente) a la derecha; al entrar no es obligatorio señalar (art. 19.2). Dentro del anillo no se para ni se estaciona.',
    keyTerms: [
      { fr: 'rond-point', es: 'rotonda' },
      { fr: 'sens giratoire', es: 'sentido giratorio obligatorio (D5)' },
      { fr: 'clignotant', es: 'intermitente' },
      { fr: 'quitter le rond-point', es: 'salir de la rotonda' },
    ],
  },
  {
    id: 'prio-vehicules-prioritaires',
    theme: 'priorite',
    title: { fr: 'Véhicules prioritaires et bus', es: 'Vehículos prioritarios y autobuses' },
    body:
      'Un «véhicule prioritaire» (policía, bomberos, ambulancia) que usa a la vez el «feu bleu» (luz azul giratoria) y el «avertisseur sonore spécial» (sirena) tiene prioridad sobre todos: hay que «dégager» (apartarse) de inmediato y cederle el paso, parándose si hace falta (art. 38). Es ÉL quien puede cruzar un semáforo en rojo a velocidad moderada si no crea peligro (art. 37.4); tú no. Con luz azul pero sin sirena no estás obligado a cederle el paso, pero hay que estar atento. Un autobús que sale de una «arrêt d\'autobus» dentro de una «agglomération» y señala su salida con el intermitente: los conductores deben dejarlo salir (reducir o parar).',
    keyTerms: [
      { fr: 'véhicule prioritaire', es: 'vehículo prioritario' },
      { fr: 'feu bleu', es: 'luz azul' },
      { fr: 'avertisseur sonore spécial', es: 'sirena' },
      { fr: 'arrêt d\'autobus', es: 'parada de autobús' },
    ],
  },

  /* ---------------- VITESSE ---------------- */
  {
    id: 'vit-limites',
    theme: 'vitesse',
    title: { fr: 'Limitations de vitesse par région', es: 'Límites de velocidad por región' },
    body:
      'Regla general: «en agglomération» (dentro de población, entre las señales F1 y F3) 50 km/h, PERO en la Región de Bruselas-Capital el límite por defecto en población es 30 km/h desde 2021, salvo señal C43 que permita 50 o 70. «Hors agglomération» (fuera de población): 70 km/h en Bruselas y en Flandes, 90 km/h en Valonia. «Route à 2×2 bandes» con los sentidos separados por algo más que marcas (mediana, barrera): 120 km/h. «Autoroute»: máximo 120 km/h y mínimo 70 km/h. «Zone 30» y «abords d\'école» (entorno escolar): 30. «Zone résidentielle» y «zone de rencontre»: 20 km/h. «Zone piétonne»: paso de peatón. «Rue cyclable»: 30 km/h y prohibido adelantar a ciclistas.',
    keyTerms: [
      { fr: 'en agglomération', es: 'dentro de población (zona urbana)' },
      { fr: 'hors agglomération', es: 'fuera de población' },
      { fr: 'vitesse maximale autorisée', es: 'velocidad máxima permitida' },
      { fr: 'abords d\'école', es: 'entorno escolar' },
      { fr: 'zone résidentielle', es: 'zona residencial' },
    ],
  },
  {
    id: 'vit-adaptee',
    theme: 'vitesse',
    title: { fr: 'Vitesse adaptée et distance de sécurité', es: 'Velocidad adecuada y distancia de seguridad' },
    body:
      'La velocidad debe adaptarse siempre a las circunstancias («conditions atmosphériques», estado de la vía, visibilidad, tráfico), aunque estés por debajo del límite. Debes poder detenerte dentro de la distancia que ves libre («distance de visibilité»). Con otros vehículos delante hay que dejar una «distance de sécurité» de al menos 2 segundos (regla de los 2 segundos: cuenta desde que el coche de delante pasa un punto fijo). Fuera de población, los vehículos de más de 7,5 t o de más de 7 m de largo deben dejar al menos 50 m entre ellos (art. 18.2). Circular «à une allure anormalement lente» (demasiado despacio) sin motivo también está prohibido.',
    keyTerms: [
      { fr: 'distance de sécurité', es: 'distancia de seguridad' },
      { fr: 'règle des deux secondes', es: 'regla de los dos segundos' },
      { fr: 'adapter sa vitesse', es: 'adaptar la velocidad' },
      { fr: 'allure', es: 'ritmo / marcha (velocidad)' },
      { fr: 'chaussée glissante', es: 'calzada resbaladiza' },
    ],
  },
  {
    id: 'vit-arret',
    theme: 'vitesse',
    title: { fr: 'Distance d\'arrêt', es: 'Distancia de detención' },
    body:
      'La «distance d\'arrêt» = «distance de réaction» + «distance de freinage». Tiempo de reacción medio: 1 segundo. Reglas mentales usadas en el examen: distancia de reacción ≈ velocidad × 0,3 (a 50 km/h ≈ 15 m); distancia de frenado en seco ≈ (velocidad/10)² (a 50 km/h ≈ 25 m). Total a 50 km/h ≈ 40 m; a 90 km/h ≈ 108 m; a 120 km/h ≈ 180 m. Si la velocidad se duplica, la distancia de frenado se multiplica por cuatro. En «chaussée mouillée» (mojada) la distancia de frenado se duplica aproximadamente.',
    keyTerms: [
      { fr: 'distance d\'arrêt', es: 'distancia de detención total' },
      { fr: 'distance de réaction', es: 'distancia recorrida durante el tiempo de reacción' },
      { fr: 'distance de freinage', es: 'distancia de frenado' },
      { fr: 'chaussée mouillée', es: 'calzada mojada' },
    ],
  },

  /* ---------------- DÉPASSEMENT ---------------- */
  {
    id: 'dep-regles',
    theme: 'depassement',
    title: { fr: 'Règles générales du dépassement', es: 'Reglas generales del adelantamiento' },
    body:
      'Se adelanta por la «gauche» (izquierda). Antes de adelantar: comprobar que la vía está libre a suficiente distancia, que nadie te está adelantando («rétroviseur» y «angle mort»), señalar con el «clignotant» y no forzar a los que vienen de frente a frenar. Se adelanta por la «droite» (derecha): a un tranvía (salvo en calle de sentido único o si no hay espacio), a un conductor que ha señalado que gira a la izquierda y se ha colocado a la izquierda, y en «circulation en files» (circulación en filas) cuando tu fila avanza más rápido. Después de adelantar, vuelve a la derecha sin «rabattre» (cerrarse) bruscamente. Distancia lateral mínima con un ciclista: 1 m en población, 1,5 m fuera.',
    keyTerms: [
      { fr: 'dépasser', es: 'adelantar' },
      { fr: 'se rabattre', es: 'volver al carril / cerrarse' },
      { fr: 'angle mort', es: 'ángulo muerto' },
      { fr: 'circulation en files', es: 'circulación en filas (atasco)' },
      { fr: 'distance latérale', es: 'distancia lateral' },
    ],
  },
  {
    id: 'dep-interdit',
    theme: 'depassement',
    title: { fr: 'Dépassement interdit', es: 'Adelantamiento prohibido' },
    body:
      'Siempre está prohibido adelantar por la izquierda si no ves a los que vienen de frente a distancia suficiente (art. 17.1). Además, está prohibido adelantar por la izquierda a un coche, un camión, una moto o un vehículo de tracción animal (art. 17.2): 1) en un «passage à niveau» (paso a nivel) sin barreras ni semáforos; 2) en un «carrefour» donde se aplica la prioridad de la derecha y, en los demás cruces, si eres tú quien debe ceder el paso; 3) al acercarse al «sommet d\'une côte» (cima de una cuesta) o en un «virage» (curva) con visibilidad insuficiente, salvo si puedes hacerlo sin cruzar la «ligne blanche continue» que separa los sentidos; 4) cuando el vehículo que quieres adelantar está adelantando a su vez a un coche o camión (salvo con tres carriles o más en tu sentido); 5) cuando ese vehículo se acerca a un «passage pour piétons» o «passage pour cyclistes» sin semáforo ni agente, o se ha parado delante; 6) cuando llueve o nieva, en autopista, «route pour automobiles» y vías de cuatro carriles o más, para los camiones de más de 7,5 t; 7) sobre un «dispositif surélevé» (resalto). También: nunca se cruza una línea continua; la señal «C35» prohíbe adelantar hasta el próximo cruce (o hasta la «C37»); y en una «rue cyclable» no se adelanta a los ciclistas.',
    keyTerms: [
      { fr: 'passage pour piétons', es: 'paso de peatones' },
      { fr: 'passage à niveau', es: 'paso a nivel' },
      { fr: 'sommet de côte', es: 'cima de una cuesta (cambio de rasante)' },
      { fr: 'virage', es: 'curva' },
      { fr: 'ligne blanche continue', es: 'línea blanca continua' },
    ],
  },
  {
    id: 'dep-tram',
    theme: 'depassement',
    title: { fr: 'Dépasser un tram', es: 'Adelantar a un tranvía' },
    body:
      'Un «tram» se adelanta por la derecha. Se puede adelantar por la izquierda en una calle de «sens unique» (sentido único) o cuando el espacio a la derecha es insuficiente o hay un obstáculo, siempre que no haya peligro. Prohibido adelantar a un tranvía parado en una parada mientras los viajeros suben o bajan si no hay un «refuge» (isleta): hay que parar detrás y esperar. Nunca se adelanta a un tranvía en un cruce si obliga a cruzar los raíles con peligro.',
    keyTerms: [
      { fr: 'tram / tramway', es: 'tranvía' },
      { fr: 'refuge', es: 'isleta para viajeros' },
      { fr: 'voyageurs', es: 'viajeros / pasajeros' },
      { fr: 'rails', es: 'raíles' },
    ],
  },
  {
    id: 'dep-croisement',
    theme: 'depassement',
    title: { fr: 'Croisement', es: 'Cruce con vehículos de frente' },
    body:
      'Al «croiser» (cruzarse con un vehículo que viene en sentido contrario) hay que mantenerse lo más a la derecha posible y, si es necesario, reducir la velocidad o pararse. Cuando la vía es estrecha y hay un obstáculo en tu lado, TÚ debes ceder («c\'est à vous de céder»). Con señal «B19» (disco con borde rojo: flecha negra hacia abajo y flecha roja hacia arriba, la roja eres tú) tú cedes; con «B21» (rectángulo azul: flecha roja hacia abajo y blanca hacia arriba) tienes prioridad en el paso estrecho.',
    keyTerms: [
      { fr: 'croiser / croisement', es: 'cruzarse con un vehículo de frente' },
      { fr: 'obstacle', es: 'obstáculo' },
      { fr: 'passage étroit', es: 'paso estrecho' },
      { fr: 'serrer à droite', es: 'ceñirse a la derecha' },
    ],
  },

  /* ---------------- ALCOOL ---------------- */
  {
    id: 'alc-taux',
    theme: 'alcool',
    title: { fr: 'Alcool au volant', es: 'Alcohol al volante' },
    body:
      'Límite legal: 0,5 g/l de alcohol en sangre (= 0,22 mg/l de aire espirado). Para los «conducteurs professionnels» (bus, camión, taxi): 0,2 g/l (0,09 mg/l). Entre 0,5 y 0,8 g/l: multa e «interdiction de conduire» inmediata de 3 horas. A partir de 0,8 g/l: «interdiction de conduire» de 6 horas como mínimo, proceso ante el «tribunal de police» y, desde el 14 de febrero de 2026, «retrait immédiat du permis» de 15 días en toda Bélgica (antes solo desde 1,2 g/l). Coger el teléfono en mano al volante también supone desde esa fecha la retirada inmediata de 15 días. Negarse al «test d\'haleine» (prueba de alcoholemia) se sanciona como una tasa alta. Una «unité d\'alcool» estándar (una cerveza de 25 cl, una copa de vino) sube la tasa unos 0,2–0,3 g/l y el cuerpo elimina solo ~0,15 g/l por hora; el café, la ducha o el aire no aceleran nada.',
    keyTerms: [
      { fr: 'taux d\'alcool', es: 'tasa de alcohol' },
      { fr: 'test d\'haleine', es: 'prueba de aliento (alcoholímetro)' },
      { fr: 'retrait immédiat du permis', es: 'retirada inmediata del permiso' },
      { fr: 'interdiction de conduire', es: 'prohibición de conducir' },
      { fr: 'conducteur professionnel', es: 'conductor profesional' },
    ],
  },
  {
    id: 'alc-drogues',
    theme: 'alcool',
    title: { fr: 'Drogues, médicaments, fatigue', es: 'Drogas, medicamentos, fatiga' },
    body:
      'Drogas: tolerancia cero; cualquier cantidad detectable (test de saliva) se sanciona con retirada inmediata del permiso. Medicamentos: muchos afectan a la conducción (pictograma en la caja); consulta al médico o farmacéutico. Fatiga: la «somnolence» (somnolencia) es tan peligrosa como el alcohol; señales: bostezos, «paupières lourdes» (párpados pesados), dificultad para mantener la trayectoria. La única solución es parar y dormir 15–20 min; el café solo ayuda brevemente. En viajes largos, pausa cada 2 horas.',
    keyTerms: [
      { fr: 'stupéfiants', es: 'estupefacientes / drogas' },
      { fr: 'test salivaire', es: 'test de saliva' },
      { fr: 'somnolence', es: 'somnolencia' },
      { fr: 'médicaments', es: 'medicamentos' },
    ],
  },

  /* ---------------- SIGNAUX ---------------- */
  {
    id: 'sig-feux',
    theme: 'signaux',
    title: { fr: 'Feux lumineux tricolores', es: 'Semáforos de tres colores' },
    body:
      '«Feu rouge»: prohibido rebasar la «ligne d\'arrêt» (o, si no hay línea, el propio semáforo). «Feu orange fixe» (ámbar fijo): hay que parar, salvo si estás tan cerca que no puedes hacerlo con seguridad. «Feu vert»: puedes pasar, pero solo si el cruce está despejado y cediendo a peatones y ciclistas que ya cruzan. «Orange clignotant»: el semáforo no regula el cruce; prudencia y se aplican las señales de prioridad o, sin ellas, la prioridad de la derecha. «Flèche verte» (flecha verde): solo puedes ir en esa dirección, cediendo a los peatones. Flecha roja: prohibido ir en esa dirección. Señales «B22» / «B23»: los ciclistas pueden girar a la derecha / seguir recto en rojo cediendo el paso; no se aplica a coches.',
    keyTerms: [
      { fr: 'feu orange fixe', es: 'ámbar fijo' },
      { fr: 'feu orange clignotant', es: 'ámbar intermitente' },
      { fr: 'ligne d\'arrêt', es: 'línea de detención' },
      { fr: 'flèche verte', es: 'flecha verde' },
      { fr: 'franchir', es: 'cruzar / rebasar (una línea, un semáforo)' },
    ],
  },
  {
    id: 'sig-agent',
    theme: 'signaux',
    title: { fr: 'Injonctions des agents', es: 'Órdenes de los agentes' },
    body:
      'Un «agent qualifié» manda sobre semáforos, señales y reglas, y hay que obedecerle de inmediato (art. 4). Brazo levantado verticalmente = «arrêt» para todos (como el rojo), salvo para los que ya están dentro del cruce, que deben despejarlo. Brazo o brazos extendidos horizontalmente = arrêt para los usuarios que llegan de las direcciones que cortan la de los brazos (los que tiene de frente o de espaldas); pueden pasar los que circulan en la dirección de sus brazos. Balanceo transversal de una luz roja = arrêt para los conductores hacia los que apunta. Además, el agente puede ordenarte que muevas un vehículo parado o estacionado.',
    keyTerms: [
      { fr: 'injonction', es: 'orden / indicación de un agente' },
      { fr: 'bras levé', es: 'brazo levantado' },
      { fr: 'obtempérer', es: 'obedecer (una orden)' },
      { fr: 'signal d\'arrêt', es: 'señal de detención' },
    ],
  },
  {
    id: 'sig-marquages',
    theme: 'signaux',
    title: { fr: 'Marquages au sol', es: 'Marcas viales' },
    body:
      '«Ligne blanche continue»: prohibido cruzarla o circular sobre ella. «Ligne discontinue»: prohibido cruzarla salvo para adelantar, girar a la izquierda, dar media vuelta o cambiar de carril (art. 72.3). Doble línea (continua + discontinua): cuenta solo la de tu lado. «Traits courts et rapprochés» (rayas cortas y juntas): anuncian una línea continua o delimitan una «bande de circulation» (carril) especial. «Zone d\'évitement» (zona rayada oblicua): prohibido circular, parar o estacionar. «Damier» (cuadros blancos): delimita la plataforma del transporte público o un paso a nivel; prohibido parar y estacionar sobre él. Línea transversal de triángulos blancos = lugar donde detenerse si hace falta para ceder el paso (B1). Línea blanca continua transversal = «ligne d\'arrêt» del STOP o del semáforo. «Passage pour piétons»: bandas blancas paralelas al eje de la vía. Flechas de «sélection» en el carril: obligan a seguir la dirección al llegar al cruce.',
    keyTerms: [
      { fr: 'ligne discontinue', es: 'línea discontinua' },
      { fr: 'bande de circulation', es: 'carril' },
      { fr: 'zone d\'évitement', es: 'zona excluida al tráfico (cebreado)' },
      { fr: 'flèches de sélection', es: 'flechas de selección de carril' },
      { fr: 'marquage / marques au sol', es: 'marcas viales' },
    ],
  },
  {
    id: 'sig-categories',
    theme: 'signaux',
    title: { fr: 'Familles de signaux', es: 'Familias de señales' },
    body:
      'Letra = familia: «A» danger (triángulo con borde rojo, aviso de peligro; en Bruselas y Flandes se coloca a unos 150 m del peligro, salvo que una placa indique otra distancia); «B» priorité; «C» interdiction (círculo rojo: prohibición); «D» obligation (círculo azul: obligación); «E» arrêt et stationnement (círculo azul con borde rojo: E1 estacionamiento prohibido, E3 parada y estacionamiento prohibidos; cuadrado azul con «P»: E9 estacionamiento autorizado); «F» indication (rectángulo azul o blanco: F1 población, F4a zona 30, F5 autopista, F12a zona residencial, F19 sentido único, F45 callejón sin salida, F111 calle ciclista). Un «panneau additionnel» (placa debajo) precisa distancia, tramo, horario o excepciones. Una barra oblicua indica el fin: gris o negra en las señales C (C37, C45, C46), roja en las F (F3, F12b…).',
    keyTerms: [
      { fr: 'signal de danger', es: 'señal de peligro' },
      { fr: 'signal d\'interdiction', es: 'señal de prohibición' },
      { fr: 'signal d\'obligation', es: 'señal de obligación' },
      { fr: 'panneau additionnel', es: 'placa adicional (bajo la señal)' },
      { fr: 'fin d\'interdiction', es: 'fin de la prohibición' },
    ],
  },

  /* ---------------- STATIONNEMENT ---------------- */
  {
    id: 'sta-definitions',
    theme: 'stationnement',
    title: { fr: 'Arrêt ou stationnement ?', es: '¿Parada o estacionamiento?' },
    body:
      '«Arrêt» (parada): inmovilizar el vehículo el tiempo necesario para que suban o bajen personas o para cargar/descargar cosas, sin más. «Stationnement» (estacionamiento): cualquier otra inmovilización más larga que eso. La diferencia importa porque muchas señales solo prohíben el estacionamiento (E1) y otras las dos cosas (E3). El conductor que se aleja del vehículo estacionado debe apagar el motor, quitar la llave y bloquear la dirección. En pendiente hay que dejar la primera marcha o la marcha atrás y girar las ruedas hacia la acera («trottoir») o hacia la calzada según el sentido.',
    keyTerms: [
      { fr: 'arrêt', es: 'parada breve' },
      { fr: 'stationnement', es: 'estacionamiento' },
      { fr: 'immobiliser', es: 'inmovilizar' },
      { fr: 'charger / décharger', es: 'cargar / descargar' },
      { fr: 'trottoir', es: 'acera' },
    ],
  },
  {
    id: 'sta-interdits',
    theme: 'stationnement',
    title: { fr: 'Où l\'arrêt et le stationnement sont interdits', es: 'Dónde están prohibidos la parada y el estacionamiento' },
    body:
      'Prohibidos LOS DOS (art. 24): sobre «trottoirs» (aceras) y «pistes cyclables»; sobre pasos de peatones y de ciclistas y a menos de 5 m antes de ellos; a menos de 5 m de la esquina de un cruce; a menos de 20 m antes de un semáforo o de una señal (para los semáforos fuera de los cruces y para las señales, se admiten vehículos de hasta 1,65 m de alto si el borde inferior está a 2 m o más del suelo); en pasos a nivel; sobre resaltos («dispositifs surélevés»); en «zones d\'évitement» y «damiers»; en «autoroute» y «route pour automobiles» (salvo áreas E9a); en la calzada de túneles, pasos inferiores y bajo puentes; cerca de la cima de una cuesta y en curvas sin visibilidad; con señal E3. Siempre en una sola fila: la doble fila está prohibida también para una parada. Prohibido SOLO el estacionamiento (art. 25): a menos de 15 m a cada lado de una «arrêt de bus/tram»; delante de «accès carrossables» (entradas de garaje); a menos de 1 m de otro vehículo; donde impida a otro vehículo entrar o salir; donde estorbe el paso del tranvía; si deja menos de 3 m de paso libre; fuera de población, en la calzada de una vía con B9; en una calzada dividida en carriles (salvo E9a/E9b); en «zone résidentielle» fuera de las plazas marcadas; con señal E1.',
    keyTerms: [
      { fr: 'à moins de 5 m', es: 'a menos de 5 m' },
      { fr: 'accès carrossable', es: 'entrada de vehículos (vado)' },
      { fr: 'en double file', es: 'en doble fila' },
      { fr: 'piste cyclable', es: 'carril bici' },
      { fr: 'arrêt de tram', es: 'parada de tranvía' },
    ],
  },
  {
    id: 'sta-zones',
    theme: 'stationnement',
    title: { fr: 'Zone résidentielle, zone de rencontre, zone piétonne', es: 'Zona residencial, zona de encuentro, zona peatonal' },
    body:
      '«Zone résidentielle» y «zone de rencontre» (señales F12a / F12b): la calle es un espacio compartido. Velocidad máxima 20 km/h; los peatones pueden usar toda la anchura de la vía y los juegos están permitidos, pero no deben obstaculizar inútilmente; los conductores no pueden ponerlos en peligro ni molestarlos y deben pararse si hace falta. ESTACIONAMIENTO: prohibido en toda la zona SALVO en los sitios delimitados por marcas o un revestimiento de otro color con una «P», o donde una señal lo autorice — da igual que no se moleste o que la calle esté vacía (art. 22bis). La parada breve (dejar a alguien, cargar) sí está permitida. Al salir de la zona (F12b) vuelve el límite de la población. «Zone piétonne» (F103 / F105): solo peatones; los vehículos autorizados circulan al paso cediendo el paso a los peatones, los ciclistas solo entran si la señal lo permite; estacionar está prohibido.',
    keyTerms: [
      { fr: 'zone résidentielle', es: 'zona residencial' },
      { fr: 'zone de rencontre', es: 'zona de encuentro (compartida)' },
      { fr: 'emplacement délimité', es: 'plaza delimitada / marcada' },
      { fr: 'zone piétonne', es: 'zona peatonal' },
      { fr: 'à l\'allure du pas', es: 'a paso de persona' },
    ],
  },
  {
    id: 'sta-regles',
    theme: 'stationnement',
    title: { fr: 'Comment stationner', es: 'Cómo estacionar' },
    body:
      'En una calle de doble sentido se estaciona a la derecha en el sentido de la marcha, paralelo al borde y lo más cerca posible. Estacionar en el lado izquierdo (contra dirección) está prohibido en doble sentido; en una calle de «sens unique» se puede estacionar a ambos lados. «Stationnement alterné semi-mensuel»: la señal E5 prohíbe estacionar en su lado del 1 al 15 del mes y la E7 del 16 al final; con la señal E11 a la entrada de la población, en todas sus calles se estaciona del 1 al 15 del lado de los números impares y del 16 al final del lado de los pares. El cambio se hace entre las 19:30 y las 20:00 del último día de cada periodo (el 15 y el último día del mes). «Zone bleue»: hay que poner el «disque de stationnement» (disco horario) los días laborables de 9 a 18 h, máximo 2 horas salvo indicación distinta; sin disco es infracción. Si hay un «accotement» (arcén) al mismo nivel de la calzada («de plain-pied») hay que estacionar en él, dejando 1,50 m a los peatones si lo usan; fuera de población, en cualquier arcén (art. 23.1).',
    keyTerms: [
      { fr: 'disque de stationnement', es: 'disco horario' },
      { fr: 'zone bleue', es: 'zona azul' },
      { fr: 'stationnement alterné semi-mensuel', es: 'estacionamiento alterno quincenal' },
      { fr: 'accotement', es: 'arcén' },
      { fr: 'côté des numéros impairs', es: 'lado de los números impares' },
    ],
  },

  /* ---------------- AUTOROUTE ---------------- */
  {
    id: 'aut-regles',
    theme: 'autoroute',
    title: { fr: 'Règles sur autoroute', es: 'Reglas en autopista' },
    body:
      'Señal «F5» = inicio de «autoroute», «F7» = fin. Solo pueden entrar vehículos capaces de circular a 70 km/h como mínimo: prohibida a peatones, ciclistas, «cyclomoteurs», tractores. Velocidad máx. 120, mín. 70. Se entra por la «bande d\'accélération» (carril de aceleración) cediendo el paso a los que ya circulan; se sale por la «bande de décélération» sin frenar antes en la vía principal. Prohibido: parar o estacionar (salvo avería en la «bande d\'arrêt d\'urgence»), «marche arrière», «demi-tour», cruzar la «berme centrale» (mediana) por los pasos transversales, circular por el arcén de emergencia, «remorquer» (remolcar) con una «attache de fortune» (cuerda, cable). Mantén la derecha: el carril izquierdo solo para adelantar. Con 3 carriles o más en tu sentido, los autobuses y los vehículos de más de 3,5 t solo pueden usar los dos carriles de la derecha. La «route pour automobiles» (F9/F11) tiene casi las mismas reglas pero su límite depende de la región y no exige velocidad mínima.',
    keyTerms: [
      { fr: 'bande d\'accélération', es: 'carril de aceleración' },
      { fr: 'bande de décélération', es: 'carril de deceleración' },
      { fr: 'bande d\'arrêt d\'urgence', es: 'arcén de emergencia' },
      { fr: 'berme centrale', es: 'mediana' },
      { fr: 'demi-tour', es: 'cambio de sentido (giro en U)' },
    ],
  },
  {
    id: 'aut-panne',
    theme: 'autoroute',
    title: { fr: 'Panne et accident', es: 'Avería y accidente' },
    body:
      'En caso de «panne» (avería): encender los «feux de détresse» (cuatro intermitentes), apartar el vehículo al «bande d\'arrêt d\'urgence» o al arcén, ponerse el «gilet fluorescent» (chaleco reflectante) antes de salir del coche (obligatorio en autopista y en «route pour automobiles», recomendable en todas partes), colocar el «triangle de danger» al menos a 30 m detrás en carretera normal y al menos a 100 m en autopista, y ponerse a salvo detrás de la «glissière» (guardarraíl). Llamar al 112 o usar la «borne d\'appel» (poste SOS). En accidente con heridos: proteger el lugar, alertar (112), socorrer sin mover a los heridos salvo peligro inmediato. Es obligatorio detenerse y prestar ayuda; abandonar el lugar es «délit de fuite» (fuga). Sin heridos: rellenar el «constat amiable» (parte amistoso).',
    keyTerms: [
      { fr: 'panne', es: 'avería' },
      { fr: 'feux de détresse', es: 'luces de emergencia (warning)' },
      { fr: 'gilet fluorescent / rétroréfléchissant', es: 'chaleco reflectante' },
      { fr: 'triangle de danger', es: 'triángulo de emergencia' },
      { fr: 'délit de fuite', es: 'delito de fuga' },
    ],
  },

  /* ---------------- USAGERS FAIBLES ---------------- */
  {
    id: 'usa-pietons',
    theme: 'usagers-faibles',
    title: { fr: 'Piétons', es: 'Peatones' },
    body:
      'En un «passage pour piétons» el conductor debe ceder el paso al peatón que ya está cruzando Y al que se dispone a cruzar («s\'apprête à traverser»), y acercarse a velocidad moderada. Si hay un paso de peatones a menos de unos 20 m, el peatón debe usarlo; si no, puede cruzar por otro sitio, perpendicularmente y con prudencia, teniendo en cuenta los vehículos que se acercan; aun así, el conductor debe redoblar la prudencia con niños, personas mayores y con discapacidad. Al girar en un cruce, hay que ceder a los peatones que cruzan la calle en la que entras, incluso con semáforo verde. En una «zone résidentielle» los peatones pueden usar toda la calzada y jugar; los vehículos a 20 km/h. En una «zone piétonne» solo circulan vehículos autorizados a paso de peatón.',
    keyTerms: [
      { fr: 'piéton', es: 'peatón' },
      { fr: 's\'apprête à traverser', es: 'se dispone a cruzar' },
      { fr: 'traverser', es: 'cruzar (la calzada)' },
      { fr: 'zone piétonne', es: 'zona peatonal' },
      { fr: 'redoubler de prudence', es: 'extremar la prudencia' },
    ],
  },
  {
    id: 'usa-cyclistes',
    theme: 'usagers-faibles',
    title: { fr: 'Cyclistes et cyclomoteurs', es: 'Ciclistas y ciclomotores' },
    body:
      'Un conductor que gira (izquierda o derecha) debe ceder el paso a los ciclistas que siguen recto por la «piste cyclable» o por la calzada. Distancia lateral al adelantar: 1 m en población, 1,5 m fuera. Los ciclistas pueden circular de dos en fondo («à deux de front») salvo si impiden el cruce; fuera de población deben ponerse en fila cuando llega un vehículo por detrás. «SUL» (sens unique limité, placas M2/M4 bajo la señal C1/F19): los ciclistas pueden circular en contra del sentido único; cuenta con ellos al girar. «Rue cyclable» (F111): los ciclistas pueden ocupar todo el carril, los coches no pueden adelantarlos y el límite es 30 km/h. Señal «D7» = piste cyclable obligatoria para ciclos; «D10» = parte compartida peatones y ciclistas. Los ciclomotores de clase B (≤45 km/h) siguen la calzada en población.',
    keyTerms: [
      { fr: 'cycliste', es: 'ciclista' },
      { fr: 'cyclomoteur', es: 'ciclomotor' },
      { fr: 'sens unique limité (SUL)', es: 'sentido único excepto ciclistas' },
      { fr: 'à deux de front', es: 'de dos en fondo (en paralelo)' },
      { fr: 'rue cyclable', es: 'calle ciclista' },
    ],
  },
  {
    id: 'usa-tram',
    theme: 'usagers-faibles',
    title: { fr: 'Trams et arrêts', es: 'Tranvías y paradas' },
    body:
      'Todo usuario debe ceder el paso a los vehículos sobre raíles y apartarse de la vía en cuanto pueda (art. 12.1): no se aplica la prioridad de la derecha frente al tranvía. Al pasar junto a un tranvía o autobús parado para que suban o bajen viajeros hay que moderar la velocidad; si en la parada no hay «refuge» (isleta) y circulas por el lado donde suben o bajan, debes detenerte para dejarles subir o llegar a la acera, y luego arrancar despacio (art. 40.3). Prohibido estacionar a menos de 15 m a cada lado de una parada y donde se estorbe el paso del tranvía. En población, cuando el autobús señala con el intermitente que sale de su parada, hay que dejarle salir: reducir y, si hace falta, parar (art. 39).',
    keyTerms: [
      { fr: 'site propre', es: 'plataforma reservada (bus/tram)' },
      { fr: 'monter / descendre', es: 'subir / bajar (del vehículo)' },
      { fr: 'arrêt de tram sans refuge', es: 'parada de tranvía sin isleta' },
      { fr: 'voie ferrée', es: 'vía férrea' },
    ],
  },

  /* ---------------- MANŒUVRES ---------------- */
  {
    id: 'man-virages',
    theme: 'manoeuvres',
    title: { fr: 'Tourner à droite et à gauche', es: 'Girar a la derecha y a la izquierda' },
    body:
      'Para girar a la derecha: señalar con tiempo, colocarse lo más a la derecha posible, ceder a peatones y ciclistas que van recto, tomar la curva cerrada. Para girar a la izquierda: señalar, colocarse a la izquierda de tu sentido (junto al eje de la calzada, o a la izquierda en sentido único), ceder a los que vienen de frente (recto o girando a la derecha) y a los peatones y ciclistas, y girar amplio para entrar en el lado derecho de la nueva calle. Toda «manœuvre» (giro, marcha atrás, cambio de carril, salir de un aparcamiento, «demi-tour») obliga a ceder el paso a los demás usuarios. Marcha atrás: es una maniobra (cedes el paso a todos); prohibida en autopista y en «route pour automobiles»; nunca más de lo necesario.',
    keyTerms: [
      { fr: 'tourner à gauche / à droite', es: 'girar a la izquierda / derecha' },
      { fr: 'se placer', es: 'colocarse (en la calzada)' },
      { fr: 'manœuvre', es: 'maniobra' },
      { fr: 'marche arrière', es: 'marcha atrás' },
      { fr: 'changer de bande', es: 'cambiar de carril' },
    ],
  },
  {
    id: 'man-bandes',
    theme: 'manoeuvres',
    title: { fr: 'Bandes de circulation et files', es: 'Carriles y filas' },
    body:
      'Circula por la «bande» más a la derecha que esté libre. En población, en una calzada de sentido único con carriles o en una de doble sentido con al menos dos carriles por sentido, puedes elegir el carril que mejor convenga a tu destino; fuera de población solo el derecho salvo para adelantar. «Bande bus» (F17): reservada al bus y a los usuarios indicados en la señal (taxis, ciclistas…); los demás solo pueden circular por ella para rodear un obstáculo o para girar a la inmediata llegada de un cruce, y cruzarla en un cruce o para entrar o salir de una propiedad o un estacionamiento. «Site spécial franchissable» (F18): solo se cruza (en los cruces o para entrar o salir de una propiedad) o se usa para rodear un obstáculo. Antes de cambiar de carril hay que mirar el «rétroviseur», el ángulo muerto y señalar. En circulación en filas se puede seguir en tu fila aunque adelantes por la derecha, pero no cambiar de fila para ir más rápido. «Tirette» (cremallera): cuando un carril se cierra, se incorpora alternando uno de cada carril justo antes del estrechamiento; es obligatorio en Bélgica.',
    keyTerms: [
      { fr: 'bande bus', es: 'carril bus' },
      { fr: 'site spécial franchissable', es: 'plataforma reservada que se puede cruzar' },
      { fr: 'principe de la tirette', es: 'principio de la cremallera' },
      { fr: 'rétroviseur', es: 'retrovisor' },
      { fr: 'rétrécissement', es: 'estrechamiento' },
    ],
  },
  {
    id: 'man-passage-niveau',
    theme: 'manoeuvres',
    title: { fr: 'Passages à niveau', es: 'Pasos a nivel' },
    body:
      'Nunca entres en un «passage à niveau» si no puedes salir de él de inmediato (atasco al otro lado). Hay que detenerse cuando los «feux rouges clignotants» parpadean, cuando suena la «sonnerie» (campana), cuando las «barrières» se mueven o están cerradas, y cuando un tren se acerca aunque no haya nada activado (en un paso sin barreras ni semáforos, o si no funcionan, solo se entra tras asegurarse de que no llega ningún tren). Prohibido zigzaguear entre medias barreras. Señal A41 (con barreras) / A43 (sin barreras) anuncian el paso a nivel; las «croix de Saint-André» (A45 una vía / A47 dos o más) están justo en el paso. Adelantar en un paso a nivel sin barreras ni semáforos está prohibido.',
    keyTerms: [
      { fr: 'passage à niveau', es: 'paso a nivel' },
      { fr: 'barrières', es: 'barreras' },
      { fr: 'feux rouges clignotants', es: 'luces rojas intermitentes' },
      { fr: 'croix de Saint-André', es: 'cruz de San Andrés (aspa)' },
    ],
  },

  /* ---------------- ÉCLAIRAGE ---------------- */
  {
    id: 'ecl-feux',
    theme: 'eclairage',
    title: { fr: 'Feux du véhicule', es: 'Luces del vehículo' },
    body:
      'Entre la «tombée du jour» (anochecer) y el «lever du jour» (amanecer) y siempre que la visibilidad sea inferior a unos 200 m (lluvia, niebla, nieve, túnel) hay que llevar encendidas delante las «feux de croisement» (luces de cruce) o las «feux de route» (se pueden usar a la vez) y detrás las «feux rouges». Los «feux de route» (largas) se cambian por las cortas al acercarse un usuario de frente, al seguir a otro vehículo a menos de 50 m y cuando el alumbrado público permite ver a unos 100 m. Los «feux de brouillard avant» (antiniebla delanteros) solo con niebla, nieve o lluvia fuerte; el «feu de brouillard arrière» es OBLIGATORIO cuando la niebla o la nieve reducen la visibilidad a menos de 100 m y con lluvia fuerte, y prohibido en otro caso porque deslumbra. Los «feux de détresse» (warning) solo se usan para señalar un vehículo averiado, un riesgo de accidente inminente (p. ej. al frenar fuerte al final de un atasco) o el transporte escolar que sube o baja niños (art. 32bis).',
    keyTerms: [
      { fr: 'feux de croisement', es: 'luces de cruce (cortas)' },
      { fr: 'feux de route', es: 'luces de carretera (largas)' },
      { fr: 'feu de brouillard arrière', es: 'luz antiniebla trasera' },
      { fr: 'feux de position', es: 'luces de posición' },
      { fr: 'tombée du jour', es: 'anochecer' },
    ],
  },
  {
    id: 'ecl-conditions',
    theme: 'eclairage',
    title: { fr: 'Conditions difficiles', es: 'Condiciones difíciles' },
    body:
      '«Brouillard» (niebla): luces de cruce (nunca largas, reflejan), velocidad adaptada a la distancia visible, más distancia de seguridad. «Pluie» (lluvia): riesgo de «aquaplanage» (aquaplaning) a partir de unos 80 km/h; si el volante se vuelve ligero, no frenes ni gires bruscamente, levanta el pie suavemente. «Verglas» (hielo) y «neige»: frenar y girar con suavidad, evitar puentes y zonas de sombra; a menos de 7 °C, las gomas de invierno rinden mejor (no obligatorias en Bélgica). Viento lateral: cuidado al salir de zonas protegidas y al adelantar camiones. Sol bajo («éblouissement», deslumbramiento): reducir velocidad, gafas de sol, parabrisas limpio. Vehículo parado o estacionado de noche: luces de posición delante y rojas detrás (en población basta una «feu de stationnement» del lado del eje si está paralelo a la calzada y sin remolque), salvo que el alumbrado público lo haga visible a unos 100 m (art. 31).',
    keyTerms: [
      { fr: 'brouillard', es: 'niebla' },
      { fr: 'verglas', es: 'hielo en la calzada' },
      { fr: 'aquaplanage', es: 'aquaplaning' },
      { fr: 'éblouissement', es: 'deslumbramiento' },
      { fr: 'visibilité réduite', es: 'visibilidad reducida' },
    ],
  },

  /* ---------------- VÉHICULE ---------------- */
  {
    id: 'veh-documents',
    theme: 'vehicule',
    title: { fr: 'Documents à bord', es: 'Documentos a bordo' },
    body:
      'Debes poder presentar: la «carte d\'identité», el «permis de conduire» (o el provisional), el «certificat d\'immatriculation» (permiso de circulación), el «certificat d\'assurance» (carta verde), el «certificat de conformité» (COC) y, si aplica, el «certificat de visite» del «contrôle technique» (ITV). Un coche nuevo pasa la primera ITV a los 4 años y luego cada año (cada 2 si es poco usado, según reglas regionales). La «vignette» del seguro ya no existe: basta el certificado. Sin seguro no se puede circular; vender el coche implica el «contrôle technique» previo (Car-Pass).',
    keyTerms: [
      { fr: 'certificat d\'immatriculation', es: 'permiso de circulación' },
      { fr: 'certificat de conformité', es: 'certificado de conformidad (COC)' },
      { fr: 'contrôle technique', es: 'inspección técnica (ITV)' },
      { fr: 'certificat d\'assurance', es: 'certificado de seguro' },
      { fr: 'plaque d\'immatriculation', es: 'matrícula' },
    ],
  },
  {
    id: 'veh-securite',
    theme: 'vehicule',
    title: { fr: 'Ceinture, enfants, téléphone', es: 'Cinturón, niños, teléfono' },
    body:
      '«Ceinture de sécurité» obligatoria para todos los ocupantes, delante y detrás, incluso en trayectos cortos; el conductor responde de los menores de 18 años. Niños de menos de 1,35 m: en un «siège pour enfant» (silla) o «rehausseur» (elevador) adaptado; pueden ir delante en silla adecuada (si es contra la marcha, el «airbag» desactivado). Teléfono: prohibido sostener en la mano cualquier «appareil mobile avec écran» mientras se conduce, incluso parado en un semáforo; solo en soporte fijo o manos libres. «Appuie-tête» (reposacabezas) regulado a la altura de la cabeza. Neumáticos: «profondeur des sculptures» (profundidad del dibujo) mínima 1,6 mm; misma clase en un mismo eje. A bordo de todo coche deben ir un triángulo, un «extincteur» (extintor) y una «trousse de secours» (botiquín) (art. 81.2); el chaleco reflectante hay que ponérselo al salir del coche averiado en autopista o «route pour automobiles», así que conviene llevarlo a mano en el habitáculo.',
    keyTerms: [
      { fr: 'ceinture de sécurité', es: 'cinturón de seguridad' },
      { fr: 'siège pour enfant / rehausseur', es: 'silla infantil / elevador' },
      { fr: 'appareil mobile avec écran', es: 'dispositivo móvil con pantalla' },
      { fr: 'pneus', es: 'neumáticos' },
      { fr: 'extincteur', es: 'extintor' },
    ],
  },
  {
    id: 'veh-entretien',
    theme: 'vehicule',
    title: { fr: 'Témoins, niveaux, pneus, visibilité', es: 'Testigos, niveles, neumáticos, visibilidad' },
    body:
      'Los «témoins» (testigos) del cuadro siguen un código de colores: rojo = peligro, detenerse en cuanto sea seguro y apagar el motor («pression d\'huile», presión de aceite; «température», temperatura del líquido de refrigeración; freno); naranja = aviso, se puede seguir con prudencia pero hay que hacer revisar pronto («moteur», ABS, airbag); verde/azul = simple información (luces). Sin presión de aceite el motor se gripa en minutos; con el motor sobrecalentado nunca abrir el «radiateur» en caliente. El «niveau d\'huile» se comprueba con el motor frío o parado unos minutos, en llano, entre las marcas MIN y MAX de la «jauge» (varilla). Presión de los «pneus»: más o menos una vez al mes y antes de un viaje largo, en frío; «profondeur des sculptures» mínima 1,6 mm. Visibilidad: parabrisas limpio, sin «buée» (vaho) ni hielo, y luces y matrícula despejadas antes de arrancar; con el cristal empañado no se circula. «Éco-conduite»: cambiar pronto de marcha, anticipar, velocidad estable, no calentar el motor parado.',
    keyTerms: [
      { fr: 'témoin (lumineux)', es: 'testigo del cuadro' },
      { fr: 'pression d\'huile', es: 'presión de aceite' },
      { fr: 'liquide de refroidissement', es: 'líquido de refrigeración' },
      { fr: 'jauge', es: 'varilla del aceite' },
      { fr: 'buée', es: 'vaho' },
    ],
  },
  {
    id: 'veh-masses',
    theme: 'vehicule',
    title: { fr: 'Permis B : masses et remorques', es: 'Permiso B: masas y remolques' },
    body:
      'El permiso B autoriza vehículos de «MMA» («masse maximale autorisée») hasta 3.500 kg y máximo 8 plazas además del conductor. Remolque: hasta 750 kg de MMA siempre; más de 750 kg si la suma de las MMA (coche + remolque) no supera 3.500 kg. Por encima: código «B96» (hasta 4.250 kg) o permiso «BE». Con remolque la velocidad y la distancia de frenado cambian; la «charge» (carga) debe ir bien sujeta y no sobresalir más de lo permitido (señalizar con panel rojo/blanco si sobresale detrás más de 1 m). La MMA figura en el certificado de conformidad.',
    keyTerms: [
      { fr: 'masse maximale autorisée (MMA)', es: 'masa máxima autorizada' },
      { fr: 'remorque', es: 'remolque' },
      { fr: 'charge', es: 'carga' },
      { fr: 'chargement', es: 'carga (acción/lo cargado)' },
    ],
  },

  /* ---------------- PERMIS ---------------- */
  {
    id: 'per-provisoire',
    theme: 'permis',
    title: { fr: 'Le permis provisoire B', es: 'El permiso provisional B' },
    body:
      'Tras aprobar el teórico (válido 3 años) se obtiene un «permis de conduire provisoire»: «M36» (desde 17 años, siempre con un «guide» registrado, válido 36 meses) o «M18» (desde 18 años, tras 20 horas en «auto-école», válido 18 meses, se puede conducir solo). Si caduca sin aprobar, existe el «M12» de 12 meses con guía. Obligaciones con permiso provisional: placa «L» visible detrás, un periodo mínimo de prácticas («stage») antes del práctico (en Bruselas: 9 meses con M36, o 6 meses si se han hecho 14 h de autoescuela; 3 meses con M18), prohibido conducir de 22 h a 6 h los viernes, sábados, domingos y vísperas y días festivos, prohibido remolcar, y el guía debe tener el permiso B desde al menos 8 años. En Bruselas también hay que aprobar el «test de perception des risques» (válido 1 año) antes de la prueba en la vía pública; la formación de primeros auxilios dejó de ser obligatoria el 15 de agosto de 2026.',
    keyTerms: [
      { fr: 'permis provisoire', es: 'permiso provisional' },
      { fr: 'guide', es: 'acompañante (guía)' },
      { fr: 'stage', es: 'periodo de prácticas' },
      { fr: 'auto-école', es: 'autoescuela' },
      { fr: 'veille de jour férié', es: 'víspera de día festivo' },
    ],
  },
  {
    id: 'per-sanctions',
    theme: 'permis',
    title: { fr: 'Infractions et sanctions', es: 'Infracciones y sanciones' },
    body:
      'Bélgica no tiene permiso por puntos. Las infracciones se dividen en cuatro «degrés» (grados): 1er grado (leves, p. ej. no señalar), 2.º (p. ej. teléfono en mano, no llevar cinturón), 3.º (p. ej. saltarse un rojo, adelantar peligrosamente), 4.º (las más graves, p. ej. dar marcha atrás en autopista, adelantar en paso a nivel). Las de 4.º grado pasan siempre por el «tribunal de police» con «déchéance du droit de conduire» (retirada del derecho a conducir) de 8 días mínimo. Exceso de velocidad: multa creciente según los km/h de más; por encima de +30 km/h en población, zona 30, entorno escolar o zona residencial (+40 km/h en las demás vías) ya no se puede pagar en el acto: hay citación ante el tribunal. El «retrait immédiat du permis» lo decide el fiscal (p. ej. alcohol ≥0,8, exceso muy grande). Un conductor novel (menos de 2 años) puede tener que repetir exámenes tras ciertas condenas.',
    keyTerms: [
      { fr: 'infraction', es: 'infracción' },
      { fr: 'amende', es: 'multa' },
      { fr: 'déchéance du droit de conduire', es: 'retirada del derecho a conducir' },
      { fr: 'tribunal de police', es: 'tribunal de policía (juzgado de tráfico)' },
      { fr: 'degré', es: 'grado (de una infracción)' },
    ],
  },
  {
    id: 'per-general',
    theme: 'permis',
    title: { fr: 'Règles générales de comportement', es: 'Reglas generales de comportamiento' },
    body:
      'Todo conductor debe estar en condiciones de conducir («en état de conduire»), tener el control del vehículo en todo momento y no poner en peligro a los demás. Hay que señalar toda maniobra con el «clignotant» con antelación. El «klaxon» (bocina) solo se usa, lo más breve posible, para evitar un accidente y, fuera de población, para avisar de que vas a adelantar; de noche se sustituye por una ráfaga corta alternando largas y cortas, salvo peligro inminente (art. 33). La «courtoisie» no crea derechos: si alguien te cede el paso por cortesía, sigues siendo responsable de comprobar que es seguro. El conductor es responsable de los daños que cause su carga o su vehículo, y debe dar «nom et adresse» tras un accidente. Está prohibido conducir con un vehículo cuya visibilidad esté reducida (parabrisas helado, carga que tape).',
    keyTerms: [
      { fr: 'en état de conduire', es: 'en condiciones de conducir' },
      { fr: 'avertisseur sonore', es: 'bocina' },
      { fr: 'appel de phares', es: 'ráfaga de luces' },
      { fr: 'mettre en danger', es: 'poner en peligro' },
      { fr: 'usager', es: 'usuario de la vía' },
    ],
  },

  /* ---------------- EXTRA3 ---------------- */
  {
    id: 'z3-prio-complements',
    theme: 'priorite',
    title: { fr: 'Priorité : cas particuliers', es: 'Prioridad: casos particulares' },
    body:
      'La «priorité de droite» vale para todos los conductores, también para los «cyclistes»: un ciclista que llega por tu derecha a un cruce sin señales pasa antes que tú. Vale igualmente en los cruces en T: el que sale de la rama que termina tiene prioridad sobre quien llega por su izquierda, y cede a quien llega por su derecha. Circular por una calle de «sens unique» (sentido único) no da ninguna prioridad: en el cruce se aplican las señales o, sin ellas, la prioridad de la derecha. ' +
      'El que «tourne à gauche» (gira a la izquierda) cede el paso a los que vienen de frente, también cuando los dos tienen el «feu vert» o circulan por la misma «voie prioritaire»: el verde o la B9 no te dan prioridad frente al que viene de cara. ' +
      'Un «clignotant» (intermitente) solo anuncia una intención: el conductor que circula por el anillo de una rotonda conserva su prioridad mientras no haya salido, aunque ponga el intermitente derecho. Espera a estar seguro de que sale de verdad antes de entrar. ' +
      'Aunque el semáforo esté en verde, está prohibido «s\'engager dans un carrefour» (entrar en un cruce) si el tráfico está tan cargado que te quedarías parado en medio y bloquearías a los demás: espera antes del cruce a que haya sitio al otro lado.',
    keyTerms: [
      { fr: 'tourner à gauche', es: 'girar a la izquierda' },
      { fr: 'sens unique', es: 'sentido único' },
      { fr: 's\'engager dans un carrefour', es: 'entrar en un cruce' },
      { fr: 'clignotant', es: 'intermitente' },
      { fr: 'carrefour encombré', es: 'cruce atascado' },
    ],
  },
  {
    id: 'z3-vit-complements',
    theme: 'vitesse',
    title: { fr: 'Vitesse : remorque, permis provisoire, contrôles', es: 'Velocidad: remolque, permiso provisional, controles' },
    body:
      'Los vehículos y «trains de véhicules» (conjuntos con remolque) cuya «masse maximale autorisée» (MMA) supera las 3,5 t están limitados a 90 km/h en autopista y en las vías de 2×2 carriles separados. Un coche con remolque cuyo conjunto no pasa de 3,5 t sigue los límites normales del coche: 120 km/h en autopista. ' +
      'Con «permis provisoire» (M36, M18, M12) no hay límites de velocidad especiales en Bélgica: se aplican los mismos que a todos los conductores (las restricciones del provisional son otras: placa «L», horarios, sin remolque…). ' +
      'En un «contrôle de vitesse moyenne» (control por tramo, «trajectcontrole») la cámara calcula tu velocidad media entre dos puntos, pero el límite se aplica en todo momento: ir más rápido en una parte y compensar después sigue siendo un exceso de velocidad. ' +
      'El «temps de réaction» (≈ 1 s) se alarga con la fatiga, el alcohol, las drogas o la distracción (teléfono): eso aumenta la «distance de réaction», no la de frenado, que depende de la velocidad, de los neumáticos y del estado de la calzada. La distancia de frenado crece con el cuadrado de la velocidad: el triple de velocidad = nueve veces más distancia. Con la regla del examen, a 30 km/h la distancia de detención en seco es de unos 18 m (9 m de reacción + 9 m de frenado), frente a unos 40 m a 50 km/h. Con calzada mojada la distancia de frenado se duplica: deja bastante más de 2 segundos (por ejemplo 4) con el vehículo de delante. ' +
      'En una «zone piétonne» (F103) los vehículos autorizados a entrar circulan «au pas» (a paso de persona). En Bruselas el límite general en población es 30 km/h, pero algunas vías señalizadas con C43 permiten 50 o 70 km/h.',
    keyTerms: [
      { fr: 'masse maximale autorisée (MMA)', es: 'masa máxima autorizada' },
      { fr: 'remorque', es: 'remolque' },
      { fr: 'contrôle de vitesse moyenne', es: 'control de velocidad media (por tramo)' },
      { fr: 'temps de réaction', es: 'tiempo de reacción' },
      { fr: 'au pas', es: 'a paso de persona' },
    ],
  },
  {
    id: 'z3-dep-complements',
    theme: 'depassement',
    title: { fr: 'Dépassement : signaux et cas particuliers', es: 'Adelantamiento: señales y casos particulares' },
    body:
      'La señal «C35» prohíbe adelantar por la izquierda a vehículos de más de dos ruedas (coches, camiones…) y a los vehículos de tracción animal, desde la señal hasta el próximo cruce inclusive: sigue permitido adelantar a ciclistas, ciclomotores y motos si hay sitio y se respeta la distancia lateral (1 m en población, 1,5 m fuera). La señal «C39» solo afecta a los conductores de vehículos de transporte de mercancías de más de 3,5 t: ellos no pueden adelantar hasta el próximo cruce (o hasta la «C41»); un coche sí puede adelantar a un camión. ' +
      'Los motoristas pueden «remonter les files» (circular entre dos filas de vehículos) cuando el tráfico va lento o está parado, a 50 km/h como máximo y sin ir más de 20 km/h más rápido que las filas. ' +
      'Por la derecha solo se adelanta a un tranvía, a quien ha señalado que gira a la izquierda y se ha colocado a la izquierda, o en «circulation en files». En autopista con tráfico fluido no se adelanta por la derecha a quien ocupa sin motivo el carril central: se le adelanta por la izquierda. La «bande d\'arrêt d\'urgence» (arcén de emergencia) no es un carril: nunca se usa para adelantar ni para avanzar en un atasco.',
    keyTerms: [
      { fr: 'interdiction de dépasser', es: 'prohibición de adelantar' },
      { fr: 'remonter les files', es: 'circular entre filas (motos)' },
      { fr: 'bande d\'arrêt d\'urgence', es: 'arcén de emergencia' },
      { fr: 'véhicule à plus de deux roues', es: 'vehículo de más de dos ruedas' },
    ],
  },
  {
    id: 'z3-alc-complements',
    theme: 'alcool',
    title: { fr: 'Alcool : air expiré, alcolock, ivresse, fatigue', es: 'Alcohol: aire espirado, alcolock, embriaguez, fatiga' },
    body:
      'La tasa se mide en sangre (g/l) o en «air alvéolaire expiré» (aire espirado): 0,5 g/l en sangre = 0,22 mg/l (220 µg/l) de aire; para los profesionales, 0,2 g/l = 0,09 mg/l (90 µg/l). ' +
      'El «éthylotest antidémarrage» o «alcolock» impide arrancar si la tasa supera 0,2 g/l. Desde 2018, ante una primera condena con 1,8 g/l o más, el juez debe imponerlo en principio (solo puede no hacerlo motivándolo); también en caso de reincidencia (dos condenas en tres años con al menos 1,2 g/l). Desde 0,8 g/l el juez puede imponerlo. ' +
      'Además de la tasa, se castiga la «conduite en état d\'ivresse» (signos de embriaguez) y el «état analogue» causado por drogas o medicamentos, aunque la tasa de alcohol sea inferior a 0,5 g/l. El alcohol altera la conducción desde unos 0,2 g/l: reflejos más lentos, peor visión y, sobre todo, se sobrestiman las propias capacidades. Mezclado con medicamentos (calmantes, somníferos) o drogas, los efectos se suman y se refuerzan. ' +
      'Fatiga: unas 24 horas sin dormir equivalen aproximadamente a 1 g/l de alcohol. Señales de alarma: bostezos, párpados pesados, no recordar los últimos kilómetros, salirse del carril. Haz una pausa cada 2 horas en los viajes largos y, si aparecen esas señales, para en cuanto sea posible y duerme un poco.',
    keyTerms: [
      { fr: 'air alvéolaire expiré', es: 'aire alveolar espirado' },
      { fr: 'éthylotest antidémarrage (alcolock)', es: 'alcoholímetro antiarranque' },
      { fr: 'état d\'ivresse', es: 'estado de embriaguez' },
      { fr: 'état analogue', es: 'estado análogo (por drogas o medicamentos)' },
      { fr: 'somnolence', es: 'somnolencia' },
    ],
  },

  /* ---------------- EXTRA4 ---------------- */
  {
    id: 'x4-sig-feux-agents',
    theme: 'signaux',
    title: { fr: 'Feux au-dessus des bandes, flèches et agents', es: 'Semáforos de carril, flechas y agentes' },
    body:
      'Jerarquía: las órdenes de un «agent qualifié» priman sobre los semáforos, las señales y las reglas; la señalización prima sobre las reglas de circulación. Cuando un semáforo funciona en un cruce, las señales de prioridad colocadas en esa misma vía (B1, B5, B9…) quedan sin efecto: manda el semáforo. No ocurre con el ámbar intermitente (entonces sí valen las señales) ni con las señales B22/B23 de los ciclistas (art. 6.3). ' +
      'Agentes: brazo levantado verticalmente = «arrêt» para todos, salvo para los que ya están dentro del cruce, que deben despejarlo («évacuer le carrefour»). Brazo o brazos extendidos horizontalmente = alto para los que llegan de las direcciones que cortan la de los brazos. Balanceo transversal de una luz roja = alto para los conductores hacia los que apunta. ' +
      'Semáforos sobre los carriles («signaux au-dessus des bandes»): cruz roja = prohibido circular por ese carril; flecha verde apuntando hacia abajo = puedes circular por ese carril; flecha naranja oblicua (a veces intermitente) = prohibido seguir por ese carril, salvo para dejarlo en la dirección de la flecha. ' +
      'Flecha de evacuación: una flecha verde hacia la izquierda, sola, a la salida del cruce, significa que el tráfico que viene de frente por la calzada que abandonas está detenido con un rojo: puedes terminar tu giro a la izquierda y despejar el cruce.',
    keyTerms: [
      { fr: 'agent qualifié', es: 'agente autorizado' },
      { fr: 'évacuer le carrefour', es: 'despejar el cruce' },
      { fr: 'croix rouge', es: 'cruz roja (carril cerrado)' },
      { fr: 'flèche d\'évacuation', es: 'flecha de evacuación' },
      { fr: 'signaux au-dessus des bandes', es: 'semáforos de carril' },
    ],
  },
  {
    id: 'x4-sig-marques',
    theme: 'signaux',
    title: { fr: 'Lignes, damiers, triangles et bande bus', es: 'Líneas, damero, triángulos y carril bus' },
    body:
      'Líneas longitudinales (blancas): «ligne continue» = prohibido cruzarla; si separa los dos sentidos, también circular a su izquierda. «Ligne discontinue» = prohibido cruzarla salvo para adelantar, girar a la izquierda, dar media vuelta o cambiar de carril; no se circula montado sobre ella. Si los trazos son más cortos y juntos, anuncian una línea continua. Línea continua + discontinua: cuenta solo la de tu lado (quien la cruzó para adelantar puede volver a su sitio). ' +
      'Marcas transversales: línea blanca continua = «ligne d\'arrêt» (STOP o semáforo). Línea de triángulos blancos = lugar donde detenerse si hace falta para ceder el paso (señal B1); no obliga a parar siempre, a diferencia del STOP. ' +
      '«Damier» (cuadros blancos en damero): delimita el «site spécial franchissable» del transporte público, los espacios que unen esos sitios o un paso a nivel. Prohibido parar y estacionar sobre él, aunque sea un momento. ' +
      '«Bande bus» (F17): delimitada por una o dos líneas blancas anchas discontinuas o por damero. Reservada al bus y a los usuarios indicados en la señal (taxis, ciclistas…). Los demás solo pueden rodear un obstáculo, circular por ella para girar a la inmediata llegada de un cruce, cruzarla en un cruce y cruzarla para entrar o salir de una propiedad o de un estacionamiento. Recorrerla para ahorrarse un atasco está prohibido.',
    keyTerms: [
      { fr: 'ligne discontinue', es: 'línea discontinua' },
      { fr: 'ligne d\'arrêt', es: 'línea de detención' },
      { fr: 'marques en damier', es: 'marcas en damero' },
      { fr: 'site spécial franchissable', es: 'plataforma reservada franqueable' },
      { fr: 'bande bus', es: 'carril bus' },
    ],
  },
  {
    id: 'x4-sta-regles',
    theme: 'stationnement',
    title: { fr: 'Stationnement : distances, trottoirs et zone bleue', es: 'Estacionar: distancias, aceras y zona azul' },
    body:
      'Dónde colocarse: a la derecha en el sentido de la marcha (en sentido único, a cualquier lado), en el «accotement» de plain-pied si existe. Si es un arcén que deben usar los peatones, hay que dejarles al menos 1,50 m libre del lado exterior. Las aceras («trottoirs») están prohibidas para parar y estacionar salvo señal que lo autorice (E9e, E9f). ' +
      'Prohibiciones que se olvidan: a menos de 1 m delante o detrás de otro vehículo parado o estacionado; cuando el paso libre que queda en la calzada sería inferior a 3 m; a menos de 20 m antes de una señal de tráfico o de un semáforo (para las señales y los semáforos situados fuera de un cruce, la regla no se aplica a los vehículos de hasta 1,65 m de altura, carga incluida, si el borde inferior de la señal está a 2 m o más del suelo: un coche normal no la tapa, una furgoneta alta sí); en la calzada dividida en carriles de circulación («bandes de circulation»), salvo donde una señal E9a/E9b lo permite; fuera de población, en la calzada de una vía con señal B9 (vía con prioridad). Además, las ya conocidas: 5 m antes de pasos de peatones y de la esquina del cruce, 15 m a cada lado de una parada de bus o tram, entradas de garaje. ' +
      'Zona azul y estacionamiento de pago: disco obligatorio los días laborables de 9 a 18 h, 2 h máximo, salvo otra indicación. Si el parquímetro u «horodateur» está averiado, hay que usar el disco según las reglas de la zona azul. La «carte de riverain» (tarjeta municipal de residente) colocada detrás del parabrisas sustituye al disco donde la reglamentación lo prevé. La tarjeta especial de persona con discapacidad, visible detrás del parabrisas, sustituye al disco y hace que no se apliquen las limitaciones de duración.',
    keyTerms: [
      { fr: 'accotement', es: 'arcén' },
      { fr: 'passage libre', es: 'paso libre (3 m)' },
      { fr: 'horodateur', es: 'parquímetro' },
      { fr: 'carte de riverain', es: 'tarjeta de residente' },
      { fr: 'carte spéciale', es: 'tarjeta de discapacidad' },
      { fr: 'bande de circulation', es: 'carril' },
    ],
  },
  {
    id: 'x4-aut-acces',
    theme: 'autoroute',
    title: { fr: 'Autoroute et route pour automobiles : accès et bandes', es: 'Autopista y vía para automóviles: acceso y carriles' },
    body:
      'Quién no puede entrar: en autopista, peatones, ciclos, «cyclomoteurs», animales, vehículos que no pueden alcanzar 70 km/h en llano, vehículos que remolcan a otro con una «attache de fortune» (cuerda, cable), quads sin habitáculo y vehículos agrícolas. En la «route pour automobiles» (F9): solo vehículos de motor y sus remolques, salvo ciclomotores, vehículos agrícolas y quads sin habitáculo. En las dos están prohibidos el media vuelta, la marcha atrás, parar y estacionar fuera de las áreas E9a y usar los «raccordements transversaux» (pasos en la mediana). ' +
      'Entrar y velocidad mínima: en la «bande d\'accélération» se toma velocidad para adaptarse a la del tráfico y uno se incorpora cediendo el paso a los que ya circulan; parar al final solo si no queda otra. En autopista, mínimo 70 km/h, salvo que una señal C43 imponga un límite inferior (obras, por ejemplo): entonces se respeta esa señal. ' +
      'Atascos y carriles: en filas, que un carril vaya más rápido que otro no es adelantar; pero pasarse a la derecha para adelantar y volver sí es un adelantamiento por la derecha, prohibido. «Couloir de secours» (pasillo de emergencia): quien va en el carril izquierdo se pega a la izquierda y todos los demás carriles se pegan a la derecha; el pasillo queda junto al carril izquierdo. «Bande d\'arrêt d\'urgence»: además de los vehículos prioritarios, pueden circular por ella las grúas («dépanneuses», con luces naranja intermitentes) y los servicios requeridos por la policía para llegar a un incidente cuando el tráfico está muy lento o parado. «Bande réservée aux heures de pointe»: se usa según las señales o los semáforos de carril; si no funcionan, está prohibida salvo para entrar o salir de la autopista, para cambiar de dirección y en los casos de la banda de emergencia.',
    keyTerms: [
      { fr: 'route pour automobiles', es: 'vía para automóviles' },
      { fr: 'bande d\'accélération', es: 'carril de aceleración' },
      { fr: 'couloir de secours', es: 'pasillo de emergencia' },
      { fr: 'dépanneuse', es: 'grúa' },
      { fr: 'bande réservée aux heures de pointe', es: 'carril de horas punta' },
    ],
  },
  {
    id: 'x4-usa-protection',
    theme: 'usagers-faibles',
    title: { fr: 'Trottinettes, rue scolaire, groupes et cavaliers', es: 'Patinetes, calle escolar, grupos y jinetes' },
    body:
      '«Engins de déplacement» (patinetes eléctricos, monociclos…): los motorizados se asimilan a los ciclistas; los no motorizados, a peatones si van al paso y a ciclistas si van más rápido. Las reglas que debes respetar frente a ciclistas valen también para ellos: 1 m de distancia lateral en población, 1,5 m fuera. ' +
      'Peatones en la calzada: al pasar junto a un peatón que circula por la calzada, 1 m en población y 1,5 m fuera; si no puedes dejar esa distancia, vas al paso y te detienes si hace falta. Redobla la prudencia con niños, mayores y personas con discapacidad, en especial los ciegos con bastón blanco o amarillo: reducir y, si hace falta, parar. ' +
      'Pistas ciclistas y aceras: quien cruza una acera o una «piste cyclable» (salir de un garaje, entrar en un parking) debe ceder el paso a quienes circulan por ellas. ' +
      '«Rue cyclable» / zona ciclista (F111): accesible a los coches, sin adelantar a los ciclistas y a 30 km/h como máximo. El ciclista puede ocupar toda la anchura si la calzada es de un solo sentido, y la mitad derecha si es de doble sentido. ' +
      '«Rue scolaire» (calle escolar): reservada a peatones y ciclistas durante el horario indicado en la señal (C3 con placa). Solo entran vehículos prioritarios en misión y los autorizados por el gestor: al paso, cediendo el paso a peatones y ciclistas y parando si hace falta. ' +
      'SUL (sentido único limitado): si circulas por un sentido único abierto a los ciclistas en contrasentido (placa M4 bajo la F19) y la calzada es estrecha, «le croisement s\'effectue à droite»: cíñete a la derecha y, si hace falta, detente para dejarlos pasar. ' +
      'Transporte escolar: los vehículos de transporte escolar llevan un panel cuadrado. Cuando el conductor enciende todos los intermitentes, los niños van a subir o bajar: hay que reducir fuertemente y, si es necesario, detenerse. ' +
      'Grupos y jinetes: prohibido cortar un cortejo, un grupo de peatones o una procesión. Un «chef de groupe» (por ejemplo, de un grupo de 10 jinetes o más) o un «signaleur» habilitado puede detener la circulación mostrando un disco con la señal C3: hay que obedecer.',
    keyTerms: [
      { fr: 'engin de déplacement', es: 'vehículo de movilidad personal' },
      { fr: 'rue scolaire', es: 'calle escolar' },
      { fr: 'rue cyclable', es: 'calle ciclista' },
      { fr: 'chef de groupe', es: 'jefe de grupo' },
      { fr: 'canne blanche ou jaune', es: 'bastón blanco o amarillo' },
      { fr: 'transport scolaire', es: 'transporte escolar' },
    ],
  },
  {
    id: 'x4-man-manoeuvres',
    theme: 'manoeuvres',
    title: { fr: 'Manœuvres, tirette et passages à niveau', es: 'Maniobras, cremallera y pasos a nivel' },
    body:
      'Qué es una «manœuvre»: cambiar de carril o de fila, cruzar la calzada, salir de un estacionamiento o entrar en él, salir de una propiedad (garaje, aparcamiento privado), dar media vuelta o marcha atrás. Quien maniobra cede el paso a todos los demás usuarios (coches, ciclistas, peatones), aunque haya puesto el intermitente: el intermitente avisa, no da prioridad. La marcha atrás está prohibida en autopista y en «route pour automobiles». ' +
      'Girar: para girar a la izquierda en una calzada de sentido único, colócate lo más a la izquierda posible; en doble sentido, hacia el eje sin molestar a los que vienen de frente. Para girar a la derecha, lo más a la derecha posible. ' +
      '«Tirette» (cremallera): cuando el tráfico va muy lento y un carril termina o está cortado, los de ese carril se incorporan justo antes del estrechamiento, y los del carril libre ceden el paso por turnos: uno de cada carril. No es una maniobra en el sentido del código: ni se fuerza el paso ni se bloquea. ' +
      'Pasos a nivel: prohibido entrar cuando las barreras se mueven o están cerradas, cuando los «feux rouges clignotants» están encendidos o cuando suena la señal acústica (aunque las luces no funcionen). En un paso sin barreras ni semáforos, o si los semáforos no funcionan, solo se puede entrar tras asegurarse de que no llega ningún tren. Nunca entres si el atasco puede dejarte parado encima.',
    keyTerms: [
      { fr: 'manœuvre', es: 'maniobra' },
      { fr: 'propriété riveraine', es: 'propiedad colindante' },
      { fr: 'tirette', es: 'cremallera' },
      { fr: 'signal sonore', es: 'señal acústica' },
      { fr: 'véhicule sur rails', es: 'vehículo sobre raíles (tren, tram)' },
    ],
  },
  {
    id: 'x4-ecl-usage',
    theme: 'eclairage',
    title: { fr: 'Emploi des feux : route, brouillard, stationnement', es: 'Uso de las luces: largas, antiniebla, estacionamiento' },
    body:
      'Largas y cortas: de noche (o con menos de unos 200 m de visibilidad) se pueden usar las «feux de croisement» y las «feux de route», incluso a la vez. Las largas se apagan y se cambian por las cortas: al acercarse un usuario de frente, y en todo caso cuando un conductor hace ráfagas rápidas porque está deslumbrado; al acercarse a un tranvía o tren (o un barco) cuyo conductor podría deslumbrarse; al seguir a otro vehículo a menos de 50 m (salvo al adelantarlo); con alumbrado continuo que permite ver a unos 100 m. ' +
      'Antiniebla: los «feux de brouillard avant» solo con niebla, nieve o lluvia fuerte; en esos casos pueden sustituir a las cortas o a las largas o sumarse a ellas. El antiniebla trasero: obligatorio con niebla o nieve que reducen la visibilidad a menos de unos 100 m y con lluvia fuerte; prohibido en los demás casos. ' +
      'Luces de día (DRL): las «feux de jour» no sustituyen a las de cruce: en muchos coches no encienden las luces traseras. Al anochecer, en el túnel o con mala visibilidad hay que poner las cortas. ' +
      'Estacionado de noche: delante luces de posición blancas o amarillas, detrás rojas. En población, si el coche está paralelo a la calzada y sin remolque, basta una «feu de stationnement», la del lado del eje de la calzada. Nada de esto es obligatorio si el alumbrado público hace visible el coche a unos 100 m. ' +
      'Faros limpios: barro, sal o nieve sobre los faros reducen mucho la luz y la visibilidad del coche; hay que limpiarlos antes de salir, igual que los cristales.',
    keyTerms: [
      { fr: 'feux de route', es: 'luces largas' },
      { fr: 'feux de croisement', es: 'luces de cruce' },
      { fr: 'feux de brouillard avant', es: 'antinieblas delanteros' },
      { fr: 'feu de stationnement', es: 'luz de estacionamiento' },
      { fr: 'feux de jour', es: 'luces de conducción diurna' },
    ],
  },
  {
    id: 'x4-veh-transport',
    theme: 'vehicule',
    title: { fr: 'Passagers, enfants, chargement et plaque', es: 'Pasajeros, niños, carga y matrícula' },
    body:
      'Pasajeros: no puede haber más ocupantes que plazas con cinturón (o que no deben tenerlo). Prohibido llevar personas en el exterior de la carrocería. Cinturón para todos; dispensado el conductor mientras hace marcha atrás. ' +
      'Niños de menos de 18 años y menos de 135 cm: siempre en un dispositivo de retención adaptado (silla, elevador). En una plaza sin cinturón no se lleva a ningún niño de menos de 3 años (y delante, a ninguno de menos de 135 cm). Excepción 1: si tras instalar dos sillas no cabe una tercera, el tercer niño (3 años o más) puede ir detrás con el cinturón. Excepción 2: transporte ocasional y de corta distancia sin sillas suficientes: niños de 3 años o más detrás con el cinturón, pero no si quien conduce es su padre o su madre. Silla contra la marcha delante: airbag desactivado. ' +
      'Carga: debe estar sujeta y no puede tapar la visibilidad, ni las luces ni la matrícula, ni arrastrar o caer. En un coche, la carga nunca puede sobresalir por delante; por detrás, como mucho 1 m (en Bruselas y Valonia; hasta 3 m con piezas largas indivisibles), y si sobresale más de 1 m se señaliza con un panel cuadrado de franjas rojas y blancas. Un portabicicletas que tapa la matrícula necesita una placa adicional oficial reproducida en él (y luces si tapa las del coche). ' +
      'Matrícula y venta: en Bélgica la placa es personal: pertenece al titular, no al coche. Al vender el coche te quedas la placa (se pasa al coche nuevo o se devuelve a la DIV). Al vender un coche de ocasión hay que entregar el Car-Pass al comprador (historial de kilómetros); sin él, la venta puede anularse.',
    keyTerms: [
      { fr: 'dispositif de retenue pour enfants', es: 'sistema de retención infantil' },
      { fr: 'plaque d\'immatriculation', es: 'placa de matrícula' },
      { fr: 'porte-vélos', es: 'portabicicletas' },
      { fr: 'galerie de toit', es: 'baca' },
      { fr: 'Car-Pass', es: 'certificado de kilometraje' },
    ],
  },
  {
    id: 'x4-per-categories',
    theme: 'permis',
    title: { fr: 'Âges, guides, catégories et permis étranger', es: 'Edades, guías, categorías y permiso extranjero' },
    body:
      'Edades y provisional: examen teórico desde los 17 años (el resultado vale 3 años); práctico desde los 18. El provisional M36 (desde 17 años) se usa con uno o dos guías inscritos; el M18 (en Bruselas, tras 20 h de autoescuela) permite conducir solo; ninguno de los dos es renovable (si caduca, hay que pasar por otro modelo, como el M12, o por la autoescuela). ' +
      'El guía: permiso B belga o europeo desde hace al menos 8 años y sin «déchéance du droit de conduire» en los últimos 3 años. No basta con tener muchos años de permiso. ' +
      'Remolques, código 96 y BE: con B, remolque hasta 750 kg, o más si el conjunto no supera 3.500 kg. B + código 96: conjunto de hasta 4.250 kg; se obtiene aprobando un examen práctico. Por encima, la categoría BE (conjunto hasta 7.000 kg). ' +
      'Otras categorías: el B incluye automáticamente la categoría AM (ciclomotores de 45 km/h). Una moto exige un permiso de categoría A (A1, A2 o A según la potencia). ' +
      'Aptitud médica: para el B (grupo 1) no hay examen médico obligatorio: el candidato firma una declaración de aptitud física y mental. Solo si no puede firmarla (enfermedad que afecta a la conducción) necesita un certificado médico. Los conductores profesionales (grupo 2: camión, bus, taxi…) sí pasan reconocimiento. ' +
      'Permiso extranjero: un permiso de la UE/EEE válido sirve en Bélgica: no hay que cambiarlo de inmediato (solo en casos concretos: pérdida, robo, deterioro, permiso sin fecha de caducidad…). Un permiso de fuera de la UE de un modelo no reconocido no se puede canjear: hay que aprobar el teórico y el práctico belgas.',
    keyTerms: [
      { fr: 'guide', es: 'acompañante (guía)' },
      { fr: 'déchéance du droit de conduire', es: 'retirada judicial del derecho a conducir' },
      { fr: 'code 96', es: 'código 96 (remolque, 4.250 kg)' },
      { fr: 'déclaration d\'aptitude', es: 'declaración de aptitud' },
      { fr: 'échange de permis', es: 'canje del permiso' },
    ],
  },

  /* ---------------- PANNEAUX ---------------- */
  {
    id: 'pan-formes',
    theme: 'panneaux',
    title: { fr: 'Reconnaître un signal à sa forme et à sa couleur', es: 'Reconocer una señal por su forma y su color' },
    body:
      'En el examen la señal aparece sin nombre: hay que reconocer la familia de un vistazo. ' +
      'Triángulo con la punta hacia arriba y borde rojo: «A» danger (peligro). Triángulo invertido, octógono STOP o rombo amarillo: «B» priorité. Círculo blanco con borde rojo: «C» interdiction (prohibición). Círculo azul con símbolo blanco: «D» obligation (obligación). Círculo azul con borde rojo y barra o cruz roja: «E» arrêt et stationnement. Rectángulo o cuadrado azul (o blanco): «F» indication. ' +
      'Una señal tachada con una barra oblicua (negra, gris o roja) indica el fin de lo que anunciaba: fin de prohibición (C37, C45, C46), fin de zona (F4b, F12b, F113), fin de población (F3), fin de autopista (F7). ' +
      'Fondo naranja o amarillo: señalización provisional de obras o desvío («déviation», F39, F41). ' +
      'Fondo marrón: destino turístico (F35). Fondo blanco con flecha: dirección por carretera ordinaria. ' +
      'Debajo de una señal puede haber un «panneau additionnel» (placa rectangular) que completa, precisa o limita su sentido: distancia, longitud del tramo, horario, categoría de vehículos, excepciones.',
    keyTerms: [
      { fr: 'signal de danger', es: 'señal de peligro (triángulo)' },
      { fr: 'signal d\'interdiction', es: 'señal de prohibición (círculo rojo)' },
      { fr: 'signal d\'obligation', es: 'señal de obligación (círculo azul)' },
      { fr: 'signal d\'indication', es: 'señal de indicación (rectángulo)' },
      { fr: 'fin d\'interdiction', es: 'fin de la prohibición (barra oblicua)' },
    ],
  },
  {
    id: 'pan-danger',
    theme: 'panneaux',
    title: { fr: 'Les signaux de danger (A)', es: 'Las señales de peligro (A)' },
    body:
      'Las señales «A» no prohíben ni obligan: avisan de un peligro para que reduzcas y te prepares a tiempo. ' +
      'Dónde se colocan. ' +
      'A la derecha, a unos 150 m del lugar peligroso (art. 66.2 del código, Bruselas y Flandes). Si la distancia es otra, una placa adicional la indica (p. ej. «200 m»). ' +
      'Excepción: las cruces de San Andrés (A45 una vía, A47 dos vías o más) se colocan en el mismo paso a nivel, no antes. ' +
      'Una placa con flechas verticales y una longitud (p. ej. «2 km») indica que el peligro se extiende a lo largo de ese tramo. ' +
      'Las principales. ' +
      'Trazado: A1a/A1b curva a la izquierda/derecha; A1c doble curva, la primera a la izquierda; A3 bajada peligrosa (freno motor); A5 subida pronunciada; A7a/b/c estrechamiento de la calzada (por los dos lados, por la derecha, por la izquierda). ' +
      'Firme: A13 badén o bache («cassis ou dos d\'âne»); A14 resalto («dispositif surélevé»): se pasa a 30 km/h como máximo; A15 calzada resbaladiza; A17 proyección de gravilla (reduce y aumenta la distancia); A19 desprendimiento de piedras. ' +
      'Lugares: A9 puente móvil; A11 salida a un muelle o ribera; A33 semáforos; A35 aviones a baja altura; A37 viento lateral; A39 vuelve la circulación en los dos sentidos tras un tramo de sentido único; A50 riesgo de retenciones («file»); A31 obras. ' +
      'Usuarios y animales: A21 paso de peatones (el F49 azul está en el mismo paso; el A21 lo anuncia); A23 lugar frecuentado por niños; A25 ciclistas y ciclomotores que cruzan o salen de una pista bici; A27 animales salvajes («gros gibier»): si uno salta delante, frena fuerte sin dar volantazos; A29 ganado. ' +
      'Raíles: A41 paso a nivel con barreras; A43 sin barreras (locomotora); A49 raíles (tranvía) que cruzan la calzada. ' +
      'A51: peligro no definido; una placa adicional precisa cuál.',
    keyTerms: [
      { fr: 'virage dangereux', es: 'curva peligrosa' },
      { fr: 'rétrécissement de la chaussée', es: 'estrechamiento de la calzada' },
      { fr: 'dispositif surélevé', es: 'resalto / plataforma elevada' },
      { fr: 'croix de Saint-André', es: 'cruz de San Andrés' },
      { fr: 'gros gibier', es: 'animales salvajes grandes' },
      { fr: 'projection de gravillons', es: 'proyección de gravilla' },
    ],
  },
  {
    id: 'pan-interdiction',
    theme: 'panneaux',
    title: { fr: 'Les signaux d\'interdiction (C) et leur fin', es: 'Las señales de prohibición (C) y su fin' },
    body:
      'Acceso. ' +
      'C1 «sens interdit»: no puedes entrar por este lado; la calle es de sentido único y se circula en el otro sentido. C3: acceso prohibido a todo conductor en los dos sentidos. ' +
      'Prohibiciones por categoría: C6 quads; C7 motocicletas; C9 ciclomotores; C11 ciclistas; C13 vehículos de tracción animal; C15 jinetes; C17 carretillas de mano; C19 peatones; C22 autocares; C23 vehículos de transporte de mercancías (todos, incluso furgonetas, salvo que una placa fije una masa); C24a mercancías peligrosas. La señal solo afecta a la categoría dibujada. ' +
      'Dimensiones: C21 masa en carga superior a la indicada (lo que pesa el vehículo cargado, no vacío); C25 longitud, C27 anchura y C29 altura, carga incluida. ' +
      'Maniobras y hasta dónde valen. ' +
      'C31a/C31b: prohibido girar a la izquierda / a la derecha en el próximo cruce. ' +
      'C33 (cambio de sentido), C35 (adelantar por la izquierda a un vehículo de más de dos ruedas o de tracción animal; a una moto sí se la puede adelantar) y C39 (lo mismo, solo para los camiones de más de 3,5 t): valen desde la señal hasta el próximo cruce inclusive. C37 pone fin a C35 y C41 a C39 antes de ese cruce. ' +
      'C43 velocidad máxima: desde la señal hasta el próximo cruce inclusive, o hasta otra C43, o hasta la señal de inicio o fin de población, zona residencial, zona de encuentro o zona peatonal. C45: fin de la limitación; vuelve el límite general del lugar. ' +
      'C46: fin de todas las prohibiciones locales impuestas a los vehículos en marcha. ' +
      'C47: puesto de peaje; prohibido pasar sin detenerse. ' +
      'Anuncio y excepciones. ' +
      'Una prohibición puede anunciarse con la misma señal y una placa de distancia («200 m»): la prohibición empieza a esa distancia. ' +
      'La placa M2 («excepté» + bicicleta) bajo C1, C3 o C31: la prohibición no se aplica a los ciclistas. Para los coches sigue valiendo.',
    keyTerms: [
      { fr: 'sens interdit', es: 'dirección prohibida' },
      { fr: 'accès interdit', es: 'acceso prohibido' },
      { fr: 'masse en charge', es: 'masa en carga (vehículo cargado)' },
      { fr: 'jusqu\'au prochain carrefour inclus', es: 'hasta el próximo cruce inclusive' },
      { fr: 'fin de toutes les interdictions locales', es: 'fin de todas las prohibiciones locales' },
      { fr: 'poste de péage', es: 'puesto de peaje' },
    ],
  },
  {
    id: 'pan-obligation',
    theme: 'panneaux',
    title: { fr: 'Les signaux d\'obligation (D)', es: 'Las señales de obligación (D)' },
    body:
      'Círculo azul con símbolo blanco: obliga a hacer algo o reserva una parte de la vía a ciertos usuarios. ' +
      'D1: obligatorio seguir la dirección de la flecha (recto, girar…). Si la flecha es oblicua hacia abajo y la señal está sobre un obstáculo (isleta), obliga a pasar por el lado que indica. D3: obligatorio seguir una de las direcciones de las flechas. ' +
      'Ojo: la flecha blanca en un círculo azul (D1) es una obligación de dirección; la flecha blanca en un rectángulo azul (F19) solo informa de que la vía es de sentido único. ' +
      'D5: sentido giratorio obligatorio (rotonda), siguiendo las flechas. ' +
      'D7: carril bici obligatorio para los ciclistas (los coches no pueden circular ni pararse en él). ' +
      'D9: parte de la vía reservada a peatones, bicicletas y ciclomotores de dos ruedas clase A. D10: parte reservada a peatones y ciclistas. ' +
      'D11: camino obligatorio para peatones. D13: camino obligatorio para jinetes (no confundir con C15, círculo rojo: acceso prohibido a los jinetes). ' +
      'Una placa M2 bajo D1 exime a los ciclistas de la obligación.',
    keyTerms: [
      { fr: 'direction obligatoire', es: 'dirección obligatoria' },
      { fr: 'sens giratoire obligatoire', es: 'sentido giratorio obligatorio' },
      { fr: 'piste cyclable obligatoire', es: 'carril bici obligatorio' },
      { fr: 'chemin obligatoire', es: 'camino obligatorio' },
      { fr: 'cavalier', es: 'jinete' },
    ],
  },
  {
    id: 'pan-arret',
    theme: 'panneaux',
    title: { fr: 'Signaux d\'arrêt et de stationnement (E)', es: 'Señales de parada y estacionamiento (E)' },
    body:
      'Prohibiciones. ' +
      'E1 (una barra): estacionamiento prohibido; la parada breve (subir o bajar personas, cargar o descargar) está permitida. E3 (cruz): parada y estacionamiento prohibidos. ' +
      'Valen del lado de la vía donde están colocadas y desde la señal hasta el próximo cruce (una placa con flecha puede marcar el inicio, el fin o la distancia). E1 y E3 valen en la calzada y en el arcén. ' +
      'Una placa de horario («de 7 à 19 h», «du lundi au vendredi») limita la prohibición a esas horas: fuera de ellas no se aplica. ' +
      'Estacionamiento alterno. ' +
      'E5: prohibido estacionar del 1 al 15 del mes. E7: prohibido del 16 al final del mes. El cambio de lado se hace el último día de cada periodo entre las 19 h 30 y las 20 h. ' +
      'E11, colocado sobre el cartel de inicio de población: estacionamiento alterno quincenal en todas las calles. Del 1 al 15 se estaciona del lado de los números impares; del 16 al final del mes, del lado de los pares. ' +
      'Estacionamiento autorizado o reservado (P blanca sobre azul): ' +
      'E9a: estacionamiento autorizado (las placas pueden exigir el disco, el pago, una tarjeta, o reservarlo a personas con discapacidad). ' +
      'E9b: reservado a motos, coches, coches mixtos y minibuses. E9c: camionetas y camiones. E9d: autocares. E9h: autocaravanas («véhicules automobiles de camping»). E9i: motos. ' +
      'Cómo estacionar: E9e enteramente sobre la acera o el arcén; E9f en parte sobre la acera o el arcén; E9g en la calzada. ' +
      'E9j (desde 2022): la misma plaza se reserva a distintos vehículos según la hora, p. ej. bicicletas de 7 h 30 a 18 h y coches de 18 h a 7 h 30.',
    keyTerms: [
      { fr: 'stationnement interdit', es: 'estacionamiento prohibido' },
      { fr: 'arrêt et stationnement interdits', es: 'parada y estacionamiento prohibidos' },
      { fr: 'stationnement alterné semi-mensuel', es: 'estacionamiento alterno quincenal' },
      { fr: 'numéros impairs / pairs', es: 'números impares / pares' },
      { fr: 'accotement', es: 'arcén' },
      { fr: 'stationnement réservé', es: 'estacionamiento reservado' },
    ],
  },
  {
    id: 'pan-indication',
    theme: 'panneaux',
    title: { fr: 'Les signaux d\'indication (F)', es: 'Las señales de indicación (F)' },
    body:
      'Rectángulos o cuadrados, casi siempre azules: informan, pero muchos también activan reglas especiales desde el lugar donde están. ' +
      'Inicio y fin de reglas. ' +
      'F5 / F7: inicio / fin de autopista. F9 / F11: inicio / fin de vía para automóviles. ' +
      'F8: túnel de más de 500 m (una placa indica la longitud). ' +
      'F12a / F12b: zona residencial o de encuentro (20 km/h). F103 / F105: zona peatonal. F111 / F113: zona o calle ciclista (30 km/h, prohibido adelantar a los ciclistas; tras F113 se puede volver a adelantarlos con las reglas normales). ' +
      'F99a / F101a: inicio / fin de un camino reservado a los usuarios dibujados (peatones, ciclistas, jinetes). ' +
      'Carriles y calles. ' +
      'F13: flechas de selección; elige a tiempo el carril de tu dirección. F17: carril bus. F18: plataforma reservada a bus y tranvía que se puede cruzar pero no recorrer. ' +
      'F19: vía de sentido único. F21: se puede pasar el obstáculo por la derecha o por la izquierda. F45: vía sin salida; F45b: sin salida salvo para peatones y ciclistas. ' +
      'F91: las señales dibujadas sobre un carril solo valen para ese carril (F89 lo anuncia con una distancia). ' +
      'F85: circulación admitida en los dos sentidos en un tramo de calzada de sentido único. F87: resalto justo aquí (30 km/h máximo). F95: lecho de frenado («piste de détresse») para vehículos sin frenos. ' +
      'Orientación y servicios. ' +
      'F23a número de carretera; F25 preaviso de direcciones antes de un cruce; F29 dirección; F31 dirección por autopista (lleva el símbolo de autopista); F35 marrón: lugar turístico; F39 / F41 (naranja): preaviso e itinerario de desvío; F47: fin de obras. ' +
      'F49 paso de peatones y F50 paso de ciclistas y ciclomotores de dos ruedas (en el mismo paso). F50bis: avisa a quien gira de que ciclistas siguen la misma vía. F51: paso subterráneo o elevado para peatones. ' +
      'F52 salida de emergencia en un túnel; F53 establecimiento sanitario (H, hospital); F55 puesto de socorro; F56 extintor; F59 aparcamiento; F62 teléfono de llamada de emergencia (SOS); F63 gasolinera.',
    keyTerms: [
      { fr: 'voie sans issue', es: 'vía sin salida' },
      { fr: 'site spécial franchissable', es: 'plataforma reservada que se puede cruzar' },
      { fr: 'itinéraire de déviation', es: 'itinerario de desvío' },
      { fr: 'piste de détresse', es: 'lecho de frenado' },
      { fr: 'issue de secours', es: 'salida de emergencia' },
      { fr: 'établissement sanitaire', es: 'establecimiento sanitario (hospital)' },
    ],
  },
  {
    id: 'pan-additionnels',
    theme: 'panneaux',
    title: { fr: 'Panneaux additionnels', es: 'Placas adicionales' },
    body:
      'El «panneau additionnel» es una placa rectangular colocada debajo de la señal: completa, precisa o limita su significado. En general lleva texto o símbolo blanco sobre fondo azul; las que se refieren a bicicletas y ciclomotores (modelos «M») son negras sobre fondo blanco. ' +
      'Distancia («200 m»): la señal anuncia algo que empieza a esa distancia (un peligro, una prohibición, una obligación). ' +
      'Longitud (flechas verticales y «2 km»): la señal vale a lo largo de todo ese tramo. ' +
      'Horario («7–19 h»): la señal solo se aplica en esas horas o días; fuera de ellos, no. ' +
      'Categoría («3,5 t», camión, «excepté riverains»): limita la señal a ciertos vehículos o crea excepciones. ' +
      'M2 («excepté» + bicicleta) bajo C1, C3, C31 o D1: los ciclistas no están afectados. M3: tampoco los ciclomotores clase A. ' +
      'M4 bajo F19: los ciclistas pueden circular en los dos sentidos de la calle de sentido único (ciclistas a contramano). ' +
      'Las placas no cambian nada para quien no aparece en ellas: un coche ante C1 + M2 sigue sin poder entrar.',
    keyTerms: [
      { fr: 'panneau additionnel', es: 'placa adicional' },
      { fr: 'excepté', es: 'excepto' },
      { fr: 'distance', es: 'distancia (inicio)' },
      { fr: 'longueur', es: 'longitud (tramo)' },
      { fr: 'période de validité', es: 'periodo de validez (horario)' },
    ],
  },

  /* ---------------- MECANIQUE ---------------- */
  {
    id: 'mec-freins',
    theme: 'mecanique',
    title: { fr: 'Les freins', es: 'Los frenos' },
    body:
      'El «frein de service» (pedal) actúa sobre las cuatro ruedas mediante un circuito hidráulico lleno de «liquide de frein». Ese líquido es higroscópico: absorbe la humedad del aire y con los años hierve a menor temperatura, por eso se cambia periódicamente (en general cada 2 años, según el fabricante). Si el pedal se vuelve blando o se hunde casi hasta el suelo, hay aire, una fuga o falta líquido: detenerse con prudencia y no seguir circulando; hacer remolcar el coche. Un testigo rojo de freno que sigue encendido con el «frein à main» (freno de mano o «frein de stationnement») quitado indica nivel de líquido demasiado bajo o fallo del circuito: parar. Un chirrido metálico agudo al frenar suele indicar «plaquettes» (pastillas) gastadas. Si el coche tira hacia un lado al frenar, un freno actúa peor que el otro (pastilla gastada, pinza agarrotada): hacer revisar enseguida. Calentamiento, el «fading»: Frenando de forma continua en una bajada larga, discos y pastillas se sobrecalientan y pierden eficacia: es el «fading». Señales: olor a quemado y pedal que frena cada vez menos. Qué hacer: detenerse en un lugar seguro y dejar enfriar (sin echar agua fría sobre los discos). Para evitarlo, usar el «frein moteur» (freno motor): engranar una marcha corta (más o menos la que se usaría para subir esa pendiente) y frenar solo a ratos. Nunca bajar en «point mort» (punto muerto): se pierde el freno motor y los frenos trabajan solos. Fallo de frenos y ABS: Si los frenos fallan del todo: bombear el pedal, reducir de marcha para aprovechar el freno motor y tirar del freno de mano de forma progresiva (de golpe bloquearía las ruedas traseras). El «ABS» impide que las ruedas se bloqueen en una frenada fuerte: su ventaja principal es que se puede seguir dirigiendo el coche mientras se frena; no acorta siempre la distancia de frenado (en grava o nieve puede alargarla). Con ABS se pisa a fondo y se mantiene; la vibración del pedal es normal.',
    keyTerms: [
      { fr: 'liquide de frein', es: 'líquido de frenos' },
      { fr: 'plaquettes de frein', es: 'pastillas de freno' },
      { fr: 'frein moteur', es: 'freno motor' },
      { fr: 'fading', es: 'pérdida de eficacia por calentamiento' },
      { fr: 'frein à main / frein de stationnement', es: 'freno de mano' },
      { fr: 'point mort', es: 'punto muerto' },
    ],
  },
  {
    id: 'mec-pneus',
    theme: 'mecanique',
    title: { fr: 'Les pneus et les roues', es: 'Neumáticos y ruedas' },
    body:
      'La «pression» recomendada está en una etiqueta del coche (marco de la puerta del conductor o trampilla del depósito) y en el manual; la cifra grabada en el «flanc» (flanco) del neumático es la presión máxima que soporta, no la que hay que poner. Se mide en frío: tras un trayecto largo el aire está caliente y la presión sale más alta, así que no hay que desinflar; se vuelve a medir en frío. Presión demasiado baja: desgaste en los dos bordes, más consumo, peor agarre y riesgo de reventón; demasiado alta: desgaste en el centro. La «profondeur des sculptures» mínima legal es 1,6 mm. Aquaplaning: El «aquaplanage» ocurre cuando el neumático ya no evacua el agua y flota sobre ella. El riesgo crece con la velocidad, con el dibujo gastado y con la presión baja. Qué hacer: soltar el acelerador suavemente, sin frenar ni girar bruscamente, hasta recuperar el agarre. Con lluvia no se usa el regulador de velocidad. Daños, pinchazos y rueda de repuesto: Un «hernie» (bulto) en el flanco significa que la carcasa está dañada: cambiar el neumático cuanto antes. Si un neumático revienta en marcha («éclatement»): sujetar firme el volante, no frenar de golpe, dejar que el coche pierda velocidad y apartarse con los warnings. Para cambiar una rueda: coche en llano, freno de mano, aflojar las tuercas un poco antes de levantar el coche con el «cric» (gato) y apretarlas del todo con la rueda en el suelo. La «roue de secours galette» (rueda de repuesto estrecha) es solo provisional: respetar la velocidad máxima indicada en ella y sustituirla pronto. La rueda de repuesto no es obligatoria en Bélgica (a menudo hay un kit antipinchazos). Edad y neumáticos de invierno: La goma envejece aunque no se use: el código DOT de cuatro cifras indica la semana y el año de fabricación (2319 = semana 23 de 2019). Los «pneus hiver» rinden mejor por debajo de unos 7 °C; el símbolo de la montaña de tres picos con copo («3PMSF») garantiza que se han homologado en nieve (el «M+S» solo es una declaración del fabricante). Los neumáticos «4 saisons» son un compromiso. En Bélgica los neumáticos de invierno no son obligatorios.',
    keyTerms: [
      { fr: 'pression des pneus', es: 'presión de los neumáticos' },
      { fr: 'aquaplanage', es: 'aquaplaning' },
      { fr: 'roue de secours', es: 'rueda de repuesto' },
      { fr: 'cric', es: 'gato' },
      { fr: 'flanc', es: 'flanco del neumático' },
      { fr: 'pneus hiver', es: 'neumáticos de invierno' },
    ],
  },
  {
    id: 'mec-moteur',
    theme: 'mecanique',
    title: { fr: 'Moteur, batterie et transmission', es: 'Motor, batería y transmisión' },
    body:
      'El «moteur» necesita aceite (lubricación) y «liquide de refroidissement» (refrigeración). El líquido de refrigeración lleva «antigel» (anticongelante): se rellena con el líquido que prescribe el fabricante, no con agua sola, que se congela en invierno. Humo azulado por el «pot d\'échappement» (escape) = el motor quema aceite; humo blanco espeso persistente = puede pasar líquido de refrigeración al motor; humo negro = mala combustión (exceso de carburante). Todo ello se hace revisar. Batería y arranque con pinzas: Con el motor en marcha, el «alternateur» (alternador), movido por una correa, recarga la «batterie». Si el testigo rojo de batería se enciende en marcha, la batería ya no se carga (alternador o correa rota; si esa correa mueve también la bomba de agua, el motor se calienta): detenerse en cuanto sea seguro y hacer revisar; el coche solo seguiría funcionando hasta agotar la batería. Arranque con «câbles de démarrage» (pinzas): 1) rojo al + de la batería descargada, 2) rojo al + de la batería buena, 3) negro al − de la batería buena, 4) negro a una masa metálica del motor del coche averiado, lejos de la batería (la última conexión puede hacer chispa y la batería desprende gas). Se desconecta en orden inverso. Diésel, carburante, filtros: En un diésel, el testigo de «préchauffage» (bujías de precalentamiento, una espiral naranja) se espera a que se apague antes de arrancar. El «filtre à particules» (FAP) del diésel retiene el hollín y se limpia solo («régénération») en trayectos largos a velocidad constante; con solo trayectos cortos se colmata. El «pot catalytique» (catalizador) reduce los gases tóxicos. Si te equivocas de carburante (gasolina en un diésel o al revés): no arrancar el motor y hacer vaciar el depósito; arrancar daña la bomba y los inyectores. Los «filtres» (aire, aceite, carburante, habitáculo) se cambian en las revisiones. Embrague, caja de cambios, correa de distribución: Si al acelerar el motor sube de vueltas pero el coche apenas acelera, el «embrayage» (embrague) patina: está gastado. No conducir con el pie apoyado en el pedal de embrague, lo desgasta. Con «boîte automatique», arrancar con el pie en el freno y, para aparcar, poner la palanca en P y el freno de mano (N es punto muerto: el coche puede rodar). La «courroie de distribution» (correa de distribución) se cambia según el kilometraje o la edad que fija el fabricante, aunque no haga ruido: si se rompe, el motor puede quedar destrozado.',
    keyTerms: [
      { fr: 'batterie / alternateur', es: 'batería / alternador' },
      { fr: 'câbles de démarrage', es: 'pinzas de arranque' },
      { fr: 'embrayage', es: 'embrague' },
      { fr: 'courroie de distribution', es: 'correa de distribución' },
      { fr: 'filtre à particules', es: 'filtro de partículas' },
      { fr: 'préchauffage', es: 'precalentamiento (diésel)' },
    ],
  },
  {
    id: 'mec-direction',
    theme: 'mecanique',
    title: { fr: 'Direction et suspension', es: 'Dirección y suspensión' },
    body:
      'La «direction assistée» (dirección asistida) y el «servofrein» (servofreno) funcionan gracias al motor. Si el motor se cala en marcha, el volante y el freno se vuelven mucho más duros, pero siguen funcionando: hay que girar y frenar con más fuerza. Nunca quitar la llave en marcha: el «antivol de direction» podría bloquear el volante. Síntomas frecuentes: un volante que vibra a partir de cierta velocidad (p. ej. hacia 90 km/h) indica ruedas mal «équilibrées» (equilibrado); un coche que tira hacia un lado en línea recta, sin frenar, indica presión desigual de los neumáticos o mal «parallélisme» (alineación, geometría); un neumático gastado solo por un borde también apunta a la alineación. Tras un golpe fuerte contra un bordillo, hacer revisar llanta, neumático y alineación. Los «amortisseurs» (amortiguadores) mantienen las ruedas pegadas al suelo. Gastados: el coche rebota y se balancea, la distancia de frenado se alarga, el agarre en curva y en mojado empeora y el riesgo de aquaplaning sube. Se revisan en la ITV y en el taller.',
    keyTerms: [
      { fr: 'direction assistée', es: 'dirección asistida' },
      { fr: 'amortisseurs', es: 'amortiguadores' },
      { fr: 'parallélisme', es: 'alineación (paralelismo)' },
      { fr: 'équilibrage des roues', es: 'equilibrado de ruedas' },
      { fr: 'servofrein', es: 'servofreno' },
    ],
  },
  {
    id: 'mec-aides',
    theme: 'mecanique',
    title: { fr: 'Aides à la conduite, véhicules électriques', es: 'Ayudas a la conducción, vehículos eléctricos' },
    body:
      'El «ESP» (control de estabilidad) frena por separado algunas ruedas y reduce la potencia para corregir un derrape o un subviraje; no cambia las leyes de la física: a demasiada velocidad en una curva no puede evitar la salida. El «ABS» evita el bloqueo de ruedas al frenar (ver frenos). El «régulateur de vitesse» (regulador, «cruise control») mantiene solo una velocidad elegida; el «limiteur de vitesse» (limitador) deja que el conductor acelere, pero impide superar la velocidad fijada. El regulador no se usa con lluvia, hielo o nieve (en aquaplaning seguiría empujando) ni con tráfico denso. Las «aides au stationnement» (sensores, cámara) no sustituyen mirar uno mismo. El «airbag» es un complemento del cinturón, no lo sustituye. Coches eléctricos e híbridos: Un «véhicule électrique» es casi silencioso a baja velocidad: los peatones y ciclistas pueden no oírlo, así que hay que estar más atento en ciudad. Al levantar el pie del acelerador, el motor eléctrico frena el coche y recarga la batería: es el «freinage régénératif» (frenada regenerativa). Cuando el cuadro muestra «READY», el coche está encendido y puede moverse aunque no haga ningún ruido: antes de bajar, poner P, freno de mano y apagarlo. Tras un accidente, los cables naranjas son de alta tensión: no tocarlos.',
    keyTerms: [
      { fr: 'ESP (contrôle de stabilité)', es: 'control de estabilidad' },
      { fr: 'régulateur de vitesse', es: 'regulador de velocidad' },
      { fr: 'limiteur de vitesse', es: 'limitador de velocidad' },
      { fr: 'freinage régénératif', es: 'frenada regenerativa' },
      { fr: 'véhicule électrique / hybride', es: 'vehículo eléctrico / híbrido' },
    ],
  },

  /* ---------------- ACCIDENTS ---------------- */
  /* ---------------- PANNE, ACCIDENT, PREMIERS SECOURS ---------------- */
  {
    id: 'acc-panne',
    theme: 'accidents',
    title: { fr: 'Véhicule en panne : se ranger et signaler', es: 'Vehículo averiado: apartarlo y señalizarlo' },
    body:
      'Con un «véhicule en panne» (averiado) el conductor debe garantizar la seguridad y la fluidez del tráfico: primero lo «range» (aparca) como un vehículo en estacionamiento normal. Si puede dejarlo en un sitio donde aparcar está permitido, no hace falta nada más. Si el coche no se puede mover o solo puede quedarse donde la parada y el estacionamiento están prohibidos (calzada, arcén de autopista…), es obligatorio señalizarlo con el «triangle de danger»: los «feux de détresse» (warning) o una luz portátil amarilla-naranja intermitente son un complemento, no lo sustituyen. El triángulo se coloca «en deçà du véhicule» (antes del vehículo, del lado del tráfico que llega), casi vertical, a 30 m como mínimo en las vías ordinarias y a 100 m como mínimo en autopista, de modo que se vea desde unos 50 m. En población, donde no se pueden respetar los 30 m, puede ponerse más cerca e incluso sobre el vehículo. Si las luces del vehículo no funcionan y no se le distingue a unos 100 m, también hay que señalizarlo con el triángulo. Lo mismo vale para una carga caída en la vía que no se puede retirar enseguida: se señaliza el obstáculo como un vehículo averiado. En autopista y en «route pour automobiles», si el vehículo queda donde la parada está prohibida, el conductor debe llevar puesto el «gilet» / «veste de sécurité rétroréfléchissante» (chaleco reflectante) en cuanto sale del vehículo, así que conviene tenerlo a mano en el habitáculo. Si el conductor no está o no puede mover el vehículo, la policía puede retirarlo de oficio; en autopista lo hace siempre, a riesgo y cargo del conductor. Equipamiento obligatorio a bordo de todo coche matriculado en Bélgica: un triángulo, un «extincteur» (extintor) y un «coffret / trousse de secours» (botiquín), homologados y en buen estado (un extintor ya usado hay que recargarlo o cambiarlo). Si el motor arde: parar, cortar el contacto, hacer salir a todo el mundo y llamar al 112; no abrir del todo el capó (el aire aviva el fuego).',
    keyTerms: [
      { fr: 'véhicule en panne', es: 'vehículo averiado' },
      { fr: 'triangle de danger', es: 'triángulo de emergencia' },
      { fr: 'en deçà du véhicule', es: 'antes del vehículo (del lado del tráfico que llega)' },
      { fr: 'veste de sécurité rétroréfléchissante', es: 'chaleco reflectante' },
      { fr: 'extincteur / trousse de secours', es: 'extintor / botiquín' },
    ],
  },
  {
    id: 'acc-remorquage',
    theme: 'accidents',
    title: { fr: 'Remorquer un véhicule en panne', es: 'Remolcar un vehículo averiado' },
    body:
      'Está prohibido «remorquer» (remolcar) un vehículo de motor salvo si ya no puede moverse por sus propios medios o no ofrece toda garantía de seguridad. Con una «attache de fortune» (unión improvisada: «corde», cuerda, «câble», cable, o barra que no es el enganche normal) solo se puede remolcar en caso de fuerza mayor, únicamente hasta el «lieu de réparation» (taller) y a 25 km/h como máximo. Remolcar así está prohibido en autopista (y no se puede entrar en ella). Si la distancia entre los dos vehículos supera los 3 m, la unión debe señalizarse: de día, cuando no hacen falta luces, con un trozo de «étoffe rouge» (tela roja); cuando las luces son obligatorias, con una luz naranja visible lateralmente, salvo que la unión esté iluminada. Una «dépanneuse» (grúa) debe llevar encendidas sus luces amarillo-naranja intermitentes en el lugar del rescate y durante el remolque, y solo entonces.',
    keyTerms: [
      { fr: 'remorquer', es: 'remolcar' },
      { fr: 'attache de fortune', es: 'unión improvisada (cuerda, cable)' },
      { fr: 'lieu de réparation', es: 'lugar de reparación (taller)' },
      { fr: 'étoffe rouge', es: 'tela roja' },
      { fr: 'dépanneuse', es: 'grúa' },
    ],
  },
  {
    id: 'acc-accident',
    theme: 'accidents',
    title: { fr: 'Après un accident : obligations', es: 'Tras un accidente: obligaciones' },
    body:
      'Toda persona implicada en un accidente debe tomar las medidas necesarias para la seguridad y la fluidez del tráfico (señalizar como un vehículo averiado, warning, triángulo, chaleco). Accidente con «dégâts matériels» (solo daños materiales): se apartan los vehículos para despejar la vía (anotando antes las posiciones o haciendo fotos); toda persona de más de 15 años debe enseñar su «carte d\'identité» a los demás implicados que se la pidan y quedarse en el lugar para hacer juntos las comprobaciones, normalmente con el «constat européen d\'accident» («constat amiable», parte amistoso). Firmarlo no es reconocer la culpa, pero lo firmado ya no se puede modificar después: cada uno se lleva su ejemplar. Si no hay acuerdo, se llama a la policía (101) para que haga las comprobaciones. Si el perjudicado no está (p. ej. un coche aparcado), hay que dejar en el lugar el nombre y la dirección y, en todo caso, comunicarlos cuanto antes, directamente o a través de la policía. Accidente con «dommages corporels» (heridos): socorrer a los heridos si hace falta, enseñar la carta de identidad, quedarse para que la policía haga las comprobaciones (un parte amistoso no basta); mover los vehículos no es obligatorio. Alejarse un momento para socorrer o avisar no es huir, si antes se dan nombre y dirección a alguna persona presente. Si no se ha podido contactar con la policía en un plazo razonable, hay que declarar el accidente en una comisaría en las 24 horas. Marcharse para escapar de las comprobaciones es «délit de fuite» (delito de fuga), también si solo hay daños materiales. Al llamar al 112, lo primero es el lugar exacto, luego el número de víctimas y su estado.',
    keyTerms: [
      { fr: 'constat européen d\'accident', es: 'parte europeo de accidente (parte amistoso)' },
      { fr: 'dégâts matériels', es: 'daños materiales' },
      { fr: 'dommages corporels', es: 'daños corporales (heridos)' },
      { fr: 'délit de fuite', es: 'delito de fuga' },
      { fr: 'agent qualifié', es: 'agente de policía' },
    ],
  },
  {
    id: 'acc-secours',
    theme: 'accidents',
    title: { fr: 'Premiers secours : Protéger, Alerter, Secourir', es: 'Primeros auxilios: Proteger, Alertar, Socorrer' },
    body:
      'Orden: «Protéger» (aparcar el propio coche en un lugar seguro, más allá del accidente, warning, chaleco, triángulo, cortar el contacto de los vehículos implicados), «Alerter» (112: lugar exacto, número de heridos, su estado) y «Secourir». No mover a un herido salvo «danger immédiat» (incendio, riesgo de ser atropellado): se podría agravar una lesión de la columna. A un motorista no se le quita el casco salvo si no respira y hay que reanimarlo. Herido inconsciente que respira: «position latérale de sécurité» (PLS, posición lateral de seguridad), para que no se ahogue. Si no respira: 112 y «réanimation» (masaje cardíaco, compresiones en el centro del pecho) y, si hay uno, el «défibrillateur externe automatique» (DEA, desfibrilador): en Bélgica cualquier persona puede usarlo, incluso sin formación, porque el aparato da las instrucciones. «Hémorragie» (hemorragia): comprimir directamente la herida. «Brûlure» (quemadura): enfriar con agua templada unos 20 minutos, sin hielo, sin arrancar la ropa pegada ni reventar las ampollas. No dar de beber ni de comer a un herido (puede necesitar cirugía), taparlo para que no coja frío y hablarle para tranquilizarlo sin dejarlo solo.',
    keyTerms: [
      { fr: 'Protéger, Alerter, Secourir', es: 'Proteger, Alertar, Socorrer' },
      { fr: 'position latérale de sécurité (PLS)', es: 'posición lateral de seguridad' },
      { fr: 'défibrillateur externe automatique (DEA)', es: 'desfibrilador externo automático' },
      { fr: 'hémorragie', es: 'hemorragia' },
      { fr: 'brûlure', es: 'quemadura' },
    ],
  },

  /* ---------------- COMPORTEMENT ---------------- */
  {
    id: 'com-perception',
    theme: 'comportement',
    title: { fr: 'Perception des risques et anticipation', es: 'Percepción del riesgo y anticipación' },
    body:
      'La «perception des risques» (lo que mide el «test de perception des risques» de Bruselas) consiste en ver el peligro antes de que ocurra y actuar a tiempo: levantar el pie, cubrir el freno y estar listo para parar. Hay que «scanner» la vía: mirar lejos delante, a los lados y, con regularidad, los «rétroviseurs», no solo el coche de delante. Indicios típicos: una «balle» o un «ballon» que cruza la calzada anuncia un niño corriendo detrás (frena y prepárate a parar); niños en la acera o entre «voitures en stationnement», sobre todo cerca de escuelas (señal A23), pueden lanzarse sin mirar; alguien sentado en un coche aparcado puede abrir la «portière», así que deja una distancia lateral suficiente (más o menos el ancho de una puerta, ~1 m) y modera; un coche aparcado con los «feux de recul» (luces de marcha atrás) encendidos va a salir hacia atrás; una furgoneta en doble fila o un vehículo parado tapan la vista y pueden salir peatones por delante; un ciclista que mira por encima del hombro izquierdo va probablemente a desviarse o girar a la izquierda (no lo adelantes en ese momento); un peatón distraído (teléfono, auriculares) junto al bordillo puede cruzar sin mirar. En población, cuando un «autobus» de línea señala que sale de su parada, hay que reducir y, si hace falta, detenerse para dejarle arrancar (art. 39). Camiones y autobuses tienen grandes «angles morts» (ángulos muertos), sobre todo a su derecha y justo delante: si un camión va a girar a la derecha, quédate detrás y nunca a su derecha; si no ves la cara del conductor en su retrovisor, él no te ve. En una curva sin visibilidad o al llegar a una cima («sommet de côte»), la velocidad debe permitir parar en la distancia que ves (art. 10.1: poder detenerse ante un obstáculo previsible) y hay que mantenerse bien a la derecha.',
    keyTerms: [
      { fr: 'perception des risques', es: 'percepción del riesgo' },
      { fr: 'angle mort', es: 'ángulo muerto' },
      { fr: 'portière', es: 'puerta del coche' },
      { fr: 'feux de recul', es: 'luces de marcha atrás' },
      { fr: 'sommet de côte', es: 'cambio de rasante / cima' },
    ],
  },
  {
    id: 'com-distraction',
    theme: 'comportement',
    title: { fr: 'Distraction, émotions et agressivité', es: 'Distracciones, emociones y agresividad' },
    body:
      'Apartar la vista de la vía, aunque sea un instante, es conducir a ciegas: a 50 km/h se recorren unos 14 m por segundo, así que mirar el teléfono 2 segundos son ~28 m sin ver nada. El teléfono en la mano está prohibido (ver tema vehículo); el «kit mains libres» está permitido, pero una conversación también distrae: lo prudente es no contestar, o abreviar, y llamar después parado en un lugar seguro. El «GPS» se programa antes de salir; para cambiar el destino, detente en un sitio seguro. Comer, beber o buscar algo en el coche: mejor hacer una pausa en un «aire de repos». Si los niños se pelean detrás o algo exige tu atención, para en un lugar seguro antes de ocuparte de ello. La «colère» (ira), la tristeza o el «stress» reducen la atención y empujan a correr: tras una discusión o una mala noticia, espera a calmarte antes de conducir o deja conducir a otra persona; si vas con retraso, acepta llegar tarde (avisa antes de salir) en lugar de acelerar. Ante un gesto o un insulto de otro conductor, no respondas ni busques la confrontación: sigue tu camino. Si alguien te sigue demasiado cerca («coller»), no frenes para castigarlo: aumenta tu propia distancia con el de delante (así podrás frenar con suavidad) y déjalo pasar en cuanto se pueda. Los medicamentos y la fatiga se tratan en el tema alcohol.',
    keyTerms: [
      { fr: 'distraction', es: 'distracción' },
      { fr: 'kit mains libres', es: 'manos libres' },
      { fr: 'agressivité au volant', es: 'agresividad al volante' },
      { fr: 'aire de repos', es: 'área de descanso' },
      { fr: 'coller (un véhicule)', es: 'pegarse (a un vehículo)' },
    ],
  },
  {
    id: 'com-eco',
    theme: 'comportement',
    title: { fr: 'Éco-conduite et zone de basses émissions', es: 'Eco-conducción y zona de bajas emisiones' },
    body:
      'La «éco-conduite» ahorra combustible, contamina menos y suele ser más segura. Anticipar: al ver a lo lejos un semáforo rojo o un atasco, levanta el pie pronto con la marcha engranada; el «frein moteur» (freno motor) casi no consume, porque los motores de inyección cortan el combustible. Cambia pronto a marchas largas y mantén una velocidad estable. En una parada prolongada (esperar a alguien, paso a nivel cerrado), «couper le moteur»: al «ralenti» el motor consume sin avanzar. «Pression des pneus»: unos neumáticos poco inflados aumentan el consumo y el desgaste y empeoran el agarre; con el coche muy cargado se ajusta la presión a la carga según el fabricante (etiqueta en el marco de la puerta, la tapa del depósito o el manual). Un «coffre de toit» o una «galerie» (baca) aumentan la resistencia del aire incluso vacíos: se quitan cuando no se usan; el peso inútil en el maletero también aumenta el consumo. La «climatisation» aumenta el consumo: úsala con moderación. La «zone de basses émissions» (LEZ) de Bruselas cubre toda la Región de Bruselas-Capital (las 19 comunas, salvo el Ring y algunos accesos a parkings de disuasión) y se aplica todos los días, las 24 horas. Que un vehículo pueda entrar depende de su tipo, de su «norme Euro» y de su «carburant» (los diésel tienen criterios más estrictos que los de gasolina). Afecta a vehículos belgas y extranjeros (estos deben registrarse antes) y se controla con «caméras ANPR», que leen las matrículas. Los criterios se endurecen por etapas: consulta lez.brussels.',
    keyTerms: [
      { fr: 'éco-conduite', es: 'eco-conducción' },
      { fr: 'frein moteur', es: 'freno motor' },
      { fr: 'ralenti', es: 'ralentí' },
      { fr: 'coffre de toit', es: 'cofre de techo' },
      { fr: 'zone de basses émissions (LEZ)', es: 'zona de bajas emisiones' },
      { fr: 'norme Euro', es: 'norma Euro' },
    ],
  },
  {
    id: 'com-defensive',
    theme: 'comportement',
    title: { fr: 'Conduite défensive', es: 'Conducción defensiva' },
    body:
      'La «conduite défensive» consiste en prever los errores de los demás y dejarse siempre un margen para evitarlos. Tener la prioridad no exime de prudencia: si otro no parece ir a cederte el paso (llega rápido a su ceda el paso, no frena), levanta el pie y prepárate a frenar o a dejarle pasar; mejor renunciar a la prioridad que tener un accidente. Un intermitente no es una garantía: si un coche señala que gira pero no reduce, espera a que empiece de verdad a girar antes de salir. En una fila parada, deja delante espacio suficiente para ver las ruedas traseras del vehículo de delante tocando el suelo: así puedes rodearlo si se avería. No invites con la mano a un peatón a cruzar fuera de un paso cuando hay otro carril a tu lado: el vehículo de ese carril puede no verlo; déjale decidir. «Vent latéral» (señal A37): sujeta firme el volante y reduce, sobre todo con carga en el techo, remolque o caravana, en puentes, al salir de un túnel o de una zona protegida y al adelantar camiones. De noche, deslumbrado por las luces de frente: mira el borde derecho de la calzada, reduce la velocidad y nunca respondas con las largas. Con nieve la «distance de freinage» es mucho más larga: aumenta la distancia, frena y gira con suavidad y, en bajada, usa una marcha corta (freno motor) en lugar de frenar fuerte.',
    keyTerms: [
      { fr: 'conduite défensive', es: 'conducción defensiva' },
      { fr: 'marge de sécurité', es: 'margen de seguridad' },
      { fr: 'vent latéral', es: 'viento lateral' },
      { fr: 'éblouissement', es: 'deslumbramiento' },
      { fr: 'distance de freinage', es: 'distancia de frenado' },
    ],
  },
  /* ---------- escenas (questions-extra5) ---------- */
  {
    id: 'z5-placement',
    theme: 'manoeuvres',
    title: { fr: 'Se placer sur la chaussée : tourner, bandes de sélection, rétrécissement', es: 'Colocarse en la calzada: girar, carriles de preselección, estrechamiento' },
    body:
      'Para girar a la derecha hay que pegarse lo más posible al borde derecho (art. 19.2 2°). Para girar a la izquierda, en una calzada de doble sentido hay que acercarse al eje sin molestar a los que vienen de frente y, en una de sentido único, pegarse al borde izquierdo (art. 19.3 2°). En el cruce, el giro a la izquierda se hace lo más amplio posible, para entrar por la derecha en la calzada a la que vas, salvo si en esa calzada se circula por carriles o en filas según los arts. 9.4 y 9.5 (art. 19.3 5°): no se «coupe le virage» (cortar la curva) por el lado de los que vienen de frente. En población, en una calzada de sentido único dividida en carriles o en una de doble sentido con al menos dos carriles por sentido, cada uno usa el carril que mejor convenga a su destino (art. 9.4); entonces solo se gira a la derecha desde el carril o la fila de la derecha, y a la izquierda desde el de la izquierda (art. 19.6). En esas calzadas, que un carril avance más rápido que otro no se considera adelantamiento (art. 16.2). Las «flèches de sélection» pintadas antes de un cruce indican el carril que hay que tomar para cada dirección, y en el cruce hay que seguir una de las direcciones marcadas en tu carril (art. 77.1): si te has equivocado de carril y la línea es continua, sigues la flecha y buscas otro camino. Cambiar de carril es una «manœuvre»: cedes el paso a quien ya circula por el otro carril (art. 12.4). La «tirette» (cremallera, art. 12bis) solo se aplica cuando el tráfico está fuertemente ralentizado y un carril termina o está cortado: entonces los del carril que se acaba se incorporan justo antes del estrechamiento y los del carril libre ceden por turnos. Con tráfico fluido no hay cremallera: quien cambia de carril cede el paso.',
    keyTerms: [
      { fr: 'flèche de sélection', es: 'flecha de preselección' },
      { fr: 'se porter vers la gauche', es: 'colocarse a la izquierda' },
      { fr: 'aborder par la droite', es: 'entrar por la derecha' },
      { fr: 'bande de circulation', es: 'carril de circulación' },
      { fr: 'tirette', es: 'cremallera' },
    ],
  },
  {
    id: 'z5-rondpoint-bandes',
    theme: 'manoeuvres',
    title: { fr: 'Rond-point à plusieurs bandes', es: 'Rotonda de varios carriles' },
    body:
      'En el anillo de una «rond-point» no hay obligación de circular pegado al borde derecho, pero sí de respetar las marcas que delimitan los carriles: se usa el carril que mejor convenga a tu destino (art. 9.3.1). Para la primera salida, el carril exterior («bande extérieure») desde la entrada. Para salidas más lejanas se puede usar el carril interior («bande intérieure»), pero antes de salir hay que volver al exterior, y pasar de un carril a otro es un cambio de carril, es decir, una «manœuvre»: cedes el paso a quien circula por el carril exterior (art. 12.4). Si no hay hueco, das otra vuelta en lugar de pararte en el anillo a esperar; nunca se da marcha atrás. Al entrar no es obligatorio poner el intermitente; para salir sí, el derecho (art. 19.2). Recuerda que al entrar cedes el paso a los que ya circulan por el anillo (señal B1 o B5 en la entrada, art. 12.3.1), estén en el carril que estén.',
    keyTerms: [
      { fr: 'anneau', es: 'anillo' },
      { fr: 'bande extérieure', es: 'carril exterior' },
      { fr: 'bande intérieure', es: 'carril interior' },
      { fr: 'changer de bande', es: 'cambiar de carril' },
      { fr: 'clignotant droit', es: 'intermitente derecho' },
    ],
  },
  {
    id: 'z5-dep-situations',
    theme: 'depassement',
    title: { fr: 'Dépasser ou non : situations courantes', es: 'Adelantar o no: situaciones frecuentes' },
    body:
      'Solo se «dépasse» (adelanta) a un conductor en movimiento (art. 16.1): rodear un vehículo parado o una furgoneta que hace una entrega no es un adelantamiento, así que no le afectan las prohibiciones de adelantar (cruce con prioridad de la derecha, etc.). Como el obstáculo está en tu lado, cedes el paso a los que vienen de frente y, si hace falta, te detienes (art. 15.2); la línea continua tampoco se cruza para rodearlo (art. 72.2). En población, en una calle de sentido único con varios carriles o en una vía con dos carriles o más por sentido, ir más rápido por un carril que por otro no es adelantar (art. 16.2), pero cambiarse de carril para pasar es una maniobra. Antes de adelantar hay que comprobar que la vía está libre a suficiente distancia y que podrás volver a la derecha enseguida (art. 16.4); al adelantar a un ciclista, la distancia lateral mínima es de 1 m en población y 1,5 m fuera (art. 40ter): si un coche viene de frente y no puedes dejarla, te quedas detrás. Está prohibido adelantar por la izquierda a un vehículo que se acerca a un paso de peatones o de ciclistas, o que se ha detenido delante, donde no hay agente ni semáforos (art. 17.2 5°), aunque no veas a nadie cruzando.',
    keyTerms: [
      { fr: 'conducteur en mouvement', es: 'conductor en movimiento' },
      { fr: 'contourner un obstacle', es: 'rodear un obstáculo' },
      { fr: 'passage pour cyclistes', es: 'paso para ciclistas' },
      { fr: 'distance latérale', es: 'distancia lateral' },
      { fr: 'reprendre sa place à droite', es: 'volver a la derecha' },
    ],
  },
  {
    id: 'z5-arrets-passages',
    theme: 'usagers-faibles',
    title: { fr: 'Bus et trams à l\'arrêt, passages pour piétons et cyclistes', es: 'Autobuses y tranvías parados, pasos de peatones y de ciclistas' },
    body:
      'Al pasar junto a un autobús, autocar o tranvía parado para que suban o bajen viajeros hay que moderar la velocidad (art. 40.3.1). Si en la parada no hay «refuge» (isleta), quien circula por el lado por donde suben o bajan los viajeros debe detenerse para dejarles subir o llegar a la acera, y arrancar después despacio (art. 40.3.2); quien pasa por el otro lado del vehículo no está obligado a pararse, pero sí a ir a velocidad moderada. En población, cuando un autobús o trolebús pone el intermitente para salir de su parada, quien sigue la misma dirección debe dejarle salir, reduciendo y, si hace falta, parando; por excepción al art. 12.4, el autobús no tiene que ceder el paso a esos conductores (art. 39). Fuera de población no existe esa obligación. «Passage pour piétons» sin agente ni semáforos: te acercas a velocidad moderada y cedes el paso a los peatones que están cruzando, en cualquier parte del paso, o que van a hacerlo (art. 40.4.2). «Passage pour cyclistes» (dos líneas de cuadrados blancos): te acercas a velocidad moderada, no pones en peligro a los ciclistas que lo cruzan ni les molestas mientras terminan, y te detienes si hace falta (art. 40ter). En ningún paso de peatones o de ciclistas se entra si el atasco hace probable quedarse parado encima (arts. 40.5 y 40ter): se espera antes del paso.',
    keyTerms: [
      { fr: 'refuge', es: 'isleta (refugio)' },
      { fr: 'allure modérée', es: 'velocidad moderada' },
      { fr: 'quitter son point d\'arrêt', es: 'salir de su parada' },
      { fr: 'passage pour cyclistes', es: 'paso para ciclistas' },
      { fr: 'encombrement', es: 'atasco' },
    ],
  },
  {
    id: 'z5-sta-lieux',
    theme: 'stationnement',
    title: { fr: 'Où se ranger : accotement, carrefours, passages, garages', es: 'Dónde colocarse: arcén, cruces, pasos, garajes' },
    body:
      'El vehículo parado o estacionado se coloca a la derecha (en una calzada de sentido único, a cualquiera de los dos lados) y, si existe, fuera de la calzada, en el «accotement de plain-pied» (arcén al mismo nivel); fuera de población, en cualquier arcén (art. 23.1). Solo si no hay arcén practicable se queda en la calzada. Prohibidos la parada y el estacionamiento (art. 24): a menos de 5 m del borde de la calzada transversal de un cruce; en la calzada a menos de 5 m antes de un paso de peatones o de ciclistas; en los carriles bici y a menos de 5 m del lugar donde los ciclistas deben dejar el carril bici para circular por la calzada (o al revés). Prohibido solo el estacionamiento (art. 25.1): delante de los «accès carrossables» (entradas de garaje), salvo para el vehículo cuya matrícula figure en ese acceso; en una calzada de doble sentido, en el lado opuesto a un vehículo ya parado o estacionado si eso hace difícil el cruce de otros dos vehículos; en la calzada dividida en carriles por líneas blancas, salvo donde lo permitan las señales E9a o E9b (art. 25.1 9°). Recuerda la diferencia: el «arrêt» (parada) es inmovilizarse el tiempo necesario para que suban o bajen personas o cosas (art. 2.22); el estacionamiento es cualquier inmovilización más larga. Por eso parar un momento delante de una entrada de garaje para dejar a un pasajero está permitido.',
    keyTerms: [
      { fr: 'accotement de plain-pied', es: 'arcén al mismo nivel' },
      { fr: 'accès carrossable', es: 'entrada de vehículos (vado)' },
      { fr: 'chaussée transversale', es: 'calzada transversal' },
      { fr: 'arrêt', es: 'parada' },
      { fr: 'croisement malaisé', es: 'cruce difícil' },
    ],
  },
]

export const theoryById = Object.fromEntries(theory.map((t) => [t.id, t])) as Record<string, TheoryEntry>
