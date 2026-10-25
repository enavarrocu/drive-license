# CLAUDE.md — Permis Trainer (Nuxt + SQLite)

Guía para trabajar en este repo con Claude Code. Léela entera antes de tocar código.

## Qué es

App de entrenamiento para el **examen teórico belga del permis B (Bruselas)**, para
hispanohablantes que hacen el examen en **francés**. Sustituye al libro: curso completo
en español con los términos franceses, banco de preguntas FR con traducción ES, escenas
de cruce dibujadas por código, simulacro con el baremo real, glosario y catálogo de
señales. Multiusuario (registro + login), progreso en SQLite, desplegable en Coolify.

Idiomas del código y la UI: comentarios y textos de interfaz en **francés o español**
(bilingüe en pantalla: `lang === 'fr' ? '…' : '…'`). Comunicación con el usuario en español.

## Stack y comandos

- Node 24.22.1 (fijado en `mise.toml` y en el `Dockerfile` como `node:24.22.1-bookworm-slim`; actualízalos juntos), Nuxt 4 (Vue 3 + TS, estructura `app/`), Nitro server, `nuxt-auth-utils` (sesión en cookie
  sellada, `hashPassword`/`verifyPassword`), `better-sqlite3` **sin ORM**, `zod`.
- Gestor de paquetes: **pnpm** (nunca npm/yarn). `package.json` tiene
  `pnpm.onlyBuiltDependencies` para que se compile `better-sqlite3`; no lo quites. El campo
  `packageManager` fija la versión de pnpm que usa corepack en Docker: debe coincidir con la
  local (`pnpm -v`) o el build de Coolify falla.

```bash
pnpm install
pnpm dev          # http://localhost:3000 (BD en ./data/permis.db)
pnpm build        # .output/
pnpm preview      # node .output/server/index.mjs
pnpm typecheck    # nuxt typecheck (vue-tsc) — debe pasar antes de cada commit
pnpm validate     # coherencia y calidad del banco + verificador de escenas (ver «Flujo de trabajo»)
pnpm validate --strict   # además, los avisos de calidad hacen fallar
pnpm test         # vitest: unitarios + prueba de humo de la API (usa .output: haz pnpm build antes)
npx tsx scripts/check-scenes.ts -v   # detalle del verificador de escenas de prioridad
```

Variables: `NUXT_SESSION_PASSWORD` (≥ 32 chars, obligatoria), `NUXT_DB_PATH`,
`NUXT_ALLOW_REGISTRATION` (además, `REGISTRATION_OPEN` en `server/utils/registration.ts` las cierra en código mientras la app no sea pública: hoy `false`), `NUXT_ADMIN_USERS` (usuarios admin, separados por comas: ven `/reports`), `NUXT_BACKUP_DISABLED` /
`NUXT_BACKUP_KEEP` (copias diarias de la BD, 14 por defecto). Ver `.env.example` y `DEPLOYMENT.md`.

## Mapa del repo

```
app/
  pages/          bienvenue (portada pública), index, course, study, exam, exams/index, exams/[id], glossary, signs, reports (admin), login, register
  components/     QuestionCard, TheoryPanel, LangToggle, ExamResultCard, GlossTerm, ReportForm, SignQuiz, ChapterQuiz (auto-importados)
  composables/    useStore.ts  ← ÚNICA fuente de estado de usuario (prefs, progreso, curso, exámenes) ↔ API
                  useHotkeys.ts (atajos de teclado), useSwipe.ts (deslizar en móvil), useSignPopup.ts
                  usePwa.ts (instalación, online/offline; lo alimenta plugins/pwa.client.ts)
  plugins/        pwa.client.ts (registra public/sw.js?v=<buildId> en prod; en dev desregistra)
  middleware/     auth.global.ts (todo requiere sesión salvo /bienvenue, /login y /register; sin sesión `/` → /bienvenue)
  layouts/        default.vue (cabecera, nav, logout)
  data/           CONTENIDO: themes (16), theory, questions*.ts, q.ts (helpers), course/ (part1–4, 20 cap.), glossary, signs, signImages, signPictos
  lib/            exam.ts (baremo, muestreo), scene.ts (SVG de cruces y carreteras), priority.ts (reglas de prioridad para
                  verificar escenas), srs.ts (repaso espaciado), signQuiz.ts, glossRefs.ts, signRefs.ts, md.ts, speech.ts, outbox.ts
  types.ts        tipos compartidos
server/
  utils/db.ts     conexión SQLite + esquema (CREATE TABLE IF NOT EXISTS) + `migrate()` (ALTER idempotentes) + helpers
                  (progress con streak/seen_at, study_days en Europe/Brussels, reports); utils/exams.ts, admin.ts,
                  registration.ts, backup.ts
  plugins/        backup.ts (copia diaria en <dir BD>/backups, integrity_check, rotación), errors.ts (logs JSON de 5xx)
  api/            auth/{register,login,logout,config}, me.get, prefs.put, progress/{record,flag,reset}, course/read, exams/{index,[id],stats},
                  reports/{index.post (usuario), index.get, [id].put (admin)}, admin/{backups.get, backup.post}
public/           manifest.webmanifest, sw.js (service worker a mano), offline.html, icons/ (generados)
scripts/          validate-data.ts (+ checks.ts calidad, check-scenes.ts escenas), gen-icons.ts (`pnpm icons`)
tests/            vitest (unitarios de app/lib y datos; api.smoke.test.ts arranca .output en el puerto 3132)
Dockerfile · DEPLOYMENT.md · README.md
```

