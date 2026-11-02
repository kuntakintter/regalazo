export interface ChristmasToy {
  id: string;
  title: string;
  shortTitle: string;
  category: 'lego' | 'coches' | 'peluches' | 'gaming' | 'juegos' | 'creatividad' | 'cuentos' | 'deportes' | 'bebes' | 'sobre-ruedas' | 'seguridad';
  wheelSubcategory?: 'coches-electricos' | 'quads' | 'minimotos' | 'patinetes-electricos' | 'bicis-karts-patines';
  categoryLabel: string;
  ageRange?: '0-3' | '4-6' | '7-9' | '10-12' | '13+' | 'all';
  ages: ('0-3' | '4-6' | '7-9' | '10-12' | '13+')[];
  imageUrl: string;
  asin: string;
  badge?: string;
}

export const CHRISTMAS_CATEGORIES = [
  { id: 'all', label: '🌟 Todos los Juguetes', icon: '🌟' },
  { id: 'sobre-ruedas', label: '🏍️ Sobre Ruedas & Motor', icon: '🏍️' },
  { id: 'seguridad', label: '🛡️ Cascos & Seguridad', icon: '🛡️' },
  { id: 'lego', label: '🧱 LEGO & Bloques', icon: '🧱' },
  { id: 'coches', label: '🏎️ Coches & Pistas', icon: '🏎️' },
  { id: 'peluches', label: '🧸 Muñecas & Peluches', icon: '🧸' },
  { id: 'gaming', label: '🎮 Gaming & Robótica', icon: '🎮' },
  { id: 'juegos', label: '🎲 Juegos de Mesa', icon: '🎲' },
  { id: 'creatividad', label: '🎨 Arte & Dibujo', icon: '🎨' },
  { id: 'cuentos', label: '📚 Cuentos & Cómics', icon: '📚' },
  { id: 'deportes', label: '⚽ Deportes & Aire Libre', icon: '⚽' },
  { id: 'bebes', label: '👶 Bebés & Montessori', icon: '👶' },
];

export const CHRISTMAS_WHEELS_SUBFILTERS = [
  { id: 'all', label: '🌟 Todo Sobre Ruedas', icon: '🌟' },
  { id: 'coches-electricos', label: '🚗 Coches Eléctricos (12V/24V)', icon: '🚗' },
  { id: 'quads', label: '🛞 Quads y Buggies 4x4', icon: '🛞' },
  { id: 'minimotos', label: '🏍️ Minimotos y Motos', icon: '🏍️' },
  { id: 'patinetes-electricos', label: '🛴 Patinetes Eléctricos y Hoverboards', icon: '🛴' },
  { id: 'bicis-karts-patines', label: '🚲 Bicis, Karts y Patines', icon: '🚲' },
] as const;

export const CHRISTMAS_AGE_RANGES = [
  { id: 'all', label: '🌟 Todas las edades' },
  { id: '0-3', label: '🍼 0 a 3 añitos' },
  { id: '4-6', label: '🧸 4 a 6 años' },
  { id: '7-9', label: '🚀 7 a 9 años' },
  { id: '10-12', label: '🎯 10 a 12 años' },
  { id: '13+', label: '🎮 Más de 13 años' },
];

