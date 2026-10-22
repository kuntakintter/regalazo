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
    asin: 'B0BKGK9CX1',
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
    asin: 'B0H74SJZHP',
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
    asin: 'B0H4YFTBG6',
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
    asin: 'B0HL8XLZXP',
    title: 'Disfraz Hinchable Gigante para Adultos y Niños con Ventilador Automático Incorporado',
    category: 'disfraces',
    categoryLabel: 'Disfraces Terror & Cosplay',
    brand: 'Party Fun',
    priceText: '29,95 €',
    priceNumeric: 29.95,
    rating: 4.8,
    reviewsCount: 14800,
    imageUrl: 'https://m.media-amazon.com/images/I/51cyA5X5WgL._AC_UL320_.jpg',
    badge: 'El Éxito de la Fiesta',
    description: 'El disfraz más divertido y llamativo de la noche. Se infla en menos de 60 segundos gracias a su potente ventilador compacto integrado a batería y mantiene el volumen durante horas de fiesta.',
    pros: [
      'Inflado ultrarrápido y peso superligero gracias a su tejido antidesgarro',
      'Talla universal con cintura elástica de ajuste hermético',
      'Garantiza risas y fotos inolvidables en cualquier evento'
    ],
    idealFor: 'Llegar a la fiesta de Halloween y ser el centro indiscutible de todas las miradas.',
    searchQuery: 'disfraz hinchable gigante halloween fiesta risas'
  }
];
