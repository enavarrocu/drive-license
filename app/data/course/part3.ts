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
        body: `**«Véhicule à l'arrêt»**: inmovilizado **solo** el tiempo necesario para que suban o bajen personas o para cargar/descargar cosas. **«Véhicule en stationnement»**: cualquier otra inmovilización (aunque el conductor esté dentro, aunque sea un minuto); **repostar o cargar un coche eléctrico** también cuenta como estacionamiento (art. 2.23). La diferencia decide qué señales te afectan: **E1** y la línea amarilla discontinua prohíben el estacionamiento (puedes parar); **E3** prohíbe los dos.

Al dejar el vehículo: motor apagado, freno de mano, marcha engranada, llave quitada y dirección bloqueada, nada de valor a la vista, puertas cerradas. Dejar el motor en marcha sin estar al volante es infracción.`,
      },
      {
        id: 'ch12-interdits',
        title: { fr: 'Arrêt et stationnement interdits', es: 'Parada y estacionamiento prohibidos' },
        body: `**Los dos** están prohibidos (art. 24, y en general donde el vehículo sea un peligro o una molestia):
- sobre las **aceras** (salvo motos que no estorben) y, en población, sobre los **accotements en saillie**, salvo señalización local;
- sobre las **pistas ciclables** y a menos de **5 m** del lugar donde los ciclistas deben dejar la pista para entrar en la calzada (o al revés);
- sobre los **pasos de peatones y ciclistas** y en la calzada a menos de **5 m** antes de ellos;
- en los **cruces** y a menos de **5 m** de la prolongación del borde más cercano de la calzada transversal, salvo señalización local;
- a menos de **20 m** antes de un **semáforo** situado en un cruce (salvo señalización local);
- a menos de **20 m** antes de un **semáforo fuera de cruce** o de una **señal de tráfico**; esta regla no se aplica a los vehículos de **1,65 m** de alto o menos (carga incluida) si el borde inferior de la señal está a **2 m** o más del suelo;
- en los **pasos a nivel**;
- en la calzada de los **túneles** y pasos inferiores y, salvo señalización local, **bajo los puentes**;
- cerca de la **cima de una cuesta** y en las **curvas** sin visibilidad suficiente;
- sobre los **dispositivos elevados** (salvo señalización local), las **zonas de evitación** y los **damiers**;
- en **autopistas y routes pour automobiles** (salvo en las áreas señalizadas con E9a y en caso de avería);
- con señal **E3**.

**Solo el estacionamiento** está prohibido (art. 25):
- a menos de **1 m** de otro vehículo (delante o detrás) y donde impida a otro vehículo entrar o salir;
- a menos de **15 m** a ambos lados de la señal de una **parada de bus, tram o trolebús**;
- delante de los **«accès carrossables»** (entradas de garaje), salvo el vehículo cuya matrícula esté indicada en ellos;
- donde los peatones o ciclistas tengan que bajar a la calzada para rodear un obstáculo, o donde estorbe el paso del tranvía;
- donde el **paso libre** en la calzada quedaría por debajo de **3 m**;
- fuera de población, en la calzada de una vía con **B9**;
- en la calzada **dividida en carriles**, salvo donde lo autoricen E9a o E9b;
- a lo largo de una **línea amarilla discontinua** y con señal **E1**;
- en la calzada de doble sentido **frente a otro vehículo** parado o estacionado si eso dificulta el cruce de otros dos;
- en **doble fila** (se estaciona en una sola fila, art. 23.2) y en **zona residencial** fuera de las plazas marcadas;
- en las plazas reservadas (personas con discapacidad, taxis, carga, recarga eléctrica…) sin derecho a ellas;
- en «zone de stationnement» sin disco o sin pagar donde se exige.

Límites de duración (art. 27.5): los **remolques** y los vehículos **que no están en condiciones de circular** no pueden quedarse más de **24 h** seguidas en la vía pública; en población, los vehículos de más de **7,5 t**, no más de **8 h** (salvo con E9a, E9c o E9d); los vehículos publicitarios, no más de **3 h**.`,
      },
      {
        id: 'ch12-comment',
        title: { fr: 'Comment stationner', es: 'Cómo estacionar' },
        body: `- En calle de **doble sentido**: a la **derecha** en el sentido de la marcha (art. 23.1), paralelo al borde, lo más lejos posible del eje y en una sola fila. Estacionar en el lado izquierdo (contramano) está prohibido, salvo en zona residencial o de encuentro.
- En **sentido único**: a cualquiera de los dos lados.
- **Fuera de la calzada** si se puede: en el accotement de plain-pied y, fuera de población, en cualquier accotement, dejando **1,5 m** a los peatones si lo usan; si el accotement es estrecho, en parte sobre él y en parte sobre la calzada.
- En plazas **marcadas**: dentro de las marcas, en el sentido indicado; en batería o espiga según las marcas. Las señales E9 indican quién y cómo: **E9b** (motos, coches, coches mixtos, minibuses), **E9c** (camionetas y camiones), **E9d** (autocares), **E9h** (autocaravanas), **E9i** (motos); **E9e** obliga a estacionar **enteramente** sobre la acera o el accotement, **E9f** **en parte** sobre ellos y **E9g** **en la calzada** (ver capítulo 17).
- Al dejar el coche en **pendiente**: freno de mano y marcha; **cuesta abajo** → marcha atrás y ruedas giradas **hacia la acera** (el bordillo frena); **cuesta arriba** → 1.ª y ruedas giradas **hacia la calzada** si hay bordillo (el coche se apoya en él al retroceder), o hacia el accotement si no hay bordillo. Con cuña en pendientes fuertes.
- Motos: pueden estacionarse fuera de la calzada (por ejemplo en la acera) siempre que no estorben ni pongan en peligro a nadie (art. 23.4); bicis, patinetes y ciclomotores de dos ruedas, fuera de la calzada y sin estorbar.`,
      },
      {
        id: 'ch12-zones',
        title: { fr: 'Zone bleue, payant, réservé, alterné', es: 'Zona azul, de pago, reservado, alterno' },
        body: `### Zone bleue (señal de zona con E9a y el disco, o E9a + placa con el disco)
Hay que colocar el **«disque de stationnement»** detrás del parabrisas, con la flecha en el **trazo siguiente** a la hora de llegada (si llegas a las 10:05, pones 10:30). Obligatorio los **días laborables** (incluido sábado) de **9 a 18 h**, salvo indicación; duración máxima **2 h** (o la de la placa). Prohibido falsear el disco o cambiarlo sin mover el coche. Sin disco, disco mal puesto o tiempo superado = tarifa o multa (y posible cepo). La tarjeta de residente («carte de riverain») sustituye al disco donde la placa lo indique.

### Estacionamiento de pago
Parquímetro, horodator o app según la zona (en Bruselas, zonas de colores con tarifas y máximos distintos). Si el parquímetro está averiado, se usa el disco. La «carte de riverain» exime donde la placa lo indica («excepté riverains»).

### Reservado
- **Personas con discapacidad**: plazas con pictograma; solo con la **tarjeta especial** visible detrás del parabrisas. Además, con esa tarjeta no se aplican los límites de duración (zona azul) y, en muchas comunas, el estacionamiento de pago es gratuito.
- **Taxis, bus, carga/descarga** (horario de la placa), **recarga eléctrica** (el coche debe estar conectado), **car-sharing**: solo los autorizados.

### Alterné semi-mensuel (E5 / E7 / E11)
- **E5**: prohibido estacionar **del 1 al 15** del mes del lado donde está la señal; **E7**: prohibido **del 16 al final** del mes.
- **E11** (sobre la señal de entrada en población): alterno en todas las calles: del **1 al 15** se estaciona del lado de los números **impares**; del **16 al final**, del lado de los **pares**.
- El cambio de lado se hace el **último día de cada periodo** (el 15 y el último día del mes) entre las **19:30 y las 20:00**.`,
      },
    ],
  },

  /* ===================================================================== */
  {
    id: 'ch13-autoroute',
    number: 13,
    title: { fr: 'Autoroutes, pannes et accidents', es: 'Autopistas, averías y accidentes' },
    theme: 'autoroute',
    intro: 'Reglas de la autopista y la vía para automóviles, qué hacer en caso de avería o accidente, y los primeros auxilios básicos. El capítulo 19 amplía la avería, el remolque y el accidente en cualquier vía.',
    sections: [
      {
        id: 'ch13-regles',
        title: { fr: "Rouler sur l'autoroute", es: 'Circular por la autopista' },
        body: `**F5** inicio / **F7** fin de autoroute; **F9** / **F11** route pour automobiles.

- **Quién no puede entrar** (art. 21.1): peatones, ciclistas, ciclomotores, patinetes, jinetes y animales, vehículos agrícolas, quads sin habitáculo, vehículos que no alcanzan **70 km/h** en llano y quien remolca otro vehículo con una **«attache de fortune»** (cuerda, cable, barra improvisada). Solo se entra y se sale por los accesos previstos.
- **Velocidad**: 120 máx., **70 mín.** (en la route pour automobiles rige el límite según el tipo de vía y no hay mínimo). Vehículos y conjuntos de MMA > 3,5 t: 90.
- **Entrar**: por la **bande d'accélération**, cediendo a los que circulan; alcanza su velocidad y entra en un hueco, sin pararte al final del carril salvo imposibilidad.
- **Circular**: por la **derecha**; los otros carriles para adelantar. Con **3 carriles o más** en tu sentido, los autobuses, autocares y vehículos o conjuntos de MMA superior a **3,5 t** solo pueden usar los **dos carriles de la derecha** (art. 21.3). En tráfico denso en filas, cada fila avanza a su ritmo.
- **Salir**: intermitente, **bande de décélération** y reducir solo allí. Si te pasas la salida, sigue hasta la siguiente.
- **Prohibido** (art. 21.4, también en route pour automobiles): parar o estacionar (salvo en las áreas con E9a, y en caso de avería en la «bande d'arrêt d'urgence»), **marcha atrás**, circular a contramano, **demi-tour**, usar los **pasos transversales** de la mediana, **remolcar con una attache de fortune** (ni siquiera hasta la primera salida: hay que llamar a una grúa), circular por la bande d'arrêt d'urgence (ni en atasco), adelantar por la derecha (salvo files), parar para recoger a un autoestopista.
- **Mínimo de 70 km/h**: no vale si una señal C43 impone un límite inferior (obras).
- **Carril de horas punta** («bande réservée aux heures de pointe», línea discontinua de trazos largos y juntos): se usa según sus señales; si están apagadas, solo para entrar o salir de la autopista o para cambiar de dirección.
- **Objeto caído** en la calzada: no intentes recogerlo; avisa al 112 o a la policía.
- **Atascos**: formar el **«couloir de secours»** (carril izquierdo se pega a la izquierda, los demás a la derecha) para dejar pasar a los servicios de emergencia; usar las luces de emergencia al llegar al final de la cola.
- **Peaje y ecotasas**: casi no hay peajes para coches en Bélgica (excepción: el túnel Liefkenshoek, en Amberes); los camiones pagan por kilómetro («Viapass»).`,
      },
      {
        id: 'ch13-panne',
        title: { fr: 'Panne', es: 'Avería' },
        body: `1. **Luces de emergencia** («feux de détresse») de inmediato.
2. Salir de la calzada: **bande d'arrêt d'urgence** o arcén, lo más a la derecha; ruedas giradas hacia el exterior.
3. **Chaleco** puesto **al salir** del coche (obligatorio en autopista y route pour automobiles, art. 51.4); salir por el lado derecho (lejos del tráfico); pasajeros fuera y detrás del **guardarraíl** («glissière»).
4. **Triángulo** a **100 m** como mínimo detrás en autopista (30 m en vía ordinaria), visible a unos 50 m; antes de la curva si hay una. Solo si es seguro ir a ponerlo.
5. Llamar al **112** o usar la **borne d'appel** (cada 2 km, indica tu posición exacta; las flechas de los postes del arcén apuntan a la más cercana), o la asistencia. Esperar fuera del coche, detrás de la barrera.
6. No intentar reparar en el arcén salvo algo trivial y seguro; no cruzar nunca la calzada.

Si el vehículo se queda en un carril y no puedes moverlo: luces de emergencia, chaleco, salir y alejarse, avisar al 112.`,
      },
      {
        id: 'ch13-accident',
        title: { fr: 'Accident', es: 'Accidente' },
        body: `### Obligaciones
Todo implicado debe **detenerse**, quedarse en el lugar, enseñar su documento de identidad a los otros implicados que lo pidan (si tiene más de 15 años) y **prestar asistencia** a los heridos; irse para escapar de las comprobaciones es **«délit de fuite»** (delito, prisión y déchéance). Con solo daños materiales y acuerdo: rellenar juntos el **«constat européen d'accident»** (parte amistoso) y **apartar los vehículos** (anotando antes su posición o haciendo fotos). Sin acuerdo: **policía** (101). Con heridos: la **policía** debe venir (112) y no es obligatorio mover los vehículos. Si el perjudicado no está (coche aparcado): dejar **nombre y dirección** en el lugar y comunicarlos cuanto antes, directamente o por la policía (detalles en el capítulo 19).

### Con heridos: P.A.S.
- **Protéger**: luces de emergencia, chaleco, triángulo, apagar contactos, no fumar, poner a los presentes a salvo detrás del guardarraíl, señalizar en los dos sentidos si hace falta.
- **Alerter**: **112** (número único europeo de urgencias). Decir: dónde (vía, sentido, km, poste), qué (vehículos, incendio, sustancias), cuántos heridos y en qué estado, y no colgar hasta que te lo digan.
- **Secourir**: hablar a la víctima, no mover a los heridos (riesgo de lesión medular) salvo peligro inmediato (fuego, vehículo en el carril), no quitar el casco a un motorista (salvo si no respira), tapar, comprimir una hemorragia con la mano o un paño, colocar en «position latérale de sécurité» a quien está inconsciente pero respira, hacer **RCP** (30 compresiones / 2 insuflaciones) a quien no respira, usar el **DEA** si lo hay. No dar de beber.

Tras el accidente, declarar al seguro cuanto antes (el plazo habitual de los contratos es de **8 días**). Los **usagers faibles** heridos son indemnizados automáticamente por el seguro del vehículo implicado.`,
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
- **Feux de route** (largas): de noche, sin alumbrado suficiente. Hay que cambiarlas por las de cruce (art. 30.1): al acercarse un usuario de frente (coche, bici, peatón) y en todo caso si te hace ráfagas porque lo deslumbras, ante un tranvía o un barco cuyo conductor podría deslumbrarse, cuando sigues a un vehículo a **menos de 50 m** (salvo para adelantar), y si el alumbrado de la calzada es continuo y permite ver a unos **100 m**. **Appel de phares** = alternar brevemente largas y cortas para avisar (sustituye a la bocina de noche, salvo peligro inminente).
- **Feux de position**: para ser visto **parado**, de noche o con visibilidad < 200 m: luces de posición delante y rojas detrás (en población, a veces basta la luz de estacionamiento del lado de la calzada). Solo son obligatorias si el alumbrado público no permite ver el vehículo a unos **100 m**. En marcha, nunca solas.
- **Feu de brouillard arrière**: si el coche lo tiene, **obligatorio** con niebla o nieve que reduzcan la visibilidad a **< 100 m** y con **lluvia fuerte**; prohibido en el resto de casos (deslumbra).
- **Feux de brouillard avant**: opcionales, solo con niebla, nieve o lluvia fuerte; pueden sustituir a las de cruce o de carretera en esas condiciones, o sumarse a ellas.
- **Feux de détresse** (4 intermitentes, art. 32bis): solo con el vehículo averiado (o tras un accidente), en el transporte escolar que deja subir o bajar a niños, y para avisar de un riesgo de accidente inminente (por ejemplo, al llegar al final de un atasco). Nunca para justificar una doble fila.
- **Feux stop**, **feu de recul** (blanco, marcha atrás), **feu de plaque** (ilumina la matrícula), **catadioptres** (reflectantes rojos atrás).
- **Ciclistas** de noche o con visibilidad < 200 m: luz blanca/amarilla delante, roja detrás; reflectantes.

Un vehículo con una sola luz de cruce funcionando, de noche, parece una moto: revisa las bombillas. Las luces delanteras deben estar bien reguladas (el reglaje se baja con el coche cargado).`,
      },
      {
        id: 'ch14-nuit',
        title: { fr: 'Conduire de nuit', es: 'Conducir de noche' },
        body: `De noche se ve menos y más tarde: con cortas ves unos 50 m, y los peatones y ciclistas sin reflectantes aparecen a 25–30 m. Para poder parar en lo que ves, en carretera sin alumbrado hay que bajar claramente la velocidad (a 50 km/h ya necesitas unos 40 m; ver capítulo 8). Al cruzarte: mira al borde derecho, no a los faros. Ante deslumbramiento: reduce, no frenes en seco. Tras una larga conducción nocturna, el riesgo de somnolencia es máximo entre las 2 y las 5. Limpia los cristales por dentro y por fuera (la suciedad multiplica el deslumbramiento); no conduzcas con gafas tintadas de noche.`,
      },
      {
        id: 'ch14-meteo',
        title: { fr: 'Pluie, brouillard, neige, verglas, vent', es: 'Lluvia, niebla, nieve, hielo, viento' },
        body: `### Lluvia
Luces de cruce (y antiniebla trasera si es fuerte), distancia de seguridad duplicada, velocidad reducida. Las **primeras gotas** tras días secos son las más peligrosas (aceite + polvo). **Aquaplaning**: a partir de ~80 km/h sobre una lámina de agua los neumáticos pierden contacto; síntomas: volante ligero, motor que sube de vueltas. Qué hacer: **no frenar, no girar**, levantar el pie suavemente y mantener la dirección hasta recuperar agarre. Neumáticos con buen dibujo y presión correcta lo previenen.

### Niebla
Cortas (nunca largas: se reflejan) y antiniebla trasera si < 100 m. Velocidad según lo que ves: debes poder parar en la distancia visible. No pegarse a las luces del de delante. Ventanillas desempañadas.

### Nieve y hielo («verglas»)
Todo suave: acelerar, frenar y girar progresivamente; marcha larga para arrancar; freno motor; distancia ×5–10. **Zonas de riesgo**: puentes y viaductos (se hielan antes), zonas de sombra, bosques, salidas de túnel, tramos con viento. A temperatura cercana a 0 °C con lluvia: «pluie verglaçante», la más traicionera. Neumáticos de invierno o 4 estaciones recomendados por debajo de 7 °C; las cadenas solo se permiten con **nieve o hielo** en la calzada (art. 81.4.4), nunca en asfalto limpio; los neumáticos con clavos están prohibidos salvo autorización excepcional. Antes de salir, deshelar completamente parabrisas, ventanillas, luces y espejos y quitar la nieve del techo (se desprende y ciega al de detrás).

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
        body: `Reglas del peatón (art. 42): usar la acera (o las partes D9, D10, D11) o, si no hay, el accotement; si tiene que ir por la calzada, pegado al borde **izquierdo** (de frente al tráfico), salvo si es más seguro el derecho; cruzar por el **paso** si hay uno a menos de unos **20 m**, en perpendicular y sin demorarse; con semáforo, solo en verde (puede terminar de cruzar si el semáforo cambia mientras cruza); los grupos guiados pueden ir por la calzada (por la derecha; de 5 o más con guía, también por la izquierda en fila india).

Deberes del conductor: ceder en los pasos al peatón que cruza o **se dispone a cruzar**; moderar la velocidad al acercarse a un paso; no adelantar al vehículo que se acerca a un paso o se detiene ante él; al girar, ceder a los peatones que cruzan la calle en la que entras; dejar **1 m** de distancia lateral a un peatón que va por la calzada (**1,5 m** fuera de población) o pasar al paso; en zonas residenciales y peatonales, no ponerlos en peligro ni estorbarlos y parar si hace falta; con **niños** (impredecibles, no ven por encima de los coches aparcados), **mayores** (lentos, oyen y ven peor) y personas con discapacidad (silla, bastón **blanco o amarillo** = persona ciega o con baja visión, perro guía): redoblar la prudencia, reducir y parar si hace falta (art. 40.2). Un peatón fuera del paso cede el paso, pero nunca puedes ponerlo en peligro.`,
      },
      {
        id: 'ch15-cyclistes',
        title: { fr: 'Les cyclistes', es: 'Los ciclistas' },
        body: `Reglas del ciclista que conviene conocer: usa la **piste cyclable** si existe y es practicable (D7 o dos líneas discontinuas); si no, la calzada por la derecha (o el accotement de plain-pied; fuera de población, también la acera; los niños de **menos de 10 años** pueden ir siempre por la acera); puede ir **de dos en fondo** salvo si impide el cruce y, fuera de población, debe ponerse en fila cuando llega un vehículo por detrás; puede ir a contramano en los **SUL**; puede usar **B22/B23** para pasar en rojo cediendo; en una **zone cyclable** puede ocupar toda la calzada (o la mitad derecha si es de doble sentido); no está obligado a usar el casco (recomendado) ni a señalar con el brazo si es peligroso; de noche, luces y reflectantes; un remolque de bici puede llevar 2 niños como máximo; no puede llevar pasajero sin asiento adecuado.

Deberes del conductor: **1 m** (población) / **1,5 m** (fuera) al adelantar; no adelantar en zone cyclable y no intentarlo dentro de una rotonda; ceder a los que van recto cuando giras; mirar el ángulo muerto derecho antes de girar a la derecha; no estacionar ni parar en la piste cyclable; abrir la puerta con la mano contraria («poignée hollandaise»); en rotonda, ceder al salir a los de la pista ciclable; contar con ciclistas de frente en los SUL. Las **bicicletas eléctricas** (≤ 25 km/h) son ciclos; las **speed pedelecs** (≤ 45 km/h, matrícula, permiso AM, casco de ciclomotor o de bici) son ciclomotores y siguen en general las reglas de los de clase B, con algunas propias (por ejemplo, en una zone cyclable se asimilan a los ciclistas).`,
      },
      {
        id: 'ch15-motos',
        title: { fr: 'Motards, cyclomoteurs, trottinettes', es: 'Motoristas, ciclomotores, patinetes' },
        body: `### Motoristas
Son estrechos y rápidos: difíciles de ver en el retrovisor y de estimar su velocidad. Mira dos veces antes de girar a la izquierda o cambiar de carril; déjales espacio al adelantar (el viento los desplaza); pueden circular **entre las filas** en atascos a máximo 50 km/h y con 20 km/h de diferencia; pueden usar la bande bus si la placa lo permite. Casco obligatorio para moto y ciclomotor.

### Ciclomotores
Clase **A** (≤ 25 km/h): como la bici, deben usar la piste cyclable si existe. Clase **B** (≤ 45 km/h, permiso AM, matrícula): donde el límite es de 50 km/h o menos, **pueden** usar la piste cyclable (D7 o marcas) sin poner en peligro a nadie; donde el límite es mayor, **deben** usarla si existe (art. 9.1.2); las placas M6 / M7 bajo D7 lo imponen o lo prohíben. Prohibidos en autopista y route pour automobiles.

### Patinetes eléctricos y otros «engins de déplacement motorisés»
Máximo 25 km/h por construcción; mínimo **16 años** (salvo zonas residenciales, de encuentro, peatonales, chemins réservés y rue réservée au jeu); se asimilan a **ciclistas**: calzada o piste cyclable, **nunca la acera** (se empujan a pie si hay que ir por ella), sin pasajero, sin estacionar donde estorben (plazas reservadas con placas M21–M24), luces y reflectantes de noche. **Casco obligatorio** (de bici o de ciclomotor) si el aparato puede superar los **20 km/h** por construcción (art. 36). El alcohol y las drogas se sancionan igual que al volante.`,
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

Importes de la «perception immédiate» desde el 1 de julio de 2026 (antes: 58 / 116 / 174 / 474 €):

- **1.er grado** (64 €): faltas leves: no señalar, estacionar mal sin peligro, no llevar documentos…
- **2.º grado** (128 €): poner en peligro indirecto: no respetar un B1, estacionar en un paso de peatones, cinturón, no respetar la distancia de seguridad…
- **3.er grado** (191 €): peligro directo: saltarse un **rojo** o un **STOP**, adelantar donde está prohibido, no ceder a un peatón, circular por la bande bus, **teléfono en la mano**…
- **4.º grado** (520 €; normalmente tribunal y **déchéance**): marcha atrás, demi-tour o contramano en **autopista**, adelantar en paso a nivel, ignorar las barreras o luces de un paso a nivel…

Además: **alcohol/drogas** (categorías propias), **exceso de velocidad** (tarifa propia), **délit de fuite**, conducir sin seguro, sin ITV o sin permiso válido.`,
      },
      {
        id: 'ch16-vitesse',
        title: { fr: 'Les excès de vitesse', es: 'Los excesos de velocidad' },
        body: `Se aplica un **margen técnico** (6 km/h hasta 100 km/h, 6 % por encima) antes de contar el exceso. Luego:

Importes desde el 1 de julio de 2026:

- En **población, zona 30, abords d'école, zona residencial o de encuentro**: los primeros 10 km/h de exceso, 58 €; cada km/h adicional, +12 €. Por encima de **+30 km/h** ya no hay multa inmediata: **fiscal y tribunal**, con posible déchéance.
- En el resto (carretera, autopista): primeros 10 km/h, 58 €; +7 € por km/h adicional; por encima de **+40 km/h**, fiscal y tribunal.
- En esos grandes excesos (+30 en población / +40 fuera) también es posible la **retirada inmediata** del permiso.

Radares: fijos, móviles, «lidar» y de tramo («trajet»); las cámaras de semáforo multan rojo y velocidad. Puede haber radares sin señalar. Un conductor **novel** (< 2 años) condenado por una infracción grave puede tener que repetir el práctico y/o el teórico.`,
      },
      {
        id: 'ch16-retrait',
        title: { fr: 'Retrait, déchéance et récidive', es: 'Retirada, inhabilitación y reincidencia' },
        body: `- **«Retrait immédiat du permis»**: medida del fiscal («procureur du Roi») tomada en el momento: alcohol ≥ 0,8 g/l, drogas, teléfono en la mano (desde febrero de 2026), grandes excesos de velocidad, délit de fuite, accidente grave. Dura 15 días (prorrogable); se recupera y luego juzga el tribunal.
- **«Déchéance du droit de conduire»**: pena del tribunal, de 8 días a 5 años (o definitiva). Puede condicionarse a aprobar de nuevo el teórico, el práctico, exámenes médicos y psicológicos, o a instalar un **«éthylotest antidémarrage»**. Durante la déchéance, conducir es un delito grave.
- **Reincidencia**: repetir en 3 años una infracción grave (4.º grado, alcohol ≥ 0,8, grandes excesos, délit de fuite) obliga al juez a déchéance larga y a los cuatro exámenes de reintegración.
- **Fin de semana**: el juez puede ordenar que la déchéance se cumpla solo los fines de semana y festivos, para permitir trabajar.
- **Conductores noveles**: con menos de 2 años de permiso, una condena por ciertas infracciones graves conlleva déchéance y la obligación de repetir exámenes.
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
