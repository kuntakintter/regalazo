import { NextResponse } from 'next/server';
import { buildShardSitemapXml, generateAllSitemapShards } from '@/lib/sitemapEngine';

export const dynamic = 'force-static';
export const revalidate = 86400; // 24 hours

export async function generateStaticParams() {
  const shards = generateAllSitemapShards();
  return shards.map((s) => ({
    filename: s.filename,
  }));
}

export async function GET(
  _request: Request,
  context: { params: Promise<{ filename: string }> }
) {
  const { filename } = await context.params;
  const xml = buildShardSitemapXml(filename);

  if (!xml) {
    return new NextResponse('Sitemap shard not found', {
      status: 404,
      headers: {
        'Content-Type': 'text/plain; charset=utf-8',
      },
    });
  }

  return new NextResponse(xml, {
    status: 200,
    headers: {
      'Content-Type': 'application/xml; charset=utf-8',
      'Cache-Control': 'public, max-age=86400, s-maxage=86400, stale-while-revalidate=43200',
    },
  });
}
