const fs = require('fs');
const path = require('path');

// Read categories to validate
const { AGE_CATEGORIES, AGE_SUBCATEGORIES_MAP } = require('../src/data/categories.ts');

const products = [];

function add(p) {
  // Validate ageRange
  if (!['0-12m', '1-3', '4-6', '7-9', '10-12', '13-15', '16-18', '+18'].includes(p.ageRange)) {
    throw new Error(`Invalid ageRange ${p.ageRange} for ${p.id}`);
  }
  // Validate subcategory exists in age
  const allowed = AGE_SUBCATEGORIES_MAP[p.ageRange];
  if (!allowed.includes(p.subcategory)) {
    throw new Error(`Subcategory "${p.subcategory}" not allowed in ${p.ageRange} for ${p.id}. Allowed: ${allowed.join(', ')}`);
  }
  // Check duplicate id
  if (products.some(x => x.id === p.id)) {
    throw new Error(`Duplicate ID: ${p.id}`);
  }
  products.push(p);
}

// =========================================================================
// 0 A 12 MESES (RECIÉN NACIDOS Y BEBÉS)
// =========================================================================

// 1. Cochecitos y Mobiliario de Bebé
add({
  id: '012-cochecito-chicco-london',
  asin: 'B0DLWK3LKH',
  title: 'Chicco London Up - Silla de Paseo Ligera Plegable Tipo Paraguas Reclinable 4 Posiciones',
  slug: 'chicco-london-silla-paseo-ligera-plegable',
  searchQuery: 'chicco london silla paseo ligera compacta plegable paraguas',
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
  images: ['/images/products/bebe-cochecito-1.jpg','/images/products/bebe-cochecito-2.jpg','/images/products/bebe-cochecito-3.jpg']
});

add({
  id: '012-carrito-kinderkraft-grande',
  asin: 'B07V493R3H',
  title: 'Kinderkraft GRANDE PLUS - Silla de Paseo Plegado con una Sola Mano y Ruedas Amortiguadas',
  slug: 'kinderkraft-grande-plus-silla-paseo-plegado-una-mano',
  searchQuery: 'kinderkraft grande plus silla paseo ligera amortiguacion bebe',
  category: 'Recién Nacidos',
  subcategory: 'Cochecitos y Mobiliario de Bebé',
  ageRange: '0-12m',
  gender: 'unisex',
  priceRange: '50-100',
  priceText: '99,00 €',
  rating: 4.7,
  reviewsCount: 6200,
  badge: 'Plegado con 1 Sola Mano',
  description: 'Silla de paseo todoterreno para bebés desde el nacimiento hasta 22 kg. Sistema CLICK & FOLD que pliega el carrito automáticamente con una mano mientras sostienes al bebé.',
  pros: ['Amortiguación en las 4 ruedas anti-pinchazos de espuma EVA', 'Capota extensible XL con filtro solar UPF50+', 'Respaldo con ajuste fluido hasta posición completamente tumbada'],
  idealFor: 'Familias activas que buscan comodidad y plegado instantáneo',
  style: 'baby',
  imageUrl: '/images/products/012-carrito-kinderkraft-grande-1.jpg',
  images: ['/images/products/012-carrito-kinderkraft-grande-1.jpg']
});

add({
  id: '012-hamaca-babybjorn-bliss',
  asin: 'B071F2T84L',
  title: 'BabyBjörn Hamaca Bliss - Hamaca Ergonómica con Balanceo Natural de Algodón Suave',
  slug: 'babybjorn-hamaca-bliss-algodon-ergonomica',
  searchQuery: 'babybjorn hamaca bliss algodon ergonomica balanceo natural',
  category: 'Recién Nacidos',
  subcategory: 'Cochecitos y Mobiliario de Bebé',
  ageRange: '0-12m',
  gender: 'unisex',
  priceRange: '>100',
  priceText: '179,00 €',
  rating: 4.9,
  reviewsCount: 14500,
  badge: 'La Hamaca Favorita de los Pediatras',
  description: 'Balanceo natural activado por los propios movimientos del bebé sin pilas ni cables. Soporte ergonómico adecuado para la espalda, la cabeza y el cuello del recién nacido.',
  pros: ['Funda de algodón 100% desenfundable y lavable a máquina', 'Se pliega totalmente plana para guardar bajo la cama o viajar', '3 posiciones de inclinación: jugar, descansar y dormir'],
  idealFor: 'Tener al bebé entretenido y seguro cerca de ti en casa',
  style: 'baby',
  imageUrl: '/images/products/012-hamaca-babybjorn-bliss-1.jpg',
  images: ['/images/products/012-hamaca-babybjorn-bliss-1.jpg']
});

