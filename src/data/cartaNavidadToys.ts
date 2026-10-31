export interface ChristmasToy {
  id: string;
  title: string;
  shortTitle: string;
  category: 'lego' | 'coches' | 'peluches' | 'gaming' | 'juegos' | 'creatividad';
  categoryLabel: string;
  ageRange: '4-6' | '7-9' | '10-12' | 'all';
  imageUrl: string;
  asin: string;
  badge?: string;
}

export const CHRISTMAS_CATEGORIES = [
  { id: 'all', label: '🌟 Todos los Juguetes', icon: '🌟' },
  { id: 'lego', label: '🧱 LEGO & Bloques', icon: '🧱' },
  { id: 'coches', label: '🏎️ Coches & Pistas', icon: '🏎️' },
  { id: 'peluches', label: '🧸 Muñecas & Peluches', icon: '🧸' },
  { id: 'gaming', label: '🎮 Gaming & Robótica', icon: '🎮' },
  { id: 'juegos', label: '🎲 Juegos de Mesa', icon: '🎲' },
  { id: 'creatividad', label: '🎨 Arte & Dibujo', icon: '🎨' },
];

export const CHRISTMAS_AGE_RANGES = [
  { id: 'all', label: 'Cualquier edad' },
  { id: '4-6', label: '👦 4 a 6 Años (Infantil)' },
  { id: '7-9', label: '👧 7 a 9 Años (Primaria)' },
  { id: '10-12', label: '🚀 10 a 12 Años (Juvenil)' },
];

