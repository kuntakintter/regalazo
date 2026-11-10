import { HubProduct } from './automovilData';

export const CAFE_CATEGORIES = [
  { id: 'all', label: 'Todo para Amantes del Café', icon: '☕' },
  { id: 'espresso', label: 'Cafeteras Espresso & Moka', icon: '♨️' },
  { id: 'molinillos', label: 'Molinillos Manuales & Eléctricos', icon: '⚙️' },
  { id: 'filtro', label: 'Café de Especialidad & Filtro (V60)', icon: '🧪' },
  { id: 'espumadores', label: 'Espumadores de Leche & Jarras', icon: '🥛' },
  { id: 'balanzas', label: 'Básculas de Precisión con Crono', icon: '⚖️' },
  { id: 'termos', label: 'Tazas Térmicas & Mugs (Stanley)', icon: '🧊' },
];

export const CAFE_BRANDS = [
  'Todas las marcas',
  'DeLonghi',
  'Cecotec',
  'Hario',
  'Bialetti',
  'Timemore',
  'Stanley',
];

export const CAFE_PRICE_RANGES = [
  { id: 'all', label: 'Cualquier presupuesto' },
  { id: '<25', label: 'Detalles cafeteros (<25 €)' },
  { id: '25-60', label: 'De 25 € a 60 €' },
  { id: '60-150', label: 'De 60 € a 150 €' },
  { id: '>150', label: 'Gama Alta Barista (+150 €)' },
];

export const CAFE_PRODUCTS: HubProduct[] = [
  {
    id: 'cafe-bialetti-moka-express',
    asin: '',
    title: 'Bialetti Moka Express Cafetera Italiana Tradicional de Aluminio 3 Tazas',
    category: 'espresso',
    categoryLabel: 'Cafeteras Espresso & Moka',
    brand: 'Bialetti',
    priceText: '28,90 €',
    priceNumeric: 28.9,
    rating: 4.7,
    reviewsCount: 76000,
    imageUrl: 'https://m.media-amazon.com/images/I/51ztr9kI8HL._AC_UL320_.jpg',
    badge: 'La Auténtica Cafetera Italiana',
    description: 'El diseño octogonal patentado más famoso del mundo desde 1933. Extrae un café con cuerpo y aroma inigualable con válvula de seguridad inspeccionable.',
    pros: [
      'Cuerpo de aluminio fundido para una distribución perfecta del calor',
      'Válvula de seguridad patentada Bialetti de fácil limpieza',
      'Mango ergonómico antiquemaduras'
    ],
    idealFor: 'El regalo clásico que nunca falla para cualquier amante del buen café de sobremesa.',
    searchQuery: 'bialetti moka express cafetera italiana aluminio 3 tazas'
  },
  {
    id: 'cafe-molinillo-timemore-c3',
    asin: 'B0CNG5JXLH',
    title: 'TIMEMORE Chestnut C3 ESP Pro Molinillo de Café Manual con Muelas de Acero Inoxidable',
    category: 'molinillos',
    categoryLabel: 'Molinillos Manuales & Eléctricos',
    brand: 'Timemore',
    priceText: '69,00 €',
    priceNumeric: 69.0,
    rating: 4.8,
    reviewsCount: 6800,
    imageUrl: 'https://m.media-amazon.com/images/I/61BE3Fmc1SL._AC_UL320_.jpg',
    badge: 'Muelas de Precisión CNC',
    description: 'Cuerpo de aleación de aluminio con doble rodamiento de bolas para una molienda uniforme sin esfuerzo, perfecta para espresso, V60 o prensa francesa.',
    pros: [
      'Muelas de acero patentadas Spike-to-Cut (S2C) para corte uniforme',
      'Ajuste punto a punto con clic preciso para cualquier método de extracción',
      'Tamaño compacto ideal para casa o llevar de viaje'
    ],
    idealFor: 'Quienes quieren dar el salto al café de especialidad recién molido.',
    searchQuery: 'timemore chestnut c3 esp pro molinillo manual cafe'
  },
  {
    id: 'cafe-espumador-severin-induccion',
    asin: 'B07XFP21FZ',
    title: 'Severin SM 3585 Espumador de Leche por Inducción Automático con Función Frío y Caliente',
    category: 'espumadores',
    categoryLabel: 'Espumadores de Leche & Jarras',
    brand: 'Otros',
    priceText: '95,60 €',
    priceNumeric: 95.6,
    rating: 4.7,
    reviewsCount: 14500,
    imageUrl: 'https://m.media-amazon.com/images/I/6129yNaaq5L._AC_UL320_.jpg',
    badge: 'Espuma Cremosa de Cafetería',
    description: 'Jarra de acero inoxidable apta para lavavajillas que crea espuma microtexturizada de barista para capuchinos, lattes y chocolate a la taza caliente.',
    pros: [
      'Tecnología de inducción de 360 grados sin quemar la leche',
      'Apto para leche de vaca y bebidas vegetales (avena, soja, almendra)',
      'Jarra de acero inoxidable extraíble apta para lavavajillas'
    ],
    idealFor: 'Los apasionados del capuccino cremoso por las mañanas.',
    searchQuery: 'severin espumador de leche induccion automatico'
  },
  {
    id: 'cafe-termo-stanley-trigger-action',
    asin: 'B0FZVP4JW8',
    title: 'Stanley 1913 Transit Flip Top Taza Térmica de Viaje 470ml (Black 2.0)',
    category: 'termos',
    categoryLabel: 'Tazas Térmicas & Mugs (Stanley)',
    brand: 'Stanley',
    priceText: '33,95 €',
    priceNumeric: 33.95,
    rating: 4.8,
    reviewsCount: 39000,
    imageUrl: 'https://m.media-amazon.com/images/I/51Jhz2zTiuL._AC_UL320_.jpg',
    badge: 'Conserva Caliente 7 Horas',
    description: 'Aislamiento al vacío de doble pared que mantiene bebidas calientes o heladas durante horas. Tapa abatible Flip Top 100% a prueba de fugas.',
    pros: [
      'Tapa abatible Flip Top ergonómica para beber con comodidad sobre la marcha',
      'Cierre hermético total: no se derrama una sola gota en la mochila o coche',
      'Acero inoxidable 18/8 sin BPA apto para lavavajillas'
    ],
    idealFor: 'Llevar café caliente al trabajo, universidad o de viaje en coche.',
    searchQuery: 'stanley 1913 transit flip top taza termica 0.47l'
  }
];