// 2. Cunas de Colecho y Descanso
add({
  id: '012-cuna-chicco-next2me',
  asin: 'B0777SWZ33',
  title: 'Chicco Next2Me Dream - Cuna de Colecho con Apertura Lateral con una Mano y Modo Balancín',
  slug: 'chicco-next2me-dream-cuna-colecho-balancin',
  searchQuery: 'chicco next2me dream cuna colecho apertura lateral balancin',
  category: 'Recién Nacidos',
  subcategory: 'Cunas de Colecho y Descanso',
  ageRange: '0-12m',
  gender: 'unisex',
  priceRange: '>100',
  priceText: '199,00 €',
  rating: 4.9,
  reviewsCount: 8800,
  badge: 'La Cuna Colecho Número 1',
  description: 'Permite dormir pegado al recién nacido con total seguridad. Panel lateral abatible con un solo botón, 11 niveles de altura y posición inclinable para evitar el reflujo tras las tomas nocturnas.',
  pros: ['Apertura y cierre del lateral con una sola mano desde la cama', 'Modo balancín relajante para calmar al bebé en segundos', 'Colchón transpirable incluido con tejido de malla de ventilación'],
  idealFor: 'Lactancia materna y noches tranquilas con apego seguro',
  style: 'baby',
  imageUrl: '/images/products/bebe-cuna-colecho-1.jpg',
  images: ['/images/products/bebe-cuna-colecho-1.jpg']
});

add({
  id: '012-nutria-fisher-price',
  asin: 'B07N1J5K47',
  title: 'Fisher-Price Nutria Dulces Sueños - Peluche Relajante con Movimiento de Respiración y Música',
  slug: 'fisher-price-nutria-dulces-suenos-respiracion',
  searchQuery: 'fisher price nutria dulces suenos peluche respiracion luz suave musica',
  category: 'Recién Nacidos',
  subcategory: 'Cunas de Colecho y Descanso',
  ageRange: '0-12m',
  gender: 'unisex',
  priceRange: '20-50',
  priceText: '39,99 €',
  rating: 4.8,
  reviewsCount: 31000,
  badge: 'Viral en TikTok • Calma Cólicos',
  description: 'Peluche sensorial que imita el movimiento rítmico de la respiración humana para tranquilizar al bebé de forma natural. Incluye 30 minutos de música relajante, sonidos de latidos y luz tenue.',
  pros: ['Efecto relajante comprobado para conciliar el sueño en la cuna', 'Tejidos extrasuaves lavables a máquina retirando el módulo', 'Control de volumen y luces personalizable'],
  idealFor: 'Calmar llantos, cólicos de lactante y siestas plácidas',
  style: 'baby',
  imageUrl: '/images/products/012-nutria-fisher-price-1.jpg',
  images: ['/images/products/012-nutria-fisher-price-1.jpg']
});

add({
  id: '012-saco-dormir-bebe-tog',
  asin: 'B08F2BGZ9L',
  title: 'Tommee Tippee The Original Grobag - Saco de Dormir para Bebé de Algodón Orgánico 2.5 TOG',
  slug: 'tommee-tippee-grobag-saco-dormir-bebe-2-5-tog',
  searchQuery: 'saco de dormir bebe tommee tippee grobag algodon cremallera doble',
  category: 'Recién Nacidos',
  subcategory: 'Cunas de Colecho y Descanso',
  ageRange: '0-12m',
  gender: 'unisex',
  priceRange: '20-50',
  priceText: '26,95 €',
  rating: 4.8,
  reviewsCount: 11200,
  badge: 'Sueño Seguro sin Mantas',
  description: 'Recomendado por la Fundación Británica para la Salud Infantil. Evita que el bebé se destape o se tape la cara durante la noche. Cremallera bidireccional para cambiar pañales fácilmente en la oscuridad.',
  pros: ['Aislamiento térmico 2.5 TOG ideal para entretiempo e invierno (16-20°C)', 'Ajuste holgado en las caderas certificado como seguro por el IHDI', '100% algodón suave hipoalergénico'],
  idealFor: 'Dormir con temperatura constante sin riesgo de asfixia',
  style: 'baby',
  imageUrl: '/images/products/012-saco-dormir-bebe-tog-1.jpg',
  images: ['/images/products/012-saco-dormir-bebe-tog-1.jpg']
});

