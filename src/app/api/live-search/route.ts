import { NextResponse } from 'next/server';
import https from 'https';

export const dynamic = 'force-dynamic';

interface LiveSearchResult {
  asin: string;
  title: string;
  imageUrl: string | null;
  priceText: string;
  rating: number;
  url: string;
}

function fetchAmazonLive(query: string, affiliateTag: string): Promise<LiveSearchResult[]> {
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
        let data = '';
        res.on('data', (chunk) => (data += chunk));
        res.on('end', () => {
          const results: LiveSearchResult[] = [];
          const blocks = data.split('data-asin="').slice(1);

          for (const block of blocks) {
            const asin = block.substring(0, 10);
            if (!asin || !asin.startsWith('B')) continue;

            const titleMatch =
              block.match(/<h2[^>]*>[\s\S]*?<span[^>]*>([^<]+)<\/span>/) ||
              block.match(/<h2[^>]*>([^<]+)<\/h2>/);
            const title = titleMatch ? titleMatch[1].trim() : null;
            if (
              !title ||
              title.length < 5 ||
              title.includes('Resultados') ||
              title.toLowerCase().includes('patrocinado')
            ) {
              continue;
            }

            const imgMatch = block.match(
              /src="(https:\/\/m\.media-amazon\.com\/images\/I\/[^"]+\.jpg)"/
            );
            const imageUrl = imgMatch ? imgMatch[1] : null;

            const priceWhole = block.match(/class="a-price-whole">([0-9.,]+)/);
            const priceFraction = block.match(/class="a-price-fraction">([0-9]+)/);
            const price = priceWhole
              ? `${priceWhole[1]},${priceFraction ? priceFraction[1] : '00'} €`
              : 'Ver en Amazon';

            const ratingMatch = block.match(/([0-9],[0-9]) de 5 estrellas/);
            const rating = ratingMatch
              ? parseFloat(ratingMatch[1].replace(',', '.'))
              : 4.6;

            results.push({
              asin,
              title,
              imageUrl,
              priceText: price,
              rating,
              url: `https://www.amazon.es/dp/${asin}/?tag=${affiliateTag}&linkCode=ll1`,
            });

            if (results.length >= 4) break;
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

    if (!query || query.trim().length < 2) {
      return NextResponse.json({ success: true, count: 0, results: [] });
    }

    const affiliateTag =
      process.env.AMAZON_PARTNER_TAG || 'vapegadgets22-21';

    const results = await fetchAmazonLive(query.trim(), affiliateTag);

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
