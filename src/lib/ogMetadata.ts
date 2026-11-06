import { Metadata } from 'next';

export interface SocialHubSnippet {
  title: string;
  socialTitle: string;
  description: string;
  imageUrl: string;
  imageAlt: string;
}

// Map of curated, high-CTR Open Graph visuals (1200x630, 1.91:1 aspect ratio)
export const HUB_OG_SNIPPETS: Record<string, SocialHubSnippet> = {
  // Hubs Especiales por Pasión
  motoristas: {
    title: 'Un Buen Regalo para un Motero 【2026】 Cascos, Gadgets e Ideas de Regalos',
    socialTitle: '🏍️ Un Buen Regalo para un Motero: Cascos, Chaquetas y Gadgets | Un Buen Regalo',
    description: '¿Buscas un buen regalo para un motorista o motero? Descubre las mejores ideas de regalo y accesorios: cascos homologados, guantes térmicos, intercomunicadores Cardo y antirrobos.',
    imageUrl: 'https://images.unsplash.com/photo-1558981806-ec527fa84c39?auto=format&fit=crop&w=1200&h=630&q=85',
    imageAlt: 'Motorista equipado en ruta panorámica con casco y chaqueta de protección',
  },
  gaming: {
    title: 'Un Buen Regalo para un Gamer 【2026】 Ideas Baratas (<30€), Setup y PC | Un Buen Regalo',
    socialTitle: '🎮 Un Buen Regalo para un Gamer: Auriculares, Ratones y Setup Barato 2026',
    description: '¿Buscas un buen regalo para un gamer barato o ideas originales para PC y PS5? Auriculares HyperX con sonido 7.1, ratones Logitech, iluminación y chollos por menos de 30 €.',
    imageUrl: 'https://images.unsplash.com/photo-1542751371-adc38448a05e?auto=format&fit=crop&w=1200&h=630&q=85',
    imageAlt: 'Setup gaming profesional con teclado mecánico, ratón RGB e iluminación envolvente',
  },
  ciclismo: {
    title: 'Un Buen Regalo para un Ciclista 【2026】 Ideas de Regalos MTB y Carretera',
    socialTitle: '🚴 Un Buen Regalo para un Ciclista: Accesorios de Carretera y MTB | Un Buen Regalo',
    description: '¿Qué regalar a un ciclista? Descubre un buen regalo para amantes de la bicicleta de carretera y montaña: radar Garmin Varia RTL515, ciclocomputadores GPS, herramientas y luces.',
    imageUrl: 'https://images.unsplash.com/photo-1544197150-b99a580bb7a8?auto=format&fit=crop&w=1200&h=630&q=85',
    imageAlt: 'Ciclista en carretera de montaña con equipamiento deportivo y bicicleta moderna',
  },
  automovil: {
    title: 'Un Buen Regalo para Amantes de los Coches 【2026】 Gadgets e Ideas de Regalo',
    socialTitle: '🚗 Un Buen Regalo para Amantes de los Coches y Detailing | Un Buen Regalo',
    description: '¿Qué regalar a alguien que le gustan los coches? Arrancadores NOCO, cámaras dashcam 4K, compresores Xiaomi y kits de detailing para acertar con un buen regalo.',
    imageUrl: 'https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?auto=format&fit=crop&w=1200&h=630&q=85',
    imageAlt: 'Coche deportivo iluminado con detalles de alta gama en carretera',
  },
  mascotas: {
    title: 'Un Buen Regalo para Dueños de Perros y Gatos 【2026】 Ideas de Regalos',
    socialTitle: '🐾 Un Buen Regalo para Amantes de los Perros y Gatos | Un Buen Regalo',
    description: '¿Buscas un buen regalo para un dueño de perro o gato? Localizadores GPS Tractive, fuentes Catit inteligentes, arneses Julius-K9 y juguetes interactivos.',
    imageUrl: 'https://images.unsplash.com/photo-1450778869180-41d0601e046e?auto=format&fit=crop&w=1200&h=630&q=85',
    imageAlt: 'Perro y gato felices con accesorios de cuidado y bienestar animal',
  },
  'amantes-del-cafe': {
    title: 'Un Buen Regalo para un Amante del Café 【2026】 Cafeteras e Ideas Barista',
    socialTitle: '☕ Un Buen Regalo para un Amante del Café: Guía Barista y Gourmet',
    description: '¿Qué regalar a un cafetero? Cafeteras italianas Bialetti, molinillos cónicos Timemore C3, espumadores y tazas térmicas Stanley para acertar con un buen regalo barista.',
    imageUrl: 'https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?auto=format&fit=crop&w=1200&h=630&q=85',
    imageAlt: 'Taza de café espresso barista con arte latte y granos de café de especialidad',
  },
  'regalos-gta-6': {
    title: 'Un Buen Regalo GTA VI y Regalos GTA 6 【2026】 Merchandising Grand Theft Auto',
    socialTitle: '🌴 Un Buen Regalo GTA VI y GTA 6: Merch Oficial y Accesorios',
    description: '¿Buscas un buen regalo de GTA VI o GTA 6? Descubre pósters enmarcados, mandos PS5 Nova Pink, luces neón Vice City y tarjetas de reserva en Amazon España.',
    imageUrl: 'https://images.unsplash.com/photo-1509198397868-475647b2a1e5?auto=format&fit=crop&w=1200&h=630&q=85',
    imageAlt: 'Setup gamer con luces de neón rosa y azul estilo retro Vice City de GTA 6',
  },
  navidad: {
    title: 'Un Buen Regalo de Navidad y Reyes 2026: Ideas de Regalos y Decoración',
    socialTitle: '🎄 Un Buen Regalo de Navidad y Reyes Magos: Trenes y Regalos 2026',
    description: '¿No sabes qué regalar estas Navidades? Guía oficial con un buen regalo para Navidad y Reyes Magos: trenes para el árbol, decoración navideña, calendarios de adviento y amigo invisible.',
    imageUrl: 'https://images.unsplash.com/photo-1543258103-a62bdc069871?auto=format&fit=crop&w=1200&h=630&q=85',
    imageAlt: 'Árbol de Navidad decorado con luces cálidas y tren clásico navideño rodeando la base',
  },

  // Hubs por Rango de Edad
  'bebes-0-a-12-meses': {
    title: 'Un Buen Regalo para un Bebé y Recién Nacido (0-12m) | Ideas de Regalos 2026',
    socialTitle: '🧸 Un Buen Regalo para un Bebé y Recién Nacido (0 a 12 Meses)',
    description: '¿Qué regalar a un recién nacido? Tartas de pañales Dodot, cunas colecho Chicco, cochecitos ultraligeros, canastillas de baño y juguetes sensoriales para acertar con un buen regalo.',
    imageUrl: 'https://images.unsplash.com/photo-1519689680058-324335c77eba?auto=format&fit=crop&w=1200&h=630&q=85',
    imageAlt: 'Bebé durmiendo plácidamente con osito de peluche y mantita suave',
  },
  'ninos-1-a-3-anos': {
    title: 'Un Buen Regalo para un Niño de 1 a 3 Años: Juguetes Montessori e Ideas 2026',
    socialTitle: '🧩 Un Buen Regalo para Niños de 1 a 3 Años: Juguetes Montessori',
    description: '¿Qué regalar a un niño de 1, 2 o 3 años? Torres de aprendizaje de madera, triciclos evolutivos, sets LEGO DUPLO y cuentos interactivos recomendados por pedagogos.',
    imageUrl: 'https://images.unsplash.com/photo-1515488042361-ee00e0ddd4e4?auto=format&fit=crop&w=1200&h=630&q=85',
    imageAlt: 'Juguetes educativos de madera Montessori y bloques de construcción infantiles',
  },
  'ninos-4-a-6-anos': {
    title: 'Un Buen Regalo para un Niño de 4 a 6 Años: Juegos Creativos e Ideas 2026',
    socialTitle: '🎨 Un Buen Regalo para Niños y Niñas de 4 a 6 Años: Juegos y Creatividad',
    description: '¿Buscas un buen regalo para un niño o niña de 4 a 6 años? Circuitos Mario Kart Carrera First, patinetes con ruedas LED que brillan, disfraces infantiles y maletines creativos.',
    imageUrl: 'https://images.unsplash.com/photo-1596461404969-9ae70f2830c1?auto=format&fit=crop&w=1200&h=630&q=85',
    imageAlt: 'Niños jugando con pinturas de colores, plastilina y juguetes creativos',
  },
  'ninos-7-a-9-anos': {
    title: 'Un Buen Regalo para un Niño de 7 a 9 Años: Scalextric, LEGO e Ideas 2026',
    socialTitle: '⚡ Un Buen Regalo para Niños de 7 a 9 Años: Scalextric y LEGO Creator',
    description: 'Pistas de carreras Scalextric Compact, coches teledirigidos todoterreno 4x4, cajas de Magia Borrás y sets LEGO Creator para acertar con un buen regalo.',
    imageUrl: 'https://images.unsplash.com/photo-1585366119957-e9730b6d0f60?auto=format&fit=crop&w=1200&h=630&q=85',
    imageAlt: 'Construcción creativa de bloques de juguete y circuitos de carreras',
  },
  'ninos-10-a-12-anos': {
    title: 'Un Buen Regalo para Niños y Niñas de 10 a 12 Años | Ideas de Regalos 2026',
    socialTitle: '🚀 Un Buen Regalo para Chicos y Chicas de 10 a 12 Años (Preadolescentes)',
    description: 'Juegos de cartas superventas como Virus!, minidrones con cámara, escape rooms en casa, novelas juveniles y robótica educativa para preadolescentes.',
    imageUrl: 'https://images.unsplash.com/photo-1508614589041-895b88991e3e?auto=format&fit=crop&w=1200&h=630&q=85',
    imageAlt: 'Dron infantil sobrevolando y tecnología educativa para preadolescentes',
  },
  'jovenes-13-a-15-anos': {
    title: 'Un Buen Regalo para Niñas y Adolescentes de 13 a 15 Años | Ideas 2026',
    socialTitle: '🎧 Un Buen Regalo para Chicas y Chicos Adolescentes (13 a 15 Años)',
    description: '¿Qué regalar a una niña o adolescente de 13 a 15 años? Cámaras instantáneas Instax Mini, auriculares con cancelación de ruido, Catan, skincare juvenil y estilo teen.',
    imageUrl: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=1200&h=630&q=85',
    imageAlt: 'Auriculares inalámbricos modernos y accesorios urbanos para jóvenes',
  },
  'jovenes-16-a-18-anos': {
    title: 'Un Buen Regalo para un Joven de 16 a 18 Años: Gaming, PS5 e Ideas 2026',
    socialTitle: '🎮 Un Buen Regalo para Jóvenes de 16 a 18 Años (Gaming, Tech y Estilo)',
    description: 'Accesorios PlayStation 5, periféricos gaming de precisión, fragancias unisex icónicas, diarios de cuero artesanal y moda urbana juvenil.',
    imageUrl: 'https://images.unsplash.com/photo-1607604276583-eef5d076aa5f?auto=format&fit=crop&w=1200&h=630&q=85',
    imageAlt: 'Mando de consola inalámbrico de última generación con luces y estética moderna',
  },
  'adultos-mas-de-18-anos': {
    title: 'Un Buen Regalo para Adultos (+18 Años) | Experiencias e Ideas de Regalos 2026',
    socialTitle: '✨ Un Buen Regalo para Adultos: Cajas Smartbox, Drones y Tecnología',
    description: 'Escapadas con spa y cenas gourmet en cajas Smartbox, smartphones buque insignia, maquetas botánicas LEGO Icons y drones con cámara 4K.',
    imageUrl: 'https://images.unsplash.com/photo-1513519245088-0e12902e5a38?auto=format&fit=crop&w=1200&h=630&q=85',
    imageAlt: 'Caja de regalo prémium con lazo elegante sobre fondo sofisticado',
  },
  'fiesta-revelacion-genero': {
    title: 'Un Buen Regalo y Fiesta Revelación de Género y Baby Shower 2026',
    socialTitle: '🎉 Todo para la Fiesta Revelación de Género: Humo Holi, Globos y Confeti',
    description: 'Cañones de confeti y humo holi biodegradables, globos enigma gigantes de 90 cm y decoración para una sorpresa inolvidable niño o niña.',
    imageUrl: 'https://images.unsplash.com/photo-1530103862676-de8c9debad1d?auto=format&fit=crop&w=1200&h=630&q=85',
    imageAlt: 'Globos de fiesta de colores y confeti para revelación de género de bebé',
  },
};

