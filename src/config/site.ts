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
} as const;

export type Site = typeof site;

/** Navegacion del header. */
export const nav = {
  /** Item con submenu desplegable. */
  dropdown: {
    label: 'Producto',
    items: [
      { label: 'Como funciona', href: '#como-funciona', desc: 'El recorrido completo, de punta a punta.' },
      { label: 'Automatizaciones', href: '#automatizaciones', desc: 'Reglas que trabajan solas.' },
      { label: 'Reportes', href: '#reportes', desc: 'Numeros claros, sin planillas.' },
    ],
  },
  links: [
    { label: 'Integraciones', href: '#integraciones' },
    { label: 'Clientes', href: '#clientes' },
    { label: 'Precios', href: '#precios' },
  ],
  signIn: { label: 'Iniciar sesion', href: '#login' },
  cta: { label: 'Probar OpenSale gratis', href: '#empezar' },
} as const;
