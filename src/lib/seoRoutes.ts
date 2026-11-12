import { MetadataRoute } from 'next';
import { AGE_CATEGORIES, AGE_SUBCATEGORIES_MAP } from '@/data/products';

export interface SeoRouteMeta {
  ageId: string;
  ageSlug: string;
  title: string;
  h1: string;
  description: string;
  keywords: string[];
  specificYear?: number;
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
  },
  'regalos-para-bebes-de-1-ano': {
    ageId: '1-3',
    ageSlug: 'regalos-para-bebes-de-1-ano',
    specificYear: 1,
    title: 'Regalos para Bebés y Niños de 1 Año 【2026】 Qué Regalo Hacer | Un Buen Regalo',
    h1: 'Regalo y Regalos para Hacer a un Bebé o Niño de 1 Año: Top 10 Montessori',
    description: '¿Qué regalo hacer a un bebé o niño de 1 año en su primer cumpleaños? Correpasillos de madera, cubos de actividades Montessori, bloques sensoriales y triciclos evolutivos.',
    keywords: ['regalo para hacer a bebe de 1 año', 'regalos para bebes de 1 año', 'regalos para niños de 1 año', 'que regalar a un bebe de 1 año', 'regalo primer cumpleaños', 'juguetes 1 año montessori']
  },
  'regalos-para-ninos-de-2-anos': {
    ageId: '1-3',
    ageSlug: 'regalos-para-ninos-de-2-anos',
    specificYear: 2,
    title: 'Regalos para Niños y Niñas de 2 Años 【2026】 Qué Regalo Hacer | Un Buen Regalo',
    h1: 'Regalo y Regalos para Hacer a un Niño o Niña de 2 Años: Juguetes Montessori',
    description: '¿Qué regalo hacer a un niño o niña de 2 años? Bicicletas sin pedales de equilibrio, LEGO DUPLO, cocinitas de madera, pizarras magnéticas y cuentos interactivos.',
    keywords: ['regalo para hacer a niño de 2 años', 'regalos para niños de 2 años', 'regalos para niñas de 2 años', 'que regalar a un niño de 2 años', 'juguetes niños 2 años', 'bicicleta sin pedales 2 años']
  },
  'regalos-para-ninos-de-3-anos': {
    ageId: '1-3',
    ageSlug: 'regalos-para-ninos-de-3-anos',
    specificYear: 3,
    title: 'Regalos para Niños y Niñas de 3 Años 【2026】 Qué Regalo Hacer | Un Buen Regalo',
    h1: 'Regalo y Regalos para Hacer a un Niño o Niña de 3 Años: Juegos y Primeros Pedales',
    description: '¿Qué regalo hacer a un niño o niña de 3 años? Patinetes de 3 ruedas LED, sets Playmobil y LEGO DUPLO, disfraces infantiles y juegos de memoria.',
    keywords: ['regalo para hacer a niño de 3 años', 'regalos para niños de 3 años', 'regalos para niñas de 3 años', 'que regalar a un niño de 3 años', 'juguetes 3 años', 'patinete 3 años']
  },
  'regalos-para-ninos-de-4-anos': {
    ageId: '4-6',
    ageSlug: 'regalos-para-ninos-de-4-anos',
    specificYear: 4,
    title: 'Regalos para Niños y Niñas de 4 Años 【2026】 Qué Regalo Hacer | Un Buen Regalo',
    h1: 'Regalo y Regalos para Hacer a un Niño o Niña de 4 Años: Top 10 Juguetes e Ideas',
    description: '¿Qué regalo hacer a un niño o niña de 4 años? Bloques magnéticos de construcción, primeros circuitos de carreras, maletines de arte, muñecos y juegos de mesa infantiles.',
    keywords: ['regalo para hacer a niño de 4 años', 'regalos para niños de 4 años', 'regalos para niñas de 4 años', 'que regalar a un niño de 4 años', 'juguetes 4 años', 'bloques magneticos niños']
  },
  'regalos-para-ninos-de-5-anos': {
    ageId: '4-6',
    ageSlug: 'regalos-para-ninos-de-5-anos',
    specificYear: 5,
    title: 'Regalos para Niños y Niñas de 5 Años 【2026】 Qué Regalo Hacer | Un Buen Regalo',
    h1: 'Regalo y Regalos para Hacer a un Niño o Niña de 5 Años: Juegos de Mesa y LEGO',
    description: '¿Qué regalo hacer a un niño o niña de 5 años? Sets LEGO City y Friends, patinetes plegables con luces LED, cámaras infantiles digitales y kits creativos.',
    keywords: ['regalo para hacer a niño de 5 años', 'regalos para niños de 5 años', 'regalos para niñas de 5 años', 'que regalar a un niño de 5 años', 'juguetes 5 años', 'cámara fotos infantil']
  },
  'regalos-para-ninos-de-6-anos': {
    ageId: '4-6',
    ageSlug: 'regalos-para-ninos-de-6-anos',
    specificYear: 6,
    title: 'Regalos para Niños y Niñas de 6 Años 【2026】 Qué Regalo Hacer | Un Buen Regalo',
    h1: 'Regalo y Regalos para Hacer a un Niño o Niña de 6 Años: Ciencia y Carreras',
    description: '¿Qué regalo hacer a un niño o niña de 6 años? Pistas Mario Kart Carrera FIRST, primeros experimentos científicos, walkie-talkies recargables y juegos de lógica.',
    keywords: ['regalo para hacer a niño de 6 años', 'regalos para niños de 6 años', 'regalos para niñas de 6 años', 'que regalar a un niño de 6 años', 'juguetes 6 años', 'walkie talkie niños']
  },
  'regalos-para-ninos-de-7-anos': {
    ageId: '7-9',
    ageSlug: 'regalos-para-ninos-de-7-anos',
    specificYear: 7,
    title: 'Regalos para Niños y Niñas de 7 Años 【2026】 Qué Regalo Hacer | Un Buen Regalo',
    h1: 'Regalo y Regalos para Hacer a un Niño o Niña de 7 Años: LEGO, Robótica y Deportes',
    description: '¿Qué regalo hacer a un niño o niña de 7 años? Coches teledirigidos acrobáticos, cajas de cartas Pokémon, sets LEGO Creator y magia educativa.',
    keywords: ['regalo para hacer a niño de 7 años', 'regalos para niños de 7 años', 'regalos para niñas de 7 años', 'que regalar a un niño de 7 años', 'juguetes 7 años', 'cartas pokemon regalo']
  },
  'regalos-para-ninos-de-8-anos': {
    ageId: '7-9',
    ageSlug: 'regalos-para-ninos-de-8-anos',
    specificYear: 8,
    title: 'Regalos para Niños y Niñas de 8 Años 【2026】 Qué Regalo Hacer (Comunión y Cumpleaños)',
    h1: 'Regalo y Regalos para Hacer a un Niño o Niña de 8 Años: Scalextric, STEM y Aventura',
    description: '¿Qué regalo hacer a un niño o niña de 8 años? Circuitos Scalextric Compact, kits de robótica solar, patines en línea ajustables y juegos de estrategia.',
    keywords: ['regalo para hacer a niño de 8 años', 'regalos para niños de 8 años', 'regalos para niñas de 8 años', 'que regalar a un niño de 8 años', 'juguetes 8 años', 'regalos comunion 8 años']
  },
  'regalos-para-ninos-de-9-anos': {
    ageId: '7-9',
    ageSlug: 'regalos-para-ninos-de-9-anos',
    specificYear: 9,
    title: 'Regalos para Niños y Niñas de 9 Años 【2026】 Qué Regalo Hacer | Un Buen Regalo',
    h1: 'Regalo y Regalos para Hacer a un Niño o Niña de 9 Años: Tecnología y Comunión',
    description: '¿Qué regalo hacer a un niño o niña de 9 años? Relojes inteligentes infantiles, sets LEGO Ninjago y Harry Potter, telescopios astronómicos y juegos de mesa.',
    keywords: ['regalo para hacer a niño de 9 años', 'regalos para niños de 9 años', 'regalos para niñas de 9 años', 'que regalar a un niño de 9 años', 'regalos primera comunion 9 años', 'juguetes 9 años']
  },
  'regalos-para-ninos-de-10-anos': {
    ageId: '10-12',
    ageSlug: 'regalos-para-ninos-de-10-anos',
    specificYear: 10,
    title: 'Regalos para Niños y Niñas de 10 Años 【2026】 Qué Regalo Hacer | Un Buen Regalo',
    h1: 'Regalo y Regalos para Hacer a un Niño o Niña de 10 Años: Drones y Escape Rooms',
    description: '¿Qué regalo hacer a un niño o niña de 10 años? Minidrones con cámara HD, juegos de mesa competitivos como Virus! y Dixit, cámaras instantáneas y kits de lettering.',
    keywords: ['regalo para hacer a niño de 10 años', 'regalos para niños de 10 años', 'regalos para niñas de 10 años', 'que regalar a un niño de 10 años', 'juguetes 10 años', 'drones para niños 10 años']
  },
  'regalos-para-ninos-de-11-anos': {
    ageId: '10-12',
    ageSlug: 'regalos-para-ninos-de-11-anos',
    specificYear: 11,
    title: 'Regalos para Niños y Niñas de 11 Años 【2026】 Qué Regalo Hacer | Un Buen Regalo',
    h1: 'Regalo y Regalos para Hacer a un Niño o Niña de 11 Años: Gaming, Anime y Ciencia',
    description: '¿Qué regalo hacer a chicos y chicas de 11 años? Figuras coleccionables de anime, sets LEGO Technic, auriculares inalámbricos, juegos de rol y patinetes.',
    keywords: ['regalo para hacer a niño de 11 años', 'regalos para niños de 11 años', 'regalos para niñas de 11 años', 'que regalar a un niño de 11 años', 'regalos preadolescentes 11 años']
  },
  'regalos-para-ninos-de-12-anos': {
    ageId: '10-12',
    ageSlug: 'regalos-para-ninos-de-12-anos',
    specificYear: 12,
    title: 'Regalos para Niños y Niñas de 12 Años 【2026】 Qué Regalo Hacer | Un Buen Regalo',
    h1: 'Regalo y Regalos para Hacer a Chicos y Chicas de 12 Años: Tecnología y Deportes',
    description: '¿Qué regalo hacer a los 12 años? Altavoces Bluetooth impermeables, luces LED RGB para habitación, juegos de mesa estratégicos, mochilas urbanas y mangas.',
    keywords: ['regalo para hacer a niño de 12 años', 'regalos para niños de 12 años', 'regalos para niñas de 12 años', 'que regalar a un niño de 12 años', 'regalos 12 años chico chica']
  },
  'regalos-para-ninos-de-13-anos': {
    ageId: '13-15',
    ageSlug: 'regalos-para-ninos-de-13-anos',
    specificYear: 13,
    title: 'Regalos para Niños y Adolescentes de 13 Años 【2026】 Qué Regalo Hacer',
    h1: 'Regalo y Regalos para Hacer a Chicos y Chicas de 13 Años: Tendencias 2026',
    description: '¿Qué regalo hacer a un chico o chica de 13 años? Cámaras Fujifilm Instax Mini, auriculares gaming y música JBL, juegos de mesa Catan, papelería creativa y lámparas 3D anime.',
    keywords: ['regalo para hacer a niño de 13 años', 'regalos para niños de 13 años', 'regalos para niñas de 13 años', 'que regalar a un niño de 13 años', 'regalos adolescentes 13 años', 'gifts for 13 year old kids']
  },
  'regalos-para-ninos-de-14-anos': {
    ageId: '13-15',
    ageSlug: 'regalos-para-ninos-de-14-anos',
    specificYear: 14,
    title: 'Regalos para Adolescentes de 14 Años 【2026】 Qué Regalo Hacer | Un Buen Regalo',
    h1: 'Regalo y Regalos para Hacer a Adolescentes de 14 Años: Gaming y Estilo Juvenil',
    description: '¿Qué regalo hacer a un adolescente de 14 años? Periféricos gaming RGB, sets de skincare juvenil, figuras One Piece y Dragon Ball, sudaderas y gadgets tech.',
    keywords: ['regalo para hacer a adolescente de 14 años', 'regalos para niños de 14 años', 'regalos para niñas de 14 años', 'regalos adolescentes 14 años', 'que regalar a los 14 años']
  },
  'regalos-para-ninos-de-15-anos': {
    ageId: '13-15',
    ageSlug: 'regalos-para-ninos-de-15-anos',
    specificYear: 15,
    title: 'Regalos para Adolescentes de 15 Años 【2026】 Qué Regalo Hacer | Un Buen Regalo',
    h1: 'Regalo y Regalos para Hacer a Chicos y Chicas de 15 Años: Música, Foto y Gaming',
    description: '¿Qué regalo hacer para cumplir 15 años? Proyectores portátiles para cine en casa, tocadiscos vintage Bluetooth, auriculares con cancelación de ruido y moda.',
    keywords: ['regalo para hacer a adolescente de 15 años', 'regalos para niños de 15 años', 'regalos para niñas de 15 años', 'regalos 15 años chica', 'regalos 15 años chico', 'que regalar a un adolescente de 15 años']
  },
  'regalos-para-jovenes-de-16-anos': {
    ageId: '16-18',
    ageSlug: 'regalos-para-jovenes-de-16-anos',
    specificYear: 16,
    title: 'Regalos para Jóvenes de 16 Años 【2026】 Qué Regalo Hacer | Un Buen Regalo',
    h1: 'Regalo y Regalos para Hacer a Jóvenes de 16 Años: Videojuegos, Audio y Estilo',
    description: '¿Qué regalo hacer a un joven de 16 años? Mandos PS5 DualSense, teclados mecánicos custom, zapatillas y complementos de tendencia, perfumes juveniles y smartwatches.',
    keywords: ['regalo para hacer a joven de 16 años', 'regalos para jovenes de 16 años', 'regalos 16 años chico', 'regalos 16 años chica', 'que regalar a los 16 años']
  },
  'regalos-para-jovenes-de-17-anos': {
    ageId: '16-18',
    ageSlug: 'regalos-para-jovenes-de-17-anos',
    specificYear: 17,
    title: 'Regalos para Jóvenes de 17 Años 【2026】 Qué Regalo Hacer | Un Buen Regalo',
    h1: 'Regalo y Regalos para Hacer a Jóvenes de 17 Años: Tecnología y Experiencias',
    description: '¿Qué regalo hacer a chicos y chicas de 17 años? Monitores gaming de alta tasa de refresco, cámaras de acción 4K, mochilas antirrobo para portátil y fragancias.',
    keywords: ['regalo para hacer a joven de 17 años', 'regalos para jovenes de 17 años', 'regalos 17 años chico', 'regalos 17 años chica', 'que regalar a los 17 años']
  },
  'regalos-para-jovenes-de-18-anos': {
    ageId: '16-18',
    ageSlug: 'regalos-para-jovenes-de-18-anos',
    specificYear: 18,
    title: 'Regalos para Cumplir 18 Años 【2026】 Qué Regalo Hacer | Un Buen Regalo',
    h1: 'Regalo y Regalos para Hacer a Jóvenes de 18 Años: Mayoría de Edad Inolvidable',
    description: '¿Qué regalo hacer por los 18 años? Relojes automáticos y cronógrafos, cajas de experiencias y viajes, auriculares inalámbricos premium, cafeteras express y equipamiento tech.',
    keywords: ['regalo para hacer a joven de 18 años', 'regalos para jovenes de 18 años', 'regalos 18 años hombre', 'regalos 18 años mujer', 'regalo mayoria de edad 18 años']
  }
};

export const PRIMARY_SEO_AGE_ROUTES: SeoRouteMeta[] = Object.values(SEO_AGE_ROUTES).filter(
  (r) => !r.specificYear
);

export const SPECIFIC_YEAR_AGE_ROUTES: SeoRouteMeta[] = Object.values(SEO_AGE_ROUTES).filter(
  (r) => Boolean(r.specificYear)
);

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