// 3. Bañeras e Higiene del Bebé
add({
  id: '012-banera-skip-hop-moby',
  asin: 'B01LZF2U1M',
  title: 'Skip Hop Moby - Bañera Evolutiva 3 Etapas con Cojín de Malla Smart Sling en Forma de Ballena',
  slug: 'skip-hop-moby-banera-evolutiva-tres-etapas',
  searchQuery: 'skip hop moby banera evolutiva 3 etapas ballena cojin malla',
  category: 'Recién Nacidos',
  subcategory: 'Bañeras e Higiene del Bebé',
  ageRange: '0-12m',
  gender: 'unisex',
  priceRange: '20-50',
  priceText: '42,95 €',
  rating: 4.8,
  reviewsCount: 12400,
  badge: 'La Bañera Más Cómoda y Segura',
  description: 'Acompaña el crecimiento del bebé en 3 etapas: recién nacido (con hamaca de malla), bebé que aprende a sentarse y niño pequeño. Superficie interior antideslizante y tapón de desagüe rápido.',
  pros: ['Hamaca de malla ajustable con bordes acolchados que sujeta la cabeza', 'Gancho integrado para colgar en la barra de la ducha y secar al aire', 'Libre de BPA, PVC y ftalatos'],
  idealFor: 'El baño diario sin miedo a resbalones ni malas posturas',
  style: 'baby',
  imageUrl: '/images/products/bebe-banera-plegable-1.jpg',
  images: ['/images/products/bebe-banera-plegable-1.jpg']
});

add({
  id: '012-neceser-cuidados-suavinex',
  asin: 'B07MVD9W22',
  title: 'Suavinex Baby Care - Neceser de Higiene para Bebé con Termómetro, Cepillo, Peine y Tijeritas',
  slug: 'suavinex-baby-care-neceser-higiene-bebe',
  searchQuery: 'suavinex neceser higiene bebe tijeras lima cortaunas cepillo termometro',
  category: 'Recién Nacidos',
  subcategory: 'Bañeras e Higiene del Bebé',
  ageRange: '0-12m',
  gender: 'unisex',
  priceRange: '20-50',
  priceText: '22,50 €',
  rating: 4.8,
  reviewsCount: 7800,
  badge: 'Set Completo de Farmacia',
  description: 'Neceser compacto con cremallera impermeable que contiene todo lo necesario para el cuidado higiénico: tijeras con punta redondeada, cortaúñas ergonómico, lima, cepillo de cerdas suaves, peine y termómetro digital.',
  pros: ['Materiales de grado médico seguros para recién nacidos', 'Estuche rígido perfecto para llevar en el bolso maternal', 'Colores pastel elegantes'],
  idealFor: 'El bolso del hospital de maternidad y primeros cuidados en casa',
  style: 'baby',
  imageUrl: '/images/products/bebe-suavinex-kit-1.jpg',
  images: ['/images/products/bebe-suavinex-kit-1.jpg']
});

add({
  id: '012-termometro-bano-patito',
  asin: 'B08F2CVZ7P',
  title: 'Philips Avent - Termómetro Digital de Baño y Habitación Flotante con Forma de Flor / Patito',
  slug: 'philips-avent-termometro-digital-bano-habitacion',
  searchQuery: 'philips avent termometro digital bano y habitacion flotante flor bebe',
  category: 'Recién Nacidos',
  subcategory: 'Bañeras e Higiene del Bebé',
  ageRange: '0-12m',
  gender: 'unisex',
  priceRange: '<20',
  priceText: '15,99 €',
  rating: 4.8,
  reviewsCount: 16800,
  badge: 'Precisión Grado Médico',
  description: 'Mide de forma instantánea y precisa la temperatura del agua del baño y de la habitación infantil. Flota en el agua como un divertido juguete y cumple con las normativas europeas de seguridad infantil.',
  pros: ['Lectura rápida en grados Celsius con pantalla digital clara', 'Totalmente sumergible y resistente a golpes', 'Sirve como juguete de baño para cuando crezca'],
  idealFor: 'Asegurar que el agua esté siempre a los 37°C recomendados',
  style: 'baby',
  imageUrl: '/images/products/012-termometro-bano-patito-1.jpg',
  images: ['/images/products/012-termometro-bano-patito-1.jpg']
});

