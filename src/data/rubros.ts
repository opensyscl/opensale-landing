/**
 * Paginas por rubro.
 *
 * POR QUE SON SIETE Y NO LOS DIECISEIS DEL ONBOARDING: una pagina por rubro
 * solo sirve si dice algo que las otras no dicen. Dieciseis variantes del mismo
 * texto con el nombre cambiado son doorway pages, y Google las penaliza
 * explicitamente. Estos siete estan porque el ERP tiene un modulo que resuelve
 * un dolor propio del rubro —vencimientos en farmacia, agenda en manicure,
 * rutas en distribucion— y eso da contenido distinto de verdad.
 *
 * Para agregar uno nuevo hace falta poder contestar: que hace este negocio que
 * los otros no, y que pantalla del ERP lo resuelve. Si no hay respuesta, el
 * rubro no lleva pagina.
 */
export type Rubro = {
  slug: string;
  /** Como se llama el rubro. Va en el titulo y en las migas. */
  nombre: string;
  /** Titular de la pagina. */
  titular: string;
  /** Meta description. Entre 120 y 160 caracteres. */
  descripcion: string;
  /** El dolor concreto, en las palabras del rubro. */
  dolores: string[];
  /** Que lo resuelve. `pantalla` apunta a una captura real cuando existe. */
  soluciones: { titulo: string; cuerpo: string; pantalla?: string }[];
  /** Plan del seeder que le calza. Tiene que existir en planes.ts. */
  plan: string;
};

