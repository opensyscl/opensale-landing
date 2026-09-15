/**
 * Convierte a WebP los PNG pesados de la landing.
 *
 *   node scripts/optimizar-imagenes.mjs
 *
 * Son fondos e ilustraciones: ninguno necesita canal alfa de 8 bits ni la
 * compresion sin perdida del PNG. Cuatro archivos se llevaban 1,6 MB de los
 * 2,2 MB de public/images, y el peso de las imagenes pega directo en LCP, que
 * es senal de posicionamiento desde 2021.
 *
 * Deja los PNG originales en su lugar: el que borra es el commit, no el script.
 */
import sharp from 'sharp';
import { statSync } from 'node:fs';

const archivos = [
  'public/images/hero/hero-flowers.png',
  'public/images/hero/hero-inbox.png',
  'public/images/features/card-1.png',
  'public/images/features/card-2.png',
  'public/images/features/card-3.png',
];

const kb = (n) => `${Math.round(n / 1024)} KB`;
let antes = 0;
let despues = 0;

for (const origen of archivos) {
  const destino = origen.replace(/\.png$/, '.webp');
  // quality 82 es donde deja de notarse la diferencia en fotos e ilustraciones.
  await sharp(origen).webp({ quality: 82, effort: 6 }).toFile(destino);

  const a = statSync(origen).size;
  const d = statSync(destino).size;
  antes += a;
  despues += d;
  console.log(`${origen.split('/').pop().padEnd(18)} ${kb(a).padStart(8)} -> ${kb(d).padStart(8)}  (-${Math.round((1 - d / a) * 100)}%)`);
}

console.log(`\ntotal ${kb(antes)} -> ${kb(despues)}  (-${Math.round((1 - despues / antes) * 100)}%)`);