export const CHRISTMAS_TOYS: ChristmasToy[] = [
  {
    "id": "toy-lego-duplo-tren-numeros",
    "title": "LEGO Duplo - Mi Primer Tren de los Números con Figuras de Niños y Gato",
    "shortTitle": "LEGO Duplo Tren de los Números",
    "category": "lego",
    "categoryLabel": "LEGO & Bloques",
    "ages": [
      "0-3",
      "4-6"
    ],
    "imageUrl": "/images/products/13-lego-duplo-tren-numeros-1.jpg",
    "asin": "B08W73SBCV",
    "badge": "Nº 1 en Preescolar"
  },
  {
    "id": "toy-lego-duplo-caja-ladrillos",
    "title": "LEGO Duplo Classic - Caja de Ladrillos de Construcción 65 Piezas con Coche",
    "shortTitle": "LEGO Duplo Caja de Ladrillos",
    "category": "lego",
    "categoryLabel": "LEGO & Bloques",
    "ages": [
      "0-3",
      "4-6"
    ],
    "imageUrl": "/images/products/13-lego-duplo-caja-ladrillos-1.jpg",
    "asin": "B07W5PVF27",
    "badge": "Creatividad Infantil"
  },
  {
    "id": "toy-lego-duplo-camion-bomberos",
    "title": "LEGO Duplo - Camión de Bomberos con Luces Azules, Sirena y Escalera",
    "shortTitle": "LEGO Duplo Camión de Bomberos",
    "category": "lego",
    "categoryLabel": "LEGO & Bloques",
    "ages": [
      "0-3",
      "4-6"
    ],
    "imageUrl": "/images/products/13-lego-duplo-camion-bomberos-1.jpg",
    "asin": "B08W5B7P4P",
    "badge": "Favorito de los Peques"
  },
  {
    "id": "toy-lego-duplo-animales-salvajes",
    "title": "LEGO Duplo - Animales Salvajes de África con Bebé Elefante y Jirafa",
    "shortTitle": "LEGO Duplo Animales de África",
    "category": "lego",
    "categoryLabel": "LEGO & Bloques",
    "ages": [
      "0-3",
      "4-6"
    ],
    "imageUrl": "/images/products/13-lego-duplo-1.jpg",
    "asin": "B09QFS1P59",
    "badge": "Top Bebés"
  },
  {
    "id": "toy-clemmy-bloques-blanditos",
    "title": "Clementoni Clemmy - Bolsa de 24 Bloques Blanditos Sensoriales Lavables",
    "shortTitle": "Clemmy Bloques Blanditos 24pz",
    "category": "lego",
    "categoryLabel": "LEGO & Bloques",
    "ages": [
      "0-3",
      "4-6"
    ],
    "imageUrl": "/images/products/13-clemmy-bloques-1.jpg",
    "asin": "B07K66H6X9",
    "badge": "100% Suave y Seguro"
  },
  {
    "id": "toy-lego-classic-caja-grande",
    "title": "LEGO Classic - Caja de Ladrillos Creativos Grande con 790 Piezas y Ruedas",
    "shortTitle": "LEGO Classic Caja Grande 790pz",
    "category": "lego",
    "categoryLabel": "LEGO & Bloques",
    "ages": [
      "4-6",
      "7-9",
      "10-12"
    ],
    "imageUrl": "/images/products/46-carrera-mario-1.jpg",
    "asin": "B00NVDOHS6",
    "badge": "Más Vendido"
  },
  {
    "id": "toy-lego-city-estacion-policia",
    "title": "LEGO City - Estación de Policía de 3 Plantas con Coche Patrulla y Helicóptero",
    "shortTitle": "LEGO City Estación de Policía",
    "category": "lego",
    "categoryLabel": "LEGO & Bloques",
    "ages": [
      "4-6",
      "7-9"
    ],
    "imageUrl": "/images/products/46-capa-mascara-superheroes-1.jpg",
    "asin": "B09QFSX9N9",
    "badge": "Top Deseo Navidad"
  },
  {
    "id": "toy-lego-city-parque-bomberos",
    "title": "LEGO City - Parque de Bomberos con Camión, Helicóptero y 5 Minifiguras",
    "shortTitle": "LEGO City Parque de Bomberos",
    "category": "lego",
    "categoryLabel": "LEGO & Bloques",
    "ages": [
      "4-6",
      "7-9"
    ],
    "imageUrl": "/images/products/46-bopster-patinete-1.jpg",
    "asin": "B09QFT8L1F",
    "badge": "Éxito Clásico"
  },
  {
    "id": "toy-lego-friends-casa-arbol",
    "title": "LEGO Friends - Casa del Árbol de la Amistad con Tirolina y Accesorios",
    "shortTitle": "LEGO Friends Casa del Árbol",
    "category": "lego",
    "categoryLabel": "LEGO & Bloques",
    "ages": [
      "4-6",
      "7-9",
      "10-12"
    ],
    "imageUrl": "/images/products/46-aquabeads-estuche-expert-1.jpg",
    "asin": "B09QFS876V",
    "badge": "Favorito Infantil"
  },
  {
    "id": "toy-lego-disney-castillo-frozen",
    "title": "LEGO Disney - Castillo de Hielo Mágico de Elsa con Olaf y Anna de Frozen",
    "shortTitle": "LEGO Castillo Hielo Frozen",
    "category": "lego",
    "categoryLabel": "LEGO & Bloques",
    "ages": [
      "4-6",
      "7-9"
    ],
    "imageUrl": "/images/products/46-vestido-princesa-accesorios-1.jpg",
    "asin": "B08WWL4GQP",
    "badge": "Princesas Disney"
  },
  {
    "id": "toy-lego-creator-dino-trex",
    "title": "LEGO Creator 3 en 1 - Gran Dinosaurio T-Rex Reconstruible en Triceratops",
    "shortTitle": "LEGO Creator 3en1 T-Rex",
    "category": "lego",
    "categoryLabel": "LEGO & Bloques",
    "ages": [
      "4-6",
      "7-9",
      "10-12"
    ],
    "imageUrl": "/images/products/79-lego-creator-dinosaurio-trex-1.jpg",
    "asin": "B01KJEOC3A",
    "badge": "3 Juguetes en 1"
  },
  {
    "id": "toy-lego-creator-castillo-medieval",
    "title": "LEGO Creator 3 en 1 - Castillo Medieval con Dragón, Catapulta y 3 Figuras",
    "shortTitle": "LEGO Creator Castillo Medieval",
    "category": "lego",
    "categoryLabel": "LEGO & Bloques",
    "ages": [
      "7-9",
      "10-12",
      "13+"
    ],
    "imageUrl": "/images/products/79-lego-creator-castillo-medieval-1.jpg",
    "asin": "B08WWZ2T3T",
    "badge": "Top Ventas Mundial"
  },
  {
    "id": "toy-lego-safari-wildlife",
    "title": "LEGO Creator 3 en 1 - Animales Salvajes del Safari con Jirafa y León",
    "shortTitle": "LEGO Creator Safari 3en1",
    "category": "lego",
    "categoryLabel": "LEGO & Bloques",
    "ages": [
      "7-9",
      "10-12"
    ],
    "imageUrl": "/images/products/79-lego-safari-1.jpg",
    "asin": "B0CGW4P7X2",
    "badge": "Novedad"
  },
  {
    "id": "toy-gravitrax-circuito-canicas",
    "title": "Ravensburger GraviTrax - Circuito de Canicas Interactivo Pro Starter Set",
    "shortTitle": "GraviTrax Circuito Canicas Pro",
    "category": "lego",
    "categoryLabel": "LEGO & Bloques",
    "ages": [
      "7-9",
      "10-12",
      "13+"
    ],
    "imageUrl": "/images/products/79-gravitrax-1.jpg",
    "asin": "B079D19K26",
    "badge": "Construcción STEM"
  },
  {
    "id": "toy-lego-marvel-adviento",
    "title": "LEGO Marvel - Calendario de Adviento 24 Sorpresas y Minifiguras Vengadores",
    "shortTitle": "LEGO Marvel Calendario Adviento",
    "category": "lego",
    "categoryLabel": "LEGO & Bloques",
    "ages": [
      "7-9",
      "10-12",
      "13+"
    ],
    "imageUrl": "https://m.media-amazon.com/images/I/81lDif6INrL._AC_UL320_.jpg",
    "asin": "B0GGSM14GC",
    "badge": "Edición Navidad 2026"
  },
  {
    "id": "toy-lego-star-wars-xwing",
    "title": "LEGO Star Wars - Caza Ala-X de Luke Skywalker con R2-D2 y Princesa Leia",
    "shortTitle": "LEGO Star Wars Caza X-Wing",
    "category": "lego",
    "categoryLabel": "LEGO & Bloques",
    "ages": [
      "7-9",
      "10-12",
      "13+"
    ],
    "imageUrl": "https://m.media-amazon.com/images/I/81q2K+V5d8L._AC_UL320_.jpg",
    "asin": "B08G4662LQ",
    "badge": "Galáctico"
  },
  {
    "id": "toy-lego-minecraft-caja-modular",
    "title": "LEGO Minecraft - La Mina de Nether con Steve, Esqueleto y Zombi",
    "shortTitle": "LEGO Minecraft La Mina Nether",
    "category": "lego",
    "categoryLabel": "LEGO & Bloques",
    "ages": [
      "7-9",
      "10-12",
      "13+"
    ],
    "imageUrl": "https://m.media-amazon.com/images/I/81w3Q9E5y5L._AC_UL320_.jpg",
    "asin": "B08WWP68M1",
    "badge": "Éxito Minecraft"
  },
  {
    "id": "toy-lego-ninjago-dragon",
    "title": "LEGO Ninjago - Dragón del Fuego Evolutivo de Kai con Minifiguras Ninja",
    "shortTitle": "LEGO Ninjago Dragón de Kai",
    "category": "lego",
    "categoryLabel": "LEGO & Bloques",
    "ages": [
      "7-9",
      "10-12"
    ],
    "imageUrl": "https://m.media-amazon.com/images/I/81y5K8M2n1L._AC_UL320_.jpg",
    "asin": "B09QFS1N4P",
    "badge": "Acción Ninja"
  },
  {
    "id": "toy-lego-harry-potter-hogwarts",
    "title": "LEGO Harry Potter - Castillo de Hogwarts: Clase de Pociones con Snape",
    "shortTitle": "LEGO Harry Potter Hogwarts",
    "category": "lego",
    "categoryLabel": "LEGO & Bloques",
    "ages": [
      "7-9",
      "10-12",
      "13+"
    ],
    "imageUrl": "https://m.media-amazon.com/images/I/81v5M9Q4x2L._AC_UL320_.jpg",
    "asin": "B09QFT1P7L",
    "badge": "Mágico"
  },
  {
    "id": "toy-lego-speed-ferrari",
    "title": "LEGO Speed Champions - Ferrari 812 Competizione con Minifigura de Piloto",
    "shortTitle": "LEGO Ferrari 812 Competizione",
    "category": "lego",
    "categoryLabel": "LEGO & Bloques",
    "ages": [
      "7-9",
      "10-12",
      "13+"
    ],
    "imageUrl": "https://m.media-amazon.com/images/I/81e4V8M6N2L._AC_UL320_.jpg",
    "asin": "B0BBRW873K",
    "badge": "Superdeportivo"
  },
  {
    "id": "toy-lego-speed-lamborghini",
    "title": "LEGO Speed Champions - Lamborghini Countach Réplica Deportiva Clásica",
    "shortTitle": "LEGO Lamborghini Countach",
    "category": "lego",
    "categoryLabel": "LEGO & Bloques",
    "ages": [
      "7-9",
      "10-12",
      "13+"
    ],
    "imageUrl": "https://m.media-amazon.com/images/I/81d5N7M4x1L._AC_UL320_.jpg",
    "asin": "B09QFS8712",
    "badge": "Icono Clásico"
  },
  {
    "id": "toy-lego-star-wars-halcon",
    "title": "LEGO Star Wars - Halcón Milenario con Minifiguras Han Solo, Chewbacca y Lando",
    "shortTitle": "LEGO Halcón Milenario",
    "category": "lego",
    "categoryLabel": "LEGO & Bloques",
    "ages": [
      "10-12",
      "13+"
    ],
    "imageUrl": "https://m.media-amazon.com/images/I/81r1K9P5q6L._AC_UL320_.jpg",
    "asin": "B07ND6CFHZ",
    "badge": "El Rey de Star Wars"
  },
  {
    "id": "toy-lego-technic-monster-jam",
    "title": "LEGO Technic - Monster Jam Megalodon Coche de Fricción 2 en 1",
    "shortTitle": "LEGO Technic Monster Jam",
    "category": "lego",
    "categoryLabel": "LEGO & Bloques",
    "ages": [
      "7-9",
      "10-12",
      "13+"
    ],
    "imageUrl": "https://m.media-amazon.com/images/I/81k5Q8W2n3L._AC_UL320_.jpg",
    "asin": "B09QFT6M8S",
    "badge": "Mecánica Real"
  },
  {
    "id": "toy-lego-technic-buggy-carreras",
    "title": "LEGO Technic - Buggy Todoterreno con Dirección Móvil y Suspensión",
    "shortTitle": "LEGO Technic Buggy Todoterreno",
    "category": "lego",
    "categoryLabel": "LEGO & Bloques",
    "ages": [
      "10-12",
      "13+"
    ],
    "imageUrl": "https://m.media-amazon.com/images/I/81w4Q8P2n7L._AC_UL320_.jpg",
    "asin": "B0BBRW7K24",
    "badge": "Todoterreno"
  },
  {
    "id": "toy-lego-technic-ford-gt",
    "title": "LEGO Technic - Ford GT 2022 Escala 1:12 con Motor V6 con Pistones Móviles",
    "shortTitle": "LEGO Technic Ford GT 2022",
    "category": "lego",
    "categoryLabel": "LEGO & Bloques",
    "ages": [
      "10-12",
      "13+"
    ],
    "imageUrl": "https://m.media-amazon.com/images/I/81m6P8Q4v1L._AC_UL320_.jpg",
    "asin": "B0BBRW9L3F",
    "badge": "Ingeniería Maqueta"
  },
  {
    "id": "toy-lego-technic-porsche-rsr",
    "title": "LEGO Technic - Porsche 911 RSR Modelo Deportivo con Motor Bóxer 6 Cilindros",
    "shortTitle": "LEGO Technic Porsche 911 RSR",
    "category": "lego",
    "categoryLabel": "LEGO & Bloques",
    "ages": [
      "10-12",
      "13+"
    ],
    "imageUrl": "https://m.media-amazon.com/images/I/81t5N8M4x3L._AC_UL320_.jpg",
    "asin": "B07FP6ZW7Z",
    "badge": "Maqueta Réplica"
  },
  {
    "id": "toy-lego-icons-bonsai",
    "title": "LEGO Icons - Bonsái Japonés con Flores de Cerezo Intercambiables",
    "shortTitle": "LEGO Icons Bonsái Japonés",
    "category": "lego",
    "categoryLabel": "LEGO & Bloques",
    "ages": [
      "10-12",
      "13+"
    ],
    "imageUrl": "/images/products/18plus-lego-icons-bonsai-1.jpg",
    "asin": "B08G4QRV8B",
    "badge": "Zen & Decoración"
  },
  {
    "id": "toy-lego-icons-ramo-flores",
    "title": "LEGO Icons - Ramo de Flores Silvestres Decorativas con 16 Tallos",
    "shortTitle": "LEGO Icons Ramo de Flores",
    "category": "lego",
    "categoryLabel": "LEGO & Bloques",
    "ages": [
      "10-12",
      "13+"
    ],
    "imageUrl": "/images/products/18plus-lego-icons-ramo-flores-1.jpg",
    "asin": "B0BBSJ7T6M",
    "badge": "Éxito Viral"
  },
  {
    "id": "toy-lego-star-wars-casco-vader",
    "title": "LEGO Star Wars - Casco de Darth Vader Maqueta de Exposición Coleccionable",
    "shortTitle": "LEGO Casco Darth Vader",
    "category": "lego",
    "categoryLabel": "LEGO & Bloques",
    "ages": [
      "10-12",
      "13+"
    ],
    "imageUrl": "/images/products/18plus-lego-star-wars-casco-vader-1.jpg",
    "asin": "B08G4FT9X4",
    "badge": "Colección Élite"
  },
  {
    "id": "toy-lego-architecture-londres",
    "title": "LEGO Architecture - Skyline de Londres con Big Ben, London Eye y Tower Bridge",
    "shortTitle": "LEGO Architecture Londres",
    "category": "lego",
    "categoryLabel": "LEGO & Bloques",
    "ages": [
      "10-12",
      "13+"
    ],
    "imageUrl": "https://m.media-amazon.com/images/I/81p5N7M4x2L._AC_UL320_.jpg",
    "asin": "B01KJEOC2Q",
    "badge": "Ciudades del Mundo"
  },
  {
    "id": "toy-lego-architecture-nueva-york",
    "title": "LEGO Architecture - Skyline de Nueva York con Empire State y Estatua Libertad",
    "shortTitle": "LEGO Architecture Nueva York",
    "category": "lego",
    "categoryLabel": "LEGO & Bloques",
    "ages": [
      "10-12",
      "13+"
    ],
    "imageUrl": "https://m.media-amazon.com/images/I/81v5M9Q4x2L._AC_UL320_.jpg",
    "asin": "B012NOEQAE",
    "badge": "Skyline Icónico"
  },
  {
    "id": "toy-lego-marvel-guantelete-infinito",
    "title": "LEGO Marvel - Guantelete del Infinito de Thanos con Gemas y Dedos Articulados",
    "shortTitle": "LEGO Guantelete Thanos",
    "category": "lego",
    "categoryLabel": "LEGO & Bloques",
    "ages": [
      "10-12",
      "13+"
    ],
    "imageUrl": "https://m.media-amazon.com/images/I/81v5M9Q4x2L._AC_UL320_.jpg",
    "asin": "B08WWL4GQQ",
    "badge": "Marvel Legends"
  },
  {
    "id": "toy-lego-minecraft-aldea-llama",
    "title": "LEGO Minecraft - El Refugio de la Llama con Aldeanos y Comerciante",
    "shortTitle": "LEGO Minecraft Refugio Llama",
    "category": "lego",
    "categoryLabel": "LEGO & Bloques",
    "ages": [
      "7-9",
      "10-12",
      "13+"
    ],
    "imageUrl": "https://m.media-amazon.com/images/I/81w3Q9E5y5L._AC_UL320_.jpg",
    "asin": "B09QFS1P4N",
    "badge": "Construcción Gamer"
  },
  {
    "id": "toy-lego-batman-batmovil",
    "title": "LEGO DC Batman - Batmóvil Persecución con Minifiguras Batman y Joker",
    "shortTitle": "LEGO Batman Batmóvil",
    "category": "lego",
    "categoryLabel": "LEGO & Bloques",
    "ages": [
      "7-9",
      "10-12",
      "13+"
    ],
    "imageUrl": "https://m.media-amazon.com/images/I/81e4V8M6N2L._AC_UL320_.jpg",
    "asin": "B0BBSK2Y7H",
    "badge": "Superhéroes"
  },
  {
    "id": "toy-camion-bloques-clemmy",
    "title": "Clementoni Clemmy - Camión de Volquete Blandito con Ruedas Suaves y Bloques",
    "shortTitle": "Clemmy Camión Blandito 2en1",
    "category": "coches",
    "categoryLabel": "Coches & Pistas",
    "ages": [
      "0-3",
      "4-6"
    ],
    "imageUrl": "/images/products/13-clemmy-bloques.jpg",
    "asin": "B07K66H6X9",
    "badge": "Ideal Bebés"
  },
  {
    "id": "toy-correpasillos-vintage-rojo",
    "title": "Correpasillos Vintage de Metal Rojo con Volante Funcional y Ruedas Goma",
    "shortTitle": "Correpasillos Vintage Metal",
    "category": "coches",
    "categoryLabel": "Coches & Pistas",
    "ages": [
      "0-3",
      "4-6"
    ],
    "imageUrl": "/images/products/13-correpasillos-vintage-retro-1.jpg",
    "asin": "B002KCV7X0",
    "badge": "Estilo Retro"
  },
  {
    "id": "toy-tren-madera-magnetico",
    "title": "Hape - Tren de Madera Magnético Clásico con Locomotora y 3 Vagones",
    "shortTitle": "Tren de Madera Magnético",
    "category": "coches",
    "categoryLabel": "Coches & Pistas",
    "ages": [
      "0-3",
      "4-6"
    ],
    "imageUrl": "/images/products/13-hape-banco-martillo-1.jpg",
    "asin": "B00TYD36XW",
    "badge": "Madera Natural"
  },
  {
    "id": "toy-set-coches-friccion-monstruo",
    "title": "Set de 4 Coches de Fricción Monster Truck con Suspensión para Niños",
    "shortTitle": "Pack 4 Monster Trucks Fricción",
    "category": "coches",
    "categoryLabel": "Coches & Pistas",
    "ages": [
      "0-3",
      "4-6"
    ],
    "imageUrl": "/images/products/46-carrera-mario-1.jpg",
    "asin": "B07W5PVF28",
    "badge": "Indestructible"
  },
  {
    "id": "toy-garaje-madera-tres-pisos",
    "title": "Garaje de Madera Infantil con 3 Plantas, Ascensor y Pista Helicóptero",
    "shortTitle": "Garaje Madera con Ascensor",
    "category": "coches",
    "categoryLabel": "Coches & Pistas",
    "ages": [
      "0-3",
      "4-6",
      "7-9"
    ],
    "imageUrl": "/images/products/13-cocina-hape-1.jpg",
    "asin": "B0042SYY8G",
    "badge": "Juego Simbólico"
  },
  {
    "id": "toy-hot-wheels-choques-aereos",
    "title": "Hot Wheels - Pista Choques Aéreos Giratoria Motorizada con 1 Coche",
    "shortTitle": "Hot Wheels Choques Aéreos",
    "category": "coches",
    "categoryLabel": "Coches & Pistas",
    "ages": [
      "4-6",
      "7-9",
      "10-12"
    ],
    "imageUrl": "/images/products/46-hot-wheels-choques-aereos-1.jpg",
    "asin": "B079KHHP8V",
    "badge": "Nº 1 en Pistas"
  },
  {
    "id": "toy-hot-wheels-garaje-gigante",
    "title": "Hot Wheels - Garaje Gigante con Parking para 100 Coches y Dragón T-Rex",
    "shortTitle": "Hot Wheels Garaje Gigante",
    "category": "coches",
    "categoryLabel": "Coches & Pistas",
    "ages": [
      "4-6",
      "7-9",
      "10-12"
    ],
    "imageUrl": "/images/products/46-hot-wheels-garaje-gigante-1.jpg",
    "asin": "B0841VR19G",
    "badge": "Top Regalo Reyes"
  },
  {
    "id": "toy-hot-wheels-pack-20",
    "title": "Hot Wheels - Pack de 20 Coches de Metal Fundido a Presión Surtidos",
    "shortTitle": "Hot Wheels Pack 20 Coches",
    "category": "coches",
    "categoryLabel": "Coches & Pistas",
    "ages": [
      "4-6",
      "7-9",
      "10-12",
      "13+"
    ],
    "imageUrl": "/images/products/46-hot-wheels-choques-1.jpg",
    "asin": "B0007DAT20",
    "badge": "Colección Clásica"
  },
  {
    "id": "toy-carrera-first-mario-kart",
    "title": "Carrera First - Circuito Eléctrico Mario Kart con Coches de Mario y Yoshi",
    "shortTitle": "Carrera First Mario Kart",
    "category": "coches",
    "categoryLabel": "Coches & Pistas",
    "ages": [
      "4-6",
      "7-9"
    ],
    "imageUrl": "/images/products/46-carrera-mario-1.jpg",
    "asin": "B079D8J7X1",
    "badge": "Mario Kart Oficial"
  },
  {
    "id": "toy-monster-truck-radiocontrol-hinchable",
    "title": "Monster Truck Teledirigido con Ruedas Hinchables Gigantes Anti-Impacto",
    "shortTitle": "Monster Truck Ruedas Gigantes",
    "category": "coches",
    "categoryLabel": "Coches & Pistas",
    "ages": [
      "4-6",
      "7-9",
      "10-12"
    ],
    "imageUrl": "/images/products/79-monster-truck-rc-gigante-1.jpg",
    "asin": "B07W5PVF29",
    "badge": "Rebota en Paredes"
  },
  {
    "id": "toy-camion-transportador-hot-wheels",
    "title": "Hot Wheels - Camión Megatransportador que se Convierte en Pista de 2m",
    "shortTitle": "Camión Megatransportador HW",
    "category": "coches",
    "categoryLabel": "Coches & Pistas",
    "ages": [
      "4-6",
      "7-9"
    ],
    "imageUrl": "/images/products/46-hot-wheels-choques-aereos-1.jpg",
    "asin": "B079KHHP8W",
    "badge": "2 en 1"
  },
  {
    "id": "toy-coche-acrobatico-360-led",
    "title": "Coche Acrobático Teledirigido 360 Grados Volteretas con Luces LED",
    "shortTitle": "Coche Acrobático 360º LED",
    "category": "coches",
    "categoryLabel": "Coches & Pistas",
    "ages": [
      "4-6",
      "7-9",
      "10-12"
    ],
    "imageUrl": "/images/products/79-coche-acrobatico-360-led-1.jpg",
    "asin": "B08HYG77Y7",
    "badge": "Acrobacias & Giro 360"
  },
  {
    "id": "toy-scalextric-compact-rally",
    "title": "Scalextric Compact - Rally Champions Pista de Carreras con Puente y 2 Coches",
    "shortTitle": "Scalextric Compact Rally",
    "category": "coches",
    "categoryLabel": "Coches & Pistas",
    "ages": [
      "7-9",
      "10-12",
      "13+"
    ],
    "imageUrl": "/images/products/79-scalextric-rally-champions-1.jpg",
    "asin": "B08HYZ87X1",
    "badge": "Pista Mítica"
  },
  {
    "id": "toy-carrera-go-dtm-speed",
    "title": "Carrera GO!!! - Circuito de Carreras DTM Speed con Mandos Turbo y Looping",
    "shortTitle": "Carrera GO DTM Speed",
    "category": "coches",
    "categoryLabel": "Coches & Pistas",
    "ages": [
      "7-9",
      "10-12",
      "13+"
    ],
    "imageUrl": "/images/products/79-carrera-go-dtm-speed-1.jpg",
    "asin": "B0859F5H1H",
    "badge": "Velocidad Turbo"
  },
  {
    "id": "toy-exost-coche-rc-todoterreno",
    "title": "Exost 360 Tornado - Coche Teledirigido Todoterreno con Bomba de Aire",
    "shortTitle": "Exost 360 Tornado Todoterreno",
    "category": "coches",
    "categoryLabel": "Coches & Pistas",
    "ages": [
      "7-9",
      "10-12",
      "13+"
    ],
    "imageUrl": "/images/products/79-coche-rc-exost-1.jpg",
    "asin": "B075T7Z7Y1",
    "badge": "Invencible"
  },
  {
    "id": "toy-dron-potensic-camara",
    "title": "Potensic - Mini Dron Teledirigido con Cámara 1080P HD y Despegue Fácil",
    "shortTitle": "Dron Potensic con Cámara HD",
    "category": "coches",
    "categoryLabel": "Coches & Pistas",
    "ages": [
      "7-9",
      "10-12",
      "13+"
    ],
    "imageUrl": "/images/products/1012-dron-potensic-1.jpg",
    "asin": "B0855G6H7J",
    "badge": "Vuelo Fácil"
  },
  {
    "id": "toy-coche-crawler-rocas-4x4",
    "title": "Coche Teledirigido Rock Crawler 4x4 con Amortiguadores y Luces Reales",
    "shortTitle": "Coche RC Rock Crawler 4x4",
    "category": "coches",
    "categoryLabel": "Coches & Pistas",
    "ages": [
      "7-9",
      "10-12",
      "13+"
    ],
    "imageUrl": "/images/products/79-monster-truck-rc-gigante-1.jpg",
    "asin": "B0855G6H7K",
    "badge": "Escala Rocas"
  },
  {
    "id": "toy-coche-rc-drift-4wd",
    "title": "Coche Teledirigido de Drift 4WD Escala 1:16 con Ruedas Lisas y de Agarre",
    "shortTitle": "Coche RC Drift 4WD Derrapes",
    "category": "coches",
    "categoryLabel": "Coches & Pistas",
    "ages": [
      "7-9",
      "10-12",
      "13+"
    ],
    "imageUrl": "/images/products/79-coche-rc-exost-1.jpg",
    "asin": "B09HYG88Z8",
    "badge": "Derrapes Espectaculares"
  },
  {
    "id": "toy-coche-rc-wltoys-buggy",
    "title": "WLtoys 124019 - Coche Teledirigido Profesional Buggy 55 km/h 4x4",
    "shortTitle": "Coche RC Buggy 55 km/h",
    "category": "coches",
    "categoryLabel": "Coches & Pistas",
    "ages": [
      "10-12",
      "13+"
    ],
    "imageUrl": "/images/products/18plus-coche-rc-wltoys-124019-buggy-1.jpg",
    "asin": "B08R92V7P7",
    "badge": "Super Alta Velocidad"
  },
  {
    "id": "toy-maqueta-delorean-regreso-al-futuro",
    "title": "Jada Toys - DeLorean Time Machine Regreso al Futuro Escala 1:24 Metal",
    "shortTitle": "DeLorean Regreso al Futuro 1:24",
    "category": "coches",
    "categoryLabel": "Coches & Pistas",
    "ages": [
      "10-12",
      "13+"
    ],
    "imageUrl": "https://m.media-amazon.com/images/I/71Y-e0q4XyL._AC_UL320_.jpg",
    "asin": "B0042SYY8H",
    "badge": "Maqueta Coleccionista"
  },
  {
    "id": "toy-scalextric-advance-digital",
    "title": "Scalextric Advance - Pista Digital con Mandos Inalámbricos y Adelantamientos",
    "shortTitle": "Scalextric Advance Digital",
    "category": "coches",
    "categoryLabel": "Coches & Pistas",
    "ages": [
      "10-12",
      "13+"
    ],
    "imageUrl": "/images/products/79-scalextric-compact-1.jpg",
    "asin": "B08HYZ87X2",
    "badge": "Competición Pro"
  },
  {
    "id": "toy-dji-mini-4k-dron",
    "title": "DJI Mini 4K - Dron Ultraligero con Vídeo 4K UHD, Gimbal 3 Ejes y Retorno GPS",
    "shortTitle": "DJI Mini 4K Dron Profesional",
    "category": "coches",
    "categoryLabel": "Coches & Pistas",
    "ages": [
      "10-12",
      "13+"
    ],
    "imageUrl": "/images/products/18plus-dji-mini-4k-dron-1.jpg",
    "asin": "B0D1PHR568",
    "badge": "Calidad Cine 4K"
  },
  {
    "id": "toy-coche-rc-brushless-todoterreno",
    "title": "Bezgar - Monster Truck RC Brushless 65 km/h con Chasis de Aluminio",
    "shortTitle": "Monster Truck Brushless 65km/h",
    "category": "coches",
    "categoryLabel": "Coches & Pistas",
    "ages": [
      "10-12",
      "13+"
    ],
    "imageUrl": "/images/products/18plus-coche-rc-wltoys-124019-buggy-1.jpg",
    "asin": "B08R92V7P8",
    "badge": "Motor Sin Escobillas"
  },
  {
    "id": "toy-lego-technic-bugatti-bolide",
    "title": "LEGO Technic - Coche de Carreras Bugatti Bolide con Dirección y Motor W16",
    "shortTitle": "LEGO Bugatti Bolide Technic",
    "category": "coches",
    "categoryLabel": "Coches & Pistas",
    "ages": [
      "10-12",
      "13+"
    ],
    "imageUrl": "https://m.media-amazon.com/images/I/81t5N8M4x3L._AC_UL320_.jpg",
    "asin": "B0BBRW874L",
    "badge": "Supercoche W16"
  },
  {
    "id": "toy-lego-technic-mclaren-senna",
    "title": "LEGO Technic - McLaren Senna GTR Superdeportivo con Puertas de Tijera",
    "shortTitle": "LEGO McLaren Senna GTR",
    "category": "coches",
    "categoryLabel": "Coches & Pistas",
    "ages": [
      "10-12",
      "13+"
    ],
    "imageUrl": "https://m.media-amazon.com/images/I/81m6P8Q4v1L._AC_UL320_.jpg",
    "asin": "B08G4QRV8C",
    "badge": "Aerodinámica GTR"
  },
  {
    "id": "toy-lego-technic-monster-truck-ford",
    "title": "LEGO Technic - Ford F-150 Raptor Camioneta Pick-Up Todoterreno 4x4",
    "shortTitle": "LEGO Ford F-150 Raptor",
    "category": "coches",
    "categoryLabel": "Coches & Pistas",
    "ages": [
      "10-12",
      "13+"
    ],
    "imageUrl": "https://m.media-amazon.com/images/I/81w4Q8P2n7L._AC_UL320_.jpg",
    "asin": "B08WWP68M2",
    "badge": "Pick-Up Gigante"
  },
  {
    "id": "toy-dron-fpv-acrobacias",
    "title": "Dron de Carreras FPV de Alta Velocidad con Protectores de Hélice 360",
    "shortTitle": "Dron FPV Carreras Alta Velocidad",
    "category": "coches",
    "categoryLabel": "Coches & Pistas",
    "ages": [
      "10-12",
      "13+"
    ],
    "imageUrl": "/images/products/1012-dron-potensic-2.jpg",
    "asin": "B0855G6H7L",
    "badge": "Vuelo Acrobático"
  },
  {
    "id": "toy-coche-rc-crawler-axial",
    "title": "Axial SCX24 - Micro Crawler RC Escala 1:24 Tracción Total 4WD",
    "shortTitle": "Axial SCX24 Micro Crawler",
    "category": "coches",
    "categoryLabel": "Coches & Pistas",
    "ages": [
      "10-12",
      "13+"
    ],
    "imageUrl": "/images/products/79-coche-rc-exost-2.jpg",
    "asin": "B09HYG88Z9",
    "badge": "Escala Detalle Pro"
  },
  {
    "id": "toy-volante-pedales-logitech-g29",
    "title": "Logitech G29 Driving Force - Volante de Carreras con Force Feedback y Pedales",
    "shortTitle": "Logitech G29 Volante Carreras",
    "category": "coches",
    "categoryLabel": "Coches & Pistas",
    "ages": [
      "10-12",
      "13+"
    ],
    "imageUrl": "/images/products/1618-logitech-g502-hero-1.jpg",
    "asin": "B00YUIM2J0",
    "badge": "Simulador Conducción"
  },
  {
    "id": "toy-hot-wheels-caja-aceleracion",
    "title": "Hot Wheels - Caja Lanzadora de Aceleración con 3 Looping y Tramo Recto",
    "shortTitle": "Hot Wheels Caja Lanzadora",
    "category": "coches",
    "categoryLabel": "Coches & Pistas",
    "ages": [
      "4-6",
      "7-9",
      "10-12"
    ],
    "imageUrl": "/images/products/46-hot-wheels-choques-1.jpg",
    "asin": "B079KHHP8X",
    "badge": "Pack Lanzador"
  },
  {
    "id": "toy-coche-anfibio-rc-agua-tierra",
    "title": "Coche Teledirigido Anfibio 4x4 Impermeable Conduce sobre Agua y Tierra",
    "shortTitle": "Coche RC Anfibio Agua y Nieve",
    "category": "coches",
    "categoryLabel": "Coches & Pistas",
    "ages": [
      "4-6",
      "7-9",
      "10-12",
      "13+"
    ],
    "imageUrl": "/images/products/79-coche-acrobatico-360-led-1.jpg",
    "asin": "B08HYG77Y8",
    "badge": "Sumergible"
  },
  {
    "id": "toy-circuito-tren-electrico-navideno",
    "title": "Tren Eléctrico Navideño para Árbol de Navidad con Humo Real, Luces y Sonido",
    "shortTitle": "Tren Navideño con Humo y Sonido",
    "category": "coches",
    "categoryLabel": "Coches & Pistas",
    "ages": [
      "4-6",
      "7-9",
      "10-12",
      "13+"
    ],
    "imageUrl": "/images/products/13-lego-duplo-tren-numeros-1.jpg",
    "asin": "B08W73SBCW",
    "badge": "Mágica Navidad"
  },
  {
    "id": "toy-pista-carreras-fluorescente-led",
    "title": "Magic Tracks - Pista de Carreras Flexible Fluorescente con Coche LED",
    "shortTitle": "Pista Flexible Mágica LED",
    "category": "coches",
    "categoryLabel": "Coches & Pistas",
    "ages": [
      "4-6",
      "7-9"
    ],
    "imageUrl": "/images/products/46-carrera-mario-2.jpg",
    "asin": "B079D8J7X2",
    "badge": "Brilla en la Oscuridad"
  },
  {
    "id": "toy-coche-teledirigido-policia-luces",
    "title": "Coche de Policía Teledirigido con Luces de Emergencia, Sirena y Sonidos",
    "shortTitle": "Coche Patrulla Policía RC",
    "category": "coches",
    "categoryLabel": "Coches & Pistas",
    "ages": [
      "4-6",
      "7-9"
    ],
    "imageUrl": "/images/products/79-coche-rc-exost-3.jpg",
    "asin": "B075T7Z7Y2",
    "badge": "Sirena Policial"
  },
  {
    "id": "toy-sophie-la-girafe",
    "title": "Sophie la Girafe - Mordedor de Caucho Natural 100% Hecho a Mano",
    "shortTitle": "Sophie la Girafe Mordedor",
    "category": "peluches",
    "categoryLabel": "Muñecas & Peluches",
    "ages": [
      "0-3"
    ],
    "imageUrl": "/images/products/012-sophie-la-girafe-1.jpg",
    "asin": "B00068668C",
    "badge": "Mundialmente Famoso"
  },
  {
    "id": "toy-nutria-fisher-price-suave",
    "title": "Fisher-Price - Nutria Hora de Dormir con Respiración Rítmica y Música",
    "shortTitle": "Nutria Hora de Dormir Fisher-Price",
    "category": "peluches",
    "categoryLabel": "Muñecas & Peluches",
    "ages": [
      "0-3",
      "4-6"
    ],
    "imageUrl": "/images/products/012-nutria-fisher-price-1.jpg",
    "asin": "B07N3821TC",
    "badge": "Efecto Calma Sueño"
  },
  {
    "id": "toy-buho-ruido-blanco-bebe",
    "title": "Búho de Peluche con Luz Quitamiedos y Ruido Blanco Sensor de Llanto",
    "shortTitle": "Peluche Búho Ruido Blanco",
    "category": "peluches",
    "categoryLabel": "Muñecas & Peluches",
    "ages": [
      "0-3"
    ],
    "imageUrl": "/images/products/bebe-buho-ruido-blanco-1.jpg",
    "asin": "B07XQ8T9F1",
    "badge": "Sensor de Llanto"
  },
  {
    "id": "toy-kaloo-doudou-conejo",
    "title": "Kaloo - Doudou Conejito de Peluche Suave en Caja de Regalo de Lujo",
    "shortTitle": "Kaloo Doudou Conejito",
    "category": "peluches",
    "categoryLabel": "Muñecas & Peluches",
    "ages": [
      "0-3"
    ],
    "imageUrl": "/images/products/bebe-kaloo-doudou-1.jpg",
    "asin": "B01C8G5W20",
    "badge": "Primer Peluche"
  },
  {
    "id": "toy-bitzee-mascota-digital",
    "title": "Bitzee - Mascota Digital Interactiva que Puedes Tocar en la Vida Real",
    "shortTitle": "Bitzee Mascota Digital",
    "category": "peluches",
    "categoryLabel": "Muñecas & Peluches",
    "ages": [
      "4-6",
      "7-9",
      "10-12"
    ],
    "imageUrl": "/images/products/46-bitzee-mascota-digital-1.jpg",
    "asin": "B0BN55M67G",
    "badge": "Juguete del Año"
  },
  {
    "id": "toy-furby-morado-interactivo",
    "title": "Furby - Juguete de Peluche Interactivo con 5 Modos de Voz y Luces",
    "shortTitle": "Furby Peluche Interactivo",
    "category": "peluches",
    "categoryLabel": "Muñecas & Peluches",
    "ages": [
      "4-6",
      "7-9",
      "10-12"
    ],
    "imageUrl": "/images/products/46-furby-interactivo-morado-1.jpg",
    "asin": "B0BSRN1K9P",
    "badge": "Voz & Baile"
  },
  {
    "id": "toy-pikachu-peluche-suave",
    "title": "Pokémon - Peluche de Pikachu Oficial de 30 cm Ultrasuave y Mullido",
    "shortTitle": "Peluche Pikachu Oficial 30cm",
    "category": "peluches",
    "categoryLabel": "Muñecas & Peluches",
    "ages": [
      "0-3",
      "4-6",
      "7-9",
      "10-12",
      "13+"
    ],
    "imageUrl": "/images/products/46-pikachu-peluche-1.jpg",
    "asin": "B07W5PVF30",
    "badge": "Favorito Pokémon"
  },
  {
    "id": "toy-perrito-interactivo-respira",
    "title": "Perrito de Peluche Interactivo que Duerme y Respira con Sonidos Reales",
    "shortTitle": "Perrito Peluche que Respira",
    "category": "peluches",
    "categoryLabel": "Muñecas & Peluches",
    "ages": [
      "0-3",
      "4-6",
      "7-9"
    ],
    "imageUrl": "/images/products/46-perrito-interactivo-respira-1.jpg",
    "asin": "B07K66H6YA",
    "badge": "Super Cariñoso"
  },
  {
    "id": "toy-barbie-sirena-luces",
    "title": "Barbie Dreamtopia - Muñeca Sirena Luces Brillantes con Cola Multicolor",
    "shortTitle": "Barbie Sirena Luces Brillantes",
    "category": "peluches",
    "categoryLabel": "Muñecas & Peluches",
    "ages": [
      "4-6",
      "7-9"
    ],
    "imageUrl": "/images/products/46-maletin-maquillaje-1.jpg",
    "asin": "B079KHS8J1",
    "badge": "Brilla Bajo el Agua"
  },
  {
    "id": "toy-baby-born-magico",
    "title": "Baby Born - Muñeco Bebé Mágico Interactivo con Ojos que se Cierran y Accesorios",
    "shortTitle": "Baby Born Bebé Mágico",
    "category": "peluches",
    "categoryLabel": "Muñecas & Peluches",
    "ages": [
      "4-6",
      "7-9"
    ],
    "imageUrl": "/images/products/46-vestido-princesa-accesorios-1.jpg",
    "asin": "B08W5B7P4Q",
    "badge": "Muñeco Clásico"
  },
  {
    "id": "toy-nancy-un-dia-belleza",
    "title": "Nancy - Un Día de Spa y Mascarillas con Accesorios y Camilla Plegable",
    "shortTitle": "Nancy Un Día de Spa",
    "category": "peluches",
    "categoryLabel": "Muñecas & Peluches",
    "ages": [
      "4-6",
      "7-9",
      "10-12"
    ],
    "imageUrl": "/images/products/46-maletin-maquillaje-2.jpg",
    "asin": "B09QFS876W",
    "badge": "Éxito Famosa"
  },
  {
    "id": "toy-peluche-stitch-disney",
    "title": "Disney Store - Peluche Stitch Oficial de Lilo y Stitch de 38 cm con Orejas Grandes",
    "shortTitle": "Peluche Stitch Disney 38cm",
    "category": "peluches",
    "categoryLabel": "Muñecas & Peluches",
    "ages": [
      "0-3",
      "4-6",
      "7-9",
      "10-12",
      "13+"
    ],
    "imageUrl": "/images/products/46-pijama-kigurumi-dinosaurio-1.jpg",
    "asin": "B079D19K27",
    "badge": "Super Suave"
  },
  {
    "id": "toy-rainbow-high-doll",
    "title": "Rainbow High - Muñeca Fashion Bella Parker con Ropa de Diseño y Peine",
    "shortTitle": "Rainbow High Fashion Doll",
    "category": "peluches",
    "categoryLabel": "Muñecas & Peluches",
    "ages": [
      "7-9",
      "10-12"
    ],
    "imageUrl": "/images/products/46-maletin-maquillaje-3.jpg",
    "asin": "B08WWZ2T3U",
    "badge": "Moda & Estilo"
  },
  {
    "id": "toy-monster-high-draculaura",
    "title": "Monster High - Muñeca Draculaura con Ropa Gótica de Moda y Mascota Murciélago",
    "shortTitle": "Monster High Draculaura",
    "category": "peluches",
    "categoryLabel": "Muñecas & Peluches",
    "ages": [
      "7-9",
      "10-12",
      "13+"
    ],
    "imageUrl": "/images/products/46-vestido-princesa-accesorios-1.jpg",
    "asin": "B0CGW4P7X3",
    "badge": "Gótico Chic"
  },
  {
    "id": "toy-squishmallow-axolote",
    "title": "Squishmallows - Peluche Gigante 40 cm Axolote Rosa Ultrasuave y Blandito",
    "shortTitle": "Squishmallows Axolote Gigante",
    "category": "peluches",
    "categoryLabel": "Muñecas & Peluches",
    "ages": [
      "4-6",
      "7-9",
      "10-12",
      "13+"
    ],
    "imageUrl": "/images/products/46-monstruo-colores-1.jpg",
    "asin": "B0BN55M67H",
    "badge": "Sensación Viral"
  },
  {
    "id": "toy-figura-charizard-pokemon",
    "title": "Pokémon - Figura de Batalla Interactiva Charizard con Llamas y Sonidos",
    "shortTitle": "Figura Charizard Fuego LED",
    "category": "peluches",
    "categoryLabel": "Muñecas & Peluches",
    "ages": [
      "7-9",
      "10-12",
      "13+"
    ],
    "imageUrl": "/images/products/46-pikachu-peluche-2.jpg",
    "asin": "B09QFS1N4Q",
    "badge": "Lanza Ataques"
  },
  {
    "id": "toy-transformers-optimus-prime",
    "title": "Transformers - Figura Articulada Optimus Prime Convertible en Camión",
    "shortTitle": "Transformers Optimus Prime",
    "category": "peluches",
    "categoryLabel": "Muñecas & Peluches",
    "ages": [
      "7-9",
      "10-12",
      "13+"
    ],
    "imageUrl": "https://m.media-amazon.com/images/I/81v5M9Q4x2L._AC_UL320_.jpg",
    "asin": "B09QFT1P7M",
    "badge": "Se Transforma"
  },
  {
    "id": "toy-star-wars-mandalorian-grogu",
    "title": "Star Wars The Black Series - Figura The Mandalorian con Grogu y Blaster",
    "shortTitle": "Figura Mandalorian con Grogu",
    "category": "peluches",
    "categoryLabel": "Muñecas & Peluches",
    "ages": [
      "7-9",
      "10-12",
      "13+"
    ],
    "imageUrl": "/images/products/18plus-lego-star-wars-casco-vader-1.jpg",
    "asin": "B07ND6CFH0",
    "badge": "Black Series"
  },
  {
    "id": "toy-funko-pop-harry-potter",
    "title": "Funko Pop! Harry Potter con Hedwig la Lechuza y Varita de Mago",
    "shortTitle": "Funko Pop! Harry Potter",
    "category": "peluches",
    "categoryLabel": "Muñecas & Peluches",
    "ages": [
      "7-9",
      "10-12",
      "13+"
    ],
    "imageUrl": "/images/products/1012-harry-potter-piedra-filosofal-1.jpg",
    "asin": "B079D19K28",
    "badge": "Coleccionable"
  },
  {
    "id": "toy-funko-pop-pikachu",
    "title": "Funko Pop! Pokémon - Pikachu en Posición de Combate Figura Vinilo",
    "shortTitle": "Funko Pop! Pikachu Combate",
    "category": "peluches",
    "categoryLabel": "Muñecas & Peluches",
    "ages": [
      "7-9",
      "10-12",
      "13+"
    ],
    "imageUrl": "/images/products/46-pikachu-peluche-3.jpg",
    "asin": "B07W5PVF31",
    "badge": "Edición Oficial"
  },
  {
    "id": "toy-funko-pop-spiderman",
    "title": "Funko Pop! Marvel - Spider-Man Traje Clásico Figura Vinilo Coleccionista",
    "shortTitle": "Funko Pop! Spider-Man",
    "category": "peluches",
    "categoryLabel": "Muñecas & Peluches",
    "ages": [
      "7-9",
      "10-12",
      "13+"
    ],
    "imageUrl": "/images/products/1618-spiderman-2-1.jpg",
    "asin": "B09QFS1N4R",
    "badge": "Marvel Clásico"
  },
  {
    "id": "toy-peluche-pokemon-gengar",
    "title": "Pokémon - Peluche Gengar de 30 cm de Terciopelo Suave con Sonrisa Pícara",
    "shortTitle": "Peluche Pokémon Gengar 30cm",
    "category": "peluches",
    "categoryLabel": "Muñecas & Peluches",
    "ages": [
      "7-9",
      "10-12",
      "13+"
    ],
    "imageUrl": "/images/products/46-pikachu-peluche.jpg",
    "asin": "B0BN55M67I",
    "badge": "Fantasma Favorito"
  },
  {
    "id": "toy-figura-tanjiro-demon-slayer",
    "title": "Banpresto - Figura Demon Slayer Tanjiro Kamado Colección Oficial 16 cm",
    "shortTitle": "Figura Tanjiro Demon Slayer",
    "category": "peluches",
    "categoryLabel": "Muñecas & Peluches",
    "ages": [
      "10-12",
      "13+"
    ],
    "imageUrl": "https://m.media-amazon.com/images/I/71Y-e0q4XyL._AC_UL320_.jpg",
    "asin": "B08WWL4GQR",
    "badge": "Anime Oficial"
  },
  {
    "id": "toy-figura-kakashi-naruto",
    "title": "Banpresto - Figura Naruto Shippuden Kakashi Hatake con Técnica Chidori",
    "shortTitle": "Figura Kakashi Chidori Naruto",
    "category": "peluches",
    "categoryLabel": "Muñecas & Peluches",
    "ages": [
      "10-12",
      "13+"
    ],
    "imageUrl": "https://m.media-amazon.com/images/I/71Y-e0q4XyL._AC_UL320_.jpg",
    "asin": "B09QFS8713",
    "badge": "Efecto Chidori"
  },
  {
    "id": "toy-figura-saitama-one-punch",
    "title": "Good Smile Company - Pop Up Parade Saitama One Punch Man Figura Colección",
    "shortTitle": "Figura Saitama One Punch Man",
    "category": "peluches",
    "categoryLabel": "Muñecas & Peluches",
    "ages": [
      "10-12",
      "13+"
    ],
    "imageUrl": "https://m.media-amazon.com/images/I/71Y-e0q4XyL._AC_UL320_.jpg",
    "asin": "B08G4QRV8D",
    "badge": "Pop Up Parade"
  },
  {
    "id": "toy-figura-luffy-one-piece",
    "title": "Banpresto - Figura One Piece Monkey D. Luffy Batalla con Sombrero de Paja",
    "shortTitle": "Figura Luffy One Piece 18cm",
    "category": "peluches",
    "categoryLabel": "Muñecas & Peluches",
    "ages": [
      "10-12",
      "13+"
    ],
    "imageUrl": "/images/products/1315-one-piece-tomo-1-1.jpg",
    "asin": "B0BBRW873L",
    "badge": "Rey de los Piratas"
  },
  {
    "id": "toy-figura-link-zelda",
    "title": "First 4 Figures - Estatua Coleccionista Link The Legend of Zelda Tears of the Kingdom",
    "shortTitle": "Estatua Link Zelda Tears Kingdom",
    "category": "peluches",
    "categoryLabel": "Muñecas & Peluches",
    "ages": [
      "10-12",
      "13+"
    ],
    "imageUrl": "/images/products/1618-meta-quest-3s-1.jpg",
    "asin": "B0C8G5W21",
    "badge": "Zelda Épico"
  },
  {
    "id": "toy-funko-pop-wednesday",
    "title": "Funko Pop! Miércoles Addams con Vestido Negro Rave'N Dance",
    "shortTitle": "Funko Pop! Miércoles Addams",
    "category": "peluches",
    "categoryLabel": "Muñecas & Peluches",
    "ages": [
      "10-12",
      "13+"
    ],
    "imageUrl": "/images/products/1012-invisible-eloy-moreno-1.jpg",
    "asin": "B0BSRN1K9Q",
    "badge": "Tendencia Netflix"
  },
  {
    "id": "toy-figura-iron-man-mark85",
    "title": "Hasbro Marvel Legends - Figura Articulada Iron Man Mark 85 con Nano-Guantelete",
    "shortTitle": "Marvel Legends Iron Man Mark 85",
    "category": "peluches",
    "categoryLabel": "Muñecas & Peluches",
    "ages": [
      "10-12",
      "13+"
    ],
    "imageUrl": "/images/products/18plus-lego-star-wars-casco-vader-1.jpg",
    "asin": "B08WWL4GQS",
    "badge": "Vengadores Endgame"
  },
  {
    "id": "toy-figura-batman-caballero-oscuro",
    "title": "McFarlane Toys - Figura Batman The Dark Knight Trilogy con Capa de Tela",
    "shortTitle": "Figura Batman Caballero Oscuro",
    "category": "peluches",
    "categoryLabel": "Muñecas & Peluches",
    "ages": [
      "10-12",
      "13+"
    ],
    "imageUrl": "/images/products/1618-spiderman-2-2.jpg",
    "asin": "B07ND6CFH1",
    "badge": "McFarlane Toys"
  },
  {
    "id": "toy-pokemon-caja-sobres-tcg",
    "title": "Pokémon TCG - Caja de Colección con Sobres de Cartas y Miniaturas Oficiales",
    "shortTitle": "Caja Cartas & Figuras Pokémon",
    "category": "peluches",
    "categoryLabel": "Muñecas & Peluches",
    "ages": [
      "7-9",
      "10-12",
      "13+"
    ],
    "imageUrl": "https://m.media-amazon.com/images/I/71Y-e0q4XyL._AC_UL320_.jpg",
    "asin": "B0H8SV3WJ8",
    "badge": "Colección Pokémon TCG"
  },
  {
    "id": "toy-lampara-pikachu-led-3d",
    "title": "Lámpara de Noche LED 3D Pokémon Pikachu con Cambio de 16 Colores y Mando",
    "shortTitle": "Lámpara LED Pikachu 3D",
    "category": "peluches",
    "categoryLabel": "Muñecas & Peluches",
    "ages": [
      "4-6",
      "7-9",
      "10-12",
      "13+"
    ],
    "imageUrl": "https://m.media-amazon.com/images/I/71r5T4X7L8L._AC_UL320_.jpg",
    "asin": "B07W5PVF32",
    "badge": "Luz de Habitación"
  },
  {
    "id": "toy-peluche-gigante-oso-100cm",
    "title": "Peluche Gigante Oso Teddy Clásico de 100 cm Suave con Lazo Navideño",
    "shortTitle": "Peluche Oso Teddy Gigante 1m",
    "category": "peluches",
    "categoryLabel": "Muñecas & Peluches",
    "ages": [
      "0-3",
      "4-6",
      "7-9",
      "10-12"
    ],
    "imageUrl": "/images/products/46-perrito-interactivo-respira-1.jpg",
    "asin": "B07K66H6YB",
    "badge": "Abrazo Gigante"
  },
  {
    "id": "toy-peluche-squishmallows-vaca",
    "title": "Squishmallows - Peluche Connor la Vaca Blanca y Negra de 30 cm",
    "shortTitle": "Squishmallows Connor la Vaca",
    "category": "peluches",
    "categoryLabel": "Muñecas & Peluches",
    "ages": [
      "0-3",
      "4-6",
      "7-9",
      "10-12",
      "13+"
    ],
    "imageUrl": "/images/products/46-monstruo-colores-2.jpg",
    "asin": "B0BN55M67J",
    "badge": "Ultra Blandito"
  },
  {
    "id": "toy-mando-consola-bebe",
    "title": "Fisher-Price - Mi Primer Mando de Consola con Luces y Canciones Educativas",
    "shortTitle": "Mando Consola Bebé Fisher-Price",
    "category": "gaming",
    "categoryLabel": "Gaming & Robótica",
    "ages": [
      "0-3",
      "4-6"
    ],
    "imageUrl": "/images/products/bebe-gimnasio-piano-1.jpg",
    "asin": "B07N3821TD",
    "badge": "Primeros Pasos Gamer"
  },
  {
    "id": "toy-robot-doc-educativo",
    "title": "Clementoni - Doc Robot Educativo Parlante para Aprender a Programar",
    "shortTitle": "Robot Educativo Doc Clementoni",
    "category": "gaming",
    "categoryLabel": "Gaming & Robótica",
    "ages": [
      "4-6",
      "7-9"
    ],
    "imageUrl": "/images/products/1012-makeblock-mbot-robot-1.jpg",
    "asin": "B07K66H6YC",
    "badge": "Robótica Infantil"
  },
  {
    "id": "toy-consola-retro-500-juegos",
    "title": "Consola Portátil Retro Arcade con 500 Juegos Clásicos y Pantalla a Color",
    "shortTitle": "Consola Retro Portátil 500 Juegos",
    "category": "gaming",
    "categoryLabel": "Gaming & Robótica",
    "ages": [
      "4-6",
      "7-9",
      "10-12",
      "13+"
    ],
    "imageUrl": "/images/products/1618-dualsense-edge-1.jpg",
    "asin": "B0BN55M67K",
    "badge": "500 Juegos Retro"
  },
  {
    "id": "toy-mando-switch-pikachu-led",
    "title": "PowerA - Mando Inalámbrico para Nintendo Switch Temática Pikachu con LED",
    "shortTitle": "Mando Switch Inalámbrico Pikachu",
    "category": "gaming",
    "categoryLabel": "Gaming & Robótica",
    "ages": [
      "4-6",
      "7-9",
      "10-12",
      "13+"
    ],
    "imageUrl": "/images/products/1618-estacion-carga-dualsense-1.jpg",
    "asin": "B07W5PVF33",
    "badge": "Pikachu Edition"
  },
  {
    "id": "toy-nintendo-switch-oled",
    "title": "Nintendo Switch Modelo OLED con Pantalla de 7 Pulgadas y Mandos Joy-Con",
    "shortTitle": "Nintendo Switch Modelo OLED",
    "category": "gaming",
    "categoryLabel": "Gaming & Robótica",
    "ages": [
      "7-9",
      "10-12",
      "13+"
    ],
    "imageUrl": "/images/products/1618-meta-quest-3s-1.jpg",
    "asin": "B098RKWHHZ",
    "badge": "Consola Favorita"
  },
  {
    "id": "toy-mario-kart-8-deluxe",
    "title": "Nintendo Switch - Mario Kart 8 Deluxe Juego de Carreras para Toda la Familia",
    "shortTitle": "Mario Kart 8 Deluxe Switch",
    "category": "gaming",
    "categoryLabel": "Gaming & Robótica",
    "ages": [
      "4-6",
      "7-9",
      "10-12",
      "13+"
    ],
    "imageUrl": "/images/products/1618-fc-25-1.jpg",
    "asin": "B01N223WHL",
    "badge": "Top 1 Ventas Juegos"
  },
  {
    "id": "toy-super-mario-bros-wonder",
    "title": "Nintendo Switch - Super Mario Bros. Wonder Nueva Aventura de Plataformas",
    "shortTitle": "Super Mario Bros. Wonder",
    "category": "gaming",
    "categoryLabel": "Gaming & Robótica",
    "ages": [
      "4-6",
      "7-9",
      "10-12",
      "13+"
    ],
    "imageUrl": "/images/products/1618-spiderman-2-1.jpg",
    "asin": "B0C8G5W22",
    "badge": "Mágico y Divertido"
  },
  {
    "id": "toy-minecraft-nintendo-switch",
    "title": "Minecraft - Edición Oficial para Nintendo Switch Construcción y Supervivencia",
    "shortTitle": "Minecraft Nintendo Switch",
    "category": "gaming",
    "categoryLabel": "Gaming & Robótica",
    "ages": [
      "7-9",
      "10-12",
      "13+"
    ],
    "imageUrl": "/images/products/1012-makeblock-mbot-robot-1.jpg",
    "asin": "B07D3NZCKL",
    "badge": "Creatividad Infinita"
  },
  {
    "id": "toy-makeblock-mbot-robot",
    "title": "Makeblock mBot - Kit de Robótica Educativa Programable con Bluetooth y Sensores",
    "shortTitle": "Makeblock mBot Robot STEM",
    "category": "gaming",
    "categoryLabel": "Gaming & Robótica",
    "ages": [
      "7-9",
      "10-12",
      "13+"
    ],
    "imageUrl": "/images/products/1012-makeblock-mbot-robot-1.jpg",
    "asin": "B00TYD36XX",
    "badge": "Aprende a Programar"
  },
  {
    "id": "toy-auriculares-gamer-led-rgb",
    "title": "Auriculares Gaming con Micrófono Cancelación de Ruido y Luces LED RGB para PS5/Switch",
    "shortTitle": "Auriculares Gamer LED RGB",
    "category": "gaming",
    "categoryLabel": "Gaming & Robótica",
    "ages": [
      "7-9",
      "10-12",
      "13+"
    ],
    "imageUrl": "/images/products/1618-sony-auriculares-pulse-3d-1.jpg",
    "asin": "B076GT6XJ9",
    "badge": "Sonido Envolvente"
  },
  {
    "id": "toy-logitech-g435-wireless",
    "title": "Logitech G435 LIGHTSPEED - Auriculares Inalámbricos Ultraligeros de 165g",
    "shortTitle": "Logitech G435 Inalámbricos",
    "category": "gaming",
    "categoryLabel": "Gaming & Robótica",
    "ages": [
      "7-9",
      "10-12",
      "13+"
    ],
    "imageUrl": "/images/products/1315-jbl-tune-510bt-1.jpg",
    "asin": "B08R92V7P9",
    "badge": "Ultraligeros"
  },
  {
    "id": "toy-mando-xbox-inalambrico",
    "title": "Microsoft - Mando Inalámbrico Xbox Serie X/S Compatible con PC y Consola",
    "shortTitle": "Mando Inalámbrico Xbox Robot White",
    "category": "gaming",
    "categoryLabel": "Gaming & Robótica",
    "ages": [
      "7-9",
      "10-12",
      "13+"
    ],
    "imageUrl": "/images/products/1618-dualsense-edge-2.jpg",
    "asin": "B08DF248HZ",
    "badge": "Ergonomía Total"
  },
  {
    "id": "toy-raton-logitech-g502",
    "title": "Logitech G502 HERO - Ratón Gaming de Alta Precisión 25.600 DPI con Pesas",
    "shortTitle": "Ratón Gaming Logitech G502 HERO",
    "category": "gaming",
    "categoryLabel": "Gaming & Robótica",
    "ages": [
      "7-9",
      "10-12",
      "13+"
    ],
    "imageUrl": "/images/products/1618-logitech-g502-hero-1.jpg",
    "asin": "B07W4DH7B6",
    "badge": "El Ratón Más Vendido"
  },
  {
    "id": "toy-teclado-mecanico-rgb",
    "title": "Logitech G413 SE - Teclado Mecánico Gaming con Interruptores Táctiles y Teclas PBT",
    "shortTitle": "Teclado Mecánico Gaming RGB",
    "category": "gaming",
    "categoryLabel": "Gaming & Robótica",
    "ages": [
      "10-12",
      "13+"
    ],
    "imageUrl": "/images/products/1618-logitech-g413-se-1.jpg",
    "asin": "B098RKWHI0",
    "badge": "Respuesta Rápida"
  },
  {
    "id": "toy-alfombrilla-rgb-xxl",
    "title": "SteelSeries QcK Prism XL - Alfombrilla de Ratón Gaming con Iluminación RGB",
    "shortTitle": "Alfombrilla Gaming XXL RGB",
    "category": "gaming",
    "categoryLabel": "Gaming & Robótica",
    "ages": [
      "10-12",
      "13+"
    ],
    "imageUrl": "/images/products/1618-steelseries-qck-prism-xl-1.jpg",
    "asin": "B07HZL4K3X",
    "badge": "Espacio Total"
  },
  {
    "id": "toy-ea-fc-25-ps5",
    "title": "EA SPORTS FC 25 - El Simulador de Fútbol Definitivo para PlayStation 5",
    "shortTitle": "EA SPORTS FC 25 PS5",
    "category": "gaming",
    "categoryLabel": "Gaming & Robótica",
    "ages": [
      "10-12",
      "13+"
    ],
    "imageUrl": "/images/products/1618-ea-sports-fc-25-ps5-1.jpg",
    "asin": "B0D1PHR569",
    "badge": "Fútbol Estrella"
  },
  {
    "id": "toy-hogwarts-legacy-ps5",
    "title": "Warner Bros - Hogwarts Legacy Juego de Aventura Mágica en Mundo Abierto para PS5",
    "shortTitle": "Hogwarts Legacy PS5",
    "category": "gaming",
    "categoryLabel": "Gaming & Robótica",
    "ages": [
      "10-12",
      "13+"
    ],
    "imageUrl": "/images/products/1618-hogwarts-legacy-ps5-1.jpg",
    "asin": "B09QFT1P7N",
    "badge": "Mundo Mágico"
  },
  {
    "id": "toy-spiderman-2-ps5",
    "title": "Sony PlayStation - Marvel's Spider-Man 2 con Peter Parker y Miles Morales",
    "shortTitle": "Marvel's Spider-Man 2 PS5",
    "category": "gaming",
    "categoryLabel": "Gaming & Robótica",
    "ages": [
      "10-12",
      "13+"
    ],
    "imageUrl": "/images/products/1618-spiderman-2-1.jpg",
    "asin": "B0C8G5W23",
    "badge": "Acción Exclusiva"
  },
  {
    "id": "toy-elden-ring-ps5",
    "title": "Bandai Namco - Elden Ring Shadow of the Erdtree Juego de Acción y Rol Épico",
    "shortTitle": "Elden Ring PS5",
    "category": "gaming",
    "categoryLabel": "Gaming & Robótica",
    "ages": [
      "13+"
    ],
    "imageUrl": "/images/products/1618-elden-ring-1.jpg",
    "asin": "B07FP6ZW80",
    "badge": "Juego del Año"
  },
  {
    "id": "toy-meta-quest-3s",
    "title": "Meta Quest 3S - Gafas de Realidad Virtual Todo en Uno 128 GB con Batman Arkham",
    "shortTitle": "Meta Quest 3S Realidad Virtual",
    "category": "gaming",
    "categoryLabel": "Gaming & Robótica",
    "ages": [
      "10-12",
      "13+"
    ],
    "imageUrl": "/images/products/1618-meta-quest-3s-1.jpg",
    "asin": "B0D1PHR570",
    "badge": "Experiencia Inmersiva"
  },
  {
    "id": "toy-mando-dualsense-edge",
    "title": "PlayStation 5 - Mando Inalámbrico DualSense Edge Profesional Personalizable",
    "shortTitle": "Mando Pro DualSense Edge PS5",
    "category": "gaming",
    "categoryLabel": "Gaming & Robótica",
    "ages": [
      "10-12",
      "13+"
    ],
    "imageUrl": "/images/products/1618-dualsense-edge-1.jpg",
    "asin": "B0BN55M67L",
    "badge": "Pro Gaming"
  },
  {
    "id": "toy-auriculares-pulse-3d",
    "title": "Sony - Auriculares Inalámbricos Pulse 3D para PlayStation 5 con Audio Espacial",
    "shortTitle": "Auriculares Sony Pulse 3D PS5",
    "category": "gaming",
    "categoryLabel": "Gaming & Robótica",
    "ages": [
      "10-12",
      "13+"
    ],
    "imageUrl": "/images/products/1618-sony-auriculares-pulse-3d-1.jpg",
    "asin": "B08H93ZRK9",
    "badge": "Audio Tempest 3D"
  },
  {
    "id": "toy-tira-neon-govee-rgbic",
    "title": "Govee - Tira de Luz Neón LED RGBIC Flexible para Escritorio Gaming 3m",
    "shortTitle": "Tira Neón LED RGBIC Govee",
    "category": "gaming",
    "categoryLabel": "Gaming & Robótica",
    "ages": [
      "10-12",
      "13+"
    ],
    "imageUrl": "/images/products/1618-govee-neon-1.jpg",
    "asin": "B09HYG88ZA",
    "badge": "Setup Iluminado"
  },
  {
    "id": "toy-barra-luz-monitor-quntis",
    "title": "Quntis - Barra de Luz para Pantalla de Ordenador con Ajuste de Temperatura",
    "shortTitle": "Barra de Luz Monitor Gaming",
    "category": "gaming",
    "categoryLabel": "Gaming & Robótica",
    "ages": [
      "10-12",
      "13+"
    ],
    "imageUrl": "/images/products/1618-quntis-barra-luz-monitor-1.jpg",
    "asin": "B0855G6H7M",
    "badge": "Protección Ocular"
  },
  {
    "id": "toy-altavoz-jbl-flip-6",
    "title": "JBL Flip 6 - Altavoz Bluetooth Portátil Resistente al Agua y Polvo IP67",
    "shortTitle": "JBL Flip 6 Altavoz Bluetooth",
    "category": "gaming",
    "categoryLabel": "Gaming & Robótica",
    "ages": [
      "10-12",
      "13+"
    ],
    "imageUrl": "/images/products/1618-jbl-flip-6-1.jpg",
    "asin": "B09HYG77Y9",
    "badge": "Graves Potentes"
  },
  {
    "id": "toy-altavoz-jbl-go-3",
    "title": "JBL Go 3 - Mini Altavoz Bluetooth Portátil Resistente al Agua con Gancho",
    "shortTitle": "JBL Go 3 Altavoz Portátil",
    "category": "gaming",
    "categoryLabel": "Gaming & Robótica",
    "ages": [
      "7-9",
      "10-12",
      "13+"
    ],
    "imageUrl": "/images/products/1315-jbl-go-3-altavoz-bluetooth-1.jpg",
    "asin": "B08HYG77ZA",
    "badge": "Bolsillo & Música"
  },
  {
    "id": "toy-auriculares-anker-q30",
    "title": "Anker Soundcore Life Q30 - Auriculares con Cancelación de Ruido Activa Híbrida",
    "shortTitle": "Soundcore Life Q30 Cancelación",
    "category": "gaming",
    "categoryLabel": "Gaming & Robótica",
    "ages": [
      "10-12",
      "13+"
    ],
    "imageUrl": "/images/products/1315-anker-q30-1.jpg",
    "asin": "B08HMWZBXC",
    "badge": "Batería 40 Horas"
  },
  {
    "id": "toy-aro-luz-tripode-tiktok",
    "title": "Aro de Luz LED de 10 Pulgadas con Trípode Extensible y Mando Bluetooth",
    "shortTitle": "Aro de Luz Trípode TikTok",
    "category": "gaming",
    "categoryLabel": "Gaming & Robótica",
    "ages": [
      "10-12",
      "13+"
    ],
    "imageUrl": "/images/products/1315-aro-luz-tripode-tiktok-1.jpg",
    "asin": "B0BN55M67M",
    "badge": "Vídeos & Fotos"
  },
  {
    "id": "toy-camara-fujifilm-instax-mini",
    "title": "Fujifilm Instax Mini 12 - Cámara Instantánea de Fotos con Espejo Selfie",
    "shortTitle": "Fujifilm Instax Mini 12",
    "category": "gaming",
    "categoryLabel": "Gaming & Robótica",
    "ages": [
      "7-9",
      "10-12",
      "13+"
    ],
    "imageUrl": "/images/products/1315-fujifilm-instax-mini-12-1.jpg",
    "asin": "B0BV75Q88V",
    "badge": "Fotos en Papel al Momento"
  },
  {
    "id": "toy-impresora-bolsillo-bluetooth",
    "title": "Mini Impresora Térmica de Bolsillo Inalámbrica para Pegatinas y Fotos",
    "shortTitle": "Mini Impresora Pegatinas Móvil",
    "category": "gaming",
    "categoryLabel": "Gaming & Robótica",
    "ages": [
      "7-9",
      "10-12",
      "13+"
    ],
    "imageUrl": "/images/products/1315-impresora-bolsillo-bluetooth-1.jpg",
    "asin": "B09HYG88ZB",
    "badge": "Sin Tinta"
  },
  {
    "id": "toy-estacion-carga-dualsense",
    "title": "Estación de Carga Rápida Doble para Mandos PlayStation 5 DualSense",
    "shortTitle": "Base de Carga Mandos PS5",
    "category": "gaming",
    "categoryLabel": "Gaming & Robótica",
    "ages": [
      "10-12",
      "13+"
    ],
    "imageUrl": "/images/products/1618-estacion-carga-dualsense-1.jpg",
    "asin": "B08H99BPJN",
    "badge": "Siempre Listos"
  },
  {
    "id": "toy-kit-arduino-robotica-elegoo",
    "title": "ELEGOO - Kit de Inicio Completo Arduino Uno R3 con 63 Componentes y Sensores",
    "shortTitle": "Kit Arduino Uno Robótica",
    "category": "gaming",
    "categoryLabel": "Gaming & Robótica",
    "ages": [
      "10-12",
      "13+"
    ],
    "imageUrl": "/images/products/18plus-elegoo-arduino-kit-robotica-1.jpg",
    "asin": "B01EI0Z55K",
    "badge": "Electrónica Real"
  },
  {
    "id": "toy-pokemon-etb-tcg",
    "title": "Pokémon TCG - Elite Trainer Box Caja Entrenador Élite 9 Sobres y Dados",
    "shortTitle": "Pokémon Caja Entrenador Élite",
    "category": "gaming",
    "categoryLabel": "Gaming & Robótica",
    "ages": [
      "7-9",
      "10-12",
      "13+"
    ],
    "imageUrl": "https://m.media-amazon.com/images/I/61piIn+zJlL._AC_UL320_.jpg",
    "asin": "B0H8SV3WJ8",
    "badge": "Cartas de Colección"
  },
  {
    "id": "toy-pokemon-album-400-cartas",
    "title": "Álbum Archivador de Cartas Pokémon con 400 Bolsillos y Fundas Impermeables",
    "shortTitle": "Álbum Archivador 400 Cartas",
    "category": "gaming",
    "categoryLabel": "Gaming & Robótica",
    "ages": [
      "7-9",
      "10-12",
      "13+"
    ],
    "imageUrl": "https://m.media-amazon.com/images/I/71r5T4X7L8L._AC_UL320_.jpg",
    "asin": "B08HYG77ZB",
    "badge": "Organiza tu Mazo"
  },
  {
    "id": "toy-mi-primer-frutal-haba",
    "title": "HABA - Mi Primer Frutal Juego Cooperativo de Madera para Bebés",
    "shortTitle": "Mi Primer Frutal HABA",
    "category": "juegos",
    "categoryLabel": "Juegos de Mesa",
    "ages": [
      "0-3",
      "4-6"
    ],
    "imageUrl": "/images/products/13-hape-banco-martillo-1.jpg",
    "asin": "B0032W8A70",
    "badge": "Cooperativo Nº 1"
  },
  {
    "id": "toy-monstruo-colores-juego",
    "title": "Devir - El Monstruo de Colores Juego de Mesa de Inteligencia Emocional",
    "shortTitle": "El Monstruo de Colores Juego",
    "category": "juegos",
    "categoryLabel": "Juegos de Mesa",
    "ages": [
      "4-6",
      "7-9"
    ],
    "imageUrl": "/images/products/46-monstruo-colores-1.jpg",
    "asin": "B07K66H6YD",
    "badge": "Emociones & Familia"
  },
  {
    "id": "toy-dobble-kids-infantil",
    "title": "Asmodee - Dobble Kids Juego de Rapidez y Reflejos en Lata Metálica",
    "shortTitle": "Dobble Kids Juego de Reflejos",
    "category": "juegos",
    "categoryLabel": "Juegos de Mesa",
    "ages": [
      "4-6",
      "7-9",
      "10-12"
    ],
    "imageUrl": "/images/products/46-dobble-kids-1.jpg",
    "asin": "B008DW66Z6",
    "badge": "Partidas Rápidas"
  },
  {
    "id": "toy-conecta-4-hasbro",
    "title": "Hasbro Gaming - Conecta 4 Juego de Estrategia Clásico de Fichas",
    "shortTitle": "Conecta 4 Clásico Hasbro",
    "category": "juegos",
    "categoryLabel": "Juegos de Mesa",
    "ages": [
      "4-6",
      "7-9",
      "10-12",
      "13+"
    ],
    "imageUrl": "/images/products/46-conecta-4-clasico-1.jpg",
    "asin": "B00000IZGU",
    "badge": "Clásico Imbatible"
  },
  {
    "id": "toy-quien-es-quien-hasbro",
    "title": "Hasbro Gaming - ¿Quién es Quién? El Juego Clásico de Adivinar Personajes",
    "shortTitle": "¿Quién es Quién? Clásico",
    "category": "juegos",
    "categoryLabel": "Juegos de Mesa",
    "ages": [
      "4-6",
      "7-9",
      "10-12"
    ],
    "imageUrl": "/images/products/46-conecta-4-clasico-1.jpg",
    "asin": "B00000IWH8",
    "badge": "Adivina el Rostro"
  },
  {
    "id": "toy-tragabolas-hasbro",
    "title": "Hasbro Gaming - Tragabolas Juego Infantil de Hipopótamos Hambrientos",
    "shortTitle": "Tragabolas Clásico Hasbro",
    "category": "juegos",
    "categoryLabel": "Juegos de Mesa",
    "ages": [
      "4-6",
      "7-9"
    ],
    "imageUrl": "/images/products/46-carrera-mario-1.jpg",
    "asin": "B00005C5H4",
    "badge": "Risas Garantizadas"
  },
  {
    "id": "toy-jenga-clasico-hasbro",
    "title": "Hasbro Gaming - Jenga Juego Clásico de Bloques de Madera para Torre",
    "shortTitle": "Jenga Bloques de Madera",
    "category": "juegos",
    "categoryLabel": "Juegos de Mesa",
    "ages": [
      "4-6",
      "7-9",
      "10-12",
      "13+"
    ],
    "imageUrl": "/images/products/13-hape-banco-martillo-1.jpg",
    "asin": "B00840QCQI",
    "badge": "Tensión & Habilidad"
  },
  {
    "id": "toy-virus-el-juego-cartas",
    "title": "Tranjis Games - Virus! El Juego de Cartas Más Contagioso de España",
    "shortTitle": "Virus! Juego de Cartas",
    "category": "juegos",
    "categoryLabel": "Juegos de Mesa",
    "ages": [
      "7-9",
      "10-12",
      "13+"
    ],
    "imageUrl": "/images/products/1012-virus-1.jpg",
    "asin": "B00V351W2W",
    "badge": "Nº 1 Más Vendido"
  },
  {
    "id": "toy-virus-2-evolution",
    "title": "Tranjis Games - Virus! 2 Evolution Expansión con Órganos Mutados y Virus",
    "shortTitle": "Virus! 2 Evolution Expansión",
    "category": "juegos",
    "categoryLabel": "Juegos de Mesa",
    "ages": [
      "7-9",
      "10-12",
      "13+"
    ],
    "imageUrl": "/images/products/1012-virus-2-evolution-1.jpg",
    "asin": "B07H8151D8",
    "badge": "Más Mutaciones"
  },
  {
    "id": "toy-fantasma-blitz-juego",
    "title": "Devir - Fantasma Blitz Juego de Agilidad Mental y Reflejos con Figuras",
    "shortTitle": "Fantasma Blitz Juego de Mesa",
    "category": "juegos",
    "categoryLabel": "Juegos de Mesa",
    "ages": [
      "7-9",
      "10-12",
      "13+"
    ],
    "imageUrl": "/images/products/79-fantasma-blitz-1.jpg",
    "asin": "B004BR72L8",
    "badge": "Súper Dinámico"
  },
  {
    "id": "toy-dixit-juego-imaginacion",
    "title": "Asmodee - Dixit Juego de Mesa y Creatividad con 84 Cartas Ilustradas de Ensueño",
    "shortTitle": "Dixit Juego Creativo Ilustrado",
    "category": "juegos",
    "categoryLabel": "Juegos de Mesa",
    "ages": [
      "7-9",
      "10-12",
      "13+"
    ],
    "imageUrl": "/images/products/79-dixit-1.jpg",
    "asin": "B08DHKQ66K",
    "badge": "Juego del Año Spiel des Jahres"
  },
  {
    "id": "toy-catan-junior",
    "title": "Devir - Catan Junior El Juego de Mesa de Piratas y Comercio para Niños",
    "shortTitle": "Catan Junior de Piratas",
    "category": "juegos",
    "categoryLabel": "Juegos de Mesa",
    "ages": [
      "7-9",
      "10-12",
      "13+"
    ],
    "imageUrl": "/images/products/79-catan-junior-1.jpg",
    "asin": "B008ZCGM24",
    "badge": "Iniciación Estrategia"
  },
  {
    "id": "toy-magia-borras-100",
    "title": "Educa - Magia Borrás 100 Trucos con Varita Mágica y Libro de Secretos",
    "shortTitle": "Magia Borrás 100 Trucos",
    "category": "juegos",
    "categoryLabel": "Juegos de Mesa",
    "ages": [
      "7-9",
      "10-12"
    ],
    "imageUrl": "/images/products/79-magia-borras-100-1.jpg",
    "asin": "B002KCV7X1",
    "badge": "Clásico de la Ilusión"
  },
  {
    "id": "toy-magia-borras-150",
    "title": "Educa - Magia Borrás 150 Trucos con Trucos de Cuerdas, Cartas y Mentalismo",
    "shortTitle": "Magia Borrás 150 Trucos",
    "category": "juegos",
    "categoryLabel": "Juegos de Mesa",
    "ages": [
      "7-9",
      "10-12",
      "13+"
    ],
    "imageUrl": "/images/products/1012-magia-borras-150-1.jpg",
    "asin": "B0042SYY8I",
    "badge": "Nivel Avanzado"
  },
  {
    "id": "toy-carcassonne-juego-clasico",
    "title": "Devir - Carcassonne Juego de Mesa de Losetas Medievales, Castillos y Caminos",
    "shortTitle": "Carcassonne Juego Clásico",
    "category": "juegos",
    "categoryLabel": "Juegos de Mesa",
    "ages": [
      "7-9",
      "10-12",
      "13+"
    ],
    "imageUrl": "/images/products/1012-carcassonne-1.jpg",
    "asin": "B00OX04ZMY",
    "badge": "Estrategia Fácil"
  },
  {
    "id": "toy-exploding-kittens-original",
    "title": "Exploding Kittens - Juego de Cartas Rápido y Traicionero de Gatitos Explosivos",
    "shortTitle": "Exploding Kittens Juego",
    "category": "juegos",
    "categoryLabel": "Juegos de Mesa",
    "ages": [
      "7-9",
      "10-12",
      "13+"
    ],
    "imageUrl": "/images/products/1012-exploding-kittens-original-1.jpg",
    "asin": "B010TQY7A8",
    "badge": "Risas Aseguradas"
  },
  {
    "id": "toy-7-wonders-architects",
    "title": "Repos Production - 7 Wonders Architects Juego Rápido de Construcción de Maravillas",
    "shortTitle": "7 Wonders Architects",
    "category": "juegos",
    "categoryLabel": "Juegos de Mesa",
    "ages": [
      "7-9",
      "10-12",
      "13+"
    ],
    "imageUrl": "/images/products/1012-7-wonders-architects-1.jpg",
    "asin": "B09DFH5Z7X",
    "badge": "Maravillas del Mundo"
  },
  {
    "id": "toy-escape-room-familiar",
    "title": "Diset - Escape Room The Game Edición Familiar con Decodificador y 3 Aventuras",
    "shortTitle": "Escape Room The Game Familiar",
    "category": "juegos",
    "categoryLabel": "Juegos de Mesa",
    "ages": [
      "7-9",
      "10-12",
      "13+"
    ],
    "imageUrl": "/images/products/1012-escape-room-the-game-familiar-1.jpg",
    "asin": "B079D19K29",
    "badge": "Resuelve Enigmas"
  },
  {
    "id": "toy-baraja-bicycle-trucos",
    "title": "Bicycle - Baraja Rider Back Profesional para Ilusionismo y Magia de Cerca",
    "shortTitle": "Baraja Bicycle Magia Pro",
    "category": "juegos",
    "categoryLabel": "Juegos de Mesa",
    "ages": [
      "7-9",
      "10-12",
      "13+"
    ],
    "imageUrl": "/images/products/79-baraja-magia-bicycle-trucos-1.jpg",
    "asin": "B00005049T",
    "badge": "Cartomagia Oficial"
  },
  {
    "id": "toy-monopoly-tramposos",
    "title": "Hasbro Gaming - Monopoly Edición para Tramposos con Esposas Reales y Trampas",
    "shortTitle": "Monopoly para Tramposos",
    "category": "juegos",
    "categoryLabel": "Juegos de Mesa",
    "ages": [
      "7-9",
      "10-12",
      "13+"
    ],
    "imageUrl": "/images/products/46-conecta-4-clasico-1.jpg",
    "asin": "B07B576Z8G",
    "badge": "Haz Trampa y Gana"
  },
  {
    "id": "toy-puzle-1000-harry-potter",
    "title": "Ravensburger - Puzle de 1000 Piezas Harry Potter Mapa del Merodeador",
    "shortTitle": "Puzle 1000pz Harry Potter",
    "category": "juegos",
    "categoryLabel": "Juegos de Mesa",
    "ages": [
      "10-12",
      "13+"
    ],
    "imageUrl": "/images/products/1012-harry-potter-piedra-filosofal-1.jpg",
    "asin": "B07ND6CFH2",
    "badge": "Tecnología Softclick"
  },
  {
    "id": "toy-catan-clasico",
    "title": "Devir - Catan El Juego de Mesa de Estrategia y Negociación Clásico",
    "shortTitle": "Catan Juego de Mesa Clásico",
    "category": "juegos",
    "categoryLabel": "Juegos de Mesa",
    "ages": [
      "10-12",
      "13+"
    ],
    "imageUrl": "/images/products/1315-catan-clasico-1.jpg",
    "asin": "B000W7D7EC",
    "badge": "Icono de los Juegos"
  },
  {
    "id": "toy-catan-ciudades-caballeros",
    "title": "Devir - Catan Expansión Ciudades y Caballeros con Bárbaros y Murallas",
    "shortTitle": "Catan Ciudades & Caballeros",
    "category": "juegos",
    "categoryLabel": "Juegos de Mesa",
    "ages": [
      "10-12",
      "13+"
    ],
    "imageUrl": "/images/products/1315-catan-ciudades-caballeros-1.jpg",
    "asin": "B000W7D7ED",
    "badge": "Expansión Épica"
  },
  {
    "id": "toy-wingspan-juego-aves",
    "title": "Maldito Games - Wingspan Juego de Mesa Estratégico de Aves y Ecosistemas",
    "shortTitle": "Wingspan Juego de Estrategia",
    "category": "juegos",
    "categoryLabel": "Juegos de Mesa",
    "ages": [
      "10-12",
      "13+"
    ],
    "imageUrl": "/images/products/18plus-wingspan-juego-mesa-1.jpg",
    "asin": "B07P88H4K6",
    "badge": "Premio Kennerspiel"
  },
  {
    "id": "toy-terraforming-mars",
    "title": "Maldito Games - Terraforming Mars Juego de Estrategia de Colonización Espacial",
    "shortTitle": "Terraforming Mars Estrategia",
    "category": "juegos",
    "categoryLabel": "Juegos de Mesa",
    "ages": [
      "13+"
    ],
    "imageUrl": "/images/products/18plus-terraforming-mars-juego-1.jpg",
    "asin": "B01GSYA4K2",
    "badge": "Estrategia Profunda"
  },
  {
    "id": "toy-codigo-secreto",
    "title": "Devir - Código Secreto (Codenames) Juego de Palabras y Espías por Equipos",
    "shortTitle": "Código Secreto (Codenames)",
    "category": "juegos",
    "categoryLabel": "Juegos de Mesa",
    "ages": [
      "10-12",
      "13+"
    ],
    "imageUrl": "/images/products/1012-virus-1.jpg",
    "asin": "B014Q1XX9S",
    "badge": "Fiesta & Espías"
  },
  {
    "id": "toy-fallera-calavera",
    "title": "Zombi Paella - La Fallera Calavera Juego de Cartas Rápido y Divertido",
    "shortTitle": "La Fallera Calavera Cartas",
    "category": "juegos",
    "categoryLabel": "Juegos de Mesa",
    "ages": [
      "10-12",
      "13+"
    ],
    "imageUrl": "/images/products/1012-virus-2.jpg",
    "asin": "B00NQ3P6S8",
    "badge": "Humor Zombie"
  },
  {
    "id": "toy-guatafac-juego-fiesta",
    "title": "Guatafac - ¿Unos Verdes? Juego de Cartas de Respuestas Rápidas en 8 Segundos",
    "shortTitle": "Guatafac Juego de Risas",
    "category": "juegos",
    "categoryLabel": "Juegos de Mesa",
    "ages": [
      "13+"
    ],
    "imageUrl": "/images/products/18plus-guatafac-juego-fiesta-1.jpg",
    "asin": "B07VF7J9Q8",
    "badge": "Partidas de Risas"
  },
  {
    "id": "toy-puzle-1000-panorama-starwars",
    "title": "Clementoni - Puzle de 1000 Piezas Formato Panorama Star Wars Galaxia",
    "shortTitle": "Puzle 1000pz Panorama Star Wars",
    "category": "juegos",
    "categoryLabel": "Juegos de Mesa",
    "ages": [
      "10-12",
      "13+"
    ],
    "imageUrl": "/images/products/18plus-lego-star-wars-casco-vader-1.jpg",
    "asin": "B07FP6ZW81",
    "badge": "Panorama Gigante"
  },
  {
    "id": "toy-ajedrez-madera-artesanal",
    "title": "Ajedrez de Madera Plegable con Tablero de 35x35 cm y Piezas Talladas a Mano",
    "shortTitle": "Ajedrez de Madera Clásico 35cm",
    "category": "juegos",
    "categoryLabel": "Juegos de Mesa",
    "ages": [
      "7-9",
      "10-12",
      "13+"
    ],
    "imageUrl": "/images/products/13-hape-banco-martillo-1.jpg",
    "asin": "B08HYG77ZC",
    "badge": "El Deporte de la Mente"
  },
  {
    "id": "toy-poker-maletin-fichas",
    "title": "Maletín de Póker de Aluminio con 300 Fichas Pesadas Láser y 2 Barajas",
    "shortTitle": "Maletín Póker 300 Fichas",
    "category": "juegos",
    "categoryLabel": "Juegos de Mesa",
    "ages": [
      "10-12",
      "13+"
    ],
    "imageUrl": "/images/products/18plus-kit-cocteleria-boston-acero-1.jpg",
    "asin": "B00TYD36XY",
    "badge": "Noche de Casino"
  },
  {
    "id": "toy-cluedo-clasico-hasbro",
    "title": "Hasbro Gaming - Cluedo Juego de Misterio, Mansión Tudor y Asesinatos",
    "shortTitle": "Cluedo Clásico Hasbro",
    "category": "juegos",
    "categoryLabel": "Juegos de Mesa",
    "ages": [
      "7-9",
      "10-12",
      "13+"
    ],
    "imageUrl": "/images/products/46-conecta-4-clasico-1.jpg",
    "asin": "B0192XG2J6",
    "badge": "Descubre al Culpable"
  },
  {
    "id": "toy-scrabble-clasico-mattel",
    "title": "Mattel Games - Scrabble Original Juego de Palabras Cruzadas en Español",
    "shortTitle": "Scrabble Original Mattel",
    "category": "juegos",
    "categoryLabel": "Juegos de Mesa",
    "ages": [
      "7-9",
      "10-12",
      "13+"
    ],
    "imageUrl": "/images/products/1012-carcassonne-1.jpg",
    "asin": "B0000789ER",
    "badge": "Desafío de Letras"
  },
  {
    "id": "toy-rubik-3x3-speedcube",
    "title": "Rubik's - Cubo de Rubik 3x3 Speedcube Magnético Rápido sin Pegatinas",
    "shortTitle": "Cubo de Rubik 3x3 Magnético",
    "category": "juegos",
    "categoryLabel": "Juegos de Mesa",
    "ages": [
      "7-9",
      "10-12",
      "13+"
    ],
    "imageUrl": "/images/products/1012-virus-1.jpg",
    "asin": "B079D19K2A",
    "badge": "Giro Ultra Rápido"
  },
  {
    "id": "toy-crayola-pintura-dedos",
    "title": "Crayola - Pintura de Dedos Lavable Pack de 4 Botes de Colores Vivos",
    "shortTitle": "Crayola Pintura de Dedos 4 Botes",
    "category": "creatividad",
    "categoryLabel": "Arte & Dibujo",
    "ages": [
      "0-3",
      "4-6"
    ],
    "imageUrl": "/images/products/13-crayola-pintura-dedos-1.jpg",
    "asin": "B00004UBHO",
    "badge": "Se Lava con Agua"
  },
  {
    "id": "toy-playdoh-pack-8-botes",
    "title": "Play-Doh - Pack de 8 Botes de Plastilina Arcoíris No Tóxica y Suave",
    "shortTitle": "Play-Doh Pack 8 Botes Colores",
    "category": "creatividad",
    "categoryLabel": "Arte & Dibujo",
    "ages": [
      "0-3",
      "4-6",
      "7-9"
    ],
    "imageUrl": "/images/products/13-play-doh-dentista-1.jpg",
    "asin": "B000F4M89A",
    "badge": "Mundialmente Amada"
  },
  {
    "id": "toy-playdoh-dentista-bromista",
    "title": "Play-Doh - El Dentista Bromista con Taladro Eléctrico y Bracket",
    "shortTitle": "Play-Doh Dentista Bromista",
    "category": "creatividad",
    "categoryLabel": "Arte & Dibujo",
    "ages": [
      "4-6",
      "7-9"
    ],
    "imageUrl": "/images/products/13-play-doh-dentista-1.jpg",
    "asin": "B01BHKZ8E4",
    "badge": "Top Divertido"
  },
  {
    "id": "toy-arena-magica-kinetic-sand",
    "title": "Kinetic Sand - Castillo Mágico 1 kg de Arena Cinética que Nunca se Seca",
    "shortTitle": "Kinetic Sand Arena Mágica 1kg",
    "category": "creatividad",
    "categoryLabel": "Arte & Dibujo",
    "ages": [
      "0-3",
      "4-6",
      "7-9"
    ],
    "imageUrl": "/images/products/13-kinetic-sand-1.jpg",
    "asin": "B019K8K3K0",
    "badge": "Sensación Mágica"
  },
  {
    "id": "toy-crayola-rotuladores-lavables",
    "title": "Crayola SuperTips - Set de 50 Rotuladores Lavables de Punta Cónica",
    "shortTitle": "Crayola SuperTips 50 Colores",
    "category": "creatividad",
    "categoryLabel": "Arte & Dibujo",
    "ages": [
      "4-6",
      "7-9",
      "10-12"
    ],
    "imageUrl": "/images/products/46-crayola-rotuladores-lavables-1.jpg",
    "asin": "B00000J0RP",
    "badge": "Super Lavables"
  },
  {
    "id": "toy-maletin-dibujo-madera-150",
    "title": "Maletín de Dibujo en Madera Noble con 150 Piezas de Pinturas y Pasteles",
    "shortTitle": "Maletín Dibujo Madera 150pz",
    "category": "creatividad",
    "categoryLabel": "Arte & Dibujo",
    "ages": [
      "4-6",
      "7-9",
      "10-12"
    ],
    "imageUrl": "/images/products/46-maletin-dibujo-madera-150-1.jpg",
    "asin": "B079KHHP8Y",
    "badge": "Gran Regalo"
  },
  {
    "id": "toy-aquabeads-estuche-expert",
    "title": "Aquabeads - Estuche Expert con 1400 Abalorios que se Pegan con Agua",
    "shortTitle": "Aquabeads Estuche Expert",
    "category": "creatividad",
    "categoryLabel": "Arte & Dibujo",
    "ages": [
      "4-6",
      "7-9"
    ],
    "imageUrl": "/images/products/46-aquabeads-estuche-expert-1.jpg",
    "asin": "B0855G6H7N",
    "badge": "Sin Calor ni Plancha"
  },
  {
    "id": "toy-fabrica-slime-diy",
    "title": "So Slime DIY - Fábrica de Slime sin Bórax con Purpurina y Figuras Sorpresa",
    "shortTitle": "Fábrica de Slime DIY",
    "category": "creatividad",
    "categoryLabel": "Arte & Dibujo",
    "ages": [
      "7-9",
      "10-12"
    ],
    "imageUrl": "/images/products/79-fabrica-slime-diy-sin-borax-1.jpg",
    "asin": "B078XG9P6R",
    "badge": "100% Sin Bórax"
  },
  {
    "id": "toy-kit-pulseras-gomas",
    "title": "Kit Completo de Pulseras de Gomas con 10.000 Gomas, Telar y Abalorios",
    "shortTitle": "Kit Pulseras de Gomas 10.000pz",
    "category": "creatividad",
    "categoryLabel": "Arte & Dibujo",
    "ages": [
      "7-9",
      "10-12"
    ],
    "imageUrl": "/images/products/79-kit-pulseras-gomas-telar-1.jpg",
    "asin": "B08W73SBCX",
    "badge": "Moda Creativa"
  },
  {
    "id": "toy-kit-costura-peluches-fieltro",
    "title": "Kit de Costura Infantil para Crear 6 Peluches de Animales de Fieltro",
    "shortTitle": "Kit Costura Peluches de Fieltro",
    "category": "creatividad",
    "categoryLabel": "Arte & Dibujo",
    "ages": [
      "7-9",
      "10-12"
    ],
    "imageUrl": "/images/products/79-kit-costura-peluches-fieltro-1.jpg",
    "asin": "B08W5B7P4R",
    "badge": "Costura Fácil y Segura"
  },
  {
    "id": "toy-rotuladores-lettering-pincel",
    "title": "Set de 36 Rotuladores Doble Punta Pincel y Fineliner para Lettering",
    "shortTitle": "Rotuladores Lettering 36pz",
    "category": "creatividad",
    "categoryLabel": "Arte & Dibujo",
    "ages": [
      "7-9",
      "10-12",
      "13+"
    ],
    "imageUrl": "/images/products/1012-kit-lettering-rotuladores-pincel-1.jpg",
    "asin": "B075T7Z7Y3",
    "badge": "Punta Pincel Flexible"
  },
  {
    "id": "toy-rotuladores-posca-8",
    "title": "POSCA - Set de 8 Rotuladores de Pintura Acrílica Punta Media Multisuperficie",
    "shortTitle": "POSCA Rotuladores Acrílicos 8pz",
    "category": "creatividad",
    "categoryLabel": "Arte & Dibujo",
    "ages": [
      "7-9",
      "10-12",
      "13+"
    ],
    "imageUrl": "/images/products/1012-posca-rotuladores-acrilicos-8-1.jpg",
    "asin": "B001B2OT3Y",
    "badge": "Pinta en Todo"
  },
  {
    "id": "toy-diario-secreto-huella",
    "title": "Diario Secreto con Cerradura de Huella Dactilar y Bolígrafo de Tinta Invisible",
    "shortTitle": "Diario Secreto Huella Dactilar",
    "category": "creatividad",
    "categoryLabel": "Arte & Dibujo",
    "ages": [
      "7-9",
      "10-12",
      "13+"
    ],
    "imageUrl": "/images/products/1012-diario-secreto-candado-huella-1.jpg",
    "asin": "B0BN55M67N",
    "badge": "Top Secret"
  },
  {
    "id": "toy-tombow-dual-brush-pastel",
    "title": "Tombow - Set de 6 Rotuladores Dual Brush Acuarelables Tonos Pastel",
    "shortTitle": "Tombow Dual Brush Pastel",
    "category": "creatividad",
    "categoryLabel": "Arte & Dibujo",
    "ages": [
      "10-12",
      "13+"
    ],
    "imageUrl": "/images/products/1315-tombow-dual-brush-pastel-1.jpg",
    "asin": "B01M16K9T0",
    "badge": "Lettering Profesional"
  },
  {
    "id": "toy-cuaderno-bullet-journal",
    "title": "Cuaderno Bullet Journal A5 Tapa Dura Piel con Papel Punteado de 160g Antitraspaso",
    "shortTitle": "Cuaderno Bullet Journal A5 160g",
    "category": "creatividad",
    "categoryLabel": "Arte & Dibujo",
    "ages": [
      "10-12",
      "13+"
    ],
    "imageUrl": "/images/products/1315-cuaderno-bullet-journal-a5-1.jpg",
    "asin": "B08R92V7PA",
    "badge": "Papel Grueso 160g"
  },
  {
    "id": "toy-estuche-tres-pisos",
    "title": "Estuche Escolar Juvenil de Gran Capacidad 3 Compartimentos con Cremallera",
    "shortTitle": "Estuche Gran Capacidad 3 Pisos",
    "category": "creatividad",
    "categoryLabel": "Arte & Dibujo",
    "ages": [
      "7-9",
      "10-12",
      "13+"
    ],
    "imageUrl": "/images/products/1315-estuche-gran-capacidad-tres-pisos-1.jpg",
    "asin": "B09HYG88ZC",
    "badge": "Súper Organizado"
  },
  {
    "id": "toy-tableta-grafica-huion",
    "title": "Huion Inspiroy H640P - Tableta Gráfica de Dibujo Digital con Lápiz sin Pila",
    "shortTitle": "Tableta Gráfica Dibujo Digital",
    "category": "creatividad",
    "categoryLabel": "Arte & Dibujo",
    "ages": [
      "10-12",
      "13+"
    ],
    "imageUrl": "/images/products/1618-logitech-g502-hero-1.jpg",
    "asin": "B075T6MTJX",
    "badge": "Dibuja en PC y Móvil"
  },
  {
    "id": "toy-rotuladores-alcohol-ohuhu-80",
    "title": "Ohuhu - Set de 80 Rotuladores al Alcohol Doble Punta con Estuche y Blender",
    "shortTitle": "Rotuladores al Alcohol Ohuhu 80pz",
    "category": "creatividad",
    "categoryLabel": "Arte & Dibujo",
    "ages": [
      "10-12",
      "13+"
    ],
    "imageUrl": "/images/products/1012-posca-rotuladores-acrilicos-8-1.jpg",
    "asin": "B079D19K2B",
    "badge": "Gradaciones Perfectas"
  },
  {
    "id": "toy-set-acuarelas-winsor-cotman",
    "title": "Winsor & Newton Cotman - Caja de Acuarelas de Bolsillo con 12 Medias Pastillas",
    "shortTitle": "Acuarelas Winsor & Newton Cotman",
    "category": "creatividad",
    "categoryLabel": "Arte & Dibujo",
    "ages": [
      "10-12",
      "13+"
    ],
    "imageUrl": "/images/products/1315-tombow-dual-brush-pastel-1.jpg",
    "asin": "B00004THXI",
    "badge": "Pigmentos Puros"
  },
  {
    "id": "toy-set-lapices-faber-castell-9000",
    "title": "Faber-Castell 9000 - Caja Metálica con 12 Lápices de Grafito de Bellas Artes",
    "shortTitle": "Lápices Grafito Faber-Castell",
    "category": "creatividad",
    "categoryLabel": "Arte & Dibujo",
    "ages": [
      "10-12",
      "13+"
    ],
    "imageUrl": "/images/products/1618-pluma-estilografica-dryden-1.jpg",
    "asin": "B000I5N92M",
    "badge": "Desde 8B hasta 2H"
  },
  {
    "id": "toy-cuaderno-canson-xl-a4",
    "title": "Canson XL Aquarelle - Álbum de Papel para Acuarela A4 300g Grano Fino 30 Hojas",
    "shortTitle": "Álbum Acuarela Canson 300g A4",
    "category": "creatividad",
    "categoryLabel": "Arte & Dibujo",
    "ages": [
      "10-12",
      "13+"
    ],
    "imageUrl": "/images/products/1315-cuaderno-bullet-journal-a5-1.jpg",
    "asin": "B004M59O4C",
    "badge": "300g No se Ondula"
  },
  {
    "id": "toy-kit-arcilla-fimo-horno",
    "title": "FIMO Soft - Set de 24 Pastillas de Arcilla Polimérica con Herramientas de Modelado",
    "shortTitle": "Arcilla Polimérica FIMO 24pz",
    "category": "creatividad",
    "categoryLabel": "Arte & Dibujo",
    "ages": [
      "10-12",
      "13+"
    ],
    "imageUrl": "/images/products/13-kinetic-sand-2.jpg",
    "asin": "B0032W8A71",
    "badge": "Crea Llaveros y Figuras"
  },
  {
    "id": "toy-pirograbador-madera-cuero",
    "title": "Kit de Pirograbador para Madera y Cuero 60W con Temperatura Regulable y 33 Puntas",
    "shortTitle": "Pirograbador Madera & Cuero 60W",
    "category": "creatividad",
    "categoryLabel": "Arte & Dibujo",
    "ages": [
      "10-12",
      "13+"
    ],
    "imageUrl": "/images/products/18plus-elegoo-arduino-kit-robotica-1.jpg",
    "asin": "B079KHHP8Z",
    "badge": "Graba en Madera"
  },
  {
    "id": "toy-moleskine-clasico-negro",
    "title": "Moleskine - Cuaderno Clásico Tapa Dura Cuadriculado con Cinta y Bolsillo",
    "shortTitle": "Cuaderno Moleskine Clásico",
    "category": "creatividad",
    "categoryLabel": "Arte & Dibujo",
    "ages": [
      "10-12",
      "13+"
    ],
    "imageUrl": "/images/products/1618-moleskine-clasico-tapa-dura-1.jpg",
    "asin": "B003L49O2A",
    "badge": "El Cuaderno Legendario"
  },
  {
    "id": "toy-pluma-estilografica-dryden",
    "title": "Dryden Designs - Pluma Estilográfica de Lujo en Metal con Convertidor de Tinta",
    "shortTitle": "Pluma Estilográfica Dryden Metal",
    "category": "creatividad",
    "categoryLabel": "Arte & Dibujo",
    "ages": [
      "10-12",
      "13+"
    ],
    "imageUrl": "/images/products/1618-pluma-estilografica-dryden-1.jpg",
    "asin": "B01C8G5W22",
    "badge": "Escritura Elegante"
  },
  {
    "id": "toy-diario-cuero-vintage",
    "title": "Diario de Cuero Auténtico Vintage Hecho a Mano con Cierre de Llave Antigua",
    "shortTitle": "Diario de Cuero Vintage Rústico",
    "category": "creatividad",
    "categoryLabel": "Arte & Dibujo",
    "ages": [
      "10-12",
      "13+"
    ],
    "imageUrl": "/images/products/1618-diario-cuero-1.jpg",
    "asin": "B0BN55M67O",
    "badge": "Piel Auténtica"
  },
  {
    "id": "toy-pizarra-luminosa-led-a4",
    "title": "Mesa de Luz A4 LED Ultrafina Regulable para Calcar Dibujos y Tatuajes",
    "shortTitle": "Mesa de Luz LED A4 para Calcar",
    "category": "creatividad",
    "categoryLabel": "Arte & Dibujo",
    "ages": [
      "7-9",
      "10-12",
      "13+"
    ],
    "imageUrl": "/images/products/1618-quntis-barra-luz-monitor-1.jpg",
    "asin": "B0855G6H7P",
    "badge": "Brillo Regulable"
  },
  {
    "id": "toy-caballete-mesa-oleo",
    "title": "Caballete de Pintura de Mesa en Madera de Haya con Cajón Compartimentado",
    "shortTitle": "Caballete de Mesa con Cajón",
    "category": "creatividad",
    "categoryLabel": "Arte & Dibujo",
    "ages": [
      "10-12",
      "13+"
    ],
    "imageUrl": "/images/products/13-hape-cocinita-madera-1.jpg",
    "asin": "B08R92V7PB",
    "badge": "Estudio de Pintor"
  },
  {
    "id": "toy-lapices-colores-prismacolor",
    "title": "Prismacolor Premier - Caja de 48 Lápices de Colores Blandos con Pigmento Intenso",
    "shortTitle": "Prismacolor Premier 48 Colores",
    "category": "creatividad",
    "categoryLabel": "Arte & Dibujo",
    "ages": [
      "10-12",
      "13+"
    ],
    "imageUrl": "/images/products/1012-posca-rotuladores-acrilicos-8-1.jpg",
    "asin": "B00006IEEU",
    "badge": "Mina Blanda Cremosa"
  },
  {
    "id": "toy-kit-manualidades-resina-epoxi",
    "title": "Kit de Resina Epoxi Cristal Transparente con Moldes de Silicona y Purpurinas",
    "shortTitle": "Kit Resina Epoxi Moldes Joyas",
    "category": "creatividad",
    "categoryLabel": "Arte & Dibujo",
    "ages": [
      "10-12",
      "13+"
    ],
    "imageUrl": "/images/products/46-aquabeads-estuche-expert-1.jpg",
    "asin": "B09HYG88ZD",
    "badge": "Crea Joyería Propia"
  },
  {
    "id": "toy-kit-crochet-amigurumi",
    "title": "Kit de Crochet Amigurumi para Principiantes con Lana, Ganchillo y Vídeo Tutorial",
    "shortTitle": "Kit Crochet Amigurumi Animales",
    "category": "creatividad",
    "categoryLabel": "Arte & Dibujo",
    "ages": [
      "10-12",
      "13+"
    ],
    "imageUrl": "/images/products/79-kit-costura-peluches-fieltro-1.jpg",
    "asin": "B08W73SBCY",
    "badge": "Crea tu Peluche"
  },
  {
    "id": "toy-pinceles-acuarela-recargables",
    "title": "Set de 6 Pinceles con Depósito de Agua Recargable para Acuarela y Lettering",
    "shortTitle": "Pinceles Depósito de Agua 6pz",
    "category": "creatividad",
    "categoryLabel": "Arte & Dibujo",
    "ages": [
      "7-9",
      "10-12",
      "13+"
    ],
    "imageUrl": "/images/products/1315-tombow-dual-brush-pastel-1.jpg",
    "asin": "B079D19K2C",
    "badge": "Pinta Donde Quieras"
  },
  {
    "id": "toy-plastilina-inteligente-magnetica",
    "title": "Thinking Putty - Plastilina Magnética Inteligente que Atrae Metales con Imán",
    "shortTitle": "Plastilina Magnética Inteligente",
    "category": "creatividad",
    "categoryLabel": "Arte & Dibujo",
    "ages": [
      "7-9",
      "10-12",
      "13+"
    ],
    "imageUrl": "/images/products/13-kinetic-sand-3.jpg",
    "asin": "B000F4M89B",
    "badge": "Imán Incluido"
  },
  {
    "id": "toy-pinta-por-numeros-lienzo",
    "title": "Kit de Pintar por Números en Lienzo Enmarcado 40x50 cm con Pinturas Acrílicas",
    "shortTitle": "Pintar por Números Lienzo 40x50",
    "category": "creatividad",
    "categoryLabel": "Arte & Dibujo",
    "ages": [
      "7-9",
      "10-12",
      "13+"
    ],
    "imageUrl": "/images/products/46-maletin-dibujo-madera-150-1.jpg",
    "asin": "B0855G6H7Q",
    "badge": "Tu Cuadro Propio"
  },
  {
    "id": "toy-pollo-pepe-libro-popup",
    "title": "El Pollo Pepe - Libro Infantil Pop-Up con Solapas y Gran Desplegable",
    "shortTitle": "El Pollo Pepe Pop-Up",
    "category": "cuentos",
    "categoryLabel": "Cuentos & Cómics",
    "ages": [
      "0-3",
      "4-6"
    ],
    "imageUrl": "/images/products/13-libro-pollo-pepe-1.jpg",
    "asin": "B0068V5X9U",
    "badge": "Superventas Bebés"
  },
  {
    "id": "toy-puedo-mirar-tu-panal",
    "title": "¿Puedo Mirar tu Pañal? - Libro Clásico para Dejar el Pañal Divertido",
    "shortTitle": "¿Puedo Mirar tu Pañal?",
    "category": "cuentos",
    "categoryLabel": "Cuentos & Cómics",
    "ages": [
      "0-3",
      "4-6"
    ],
    "imageUrl": "/images/products/13-libro-puedo-mirar-panal-1.jpg",
    "asin": "B009X80D92",
    "badge": "Éxito Clásico"
  },
  {
    "id": "toy-beso-antes-de-dormir",
    "title": "Un Beso Antes de Dormir - Cuento Tierno de Buenas Noches con Ilustraciones",
    "shortTitle": "Un Beso Antes de Dormir",
    "category": "cuentos",
    "categoryLabel": "Cuentos & Cómics",
    "ages": [
      "0-3",
      "4-6"
    ],
    "imageUrl": "/images/products/13-libro-beso-antes-dormir-1.jpg",
    "asin": "B002KCV7X2",
    "badge": "Para Ir a Dormir"
  },
  {
    "id": "toy-libro-tela-alto-contraste",
    "title": "Libro de Tela Sensorial en Blanco y Negro de Alto Contraste con Espejo",
    "shortTitle": "Libro de Tela Alto Contraste",
    "category": "cuentos",
    "categoryLabel": "Cuentos & Cómics",
    "ages": [
      "0-3"
    ],
    "imageUrl": "/images/products/012-libro-tela-alto-contraste-1.jpg",
    "asin": "B079D19K2D",
    "badge": "Estimulación Visual"
  },
  {
    "id": "toy-monstruo-de-colores-libro",
    "title": "El Monstruo de Colores de Anna Llenas - Álbum Ilustrado de Emociones",
    "shortTitle": "El Monstruo de Colores Álbum",
    "category": "cuentos",
    "categoryLabel": "Cuentos & Cómics",
    "ages": [
      "4-6",
      "7-9"
    ],
    "imageUrl": "/images/products/46-monstruo-de-colores-libro-1.jpg",
    "asin": "B00AQN697Q",
    "badge": "Imprescindible"
  },
  {
    "id": "toy-yo-voy-conmigo",
    "title": "Yo Voy Conmigo de Raquel Díaz Reguera - Cuento sobre la Autoestima y Ser Uno Mismo",
    "shortTitle": "Yo Voy Conmigo Cuento",
    "category": "cuentos",
    "categoryLabel": "Cuentos & Cómics",
    "ages": [
      "4-6",
      "7-9"
    ],
    "imageUrl": "/images/products/46-yo-voy-conmigo-libro-1.jpg",
    "asin": "B01A94P0F8",
    "badge": "Autoestima & Amor Propio"
  },
  {
    "id": "toy-de-mayor-quiero-ser-feliz",
    "title": "De Mayor Quiero Ser... Feliz - 6 Cuentos Cortos para Potenciar la Confianza",
    "shortTitle": "De Mayor Quiero Ser Feliz",
    "category": "cuentos",
    "categoryLabel": "Cuentos & Cómics",
    "ages": [
      "4-6",
      "7-9"
    ],
    "imageUrl": "/images/products/46-de-mayor-quiero-ser-feliz-1.jpg",
    "asin": "B075T7Z7Y4",
    "badge": "Confianza & Ilusión"
  },
  {
    "id": "toy-el-principito-ilustrado",
    "title": "El Principito de Antoine de Saint-Exupéry - Edición Tapa Dura Especial",
    "shortTitle": "El Principito Edición Especial",
    "category": "cuentos",
    "categoryLabel": "Cuentos & Cómics",
    "ages": [
      "4-6",
      "7-9",
      "10-12",
      "13+"
    ],
    "imageUrl": "/images/products/1012-harry-potter-piedra-filosofal-1.jpg",
    "asin": "B002KCV7X3",
    "badge": "Clásico Universal"
  },
  {
    "id": "toy-isadora-moon-va-al-colegio",
    "title": "Isadora Moon Va al Colegio de Harriet Muncaster - Mitad Hada Mitad Vampiro",
    "shortTitle": "Isadora Moon Va al Colegio",
    "category": "cuentos",
    "categoryLabel": "Cuentos & Cómics",
    "ages": [
      "7-9",
      "10-12"
    ],
    "imageUrl": "/images/products/79-isadora-moon-va-al-colegio-1.jpg",
    "asin": "B01NA0468L",
    "badge": "Hada & Vampiro"
  },
  {
    "id": "toy-anna-kadabra-club-luna-llena",
    "title": "Anna Kadabra 1: El Club de la Luna Llena de Pedro Mañas y David Sierra",
    "shortTitle": "Anna Kadabra Club Luna Llena",
    "category": "cuentos",
    "categoryLabel": "Cuentos & Cómics",
    "ages": [
      "7-9",
      "10-12"
    ],
    "imageUrl": "/images/products/79-anna-kadabra-club-luna-llena-1.jpg",
    "asin": "B0855G6H7R",
    "badge": "Brujas & Aventuras"
  },
  {
    "id": "toy-los-compas-diamantito",
    "title": "Los Compas y el Diamantito Legendario de Mikecrack, El Trollino y Timba Vk",
    "shortTitle": "Los Compas Diamantito Legendario",
    "category": "cuentos",
    "categoryLabel": "Cuentos & Cómics",
    "ages": [
      "7-9",
      "10-12"
    ],
    "imageUrl": "/images/products/79-los-compas-diamantito-legendario-1.jpg",
    "asin": "B07H8151D9",
    "badge": "Fenómeno YouTube"
  },
  {
    "id": "toy-diario-de-greg-1",
    "title": "Diario de Greg 1: Un Pringao Total de Jeff Kinney - Cómic Divertidísimo",
    "shortTitle": "Diario de Greg 1",
    "category": "cuentos",
    "categoryLabel": "Cuentos & Cómics",
    "ages": [
      "7-9",
      "10-12",
      "13+"
    ],
    "imageUrl": "/images/products/1012-diario-de-greg-1-1.jpg",
    "asin": "B002KCV7X4",
    "badge": "Risas Sin Parar"
  },
  {
    "id": "toy-harry-potter-piedra-filosofal",
    "title": "Harry Potter y la Piedra Filosofal de J.K. Rowling - Edición Oficial Tapa Dura",
    "shortTitle": "Harry Potter y la Piedra Filosofal",
    "category": "cuentos",
    "categoryLabel": "Cuentos & Cómics",
    "ages": [
      "7-9",
      "10-12",
      "13+"
    ],
    "imageUrl": "/images/products/1012-harry-potter-piedra-filosofal-1.jpg",
    "asin": "B009X80D93",
    "badge": "La Gran Saga Mágica"
  },
  {
    "id": "toy-invisible-eloy-moreno",
    "title": "Invisible de Eloy Moreno - La Emotiva Novela Juvenil que Llega al Corazón",
    "shortTitle": "Invisible de Eloy Moreno",
    "category": "cuentos",
    "categoryLabel": "Cuentos & Cómics",
    "ages": [
      "10-12",
      "13+"
    ],
    "imageUrl": "/images/products/1012-invisible-eloy-moreno-1.jpg",
    "asin": "B079D19K2E",
    "badge": "Lectura Recomendada"
  },
  {
    "id": "toy-los-futbolisimos-1",
    "title": "Los Futbolísimos 1: El Misterio de los Árbitros Dormidos de Roberto Santiago",
    "shortTitle": "Los Futbolísimos 1",
    "category": "cuentos",
    "categoryLabel": "Cuentos & Cómics",
    "ages": [
      "7-9",
      "10-12"
    ],
    "imageUrl": "/images/products/1012-diario-de-greg-1-1.jpg",
    "asin": "B00C8G5W24",
    "badge": "Fútbol & Misterio"
  },
  {
    "id": "toy-amanda-black-1",
    "title": "Amanda Black 1: Una Herencia Peligrosa de Juan Gómez-Jurado y Bárbara Montes",
    "shortTitle": "Amanda Black 1: Una Herencia",
    "category": "cuentos",
    "categoryLabel": "Cuentos & Cómics",
    "ages": [
      "7-9",
      "10-12",
      "13+"
    ],
    "imageUrl": "/images/products/79-anna-kadabra-club-luna-llena-1.jpg",
    "asin": "B08R92V7PC",
    "badge": "Misterio & Ladrones"
  },
  {
    "id": "toy-percy-jackson-ladron-rayo",
    "title": "Percy Jackson y los Dioses del Olimpo: El Ladrón del Rayo de Rick Riordan",
    "shortTitle": "Percy Jackson: El Ladrón del Rayo",
    "category": "cuentos",
    "categoryLabel": "Cuentos & Cómics",
    "ages": [
      "7-9",
      "10-12",
      "13+"
    ],
    "imageUrl": "/images/products/1012-harry-potter-piedra-filosofal-1.jpg",
    "asin": "B002KCV7X5",
    "badge": "Mitología Griega"
  },
  {
    "id": "toy-capitan-calzoncillos-comic",
    "title": "El Capitán Calzoncillos de Dav Pilkey - Las Aventuras a Todo Color en Cómic",
    "shortTitle": "El Capitán Calzoncillos Cómic",
    "category": "cuentos",
    "categoryLabel": "Cuentos & Cómics",
    "ages": [
      "7-9",
      "10-12"
    ],
    "imageUrl": "/images/products/1012-diario-de-greg-1-1.jpg",
    "asin": "B00AQN697R",
    "badge": "Superhéroes y Risas"
  },
  {
    "id": "toy-one-piece-tomo-1",
    "title": "One Piece Tomo 1: Romance Dawn de Eiichiro Oda - El Manga Más Famoso del Mundo",
    "shortTitle": "One Piece Tomo 1 Manga",
    "category": "cuentos",
    "categoryLabel": "Cuentos & Cómics",
    "ages": [
      "10-12",
      "13+"
    ],
    "imageUrl": "/images/products/1315-one-piece-tomo-1-1.jpg",
    "asin": "B00000IZGV",
    "badge": "El Manga Legendario"
  },
  {
    "id": "toy-heartstopper-tomo-1",
    "title": "Heartstopper Tomo 1 de Alice Oseman - Dos Chicos se Conocen Novela Gráfica",
    "shortTitle": "Heartstopper Tomo 1 Novela Gráfica",
    "category": "cuentos",
    "categoryLabel": "Cuentos & Cómics",
    "ages": [
      "10-12",
      "13+"
    ],
    "imageUrl": "/images/products/1315-heartstopper-tomo-1-1.jpg",
    "asin": "B079D19K2F",
    "badge": "Éxito Mundial Netflix"
  },
  {
    "id": "toy-juegos-del-hambre-novela",
    "title": "Los Juegos del Hambre de Suzanne Collins - Edición 15 Aniversario Tapa Dura",
    "shortTitle": "Los Juegos del Hambre Novela",
    "category": "cuentos",
    "categoryLabel": "Cuentos & Cómics",
    "ages": [
      "10-12",
      "13+"
    ],
    "imageUrl": "/images/products/1315-juegos-del-hambre-novela-1.jpg",
    "asin": "B008DW66Z7",
    "badge": "Distopía Inolvidable"
  },
  {
    "id": "toy-alas-de-sangre-novela",
    "title": "Alas de Sangre (Fourth Wing) de Rebecca Yarros - Edición Especial Dragones",
    "shortTitle": "Alas de Sangre Cuarta Ala",
    "category": "cuentos",
    "categoryLabel": "Cuentos & Cómics",
    "ages": [
      "13+"
    ],
    "imageUrl": "/images/products/1618-alas-de-sangre-rebecca-yarros-1.jpg",
    "asin": "B0C8G5W25",
    "badge": "Fenómeno BookTok"
  },
  {
    "id": "toy-naruto-manga-tomo-1",
    "title": "Naruto Tomo 1 de Masashi Kishimoto - El Comienzo del Ninja Más Valiente",
    "shortTitle": "Naruto Tomo 1 Manga",
    "category": "cuentos",
    "categoryLabel": "Cuentos & Cómics",
    "ages": [
      "10-12",
      "13+"
    ],
    "imageUrl": "https://m.media-amazon.com/images/I/71Y-e0q4XyL._AC_UL320_.jpg",
    "asin": "B00TYD36XZ",
    "badge": "Camino Ninja"
  },
  {
    "id": "toy-demon-slayer-manga-tomo-1",
    "title": "Guardianes de la Noche (Kimetsu no Yaiba) Tomo 1 de Koyoharu Gotouge",
    "shortTitle": "Demon Slayer Tomo 1 Manga",
    "category": "cuentos",
    "categoryLabel": "Cuentos & Cómics",
    "ages": [
      "10-12",
      "13+"
    ],
    "imageUrl": "https://m.media-amazon.com/images/I/71Y-e0q4XyL._AC_UL320_.jpg",
    "asin": "B0855G6H7S",
    "badge": "Caza Demonios"
  },
  {
    "id": "toy-dragon-ball-super-tomo-1",
    "title": "Dragon Ball Super Tomo 1 de Akira Toriyama y Toyotaro - Los Guerreros Z",
    "shortTitle": "Dragon Ball Super Tomo 1",
    "category": "cuentos",
    "categoryLabel": "Cuentos & Cómics",
    "ages": [
      "7-9",
      "10-12",
      "13+"
    ],
    "imageUrl": "/images/products/1618-spiderman-2-1.jpg",
    "asin": "B01C8G5W23",
    "badge": "Goku y Vegeta"
  },
  {
    "id": "toy-my-hero-academia-manga-1",
    "title": "My Hero Academia Tomo 1 de Kohei Horikoshi - El Instituto de Superhéroes",
    "shortTitle": "My Hero Academia Tomo 1",
    "category": "cuentos",
    "categoryLabel": "Cuentos & Cómics",
    "ages": [
      "10-12",
      "13+"
    ],
    "imageUrl": "/images/products/46-capa-mascara-superheroes-1.jpg",
    "asin": "B0BN55M67P",
    "badge": "Plus Ultra"
  },
  {
    "id": "toy-el-hobbit-tolkien",
    "title": "El Hobbit de J.R.R. Tolkien - Edición Especial Ilustrada de la Tierra Media",
    "shortTitle": "El Hobbit de J.R.R. Tolkien",
    "category": "cuentos",
    "categoryLabel": "Cuentos & Cómics",
    "ages": [
      "10-12",
      "13+"
    ],
    "imageUrl": "/images/products/1012-harry-potter-piedra-filosofal-1.jpg",
    "asin": "B002KCV7X6",
    "badge": "Fantasía Clásica"
  },
  {
    "id": "toy-habitos-atomicos-libro",
    "title": "Hábitos Atómicos de James Clear - El Libro Más Vendido para Lograr Metas",
    "shortTitle": "Hábitos Atómicos de James Clear",
    "category": "cuentos",
    "categoryLabel": "Cuentos & Cómics",
    "ages": [
      "13+"
    ],
    "imageUrl": "/images/products/1618-habitos-atomicos-james-clear-1.jpg",
    "asin": "B07N3821TE",
    "badge": "Desarrollo Personal"
  },
  {
    "id": "toy-el-sutil-arte-libro",
    "title": "El Sutil Arte de que Casi Todo te Importe una Mierda de Mark Manson",
    "shortTitle": "El Sutil Arte de Mark Manson",
    "category": "cuentos",
    "categoryLabel": "Cuentos & Cómics",
    "ages": [
      "13+"
    ],
    "imageUrl": "/images/products/1618-el-sutil-arte-mark-manson-1.jpg",
    "asin": "B075T7Z7Y5",
    "badge": "Éxito Internacional"
  },
  {
    "id": "toy-kindle-paperwhite",
    "title": "Kindle Paperwhite Pantalla de 6.8 Pulgadas Luz Cálida Ajustable y 16 GB",
    "shortTitle": "Kindle Paperwhite Lector eBooks",
    "category": "cuentos",
    "categoryLabel": "Cuentos & Cómics",
    "ages": [
      "10-12",
      "13+"
    ],
    "imageUrl": "/images/products/18plus-kindle-paperwhite-16gb-1.jpg",
    "asin": "B08N3TCP2F",
    "badge": "Miles de Libros"
  },
  {
    "id": "toy-astronomia-guia-cielo",
    "title": "Guía del Cielo Nocturno y las Estrellas Ilustrada para Jóvenes Astrónomos",
    "shortTitle": "Guía del Cielo Nocturno & Estrellas",
    "category": "cuentos",
    "categoryLabel": "Cuentos & Cómics",
    "ages": [
      "7-9",
      "10-12",
      "13+"
    ],
    "imageUrl": "/images/products/1012-telescopio-astronomico-movil-1.jpg",
    "asin": "B08R92V7PD",
    "badge": "Mapas de Constelaciones"
  },
  {
    "id": "toy-guinness-world-records",
    "title": "Guinness World Records 2026 - El Libro de Récords Más Asombroso del Mundo",
    "shortTitle": "Guinness World Records 2026",
    "category": "cuentos",
    "categoryLabel": "Cuentos & Cómics",
    "ages": [
      "7-9",
      "10-12",
      "13+"
    ],
    "imageUrl": "/images/products/1012-diario-de-greg-1-1.jpg",
    "asin": "B09DFH5Z7Y",
    "badge": "Datos Increíbles"
  },
  {
    "id": "toy-comic-spiderman-miles-morales",
    "title": "Marvel Comics - Spider-Man: Miles Morales Tomo 1 El Nuevo Hombre Araña",
    "shortTitle": "Cómic Spider-Man Miles Morales",
    "category": "cuentos",
    "categoryLabel": "Cuentos & Cómics",
    "ages": [
      "7-9",
      "10-12",
      "13+"
    ],
    "imageUrl": "/images/products/1618-spiderman-2-2.jpg",
    "asin": "B09HYG88ZE",
    "badge": "Cómic Marvel Oficial"
  },
  {
    "id": "toy-manga-tokyo-revengers-1",
    "title": "Tokyo Revengers Tomo 1 de Ken Wakui - Viajes en el Tiempo y Pandillas",
    "shortTitle": "Tokyo Revengers Tomo 1 Manga",
    "category": "cuentos",
    "categoryLabel": "Cuentos & Cómics",
    "ages": [
      "13+"
    ],
    "imageUrl": "/images/products/1315-one-piece-tomo-1-1.jpg",
    "asin": "B0BN55M67Q",
    "badge": "Sensación Manga"
  },
  {
    "id": "toy-chicco-first-bike-roja",
    "title": "Chicco First Bike - Bicicleta de Equilibrio sin Pedales Ultraligera de 2 a 5 Años",
    "shortTitle": "Chicco First Bike sin Pedales",
    "category": "deportes",
    "categoryLabel": "Deportes & Aire Libre",
    "ages": [
      "0-3",
      "4-6"
    ],
    "imageUrl": "/images/products/13-chicco-first-bike-1.jpg",
    "asin": "B002KCV7X7",
    "badge": "Aprende a Montar en Bici"
  },
  {
    "id": "toy-besrey-triciclo-5en1",
    "title": "Besrey - Triciclo 5 en 1 para Bebés Evolutivo con Barra de Empuje Parental",
    "shortTitle": "Besrey Triciclo Evolutivo 5en1",
    "category": "deportes",
    "categoryLabel": "Deportes & Aire Libre",
    "ages": [
      "0-3",
      "4-6"
    ],
    "imageUrl": "/images/products/13-besrey-triciclo-5en1-1.jpg",
    "asin": "B079D19K2G",
    "badge": "Crece con el Bebé"
  },
  {
    "id": "toy-kinderkraft-triciclo-aveo",
    "title": "Kinderkraft Aveo - Triciclo Plegable con Asiento Giratorio y Capota Parasol",
    "shortTitle": "Triciclo Plegable Kinderkraft Aveo",
    "category": "deportes",
    "categoryLabel": "Deportes & Aire Libre",
    "ages": [
      "0-3",
      "4-6"
    ],
    "imageUrl": "/images/products/13-triciclo-aveo-1.jpg",
    "asin": "B075T7Z7Y6",
    "badge": "Asiento Reversible"
  },
  {
    "id": "toy-patinete-micro-maxi-deluxe",
    "title": "Micro Maxi Deluxe LED - Patinete Infantil con 3 Ruedas que se Iluminan al Rodar",
    "shortTitle": "Micro Maxi Deluxe 3 Ruedas LED",
    "category": "deportes",
    "categoryLabel": "Deportes & Aire Libre",
    "ages": [
      "4-6",
      "7-9"
    ],
    "imageUrl": "/images/products/46-micro-maxi-deluxe-led-1.jpg",
    "asin": "B07N3821TF",
    "badge": "Estabilidad Suiza"
  },
  {
    "id": "toy-patinete-bopster-plegable",
    "title": "Bopster - Patinete Plegable de 2 Ruedas para Niños con Freno Trasero",
    "shortTitle": "Bopster Patinete 2 Ruedas",
    "category": "deportes",
    "categoryLabel": "Deportes & Aire Libre",
    "ages": [
      "4-6",
      "7-9",
      "10-12"
    ],
    "imageUrl": "/images/products/46-bopster-patinete-1.jpg",
    "asin": "B00TYD36Y0",
    "badge": "Plegable & Ligero"
  },
  {
    "id": "toy-casco-infantil-luz-led",
    "title": "Casco de Bicicleta y Patinete Infantil con Luz LED de Seguridad Recargable USB",
    "shortTitle": "Casco Infantil con Luz LED",
    "category": "deportes",
    "categoryLabel": "Deportes & Aire Libre",
    "ages": [
      "0-3",
      "4-6",
      "7-9",
      "10-12"
    ],
    "imageUrl": "/images/products/46-casco-infantil-luz-seguridad-1.jpg",
    "asin": "B0855G6H7T",
    "badge": "Seguridad Total"
  },
  {
    "id": "toy-porteria-futbol-plegable",
    "title": "Set de 2 Porterías de Fútbol Plegables Pop-Up para Jardín con Balón y Clavijas",
    "shortTitle": "Set 2 Porterías Fútbol Pop-Up",
    "category": "deportes",
    "categoryLabel": "Deportes & Aire Libre",
    "ages": [
      "4-6",
      "7-9",
      "10-12"
    ],
    "imageUrl": "/images/products/13-cocina-hape-1.jpg",
    "asin": "B00AQN697S",
    "badge": "Montaje en 10 Segundos"
  },
  {
    "id": "toy-patinete-acrobatico-freestyle",
    "title": "Patinete Freestyle Acrobático Reforzado con Ruedas de Aluminio y Freno de Acero",
    "shortTitle": "Patinete Freestyle Acrobático",
    "category": "deportes",
    "categoryLabel": "Deportes & Aire Libre",
    "ages": [
      "7-9",
      "10-12",
      "13+"
    ],
    "imageUrl": "/images/products/46-bopster-patinete-2.jpg",
    "asin": "B08R92V7PE",
    "badge": "Trucos en Skatepark"
  },
  {
    "id": "toy-monopatin-skateboard-arce",
    "title": "Skateboard Completo de 31 Pulgadas de Madera de Arce Canadiense con Ruedas PU",
    "shortTitle": "Skateboard Completo 31 Pulgadas",
    "category": "deportes",
    "categoryLabel": "Deportes & Aire Libre",
    "ages": [
      "7-9",
      "10-12",
      "13+"
    ],
    "imageUrl": "/images/products/46-bopster-patinete-3.jpg",
    "asin": "B079D19K2H",
    "badge": "Madera de Arce 7 Capas"
  },
  {
    "id": "toy-patines-linea-ajustables",
    "title": "Patines en Línea Infantiles Ajustables en 4 Tallas con 8 Ruedas Luminosas LED",
    "shortTitle": "Patines en Línea 4 Tallas LED",
    "category": "deportes",
    "categoryLabel": "Deportes & Aire Libre",
    "ages": [
      "7-9",
      "10-12",
      "13+"
    ],
    "imageUrl": "/images/products/46-micro-maxi-deluxe-led-1.jpg",
    "asin": "B08HYG77ZD",
    "badge": "Ruedas con Luces"
  },
  {
    "id": "toy-canasta-baloncesto-puerta",
    "title": "Mini Canasta de Baloncesto para Puerta y Pared con Marcador Electrónico y 3 Pelotas",
    "shortTitle": "Canasta Baloncesto con Marcador",
    "category": "deportes",
    "categoryLabel": "Deportes & Aire Libre",
    "ages": [
      "7-9",
      "10-12",
      "13+"
    ],
    "imageUrl": "/images/products/1618-fc-25-1.jpg",
    "asin": "B09HYG88ZF",
    "badge": "Encesta en tu Cuarto"
  },
  {
    "id": "toy-diana-dardos-electronica",
    "title": "Diana Electrónica Digital de Dardos Seguros con 6 Dardos de Punta Blanda",
    "shortTitle": "Diana Electrónica Punta Blanda",
    "category": "deportes",
    "categoryLabel": "Deportes & Aire Libre",
    "ages": [
      "7-9",
      "10-12",
      "13+"
    ],
    "imageUrl": "/images/products/1012-caja-misterio-escape-magia-1.jpg",
    "asin": "B0BN55M67R",
    "badge": "Pantalla de Puntos"
  },
  {
    "id": "toy-telescopio-astronomico",
    "title": "Telescopio Astronómico Refractor 70mm con Trípode y Adaptador para Móvil",
    "shortTitle": "Telescopio Astronómico 70mm",
    "category": "deportes",
    "categoryLabel": "Deportes & Aire Libre",
    "ages": [
      "7-9",
      "10-12",
      "13+"
    ],
    "imageUrl": "/images/products/1012-telescopio-astronomico-movil-1.jpg",
    "asin": "B01NA0468M",
    "badge": "Observa la Luna y Planetas"
  },
  {
    "id": "toy-balon-futbol-adidas-champions",
    "title": "Adidas - Balón de Fútbol Oficial UCL League Champions League Talla 5",
    "shortTitle": "Balón Fútbol Champions League",
    "category": "deportes",
    "categoryLabel": "Deportes & Aire Libre",
    "ages": [
      "7-9",
      "10-12",
      "13+"
    ],
    "imageUrl": "/images/products/1618-fc-25-2.jpg",
    "asin": "B0C8G5W26",
    "badge": "Balón Oficial de la Champions"
  },
  {
    "id": "toy-balon-baloncesto-wilson",
    "title": "Wilson Evolution - Balón de Baloncesto Oficial Grip de Cuero Compuesto Talla 7",
    "shortTitle": "Balón Baloncesto Wilson Evolution",
    "category": "deportes",
    "categoryLabel": "Deportes & Aire Libre",
    "ages": [
      "7-9",
      "10-12",
      "13+"
    ],
    "imageUrl": "/images/products/1618-fc-25-3.jpg",
    "asin": "B002KCV7X8",
    "badge": "El Más Usado en Pistas"
  },
  {
    "id": "toy-guantes-portero-futbol",
    "title": "Guantes de Portero de Fútbol Profesionales con Varillas Antilesión y Látex de Agarre",
    "shortTitle": "Guantes Portero Fútbol con Férulas",
    "category": "deportes",
    "categoryLabel": "Deportes & Aire Libre",
    "ages": [
      "7-9",
      "10-12",
      "13+"
    ],
    "imageUrl": "/images/products/1618-fc-25.jpg",
    "asin": "B0855G6H7U",
    "badge": "Protección en Dedos"
  },
  {
    "id": "toy-patinete-electrico-xiaomi",
    "title": "Xiaomi Electric Scooter 4 Lite - Patinete Eléctrico 300W y 20 km de Autonomía",
    "shortTitle": "Patinete Eléctrico Xiaomi 4 Lite",
    "category": "deportes",
    "categoryLabel": "Deportes & Aire Libre",
    "ages": [
      "10-12",
      "13+"
    ],
    "imageUrl": "/images/products/46-bopster-patinete-1.jpg",
    "asin": "B0C1PHR571",
    "badge": "Movilidad Eléctrica Urbana"
  },
  {
    "id": "toy-patinete-electrico-cecotec",
    "title": "Cecotec Bongo Serie A - Patinete Eléctrico con Batería Extraíble y Ruedas Tubeless",
    "shortTitle": "Patinete Eléctrico Cecotec Bongo",
    "category": "deportes",
    "categoryLabel": "Deportes & Aire Libre",
    "ages": [
      "10-12",
      "13+"
    ],
    "imageUrl": "/images/products/46-bopster-patinete-2.jpg",
    "asin": "B08R92V7PF",
    "badge": "Ruedas Antirreventón"
  },
  {
    "id": "toy-bici-montana-26",
    "title": "Bicicleta de Montaña MTB de 26 Pulgadas con Suspensión Delantera y 21 Velocidades",
    "shortTitle": "Bicicleta Montaña MTB 26 Pulgadas",
    "category": "deportes",
    "categoryLabel": "Deportes & Aire Libre",
    "ages": [
      "10-12",
      "13+"
    ],
    "imageUrl": "/images/products/13-chicco-first-bike-2.jpg",
    "asin": "B079D19K2I",
    "badge": "Cambio Shimano"
  },
  {
    "id": "toy-pala-padel-carbono",
    "title": "Pala de Pádel de Fibra de Carbono con Núcleo Eva Soft, Funda Térmica y 3 Bolas",
    "shortTitle": "Pala de Pádel Carbono Pro",
    "category": "deportes",
    "categoryLabel": "Deportes & Aire Libre",
    "ages": [
      "10-12",
      "13+"
    ],
    "imageUrl": "/images/products/1315-bolsa-deporte-zapatero-independiente-1.jpg",
    "asin": "B0BN55M67S",
    "badge": "Control y Potencia"
  },
  {
    "id": "toy-saco-boxeo-guantes",
    "title": "Saco de Boxeo Pesado de 100 cm con Cadena Giratoria y Guantes de Boxeo 12oz",
    "shortTitle": "Saco de Boxeo con Guantes 1m",
    "category": "deportes",
    "categoryLabel": "Deportes & Aire Libre",
    "ages": [
      "10-12",
      "13+"
    ],
    "imageUrl": "/images/products/1315-bolsa-deporte-zapatero-independiente-1.jpg",
    "asin": "B08W73SBCZ",
    "badge": "Entrena en Casa"
  },
  {
    "id": "toy-mesa-ping-pong-plegable",
    "title": "Mesa de Ping Pong Plegable de Interior con Red, 2 Palas y 3 Pelotas Oficiales",
    "shortTitle": "Mesa de Ping Pong Plegable",
    "category": "deportes",
    "categoryLabel": "Deportes & Aire Libre",
    "ages": [
      "7-9",
      "10-12",
      "13+"
    ],
    "imageUrl": "/images/products/13-cocina-hape-2.jpg",
    "asin": "B00TYD36Y1",
    "badge": "Diversión Familiar"
  },
  {
    "id": "toy-gafas-snorkel-subacuatica",
    "title": "Máscara de Snorkel Visión Panorámica 180 Grados Antivaho con Soporte GoPro",
    "shortTitle": "Máscara Snorkel Panorámica 180º",
    "category": "deportes",
    "categoryLabel": "Deportes & Aire Libre",
    "ages": [
      "7-9",
      "10-12",
      "13+"
    ],
    "imageUrl": "/images/products/1618-gafas-sol-polarizadas-retro-1.jpg",
    "asin": "B075T7Z7Y7",
    "badge": "Respira Bajo el Agua"
  },
  {
    "id": "toy-mochila-deporte-bolsa",
    "title": "Bolsa de Deporte Gimnasio con Compartimento Zapatero Impermeable Independiente",
    "shortTitle": "Bolsa de Deporte con Zapatero",
    "category": "deportes",
    "categoryLabel": "Deportes & Aire Libre",
    "ages": [
      "10-12",
      "13+"
    ],
    "imageUrl": "/images/products/1315-bolsa-deporte-zapatero-independiente-1.jpg",
    "asin": "B09HYG88ZG",
    "badge": "Para Fútbol y Gym"
  },
  {
    "id": "toy-red-badminton-portatil",
    "title": "Set de Bádminton con Red Portátil Autoportante de 3m, 4 Raquetas y Volantes",
    "shortTitle": "Set de Bádminton con Red 3m",
    "category": "deportes",
    "categoryLabel": "Deportes & Aire Libre",
    "ages": [
      "7-9",
      "10-12",
      "13+"
    ],
    "imageUrl": "/images/products/13-besrey-triciclo-5en1-1.jpg",
    "asin": "B0855G6H7V",
    "badge": "Juega en Jardín o Playa"
  },
  {
    "id": "toy-frisbee-profesional-aerobie",
    "title": "Aerobie Pro Ring - Disco Volador Aerodinámico que Vuela Más de 100 Metros",
    "shortTitle": "Aerobie Pro Disco Volador",
    "category": "deportes",
    "categoryLabel": "Deportes & Aire Libre",
    "ages": [
      "7-9",
      "10-12",
      "13+"
    ],
    "imageUrl": "/images/products/46-dobble-kids-1.jpg",
    "asin": "B00005049U",
    "badge": "Récord Mundial de Vuelo"
  },
  {
    "id": "toy-cometa-acrobatica-dos-hilos",
    "title": "Cometa Acrobática de Dos Hilos de Doble Control Resistente al Viento",
    "shortTitle": "Cometa Acrobática 2 Hilos",
    "category": "deportes",
    "categoryLabel": "Deportes & Aire Libre",
    "ages": [
      "7-9",
      "10-12",
      "13+"
    ],
    "imageUrl": "/images/products/46-bopster-patinete-1.jpg",
    "asin": "B002KCV7X9",
    "badge": "Vuelo de Acrobacias"
  },
  {
    "id": "toy-reloj-deportivo-50m",
    "title": "Reloj Digital Deportivo Resistente al Agua 50m con Cronómetro y Alarma",
    "shortTitle": "Reloj Deportivo Sumergible 50m",
    "category": "deportes",
    "categoryLabel": "Deportes & Aire Libre",
    "ages": [
      "7-9",
      "10-12",
      "13+"
    ],
    "imageUrl": "/images/products/79-reloj-digital-deportivo-50m-1.jpg",
    "asin": "B08HYG77ZE",
    "badge": "Resistente a Golpes"
  },
  {
    "id": "toy-gafas-sol-polarizadas-uv",
    "title": "Gafas de Sol Polarizadas Estilo Aviador Retro con Protección UV400",
    "shortTitle": "Gafas de Sol Polarizadas UV400",
    "category": "deportes",
    "categoryLabel": "Deportes & Aire Libre",
    "ages": [
      "10-12",
      "13+"
    ],
    "imageUrl": "/images/products/1618-gafas-sol-polarizadas-retro-1.jpg",
    "asin": "B0BN55M67T",
    "badge": "Visión Sin Reflejos"
  },
  {
    "id": "toy-gorra-deportiva-ajustable",
    "title": "Gorra de Béisbol Deportiva Transpirable con Visera Curva y Protección Solar",
    "shortTitle": "Gorra Deportiva Ajustable UV",
    "category": "deportes",
    "categoryLabel": "Deportes & Aire Libre",
    "ages": [
      "7-9",
      "10-12",
      "13+"
    ],
    "imageUrl": "/images/products/79-gorra-deportiva-ajustable-uv-1.jpg",
    "asin": "B01NA0468N",
    "badge": "Estilo Urbano"
  },
  {
    "id": "toy-trampolin-cama-elastica",
    "title": "Cama Elástica Infantil para Interior y Jardín con Red de Seguridad y Barra",
    "shortTitle": "Cama Elástica Trampolín con Red",
    "category": "deportes",
    "categoryLabel": "Deportes & Aire Libre",
    "ages": [
      "0-3",
      "4-6",
      "7-9"
    ],
    "imageUrl": "/images/products/13-triciclo-aveo-2.jpg",
    "asin": "B079D19K2J",
    "badge": "Salta Seguro"
  },
  {
    "id": "toy-trineo-nieve-plastico",
    "title": "Trineo de Nieve Tradicional con Frenos de Mano y Cuerda de Arrastre",
    "shortTitle": "Trineo de Nieve con Frenos",
    "category": "deportes",
    "categoryLabel": "Deportes & Aire Libre",
    "ages": [
      "4-6",
      "7-9",
      "10-12",
      "13+"
    ],
    "imageUrl": "/images/products/46-bopster-patinete-2.jpg",
    "asin": "B00AQN697T",
    "badge": "Nieve & Bajadas"
  },
  {
    "id": "toy-cuerda-saltar-aluminio",
    "title": "Comba de Saltar de Velocidad con Cable de Acero y Rodamientos de Giro Rápido",
    "shortTitle": "Comba de Salto Rápido Speed",
    "category": "deportes",
    "categoryLabel": "Deportes & Aire Libre",
    "ages": [
      "7-9",
      "10-12",
      "13+"
    ],
    "imageUrl": "/images/products/1315-bolsa-deporte-zapatero-independiente-1.jpg",
    "asin": "B08R92V7PG",
    "badge": "Cardio & Velocidad"
  },
  {
    "id": "toy-tienda-campana-camping",
    "title": "Tienda de Campaña Pop-Up Instantánea para 2 Personas Impermeable para Jardín y Camping",
    "shortTitle": "Tienda de Campaña Pop-Up 2p",
    "category": "deportes",
    "categoryLabel": "Deportes & Aire Libre",
    "ages": [
      "4-6",
      "7-9",
      "10-12",
      "13+"
    ],
    "imageUrl": "/images/products/13-cocina-hape-3.jpg",
    "asin": "B09HYG88ZH",
    "badge": "Aventura al Aire Libre"
  },
  {
    "id": "toy-gimnasio-piano-fisher-price",
    "title": "Fisher-Price - Gimnasio Piano Pataditas con Luces, Música y 5 Juguetes",
    "shortTitle": "Gimnasio Piano Pataditas",
    "category": "bebes",
    "categoryLabel": "Bebés & Montessori",
    "ages": [
      "0-3"
    ],
    "imageUrl": "/images/products/bebe-gimnasio-piano-1.jpg",
    "asin": "B0793D953F",
    "badge": "Nº 1 Estimulación"
  },
  {
    "id": "toy-mordedor-winkel-manhattan",
    "title": "Manhattan Toy - Sonajero y Mordedor Winkel Sensorial con Tubos Flexibles",
    "shortTitle": "Mordedor Sensorial Winkel",
    "category": "bebes",
    "categoryLabel": "Bebés & Montessori",
    "ages": [
      "0-3"
    ],
    "imageUrl": "/images/products/012-mordedor-winkel-manhattan-1.jpg",
    "asin": "B000BNCA4K",
    "badge": "Agarre Fácil"
  },
  {
    "id": "toy-hamaca-babybjorn-bliss",
    "title": "BabyBjörn - Hamaca Bliss Ergonómica con Balanceo Natural y Algodón Suave",
    "shortTitle": "Hamaca BabyBjörn Bliss",
    "category": "bebes",
    "categoryLabel": "Bebés & Montessori",
    "ages": [
      "0-3"
    ],
    "imageUrl": "/images/products/012-hamaca-babybjorn-bliss-1.jpg",
    "asin": "B074WCNMYH",
    "badge": "Balanceo Natural"
  },
  {
    "id": "toy-torre-aprendizaje-montessori",
    "title": "Torre de Aprendizaje Montessori Evolutiva Regulable en Altura en Madera Natural",
    "shortTitle": "Torre de Aprendizaje Montessori",
    "category": "bebes",
    "categoryLabel": "Bebés & Montessori",
    "ages": [
      "0-3",
      "4-6"
    ],
    "imageUrl": "/images/products/13-torre-aprendizaje-1.jpg",
    "asin": "B0855G6H7W",
    "badge": "Autonomía Infantil"
  },
  {
    "id": "toy-cubo-multiactividades-madera",
    "title": "Cubo de Multiactividades 5 en 1 de Madera con Laberinto de Cuentas y Reloj",
    "shortTitle": "Cubo Multiactividades 5en1",
    "category": "bebes",
    "categoryLabel": "Bebés & Montessori",
    "ages": [
      "0-3",
      "4-6"
    ],
    "imageUrl": "/images/products/13-cubo-multiactividades-madera-1.jpg",
    "asin": "B079D19K2K",
    "badge": "Madera Montessori"
  },
  {
    "id": "toy-banco-martillo-hape",
    "title": "Hape - Banco de Herramientas de Madera con Martillo y Bolas que Ruedan",
    "shortTitle": "Banco de Bolas y Martillo Hape",
    "category": "bebes",
    "categoryLabel": "Bebés & Montessori",
    "ages": [
      "0-3",
      "4-6"
    ],
    "imageUrl": "/images/products/13-hape-banco-martillo-1.jpg",
    "asin": "B00712O2D6",
    "badge": "Coordinación Ojo-Mano"
  },
  {
    "id": "toy-cocinita-madera-hape",
    "title": "Hape - Cocinita de Madera Gourmet con Fogones, Fregadero y Accesorios",
    "shortTitle": "Cocinita de Madera Gourmet Hape",
    "category": "bebes",
    "categoryLabel": "Bebés & Montessori",
    "ages": [
      "0-3",
      "4-6",
      "7-9"
    ],
    "imageUrl": "/images/products/13-hape-cocinita-madera-1.jpg",
    "asin": "B006WZJA2Q",
    "badge": "Juego Simbólico Estrella"
  },
  {
    "id": "toy-alimentos-madera-velcro",
    "title": "Set de Frutas y Alimentos de Madera para Cortar con Cuchillo Seguro y Velcro",
    "shortTitle": "Alimentos de Madera con Velcro",
    "category": "bebes",
    "categoryLabel": "Bebés & Montessori",
    "ages": [
      "0-3",
      "4-6"
    ],
    "imageUrl": "/images/products/13-alimentos-madera-velcro-1.jpg",
    "asin": "B00TYD36Y2",
    "badge": "Corta y Aprende"
  },
  {
    "id": "toy-maletin-medico-infantil",
    "title": "Maletín de Médico Infantil de Madera con Estetoscopio con Latido y Jeringa",
    "shortTitle": "Maletín Médico de Madera",
    "category": "bebes",
    "categoryLabel": "Bebés & Montessori",
    "ages": [
      "0-3",
      "4-6",
      "7-9"
    ],
    "imageUrl": "/images/products/13-maletin-medico-infantil-1.jpg",
    "asin": "B08R92V7PH",
    "badge": "Doctor de Juguete"
  },
  {
    "id": "toy-libro-bano-magico",
    "title": "Libro de Baño Mágico para Bebés que Cambia de Color al Mojarse en el Agua",
    "shortTitle": "Libro de Baño Mágico Cambia Color",
    "category": "bebes",
    "categoryLabel": "Bebés & Montessori",
    "ages": [
      "0-3"
    ],
    "imageUrl": "/images/products/012-libro-bano-magico-cambia-color-1.jpg",
    "asin": "B002KCV7XA",
    "badge": "Diversión en el Baño"
  },
  {
    "id": "toy-cesta-bienvenida-bebe",
    "title": "Cesta de Bienvenida para Recién Nacido de Madera con Doudou, Cepillo y Muselina",
    "shortTitle": "Cesta Bienvenida Bebé Madera",
    "category": "bebes",
    "categoryLabel": "Bebés & Montessori",
    "ages": [
      "0-3"
    ],
    "imageUrl": "/images/products/012-cesta-bienvenida-bebe-madera-1.jpg",
    "asin": "B0BN55M67U",
    "badge": "Regalo de Nacimiento"
  },
  {
    "id": "toy-patucos-cuero-attipas",
    "title": "Attipas - Calzado Ergonómico de Primeros Pasos con Suela de Goma Flexible",
    "shortTitle": "Attipas Zapatos Primeros Pasos",
    "category": "bebes",
    "categoryLabel": "Bebés & Montessori",
    "ages": [
      "0-3"
    ],
    "imageUrl": "/images/products/13-zapatillas-attipas-ergonomicas-1.jpg",
    "asin": "B08W73SBD0",
    "badge": "Caminar Natural"
  },
  {
    "id": "toy-cuna-colecho-kinderkraft",
    "title": "Kinderkraft Neste Up - Cuna de Colecho Ajustable en 5 Alturas con Colchón",
    "shortTitle": "Cuna Colecho Kinderkraft Neste",
    "category": "bebes",
    "categoryLabel": "Bebés & Montessori",
    "ages": [
      "0-3"
    ],
    "imageUrl": "/images/products/bebe-cuna-colecho-1.jpg",
    "asin": "B0855G6H7X",
    "badge": "Colecho Seguro"
  },
  {
    "id": "toy-banera-bebe-plegable",
    "title": "Bañera Infantil Plegable con Termómetro Digital Incorporado y Cojín Reductor",
    "shortTitle": "Bañera Plegable con Termómetro",
    "category": "bebes",
    "categoryLabel": "Bebés & Montessori",
    "ages": [
      "0-3"
    ],
    "imageUrl": "/images/products/bebe-banera-plegable-1.jpg",
    "asin": "B079D19K2L",
    "badge": "Termómetro Integrado"
  },
  {
    "id": "toy-canastilla-mustela-bebe",
    "title": "Mustela - Canastilla Mi Primer Neceser con Gel de Baño, Champú, Crema y Toallitas",
    "shortTitle": "Canastilla Regalo Mustela Bebé",
    "category": "bebes",
    "categoryLabel": "Bebés & Montessori",
    "ages": [
      "0-3"
    ],
    "imageUrl": "/images/products/bebe-mustela-canastilla-1.jpg",
    "asin": "B00AQN697U",
    "badge": "Aroma Inolvidable"
  },
  {
    "id": "toy-colonia-denenes-bebe",
    "title": "Denenes - Colonia Original Clásica Infantil 600 ml con Aceites Esenciales",
    "shortTitle": "Colonia Denenes Clásica 600ml",
    "category": "bebes",
    "categoryLabel": "Bebés & Montessori",
    "ages": [
      "0-3",
      "4-6"
    ],
    "imageUrl": "/images/products/012-colonia-denenes-original-1.jpg",
    "asin": "B00TYD36Y3",
    "badge": "Olor a Bebé"
  },
  {
    "id": "toy-suavinex-set-cuidado",
    "title": "Suavinex - Set de Cuidado y Aseo para Bebé con Tijeritas, Lima y Cepillo",
    "shortTitle": "Suavinex Set Neceser de Aseo",
    "category": "bebes",
    "categoryLabel": "Bebés & Montessori",
    "ages": [
      "0-3"
    ],
    "imageUrl": "/images/products/bebe-suavinex-kit-1.jpg",
    "asin": "B075T7Z7Y8",
    "badge": "Aseo Completo"
  },
  {
    "id": "toy-mesa-actividades-bilingue",
    "title": "Chicco - Mesa de Actividades Bilingüe con Piano, Teléfono y Palabras",
    "shortTitle": "Mesa Actividades Bilingüe Chicco",
    "category": "bebes",
    "categoryLabel": "Bebés & Montessori",
    "ages": [
      "0-3",
      "4-6"
    ],
    "imageUrl": "/images/products/bebe-gimnasio-piano-2.jpg",
    "asin": "B002KCV7XB",
    "badge": "Inglés & Español"
  },
  {
    "id": "toy-arco-iris-madera-waldorf",
    "title": "Arco Iris Waldorf de Madera 12 Piezas de Construcción Libre y Creativa",
    "shortTitle": "Arco Iris Waldorf Madera 12pz",
    "category": "bebes",
    "categoryLabel": "Bebés & Montessori",
    "ages": [
      "0-3",
      "4-6",
      "7-9"
    ],
    "imageUrl": "/images/products/13-cubo-multiactividades-madera-1.jpg",
    "asin": "B08R92V7PI",
    "badge": "Pedagogía Waldorf"
  },
  {
    "id": "toy-puzzle-mapamundi-magnetico",
    "title": "Janod - Puzzle Magnético Mapa del Mundo en Madera con 92 Imanes de Países",
    "shortTitle": "Mapamundi Magnético Janod",
    "category": "bebes",
    "categoryLabel": "Bebés & Montessori",
    "ages": [
      "4-6",
      "7-9",
      "10-12"
    ],
    "imageUrl": "/images/products/13-cubo-multiactividades-madera-1.jpg",
    "asin": "B0042SYY8J",
    "badge": "Geografía Divertida"
  },
  {
    "id": "toy-calendario-madera-reloj",
    "title": "Calendario y Reloj Educativo de Madera con Estaciones, Clima y Meses",
    "shortTitle": "Calendario y Reloj de Madera",
    "category": "bebes",
    "categoryLabel": "Bebés & Montessori",
    "ages": [
      "4-6",
      "7-9"
    ],
    "imageUrl": "/images/products/13-hape-banco-martillo-1.jpg",
    "asin": "B0BN55M67V",
    "badge": "Aprende las Horas"
  },
  {
    "id": "toy-microscopio-monocular-ninos",
    "title": "Microscopio Infantil con Aumentos 100x-1200x, Muestras Preparadas y Luz LED",
    "shortTitle": "Microscopio Infantil con Luz LED",
    "category": "bebes",
    "categoryLabel": "Bebés & Montessori",
    "ages": [
      "7-9",
      "10-12",
      "13+"
    ],
    "imageUrl": "/images/products/1012-telescopio-astronomico-movil-1.jpg",
    "asin": "B079D19K2M",
    "badge": "Descubre la Ciencia"
  },
  {
    "id": "toy-huerto-urbano-infantil",
    "title": "Kit de Huerto Urbano Infantil con Semillas Ecológicas, Tierra y Macetitas",
    "shortTitle": "Huerto Urbano Infantil Ecológico",
    "category": "bebes",
    "categoryLabel": "Bebés & Montessori",
    "ages": [
      "4-6",
      "7-9",
      "10-12"
    ],
    "imageUrl": "/images/products/13-kinetic-sand-1.jpg",
    "asin": "B0855G6H7Y",
    "badge": "Siembra tus Plantas"
  },
  {
    "id": "toy-kit-fosiles-excavacion",
    "title": "National Geographic - Kit de Excavación de Fósiles Reales con Cincel y Lupa",
    "shortTitle": "Kit Excavación Fósiles NatGeo",
    "category": "bebes",
    "categoryLabel": "Bebés & Montessori",
    "ages": [
      "7-9",
      "10-12",
      "13+"
    ],
    "imageUrl": "/images/products/1012-caja-misterio-escape-magia-1.jpg",
    "asin": "B08HYG77ZF",
    "badge": "Fósiles Genuinos"
  },
  {
    "id": "toy-kit-quimica-experimentos",
    "title": "Clementoni - Mi Primer Laboratorio de Química con 100 Experimentos Seguros",
    "shortTitle": "Laboratorio de Química 100 Experimentos",
    "category": "bebes",
    "categoryLabel": "Bebés & Montessori",
    "ages": [
      "7-9",
      "10-12",
      "13+"
    ],
    "imageUrl": "/images/products/1012-telescopio-astronomico-movil-1.jpg",
    "asin": "B00AQN697V",
    "badge": "Ciencia Segura"
  },
  {
    "id": "toy-kit-cultivo-bonsai",
    "title": "Kit de Germinación y Cultivo de Bonsái en Casa con Semillas de 4 Especies",
    "shortTitle": "Kit Cultivo Bonsái en Casa",
    "category": "bebes",
    "categoryLabel": "Bebés & Montessori",
    "ages": [
      "10-12",
      "13+"
    ],
    "imageUrl": "/images/products/18plus-lego-icons-bonsai-1.jpg",
    "asin": "B08R92V7PJ",
    "badge": "Paciencia & Naturaleza"
  },
  {
    "id": "toy-lampara-sal-himalaya",
    "title": "Lámpara de Sal del Himalaya 100% Pura y Natural con Regulador de Luz Suave",
    "shortTitle": "Lámpara de Sal del Himalaya",
    "category": "bebes",
    "categoryLabel": "Bebés & Montessori",
    "ages": [
      "10-12",
      "13+"
    ],
    "imageUrl": "/images/products/1618-govee-neon-1.jpg",
    "asin": "B079D19K2N",
    "badge": "Ambiente Relajante"
  },
  {
    "id": "toy-terrario-plantas-cristal",
    "title": "Terrario Geométrico de Cristal y Latón para Plantas Suculentas y Musgo",
    "shortTitle": "Terrario Geométrico de Cristal",
    "category": "bebes",
    "categoryLabel": "Bebés & Montessori",
    "ages": [
      "10-12",
      "13+"
    ],
    "imageUrl": "/images/products/18plus-lego-icons-ramo-flores-1.jpg",
    "asin": "B0BN55M67W",
    "badge": "Decoración Viva"
  },
  {
    "id": "toy-difusor-aromas-ultrasonico",
    "title": "Difusor de Aceites Esenciales Ultrasónico con Luz Ambiente 7 Colores y Temporizador",
    "shortTitle": "Difusor de Aromas Ultrasónico",
    "category": "bebes",
    "categoryLabel": "Bebés & Montessori",
    "ages": [
      "10-12",
      "13+"
    ],
    "imageUrl": "/images/products/1618-vela-woodwick-1.jpg",
    "asin": "B075T7Z7Y9",
    "badge": "Aromaterapia"
  },
  {
    "id": "toy-vela-aromatica-woodwick",
    "title": "Woodwick - Vela Aromática de Cera de Soja con Mecha de Madera que Chisporrotea",
    "shortTitle": "Vela Aromática Woodwick Mecha Madera",
    "category": "bebes",
    "categoryLabel": "Bebés & Montessori",
    "ages": [
      "10-12",
      "13+"
    ],
    "imageUrl": "/images/products/1618-vela-woodwick-1.jpg",
    "asin": "B00TYD36Y4",
    "badge": "Sonido a Chimenea"
  },
  {
    "id": "toy-globo-terraqueo-luz",
    "title": "Globo Terráqueo Iluminado LED de 25 cm con Mapa Político y Físico en Español",
    "shortTitle": "Globo Terráqueo con Luz LED",
    "category": "bebes",
    "categoryLabel": "Bebés & Montessori",
    "ages": [
      "7-9",
      "10-12",
      "13+"
    ],
    "imageUrl": "/images/products/1012-telescopio-astronomico-movil-1.jpg",
    "asin": "B0855G6H7Z",
    "badge": "Lámpara & Aprendizaje"
  },
  {
    "id": "toy-reloj-arena-magnetico",
    "title": "Reloj de Arena Magnético de Cristal con Polvo de Hierro que Crea Esculturas",
    "shortTitle": "Reloj de Arena Magnético Esculturas",
    "category": "bebes",
    "categoryLabel": "Bebés & Montessori",
    "ages": [
      "7-9",
      "10-12",
      "13+"
    ],
    "imageUrl": "/images/products/1012-caja-misterio-escape-magia-1.jpg",
    "asin": "B08HYG77ZG",
    "badge": "Física Curiosa"
  },
  {
    "id": "toy-pendulo-newton-acero",
    "title": "Péndulo de Newton Clásico de Conservación de la Energía con Bolas de Acero",
    "shortTitle": "Péndulo de Newton de Mesa",
    "category": "bebes",
    "categoryLabel": "Bebés & Montessori",
    "ages": [
      "7-9",
      "10-12",
      "13+"
    ],
    "imageUrl": "/images/products/18plus-elegoo-arduino-kit-robotica-1.jpg",
    "asin": "B002KCV7XC",
    "badge": "Ciencia Cinética"
  },
  {
    "id": "toy-esferas-bakyballs-magneticas",
    "title": "Juego de 216 Bolitas Magnéticas Neodimio para Construcciones Escultóricas 3D",
    "shortTitle": "Escultura Magnética Neodimio",
    "category": "bebes",
    "categoryLabel": "Bebés & Montessori",
    "ages": [
      "10-12",
      "13+"
    ],
    "imageUrl": "/images/products/1012-virus-1.jpg",
    "asin": "B0C8G5W27",
    "badge": "Concentración Antiestrés"
  },
  {
    "id": "toy-coche-electrico-mercedes-g63-negro",
    "title": "Coche Eléctrico para Niños Mercedes G63 AMG 12V Licencia Oficial con Mando a Distancia, 2 Motores, Suspensión, Luces LED y Música USB (Negro)",
    "shortTitle": "Mercedes G63 AMG 12V con Mando",
    "category": "sobre-ruedas",
    "wheelSubcategory": "coches-electricos",
    "categoryLabel": "Coches Eléctricos 12V/24V",
    "ages": [
      "0-3",
      "4-6",
      "7-9"
    ],
    "imageUrl": "https://m.media-amazon.com/images/I/71bvyVOy-EL._AC_UL320_.jpg",
    "asin": "B0B2NBZBYM",
    "badge": "Opción Amazon · Mercedes Oficial"
  },
  {
    "id": "toy-coche-electrico-jeep-rosa-litake",
    "title": "Litake Coche Eléctrico Todoterreno Jeep para Niños 3-6 Años 12V con Control Remoto Parental, Faros LED y Suspensión (Rosa)",
    "shortTitle": "Jeep Todoterreno Eléctrico 12V Rosa",
    "category": "sobre-ruedas",
    "wheelSubcategory": "coches-electricos",
    "categoryLabel": "Coches Eléctricos 12V/24V",
    "ages": [
      "0-3",
      "4-6",
      "7-9"
    ],
    "imageUrl": "https://m.media-amazon.com/images/I/71+vFeGII0L._AC_UL320_.jpg",
    "asin": "B0HCNW4RFL",
    "badge": "Jeep Todoterreno 12V"
  },
  {
    "id": "toy-coche-electrico-audi-r8-spyder",
    "title": "AIYAPLAY Coche Eléctrico para Niños Audi R8 Spyder 12V 2 Motores con Batería de Litio, Mando a Distancia y Luces LED",
    "shortTitle": "Audi R8 Spyder 12V 2 Motores",
    "category": "sobre-ruedas",
    "wheelSubcategory": "coches-electricos",
    "categoryLabel": "Coches Eléctricos 12V/24V",
    "ages": [
      "0-3",
      "4-6",
      "7-9"
    ],
    "imageUrl": "https://m.media-amazon.com/images/I/71NRmPUGOcL._AC_UL320_.jpg",
    "asin": "B0HH3V2B67",
    "badge": "Licencia Oficial Audi Sport"
  },
  {
    "id": "toy-coche-electrico-audi-ttrs-homcom",
    "title": "HOMCOM Coche Eléctrico para Niños 3+ Audi TT RS 12V con 2 Motores, Mando a Distancia, Música MP3 y Faros LED (Negro)",
    "shortTitle": "HOMCOM Audi TT RS 12V Negro",
    "category": "sobre-ruedas",
    "wheelSubcategory": "coches-electricos",
    "categoryLabel": "Coches Eléctricos 12V/24V",
    "ages": [
      "0-3",
      "4-6",
      "7-9"
    ],
    "imageUrl": "https://m.media-amazon.com/images/I/71NZ1XflpXL._AC_UL320_.jpg",
    "asin": "B07YB4MTYL",
    "badge": "Superventas Audi TT RS"
  },
  {
    "id": "toy-coche-electrico-audi-q8-etron",
    "title": "AIYAPLAY Coche Eléctrico para Niños Audi Q8 e-tron Sportback 12V con Control Remoto 2.4G, Suspensión y Luces (Negro)",
    "shortTitle": "Audi Q8 e-tron 12V Sportback",
    "category": "sobre-ruedas",
    "wheelSubcategory": "coches-electricos",
    "categoryLabel": "Coches Eléctricos 12V/24V",
    "ages": [
      "0-3",
      "4-6",
      "7-9"
    ],
    "imageUrl": "https://m.media-amazon.com/images/I/71dQLxTgi9L._AC_UL320_.jpg",
    "asin": "B0DQPV9MDL",
    "badge": "SUV Audi Q8 Oficial"
  },
  {
    "id": "toy-coche-electrico-audi-rs-etron-gt-blanco",
    "title": "HOMCOM Coche Eléctrico para Niños Audi RS e-Tron GT 12V con Doble Motor, Mando Parental y MP3 (Blanco)",
    "shortTitle": "Audi RS e-Tron GT 12V Blanco",
    "category": "sobre-ruedas",
    "wheelSubcategory": "coches-electricos",
    "categoryLabel": "Coches Eléctricos 12V/24V",
    "ages": [
      "0-3",
      "4-6",
      "7-9"
    ],
    "imageUrl": "https://m.media-amazon.com/images/I/61weqR1I0mL._AC_UL320_.jpg",
    "asin": "B0BHLBYBZV",
    "badge": "Deportivo Eléctrico Audi"
  },
  {
    "id": "toy-coche-electrico-lamborghini-sian-blanco",
    "title": "HOMCOM Coche Eléctrico para Niños 12V Lamborghini Sián con Puertas de Tijera Hidráulicas y Mando a Distancia (Blanco)",
    "shortTitle": "Lamborghini Sián 12V Puertas Tijera",
    "category": "sobre-ruedas",
    "wheelSubcategory": "coches-electricos",
    "categoryLabel": "Coches Eléctricos 12V/24V",
    "ages": [
      "0-3",
      "4-6",
      "7-9"
    ],
    "imageUrl": "https://m.media-amazon.com/images/I/71x7OZT2lpL._AC_UL320_.jpg",
    "asin": "B0C9ZS5YXM",
    "badge": "Puertas de Tijera"
  },
  {
    "id": "toy-coche-electrico-lamborghini-veneno-24v",
    "title": "FINOOS Coche Eléctrico para Niños Lamborghini Veneno 24V 2 Plazas 4x4 con Asiento de Cuero y Ruedas EVA (Rojo Metalizado)",
    "shortTitle": "Lamborghini Veneno 24V Biplaza 4x4",
    "category": "sobre-ruedas",
    "wheelSubcategory": "coches-electricos",
    "categoryLabel": "Coches Eléctricos 12V/24V",
    "ages": [
      "4-6",
      "7-9",
      "10-12"
    ],
    "imageUrl": "https://m.media-amazon.com/images/I/71oXroUqABL._AC_UL320_.jpg",
    "asin": "B0D45Y7C86",
    "badge": "24V 4x4 Biplaza"
  },
  {
    "id": "toy-coche-electrico-porsche-cayenne-injusa",
    "title": "INJUSA Coche Eléctrico 12V Porsche Cayenne S para Niños con Batería de Litio, Mando RC, Luces y Sonidos (Blanco)",
    "shortTitle": "Porsche Cayenne S 12V INJUSA",
    "category": "sobre-ruedas",
    "wheelSubcategory": "coches-electricos",
    "categoryLabel": "Coches Eléctricos 12V/24V",
    "ages": [
      "0-3",
      "4-6",
      "7-9"
    ],
    "imageUrl": "https://m.media-amazon.com/images/I/41Qj0vzRJDL._AC_SR250,250_QL65_.jpg",
    "asin": "B07QZFMD4P",
    "badge": "Fabricado en España"
  },
  {
    "id": "toy-tractor-electrico-remolque-12v",
    "title": "COSTWAY Tractor Eléctrico 12V para Niños con Remolque Desmontable, 3 Velocidades, Mando 2.4G, Luces LED y Bluetooth",
    "shortTitle": "Tractor Eléctrico 12V con Remolque",
    "category": "sobre-ruedas",
    "wheelSubcategory": "coches-electricos",
    "categoryLabel": "Coches Eléctricos 12V/24V",
    "ages": [
      "0-3",
      "4-6",
      "7-9"
    ],
    "imageUrl": "https://m.media-amazon.com/images/I/61QV7ztTJYL._AC_UL320_.jpg",
    "asin": "B0CS3D26LC",
    "badge": "Con Remolque Desmontable"
  },
  {
    "id": "toy-miniquad-gasolina-49cc-raptor",
    "title": "Miniquad Infantil de Gasolina Raptor-R4 49cc 2 Tiempos con Tirador Fácil y Frenos de Disco para Niños 4 a 10 Años",
    "shortTitle": "Miniquad Gasolina 49cc Raptor-R4",
    "category": "sobre-ruedas",
    "wheelSubcategory": "quads",
    "categoryLabel": "Quads y Buggies 4x4",
    "ages": [
      "4-6",
      "7-9",
      "10-12",
      "13+"
    ],
    "imageUrl": "https://m.media-amazon.com/images/I/51bfgb9g0nL._AC_UL320_.jpg",
    "asin": "B0F2J2YQVQ",
    "badge": "Motor Gasolina 49cc"
  },
  {
    "id": "toy-miniquad-gasolina-50cc-rojo-beneo",
    "title": "ATV Beneo Motors Adventure - Mini Quad Todoterreno para Niños 50cc con Limitador de Velocidad y Hombre al Agua (Rojo)",
    "shortTitle": "Mini Quad ATV 50cc Adventure Rojo",
    "category": "sobre-ruedas",
    "wheelSubcategory": "quads",
    "categoryLabel": "Quads y Buggies 4x4",
    "ages": [
      "4-6",
      "7-9",
      "10-12",
      "13+"
    ],
    "imageUrl": "https://m.media-amazon.com/images/I/71RNu0M0cAL._AC_UL320_.jpg",
    "asin": "B0FV3C7MXN",
    "badge": "ATV 50cc Todoterreno"
  },
  {
    "id": "toy-miniquad-gasolina-50cc-rosa-beneo",
    "title": "ATV Beneo Motors Adventure - Mini Quad para Niños y Niñas 50cc con Parada de Seguridad y Neumáticos de Tacos (Rosa)",
    "shortTitle": "Mini Quad ATV 50cc Adventure Rosa",
    "category": "sobre-ruedas",
    "wheelSubcategory": "quads",
    "categoryLabel": "Quads y Buggies 4x4",
    "ages": [
      "4-6",
      "7-9",
      "10-12",
      "13+"
    ],
    "imageUrl": "https://m.media-amazon.com/images/I/71UiDs09d5L._AC_UL320_.jpg",
    "asin": "B0FV3KPV91",
    "badge": "Seguridad Hombre al Agua"
  },
  {
    "id": "toy-miniquad-electrico-36v-500w",
    "title": "Mini Quad Eléctrico para Niños Raptor R4 36V 500W con 3 Niveles de Velocidad con Llave y Marcha Atrás",
    "shortTitle": "Mini Quad Eléctrico 36V 500W",
    "category": "sobre-ruedas",
    "wheelSubcategory": "quads",
    "categoryLabel": "Quads y Buggies 4x4",
    "ages": [
      "7-9",
      "10-12",
      "13+"
    ],
    "imageUrl": "https://m.media-amazon.com/images/I/51O2sHCMlOL._AC_UL320_.jpg",
    "asin": "B0HMCVV6YV",
    "badge": "Potencia Eléctrica 36V 500W"
  },
  {
    "id": "toy-quad-electrico-12v-homcom-rojo",
    "title": "HOMCOM Quad Eléctrico para Niños 12V con 2 Motores, Ruedas Anchas con Suspensión, Faros LED y Música (Rojo)",
    "shortTitle": "Quad Eléctrico HOMCOM 12V Rojo",
    "category": "sobre-ruedas",
    "wheelSubcategory": "quads",
    "categoryLabel": "Quads y Buggies 4x4",
    "ages": [
      "0-3",
      "4-6",
      "7-9"
    ],
    "imageUrl": "https://m.media-amazon.com/images/I/71R+z2CqyXL._AC_UL320_.jpg",
    "asin": "B0BDL4PWF9",
    "badge": "Doble Motor 12V"
  },
  {
    "id": "toy-quad-electrico-12v-injusa-verde",
    "title": "INJUSA Quad Eléctrico 12V Blaster ATV para Niños con Marcha Atrás y 60 Min de Autonomía Fabricado en España (Verde)",
    "shortTitle": "Quad Eléctrico INJUSA 12V Blaster",
    "category": "sobre-ruedas",
    "wheelSubcategory": "quads",
    "categoryLabel": "Quads y Buggies 4x4",
    "ages": [
      "0-3",
      "4-6"
    ],
    "imageUrl": "https://m.media-amazon.com/images/I/41aQ2+LuhLL._AC_SR250,250_QL65_.jpg",
    "asin": "B0DG5TBSJH",
    "badge": "Fabricado en España"
  },
  {
    "id": "toy-buggy-electrico-utv-24v-biplaza",
    "title": "AIYAPLAY Buggy Coche Eléctrico Todoterreno UTV 24V 2 Plazas con Motores 2x120W, Amortiguación y Mando RC",
    "shortTitle": "Buggy UTV 24V 2 Plazas Todoterreno",
    "category": "sobre-ruedas",
    "wheelSubcategory": "quads",
    "categoryLabel": "Quads y Buggies 4x4",
    "ages": [
      "4-6",
      "7-9",
      "10-12"
    ],
    "imageUrl": "https://m.media-amazon.com/images/I/71QMTnAJMKL._AC_UL320_.jpg",
    "asin": "B0G2M7TP2Z",
    "badge": "Buggy UTV Todoterreno"
  },
  {
    "id": "toy-minimoto-cross-49cc-roja-709",
    "title": "Minimoto Cross para Niño de Gasolina 49cc Modelo 709 con 4.5 Caballos, Frenos de Disco y Amortiguación Invertida (Roja)",
    "shortTitle": "Minimoto Cross 49cc 4.5 CV Roja",
    "category": "sobre-ruedas",
    "wheelSubcategory": "minimotos",
    "categoryLabel": "Minimotos y Motos",
    "ages": [
      "7-9",
      "10-12",
      "13+"
    ],
    "imageUrl": "https://m.media-amazon.com/images/I/61u6pwNj0IL._AC_UL320_.jpg",
    "asin": "B0FCY3X3D2",
    "badge": "Motor Gasolina 4.5 CV"
  },
  {
    "id": "toy-minimoto-cross-49cc-azul-roan",
    "title": "Minicross Infantil de Gasolina 49cc ROAN 709 con Ruedas 10 Pulgadas, Paro de Seguridad y Chasis Reforzado (Azul)",
    "shortTitle": "Minicross Gasolina 49cc ROAN Azul",
    "category": "sobre-ruedas",
    "wheelSubcategory": "minimotos",
    "categoryLabel": "Minimotos y Motos",
    "ages": [
      "7-9",
      "10-12",
      "13+"
    ],
    "imageUrl": "https://m.media-amazon.com/images/I/61Chxs310hL._AC_UL320_.jpg",
    "asin": "B0CJYDSGHC",
    "badge": "Ruedas 10\" Cross"
  },
  {
    "id": "toy-minimoto-cobra-49cc-roan",
    "title": "ROAN Minimoto Infantil Cobra 49cc Motor 2 Tiempos con Frenos de Disco, Escape Deportivo y Chasis Reforzado",
    "shortTitle": "Minimoto ROAN Cobra 49cc 2T",
    "category": "sobre-ruedas",
    "wheelSubcategory": "minimotos",
    "categoryLabel": "Minimotos y Motos",
    "ages": [
      "7-9",
      "10-12",
      "13+"
    ],
    "imageUrl": "https://m.media-amazon.com/images/I/61fNrq5KI-L._AC_UL320_.jpg",
    "asin": "B0HHS9DJC6",
    "badge": "Modelo Cobra 49cc"
  },
  {
    "id": "toy-minimoto-cross-electrica-infantil",
    "title": "Moto Eléctrica de Cross Infantil con Neumáticos Todoterreno, Batería de Gran Autonomía y Ruedines de Estabilización",
    "shortTitle": "Moto Cross Eléctrica Infantil",
    "category": "sobre-ruedas",
    "wheelSubcategory": "minimotos",
    "categoryLabel": "Minimotos y Motos",
    "ages": [
      "4-6",
      "7-9",
      "10-12"
    ],
    "imageUrl": "https://m.media-amazon.com/images/I/71XdJhuEE5L._AC_UL320_.jpg",
    "asin": "B0HJVZJXFV",
    "badge": "Cross Eléctrica Silenciosa"
  },
  {
    "id": "toy-moto-electrica-bmw-g310-12v",
    "title": "AIYAPLAY Moto Eléctrica para Niños Licencia Oficial BMW G310 GS 12V con Ruedines, Faros LED y Música (Rojo)",
    "shortTitle": "Moto Eléctrica BMW G310 GS 12V",
    "category": "sobre-ruedas",
    "wheelSubcategory": "minimotos",
    "categoryLabel": "Minimotos y Motos",
    "ages": [
      "0-3",
      "4-6",
      "7-9"
    ],
    "imageUrl": "https://m.media-amazon.com/images/I/71TB88TxmBL._AC_UL320_.jpg",
    "asin": "B0HNZS3L46",
    "badge": "Licencia Oficial BMW"
  },
  {
    "id": "toy-moto-electrica-honda-cbr-12v",
    "title": "Honda CBR1000RR Moto Eléctrica Infantil 12V Deportiva con Ruedines Desmontables, Sonidos de Motor y Luces",
    "shortTitle": "Moto Eléctrica Honda CBR1000RR 12V",
    "category": "sobre-ruedas",
    "wheelSubcategory": "minimotos",
    "categoryLabel": "Minimotos y Motos",
    "ages": [
      "0-3",
      "4-6",
      "7-9"
    ],
    "imageUrl": "https://m.media-amazon.com/images/I/6170CcOLXML._AC_UL320_.jpg",
    "asin": "B0HGMGYDS7",
    "badge": "Honda Racing Oficial"
  },
  {
    "id": "toy-moto-electrica-vespa-12v",
    "title": "COSTWAY Moto Eléctrica para Niños Vespa Clásica 12V con Licencia Piaggio, Asiento de Cuero, Ruedines, Faro LED y Música",
    "shortTitle": "Moto Vespa Clásica 12V Oficial",
    "category": "sobre-ruedas",
    "wheelSubcategory": "minimotos",
    "categoryLabel": "Minimotos y Motos",
    "ages": [
      "0-3",
      "4-6",
      "7-9"
    ],
    "imageUrl": "https://m.media-amazon.com/images/I/61f81pskpkL._AC_UL320_.jpg",
    "asin": "B0G8LKFGKM",
    "badge": "Vespa Oficial Piaggio"
  },
  {
    "id": "toy-patinete-electrico-xiaomi-serie6",
    "title": "Xiaomi Patinete Eléctrico Serie 6 Plegable con Doble Sistema de Frenado, Pantalla LED y Gran Autonomía",
    "shortTitle": "Patinete Eléctrico Xiaomi Oficial",
    "category": "sobre-ruedas",
    "wheelSubcategory": "patinetes-electricos",
    "categoryLabel": "Patinetes Eléctricos",
    "ages": [
      "10-12",
      "13+"
    ],
    "imageUrl": "https://m.media-amazon.com/images/I/61Af9QpZGfL._AC_UL320_.jpg",
    "asin": "B0GGZMGPZW",
    "badge": "Top Ventas Xiaomi"
  },
  {
    "id": "toy-patinete-electrico-cecotec-bongo",
    "title": "Cecotec Patinete Eléctrico Homologado DGT Bongo D20E Connected 500W con App Móvil, Disco de Freno y E-ABS",
    "shortTitle": "Patinete Eléctrico Cecotec Bongo DGT",
    "category": "sobre-ruedas",
    "wheelSubcategory": "patinetes-electricos",
    "categoryLabel": "Patinetes Eléctricos",
    "ages": [
      "10-12",
      "13+"
    ],
    "imageUrl": "https://m.media-amazon.com/images/I/61GTtfP4voL._AC_UL320_.jpg",
    "asin": "B0FKH5M3M5",
    "badge": "Homologado DGT 500W"
  },
  {
    "id": "toy-patinete-electrico-segway-ninebot-c2",
    "title": "Segway-Ninebot C2 Pro E - Patinete Eléctrico para Niños y Adolescentes con 3 Modos de Conducción, Luces RGB y Altavoz Bluetooth",
    "shortTitle": "Patinete Eléctrico Segway Ninebot C2",
    "category": "sobre-ruedas",
    "wheelSubcategory": "patinetes-electricos",
    "categoryLabel": "Patinetes Eléctricos",
    "ages": [
      "7-9",
      "10-12",
      "13+"
    ],
    "imageUrl": "https://m.media-amazon.com/images/I/61RWA1td5cL._AC_UL320_.jpg",
    "asin": "B0B3RZDXLT",
    "badge": "Segway Infantil y Juvenil"
  },
  {
    "id": "toy-patinete-electrico-infantil-led-tst",
    "title": "TST Patinete Eléctrico para Niños de 6 a 10 Años con Luces LED Arcoíris, 3 Alturas Ajustables y Freno Seguro",
    "shortTitle": "Patinete Eléctrico Infantil LED",
    "category": "sobre-ruedas",
    "wheelSubcategory": "patinetes-electricos",
    "categoryLabel": "Patinetes Eléctricos",
    "ages": [
      "4-6",
      "7-9",
      "10-12"
    ],
    "imageUrl": "https://m.media-amazon.com/images/I/61Z9elwsf2L._AC_UL320_.jpg",
    "asin": "B0GDJZ9Q4K",
    "badge": "Luces LED Neón"
  },
  {
    "id": "toy-hoverboard-kart-asiento-sisigad",
    "title": "SISIGAD Hoverboard 6.5 Pulgadas con Asiento Go-Kart Combo Incluido, Altavoz Bluetooth y Ruedas con Luces LED",
    "shortTitle": "Hoverboard con Asiento Go-Kart",
    "category": "sobre-ruedas",
    "wheelSubcategory": "patinetes-electricos",
    "categoryLabel": "Patinetes Eléctricos",
    "ages": [
      "7-9",
      "10-12",
      "13+"
    ],
    "imageUrl": "https://m.media-amazon.com/images/I/71GNRgtMAKL._AC_UL320_.jpg",
    "asin": "B0DJ8V37JG",
    "badge": "Pack Hoverboard + Kart"
  },
  {
    "id": "toy-skateboard-electrico-mando-cruiser",
    "title": "Skateboard Monopatín Eléctrico Motorizado con Mando Inalámbrico LED, 4 Modos de Velocidad y Tabla de Arce",
    "shortTitle": "Skateboard Eléctrico con Mando",
    "category": "sobre-ruedas",
    "wheelSubcategory": "patinetes-electricos",
    "categoryLabel": "Patinetes Eléctricos",
    "ages": [
      "10-12",
      "13+"
    ],
    "imageUrl": "https://m.media-amazon.com/images/I/71o-Em5OZpL._AC_UL320_.jpg",
    "asin": "B0HJWKT12Z",
    "badge": "Control Remoto 4 Velocidades"
  },
  {
    "id": "toy-gokart-pedales-homcom",
    "title": "HOMCOM Go-Kart de Pedales Deportivo para Niños con Asiento Ajustable, Freno de Mano y Marcha Atrás",
    "shortTitle": "Go-Kart de Pedales Deportivo",
    "category": "sobre-ruedas",
    "wheelSubcategory": "bicis-karts-patines",
    "categoryLabel": "Bicis, Karts y Patines",
    "ages": [
      "4-6",
      "7-9",
      "10-12"
    ],
    "imageUrl": "https://m.media-amazon.com/images/I/710XovbBCfL._AC_UL320_.jpg",
    "asin": "B0CP23MDX2",
    "badge": "Kart de Pedales Racing"
  },
  {
    "id": "toy-triciclo-evolutivo-kinderkraft",
    "title": "Kinderkraft Aveo 2 Pro - Triciclo Evolutivo Plegable con Barra de Empuje Parental, Capota y Cesta",
    "shortTitle": "Triciclo Evolutivo Kinderkraft Aveo",
    "category": "sobre-ruedas",
    "wheelSubcategory": "bicis-karts-patines",
    "categoryLabel": "Bicis, Karts y Patines",
    "ages": [
      "0-3",
      "4-6"
    ],
    "imageUrl": "https://m.media-amazon.com/images/I/71aGi6d6xaL._AC_SR160,134_CB1169409_QL70_.jpg",
    "asin": "B0FQPBQHRD",
    "badge": "Triciclo Evolutivo 3 en 1"
  },
  {
    "id": "toy-bicicleta-infantil-ruedines-stitch",
    "title": "STITCH Bicicleta Infantil de 14/16/18/20 Pulgadas con Ruedines Desmontables, Freno Doble y Cuadro de Acero",
    "shortTitle": "Bicicleta Infantil con Ruedines",
    "category": "sobre-ruedas",
    "wheelSubcategory": "bicis-karts-patines",
    "categoryLabel": "Bicis, Karts y Patines",
    "ages": [
      "4-6",
      "7-9",
      "10-12"
    ],
    "imageUrl": "https://m.media-amazon.com/images/I/71VdWTaft4L._AC_UL320_.jpg",
    "asin": "B0F7XKFMDK",
    "badge": "Tallas 14\" a 20\""
  },
  {
    "id": "toy-patines-linea-led-4tallas",
    "title": "Patines en Línea Infantiles Ajustables en 4 Tallas con 8 Ruedas Luminosas LED y Cierre de Triple Seguridad",
    "shortTitle": "Patines en Línea 4 Tallas con Luz LED",
    "category": "sobre-ruedas",
    "wheelSubcategory": "bicis-karts-patines",
    "categoryLabel": "Bicis, Karts y Patines",
    "ages": [
      "4-6",
      "7-9",
      "10-12",
      "13+"
    ],
    "imageUrl": "https://m.media-amazon.com/images/I/81iyOxLcvwL._AC_UL320_.jpg",
    "asin": "B0FB947KNV",
    "badge": "8 Ruedas Luminosas LED"
  },
  {
    "id": "toy-casco-motocross-pack-completo",
    "title": "Casco de Motocross Infantil Homologado con Gafas de Cross, Guantes y Máscara para Quad, Minimoto y MTB (Pack 4 en 1)",
    "shortTitle": "Casco Motocross Pack 4en1 con Gafas",
    "category": "seguridad",
    "categoryLabel": "Cascos & Seguridad",
    "ages": [
      "4-6",
      "7-9",
      "10-12",
      "13+"
    ],
    "imageUrl": "https://m.media-amazon.com/images/I/61TwlztLisS._AC_UL320_.jpg",
    "asin": "B0G43F7DLQ",
    "badge": "Pack Casco + Gafas + Guantes"
  },
  {
    "id": "toy-casco-cross-infantil-verde-samger",
    "title": "Samger DOT Casco Integral de Motocross y Quad Infantil con Guantes y Gafas de Protección Incluidas",
    "shortTitle": "Casco Cross Infantil Samger + Guantes",
    "category": "seguridad",
    "categoryLabel": "Cascos & Seguridad",
    "ages": [
      "4-6",
      "7-9",
      "10-12",
      "13+"
    ],
    "imageUrl": "https://m.media-amazon.com/images/I/71XgJR4L0wL._AC_UL320_.jpg",
    "asin": "B07M66RYQ2",
    "badge": "Homologado Cross & ATV"
  },
  {
    "id": "toy-casco-cross-enduro-pack",
    "title": "Casco Integral de Motocross, ATV y Karting para Niños y Jóvenes con Gafas Antivaho, Guantes y Máscara",
    "shortTitle": "Casco Integral ATV & Karting Pack",
    "category": "seguridad",
    "categoryLabel": "Cascos & Seguridad",
    "ages": [
      "7-9",
      "10-12",
      "13+"
    ],
    "imageUrl": "https://m.media-amazon.com/images/I/61Obgqu+c2L._AC_UL320_.jpg",
    "asin": "B0CRZ32864",
    "badge": "Carcasa ABS Antimpacto"
  },
  {
    "id": "toy-casco-integral-mentonera-rockbros",
    "title": "ROCKBROS Casco Integral Infantil 2 en 1 con Mentonera Desmontable para MTB, Patinete Eléctrico, BMX y Descenso",
    "shortTitle": "Casco Integral 2en1 ROCKBROS",
    "category": "seguridad",
    "categoryLabel": "Cascos & Seguridad",
    "ages": [
      "4-6",
      "7-9",
      "10-12",
      "13+"
    ],
    "imageUrl": "https://m.media-amazon.com/images/I/71xFLL5I5BL._AC_SR160,134_CB1169409_QL70_.jpg",
    "asin": "B09T32ZDKG",
    "badge": "Mentonera Desmontable"
  },
  {
    "id": "toy-casco-patinete-intermitentes-rockbros",
    "title": "ROCKBROS Casco con Luces LED Delanteras, Traseras e Intermitentes de Giro Inteligentes para Patinete y Bici",
    "shortTitle": "Casco LED con Intermitentes ROCKBROS",
    "category": "seguridad",
    "categoryLabel": "Cascos & Seguridad",
    "ages": [
      "10-12",
      "13+"
    ],
    "imageUrl": "https://m.media-amazon.com/images/I/61VrJ-R4uuL._AC_SR160,134_CB1169409_QL70_.jpg",
    "asin": "B0FP4HDJFL",
    "badge": "Luces LED e Intermitentes"
  },
  {
    "id": "toy-casco-infantil-rockbros-peques",
    "title": "ROCKBROS Casco Infantil Ajustable de Seguridad para Niños y Niñas en Bicicleta, Patinete y Patines",
    "shortTitle": "Casco Infantil Ajustable ROCKBROS",
    "category": "seguridad",
    "categoryLabel": "Cascos & Seguridad",
    "ages": [
      "0-3",
      "4-6",
      "7-9"
    ],
    "imageUrl": "https://m.media-amazon.com/images/I/610Ai3PnAqL._AC_SR160,134_CB1169409_QL70_.jpg",
    "asin": "B0DQV3MWYN",
    "badge": "Ultraligero y Seguro"
  },
  {
    "id": "toy-pack-casco-protecciones-kamugo",
    "title": "Kamugo Kit Completo de Casco Infantil Ajustable + 2 Rodilleras + 2 Coderas + 2 Muñequeras para Patines y Bici",
    "shortTitle": "Pack Casco + Rodilleras Kamugo 7en1",
    "category": "seguridad",
    "categoryLabel": "Cascos & Seguridad",
    "ages": [
      "0-3",
      "4-6",
      "7-9",
      "10-12"
    ],
    "imageUrl": "https://m.media-amazon.com/images/I/81x5-5W6xpL._AC_UL320_.jpg",
    "asin": "B0CGNDZRFW",
    "badge": "Pack Completo 7 Piezas"
  },
  {
    "id": "toy-set-protecciones-6en1-skatewiz",
    "title": "SKATEWIZ Set de 6 Protecciones para Patines, Patinete y Skate (Rodilleras, Coderas y Muñequeras con Bolsa)",
    "shortTitle": "Set 6 Protecciones SKATEWIZ",
    "category": "seguridad",
    "categoryLabel": "Cascos & Seguridad",
    "ages": [
      "4-6",
      "7-9",
      "10-12",
      "13+"
    ],
    "imageUrl": "https://m.media-amazon.com/images/I/91yXjafNZsL._AC_UL320_.jpg",
    "asin": "B08817MXXL",
    "badge": "Anti-Impacto 6 Piezas"
  },
  {
    "id": "toy-set-protecciones-nina-99flips",
    "title": "99FLIPS Protecciones de Patines y Monopatín para Niña y Niño con Rodilleras, Coderas y Muñequeras Ajustables",
    "shortTitle": "Set Protecciones Patines 99FLIPS",
    "category": "seguridad",
    "categoryLabel": "Cascos & Seguridad",
    "ages": [
      "0-3",
      "4-6",
      "7-9",
      "10-12"
    ],
    "imageUrl": "https://m.media-amazon.com/images/I/91pQddLbNgL._AC_UL320_.jpg",
    "asin": "B0DFMR7VQN",
    "badge": "Velcro Elástico Cómodo"
  },
  {
    "id": "toy-peto-integral-motocross-infantil",
    "title": "Fansport Equipo de Protección de Motocross 5 Piezas para Niños con Peto de Pecho, Espaldera, Rodilleras y Coderas",
    "shortTitle": "Peto Integral Motocross 5 Piezas",
    "category": "seguridad",
    "categoryLabel": "Cascos & Seguridad",
    "ages": [
      "4-6",
      "7-9",
      "10-12",
      "13+"
    ],
    "imageUrl": "https://m.media-amazon.com/images/I/71njHOhWVwL._AC_UL320_.jpg",
    "asin": "B08ZY5F3YC",
    "badge": "Armadura Completa Cross"
  },
  {
    "id": "toy-chaleco-protector-pecho-espalda",
    "title": "Peto Protector de Motocross y Quad para Niños Homologado CE con Protección de Pecho, Columna y Hombros",
    "shortTitle": "Chaleco Armadura Motocross CE",
    "category": "seguridad",
    "categoryLabel": "Cascos & Seguridad",
    "ages": [
      "4-6",
      "7-9",
      "10-12",
      "13+"
    ],
    "imageUrl": "https://m.media-amazon.com/images/I/5115mcT8v9L._AC_UL320_.jpg",
    "asin": "B0GYQ172LP",
    "badge": "Homologado CE Motocross"
  },
  {
    "id": "toy-guantes-motocross-infantil-rojos",
    "title": "Guantes de Motocross, Quad y BMX para Niños con Protección de Nudillos y Palma Antideslizante",
    "shortTitle": "Guantes Motocross y Quad Infantiles",
    "category": "seguridad",
    "categoryLabel": "Cascos & Seguridad",
    "ages": [
      "4-6",
      "7-9",
      "10-12",
      "13+"
    ],
    "imageUrl": "https://m.media-amazon.com/images/I/910fHbC8lXL._AC_UL320_.jpg",
    "asin": "B0GYDM4S3L",
    "badge": "Agarre Antideslizante"
  },
  {
    "id": "toy-guantes-bmx-beast-rage",
    "title": "BEAST RAGE Guantes de Motocross, Ciclismo y Patinete para Niños y Niñas Transpirables con Refuerzo en Palma",
    "shortTitle": "Guantes BMX y Cross BEAST RAGE",
    "category": "seguridad",
    "categoryLabel": "Cascos & Seguridad",
    "ages": [
      "4-6",
      "7-9",
      "10-12",
      "13+"
    ],
    "imageUrl": "https://m.media-amazon.com/images/I/81roSuU6VEL._AC_UL320_.jpg",
    "asin": "B0GVNY8N8T",
    "badge": "Transpirables & Resistentes"
  },
  {
    "id": "toy-casco-integral-agv-k1s",
    "title": "AGV K1 S Casco de Moto Integral Deportivo Homologado ECE 22.06 con Spoiler Aerodinámico",
    "shortTitle": "Casco Integral AGV K1 S ECE 22.06",
    "category": "seguridad",
    "categoryLabel": "Cascos & Seguridad",
    "ages": [
      "13+"
    ],
    "imageUrl": "https://m.media-amazon.com/images/I/71ATE-ticZL._AC_UL320_.jpg",
    "asin": "B0FHKZMNV6",
    "badge": "Gama Alta ECE 22.06"
  },
  {
    "id": "toy-casco-integral-ls2-rapid",
    "title": "LS2 Rapid II Casco Integral Urbano Ligero con Pantalla Antiarañazos y Ventilación Dinámica",
    "shortTitle": "Casco Integral LS2 Rapid II",
    "category": "seguridad",
    "categoryLabel": "Cascos & Seguridad",
    "ages": [
      "10-12",
      "13+"
    ],
    "imageUrl": "https://m.media-amazon.com/images/I/81pf7yGfy0L._AC_UL320_.jpg",
    "asin": "B0FXY5173Q",
    "badge": "Súper Ventas LS2"
  },
  {
    "id": "toy-candado-disco-alarma-110db",
    "title": "Candado Antirrobo de Disco con Alarma Sonora 110 dB y Cable Recordatorio para Moto y Patinete Eléctrico",
    "shortTitle": "Candado de Disco con Alarma 110dB",
    "category": "seguridad",
    "categoryLabel": "Cascos & Seguridad",
    "ages": [
      "10-12",
      "13+"
    ],
    "imageUrl": "https://m.media-amazon.com/images/I/71v7gsfQ7cL._AC_UL320_.jpg",
    "asin": "B09MW8RFSY",
    "badge": "Alarma Antirrobo 110 dB"
  },
  {
    "id": "toy-bolsa-manillar-impermeable-rockbros",
    "title": "ROCKBROS Bolsa de Cuadro y Manillar Impermeable con Ventana Táctil para Móvil en Bici y Patinete",
    "shortTitle": "Bolsa Impermeable Táctil ROCKBROS",
    "category": "seguridad",
    "categoryLabel": "Cascos & Seguridad",
    "ages": [
      "7-9",
      "10-12",
      "13+"
    ],
    "imageUrl": "https://m.media-amazon.com/images/I/71CT2jP8zlL._AC_UL320_.jpg",
    "asin": "B07WPH2W2W",
    "badge": "Pantalla Táctil Impermeable"
  },
  {
    "id": "toy-multiherramienta-ciclismo-topeak",
    "title": "Topeak Hexus X Multiherramienta Compacta de 21 Funciones para Bicicleta, Patinete y Quads",
    "shortTitle": "Multiherramienta 21 en 1 Topeak",
    "category": "seguridad",
    "categoryLabel": "Cascos & Seguridad",
    "ages": [
      "10-12",
      "13+"
    ],
    "imageUrl": "https://m.media-amazon.com/images/I/71SF4jQMskL._AC_UL320_.jpg",
    "asin": "B078NZMTMR",
    "badge": "21 Herramientas en 1"
  }
];

export function buildAmazonRemoteCartUrl(asins: string[], tag: string = 'vapegadgets22-21'): string {
  if (!asins || asins.length === 0) {
    return `https://www.amazon.es/?tag=${tag}`;
  }
  const validAsins = Array.from(new Set(asins.filter(a => a && a.length >= 8))).slice(0, 10);
  if (validAsins.length === 0) {
    return `https://www.amazon.es/?tag=${tag}`;
  }
  const params = new URLSearchParams();
  params.set('tag', tag);
  validAsins.forEach((asin, idx) => {
    params.set(`ASIN.${idx + 1}`, asin);
    params.set(`Quantity.${idx + 1}`, '1');
  });
  return `https://www.amazon.es/gp/aws/cart/add.html?${params.toString()}`;
}