// 4. Tartas de Pañales y Canastillas
add({
  id: '012-tarta-panales-dodot',
  asin: 'B08G8JTY5M',
  title: 'Tarta de Pañales Dodot Sensitive 3 Pisos con Peluche Suave, Babero y Canastilla de Bienvenida',
  slug: 'tarta-panales-dodot-sensitive-3-pisos-peluche',
  searchQuery: 'tarta de panales dodot sensitive 3 pisos canastilla peluche regalo bautizo nacimiento',
  category: 'Recién Nacidos',
  subcategory: 'Tartas de Pañales y Canastillas',
  ageRange: '0-12m',
  gender: 'unisex',
  priceRange: '50-100',
  priceText: '54,95 €',
  rating: 4.9,
  reviewsCount: 3800,
  badge: 'El Regalo Más Agradecido por Padres',
  description: 'Elegante tarta de 3 pisos montada a mano con 50 pañales Dodot Sensitive Talla 2 (la más recomendada por matronas). Coronada con un tierno osito de peluche, muselina de algodón, babero y cinta decorativa en celofán.',
  pros: ['50 pañales Dodot Sensitive 100% aprovechables', 'Presentación espectacular lista para regalar con lazo y tarjeta', 'Incluye peluche de terciopelo homologado CE desde 0 meses'],
  idealFor: 'El regalo estrella en el hospital, baby shower o bautizo',
  style: 'baby',
  imageUrl: '/images/products/bebe-tarta-dodot-3pisos-1.jpg',
  images: ['/images/products/bebe-tarta-dodot-3pisos-1.jpg']
});

add({
  id: '012-canastilla-mustela-bebe',
  asin: 'B079Z5J2R8',
  title: 'Mustela Canastilla Cuidado del Recién Nacido - Gel de Baño, Leche Corporal, Crema Balsámica y Colonia',
  slug: 'mustela-canastilla-cuidado-recien-nacido-bolso',
  searchQuery: 'mustela canastilla regalo bebe bolso maternidad gel crema colonia',
  category: 'Recién Nacidos',
  subcategory: 'Tartas de Pañales y Canastillas',
  ageRange: '0-12m',
  gender: 'unisex',
  priceRange: '20-50',
  priceText: '38,90 €',
  rating: 4.8,
  reviewsCount: 9200,
  badge: 'La Cesta de Maternidad Imprescindible',
  description: 'Práctico bolso organizador con los 5 productos icónicos de farmacia de Mustela con Perseosa de Aguacate biológica para proteger la barrera cutánea del bebé desde el primer día.',
  pros: ['Fórmulas con 98% de ingredientes de origen natural', 'Incluye crema bálsamo 1 2 3 para prevenir rojeces del pañal', 'Bolso con compartimentos reutilizable para el carrito'],
  idealFor: 'Regalo práctico y de máxima garantía farmacéutica',
  style: 'baby',
  imageUrl: '/images/products/bebe-mustela-canastilla-1.jpg',
  images: ['/images/products/bebe-mustela-canastilla-1.jpg']
});

add({
  id: '012-cesta-bienvenida-bebe-madera',
  asin: 'B09R27BTP1',
  title: 'Canastilla de Bienvenida para Bebé en Caja de Madera con Manta Sherpa, Cepillo Natural y Sonajero',
  slug: 'canastilla-bienvenida-bebe-madera-manta-sherpa',
  searchQuery: 'canastilla regalo bebe caja de madera manta muselina sonajero madera cepillo',
  category: 'Recién Nacidos',
  subcategory: 'Tartas de Pañales y Canastillas',
  ageRange: '0-12m',
  gender: 'unisex',
  priceRange: '20-50',
  priceText: '34,99 €',
  rating: 4.9,
  reviewsCount: 4600,
  badge: 'Presentación Rústica Prémium',
  description: 'Set de regalo artesanal presentado en una preciosa caja de madera natural grabada. Incluye manta de tacto borreguito extrasuave, muselina de bambú transpirable, chupetero de madera y mordedor sensorial.',
  pros: ['Materiales naturales de madera de haya sin barnices químicos', 'Manta ultrasuave que no pierde pelo tras los lavados', 'Caja de madera reutilizable para guardar recuerdos del bebé'],
  idealFor: 'Compañeros de trabajo o amigos que quieren hacer un detalle inolvidable',
  style: 'baby',
  imageUrl: '/images/products/012-cesta-bienvenida-bebe-madera-1.jpg',
  images: ['/images/products/012-cesta-bienvenida-bebe-madera-1.jpg']
});

