import { I18N_SEO_ROUTES } from '@/lib/i18nRoutes';
import { localizeRoutePath } from '@/lib/localizedSlugs';
import { SEO_AGE_ROUTES } from '@/lib/seoRoutes';
import {
  Product,
  GENERAL_CATEGORY_MAPPING,
  CLOTHING_SUBFILTERS,
  ANIME_SERIES_SUBFILTERS,
  WHEELS_MOTOR_SUBFILTERS,
  isClothingCategory,
  isFiguresCategory,
  isWheelsMotorCategory,
} from '@/data/products';
import { ALL_SITE_PRODUCTS } from '@/data/allCatalogProducts';
import { matchesAnyKeywordWordSafe, matchesPriceFilter } from '@/lib/filterUtils';

export const BASE_SITE_URL = 'https://www.unbuenregalo.es';

/**
 * Los 17 hubs temáticos estáticos indexables del sitio
 * (excluye las 3 páginas legales con robots noindex).
 */
export const ALL_STATIC_HUB_SLUGS: string[] = [
  'motoristas',
  'automovil',
  'ciclismo',
  'gaming',
  'amantes-del-cafe',
  'mascotas',
  'halloween',
  'navidad',
  'carta-papa-noel',
  'regalos-gta-6',
  'que-regalar-a-un-hombre',
  'que-regalar-a-una-mujer',
  'que-regalar-a-mi-novio',
  'que-regalar-a-mi-novia',
  'regalos-para-los-que-tienen-de-todo',
  'regalos-menos-20-euros',
  'votar',
];

export type FilterKind = 'category' | 'clothing' | 'anime' | 'wheels' | 'price' | 'gender';

export interface SeoFilterRouteMeta {
  slug: string;
  filterKind: FilterKind;
  filterValue: string;
  label: string;
  title: string;
  h1: string;
  description: string;
  tagline: string;
  keywords: string[];
  liveSearchQuery: string;
  icon: string;
}

