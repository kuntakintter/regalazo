import { HubProduct } from './automovilData';

export const MASCOTAS_CATEGORIES = [
  { id: 'all', label: 'Todo para Amantes de Mascotas', icon: '🐾' },
  { id: 'comederos', label: 'Comederos & Fuentes Inteligentes', icon: '🥣' },
  { id: 'gps', label: 'Localizadores GPS & Seguridad', icon: '📍' },
  { id: 'camas', label: 'Camas Ortopédicas & Relax', icon: '🛏️' },
  { id: 'juguetes', label: 'Juguetes Interactivos & Puzzles', icon: '🎾' },
  { id: 'viaje', label: 'Transportines & Fundas de Coche', icon: '🚙' },
  { id: 'gadgets', label: 'Cámaras con Dispensador & Cepillos', icon: '📹' },
];

export const MASCOTAS_BRANDS = [
  'Todas las marcas',
  'Petkit',
  'Trixie',
  'Julius-K9',
  'Tractive',
  'Catit',
  'Furminator',
];

export const MASCOTAS_PRICE_RANGES = [
  { id: 'all', label: 'Cualquier presupuesto' },
  { id: '<25', label: 'Detalles para peludos (<25 €)' },
  { id: '25-60', label: 'De 25 € a 60 €' },
  { id: '60-120', label: 'De 60 € a 120 €' },
  { id: '>120', label: 'Gama Alta (+120 €)' },
];

export const MASCOTAS_PRODUCTS: HubProduct[] = [
  {
    id: 'pet-gps-tractive-perro',
    asin: 'B0D6Z4L6BW',
    title: 'Tractive Localizador GPS para Perros 100% Resistente al Agua con Seguimiento en Vivo',
    category: 'gps',
    categoryLabel: 'Localizadores GPS & Seguridad',
    brand: 'Tractive',
    priceText: '49,99 €',
    priceNumeric: 49.99,
    rating: 4.6,
    reviewsCount: 35000,
    imageUrl: 'https://m.media-amazon.com/images/I/71il4nMReSL._AC_UL320_.jpg',
    badge: 'Tranquilidad Absoluta',
    description: 'Rastreo en tiempo real sin límite de distancia en más de 175 países. Alertas de valla virtual cuando tu perro sale de la zona segura y monitor de salud.',
    pros: [
      'Modo LIVE con actualización de ubicación cada 2-3 segundos',
      'Valla virtual que envía notificación al móvil si escapa',
      '100% sumergible en agua y resistente a golpes de aventura'
    ],
    idealFor: 'Dueños de perros que pasean por el campo, montaña o sueltos en el parque.',
    searchQuery: 'tractive gps perros localizador resistente agua collar'
  },
  {
    id: 'pet-fuente-catit-pixi',
    asin: 'B096WB6PBD',
    title: 'Catit PIXI Fuente de Agua Inteligente para Gatos con Triple Filtro 2,5 Litros',
    category: 'comederos',
    categoryLabel: 'Comederos & Fuentes Inteligentes',
    brand: 'Catit',
    priceText: '34,99 €',
    priceNumeric: 34.99,
    rating: 4.7,
    reviewsCount: 16800,
    imageUrl: 'https://m.media-amazon.com/images/I/61Xdiq76dHS._AC_UL320_.jpg',
    badge: 'Estimula la Hidratación',
    description: 'Bomba ultrasilenciosa con filtración continua que elimina pelos, sedimentos y metales pesados. Luz LED nocturna que avisa del nivel de agua.',
    pros: [
      'Bomba casi inaudible que no asusta a gatos tímidos',
      'Triple acción de filtrado para agua siempre fresca y oxigenada',
      'La nariz de la fuente cambia de color si el nivel de agua está bajo'
    ],
    idealFor: 'Gatos y perros pequeños para prevenir problemas renales y urinarios.',
    searchQuery: 'catit pixi fuente agua gatos inteligente 2.5l'
  },
  {
    id: 'pet-arnes-julius-k9',
    asin: 'B0B2S44RFH',
    title: 'Julius-K9 IDC Power Arnés Ergonómico para Perros Antitirones de Alta Resistencia',
    category: 'viaje',
    categoryLabel: 'Transportines & Fundas de Coche',
    brand: 'Julius-K9',
    priceText: '32,90 €',
    priceNumeric: 32.9,
    rating: 4.8,
    reviewsCount: 62000,
    imageUrl: 'https://m.media-amazon.com/images/I/51iltf8FdzL._AC_UL320_.jpg',
    badge: 'Nº 1 en Seguridad Canina',
    description: 'El arnés profesional de referencia europea. Distribuye la fuerza de tiro en el pecho sin asfixiar la tráquea ni limitar el movimiento de hombros.',
    pros: [
      'Forro interior transpirable con certificación OEKO-TEX antialérgica',
      'Asa superior de agarre rápido para retener al perro en situaciones de riesgo',
      'Elementos reflectantes fosforescentes para paseos nocturnos seguros'
    ],
    idealFor: 'Paseos cómodos sin tirones con la máxima durabilidad del mercado.',
    searchQuery: 'julius k9 idc power arnes perro antitirones'
  },
  {
    id: 'pet-cepillo-furminator-deslanador',
    asin: 'B07NSL5MD8',
    title: 'FURminator Herramienta de Muda de Pelo para Perros y Gatos con Botón FURejector',
    category: 'gadgets',
    categoryLabel: 'Cámaras con Dispensador & Cepillos',
    brand: 'Furminator',
    priceText: '29,95 €',
    priceNumeric: 29.95,
    rating: 4.8,
    reviewsCount: 48000,
    imageUrl: 'https://m.media-amazon.com/images/I/71l2aK9m62L._AC_UL320_.jpg',
    badge: 'Reduce la Caída un 90%',
    description: 'Borde de acero inoxidable que penetra la capa externa y retira el pelo muerto del subpelo sin cortar ni dañar la piel sensible de la mascota.',
    pros: [
      'Elimina hasta el 90% del pelo muerto que luego cae por la casa o sofá',
      'Botón expulsor FURejector que limpia el peine con un solo clic',
      'Mango ergonómico antideslizante para un cepillado cómodo'
    ],
    idealFor: 'Cualquier casa con perro o gato en época de muda de pelo.',
    searchQuery: 'furminator perro cepillo deslanador pelo muerto'
  }
];
