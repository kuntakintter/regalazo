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
    asin: 'B008FOF86E',
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
    title: 'TIMEMORE Chestnut C3 Molinillo de Café Manual con Muelas de Acero S2C',
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
    searchQuery: 'timemore c3 molinillo manual cafe muelas acero'
  },
  {
    id: 'cafe-espumador-severin-induccion',
    asin: 'B07XDT2Z6Y',
    title: 'Severin SM 3585 Espumador de Leche por Inducción Automático con Función Frío y Caliente',
    category: 'espumadores',
    categoryLabel: 'Espumadores de Leche & Jarras',
    brand: 'Otros',
    priceText: '79,90 €',
    priceNumeric: 79.9,
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
    asin: 'B0F5WZN97R',
    title: 'Stanley Classic Trigger-Action Taza de Viaje Térmica de Acero Inoxidable 470ml',
    category: 'termos',
    categoryLabel: 'Tazas Térmicas & Mugs (Stanley)',
    brand: 'Stanley',
    priceText: '34,95 €',
    priceNumeric: 34.95,
    rating: 4.8,
    reviewsCount: 39000,
    imageUrl: 'https://m.media-amazon.com/images/I/51Jhz2zTiuL._AC_UL320_.jpg',
    badge: 'Conserva Caliente 7 Horas',
    description: 'Aislamiento al vacío de doble pared que mantiene bebidas calientes 7h o heladas 30h. Botón de apertura con un solo dedo 100% a prueba de fugas.',
    pros: [
      'Apertura con una sola mano mediante pulsador ergonómico',
      'Cierre hermético total: no se derrama una sola gota en la mochila o coche',
      'Acero inoxidable 18/8 sin BPA apto para lavavajillas'
    ],
    idealFor: 'Llevar café caliente al trabajo, universidad o de viaje en coche.',
    searchQuery: 'stanley classic trigger action taza termica viaje 470ml'
  }
];
