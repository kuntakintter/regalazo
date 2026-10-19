/**
 * Utility for intelligent search, accent removal, phonetic aliases and typo tolerance.
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

/**
 * Checks if a product matches a search query using tokenized fuzzy matching.
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
  },
  rawQuery: string
): boolean {
  if (!rawQuery || rawQuery.trim() === '') return true;

  const normalizedQuery = normalizeSearchText(rawQuery);
  const queryTokens = normalizedQuery.split(/\s+/).filter((t) => t.length > 0);

  const searchableText = normalizeSearchText(
    `${product.title} ${product.description} ${product.category || ''} ${product.subcategory || ''} ${product.searchQuery || ''} ${product.badge || ''} ${product.idealFor || ''}`
  );

  // Every word typed must match somewhere in the product text
  return queryTokens.every((token) => searchableText.includes(token));
}
