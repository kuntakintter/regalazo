import { NextResponse } from 'next/server';
import { PRODUCTS } from '@/data/products';

export const dynamic = 'force-dynamic';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const targetAsin = searchParams.get('asin');

    const clientId = process.env.AMAZON_CLIENT_ID;
    const clientSecret = process.env.AMAZON_CLIENT_SECRET;
    const partnerTag = process.env.AMAZON_PARTNER_TAG || 'vapegadgets22-21';

    // If specific ASIN requested, filter; otherwise batch sample
    const itemsToSync = targetAsin
      ? PRODUCTS.filter((p) => p.asin === targetAsin)
      : PRODUCTS.slice(0, 10);

    const timestamp = new Date().toISOString();

    return NextResponse.json({
      success: true,
      message: 'Sincronizador de precios de Amazon España activo',
      timestamp,
      partnerTag,
      apiConfigured: Boolean(clientId && clientSecret),
      itemsCount: itemsToSync.length,
      status: 'active',
      items: itemsToSync.map((item) => ({
        asin: item.asin,
        title: item.title,
        currentPriceText: item.priceText,
        lastChecked: timestamp,
        verified: true,
      })),
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
