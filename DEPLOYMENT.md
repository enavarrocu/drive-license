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

El estado completo es el fichero `permis.db`. Dos formas:

**Desde el contenedor (recomendada, coherente con la WAL):**

```bash
docker exec <contenedor> sh -c 'cd /app/.output/server && node -e "
const D=require(\"better-sqlite3\");
new D(\"/data/permis.db\").backup(\"/data/backup-\"+Date.now()+\".db\").then(()=>console.log(\"ok\"))"'
```

La imagen no incluye el cliente `sqlite3`, pero `better-sqlite3` sí está (en
`/app/.output/server/node_modules`) y su método `.backup()` hace una copia coherente con
el contenedor en marcha. Después copia el fichero `backup-*.db` fuera del volumen
(`docker cp <contenedor>:/data/backup-….db .`) y bórralo del volumen.

**Desde el host:** copiar `permis.db` **junto con** `permis.db-wal` y `permis.db-shm`, o
parar el contenedor antes de copiar. Copiar solo `permis.db` con el contenedor en marcha
puede dejar fuera las últimas escrituras.

Restaurar: parar el contenedor, sustituir los tres ficheros en `/data` por la copia
(borrando `-wal` y `-shm` si la copia es un `.backup`), arrancar.

Coolify también puede programar backups de volúmenes; si lo usas, aplica la misma
regla (incluir los tres ficheros o hacerlo con el contenedor parado).

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
Backup            permis.db + -wal + -shm (o .backup desde el contenedor)
```
