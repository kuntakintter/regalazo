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
  },
  {
    id: 'game-teclado-steelseries-apex-3',
    asin: 'B082YRCL4T',
    title: 'SteelSeries Apex 3 Teclado Gaming RGB con Reposamuñecas Magnético y Resistencia al Agua',
    category: 'teclados',
    categoryLabel: 'Teclados Mecánicos',
    brand: 'SteelSeries',
    priceText: '49,99 €',
    priceNumeric: 49.99,
    rating: 4.6,
    reviewsCount: 16800,
    imageUrl: 'https://m.media-amazon.com/images/I/61nBW1Uwq6L._AC_UL320_.jpg',
    badge: 'Silencioso y Resistente',
    description: 'Interruptores para juegos ultrasilenciosos con durabilidad garantizada para más de 20 millones de pulsaciones, certificación IP32 contra salpicaduras y reposamuñecas premium.',
    pros: [
      'Resistencia al agua IP32 para evitar daños por derrames accidentales',
      'Iluminación RGB de 10 zonas personalizable que reacciona a juegos',
      'Reposamuñecas magnético suave al tacto con sujeción ergonómica total'
    ],
    idealFor: 'Gamers que buscan la máxima calidad SteelSeries con tacto silencioso y reposamuñecas.',
    searchQuery: 'steelseries apex 3 teclado gaming rgb espanol'
  },
  {
    id: 'game-auriculares-razer-blackshark-v2x',
    asin: 'B089SSF5L8',
    title: 'Razer BlackShark V2 X Auriculares Gaming Multiplataforma con Drivers TriForce 50mm',
    category: 'auriculares',
    categoryLabel: 'Auriculares & Audio',
    brand: 'Razer',
    priceText: '49,99 €',
    priceNumeric: 49.99,
    rating: 4.5,
    reviewsCount: 38000,
    imageUrl: 'https://m.media-amazon.com/images/I/61vmsbQ9m4L._AC_UL320_.jpg',
    badge: 'Top eSports Razer',
    description: 'Diseño ultraligero de solo 240g con diafragmas de titanio de 50mm, micrófono cardioide HyperClear y cancelación pasiva avanzada de ruido exterior.',
    pros: [
      'Peso pluma de 240 gramos: casi no notas que los llevas puestos',
      'Drivers TriForce de 50 mm con calibración individual de agudos, medios y graves',
      'Compatibilidad universal con PC, PS5, PS4, Xbox y Nintendo Switch vía jack 3.5mm'
    ],
    idealFor: 'Competición en shooters online y sesiones maratonianas donde cada gramo de peso cuenta.',
    searchQuery: 'razer blackshark v2 x auriculares gaming'
  },
  {
    id: 'game-teclado-corsair-k55-rgb',
    asin: 'B08XYQ5ZDM',
    title: 'Corsair K55 RGB PRO Teclado Gaming con 6 Teclas Macro Dedicadas y Software iCUE',
    category: 'teclados',
    categoryLabel: 'Teclados Mecánicos',
    brand: 'Corsair',
    priceText: '59,99 €',
    priceNumeric: 59.99,
    rating: 4.5,
    reviewsCount: 12500,
    imageUrl: 'https://m.media-amazon.com/images/I/71R20Kq10LL._AC_UL320_.jpg',
    badge: 'Teclas Macro Elgato',
    description: 'Iluminación dinámica RGB de 5 zonas, 6 teclas macro dedicadas integradas con el software Elgato Stream Deck y protección IP42 contra polvo y derrames.',
    pros: [
      '6 teclas macro programables compatibles directamente con Elgato Stream Deck',
      'Teclas silenciosas y muy reactivas con pulsación táctil muy agradable',
      'Software iCUE para sincronizar colores con el resto de componentes Corsair'
    ],
    idealFor: 'Streamers y creadores de contenido que quieren macros al vuelo para sus directos.',
    searchQuery: 'corsair k55 rgb pro teclado gaming macro'
  }
];
