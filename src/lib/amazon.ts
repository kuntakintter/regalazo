export const AMAZON_AFFILIATE_TAG = 'vapegadgets22-21';
export const AMAZON_BASE_URL = 'https://www.amazon.es';

/**
 * Genera el enlace de afiliado de Amazon España para una búsqueda o producto específico.
 */
export function getAmazonAffiliateUrl(searchQueryOrAsin: string, isAsin: boolean = false): string {
  const cleanTag = AMAZON_AFFILIATE_TAG;
  if (isAsin) {
    return `${AMAZON_BASE_URL}/dp/${encodeURIComponent(searchQueryOrAsin)}?tag=${cleanTag}&linkCode=ll1`;
  }
  return `${AMAZON_BASE_URL}/s?k=${encodeURIComponent(searchQueryOrAsin)}&tag=${cleanTag}&linkCode=ll2`;
}

/**
 * Aviso legal obligatorio por la directiva de Amazon Associates
 */
export const AMAZON_DISCLOSURE = 
  'En calidad de Afiliado de Amazon, este sitio web obtiene ingresos por las compras adscritas que cumplen los requisitos aplicables. Los precios y disponibilidad de los productos son precisos a la fecha y hora indicadas y están sujetos a cambios.';
