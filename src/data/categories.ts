export interface AgeCategoryMeta {
  id: '0-12m' | '1-3' | '4-6' | '7-9' | '10-12' | '13-15' | '16-18';
  label: string;
  tagline: string;
  description: string;
  h1: string;
  seoKeywords: string[];
  theme: 'baby' | 'kids' | 'gamer' | 'emo' | 'tech' | 'classic';
  icon: string;
}

export const AGE_CATEGORIES: AgeCategoryMeta[] = [
  {
    id: '0-12m',
    label: 'Recién Nacidos (0-12m)',
    tagline: 'Cochecitos, cunas de colecho, bañeras, tartas de pañales, cuentos y colonias suaves',
    description: 'Los mejores regalos y artículos esenciales para recién nacidos: desde sillas de paseo y cunas hasta tartas de pañales Dodot, bañeras seguras, canastillas, cuentos de tela y colonias sin alcohol.',
    h1: 'Regalos y Artículos Esenciales para Recién Nacidos y Bebés (0 a 12 Meses)',
    seoKeywords: ['regalos recién nacido', 'cochecito bebe', 'cuna colecho chicco', 'tarta de pañales dodot', 'bañera bebe plegable', 'colonia suavinex bebe'],
    theme: 'baby',
    icon: '🧸'
  },
  {
    id: '1-3',
    label: '1 a 3 Años',
    tagline: 'Torres de aprendizaje, Montessori, triciclos, cuentos interactivos y primeros pasos',
    description: 'Juguetes educativos de madera, torres de aprendizaje, triciclos evolutivos, plastilina Play-Doh, cuentos con solapas como El Pollo Pepe y ropa de primeros pasos.',
    h1: 'Regalos Educativos y Montessori para Niños y Niñas de 1 a 3 Años',
    seoKeywords: ['regalos niños 1 año', 'juguetes montessori 2 años', 'triciclo evolutivo bebe', 'torre de aprendizaje', 'el pollo pepe cuento'],
    theme: 'kids',
    icon: '🧩'
  },
  {
    id: '4-6',
    label: '4 a 6 Años',
    tagline: 'Circuitos Mario Kart, juegos de mesa iniciales, cuentos ilustrados y creatividad',
    description: 'Juegos cooperativos como El Monstruo de Colores, circuitos de coches de Mario Kart, patinetes con ruedas LED, maletines de pintura y disfraces infantiles.',
    h1: 'Ideas de Regalo para Niños y Niñas de 4 a 6 Años',
    seoKeywords: ['regalos niña 4 años', 'regalos niño 5 años', 'juegos educativos 6 años', 'circuito mario kart carrera first', 'el monstruo de colores'],
    theme: 'kids',
    icon: '🎨'
  },
  {
    id: '7-9',
    label: '7 a 9 Años',
    tagline: 'Scalextric, Magia Borrás, LEGO Creator, cómics y estrategia familiar',
    description: 'Circuitos Scalextric Compact, coches teledirigidos 4x4, sets LEGO Creator 3 en 1, cajas de Magia Borrás, Catan Junior y los cómics infantiles más divertidos.',
    h1: 'Juegos de Magia, Scalextric, LEGO y Regalos para Niños de 7 a 9 Años',
    seoKeywords: ['scalextric compact pista', 'juegos de magia borras', 'catan junior devir', 'lego creator 3 en 1', 'regalos nino 8 anos', 'comics infantiles'],
    theme: 'classic',
    icon: '🎩'
  },
  {
    id: '10-12',
    label: '10 a 12 Años',
    tagline: 'Juegos de cartas competitivos (Virus!), drones, escape room y novelas juveniles',
    description: 'El superventas Virus!, minidrones resistentes anticolisión, escape rooms familiares, novelas de Harry Potter y Diario de Greg, rotuladores de lettering y sudaderas urbanas.',
    h1: 'Regalos para Preadolescentes de 10 a 12 Años',
    seoKeywords: ['juego virus tranjis games', 'dron infantil camara potensic', 'diario de greg libro', 'regalos preadolescentes 11 anos', 'carcassonne devir'],
    theme: 'classic',
    icon: '🚀'
  },
  {
    id: '13-15',
    label: '13 a 15 Años',
    tagline: 'Auriculares ANC, fotografía instantánea, Catan, skincare juvenil y estilo teen',
    description: 'Auriculares inalámbricos con cancelación de ruido, cámaras instantáneas Instax Mini, juego Catan oficial, rutina CeraVe antiacné, manga y mochilas urbanas.',
    h1: 'Regalos para Adolescentes de 13 a 15 Años',
    seoKeywords: ['regalos 14 anos', 'auriculares jbl bluetooth', 'fujifilm instax mini 12', 'catan juego de mesa', 'skincare cerave adolescente'],
    theme: 'gamer',
    icon: '🎧'
  },
  {
    id: '16-18',
    label: '16 a 18 Años',
    tagline: 'PlayStation 5, setup gamer, sonido prémium, perfumería, libros y estilo personal',
    description: 'Accesorios PS5 de competición, periféricos gaming Logitech, realidad virtual, diarios de cuero artesanal, fragancias icónicas CK One, libros inspiradores y moda urbana.',
    h1: 'Regalos para Jóvenes de 16 a 18 Años (Gaming, Tech, Perfumería, Libros y Moda)',
    seoKeywords: ['juegos ps5 spiderman 2', 'mando dualsense edge ps5', 'calvin klein ck one original', 'diario cuero vintage moonster', 'regalos 18 anos chico chica'],
    theme: 'gamer',
    icon: '⚡'
  }
];

