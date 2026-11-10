import { Product, GENERAL_CATEGORY_MAPPING } from '@/data/products';
import { ALL_SITE_PRODUCTS } from '@/data/allCatalogProducts';
import { matchesAnyKeywordWordSafe } from '@/lib/filterUtils';

const AGE_ORDER = ['0-12m', '1-3', '4-6', '7-9', '10-12', '13-15', '16-18', '+18'] as const;

const STOPWORDS = new Set([
  'y',
  'de',
  'del',
  'la',
  'las',
  'el',
  'los',
  'en',
  'con',
  'para',
  'por',
  'o',
  'un',
  'una',
  'sin',
  'mas',
  'más',
  'a',
]);

function normalizeText(str: string): string {
  return str
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .trim();
}

function getAgeDistance(ageA: string, ageB: string): number {
  const idxA = AGE_ORDER.indexOf(ageA as (typeof AGE_ORDER)[number]);
  const idxB = AGE_ORDER.indexOf(ageB as (typeof AGE_ORDER)[number]);
  if (idxA === -1 || idxB === -1) return 10;
  return Math.abs(idxA - idxB);
}

function sortByScore(items: Product[]): Product[] {
  return [...items].sort(
    (a, b) => (b.reviewsCount || 0) * (b.rating || 1) - (a.reviewsCount || 0) * (a.rating || 1)
  );
}

function findGeneralGroupSubcategories(subLabel: string): string[] {
  const target = subLabel.toLowerCase().trim();
  const group = new Set<string>();

  for (const [parent, children] of Object.entries(GENERAL_CATEGORY_MAPPING)) {
    const parentLower = parent.toLowerCase().trim();
    const childrenLower = children.map((c) => c.toLowerCase().trim());
    if (parentLower === target || childrenLower.includes(target)) {
      group.add(parentLower);
      for (const ch of childrenLower) group.add(ch);
    }
  }

  return Array.from(group);
}

function extractSubKeywords(subLabel: string): string[] {
  const cleaned = subLabel
    .replace(/[()!:,.]/g, ' ')
    .split(/\s+/)
    .map((w) => w.trim().toLowerCase())
    .filter((w) => w.length >= 4 && !STOPWORDS.has(w));

  const extra = new Set<string>(cleaned);
  const norm = normalizeText(subLabel);

  if (norm.includes('cafe') || norm.includes('coctel')) {
    ['cafe', 'cafetera', 'barista', 'coctel', 'gourmet', 'espresso'].forEach((k) => extra.add(k));
  }
  if (norm.includes('escapad') || norm.includes('smartbox') || norm.includes('experien')) {
    ['smartbox', 'escapada', 'spa', 'experiencia', 'viaje'].forEach((k) => extra.add(k));
  }
  if (norm.includes('revelacion') || norm.includes('fiesta')) {
    ['revelacion', 'confeti', 'baby shower', 'globo', 'panales', 'canastilla', 'bebe'].forEach((k) => extra.add(k));
  }
  if (norm.includes('gamer') || norm.includes('ps5') || norm.includes('videojuego')) {
    ['gamer', 'gaming', 'ps5', 'teclado', 'raton', 'auriculares', 'monitor'].forEach((k) => extra.add(k));
  }
  if (norm.includes('dron') || norm.includes('robot')) {
    ['dron', 'drone', 'robot', 'stem', 'teledirigido'].forEach((k) => extra.add(k));
  }
  if (norm.includes('auricular') || norm.includes('audio') || norm.includes('hifi')) {
    ['auriculares', 'altavoz', 'bluetooth', 'sonido', 'sony', 'jbl', 'anc'].forEach((k) => extra.add(k));
  }
  if (norm.includes('camara') || norm.includes('fotograf')) {
    ['camara', 'instax', 'fujifilm', 'instantanea', 'fotos'].forEach((k) => extra.add(k));
  }
  if (norm.includes('papeleria') || norm.includes('bullet journal') || norm.includes('cuaderno')) {
    ['cuaderno', 'diario', 'journal', 'rotulador', 'lettering', 'papeleria', 'tombow', 'ohuhu'].forEach((k) =>
      extra.add(k)
    );
  }
  if (norm.includes('disfrac') || norm.includes('ropa') || norm.includes('moda')) {
    ['disfraz', 'disfraces', 'sudadera', 'pijama', 'mochila', 'ropa', 'camiseta', 'halloween'].forEach((k) =>
      extra.add(k)
    );
  }

  return Array.from(extra);
}

/**
 * Devuelve una selección relevante de al menos `minCount` (por defecto 6) productos para cualquier
 * subcategoría de etapa de edad, ordenando siempre primero las coincidencias estrictas (edad + subcategoría)
 * y completando en cascada con coincidencias cross-age, familia temática y edad relacionada.
 */
