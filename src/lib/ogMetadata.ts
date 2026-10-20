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
    title: 'Mejores Regalos para Motoristas (2026) | Cascos, Chaquetas y Gadgets',
    socialTitle: '🏍️ Top Regalos para Motoristas: Cascos, Chaquetas y Gadgets Moteros',
    description: 'Guía definitiva para acertar con un motero: cascos modulares homologados, guantes térmicos, intercomunicadores Cardo y candados antirrobo con alarma en Amazon España.',
    imageUrl: 'https://images.unsplash.com/photo-1558981806-ec527fa84c39?auto=format&fit=crop&w=1200&h=630&q=85',
    imageAlt: 'Motorista equipado en ruta panorámica con casco y chaqueta de protección',
  },
  gaming: {
    title: 'Mejores Regalos para Gamers (2026) | Setup, Periféricos y PS5',
    socialTitle: '🎮 El Regalo Gamer Perfecto: Mandos PS5, Auriculares y Setup Pro',
    description: 'Las mejores ideas para jugadores de PC, PS5 y Xbox: auriculares HyperX Cloud II, ratones Logitech G502 HERO, barras de luz y accesorios eSports en Amazon.',
    imageUrl: 'https://images.unsplash.com/photo-1542751371-adc38448a05e?auto=format&fit=crop&w=1200&h=630&q=85',
    imageAlt: 'Setup gaming profesional con teclado mecánico, ratón RGB e iluminación envolvente',
  },
  ciclismo: {
    title: 'Mejores Regalos para Ciclistas (2026) | GPS, Luces y MTB',
    socialTitle: '🚴 Top Regalos para Ciclistas de Carretera y Montaña MTB',
    description: 'Accesorios indispensables para amantes de la bicicleta: radar Garmin Varia RTL515, ciclocomputadores GPS, multiherramientas Topeak y luces de alta visibilidad.',
    imageUrl: 'https://images.unsplash.com/photo-1544197150-b99a580bb7a8?auto=format&fit=crop&w=1200&h=630&q=85',
    imageAlt: 'Ciclista en carretera de montaña con equipamiento deportivo y bicicleta moderna',
  },
  automovil: {
    title: 'Mejores Regalos para Amantes del Coche (2026) | Dashcams y Detailing',
    socialTitle: '🚗 Ideas de Regalo para Fanáticos del Coche y Detailing',
    description: 'Gadgets y cuidado del automóvil: arrancadores de batería NOCO, cámaras dashcam 70mai 4K, compresores Xiaomi y kits de limpieza profesional Meguiar\'s.',
    imageUrl: 'https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?auto=format&fit=crop&w=1200&h=630&q=85',
    imageAlt: 'Coche deportivo iluminado con detalles de alta gama en carretera',
  },
  mascotas: {
    title: 'Mejores Regalos para Amantes de Mascotas (2026) | Perros y Gatos',
    socialTitle: '🐾 Regalos Estrella para Dueños de Perros y Gatos',
    description: 'Localizadores GPS Tractive sumergibles, fuentes Catit inteligentes, arneses ergonómicos Julius-K9 y juguetes interactivos con envío Prime.',
    imageUrl: 'https://images.unsplash.com/photo-1450778869180-41d0601e046e?auto=format&fit=crop&w=1200&h=630&q=85',
    imageAlt: 'Perro y gato felices con accesorios de cuidado y bienestar animal',
  },
  'amantes-del-cafe': {
    title: 'Mejores Regalos para Amantes del Café (2026) | Barista y Especialidad',
    socialTitle: '☕ Regalos Gourmet para Baristas y Apasionados del Café',
    description: 'Cafeteras italianas Bialetti, molinillos cónicos Timemore C3, espumadores de leche y tazas térmicas Stanley para disfrutar del mejor café.',
    imageUrl: 'https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?auto=format&fit=crop&w=1200&h=630&q=85',
    imageAlt: 'Taza de café espresso barista con arte latte y granos de café de especialidad',
  },

  // Hubs por Rango de Edad
  'bebes-0-a-12-meses': {
    title: 'Regalos para Bebés y Recién Nacidos (0-12m) | Un Buen Regalo 2026',
    socialTitle: '🧸 Regalos Inolvidables para Bebés y Recién Nacidos (0 a 12 Meses)',
    description: 'Tartas de pañales Dodot personalizadas, cunas de colecho Chicco, cochecitos ultraligeros, canastillas de baño y juguetes sensoriales para recién nacidos.',
    imageUrl: 'https://images.unsplash.com/photo-1519689680058-324335c77eba?auto=format&fit=crop&w=1200&h=630&q=85',
    imageAlt: 'Bebé durmiendo plácidamente con osito de peluche y mantita suave',
  },
  'ninos-1-a-3-anos': {
    title: 'Regalos Educativos para Niños de 1 a 3 Años | Un Buen Regalo 2026',
    socialTitle: '🧩 Juguetes Montessori y Regalos para Niños de 1 a 3 Años',
    description: 'Torres de aprendizaje de madera natural, triciclos evolutivos sin pedales, sets LEGO DUPLO y cuentos interactivos recomendados por pedagogos.',
    imageUrl: 'https://images.unsplash.com/photo-1515488042361-ee00e0ddd4e4?auto=format&fit=crop&w=1200&h=630&q=85',
    imageAlt: 'Juguetes educativos de madera Montessori y bloques de construcción infantiles',
  },
  'ninos-4-a-6-anos': {
    title: 'Regalos para Niños de 4 a 6 Años | Un Buen Regalo 2026',
    socialTitle: '🎨 Los Regalos Más Divertidos para Niños y Niñas de 4 a 6 Años',
    description: 'Circuitos Mario Kart Carrera First, patinetes con ruedas LED que brillan, disfraces infantiles, juegos cooperativos y maletines de dibujo creativo.',
    imageUrl: 'https://images.unsplash.com/photo-1596461404969-9ae70f2830c1?auto=format&fit=crop&w=1200&h=630&q=85',
    imageAlt: 'Niños jugando con pinturas de colores, plastilina y juguetes creativos',
  },
  'ninos-7-a-9-anos': {
    title: 'Regalos para Niños de 7 a 9 Años | Scalextric, LEGO y STEM 2026',
    socialTitle: '⚡ Scalextric, LEGO Creator y Magia para Niños de 7 a 9 Años',
    description: 'Pistas de carreras Scalextric Compact, coches teledirigidos 4x4 todoterreno, cajas de Magia Borrás y sets LEGO Creator 3 en 1.',
    imageUrl: 'https://images.unsplash.com/photo-1585366119957-e9730b6d0f60?auto=format&fit=crop&w=1200&h=630&q=85',
    imageAlt: 'Construcción creativa de bloques de juguete y circuitos de carreras',
  },
  'ninos-10-a-12-anos': {
    title: 'Regalos para Preadolescentes de 10 a 12 Años | Un Buen Regalo 2026',
    socialTitle: '🚀 Regalos Estrella para Chicos y Chicas de 10 a 12 Años',
    description: 'Juegos de cartas superventas como Virus!, minidrones resistentes con cámara, escape rooms en casa, novelas juveniles y robótica STEM.',
    imageUrl: 'https://images.unsplash.com/photo-1508614589041-895b88991e3e?auto=format&fit=crop&w=1200&h=630&q=85',
    imageAlt: 'Dron infantil sobrevolando y tecnología educativa para preadolescentes',
  },
  'jovenes-13-a-15-anos': {
    title: 'Regalos para Adolescentes de 13 a 15 Años | Un Buen Regalo 2026',
    socialTitle: '🎧 Ideas de Regalo que de Verdad Quieren los Adolescentes (13-15 Años)',
    description: 'Auriculares inalámbricos con cancelación de ruido, cámaras instantáneas Instax Mini, juegos de mesa modernos (Catan) y mochilas urbanas.',
    imageUrl: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=1200&h=630&q=85',
    imageAlt: 'Auriculares inalámbricos modernos y accesorios urbanos para jóvenes',
  },
  'jovenes-16-a-18-anos': {
    title: 'Regalos para Jóvenes de 16 a 18 Años | Gaming, PS5 y Estilo 2026',
    socialTitle: '🎮 Regalos Top para Jóvenes de 16 a 18 Años (Gaming, Tech y Estilo)',
    description: 'Mandos y accesorios PlayStation 5, periféricos gaming de precisión, fragancias unisex icónicas y cuadernos de cuero artesanal.',
    imageUrl: 'https://images.unsplash.com/photo-1607604276583-eef5d076aa5f?auto=format&fit=crop&w=1200&h=630&q=85',
    imageAlt: 'Mando de consola inalámbrico de última generación con luces y estética moderna',
  },
  'adultos-mas-de-18-anos': {
    title: 'Regalos Originales a Partir de 18 Años (Adultos) | Un Buen Regalo 2026',
    socialTitle: '✨ Regalos Originales para Adultos: Cajas Smartbox, Drones y Tech',
    description: 'Escapadas con spa y cenas gourmet en cajas Smartbox, smartphones buque insignia, maquetas botánicas LEGO Icons y drones con cámara 4K.',
    imageUrl: 'https://images.unsplash.com/photo-1513519245088-0e12902e5a38?auto=format&fit=crop&w=1200&h=630&q=85',
    imageAlt: 'Caja de regalo prémium con lazo elegante sobre fondo sofisticado',
  },
  'fiesta-revelacion-genero': {
    title: 'Productos para Fiesta Revelación de Género y Baby Shower 2026',
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
    url: 'https://images.unsplash.com/photo-1513542789411-b6a5d4f31634?auto=format&fit=crop&w=1200&h=630&q=85',
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
          type: 'image/jpeg',
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
