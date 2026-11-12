import { NextRequest, NextResponse } from 'next/server';
import { ALL_SITE_PRODUCTS } from '@/data/allCatalogProducts';
import { AUTOMOVIL_PRODUCTS } from '@/data/automovilData';
import { CAFE_PRODUCTS } from '@/data/cafeData';
import { CICLISMO_PRODUCTS } from '@/data/ciclismoData';
import { GAMING_PRODUCTS } from '@/data/gamingData';
import { GTA_PRODUCTS } from '@/data/gtaData';
import { HALLOWEEN_PRODUCTS } from '@/data/halloweenData';
import { MASCOTAS_PRODUCTS } from '@/data/mascotasData';
import { MOTORISTA_PRODUCTS } from '@/data/motoristasData';
import { NAVIDAD_PRODUCTS } from '@/data/navidadData';
import {
  BASE_SITE_URL,
  SEO_FILTER_ROUTES,
  matchProductsForFilter,
  matchProductsForAgeAndFilter,
} from '@/lib/filterRoutes';
import {
  PASSION_HUB_FILTERS_MAP,
  getPassionHubFilterProducts,
} from '@/lib/passionHubFilters';
import { matchProductsForSubcategory } from '@/lib/subcategoryMatcher';
import { localizeRoutePath } from '@/lib/localizedSlugs';
import {
  applyCurrencyDisplay,
  getLocaleCurrency,
  getLocalizedAgeFilterMeta,
  getLocalizedAgeMeta,
  getLocalizedFilterMeta,
  getLocalizedPassionHubFilterMeta,
  getLocalizedStaticHubMeta,
  getLocalizedSubcategoryMeta,
  getUiStrings,
  normalizeLocaleKey,
} from '@/lib/i18nContent';
import { HUB_OG_SNIPPETS, getCategoryOgImage } from '@/lib/ogMetadata';
import {
  ALL_SITEMAP_LOCALES,
  CanonicalRouteSpec,
  SITEMAP_CATEGORIES,
  SitemapCategory,
  getActiveStockForRoute,
  getAllCanonicalRouteSpecs,
} from '@/lib/sitemapEngine';

function escapeXml(unsafe: string): string {
  return (unsafe || '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;');
}

interface ProductSummaryLike {
  title: string;
  priceText?: string;
  imageUrl?: string;
}

const HUB_ITEMS_MAP: Record<string, ProductSummaryLike[]> = {
  motoristas: MOTORISTA_PRODUCTS,
  automovil: AUTOMOVIL_PRODUCTS,
  ciclismo: CICLISMO_PRODUCTS,
  gaming: GAMING_PRODUCTS,
  'amantes-del-cafe': CAFE_PRODUCTS,
  mascotas: MASCOTAS_PRODUCTS,
  halloween: HALLOWEEN_PRODUCTS,
  navidad: NAVIDAD_PRODUCTS,
  'carta-papa-noel': NAVIDAD_PRODUCTS,
  'regalos-gta-6': GTA_PRODUCTS,
};

const LOCALIZED_HASHTAGS: Record<string, string> = {
  es: '#Regalos #IdeasDeRegalo #UnBuenRegalo #QueRegalar',
  'es-us': '#Regalos #IdeasDeRegalo #UnBuenRegalo #QueRegalar',
  en: '#GiftIdeas #BestGifts #Gifts2026 #GiftGuide',
  'en-gb': '#GiftIdeas #BestGifts #GiftsUK #GiftGuide',
  fr: '#IdeeCadeau #Cadeaux #MeilleursCadeaux #GuideCadeaux',
  de: '#Geschenkideen #Geschenke #BesteGeschenke #Geschenkefinder',
  it: '#IdeeRegalo #Regali #MiglioriRegali #GuidaAiRegali',
  pt: '#IdeiasDePresentes #Presentes #MelhoresPresentes #DicasDePresentes',
  nl: '#CadeauIdeeen #Cadeaus #BesteCadeaus #Cadeautips',
  pl: '#PomyslNaPrezent #Prezenty #NajlepszePrezenty #Prezentownik',
};

interface PinFeedItem {
  title: string;
  link: string;
  description: string;
  imageUrl: string;
  category: string;
  pubDate: string;
}

