import { HubProduct } from './automovilData';

export const GAMING_CATEGORIES = [
  { id: 'all', label: 'Todo para Gaming & Setup', icon: '🎮' },
  { id: 'auriculares', label: 'Auriculares & Audio', icon: '🎧' },
  { id: 'teclados', label: 'Teclados Mecánicos', icon: '⌨️' },
  { id: 'ratones', label: 'Ratones & Alfombrillas XXL', icon: '🖱️' },
  { id: 'iluminacion', label: 'Iluminación RGB & Barras Monitor', icon: '💡' },
  { id: 'mandos', label: 'Mandos Pro & Soporte', icon: '🕹️' },
  { id: 'sillas', label: 'Cojines & Confort Setup', icon: '🪑' },
];

export const GAMING_BRANDS = [
  'Todas las marcas',
  'Logitech G',
  'Razer',
  'HyperX',
  'SteelSeries',
  'Corsair',
  'BenQ',
];

export const GAMING_PRICE_RANGES = [
  { id: 'all', label: 'Cualquier presupuesto' },
  { id: '<30', label: 'Detalles gaming (<30 €)' },
  { id: '30-70', label: 'De 30 € a 70 €' },
  { id: '70-150', label: 'De 70 € a 150 €' },
  { id: '>150', label: 'Gama Alta (+150 €)' },
];

export const GAMING_PRODUCTS: HubProduct[] = [
  {
    id: 'game-auriculares-hyperx-cloud-2',
    asin: 'B076GT6XJ9',
    title: 'HyperX Cloud II Auriculares Gaming con Sonido Envolvente 7.1 Virtual',
    category: 'auriculares',
    categoryLabel: 'Auriculares & Audio',
    brand: 'HyperX',
    priceText: '74,99 €',
    priceNumeric: 74.99,
    rating: 4.6,
    reviewsCount: 78000,
    imageUrl: 'https://m.media-amazon.com/images/I/71TzR126poL._AC_UL320_.jpg',
    badge: 'El Rey de los Torneos',
    description: 'Diadema de aluminio resistente con almohadillas viscoelásticas de cuero sintético y micrófono con cancelación pasiva de ruido desmontable.',
    pros: [
      'Comodidad legendaria para sesiones de juego de más de 8 horas',
      'Drivers de 53 mm con graves profundos y agudos nítidos para escuchar pasos',
      'Caja de control de audio USB con tarjeta de sonido DSP integrada'
    ],
    idealFor: 'El auricular más fiable y galardonado tanto para PC como para PS5 y Xbox.',
    searchQuery: 'hyperx cloud ii auriculares gaming 7.1'
  },
  {
    id: 'game-raton-logitech-g502-hero',
    asin: 'B07GS6ZB7T',
    title: 'Logitech G502 HERO Ratón Gaming con Sensor Óptico HERO 25.600 DPI',
    category: 'ratones',
    categoryLabel: 'Ratones & Alfombrillas XXL',
    brand: 'Logitech G',
    priceText: '47,90 €',
    priceNumeric: 47.9,
    rating: 4.7,
    reviewsCount: 65000,
    imageUrl: 'https://m.media-amazon.com/images/I/61drBproFZL._AC_UL320_.jpg',
    badge: 'Ratón Más Vendido del Mundo',
    description: 'Sensor de precisión submicrométrica sin suavizado ni filtros. 11 botones programables, rueda hiperrápida y 5 pesas ajustables de 3,6g.',
    pros: [
      'Sensor HERO 25K con precisión de nivel competitivo eSports',
      'Pesas ajustables para equilibrar el centro de gravedad a tu gusto',
      'Iluminación RGB LIGHTSYNC con 16,8 millones de colores'
    ],
    idealFor: 'Jugadores de shooters (Valorant, CS:GO, Warzone, Fortnite) y MMO.',
    searchQuery: 'logitech g502 hero raton gaming rgb 25k'
  },
  {
    id: 'game-barra-luz-monitor-benq',
    asin: 'B0CR1H394H',
    title: 'Quntis Barra de Luz para Monitor de Ordenador con Control Táctil y Sin Reflejos',
    category: 'iluminacion',
    categoryLabel: 'Iluminación RGB & Barras Monitor',
    brand: 'Otros',
    priceText: '39,99 €',
    priceNumeric: 39.99,
    rating: 4.7,
    reviewsCount: 18400,
    imageUrl: 'https://m.media-amazon.com/images/I/61cbO+mNV6L._AC_UL320_.jpg',
    badge: 'Protege la Vista',
    description: 'Iluminación asimétrica que alumbra el escritorio y teclado sin proyectar ningún reflejo en la pantalla del monitor, evitando la fatiga ocular.',
    pros: [
      'Diseño óptico asimétrico que elimina reflejos molestos en la pantalla',
      'Temperatura de color ajustable (3000K a 6500K) y brillo regulable',
      'Ahorra espacio en la mesa al anclarse sobre el bisel del monitor'
    ],
    idealFor: 'Cualquier persona que pase horas jugando o trabajando de noche frente al PC.',
    searchQuery: 'barra de luz monitor ordenador quntis screenbar'
  },
  {
    id: 'game-teclado-logitech-g213',
    asin: 'B01L6L44NU',
    title: 'Logitech G213 Prodigy Teclado Gaming con Teclas Mech-Dome Resistente a Salpicaduras',
    category: 'teclados',
    categoryLabel: 'Teclados Mecánicos',
    brand: 'Logitech G',
    priceText: '54,99 €',
    priceNumeric: 54.99,
    rating: 4.6,
    reviewsCount: 24000,
    imageUrl: 'https://m.media-amazon.com/images/I/61fG2Zep+CL._AC_UL320_.jpg',
    badge: 'Resistente a Líquidos',
    description: 'Rendimiento hasta 4 veces más rápido que los teclados estándar con matriz anti-ghosting, reposamuñecas integrado y controles multimedia.',
    pros: [
      'Resistente a derrames de hasta 60 ml de líquido para no arruinar partidas',
      'Reposamuñecas integrado para ergonomía en largas sesiones',
      'Botones dedicados para pausar música, silenciar y subir volumen al vuelo'
    ],
    idealFor: 'El teclado todoterreno ideal para iniciarse en el gaming con marca de confianza.',
    searchQuery: 'logitech g213 prodigy teclado gaming rgb'
  }
];
