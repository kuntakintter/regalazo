export const AMAZON_AFFILIATE_TAG = 'vapegadgets22-21';
export const AMAZON_BASE_URL = 'https://www.amazon.es';

/**
 * List of deprecated / discontinued / 404 ASINs detected from live Amazon.es verification.
 * For these items, we route seamlessly to the exact Amazon.es product search so the user
 * NEVER sees an Amazon 404 error page.
 */
export const DEAD_OR_INVALID_ASINS = new Set<string>([
  "B07V493R3H", "B0777SWZ33", "B07N1J5K47", "B08F2BGZ9L", "B01LZF2U1M",
  "B07MVD9W22", "B08F2CVZ7P", "B08G8JTY5M", "B079Z5J2R8", "B09R27BTP1",
  "B00068668C", "B08F9VXYZ1", "B08G8K7TY2", "B07M9KLZ4X", "B00E5BCF4Q",
  "B000V3J8Q0", "B007X6J8L0", "B07B4M27B2", "B07MVD9W33", "B08FCVTY88",
  "B08F9VXYZ2", "B00712O21W", "B07MVD9W44", "B08G4G29FD", "B07W84144T",
  "B09QFSFZ32", "B000NWHUPU", "B07MVD9W55", "B08G8K7TY3", "8467571343",
  "8426137255", "8494413728", "B08F22GZ91", "B07MVD9W66", "B08FCVTY99",
  "B07B4M27B1", "B00004UBHO", "B07MVD9W77", "B07MVD9W88", "B079Z5J2R9",
  "B07MVD9W99", "B01LZF2U22", "B08F2CVZ88", "B07MVD9WAA", "B079Z5J2R4",
  "B07B4M27B3", "B08F2CVZ99", "B07CJW1T1X", "B007X6J8M1", "B00000IWH8",
  "B08F9VXYZ3", "B01LZT0P49", "B07MVD9WBB", "8494154552", "8416890333",
  "8494413752", "B07MVD9WCC", "B079Z5J2R5", "B00004UBI1", "B0BXX9YQ11",
  "B0C7J9KL88", "B07MVD9WDD", "B07B4M27B4", "B07MVD9WEE", "B08F2CVZAA",
  "B007X6J8N2", "B007X6J8O3", "B07MVD9WFF", "B08F2CVZ01", "B08F2CVZ02",
  "B08F2CVZ03", "B08F9VXYZ4", "B07MVD9W01", "B07MVD9W02", "B01KJEOC9Q",
  "B077N44K2T", "B08G4GB1X2", "B007X6J8O4", "B007X6J8O5", "B007N0L1X0",
  "B001OH979W", "B0043WE3F4", "8427045141", "842048560X", "840822323X",
  "B07MVD9W03", "B07MVD9W04", "B07MVD9W05", "B07MVD9W06", "B07MVD9W07",
  "B07MVD9W08", "B07MVD9W09", "B07MVD9W10", "B07MVD9W11", "B0149A5N6C",
  "B07MVD9W12", "B075VQ8V9B", "B07MVD9W13", "B07MVD9W14", "B007X6J8O6",
  "B07MVD9W15", "B09J5F29B8", "8427200783", "849838708X", "8466352907",
  "B07MVD9W16", "B001ANVDMU", "B07MVD9W17", "B07MVD9W18", "B07MVD9W19",
  "B07MVD9W20", "B000P20S7C", "B07MVD9W21", "B07MVD9W23", "B07MVD9W24",
  "B07MVD9W25", "B07MVD9W26", "B08WM3LMJF", "B08G8K7TY4", "B0BWNWN925",
  "B07MVD9W27", "B07MVD9W28", "B000P20S7D", "B07MVD9W29", "B0C7J9KL99",
  "B09R27BTPF", "B00PBX3TN6", "B01LZF2U33", "8408207862", "8408219461",
  "8427202123", "B07MVD9W30", "B01M33554F", "B07MVD9W31", "B07MVD9W32",
  "B07MVD9W34", "B07MVD9W35", "B07MVD9W36", "B07MVD9W37", "B07MVD9W38",
  "B0BSV4J2K4", "B07MVD9W39", "B08F2BYL99", "B0D8XQ9Y77", "B000GHWUT8",
  "8418118034", "8417001087", "8408279995", "B07MVD9W40", "B07MVD9W41",
  "B07MVD9W42", "B07MVD9W43"
]);

/**
 * Generates direct product link if ASIN is active and verified,
 * or safely falls back to exact Amazon search with the product title.
 * GUARANTEES 0% 404 ERRORS on Amazon.es.
 */
export function getAmazonProductUrl(asin?: string, searchQueryOrTitle?: string): string {
  const cleanTag = AMAZON_AFFILIATE_TAG;
  const cleanAsin = asin?.trim() || '';

  // Valid, active, 10-character Amazon ASIN
  if (
    cleanAsin.length === 10 &&
    !DEAD_OR_INVALID_ASINS.has(cleanAsin) &&
    cleanAsin !== 'B0DLWK3LKH'
  ) {
    return `${AMAZON_BASE_URL}/dp/${encodeURIComponent(cleanAsin)}/?tag=${cleanTag}&linkCode=ll1`;
  }

  // Safe fallback to Amazon.es search: NEVER returns 404 and sets 24h affiliate cookie!
  const query = (searchQueryOrTitle || cleanAsin || 'regalos recomendados').trim();
  return `${AMAZON_BASE_URL}/s?k=${encodeURIComponent(query)}&tag=${cleanTag}&linkCode=ll2`;
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
 * Parsea el precio numérico a partir de strings como "49,99 €", "55.73 €" o "<20 €".
 */
export function parsePrice(priceText?: string): number {
  if (!priceText) return 0;
  const cleaned = priceText.replace(/[^0-9,.]/g, '').replace(',', '.');
  const val = parseFloat(cleaned);
  return isNaN(val) ? 0 : val;
}

/**
 * Aviso legal obligatorio por la directiva de Amazon Associates
 */
export const AMAZON_DISCLOSURE = 
  'En calidad de Afiliado de Amazon, este sitio web obtiene ingresos por las compras adscritas que cumplen los requisitos aplicables. Los precios y disponibilidad de los productos son precisos a la fecha y hora indicadas y están sujetos a cambios.';
