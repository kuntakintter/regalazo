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
  { id: 'setup', label: 'Neón Vice City & Setup', icon: '💡' },
  { id: 'mandos', label: 'Mandos PS5 & Periféricos', icon: '🎮' },
  { id: 'merch', label: 'Ropa & Camisetas Retro', icon: '👕' },
  { id: 'coleccion', label: 'Coleccionismo & Soportes', icon: '🏆' },
  { id: 'juego', label: 'Reserva & Tarjetas Saldo', icon: '💳' },
];

export const GTA_PRICE_RANGES = [
  { id: 'all', label: 'Cualquier presupuesto' },
  { id: '<20', label: 'Menos de 20 €' },
  { id: '20-50', label: 'De 20 € a 50 €' },
  { id: '50-100', label: 'De 50 € a 100 €' },
  { id: '>100', label: 'Más de 100 €' },
];

export const GTA_PRODUCTS: GtaProduct[] = [
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
    asin: '',
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
    asin: '',
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
    asin: '',
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
    asin: '',
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
    asin: '',
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
    asin: '',
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
    asin: '',
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
    asin: '',
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
    asin: '',
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
    asin: '',
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
    asin: '',
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
    asin: '',
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
    asin: '',
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
    asin: '',
    title: 'Grand Theft Auto V (PS5) Versión Oficial Remasterizada',
    category: 'juego',
    categoryLabel: 'Reserva & Tarjetas Saldo',
    priceText: '18,99 €',
    priceNumeric: 18.99,
    rating: 4.8,
    reviewsCount: 16500,
    imageUrl: 'https://m.media-amazon.com/images/I/717n2jHZ7pL._AC_UL320_.jpg',
    badge: 'Bestseller GTA V',
    description: 'Edición oficial para PlayStation 5 con resolución 4K nativa, 60 fotogramas por segundo, trazado de rayos (ray tracing) y aprovechamiento de gatillos hápticos.',
    pros: [
      'Gráficos hiperdetallados y tiempos de carga instantáneos gracias al SSD',
      'Incluye el modo historia completo y acceso a Grand Theft Auto Online',
      'El calentamiento perfecto mientras esperamos el lanzamiento de GTA VI'
    ],
    idealFor: 'Revivir Los Santos en la máxima fidelidad gráfica en PlayStation 5.',
    searchQuery: 'grand theft auto v ps5 version oficial'
  },
  {
    id: 'gta-juego-trilogy-definitive-edition',
    asin: '',
    title: 'Grand Theft Auto: The Trilogy – The Definitive Edition (PS4 / compatible PS5)',
    category: 'juego',
    categoryLabel: 'Reserva & Tarjetas Saldo',
    priceText: '29,99 €',
    priceNumeric: 29.99,
    rating: 4.4,
    reviewsCount: 4210,
    imageUrl: 'https://m.media-amazon.com/images/I/71JDOWUjztL._AC_UL320_.jpg',
    badge: 'Trilogía Clásica',
    description: 'La colección definitiva con los 3 clásicos que cambiaron la industria: GTA III, GTA Vice City y GTA San Andreas actualizados con controles modernos.',
    pros: [
      'Tres juegos legendarios completos en un solo disco físico',
      'Sistema de puntería y controles modernizados inspirados en GTA V',
      'Texturas en alta resolución e iluminación mejorada'
    ],
    idealFor: 'Recorrer Vice City original antes de descubrir la nueva entrega.',
    searchQuery: 'grand theft auto the trilogy definitive edition ps4 ps5'
  },
  {
    id: 'gta-tarjeta-psn-50',
    asin: '',
    title: 'PlayStation Store Tarjeta Regalo Digital 50 € (Código Inmediato)',
    category: 'juego',
    categoryLabel: 'Reserva & Tarjetas Saldo',
    priceText: '50,00 €',
    priceNumeric: 50.00,
    rating: 4.8,
    reviewsCount: 28900,
    imageUrl: 'https://m.media-amazon.com/images/I/61pRhZYb1JL._AC_UL320_.jpg',
    badge: 'Código Inmediato',
    description: 'Tarjeta prepago digital oficial para añadir 50 € a tu monedero de PlayStation Network España. Entrega inmediata del código digital tras la compra.',
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
    asin: '',
    title: 'PlayStation Store Tarjeta Regalo Digital 100 € (Para Edición Deluxe GTA VI)',
    category: 'juego',
    categoryLabel: 'Reserva & Tarjetas Saldo',
    priceText: '100,00 €',
    priceNumeric: 100.00,
    rating: 4.9,
    reviewsCount: 17800,
    imageUrl: 'https://m.media-amazon.com/images/I/618hNXADSML._AC_UL320_.jpg',
    badge: 'Pack Edición Deluxe',
    description: 'Tarjeta digital con 100 € de saldo oficial PSN España. Cobertura completa garantizada para adquirir la Edición Deluxe o Gold de lanzamiento de GTA VI.',
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
    asin: '',
    title: 'Xbox Tarjeta Regalo Digital 50 € (Para Xbox Series X|S)',
    category: 'juego',
    categoryLabel: 'Reserva & Tarjetas Saldo',
    priceText: '50,00 €',
    priceNumeric: 50.00,
    rating: 4.8,
    reviewsCount: 15400,
    imageUrl: 'https://m.media-amazon.com/images/I/61yNar4sNnL._AC_UL320_.jpg',
    badge: 'Xbox Digital',
    description: 'Tarjeta prepago oficial Microsoft de 50 € para canjear en Xbox Store España. Válida para Xbox Series X, Xbox Series S y PC.',
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
    asin: '',
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
