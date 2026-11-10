import { HubProduct } from './automovilData';

export const HALLOWEEN_CATEGORIES = [
  { id: 'all', label: 'Todo para Halloween 2026', icon: '🎃' },
  { id: 'disfraces', label: 'Disfraces Terror & Cosplay', icon: '👻' },
  { id: 'decoracion', label: 'Decoración de Terror & Telarañas', icon: '🕷️' },
  { id: 'luces-calabaza', label: 'Calabazas LED & Iluminación', icon: '🕯️' },
  { id: 'mascaras', label: 'Máscaras LED La Purga & Maquillaje FX', icon: '🎭' },
  { id: 'chuches', label: 'Caramelos Truco o Trato & Fiestas', icon: '🍬' },
];

export const HALLOWEEN_PRICE_RANGES = [
  { id: 'all', label: 'Cualquier presupuesto' },
  { id: '<15', label: 'Detalles de miedo (<15 €)' },
  { id: '15-30', label: 'De 15 € a 30 € (Regalo ideal)' },
  { id: '30-60', label: 'De 30 € a 60 € (Fiesta completa)' },
  { id: '>60', label: 'Gama Alta (+60 €)' },
];

export const HALLOWEEN_PRODUCTS: HubProduct[] = [
  {
    id: 'hal-mascara-led-purga',
    asin: '',
    title: 'Máscara LED de Halloween La Purga con 3 Modos de Iluminación para Fiestas y Cosplay',
    category: 'mascaras',
    categoryLabel: 'Máscaras LED La Purga & Maquillaje FX',
    brand: 'Halloween FX',
    priceText: '12,99 €',
    priceNumeric: 12.99,
    rating: 4.7,
    reviewsCount: 18400,
    imageUrl: 'https://m.media-amazon.com/images/I/71MfEpfYeQL._AC_UL320_.jpg',
    badge: 'Nº 1 Más Vendido Halloween',
    description: 'La icónica máscara luminosa de La Purga con cable electroluminiscente que no emite calor ni deslumbra. 3 modos de luz (fija, parpadeo lento y parpadeo rápido) con almohadilla de espuma para máxima comodidad.',
    pros: [
      'Efecto visual aterrador en la oscuridad para fiestas nocturnas',
      'No calienta la cara y cuenta con espuma protectora en frente y barbilla',
      'Funciona con pilas estándar con clip de bolsillo para el mando'
    ],
    idealFor: 'Fiestas de Halloween, festivales, cosplay de La Purga y fotos para TikTok/Instagram.',
    searchQuery: 'mascara led purga halloween luz fiesta cosplay'
  },
  {
    id: 'hal-set-arana-telarana-gigante',
    asin: '',
    title: 'Set de Araña Gigante Peluda y Telaraña Triangular Exterior 5M con Estacas para Jardín',
    category: 'decoracion',
    categoryLabel: 'Decoración de Terror & Telarañas',
    brand: 'Horror Deco',
    priceText: '17,99 €',
    priceNumeric: 17.99,
    rating: 4.8,
    reviewsCount: 9600,
    imageUrl: 'https://m.media-amazon.com/images/I/81riPjxHz5L._AC_UL320_.jpg',
    badge: 'Impacto Visual Asegurado',
    description: 'Impresionante araña gigante de ojos rojos con patas articuladas flexibles combinada con una telaraña triangular de más de 5 metros de envergadura para fachadas, balcones o jardines.',
    pros: [
      'Patas de alambre maleable para colocar en cualquier postura o barandilla',
      'Material impermeable y resistente a la intemperie otoñal',
      'Incluye 5 estacas de anclaje para hierba o tierra y gancho para canalón'
    ],
    idealFor: 'Transformar cualquier porche, terraza o fachada en una casa encantada digna de película.',
    searchQuery: 'arana gigante halloween decoracion exterior telarana'
  },
  {
    id: 'hal-guirnalda-luces-calabaza-led',
    asin: '',
    title: 'Guirnalda de Luces Calabaza LED de Halloween 20 Bombillas con Efecto Cálido y Temporizador',
    category: 'luces-calabaza',
    categoryLabel: 'Calabazas LED & Iluminación',
    brand: 'Spooky Lights',
    priceText: '9,99 €',
    priceNumeric: 9.99,
    rating: 4.6,
    reviewsCount: 11200,
    imageUrl: 'https://m.media-amazon.com/images/I/81vpBMpoblL._AC_UL320_.jpg',
    badge: 'Ambiente Acogedor y Mágico',
    description: 'Cadena de 20 calabazas sonrientes 3D iluminadas con luces LED blanco cálido. Perfectas para colocar en chimeneas, ventanas, mesas de chuches o habitaciones infantiles sin peligro de quemaduras.',
    pros: [
      'Luces LED seguras para niños que no generan calor',
      'Ecológicas y de bajísimo consumo con alimentación a pilas',
      'Cable transparente y flexible fácil de moldear en cualquier rincón'
    ],
    idealFor: 'Dar el toque festivo perfecto a la mesa de merienda de Halloween o escaparates.',
    searchQuery: 'guirnalda luces calabaza led halloween decoracion'
  },
  {
    id: 'hal-disfraz-hinchable-gigante',
    asin: '',
    title: 'Disfraz Hinchable de Sumo Gigante para Adultos y Niños con Ventilador Automático',
    category: 'disfraces',
    categoryLabel: 'Disfraces Terror & Cosplay',
    brand: 'Party Fun',
    priceText: '29,95 €',
    priceNumeric: 29.95,
    rating: 4.8,
    reviewsCount: 14800,
    imageUrl: 'https://m.media-amazon.com/images/I/51cyA5X5WgL._AC_UL320_.jpg',
    badge: 'El Éxito de la Fiesta',
    description: 'El disfraz hinchable de sumo más divertido y llamativo de la noche. Se infla en menos de 60 segundos gracias a su potente ventilador compacto integrado a batería y mantiene el volumen durante horas de fiesta.',
    pros: [
      'Inflado ultrarrápido y peso superligero gracias a su tejido antidesgarro',
      'Talla universal con cintura elástica de ajuste hermético',
      'Garantiza risas y fotos inolvidables en cualquier evento'
    ],
    idealFor: 'Llegar a la fiesta de Halloween o carnaval y ser el centro indiscutible de todas las miradas.',
    searchQuery: 'disfraz hinchable sumo gigante halloween fiesta risas'
  }
];

