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
    title: 'Mejores Regalos para Bebés y Recién Nacidos (0 a 12 Meses) | Un Buen Regalo 2026',
    h1: 'Ideas de Regalo para Bebés y Recién Nacidos (0 a 12 Meses)',
    description: 'Descubre los regalos más útiles y celebrados para bebés de 0 a 1 año: tartas de pañales, cochecitos ligeros, cunas colecho, juguetes sensoriales y sets de fiesta revelación de género. Garantía oficial Amazon España.',
    keywords: ['regalos bebes recien nacidos', 'regalo bebe 1 año', 'tartas de pañales', 'cochecitos de bebe ligeros', 'cuna colecho recomendada']
  },
  'ninos-1-a-3-anos': {
    ageId: '1-3',
    ageSlug: 'ninos-1-a-3-anos',
    title: 'Mejores Regalos para Niños y Niñas de 1 a 3 Años | Un Buen Regalo 2026',
    h1: 'Ideas de Regalo para Primeros Pasos (1 a 3 Años)',
    description: 'Guía de compra de juguetes Montessori, torres de aprendizaje de madera, LEGO DUPLO, triciclos evolutivos y juegos de motricidad para niños de 1, 2 y 3 años recomendados por pediatras.',
    keywords: ['regalos niños 1 año', 'regalos niños 2 años', 'regalos niños 3 años', 'juguetes montessori madera', 'lego duplo']
  },
  'ninos-4-a-6-anos': {
    ageId: '4-6',
    ageSlug: 'ninos-4-a-6-anos',
    title: 'Mejores Regalos para Niños de 4 a 6 Años | Un Buen Regalo 2026',
    h1: 'Ideas de Regalo para Infantil y Creatividad (4 a 6 Años)',
    description: 'Circuitos de coches de Mario Kart, patinetes con ruedas LED, primeros juegos de mesa familiares, peluches interactivos y maletas correpasillos para peques de 4 a 6 años.',
    keywords: ['regalos niños 4 años', 'regalos niños 5 años', 'regalos niños 6 años', 'circuitos coches infantiles', 'patinete niño ruedas led']
  },
  'ninos-7-a-9-anos': {
    ageId: '7-9',
    ageSlug: 'ninos-7-a-9-anos',
    title: 'Mejores Regalos para Niños de 7 a 9 Años | Scalextric, LEGO y STEM 2026',
    h1: 'Ideas de Regalo para Primaria y Acción (7 a 9 Años)',
    description: 'Selección contrastada de circuitos Scalextric Compact, coches teledirigidos 4x4, sets LEGO Creator, magia Borrás y circuitos de canicas magnéticos GraviTrax.',
    keywords: ['regalos niños 7 años', 'regalos niños 8 años', 'regalos niños 9 años', 'scalextric compact pista', 'lego creator 3 en 1', 'juegos de magia borras']
  },
  'ninos-10-a-12-anos': {
    ageId: '10-12',
    ageSlug: 'ninos-10-a-12-anos',
    title: 'Mejores Regalos para Preadolescentes de 10 a 12 Años | Un Buen Regalo 2026',
    h1: 'Ideas de Regalo para Preadolescentes (10 a 12 Años)',
    description: 'Juegos de cartas competitivos como Virus!, minidrones resistentes a golpes, juegos de mesa de estrategia, escape rooms domésticos y robótica para chicas y chicos de 10 a 12 años.',
    keywords: ['regalos niños 10 años', 'regalos niños 11 años', 'regalos niños 12 años', 'juego virus cartas', 'minidrones infantiles con camara']
  },
  'jovenes-13-a-15-anos': {
    ageId: '13-15',
    ageSlug: 'jovenes-13-a-15-anos',
    title: 'Mejores Regalos para Adolescentes de 13 a 15 Años | Un Buen Regalo 2026',
    h1: 'Ideas de Regalo para Adolescentes (13 a 15 Años)',
    description: 'Auriculares inalámbricos con cancelación de ruido, cámaras instantáneas tipo Instax, juego Catan oficial, mochilas urbanas antirrobo y cuidado facial teen.',
    keywords: ['regalos adolescentes 13 años', 'regalos adolescentes 14 años', 'regalos adolescentes 15 años', 'auriculares inalambricos jbl', 'catan juego de mesa']
  },
  'jovenes-16-a-18-anos': {
    ageId: '16-18',
    ageSlug: 'jovenes-16-a-18-anos',
    title: 'Mejores Regalos para Jóvenes de 16 a 18 Años | Gaming, PS5 y Estilo 2026',
    h1: 'Ideas de Regalo para Jóvenes (16 a 18 Años - Gaming y Estilo)',
    description: 'Lo último en mandos y accesorios de PS5, setup gamer, gafas de realidad virtual, fragancias unisex, libretas de cuero artesanal y periféricos de alto rendimiento.',
    keywords: ['regalos 16 años chico', 'regalos 18 años chica', 'mandos ps5 dualsense edge', 'accesorios gaming pc', 'fragancias jovenes']
  },
  'adultos-mas-de-18-anos': {
    ageId: '+18',
    ageSlug: 'adultos-mas-de-18-anos',
    title: 'Mejores Regalos a Partir de 18 Años (Adultos) | Smartbox, LEGO Icons y Smartphones 2026',
    h1: 'Ideas de Regalo Originales a Partir de 18 Años (Adultos)',
    description: 'Selección de regalos a partir de 18 años y adultos: cajas regalo Smartbox de escapadas y cenas gourmet, smartphones buque insignia, sets LEGO Icons Botánicos, maquetas y robótica avanzada, drones con cámara 4K y juegos de mesa estratégicos con garantía oficial Amazon España.',
    keywords: ['regalos a partir de 18 años', 'regalos para adultos', 'regalos originales mayores 18 años', 'cajas smartbox escapada', 'lego icons adultos', 'smartphones buques insignia', 'drones con camara 4k', 'juegos de mesa expertos adultos']
  },
  'fiesta-revelacion-genero': {
    ageId: 'reveal',
    ageSlug: 'fiesta-revelacion-genero',
    title: 'Mejores Productos para Fiesta Revelación de Género y Baby Shower 2026',
    h1: 'Ideas y Artículos para Fiesta Revelación de Género y Enigma',
    description: 'Cañones de confeti y humo holi biodegradables, globos gigantes enigma sorpresa niño o niña, decoración y photocall para organizar la mejor fiesta de revelación de bebé.',
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
