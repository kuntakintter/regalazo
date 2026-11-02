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
    title: 'Los 10 Mejores Regalos para Bebés y Recién Nacidos 【Comparativa 2026】 | Un Buen Regalo',
    h1: 'Los 10 Mejores Regalos para Bebés y Recién Nacidos (0 a 12 Meses)',
    description: 'Comparativa de los 10 mejores regalos y productos para un recién nacido: tartas de pañales, cunas colecho, cochecitos ligeros y juguetes sensoriales mejor valorados.',
    keywords: ['los 10 mejores regalos para bebes', 'comparativa regalos bebes recien nacidos', 'mejores productos para bebes', 'regalo bebe 1 año', 'tartas de pañales', 'cochecitos de bebe ligeros', 'cuna colecho recomendada']
  },
  'ninos-1-a-3-anos': {
    ageId: '1-3',
    ageSlug: 'ninos-1-a-3-anos',
    title: 'Los 10 Mejores Regalos para Niños de 1 a 3 Años 【Comparativa 2026】 | Un Buen Regalo',
    h1: 'Los 10 Mejores Regalos para Primeros Pasos (1 a 3 Años)',
    description: 'Ranking y comparativa de los 10 mejores regalos y juguetes Montessori de madera, torres de aprendizaje, LEGO DUPLO y triciclos evolutivos para niños de 1, 2 y 3 años.',
    keywords: ['los 10 mejores regalos niños 1 a 3 años', 'comparativa juguetes montessori', 'regalos niños 1 año', 'regalos niños 2 años', 'regalos niños 3 años', 'juguetes montessori madera', 'lego duplo']
  },
  'ninos-4-a-6-anos': {
    ageId: '4-6',
    ageSlug: 'ninos-4-a-6-anos',
    title: 'Los 10 Mejores Regalos para Niños de 4 a 6 Años 【Comparativa 2026】 | Un Buen Regalo',
    h1: 'Los 10 Mejores Regalos para Infantil y Creatividad (4 a 6 Años)',
    description: 'Tabla comparativa con los 10 mejores regalos para niños y niñas de 4 a 6 años: circuitos Mario Kart Carrera, patinetes con ruedas LED, juegos de mesa y maletines creativos.',
    keywords: ['los 10 mejores regalos niños 4 a 6 años', 'comparativa regalos infantiles', 'regalos niños 4 años', 'regalos niños 5 años', 'regalos niños 6 años', 'circuitos coches infantiles', 'patinete niño ruedas led']
  },
  'ninos-7-a-9-anos': {
    ageId: '7-9',
    ageSlug: 'ninos-7-a-9-anos',
    title: 'Los 10 Mejores Regalos para Niños de 7 a 9 Años 【Comparativa 2026】 | Un Buen Regalo',
    h1: 'Los 10 Mejores Regalos para Primaria y Acción (7 a 9 Años)',
    description: 'Comparativa de los 10 mejores regalos para niños de 7 a 9 años: pistas de Scalextric Compact, coches teledirigidos 4x4, sets LEGO Creator 3 en 1 y cajas de magia.',
    keywords: ['los 10 mejores regalos niños 7 a 9 años', 'comparativa juguetes 8 años', 'regalos niños 7 años', 'regalos niños 8 años', 'regalos niños 9 años', 'scalextric compact pista', 'lego creator 3 en 1']
  },
  'ninos-10-a-12-anos': {
    ageId: '10-12',
    ageSlug: 'ninos-10-a-12-anos',
    title: 'Los 10 Mejores Regalos para Niños de 10 a 12 Años 【Comparativa 2026】 | Un Buen Regalo',
    h1: 'Los 10 Mejores Regalos para Preadolescentes (10 a 12 Años)',
    description: 'Ranking y comparativa de los 10 mejores regalos para chicos y chicas de 10 a 12 años: juegos de cartas competitivos, minidrones con cámara, escape rooms y LEGO.',
    keywords: ['los 10 mejores regalos niños 10 a 12 años', 'comparativa regalos preadolescentes', 'regalos niños 10 años', 'regalos niños 11 años', 'regalos niños 12 años', 'juego virus cartas', 'minidrones infantiles con camara']
  },
  'jovenes-13-a-15-anos': {
    ageId: '13-15',
    ageSlug: 'jovenes-13-a-15-anos',
    title: 'Los 10 Mejores Regalos para Adolescentes (13-15 Años) 【Comparativa 2026】 | Un Buen Regalo',
    h1: 'Los 10 Mejores Regalos para Adolescentes (13 a 15 Años)',
    description: 'Comparativa con los 10 mejores regalos para adolescentes de 13 a 15 años: auriculares inalámbricos, cámaras instantáneas Instax Mini, juegos como Catan y periféricos gaming.',
    keywords: ['los 10 mejores regalos adolescentes', 'comparativa regalos 13 a 15 años', 'regalos adolescentes 13 años', 'regalos adolescentes 14 años', 'regalos adolescentes 15 años', 'auriculares inalambricos jbl', 'catan juego de mesa']
  },
  'jovenes-16-a-18-anos': {
    ageId: '16-18',
    ageSlug: 'jovenes-16-a-18-anos',
    title: 'Los 10 Mejores Regalos para Jóvenes de 16 a 18 Años 【Comparativa 2026】 | Un Buen Regalo',
    h1: 'Los 10 Mejores Regalos para Jóvenes (16 a 18 Años - Gaming y Estilo)',
    description: 'Tabla comparativa de los 10 mejores regalos y productos para jóvenes de 16 a 18 años: mandos oficiales de PS5, setup gamer pro, fragancias y tecnología juvenil.',
    keywords: ['los 10 mejores regalos jovenes', 'comparativa regalos 16 a 18 años', 'regalos 16 años chico', 'regalos 18 años chica', 'mandos ps5 dualsense edge', 'accesorios gaming pc', 'fragancias jovenes']
  },
  'adultos-mas-de-18-anos': {
    ageId: '+18',
    ageSlug: 'adultos-mas-de-18-anos',
    title: 'Los 10 Mejores Regalos para Adultos (+18 Años) 【Comparativa 2026】 | Un Buen Regalo',
    h1: 'Los 10 Mejores Regalos Originales para Adultos (+18 Años)',
    description: 'Ranking y comparativa de los 10 mejores regalos para adultos, hombres y mujeres: cajas Smartbox de escapadas, sets LEGO Icons, cafeteras barista, drones 4K y gadgets top.',
    keywords: ['los 10 mejores regalos para adultos', 'comparativa mejores regalos', 'los 10 mejores productos para regalar', 'regalos a partir de 18 años', 'regalos para adultos', 'cajas smartbox escapada', 'lego icons adultos', 'drones con camara 4k']
  },
  'fiesta-revelacion-genero': {
    ageId: 'reveal',
    ageSlug: 'fiesta-revelacion-genero',
    title: 'Los 10 Mejores Artículos para Fiesta Revelación de Género 【Comparativa 2026】 | Un Buen Regalo',
    h1: 'Los 10 Mejores Artículos y Regalos para Fiesta Revelación de Género y Baby Shower',
    description: 'Comparativa de los 10 mejores artículos para fiesta revelación de género: cañones de confeti y humo holi biodegradables, globos gigantes sorpresa niño o niña y decoración.',
    keywords: ['los 10 mejores regalos baby shower', 'comparativa fiesta revelacion genero', 'fiesta revelacion genero bebe', 'cañones confeti revelacion', 'globo sorpresa niño o niña']
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
