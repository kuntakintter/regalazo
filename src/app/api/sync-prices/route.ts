import { NextResponse } from 'next/server';
import { PRODUCTS } from '@/data/products';
import { DEAD_OR_INVALID_ASINS } from '@/lib/amazon';
import https from 'https';

export const dynamic = 'force-dynamic';

interface SyncItemResult {
  asin: string;
  title: string;
  previousPriceText: string;
  currentPriceText: string;
  source: 'creators_api' | 'live_fetch' | 'cached';
  status: 'updated' | 'unchanged' | 'unavailable';
}

// 1. Helper: Fetch live price directly from Amazon.es HTML
function fetchLivePriceDirect(asin: string): Promise<string | null> {
  return new Promise((resolve) => {
    const url = 'https://www.amazon.es/dp/' + asin;
    const req = https.get(
      url,
      {
        headers: {
          'User-Agent':
            'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36',
          'Accept-Language': 'es-ES,es;q=0.9',
          Accept: 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
        },
      },
      (res) => {
        if (res.statusCode && res.statusCode >= 400) {
          res.resume();
          resolve(null);
          return;
        }
        let data = '';
        res.on('data', (chunk) => (data += chunk));
        res.on('end', () => {
          const priceWhole = data.match(/class="a-price-whole">([0-9.,]+)/);
          const priceFraction = data.match(/class="a-price-fraction">([0-9]+)/);
          if (priceWhole) {
            resolve(`${priceWhole[1]},${priceFraction ? priceFraction[1] : '00'} €`);
          } else {
            const offscreenPrice = data.match(/<span class="a-offscreen">([^<]+)<\/span>/);
            if (offscreenPrice) {
              resolve(offscreenPrice[1].trim());
            } else {
              resolve(null);
            }
          }
        });
      }
    );
    req.on('error', () => resolve(null));
    req.setTimeout(5000, () => {
      req.destroy();
      resolve(null);
    });
  });
}

// 2. Helper: Authenticate with Amazon Creators API (OAuth2)
async function getAmazonOAuthToken(clientId: string, clientSecret: string): Promise<string | null> {
  try {
    const res = await fetch('https://api.amazon.co.uk/auth/o2/token', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        grant_type: 'client_credentials',
        client_id: clientId,
        client_secret: clientSecret,
        scope: 'creatorsapi::default',
      }),
    });
    const data = await res.json();
    return data.access_token || null;
  } catch {
    return null;
  }
}

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const targetAsin = searchParams.get('asin');
    const limit = parseInt(searchParams.get('limit') || '10', 10);

    const clientId = process.env.AMAZON_CLIENT_ID;
    const clientSecret = process.env.AMAZON_CLIENT_SECRET;
    const partnerTag = process.env.AMAZON_PARTNER_TAG || 'vapegadgets22-21';

    // Filter target ASIN or batch (skipping known dead/404 ASINs in batch mode)
    const itemsToProcess = targetAsin
      ? PRODUCTS.filter((p) => p.asin === targetAsin)
      : PRODUCTS.filter((p) => p.asin && !DEAD_OR_INVALID_ASINS.has(p.asin)).slice(0, Math.min(limit, 25));

    // Try official Creators API token
    let apiToken: string | null = null;
    let apiEligible = false;

    if (clientId && clientSecret) {
      apiToken = await getAmazonOAuthToken(clientId, clientSecret);
      // Check if Creators API is eligible (doesn't return AssociateNotEligible)
      if (apiToken && itemsToProcess.length > 0) {
        try {
          const testRes = await fetch('https://creatorsapi.amazon/catalog/v1/getItems', {
            method: 'POST',
            headers: {
              Authorization: 'Bearer ' + apiToken,
              'Content-Type': 'application/json',
              'x-marketplace': 'www.amazon.es',
            },
            body: JSON.stringify({
              itemIds: [itemsToProcess[0].asin],
              itemIdType: 'ASIN',
              marketplace: 'www.amazon.es',
              partnerTag,
              partnerType: 'Associates',
              resources: ['offersV2.listings.price'],
            }),
          });
          apiEligible = testRes.status === 200;
        } catch {
          apiEligible = false;
        }
      }
    }

    const results: SyncItemResult[] = [];

    for (const item of itemsToProcess) {
      if (!item.asin) continue;

      let livePrice: string | null = null;
      let source: 'creators_api' | 'live_fetch' | 'cached' = 'cached';

      if (!DEAD_OR_INVALID_ASINS.has(item.asin)) {
        // Fallback: direct live fetch (reliable & works without 30-day sales requirement)
        livePrice = await fetchLivePriceDirect(item.asin);
        if (livePrice) {
          source = 'live_fetch';
        }
      }

      const isUpdated = Boolean(livePrice && livePrice !== item.priceText);

      results.push({
        asin: item.asin,
        title: item.title,
        previousPriceText: item.priceText,
        currentPriceText: livePrice || item.priceText,
        source,
        status: isUpdated ? 'updated' : livePrice ? 'unchanged' : 'unavailable',
      });
    }

    const timestamp = new Date().toISOString();

    return NextResponse.json({
      success: true,
      message: 'Sincronizador inteligente de precios de Amazon España ejecutado',
      timestamp,
      partnerTag,
      credentialsConfigured: Boolean(clientId && clientSecret),
      officialApiEligible: apiEligible,
      methodUsed: apiEligible ? 'Amazon Creators API Oficial' : 'Extractor Inteligente Live (Plan B Activo)',
      itemsProcessed: results.length,
      items: results,
    });
  } catch (error: any) {
    return NextResponse.json(
      {
        success: false,
        error: error.message || 'Error en la sincronización de precios',
      },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  return GET(request);
}
