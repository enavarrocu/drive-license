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
- **B96**: código que amplía B hasta 4.250 kg de conjunto (se obtiene con un examen práctico). **BE**: remolque hasta 3.500 kg.
- **C / CE** (21): camiones. **D / DE** (24): autobuses. **G**: tractores agrícolas.

Con el permiso **B** también puedes conducir: ciclomotores y cuadriciclos ligeros (AM), tractores agrícolas de uso privado, y motos ligeras A1 (≤ 125 cm³, ≤ 11 kW) **solo en Bélgica**: si obtuviste el B después del 1 de mayo de 2011, hace falta además una formación práctica de 4 horas en autoescuela, que añade el código 372 al permiso.`,
      },
      {
        id: 'ch01-theorique',
        title: { fr: "L'examen théorique", es: 'El examen teórico' },
        body: `Se puede presentar desde los **17 años**. En Bruselas se hace en los centros de examen de Anderlecht o Schaerbeek (unos 19 €). Para hacer después el práctico en Bruselas, el teórico tiene que haberse aprobado en Bruselas.

- **50 preguntas** en ordenador, con **15 segundos** como máximo por pregunta (unos 30 minutos en total). Una respuesta validada no se cambia.
- Se aprueba con **41/50**. Error normal: −1. Error sobre una infracción grave (prioridad, velocidad, adelantamiento, alcohol, distancia de seguridad…): **−5**. Dos errores graves = suspenso automático.
- Tras **dos suspensos**, hay que seguir una formación de **12 h** en una autoescuela antes de volver a presentarse.
- El aprobado vale **3 años**: el práctico tiene que hacerse dentro de ese plazo; si no, se repite el teórico.
- Lengua: francés o neerlandés; en Bruselas se puede pedir un intérprete de alemán, inglés o lengua de signos (50 €).`,
      },
      {
        id: 'ch01-provisoire',
        title: { fr: 'Le permis de conduire provisoire', es: 'El permiso provisional' },
        body: `Con el teórico aprobado pides en la comuna el «permis de conduire provisoire» (PCP). Tres modelos:

- **M36** («avec guide»): desde **17 años**, válido **36 meses**, siempre acompañado de uno de los guías inscritos (máximo dos).
- **M18** («sans guide»): desde **18 años**, tras **20 horas** en autoescuela, válido **18 meses** (no renovable), puedes conducir solo.
- **M12**: si el M36 o el M18 caduca sin aprobar, un provisional de **12 meses** con guía, tras 6 h de autoescuela, que solo se concede una vez. Tres años después de la caducidad se puede volver a pedir un M36 o un M18.

### Duración mínima de las prácticas en Bruselas (antes del práctico)
| Vía | Formación en autoescuela | Prácticas mínimas |
|---|---|---|
| Libre, con guía | ninguna | **9 meses** |
| Libre + autoescuela | 14 h | **6 meses** |
| Autoescuela + M18 | 20 h | **3 meses** |
| Solo autoescuela | 30 h (examen con la misma escuela) | ninguna |

Durante las prácticas se lleva un «journal de bord» (diario), que se comprueba en el examen.

### Condiciones del «guide»
Tener el permiso B desde **8 años** como mínimo, no estar ni haber estado en los últimos 3 años bajo una «déchéance du droit de conduire», estar inscrito en el PCP y sentarse delante, al lado del aprendiz.

### Lo que NO puedes hacer con el provisional
- Conducir de **22 h a 6 h** los **viernes, sábados, domingos, vísperas de festivo y festivos** (todos los modelos).
- Llevar pasajeros: con el **M36**, solo los guías inscritos (o un instructor); con el **M18**, como máximo **dos** personas que cumplan las condiciones de guía.
- Llevar remolque.
- Conducir en el extranjero (el PCP belga solo vale en Bélgica).
- Olvidar la **placa «L»** blanca con L roja, bien visible detrás.`,
      },
      {
        id: 'ch01-pratique',
        title: { fr: "Avant et pendant l'examen pratique", es: 'Antes y durante el examen práctico' },
        body: `En Bruselas, el práctico (desde **18 años**) tiene dos pruebas. La primera es el **«test de perception des risques»**: tras unas secuencias de prueba, 5 vídeos en los que haces clic en cuanto aparece un riesgo (puede haber varios en el mismo vídeo); el aprobado vale 1 año. La segunda es la prueba en la vía pública. En Valonia, la «filière libre» exige además un «rendez-vous pédagogique» de 3 h con el guía. En Bruselas la formación de primeros auxilios es voluntaria y no cuenta para el permiso.

