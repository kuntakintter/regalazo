import { NextResponse } from 'next/server';
import { revalidatePath } from 'next/cache';
import { generateAllSitemapShards } from '@/lib/sitemapEngine';

export const dynamic = 'force-dynamic';

/**
 * Automated 24-hour Sitemap Regeneration Cron Job (`/api/cron/sitemaps`).
 * Recomputes the active stock matrix across all 27 languages & 4 filter categories
 * and revalidates `/sitemap.xml` plus all `/sitemaps/sitemap-*.xml` static shards.
 */
export async function GET() {
  const shards = generateAllSitemapShards(true);
  revalidatePath('/sitemap.xml');

  let totalUrls = 0;
  for (const shard of shards) {
    totalUrls += shard.entries.length;
    revalidatePath(`/sitemaps/${shard.filename}`);
  }

  return NextResponse.json(
    {
      ok: true,
      regeneratedAt: new Date().toISOString(),
      totalShards: shards.length,
      totalActiveUrls: totalUrls,
      sitemapIndex: 'https://www.unbuenregalo.es/sitemap.xml',
    },
    { status: 200 }
  );
}
