export const AMAZON_AFFILIATE_TAG = 'vapegadgets22-21';

export interface Product {
  id: string;
  title: string;
  slug: string;
  searchQuery: string;
  asin?: string;
  category: string;
  subcategory: string;
  ageRange: '0-12m' | '1-3' | '4-6' | '7-9' | '10-12' | '13-15' | '16-18';
  gender: 'unisex' | 'girl' | 'boy';
  priceRange: '<20' | '20-50' | '50-100' | '>100';
  priceText: string;
  rating: number;
  reviewsCount: number;
  badge: string;
  badgeColor?: string;
  description: string;
  pros: string[];
  idealFor: string;
  style: 'baby' | 'kids' | 'gamer' | 'emo' | 'tech' | 'creativity' | 'classic';
  imageUrl: string;
  images?: string[];
}

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
    tagline: 'Cochecitos, cunas de colecho, bañeras, tartas de pañales y ternura',
    description: 'Los mejores regalos y artículos esenciales para recién nacidos: desde sillas de paseo y cunas hasta tartas de pañales Dodot, bañeras seguras y canastillas de farmacia.',
    h1: 'Regalos y Artículos Esenciales para Recién Nacidos y Bebés (0 a 12 Meses)',
    seoKeywords: ['regalos recién nacido', 'cochecito bebe', 'cuna colecho chicco', 'tarta de pañales dodot', 'bañera bebe plegable'],
    theme: 'baby',
    icon: '🧸'
  },
  {
    id: '1-3',
    label: '1 a 3 Años',
    tagline: 'Torres de aprendizaje, Montessori, triciclos y primeros pasos',
    description: 'Juguetes educativos de madera, torres de aprendizaje, triciclos evolutivos, arena mágica y juegos que impulsan sus primeros pasos y el lenguaje.',
    h1: 'Regalos Educativos y Montessori para Niños y Niñas de 1 a 3 Años',
    seoKeywords: ['regalos niños 1 año', 'juguetes montessori 2 años', 'triciclo evolutivo bebe', 'torre de aprendizaje', 'regalo 3 años'],
    theme: 'kids',
    icon: '🧩'
  },
  {
    id: '4-6',
    label: '4 a 6 Años',
    tagline: 'Juegos de mesa iniciales, maletas infantiles, disfraces y creatividad',
    description: 'Juegos cooperativos como El Monstruo de Colores, maletas correpasillos Trunki, bloques magnéticos 3D y patinetes con luces LED.',
    h1: 'Ideas de Regalo para Niños y Niñas de 4 a 6 Años',
    seoKeywords: ['regalos niña 4 años', 'regalos niño 5 años', 'juegos educativos 6 años', 'maleta trunki infantil', 'el monstruo de colores'],
    theme: 'kids',
    icon: '🎨'
  },
  {
    id: '7-9',
    label: '7 a 9 Años',
    tagline: 'Juegos de Magia Borrás, juegos de mesa familiares y LEGO',
    description: 'Cajas de magia de 100 trucos, juegos de estrategia como Catan Junior, circuitos GraviTrax y sets de construcción LEGO Creator 3 en 1.',
    h1: 'Juegos de Magia, Estrategia y Regalos para Niños de 7 a 9 Años',
    seoKeywords: ['juegos de magia borras', 'catan junior devir', 'lego creator 3 en 1', 'regalos nino 8 anos', 'juegos de mesa familiares'],
    theme: 'classic',
    icon: '🎩'
  },
  {
    id: '10-12',
    label: '10 a 12 Años',
    tagline: 'Juegos de cartas competitivos (Virus!), magia con app y drones',
    description: 'El superventas Virus!, cajas de magia avanzada con tutoriales móviles, minidrones con cámara anticolisión y consolas Nintendo Switch.',
    h1: 'Regalos para Preadolescentes de 10 a 12 Años',
    seoKeywords: ['juego virus tranjis games', 'magia borras avanzada', 'dron para ninos potensic', 'regalos 11 anos', 'carcassonne devir'],
    theme: 'classic',
    icon: '🚀'
  },
  {
    id: '13-15',
    label: '13 a 15 Años',
    tagline: 'Skincare juvenil, auriculares ANC, juegos estratégicos y viajes',
    description: 'Rutinas faciales CeraVe, auriculares inalámbricos de alta fidelidad con cancelación de ruido, Catan clásico y neceseres de viaje para campamentos.',
    h1: 'Regalos para Adolescentes de 13 a 15 Años',
    seoKeywords: ['regalos 14 anos', 'auriculares anker q30', 'skincare adolescente cerave', 'catan juego de mesa', 'regalos chica 15 anos'],
    theme: 'gamer',
    icon: '🎧'
  },
  {
    id: '16-18',
    label: '16 a 18 Años',
    tagline: 'Tecnología, PlayStation 5, gaming, sonido y estilo personal',
    description: 'Ideas destacadas para jóvenes y adolescentes de 16 a 18 años: desde videojuegos y periféricos gaming hasta sonido prémium, realidad virtual y accesorios de estilo personal.',
    h1: 'Regalos para Jóvenes de 16 a 18 Años (Gaming, Tech y Estilo)',
    seoKeywords: ['juegos ps5 spiderman 2', 'regalos 18 anos', 'mando dualsense edge', 'meta quest 3s vr', 'calvin klein ck one'],
    theme: 'gamer',
    icon: '⚡'
  }
];

import { ADDITIONAL_VERIFIED_PRODUCTS } from './additionalProducts';

