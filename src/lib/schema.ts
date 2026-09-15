/**
 * Constructores de JSON-LD.
 *
 * Regla que se sigue en todo el archivo: no se declara nada que no este
 * visible en la pagina. Google trata el structured data que no corresponde al
 * contenido como spam y puede sacar los resultados enriquecidos del sitio
 * entero, no solo de la pagina que miente.
 *
 * Por eso no hay FAQPage: no hay seccion de preguntas en el sitio. Y no hay
 * AggregateRating ni Review: no hay testimonios reales todavia.
 */
import { site, marca } from '../config/site';
import { planes } from '../data/planes';

/** Absolutiza una ruta contra el dominio configurado. */
export const abs = (path: string): string => new URL(path, site.siteUrl).toString();

/**
 * La organizacion. Va una sola vez, en la home, con @id estable para que el
 * resto de los nodos la referencien en vez de repetirla.
 */
export function organizacion() {
  return {
    '@type': 'Organization',
    '@id': `${site.siteUrl}/#organizacion`,
    name: site.siteName,
    legalName: marca.legalName,
    url: site.siteUrl,
    logo: { '@type': 'ImageObject', url: abs(marca.logo) },
    ...(marca.sameAs.length > 0 && { sameAs: marca.sameAs }),
    contactPoint: {
      '@type': 'ContactPoint',
      contactType: 'sales',
      email: site.email,
      areaServed: marca.country,
      availableLanguage: ['es'],
    },
  };
}

/** El sitio como entidad, para que Google entienda el nombre de la marca. */
export function sitioWeb() {
  return {
    '@type': 'WebSite',
    '@id': `${site.siteUrl}/#sitio`,
    name: site.siteName,
    url: site.siteUrl,
    inLanguage: site.lang,
    publisher: { '@id': `${site.siteUrl}/#organizacion` },
  };
}

/**
 * El producto. Los precios salen de planes.ts, que a su vez sale del seeder
 * del ERP: si cambia un plan alla, este bloque cambia solo.
 *
 * Es SoftwareApplication y no Product porque el ERP es software de negocio;
 * applicationCategory BusinessApplication es lo que Google espera para SaaS.
 */
export function aplicacion() {
  const precios = planes.map((p) => p.precio);

  return {
    '@type': 'SoftwareApplication',
    '@id': `${site.siteUrl}/#producto`,
    name: site.siteName,
    description: site.description,
    url: site.siteUrl,
    applicationCategory: 'BusinessApplication',
    applicationSubCategory: 'ERP',
    operatingSystem: 'Web, Android',
    inLanguage: site.lang,
    publisher: { '@id': `${site.siteUrl}/#organizacion` },
    offers: {
      '@type': 'AggregateOffer',
      priceCurrency: marca.currency,
      lowPrice: Math.min(...precios),
      highPrice: Math.max(...precios),
      offerCount: planes.length,
      offers: planes.map((p) => ({
        '@type': 'Offer',
        name: p.nombre,
        description: p.bajada,
        price: p.precio,
        priceCurrency: marca.currency,
        url: `${site.siteUrl}/precios`,
        availability: 'https://schema.org/InStock',
        /**
         * El seeder cobra mensual. Sin esto un plan de $9.990 al mes se lee
         * como un pago unico de $9.990, que es una promesa que no se cumple.
         */
        priceSpecification: {
          '@type': 'UnitPriceSpecification',
          price: p.precio,
          priceCurrency: marca.currency,
          billingDuration: 1,
          billingIncrement: 1,
          unitCode: 'MON',
        },
      })),
    },
  };
}

export type Miga = { nombre: string; href: string };

/** Migas de pan. Google las muestra en lugar de la URL cruda del resultado. */
export function migas(items: Miga[]) {
  return {
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: item.nombre,
      item: abs(item.href),
    })),
  };
}

/** La pagina en si, enlazada al sitio y a la organizacion. */
export function pagina(opts: { url: string; title: string; description: string }) {
  return {
    '@type': 'WebPage',
    '@id': `${opts.url}#pagina`,
    url: opts.url,
    name: opts.title,
    description: opts.description,
    inLanguage: site.lang,
    isPartOf: { '@id': `${site.siteUrl}/#sitio` },
    about: { '@id': `${site.siteUrl}/#producto` },
  };
}

/**
 * Empaqueta los nodos en un solo @graph.
 *
 * Un unico bloque con @graph, en vez de cinco <script> sueltos, deja que los
 * nodos se referencien por @id sin duplicar datos y es como Google prefiere
 * leerlo.
 */
export function grafo(nodos: object[]) {
  return { '@context': 'https://schema.org', '@graph': nodos };
}