// 5. Juguetes Sensoriales y Mordedores
add({
  id: '012-sophie-la-girafe',
  asin: 'B00068668C',
  title: 'Sophie la Girafe - El Mordedor de Caucho Natural 100% que Estimula los 5 Sentidos del Bebé',
  slug: 'sophie-la-girafe-mordedor-caucho-natural',
  searchQuery: 'sophie la girafe mordedor caucho natural hevea bebe denticion',
  category: 'Recién Nacidos',
  subcategory: 'Juguetes Sensoriales y Mordedores',
  ageRange: '0-12m',
  gender: 'unisex',
  priceRange: '<20',
  priceText: '16,90 €',
  rating: 4.9,
  reviewsCount: 29000,
  badge: 'El Mordedor Más Famoso del Mundo',
  description: 'Fabricada en Francia desde 1961 con caucho 100% natural del árbol de Hevea y pintura alimentaria. Sus manchas oscuras atraen la mirada del recién nacido y sus patas y cuello alargado calman las encías inflamadas.',
  pros: ['Material 100% natural masticable totalmente seguro libre de químicos', 'Emite un suave silbido al apretarla que estimula el oído', 'Textura suave y flexible muy fácil de agarrar con manitas pequeñas'],
  idealFor: 'La etapa de dentición y el desarrollo sensorial temprano',
  style: 'baby',
  imageUrl: '/images/products/012-sophie-la-girafe-1.jpg',
  images: ['/images/products/012-sophie-la-girafe-1.jpg']
});

add({
  id: '012-gimnasio-piano-fisher-price',
  asin: 'B076HYFZ37',
  title: 'Fisher-Price Gimnasio Piano Pataditas Superaprendizaje con Luces, Música y 5 Juguetes Colgantes',
  slug: 'fisher-price-gimnasio-piano-pataditas',
  searchQuery: 'fisher price gimnasio piano pataditas manta actividades bebe',
  category: 'Recién Nacidos',
  subcategory: 'Juguetes Sensoriales y Mordedores',
  ageRange: '0-12m',
  gender: 'unisex',
  priceRange: '20-50',
  priceText: '44,99 €',
  rating: 4.9,
  reviewsCount: 38000,
  badge: 'Top 1 Manta de Actividades',
  description: 'El gimnasio de actividades más premiado. Cuenta con un piano que suena cuando el bebé da pataditas tumbado boca arriba, arco con mordedor y espejo, y modo piano portátil cuando ya se sienta solo.',
  pros: ['Manta acolchada lavable a máquina con divertidos animales', 'Tecnología Inteligente que adapta canciones al crecimiento del bebé', 'Fortalece la musculatura del cuello, espalda y piernas'],
  idealFor: 'Estimular el gateo, los reflejos y el juego boca abajo (tummy time)',
  style: 'baby',
  imageUrl: '/images/products/bebe-gimnasio-piano-1.jpg',
  images: ['/images/products/bebe-gimnasio-piano-1.jpg']
});

add({
  id: '012-mordedor-winkel-manhattan',
  asin: 'B000BNCA4K',
  title: 'Manhattan Toy Winkel - Sonajero y Mordedor Sensorial de Tubos Flexibles y Colores Vivos',
  slug: 'manhattan-toy-winkel-sonajero-mordedor-sensorial',
  searchQuery: 'manhattan toy winkel sonajero mordedor tubos sensorial bebe',
  category: 'Recién Nacidos',
  subcategory: 'Juguetes Sensoriales y Mordedores',
  ageRange: '0-12m',
  gender: 'unisex',
  priceRange: '<20',
  priceText: '14,99 €',
  rating: 4.8,
  reviewsCount: 22000,
  badge: 'Recomendado por Terapeutas Infantiles',
  description: 'Un laberinto de tubos suaves y flexibles libres de BPA que los recién nacidos pueden agarrar sin esfuerzo desde cualquier ángulo. Se puede enfriar en la nevera para un alivio refrescante de encías.',
  pros: ['Diseño premiado que entrena el agarre con dos manos', 'Sonajero central que produce un sonido suave no estridente', 'Se puede enfriar en el frigorífico'],
  idealFor: 'Bebés de 3 a 9 meses que empiezan a agarrar objetos',
  style: 'baby',
  imageUrl: '/images/products/012-mordedor-winkel-manhattan-1.jpg',
  images: ['/images/products/012-mordedor-winkel-manhattan-1.jpg']
});

