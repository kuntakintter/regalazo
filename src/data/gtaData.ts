export interface GtaProduct {
  id: string;
  asin: string;
  title: string;
  category: 'setup' | 'mandos' | 'merch' | 'coleccion' | 'juego';
  categoryLabel: string;
  priceText: string;
  priceNumeric: number;
  rating: number;
  reviewsCount: number;
  imageUrl: string;
  badge: string;
  description: string;
  pros: string[];
  idealFor: string;
  searchQuery: string;
}

export const GTA_CATEGORIES = [
  { id: 'all', label: 'Todo el Catálogo GTA', icon: '🔥' },
  { id: 'juego', label: 'Juegos GTA VI / GTA V & Consolas', icon: '🎮' },
  { id: 'coleccion', label: 'Vinilos BSO, Libros & Coleccionismo', icon: '🏆' },
  { id: 'setup', label: 'Pósters GTA, Neón Vice City & Setup', icon: '💡' },
  { id: 'mandos', label: 'Mandos PS5 & Periféricos', icon: '🕹️' },
  { id: 'merch', label: 'Ropa, Tazas & Llaveros GTA', icon: '👕' },
];

export const GTA_PRICE_RANGES = [
  { id: 'all', label: 'Cualquier presupuesto' },
  { id: '<20', label: 'Menos de 20 €' },
  { id: '20-50', label: 'De 20 € a 50 €' },
  { id: '50-100', label: 'De 50 € a 100 €' },
  { id: '>100', label: 'Más de 100 €' },
];

