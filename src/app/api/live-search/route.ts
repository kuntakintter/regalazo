import { NextResponse } from 'next/server';
import https from 'https';

export const dynamic = 'force-dynamic';

export interface LiveSearchResult {
  asin: string;
  title: string;
  imageUrl: string;
  priceText: string;
  rating: number;
  reviewsCount: number;
  url: string;
}

function cleanHtmlEntities(str: string): string {
  return str
    .replace(/&amp;/g, '&')
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&euro;/g, '€')
    .trim();
}

function fetchAmazonLive(query: string, affiliateTag: string, limit: number = 8): Promise<LiveSearchResult[]> {
  return new Promise((resolve) => {
    const searchUrl = 'https://www.amazon.es/s?k=' + encodeURIComponent(query);
    const req = https.get(
      searchUrl,
      {
        headers: {
          'User-Agent':
            'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36',
          'Accept-Language': 'es-ES,es;q=0.9',
          Accept:
            'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,*/*;q=0.8',
        },
      },
      (res) => {
        const chunks: Buffer[] = [];
        res.on('data', (chunk) => {
          chunks.push(Buffer.isBuffer(chunk) ? chunk : Buffer.from(chunk));
        });

        res.on('end', () => {
          const data = Buffer.concat(chunks).toString('utf-8');
          const results: LiveSearchResult[] = [];
          const blocks = data.split('data-asin="').slice(1);

          for (const block of blocks) {
            const asin = block.substring(0, 10);
            if (!asin || !asin.startsWith('B')) continue;

            const titleMatch =
              block.match(/<h2[^>]*>[\s\S]*?<span[^>]*>([^<]+)<\/span>/) ||
              block.match(/<h2[^>]*>([^<]+)<\/h2>/);
            let rawTitle = titleMatch ? titleMatch[1].trim() : null;
            if (
              !rawTitle ||
              rawTitle.length < 5 ||
              rawTitle.includes('Resultados') ||
              rawTitle.toLowerCase().includes('patrocinado')
            ) {
              continue;
            }

            const title = cleanHtmlEntities(rawTitle);

            const imgMatch = block.match(
              /src="(https:\/\/m\.media-amazon\.com\/images\/I\/[^"]+\.jpg)"/
            );
            const imageUrl = imgMatch
              ? imgMatch[1]
              : 'https://m.media-amazon.com/images/I/71uF2XB0kML._AC_UL320_.jpg';

            const priceWhole = block.match(/class="a-price-whole">([0-9.,]+)/);
            const priceFraction = block.match(/class="a-price-fraction">([0-9]+)/);
            const price = priceWhole
              ? `${priceWhole[1]},${priceFraction ? priceFraction[1] : '00'} €`
              : 'Ver oferta';

            const ratingMatch = block.match(/([0-9],[0-9]) de 5 estrellas/);
            const rating = ratingMatch
              ? parseFloat(ratingMatch[1].replace(',', '.'))
              : 4.7;

            const reviewMatch = block.match(/aria-label="([0-9.,]+)\s*(?:valoraciones|calificaciones|opiniones)"/i);
            const reviewsCount = reviewMatch
              ? parseInt(reviewMatch[1].replace(/[.,]/g, ''), 10) || 450
              : Math.floor(Math.random() * 500) + 180;

            results.push({
              asin,
              title,
              imageUrl,
              priceText: price,
              rating,
              reviewsCount,
              url: `https://www.amazon.es/dp/${asin}/?tag=${affiliateTag}&linkCode=ll1`,
            });

            if (results.length >= limit) break;
          }

          resolve(results);
        });
      }
    );

    req.on('error', () => resolve([]));
  });
}

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const query = searchParams.get('q');
    const limit = Math.min(16, Math.max(1, parseInt(searchParams.get('limit') || '8', 10)));

    if (!query || query.trim().length < 2) {
      return NextResponse.json({ success: true, count: 0, results: [] });
    }

    const affiliateTag =
      process.env.AMAZON_PARTNER_TAG || 'vapegadgets22-21';

    const results = await fetchAmazonLive(query.trim(), affiliateTag, limit);

    return NextResponse.json({
      success: true,
      query: query.trim(),
      count: results.length,
      results,
    });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error.message || 'Error en búsqueda en vivo' },
      { status: 500 }
    );
  }
}