En la vía pública: comprobaciones previas, dos maniobras (aparcar marcha atrás detrás de un vehículo y dar media vuelta en una calle estrecha) y circulación en tráfico real, con unos 10–15 minutos de conducción autónoma hacia un destino (GPS o señales). Se hace con el coche de la autoescuela o con el propio: placa L, segundo retrovisor interior (salvo con M18) y que cumpla la LEZ. Tras **dos suspensos**, 6 h de autoescuela obligatorias antes de volver.

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
- un **«gilet rétroréfléchissant»** (chaleco), al alcance del conductor (en el habitáculo, no en el maletero): es obligatorio ponérselo al salir del coche averiado en autopista o «route pour automobiles» si ha quedado donde está prohibido parar (art. 51.4).

No son obligatorios: rueda de repuesto, bombillas de recambio, cadenas, neumáticos de invierno (recomendados por debajo de 7 °C).

### Documentos a bordo
«Carte d'identité», «permis de conduire», «certificat d'immatriculation» (parte 1 del permiso de circulación), «certificat d'assurance», «certificat de conformité» (COC) y, para coches de más de 4 años, el «certificat de visite» del «contrôle technique». La primera ITV es a los **4 años**; después es periódica, con una frecuencia que depende de la edad del coche y de la región. Para vender un coche de ocasión a un particular hace falta el «Car-Pass» y la ITV de venta. La placa de matrícula es del titular, no del coche: al venderlo, te la quedas.`,
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
        body: `La carga debe ir **sujeta**, sin reducir la visibilidad ni la estabilidad, sin tapar luces ni matrícula, sin sobresalir lateralmente, y sin superar la MMA del vehículo (figura en el COC). Por detrás puede sobresalir **1 m** como máximo (3 m para piezas indivisibles largas); si sobresale **más de 1 m**, hay que señalar el extremo con un panel cuadrado de 50 cm con bandas rojas y blancas (y, cuando las luces son obligatorias, una luz roja y catadióptricos naranjas laterales). Por delante la carga **no puede sobresalir** del vehículo (art. 46–47). Carga en el techo: respetar el máximo del fabricante y sujetar con correas, no con «tendeurs» elásticos.

Con **remolque**: ≤ 750 kg de MMA con el B sin más; de 750 a 3.500 kg hace falta que la suma de MMA no pase de 3.500 kg (si no, B96 o BE). Un remolque de más de 750 kg necesita su propia matrícula, frenos y seguro; los ligeros llevan una reproducción de la matrícula del coche. Con remolque la distancia de frenado aumenta, el viento lateral afecta más y en autopista el límite baja a 90 km/h para conjuntos de MMA superior a 3,5 t. Comprobar el enganche, el cable de seguridad y las luces del remolque antes de salir.`,
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

Las **«zones de basses émissions» (LEZ)** (Bruselas, Amberes, Gante…) prohíben la entrada a vehículos muy contaminantes según su norma Euro y su combustible; las cámaras multan automáticamente (detalle de la LEZ de Bruselas en el capítulo 20).`,
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
        body: `**«Ceinture de sécurité»** obligatoria para todos los ocupantes, delante y detrás, en todo trayecto, también en ciudad y con airbag. A 50 km/h, un choque sin cinturón equivale a caer desde un tercer piso. El conductor es responsable de que los **menores de 18** vayan sujetos. Excepciones (art. 35.2): dispensa médica, el conductor que hace marcha atrás y el taxista cuando lleva a un cliente (los pasajeros del taxi sí deben llevarlo).

**Niños de menos de 1,35 m** (y menores de 18): en un «dispositif de retenue» homologado (silla, «rehausseur»), adaptado a su peso/talla, delante o detrás. Una silla a contramarcha delante exige **desactivar el airbag** del pasajero. Si no hay sitio para una tercera silla detrás, un niño de 3 años o más puede ir con el cinturón de adulto en el asiento trasero. Niños de más de 1,35 m: cinturón normal. Un bebé nunca en brazos. Para un trayecto corto y ocasional sin sillas disponibles, los niños de 3 años o más pueden ir detrás solo con el cinturón, **salvo si conduce uno de sus padres** (art. 35.1.2).

