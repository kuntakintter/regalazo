export interface GtaProduct {
  id: string;
  asin: string;
  title: string;
  category: 'setup' | 'mandos' | 'merch' | 'coleccion' | 'juego';
  categoryLabel: string;
  priceText: string;
  priceNumeric: number;
  rating: number;
  reviewsCount: number;
  imageUrl: string;
  badge: string;
  description: string;
  pros: string[];
  idealFor: string;
  searchQuery: string;
}

export const GTA_CATEGORIES = [
  { id: 'all', label: 'Todo el Catálogo GTA', icon: '🔥' },
  { id: 'setup', label: 'Neón Vice City & Setup', icon: '💡' },
  { id: 'mandos', label: 'Mandos PS5 & Periféricos', icon: '🎮' },
  { id: 'merch', label: 'Ropa & Camisetas Retro', icon: '👕' },
  { id: 'coleccion', label: 'Coleccionismo & Soportes', icon: '🏆' },
  { id: 'juego', label: 'Reserva & Tarjetas Saldo', icon: '💳' },
];

export const GTA_PRICE_RANGES = [
  { id: 'all', label: 'Cualquier presupuesto' },
  { id: '<20', label: 'Menos de 20 €' },
  { id: '20-50', label: 'De 20 € a 50 €' },
  { id: '50-100', label: 'De 50 € a 100 €' },
  { id: '>100', label: 'Más de 100 €' },
];

