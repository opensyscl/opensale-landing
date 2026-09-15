/**
 * Las superficies de OpenSale.
 *
 * Es lo que lo separa de un ERP a secas: no es un sistema con una pantalla,
 * son cinco lugares distintos donde el negocio trabaja, sobre los mismos datos.
 * Hasta ahora la landing no lo contaba en ninguna parte.
 *
 * `captura` solo aparece donde hay una foto real de la pantalla, sacada del
 * tenant demo por docs-erp. Las apps Android existen —el POS esta en v0.6.0—
 * pero todavia no hay capturas suyas en ningun repo, asi que van sin imagen en
 * vez de con un mockup dibujado.
 */
export type App = {
  slug: string;
  nombre: string;
  /** Donde corre. Sale como etiqueta chica arriba del nombre. */
  donde: string;
  que: string;
  captura?: string;
  /** Version publicada, si la tiene. */
  version?: string;
  icono: 'monitor' | 'caja' | 'calendario' | 'camion' | 'chat';
};

export const apps: App[] = [
  {
    slug: 'erp',
    nombre: 'El ERP',
    donde: 'Navegador',
    que: 'Inventario, compras, caja y reportes. El lugar donde se administra todo.',
    captura: '/images/producto/panel.webp',
    icono: 'monitor',
  },
  {
    slug: 'pos',
    nombre: 'Punto de venta',
    donde: 'Navegador y terminal',
    que: 'Cobrar rápido en el mostrador, con lector de código y cierre de caja.',
    captura: '/images/apps/terminales.webp',
    icono: 'caja',
  },
  {
    slug: 'agenda',
    nombre: 'Agenda',
    donde: 'Navegador',
    que: 'Las citas del local y lo que facturan, en la misma caja que las ventas.',
    captura: '/images/apps/agenda.webp',
    icono: 'calendario',
  },
  {
    slug: 'reparto',
    nombre: 'Reparto',
    donde: 'Navegador',
    que: 'Rutas, cargas y pedidos del día, con la facturación del reparto incluida.',
    captura: '/images/apps/reparto.webp',
    icono: 'camion',
  },
  {
    slug: 'pos-android',
    nombre: 'OpenSale POS',
    donde: 'Android',
    que: 'El punto de venta en la app, para vender fuera del escritorio.',
    version: '0.6.0',
    icono: 'caja',
  },
  {
    slug: 'repartidor',
    nombre: 'App del repartidor',
    donde: 'Android',
    que: 'El recorrido del día en el teléfono, con avisos push de cada pedido.',
    icono: 'camion',
  },
  {
    slug: 'whatsapp',
    nombre: 'Tu WhatsApp',
    donde: 'Tu propio número',
    que: 'El comprobante y los avisos le llegan al cliente donde ya te escribe.',
    icono: 'chat',
  },
];

/** Glifos, en el mismo trazo que el resto del sitio. */
export const iconosApp: Record<App['icono'], string> = {
  monitor: 'M3 4h18a1 1 0 0 1 1 1v11a1 1 0 0 1-1 1h-7v2h3v2H7v-2h3v-2H3a1 1 0 0 1-1-1V5a1 1 0 0 1 1-1Zm1 2v9h16V6H4Z',
  caja: 'M3 3h18l-1.2 5H4.2L3 3Zm1.5 7h15l1 11H3.5l1-11ZM9 13v5h2v-5H9Zm4 0v5h2v-5h-2Z',
  calendario: 'M7 2v2h10V2h2v2h2a1 1 0 0 1 1 1v16a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V5a1 1 0 0 1 1-1h2V2h2ZM4 9v11h16V9H4Zm2 2h4v4H6v-4Z',
  camion: 'M2 5h12a1 1 0 0 1 1 1v3h3.5l3.5 4v4h-2a3 3 0 0 1-6 0H9a3 3 0 0 1-6 0H1V6a1 1 0 0 1 1-1Zm13 6v3h4.2L17 11h-2ZM6 16a1 1 0 1 0 0 2 1 1 0 0 0 0-2Zm10 0a1 1 0 1 0 0 2 1 1 0 0 0 0-2Z',
  chat: 'M12 2c5.5 0 10 3.6 10 8s-4.5 8-10 8c-1 0-2-.1-2.9-.4L3 20l1.6-3.7C3 15 2 13.1 2 10c0-4.4 4.5-8 10-8Z',
};