export const rubros: Rubro[] = [
  {
    slug: 'ferreteria',
    nombre: 'Ferretería',
    titular: 'El sistema para tu ferretería.',
    descripcion:
      'Software de punto de venta e inventario para ferreterías: miles de códigos, venta por unidad o por caja, fiado a maestros y stock que cuadra. Plan gratis.',
    dolores: [
      'Miles de códigos y ninguno se acuerda del precio de memoria.',
      'Lo mismo se vende por unidad, por caja y por metro.',
      'Los maestros llevan fiado y la libreta la entiende una sola persona.',
      'El conteo físico se hace una vez al año y nunca cuadra.',
    ],
    soluciones: [
      {
        titulo: 'Buscás por código o por nombre',
        cuerpo:
          'Escaneás el código de barras o escribís las primeras letras. El precio y el stock salen en pantalla, no de la memoria del vendedor.',
        pantalla: '/images/features/venta.webp',
      },
      {
        titulo: 'Una caja, seis unidades, el mismo producto',
        cuerpo:
          'Packs y desconstrucción: vendés la caja o la unidad suelta y el stock se descuenta del mismo lugar, sin llevar dos inventarios paralelos.',
      },
      {
        titulo: 'El fiado deja de ser una libreta',
        cuerpo:
          'Venta fiada y cuentas por cobrar: quién debe, cuánto y desde cuándo. Cualquiera en el mostrador lo ve, no solo el dueño.',
      },
      {
        titulo: 'Conteo físico cuando quieras',
        cuerpo:
          'Contás por pasillo o por categoría y el sistema te muestra la diferencia contra lo que debería haber, sin cerrar el local un domingo.',
        pantalla: '/images/features/inventario.webp',
      },
    ],
    plan: 'Business',
  },
  {
    slug: 'botilleria',
    nombre: 'Botillería',
    titular: 'El sistema para tu botillería.',
    descripcion:
      'Punto de venta e inventario para botillerías: packs y promociones, rotación por margen, cierre de caja por turno y stock al día. Empezá con el plan gratis.',
    dolores: [
      'Las promos de 6 y de 12 se arman a mano y el stock queda mal.',
      'Lo que más sale no siempre es lo que más deja.',
      'Cambia el turno y nadie sabe con cuánto arrancó la caja.',
      'Los fines de semana la cola no espera a que busques el precio.',
    ],
    soluciones: [
      {
        titulo: 'El pack descuenta las unidades',
        cuerpo:
          'Armás el six-pack una vez y al venderlo bajan las seis unidades del inventario. No hay que acordarse de ajustar nada después.',
      },
      {
        titulo: 'Ranking por margen, no por cantidad',
        cuerpo:
          'El ranking ordena por lo que te deja, no por lo que más sale. Ahí aparece lo que conviene tener en la góndola de adelante.',
        pantalla: '/images/producto/reportes.webp',
      },
      {
        titulo: 'Cada turno abre y cierra su caja',
        cuerpo:
          'Apertura y cierre por turno: el sistema compara lo declarado contra lo registrado y muestra la diferencia al peso.',
      },
    ],
    plan: 'Business',
  },
  {
    slug: 'minimarket',
    nombre: 'Minimarket',
    titular: 'El sistema para tu minimarket.',
    descripcion:
      'Software de caja e inventario para minimarkets: cobro rápido con lector, etiquetas con código de barras, cierre de caja diario y varias sucursales.',
    dolores: [
      'La cola se hace larga si cobrar toma más de unos segundos.',
      'Hay productos sin código de barras que no se pueden escanear.',
      'Al cierre del día la caja nunca da exacto y no se sabe dónde se fue.',
      'Con dos locales, el stock de cada uno es una adivinanza.',
    ],
    soluciones: [
      {
        titulo: 'Escanear y cobrar',
        cuerpo:
          'Lector de código de barras, cobro en efectivo, débito, crédito o transferencia, y el ticket sale al toque.',
        pantalla: '/images/features/venta.webp',
      },
      {
        titulo: 'Imprimís tus propias etiquetas',
        cuerpo:
          'Lo que viene sin código lleva el tuyo: generás la etiqueta desde el sistema y pasa a escanearse como cualquier otro.',
      },
      {
        titulo: 'El cierre muestra la diferencia',
        cuerpo:
          'Cerrás y ves lo declarado contra lo registrado, separado por medio de pago. La diferencia aparece al peso y con nombre.',
      },
      {
        titulo: 'Un stock por local',
        cuerpo:
          'Cada sucursal tiene el suyo, con transferencias entre locales y un dashboard por sucursal.',
      },
    ],
    plan: 'Business',
  },
  {
    slug: 'farmacia',
    nombre: 'Farmacia',
    titular: 'El sistema para tu farmacia.',
    descripcion:
      'Inventario y punto de venta para farmacias: control de vencimientos, mermas registradas, boleta electrónica al SII y trazabilidad de cada producto.',
    dolores: [
      'Los vencimientos se descubren cuando ya es tarde.',
      'Lo vencido se tira y nunca queda anotado en ninguna parte.',
      'Hay que emitir boleta por cada venta, sin excepción.',
      'Los proveedores son muchos y cada uno con su lista de precios.',
    ],
    soluciones: [
      {
        titulo: 'Reporte de vencimientos',
        cuerpo:
          'El sistema te avisa qué está por vencer y con cuánto tiempo, para moverlo antes de perderlo.',
        pantalla: '/images/producto/reportes.webp',
      },
      {
        titulo: 'La merma queda registrada',
        cuerpo:
          'Lo que se descarta se anota con motivo y sale del stock. A fin de mes sabés cuánto se perdió y por qué, en plata.',
      },
      {
        titulo: 'Boleta electrónica en cada venta',
        cuerpo:
          'El documento se emite junto con la venta. El envío al SII y la consulta de estado se hacen desde el sistema, hoy a mano.',
      },
      {
        titulo: 'Compras y costos al día',
        cuerpo:
          'Cargás la factura del proveedor y el costo se actualiza solo. El margen que ves es el de hoy, no el del mes pasado.',
        pantalla: '/images/producto/compras.webp',
      },
    ],
    plan: 'Growth',
  },
  {
    slug: 'panaderia',
    nombre: 'Panadería',
    titular: 'El sistema para tu panadería.',
    descripcion:
      'Software para panaderías: producción diaria, control de mermas, consumo interno de insumos y caja que cuadra. Empezá gratis, sin tarjeta.',
    dolores: [
      'Lo que se produce y lo que se vende nunca es el mismo número.',
      'El pan que sobra se regala o se tira y no queda registro.',
      'La harina y los insumos se van sin que nadie los descuente.',
      'Se vende por peso y por unidad en el mismo mostrador.',
    ],
    soluciones: [
      {
        titulo: 'La producción del día',
        cuerpo:
          'Registrás lo que se hizo y entra al inventario. Al cierre comparás producido contra vendido y ahí aparece la diferencia real.',
      },
      {
        titulo: 'Merma con motivo',
        cuerpo:
          'Lo que no se vendió se registra como merma. Deja de ser una sensación y pasa a ser un número que se puede bajar.',
      },
      {
        titulo: 'Consumo interno descontado',
        cuerpo:
          'Los insumos que usa la producción salen del stock cuando se usan, no cuando alguien se acuerda.',
        pantalla: '/images/producto/inventario.webp',
      },
    ],
    plan: 'Business',
  },
  {
    slug: 'manicure',
    nombre: 'Manicure y peluquería',
    titular: 'El sistema para tu salón.',
    descripcion:
      'Agenda y caja para manicure y peluquería: citas del día, comisiones por profesional, asistencia del equipo y cobro en el mismo lugar.',
    dolores: [
      'La agenda está en un cuaderno o en un chat de WhatsApp.',
      'Calcular la comisión de cada profesional es un rato de planilla.',
      'No queda claro quién trabajó qué días ni cuántas horas.',
      'Lo que se agenda y lo que entra a la caja son dos mundos separados.',
    ],
    soluciones: [
      {
        titulo: 'La agenda y la caja, lo mismo',
        cuerpo:
          'Las citas del local con lo que facturan: agendás, atendés y cobrás sin salir del sistema ni volver a escribir nada.',
        pantalla: '/images/apps/agenda.webp',
      },
      {
        titulo: 'Comisiones por profesional',
        cuerpo:
          'Cada servicio queda asociado a quien lo hizo. La comisión sale del sistema y no de una planilla armada a fin de mes.',
      },
      {
        titulo: 'Turnos y asistencia',
        cuerpo:
          'Quién entró, a qué hora y qué días trabajó. Sirve para pagar bien y para saber con qué equipo contás cada día.',
      },
    ],
    plan: 'Growth',
  },
  {
    slug: 'distribuidora',
    nombre: 'Distribuidora y reparto',
    titular: 'El sistema para tu distribuidora.',
    descripcion:
      'Software de reparto y distribución: rutas del día, cargas por camión, pedidos por cliente, guías de despacho y app Android para el repartidor.',
    dolores: [
      'La ruta del día se arma a mano cada mañana.',
      'Nadie sabe qué se cargó en cada camión hasta que vuelve.',
      'El repartidor avisa por WhatsApp y eso hay que pasarlo al sistema.',
      'Facturar el reparto es un trabajo aparte, después de todo el resto.',
    ],
    soluciones: [
      {
        titulo: 'La ruta y la carga del día',
        cuerpo:
          'Armás la ruta, asignás los pedidos y el sistema arma la carga del camión. Queda claro qué sale y para quién.',
        pantalla: '/images/apps/reparto.webp',
      },
      {
        titulo: 'El repartidor lleva su recorrido',
        cuerpo:
          'La app Android muestra el recorrido del día y avisa por push cada pedido. Lo que marca allá llega acá sin que nadie lo copie.',
      },
      {
        titulo: 'Guías de despacho y facturación',
        cuerpo:
          'La guía sale con la carga y la facturación del reparto se hace desde el mismo lugar, no en una planilla aparte.',
      },
    ],
    plan: 'Routes',
  },
];

export const porSlug = (slug: string) => rubros.find((r) => r.slug === slug);
