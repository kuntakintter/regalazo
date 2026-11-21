function parseNumericPrice(raw) {
  if (!raw) return 0;
  const cleaned = raw.replace(/\u00a0/g, ' ').replace(/[^0-9.,]/g, '').trim();
  if (!cleaned) return 0;
  // European format: 1.299,99 or 79,99
  if (cleaned.includes(',') && (!cleaned.includes('.') || cleaned.lastIndexOf(',') > cleaned.lastIndexOf('.'))) {
    return parseFloat(cleaned.replace(/\./g, '').replace(',', '.')) || 0;
  }
  // US format: 1,299.99 or 79.99
  return parseFloat(cleaned.replace(/,/g, '')) || 0;
}

function formatMoney(amount, isIntl) {
  if (!amount || amount <= 0) return '';
  if (isIntl) {
    return `$${amount.toFixed(2)}`;
  }
  return `${amount.toFixed(2).replace('.', ',')} €`;
}

export async function onRequestGet(context) {
  const { request, env } = context;
  try {
    const url = new URL(request.url);
    const query = url.searchParams.get('q');
    const limit = Math.min(40, Math.max(1, parseInt(url.searchParams.get('limit') || '8', 10)));
    const page = Math.min(10, Math.max(1, parseInt(url.searchParams.get('page') || '1', 10)));
    const minPrice = parseFloat(url.searchParams.get('minPrice') || '') || 0;
    const maxPrice = parseFloat(url.searchParams.get('maxPrice') || '') || 0;
    const sort = url.searchParams.get('sort') || 'featured';
    const dealsOnly = url.searchParams.get('dealsOnly') === '1';

    const regionParam = url.searchParams.get('region');
    const countryHeader = request.headers.get('cf-ipcountry') || '';
    const region =
      regionParam === 'es' || regionParam === 'intl'
        ? regionParam
        : countryHeader && countryHeader.toUpperCase() !== 'ES'
        ? 'intl'
        : 'es';

    if (!query || query.trim().length < 2) {
      return Response.json({ success: true, region, count: 0, page, results: [] });
    }

    const isIntl = region === 'intl';
    const baseUrl = isIntl ? 'https://www.amazon.com' : 'https://www.amazon.es';
    const affiliateTag = isIntl
      ? (env && env.AMAZON_PARTNER_TAG_INTL) || 'vapegadgets22-20'
      : (env && env.AMAZON_PARTNER_TAG) || 'vapegadgets22-21';
    const acceptLanguage = isIntl ? 'en-US,en;q=0.9' : 'es-ES,es;q=0.9';

    const amazonParams = new URLSearchParams();
    amazonParams.set('k', query.trim());
    if (page > 1) amazonParams.set('page', String(page));
    if (minPrice > 0) amazonParams.set('low-price', String(Math.floor(minPrice)));
    if (maxPrice > 0) amazonParams.set('high-price', String(Math.ceil(maxPrice)));
    if (sort === 'price-asc') amazonParams.set('s', 'price-asc-rank');
    else if (sort === 'price-desc') amazonParams.set('s', 'price-desc-rank');
    else if (sort === 'rating') amazonParams.set('s', 'review-rank');

    const searchUrl = `${baseUrl}/s?${amazonParams.toString()}`;

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
    const seenAsins = new Set();
    const blocks = data.split('data-asin="').slice(1);

    for (const block of blocks) {
      const asin = block.substring(0, 10);
      if (!asin || !/^[A-Z0-9]{10}$/.test(asin) || seenAsins.has(asin)) continue;

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

      // Require a REAL Amazon product photo (never invent or use placeholder images)
      const imgMatch = block.match(/src="(https:\/\/m\.media-amazon\.com\/images\/I\/[^"]+\.(?:jpg|jpeg|png|webp))"/i);
      if (!imgMatch || !imgMatch[1]) continue;
      const imageUrl = imgMatch[1];

      // Require a REAL current price from Amazon HTML (never invent prices)
      const priceWhole = block.match(/class="a-price-whole">([0-9.,]+)/);
      const priceFraction = block.match(/class="a-price-fraction">([0-9]+)/);
      const cleanWhole = priceWhole ? priceWhole[1].replace(/[.,]+$/, '') : '';
      if (!cleanWhole) continue;

      const priceText = isIntl
        ? `$${cleanWhole}.${priceFraction ? priceFraction[1] : '00'}`
        : `${cleanWhole},${priceFraction ? priceFraction[1] : '00'} €`;
      const currentNumeric = parseNumericPrice(priceText);
      if (!currentNumeric || currentNumeric <= 0) continue;

      // Apply exact min/max price bounds if specified
      if (minPrice > 0 && currentNumeric < minPrice) continue;
      if (maxPrice > 0 && currentNumeric > maxPrice) continue;

      // Extract REAL crossed-out original price (a-text-price with data-a-strike="true")
      const strikeMatch =
        block.match(/a-text-price[^>]*data-a-strike="true"[^>]*>[\s\S]*?<span class="a-offscreen">([^<]+)<\/span>/) ||
        block.match(/data-a-strike="true"[^>]*a-text-price[^>]*>[\s\S]*?<span class="a-offscreen">([^<]+)<\/span>/) ||
        block.match(/class="a-price a-text-price"[^>]*><span class="a-offscreen">([^<]+)<\/span>/);

      let originalPriceText = undefined;
      let discountPercent = undefined;
      let savingsText = undefined;

      if (strikeMatch && strikeMatch[1]) {
        const cleanOrig = strikeMatch[1].replace(/\u00a0/g, ' ').replace(/&euro;/g, '€').trim();
        const origNumeric = parseNumericPrice(cleanOrig);
        if (origNumeric > currentNumeric) {
          const pct = Math.round(((origNumeric - currentNumeric) / origNumeric) * 100);
          if (pct >= 3 && pct <= 92) {
            originalPriceText = formatMoney(origNumeric, isIntl);
            discountPercent = pct;
            savingsText = formatMoney(origNumeric - currentNumeric, isIntl);
          }
        }
      }

      // Extract REAL Amazon deal badge if present (e.g. "Oferta Black Friday", "Gran Oferta Black Friday", "Oferta flash")
      const badgeMatches = [...block.matchAll(/class="a-badge-text"[^>]*>([^<]+)<\/span>/g)]
        .map((m) => m[1].replace(/\u00a0/g, ' ').trim())
        .filter((b) =>
          /black friday|oferta|flash|deal|cyber|descuento|rebaja|ahorr/i.test(b)
        );
      const dealBadge = badgeMatches.length > 0 ? badgeMatches[0] : undefined;

      if (dealsOnly && !discountPercent && !dealBadge) {
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

      const ratingMatch =
        block.match(/([0-9],[0-9]) de 5 estrellas/) ||
        block.match(/([0-9]\.[0-9]) out of 5 stars/);
      const rating = ratingMatch ? parseFloat(ratingMatch[1].replace(',', '.')) : 0;

      const reviewMatch =
        block.match(/aria-label="([0-9.,]+)\s*(?:valoraciones|calificaciones|opiniones|ratings|reviews)"/i) ||
        block.match(/class="a-size-base s-underline-text">([0-9.,]+)<\/span>/);
      const reviewsCount = reviewMatch
        ? parseInt(reviewMatch[1].replace(/[.,]/g, ''), 10) || 0
        : 0;

      seenAsins.add(asin);
      results.push({
        asin,
        title,
        imageUrl,
        priceText,
        originalPriceText,
        discountPercent,
        savingsText,
        dealBadge,
        rating,
        reviewsCount,
        url: `${baseUrl}/dp/${asin}/?tag=${affiliateTag}&linkCode=ll1`,
      });
    }

    // Apply discount sorting on the server if requested
    if (sort === 'discount-desc') {
      results.sort((a, b) => (b.discountPercent || 0) - (a.discountPercent || 0));
    } else if (sort === 'price-asc') {
      results.sort((a, b) => parseNumericPrice(a.priceText) - parseNumericPrice(b.priceText));
    } else if (sort === 'price-desc') {
      results.sort((a, b) => parseNumericPrice(b.priceText) - parseNumericPrice(a.priceText));
    } else if (sort === 'rating') {
      results.sort((a, b) => (b.rating || 0) - (a.rating || 0));
    }

    const sliced = results.slice(0, limit);

    return Response.json({
      success: true,
      region,
      query: query.trim(),
      page,
      count: sliced.length,
      results: sliced,
    });
  } catch (err) {
    return Response.json(
      { success: false, error: err.message || 'Search error', results: [] },
      { status: 500 }
    );
  }
}