export const SEO_FILTER_ROUTES: Record<string, SeoFilterRouteMeta> = {
  // --------------------------------------------------------------------------
  // 18 Categorías Generales (GENERAL_CATEGORY_MAPPING + AGE_SUBCATEGORIES_MAP['all'])
  // --------------------------------------------------------------------------
  'sobre-ruedas-coches-quads-y-patinetes': {
    slug: 'sobre-ruedas-coches-quads-y-patinetes',
    filterKind: 'category',
    filterValue: 'Sobre Ruedas: Coches, Quads y Patinetes',
    label: 'Sobre Ruedas: Coches, Quads y Patinetes',
    title: 'Un Buen Regalo Sobre Ruedas 【2026】 Coches Eléctricos, Quads, Minimotos y Patinetes',
    h1: 'Regalo y Regalos Sobre Ruedas: Coches Eléctricos, Quads y Patinetes',
    description:
      'Encuentra un buen regalo sobre ruedas para niños y jóvenes: coches eléctricos 12V y 24V con mando, quads, minimotos cross 49cc, triciclos y patinetes eléctricos homologados.',
    tagline: 'Coches eléctricos con licencia, quads 4x4, minimotos y patinetes top ventas',
    keywords: [
      'regalo coche electrico nino',
      'regalos sobre ruedas ninos',
      'coche electrico 12v mando parental',
      'quad electrico ninos',
      'minimoto cross 49cc',
      'patinete electrico homologado dgt',
    ],
    liveSearchQuery: 'coche electrico para ninos 12v quad minimoto patinete electrico',
    icon: '🏎️',
  },
  'smartphones-y-telefonia': {
    slug: 'smartphones-y-telefonia',
    filterKind: 'category',
    filterValue: 'Smartphones y Telefonía',
    label: 'Smartphones y Telefonía',
    title: 'Un Buen Regalo Tecnológico 【2026】 Smartphones, Móviles e Ideas de Telefonía',
    h1: 'Regalo y Regalos de Smartphones y Telefonía Recomendados 2026',
    description:
      '¿Buscas regalar un móvil nuevo? Comparativa de smartphones para adolescentes, adultos y buques insignia (iPhone, Samsung Galaxy, Xiaomi y Pixel) con opiniones reales.',
    tagline: 'Teléfonos móviles por gama y presupuesto desde calidad-precio hasta buques insignia',
    keywords: [
      'regalo smartphone',
      'regalos smartphones y telefonia',
      'mejor movil para regalar',
      'telefono regalo adolescente',
      'iphone samsung xiaomi regalo',
    ],
    liveSearchQuery: 'smartphones libres telefono movil ofertas amazon',
    icon: '📱',
  },
  'cartas-y-sobres-pokemon': {
    slug: 'cartas-y-sobres-pokemon',
    filterKind: 'category',
    filterValue: 'Cartas y Sobres Pokémon',
    label: 'Cartas y Sobres Pokémon',
    title: 'Un Buen Regalo Pokémon TCG 【2026】 Cartas, Sobres Booster y Cajas Élite',
    h1: 'Regalo y Regalos de Cartas y Sobres Pokémon Oficiales TCG',
    description:
      'Cajas de Entrenador Élite (ETB), latas metálicas con carta holográfica, sobres booster oficiales, mazos de combate y álbumes archivadores para coleccionistas Pokémon.',
    tagline: 'Cajas ETB, sobres booster, mazos listos para jugar y álbumes protectores',
    keywords: [
      'regalo cartas pokemon',
      'regalos sobres pokemon tcg',
      'elite trainer box pokemon espanol',
      'album cartas pokemon 400 bolsillos',
      'lata coleccion pokemon',
    ],
    liveSearchQuery: 'cartas pokemon sobres booster box elite trainer album tcg oficial',
    icon: '⚡',
  },
  'figuras-de-coleccion-y-cine': {
    slug: 'figuras-de-coleccion-y-cine',
    filterKind: 'category',
    filterValue: 'Figuras de Colección y Cine',
    label: 'Figuras de Colección y Cine',
    title: 'Un Buen Regalo Friki 【2026】 Figuras de Colección, Anime y Cine',
    h1: 'Regalo y Regalos de Figuras de Colección, Anime y Cine',
    description:
      'Las mejores figuras oficiales Banpresto de anime (Dragon Ball, One Piece, Naruto, Demon Slayer), Funko Pop!, réplicas metálicas Die-Cast y coleccionismo de cine.',
    tagline: 'Estatuas Banpresto, manga, réplicas de cine y figuras oficiales para vitrina',
    keywords: [
      'regalo figura anime',
      'regalos figuras de coleccion y cine',
      'figuras banpresto anime oficiales',
      'coches diecast coleccion cine',
      'regalo coleccionista cine friki',
    ],
    liveSearchQuery: 'figuras coleccion anime peliculas banpresto jada toys funko pop',
    icon: '🎎',
  },
  'juegos-de-mesa-y-cartas': {
    slug: 'juegos-de-mesa-y-cartas',
    filterKind: 'category',
    filterValue: 'Juegos de Mesa y Cartas',
    label: 'Juegos de Mesa y Cartas',
    title: 'Un Buen Regalo Familiar 【2026】 Los Mejores Juegos de Mesa y Cartas',
    h1: 'Regalo y Regalos de Juegos de Mesa y Cartas para Todas las Edades',
    description:
      'Desde juegos cooperativos infantiles y Virus! hasta Catan, Dixit, Escape Room en casa y estrategia para parejas y adultos. Diversión asegurada sin pantallas.',
    tagline: 'Estrategia, cartas rápidas, escape rooms y clásicos familiares premiados',
    keywords: [
      'regalo juego de mesa',
      'regalos juegos de mesa y cartas',
      'mejores juegos mesa familia',
      'juego cartas divertido amigos',
      'catan virus dixit regalo',
    ],
    liveSearchQuery: 'juegos de mesa estrategia familia cartas populares amazon',
    icon: '🎲',
  },
  'lego-y-construccion': {
    slug: 'lego-y-construccion',
    filterKind: 'category',
    filterValue: 'LEGO y Construcción',
    label: 'LEGO y Construcción',
    title: 'Un Buen Regalo LEGO 【2026】 Sets de Construcción DUPLO, Creator e Icons',
    h1: 'Regalo y Regalos de LEGO y Sets de Construcción por Edades',
    description:
      'Sets LEGO DUPLO desde 18 meses, LEGO Creator 3 en 1 para niños, LEGO Star Wars y maquetas LEGO Icons Botanicals de exposición para adultos.',
    tagline: 'Construcciones LEGO originales desde preescolar hasta coleccionismo adulto',
    keywords: [
      'regalo lego nino adulto',
      'regalos lego y construccion',
      'lego duplo ninos pequenos',
      'lego creator 3 en 1',
      'lego icons adultos botanicals',
    ],
    liveSearchQuery: 'lego construccion creator duplo icons star wars oficial',
    icon: '🧱',
  },
  'scalextric-y-circuitos-de-coches': {
    slug: 'scalextric-y-circuitos-de-coches',
    filterKind: 'category',
    filterValue: 'Scalextric y Circuitos de Coches',
    label: 'Scalextric y Circuitos de Coches',
    title: 'Un Buen Regalo de Pistas 【2026】 Scalextric, Circuitos y Coches Teledirigidos RC',
    h1: 'Regalo y Regalos de Scalextric, Circuitos y Coches Teledirigidos RC',
    description:
      'Circuitos Mario Kart para pequeños pilotos, pistas Scalextric Compact y coches teledirigidos RC 4x4 acrobáticos para correr en familia.',
    tagline: 'Pistas eléctricas, circuitos de carreras y coches RC todoterreno',
    keywords: [
      'regalo scalextric circuito',
      'regalos circuitos de coches y rc',
      'scalextric compact ninos',
      'coche teledirigido 4x4 regalo',
    ],
    liveSearchQuery: 'scalextric circuito carreras mario kart coche teledirigido rc',
    icon: '🏁',
  },
  'videojuegos-y-setup-gamer': {
    slug: 'videojuegos-y-setup-gamer',
    filterKind: 'category',
    filterValue: 'Videojuegos y Setup Gamer',
    label: 'Videojuegos y Setup Gamer',
    title: 'Un Buen Regalo Gamer 【2026】 Videojuegos PS5 y Periféricos Setup PC',
    h1: 'Regalo y Regalos de Videojuegos PS5 y Setup Gamer',
    description:
      'Juegos estrella de PlayStation 5, mandos oficiales, ratones de precisión Logitech, auriculares gaming, alfombrillas XXL y teclados RGB.',
    tagline: 'Hardware gaming PC, juegos de consola PS5 y periféricos de competición',
    keywords: [
      'regalo videojuego ps5 gamer',
      'regalos videojuegos y setup gamer',
      'perifericos pc gamer baratos',
      'mando consola auriculares gaming',
    ],
    liveSearchQuery: 'videojuegos ps5 perifericos setup gamer raton teclado auriculares',
    icon: '🎮',
  },
  'libros-y-lectura-infantil-y-juvenil': {
    slug: 'libros-y-lectura-infantil-y-juvenil',
    filterKind: 'category',
    filterValue: 'Libros y Lectura Infantil y Juvenil',
    label: 'Libros y Lectura Infantil y Juvenil',
    title: 'Un Buen Regalo Literario 【2026】 Cuentos, Cómics, Manga y Novelas Superventas',
    h1: 'Regalo y Regalos de Libros, Cuentos, Cómics y Manga Recomendados',
    description:
      'Desde cuentos sensoriales de tela para bebés y El Pollo Pepe hasta Diario de Greg, Harry Potter, Los Compas, manga One Piece y thrillers juveniles.',
    tagline: 'Lecturas que enganchan a bebés, niños, jóvenes y amantes del manga',
    keywords: [
      'regalo libro cuento infantil',
      'regalos libros lectura juvenil',
      'cuentos ninos manga comics regalo',
      'novelas adolescentes superventas',
    ],
    liveSearchQuery: 'libros infantiles juveniles cuentos comics manga superventas',
    icon: '📚',
  },
  'perfumeria-colonias-y-fragancias': {
    slug: 'perfumeria-colonias-y-fragancias',
    filterKind: 'category',
    filterValue: 'Perfumería, Colonias y Fragancias',
    label: 'Perfumería, Colonias y Fragancias',
    title: 'Un Buen Regalo de Perfumería 【2026】 Colonias, Perfumes de Autor y Skincare',
    h1: 'Regalo y Regalos de Perfumería, Colonias y Cuidado Personal',
    description:
      'Colonias suaves sin alcohol para bebé, fragancias juveniles CK One, perfumes icónicos de hombre y mujer (YSL Libre, Jean Paul Gaultier, Versace Eros) y rutinas skincare.',
    tagline: 'Fragancias originales, cofres regalo y cosmética facial top valoraciones',
    keywords: [
      'regalo perfume hombre mujer',
      'regalos perfumeria colonias y fragancias',
      'colonia bebe infantil regalo',
      'mejores perfumes originales regalar',
    ],
    liveSearchQuery: 'perfumes originales hombre mujer colonias cofres regalo',
    icon: '✨',
  },
  'manualidades-y-creatividad': {
    slug: 'manualidades-y-creatividad',
    filterKind: 'category',
    filterValue: 'Manualidades y Creatividad',
    label: 'Manualidades y Creatividad',
    title: 'Un Buen Regalo Creativo 【2026】 Manualidades, Dibujo, Lettering y Bullet Journal',
    h1: 'Regalo y Regalos de Manualidades, Dibujo, Lettering y Bullet Journal',
    description:
      'Pintura lavable, plastilina Play-Doh, kits de costura y pulseras, rotuladores Tombow y Ohuhu al alcohol, acuarelas, cuadernos Bullet Journal y diarios artesanales.',
    tagline: 'Maletines artísticos, lettering, bullet journal 160g y kits creativos',
    keywords: [
      'regalo manualidades ninos',
      'regalos manualidades y creatividad',
      'rotuladores lettering bullet journal',
      'pintura acuarelas regalo creativo',
    ],
    liveSearchQuery: 'manualidades dibujo lettering rotuladores bullet journal kits creativos',
    icon: '🎨',
  },
  'moda-ropa-y-accesorios': {
    slug: 'moda-ropa-y-accesorios',
    filterKind: 'category',
    filterValue: 'Moda, Ropa y Accesorios',
    label: 'Moda, Ropa y Accesorios',
    title: 'Un Buen Regalo de Moda 【2026】 Ropa, Sudaderas, Disfraces, Mochilas y Joyería',
    h1: 'Regalo y Regalos de Moda, Ropa, Disfraces y Complementos',
    description:
      'Bodies de algodón para bebé, disfraces infantiles, pijamas kigurumi, sudaderas oversize, mochilas antirrobo USB, bolsos bandolera y joyería en plata 925.',
    tagline: 'Prendas de calidad, mochilas urbanas, joyería fina y disfraces',
    keywords: [
      'regalo ropa sudadera accesorio',
      'regalos moda ropa y accesorios',
      'disfraces pijamas mochilas regalo',
      'bolso joyero pendientes regalo',
    ],
    liveSearchQuery: 'moda ropa sudaderas mochilas complementos joyero regalo',
    icon: '👕',
  },
  'cochecitos-y-esenciales-de-bebe': {
    slug: 'cochecitos-y-esenciales-de-bebe',
    filterKind: 'category',
    filterValue: 'Cochecitos y Esenciales de Bebé',
    label: 'Cochecitos y Esenciales de Bebé',
    title: 'Un Buen Regalo de Nacimiento 【2026】 Cochecitos, Colecho y Tartas de Pañales',
    h1: 'Regalo y Regalos para Recién Nacido: Cochecitos, Cunas y Canastillas',
    description:
      'Tartas de pañales Dodot, sillas de paseo ligeras Chicco y Kinderkraft, cunas colecho, bañeras evolutivas, nutria relajante Fisher-Price y mordedores Montessori.',
    tagline: 'Esenciales prácticos y valorados por matronas y familias para bebé 0-12m',
    keywords: [
      'regalo nacimiento recien nacido',
      'regalos cochecitos y esenciales bebe',
      'tarta panales dodot baby shower',
      'cuna colecho hamaca babybjorn',
    ],
    liveSearchQuery: 'regalos recien nacido tarta panales cuna colecho silla paseo bebe',
    icon: '🍼',
  },
  'tecnologia-y-gadgets': {
    slug: 'tecnologia-y-gadgets',
    filterKind: 'category',
    filterValue: 'Tecnología y Gadgets',
    label: 'Tecnología y Gadgets',
    title: 'Un Buen Regalo Tech 【2026】 Drones, Audio Hi-Fi, Cámaras Instantáneas y Smart Home',
    h1: 'Regalo y Regalos de Tecnología, Drones, Audio y Gadgets Originales',
    description:
      'Drones con cámara 4K y robótica STEM, auriculares inalámbricos con cancelación de ruido Sony/Anker/JBL, cámaras Instax Mini y gadgets de hogar inteligente.',
    tagline: 'Audio ANC, fotografía instantánea, drones 4K y electrónica inteligente',
    keywords: [
      'regalo gadget tecnologico',
      'regalos tecnologia y gadgets',
      'auriculares inalambricos cancelacion ruido',
      'dron camara 4k camara instax regalo',
    ],
    liveSearchQuery: 'gadgets tecnologicos auriculares anc camara instax dron regalo',
    icon: '🎧',
  },
  'bicis-y-patinetes-con-ruedas': {
    slug: 'bicis-y-patinetes-con-ruedas',
    filterKind: 'category',
    filterValue: 'Bicis y Patinetes con Ruedas',
    label: 'Bicis y Patinetes con Ruedas',
    title: 'Un Buen Regalo Activo 【2026】 Bicis de Equilibrio, Triciclos y Patinetes LED',
    h1: 'Regalo y Regalos de Bicicletas, Triciclos y Patinetes sobre Ruedas',
    description:
      'Triciclos evolutivos 5 en 1, bicicletas sin pedales de equilibrio, patinetes con ruedas LED, hoverboards con kart y patinetes eléctricos homologados.',
    tagline: 'Movilidad divertida para exterior desde 1 año hasta adolescentes y adultos',
    keywords: [
      'regalo bicicleta patinete nino',
      'regalos bicis y patinetes con ruedas',
      'bici equilibrio triciclo evolutivo',
      'patinete ruedas led hoverboard kart',
    ],
    liveSearchQuery: 'bicicleta infantil triciclo patinete ruedas led patinete electrico',
    icon: '🛴',
  },
  'fiestas-y-revelacion-de-genero': {
    slug: 'fiestas-y-revelacion-de-genero',
    filterKind: 'category',
    filterValue: 'Fiestas y Revelación de Género',
    label: 'Fiestas y Revelación de Género',
    title: 'Un Buen Regalo Baby Shower 【2026】 Artículos Fiesta Revelación de Género',
    h1: 'Regalo y Regalos para Fiesta Revelación de Género y Baby Shower',
    description:
      'Cañones de confeti y humo holi biodegradables, globos gigantes sorpresa niño o niña y decoración para una celebración de revelación inolvidable.',
    tagline: 'Cañones confeti, polvos holi y globos gigantes de revelación niño o niña',
    keywords: [
      'regalo fiesta revelacion genero',
      'regalos baby shower gender reveal',
      'canones confeti humo holi revelacion',
      'globo gigante revelacion nino nina',
    ],
    liveSearchQuery: 'fiesta revelacion genero canones confeti globos baby shower',
    icon: '🎉',
  },
  'escapadas-y-experiencias-regalo': {
    slug: 'escapadas-y-experiencias-regalo',
    filterKind: 'category',
    filterValue: 'Escapadas y Experiencias',
    label: 'Escapadas y Experiencias',
    title: 'Un Buen Regalo Experiencia 【2026】 Cajas Smartbox, Spa y Escapadas para Dos',
    h1: 'Regalo y Regalos de Experiencias, Cajas Smartbox, Spa y Escapadas',
    description:
      '¿Prefieres regalar recuerdos en lugar de cosas materiales? Descubre cajas Smartbox de hotel y spa relax para dos personas y experiencias inolvidables.',
    tagline: 'Cajas regalo Smartbox con spa, escapadas de fin de semana y momentos en pareja',
    keywords: [
      'regalo experiencia escapada pareja',
      'regalos cajas smartbox spa relax',
      'regalar fin de semana dos personas',
    ],
    liveSearchQuery: 'smartbox caja regalo escapada spa para dos experiencia',
    icon: '🥂',
  },
  'regalos-gourmet-cafe-y-cocteleria': {
    slug: 'regalos-gourmet-cafe-y-cocteleria',
    filterKind: 'category',
    filterValue: 'Gourmet, Café y Coctelería',
    label: 'Gourmet, Café y Coctelería',
    title: 'Un Buen Regalo Gourmet 【2026】 Café Barista, Cafeteras y Kits de Coctelería',
    h1: 'Regalo y Regalos Gourmet: Café de Especialidad, Cafeteras y Coctelería',
    description:
      'Cafeteras italianas y espresso barista, molinillos manuales de precisión, prensas francesas de cobre y sets completos de coctelería Boston para impresionar.',
    tagline: 'Equipo barista profesional, coctelería Boston y detalles gourmet de lujo',
    keywords: [
      'regalo gourmet cafe cocteleria',
      'regalos amantes cafe barista cocteles',
      'kit cocteleria boston regalo',
      'cafetera barista regalo adulto',
    ],
    liveSearchQuery: 'regalos gourmet cafetera barista molinillo cafe kit cocteleria',
    icon: '☕',
  },

  // --------------------------------------------------------------------------
  // 5 Subfiltros de Ropa & Moda
  // --------------------------------------------------------------------------
  'ropa-pijamas-y-batas': {
    slug: 'ropa-pijamas-y-batas',
    filterKind: 'clothing',
    filterValue: 'pijamas',
    label: 'Pijamas y Batas',
    title: 'Un Buen Regalo Cómodo 【2026】 Pijamas Divertidos, Kigurumi, Sacos y Batas',
    h1: 'Regalo y Regalos de Pijamas, Kigurumis, Sacos y Batas de Invierno',
    description:
      'Pijamas enteros kigurumi de dinosaurio y animales, sacos de dormir de algodón orgánico TOG para bebé y conjuntos cálidos para regalar comodidad.',
    tagline: 'Pijamas polares divertidos, kigurumis infantiles y ropa de descanso suave',
    keywords: [
      'regalo pijama kigurumi divertido',
      'regalos pijamas batas invierno',
      'saco dormir bebe algodones',
    ],
    liveSearchQuery: 'pijamas kigurumi dinosaurio divertidos batas algodon regalo',
    icon: '🛌',
  },
  'ropa-chandal-y-deporte': {
    slug: 'ropa-chandal-y-deporte',
    filterKind: 'clothing',
    filterValue: 'chandal',
    label: 'Chándals y Deporte',
    title: 'Un Buen Regalo Deportivo 【2026】 Sudaderas Hoodie, Chándals y Ropa de Deporte',
    h1: 'Regalo y Regalos de Sudaderas, Chándals y Moda Deportiva Urbana',
    description:
      'Sudaderas oversize de algodón pesado, chubasqueros infantiles impermeables, bolsas de deporte con zapatero y ropa cómoda para instituto o gimnasio.',
    tagline: 'Sudaderas pesadas de moda urbana, chándals y equipamiento deportivo',
    keywords: [
      'regalo sudadera hoodie deportiva',
      'regalos chandal ropa deporte jovenes',
      'bolsa deporte gimnasio regalo',
    ],
    liveSearchQuery: 'sudadera hoodie oversize chandal ropa deportiva regalo',
    icon: '🏃',
  },
  'calzado-y-zapatillas-regalo': {
    slug: 'calzado-y-zapatillas-regalo',
    filterKind: 'clothing',
    filterValue: 'calzado',
    label: 'Zapatillas y Calzado',
    title: 'Un Buen Regalo de Calzado 【2026】 Zapatillas Primeros Pasos, Patucos y Calcetines',
    h1: 'Regalo y Regalos de Calzado, Zapatillas Attipas, Patucos y Calcetines',
    description:
      'Patucos de cuero blando para recién nacido, zapatillas ergonómicas Attipas de primeros pasos y packs originales de calcetines divertidos para amigo invisible.',
    tagline: 'Calzado respetuoso para bebé y packs originales de calcetines para regalar',
    keywords: [
      'regalo zapatillas attipas bebe',
      'regalos calzado patucos calcetines originales',
      'patucos cuero primeros pasos',
    ],
    liveSearchQuery: 'zapatillas attipas patucos cuero bebe calcetines originales regalo',
    icon: '👟',
  },
  'disfraces-y-fiestas': {
    slug: 'disfraces-y-fiestas',
    filterKind: 'clothing',
    filterValue: 'disfraces',
    label: 'Disfraces y Fiestas',
    title: 'Un Buen Regalo de Disfraces 【2026】 Superhéroes, Princesas, Hinchables y Carnaval',
    h1: 'Regalo y Regalos de Disfraces Infantiles, Adultos y Fiestas Temáticas',
    description:
      'Capas y máscaras de superhéroes, vestidos de princesa con tiara y varita, disfraces hinchables de sumo divertidos y máscaras LED para Carnaval y Halloween.',
    tagline: 'Disfraces de superhéroes, princesas, carnaval y disfraces hinchables virales',
    keywords: [
      'regalo disfraz infantil ninos',
      'regalos disfraces fiestas carnaval',
      'disfraz princesa superheroes hinchable',
    ],
    liveSearchQuery: 'disfraces infantiles superheroes princesa disfraz hinchable fiestas',
    icon: '🎭',
  },
  'ropa-diario-y-basicos': {
    slug: 'ropa-diario-y-basicos',
    filterKind: 'clothing',
    filterValue: 'diario',
    label: 'Ropa de Diario y Básicos',
    title: 'Un Buen Regalo Práctico 【2026】 Ropa de Diario, Bodies, Mochilas y Complementos',
    h1: 'Regalo y Regalos de Ropa Básica, Bodies, Mochilas, Bandoleras y Gorras',
    description:
      'Packs de bodies y baberos de algodón orgánico, gorros beanie urbanos, mochilas antirrobo USB, riñoneras impermeables y bolsos bandolera vegano.',
    tagline: 'Básicos de armario, mochilas de diario, gorros y bolsos versátiles',
    keywords: [
      'regalo mochila urbana bandolera',
      'regalos ropa diario basicos bodies gorras',
      'mochila antirrobo usb gorro beanie regalo',
    ],
    liveSearchQuery: 'ropa diario bodies bebe gorra beanie mochila antirrobo bandolera',
    icon: '👕',
  },

  // --------------------------------------------------------------------------
  // 7 Subfiltros de Anime, Series & Cine
  // --------------------------------------------------------------------------
  'figuras-dragon-ball': {
    slug: 'figuras-dragon-ball',
    filterKind: 'anime',
    filterValue: 'dragon-ball',
    label: 'Dragon Ball (Z / Super)',
    title: 'Un Buen Regalo Dragon Ball 【2026】 Figuras Goku, Vegeta y Manga Super',
    h1: 'Regalo y Regalos de Dragon Ball: Figuras Banpresto Goku Super Saiyan y Manga',
    description:
      'Estatuas oficiales Bandai Spirits Ichibansho de Son Goku Super Saiyan y volúmenes de manga Dragon Ball Super de Akira Toriyama para fans y vitrinas.',
    tagline: 'Figuras oficiales Goku Super Saiyan y manga Dragon Ball Super',
    keywords: [
      'regalo dragon ball goku',
      'regalos figuras dragon ball z super',
      'figura goku super saiyan banpresto',
    ],
    liveSearchQuery: 'dragon ball z figuras banpresto goku vegeta coleccion oficial',
    icon: '🐉',
  },
  'regalos-pokemon-figuras-y-cartas': {
    slug: 'regalos-pokemon-figuras-y-cartas',
    filterKind: 'anime',
    filterValue: 'pokemon',
    label: 'Pokémon (Cartas TCG & Figuras)',
    title: 'Un Buen Regalo Pokémon 【2026】 Cartas TCG, Lámpara Pikachu 3D y Figuras Charizard',
    h1: 'Regalo y Regalos de Pokémon: Cartas Oficiales, Lámpara Pikachu y Charizard',
    description:
      'Todo el universo Pokémon para acertar: cajas Elite Trainer Box, latas de sobres holográficas, archivadores, lámpara nocturna LED 3D de Pikachu y figura de Charizard.',
    tagline: 'Sobres Pokémon TCG, cajas Élite, Pikachu LED 3D y Charizard interactivo',
    keywords: [
      'regalo pokemon nino coleccionista',
      'regalos pokemon cartas figuras pikachu',
      'lampara pikachu pokemon 3d elite trainer box',
    ],
    liveSearchQuery: 'pokemon cartas sobres booster box figuras pikachu charizard oficial',
    icon: '⚡',
  },
  'figuras-one-piece': {
    slug: 'figuras-one-piece',
    filterKind: 'anime',
    filterValue: 'one-piece',
    label: 'One Piece',
    title: 'Un Buen Regalo One Piece 【2026】 Figuras Luffy Gear 5, Banpresto y Manga Tomo 1',
    h1: 'Regalo y Regalos de One Piece: Figuras Monkey D. Luffy Gear 5 y Manga',
    description:
      'Selección oficial de One Piece para seguidores de Eiichiro Oda: figura Ichibansho Luffy Gear 5 Dios del Sol, figura Banpresto batalla 18 cm y Tomo 1 del manga.',
    tagline: 'Luffy Gear 5, estatuas Banpresto oficiales y el manga Romance Dawn',
    keywords: [
      'regalo one piece luffy',
      'regalos figuras one piece anime',
      'figura luffy gear 5 one piece tomo 1',
    ],
    liveSearchQuery: 'one piece luffy gear 5 figuras banpresto manga oficial',
    icon: '👒',
  },
  'figuras-one-punch-man': {
    slug: 'figuras-one-punch-man',
    filterKind: 'anime',
    filterValue: 'one-punch-man',
    label: 'One Punch Man',
    title: 'Un Buen Regalo One Punch Man 【2026】 Figuras Saitama Banpresto y Pop Up Parade',
    h1: 'Regalo y Regalos de One Punch Man: Figuras Oficiales de Saitama',
    description:
      'Figuras oficiales de Saitama en traje de héroe de Bandai Spirits Banpresto y Pop Up Parade de Good Smile Company para estantería o setup otaku.',
    tagline: 'Estatuas Saitama oficiales Banpresto y Good Smile Pop Up Parade',
    keywords: [
      'regalo one punch man saitama',
      'regalos figuras one punch man',
      'figura saitama banpresto pop up parade',
    ],
    liveSearchQuery: 'one punch man saitama figura banpresto pop up parade oficial',
    icon: '👊',
  },
  'figuras-demon-slayer': {
    slug: 'figuras-demon-slayer',
    filterKind: 'anime',
    filterValue: 'demon-slayer',
    label: 'Demon Slayer (Kimetsu no Yaiba)',
    title: 'Un Buen Regalo Demon Slayer 【2026】 Figuras Tanjiro Banpresto y Manga Kimetsu',
    h1: 'Regalo y Regalos de Demon Slayer (Kimetsu no Yaiba): Figuras y Manga',
    description:
      'Estatuas oficiales de Tanjiro Kamado ejecutando la Danza del Dios del Fuego y el primer volumen de Guardianes de la Noche (Kimetsu no Yaiba) en español.',
    tagline: 'Figuras Banpresto de Tanjiro Kamado y manga Guardianes de la Noche',
    keywords: [
      'regalo demon slayer kimetsu',
      'regalos figuras demon slayer tanjiro',
      'figura tanjiro banpresto demon slayer tomo 1',
    ],
    liveSearchQuery: 'demon slayer kimetsu no yaiba figuras tanjiro nezuko banpresto',
    icon: '⚔️',
  },
  'figuras-naruto': {
    slug: 'figuras-naruto',
    filterKind: 'anime',
    filterValue: 'naruto',
    label: 'Naruto & Boruto',
    title: 'Un Buen Regalo Naruto 【2026】 Figuras Kakashi Grandista Chidori y Manga Tomo 1',
    h1: 'Regalo y Regalos de Naruto Shippuden: Figuras Banpresto Kakashi y Manga',
    description:
      'Figuras coleccionables de Kakashi Hatake Grandista 20 cm y técnica Chidori junto al Tomo 1 oficial del manga Naruto de Masashi Kishimoto.',
    tagline: 'Figuras Banpresto Kakashi Hatake Chidori/Grandista y manga Naruto',
    keywords: [
      'regalo naruto shippuden kakashi',
      'regalos figuras naruto anime',
      'figura kakashi hatake chidori grandista manga',
    ],
    liveSearchQuery: 'naruto shippuden figuras kakashi sasuke banpresto oficial',
    icon: '🍥',
  },
  'figuras-cine-retro': {
    slug: 'figuras-cine-retro',
    filterKind: 'anime',
    filterValue: 'cine-retro',
    label: 'Cine y Retro',
    title: 'Un Buen Regalo de Cine 【2026】 DeLorean, Harry Potter, Star Wars, Batman y Fast & Furious',
    h1: 'Regalo y Regalos de Cine Retro, Star Wars, Harry Potter y Coches Die-Cast',
    description:
      'Réplica metálica DeLorean de Regreso al Futuro, Varita de Saúco Ollivanders, Dodge Charger de Toretto, Jeep de Jurassic Park, Batmóvil Tumbler, Jumanji y Star Wars.',
    tagline: 'Coleccionismo cinematográfico Jada Toys, Noble Collection, Star Wars y LEGO',
    keywords: [
      'regalo cine retro delorean',
      'regalos peliculas star wars harry potter batman',
      'coche fast furious jurassic park coleccionista',
    ],
    liveSearchQuery: 'figuras cine retro delorean harry potter star wars jada toys diecast',
    icon: '🎬',
  },

  // --------------------------------------------------------------------------
  // 5 Subfiltros de Sobre Ruedas & Motor
  // --------------------------------------------------------------------------
  'coches-electricos-para-ninos': {
    slug: 'coches-electricos-para-ninos',
    filterKind: 'wheels',
    filterValue: 'coches-electricos',
    label: 'Coches Eléctricos (12V / 24V)',
    title: 'Un Buen Regalo Infantil 【2026】 Coches Eléctricos para Niños 12V/24V con Mando',
    h1: 'Regalo y Regalos de Coches Eléctricos para Niños 12V y 24V con Mando Parental',
    description:
      'Mercedes G63 AMG, Audi R8 Spyder, Audi TT RS, Audi Q8 e-tron, Jeep todoterreno rosa y Lamborghini Veneno biplaza 24V 4x4 con licencia oficial y mando a distancia.',
    tagline: 'Deportivos y SUV infantiles con licencia oficial, LED y control remoto 2.4G',
    keywords: [
      'regalo coche electrico nino mando',
      'regalos coches electricos 12v 24v ninos',
      'mercedes g63 audi lamborghini coche nino',
    ],
    liveSearchQuery: 'coche electrico para ninos 12v 24v mando parental mercedes audi lamborghini',
    icon: '🚗',
  },
  'quads-y-buggies-ninos': {
    slug: 'quads-y-buggies-ninos',
    filterKind: 'wheels',
    filterValue: 'quads',
    label: 'Quads y Buggies 4x4',
    title: 'Un Buen Regalo Aventurero 【2026】 Quads Eléctricos y Miniquads 49cc para Niños',
    h1: 'Regalo y Regalos de Quads Eléctricos 12V/36V y Miniquads 49cc Infantiles',
    description:
      'Quads eléctricos HOMCOM 12V para pequeños pilotos, Raptor 36V 500W silencioso con limitador por llave y miniquad de gasolina 49cc para campo.',
    tagline: 'Quads infantiles seguros con limitador de velocidad y coches buggy RC',
    keywords: [
      'regalo quad electrico nino',
      'regalos quads y buggies 4x4 infantiles',
      'miniquad gasolina 49cc electrico 36v',
    ],
    liveSearchQuery: 'quad electrico ninos miniquad gasolina 49cc 36v 12v',
    icon: '🛞',
  },
  'minimotos-y-motos-electricas': {
    slug: 'minimotos-y-motos-electricas',
    filterKind: 'wheels',
    filterValue: 'minimotos',
    label: 'Minimotos y Motos Eléctricas',
    title: 'Un Buen Regalo Motero 【2026】 Minimotos Cross 49cc y Motos Eléctricas BMW/Honda/Vespa',
    h1: 'Regalo y Regalos de Minimotos Cross 49cc y Motos Eléctricas 12V para Niños',
    description:
      'Minicross 49cc ROAN roja y azul, pocket bike Cobra 49cc y motos eléctricas infantiles 12V con ruedines de BMW G310 GS, Honda CBR1000RR y Vespa Piaggio oficial.',
    tagline: 'Minimotos 49cc con paro de seguridad y motos BMW, Honda y Vespa 12V',
    keywords: [
      'regalo minimoto nino',
      'regalos minimotos cross 49cc motos electricas',
      'moto electrica ninos bmw honda vespa 12v',
    ],
    liveSearchQuery: 'minimoto cross 49cc moto electrica ninos 12v bmw vespa honda',
    icon: '🏍️',
  },
  'patinetes-electricos-y-hoverboards': {
    slug: 'patinetes-electricos-y-hoverboards',
    filterKind: 'wheels',
    filterValue: 'patinetes-electricos',
    label: 'Patinetes Eléctricos y Hoverboards',
    title: 'Un Buen Regalo de Movilidad 【2026】 Patinetes Eléctricos Homologados DGT y Hoverboards',
    h1: 'Regalo y Regalos de Patinetes Eléctricos Xiaomi, Cecotec, Segway y Hoverboards',
    description:
      'Patinete eléctrico Xiaomi Serie 6, Cecotec Bongo homologado DGT, Segway-Ninebot C2 Pro juvenil con luces RGB y packs hoverboard con asiento Go-Kart.',
    tagline: 'Patinetes eléctricos plegables DGT, juveniles Segway y packs Go-Kart',
    keywords: [
      'regalo patinete electrico homologado',
      'regalos patinetes electricos y hoverboards',
      'xiaomi patinete segway c2 pro hoverboard kart',
    ],
    liveSearchQuery: 'patinete electrico xiaomi cecotec segway hoverboard kart regalo',
    icon: '🛴',
  },
  'bicis-karts-y-patines': {
    slug: 'bicis-karts-y-patines',
    filterKind: 'wheels',
    filterValue: 'bicis-patines',
    label: 'Bicis, Karts y Patines LED',
    title: 'Un Buen Regalo Infantil 【2026】 Bicis sin Pedales, Triciclos 5 en 1 y Correpasillos',
    h1: 'Regalo y Regalos de Bicicletas de Equilibrio, Triciclos Evolutivos y Karts',
    description:
      'Chicco First Bike, triciclo evolutivo Besrey 5 en 1, correpasillos metálicos vintage, cascos infantiles con luz LED trasera y asientos Go-Kart.',
    tagline: 'Primeras bicis de equilibrio, triciclos evolutivos y protección infantil',
    keywords: [
      'regalo bicicleta sin pedales triciclo',
      'regalos bicis karts patines infantiles',
      'triciclo evolutivo 5 en 1 correpasillos vintage',
    ],
    liveSearchQuery: 'bicicleta equilibrio sin pedales triciclo evolutivo casco infantil',
    icon: '🚲',
  },

  // --------------------------------------------------------------------------
  // 7 Filtros de Presupuesto (Complementando el hub /regalos-menos-20-euros)
  // --------------------------------------------------------------------------
  'regalos-menos-15-euros': {
    slug: 'regalos-menos-15-euros',
    filterKind: 'price',
    filterValue: '<15',
    label: 'Regalos Menos de 15 €',
    title: 'Un Buen Regalo Barato 【2026】 Regalos por Menos de 15 Euros (Amigo Invisible)',
    h1: 'Regalo y Regalos Originales por Menos de 15 Euros (Amigo Invisible 2026)',
    description:
      'Más de 40 ideas top ventas por menos de 15 € en Amazon: sobres y latas Pokémon, mangas, juegos de cartas, papelería creativa, cosmética viral y detalles económicos.',
    tagline: 'Detalles originales de alta valoración ideales para Amigo Invisible (< 15 €)',
    keywords: [
      'regalo barato menos 15 euros',
      'regalos menos de 15 euros',
      'regalo amigo invisible barato 15 euros',
      'detalles economicos originales',
    ],
    liveSearchQuery: 'regalos originales baratos menos de 15 euros amigo invisible',
    icon: '🎁',
  },
  'regalos-de-15-a-30-euros': {
    slug: 'regalos-de-15-a-30-euros',
    filterKind: 'price',
    filterValue: '15-30',
    label: 'Regalos de 15 € a 30 €',
    title: 'Un Buen Regalo Barato 【2026】 Ideas de Regalo de 15 a 30 Euros (Menos de 30€)',
    h1: 'Regalo y Regalos Originales de 15 € a 30 € (Menos de 30 Euros)',
    description:
      'Selección equilibrada entre 15 € y 30 € para cumpleaños, amigo invisible o Navidad: juegos de mesa Catan Junior y Virus!, figuras anime, periféricos gaming y moda.',
    tagline: 'Casi 100 ideas top ventas entre 15 € y 30 € para acertar sin pasarse',
    keywords: [
      'regalo menos de 30 euros',
      'regalos de 15 a 30 euros',
      'regalo barato menos 30 euros',
      'regalos cumpleanos 20 30 euros',
    ],
    liveSearchQuery: 'ideas regalo originales 15 a 30 euros top ventas amazon',
    icon: '🟡',
  },
  'regalos-de-20-a-50-euros': {
    slug: 'regalos-de-20-a-50-euros',
    filterKind: 'price',
    filterValue: '20-50',
    label: 'Regalos de 20 € a 50 €',
    title: 'Un Buen Regalo Perfecto 【2026】 Ideas de Regalo de 20 € a 50 € Más Valoradas',
    h1: 'Regalo y Regalos Ideales de 20 € a 50 € para Cumpleaños y Ocasiones',
    description:
      'Nuestro rango más popular de regalos entre 20 € y 50 €: más de 110 productos verificados en LEGO, perfumes originales, cafeteras barista, figuras y juguetes Montessori.',
    tagline: 'El equilibrio perfecto entre impacto, marca oficial y presupuesto medio (20-50 €)',
    keywords: [
      'regalo entre 20 y 50 euros',
      'regalos de 20 a 50 euros',
      'regalo cumpleanos 30 40 50 euros',
    ],
    liveSearchQuery: 'mejores regalos entre 20 y 50 euros amazon top valorados',
    icon: '✨',
  },
  'regalos-de-30-a-60-euros': {
    slug: 'regalos-de-30-a-60-euros',
    filterKind: 'price',
    filterValue: '30-60',
    label: 'Regalos de 30 € a 60 €',
    title: 'Un Buen Regalo Especial 【2026】 Ideas de Regalo de 30 € a 60 € Mejor Valoradas',
    h1: 'Regalo y Regalos de 30 € a 60 € con 4.5+ Estrellas en Amazon',
    description:
      'Ideas con presencia real entre 30 € y 60 €: tartas de pañales Dodot, auriculares con cancelación de ruido, juegos de estrategia, LEGO y cajas experiencia Smartbox.',
    tagline: 'Regalos memorables de gama media-alta con valoraciones verificadas',
    keywords: [
      'regalo entre 30 y 60 euros',
      'regalos de 30 a 60 euros',
      'buen regalo 50 euros hombre mujer nino',
    ],
    liveSearchQuery: 'regalos originales 30 a 60 euros mejor valorados amazon',
    icon: '🟣',
  },
  'regalos-de-50-a-100-euros': {
    slug: 'regalos-de-50-a-100-euros',
    filterKind: 'price',
    filterValue: '50-100',
    label: 'Regalos de 50 € a 100 €',
    title: 'Un Buen Regalo Prémium 【2026】 Gran Regalo de 50 € a 100 €',
    h1: 'Regalo y Regalos Prémium de 50 € a 100 € para Ocasiones Señaladas',
    description:
      'Videojuegos PS5 de lanzamiento, estatuas anime Ichibansho, cámaras instantáneas Instax Mini, perfumes de lujo, cochecitos ligeros y drones STEM.',
    tagline: 'Opciones prémium entre 50 € y 100 € para aniversario, comunión o Navidad',
    keywords: [
      'regalo premium 50 a 100 euros',
      'regalos de 50 a 100 euros',
      'gran regalo cumpleaños 80 100 euros',
    ],
    liveSearchQuery: 'regalos premium 50 a 100 euros mejor valorados amazon',
    icon: '🏆',
  },
  'regalos-mas-de-60-euros': {
    slug: 'regalos-mas-de-60-euros',
    filterKind: 'price',
    filterValue: '>60',
    label: 'Regalos de Más de 60 €',
    title: 'Un Buen Regalo Inolvidable 【2026】 Regalos Especiales de Más de 60 €',
    h1: 'Regalo y Regalos Especiales de Más de 60 € para Sorprender en Grande',
    description:
      'Desde regalos en grupo compartidos hasta detalles de gama alta por encima de 60 €: patinetes eléctricos, vehículos infantiles 12V, smartphones, audio Hi-Fi y drones.',
    tagline: 'Ideales para regalos colectivos en grupo por WhatsApp o fechas clave',
    keywords: [
      'regalo especial mas de 60 euros',
      'regalos mas de 60 euros',
      'regalo en grupo cumpleanos gama alta',
    ],
    liveSearchQuery: 'regalos gama alta mas de 60 euros electronica patinetes gaming',
    icon: '💎',
  },
  'regalos-mas-de-100-euros': {
    slug: 'regalos-mas-de-100-euros',
    filterKind: 'price',
    filterValue: '>100',
    label: 'Regalos de Más de 100 €',
    title: 'Un Buen Regalo de Lujo 【2026】 Grandes Regalos de Más de 100 Euros',
    h1: 'Regalo y Regalos de Lujo y Ocasión Especial de Más de 100 €',
    description:
      'Regalos estrella de Reyes, 18 cumpleaños, nacimientos o colectas de amigos: coches eléctricos 12V/24V, quads, minimotos 49cc, patinetes DGT, drones 4K y smartphones.',
    tagline: 'Los grandes aciertos por encima de 100 € para celebraciones inolvidables',
    keywords: [
      'regalo mas de 100 euros',
      'regalos mas de 100 euros ocasion especial',
      'regalo estrella reyes cumpleanos 18',
    ],
    liveSearchQuery: 'grandes regalos mas de 100 euros coches electricos smartphones drones',
    icon: '👑',
  },

  // --------------------------------------------------------------------------
  // 2 Filtros de Destinatario / Género
  // --------------------------------------------------------------------------
  'regalos-para-el': {
    slug: 'regalos-para-el',
    filterKind: 'gender',
    filterValue: 'boy',
    label: 'Regalos para Él',
    title: 'Un Buen Regalo para Él 【2026】 Ideas para Niño, Chico, Novio y Hombre',
    h1: 'Regalo y Regalos para Él: Niño, Joven, Novio y Hombre (Todas las Edades)',
    description:
      'Explora los regalos más recomendados para él según su edad y gustos: setup gamer PS5, figuras de anime, drones 4K, coches de colección, perfumes icónicos y gadgets.',
    tagline: 'Selección verificada para chicos, niños, novios, padres y coleccionistas',
    keywords: [
      'un buen regalo para el',
      'regalo para el',
      'regalos para el originales',
      'ideas regalo chico nino novio hombre',
    ],
    liveSearchQuery: 'regalos originales para el hombre chico novio gamer tecnologia',
    icon: '👨',
  },
  'regalos-para-ella': {
    slug: 'regalos-para-ella',
    filterKind: 'gender',
    filterValue: 'girl',
    label: 'Regalos para Ella',
    title: 'Un Buen Regalo para Ella 【2026】 Ideas para Niña, Chica, Novia y Mujer',
    h1: 'Regalo y Regalos para Ella: Niña, Joven, Novia y Mujer (Todas las Edades)',
    description:
      'Las ideas mejor valoradas para ella: fotografía instantánea Instax, cuidado facial coreano y skincare, joyería en plata 925, bolsos bandolera, fragancias de autor y libros.',
    tagline: 'Selección cuidada para niñas, chicas, novias, madres y amigas',
    keywords: [
      'un buen regalo para ella',
      'regalo para ella',
      'regalos para ella originales',
      'ideas regalo chica nina novia mujer',
    ],
    liveSearchQuery: 'regalos originales para ella mujer chica novia belleza moda',
    icon: '👩',
  },

  // --------------------------------------------------------------------------
  // 10 Ocasiones Especiales y Destinatarios Familiares de Alto Volumen SEO
  // --------------------------------------------------------------------------
  'regalos-amigo-invisible': {
    slug: 'regalos-amigo-invisible',
    filterKind: 'price',
    filterValue: '<20',
    label: 'Regalos Amigo Invisible (<15 €)',
    title: 'Un Buen Regalo de Amigo Invisible 【2026】 Ideas Originales por Menos de 15€ y 20€',
    h1: 'Regalo y Regalos Originales de Amigo Invisible (Menos de 15 € y 20 €)',
    description:
      'Más de 50 ideas de amigo invisible para compañeros de trabajo, amigos y familia: detalles divertidos, juegos de cartas rápidos, tazas térmicas, gadgets y packs gourmet baratos.',
    tagline: 'Aciertos seguros y originales para el Amigo Invisible sin pasarte de presupuesto',
    keywords: [
      'regalos amigo invisible',
      'regalo amigo invisible original',
      'ideas amigo invisible 10 15 20 euros',
      'regalo amigo invisible hombre mujer',
    ],
    liveSearchQuery: 'regalos originales amigo invisible baratos menos 15 20 euros',
    icon: '🎅',
  },
  'regalos-cumpleanos-originales': {
    slug: 'regalos-cumpleanos-originales',
    filterKind: 'price',
    filterValue: '20-50',
    label: 'Regalos de 20 € a 50 €',
    title: 'Un Buen Regalo de Cumpleaños 【2026】 Ideas Originales por Edad (Hombre, Mujer y Niños)',
    h1: 'Regalo y Regalos de Cumpleaños Originales para Todas las Edades (2026)',
    description:
      'Selección con los regalos de cumpleaños mejor valorados en Amazon para niños, adolescentes, novios, padres y amigos con envío Prime en 24 horas.',
    tagline: 'Ideas de cumpleaños memorables filtradas por edad, gustos y presupuesto',
    keywords: [
      'regalos de cumpleanos originales',
      'un buen regalo de cumpleanos',
      'que regalar en un cumpleanos',
      'ideas regalo cumpleanos hombre mujer ninos',
    ],
    liveSearchQuery: 'regalos cumpleanos originales sorprendentes amazon',
    icon: '🎂',
  },
  'regalos-primera-comunion': {
    slug: 'regalos-primera-comunion',
    filterKind: 'category',
    filterValue: 'Drones RC, Robótica y STEM',
    label: 'Drones RC, Robótica y STEM',
    title: 'Un Buen Regalo de Primera Comunión 【2026】 Ideas para Niño y Niña (8 a 10 Años)',
    h1: 'Regalo y Regalos de Primera Comunión para Niños y Niñas (2026)',
    description:
      'Los regalos estrella de Primera Comunión para niños y niñas de 8 a 10 años: cámaras instantáneas Instax, drones con cámara, patinetes eléctricos juveniles, relojes y LEGO.',
    tagline: 'Los regalos más ilusionantes para recordar el día de su Primera Comunión',
    keywords: [
      'regalos primera comunion nino nina',
      'un buen regalo para comunion',
      'que regalar en una primera comunion 2026',
      'ideas regalo comunion original',
    ],
    liveSearchQuery: 'regalos primera comunion nino nina camara instax drone reloj patinete',
    icon: '🕊️',
  },
  'regalos-san-valentin-y-aniversario': {
    slug: 'regalos-san-valentin-y-aniversario',
    filterKind: 'category',
    filterValue: 'Perfumes, Fragancias y Belleza',
    label: 'Perfumes, Fragancias y Belleza',
    title: 'Un Buen Regalo de San Valentín y Aniversario 【2026】 Ideas Románticas para Pareja',
    h1: 'Regalo y Regalos de San Valentín y Aniversario para Novio, Novia y Parejas',
    description:
      'Ideas románticas y elegantes para celebrar vuestro aniversario o San Valentín: escapadas para dos, perfumes de autor, joyería en plata de ley y flores LEGO eternas.',
    tagline: 'Detalles románticos para sorprender a tu pareja en vuestro aniversario o 14 de febrero',
    keywords: [
      'regalos san valentin pareja',
      'regalos de aniversario para mi novio novia',
      'un buen regalo de aniversario',
      'ideas regalo romantico hombre mujer',
    ],
    liveSearchQuery: 'regalos san valentin aniversario pareja romanticos originales',
    icon: '💘',
  },
  'regalos-dia-del-padre': {
    slug: 'regalos-dia-del-padre',
    filterKind: 'gender',
    filterValue: 'boy',
    label: 'Regalos para Él',
    title: 'Un Buen Regalo para el Día del Padre 【2026】 Ideas Originales para Papá',
    h1: 'Regalo y Regalos para el Día del Padre: Ideas Útiles y Originales para Papá',
    description:
      'Sorprende a papá en el Día del Padre o en su cumpleaños: cafeteras espresso barista, gadgets de automóvil y moto, relojes elegantes, perfumes masculinos y kits gourmet.',
    tagline: 'Selección verificada con los regalos que de verdad ilusionan a un padre',
    keywords: [
      'regalos dia del padre',
      'un buen regalo para mi padre',
      'que regalar a papa',
      'ideas regalo padre original util',
    ],
    liveSearchQuery: 'regalos dia del padre originales para papa',
    icon: '👔',
  },
  'regalos-dia-de-la-madre': {
    slug: 'regalos-dia-de-la-madre',
    filterKind: 'gender',
    filterValue: 'girl',
    label: 'Regalos para Ella',
    title: 'Un Buen Regalo para el Día de la Madre 【2026】 Ideas Especiales para Mamá',
    h1: 'Regalo y Regalos para el Día de la Madre: Detalles Inolvidables para Mamá',
    description:
      'Las mejores ideas de regalo para mamá en el Día de la Madre o cumpleaños: cofres de alta cosmética y perfume, joyería fina, tazas artesanales, bienestar en casa y escapadas.',
    tagline: 'Detalles llenos de cariño y calidad con valoraciones excelentes para mamá',
    keywords: [
      'regalos dia de la madre',
      'un buen regalo para mi madre',
      'que regalar a mama',
      'ideas regalo madre original emocionante',
    ],
    liveSearchQuery: 'regalos dia de la madre originales para mama',
    icon: '💐',
  },
  'regalos-para-padres': {
    slug: 'regalos-para-padres',
    filterKind: 'category',
    filterValue: 'Gourmet, Café y Coctelería',
    label: 'Gourmet, Café y Coctelería',
    title: 'Un Buen Regalo para Padres 【2026】 Qué Regalar a un Padre que Tiene de Todo',
    h1: 'Regalo y Regalos para Padres: Ideas Gourmet, Tecnología y Experiencias',
    description:
      '¿Qué regalar a tu padre por Navidad, Reyes o su 50, 60 o 70 cumpleaños? Cafeteras italianas y espresso, estuches gourmet, herramientas pro y escapadas en pareja.',
    tagline: 'Ideas prácticas y de gran calidad pensadas para padres de todas las edades',
    keywords: [
      'regalos para padres',
      'que regalar a un padre',
      'regalo padre 50 60 70 anos',
      'un buen regalo para papa',
    ],
    liveSearchQuery: 'regalos para padres originales cumpleaños navidad',
    icon: '🧔',
  },
  'regalos-para-madres': {
    slug: 'regalos-para-madres',
    filterKind: 'category',
    filterValue: 'Perfumes, Fragancias y Belleza',
    label: 'Perfumes, Fragancias y Belleza',
    title: 'Un Buen Regalo para Madres 【2026】 Qué Regalar a una Madre Especial',
    h1: 'Regalo y Regalos para Madres: Belleza, Joyería, Relax y Experiencias',
    description:
      'Encuentra el detalle perfecto para tu madre en su cumpleaños, Reyes o Navidad: alta perfumería, cofres ritual de spa, difusores de aromas, bolsos y cajas experiencia.',
    tagline: 'Regalos con encanto y máxima valoración para mimar a mamá',
    keywords: [
      'regalos para madres',
      'que regalar a una madre',
      'regalo madre 50 60 70 anos',
      'un buen regalo para mama',
    ],
    liveSearchQuery: 'regalos para madres originales cumpleanos navidad',
    icon: '🌷',
  },
  'regalos-para-abuelos': {
    slug: 'regalos-para-abuelos',
    filterKind: 'category',
    filterValue: 'Escapadas y Experiencias',
    label: 'Escapadas y Experiencias',
    title: 'Un Buen Regalo para Abuelos y Abuelas 【2026】 Ideas Emotivas y Confort',
    h1: 'Regalo y Regalos para Abuelos y Abuelas: Ideas Prácticas y con Cariño',
    description:
      'Ideas entrañables y útiles para abuelos y abuelas: marcos de fotos digitales WiFi, mantas térmicas de confort, cestas gourmet, cafeteras clásicas y escapadas tranquilas.',
    tagline: 'Detalles pensados para el bienestar y la ilusión de abuelos y personas mayores',
    keywords: [
      'regalos para abuelos',
      'regalos para abuelas',
      'que regalar a un abuelo 70 80 anos',
      'un buen regalo para mis abuelos',
    ],
    liveSearchQuery: 'regalos para abuelos y abuelas originales utiles',
    icon: '👵',
  },
  'regalos-para-profesores': {
    slug: 'regalos-para-profesores',
    filterKind: 'price',
    filterValue: '15-30',
    label: 'Regalos de 15 € a 30 €',
    title: 'Un Buen Regalo para Profesores y Maestros 【2026】 Ideas Fin de Curso en Grupo',
    h1: 'Regalo y Regalos de Fin de Curso para Profesores, Maestras y Educadores',
    description:
      'Agradece su dedicación con un detalle inolvidable (individual o en grupo por WhatsApp): tazas térmicas Stanley, sets de papelería premium, packs de café gourmet y experiencias.',
    tagline: 'Ideales para votar en el grupo de WhatsApp de padres y acertar en fin de curso',
    keywords: [
      'regalos para profesores',
      'regalos fin de curso maestras',
      'que regalar a un profesor en grupo',
      'un buen regalo para una profesora',
    ],
    liveSearchQuery: 'regalos para profesores y maestras fin de curso originales',
    icon: '🎓',
  },
};

