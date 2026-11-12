import { NextRequest, NextResponse } from 'next/server';
import { ALL_SITE_PRODUCTS } from '@/data/allCatalogProducts';
import {
  ALL_STATIC_HUB_SLUGS,
  BASE_SITE_URL,
  SEO_FILTER_ROUTES,
  matchProductsForFilter,
} from '@/lib/filterRoutes';
import { SEO_AGE_ROUTES } from '@/lib/seoRoutes';
import {
  PASSION_HUB_FILTERS_MAP,
  getPassionHubFilterProducts,
} from '@/lib/passionHubFilters';
import { localizeRoutePath } from '@/lib/localizedSlugs';
import {
  getLocalizedAgeMeta,
  getLocalizedFilterMeta,
  getLocalizedPassionHubFilterMeta,
  getLocalizedStaticHubMeta,
  normalizeLocaleKey,
} from '@/lib/i18nContent';
import { HUB_OG_SNIPPETS, getCategoryOgImage } from '@/lib/ogMetadata';

function escapeXml(unsafe: string): string {
  return (unsafe || '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;');
}

interface PinFeedItem {
  title: string;
  link: string;
  description: string;
  imageUrl: string;
  category: string;
  pubDate: string;
}

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const rawLang = searchParams.get('lang') || 'es';
  const localeKey = normalizeLocaleKey(rawLang);
  const board = (searchParams.get('board') || 'all').toLowerCase();

  const items: PinFeedItem[] = [];
  const nowMs = Date.now();
  let indexOffset = 0;

  const nextPubDate = () => {
    const dt = new Date(nowMs - indexOffset * 3600 * 1000);
    indexOffset += 1;
    return dt.toUTCString();
  };

  // 1. TABLERO EDADES (9 etapas + 18 edades exactas 1-18 años)
  if (board === 'all' || board === 'edades') {
    for (const ageRoute of Object.values(SEO_AGE_ROUTES)) {
      const meta = getLocalizedAgeMeta(localeKey, ageRoute.ageSlug);
      const matched = ALL_SITE_PRODUCTS.filter((p) => p.ageRange === ageRoute.ageId);
      const topThree = matched
        .slice(0, 3)
        .map((p, idx) => `${idx + 1}. ${p.title} (${p.priceText})`)
        .join(' · ');
      const snippet = HUB_OG_SNIPPETS[ageRoute.ageSlug];
      const heroImage =
        matched.find((p) => p.imageUrl && p.imageUrl.startsWith('http'))?.imageUrl ||
        snippet?.imageUrl ||
        `${BASE_SITE_URL}/og-cover.png`;
      const link = `${BASE_SITE_URL}${localizeRoutePath(localeKey, `/${ageRoute.ageSlug}`)}`;

      items.push({
        title: meta.socialTitle || meta.h1,
        link,
        description: `${meta.description}${topThree ? ` | Top Recomendados: ${topThree}` : ''} #Regalos #IdeasDeRegalo #UnBuenRegalo`,
        imageUrl: heroImage,
        category: 'Regalos por Edad',
        pubDate: nextPubDate(),
      });
    }
  }

  // 2. TABLERO OCASIONES Y FAMILIA (Amigo Invisible, Cumpleaños, Día del Padre/Madre, Novio/Novia, etc.)
  if (board === 'all' || board === 'ocasiones') {
    for (const hubSlug of ALL_STATIC_HUB_SLUGS) {
      const meta = getLocalizedStaticHubMeta(localeKey, hubSlug);
      const snippet = HUB_OG_SNIPPETS[hubSlug];
      const heroImage = snippet?.imageUrl || `${BASE_SITE_URL}/og-cover.png`;
      const link = `${BASE_SITE_URL}${localizeRoutePath(localeKey, `/${hubSlug}`)}`;

      items.push({
        title: meta.socialTitle || meta.h1,
        link,
        description: `${meta.description} #RegalosOriginales #IdeasDeRegalo #UnBuenRegalo`,
        imageUrl: heroImage,
        category: 'Ocasiones Especiales',
        pubDate: nextPubDate(),
      });
    }

    const occasionSlugs = [
      'regalos-amigo-invisible',
      'regalos-cumpleanos-originales',
      'regalos-primera-comunion',
      'regalos-san-valentin-y-aniversario',
      'regalos-dia-del-padre',
      'regalos-dia-de-la-madre',
      'regalos-para-padres',
      'regalos-para-madres',
      'regalos-para-abuelos',
      'regalos-para-profesores',
      'regalos-para-el',
      'regalos-para-ella',
    ];

    for (const slug of occasionSlugs) {
      const flt = SEO_FILTER_ROUTES[slug];
      if (!flt) continue;
      const meta = getLocalizedFilterMeta(localeKey, slug);
      const matched = matchProductsForFilter(flt, ALL_SITE_PRODUCTS);
      const topThree = matched
        .slice(0, 3)
        .map((p, idx) => `${idx + 1}. ${p.title} (${p.priceText})`)
        .join(' · ');
      const heroImage =
        matched.find((p) => p.imageUrl && p.imageUrl.startsWith('http'))?.imageUrl ||
        getCategoryOgImage(flt.label).url;
      const link = `${BASE_SITE_URL}${localizeRoutePath(localeKey, `/${slug}`)}`;

      items.push({
        title: meta.socialTitle || meta.h1,
        link,
        description: `${meta.description}${topThree ? ` | Destacados: ${topThree}` : ''} #Regalos #AmigoInvisible #Cumpleaños`,
        imageUrl: heroImage,
        category: 'Ocasiones y Familia',
        pubDate: nextPubDate(),
      });
    }
  }

  // 3. TABLERO PASIONES Y TEMÁTICAS (9 Hubs × 53 Filtros + Categorías y Anime)
  if (board === 'all' || board === 'pasiones') {
    for (const [hubSlug, filters] of Object.entries(PASSION_HUB_FILTERS_MAP)) {
      for (const hf of filters) {
        const meta = getLocalizedPassionHubFilterMeta(
          localeKey,
          hubSlug,
          hf.label,
          hf.icon
        );
        const matched = getPassionHubFilterProducts(hubSlug, hf.id);
        const topThree = matched
          .slice(0, 3)
          .map((p, idx) => `${idx + 1}. ${p.title} (${p.priceText})`)
          .join(' · ');
        const heroImage =
          matched.find((p) => p.imageUrl && p.imageUrl.startsWith('http'))?.imageUrl ||
          HUB_OG_SNIPPETS[hubSlug]?.imageUrl ||
          `${BASE_SITE_URL}/og-cover.png`;
        const link = `${BASE_SITE_URL}${localizeRoutePath(localeKey, `/${hubSlug}/${hf.slug}`)}`;

        items.push({
          title: meta.socialTitle || meta.h1,
          link,
          description: `${meta.description}${topThree ? ` | Top Selección: ${topThree}` : ''} #Regalos #IdeasDeRegalo`,
          imageUrl: heroImage,
          category: 'Pasiones y Aficiones',
          pubDate: nextPubDate(),
        });
      }
    }

    for (const flt of Object.values(SEO_FILTER_ROUTES)) {
      if (flt.filterKind === 'price' || flt.filterKind === 'gender') continue;
      const meta = getLocalizedFilterMeta(localeKey, flt.slug);
      const matched = matchProductsForFilter(flt, ALL_SITE_PRODUCTS);
      const heroImage =
        matched.find((p) => p.imageUrl && p.imageUrl.startsWith('http'))?.imageUrl ||
        getCategoryOgImage(flt.label).url;
      const link = `${BASE_SITE_URL}${localizeRoutePath(localeKey, `/${flt.slug}`)}`;

      items.push({
        title: meta.socialTitle || meta.h1,
        link,
        description: `${meta.description} #Regalos #Top10 #UnBuenRegalo`,
        imageUrl: heroImage,
        category: 'Temáticas y Categorías',
        pubDate: nextPubDate(),
      });
    }
  }

  // 4. TABLERO PRESUPUESTOS (Menos de 15€, 20€, 30€, etc.)
  if (board === 'all' || board === 'presupuestos') {
    for (const flt of Object.values(SEO_FILTER_ROUTES)) {
      if (flt.filterKind !== 'price') continue;
      const meta = getLocalizedFilterMeta(localeKey, flt.slug);
      const matched = matchProductsForFilter(flt, ALL_SITE_PRODUCTS);
      const topThree = matched
        .slice(0, 3)
        .map((p, idx) => `${idx + 1}. ${p.title} (${p.priceText})`)
        .join(' · ');
      const heroImage =
        matched.find((p) => p.imageUrl && p.imageUrl.startsWith('http'))?.imageUrl ||
        `${BASE_SITE_URL}/og-cover.png`;
      const link = `${BASE_SITE_URL}${localizeRoutePath(localeKey, `/${flt.slug}`)}`;

      items.push({
        title: meta.socialTitle || meta.h1,
        link,
        description: `${meta.description}${topThree ? ` | Ideas: ${topThree}` : ''} #RegalosBaratos #AmigoInvisible`,
        imageUrl: heroImage,
        category: 'Regalos por Presupuesto',
        pubDate: nextPubDate(),
      });
    }
  }

  const selfUrl = `${BASE_SITE_URL}/feed/pinterest.xml?lang=${encodeURIComponent(localeKey)}&board=${encodeURIComponent(board)}`;

  const xmlItems = items
    .slice(0, 150)
    .map(
      (item) => `    <item>
      <title>${escapeXml(item.title)}</title>
      <link>${escapeXml(item.link)}</link>
      <guid isPermaLink="true">${escapeXml(item.link)}</guid>
      <pubDate>${escapeXml(item.pubDate)}</pubDate>
      <category>${escapeXml(item.category)}</category>
      <description>${escapeXml(item.description)}</description>
      <enclosure url="${escapeXml(item.imageUrl)}" length="150000" type="image/jpeg" />
      <media:content url="${escapeXml(item.imageUrl)}" medium="image" type="image/jpeg" />
    </item>`
    )
    .join('\n');

  const rssXml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:media="http://search.yahoo.com/mrss/" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>Un Buen Regalo — Ideas de Regalo y Comparativas (${escapeXml(localeKey.toUpperCase())} · ${escapeXml(board.toUpperCase())})</title>
    <link>${BASE_SITE_URL}</link>
    <description>Guía verificada con los mejores regalos por edad, ocasión, afición y presupuesto en Amazon.</description>
    <language>${escapeXml(localeKey)}</language>
    <atom:link href="${escapeXml(selfUrl)}" rel="self" type="application/rss+xml" />
${xmlItems}
  </channel>
</rss>`;

  return new NextResponse(rssXml, {
    status: 200,
    headers: {
      'Content-Type': 'application/rss+xml; charset=utf-8',
      'Cache-Control': 'public, s-maxage=3600, stale-while-revalidate=86400',
    },
  });
}
