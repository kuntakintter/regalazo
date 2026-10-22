import { HubProduct } from './automovilData';

export type PetType = 'all' | 'perro' | 'gato' | 'roedor';

export interface MascotaProduct extends HubProduct {
  petType?: PetType;
}

export const PET_TYPE_FILTERS: { id: PetType; label: string; shortLabel: string; icon: string }[] = [
  { id: 'all', label: 'Todos los Peludos', shortLabel: 'Todos', icon: '🐾' },
  { id: 'perro', label: 'Perros', shortLabel: 'Perros', icon: '🐶' },
  { id: 'gato', label: 'Gatos', shortLabel: 'Gatos', icon: '🐱' },
  { id: 'roedor', label: 'Conejos y Roedores', shortLabel: 'Conejos & Roedores', icon: '🐰' },
];

export const MASCOTAS_CATEGORIES = [
  { id: 'all', label: 'Todo para Amantes de Mascotas', icon: '🐾' },
  { id: 'kong-ansiedad', label: 'Juguetes KONG & Ansiedad al Comer', icon: '🦴' },
  { id: 'comederos', label: 'Comederos & Fuentes Inteligentes', icon: '🥣' },
  { id: 'gps', label: 'Localizadores GPS & Seguridad', icon: '📍' },
  { id: 'camas', label: 'Camas Ortopédicas & Relax', icon: '🛏️' },
  { id: 'juguetes', label: 'Juguetes Interactivos & Puzzles', icon: '🎾' },
  { id: 'viaje', label: 'Transportines & Fundas de Coche', icon: '🚙' },
  { id: 'gadgets', label: 'Cámaras con Dispensador & Cepillos', icon: '📹' },
];

