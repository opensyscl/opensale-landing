/**
 * Genera public/og-image.png, la imagen de las previsualizaciones al compartir.
 *
 *   node scripts/og-image.mjs
 *
 * No corre en el build: el PNG se commitea. Se regenera a mano cuando cambia
 * el titular, el logo o la marca.
 *
 * Por que da tantas vueltas con la fuente: sharp rasteriza el SVG con librsvg,
 * que ignora @font-face —da igual si es una URL o un data URI— y resuelve las
 * tipografias por fontconfig. Asi que hay que dejarle Onest donde la busca:
 * se descomprime el woff2 del sitio a TTF y se apunta un fontconfig temporal
 * a esa carpeta. Sin esto el titular sale en DejaVu Sans.
 */
import { mkdtempSync, writeFileSync, readFileSync, rmSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { decompress } from 'wawoff2';

const temp = mkdtempSync(join(tmpdir(), 'opensale-og-'));

try {
  for (const peso of ['400', '500']) {
    const woff2 = readFileSync(`public/fonts/onest-${peso}.woff2`);
    writeFileSync(join(temp, `onest-${peso}.ttf`), Buffer.from(await decompress(woff2)));
  }

  const conf = join(temp, 'fonts.conf');
  writeFileSync(
    conf,
    `<?xml version="1.0"?>
<!DOCTYPE fontconfig SYSTEM "fonts.dtd">
<fontconfig>
  <dir>${temp}</dir>
  <cachedir>${temp}/cache</cachedir>
</fontconfig>`,
  );

  // Antes de importar sharp: librsvg lee fontconfig una sola vez, al inicializarse.
  process.env.FONTCONFIG_FILE = conf;
  const { default: sharp } = await import('sharp');

  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630" viewBox="0 0 1200 630">
  <rect width="1200" height="630" fill="#fbfaf6"/>
  <rect x="0" y="626" width="1200" height="4" fill="#2f8b91"/>

  <g transform="translate(88 76)">
    <g fill="none" stroke="#1c1a15" stroke-width="13" stroke-linejoin="round" stroke-linecap="round"
       transform="scale(0.44)">
      <path d="M 84 61 L 67 90.44 L 33 90.44 L 16 61"/>
      <path d="M 16 39 L 33 9.56 L 67 9.56 L 84 39"/>
    </g>
    <text x="56" y="33" font-family="Onest" font-size="34" font-weight="500"
          letter-spacing="-0.7" fill="#1c1a15">OpenSale</text>
  </g>

  <text x="88" y="330" font-family="Onest" font-size="68" font-weight="500"
        letter-spacing="-2.4" fill="#1c1a15">Toda tu operación de ventas,</text>
  <text x="88" y="404" font-family="Onest" font-size="68" font-weight="500"
        letter-spacing="-2.4" fill="#1c1a15">en un solo lugar.</text>

  <text x="88" y="492" font-family="Onest" font-size="30" font-weight="400"
        letter-spacing="-0.3" fill="#56524a">ERP y punto de venta para pymes</text>
</svg>`;

  await sharp(Buffer.from(svg)).png({ compressionLevel: 9 }).toFile('public/og-image.png');
  console.log('public/og-image.png generado');
} finally {
  rmSync(temp, { recursive: true, force: true });
}
