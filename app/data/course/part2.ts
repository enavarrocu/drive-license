import type { CourseChapter } from './types'

export const part2: CourseChapter[] = [
  /* ===================================================================== */
  {
    id: 'ch06-marques',
    number: 6,
    title: { fr: 'Les marques routières', es: 'Las marcas viales' },
    theme: 'signaux',
    intro: 'Líneas, flechas, zonas rayadas y pictogramas pintados en la calzada: qué se puede cruzar y qué no.',
    sections: [
      {
        id: 'ch06-lignes',
        title: { fr: 'Lignes longitudinales', es: 'Líneas longitudinales' },
        body: `- **«Ligne blanche continue»**: prohibido cruzarla (art. 72.2) y, si separa los sentidos, circular a su izquierda; también para adelantar a un vehículo lento: si no cabes sin pisarla, esperas. Dos líneas continuas = idem.
- **«Ligne blanche discontinue»**: solo se cruza para adelantar, girar a la izquierda, dar media vuelta o cambiar de carril. Si los trazos se vuelven **cortos y próximos**, anuncian una línea continua.
- **Línea continua junto a discontinua**: vale la que está **de tu lado**; quien la cruzó para adelantar puede volver a cruzarla para recuperar su sitio.
- **Línea del borde**: una línea continua normal marca el borde real de la calzada. Una línea continua **ancha** marca un borde «fictif»: lo que queda más allá es una banda para parar y estacionar, salvo en autopista y route pour automobiles (allí es la «bande d'arrêt d'urgence», solo para emergencias).
- **Línea amarilla discontinua** en el borde o el bordillo: **estacionamiento prohibido** a lo largo de esa línea (la parada sí).
- Las marcas **naranjas** (líneas o clavos) son provisionales, por obras: anulan las blancas del mismo lugar.
- **Bandas de un color** (rojo, ocre) o **chevrons** en el borde: «bande cyclable suggérée», no reservada pero aviso de ciclistas.
- Dos líneas **discontinuas paralelas** cerca del borde = «piste cyclable»: reservada a ciclos; se cruza para girar o estacionar cediendo el paso, nunca se circula por ella.`,
      },
      {
        id: 'ch06-transversales',
        title: { fr: 'Lignes transversales et flèches', es: 'Líneas transversales y flechas' },
        body: `- **«Ligne d'arrêt»**: línea blanca continua ancha, perpendicular: donde hay que detenerse (STOP, semáforo rojo, agente).
- **Fila de triángulos blancos** apuntando hacia ti: equivale al **B1**, «céder le passage».
- **«Passage pour piétons»**: bandas blancas paralelas al eje de la calzada. **«Passage pour cyclistes»**: dos filas de cuadrados blancos.
- **«Flèches de sélection»** (flechas en el carril antes de un cruce): obligan a seguir la dirección indicada al llegar al cruce; se puede cambiar de carril antes mientras la línea sea discontinua.
- **«Flèches de rabattement»** (flechas oblicuas sobre la línea discontinua): anuncian que se reduce el número de carriles utilizables en tu sentido (por ejemplo, el fin de la zona de adelantamiento): vuelve a la derecha antes de la línea continua.
- Pictogramas: bicicleta (carril o paso ciclista), «BUS» (carril bus), «30» (zona 30), bebé/silla de ruedas (plaza reservada), rayos (recarga eléctrica).`,
      },
      {
        id: 'ch06-zones',
        title: { fr: 'Zones et marquages particuliers', es: 'Zonas y marcas particulares' },
        body: `- **«Zone d'évitement»** e **«îlot directionnel»** marcados (rayas oblicuas paralelas blancas): prohibido circular, parar y estacionar encima; canalizan el tráfico antes de una isleta o un estrechamiento.
- **«Damier»** (ajedrezado de cuadrados blancos): delimita un site spécial franchissable o un carril bus, o un paso a nivel; prohibido parar y estacionar encima.
- **Cruces**: aunque el semáforo esté en verde, no entres si te vas a quedar inmovilizado dentro (art. 14.2).
- **Plazas de estacionamiento** delimitadas en blanco: estacionar dentro de las marcas, en el sentido indicado. **Pictograma de silla de ruedas** = reservado a titulares de la tarjeta de aparcamiento para personas con discapacidad (prohibido para el resto). Pictograma de bici o patinete = reservado a esos vehículos.
- **«Dispositifs surélevés»** (lomos, «coussins berlinois», plateaux): anunciados con A14 (y F87 en el propio resalto); pasar a 30 km/h como máximo; prohibido adelantar encima y, salvo señalización local, parar o estacionar encima.`,
      },
    ],
  },

  /* ===================================================================== */
  {
    id: 'ch07-place',
    number: 7,
    title: { fr: 'La place sur la chaussée', es: 'La posición en la calzada' },
    theme: 'manoeuvres',
    intro: 'Dónde circular, cómo usar los carriles, las filas, los carriles bus, el sentido único y las zonas especiales.',
    sections: [
      {
        id: 'ch07-droite',
        title: { fr: 'Tenir sa droite', es: 'Circular por la derecha' },
        body: `Regla básica: circula lo más **a la derecha** posible, sin pisar aceras, arcenes ni pistas ciclables, dejando espacio a quien te adelanta. Puedes apartarte de la derecha para adelantar, girar a la izquierda, evitar un obstáculo, o si la vía de dos carriles por sentido está **en población** y eliges carril según destino.

En una calzada con **dos sentidos y sin marcas**, imagina el eje y no lo invadas salvo para adelantar con visibilidad. Con un obstáculo en tu lado, cedes tú al que viene de frente (art. 15.2; B19/B21 lo regulan en pasos estrechos). En **cuestas estrechas**, por costumbre cede el que baja.

En una calzada de **tres carriles** y dos sentidos (sin marcas de sentido), el carril central se usa solo para adelantar; el de la izquierda nunca. Con **cuatro o más** carriles, no se usan los de la mitad izquierda (salvo señalización).`,
      },
      {
        id: 'ch07-bandes',
        title: { fr: 'Bandes de circulation, files, tirette', es: 'Carriles, filas, cremallera' },
        body: `- **Cambio de carril**: espejos, ángulo muerto, intermitente, con antelación y sin obligar a frenar a nadie. El que cambia de carril cede el paso.
- **«Circulation en files»** (tráfico denso en varias filas): cada fila avanza a su ritmo; está permitido que tu fila vaya más rápido que la de la izquierda (adelantar por la derecha), pero no cambiar de fila para ganar posiciones.
- **«Tirette»** (cremallera, art. 12bis): cuando el tráfico va muy lento y un carril se cierra, los conductores del carril que termina **se incorporan justo antes del estrechamiento**, y los del carril que continúa les ceden el paso alternando uno a uno. Incorporarse así no es una maniobra (no cedes a todos); no dejar hueco es infracción.
- **«Bande d'accélération» / «de décélération»**: para entrar/salir de autopistas y vías rápidas; se usa toda su longitud.
- **«Bande bus»** (F17, una o dos líneas anchas discontinuas o un damier, «BUS» pintado): reservada al transporte público y a los usuarios indicados en la señal (taxi, bici, moto…). Los demás solo pueden usarla para rodear un obstáculo o para girar justo antes de un cruce, y cruzarla en el cruce o para entrar o salir de una propiedad o de un aparcamiento. **«Site spécial franchissable»** (F18, líneas anchas continuas o damier): parecido, para el transporte público (bus y tram); los demás lo cruzan en los cruces o para entrar o salir de una propiedad, o lo usan para rodear un obstáculo.
- **Carriles con semáforos de carril**: cruz roja = carril cerrado.`,
      },
      {
        id: 'ch07-sens-unique',
        title: { fr: 'Sens unique, SUL, rues particulières', es: 'Sentido único, SUL, calles particulares' },
        body: `- **«Sens unique»** (F19 a la entrada, C1 al otro extremo): se puede circular por cualquier carril y **estacionar a ambos lados** (si no hay señal en contra). Para girar a la izquierda, colócate en el carril izquierdo.
- **«SUL» (sens unique limité)**: **F19 con la placa M4** a la entrada y **C1 con la placa M2** («excepté» bicicletas) al otro extremo: los ciclistas (con M5 / M3, también los ciclomotores clase A) circulan en **ambos sentidos**. Cuenta con un ciclista de frente al girar, al abrir la puerta y al adelantar.
- **«Zone cyclable» / «rue cyclable»** (F111 → F113): **30 km/h** como máximo; el ciclista puede usar toda la calzada si es de sentido único o la mitad derecha si es de doble sentido, y los vehículos a motor tienen **prohibido adelantarlo** (art. 22novies).
- **«Rue réservée au jeu»** (barrera con señal C3 + «rue réservée au jeu»): temporal, solo residentes, vehículos prioritarios y autorizados, y ciclistas, a paso de persona. La **«rue scolaire»** (C3 + «rue scolaire») funciona igual junto a una escuela.
- **«Chemin réservé»** (F99a/b/c): reservado a los usuarios dibujados (peatones, bicis, jinetes, speed pedelecs; con F99c, también vehículos agrícolas); 30 km/h como máximo.`,
      },
      {
        id: 'ch07-zones',
        title: { fr: 'Zones 30, résidentielles, de rencontre, piétonnes', es: 'Zonas 30, residenciales, de encuentro, peatonales' },
        body: `- **Zone 30** (F4a → F4b) y **«abords d'école»** (F4a con A23 → F4b): 30 km/h en toda la zona; suele haber lomos y prioridad de la derecha. En Bruselas, 30 es ya la regla general en población.
- **«Zone résidentielle»** (F12a → F12b) y **«zone de rencontre»**: **20 km/h**; los peatones pueden usar toda la anchura de la vía y jugar, pero no estorbar sin necesidad; los conductores no deben ponerlos en peligro ni estorbarlos y, si hace falta, se detienen; estacionamiento solo en plazas marcadas con «P» o donde una señal lo permita (a derecha o izquierda).
- **«Zone piétonne»** (F103 → F105): solo peatones. Vehículos autorizados por la placa (residentes, reparto en horario, bicis si se indica) **a paso de persona**, cediendo a los peatones, sin estacionar. Los ciclistas solo si la señal lo permite y a paso, bajando de la bici si hay aglomeración.
- **«Zone de stationnement»** (E9 + «zone»): regla de estacionamiento válida en toda la zona.
- Para el examen, retén: 30 = zona 30 / entorno escolar / rue cyclable; 20 = residencial / de encuentro; paso de persona = peatonal.`,
      },
    ],
  },

  /* ===================================================================== */
  {
    id: 'ch08-vitesse',
    number: 8,
    title: { fr: 'Vitesse, distances et freinage', es: 'Velocidad, distancias y frenado' },
    theme: 'vitesse',
    intro: 'Los límites por región, la velocidad adecuada, la distancia de seguridad y las distancias de detención. Tema de falta grave: hay que saberlo de memoria.',
    sections: [
      {
        id: 'ch08-limites',
        title: { fr: 'Les limitations générales', es: 'Los límites generales' },
        body: `| Lugar | Valonia | Flandes | Bruselas |
|---|---|---|---|
| «En agglomération» (F1a–F3a) | 50 | 50 | **30** (50 o 70 solo con señal C43) |
| «Hors agglomération», carretera ordinaria | **90** | **70** (90 solo con señal) | 70 |
| Carretera 2×2 carriles con los sentidos separados por algo más que marcas (mediana, «terre-plein») | 120 | 120 | 120 |
| «Autoroute» | 120 (mín. **70**) | 120 (mín. 70) | 120 (mín. 70) |
| Zone 30 / abords d'école | 30 | 30 | 30 |
| Zone résidentielle / de rencontre | 20 | 20 | 20 |
| Zone piétonne | paso de persona | paso | paso |
| Rue cyclable | 30 | 30 | 30 |

Otros límites: **C43** indica un máximo hasta el próximo cruce inclusive (o hasta otra C43, C45 o una señal de inicio/fin de población o de zona); con validez de «zone», hasta el fin de zona. Vehículos y conjuntos de MMA > 3,5 t: **90** en autopista y en las 2×2 separadas; fuera de esas vías, los de más de 7,5 t: 60. Ciclomotores clase B: 45; clase A: 25. Los neumáticos con clavos están prohibidos salvo autorización ministerial excepcional. Un **conductor novel** no tiene límites distintos en Bélgica.

Trampas típicas: la señal F1a (entrada en población) **no** lleva número: implica el límite de la región. Un panel «50» en Bruselas levanta el 30 **solo hasta el siguiente cruce** si no es de zona. La zona 30 termina en la señal **F4b**.`,
      },
      {
        id: 'ch08-adaptee',
        title: { fr: 'La vitesse adaptée', es: 'La velocidad adecuada' },
        body: `El límite es un **máximo**, nunca un objetivo. El código obliga a regular la velocidad según el estado de la vía, el tráfico, la visibilidad, el tiempo y la carga, y a poder **detenerse dentro de la distancia visible libre** («distance de visibilité»). De noche con luces de cruce ves unos 50 m: a 50 km/h necesitas unos 40 m para parar, pero a 70 km/h ya unos 70 m: más de lo que ves.

Reduce especialmente: ante peatones y ciclistas, cerca de escuelas y paradas, en curvas y cambios de rasante, con lluvia, niebla, hielo o viento, en estrechamientos y obras, y al cruzarte con un vehículo en vías estrechas.

Circular **anormalmente despacio** sin motivo (y estorbar) también es infracción; en autopista hay mínimo de 70.`,
      },
      {
        id: 'ch08-securite',
        title: { fr: 'La distance de sécurité', es: 'La distancia de seguridad' },
        body: `Hay que dejar con el vehículo precedente una distancia que permita evitar el choque si frena bruscamente. Regla práctica: **2 segundos** (elige un punto fijo; cuando el de delante lo pasa, cuenta «mil uno, mil dos»; si lo pasas antes, estás demasiado cerca). Con lluvia o de noche, 3–4 segundos. En algunas autopistas, unos **chevrons** blancos pintados en el carril ayudan a medir la distancia. En metros: a 50 km/h ≈ **28 m**, a 90 ≈ 50 m, a 120 ≈ **66 m**.

Obligaciones específicas (art. 18): fuera de población, los vehículos y conjuntos de más de **7,5 t** o de más de **7 m** de largo deben dejar entre ellos al menos **50 m**; en los puentes, los de más de 7,5 t, al menos **15 m**. No frenar bruscamente sin necesidad («freinage brusque»), ni pegarse al de delante para forzarle («talonner»): infracción y, en autopista, causa de los accidentes en cadena.`,
      },
      {
        id: 'ch08-arret',
        title: { fr: "Distance d'arrêt et freinage", es: 'Distancia de detención y frenado' },
        body: `**Distance d'arrêt = distance de réaction + distance de freinage.**

- **Reacción**: ~1 s (más con alcohol, fatiga, teléfono). Metros ≈ velocidad × 0,3: a 50 → 15 m, a 90 → 27 m, a 120 → 36 m.
- **Frenado en seco** ≈ (velocidad/10)²: a 50 → 25 m, a 90 → 81 m, a 120 → 144 m. Se multiplica por **4** si la velocidad se dobla; en mojado se **dobla**; con hielo, ×10.
- **Totales** (seco): 50 km/h ≈ **40 m**, 90 ≈ 108 m, 120 ≈ 180 m.

### Frenar bien
Con **ABS**: pisa a fondo y mantén; el pedal vibra, es normal; sigue pudiendo girar para esquivar. Sin ABS: frena fuerte y suelta un poco si se bloquean las ruedas. En bajada larga, usa el **freno motor** (marcha corta) para no sobrecalentar los frenos («fading»). Con remolque, nunca frenar en curva. Si el freno falla: freno motor, freno de mano progresivo, buscar una salida.`,
      },
    ],
  },

  /* ===================================================================== */
  {
    id: 'ch09-priorite',
    number: 9,
    title: { fr: 'La priorité', es: 'La prioridad' },
    theme: 'priorite',
    intro: 'El tema que más faltas graves genera. Dominar la prioridad de la derecha, las señales B, las maniobras, las rotondas, los tranvías y los vehículos prioritarios.',
    sections: [
      {
        id: 'ch09-droite',
        title: { fr: 'La priorité de droite', es: 'La prioridad de la derecha' },
        body: `En todo **carrefour** sin semáforo ni señal de prioridad, cedes el paso al conductor que llega por tu **derecha**, venga de donde venga (calle grande o pequeña, aunque parezca secundaria).

Detalles que caen en el examen:
- El de la derecha **conserva** la prioridad aunque **se haya parado** o vaya muy despacio.
- La **pierde** si viene de un **«sens interdit»** (a contramano) o si sale de un **«chemin de terre»** o un **«sentier»** a una vía con calzada: entonces cede a todos (art. 12.3.1).
- No se aplica dentro de un **«rond-point»**, frente a un **tranvía** (todos le ceden, art. 12.1) ni frente a un **vehículo prioritario** con sirena.
- Quien sale de una **propiedad** (garaje, propiedad privada, estación de servicio, aparcamiento) **cede a todos**: es una maniobra, no un cruce.
- Quien realiza una **maniobra** (marcha atrás, demi-tour, cambio de carril, salir de un aparcamiento en batería) cede a todos.
- El que **gira a la izquierda** cede a los que vienen de frente (recto o girando a la derecha).
- Ceder el paso = no obligar al otro a frenar ni a desviarse; no basta con «pasar rápido».`,
      },
      {
        id: 'ch09-signaux',
        title: { fr: 'Les signaux de priorité', es: 'Las señales de prioridad' },
        body: `- **B1** (triángulo invertido): cede el paso. Marcas en el suelo: triángulos blancos.
- **B5** (STOP): detente del todo en la línea y cede. Marca: línea ancha continua.
- **B9** (rombo amarillo): vía prioritaria hasta **B11**. En los cruces laterales hay B1 o B5.
- **B15** (flecha gruesa): prioridad en el próximo cruce solamente. **B17** (cruz negra en X): prioridad de la derecha en el próximo cruce (se pone para avisar tras una serie de cruces prioritarios).
- **B19** (borde rojo, flecha negra abajo y roja arriba): cedes en el paso estrecho. **B21** (azul, flecha roja abajo y blanca arriba): tienes prioridad. La flecha de tu sentido (hacia arriba) te dice si cedes (roja) o pasas (blanca).
- **B22 / B23**: solo para ciclistas (girar a la derecha / recto en rojo).
- Combinaciones: un B1, B5, B15 o B9 con **placa de esquema** (líneas gruesas/finas) muestra el trazado de la vía prioritaria en un cruce complejo. **B3** y **B7** anuncian un B1 o un B5 a la distancia indicada.

Con semáforo verde o una señal B9/B15, sigues teniendo que ceder a peatones y ciclistas que cruzan la calle en la que giras y a los vehículos prioritarios.`,
      },
      {
        id: 'ch09-rondpoint',
        title: { fr: 'Les ronds-points', es: 'Las rotondas' },
        body: `Un **«rond-point»** (art. 2.39) es un anillo de sentido único alrededor de una isleta central, con **D5** y con **B1** (o B5) en cada entrada → **prioridad a los que están dentro**: la prioridad de la derecha no se aplica en el anillo. Un giratorio sin B1 ni B5 en las entradas no es un rond-point en sentido legal: vale la prioridad de la derecha (prioridad al que entra). Lee siempre las señales.

- **Entrar**: ceder a los del anillo, sin intermitente obligatorio (art. 19.2: entrar no se señala).
- **Dentro**: no se para ni se da marcha atrás. No estás obligado a ir pegado a la derecha: con dos carriles marcados, usa el que convenga a tu salida (el **exterior** para salir pronto; el **interior** para dar más vuelta, volviendo al exterior antes de la salida con intermitente y cediendo al que ya va por él).
- **Salir**: **intermitente derecho** obligatorio antes de la salida, cediendo a los **ciclistas** de la pista ciclable que rodea la rotonda y a los **peatones** del paso.
- Ciclistas: pueden circular por el centro del carril en rotondas pequeñas; no intentes adelantarlos dentro del anillo: quédate detrás.`,
      },
      {
        id: 'ch09-trams-prioritaires',
        title: { fr: 'Trams, bus et véhicules prioritaires', es: 'Tranvías, autobuses y vehículos prioritarios' },
        body: `### Tranvía
Todo usuario debe **cederle el paso** y apartarse de la vía en cuanto pueda (art. 12.1); donde hay semáforos, el tram respeta los suyos. No se aplica la prioridad de la derecha frente a él; hay que dejarle los raíles libres cuando se acerca. Cuando está parado en una parada **sin refugio** con viajeros subiendo o bajando, el conductor que circula por ese lado se detiene para dejarlos pasar y arranca después a velocidad moderada (art. 40.3.2). Su distancia de frenado es muy larga y no puede esquivar.

### Autobús
En población, un bus o trolebús que señala con el intermitente que sale de su parada tiene **prioridad para reincorporarse**: reduce y, si hace falta, para (art. 39). En parada sin refugio, los viajeros cruzan la calzada: espera. Un vehículo de transporte escolar con todos los intermitentes encendidos: niños subiendo o bajando, reduce mucho y para si hace falta (art. 39bis).

### Vehículos prioritarios
Policía, bomberos, ambulancia, protección civil, con **luz azul + sirena** («avertisseur sonore spécial»): en cuanto oyes la sirena, despejas y cedes el paso, parando si hace falta (art. 38); en autopista y en los atascos formas el «couloir de secours» (pasillo de emergencia: carril izquierdo a la izquierda, los demás a la derecha). Con **solo luz azul** (sin sirena): no tienen prioridad, pero avisan de un peligro. Luz **naranja** giratoria (grúa, obras, vehículos lentos): no da prioridad, solo señala.

### Convoyes y columnas
No se corta una columna militar, un cortejo (también fúnebre), una procesión, una carrera ciclista ni un grupo de niños en fila o cruzando con un guía o un «surveillant habilité» (art. 40bis y 41); se esperan. Ante el coche que abre una carrera ciclista con bandera roja, te apartas y paras hasta que pase el de cierre con bandera verde.`,
      },
      {
        id: 'ch09-usagers',
        title: { fr: 'Piétons et cyclistes aux carrefours', es: 'Peatones y ciclistas en los cruces' },
        body: `- En un **paso de peatones** (sin semáforo ni agente): ceder al peatón que cruza o que **se dispone a cruzar**; acercarse a velocidad moderada; prohibido adelantar al vehículo que se acerca al paso o se detiene ante él. Con semáforo, deja terminar de cruzar al peatón que ya había empezado.
- Al **girar** (izquierda o derecha): ceder a peatones y ciclistas que cruzan la calle en la que entras, con o sin semáforo, y a los ciclistas que siguen recto por la piste cyclable paralela.
- Ciclistas que llegan por la derecha en un cruce sin señales: prioridad de la derecha para ellos igual que para un coche.
- **Ciclistas en SUL**: vienen a contramano: mira a ambos lados antes de girar desde o hacia un sentido único.
- Un peatón que cruza **fuera** de un paso cede el paso, pero el conductor sigue obligado a no ponerlo en peligro.`,
      },
    ],
  },

  /* ===================================================================== */
  {
    id: 'ch10-depassement',
    number: 10,
    title: { fr: 'Dépassement et croisement', es: 'Adelantamiento y cruce' },
    theme: 'depassement',
    intro: 'Por dónde, cuándo está prohibido, las reglas con tranvías, ciclistas y vehículos lentos, y cómo cruzarse en vías estrechas. Tema de falta grave.',
    sections: [
      {
        id: 'ch10-comment',
        title: { fr: 'Comment dépasser', es: 'Cómo adelantar' },
        body: `Por la **izquierda**, en cuatro tiempos: 1) comprobar: visibilidad suficiente, vía libre a suficiente distancia, nadie me adelanta (espejos y **ángulo muerto**), el de delante no señala giro a la izquierda; 2) **intermitente** izquierdo y salir con decisión; 3) pasar dejando distancia lateral (**1 m** a un ciclista en población, **1,5 m** fuera; más a una moto); 4) **intermitente derecho** y volver cuando veas el vehículo adelantado entero en el retrovisor interior, sin cerrarte. Nunca superes el límite de velocidad para adelantar.

Por la **derecha** solo en tres casos: para adelantar a un **tranvía** (salvo sentido único o espacio insuficiente), a un conductor que ha **señalado y se ha colocado a la izquierda** para girar, y en **circulación en filas**. Obligaciones del adelantado: no acelerar, apartarse a la derecha si es necesario.

A un vehículo **lento** (tractor, bici) con una línea continua: no se cruza la línea; se espera. A una columna de vehículos: solo si puedes adelantarla entera. A un vehículo que **ya está adelantando** a otro (que no sea una bici, un ciclomotor o una moto de dos ruedas): prohibido, salvo que haya tres carriles o más en tu sentido (art. 17.2.4°).`,
      },
      {
        id: 'ch10-interdit',
        title: { fr: 'Où le dépassement est interdit', es: 'Dónde está prohibido adelantar' },
        body: `Prohibido adelantar por la izquierda a un vehículo de tracción animal, a un vehículo a motor de dos ruedas (moto, ciclomotor) o a un vehículo de más de dos ruedas (art. 17.2):

- Cuando el vehículo que vas a adelantar **se acerca a un paso de peatones o de ciclistas** o se detiene ante él, si el paso no está regulado por semáforos ni por un agente.
- En un **cruce** donde se aplica la **prioridad de la derecha**, y en los demás cruces si eres tú quien debe ceder (B1, B5…). En una vía prioritaria (B9/B15) sí se puede.
- En un **paso a nivel** con cruz de San Andrés sin barreras ni semáforos.
- Al llegar a la **cima de una cuesta** y en las **curvas** si la visibilidad es insuficiente, salvo que puedas hacerlo sin cruzar la línea continua del sentido contrario.
- Sobre un **«dispositif surélevé»** (lomo, plateau).
- Con señal **C35** (o **C39** para camiones de más de 3,5 t): hasta el próximo cruce inclusive, o hasta C37 / C41 si aparecen antes. Una **línea continua** tampoco se puede cruzar para adelantar.
- Con **precipitaciones**, en autopista, route pour automobiles y vías de 4 carriles o más, para los vehículos de mercancías de más de **7,5 t**.
- En una **«zone cyclable»**, a los ciclistas (prohibido para los vehículos a motor, art. 22novies).
- Siempre que no veas a los que vienen de frente a una distancia suficiente (art. 17.1), o la maniobra les obligaría a frenar o desviarse.

A una **bicicleta** (o un patinete) sí se la puede adelantar en esos lugares si cabes sin invadir el sentido contrario y con la distancia lateral (1 m / 1,5 m).`,
      },
      {
        id: 'ch10-tram',
        title: { fr: 'Dépasser un tram', es: 'Adelantar a un tranvía' },
        body: `Se adelanta **por la derecha**, esté en marcha o parado (art. 16.9). Por la izquierda únicamente en calle de **sentido único** cuando la circulación lo justifique, o cuando a la derecha no hay espacio o hay un obstáculo, siempre sin molestar ni poner en peligro a los que vienen de frente. Cuando un tranvía (o un bus) está **parado en una parada sin refugio** y suben o bajan viajeros, el conductor que pasa por ese lado debe **detenerse** para dejarles subir o llegar a la acera, y arrancar después a velocidad moderada (art. 40.3.2); con refugio, se pasa moderando la velocidad.`,
      },
      {
        id: 'ch10-croisement',
        title: { fr: 'Le croisement', es: 'El cruce con vehículos de frente' },
        body: `Al cruzarte con un vehículo que viene en sentido contrario, mantente **a la derecha** y reduce si hace falta. En vías estrechas:

- Obstáculo en **tu** lado (coche aparcado, obras) o usuarios que te estorban: **tú** reduces y, si hace falta, paras para dejar pasar (art. 15.2).
- Si la calzada es demasiado estrecha, puedes usar el accotement de plain-pied sin poner en peligro a quien esté en él.
- Cuesta estrecha: por costumbre cede **el que baja** (salvo si el que sube está más cerca de un apartadero); el código belga no lo regula.
- Señales **B19** (cedes) / **B21** (prioridad) en pasos estrechos.
- Frente a un **tranvía**, déjale los raíles; si no cabes a la derecha, se le puede cruzar por la izquierda sin molestar a los que vienen de frente.

De noche, al cruzarte: luces de cruce, mirar al borde derecho de la calzada para no deslumbrarte.`,
      },
    ],
  },

  /* ===================================================================== */
  {
    id: 'ch11-manoeuvres',
    number: 11,
    title: { fr: 'Manœuvres et changements de direction', es: 'Maniobras y cambios de dirección' },
    theme: 'manoeuvres',
    intro: 'Girar, cambiar de sentido, marcha atrás, intermitentes, pasos a nivel y túneles.',
    sections: [
      {
        id: 'ch11-tourner',
        title: { fr: 'Tourner à droite et à gauche', es: 'Girar a la derecha y a la izquierda' },
        body: `### A la derecha
Intermitente con antelación, colocarse **lo más a la derecha** (sin invadir la pista ciclable), reducir, mirar el ángulo muerto derecho (ciclistas), ceder a peatones y ciclistas que van recto, tomar la curva **cerrada**.

### A la izquierda
Intermitente, colocarse **a la izquierda de tu sentido** (junto al eje; en sentido único, el carril izquierdo), ceder a los que vienen de frente (recto o girando a su derecha), a los ciclistas de la pista ciclable de la izquierda si la hay, y a los peatones; girar **amplio** para entrar por la derecha de la nueva calle.

### Reglas comunes
Toda maniobra (girar, cambiar de carril, salir de un aparcamiento, demi-tour, marcha atrás, abrir una puerta) obliga a **ceder el paso** a los demás y a **señalar**. Intermitente: antes de la maniobra, el tiempo suficiente, y apagarlo después. Las señales con el brazo solo si el intermitente no funciona.`,
      },
      {
        id: 'ch11-demi-tour',
        title: { fr: 'Demi-tour et marche arrière', es: 'Cambio de sentido y marcha atrás' },
        body: `**Demi-tour** (giro en U): solo si no estorba ni pone en peligro a nadie, con visibilidad. **Prohibido** en autopista y route pour automobiles, en rotondas, donde haya C33 (señal), sobre una línea continua, en túneles, en pasos a nivel y en lugares sin visibilidad (curvas, cuestas). Alternativa segura: dar la vuelta a la manzana.

**Marche arrière**: solo la distancia estrictamente necesaria, a paso lento, cediendo a todos, con visibilidad (girarse, no fiarse solo de la cámara). **Prohibida** en autopista y route pour automobiles (art. 21.4) y en las rotondas. Al salir marcha atrás de una plaza en batería, eres tú quien cede a todos.

**Abrir una puerta**: prohibido abrirla, dejarla abierta, subir o bajar sin asegurarse de que no hay peligro ni molestia para nadie, sobre todo peatones y ciclistas (art. 28).`,
      },
      {
        id: 'ch11-passage-niveau',
        title: { fr: 'Les passages à niveau', es: 'Los pasos a nivel' },
        body: `Anuncio: **A41** (con barreras, pictograma de valla) / **A43** (sin barreras, pictograma de locomotora) a unos 150 m, a menudo seguido de balizas con 3, 2 y 1 barras rojas oblicuas que marcan la distancia que queda. En el paso: **cruz de San Andrés** A45 (una vía) / A47 (varias vías).

Prohibido entrar en el paso cuando (art. 20.3): las barreras **se mueven o están cerradas**, las luces **rojas parpadean** o funciona la **señal sonora**. Sin barreras ni semáforos (o si no funcionan), solo se entra tras comprobar que no llega ningún tren. Luz **blanca intermitente** = paso autorizado, con prudencia. Nunca entres si no puedes **despejar** el paso inmediatamente; nunca zigzaguees entre medias barreras. Prohibido adelantar en pasos sin barreras ni semáforos; prohibido parar o estacionar sobre el paso a nivel.

Si te quedas **parado sobre las vías**: haz salir a los pasajeros, intenta mover el vehículo (arrancar en 1.ª a golpes de motor de arranque si es manual), y si no puedes, aléjate **en diagonal hacia el tren** (para evitar los restos proyectados) y llama al **112** y al número de la placa del paso.`,
      },
      {
        id: 'ch11-tunnels',
        title: { fr: 'Les tunnels', es: 'Los túneles' },
        body: `Señal **F8** (túnel de más de 500 m; una placa indica la longitud). Dentro: **luces de cruce** aunque esté iluminado (el código no lo dice expresamente, pero la vista tarda en adaptarse y hay que ser visto; las largas deslumbrarían), gafas de sol fuera, radio en la frecuencia indicada, distancia de seguridad aumentada (en los túneles largos hay marcas o señales de distancia), velocidad adaptada, no adelantar si es prohibido (C35, un carril por sentido). **Prohibido** parar o estacionar (art. 24), dar marcha atrás y cambiar de sentido; los vehículos con ciertas mercancías peligrosas no pueden entrar si una señal C24 lo indica.

**Avería**: luces de emergencia, apartarse en el «garage» (apartadero, F98), apagar el motor, llamar desde el teléfono de emergencia (F62, da tu posición exacta). **Incendio**: intenta salir del túnel si es posible; si no, para, apaga el motor, **deja las llaves puestas**, abandona el vehículo por la **salida de emergencia** más cercana (F52, pictograma verde; F52bis indica la distancia), nunca des media vuelta en coche. En atasco dentro del túnel: distancia con el de delante, luces encendidas, motor apagado si es largo.`,
      },
    ],
  },
]