export function normalizeRoutePath(routePath: string = ''): string {
  if (!routePath || routePath === '/') return '';
  const trimmed = routePath.trim().replace(/\/+$/, '');
  return trimmed.startsWith('/') ? trimmed : `/${trimmed}`;
}

/**
 * Construye alternates hreflang recíprocos para CUALQUIER ruta del sitio
 * (`''` = home, `'/gaming'`, `'/bebes-0-a-12-meses/...'`, `'/regalos-para-el'`, etc.).
 */
export function getHreflangAlternatesForPath(routePath: string = ''): Record<string, string> {
  const path = normalizeRoutePath(routePath);
  const esPath = path ? localizeRoutePath('es', path) : '';
  const enPath = path ? localizeRoutePath('en', path) : '/en';

  const languages: Record<string, string> = {
    es: `${BASE_SITE_URL}${esPath}`,
    'x-default': `${BASE_SITE_URL}${enPath}`,
  };

  for (const route of Object.values(I18N_SEO_ROUTES)) {
    const locPath = path ? localizeRoutePath(route.slug, path) : `/${route.slug}`;
    languages[route.hreflang] = `${BASE_SITE_URL}${locPath}`;
  }

  return languages;
}

/**
 * Devuelve únicamente los productos estrictamente coincidentes con el filtro SEO
 * (sin relleno de productos relacionados). Se usa para el motor de Sitemaps Anti-Thin Content
 * y para priorizar las coincidencias exactas en las combinaciones Edad × Filtro.
 */