export const PRODUCTS: Product[] = [
  ...ADDITIONAL_VERIFIED_PRODUCTS,
  {
    id: 'bebe-canon-confeti',
    asin: 'B0B945FCKT',
    title: 'Pack de 4 Cañones de Confeti para Revelación de Género de Bebé (2 Rosas y 2 Azules)',
    slug: 'pack-4-canones-confeti-revelacion-genero-bebe',
    searchQuery: 'canones confeti revelacion genero bebe gender reveal',
    category: 'Recién Nacidos',
    subcategory: 'Fiestas y Revelación de Género',
    ageRange: '0-12m',
    gender: 'unisex',
    priceRange: '<20',
    priceText: '16,99 €',
    rating: 4.8,
    reviewsCount: 3200,
    badge: 'Superventas Revelación de Género',
    description: 'Pack de 4 cañones de confeti biodegradable de 30 cm para fiesta de revelación de sexo del bebé. Vienen con pegatinas secretas para tapar el color y disparan una lluvia brillante de hasta 6 metros de altura.',
    pros: ['Confeti biodegradable no tóxico seguro para exteriores', 'Pegatinas incógnita para mantener la sorpresa hasta el momento del disparo', 'Lanzamiento suave con giro de base apto para futuros papás y padrinos'],
    idealFor: 'El momento clímax de la fiesta de revelación de género y fotos inolvidables',
    style: 'baby',
    imageUrl: '/images/products/bebe-canon-confeti-1.jpg',
    images: [
      '/images/products/bebe-canon-confeti-1.jpg',
      '/images/products/bebe-canon-confeti-2.jpg',
      '/images/products/bebe-canon-confeti-3.jpg'
    ]
  },
  {
    id: 'bebe-globo-enigma',
    asin: 'B0BXB7YQ5Z',
    title: 'Globo Gigante Enigma 90 cm Revelación de Género Bebé ("¿Niño o Niña?") con Confeti Doble',
    slug: 'globo-gigante-enigma-90cm-revelacion-genero-bebe',
    searchQuery: 'globo gigante enigma revelacion genero bebe 90 cm nino nina',
    category: 'Recién Nacidos',
    subcategory: 'Fiestas y Revelación de Género',
    ageRange: '0-12m',
    gender: 'unisex',
    priceRange: '<20',
    priceText: '11,99 €',
    rating: 4.7,
    reviewsCount: 1850,
    badge: 'El Globo Enigma Más Viral',
    description: 'Globo de látex negro opaco gigante de 90 cm de diámetro con la inscripción "¿Niño o Niña?". Incluye dos bolsas de confeti rosa y azul para rellenar en secreto antes de inflar con helio o aire.',
    pros: ['Látex negro 100% opaco imposible de traslucir antes del pinchazo', 'Incluye aguja con lazo decorativo para explotar el globo', 'Crea una lluvia espectacular de confeti flotante en cámara lenta'],
    idealFor: 'La cuenta atrás de la fiesta sorpresa familiar',
    style: 'baby',
    imageUrl: '/images/products/bebe-globo-enigma-1.jpg',
    images: [
      '/images/products/bebe-globo-enigma-1.jpg',
      '/images/products/bebe-globo-enigma-2.jpg',
      '/images/products/bebe-globo-enigma-3.jpg'
    ]
  },
  {
    id: 'bebe-polvo-holi',
    asin: 'B08FCVTYFG',
    title: 'PrimePure - Cañones de Humo de Polvo Holi y Confeti Metálico Gender Reveal',
    slug: 'primepure-canones-humo-polvo-holi-confeti-gender-reveal',
    searchQuery: 'canones humo polvo holi confeti fiesta revelacion genero',
    category: 'Recién Nacidos',
    subcategory: 'Fiestas y Revelación de Género',
    ageRange: '0-12m',
    gender: 'unisex',
    priceRange: '20-50',
    priceText: '22,90 €',
    rating: 4.9,
    reviewsCount: 2400,
    badge: 'Efecto Nube de Humo Espectacular',
    description: 'Set de cañones combinados que disparan una nube de humo densa y vibrante de polvo de almidón de maíz 100% natural mezclado con confeti metalizado reflectante.',
    pros: ['Polvo holi lavable 100% vegetal que se retira con agua', 'Disparo de alta densidad perfecto para vídeos virales de TikTok e Instagram', 'Mecanismo de compresión de aire sin pólvora ni pirotecnia'],
    idealFor: 'Sesiones fotográficas al aire libre de alto impacto visual',
    style: 'baby',
    imageUrl: '/images/products/bebe-polvo-holi-1.jpg',
    images: [
      '/images/products/bebe-polvo-holi-1.jpg',
      '/images/products/bebe-polvo-holi-2.jpg',
      '/images/products/bebe-polvo-holi-3.jpg'
    ]
  },
  // =========================================================================
  // 1. RECIÉN NACIDOS (0-12 MESES) - IMÁGENES EXACTAS DE PRODUCTO
  // =========================================================================
  {
    id: 'bebe-cochecito',
    asin: 'B0DLWK3LKH',
    title: 'Chicco London Up - Silla de Paseo Ligera Plegable Tipo Paraguas Reclinable 4 Posiciones (0 a 3 Años)',
    slug: 'chicco-london-silla-paseo-ligera-plegable',
    searchQuery: 'chicco london silla de paseo ligera compacta plegable paraguas',
    category: 'Recién Nacidos',
    subcategory: 'Cochecitos y Mobiliario de Bebé',
    ageRange: '0-12m',
    gender: 'unisex',
    priceRange: '50-100',
    priceText: '89,90 €',
    rating: 4.8,
    reviewsCount: 9400,
    badge: 'Superventas Paseo de Bebé',
    description: 'Silla de paseo homologada desde el primer día de vida gracias a su respaldo completamente reclinable en 4 posiciones. Plegado ultra compacto tipo paraguas y arnés acolchado de 5 puntos.',
    pros: ['Plegado en paraguas muy fácil de meter en cualquier maletero', 'Estructura ligera de solo 7,2 kg pero súper estable', 'Incluye burbuja impermeable para la lluvia y cesta portaobjetos'],
    idealFor: 'Paseos diarios, visitas al pediatra y viajes familiares',
    style: 'baby',
    imageUrl: '/images/products/bebe-cochecito-1.jpg',
    images: [
      '/images/products/bebe-cochecito-1.jpg',
      '/images/products/bebe-cochecito-2.jpg',
      '/images/products/bebe-cochecito-3.jpg'
    ]
  },
  {
    id: 'bebe-cuna-colecho',
    asin: 'B0FT354RXW',
    title: 'Chicco Next2Me - Cuna de Colecho Ajustable con Colchón Transpirable',
    slug: 'chicco-next2me-cuna-colecho-ajustable',
    searchQuery: 'chicco next2me cuna de colecho ajustable regulable altura colchon',
    category: 'Recién Nacidos',
    subcategory: 'Cochecitos y Mobiliario de Bebé',
    ageRange: '0-12m',
    gender: 'unisex',
    priceRange: '>100',
    priceText: '149,00 €',
    rating: 4.9,
    reviewsCount: 12500,
    badge: 'La Cuna de Colecho Favorita de Padres',
    description: 'Permite dormir pegado al bebé sin compartir la misma cama. Regulable en 6 alturas, con lateral abatible y patas articuladas para adaptarse a canapés y camas con cajones.',
    pros: ['Facilita la lactancia materna nocturna sin tener que levantarse de la cama', 'Ventanas de malla transpirable para una óptima circulación del aire', 'Colchón firme ortopédico recomendado por pediatras'],
    idealFor: 'Los primeros 6 meses de sueño seguro junto a los padres',
    style: 'baby',
    imageUrl: '/images/products/bebe-cuna-colecho-1.jpg',
    images: [
      '/images/products/bebe-cuna-colecho-1.jpg',
      '/images/products/bebe-cuna-colecho-2.jpg',
      '/images/products/bebe-cuna-colecho-3.jpg'
    ]
  },
  {
    id: 'bebe-banera-plegable',
    asin: 'B0FTW5CCW1',
    title: 'Jané Smart Bath - Bañera Plegable para Bebé con Cojín Reductor y Sensor de Temperatura',
    slug: 'jane-smart-bath-banera-plegable-bebe',
    searchQuery: 'jane banera plegable bebe con reductor y termometro tapon sensor',
    category: 'Recién Nacidos',
    subcategory: 'Bañeras e Higiene del Bebé',
    ageRange: '0-12m',
    gender: 'unisex',
    priceRange: '20-50',
    priceText: '42,90 €',
    rating: 4.8,
    reviewsCount: 4800,
    badge: 'Plegado Ultra Plano para Ahorrar Espacio',
    description: 'La bañera evolutiva que se pliega como un acordeón hasta quedar de solo 9 cm de grosor. Incluye cojín flotante ergonómico para bañar al recién nacido con las manos libres y tapón con sensor térmico.',
    pros: ['El tapón cambia de color si el agua supera los 37°C para evitar quemaduras', 'Patas antideslizantes con bloqueo de seguridad', 'Se cuelga detrás de la puerta del baño o se guarda bajo el mueble'],
    idealFor: 'La hora del baño relajante y pisos con espacio reducido',
    style: 'baby',
    imageUrl: '/images/products/bebe-banera-plegable-1.jpg',
    images: [
      '/images/products/bebe-banera-plegable-1.jpg',
      '/images/products/bebe-banera-plegable-2.jpg',
      '/images/products/bebe-banera-plegable-3.jpg'
    ]
  },
  {
    id: 'bebe-tarta-dodot-3pisos',
    asin: 'B07QH7SXHC',
    title: 'Tarta de Pañales Dodot Sensitive 3 Pisos con Peluche Suave y Manta',
    slug: 'tarta-de-panales-dodot-sensitive-3-pisos',
    searchQuery: 'tarta de panales dodot sensitive peluche recien nacido 3 pisos',
    category: 'Recién Nacidos',
    subcategory: 'Tartas de Pañales',
    ageRange: '0-12m',
    gender: 'unisex',
    priceRange: '20-50',
    priceText: '44,95 €',
    rating: 4.9,
    reviewsCount: 1420,
    badge: 'Número 1 en Ventas Baby Shower',
    description: 'Tarta artesanal con más de 50 pañales Dodot Sensitive Talla 2, peluche suave hipoalergénico, gasa de muselina y lazo de raso. Envuelto en papel celofán protector listo para regalar.',
    pros: ['Pañales Dodot Sensitive con canal de absorción máxima', 'Elaboración higiénica artesanal en España', 'Presentación espectacular para nacimientos y baby showers'],
    idealFor: 'Nacimientos, bautizos y fiestas de bienvenida de bebé',
    style: 'baby',
    imageUrl: '/images/products/bebe-tarta-dodot-3pisos-1.jpg',
    images: [
      '/images/products/bebe-tarta-dodot-3pisos-1.jpg',
      '/images/products/bebe-tarta-dodot-3pisos-2.jpg'
    ]
  },
  {
    id: 'bebe-tarta-cochecito',
    asin: 'B0CKR54BS7',
    title: 'Tarta de Pañales Dodot en Forma de Cochecito de Bebé con Babero y Biberón',
    slug: 'tarta-panales-dodot-forma-cochecito',
    searchQuery: 'tarta de panales dodot forma cochecito carrito bebe babero biberon',
    category: 'Recién Nacidos',
    subcategory: 'Tartas de Pañales',
    ageRange: '0-12m',
    gender: 'unisex',
    priceRange: '20-50',
    priceText: '49,90 €',
    rating: 4.8,
    reviewsCount: 980,
    badge: 'Diseño Original y Creativo',
    description: 'Estructura moldeada artesanalmente como un cochecito de bebé tradicional, elaborada con más de 45 pañales Dodot Sensitive, muselina de algodón, babero y biberón decorativo.',
    pros: ['Sorprende a los padres con una presentación única', 'Cada pañal se extrae limpio e intacto sin pegamento dañino', 'Envuelto con lazo ceremonial'],
    idealFor: 'Regalo conjunto de amigos o compañeros de trabajo',
    style: 'baby',
    imageUrl: '/images/products/bebe-tarta-cochecito-1.jpg',
    images: [
      '/images/products/bebe-tarta-cochecito-1.jpg',
      '/images/products/bebe-tarta-cochecito-2.jpg',
      '/images/products/bebe-tarta-cochecito-3.jpg'
    ]
  },
  {
    id: 'bebe-gimnasio-piano',
    asin: 'B0CQK6DNWF',
    title: 'Fisher-Price - Gimnasio Manta de Juego Piano Pataditas Superaprendizaje',
    slug: 'fisher-price-gimnasio-piano-pataditas',
    searchQuery: 'fisher price gimnasio piano pataditas superaprendizaje manta bebe',
    category: 'Recién Nacidos',
    subcategory: 'Juguetes y Peluches de Bebé',
    ageRange: '0-12m',
    gender: 'unisex',
    priceRange: '50-100',
    priceText: '52,99 €',
    rating: 4.9,
    reviewsCount: 14200,
    badge: 'El Gimnasio Más Famoso del Mundo',
    description: 'Un éxito garantizado para el desarrollo psicomotriz del bebé. Al patalear activa notas y canciones educativas en el piano, y los colgantes de animales estimulan el agarre y la coordinación ojo-mano.',
    pros: ['4 formas de juego que evolucionan de 0 a 36 meses', 'Piano extraíble para llevarlo a cualquier parte', 'Alfombra acolchada lavable a máquina'],
    idealFor: 'Estimulación sensorial temprana y juego boca abajo (Tummy Time)',
    style: 'baby',
    imageUrl: '/images/products/bebe-gimnasio-piano-1.jpg',
    images: [
      '/images/products/bebe-gimnasio-piano-1.jpg',
      '/images/products/bebe-gimnasio-piano-2.jpg',
      '/images/products/bebe-gimnasio-piano-3.jpg'
    ]
  },
  {
    id: 'bebe-suavinex-kit',
    asin: 'B0C438DBMS',
    title: 'Suavinex - Set de Cuidado y Aseo para Bebé Baby Care Essentials en Neceser Rígido',
    slug: 'suavinex-set-cuidado-aseo-bebe-neceser',
    searchQuery: 'suavinex neceser cuidados bebe set aseo cepillo tijeritas termometro',
    category: 'Recién Nacidos',
    subcategory: 'Droguería y Cuidado Infantil',
    ageRange: '0-12m',
    gender: 'unisex',
    priceRange: '<20',
    priceText: '19,95 €',
    rating: 4.9,
    reviewsCount: 7800,
    badge: 'Imprescindible en el Neceser',
    description: 'Set oficial Suavinex que reúne todo lo necesario para la higiene del recién nacido: cepillo de cerdas suaves, peine con púas redondeadas, tijeritas con punta roma, cortaúñas ergonómico, lima y cepillo dedal de silicona.',
    pros: ['Neceser rígido con cremallera fácil de transportar en el bolso', 'Puntas protegidas que previenen arañazos accidentales', 'Calidad dermatológica de farmacia española'],
    idealFor: 'Regalo práctico de bienvenida que todo padre primerizo agradece',
    style: 'baby',
    imageUrl: '/images/products/bebe-suavinex-kit-1.jpg',
    images: [
      '/images/products/bebe-suavinex-kit-1.jpg',
      '/images/products/bebe-suavinex-kit-2.jpg',
      '/images/products/bebe-suavinex-kit-3.jpg'
    ]
  },
  {
    id: 'bebe-suavinex-colonia',
    asin: 'B003WF3JPS',
    title: 'Suavinex Baby Cologne - Agua de Colonia Infantil Sin Alcohol con Vaporizador 100ml',
    slug: 'suavinex-baby-cologne-colonia-infantil-100ml',
    searchQuery: 'suavinex baby cologne agua de colonia infantil vaporizador 100ml',
    category: 'Recién Nacidos',
    subcategory: 'Perfumería y Fragancias',
    ageRange: '0-12m',
    gender: 'unisex',
    priceRange: '<20',
    priceText: '10,95 €',
    rating: 4.9,
    reviewsCount: 14200,
    badge: 'La Colonia de Bebé Más Famosa',
    description: 'La mítica fragancia delicada con notas cítricas, flor blanca y almizcle. Su fórmula baja en alcohol no mancha la ropa y perfuma la ropita, el pelo y la cuna con ternura.',
    pros: ['No mancha la ropa infantil ni sábanas', 'Frasco de cristal con práctico vaporizador dosificador', 'Dermatológicamente testada'],
    idealFor: 'Uso diario después del baño del bebé',
    style: 'baby',
    imageUrl: '/images/products/bebe-suavinex-colonia-1.jpg',
    images: [
      '/images/products/bebe-suavinex-colonia-1.jpg',
      '/images/products/bebe-suavinex-colonia-2.jpg',
      '/images/products/bebe-suavinex-colonia-3.jpg'
    ]
  },
  {
    id: 'bebe-mustela-canastilla',
    asin: 'B08MKRS4VL',
    title: 'Mustela - Canastilla Mis Primeros Productos Set de Aseo para Bebé',
    slug: 'mustela-canastilla-mis-primeros-productos-bebe',
    searchQuery: 'mustela canastilla regalo bebe mis primeros productos gel crema colonia',
    category: 'Recién Nacidos',
    subcategory: 'Droguería y Cuidado Infantil',
    ageRange: '0-12m',
    gender: 'unisex',
    priceRange: '20-50',
    priceText: '29,90 €',
    rating: 4.8,
    reviewsCount: 5600,
    badge: 'Cosmética Pediátrica Número 1',
    description: 'Canastilla oficial Mustela que contiene Gel de Baño Suave 500ml, Leche Corporal Hydra Bebé 300ml, Crema Bálsamo para el cambio de pañal 50ml y Agua de Colonia sin alcohol 200ml en un bonito cesto.',
    pros: ['Ingredientes con un 98% de origen natural con Perseosa de Aguacate', 'Respeta la barrera cutánea de pieles atópicas desde el primer día', 'Aroma inconfundible a bebé limpio'],
    idealFor: 'Celebraciones de nacimiento y regalos de maternidad',
    style: 'baby',
    imageUrl: '/images/products/bebe-mustela-canastilla-1.jpg',
    images: [
      '/images/products/bebe-mustela-canastilla-1.jpg',
      '/images/products/bebe-mustela-canastilla-2.jpg'
    ]
  },
  {
    id: 'bebe-buho-ruido-blanco',
    asin: 'B0BSXPCX6K',
    title: 'Tommee Tippee - Peluche Ruido Blanco Búho Ollie con Sensor de Llanto CrySensor',
    slug: 'tommee-tippee-peluche-ruido-blanco-buho-ollie',
    searchQuery: 'tommee tippee peluche ruido blanco buho ollie crysensor recargable',
    category: 'Recién Nacidos',
    subcategory: 'Juguetes y Peluches de Bebé',
    ageRange: '0-12m',
    gender: 'unisex',
    priceRange: '20-50',
    priceText: '36,99 €',
    rating: 4.8,
    reviewsCount: 8900,
    badge: 'Salvavidas del Sueño Infantil',
    description: 'El peluche suave de compañía que calma a los bebés por la noche. Reproduce latidos del corazón materno, lluvia, olas y ruido blanco, y su sensor CrySensor se activa automáticamente si el bebé llora.',
    pros: ['Recargable por USB sin necesidad de cambiar pilas', 'Luz tenue en la barriguita regulable', 'Recomendado por matronas y pediatras'],
    idealFor: 'Bebés con cólicos o problemas para conciliar el sueño',
    style: 'baby',
    imageUrl: '/images/products/bebe-buho-ruido-blanco-1.jpg',
    images: [
      '/images/products/bebe-buho-ruido-blanco-1.jpg',
      '/images/products/bebe-buho-ruido-blanco-2.jpg',
      '/images/products/bebe-buho-ruido-blanco-3.jpg'
    ]
  },
  {
    id: 'bebe-boppy-lactancia',
    asin: 'B0DTVGND29',
    title: 'Chicco Boppy - Cojín de Lactancia Ergonómico con Funda 100% Algodón Lavable',
    slug: 'chicco-boppy-cojin-lactancia-algodon',
    searchQuery: 'chicco boppy cojin de lactancia algodon desenfundable',
    category: 'Recién Nacidos',
    subcategory: 'Cochecitos y Mobiliario de Bebé',
    ageRange: '0-12m',
    gender: 'unisex',
    priceRange: '20-50',
    priceText: '39,90 €',
    rating: 4.9,
    reviewsCount: 6300,
    badge: 'Premio Mejor Cojín de Lactancia',
    description: 'El cojín ergonómico que reduce la tensión muscular en brazos, cuello y espalda durante la lactancia materna o con biberón. Relleno de fibra Miracle Middle que no se deforma con el uso.',
    pros: ['Funda desenfundable con cremallera lavable a máquina', 'Sirve como nido de apoyo cuando el bebé aprende a sentarse', 'Aprobado por matronas y fisioterapeutas'],
    idealFor: 'Madres lactantes y confort del recién nacido',
    style: 'baby',
    imageUrl: '/images/products/bebe-boppy-lactancia-1.jpg',
    images: [
      '/images/products/bebe-boppy-lactancia-1.jpg',
      '/images/products/bebe-boppy-lactancia-2.jpg'
    ]
  },
  {
    id: 'bebe-kaloo-doudou',
    asin: 'B08SXQMXCN',
    title: 'Kaloo - Doudou Muñeco de Apego Conejito Plume Extra Suave en Caja Regalo',
    slug: 'kaloo-doudou-conejito-plume-extra-suave',
    searchQuery: 'kaloo doudou conejito plume peluche bebe caja regalo',
    category: 'Recién Nacidos',
    subcategory: 'Juguetes y Peluches de Bebé',
    ageRange: '0-12m',
    gender: 'unisex',
    priceRange: '<20',
    priceText: '16,99 €',
    rating: 4.8,
    reviewsCount: 2400,
    badge: 'Tacto Pluma Aterciopelado',
    description: 'El doudou de apego de referencia francesa con pliegues fáciles de agarrar por las manitas del recién nacido y orejitas largas ultrasuaves para acariciar mientras concilia el sueño.',
    pros: ['Lavable a máquina a 30°C manteniendo la suavidad', 'Presentado en elegante caja redonda de regalo', '100% seguro sin piezas plásticas desprendibles'],
    idealFor: 'El primer peluche inseparable del bebé',
    style: 'baby',
    imageUrl: '/images/products/bebe-kaloo-doudou-1.jpg',
    images: [
      '/images/products/bebe-kaloo-doudou-1.jpg',
      '/images/products/bebe-kaloo-doudou-2.jpg',
      '/images/products/bebe-kaloo-doudou-3.jpg'
    ]
  },

  // =========================================================================
  // 2. NIÑOS DE 1 A 3 AÑOS - MONTESSORI, TRICICLOS, BICIS SIN PEDALES, MOTRICIDAD
  // =========================================================================
  {
    id: '13-torre-aprendizaje',
    asin: 'B0FHWR59B2',
    title: 'Bianconiglio Kids - Torre de Aprendizaje Montessori Evolutiva en Madera Natural',
    slug: 'bianconiglio-kids-torre-aprendizaje-montessori',
    searchQuery: 'bianconiglio kids torre de aprendizaje montessori madera evolutiva',
    category: '1 a 3 Años',
    subcategory: 'Método Montessori y Madera',
    ageRange: '1-3',
    gender: 'unisex',
    priceRange: '50-100',
    priceText: '94,00 €',
    rating: 4.9,
    reviewsCount: 3800,
    badge: 'Autonomía Infantil Segura',
    description: 'Permite al niño alcanzar la encimera de la cocina o el lavabo con total seguridad gracias a sus barras laterales anticaída y plataforma regulable en 3 alturas que crece con él.',
    pros: ['Madera de abedul con certificado FSC y barniz ecológico', 'Sistema antivuelco ensayado en laboratorio', 'Fomenta la participación en tareas cotidianas familiares'],
    idealFor: 'Niños a partir de 12 meses que quieren cocinar y lavarse solos',
    style: 'kids',
    imageUrl: '/images/products/13-torre-aprendizaje-1.jpg',
    images: [
      '/images/products/13-torre-aprendizaje-1.jpg',
      '/images/products/13-torre-aprendizaje-2.jpg',
      '/images/products/13-torre-aprendizaje-3.jpg'
    ]
  },
  {
    id: '13-triciclo-aveo',
    asin: 'B0FQPFB8RQ',
    title: 'Kinderkraft Aveo - Triciclo Evolutivo Plegable 5 en 1 con Asiento Giratorio',
    slug: 'kinderkraft-aveo-triciclo-evolutivo-plegable',
    searchQuery: 'kinderkraft aveo triciclo bebe evolutivo plegable asiento giratorio',
    category: '1 a 3 Años',
    subcategory: 'Kits de Viaje y Maletas',
    ageRange: '1-3',
    gender: 'unisex',
    priceRange: '50-100',
    priceText: '84,95 €',
    rating: 4.8,
    reviewsCount: 5200,
    badge: 'El Triciclo Más Completo',
    description: 'Se transforma en 5 etapas desde los 9 meses hasta los 5 años: empieza como sillita guiada por los padres y termina como triciclo independiente con pedales y manillar autónomo.',
    pros: ['Ruedas de goma antipinchazos con amortiguación suave', 'Asiento giratorio 360° para mirar a los padres o al frente', 'Capota extensible con protección solar UPF50+'],
    idealFor: 'Paseos diarios por el parque sustituyendo la silla de paseo',
    style: 'kids',
    imageUrl: '/images/products/13-triciclo-aveo-1.jpg',
    images: [
      '/images/products/13-triciclo-aveo-1.jpg',
      '/images/products/13-triciclo-aveo-2.jpg',
      '/images/products/13-triciclo-aveo-3.jpg'
    ]
  },
  {
    id: '13-chicco-first-bike',
    asin: 'B004MW55Z2',
    title: 'Chicco First Bike - Bicicleta de Equilibrio sin Pedales Ultraligera (2 a 5 Años)',
    slug: 'chicco-first-bike-bicicleta-equilibrio-sin-pedales',
    searchQuery: 'chicco first bike bicicleta sin pedales ultraligera metal ninos',
    category: '1 a 3 Años',
    subcategory: 'Método Montessori y Madera',
    ageRange: '1-3',
    gender: 'unisex',
    priceRange: '20-50',
    priceText: '34,99 €',
    rating: 4.8,
    reviewsCount: 16900,
    badge: 'La Bici Sin Pedales Más Vendida de Europa',
    description: 'Estructura metálica ultraligera de solo 2,7 kg. Desarrolla el equilibrio vestibular para que los niños pasen directamente a la bicicleta de pedales sin necesidad de ruedines.',
    pros: ['Sillín y manillar ajustables en altura', 'Ruedas antipinchazos de espuma EVA que no necesitan hincharse', 'Chasis robusto que soporta hasta 25 kg'],
    idealFor: 'Paseos por el parque y aprendizaje del equilibrio',
    style: 'kids',
    imageUrl: '/images/products/13-chicco-first-bike-1.jpg',
    images: [
      '/images/products/13-chicco-first-bike-1.jpg',
      '/images/products/13-chicco-first-bike-2.jpg',
      '/images/products/13-chicco-first-bike-3.jpg'
    ]
  },
  {
    id: '13-cocina-hape',
    asin: 'B0CS53B8Q7',
    title: 'Hape Gourmet Kitchen - Cocina Infantil de Madera con Accesorios y Utensilios',
    slug: 'hape-gourmet-kitchen-cocina-madera',
    searchQuery: 'hape cocina infantil madera gourmet kitchen accesorios sartenes',
    category: '1 a 3 Años',
    subcategory: 'Método Montessori y Madera',
    ageRange: '1-3',
    gender: 'unisex',
    priceRange: '50-100',
    priceText: '79,95 €',
    rating: 4.8,
    reviewsCount: 4100,
    badge: 'Madera Sostenible y Diseño Nórdico',
    description: 'Cocina de madera noble con fogones giratorios que hacen clic, horno con bandeja, fregadero extraíble y armario de almacenaje. Fabricada con pinturas al agua no tóxicas.',
    pros: ['Estructura sólida que no se tambalea', 'Estimula el lenguaje, la imitación y la empatía social', 'Pinturas al agua respetuosas con el medio ambiente'],
    idealFor: 'Tardes enteras de juego imaginativo cocinando para la familia',
    style: 'kids',
    imageUrl: '/images/products/13-cocina-hape-1.jpg',
    images: [
      '/images/products/13-cocina-hape-1.jpg',
      '/images/products/13-cocina-hape-2.jpg',
      '/images/products/13-cocina-hape-3.jpg'
    ]
  },
  {
    id: '13-clemmy-bloques',
    asin: 'B0C7HBS9VW',
    title: 'Clementoni Clemmy - Bolsa de 24 Bloques Blandos Aromáticos y Lavables',
    slug: 'clementoni-clemmy-bloques-blandos-bolsa',
    searchQuery: 'clementoni clemmy bloques blandos bolsa 24 piezas lavables bebe',
    category: '1 a 3 Años',
    subcategory: 'Método Montessori y Madera',
    ageRange: '1-3',
    gender: 'unisex',
    priceRange: '<20',
    priceText: '16,90 €',
    rating: 4.8,
    reviewsCount: 6800,
    badge: '100% Inofensivo al Pisar',
    description: 'Bloques de construcción de goma elástica ultra suave perfumada que no hacen daño si se pisan ni si el bebé se cae sobre ellos. Se pueden morder y lavar con agua caliente.',
    pros: ['Material atóxico apto para morder con olor suave a vainilla', 'Encaje ultrasencillo para manitas de 10 a 36 meses', 'Bolsa transparente con cremallera y asa para ordenar rápido'],
    idealFor: 'Los primeros apilamientos de bloques sin frustración',
    style: 'kids',
    imageUrl: '/images/products/13-clemmy-bloques-1.jpg',
    images: [
      '/images/products/13-clemmy-bloques-1.jpg',
      '/images/products/13-clemmy-bloques-2.jpg',
      '/images/products/13-clemmy-bloques-3.jpg'
    ]
  },
  {
    id: '13-kinetic-sand',
    asin: 'B08LZN7LFR',
    title: 'Kinetic Sand - Arena Mágica Cinética Maletín con Moldes de Castillo 900g',
    slug: 'kinetic-sand-arena-cinetica-maletin-castillo',
    searchQuery: 'kinetic sand maletin arena magica cinetica castillo moldes 900g',
    category: '1 a 3 Años',
    subcategory: 'Método Montessori y Madera',
    ageRange: '1-3',
    gender: 'unisex',
    priceRange: '<20',
    priceText: '19,99 €',
    rating: 4.8,
    reviewsCount: 9400,
    badge: 'La Auténtica Arena Mágica Que No Mancha',
    description: 'Hecha con arena natural de grano fino que se adhiere mágicamente a sí misma y nunca se seca. Se desliza entre los dedos con un efecto hipnótico y relajante.',
    pros: ['Fácil de recoger: no ensucia suelos, alfombras ni ropa', 'Libre de trigo, gluten y caseína', 'Maletín con bandeja integrada para jugar en cualquier lugar'],
    idealFor: 'Desarrollo táctil sensorial y momentos de relajación en casa',
    style: 'kids',
    imageUrl: '/images/products/13-kinetic-sand-1.jpg',
    images: [
      '/images/products/13-kinetic-sand-1.jpg',
      '/images/products/13-kinetic-sand-2.jpg',
      '/images/products/13-kinetic-sand-3.jpg'
    ]
  },

  // =========================================================================
  // 3. NIÑOS DE 4 A 6 AÑOS - PRIMEROS JUEGOS DE MESA, MALETAS, PATINETES
  // =========================================================================
  {
    id: '46-monstruo-colores',
    asin: 'B07KXVBQLS',
    title: 'Devir - El Monstruo de Colores: El Juego de Mesa de las Emociones Infantiles',
    slug: 'devir-el-monstruo-de-colores-juego-mesa',
    searchQuery: 'devir el monstruo de colores juego de mesa infantil emociones',
    category: '4 a 6 Años',
    subcategory: 'Juegos de Mesa y Cartas',
    ageRange: '4-6',
    gender: 'unisex',
    priceRange: '20-50',
    priceText: '28,95 €',
    rating: 4.9,
    reviewsCount: 7100,
    badge: 'Recomendado por Psicólogos y Docentes',
    description: 'Un juego cooperativo donde todos los jugadores colaboran para ayudar al Monstruo a ordenar sus emociones (alegría, tristeza, rabia, miedo y calma) en los tarros correspondientes hablando de sus sentimientos.',
    pros: ['Fomenta la comunicación y empatía familiar', 'Componentes de madera y cartón de altísima calidad', 'Reglas sencillas que se aprenden en 3 minutos'],
    idealFor: 'Aprender a gestionar rabietas y emociones en familia',
    style: 'classic',
    imageUrl: '/images/products/46-monstruo-colores-1.jpg',
    images: [
      '/images/products/46-monstruo-colores-1.jpg',
      '/images/products/46-monstruo-colores-2.jpg',
      '/images/products/46-monstruo-colores-3.jpg'
    ]
  },
  {
    id: '46-dobble-kids',
    asin: 'B00OM7VIC6',
    title: 'Asmodee - Dobble Infantil: Juego de Cartas de Rapidez Visual y Reflejos',
    slug: 'asmodee-dobble-infantil-juego-cartas',
    searchQuery: 'asmodee dobble infantil juego de cartas lata redonda rapidez',
    category: '4 a 6 Años',
    subcategory: 'Juegos de Mesa y Cartas',
    ageRange: '4-6',
    gender: 'unisex',
    priceRange: '<20',
    priceText: '14,99 €',
    rating: 4.9,
    reviewsCount: 18500,
    badge: 'Risas Garantizadas en 5 Minutos',
    description: 'Entre dos cartas cualesquiera siempre hay exactamente un símbolo idéntico. ¿Quién será el más rápido en encontrarlo y decirlo en voz alta? 5 minijuegos en una práctica lata metálica redonda.',
    pros: ['Reglas instantáneas para jugar nada más abrir la lata', 'Potencia la agudeza visual y la velocidad de respuesta', 'Tamaño de bolsillo para llevar a restaurantes o viajes'],
    idealFor: 'Tardes de juegos en familia y piques divertidos con amigos',
    style: 'classic',
    imageUrl: '/images/products/46-dobble-kids-1.jpg',
    images: [
      '/images/products/46-dobble-kids-1.jpg'
    ]
  },
  {
    id: '46-trunki-maleta',
    asin: 'B001A2H050',
    title: 'Trunki - Maleta Infantil Correpasillos de Equipaje de Mano con Ruedas',
    slug: 'trunki-maleta-infantil-correpasillos',
    searchQuery: 'trunki maleta infantil correpasillos equipaje de mano avion ninos',
    category: '4 a 6 Años',
    subcategory: 'Kits de Viaje y Maletas',
    ageRange: '4-6',
    gender: 'unisex',
    priceRange: '20-50',
    priceText: '49,99 €',
    rating: 4.8,
    reviewsCount: 16800,
    badge: 'Aprobada en Cabina de Avión',
    description: 'La maleta infantil más divertida del mundo. Los niños guardan su ropa, se sientan encima y corretean por el aeropuerto o la estación de tren mientras los padres los remolcan cuando se cansan.',
    pros: ['Carcasa de plástico ultrarresistente que soporta hasta 50 kg', 'Capacidad interior de 18 litros con gomas tensoras de sujeción', 'Evita el aburrimiento en las esperas de viaje'],
    idealFor: 'Vacaciones familiares, escapadas de fin de semana y viajes en avión',
    style: 'kids',
    imageUrl: '/images/products/46-trunki-maleta-1.jpg',
    images: [
      '/images/products/46-trunki-maleta-1.jpg',
      '/images/products/46-trunki-maleta-2.jpg',
      '/images/products/46-trunki-maleta-3.jpg'
    ]
  },
  {
    id: '46-bopster-patinete',
    asin: 'B0CZPQF3CR',
    title: 'Bopster - Patinete Infantil de 3 Ruedas con Luces LED Plegable',
    slug: 'bopster-patinete-infantil-3-ruedas-luces-led',
    searchQuery: 'bopster patinete infantil 3 ruedas luces led plegable manillar ajustable',
    category: '4 a 6 Años',
    subcategory: 'Kits de Viaje y Maletas',
    ageRange: '4-6',
    gender: 'unisex',
    priceRange: '20-50',
    priceText: '39,99 €',
    rating: 4.8,
    reviewsCount: 6700,
    badge: 'Giro por Inclinación Natural',
    description: 'Gira de forma intuitiva inclinando el peso del cuerpo, lo que aporta una estabilidad asombrosa a los niños pequeños sin riesgo de vuelco. Las ruedas se iluminan al rodar sin necesidad de pilas.',
    pros: ['Freno trasero de respuesta suave', 'Plataforma ancha antideslizante reforzada', 'Manillar plegable con un solo clic'],
    idealFor: 'Paseos diarios al colegio o al parque',
    style: 'kids',
    imageUrl: '/images/products/46-bopster-patinete-1.jpg',
    images: [
      '/images/products/46-bopster-patinete-1.jpg',
      '/images/products/46-bopster-patinete-2.jpg',
      '/images/products/46-bopster-patinete-3.jpg'
    ]
  },
  {
    id: '46-maletin-maquillaje',
    asin: 'B0C3CDWP5T',
    title: 'Maletín de Maquillaje Infantil Lavable con Agua No Tóxico con Luces LED',
    slug: 'maletin-maquillaje-infantil-lavable-agua',
    searchQuery: 'maletin de maquillaje infantil lavable seguro sin quimicos para ninas juego',
    category: '4 a 6 Años',
    subcategory: 'Maquillaje y Skincare Juvenil',
    ageRange: '4-6',
    gender: 'girl',
    priceRange: '20-50',
    priceText: '26,90 €',
    rating: 4.8,
    reviewsCount: 6100,
    badge: '100% Lavable con Agua y Jabón',
    description: 'El sueño de las más pequeñas para jugar a maquillarse como las mayores con total seguridad dermatológica. Sombras de ojos suaves, brillos de labios hipoalergénicos y esmaltes de uñas que se retiran tirando como una pegatina sin necesidad de acetona.',
    pros: ['Certificado cosmético europeo CE de máxima seguridad infantil', 'Se limpia al instante de la piel y la ropa solo con agua', 'Precioso maletín con espejo abatible para llevar a todas partes'],
    idealFor: 'Cumpleaños, fiestas de pijamas y juego simbólico de belleza',
    style: 'kids',
    imageUrl: '/images/products/46-maletin-maquillaje-1.jpg',
    images: [
      '/images/products/46-maletin-maquillaje-1.jpg',
      '/images/products/46-maletin-maquillaje-2.jpg',
      '/images/products/46-maletin-maquillaje-3.jpg'
    ]
  },

  // =========================================================================
  // 4. NIÑOS DE 7 A 9 AÑOS - JUEGOS DE MAGIA BORRÁS, CATAN JUNIOR, CIENCIA, LEGO
  // =========================================================================
  {
    id: '79-magia-borras-100',
    asin: 'B01DTP90Q2',
    title: 'Educa Borrás - Magia Borrás Clásica 100 Trucos con Sombrero, Varita y Manual',
    slug: 'educa-borras-magia-borras-100-trucos',
    searchQuery: 'magia borras clasica 100 trucos educa sombrero varita manual',
    category: '7 a 9 Años',
    subcategory: 'Juegos de Magia e Ilusionismo',
    ageRange: '7-9',
    gender: 'unisex',
    priceRange: '20-50',
    priceText: '24,95 €',
    rating: 4.8,
    reviewsCount: 5200,
    badge: 'El Juego de Magia Más Mítico',
    description: 'La caja de magia que ha iniciado a generaciones de magos. Incluye el sombrero de copa, varita mágica, conejos de esponja, copas secretas, baraja de cartas y manual con 100 ilusiones explicadas paso a paso.',
    pros: ['Aprende a hablar en público y ganar autoconfianza', 'Desarrolla la destreza manual y la agilidad mental', 'Garantía del ilusionismo clásico de Borrás'],
    idealFor: 'Montar espectáculos de magia para la familia en Navidad o cumpleaños',
    style: 'classic',
    imageUrl: '/images/products/79-magia-borras-100-1.jpg',
    images: [
      '/images/products/79-magia-borras-100-1.jpg',
      '/images/products/79-magia-borras-100-2.jpg',
      '/images/products/79-magia-borras-100-3.jpg'
    ]
  },
  {
    id: '79-catan-junior',
    asin: 'B07WC54XF8',
    title: 'Devir - Catan Junior: El Juego de Mesa de Estrategia Pirata',
    slug: 'devir-catan-junior-juego-mesa',
    searchQuery: 'devir catan junior juego de mesa estrategia piratas ninos',
    category: '7 a 9 Años',
    subcategory: 'Juegos de Mesa y Cartas',
    ageRange: '7-9',
    gender: 'unisex',
    priceRange: '20-50',
    priceText: '29,99 €',
    rating: 4.9,
    reviewsCount: 6800,
    badge: 'El Clásico de la Estrategia Infantil',
    description: 'La adaptación perfecta del mítico juego de mesa. Navega por las islas, recolecta madera, piñas y oro, comercia en el mercado y construye fortalezas piratas evitando al Capitán Fantasma.',
    pros: ['Partidas dinámicas de 30 minutos sin frustración', 'Estimula la negociación y la toma de decisiones', 'Tablero reversible según número de jugadores'],
    idealFor: 'Iniciación al mundo de los juegos de mesa modernos',
    style: 'classic',
    imageUrl: '/images/products/79-catan-junior-1.jpg',
    images: [
      '/images/products/79-catan-junior-1.jpg',
      '/images/products/79-catan-junior-2.jpg',
      '/images/products/79-catan-junior-3.jpg'
    ]
  },
  {
    id: '79-dixit',
    asin: 'B092R6L3T3',
    title: 'Asmodee - Dixit: El Juego de Mesa Familiar de Imaginación y Cartas Poéticas',
    slug: 'asmodee-dixit-juego-mesa-familiar',
    searchQuery: 'asmodee dixit juego de mesa cartas ilustradas imaginacion',
    category: '7 a 9 Años',
    subcategory: 'Juegos de Mesa y Cartas',
    ageRange: '7-9',
    gender: 'unisex',
    priceRange: '20-50',
    priceText: '32,95 €',
    rating: 4.9,
    reviewsCount: 9600,
    badge: 'Premio Juego del Año Mundial',
    description: 'Cada turno un jugador es el cuentacuentos y dice una frase, palabra o tarareo sobre su carta enigmática. Los demás eligen de su mano la carta que mejor encaje para despistar a los rivales.',
    pros: ['Ilustraciones de ensueño de altísima calidad artística', 'Sin límites de edad: juegan abuelos, padres y niños a la vez', 'Fomenta la creatividad narrativa y la complicidad'],
    idealFor: 'Reuniones familiares y tardes de juego tranquilas',
    style: 'classic',
    imageUrl: '/images/products/79-dixit-1.jpg',
    images: [
      '/images/products/79-dixit-1.jpg',
      '/images/products/79-dixit-2.jpg',
      '/images/products/79-dixit-3.jpg'
    ]
  },
  {
    id: '79-lego-safari',
    asin: 'B0CFW1BMCX',
    title: 'LEGO Creator 3 en 1 - Animales Salvajes del Safari (31150)',
    slug: 'lego-creator-3-en-1-animales-salvajes-safari-31150',
    searchQuery: 'lego creator 3 en 1 animales salvajes safari 31150 jirafa leon gacela',
    category: '7 a 9 Años',
    subcategory: 'Ciencia, STEM y Robótica',
    ageRange: '7-9',
    gender: 'unisex',
    priceRange: '50-100',
    priceText: '54,99 €',
    rating: 4.9,
    reviewsCount: 3900,
    badge: '3 Modelos Diferentes en la Misma Caja',
    description: 'Permite construir una majestuosa jirafa articulada con flamenco, reconvertirla en una familia de leones con árbol, o en una gacela con cría siguiendo las instrucciones oficiales.',
    pros: ['Piezas móviles y articuladas de gran realismo', 'Instrucciones 3D paso a paso con la app LEGO Builder', 'Desarrolla paciencia y destreza constructiva'],
    idealFor: 'El regalo con el que es imposible equivocarse',
    style: 'kids',
    imageUrl: '/images/products/79-lego-safari-1.jpg',
    images: [
      '/images/products/79-lego-safari-1.jpg',
      '/images/products/79-lego-safari-2.jpg',
      '/images/products/79-lego-safari-3.jpg'
    ]
  },
  {
    id: '79-gravitrax',
    asin: 'B0BSXKTRYZ',
    title: 'Ravensburger - GraviTrax Starter Set Circuito de Canicas Magnético STEM',
    slug: 'ravensburger-gravitrax-starter-set-canicas',
    searchQuery: 'ravensburger gravitrax starter set circuito de canicas magnetico',
    category: '7 a 9 Años',
    subcategory: 'Ciencia, STEM y Robótica',
    ageRange: '7-9',
    gender: 'unisex',
    priceRange: '20-50',
    priceText: '44,99 €',
    rating: 4.9,
    reviewsCount: 16800,
    badge: 'Física y Gravedad en Acción',
    description: 'Diseña circuitos de canicas personalizados utilizando leyes de gravedad, magnetismo y cinética. Cañones magnéticos, curvas parabólicas y saltos libres para horas de ingeniería lúdica.',
    pros: ['Más de 100 componentes modulares expandibles', 'Despierta el pensamiento lógico y la resolución de problemas', 'Adictivo para niños y adultos'],
    idealFor: 'Pequeños constructores y apasionados de los experimentos mecánicos',
    style: 'classic',
    imageUrl: '/images/products/79-gravitrax-1.jpg',
    images: [
      '/images/products/79-gravitrax-1.jpg',
      '/images/products/79-gravitrax-2.jpg',
      '/images/products/79-gravitrax-3.jpg'
    ]
  },

  // =========================================================================
  // 5. PREADOLESCENTES (10 A 12 AÑOS) - VIRUS!, MAGIA AVANZADA, DRONES, CARCASSONNE
  // =========================================================================
  {
    id: '1012-virus',
    asin: 'B07QRB9NWP',
    title: 'Tranjis Games - Virus! El Juego de Cartas de Estrategia Más Vendido de España',
    slug: 'tranjis-games-virus-juego-cartas',
    searchQuery: 'tranjis games virus juego de cartas original espanol',
    category: '10 a 12 Años',
    subcategory: 'Juegos de Mesa y Cartas',
    ageRange: '10-12',
    gender: 'unisex',
    priceRange: '<20',
    priceText: '14,95 €',
    rating: 4.9,
    reviewsCount: 22800,
    badge: 'Superventas Absoluto en España',
    description: 'Infecta los órganos de tus rivales con virus mientras proteges tu propio cuerpo con vacunas e inmunizaciones. Partidas veloces de 15 minutos llenas de risas, revanchas y giros inesperados.',
    pros: ['Formato de bolsillo ideal para llevar al recreo o excursiones', 'Se explica en un minuto', 'Piques divertidísimos entre amigos y familia'],
    idealFor: 'Reuniones de amigos de 10 a 12 años',
    style: 'classic',
    imageUrl: '/images/products/1012-virus-1.jpg',
    images: [
      '/images/products/1012-virus-1.jpg',
      '/images/products/1012-virus-2.jpg',
      '/images/products/1012-virus-3.jpg'
    ]
  },
  {
    id: '1012-magia-borras-150',
    asin: 'B0716KVN4F',
    title: 'Educa Borrás - Magia Borrás 150 Trucos con App Móvil y Vídeos Tutoriales',
    slug: 'educa-borras-magia-borras-150-trucos-app',
    searchQuery: 'magia borras 150 trucos con app tutoriales movil educa',
    category: '10 a 12 Años',
    subcategory: 'Juegos de Magia e Ilusionismo',
    ageRange: '10-12',
    gender: 'unisex',
    priceRange: '20-50',
    priceText: '29,95 €',
    rating: 4.8,
    reviewsCount: 3800,
    badge: 'Ilusionismo Moderno con App',
    description: 'Combina los trucos clásicos de cartas, cuerdas y dados con efectos mágicos que interactúan con la pantalla del smartphone y vídeos explicativos secretos grabados por magos profesionales.',
    pros: ['Vídeos tutoriales exclusivos paso a paso en la app', 'Trucos visuales de nivel avanzado fáciles de aprender', 'Módulo de ilusionismo digital contemporáneo'],
    idealFor: 'Preadolescentes que quieren dominar trucos de cartas y magia de cerca',
    style: 'classic',
    imageUrl: '/images/products/1012-magia-borras-150-1.jpg',
    images: [
      '/images/products/1012-magia-borras-150-1.jpg',
      '/images/products/1012-magia-borras-150-2.jpg',
      '/images/products/1012-magia-borras-150-3.jpg'
    ]
  },
  {
    id: '1012-carcassonne',
    asin: 'B00W5LCL8G',
    title: 'Devir - Carcassonne: Juego de Mesa Medieval de Estrategia y Losetas',
    slug: 'devir-carcassonne-juego-mesa',
    searchQuery: 'devir carcassonne juego de mesa medieval losetas estrategia',
    category: '10 a 12 Años',
    subcategory: 'Juegos de Mesa y Cartas',
    ageRange: '10-12',
    gender: 'unisex',
    priceRange: '20-50',
    priceText: '26,95 €',
    rating: 4.9,
    reviewsCount: 14200,
    badge: 'Premio Mundial Spiel des Jahres',
    description: 'Construye caminos, ciudades fortificadas y monasterios loseta a loseta, colocando a tus caballeros, bandidos y monjes para conseguir la máxima puntuación en la Francia medieval.',
    pros: ['Cada partida genera un mapa completamente nuevo e irrepetible', 'Estrategia profunda pero con reglas muy sencillas', 'Incluye las mini expansiones El Río y El Abad'],
    idealFor: 'Preadolescentes amantes de la estrategia inteligente',
    style: 'classic',
    imageUrl: '/images/products/1012-carcassonne-1.jpg',
    images: [
      '/images/products/1012-carcassonne-1.jpg',
      '/images/products/1012-carcassonne-2.jpg',
      '/images/products/1012-carcassonne-3.jpg'
    ]
  },
  {
    id: '1012-dron-potensic',
    asin: 'B0DK96YNS1',
    title: 'Potensic A20 - Mini Dron Anticolisión con Despegue Automático y 3 Baterías',
    slug: 'potensic-a20-mini-dron-iniciacion-ninos',
    searchQuery: 'potensic a20 mini dron para ninos facil manejo 3 baterias',
    category: '10 a 12 Años',
    subcategory: 'Tecnología y Gadgets',
    ageRange: '10-12',
    gender: 'unisex',
    priceRange: '20-50',
    priceText: '39,99 €',
    rating: 4.7,
    reviewsCount: 14200,
    badge: 'El Dron de Iniciación Más Seguro',
    description: 'Con sensor de mantenimiento de altura que lo mantiene flotando quieto sin que se caiga si sueltas los mandos. Hélices protegidas en 360 grados para volar dentro de casa sin peligro.',
    pros: ['Incluye 3 baterías modulares para hasta 21 minutos de vuelo', 'Modo sin cabeza intuitivo para principiantes', 'Parada de emergencia y giros 3D con un botón'],
    idealFor: 'Aprender a pilotar drones en interiores y jardines',
    style: 'tech',
    imageUrl: '/images/products/1012-dron-potensic-1.jpg',
    images: [
      '/images/products/1012-dron-potensic-1.jpg',
      '/images/products/1012-dron-potensic-2.jpg',
      '/images/products/1012-dron-potensic-3.jpg'
    ]
  },

  // =========================================================================
  // 6. ADOLESCENTES (13 A 15 AÑOS) - AUDIO ANC, SKINCARE CERAVE, CATAN CLÁSICO, VIAJES
  // =========================================================================
  {
    id: '1315-anker-q30',
    asin: 'B08HMWZBXC',
    title: 'Anker Soundcore Life Q30 - Auriculares Inalámbricos con Cancelación Activa de Ruido Híbrida',
    slug: 'anker-soundcore-life-q30-auriculares-anc',
    searchQuery: 'anker soundcore life q30 auriculares bluetooth cancelacion activa ruido',
    category: '13 a 15 Años',
    subcategory: 'Tecnología y Gadgets',
    ageRange: '13-15',
    gender: 'unisex',
    priceRange: '50-100',
    priceText: '69,99 €',
    rating: 4.8,
    reviewsCount: 38000,
    badge: 'Relación Calidad-Precio Insuperable',
    description: 'Bloquea hasta el 95% del ruido del entorno con 3 modos de cancelación de ruido acústico. Certificación Hi-Res Audio con almohadillas viscoelásticas ultra cómodas y batería de 40 horas con ANC activo.',
    pros: ['Batería de hasta 60 horas en modo normal', 'Ecualizador personalizado a través de la app Soundcore', 'Carga rápida: 5 minutos dan 4 horas de música'],
    idealFor: 'Estudiar sin distracciones, viajes y escuchar música con nitidez',
    style: 'tech',
    imageUrl: '/images/products/1315-anker-q30-1.jpg',
    images: [
      '/images/products/1315-anker-q30-1.jpg',
      '/images/products/1315-anker-q30-2.jpg',
      '/images/products/1315-anker-q30-3.jpg'
    ]
  },
  {
    id: '1315-cerave-limpiador',
    asin: 'B0B7RQ46LD',
    title: 'CeraVe - Gel Limpiador Control Imperfecciones con Ácido Salicílico 236ml',
    slug: 'cerave-gel-limpiador-control-imperfecciones-236ml',
    searchQuery: 'cerave limpiador espumoso control imperfecciones acido salicilico 236ml',
    category: '13 a 15 Años',
    subcategory: 'Maquillaje y Skincare Juvenil',
    ageRange: '13-15',
    gender: 'unisex',
    priceRange: '<20',
    priceText: '12,95 €',
    rating: 4.8,
    reviewsCount: 24500,
    badge: 'Recomendado por Dermatólogos',
    description: 'El limpiador facial de referencia para adolescentes. Formulado con un 2% de ácido salicílico para eliminar el exceso de grasa y desobstruir poros sin alterar la barrera cutánea gracias a sus 3 ceramidas esenciales.',
    pros: ['Sin perfume, no comedogénico y respetuoso con pieles sensibles', 'Reduce granitos y puntos negros en pocos días', 'Textura gel que hace una espuma agradable y purificante'],
    idealFor: 'Preadolescentes y jóvenes que empiezan a cuidar su piel',
    style: 'tech',
    imageUrl: '/images/products/1315-cerave-limpiador-1.jpg',
    images: [
      '/images/products/1315-cerave-limpiador-1.jpg',
      '/images/products/1315-cerave-limpiador-2.jpg',
      '/images/products/1315-cerave-limpiador-3.jpg'
    ]
  },
  {
    id: '1315-catan-clasico',
    asin: 'B006CZ0LGA',
    title: 'Devir - Catan: El Gran Juego de Mesa Clásico de Negociación y Comercio',
    slug: 'devir-catan-clasico-juego-mesa',
    searchQuery: 'devir catan juego de mesa clasico colonos de catan espanol',
    category: '13 a 15 Años',
    subcategory: 'Juegos de Mesa y Cartas',
    ageRange: '13-15',
    gender: 'unisex',
    priceRange: '20-50',
    priceText: '42,95 €',
    rating: 4.9,
    reviewsCount: 18900,
    badge: 'El Juego de Mesa Más Famoso del Siglo XXI',
    description: 'Coloniza la isla de Catan negociando ovejas, trigo, arcilla y mineral con tus contrincantes para construir carreteras y ciudades. Un juego legendario donde el trueque y la diplomacia ganan partidas.',
    pros: ['Ideal para jugar entre 3 y 4 jugadores', 'Fomenta el cálculo probabilístico y la negociación', 'Mundo con múltiples expansiones disponibles'],
    idealFor: 'Tardes enteras con amigos y veladas familiares inolvidables',
    style: 'classic',
    imageUrl: '/images/products/1315-catan-clasico-1.jpg',
    images: [
      '/images/products/1315-catan-clasico-1.jpg',
      '/images/products/1315-catan-clasico-2.jpg',
      '/images/products/1315-catan-clasico-3.jpg'
    ]
  },
  {
    id: '1315-neceser-colgante',
    asin: 'B0FHG7RBLF',
    title: 'Neceser de Viaje Colgante Plegable Impermeable con Gancho Giratorio 360°',
    slug: 'neceser-viaje-colgante-impermeable-campamentos',
    searchQuery: 'neceser de viaje colgante organizador bano plegable con gancho impermeable',
    category: '13 a 15 Años',
    subcategory: 'Kits de Viaje y Maletas',
    ageRange: '13-15',
    gender: 'unisex',
    priceRange: '<20',
    priceText: '18,50 €',
    rating: 4.9,
    reviewsCount: 7600,
    badge: 'El Favorito de Campamentos y Viajes',
    description: 'Se despliega en la pared del baño o la puerta del armario permitiendo ver y acceder a geles, champú, cepillo de dientes y lentillas sin ocupar espacio en el lavabo ni desordenar la maleta.',
    pros: ['Tejido hidrófugo de secado rápido que evita fugas de líquidos', 'Bolsillos transparentes de PVC para pasar controles de seguridad', 'Cremalleras dobles reforzadas'],
    idealFor: 'Campamentos de verano, excursiones del colegio y viajes con amigos',
    style: 'tech',
    imageUrl: '/images/products/1315-neceser-colgante-1.jpg',
    images: [
      '/images/products/1315-neceser-colgante-1.jpg',
      '/images/products/1315-neceser-colgante-2.jpg',
      '/images/products/1315-neceser-colgante-3.jpg'
    ]
  },

  // =========================================================================
  // 7. JÓVENES (16 A 18 AÑOS) - GAMER PS5, EMO / DARK AESTHETIC CON VELAS, VR, PERFUMES
  // =========================================================================
  {
    id: '1618-spiderman-2',
    asin: 'B0C7X5Q6R1',
    title: 'Sony PlayStation - Marvel\'s Spider-Man 2 Edición Estándar PS5 en Español',
    slug: 'marvels-spider-man-2-playstation-5-fisico',
    searchQuery: 'marvel spider man 2 playstation 5 espanol fisico',
    category: '16 a 18 Años',
    subcategory: 'Videojuegos y Accesorios PS5',
    ageRange: '16-18',
    gender: 'unisex',
    priceRange: '50-100',
    priceText: '59,99 €',
    rating: 4.9,
    reviewsCount: 11200,
    badge: 'Imprescindible de PlayStation 5',
    description: 'Peter Parker y Miles Morales se enfrentan al reto definitivo contra Venom y Kraven con balanceo a toda velocidad por Nueva York y aprovechamiento total de los gatillos adaptativos del mando DualSense.',
    pros: ['Carga instantánea gracias al SSD de PS5', 'Gatillos adaptativos con resistencia al lanzar telarañas', 'Modo gráfico a 60 FPS ultra fluido'],
    idealFor: 'Todo poseedor de una consola PlayStation 5',
    style: 'gamer',
    imageUrl: '/images/products/1618-spiderman-2-1.jpg',
    images: [
      '/images/products/1618-spiderman-2-1.jpg',
      '/images/products/1618-spiderman-2-2.jpg'
    ]
  },
  {
    id: '1618-fc-25',
    asin: 'B0D98BGQRW',
    title: 'Electronic Arts - EA SPORTS FC 25 Edición Estándar para PlayStation 5',
    slug: 'ea-sports-fc-25-playstation-5-fisico',
    searchQuery: 'ea sports fc 25 playstation 5 espanol fisico futbol',
    category: '16 a 18 Años',
    subcategory: 'Videojuegos y Accesorios PS5',
    ageRange: '16-18',
    gender: 'unisex',
    priceRange: '50-100',
    priceText: '59,99 €',
    rating: 4.7,
    reviewsCount: 12800,
    badge: 'El Rey de los Piques Entre Amigos',
    description: 'El simulador de fútbol definitivo con el nuevo sistema táctico FC IQ, licencias oficiales actualizadas de las mejores ligas del mundo y el adictivo modo Rush 5v5 para jugar con colegas.',
    pros: ['Física de balón y animaciones hiperrealistas con HyperMotionV', 'Partidos multijugador frenéticos en el salón o por internet', 'Modo Carrera y Ultimate Team renovados'],
    idealFor: 'Jóvenes aficionados al fútbol y las competiciones',
    style: 'gamer',
    imageUrl: '/images/products/1618-fc-25-1.jpg',
    images: [
      '/images/products/1618-fc-25-1.jpg',
      '/images/products/1618-fc-25-2.jpg',
      '/images/products/1618-fc-25-3.jpg'
    ]
  },
  {
    id: '1618-elden-ring',
    asin: 'B09QQT2NWG',
    title: 'Bandai Namco - Elden Ring Edición Shadow of the Erdtree para PS5',
    slug: 'bandai-namco-elden-ring-shadow-erdtree-ps5',
    searchQuery: 'elden ring shadow of the erdtree playstation 5 fisico espanol',
    category: '16 a 18 Años',
    subcategory: 'Videojuegos y Accesorios PS5',
    ageRange: '16-18',
    gender: 'unisex',
    priceRange: '50-100',
    priceText: '69,99 €',
    rating: 4.9,
    reviewsCount: 16400,
    badge: 'Juego del Año GOTY Oficial',
    description: 'La cumbre de la fantasía oscura creada por Hidetaka Miyazaki y George R.R. Martin. Un colosal mundo abierto repleto de secretos, combates épicos contra jefes y estética sobrecogedora.',
    pros: ['Más de 150 horas de aventura y desafío', 'Incluye la aclamada expansión completa', 'Banda sonora orquestal sublime'],
    idealFor: 'Jugadores apasionados que buscan una experiencia profunda y madura',
    style: 'gamer',
    imageUrl: '/images/products/1618-elden-ring-1.jpg',
    images: [
      '/images/products/1618-elden-ring-1.jpg',
      '/images/products/1618-elden-ring-2.jpg',
      '/images/products/1618-elden-ring-3.jpg'
    ]
  },
  {
    id: '1618-dualsense-edge',
    asin: 'B0DSPX3R62',
    title: 'Sony PlayStation - Mando Inalámbrico DualSense Edge Personalizable para PS5 y PC',
    slug: 'sony-playstation-dualsense-edge-ps5',
    searchQuery: 'sony playstation dualsense edge mando inalambrico ps5',
    category: '16 a 18 Años',
    subcategory: 'Videojuegos y Accesorios PS5',
    ageRange: '16-18',
    gender: 'unisex',
    priceRange: '>100',
    priceText: '219,00 €',
    rating: 4.8,
    reviewsCount: 4200,
    badge: 'Mando Pro de Competición Oficial',
    description: 'El mando de élite definitivo de Sony para eSports. Palancas traseras mapeables, topes de gatillo ajustables para disparo instantáneo y módulos de stick reemplazables con estuche rígido prémium.',
    pros: ['Módulos de stick reemplazables para evitar el desgaste por drift', 'Perfiles de botones guardables al instante', 'Sensaciones hápticas inigualables'],
    idealFor: 'El regalo definitivo para un gamer exigente de 16 a 18 años',
    style: 'gamer',
    imageUrl: '/images/products/1618-dualsense-edge-1.jpg',
    images: [
      '/images/products/1618-dualsense-edge-1.jpg',
      '/images/products/1618-dualsense-edge-2.jpg',
      '/images/products/1618-dualsense-edge-3.jpg'
    ]
  },
  {
    id: '1618-vela-woodwick',
    asin: 'B07DHNYP2Z',
    title: 'WoodWick - Vela Aromática Grande con Mecha de Madera Crepitante Fireside en Vaso Negro',
    slug: 'woodwick-vela-aromatica-mecha-madera-fireside',
    searchQuery: 'woodwick vela aromatica mecha de madera vaso cristal fireside cera',
    category: '16 a 18 Años',
    subcategory: 'Estilo Personal, Cuadernos de Piel y Fragancias',
    ageRange: '16-18',
    gender: 'unisex',
    priceRange: '20-50',
    priceText: '24,90 €',
    rating: 4.8,
    reviewsCount: 5400,
    badge: 'Sonido Real de Chimenea Crujiente',
    description: 'La vela favorita para crear una atmósfera introspectiva y relajante. Su mecha de madera natural patentada Pluswick emite un sonido crujiente envolvente mientras difunde notas de ámbar cálido, maderas y humo noble.',
    pros: ['Mecha de madera que cruje como fuego real', 'Cera de soja premium con combustión limpia', 'Elegante vaso de cristal en forma de reloj de arena con tapa de madera'],
    idealFor: 'Crear un santuario estético y cálido en la habitación juvenil',
    style: 'emo',
    imageUrl: '/images/products/1618-vela-woodwick-1.jpg',
    images: [
      '/images/products/1618-vela-woodwick-1.jpg',
      '/images/products/1618-vela-woodwick-2.jpg',
      '/images/products/1618-vela-woodwick-3.jpg'
    ]
  },
  {
    id: '1618-diario-cuero',
    asin: 'B08TCGQ3RG',
    title: 'Moonster - Diario de Cuero Vintage Relieve Árbol de la Vida con Páginas Pergamino',
    slug: 'moonster-diario-cuero-vintage-arbol-vida',
    searchQuery: 'moonster diario de cuero vintage hojas envejecidas cuaderno artesanal',
    category: '16 a 18 Años',
    subcategory: 'Estilo Personal, Cuadernos de Piel y Fragancias',
    ageRange: '16-18',
    gender: 'unisex',
    priceRange: '20-50',
    priceText: '24,95 €',
    rating: 4.9,
    reviewsCount: 6800,
    badge: 'Cuero Auténtico Curtido a Mano',
    description: 'Páginas gruesas de papel de algodón reciclado envejecido a mano que no traspasa la tinta de estilográfica, acuarelas ni rotuladores. Portada de auténtico cuero con relieve simbólico y cinta de cierre rústica.',
    pros: ['240 páginas de papel pergamino artesanal', 'Sin químicos ni blanqueadores', 'Tacto envejecido exclusivo y duradero'],
    idealFor: 'Escribir poesía, pensamientos, dibujos oscuros o letras de canciones',
    style: 'emo',
    imageUrl: '/images/products/1618-diario-cuero-1.jpg',
    images: [
      '/images/products/1618-diario-cuero-1.jpg',
      '/images/products/1618-diario-cuero-2.jpg',
      '/images/products/1618-diario-cuero-3.jpg'
    ]
  },
  {
    id: '1618-ck-one',
    asin: 'B00S2WDIGG',
    title: 'Calvin Klein CK One - Eau de Toilette 100ml Unisex Original',
    slug: 'calvin-klein-ck-one-eau-de-toilette-100ml',
    searchQuery: 'calvin klein ck one 100ml original eau de toilette perfume unisex',
    category: '16 a 18 Años',
    subcategory: 'Perfumería y Fragancias',
    ageRange: '16-18',
    gender: 'unisex',
    priceRange: '20-50',
    priceText: '29,95 €',
    rating: 4.8,
    reviewsCount: 28400,
    badge: 'El Icono de la Perfumería Juvenil',
    description: 'Una fragancia limpia, contemporánea y versátil con notas de té verde, papaya, bergamota y fondo cálido de ámbar y almizcle que nunca pasa de moda. Perfecta para chicos y chicas.',
    pros: ['Aroma fresco y no empalagoso ideal para clase o salidas', 'Frasco icónico de cristal esmerilado minimalista', 'Proyección duradera y equilibrada'],
    idealFor: 'Jóvenes de 16 a 18 años que buscan una seña olfativa moderna',
    style: 'classic',
    imageUrl: '/images/products/1618-ck-one-1.jpg',
    images: [
      '/images/products/1618-ck-one-1.jpg',
      '/images/products/1618-ck-one-2.jpg',
      '/images/products/1618-ck-one-3.jpg'
    ]
  },
  {
    id: '1618-meta-quest-3s',
    asin: 'B09MJRPRR4',
    title: 'Meta Quest 3S 128GB - Gafas de Realidad Mixta y Realidad Virtual Todo en Uno',
    slug: 'meta-quest-3s-gafas-realidad-mixta',
    searchQuery: 'meta quest 3s 128gb gafas realidad virtual realidad mixta',
    category: '16 a 18 Años',
    subcategory: 'Tecnología y Gadgets',
    ageRange: '16-18',
    gender: 'unisex',
    priceRange: '>100',
    priceText: '329,99 €',
    rating: 4.9,
    reviewsCount: 5800,
    badge: 'La Gran Revolución VR / Mixta',
    description: 'Sumérgete en tus videojuegos favoritos sin cables ni ordenadores necesarios. Realidad mixta a todo color que fusiona tu habitación con mundos virtuales alucinantes.',
    pros: ['Resolución nítida con procesador Snapdragon XR2 de última generación', 'Mandos Touch Plus con respuesta háptica realista', 'Catálogo con miles de juegos como Beat Saber y Batman Arkham'],
    idealFor: 'Regalo mayúsculo de 18 cumpleaños o graduación',
    style: 'tech',
    imageUrl: '/images/products/1618-meta-quest-3s-1.jpg',
    images: [
      '/images/products/1618-meta-quest-3s-1.jpg',
      '/images/products/1618-meta-quest-3s-2.jpg',
      '/images/products/1618-meta-quest-3s-3.jpg'
    ]
  },
  {
    id: '1618-jbl-flip-6',
    asin: 'B0DXKNBQS6',
    title: 'JBL Flip 6 - Altavoz Bluetooth Portátil Resistente al Agua y Polvo IP67',
    slug: 'jbl-flip-6-altavoz-bluetooth-portatil',
    searchQuery: 'jbl flip 6 altavoz bluetooth portatil graves profundos ip67',
    category: '16 a 18 Años',
    subcategory: 'Tecnología y Gadgets',
    ageRange: '16-18',
    gender: 'unisex',
    priceRange: '50-100',
    priceText: '99,99 €',
    rating: 4.8,
    reviewsCount: 24800,
    badge: 'Graves Contundentes JBL Pro Sound',
    description: 'El altavoz portátil de referencia con sistema de altavoces de 2 vías (woofer de pista y tweeter separado) que entrega agudos nítidos y graves que retumban con 12 horas de autonomía.',
    pros: ['Resistencia total al agua y polvo IP67 para piscina y playa', 'Función PartyBoost para emparejar varios altavoces', 'Carga rápida mediante USB-C'],
    idealFor: 'Reuniones con amigos, playa, salidas al aire libre y fiestas',
    style: 'tech',
    imageUrl: '/images/products/1618-jbl-flip-6-1.jpg',
    images: [
      '/images/products/1618-jbl-flip-6-1.jpg',
      '/images/products/1618-jbl-flip-6-2.jpg',
      '/images/products/1618-jbl-flip-6-3.jpg'
    ]
  },
  {
    id: '1618-govee-neon',
    asin: 'B0BXW6P739',
    title: 'Govee - Tira Neón LED RGBIC Cuerda Flexible de 3 Metros con Sincronización Musical',
    slug: 'govee-tira-neon-led-rgbic-cuerda-flexible',
    searchQuery: 'govee tira neon led rgbic cuerda flexible habitacion wifi alexa',
    category: '16 a 18 Años',
    subcategory: 'Setup Gamer y Periféricos',
    ageRange: '16-18',
    gender: 'unisex',
    priceRange: '20-50',
    priceText: '39,99 €',
    rating: 4.8,
    reviewsCount: 12400,
    badge: 'El Secreto de los Setups Virales',
    description: 'Cuerda de neón de silicona que difumina una luz continua y homogénea sin puntos visibles. Se dobla fácilmente para crear siluetas o palabras en la pared con sincronización al ritmo de la música.',
    pros: ['Tecnología RGBIC que muestra múltiples colores a la vez', 'Micrófono integrado para bailar al ritmo de la música', 'Control por smartphone, Alexa y Google Home'],
    idealFor: 'Personalizar el santuario de cualquier habitación juvenil',
    style: 'gamer',
    imageUrl: '/images/products/1618-govee-neon-1.jpg',
    images: [
      '/images/products/1618-govee-neon-1.jpg',
      '/images/products/1618-govee-neon-2.jpg',
      '/images/products/1618-govee-neon-3.jpg'
    ]
  },
  {
    id: '13-lego-duplo',
    asin: 'B07W4KVGJM',
    title: 'LEGO DUPLO Classic - Caja de Ladrillos con Ruedas, Figuras y Piezas Grandes (10913)',
    slug: 'lego-duplo-classic-caja-ladrillos-10913',
    searchQuery: 'lego duplo classic caja de ladrillos 10913',
    category: '1 a 3 Años',
    subcategory: 'LEGO DUPLO y Construcción',
    ageRange: '1-3',
    gender: 'unisex',
    priceRange: '20-50',
    priceText: '29,99 €',
    rating: 4.9,
    reviewsCount: 15800,
    badge: 'El Primer LEGO de Todo Niño',
    description: 'Caja de 65 piezas grandes de construcción segura diseñadas para manos pequeñas. Incluye coche con ruedas funcionales, figuras de niño y niña, perro mascota y ladrillos numerados del 1 al 3.',
    pros: ['Piezas grandes y seguras imposibles de tragar', 'Caja organizadora de plástico resistente para guardar todo en segundos', 'Estimula la motricidad fina, el reconocimiento espacial y los números'],
    idealFor: 'Desarrollo psicomotriz y juego creativo libre a partir de 18 meses',
    style: 'kids',
    imageUrl: '/images/products/13-lego-duplo-1.jpg',
    images: [
      '/images/products/13-lego-duplo-1.jpg',
      '/images/products/13-lego-duplo-2.jpg',
      '/images/products/13-lego-duplo-3.jpg'
    ]
  },
  {
    id: '46-carrera-mario',
    asin: 'B07PQGP8B7',
    title: 'Carrera First - Circuito de Carreras Nintendo Mario Kart con 2 Coches y Mandos Ergonómicos',
    slug: 'carrera-first-circuito-carreras-mario-kart',
    searchQuery: 'carrera first nintendo mario kart circuito coches scalextric scalestric pista carreras infantil',
    category: '4 a 6 Años',
    subcategory: 'Circuitos de Coches Infantiles',
    ageRange: '4-6',
    gender: 'unisex',
    priceRange: '20-50',
    priceText: '34,99 €',
    rating: 4.8,
    reviewsCount: 8200,
    badge: 'El Circuito Favorito de Mario y Yoshi',
    description: 'Circuito de carreras a escala 1:50 ideal para los más pequeños a partir de 3 años. Funciona a pilas con mandos regulados para manos infantiles y elementos interactivos en pista.',
    pros: ['Mandos adaptados a manos infantiles con velocidad controlada', 'Incluye los coches oficiales de Mario y Yoshi', 'Montaje rápido tipo clic fácil de guardar'],
    idealFor: 'Primeras carreras emocionantes en familia sin complicaciones',
    style: 'kids',
    imageUrl: '/images/products/46-carrera-mario-1.jpg',
    images: [
      '/images/products/46-carrera-mario-1.jpg',
      '/images/products/46-carrera-mario-2.jpg',
      '/images/products/46-carrera-mario-3.jpg'
    ]
  },
  {
    id: '46-pikachu-peluche',
    asin: 'B0B2X57MHG',
    title: 'Pokémon - Peluche Interactivo de Pikachu con Luces en las Mejillas y Más de 20 Sonidos',
    slug: 'pokemon-peluche-interactivo-pikachu-luces-sonidos',
    searchQuery: 'pokemon peluche interactivo pikachu luces sonidos bizak',
    category: '4 a 6 Años',
    subcategory: 'Peluches Interactivos',
    ageRange: '4-6',
    gender: 'unisex',
    priceRange: '20-50',
    priceText: '32,95 €',
    rating: 4.8,
    reviewsCount: 6500,
    badge: 'El Peluche Más Buscado por Fans de Pokémon',
    description: 'Peluche oficial de Pikachu de tacto ultrasuave. Al acariciar su cabeza o barriga mueve sus orejitas, sus mejillas rojas se iluminan con electricidad y emite las voces y sonidos originales de Pikachu.',
    pros: ['Más de 20 reacciones y sonidos auténticos de la serie', 'Mejillas con luz LED parpadeante como en el anime', 'Material hipoalergénico de primera calidad'],
    idealFor: 'Niños y niñas que adoran Pokémon y buscan un amigo de peluche',
    style: 'kids',
    imageUrl: '/images/products/46-pikachu-peluche-1.jpg',
    images: [
      '/images/products/46-pikachu-peluche-1.jpg',
      '/images/products/46-pikachu-peluche-2.jpg',
      '/images/products/46-pikachu-peluche-3.jpg'
    ]
  },
  {
    id: '79-scalextric-compact',
    asin: 'B0F5Q6N2YM',
    title: 'Scalextric Compact - Circuito Grand Challenge Escala 1:43 con 2 Coches GT y Mandos Turbo',
    slug: 'scalextric-compact-circuito-grand-challenge',
    searchQuery: 'scalextric scalestric escalextric escalestric compact grand challenge pista coches circuito carreras',
    category: '7 a 9 Años',
    subcategory: 'Scalextric y Pistas de Carreras',
    ageRange: '7-9',
    gender: 'unisex',
    priceRange: '50-100',
    priceText: '69,99 €',
    rating: 4.8,
    reviewsCount: 3900,
    badge: 'La Experiencia Clásica de Velocidad',
    description: 'Auténtico circuito Scalextric Compact a escala 1:43 con más de 4 metros de recorrido, curvas peraltadas, puente y dos mandos inalámbricos con función Turbo para adelantamientos épicos.',
    pros: ['Mandos ergonómicos con botón Turbo de máxima aceleración', 'Espacio optimizado que cabe en cualquier salón o dormitorio', 'Coches resistentes con imán de agarre a la pista'],
    idealFor: 'Piques de carreras entre padres, hijos y amigos',
    style: 'classic',
    imageUrl: '/images/products/79-scalextric-compact-1.jpg',
    images: [
      '/images/products/79-scalextric-compact-1.jpg',
      '/images/products/79-scalextric-compact-2.jpg',
      '/images/products/79-scalextric-compact-3.jpg'
    ]
  },
  {
    id: '79-coche-rc-exost',
    asin: 'B07GVLZCSW',
    title: 'Silverlit Exost 360 Cross - Coche Teledirigido Acrobático 4x4 Antigolpes con Giros 360°',
    slug: 'silverlit-exost-360-cross-coche-teledirigido-acrobatico',
    searchQuery: 'silverlit exost 360 cross coche teledirigido acrobatico',
    category: '7 a 9 Años',
    subcategory: 'Coches RC y Teledirigidos',
    ageRange: '7-9',
    gender: 'unisex',
    priceRange: '20-50',
    priceText: '26,99 €',
    rating: 4.7,
    reviewsCount: 11400,
    badge: 'Indestructible en Todo Terreno',
    description: 'El coche RC acrobático más resistente: rueda por ambos lados, realiza piruetas de 360 grados y supera cualquier obstáculo gracias a sus grandes neumáticos todoterreno ultra absorbentes.',
    pros: ['Diseño reversible de doble cara: si vuelca, sigue corriendo', 'Velocidad de hasta 12 km/h con alcance de 25 metros', 'Soporta caídas por escaleras, tierra y asfalto'],
    idealFor: 'Diversión todoterreno sin miedo a romper el juguete',
    style: 'classic',
    imageUrl: '/images/products/79-coche-rc-exost-1.jpg',
    images: [
      '/images/products/79-coche-rc-exost-1.jpg',
      '/images/products/79-coche-rc-exost-2.jpg',
      '/images/products/79-coche-rc-exost-3.jpg'
    ]
  },
];