## Reglas del contenido (lo más delicado)

- **Los ids de pregunta son claves en la BD** (`progress.question_id`, `exams.answers`).
  Nunca renombres ni reutilices un id. Añadir es seguro; para retirar una pregunta, bórrala
  sin reciclar el id.
- Preguntas con el helper `Q(id, theme, theoryId, [FR…], [ES…], answer, why, grave?)` en
  `app/data/questions*.ts`; con escena, `QS(Q(...), scene)`. Mismo número de opciones FR/ES,
  `answer` 0-based, `theoryId` existente en `theory.ts`. Ejecuta `pnpm validate` siempre.
- Marca `grave: true` solo en los temas de falta grave (prioridad, velocidad, adelantamiento,
  alcohol, distancia de seguridad, pasos a nivel): −5 puntos en el simulacro.
- **Escenas** (`lib/scene.ts`): brazos N/E/S/W; la derecha de un vehículo que llega desde S es E,
  desde E es N, desde N es W, desde W es S. `you: true` = el candidato («moi»). Comprueba la
  lógica de prioridad antes de escribir la respuesta: es donde más fácil es equivocarse.
  `pnpm validate` la comprueba con `lib/priority.ts` (sirena, tranvía, semáforos > señales, B1/B5/B9/B15,
  derecha, giro a la izquierda cede al de frente, rotonda con `inRing`, sentido único, incorporación,
  bloqueos): una MISMATCH es error. No modela peatones, carreteras sin cruce ni adelantamientos (salen
  como «no comprobadas»). Interpretaciones del motor: una rotonda cuenta como señalizada si algún
  acceso tiene B1/B5; la SUL se detecta por la leyenda «excepté cyclistes»; `turn: 'none'` fuera de
  rotonda no participa; una señal en el brazo prevalece sobre `mainAxis`.
  Para carreteras rectas, carriles y marcas: `layout`, `marks` (spot, dim, sign, stop, garage, crest,
  lanesig, person, path…), `ringLanes: 2` y, en vehículos, `lane`/`pos`/`path`/`blink`.
- **Notas por opción** (`app/data/optionNotes.ts`): por qué es falsa cada opción incorrecta (una
  entrada por opción, `null` en la correcta; validate lo comprueba). Cubren todas las preguntas graves;
  si cambias las opciones de una pregunta, actualiza sus notas.
- Las cifras del código belga (límites por región, 0,5 g/l, 5/15/20 m, M36/M18…) se
  contrastaron con fuentes belgas en sept–oct 2026 y se revisó TODO el contenido (preguntas,
  teoría, curso, glosario, señales) contra el texto consolidado del Code de la route
  (codedelaroute.be, AR 1/12/1975) el 25 oct 2026. Fuentes de referencia: el propio código para
  las reglas; police.be / be.brussels / mobilit.belgium.be para alcohol, sanciones e importes
  (retirada inmediata de 15 días desde 0,8 g/l y por teléfono en mano desde el 14/02/2026;
  importes indexados el 1/7/2026); la hoja GOCA «Doc B.FR.PR» (Región de Bruselas) para el
  permiso provisional (prácticas 9/6/3 meses, 22–6 h, guía 8 años). Si cambias una cifra, cita la
  fuente en el commit y en el `why` (artículo). Si una regla no está en el código ni en una fuente
  oficial, no se pregunta (se retiraron «cede el que baja en cuesta», «dos giros a la izquierda se
  cruzan por la derecha»…). Evita importes en euros en las preguntas: caducan con la indexación. Nunca inventes códigos de señales: usa solo los que existen (familias A, B, C,
  D, E, F, placas M).