// Fallback high-impact image for category hubs
const CATEGORY_IMAGE_KEYWORDS: Array<{ match: RegExp; url: string; alt: string }> = [
  { match: /lego/i, url: 'https://images.unsplash.com/photo-1585366119957-e9730b6d0f60?auto=format&fit=crop&w=1200&h=630&q=85', alt: 'Construcción con bloques de LEGO' },
  { match: /coche|scalextric|carrera/i, url: 'https://images.unsplash.com/photo-1568605117036-5fe5e7bab0b7?auto=format&fit=crop&w=1200&h=630&q=85', alt: 'Circuitos de coches y pistas de carreras' },
  { match: /libro|cuento|comic/i, url: 'https://images.unsplash.com/photo-1512820790803-83ca734da794?auto=format&fit=crop&w=1200&h=630&q=85', alt: 'Libros y cuentos recomendados' },
  { match: /perfum|colonia|fraganc/i, url: 'https://images.unsplash.com/photo-1541643600914-78b084683601?auto=format&fit=crop&w=1200&h=630&q=85', alt: 'Perfumes y fragancias originales' },
  { match: /smartphone|telef/i, url: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?auto=format&fit=crop&w=1200&h=630&q=85', alt: 'Smartphones y tecnología móvil' },
  { match: /juego|mesa|cartas/i, url: 'https://images.unsplash.com/photo-1610890716171-6b1bb98ffd09?auto=format&fit=crop&w=1200&h=630&q=85', alt: 'Juegos de mesa y cartas familiares' },
  { match: /ropa|moda|disfraz|calzado/i, url: 'https://images.unsplash.com/photo-1523381210434-271e8be1f52b?auto=format&fit=crop&w=1200&h=630&q=85', alt: 'Ropa, moda y accesorios seleccionados' },
  { match: /bici|patin/i, url: 'https://images.unsplash.com/photo-1544197150-b99a580bb7a8?auto=format&fit=crop&w=1200&h=630&q=85', alt: 'Bicis y patinetes infantiles' },
  { match: /dron|robot/i, url: 'https://images.unsplash.com/photo-1508614589041-895b88991e3e?auto=format&fit=crop&w=1200&h=630&q=85', alt: 'Drones y robótica educativa' },
];

export function getCategoryOgImage(subcategoryName: string): { url: string; alt: string } {
  for (const item of CATEGORY_IMAGE_KEYWORDS) {
    if (item.match.test(subcategoryName)) {
      return { url: item.url, alt: item.alt };
    }
  }
  return {
    url: 'https://www.unbuenregalo.es/og-cover.png',
    alt: `Ideas de regalo seleccionadas en ${subcategoryName}`,
  };
}

export function buildSocialMetadata({
  title,
  socialTitle,
  description,
  canonicalUrl,
  imageUrl,
  imageAlt,
  keywords,
}: {
  title: string;
  socialTitle?: string;
  description: string;
  canonicalUrl: string;
  imageUrl: string;
  imageAlt: string;
  keywords?: string[];
}): Metadata {
  const displayTitle = socialTitle || title;

  return {
    title,
    description,
    keywords,
    alternates: {
      canonical: canonicalUrl,
    },
    other: {
      thumbnail: 'https://www.unbuenregalo.es/logo-square.png',
    },
    openGraph: {
      title: displayTitle,
      description,
      url: canonicalUrl,
      type: 'website',
      siteName: 'Un Buen Regalo',
      locale: 'es_ES',
      images: [
        {
          url: imageUrl,
          width: 1200,
          height: 630,
          alt: imageAlt,
        },
        {
          url: 'https://www.unbuenregalo.es/logo-square.png',
          width: 1024,
          height: 1024,
          alt: 'Un Buen Regalo (unbuenregalo.es)',
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: displayTitle,
      description,
      images: [imageUrl],
    },
  };
}
