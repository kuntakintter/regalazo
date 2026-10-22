import { HubProduct } from './automovilData';

export const NAVIDAD_CATEGORIES = [
  { id: 'all', label: 'Todo para Navidad & Reyes', icon: '🎄' },
  { id: 'amigo-invisible', label: 'Regalos Amigo Invisible (<15 €)', icon: '🎁' },
  { id: 'adviento', label: 'Calendarios de Adviento 2026', icon: '📅' },
  { id: 'jerseis-luces', label: 'Jerséis Navideños con Luces & Ropa', icon: '🦌' },
  { id: 'decoracion', label: 'Luces & Decoración Navideña', icon: '✨' },
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
    id: 'nav-jersey-navideno-luces-led',
    asin: 'B0C3J18JZ5',
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
  {
    id: 'nav-taza-amigo-invisible-fisura',
    asin: 'B09VY8PF77',
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
    id: 'nav-cortina-luces-led-blanco-calido',
    asin: 'B07DXFH3CK',
    title: 'Cortina de Luces LED Navideñas 5M con Efecto Cascada Blanco Cálido 8 Modos de Luz',
    category: 'decoracion',
    categoryLabel: 'Luces & Decoración Navideña',
    brand: 'Salcar',
    priceText: '19,99 €',
    priceNumeric: 19.99,
    rating: 4.7,
    reviewsCount: 31000,
    imageUrl: 'https://m.media-amazon.com/images/I/61122dZISnL._AC_UL320_.jpg',
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
    id: 'nav-lindt-bombones-creation-dessert',
    asin: 'B00AW0V95I',
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
