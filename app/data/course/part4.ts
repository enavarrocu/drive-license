import type { CourseChapter } from './types'

export const part4: CourseChapter[] = [
  /* ===================================================================== */
  {
    id: 'ch17-panneaux',
    number: 17,
    title: { fr: 'Les panneaux de signalisation', es: 'Las señales de tráfico' },
    theme: 'panneaux',
    intro:
      'Repaso señal por señal de las familias A, C, D, E y F y de las placas adicionales. En el examen la señal aparece sin nombre: hay que reconocerla por su forma, su color y su dibujo, y saber hasta dónde vale. La visión general de las familias está en el capítulo 5; las señales de prioridad (B), en el capítulo 9.',
    sections: [
      {
        id: 'ch17-lire',
        title: { fr: 'Lire un signal : forme, couleur, panneaux additionnels', es: 'Leer una señal: forma, color y placas adicionales' },
        body: `### Forma y color
| Aspecto | Familia |
|---|---|
| Triángulo punta arriba, borde rojo | **A** «danger» (peligro) |
| Triángulo invertido, octógono STOP, rombo amarillo | **B** «priorité» |
| Círculo blanco con borde rojo | **C** «interdiction» (prohibición) |
| Círculo azul con símbolo blanco | **D** «obligation» (obligación) |
| Círculo azul con borde rojo y barra o cruz roja | **E** «arrêt et stationnement» |
| Cuadrado azul con «P» blanca | **E9** (estacionamiento autorizado o reservado) |
| Rectángulo o cuadrado azul (o blanco) | **F** «indication» |

- Una señal **tachada con una barra oblicua** (negra, gris o roja) marca el **fin** de lo que anunciaba: fin de prohibición (C37, C45, C46), fin de zona (F4b, F12b, F113), fin de población (F3), fin de autopista (F7).
- **Fondo naranja o amarillo**: señalización provisional de obras o desvío («déviation»: F39, F41, F79, F85).
- **Fondo marrón**: destino turístico (F35). Fondo blanco con flecha: dirección por carretera ordinaria.

### Las placas adicionales («panneaux additionnels»)
Placa rectangular **debajo** de la señal que completa, precisa o limita su sentido. En general, blanco sobre azul; las de bicicletas y ciclomotores (modelos **«M»**) son negras sobre blanco.

- **Distancia** («200 m»): lo que anuncia la señal (peligro, prohibición, obligación) **empieza a esa distancia**.
- **Longitud** (flechas verticales y «2 km»): la señal vale **a lo largo de todo el tramo**.
- **Horario** («7–19 h», «du lundi au vendredi»): la señal **solo** se aplica en esas horas o días; fuera de ellos, no.
- **Categoría** («3,5 t», camión, «excepté riverains»): limita la señal a ciertos vehículos o crea excepciones.
- **M2** («excepté» + bicicleta) bajo C1, C3, C31 o D1: los **ciclistas** no están afectados. **M3**: tampoco los ciclomotores clase A.
- **M4** bajo F19: los ciclistas pueden circular **en los dos sentidos** de la calle de sentido único.

La placa no cambia nada para quien no aparece en ella: un coche ante **C1 + M2** sigue sin poder entrar.`,
        signs: ['M2', 'M4', 'M-distance', 'M-longueur', 'M-horaire'],
      },
      {
        id: 'ch17-danger',
        title: { fr: 'Signaux de danger (A)', es: 'Señales de peligro (A)' },
        body: `No prohíben ni obligan: **avisan** para que reduzcas y te prepares a tiempo. Se colocan a la derecha, a **unos 150 m** del lugar peligroso (art. 66.2); si la distancia es otra, una placa la indica. **Excepción**: las cruces de San Andrés (**A45** una vía, **A47** dos vías o más) se colocan **en el mismo paso a nivel**, no antes.

### Trazado y firme
- **A1a / A1b** curva a la izquierda / derecha; **A1c** doble curva, la **primera a la izquierda** (el dibujo se lee de abajo arriba).
- **A3** bajada peligrosa: **freno motor** (marcha corta), nunca en punto muerto. **A5** subida pronunciada.
- **A7a** estrechamiento por los dos lados, **A7b** por la izquierda, **A7c** por la derecha (solo se mueve la línea de ese lado).
- **A13** bache o badén («cassis ou dos d'âne»): reduce antes. **A14** resalto («dispositif surélevé»): se pasa a **30 km/h como máximo**.
- **A15** calzada resbaladiza (derrape): reduce, más distancia, sin maniobras bruscas. **A17** proyección de gravilla: reduce y **aumenta la distancia** (la gravilla del de delante rompe el parabrisas). **A19** desprendimiento de piedras.

### Lugares
- **A9** puente móvil; **A11** la vía desemboca en un **muelle o ribera** (riesgo de caer al agua); **A33** semáforos; **A35** aviones a baja altura; **A37** viento lateral; **A31** obras; **A50** riesgo de retenciones («file»).
- **A39**: tras un tramo de sentido único **vuelve la circulación en los dos sentidos**; mantente a la derecha.

### Usuarios y animales
- **A21** anuncia un paso de peatones; el **F49** azul está **en** el paso.
- **A23** lugar frecuentado por **niños**: reduce y prepárate; no obliga a parar.
- **A25** ciclistas y ciclomotores que **cruzan** o salen de una pista bici: es un aviso, no una obligación para ti.
- **A27** animales salvajes («gros gibier»): si uno salta delante, **frena fuerte en línea recta**, sin volantazo. **A29** ganado.

### Raíles
**A41** paso a nivel **con barreras** (valla); **A43** **sin barreras** (locomotora); **A49** raíles de **tranvía** que cruzan la calzada. **A51**: peligro no definido, la placa dice cuál.`,
        signs: ['A1c', 'A3', 'A7a', 'A7b', 'A7c', 'A11', 'A13', 'A14', 'A15', 'A17', 'A21', 'A23', 'A25', 'A27', 'A37', 'A39', 'A41', 'A43', 'A45', 'A47', 'A49', 'A51'],
      },
      {
        id: 'ch17-interdiction',
        title: { fr: "Signaux d'interdiction (C) et leur fin", es: 'Señales de prohibición (C) y su fin' },
        body: `### Acceso
- **C1** «sens interdit» (disco rojo con barra blanca): no puedes entrar **por este lado**; la calle es de sentido único y se circula en el otro sentido.
- **C3** (círculo rojo vacío): acceso prohibido a **todo conductor, en los dos sentidos**.
- Por categoría: **C6** quads, **C7** motocicletas, **C9** ciclomotores, **C11** ciclistas, **C13** tracción animal, **C15** jinetes, **C17** carretillas de mano, **C19** peatones, **C22** autocares, **C23** vehículos de **mercancías** (todos, incluso furgonetas, salvo que una placa fije una masa), **C24a** mercancías peligrosas. La señal **solo afecta a la categoría dibujada**: un coche puede entrar ante C11.

### Dimensiones (carga incluida)
**C21** masa **en carga** superior a la indicada (lo que pesa cargado, no vacío); **C25** longitud; **C27** anchura (triángulos a los lados); **C29** altura (triángulos arriba y abajo).

### Maniobras: hasta dónde valen
| Señal | Prohíbe | Vale hasta |
|---|---|---|
| C31a / C31b | girar a la izquierda / a la derecha | el próximo cruce |
| C33 | cambio de sentido | el próximo cruce **inclusive** |
| C35 | adelantar por la izquierda a vehículos de más de dos ruedas o de tracción animal (una moto sí se adelanta) | el próximo cruce inclusive, o C37 |
| C39 | lo mismo, solo para camiones de más de 3,5 t (tú sí puedes adelantar a un camión) | el próximo cruce inclusive, o C41 |
| C43 | velocidad máxima | el próximo cruce inclusive, otra C43, o la señal de inicio/fin de población, zona residencial, de encuentro o peatonal |

- **C37** fin de C35; **C41** fin de C39; **C45** fin de la limitación de velocidad (vuelve el límite general del lugar).
- **C46**: fin de **todas** las prohibiciones locales impuestas a los vehículos en marcha.
- **C47**: puesto de **peaje**, prohibido pasar sin detenerse.

Una prohibición puede **anunciarse** con la misma señal y una placa de distancia («200 m»): empieza a esa distancia.`,
        signs: ['C1', 'C3', 'C6', 'C7', 'C11', 'C15', 'C21', 'C23', 'C24a', 'C25', 'C27', 'C29', 'C31a', 'C31b', 'C33', 'C35', 'C37', 'C39', 'C41', 'C43', 'C45', 'C46', 'C47'],
      },
      {
        id: 'ch17-obligation',
        title: { fr: "Signaux d'obligation (D)", es: 'Señales de obligación (D)' },
        body: `Círculo azul con símbolo blanco: **obliga** a hacer algo o reserva una parte de la vía a ciertos usuarios.

- **D1**: seguir la dirección de la flecha (recto, girar…). Con la flecha oblicua hacia abajo sobre una isleta, obliga a pasar por ese lado. **D3**: seguir una de las direcciones de las flechas.
- **D5**: **sentido giratorio** obligatorio, siguiendo las flechas. Quién tiene prioridad en la rotonda lo dicen las señales de prioridad (capítulo 9).
- **D7**: **carril bici obligatorio** para los ciclistas; los coches no pueden circular ni pararse en él.
- **D9**: parte reservada a peatones, bicicletas y ciclomotores de dos ruedas clase A. **D10**: parte reservada a **peatones y ciclistas**.
- **D11**: camino obligatorio para **peatones**. **D13**: camino obligatorio para **jinetes**.

### Las confusiones típicas
- **D1** (flecha en **círculo** azul) = obligación de dirección; **F19** (flecha en **rectángulo** azul) = solo informa de que la vía es de sentido único.
- **D13** (círculo azul) obliga a los jinetes a usar el camino; **C15** (círculo rojo) les **prohíbe** el acceso.
- **D11** (círculo azul) es un camino para peatones; el paso de peatones es **F49** y la zona peatonal **F103** (rectángulos).

Una placa **M2** bajo D1 exime a los ciclistas de la obligación.`,
        signs: ['D1a', 'D3a', 'D5', 'D7', 'D9', 'D10', 'D11', 'D13', 'F19', 'C15'],
      },
      {
        id: 'ch17-arret',
        title: { fr: "Signaux d'arrêt et de stationnement (E)", es: 'Señales de parada y estacionamiento (E)' },
        body: `### Prohibiciones
- **E1** (una barra): **estacionamiento** prohibido; la **parada** breve (subir o bajar personas, cargar o descargar) está permitida.
- **E3** (cruz): **parada y estacionamiento** prohibidos.
- Valen **del lado de la vía donde están** colocadas, desde la señal **hasta el próximo cruce** (una placa con flecha puede marcar inicio, fin o distancia), en la calzada y en el arcén.
- Con placa de **horario** solo valen en esas horas: E3 «7–19 h» no te impide parar a las 20 h.

### Estacionamiento alterno
- **E5**: prohibido estacionar **del 1 al 15** del mes; **E7**: **del 16 al final** del mes. El cambio de lado se hace el último día de cada periodo entre las **19 h 30 y las 20 h**.
- **E11**, sobre el cartel de inicio de población: alterno quincenal en **todas** las calles. Del 1 al 15 se estaciona del lado de los números **impares**; del 16 al final, del lado de los **pares**.

### Estacionamiento autorizado o reservado (P blanca sobre azul)
| Señal | Significado |
|---|---|
| E9a | estacionamiento autorizado (las placas pueden exigir disco, pago, tarjeta o reservarlo a personas con discapacidad) |
| E9b | reservado a motos, coches, coches mixtos y minibuses |
| E9c | reservado a **camionetas y camiones** (un turismo no puede ocuparlo) |
| E9d | autocares |
| E9h | autocaravanas («véhicules automobiles de camping») |
| E9i | motos |
| E9e / E9f / E9g | estacionamiento **obligatorio** **enteramente** sobre la acera o el arcén / **en parte** sobre ellos / en la **calzada** |
| E9j | la misma plaza se reserva a distintos vehículos **según la hora** (p. ej. bicicletas de 7 h 30 a 18 h y coches de 18 h a 7 h 30) |

Las reglas generales de parada y estacionamiento (distancias, zona azul) están en el capítulo 12.`,
        signs: ['E1', 'E3', 'E5', 'E7', 'E11', 'E9a', 'E9b', 'E9c', 'E9d', 'E9e', 'E9f', 'E9g', 'E9h', 'E9i', 'E9j'],
      },
      {
        id: 'ch17-indication',
        title: { fr: "Signaux d'indication (F)", es: 'Señales de indicación (F)' },
        body: `Rectángulos o cuadrados, casi siempre azules. Informan, pero muchos **activan reglas** desde el lugar donde están.

### Inicio y fin de reglas
- **F5 / F7** inicio / fin de autopista; **F9 / F11** inicio / fin de vía para automóviles (F11 es el coche de F9 tachado).
- **F8**: túnel de **más de 500 m** (una placa indica la longitud).
- **F12a / F12b** zona residencial o de encuentro (20 km/h); **F103 / F105** zona peatonal; **F111 / F113** zona o calle **ciclista** (30 km/h, prohibido adelantar a los ciclistas; tras **F113** se les puede volver a adelantar con las reglas normales).
- **F99a / F101a**: inicio / fin de un camino reservado a los usuarios dibujados.

### Carriles y calles
- **F13**: flechas de selección antes de un cruce: **elige a tiempo** el carril de tu dirección.
- **F17** carril bus; **F18** plataforma bus y tranvía que se puede **cruzar pero no recorrer** («site spécial franchissable»).
- **F19** sentido único; **F21** se puede pasar el obstáculo **por la derecha o por la izquierda** (no confundir con A39, circulación en dos sentidos).
- **F45** vía **sin salida**; **F45b** sin salida salvo para **peatones y ciclistas**.
- **F91**: las señales dibujadas sobre un carril **solo valen para ese carril** (F89 lo anuncia); en otro carril rige el límite general.
- **F85** (naranja, obras): circulación en los **dos sentidos** en un tramo normalmente de sentido único. **F87**: el resalto está **aquí** (30 km/h máximo; A14 lo anunciaba). **F95**: **lecho de frenado** («piste de détresse») para vehículos sin frenos.

### Orientación y servicios
- **F23a** número de carretera; **F25** preaviso de direcciones; **F29** dirección; **F31** dirección **por autopista** (lleva su símbolo); **F35** marrón, turístico; **F39 / F41** (naranja) preaviso e **itinerario de desvío**; **F47** fin de obras.
- **F49** paso de peatones y **F50** paso de ciclistas y ciclomotores de dos ruedas (colocados **en** el paso; cédeles el paso cuando cruzan). **F50bis** avisa a quien **gira** de que ciclistas siguen la misma vía: al girar, cédeles el paso. **F51** paso subterráneo o elevado para peatones.
- **F52** **salida de emergencia** de un túnel (verde, persona corriendo); **F53** hospital; **F55** puesto de socorro; **F56** extintor; **F59** aparcamiento; **F62** teléfono de emergencia (SOS); **F63** gasolinera.`,
        signs: ['F8', 'F11', 'F13', 'F18', 'F19', 'F21', 'F31', 'F41', 'F45', 'F45b', 'F49', 'F50', 'F50bis', 'F52', 'F85', 'F87', 'F91', 'F95', 'F113'],
      },
    ],
  },

  /* ===================================================================== */
  {
    id: 'ch18-mecanique',
    number: 18,
    title: { fr: 'Technique du véhicule', es: 'Mecánica del vehículo' },
    theme: 'mecanique',
    intro:
      'Lo que un conductor debe saber de su coche para reconocer una avería y reaccionar bien: frenos, neumáticos, motor y batería, dirección y suspensión, ayudas electrónicas y coches eléctricos. Los testigos del salpicadero y los controles antes de salir están en el capítulo 2; las situaciones de emergencia (reventón, aquaplaning), en el capítulo 14.',
    sections: [
      {
        id: 'ch18-freins',
        title: { fr: 'Les freins', es: 'Los frenos' },
        body: `El **«frein de service»** (pedal) actúa sobre las cuatro ruedas mediante un circuito hidráulico lleno de **«liquide de frein»**. Ese líquido es **higroscópico**: absorbe la humedad y, con los años, hierve a menor temperatura (burbujas, pedal blando). Por eso se cambia periódicamente, en general cada **2 años** según el fabricante.

### Síntomas y qué hacer
| Síntoma | Causa probable | Qué hacer |
|---|---|---|
| Pedal blando o que se hunde casi hasta el suelo | aire, fuga o falta de líquido | detenerse con prudencia, no seguir, hacer remolcar |
| Testigo rojo de freno encendido con el «frein à main» quitado | nivel de líquido bajo o fallo del circuito | parar (rojo = parar) |
| Chirrido metálico agudo al frenar | **«plaquettes»** (pastillas) gastadas | cambiarlas antes de que rayen los discos |
| El coche tira hacia un lado al frenar | un freno actúa peor (pastilla gastada, pinza agarrotada) | revisar enseguida |

### El «fading»
Frenando sin parar en una **bajada larga**, discos y pastillas se sobrecalientan y frenan cada vez menos. Señales: **olor a quemado** y pedal que frena menos. Detenerse en un lugar seguro y **dejar enfriar**, sin echar agua fría sobre los discos. Para evitarlo: **«frein moteur»**, con una marcha corta (más o menos la que usarías para subir esa pendiente), frenando solo a ratos. Nunca bajar en **«point mort»**: se pierde el freno motor.

### Fallo total y ABS
Si los frenos no responden: bombear el pedal, **reducir de marcha** y tirar del freno de mano **poco a poco** (de golpe bloquea las ruedas traseras). El **«ABS»** impide que las ruedas se bloqueen: su ventaja principal es que **sigues pudiendo dirigir** el coche mientras frenas; no acorta siempre la distancia (en grava o nieve puede alargarla). Con ABS se pisa a fondo y se mantiene; la vibración del pedal es normal (capítulo 8).`,
      },
      {
        id: 'ch18-pneus',
        title: { fr: 'Les pneus et les roues', es: 'Neumáticos y ruedas' },
        body: `### Presión
- La **presión recomendada** está en una etiqueta del coche (marco de la puerta del conductor o trampilla del depósito) y en el manual. La cifra del **«flanc»** es la presión **máxima** del neumático, no la que hay que poner.
- Se mide **en frío**. Tras un trayecto largo sale más alta: **no desinflar**, volver a medir en frío.
- Presión demasiado **baja**: desgaste en **los dos bordes**, más consumo, peor agarre, riesgo de reventón. Demasiado **alta**: desgaste en el **centro**. Desgaste de **un solo borde**: alineación.
- Profundidad mínima legal del dibujo: **1,6 mm**.

### Aquaplaning y reventón
El **«aquaplanage»**: el neumático ya no evacua el agua y flota. El riesgo crece con la **velocidad**, el **dibujo gastado** y la **presión baja**. Soltar el acelerador suavemente, sin frenar ni girar bruscamente; con lluvia no se usa el regulador. Si un neumático **revienta** («éclatement»): sujetar firme el volante, no frenar de golpe, dejar que el coche pierda velocidad y apartarse con los warnings.

### Daños y cambio de rueda
- Una **«hernie»** (bulto) en el flanco = carcasa dañada (a menudo tras un golpe contra un bordillo): cambiar el neumático cuanto antes.
- Para cambiar una rueda: coche en llano, freno de mano, **aflojar las tuercas antes de levantar** el coche con el **«cric»** (gato) y apretarlas del todo con la rueda en el suelo.
- La **«roue de secours galette»** (rueda estrecha) es provisional: respetar la **velocidad máxima indicada** en ella y sustituirla pronto. La rueda de repuesto no es obligatoria en Bélgica (a menudo hay un kit antipinchazos).

### Edad y neumáticos de invierno
- El código **DOT** de cuatro cifras da la semana y el año de fabricación: **2319** = semana 23 de 2019. La goma envejece aunque no se use.
- Los **«pneus hiver»** rinden mejor por debajo de unos **7 °C**. El símbolo de la **montaña de tres picos con copo (3PMSF)** garantiza la homologación en nieve; **«M+S»** es solo una declaración del fabricante. Los «4 saisons» son un compromiso. En Bélgica no son obligatorios.`,
      },
      {
        id: 'ch18-moteur',
        title: { fr: 'Moteur, batterie et transmission', es: 'Motor, batería y transmisión' },
        body: `### Refrigeración y humos
El motor necesita aceite (lubricación) y **«liquide de refroidissement»** (refrigeración), que lleva **«antigel»**: se rellena con el líquido que prescribe el fabricante, **no con agua sola** (se congela en invierno).

| Humo por el «pot d'échappement» | Indica |
|---|---|
| azulado | el motor **quema aceite** |
| blanco espeso persistente | puede pasar líquido de refrigeración al motor |
| negro | mala combustión (exceso de carburante) |

### Batería y arranque con pinzas
El **«alternateur»**, movido por una correa, recarga la **«batterie»** con el motor en marcha. **Testigo rojo de batería en marcha** = la batería ya no se carga (alternador o correa rota; si esa correa mueve la bomba de agua, el motor se calienta): parar en cuanto sea seguro y hacer revisar.

Con **«câbles de démarrage»**: 1) rojo al **+ de la descargada**, 2) rojo al **+ de la buena**, 3) negro al **− de la buena**, 4) negro a una **masa metálica** del motor averiado, lejos de la batería (la última conexión puede hacer chispa y la batería desprende gas). Se desconecta en orden inverso.

### Diésel y carburante
- Testigo de **«préchauffage»** (espiral naranja): esperar a que se apague antes de arrancar.
- El **«filtre à particules»** (FAP) se limpia solo («régénération») en trayectos largos a velocidad constante; con solo trayectos cortos **se colmata**. El «pot catalytique» reduce los gases tóxicos.
- **Carburante equivocado**: **no arrancar** y hacer vaciar el depósito (arrancar daña la bomba y los inyectores).

### Embrague, caja automática, distribución
- El motor sube de vueltas pero el coche apenas acelera: el **«embrayage»** **patina** (gastado). No conducir con el pie apoyado en el pedal.
- **«Boîte automatique»**: arrancar con el pie en el freno; para aparcar, palanca en **P** y freno de mano (**N** es punto muerto: el coche puede rodar).
- La **«courroie de distribution»** se cambia según el plan del fabricante (kilometraje o edad), **aunque no haga ruido**: si se rompe, el motor puede quedar destrozado.`,
      },
      {
        id: 'ch18-direction',
        title: { fr: 'Direction et suspension', es: 'Dirección y suspensión' },
        body: `La **«direction assistée»** y el **«servofrein»** funcionan gracias al motor. Si el motor **se cala en marcha**, volante y freno se vuelven **mucho más duros pero siguen funcionando**: girar y frenar con más fuerza. Nunca quitar la llave en marcha: el **«antivol de direction»** podría bloquear el volante.

| Síntoma (sin frenar) | Causa probable |
|---|---|
| El volante vibra a partir de cierta velocidad (p. ej. hacia 90 km/h) | ruedas mal **«équilibrées»** (equilibrado) |
| El coche tira hacia un lado en línea recta | presión desigual o mal **«parallélisme»** (alineación) |
| Neumático gastado solo por un borde | alineación |

Tras un golpe fuerte contra un bordillo, hacer revisar llanta, neumático y alineación.

Los **«amortisseurs»** mantienen las ruedas pegadas al suelo. Gastados: el coche rebota y se balancea, la **distancia de frenado se alarga**, el agarre en curva y en mojado empeora y el riesgo de aquaplaning sube. Se revisan en la ITV y en el taller.`,
      },
      {
        id: 'ch18-aides',
        title: { fr: 'Aides à la conduite, véhicules électriques', es: 'Ayudas a la conducción y coches eléctricos' },
        body: `### Ayudas electrónicas
- **«ESP»** (control de estabilidad): frena por separado algunas ruedas y reduce la potencia para corregir un derrape. No cambia la física: a demasiada velocidad en una curva no evita la salida.
- **«ABS»**: evita el bloqueo de ruedas al frenar (ver frenos).
- **«Régulateur de vitesse»** (regulador): mantiene una velocidad elegida sin pedal. **No** se usa con lluvia, hielo o nieve (en aquaplaning seguiría empujando) ni con tráfico denso.
- **«Limiteur de vitesse»** (limitador): aceleras tú, pero el coche **no supera** la velocidad fijada.
- Las **«aides au stationnement»** (sensores, cámara) no sustituyen mirar. El **«airbag»** complementa el cinturón, no lo sustituye.

### Eléctricos e híbridos
- A baja velocidad un **«véhicule électrique»** es casi silencioso: peatones y ciclistas **pueden no oírlo**; más atención en ciudad.
- Al levantar el pie del acelerador, el motor eléctrico **frena y recarga la batería**: **«freinage régénératif»**.
- Con **«READY»** en el cuadro, el coche está encendido y **puede moverse** aunque no haga ruido: antes de bajar, P, freno de mano y apagarlo.
- Tras un accidente, los **cables naranjas** son de alta tensión: no tocarlos.`,
      },
    ],
  },

  /* ===================================================================== */
  {
    id: 'ch19-accidents',
    number: 19,
    title: { fr: 'Panne, accident, premiers secours', es: 'Avería, accidente y primeros auxilios' },
    theme: 'accidents',
    intro:
      'Qué hacer con un coche averiado en cualquier vía (no solo en autopista), cómo remolcar, qué obligaciones hay tras un accidente según haya o no heridos, y los gestos básicos de primeros auxilios. Las reglas específicas de la autopista (bande d\'arrêt d\'urgence, borne d\'appel, guardarraíl) están en el capítulo 13.',
    sections: [
      {
        id: 'ch19-panne',
        title: { fr: 'Véhicule en panne : se ranger et signaler', es: 'Vehículo averiado: apartarlo y señalizarlo' },
        body: `Con un **«véhicule en panne»** el conductor debe garantizar la seguridad y la fluidez del tráfico: primero lo **«range»** como un vehículo estacionado normal. Si puede dejarlo donde **aparcar está permitido**, no hace falta nada más (**ni triángulo**).

### Cuándo es obligatorio el triángulo
- Si el coche no se puede mover o solo puede quedarse donde **la parada y el estacionamiento están prohibidos** (calzada, arcén de autopista…). Los **«feux de détresse»** o una luz portátil amarillo-naranja intermitente son un **complemento**, no lo sustituyen.
- Si las luces del vehículo no funcionan y no se le distingue a unos **100 m**.
- Si se cae una **carga** en la vía y no se puede retirar enseguida: se señaliza el obstáculo como un vehículo averiado.

### Dónde se coloca
| | Distancia mínima |
|---|---|
| Vía ordinaria | **30 m** |
| Autopista | **100 m** |

Siempre **«en deçà du véhicule»**: antes del coche, del lado del tráfico que llega, casi vertical y visible desde unos **50 m** (si hay una curva o una cima, más lejos). En **población**, donde no se pueden respetar los 30 m, puede ponerse más cerca, **incluso sobre el vehículo**, pero no se omite.

### Chaleco, retirada y equipamiento
- En **autopista y «route pour automobiles»**, si el vehículo queda donde la parada está prohibida, el conductor debe llevar puesto el **chaleco reflectante** («veste de sécurité rétroréfléchissante») en cuanto sale: tenlo en el habitáculo, no en el maletero.
- Si el conductor no está o no puede mover el vehículo, la policía puede retirarlo de oficio; en autopista lo hace siempre, **a riesgo y cargo del conductor**.
- A bordo de todo coche matriculado en Bélgica: **triángulo**, **«extincteur»** y **«trousse de secours»**, homologados y en buen estado. Un extintor ya usado se **recarga o se cambia**.
- **Humo o fuego en el motor**: parar, cortar el contacto, **hacer salir a todo el mundo** y llamar al 112; **no abrir del todo el capó** (el aire aviva el fuego).`,
      },
      {
        id: 'ch19-remorquage',
        title: { fr: 'Remorquer un véhicule en panne', es: 'Remolcar un vehículo averiado' },
        body: `**«Remorquer»** un vehículo de motor está prohibido salvo si **ya no puede moverse** por sus propios medios o no ofrece toda garantía de seguridad. Remolcar el coche de un amigo que funciona, «para ahorrar», no está permitido.

Con una **«attache de fortune»** (unión improvisada: «corde», «câble» o barra que no es el enganche normal):
- solo en caso de **fuerza mayor**;
- solo hasta el **«lieu de réparation»** (taller);
- a **25 km/h como máximo**;
- **nunca en autopista ni en «route pour automobiles»** (ni para entrar en ellas, art. 21.1 y 21.4).

Si entre los dos vehículos hay **más de 3 m**, la unión se señaliza:
| Situación | Señalización |
|---|---|
| De día, sin luces obligatorias | un trozo de **«étoffe rouge»** (tela roja) |
| Con luces obligatorias | una **luz naranja visible lateralmente**, salvo que la unión esté iluminada |

Una **«dépanneuse»** (grúa) debe llevar encendidas sus luces amarillo-naranja intermitentes en el lugar del rescate **y durante el remolque**, y solo entonces.`,
      },
      {
        id: 'ch19-accident',
        title: { fr: 'Après un accident : obligations', es: 'Tras un accidente: obligaciones' },
        body: `Toda persona implicada debe tomar las medidas de seguridad y fluidez: señalizar como un vehículo averiado (warning, triángulo, chaleco).

| | Solo **«dégâts matériels»** | Con **«dommages corporels»** (heridos) |
|---|---|---|
| Vehículos | anotar posiciones o hacer fotos y **apartarlos** | moverlos **no es obligatorio** |
| Comprobaciones | juntos, con el **«constat européen d'accident»** (parte amistoso); sin acuerdo, policía (**101**) | la **policía** debe venir; el parte amistoso **no basta** |
| Además | | **socorrer** a los heridos |

- Toda persona implicada **de más de 15 años** debe enseñar su **«carte d'identité»** a los demás implicados que se la pidan y quedarse en el lugar.
- El **parte amistoso**: firmarlo **no es reconocer la culpa**, pero lo firmado **ya no se puede modificar**; cada uno se lleva su ejemplar. A la aseguradora se declara en 8 días (capítulo 13).
- **Perjudicado ausente** (coche aparcado): dejar en el lugar **nombre y dirección** y comunicarlos cuanto antes, directamente o por la policía.
- Con heridos, si no se ha podido contactar con la policía en un plazo razonable: declarar el accidente en una comisaría **en las 24 horas**.
- **«Délit de fuite»**: marcharse para escapar de las comprobaciones, **también con solo daños materiales**. Alejarse un momento para socorrer o avisar **no** es huir, si antes se dan nombre y dirección a alguna persona presente.
- Al llamar al **112**: primero el **lugar exacto**, luego el número de víctimas y su estado.`,
      },
      {
        id: 'ch19-secours',
        title: { fr: 'Premiers secours : Protéger, Alerter, Secourir', es: 'Primeros auxilios: Proteger, Alertar, Socorrer' },
        body: `### El orden: P.A.S.
1. **«Protéger»**: aparcar el propio coche en un lugar seguro, **pasado el accidente** (no junto a las víctimas), warning, chaleco, triángulo, cortar el contacto de los vehículos implicados.
2. **«Alerter»**: **112**, con el lugar exacto, el número de heridos y su estado.
3. **«Secourir»**.

### Los gestos
| Situación | Qué hacer |
|---|---|
| Herido en general | **no moverlo** salvo **«danger immédiat»** (incendio, riesgo de atropello): podría agravarse una lesión de la columna |
| Motorista | no quitarle el casco, salvo si no respira y hay que reanimarlo |
| Inconsciente que **respira** | **«position latérale de sécurité»** (PLS), para que no se ahogue |
| Inconsciente que **no respira** | 112 y **«réanimation»** (compresiones en el centro del pecho); el **DEA** si hay uno |
| **«Hémorragie»** | **comprimir directamente** la herida |
| **«Brûlure»** | enfriar con agua templada **unos 20 minutos**, sin hielo, sin arrancar la ropa pegada ni reventar ampollas |

- El **«défibrillateur externe automatique»** (DEA) lo puede usar **cualquier persona**, incluso sin formación: el aparato da las instrucciones.
- **No dar de beber ni de comer** a un herido (puede necesitar cirugía), aunque tenga sed.
- **Taparlo** para que no coja frío, **hablarle** para tranquilizarlo y **no dejarlo solo**.`,
      },
    ],
  },

  /* ===================================================================== */
  {
    id: 'ch20-comportement',
    number: 20,
    title: { fr: 'Conduite défensive et environnement', es: 'Conducción defensiva y medio ambiente' },
    theme: 'comportement',
    intro:
      'Ver el peligro antes de que ocurra, no dejarse llevar por las distracciones ni las emociones, prever los errores de los demás y conducir de forma económica. Es lo que mide también el «test de perception des risques» de Bruselas. Las reglas sobre el teléfono y las distracciones están en el capítulo 3, y los consejos básicos de eco-conducción en el capítulo 2.',
    sections: [
      {
        id: 'ch20-perception',
        title: { fr: 'Perception des risques', es: 'Percepción del riesgo' },
        body: `La **«perception des risques»** consiste en ver el peligro antes de que ocurra y actuar a tiempo: **levantar el pie, cubrir el freno y estar listo para parar**. Hay que **«scanner»** la vía: mirar **lejos delante**, a los **lados** y, con regularidad, los **«rétroviseurs»**, no solo el coche de delante.

### Indicios que hay que leer
| Ves… | Prevé que… | Haz |
|---|---|---|
| una **«balle»** o **«ballon»** que cruza | detrás viene un **niño** corriendo | frenar y prepararte a parar |
| niños en la acera o entre **«voitures en stationnement»** (A23, escuelas) | se lanzan sin mirar | reducir mucho, listo para frenar |
| alguien sentado al volante de un coche aparcado | abre la **«portière»** | dejar ~1 m (el ancho de una puerta) y moderar |
| **«feux de recul»** encendidos en un coche aparcado | va a salir **hacia atrás** | reducir, aunque tengas prioridad |
| furgoneta en **doble fila** o vehículo parado | sale un peatón por delante | rodearla despacio |
| ciclista que mira por encima del **hombro izquierdo** | va a desviarse o girar a la izquierda | no adelantarlo en ese momento |
| peatón distraído (teléfono, auriculares) junto al bordillo | cruza sin mirar | reducir y estar listo para frenar |

### Autobuses, curvas y cimas
- En **población**, cuando un **«autobus»** de línea señala que sale de su parada, hay que **reducir y, si hace falta, detenerse** para dejarle arrancar (art. 39).
- En una **curva sin visibilidad** o al llegar a una cima («sommet de côte»), la velocidad debe permitir **parar en la distancia que ves** (art. 10.1) y hay que mantenerse bien a la derecha.`,
        signs: ['A23'],
      },
      {
        id: 'ch20-angles-morts',
        title: { fr: 'Les angles morts des camions et des bus', es: 'Los ángulos muertos de camiones y autobuses' },
        body: `Camiones y autobuses tienen grandes **«angles morts»**, sobre todo **a su derecha** y **justo delante**.

- Si un camión va a **girar a la derecha** (intermitente derecho en un semáforo), **quédate detrás**: nunca te pongas a su derecha ni justo delante, sobre el paso.
- Regla práctica: si **no ves la cara del conductor** en su retrovisor, **él no te ve**.

Lo mismo vale para ciclistas y peatones junto a un camión: en sus ángulos muertos son invisibles para el conductor (los usuarios vulnerables, en el capítulo 15).`,
      },
      {
        id: 'ch20-distraction',
        title: { fr: 'Distraction, émotions et agressivité', es: 'Distracciones, emociones y agresividad' },
        body: `Apartar la vista es conducir a ciegas: a **50 km/h** se recorren unos **14 m por segundo**, así que mirar el teléfono **2 segundos** son **~28 m** sin ver nada (las reglas del teléfono, en el capítulo 3).

### Distracciones
- **«Kit mains libres»**: permitido, pero la conversación también distrae. Con tráfico denso, lo prudente es **no contestar** y llamar después, parado en un lugar seguro.
- **«GPS»**: se programa antes de salir; para cambiar el destino, **detente en un sitio seguro** (no en un semáforo ni rodando despacio).
- **Comer o beber**: mejor una pausa en un **«aire de repos»**.
- **Niños que se pelean** o algo que exige tu atención: para en un lugar seguro antes de ocuparte de ello; no te gires ni vigiles largo rato por el retrovisor.

### Emociones
- La **«colère»** (ira), la tristeza o el **«stress»** reducen la atención y empujan a correr: tras una discusión o una mala noticia, **espera a calmarte** o deja conducir a otra persona.
- **Con retraso**: acepta llegar tarde y **avisa antes de salir**, en lugar de acelerar o arriesgar en los cruces.

### Agresividad de los demás
- Ante un **gesto o un insulto**: no respondas (ni con ráfagas) ni lo sigas; continúa tu camino con calma.
- Si alguien **te sigue demasiado cerca** («coller»): no frenes para castigarlo ni aceleres; **aumenta tu distancia con el de delante** (así frenarás con suavidad) y déjalo pasar en cuanto se pueda.

Medicamentos y fatiga: capítulo 3.`,
      },
      {
        id: 'ch20-eco',
        title: { fr: 'Éco-conduite et zone de basses émissions', es: 'Eco-conducción y zona de bajas emisiones' },
        body: `La **«éco-conduite»** ahorra combustible, contamina menos y suele ser más segura (más consejos en el capítulo 2).

- **Anticipar**: al ver a lo lejos un semáforo rojo o un atasco, **levanta el pie pronto con la marcha engranada**. El **«frein moteur»** casi no consume (los motores de inyección cortan el combustible); en **punto muerto** el motor sigue consumiendo al ralentí.
- Cambia pronto a marchas largas y mantén una velocidad estable.
- **Parada prolongada** (esperar a alguien, paso a nivel cerrado): **«couper le moteur»**; al **«ralenti»** consume sin avanzar.
- **«Pression des pneus»**: poco inflados = **más consumo y más desgaste** y peor agarre. Con el coche **muy cargado**, se **adapta la presión a la carga** según el fabricante (etiqueta del marco de la puerta, tapa del depósito o manual).
- Un **«coffre de toit»** o una **«galerie»** aumentan la resistencia del aire **incluso vacíos**: se quitan cuando no se usan. El peso inútil en el maletero también aumenta el consumo.
- La **«climatisation»** aumenta el consumo: con moderación.

### La LEZ de Bruselas
| | |
|---|---|
| Dónde | **toda la Región de Bruselas-Capital** (las 19 comunas), salvo el Ring y algunos accesos a parkings de disuasión |
| Cuándo | **todos los días, 24 h** |
| Quién puede entrar | según el tipo de vehículo, su **«norme Euro»** y su **«carburant»** (criterios más estrictos para el diésel) |
| A quién afecta | vehículos belgas y extranjeros (estos deben **registrarse antes**) |
| Control | **«caméras ANPR»** que leen las matrículas (no hay pegatina) |

Los criterios se endurecen por etapas: consulta lez.brussels.`,
      },
      {
        id: 'ch20-defensive',
        title: { fr: 'Conduite défensive', es: 'Conducción defensiva' },
        body: `La **«conduite défensive»** consiste en **prever los errores de los demás** y dejarse siempre un **margen** para evitarlos, sin por ello bloquear el tráfico.

- **Tener la prioridad no exime de prudencia**: si otro llega rápido a su «cédez le passage» y no frena, levanta el pie y prepárate a frenar o a dejarle pasar. Mejor renunciar a la prioridad que chocar.
- **Un intermitente no es una garantía**: si un coche señala que gira pero no reduce, espera a que **empiece de verdad a girar** antes de salir.
- **En una fila parada**, deja delante espacio para **ver las ruedas traseras** del vehículo de delante **tocando el suelo**: podrás rodearlo si se avería.
- **No invites** con la mano ni con ráfagas a un peatón a cruzar fuera de un paso cuando hay otro carril a tu lado: el vehículo de ese carril puede no verlo. Déjale decidir.
- **«Vent latéral»** (A37): **sujeta firme el volante y reduce**, sobre todo con carga en el techo, remolque o caravana, en puentes, al salir de un túnel o de una zona protegida y al adelantar camiones.
- **De noche, deslumbrado** por los faros de frente: mira el **borde derecho** de la calzada, reduce y nunca respondas con las largas.
- **Nieve**: la **«distance de freinage»** es mucho más larga; aumenta la distancia, frena y gira con suavidad y, en bajada, usa una **marcha corta** (freno motor) en vez de frenar fuerte. Nunca en punto muerto.

Más sobre conducción con mal tiempo y de noche en el capítulo 14.`,
        signs: ['A37'],
      },
    ],
  },
]