export const MASCOTAS_BRANDS = [
  'Todas las marcas',
  'KONG',
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

export const MASCOTAS_PRODUCTS: MascotaProduct[] = [
  {
    id: 'pet-kong-classic-rellenable',
    asin: 'B0002AR0I8',
    title: 'KONG Classic - Juguete de Caucho Natural Rellenable Antiansiedad para Perros',
    category: 'kong-ansiedad',
    categoryLabel: 'Juguetes KONG & Ansiedad al Comer',
    brand: 'KONG',
    petType: 'perro',
    priceText: '13,99 €',
    priceNumeric: 13.99,
    rating: 4.7,
    reviewsCount: 88000,
    imageUrl: 'https://m.media-amazon.com/images/I/61CT7VZTqQL._AC_UL320_.jpg',
    badge: 'Nº 1 Mundial Antiansiedad',
    description: 'El estándar de oro de los juguetes caninos desde hace más de 40 años. Su caucho natural ultra resistente satisface el instinto natural de masticar. Rellénalo con comida húmeda, pienso o premios congelados para mantener a tu perro concentrado, relajado y comiendo despacio durante horas.',
    pros: [
      'Reduce drásticamente la ansiedad por separación, aburrimiento y voracidad',
      'Caucho natural 100% no tóxico y con rebote impredecible para jugar',
      'Apto para congelador y lavavajillas (fácil de limpiar)'
    ],
    idealFor: 'Perros que comen con ansia, cachorros en cambio de dentición o perros con ansiedad cuando se quedan solos.',
    searchQuery: 'kong classic perro juguete caucho natural rellenable antiansiedad'
  },
  {
    id: 'pet-lick-mat-alfombrilla-lamido',
    asin: 'B0BBGM79PG',
    title: 'Lick Mat - Alfombrilla de Lamido Antiansiedad con Ventosas y Comedero Lento',
    category: 'kong-ansiedad',
    categoryLabel: 'Juguetes KONG & Ansiedad al Comer',
    brand: 'Trixie',
    petType: 'all',
    priceText: '11,99 €',
    priceNumeric: 11.99,
    rating: 4.6,
    reviewsCount: 12400,
    imageUrl: 'https://m.media-amazon.com/images/I/71+kSCJ-uYL._AC_UL320_.jpg',
    badge: 'Calma Comprobada por Veterinarios',
    description: 'El acto repetitivo de lamer libera endorfinas que calman el sistema nervioso de perros y gatos. Con potentes ventosas traseras para fijar en suelo o azulejos durante el baño, el cepillado o momentos de estrés mientras comen paté, yogur o kéfir lentamente.',
    pros: [
      'Ralentiza la ingesta de comida húmeda multiplicando el tiempo por 10',
      'Ventosas de gran agarre en baldosas, cristales y suelos',
      'Silicona libre de BPA de máxima seguridad alimentaria'
    ],
    idealFor: 'Perros y gatos que se estresan fácilmente, momentos de tormentas, petardos o visitas al veterinario.',
    searchQuery: 'lick mat alfombrilla lamido perros comedero lento antiansiedad'
  },
  {
    id: 'pet-trixie-bola-heno-dispensador',
    asin: 'B000V9H9R2',
    title: 'TRIXIE Bola Dispensadora de Heno y Golosinas Metálica para Conejos y Pequeños Roedores',
    category: 'kong-ansiedad',
    categoryLabel: 'Juguetes KONG & Ansiedad al Comer',
    brand: 'Trixie',
    petType: 'roedor',
    priceText: '6,49 €',
    priceNumeric: 6.49,
    rating: 4.6,
    reviewsCount: 14600,
    imageUrl: 'https://m.media-amazon.com/images/I/51BCYmEzL8L._AC_UL320_.jpg',
    badge: 'Estimulación & Alimentación Lenta',
    description: 'Dispensador colgante oscilante que mantiene el heno limpio y alejado del suelo mientras convierte la comida en una actividad divertida que frena la voracidad y la ansiedad en conejos y roedores.',
    pros: [
      'Mantiene el heno fresco y libre de orina y suciedad',
      'Frena el estrés obligando al conejo a estirarse y alimentarse jugando',
      'Cadena con gancho de seguridad adaptable a cualquier jaula o parque'
    ],
    idealFor: 'Alimentación activa y enriquecimiento ambiental para conejos, cobayas y chinchillas.',
    searchQuery: 'trixie bola dispensadora heno conejo roedor comedero'
  },
  {
    id: 'pet-comedero-antivoracidad-lento',
    asin: 'B0CNXMMKHY',
    title: 'Comedero Antivoracidad para Perros y Gatos - Plato de Alimentación Lenta Antiasfixia',
    category: 'kong-ansiedad',
    categoryLabel: 'Juguetes KONG & Ansiedad al Comer',
    brand: 'Petkit',
    petType: 'all',
    priceText: '9,99 €',
    priceNumeric: 9.99,
    rating: 4.7,
    reviewsCount: 15600,
    imageUrl: 'https://m.media-amazon.com/images/I/61ixCPcNf7L._AC_UL320_.jpg',
    badge: 'Previene la Torsión de Estómago',
    description: 'Diseño en forma de laberinto que obliga a la mascota a comer entre 5 y 10 veces más despacio. Evita atracones, gases, vómitos poscomida y el peligroso riesgo de torsión gástrica canina.',
    pros: [
      'Alarga el tiempo de comida convirtiendo el almuerzo en un juego estimulante',
      'Base de goma antideslizante para que el plato no se mueva por la cocina',
      'Fácil de lavar a mano o en la bandeja superior del lavavajillas'
    ],
    idealFor: 'Perros y cachorros glotones que aspiran la comida sin masticar en cuestión de segundos.',
    searchQuery: 'comedero antivoracidad perros plato laberinto alimentacion lenta'
  },
  {
    id: 'pet-trixie-tunel-mimbre-conejos',
    asin: 'B002TDV7AS',
    title: 'TRIXIE Túnel de Mimbre Natural para Conejos y Cobayas - Nido y Juguete Masticable',
    category: 'juguetes',
    categoryLabel: 'Juguetes Interactivos & Puzzles',
    brand: 'Trixie',
    petType: 'roedor',
    priceText: '9,99 €',
    priceNumeric: 9.99,
    rating: 4.6,
    reviewsCount: 8400,
    imageUrl: 'https://m.media-amazon.com/images/I/61+a4Z9gzEL._AC_UL320_.jpg',
    badge: '100% Mimbre Natural Masticable',
    description: 'Túnel de mimbre trenzado 100% ecológico y digestible. Proporciona a conejos enanos y cobayas un túnel seguro para correr, esconderse y desgastar sus dientes de forma natural sin riesgos.',
    pros: [
      'Fibra de mimbre natural sin pegamentos ni alambres',
      'Favorece el desgaste dental continuo esencial en conejos',
      'Sirve como zona de siesta y juego estimulante'
    ],
    idealFor: 'Conejos, cobayas y chinchillas para evitar el aburrimiento dentro de su recinto.',
    searchQuery: 'trixie tunel mimbre conejos cobayas roedores'
  },
  {
    id: 'pet-gps-tractive-perro',
    asin: 'B0D6Z4L6BW',
    title: 'Tractive Localizador GPS para Perros 100% Resistente al Agua con Seguimiento en Vivo',
    category: 'gps',
    categoryLabel: 'Localizadores GPS & Seguridad',
    brand: 'Tractive',
    petType: 'perro',
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
    petType: 'gato',
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
    petType: 'perro',
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
    petType: 'all',
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
