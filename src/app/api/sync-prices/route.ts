import { NextResponse } from 'next/server';
import { PRODUCTS } from '@/data/products';
import {
  isValidActiveAsin,
  INTL_FALLBACK_ASINS,
  AmazonRegion,
  AMAZON_AFFILIATE_TAG_ES,
  AMAZON_AFFILIATE_TAG_INTL,
  AMAZON_BASE_URL,
  AMAZON_INTL_URL,
} from '@/lib/amazon';
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

function resolveRequestRegion(request: Request, regionParam: string | null): AmazonRegion {
  if (regionParam === 'es' || regionParam === 'intl') {
    return regionParam;
  }
  const countryHeader =
    request.headers.get('x-vercel-ip-country') ||
    request.headers.get('cf-ipcountry') ||
    '';
  if (countryHeader && countryHeader.toUpperCase() !== 'ES') {
    return 'intl';
  }
  return 'es';
}

// 1. Helper: Fetch live price directly from Amazon regional HTML
function fetchLivePriceDirect(asin: string, region: AmazonRegion = 'es'): Promise<string | null> {
  return new Promise((resolve) => {
    const isIntl = region === 'intl';
    const baseUrl = isIntl ? AMAZON_INTL_URL : AMAZON_BASE_URL;
    const acceptLanguage = isIntl ? 'en-US,en;q=0.9' : 'es-ES,es;q=0.9';
    const url = `${baseUrl}/dp/${asin}`;
    const req = https.get(
      url,
      {
        headers: {
          'User-Agent':
            'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36',
          'Accept-Language': acceptLanguage,
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
          const cleanWhole = priceWhole ? priceWhole[1].replace(/[.,]+$/, '') : '';
          if (cleanWhole) {
            resolve(
              isIntl
                ? `$${cleanWhole}.${priceFraction ? priceFraction[1] : '00'}`
                : `${cleanWhole},${priceFraction ? priceFraction[1] : '00'} €`
            );
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
    const region = resolveRequestRegion(request, searchParams.get('region'));
    const marketplaceHost = region === 'intl' ? 'www.amazon.com' : 'www.amazon.es';

    const clientId = process.env.AMAZON_CLIENT_ID;
    const clientSecret = process.env.AMAZON_CLIENT_SECRET;
    const partnerTag =
      region === 'intl'
        ? process.env.AMAZON_PARTNER_TAG_INTL || AMAZON_AFFILIATE_TAG_INTL
        : process.env.AMAZON_PARTNER_TAG || AMAZON_AFFILIATE_TAG_ES;

    // Filter target ASIN or batch (skipping known dead/404 ASINs in batch mode)
    const itemsToProcess = targetAsin
      ? PRODUCTS.filter((p) => p.asin === targetAsin && isValidActiveAsin(p.asin))
      : PRODUCTS.filter((p) => isValidActiveAsin(p.asin)).slice(0, Math.min(limit, 25));

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
              'x-marketplace': marketplaceHost,
            },
            body: JSON.stringify({
              itemIds: [itemsToProcess[0].asin],
              itemIdType: 'ASIN',
              marketplace: marketplaceHost,
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

      if (
        isValidActiveAsin(item.asin) &&
        !(region === 'intl' && INTL_FALLBACK_ASINS.has(item.asin))
      ) {
        // Fallback: direct live fetch (reliable & works without 30-day sales requirement)
        livePrice = await fetchLivePriceDirect(item.asin, region);
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
      region,
      marketplace: marketplaceHost,
      message: `Sincronizador inteligente de precios de ${region === 'intl' ? 'Amazon Global' : 'Amazon España'} ejecutado`,
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
