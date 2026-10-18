export const AMAZON_AFFILIATE_TAG = 'vapegadgets22-21';
export const AMAZON_BASE_URL = 'https://www.amazon.es';

/**
 * Genera el enlace directo a la ficha del producto específico en Amazon España con el tag de afiliado.
 */
export function getAmazonProductUrl(asin: string): string {
  const cleanTag = AMAZON_AFFILIATE_TAG;
  return `${AMAZON_BASE_URL}/dp/${encodeURIComponent(asin)}/?tag=${cleanTag}&linkCode=ll1`;
}

/**
 * Genera el enlace de búsqueda en Amazon España con el tag de afiliado.
 */
export function getAmazonSearchUrl(searchQuery: string): string {
  const cleanTag = AMAZON_AFFILIATE_TAG;
  return `${AMAZON_BASE_URL}/s?k=${encodeURIComponent(searchQuery)}&tag=${cleanTag}&linkCode=ll2`;
}

/**
 * Helper unificado para producto directo (ASIN) o búsqueda general.
 */
export function getAmazonAffiliateUrl(searchQueryOrAsin: string, isAsin: boolean = false): string {
  if (isAsin) {
    return getAmazonProductUrl(searchQueryOrAsin);
  }
  return getAmazonSearchUrl(searchQueryOrAsin);
}

/**
 * Aviso legal obligatorio por la directiva de Amazon Associates
 */
export const AMAZON_DISCLOSURE = 
  'En calidad de Afiliado de Amazon, este sitio web obtiene ingresos por las compras adscritas que cumplen los requisitos aplicables. Los precios y disponibilidad de los productos son precisos a la fecha y hora indicadas y están sujetos a cambios.';
