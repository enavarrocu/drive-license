/**
 * Pictogramas y formas para dibujar las señales belgas en SVG (viewBox 100×100).
 * Dibujos esquemáticos propios: forma, color y símbolo fieles a la señal real,
 * sin pretender reproducir el trazado oficial.
 */

export const RED = '#d1232a'
export const BLUE = '#1d5bbf'
export const BLK = '#111'
export const WHT = '#fff'
export const YEL = '#f6c700'
export const GRY = '#8a8a8a'

/* ---------- formas (fondo) ---------- */
export const shapes = {
  triangle: (i: string, stroke = RED) => `<polygon points="50,6 96,88 4,88" fill="${WHT}" stroke="${stroke}" stroke-width="9" stroke-linejoin="round"/>${i}`,
  triangleDown: (i: string) => `<polygon points="4,12 96,12 50,94" fill="${WHT}" stroke="${RED}" stroke-width="9" stroke-linejoin="round"/>${i}`,
  octagon: (i: string) => `<polygon points="30,4 70,4 96,30 96,70 70,96 30,96 4,70 4,30" fill="${RED}" stroke="${WHT}" stroke-width="4"/>${i}`,
  diamond: (i: string) => `<polygon points="50,3 97,50 50,97 3,50" fill="${WHT}" stroke="#333" stroke-width="2"/><polygon points="50,20 80,50 50,80 20,50" fill="${YEL}"/>${i}`,
  circleRed: (i: string, stroke = RED, fill = WHT) => `<circle cx="50" cy="50" r="45" fill="${fill}" stroke="${stroke}" stroke-width="9"/>${i}`,
  circleRedFull: (i: string) => `<circle cx="50" cy="50" r="46" fill="${RED}" stroke="${WHT}" stroke-width="3"/>${i}`,
  circleBlue: (i: string) => `<circle cx="50" cy="50" r="46" fill="${BLUE}" stroke="${WHT}" stroke-width="3"/>${i}`,
  circlePark: (i: string) => `<circle cx="50" cy="50" r="45" fill="${BLUE}" stroke="${RED}" stroke-width="9"/>${i}`,
  rectBlue: (i: string) => `<rect x="6" y="6" width="88" height="88" rx="6" fill="${BLUE}" stroke="${WHT}" stroke-width="3"/>${i}`,
  rectWhite: (i: string) => `<rect x="6" y="6" width="88" height="88" rx="6" fill="${WHT}" stroke="#333" stroke-width="3"/>${i}`,
  rectGreen: (i: string) => `<rect x="6" y="6" width="88" height="88" rx="6" fill="#1f7a3a" stroke="${WHT}" stroke-width="3"/>${i}`,
  /** Señal E9 real: rectángulo azul vertical, P grande arriba a la izquierda, pictograma abajo a la derecha. */
  tallBlue: (i: string) => `<rect x="24" y="2" width="52" height="96" rx="6" fill="${BLUE}"/>${i}`,
  squareBlue: (i: string) => `<rect x="6" y="6" width="88" height="88" fill="${BLUE}" stroke="${WHT}" stroke-width="3"/>${i}`,
  /** Fin de prohibición: círculo gris con barras */
  circleEnd: (i: string) => `<circle cx="50" cy="50" r="45" fill="${WHT}" stroke="${GRY}" stroke-width="5"/>${i}<line x1="22" y1="78" x2="78" y2="22" stroke="${GRY}" stroke-width="6"/><line x1="30" y1="86" x2="86" y2="30" stroke="${GRY}" stroke-width="3"/><line x1="14" y1="70" x2="70" y2="14" stroke="${GRY}" stroke-width="3"/>`,
  /** Fin de zona (rectángulo blanco con barra) */
  rectEnd: (i: string) => `<rect x="6" y="6" width="88" height="88" rx="6" fill="${WHT}" stroke="#333" stroke-width="3"/>${i}<line x1="12" y1="88" x2="88" y2="12" stroke="${RED}" stroke-width="7"/>`,
  rectWhiteRedBar: (i: string) => `<rect x="6" y="6" width="88" height="88" rx="6" fill="${WHT}" stroke="#333" stroke-width="3"/>${i}<line x1="12" y1="88" x2="88" y2="12" stroke="${RED}" stroke-width="7"/>`,
  rectBlueEnd: (i: string) => `<rect x="6" y="6" width="88" height="88" rx="6" fill="${BLUE}" stroke="${WHT}" stroke-width="3"/>${i}<line x1="12" y1="88" x2="88" y2="12" stroke="${RED}" stroke-width="7"/>`,
}