Otras reglas: no llevar más pasajeros que plazas con cinturón; no transportar personas en el maletero ni en un remolque; las puertas se abren mirando antes si viene alguien (técnica «hollandaise»: abrir con la mano más alejada de la puerta, que obliga a girar el cuerpo y mirar atrás).`,
      },
      {
        id: 'ch03-distraction',
        title: { fr: 'Téléphone et distractions', es: 'Teléfono y distracciones' },
        body: `Está prohibido, mientras se conduce (también parado en un semáforo o en un atasco), **tener en la mano o manipular** un «appareil mobile avec écran» (teléfono, tablet, GPS portátil) que no esté fijado en un **soporte**. Está permitido usar el manos libres y el teléfono en un soporte, aunque la conversación sigue reduciendo la atención. Infracción de **3.er grado** (multa inmediata de 191 € desde julio de 2026) y, desde febrero de 2026, **retirada inmediata del permiso durante 15 días**.

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
- 0,5–0,8 g/l: multa (197 € si se paga en el acto, desde julio de 2026) e **«interdiction de conduire» de 3 h** en el sitio.
- ≥ 0,8 g/l: «interdiction de conduire» de **6 h** como mínimo y **«retrait immédiat du permis» de 15 días** (aplicado en todo el país desde febrero de 2026), multa más alta, posible citación ante el «tribunal de police» y «déchéance».
- Con tasas muy altas (≥ 1,8 g/l) o en caso de **reincidencia**, el juez debe en principio imponer el «éthylotest antidémarrage» (alcolock) y puede exigir exámenes médicos y psicológicos.
- **Negarse** al test de aliento o al análisis de sangre se castiga como una tasa alta.
- «Ivresse» (embriaguez manifiesta, independiente de la tasa): también delito.`,
      },
      {
        id: 'ch03-drogues',
        title: { fr: 'Drogues et médicaments', es: 'Drogas y medicamentos' },
        body: `**Drogas: tolerancia cero.** La policía hace un «test salivaire»; cualquier rastro de cannabis, cocaína, anfetaminas, MDMA u opiáceos → prohibición de conducir de 12 h, «retrait immédiat du permis» (15 días), tribunal y posible «déchéance». El cannabis sigue detectándose horas o días después y afecta a la coordinación, la atención y la percepción del tiempo; las drogas estimulantes dan una falsa sensación de control.

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
- **«Accotement»**: la franja entre la calzada y la acera/cuneta, al mismo nivel («accotement de plain-pied») o en saliente («accotement en saillie», elevado). Se estaciona en el accotement de plain-pied y, fuera de población, en cualquier accotement; si los peatones tienen que usarlo, hay que dejarles una franja de **1,5 m** (art. 23.1).
- **«Trottoir»**: acera, para peatones; en saliente o separada por marcas. Vehículos: prohibido circular, parar o estacionar (salvo señal E9 que lo permita).
- **«Piste cyclable»**: parte reservada a ciclos, indicada por D7 o por dos líneas blancas discontinuas paralelas. Distinta de la **«bande cyclable suggérée»** (chevrons o color, no reservada).
- **«Site spécial franchissable»**: carril reservado a bus/tram (F18) que los demás pueden cruzar.
- **«Refuge»**: isleta elevada para peatones o viajeros. **«Îlot directionnel»**: isleta que canaliza el tráfico; no se circula por encima.
- **«Agglomération»**: zona urbanizada entre las señales **F1a/F1b** (nombre) y **F3a/F3b** (nombre tachado). Allí rigen el 50 (30 en Bruselas) y reglas propias: por ejemplo, la bocina solo se usa para evitar un accidente (fuera de población, también para avisar al que vas a adelantar).
- **«Carrefour»**: cruce, confluencia o bifurcación de vías. **«Passage à niveau»**: cruce con vía férrea.
- **«Autoroute»** (F5/F7) y **«route pour automobiles»** (F9/F11): reservadas a vehículos a motor.`,
      },
      {
        id: 'ch04-usagers',
        title: { fr: 'Les usagers', es: 'Los usuarios' },
        body: `- **«Conducteur»**: quien conduce un vehículo o guía animales de tiro o de carga. Un ciclista es conductor; quien lleva la bici a pie es **«piéton»**.