export const CATEGORIES_LIST = [
  'Todas las Categorías',
  'Tartas de Pañales',
  'Cochecitos y Mobiliario de Bebé',
  'Bañeras e Higiene del Bebé',
  'Juegos de Magia e Ilusionismo',
  'Juegos de Mesa y Cartas',
  'Droguería y Cuidado Infantil',
  'Perfumería y Fragancias',
  'Kits de Viaje y Maletas',
  'Maquillaje y Skincare Juvenil',
  'Método Montessori y Madera',
  'Videojuegos y Accesorios PS5',
  'Setup Gamer y Periféricos',
  'Estilo Personal, Cuadernos de Piel y Fragancias',
  'Tecnología y Gadgets',
  'Ciencia, STEM y Robótica'
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
    'Fiestas y Revelación de Género',
    'Peluches y Figuras',
    'LEGO y Construcción',
    'Scalextric y Circuitos de Coches',
    'Coches RC y Teledirigidos',
    'Juegos de Mesa y Cartas',
    'Bicis y Patinetes con Ruedas',
    'Juegos de Magia Borrás',
    'Esenciales y Cuidado de Bebé',
    'Videojuegos y Setup Gamer',
    'Tecnología y Gadgets'
  ],
  '0-12m': [
    'Fiestas y Revelación de Género',
    'Cochecitos y Mobiliario de Bebé',
    'Cunas de Colecho y Descanso',
    'Bañeras e Higiene del Bebé',
    'Tartas de Pañales',
    'Juguetes y Peluches de Bebé',
    'Droguería y Cuidado Infantil'
  ],
  '1-3': [
    'Método Montessori y Madera',
    'LEGO DUPLO y Construcción',
    'Triciclos y Bicis Infantiles',
    'Cocina Infantil y Juegos de Imitación',
    'Bloques Blandos y Arena Mágica'
  ],
  '4-6': [
    'Circuitos de Coches Infantiles',
    'Juegos de Mesa Infantiles',
    'Patinetes Infantiles con Ruedas LED',
    'Peluches Interactivos',
    'Maletas Infantiles Correpasillos'
  ],
  '7-9': [
    'Scalextric y Pistas de Carreras',
    'Coches RC y Teledirigidos',
    'LEGO Creator y Construcción',
    'Juegos de Magia Borrás',
    'Juegos de Mesa y Estrategia Familiar',
    'Circuitos GraviTrax y STEM'
  ],
  '10-12': [
    'Juegos de Cartas Competitivos (Virus!)',
    'Minidrones RC Anticolisión',
    'Magia Borrás Avanzada con App',
    'Juegos de Mesa Medievales (Carcassonne)'
  ],
  '13-15': [
    'Auriculares Inalámbricos ANC',
    'Juegos de Mesa Clásicos (Catan)',
    'Cuidado Facial y Skincare',
    'Kits de Viaje y Organizadores'
  ],
  '16-18': [
    'Videojuegos y Accesorios PS5',
    'Setup Gamer y Periféricos',
    'Tecnología y Gadgets (VR, Audio)',
    'Estilo Personal, Cuadernos de Piel y Fragancias'
  ]
};
