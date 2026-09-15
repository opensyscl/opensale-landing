/**
 * Configuracion centralizada del sitio.
 * UNICO lugar a editar para dominio, marca y datos para JSON-LD.
 */
export const site = {
  /**
   * PLACEHOLDER. De aca salen el canonical, el og:url, el sitemap y todas las
   * URL absolutas del JSON-LD. Mientras apunte a un dominio falso el SEO no
   * sirve: Google indexa lo que dice el canonical, no donde esta alojado.
   * Cambiar aca y en `site:` de astro.config.mjs, que tienen que coincidir.
   */
  siteUrl: 'https://opensale.example',
  siteName: 'OpenSale',
  defaultTitle: 'OpenSale — Toda tu operación de ventas, en un solo lugar',
  titleTemplate: '%s — OpenSale',
  /**
   * La que sale en el resultado de busqueda cuando la pagina no trae una
   * propia. Entre 120 y 160 caracteres: mas corto desaprovecha el espacio,
   * mas largo lo corta Google a mitad de frase.
   */
  description:
    'ERP y punto de venta para pymes: centraliza pedidos, inventario, caja y facturación en un solo lugar, y automatiza lo repetitivo. Plan gratis, sin tarjeta.',
  /** Imagen de las previsualizaciones al compartir. 1200x630. */
  ogImage: '/og-image.png',
  ogImageAlt: 'OpenSale — ERP y punto de venta para pymes',
  locale: 'es_CL',
  lang: 'es-CL',
  themeColor: '#fbfaf6',
  email: 'hola@opensale.example',
  /**
   * Donde vive la app. PLACEHOLDER: apunta al dominio real antes de publicar,
   * de aca salen el boton de registro del cierre y el "Iniciar sesion".
   */
  appUrl: 'https://app.opensale.example',
  /** Documentacion publica del producto. */
  docsUrl: 'https://docs.erp.opensys.cl',
  /**
   * Donde se entrega el formulario de demo.
   *
   * VACIO A PROPOSITO: mientras no haya endpoint, el formulario arma un correo
   * con todo lo cargado y lo abre en el cliente de mail. Eso funciona hoy y no
   * pierde un solo lead. Cuando exista el endpoint en el ERP, se pone aca y el
   * formulario pasa a enviarlo por fetch sin que el usuario salga de la pagina.
   */
  demoEndpoint: '',
} as const;


/**
 * Datos de la organizacion para el JSON-LD. Google los usa para el panel de
 * marca; si alguno es falso conviene sacarlo antes que inventarlo.
 */
export const marca = {
  /** PLACEHOLDER: razon social real antes de publicar. */
  legalName: 'OpenSys SpA',
  logo: '/favicon.svg',
  /** Pais de operacion. El ERP cobra en CLP y emite ante el SII. */
  country: 'CL',
  currency: 'CLP',
  /**
   * Perfiles oficiales. Son la senal de que la marca es la misma en todos
   * lados. VACIO A PROPOSITO: una URL que no existe es peor que ninguna.
   */
  sameAs: [] as string[],
} as const;

export type Site = typeof site;

/** Navegacion del header. */
export const nav = {
  /** Item con submenu desplegable. */
  dropdown: {
    label: 'Producto',
    items: [
      { label: 'Como funciona', href: '/#como-funciona', desc: 'El recorrido completo, de punta a punta.' },
      { label: 'Automatizaciones', href: '/#automatizaciones', desc: 'Reglas que trabajan solas.' },
      { label: 'Reportes', href: '/#reportes', desc: 'Numeros claros, sin planillas.' },
      { label: 'Documentación', href: site.docsUrl, desc: 'Guias y referencia tecnica.' },
    ],
  },
  links: [
    { label: 'Integraciones', href: '/#integraciones' },
    { label: 'Precios', href: '/precios' },
  ],
  signIn: { label: 'Iniciar sesión', href: '/ingresar' },
  cta: { label: 'Probar OpenSale gratis', href: '/#empezar' },
} as const;
