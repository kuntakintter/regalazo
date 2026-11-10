import { HubProduct } from './automovilData';

export const NAVIDAD_CATEGORIES = [
  { id: 'all', label: 'Todo para Navidad & Reyes', icon: '🎄' },
  { id: 'trenes', label: 'Trenes de Navidad para Árbol', icon: '🚂' },
  { id: 'decoracion', label: 'Decoración & Luces Navideñas', icon: '✨' },
  { id: 'adviento', label: 'Calendarios de Adviento 2026', icon: '📅' },
  { id: 'amigo-invisible', label: 'Regalos Amigo Invisible (<15 €)', icon: '🎁' },
  { id: 'jerseis-luces', label: 'Jerséis Navideños con Luces & Ropa', icon: '🦌' },
  { id: 'gourmet', label: 'Bombones & Cestas Gourmet', icon: '🍫' },
];

export const NAVIDAD_PRICE_RANGES = [
  { id: 'all', label: 'Cualquier presupuesto' },
  { id: '<15', label: 'Amigo Invisible (<15 €)' },
  { id: '15-30', label: 'De 15 € a 30 € (Detalle perfecto)' },
  { id: '30-60', label: 'De 30 € a 60 € (Regalo prémium)' },
  { id: '>60', label: 'Grandes Regalos de Reyes (+60 €)' },
];