export const CHRISTMAS_TOYS: ChristmasToy[] = [
  // LEGO & CONSTRUCCIÓN
  {
    id: 'toy-lego-adviento',
    title: 'LEGO Marvel - Calendario de Adviento con 24 Minifiguras',
    shortTitle: 'LEGO Marvel Calendario de Adviento',
    category: 'lego',
    categoryLabel: 'LEGO & Bloques',
    ageRange: '7-9',
    imageUrl: 'https://m.media-amazon.com/images/I/81lDif6INrL._AC_UL320_.jpg',
    asin: 'B0GGSM14GC',
    badge: 'Top Deseo 2026'
  },
  {
    id: 'toy-lego-castillo-medieval',
    title: 'LEGO Creator 3 en 1 - Gran Castillo Medieval con Dragón y Caballeros',
    shortTitle: 'LEGO Castillo Medieval 3 en 1',
    category: 'lego',
    categoryLabel: 'LEGO & Bloques',
    ageRange: '7-9',
    imageUrl: '/images/products/79-lego-creator-castillo-medieval-1.jpg',
    asin: 'B08G8K7TY3',
    badge: 'Aventura Medieval'
  },
  {
    id: 'toy-lego-dinosaurio-trex',
    title: 'LEGO Creator 3 en 1 - Dinosaurio T-Rex Temible Articulado',
    shortTitle: 'LEGO Dinosaurio T-Rex 3 en 1',
    category: 'lego',
    categoryLabel: 'LEGO & Bloques',
    ageRange: '7-9',
    imageUrl: '/images/products/79-lego-creator-dinosaurio-trex-1.jpg',
    asin: 'B01LZF2U33',
    badge: 'Top Dinosaurios'
  },
  {
    id: 'toy-gravitrax-pista',
    title: 'Ravensburger - GraviTrax Starter Set Circuito de Canicas Interactivo',
    shortTitle: 'GraviTrax Circuito de Canicas',
    category: 'lego',
    categoryLabel: 'LEGO & Bloques',
    ageRange: '7-9',
    imageUrl: '/images/products/79-gravitrax-1.jpg',
    asin: 'B079Z5J2R5',
    badge: 'Física y Gravedad'
  },

  // COCHES & PISTAS
  {
    id: 'toy-carrera-mario-kart',
    title: 'Carrera First - Circuito de Carreras Nintendo Mario Kart',
    shortTitle: 'Circuito Carrera Mario Kart',
    category: 'coches',
    categoryLabel: 'Coches & Pistas',
    ageRange: '4-6',
    imageUrl: '/images/products/46-carrera-mario-1.jpg',
    asin: 'B079Z5J2R4',
    badge: 'Circuito Nº1 en Ventas'
  },
  {
    id: 'toy-hot-wheels-choques',
    title: 'Hot Wheels - Pista de Carreras de Choques Aéreos Motorizada',
    shortTitle: 'Pista Hot Wheels Choques Aéreos',
    category: 'coches',
    categoryLabel: 'Coches & Pistas',
    ageRange: '4-6',
    imageUrl: '/images/products/46-hot-wheels-choques-aereos-1.jpg',
    asin: 'B07B4M27B3',
    badge: 'Acción Extrema'
  },
  {
    id: 'toy-hot-wheels-garaje',
    title: 'Hot Wheels City - Megagaraje con Ascensor y Capacidad 35 Coches',
    shortTitle: 'Megagaraje Hot Wheels City',
    category: 'coches',
    categoryLabel: 'Coches & Pistas',
    ageRange: '4-6',
    imageUrl: '/images/products/46-hot-wheels-garaje-gigante-1.jpg',
    asin: 'B08F2CVZ99',
    badge: 'Garaje Gigante'
  },
  {
    id: 'toy-monster-truck-rc',
    title: 'Monster Truck Teledirigido 4x4 Todo Terreno Radiocontrol Gigante',
    shortTitle: 'Monster Truck 4x4 Teledirigido',
    category: 'coches',
    categoryLabel: 'Coches & Pistas',
    ageRange: '7-9',
    imageUrl: '/images/products/79-monster-truck-rc-gigante-1.jpg',
    asin: 'B08F2CVZ01',
    badge: 'Potencia Todo Terreno'
  },
  {
    id: 'toy-scalextric-rally',
    title: 'Scalextric Compact - Circuito de Carreras Rally Champions',
    shortTitle: 'Scalextric Rally Champions',
    category: 'coches',
    categoryLabel: 'Coches & Pistas',
    ageRange: '7-9',
    imageUrl: '/images/products/79-scalextric-rally-champions-1.jpg',
    asin: 'B08F2CVZ02',
    badge: 'El Clásico Español'
  },
  {
    id: 'toy-bopster-patinete',
    title: 'Patinete Infantil Plegable con Ruedas Luminosas LED sin Pilas',
    shortTitle: 'Patinete con Ruedas LED',
    category: 'coches',
    categoryLabel: 'Coches & Pistas',
    ageRange: '4-6',
    imageUrl: '/images/products/46-bopster-patinete-1.jpg',
    asin: 'B08F9VXYZ3',
    badge: 'Deporte al Aire Libre'
  },

  // PELUCHES & MASCOTAS
  {
    id: 'toy-pikachu-peluche',
    title: 'Peluche Oficial Pokémon Pikachu Grande 30cm Súper Suave',
    shortTitle: 'Peluche Oficial Pikachu 30cm',
    category: 'peluches',
    categoryLabel: 'Muñecas & Peluches',
    ageRange: '7-9',
    imageUrl: '/images/products/46-pikachu-peluche-1.jpg',
    asin: 'B07CJW1T1X',
    badge: 'Súper Achuchable'
  },
  {
    id: 'toy-furby-interactivo',
    title: 'Hasbro - Furby Interactivo con Voz, Luces y 5 Modos de Juego',
    shortTitle: 'Furby Interactivo con Voz',
    category: 'peluches',
    categoryLabel: 'Muñecas & Peluches',
    ageRange: '4-6',
    imageUrl: '/images/products/46-furby-interactivo-morado-1.jpg',
    asin: 'B07MVD9W04',
    badge: 'Mascota Mágica'
  },
  {
    id: 'toy-bitzee-digital',
    title: 'Spin Master - Bitzee Mascota Digital Interactiva que Puedes Tocar',
    shortTitle: 'Bitzee Mascota Digital Interactiva',
    category: 'peluches',
    categoryLabel: 'Muñecas & Peluches',
    ageRange: '4-6',
    imageUrl: '/images/products/46-bitzee-mascota-digital-1.jpg',
    asin: 'B07MVD9W05',
    badge: 'Sensación Mundial'
  },
  {
    id: 'toy-perrito-respira',
    title: 'Perrito de Peluche Interactivo con Sonido y Movimiento de Respiración',
    shortTitle: 'Perrito Interactivo Dulces Sueños',
    category: 'peluches',
    categoryLabel: 'Muñecas & Peluches',
    ageRange: '4-6',
    imageUrl: '/images/products/46-perrito-interactivo-respira-1.jpg',
    asin: 'B07MVD9W06',
    badge: 'Tierno y Relajante'
  },

  // JUEGOS DE MESA
  {
    id: 'toy-virus-cartas',
    title: 'VIRUS! - El Juego de Cartas Más Contagioso y Divertido',
    shortTitle: 'VIRUS! Juego de Cartas',
    category: 'juegos',
    categoryLabel: 'Juegos de Mesa',
    ageRange: '10-12',
    imageUrl: '/images/products/1012-virus-1.jpg',
    asin: '8467571343',
    badge: 'Nº1 Más Vendido'
  },
  {
    id: 'toy-dobble-kids',
    title: 'Asmodee - Dobble Kids: Rapidez Visual y Reflejos en Lata Metálica',
    shortTitle: 'Dobble Kids Juego de Reflejos',
    category: 'juegos',
    categoryLabel: 'Juegos de Mesa',
    ageRange: '4-6',
    imageUrl: '/images/products/46-dobble-kids-1.jpg',
    asin: 'B007X6J8M1',
    badge: 'Para Llevar a Cualquier Parte'
  },
  {
    id: 'toy-catan-junior',
    title: 'Devir - Catan Junior: El Gran Juego de Estrategia para Niños',
    shortTitle: 'Catan Junior Juego de Estrategia',
    category: 'juegos',
    categoryLabel: 'Juegos de Mesa',
    ageRange: '7-9',
    imageUrl: '/images/products/79-catan-junior-1.jpg',
    asin: 'B00004UBI1',
    badge: 'Estrategia Pirata'
  },
  {
    id: 'toy-fantasma-blitz',
    title: 'Devir - Fantasma Blitz: Juego de Agilidad Mental y Risas',
    shortTitle: 'Fantasma Blitz Juego de Mesa',
    category: 'juegos',
    categoryLabel: 'Juegos de Mesa',
    ageRange: '7-9',
    imageUrl: '/images/products/79-fantasma-blitz-1.jpg',
    asin: 'B007X6J8N2',
    badge: 'Risas Aseguradas'
  },
  {
    id: 'toy-conecta-4',
    title: 'Hasbro Gaming - Conecta 4 Clásico: Estrategia de Discos en Rejilla',
    shortTitle: 'Conecta 4 Clásico',
    category: 'juegos',
    categoryLabel: 'Juegos de Mesa',
    ageRange: '4-6',
    imageUrl: '/images/products/46-conecta-4-clasico-1.jpg',
    asin: 'B00000IWH8',
    badge: 'El Clásico de Siempre'
  },

  // GAMING & TECNOLOGÍA
  {
    id: 'toy-dron-potensic',
    title: 'Potensic Mini Dron para Niños con Cámara HD y Despegue Automático',
    shortTitle: 'Mini Dron con Cámara HD',
    category: 'gaming',
    categoryLabel: 'Gaming & Robótica',
    ageRange: '10-12',
    imageUrl: '/images/products/1012-dron-potensic-1.jpg',
    asin: 'B08G8K7TY4',
    badge: 'Fácil de Volar'
  },
  {
    id: 'toy-robot-mbot',
    title: 'Makeblock mBot - Robot Educativo Programable para Montar',
    shortTitle: 'mBot Robot Programable',
    category: 'gaming',
    categoryLabel: 'Gaming & Robótica',
    ageRange: '10-12',
    imageUrl: '/images/products/1012-makeblock-mbot-robot-1.jpg',
    asin: 'B0BWNWN925',
    badge: 'Robótica Educativa'
  },
  {
    id: 'toy-magia-borras',
    title: 'Magia Borras - Set de 150 Trucos de Ilusionismo Clásico y Varita',
    shortTitle: 'Magia Borras 150 Trucos',
    category: 'gaming',
    categoryLabel: 'Gaming & Robótica',
    ageRange: '10-12',
    imageUrl: '/images/products/1012-magia-borras-150-1.jpg',
    asin: 'B07MVD9W26',
    badge: 'Magia e Ilusión'
  },

  // ARTE & CREATIVIDAD
  {
    id: 'toy-maletin-dibujo',
    title: 'Maletín de Dibujo Artístico de Madera con 150 Piezas Completas',
    shortTitle: 'Maletín de Dibujo 150 Piezas',
    category: 'creatividad',
    categoryLabel: 'Arte & Dibujo',
    ageRange: '4-6',
    imageUrl: '/images/products/46-maletin-dibujo-madera-150-1.jpg',
    asin: 'B07MVD9W03',
    badge: 'Pintura y Creatividad'
  },
  {
    id: 'toy-fabrica-slime',
    title: 'Canal Toys - Fábrica de Slime DIY Segura sin Bórax con Purpurina',
    shortTitle: 'Fábrica de Slime con Purpurina',
    category: 'creatividad',
    categoryLabel: 'Arte & Dibujo',
    ageRange: '7-9',
    imageUrl: '/images/products/79-fabrica-slime-diy-sin-borax-1.jpg',
    asin: 'B075VQ8V9B',
    badge: 'Creación Divertida'
  }
];

export function buildAmazonRemoteCartUrl(asins: string[], associateTag = 'vapegadgets22-21'): string {
  if (!asins || asins.length === 0) return 'https://www.amazon.es';
  const params = new URLSearchParams();
  params.append('AssociateTag', associateTag);
  asins.forEach((asin, index) => {
    params.append(`ASIN.${index + 1}`, asin.trim());
    params.append(`Quantity.${index + 1}`, '1');
  });
  return `https://www.amazon.es/gp/aws/cart/add.html?${params.toString()}`;
}
