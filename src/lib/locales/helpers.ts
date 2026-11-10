import { HubCopy } from '@/lib/i18nTypes';

export const TERM_KEYS = [
  'Recién Nacidos (0-12m)', '1 a 3 Años', '4 a 6 Años', '7 a 9 Años', '10 a 12 Años', '13 a 15 Años', '16 a 18 Años', 'A partir de 18 Años',
  'Bebés (0-12 meses)', 'Niños (1-3 años)', 'Niños (4-6 años)', 'Niños (7-9 años)', 'Preadolescentes (10-12 años)', 'Adolescentes (13-15 años)', 'Jóvenes (16-18 años)', 'Adultos (+18 años)',
  'Fiesta Revelación de Género',
  'Regalos para Él', 'Regalos para Ella', 'Niño / Hombre', 'Niña / Mujer', 'Unisex / Todos',
  'Qué Regalar a un Hombre', 'Qué Regalar a una Mujer', 'Qué Regalar a mi Novio', 'Qué Regalar a mi Novia',
  'Regalos Menos de 20 Euros', 'Regalos para los que Tienen de Todo',
  'Regalos Menos de 15 €', 'Regalos de 15 € a 30 €', 'Regalos de 20 € a 50 €', 'Regalos de 30 € a 60 €',
  'Regalos de 50 € a 100 €', 'Regalos de Más de 60 €', 'Regalos de Más de 100 €',
  'Sobre Ruedas: Coches, Quads y Patinetes', 'Smartphones y Telefonía', 'Cartas y Sobres Pokémon', 'Figuras de Colección y Cine',
  'Juegos de Mesa y Cartas', 'LEGO y Construcción', 'Scalextric y Circuitos de Coches', 'Videojuegos y Setup Gamer',
  'Libros y Lectura Infantil y Juvenil', 'Perfumería, Colonias y Fragancias', 'Manualidades y Creatividad', 'Moda, Ropa y Accesorios',
  'Cochecitos y Esenciales de Bebé', 'Tecnología y Gadgets', 'Bicis y Patinetes con Ruedas', 'Fiestas y Revelación de Género',
  'Escapadas y Experiencias', 'Gourmet, Café y Coctelería',
  'Cochecitos y Mobiliario de Bebé', 'Cunas de Colecho y Descanso', 'Bañeras e Higiene del Bebé', 'Tartas de Pañales y Canastillas',
  'Juguetes Sensoriales y Mordedores', 'Libros Blandos y Cuentos de Tela', 'Colonias y Cuidado de Bebé', 'Ropa, Bodies y Patucos',
  'Coches Eléctricos, Quads y Patinetes', 'Juguetes Montessori y Madera', 'LEGO DUPLO y Construcción', 'Triciclos y Bicis de Equilibrio',
  'Cuentos y Libros Infantiles', 'Cocina Infantil y Juegos de Imitación', 'Manualidades, Plastilina y Pintura', 'Colonias Infantiles y Cuidado',
  'Ropa y Zapatillas Primeros Pasos', 'Circuitos de Coches Infantiles', 'Juegos de Mesa Infantiles', 'Patinetes con Ruedas LED',
  'Cuentos y Primeros Lectores', 'Manualidades, Dibujo y Pintura', 'Peluches Interactivos y Muñecos', 'Disfraces y Ropa Infantil',
  'Colonias Infantiles Frescas', 'Scalextric y Pistas de Carreras', 'Coches RC y Teledirigidos', 'LEGO Creator y Construcción',
  'Juegos de Magia Borrás', 'Juegos de Mesa y Estrategia Familiar', 'Libros y Cómics Infantiles', 'Manualidades y Kits Creativos',
  'Colonias y Cuidado Personal Infantil', 'Moda y Ropa Deportiva Infantil', 'Juegos de Cartas Competitivos (Virus!)', 'Drones RC y Robótica STEM',
  'Juegos de Mesa y Escape Room', 'Libros Juveniles y Cómics', 'Manualidades, Lettering y Creatividad', 'Magia Borrás Avanzada',
  'Colonias y Cuidado Juvenil', 'Moda Urbana, Sudaderas y Mochilas', 'Auriculares Inalámbricos y Audio', 'Cámaras Instantáneas y Fotografía',
  'Juegos de Mesa Clásicos (Catan)', 'Cuidado Facial, Skincare y Colonias', 'Libros Juveniles, Fantasía y Manga', 'Papelería Creativa y Bullet Journal',
  'Moda Juvenil, Sudaderas y Gorras', 'Mochilas Urbanas y Viaje', 'Videojuegos y Accesorios PS5', 'Setup Gamer y Periféricos PC',
  'Tecnología, Audio Hi-Fi y Wearables', 'Perfumería y Fragancias', 'Libros y Novelas Juveniles', 'Cuadernos de Piel y Papelería Artesanal',
  'Moda Urbana, Ropa y Accesorios', 'Escapadas y Experiencias (Smartbox)', 'LEGO Icons y Maquetas para Adultos', 'Juegos de Mesa para Adultos y Parejas',
  'Drones, Robótica y RC Avanzado', 'Tecnología, Audio Hi-Fi y Smart Home', 'Café de Especialidad y Coctelería Gourmet', 'Perfumería Prémium de Autor',
  'Toda la Ropa & Moda', 'Pijamas y Batas', 'Chándals y Deporte', 'Zapatillas y Calzado', 'Disfraces y Fiestas', 'Ropa de Diario y Básicos',
  'Todo Anime, Cine & Series', 'Dragon Ball (Z / Super)', 'Pokémon (Cartas TCG & Figuras)', 'One Piece', 'One Punch Man',
  'Demon Slayer (Kimetsu)', 'Demon Slayer (Kimetsu no Yaiba)', 'Naruto & Boruto',
  'Cine & Retro (Jurassic Park, Fast & Furious, Jumanji, DeLorean...)', 'Cine y Retro',
  'Todo Sobre Ruedas & Motor', 'Coches Eléctricos (12V / 24V)', 'Quads y Buggies 4x4', 'Minimotos y Motos Eléctricas',
  'Patinetes Eléctricos y Hoverboards', 'Bicis, Karts y Patines LED',
  'Motoristas', 'Automóvil', 'Ciclismo y MTB', 'Ciclismo', 'Gaming y Setup', 'Gaming', 'Amantes del Café', 'Mascotas',
  'Halloween', 'Navidad y Reyes', 'Carta a Papá Noel', 'Regalos GTA 6 / GTA VI', 'Votación en Grupo',
  'Cualquier Presupuesto', 'Menos de 20 € (Detalles económicos)', '20 € a 50 € (Regalo perfecto)', '50 € a 100 € (Gran regalo prémium)', 'Más de 100 € (Ocasión especial)',
  'Toda la Ropa', 'Pijamas', 'Chándals', 'Calzado', 'Disfraces', 'Diario & Cole', 'Todas las Series', 'Dragon Ball', 'Pokémon',
  'Todo Ruedas', 'Coches Eléctricos', 'Quads & Buggies', 'Minimotos & Motos', 'Patinetes Eléctricos', 'Bicis, Karts & Patines',
  'Todas las marcas', 'Cualquier presupuesto',
  'Todo para Motoristas', 'Cascos de Moto', 'Chaquetas y Protecciones', 'Guantes Homologados', 'Intercomunicadores & Audio', 'Antirrobos & Candados', 'Accesorios & Mantenimiento',
  'Detalles moteros (<30 €)', 'De 30 € a 80 €', 'De 80 € a 180 €', 'Gama Alta (+180 €)',
  'Todo para Automóvil', 'Dashcams & Cámaras', 'Arrancadores & Baterías', 'Detailing & Limpieza', 'Compresores & Neumáticos', 'Soportes & Gadgets Viaje', 'Diagnosis OBD2 & Motor',
  'Detalles prácticos (<30 €)', 'De 30 € a 70 €', 'De 70 € a 150 €', 'Gama Alta (+150 €)',
  'Todo para Ciclismo & MTB', 'Ciclocomputadores & GPS', 'Luces & Radares de Seguridad', 'Cascos MIPS & Gafas', 'Herramientas & Bombas CO2', 'Bolsas Cuadro & Hidratación', 'Cera de Cadena & Limpieza', 'Detalles ciclistas (<30 €)',
  'Todo para Gaming & Setup', 'Auriculares & Audio', 'Teclados Mecánicos', 'Ratones & Alfombrillas XXL', 'Iluminación RGB & Barras Monitor', 'Mandos Pro & Soporte', 'Cojines & Confort Setup', 'Detalles gaming (<30 €)',
  'Todo para Amantes del Café', 'Cafeteras Espresso & Moka', 'Molinillos Manuales & Eléctricos', 'Café de Especialidad & Filtro (V60)', 'Espumadores de Leche & Jarras', 'Básculas de Precisión con Crono', 'Tazas Térmicas & Mugs (Stanley)', 'Detalles cafeteros (<25 €)', 'De 25 € a 60 €', 'De 60 € a 150 €', 'Gama Alta Barista (+150 €)',
  'Todos los Peludos', 'Todos', 'Perros', 'Gatos', 'Conejos y Roedores', 'Conejos & Roedores',
  'Todo para Amantes de Mascotas', 'Juguetes KONG & Ansiedad al Comer', 'Comederos & Fuentes Inteligentes', 'Localizadores GPS & Seguridad', 'Camas Ortopédicas & Relax', 'Juguetes Interactivos & Puzzles', 'Transportines & Fundas de Coche', 'Cámaras con Dispensador & Cepillos', 'Detalles para peludos (<25 €)', 'De 60 € a 120 €', 'Gama Alta (+120 €)',
  'Todo para Halloween 2026', 'Disfraces Terror & Cosplay', 'Decoración de Terror & Telarañas', 'Calabazas LED & Iluminación', 'Máscaras LED La Purga & Maquillaje FX', 'Caramelos Truco o Trato & Fiestas', 'Detalles de miedo (<15 €)', 'De 15 € a 30 € (Regalo ideal)', 'De 30 € a 60 € (Fiesta completa)', 'Gama Alta (+60 €)',
  'Todo para Navidad & Reyes', 'Trenes de Navidad para Árbol', 'Decoración & Luces Navideñas', 'Calendarios de Adviento 2026', 'Regalos Amigo Invisible (<15 €)', 'Jerséis Navideños con Luces & Ropa', 'Bombones & Cestas Gourmet', 'Amigo Invisible (<15 €)', 'De 15 € a 30 € (Detalle perfecto)', 'De 30 € a 60 € (Regalo prémium)', 'Grandes Regalos de Reyes (+60 €)',
  'Todo el Catálogo GTA', 'Neón Vice City & Setup', 'Mandos PS5 & Periféricos', 'Ropa & Camisetas Retro', 'Coleccionismo & Soportes', 'Reserva & Tarjetas Saldo', 'Menos de 20 €', 'De 50 € a 100 €', 'Más de 100 €',
  'Todos los Juguetes', 'Sobre Ruedas & Motor', 'Cascos & Seguridad', 'LEGO & Bloques', 'Coches & Pistas', 'Muñecas & Peluches', 'Gaming & Robótica', 'Juegos de Mesa', 'Arte & Dibujo', 'Cuentos & Cómics', 'Deportes & Aire Libre', 'Bebés & Montessori',
  'Todo Sobre Ruedas', 'Coches Eléctricos (12V/24V)', 'Minimotos y Motos', 'Bicis, Karts y Patines', 'Todas las edades', '0 a 3 añitos', '4 a 6 años', '7 a 9 años', '10 a 12 años', 'Más de 13 años',
  'De 20 € a 50 €',
] as const;

export function zipTerms(values: string[]): Record<string, string> {
  const out: Record<string, string> = {};
  for (let i = 0; i < TERM_KEYS.length; i++) {
    out[TERM_KEYS[i]] = values[i] ?? TERM_KEYS[i];
  }
  return out;
}

export function buildHubsFromLabels(
  labels: Record<string, [string, string, string]>,
  brand: string,
  titleSuffix: string,
  descPrefix: string,
  eyebrowSuffix: string,
  h1Prefix: string
): Record<string, HubCopy> {
  const out: Record<string, HubCopy> = {};
  for (const [slug, [name, sub, kw0]] of Object.entries(labels)) {
    out[slug] = {
      title: `${name} 【2026】 ${titleSuffix} | ${brand}`,
      socialTitle: `🎁 ${name} | ${brand}`,
      description: `${descPrefix} ${name}: ${sub}`,
      eyebrow: `${name} • ${eyebrowSuffix}`,
      h1: `${h1Prefix} ${name} (2026)`,
      subtitle: sub,
      breadcrumbLabel: name,
      keywords: [kw0, name, `${name} 2026`],
    };
  }
  return out;
}