function buildPinItemFromRouteSpec(
  spec: CanonicalRouteSpec,
  localeKey: string,
  pubDate: string
): PinFeedItem | null {
  const { currency } = getLocaleCurrency(localeKey);
  const ui = getUiStrings(localeKey);
  const hashtags = LOCALIZED_HASHTAGS[localeKey] || LOCALIZED_HASHTAGS.en;
  const link = `${BASE_SITE_URL}${localizeRoutePath(localeKey, spec.baseEsPath)}`;

  let title = ui.brandName;
  let description = ui.footerTagline;
  let matchedItems: ProductSummaryLike[] = [];
  let fallbackImage = `${BASE_SITE_URL}/og-cover.png`;

  switch (spec.kind) {
    case 'home': {
      title = `${ui.brandName} 【2026】 ${ui.badgeUpdated2026}`;
      description = ui.footerTagline;
      matchedItems = ALL_SITE_PRODUCTS.slice(0, 6);
      break;
    }

    case 'age': {
      const ageSlug = spec.slug || '';
      const meta = getLocalizedAgeMeta(localeKey, ageSlug, currency);
      title = meta.socialTitle || meta.title;
      description = meta.description;
      matchedItems = ALL_SITE_PRODUCTS.filter((p) => p.ageRange === spec.ageId);
      fallbackImage = HUB_OG_SNIPPETS[ageSlug]?.imageUrl || fallbackImage;
      break;
    }

    case 'subcategory': {
      const [ageSlug] = (spec.slug || '').split('/');
      const subLabel = spec.subLabel || '';
      const meta = getLocalizedSubcategoryMeta(localeKey, ageSlug, subLabel, currency);
      title = meta.socialTitle || meta.title;
      description = meta.description;
      matchedItems = matchProductsForSubcategory(
        spec.ageId || '',
        subLabel,
        ALL_SITE_PRODUCTS
      );
      fallbackImage = getCategoryOgImage(subLabel).url;
      break;
    }

    case 'filter': {
      const filterSlug = spec.slug || '';
      const flt = SEO_FILTER_ROUTES[filterSlug];
      if (!flt) return null;
      const meta = getLocalizedFilterMeta(localeKey, filterSlug, currency);
      title = meta.socialTitle || meta.title;
      description = meta.description;
      matchedItems = matchProductsForFilter(flt, ALL_SITE_PRODUCTS);
      fallbackImage = getCategoryOgImage(flt.label).url;
      break;
    }

    case 'age-filter': {
      const [ageSlug] = (spec.slug || '').split('/');
      const filterSlug = spec.filterSlug || '';
      const flt = SEO_FILTER_ROUTES[filterSlug];
      if (!flt) return null;
      const meta = getLocalizedAgeFilterMeta(localeKey, ageSlug, filterSlug, currency);
      title = meta.socialTitle || meta.title;
      description = meta.description;
      matchedItems = matchProductsForAgeAndFilter(ageSlug, flt, ALL_SITE_PRODUCTS, false);
      fallbackImage =
        HUB_OG_SNIPPETS[ageSlug]?.imageUrl || getCategoryOgImage(flt.label).url;
      break;
    }

    case 'hub': {
      const hubSlug = spec.slug || '';
      const meta = getLocalizedStaticHubMeta(localeKey, hubSlug, currency);
      title = meta.socialTitle || meta.title;
      description = meta.description;
      matchedItems = HUB_ITEMS_MAP[hubSlug] || ALL_SITE_PRODUCTS.slice(0, 6);
      fallbackImage = HUB_OG_SNIPPETS[hubSlug]?.imageUrl || fallbackImage;
      break;
    }

    case 'hub-filter': {
      const hubSlug = spec.hubSlug || '';
      const hubCategoryId = spec.hubCategoryId || '';
      const hf = (PASSION_HUB_FILTERS_MAP[hubSlug] || []).find(
        (f) => f.id === hubCategoryId
      );
      if (!hf) return null;
      const meta = getLocalizedPassionHubFilterMeta(
        localeKey,
        hubSlug,
        hf.label,
        hf.icon,
        currency
      );
      title = meta.socialTitle || meta.title;
      description = meta.description;
      matchedItems = getPassionHubFilterProducts(hubSlug, hubCategoryId);
      fallbackImage = HUB_OG_SNIPPETS[hubSlug]?.imageUrl || fallbackImage;
      break;
    }

    default:
      return null;
  }

  const topThree = matchedItems
    .slice(0, 3)
    .map((p, idx) => {
      const pr = p.priceText ? ` (${applyCurrencyDisplay(p.priceText, currency)})` : '';
      return `${idx + 1}. ${p.title}${pr}`;
    })
    .join(' · ');

  const heroImage =
    matchedItems.find((p) => p.imageUrl && p.imageUrl.startsWith('http'))?.imageUrl ||
    fallbackImage;

  return {
    title,
    link,
    description: `${description}${topThree ? ` | Top 3: ${topThree}` : ''} ${hashtags}`,
    imageUrl: heroImage,
    category: spec.category,
    pubDate,
  };
}

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const format = (searchParams.get('format') || 'rss').toLowerCase();
  const rawLang = searchParams.get('lang') || 'es';
  const localeKey = normalizeLocaleKey(rawLang);
  const rawBoard = (searchParams.get('board') || 'all').toLowerCase();

  // Map friendly alias 'pasiones' -> 'tematicas'
  const normalizedBoard: SitemapCategory | 'all' =
    rawBoard === 'pasiones' || rawBoard === 'tematicas'
      ? 'tematicas'
      : rawBoard === 'edades'
      ? 'edades'
      : rawBoard === 'ocasiones'
      ? 'ocasiones'
      : rawBoard === 'presupuestos'
      ? 'presupuestos'
      : 'all';

  const allSpecs = getAllCanonicalRouteSpecs();

  // JSON Directory Mode: lists all 108 (27 languages × 4 boards) RSS feeds & counts
  if (format === 'json') {
    const activeSpecsForEs = allSpecs.filter(
      (s) => getActiveStockForRoute(s, 'es') > 0
    );
    const countsByBoard: Record<string, number> = {
      edades: activeSpecsForEs.filter((s) => s.category === 'edades').length,
      tematicas: activeSpecsForEs.filter((s) => s.category === 'tematicas').length,
      ocasiones: activeSpecsForEs.filter((s) => s.category === 'ocasiones').length,
      presupuestos: activeSpecsForEs.filter((s) => s.category === 'presupuestos').length,
    };

    const feeds = ALL_SITEMAP_LOCALES.flatMap((loc) =>
      SITEMAP_CATEGORIES.map((cat) => ({
        locale: loc.localeKey,
        hreflang: loc.hreflang,
        board: cat,
        pinCount: countsByBoard[cat] || 0,
        rssUrl: `${BASE_SITE_URL}/feed/pinterest.xml?lang=${loc.localeKey}&board=${cat}`,
      }))
    );

    return NextResponse.json({
      ok: true,
      totalLocales: ALL_SITEMAP_LOCALES.length,
      boardsPerLocale: SITEMAP_CATEGORIES.length,
      totalRssFeeds: feeds.length,
      routesPerLocale: activeSpecsForEs.length,
      totalGlobalPins: activeSpecsForEs.length * ALL_SITEMAP_LOCALES.length,
      countsByBoard,
      feeds,
    });
  }

  const filteredSpecs = allSpecs.filter((spec) => {
    if (normalizedBoard !== 'all' && spec.category !== normalizedBoard) {
      return false;
    }
    return getActiveStockForRoute(spec, localeKey) > 0;
  });

  const nowMs = Date.now();
  const items: PinFeedItem[] = [];

  filteredSpecs.forEach((spec, idx) => {
    const pubDate = new Date(nowMs - idx * 1800 * 1000).toUTCString();
    const item = buildPinItemFromRouteSpec(spec, localeKey, pubDate);
    if (item) {
      items.push(item);
    }
  });

  const selfUrl = `${BASE_SITE_URL}/feed/pinterest.xml?lang=${encodeURIComponent(localeKey)}&board=${encodeURIComponent(normalizedBoard)}`;
  const ui = getUiStrings(localeKey);

  const xmlItems = items
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
    <title>${escapeXml(ui.brandName)} — Pinterest Feed (${escapeXml(localeKey.toUpperCase())} · ${escapeXml(normalizedBoard.toUpperCase())} · ${items.length} Pins)</title>
    <link>${BASE_SITE_URL}${escapeXml(localizeRoutePath(localeKey, '/'))}</link>
    <description>${escapeXml(ui.footerTagline)}</description>
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
