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
        body: `- **«Ligne blanche continue»**: prohibido cruzarla y circular sobre ella, también para adelantar a un vehículo lento: si no cabes sin pisarla, esperas. Dos líneas continuas = idem. Solo se puede cruzar para evitar un obstáculo imprevisto o entrar en una propiedad, con prudencia.
- **«Ligne blanche discontinue»**: se puede cruzar (para adelantar, girar, cambiar de carril). Si los trazos se vuelven **cortos y próximos**, anuncian una línea continua o separan un carril especial (bus, aceleración, deceleración).
- **Línea continua junto a discontinua**: vale la que está **más cerca** de tu lado.
- **«Ligne de bord» (línea del borde)**: continua ancha delimita la calzada del arcén de emergencia (autopista) o de un accotement; cruzarla solo para parar en emergencia.
- **Líneas amarillas discontinuas** en el borde: **estacionamiento prohibido** a lo largo de esa línea (la parada sí).
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
- **«Flèches de rabattement»** (flechas oblicuas en el centro): anuncian el fin de la zona de adelantamiento: vuelve a la derecha antes de la línea continua.
- Pictogramas: bicicleta (carril o paso ciclista), «BUS» (carril bus), «30» (zona 30), bebé/silla de ruedas (plaza reservada), rayos (recarga eléctrica).`,
      },
      {
        id: 'ch06-zones',
        title: { fr: 'Zones et marquages particuliers', es: 'Zonas y marcas particulares' },
        body: `- **«Zone d'évitement»** (rayas oblicuas paralelas entre dos líneas): prohibido circular, parar y estacionar; canaliza el tráfico antes de una isleta o un estrechamiento.
- **«Damier»** (ajedrezado blanco): zona reservada a bus/tram o de prohibición de estacionar; no se estaciona ni se para.
- **Cuadros rojos y blancos / «marquage en damier» de intersección** (Bruselas): «ne pas bloquer le carrefour»: no entres si no puedes salir.
- **Plazas de estacionamiento** delimitadas en blanco: estacionar dentro de las marcas, en el sentido indicado. **Azul** = zona azul (disco). **Pictograma de silla de ruedas** = reservado a titulares de la tarjeta de aparcamiento para PMR (está prohibido para el resto, con grúa).
- **«Dispositifs surélevés»** (lomos, «coussins berlinois», plateaux): anuncio con A14 y marcas en triángulos blancos; pasar a 30 km/h como máximo; prohibido parar o estacionar encima.
- Marcas **amarillas** temporales (obras) prevalecen sobre las blancas.`,
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

En una calzada con **dos sentidos y sin marcas**, imagina el eje y no lo invadas salvo para adelantar con visibilidad. En **cuestas estrechas**, cede el que baja. Con un obstáculo en tu lado, cedes tú al que viene de frente (B19/B21 lo señalan en pasos estrechos).

En una calzada de **tres carriles** y dos sentidos (sin marcas de sentido), el carril central se usa solo para adelantar; el de la izquierda nunca. Con **cuatro o más** carriles, no se usan los de la mitad izquierda (salvo señalización).`,
      },
      {
        id: 'ch07-bandes',
        title: { fr: 'Bandes de circulation, files, tirette', es: 'Carriles, filas, cremallera' },
        body: `- **Cambio de carril**: espejos, ángulo muerto, intermitente, con antelación y sin obligar a frenar a nadie. El que cambia de carril cede el paso.
- **«Circulation en files»** (tráfico denso en varias filas): cada fila avanza a su ritmo; está permitido que tu fila vaya más rápido que la de la izquierda (adelantar por la derecha), pero no cambiar de fila para ganar posiciones.
- **«Tirette»** (cremallera): cuando un carril se cierra, los conductores del carril que termina **se incorporan justo antes del estrechamiento**, alternando uno a uno con los del carril que continúa. Es obligatorio desde 2014; incorporarse demasiado pronto o no dejar hueco es infracción.
- **«Bande d'accélération» / «de décélération»**: para entrar/salir de autopistas y vías rápidas; se usa toda su longitud.
- **«Bande bus»** (F17, línea ancha discontinua, «BUS» pintado): reservada a bus y a los usuarios de la placa (taxi, bici, moto…). Los demás solo la cruzan para girar o entrar a una propiedad. **«Site spécial franchissable»** (F18): lo mismo, para bus y tram.
- **Carriles con semáforos de carril**: cruz roja = carril cerrado.`,
      },
      {
        id: 'ch07-sens-unique',
        title: { fr: 'Sens unique, SUL, rues particulières', es: 'Sentido único, SUL, calles particulares' },
        body: `- **«Sens unique»** (F19 a la entrada, C1 al otro extremo): se puede circular por cualquier carril y **estacionar a ambos lados** (si no hay señal en contra). Para girar a la izquierda, colócate en el carril izquierdo.
- **«SUL» (sens unique limité)**: F19 y C1 con placas **M4/M2** (bici «excepté»): los ciclistas (y a veces ciclomotores A o patinetes) circulan en **ambos sentidos**. Cuenta con un ciclista de frente al girar, al abrir la puerta y al adelantar.
- **«Rue cyclable»** (F111): vehículos a **30 km/h** máximo, los ciclistas pueden ocupar todo el carril (o toda la calzada en sentido único) y está **prohibido adelantarlos**.
- **«Rue réservée au jeu»** (barrera con señal C3 + «rue réservée au jeu»): temporal, solo residentes a paso de persona.
- **«Chemin réservé»** (F99a/b/c): reservado a los usuarios dibujados (peatones, bicis, caballos, tractores).`,
      },
      {
        id: 'ch07-zones',
        title: { fr: 'Zones 30, résidentielles, de rencontre, piétonnes', es: 'Zonas 30, residenciales, de encuentro, peatonales' },
        body: `- **Zone 30** (F4a → F4b) y **«abords d'école»** (A23 + 30): 30 km/h en toda la zona; suele haber lomos y prioridad de la derecha. En Bruselas, 30 es ya la regla general.
- **«Zone résidentielle»** (F12a → F12b) y **«zone de rencontre»**: **20 km/h**; los peatones pueden usar toda la calzada y jugar, pero no estorbar inútilmente; los conductores no deben ponerlos en peligro y ceden siempre; estacionamiento solo en plazas marcadas (con «P» o marcas); los juegos están permitidos.
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
| «En agglomération» (F1–F3) | 50 | 50 | **30** (50 o 70 solo con señal) |
| «Hors agglomération», carretera ordinaria | **90** | **70** | 70 |
| Carretera 2×2 carriles con mediana («berme centrale») | 120 | 120 | 120 |
| «Autoroute» | 120 (mín. **70**) | 120 (mín. 70) | 120 (mín. 70) |
| Zone 30 / abords d'école | 30 | 30 | 30 |
| Zone résidentielle / de rencontre | 20 | 20 | 20 |
| Zone piétonne | paso de persona | paso | paso |
| Rue cyclable | 30 | 30 | 30 |

Otros límites: **C43** indica un máximo hasta el próximo cruce o C45; placas con «zone» hasta el fin de zona. Vehículos con remolque de conjunto > 3,5 t y camiones > 7,5 t: **90** en autopista. Ciclomotores clase B: 45. Neumáticos con clavos: 90 en autopista, 60 en el resto. Un **conductor novel** no tiene límites distintos en Bélgica.

Trampas típicas: la señal F1 (entrada en población) **no** lleva número: implica el límite de la región. Un panel «50» en Bruselas levanta el 30 **solo hasta el siguiente cruce** si no es de zona. Al salir de una zona 30 sin señal de fin, el fin se deduce del F4b.`,
      },
      {
        id: 'ch08-adaptee',
        title: { fr: 'La vitesse adaptée', es: 'La velocidad adecuada' },
        body: `El límite es un **máximo**, nunca un objetivo. El código obliga a regular la velocidad según el estado de la vía, el tráfico, la visibilidad, el tiempo y la carga, y a poder **detenerse dentro de la distancia visible libre** («distance de visibilité»). De noche con luces de cruce ves unos 50 m: a más de 70 km/h ya no puedes parar en lo que ves.

Reduce especialmente: ante peatones y ciclistas, cerca de escuelas y paradas, en curvas y cambios de rasante, con lluvia, niebla, hielo o viento, en estrechamientos y obras, y al cruzarte con un vehículo en vías estrechas.

Circular **anormalmente despacio** sin motivo (y estorbar) también es infracción; en autopista hay mínimo de 70.`,
      },
      {
        id: 'ch08-securite',
        title: { fr: 'La distance de sécurité', es: 'La distancia de seguridad' },
        body: `Hay que dejar con el vehículo precedente una distancia que permita evitar el choque si frena bruscamente. Regla práctica: **2 segundos** (elige un punto fijo; cuando el de delante lo pasa, cuenta «mil uno, mil dos»; si lo pasas antes, estás demasiado cerca). Con lluvia o de noche, 3–4 segundos. En metros: a 50 km/h ≈ **28 m**, a 90 ≈ 50 m, a 120 ≈ **66 m**.

Obligaciones específicas: fuera de población, los vehículos y conjuntos de más de **7,5 t** deben dejar al menos **50 m**. No frenar bruscamente sin necesidad («freinage brusque»), ni pegarse al de delante para forzarle («talonner»): infracción y, en autopista, causa de los accidentes en cadena.`,
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
        body: `En todo **carrefour** sin semáforo ni señal de prioridad, cedes el paso al conductor que llega por tu **derecha**, venga de donde venga (calle grande o pequeña, vía privada abierta al público, aparcamiento). Se aplica incluso si la vía de la derecha es de tierra o parece secundaria.

Detalles que caen en el examen:
- El de la derecha **conserva** la prioridad aunque **se haya parado** o vaya muy despacio.
- La **pierde** si circula en **«sens interdit»** (a contramano).
- No se aplica frente a un **tranvía** (siempre prioritario) ni frente a un **vehículo prioritario** con sirena.
- Quien sale de un **lugar no público** (garaje, propiedad privada, estación de servicio, camino de tierra, aparcamiento privado) **cede a todos**: no es un cruce.
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
- Combinaciones: un B1 con **placa de esquema** (líneas gruesas/finas) muestra qué vías son prioritarias en un cruce complejo. Una señal de peligro «carrefour» (A) no da prioridad: anuncia un cruce donde se aplica la derecha.

Con semáforo verde o una señal B9/B15, sigues teniendo que ceder a peatones y ciclistas que cruzan la calle en la que giras y a los vehículos prioritarios.`,
      },
      {
        id: 'ch09-rondpoint',
        title: { fr: 'Les ronds-points', es: 'Las rotondas' },
        body: `Casi todas llevan **D5** (giratorio obligatorio) + **B1** en cada entrada → **prioridad a los que están dentro**. Sin B1 (raro), prioridad de la derecha (prioridad al que entra). Un «carrefour giratoire» con tráfico en el anillo y B1 también en el anillo (plazas antiguas) invierte la lógica: lee las señales.

- **Entrar**: ceder a los del anillo, sin intermitente obligatorio (en Bélgica no se señala la entrada).
- **Dentro**: no se para ni se da marcha atrás. Con dos carriles, el **exterior** para salir pronto; el **interior** para dar más vuelta, volviendo al exterior antes de la salida con intermitente, cediendo al que ya va por el exterior.
- **Salir**: **intermitente derecho** obligatorio antes de la salida, cediendo a los **ciclistas** de la pista ciclable que rodea la rotonda y a los **peatones** del paso.
- Ciclistas: pueden circular por el centro del carril en rotondas pequeñas; nunca se les adelanta dentro.`,
      },
      {
        id: 'ch09-trams-prioritaires',
        title: { fr: 'Trams, bus et véhicules prioritaires', es: 'Tranvías, autobuses y vehículos prioritarios' },
        body: `### Tranvía
Tiene **prioridad sobre todos** los usuarios, salvo señal contraria. No se aplica la prioridad de la derecha frente a él; hay que dejarle los raíles libres cuando se acerca; nunca se le adelanta en un cruce ni cuando está parado en una parada **sin refugio** con viajeros subiendo o bajando (se espera detrás). Su distancia de frenado es muy larga y no puede esquivar.

### Autobús
En población, un bus que sale de su parada con el intermitente tiene **prioridad para reincorporarse**: redúcete o para. En parada sin refugio, los viajeros cruzan la calzada: espera. Un bus escolar con las luces de emergencia: niños subiendo o bajando, prudencia máxima.

### Vehículos prioritarios
Policía, bomberos, ambulancia, protección civil, con **luz azul + sirena** («avertisseur sonore spécial»): tienen prioridad absoluta: te apartas, reduces o paras, incluso cruzando un semáforo en rojo con prudencia si hace falta para dejar paso; en autopista formas el «couloir de secours» (pasillo de emergencia: carril izquierdo a la izquierda, los demás a la derecha). Con **solo luz azul** (sin sirena): no tienen prioridad, pero avisan de un peligro. Luz **naranja** giratoria (grúa, obras, vehículos lentos): no da prioridad, solo señala.

### Convoyes y columnas
No se corta una columna militar, un cortejo fúnebre, un grupo de ciclistas en competición (señalado por motos) ni una fila de niños guiada; se esperan.`,
      },
      {
        id: 'ch09-usagers',
        title: { fr: 'Piétons et cyclistes aux carrefours', es: 'Peatones y ciclistas en los cruces' },
        body: `- En un **paso de peatones** (sin semáforo): ceder al peatón que cruza o que **se dispone a cruzar**; acercarse a velocidad moderada; prohibido adelantar al vehículo que se detiene ante el paso.
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

A un vehículo **lento** (tractor, bici) con una línea continua: no se cruza la línea; se espera. A una columna de vehículos: solo si puedes adelantarla entera. A un vehículo que **ya está adelantando**: prohibido (doble adelantamiento).`,
      },
      {
        id: 'ch10-interdit',
        title: { fr: 'Où le dépassement est interdit', es: 'Dónde está prohibido adelantar' },
        body: `Prohibido adelantar (vehículos de más de dos ruedas, por la izquierda):

- Al acercarse a un **paso de peatones o de ciclistas**, si hay que invadir el sentido contrario o si un vehículo se ha detenido ante el paso.
- En un **cruce** donde se aplica la **prioridad de la derecha** (salvo si estás en vía prioritaria B9/B15, o vas por un carril claramente separado).
- En un **paso a nivel** sin barreras ni semáforos.
- Al llegar a la **cima de una cuesta** y en las **curvas**, fuera de población, si la visibilidad es insuficiente.
- Donde una **línea continua** separe los sentidos, o con señal **C35** (hasta C37) / **C39** (camiones, hasta C41).
- En una **«rue cyclable»**, a ciclistas y ciclomotores.
- Con **lluvia** (precipitaciones), en autopista y vías 2×2, para vehículos de más de **7,5 t**.
- En túneles de un solo carril por sentido (habitualmente C35) y en estrechamientos.
- Cuando la maniobra obligaría a los que vienen de frente a frenar o desviarse.

Ciclistas y ciclomotores se pueden adelantar en muchos de estos lugares si es posible sin invadir el sentido contrario y con la distancia lateral.`,
      },
      {
        id: 'ch10-tram',
        title: { fr: 'Dépasser un tram', es: 'Adelantar a un tranvía' },
        body: `Se adelanta **por la derecha**. Por la izquierda únicamente en calle de **sentido único** o cuando a la derecha no hay espacio o hay un obstáculo, siempre sin peligro. Prohibido adelantar a un tranvía (o autobús en site propre) **parado en una parada sin refugio** mientras suben o bajan viajeros: parar detrás y esperar; con refugio, pasar despacio por la derecha del refugio. Prohibido adelantarlo en un cruce si hay que cruzar los raíles con riesgo, o cuando se dispone a girar.`,
      },
      {
        id: 'ch10-croisement',
        title: { fr: 'Le croisement', es: 'El cruce con vehículos de frente' },
        body: `Al cruzarte con un vehículo que viene en sentido contrario, mantente **a la derecha** y reduce si hace falta. En vías estrechas:

- Obstáculo en **tu** lado (coche aparcado, obras): **tú cedes**.
- Cuesta estrecha: cede **el que baja**; salvo si el que sube está más cerca de un apartadero.
- Vehículo ancho (camión, bus) frente a coche: en general se arregla el más maniobrable, pero legalmente cede el del obstáculo.
- Señales **B19** (cedes) / **B21** (prioridad) en pasos estrechos.
- Frente a un **tranvía**, déjale los raíles.

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
Intermitente, colocarse **a la izquierda de tu sentido** (junto al eje; en sentido único, el carril izquierdo), ceder a los que vienen de frente (recto o girando a su derecha), a los ciclistas de la pista ciclable de la izquierda si la hay, y a los peatones; girar **amplio** para entrar por la derecha de la nueva calle. Dos vehículos que giran a la izquierda uno frente a otro se cruzan **por la derecha** (cada uno mantiene su derecha; el otro vehículo pasa a su izquierda, sin rodearse) salvo que las flechas en el suelo indiquen otra cosa.

### Reglas comunes
Toda maniobra (girar, cambiar de carril, salir de un aparcamiento, demi-tour, marcha atrás, abrir una puerta) obliga a **ceder el paso** a los demás y a **señalar**. Intermitente: antes de la maniobra, el tiempo suficiente, y apagarlo después. Las señales con el brazo solo si el intermitente no funciona.`,
      },
      {
        id: 'ch11-demi-tour',
        title: { fr: 'Demi-tour et marche arrière', es: 'Cambio de sentido y marcha atrás' },
        body: `**Demi-tour** (giro en U): solo si no estorba ni pone en peligro a nadie, con visibilidad. **Prohibido** en autopista y route pour automobiles, en rotondas, donde haya C33 (señal), sobre una línea continua, en túneles, en pasos a nivel y en lugares sin visibilidad (curvas, cuestas). Alternativa segura: dar la vuelta a la manzana.

**Marche arrière**: solo la distancia estrictamente necesaria, a paso lento, cediendo a todos, con visibilidad (girarse, no fiarse solo de la cámara). **Prohibida** en autopista, route pour automobiles, rotondas y donde esté prohibido el demi-tour. Al salir marcha atrás de una plaza en batería, eres tú quien cede a todos.

**Abrir una puerta**: solo si no hay peligro; el responsable de un accidente con un ciclista es quien abre («emportiérage»).`,
      },
      {
        id: 'ch11-passage-niveau',
        title: { fr: 'Les passages à niveau', es: 'Los pasos a nivel' },
        body: `Anuncio: **A41** (con barreras, pictograma de valla) / **A43** (sin barreras, pictograma de locomotora) a ~150 m fuera de población, con placas de 3, 2 y 1 barras rojas (distancia). En el paso: **cruz de San Andrés** A45 (una vía) / A47 (varias vías).

Obligatorio detenerse cuando: las luces **rojas parpadean** (una o dos alternantes), suena la **campana**, las barreras bajan o están bajadas, o se acerca un tren aunque nada esté activado. Luz **blanca intermitente** = paso libre con prudencia. Nunca entres si no puedes **despejar** el paso inmediatamente; nunca zigzaguees entre medias barreras. Prohibido adelantar en pasos sin barreras ni semáforos; prohibido parar o estacionar sobre el paso a nivel.

Si te quedas **parado sobre las vías**: haz salir a los pasajeros, intenta mover el vehículo (arrancar en 1.ª a golpes de motor de arranque si es manual), y si no puedes, aléjate **en diagonal hacia el tren** (para evitar los restos proyectados) y llama al **112** y al número de la placa del paso.`,
      },
      {
        id: 'ch11-tunnels',
        title: { fr: 'Les tunnels', es: 'Los túneles' },
        body: `Señal **F25** (túnel). Dentro: **luces de cruce** obligatorias (aunque esté iluminado), gafas de sol fuera, radio en la frecuencia indicada, distancia de seguridad aumentada (en los túneles largos hay marcas o señales de distancia), velocidad adaptada, no adelantar si es prohibido (C35, un carril por sentido). **Prohibido** parar, dar marcha atrás, cambiar de sentido y, en general, circular con un vehículo que transporte mercancías peligrosas si está señalado.

**Avería**: luces de emergencia, apartarse en el «garage» (apartadero), apagar el motor, llamar desde el «poste d'appel» (poste SOS, da tu posición exacta). **Incendio**: intenta salir del túnel si es posible; si no, para, apaga el motor, **deja las llaves puestas**, abandona el vehículo por la **salida de emergencia** más cercana (pictograma verde, cada 100–200 m), nunca des media vuelta en coche. En atasco dentro del túnel: distancia con el de delante, luces encendidas, motor apagado si es largo.`,
      },
    ],
  },
]