- **«Piéton»**: a pie, o empujando a mano una silla de ruedas, un cochecito o una bici. Quien usa un «engin de déplacement non motorisé» (patines, patinete sin motor) es peatón si va al paso y ciclista si va más rápido (art. 7bis). Usa la acera o el accotement; si tiene que ir por la calzada, por el borde **izquierdo** (de cara al tráfico), o el derecho si es más seguro. Debe cruzar por el paso si hay uno a menos de unos **20 m**.
- **«Usagers faibles»**: peatones, ciclistas, usuarios de patinete, PMR (personas con movilidad reducida). Tienen protección especial: indemnización automática de daños corporales por el seguro del vehículo implicado (art. 29bis).
- **«Cycle»**, **«cyclomoteur»** (clase A ≤ 25 km/h, clase B ≤ 45 km/h, permiso AM), **«motocyclette»**, **«engin de déplacement motorisé»** (patinete eléctrico, monociclo, segway: máx. 25 km/h, mínimo 16 años salvo zonas de encuentro/peatonales/juegos, nunca por la acera, sin pasajero, se asimila al ciclista).
- **«Véhicule prioritaire»**: con luz azul y sirena especial.
- **«Véhicule sur rails»**: el tranvía; no es un vehículo a motor a efectos de prioridad y tiene reglas propias.
- **«Agent qualifié»**: policía y otros agentes habilitados (art. 3), que pueden dar órdenes de circulación. También hay que obedecer a los «surveillants habilités» de las escuelas, que paran el tráfico con un disco C3 para que crucen los niños.`,
      },
      {
        id: 'ch04-hierarchie',
        title: { fr: 'La hiérarchie des règles', es: 'La jerarquía de las reglas' },
        body: `Cuando varias reglas podrían aplicarse a la vez, el orden es siempre:

1. Las **órdenes de un «agent qualifié»**.
2. Los **«feux lumineux»** (semáforos de circulación).
3. Las **«signaux routiers»** (señales verticales) y las **«marques routières»** (marcas en el suelo).
4. Las **reglas generales** del código (prioridad de la derecha, límites por defecto…).

