import type { CourseChapter } from './types'

export const part1: CourseChapter[] = [
  /* ===================================================================== */
  {
    id: 'ch01-permis',
    number: 1,
    title: { fr: 'Le permis de conduire', es: 'El permiso de conducir' },
    theme: 'permis',
    intro:
      'Qué permite cada categoría, cómo funciona el «permis provisoire» y qué pasos hay entre el examen teórico y el permiso definitivo. En el examen caen preguntas directas sobre edades, duraciones y restricciones.',
    sections: [
      {
        id: 'ch01-categories',
        title: { fr: 'Les catégories de permis', es: 'Las categorías de permiso' },
        body: `El permiso belga es una tarjeta válida **10 años** (hay que renovarla, sin examen). Cada categoría autoriza un tipo de vehículo:

- **AM** (desde 16 años): «cyclomoteurs» de clase A y B (≤ 45 km/h) y cuadriciclos ligeros.
- **A1** (18), **A2** (20), **A** (24, o 22 con dos años de A2): motocicletas por potencia creciente.
- **B** (18): vehículos de «masse maximale autorisée» (MMA) ≤ 3.500 kg y máximo 8 plazas además del conductor; remolque ≤ 750 kg, o más pesado si la suma de las MMA no supera 3.500 kg.
- **B96**: código que amplía B hasta 4.250 kg de conjunto. **BE**: remolque hasta 3.500 kg.
- **C / CE** (21): camiones. **D / DE** (24): autobuses. **G**: tractores agrícolas.

Con el permiso **B** también puedes conducir: ciclomotores y cuadriciclos (AM), tractores agrícolas de uso privado, y motos ligeras A1 (≤ 125 cm³, ≤ 11 kW) **solo** si tienes el B desde hace al menos 2 años y has hecho 4 horas de formación en autoescuela (código 372).`,
      },
      {
        id: 'ch01-theorique',
        title: { fr: "L'examen théorique", es: 'El examen teórico' },
        body: `Se puede presentar desde los **17 años**. En Bruselas se hace en Autocontrole (Anderlecht o Schaerbeek), sin cita previa para la mayoría de casos, por 15–17 € según el centro.

- **50 preguntas**, cada una leída en audio y con **15 segundos** para responder. Una respuesta validada no se cambia.
- Se aprueba con **41/50**. Error normal: −1. «Faute grave» (prioridad, velocidad, adelantamiento, alcohol, distancia de seguridad…): **−5**. Dos faltas graves = suspenso automático.
- Tras **dos suspensos** seguidos hay que esperar y, en Bruselas, pasar por una formación de 12 h en autoescuela antes del tercer intento.
- El aprobado vale **3 años**. Si expira sin haber aprobado el práctico, se repite el teórico.
- Lengua: francés o neerlandés; en Bruselas se puede pedir intérprete de alemán o inglés (50 €); existen «sessions spéciales» para quienes tienen dificultades de lectura, con certificado.`,
      },
      {
        id: 'ch01-provisoire',
        title: { fr: 'Le permis de conduire provisoire', es: 'El permiso provisional' },
        body: `Con el teórico aprobado pides en la comuna el «permis de conduire provisoire» (PCP). Tres modelos:

- **M36** («avec guide»): desde **17 años**, válido **36 meses**, siempre acompañado de uno de los guías inscritos (máximo dos). Mínimo **3 meses** de prácticas antes del práctico.
- **M18** («sans guide»): desde **18 años**, tras **20 horas** en autoescuela, válido **18 meses**, puedes conducir solo. Mínimo 3 meses de prácticas.
- **M12**: si el M36 o el M18 caduca sin aprobar, un último provisional de **12 meses** con guía, tras 6 h de autoescuela. No se renueva: después solo queda la autoescuela con examen.

### Condiciones del «guide»
Tener el permiso B desde **8 años** como mínimo, no haber sufrido una «déchéance du droit de conduire» en los últimos 3 años, estar inscrito en el PCP y sentarse delante, al lado del aprendiz.

### Lo que NO puedes hacer con el provisional
- Conducir de **22 h a 6 h** los **viernes, sábados, domingos, vísperas de festivo y festivos** (todos los modelos).
- Llevar remolque.
- Llevar más pasajeros que el guía (M36) o, en M18, más de **una** persona además de ti (que debe cumplir las condiciones de guía).
- Conducir en el extranjero (el PCP belga solo vale en Bélgica).
- Olvidar la **placa «L»** blanca con L roja, bien visible detrás.

El PCP se retira si cometes una infracción grave o conduces bajo los efectos del alcohol.`,
      },
      {
        id: 'ch01-pratique',
        title: { fr: "Avant et pendant l'examen pratique", es: 'Antes y durante el examen práctico' },
        body: `En Bruselas, antes del práctico hay que superar el **«test de perception des risques» (TPR)**: 5 vídeos en los que señalas los peligros; cuesta unos 17 € y es obligatorio desde 2018 (también en Valonia). También es obligatoria una **formación de primeros auxilios** (3 h online + 1 h 30 presencial, en Bruselas) y, en Valonia, el «rendez-vous pédagogique» para la filière libre.

El práctico dura unos 40 minutos: maniobras (aparcamiento, marcha atrás, giro) y circulación en tráfico real, incluida una parte de conducción autónoma hacia un destino. Se hace con el coche de la autoescuela o con el propio (con doble retrovisor y placa L). Si suspendes dos veces, 6 h de autoescuela obligatorias antes de volver.

Tras aprobar, el permiso definitivo se recoge en la comuna. Los **conductores noveles** (menos de 2 años de permiso B) pueden ser condenados a repetir exámenes tras ciertas infracciones graves.`,
      },
    ],
  },

  /* ===================================================================== */
  {
    id: 'ch02-vehicule',
    number: 2,
    title: { fr: 'Le véhicule', es: 'El vehículo' },
    theme: 'vehicule',
    intro:
      'Equipamiento obligatorio, comprobaciones antes de salir, testigos del salpicadero, neumáticos, carga y remolques, y conducción económica. Preguntas fáciles si sabes los números.',
    sections: [
      {
        id: 'ch02-equipement',
        title: { fr: "L'équipement obligatoire", es: 'El equipamiento obligatorio' },
        body: `Todo coche matriculado en Bélgica debe llevar a bordo:

- un **«triangle de danger»** homologado,
- un **«extincteur»** (extintor) fijado y accesible, con fecha de validez,
- una **«trousse de secours»** (botiquín),
- un **«gilet rétroréfléchissant»** (chaleco) al alcance del conductor, obligatorio ponérselo al salir del coche en caso de avería en autopista o «route pour automobiles».

No son obligatorios: rueda de repuesto, bombillas de recambio, cadenas, neumáticos de invierno (recomendados por debajo de 7 °C).

### Documentos a bordo
«Carte d'identité», «permis de conduire», «certificat d'immatriculation» (parte 1 del permiso de circulación), «certificat d'assurance», «certificat de conformité» (COC) y, para coches de más de 4 años, el «certificat de visite» del «contrôle technique». La primera ITV es a los **4 años**, luego cada año (o cada 2 años si haces menos de 100.000 km y pasas sin defectos, según la región). Para vender un coche de ocasión a un particular hace falta el «Car-Pass» y la ITV de venta.`,
      },
      {
        id: 'ch02-controles',
        title: { fr: 'Les contrôles avant de partir', es: 'Comprobaciones antes de salir' },
        body: `### Alrededor del coche
Estado y presión de los **«pneus»** (presión en frío, según la pegatina de la puerta; también la rueda de repuesto), profundidad del dibujo (mínimo legal **1,6 mm**, aconsejable cambiar a 3 mm), luces y «clignotants», limpieza de cristales, retrovisores y matrícula, nada bajo el coche (fugas), carga bien sujeta.

### Bajo el capó (cada 1.000 km o antes de un viaje largo)
Niveles de «huile moteur» (motor frío, en llano, entre MIN y MAX), «liquide de refroidissement», «liquide de frein» (si baja, revisar: puede ser desgaste de pastillas o una fuga), «liquide lave-glace», estado de la «batterie» y de las «courroies».

### Dentro
Ajustar el **asiento** (pedales a fondo con la pierna algo flexionada, muñecas sobre el volante con brazos casi extendidos), el **«appuie-tête»** (parte superior a la altura de la coronilla, lo más cerca posible de la cabeza), los **«rétroviseurs»** (el interior encuadra la luneta; los exteriores dejan ver apenas el flanco del coche y el horizonte a la altura del tercio superior), el «ceinture» (plano, sin torcer, la banda baja sobre la cadera) y el volante. Comprobar que las puertas están cerradas y que no hay objetos sueltos.`,
      },
      {
        id: 'ch02-temoins',
        title: { fr: 'Les témoins du tableau de bord', es: 'Los testigos del salpicadero' },
        body: `Al dar el contacto se encienden brevemente muchos testigos: es normal si se apagan en unos segundos. El color indica la gravedad:

- **Rojo = peligro, detenerse** en cuanto sea seguro y apagar el motor: «pression d'huile» (aceitera: parar inmediatamente, riesgo de gripar el motor), «température du liquide de refroidissement» (termómetro: sobrecalentamiento; no abrir el radiador en caliente), «batterie» (fallo de carga), «liquide de frein / système de freinage» (!), «frein de parking» activado, puertas o capó abiertos, «ceinture» no abrochada, «airbag» averiado.
- **Naranja/amarillo = aviso**: puedes seguir con prudencia y revisar pronto: «moteur» (check engine), «ABS», «ESP», presión de neumáticos, reserva de combustible, «préchauffage» (diésel: esperar a que se apague antes de arrancar), pastillas de freno gastadas, antiniebla trasero encendido.
- **Verde/azul = información**: luces de cruce (verde), largas (azul), intermitentes, antiniebla delanteros.

Nunca tapes un testigo ni «esperes a ver»: un rojo no atendido convierte una avería barata en una grave.`,
      },
      {
        id: 'ch02-charge',
        title: { fr: 'Chargement et remorques', es: 'Carga y remolques' },
        body: `La carga debe ir **sujeta**, sin reducir la visibilidad ni la estabilidad, sin tapar luces ni matrícula, sin sobresalir lateralmente, y sin superar la MMA del vehículo (figura en el COC). Si sobresale por **detrás más de 1 m**, hay que señalar el extremo con un panel cuadrado rojo y blanco (y una luz roja de noche). Por delante no puede sobresalir más de 3,5 m desde el eje delantero. Carga en el techo: respetar el máximo del fabricante y sujetar con correas, no con «tendeurs» elásticos.

Con **remolque**: ≤ 750 kg de MMA con el B sin más; de 750 a 3.500 kg hace falta que la suma de MMA no pase de 3.500 kg (si no, B96 o BE). Un remolque de más de 750 kg necesita su propia matrícula, frenos y seguro; los ligeros llevan una reproducción de la matrícula del coche. Con remolque la distancia de frenado aumenta, el viento lateral afecta más y en autopista el límite baja a 90 km/h para conjuntos de más de 3,5 t. Comprobar el enganche, el cable de seguridad y las luces del remolque antes de salir.`,
      },
      {
        id: 'ch02-eco',
        title: { fr: 'Éco-conduite et environnement', es: 'Eco-conducción y medio ambiente' },
        body: `Preguntas de sentido común que caen cada vez más:

- Arrancar sin pisar el acelerador y salir enseguida: el motor se calienta rodando, no al ralentí.
- Subir de marcha pronto (gasolina ~2.500 rpm, diésel ~2.000) y anticipar: levantar el pie antes que frenar, usar el freno motor.
- Mantener la velocidad estable; a 120 km/h se consume un 20–30 % más que a 100.
- Presión de neumáticos correcta (−0,5 bar = +5 % de consumo), quitar baca y cofre si no se usan, no cargar peso inútil.
- Apagar el motor en paradas de más de ~20 s (el start-stop lo hace solo).
- Aire acondicionado con moderación; ventanillas cerradas en carretera.
- Mantenimiento al día; no verter aceites ni líquidos: llevarlos al «parc à conteneurs».

Las **«zones de basses émissions» (LEZ)** de Bruselas, Amberes y Gante prohíben la entrada a vehículos muy contaminantes según su norma Euro; las cámaras multan automáticamente.`,
      },
    ],
  },

  /* ===================================================================== */
  {
    id: 'ch03-conducteur',
    number: 3,
    title: { fr: 'Le conducteur', es: 'El conductor' },
    theme: 'alcool',
    intro:
      'Aptitud para conducir, cinturón y niños, teléfono y distracciones, alcohol, drogas, medicamentos y fatiga. Alcohol y distancia de seguridad son temas de falta grave.',
    sections: [
      {
        id: 'ch03-aptitude',
        title: { fr: "L'aptitude à conduire", es: 'La aptitud para conducir' },
        body: `El conductor debe estar **«en état de conduire»**: con las aptitudes físicas (vista, oído, reflejos) y mentales necesarias, sin estar bajo el efecto del alcohol, drogas, medicamentos incompatibles o la fatiga. Si llevas gafas o lentillas por prescripción, es obligatorio usarlas (código 01 en el permiso). Ciertas enfermedades (epilepsia, diabetes tratada con insulina, problemas cardiacos, apnea del sueño) exigen un certificado médico de aptitud; conducir sin él es infracción.

El conductor debe tener el **control** del vehículo en todo momento, las manos libres (no comer, maquillarse o manipular objetos), y la visibilidad despejada: parabrisas deshelado y sin vaho, sin pegatinas ni objetos colgados que estorben, carga que no tape las ventanillas.`,
      },
      {
        id: 'ch03-ceinture',
        title: { fr: 'Ceinture et enfants', es: 'Cinturón y niños' },
        body: `**«Ceinture de sécurité»** obligatoria para todos los ocupantes, delante y detrás, en todo trayecto, también en ciudad y con airbag. A 50 km/h, un choque sin cinturón equivale a caer desde un tercer piso. El conductor es responsable de que los **menores de 18** vayan sujetos. Excepciones con certificado médico, o para la marcha atrás y los taxis con clientes (no para el taxista).

**Niños de menos de 1,35 m**: en un «dispositif de retenue» homologado (silla, «rehausseur»), adaptado a su peso/talla, delante o detrás. Una silla a contramarcha delante exige **desactivar el airbag** del pasajero. Si no hay sitio para una tercera silla detrás, un niño de 3 años o más puede ir con el cinturón de adulto en el asiento trasero. Niños de más de 1,35 m: cinturón normal. Un bebé nunca en brazos.

Otras reglas: no llevar más pasajeros que plazas con cinturón; no transportar personas en el maletero ni en un remolque; las puertas se abren mirando antes si viene alguien (técnica «hollandaise»: abrir con la mano más alejada de la puerta, que obliga a girar el cuerpo y mirar atrás).`,
      },
      {
        id: 'ch03-distraction',
        title: { fr: 'Téléphone et distractions', es: 'Teléfono y distracciones' },
        body: `Está prohibido, mientras se conduce (también parado en un semáforo o en un atasco), **tener en la mano o manipular** un «appareil mobile avec écran» (teléfono, tablet, GPS portátil) que no esté fijado en un **soporte**. Está permitido usar el manos libres y el teléfono en un soporte, aunque la conversación sigue reduciendo la atención. Infracción de **3.er grado** (multa inmediata de 174 €, hasta tribunal).

Tres tipos de distracción: **visual** (apartar la vista: a 90 km/h, 2 s de mirar el móvil = 50 m a ciegas), **manual** (soltar el volante) y **cognitiva** (pensar en otra cosa: una conversación intensa, aunque sea con un pasajero). Programar GPS y música antes de salir; si hay que atender algo, parar en un lugar seguro.`,
      },
      {
        id: 'ch03-alcool',
        title: { fr: "L'alcool", es: 'El alcohol' },
        body: `### Las cifras
- Límite: **0,5 g/l** de sangre (0,22 mg/l de aire espirado). «Conducteurs professionnels» (camión, bus, taxi, transporte de personas): **0,2 g/l**.
- Una «unité» estándar (25 cl de cerveza, 10 cl de vino, 3 cl de licor) sube la tasa unos **0,2–0,3 g/l** según peso, sexo y estómago; el pico llega 30–60 min después. El hígado elimina solo **~0,15 g/l por hora**: tras una fiesta puedes estar por encima del límite a la mañana siguiente. Café, agua, ducha o vomitar no sirven.

### Efectos
Desde 0,3 g/l: campo visual más estrecho, peor percepción de distancias y velocidad, reflejos más lentos, exceso de confianza. A 0,5 g/l el riesgo de accidente mortal se multiplica por 2; a 0,8 por 10; a 1,5 por 25.

### Sanciones
- 0,5–0,8 g/l: multa (179 €) e **«interdiction de conduire» de 3 h** en el sitio.
- ≥ 0,8 g/l: **«retrait immédiat du permis» 6 h mínimo**, citación ante el «tribunal de police», multa y posible «déchéance». A partir de 1,2 g/l o reincidencia, la déchéance es obligatoria y pueden imponerse exámenes médicos y psicológicos y el «éthylotest antidémarrage» (alcolock).
- **Negarse** al test de aliento o al análisis de sangre se castiga como una tasa alta.
- «Ivresse» (embriaguez manifiesta, independiente de la tasa): también delito.

Con el **permiso provisional**, cualquier alcoholemia punible conlleva la retirada del PCP.`,
      },
      {
        id: 'ch03-drogues',
        title: { fr: 'Drogues et médicaments', es: 'Drogas y medicamentos' },
        body: `**Drogas: tolerancia cero.** La policía hace un «test salivaire»; cualquier rastro de cannabis, cocaína, anfetaminas, MDMA u opiáceos → «retrait immédiat du permis» de 12 h, tribunal y «déchéance». El cannabis sigue detectándose horas o días después y afecta a la coordinación, la atención y la percepción del tiempo; las drogas estimulantes dan una falsa sensación de control.

**Medicamentos**: somníferos, tranquilizantes, antidepresivos, antihistamínicos (alergia), jarabes con codeína, algunos analgésicos y antiepilépticos reducen la vigilancia; el pictograma de un coche en la caja (negro, naranja o rojo según el riesgo) lo indica. Pregunta al médico o al farmacéutico, lee el prospecto, no combines con alcohol, y no conduzcas al empezar un tratamiento hasta saber cómo te afecta.`,
      },
      {
        id: 'ch03-fatigue',
        title: { fr: 'La fatigue', es: 'La fatiga' },
        body: `La **«somnolence»** causa en Bélgica alrededor de 1 de cada 5 accidentes graves en autopista. Señales: bostezos, «paupières lourdes», picor de ojos, dificultad para mantener la trayectoria o la velocidad, no recordar los últimos kilómetros, «micro-sommeils» de 1–4 s (a 120 km/h, 130 m a ciegas).

Horas de mayor riesgo: **entre 2 y 5 de la madrugada** y **a primera hora de la tarde** (13–15 h). Factores: dormir poco, comida copiosa, alcohol, medicamentos, calor en el habitáculo, monotonía de la autopista.

Lo único eficaz: **parar y dormir 15–20 minutos** (más lleva a inercia del sueño). El café, abrir la ventanilla o subir la música dan unos minutos. En viajes largos, pausa de 15 min cada **2 horas** o 200 km, turnarse al volante, no salir de noche tras un día de trabajo.`,
      },
    ],
  },

  /* ===================================================================== */
  {
    id: 'ch04-voie',
    number: 4,
    title: { fr: 'La voie publique et ses usagers', es: 'La vía pública y sus usuarios' },
    theme: 'permis',
    intro:
      'Las definiciones que usa el código. Muchas preguntas se fallan por no saber qué es exactamente la «chaussée», el «accotement» o una «agglomération».',
    sections: [
      {
        id: 'ch04-definitions',
        title: { fr: 'Les parties de la voie publique', es: 'Las partes de la vía pública' },
        body: `- **«Voie publique»**: todo el espacio abierto a la circulación: calzada, aceras, arcenes, pistas ciclables, aparcamientos públicos.
- **«Chaussée»**: la parte destinada a la circulación de vehículos en general. Puede dividirse en **«bandes de circulation»** (carriles) por marcas. Una «voie publique» puede tener varias chaussées separadas por una «berme centrale».
- **«Accotement»**: la franja entre la calzada y la acera/cuneta, al mismo nivel («accotement de plain-pied») o en saliente («accotement en saillie», elevado). Hors agglomération se puede estacionar en el accotement de plain-pied; en el de saillie solo si queda 1,5 m para peatones.
- **«Trottoir»**: acera, para peatones; en saliente o separada por marcas. Vehículos: prohibido circular, parar o estacionar (salvo señal E9 que lo permita).
- **«Piste cyclable»**: parte reservada a ciclos, indicada por D7 o por dos líneas blancas discontinuas paralelas. Distinta de la **«bande cyclable suggérée»** (chevrons o color, no reservada).
- **«Site spécial franchissable»**: carril reservado a bus/tram (F18) que los demás pueden cruzar.
- **«Refuge»**: isleta elevada para peatones o viajeros. **«Îlot directionnel»**: isleta que canaliza el tráfico; no se circula por encima.
- **«Agglomération»**: zona urbanizada entre las señales **F1** (nombre) y **F3** (tachado). Allí rigen el 50 (30 en Bruselas) y reglas propias (bocina, largas, estacionamiento).
- **«Carrefour»**: cruce, confluencia o bifurcación de vías. **«Passage à niveau»**: cruce con vía férrea.
- **«Autoroute»** (F5/F7) y **«route pour automobiles»** (F9/F11): reservadas a vehículos a motor.`,
      },
      {
        id: 'ch04-usagers',
        title: { fr: 'Les usagers', es: 'Los usuarios' },
        body: `- **«Conducteur»**: quien conduce un vehículo o guía animales de tiro o de carga. Un ciclista es conductor; quien lleva la bici a pie es **«piéton»**.
- **«Piéton»**: a pie, en silla de ruedas, con patines o con un «engin de déplacement non motorisé» (patinete sin motor). Usa la acera o el accotement; sin acera, el lado izquierdo de la calzada (de cara al tráfico) fuera de población. Debe cruzar por los pasos si hay uno a menos de 20–30 m.
- **«Usagers faibles»**: peatones, ciclistas, usuarios de patinete, PMR (personas con movilidad reducida). Tienen protección especial: indemnización automática de daños corporales por el seguro del vehículo implicado (art. 29bis).
- **«Cycle»**, **«cyclomoteur»** (clase A ≤ 25 km/h, clase B ≤ 45 km/h, permiso AM), **«motocyclette»**, **«engin de déplacement motorisé»** (patinete eléctrico, monociclo, segway: máx. 25 km/h, mínimo 16 años salvo zonas de encuentro/peatonales/juegos, nunca por la acera, sin pasajero, se asimila al ciclista).
- **«Véhicule prioritaire»**: con luz azul y sirena especial.
- **«Véhicule sur rails»**: el tranvía; no es un vehículo a motor a efectos de prioridad y tiene reglas propias.
- **«Agent qualifié»**: policía, inspectores, agentes de la comuna habilitados, «surveillants habilités» en escuelas (con disco), que pueden dar órdenes de circulación.`,
      },
      {
        id: 'ch04-hierarchie',
        title: { fr: 'La hiérarchie des règles', es: 'La jerarquía de las reglas' },
        body: `Cuando varias reglas podrían aplicarse a la vez, el orden es siempre:

1. Las **órdenes de un «agent qualifié»**.
2. Los **«feux lumineux»** (semáforos de circulación).
3. Las **«signaux routiers»** (señales verticales) y las **«marques routières»** (marcas en el suelo).
4. Las **reglas generales** del código (prioridad de la derecha, límites por defecto…).

Ejemplo: ámbar intermitente = el semáforo no cuenta → miras las señales → si no hay, prioridad de la derecha. Un agente que te hace seña de pasar con el semáforo en rojo: pasas.`,
      },
    ],
  },

  /* ===================================================================== */
  {
    id: 'ch05-signaux',
    number: 5,
    title: { fr: 'Agents, feux lumineux et signaux', es: 'Agentes, semáforos y señales' },
    theme: 'signaux',
    intro:
      'Cómo leer las órdenes de un agente, todos los tipos de semáforo y la lógica de las familias de señales. El catálogo completo de señales está en la pestaña «Signaux».',
    sections: [
      {
        id: 'ch05-agents',
        title: { fr: 'Les injonctions des agents', es: 'Las órdenes de los agentes' },
        body: `- **Brazo levantado verticalmente**: «arrêt» para **todos** (equivale al rojo). Si ya estás en el cruce, lo despejas.
- **Brazo(s) extendido(s) horizontalmente**: arrêt para los usuarios que vienen de **frente o por detrás** del agente (los que miran a su pecho o a su espalda); pueden pasar los que están en la prolongación de los brazos.
- **Brazo agitado transversalmente**: orden de **avanzar** en esa dirección.
- **Movimiento vertical del brazo** (arriba-abajo): **reducir** la velocidad.
- **Disco rojo** o luz roja de un vehículo de policía, o la mención «POLICE / STOP» en el panel luminoso: detenerse.
- Un «surveillant habilité» con el disco C3 detiene el tráfico para que crucen niños o grupos.

Siempre hay que **«obtempérer»** (obedecer) y presentar los documentos. Una orden del agente prevalece sobre semáforos y señales.`,
      },
      {
        id: 'ch05-feux',
        title: { fr: 'Les feux lumineux de circulation', es: 'Los semáforos' },
        body: `### Semáforo tricolor
- **Rojo**: prohibido pasar la «ligne d'arrêt»; sin línea, parar antes del paso de peatones o del semáforo.
- **Naranja fijo**: parar, salvo que estés tan cerca que no puedas hacerlo con seguridad.
- **Verde**: pasar, cediendo a peatones y ciclistas que ya cruzan y sin bloquear el cruce.
- **Naranja intermitente**: semáforo fuera de servicio: prudencia, valen señales y prioridad de la derecha.
- Los semáforos se colocan a la derecha y pueden repetirse a la izquierda o arriba; si está averiado se aplican las señales.

### Flechas
- **Flecha verde** (con rojo o naranja en el disco): autoriza únicamente esa dirección, cediendo a peatones y ciclistas de los pasos que atraviesas.
- **Flecha roja** / **naranja**: prohibición o aviso solo para esa dirección; las demás siguen el disco.
- Un semáforo con tres flechas verdes = todas las direcciones permitidas en modo «conflicto cero» (los peatones están en rojo).

### Otros semáforos
- **Peatones** (silueta roja/verde) y **ciclistas** (bici roja/verde, a veces con cuenta atrás).
- **B22 / B23** bajo el semáforo: los ciclistas pueden girar a la derecha / seguir recto en rojo cediendo el paso; nunca los coches.
- **Semáforos de carril** (cruz roja / flecha verde sobre un carril): el carril está cerrado / abierto; flecha amarilla intermitente: cambiar de carril.
- **Semáforos de tranvía/bus** (barras blancas): no te conciernen, pero indican que el tram va a moverse.
- **Paso a nivel**: luz roja intermitente (única o doble alternante) = detenerse; luz blanca intermitente = paso libre pero con prudencia.
- **Luz naranja intermitente aislada** en un lugar peligroso: reducir y extremar la atención.
- Semáforo con **cámara** (señal F*): no cambia la regla, solo multa.`,
      },
      {
        id: 'ch05-familles',
        title: { fr: 'Les familles de signaux', es: 'Las familias de señales' },
        body: `La letra del código oficial identifica la familia y, con ella, la forma y el color:

- **A — Danger**: triángulo con borde rojo. Fuera de población se colocan a **unos 150 m** del peligro; en población justo antes. Una placa puede indicar la distancia o la longitud del tramo.
- **B — Priorité**: formas únicas (B1 triángulo invertido, B5 octógono, B9 rombo amarillo, B15/B17 triángulos con flecha o cruz, B19/B21 paso estrecho, B22/B23 ciclistas en rojo).
- **C — Interdiction**: círculo con borde rojo (C1 sentido prohibido es el disco rojo con barra). El fin de prohibición es la misma señal en gris tachada (C37, C45, C46).
- **D — Obligation**: círculo azul. Direcciones obligatorias (D1), rotonda (D5), pista ciclable (D7), vías compartidas (D9/D10), cadenas/neumáticos (D11).
- **E — Arrêt et stationnement**: círculos azules con borde rojo (E1 una barra = prohibido estacionar; E3 cruz = prohibido parar y estacionar; E5/E7 alterno) y rectángulos azules de estacionamiento autorizado (E9a–E9h) con la manera de aparcar.
- **F — Indication**: rectángulos (azules o blancos): agglomération (F1/F3), zonas (F4a/F4b zona 30, F12a/F12b residencial, F103/F105 peatonal, F111 calle ciclista), autoroute (F5/F7), route pour automobiles (F9/F11), sentido único (F19), callejón sin salida (F45), carriles bus (F17/F18), direcciones (F25 tunnel, F29–F37), paso de peatones (F49), paso de ciclistas (F50), etc.
- **Placas adicionales (M, G, X…)**: bajo la señal, precisan a quién se aplica (M1–M8 ciclistas/ciclomotores: «excepté» o «uniquement»), distancia, tramo, horario, categoría de vehículos.

Reglas de lectura: una señal vale **hasta el próximo cruce** salvo si lleva placa de distancia/tramo o es de **zona** (vale hasta la señal de fin). Una señal temporal (obras, fondo amarillo) prevalece sobre la permanente. Las señales en el lado izquierdo o encima de un carril solo conciernen a ese carril.`,
      },
    ],
  },
]