export const GTA_PRODUCTS: GtaProduct[] = [
  // --- 1. SETUP & NEÓN VICE CITY ---
  {
    id: 'gta-neon-palmera-vice-city',
    asin: 'B09NMYBDZK',
    title: 'Lámpara de Neón LED Palmera Tropical Estilo Vice City Rosa y Verde',
    category: 'setup',
    categoryLabel: 'Neón Vice City & Setup',
    priceText: '16,99 €',
    priceNumeric: 16.99,
    rating: 4.7,
    reviewsCount: 3420,
    imageUrl: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=600&q=80',
    badge: 'Icono Vice City',
    description: 'Luz de neón flexible de bajo voltaje alimentada por USB o pilas, reproduce la silueta retro de las palmeras de Ocean Beach Miami.',
    pros: [
      'Colores vibrantes rosa fucsia y verde neón perfectos para el setup',
      'No se calienta tras horas encendida gracias a tecnología LED',
      'Orificios integrados para colgar en pared o apoyar en estantería'
    ],
    idealFor: 'Crear la atmósfera nocturna de Vice City en cualquier habitación gamer.',
    searchQuery: 'lampara neon palmera rosa y verde decoracion habitacion'
  },
  {
    id: 'gta-neon-sunset-retro',
    asin: 'B0CNX12X52',
    title: 'Cartel de Neón LED Atardecer Retro Sunset Miami 80s Multicolor',
    category: 'setup',
    categoryLabel: 'Neón Vice City & Setup',
    priceText: '32,99 €',
    priceNumeric: 32.99,
    rating: 4.8,
    reviewsCount: 1890,
    imageUrl: 'https://images.unsplash.com/photo-1509198397868-475647b2a1e5?auto=format&fit=crop&w=600&q=80',
    badge: 'Top Estética 80s',
    description: 'Panel acrílico grabado con silueta de atardecer ochentero con degradado violeta, rosa y naranja neón con regulador de intensidad.',
    pros: [
      'Dimmer regulable con 10 niveles de brillo para streaming y gaming',
      'Base acrílica transparente de alta resistencia y cable USB largo',
      'Efecto idéntico al logotipo oficial de GTA VI y Vice City'
    ],
    idealFor: 'El fondo definitivo detrás de tu monitor o cámara de streaming.',
    searchQuery: 'cartel neon led sunset retro 80s sol olas habitacion gamer'
  },
  {
    id: 'gta-alfombrilla-xxl-vice-city',
    asin: 'B08G8JTY5N',
    title: 'Alfombrilla Gaming XXL 900x400 mm Estética Synthwave Vice City Retro Wave',
    category: 'setup',
    categoryLabel: 'Neón Vice City & Setup',
    priceText: '19,99 €',
    priceNumeric: 19.99,
    rating: 4.6,
    reviewsCount: 4560,
    imageUrl: 'https://images.unsplash.com/photo-1542751371-adc38448a05e?auto=format&fit=crop&w=600&q=80',
    badge: 'Superficie Pro',
    description: 'Alfombrilla de ratón y teclado gigante impermeable con bordes cosidos reforzados e ilustración inspirada en las playas y deportivos de Miami.',
    pros: [
      'Espacio de 90x40 cm para abarcar teclado completo y ratón con holgura',
      'Base de goma antideslizante que no se mueve en sesiones frenéticas',
      'Tejido microtexturizado que optimiza el seguimiento óptico'
    ],
    idealFor: 'Darle el look temático completo al escritorio con tacto prémium.',
    searchQuery: 'alfombrilla gaming xxl 900x400 synthwave retro miami vice'
  },
  {
    id: 'gta-tira-led-govee-rgbic',
    asin: 'B09CSXL7PK',
    title: 'Govee Tira LED RGBIC Inteligente con Efecto Neón Gradiente y Control App',
    category: 'setup',
    categoryLabel: 'Neón Vice City & Setup',
    priceText: '29,99 €',
    priceNumeric: 29.99,
    rating: 4.7,
    reviewsCount: 28900,
    imageUrl: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&w=600&q=80',
    badge: 'Superventas LED',
    description: 'Tira de luz inteligente con tecnología RGBIC que muestra múltiples colores simultáneos para simular el crepúsculo de Vice City.',
    pros: [
      'Sincronización con la música del juego y control por voz con Alexa',
      'Posibilidad de mezclar fucsia, cian y morado en una sola tira',
      'Fácil instalación autoadhesiva tras el monitor o el escritorio'
    ],
    idealFor: 'Lograr iluminación ambiental inmersiva al conducir de noche por Vice City.',
    searchQuery: 'govee tira led rgbic inteligente neón habitacion gamer'
  },
  {
    id: 'gta-poster-metalico-vice-city',
    asin: 'B083F88B6R',
    title: 'Placa Metálica Decorativa Vintage Miami Beach Vice City 20x30 cm',
    category: 'setup',
    categoryLabel: 'Neón Vice City & Setup',
    priceText: '12,99 €',
    priceNumeric: 12.99,
    rating: 4.5,
    reviewsCount: 940,
    imageUrl: 'https://images.unsplash.com/photo-1533105079780-92b9be482077?auto=format&fit=crop&w=600&q=80',
    badge: 'Detalle Económico',
    description: 'Cuadro de chapa metálica serigrafiada con bordes doblados para máxima seguridad, acabado mate retro envejecido.',
    pros: [
      'Resistente al óxido y fácil de colocar con adhesivo o tornillos',
      'Diseño icónico con coches clásicos y palmeras de Florida',
      'Precio muy accesible para un regalo o amigo invisible gamer'
    ],
    idealFor: 'Decorar estanterías, puertas o rincones de la cueva gamer.',
    searchQuery: 'placa metalica decorativa miami beach vice city retro vintage'
  },

  // --- 2. MANDOS PS5, AUDIO & PERIFÉRICOS ---
  {
    id: 'gta-mando-ps5-nova-pink',
    asin: 'B09NMYBDZK',
    title: 'Mando Inalámbrico DualSense para PlayStation 5 Edición Nova Pink',
    category: 'mandos',
    categoryLabel: 'Mandos PS5 & Periféricos',
    priceText: '69,99 €',
    priceNumeric: 69.99,
    rating: 4.8,
    reviewsCount: 34100,
    imageUrl: 'https://images-na.ssl-images-amazon.com/images/P/B09NMYBDZK.01._SCLZZZZZZZ_SX400_.jpg',
    badge: 'Color Oficial Vice City',
    description: 'El mando oficial de PS5 en el tono fucsia neón idéntico al logotipo de GTA VI, con respuesta háptica y gatillos adaptativos.',
    pros: [
      'Siente la tensión de los pedales al acelerar deportivos en Vice City',
      'Retroalimentación háptica envolvente en tiroteos y cambios de terreno',
      'Micrófono integrado y conector de auriculares de 3.5 mm'
    ],
    idealFor: 'Jugar a GTA 6 con el mando que mejor viste la estética del juego.',
    searchQuery: 'mando dualsense ps5 nova pink original sony'
  },
  {
    id: 'gta-mando-ps5-galactic-purple',
    asin: 'B09RBZ134K',
    title: 'Mando Inalámbrico DualSense para PlayStation 5 Edición Galactic Purple',
    category: 'mandos',
    categoryLabel: 'Mandos PS5 & Periféricos',
    priceText: '69,99 €',
    priceNumeric: 69.99,
    rating: 4.8,
    reviewsCount: 29500,
    imageUrl: 'https://images-na.ssl-images-amazon.com/images/P/B09RBZ134K.01._SCLZZZZZZZ_SX400_.jpg',
    badge: 'Edición Favorita',
    description: 'Mando original Sony PlayStation 5 en elegante morado crepúsculo, el combo perfecto con el Nova Pink para parejas gamer.',
    pros: [
      'Ergonomía icónica de PlayStation con batería recargable por USB-C',
      'Precisión absoluta en sticks analógicos para apuntado libre',
      'Diseño exclusivo con textura microestampada de la marca'
    ],
    idealFor: 'El regalo más solicitado por jugadores de PS5 que esperan GTA VI.',
    searchQuery: 'mando dualsense ps5 galactic purple sony original'
  },
  {
    id: 'gta-auriculares-sony-pulse-3d',
    asin: 'B08H93ZRK9',
    title: 'Auriculares Inalámbricos Sony Pulse 3D para PS5 con Audio Tempest 3D',
    category: 'mandos',
    categoryLabel: 'Mandos PS5 & Periféricos',
    priceText: '89,99 €',
    priceNumeric: 89.99,
    rating: 4.6,
    reviewsCount: 23400,
    imageUrl: 'https://images-na.ssl-images-amazon.com/images/P/B08H93ZRK9.01._SCLZZZZZZZ_SX400_.jpg',
    badge: 'Inmersión Total',
    description: 'Auriculares diseñados específicamente para el motor de audio 3D de PS5, con micrófonos ocultos con cancelación de ruido dual.',
    pros: [
      'Escucha con precisión tridimensional de dónde vienen las sirenas y disparos',
      'Almohadillas acolchadas refinadas y diadema con ajuste elástico',
      'Batería recargable con hasta 12 horas de juego inalámbrico continuo'
    ],
    idealFor: 'Sumergirse en la vida nocturna, emisoras de radio y tiroteos de GTA 6.',
    searchQuery: 'auriculares pulse 3d ps5 originales sony inalámbricos'
  },
  {
    id: 'gta-funda-silicona-ps5-neon',
    asin: 'B09NMYBDZK',
    title: 'Funda de Silicona Antideslizante para Mando PS5 DualSense + Grips Joystick',
    category: 'mandos',
    categoryLabel: 'Mandos PS5 & Periféricos',
    priceText: '11,99 €',
    priceNumeric: 11.99,
    rating: 4.5,
    reviewsCount: 5200,
    imageUrl: 'https://images.unsplash.com/photo-1607604276583-eef5d076aa5f?auto=format&fit=crop&w=600&q=80',
    badge: 'Protección Gamer',
    description: 'Carcasa de silicona suave en degradado violeta/rosa con textura de agarre en la empuñadura y 8 tapones para joystick.',
    pros: [
      'Protege el mando de caídas, sudor y arañazos durante horas de juego',
      'Grips de diferentes alturas para mejorar la puntería en disparos',
      'Aberturas de corte preciso que no tapan puertos ni gatillos'
    ],
    idealFor: 'Personalizar cualquier mando blanco estándar con el toque GTA VI por muy poco dinero.',
    searchQuery: 'funda silicona mando ps5 degradado rosa morado grips joystick'
  },
  {
    id: 'gta-volante-logitech-g29',
    asin: 'B00YUIM2J0',
    title: 'Logitech G29 Driving Force Volante de Carreras con Pedales para PS5, PS4 y PC',
    category: 'mandos',
    categoryLabel: 'Mandos PS5 & Periféricos',
    priceText: '249,00 €',
    priceNumeric: 249.00,
    rating: 4.7,
    reviewsCount: 42800,
    imageUrl: 'https://images-na.ssl-images-amazon.com/images/P/B00YUIM2J0.01._SCLZZZZZZZ_SX400_.jpg',
    badge: 'Conducción Real',
    description: 'El volante rey con Force Feedback de dos motores para sentir cada derrape en el asfalto mojado de Vice City con pedales de acero inoxidable.',
    pros: [
      'Giro de 900 grados bloque a bloque igual que un coche real de carreras',
      'Forrado en cuero cosido a mano de primera calidad con levas de cambio',
      'Pedal de freno no lineal que responde a la presión real'
    ],
    idealFor: 'El regalo definitivo para los que aman conducir deportivos y huir de la policía.',
    searchQuery: 'logitech g29 driving force volante con pedales ps5 pc'
  },

  // --- 3. ROPA & CAMISETAS RETRO VICE CITY ---
  {
    id: 'gta-camisa-hawaiana-retro-vice',
    asin: 'B09NMYBDZK',
    title: 'Camisa Hawaiana Casual Manga Corta Estampado Flamencos y Palmeras 80s',
    category: 'merch',
    categoryLabel: 'Ropa & Camisetas Retro',
    priceText: '24,99 €',
    priceNumeric: 24.99,
    rating: 4.5,
    reviewsCount: 3120,
    imageUrl: 'https://images.unsplash.com/photo-1596755094514-f87e34085b2c?auto=format&fit=crop&w=600&q=80',
    badge: 'Estilo Tommy Vercetti',
    description: 'Camisa clásica hawaiana veraniega de tejido transpirable, recreación moderna del look legendario de Vice City.',
    pros: [
      'Tejido ultraligero de secado rápido muy cómodo para uso diario',
      'Corte holgado desenfadado con botones frontales y cuello en V',
      'El outfit más representativo de la saga para eventos y verano'
    ],
    idealFor: 'Fans nostálgicos de Vice City que quieren vestir el estilo de la saga.',
    searchQuery: 'camisa hawaiana hombre estampado palmeras flamencos vice city'
  },
  {
    id: 'gta-camiseta-retro-miami-vice',
    asin: 'B0CNX12X52',
    title: 'Camiseta Hombre Diseño Retro Synthwave Atardecer Palmeras Miami Algodón 100%',
    category: 'merch',
    categoryLabel: 'Ropa & Camisetas Retro',
    priceText: '18,99 €',
    priceNumeric: 18.99,
    rating: 4.6,
    reviewsCount: 1780,
    imageUrl: 'https://images.unsplash.com/photo-1521572267360-ee0c2909d518?auto=format&fit=crop&w=600&q=80',
    badge: 'Algodón Prémium',
    description: 'Camiseta de manga corta de algodón suave con serigrafía digital de alta definición resistente a los lavados.',
    pros: [
      '100% algodón hilado de tacto suave que no encoge',
      'Gráfico estilizado con tonos neón rosa, azul y violeta',
      'Corte regular estándar que sienta perfecto'
    ],
    idealFor: 'Un regalo infalible para llevar puesto a la universidad o jugando en casa.',
    searchQuery: 'camiseta retro miami 80s synthwave palmeras atardecer hombre'
  },
  {
    id: 'gta-sudadera-hoodie-vice-city',
    asin: 'B0CNX12X52',
    title: 'Sudadera con Capucha Estilo Retro 80s Vice City Synthwave con Bolsillo Canguro',
    category: 'merch',
    categoryLabel: 'Ropa & Camisetas Retro',
    priceText: '34,99 €',
    priceNumeric: 34.99,
    rating: 4.7,
    reviewsCount: 1450,
    imageUrl: 'https://images.unsplash.com/photo-1556905055-8f358a7a47b2?auto=format&fit=crop&w=600&q=80',
    badge: 'Máximo Confort',
    description: 'Hoodie con forro polar interior muy suave, capucha ajustable con cordones y estampado retro en pecho y espalda.',
    pros: [
      'Interior cálido afelpado ideal para las noches de invierno gaming',
      'Costuras dobles reforzadas en puños y cintura para mayor durabilidad',
      'Bolsillo frontal espacioso para móvil o mando'
    ],
    idealFor: 'Pasar horas cómodo frente a la consola luciendo la estética de Florida.',
    searchQuery: 'sudadera capucha hombre retro 80s vice city miami synthwave'
  },
  {
    id: 'gta-gorra-retro-snapback',
    asin: 'B083F88B6R',
    title: 'Gorra Snapback Vintage Estilo Miami Vice City Visera Plana Regulable',
    category: 'merch',
    categoryLabel: 'Ropa & Camisetas Retro',
    priceText: '15,99 €',
    priceNumeric: 15.99,
    rating: 4.5,
    reviewsCount: 890,
    imageUrl: 'https://images.unsplash.com/photo-1588850561407-ed78c282e89b?auto=format&fit=crop&w=600&q=80',
    badge: 'Accesorio Top',
    description: 'Gorra urbana estructurada con cierre trasero ajustable snapback y bordado de palmeras y letras retro en contraste neón.',
    pros: [
      'Talla única adaptable con correa de botones a presión',
      'Orificios de ventilación bordados para máxima transpirabilidad',
      'Diseño limpio que combina con cualquier sudadera o chaqueta'
    ],
    idealFor: 'Completar el outfit urbano con el sello inconfundible de Vice City.',
    searchQuery: 'gorra snapback retro miami vice 80s visera plana'
  },
  {
    id: 'gta-taza-termica-cambia-color',
    asin: 'B08FCVTY88',
    title: 'Taza Mágica Termosensible de Cerámica con Diseño Oculto de Ciudad Neón',
    category: 'merch',
    categoryLabel: 'Ropa & Camisetas Retro',
    priceText: '13,99 €',
    priceNumeric: 13.99,
    rating: 4.6,
    reviewsCount: 2600,
    imageUrl: 'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?auto=format&fit=crop&w=600&q=80',
    badge: 'Efecto Mágico',
    description: 'Taza de desayuno que pasa de negra a mostrar una panorámica brillante de rascacielos y deportivos al verter café o leche caliente.',
    pros: [
      'Efecto visual sorprendente cada mañana al calentar la bebida',
      'Capacidad estándar de 330 ml en cerámica resistente',
      'Regalo muy económico y con alta tasa de sorpresa'
    ],
    idealFor: 'El café matutino de cualquier gamer o trabajador de oficina.',
    searchQuery: 'taza termocromica sensible calor ciudad neon retro cafe'
  },

  // --- 4. COLECCIONISMO & SOPORTES ---
  {
    id: 'gta-soporte-mando-cable-guys',
    asin: 'B07FN34NL9',
    title: 'Soporte para Mando PS5 / Xbox y Smartphone Cable Guys Figura Coleccionable',
    category: 'coleccion',
    categoryLabel: 'Coleccionismo & Soportes',
    priceText: '24,99 €',
    priceNumeric: 24.99,
    rating: 4.8,
    reviewsCount: 16700,
    imageUrl: 'https://images-na.ssl-images-amazon.com/images/P/B07FN34NL9.01._SCLZZZZZZZ_SX400_.jpg',
    badge: 'Accesorio Esencial',
    description: 'Estatua soporte con brazos extendidos diseñada para sostener firmemente cualquier mando de consola o teléfono móvil mientras se carga.',
    pros: [
      'Base pesada muy estable que no vuelca con el peso de mandos Pro',
      'Compatible con mandos DualSense, Xbox Wireless y mandos Switch Pro',
      'Incluye cable de carga de 2 metros'
    ],
    idealFor: 'Tener el mando siempre ordenado y listo para la acción en el setup.',
    searchQuery: 'cable guys soporte mando ps5 figura coleccionable'
  },
  {
    id: 'gta-caja-luz-cinematica-retro',
    asin: 'B0CNX12X52',
    title: 'Caja de Luz LED A4 Personalizable con 300 Letras, Emojis y Marcadores',
    category: 'coleccion',
    categoryLabel: 'Coleccionismo & Soportes',
    priceText: '17,99 €',
    priceNumeric: 17.99,
    rating: 4.6,
    reviewsCount: 7800,
    imageUrl: 'https://images.unsplash.com/photo-1563089145-599997674d42?auto=format&fit=crop&w=600&q=80',
    badge: 'Totalmente Personalizable',
    description: 'Letrero luminoso estilo marquesina de cine con 3 líneas para escribir "GTA VI", "VICE CITY" o el gamertag con luz cálida LED.',
    pros: [
      'Alimentación dual por cable USB incluido o con 6 pilas AA',
      'Contiene emojis gamer y abecedario completo con duplicados',
      'Cambia el mensaje cuando quieras para fotos o streamings'
    ],
    idealFor: 'Poner tu mensaje favorito de GTA VI iluminando tu estantería.',
    searchQuery: 'caja de luz cinemática a4 letras intercambiables led gamer'
  },
  {
    id: 'gta-coche-escala-lamborghini-countach',
    asin: 'B00YUIM2J0',
    title: 'Maqueta Deportiva 1:24 Coche Clásico Retro Miami Diecast Metal Apertura Puertas',
    category: 'coleccion',
    categoryLabel: 'Coleccionismo & Soportes',
    priceText: '27,99 €',
    priceNumeric: 27.99,
    rating: 4.7,
    reviewsCount: 3890,
    imageUrl: 'https://images.unsplash.com/photo-1552519507-da3b142c6e3d?auto=format&fit=crop&w=600&q=80',
    badge: 'Icono del Juego',
    description: 'Reproducción metálica a escala con puertas de tijera que se abren, ruedas de goma direccionales y detalles interiores minuciosos.',
    pros: [
      'Carrocería de fundición de metal Diecast resistente y pesada',
      'El coche más codiciado y representativo del universo Vice City (Infernus)',
      'Excelente pieza de exposición para vitrinas y escritorios'
    ],
    idealFor: 'Coleccionistas amantes de los superdeportivos de los años 80.',
    searchQuery: 'coche miniatura 1 24 deportivo clasico puertas tijera metal diecast'
  },
  {
    id: 'gta-soporte-auriculares-rgb',
    asin: 'B08H93ZRK9',
    title: 'Soporte Auriculares Gamer con Iluminación Neón RGB y 2 Puertos USB Hub',
    category: 'coleccion',
    categoryLabel: 'Coleccionismo & Soportes',
    priceText: '21,99 €',
    priceNumeric: 21.99,
    rating: 4.6,
    reviewsCount: 9200,
    imageUrl: 'https://images.unsplash.com/photo-1546435770-a3e426bf472b?auto=format&fit=crop&w=600&q=80',
    badge: 'Hub 2 en 1',
    description: 'Torre de descanso para cascos diadema con base luminosa de modos dinámicos y puertos USB adicionales para conectar periféricos.',
    pros: [
      '10 modos de luz seleccionables incluyendo modo respiración multicolor',
      'Puertos USB frontales para cargar el mando o conectar el ratón',
      'Base con goma antideslizante para sostener cascos pesados'
    ],
    idealFor: 'Organizar los auriculares sobre la mesa con iluminación a juego.',
    searchQuery: 'soporte auriculares diadema gamer rgb usb hub base'
  },

  // --- 5. RESERVA & TARJETAS DE SALDO DIGITAL ---
  {
    id: 'gta-tarjeta-psn-50',
    asin: 'B004RMK4P8',
    title: 'Tarjeta Regalo PlayStation Store 50 € Saldo Digital para PS5 y PS4 (Código Online)',
    category: 'juego',
    categoryLabel: 'Reserva & Tarjetas Saldo',
    priceText: '50,00 €',
    priceNumeric: 50.00,
    rating: 4.8,
    reviewsCount: 54000,
    imageUrl: 'https://images-na.ssl-images-amazon.com/images/P/B004RMK4P8.01._SCLZZZZZZZ_SX400_.jpg',
    badge: 'Entrega Inmediata',
    description: 'Código digital oficial enviado al instante por correo para recargar la cuenta de PlayStation Network y reservar GTA VI en digital el día 1.',
    pros: [
      'Sin gastos de envío y disponible en segundos en tu cuenta de Amazon',
      'Permite al destinatario reservar GTA 6 en la PlayStation Store directamente',
      'Válido para comprar juegos, DLCs, pases y suscripciones PlayStation Plus'
    ],
    idealFor: 'El regalo más seguro: acertarás al 100% sin miedo a equivocarte de talla o juego.',
    searchQuery: 'tarjeta regalo playstation store 50 euros codigo digital amazon'
  },
  {
    id: 'gta-tarjeta-psn-100',
    asin: 'B004RMK4P8',
    title: 'Tarjeta Regalo PlayStation Store 100 € Saldo Digital para Edición Deluxe GTA VI',
    category: 'juego',
    categoryLabel: 'Reserva & Tarjetas Saldo',
    priceText: '100,00 €',
    priceNumeric: 100.00,
    rating: 4.9,
    reviewsCount: 38000,
    imageUrl: 'https://images-na.ssl-images-amazon.com/images/P/B004RMK4P8.01._SCLZZZZZZZ_SX400_.jpg',
    badge: 'Para Edición Coleccionista',
    description: 'Saldo directo oficial para PlayStation Store. El importe ideal para asegurar la reserva de la Edición Deluxe o Gold de Grand Theft Auto VI.',
    pros: [
      'Código digital canjeable al instante en PS5 y app PlayStation',
      'Cubre el coste total del juego estrella y contenidos exclusivos de lanzamiento',
      'Sin fecha de caducidad tras ser añadido a la cartera de Sony'
    ],
    idealFor: 'El regalo estrella de familiares o grupos de amigos para el lanzamiento más grande.',
    searchQuery: 'tarjeta playstation store 100 euros saldo codigo digital'
  },
  {
    id: 'gta-tarjeta-xbox-50',
    asin: 'B00000IWH8',
    title: 'Tarjeta Regalo Xbox 50 € Código Digital para Xbox Series X / Series S y PC',
    category: 'juego',
    categoryLabel: 'Reserva & Tarjetas Saldo',
    priceText: '50,00 €',
    priceNumeric: 50.00,
    rating: 4.8,
    reviewsCount: 28400,
    imageUrl: 'https://images-na.ssl-images-amazon.com/images/P/B00000IWH8.01._SCLZZZZZZZ_SX400_.jpg',
    badge: 'Para Xbox Series X',
    description: 'Código digital de Microsoft oficial para reservar GTA VI en la tienda Xbox Games Store con entrega inmediata por email.',
    pros: [
      'Válido para Xbox Series X, Series S y tienda Microsoft en Windows',
      'Canjeable en segundos desde la consola o web de Microsoft',
      'Ideal si el destinatario juega en la consola de Microsoft'
    ],
    idealFor: 'Jugadores de Xbox Series X que esperan Grand Theft Auto VI.',
    searchQuery: 'tarjeta regalo xbox 50 euros codigo digital microsoft amazon'
  },
  {
    id: 'gta-consola-ps5-slim',
    asin: 'B0CLTBHXWQ',
    title: 'Consola PlayStation 5 Modelo Slim Chasis D con 1TB de Almacenamiento SSD Ultra-Rápido',
    category: 'juego',
    categoryLabel: 'Reserva & Tarjetas Saldo',
    priceText: '549,99 €',
    priceNumeric: 549.99,
    rating: 4.8,
    reviewsCount: 12500,
    imageUrl: 'https://images-na.ssl-images-amazon.com/images/P/B0CLTBHXWQ.01._SCLZZZZZZZ_SX400_.jpg',
    badge: 'La Plataforma Oficial',
    description: 'La consola de nueva generación donde GTA VI exprimirá todo su potencial gráfico con trazado de rayos y tiempos de carga instantáneos.',
    pros: [
      'SSD de 1TB ultrarrápido con soporte 4K a 60-120 fps y audio 3D',
      'Diseño más compacto y ligero con soporte para soporte vertical',
      'Incluye mando inalámbrico DualSense y juego Astro\'s Playroom preinstalado'
    ],
    idealFor: 'Dar el salto definitivo a la nueva generación para estar listo el día de salida.',
    searchQuery: 'playstation 5 slim consola 1tb sony ps5 amazon'
  }
];
