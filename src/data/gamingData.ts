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
  'Paladone',
  '8BitDo',
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
    asin: '',
    title: 'HyperX Cloud II Auriculares Gaming con Sonido Envolvente 7.1 Virtual',
    category: 'auriculares',
    categoryLabel: 'Auriculares & Audio',
    brand: 'HyperX',
    priceText: '74,99 €',
    priceNumeric: 74.99,
    rating: 4.6,
    reviewsCount: 78000,
    imageUrl: '/images/products/game-auriculares-hyperx-cloud-2-1.jpg',
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
    imageUrl: '/images/products/game-raton-logitech-g502-hero-1.jpg',
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
    asin: 'B0GL7M99NB',
    title: 'Quntis 41 cm Barra de Luz para Monitor con Control Remoto y Sin Reflejos',
    category: 'iluminacion',
    categoryLabel: 'Iluminación RGB & Barras Monitor',
    brand: 'Otros',
    priceText: '37,99 €',
    priceNumeric: 37.99,
    rating: 4.7,
    reviewsCount: 18400,
    imageUrl: '/images/products/game-barra-luz-monitor-benq-1.jpg',
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
    id: 'game-raton-razer-deathadder-essential',
    asin: '',
    title: 'Razer DeathAdder Essential Ratón Gaming con Sensor Óptico 6.400 DPI',
    category: 'ratones',
    categoryLabel: 'Ratones & Alfombrillas XXL',
    brand: 'Razer',
    priceText: '24,99 €',
    priceNumeric: 24.99,
    rating: 4.6,
    reviewsCount: 42000,
    imageUrl: '/images/products/game-raton-razer-deathadder-essential-1.jpg',
    badge: 'Chollo Gamer Top (<25€)',
    description: 'Diseño ergonómico legendario con agarres laterales de goma antideslizante, 5 botones Hyperesponse de alta durabilidad y sensor óptico de gran precisión.',
    pros: [
      'Sensor óptico de 6.400 DPI con respuesta sin latencia',
      'Ergonomía icónica de Razer comodísima para sesiones maratonianas',
      'Interruptores mecánicos probados para más de 10 millones de clics'
    ],
    idealFor: 'El mejor ratón gaming de marca por menos de 25 euros para cualquier juego.',
    searchQuery: 'razer deathadder essential raton gaming 6400 dpi'
  },
  {
    id: 'game-alfombrilla-steelseries-qck-xxl',
    asin: 'B00WAA2704',
    title: 'SteelSeries QcK XXL Alfombrilla Gaming de Tela Micro-Tejida (900 x 400 mm)',
    category: 'ratones',
    categoryLabel: 'Ratones & Alfombrillas XXL',
    brand: 'SteelSeries',
    priceText: '44,99 €',
    priceNumeric: 44.99,
    rating: 4.7,
    reviewsCount: 31000,
    imageUrl: '/images/products/game-alfombrilla-steelseries-qck-xxl-1.jpg',
    badge: 'Indispensable Setup',
    description: 'Alfombrilla gigante de 900x400 mm con paño de microtejido exclusivo QcK optimizado para seguimiento con sensores láser y ópticos de bajo y alto CPI.',
    pros: [
      'Base de goma antideslizante resistente para máxima solidez en mesa',
      'Superficie de tela micro-tejida legendaria con deslizamiento suave',
      'Tamaño extendido para cubrir teclado, ratón y reposamuñecas'
    ],
    idealFor: 'Gamers que quieren comodidad total en las muñecas y precisión de píxel en sus movimientos.',
    searchQuery: 'steelseries qck xxl alfombrilla gaming 900x400'
  },
  {
    id: 'game-lampara-playstation-paladone',
    asin: '',
    title: 'Paladone Lámpara Oficial Iconos PlayStation con 3 Modos de Iluminación y Reacción Sonora',
    category: 'iluminacion',
    categoryLabel: 'Iluminación RGB & Barras Monitor',
    brand: 'Paladone',
    priceText: '22,99 €',
    priceNumeric: 22.99,
    rating: 4.7,
    reviewsCount: 29500,
    imageUrl: '/images/products/game-lampara-playstation-paladone-1.jpg',
    badge: 'Regalo Estrella PS5 (<25€)',
    description: 'Iluminación decorativa oficial con los símbolos clásicos de PlayStation (triángulo, círculo, cruz y cuadrado) con efectos de fases y modo reactivo a la música.',
    pros: [
      'Licencia oficial Sony PlayStation con acabados de primera calidad',
      'Modo reactivo a la música y al sonido del juego que baila al ritmo',
      'Funciona con cable USB o a pilas para colocar en cualquier estantería'
    ],
    idealFor: 'El regalo definitivo para fans de PlayStation 4 y PS5 para ambientar su habitación.',
    searchQuery: 'paladone lampara playstation iconos luz oficial'
  },
  {
    id: 'game-soporte-auriculares-rgb-newbee',
    asin: '',
    title: 'New Bee Soporte de Auriculares para Juegos con Iluminación RGB y 2 Puertos USB Hub',
    category: 'auriculares',
    categoryLabel: 'Auriculares & Audio',
    brand: 'Otros',
    priceText: '17,99 €',
    priceNumeric: 17.99,
    rating: 4.6,
    reviewsCount: 9400,
    imageUrl: '/images/products/game-soporte-auriculares-rgb-newbee-1.jpg',
    badge: 'Organizador Setup (<20€)',
    description: 'Soporte universal para cascos con base de iluminación RGB dinámica con modos respiración y arcoíris, y 2 puertos USB integrados para conectar accesorios.',
    pros: [
      'Base con múltiples modos RGB seleccionables con botón táctil',
      '2 puertos USB para cargar mandos, ratón o transferir datos',
      'Base con peso y goma antideslizante para evitar balanceos'
    ],
    idealFor: 'Tener los cascos siempre recogidos y añadir ambiente de luces al escritorio.',
    searchQuery: 'soporte auriculares rgb new bee hub usb setup'
  },
  {
    id: 'game-mando-inalambrico-8bitdo',
    asin: '',
    title: '8BitDo Ultimate C Mando Inalámbrico 2.4G para PC Windows 10/11, Steam Deck y Android',
    category: 'mandos',
    categoryLabel: 'Mandos Pro & Soporte',
    brand: '8BitDo',
    priceText: '29,99 €',
    priceNumeric: 29.99,
    rating: 4.6,
    reviewsCount: 8800,
    imageUrl: '/images/products/game-mando-inalambrico-8bitdo-1.jpg',
    badge: 'Mejor Mando Calidad/Precio (<30€)',
    description: 'Mando inalámbrico de baja latencia con receptor USB 2.4G incluido, batería recargable de 25 horas, vibración inmersiva y ergonomía optimizada.',
    pros: [
      'Conexión inalámbrica 2.4G ultra estable sin retraso de pulsación',
      'Batería de larga duración de hasta 25 horas con carga rápida USB-C',
      'Gatillos analógicos y cruceta clásica de altísima precisión'
    ],
    idealFor: 'Jugar a FIFA, juegos de coches, plataformas y RPG en PC y Steam Deck.',
    searchQuery: '8bitdo ultimate c 2.4g mando inalambrico pc'
  },
  {
    id: 'game-teclado-logitech-g213',
    asin: '',
    title: 'Logitech G213 Prodigy Teclado Gaming con Teclas Mech-Dome Resistente a Salpicaduras',
    category: 'teclados',
    categoryLabel: 'Teclados Mecánicos',
    brand: 'Logitech G',
    priceText: '54,99 €',
    priceNumeric: 54.99,
    rating: 4.6,
    reviewsCount: 24000,
    imageUrl: '/images/products/game-teclado-logitech-g213-1.jpg',
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
    asin: '',
    title: 'SteelSeries Apex 3 Teclado Gaming RGB con Reposamuñecas Magnético y Resistencia al Agua',
    category: 'teclados',
    categoryLabel: 'Teclados Mecánicos',
    brand: 'SteelSeries',
    priceText: '49,99 €',
    priceNumeric: 49.99,
    rating: 4.6,
    reviewsCount: 16800,
    imageUrl: '/images/products/game-teclado-steelseries-apex-3-1.jpg',
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
    asin: 'B086PKMZ21',
    title: 'Razer BlackShark V2 X Auriculares Gaming Multiplataforma con Drivers TriForce 50mm',
    category: 'auriculares',
    categoryLabel: 'Auriculares & Audio',
    brand: 'Razer',
    priceText: '49,99 €',
    priceNumeric: 49.99,
    rating: 4.5,
    reviewsCount: 38000,
    imageUrl: '/images/products/game-auriculares-razer-blackshark-v2x-1.jpg',
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
    asin: 'B08YDJ6DKN',
    title: 'Corsair K55 RGB PRO Teclado Gaming con 6 Teclas Macro Dedicadas y Software iCUE',
    category: 'teclados',
    categoryLabel: 'Teclados Mecánicos',
    brand: 'Corsair',
    priceText: '64,99 €',
    priceNumeric: 64.99,
    rating: 4.5,
    reviewsCount: 12500,
    imageUrl: '/images/products/game-teclado-corsair-k55-rgb-1.jpg',
    badge: 'Teclas Macro Elgato',
    description: 'Iluminación dinámica RGB de 5 zonas, 6 teclas macro dedicadas integradas con el software Elgato Stream Deck y protección IP42 contra polvo y derrames.',
    pros: [
      '6 teclas macro programables compatibles directamente con Elgato Stream Deck',
      'Teclas silenciosas y muy reactivas con pulsación táctil muy agradable',
      'Software iCUE para sincronizar colores con el resto de componentes Corsair'
    ],
    idealFor: 'Streamers y creadores de contenido que quieren macros al vuelo para sus directos.',
    searchQuery: 'corsair k55 rgb pro teclado gaming macro'
  },
  {
    id: 'game-silla-cojin-lumbar-ergonomico-setup',
    asin: 'B0851B5S3R',
    title: 'Set Cojín Lumbar y Cervical Viscoelástico Ergonómico para Silla Gaming y Setup Pro',
    category: 'sillas',
    categoryLabel: 'Cojines & Confort Setup',
    brand: 'Corsair',
    priceText: '34,99 €',
    priceNumeric: 34.99,
    rating: 4.6,
    reviewsCount: 14200,
    imageUrl: '/images/products/game-auriculares-hyperx-cloud-2-1.jpg',
    badge: 'Ergonomía Maratón 8h+',
    description: 'Espuma viscoelástica de alta densidad con gel refrescante y tejido de malla transpirable 3D diseñado para mantener la postura lumbar y cervical en sesiones largas.',
    pros: [
      'Memoria viscoelástica indeformable con correas ajustables a cualquier silla gaming',
      'Funda transpirable extraíble y lavable a máquina con tacto suave',
      'Alivia la tensión lumbar y cervical en jornadas de gaming y teletrabajo'
    ],
    idealFor: 'Mejorar al instante la comodidad de cualquier silla gaming o de escritorio.',
    searchQuery: 'cojin lumbar cervical viscoelastico silla gaming ergonomico'
  }
];
