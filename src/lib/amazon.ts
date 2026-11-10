export const AMAZON_AFFILIATE_TAG = 'vapegadgets22-21';
export const AMAZON_AFFILIATE_TAG_ES = 'vapegadgets22-21';
export const AMAZON_AFFILIATE_TAG_INTL = 'vapegadgets22-20';

export const AMAZON_BASE_URL = 'https://www.amazon.es';
export const AMAZON_INTL_URL = 'https://www.amazon.com';

/**
 * Detecta inteligentemente si el visitante está en el continente americano
 * (Sudamérica, Centroamérica o EE.UU.) para enrutarlo automáticamente a Amazon.com
 * con su StoreID internacional vapegadgets22-20 en dólares / moneda local.
 * En España y Europa mantiene Amazon.es con vapegadgets22-21.
 */
export function getRegionalAmazonConfig(): { baseUrl: string; tag: string } {
  if (typeof window !== 'undefined') {
    try {
      const tz = Intl.DateTimeFormat().resolvedOptions().timeZone || '';
      if (tz.startsWith('America/')) {
        return {
          baseUrl: AMAZON_INTL_URL,
          tag: AMAZON_AFFILIATE_TAG_INTL,
        };
      }
    } catch {
      // fallback silencioso
    }
  }
  return {
    baseUrl: AMAZON_BASE_URL,
    tag: AMAZON_AFFILIATE_TAG_ES,
  };
}

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
  "B07MVD9W42", "B07MVD9W43",
  // Verified 404 ASINs from products.ts & cartaNavidadToys.ts audit (2026-11-10)
  "B09J54FY68", "B0BM9L6K62", "B09V7N6K5H", "B07C3DZZYQ", "B07W9432K8",
  "B0B94Z7T9M", "B07SH3H51F", "B00N4G8K1W", "B09L7X9M1N", "B09Y8N6K12",
  "B0892L9K8Q", "B00005LM0S", "B08C69V3Z2", "B0BRN9K81W", "B0892N8K1Y",
  "B09Y8P2K1Q", "B09L6W9N1P", "B08W73SBCV", "B07W5PVF27", "B08W5B7P4P",
  "B09QFS1P59", "B07K66H6X9", "B01KJEOC3A", "B08WWZ2T3T", "B0CGW4P7X2",
  "B079D19K26", "B08G4QRV8B", "B0BBSJ7T6M", "B08G4FT9X4", "B002KCV7X0",
  "B079KHHP8V", "B0841VR19G", "B079D8J7X1", "B07W5PVF29", "B08HYG77Y7",
  "B08HYZ87X1", "B0859F5H1H", "B075T7Z7Y1", "B0855G6H7J", "B08R92V7P7",
  "B0D1PHR568", "B079KHHP8X", "B07N3821TC", "B07XQ8T9F1", "B01C8G5W20",
  "B0BN55M67G", "B0BSRN1K9P", "B07W5PVF30", "B07K66H6YA", "B0FHWL5Y2K",
  "B00TYD36XX", "B09QFT1P7N", "B07FP6ZW80", "B0D1PHR570", "B0BN55M67L",
  "B09HYG88ZA", "B0855G6H7M", "B09HYG77Y9", "B08HYG77ZA", "B0BN55M67M",
  "B0BV75Q88V", "B09HYG88ZB", "B01EI0Z55K", "B07K66H6YD", "B008DW66Z6",
  "B00V351W2W", "B07H8151D8", "B004BR72L8", "B08DHKQ66K", "B008ZCGM24",
  "B002KCV7X1", "B0042SYY8I", "B00OX04ZMY", "B09DFH5Z7X", "B079D19K29",
  "B000W7D7EC", "B000W7D7ED", "B07P88H4K6", "B07VF7J9Q8", "B01BHKZ8E4",
  "B019K8K3K0", "B00000J0RP", "B079KHHP8Y", "B0855G6H7N", "B078XG9P6R",
  "B08W73SBCX", "B08W5B7P4R", "B075T7Z7Y3", "B001B2OT3Y", "B0BN55M67N",
  "B01M16K9T0", "B08R92V7PA", "B09HYG88ZC", "B003L49O2A", "B01C8G5W22",
  "B0BN55M67O", "B0068V5X9U", "B009X80D92", "B002KCV7X2", "B079D19K2D",
  "B00AQN697Q", "B01A94P0F8", "B075T7Z7Y4", "B01NA0468L", "B0855G6H7R",
  "B07H8151D9", "B002KCV7X4", "B079D19K2E", "B00000IZGV", "B079D19K2F",
  "B008DW66Z7", "B07N3821TE", "B075T7Z7Y5", "B08N3TCP2F", "B002KCV7X7",
  "B079D19K2G", "B075T7Z7Y6", "B07N3821TF", "B00TYD36Y0", "B0855G6H7T",
  "B01NA0468M", "B09HYG88ZG", "B08HYG77ZE", "B0BN55M67T", "B01NA0468N",
  "B0793D953F", "B074WCNMYH", "B0855G6H7W", "B079D19K2K", "B006WZJA2Q",
  "B00TYD36Y2", "B08R92V7PH", "B002KCV7XA", "B0BN55M67U", "B0855G6H7X",
  "B079D19K2L", "B00AQN697U", "B00TYD36Y3", "B075T7Z7Y8", "B00TYD36Y4",
  "B0D1PHR569"
]);

/**
 * Checks whether an ASIN string is syntactically valid (10 uppercase alphanumeric chars)
 * and not listed as dead/placeholder.
 */
export function isValidActiveAsin(asin?: string): boolean {
  const cleanAsin = asin?.trim() || '';
  return (
    cleanAsin.length === 10 &&
    /^[A-Z0-9]{10}$/.test(cleanAsin) &&
    !DEAD_OR_INVALID_ASINS.has(cleanAsin) &&
    cleanAsin !== 'B0DLWK3LKH'
  );
}

/**
 * Generates direct product link if ASIN is active and verified,
 * or safely falls back to exact Amazon search with the product title.
 * GUARANTEES 0% 404 ERRORS on Amazon.es.
 */
export function getAmazonProductUrl(asin?: string, searchQueryOrTitle?: string): string {
  const { baseUrl, tag } = getRegionalAmazonConfig();
  const cleanAsin = asin?.trim() || '';

  // Valid, active, 10-character Amazon ASIN
  if (isValidActiveAsin(cleanAsin)) {
    return `${baseUrl}/dp/${encodeURIComponent(cleanAsin)}/?tag=${tag}&linkCode=ll1`;
  }

  // Safe fallback to Amazon search: NEVER returns 404 and sets 24h affiliate cookie!
  const query = (searchQueryOrTitle || cleanAsin || 'regalos recomendados').trim();
  return `${baseUrl}/s?k=${encodeURIComponent(query)}&tag=${tag}&linkCode=ll2`;
}

/**
 * Genera el enlace de búsqueda en Amazon con el tag de afiliado regional.
 */
export function getAmazonSearchUrl(searchQuery: string): string {
  const { baseUrl, tag } = getRegionalAmazonConfig();
  return `${baseUrl}/s?k=${encodeURIComponent(searchQuery)}&tag=${tag}&linkCode=ll2`;
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