/* ---------- helpers ---------- */
export const T = (txt: string, y = 60, size = 30, fill = BLK, x = 50, weight = 700) =>
  `<text x="${x}" y="${y}" text-anchor="middle" font-family="Arial, Helvetica, sans-serif" font-weight="${weight}" font-size="${size}" fill="${fill}">${txt}</text>`

export const g = (inner: string, transform: string) => `<g transform="${transform}">${inner}</g>`

/** Barra roja diagonal (prohibición sobre un pictograma) */
export const SLASH = `<line x1="22" y1="78" x2="78" y2="22" stroke="${RED}" stroke-width="8"/>`

/* ---------- pictogramas (centrados en 50,55 aprox., color param.) ---------- */
export const P = {
  car: (c = BLK) => `<path d="M22 62 l7-16 h42 l7 16 v11 h-7 a5 5 0 0 1 -10 0 h-22 a5 5 0 0 1 -10 0 h-7z" fill="${c}"/>`,
  carFront: (c = BLK) => `<path d="M26 70 v-12 l8-18 h32 l8 18 v12 h-8 v4 h-8 v-4 h-16 v4 h-8 v-4z M34 60 a4 4 0 1 0 0.1 0 M66 60 a4 4 0 1 0 0.1 0" fill="${c}"/>`,
  truck: (c = BLK) => `<path d="M14 66 v-22 h40 v8 h18 l10 10 v10 h-6 a6 6 0 0 1 -12 0 h-28 a6 6 0 0 1 -12 0 h-10z" fill="${c}"/>`,
  bus: (c = BLK) => `<path d="M18 68 v-30 a4 4 0 0 1 4-4 h56 a4 4 0 0 1 4 4 v30 h-6 a5 5 0 0 1 -10 0 h-32 a5 5 0 0 1 -10 0z" fill="${c}"/><rect x="24" y="40" width="52" height="12" fill="${WHT}"/>`,
  bike: (c = BLK) => `<g fill="none" stroke="${c}" stroke-width="4"><circle cx="30" cy="66" r="12"/><circle cx="70" cy="66" r="12"/><path d="M30 66 L44 44 L62 44 L70 66 M44 44 L52 66 L30 66 M58 36 L62 44 M52 36 h10"/></g>`,
  moto: (c = BLK) => `<g fill="none" stroke="${c}" stroke-width="5"><circle cx="28" cy="68" r="12"/><circle cx="72" cy="68" r="12"/><path d="M28 68 L40 46 L58 46 L72 68 M40 46 L36 36 h10 M58 46 L62 34 h8"/></g><path d="M40 46 h18 l6 14 h-30z" fill="${c}"/>`,
  moped: (c = BLK) => `<g fill="none" stroke="${c}" stroke-width="4"><circle cx="30" cy="68" r="11"/><circle cx="70" cy="68" r="11"/><path d="M30 68 L42 48 L60 48 L70 68 M42 48 L40 38 h8 M60 48 L64 40 h6"/></g><path d="M44 48 h14 l4 10 h-22z" fill="${c}"/>`,
  person: (c = BLK) => `<g fill="${c}"><circle cx="50" cy="28" r="7"/><path d="M42 38 h16 l4 22 h-6 l-2-12 v34 h-6 v-20 h-2 v20 h-6 v-34 l-2 12 h-6z"/></g>`,
  walker: (c = BLK) => `<g fill="${c}"><circle cx="52" cy="26" r="7"/><path d="M46 36 l12 2 l4 16 l8 6 l-3 5 l-10-7 l-2 8 l8 16 l-6 3 l-9-15 l-6 8 l-2 14 l-6-1 l2-18 l7-11 l-2-10 l-6 8 l-5-3z"/></g>`,
  children: (c = BLK) => `<g fill="${c}"><circle cx="38" cy="34" r="6"/><circle cx="60" cy="38" r="6"/><path d="M32 42 h12 l3 18 h-4 v20 h-5 v-18 h-3z M54 46 h12 l3 16 h-4 v18 h-5 v-16 h-3z"/></g>`,
  horse: (c = BLK) => `<path d="M24 80 v-26 q0-14 14-16 h18 l8-12 h8 l6 8 l6 2 v6 l-8 2 l-4 6 v30 h-7 v-22 h-20 v22 h-7 v-20 h-7 v20z" fill="${c}"/>`,
  rider: (c = BLK) => `<path d="M24 82 v-24 q0-14 14-16 h16 l8-12 h8 l6 8 l6 2 v6 l-8 2 l-4 6 v28 h-7 v-20 h-18 v20 h-7 v-18 h-7 v18z" fill="${c}"/><circle cx="46" cy="22" r="6" fill="${c}"/><path d="M40 30 h12 l4 14 h-6 l-2-6 h-6 l-4 8 h-6z" fill="${c}"/>`,
  horseCart: (c = BLK) => `<g transform="scale(0.62) translate(2,34)"><path d="M24 80 v-26 q0-14 14-16 h18 l8-12 h8 l6 8 l6 2 v6 l-8 2 l-4 6 v30 h-7 v-22 h-20 v22 h-7 v-20 h-7 v20z" fill="${c}"/></g><path d="M58 58 h26 v14 h-26z M50 64 h8" fill="${c}" stroke="${c}" stroke-width="3"/><circle cx="71" cy="78" r="6" fill="none" stroke="${c}" stroke-width="4"/>`,
  cart: (c = BLK) => `<path d="M24 60 h40 v-16 h-40z M64 52 h14 l6 8" fill="none" stroke="${c}" stroke-width="5"/><circle cx="44" cy="70" r="7" fill="none" stroke="${c}" stroke-width="5"/>`,
  tractor: (c = BLK) => `<path d="M30 56 v-16 h16 l6 12 h18 v12 h-6 a9 9 0 0 1 -18 0 h-4 a12 12 0 0 1 -24 0z" fill="${c}"/>`,
  train: (c = BLK) => `<path d="M30 70 h40 v-14 h-10 v-10 h-14 v10 h-16z" fill="${c}"/><circle cx="38" cy="74" r="4" fill="${c}"/><circle cx="62" cy="74" r="4" fill="${c}"/><path d="M26 80 h48" stroke="${c}" stroke-width="3"/>`,
  tram: (c = BLK) => `<path d="M30 74 h40 v-30 a6 6 0 0 0 -6 -6 h-28 a6 6 0 0 0 -6 6z" fill="${c}"/><rect x="36" y="44" width="28" height="12" fill="${WHT}"/><path d="M50 38 v-10 l10-6" stroke="${c}" stroke-width="3" fill="none"/><circle cx="38" cy="78" r="3" fill="${c}"/><circle cx="62" cy="78" r="3" fill="${c}"/>`,
  plane: (c = BLK) => `<path d="M50 30 l6 18 l24 8 v6 l-24-4 l-2 14 l8 6 v4 l-12-3 l-12 3 v-4 l8-6 l-2-14 l-24 4 v-6 l24-8z" fill="${c}"/>`,
  deer: (c = BLK) => `<path d="M26 82 v-24 q2-12 14-14 h18 l6-10 h8 l4 8 v8 l-6 2 v30 h-6 v-20 h-18 v20 h-6 v-18 h-8 v18z" fill="${c}"/><path d="M62 34 l-6-14 M62 34 l4-14 M66 20 l6-4 M56 20 l-6-4 M60 26 l-7-2 M64 26 l7-2" stroke="${c}" stroke-width="2.5" fill="none"/>`,
  cow: (c = BLK) => `<path d="M22 80 v-22 q0-12 12-14 h26 q8 0 12 6 l6 2 v8 l-6 2 v18 h-6 v-16 h-20 v16 h-6 v-14 h-6 v14z" fill="${c}"/><path d="M64 44 l8-8 M72 44 l-8-8" stroke="${c}" stroke-width="3"/><rect x="40" y="76" width="4" height="6" fill="${c}"/>`,
  roadNarrow: (c = BLK) => `<path d="M34 82 l6-34 M66 82 l-6-34" stroke="${c}" stroke-width="6"/>`,
  roadNarrowRight: (c = BLK) => `<path d="M34 82 v-34 M66 82 l-6-34" stroke="${c}" stroke-width="6"/>`,
  roadNarrowLeft: (c = BLK) => `<path d="M34 82 l6-34 M66 82 v-34" stroke="${c}" stroke-width="6"/>`,
  curveLeft: (c = BLK) => `<path d="M60 82 v-20 a16 16 0 0 0 -16 -16 h-8" stroke="${c}" stroke-width="8" fill="none"/>`,
  curveRight: (c = BLK) => `<path d="M40 82 v-20 a16 16 0 0 1 16 -16 h8" stroke="${c}" stroke-width="8" fill="none"/>`,
  doubleCurve: (c = BLK) => `<path d="M58 84 v-12 c0-10 -16-8 -16-18 c0-10 16-8 16-18 v-10" stroke="${c}" stroke-width="7" fill="none"/>`,
  hillDown: (c = BLK) => `<path d="M24 82 h52 l-52-24z" fill="${c}"/>${T('10%', 78, 11, WHT, 58)}`,
  hillUp: (c = BLK) => `<path d="M24 82 h52 v-24z" fill="${c}"/>${T('10%', 78, 11, WHT, 42)}`,
  bump: (c = BLK) => `<path d="M24 76 q13-20 26 0 t26 0" stroke="${c}" stroke-width="7" fill="none"/>`,
  raised: (c = BLK) => `<path d="M22 78 h16 l10-14 h4 l10 14 h16" stroke="${c}" stroke-width="6" fill="none"/>`,
  slippery: (c = BLK) => `<path d="M30 80 q12-22 0-40 M50 80 q12-22 0-40" stroke="${c}" stroke-width="4" fill="none"/>${`<g transform="translate(14,-4) scale(0.75) translate(10,20)">${P_car(c)}</g>`}`,
  gravel: (c = BLK) => `<g transform="translate(-8,0) scale(0.8) translate(12,16)">${P_car(c)}</g><circle cx="74" cy="48" r="3" fill="${c}"/><circle cx="80" cy="58" r="3" fill="${c}"/><circle cx="70" cy="64" r="3" fill="${c}"/>`,
  rocks: (c = BLK) => `<path d="M60 84 h20 l-8-20 l-6 6 l-4-12 l-6 10z M30 84 h20 l-4-14z" fill="${c}"/><path d="M58 40 l6 6 M66 34 l4 8 M72 44 l6 4" stroke="${c}" stroke-width="3"/>`,
  works: (c = BLK) => `<path d="M30 84 l12-34 h6 l-4 12 h12 l6-12 l8 2 l-10 20 h-10 l-2 12z" fill="${c}"/><circle cx="46" cy="40" r="6" fill="${c}"/>`,
  trafficLight: () => `<rect x="38" y="30" width="24" height="52" rx="6" fill="${BLK}"/><circle cx="50" cy="42" r="6" fill="${RED}"/><circle cx="50" cy="56" r="6" fill="#f0a500"/><circle cx="50" cy="70" r="6" fill="#2ecc71"/>`,
  wind: (c = BLK) => `<path d="M30 46 h40 l-6 18 h-28z" fill="${c}"/><rect x="28" y="40" width="4" height="46" fill="${c}"/>`,
  twoWay: (c = BLK) => `<path d="M40 82 v-40 l-8 10 M40 42 l8 10 M60 42 v40 l-8-10 M60 82 l8-10" stroke="${c}" stroke-width="6" fill="none"/>`,
  crossroad: (c = BLK) => `<path d="M50 30 v52 M30 56 h40" stroke="${c}" stroke-width="7"/>`,
  queue: (c = BLK) => `<g transform="scale(0.36) translate(10,80)">${P_car(c)}</g><g transform="scale(0.36) translate(80,80)">${P_car(c)}</g><g transform="scale(0.36) translate(150,80)">${P_car(c)}</g><g transform="scale(0.36) translate(45,140)">${P_car(c)}</g><g transform="scale(0.36) translate(115,140)">${P_car(c)}</g>`,
  exclaim: (c = BLK) => `<rect x="46" y="34" width="8" height="30" fill="${c}"/><circle cx="50" cy="74" r="5" fill="${c}"/>`,
  quay: (c = BLK) => `<rect x="22" y="64" width="34" height="18" fill="${c}"/><g transform="translate(-14,-22) scale(0.55) translate(30,40)">${P_car(c)}</g><path d="M58 70 q6-6 12 0 t12 0 M58 80 q6-6 12 0 t12 0" stroke="${c}" stroke-width="3" fill="none"/>`,
  bridgeOpen: (c = BLK) => `<rect x="18" y="70" width="26" height="8" fill="${c}"/><path d="M44 70 l22-30" stroke="${c}" stroke-width="8"/><rect x="60" y="70" width="22" height="8" fill="${c}"/><path d="M22 60 v10 M38 60 v10 M62 60 v10 M78 60 v10" stroke="${c}" stroke-width="3"/><path d="M14 84 q6-5 12 0 t12 0 t12 0 t12 0 t12 0 t12 0" stroke="${c}" stroke-width="2.5" fill="none"/>`,
  barrierGate: (c = BLK) => `<path d="M26 78 h48 M30 78 v-16 h40 v16 M36 62 l-4 16 M46 62 l-4 16 M56 62 l-4 16 M66 62 l-4 16" stroke="${c}" stroke-width="4" fill="none"/>`,
  arrowUp: (c = WHT) => `<path d="M50 18 l16 20 h-9 v40 h-14 v-40 h-9z" fill="${c}"/>`,
  arrowDown: (c = WHT) => `<path d="M50 82 l16-20 h-9 v-40 h-14 v40 h-9z" fill="${c}"/>`,
  arrowRight: (c = WHT) => `<path d="M82 50 l-20 16 v-9 h-40 v-14 h40 v-9z" fill="${c}"/>`,
  arrowLeft: (c = WHT) => `<path d="M18 50 l20-16 v9 h40 v14 h-40 v9z" fill="${c}"/>`,
  arrowTurnRight: (c = WHT) => `<path d="M38 82 v-30 a8 8 0 0 1 8-8 h14 v-10 l18 14 l-18 14 v-10 h-10 v30z" fill="${c}"/>`,
  arrowTurnLeft: (c = WHT) => `<path d="M62 82 v-30 a8 8 0 0 0 -8-8 h-14 v-10 l-18 14 l18 14 v-10 h10 v30z" fill="${c}"/>`,
  arrowUTurn: (c = BLK) => `<path d="M64 78 v-26 a14 14 0 0 0 -28 0 v10 M36 62 l-8-8 M36 62 l8-8" stroke="${c}" stroke-width="7" fill="none"/>`,
  roundabout: (c = WHT) => `<path d="M45.7 74.6 A25 25 0 0 0 72.7 60.6" stroke="${c}" stroke-width="7" fill="none"/><path d="M77.3 50.6 L79.9 63.9 L65.4 57.2z" fill="${c}"/><path d="M30.8 33.9 A25 25 0 0 0 29.5 64.3" stroke="${c}" stroke-width="7" fill="none"/><path d="M35.8 73.4 L23.0 68.9 L36.1 59.8z" fill="${c}"/><path d="M73.5 41.4 A25 25 0 0 0 47.8 25.1" stroke="${c}" stroke-width="7" fill="none"/><path d="M36.9 26.1 L47.1 17.1 L48.5 33.1z" fill="${c}"/>`,
  parkingP: (c = WHT) => T('P', 70, 54, c),
  /** P de las E9 verticales (arriba a la izquierda). */
  parkingPTall: (c = WHT) => T('P', 64, 64, c, 44),
  /** Disco de estacionamiento: tarjeta blanca con muesca, sector y «P». */
  parkingDisc: (c = WHT) => `<path d="M0 4 q0-4 4-4 h6 l3 3 h2 l3-3 h6 q4 0 4 4 v24 q0 4-4 4 h-20 q-4 0-4-4z" fill="${c}"/><path d="M8 8 h12 l-6 9z" fill="${BLUE}"/><rect x="9" y="19" width="10" height="9" fill="none" stroke="${BLUE}" stroke-width="1.5"/><text x="14" y="26.5" font-size="7" font-weight="700" text-anchor="middle" fill="${BLUE}" font-family="Arial">P</text>`,
  /** Silla de ruedas (PMR). */
  wheelchair: (c = WHT) => `<circle cx="50" cy="26" r="9" fill="${c}"/><path d="M40 40 h20 l6 24 h16 v8 h-22 l-4-16 h-12 a16 16 0 1 0 14 24 l6 6 a24 24 0 1 1 -24-46z" fill="${c}"/>`,
  house: (c = WHT) => `<path d="M24 52 l26-20 26 20 v26 h-52z" fill="${c}"/>`,
  tunnel: (c = WHT) => `<path d="M24 80 v-26 a26 26 0 0 1 52 0 v26z" fill="${c}"/><path d="M34 80 v-20 a16 16 0 0 1 32 0 v20z" fill="${BLUE}"/>`,
  crossSaintAndre: () => `<path d="M15 25 L85 75 M85 25 L15 75" stroke="${RED}" stroke-width="10"/>`,
  chevronsDown: (c = WHT) => `<path d="M30 30 l20 14 20-14 M30 50 l20 14 20-14 M30 70 l20 14 20-14" stroke="${c}" stroke-width="6" fill="none"/>`,
  chains: (c = WHT) => `<circle cx="50" cy="58" r="22" fill="none" stroke="${c}" stroke-width="6" stroke-dasharray="8 6"/><circle cx="50" cy="58" r="8" fill="${c}"/>`,
  phone: (c = BLK) => `<path d="M34 30 h12 l6 14 l-8 6 q6 14 20 20 l6-8 l14 6 v12 h-10 q-40-4-52-52z" fill="${c}"/>`,
  fuel: (c = BLK) => `<path d="M30 80 v-46 h24 v46z M54 44 h8 v26 a6 6 0 0 0 12 0 v-20 l-6-6" fill="${c}" stroke="${c}" stroke-width="3"/><rect x="36" y="40" width="12" height="10" fill="${WHT}"/>`,
  bed: (c = BLK) => `<path d="M22 70 v-16 h56 v16 M22 54 v-10 h20 v10 M26 70 v8 M74 70 v8" stroke="${c}" stroke-width="5" fill="none"/>`,
  cutlery: (c = BLK) => `<path d="M38 28 v50 M34 28 v18 M42 28 v18 M60 28 q8 10 0 24 v26" stroke="${c}" stroke-width="5" fill="none"/>`,
  hospital: (c = WHT) => `<rect x="42" y="30" width="16" height="48" fill="${c}"/><rect x="26" y="46" width="48" height="16" fill="${c}"/>`,
  extinguisher: (c = WHT) => `<rect x="42" y="36" width="16" height="44" rx="6" fill="${c}"/><path d="M50 36 v-8 h10" stroke="${c}" stroke-width="4" fill="none"/>`,
  exitRun: (c = WHT) => `<rect x="60" y="30" width="20" height="48" fill="none" stroke="${c}" stroke-width="4"/>${`<g transform="translate(-10,0)">${P_walker(c)}</g>`}`,
  lanes: (c = WHT, n = 3) => Array.from({ length: n }, (_, i) => `<path d="M${26 + i * (48 / (n - 1))} 80 v-50" stroke="${c}" stroke-width="5"/>`).join(''),
  dotRed: () => `<circle cx="50" cy="64" r="9" fill="${RED}"/>`,
  pedCross: (c = WHT) => `<rect x="22" y="58" width="56" height="8" fill="${c}"/><rect x="22" y="72" width="56" height="8" fill="${c}"/><g transform="translate(0,-14) scale(0.7) translate(20,10)">${P_walker(c)}</g>`,
}

// helpers internos para reutilizar pictogramas dentro de otros
function P_car(c: string) {
  return `<path d="M22 62 l7-16 h42 l7 16 v11 h-7 a5 5 0 0 1 -10 0 h-22 a5 5 0 0 1 -10 0 h-7z" fill="${c}"/>`
}
function P_walker(c: string) {
  return `<g fill="${c}"><circle cx="52" cy="26" r="7"/><path d="M46 36 l12 2 l4 16 l8 6 l-3 5 l-10-7 l-2 8 l8 16 l-6 3 l-9-15 l-6 8 l-2 14 l-6-1 l2-18 l7-11 l-2-10 l-6 8 l-5-3z"/></g>`
}

/** Panel de dirección en forma de flecha con texto (F29/F31/F35/F41). */
export function arrowPanel(text: string, fill: string, stroke: string, textColor: string): string {
  return `<path d="M10 36 h62 l16 14 l-16 14 h-62z" fill="${fill}" stroke="${stroke}" stroke-width="2.5" stroke-linejoin="round"/>${T(text, 55, 12, textColor, 40)}`
}

export function svg(inner: string): string {
  return `<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg" role="img">${inner}</svg>`
}
