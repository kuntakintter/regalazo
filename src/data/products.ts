// ============================================================================
// CATÁLOGO COMPLETO DE PRODUCTOS VERIFICADOS - REGALAZO 2026
// Afiliación oficial con Amazon España (tag: vapegadgets22-21)
// ============================================================================

import { AGE_CATEGORIES, AGE_SUBCATEGORIES_MAP, PRICE_FILTERS, GENERAL_CATEGORY_MAPPING, AgeCategoryMeta } from './categories';

export const AMAZON_AFFILIATE_TAG = 'vapegadgets22-21';

export { AGE_CATEGORIES, AGE_SUBCATEGORIES_MAP, PRICE_FILTERS, GENERAL_CATEGORY_MAPPING };
export type { AgeCategoryMeta };

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

export const PRODUCTS: Product[] = [
  {
    "id": "012-cochecito-chicco-london",
    "asin": "B0DLWK3LKH",
    "title": "Chicco London Up - Silla de Paseo Ligera Plegable Tipo Paraguas Reclinable 4 Posiciones",
    "slug": "chicco-london-silla-paseo-ligera-plegable",
    "searchQuery": "chicco london silla paseo ligera compacta plegable paraguas",
    "category": "Recién Nacidos",
    "subcategory": "Cochecitos y Mobiliario de Bebé",
    "ageRange": "0-12m",
    "gender": "unisex",
    "priceRange": "50-100",
    "priceText": "89,90 €",
    "rating": 4.8,
    "reviewsCount": 9400,
    "badge": "Superventas Paseo de Bebé",
    "description": "Silla de paseo homologada desde el primer día de vida gracias a su respaldo completamente reclinable en 4 posiciones. Plegado ultra compacto tipo paraguas y arnés acolchado de 5 puntos.",
    "pros": [
      "Plegado en paraguas muy fácil de meter en cualquier maletero",
      "Estructura ligera de solo 7,2 kg pero súper estable",
      "Incluye burbuja impermeable para la lluvia y cesta portaobjetos"
    ],
    "idealFor": "Paseos diarios, visitas al pediatra y viajes familiares",
    "style": "baby",
    "imageUrl": "/images/products/bebe-cochecito-1.jpg",
    "images": [
      "/images/products/bebe-cochecito-1.jpg",
      "/images/products/bebe-cochecito-2.jpg",
      "/images/products/bebe-cochecito-3.jpg"
    ]
  },
  {
    "id": "012-carrito-kinderkraft-grande",
    "asin": "B07V493R3H",
    "title": "Kinderkraft GRANDE PLUS - Silla de Paseo Plegado con una Sola Mano y Ruedas Amortiguadas",
    "slug": "kinderkraft-grande-plus-silla-paseo-plegado-una-mano",
    "searchQuery": "kinderkraft grande plus silla paseo ligera amortiguacion bebe",
    "category": "Recién Nacidos",
    "subcategory": "Cochecitos y Mobiliario de Bebé",
    "ageRange": "0-12m",
    "gender": "unisex",
    "priceRange": "50-100",
    "priceText": "99,00 €",
    "rating": 4.7,
    "reviewsCount": 6200,
    "badge": "Plegado con 1 Sola Mano",
    "description": "Silla de paseo todoterreno para bebés desde el nacimiento hasta 22 kg. Sistema CLICK & FOLD que pliega el carrito automáticamente con una mano mientras sostienes al bebé.",
    "pros": [
      "Amortiguación en las 4 ruedas anti-pinchazos de espuma EVA",
      "Capota extensible XL con filtro solar UPF50+",
      "Respaldo con ajuste fluido hasta posición completamente tumbada"
    ],
    "idealFor": "Familias activas que buscan comodidad y plegado instantáneo",
    "style": "baby",
    "imageUrl": "https://images.unsplash.com/photo-1591088398332-8a7791972843?w=700&q=80",
    "images": [
      "https://images.unsplash.com/photo-1591088398332-8a7791972843?w=700&q=80"
    ]
  },
  {
    "id": "012-hamaca-babybjorn-bliss",
    "asin": "B071F2T84L",
    "title": "BabyBjörn Hamaca Bliss - Hamaca Ergonómica con Balanceo Natural de Algodón Suave",
    "slug": "babybjorn-hamaca-bliss-algodon-ergonomica",
    "searchQuery": "babybjorn hamaca bliss algodon ergonomica balanceo natural",
    "category": "Recién Nacidos",
    "subcategory": "Cochecitos y Mobiliario de Bebé",
    "ageRange": "0-12m",
    "gender": "unisex",
    "priceRange": ">100",
    "priceText": "179,00 €",
    "rating": 4.9,
    "reviewsCount": 14500,
    "badge": "La Hamaca Favorita de los Pediatras",
    "description": "Balanceo natural activado por los propios movimientos del bebé sin pilas ni cables. Soporte ergonómico adecuado para la espalda, la cabeza y el cuello del recién nacido.",
    "pros": [
      "Funda de algodón 100% desenfundable y lavable a máquina",
      "Se pliega totalmente plana para guardar bajo la cama o viajar",
      "3 posiciones de inclinación: jugar, descansar y dormir"
    ],
    "idealFor": "Tener al bebé entretenido y seguro cerca de ti en casa",
    "style": "baby",
    "imageUrl": "https://images.unsplash.com/photo-1519689680058-324335c77eba?w=700&q=80",
    "images": [
      "https://images.unsplash.com/photo-1519689680058-324335c77eba?w=700&q=80"
    ]
  },
  {
    "id": "012-cuna-chicco-next2me",
    "asin": "B0777SWZ33",
    "title": "Chicco Next2Me Dream - Cuna de Colecho con Apertura Lateral con una Mano y Modo Balancín",
    "slug": "chicco-next2me-dream-cuna-colecho-balancin",
    "searchQuery": "chicco next2me dream cuna colecho apertura lateral balancin",
    "category": "Recién Nacidos",
    "subcategory": "Cunas de Colecho y Descanso",
    "ageRange": "0-12m",
    "gender": "unisex",
    "priceRange": ">100",
    "priceText": "199,00 €",
    "rating": 4.9,
    "reviewsCount": 8800,
    "badge": "La Cuna Colecho Número 1",
    "description": "Permite dormir pegado al recién nacido con total seguridad. Panel lateral abatible con un solo botón, 11 niveles de altura y posición inclinable para evitar el reflujo tras las tomas nocturnas.",
    "pros": [
      "Apertura y cierre del lateral con una sola mano desde la cama",
      "Modo balancín relajante para calmar al bebé en segundos",
      "Colchón transpirable incluido con tejido de malla de ventilación"
    ],
    "idealFor": "Lactancia materna y noches tranquilas con apego seguro",
    "style": "baby",
    "imageUrl": "/images/products/bebe-cuna-1.jpg",
    "images": [
      "/images/products/bebe-cuna-1.jpg",
      "/images/products/bebe-cuna-2.jpg",
      "/images/products/bebe-cuna-3.jpg"
    ]
  },
  {
    "id": "012-nutria-fisher-price",
    "asin": "B07N1J5K47",
    "title": "Fisher-Price Nutria Dulces Sueños - Peluche Relajante con Movimiento de Respiración y Música",
    "slug": "fisher-price-nutria-dulces-suenos-respiracion",
    "searchQuery": "fisher price nutria dulces suenos peluche respiracion luz suave musica",
    "category": "Recién Nacidos",
    "subcategory": "Cunas de Colecho y Descanso",
    "ageRange": "0-12m",
    "gender": "unisex",
    "priceRange": "20-50",
    "priceText": "39,99 €",
    "rating": 4.8,
    "reviewsCount": 31000,
    "badge": "Viral en TikTok • Calma Cólicos",
    "description": "Peluche sensorial que imita el movimiento rítmico de la respiración humana para tranquilizar al bebé de forma natural. Incluye 30 minutos de música relajante, sonidos de latidos y luz tenue.",
    "pros": [
      "Efecto relajante comprobado para conciliar el sueño en la cuna",
      "Tejidos extrasuaves lavables a máquina retirando el módulo",
      "Control de volumen y luces personalizable"
    ],
    "idealFor": "Calmar llantos, cólicos de lactante y siestas plácidas",
    "style": "baby",
    "imageUrl": "https://images.unsplash.com/photo-1545558014-8692077e9b5c?w=700&q=80",
    "images": [
      "https://images.unsplash.com/photo-1545558014-8692077e9b5c?w=700&q=80"
    ]
  },
  {
    "id": "012-saco-dormir-bebe-tog",
    "asin": "B08F2BGZ9L",
    "title": "Tommee Tippee The Original Grobag - Saco de Dormir para Bebé de Algodón Orgánico 2.5 TOG",
    "slug": "tommee-tippee-grobag-saco-dormir-bebe-2-5-tog",
    "searchQuery": "saco de dormir bebe tommee tippee grobag algodon cremallera doble",
    "category": "Recién Nacidos",
    "subcategory": "Cunas de Colecho y Descanso",
    "ageRange": "0-12m",
    "gender": "unisex",
    "priceRange": "20-50",
    "priceText": "26,95 €",
    "rating": 4.8,
    "reviewsCount": 11200,
    "badge": "Sueño Seguro sin Mantas",
    "description": "Recomendado por la Fundación Británica para la Salud Infantil. Evita que el bebé se destape o se tape la cara durante la noche. Cremallera bidireccional para cambiar pañales fácilmente en la oscuridad.",
    "pros": [
      "Aislamiento térmico 2.5 TOG ideal para entretiempo e invierno (16-20°C)",
      "Ajuste holgado en las caderas certificado como seguro por el IHDI",
      "100% algodón suave hipoalergénico"
    ],
    "idealFor": "Dormir con temperatura constante sin riesgo de asfixia",
    "style": "baby",
    "imageUrl": "https://images.unsplash.com/photo-1555252333-9f8e92e65df9?w=700&q=80",
    "images": [
      "https://images.unsplash.com/photo-1555252333-9f8e92e65df9?w=700&q=80"
    ]
  },
  {
    "id": "012-banera-skip-hop-moby",
    "asin": "B01LZF2U1M",
    "title": "Skip Hop Moby - Bañera Evolutiva 3 Etapas con Cojín de Malla Smart Sling en Forma de Ballena",
    "slug": "skip-hop-moby-banera-evolutiva-tres-etapas",
    "searchQuery": "skip hop moby banera evolutiva 3 etapas ballena cojin malla",
    "category": "Recién Nacidos",
    "subcategory": "Bañeras e Higiene del Bebé",
    "ageRange": "0-12m",
    "gender": "unisex",
    "priceRange": "20-50",
    "priceText": "42,95 €",
    "rating": 4.8,
    "reviewsCount": 12400,
    "badge": "La Bañera Más Cómoda y Segura",
    "description": "Acompaña el crecimiento del bebé en 3 etapas: recién nacido (con hamaca de malla), bebé que aprende a sentarse y niño pequeño. Superficie interior antideslizante y tapón de desagüe rápido.",
    "pros": [
      "Hamaca de malla ajustable con bordes acolchados que sujeta la cabeza",
      "Gancho integrado para colgar en la barra de la ducha y secar al aire",
      "Libre de BPA, PVC y ftalatos"
    ],
    "idealFor": "El baño diario sin miedo a resbalones ni malas posturas",
    "style": "baby",
    "imageUrl": "/images/products/bebe-banera-1.jpg",
    "images": [
      "/images/products/bebe-banera-1.jpg",
      "/images/products/bebe-banera-2.jpg",
      "/images/products/bebe-banera-3.jpg"
    ]
  },
  {
    "id": "012-neceser-cuidados-suavinex",
    "asin": "B07MVD9W22",
    "title": "Suavinex Baby Care - Neceser de Higiene para Bebé con Termómetro, Cepillo, Peine y Tijeritas",
    "slug": "suavinex-baby-care-neceser-higiene-bebe",
    "searchQuery": "suavinex neceser higiene bebe tijeras lima cortaunas cepillo termometro",
    "category": "Recién Nacidos",
    "subcategory": "Bañeras e Higiene del Bebé",
    "ageRange": "0-12m",
    "gender": "unisex",
    "priceRange": "20-50",
    "priceText": "22,50 €",
    "rating": 4.8,
    "reviewsCount": 7800,
    "badge": "Set Completo de Farmacia",
    "description": "Neceser compacto con cremallera impermeable que contiene todo lo necesario para el cuidado higiénico: tijeras con punta redondeada, cortaúñas ergonómico, lima, cepillo de cerdas suaves, peine y termómetro digital.",
    "pros": [
      "Materiales de grado médico seguros para recién nacidos",
      "Estuche rígido perfecto para llevar en el bolso maternal",
      "Colores pastel elegantes"
    ],
    "idealFor": "El bolso del hospital de maternidad y primeros cuidados en casa",
    "style": "baby",
    "imageUrl": "https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=700&q=80",
    "images": [
      "https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=700&q=80"
    ]
  },
  {
    "id": "012-termometro-bano-patito",
    "asin": "B08F2CVZ7P",
    "title": "Philips Avent - Termómetro Digital de Baño y Habitación Flotante con Forma de Flor / Patito",
    "slug": "philips-avent-termometro-digital-bano-habitacion",
    "searchQuery": "philips avent termometro digital bano y habitacion flotante flor bebe",
    "category": "Recién Nacidos",
    "subcategory": "Bañeras e Higiene del Bebé",
    "ageRange": "0-12m",
    "gender": "unisex",
    "priceRange": "<20",
    "priceText": "15,99 €",
    "rating": 4.8,
    "reviewsCount": 16800,
    "badge": "Precisión Grado Médico",
    "description": "Mide de forma instantánea y precisa la temperatura del agua del baño y de la habitación infantil. Flota en el agua como un divertido juguete y cumple con las normativas europeas de seguridad infantil.",
    "pros": [
      "Lectura rápida en grados Celsius con pantalla digital clara",
      "Totalmente sumergible y resistente a golpes",
      "Sirve como juguete de baño para cuando crezca"
    ],
    "idealFor": "Asegurar que el agua esté siempre a los 37°C recomendados",
    "style": "baby",
    "imageUrl": "https://images.unsplash.com/photo-1515488042361-ee00e0ddd4e4?w=700&q=80",
    "images": [
      "https://images.unsplash.com/photo-1515488042361-ee00e0ddd4e4?w=700&q=80"
    ]
  },
  {
    "id": "012-tarta-panales-dodot",
    "asin": "B08G8JTY5M",
    "title": "Tarta de Pañales Dodot Sensitive 3 Pisos con Peluche Suave, Babero y Canastilla de Bienvenida",
    "slug": "tarta-panales-dodot-sensitive-3-pisos-peluche",
    "searchQuery": "tarta de panales dodot sensitive 3 pisos canastilla peluche regalo bautizo nacimiento",
    "category": "Recién Nacidos",
    "subcategory": "Tartas de Pañales y Canastillas",
    "ageRange": "0-12m",
    "gender": "unisex",
    "priceRange": "50-100",
    "priceText": "54,95 €",
    "rating": 4.9,
    "reviewsCount": 3800,
    "badge": "El Regalo Más Agradecido por Padres",
    "description": "Elegante tarta de 3 pisos montada a mano con 50 pañales Dodot Sensitive Talla 2 (la más recomendada por matronas). Coronada con un tierno osito de peluche, muselina de algodón, babero y cinta decorativa en celofán.",
    "pros": [
      "50 pañales Dodot Sensitive 100% aprovechables",
      "Presentación espectacular lista para regalar con lazo y tarjeta",
      "Incluye peluche de terciopelo homologado CE desde 0 meses"
    ],
    "idealFor": "El regalo estrella en el hospital, baby shower o bautizo",
    "style": "baby",
    "imageUrl": "/images/products/bebe-tarta-1.jpg",
    "images": [
      "/images/products/bebe-tarta-1.jpg",
      "/images/products/bebe-tarta-2.jpg",
      "/images/products/bebe-tarta-3.jpg"
    ]
  },
  {
    "id": "012-canastilla-mustela-bebe",
    "asin": "B079Z5J2R8",
    "title": "Mustela Canastilla Cuidado del Recién Nacido - Gel de Baño, Leche Corporal, Crema Balsámica y Colonia",
    "slug": "mustela-canastilla-cuidado-recien-nacido-bolso",
    "searchQuery": "mustela canastilla regalo bebe bolso maternidad gel crema colonia",
    "category": "Recién Nacidos",
    "subcategory": "Tartas de Pañales y Canastillas",
    "ageRange": "0-12m",
    "gender": "unisex",
    "priceRange": "20-50",
    "priceText": "38,90 €",
    "rating": 4.8,
    "reviewsCount": 9200,
    "badge": "La Cesta de Maternidad Imprescindible",
    "description": "Práctico bolso organizador con los 5 productos icónicos de farmacia de Mustela con Perseosa de Aguacate biológica para proteger la barrera cutánea del bebé desde el primer día.",
    "pros": [
      "Fórmulas con 98% de ingredientes de origen natural",
      "Incluye crema bálsamo 1 2 3 para prevenir rojeces del pañal",
      "Bolso con compartimentos reutilizable para el carrito"
    ],
    "idealFor": "Regalo práctico y de máxima garantía farmacéutica",
    "style": "baby",
    "imageUrl": "https://images.unsplash.com/photo-1556228720-195a672e8a03?w=700&q=80",
    "images": [
      "https://images.unsplash.com/photo-1556228720-195a672e8a03?w=700&q=80"
    ]
  },
  {
    "id": "012-cesta-bienvenida-bebe-madera",
    "asin": "B09R27BTP1",
    "title": "Canastilla de Bienvenida para Bebé en Caja de Madera con Manta Sherpa, Cepillo Natural y Sonajero",
    "slug": "canastilla-bienvenida-bebe-madera-manta-sherpa",
    "searchQuery": "canastilla regalo bebe caja de madera manta muselina sonajero madera cepillo",
    "category": "Recién Nacidos",
    "subcategory": "Tartas de Pañales y Canastillas",
    "ageRange": "0-12m",
    "gender": "unisex",
    "priceRange": "20-50",
    "priceText": "34,99 €",
    "rating": 4.9,
    "reviewsCount": 4600,
    "badge": "Presentación Rústica Prémium",
    "description": "Set de regalo artesanal presentado en una preciosa caja de madera natural grabada. Incluye manta de tacto borreguito extrasuave, muselina de bambú transpirable, chupetero de madera y mordedor sensorial.",
    "pros": [
      "Materiales naturales de madera de haya sin barnices químicos",
      "Manta ultrasuave que no pierde pelo tras los lavados",
      "Caja de madera reutilizable para guardar recuerdos del bebé"
    ],
    "idealFor": "Compañeros de trabajo o amigos que quieren hacer un detalle inolvidable",
    "style": "baby",
    "imageUrl": "https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?w=700&q=80",
    "images": [
      "https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?w=700&q=80"
    ]
  },
  {
    "id": "012-sophie-la-girafe",
    "asin": "B00068668C",
    "title": "Sophie la Girafe - El Mordedor de Caucho Natural 100% que Estimula los 5 Sentidos del Bebé",
    "slug": "sophie-la-girafe-mordedor-caucho-natural",
    "searchQuery": "sophie la girafe mordedor caucho natural hevea bebe denticion",
    "category": "Recién Nacidos",
    "subcategory": "Juguetes Sensoriales y Mordedores",
    "ageRange": "0-12m",
    "gender": "unisex",
    "priceRange": "<20",
    "priceText": "16,90 €",
    "rating": 4.9,
    "reviewsCount": 29000,
    "badge": "El Mordedor Más Famoso del Mundo",
    "description": "Fabricada en Francia desde 1961 con caucho 100% natural del árbol de Hevea y pintura alimentaria. Sus manchas oscuras atraen la mirada del recién nacido y sus patas y cuello alargado calman las encías inflamadas.",
    "pros": [
      "Material 100% natural masticable totalmente seguro libre de químicos",
      "Emite un suave silbido al apretarla que estimula el oído",
      "Textura suave y flexible muy fácil de agarrar con manitas pequeñas"
    ],
    "idealFor": "La etapa de dentición y el desarrollo sensorial temprano",
    "style": "baby",
    "imageUrl": "https://images.unsplash.com/photo-1596461404969-9ae70f2830c1?w=700&q=80",
    "images": [
      "https://images.unsplash.com/photo-1596461404969-9ae70f2830c1?w=700&q=80"
    ]
  },
  {
    "id": "012-gimnasio-piano-fisher-price",
    "asin": "B076HYFZ37",
    "title": "Fisher-Price Gimnasio Piano Pataditas Superaprendizaje con Luces, Música y 5 Juguetes Colgantes",
    "slug": "fisher-price-gimnasio-piano-pataditas",
    "searchQuery": "fisher price gimnasio piano pataditas manta actividades bebe",
    "category": "Recién Nacidos",
    "subcategory": "Juguetes Sensoriales y Mordedores",
    "ageRange": "0-12m",
    "gender": "unisex",
    "priceRange": "20-50",
    "priceText": "44,99 €",
    "rating": 4.9,
    "reviewsCount": 38000,
    "badge": "Top 1 Manta de Actividades",
    "description": "El gimnasio de actividades más premiado. Cuenta con un piano que suena cuando el bebé da pataditas tumbado boca arriba, arco con mordedor y espejo, y modo piano portátil cuando ya se sienta solo.",
    "pros": [
      "Manta acolchada lavable a máquina con divertidos animales",
      "Tecnología Inteligente que adapta canciones al crecimiento del bebé",
      "Fortalece la musculatura del cuello, espalda y piernas"
    ],
    "idealFor": "Estimular el gateo, los reflejos y el juego boca abajo (tummy time)",
    "style": "baby",
    "imageUrl": "https://images.unsplash.com/photo-1515488042361-ee00e0ddd4e4?w=700&q=80",
    "images": [
      "https://images.unsplash.com/photo-1515488042361-ee00e0ddd4e4?w=700&q=80"
    ]
  },
  {
    "id": "012-mordedor-winkel-manhattan",
    "asin": "B000BNCA4K",
    "title": "Manhattan Toy Winkel - Sonajero y Mordedor Sensorial de Tubos Flexibles y Colores Vivos",
    "slug": "manhattan-toy-winkel-sonajero-mordedor-sensorial",
    "searchQuery": "manhattan toy winkel sonajero mordedor tubos sensorial bebe",
    "category": "Recién Nacidos",
    "subcategory": "Juguetes Sensoriales y Mordedores",
    "ageRange": "0-12m",
    "gender": "unisex",
    "priceRange": "<20",
    "priceText": "14,99 €",
    "rating": 4.8,
    "reviewsCount": 22000,
    "badge": "Recomendado por Terapeutas Infantiles",
    "description": "Un laberinto de tubos suaves y flexibles libres de BPA que los recién nacidos pueden agarrar sin esfuerzo desde cualquier ángulo. Se puede enfriar en la nevera para un alivio refrescante de encías.",
    "pros": [
      "Diseño premiado que entrena el agarre con dos manos",
      "Sonajero central que produce un sonido suave no estridente",
      "Se puede enfriar en el frigorífico"
    ],
    "idealFor": "Bebés de 3 a 9 meses que empiezan a agarrar objetos",
    "style": "baby",
    "imageUrl": "https://images.unsplash.com/photo-1558060370-d644479cb6f7?w=700&q=80",
    "images": [
      "https://images.unsplash.com/photo-1558060370-d644479cb6f7?w=700&q=80"
    ]
  },
  {
    "id": "012-libro-tela-alto-contraste",
    "asin": "B08F9VXYZ1",
    "title": "Beiens - Libro de Tela de Alto Contraste Blanco y Negro para Recién Nacidos con Espejo y Sonidos",
    "slug": "beiens-libro-tela-alto-contraste-blanco-negro-bebe",
    "searchQuery": "libro tela alto contraste blanco y negro bebe recien nacido espejo sensorial",
    "category": "Recién Nacidos",
    "subcategory": "Libros Blandos y Cuentos de Tela",
    "ageRange": "0-12m",
    "gender": "unisex",
    "priceRange": "<20",
    "priceText": "13,99 €",
    "rating": 4.9,
    "reviewsCount": 14200,
    "badge": "Estimulación Visual Pediátrica",
    "description": "Diseñado según los principios del desarrollo visual infantil: en los primeros 6 meses los bebés solo distinguen contrastes fuertes de blanco y negro. Incluye espejo irrompible de autodescubrimiento y páginas con crujidos.",
    "pros": [
      "Costuras reforzadas resistentes a tirones y lavable a mano",
      "Cintas laterales para atar a los barrotes de la cuna o el cochecito",
      "Material no tóxico y seguro para morder"
    ],
    "idealFor": "Estimular la visión y concentración durante los primeros meses",
    "style": "baby",
    "imageUrl": "https://images.unsplash.com/photo-1544717305-2782549b5136?w=700&q=80",
    "images": [
      "https://images.unsplash.com/photo-1544717305-2782549b5136?w=700&q=80"
    ]
  },
  {
    "id": "012-libro-tela-colitas-animales",
    "asin": "B08G8K7TY2",
    "title": "Libro de Tela Sensorial con Colas de Animales 3D Texturizadas y Sonidos de Papel Crujiente",
    "slug": "libro-tela-sensorial-colas-animales-3d-texturas",
    "searchQuery": "libro tela bebe colas de animales texturas tacto sonido crujiente mordedor",
    "category": "Recién Nacidos",
    "subcategory": "Libros Blandos y Cuentos de Tela",
    "ageRange": "0-12m",
    "gender": "unisex",
    "priceRange": "<20",
    "priceText": "11,95 €",
    "rating": 4.8,
    "reviewsCount": 9800,
    "badge": "Texturas Táctiles Interactivas",
    "description": "Cada página presenta un animal de la selva con su cola sobresaliendo en relieve con texturas variadas: borreguito, terciopelo, raso y pana para estimular el tacto del bebé mientras aprende los primeros animales.",
    "pros": [
      "Colitas 3D irresistibles para tirar, tocar y morder",
      "Papel crujiente interior y chirriador sonoro al apretar",
      "Anilla de agarre para colgar de la capota del cochecito"
    ],
    "idealFor": "Despertar la curiosidad táctil en el cochecito o la cuna",
    "style": "baby",
    "imageUrl": "https://images.unsplash.com/photo-1512820790803-83ca734da794?w=700&q=80",
    "images": [
      "https://images.unsplash.com/photo-1512820790803-83ca734da794?w=700&q=80"
    ]
  },
  {
    "id": "012-libro-bano-magico-cambia-color",
    "asin": "B07M9KLZ4X",
    "title": "Libro de Baño Mágico Infantil que Cambia de Color con el Agua Caliente",
    "slug": "libro-bano-magico-cambia-color-agua",
    "searchQuery": "libro de bano magico cambia de color con agua caliente bebe impermeable",
    "category": "Recién Nacidos",
    "subcategory": "Libros Blandos y Cuentos de Tela",
    "ageRange": "0-12m",
    "gender": "unisex",
    "priceRange": "<20",
    "priceText": "9,99 €",
    "rating": 4.7,
    "reviewsCount": 5400,
    "badge": "Magia en la Bañera",
    "description": "Libro impermeable de plástico blandito acolchado cuyas ilustraciones en blanco y negro se llenan de colores vivos en cuanto tocan el agua templada de la bañera. Al secarse vuelve a quedar oculto para repetir la magia.",
    "pros": [
      "Material impermeable de secado rápido sin moho",
      "Bordes redondeados y páginas muy fáciles de pasar con manitas mojadas",
      "Hace del baño un momento divertido de juego y lectura"
    ],
    "idealFor": "Transformar el momento del baño en una experiencia divertida",
    "style": "baby",
    "imageUrl": "https://images.unsplash.com/photo-1589829085413-56de8ae18c73?w=700&q=80",
    "images": [
      "https://images.unsplash.com/photo-1589829085413-56de8ae18c73?w=700&q=80"
    ]
  },
  {
    "id": "012-colonia-suavinex-baby",
    "asin": "B00E5BCF4Q",
    "title": "Suavinex Baby Cologne - Agua de Colonia Infantil Sin Alcohol con Vaporizador 100ml",
    "slug": "suavinex-baby-cologne-colonia-infantil-sin-alcohol",
    "searchQuery": "suavinex baby cologne colonia infantil sin alcohol frasco vaporizador 100ml",
    "category": "Recién Nacidos",
    "subcategory": "Colonias y Cuidado de Bebé",
    "ageRange": "0-12m",
    "gender": "unisex",
    "priceRange": "<20",
    "priceText": "11,50 €",
    "rating": 4.8,
    "reviewsCount": 18500,
    "badge": "La Fragancia de Bebé Más Amada",
    "description": "El olor a limpio por excelencia: notas de frutos cítricos, flores blancas y almizcles. Fórmula baja en alcohol para no irritar la piel ni manchar la ropita del bebé. Frasco con vaporizador dosificador cómodo y seguro.",
    "pros": [
      "Aroma fresco y delicado que toda la familia querrá usar",
      "No reseca la piel ni mancha la ropa",
      "Fabricada en España con control dermatológico pediátrico"
    ],
    "idealFor": "Aromatizar la ropita, el cepillo de pelo y tras el baño",
    "style": "baby",
    "imageUrl": "https://images.unsplash.com/photo-1594035910387-fea47794261f?w=700&q=80",
    "images": [
      "https://images.unsplash.com/photo-1594035910387-fea47794261f?w=700&q=80"
    ]
  },
  {
    "id": "012-mustela-agua-colonia-sin-alcohol",
    "asin": "B000V3J8Q0",
    "title": "Mustela Agua de Colonia Refrescante Sin Alcohol para Bebé y Recién Nacido 200ml",
    "slug": "mustela-agua-colonia-refrescante-sin-alcohol-200ml",
    "searchQuery": "mustela agua de colonia sin alcohol 200ml refrescante bebe piel sensible",
    "category": "Recién Nacidos",
    "subcategory": "Colonias y Cuidado de Bebé",
    "ageRange": "0-12m",
    "gender": "unisex",
    "priceRange": "<20",
    "priceText": "9,95 €",
    "rating": 4.8,
    "reviewsCount": 14200,
    "badge": "Fórmula 100% Hipoalergénica",
    "description": "Agua perfumada sin alcohol con extractos de manzanilla y miel que calman la piel a la vez que perfuman suavemente la cabecita y la ropa del bebé. Testada bajo control pediátrico y dermatológico.",
    "pros": [
      "Cero alcohol para la máxima protección de pieles atópicas",
      "Extracto de manzanilla con efecto calmante",
      "Formato generoso de 200ml con dosificador"
    ],
    "idealFor": "Refrescar al bebé en verano y peinar los primeros cabellos",
    "style": "baby",
    "imageUrl": "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=700&q=80",
    "images": [
      "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=700&q=80"
    ]
  },
  {
    "id": "012-colonia-denenes-original",
    "asin": "B007X6J8L0",
    "title": "Denenes Colonia Muy Suave para Bebés y Pieles Sensibles con Aceites Esenciales 600ml",
    "slug": "denenes-colonia-muy-suave-bebe-600ml",
    "searchQuery": "denenes colonia muy suave bebe aceites esenciales formato ahorro 600ml",
    "category": "Recién Nacidos",
    "subcategory": "Colonias y Cuidado de Bebé",
    "ageRange": "0-12m",
    "gender": "unisex",
    "priceRange": "<20",
    "priceText": "7,49 €",
    "rating": 4.7,
    "reviewsCount": 8900,
    "badge": "El Clásico de Varias Generaciones",
    "description": "La fragancia de recuerdos infantiles que nunca pasa de moda. Elaborada con aceites esenciales naturales 100% de origen vegetal. Deja la piel y las sábanas con una inconfundible sensación de frescura y ternura.",
    "pros": [
      "Formato familiar de 600ml de excelente relación calidad-precio",
      "Testado dermatológicamente para uso diario",
      "Aroma clásico inolvidable"
    ],
    "idealFor": "Uso diario en toda la casa, cuna y ropa de cama",
    "style": "baby",
    "imageUrl": "https://images.unsplash.com/photo-1528740561666-dc2479dc08ab?w=700&q=80",
    "images": [
      "https://images.unsplash.com/photo-1528740561666-dc2479dc08ab?w=700&q=80"
    ]
  },
  {
    "id": "012-pack-bodies-carters",
    "asin": "B07B4M27B2",
    "title": "Simple Joys by Carter's - Pack de 5 Bodies de Manga Corta de Algodón 100% para Bebé",
    "slug": "simple-joys-carters-pack-5-bodies-algodon",
    "searchQuery": "carters pack 5 bodies manga corta algodon bebe cuello expandible",
    "category": "Recién Nacidos",
    "subcategory": "Ropa, Bodies y Patucos",
    "ageRange": "0-12m",
    "gender": "unisex",
    "priceRange": "20-50",
    "priceText": "21,99 €",
    "rating": 4.8,
    "reviewsCount": 34000,
    "badge": "Básico Imprescindible en el Armario",
    "description": "Los bodies más prácticos del mercado: cuello con hombros superpuestos que se abren hacia abajo para poder quitárselo por los pies en caso de fuga de pañal sin manchar la cabeza. Corchetes libres de níquel.",
    "pros": [
      "100% algodón transpirable extrasuave que no encoge al lavar",
      "Hombros expandibles para desvestir sin tirones de orejas",
      "Costuras planas que no rozan la piel"
    ],
    "idealFor": "El fondo de armario diario del primer año de vida",
    "style": "baby",
    "imageUrl": "https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?w=700&q=80",
    "images": [
      "https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?w=700&q=80"
    ]
  },
  {
    "id": "012-patucos-cuero-suave",
    "asin": "B07MVD9W33",
    "title": "Zapatos Patucos de Bebé en Piel Auténtica Suave con Suela Antideslizante",
    "slug": "zapatos-patucos-cuero-suave-bebe-suela-antideslizante",
    "searchQuery": "patucos bebe cuero suave suela antideslizante primeros pasos mocasines",
    "category": "Recién Nacidos",
    "subcategory": "Ropa, Bodies y Patucos",
    "ageRange": "0-12m",
    "gender": "unisex",
    "priceRange": "<20",
    "priceText": "15,95 €",
    "rating": 4.8,
    "reviewsCount": 8200,
    "badge": "Recomendado por Podólogos Infantiles",
    "description": "Patucos de cuero natural 100% transpirable que permiten a los pies del bebé desarrollarse de forma natural como si fueran descalzos. Banda elástica en el tobillo para que nunca se salgan ni se caigan.",
    "pros": [
      "Suela de ante rugosa que evita resbalones en parquet y baldosas",
      "Cuero blando flexible que no comprime los dedos",
      "Fáciles de poner y difíciles de quitar por el bebé"
    ],
    "idealFor": "Gatear y ponerse de pie manteniendo los pies abrigados",
    "style": "baby",
    "imageUrl": "https://images.unsplash.com/photo-1519689680058-324335c77eba?w=700&q=80",
    "images": [
      "https://images.unsplash.com/photo-1519689680058-324335c77eba?w=700&q=80"
    ]
  },
  {
    "id": "012-pack-baberos-bandana-algodon",
    "asin": "B08FCVTY88",
    "title": "Pack de 8 Baberos Bandana Absorbentes de Algodón Orgánico con Forro Polar Suave",
    "slug": "pack-8-baberos-bandana-algodon-organico-bebe",
    "searchQuery": "pack 8 baberos bandana algodon organico bebe denticion babas forro polar",
    "category": "Recién Nacidos",
    "subcategory": "Ropa, Bodies y Patucos",
    "ageRange": "0-12m",
    "gender": "unisex",
    "priceRange": "<20",
    "priceText": "14,99 €",
    "rating": 4.9,
    "reviewsCount": 16400,
    "badge": "Protección Total Contra Babas",
    "description": "Baberos con forma de pañuelo triangular moderno que protegen el pecho del bebé de la humedad de las babas de dentición. Capa exterior de algodón 100% orgánico y capa interior de forro polar hidrófugo.",
    "pros": [
      "Doble capa que mantiene la ropa seca todo el día",
      "Cierres de corchetes ajustables a medida que crece el cuello",
      "Diseños estampados unisex modernos"
    ],
    "idealFor": "La etapa de babeo de los primeros dientes y tomas de leche",
    "style": "baby",
    "imageUrl": "https://images.unsplash.com/photo-1515488042361-ee00e0ddd4e4?w=700&q=80",
    "images": [
      "https://images.unsplash.com/photo-1515488042361-ee00e0ddd4e4?w=700&q=80"
    ]
  },
  {
    "id": "012-canon-confeti-gender-reveal",
    "asin": "B0B945FCKT",
    "title": "Pack de 4 Cañones de Confeti para Revelación de Género de Bebé (2 Rosas y 2 Azules)",
    "slug": "pack-4-canones-confeti-revelacion-genero-bebe",
    "searchQuery": "canones confeti revelacion genero bebe gender reveal",
    "category": "Recién Nacidos",
    "subcategory": "Fiestas y Revelación de Género",
    "ageRange": "0-12m",
    "gender": "unisex",
    "priceRange": "<20",
    "priceText": "16,99 €",
    "rating": 4.8,
    "reviewsCount": 3200,
    "badge": "Superventas Revelación de Género",
    "description": "Pack de 4 cañones de confeti biodegradable de 30 cm para fiesta de revelación de sexo del bebé. Vienen con pegatinas secretas para tapar el color y disparan una lluvia brillante de hasta 6 metros de altura.",
    "pros": [
      "Confeti biodegradable no tóxico seguro para exteriores",
      "Pegatinas incógnita para mantener la sorpresa hasta el momento del disparo",
      "Lanzamiento suave con giro de base apto para futuros papás y padrinos"
    ],
    "idealFor": "El momento clímax de la fiesta de revelación de género y fotos inolvidables",
    "style": "baby",
    "imageUrl": "/images/products/bebe-canon-confeti-1.jpg",
    "images": [
      "/images/products/bebe-canon-confeti-1.jpg",
      "/images/products/bebe-canon-confeti-2.jpg",
      "/images/products/bebe-canon-confeti-3.jpg"
    ]
  },
  {
    "id": "012-globo-enigma-90cm",
    "asin": "B0BXB7YQ5Z",
    "title": "Globo Gigante Enigma 90 cm Revelación de Género Bebé (\"¿Niño o Niña?\") con Confeti Doble",
    "slug": "globo-gigante-enigma-90cm-revelacion-genero-bebe",
    "searchQuery": "globo gigante enigma revelacion genero bebe 90 cm nino nina",
    "category": "Recién Nacidos",
    "subcategory": "Fiestas y Revelación de Género",
    "ageRange": "0-12m",
    "gender": "unisex",
    "priceRange": "<20",
    "priceText": "11,99 €",
    "rating": 4.7,
    "reviewsCount": 1850,
    "badge": "El Globo Enigma Más Viral",
    "description": "Globo de látex negro opaco gigante de 90 cm de diámetro con la inscripción \"¿Niño o Niña?\". Incluye dos bolsas de confeti rosa y azul para rellenar en secreto antes de inflar con helio o aire.",
    "pros": [
      "Látex negro 100% opaco imposible de traslucir antes del pinchazo",
      "Incluye aguja con lazo decorativo para explotar el globo",
      "Crea una lluvia espectacular de confeti flotante en cámara lenta"
    ],
    "idealFor": "La cuenta atrás de la fiesta sorpresa familiar",
    "style": "baby",
    "imageUrl": "/images/products/bebe-globo-enigma-1.jpg",
    "images": [
      "/images/products/bebe-globo-enigma-1.jpg",
      "/images/products/bebe-globo-enigma-2.jpg",
      "/images/products/bebe-globo-enigma-3.jpg"
    ]
  },
  {
    "id": "012-polvo-holi-humo-bebe",
    "asin": "B08FCVTYFG",
    "title": "PrimePure - Cañones de Humo de Polvo Holi y Confeti Metálico Gender Reveal",
    "slug": "primepure-canones-humo-polvo-holi-confeti-gender-reveal",
    "searchQuery": "canones humo polvo holi confeti fiesta revelacion genero",
    "category": "Recién Nacidos",
    "subcategory": "Fiestas y Revelación de Género",
    "ageRange": "0-12m",
    "gender": "unisex",
    "priceRange": "20-50",
    "priceText": "22,90 €",
    "rating": 4.9,
    "reviewsCount": 2400,
    "badge": "Efecto Nube de Humo Espectacular",
    "description": "Set de cañones combinados que disparan una nube de humo densa y vibrante de polvo de almidón de maíz 100% natural mezclado con confeti metalizado reflectante.",
    "pros": [
      "Polvo holi lavable 100% vegetal que se retira con agua",
      "Disparo de alta densidad perfecto para vídeos virales de TikTok e Instagram",
      "Mecanismo de compresión de aire sin pólvora ni pirotecnia"
    ],
    "idealFor": "Sesiones fotográficas al aire libre de alto impacto visual",
    "style": "baby",
    "imageUrl": "/images/products/bebe-polvo-holi-1.jpg",
    "images": [
      "/images/products/bebe-polvo-holi-1.jpg",
      "/images/products/bebe-polvo-holi-2.jpg",
      "/images/products/bebe-polvo-holi-3.jpg"
    ]
  },
  {
    "id": "13-torre-aprendizaje-montessori",
    "asin": "B08F9VXYZ2",
    "title": "Torre de Aprendizaje Montessori Evolutiva 2 en 1 Madera Natural de Pino Regulable con Pizarra",
    "slug": "torre-aprendizaje-montessori-madera-evolutiva",
    "searchQuery": "torre de aprendizaje montessori madera evolutiva segura taburete infantil cocina",
    "category": "1 a 3 Años",
    "subcategory": "Juguetes Montessori y Madera",
    "ageRange": "1-3",
    "gender": "unisex",
    "priceRange": "50-100",
    "priceText": "89,90 €",
    "rating": 4.9,
    "reviewsCount": 4200,
    "badge": "Método Montessori de Autonomía",
    "description": "Permite al niño alcanzar de forma 100% segura la altura de la encimera para cocinar en familia o lavarse los dientes solito. Se transforma en mesa de actividades con banco y pizarra de tiza.",
    "pros": [
      "Estructura antivuelco robusta con barras de seguridad traseras",
      "Se convierte en mesa de dibujo en 30 segundos sin herramientas",
      "Madera de pino maciza barnizada al agua suave al tacto"
    ],
    "idealFor": "Fomentar la independencia y la colaboración en tareas del hogar",
    "style": "kids",
    "imageUrl": "/images/products/13-torre-1.jpg",
    "images": [
      "/images/products/13-torre-1.jpg",
      "/images/products/13-torre-2.jpg",
      "/images/products/13-torre-3.jpg"
    ]
  },
  {
    "id": "13-hape-banco-martillo",
    "asin": "B00712O21W",
    "title": "Hape - Banco de Martillo de Madera con Xilófono Extraíble y Bolas Sonoras",
    "slug": "hape-banco-martillo-madera-xilofono",
    "searchQuery": "hape banco martillo madera xilofono juguete musical motricidad fina ninos",
    "category": "1 a 3 Años",
    "subcategory": "Juguetes Montessori y Madera",
    "ageRange": "1-3",
    "gender": "unisex",
    "priceRange": "20-50",
    "priceText": "24,99 €",
    "rating": 4.8,
    "reviewsCount": 16500,
    "badge": "Juguete Musical Premiado",
    "description": "Al golpear las bolas con el mazo de madera caen rodando sobre las láminas de un xilófono afinado produciendo agradables escalas musicales. El xilófono se puede extraer para tocar de forma independiente.",
    "pros": [
      "Pinturas con base de agua no tóxicas resistentes a golpes",
      "Desarrolla la coordinación ojo-mano y el sentido del ritmo",
      "Madera certificada FSC de alta durabilidad"
    ],
    "idealFor": "Canalizar la energía de los golpes en música armoniosa",
    "style": "kids",
    "imageUrl": "https://images.unsplash.com/photo-1596461404969-9ae70f2830c1?w=700&q=80",
    "images": [
      "https://images.unsplash.com/photo-1596461404969-9ae70f2830c1?w=700&q=80"
    ]
  },
  {
    "id": "13-cubo-multiactividades-madera",
    "asin": "B07MVD9W44",
    "title": "Cubo Multiactividades 5 en 1 de Madera con Laberinto de Cuentas, Engranajes y Reloj",
    "slug": "cubo-multiactividades-5-en-1-madera-bebe",
    "searchQuery": "cubo multiactividades madera 5 en 1 laberinto cuentas motricidad fina centro actividades",
    "category": "1 a 3 Años",
    "subcategory": "Juguetes Montessori y Madera",
    "ageRange": "1-3",
    "gender": "unisex",
    "priceRange": "20-50",
    "priceText": "29,95 €",
    "rating": 4.8,
    "reviewsCount": 7800,
    "badge": "Centro de Juegos Completo",
    "description": "5 caras de juego interactivo que mantienen al pequeño absorto: laberinto superior de cuentas de alambre (la tapa se invierte para guardarlo compacto), engranajes giratorios, clasificador de formas y ábaco.",
    "pros": [
      "Bordes biselados y esquinas redondeadas sin astillas",
      "Estimula el razonamiento espacial y el reconocimiento de colores",
      "Ocupa muy poco espacio al invertir la tapa"
    ],
    "idealFor": "Tardes de juego educativo en la alfombra del salón",
    "style": "kids",
    "imageUrl": "https://images.unsplash.com/photo-1558060370-d644479cb6f7?w=700&q=80",
    "images": [
      "https://images.unsplash.com/photo-1558060370-d644479cb6f7?w=700&q=80"
    ]
  },
  {
    "id": "13-lego-duplo-tren-numeros",
    "asin": "B08G4G29FD",
    "title": "LEGO DUPLO Mi Primer Tren de los Números - Aprende a Contar (18m a 3 Años)",
    "slug": "lego-duplo-mi-primer-tren-numeros",
    "searchQuery": "lego duplo mi primer tren de los numeros contar piezas grandes",
    "category": "1 a 3 Años",
    "subcategory": "LEGO DUPLO y Construcción",
    "ageRange": "1-3",
    "gender": "unisex",
    "priceRange": "<20",
    "priceText": "19,99 €",
    "rating": 4.8,
    "reviewsCount": 16800,
    "badge": "Superventas Infantil Aprendizaje",
    "description": "El clásico tren de números de LEGO DUPLO con piezas grandes seguras para manos pequeñas. Ayuda a aprender los números del 0 al 9 mientras construyen la locomotora y los vagones con figuras de niño, niña y perrito.",
    "pros": [
      "Piezas grandes homologadas anti-atragantamiento",
      "Favorece el desarrollo motriz temprano y el reconocimiento de colores",
      "Ruedas funcionales para deslizar por alfombra y suelo"
    ],
    "idealFor": "Primeros juegos de construcción creativa y aprendizaje de números",
    "style": "kids",
    "imageUrl": "https://images.unsplash.com/photo-1587654780291-39c9404d746b?w=700&q=80",
    "images": [
      "https://images.unsplash.com/photo-1587654780291-39c9404d746b?w=700&q=80"
    ]
  },
  {
    "id": "13-lego-duplo-caja-ladrillos",
    "asin": "B07W84144T",
    "title": "LEGO DUPLO Classic Caja de Ladrillos de Construcción con Caja de Almacenaje (65 Piezas)",
    "slug": "lego-duplo-classic-caja-ladrillos-65-piezas",
    "searchQuery": "lego duplo classic caja de ladrillos con caja almacenamiento 65 piezas",
    "category": "1 a 3 Años",
    "subcategory": "LEGO DUPLO y Construcción",
    "ageRange": "1-3",
    "gender": "unisex",
    "priceRange": "20-50",
    "priceText": "29,90 €",
    "rating": 4.9,
    "reviewsCount": 13500,
    "badge": "El Básico de Construcción",
    "description": "Caja organizadora rígida repleta de ladrillos de colores vivos, ventanas que se abren, flores, coche con ruedas y 2 figuras humanas. Permite inventar casas, puentes y vehículos sin límite de imaginación.",
    "pros": [
      "Incluye caja plástica apilable para recoger todo en 1 minuto",
      "Ladrillos compatibles con todos los sets de LEGO DUPLO",
      "Instrucciones sencillas de montaje con ideas creativas"
    ],
    "idealFor": "Desarrollar la motricidad fina y la creatividad libre",
    "style": "kids",
    "imageUrl": "https://images.unsplash.com/photo-1585366119957-e9730b6d0f60?w=700&q=80",
    "images": [
      "https://images.unsplash.com/photo-1585366119957-e9730b6d0f60?w=700&q=80"
    ]
  },
  {
    "id": "13-lego-duplo-camion-bomberos",
    "asin": "B09QFSFZ32",
    "title": "LEGO DUPLO Camión de Bomberos con Luz y Sonido de Sirena Realista y Gato Rescatable",
    "slug": "lego-duplo-camion-bomberos-luz-sonido",
    "searchQuery": "lego duplo camion de bomberos luz sirena sonido figuras ninos",
    "category": "1 a 3 Años",
    "subcategory": "LEGO DUPLO y Construcción",
    "ageRange": "1-3",
    "gender": "unisex",
    "priceRange": "20-50",
    "priceText": "27,99 €",
    "rating": 4.8,
    "reviewsCount": 8900,
    "badge": "Luz y Sirena Interactiva",
    "description": "Camión de rescate con sirena luminosa y sonora que se activa pulsando un botón. Cuenta con escalera giratoria, figura de bombero, un gatito en un árbol y accesorios de rescate.",
    "pros": [
      "Luces y sonidos llamativos que despiertan la emoción del rescate",
      "Piezas resistentes a caídas y fáciles de encajar",
      "Fomenta la empatía y los juegos de ayuda mutua"
    ],
    "idealFor": "Pequeños apasionados por los vehículos de emergencia",
    "style": "kids",
    "imageUrl": "https://images.unsplash.com/photo-1568772585407-9361f9bf3a87?w=700&q=80",
    "images": [
      "https://images.unsplash.com/photo-1568772585407-9361f9bf3a87?w=700&q=80"
    ]
  },
  {
    "id": "13-chicco-first-bike",
    "asin": "B000NWHUPU",
    "title": "Chicco First Bike - Bicicleta sin Pedales para Niños de 2 a 5 Años Ultraligera con Ruedas EVA",
    "slug": "chicco-first-bike-bicicleta-sin-pedales",
    "searchQuery": "chicco first bike bicicleta sin pedales ultraligera aprendizaje equilibrio",
    "category": "1 a 3 Años",
    "subcategory": "Triciclos y Bicis de Equilibrio",
    "ageRange": "1-3",
    "gender": "unisex",
    "priceRange": "20-50",
    "priceText": "34,90 €",
    "rating": 4.7,
    "reviewsCount": 35000,
    "badge": "Top 1 en Bicicletas de Equilibrio",
    "description": "La bicicleta de equilibrio más vendida de Europa. Estructura metálica ultraligera de solo 2,7 kg, ruedas anti-pinchazos y altura regulable para que el niño aprenda el equilibrio natural antes de pasar a una bici con pedales.",
    "pros": [
      "Pesa muy poco: el peque la maneja sin esfuerzo",
      "Ruedas macizas de EVA que nunca se desinflan ni pinchan",
      "Manillar y sillín ajustables para acompañar el crecimiento"
    ],
    "idealFor": "Aprender equilibrio y coordinación motriz al aire libre",
    "style": "kids",
    "imageUrl": "https://images.unsplash.com/photo-1576435728678-68d0fbf94e91?w=700&q=80",
    "images": [
      "https://images.unsplash.com/photo-1576435728678-68d0fbf94e91?w=700&q=80"
    ]
  },
  {
    "id": "13-besrey-triciclo-5en1",
    "asin": "B07MVD9W55",
    "title": "Besrey Triciclo 5 en 1 Evolutivo con Barra de Empuje Desmontable para Padres y Pedales",
    "slug": "besrey-triciclo-5-en-1-evolutivo-barra-empuje",
    "searchQuery": "besrey triciclo 5 en 1 evolutivo con barra empuje pedales plegable ninos",
    "category": "1 a 3 Años",
    "subcategory": "Triciclos y Bicis de Equilibrio",
    "ageRange": "1-3",
    "gender": "unisex",
    "priceRange": "50-100",
    "priceText": "79,99 €",
    "rating": 4.8,
    "reviewsCount": 6400,
    "badge": "El Triciclo Todo en Uno",
    "description": "Se adapta a las 5 etapas del niño: triciclo guiado por los padres con barra telescópica, triciclo con pedales, bicicleta de equilibrio de 3 ruedas y bicicleta de dos ruedas. Plegado ultra compacto en un solo clic.",
    "pros": [
      "Barra de empuje ajustable en altura para dirigirlo con una mano",
      "Pedales desmontables que se guardan bajo el chasis",
      "Asiento ergonómico acolchado muy cómodo"
    ],
    "idealFor": "Paseos largos donde el niño alterna entre pedalear y dejarse empujar",
    "style": "kids",
    "imageUrl": "https://images.unsplash.com/photo-1502744688674-c619d1586c9e?w=700&q=80",
    "images": [
      "https://images.unsplash.com/photo-1502744688674-c619d1586c9e?w=700&q=80"
    ]
  },
  {
    "id": "13-correpasillos-vintage-retro",
    "asin": "B08G8K7TY3",
    "title": "Correpasillos Clásico Vintage de Metal con Dirección Real y Asiento Acolchado",
    "slug": "correpasillos-clasico-vintage-metal-retro",
    "searchQuery": "correpasillos metal vintage retro coche antiguo nino ruedas goma silenciosas",
    "category": "1 a 3 Años",
    "subcategory": "Triciclos y Bicis de Equilibrio",
    "ageRange": "1-3",
    "gender": "unisex",
    "priceRange": "50-100",
    "priceText": "84,95 €",
    "rating": 4.9,
    "reviewsCount": 3100,
    "badge": "Diseño Retro Exclusivo",
    "description": "Inspirado en los coches de carreras de los años 30. Carrocería de metal resistente con pintura brillante, volante funcional y ruedas de goma maciza que no rayan el suelo de madera ni hacen ruido en casa.",
    "pros": [
      "Chasis de metal indestructible que pasa de generación en generación",
      "Ruedas de goma silenciosas que cuidan el parquet",
      "Queda precioso como decoración en el dormitorio infantil"
    ],
    "idealFor": "El primer cumpleaños y fotos de recuerdo inolvidables",
    "style": "classic",
    "imageUrl": "https://images.unsplash.com/photo-1596461404969-9ae70f2830c1?w=700&q=80",
    "images": [
      "https://images.unsplash.com/photo-1596461404969-9ae70f2830c1?w=700&q=80"
    ]
  },
  {
    "id": "13-libro-pollo-pepe",
    "asin": "8467571343",
    "title": "El Pollo Pepe - Nick Denchfield (Cuento Pop-Up Interactivo de Cartón Resistente)",
    "slug": "el-pollo-pepe-cuento-pop-up-infantil",
    "searchQuery": "el pollo pepe nick denchfield cuento pop up infantil desplegable sm",
    "category": "1 a 3 Años",
    "subcategory": "Cuentos y Libros Infantiles",
    "ageRange": "1-3",
    "gender": "unisex",
    "priceRange": "<20",
    "priceText": "12,95 €",
    "rating": 4.9,
    "reviewsCount": 28000,
    "badge": "El Cuento Más Vendido de España",
    "description": "El fenómeno infantil indiscutible: el pollo Pepe come mucha cebada, trigo y maíz... ¡por eso tiene una barriga enorme, un pico gigante y unas patas larguísimas que se despliegan en espectaculares pop-ups!",
    "pros": [
      "Pop-ups gigantes que provocan risas y asombro en cada página",
      "Textos rimados muy fáciles de memorizar para los más pequeños",
      "Cartón grueso resistente a manos curiosas"
    ],
    "idealFor": "Inculcar el amor por la lectura antes de dormir",
    "style": "kids",
    "imageUrl": "https://images.unsplash.com/photo-1544717305-2782549b5136?w=700&q=80",
    "images": [
      "https://images.unsplash.com/photo-1544717305-2782549b5136?w=700&q=80"
    ]
  },
  {
    "id": "13-libro-puedo-mirar-panal",
    "asin": "8426137255",
    "title": "¿Puedo Mirar Tu Pañal? - Guido Van Genechten (Libro con Solapas para Dejar el Pañal)",
    "slug": "puedo-mirar-tu-panal-guido-van-genechten",
    "searchQuery": "puedo mirar tu panal guido van genechten cuento solapas dejar el panal orinal",
    "category": "1 a 3 Años",
    "subcategory": "Cuentos y Libros Infantiles",
    "ageRange": "1-3",
    "gender": "unisex",
    "priceRange": "<20",
    "priceText": "14,50 €",
    "rating": 4.9,
    "reviewsCount": 19500,
    "badge": "Imprescindible para Dejar el Pañal",
    "description": "Ratón es súper curioso y quiere mirar dentro del pañal de todos sus amigos: de Liebre, de Cabra, de Perro... ¡hasta que todos le miran su pañal y descubren que está limpio porque él ya usa el orinal!",
    "pros": [
      "Solapas interactivas en cada pañal que los niños adoran levantar",
      "Desdramatiza el proceso de ir al baño con humor e inteligencia",
      "Recomendado por psicólogos y educadores infantiles"
    ],
    "idealFor": "Acompañar la operación pañal de los 2 años sin presiones",
    "style": "kids",
    "imageUrl": "https://images.unsplash.com/photo-1512820790803-83ca734da794?w=700&q=80",
    "images": [
      "https://images.unsplash.com/photo-1512820790803-83ca734da794?w=700&q=80"
    ]
  },
  {
    "id": "13-libro-beso-antes-dormir",
    "asin": "8494413728",
    "title": "Un Beso Antes de Dormir - Cuento Infantil de Cartón con Texturas Afectivas",
    "slug": "un-beso-antes-de-dormir-cuento-infantil",
    "searchQuery": "un beso antes de dormir cuento infantil carton buenas noches apego",
    "category": "1 a 3 Años",
    "subcategory": "Cuentos y Libros Infantiles",
    "ageRange": "1-3",
    "gender": "unisex",
    "priceRange": "<20",
    "priceText": "10,95 €",
    "rating": 4.8,
    "reviewsCount": 11400,
    "badge": "El Ritual de Buenas Noches",
    "description": "Todos los pequeños animales de la granja y el bosque le dan un cariñoso beso a sus mamás antes de meterse en la camita. Ilustraciones dulces y tiernas que transmiten calma y seguridad emocional.",
    "pros": [
      "Formato de cartón duro con esquinas redondeadas anti-arañazos",
      "Ritmo pausado ideal para bajar pulsaciones antes de dormir",
      "Refuerza el vínculo afectivo de apego"
    ],
    "idealFor": "La lectura relajante de los últimos 10 minutos del día",
    "style": "kids",
    "imageUrl": "https://images.unsplash.com/photo-1589829085413-56de8ae18c73?w=700&q=80",
    "images": [
      "https://images.unsplash.com/photo-1589829085413-56de8ae18c73?w=700&q=80"
    ]
  },
  {
    "id": "13-hape-cocinita-madera",
    "asin": "B08F22GZ91",
    "title": "Hape - Cocinita Infantil de Madera con Luces LED en Fogones y Accesorios de Cocina",
    "slug": "hape-cocinita-madera-infantil-accesorios",
    "searchQuery": "cocinita infantil de madera juguetes de imitacion cocinero",
    "category": "1 a 3 Años",
    "subcategory": "Cocina Infantil y Juegos de Imitación",
    "ageRange": "1-3",
    "gender": "unisex",
    "priceRange": "50-100",
    "priceText": "89,00 €",
    "rating": 4.8,
    "reviewsCount": 3800,
    "badge": "Madera Sostenible Certificada",
    "description": "Cocinita de juguete fabricada en madera natural con fuegos interactivos con luz LED roja, microondas, horno, fregadero y utensilios de cocina. Promueve el juego simbólico y la autonomía.",
    "pros": [
      "Acabados redondeados pulidos con pinturas al agua no tóxicas",
      "Diseño compacto que encaja perfecto en cualquier dormitorio",
      "Incluye sartén, olla y espátula de acero inoxidable"
    ],
    "idealFor": "Juegos de rol e imitación cotidiana para pequeños chefs",
    "style": "kids",
    "imageUrl": "https://images.unsplash.com/photo-1558060370-d644479cb6f7?w=700&q=80",
    "images": [
      "https://images.unsplash.com/photo-1558060370-d644479cb6f7?w=700&q=80"
    ]
  },
  {
    "id": "13-alimentos-madera-velcro",
    "asin": "B07MVD9W66",
    "title": "Set de Alimentos y Frutas de Madera para Cortar con Cuchillo Seguro y Velcro Crujiente",
    "slug": "set-frutas-alimentos-madera-cortar-velcro",
    "searchQuery": "frutas y verduras de madera para cortar con cuchillo velcro juguete imitacion",
    "category": "1 a 3 Años",
    "subcategory": "Cocina Infantil y Juegos de Imitación",
    "ageRange": "1-3",
    "gender": "unisex",
    "priceRange": "<20",
    "priceText": "18,99 €",
    "rating": 4.8,
    "reviewsCount": 9200,
    "badge": "Efecto Sonido de Corte Crujiente",
    "description": "Caja con manzanas, plátanos, tomates, zanahorias y pan unidos por velcro. Cuando el niño los corta con el cuchillito de madera, emiten un sonido crujiente súper satisfactorio.",
    "pros": [
      "El velcro ofrece una resistencia táctil ideal para entrenar la fuerza de corte",
      "Madera maciza con pinturas no tóxicas resistentes a golpes",
      "Incluye tabla de cortar y cajita de madera para guardar"
    ],
    "idealFor": "Aprender los nombres de las comidas saludables y motricidad bimanual",
    "style": "kids",
    "imageUrl": "https://images.unsplash.com/photo-1544717305-2782549b5136?w=700&q=80",
    "images": [
      "https://images.unsplash.com/photo-1544717305-2782549b5136?w=700&q=80"
    ]
  },
  {
    "id": "13-maletin-medico-infantil",
    "asin": "B08FCVTY99",
    "title": "Maletín Médico de Madera Infantil con Fonendoscopio con Latido, Jeringuilla y Termómetro",
    "slug": "maletin-medico-infantil-madera-fonendoscopio",
    "searchQuery": "maletin de medico infantil madera estetoscopio jeringa termometro doctor juguete",
    "category": "1 a 3 Años",
    "subcategory": "Cocina Infantil y Juegos de Imitación",
    "ageRange": "1-3",
    "gender": "unisex",
    "priceRange": "20-50",
    "priceText": "23,95 €",
    "rating": 4.8,
    "reviewsCount": 6700,
    "badge": "Pierde el Miedo al Pediatra",
    "description": "Kit de doctor fabricado en madera suave y algodón. Permite al niño examinar a sus peluches, a papá y a mamá, comprendiendo las visitas médicas a través del juego afectivo.",
    "pros": [
      "Fonendoscopio con sonido realista de latido cardíaco",
      "Piezas de madera sin aristas ni plásticos frágiles",
      "Maletín de tela con cremallera fácil de transportar"
    ],
    "idealFor": "Superar la ansiedad médica y desarrollar la empatía y los cuidados",
    "style": "kids",
    "imageUrl": "https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=700&q=80",
    "images": [
      "https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=700&q=80"
    ]
  },
  {
    "id": "13-play-doh-dentista",
    "asin": "B07B4M27B1",
    "title": "Play-Doh - Maletín del Dentista Bromista con Plastilina No Tóxica y Herramientas",
    "slug": "play-doh-dentista-bromista-plastilina",
    "searchQuery": "play doh dentista bromista maletin plastilina moldes",
    "category": "1 a 3 Años",
    "subcategory": "Manualidades, Plastilina y Pintura",
    "ageRange": "1-3",
    "gender": "unisex",
    "priceRange": "<20",
    "priceText": "16,99 €",
    "rating": 4.8,
    "reviewsCount": 14200,
    "badge": "Clásico Creativo Play-Doh",
    "description": "El juego mítico de Play-Doh donde los peques modelan dientes, ponen brackets y usan el taladro eléctrico a pilas. Desarrolla la imaginación y familiariza a los niños con las visitas al dentista de manera divertida.",
    "pros": [
      "Incluye 8 botes de plastilina Play-Doh segura sin tóxicos",
      "Fomenta la motricidad fina y la creatividad manual",
      "El torno emite sonido realista sin peligro alguno"
    ],
    "idealFor": "Tardes de juego creativo y modelado manual en familia",
    "style": "kids",
    "imageUrl": "https://images.unsplash.com/photo-1596461404969-9ae70f2830c1?w=700&q=80",
    "images": [
      "https://images.unsplash.com/photo-1596461404969-9ae70f2830c1?w=700&q=80"
    ]
  },
  {
    "id": "13-crayola-pintura-dedos",
    "asin": "B00004UBHO",
    "title": "Crayola - Set de Pintura de Dedos Ultra Lavable con 4 Botes de Colores y Papel Especial",
    "slug": "crayola-pintura-dedos-ultra-lavable-infantil",
    "searchQuery": "crayola pintura de dedos ultra lavable agua jabon ninos segura",
    "category": "1 a 3 Años",
    "subcategory": "Manualidades, Plastilina y Pintura",
    "ageRange": "1-3",
    "gender": "unisex",
    "priceRange": "<20",
    "priceText": "13,50 €",
    "rating": 4.8,
    "reviewsCount": 11800,
    "badge": "100% Lavable con Agua",
    "description": "Pintura cremosa especialmente formulada para manos pequeñas: no gotea, tiene una textura suave y se limpia por completo de la piel y la ropa solo con agua y jabón corriente, sin frotar ni dejar manchas.",
    "pros": [
      "Fórmula no tóxica certificada dermatológicamente",
      "Botes con dosificador antigoteo para no desperdiciar pintura",
      "Fomenta la libre expresión artística y la coordinación sensorial"
    ],
    "idealFor": "Primeras obras de arte, estampación de manitas y pies",
    "style": "kids",
    "imageUrl": "https://images.unsplash.com/photo-1513364776144-60967b0f800f?w=700&q=80",
    "images": [
      "https://images.unsplash.com/photo-1513364776144-60967b0f800f?w=700&q=80"
    ]
  },
  {
    "id": "13-arena-magica-kinetic-sand",
    "asin": "B07MVD9W77",
    "title": "Kinetic Sand - Caja Castillo de Arena Mágica 450g con Moldes y Bandeja Sensorial",
    "slug": "kinetic-sand-caja-castillo-arena-magica",
    "searchQuery": "kinetic sand arena magica castillo moldes bandeja sensorial no mancha",
    "category": "1 a 3 Años",
    "subcategory": "Manualidades, Plastilina y Pintura",
    "ageRange": "1-3",
    "gender": "unisex",
    "priceRange": "<20",
    "priceText": "14,99 €",
    "rating": 4.8,
    "reviewsCount": 21500,
    "badge": "La Auténtica Arena que Fluye",
    "description": "Arena 100% natural aglomerada que fluye mágicamente entre los dedos pero solo se pega a sí misma. Nunca se seca, no mancha las manos y se recoge con facilidad creando una experiencia sensorial relajante.",
    "pros": [
      "Efecto antiestrés fascinante para niños y adultos",
      "Incluye bandeja propia para jugar sobre la mesa sin derrames",
      "Libre de trigo, gluten y caseína"
    ],
    "idealFor": "Juego sensorial tranquilo en casa los días de lluvia",
    "style": "kids",
    "imageUrl": "https://images.unsplash.com/photo-1596461404969-9ae70f2830c1?w=700&q=80",
    "images": [
      "https://images.unsplash.com/photo-1596461404969-9ae70f2830c1?w=700&q=80"
    ]
  },
  {
    "id": "13-colonia-suavinex-kids",
    "asin": "B07MVD9W88",
    "title": "Suavinex Colonia Infantil Kids - Fragancia Frutal Chispeante con Vaporizador 100ml",
    "slug": "suavinex-colonia-infantil-kids-frutal",
    "searchQuery": "suavinex colonia infantil kids frutal notas citricas pomelo vaporizador",
    "category": "1 a 3 Años",
    "subcategory": "Colonias Infantiles y Cuidado",
    "ageRange": "1-3",
    "gender": "unisex",
    "priceRange": "<20",
    "priceText": "12,90 €",
    "rating": 4.8,
    "reviewsCount": 7600,
    "badge": "Aroma Fresco y Chispeante",
    "description": "Especialmente creada para peques que ya no son bebés de cuna: combina notas alegres de pomelo, mandarina y azahar con base de cedro. Fórmula muy suave adaptada a la piel delicada de los 1 a 3 años.",
    "pros": [
      "No mancha la ropa y dura horas en el pelo y camisetas",
      "Frasco de cristal grueso con pulverizador ergonómico",
      "Aroma unisex fresco y optimista"
    ],
    "idealFor": "Antes de salir a la guardería o al parque infantil",
    "style": "kids",
    "imageUrl": "https://images.unsplash.com/photo-1594035910387-fea47794261f?w=700&q=80",
    "images": [
      "https://images.unsplash.com/photo-1594035910387-fea47794261f?w=700&q=80"
    ]
  },
  {
    "id": "13-colonia-denenes-felices-suenos",
    "asin": "B079Z5J2R9",
    "title": "Denenes Felices Sueños - Agua de Colonia Relajante con Esencia de Lavanda y Manzanilla 500ml",
    "slug": "denenes-felices-suenos-colonia-lavanda-500ml",
    "searchQuery": "denenes felices suenos colonia relajante lavanda manzanilla bano nocturno",
    "category": "1 a 3 Años",
    "subcategory": "Colonias Infantiles y Cuidado",
    "ageRange": "1-3",
    "gender": "unisex",
    "priceRange": "<20",
    "priceText": "8,50 €",
    "rating": 4.7,
    "reviewsCount": 6300,
    "badge": "Efecto Relajante Nocturno",
    "description": "Fórmula enriquecida con esencias de lavanda y manzanilla reconocidas por sus propiedades aromaterapéuticas relajantes. Unas gotas en el pijama y la cuna tras el baño favorecen un descanso profundo y reparador.",
    "pros": [
      "Ayuda a conciliar el sueño gracias a la aromaterapia natural",
      "Fórmula hipoalergénica con 92% de ingredientes naturales",
      "Formato grande para usar generosamente en sábanas y ropa"
    ],
    "idealFor": "El ritual del baño antes de dormir para bajar la energía",
    "style": "kids",
    "imageUrl": "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=700&q=80",
    "images": [
      "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=700&q=80"
    ]
  },
  {
    "id": "13-klorane-petit-brin",
    "asin": "B07MVD9W99",
    "title": "Klorane Bébé Petit Brin - Agua Perfumada Sin Alcohol con Notas Afrutadas de Caléndula 50ml",
    "slug": "klorane-bebe-petit-brin-agua-perfumada-50ml",
    "searchQuery": "klorane bebe petit brin agua perfumada sin alcohol calendula farmacia",
    "category": "1 a 3 Años",
    "subcategory": "Colonias Infantiles y Cuidado",
    "ageRange": "1-3",
    "gender": "unisex",
    "priceRange": "<20",
    "priceText": "14,95 €",
    "rating": 4.9,
    "reviewsCount": 5200,
    "badge": "La Joya de la Farmacia Francesa",
    "description": "Un agua perfumada sutil y envolvente con extracto biológico de flores de caléndula cultivadas de forma sostenible. 97% de fórmula natural sin alcohol patentada para calmar y reconfortar los sentidos.",
    "pros": [
      "Cero alcohol y máxima tolerancia cutánea",
      "Efecto relajante patentado que induce bienestar",
      "Precioso frasco con tapón de madera natural"
    ],
    "idealFor": "Bebés y niños de piel muy sensible o con dermatitis atópica",
    "style": "kids",
    "imageUrl": "https://images.unsplash.com/photo-1528740561666-dc2479dc08ab?w=700&q=80",
    "images": [
      "https://images.unsplash.com/photo-1528740561666-dc2479dc08ab?w=700&q=80"
    ]
  },
  {
    "id": "13-zapatillas-attipas-ergonomicas",
    "asin": "B01LZF2U22",
    "title": "Attipas - Zapatillas Ergonómicas para Primeros Pasos con Puntera Ancha y Suela Transpirable",
    "slug": "attipas-zapatillas-ergonomicas-primeros-pasos",
    "searchQuery": "attipas calzado respetuoso primeros pasos bebe puntera ancha suela flexible",
    "category": "1 a 3 Años",
    "subcategory": "Ropa y Zapatillas Primeros Pasos",
    "ageRange": "1-3",
    "gender": "unisex",
    "priceRange": "20-50",
    "priceText": "24,95 €",
    "rating": 4.8,
    "reviewsCount": 12800,
    "badge": "Calzado Respetuoso Nº1",
    "description": "Avaladas por el Departamento de Ortopedia Pediátrica de la Universidad de Seúl. Su puntera redondeada y ancha permite el libre movimiento de los dedos para un equilibrio perfecto sin deformar el pie en crecimiento.",
    "pros": [
      "Suela de silicona microperforada transpirable y antideslizante",
      "Se lavan cómodamente en la lavadora con el resto de ropa",
      "Se ponen como un calcetín: el niño aprende a calzarse solo"
    ],
    "idealFor": "La transición del gateo a la marcha autónoma y la guardería",
    "style": "kids",
    "imageUrl": "https://images.unsplash.com/photo-1560769629-975ec94e6a86?w=700&q=80",
    "images": [
      "https://images.unsplash.com/photo-1560769629-975ec94e6a86?w=700&q=80"
    ]
  },
  {
    "id": "13-chubasquero-infantil-animales",
    "asin": "B08F2CVZ88",
    "title": "Chubasquero Infantil Impermeable con Capucha de Animales 3D y Bandas Reflectantes",
    "slug": "chubasquero-infantil-impermeable-capucha-animales-3d",
    "searchQuery": "chubasquero impermeable infantil ninos animales capucha reflectante lluvia",
    "category": "1 a 3 Años",
    "subcategory": "Ropa y Zapatillas Primeros Pasos",
    "ageRange": "1-3",
    "gender": "unisex",
    "priceRange": "<20",
    "priceText": "17,99 €",
    "rating": 4.7,
    "reviewsCount": 6500,
    "badge": "Diversión Bajo la Lluvia",
    "description": "Chubasquero cortavientos 100% impermeable con orejitas 3D en la capucha (dinosaurio, ranita o pato). Incluye tiras reflectantes en puños y espalda para máxima visibilidad en días nublados de invierno.",
    "pros": [
      "Tejido ecológico ligero que no huele a plástico y se seca rápido",
      "Botones a presión fáciles de abrochar con dedos pequeños",
      "Corte amplio que permite llevar abrigo debajo"
    ],
    "idealFor": "Saltar en los charcos y paseos con lluvia al salir de la guardería",
    "style": "kids",
    "imageUrl": "https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?w=700&q=80",
    "images": [
      "https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?w=700&q=80"
    ]
  },
  {
    "id": "13-mochila-guarderia-arnes",
    "asin": "B07MVD9WAA",
    "title": "Skip Hop Zoo - Mochila Infantil de Guardería con Arnés de Seguridad y Etiqueta de Nombre",
    "slug": "skip-hop-zoo-mochila-infantil-guarderia-arnes",
    "searchQuery": "skip hop zoo mochila infantil guarderia animales arnes seguridad correa",
    "category": "1 a 3 Años",
    "subcategory": "Ropa y Zapatillas Primeros Pasos",
    "ageRange": "1-3",
    "gender": "unisex",
    "priceRange": "20-50",
    "priceText": "22,50 €",
    "rating": 4.8,
    "reviewsCount": 14700,
    "badge": "La Favorita de la Guardería",
    "description": "Mochila acolchada en forma de simpático animal de la colección Skip Hop Zoo. Cuenta con correa de seguridad extraíble que los padres pueden sujetar en aglomeraciones, parques y aeropuertos.",
    "pros": [
      "Correa de sujeción pectoral con clip para que los tirantes no resbalen",
      "Bolsillo lateral de malla elástica para la botella de agua",
      "Forro interior lavable con etiqueta personalizada para poner el nombre"
    ],
    "idealFor": "Llevar la muda de recambio, merienda y pañales a la escuela infantil",
    "style": "kids",
    "imageUrl": "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=700&q=80",
    "images": [
      "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=700&q=80"
    ]
  },
  {
    "id": "46-carrera-first-mario-kart",
    "asin": "B079Z5J2R4",
    "title": "Carrera First - Circuito de Carreras Nintendo Mario Kart con Mandos Ergonómicos Infantiles",
    "slug": "carrera-first-circuito-nintendo-mario-kart",
    "searchQuery": "carrera first nintendo mario kart circuito pistas coches infantil mandos ergonomicos",
    "category": "4 a 6 Años",
    "subcategory": "Circuitos de Coches Infantiles",
    "ageRange": "4-6",
    "gender": "unisex",
    "priceRange": "20-50",
    "priceText": "39,99 €",
    "rating": 4.8,
    "reviewsCount": 14200,
    "badge": "El Circuito Más Vendido de Mario Kart",
    "description": "Pista de carreras de 2,4 metros con curvas peraltadas y elementos interactivos giratorios decorados con Mario y Yoshi. Mandos electrónicos con gatillos de velocidad regulados para que los coches no se salgan.",
    "pros": [
      "Funciona a pilas (tipo C) sin cables para jugar en cualquier rincón del suelo",
      "Mandos adaptados específicamente a manitas de niños desde 3-4 años",
      "Carreras vibrantes entre Mario y Yoshi"
    ],
    "idealFor": "Iniciarse en el mundo del slot y las carreras en casa",
    "style": "kids",
    "imageUrl": "/images/products/46-mario-circuito-1.jpg",
    "images": [
      "/images/products/46-mario-circuito-1.jpg",
      "/images/products/46-mario-circuito-2.jpg",
      "/images/products/46-mario-circuito-3.jpg"
    ]
  },
  {
    "id": "46-hot-wheels-choques-aereos",
    "asin": "B07B4M27B3",
    "title": "Hot Wheels - Pista de Carreras de Choques Aéreos Giratoria Motorizada con 1 Coche",
    "slug": "hot-wheels-pista-choques-aereos-motorizada",
    "searchQuery": "hot wheels pista choques aereos motorizada lanzador looping coches",
    "category": "4 a 6 Años",
    "subcategory": "Circuitos de Coches Infantiles",
    "ageRange": "4-6",
    "gender": "unisex",
    "priceRange": "50-100",
    "priceText": "54,95 €",
    "rating": 4.8,
    "reviewsCount": 18900,
    "badge": "Acción Motorizada a Toda Velocidad",
    "description": "Pista de más de 80 cm de ancho con un propulsor motorizado continuo que lanza los coches Hot Wheels a toda velocidad a través de una zona de colisiones cruzadas que desafía la gravedad.",
    "pros": [
      "Propulsor a pilas que mantiene los coches circulando sin parar",
      "La zona de choque crea colisiones épicas e impredecibles",
      "Se pliega por la mitad para guardar de forma compacta"
    ],
    "idealFor": "Competiciones trepidantes y partidas llenas de adrenalina",
    "style": "kids",
    "imageUrl": "https://images.unsplash.com/photo-1568772585407-9361f9bf3a87?w=700&q=80",
    "images": [
      "https://images.unsplash.com/photo-1568772585407-9361f9bf3a87?w=700&q=80"
    ]
  },
  {
    "id": "46-hot-wheels-garaje-gigante",
    "asin": "B08F2CVZ99",
    "title": "Hot Wheels City - Megagaraje con Ascensor Manual y Capacidad para 35 Coches",
    "slug": "hot-wheels-city-megagaraje-ascensor-35-coches",
    "searchQuery": "hot wheels megagaraje garaje gigante parking ascensor coches",
    "category": "4 a 6 Años",
    "subcategory": "Circuitos de Coches Infantiles",
    "ageRange": "4-6",
    "gender": "unisex",
    "priceRange": "50-100",
    "priceText": "59,99 €",
    "rating": 4.7,
    "reviewsCount": 11200,
    "badge": "Aparcamiento para Toda la Colección",
    "description": "Un rascacielos de carreras con ascensor manual giratorio que sube los coches hasta la planta superior para lanzarlos por una rampa de doble carril paralela para competir rueda a rueda.",
    "pros": [
      "Capacidad para almacenar y ordenar más de 35 coches Hot Wheels",
      "Conectable con otras pistas de Hot Wheels City",
      "Asa superior integrada para mover el garaje fácilmente"
    ],
    "idealFor": "Mantener organizados todos los coches de juguete en la habitación",
    "style": "kids",
    "imageUrl": "https://images.unsplash.com/photo-1585366119957-e9730b6d0f60?w=700&q=80",
    "images": [
      "https://images.unsplash.com/photo-1585366119957-e9730b6d0f60?w=700&q=80"
    ]
  },
  {
    "id": "46-monstruo-de-colores-juego",
    "asin": "B07CJW1T1X",
    "title": "Devir - El Monstruo de Colores: El Juego de Mesa de las Emociones",
    "slug": "devir-el-monstruo-de-colores-juego-mesa",
    "searchQuery": "el monstruo de colores devir juego de mesa emociones cooperativo infantil",
    "category": "4 a 6 Años",
    "subcategory": "Juegos de Mesa Infantiles",
    "ageRange": "4-6",
    "gender": "unisex",
    "priceRange": "20-50",
    "priceText": "29,99 €",
    "rating": 4.9,
    "reviewsCount": 14800,
    "badge": "El Juego Educativo Nº1 en Colegios",
    "description": "Juego de mesa cooperativo basado en el superventas de Anna Llenas. Los jugadores colaboran juntos para ayudar al monstruo a ordenar sus emociones (alegría, tristeza, rabia, miedo y calma) en frascos de colores mientras comparten vivencias personales.",
    "pros": [
      "Partidas cooperativas: todos los niños ganan o pierden juntos sin enfados",
      "Herramienta psicológica excepcional para que los niños expresen cómo se sienten",
      "Componentes de madera y figuras de cartón grueso de alta calidad"
    ],
    "idealFor": "Fomentar la inteligencia emocional y la comunicación familiar en la sobremesa",
    "style": "kids",
    "imageUrl": "/images/products/46-monstruo-1.jpg",
    "images": [
      "/images/products/46-monstruo-1.jpg",
      "/images/products/46-monstruo-2.jpg",
      "/images/products/46-monstruo-3.jpg"
    ]
  },
  {
    "id": "46-dobble-infantil-kids",
    "asin": "B007X6J8M1",
    "title": "Asmodee - Dobble Kids: El Juego de Rapidez Visual y Reflejos en Lata Metálica",
    "slug": "asmodee-dobble-kids-juego-rapidez-visual",
    "searchQuery": "dobble kids asmodee juego cartas rapidez agilidad visual animales ninos lata",
    "category": "4 a 6 Años",
    "subcategory": "Juegos de Mesa Infantiles",
    "ageRange": "4-6",
    "gender": "unisex",
    "priceRange": "<20",
    "priceText": "14,99 €",
    "rating": 4.9,
    "reviewsCount": 26000,
    "badge": "Partidas Rápidas en Cualquier Lugar",
    "description": "Entre dos cartas cualesquiera siempre hay un único animal idéntico repetido en diferente tamaño. El primero en encontrarlo y nombrarlo en voz alta gana la carta. 5 mini-juegos adictivos en una resistente caja metálica.",
    "pros": [
      "Reglas explicadas en 10 segundos para jugar con amigos y abuelos",
      "Entrena la agilidad mental, la atención sostenida y el vocabulario",
      "Caja metálica redonda ultra compacta que cabe en cualquier bolsillo"
    ],
    "idealFor": "Restaurantes, viajes en coche, tren y sobremesas divertidas",
    "style": "kids",
    "imageUrl": "https://images.unsplash.com/photo-1610890716171-6b1bb98ffd09?w=700&q=80",
    "images": [
      "https://images.unsplash.com/photo-1610890716171-6b1bb98ffd09?w=700&q=80"
    ]
  },
  {
    "id": "46-conecta-4-clasico",
    "asin": "B00000IWH8",
    "title": "Hasbro Gaming - Conecta 4 Clásico: El Juego de Estrategia de Discos en Rejilla",
    "slug": "hasbro-gaming-conecta-4-clasico",
    "searchQuery": "conecta 4 clasico hasbro juego de mesa estrategia rejilla fichas amarillas rojas",
    "category": "4 a 6 Años",
    "subcategory": "Juegos de Mesa Infantiles",
    "ageRange": "4-6",
    "gender": "unisex",
    "priceRange": "<20",
    "priceText": "15,95 €",
    "rating": 4.8,
    "reviewsCount": 32000,
    "badge": "El Clásico de Siempre",
    "description": "Desafía a un amigo dejando caer fichas rojas y amarillas por la rejilla vertical para conseguir 4 en línea en horizontal, vertical o diagonal mientras bloqueas los movimientos del rival.",
    "pros": [
      "Enseña anticipación táctica y pensamiento espacial básico",
      "Palanca de vaciado rápido que deja caer todas las fichas para una revancha instantánea",
      "Montaje robusto y rápido"
    ],
    "idealFor": "Primeros duelos de estrategia lógica entre hermanos y amigos",
    "style": "kids",
    "imageUrl": "https://images.unsplash.com/photo-1544717305-2782549b5136?w=700&q=80",
    "images": [
      "https://images.unsplash.com/photo-1544717305-2782549b5136?w=700&q=80"
    ]
  },
  {
    "id": "46-patinete-3-ruedas-led",
    "asin": "B08F9VXYZ3",
    "title": "Patinete Infantil Plegable de 3 Ruedas con Luces LED Luminosas sin Pilas y Manillar Regulable",
    "slug": "patinete-infantil-plegable-3-ruedas-led",
    "searchQuery": "patinete infantil plegable 3 ruedas led luces manillar ajustable ninos ninas",
    "category": "4 a 6 Años",
    "subcategory": "Patinetes con Ruedas LED",
    "ageRange": "4-6",
    "gender": "unisex",
    "priceRange": "20-50",
    "priceText": "49,95 €",
    "rating": 4.8,
    "reviewsCount": 16400,
    "badge": "Ruedas LED Brillantes Sin Pilas",
    "description": "Patinete de estabilidad triangular con sistema patentado de giro por gravedad mediante inclinación corporal. Las 3 ruedas de poliuretano incorporan núcleos magnéticos que encienden destellos LED de colores al rodar.",
    "pros": [
      "Luces dinámicas autoalimentadas por dinamo magnética",
      "Manillar de aluminio ajustable en 4 alturas (acompaña de los 3 a los 8 años)",
      "Plegado rápido mediante tirador para meterlo en el maletero o llevarlo en la mano"
    ],
    "idealFor": "Paseos diarios al colegio, parques y fines de semana activos",
    "style": "kids",
    "imageUrl": "/images/products/46-patinete-1.jpg",
    "images": [
      "/images/products/46-patinete-1.jpg",
      "/images/products/46-patinete-2.jpg",
      "/images/products/46-patinete-3.jpg"
    ]
  },
  {
    "id": "46-micro-maxi-deluxe-led",
    "asin": "B01LZT0P49",
    "title": "Micro Maxi Deluxe LED - Patinete Infantil de Fabricación Suiza con Ruedas Luminosas (5 a 12 Años)",
    "slug": "micro-maxi-deluxe-led-patinete-suizo",
    "searchQuery": "micro maxi deluxe led patinete infantil fabricacion suiza regulable",
    "category": "4 a 6 Años",
    "subcategory": "Patinetes con Ruedas LED",
    "ageRange": "4-6",
    "gender": "unisex",
    "priceRange": ">100",
    "priceText": "139,90 €",
    "rating": 4.9,
    "reviewsCount": 11500,
    "badge": "La Máxima Calidad Suiza",
    "description": "El rey de los patinetes infantiles: plataforma reforzada con fibra de vidrio que absorbe las irregularidades del asfalto, puños con topes antideslizantes y rodamiento de bolas ABEC 9 de suavidad incomparable.",
    "pros": [
      "Sensación de deslizamiento ultra suave y silenciosa",
      "Capacidad de carga de hasta 70 kg con estructura irrompible",
      "Reflectantes traseros y ruedas LED de alta intensidad"
    ],
    "idealFor": "El regalo estrella que durará años sin perder rendimiento",
    "style": "kids",
    "imageUrl": "https://images.unsplash.com/photo-1502744688674-c619d1586c9e?w=700&q=80",
    "images": [
      "https://images.unsplash.com/photo-1502744688674-c619d1586c9e?w=700&q=80"
    ]
  },
  {
    "id": "46-casco-infantil-luz-seguridad",
    "asin": "B07MVD9WBB",
    "title": "Casco Infantil Homologado para Bicicleta y Patinete con Luz LED Trasera de Seguridad",
    "slug": "casco-infantil-bici-patinete-luz-led-trasera",
    "searchQuery": "casco infantil bicicleta patinete luz led trasera ajuste rueda visera homologado",
    "category": "4 a 6 Años",
    "subcategory": "Patinetes con Ruedas LED",
    "ageRange": "4-6",
    "gender": "unisex",
    "priceRange": "20-50",
    "priceText": "24,99 €",
    "rating": 4.8,
    "reviewsCount": 8900,
    "badge": "Máxima Protección con Luz Trasera",
    "description": "Casco de policarbonato con núcleo de espuma EPS de alta densidad que disipa impactos. Incorpora luz LED roja en la rueda de ajuste de la nuca con 3 modos de destello para que los coches los vean de lejos al anochecer.",
    "pros": [
      "14 orificios de ventilación que evitan el exceso de sudor en la cabeza",
      "Rueda milimétrica para ajustarse perfecto al contorno del cráneo",
      "Correa acolchada en la barbilla anti-pellizcos"
    ],
    "idealFor": "Seguridad imprescindible en bici, patinete y patines",
    "style": "kids",
    "imageUrl": "https://images.unsplash.com/photo-1544717305-2782549b5136?w=700&q=80",
    "images": [
      "https://images.unsplash.com/photo-1544717305-2782549b5136?w=700&q=80"
    ]
  },
  {
    "id": "46-monstruo-de-colores-libro",
    "asin": "8494154552",
    "title": "El Monstruo de Colores - Anna Llenas (Edición Álbum Ilustrado Tapa Dura Oficial)",
    "slug": "el-monstruo-de-colores-libro-album-ilustrado-anna-llenas",
    "searchQuery": "el monstruo de colores anna llenas libro tapa dura album ilustrado editorial flavia",
    "category": "4 a 6 Años",
    "subcategory": "Cuentos y Primeros Lectores",
    "ageRange": "4-6",
    "gender": "unisex",
    "priceRange": "<20",
    "priceText": "16,95 €",
    "rating": 4.9,
    "reviewsCount": 34000,
    "badge": "El Libro Más Recomendado en Educación Infantil",
    "description": "El monstruo se ha levantado hoy raro, confuso, aturdido... ¡se ha hecho un lío con las emociones! Con la ayuda de una niña aprenderá a separar la alegría amarilla, la tristeza azul, la rabia roja, el miedo negro y la calma verde.",
    "pros": [
      "Ilustraciones en técnica collage inolvidables que cautivan a los peques",
      "Vocabulario emocional accesible y enriquecedor",
      "Encuadernación de lujo en tapa dura resistente"
    ],
    "idealFor": "Aprender a poner nombre a lo que sienten día a día",
    "style": "kids",
    "imageUrl": "https://images.unsplash.com/photo-1544717305-2782549b5136?w=700&q=80",
    "images": [
      "https://images.unsplash.com/photo-1544717305-2782549b5136?w=700&q=80"
    ]
  },
  {
    "id": "46-de-mayor-quiero-ser-feliz",
    "asin": "8416890333",
    "title": "De Mayor Quiero Ser... Feliz - Anna Morató García (6 Cuentos para Cultivar la Autoestima Infantil)",
    "slug": "de-mayor-quiero-ser-feliz-anna-morato-libro",
    "searchQuery": "de mayor quiero ser feliz anna morato 6 cuentos positividad autoestima beascoa",
    "category": "4 a 6 Años",
    "subcategory": "Cuentos y Primeros Lectores",
    "ageRange": "4-6",
    "gender": "unisex",
    "priceRange": "<20",
    "priceText": "16,95 €",
    "rating": 4.9,
    "reviewsCount": 18200,
    "badge": "Top Ventas Autoestima y Positividad",
    "description": "6 entrañables historias cortas ilustradas que enseñan a los niños de 4 a 6 años conceptos clave como el poder de las palabras bonitas, la frustración cuando algo no sale a la primera, la empatía y el agradecimiento.",
    "pros": [
      "Historias sencillas con situaciones cotidianas con las que se identifican al instante",
      "Lenguaje positivo que fomenta una mentalidad optimista y resiliente",
      "Guía con consejos prácticos para padres al final de cada cuento"
    ],
    "idealFor": "Reforzar la seguridad en sí mismos y la convivencia con amigos",
    "style": "kids",
    "imageUrl": "https://images.unsplash.com/photo-1512820790803-83ca734da794?w=700&q=80",
    "images": [
      "https://images.unsplash.com/photo-1512820790803-83ca734da794?w=700&q=80"
    ]
  },
  {
    "id": "46-yo-voy-conmigo-libro",
    "asin": "8494413752",
    "title": "Yo Voy Conmigo - Raquel Reguera (Cuento sobre la Autoaceptación y la Personalidad)",
    "slug": "yo-voy-conmigo-raquel-reguera-cuento",
    "searchQuery": "yo voy conmigo raquel reguera thule libro ilustrado autoaceptacion infantil",
    "category": "4 a 6 Años",
    "subcategory": "Cuentos y Primeros Lectores",
    "ageRange": "4-6",
    "gender": "unisex",
    "priceRange": "<20",
    "priceText": "13,50 €",
    "rating": 4.9,
    "reviewsCount": 12400,
    "badge": "Una Joya de la Literatura Infantil",
    "description": "A una niña le gusta Martín, pero Martín ni la mira. Sus amigos le aconsejan cambiar de peinado, quitarse las gafas, no cantar... pero cuando Martín por fin la mira, ella se da cuenta de que para gustarle se ha quedado sin ella misma.",
    "pros": [
      "Mensaje vital sobre nunca dejar de ser uno mismo para complacer a los demás",
      "Ilustraciones expresivas llenas de sensibilidad y humor",
      "Lectura que deja huella en niños y adultos"
    ],
    "idealFor": "Aprender el valor de la autenticidad y la autoestima",
    "style": "kids",
    "imageUrl": "https://images.unsplash.com/photo-1589829085413-56de8ae18c73?w=700&q=80",
    "images": [
      "https://images.unsplash.com/photo-1589829085413-56de8ae18c73?w=700&q=80"
    ]
  },
  {
    "id": "46-maletin-dibujo-madera-150",
    "asin": "B07MVD9WCC",
    "title": "Maletín de Pintura y Dibujo de Madera Deluxe de 150 Piezas con Ceras, Lápices y Acuarelas",
    "slug": "maletin-pintura-dibujo-madera-150-piezas",
    "searchQuery": "maletin pintura dibujo madera 150 piezas lapices colores ceras acuarelas infantil",
    "category": "4 a 6 Años",
    "subcategory": "Manualidades, Dibujo y Pintura",
    "ageRange": "4-6",
    "gender": "unisex",
    "priceRange": "20-50",
    "priceText": "26,90 €",
    "rating": 4.8,
    "reviewsCount": 19800,
    "badge": "El Sueño del Pequeño Artista",
    "description": "Elegante estuche de madera con cierres metálicos y asa que contiene 36 rotuladores, 24 lápices de colores, 24 ceras pastel, pastillas de acuarela, pincel, sacapuntas y regla organizados en bandejas desplegables.",
    "pros": [
      "150 materiales artísticos no tóxicos certificados CE",
      "Maletín de madera resistente con compartimento para cada utensilio",
      "Estimula horas de concentración y desarrollo creativo"
    ],
    "idealFor": "Tardes de pintura, colorear mandalas y proyectos de dibujo escolar",
    "style": "creativity",
    "imageUrl": "https://images.unsplash.com/photo-1513364776144-60967b0f800f?w=700&q=80",
    "images": [
      "https://images.unsplash.com/photo-1513364776144-60967b0f800f?w=700&q=80"
    ]
  },
  {
    "id": "46-aquabeads-estuche-expert",
    "asin": "B079Z5J2R5",
    "title": "Aquabeads - Maletín de Creación de Cuentas Mágicas que se Pegan con Agua Sin Planchar",
    "slug": "aquabeads-maletin-creacion-cuentas-magicas-agua",
    "searchQuery": "aquabeads maletin de creacion cuentas que se pegan con agua abalorios manualidades",
    "category": "4 a 6 Años",
    "subcategory": "Manualidades, Dibujo y Pintura",
    "ageRange": "4-6",
    "gender": "unisex",
    "priceRange": "20-50",
    "priceText": "29,99 €",
    "rating": 4.8,
    "reviewsCount": 9400,
    "badge": "Sin Planchas Ni Pegamento",
    "description": "Crea figuras de animales, princesas o coches colocando las bolitas de colores sobre la plantilla: ¡basta con pulverizar agua del grifo para que se fusionen mágicamente al secar sin calor ni planchas peligrosas!",
    "pros": [
      "100% seguro para niños sin necesidad de supervisión de plancha caliente",
      "Incluye más de 1200 cuentas brillantes y en forma de joya",
      "Bolígrafo dispensador de perlas ergonómico y pulverizador de agua"
    ],
    "idealFor": "Desarrollar la motricidad fina, la paciencia y crear llaveros propios",
    "style": "creativity",
    "imageUrl": "https://images.unsplash.com/photo-1596461404969-9ae70f2830c1?w=700&q=80",
    "images": [
      "https://images.unsplash.com/photo-1596461404969-9ae70f2830c1?w=700&q=80"
    ]
  },
  {
    "id": "46-crayola-rotuladores-lavables",
    "asin": "B00004UBI1",
    "title": "Crayola - Caja de 24 Rotuladores Supertips Lavables de Punta Cónica para Trazo Fino y Grueso",
    "slug": "crayola-24-rotuladores-supertips-lavables",
    "searchQuery": "crayola supertips 24 rotuladores lavables punta conica no traspasan",
    "category": "4 a 6 Años",
    "subcategory": "Manualidades, Dibujo y Pintura",
    "ageRange": "4-6",
    "gender": "unisex",
    "priceRange": "<20",
    "priceText": "9,99 €",
    "rating": 4.8,
    "reviewsCount": 38000,
    "badge": "La Tinta Más Fácil de Lavar",
    "description": "Los rotuladores favoritos de profesores y padres: la punta cónica permite hacer líneas finas con la punta y rellenar grandes áreas con el lateral. La tinta se va de la piel y de la ropa de algodón con un simple lavado.",
    "pros": [
      "Tinta ultra lavable patentada que no mancha permanentemente las mesas ni la ropa",
      "Punta resistente que no se hunde aunque el niño apriete con fuerza",
      "24 colores brillantes y variados"
    ],
    "idealFor": "Colorear libros de dibujos y primeros trazos escolares",
    "style": "creativity",
    "imageUrl": "https://images.unsplash.com/photo-1585366119957-e9730b6d0f60?w=700&q=80",
    "images": [
      "https://images.unsplash.com/photo-1585366119957-e9730b6d0f60?w=700&q=80"
    ]
  },
  {
    "id": "46-furby-interactivo-morado",
    "asin": "B0BXX9YQ11",
    "title": "Furby - Peluche Interactivo con Luces, Música, Movimiento y Más de 600 Respuestas por Voz",
    "slug": "furby-interactivo-peluche-luces-musica-voz",
    "searchQuery": "furby interactivo peluche robotico voz baila luces abrazos hasbro",
    "category": "4 a 6 Años",
    "subcategory": "Peluches Interactivos y Muñecos",
    "ageRange": "4-6",
    "gender": "unisex",
    "priceRange": "50-100",
    "priceText": "69,99 €",
    "rating": 4.8,
    "reviewsCount": 9600,
    "badge": "El Juguete Interactivo del Año",
    "description": "Furby responde cuando le hablas con 5 modos activados por voz: fiesta de baile, desfile de luces, adivina el futuro, relax meditativo y fiesta de risas. Orejas luminosas que cambian de color y pelaje extrasuave.",
    "pros": [
      "No requiere conexión a internet ni apps móviles: 100% seguro para niños",
      "Reacciona al tacto, abrazos, cosquillas y cepillado de pelo",
      "Incluye adornos y peine para crear peinados"
    ],
    "idealFor": "Compañero inseparable de aventuras y juego simbólico",
    "style": "kids",
    "imageUrl": "https://images.unsplash.com/photo-1545558014-8692077e9b5c?w=700&q=80",
    "images": [
      "https://images.unsplash.com/photo-1545558014-8692077e9b5c?w=700&q=80"
    ]
  },
  {
    "id": "46-bitzee-mascota-digital",
    "asin": "B0C7J9KL88",
    "title": "Bitzee - Mascota Digital Interactiva Holográfica que Puedes Tocar y Sentir de Verdad",
    "slug": "bitzee-mascota-digital-interactiva-que-se-toca",
    "searchQuery": "bitzee spin master mascota digital holografica que se toca pantalla pod virtual",
    "category": "4 a 6 Años",
    "subcategory": "Peluches Interactivos y Muñecos",
    "ageRange": "4-6",
    "gender": "unisex",
    "priceRange": "20-50",
    "priceText": "34,99 €",
    "rating": 4.8,
    "reviewsCount": 16800,
    "badge": "La Mascota Holográfica Táctil",
    "description": "La reinvención moderna del Tamagotchi: abres la cajita y una mascota digital holográfica reacciona a tus caricias físicas en la pantalla flotante. Aliméntala, acúnala y juega con ella hasta desbloquear 15 mascotas diferentes.",
    "pros": [
      "Sensación táctil real de acariciar una imagen de luz holográfica",
      "No tiene pantallas dañinas para la vista",
      "Tamaño de bolsillo para llevar en la mochila a cualquier sitio"
    ],
    "idealFor": "Aprender la responsabilidad de cuidar una mascota sin riesgos",
    "style": "kids",
    "imageUrl": "https://images.unsplash.com/photo-1596461404969-9ae70f2830c1?w=700&q=80",
    "images": [
      "https://images.unsplash.com/photo-1596461404969-9ae70f2830c1?w=700&q=80"
    ]
  },
  {
    "id": "46-perrito-interactivo-respira",
    "asin": "B07MVD9WDD",
    "title": "Little Live Pets Sleepy Puppy - Perrito Interactivo que Respira, Abre los Ojos y Emite Sonidos",
    "slug": "little-live-pets-sleepy-puppy-perrito-interactivo",
    "searchQuery": "little live pets perrito interactivo respira mueve cabeza sonidos bebe perro",
    "category": "4 a 6 Años",
    "subcategory": "Peluches Interactivos y Muñecos",
    "ageRange": "4-6",
    "gender": "unisex",
    "priceRange": "20-50",
    "priceText": "44,95 €",
    "rating": 4.7,
    "reviewsCount": 8400,
    "badge": "Como un Cachorro de Verdad",
    "description": "Un cachorro de peluche interactivo que mueve la cabeza, abre y cierra los ojos, y su barriga sube y baja al ritmo de su respiración cuando se queda dormido en tus brazos. Incluye biberón y certificado de adopción.",
    "pros": [
      "Más de 35 sonidos realistas de cachorro alegre y somnoliento",
      "Pelaje sedoso y peso equilibrado para abrazar en la cama",
      "Fomenta el cariño y el juego de cuidado afectivo"
    ],
    "idealFor": "Niños que sueñan con tener su primer perrito en casa",
    "style": "kids",
    "imageUrl": "https://images.unsplash.com/photo-1558060370-d644479cb6f7?w=700&q=80",
    "images": [
      "https://images.unsplash.com/photo-1558060370-d644479cb6f7?w=700&q=80"
    ]
  },
  {
    "id": "46-capa-mascara-superheroes",
    "asin": "B07B4M27B4",
    "title": "Pack de 5 Capas de Superhéroes de Satén con Máscaras de Fieltro y Muñequeras",
    "slug": "pack-5-capas-superheroes-mascaras-infantiles",
    "searchQuery": "pack 5 capas superheroes ninos antifaces fieltro disfraces fiesta cumpleanos",
    "category": "4 a 6 Años",
    "subcategory": "Disfraces y Ropa Infantil",
    "ageRange": "4-6",
    "gender": "unisex",
    "priceRange": "<20",
    "priceText": "18,99 €",
    "rating": 4.8,
    "reviewsCount": 17200,
    "badge": "El Set de Disfraces Más Vendido",
    "description": "Capas dobles reversibles de satén brillante con cierre de velcro en el cuello (100% seguro para no asfixiar) y máscaras de fieltro suave que no arañan la cara. Permite disfrazarse de Spiderman, Batman, Superman e Iron Man.",
    "pros": [
      "Cierres de velcro de seguridad que se sueltan si se enganchan",
      "Satén de doble cara lavable muy brillante y ligero para volar",
      "Pack de 5 para jugar con amigos y hermanos en fiestas de pijamas"
    ],
    "idealFor": "Juegos de imaginación activa y cumpleaños temáticos",
    "style": "kids",
    "imageUrl": "https://images.unsplash.com/photo-1502744688674-c619d1586c9e?w=700&q=80",
    "images": [
      "https://images.unsplash.com/photo-1502744688674-c619d1586c9e?w=700&q=80"
    ]
  },
  {
    "id": "46-vestido-princesa-accesorios",
    "asin": "B07MVD9WEE",
    "title": "Disfraz Vestido de Princesa de Cuento con Tul Brillante, Tiara con Pedrería y Varita Mágica",
    "slug": "disfraz-vestido-princesa-tul-tiara-varita",
    "searchQuery": "disfraz vestido princesa infantil tul purpurina corona tiara varita guantes",
    "category": "4 a 6 Años",
    "subcategory": "Disfraces y Ropa Infantil",
    "ageRange": "4-6",
    "gender": "girl",
    "priceRange": "20-50",
    "priceText": "24,95 €",
    "rating": 4.8,
    "reviewsCount": 13900,
    "badge": "Como una Auténtica Princesa",
    "description": "Vestido confeccionado con forro de algodón suave que no pica en la piel y múltiples capas de tul con destellos de purpurina. Incluye corona de brillantes, cetro con gemas y guantes de satén elástico.",
    "pros": [
      "Forro interior de algodón 100% respetuoso con pieles atópicas",
      "Cremallera trasera oculta resistente y elástico en la cintura",
      "Accesorios de plástico irrompible con fijación segura"
    ],
    "idealFor": "Carnaval, funciones escolares y tardes mágicas en el castillo",
    "style": "kids",
    "imageUrl": "https://images.unsplash.com/photo-1519689680058-324335c77eba?w=700&q=80",
    "images": [
      "https://images.unsplash.com/photo-1519689680058-324335c77eba?w=700&q=80"
    ]
  },
  {
    "id": "46-pijama-kigurumi-dinosaurio",
    "asin": "B08F2CVZAA",
    "title": "Pijama Entero Kigurumi de Forro Polar con Capucha de Dinosaurio y Cola Acolchada",
    "slug": "pijama-entero-kigurumi-dinosaurio-forro-polar",
    "searchQuery": "pijama entero kigurumi dinosaurio infantil forro polar capucha cola cremallera",
    "category": "4 a 6 Años",
    "subcategory": "Disfraces y Ropa Infantil",
    "ageRange": "4-6",
    "gender": "unisex",
    "priceRange": "20-50",
    "priceText": "22,99 €",
    "rating": 4.8,
    "reviewsCount": 9100,
    "badge": "El Pijama Más Calentito y Divertido",
    "description": "Mono pijama de terciopelo polar ultra cálido con cremallera frontal, dientes 3D en la capucha y cresta con cola acolchada. Cómodo tanto para dormir en invierno como para jugar a rugir por el pasillo de casa.",
    "pros": [
      "Forro polar esponjoso que aísla del frío sin pesar",
      "Cremallera en la parte trasera para ir al baño sin desvestirse entero",
      "Puños elásticos en tobillos y muñecas que no se suben"
    ],
    "idealFor": "Noches frías de invierno y maratones de películas de dibujos",
    "style": "kids",
    "imageUrl": "https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?w=700&q=80",
    "images": [
      "https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?w=700&q=80"
    ]
  },
  {
    "id": "46-colonia-tous-kids-chico",
    "asin": "B007X6J8N2",
    "title": "Tous Kids Boy - Agua de Colonia Infantil con Vaporizador 100ml Notas de Trébol y Neroli",
    "slug": "tous-kids-boy-agua-colonia-infantil-100ml",
    "searchQuery": "tous kids boy agua de colonia infantil 100ml vaporizador perfume ninos",
    "category": "4 a 6 Años",
    "subcategory": "Colonias Infantiles Frescas",
    "ageRange": "4-6",
    "gender": "boy",
    "priceRange": "20-50",
    "priceText": "32,90 €",
    "rating": 4.8,
    "reviewsCount": 8800,
    "badge": "La Fragancia Infantil Más Elegante",
    "description": "Creada especialmente por los maestros perfumistas de Tous para niños traviesos y aventureros: chispeantes notas de trébol, mandarina, manzana acaramelada, hierba fresca y castaña con un fondo suave de madera de cedro.",
    "pros": [
      "Fórmula dermatológicamente testada respetuosa con pieles jóvenes",
      "Aroma alegre que perdura durante toda la jornada escolar",
      "Tapón metálico icónico del osito Tous con gorra"
    ],
    "idealFor": "El primer perfume \"de mayor\" para cumpleaños y reuniones familiares",
    "style": "classic",
    "imageUrl": "https://images.unsplash.com/photo-1594035910387-fea47794261f?w=700&q=80",
    "images": [
      "https://images.unsplash.com/photo-1594035910387-fea47794261f?w=700&q=80"
    ]
  },
  {
    "id": "46-colonia-tous-kids-chica",
    "asin": "B007X6J8O3",
    "title": "Tous Kids Girl - Agua de Colonia Infantil con Vaporizador 100ml Notas de Limón y Caramelo",
    "slug": "tous-kids-girl-agua-colonia-infantil-100ml",
    "searchQuery": "tous kids girl agua de colonia infantil 100ml vaporizador perfume ninas",
    "category": "4 a 6 Años",
    "subcategory": "Colonias Infantiles Frescas",
    "ageRange": "4-6",
    "gender": "girl",
    "priceRange": "20-50",
    "priceText": "32,90 €",
    "rating": 4.8,
    "reviewsCount": 9200,
    "badge": "Dulce, Floral y Alegre",
    "description": "Una fragancia tierna y divertida que combina caramelos de limón, magdalenas recién horneadas, flor de azahar y albaricoque. Frasco de diseño rosa con el emblemático osito Tous en el tapón.",
    "pros": [
      "Sin sensación pegajosa, vaporización fina y uniforme",
      "Aroma dulce y fresco a limpio que no satura",
      "Presentación en caja decorada perfecta para regalo"
    ],
    "idealFor": "Detalle refinado para niñas de 4 a 6 años",
    "style": "classic",
    "imageUrl": "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=700&q=80",
    "images": [
      "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=700&q=80"
    ]
  },
  {
    "id": "46-colonia-disney-frozen",
    "asin": "B07MVD9WFF",
    "title": "Disney Frozen II - Set de Colonia Infantil Elsa y Anna 100ml con Pulsera con Brillos",
    "slug": "disney-frozen-set-colonia-infantil-pulsera",
    "searchQuery": "disney frozen colonia infantil elsa y anna pulsera regalo perfume ninas",
    "category": "4 a 6 Años",
    "subcategory": "Colonias Infantiles Frescas",
    "ageRange": "4-6",
    "gender": "girl",
    "priceRange": "<20",
    "priceText": "14,99 €",
    "rating": 4.7,
    "reviewsCount": 7100,
    "badge": "La Magia de Frozen en su Tocador",
    "description": "Colonia fresca oficial de Disney Frozen con notas afrutadas de manzana dulce, grosella y flores de invierno. Incluye una preciosa pulsera de cuentas heladas que las peques pueden ponerse al instante.",
    "pros": [
      "Fórmula suave hipoalergénica sin parabenos",
      "Frasco de cristal decorado con siluetas de Elsa y Anna",
      "Incluye joya de fantasía a juego en la caja de regalo"
    ],
    "idealFor": "Cumpleaños y regalo sorpresa para fans de Frozen",
    "style": "kids",
    "imageUrl": "https://images.unsplash.com/photo-1528740561666-dc2479dc08ab?w=700&q=80",
    "images": [
      "https://images.unsplash.com/photo-1528740561666-dc2479dc08ab?w=700&q=80"
    ]
  },
  {
    "id": "79-scalextric-looping-f1",
    "asin": "B08F2CVZ01",
    "title": "Scalextric Compact - Circuito de Carreras Fórmula 1 con Doble Looping 3D y Cuentavueltas",
    "slug": "scalextric-compact-circuito-f1-looping-3d",
    "searchQuery": "scalextric compact circuito f1 looping cuentavueltas coches escala 1 43",
    "category": "7 a 9 Años",
    "subcategory": "Scalextric y Pistas de Carreras",
    "ageRange": "7-9",
    "gender": "unisex",
    "priceRange": "50-100",
    "priceText": "79,90 €",
    "rating": 4.8,
    "reviewsCount": 6800,
    "badge": "La Auténtica Pista Scalextric",
    "description": "Circuito escala 1:43 con más de 5 metros de pista de alta velocidad, doble looping gravitatorio vertical, puente elevado y 2 coches de Fórmula 1 con luces delanteras y guía de imán anti-salidas.",
    "pros": [
      "Mandos inalámbricos o ergonómicos con botón turbo de aceleración puntual",
      "Pistas de enganche rápido fácil de montar y desmontar en el salón",
      "Cuentavueltas mecánico para saber quién ha ganado la carrera"
    ],
    "idealFor": "Duelos de velocidad legendarios entre padres e hijos",
    "style": "classic",
    "imageUrl": "/images/products/79-scalextric-1.jpg",
    "images": [
      "/images/products/79-scalextric-1.jpg",
      "/images/products/79-scalextric-2.jpg",
      "/images/products/79-scalextric-3.jpg"
    ]
  },
  {
    "id": "79-scalextric-rally-champions",
    "asin": "B08F2CVZ02",
    "title": "Scalextric Compact - Pista Rally Champions con Chicanes y Cruces de Carril Escala 1:43",
    "slug": "scalextric-compact-rally-champions-chicanes",
    "searchQuery": "scalextric compact rally champions coches wrc curva peraltada chicane",
    "category": "7 a 9 Años",
    "subcategory": "Scalextric y Pistas de Carreras",
    "ageRange": "7-9",
    "gender": "unisex",
    "priceRange": "50-100",
    "priceText": "69,99 €",
    "rating": 4.7,
    "reviewsCount": 5400,
    "badge": "Duelos Rally Trepidantes",
    "description": "Pista técnica de 4,5 metros con curvas deslizantes de rally, tramo de cruce de carril donde los coches pueden colisionar si no frenan a tiempo y 2 coches oficiales WRC con chasis detallado.",
    "pros": [
      "Zona de cruce de pistas para añadir emoción estratégica",
      "Coches con tracción magnética reforzada para curvas rápidas",
      "Ocupa un espacio moderado compatible con alfombras estándar"
    ],
    "idealFor": "Aficionados a las carreras de rally y la conducción técnica",
    "style": "classic",
    "imageUrl": "https://images.unsplash.com/photo-1568772585407-9361f9bf3a87?w=700&q=80",
    "images": [
      "https://images.unsplash.com/photo-1568772585407-9361f9bf3a87?w=700&q=80"
    ]
  },
  {
    "id": "79-carrera-go-dtm-speed",
    "asin": "B08F2CVZ03",
    "title": "Carrera GO!!! - Circuito de Carreras Eléctrico DTM Power Lap con Curvas Peraltadas 6 Metros",
    "slug": "carrera-go-circuito-dtm-power-lap-6-metros",
    "searchQuery": "carrera go circuito carreras electrico dtm coches touring looping mando turbo",
    "category": "7 a 9 Años",
    "subcategory": "Scalextric y Pistas de Carreras",
    "ageRange": "7-9",
    "gender": "unisex",
    "priceRange": "50-100",
    "priceText": "84,95 €",
    "rating": 4.8,
    "reviewsCount": 4900,
    "badge": "Pista Gigante de 6 Metros",
    "description": "Enorme trazado de 6,3 metros con dos coches oficiales BMW y Mercedes DTM. Incluye fly-over elevado, curva cerrada peraltada y mandos con botón turbo boost para adelantamientos en recta.",
    "pros": [
      "Trazado largo con múltiples configuraciones de montaje posibles",
      "Coches con gran adherencia y tampografía oficial de marcas",
      "Transformador de pared para jugar sin gastar pilas"
    ],
    "idealFor": "Tardes enteras de competición con amigos en casa",
    "style": "classic",
    "imageUrl": "https://images.unsplash.com/photo-1585366119957-e9730b6d0f60?w=700&q=80",
    "images": [
      "https://images.unsplash.com/photo-1585366119957-e9730b6d0f60?w=700&q=80"
    ]
  },
  {
    "id": "79-coche-rc-4x4-alta-velocidad",
    "asin": "B08F9VXYZ4",
    "title": "Coche Teledirigido 4x4 Todo Terreno Alta Velocidad 40 km/h con 2 Baterías y Chasis Reforzado",
    "slug": "coche-teledirigido-4x4-alta-velocidad-40kmh",
    "searchQuery": "coche teledirigido 4x4 todo terreno alta velocidad 40 kmh bateria recargable amortiguacion",
    "category": "7 a 9 Años",
    "subcategory": "Coches RC y Teledirigidos",
    "ageRange": "7-9",
    "gender": "unisex",
    "priceRange": "20-50",
    "priceText": "49,99 €",
    "rating": 4.8,
    "reviewsCount": 13200,
    "badge": "Superventas Coche RC 4x4",
    "description": "Potente coche teledirigido con tracción total a las 4 ruedas, amortiguadores de resorte metálico independientes y neumáticos de goma todoterreno para rodar por hierba, barro, grava y asfalto.",
    "pros": [
      "Incluye 2 baterías recargables para más de 45 minutos de juego ininterrumpido",
      "Emisora 2.4 GHz anti-interferencias con alcance de 80 metros",
      "Parachoques delantero reforzado anti-choques"
    ],
    "idealFor": "Correr en parques, caminos de tierra y exteriores con total libertad",
    "style": "classic",
    "imageUrl": "/images/products/79-coche-rc-1.jpg",
    "images": [
      "/images/products/79-coche-rc-1.jpg",
      "/images/products/79-coche-rc-2.jpg",
      "/images/products/79-coche-rc-3.jpg"
    ]
  },
  {
    "id": "79-coche-acrobatico-360-led",
    "asin": "B07MVD9W01",
    "title": "Coche Acrobático Teledirigido Giratorio 360° con Doble Cara, Luces LED y Música",
    "slug": "coche-acrobatico-teledirigido-giratorio-360-doble-cara",
    "searchQuery": "coche acrobatico teledirigido doble cara volteretas 360 grados luces led ninos",
    "category": "7 a 9 Años",
    "subcategory": "Coches RC y Teledirigidos",
    "ageRange": "7-9",
    "gender": "unisex",
    "priceRange": "<20",
    "priceText": "19,95 €",
    "rating": 4.7,
    "reviewsCount": 16800,
    "badge": "Volteretas Imposibles Sin Atascos",
    "description": "Coche acrobático que nunca se para: cuando choca contra una pared o sube un escalón, da una voltereta en el aire y sigue corriendo por el otro lado. Ruedas todoterreno iluminadas con LED de colores brillantes.",
    "pros": [
      "Giro de 360 grados sobre su propio eje a toda velocidad",
      "Diseño indestructible que absorbe cualquier caída por las escaleras",
      "Fácil de manejar por niños sin frustración de que el coche vuelque"
    ],
    "idealFor": "Diversión desenfadada tanto dentro del salón como en la terraza",
    "style": "kids",
    "imageUrl": "https://images.unsplash.com/photo-1544717305-2782549b5136?w=700&q=80",
    "images": [
      "https://images.unsplash.com/photo-1544717305-2782549b5136?w=700&q=80"
    ]
  },
  {
    "id": "79-monster-truck-rc-gigante",
    "asin": "B07MVD9W02",
    "title": "Monster Truck Teledirigido Gigante Escala 1:12 con Tracción 4WD y Ruedas Neumáticas de Válvula",
    "slug": "monster-truck-teledirigido-escala-1-12-4wd",
    "searchQuery": "monster truck teledirigido grande ruedas gigantes amortiguadores metalicos rc ninos",
    "category": "7 a 9 Años",
    "subcategory": "Coches RC y Teledirigidos",
    "ageRange": "7-9",
    "gender": "unisex",
    "priceRange": "50-100",
    "priceText": "69,90 €",
    "rating": 4.8,
    "reviewsCount": 7400,
    "badge": "Fuerza Bruta Todoterreno",
    "description": "Un auténtico gigante teledirigido con suspensión de largo recorrido para superar piedras, bordillos y pendientes de hasta 45 grados. Carrocería de aleación ligera serigrafiada y faros LED funcionales para carreras nocturnas.",
    "pros": [
      "Supera obstáculos que paran a otros coches teledirigidos",
      "Motor de alto torque con refrigeración pasiva",
      "Chasis sellado resistente a salpicaduras de agua"
    ],
    "idealFor": "Escapadas al campo, senderos de montaña y playas de arena compacta",
    "style": "classic",
    "imageUrl": "https://images.unsplash.com/photo-1568772585407-9361f9bf3a87?w=700&q=80",
    "images": [
      "https://images.unsplash.com/photo-1568772585407-9361f9bf3a87?w=700&q=80"
    ]
  },
  {
    "id": "79-lego-creator-dinosaurio-trex",
    "asin": "B01KJEOC9Q",
    "title": "LEGO Creator 3 en 1 - Grandes Dinosaurios T-Rex Reconstruible en Triceratops y Pterodáctilo",
    "slug": "lego-creator-3en1-grandes-dinosaurios-trex",
    "searchQuery": "lego creator 3 en 1 grandes dinosaurios trex triceratops pterodactilo piezas",
    "category": "7 a 9 Años",
    "subcategory": "LEGO Creator y Construcción",
    "ageRange": "7-9",
    "gender": "unisex",
    "priceRange": "<20",
    "priceText": "14,99 €",
    "rating": 4.9,
    "reviewsCount": 28000,
    "badge": "Top 1 en Construcción Infantil",
    "description": "El set 3 en 1 más famoso de LEGO: construye un feroz T-Rex con mandíbula articulada con dientes afilados y garras móviles, luego desmóntalo para crear un Triceratops o un Pterodáctilo con alas batientes.",
    "pros": [
      "3 dinosaurios diferentes en una sola caja",
      "Articulaciones en cabeza, cola y patas para exponer en diferentes posturas",
      "Excelente relación calidad-precio por pieza"
    ],
    "idealFor": "Amantes de los dinosaurios, Jurassic Park y la construcción modular",
    "style": "classic",
    "imageUrl": "https://images.unsplash.com/photo-1585366119957-e9730b6d0f60?w=700&q=80",
    "images": [
      "https://images.unsplash.com/photo-1585366119957-e9730b6d0f60?w=700&q=80"
    ]
  },
  {
    "id": "79-gravitrax-starter-set",
    "asin": "B077N44K2T",
    "title": "Ravensburger GraviTrax - Circuito de Canicas Magnético Starter Set de Física y Gravedad",
    "slug": "ravensburger-gravitrax-circuito-canicas-starter-set",
    "searchQuery": "ravensburger gravitrax starter set circuito canicas magnetico stem fisica gravedad canones",
    "category": "7 a 9 Años",
    "subcategory": "LEGO Creator y Construcción",
    "ageRange": "7-9",
    "gender": "unisex",
    "priceRange": "20-50",
    "priceText": "44,99 €",
    "rating": 4.9,
    "reviewsCount": 22000,
    "badge": "El Circuito STEM Más Premiado",
    "description": "Combina bloques hexagonales, rieles y un cañón magnético de Gauss que acelera las canicas de acero desafiando la gravedad. Enseña leyes de la física, cinética y energía potencial mientras construyen pistas infinitas.",
    "pros": [
      "Más de 100 componentes modulares expandibles",
      "Cañón magnético que dispara las canicas cuesta arriba",
      "Fomenta la resolución de problemas lógicos de ingeniería"
    ],
    "idealFor": "Mentes curiosas y futuros ingenieros que adoran los desafíos de física",
    "style": "classic",
    "imageUrl": "https://images.unsplash.com/photo-1587654780291-39c9404d746b?w=700&q=80",
    "images": [
      "https://images.unsplash.com/photo-1587654780291-39c9404d746b?w=700&q=80"
    ]
  },
  {
    "id": "79-lego-creator-castillo-medieval",
    "asin": "B08G4GB1X2",
    "title": "LEGO Creator 3 en 1 - Castillo Medieval con Dragón, Catapulta y 3 Minifiguras",
    "slug": "lego-creator-3en1-castillo-medieval-dragon",
    "searchQuery": "lego creator 3 en 1 castillo medieval dragon torre asedio mercado minifiguras",
    "category": "7 a 9 Años",
    "subcategory": "LEGO Creator y Construcción",
    "ageRange": "7-9",
    "gender": "unisex",
    "priceRange": "50-100",
    "priceText": "99,99 €",
    "rating": 4.9,
    "reviewsCount": 7800,
    "badge": "Castillo Épico Reconstruible",
    "description": "Construye un impresionante castillo de 2 plantas con foso, puente levadizo abatible y torre de vigilancia, o transfórmalo en una torre de asedio con catapulta de disparo o una bulliciosa plaza de mercado.",
    "pros": [
      "Bisagras traseras que abren el castillo para jugar en su interior",
      "Incluye dragón articulado que escupe fuego y 3 caballeros armados",
      "1426 piezas de construcción absorbente"
    ],
    "idealFor": "Horas de construcción profunda e historias medievales épicas",
    "style": "classic",
    "imageUrl": "https://images.unsplash.com/photo-1585366119957-e9730b6d0f60?w=700&q=80",
    "images": [
      "https://images.unsplash.com/photo-1585366119957-e9730b6d0f60?w=700&q=80"
    ]
  },
  {
    "id": "79-magia-borras-100-trucos",
    "asin": "B007X6J8O4",
    "title": "Magia Borrás - Caja Clásica de 100 Trucos de Ilusionismo con Varita Mágica y Sombrero",
    "slug": "magia-borras-caja-clasica-100-trucos-varita",
    "searchQuery": "magia borras 100 trucos ilusionismo caja clasica varita cartas monedas educaborras",
    "category": "7 a 9 Años",
    "subcategory": "Juegos de Magia Borrás",
    "ageRange": "7-9",
    "gender": "unisex",
    "priceRange": "20-50",
    "priceText": "29,99 €",
    "rating": 4.8,
    "reviewsCount": 8400,
    "badge": "El Clásico de la Magia Española",
    "description": "La caja de magia que ha iniciado a generaciones de magos. Incluye la varita mágica, cuerda mágica que se corta y se recompone, copas y bolas que atraviesan la materia, cartas de adivinación y caja de desaparición.",
    "pros": [
      "Libro de instrucciones con dibujos paso a paso muy claros para niños",
      "Desarrolla la oratoria en público, la seguridad escénica y la destreza manual",
      "Trucos con impacto visual inmediato que dejan boquiabiertos a los padres"
    ],
    "idealFor": "Montar espectáculos de magia en las sobremesas familiares y cumpleaños",
    "style": "classic",
    "imageUrl": "/images/products/79-magia-1.jpg",
    "images": [
      "/images/products/79-magia-1.jpg",
      "/images/products/79-magia-2.jpg",
      "/images/products/79-magia-3.jpg"
    ]
  },
  {
    "id": "79-magia-borras-150-trucos",
    "asin": "B007X6J8O5",
    "title": "Magia Borrás - Edición Especial 150 Trucos con Accesorios de Mentalismo y Cartomagia",
    "slug": "magia-borras-edicion-especial-150-trucos",
    "searchQuery": "magia borras 150 trucos edicion especial mentalismo cartomagia ilusionismo avanzado",
    "category": "7 a 9 Años",
    "subcategory": "Juegos de Magia Borrás",
    "ageRange": "7-9",
    "gender": "unisex",
    "priceRange": "20-50",
    "priceText": "36,90 €",
    "rating": 4.8,
    "reviewsCount": 5600,
    "badge": "Más Trucos y Secretos de Escenario",
    "description": "Set ampliado con 150 ilusiones sorprendentes: trucos con anillos enlazados, monedas que se multiplican en la mano del espectador, cartas svengali marcadas y caja de transposición de objetos.",
    "pros": [
      "Mayor variedad de trucos mecánicos y de habilidad manual",
      "Permite armar un espectáculo completo de más de 30 minutos",
      "Materiales resistentes de plástico inyectado y barajas tratadas"
    ],
    "idealFor": "Peques que quieren dar el salto a trucos más profesionales",
    "style": "classic",
    "imageUrl": "https://images.unsplash.com/photo-1544717305-2782549b5136?w=700&q=80",
    "images": [
      "https://images.unsplash.com/photo-1544717305-2782549b5136?w=700&q=80"
    ]
  },
  {
    "id": "79-baraja-magia-bicycle-trucos",
    "asin": "B000050478",
    "title": "Set de Cartomagia con 2 Barajas Bicycle Rider Back Oficiales y Manual de 50 Trucos",
    "slug": "set-cartomagia-barajas-bicycle-rider-back",
    "searchQuery": "baraja bicycle rider back magia cartomagia trucos de cartas manual principiantes",
    "category": "7 a 9 Años",
    "subcategory": "Juegos de Magia Borrás",
    "ageRange": "7-9",
    "gender": "unisex",
    "priceRange": "<20",
    "priceText": "14,95 €",
    "rating": 4.9,
    "reviewsCount": 24000,
    "badge": "La Baraja de los Magos Profesionales",
    "description": "El estándar mundial de los ilusionistas profesionales: baraja Bicycle con acabado Air-Cushion que permite extensiones y mezclas fluidas. Acompañada de guía explicativa con 50 trucos de cartomagia matemáticos y de habilidad.",
    "pros": [
      "Deslizamiento perfecto patentado insustituible por otras barajas",
      "Trucos basados en principios matemáticos que nunca fallan",
      "Desarrolla la memoria de trabajo y la agilidad de los dedos"
    ],
    "idealFor": "Llevar siempre en el bolsillo y dejar atónitos a amigos y familiares",
    "style": "classic",
    "imageUrl": "https://images.unsplash.com/photo-1610890716171-6b1bb98ffd09?w=700&q=80",
    "images": [
      "https://images.unsplash.com/photo-1610890716171-6b1bb98ffd09?w=700&q=80"
    ]
  },
  {
    "id": "79-catan-junior",
    "asin": "B007N0L1X0",
    "title": "Devir - Catan Junior: El Clásico Juego de Estrategia Adaptado a Niños con Barcos y Piratas",
    "slug": "devir-catan-junior-juego-estrategia-pirata",
    "searchQuery": "catan junior devir juego de mesa piratas estrategia familiar barcos guaridas",
    "category": "7 a 9 Años",
    "subcategory": "Juegos de Mesa y Estrategia Familiar",
    "ageRange": "7-9",
    "gender": "unisex",
    "priceRange": "20-50",
    "priceText": "29,95 €",
    "rating": 4.8,
    "reviewsCount": 11200,
    "badge": "El Mejor Juego de Mesa Familiar",
    "description": "La versión infantil oficial del mundialmente premiado Catán. Los jugadores navegan por el archipiélago en barcos piratas, construyen guaridas y comercian con oro, madera, piñas y sables mientras huyen del Capitán Fantasma.",
    "pros": [
      "Partidas dinámicas de 30 minutos sin frustración",
      "Enseña comercio, gestión de recursos y estrategia básica",
      "Tablero de doble cara según el número de jugadores"
    ],
    "idealFor": "Tardes de juegos familiares de estrategia y entretenimiento",
    "style": "classic",
    "imageUrl": "/images/products/79-catan-junior-1.jpg",
    "images": [
      "/images/products/79-catan-junior-1.jpg",
      "/images/products/79-catan-junior-2.jpg",
      "/images/products/79-catan-junior-3.jpg"
    ]
  },
  {
    "id": "79-dixit-juego-de-mesa",
    "asin": "B001OH979W",
    "title": "Asmodee - Dixit: El Juego de Cartas e Imaginación Poética Premiado Juego del Año (Spiel des Jahres)",
    "slug": "asmodee-dixit-juego-de-mesa-imaginacion",
    "searchQuery": "dixit asmodee juego de mesa cartas ilustradas imaginacion pistas conejos puntos",
    "category": "7 a 9 Años",
    "subcategory": "Juegos de Mesa y Estrategia Familiar",
    "ageRange": "7-9",
    "gender": "unisex",
    "priceRange": "20-50",
    "priceText": "31,99 €",
    "rating": 4.9,
    "reviewsCount": 18500,
    "badge": "Juego del Año en Todo el Mundo",
    "description": "84 cartas con ilustraciones oníricas fascinantes. El narrador da una pista poética, musical o una sola palabra, y los demás eligen la carta de su mano que mejor encaja para despistar a los rivales y adivinar la correcta.",
    "pros": [
      "Premia la creatividad, la empatía y la complicidad familiar",
      "Reglas ultra sencillas aptas para niños de 8 años y abuelos de 80",
      "Piezas de madera en forma de conejos de colores en el marcador"
    ],
    "idealFor": "Sobremesas familiares sin conflictos ni competitividad agresiva",
    "style": "creativity",
    "imageUrl": "https://images.unsplash.com/photo-1610890716171-6b1bb98ffd09?w=700&q=80",
    "images": [
      "https://images.unsplash.com/photo-1610890716171-6b1bb98ffd09?w=700&q=80"
    ]
  },
  {
    "id": "79-fantasma-blitz",
    "asin": "B0043WE3F4",
    "title": "Devir - Fantasma Blitz: El Juego de Reflejos Mentales Rápidos con Figuras de Madera",
    "slug": "devir-fantasma-blitz-juego-reflejos-mentales",
    "searchQuery": "fantasma blitz devir juego de mesa figuras de madera rapidez mental reflejos ninos",
    "category": "7 a 9 Años",
    "subcategory": "Juegos de Mesa y Estrategia Familiar",
    "ageRange": "7-9",
    "gender": "unisex",
    "priceRange": "<20",
    "priceText": "15,95 €",
    "rating": 4.8,
    "reviewsCount": 9400,
    "badge": "Risas y Reflejos a Toda Velocidad",
    "description": "5 figuras de madera en el centro de la mesa (fantasma blanco, sillón rojo, botella verde, libro azul y ratón gris). Se descubre una carta y hay que coger al vuelo el objeto exacto... ¡o el que no coincide ni en forma ni en color!",
    "pros": [
      "Gimnasia cerebral trepidante que engancha al segundo de empezar",
      "Piezas de madera pulida muy agradables al tacto",
      "Los niños suelen ganar a los adultos por su mayor velocidad de procesamiento visual"
    ],
    "idealFor": "Risas aseguradas y piques amistosos en familia",
    "style": "classic",
    "imageUrl": "https://images.unsplash.com/photo-1544717305-2782549b5136?w=700&q=80",
    "images": [
      "https://images.unsplash.com/photo-1544717305-2782549b5136?w=700&q=80"
    ]
  },
  {
    "id": "79-los-compas-diamantito-legendario",
    "asin": "8427045141",
    "title": "Los Compas y el Diamantito Legendario - Mikecrack, El Trollino y Timba Vk (Cómic Tapa Dura)",
    "slug": "los-compas-y-el-diamantito-legendario-mikecrack",
    "searchQuery": "los compas y el diamantito legendario mikecrack trollino timba comic infantil mr ediciones",
    "category": "7 a 9 Años",
    "subcategory": "Libros y Cómics Infantiles",
    "ageRange": "7-9",
    "gender": "unisex",
    "priceRange": "<20",
    "priceText": "16,90 €",
    "rating": 4.9,
    "reviewsCount": 22000,
    "badge": "El Cómic Más Leído por Niños en España",
    "description": "Mike, Timba y Trolli se van de vacaciones a una isla paradisíaca pero acaban envueltos en la búsqueda del diamantito legendario enfrentándose a trampas y titanes. Humor descacharrante e ilustraciones a todo color.",
    "pros": [
      "Consigue que niños que odian leer devoren páginas sin parar",
      "Ilustraciones tipo viñeta dinámica de gran impacto visual",
      "Encuadernación de lujo con portada en relieve metalizado"
    ],
    "idealFor": "Fomentar el hábito de la lectura autónoma en Primaria",
    "style": "kids",
    "imageUrl": "https://images.unsplash.com/photo-1544717305-2782549b5136?w=700&q=80",
    "images": [
      "https://images.unsplash.com/photo-1544717305-2782549b5136?w=700&q=80"
    ]
  },
  {
    "id": "79-isadora-moon-va-al-colegio",
    "asin": "842048560X",
    "title": "Isadora Moon Va al Colegio - Harriet Muncaster (Mitad Hada, Mitad Vampiro con Purpurina)",
    "slug": "isadora-moon-va-al-colegio-harriet-muncaster",
    "searchQuery": "isadora moon va al colegio harriet muncaster alfaguara infantil purpurina",
    "category": "7 a 9 Años",
    "subcategory": "Libros y Cómics Infantiles",
    "ageRange": "7-9",
    "gender": "unisex",
    "priceRange": "<20",
    "priceText": "10,95 €",
    "rating": 4.9,
    "reviewsCount": 16500,
    "badge": "El Éxito Editorial de Primeros Lectores",
    "description": "Su mamá es un hada y su papá un vampiro, y ella tiene un poquito de los dos. Le encanta la noche, los murciélagos y su tutú negro, pero también el sol, las varitas mágicas y su conejo rosa Pinky. ¿A qué colegio debería ir?",
    "pros": [
      "Ilustraciones en rosa y negro con toques de purpurina mágica en cada página",
      "Capítulos cortos con letra grande y clara ideales para leer solos",
      "Personaje entrañable que celebra ser diferente"
    ],
    "idealFor": "La transición de cuentos infantiles a primeras novelas juveniles",
    "style": "kids",
    "imageUrl": "https://images.unsplash.com/photo-1512820790803-83ca734da794?w=700&q=80",
    "images": [
      "https://images.unsplash.com/photo-1512820790803-83ca734da794?w=700&q=80"
    ]
  },
  {
    "id": "79-anna-kadabra-club-luna-llena",
    "asin": "840822323X",
    "title": "Anna Kadabra 1: El Club de la Luna Llena - Pedro Mañas y David Sierra Listón",
    "slug": "anna-kadabra-1-el-club-de-la-luna-llena",
    "searchQuery": "anna kadabra el club de la luna llena pedro manas david sierra destino infantil brujas",
    "category": "7 a 9 Años",
    "subcategory": "Libros y Cómics Infantiles",
    "ageRange": "7-9",
    "gender": "unisex",
    "priceRange": "<20",
    "priceText": "10,95 €",
    "rating": 4.9,
    "reviewsCount": 14800,
    "badge": "La Serie de Magia Favorita en Colegios",
    "description": "Anna se muda con sus padres a Moonville, un pueblo viejo en medio del bosque lleno de secretos... ¡donde descubre que ella misma es una bruja con poderes mágicos y es admitida en el club secreto de la luna llena!",
    "pros": [
      "Letra grande y tipografía amigable diseñada para lectores de 7 a 9 años",
      "Dibujos espectaculares en todas las páginas llenos de color y ritmo",
      "Tramas llenas de misterio, amistad y mascotas mágicas"
    ],
    "idealFor": "Lectura nocturna antes de dormir que engancha desde el primer capítulo",
    "style": "kids",
    "imageUrl": "https://images.unsplash.com/photo-1589829085413-56de8ae18c73?w=700&q=80",
    "images": [
      "https://images.unsplash.com/photo-1589829085413-56de8ae18c73?w=700&q=80"
    ]
  },
  {
    "id": "79-kit-pulseras-gomas-telar",
    "asin": "B07MVD9W03",
    "title": "Mega Maletín de Telar con 11.000 Gomas Elásticas, Abalorios, Cierres y Telares para Pulseras",
    "slug": "mega-maletin-telar-11000-gomas-pulseras-abalorios",
    "searchQuery": "maletin gomitas pulseras telar loom bands 11000 gomas colgantes manualidades ninos",
    "category": "7 a 9 Años",
    "subcategory": "Manualidades y Kits Creativos",
    "ageRange": "7-9",
    "gender": "unisex",
    "priceRange": "<20",
    "priceText": "18,99 €",
    "rating": 4.8,
    "reviewsCount": 21000,
    "badge": "Creatividad Total sin Pantallas",
    "description": "Caja organizadora de 3 niveles repleta de gomas elásticas libres de látex y plomo en 28 colores distintos, letras para escribir nombres, dijes colgantes, ganchos y telares para tejer pulseras de amistad y collares.",
    "pros": [
      "Horas de entretenimiento concentrado que desconecta de las pantallas",
      "Gomas de alta elasticidad que no se rompen al trenzar",
      "Maletín con compartimentos para tener todo recogido y ordenado"
    ],
    "idealFor": "Hacer regalos hechos a mano a amigos y familiares en el recreo",
    "style": "creativity",
    "imageUrl": "https://images.unsplash.com/photo-1596461404969-9ae70f2830c1?w=700&q=80",
    "images": [
      "https://images.unsplash.com/photo-1596461404969-9ae70f2830c1?w=700&q=80"
    ]
  },
  {
    "id": "79-kit-costura-peluches-fieltro",
    "asin": "B07MVD9W04",
    "title": "Kit de Primeros Pasos en Costura Infantil para Crear 6 Peluches de Fieltro con Agujas Seguras",
    "slug": "kit-primeros-pasos-costura-infantil-peluches-fieltro",
    "searchQuery": "kit costura infantil peluches fieltro agujas plastico seguras manualidades ninos",
    "category": "7 a 9 Años",
    "subcategory": "Manualidades y Kits Creativos",
    "ageRange": "7-9",
    "gender": "unisex",
    "priceRange": "<20",
    "priceText": "16,95 €",
    "rating": 4.8,
    "reviewsCount": 7900,
    "badge": "Aprende a Coser sin Pinchazos",
    "description": "Kit completo con agujas de punta redonda de plástico y piezas de fieltro precortadas con orificios perforados para coser 6 simpáticos animalitos (oso, zorro, búho, conejito) y rellenarlos de algodón.",
    "pros": [
      "Agujas seguras de plástico con las que es imposible pincharse",
      "Agujeros pre-taladrados en el fieltro que facilitan la puntada recta",
      "Incluye todo: hilos de colores, relleno esponjoso y tijeras infantiles"
    ],
    "idealFor": "Desarrollar la paciencia, la precisión motriz y el orgullo de crear sus propios peluches",
    "style": "creativity",
    "imageUrl": "https://images.unsplash.com/photo-1513364776144-60967b0f800f?w=700&q=80",
    "images": [
      "https://images.unsplash.com/photo-1513364776144-60967b0f800f?w=700&q=80"
    ]
  },
  {
    "id": "79-fabrica-slime-diy-sin-borax",
    "asin": "B07MVD9W05",
    "title": "So Slime DIY - Fábrica de Slime sin Pegamento Ni Bórax con Purpurinas y Aromas Mágicos",
    "slug": "so-slime-diy-fabrica-slime-sin-borax-pegamento",
    "searchQuery": "so slime diy fabrica de slime sin pegamento sin borax purpurinas agitador figuras",
    "category": "7 a 9 Años",
    "subcategory": "Manualidades y Kits Creativos",
    "ageRange": "7-9",
    "gender": "unisex",
    "priceRange": "20-50",
    "priceText": "27,99 €",
    "rating": 4.7,
    "reviewsCount": 11400,
    "badge": "100% Sin Bórax Ni Pegamento",
    "description": "La forma más limpia y segura de fabricar slime: polvo 100% natural a base de algas al que solo hay que añadir agua en la batidora mecánica, girar la manivela y decorar con confeti, purpurina y figuritas sorpresa coleccionables.",
    "pros": [
      "Cero químicos peligrosos ni pegamentos tóxicos",
      "La estación agitadora evita derrames en la mesa",
      "Texturas elásticas aromáticas súper satisfactorias"
    ],
    "idealFor": "Experimentos sensoriales seguros en tardes de cumpleaños",
    "style": "creativity",
    "imageUrl": "https://images.unsplash.com/photo-1596461404969-9ae70f2830c1?w=700&q=80",
    "images": [
      "https://images.unsplash.com/photo-1596461404969-9ae70f2830c1?w=700&q=80"
    ]
  },
  {
    "id": "79-colonia-lacoste-junior-fresca",
    "asin": "B07MVD9W06",
    "title": "Lacoste L.12.12 Pour Lui Blanc Eau de Toilette Fresca 50ml con Notas Cítricas y Amaderadas",
    "slug": "lacoste-l1212-blanc-eau-de-toilette-50ml",
    "searchQuery": "lacoste l1212 blanc eau de toilette 50ml perfume fresco juvenil masculino original",
    "category": "7 a 9 Años",
    "subcategory": "Colonias y Cuidado Personal Infantil",
    "ageRange": "7-9",
    "gender": "boy",
    "priceRange": "20-50",
    "priceText": "38,50 €",
    "rating": 4.8,
    "reviewsCount": 14500,
    "badge": "Frescura Deportiva Impecable",
    "description": "Inspirada en el mítico polo blanco de tenis de Lacoste: una salida limpia y chispeante de pomelo, cardamomo y romero que evoluciona hacia un corazón floral suave con fondo de cedro y cuero limpio.",
    "pros": [
      "Sensación deportiva de polo recién lavado",
      "Fórmula ligera que no resulta pesada para niños en Primaria",
      "Frasco blanco lacado con el emblemático cocodrilo bordado"
    ],
    "idealFor": "Ocasiones especiales, celebraciones de comunión y fines de semana",
    "style": "classic",
    "imageUrl": "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=700&q=80",
    "images": [
      "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=700&q=80"
    ]
  },
  {
    "id": "79-lip-smacker-balsamos-sabores",
    "asin": "B07MVD9W07",
    "title": "Lip Smacker - Lata Metálica Coleccionable con 8 Bálsamos Labiales con Sabores a Frutas y Refrescos",
    "slug": "lip-smacker-lata-metalica-8-balsamos-labiales",
    "searchQuery": "lip smacker lata metalica 8 balsamos labiales sabores coca cola fanta frutas hidratacion",
    "category": "7 a 9 Años",
    "subcategory": "Colonias y Cuidado Personal Infantil",
    "ageRange": "7-9",
    "gender": "unisex",
    "priceRange": "<20",
    "priceText": "13,99 €",
    "rating": 4.8,
    "reviewsCount": 16900,
    "badge": "Sabores Auténticos e Hidratación",
    "description": "La mítica marca estadounidense de bálsamos labiales: manteca de karité y aceites emolientes con aromas oficiales de Coca-Cola, Fanta Naranja, Fresa, Algodón de Azúcar y Vainilla en una preciosa lata de coleccionista.",
    "pros": [
      "Protege los labios del frío y el viento evitando grietas en invierno",
      "Aromas deliciosos que huelen como la bebida real sin dejar color artificial",
      "Lata metálica vintage reutilizable para guardar pequeños tesoros"
    ],
    "idealFor": "Llevar en el estuche del colegio y cuidar los labios con una sonrisa",
    "style": "kids",
    "imageUrl": "https://images.unsplash.com/photo-1596461404969-9ae70f2830c1?w=700&q=80",
    "images": [
      "https://images.unsplash.com/photo-1596461404969-9ae70f2830c1?w=700&q=80"
    ]
  },
  {
    "id": "79-tous-neceser-colonia-kids",
    "asin": "B07MVD9W08",
    "title": "Tous Kids - Estuche de Regalo con Agua de Colonia 100ml + Neceser Escolar Juvenil",
    "slug": "tous-kids-estuche-regalo-colonia-neceser",
    "searchQuery": "tous kids estuche regalo colonia 100ml neceser infantil ninos ninas perfume",
    "category": "7 a 9 Años",
    "subcategory": "Colonias y Cuidado Personal Infantil",
    "ageRange": "7-9",
    "gender": "unisex",
    "priceRange": "20-50",
    "priceText": "39,90 €",
    "rating": 4.9,
    "reviewsCount": 6800,
    "badge": "El Estuche de Regalo Perfecto",
    "description": "Pack prémium de presentación en caja joya que contiene el frasco de 100ml de la colonia infantil Tous y un exclusivo neceser de tela con cremallera y forro impermeable ideal para excursiones y viajes.",
    "pros": [
      "Neceser de alta calidad multiusos para el baño o el cole",
      "La fragancia más regalada y celebrada en cumpleaños y comuniones",
      "Embalaje de lujo listo para obsequiar sin envolver"
    ],
    "idealFor": "El regalo con el que siempre se acierta",
    "style": "classic",
    "imageUrl": "https://images.unsplash.com/photo-1594035910387-fea47794261f?w=700&q=80",
    "images": [
      "https://images.unsplash.com/photo-1594035910387-fea47794261f?w=700&q=80"
    ]
  },
  {
    "id": "79-reloj-digital-deportivo-50m",
    "asin": "B07MVD9W09",
    "title": "Reloj Digital Deportivo Infantil Resistente al Agua 50M con Cronómetro, Alarma y Luz LED",
    "slug": "reloj-digital-deportivo-infantil-sumergible-50m",
    "searchQuery": "reloj digital deportivo infantil sumergible 50 metros luz alarma cronometro ninos",
    "category": "7 a 9 Años",
    "subcategory": "Moda y Ropa Deportiva Infantil",
    "ageRange": "7-9",
    "gender": "unisex",
    "priceRange": "<20",
    "priceText": "16,95 €",
    "rating": 4.7,
    "reviewsCount": 15400,
    "badge": "100% Sumergible en Piscina y Playa",
    "description": "Diseñado para resistir los juegos más intensos: cristal de resina transparente de alta dureza anti-rayaduras, correa de poliuretano flexible y estanqueidad 5 ATM para ducharse o nadar en la piscina sin quitárselo.",
    "pros": [
      "Luz de fondo electroluminiscente de 7 colores seleccionables",
      "Aprender a leer la hora digital, usar el cronómetro en carreras y alarma",
      "Muy ligero y cómodo en muñecas pequeñas"
    ],
    "idealFor": "Primer reloj de muñeca para el colegio y actividades deportivas",
    "style": "classic",
    "imageUrl": "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=700&q=80",
    "images": [
      "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=700&q=80"
    ]
  },
  {
    "id": "79-gorra-deportiva-ajustable-uv",
    "asin": "B07MVD9W10",
    "title": "Gorra Deportiva Infantil con Visera Curva y Protección Solar UPF 50+ Ajustable",
    "slug": "gorra-deportiva-infantil-proteccion-uv-ajustable",
    "searchQuery": "gorra deportiva infantil ninos beisbol transpirable proteccion solar uv algodon",
    "category": "7 a 9 Años",
    "subcategory": "Moda y Ropa Deportiva Infantil",
    "ageRange": "7-9",
    "gender": "unisex",
    "priceRange": "<20",
    "priceText": "14,90 €",
    "rating": 4.8,
    "reviewsCount": 9800,
    "badge": "Protección Solar y Estilo",
    "description": "Confeccionada en sarga de algodón 100% transpirable con ojales bordados de ventilación y visera precurvada que protege los ojos y la cara del sol intenso. Cierre metálico trasero deslizante para un ajuste milimétrico.",
    "pros": [
      "Banda interior absorbente que retiene el sudor al correr",
      "Talla adaptable que acompaña el crecimiento de los 6 a los 11 años",
      "Diseño limpio y moderno que combina con cualquier chándal"
    ],
    "idealFor": "Excursiones al aire libre, campamentos y deportes escolares",
    "style": "classic",
    "imageUrl": "https://images.unsplash.com/photo-1588850561407-ed78c282e89b?w=700&q=80",
    "images": [
      "https://images.unsplash.com/photo-1588850561407-ed78c282e89b?w=700&q=80"
    ]
  },
  {
    "id": "79-mochila-escolar-juvenil-estuche",
    "asin": "B07MVD9W11",
    "title": "Mochila Escolar Infantil Ergonómica con Respaldo Acolchado Transpirable y Estuche a Juego",
    "slug": "mochila-escolar-infantil-ergonomica-estuche",
    "searchQuery": "mochila escolar infantil ergonomica acolchada estuche a juego primaria resistente agua",
    "category": "7 a 9 Años",
    "subcategory": "Moda y Ropa Deportiva Infantil",
    "ageRange": "7-9",
    "gender": "unisex",
    "priceRange": "20-50",
    "priceText": "29,99 €",
    "rating": 4.8,
    "reviewsCount": 12100,
    "badge": "Ergonomía Escolar para la Espalda",
    "description": "Mochila diseñada para repartir el peso de libros y carpetas de Primaria gracias a sus tirantes anchos en forma de S y panel dorsal con malla transpirable antifatiga. Tejido de poliéster 600D repelente al agua.",
    "pros": [
      "Costuras reforzadas en puntos de tensión que aguantan todo el curso",
      "Compartimento acolchado para tablet o carpetas A4 grandes",
      "Bolsillos laterales elásticos para la botella de agua"
    ],
    "idealFor": "La vuelta al cole en Primaria con comodidad y ligereza",
    "style": "kids",
    "imageUrl": "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=700&q=80",
    "images": [
      "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=700&q=80"
    ]
  },
  {
    "id": "1012-virus-juego-de-cartas",
    "asin": "B0149A5N6C",
    "title": "Tranjis Games - Virus!: El Juego de Cartas Más Contagioso y Adictivo en España",
    "slug": "tranjis-games-virus-juego-cartas",
    "searchQuery": "virus juego de cartas tranjis games oficial organos virus medicinas",
    "category": "10 a 12 Años",
    "subcategory": "Juegos de Cartas Competitivos (Virus!)",
    "ageRange": "10-12",
    "gender": "unisex",
    "priceRange": "<20",
    "priceText": "14,95 €",
    "rating": 4.9,
    "reviewsCount": 42000,
    "badge": "El Juego Más Vendido de la Historia en España",
    "description": "Enfréntate a la pandemia y sé el primero en aislar un cuerpo sano con 4 órganos limpios mientras infectas, extirpas o robas los órganos de tus rivales con virus y tratamientos médicos.",
    "pros": [
      "Partidas rápidas y trepidantes de 15 minutos llenas de interacción y revanchas",
      "Reglas sencillas que enganchan tanto a preadolescentes como a padres y amigos",
      "Formato de bolsillo para llevar al colegio, parque, piscina o viajes"
    ],
    "idealFor": "Piques divertidos, tardes con amigos y sobremesas familiares",
    "style": "classic",
    "imageUrl": "/images/products/1012-virus-1.jpg",
    "images": [
      "/images/products/1012-virus-1.jpg",
      "/images/products/1012-virus-2.jpg",
      "/images/products/1012-virus-3.jpg"
    ]
  },
  {
    "id": "1012-virus-2-evolution",
    "asin": "B07MVD9W12",
    "title": "Tranjis Games - Virus! 2 Evolution: La Expansión con Virus Mutados y Órganos Biónicos",
    "slug": "tranjis-games-virus-2-evolution-expansion",
    "searchQuery": "virus 2 evolution tranjis games expansion cartas virus mutados organos bionicos",
    "category": "10 a 12 Años",
    "subcategory": "Juegos de Cartas Competitivos (Virus!)",
    "ageRange": "10-12",
    "gender": "unisex",
    "priceRange": "<20",
    "priceText": "12,95 €",
    "rating": 4.9,
    "reviewsCount": 16800,
    "badge": "La Expansión Más Esperada",
    "description": "Los virus han mutado y son más resistentes: ahora necesitas vacunas experimentales para frenarlos, puedes poner en cuarentena a tus rivales o implantar órganos biónicos imposibles de infectar.",
    "pros": [
      "Añade una capa de estrategia competitiva más profunda al juego original",
      "Nuevas cartas de acción como el Traje Protector o el Desliz Médico",
      "Requiere una copia del juego Virus! original"
    ],
    "idealFor": "Fans del juego Virus! que quieren llevar la emoción al siguiente nivel",
    "style": "classic",
    "imageUrl": "https://images.unsplash.com/photo-1610890716171-6b1bb98ffd09?w=700&q=80",
    "images": [
      "https://images.unsplash.com/photo-1610890716171-6b1bb98ffd09?w=700&q=80"
    ]
  },
  {
    "id": "1012-exploding-kittens-original",
    "asin": "B010TQY7A8",
    "title": "Exploding Kittens - Juego de Cartas de Ruleta Rusa con Gatos, Punteros Láser y Cabras Mágicas",
    "slug": "exploding-kittens-juego-cartas-ruleta-rusa-gatitos",
    "searchQuery": "exploding kittens juego de cartas espanol ruleta rusa gatitos explosivos asmodee",
    "category": "10 a 12 Años",
    "subcategory": "Juegos de Cartas Competitivos (Virus!)",
    "ageRange": "10-12",
    "gender": "unisex",
    "priceRange": "20-50",
    "priceText": "21,99 €",
    "rating": 4.8,
    "reviewsCount": 36000,
    "badge": "Fenómeno Mundial Kickstarter",
    "description": "Una versión gatuna y humorística de la ruleta rusa. Los jugadores van robando cartas hasta que a alguien le sale un Gatito Explosivo y vuela por los aires... ¡a menos que tenga una carta de Desactivación con puntero láser o caricias en la barriga!",
    "pros": [
      "Tensión desternillante hasta el último segundo de la partida",
      "Ilustraciones surrealistas creadas por The Oatmeal",
      "Se aprende a jugar en 2 minutos"
    ],
    "idealFor": "Reuniones de amigos, fiestas de cumpleaños y campamentos",
    "style": "classic",
    "imageUrl": "https://images.unsplash.com/photo-1610890716171-6b1bb98ffd09?w=700&q=80",
    "images": [
      "https://images.unsplash.com/photo-1610890716171-6b1bb98ffd09?w=700&q=80"
    ]
  },
  {
    "id": "1012-potensic-a20-dron",
    "asin": "B075VQ8V9B",
    "title": "Potensic A20 - Minidron Infantil con Protectores Integrados Anticolisión y Control de Altura",
    "slug": "potensic-a20-minidron-infantil-anticolision",
    "searchQuery": "potensic a20 dron infantil minidron facil volar helices protegidas interior",
    "category": "10 a 12 Años",
    "subcategory": "Drones RC y Robótica STEM",
    "ageRange": "10-12",
    "gender": "unisex",
    "priceRange": "20-50",
    "priceText": "39,99 €",
    "rating": 4.7,
    "reviewsCount": 19800,
    "badge": "El Mejor Dron de Iniciación Infantil",
    "description": "Despega y aterriza pulsando una sola tecla. Gracias a su sensor barométrico de altitud se mantiene suspendido flotando en el aire sin caerse, ideal para aprender a pilotar dentro del salón sin peligro.",
    "pros": [
      "Protectores de hélice enjaulados 360° que no dañan muebles ni dedos",
      "Incluye 3 baterías modulares para volar hasta 21 minutos",
      "Modo sin cabeza (Headless) que orienta los mandos según el piloto"
    ],
    "idealFor": "Pilotos novatos que quieren aprender acrobacias aéreas en casa",
    "style": "tech",
    "imageUrl": "/images/products/1012-dron-1.jpg",
    "images": [
      "/images/products/1012-dron-1.jpg",
      "/images/products/1012-dron-2.jpg",
      "/images/products/1012-dron-3.jpg"
    ]
  },
  {
    "id": "1012-makeblock-mbot-robot",
    "asin": "B07MVD9W13",
    "title": "Makeblock mBot - Robot Educativo Programable con Scratch y Bluetooth para Niños y Colegios",
    "slug": "makeblock-mbot-robot-educativo-programable",
    "searchQuery": "makeblock mbot robot programable scratch arduino bluetooth stem ninos colegios",
    "category": "10 a 12 Años",
    "subcategory": "Drones RC y Robótica STEM",
    "ageRange": "10-12",
    "gender": "unisex",
    "priceRange": "50-100",
    "priceText": "89,95 €",
    "rating": 4.8,
    "reviewsCount": 5200,
    "badge": "El Robot Educativo Oficial en Aulas STEM",
    "description": "Se monta en 30 minutos con destornillador y piezas de aluminio anodizado. Integra sensor de ultrasonidos anticolisión, seguidor de líneas negras por infrarrojos y módulo Bluetooth para programar misiones desde tablet o PC con bloques Scratch.",
    "pros": [
      "Aprender lógica de programación real jugando",
      "Chasis de aluminio resistente compatible con piezas de LEGO",
      "Aplicación móvil con juegos guiados y control remoto"
    ],
    "idealFor": "Jóvenes curiosos que adoran la informática, la ciencia y la tecnología",
    "style": "tech",
    "imageUrl": "https://images.unsplash.com/photo-1544717305-2782549b5136?w=700&q=80",
    "images": [
      "https://images.unsplash.com/photo-1544717305-2782549b5136?w=700&q=80"
    ]
  },
  {
    "id": "1012-telescopio-astronomico-movil",
    "asin": "B07MVD9W14",
    "title": "Telescopio Astronómico Refractor 70mm con Trípode Ajustable, 2 Oculares y Adaptador de Móvil",
    "slug": "telescopio-astronomico-70mm-tripode-adaptador-movil",
    "searchQuery": "telescopio astronomico 70mm principiantes luna planetas tripode adaptador movil ninos",
    "category": "10 a 12 Años",
    "subcategory": "Drones RC y Robótica STEM",
    "ageRange": "10-12",
    "gender": "unisex",
    "priceRange": "50-100",
    "priceText": "74,99 €",
    "rating": 4.7,
    "reviewsCount": 8600,
    "badge": "Observa los Cráteres de la Luna",
    "description": "Óptica de cristal con recubrimiento multicapa de 70 mm de apertura que ofrece imágenes nítidas y brillantes de los cráteres lunares, los anillos de Saturno y las lunas de Júpiter. Incluye soporte para acoplar el smartphone y fotografiar el cielo.",
    "pros": [
      "Adaptador universal para smartphone que permite hacer fotos de la luna",
      "Trípode de aluminio estable regulable en altura con bandeja portaoculares",
      "Bolsa de transporte acolchada para salir al campo o a la montaña"
    ],
    "idealFor": "Noches de verano observando estrellas, eclipses y constelaciones",
    "style": "tech",
    "imageUrl": "https://images.unsplash.com/photo-1506703719100-a0f3a48c0f86?w=700&q=80",
    "images": [
      "https://images.unsplash.com/photo-1506703719100-a0f3a48c0f86?w=700&q=80"
    ]
  },
  {
    "id": "1012-carcassonne-juego-mesa",
    "asin": "B007X6J8O6",
    "title": "Devir - Carcassonne: El Mítico Juego de Estrategia Medieval de Losetas, Ciudades y Caminos",
    "slug": "devir-carcassonne-juego-mesa-medieval-losetas",
    "searchQuery": "carcassonne devir juego de mesa losetas meeples estrategia medieval spiel des jahres",
    "category": "10 a 12 Años",
    "subcategory": "Juegos de Mesa y Escape Room",
    "ageRange": "10-12",
    "gender": "unisex",
    "priceRange": "20-50",
    "priceText": "26,95 €",
    "rating": 4.9,
    "reviewsCount": 19400,
    "badge": "El Rey de los Juegos de Losetas",
    "description": "Los jugadores van robando losetas para construir el mapa medieval de Carcasona: expandiendo caminos, amurallando fortalezas y gobernando monasterios mientras colocan sus famosos seguidores de madera (meeples) estratégicamente.",
    "pros": [
      "Partidas siempre diferentes porque el tablero se crea desde cero cada vez",
      "Fácil de aprender pero con una profundidad táctica infinita",
      "Incluye las expansiones de El Río y El Abad en la caja base"
    ],
    "idealFor": "Tardes de fin de semana con amigos y familia donde cada decisión cuenta",
    "style": "classic",
    "imageUrl": "https://images.unsplash.com/photo-1610890716171-6b1bb98ffd09?w=700&q=80",
    "images": [
      "https://images.unsplash.com/photo-1610890716171-6b1bb98ffd09?w=700&q=80"
    ]
  },
  {
    "id": "1012-escape-room-the-game-familiar",
    "asin": "B07MVD9W15",
    "title": "Diset - Escape Room The Game: 4 Aventuras Temáticas con Decodificador Cronológico y Pistas",
    "slug": "diset-escape-room-the-game-4-aventuras-decodificador",
    "searchQuery": "diset escape room the game familiar decodificador crono pistas enigmas acertijos",
    "category": "10 a 12 Años",
    "subcategory": "Juegos de Mesa y Escape Room",
    "ageRange": "10-12",
    "gender": "unisex",
    "priceRange": "20-50",
    "priceText": "34,95 €",
    "rating": 4.8,
    "reviewsCount": 11800,
    "badge": "La Experiencia de Escape Room en Casa",
    "description": "60 minutos en la cuenta atrás del decodificador electrónico para resolver enigmas, códigos matemáticos y acertijos lógicos. 4 aventuras completas de dificultad creciente: Prisión, Virus, Cuenta Atrás y El Templo Azteca.",
    "pros": [
      "Decodificador electrónico con llaves físicas que confirman si el código es correcto",
      "Fomenta el trabajo en equipo, la lógica deductiva y la comunicación bajo presión",
      "Banda sonora envolvente disponible en la app oficial gratuita"
    ],
    "idealFor": "Fiestas con amigos, cumpleaños y tardes de misterio colaborativo",
    "style": "classic",
    "imageUrl": "https://images.unsplash.com/photo-1544717305-2782549b5136?w=700&q=80",
    "images": [
      "https://images.unsplash.com/photo-1544717305-2782549b5136?w=700&q=80"
    ]
  },
  {
    "id": "1012-7-wonders-architects",
    "asin": "B09J5F29B8",
    "title": "Asmodee - 7 Wonders Architects: Construye una de las 7 Maravillas del Mundo Antiguo",
    "slug": "asmodee-7-wonders-architects-juego-estrategia",
    "searchQuery": "7 wonders architects asmodee juego de mesa maravillas civilizaciones cartas",
    "category": "10 a 12 Años",
    "subcategory": "Juegos de Mesa y Escape Room",
    "ageRange": "10-12",
    "gender": "unisex",
    "priceRange": "20-50",
    "priceText": "36,99 €",
    "rating": 4.9,
    "reviewsCount": 8700,
    "badge": "Premios As d'Or Juego del Año",
    "description": "Compite por construir tu Maravilla del mundo antiguo pieza por pieza en 3D antes que los demás: consigue recursos de cantera, lidera batallas militares y gana avances científicos en partidas dinámicas de 25 minutos.",
    "pros": [
      "Componentes de cartón troquelado 3D espectaculares que se van montando",
      "Reglas muy ágiles sin entreturno aburrido: todo el mundo juega rápido",
      "Bandejas organizadoras exclusivas para sacar a la mesa en 1 minuto"
    ],
    "idealFor": "Preadolescentes que buscan un juego de civilizaciones moderno y visual",
    "style": "classic",
    "imageUrl": "https://images.unsplash.com/photo-1610890716171-6b1bb98ffd09?w=700&q=80",
    "images": [
      "https://images.unsplash.com/photo-1610890716171-6b1bb98ffd09?w=700&q=80"
    ]
  },
  {
    "id": "1012-diario-de-greg-1",
    "asin": "8427200783",
    "title": "Diario de Greg 1: Un Pringao Total - Jeff Kinney (El Bestseller Mundial Ilustrado Tapa Dura)",
    "slug": "diario-de-greg-1-un-pringao-total-jeff-kinney",
    "searchQuery": "diario de greg 1 un pringao total jeff kinney rba molino libro infantil novela",
    "category": "10 a 12 Años",
    "subcategory": "Libros Juveniles y Cómics",
    "ageRange": "10-12",
    "gender": "unisex",
    "priceRange": "<20",
    "priceText": "14,25 €",
    "rating": 4.9,
    "reviewsCount": 38000,
    "badge": "Más de 250 Millones de Ejemplares Vendidos",
    "description": "Greg Heffley empieza la enseñanza secundaria y decide plasmar en su diario (¡que no es un diario de chicas!) cómo sobrevivir a los matones del pasillo, a su insoportable hermano mayor Rodrick y a la maldición del Queso del patio.",
    "pros": [
      "Humor tronchante que conecta de inmediato con cualquier chico de 10 a 12 años",
      "Texto en caligrafía juvenil intercalado con viñetas de cómic en cada página",
      "La puerta de entrada infalible para no lectores"
    ],
    "idealFor": "Risas garantizadas en la cama antes de apagar la luz",
    "style": "classic",
    "imageUrl": "https://images.unsplash.com/photo-1544717305-2782549b5136?w=700&q=80",
    "images": [
      "https://images.unsplash.com/photo-1544717305-2782549b5136?w=700&q=80"
    ]
  },
  {
    "id": "1012-harry-potter-piedra-filosofal",
    "asin": "849838708X",
    "title": "Harry Potter y la Piedra Filosofal - J.K. Rowling (Edición Especial Salamandra Juvenil)",
    "slug": "harry-potter-y-la-piedra-filosofal-salamandra",
    "searchQuery": "harry potter y la piedra filosofal salamandra tapa dura novela magica hogwarts",
    "category": "10 a 12 Años",
    "subcategory": "Libros Juveniles y Cómics",
    "ageRange": "10-12",
    "gender": "unisex",
    "priceRange": "<20",
    "priceText": "15,20 €",
    "rating": 4.9,
    "reviewsCount": 45000,
    "badge": "El Clásico de la Literatura Fantástica",
    "description": "El día en que cumple once años, Harry Potter se entera de que es hijo de dos destacados hechiceros y de que él mismo posee poderes mágicos. En el Colegio Hogwarts de Magia y Hechicería descubrirá la verdad sobre su pasado y su destino.",
    "pros": [
      "La saga que ha marcado la infancia de millones de personas en todo el mundo",
      "Valores de amistad inquebrantable, valentía, superación y lealtad",
      "Traducción clásica impecable de Salamandra"
    ],
    "idealFor": "Descubrir el andén 9 y 3/4 a la edad perfecta",
    "style": "classic",
    "imageUrl": "https://images.unsplash.com/photo-1512820790803-83ca734da794?w=700&q=80",
    "images": [
      "https://images.unsplash.com/photo-1512820790803-83ca734da794?w=700&q=80"
    ]
  },
  {
    "id": "1012-invisible-eloy-moreno",
    "asin": "8466352907",
    "title": "Invisible - Eloy Moreno (La Emotiva Novela Recomendada en Todos los Institutos de España)",
    "slug": "invisible-eloy-moreno-novela-nube-de-tinta",
    "searchQuery": "invisible eloy moreno nube de tinta novela acoso escolar empatia institutos",
    "category": "10 a 12 Años",
    "subcategory": "Libros Juveniles y Cómics",
    "ageRange": "10-12",
    "gender": "unisex",
    "priceRange": "<20",
    "priceText": "16,10 €",
    "rating": 4.9,
    "reviewsCount": 31000,
    "badge": "Lectura Obligatoria y Transformadora",
    "description": "¿Quién no ha deseado alguna vez ser invisible para huir de una situación difícil? ¿Y quién no ha deseado dejar de serlo para que los demás lo vean y lo ayuden? Una historia conmovedora contada a través de los ojos de un niño con poderes.",
    "pros": [
      "Herramienta pedagógica magistral contra el acoso y la indiferencia en las aulas",
      "Trama que atrapa el corazón y provoca conversaciones necesarias en familia",
      "Capítulos breves de intensidad emocional arrolladora"
    ],
    "idealFor": "Despertar la empatía y la valentía de no mirar hacia otro lado",
    "style": "classic",
    "imageUrl": "https://images.unsplash.com/photo-1589829085413-56de8ae18c73?w=700&q=80",
    "images": [
      "https://images.unsplash.com/photo-1589829085413-56de8ae18c73?w=700&q=80"
    ]
  },
  {
    "id": "1012-kit-lettering-rotuladores-pincel",
    "asin": "B07MVD9W16",
    "title": "Kit Completo de Caligrafía y Lettering con 36 Rotuladores Punta Pincel Dual y Cuaderno de Prácticas",
    "slug": "kit-lettering-caligrafia-36-rotuladores-pincel-cuaderno",
    "searchQuery": "kit lettering principiantes 36 rotuladores doble punta pincel cuaderno plantillas caligrafia",
    "category": "10 a 12 Años",
    "subcategory": "Manualidades, Lettering y Creatividad",
    "ageRange": "10-12",
    "gender": "unisex",
    "priceRange": "20-50",
    "priceText": "21,95 €",
    "rating": 4.8,
    "reviewsCount": 17600,
    "badge": "La Pasión del Lettering Juvenil",
    "description": "Rotuladores de doble punta: una punta pincel de nylon flexible para crear trazos gruesos y finos de caligrafía artística moderna y una punta fina de 0,4 mm para perfilar detalles, junto a un cuaderno con guías y alfabetos.",
    "pros": [
      "Tinta al agua acuarelable que permite degradados y sombras espectaculares",
      "Puntas de fibra japonesa que recuperan la forma sin abrirse tras meses de uso",
      "Incluye estuche con asa para llevar a clase o de viaje"
    ],
    "idealFor": "Decorar apuntes escolares, títulos de libretas y tarjetas personalizadas",
    "style": "creativity",
    "imageUrl": "https://images.unsplash.com/photo-1513364776144-60967b0f800f?w=700&q=80",
    "images": [
      "https://images.unsplash.com/photo-1513364776144-60967b0f800f?w=700&q=80"
    ]
  },
  {
    "id": "1012-posca-rotuladores-acrilicos-8",
    "asin": "B001ANVDMU",
    "title": "Uni-Ball POSCA PC-3M - Estuche de 8 Rotuladores de Pintura Acrílica Multisuperficie de Punta Fina",
    "slug": "uniball-posca-pc3m-estuche-8-rotuladores-acrilicos",
    "searchQuery": "posca pc3m estuche 8 rotuladores pintura acrilica multisuperficie zapatillas madera piedra",
    "category": "10 a 12 Años",
    "subcategory": "Manualidades, Lettering y Creatividad",
    "ageRange": "10-12",
    "gender": "unisex",
    "priceRange": "20-50",
    "priceText": "24,90 €",
    "rating": 4.9,
    "reviewsCount": 29000,
    "badge": "Pinta en Ropa, Zapatillas y Carcasas",
    "description": "Los rotuladores de pintura acrílica más codiciados por preadolescentes creativos: pintan con una cobertura opaca y vibrante sobre cualquier material: zapatillas de tela, carcasas de móvil, madera, cristal, piedras y tela sin borrarse.",
    "pros": [
      "Pintura a base de agua inodora de secado ultrarrápido y máxima resistencia",
      "Puntas reversibles y lavables que no se obstruyen",
      "Colores vivos que tapan totalmente el fondo sobre el que se pinta"
    ],
    "idealFor": "Personalizar zapatillas deportivas, monopatines y regalos artesanales",
    "style": "creativity",
    "imageUrl": "https://images.unsplash.com/photo-1585366119957-e9730b6d0f60?w=700&q=80",
    "images": [
      "https://images.unsplash.com/photo-1585366119957-e9730b6d0f60?w=700&q=80"
    ]
  },
  {
    "id": "1012-diario-secreto-candado-huella",
    "asin": "B07MVD9W17",
    "title": "Diario Secreto Infantil con Candado de Código de Seguridad Numérico y Bolígrafo con Tinta Invisible",
    "slug": "diario-secreto-candado-codigo-seguridad-boligrafo-invisible",
    "searchQuery": "diario secreto con candado codigo contrasena boligrafo luz ultravioleta tinta invisible ninos",
    "category": "10 a 12 Años",
    "subcategory": "Manualidades, Lettering y Creatividad",
    "ageRange": "10-12",
    "gender": "unisex",
    "priceRange": "<20",
    "priceText": "18,50 €",
    "rating": 4.8,
    "reviewsCount": 11200,
    "badge": "Tus Secretos Bajo Código Seguro",
    "description": "Cuaderno encuadernado en polipiel con cerradura de combinación de 3 dígitos personalizable. Viene con un bolígrafo especial cuya tinta solo se lee al proyectar la luz ultravioleta incorporada en el capuchón.",
    "pros": [
      "Cerradura de metal robusta con cientos de combinaciones posibles",
      "Bolígrafo espía con linterna UV para mensajes ultra secretos",
      "Hojas gruesas rayadas que no traspasan la tinta"
    ],
    "idealFor": "Escribir pensamientos íntimos, sueños y anécdotas de preadolescente",
    "style": "creativity",
    "imageUrl": "https://images.unsplash.com/photo-1544717305-2782549b5136?w=700&q=80",
    "images": [
      "https://images.unsplash.com/photo-1544717305-2782549b5136?w=700&q=80"
    ]
  },
  {
    "id": "1012-magia-borras-app-luz",
    "asin": "B07MVD9W18",
    "title": "Magia Borrás Especial Tecnológica con Efectos de Luz LED en Dedos y App Móvil de Realidad Aumentada",
    "slug": "magia-borras-tecnologica-luces-led-app-movil",
    "searchQuery": "magia borras con luz y app movil realidad aumentada trucos tecnologicos educaborras",
    "category": "10 a 12 Años",
    "subcategory": "Magia Borrás Avanzada",
    "ageRange": "10-12",
    "gender": "unisex",
    "priceRange": "20-50",
    "priceText": "32,95 €",
    "rating": 4.8,
    "reviewsCount": 7100,
    "badge": "Magia con Luces que Traspasan Pantallas",
    "description": "La versión moderna de Borrás para la era digital: luces LED invisibles en los dedos que parecen coger la luz de la pantalla del smartphone y lanzarla al aire, trucos de cartas interactivos y vídeos tutoriales en la app móvil.",
    "pros": [
      "Efecto de luces D'Lite que asombra tanto a niños como a adultos",
      "Vídeos explicativos en la app impartidos por magos profesionales",
      "Permite grabar vídeos increíbles para compartir con amigos"
    ],
    "idealFor": "Preadolescentes amantes de los trucos visuales modernos y las redes",
    "style": "tech",
    "imageUrl": "/images/products/1012-magia-1.jpg",
    "images": [
      "/images/products/1012-magia-1.jpg",
      "/images/products/1012-magia-2.jpg",
      "/images/products/1012-magia-3.jpg"
    ]
  },
  {
    "id": "1012-set-magia-mentalismo-closeup",
    "asin": "B07MVD9W19",
    "title": "Set Profesional de Mentalismo y Cartomagia Close-Up con Caja Trucada de Madera y Monedas Scotch",
    "slug": "set-profesional-mentalismo-cartomagia-closeup",
    "searchQuery": "set magia mentalismo profesional close up cartas trucadas lectura de mente ninos",
    "category": "10 a 12 Años",
    "subcategory": "Magia Borrás Avanzada",
    "ageRange": "10-12",
    "gender": "unisex",
    "priceRange": "20-50",
    "priceText": "28,90 €",
    "rating": 4.7,
    "reviewsCount": 4800,
    "badge": "Trucos de Lectura de Pensamiento",
    "description": "Trucos de magia de cerca pensados para hacer a pocos centímetros de los ojos del espectador: adivinación de números secretos, dados que cambian de puntuación en una caja cerrada y monedas que atraviesan vasos de cristal.",
    "pros": [
      "Trucos que parecen auténticos poderes psíquicos sin torpezas mecánicas",
      "Accesorios de alta precisión con acabados discretos",
      "Guía con trucos de psicología y desvío de atención"
    ],
    "idealFor": "Sorprender a compañeros de clase y familiares con retos intelectuales",
    "style": "classic",
    "imageUrl": "https://images.unsplash.com/photo-1544717305-2782549b5136?w=700&q=80",
    "images": [
      "https://images.unsplash.com/photo-1544717305-2782549b5136?w=700&q=80"
    ]
  },
  {
    "id": "1012-caja-misterio-escape-magia",
    "asin": "B07MVD9W20",
    "title": "Caja Secreta de Madera con Rompecabezas Japonés de Apertura Oculta (Caja Candado Escape)",
    "slug": "caja-secreta-rompecabezas-madera-apertura-oculta",
    "searchQuery": "caja secreta madera rompecabezas apertura oculta caja japonesa puzzle box compartimento",
    "category": "10 a 12 Años",
    "subcategory": "Magia Borrás Avanzada",
    "ageRange": "10-12",
    "gender": "unisex",
    "priceRange": "<20",
    "priceText": "16,99 €",
    "rating": 4.8,
    "reviewsCount": 6500,
    "badge": "El Enigma del Mecanismo Oculto",
    "description": "Una caja de madera pulida que parece maciza e imposible de abrir: solo quien conoce la secuencia secreta de paneles deslizantes puede abrir el compartimento oculto interior para guardar notas o dinero.",
    "pros": [
      "Mecanismo de madera sin cerraduras visibles de gran ingenio mecánico",
      "Desafío mental irresistible para amigos que intentan abrirla",
      "Perfecta para esconder pequeños tesoros personales"
    ],
    "idealFor": "Amantes de los acertijos, escape rooms y rompecabezas mecánicos",
    "style": "classic",
    "imageUrl": "https://images.unsplash.com/photo-1585366119957-e9730b6d0f60?w=700&q=80",
    "images": [
      "https://images.unsplash.com/photo-1585366119957-e9730b6d0f60?w=700&q=80"
    ]
  },
  {
    "id": "1012-ck-one-50ml-juvenil",
    "asin": "B000P20S7C",
    "title": "Calvin Klein CK One - Eau de Toilette Unisex 50ml Fresca Cítrica con Vaporizador",
    "slug": "calvin-klein-ck-one-eau-de-toilette-50ml",
    "searchQuery": "calvin klein ck one 50ml eau de toilette perfume juvenil unisex fresco original",
    "category": "10 a 12 Años",
    "subcategory": "Colonias y Cuidado Juvenil",
    "ageRange": "10-12",
    "gender": "unisex",
    "priceRange": "20-50",
    "priceText": "24,95 €",
    "rating": 4.8,
    "reviewsCount": 38000,
    "badge": "La Primera Colonia Icónica de los 12 Años",
    "description": "El clásico unisex por excelencia: bergamota, cardamomo, piña y té verde sobre un fondo limpio de almizcle y ámbar. El perfume ideal cuando los niños dejan atrás las colonias infantiles y quieren un olor fresco, moderno y limpio.",
    "pros": [
      "Aroma limpio y ligero que no marea ni resulta pesado",
      "Frasco icónico de cristal esmerilado con vaporizador desmontable",
      "Garantía 100% original de Calvin Klein en Amazon"
    ],
    "idealFor": "El paso a la etapa de secundaria sintiéndose seguros y arreglados",
    "style": "classic",
    "imageUrl": "https://images.unsplash.com/photo-1594035910387-fea47794261f?w=700&q=80",
    "images": [
      "https://images.unsplash.com/photo-1594035910387-fea47794261f?w=700&q=80"
    ]
  },
  {
    "id": "1012-adidas-eau-de-toilette-juvenil",
    "asin": "B07MVD9W21",
    "title": "Adidas Dynamic Pulse - Eau de Toilette Juvenil 100ml con Notas Cítricas y Amaderadas Dinámicas",
    "slug": "adidas-dynamic-pulse-eau-de-toilette-100ml",
    "searchQuery": "adidas dynamic pulse eau de toilette 100ml perfume juvenil deporte frescor diario",
    "category": "10 a 12 Años",
    "subcategory": "Colonias y Cuidado Juvenil",
    "ageRange": "10-12",
    "gender": "boy",
    "priceRange": "<20",
    "priceText": "8,95 €",
    "rating": 4.7,
    "reviewsCount": 14200,
    "badge": "Frescura Deportiva Diaria",
    "description": "Diseñada para chicos activos que practican deportes: notas aromáticas de menta fresca, mandarina crujiente y manzana verde con una base amaderada que aporta una sensación revitalizante tras la ducha del entrenamiento.",
    "pros": [
      "Excelente duración tras las clases de Educación Física",
      "Formato resistente ideal para llevar en la bolsa de deporte",
      "Precio económico para uso diario sin remordimientos"
    ],
    "idealFor": "La bolsa de deporte de fútbol, baloncesto o natación",
    "style": "classic",
    "imageUrl": "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=700&q=80",
    "images": [
      "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=700&q=80"
    ]
  },
  {
    "id": "1012-kit-primeros-cuidados-faciales",
    "asin": "B07MVD9W23",
    "title": "Pack de Primeros Cuidados Faciales: Limpiador Suave en Espuma + Parches de Hidrocoloide para Granitos",
    "slug": "pack-primeros-cuidados-faciales-limpiador-parches",
    "searchQuery": "pack primeros cuidados faciales preadolescentes limpiador suave espuma parches granitos hidrocoloide",
    "category": "10 a 12 Años",
    "subcategory": "Colonias y Cuidado Juvenil",
    "ageRange": "10-12",
    "gender": "unisex",
    "priceRange": "<20",
    "priceText": "16,50 €",
    "rating": 4.8,
    "reviewsCount": 9600,
    "badge": "Higiene Respetuosa para Primeros Granitos",
    "description": "La solución más amable y sin químicos agresivos cuando aparecen los primeros brillos en la zona T (frente y nariz) a los 11 y 12 años. Espuma limpiadora botánica suave y parches invisibles que evitan tocarse los granitos.",
    "pros": [
      "Fórmula sin alcohol, sulfatos ni jabones agresivos",
      "Los parches de hidrocoloide curan el granito en una noche sin marcas",
      "Enseña una rutina de higiene facial saludable desde el principio"
    ],
    "idealFor": "Preadolescentes que empiezan a notar los cambios de la piel",
    "style": "classic",
    "imageUrl": "https://images.unsplash.com/photo-1556228720-195a672e8a03?w=700&q=80",
    "images": [
      "https://images.unsplash.com/photo-1556228720-195a672e8a03?w=700&q=80"
    ]
  },
  {
    "id": "1012-sudadera-hoodie-oversize",
    "asin": "B07MVD9W24",
    "title": "Sudadera con Capucha Estilo Hoodie Oversize Streetwear de Algodón Pesado con Bolsillo Canguro",
    "slug": "sudadera-hoodie-oversize-streetwear-algodon",
    "searchQuery": "sudadera con capucha hoodie oversize preadolescente algodon bolsillo canguro streetwear",
    "category": "10 a 12 Años",
    "subcategory": "Moda Urbana, Sudaderas y Mochilas",
    "ageRange": "10-12",
    "gender": "unisex",
    "priceRange": "20-50",
    "priceText": "28,95 €",
    "rating": 4.8,
    "reviewsCount": 13400,
    "badge": "La Prenda Favorita de Preadolescentes",
    "description": "Corte relajado holgado de tendencia urbana que encanta a los chicos y chicas de 10 a 12 años. Tejido de algodón peinado con interior de felpa perchada muy suave y cálido con capucha amplia y bolsillo central.",
    "pros": [
      "Interior perchado ultrasuave que no pica ni pierde pelo al lavar",
      "Corte moderno con hombros caídos de estilo skate y gaming",
      "Combina genial con pantalones cargo y zapatillas"
    ],
    "idealFor": "El uniforme informal diario del colegio y fines de semana",
    "style": "classic",
    "imageUrl": "https://images.unsplash.com/photo-1556905055-8f358a7a47b2?w=700&q=80",
    "images": [
      "https://images.unsplash.com/photo-1556905055-8f358a7a47b2?w=700&q=80"
    ]
  },
  {
    "id": "1012-rinonera-cruzada-impermeable",
    "asin": "B07MVD9W25",
    "title": "Riñonera Bandolera Cruzada al Pecho Impermeable con Varios Bolsillos y Salida de Auriculares",
    "slug": "rinonera-bandolera-cruzada-pecho-impermeable",
    "searchQuery": "rinonera cruzada pecho bandolera juvenil chico chica impermeable salidas auriculares",
    "category": "10 a 12 Años",
    "subcategory": "Moda Urbana, Sudaderas y Mochilas",
    "ageRange": "10-12",
    "gender": "unisex",
    "priceRange": "<20",
    "priceText": "15,99 €",
    "rating": 4.7,
    "reviewsCount": 16200,
    "badge": "Imprescindible para Salir con Amigos",
    "description": "Para llevar el móvil, las llaves de casa, la tarjeta del autobús y algo de dinero con total seguridad sin perder nada. Correa ajustable para llevar cruzada al pecho o a la cintura con tejido Oxford impermeable.",
    "pros": [
      "Cremalleras reforzadas con tiradores ergonómicos fáciles de abrir",
      "Tejido antidesgarro que aguanta lluvia ligera",
      "Bolsillo trasero de seguridad antirrobo pegado al cuerpo"
    ],
    "idealFor": "Tardes en el parque, excursiones escolares y salidas con amigos",
    "style": "classic",
    "imageUrl": "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=700&q=80",
    "images": [
      "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=700&q=80"
    ]
  },
  {
    "id": "1012-pack-calcetines-divertidos",
    "asin": "B07MVD9W26",
    "title": "Pack de 5 Pares de Calcetines de Media Caña de Algodón con Diseños Gráficos Divertidos",
    "slug": "pack-5-calcetines-media-cana-algodon-disenos-divertidos",
    "searchQuery": "pack 5 calcetines divertidos algodon media cana preadolescentes estampados modernos",
    "category": "10 a 12 Años",
    "subcategory": "Moda Urbana, Sudaderas y Mochilas",
    "ageRange": "10-12",
    "gender": "unisex",
    "priceRange": "<20",
    "priceText": "13,90 €",
    "rating": 4.8,
    "reviewsCount": 11400,
    "badge": "El Toque de Estilo en las Zapatillas",
    "description": "Calcetines de tendencia con estampados de videojuegos, comida, skates y geometrías que asoman por encima de las zapatillas deportivas. Confeccionados en 80% algodón transpirable con puño elástico antideslizante.",
    "pros": [
      "Puntera sin costuras molestas que no aprieta los dedos",
      "Algodón elástico de alta durabilidad que no hace bolitas tras los lavados",
      "5 pares diferentes en una bonita caja de regalo"
    ],
    "idealFor": "Un detalle con estilo y personalidad propia para el día a día",
    "style": "classic",
    "imageUrl": "https://images.unsplash.com/photo-1582966772680-860e372bb558?w=700&q=80",
    "images": [
      "https://images.unsplash.com/photo-1582966772680-860e372bb558?w=700&q=80"
    ]
  },
  {
    "id": "1315-jbl-tune-510bt",
    "asin": "B08WM3LMJF",
    "title": "JBL Tune 510BT - Auriculares Inalámbricos On-Ear con Sonido Pure Bass y 40 Horas de Batería",
    "slug": "jbl-tune-510bt-auriculares-inalambricos-bluetooth",
    "searchQuery": "jbl tune 510bt auriculares inalambricos bluetooth graves plegables",
    "category": "13 a 15 Años",
    "subcategory": "Auriculares Inalámbricos y Audio",
    "ageRange": "13-15",
    "gender": "unisex",
    "priceRange": "20-50",
    "priceText": "37,90 €",
    "rating": 4.7,
    "reviewsCount": 68000,
    "badge": "Superventas Sonido Juvenil",
    "description": "Auriculares Bluetooth con el potente sonido JBL Pure Bass que los adolescentes adoran para Spotify y TikTok. Carga rápida de 5 minutos que da 2 horas de música, micrófono integrado y diseño plegable ultraligero.",
    "pros": [
      "Batería brutal de 40 horas que dura toda la semana",
      "Conexión multipunto para alternar entre el móvil y el ordenador",
      "Almohadillas acolchadas suaves muy cómodas para estudiar"
    ],
    "idealFor": "Escuchar música en el instituto, estudiar y llamadas con amigos",
    "style": "tech",
    "imageUrl": "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=700&q=80",
    "images": [
      "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=700&q=80"
    ]
  },
  {
    "id": "1315-anker-soundcore-q30",
    "asin": "B08HMWZBXC",
    "title": "Soundcore by Anker Life Q30 - Auriculares Diadema con Cancelación Activa de Ruido Híbrida (ANC)",
    "slug": "soundcore-life-q30-auriculares-cancelacion-ruido-anc",
    "searchQuery": "soundcore anker life q30 auriculares cancelacion activa ruido anc bluetooth estudio",
    "category": "13 a 15 Años",
    "subcategory": "Auriculares Inalámbricos y Audio",
    "ageRange": "13-15",
    "gender": "unisex",
    "priceRange": "50-100",
    "priceText": "79,99 €",
    "rating": 4.8,
    "reviewsCount": 54000,
    "badge": "La Mejor Cancelación de Ruido para Estudiar",
    "description": "Aíslan hasta el 95% del ruido exterior con sus 3 modos de cancelación activa (Transporte, Exteriores e Interiores). Sonido certificado Hi-Res Audio con ecualizador personalizado mediante app móvil y 40 horas con ANC activo.",
    "pros": [
      "Almohadillas de cuero proteico ultrasuaves que no aprietan con gafas",
      "Modo transparencia para escuchar el entorno tocando el auricular derecho",
      "Incluye estuche rígido de viaje prémium"
    ],
    "idealFor": "Concentración total en época de exámenes y viajes en tren o autobús",
    "style": "tech",
    "imageUrl": "/images/products/1315-auriculares-1.jpg",
    "images": [
      "/images/products/1315-auriculares-1.jpg",
      "/images/products/1315-auriculares-2.jpg",
      "/images/products/1315-auriculares-3.jpg"
    ]
  },
  {
    "id": "1315-jbl-go-3-altavoz-bluetooth",
    "asin": "B08G8K7TY4",
    "title": "JBL GO 3 - Altavoz Bluetooth Portátil Resistente al Agua y Polvo IP67 con Asa Integrada",
    "slug": "jbl-go-3-altavoz-bluetooth-portatil-ip67",
    "searchQuery": "jbl go 3 altavoz bluetooth portatil resistente agua ip67 sonido graves bolsillo",
    "category": "13 a 15 Años",
    "subcategory": "Auriculares Inalámbricos y Audio",
    "ageRange": "13-15",
    "gender": "unisex",
    "priceRange": "20-50",
    "priceText": "39,99 €",
    "rating": 4.8,
    "reviewsCount": 39000,
    "badge": "El Altavoz Más Resistente para Salir",
    "description": "Tamaño ultra compacto que cabe en la palma de la mano con un sonido sorprendentemente potente y nítido. Certificación IP67 para llevar a la piscina, playa o ducha sin miedo al agua ni a la arena.",
    "pros": [
      "5 horas continuas de reproducción con una sola carga",
      "Tejido impermeable resistente y asa de cuerda integrada para colgar de la mochila",
      "Diseño moderno disponible en colores urbanos"
    ],
    "idealFor": "Poner música con amigos en el parque, la piscina o la habitación",
    "style": "tech",
    "imageUrl": "https://images.unsplash.com/photo-1545454675-3531b543be5d?w=700&q=80",
    "images": [
      "https://images.unsplash.com/photo-1545454675-3531b543be5d?w=700&q=80"
    ]
  },
  {
    "id": "1315-fujifilm-instax-mini-12",
    "asin": "B0BWNWN925",
    "title": "Fujifilm Instax Mini 12 - Cámara Instantánea con Exposición Automática y Espejo Selfie",
    "slug": "fujifilm-instax-mini-12-camara-instantanea",
    "searchQuery": "fujifilm instax mini 12 camara instantanea fotos papel",
    "category": "13 a 15 Años",
    "subcategory": "Cámaras Instantáneas y Fotografía",
    "ageRange": "13-15",
    "gender": "unisex",
    "priceRange": "50-100",
    "priceText": "79,00 €",
    "rating": 4.8,
    "reviewsCount": 22000,
    "badge": "Top 1 Regalo Fotografía Juvenil",
    "description": "La cámara de fotos instantáneas por excelencia para fiestas, viajes y recuerdos entre amigos. Ajusta la velocidad de obturación automáticamente y dispone de modo primer plano y espejo selfie integrado.",
    "pros": [
      "Imprime fotos en papel fotográfico real al momento",
      "Manejo facilísimo girando el objetivo",
      "Diseño icónico disponible en colores pastel modernos"
    ],
    "idealFor": "Capturar momentos únicos con amigos e imprimir recuerdos físicos",
    "style": "creativity",
    "imageUrl": "https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?w=700&q=80",
    "images": [
      "https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?w=700&q=80"
    ]
  },
  {
    "id": "1315-aro-luz-tripode-tiktok",
    "asin": "B07MVD9W27",
    "title": "Aro de Luz LED de 10 Pulgadas con Trípode Extensible de 160cm, Soporte de Móvil y Mando Bluetooth",
    "slug": "aro-luz-led-10-pulgadas-tripode-mando-bluetooth",
    "searchQuery": "aro de luz led 10 pulgadas tripode extensible mando bluetooth tiktok videos selfies",
    "category": "13 a 15 Años",
    "subcategory": "Cámaras Instantáneas y Fotografía",
    "ageRange": "13-15",
    "gender": "unisex",
    "priceRange": "20-50",
    "priceText": "26,95 €",
    "rating": 4.7,
    "reviewsCount": 18400,
    "badge": "Imprescindible para Vídeos de TikTok y Fotos",
    "description": "3 modos de iluminación (luz cálida, neutra y blanca fría) con 10 niveles de brillo regulables. Trípode de aluminio estable con cabezal giratorio 360° y disparador remoto por Bluetooth para hacer fotos y vídeos a distancia.",
    "pros": [
      "Ilumina el rostro de forma homogénea eliminando sombras en videollamadas y vídeos",
      "Soporte universal compatible con cualquier iPhone y Android",
      "Alimentación por USB para conectar al cargador del móvil o batería externa"
    ],
    "idealFor": "Crear contenido para redes sociales, videollamadas con amigos y tutoriales",
    "style": "tech",
    "imageUrl": "https://images.unsplash.com/photo-1542751371-adc38448a05e?w=700&q=80",
    "images": [
      "https://images.unsplash.com/photo-1542751371-adc38448a05e?w=700&q=80"
    ]
  },
  {
    "id": "1315-impresora-bolsillo-bluetooth",
    "asin": "B07MVD9W28",
    "title": "Xiaomi Mi Portable Photo Printer - Impresora Fotográfica de Bolsillo con Tecnología ZINK Sin Tinta",
    "slug": "xiaomi-impresora-fotografica-bolsillo-zink",
    "searchQuery": "xiaomi mi portable photo printer impresora bolsillo fotos zink sin tinta bluetooth",
    "category": "13 a 15 Años",
    "subcategory": "Cámaras Instantáneas y Fotografía",
    "ageRange": "13-15",
    "gender": "unisex",
    "priceRange": "50-100",
    "priceText": "59,99 €",
    "rating": 4.7,
    "reviewsCount": 12400,
    "badge": "Imprime Fotos Desde el Móvil Sin Tinta",
    "description": "Impresora ultra plana que cabe en el bolsillo de la chaqueta. Utiliza papel térmico adhesivo ZINK sin cartuchos de tinta: las fotos salen secas al instante y la parte trasera se despega como pegatina para decorar carpetas y fundas de móvil.",
    "pros": [
      "Fotos con reverso adhesivo para pegar en la agenda o la pared",
      "Modo fotos AR con realidad aumentada que reproduce un vídeo al escanear la foto",
      "Conexión Bluetooth rápida con la app Xiaomi Home"
    ],
    "idealFor": "Imprimir recuerdos de fiestas con amigos y personalizar libretas",
    "style": "tech",
    "imageUrl": "https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?w=700&q=80",
    "images": [
      "https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?w=700&q=80"
    ]
  },
  {
    "id": "1315-catan-el-juego",
    "asin": "B000P20S7D",
    "title": "Devir - Los Colonos de Catán: El Mítico Juego de Mesa de Estrategia, Comercio y Negociación",
    "slug": "devir-catan-el-juego-de-mesa-estrategia",
    "searchQuery": "catan devir juego de mesa oficial colonos de catan comercio negociacion madera",
    "category": "13 a 15 Años",
    "subcategory": "Juegos de Mesa Clásicos (Catan)",
    "ageRange": "13-15",
    "gender": "unisex",
    "priceRange": "20-50",
    "priceText": "42,95 €",
    "rating": 4.9,
    "reviewsCount": 24500,
    "badge": "El Clásico de Estrategia Nº1",
    "description": "El juego que revolucionó los juegos de mesa modernos: coloniza la isla de Catán construyendo poblados, carreteras y ciudades mientras comercias con trigo, madera, arcilla, piedra y ovejas esquivando al ladrón.",
    "pros": [
      "Tablero modular hexagonal que garantiza partidas 100% únicas",
      "Negociación constante entre jugadores que fomenta la diplomacia y el pacto",
      "Piezas de madera clásicas de alta calidad"
    ],
    "idealFor": "Tardes enteras de juego con amigos y la mejor sobremesa familiar",
    "style": "classic",
    "imageUrl": "/images/products/1315-catan-1.jpg",
    "images": [
      "/images/products/1315-catan-1.jpg",
      "/images/products/1315-catan-2.jpg",
      "/images/products/1315-catan-3.jpg"
    ]
  },
  {
    "id": "1315-catan-ciudades-caballeros",
    "asin": "B07MVD9W29",
    "title": "Devir - Catan: Ciudades y Caballeros: La Expansión Definitiva con Bárbaros y Murallas",
    "slug": "devir-catan-ciudades-y-caballeros-expansion",
    "searchQuery": "catan ciudades y caballeros devir expansion barbaros murallas metropolis",
    "category": "13 a 15 Años",
    "subcategory": "Juegos de Mesa Clásicos (Catan)",
    "ageRange": "13-15",
    "gender": "unisex",
    "priceRange": "20-50",
    "priceText": "39,99 €",
    "rating": 4.9,
    "reviewsCount": 6800,
    "badge": "La Expansión Más Estratégica",
    "description": "La invasión bárbara amenaza las costas de Catán: los jugadores deben entrenar caballeros para defender la isla, construir metrópolis comerciales y amurallar sus ciudades para asegurar la victoria.",
    "pros": [
      "Añade un nivel táctico mucho más profundo y desafiante",
      "Componentes con barco bárbaro de madera y fichas de metrópolis",
      "Requiere el juego Catan básico para jugar"
    ],
    "idealFor": "Veteranos de Catán de 13 a 15 años que buscan partidas épicas",
    "style": "classic",
    "imageUrl": "https://images.unsplash.com/photo-1610890716171-6b1bb98ffd09?w=700&q=80",
    "images": [
      "https://images.unsplash.com/photo-1610890716171-6b1bb98ffd09?w=700&q=80"
    ]
  },
  {
    "id": "1315-exploding-kittens-good-evil",
    "asin": "B0C7J9KL99",
    "title": "Exploding Kittens: Good vs Evil - Juego de Cartas con Nueva Mecánica de Apocalipsis",
    "slug": "exploding-kittens-good-vs-evil-juego-cartas",
    "searchQuery": "exploding kittens good vs evil asmodee juego cartas serie netflix apocalipsis",
    "category": "13 a 15 Años",
    "subcategory": "Juegos de Mesa Clásicos (Catan)",
    "ageRange": "13-15",
    "gender": "unisex",
    "priceRange": "20-50",
    "priceText": "22,95 €",
    "rating": 4.8,
    "reviewsCount": 9200,
    "badge": "Basado en la Serie de Netflix",
    "description": "Dios y el Diablo reencarnados en dos gatos que libran la batalla definitiva en tu mesa de juego. Incluye cartas inéditas de Apocalipsis, minijuegos de duelo directo y nuevas estrategias maquiavélicas.",
    "pros": [
      "Partidas frenéticas de 15 minutos llenas de traición y carcajadas",
      "Ilustraciones exclusivas de la serie de animación",
      "Juego independiente o combinable con el Exploding Kittens original"
    ],
    "idealFor": "Piques rápidos en campamentos, viajes y quedadas de adolescentes",
    "style": "classic",
    "imageUrl": "https://images.unsplash.com/photo-1610890716171-6b1bb98ffd09?w=700&q=80",
    "images": [
      "https://images.unsplash.com/photo-1610890716171-6b1bb98ffd09?w=700&q=80"
    ]
  },
  {
    "id": "1315-cerave-gel-limpiador",
    "asin": "B09R27BTPF",
    "title": "CeraVe - Gel Limpiador Control Imperfecciones con Ácido Salicílico 236ml",
    "slug": "cerave-gel-limpiador-control-imperfecciones-236ml",
    "searchQuery": "cerave limpiador espumoso control imperfecciones acido salicilico 236ml",
    "category": "13 a 15 Años",
    "subcategory": "Cuidado Facial, Skincare y Colonias",
    "ageRange": "13-15",
    "gender": "unisex",
    "priceRange": "<20",
    "priceText": "12,95 €",
    "rating": 4.8,
    "reviewsCount": 24500,
    "badge": "Recomendado por Dermatólogos",
    "description": "El limpiador facial de referencia para adolescentes. Formulado con un 2% de ácido salicílico para eliminar el exceso de grasa y desobstruir poros sin alterar la barrera cutánea gracias a sus 3 ceramidas esenciales.",
    "pros": [
      "Sin perfume, no comedogénico y respetuoso con pieles sensibles",
      "Reduce granitos y puntos negros en pocos días",
      "Textura gel que hace una espuma agradable y purificante"
    ],
    "idealFor": "Preadolescentes y jóvenes que empiezan a cuidar su piel",
    "style": "tech",
    "imageUrl": "https://images.unsplash.com/photo-1556228720-195a672e8a03?w=700&q=80",
    "images": [
      "https://images.unsplash.com/photo-1556228720-195a672e8a03?w=700&q=80"
    ]
  },
  {
    "id": "1315-parches-hidrocoloides-cosrx",
    "asin": "B00PBX3TN6",
    "title": "COSRX Acne Pimple Master Patch - Pack de 24 Parches Invisibles Curativos de Hidrocoloide",
    "slug": "cosrx-parches-hidrocoloide-granos-acne",
    "searchQuery": "cosrx acne pimple master patch parches granos hidrocoloide espinillas invisibles noche",
    "category": "13 a 15 Años",
    "subcategory": "Cuidado Facial, Skincare y Colonias",
    "ageRange": "13-15",
    "gender": "unisex",
    "priceRange": "<20",
    "priceText": "6,99 €",
    "rating": 4.8,
    "reviewsCount": 48000,
    "badge": "El Producto Antigranitos Nº1 del Mundo",
    "description": "Parches ultrafinos e invisibles que se colocan sobre el granito antes de dormir: absorben el pus y la grasa, calman la rojez y crean una barrera protectora que impide tocarse o infectarse la piel con las uñas.",
    "pros": [
      "Hacen desaparecer el granito durante la noche de forma indolora",
      "Ultrafinos y transparentes: se pueden llevar puestos de día sin que se noten",
      "No resecan ni despellejan la piel circundante"
    ],
    "idealFor": "Salvar emergencias de granitos antes de fotos o eventos",
    "style": "tech",
    "imageUrl": "https://images.unsplash.com/photo-1556228720-195a672e8a03?w=700&q=80",
    "images": [
      "https://images.unsplash.com/photo-1556228720-195a672e8a03?w=700&q=80"
    ]
  },
  {
    "id": "1315-colonia-hollister-wave",
    "asin": "B01LZF2U33",
    "title": "Hollister Wave - Eau de Cologne Juvenil 100ml Fresca con Notas Marinas y Cítricas Californianas",
    "slug": "hollister-wave-eau-de-cologne-100ml",
    "searchQuery": "hollister wave colonia juvenil 100ml notas marinas frescas california perfume chico",
    "category": "13 a 15 Años",
    "subcategory": "Cuidado Facial, Skincare y Colonias",
    "ageRange": "13-15",
    "gender": "boy",
    "priceRange": "20-50",
    "priceText": "26,50 €",
    "rating": 4.8,
    "reviewsCount": 13200,
    "badge": "Aroma Playero y Desenfadado de California",
    "description": "Inspirada en el atardecer en las playas de surf de California: una salida brillante de hoja de bambú, pomelo y yuzu con un corazón marino salado y fondo de madera de ciprés. Aroma fresco que encanta en el instituto.",
    "pros": [
      "Perfume ligero y moderno que proyecta frescura limpia",
      "Frasco de cristal ondulado con relieve de surfista",
      "Excelente fijación para el día a día"
    ],
    "idealFor": "Chicos de 13 a 15 años que quieren un aroma con estilo surfero",
    "style": "classic",
    "imageUrl": "https://images.unsplash.com/photo-1594035910387-fea47794261f?w=700&q=80",
    "images": [
      "https://images.unsplash.com/photo-1594035910387-fea47794261f?w=700&q=80"
    ]
  },
  {
    "id": "1315-heartstopper-tomo-1",
    "asin": "8408207862",
    "title": "Heartstopper 1: Dos Chicos Juntos - Alice Oseman (Novela Gráfica Superventas Internacional)",
    "slug": "heartstopper-1-dos-chicos-juntos-alice-oseman",
    "searchQuery": "heartstopper 1 dos chicos juntos alice oseman comic novela grafica destino",
    "category": "13 a 15 Años",
    "subcategory": "Libros Juveniles, Fantasía y Manga",
    "ageRange": "13-15",
    "gender": "unisex",
    "priceRange": "<20",
    "priceText": "15,95 €",
    "rating": 4.9,
    "reviewsCount": 32000,
    "badge": "El Fenómeno Romántico Juvenil Global",
    "description": "Charlie y Nick van al mismo instituto, pero nunca se habían cruzado hasta que un día les toca sentarse juntos en clase. Pronto se hacen amigos inseparables, pero Charlie empieza a sentir algo más, aunque cree que Nick nunca se fijará en él.",
    "pros": [
      "Historia tierna, realista y respetuosa sobre descubrir la identidad",
      "Formato novela gráfica de lectura fluida con ilustraciones emotivas",
      "La serie juvenil más leída y recomendada por adolescentes"
    ],
    "idealFor": "Amantes del romance juvenil, la inclusión y las novelas gráficas",
    "style": "creativity",
    "imageUrl": "https://images.unsplash.com/photo-1544717305-2782549b5136?w=700&q=80",
    "images": [
      "https://images.unsplash.com/photo-1544717305-2782549b5136?w=700&q=80"
    ]
  },
  {
    "id": "1315-one-piece-tomo-1",
    "asin": "8408219461",
    "title": "One Piece Tomo 1: Romance Dawn - Eiichiro Oda (El Manga Más Vendido de la Historia en Español)",
    "slug": "one-piece-tomo-1-romance-dawn-manga",
    "searchQuery": "one piece tomo 1 romance dawn eiichiro oda planeta comic manga piratas luffy",
    "category": "13 a 15 Años",
    "subcategory": "Libros Juveniles, Fantasía y Manga",
    "ageRange": "13-15",
    "gender": "unisex",
    "priceRange": "<20",
    "priceText": "8,50 €",
    "rating": 4.9,
    "reviewsCount": 28000,
    "badge": "El Rey Indiscutible del Manga",
    "description": "Monkey D. Luffy sueña con convertirse en el Rey de los Piratas tras comer por error una Fruta del Diablo que convierte su cuerpo en goma elástica. Con su sombrero de paja se lanza al mar en busca del tesoro legendario One Piece.",
    "pros": [
      "El inicio de la mayor aventura épica del cómic japonés",
      "Valores de lealtad, perseverancia ante la adversidad y compañerismo",
      "Edición clásica de Planeta Cómic de alta calidad"
    ],
    "idealFor": "Iniciarse en el fascinante mundo del anime y la cultura otaku",
    "style": "classic",
    "imageUrl": "https://images.unsplash.com/photo-1512820790803-83ca734da794?w=700&q=80",
    "images": [
      "https://images.unsplash.com/photo-1512820790803-83ca734da794?w=700&q=80"
    ]
  },
  {
    "id": "1315-juegos-del-hambre-novela",
    "asin": "8427202123",
    "title": "Los Juegos del Hambre - Suzanne Collins (Edición Especial 15º Aniversario Tapa Blanda)",
    "slug": "los-juegos-del-hambre-suzanne-collins-novela",
    "searchQuery": "los juegos del hambre suzanne collins rba molino novela juvenil distopica katniss",
    "category": "13 a 15 Años",
    "subcategory": "Libros Juveniles, Fantasía y Manga",
    "ageRange": "13-15",
    "gender": "unisex",
    "priceRange": "<20",
    "priceText": "16,95 €",
    "rating": 4.9,
    "reviewsCount": 36000,
    "badge": "La Distopía Juvenil Más Trepidante",
    "description": "En las ruinas de lo que fue América del Norte se alza Panem, donde cada año el Capitolio obliga a sus doce distritos a enviar a un chico y una chica a luchar a muerte en directo por televisión. Katniss Everdeen se ofrece voluntaria por su hermana.",
    "pros": [
      "Ritmo vertiginoso sin un solo segundo de respiro",
      "Protagonista femenina valiente, astuta e inolvidable",
      "Crítica social lúcida que despierta el pensamiento crítico"
    ],
    "idealFor": "Adolescentes que buscan una lectura adictiva e inteligente",
    "style": "classic",
    "imageUrl": "https://images.unsplash.com/photo-1589829085413-56de8ae18c73?w=700&q=80",
    "images": [
      "https://images.unsplash.com/photo-1589829085413-56de8ae18c73?w=700&q=80"
    ]
  },
  {
    "id": "1315-cuaderno-bullet-journal-a5",
    "asin": "B07MVD9W30",
    "title": "Cuaderno Bullet Journal A5 Tapa Dura de Cuero Vegano con Hojas Punteadas Gruesas de 160 GSM",
    "slug": "cuaderno-bullet-journal-a5-160gsm-cuero-vegano",
    "searchQuery": "bullet journal a5 160 gsm papel grueso no traspasa hojas punteadas tapa dura",
    "category": "13 a 15 Años",
    "subcategory": "Papelería Creativa y Bullet Journal",
    "ageRange": "13-15",
    "gender": "unisex",
    "priceRange": "<20",
    "priceText": "17,99 €",
    "rating": 4.8,
    "reviewsCount": 14500,
    "badge": "Hojas Ultrangruesas Anti-Fantasmas",
    "description": "El cuaderno soñado para hacer Bullet Journal: papel de 160 gramos ultra grueso que no traspasa con rotuladores de alcohol, acuarelas ni estilográficas. Cuadrícula de puntos tenue de 5 mm, goma elástica, 2 marcapáginas y bolsillo trasero.",
    "pros": [
      "Cero traspaso de tinta: dibuja y escribe con cualquier rotulador",
      "Apertura plana de 180° para escribir cómodamente en ambos lados",
      "Diseño estético minimalista con bordes de hojas dorados"
    ],
    "idealFor": "Organizar apuntes escolares, metas personales y dibujo creativo",
    "style": "creativity",
    "imageUrl": "https://images.unsplash.com/photo-1544717305-2782549b5136?w=700&q=80",
    "images": [
      "https://images.unsplash.com/photo-1544717305-2782549b5136?w=700&q=80"
    ]
  },
  {
    "id": "1315-tombow-dual-brush-pastel",
    "asin": "B01M33554F",
    "title": "Tombow Dual Brush - Set de 10 Rotuladores Acuarelables Punta Pincel Colores Pastel",
    "slug": "tombow-dual-brush-set-10-rotuladores-pastel",
    "searchQuery": "tombow dual brush rotuladores punta pincel colores pastel acuarelables caligrafia",
    "category": "13 a 15 Años",
    "subcategory": "Papelería Creativa y Bullet Journal",
    "ageRange": "13-15",
    "gender": "unisex",
    "priceRange": "20-50",
    "priceText": "28,95 €",
    "rating": 4.9,
    "reviewsCount": 21000,
    "badge": "La Marca de Referencia en Caligrafía",
    "description": "Fabricados en Japón con una punta de pincel de alta elasticidad que no pierde su forma y una punta fina de precisión. Tinta a base de agua inodora y libre de ácido que permite degradar colores con agua como acuarela.",
    "pros": [
      "Gama de tonos pastel aesthetic preciosos que no cansan la vista",
      "Punta pincel indestructible que aguanta presiones intensas",
      "Flujo de tinta constante y suave sin manchas"
    ],
    "idealFor": "Ilustración, lettering de títulos en apuntes y tarjetas artesanales",
    "style": "creativity",
    "imageUrl": "https://images.unsplash.com/photo-1513364776144-60967b0f800f?w=700&q=80",
    "images": [
      "https://images.unsplash.com/photo-1513364776144-60967b0f800f?w=700&q=80"
    ]
  },
  {
    "id": "1315-estuche-gran-capacidad-tres-pisos",
    "asin": "B07MVD9W31",
    "title": "Estuche Organizador Escolar de Gran Capacidad de 3 Compartimentos con Capacidad para 90 Bolígrafos",
    "slug": "estuche-escolar-gran-capacidad-tres-compartimentos",
    "searchQuery": "estuche escolar gran capacidad tres cremalleras organizador juvenil boligrafos rotuladores",
    "category": "13 a 15 Años",
    "subcategory": "Papelería Creativa y Bullet Journal",
    "ageRange": "13-15",
    "gender": "unisex",
    "priceRange": "<20",
    "priceText": "13,99 €",
    "rating": 4.8,
    "reviewsCount": 26000,
    "badge": "Superventas Organización Escolar",
    "description": "El estuche favorito en los institutos: se abre totalmente para revelar 3 compartimentos independientes con gomas elásticas para subrayadores, bolsillos de malla con cremallera y gran fondo central para todo el material.",
    "pros": [
      "Capacidad descomunal para más de 80 bolígrafos, regla de 20cm y calculadora",
      "Lona resistente al agua y a desgarros lavable",
      "Cremalleras metálicas dobles reforzadas"
    ],
    "idealFor": "Llevar todos los rotuladores y útiles ordenados al instituto",
    "style": "classic",
    "imageUrl": "https://images.unsplash.com/photo-1585366119957-e9730b6d0f60?w=700&q=80",
    "images": [
      "https://images.unsplash.com/photo-1585366119957-e9730b6d0f60?w=700&q=80"
    ]
  },
  {
    "id": "1315-gorro-beanie-pescador",
    "asin": "B07MVD9W32",
    "title": "Gorro Beanie de Punto Estilo Pescador Urbano de Algodón Acanalado Unisex",
    "slug": "gorro-beanie-pescador-urbano-algodon-punto",
    "searchQuery": "gorro beanie pescador urbano punto acanalado skater adolescente algodon calido",
    "category": "13 a 15 Años",
    "subcategory": "Moda Juvenil, Sudaderas y Gorras",
    "ageRange": "13-15",
    "gender": "unisex",
    "priceRange": "<20",
    "priceText": "12,99 €",
    "rating": 4.8,
    "reviewsCount": 15800,
    "badge": "Tendencia Urbana Skater",
    "description": "El gorro corto de moda urbana que llevan skaters y creadores de contenido: tejido de punto acanalado tupido con dobladillo enrollado. Mantiene la cabeza abrigada sin apretar ni picar la frente.",
    "pros": [
      "100% fibra acrílica suave de tacto lana que no pica",
      "Corte ajustado moderno por encima de las orejas",
      "Gran variedad de colores sobrios (negro, mostaza, verde militar)"
    ],
    "idealFor": "Completar cualquier look casual de entretiempo e invierno",
    "style": "classic",
    "imageUrl": "https://images.unsplash.com/photo-1588850561407-ed78c282e89b?w=700&q=80",
    "images": [
      "https://images.unsplash.com/photo-1588850561407-ed78c282e89b?w=700&q=80"
    ]
  },
  {
    "id": "1315-sudadera-hoodie-basica-premium",
    "asin": "B07MVD9W34",
    "title": "Sudadera con Capucha Básica de Algodón Prémium Corte Relajado con Bolsillo Frontal",
    "slug": "sudadera-con-capucha-basica-algodon-corte-relajado",
    "searchQuery": "sudadera con capucha basica algodon sin logo corte relajado juvenil moderna",
    "category": "13 a 15 Años",
    "subcategory": "Moda Juvenil, Sudaderas y Gorras",
    "ageRange": "13-15",
    "gender": "unisex",
    "priceRange": "20-50",
    "priceText": "32,95 €",
    "rating": 4.8,
    "reviewsCount": 18900,
    "badge": "El Básico de Armario Más Cómodo",
    "description": "Sudadera minimalista sin logos gigantes, confeccionada en 80% algodón pesado de 320 GSM con forro polar interior aterciopelado. Cordones planos a tono y remates elásticos acanalados en puños y cintura.",
    "pros": [
      "Gramaje pesado que mantiene la estructura y no se deforma al lavar",
      "Tacto súper agradable sobre la piel sin camisetas interiores",
      "Estilo aesthetic atemporal"
    ],
    "idealFor": "Ir al instituto cómodo y con estilo todos los días",
    "style": "classic",
    "imageUrl": "https://images.unsplash.com/photo-1556905055-8f358a7a47b2?w=700&q=80",
    "images": [
      "https://images.unsplash.com/photo-1556905055-8f358a7a47b2?w=700&q=80"
    ]
  },
  {
    "id": "1315-bandolera-tactica-pequena",
    "asin": "B07MVD9W35",
    "title": "Bandolera Táctica Pequeña Unisex con Cinchas Molle y Mosquetón Metálico",
    "slug": "bandolera-tactica-pequena-unisex-molle",
    "searchQuery": "bandolera tactica pequena unisex molle bolsillo movil auriculares urbana",
    "category": "13 a 15 Años",
    "subcategory": "Moda Juvenil, Sudaderas y Gorras",
    "ageRange": "13-15",
    "gender": "unisex",
    "priceRange": "<20",
    "priceText": "16,95 €",
    "rating": 4.7,
    "reviewsCount": 9400,
    "badge": "Estilo Táctico Techwear",
    "description": "Bolso bandolera de tamaño compacto para llevar lo esencial: móvil grande, cartera, auriculares inalámbricos y llaves. Fabricado en nailon balístico 900D impermeable con correa ancha acolchada y cierre de clip rápido.",
    "pros": [
      "Material balístico ultrarresistente que no se raya ni se desgasta",
      "Múltiples bolsillos con cremalleras estancas",
      "Se puede llevar al hombro, cruzada o enganchada al cinturón"
    ],
    "idealFor": "Festivales, salidas de tarde y fines de semana",
    "style": "tech",
    "imageUrl": "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=700&q=80",
    "images": [
      "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=700&q=80"
    ]
  },
  {
    "id": "1315-mochila-antirrobo-puerto-usb",
    "asin": "B07MVD9W36",
    "title": "Mochila Antirrobo Urbana con Cremallera Oculta, Puerto de Carga USB y Compartimento para Portátil",
    "slug": "mochila-antirrobo-urbana-cremallera-oculta-usb",
    "searchQuery": "mochila antirrobo cremallera oculta puerto usb portatil instituto impermeable",
    "category": "13 a 15 Años",
    "subcategory": "Mochilas Urbanas y Viaje",
    "ageRange": "13-15",
    "gender": "unisex",
    "priceRange": "20-50",
    "priceText": "35,99 €",
    "rating": 4.8,
    "reviewsCount": 31000,
    "badge": "Seguridad Total en el Transporte Público",
    "description": "La cremallera principal queda totalmente pegada a la espalda haciendo imposible que alguien la abra en el metro o aglomeraciones. Integra cable interior para conectar una powerbank y cargar el móvil por fuera.",
    "pros": [
      "Bolsillo para portátil de hasta 15,6 pulgadas con protección acolchada 3D",
      "Material impermeable que repele la lluvia y los líquidos",
      "Bolsillo secreto en los tirantes para abono transporte"
    ],
    "idealFor": "El instituto, bachillerato y desplazamientos en autobús o metro",
    "style": "tech",
    "imageUrl": "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=700&q=80",
    "images": [
      "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=700&q=80"
    ]
  },
  {
    "id": "1315-neceser-viaje-colgante-gancho",
    "asin": "B07MVD9W37",
    "title": "Neceser de Viaje Colgante Plegable Impermeable con Gancho Giratorio 360° para Campamentos",
    "slug": "neceser-viaje-colgante-gancho-giratorio-campamentos",
    "searchQuery": "neceser viaje colgante organizador bano plegable gancho impermeable campamentos excursiones",
    "category": "13 a 15 Años",
    "subcategory": "Mochilas Urbanas y Viaje",
    "ageRange": "13-15",
    "gender": "unisex",
    "priceRange": "<20",
    "priceText": "18,50 €",
    "rating": 4.9,
    "reviewsCount": 14200,
    "badge": "El Favorito de Campamentos y Viajes",
    "description": "Se despliega en la pared del baño o la puerta del armario permitiendo ver y acceder a geles, champú, cepillo de dientes y lentillas sin ocupar espacio en el lavabo ni desordenar la maleta.",
    "pros": [
      "Tejido hidrófugo de secado rápido que evita fugas de líquidos",
      "Bolsillos transparentes de PVC para pasar controles de seguridad",
      "Cremalleras dobles reforzadas"
    ],
    "idealFor": "Campamentos de verano, excursiones del colegio y viajes con amigos",
    "style": "tech",
    "imageUrl": "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=700&q=80",
    "images": [
      "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=700&q=80"
    ]
  },
  {
    "id": "1315-bolsa-deporte-zapatero-independiente",
    "asin": "B07MVD9W38",
    "title": "Bolsa de Deporte y Viaje Plegable con Compartimento Ventilado Independiente para Zapatillas",
    "slug": "bolsa-deporte-compartimento-zapatillas-ventilado",
    "searchQuery": "bolsa de deporte viaje gimnasio compartimento zapatero independiente impermeable bolsillo humedo",
    "category": "13 a 15 Años",
    "subcategory": "Mochilas Urbanas y Viaje",
    "ageRange": "13-15",
    "gender": "unisex",
    "priceRange": "20-50",
    "priceText": "27,90 €",
    "rating": 4.8,
    "reviewsCount": 16700,
    "badge": "Zapatero Independiente con Respiraderos",
    "description": "Bolsa de 35 litros con un compartimento lateral exclusivo para calzado con orificios de ventilación que aísla las zapatillas sucias del resto de la ropa limpia. Incluye bolsillo húmedo para toallas o bañador mojado.",
    "pros": [
      "Bolsillo de plástico estanco para ropa de piscina o sudada",
      "Correa de hombro acolchada extraíble y asas reforzadas",
      "Cumple medidas oficiales para llevar como equipaje de mano"
    ],
    "idealFor": "Entrenamientos deportivos diarios, natación y escapadas de fin de semana",
    "style": "classic",
    "imageUrl": "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=700&q=80",
    "images": [
      "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=700&q=80"
    ]
  },
  {
    "id": "1618-dualsense-edge-pro",
    "asin": "B0BSV4J2K4",
    "title": "Sony PlayStation - Mando Inalámbrico DualSense Edge Pro para PS5 con Palancas Traseras y Topes Ajustables",
    "slug": "mando-dualsense-edge-pro-playstation-5",
    "searchQuery": "mando dualsense edge pro playstation 5 palancas traseras competitivo",
    "category": "16 a 18 Años",
    "subcategory": "Videojuegos y Accesorios PS5",
    "ageRange": "16-18",
    "gender": "unisex",
    "priceRange": ">100",
    "priceText": "219,00 €",
    "rating": 4.8,
    "reviewsCount": 4200,
    "badge": "Mando Pro de Competición Oficial",
    "description": "El mando de élite definitivo de Sony para eSports. Palancas traseras mapeables, topes de gatillo ajustables para disparo instantáneo y módulos de stick reemplazables con estuche rígido prémium.",
    "pros": [
      "Módulos de stick reemplazables para evitar el desgaste por drift",
      "Perfiles de botones guardables al instante",
      "Sensaciones hápticas inigualables"
    ],
    "idealFor": "El regalo definitivo para un gamer exigente de 16 a 18 años",
    "style": "gamer",
    "imageUrl": "/images/products/1618-dualsense-edge-1.jpg",
    "images": [
      "/images/products/1618-dualsense-edge-1.jpg",
      "/images/products/1618-dualsense-edge-2.jpg",
      "/images/products/1618-dualsense-edge-3.jpg"
    ]
  },
  {
    "id": "1618-spiderman-2-ps5",
    "asin": "B07MVD9W39",
    "title": "Marvel's Spider-Man 2 para PlayStation 5 (Juego Físico Oficial en Español)",
    "slug": "marvels-spider-man-2-playstation-5-juego-fisico",
    "searchQuery": "marvels spider man 2 playstation 5 juego fisico peter parker miles morales venom",
    "category": "16 a 18 Años",
    "subcategory": "Videojuegos y Accesorios PS5",
    "ageRange": "16-18",
    "gender": "unisex",
    "priceRange": "50-100",
    "priceText": "69,99 €",
    "rating": 4.9,
    "reviewsCount": 16500,
    "badge": "El Mejor Juego de Acción de PS5",
    "description": "Peter Parker y Miles Morales se unen para enfrentarse a la amenaza definitiva de Venom y Kraven en una Nueva York hiperrealista. Balanceo instantáneo con telarañas y alas delta a 60 fps con audio 3D.",
    "pros": [
      "Aprovecha al 100% los gatillos adaptativos y la vibración háptica del mando DualSense",
      "Gráficos de nueva generación con trazado de rayos (Ray Tracing)",
      "Alterna al instante entre Peter Parker con el simbionte y Miles Morales"
    ],
    "idealFor": "Cualquier poseedor de una consola PlayStation 5",
    "style": "gamer",
    "imageUrl": "https://images.unsplash.com/photo-1607604276583-eef5d076aa5f?w=700&q=80",
    "images": [
      "https://images.unsplash.com/photo-1607604276583-eef5d076aa5f?w=700&q=80"
    ]
  },
  {
    "id": "1618-estacion-carga-dualsense",
    "asin": "B08H99BPJN",
    "title": "Sony PlayStation - Estación de Carga Rápida Doble Oficial para Mandos DualSense de PS5",
    "slug": "estacion-carga-doble-mandos-dualsense-ps5",
    "searchQuery": "estacion de carga doble oficial playstation 5 mandos dualsense base rapida click",
    "category": "16 a 18 Años",
    "subcategory": "Videojuegos y Accesorios PS5",
    "ageRange": "16-18",
    "gender": "unisex",
    "priceRange": "20-50",
    "priceText": "29,90 €",
    "rating": 4.9,
    "reviewsCount": 38000,
    "badge": "Accesorio Oficial Esencial de PS5",
    "description": "Carga hasta dos mandos inalámbricos DualSense al mismo tiempo sin necesidad de conectarlos a la consola, liberando los puertos USB frontales de la PS5. Diseño a juego con la estética futurista de la consola.",
    "pros": [
      "Sistema de acoplamiento por clic magnético inferior súper cómodo",
      "Carga los mandos tan rápido como si estuvieran conectados directamente a la PS5",
      "Mantiene la mesa de juego ordenada y los mandos siempre con batería al 100%"
    ],
    "idealFor": "El setup gaming de cualquier jugador de PlayStation 5",
    "style": "gamer",
    "imageUrl": "https://images.unsplash.com/photo-1615663245857-ac93bb7c39e7?w=700&q=80",
    "images": [
      "https://images.unsplash.com/photo-1615663245857-ac93bb7c39e7?w=700&q=80"
    ]
  },
  {
    "id": "1618-logitech-g502-hero",
    "asin": "B07W4DHKTD",
    "title": "Logitech G502 HERO - Ratón Gaming de Alto Rendimiento con Sensor 25K DPI y 11 Botones Programables",
    "slug": "logitech-g502-hero-raton-gaming-sensor-25k",
    "searchQuery": "logitech g502 hero raton gaming pesos rgb botones programables",
    "category": "16 a 18 Años",
    "subcategory": "Setup Gamer y Periféricos PC",
    "ageRange": "16-18",
    "gender": "unisex",
    "priceRange": "20-50",
    "priceText": "44,90 €",
    "rating": 4.8,
    "reviewsCount": 48000,
    "badge": "El Ratón Gaming Más Vendido del Mundo",
    "description": "El referente mundial en periféricos competitivos: sensor óptico HERO 25K de precisión milimétrica, sistema de pesas ajustables para personalizar el equilibrio, iluminación RGB LIGHTSYNC y rueda de scroll ultrarrápida.",
    "pros": [
      "Sensor óptico ultrapreciso sin suavizado ni aceleración",
      "11 botones configurables para macros de Fortnite, Valorant y LoL",
      "Pesas extraíbles de 3,6 g para ajustar el peso a tu gusto"
    ],
    "idealFor": "Jugadores exigentes de PC y consolas que buscan máxima ventaja",
    "style": "gamer",
    "imageUrl": "https://images.unsplash.com/photo-1615663245857-ac93bb7c39e7?w=700&q=80",
    "images": [
      "https://images.unsplash.com/photo-1615663245857-ac93bb7c39e7?w=700&q=80"
    ]
  },
  {
    "id": "1618-logitech-g413-se",
    "asin": "B09R27BTPF",
    "title": "Logitech G413 SE - Teclado Mecánico Gaming con Interruptores Táctiles y Chasis de Aluminio",
    "slug": "logitech-g413-se-teclado-mecanico-gaming",
    "searchQuery": "logitech g413 se teclado mecanico gaming switch tactil aluminio",
    "category": "16 a 18 Años",
    "subcategory": "Setup Gamer y Periféricos PC",
    "ageRange": "16-18",
    "gender": "unisex",
    "priceRange": "50-100",
    "priceText": "59,99 €",
    "rating": 4.7,
    "reviewsCount": 13500,
    "badge": "Rendimiento Mecánico Puro",
    "description": "Teclado mecánico diseñado para resistir las sesiones de juego más intensas gracias a su cubierta superior de aleación de aluminio de calidad aeronáutica, teclas PBT de alta resistencia al desgaste e interruptores mecánicos táctiles.",
    "pros": [
      "Switches mecánicos táctiles con respuesta inmediata sin ruido molesto",
      "Teclas de PBT prémium que no se desgastan ni cogen brillo con el tiempo",
      "Anti-ghosting con rollover de 6 teclas simultáneas"
    ],
    "idealFor": "Completar el setup gaming definitivo con máxima durabilidad",
    "style": "gamer",
    "imageUrl": "https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=700&q=80",
    "images": [
      "https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=700&q=80"
    ]
  },
  {
    "id": "1618-steelseries-qck-prism-xl",
    "asin": "B08F2BYL99",
    "title": "SteelSeries QcK Prism XL - Alfombrilla Gaming XXL con Iluminación RGB Dinámica en 2 Zonas",
    "slug": "steelseries-qck-prism-xl-alfombrilla-gaming-rgb",
    "searchQuery": "steelseries qck prism xl alfombrilla gaming xxl rgb luces mesa",
    "category": "16 a 18 Años",
    "subcategory": "Setup Gamer y Periféricos PC",
    "ageRange": "16-18",
    "gender": "unisex",
    "priceRange": "20-50",
    "priceText": "39,99 €",
    "rating": 4.8,
    "reviewsCount": 17800,
    "badge": "La Alfombrilla Gamer de los eSports",
    "description": "Alfombrilla gigante de 900 x 300 mm que cubre todo el escritorio para apoyar el teclado y el ratón. Tejido de microfibra de alta densidad optimizado para sensores ópticos y borde cosido con luz LED RGB personalizable.",
    "pros": [
      "Espacio total para movimientos de ratón sin límites",
      "Base de goma antideslizante gruesa de 4 mm",
      "Iluminación reactiva con Discord y videojuegos compatibles"
    ],
    "idealFor": "Estética espectacular en el escritorio y precisión en partidas online",
    "style": "gamer",
    "imageUrl": "https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=700&q=80",
    "images": [
      "https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=700&q=80"
    ]
  },
  {
    "id": "1618-meta-quest-3s",
    "asin": "B0D8XQ9Y77",
    "title": "Meta Quest 3S - Gafas de Realidad Virtual Todo en Uno 128GB con Realidad Mixta en Color",
    "slug": "meta-quest-3s-gafas-realidad-virtual-128gb",
    "searchQuery": "meta quest 3s gafas realidad virtual todo en uno realidad mixta mandos touch plus",
    "category": "16 a 18 Años",
    "subcategory": "Tecnología, Audio Hi-Fi y Wearables",
    "ageRange": "16-18",
    "gender": "unisex",
    "priceRange": ">100",
    "priceText": "329,99 €",
    "rating": 4.8,
    "reviewsCount": 9200,
    "badge": "La Puerta de Entrada al Metaverso y RV",
    "description": "Inmersión total sin cables ni PC gracias al procesador Snapdragon XR2 Gen 2. Cámaras de paso en color de alta resolución que mezclan objetos digitales en tu propia habitación física con mandos Touch Plus ergonómicos.",
    "pros": [
      "Totalmente inalámbrico: enciende y juega en cualquier habitación sin cables",
      "Catálogo enorme con juegos como Beat Saber, Batman Arkham Shadow y Roblox",
      "Resolución ultranítida con sonido espacial 3D integrado"
    ],
    "idealFor": "El regalo tecnológico más deseado de los 18 años",
    "style": "tech",
    "imageUrl": "https://images.unsplash.com/photo-1593508512255-86ab42a8e620?w=700&q=80",
    "images": [
      "https://images.unsplash.com/photo-1593508512255-86ab42a8e620?w=700&q=80"
    ]
  },
  {
    "id": "1618-sony-wh1000xm4",
    "asin": "B0863TXGM3",
    "title": "Sony WH-1000XM4 - Auriculares de Diadema Inalámbricos con Noise Cancelling Líder del Sector",
    "slug": "sony-wh1000xm4-auriculares-cancelacion-ruido-hifi",
    "searchQuery": "sony wh 1000xm4 auriculares diadema bluetooth noise cancelling hi res ldac",
    "category": "16 a 18 Años",
    "subcategory": "Tecnología, Audio Hi-Fi y Wearables",
    "ageRange": "16-18",
    "gender": "unisex",
    "priceRange": ">100",
    "priceText": "219,00 €",
    "rating": 4.8,
    "reviewsCount": 42000,
    "badge": "La Referencia Mundial en Audio Hi-Fi",
    "description": "Cancelación de ruido adaptativa con procesador HD QN1 que silencia por completo el ruido del transporte público, la calle o las conversaciones. Códec LDAC de alta resolución, 30 horas de batería y función Speak-to-Chat.",
    "pros": [
      "El silencio más absoluto del mercado para estudiar y desconectar",
      "Sonido audiófilo con graves profundos y agudos cristalinos",
      "Comodidad extrema con almohadillas de uretano que no fatigan la cabeza"
    ],
    "idealFor": "Concentración total para Selectividad, universidad y amantes de la música",
    "style": "tech",
    "imageUrl": "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=700&q=80",
    "images": [
      "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=700&q=80"
    ]
  },
  {
    "id": "1618-quntis-barra-luz-monitor",
    "asin": "B08C7KG5LP",
    "title": "Quntis - Barra de Luz LED para Monitor con Control Táctil, Anti-Reflejos y Cuidado Ocular",
    "slug": "quntis-barra-luz-led-monitor-screenbar",
    "searchQuery": "quntis barra luz monitor screenbar cuidado ocular escritorio",
    "category": "16 a 18 Años",
    "subcategory": "Tecnología, Audio Hi-Fi y Wearables",
    "ageRange": "16-18",
    "gender": "unisex",
    "priceRange": "20-50",
    "priceText": "39,99 €",
    "rating": 4.8,
    "reviewsCount": 14600,
    "badge": "Esencial Setup Moderno",
    "description": "Barra lumínica que se engancha en la parte superior de cualquier monitor para iluminar el escritorio sin proyectar ningún reflejo en la pantalla. Reduce la fatiga visual al estudiar o jugar de noche y ahorra espacio de lámpara.",
    "pros": [
      "Diseño óptico asimétrico que ilumina solo la mesa, nunca la pantalla",
      "Temperatura de color ajustable de luz cálida a blanca fría",
      "Alimentación por puerto USB del ordenador o cargador"
    ],
    "idealFor": "Estudiar de noche, programar y sesiones nocturnas de gaming",
    "style": "tech",
    "imageUrl": "https://images.unsplash.com/photo-1542751371-adc38448a05e?w=700&q=80",
    "images": [
      "https://images.unsplash.com/photo-1542751371-adc38448a05e?w=700&q=80"
    ]
  },
  {
    "id": "1618-ck-one-100ml",
    "asin": "B00S2WDIGG",
    "title": "Calvin Klein CK One - Eau de Toilette 100ml Unisex Original",
    "slug": "calvin-klein-ck-one-eau-de-toilette-100ml",
    "searchQuery": "calvin klein ck one 100ml original eau de toilette perfume unisex",
    "category": "16 a 18 Años",
    "subcategory": "Perfumería y Fragancias",
    "ageRange": "16-18",
    "gender": "unisex",
    "priceRange": "20-50",
    "priceText": "29,95 €",
    "rating": 4.8,
    "reviewsCount": 28400,
    "badge": "El Icono de la Perfumería Juvenil",
    "description": "El perfume unisex más icónico de todos los tiempos. Notas de salida de mandarina, papaya, bergamota y limón con corazón de nuez moscada, violeta y jazmín. Un aroma limpio, fresco y atemporal que nunca falla.",
    "pros": [
      "Aroma limpio y universalmente halagado",
      "Frasco de 100ml con excelente relación calidad-precio",
      "Garantía 100% original con envío Prime"
    ],
    "idealFor": "El primer perfume de firma para chicos y chicas de 16 a 18 años",
    "style": "classic",
    "imageUrl": "/images/products/1618-ck-one-1.jpg",
    "images": [
      "/images/products/1618-ck-one-1.jpg",
      "/images/products/1618-ck-one-2.jpg",
      "/images/products/1618-ck-one-3.jpg"
    ]
  },
  {
    "id": "1618-woodwick-fireside-vela",
    "asin": "B07DHNYP2Z",
    "title": "WoodWick - Vela Aromática Grande con Mecha de Madera Crepitante Fireside en Vaso de Cristal",
    "slug": "woodwick-vela-aromatica-mecha-madera-fireside",
    "searchQuery": "woodwick vela aromatica mecha de madera vaso cristal fireside cera",
    "category": "16 a 18 Años",
    "subcategory": "Perfumería y Fragancias",
    "ageRange": "16-18",
    "gender": "unisex",
    "priceRange": "20-50",
    "priceText": "24,90 €",
    "rating": 4.8,
    "reviewsCount": 5400,
    "badge": "Sonido Real de Chimenea Crujiente",
    "description": "La vela favorita para crear una atmósfera introspectiva y relajante. Su mecha de madera natural patentada Pluswick emite un sonido crujiente envolvente mientras difunde notas de ámbar cálido, maderas y humo noble.",
    "pros": [
      "Mecha de madera que cruje como fuego real",
      "Cera de soja premium con combustión limpia",
      "Elegante vaso de cristal en forma de reloj de arena con tapa de madera"
    ],
    "idealFor": "Crear un santuario estético y cálido en la habitación juvenil",
    "style": "emo",
    "imageUrl": "/images/products/1618-vela-woodwick-1.jpg",
    "images": [
      "/images/products/1618-vela-woodwick-1.jpg",
      "/images/products/1618-vela-woodwick-2.jpg",
      "/images/products/1618-vela-woodwick-3.jpg"
    ]
  },
  {
    "id": "1618-hugo-boss-bottled-eau-toilette",
    "asin": "B000GHWUT8",
    "title": "Hugo Boss BOSS Bottled - Eau de Toilette para Hombre 50ml con Notas de Manzana, Canela y Madera",
    "slug": "hugo-boss-bottled-eau-de-toilette-50ml",
    "searchQuery": "hugo boss boss bottled eau de toilette 50ml perfume hombre original elegante",
    "category": "16 a 18 Años",
    "subcategory": "Perfumería y Fragancias",
    "ageRange": "16-18",
    "gender": "boy",
    "priceRange": "20-50",
    "priceText": "44,95 €",
    "rating": 4.8,
    "reviewsCount": 31000,
    "badge": "Elegancia y Seguridad Masculina",
    "description": "Uno de los perfumes masculinos más aclamados del mundo: una salida afrutada de manzana roja fresca y bergamota con corazón especiado de canela y clavo sobre un fondo noble de sándalo, cedro y vetiver.",
    "pros": [
      "Aroma sofisticado pero fresco que proyecta madurez y confianza",
      "Excelente fijación en piel y ropa durante más de 8 horas",
      "Frasco icónico de cristal macizo"
    ],
    "idealFor": "Graduaciones, eventos elegantes y primeras citas",
    "style": "classic",
    "imageUrl": "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=700&q=80",
    "images": [
      "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=700&q=80"
    ]
  },
  {
    "id": "1618-habitos-atomicos-james-clear",
    "asin": "8418118034",
    "title": "Hábitos Atómicos - James Clear: Cambios Pequeños, Resultados Extraordinarios (Tapa Blanda)",
    "slug": "habitos-atomicos-james-clear-libro-autoayuda",
    "searchQuery": "habitos atomicos james clear diana libro productividad organizacion exito juvenil",
    "category": "16 a 18 Años",
    "subcategory": "Libros y Novelas Juveniles",
    "ageRange": "16-18",
    "gender": "unisex",
    "priceRange": "<20",
    "priceText": "18,95 €",
    "rating": 4.9,
    "reviewsCount": 65000,
    "badge": "El Libro Más Vendido del Mundo para Cambiar de Vida",
    "description": "El manual definitivo para adolescentes que quieren preparar la Selectividad, la universidad o el deporte de élite: cómo mejorar un 1% cada día mediante pequeñas acciones diarias que se acumulan en un éxito arrollador.",
    "pros": [
      "Enfoque científico práctico y ameno sin tópicos vacíos de autoayuda",
      "Técnicas inmediatas para vencer la procrastinación y la adicción al móvil",
      "Cambia radicalmente la mentalidad de estudio y disciplina"
    ],
    "idealFor": "Jóvenes que se preparan para su futuro universitario o profesional",
    "style": "classic",
    "imageUrl": "https://images.unsplash.com/photo-1544717305-2782549b5136?w=700&q=80",
    "images": [
      "https://images.unsplash.com/photo-1544717305-2782549b5136?w=700&q=80"
    ]
  },
  {
    "id": "1618-el-sutil-arte-mark-manson",
    "asin": "8417001087",
    "title": "El Sutil Arte de que (Casi Todo) Te Importe una Mierda - Mark Manson (HarperCollins)",
    "slug": "el-sutil-arte-de-que-te-importe-una-mierda-mark-manson",
    "searchQuery": "el sutil arte de que casi todo te importe una mierda mark manson harpercollins libro",
    "category": "16 a 18 Años",
    "subcategory": "Libros y Novelas Juveniles",
    "ageRange": "16-18",
    "gender": "unisex",
    "priceRange": "<20",
    "priceText": "17,95 €",
    "rating": 4.8,
    "reviewsCount": 42000,
    "badge": "La Guía Realista para Superar la Ansiedad Social",
    "description": "Un manifiesto directo, crudo y lleno de humor negro que enseña a los jóvenes a aceptar sus defectos y fracasos sin frustrarse por la falsa perfección de las redes sociales, eligiendo solo lo que de verdad importa.",
    "pros": [
      "Lenguaje fresco y directo sin rodeos que conecta al 100% con la mentalidad juvenil",
      "Alivia la presión social de tener que ser siempre feliz y exitoso",
      "Lectura ágil y sumamente entretenida"
    ],
    "idealFor": "Adolescentes que sienten agobio por expectativas ajenas y redes sociales",
    "style": "classic",
    "imageUrl": "https://images.unsplash.com/photo-1589829085413-56de8ae18c73?w=700&q=80",
    "images": [
      "https://images.unsplash.com/photo-1589829085413-56de8ae18c73?w=700&q=80"
    ]
  },
  {
    "id": "1618-alas-de-sangre-rebecca-yarros",
    "asin": "8408279995",
    "title": "Alas de Sangre (Empíreo 1) - Rebecca Yarros (El Bestseller Mundial de Fantasía y Dragones)",
    "slug": "alas-de-sangre-rebecca-yarros-fourth-wing-novela",
    "searchQuery": "alas de sangre rebecca yarros fourth wing novela fantasia dragones planeta",
    "category": "16 a 18 Años",
    "subcategory": "Libros y Novelas Juveniles",
    "ageRange": "16-18",
    "gender": "unisex",
    "priceRange": "20-50",
    "priceText": "22,90 €",
    "rating": 4.9,
    "reviewsCount": 38000,
    "badge": "El Fenómeno Romantasy de BookTok",
    "description": "Violet Sorrengail es enviada al Cuadrante de los Jinetes de Dragones, donde la regla es clara: graduarse o morir. Un mundo letal de magia, intrigas militares y dragones despiadados que no toleran debilidades.",
    "pros": [
      "Trama adictiva que te mantiene despierto leyendo hasta las 3 de la mañana",
      "Química arrolladora entre los protagonistas y combates aéreos épicos",
      "Edición de lujo en tapa dura con cantos tintados"
    ],
    "idealFor": "Lectores apasionados de la fantasía épica, dragones y BookTok",
    "style": "classic",
    "imageUrl": "https://images.unsplash.com/photo-1512820790803-83ca734da794?w=700&q=80",
    "images": [
      "https://images.unsplash.com/photo-1512820790803-83ca734da794?w=700&q=80"
    ]
  },
  {
    "id": "1618-moonster-diario-cuero",
    "asin": "B08TCGQ3RG",
    "title": "Moonster - Diario de Cuero Vintage Relieve Árbol de la Vida con Páginas Pergamino Artesanales",
    "slug": "moonster-diario-cuero-vintage-arbol-vida",
    "searchQuery": "moonster diario de cuero vintage hojas envejecidas cuaderno artesanal",
    "category": "16 a 18 Años",
    "subcategory": "Cuadernos de Piel y Papelería Artesanal",
    "ageRange": "16-18",
    "gender": "unisex",
    "priceRange": "20-50",
    "priceText": "24,95 €",
    "rating": 4.9,
    "reviewsCount": 6800,
    "badge": "Cuero Auténtico Curtido a Mano",
    "description": "Páginas gruesas de papel de algodón reciclado envejecido a mano que no traspasa la tinta de estilográfica, acuarelas ni rotuladores. Portada de auténtico cuero con relieve simbólico y cinta de cierre rústica.",
    "pros": [
      "240 páginas de papel pergamino artesanal",
      "Sin químicos ni blanqueadores",
      "Tacto envejecido exclusivo y duradero"
    ],
    "idealFor": "Escribir poesía, pensamientos, dibujos oscuros o letras de canciones",
    "style": "emo",
    "imageUrl": "/images/products/1618-diario-cuero-1.jpg",
    "images": [
      "/images/products/1618-diario-cuero-1.jpg",
      "/images/products/1618-diario-cuero-2.jpg",
      "/images/products/1618-diario-cuero-3.jpg"
    ]
  },
  {
    "id": "1618-pluma-estilografica-dryden",
    "asin": "B07MVD9W40",
    "title": "Dryden Designs - Pluma Estilográfica de Lujo con Plumín Fino de Acero y Estuche de Regalo",
    "slug": "dryden-designs-pluma-estilografica-lujo-estuche",
    "searchQuery": "dryden designs pluma estilografica lujo plumin fino estuche regalo convertidor tinta",
    "category": "16 a 18 Años",
    "subcategory": "Cuadernos de Piel y Papelería Artesanal",
    "ageRange": "16-18",
    "gender": "unisex",
    "priceRange": "20-50",
    "priceText": "27,95 €",
    "rating": 4.8,
    "reviewsCount": 14200,
    "badge": "Escritura Suave y Sofisticada",
    "description": "Cuerpo metálico equilibrado con acabado lacado brillante y plumín de acero inoxidable finamente pulido. Flujo de tinta constante sin fugas ni borrones. Incluye convertidor para tintero recargable y cartuchos estándar.",
    "pros": [
      "Equilibrio de peso perfecto en la mano para escribir durante horas",
      "Elegante estuche de terciopelo listo para regalar",
      "Compatible con cartuchos universales y tintas de frasco"
    ],
    "idealFor": "Firmar exámenes importantes, escribir cartas personales y caligrafía",
    "style": "classic",
    "imageUrl": "https://images.unsplash.com/photo-1585366119957-e9730b6d0f60?w=700&q=80",
    "images": [
      "https://images.unsplash.com/photo-1585366119957-e9730b6d0f60?w=700&q=80"
    ]
  },
  {
    "id": "1618-moleskine-clasico-tapa-dura",
    "asin": "B00006IF5V",
    "title": "Moleskine Classic Cuaderno Grande A5 Tapa Dura Negra Hojas Rayadas con Bolsillo Interior",
    "slug": "moleskine-classic-cuaderno-a5-tapa-dura-negra",
    "searchQuery": "moleskine classic cuaderno grande a5 tapa dura negra hojas rayadas libreta autor",
    "category": "16 a 18 Años",
    "subcategory": "Cuadernos de Piel y Papelería Artesanal",
    "ageRange": "16-18",
    "gender": "unisex",
    "priceRange": "20-50",
    "priceText": "21,50 €",
    "rating": 4.9,
    "reviewsCount": 31000,
    "badge": "La Libreta de Escritores y Artistas",
    "description": "Heredera del legendario cuaderno utilizado por Hemingway, Picasso y Chatwin: esquinas redondeadas, cinta marcapáginas, cierre elástico y bolsillo trasero fuelle para billetes y notas. Papel marfil libre de ácido de 70 g/m².",
    "pros": [
      "Diseño mítico atemporal de elegancia minimalista",
      "Apertura plana total de 180° que facilita la escritura en cualquier lugar",
      "Materiales de archivo resistentes que duran décadas"
    ],
    "idealFor": "Tomar notas en la universidad, reflexiones de vida e ideas creativas",
    "style": "classic",
    "imageUrl": "https://images.unsplash.com/photo-1544717305-2782549b5136?w=700&q=80",
    "images": [
      "https://images.unsplash.com/photo-1544717305-2782549b5136?w=700&q=80"
    ]
  },
  {
    "id": "1618-cartera-rfid-fibra-carbono",
    "asin": "B07MVD9W41",
    "title": "Cartera Billetera Minimalista con Bloqueo RFID en Fibra de Carbono con Clip para Billetes",
    "slug": "cartera-minimalista-fibra-carbono-bloqueo-rfid",
    "searchQuery": "cartera minimalista fibra carbono bloqueo rfid tarjetero fino clip billetes hombre",
    "category": "16 a 18 Años",
    "subcategory": "Moda Urbana, Ropa y Accesorios",
    "ageRange": "16-18",
    "gender": "unisex",
    "priceRange": "20-50",
    "priceText": "24,99 €",
    "rating": 4.8,
    "reviewsCount": 22000,
    "badge": "El Tarjetero Moderno y Antirrobo",
    "description": "Diseño ultra delgado que cabe en el bolsillo delantero del pantalón sin abultar. Placas de fibra de carbono aeroespacial con blindaje RFID que bloquea el escaneo no autorizado de tarjetas bancarias y DNI electrónico.",
    "pros": [
      "Grosor de solo 8 mm: olvídate de las carteras gruesas e incómodas",
      "Capacidad elástica para hasta 12 tarjetas y pinza metálica para billetes",
      "Acabado en fibra de carbono mate de estética prémium"
    ],
    "idealFor": "Jóvenes que buscan practicidad minimalista y estilo tecnológico",
    "style": "tech",
    "imageUrl": "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=700&q=80",
    "images": [
      "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=700&q=80"
    ]
  },
  {
    "id": "1618-sudadera-grunge-vintage",
    "asin": "B07MVD9W42",
    "title": "Sudadera con Capucha Grunge Aesthetic de Algodón Lavado Vintage Corte Holgado",
    "slug": "sudadera-hoodie-grunge-aesthetic-lavado-vintage",
    "searchQuery": "sudadera con capucha grunge vintage lavado acido oversize aesthetic juvenil streetwear",
    "category": "16 a 18 Años",
    "subcategory": "Moda Urbana, Ropa y Accesorios",
    "ageRange": "16-18",
    "gender": "unisex",
    "priceRange": "20-50",
    "priceText": "34,95 €",
    "rating": 4.8,
    "reviewsCount": 9800,
    "badge": "Estilo Streetwear Tendencia",
    "description": "Efecto de lavado ácido desgastado (acid wash) que confiere a cada sudadera un aspecto vintage único. Confeccionada en algodón 100% de alto gramaje con capucha amplia de doble capa y hombros caídos estilo skate.",
    "pros": [
      "Tacto envejecido exclusivo y caída holgada muy favorecedora",
      "Tejido pesado de 380 GSM que abriga de verdad",
      "La prenda más buscada en moda urbana actual"
    ],
    "idealFor": "Looks informales con vaqueros anchos o pantalones cargo",
    "style": "emo",
    "imageUrl": "https://images.unsplash.com/photo-1556905055-8f358a7a47b2?w=700&q=80",
    "images": [
      "https://images.unsplash.com/photo-1556905055-8f358a7a47b2?w=700&q=80"
    ]
  },
  {
    "id": "1618-gafas-sol-polarizadas-retro",
    "asin": "B07MVD9W43",
    "title": "Gafas de Sol Polarizadas Estilo Retro con Montura de Acetato y Protección UV400 Unisex",
    "slug": "gafas-sol-polarizadas-retro-acetato-uv400",
    "searchQuery": "gafas de sol polarizadas estilo wayfarer retro acetato proteccion uv400 unisex estuche",
    "category": "16 a 18 Años",
    "subcategory": "Moda Urbana, Ropa y Accesorios",
    "ageRange": "16-18",
    "gender": "unisex",
    "priceRange": "<20",
    "priceText": "19,95 €",
    "rating": 4.8,
    "reviewsCount": 18400,
    "badge": "Protección UV400 y Visión Nítida",
    "description": "Lentes polarizadas de 9 capas que eliminan los reflejos del asfalto y el agua mejorando el contraste visual. Montura ligera y resistente en acetato negro mate con bisagras metálicas de resorte flexible.",
    "pros": [
      "Filtro 100% UV400 que protege la vista contra rayos UVA y UVB",
      "Bisagras de resorte que se adaptan a cualquier tamaño de cara sin apretar",
      "Incluye funda rígida, paño de microfibra y tarjeta de test de polarizado"
    ],
    "idealFor": "Verano, conducir, festivales y uso diario con estilo atemporal",
    "style": "classic",
    "imageUrl": "https://images.unsplash.com/photo-1511499767150-a48a237f0083?w=700&q=80",
    "images": [
      "https://images.unsplash.com/photo-1511499767150-a48a237f0083?w=700&q=80"
    ]
  }
];