export const CAFE_EXTRA_PRODUCTS: HubProduct[] = [
  {
    id: '18plus-cecotec-power-espresso-cafetera',
    asin: '',
    title: 'Cecotec Cafetera Express Power Espresso 20 Professionale - 20 Bares con Manómetro Tradicional y Vaporizador',
    category: 'espresso',
    categoryLabel: 'Cafeteras Espresso & Moka',
    brand: 'Cecotec',
    priceText: '89,90 €',
    priceNumeric: 89.9,
    rating: 4.7,
    reviewsCount: 28900,
    imageUrl: 'https://m.media-amazon.com/images/I/71lLByP8C3L._AC_UL320_.jpg',
    badge: 'El Espresso Perfecto con Crema Densa en Casa',
    description: 'Diseñada para auténticos amantes del café barista. Bomba de presión italiana de 20 bares con manómetro de control de presión en tiempo real y vaporizador orientable para emulsionar leche y preparar cappuccinos sedosos.',
    pros: [
      'Bomba de 20 bares con tecnología ForceAroma para máxima crema',
      'Manómetro de estilo retro vintage muy elegante en cocina',
      'Bandeja calientatazas de acero inoxidable'
    ],
    idealFor: 'Adultos amantes del café recién molido y desayunos de calidad.',
    searchQuery: 'cecotec cafetera express power espresso 20 bars manometro vaporizador leche cafe molido'
  },
  {
    id: '18plus-hario-v60-kit-cafe-filtro',
    asin: 'B0DMF4TRH4',
    title: 'Hario V60 - Set Completo de Café de Filtro Manual con Jarra de Cristal Servidora, Cono y Filtros de Papel',
    category: 'filtro',
    categoryLabel: 'Café de Especialidad & Filtro (V60)',
    brand: 'Hario',
    priceText: '28,95 €',
    priceNumeric: 28.95,
    rating: 4.9,
    reviewsCount: 16400,
    imageUrl: 'https://m.media-amazon.com/images/I/51HKCT6qsFL._AC_UL320_.jpg',
    badge: 'El Método de Extracción Preferido de los Baristas',
    description: 'Fabricado en Japón, el método de goteo Hario V60 extrae las notas afrutadas y florales más sutiles del café de especialidad. Incluye cono de extracción con estrías espirales, jarra de vidrio resistente al calor y cuchara medidora.',
    pros: [
      'Extrae el sabor más limpio, aromático y dulce del café',
      'Vidrio japonés borosilicato de máxima resistencia térmica',
      'Un ritual matutino de paz y sabor incomparable'
    ],
    idealFor: 'Gourmets del café de origen y amantes del café de filtro.',
    searchQuery: 'hario v60 set cafe goteo filtro manual jarra cristal servidor barista'
  },
  {
    id: 'hogar-bodum-cafetera-francesa-chambord-cobre',
    asin: '',
    title: 'Bodum Chambord - Cafetera Francesa de Émbolo en Acero Inoxidable y Cobre Brillante (8 Tazas, 1 Litro) con Vidrio Borosilicato',
    category: 'filtro',
    categoryLabel: 'Café de Especialidad & Filtro (V60)',
    brand: 'Otros',
    priceText: '44,90 €',
    priceNumeric: 44.9,
    rating: 4.7,
    reviewsCount: 22100,
    imageUrl: '/images/products/hogar-bodum-cafetera-francesa-chambord-cobre-1.jpg',
    badge: 'Icono del Café de Especialidad',
    description: 'El clásico diseño Chambord de Bodum en un espectacular acabado en cobre brillante. Su filtro de émbolo en acero inoxidable extrae todos los aceites esenciales del café molido consiguiendo un sabor denso y aromático.',
    pros: [
      'Jarra de vidrio de borosilicato resistente a cambios térmicos bruscos',
      'Estructura y tapa de acero inoxidable chapado en cobre de lujo',
      'No necesita filtros de papel ni cápsulas: 100% sostenible y pura'
    ],
    idealFor: 'Amantes del buen café que cuidan la estética de su cocina.',
    searchQuery: 'bodum chambord cafetera francesa embolo cobre acero 1 litro'
  },
  {
    id: 'hogar-tazas-ceramica-artesanales-japonesas',
    asin: '',
    title: 'Juego de 2 Tazas de Café Artesanales de Cerámica Japonesa con Textura Rústica Hecha a Mano y Platillos de Bambú Natural',
    category: 'termos',
    categoryLabel: 'Tazas Térmicas & Mugs (Stanley)',
    brand: 'Otros',
    priceText: '26,90 €',
    priceNumeric: 26.9,
    rating: 4.8,
    reviewsCount: 4300,
    imageUrl: '/images/products/hogar-tazas-ceramica-artesanales-japonesas-1.jpg',
    badge: 'Diseño Cerámico Wabi-Sabi',
    description: 'Set de dos tazas de cerámica artesanal de gres esmaltado con acabado texturizado mate y asa ergonómica. Cada pieza es única y viene acompañada de platillos de bambú grabados con estilo zen.',
    pros: [
      'Acabado artesanal esmaltado resistente al microondas y lavavajillas',
      'Capacidad perfecta de 250ml para capuchinos, lattes, té o matcha',
      'Presentadas en elegante caja kraft acolchada lista para regalo'
    ],
    idealFor: 'Disfrutar del café o té matutino con un toque estético y de calma.',
    searchQuery: 'juego tazas ceramica artesanal japonesa platillo bambu cafe capuchino'
  }
];

export const CAFE_HUB_PRODUCTS: HubProduct[] = [
  ...CAFE_PRODUCTS,
  ...CAFE_EXTRA_PRODUCTS,
];