- El banco es **original** (no copiar preguntas de Feu Vert, GOCA u otras apps).
- El curso (`app/data/course/`) usa markdown ligero renderizado por `lib/md.ts`
  (párrafos, `###`, listas `- `, tablas `|`, `**negrita**`, términos FR entre « »).
- **Señales: imágenes oficiales del SPW (Sécurothèque Wallonie)** en `public/signs/<código>.svg`
  (167 señales + variantes `C43-70`, `C45-90`… + placas M2/M4 y las placas adicionales SPW
  `M-distance` (tipo Ia), `M-longueur` (II), `M-horaire` (V) y `panel-30min` (VIIc) — las claves
  «M-…» son históricas, no son placas M del código), listadas en `app/data/signImages.ts`. Se
  extrajeron de los PDF «Combiné» (página en color → SVG con `pdftocairo -svg` o PyMuPDF, recorte
  por bbox ignorando el marco, `svgo`); los PDF están en `~/Downloads/drive-license` y el nombre de
  cada PDF es el código. Todas son vectoriales (sin PNG/WebP). El 25 oct 2026 se compararon una a
  una con su PDF (176/176 correctas tras corregir C5, F63, F79, F81 y los recortes de C37/C41/C45/
  C46/F103/M2/M4). Si añades una, compárala con el PDF: hubo imágenes de otra página del PDF. Los SVG **no pintan el blanco** de la señal, por eso
  `img.sign-img` lleva fondo blanco. Los dibujos de `signPictos.ts` solo son respaldo
  (`SignImage.vue` elige imagen oficial si existe) y sirven para `signWithValue(code, valor)`
  cuando no hay variante oficial con esa cifra.
- **Como en el examen real**: el enunciado no cita códigos («ce signal», «ce panneau»); la señal
  se muestra encima con `signs: ['C43']` (o se deduce de los códigos del texto) o con `image`
  (`signWithPanel`, `signWithValue`, SVG propio). En las opciones, los códigos se renderizan como
  miniaturas (`SignText inline`). Las escenas pintan las señales oficiales en los brazos
  (`signs: { E: 'B1' }`), con `oneWay`, `inRing` (vehículo ya en la rotonda), `type: 'merge'`.
- **Opciones**: tres, de longitud parecida, sin justificación ni «:» solo en la correcta (la
  explicación va en `why`); la respuesta correcta repartida ~1/3 entre A/B/C (hoy 212/211/214 → al
  añadir, no pongas siempre la buena en el medio). Nada de preguntas «¿quién tiene la culpa?»: se
  pregunta la regla.
- No dupliques preguntas: antes de añadir, busca si ya existe en versión texto o escena (hubo 7
  pares; se eliminaron las versiones texto).

## Reglas del código

- Estado de usuario: solo a través de `useStore()` (optimista + `$fetch` a la API). No
  reintroduzcas `localStorage` para datos del usuario.
- En SSR, para llamar a la API con la cookie del usuario usa `useRequestFetch()` (ya en
  `useStore.load`). Las páginas con aleatoriedad o timers (`/study`, `/exam`, `/signs`) van con
  `ssr: false` en `routeRules`; no las vuelvas SSR sin resolver el mismatch de hidratación.
- API: validar siempre el body con `zod` (`readValidatedBody`), exigir sesión con
  `requireUserSession`, y filtrar por `user.id` en toda consulta.
- BD: esquema en `server/utils/db.ts`. Cambios de esquema = `CREATE TABLE IF NOT EXISTS` o
  `ALTER TABLE` idempotentes en ese fichero (no hay migraciones externas). Un solo proceso
  escribe (WAL); no escalar a réplicas con el mismo fichero.
- Mantén `pnpm typecheck` limpio; `noUnusedLocals` está activo.
- Estilos: `app/assets/style.css` con variables CSS (tema claro/oscuro por `prefers-color-scheme`);
  sin frameworks CSS.
- PWA: `public/sw.js` no pasa por el build; se registra con `?v=<buildId>` y las cachés llevan
  esa versión (las viejas se borran al activar). Al instalar precachea todos los chunks del build
  (`precache.json`, generado por el hook `nitro:build:public-assets` de `nuxt.config.ts`) y la
  «shell» SPA (`/study`), que sirve de respaldo para navegar offline a páginas no visitadas.
  Estrategias: `/api/_auth/session` y `/api/me` red-primero con copia en caché (si no, offline el
  middleware manda a `/login`), resto de `/api/*` solo red, `/_nuxt/*` caché-primero,
  navegaciones red-primero → página cacheada → shell → `offline.html`. El logout
  (`DELETE /api/_auth/session`) vacía la caché de páginas. Iconos: edita `scripts/gen-icons.ts`
  y ejecuta `pnpm icons` (no subas PNG a mano).
