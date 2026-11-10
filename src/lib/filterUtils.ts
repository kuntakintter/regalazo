import { parsePrice } from '@/lib/amazon';

/**
 * Palabras clave cortas o ambiguas que solo deben coincidir como palabra/término completo
 * para evitar falsos positivos por subcadena (ej. "ace" en "hace", "boros" en "borosilicato", "vegeta" en "vegetales").
 */
const WORD_BOUNDARY_KEYWORDS = new Set([
  'ace',
  'atv',
  'utv',
  'pc',
  'vr',
  'led',
  'usb',
  'rc',
  'f1',
  'gta',
  'spa',
  'tcg',
  'ex',
  'mew',
  'mtb',
  'gps',
  'bici',
  'moto',
  'quad',
  'kart',
  'body',
  'polo',
  'bota',
  'capa',
  'blade',
  'boros',
  'vegeta',
  'gohan',
  'naruto',
  'zoro',
  'nami',
  'sanji',
  'tiara',
  'gorra',
  'gorro',
  'beanie',
]);

function escapeRegExp(str: string): string {
  return str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

/**
 * Comprueba si `haystackLower` contiene `keyword` respetando límites de palabra
 * cuando el token es corto (<= 5 caracteres) o propenso a falsos positivos.
 */
export function matchesKeywordWordSafe(haystackLower: string, keyword: string): boolean {
  const kw = keyword.trim().toLowerCase();
  if (!kw || !haystackLower) return false;

  if (kw.length <= 5 || WORD_BOUNDARY_KEYWORDS.has(kw)) {
    const pattern = `(?:^|[^a-záéíóúüñ0-9])${escapeRegExp(kw)}(?:$|[^a-záéíóúüñ0-9])`;
    return new RegExp(pattern, 'i').test(haystackLower);
  }

  return haystackLower.includes(kw);
}

export function matchesAnyKeywordWordSafe(haystackLower: string, keywords: string[]): boolean {
  if (!keywords || keywords.length === 0) return false;
  return keywords.some((kw) => matchesKeywordWordSafe(haystackLower, kw));
}

/**
 * Evalúa TODOS los rangos de presupuesto usados tanto en FilterBar como en botones rápidos y URLs SEO:
 * `'all'`, `'<15'`, `'<20'`, `'15-30'`, `'20-50'`, `'30-60'`, `'50-100'`, `'>60'`, `'>100'` y valores numéricos (`<= 150`).
 */
export function matchesPriceFilter(priceText: string, selectedPrice: string): boolean {
  if (!selectedPrice || selectedPrice === 'all') return true;

  const prodPrice = parsePrice(priceText);
  if (!prodPrice || prodPrice <= 0) return false;

  switch (selectedPrice) {
    case '<15':
      return prodPrice <= 15;
    case '<20':
      return prodPrice <= 20;
    case '15-30':
      return prodPrice >= 15 && prodPrice <= 30;
    case '20-50':
      return prodPrice >= 20 && prodPrice <= 50;
    case '30-60':
      return prodPrice >= 30 && prodPrice <= 60;
    case '50-100':
      return prodPrice >= 50 && prodPrice <= 100;
    case '>60':
      return prodPrice >= 60;
    case '>100':
      return prodPrice >= 100;
    default: {
      const maxBudget = Number(selectedPrice);
      if (!Number.isNaN(maxBudget) && maxBudget < 150) {
        return prodPrice <= maxBudget;
      }
      return true;
    }
  }
}
