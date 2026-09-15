/**
 * Configuracion centralizada del sitio.
 * UNICO lugar a editar para dominio, marca y datos para JSON-LD.
 */
export const site = {
  siteUrl: 'https://opensale.example',
  siteName: 'OpenSale',
  defaultTitle: 'OpenSale',
  titleTemplate: '%s — OpenSale',
  description: 'OpenSale.',
  locale: 'es_ES',
  lang: 'es',
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