export const NAVIDAD_PRODUCTS: HubProduct[] = [
  // =========================================================================
  // 1. TRENES DE NAVIDAD PARA ÁRBOL (TENDENCIA ESTRELLA SEO)
  // =========================================================================
  {
    id: 'nav-tren-arbol-humo-sonido-luz',
    asin: '',
    title: 'Tren Eléctrico de Navidad para Árbol con Humo Real, Sonido Auténtico de Locomotora y Faro LED',
    category: 'trenes',
    categoryLabel: 'Trenes de Navidad para Árbol',
    brand: 'Santa Express',
    priceText: '39,99 €',
    priceNumeric: 39.99,
    rating: 4.8,
    reviewsCount: 14500,
    imageUrl: 'https://m.media-amazon.com/images/I/71JL-5coiZL._AC_SL1000_.jpg',
    badge: 'Nº 1 Más Vendido en Trenes de Árbol',
    description: 'Circuito de vías circulares y ovaladas diseñado para rodear la base del árbol de Navidad. Locomotora de vapor clásica que expulsa vapor de agua frío totalmente seguro, emite sonido real de silbato y faro frontal luminoso.',
    pros: [
      'Expulsa vapor de agua real (humo frío inofensivo y sin olor para niños y mascotas)',
      'Circuito de vías de más de 330 cm ajustable en círculo o forma ovalada alrededor del árbol',
      'Incluye locomotora, vagón de carbón, vagón de pasajeros y trineo con Papá Noel'
    ],
    idealFor: 'El adorno mágico definitivo para colocar debajo del árbol de Navidad en familia.',
    searchQuery: 'tren de navidad arbol electrico humo sonido vias polar express'
  },
  {
    id: 'nav-tren-arbol-suspendido-tronco',
    asin: '',
    title: 'Tren de Navidad Suspendido para Montar en el Tronco del Árbol a Media Altura con Vía Elevada',
    category: 'trenes',
    categoryLabel: 'Trenes de Navidad para Árbol',
    brand: 'TreeTop Rail',
    priceText: '49,99 €',
    priceNumeric: 49.99,
    rating: 4.7,
    reviewsCount: 8900,
    imageUrl: 'https://m.media-amazon.com/images/I/81y6klUaw9L._AC_SL1000_.jpg',
    badge: 'Efecto Mágico Flotante',
    description: 'Sistema patentado con brazos de fijación ajustables que se anclan firmemente al tronco de cualquier árbol artificial o natural, haciendo circular el tren a media altura entre las ramas y las luces.',
    pros: [
      'Se monta suspendido en el tronco liberando el suelo para poner los regalos debajo',
      'Abrazadera universal regulable válida para troncos de 2,5 a 6 cm de diámetro',
      'Locomotora animada con música navideña activable y faro delantero'
    ],
    idealFor: 'Casas con perros, gatos o niños pequeños para que el tren circule sin tropiezos.',
    searchQuery: 'tren de navidad suspendido tronco arbol elevado circuito soporte'
  },
  {
    id: 'nav-tren-madera-artesanal-mesa',
    asin: 'B0FMFCNT1L',
    title: 'Tren Navideño Tradicional de Madera Artesanal Rojo (5 Piezas) para Decoración',
    category: 'trenes',
    categoryLabel: 'Trenes de Navidad para Árbol',
    brand: 'Nordic Holiday',
    priceText: '14,91 €',
    priceNumeric: 14.91,
    rating: 4.6,
    reviewsCount: 6300,
    imageUrl: 'https://m.media-amazon.com/images/I/81su4tQYbCL._AC_SL1000_.jpg',
    badge: 'Artesanía Nórdica',
    description: 'Precioso adorno navideño de madera natural pintada en rojo, blanco y verde festivo. Cinco piezas articuladas con figuras detalladas de ambiente invernal y festivo.',
    pros: [
      'Material de madera ecológica sin plásticos ni pilas',
      'Tamaño compacto de 26 cm de largo para mesas, repisas, chimeneas o estanterías',
      'Precio muy accesible ideal como detalle de amigo invisible o adorno atemporal'
    ],
    idealFor: 'Decoración de centros de mesa, escaparates y muebles auxiliares navideños.',
    searchQuery: 'tren navideno madera adorno artesanal mesa chimenea papa noel'
  },
  {
    id: 'nav-tren-control-remoto-expreso-polar',
    asin: '',
    title: 'Circuito Ferroviario Expreso Polar Navideño Gran Escala con Mando a Distancia y Luces Festivas',
    category: 'trenes',
    categoryLabel: 'Trenes de Navidad para Árbol',
    brand: 'Lionel Trains Style',
    priceText: '79,99 €',
    priceNumeric: 79.99,
    rating: 4.8,
    reviewsCount: 11200,
    imageUrl: 'https://m.media-amazon.com/images/I/81eIWzFqtxL._AC_SL1000_.jpg',
    badge: 'Gama Alta Coleccionista',
    description: 'Set prémium de tren navideño a escala con mando de radiofrecuencia para controlar marcha adelante, marcha atrás, velocidad, toque de campana y sonidos reales de vía férrea.',
    pros: [
      'Control remoto intuitivo que permite a los niños manejar la velocidad y los sonidos',
      'Vías de alta adherencia que no descarrilan con curvas de radio amplio',
      'Gran tamaño y riqueza de detalles en la pintura dorada y granate'
    ],
    idealFor: 'El gran regalo de Reyes para apasionados del modelismo ferroviario y la Navidad.',
    searchQuery: 'tren polar express navidad control remoto mando a distancia vias arbol'
  },
  {
    id: 'nav-tren-bloques-construccion-navidad',
    asin: '',
    title: 'Set de Bloques de Construcción Tren de Navidad con Estación Nevada y Vías Circulares (780 Piezas)',
    category: 'trenes',
    categoryLabel: 'Trenes de Navidad para Árbol',
    brand: 'Winter Holiday Bricks',
    priceText: '36,99 €',
    priceNumeric: 36.99,
    rating: 4.7,
    reviewsCount: 4800,
    imageUrl: 'https://m.media-amazon.com/images/I/810F5SfQcPL._AC_SL1000_.jpg',
    badge: 'Diversión en Familia',
    description: 'Juego de construcción compatible con las principales marcas de bloques. Permite construir una locomotora con farol, vagón de dulces, vagón de regalos y un andén nevado con árbol de Navidad.',
    pros: [
      '780 piezas de plástico ABS de alta precisión compatibles con marcas líderes',
      'Pasa una tarde inolvidable montándolo en familia antes de Nochebuena',
      'Incluye minifiguras con atuendos invernales y farolas con iluminación LED'
    ],
    idealFor: 'Niños a partir de 6 años y adultos amantes de las maquetas de bloques.',
    searchQuery: 'tren de navidad bloques construccion lego compatible estacion nieve'
  },

  // =========================================================================
  // 2. DECORACIÓN & LUCES NAVIDEÑAS
  // =========================================================================
  {
    id: 'nav-villa-navidena-luces-musica-patinaje',
    asin: '',
    title: 'Pueblo Navideño Iluminado con Escena de Patinadores en Movimiento, Luces LED y Música',
    category: 'decoracion',
    categoryLabel: 'Decoración & Luces Navideñas',
    brand: 'Village Noel',
    priceText: '45,99 €',
    priceNumeric: 45.99,
    rating: 4.7,
    reviewsCount: 7600,
    imageUrl: 'https://m.media-amazon.com/images/I/81pD+F8tBhL._AC_SL1000_.jpg',
    badge: 'La Magia de la Nieve',
    description: 'Pueblo de resina pintado a mano con pista de hielo magnética donde giran patinadores, casas nevadas con ventanas iluminadas y 8 villancicos clásicos seleccionables.',
    pros: [
      'Patinadores con movimiento continuo realista sobre pista helada reflectante',
      'Interruptor de 3 posiciones: Apagado, Luces con Movimiento o Luces + Música',
      'Alimentación por cable USB incluido o con 3 pilas AA'
    ],
    idealFor: 'Crear un rincón mágico en el salón que hipnotiza a niños y mayores.',
    searchQuery: 'villa navidena pueblo con luz musica y movimiento patinadores resina'
  },
  {
    id: 'nav-arbol-navidad-artificial-frondoso-180',
    asin: 'B0GY14TV2T',
    title: 'YEAUPE PRO Árbol de Navidad Artificial Superfrondoso 180 cm de PVC con Base Metálica Reforzada',
    category: 'decoracion',
    categoryLabel: 'Decoración & Luces Navideñas',
    brand: 'YEAUPE PRO',
    priceText: '54,99 €',
    priceNumeric: 54.99,
    rating: 4.8,
    reviewsCount: 19800,
    imageUrl: 'https://m.media-amazon.com/images/I/81u4W0tf4LL._AC_SL1000_.jpg',
    badge: 'Máxima Frondosidad',
    description: 'Abeto artificial de gran densidad con agujas de PVC que imitan el follaje real del bosque alpino. Estructura práctica para montaje rápido y estable.',
    pros: [
      'Ramas muy densas para colgar bolas, guirnaldas y luces sin dejar huecos vacíos',
      'Base metálica cuádruple con protectores de suelo antideslizantes de goma',
      'Material ignífugo de máxima seguridad para interior'
    ],
    idealFor: 'El árbol central del hogar para disfrutar durante muchos años.',
    searchQuery: 'arbol de navidad artificial 180 cm frondoso tupido base metalica'
  },
  {
    id: 'nav-falda-pie-arbol-felpa-blanca',
    asin: 'B0HDCCV87M',
    title: 'Falda Cubrepíe para Árbol de Navidad 90 cm de Pelo Sintético Blanco Nieve con Copos Dorados',
    category: 'decoracion',
    categoryLabel: 'Decoración & Luces Navideñas',
    brand: 'Winter Soft',
    priceText: '16,99 €',
    priceNumeric: 16.99,
    rating: 4.8,
    reviewsCount: 12400,
    imageUrl: 'https://m.media-amazon.com/images/I/81ZeiekfcpL._AC_SL1000_.jpg',
    badge: 'Tacto Peluche de Lujo',
    description: 'Alfombra redonda para ocultar la base metálica del árbol de Navidad y los cables de las luces. Tejido de felpa esponjosa que simula un manto de nieve recién caída donde reposar los regalos.',
    pros: [
      'Oculta completamente el soporte metálico y los cables de enchufes',
      'Bordado con delicados copos de nieve dorados que brillan con la luz',
      'Cierre con velcro invisible fácil de abrir y lavar'
    ],
    idealFor: 'El marco ideal para colocar el tren de Navidad y los paquetes de regalos.',
    searchQuery: 'falda pie arbol navidad blanca pelo nieve felpa 90 cm alfombra'
  },
  {
    id: 'nav-cortina-luces-led-blanco-calido',
    asin: '',
    title: 'Cortina de Luces LED Navideñas 5M con Efecto Cascada Blanco Cálido 8 Modos de Luz',
    category: 'decoracion',
    categoryLabel: 'Decoración & Luces Navideñas',
    brand: 'Salcar',
    priceText: '19,99 €',
    priceNumeric: 19.99,
    rating: 4.7,
    reviewsCount: 31000,
    imageUrl: 'https://m.media-amazon.com/images/I/61122dZISnL._AC_SL320_.jpg',
    badge: 'La Magia de la Navidad en Casa',
    description: 'Guirnalda luminosa en cortina de 5 metros de ancho con 200 micro-LEDs de tono cálido acogedor. Cuenta con 8 programas de destellos distintos y protección impermeable para ventanas, salones o balcones.',
    pros: [
      'Transforma cualquier salón o balcón en una postal navideña de película',
      'Protección IP44 para usar con total seguridad en interior y exterior',
      'Bajo consumo energético con tecnología LED eficiente'
    ],
    idealFor: 'Crear una atmósfera mágica en el árbol, chimenea, balcón o ventanales.',
    searchQuery: 'cortina luces led navidad cascada blanco calido exterior interior'
  },
  {
    id: 'nav-proyector-copos-nieve-exterior',
    asin: 'B0H7H4GTKT',
    title: 'Proyector LED Navideño de Copos de Nieve Dinámicos Giratorios IP65 para Fachada y Salón',
    category: 'decoracion',
    categoryLabel: 'Decoración & Luces Navideñas',
    brand: 'SnowMagic',
    priceText: '25,49 €',
    priceNumeric: 25.49,
    rating: 4.6,
    reviewsCount: 9100,
    imageUrl: 'https://m.media-amazon.com/images/I/51MxdaSnf+L._AC_SL1000_.jpg',
    badge: 'Nevada Mágica en Casa',
    description: 'Lámpara proyector con lente óptica mejorada que proyecta una suave caída de copos de nieve en movimiento sobre paredes, fachadas o techos de hasta 50 m² de cobertura.',
    pros: [
      'Temporizador automático y mando a distancia para regular velocidad de caída',
      'Resistente a la lluvia, nieve y temperaturas bajo cero (certificación IP65)',
      'Incluye estaca para clavar en césped y base plana para suelo interior'
    ],
    idealFor: 'Decorar la fachada exterior de la casa o iluminar el techo del salón en Nochebuena.',
    searchQuery: 'proyector led copos de nieve navidad exterior impermeable jardin'
  },
  {
    id: 'nav-bolas-arbol-set-50-dorado-rojo',
    asin: 'B0FHWF7FY1',
    title: 'Relaxdays Set de 50 Bolas de Navidad Irrompibles Surtidas en Dorado y Rojo Clásico',
    category: 'decoracion',
    categoryLabel: 'Decoración & Luces Navideñas',
    brand: 'Relaxdays',
    priceText: '24,99 €',
    priceNumeric: 24.99,
    rating: 4.6,
    reviewsCount: 14200,
    imageUrl: 'https://m.media-amazon.com/images/I/814H8t6u2uL._AC_SL1000_.jpg',
    badge: '100% Antiroturas',
    description: 'Conjunto completo de adornos esféricos con acabados brillante, mate y con purpurina. Fabricadas en plástico ecológico ultra resistente a caídas de mascotas o juegos infantiles.',
    pros: [
      'Material irrompible seguro para hogares con niños pequeños, gatos o perros',
      'Vienen con ganchos y cordones preinstalados listos para colgar directamente',
      'Caja con asa para guardarlas ordenadas año tras año'
    ],
    idealFor: 'Vestir un árbol completo de 150 a 180 cm con un estilo elegante y armonioso.',
    searchQuery: 'bolas arbol navidad irrompibles set doradas rojas adornos'
  },
  {
    id: 'nav-corona-navidena-puerta-40cm',
    asin: '',
    title: 'Corona Navideña de Puerta 40 cm con Piñas Naturales, Bayas Rojas y Luces Micro-LED',
    category: 'decoracion',
    categoryLabel: 'Decoración & Luces Navideñas',
    brand: 'Festive Welcome',
    priceText: '23,99 €',
    priceNumeric: 23.99,
    rating: 4.7,
    reviewsCount: 6800,
    imageUrl: 'https://m.media-amazon.com/images/I/81tAF0vUZbL._AC_SL1000_.jpg',
    badge: 'Bienvenida Festiva',
    description: 'Corona artesanal para colgar en la puerta principal de entrada o sobre la chimenea. Compuesta por ramas de abeto artificial perenne, piñas de pino naturales secas y guirnalda de luces a pilas con temporizador.',
    pros: [
      'Luces micro LED integradas con apagado automático tras 6 horas de uso',
      'Apta para puertas de exterior con protección frente a la humedad',
      'Efecto muy natural que recibe a los invitados con espíritu navideño'
    ],
    idealFor: 'La puerta principal del hogar, chimeneas y ventanales panorámicos.',
    searchQuery: 'corona navidad puerta entrada 40 cm con luces led pinas bayas'
  },
  {
    id: 'nav-papa-noel-inflable-gigante-180',
    asin: 'B0FCFWM4ND',
    title: 'Figura Hinchable de Papá Noel Gigante 180 cm con Iluminación LED y Motor Silencioso',
    category: 'decoracion',
    categoryLabel: 'Decoración & Luces Navideñas',
    brand: 'AirHoliday',
    priceText: '39,99 €',
    priceNumeric: 39.99,
    rating: 4.6,
    reviewsCount: 5400,
    imageUrl: 'https://m.media-amazon.com/images/I/81Yt4x1sd+L._AC_SL1000_.jpg',
    badge: 'La Ilusión del Barrio',
    description: 'Muñeco inflable de Papá Noel saludando con bolsa de regalos. Dispone de un potente ventilador interno integrado que lo hincha en menos de 1 minuto nada más enchufarlo a la corriente.',
    pros: [
      'Se autoinfla en segundos y se desinfla plano para guardarlo en una caja pequeña',
      'Luces LED interiores brillantes que destacan en la oscuridad del jardín o balcón',
      'Incluye piquetas de anclaje, cuerdas tensoras y bolsas de arena para el viento'
    ],
    idealFor: 'Jardines, terrazas, balcones y locales comerciales.',
    searchQuery: 'papa noel inflable 180 cm gigante con luz led jardin exterior'
  },

  // =========================================================================
  // 3. CALENDARIOS DE ADVIENTO 2026
  // =========================================================================
  {
    id: 'nav-calendario-adviento-lego-marvel',
    asin: 'B0GGSM14GC',
    title: 'LEGO Marvel - Calendario de Adviento 2026 con 24 Minifiguras y Accesorios Sorpresa',
    category: 'adviento',
    categoryLabel: 'Calendarios de Adviento 2026',
    brand: 'LEGO',
    priceText: '34,99 €',
    priceNumeric: 34.99,
    rating: 4.8,
    reviewsCount: 22000,
    imageUrl: 'https://m.media-amazon.com/images/I/81lDif6INrL._AC_UL320_.jpg',
    badge: 'Nº 1 en Ventas de Adviento',
    description: 'La cuenta atrás más emocionante hasta la Nochebuena. 24 ventanas diarias que ocultan minifiguras icónicas de los Vengadores, accesorios en miniatura y minimodelos construibles para ampliar la colección.',
    pros: [
      '24 sorpresas diarias para disfrutar durante todo el mes de diciembre',
      'Minifiguras y vehículos coleccionables oficiales de Marvel LEGO',
      'El regalo prenavideño favorito de niños y adultos de todas las edades'
    ],
    idealFor: 'Empezar la Navidad con ilusión desde el día 1 de diciembre hasta Nochebuena.',
    searchQuery: 'lego calendario de adviento marvel juguetes coleccion'
  },
  {
    id: 'nav-calendario-adviento-kinder',
    asin: 'B0CMY43CPT',
    title: 'Kinder Calendario de Adviento Casa 2026 con 24 Chocolatinas y Huevo Sorpresa',
    category: 'adviento',
    categoryLabel: 'Calendarios de Adviento 2026',
    brand: 'Kinder',
    priceText: '22,50 €',
    priceNumeric: 22.5,
    rating: 4.8,
    reviewsCount: 18400,
    imageUrl: 'https://m.media-amazon.com/images/I/71ccxfqQXzL._AC_SL1000_.jpg',
    badge: 'El Favorito de los Niños',
    description: 'Preciosa caja en forma de chalet alpino con 24 ventanas rellenas de las chocolatinas más queridas de Kinder: Schoko-Bons, Kinder Chocolate Mini, Kinder Bueno y figuras de chocolate con leche.',
    pros: [
      '24 chocolates frescos con leche y avellana 100% originales Kinder',
      'Formato lúdico con juegos en el reverso de la caja',
      'Precio muy asequible para dar una sorpresa a los más pequeños'
    ],
    idealFor: 'Endulzar la espera de la Navidad para niños y amantes del chocolate con leche.',
    searchQuery: 'kinder calendario de adviento chocolate casita navidena'
  },

  // =========================================================================
  // 4. REGALOS AMIGO INVISIBLE (<15 €)
  // =========================================================================
  {
    id: 'nav-taza-amigo-invisible-fisura',
    asin: '',
    title: 'Fisura - Taza Divertida Original de Cerámica para Regalo de Amigo Invisible',
    category: 'amigo-invisible',
    categoryLabel: 'Regalos Amigo Invisible (<15 €)',
    brand: 'Fisura',
    priceText: '11,95 €',
    priceNumeric: 11.95,
    rating: 4.6,
    reviewsCount: 8400,
    imageUrl: 'https://m.media-amazon.com/images/I/61Bb7PJZV9L._AC_UL320_.jpg',
    badge: 'Top Risas Amigo Invisible',
    description: 'El detalle cómico y original perfecto para el amigo invisible en la oficina o entre amigos. Fabricada en cerámica de alta calidad con acabado esmaltado, apta para microondas y lavavajillas.',
    pros: [
      'Precio ajustado por debajo de 15 € ideal para el límite del amigo invisible',
      'Viene en bonita caja protectora lista para envolver y regalar',
      'Desata carcajadas en el momento exacto de abrir los regalos'
    ],
    idealFor: 'Amigo invisible del trabajo, intercambio de regalos con amigos y adictos al café.',
    searchQuery: 'taza graciosa original amigo invisible regalo divertido'
  },
  {
    id: 'nav-calcetines-navidenos-caja-regalo',
    asin: '',
    title: 'Set de 4 Pares de Calcetines Navideños Divertidos de Algodón en Caja de Regalo',
    category: 'amigo-invisible',
    categoryLabel: 'Regalos Amigo Invisible (<15 €)',
    brand: 'WarmFeet Holiday',
    priceText: '13,99 €',
    priceNumeric: 13.99,
    rating: 4.7,
    reviewsCount: 9700,
    imageUrl: 'https://m.media-amazon.com/images/I/81klkFlCH0L._AC_SL1000_.jpg',
    badge: 'Detalle Cálido & Divertido',
    description: 'Pack de calcetines elásticos de tacto suave con motivos de renos, copos de nieve, Papá Noel y árboles navideños. Empaquetados en una bonita lata metálica o estuche listo para obsequiar.',
    pros: [
      'Algodón peinado transpirable y calentito que no aprieta el tobillo',
      'Talla universal elástica apta para tallas del 36 al 43',
      'Regalo clásico y simpático que todo el mundo agradece en invierno'
    ],
    idealFor: 'Amigo invisible familiar o de oficina por menos de 15 €.',
    searchQuery: 'calcetines navidenos divertidos algodon caja regalo pack 4'
  },

  // =========================================================================
  // 5. JERSÉIS NAVIDEÑOS & ROPA FESTIVA
  // =========================================================================
  {
    id: 'nav-jersey-navideno-luces-led',
    asin: '',
    title: 'Ugly Christmas Sweater - Jersey Navideño con Luces LED Intermitentes de Colores',
    category: 'jerseis-luces',
    categoryLabel: 'Jerséis Navideños con Luces & Ropa',
    brand: 'JAP Christmas',
    priceText: '29,95 €',
    priceNumeric: 29.95,
    rating: 4.7,
    reviewsCount: 16500,
    imageUrl: 'https://m.media-amazon.com/images/I/91j4VDFcxiL._AC_UL320_.jpg',
    badge: 'El Clásico de las Cenas Navideñas',
    description: 'El jersey navideño definitivo para comidas de empresa y cenas familiares. Confeccionado en punto suave y cálido con luces LED multicolor integradas que parpadean para ser la estrella de cualquier brindis.',
    pros: [
      'Luces LED integradas con interruptor oculto extraíble para lavado fácil',
      'Tejido de punto premium muy suave que no pica en la piel',
      'Diseño divertido que triunfa en fotos familiares y reuniones'
    ],
    idealFor: 'Cenas de empresa, Nochebuena, Nochevieja o concurso del mejor jersey feo.',
    searchQuery: 'jersey navideno luces led divertido ugly christmas sweater'
  },

  // =========================================================================
  // 6. BOMBONES & CESTAS GOURMET
  // =========================================================================
  {
    id: 'nav-lindt-bombones-creation-dessert',
    asin: '',
    title: 'Lindt Creation Dessert Ballotin - Caja de Bombones Surtidos de Chocolate de Lujo 200g',
    category: 'gourmet',
    categoryLabel: 'Bombones & Cestas Gourmet',
    brand: 'Lindt',
    priceText: '12,49 €',
    priceNumeric: 12.49,
    rating: 4.8,
    reviewsCount: 26000,
    imageUrl: 'https://m.media-amazon.com/images/I/81DsMcS5UvL._AC_UL320_.jpg',
    badge: 'El Detalle Dulce que Nunca Falla',
    description: 'Elegante estuche de bombones suizos inspirados en los mejores postres: Tiramisú, Crème Brûlée, Fondant de Chocolate y Merengue. Un acierto seguro como detalle de agradecimiento en cualquier comida navideña.',
    pros: [
      'Elaborado por los Maestros Chocolateros suizos de Lindt desde 1845',
      'Presentación sofisticada en estuche Ballotin con cinta decorativa',
      'El regalo ideal para llevar a casa de los anfitriones en Navidad y Año Nuevo'
    ],
    idealFor: 'Llevar como detalle a cenas familiares, regalo a compañeros o autoregalo goloso.',
    searchQuery: 'lindt bombones caja regalo surtido chocolate navidad'
  }
];