export const PRICE_FILTERS = [
  { id: 'all', label: 'Cualquier Presupuesto' },
  { id: '<20', label: 'Menos de 20 € (Detalles económicos)' },
  { id: '20-50', label: '20 € a 50 € (Regalo perfecto)' },
  { id: '50-100', label: '50 € a 100 € (Regalazo prémium)' },
  { id: '>100', label: 'Más de 100 € (Ocasión especial)' }
];

export const AGE_SUBCATEGORIES_MAP: Record<string, string[]> = {
  'all': [
    'Juegos de Mesa y Cartas',
    'LEGO y Construcción',
    'Scalextric y Circuitos de Coches',
    'Videojuegos y Setup Gamer',
    'Libros y Lectura Infantil y Juvenil',
    'Perfumería, Colonias y Fragancias',
    'Manualidades y Creatividad',
    'Moda, Ropa y Accesorios',
    'Cochecitos y Esenciales de Bebé',
    'Tecnología y Gadgets',
    'Bicis y Patinetes con Ruedas',
    'Fiestas y Revelación de Género'
  ],
  '0-12m': [
    'Cochecitos y Mobiliario de Bebé',
    'Cunas de Colecho y Descanso',
    'Bañeras e Higiene del Bebé',
    'Tartas de Pañales y Canastillas',
    'Juguetes Sensoriales y Mordedores',
    'Libros Blandos y Cuentos de Tela',
    'Colonias y Cuidado de Bebé',
    'Ropa, Bodies y Patucos',
    'Fiestas y Revelación de Género'
  ],
  '1-3': [
    'Juguetes Montessori y Madera',
    'LEGO DUPLO y Construcción',
    'Triciclos y Bicis de Equilibrio',
    'Cuentos y Libros Infantiles',
    'Cocina Infantil y Juegos de Imitación',
    'Manualidades, Plastilina y Pintura',
    'Colonias Infantiles y Cuidado',
    'Ropa y Zapatillas Primeros Pasos'
  ],
  '4-6': [
    'Circuitos de Coches Infantiles',
    'Juegos de Mesa Infantiles',
    'Patinetes con Ruedas LED',
    'Cuentos y Primeros Lectores',
    'Manualidades, Dibujo y Pintura',
    'Peluches Interactivos y Muñecos',
    'Disfraces y Ropa Infantil',
    'Colonias Infantiles Frescas'
  ],
  '7-9': [
    'Scalextric y Pistas de Carreras',
    'Coches RC y Teledirigidos',
    'LEGO Creator y Construcción',
    'Juegos de Magia Borrás',
    'Juegos de Mesa y Estrategia Familiar',
    'Libros y Cómics Infantiles',
    'Manualidades y Kits Creativos',
    'Colonias y Cuidado Personal Infantil',
    'Moda y Ropa Deportiva Infantil'
  ],
  '10-12': [
    'Juegos de Cartas Competitivos (Virus!)',
    'Drones RC y Robótica STEM',
    'Juegos de Mesa y Escape Room',
    'Libros Juveniles y Cómics',
    'Manualidades, Lettering y Creatividad',
    'Magia Borrás Avanzada',
    'Colonias y Cuidado Juvenil',
    'Moda Urbana, Sudaderas y Mochilas'
  ],
  '13-15': [
    'Auriculares Inalámbricos y Audio',
    'Cámaras Instantáneas y Fotografía',
    'Juegos de Mesa Clásicos (Catan)',
    'Cuidado Facial, Skincare y Colonias',
    'Libros Juveniles, Fantasía y Manga',
    'Papelería Creativa y Bullet Journal',
    'Moda Juvenil, Sudaderas y Gorras',
    'Mochilas Urbanas y Viaje'
  ],
  '16-18': [
    'Videojuegos y Accesorios PS5',
    'Setup Gamer y Periféricos PC',
    'Tecnología, Audio Hi-Fi y Wearables',
    'Perfumería y Fragancias',
    'Libros y Novelas Juveniles',
    'Cuadernos de Piel y Papelería Artesanal',
    'Moda Urbana, Ropa y Accesorios'
  ],
  'reveal': [
    'Fiestas y Revelación de Género'
  ]
};