export const GTA_PRODUCTS: GtaProduct[] = [
  // --- 0. NUEVOS LANZAMIENTOS OFICIALES: GRAND THEFT AUTO VI & GRAND THEFT AUTO V ---
  {
    id: 'gta-6-juego-ps5-fisico',
    asin: 'B0HRFP48X1',
    title: 'Grand Theft Auto VI (GTA 6) — PlayStation 5 Edición Estándar',
    category: 'juego',
    categoryLabel: 'Juegos GTA VI / GTA V & Consolas',
    priceText: '99,90 €',
    priceNumeric: 99.90,
    rating: 4.9,
    reviewsCount: 1420,
    imageUrl: 'https://m.media-amazon.com/images/I/81dPqK1CHeL._AC_UL320_.jpg',
    badge: 'Juego GTA VI PS5',
    description: 'El esperado lanzamiento de Grand Theft Auto VI para PlayStation 5. Recorre Vice City y el estado de Leonida junto a Lucía y Jason en el mundo abierto más ambicioso de Rockstar Games.',
    pros: [
      'Versión para PlayStation 5 con gráficos 4K, trazado de rayos y respuesta háptica DualSense',
      'Explora Vice City y Leonida con el mapa más vivo y detallado jamás creado',
      'Enlace directo verificado en Amazon España con garantía oficial de entrega'
    ],
    idealFor: 'Todo jugador de PlayStation 5 que quiera vivir Grand Theft Auto VI desde el primer minuto.',
    searchQuery: 'PS5 Grand Theft Auto 6'
  },
  {
    id: 'gta-6-standard-edition-xbox-series',
    asin: 'B0HRC1S356',
    title: 'Grand Theft Auto VI Standard Edition | Xbox Series X|S (Código Oficial)',
    category: 'juego',
    categoryLabel: 'Juegos GTA VI / GTA V & Consolas',
    priceText: '79,99 €',
    priceNumeric: 79.99,
    rating: 4.9,
    reviewsCount: 980,
    imageUrl: 'https://m.media-amazon.com/images/I/814V64YpY-L._AC_UL320_.jpg',
    badge: 'GTA VI Xbox Series X|S',
    description: 'Edición Estándar oficial de Grand Theft Auto VI para consolas Xbox Series X y Xbox Series S con código de descarga digital directo.',
    pros: [
      'Optimizado para la arquitectura Velocity de Xbox Series X|S con carga ultrarrápida',
      'Código oficial de descarga digital sin esperas de envío físico',
      'Incluye la campaña completa de Grand Theft Auto VI en Leonida y Vice City'
    ],
    idealFor: 'Jugadores de Xbox Series X y Xbox Series S que prefieren descarga digital directa.',
    searchQuery: 'Grand Theft Auto VI Standard Edition Xbox Series'
  },
  {
    id: 'gta-6-ultimate-edition-xbox-series',
    asin: 'B0HRC564LR',
    title: 'Grand Theft Auto VI Ultimate Edition | Xbox Series X|S (Edición Definitiva)',
    category: 'juego',
    categoryLabel: 'Juegos GTA VI / GTA V & Consolas',
    priceText: '99,99 €',
    priceNumeric: 99.99,
    rating: 4.9,
    reviewsCount: 740,
    imageUrl: 'https://m.media-amazon.com/images/I/81ZPk2qqiwL._AC_UL320_.jpg',
    badge: 'Edición Ultimate GTA VI',
    description: 'La Ultimate Edition de Grand Theft Auto VI para Xbox Series X|S con el juego completo y los contenidos adicionales exclusivos de lanzamiento.',
    pros: [
      'La edición más completa de Grand Theft Auto VI con bonificaciones exclusivas',
      'Compatible con Xbox Series X y Xbox Series S en máxima resolución',
      'Regalo estrella para los fans más exigentes de la saga Rockstar'
    ],
    idealFor: 'Regalar la edición definitiva y más completa de GTA VI.',
    searchQuery: 'Grand Theft Auto VI Ultimate Edition Xbox Series'
  },
  {
    id: 'gta-6-vinilo-the-album-exclusivo-amazon',
    asin: 'B0HJT4Z5RB',
    title: 'Grand Theft Auto VI: The Album (2 LP Vinilo Rosa y Morado · Exclusivo Amazon)',
    category: 'coleccion',
    categoryLabel: 'Vinilos BSO, Libros & Coleccionismo',
    priceText: '47,99 €',
    priceNumeric: 47.99,
    rating: 4.9,
    reviewsCount: 620,
    imageUrl: 'https://m.media-amazon.com/images/I/81MQdBbd3rL._AC_UL320_.jpg',
    badge: 'Vinilo Exclusivo Amazon',
    description: 'Edición exclusiva de Amazon en doble disco de vinilo (2 LP) a todo color rosa neón y morado Vice City con los temas oficiales de Grand Theft Auto VI.',
    pros: [
      'Doble vinilo prensado en colores rosa y morado exclusivos de Amazon',
      'Carpeta desplegable de coleccionista con arte oficial de Vice City y Leonida',
      'Pieza musical y decorativa de edición limitada para fans de GTA'
    ],
    idealFor: 'Coleccionistas y amantes de la banda sonora de las radios de Vice City.',
    searchQuery: 'Grand Theft Auto VI The Album 2 LP Vinilo'
  },
  {
    id: 'gta-6-vinilo-original-score',
    asin: 'B0HPL85XWH',
    title: 'Grand Theft Auto VI: Original Score (Edición Oficial en Vinilo LP)',
    category: 'coleccion',
    categoryLabel: 'Vinilos BSO, Libros & Coleccionismo',
    priceText: '45,99 €',
    priceNumeric: 45.99,
    rating: 4.8,
    reviewsCount: 410,
    imageUrl: 'https://m.media-amazon.com/images/I/71gzrgH5-VL._AC_UL320_.jpg',
    badge: 'Banda Sonora Oficial',
    description: 'La música instrumental y composiciones originales (Original Score) de Grand Theft Auto VI editadas en formato vinilo de alta fidelidad.',
    pros: [
      'Prensado audiófilo con las composiciones cinematográficas de las misiones de GTA VI',
      'Portada oficial de colección ideal para exponer en estantería o setup',
      'Complemento perfecto del álbum de emisoras de radio de Vice City'
    ],
    idealFor: 'Amantes del vinilo y coleccionistas del universo Grand Theft Auto.',
    searchQuery: 'Grand Theft Auto VI Original Score Vinilo'
  },
  {
    id: 'gta-6-pack-coleccionista-ps5-poster-skinkura',
    asin: 'B0HSC5G9TG',
    title: 'Grand Theft Auto VI (GTA 6) Pack PS5 + Póster Doble Cara (91×66 cm) + Panel LED',
    category: 'juego',
    categoryLabel: 'Juegos GTA VI / GTA V & Consolas',
    priceText: '195,95 €',
    priceNumeric: 195.95,
    rating: 4.8,
    reviewsCount: 290,
    imageUrl: 'https://m.media-amazon.com/images/I/61nZ0FjVp0L._AC_UL320_.jpg',
    badge: 'Pack Gigante PS5',
    description: 'Pack especial de lanzamiento para PlayStation 5 que incluye Grand Theft Auto VI (Code in a Box), póster gigante de doble cara de 91 × 66 cm y panel calefactor gaming con pantalla LED.',
    pros: [
      'Incluye póster gigante oficial de doble cara (91 x 66 cm) del mapa y arte de GTA VI',
      'Juego para PlayStation 5 acompañado de equipamiento para tu habitación gamer',
      'Edición pack de regalo muy llamativa para sorprender a lo grande'
    ],
    idealFor: 'Quienes buscan un pack de regalo de GTA VI completo y fuera de lo común.',
    searchQuery: 'Grand Theft Auto VI GTA 6 Juego PS5 Poster Doble Cara'
  },
  {
    id: 'gta-6-guia-trucos-secretos-espanol',
    asin: 'B0HSBSV7JV',
    title: 'Trucos, Secretos y Estrategias: Guía en Español para Jugadores de Grand Theft Auto VI',
    category: 'coleccion',
    categoryLabel: 'Vinilos BSO, Libros & Coleccionismo',
    priceText: '14,55 €',
    priceNumeric: 14.55,
    rating: 4.7,
    reviewsCount: 340,
    imageUrl: 'https://m.media-amazon.com/images/I/71BeUOuzgvL._AC_UL320_.jpg',
    badge: 'Guía en Español',
    description: 'Manual práctico en español con rutas, secretos ocultos de Leonida, consejos para golpes, vehículos especiales y estrategias para dominar Grand Theft Auto VI.',
    pros: [
      'Íntegramente en español con tácticas para ganar dinero rápido y completar el 100%',
      'Precio económico por debajo de 15 € ideal para acompañar el juego',
      'Perfecto para descubrir todos los huevos de pascua de Vice City'
    ],
    idealFor: 'Exprimir al 100% cada rincón, misión secundaria y secreto del mapa de GTA VI.',
    searchQuery: 'Trucos secretos y estrategias Guia Grand Theft Auto VI'
  },
  {
    id: 'gta-6-foto-a4-enmarcada-firmada',
    asin: 'B0HN5Q2F7X',
    title: 'Grand Theft Auto VI Cuadro Foto A4 Enmarcada con Autógrafos Impresos',
    category: 'setup',
    categoryLabel: 'Pósters GTA, Neón Vice City & Setup',
    priceText: '31,99 €',
    priceNumeric: 31.99,
    rating: 4.8,
    reviewsCount: 280,
    imageUrl: 'https://m.media-amazon.com/images/I/81JI0gL1QuL._AC_UL320_.jpg',
    badge: 'Enmarcado A4 GTA VI',
    description: 'Presentación enmarcada tamaño A4 con fotografía oficial de Grand Theft Auto VI, placa de aspecto metálico y firmas impresas lista para colgar o apoyar.',
    pros: [
      'Marco de policarbonato negro cepillado listo para colgar nada más abrir la caja',
      'Tamaño A4 versátil para colocar sobre el escritorio o junto al monitor',
      'Excelente acabado de regalo para fans de Rockstar Games'
    ],
    idealFor: 'Decorar escritorios gaming compactos con el arte oficial de GTA VI.',
    searchQuery: 'Grand Theft Auto VI Autografo Firmado Foto A4 Enmarcada'
  },
  {
    id: 'gta-6-llavero-logo-oficial',
    asin: 'B0HS8S9FK9',
    title: 'Llavero Coleccionable Logo Oficial GTA 6 / Grand Theft Auto VI Vice City',
    category: 'merch',
    categoryLabel: 'Ropa, Tazas & Llaveros GTA',
    priceText: '6,00 €',
    priceNumeric: 6.00,
    rating: 4.7,
    reviewsCount: 195,
    imageUrl: 'https://m.media-amazon.com/images/I/6103pOZH35L._AC_UL320_.jpg',
    badge: 'Detalle GTA VI (6 €)',
    description: 'Llavero con el logotipo oficial de GTA VI en colores degradados Vice City y anilla metálica reforzada para llaves, mochila o funda de mando.',
    pros: [
      'El detalle más barato y original de Grand Theft Auto VI por solo 6 €',
      'Colores vibrantes fieles al emblema oficial de Vice City',
      'Ligero, resistente y perfecto para amigo invisible gamer'
    ],
    idealFor: 'Un detalle económico de GTA VI para llevar siempre encima.',
    searchQuery: 'Llavero para GTA 6 Logo'
  },

  // --- EDICIONES Y COLECCIONISMO OFICIAL DE GRAND THEFT AUTO V (GTA 5) ---
  {
    id: 'gta-v-xbox-series-x-rockstar',
    asin: 'B09Y369ZMD',
    title: 'Rockstar Grand Theft Auto V (GTA 5) — Edición Oficial Xbox Series X',
    category: 'juego',
    categoryLabel: 'Juegos GTA VI / GTA V & Consolas',
    priceText: '27,48 €',
    priceNumeric: 27.48,
    rating: 4.8,
    reviewsCount: 9400,
    imageUrl: 'https://m.media-amazon.com/images/I/71JgDYhxInL._AC_UL320_.jpg',
    badge: 'GTA V Xbox Series X',
    description: 'Edición física remasterizada de Grand Theft Auto V para Xbox Series X con resolución 4K hasta 60 FPS, mejoras visuales, tráfico denso y acceso a GTA Online.',
    pros: [
      'Versión de nueva generación con trazado de rayos e iluminación mejorada',
      'Incluye tanto el Modo Historia de Grand Theft Auto V como GTA Online',
      'Carga ultrarrápida y transferencia de progreso de personaje'
    ],
    idealFor: 'Disfrutar de Los Santos al máximo nivel gráfico en Xbox Series X.',
    searchQuery: 'Rockstar Grand Theft Auto V GTA 5 Xbox Series X'
  },
  {
    id: 'gta-v-premium-edition-oficial',
    asin: 'B07CPB2PRC',
    title: 'Grand Theft Auto V: Premium Edition (Juego Completo + Pack Criminal Enterprise)',
    category: 'juego',
    categoryLabel: 'Juegos GTA VI / GTA V & Consolas',
    priceText: '23,94 €',
    priceNumeric: 23.94,
    rating: 4.8,
    reviewsCount: 24600,
    imageUrl: 'https://m.media-amazon.com/images/I/81Ow0EK3azL._AC_UL320_.jpg',
    badge: 'GTA V Premium Edition',
    description: 'La edición Premium de Grand Theft Auto V que incluye la historia completa, Grand Theft Auto Online y el Criminal Enterprise Starter Pack con propiedades, vehículos, armas y 1.000.000 GTA$.',
    pros: [
      'Incluye 1.000.000 GTA$ de bonificación y propiedades valoradas en más de 10.000.000 GTA$',
      'Flota de superdeportivos, helicóptero, búnker y oficina ejecutiva desde el inicio',
      'Uno de los videojuegos mejor valorados de la historia con más de 24.000 reseñas'
    ],
    idealFor: 'Empezar en GTA Online con un imperio completo y un millón en el banco.',
    searchQuery: 'Grand Theft Auto V Premium Edition'
  },
  {
    id: 'gta-v-poster-hwc-a3-enmarcado',
    asin: 'B0HN53Y1KC',
    title: 'HWC Trading Grand Theft Auto V Póster de Videojuego Enmarcado A3 Impreso',
    category: 'setup',
    categoryLabel: 'Pósters GTA, Neón Vice City & Setup',
    priceText: '39,99 €',
    priceNumeric: 39.99,
    rating: 4.9,
    reviewsCount: 530,
    imageUrl: 'https://m.media-amazon.com/images/I/7109oTV3EGL._AC_UL320_.jpg',
    badge: 'Póster A3 GTA V',
    description: 'Cuadro coleccionable tamaño A3 enmarcado con el icónico arte de Michael, Franklin y Trevor de Grand Theft Auto V y reproducción de los autógrafos del reparto.',
    pros: [
      'Formato grande A3 (445 x 330 mm) con marco negro mate y passepartout de precisión',
      'Frontal de perspex de alta claridad resistente a golpes',
      'Hace pareja perfecta en la pared con el cuadro A3 de Grand Theft Auto VI'
    ],
    idealFor: 'Homenajear a los tres protagonistas legendarios de Grand Theft Auto V.',
    searchQuery: 'HWC Trading Grand Theft Auto V Poster Enmarcado A3'
  },
  {
    id: 'gta-v-libro-vida-gangster-virtual',
    asin: '8410572605',
    title: 'Libro Grand Theft Auto V: Vida de Gangster Virtual (Colección Videojuegos Legendarios)',
    category: 'coleccion',
    categoryLabel: 'Vinilos BSO, Libros & Coleccionismo',
    priceText: '9,99 €',
    priceNumeric: 9.99,
    rating: 4.8,
    reviewsCount: 410,
    imageUrl: 'https://m.media-amazon.com/images/I/51bIXSAepNL._AC_UL320_.jpg',
    badge: 'Libro en Español (9,99 €)',
    description: 'Volumen ilustrado en tapa dura en español dedicado íntegramente a Grand Theft Auto V: cómo se creó Los Santos, secretos del desarrollo de Rockstar y análisis de sus protagonistas.',
    pros: [
      'Edición española de coleccionista de la serie Videojuegos Legendarios',
      'Precio imbatible de solo 9,99 € para un libro de regalo gamer',
      'Repleto de curiosidades, historia del desarrollo y claves de diseño de GTA V'
    ],
    idealFor: 'Fans de Grand Theft Auto V que quieren conocer todos los secretos detrás de Los Santos.',
    searchQuery: 'Grand Theft Auto V Vida de gangster virtual libro'
  },
  {
    id: 'gta-pack-2-libros-coleccion-videojuegos',
    asin: 'B0HR9N5TFC',
    title: 'Pack 2 Libros GTA: Grand Theft Auto Acción Urbana + Grand Theft Auto V (Español)',
    category: 'coleccion',
    categoryLabel: 'Vinilos BSO, Libros & Coleccionismo',
    priceText: '19,95 €',
    priceNumeric: 19.95,
    rating: 4.9,
    reviewsCount: 320,
    imageUrl: 'https://m.media-amazon.com/images/I/61BxTEUBisL._AC_UL320_.jpg',
    badge: 'Pack 2 Libros GTA',
    description: 'Estuche con los 2 volúmenes oficiales en español de la colección Videojuegos Legendarios dedicados a la saga: "Grand Theft Auto: Acción urbana al límite" y "Grand Theft Auto V: Vida de gangster virtual".',
    pros: [
      'Incluye los 2 libros completos en español por menos de 20 €',
      'Repasa toda la evolución de la franquicia desde el primer GTA hasta GTA V y VI',
      'Presentación impecable para regalar a cualquier apasionado de los videojuegos'
    ],
    idealFor: 'Tener la biblioteca completa en español sobre la historia de Grand Theft Auto.',
    searchQuery: 'Pack IV GTA Coleccion Videojuegos Grand Theft Auto V'
  },
  {
    id: 'gta-coleccion-8-posters-enmarcados-hwc',
    asin: 'B0HN71BWFQ',
    title: 'HWC Trading Colección Completa GTA (Pack 8 Pósters de Videojuegos Enmarcados)',
    category: 'setup',
    categoryLabel: 'Pósters GTA, Neón Vice City & Setup',
    priceText: '140,99 €',
    priceNumeric: 140.99,
    rating: 4.9,
    reviewsCount: 215,
    imageUrl: 'https://m.media-amazon.com/images/I/81tum65p5EL._AC_UL320_.jpg',
    badge: 'Mural Completo 8 Cuadros',
    description: 'La colección mural definitiva para un cuarto gamer: lote de 8 cuadros enmarcados y firmados que recorren las entregas más míticas de Grand Theft Auto (incluyendo Vice City, San Andreas, GTA V y GTA VI).',
    pros: [
      '8 cuadros individuales enmarcados listos para crear un mural completo en tu setup',
      'Calidad de galería fotográfica con monturas biseladas negras',
      'El regalo de coleccionismo más espectacular para fans incondicionales de GTA'
    ],
    idealFor: 'Transformar toda la pared de tu habitación gamer en un museo oficial de GTA.',
    searchQuery: 'HWC Trading Coleccion GTA x8 Posters Enmarcados'
  },

  // --- 1. SETUP & NEÓN VICE CITY ---
  {
    id: 'gta-poster-hwc-gta-6-a4',
    asin: 'B0HN5CL4PJ',
    title: 'HWC Trading Grand Theft Auto VI Póster Enmarcado A3 Impreso',
    category: 'setup',
    categoryLabel: 'Neón Vice City & Setup',
    priceText: '39,99 €',
    priceNumeric: 39.99,
    rating: 4.8,
    reviewsCount: 310,
    imageUrl: 'https://m.media-amazon.com/images/I/716GcEOeCfL._AC_UL320_.jpg',
    badge: 'Póster Exclusivo A3',
    description: 'Cuadro enmarcado de alta calidad con el arte promocional oficial de GTA VI (Lucia y Jason) y firmas serigrafiadas con acabado prémium listo para colgar.',
    pros: [
      'Marco negro A3 de alta durabilidad con frontal transparente de seguridad',
      'Acabado fotográfico nítido y firmas serigrafiadas de coleccionista',
      'El elemento de decoración de pared definitivo para la llegada de GTA 6'
    ],
    idealFor: 'Presidir la pared principal de tu setup gamer o zona de ocio.',
    searchQuery: 'HWC Trading Grand Theft Auto VI Poster'
  },
  {
    id: 'gta-poster-hwc-vice-city-a4',
    asin: 'B0HN5945ZW',
    title: 'HWC Trading Grand Theft Auto Vice City Póster Enmarcado Impreso',
    category: 'setup',
    categoryLabel: 'Neón Vice City & Setup',
    priceText: '39,99 €',
    priceNumeric: 39.99,
    rating: 4.9,
    reviewsCount: 420,
    imageUrl: 'https://m.media-amazon.com/images/I/71VuKLQJh-L._AC_UL320_.jpg',
    badge: 'Clásico Vice City',
    description: 'El legendario cartel artístico de Grand Theft Auto: Vice City con Tommy Vercetti, montado en passepartout biselado y marco prémium.',
    pros: [
      'Homenaje nostálgico al juego que inmortalizó los años 80 y Vice City',
      'Montaje artesanal con passepartout negro mate de precisión',
      'Regalo perfecto para veteranos y amantes de la saga'
    ],
    idealFor: 'Aportar el auténtico toque retro 80s y Vice City a cualquier habitación.',
    searchQuery: 'HWC Trading Grand Theft Auto Vice City Poster'
  },
  {
    id: 'gta-neon-palmera-horseneon',
    asin: 'B0DK35J2QJ',
    title: 'Horseneon Lámpara de Neón LED Palmera Tropical Regulable USB',
    category: 'setup',
    categoryLabel: 'Neón Vice City & Setup',
    priceText: '36,99 €',
    priceNumeric: 36.99,
    rating: 4.7,
    reviewsCount: 890,
    imageUrl: 'https://m.media-amazon.com/images/I/81-wNSiuGLL._AC_UL320_.jpg',
    badge: 'Neón Palmera Vice City',
    description: 'Cartel de neón LED con silueta de palmera de coco tropical en verde y cálido. Alimentación USB de 5V y regulador de intensidad incorporado.',
    pros: [
      'Interruptor con dimmer para graduar la intensidad según la hora',
      'Tubos de silicona flexible de bajo voltaje que no se calientan',
      'Orificios integrados para montaje rápido en pared'
    ],
    idealFor: 'Recrear el bulevar de Ocean Beach y Vice City en tu habitación gamer.',
    searchQuery: 'Horseneon palmera neon led habitacion'
  },
  {
    id: 'gta-lampara-sunset-atardecer',
    asin: 'B09P8HS8CK',
    title: 'Sunset Lamp Lámpara de Atardecer LED USB con Rotación 360°',
    category: 'setup',
    categoryLabel: 'Neón Vice City & Setup',
    priceText: '18,99 €',
    priceNumeric: 18.99,
    rating: 4.6,
    reviewsCount: 5240,
    imageUrl: 'https://m.media-amazon.com/images/I/71rvaM4taDL._AC_UL320_.jpg',
    badge: 'Efecto Atardecer',
    description: 'Proyector óptico de cristal que proyecta una puesta de sol cálida y degradada en tonos rojizos, dorados y púrpuras, calcando los atardeceres de Vice City.',
    pros: [
      'Lente óptica de cristal engrosado con proyección amplia y nítida',
      'Cabezal giratorio 360° para apuntar a paredes, techos o esquinas',
      'Crea un fondo cinematográfico inigualable para directos y streaming'
    ],
    idealFor: 'Conseguir el halo de luz dorado del atardecer de Miami en tu escritorio.',
    searchQuery: 'sunset lamp lampara atardecer usb'
  },
  {
    id: 'gta-tira-led-govee-rgbic-pro',
    asin: 'B09BN2PSR8',
    title: 'Govee Tira LED 5M RGBIC Pro Wi-Fi Inteligente Segmentada',
    category: 'setup',
    categoryLabel: 'Neón Vice City & Setup',
    priceText: '39,99 €',
    priceNumeric: 39.99,
    rating: 4.7,
    reviewsCount: 31200,
    imageUrl: 'https://m.media-amazon.com/images/I/71uLCh8j8ML._AC_UL320_.jpg',
    badge: 'RGBIC Inteligente',
    description: 'Tira de luz LED RGBIC avanzada capaz de emitir varios colores simultáneos en una misma línea. Compatible con Alexa, Google Assistant y app móvil.',
    pros: [
      'Control independiente de segmentos para combinar fucsia neón, cian y lila',
      'Sincronización rítmica con el audio de tus partidas y música',
      'Revestimiento protector de alta duración y adhesivo 3M extra fuerte'
    ],
    idealFor: 'La iluminación ambiental sincronizada detrás del monitor o la mesa.',
    searchQuery: 'Govee tira led 5m rgbic pro wifi'
  },
  {
    id: 'gta-alfombrilla-jialong-synthwave-xxl',
    asin: 'B0FBKKL88D',
    title: 'Alfombrilla Gaming XXL 750x400 mm Neón Retro Synthwave',
    category: 'setup',
    categoryLabel: 'Neón Vice City & Setup',
    priceText: '25,77 €',
    priceNumeric: 25.77,
    rating: 4.7,
    reviewsCount: 2310,
    imageUrl: 'https://m.media-amazon.com/images/I/71-YEIIU6gL._AC_UL320_.jpg',
    badge: 'Superficie XXL',
    description: 'Alfombrilla extendida de 750 x 400 x 3 mm con diseño de neón retro Synthwave. Base antideslizante y bordes cosidos para juegos y oficina.',
    pros: [
      'Superficie microtexturizada de baja fricción para deslizamiento suave',
      'Costura perimetral reforzada antideshilachado de alta resistencia',
      'Base de goma antideslizante pensada para escritorio y juegos'
    ],
    idealFor: 'Cubrir teclado y ratón con el look retro Vice City definitivo.',
    searchQuery: 'alfombrilla raton neon retro synthwave xxl'
  },

  // --- 2. MANDOS PS5 & PERIFÉRICOS ---
  {
    id: 'gta-mando-ps5-nova-pink',
    asin: 'B09NLFPD4Q',
    title: 'PlayStation 5 - Mando Inalámbrico DualSense Oficial Nova Pink',
    category: 'mandos',
    categoryLabel: 'Mandos PS5 & Periféricos',
    priceText: '71,99 €',
    priceNumeric: 71.99,
    rating: 4.8,
    reviewsCount: 19800,
    imageUrl: 'https://m.media-amazon.com/images/I/51x3HCGz3UL._AC_UL320_.jpg',
    badge: 'Color Vice City Oficial',
    description: 'Mando oficial Sony DualSense para PS5 en color Nova Pink, el fucsia neón emblemático del logo de Vice City y GTA VI. Incluye gatillos adaptativos.',
    pros: [
      'Retroalimentación háptica inmersiva que siente cada derrape y disparo',
      'Gatillos adaptativos dinámicos con resistencia física programable',
      'Micrófono integrado, altavoz y conector jack 3.5 mm'
    ],
    idealFor: 'El mando imprescindible para jugar a GTA VI en PlayStation 5 con estilo.',
    searchQuery: 'mando dualsense ps5 nova pink oficial'
  },
  {
    id: 'gta-mando-ps5-galactic-purple',
    asin: 'B09NLJCVGB',
    title: 'PlayStation 5 - Mando Inalámbrico DualSense Oficial Galactic Purple',
    category: 'mandos',
    categoryLabel: 'Mandos PS5 & Periféricos',
    priceText: '73,99 €',
    priceNumeric: 73.99,
    rating: 4.8,
    reviewsCount: 14500,
    imageUrl: 'https://m.media-amazon.com/images/I/51uPppmAZXL._AC_UL320_.jpg',
    badge: 'Púrpura Galáctico',
    description: 'Mando oficial Sony DualSense Galactic Purple en morado eléctrico intenso. Combina con la paleta de colores de GTA VI y ofrece máxima precisión.',
    pros: [
      'Acabado morado prémium oficial de la colección Galaxy de PlayStation',
      'Sensor de movimiento y panel táctil multipunto de alta sensibilidad',
      'Batería recargable integrada mediante puerto USB Tipo-C'
    ],
    idealFor: 'Hacer el dúo perfecto de mandos (Rosa y Morado) para dos jugadores.',
    searchQuery: 'mando dualsense ps5 galactic purple oficial'
  },
  {
    id: 'gta-auriculares-sony-pulse-3d',
    asin: 'B0C7KDM9H2',
    title: 'PlayStation - Auriculares Inalámbricos Pulse 3D Oficiales PS5',
    category: 'mandos',
    categoryLabel: 'Mandos PS5 & Periféricos',
    priceText: '89,99 €',
    priceNumeric: 89.99,
    rating: 4.6,
    reviewsCount: 22400,
    imageUrl: 'https://m.media-amazon.com/images/I/61KxObgMI5L._AC_UL320_.jpg',
    badge: 'Audio 3D Oficial',
    description: 'Auriculares inalámbricos optimizados para el motor de audio 3D Tempest de PS5. Escucha sirenas, persecuciones y las radios de Vice City con sonido envolvente.',
    pros: [
      'Afinados específicamente para el audio espacial 3D inmersivo de PS5',
      'Doble micrófono integrado con cancelación activa de ruido ambiente',
      'Hasta 12 horas de juego inalámbrico con almohadillas acolchadas de confort'
    ],
    idealFor: 'Escuchar cada detalle del mundo abierto y las emisoras de radio de Vice City.',
    searchQuery: 'auriculares pulse 3d ps5 sony oficiales'
  },
  {
    id: 'gta-funda-silicona-playvital-neon',
    asin: 'B08M3WY4RV',
    title: 'PlayVital Funda de Silicona Antideslizante para Mando PS5',
    category: 'mandos',
    categoryLabel: 'Mandos PS5 & Periféricos',
    priceText: '13,99 €',
    priceNumeric: 13.99,
    rating: 4.6,
    reviewsCount: 1850,
    imageUrl: 'https://m.media-amazon.com/images/I/71TdCZ6VENL._AC_UL320_.jpg',
    badge: 'Grip Antideslizante',
    description: 'Funda protectora ergonómica de silicona suave para el mando DualSense de PS5. Mejora el agarre y protege frente a golpes, arañazos y sudor.',
    pros: [
      'Textura antideslizante que previene resbalones en partidas intensas',
      'Cortes de precisión para todos los botones, puertos y altavoz',
      'Silicona flexible ligera y fácil de colocar o retirar'
    ],
    idealFor: 'Personalizar y proteger tu mando actual de PS5 por poco dinero.',
    searchQuery: 'PlayVital funda silicona mando ps5'
  },
  {
    id: 'gta-volante-logitech-g29',
    asin: 'B00YUIM2J0',
    title: 'Logitech G G29 Driving Force Volante de Carreras con Pedales PS5/PC',
    category: 'mandos',
    categoryLabel: 'Mandos PS5 & Periféricos',
    priceText: '209,99 €',
    priceNumeric: 209.99,
    rating: 4.7,
    reviewsCount: 48900,
    imageUrl: 'https://m.media-amazon.com/images/I/61wBV8pnsFL._AC_UL320_.jpg',
    badge: 'Conducción Real',
    description: 'El volante de carreras más aclamado con Force Feedback de dos motores, giro de 900 grados, forrado en cuero cosido a mano y unidad de pedales de acero inoxidable.',
    pros: [
      'Force Feedback con engranajes helicoidales antirretroceso ultrarrealistas',
      'Pedal de freno no lineal que reproduce el comportamiento de frenada real',
      'Compatible con PS5, PS4 y PC para una inmersión automovilística total'
    ],
    idealFor: 'Conducir los superdeportivos y lanchas por los bulevares de Vice City.',
    searchQuery: 'Logitech G G29 Driving Force volante pedales ps5'
  },
  {
    id: 'gta-soporte-base-carga-rgb-ps5',
    asin: 'B0FDY36ZGB',
    title: 'Soporte Vertical Base PS5 con Carga Rápida Dual de Mandos e Iluminación RGB',
    category: 'mandos',
    categoryLabel: 'Mandos PS5 & Periféricos',
    priceText: '32,89 €',
    priceNumeric: 32.89,
    rating: 4.7,
    reviewsCount: 960,
    imageUrl: 'https://m.media-amazon.com/images/I/814af3TYQoL._AC_UL320_.jpg',
    badge: 'Estación de Carga RGB',
    description: 'Base vertical multifuncional con ventiladores de disipación silenciosos, estación de carga rápida simultánea para 2 mandos DualSense y efectos de luz RGB.',
    pros: [
      'Carga 2 mandos simultáneamente en menos de 3 horas con indicadores LED',
      'Iluminación RGB periférica con múltiples modos estéticos seleccionables',
      'Compatible con consolas PS5 estándar y PS5 Slim (con o sin lector)'
    ],
    idealFor: 'Mantener la consola refrigerada y los mandos siempre listos para jugar.',
    searchQuery: 'soporte vertical ps5 base carga mandos rgb'
  },

  // --- 3. ROPA & MERCH RETRO GTA ---
  {
    id: 'gta-camiseta-oficial-wanted',
    asin: 'B07B296947',
    title: 'Camiseta Oficial Videojuego GTA Wanted Negra 100% Algodón',
    category: 'merch',
    categoryLabel: 'Ropa & Camisetas Retro',
    priceText: '19,99 €',
    priceNumeric: 19.99,
    rating: 4.5,
    reviewsCount: 650,
    imageUrl: 'https://m.media-amazon.com/images/I/51xAXdpMypL._AC_UL320_.jpg',
    badge: '100% Algodón',
    description: 'Camiseta de corte regular para hombre y mujer en tejido 100% algodón hilado en anillo con el mítico diseño de estrellas de búsqueda policial de GTA.',
    pros: [
      'Tejido de algodón suave, transpirable y resistente a múltiples lavados',
      'Estampado frontal de alta definición que no se agrieta ni pierde color',
      'Cuello redondo acanalado con doble costura para máxima durabilidad'
    ],
    idealFor: 'Llevar el estilo gamer urbano más reconocible del mundo a diario.',
    searchQuery: 'camiseta grand theft auto wanted negra hombre'
  },
  {
    id: 'gta-sudadera-urbana-capucha',
    asin: 'B0H9SPL595',
    title: 'Sudadera con Capucha Estilo Videojuego Urbano GTA con Bolsillo Canguro',
    category: 'merch',
    categoryLabel: 'Ropa & Camisetas Retro',
    priceText: '31,99 €',
    priceNumeric: 31.99,
    rating: 4.6,
    reviewsCount: 410,
    imageUrl: 'https://m.media-amazon.com/images/I/711kLzcOsyL._AC_UL320_.jpg',
    badge: 'Sudadera Urbana',
    description: 'Sudadera hoodie con interior afelpado cálido, capucha ajustable con cordones y bolsillo frontal tipo canguro inspirada en el streetwear de Florida.',
    pros: [
      'Interior de forro polar cepillado muy suave y protector contra el frío',
      'Corte relajado unisex moderno que combina con vaqueros o jogger',
      'Puños y dobladillo inferior elásticos acanalados'
    ],
    idealFor: 'Estar cómodo en el sofá durante largas sesiones de juego en invierno.',
    searchQuery: 'sudadera con capucha grand theft auto urbana'
  },
  {
    id: 'gta-gorra-securoserv-snapback',
    asin: 'B0C4TM7MD8',
    title: 'Gorra de Béisbol SecuroServ GTA Estilo Urbano Hip Hop Ajustable',
    category: 'merch',
    categoryLabel: 'Ropa & Camisetas Retro',
    priceText: '19,99 €',
    priceNumeric: 19.99,
    rating: 4.6,
    reviewsCount: 380,
    imageUrl: 'https://m.media-amazon.com/images/I/71+ma7afKnL._AC_UL320_.jpg',
    badge: 'Gorra Snapback',
    description: 'Gorra clásica de 6 paneles con visera rígida curvada, paneles transpirables y cierre trasero ajustable snapback inspirada en SecuroServ de GTA.',
    pros: [
      'Bordado frontal en relieve 3D de alta densidad con hilo reforzado',
      'Cierre trasero adaptable a cualquier tamaño de cabeza cómodamente',
      'Tejido de sarga de algodón resistente al sol y al desgaste diario'
    ],
    idealFor: 'Complementar cualquier outfit urbano o regalar a un fan del juego.',
    searchQuery: 'gorra snapback grand theft auto securoserv'
  },
  {
    id: 'gta-taza-ceramica-franklin',
    asin: 'B09P47YKKJ',
    title: 'Taza de Cerámica Oficial GTA Franklin & Los Santos 330 ml',
    category: 'merch',
    categoryLabel: 'Ropa & Camisetas Retro',
    priceText: '11,95 €',
    priceNumeric: 11.95,
    rating: 4.8,
    reviewsCount: 1670,
    imageUrl: 'https://m.media-amazon.com/images/I/716yaNzsS5L._AC_UL320_.jpg',
    badge: 'Taza Oficial',
    description: 'Taza de cerámica de primera calidad con licencia oficial con ilustración artística de Franklin y Chop de Grand Theft Auto en acabado esmaltado brillante.',
    pros: [
      'Apta para microondas y lavavajillas sin perder brillo ni nitidez',
      'Capacidad ideal de 330 ml para café matutino, té o bebidas calientes',
      'Se entrega en caja protectora oficial ideal para regalo'
    ],
    idealFor: 'El café antes de empezar a jugar o como portalápices gamer en el escritorio.',
    searchQuery: 'taza ceramica oficial grand theft auto v'
  },
  {
    id: 'gta-llavero-metalico-pyramid',
    asin: 'B08LN4W6GQ',
    title: 'Llavero Metálico Oficial Pyramid International Grand Theft Auto V',
    category: 'merch',
    categoryLabel: 'Ropa & Camisetas Retro',
    priceText: '5,25 €',
    priceNumeric: 5.25,
    rating: 4.7,
    reviewsCount: 2190,
    imageUrl: 'https://m.media-amazon.com/images/I/51gLddvuvrL._AC_UL320_.jpg',
    badge: 'Detalle Top Ventas',
    description: 'Llavero de aleación metálica maciza esmaltada con el emblemático logo romano V de GTA. Incluye argolla reforzada y cadena para llaves o mochila.',
    pros: [
      'Construcción de aleación metálica maciza fundida de alta resistencia',
      'Esmalte brillante verde y blanco fiel al logotipo original',
      'El regalo o detalle económico perfecto para acompañar cualquier compra'
    ],
    idealFor: 'Llevar las llaves del coche o de casa con el sello oficial de GTA.',
    searchQuery: 'llavero metalico oficial grand theft auto v pyramid'
  },

  // --- 4. COLECCIONISMO & SOPORTES ---
  {
    id: 'gta-coche-bburago-countach-124',
    asin: 'B0CJJHRRN6',
    title: 'Bburago Model Kit 1:24 Coche Clásico Ochentero Lamborghini Countach',
    category: 'coleccion',
    categoryLabel: 'Coleccionismo & Soportes',
    priceText: '22,99 €',
    priceNumeric: 22.99,
    rating: 4.6,
    reviewsCount: 1340,
    imageUrl: 'https://m.media-amazon.com/images/I/71eNIM3kUxL._AC_UL320_.jpg',
    badge: 'Icono Ochentero',
    description: 'Maqueta de metal die-cast a escala 1:24 del icónico deportivo de los años 80 con puertas de tijera abatibles, el modelo que inspiró los bólidos de Vice City.',
    pros: [
      'Carrocería de metal moldeado a presión con detalles en plástico inyectado',
      'Puertas de ala de gaviota y capó abatibles con interior detallado',
      'La pieza nostálgica de coleccionismo por excelencia junto a tu pantalla'
    ],
    idealFor: 'Decorar la estantería o mesa con el coche más emblemático de Vice City.',
    searchQuery: 'Bburago escala 1 24 lamborghini countach metal'
  },
  {
    id: 'gta-soporte-mando-cableguys',
    asin: 'B08751LKZT',
    title: 'Cableguys Soporte para Mandos de Consola y Smartphones Coleccionable',
    category: 'coleccion',
    categoryLabel: 'Coleccionismo & Soportes',
    priceText: '23,56 €',
    priceNumeric: 23.56,
    rating: 4.8,
    reviewsCount: 7890,
    imageUrl: 'https://m.media-amazon.com/images/I/71eXX-tMEFL._AC_UL320_.jpg',
    badge: 'Soporte Coleccionista',
    description: 'Figura coleccionable oficial Cableguys de 20 cm con base pesada de estabilidad. Sostiene con sus manos el mando de PS5, Xbox o cualquier smartphone.',
    pros: [
      'Compatible con mandos DualSense de PS5, mandos Xbox y todos los móviles',
      'Construcción de resina maciza de alta densidad que no vuelca',
      'Mantiene tu mando ordenado y expuesto de forma épica en el escritorio'
    ],
    idealFor: 'Descansar tu mando de PS5 favorito cuando no estés en plena partida.',
    searchQuery: 'Cableguys soporte para mando y movil'
  },

  // --- 5. JUEGOS, SALDO & CONSOLAS ---
  {
    id: 'gta-juego-gta-v-ps5',
    asin: 'B09X5TX9CN',
    title: 'Grand Theft Auto V (PS5) — Versión Oficial PlayStation 5 4K 60 FPS',
    category: 'juego',
    categoryLabel: 'Juegos GTA VI / GTA V & Consolas',
    priceText: '18,99 €',
    priceNumeric: 18.99,
    rating: 4.8,
    reviewsCount: 16500,
    imageUrl: 'https://m.media-amazon.com/images/I/717n2jHZ7pL._AC_UL320_.jpg',
    badge: 'Bestseller GTA V PS5',
    description: 'Edición oficial física para PlayStation 5 con resolución 4K nativa, 60 fotogramas por segundo, trazado de rayos (ray tracing) y aprovechamiento de gatillos hápticos DualSense.',
    pros: [
      'Gráficos hiperdetallados y tiempos de carga instantáneos gracias al SSD de PS5',
      'Incluye el modo historia completo de Grand Theft Auto V y acceso a GTA Online',
      'Superventas oficial en Amazon España por solo 18,99 €'
    ],
    idealFor: 'Vivir o coleccionar Grand Theft Auto V en la máxima fidelidad gráfica de PlayStation 5.',
    searchQuery: 'Grand Theft Auto V PlayStation 5'
  },
  {
    id: 'gta-juego-trilogy-definitive-edition',
    asin: 'B09KTGP5C2',
    title: 'Grand Theft Auto: The Trilogy – The Definitive Edition (PS4 / Compatible PS5)',
    category: 'juego',
    categoryLabel: 'Juegos GTA VI / GTA V & Consolas',
    priceText: '18,99 €',
    priceNumeric: 18.99,
    rating: 4.5,
    reviewsCount: 4210,
    imageUrl: 'https://m.media-amazon.com/images/I/81sWtmFwp9L._AC_UL320_.jpg',
    badge: 'Trilogía Clásica (18,99 €)',
    description: 'La colección definitiva con los 3 clásicos que cambiaron la industria: GTA III, GTA Vice City y GTA San Andreas actualizados con controles modernos inspirados en GTA V.',
    pros: [
      'Tres juegos legendarios completos en un solo disco físico en oferta a 18,99 €',
      'Sistema de puntería y controles modernizados inspirados en Grand Theft Auto V',
      'Texturas en alta resolución e iluminación mejorada'
    ],
    idealFor: 'Recorrer Vice City y San Andreas originales junto a las nuevas entregas.',
    searchQuery: 'Grand Theft Auto The Trilogy The Definitive Edition PlayStation 4'
  },
  {
    id: 'gta-tarjeta-psn-50',
    asin: 'B07JH7FMJM',
    title: 'PlayStation Store Tarjeta Regalo Digital 50 € (Código Inmediato)',
    category: 'juego',
    categoryLabel: 'Reserva & Tarjetas Saldo',
    priceText: '50,00 €',
    priceNumeric: 50.00,
    rating: 4.8,
    reviewsCount: 28900,
    imageUrl: 'https://m.media-amazon.com/images/I/61pRhZYb1JL._AC_UL320_.jpg',
    badge: 'Código Inmediato',
    description: 'Tarjeta prepago digital oficial para añadir 50 € a tu monedero de PlayStation Store. Entrega inmediata del código digital tras la compra.',
    pros: [
      'Envío instantáneo del código al correo electrónico para canjear en PS5',
      'Sin comisiones ni caducidad, saldo seguro para reservar GTA VI',
      'El regalo más acertado si no sabes qué edición elegirá el destinatario'
    ],
    idealFor: 'Asegurar parte de la reserva del juego en la tienda oficial PlayStation.',
    searchQuery: 'tarjeta playstation store 50 euros codigo digital'
  },
  {
    id: 'gta-tarjeta-psn-100',
    asin: 'B07SFNJ34Q',
    title: 'PlayStation Store Tarjeta Regalo Digital 100 € (Para Edición Deluxe GTA VI)',
    category: 'juego',
    categoryLabel: 'Reserva & Tarjetas Saldo',
    priceText: '100,00 €',
    priceNumeric: 100.00,
    rating: 4.9,
    reviewsCount: 17800,
    imageUrl: 'https://m.media-amazon.com/images/I/618hNXADSML._AC_UL320_.jpg',
    badge: 'Pack Edición Deluxe',
    description: 'Tarjeta digital con 100 € de saldo oficial PlayStation Store. Cobertura completa garantizada para adquirir la Edición Deluxe o Gold de lanzamiento de GTA VI.',
    pros: [
      'Cubre íntegramente la edición especial más completa de GTA VI con sus extras',
      'Canje seguro en la PlayStation Store directamente desde la consola',
      'Disfruta de las recompensas y bonus de reserva desde el primer minuto'
    ],
    idealFor: 'El regalo definitivo para no tener que pagar un céntimo el día de salida.',
    searchQuery: 'tarjeta playstation store 100 euros codigo digital'
  },
  {
    id: 'gta-tarjeta-xbox-50',
    asin: 'B07VMB63CZ',
    title: 'Xbox Tarjeta Regalo Digital 50 € (Para Xbox Series X|S)',
    category: 'juego',
    categoryLabel: 'Reserva & Tarjetas Saldo',
    priceText: '50,00 €',
    priceNumeric: 50.00,
    rating: 4.8,
    reviewsCount: 15400,
    imageUrl: 'https://m.media-amazon.com/images/I/61yNar4sNnL._AC_UL320_.jpg',
    badge: 'Xbox Digital',
    description: 'Tarjeta prepago oficial Microsoft de 50 € para canjear en Xbox Store. Válida para Xbox Series X, Xbox Series S y PC.',
    pros: [
      'Código digital enviado inmediatamente a tu cuenta sin esperas',
      'Ideal para usuarios de Xbox Series X y Series S que esperan GTA VI',
      'Sin fechas de caducidad ocultas ni comisiones bancarias'
    ],
    idealFor: 'Los jugadores del ecosistema Xbox que quieren tener saldo listo.',
    searchQuery: 'tarjeta regalo xbox 50 euros codigo digital'
  },
  {
    id: 'gta-consola-ps5-slim-1tb',
    asin: 'B0CQPMYTVM',
    title: 'Sony PlayStation 5 Consola Modelo Slim 1TB SSD Chasis D',
    category: 'juego',
    categoryLabel: 'Reserva & Tarjetas Saldo',
    priceText: '499,99 €',
    priceNumeric: 499.99,
    rating: 4.8,
    reviewsCount: 8400,
    imageUrl: 'https://m.media-amazon.com/images/I/51NbBH89m1L._AC_UL320_.jpg',
    badge: 'Consola Oficial GTA VI',
    description: 'La consola de nueva generación PS5 modelo Slim más compacta y ligera con 1TB de almacenamiento SSD ultrarrápido y lector de discos Blu-Ray Ultra HD.',
    pros: [
      'Potencia gráfica de vanguardia con soporte para 4K, HDR y 120 FPS',
      'Disco SSD de 1 TB para instalar múltiples juegos de mundo abierto pesados',
      'Incluye mando DualSense blanco oficial y cables de conexión de alta velocidad'
    ],
    idealFor: 'El regalo de ensueño para estar 100% equipado para GTA VI.',
    searchQuery: 'sony playstation 5 consola slim 1tb chasis d'
  }
];
