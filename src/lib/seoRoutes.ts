import { MetadataRoute } from 'next';
import { AGE_CATEGORIES, AGE_SUBCATEGORIES_MAP } from '@/data/products';

export interface SeoRouteMeta {
  ageId: string;
  ageSlug: string;
  title: string;
  h1: string;
  description: string;
  keywords: string[];
}

export const SEO_AGE_ROUTES: Record<string, SeoRouteMeta> = {
  'bebes-0-a-12-meses': {
    ageId: '0-12m',
    ageSlug: 'bebes-0-a-12-meses',
    title: 'Top Regalos para Bebés y Recién Nacidos 【Guía 2026】 Ideas Útiles',
    h1: 'Ideas de Regalo para Bebés y Recién Nacidos (0 a 12 Meses)',
    description: '¿Buscas el regalo ideal para un recién nacido? Tartas de pañales, cunas colecho, cochecitos ligeros y juguetes sensoriales para acertar con los padres. Envíos Prime.',
    keywords: ['regalos bebes recien nacidos', 'regalo bebe 1 año', 'tartas de pañales', 'cochecitos de bebe ligeros', 'cuna colecho recomendada']
  },
  'ninos-1-a-3-anos': {
    ageId: '1-3',
    ageSlug: 'ninos-1-a-3-anos',
    title: 'Top Regalos para Niños de 1 a 3 Años 【Guía 2026】 Juguetes Montessori',
    h1: 'Ideas de Regalo para Primeros Pasos (1 a 3 Años)',
    description: 'Juguetes Montessori de madera, torres de aprendizaje, LEGO DUPLO y triciclos evolutivos para peques de 1, 2 y 3 años recomendados por expertos en pedagogía.',
    keywords: ['regalos niños 1 año', 'regalos niños 2 años', 'regalos niños 3 años', 'juguetes montessori madera', 'lego duplo']
  },
  'ninos-4-a-6-anos': {
    ageId: '4-6',
    ageSlug: 'ninos-4-a-6-anos',
    title: 'Top Regalos para Niños de 4 a 6 Años 【Guía 2026】 Ideas Divertidas',
    h1: 'Ideas de Regalo para Infantil y Creatividad (4 a 6 Años)',
    description: 'Circuitos Mario Kart Carrera, patinetes con ruedas LED, juegos de mesa infantiles y maletines creativos para niños y niñas de 4 a 6 años. Precios al día.',
    keywords: ['regalos niños 4 años', 'regalos niños 5 años', 'regalos niños 6 años', 'circuitos coches infantiles', 'patinete niño ruedas led']
  },
  'ninos-7-a-9-anos': {
    ageId: '7-9',
    ageSlug: 'ninos-7-a-9-anos',
    title: 'Top Regalos para Niños de 7 a 9 Años 【2026】 Scalextric, LEGO y STEM',
    h1: 'Ideas de Regalo para Primaria y Acción (7 a 9 Años)',
    description: 'Pistas de Scalextric Compact, coches teledirigidos 4x4, sets LEGO Creator 3 en 1, cajas de magia Borrás y ciencia divertida para peques de 7 a 9 años.',
    keywords: ['regalos niños 7 años', 'regalos niños 8 años', 'regalos niños 9 años', 'scalextric compact pista', 'lego creator 3 en 1', 'juegos de magia borras']
  },
  'ninos-10-a-12-anos': {
    ageId: '10-12',
    ageSlug: 'ninos-10-a-12-anos',
    title: 'Top Regalos para Preadolescentes (10-12 Años) 【2026】 Los Más Deseados',
    h1: 'Ideas de Regalo para Preadolescentes (10 a 12 Años)',
    description: 'Juegos de cartas competitivos como Virus!, minidrones con cámara resistentes a caídas, escape rooms caseros y libros juveniles para chicos y chicas de 10 a 12 años.',
    keywords: ['regalos niños 10 años', 'regalos niños 11 años', 'regalos niños 12 años', 'juego virus cartas', 'minidrones infantiles con camara']
  },
  'jovenes-13-a-15-anos': {
    ageId: '13-15',
    ageSlug: 'jovenes-13-a-15-anos',
    title: 'Top Regalos para Adolescentes de 13 a 15 Años 【2026】 Acierta Seguro',
    h1: 'Ideas de Regalo para Adolescentes (13 a 15 Años)',
    description: 'Auriculares inalámbricos con cancelación de ruido, cámaras instantáneas Instax Mini, juegos de estrategia como Catan y mochilas antirrobo con garantía oficial.',
    keywords: ['regalos adolescentes 13 años', 'regalos adolescentes 14 años', 'regalos adolescentes 15 años', 'auriculares inalambricos jbl', 'catan juego de mesa']
  },
  'jovenes-16-a-18-anos': {
    ageId: '16-18',
    ageSlug: 'jovenes-16-a-18-anos',
    title: 'Top Regalos para Jóvenes de 16 a 18 Años 【2026】 Gaming y Tendencias',
    h1: 'Ideas de Regalo para Jóvenes (16 a 18 Años - Gaming y Estilo)',
    description: 'Accesorios y mandos oficiales de PS5, setup gamer pro, fragancias unisex de marca, libretas de cuero artesanal y tecnología juvenil con envío Prime.',
    keywords: ['regalos 16 años chico', 'regalos 18 años chica', 'mandos ps5 dualsense edge', 'accesorios gaming pc', 'fragancias jovenes']
  },
  'adultos-mas-de-18-anos': {
    ageId: '+18',
    ageSlug: 'adultos-mas-de-18-anos',
    title: 'Top Regalos Originales para Adultos (+18 Años) 【2026】 Ideas TOP',
    h1: 'Ideas de Regalo Originales a Partir de 18 Años (Adultos)',
    description: 'Cajas Smartbox de escapadas y cenas gourmet, sets botánicos LEGO Icons, smartphones, drones 4K y juegos de mesa estratégicos con garantía oficial Amazon España.',
    keywords: ['regalos a partir de 18 años', 'regalos para adultos', 'regalos originales mayores 18 años', 'cajas smartbox escapada', 'lego icons adultos', 'smartphones buques insignia', 'drones con camara 4k', 'juegos de mesa expertos adultos']
  },
  'fiesta-revelacion-genero': {
    ageId: 'reveal',
    ageSlug: 'fiesta-revelacion-genero',
    title: 'Fiesta Revelación de Género y Baby Shower 【Guía 2026】 Ideas Sorpresa',
    h1: 'Ideas y Artículos para Fiesta Revelación de Género y Enigma',
    description: 'Cañones de confeti y humo holi biodegradables, globos gigantes enigma sorpresa niño o niña, decoración y photocall para organizar una fiesta de revelación inolvidable.',
    keywords: ['fiesta revelacion genero bebe', 'cañones confeti revelacion', 'globo sorpresa niño o niña', 'polvo holi humo bebe']
  }
};

export function slugify(text: string): string {
  return text
    .toString()
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/\s+/g, '-')
    .replace(/[^\w\-]+/g, '')
    .replace(/\-\-+/g, '-')
    .replace(/^-+/, '')
    .replace(/-+$/, '');
}

export function getSubcategorySlugMap(ageId: string): { label: string; slug: string }[] {
  const subcategories = AGE_SUBCATEGORIES_MAP[ageId] || [];
  return subcategories.map((sub) => ({
    label: sub,
    slug: slugify(sub)
  }));
}