// 6. Libros Blandos y Cuentos de Tela (USER REQUESTED)
add({
  id: '012-libro-tela-alto-contraste',
  asin: 'B08F9VXYZ1',
  title: 'Beiens - Libro de Tela de Alto Contraste Blanco y Negro para Recién Nacidos con Espejo y Sonidos',
  slug: 'beiens-libro-tela-alto-contraste-blanco-negro-bebe',
  searchQuery: 'libro tela alto contraste blanco y negro bebe recien nacido espejo sensorial',
  category: 'Recién Nacidos',
  subcategory: 'Libros Blandos y Cuentos de Tela',
  ageRange: '0-12m',
  gender: 'unisex',
  priceRange: '<20',
  priceText: '13,99 €',
  rating: 4.9,
  reviewsCount: 14200,
  badge: 'Estimulación Visual Pediátrica',
  description: 'Diseñado según los principios del desarrollo visual infantil: en los primeros 6 meses los bebés solo distinguen contrastes fuertes de blanco y negro. Incluye espejo irrompible de autodescubrimiento y páginas con crujidos.',
  pros: ['Costuras reforzadas resistentes a tirones y lavable a mano', 'Cintas laterales para atar a los barrotes de la cuna o el cochecito', 'Material no tóxico y seguro para morder'],
  idealFor: 'Estimular la visión y concentración durante los primeros meses',
  style: 'baby',
  imageUrl: '/images/products/012-libro-tela-alto-contraste-1.jpg',
  images: ['/images/products/012-libro-tela-alto-contraste-1.jpg']
});

add({
  id: '012-libro-tela-colitas-animales',
  asin: 'B08G8K7TY2',
  title: 'Libro de Tela Sensorial con Colas de Animales 3D Texturizadas y Sonidos de Papel Crujiente',
  slug: 'libro-tela-sensorial-colas-animales-3d-texturas',
  searchQuery: 'libro tela bebe colas de animales texturas tacto sonido crujiente mordedor',
  category: 'Recién Nacidos',
  subcategory: 'Libros Blandos y Cuentos de Tela',
  ageRange: '0-12m',
  gender: 'unisex',
  priceRange: '<20',
  priceText: '11,95 €',
  rating: 4.8,
  reviewsCount: 9800,
  badge: 'Texturas Táctiles Interactivas',
  description: 'Cada página presenta un animal de la selva con su cola sobresaliendo en relieve con texturas variadas: borreguito, terciopelo, raso y pana para estimular el tacto del bebé mientras aprende los primeros animales.',
  pros: ['Colitas 3D irresistibles para tirar, tocar y morder', 'Papel crujiente interior y chirriador sonoro al apretar', 'Anilla de agarre para colgar de la capota del cochecito'],
  idealFor: 'Despertar la curiosidad táctil en el cochecito o la cuna',
  style: 'baby',
  imageUrl: '/images/products/012-libro-tela-colitas-animales-1.jpg',
  images: ['/images/products/012-libro-tela-colitas-animales-1.jpg']
});

add({
  id: '012-libro-bano-magico-cambia-color',
  asin: 'B07M9KLZ4X',
  title: 'Libro de Baño Mágico Infantil que Cambia de Color con el Agua Caliente',
  slug: 'libro-bano-magico-cambia-color-agua',
  searchQuery: 'libro de bano magico cambia de color con agua caliente bebe impermeable',
  category: 'Recién Nacidos',
  subcategory: 'Libros Blandos y Cuentos de Tela',
  ageRange: '0-12m',
  gender: 'unisex',
  priceRange: '<20',
  priceText: '9,99 €',
  rating: 4.7,
  reviewsCount: 5400,
  badge: 'Magia en la Bañera',
  description: 'Libro impermeable de plástico blandito acolchado cuyas ilustraciones en blanco y negro se llenan de colores vivos en cuanto tocan el agua templada de la bañera. Al secarse vuelve a quedar oculto para repetir la magia.',
  pros: ['Material impermeable de secado rápido sin moho', 'Bordes redondeados y páginas muy fáciles de pasar con manitas mojadas', 'Hace del baño un momento divertido de juego y lectura'],
  idealFor: 'Transformar el momento del baño en una experiencia divertida',
  style: 'baby',
  imageUrl: '/images/products/012-libro-bano-magico-cambia-color-1.jpg',
  images: ['/images/products/012-libro-bano-magico-cambia-color-1.jpg']
});

