/**
 * Halftone animado: una grilla de puntos cuyo tamano y opacidad los decide un
 * campo de ondas que se mueve. No hay WebGL ni shaders: canvas 2D y senos.
 *
 * Devuelve un stop() para cortar el rAF.
 */

export type HalftoneOpts = {
  /** px CSS entre centros de punto */
  spacing?: number;
  /** radio maximo del punto, px CSS */
  dot?: number;
  /** cualquier color CSS valido; se usa tal cual en fillStyle */
  color?: string;
  speed?: number;
  /** <1 = franjas mas anchas */
  scale?: number;
  /** donde el punto empieza a aparecer */
  umbralBajo?: number;
  /** donde llega a su tamano maximo */
  umbralAlto?: number;
};

export function halftone(canvas: HTMLCanvasElement, opts: HalftoneOpts = {}) {
  const {
    spacing = 20,
    dot = 4.6,
    color = '#1c1a15',
    speed = 1,
    scale = 1,
    umbralBajo = 0.15,
    umbralAlto = 0.62,
  } = opts;

  const ctx = canvas.getContext('2d');
  if (!ctx) return () => {};

  let w = 0;
  let h = 0;
  let raf = 0;

  const medir = () => {
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const caja = canvas.getBoundingClientRect();
    w = Math.max(1, Math.round(caja.width));
    h = Math.max(1, Math.round(caja.height));
    canvas.width = Math.round(w * dpr);
    canvas.height = Math.round(h * dpr);
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  };

  // Campo: UNA onda diagonal (de arriba-derecha a abajo-izquierda) que da
  // franjas largas y continuas. Las otras dos ondas no se suman: le corren la
  // FASE. Sumarlas partia la franja en islas sueltas; corriendole la fase la
  // franja se dobla pero sigue entera, que es lo que da la cinta diagonal.
  const campo = (x: number, y: number, t: number) => {
    const k = 0.0042 * scale;
    const dobla =
      2.1 * Math.sin((x * 0.55 - y * 0.85) * k * 0.42 + t * 0.13) +
      0.9 * Math.sin((x * 0.2 + y * 1.1) * k * 0.77 - t * 0.09);
    return Math.sin((x * 0.72 + y * 1.0) * k + dobla + t * 0.25);
  };

  const suave = (a: number, z: number, x: number) => {
    const u = Math.min(1, Math.max(0, (x - a) / (z - a)));
    return u * u * (3 - 2 * u);
  };

  const dibujar = (t: number) => {
    ctx.clearRect(0, 0, w, h);
    ctx.fillStyle = color;

    // Media grilla de margen para que los puntos no queden pegados al borde.
    for (let y = spacing / 2; y < h + spacing; y += spacing) {
      for (let x = spacing / 2; x < w + spacing; x += spacing) {
        const v = suave(umbralBajo, umbralAlto, campo(x, y, t));
        if (v <= 0.01) continue;
        ctx.globalAlpha = v;
        ctx.beginPath();
        ctx.arc(x, y, dot * v, 0, Math.PI * 2);
        ctx.fill();
      }
    }
    ctx.globalAlpha = 1;
  };

  const pintar = (ms: number) => {
    dibujar((ms / 1000) * speed);
    raf = requestAnimationFrame(pintar);
  };

  const onResize = () => {
    medir();
    if (quieto.matches) dibujar(0);
  };

  // Con reduced-motion pintamos un solo cuadro y no arrancamos el rAF: la
  // textura queda, el movimiento no.
  const quieto = window.matchMedia('(prefers-reduced-motion: reduce)');

  medir();
  if (quieto.matches) dibujar(0);
  else raf = requestAnimationFrame(pintar);

  window.addEventListener('resize', onResize);

  return () => {
    cancelAnimationFrame(raf);
    window.removeEventListener('resize', onResize);
  };
}
