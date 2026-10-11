# Permis Trainer — théorie B (FR / ES) · v0.3 (Nuxt + SQLite)

App de entrenamiento para el examen teórico belga (permis B, Bruselas) para hispanohablantes
que hacen el examen en francés. Versión desplegable con **cuentas de usuario** y progreso
guardado en **SQLite** (sobrevive a los deploys con un volumen persistente).

- **Curso**: 16 capítulos en español con los términos franceses del examen; progreso por capítulo.
- **Estudiar**: ~340 preguntas FR con traducción ES, teoría asociada, ~45 con escenas de cruce dibujadas.
- **Examen**: simulacro de 50 con baremo real, lectura en voz alta, 15 s por pregunta; historial
  completo repasable (`/exams`, `/exams/:id`).
- **Glosario** FR–ES y **Señales** (168, familias A–F) con flashcards.
- **PWA**: instalable en el móvil (manifest + service worker propio, sin dependencias); toda la app
  funciona sin conexión y el progreso hecho offline se sincroniza al volver la red.
- **Multiusuario**: registro + login (cookie sellada, `nuxt-auth-utils`); cada usuario tiene sus
  preferencias (idioma, voz, ayuda ES, tiempo), progreso por pregunta, marcadas, capítulos leídos y exámenes.

## Stack

Nuxt 4 (Vue 3 + TypeScript, Nitro) · `nuxt-auth-utils` (sesiones en cookie, hash scrypt) ·
`better-sqlite3` (sin ORM, esquema en `server/utils/db.ts`, creado al arrancar) · `zod` · **pnpm**.

```bash
mise install                # Node 24 (mise.toml); o cualquier Node >= 22 con corepack
cp .env.example .env        # pon un NUXT_SESSION_PASSWORD de 32+ caracteres
pnpm install
pnpm dev                    # http://localhost:3000
pnpm build && pnpm preview  # producción local (node .output/server/index.mjs)
pnpm validate               # comprueba el banco de preguntas
pnpm icons                  # regenera public/icons/*.png desde scripts/gen-icons.ts
```

## Variables de entorno

| Variable | Valor | Notas |
|---|---|---|
| `NUXT_SESSION_PASSWORD` | cadena aleatoria ≥ 32 caracteres | obligatoria; cifra la cookie de sesión |
| `NUXT_DB_PATH` | `/data/permis.db` | ruta del fichero SQLite (se crea si no existe) |
| `NUXT_ALLOW_REGISTRATION` | `true` / `false` | cierra el registro cuando ya tengas tus cuentas |
| `PORT`, `HOST` | `3000`, `0.0.0.0` | Nitro |

## Despliegue en Coolify

1. Nuevo recurso → **Dockerfile** (el repo incluye `Dockerfile`, Node 22 slim, usuario `node`).
2. Variables de entorno: las tres de arriba (`NUXT_DB_PATH=/data/permis.db`).
3. **Persistent storage**: volumen montado en `/data` (ahí vive `permis.db` + ficheros WAL).
4. Puerto expuesto 3000. Dominio con HTTPS (la cookie de sesión es `secure` en producción).
5. Primer arranque: crea tu cuenta en `/register` y luego pon `NUXT_ALLOW_REGISTRATION=false` y redespliega.

Copia de seguridad: basta con copiar `permis.db` (mejor con `sqlite3 permis.db ".backup copia.db"` para
no pillar la WAL a medias).

## Estructura

```
app/
  pages/        index, course, study, exam, exams/[id], exams/index, glossary, signs, login, register
  components/   QuestionCard, TheoryPanel, LangToggle, ExamResultCard
  composables/  useStore.ts   # estado del usuario (prefs, progreso, curso, exámenes) ↔ API
                usePwa.ts     # instalación / online-offline
  plugins/      pwa.client.ts # registra el service worker (solo producción)
  middleware/   auth.global.ts
  layouts/      default.vue
  data/         themes, theory, q, questions(+scenes,+extra), course/, glossary, signs, signPictos
  lib/          exam (baremo, muestreo), scene (SVG de cruces), md, speech
public/         manifest.webmanifest · sw.js · offline.html · icons/ (pnpm icons)
server/
  utils/db.ts   SQLite: conexión, esquema, helpers · utils/exams.ts
  api/auth/     register, login, logout, config
  api/me.get    estado completo del usuario
  api/prefs.put · api/progress/{record,flag,reset} · api/course/read · api/exams/{index,[id]}
```

## Añadir preguntas

Igual que en la v0.2: helper `Q(...)` / `QS(...)` en `app/data/questions*.ts` y `pnpm validate`.
Los ids de pregunta son la clave del progreso en la BD: no los renumeres.