- Escrituras offline: `useStore.send()` encola en IndexedDB (`app/lib/outbox.ts`, por usuario) las
  peticiones que fallan por red y `syncOutbox()` las reenvía al volver la conexión o al abrir la
  app. Es una cola de peticiones, no un caché de datos: la regla «sin localStorage para datos
  del usuario» sigue vigente. Toda escritura nueva a la API debe pasar por `send()`.
- Sin dependencias nuevas salvo necesidad clara; si añades una, verifica que existe y su
  versión actual antes de escribirla en `package.json`.

## Flujo de trabajo

1. `pnpm validate --strict && pnpm typecheck && pnpm build && pnpm test` antes de proponer un commit
   (la prueba de humo de la API usa el `.output` existente). Los tests unitarios solo importan módulos
   puros (sin auto-imports de Nuxt): extrae la lógica a `app/lib` para testearla.
   - Pruebas en Chrome con varios servidores a la vez: las cookies de sesión se comparten entre puertos
     del mismo host; usa un host propio por servidor (`<nombre>.localhost:<puerto>`).
   - Para un usuario de prueba con el registro cerrado: insértalo en la BD de prueba con el hash de
     `hashPassword` (ver `tests/api.smoke.test.ts`); nunca dejes `REGISTRATION_OPEN = true`.
2. Para probar la API en local: `pnpm build && NUXT_SESSION_PASSWORD=$(openssl rand -base64 48) NUXT_DB_PATH=./data/test.db pnpm preview` y `curl` con cookie (`-c jar -b jar`).
3. Commits pequeños y descriptivos; `pnpm-lock.yaml` siempre versionado (Docker usa `--frozen-lockfile`).
4. Historia del proyecto: v0.1/v0.2 fueron una SPA Vite (`../permis-trainer`, estática, localStorage);
   v0.3 es esta migración a Nuxt + SQLite. No mezcles las dos.

## Estado (25 oct 2026) y herramientas de diagnóstico

- 637 preguntas en 16 temas. Ficheros: questions, -scenes, -extra, -extra2, -extra3 (temas graves,
  `z-prio/vit/dep/alc-NN`), -extra4 (resto de temas, `z-sig/sta/aut/usa/man/ecl/veh/per-NN`) y uno por
  tema nuevo: -panneaux (`z-pan-NN`), -mecanique (`z-mec-NN`), -accidents (`z-acc-NN`),
  -comportement (`z-com-NN`) y -extra5 (31 escenas de adelantamiento, carriles, rotondas de 2 carriles,
  tranvía, peatones, estacionamiento y autopista, `z5-<tema>-NN`). Siguiente bloque: `questions-extra6.ts`,
  ids `z6-<tema>-NN`.
- Modos de estudio: repaso inteligente (por defecto), faltas graves, errores de un examen (`?ids=`),
  quiz de señales (`/signs?mode=quiz`, progreso con ids `sign:<código>` en la misma tabla `progress`),
  mini-test por capítulo del curso (`ChapterQuiz`, con un mapa capítulo → theoryId dentro del componente),
  mort subite en `/exam`.
- Objetivo diario y racha: tabla `study_days` (día en Europe/Brussels), cada respuesta de estudio suma;
  la racha llega hasta hoy, o hasta ayer si hoy aún no se cumplió. Solo cuenta el estudio (no el simulacro).
- Temas nuevos (25 oct 2026): `panneaux`, `mecanique`, `accidents`, `comportement` (no graves), con
  teoría en `theory.ts` y capítulos 17–20 del curso (`course/part4.ts`).
- `grave: true` aparece también en algunas preguntas de autopista, maniobras, usuarios vulnerables y
  alumbrado (marcha atrás en autopista, pasos a nivel, ceder a peatones…): es deliberado cuando la
  infracción es de las graves; no lo generalices.
- `scripts/validate-data.ts` no comprueba la longitud de las opciones; para eso hay un chequeo
  ad hoc (la correcta no debe ser >30 % más larga que la mayor de las otras).
- Examen: modo «Sans limite» (`answerSeconds = 0`, sin lectura ni cuenta atrás); el sorteo
  (`sampleExam(..., seen)`) prioriza las preguntas menos vistas según `GET /api/exams/stats`.
- Diagnóstico: cada pregunta muestra su id (`code.qid`) y cada examen su `#id`; en «Historial»
  hay una tabla de frecuencia por pregunta. El usuario reporta problemas con esos ids.
