import { useEffect, useRef, useState } from 'react';
import { nav, site } from '../../config/site';

/** Marca de OpenSale: tres barras ascendentes dentro del cuadrado oscuro. */
function LogoMark() {
  return (
    <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-[3px] bg-ink">
      <svg viewBox="0 0 16 14" className="h-3.5 w-4" fill="currentColor" aria-hidden="true">
        <g className="text-canvas">
          <rect x="0" y="8" width="4" height="6" rx="1.2" fill="#fbfaf6" />
          <rect x="6" y="4" width="4" height="10" rx="1.2" fill="#fbfaf6" />
          <rect x="12" y="0" width="4" height="14" rx="1.2" fill="#fbfaf6" />
        </g>
      </svg>
    </span>
  );
}

function Chevron({ open }: { open: boolean }) {
  return (
    <svg
      viewBox="0 0 24 24"
      className={`h-2 w-2 shrink-0 transition-transform duration-200 ${open ? 'rotate-180' : ''}`}
      aria-hidden="true"
    >
      <path
        d="M 16 0 L 8 8 L 0 0"
        transform="translate(4 8)"
        fill="transparent"
        stroke="currentColor"
        strokeWidth="3.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

const linkClass =
  'flex h-11 items-center gap-1.5 rounded-lg px-4 text-[15px] leading-[1.3] font-normal text-muted transition-colors duration-200 hover:bg-ink/[0.04] hover:text-ink';

/** Boton primario con el texto que rueda hacia arriba al pasar el mouse. */
function RollingCta({ href, label }: { href: string; label: string }) {
  return (
    <a
      href={href}
      className="group flex h-11 items-center justify-center rounded-[10px] bg-ink px-4 pt-px transition-colors duration-200 hover:bg-ink/90"
    >
      <span className="pointer-events-none flex h-[21px] select-none flex-col items-center overflow-hidden">
        {[0, 1].map((i) => (
          <span
            key={i}
            className="block h-[21px] text-[14px] leading-[1.5] font-medium whitespace-pre text-canvas transition-transform duration-300 ease-out group-hover:-translate-y-[21px]"
          >
            {label}
          </span>
        ))}
      </span>
    </a>
  );
}

export default function Header() {
  const [openDropdown, setOpenDropdown] = useState(false);
  const [openMobile, setOpenMobile] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function onPointerDown(e: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setOpenDropdown(false);
      }
    }
    function onKeyDown(e: KeyboardEvent) {
      if (e.key === 'Escape') {
        setOpenDropdown(false);
        setOpenMobile(false);
      }
    }
    document.addEventListener('mousedown', onPointerDown);
    document.addEventListener('keydown', onKeyDown);
    return () => {
      document.removeEventListener('mousedown', onPointerDown);
      document.removeEventListener('keydown', onKeyDown);
    };
  }, []);

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border bg-canvas">
      <div className="mx-auto flex w-full max-w-[1200px] items-center justify-between gap-5 px-5 py-4 md:px-10">
        {/* Izquierda: marca */}
        <div className="flex min-w-0 shrink-0 items-center gap-2.5 md:min-w-[150px]">
          <a href="#inicio" className="flex items-center gap-1.5 overflow-hidden">
            <LogoMark />
            <span className="text-[20px] leading-[1.3] font-medium tracking-[-0.02em] whitespace-pre text-ink">
              {site.siteName}
            </span>
          </a>
        </div>

        {/* Centro: navegacion */}
        <nav className="hidden flex-1 items-center justify-center gap-8 lg:flex" aria-label="Principal">
          <div className="flex flex-1 items-center justify-center gap-1">
            <div className="relative" ref={dropdownRef}>
              <button
                type="button"
                aria-expanded={openDropdown}
                aria-haspopup="true"
                onClick={() => setOpenDropdown((v) => !v)}
                className={`${linkClass} cursor-pointer`}
              >
                {nav.dropdown.label}
                <Chevron open={openDropdown} />
              </button>

              {openDropdown && (
                <div className="absolute top-[calc(100%+8px)] left-1/2 w-72 -translate-x-1/2 rounded-xl border border-border bg-surface p-2 shadow-[0_12px_40px_-12px_rgba(28,26,21,0.18)]">
                  {nav.dropdown.items.map((item) => (
                    <a
                      key={item.href}
                      href={item.href}
                      onClick={() => setOpenDropdown(false)}
                      className="block rounded-lg px-3 py-2.5 transition-colors duration-150 hover:bg-canvas"
                    >
                      <span className="block text-[14px] leading-[1.4] font-medium text-ink">{item.label}</span>
                      <span className="mt-0.5 block text-[13px] leading-[1.4] text-muted">{item.desc}</span>
                    </a>
                  ))}
                </div>
              )}
            </div>

            {nav.links.map((link) => (
              <a key={link.href} href={link.href} className={linkClass}>
                {link.label}
              </a>
            ))}
          </div>
        </nav>

        {/* Derecha: sesion + CTA */}
        <div className="flex shrink-0 items-center justify-end gap-1 lg:min-w-[150px]">
          <a href={nav.signIn.href} className={`${linkClass} hidden sm:flex`}>
            {nav.signIn.label}
          </a>
          <div className="hidden sm:block">
            <RollingCta href={nav.cta.href} label={nav.cta.label} />
          </div>

          <button
            type="button"
            aria-label="Abrir menu"
            aria-expanded={openMobile}
            onClick={() => setOpenMobile((v) => !v)}
            className="flex h-11 w-11 cursor-pointer items-center justify-center rounded-lg text-ink transition-colors duration-200 hover:bg-ink/[0.04] lg:hidden"
          >
            <span className="relative flex h-4 w-5 flex-col justify-between">
              <span
                className={`block h-0.5 w-full rounded-full bg-current transition-transform duration-200 ${openMobile ? 'translate-y-[7px] rotate-45' : ''}`}
              />
              <span className={`block h-0.5 w-full rounded-full bg-current transition-opacity duration-200 ${openMobile ? 'opacity-0' : ''}`} />
              <span
                className={`block h-0.5 w-full rounded-full bg-current transition-transform duration-200 ${openMobile ? '-translate-y-[7px] -rotate-45' : ''}`}
              />
            </span>
          </button>
        </div>
      </div>

      {/* Menu movil */}
      {openMobile && (
        <div className="border-t border-border bg-canvas px-5 py-4 lg:hidden">
          <div className="mx-auto flex w-full max-w-[1200px] flex-col gap-1">
            {nav.dropdown.items.map((item) => (
              <a key={item.href} href={item.href} onClick={() => setOpenMobile(false)} className={linkClass}>
                {item.label}
              </a>
            ))}
            {nav.links.map((link) => (
              <a key={link.href} href={link.href} onClick={() => setOpenMobile(false)} className={linkClass}>
                {link.label}
              </a>
            ))}
            <div className="mt-3 flex flex-col gap-2 sm:hidden">
              <a href={nav.signIn.href} className={linkClass}>
                {nav.signIn.label}
              </a>
              <RollingCta href={nav.cta.href} label={nav.cta.label} />
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