export function matchStrictProductsForFilter(
  meta: SeoFilterRouteMeta,
  catalog: Product[] = ALL_SITE_PRODUCTS
): Product[] {
  let matched: Product[] = [];

  if (meta.filterKind === 'category') {
    const allowedSubcategories = GENERAL_CATEGORY_MAPPING[meta.filterValue] || [meta.filterValue];
    const allowedLower = allowedSubcategories.map((a) => a.toLowerCase());

    matched = catalog.filter((p) => {
      const subLower = p.subcategory.toLowerCase();
      const catLower = p.category.toLowerCase();
      if (allowedLower.includes(subLower) || allowedLower.includes(catLower)) return true;

      if (meta.filterValue === 'Gourmet, Café y Coctelería') {
        return catLower.includes('café') || subLower.includes('café') || subLower.includes('cocteler');
      }
      if (meta.filterValue === 'Escapadas y Experiencias') {
        return subLower.includes('smartbox') || subLower.includes('escapada') || p.title.toLowerCase().includes('smartbox');
      }
      return false;
    });
  } else if (meta.filterKind === 'clothing') {
    const subObj = CLOTHING_SUBFILTERS.find((s) => s.id === meta.filterValue);
    if (subObj) {
      matched = catalog.filter((p) => {
        const isClothingScope =
          isClothingCategory(p.subcategory) ||
          isClothingCategory(p.category) ||
          p.category === 'Halloween' ||
          p.subcategory.toLowerCase().includes('disfrac') ||
          p.subcategory.toLowerCase().includes('mochila');
        if (!isClothingScope) return false;
        const haystack = `${p.title} ${p.description} ${p.subcategory} ${p.searchQuery}`.toLowerCase();
        return matchesAnyKeywordWordSafe(haystack, subObj.keywords);
      });
    }
  } else if (meta.filterKind === 'anime') {
    const animeObj = ANIME_SERIES_SUBFILTERS.find((s) => s.id === meta.filterValue);
    if (animeObj) {
      matched = catalog.filter((p) => {
        const haystack = `${p.title} ${p.description} ${p.subcategory} ${p.searchQuery} ${p.badge}`.toLowerCase();
        return matchesAnyKeywordWordSafe(haystack, animeObj.keywords);
      });
    }
  } else if (meta.filterKind === 'wheels') {
    const wheelObj = WHEELS_MOTOR_SUBFILTERS.find((s) => s.id === meta.filterValue);
    if (wheelObj) {
      matched = catalog.filter((p) => {
        const isWheelsScope =
          isWheelsMotorCategory(p.subcategory) ||
          isWheelsMotorCategory(p.category) ||
          p.subcategory === 'Coches RC y Teledirigidos' ||
          p.id.startsWith('wheels-') ||
          p.id.startsWith('13-') ||
          p.id.startsWith('46-');
        if (!isWheelsScope) return false;
        const haystack = `${p.title} ${p.description} ${p.subcategory} ${p.searchQuery} ${p.badge}`.toLowerCase();
        return matchesAnyKeywordWordSafe(haystack, wheelObj.keywords);
      });
    }
  } else if (meta.filterKind === 'price') {
    matched = catalog.filter((p) => matchesPriceFilter(p.priceText, meta.filterValue));
  } else if (meta.filterKind === 'gender') {
    const targetGender = meta.filterValue === 'girl' ? 'girl' : 'boy';
    const strict = catalog.filter((p) => p.gender === targetGender);
    matched = strict.length >= 12 ? strict : catalog.filter((p) => p.gender === targetGender || p.gender === 'unisex');
  }

  const sortScore = (a: Product, b: Product) => {
    if (meta.filterKind === 'gender') {
      const target = meta.filterValue === 'girl' ? 'girl' : 'boy';
      const aMatch = a.gender === target ? 1 : 0;
      const bMatch = b.gender === target ? 1 : 0;
      if (aMatch !== bMatch) return bMatch - aMatch;
    }
    return (b.reviewsCount || 0) * (b.rating || 1) - (a.reviewsCount || 0) * (a.rating || 1);
  };

  return [...matched].sort(sortScore);
}