- Corrección completa del examen en `/exams/[id]` (`ExamResultCard review="all"`).
- Teoría: entradas nuevas `veh-entretien`, `sta-zones`. Cada pregunta debe apuntar a la entrada
  que realmente explica lo que pregunta (revisar al añadir).

## Pendientes conocidos / ideas

- Seguir ampliando el banco y añadir escenas a más temas (ver «Estado»).
- Exportar/importar progreso (JSON) y estadísticas por tema en el historial.
- Mejoras de experiencia de usuario (propuestas el 25 oct 2026, en este orden):
  1. ~~Atajos de teclado~~ (hecho: `composables/useHotkeys.ts`; A/B/C o 1/2/3 responden, Entrée
     revela/siguiente en estudio y valida en el examen, M marca, T traducción, L relee).
  2. ~~Repaso inteligente~~ (hecho: modo por defecto de `/study`, `lib/srs.ts`, Leitner con intervalos
     0/1/3/7/16/35 días según `progress.streak`; columnas `streak` y `seen_at` añadidas con ALTER
     idempotente en `server/utils/db.ts`; una pregunta fallada vuelve 5 preguntas después en la sesión).
  2b. ~~Sección de faltas graves~~ (hecho: modo «Fautes graves» en `/study?theme=grave`, con
     repaso espaciado sobre las preguntas `grave`, y tarjeta en la portada con dominadas / para repasar /
     faltas graves de los 5 últimos exámenes).
  2c. ~~Mort subite~~ (hecho: modo de `/exam` — `?mode=sudden` —, 20 preguntas `grave` priorizando las
     menos vistas; termina al primer fallo; no se guarda en el historial ni usa el baremo).
  3. ~~«Repasar los fallos de este examen»~~ (hecho: botón en `ExamResultCard` → `/study?ids=…`, faltas
     graves primero; una pregunta fallada vuelve 5 preguntas después).
  4. ~~Progreso por tema e indicador «¿estoy listo?»~~ (hecho en la portada: por tema, dominadas
     (`streak > 0`), % de acierto estudio + exámenes (`/api/exams/stats`), pendientes de repaso, enlace
     al tema; «Suis-je prêt ?» con criterios explícitos: ≥ 3 simulacros, los 3 últimos ≥ 45/50 y sin
     faltas graves, ≥ 70 % del banco visto; puntos débiles = 3 temas con menos acierto).
  5. ~~Glosario dentro de la pregunta~~ (hecho: `lib/glossRefs.ts` deduce formas buscables de
     `glossary.ts` — sin artículo, variantes «/», sin fragmentos —; `GlossTerm.vue` muestra la burbuja;
     activo en `/study` y en el simulacro solo con la ayuda ES. Para que un término nuevo se resalte,
     basta con añadirlo al glosario).
  6. Antes de abrir al público:
     - ~~«Signaler une erreur»~~ (hecho: botón ⚑ en `QuestionCard` con `reportable` —estudio,
       corrección de exámenes, mort subite; nunca durante el examen—, tabla `reports`, máx. 30 por
       usuario y día, página `/reports` para los admins de `NUXT_ADMIN_USERS`).
     - ~~Aviso «outil non officiel»~~ (hecho: pie de página con enlace al Code de la route).
     - ~~Portada sin sesión~~ (hecho: `/bienvenue`, solo presentación, sin enlace al registro: la app
       aún no está abierta; «Se connecter» para los usuarios existentes).
     - Pendiente: recuperar contraseña (requiere email + servicio de envío), borrar cuenta y
       exportar datos (RGPD). Al abrir: `REGISTRATION_OPEN = true` y enlazar el registro desde la portada.
  7. ~~Móvil: deslizar para pasar a la siguiente pregunta~~ (hecho: `composables/useSwipe.ts` en `/study`;
     solo gestos claramente horizontales ≥ 70 px, ignora campos de texto y la burbuja del glosario).
- Mejoras propuestas el 25 oct 2026 (tarde), hechas: comprobaciones de calidad en validate, verificador de
  escenas, quiz de señales, tests, escenas nuevas, notas por opción (graves), mini-test por capítulo,
  copias de seguridad y logs de errores, objetivo diario.
- Pendiente: recordatorio diario en el móvil (web push con VAPID, tabla `push_subscriptions`, plugin
  con intervalo hacia las 19:00 de Bruselas, `push`/`notificationclick` en `sw.js`; necesita la dependencia
  `web-push` y variables nuevas; en iOS solo con la PWA instalada). Notas por opción para las preguntas no
  graves.
- Descartado: panel de administración de preguntas (se editan en `app/data`).
