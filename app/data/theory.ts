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
      'Regla por defecto en Bélgica: en cualquier «carrefour» sin señales ni semáforos, debes «céder le passage» (ceder el paso) al conductor que viene por tu derecha. Se aplica también en cruces con caminos pequeños y en aparcamientos abiertos al público. El conductor que viene por la derecha CONSERVA su prioridad aunque se haya detenido o haya reducido mucho la velocidad. En cambio, la PIERDE si circula en «sens interdit» (dirección prohibida). La prioridad de la derecha no se aplica frente a un tranvía: el «tram» tiene prioridad salvo señal en contra. Un conductor que sale de una propiedad privada, un garaje, un aparcamiento o un «chemin de terre» (camino de tierra) debe ceder el paso a todos.',
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
      'En Bélgica casi todas las rotondas llevan una señal «B1» (ceder el paso) en cada entrada más la «D5» (rotonda obligatoria). Entonces los vehículos que YA están dentro tienen prioridad. Si no hubiera ninguna señal, se aplicaría la «priorité de droite», es decir, prioridad al que entra. Al salir de la rotonda hay que poner el «clignotant» (intermitente) a la derecha; al entrar no es obligatorio señalar. Dentro de la rotonda no se permite «marche arrière» ni parar.',
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
      'Un «véhicule prioritaire» (policía, bomberos, ambulancia) que usa a la vez el «feu bleu» (luz azul giratoria) y el «avertisseur sonore spécial» (sirena) tiene prioridad sobre todos: hay que «se ranger» (apartarse) y ceder el paso, incluso saltando un semáforo en rojo con prudencia si es la única forma. Con luz azul pero sin sirena no tiene prioridad, pero hay que estar atento. Un autobús que sale de una «arrêt d\'autobus» dentro de una «agglomération» y señala su salida con el intermitente: los conductores deben dejarlo salir (reducir o parar).',
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
      'Regla general: «en agglomération» (dentro de población, entre las señales F1 y F3) 50 km/h, PERO en la Región de Bruselas-Capital el límite por defecto es 30 km/h desde 2021 salvo señal que indique 50 o 70. «Hors agglomération» (fuera de población): 90 km/h en Valonia, 70 km/h en Flandes. «Route à 2×2 bandes» separadas por una mediana: 120 km/h. «Autoroute»: máximo 120 km/h y mínimo 70 km/h. «Zone 30» y «abords d\'école» (entorno escolar): 30. «Zone résidentielle» y «zone de rencontre»: 20 km/h. «Zone piétonne»: paso de peatón. «Rue cyclable»: 30 km/h y prohibido adelantar a ciclistas.',
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
      'La velocidad debe adaptarse siempre a las circunstancias («conditions atmosphériques», estado de la vía, visibilidad, tráfico), aunque estés por debajo del límite. Debes poder detenerte dentro de la distancia que ves libre («distance de visibilité»). Con otros vehículos delante hay que dejar una «distance de sécurité» de al menos 2 segundos (regla de los 2 segundos: cuenta desde que el coche de delante pasa un punto fijo). Los vehículos de más de 7,5 t deben dejar 50 m fuera de población. Circular «à une allure anormalement lente» (demasiado despacio) sin motivo también está prohibido.',
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
      'Está prohibido adelantar (por la izquierda a un vehículo de más de dos ruedas): 1) al acercarse a un «passage pour piétons» o «passage pour cyclistes» si hay que invadir la parte reservada al sentido contrario, o si un vehículo se ha parado antes del paso; 2) en un «carrefour» donde se aplica la prioridad de la derecha (fuera de la vía prioritaria); 3) en un «passage à niveau» (paso a nivel) sin barreras ni semáforos; 4) al llegar al «sommet d\'une côte» (cima de una cuesta) o en un «virage» (curva) fuera de población, si la visibilidad es insuficiente; 5) donde hay una «ligne blanche continue» que separa los sentidos; 6) con señal «C35» (adelantamiento prohibido) hasta la «C37»; 7) cuando llueve, en autopista y vías de 2×2, los vehículos de más de 7,5 t no pueden adelantar; 8) prohibido adelantar a un ciclista o ciclomotor en una «rue cyclable».',
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
      'Al «croiser» (cruzarse con un vehículo que viene en sentido contrario) hay que mantenerse lo más a la derecha posible y, si es necesario, reducir la velocidad o pararse. Cuando la vía es estrecha y hay un obstáculo en tu lado, TÚ debes ceder («c\'est à vous de céder»). En una cuesta estrecha, cede el que baja («celui qui descend») frente al que sube, salvo que el que baja esté más cerca de un apartadero. Con señal «B19» (disco con borde rojo: flecha negra hacia abajo y flecha roja hacia arriba, la roja eres tú) tú cedes; con «B21» (rectángulo azul: flecha roja hacia abajo y blanca hacia arriba) tienes prioridad en el paso estrecho.',
    keyTerms: [
      { fr: 'croiser / croisement', es: 'cruzarse con un vehículo de frente' },
      { fr: 'obstacle', es: 'obstáculo' },
      { fr: 'passage étroit', es: 'paso estrecho' },
      { fr: 'celui qui descend', es: 'el que baja' },
    ],
  },

  /* ---------------- ALCOOL ---------------- */
  {
    id: 'alc-taux',
    theme: 'alcool',
    title: { fr: 'Alcool au volant', es: 'Alcohol al volante' },
    body:
      'Límite legal: 0,5 g/l de alcohol en sangre (= 0,22 mg/l de aire espirado). Para los «conducteurs professionnels» (bus, camión, taxi): 0,2 g/l (0,09 mg/l). Entre 0,5 y 0,8 g/l: multa e «interdiction de conduire» inmediata de 3 horas. A partir de 0,8 g/l: «retrait immédiat du permis» de 6 horas como mínimo y proceso ante el «tribunal de police». Negarse al «test d\'haleine» (prueba de alcoholemia) se sanciona como una tasa alta. Una «unité d\'alcool» estándar (una cerveza de 25 cl, una copa de vino) sube la tasa unos 0,2–0,3 g/l y el cuerpo elimina solo ~0,15 g/l por hora; el café, la ducha o el aire no aceleran nada.',
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
      '«Feu rouge»: parada obligatoria antes de la «ligne d\'arrêt» (o antes del paso de peatones / del semáforo si no hay línea). «Feu orange fixe» (ámbar fijo): hay que parar, salvo si estás tan cerca que no puedes hacerlo con seguridad. «Feu vert»: puedes pasar, pero solo si el cruce está despejado y cediendo a peatones y ciclistas que ya cruzan. «Orange clignotant»: semáforo apagado; prudencia y se aplican las señales / prioridad de la derecha. «Flèche verte» (flecha verde): solo puedes ir en esa dirección, cediendo a los peatones. Flecha roja: prohibido ir en esa dirección. Señales «B22» / «B23»: los ciclistas pueden girar a la derecha / seguir recto en rojo cediendo el paso; no se aplica a coches.',
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
      'Un «agent qualifié» manda sobre semáforos y señales. Brazo levantado verticalmente = «arrêt» para todos (como el rojo). Brazos extendidos horizontalmente (uno o los dos) = arrêt para los usuarios hacia los que el agente tiene el pecho o la espalda; pueden pasar los que están en la prolongación de sus brazos (a sus lados). Brazo agitado transversalmente = orden de avanzar en esa dirección. Movimiento vertical del brazo = reducir la velocidad. Además, la «police» puede pararte con un disco rojo o luces; debes obedecer y presentar los documentos.',
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
      '«Ligne blanche continue»: prohibido cruzarla o circular sobre ella. «Ligne discontinue»: se puede cruzar. Doble línea (continua + discontinua): cuenta la que tienes más cerca. «Traits courts et rapprochés» (rayas cortas y juntas): anuncian una línea continua o delimitan una «bande de circulation» (carril) especial. «Zone d\'évitement» (zona rayada oblicua): prohibido circular, parar o estacionar. «Damier» (ajedrezado blanco): zona reservada (bus/tram), no estacionar. Triángulos blancos en el suelo = «B1» (ceder). Línea blanca ancha transversal = «ligne d\'arrêt» del STOP. «Passage pour piétons»: bandas blancas paralelas al eje de la vía. Flechas de «sélection» en el carril: obligan a seguir la dirección al llegar al cruce.',
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
      'Letra = familia: «A» danger (triángulo con borde rojo, aviso de peligro, colocado unos 150 m antes fuera de población y justo antes en población); «B» priorité; «C» interdiction (círculo rojo: prohibición); «D» obligation (círculo azul: obligación); «E» arrêt et stationnement (círculo rojo/azul: E1 estacionamiento prohibido, E3 parada y estacionamiento prohibidos, E9 estacionamiento autorizado); «F» indication (rectángulo azul o blanco: F1 población, F4a zona 30, F5 autopista, F12a zona residencial, F19 sentido único, F45 callejón sin salida, F111 calle ciclista). Un «panneau additionnel» (placa debajo) precisa distancia, tramo, horario o excepciones. Barra roja oblicua sobre fondo blanco = fin de la prohibición.',
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
      'Prohibidos LOS DOS: sobre «trottoirs» (aceras) y «pistes cyclables»; sobre pasos de peatones y ciclistas y a menos de 5 m antes de ellos; en los cruces y a menos de 5 m del ángulo del cruce; a menos de 20 m antes de un semáforo situado en un cruce (salvo para vehículos ≤1,65 m si el semáforo está a más de 2 m de altura); en pasos a nivel; sobre raíles de tranvía; en «zones d\'évitement» y «damiers»; en «autoroute» y «route pour automobiles» (salvo áreas de descanso); bajo puentes, en túneles y en pasos elevados o inferiores; en lugares donde el vehículo estorbe la visibilidad de señales o de curvas; cerca de la cima de una cuesta. Prohibido SOLO el estacionamiento: a menos de 15 m de una «arrêt de bus/tram»; delante de «accès carrossables» (entradas de garaje); en doble fila; donde impida a otro vehículo salir; a menos de 1 m de otro vehículo estacionado; en «zone résidentielle» fuera de las plazas marcadas; con señal E1.',
    keyTerms: [
      { fr: 'à moins de 5 m', es: 'a menos de 5 m' },
      { fr: 'accès carrossable', es: 'entrada de vehículos (vado)' },
      { fr: 'en double file', es: 'en doble fila' },
      { fr: 'piste cyclable', es: 'carril bici' },
      { fr: 'arrêt de tram', es: 'parada de tranvía' },
    ],
  },
  {
    id: 'sta-regles',
    theme: 'stationnement',
    title: { fr: 'Comment stationner', es: 'Cómo estacionar' },
    body:
      'En una calle de doble sentido se estaciona a la derecha en el sentido de la marcha, paralelo al borde y lo más cerca posible. Estacionar en el lado izquierdo (contra dirección) está prohibido en doble sentido; en una calle de «sens unique» se puede estacionar a ambos lados. «Stationnement alterné semi-mensuel» (señales E5/E7): del 1 al 15 del mes se estaciona del lado de los números impares, del 16 al final del lado de los pares; el cambio se hace entre las 19:30 y las 20:00 del último día. «Zone bleue»: hay que poner el «disque de stationnement» (disco horario) los días laborables de 9 a 18 h, máximo 2 horas salvo indicación distinta; sin disco es infracción. Fuera de población, si no hay acera, se estaciona en el «accotement» (arcén) si es posible.',
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
      'Señal «F5» = inicio de «autoroute», «F7» = fin. Solo pueden entrar vehículos capaces de circular a 70 km/h como mínimo: prohibida a peatones, ciclistas, «cyclomoteurs», tractores. Velocidad máx. 120, mín. 70. Se entra por la «bande d\'accélération» (carril de aceleración) cediendo el paso a los que ya circulan; se sale por la «bande de décélération» sin frenar antes en la vía principal. Prohibido: parar o estacionar (salvo avería en la «bande d\'arrêt d\'urgence»), «marche arrière», «demi-tour», cruzar la «berme centrale» (mediana), circular por el arcén, «remorquer» (remolcar) salvo hasta la próxima salida. Mantén la derecha: el carril izquierdo solo para adelantar. Con 3 carriles, los vehículos de más de 3,5 t no pueden usar el carril izquierdo. La «route pour automobiles» (F9/F11) tiene casi las mismas reglas pero su límite depende de la región y no exige velocidad mínima.',
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
      'En caso de «panne» (avería): encender los «feux de détresse» (cuatro intermitentes), apartar el vehículo al «bande d\'arrêt d\'urgence» o al arcén, ponerse el «gilet fluorescent» (chaleco reflectante) antes de salir del coche, colocar el «triangle de danger» a unos 30 m detrás en carretera normal y a unos 100 m en autopista, y ponerse a salvo detrás de la «glissière» (guardarraíl). Llamar al 112 o usar la «borne d\'appel» (poste SOS). En accidente con heridos: proteger el lugar, alertar (112), socorrer sin mover a los heridos salvo peligro inmediato. Es obligatorio detenerse y prestar ayuda; abandonar el lugar es «délit de fuite» (fuga). Sin heridos: rellenar el «constat amiable» (parte amistoso).',
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
      'En un «passage pour piétons» el conductor debe ceder el paso al peatón que ya está cruzando Y al que se dispone a cruzar («s\'apprête à traverser»), y acercarse a velocidad moderada. Sin paso de peatones a menos de 20–30 m, el peatón puede cruzar por cualquier sitio pero debe ceder a los vehículos; aun así, el conductor debe redoblar la prudencia con niños, personas mayores y con discapacidad. Al girar en un cruce, hay que ceder a los peatones que cruzan la calle en la que entras, incluso con semáforo verde. En una «zone résidentielle» los peatones pueden usar toda la calzada y jugar; los vehículos a 20 km/h. En una «zone piétonne» solo circulan vehículos autorizados a paso de peatón.',
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
      'El tranvía tiene prioridad sobre los demás usuarios salvo señalización contraria: no se aplica la prioridad de la derecha frente a él, y no se puede ir por los raíles cuando se acerca. En una parada sin «refuge» (isleta), mientras los viajeros suben o bajan hay que detenerse detrás del tranvía (o del autobús en «site propre») y esperar; con isleta se puede pasar despacio. Prohibido estacionar a menos de 15 m de una parada, ni parar sobre los raíles. Al salir de la parada el bus en población tiene prioridad para reincorporarse.',
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
      'Para girar a la derecha: señalar con tiempo, colocarse lo más a la derecha posible, ceder a peatones y ciclistas que van recto, tomar la curva cerrada. Para girar a la izquierda: señalar, colocarse a la izquierda de tu sentido (junto al eje de la calzada, o a la izquierda en sentido único), ceder a los que vienen de frente (recto o girando a la derecha) y a los peatones y ciclistas, y girar amplio para entrar en el lado derecho de la nueva calle. Toda «manœuvre» (giro, marcha atrás, cambio de carril, salir de un aparcamiento, «demi-tour») obliga a ceder el paso a los demás usuarios. Marcha atrás: prohibida si no se puede hacer con seguridad, en autopista y en rotondas; nunca más de lo necesario.',
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
      'Circula por la «bande» más a la derecha que esté libre. En una calzada de dos carriles por sentido en población, puedes elegir carril según tu destino; fuera de población solo el derecho salvo para adelantar. «Bande bus» (F17/F18, «site spécial franchissable»): reservada a bus, taxi, ciclistas y a veces otros (indicados); se puede cruzar para girar o entrar en un garaje pero no circular por ella. Antes de cambiar de carril hay que mirar el «rétroviseur», el ángulo muerto y señalar. En circulación en filas se puede seguir en tu fila aunque adelantes por la derecha, pero no cambiar de fila para ir más rápido. «Tirette» (cremallera): cuando un carril se cierra, se incorpora alternando uno de cada carril justo antes del estrechamiento; es obligatorio en Bélgica.',
    keyTerms: [
      { fr: 'bande bus', es: 'carril bus' },
      { fr: 'site spécial franchissable', es: 'carril reservado que se puede cruzar' },
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
      'Nunca entres en un «passage à niveau» si no puedes salir de él de inmediato (atasco al otro lado). Hay que detenerse cuando los «feux rouges clignotants» parpadean, cuando suena la «sonnerie» (campana), cuando las «barrières» bajan o están bajadas, y cuando un tren se acerca aunque no haya nada activado. Prohibido zigzaguear entre medias barreras. Señal A41 (con barreras) / A43 (sin barreras) anuncian el paso a nivel; las «croix de Saint-André» (A45/A47) están justo en el paso. Adelantar en un paso a nivel sin barreras ni semáforos está prohibido.',
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
      'Entre la «tombée du jour» (anochecer) y el «lever du jour» (amanecer) y siempre que la visibilidad sea inferior a unos 200 m (lluvia, niebla, nieve, túnel) hay que llevar encendidos los «feux de croisement» (luces de cruce) delante y los «feux de position» + «feux rouges» detrás. Los «feux de route» (largas) se usan de noche fuera de población cuando no hay alumbrado suficiente y NO cuando se cruza a otro usuario, se sigue a otro vehículo, o hay alumbrado público que permite ver a 100 m. Los «feux de brouillard avant» (antiniebla delanteros) solo con niebla, nieve o lluvia fuerte; el «feu de brouillard arrière» es OBLIGATORIO cuando la niebla o la nieve reducen la visibilidad a menos de 100 m y con lluvia fuerte, y prohibido en otro caso porque deslumbra. Los «feux de détresse» (warning) se usan para señalar un peligro o un vehículo averiado, o al frenar bruscamente al final de un atasco.',
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
      '«Brouillard» (niebla): luces de cruce (nunca largas, reflejan), velocidad adaptada a la distancia visible, más distancia de seguridad. «Pluie» (lluvia): riesgo de «aquaplanage» (aquaplaning) a partir de unos 80 km/h; si el volante se vuelve ligero, no frenes ni gires bruscamente, levanta el pie suavemente. «Verglas» (hielo) y «neige»: frenar y girar con suavidad, evitar puentes y zonas de sombra; a menos de 7 °C, las gomas de invierno rinden mejor (no obligatorias en Bélgica). Viento lateral: cuidado al salir de zonas protegidas y al adelantar camiones. Sol bajo («éblouissement», deslumbramiento): reducir velocidad, gafas de sol, parabrisas limpio. Vehículo estacionado de noche fuera de población: debe llevar luces de posición si no es visible a 100 m; en población no si el alumbrado público lo hace visible.',
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
      '«Ceinture de sécurité» obligatoria para todos los ocupantes, delante y detrás, incluso en trayectos cortos; el conductor responde de los menores de 18 años. Niños de menos de 1,35 m: en un «siège pour enfant» (silla) o «rehausseur» (elevador) adaptado; pueden ir delante en silla adecuada (si es contra la marcha, el «airbag» desactivado). Teléfono: prohibido sostener en la mano cualquier «appareil mobile avec écran» mientras se conduce, incluso parado en un semáforo; solo en soporte fijo o manos libres. «Appuie-tête» (reposacabezas) regulado a la altura de la cabeza. Neumáticos: «profondeur des sculptures» (profundidad del dibujo) mínima 1,6 mm; misma clase en un mismo eje. En el coche deben ir: triángulo, chaleco, «extincteur» (extintor) y «trousse de secours» (botiquín).',
    keyTerms: [
      { fr: 'ceinture de sécurité', es: 'cinturón de seguridad' },
      { fr: 'siège pour enfant / rehausseur', es: 'silla infantil / elevador' },
      { fr: 'appareil mobile avec écran', es: 'dispositivo móvil con pantalla' },
      { fr: 'pneus', es: 'neumáticos' },
      { fr: 'extincteur', es: 'extintor' },
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
      'Tras aprobar el teórico (válido 3 años) se obtiene un «permis de conduire provisoire»: «M36» (desde 17 años, siempre con un «guide» registrado, válido 36 meses) o «M18» (desde 18 años, tras 20 horas en «auto-école», válido 18 meses, se puede conducir solo). Si caduca sin aprobar, existe el «M12» de 12 meses con guía. Obligaciones con permiso provisional: placa «L» visible detrás, mínimo 3 meses de prácticas («stage») antes del práctico, prohibido conducir de 22 h a 6 h los viernes, sábados, domingos y vísperas y días festivos, prohibido remolcar, y el guía debe tener el permiso B desde al menos 8 años. En Bruselas también hay que hacer el «test de perception des risques» (TPR) y la formación de primeros auxilios antes del práctico.',
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
      'Bélgica no tiene permiso por puntos. Las infracciones se dividen en cuatro «degrés» (grados): 1er grado (leves, p. ej. no señalar), 2.º (p. ej. teléfono en mano, no llevar cinturón), 3.º (p. ej. saltarse un rojo, adelantar peligrosamente), 4.º (las más graves, p. ej. dar marcha atrás en autopista, adelantar en paso a nivel). Las de 4.º grado pasan siempre por el «tribunal de police» con «déchéance du droit de conduire» (retirada del derecho a conducir) de 8 días mínimo. Exceso de velocidad: multa creciente; a partir de +20 km/h en población o +30 fuera, citación al tribunal. El «retrait immédiat du permis» lo decide el fiscal (p. ej. alcohol ≥0,8, exceso muy grande). Un conductor novel (menos de 2 años) puede tener que repetir exámenes tras ciertas condenas.',
    keyTerms: [
      { fr: 'infraction', es: 'infracción' },
      { fr: 'amende', es: 'multa' },
      { fr: 'déchéance du droit de conduire', es: 'retirada del derecho a conducir' },
      { fr: 'tribunal de police', es: 'tribunal de tráfico' },
      { fr: 'degré', es: 'grado (de una infracción)' },
    ],
  },
  {
    id: 'per-general',
    theme: 'permis',
    title: { fr: 'Règles générales de comportement', es: 'Reglas generales de comportamiento' },
    body:
      'Todo conductor debe estar en condiciones de conducir («en état de conduire»), tener el control del vehículo en todo momento y no poner en peligro a los demás. Hay que señalar toda maniobra con el «clignotant» con antelación. El «klaxon» (bocina) solo se usa para evitar un accidente; de noche se sustituye por un «appel de phares» (ráfaga). La «courtoisie» no crea derechos: si alguien te cede el paso por cortesía, sigues siendo responsable de comprobar que es seguro. El conductor es responsable de los daños que cause su carga o su vehículo, y debe dar «nom et adresse» tras un accidente. Está prohibido conducir con un vehículo cuya visibilidad esté reducida (parabrisas helado, carga que tape).',
    keyTerms: [
      { fr: 'en état de conduire', es: 'en condiciones de conducir' },
      { fr: 'avertisseur sonore', es: 'bocina' },
      { fr: 'appel de phares', es: 'ráfaga de luces' },
      { fr: 'mettre en danger', es: 'poner en peligro' },
      { fr: 'usager', es: 'usuario de la vía' },
    ],
  },
]

export const theoryById = Object.fromEntries(theory.map((t) => [t.id, t])) as Record<string, TheoryEntry>