// 7. Colonias y Cuidado de Bebé (USER REQUESTED)
add({
  id: '012-colonia-suavinex-baby',
  asin: 'B00E5BCF4Q',
  title: 'Suavinex Baby Cologne - Agua de Colonia Infantil Sin Alcohol con Vaporizador 100ml',
  slug: 'suavinex-baby-cologne-colonia-infantil-sin-alcohol',
  searchQuery: 'suavinex baby cologne colonia infantil sin alcohol frasco vaporizador 100ml',
  category: 'Recién Nacidos',
  subcategory: 'Colonias y Cuidado de Bebé',
  ageRange: '0-12m',
  gender: 'unisex',
  priceRange: '<20',
  priceText: '11,50 €',
  rating: 4.8,
  reviewsCount: 18500,
  badge: 'La Fragancia de Bebé Más Amada',
  description: 'El olor a limpio por excelencia: notas de frutos cítricos, flores blancas y almizcles. Fórmula baja en alcohol para no irritar la piel ni manchar la ropita del bebé. Frasco con vaporizador dosificador cómodo y seguro.',
  pros: ['Aroma fresco y delicado que toda la familia querrá usar', 'No reseca la piel ni mancha la ropa', 'Fabricada en España con control dermatológico pediátrico'],
  idealFor: 'Aromatizar la ropita, el cepillo de pelo y tras el baño',
  style: 'baby',
  imageUrl: '/images/products/bebe-suavinex-colonia-1.jpg',
  images: ['/images/products/bebe-suavinex-colonia-1.jpg']
});

add({
  id: '012-mustela-agua-colonia-sin-alcohol',
  asin: 'B000V3J8Q0',
  title: 'Mustela Agua de Colonia Refrescante Sin Alcohol para Bebé y Recién Nacido 200ml',
  slug: 'mustela-agua-colonia-refrescante-sin-alcohol-200ml',
  searchQuery: 'mustela agua de colonia sin alcohol 200ml refrescante bebe piel sensible',
  category: 'Recién Nacidos',
  subcategory: 'Colonias y Cuidado de Bebé',
  ageRange: '0-12m',
  gender: 'unisex',
  priceRange: '<20',
  priceText: '9,95 €',
  rating: 4.8,
  reviewsCount: 14200,
  badge: 'Fórmula 100% Hipoalergénica',
  description: 'Agua perfumada sin alcohol con extractos de manzanilla y miel que calman la piel a la vez que perfuman suavemente la cabecita y la ropa del bebé. Testada bajo control pediátrico y dermatológico.',
  pros: ['Cero alcohol para la máxima protección de pieles atópicas', 'Extracto de manzanilla con efecto calmante', 'Formato generoso de 200ml con dosificador'],
  idealFor: 'Refrescar al bebé en verano y peinar los primeros cabellos',
  style: 'baby',
  imageUrl: '/images/products/012-mustela-agua-colonia-sin-alcohol-1.jpg',
  images: ['/images/products/012-mustela-agua-colonia-sin-alcohol-1.jpg']
});

add({
  id: '012-colonia-denenes-original',
  asin: 'B007X6J8L0',
  title: 'Denenes Colonia Muy Suave para Bebés y Pieles Sensibles con Aceites Esenciales 600ml',
  slug: 'denenes-colonia-muy-suave-bebe-600ml',
  searchQuery: 'denenes colonia muy suave bebe aceites esenciales formato ahorro 600ml',
  category: 'Recién Nacidos',
  subcategory: 'Colonias y Cuidado de Bebé',
  ageRange: '0-12m',
  gender: 'unisex',
  priceRange: '<20',
  priceText: '7,49 €',
  rating: 4.7,
  reviewsCount: 8900,
  badge: 'El Clásico de Varias Generaciones',
  description: 'La fragancia de recuerdos infantiles que nunca pasa de moda. Elaborada con aceites esenciales naturales 100% de origen vegetal. Deja la piel y las sábanas con una inconfundible sensación de frescura y ternura.',
  pros: ['Formato familiar de 600ml de excelente relación calidad-precio', 'Testado dermatológicamente para uso diario', 'Aroma clásico inolvidable'],
  idealFor: 'Uso diario en toda la casa, cuna y ropa de cama',
  style: 'baby',
  imageUrl: '/images/products/012-colonia-denenes-original-1.jpg',
  images: ['/images/products/012-colonia-denenes-original-1.jpg']
});

