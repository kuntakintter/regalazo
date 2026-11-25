export interface HubProduct {
  id: string;
  asin: string;
  title: string;
  category: string;
  categoryLabel: string;
  brand: string;
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

export const AUTOMOVIL_CATEGORIES = [
  { id: 'all', label: 'Todo para Automóvil', icon: '🚗' },
  { id: 'dashcam', label: 'Dashcams & Cámaras', icon: '📹' },
  { id: 'arrancadores', label: 'Arrancadores & Baterías', icon: '⚡' },
  { id: 'detailing', label: 'Detailing & Limpieza', icon: '✨' },
  { id: 'compresores', label: 'Compresores & Neumáticos', icon: '🛞' },
  { id: 'gadgets', label: 'Soportes & Gadgets Viaje', icon: '📱' },
  { id: 'diagnostico', label: 'Diagnosis OBD2 & Motor', icon: '🔧' },
];

export const AUTOMOVIL_BRANDS = [
  'Todas las marcas',
  'NOCO',
  '70mai',
  'Michelin',
  'Meguiars',
  'Xiaomi',
  'Baseus',
];

export const AUTOMOVIL_PRICE_RANGES = [
  { id: 'all', label: 'Cualquier presupuesto' },
  { id: '<30', label: 'Detalles prácticos (<30 €)' },
  { id: '30-70', label: 'De 30 € a 70 €' },
  { id: '70-150', label: 'De 70 € a 150 €' },
  { id: '>150', label: 'Gama Alta (+150 €)' },
];

export const AUTOMOVIL_PRODUCTS: HubProduct[] = [
  {
    id: 'auto-baliza-v16-dgt-geolocalizada-2038',
    asin: 'B0DYK28HQZ',
    title: 'Baliza V16 Homologada DGT 3.0 con Geolocalización + SIM Datos Gratis hasta 2038 + Funda',
    category: 'arrancadores',
    categoryLabel: 'Arrancadores & Baterías',
    brand: 'Michelin',
    priceText: '19,90 €',
    priceNumeric: 19.9,
    rating: 4.7,
    reviewsCount: 6840,
    imageUrl: 'https://m.media-amazon.com/images/I/7175naJBnPL._AC_UL320_.jpg',
    badge: 'Obligatoria DGT 2026',
    description: 'Luz de emergencia V16 conectada y homologada por la DGT con geolocalización DGT 3.0, tarjeta SIM integrada pagada hasta 2038 sin cuotas, base magnética y visibilidad LED 360° a 1 km.',
    pros: [
      'Sustituye legalmente a los triángulos de emergencia sin tener que bajar del coche',
      'Conectividad móvil con la nube DGT 3.0 incluida gratis hasta el año 2038',
      'Incluye funda protectora para guantera y base imantada de alta adherencia'
    ],
    idealFor: 'El regalo obligatorio y más vendido de 2026 para cualquier coche en España.',
    searchQuery: 'Baliza V16 Homologada DGT con Geolocalizacion SIM 2038'
  },
  {
    id: 'auto-pack-3-balizas-v16-dgt-bip-drive',
    asin: 'B0G1492JDM',
    title: 'Pack Familiar x3 Balizas V16 Homologadas DGT con Geolocalización 3.0 Bip&Drive (3 Coches)',
    category: 'arrancadores',
    categoryLabel: 'Arrancadores & Baterías',
    brand: 'Michelin',
    priceText: '30,80 €',
    priceNumeric: 30.8,
    rating: 4.8,
    reviewsCount: 2190,
    imageUrl: 'https://m.media-amazon.com/images/I/71VVLzws2yL._AC_UL320_.jpg',
    badge: 'Pack Ahorro 3 Coches (10€/ud)',
    description: 'Lote ahorro de 3 balizas V16 conectadas y homologadas por la DGT con geolocalización 3.0 e indicador de batería para equipar todos los coches de la familia por apenas 10 € cada una.',
    pros: [
      '3 unidades homologadas DGT 3.0 con geolocalización lista para usar',
      'Sale a solo 10,26 € por baliza: ideal para repartir en familia',
      'Resistente a lluvia, nieve y viento con alcance lumínico de 1 kilómetro'
    ],
    idealFor: 'Equipar los coches de toda la familia de una sola vez al precio más bajo de Amazon.',
    searchQuery: 'Baliza V16 Homologada DGT con Geolocalizacion Pack x3'
  },
  {
    id: 'auto-arrancador-noco-gb40',
    asin: 'B015TKUPIC',
    title: 'NOCO Boost Plus GB40 Arrancador de Batería de Coche Litio 1000A 12V',
    category: 'arrancadores',
    categoryLabel: 'Arrancadores & Baterías',
    brand: 'NOCO',
    priceText: '99,95 €',
    priceNumeric: 99.95,
    rating: 4.7,
    reviewsCount: 84000,
    imageUrl: 'https://m.media-amazon.com/images/I/71XsGNIxovL._AC_UL320_.jpg',
    badge: 'Nº 1 Más Vendido Amazon',
    description: 'Arranca motores de gasolina hasta 6.0L y diésel hasta 3.0L al instante. Diseño ultra seguro a prueba de chispas y polaridad inversa.',
    pros: [
      'Hasta 20 arranques con una sola carga completa',
      'Tecnología a prueba de errores con pinzas antispark ultra seguras',
      'Funciona como linterna LED de 100 lúmenes y batería externa USB'
    ],
    idealFor: 'Imprescindible para cualquier conductor para no quedarse tirado jamás.',
    searchQuery: 'noco boost plus gb40 arrancador bateria coche'
  },
  {
    id: 'auto-dashcam-70mai-a500s',
    asin: 'B0BNC6WV6G',
    title: '70mai Dash Cam Pro Plus+ A500S Cámara para Coche 2.7K QHD con GPS y WiFi',
    category: 'dashcam',
    categoryLabel: 'Dashcams & Cámaras',
    brand: '70mai',
    priceText: '79,99 €',
    priceNumeric: 79.99,
    rating: 4.6,
    reviewsCount: 16500,
    imageUrl: 'https://m.media-amazon.com/images/I/41En42XWmML._AC_UL320_.jpg',
    badge: 'Resolución 2.7K Ultra Nítida',
    description: 'Grabación de vídeo en alta definición con visión nocturna 3D DNR, sensor Sony IMX335, GPS integrado y sistema de asistencia ADAS en carretera.',
    pros: [
      'Sensor Sony de alta sensibilidad para leer matrículas de noche',
      'Vigilancia de aparcamiento 24h con sensor de colisión integrado',
      'Descarga rápida de vídeos al móvil mediante app WiFi'
    ],
    idealFor: 'Seguridad y prueba irrefutable ante cualquier percance en carretera.',
    searchQuery: '70mai dash cam pro plus a500s camara coche'
  },
  {
    id: 'auto-compresor-xiaomi-2',
    asin: 'B0CBBP8BQX',
    title: 'Xiaomi Portable Electric Air Compressor 2 Compresor de Aire Portátil Digital',
    category: 'compresores',
    categoryLabel: 'Compresores & Neumáticos',
    brand: 'Xiaomi',
    priceText: '39,99 €',
    priceNumeric: 39.99,
    rating: 4.7,
    reviewsCount: 32000,
    imageUrl: 'https://m.media-amazon.com/images/I/61Vv7YKRjUL._AC_UL320_.jpg',
    badge: 'Bomba Eléctrica Inteligente',
    description: 'Inflador inalámbrico de precisión con pantalla digital y parada automática al alcanzar la presión deseada. Carga rápida USB-C.',
    pros: [
      'Infla un neumático de coche en menos de 8 minutos',
      'Sensor digital con parada automática exacta en bares o PSI',
      'Válido para coches, motos, bicicletas, patinetes y balones'
    ],
    idealFor: 'Llevar siempre en el maletero para revisar la presión sin ir a la gasolinera.',
    searchQuery: 'xiaomi portable electric air compressor 2 inflador'
  },
  {
    id: 'auto-detailing-meguiars-kit',
    asin: 'B00353PWAW',
    title: 'Meguiar\'s Kit Limpieza y Cuidado Completo Coche con Champú, Cera y Toalla',
    category: 'detailing',
    categoryLabel: 'Detailing & Limpieza',
    brand: 'Meguiars',
    priceText: '49,90 €',
    priceNumeric: 49.9,
    rating: 4.8,
    reviewsCount: 9200,
    imageUrl: 'https://m.media-amazon.com/images/I/61dWt30WuEL._AC_UL320_.jpg',
    badge: 'Acabado Espejo Profesional',
    description: 'Pack premium de la marca de detailing más prestigiosa del mundo. Champú acondicionador Gold Class, cera líquida de carnauba y microfibra.',
    pros: [
      'Brillo profundo efecto mojado sin dañar la laca original',
      'Protección duradera contra rayos UV, lluvia ácida y mosquitos',
      'Microfibra Supreme Shine ultra suave que no crea microrrayas'
    ],
    idealFor: 'Amantes del motor que disfrutan teniendo su coche impecable como el primer día.',
    searchQuery: 'meguiars kit limpieza coche detailing cera carnauba'
  },
  {
    id: 'auto-soporte-baseus-magsafe',
    asin: 'B0FH718YHX',
    title: 'Baseus Soporte de Coche Magnético MagSafe con Carga Rápida Inalámbrica 15W',
    category: 'gadgets',
    categoryLabel: 'Soportes & Gadgets Viaje',
    brand: 'Baseus',
    priceText: '26,99 €',
    priceNumeric: 26.99,
    rating: 4.6,
    reviewsCount: 7800,
    imageUrl: 'https://m.media-amazon.com/images/I/61nUR8J4aXL._AC_UL320_.jpg',
    badge: 'Imanes N52 Ultra Fuertes',
    description: 'Sujeción magnética de grado aeroespacial que no se mueve ni en badenes o caminos bacheados con refrigeración activa durante la carga.',
    pros: [
      'Sujeción instantánea con una sola mano mediante imanes N52',
      'Rotación 360 grados para poner el móvil en vertical o navegación horizontal',
      'Compatible con iPhone 12/13/14/15/16 y fundas magnéticas'
    ],
    idealFor: 'Navegar con Google Maps o Waze sin cables colgando por el salpicadero.',
    searchQuery: 'baseus soporte coche magsafe carga inalambrica 15w'
  },
  {
    id: 'auto-diagnosis-obd2-bluetooth',
    asin: 'B0D8HYW5GG',
    title: 'Vgate iCar Pro 2S Bluetooth Escáner de Diagnosis OBD2 para iOS, Android y Windows',
    category: 'diagnostico',
    categoryLabel: 'Diagnosis OBD2 & Motor',
    brand: 'Otros',
    priceText: '32,99 €',
    priceNumeric: 32.99,
    rating: 4.6,
    reviewsCount: 14200,
    imageUrl: 'https://m.media-amazon.com/images/I/51XOvDCC-cL._AC_UL320_.jpg',
    badge: 'Ahorra Dinero en Talleres',
    description: 'Conecta con la centralita del coche y muestra en el móvil en tiempo real datos del motor, consumo y códigos de avería del cuadro.',
    pros: [
      'Lee y borra luces de avería del motor Check Engine',
      'Compatible con apps líderes como Torque Pro, Car Scanner y BimmerCode',
      'Modo de suspensión automática que no gasta la batería del vehículo'
    ],
    idealFor: 'Conductores curiosos y amantes de la mecánica que quieren controlar su coche.',
    searchQuery: 'vgate icar pro 2s obd2 bluetooth scanner diagnosis coche'
  }
];
