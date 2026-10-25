/**
 * Utility for intelligent search, accent removal, phonetic aliases, persona intent and typo tolerance.
 */

export function normalizeSearchText(str: string): string {
  if (!str) return '';
  return str
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '') // Remove accents (á->a, é->e, etc.)
    // Common Spanish phonetic typos and product aliases:
    .replace(/\b(escalestric|escalextric|scalestric|scalextrix|escalestrix)\b/g, 'scalextric')
    .replace(/\b(plei|pleystation|play station|playstation)\b/g, 'playstation ps5')
    .replace(/\b(switch)\b/g, 'nintendo switch')
    .replace(/\b(muneca|munecas)\b/g, 'muñeca')
    .replace(/\b(patin|patines)\b/g, 'patinete')
    .replace(/\b(bici|bicis)\b/g, 'bicicleta')
    .replace(/\b(dron|drone|drones)\b/g, 'dron')
    .replace(/\b(bebe|bebes)\b/g, 'bebe')
    .replace(/\b(camara|camaras)\b/g, 'camara')
    .replace(/\b(balon|balones)\b/g, 'balon')
    .replace(/\b(legos)\b/g, 'lego')
    .replace(/\b(revelacion)\b/g, 'revelacion')
    .replace(/\b(hawei|huawey)\b/g, 'huawei')
    .replace(/\b(aifon|ifone|ipone)\b/g, 'iphone')
    .replace(/\b(sansung|sansun)\b/g, 'samsung')
    .replace(/\b(movil|moviles|celular|celulares|telefono|telefonos)\b/g, 'smartphone')
    .trim();
}

const STOP_WORDS = new Set([
  'regalo', 'regalos', 'idea', 'ideas', 'para', 'el', 'la', 'los', 'las',
  'un', 'una', 'unos', 'unas', 'de', 'del', 'al', 'con', 'en', 'y', 'o',
  'mas', 'muy', 'original', 'originales', 'buen', 'bueno', 'buenos',
  'mejores', 'mejor', 'vendido', 'vendidos', 'top', 'ventas', 'cosa', 'cosas',
  'mi', 'mis', 'su', 'sus', 'tu', 'tus', 'nuestro', 'nuestra', 'quiero', 'busca', 'buscar'
]);

// Semantic keyword mappings for recipient personas and gift themes
const PERSONA_KEYWORDS: Record<string, string[]> = {
  novio: [
    'gaming', 'gamer', 'star wars', 'batman', 'auricular', 'ps5', 'coche', 'delorean',
    'motos', 'moto', 'cafe', 'cafetera', 'smartbox', 'reloj', 'figura', 'dragon ball',
    'one piece', 'marvel', 'lego', 'blade', 'fast & furious', 'jurassic', 'ciclismo', 'habitos', 'gadget'
  ],
  novia: [
    'skincare', 'perfume', 'joyero', 'instax', 'lampara', 'smartbox', 'cafe', 'cafetera',
    'libro', 'vela', 'deco', 'peluche', 'joya', 'hogar', 'auricular', 'escapada'
  ],
  hombre: [
    'gaming', 'motos', 'automovil', 'coche', 'delorean', 'batman', 'auricular', 'cafe',
    'barista', 'figura', 'reloj', 'afeitadora', 'herramientas', 'smartbox', 'star wars'
  ],
  mujer: [
    'skincare', 'perfume', 'joyero', 'instax', 'lampara', 'smartbox', 'cafe', 'vela',
    'deco', 'peluche', 'libro', 'joya', 'auricular'
  ],
  papa: [
    'automovil', 'coche', 'delorean', 'cafe', 'cafetera', 'herramientas', 'reloj',
    'smartbox', 'vino', 'gourmet', 'moto', 'escapada'
  ],
  padre: [
    'automovil', 'coche', 'delorean', 'cafe', 'cafetera', 'herramientas', 'reloj',
    'smartbox', 'vino', 'gourmet', 'moto', 'escapada'
  ],
  mama: [
    'smartbox', 'cafetera', 'cafe', 'perfume', 'crema', 'masajeador', 'joyero',
    'libro', 'vela', 'manta', 'hogar', 'escapada'
  ],
  madre: [
    'smartbox', 'cafetera', 'cafe', 'perfume', 'crema', 'masajeador', 'joyero',
    'libro', 'vela', 'manta', 'hogar', 'escapada'
  ],
  abuelo: ['reloj', 'libro', 'radio', 'manta', 'zapatillas', 'smartbox', 'gourmet', 'cafe'],
  abuela: ['manta', 'joyero', 'colgante', 'libro', 'reloj', 'vela', 'gourmet', 'cafe'],
  pareja: ['smartbox', 'escapada', 'juego', 'mesa', 'lampara', 'taza', 'cafe', 'auricular'],
  frikis: ['gaming', 'star wars', 'batman', 'marvel', 'pokemon', 'anime', 'dragon ball', 'one piece', 'manga', 'figura', 'delorean'],
  friki: ['gaming', 'star wars', 'batman', 'marvel', 'pokemon', 'anime', 'dragon ball', 'one piece', 'manga', 'figura', 'delorean'],
};

/**
 * Checks if a product matches a search query using tokenized fuzzy matching + persona intent matching.
 */
export function matchesSearchQuery(
  product: {
    title: string;
    description: string;
    category?: string;
    subcategory?: string;
    searchQuery?: string;
    badge?: string;
    idealFor?: string;
    gender?: string;
    ageRange?: string;
  },
  rawQuery: string
): boolean {
  if (!rawQuery || rawQuery.trim() === '') return true;

  const normalizedQuery = normalizeSearchText(rawQuery);
  const queryTokens = normalizedQuery.split(/\s+/).filter((t) => t.length > 0);

  // If query consists only of generic stop words like "regalos para...", match all products!
  const meaningfulTokens = queryTokens.filter((t) => !STOP_WORDS.has(t));
  if (meaningfulTokens.length === 0) {
    return true;
  }

  const searchableText = normalizeSearchText(
    `${product.title} ${product.description} ${product.category || ''} ${product.subcategory || ''} ${product.searchQuery || ''} ${product.badge || ''} ${product.idealFor || ''}`
  );

  // Check matching for tokens
  return meaningfulTokens.every((token) => {
    // 1. Direct substring match
    if (searchableText.includes(token)) return true;

    // 2. Persona / Recipient intent expansion (e.g. novio, novia, papa, mama, friki...)
    const personaWords = PERSONA_KEYWORDS[token];
    if (personaWords) {
      const isTargetGender =
        token === 'novio' || token === 'hombre' || token === 'papa' || token === 'padre' || token === 'chico'
          ? product.gender !== 'girl'
          : token === 'novia' || token === 'mujer' || token === 'mama' || token === 'madre' || token === 'chica'
          ? product.gender !== 'boy'
          : true;

      const isTargetAge =
        token === 'novio' || token === 'novia' || token === 'pareja' || token === 'hombre' || token === 'mujer' || token === 'papa' || token === 'mama'
          ? !product.ageRange || product.ageRange === '+18' || product.ageRange === '16-18' || product.ageRange === '13-15'
          : true;

      const matchesPersonaWord = personaWords.some((word) => searchableText.includes(word));

      if (isTargetGender && isTargetAge && matchesPersonaWord) {
        return true;
      }
    }

    return false;
  });
}
