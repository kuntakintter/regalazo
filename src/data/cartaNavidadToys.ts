export interface ChristmasToy {
  id: string;
  title: string;
  shortTitle: string;
  category: 'lego' | 'coches' | 'peluches' | 'gaming' | 'juegos' | 'creatividad';
  categoryLabel: string;
  imageUrl: string;
  asin: string;
  badge?: string;
}

export const CHRISTMAS_CATEGORIES = [
  { id: 'all', label: '🌟 Todos los Juguetes', icon: '🌟' },
  { id: 'lego', label: '🧱 LEGO & Bloques', icon: '🧱' },
  { id: 'coches', label: '🏎️ Coches & Pistas', icon: '🏎️' },
  { id: 'peluches', label: '🧸 Muñecas & Peluches', icon: '🧸' },
  { id: 'gaming', label: '🎮 Gaming & Pokémon', icon: '🎮' },
  { id: 'juegos', label: '🎲 Juegos de Mesa', icon: '🎲' },
  { id: 'creatividad', label: '🎨 Arte & Dibujo', icon: '🎨' },
];

export const CHRISTMAS_TOYS: ChristmasToy[] = [
  // LEGO & CONSTRUCCIÓN
  {
    id: 'toy-lego-marvel-adviento',
    title: 'LEGO Marvel - Calendario de Adviento con 24 Minifiguras y Accesorios de Superhéroes',
    shortTitle: 'LEGO Marvel Calendario de Adviento',
    category: 'lego',
    categoryLabel: 'LEGO & Bloques',
    imageUrl: 'https://m.media-amazon.com/images/I/81lDif6INrL._AC_UL320_.jpg',
    asin: 'B0GGSM14GC',
    badge: 'Top Deseo 2026'
  },
  {
    id: 'toy-lego-star-wars-xwing',
    title: 'LEGO Star Wars - Caza Ala-X de Luke Skywalker con R2-D2 y Princesa Leia',
    shortTitle: 'LEGO Star Wars Caza X-Wing',
    category: 'lego',
    categoryLabel: 'LEGO & Bloques',
    imageUrl: 'https://m.media-amazon.com/images/I/81x1YJj7y8L._AC_UL320_.jpg',
    asin: 'B08G4GB1X2',
    badge: 'Favorito de Star Wars'
  },
  {
    id: 'toy-lego-harry-potter-hogwarts',
    title: 'LEGO Harry Potter - Castillo de Hogwarts: Gran Comedor con Figuras Mágicas',
    shortTitle: 'LEGO Harry Potter Gran Comedor',
    category: 'lego',
    categoryLabel: 'LEGO & Bloques',
    imageUrl: 'https://m.media-amazon.com/images/I/81+m0f34-IL._AC_UL320_.jpg',
    asin: 'B0C7J9KL88',
    badge: 'Mundillo Mágico'
  },
  {
    id: 'toy-lego-classic-caja-grande',
    title: 'LEGO Classic - Caja Grande de Ladrillos de Construcción Creativa con 790 Piezas',
    shortTitle: 'LEGO Classic Caja Creativa 790 Piezas',
    category: 'lego',
    categoryLabel: 'LEGO & Bloques',
    imageUrl: 'https://m.media-amazon.com/images/I/71wZl6sTq5L._AC_UL320_.jpg',
    asin: 'B00NVDP38M',
    badge: 'Creatividad Ilimitada'
  },

  // COCHES & PISTAS
  {
    id: 'toy-carrera-first-mario-kart',
    title: 'Carrera First - Circuito de Carreras Nintendo Mario Kart con Mandos Ergonómicos',
    shortTitle: 'Circuito Carrera Mario Kart',
    category: 'coches',
    categoryLabel: 'Coches & Pistas',
    imageUrl: 'https://m.media-amazon.com/images/I/718yFwM7+1L._AC_UL320_.jpg',
    asin: 'B079Z5J2R4',
    badge: 'Circuito Nº1 en Ventas'
  },
  {
    id: 'toy-hot-wheels-choques-aereos',
    title: 'Hot Wheels - Pista de Carreras de Choques Aéreos Motorizada con Lanzador Giratorio',
    shortTitle: 'Pista Hot Wheels Choques Giratorios',
    category: 'coches',
    categoryLabel: 'Coches & Pistas',
    imageUrl: 'https://m.media-amazon.com/images/I/81kX9i4b4vL._AC_UL320_.jpg',
    asin: 'B07B4M27B3',
    badge: 'Acción Extrema'
  },
  {
    id: 'toy-monster-truck-radiocontrol',
    title: 'Coche Teledirigido 4x4 Todo Terreno Radiocontrol con Batería Recargable',
    shortTitle: 'Coche 4x4 Radiocontrol Todo Terreno',
    category: 'coches',
    categoryLabel: 'Coches & Pistas',
    imageUrl: 'https://m.media-amazon.com/images/I/71R2QZ2eGHL._AC_UL320_.jpg',
    asin: 'B08F2CVZ88',
    badge: 'Teledirigido Top'
  },

  // PELUCHES & MUÑECAS
  {
    id: 'toy-pokemon-peluche-pikachu',
    title: 'Peluche Oficial Pokémon Pikachu Grande 30cm Súper Suave y Achuchable',
    shortTitle: 'Peluche Oficial Pikachu 30cm',
    category: 'peluches',
    categoryLabel: 'Muñecas & Peluches',
    imageUrl: 'https://m.media-amazon.com/images/I/61kM5F+vTQL._AC_UL320_.jpg',
    asin: 'B07V493R3H',
    badge: 'Súper Achuchable'
  },
  {
    id: 'toy-stitch-peluche-disney',
    title: 'Disney Store - Peluche Oficial de Stitch con Orejas Grandes de Terciopelo',
    shortTitle: 'Peluche Disney Stitch',
    category: 'peluches',
    categoryLabel: 'Muñecas & Peluches',
    imageUrl: 'https://m.media-amazon.com/images/I/71-k9fG80xL._AC_UL320_.jpg',
    asin: 'B08G8K7TY2',
    badge: 'Favorito Disney'
  },
  {
    id: 'toy-barbie-armario-moda',
    title: 'Barbie - Armario Portátil Fashionista con Vestidos, Perchas y Accesorios de Moda',
    shortTitle: 'Barbie Armario Portátil con Moda',
    category: 'peluches',
    categoryLabel: 'Muñecas & Peluches',
    imageUrl: 'https://m.media-amazon.com/images/I/81KjL7Y1N+L._AC_UL320_.jpg',
    asin: 'B00R80M5TI',
    badge: 'Clásico Estrella'
  },

  // GAMING & POKÉMON
  {
    id: 'toy-pokemon-elite-trainer-box',
    title: 'Pokémon TCG - Caja de Entrenador Élite con 9 Sobres, Fundas y Dados Holográficos',
    shortTitle: 'Caja Élite Pokémon TCG',
    category: 'gaming',
    categoryLabel: 'Gaming & Pokémon',
    imageUrl: 'https://m.media-amazon.com/images/I/81iK9dZ6w1L._AC_UL320_.jpg',
    asin: 'B0H8SV3WJ8',
    badge: 'Cartas Coleccionables'
  },
  {
    id: 'toy-pokemon-album-archivador',
    title: 'Álbum Archivador de Cartas Pokémon con 432 Bolsillos y Cremallera de Seguridad',
    shortTitle: 'Álbum Archivador 432 Cartas Pokémon',
    category: 'gaming',
    categoryLabel: 'Gaming & Pokémon',
    imageUrl: 'https://m.media-amazon.com/images/I/71tQe4oX5VL._AC_UL320_.jpg',
    asin: 'B0FF42SHGN',
    badge: 'Imprescindible Colección'
  },
  {
    id: 'toy-mando-inalambrico-switch',
    title: 'Mando Inalámbrico Pro para Nintendo Switch con Giroscopio y Vibración Doble',
    shortTitle: 'Mando Inalámbrico Nintendo Switch',
    category: 'gaming',
    categoryLabel: 'Gaming & Pokémon',
    imageUrl: 'https://m.media-amazon.com/images/I/61k1qH4w+4L._AC_UL320_.jpg',
    asin: 'B08F9VXYZ1',
    badge: 'Para Jugar en Familia'
  },

  // JUEGOS DE MESA
  {
    id: 'toy-virus-juego-cartas',
    title: 'VIRUS! - El Juego de Cartas Más Contagioso y Divertido para Toda la Familia',
    shortTitle: 'Juego de Cartas VIRUS!',
    category: 'juegos',
    categoryLabel: 'Juegos de Mesa',
    imageUrl: 'https://m.media-amazon.com/images/I/71uK5L7z1SL._AC_UL320_.jpg',
    asin: '8467571343',
    badge: 'El Nº1 de España'
  },
  {
    id: 'toy-dobble-clasico',
    title: 'Dobble Clásico - Juego de Cartas de Rapidez Visual y Reflejos para Niños y Adultos',
    shortTitle: 'Dobble Clásico Juego de Reflejos',
    category: 'juegos',
    categoryLabel: 'Juegos de Mesa',
    imageUrl: 'https://m.media-amazon.com/images/I/71g0P9o8L6L._AC_UL320_.jpg',
    asin: 'B007X6J8L0',
    badge: 'Súper Divertido'
  },
  {
    id: 'toy-fantasma-blitz',
    title: 'Fantasma Blitz - Juego de Agilidad Mental y Reflejos Rápidos en Familia',
    shortTitle: 'Fantasma Blitz Juego de Mesa',
    category: 'juegos',
    categoryLabel: 'Juegos de Mesa',
    imageUrl: 'https://m.media-amazon.com/images/I/71G1f6+n8+L._AC_UL320_.jpg',
    asin: 'B004V812X2',
    badge: 'Risas Aseguradas'
  },

  // CREATIVIDAD & ARTE
  {
    id: 'toy-maletin-dibujo-145-piezas',
    title: 'Maletín de Pintura y Dibujo de Aluminio con 145 Piezas de Acuarelas, Óleos y Ceras',
    shortTitle: 'Maletín Artístico 145 Piezas',
    category: 'creatividad',
    categoryLabel: 'Arte & Dibujo',
    imageUrl: 'https://m.media-amazon.com/images/I/81dGz+q4XKL._AC_UL320_.jpg',
    asin: 'B07MVD9W22',
    badge: 'Para Pequeños Artistas'
  },
  {
    id: 'toy-pizarra-magica-luz-led',
    title: 'Pizarra Mágica Infantil con Luz LED y Plantillas de Dibujo que Brillan en la Oscuridad',
    shortTitle: 'Pizarra Mágica con Luz LED Neón',
    category: 'creatividad',
    categoryLabel: 'Arte & Dibujo',
    imageUrl: 'https://m.media-amazon.com/images/I/71k4o7S4JNL._AC_UL320_.jpg',
    asin: 'B08FCVTY88',
    badge: 'Brilla en la Oscuridad'
  },
  {
    id: 'toy-playdoh-dentista-bromista',
    title: 'Play-Doh - Dentista Bromista Clásico con Pasta de Moldear y Torno Giratorio',
    shortTitle: 'Play-Doh Dentista Bromista',
    category: 'creatividad',
    categoryLabel: 'Arte & Dibujo',
    imageUrl: 'https://m.media-amazon.com/images/I/81x-M7LqU+L._AC_UL320_.jpg',
    asin: 'B00004UBHO',
    badge: 'Clásico Divertido'
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
