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
pnpm validate     # coherencia del banco de preguntas (ids, temas, teoría, baremo)
```

Variables: `NUXT_SESSION_PASSWORD` (≥ 32 chars, obligatoria), `NUXT_DB_PATH`,
`NUXT_ALLOW_REGISTRATION`. Ver `.env.example` y `DEPLOYMENT.md`.

## Mapa del repo

```
app/
  pages/          index, course, study, exam, exams/index, exams/[id], glossary, signs, login, register
  components/     QuestionCard, TheoryPanel, LangToggle, ExamResultCard (auto-importados)
  composables/    useStore.ts  ← ÚNICA fuente de estado de usuario (prefs, progreso, curso, exámenes) ↔ API
                  usePwa.ts (instalación, online/offline; lo alimenta plugins/pwa.client.ts)
  plugins/        pwa.client.ts (registra public/sw.js?v=<buildId> en prod; en dev desregistra)
  middleware/     auth.global.ts (todo requiere sesión salvo /login y /register)
  layouts/        default.vue (cabecera, nav, logout)
  data/           CONTENIDO: themes, theory, questions(+scenes,+extra), q.ts (helpers), course/, glossary, signs, signPictos
  lib/            exam.ts (baremo, muestreo), scene.ts (SVG de cruces), md.ts (markdown ligero), speech.ts (voz)
  types.ts        tipos compartidos
server/
  utils/db.ts     conexión SQLite + esquema (CREATE TABLE IF NOT EXISTS) + helpers; utils/exams.ts
  api/            auth/{register,login,logout,config}, me.get, prefs.put, progress/{record,flag,reset}, course/read, exams/{index,[id]}
public/           manifest.webmanifest, sw.js (service worker a mano), offline.html, icons/ (generados)
scripts/          validate-data.ts, gen-icons.ts (PNG sin dependencias → `pnpm icons`)
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
- Las cifras del código belga (límites por región, 0,5 g/l, 5/15/20 m, M36/M18…) se
  contrastaron con fuentes belgas en sept–oct 2026. Si cambias una cifra, cita la fuente en
  el commit. Nunca inventes códigos de señales: usa solo los que existen (familias A, B, C,
  D, E, F, placas M).
- El banco es **original** (no copiar preguntas de Feu Vert, GOCA u otras apps).
- El curso (`app/data/course/`) usa markdown ligero renderizado por `lib/md.ts`
  (párrafos, `###`, listas `- `, tablas `|`, `**negrita**`, términos FR entre « »).
- **Señales: imágenes oficiales del SPW (Sécurothèque Wallonie)** en `public/signs/<código>.svg`
  (168 señales + variantes `C43-70`, `C45-90`… + placas `M-distance`, `M-longueur`, `M-horaire`,
  `panel-30min`), listadas en `app/data/signImages.ts` (generado). Se extrajeron de los PDF
  «Combiné» (página en color, `pdftocairo -svg`, recorte por bbox ignorando el marco, `svgo`); los
  PDF están en `~/Downloads/drive-license`. Los SVG **no pintan el blanco** de la señal, por eso
  `img.sign-img` lleva fondo blanco. Los dibujos de `signPictos.ts` solo son respaldo
  (`SignImage.vue` elige imagen oficial si existe) y sirven para `signWithValue(code, valor)`
  cuando no hay variante oficial con esa cifra.
- **Como en el examen real**: el enunciado no cita códigos («ce signal», «ce panneau»); la señal
  se muestra encima con `signs: ['C43']` (o se deduce de los códigos del texto) o con `image`
  (`signWithPanel`, `signWithValue`, SVG propio). En las opciones, los códigos se renderizan como
  miniaturas (`SignText inline`). Las escenas pintan las señales oficiales en los brazos
  (`signs: { E: 'B1' }`), con `oneWay`, `inRing` (vehículo ya en la rotonda), `type: 'merge'`.
- **Opciones**: tres, de longitud parecida, sin justificación ni «:» solo en la correcta (la
  explicación va en `why`); la respuesta correcta repartida ~1/3 entre A/B/C (hoy 113/113/113 → al
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

1. `pnpm validate && pnpm typecheck` antes de proponer un commit.
2. Para probar la API en local: `pnpm build && NUXT_SESSION_PASSWORD=$(openssl rand -base64 48) NUXT_DB_PATH=./data/test.db pnpm preview` y `curl` con cookie (`-c jar -b jar`).
3. Commits pequeños y descriptivos; `pnpm-lock.yaml` siempre versionado (Docker usa `--frozen-lockfile`).
4. Historia del proyecto: v0.1/v0.2 fueron una SPA Vite (`../permis-trainer`, estática, localStorage);
   v0.3 es esta migración a Nuxt + SQLite. No mezcles las dos.

## Estado (24 oct 2026) y herramientas de diagnóstico

- 332 preguntas (questions, -scenes, -extra, -extra2). Siguiente bloque: `questions-extra3.ts`,
  ids `z-<tema>-NN`.
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
- Descartado: panel de administración de preguntas (se editan en `app/data`).