Un semáforo en funcionamiento deja sin efecto las señales de prioridad de esa vía (art. 6.3). Ejemplo: ámbar intermitente = el semáforo no regula la prioridad → miras las señales → si no hay, prioridad de la derecha. Un agente que te hace seña de pasar con el semáforo en rojo: pasas.`,
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
- **Brazo(s) extendido(s) horizontalmente**: arrêt para los usuarios cuya dirección **corta** la indicada por los brazos (los que llegan de frente o por detrás del agente); pueden pasar los que están en la prolongación de los brazos.
- **Balanceo transversal de una luz roja**: arrêt para los conductores hacia los que se dirige la luz.
- Otros gestos habituales: brazo que hace señas para **avanzar**; movimiento de arriba abajo para **reducir** la velocidad. Un panel «STOP POLICE» también obliga a detenerse.
- Un «surveillant habilité» con el disco C3 detiene el tráfico para que crucen niños o grupos.

Siempre hay que **«obtempérer»** (obedecer) y presentar los documentos. Una orden del agente prevalece sobre semáforos y señales.`,
      },
      {
        id: 'ch05-feux',
        title: { fr: 'Les feux lumineux de circulation', es: 'Los semáforos' },
        body: `### Semáforo tricolor
- **Rojo**: prohibido pasar la «ligne d'arrêt»; sin línea, el propio semáforo (y si hay un paso de peatones, paras antes de él).
- **Naranja fijo**: parar, salvo que estés tan cerca que no puedas hacerlo con seguridad.
- **Verde**: pasar, dejando terminar de cruzar a los peatones ya comprometidos y sin entrar si te vas a quedar bloqueado en el cruce.
- **Naranja intermitente**: paso autorizado con prudencia redoblada; no cambia la prioridad: valen las señales y, si no hay, la prioridad de la derecha.
- Los semáforos se colocan a la derecha y pueden repetirse a la izquierda o arriba; si está averiado se aplican las señales.

### Flechas
- **Flecha verde** encendida junto al rojo o al naranja del disco: autoriza únicamente esa dirección, cediendo el paso a los conductores que llegan regularmente de otras direcciones y a los peatones.
- **Flechas** roja / naranja / verde que sustituyen al disco: mismo significado que el disco, pero solo para la dirección de la flecha.
- Una **flecha verde sola hacia la izquierda a la salida del cruce**: el tráfico de frente está parado en rojo, puedes terminar el giro a la izquierda.

### Otros semáforos
- **Peatones** (silueta roja/verde) y **ciclistas** (bici roja/verde, a veces con cuenta atrás).
- **B22 / B23** junto al semáforo: los ciclistas (y speed pedelecs) pueden girar a la derecha / seguir recto en rojo o naranja cediendo el paso; nunca los coches.
- **Semáforos de carril** (cruz roja / flecha verde hacia abajo sobre un carril): el carril está cerrado / abierto; flecha naranja oblicua: abandonar ese carril hacia el lado de la flecha.
- **Semáforos de tranvía/bus** (barras, círculos y triángulos blancos sobre fondo negro): no te conciernen, pero indican que el tram o el bus va a moverse.
- **Paso a nivel**: dos luces rojas intermitentes alternas = detenerse; luz blanca intermitente = paso autorizado, con prudencia.
- **Luz naranja intermitente aislada** en un lugar peligroso: reducir y extremar la atención.
- Un semáforo con **cámara** no cambia la regla, solo permite multar.`,
      },
      {
        id: 'ch05-familles',
        title: { fr: 'Les familles de signaux', es: 'Las familias de señales' },
        body: `La letra del código oficial identifica la familia y, con ella, la forma y el color:

- **A — Danger**: triángulo con borde rojo. Se colocan a **unos 150 m** del peligro (art. 66.2); si la distancia es otra, una placa la indica. Excepción: las cruces de San Andrés (A45/A47) van en el mismo paso a nivel. Otra placa puede indicar la longitud del tramo peligroso.
- **B — Priorité**: formas únicas (B1 triángulo invertido, B5 octógono, B9 rombo amarillo, B15/B17 triángulos con flecha o cruz, B19/B21 paso estrecho, B22/B23 ciclistas en rojo).
- **C — Interdiction**: círculo con borde rojo (C1 sentido prohibido es el disco rojo con barra blanca). El fin de prohibición es la misma señal en gris tachada (C37, C41, C45, C46).
- **D — Obligation**: círculo azul. Direcciones obligatorias (D1, D3), rotonda (D5), pista ciclable (D7), partes reservadas a peatones y ciclistas (D9/D10), camino obligatorio para peatones (D11) y para jinetes (D13).
- **E — Arrêt et stationnement**: círculos azules con borde rojo (E1 una barra = prohibido estacionar; E3 cruz = prohibido parar y estacionar; E5/E7 alterno) y cuadrados azules con «P» de estacionamiento autorizado o reservado (E9a–E9j), que también pueden indicar dónde aparcar (acera, calzada).
- **F — Indication**: rectángulos (azules o blancos): agglomération (F1a/F3a), zonas (F4a/F4b zona 30, F12a/F12b residencial, F103/F105 peatonal, F111/F113 zona ciclista), autoroute (F5/F7), túnel (F8), route pour automobiles (F9/F11), sentido único (F19), callejón sin salida (F45), carriles bus (F17/F18), preaviso y dirección (F25–F37), paso de peatones (F49), paso de ciclistas (F50), etc.
- **Placas adicionales**: bajo la señal, precisan a quién se aplica (modelos M, negro sobre blanco, para bicis y ciclomotores: «excepté» o «uniquement»), distancia, tramo, horario o categoría de vehículos.

Reglas de lectura: las de prohibición (C) y las E valen en general **hasta el próximo cruce** salvo si llevan placa de distancia/tramo o son de **zona** (valen hasta la señal de fin). Una señal temporal (obras, fondo amarillo o naranja) prevalece sobre la permanente. Una señal colocada encima de un carril, o con F91, solo concierne a ese carril.`,
      },
    ],
  },
]
