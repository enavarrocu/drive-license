/**
 * Cola de envíos pendientes («outbox») para trabajar sin conexión.
 *
 * Cuando una escritura a la API (progreso, marcadas, capítulo leído,
 * preferencias, examen) falla por falta de red, useStore la guarda aquí
 * (IndexedDB, por usuario) y la reenvía en orden cuando vuelve la conexión
 * o al abrir la app. No es un caché de datos: solo peticiones por enviar.
 */
import { ref } from 'vue'

export interface OutboxItem {
  id?: number
  userId: number
  url: string
  method: 'POST' | 'PUT'
  body: Record<string, unknown>
  createdAt: string
}

const DB_NAME = 'permis-outbox'
const STORE = 'queue'

/** Número de envíos pendientes del usuario actual (para la cabecera). */
export const pendingCount = ref(0)

function available(): boolean {
  return typeof indexedDB !== 'undefined'
}

function openDb(): Promise<IDBDatabase> {
  return new Promise((resolve, reject) => {
    const req = indexedDB.open(DB_NAME, 1)
    req.onupgradeneeded = () => {
      const db = req.result
      if (!db.objectStoreNames.contains(STORE)) db.createObjectStore(STORE, { keyPath: 'id', autoIncrement: true })
    }
    req.onsuccess = () => resolve(req.result)
    req.onerror = () => reject(req.error)
  })
}

function tx<T>(mode: IDBTransactionMode, run: (store: IDBObjectStore) => IDBRequest<T>): Promise<T> {
  return openDb().then(
    (db) =>
      new Promise<T>((resolve, reject) => {
        const t = db.transaction(STORE, mode)
        const req = run(t.objectStore(STORE))
        req.onsuccess = () => resolve(req.result)
        req.onerror = () => reject(req.error)
        t.oncomplete = () => db.close()
      }),
  )
}

async function listAll(): Promise<OutboxItem[]> {
  if (!available()) return []
  return tx<OutboxItem[]>('readonly', (s) => s.getAll()).catch(() => [])
}

export async function refreshPending(userId: number | null): Promise<number> {
  const items = await listAll()
  pendingCount.value = userId === null ? 0 : items.filter((i) => i.userId === userId).length
  return pendingCount.value
}

export async function enqueue(item: Omit<OutboxItem, 'id' | 'createdAt'>): Promise<void> {
  if (!available()) return
  await tx('readwrite', (s) => s.add({ ...item, createdAt: new Date().toISOString() })).catch(() => undefined)
  await refreshPending(item.userId)
}

/** Error de red (servidor inalcanzable), por oposición a un rechazo HTTP del servidor. */
export function isNetworkError(e: unknown): boolean {
  const err = e as { statusCode?: number; status?: number; response?: unknown } | null
  if (typeof navigator !== 'undefined' && navigator.onLine === false) return true
  return !err?.statusCode && !err?.status && !err?.response
}

let flushing = false

/**
 * Reenvía en orden los elementos del usuario. Se detiene al primer fallo de
 * red (se reintentará más tarde); un rechazo del servidor (4xx/5xx) descarta
 * el elemento, porque reenviarlo no cambiaría nada. Devuelve cuántos se enviaron.
 */
export async function flush(userId: number): Promise<number> {
  if (!available() || flushing) return 0
  flushing = true
  let sent = 0
  try {
    const items = (await listAll()).filter((i) => i.userId === userId).sort((a, b) => (a.id ?? 0) - (b.id ?? 0))
    for (const item of items) {
      try {
        await $fetch(item.url, { method: item.method, body: item.body })
        sent++
      } catch (e) {
        if (isNetworkError(e)) break
      }
      await tx('readwrite', (s) => s.delete(item.id!)).catch(() => undefined)
    }
  } finally {
    flushing = false
    await refreshPending(userId)
  }
  return sent
}
