export async function onRequestGet(context) {
  const { request, env } = context;
  try {
    const url = new URL(request.url);
    const query = url.searchParams.get('q');
    const limit = Math.min(16, Math.max(1, parseInt(url.searchParams.get('limit') || '8', 10)));
    const regionParam = url.searchParams.get('region');
    const countryHeader = request.headers.get('cf-ipcountry') || '';
    const region =
      regionParam === 'es' || regionParam === 'intl'
        ? regionParam
        : countryHeader && countryHeader.toUpperCase() !== 'ES'
        ? 'intl'
        : 'es';

    if (!query || query.trim().length < 2) {
      return Response.json({ success: true, region, count: 0, results: [] });
    }

    const isIntl = region === 'intl';
    const baseUrl = isIntl ? 'https://www.amazon.com' : 'https://www.amazon.es';
    const affiliateTag = isIntl
      ? (env && env.AMAZON_PARTNER_TAG_INTL) || 'vapegadgets22-20'
      : (env && env.AMAZON_PARTNER_TAG) || 'vapegadgets22-21';
    const acceptLanguage = isIntl ? 'en-US,en;q=0.9' : 'es-ES,es;q=0.9';
    const searchUrl = `${baseUrl}/s?k=${encodeURIComponent(query.trim())}`;

    const resp = await fetch(searchUrl, {
      headers: {
        'User-Agent':
          'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/125.0.0.0 Safari/537.36',
        'Accept-Language': acceptLanguage,
        Accept: 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
      },
    });

    const data = await resp.text();
    const results = [];
    const blocks = data.split('data-asin="').slice(1);

    for (const block of blocks) {
      const asin = block.substring(0, 10);
      if (!asin || !asin.startsWith('B')) continue;

      const titleMatch =
        block.match(/<h2[^>]*>[\s\S]*?<span[^>]*>([^<]+)<\/span>/) ||
        block.match(/<h2[^>]*>([^<]+)<\/h2>/);
      const rawTitle = titleMatch ? titleMatch[1].trim() : null;
      if (
        !rawTitle ||
        rawTitle.length < 5 ||
        rawTitle.includes('Resultados') ||
        rawTitle.includes('Results') ||
        rawTitle.toLowerCase().includes('patrocinado') ||
        rawTitle.toLowerCase().includes('sponsored')
      ) {
        continue;
      }

      const title = rawTitle
        .replace(/&amp;/g, '&')
        .replace(/&quot;/g, '"')
        .replace(/&#39;/g, "'")
        .replace(/&lt;/g, '<')
        .replace(/&gt;/g, '>')
        .replace(/&euro;/g, '€')
        .trim();

      const imgMatch = block.match(/src="(https:\/\/m\.media-amazon\.com\/images\/I\/[^"]+\.jpg)"/);
      const imageUrl = imgMatch
        ? imgMatch[1]
        : 'https://m.media-amazon.com/images/I/71uF2XB0kML._AC_UL320_.jpg';

      const priceWhole = block.match(/class="a-price-whole">([0-9.,]+)/);
      const priceFraction = block.match(/class="a-price-fraction">([0-9]+)/);
      const cleanWhole = priceWhole ? priceWhole[1].replace(/[.,]+$/, '') : '';
      const priceText = cleanWhole
        ? isIntl
          ? `$${cleanWhole}.${priceFraction ? priceFraction[1] : '00'}`
          : `${cleanWhole},${priceFraction ? priceFraction[1] : '00'} €`
        : isIntl
        ? 'View deal'
        : 'Ver oferta';

      const ratingMatch =
        block.match(/([0-9],[0-9]) de 5 estrellas/) ||
        block.match(/([0-9]\.[0-9]) out of 5 stars/);
      const rating = ratingMatch ? parseFloat(ratingMatch[1].replace(',', '.')) : 4.7;

      results.push({
        asin,
        title,
        imageUrl,
        priceText,
        rating,
        reviewsCount: 320,
        url: `${baseUrl}/dp/${asin}/?tag=${affiliateTag}&linkCode=ll1`,
      });

      if (results.length >= limit) break;
    }

    return Response.json({
      success: true,
      region,
      query: query.trim(),
      count: results.length,
      results,
    });
  } catch (err) {
    return Response.json({ success: false, error: err.message || 'Search error', results: [] }, { status: 500 });
  }
}
