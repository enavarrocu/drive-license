import { deflateSync } from 'node:zlib'
import { mkdirSync, writeFileSync } from 'node:fs'
import { join } from 'node:path'

/**
 * Genera los iconos de la PWA (public/icons/*.png) sin dependencias: rasteriza
 * una figura geométrica (fondo azul oscuro + rombo amarillo con borde blanco,
 * la señal B9 «voie prioritaire») y la codifica en PNG a mano (zlib + CRC).
 *
 *   pnpm icons
 *
 * Variantes: icon-192 / icon-512 (esquinas redondeadas, fondo transparente),
 * icon-maskable-512 (cuadrado completo, figura en la zona segura del 80 %) y
 * apple-touch-icon (180, cuadrado opaco; iOS redondea solo).
 */

const BG = [0x1b, 0x2a, 0x41] as const // = theme-color
const YELLOW = [0xf2, 0xc1, 0x1c] as const
const WHITE = [0xff, 0xff, 0xff] as const

interface Variant {
  file: string
  size: number
  /** Radio de las esquinas (0 = cuadrado), en fracción del lado. */
  radius: number
  /** Mitad de la diagonal del rombo blanco y del amarillo (fracción del lado). */
  outer: number
  inner: number
}

const variants: Variant[] = [
  { file: 'icon-192.png', size: 192, radius: 0.18, outer: 0.32, inner: 0.25 },
  { file: 'icon-512.png', size: 512, radius: 0.18, outer: 0.32, inner: 0.25 },
  { file: 'icon-maskable-512.png', size: 512, radius: 0, outer: 0.26, inner: 0.2 },
  { file: 'apple-touch-icon.png', size: 180, radius: 0, outer: 0.32, inner: 0.25 },
]

/** Devuelve [r,g,b,a] para un punto (x,y) en coordenadas 0..1. */
function sample(x: number, y: number, v: Variant): [number, number, number, number] {
  // esquinas redondeadas: fuera del rounded-rect → transparente
  if (v.radius > 0) {
    const r = v.radius
    const dx = Math.max(Math.abs(x - 0.5) - (0.5 - r), 0)
    const dy = Math.max(Math.abs(y - 0.5) - (0.5 - r), 0)
    if (dx * dx + dy * dy > r * r) return [0, 0, 0, 0]
  }
  const d = Math.abs(x - 0.5) + Math.abs(y - 0.5)
  if (d <= v.inner) return [...YELLOW, 255]
  if (d <= v.outer) return [...WHITE, 255]
  return [...BG, 255]
}

/** Rasteriza con supermuestreo 4×4 para suavizar los bordes. */
function raster(v: Variant): Buffer {
  const { size } = v
  const SS = 4
  const rows = Buffer.alloc((size * 4 + 1) * size)
  for (let py = 0; py < size; py++) {
    rows[py * (size * 4 + 1)] = 0 // filtro PNG «None»
    for (let px = 0; px < size; px++) {
      let r = 0, g = 0, b = 0, a = 0
      for (let sy = 0; sy < SS; sy++) {
        for (let sx = 0; sx < SS; sx++) {
          const [cr, cg, cb, ca] = sample((px + (sx + 0.5) / SS) / size, (py + (sy + 0.5) / SS) / size, v)
          // premultiplicado para promediar bien con la transparencia
          r += cr * ca
          g += cg * ca
          b += cb * ca
          a += ca
        }
      }
      const o = py * (size * 4 + 1) + 1 + px * 4
      if (a > 0) {
        rows[o] = Math.round(r / a)
        rows[o + 1] = Math.round(g / a)
        rows[o + 2] = Math.round(b / a)
      }
      rows[o + 3] = Math.round(a / (SS * SS))
    }
  }
  return rows
}

/* ---------- codificación PNG ---------- */
const CRC_TABLE = new Uint32Array(256).map((_, n) => {
  let c = n
  for (let k = 0; k < 8; k++) c = c & 1 ? 0xedb88320 ^ (c >>> 1) : c >>> 1
  return c >>> 0
})
function crc32(buf: Buffer): number {
  let c = 0xffffffff
  for (const byte of buf) c = CRC_TABLE[(c ^ byte) & 0xff]! ^ (c >>> 8)
  return (c ^ 0xffffffff) >>> 0
}
function chunk(type: string, data: Buffer): Buffer {
  const len = Buffer.alloc(4)
  len.writeUInt32BE(data.length)
  const body = Buffer.concat([Buffer.from(type, 'ascii'), data])
  const crc = Buffer.alloc(4)
  crc.writeUInt32BE(crc32(body))
  return Buffer.concat([len, body, crc])
}
function png(size: number, rows: Buffer): Buffer {
  const ihdr = Buffer.alloc(13)
  ihdr.writeUInt32BE(size, 0)
  ihdr.writeUInt32BE(size, 4)
  ihdr[8] = 8 // bit depth
  ihdr[9] = 6 // RGBA
  ihdr[10] = 0
  ihdr[11] = 0
  ihdr[12] = 0
  return Buffer.concat([
    Buffer.from([0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a]),
    chunk('IHDR', ihdr),
    chunk('IDAT', deflateSync(rows, { level: 9 })),
    chunk('IEND', Buffer.alloc(0)),
  ])
}

/* ---------- SVG (favicon) con la misma figura ---------- */
function svg(): string {
  const hex = (c: readonly number[]) => '#' + c.map((n) => n.toString(16).padStart(2, '0')).join('')
  const diamond = (r: number, fill: string) => `<path d="M50 ${50 - r} L${50 + r} 50 L50 ${50 + r} L${50 - r} 50 Z" fill="${fill}"/>`
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><rect width="100" height="100" rx="18" fill="${hex(BG)}"/>${diamond(32, hex(WHITE))}${diamond(25, hex(YELLOW))}</svg>\n`
}

const outDir = join(process.cwd(), 'public', 'icons')
mkdirSync(outDir, { recursive: true })
for (const v of variants) {
  writeFileSync(join(outDir, v.file), png(v.size, raster(v)))
  console.log(`✔ ${v.file} (${v.size}×${v.size})`)
}
writeFileSync(join(outDir, 'icon.svg'), svg())
console.log('✔ icon.svg')