export const HALLOWEEN_EXTRA_PRODUCTS: HubProduct[] = [
  {
    id: '46-capa-mascara-superheroes',
    asin: '',
    title: 'Pack de 5 Capas de Superhéroes de Satén con Máscaras de Fieltro y Muñequeras',
    category: 'disfraces',
    categoryLabel: 'Disfraces Terror & Cosplay',
    brand: 'Party Heroes',
    priceText: '18,99 €',
    priceNumeric: 18.99,
    rating: 4.8,
    reviewsCount: 17200,
    imageUrl: '/images/products/46-capa-mascara-superheroes-1.jpg',
    badge: 'El Set de Disfraces Más Vendido',
    description: 'Capas dobles reversibles de satén brillante con cierre de velcro en el cuello y máscaras de fieltro suave para fiestas temáticas, Halloween y Carnaval.',
    pros: [
      'Cierres de velcro de seguridad que se sueltan si se enganchan',
      'Satén de doble cara lavable muy brillante y ligero',
      'Pack de 5 para disfrazarse en grupo con amigos y hermanos'
    ],
    idealFor: 'Fantasía y fiestas de disfraces en grupo.',
    searchQuery: 'pack 5 capas superheroes ninos antifaces fieltro disfraces fiesta cumpleanos'
  },
  {
    id: '46-pijama-kigurumi-dinosaurio',
    asin: '',
    title: 'Pijama Entero Kigurumi de Forro Polar con Capucha de Dinosaurio y Cola Acolchada',
    category: 'disfraces',
    categoryLabel: 'Disfraces Terror & Cosplay',
    brand: 'Kigurumi Fun',
    priceText: '22,99 €',
    priceNumeric: 22.99,
    rating: 4.8,
    reviewsCount: 9100,
    imageUrl: '/images/products/46-pijama-kigurumi-dinosaurio-1.jpg',
    badge: 'Disfraz Kigurumi Abrigado',
    description: 'Mono pijama kigurumi ultra cálido con cremallera frontal, dientes 3D en la capucha y cresta con cola acolchada. Ideal para salir a pedir caramelos sin pasar frío.',
    pros: [
      'Forro polar esponjoso perfecto para noches frescas de octubre',
      'Fácil de poner sobre ropa de calle o pijama',
      'Diseño de dinosaurio muy vistoso para fiestas de disfraces'
    ],
    idealFor: 'Salir a pedir Truco o Trato calentito en Halloween y fiestas escolares.',
    searchQuery: 'pijama entero kigurumi dinosaurio infantil forro polar capucha cola cremallera'
  },
  {
    id: '79-fantasma-blitz',
    asin: '',
    title: 'Devir - Fantasma Blitz: El Juego de Reflejos Mentales Rápidos con Figuras de Madera',
    category: 'chuches',
    categoryLabel: 'Caramelos Truco o Trato & Fiestas',
    brand: 'Devir',
    priceText: '15,95 €',
    priceNumeric: 15.95,
    rating: 4.8,
    reviewsCount: 9400,
    imageUrl: '/images/products/79-fantasma-blitz-1.jpg',
    badge: 'Juego de Mesa Fiesta Halloween',
    description: '5 figuras de madera en el centro de la mesa presididas por un divertido fantasma blanco. Gana la ronda quien atrapa al vuelo la figura correcta en fiestas familiares y de Halloween.',
    pros: [
      'Temática de fantasmas perfecta para noches de Halloween en familia',
      'Piezas de madera maciza muy resistentes',
      'Partidas rápidas llenas de risas para niños y adultos'
    ],
    idealFor: 'Animar reuniones, fiestas de Halloween y sobremesas con amigos.',
    searchQuery: 'fantasma blitz devir juego de mesa figuras de madera rapidez mental reflejos'
  },
  {
    id: 'fig-blade-marvel-legends-hasbro',
    asin: 'B0FHKXCKPQ',
    title: 'Hasbro Marvel Legends - Figura Coleccionable Blade El Cazador de Vampiros 15cm con Accesorios',
    category: 'mascaras',
    categoryLabel: 'Máscaras LED La Purga & Maquillaje FX',
    brand: 'Hasbro',
    priceText: '21,99 €',
    priceNumeric: 21.99,
    rating: 4.8,
    reviewsCount: 3900,
    imageUrl: 'https://m.media-amazon.com/images/I/71rcriiCy9L._AC_UL320_.jpg',
    badge: 'Coleccionable Terror & Vampiros',
    description: 'Figura de acción prémium de 15 cm de Blade, el cazador de vampiros de Marvel, con katana plateada, gabardina táctica y accesorios sobrenaturales.',
    pros: [
      'Línea oficial Hasbro Marvel Legends con más de 20 puntos de articulación',
      'Estética oscura ideal para decoración friki de Halloween',
      'Incluye katana plateada y manos intercambiables'
    ],
    idealFor: 'Coleccionistas de terror sobrenatural, vampiros y cine Marvel.',
    searchQuery: 'marvel legends blade cazador de vampiros figura hasbro oficial'
  }
];

export const HALLOWEEN_HUB_PRODUCTS: HubProduct[] = [
  ...HALLOWEEN_PRODUCTS,
  ...HALLOWEEN_EXTRA_PRODUCTS,
];