// 8. Ropa, Bodies y Patucos (USER REQUESTED)
add({
  id: '012-pack-bodies-carters',
  asin: 'B07B4M27B2',
  title: 'Simple Joys by Carter\'s - Pack de 5 Bodies de Manga Corta de Algodón 100% para Bebé',
  slug: 'simple-joys-carters-pack-5-bodies-algodon',
  searchQuery: 'carters pack 5 bodies manga corta algodon bebe cuello expandible',
  category: 'Recién Nacidos',
  subcategory: 'Ropa, Bodies y Patucos',
  ageRange: '0-12m',
  gender: 'unisex',
  priceRange: '20-50',
  priceText: '21,99 €',
  rating: 4.8,
  reviewsCount: 34000,
  badge: 'Básico Imprescindible en el Armario',
  description: 'Los bodies más prácticos del mercado: cuello con hombros superpuestos que se abren hacia abajo para poder quitárselo por los pies en caso de fuga de pañal sin manchar la cabeza. Corchetes libres de níquel.',
  pros: ['100% algodón transpirable extrasuave que no encoge al lavar', 'Hombros expandibles para desvestir sin tirones de orejas', 'Costuras planas que no rozan la piel'],
  idealFor: 'El fondo de armario diario del primer año de vida',
  style: 'baby',
  imageUrl: '/images/products/012-pack-bodies-carters-1.jpg',
  images: ['/images/products/012-pack-bodies-carters-1.jpg']
});

add({
  id: '012-patucos-cuero-suave',
  asin: 'B07MVD9W33',
  title: 'Zapatos Patucos de Bebé en Piel Auténtica Suave con Suela Antideslizante',
  slug: 'zapatos-patucos-cuero-suave-bebe-suela-antideslizante',
  searchQuery: 'patucos bebe cuero suave suela antideslizante primeros pasos mocasines',
  category: 'Recién Nacidos',
  subcategory: 'Ropa, Bodies y Patucos',
  ageRange: '0-12m',
  gender: 'unisex',
  priceRange: '<20',
  priceText: '15,95 €',
  rating: 4.8,
  reviewsCount: 8200,
  badge: 'Recomendado por Podólogos Infantiles',
  description: 'Patucos de cuero natural 100% transpirable que permiten a los pies del bebé desarrollarse de forma natural como si fueran descalzos. Banda elástica en el tobillo para que nunca se salgan ni se caigan.',
  pros: ['Suela de ante rugosa que evita resbalones en parquet y baldosas', 'Cuero blando flexible que no comprime los dedos', 'Fáciles de poner y difíciles de quitar por el bebé'],
  idealFor: 'Gatear y ponerse de pie manteniendo los pies abrigados',
  style: 'baby',
  imageUrl: '/images/products/012-patucos-cuero-suave-1.jpg',
  images: ['/images/products/012-patucos-cuero-suave-1.jpg']
});

add({
  id: '012-pack-baberos-bandana-algodon',
  asin: 'B08FCVTY88',
  title: 'Pack de 8 Baberos Bandana Absorbentes de Algodón Orgánico con Forro Polar Suave',
  slug: 'pack-8-baberos-bandana-algodon-organico-bebe',
  searchQuery: 'pack 8 baberos bandana algodon organico bebe denticion babas forro polar',
  category: 'Recién Nacidos',
  subcategory: 'Ropa, Bodies y Patucos',
  ageRange: '0-12m',
  gender: 'unisex',
  priceRange: '<20',
  priceText: '14,99 €',
  rating: 4.9,
  reviewsCount: 16400,
  badge: 'Protección Total Contra Babas',
  description: 'Baberos con forma de pañuelo triangular moderno que protegen el pecho del bebé de la humedad de las babas de dentición. Capa exterior de algodón 100% orgánico y capa interior de forro polar hidrófugo.',
  pros: ['Doble capa que mantiene la ropa seca todo el día', 'Cierres de corchetes ajustables a medida que crece el cuello', 'Diseños estampados unisex modernos'],
  idealFor: 'La etapa de babeo de los primeros dientes y tomas de leche',
  style: 'baby',
  imageUrl: '/images/products/012-pack-baberos-bandana-algodon-1.jpg',
  images: ['/images/products/012-pack-baberos-bandana-algodon-1.jpg']
});

// 9. Fiestas y Revelación de Género
add({
  id: '012-canon-confeti-gender-reveal',
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
  images: ['/images/products/bebe-canon-confeti-1.jpg']
});

add({
  id: '012-globo-enigma-90cm',
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
  images: ['/images/products/bebe-globo-enigma-1.jpg']
});

add({
  id: '012-polvo-holi-humo-bebe',
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
  images: ['/images/products/bebe-polvo-holi-1.jpg']
});

console.log(`Generated 0-12m successfully: ${products.length} products.`);
module.exports = { add, products };