/**
 * Empareja productos reales y precisos para una ruta de filtro SEO,
 * reutilizando la lógica segura con límites de palabra y precios exactos.
 */
export function matchProductsForFilter(
  meta: SeoFilterRouteMeta,
  catalog: Product[] = ALL_SITE_PRODUCTS
): Product[] {
  const sortScore = (a: Product, b: Product) => {
    if (meta.filterKind === 'gender') {
      const target = meta.filterValue === 'girl' ? 'girl' : 'boy';
      const aMatch = a.gender === target ? 1 : 0;
      const bMatch = b.gender === target ? 1 : 0;
      if (aMatch !== bMatch) return bMatch - aMatch;
    }
    return (b.reviewsCount || 0) * (b.rating || 1) - (a.reviewsCount || 0) * (a.rating || 1);
  };

  const primary = matchStrictProductsForFilter(meta, catalog);
  const MIN_FILTER_PRODUCTS = 6;
  if (primary.length >= MIN_FILTER_PRODUCTS) {
    return primary;
  }

  // Backfill relacionado preservando SIEMPRE los productos estrictos en las primeras posiciones
  const seenIds = new Set(primary.map((p) => p.id));
  let relatedPool: Product[] = [];

  if (meta.slug === 'fiestas-y-revelacion-de-genero') {
    relatedPool = catalog.filter(
      (p) =>
        !seenIds.has(p.id) &&
        (p.ageRange === '0-12m' ||
          p.subcategory.toLowerCase().includes('pañales') ||
          p.subcategory.toLowerCase().includes('bebé'))
    );
  } else if (meta.filterKind === 'clothing') {
    relatedPool = catalog.filter(
      (p) =>
        !seenIds.has(p.id) &&
        (isClothingCategory(p.subcategory) ||
          isClothingCategory(p.category) ||
          p.subcategory.toLowerCase().includes('disfrac') ||
          p.subcategory.toLowerCase().includes('mochila'))
    );
  } else if (meta.filterKind === 'anime') {
    const animePool = catalog.filter((p) => {
      if (seenIds.has(p.id)) return false;
      if (isFiguresCategory(p.subcategory) || isFiguresCategory(p.category)) return true;
      const hay = `${p.title} ${p.description} ${p.subcategory} ${p.badge}`.toLowerCase();
      return (
        hay.includes('banpresto') ||
        hay.includes('ichibansho') ||
        hay.includes('funko') ||
        hay.includes('anime') ||
        hay.includes('tomo 1') ||
        hay.includes('one piece') ||
        hay.includes('dragon ball') ||
        hay.includes('naruto') ||
        hay.includes('demon slayer')
      );
    });
    const isAnimeFirst = (p: Product) => {
      const t = `${p.title} ${p.badge} ${p.description}`.toLowerCase();
      return (
        t.includes('banpresto') ||
        t.includes('ichibansho') ||
        t.includes('saitama') ||
        t.includes('goku') ||
        t.includes('luffy') ||
        t.includes('tanjiro') ||
        t.includes('kakashi') ||
        t.includes('naruto') ||
        t.includes('pop up parade')
      );
    };
    relatedPool = animePool.sort((a, b) => {
      const aAn = isAnimeFirst(a) ? 1 : 0;
      const bAn = isAnimeFirst(b) ? 1 : 0;
      if (aAn !== bAn) return bAn - aAn;
      return sortScore(a, b);
    });
    const combinedAnime = [...primary];
    for (const cand of relatedPool) {
      if (combinedAnime.length >= MIN_FILTER_PRODUCTS) break;
      seenIds.add(cand.id);
      combinedAnime.push(cand);
    }
    return combinedAnime;
  } else if (meta.filterKind === 'wheels') {
    relatedPool = catalog.filter(
      (p) =>
        !seenIds.has(p.id) &&
        (p.subcategory === 'Coches Eléctricos, Quads y Patinetes' ||
          p.subcategory === 'Coches RC y Teledirigidos' ||
          p.id.startsWith('wheels-'))
    );
  } else {
    relatedPool = catalog.filter((p) => !seenIds.has(p.id));
  }

  const combined = [...primary];
  for (const cand of relatedPool.sort(sortScore)) {
    if (combined.length >= MIN_FILTER_PRODUCTS) break;
    seenIds.add(cand.id);
    combined.push(cand);
  }

  return combined;
}

