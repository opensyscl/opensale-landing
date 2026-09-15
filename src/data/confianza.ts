/**
 * Lo que el sitio declara sobre con quien trabaja y que tan seguro es.
 *
 * REGLA: aca no entra nada que no se pueda probar. Una insignia de socio que
 * no existe se verifica en el directorio publico del programa —Google y Meta
 * los tienen abiertos— y el costo de que un comprador la revise y no la
 * encuentre es la venta entera.
 *
 * Dos listas, porque responden preguntas distintas:
 *   - `socios`: con quien trabaja OpenSale. Va en el hero.
 *   - `sellos`: por que es seguro pagar y cargar datos. Va cerca de precios y
 *     del cierre, que es donde aparece la desconfianza.
 */
import type { marcas } from './marcas';

export type Socio = {
  nombre: string;
  marca: keyof typeof marcas;
  /**
   * Insignia acreditada de un programa de socios, con directorio publico que
   * cualquiera puede consultar. Las marca distinto y pide el arte oficial.
   */
  acreditado?: boolean;
  /** Donde se verifica la acreditacion. Sale como enlace. */
  verificarEn?: string;
};

/**
 * PENDIENTE — el arte oficial.
 *
 * Google Partners y Meta entregan una insignia propia, unica por socio, desde
 * el panel de cada programa; no se puede rearmar con el logo de la marca. Lo
 * que hay abajo es la marca en trazado, correcta pero generica.
 *
 * Cuando esten los archivos:
 *   1. public/images/socios/google-partner.svg y meta-business-partner.svg
 *   2. cambiar `marca` por `arte` en esos dos items
 *
 * Igual con Transbank: la tarjeta generica se reemplaza por la marca del kit
 * oficial una vez que el convenio habilite su uso.
 */
export const socios: Socio[] = [
  {
    nombre: 'Google Partner',
    marca: 'google',
    acreditado: true,
    verificarEn: 'https://www.google.com/partners/',
  },
  {
    nombre: 'Meta Business Partner',
    marca: 'meta',
    acreditado: true,
    verificarEn: 'https://www.facebook.com/business/partner-directory',
  },
  { nombre: 'Transbank Webpay', marca: 'webpay', acreditado: true },
  { nombre: 'Mercado Pago', marca: 'mercadopago' },
  { nombre: 'SII', marca: 'documento' },
  { nombre: 'WhatsApp Business', marca: 'whatsapp' },
  { nombre: 'Google Maps', marca: 'googlemaps' },
  { nombre: 'Cloudflare', marca: 'cloudflare' },
];

export type Sello = {
  titulo: string;
  /** Que significa, en una linea. Sin esto un sello es un adorno. */
  detalle: string;
  icono: 'candado' | 'tarjeta' | 'escudo' | 'documento';
};

/**
 * Cada uno describe algo que el ERP hace de verdad. `tarjeta` y `documento`
 * salen de las integraciones ya configuradas; `candado` y `escudo`, de como
 * esta servido el sitio y de Turnstile en los formularios publicos.
 */
export const sellos: Sello[] = [
  {
    titulo: 'Pago seguro',
    detalle: 'El cobro pasa por Transbank Webpay. La tarjeta nunca toca nuestros servidores.',
    icono: 'tarjeta',
  },
  {
    titulo: 'Conexión cifrada',
    detalle: 'Todo el trafico va por HTTPS, de tu navegador al servidor y de vuelta.',
    icono: 'candado',
  },
  {
    titulo: 'Documentos ante el SII',
    detalle: 'Boletas y facturas electronicas emitidas contra el servicio, no en una planilla.',
    icono: 'documento',
  },
  {
    titulo: 'Formularios protegidos',
    detalle: 'Cloudflare Turnstile filtra los bots sin hacerte resolver un captcha.',
    icono: 'escudo',
  },
];

/** Glifos de los sellos. Trazo, para que hereden el color del texto. */
export const iconosSello: Record<Sello['icono'], string> = {
  candado: 'M6 10V7a6 6 0 1 1 12 0v3h1a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-8a2 2 0 0 1 2-2h1Zm2 0h8V7a4 4 0 0 0-8 0v3Z',
  tarjeta: 'M2.25 5.25h19.5A2.25 2.25 0 0 1 24 7.5v9a2.25 2.25 0 0 1-2.25 2.25H2.25A2.25 2.25 0 0 1 0 16.5v-9A2.25 2.25 0 0 1 2.25 5.25Zm0 4.5h19.5v1.5H2.25v-1.5Zm2.25 4.5h5.25v1.5H4.5v-1.5Z',
  escudo: 'M12 2 3 5.5v6c0 5 3.8 9.7 9 10.5 5.2-.8 9-5.5 9-10.5v-6L12 2Zm-1 13.5-3.5-3.5 1.4-1.4L11 12.7l5.1-5.1 1.4 1.4-6.5 6.5Z',
  documento: 'M6 2h8l4 4v16H6V2Zm8 1.5V7h3.5L14 3.5ZM8.5 11h7v1.5h-7V11Zm0 3.5h7V16h-7v-1.5Z',
};
