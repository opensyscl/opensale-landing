/**
 * Preguntas de la home.
 *
 * Son objeciones de compra reales de un ERP, no relleno. Cada respuesta sale
 * del codigo del ERP o de los terminos, y donde algo no funciona automatico se
 * dice. Prometer de mas en la landing lo paga soporte despues.
 *
 * Fuentes:
 *   Subscription::GRACE_PERIOD_DAYS   -> 7 dias de gracia
 *   CheckSubscriptionStatus           -> que pasa al vencer
 *   PlanSeeder                        -> Starter gratis, limites por plan
 *   config/services.php               -> integraciones configuradas
 *
 * Esta lista alimenta la seccion visible Y el JSON-LD de FAQPage. Google exige
 * que coincidan: si se agrega una pregunta al schema que no esta en pantalla,
 * el sitio entero puede perder los resultados enriquecidos.
 */
export type Pregunta = { p: string; r: string };

export const faq: Pregunta[] = [
  {
    p: '¿Puedo probarlo sin poner una tarjeta?',
    r: 'Sí. El plan Starter es gratis y no pide tarjeta: creás la cuenta y cargás tu primera venta el mismo día. Incluye punto de venta, inventario y cierre de caja para un usuario y 50 productos.',
  },
  {
    p: '¿Emite boleta y factura electrónica ante el SII?',
    r: 'Sí, OpenSale emite documentos tributarios electrónicos. El envío al SII y la consulta de estado son pasos que hoy se hacen a mano desde el sistema, no automáticos: preferimos decirlo antes y no que te enteres después.',
  },
  {
    p: '¿Qué pasa con mis datos si dejo de pagar?',
    r: 'Tenés 7 días de gracia después del vencimiento, con el sistema funcionando igual. Pasados esos días la cuenta queda restringida, pero los datos no se borran: al regularizar el pago volvés a entrar y está todo como lo dejaste.',
  },
  {
    p: '¿Puedo cambiar de plan más adelante?',
    r: 'Sí, en cualquier momento y desde el mismo sistema. El cobro es mensual, así que el cambio corre desde el ciclo siguiente. Si bajás de plan, revisá antes los límites de usuarios, productos y sucursales del plan al que vas.',
  },
  {
    p: '¿Sirve si tengo más de un local?',
    r: 'Sí. Desde el plan Business el inventario es por sucursal, con transferencias entre ellas y un dashboard por local. El stock se descuenta donde se hizo la venta, no en un total que después nadie sabe de dónde salió.',
  },
  {
    p: '¿Con qué medios de pago cobra?',
    r: 'Transbank Webpay para tarjeta en el mostrador y en línea, y Mercado Pago para link de pago con confirmación automática. La tarjeta del cliente nunca pasa por nuestros servidores.',
  },
  {
    p: '¿Tengo que instalar algo?',
    r: 'El ERP, el punto de venta, la agenda y el reparto corren en el navegador, sin instalar nada. Además hay app Android del punto de venta y del repartidor, para vender y repartir fuera del escritorio.',
  },
  {
    p: '¿Puedo migrar los productos que ya tengo?',
    r: 'Sí. Hay carga masiva de catálogo desde planilla, así que no tenés que cargar producto por producto para empezar.',
  },
];