/**
 * Empareja productos para la combinación cruzada Edad × Filtro (`/<ageSlug>/<filterSlug>`).
 * - Con `strictOnly = true`, devuelve únicamente las coincidencias reales exactas en esa edad
 *   (usado por el Sitemap Engine Anti-Thin Content para indexar solo combinaciones con stock > 0).
 * - Con `strictOnly = false` (por defecto), prioriza las coincidencias exactas de esa edad y,
 *   si hay menos de 6 resultados, completa con productos relevantes de la misma etapa de edad.
 */
export function matchProductsForAgeAndFilter(
  ageSlugOrId: string,
  meta: SeoFilterRouteMeta,
  catalog: Product[] = ALL_SITE_PRODUCTS,
  strictOnly: boolean = false
): Product[] {
  const ageRoute = SEO_AGE_ROUTES[ageSlugOrId];
  const ageId = ageRoute ? ageRoute.ageId : ageSlugOrId;

  const ageCatalog =
    ageId === 'reveal'
      ? catalog.filter(
          (p) =>
            p.subcategory === 'Fiestas y Revelación de Género' ||
            p.title.toLowerCase().includes('revelación')
        )
      : catalog.filter((p) => p.ageRange === ageId);

  const strictMatches = matchStrictProductsForFilter(meta, ageCatalog);
  if (strictOnly) {
    return strictMatches;
  }

  if (strictMatches.length >= 6) {
    return strictMatches;
  }

  return matchProductsForFilter(meta, ageCatalog);
}
