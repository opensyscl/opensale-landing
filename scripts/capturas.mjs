/**
 * Trae las capturas del ERP desde el repo de documentacion y las deja en WebP.
 *
 *   node scripts/capturas.mjs
 *
 * docs-erp las genera con Playwright contra el tenant demo, con login, tenant y
 * onboarding ya resueltos. Es la unica fuente: nunca capturas de clientes
 * reales, y nunca una pantalla dibujada a mano haciendose pasar por el producto.
 *
 * Cuando el ERP cambie de interfaz se vuelve a correr esto. La landing mostraba
 * una version anterior —azul, con otro logo lateral— que ya no existe.
 */
import sharp from 'sharp';
import { existsSync, mkdirSync, statSync } from 'node:fs';
import { dirname } from 'node:path';

const ORIGEN = '/home/jos/dev/docs-erp/public/img/docs';

/** pantalla del ERP -> donde la usa la landing */
const mapa = {
  'panel-de-inicio': 'public/images/producto/panel.webp',
  'informe-de-ventas': 'public/images/producto/ventas.webp',
  'inventario-listado': 'public/images/producto/inventario.webp',
  'compras-listado': 'public/images/producto/compras.webp',
  'centro-de-reportes': 'public/images/producto/reportes.webp',
  // Fondos de las tarjetas de Features
  'punto-de-venta': 'public/images/features/venta.webp',
  'conteo-fisico': 'public/images/features/inventario.webp',
  // Seccion multi-app
  'agenda': 'public/images/apps/agenda.webp',
  'reparto-panel': 'public/images/apps/reparto.webp',
  'terminales': 'public/images/apps/terminales.webp',
};

const kb = (n) => `${Math.round(n / 1024)} KB`;

for (const [pantalla, destino] of Object.entries(mapa)) {
  const origen = `${ORIGEN}/${pantalla}.png`;
  if (!existsSync(origen)) {
    console.error(`FALTA ${origen}`);
    continue;
  }
  mkdirSync(dirname(destino), { recursive: true });

  const img = sharp(origen);
  const { width, height } = await img.metadata();
  await img.webp({ quality: 86, effort: 6 }).toFile(destino);

  console.log(
    `${pantalla.padEnd(20)} ${String(width + 'x' + height).padEnd(10)} ` +
      `${kb(statSync(origen).size).padStart(8)} -> ${kb(statSync(destino).size).padStart(8)}  ${destino.replace('public', '')}`,
  );
}