export function matchProductsForSubcategory(
  ageId: string,
  subLabel: string,
  catalog: Product[] = ALL_SITE_PRODUCTS,
  minCount: number = 6
): Product[] {
  const targetSub = subLabel.toLowerCase().trim();
  const seenIds = new Set<string>();
  const result: Product[] = [];

  const appendSorted = (candidates: Product[]) => {
    for (const p of sortByScore(candidates)) {
      if (!seenIds.has(p.id)) {
        seenIds.add(p.id);
        result.push(p);
      }
    }
  };

  // Tier 1: Coincidencia estricta (misma edad + subcategoría/categoría exacta)
  const tier1 = catalog.filter((p) => {
    if (ageId !== 'reveal' && p.ageRange !== ageId) return false;
    return p.subcategory.toLowerCase().trim() === targetSub || p.category.toLowerCase().trim() === targetSub;
  });
  appendSorted(tier1);

  // Tier 2: Misma subcategoría/categoría exacta en otras edades (cercanas primero)
  const tier2 = catalog
    .filter((p) => {
      if (seenIds.has(p.id)) return false;
      return p.subcategory.toLowerCase().trim() === targetSub || p.category.toLowerCase().trim() === targetSub;
    })
    .sort((a, b) => {
      const distDiff = getAgeDistance(ageId, a.ageRange) - getAgeDistance(ageId, b.ageRange);
      if (distDiff !== 0) return distDiff;
      return (b.reviewsCount || 0) * (b.rating || 1) - (a.reviewsCount || 0) * (a.rating || 1);
    });
  for (const p of tier2) {
    seenIds.add(p.id);
    result.push(p);
  }

  if (result.length >= minCount) {
    return result;
  }

  // Tier 3: Subcategorías hermanas dentro del mismo grupo en GENERAL_CATEGORY_MAPPING (misma edad primero, luego cercanas)
  const siblingGroup = findGeneralGroupSubcategories(subLabel);
  if (siblingGroup.length > 0) {
    const tier3 = catalog
      .filter((p) => {
        if (seenIds.has(p.id)) return false;
        const pSub = p.subcategory.toLowerCase().trim();
        const pCat = p.category.toLowerCase().trim();
        return siblingGroup.includes(pSub) || siblingGroup.includes(pCat);
      })
      .sort((a, b) => {
        const refAge = ageId === 'reveal' ? '0-12m' : ageId;
        const aSame = a.ageRange === refAge ? 0 : 1;
        const bSame = b.ageRange === refAge ? 0 : 1;
        if (aSame !== bSame) return aSame - bSame;
        const distDiff = getAgeDistance(refAge, a.ageRange) - getAgeDistance(refAge, b.ageRange);
        if (distDiff !== 0) return distDiff;
        return (b.reviewsCount || 0) * (b.rating || 1) - (a.reviewsCount || 0) * (a.rating || 1);
      });

    for (const p of tier3) {
      if (result.length >= minCount) break;
      seenIds.add(p.id);
      result.push(p);
    }
  }

  if (result.length >= minCount) {
    return result;
  }

  // Tier 4: Coincidencia semántica por palabras clave en ALL_SITE_PRODUCTS (preferencia por edad cercana)
  const keywords = extractSubKeywords(subLabel);
  if (keywords.length > 0) {
    const tier4 = catalog
      .filter((p) => {
        if (seenIds.has(p.id)) return false;
        const haystack = normalizeText(
          `${p.title} ${p.description} ${p.subcategory} ${p.category} ${p.searchQuery} ${p.badge}`
        );
        return matchesAnyKeywordWordSafe(haystack, keywords);
      })
      .sort((a, b) => {
        const refAge = ageId === 'reveal' ? '0-12m' : ageId;
        const aSame = a.ageRange === refAge ? 0 : 1;
        const bSame = b.ageRange === refAge ? 0 : 1;
        if (aSame !== bSame) return aSame - bSame;
        const distDiff = getAgeDistance(refAge, a.ageRange) - getAgeDistance(refAge, b.ageRange);
        if (distDiff !== 0) return distDiff;
        return (b.reviewsCount || 0) * (b.rating || 1) - (a.reviewsCount || 0) * (a.rating || 1);
      });

    for (const p of tier4) {
      if (result.length >= minCount) break;
      seenIds.add(p.id);
      result.push(p);
    }
  }

  if (result.length >= minCount) {
    return result;
  }

  // Tier 5: Completar hasta minCount con los artículos mejor valorados de la misma etapa de edad (o 0-12m para reveal)
  const targetRefAge = ageId === 'reveal' ? '0-12m' : ageId;
  const tier5SameAge = sortByScore(
    catalog.filter((p) => !seenIds.has(p.id) && p.ageRange === targetRefAge)
  );
  for (const p of tier5SameAge) {
    if (result.length >= minCount) break;
    seenIds.add(p.id);
    result.push(p);
  }

  if (result.length < minCount) {
    const tier5Closest = catalog
      .filter((p) => !seenIds.has(p.id))
      .sort((a, b) => {
        const distDiff = getAgeDistance(targetRefAge, a.ageRange) - getAgeDistance(targetRefAge, b.ageRange);
        if (distDiff !== 0) return distDiff;
        return (b.reviewsCount || 0) * (b.rating || 1) - (a.reviewsCount || 0) * (a.rating || 1);
      });
    for (const p of tier5Closest) {
      if (result.length >= minCount) break;
      seenIds.add(p.id);
      result.push(p);
    }
  }

  return result;
}
