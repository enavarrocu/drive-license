# Despliegue de Permis Trainer (Nuxt + SQLite) en Coolify

Guía paso a paso para poner la app en producción con Coolify, con la base de datos
SQLite en un volumen persistente que sobrevive a los redeploys.

## 1. Qué se despliega

- Una sola imagen Docker (ver `Dockerfile`): build con Node 24.22.1 + pnpm, runtime
  `node:24.22.1-bookworm-slim` ejecutando `node .output/server/index.mjs` como usuario `node`.
- Puerto interno **3000**.
- Un único fichero de datos: `permis.db` (más `permis.db-wal` y `permis.db-shm`, el
  journal WAL de SQLite) en el directorio que indique `NUXT_DB_PATH`. En el contenedor:
  `/data`.
- Sin servicios externos: ni Postgres, ni Redis, ni almacenamiento de sesiones (las
  sesiones van en una cookie cifrada).

## 2. Requisitos previos

- El proyecto en un repositorio Git accesible por Coolify (GitHub, GitLab, Gitea… o un
  repo privado con deploy key). Sube `pnpm-lock.yaml`: el Dockerfile instala con
  `--frozen-lockfile`.
- Un dominio o subdominio apuntando al servidor de Coolify (p. ej. `drive-license.ernestonavarro.dev`),
  con HTTPS (Coolify lo gestiona con Let's Encrypt). **HTTPS no es opcional**: en
  producción la cookie de sesión lleva `Secure` y sin TLS el login no se mantiene.
- Un secreto de sesión de al menos 32 caracteres. Genera uno:

  ```bash
  openssl rand -base64 48
  ```

## 3. Crear el recurso en Coolify

1. **Projects → tu proyecto → + New → Application**, origen: el repositorio Git
   (público o con la clave de despliegue configurada), rama `main`.
2. **Build Pack: Dockerfile**. Ruta del Dockerfile: `/Dockerfile` (raíz del repo).
   Base directory: `/` (si el proyecto está en un subdirectorio del repo, indícalo aquí
   y en la ruta del Dockerfile).
3. **Port exposes**: `3000`.
4. **Domains**: `https://drive-license.ernestonavarro.dev`.

No hace falta ningún comando de build/start adicional: todo está en el Dockerfile.

## 4. Variables de entorno

En la pestaña **Environment Variables** del recurso:

| Variable | Valor | Comentario |
|---|---|---|
| `NUXT_SESSION_PASSWORD` | el secreto generado (≥ 32 caracteres) | cifra la cookie de sesión; si cambia, todos los usuarios tienen que volver a iniciar sesión |
| `NUXT_DB_PATH` | `/data/permis.db` | ya viene en el Dockerfile; ponla también aquí para que quede explícita |
| `NUXT_ALLOW_REGISTRATION` | `true` | pásala a `false` cuando hayas creado las cuentas |
| `NUXT_ADMIN_USERS` | tu nombre de usuario | administradores, separados por comas: ven la pestaña «⚑ Avisos» (`/reports`) con los errores que avisan los usuarios |
| `NUXT_BACKUP_DISABLED` | `false` (opcional) | `true` desactiva las copias automáticas de la base (sección 8) |
| `NUXT_BACKUP_KEEP` | `14` (opcional) | número de copias diarias que se conservan en `/data/backups` |
| `NODE_ENV` | `production` | ya viene en el Dockerfile |

Márcalas como variables **de runtime** (no solo de build). `NUXT_SESSION_PASSWORD` no se
necesita en tiempo de build.

## 5. Almacenamiento persistente (lo importante)

En **Storages / Persistent Storage** del recurso añade un volumen:

- **Destination path** (dentro del contenedor): `/data`
- Tipo: *Volume mount* (volumen gestionado por Docker). Si prefieres una ruta del host
  (*bind mount*), por ejemplo `/opt/coolify/permis/data`, asegúrate de que el directorio
  existe y pertenece al UID 1000 (`chown -R 1000:1000 …`), porque el proceso corre como
  usuario `node`.

Con esto, cada redeploy reconstruye la imagen pero `/data/permis.db` se conserva.
Sin este volumen, la base de datos se perdería en cada despliegue.

Comprobación tras el primer arranque (terminal del contenedor en Coolify o `docker exec`):

```bash
ls -la /data
# permis.db  permis.db-shm  permis.db-wal
```

## 6. Primer arranque

1. **Deploy**. En los logs debe aparecer `Listening on http://0.0.0.0:3000`.
2. Abre `https://drive-license.ernestonavarro.dev/register` y crea tu cuenta (y las de quien vaya a
   usarla).
3. Cambia `NUXT_ALLOW_REGISTRATION` a `false` y vuelve a desplegar (o reinicia): a partir
   de ahí `/register` muestra «inscripciones cerradas» y la API devuelve 403.
4. Inicia sesión desde el móvil y el ordenador: el progreso es el mismo en los dos.

## 7. Actualizar la app

- `git push` a la rama configurada y **Redeploy** (o activa el auto-deploy con el webhook
  del repositorio en Coolify). El volumen `/data` no se toca.
- El esquema de la base de datos se crea/actualiza solo al arrancar (`CREATE TABLE IF NOT
  EXISTS` en `server/utils/db.ts`). Si en el futuro añado columnas, irán como `ALTER
  TABLE` idempotentes en el mismo sitio; no hay migraciones manuales.
- Los ids de las preguntas (`prio-01`, `sc-12`…) son la clave del progreso guardado: si
  se renombra una pregunta, su historial deja de enlazarse (no se pierde, pero no se
  muestra). Añadir preguntas nuevas es seguro.

### PWA y service worker

- El service worker (`public/sw.js`) solo se registra con HTTPS (o en `localhost`), otra razón
  para no saltarse el TLS. Se registra como `/sw.js?v=<buildId>`: cada deploy instala un worker
  nuevo que toma el control y recarga la pestaña una vez; las cachés del build anterior se borran.
- No hace falta purgar nada en el servidor ni en Coolify. Si un usuario ve una versión vieja,
  basta con recargar (o cerrar y abrir la app instalada).
- En el móvil: Android/Chrome muestra el botón «Installer» en la portada; en iOS es
  Partager → «Sur l'écran d'accueil». Al instalar se precachea toda la app (unos 700 kB), así
  que funciona entera sin conexión desde la primera visita; el progreso hecho offline se guarda
  en una cola local y se envía al volver la red (la cabecera muestra «N à synchroniser»).

## 8. Copias de seguridad

Todo el progreso de los usuarios está en un único fichero, `/data/permis.db`. La app hace
copias automáticas; aun así, **guarda también copias fuera del servidor** (ver abajo).

### Copias automáticas

- Al arrancar, si la última copia tiene más de 24 h (o no hay ninguna), y después cada vez que
  se cumplen 24 h desde la anterior (se comprueba cada hora), el servidor copia la base con
  `better-sqlite3 .backup()`, que es coherente aunque haya escrituras en curso (WAL).
- Destino: `<directorio de la BD>/backups/permis-AAAA-MM-DD.db`, es decir
  **`/data/backups/`** en Coolify (dentro del mismo volumen). Una copia por día (UTC): si se
  fuerza otra el mismo día, sustituye a la de ese día.
- Cada copia es un fichero SQLite autónomo (modo de diario clásico, sin `-wal`/`-shm`).
- Tras cada copia se ejecuta `PRAGMA integrity_check` sobre ella (abierta en solo lectura).
- Rotación: se conservan las **14** más recientes y se borran las anteriores.
- Si una copia falla, se registra en el log y el servidor sigue funcionando.
- En `pnpm dev` no se hacen copias (solo con el build de producción).

| Variable | Por defecto | Efecto |
|---|---|---|
| `NUXT_BACKUP_DISABLED` | `false` | `true` desactiva las copias automáticas |
| `NUXT_BACKUP_KEEP` | `14` | número de copias diarias que se conservan |

Para administradores (`NUXT_ADMIN_USERS`), con la sesión iniciada:

- `GET /api/admin/backups` → lista de copias (nombre, tamaño, fecha) y la configuración.
- `POST /api/admin/backup` → fuerza una copia ahora (útil antes de un cambio delicado).

Desde el navegador, con la sesión de administrador abierta, en la consola:
`await (await fetch('/api/admin/backup', { method: 'POST' })).json()`.

### Descargar una copia

Desde el servidor (SSH), con el nombre del contenedor que muestra Coolify (`docker ps`):

```bash
docker exec <contenedor> ls -la /data/backups
docker cp <contenedor>:/data/backups/permis-2026-10-25.db ./permis-2026-10-25.db
# y desde tu máquina:
scp servidor:permis-2026-10-25.db .
```

### Copias fuera del servidor (recomendado)

Las copias automáticas viven en el mismo volumen que la base: protegen de un error de la app
o de un borrado accidental, **no** de perder el disco o el servidor. Añade al menos una de:

- **Backup del volumen en Coolify** (si tu versión lo ofrece para el recurso, o un *Scheduled
  Task* que copie `/data/backups` a un destino S3). Basta con incluir `/data/backups/`: esos
  ficheros son autónomos y coherentes.
- **rsync / cron en otra máquina**, por ejemplo cada noche:

  ```bash
  # en el host de Coolify: ruta del volumen
  docker volume inspect <volumen> --format '{{ .Mountpoint }}'
  # desde otra máquina (NAS, portátil…):
  rsync -av servidor:/var/lib/docker/volumes/<volumen>/_data/backups/ ~/backups/permis/
  ```

No copies `permis.db` «en caliente» sin sus `-wal`/`-shm`: usa los ficheros de `backups/`.

### Restaurar

1. Para el contenedor en Coolify (**Stop**). No restaures con la app en marcha.
2. En el volumen, sustituye la base por la copia y **borra los ficheros `-wal` y `-shm`**
   (pertenecen a la base antigua; si se quedan, SQLite intentaría aplicarlos a la copia):

   ```bash
   # con un contenedor auxiliar que monte el mismo volumen
   docker run --rm -v <volumen>:/data alpine sh -c '
     cp /data/permis.db /data/permis.db.antes-de-restaurar &&
     cp /data/backups/permis-2026-10-25.db /data/permis.db &&
     rm -f /data/permis.db-wal /data/permis.db-shm &&
     chown 1000:1000 /data/permis.db'
   ```

   (Para restaurar una copia descargada: `docker cp ./permis-….db <contenedor>:/data/…` antes de
   parar, o cópiala directamente en la ruta del volumen en el host.)
3. Arranca (**Start**). Al abrir la base la app vuelve a ponerla en modo WAL y aplica las
   migraciones idempotentes si la copia es de una versión anterior.

### Errores en producción (logs)

El servidor escribe **una línea JSON por error** en la salida estándar (logs del contenedor en
Coolify → *Logs*, o `docker logs <contenedor>`), sin servicios externos:

```json
{"level":"error","type":"server-error","time":"…","status":500,"method":"POST","path":"/api/progress/record","user":"ana#3","message":"…","stack":["at …"],"tags":["request"]}
```

- Se registran las excepciones no capturadas (API y render), las respuestas 5xx y las promesas
  rechazadas fuera de una petición. Los 4xx (sesión caducada, 403, 404, validación) no.
- Las copias usan el mismo formato: `"type":"backup"` (ruta, tamaño, duración, copias borradas),
  `"type":"backup-failed"` y `"type":"backup-integrity"` (la copia no pasó `integrity_check`).

Filtrar:

```bash
docker logs <contenedor> 2>&1 | grep '"type":"server-error"'
docker logs <contenedor> 2>&1 | grep '"type":"backup'          # todas las de copias
docker logs --since 24h <contenedor> 2>&1 | grep '"level":"error"'
```

En la pantalla de logs de Coolify sirve el buscador con `server-error` o `backup-failed`.

## 9. Alternativa sin Coolify: Docker Compose

Útil para probar en el homelab o como referencia de lo que Coolify hace por debajo:

```yaml
services:
  permis:
    build: .
    restart: unless-stopped
    ports:
      - "8087:3000"
    environment:
      NUXT_SESSION_PASSWORD: "cambia-esto-por-48-caracteres-aleatorios-minimo"
      NUXT_DB_PATH: /data/permis.db
      NUXT_ALLOW_REGISTRATION: "true"
    volumes:
      - permis-data:/data

volumes:
  permis-data:
```

```bash
docker compose up -d --build
```

Detrás de un reverse proxy con HTTPS (Caddy, Traefik, Nginx Proxy Manager…). Para
pruebas en `http://` local la cookie `Secure` no se guarda: usa `localhost` (los
navegadores lo tratan como contexto seguro) o una URL HTTPS.

## 10. Ejecutar en local sin Docker

```bash
cp .env.example .env     # pon NUXT_SESSION_PASSWORD
pnpm install
pnpm dev                 # http://localhost:3000, BD en ./data/permis.db
```

`pnpm build && pnpm preview` arranca la versión de producción con las mismas variables.

## 11. Problemas frecuentes

- **`Cannot find module 'better-sqlite3'` / `bindings`**: el módulo nativo no se compiló
  o descargó. En el proyecto, `package.json` → `pnpm.onlyBuiltDependencies` ya autoriza su
  script de instalación (pnpm 10 los bloquea por defecto). En Docker se descarga el binario
  precompilado para linux/amd64; si construyes en otra arquitectura (arm64) también hay
  binarios, y si no los hubiera compila con `node-gyp` (necesita `python3 make g++`, que
  puedes añadir en la etapa de build del Dockerfile).
- **`ERR_PNPM_MINIMUM_RELEASE_AGE_VIOLATION` o «The "pnpm" field in package.json is no longer
  read» al hacer `pnpm install` en el build**: corepack ha bajado un pnpm distinto del que se usa
  en local. `package.json` fija la versión con `"packageManager": "pnpm@10.x"`; si actualizas pnpm
  en local, actualiza también ese campo y vuelve a generar el lockfile en el mismo commit.
- **El login «no se mantiene» / vuelve a `/login`**: casi siempre falta HTTPS (cookie
  `Secure`) o `NUXT_SESSION_PASSWORD` tiene menos de 32 caracteres (la app se niega a
  sellar sesiones). Revisa los logs al arrancar.
- **`SQLITE_READONLY` / `attempt to write a readonly database`**: el volumen no es
  escribible por el UID 1000. Con *volume mount* no pasa; con *bind mount*, `chown`.
- **`database is locked`**: solo ocurre si otro proceso abre el mismo fichero (p. ej. un
  backup con `sqlite3` abierto en modo escritura). La app usa WAL y un único proceso; no
  escales a varias réplicas con el mismo fichero.
- **Error 403 en `/api/auth/register`**: `NUXT_ALLOW_REGISTRATION` está en `false`
  (comportamiento esperado una vez creadas las cuentas).
- **Cambié `NUXT_SESSION_PASSWORD`**: todas las sesiones caducan; los datos no se ven
  afectados.
- **La app instalada sigue mostrando la versión anterior**: el worker nuevo se activa en la
  siguiente carga; recarga la página. Si quieres forzarlo: DevTools → Application → Service
  Workers → Unregister, o borrar los datos del sitio.
- **Lectura en voz alta no suena en el móvil**: depende de las voces instaladas en el
  dispositivo (Web Speech API), no del servidor; en iOS hace falta una interacción previa
  del usuario, que ya se cumple al pulsar «Commencer».

## 12. Resumen rápido

```
Build pack        Dockerfile (raíz)
Puerto            3000
Dominio           https://…  (obligatorio HTTPS)
Env               NUXT_SESSION_PASSWORD, NUXT_DB_PATH=/data/permis.db, NUXT_ALLOW_REGISTRATION
Volumen           /data  (volume mount)
Tras 1.ª cuenta   NUXT_ALLOW_REGISTRATION=false + redeploy
Backup            automático diario en /data/backups (14 copias) + copia fuera del servidor
Errores           docker logs … | grep server-error
```
