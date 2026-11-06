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
    title: 'Un Buen Regalo para un Bebé y Recién Nacido (0-12m) | Ideas de Regalos 2026',
    h1: 'Un Buen Regalo para Bebés y Recién Nacidos: Ideas Originales (0 a 12 Meses)',
    description: '¿Qué regalar a un recién nacido? Comparativa con un buen regalo para bebés: tartas de pañales, cunas colecho, cochecitos ligeros y juguetes sensoriales recomendados.',
    keywords: ['un buen regalo para un bebe', 'regalo bebe recien nacido', 'los 10 mejores regalos para bebes', 'comparativa regalos bebes recien nacidos', 'mejores productos para bebes', 'regalo bebe 1 año', 'tartas de pañales', 'cochecitos de bebe ligeros']
  },
  'ninos-1-a-3-anos': {
    ageId: '1-3',
    ageSlug: 'ninos-1-a-3-anos',
    title: 'Un Buen Regalo para un Niño de 1 a 3 Años: Juguetes Montessori e Ideas 2026',
    h1: 'Un Buen Regalo para Primeros Pasos: Juguetes Montessori (1 a 3 Años)',
    description: '¿Qué regalar a un niño de 1, 2 o 3 años? Ideas de regalo y juguetes Montessori de madera, torres de aprendizaje, LEGO DUPLO y triciclos evolutivos.',
    keywords: ['un buen regalo para un niño de 1 a 3 años', 'regalo niño 1 año', 'regalo niño 2 años', 'regalo niño 3 años', 'los 10 mejores regalos niños 1 a 3 años', 'juguetes montessori madera', 'lego duplo']
  },
  'ninos-4-a-6-anos': {
    ageId: '4-6',
    ageSlug: 'ninos-4-a-6-anos',
    title: 'Un Buen Regalo para un Niño de 4 a 6 Años: Juegos Creativos e Ideas 2026',
    h1: 'Un Buen Regalo para Niños y Niñas de 4 a 6 Años: Juegos y Creatividad',
    description: '¿Buscas un buen regalo para niños y niñas de 4 a 6 años? Circuitos Mario Kart Carrera, patinetes con ruedas LED, juegos de mesa y maletines creativos.',
    keywords: ['un buen regalo para un niño de 4 a 6 años', 'regalo niña 4 años', 'regalo niño 5 años', 'regalo niño 6 años', 'los 10 mejores regalos niños 4 a 6 años', 'circuitos coches infantiles', 'patinete niño ruedas led']
  },
  'ninos-7-a-9-anos': {
    ageId: '7-9',
    ageSlug: 'ninos-7-a-9-anos',
    title: 'Un Buen Regalo para un Niño de 7 a 9 Años: Scalextric, LEGO e Ideas 2026',
    h1: 'Un Buen Regalo para Niños de 7 a 9 Años: Scalextric, LEGO y STEM',
    description: 'Ideas y el mejor regalo para niños de 7 a 9 años: pistas Scalextric Compact, coches teledirigidos 4x4, sets LEGO Creator 3 en 1 y magia Borrás.',
    keywords: ['un buen regalo para un niño de 7 a 9 años', 'regalo niño 7 años', 'regalo niño 8 años', 'regalo niño 9 años', 'los 10 mejores regalos niños 7 a 9 años', 'scalextric compact pista', 'lego creator 3 en 1']
  },
  'ninos-10-a-12-anos': {
    ageId: '10-12',
    ageSlug: 'ninos-10-a-12-anos',
    title: 'Un Buen Regalo para Niños y Niñas de 10 a 12 Años | Ideas de Regalos 2026',
    h1: 'Un Buen Regalo para Preadolescentes (10 a 12 Años): Chicos y Chicas',
    description: '¿Qué regalar a un chico o chica de 10 a 12 años? Juegos de cartas competitivos como Virus!, minidrones con cámara, escape rooms en casa y LEGO.',
    keywords: ['un buen regalo para niños de 10 a 12 años', 'regalo niña 10 años', 'regalo niño 11 años', 'regalo niño 12 años', 'los 10 mejores regalos niños 10 a 12 años', 'juego virus cartas', 'minidrones infantiles con camara']
  },
  'jovenes-13-a-15-anos': {
    ageId: '13-15',
    ageSlug: 'jovenes-13-a-15-anos',
    title: 'Un Buen Regalo para Niñas y Adolescentes (13-15 Años) | Ideas de Regalos 2026',
    h1: 'Un Buen Regalo para Adolescentes: Niñas y Chicos de 13 a 15 Años',
    description: '¿Qué regalar a una niña o adolescente de 13 a 15 años? Cámaras instantáneas Instax Mini, auriculares inalámbricos, juegos de mesa Catan, skincare juvenil y moda teen.',
    keywords: ['un buen regalo para una niña de 13 a 15 años', 'regalo para niña de 13 años', 'regalo para niña de 14 años', 'regalo para niña de 15 años', 'regalos para niñas de 13 a 15 años', 'regalos adolescentes 13 a 15 años', 'auriculares inalambricos jbl', 'catan juego de mesa', 'instax mini 12']
  },
  'jovenes-16-a-18-anos': {
    ageId: '16-18',
    ageSlug: 'jovenes-16-a-18-anos',
    title: 'Un Buen Regalo para un Joven de 16 a 18 Años: Gaming, PS5 e Ideas de Regalos 2026',
    h1: 'Un Buen Regalo para Jóvenes (16 a 18 Años - Gaming, Estilo y Tech)',
    description: '¿Qué regalar a un joven de 16 a 18 años? Mandos y juegos PS5, periféricos gaming de precisión, fragancias unisex icónicas y diarios de cuero artesanal.',
    keywords: ['un buen regalo para un joven de 16 a 18 años', 'regalo 16 años chico', 'regalo 18 años chica', 'los 10 mejores regalos jovenes', 'mandos ps5 dualsense edge', 'accesorios gaming pc', 'fragancias jovenes']
  },
  'adultos-mas-de-18-anos': {
    ageId: '+18',
    ageSlug: 'adultos-mas-de-18-anos',
    title: 'Un Buen Regalo para Adultos (+18 Años) | Experiencias e Ideas de Regalos 2026',
    h1: 'Un Buen Regalo para Adultos: Ideas Originales (+18 Años)',
    description: 'Ranking y comparativa con un buen regalo para adultos, hombres y mujeres: cajas Smartbox de escapadas, maquetas LEGO Icons, cafeteras barista y drones 4K.',
    keywords: ['un buen regalo para adultos', 'regalo para hombre adulto', 'regalo para mujer adulta', 'los 10 mejores regalos para adultos', 'cajas smartbox escapada', 'lego icons adultos', 'drones con camara 4k']
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
