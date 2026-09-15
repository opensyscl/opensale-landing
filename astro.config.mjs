// @ts-check
import { defineConfig } from 'astro/config';

import react from '@astrojs/react';
import sitemap from '@astrojs/sitemap';
import tailwindcss from '@tailwindcss/vite';

/**
 * Las pantallas de cuenta y de paso van con noindex en el <head>. Si ademas
 * aparecieran en el sitemap el sitio se estaria contradiciendo: le pide a
 * Google que las rastree y en la misma visita le dice que no las indexe.
 */
const SIN_INDEXAR = ['/ingresar', '/registro', '/recuperar', '/revisa-tu-correo'];

// https://astro.build/config
export default defineConfig({
  // Tiene que coincidir con site.siteUrl de src/config/site.ts.
  site: 'https://opensale.example',
  integrations: [
    react(),
    sitemap({
      filter: (page) => !SIN_INDEXAR.some((ruta) => new URL(page).pathname.replace(/\/$/, '') === ruta),
      changefreq: 'weekly',
      lastmod: new Date(),
      serialize(item) {
        // La home primero; precios es la que convierte y va detras.
        if (item.url.replace(/\/$/, '').endsWith('opensale.example')) return { ...item, priority: 1.0 };
        if (item.url.includes('/precios')) return { ...item, priority: 0.9 };
        if (item.url.includes('/demo')) return { ...item, priority: 0.8 };
        if (item.url.includes('/terminos')) return { ...item, priority: 0.3, changefreq: 'yearly' };
        return item;
      },
    }),
  ],
  vite: {
    plugins: [tailwindcss()],
  },
});
