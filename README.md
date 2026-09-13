# opensale-landing

Landing de OpenSale. Astro + React + Tailwind.

## Desarrollo

```sh
pnpm install
pnpm dev        # http://localhost:4321
pnpm build      # salida estatica en dist/
pnpm preview
```

Requiere Node >= 22.12.

## Estructura

```
src/
├── components/react/Header.tsx   header: nav, desplegable, CTA, menu movil
├── config/site.ts                marca, SEO y los items del nav
├── layouts/Base.astro            <head>, meta, preload de fuentes
├── pages/index.astro             la pagina
└── styles/global.css             tokens de diseno (@theme) y la fuente Onest
public/fonts/                     Onest 400/500/700, self-hosted
```

## Donde tocar

- **Textos del nav, marca, enlaces** → `src/config/site.ts`, no los componentes.
- **Colores, tipografia, radios** → el bloque `@theme` de `src/styles/global.css`.
  Tailwind genera las utilidades (`bg-canvas`, `text-muted`, `border-border`) desde ahi.
- **Dominio y datos de SEO** → `src/config/site.ts` y `site:` en `astro.config.mjs`.

## Estado

El header esta terminado. El resto de las secciones todavia no.
El logo es un placeholder: la marca no esta decidida.
