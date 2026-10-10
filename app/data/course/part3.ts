import type { CourseChapter } from './types'

export const part3: CourseChapter[] = [
  /* ===================================================================== */
  {
    id: 'ch12-stationnement',
    number: 12,
    title: { fr: 'Arrêt et stationnement', es: 'Parada y estacionamiento' },
    theme: 'stationnement',
    intro: 'Definiciones, dónde está prohibido (con las distancias exactas), cómo estacionar, zona azul, estacionamiento de pago y reservado, y pendientes.',
    sections: [
      {
        id: 'ch12-definitions',
        title: { fr: 'Arrêt ou stationnement', es: 'Parada o estacionamiento' },
        body: `**«Véhicule à l'arrêt»**: inmovilizado **solo** el tiempo necesario para que suban o bajen personas o para cargar/descargar cosas. **«Véhicule en stationnement»**: cualquier otra inmovilización (aunque el conductor esté dentro, aunque sea un minuto). La diferencia decide qué señales te afectan: **E1** y las líneas amarillas prohíben el estacionamiento (puedes parar); **E3** prohíbe los dos.

Al dejar el vehículo: motor apagado, freno de mano, marcha engranada, llave quitada y dirección bloqueada, nada de valor a la vista, puertas cerradas. Dejar el motor en marcha sin estar al volante es infracción.`,
      },
      {
        id: 'ch12-interdits',
        title: { fr: 'Arrêt et stationnement interdits', es: 'Parada y estacionamiento prohibidos' },
        body: `**Los dos** están prohibidos:
- sobre **aceras** y **accotements en saillie** en población (fuera de población el accotement en saillie se puede usar si quedan 1,5 m para peatones), sobre **pistas ciclables**, y a menos de **5 m** del lugar donde los ciclistas deben dejar la pista para entrar en la calzada;
- sobre los **pasos de peatones y ciclistas** y a menos de **5 m** antes de ellos;
- en los **cruces** y a menos de **5 m** de la prolongación del borde más cercano de la calzada transversal;
- a menos de **20 m** antes de un **semáforo** de cruce, salvo vehículos de ≤ 1,65 m de alto si el semáforo está a más de 2 m (y a menos de 20 m de un semáforo fuera de cruce, salvo vehículos bajos igualmente);
- a menos de **20 m** antes de una señal, si el vehículo la taparía;
- en **pasos a nivel**, sobre **raíles de tranvía** o tan cerca que estorbe;
- en **autopistas y routes pour automobiles** (salvo áreas y arcén por avería), en **túneles**, bajo **puentes** y pasos elevados/inferiores (salvo señal);
- en **zonas de evitación**, **damiers**, **dispositivos elevados** y bandas bus / sites propres;
- cerca de la **cima de una cuesta** y en **curvas** sin visibilidad;
- donde el vehículo impida la visibilidad de una señal o de la salida de un garaje;
- con señal **E3** y en el tramo de líneas amarillas si son continuas (raro).

**Solo el estacionamiento** está prohibido:
- a menos de **15 m** a ambos lados de una **parada de bus, tram o trolebús** (señal);
- delante de los **«accès carrossables»** (entradas de garaje), salvo matrícula indicada;
- en **doble fila**;
- donde impida a otro vehículo estacionado salir;
- a menos de **1 m** de otro vehículo estacionado (delante o detrás);
- en **zona residencial** fuera de las plazas marcadas;
- a lo largo de una **línea amarilla discontinua** y con señal **E1**;
- en los lugares reservados (PMR, taxis, carga, recarga eléctrica, autobuses) salvo derecho;
- en «zone de stationnement» sin disco o sin pagar donde se exige.

Un vehículo estacionado **más de 24 h** seguidas en la vía pública (sin señal) puede considerarse abandonado en algunas comunas; los remolques y caravanas no pueden estar más de 24 h seguidas en la vía pública salvo señal.`,
      },
      {
        id: 'ch12-comment',
        title: { fr: 'Comment stationner', es: 'Cómo estacionar' },
        body: `- En calle de **doble sentido**: a la **derecha** en el sentido de la marcha, paralelo al borde y lo más cerca posible (las ruedas a menos de ~30 cm). Estacionar en el lado izquierdo (contramano) está prohibido.
- En **sentido único**: a cualquiera de los dos lados.
- En plazas **marcadas**: dentro de las marcas, en el sentido indicado; en batería o espiga según las marcas. Las señales **E9a–E9h** indican cómo: E9b (coches), E9c (camiones), E9d (bus), E9e (parcialmente sobre la acera), E9f (sobre la acera), E9g/E9h (en batería / en espiga).
- **Fuera de población**: en el accotement de plain-pied si es posible, o en el accotement en saillie dejando 1,5 m a los peatones.
- Al dejar el coche en **pendiente**: freno de mano y marcha; **cuesta abajo** → marcha atrás y ruedas giradas **hacia la acera** (el bordillo frena); **cuesta arriba** → 1.ª y ruedas giradas **hacia la calzada** si hay bordillo (el coche se apoya en él al retroceder), o hacia el accotement si no hay bordillo. Con cuña en pendientes fuertes.
- Motos: pueden estacionar en la acera si dejan 1,5 m y no estorban (según región; en Bruselas sí con esa condición).`,
      },
      {
        id: 'ch12-zones',
        title: { fr: 'Zone bleue, payant, réservé, alterné', es: 'Zona azul, de pago, reservado, alterno' },
        body: `### Zone bleue (E9a + placa «zone bleue» o marcas azules)
Hay que colocar el **«disque de stationnement»** azul europeo, puesto en la **media hora siguiente** a la llegada (si llegas a las 10:05, pones 10:30). Obligatorio los **días laborables** (incluido sábado) de **9 a 18 h**, salvo indicación; duración máxima **2 h** (o la de la placa). Sin disco, disco mal puesto o tiempo superado = tarifa de día (retribución) o multa. En Bruselas hay zonas donde la tarjeta de residente sustituye al disco.

### Estacionamiento de pago
Parquímetro o app según la zona (en Bruselas, zonas roja/naranja/verde/gris con tarifas y máximos distintos). Pagar o poner el disco si lo indica fuera del horario de pago. La «carte de riverain» exime en tu barrio.

### Reservado
- **PMR**: plazas con pictograma; solo con la **tarjeta azul europea** visible. Multa y grúa para el resto. Además, el titular de la tarjeta puede estacionar sin límite en zona azul y, en muchas comunas, gratis en el de pago.
- **Taxis, bus, carga/descarga** (horario de la placa), **recarga eléctrica** (solo mientras cargas), **car-sharing**: solo los autorizados.

### Alterné semi-mensuel (E5 / E7)
Del **1 al 15** se estaciona en el lado de los números **impares**; del **16 al final** en el lado de los **pares**. El cambio se hace entre las **19:30 y las 20:00** del día 15 y del último día. E5 marca el lado de los impares (1–15) y E7 el de los pares (16–31).`,
      },
    ],
  },

  /* ===================================================================== */
  {
    id: 'ch13-autoroute',
    number: 13,
    title: { fr: 'Autoroutes, pannes et accidents', es: 'Autopistas, averías y accidentes' },
    theme: 'autoroute',
    intro: 'Reglas de la autopista y la vía para automóviles, qué hacer en caso de avería o accidente, y los primeros auxilios básicos (obligatorios en Bruselas antes del práctico).',
    sections: [
      {
        id: 'ch13-regles',
        title: { fr: "Rouler sur l'autoroute", es: 'Circular por la autopista' },
        body: `**F5** inicio / **F7** fin de autoroute; **F9** / **F11** route pour automobiles.

- **Quién no puede entrar**: peatones, ciclistas, ciclomotores, patinetes, tractores, caballos, vehículos que no alcanzan **70 km/h**, vehículos averiados remolcados por cuerda (salvo hasta la primera salida), aprendices sin provisional (con provisional sí se puede).
- **Velocidad**: 120 máx., **70 mín.** (en la route pour automobiles rige el límite regional y no hay mínimo). Camiones y conjuntos > 3,5 t: 90.
- **Entrar**: por la **bande d'accélération**, cediendo a los que circulan; alcanza su velocidad y entra en un hueco, sin pararte al final del carril salvo imposibilidad.
- **Circular**: por la **derecha**; los otros carriles para adelantar. Con **3 carriles o más**, los vehículos de más de **3,5 t** y los conjuntos con remolque no pueden usar el carril más a la izquierda. Está permitido quedarse en el carril central si el derecho está ocupado de forma continua por vehículos lentos («files»).
- **Salir**: intermitente, **bande de décélération** y reducir solo allí. Si te pasas la salida, sigue hasta la siguiente.
- **Prohibido**: parar o estacionar (salvo avería en la «bande d'arrêt d'urgence»), **marcha atrás**, **demi-tour**, cruzar la **berme centrale** (incluso por un paso de servicio), circular por el arcén (ni en atasco), remolcar (salvo hasta la primera salida con dispositivo adecuado), circular a contramano, adelantar por la derecha (salvo files), parar para recoger a un autoestopista.
- **Atascos**: formar el **«couloir de secours»** (carril izquierdo se pega a la izquierda, los demás a la derecha) para dejar pasar a los servicios de emergencia; usar las luces de emergencia al llegar al final de la cola.
- **Peaje y ecotasas**: no hay peaje para coches en Bélgica; camiones con «Viapass».`,
      },
      {
        id: 'ch13-panne',
        title: { fr: 'Panne', es: 'Avería' },
        body: `1. **Luces de emergencia** («feux de détresse») de inmediato.
2. Salir de la calzada: **bande d'arrêt d'urgence** o arcén, lo más a la derecha; ruedas giradas hacia el exterior.
3. **Chaleco** puesto **antes** de salir del coche; salir por el lado derecho (lejos del tráfico); pasajeros fuera y detrás del **guardarraíl** («glissière»).
4. **Triángulo** a **100 m** detrás en autopista (30 m en carretera ordinaria, antes de la curva si hay), siempre que sea seguro ir a ponerlo.
5. Llamar al **112** o usar la **borne d'appel** (cada 2 km, indica tu posición exacta; las flechas de los postes del arcén apuntan a la más cercana), o la asistencia. Esperar fuera del coche, detrás de la barrera.
6. No intentar reparar en el arcén salvo algo trivial y seguro; no cruzar nunca la calzada.

Si el vehículo se queda en un carril y no puedes moverlo: luces de emergencia, chaleco, salir y alejarse, avisar al 112.`,
      },
      {
        id: 'ch13-accident',
        title: { fr: 'Accident', es: 'Accidente' },
        body: `### Obligaciones
Todo implicado debe **detenerse**, **identificarse** (nombre y dirección, datos del seguro) y **prestar asistencia**; irse sin hacerlo es **«délit de fuite»** (delito, prisión y déchéance). Con solo daños materiales y acuerdo: rellenar el **«constat amiable»** europeo (un solo formulario, firmado por ambos; sin firmarlo no se admite nada). Sin acuerdo, con heridos, con un vehículo extranjero o con daños a un vehículo estacionado sin propietario presente: **avisar a la policía** (101 o 112) y dejar una nota con tus datos en el parabrisas si procede. No mover los vehículos si hay heridos o desacuerdo (fotos antes si hay que despejar).

### Con heridos: P.A.S.
- **Protéger**: luces de emergencia, chaleco, triángulo, apagar contactos, no fumar, poner a los presentes a salvo detrás del guardarraíl, señalizar en los dos sentidos si hace falta.
- **Alerter**: **112** (número único europeo; también 100 en Bélgica). Decir: dónde (vía, sentido, km, poste), qué (vehículos, incendio, sustancias), cuántos heridos y en qué estado, y no colgar hasta que te lo digan.
- **Secourir**: hablar a la víctima, no mover a los heridos (riesgo de lesión medular) salvo peligro inmediato (fuego, vehículo en el carril), no quitar el casco a un motorista (salvo si no respira), tapar, comprimir una hemorragia con la mano o un paño, colocar en «position latérale de sécurité» a quien está inconsciente pero respira, hacer **RCP** (30 compresiones / 2 insuflaciones) a quien no respira, usar el **DEA** si lo hay. No dar de beber.

Tras el accidente, declarar al seguro en **8 días**. Los **usagers faibles** heridos son indemnizados automáticamente por el seguro del vehículo implicado.`,
      },
    ],
  },

  /* ===================================================================== */
  {
    id: 'ch14-conditions',
    number: 14,
    title: { fr: 'Éclairage et conditions difficiles', es: 'Alumbrado y condiciones difíciles' },
    theme: 'eclairage',
    intro: 'Qué luz en cada momento, y cómo conducir de noche, con lluvia, niebla, nieve, hielo, viento o sol bajo.',
    sections: [
      {
        id: 'ch14-feux',
        title: { fr: 'Quel feu, quand', es: 'Qué luz, cuándo' },
        body: `- **Feux de croisement** (cortas): obligatorias entre la **tombée** y el **lever du jour** y siempre que la visibilidad sea **< 200 m** (lluvia fuerte, niebla, nieve, túnel, humo). Las luces diurnas (DRL) **no** encienden las traseras: con mala visibilidad o de noche, activa las de cruce.
- **Feux de route** (largas): de noche, fuera de población, sin alumbrado suficiente. **Prohibidas** si el alumbrado público permite ver a **100 m**, al cruzarte con otro usuario (coche, bici, peatón, tren), cuando sigues a un vehículo a **menos de 50 m** (salvo para adelantar), y cuando el vehículo de delante te deslumbra por su retrovisor. **Appel de phares** = encender y apagar las largas para avisar (sustituye a la bocina de noche).
- **Feux de position**: para ser visto **parado**: obligatorias de noche fuera de población o donde no haya alumbrado que haga visible el vehículo a 100 m, y de día con visibilidad < 200 m. En marcha, nunca solas.
- **Feu de brouillard arrière**: **obligatorio** con niebla o nieve que reduzcan la visibilidad a **< 100 m** y con **lluvia fuerte**; prohibido en el resto de casos (deslumbra).
- **Feux de brouillard avant**: opcionales, solo con niebla, nieve o lluvia fuerte; pueden sustituir a las de cruce en esas condiciones.
- **Feux de détresse** (4 intermitentes): avería, accidente, peligro, final de atasco, remolque. Prohibidos para justificar una doble fila.
- **Feux stop**, **feu de recul** (blanco, marcha atrás), **feu de plaque** (ilumina la matrícula), **catadioptres** (reflectantes rojos atrás).
- **Ciclistas** de noche o con visibilidad < 200 m: luz blanca/amarilla delante, roja detrás; reflectantes.

Un vehículo con una sola luz de cruce funcionando, de noche, parece una moto: revisa las bombillas. Las luces delanteras deben estar bien reguladas (el reglaje se baja con el coche cargado).`,
      },
      {
        id: 'ch14-nuit',
        title: { fr: 'Conduire de nuit', es: 'Conducir de noche' },
        body: `De noche se ve menos y más tarde: los peatones y ciclistas sin reflectantes aparecen a 25–30 m, por eso con cortas no deberías ir a más de **70 km/h** en carretera sin alumbrado. Al cruzarte: mira al borde derecho, no a los faros. Ante deslumbramiento: reduce, no frenes en seco. Tras una larga conducción nocturna, el riesgo de somnolencia es máximo entre las 2 y las 5. Limpia los cristales por dentro y por fuera (la suciedad multiplica el deslumbramiento); no conduzcas con gafas tintadas de noche.`,
      },
      {
        id: 'ch14-meteo',
        title: { fr: 'Pluie, brouillard, neige, verglas, vent', es: 'Lluvia, niebla, nieve, hielo, viento' },
        body: `### Lluvia
Luces de cruce (y antiniebla trasera si es fuerte), distancia de seguridad duplicada, velocidad reducida. Las **primeras gotas** tras días secos son las más peligrosas (aceite + polvo). **Aquaplaning**: a partir de ~80 km/h sobre una lámina de agua los neumáticos pierden contacto; síntomas: volante ligero, motor que sube de vueltas. Qué hacer: **no frenar, no girar**, levantar el pie suavemente y mantener la dirección hasta recuperar agarre. Neumáticos con buen dibujo y presión correcta lo previenen.

### Niebla
Cortas (nunca largas: se reflejan) y antiniebla trasera si < 100 m. Velocidad según lo que ves: debes poder parar en la distancia visible. No pegarse a las luces del de delante. Ventanillas desempañadas.

### Nieve y hielo («verglas»)
Todo suave: acelerar, frenar y girar progresivamente; marcha larga para arrancar; freno motor; distancia ×5–10. **Zonas de riesgo**: puentes y viaductos (se hielan antes), zonas de sombra, bosques, salidas de túnel, tramos con viento. A temperatura cercana a 0 °C con lluvia: «pluie verglaçante», la más traicionera. Neumáticos de invierno o 4 estaciones recomendados por debajo de 7 °C; cadenas solo con nieve y donde lo exija la señal D9/placa (no en asfalto seco). Antes de salir, deshelar completamente parabrisas, ventanillas, luces y espejos y quitar la nieve del techo (se desprende y ciega al de detrás).

### Viento
Lateral fuerte (señal de peligro «vent latéral», manga de viento): sujeta el volante con las dos manos, reduce, cuidado al salir de zonas protegidas (puentes, fin de un bosque) y al adelantar o cruzarte con camiones (succión).

### Sol bajo
Deslumbramiento al amanecer/atardecer: gafas de sol, visera, parabrisas limpio, reducir, y pensar que los que vienen de frente tampoco ven.`,
      },
      {
        id: 'ch14-urgence',
        title: { fr: "Situations d'urgence", es: 'Situaciones de emergencia' },
        body: `- **Reventón**: sujetar el volante, no frenar en seco, levantar el pie, dejar que el coche reduzca, apartarse.
- **Fallo de frenos**: bombear (sin ABS), freno motor bajando marchas, freno de mano progresivo, buscar un escape (arcén, cuesta).
- **Acelerador bloqueado**: punto muerto, frenar, apagar el motor solo cuando estés parado (dirección asistida).
- **Derrape**: en un subviraje (el coche va recto en la curva), soltar acelerador y no girar más; en un sobreviraje (trasera que se va), contravolantear suavemente hacia donde va la trasera. Con ESP, dejar que actúe.
- **Animal en la calzada**: frenar en línea recta; un volantazo suele ser peor que el impacto.
- **Caída al agua**: desabrochar cinturones, abrir ventanillas antes de que el agua llegue, salir por la ventanilla; las puertas solo se abren cuando el habitáculo se ha llenado.
- **Incendio**: parar, apagar contacto, salir, extintor por la rendija del capó (no abrirlo del todo), alejarse y llamar al 112.`,
      },
    ],
  },

  /* ===================================================================== */
  {
    id: 'ch15-usagers',
    number: 15,
    title: { fr: 'Les usagers vulnérables', es: 'Los usuarios vulnerables' },
    theme: 'usagers-faibles',
    intro: 'Peatones, ciclistas, motoristas, ciclomotores, patinetes, niños, mayores y personas con movilidad reducida: sus derechos y lo que el conductor debe hacer.',
    sections: [
      {
        id: 'ch15-pietons',
        title: { fr: 'Les piétons', es: 'Los peatones' },
        body: `Reglas del peatón: usar la acera o el accotement; sin ellos, el borde **izquierdo** de la calzada fuera de población (de frente al tráfico), salvo si es más seguro el derecho; cruzar por el **paso** si hay uno a menos de 20–30 m, en perpendicular y sin demorarse; con semáforo, solo en verde (puede terminar de cruzar en rojo si ya había empezado); los grupos guiados pueden ir por la calzada.

Deberes del conductor: ceder en los pasos al peatón que cruza o **se dispone a cruzar**; moderar la velocidad al acercarse a un paso; no adelantar al vehículo detenido ante él; al girar, ceder a los peatones que cruzan; en zonas residenciales y peatonales, ceder siempre; con **niños** (impredecibles, no ven por encima de los coches aparcados), **mayores** (lentos, oyen y ven peor) y **PMR** (silla, bastón blanco = ciego, bastón amarillo = débil visual, perro guía): redoblar la prudencia y esperar. Un peatón fuera del paso cede el paso, pero nunca puedes ponerlo en peligro. No salpicar a los peatones (es infracción).`,
      },
      {
        id: 'ch15-cyclistes',
        title: { fr: 'Les cyclistes', es: 'Los ciclistas' },
        body: `Reglas del ciclista que conviene conocer: usa la **piste cyclable** si existe y es practicable (D7 o dos líneas discontinuas); si no, la calzada por la derecha (o el accotement de plain-pied, o la acera si tiene **menos de 9 años** y la bici es pequeña); puede ir **de dos en fondo** salvo si impide el cruce y, fuera de población, debe ponerse en fila cuando llega un vehículo por detrás; puede ir a contramano en los **SUL**; puede usar **B22/B23** para pasar en rojo cediendo; en una **rue cyclable** ocupa el carril; no está obligado a usar el casco (recomendado) ni a señalar con el brazo si es peligroso; de noche, luces y reflectantes; con un remolque o un niño en silla, reglas de peso y edad; no puede llevar pasajero sin asiento adecuado.

Deberes del conductor: **1 m** (población) / **1,5 m** (fuera) al adelantar; no adelantar en rue cyclable ni en rotonda; ceder a los que van recto cuando giras; mirar el ángulo muerto derecho antes de girar a la derecha; no estacionar ni parar en la piste cyclable; abrir la puerta con la mano contraria («poignée hollandaise»); en rotonda, ceder al salir a los de la pista ciclable; contar con ciclistas de frente en los SUL. Las **bicicletas eléctricas** (≤ 25 km/h) son ciclos; las **speed pedelecs** (≤ 45 km/h, matrícula, permiso AM, casco) siguen las reglas de los ciclomotores B.`,
      },
      {
        id: 'ch15-motos',
        title: { fr: 'Motards, cyclomoteurs, trottinettes', es: 'Motoristas, ciclomotores, patinetes' },
        body: `### Motoristas
Son estrechos y rápidos: difíciles de ver en el retrovisor y de estimar su velocidad. Mira dos veces antes de girar a la izquierda o cambiar de carril; déjales espacio al adelantar (el viento los desplaza); pueden circular **entre las filas** en atascos a máximo 50 km/h y con 20 km/h de diferencia; pueden usar la bande bus si la placa lo permite. Casco obligatorio para moto y ciclomotor.

### Ciclomotores
Clase **A** (≤ 25 km/h): siguen las reglas de la bici (piste cyclable obligatoria). Clase **B** (≤ 45 km/h, permiso AM, matrícula): en población circulan por la calzada (piste cyclable solo si lo indica la placa); fuera, por la piste cyclable. Prohibidos en autopista.

### Patinetes eléctricos y otros «engins de déplacement motorisés»
Máximo 25 km/h por construcción; mínimo **16 años** (salvo zonas residenciales, de encuentro, peatonales y rue réservée au jeu); se asimilan a **ciclistas**: calzada o piste cyclable, **nunca la acera** (se empujan a pie si hay que ir por ella), sin pasajero, sin estacionar donde estorben (hay «drop zones» M19–M24), luces y reflectantes de noche, casco recomendado, DNI encima. El alcohol y las drogas se sancionan igual que al volante.`,
      },
    ],
  },

  /* ===================================================================== */
  {
    id: 'ch16-infractions',
    number: 16,
    title: { fr: 'Infractions, sanctions et assurance', es: 'Infracciones, sanciones y seguro' },
    theme: 'permis',
    intro: 'Cómo se clasifican las infracciones, qué conlleva cada grado, el exceso de velocidad, la retirada del permiso y lo esencial del seguro.',
    sections: [
      {
        id: 'ch16-degres',
        title: { fr: 'Les quatre degrés', es: 'Los cuatro grados' },
        body: `Bélgica **no tiene permiso por puntos**. Las infracciones se clasifican por gravedad; la mayoría se liquidan con una **«perception immédiate»** (multa inmediata) y, si no se paga o es grave, con el **tribunal de police**:

- **1.er grado** (≈ 58 €): faltas leves: no señalar, estacionar mal sin peligro, no llevar documentos…
- **2.º grado** (≈ 116 €): poner en peligro indirecto: no respetar un B1, estacionar en un paso de peatones, cinturón, no respetar la distancia de seguridad, teléfono en mano…
- **3.er grado** (≈ 174 €): peligro directo: saltarse un **rojo** o un **STOP**, adelantar donde está prohibido, no ceder a un peatón, circular por la bande bus, teléfono (desde 2022)…
- **4.º grado** (tribunal, **déchéance** mínima de 8 días): marcha atrás, demi-tour o contramano en **autopista**, adelantar en paso a nivel, ignorar las barreras o luces de un paso a nivel, no ceder a un vehículo prioritario, conducir sin permiso…

Además: **alcohol/drogas** (categorías propias), **exceso de velocidad** (tarifa propia), **délit de fuite**, conducir sin seguro, sin ITV o sin permiso válido.`,
      },
      {
        id: 'ch16-vitesse',
        title: { fr: 'Les excès de vitesse', es: 'Los excesos de velocidad' },
        body: `Se aplica un **margen técnico** (6 km/h hasta 100 km/h, 6 % por encima) antes de contar el exceso. Luego:

- En **población, zona 30, residencial y escuela**: los primeros 10 km/h de exceso ≈ 53 €, cada km/h adicional +11 €; a partir de **+20 km/h** (o +30 fuera de población) → citación al **tribunal** con posible déchéance.
- Fuera de población y autopista: primeros 10 km/h ≈ 53 €, +6 € por km/h adicional; tribunal a partir de **+30 km/h**.
- **Retrait immédiat** posible a partir de +20 en población / +30 fuera, o a partir de +40 en cualquier lugar.

Radares: fijos, móviles, «lidar», de tramo («section») y «trajet»; las cámaras de semáforo multan rojo y velocidad. La señal F* indica cámara, pero puede haber radares sin señalar. Un conductor **novel** (< 2 años) que supere en +20/+30 puede ser condenado a repetir el práctico y/o el teórico.`,
      },
      {
        id: 'ch16-retrait',
        title: { fr: 'Retrait, déchéance et récidive', es: 'Retirada, inhabilitación y reincidencia' },
        body: `- **«Retrait immédiat du permis»**: medida administrativa del fiscal («procureur du Roi») en el momento: alcohol ≥ 0,8 g/l, drogas, grandes excesos, délit de fuite, accidente grave. Dura 15 días (prorrogable); se recupera y luego juzga el tribunal.
- **«Déchéance du droit de conduire»**: pena del tribunal, de 8 días a 5 años (o definitiva). Puede condicionarse a aprobar de nuevo el teórico, el práctico, exámenes médicos y psicológicos, o a instalar un **«éthylotest antidémarrage»**. Durante la déchéance, conducir es un delito grave.
- **Reincidencia**: repetir en 3 años una infracción grave (4.º grado, alcohol ≥ 0,8, grandes excesos, délit de fuite) obliga al juez a déchéance larga y a los cuatro exámenes de reintegración.
- **Fin de semana**: la déchéance puede ser «de fin de semana» (vie 20 h – lun 6 h) para permitir trabajar.
- **Conductores noveles**: menos de 2 años de permiso: por ciertas infracciones, déchéance mínima de 3 meses y exámenes de nuevo.
- **Sanciones administrativas comunales** (SAC): las comunas sancionan directamente estacionamiento y pequeñas infracciones.`,
      },
      {
        id: 'ch16-assurance',
        title: { fr: "L'assurance et la responsabilité", es: 'El seguro y la responsabilidad' },
        body: `- **RC auto («responsabilité civile»)**: **obligatoria** para circular. Cubre los daños que causes a terceros (no los tuyos ni los de tu coche). El certificado va a bordo. Conducir sin seguro: delito, retirada inmediata, el Fondo de garantía paga a las víctimas y te reclama.
- **Omnium** (completo), **mini-omnium** (robo, incendio, cristales, animales), **protección jurídica**, **conductor**: opcionales.
- **Bonus-malus / «joker»**: cada aseguradora fija su escala; un accidente con responsabilidad sube la prima.
- **Usagers faibles**: el seguro del vehículo implicado indemniza automáticamente sus daños corporales, haya o no responsabilidad del conductor (art. 29bis), salvo falta intencional de la víctima.
- **Conductor ocasional**: el seguro cubre a quien conduzca con tu permiso, salvo exclusión expresa; un conductor joven no declarado puede implicar franquicia.
- **Responsabilidad**: el conductor responde de sus infracciones; el **titular de la matrícula** debe identificar al conductor si se le reclama; los padres responden de los daños de sus hijos menores; conducir sin «état de conduire» o con el coche en mal estado agrava la responsabilidad.
- **Car-Pass** (historial de km) obligatorio para vender a un particular; **certificado de conformidad** y **ITV de venta** (si el coche ha circulado).`,
      },
    ],
  },
]
