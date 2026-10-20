import { HubProduct } from './automovilData';

export const CICLISMO_CATEGORIES = [
  { id: 'all', label: 'Todo para Ciclismo & MTB', icon: '🚴' },
  { id: 'gps', label: 'Ciclocomputadores & GPS', icon: '🧭' },
  { id: 'luces', label: 'Luces & Radares de Seguridad', icon: '💡' },
  { id: 'cascos', label: 'Cascos MIPS & Gafas', icon: '⛑️' },
  { id: 'herramientas', label: 'Herramientas & Bombas CO2', icon: '🔧' },
  { id: 'bolsas', label: 'Bolsas Cuadro & Hidratación', icon: '🎒' },
  { id: 'mantenimiento', label: 'Cera de Cadena & Limpieza', icon: '🧴' },
];

export const CICLISMO_BRANDS = [
  'Todas las marcas',
  'Garmin',
  'Rockbros',
  'Topeak',
  'Shimano',
  'Giro',
  'Squirt',
];

export const CICLISMO_PRICE_RANGES = [
  { id: 'all', label: 'Cualquier presupuesto' },
  { id: '<30', label: 'Detalles ciclistas (<30 €)' },
  { id: '30-80', label: 'De 30 € a 80 €' },
  { id: '80-180', label: 'De 80 € a 180 €' },
  { id: '>180', label: 'Gama Alta (+180 €)' },
];

export const CICLISMO_PRODUCTS: HubProduct[] = [
  {
    id: 'bici-radar-garmin-varia',
    asin: 'B08GCNH9JC',
    title: 'Garmin Varia RTL515 Radar Trasero de Bicicleta con Luz Trasera Inteligente',
    category: 'luces',
    categoryLabel: 'Luces & Radares de Seguridad',
    brand: 'Garmin',
    priceText: '169,99 €',
    priceNumeric: 169.99,
    rating: 4.8,
    reviewsCount: 12400,
    imageUrl: 'https://m.media-amazon.com/images/I/512uH7+gi+L._AC_UL320_.jpg',
    badge: 'Salva Vidas en Carretera',
    description: 'Detecta vehículos que se aproximan por detrás a una distancia de hasta 140 metros y avisa con alertas visuales y sonoras en el manillar o móvil.',
    pros: [
      'Radar de aproximación de alta precisión hasta 140 metros',
      'Luz diurna visible hasta a 1,6 km de distancia',
      'Modo pelotón con destello suave para no deslumbrar a otros ciclistas'
    ],
    idealFor: 'El mejor regalo de seguridad posible para ciclistas de carretera y gravel.',
    searchQuery: 'garmin varia rtl515 radar luz trasera bicicleta'
  },
  {
    id: 'bici-gps-garmin-edge-530',
    asin: 'B0C2KMXRFV',
    title: 'Garmin Edge 530 Ciclocomputador GPS con Mapa de Rutas Garmin Cycle Map',
    category: 'gps',
    categoryLabel: 'Ciclocomputadores & GPS',
    brand: 'Garmin',
    priceText: '199,00 €',
    priceNumeric: 199.0,
    rating: 4.7,
    reviewsCount: 11200,
    imageUrl: 'https://m.media-amazon.com/images/I/61-4nSEkgrL._AC_UL320_.jpg',
    badge: 'Referente Mundial en Navegación',
    description: 'Control de rendimiento dinámico con información sobre VO2 máximo, recuperación, aclimatación al calor y altitud y función ClimbPro.',
    pros: [
      'Función ClimbPro para ver pendientes y desnivel restante en subidas',
      'Autonomía de hasta 20 horas con GPS de alta precisión',
      'Alertas de nutrición e hidratación personalizadas en ruta'
    ],
    idealFor: 'Ciclistas de carretera y montaña que quieren seguir rutas y medir su progreso.',
    searchQuery: 'garmin edge 530 ciclocomputador gps bicicleta'
  },
  {
    id: 'bici-multiherramienta-topeak',
    asin: 'B078NZMTMR',
    title: 'Topeak Hexus X Multiherramienta de Ciclismo 21 Funciones con Tronchacadenas',
    category: 'herramientas',
    categoryLabel: 'Herramientas & Bombas CO2',
    brand: 'Topeak',
    priceText: '27,99 €',
    priceNumeric: 27.99,
    rating: 4.8,
    reviewsCount: 8900,
    imageUrl: 'https://m.media-amazon.com/images/I/71SF4jQMskL._AC_UL320_.jpg',
    badge: 'La Multiherramienta Definitiva',
    description: 'Cuerpo compacto de acero al cromo vanadio con llaves Allen, Torx T15/T25/T30, tronchacadenas profesional y desmontables de cubiertas integrados.',
    pros: [
      '21 herramientas indispensables en solo 167 gramos de peso',
      'Desmontables de cubiertas de ingeniería que encajan en los laterales',
      'Tronchacadenas compatible con transmisiones de hasta 12 velocidades'
    ],
    idealFor: 'Reparar cualquier avería en mitad de una ruta y no quedarse tirado.',
    searchQuery: 'topeak hexus x multiherramienta ciclismo'
  },
  {
    id: 'bici-lubricante-squirt-lube',
    asin: 'B07VVDHMH1',
    title: 'Squirt Lube Lubricante de Cadena de Bicicleta con Cera Biodegradable 120ml',
    category: 'mantenimiento',
    categoryLabel: 'Cera de Cadena & Limpieza',
    brand: 'Squirt',
    priceText: '12,95 €',
    priceNumeric: 12.95,
    rating: 4.7,
    reviewsCount: 15400,
    imageUrl: 'https://m.media-amazon.com/images/I/6102YVGkwsL._AC_UL320_.jpg',
    badge: 'Cadena Siempre Limpia',
    description: 'Emulsión de cera de base acuosa 100% biodegradable que no atrae polvo ni arena, prolongando la vida útil de los piñones y cadena.',
    pros: [
      'Mantiene la transmisión limpia sin pegotes de grasa negra',
      'Cambios de marcha ultra suaves y silenciosos',
      'Ideal para condiciones secas, barro o polvo en carretera y MTB'
    ],
    idealFor: 'Un detalle baratísimo y muy agradecido por cualquier amante de las bicis.',
    searchQuery: 'squirt lube cera lubricante cadena bicicleta 120ml'
  },
  {
    id: 'bici-bolsa-cuadro-rockbros',
    asin: 'B07WPH2W2W',
    title: 'Rockbros Bolsa de Cuadro Impermeable para Bicicleta con Soporte Táctil Móvil',
    category: 'bolsas',
    categoryLabel: 'Bolsas Cuadro & Hidratación',
    brand: 'Rockbros',
    priceText: '19,99 €',
    priceNumeric: 19.99,
    rating: 4.6,
    reviewsCount: 9600,
    imageUrl: 'https://m.media-amazon.com/images/I/71CT2jP8zlL._AC_UL320_.jpg',
    badge: 'Impermeable con Visor Solar',
    description: 'Bolsa rígida de fibra de carbono EVA con ventana de TPU ultra sensible para usar pantallas táctiles y orificio para auriculares o cables.',
    pros: [
      'Visera solar superior para ver la pantalla del móvil bajo el sol directo',
      'Capacidad de 1,7L para llevar cámara de repuesto, barritas y llaves',
      'Fijación mediante 3 velos reforzados que no se mueven ni rozan las rodillas'
    ],
    idealFor: 'Llevar el móvil con GPS a la vista y bien protegido de la lluvia.',
    searchQuery: 'rockbros bolsa cuadro bicicleta impermeable movil'
  }
];
