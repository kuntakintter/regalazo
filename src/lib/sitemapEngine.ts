import { Product } from '@/data/products';
import { ALL_SITE_PRODUCTS } from '@/data/allCatalogProducts';
import { AUTOMOVIL_PRODUCTS } from '@/data/automovilData';
import { CAFE_PRODUCTS } from '@/data/cafeData';
import { CICLISMO_PRODUCTS } from '@/data/ciclismoData';
import { GAMING_PRODUCTS } from '@/data/gamingData';
import { GTA_PRODUCTS } from '@/data/gtaData';
import { MASCOTAS_PRODUCTS } from '@/data/mascotasData';
import { MOTORISTA_PRODUCTS } from '@/data/motoristasData';
import { NAVIDAD_PRODUCTS } from '@/data/navidadData';
import { HALLOWEEN_PRODUCTS } from '@/data/halloweenData';
import { I18N_SEO_ROUTES } from '@/lib/i18nRoutes';
import {
  ALL_STATIC_HUB_SLUGS,
  BASE_SITE_URL,
  SEO_FILTER_ROUTES,
  matchProductsForFilter,
  matchStrictProductsForFilter,
} from '@/lib/filterRoutes';
import {
  PRIMARY_SEO_AGE_ROUTES,
  SEO_AGE_ROUTES,
  getSubcategorySlugMap,
} from '@/lib/seoRoutes';
import {
  PASSION_HUB_FILTERS_MAP,
  getPassionHubFilterProducts,
} from '@/lib/passionHubFilters';
import { matchProductsForSubcategory } from '@/lib/subcategoryMatcher';
import { localizeRoutePath } from '@/lib/localizedSlugs';

export const MAX_URLS_PER_SITEMAP = 10000;

export type SitemapCategory = 'edades' | 'tematicas' | 'ocasiones' | 'presupuestos';

export const SITEMAP_CATEGORIES: SitemapCategory[] = [
  'edades',
  'tematicas',
  'ocasiones',
  'presupuestos',
];

export interface SitemapLocaleDescriptor {
  localeKey: string;
  hreflang: string;
}

export const ALL_SITEMAP_LOCALES: SitemapLocaleDescriptor[] = [
  { localeKey: 'es', hreflang: 'es' },
  ...Object.values(I18N_SEO_ROUTES).map((r) => ({
    localeKey: r.slug,
    hreflang: r.hreflang,
  })),
];

export interface CanonicalRouteSpec {
  id: string;
  baseEsPath: string;
  category: SitemapCategory;
  priority: number;
  changefreq: 'daily' | 'weekly';
  kind: 'home' | 'age' | 'subcategory' | 'filter' | 'age-filter' | 'hub' | 'hub-filter';
  slug?: string;
  ageId?: string;
  subLabel?: string;
  filterSlug?: string;
  hubSlug?: string;
  hubCategoryId?: string;
}

export interface SitemapUrlEntry {
  loc: string;
  lastmod: string;
  changefreq: 'daily' | 'weekly';
  priority: string;
  activeStockCount: number;
  alternates: { hreflang: string; href: string }[];
}

export interface SitemapShard {
  filename: string;
  loc: string;
  localeKey: string;
  category: SitemapCategory;
  partNumber?: number;
  totalParts: number;
  lastmod: string;
  entries: SitemapUrlEntry[];
}

interface StockLikeItem {
  id?: string;
  title?: string;
  imageUrl?: string;
  price?: number;
  priceNumeric?: number;
  priceText?: string;
  inStock?: boolean;
}

function isItemActiveInStock(item: StockLikeItem | Product): boolean {
  if (!item) return false;
  if ((item as StockLikeItem).inStock === false) return false;
  const title = (item.title || '').trim();
  const img = (item.imageUrl || '').trim();
  if (!title || !img) return false;

  const numericPrice =
    typeof (item as StockLikeItem).price === 'number'
      ? (item as StockLikeItem).price!
      : typeof (item as StockLikeItem).priceNumeric === 'number'
      ? (item as StockLikeItem).priceNumeric!
      : parseFloat(
          ((item as StockLikeItem).priceText || '')
            .replace(/[^\d.,]/g, '')
            .replace(',', '.')
        ) || 0;

  return numericPrice > 0;
}

const HUB_COLLECTION_MAP: Record<string, StockLikeItem[]> = {
  'motoristas': MOTORISTA_PRODUCTS,
  'automovil': AUTOMOVIL_PRODUCTS,
  'ciclismo': CICLISMO_PRODUCTS,
  'gaming': GAMING_PRODUCTS,
  'amantes-del-cafe': CAFE_PRODUCTS,
  'mascotas': MASCOTAS_PRODUCTS,
  'halloween': HALLOWEEN_PRODUCTS,
  'navidad': NAVIDAD_PRODUCTS,
  'carta-papa-noel': NAVIDAD_PRODUCTS,
  'regalos-gta-6': GTA_PRODUCTS,
};

/**
 * Queries the active catalog database at generation time to determine the active
 * in-stock product count for `(routeSpec, localeKey)`.
 *
 * CRITICAL ANTI-THIN-CONTENT RULE:
 * Any combination returning `0` active products is excluded from the sitemap and
 * from `<xhtml:link rel="alternate" hreflang="..." />` tags.
 */
export function getActiveStockForRoute(
  routeSpec: CanonicalRouteSpec,
  localeKey: string
): number {
  const isKnownLocale =
    localeKey === 'es' || Boolean(I18N_SEO_ROUTES[localeKey]);
  if (!isKnownLocale) return 0;

  const activeCatalog = ALL_SITE_PRODUCTS.filter(isItemActiveInStock);
  if (activeCatalog.length === 0) return 0;

  switch (routeSpec.kind) {
    case 'home':
      return activeCatalog.length;

    case 'age': {
      const ageRoute = routeSpec.slug ? SEO_AGE_ROUTES[routeSpec.slug] : undefined;
      if (!ageRoute) return 0;
      return activeCatalog.filter((p) => p.ageRange === ageRoute.ageId).length;
    }

    case 'subcategory': {
      if (!routeSpec.ageId || !routeSpec.subLabel) return 0;
      const matched = matchProductsForSubcategory(
        routeSpec.ageId,
        routeSpec.subLabel,
        activeCatalog
      );
      return matched.filter(isItemActiveInStock).length;
    }

    case 'filter': {
      const filterMeta = routeSpec.slug ? SEO_FILTER_ROUTES[routeSpec.slug] : undefined;
      if (!filterMeta) return 0;
      const matched = matchProductsForFilter(filterMeta, activeCatalog);
      return matched.filter(isItemActiveInStock).length;
    }

    case 'age-filter': {
      if (!routeSpec.ageId || !routeSpec.filterSlug) return 0;
      const filterMeta = SEO_FILTER_ROUTES[routeSpec.filterSlug];
      if (!filterMeta) return 0;
      const ageCatalog = activeCatalog.filter((p) => p.ageRange === routeSpec.ageId);
      if (ageCatalog.length === 0) return 0;
      const strictMatched = matchStrictProductsForFilter(filterMeta, ageCatalog);
      return strictMatched.filter(isItemActiveInStock).length;
    }

    case 'hub': {
      const slug = routeSpec.slug || '';
      if (HUB_COLLECTION_MAP[slug]) {
        return HUB_COLLECTION_MAP[slug].filter(isItemActiveInStock).length;
      }
      if (slug === 'regalos-menos-20-euros') {
        return activeCatalog.filter((p) => p.priceRange === '<20').length;
      }
      if (slug === 'que-regalar-a-un-hombre' || slug === 'que-regalar-a-mi-novio') {
        return activeCatalog.filter(
          (p) => p.ageRange === '+18' || p.ageRange === '16-18'
        ).length;
      }
      if (slug === 'que-regalar-a-una-mujer' || slug === 'que-regalar-a-mi-novia') {
        return activeCatalog.filter(
          (p) => p.ageRange === '+18' || p.ageRange === '16-18'
        ).length;
      }
      return activeCatalog.length;
    }

    case 'hub-filter': {
      if (!routeSpec.hubSlug || !routeSpec.hubCategoryId) return 0;
      const items = getPassionHubFilterProducts(
        routeSpec.hubSlug,
        routeSpec.hubCategoryId
      );
      return items.filter(isItemActiveInStock).length;
    }

    default:
      return 0;
  }
}

/**
 * Builds the complete matrix of canonical route specifications grouped into the
 * 4 logical SEO categories (`edades`, `tematicas`, `ocasiones`, `presupuestos`).
 */
export function getAllCanonicalRouteSpecs(): CanonicalRouteSpec[] {
  const specs: CanonicalRouteSpec[] = [];

  // 1. OCASIONES & HERRAMIENTAS: Home + Static Hubs (excluding budget hub) + Gender Filters
  specs.push({
    id: 'home',
    baseEsPath: '/',
    category: 'ocasiones',
    priority: 1.0,
    changefreq: 'daily',
    kind: 'home',
  });

  for (const hubSlug of ALL_STATIC_HUB_SLUGS) {
    const isBudgetHub = hubSlug === 'regalos-menos-20-euros';
    specs.push({
      id: `hub:${hubSlug}`,
      baseEsPath: `/${hubSlug}`,
      category: isBudgetHub ? 'presupuestos' : 'ocasiones',
      priority: 0.9,
      changefreq: 'daily',
      kind: 'hub',
      slug: hubSlug,
    });

    const hubFilters = PASSION_HUB_FILTERS_MAP[hubSlug] || [];
    for (const hf of hubFilters) {
      specs.push({
        id: `hub-filter:${hubSlug}/${hf.slug}`,
        baseEsPath: `/${hubSlug}/${hf.slug}`,
        category:
          hubSlug === 'halloween' || hubSlug === 'navidad'
            ? 'ocasiones'
            : 'tematicas',
        priority: 0.86,
        changefreq: 'weekly',
        kind: 'hub-filter',
        slug: `${hubSlug}/${hf.slug}`,
        hubSlug,
        hubCategoryId: hf.id,
      });
    }
  }

  // 2. FILTERS: Temáticas (category/clothing/anime/wheels), Presupuestos (price), Ocasiones (gender)
  for (const filterMeta of Object.values(SEO_FILTER_ROUTES)) {
    let category: SitemapCategory = 'tematicas';
    if (filterMeta.filterKind === 'price') {
      category = 'presupuestos';
    } else if (filterMeta.filterKind === 'gender') {
      category = 'ocasiones';
    }

    specs.push({
      id: `filter:${filterMeta.slug}`,
      baseEsPath: `/${filterMeta.slug}`,
      category,
      priority: 0.88,
      changefreq: 'daily',
      kind: 'filter',
      slug: filterMeta.slug,
    });
  }

  // 3. EDADES: 9 Primary Age Stages + 18 Specific-Year Ages + 82 Age × Subcategory Routes
  for (const ageRoute of Object.values(SEO_AGE_ROUTES)) {
    specs.push({
      id: `age:${ageRoute.ageSlug}`,
      baseEsPath: `/${ageRoute.ageSlug}`,
      category: 'edades',
      priority: ageRoute.specificYear ? 0.88 : 0.9,
      changefreq: 'daily',
      kind: 'age',
      slug: ageRoute.ageSlug,
      ageId: ageRoute.ageId,
    });
  }

  for (const primaryAge of PRIMARY_SEO_AGE_ROUTES) {
    const subcategories = getSubcategorySlugMap(primaryAge.ageId);
    const subSlugs = new Set(subcategories.map((s) => s.slug));

    for (const sub of subcategories) {
      specs.push({
        id: `subcat:${primaryAge.ageSlug}/${sub.slug}`,
        baseEsPath: `/${primaryAge.ageSlug}/${sub.slug}`,
        category: 'edades',
        priority: 0.85,
        changefreq: 'weekly',
        kind: 'subcategory',
        slug: `${primaryAge.ageSlug}/${sub.slug}`,
        ageId: primaryAge.ageId,
        subLabel: sub.label,
      });
    }

    // 4. MATRIZ CRUZADA EDAD × FILTRO (Temáticas, Pasiones, Anime, Vehículos, Moda, Presupuestos y Destinatario)
    if (primaryAge.ageId !== 'reveal') {
      for (const filterMeta of Object.values(SEO_FILTER_ROUTES)) {
        if (subSlugs.has(filterMeta.slug)) continue;

        let category: SitemapCategory = 'tematicas';
        if (filterMeta.filterKind === 'price') {
          category = 'presupuestos';
        } else if (filterMeta.filterKind === 'gender') {
          category = 'ocasiones';
        }

        specs.push({
          id: `age-filter:${primaryAge.ageSlug}/${filterMeta.slug}`,
          baseEsPath: `/${primaryAge.ageSlug}/${filterMeta.slug}`,
          category,
          priority: 0.84,
          changefreq: 'weekly',
          kind: 'age-filter',
          slug: `${primaryAge.ageSlug}/${filterMeta.slug}`,
          ageId: primaryAge.ageId,
          filterSlug: filterMeta.slug,
        });
      }
    }
  }

  return specs;
}

let cachedShards: SitemapShard[] | null = null;
let cachedTimestampDay: string | null = null;

function getIsoDateBucket(): string {
  return new Date().toISOString().split('T')[0] + 'T00:00:00.000Z';
}

/**
 * Generates (or returns from daily cache) all sharded sitemaps divided by language
 * and filter category, enforcing:
 * - Active product stock > 0 (`getActiveStockForRoute(route, lang) > 0`)
 * - Bidirectional `<xhtml:link rel="alternate" hreflang="..." href="..." />`
 * - Clean translated slugs per language (`localizeRoutePath`)
 * - Automatic pagination (`-1.xml`, `-2.xml`) when any shard exceeds 10,000 URLs
 */
export function generateAllSitemapShards(forceRefresh: boolean = false): SitemapShard[] {
  const todayIso = getIsoDateBucket();
  if (!forceRefresh && cachedShards && cachedTimestampDay === todayIso) {
    return cachedShards;
  }

  const routeSpecs = getAllCanonicalRouteSpecs();

  // Precompute active languages and translated full URLs for every canonical route
  const routeActiveAlternates = new Map<
    string,
    {
      byLocale: Map<string, { href: string; hreflang: string; stock: number }>;
      xhtmlAlternates: { hreflang: string; href: string }[];
    }
  >();

  for (const spec of routeSpecs) {
    const byLocale = new Map<string, { href: string; hreflang: string; stock: number }>();

    for (const locDesc of ALL_SITEMAP_LOCALES) {
      const stock = getActiveStockForRoute(spec, locDesc.localeKey);
      if (stock <= 0) {
        // Anti-Thin Content rule: exclude empty combinations completely
        continue;
      }
      const localizedPath = localizeRoutePath(locDesc.localeKey, spec.baseEsPath);
      const fullHref = `${BASE_SITE_URL}${localizedPath === '/' ? '' : localizedPath}`;
      byLocale.set(locDesc.localeKey, {
        href: fullHref,
        hreflang: locDesc.hreflang,
        stock,
      });
    }

    if (byLocale.size === 0) continue;

    const xhtmlAlternates: { hreflang: string; href: string }[] = [];
    for (const locDesc of ALL_SITEMAP_LOCALES) {
      const active = byLocale.get(locDesc.localeKey);
      if (active) {
        xhtmlAlternates.push({
          hreflang: active.hreflang,
          href: active.href,
        });
      }
    }

    // Add x-default pointing to active 'en' translation (or 'es' fallback)
    const defaultTarget = byLocale.get('en') || byLocale.get('es') || Array.from(byLocale.values())[0];
    if (defaultTarget) {
      xhtmlAlternates.push({
        hreflang: 'x-default',
        href: defaultTarget.href,
      });
    }

    routeActiveAlternates.set(spec.id, { byLocale, xhtmlAlternates });
  }

  // Group entries by (localeKey, category) and chunk at MAX_URLS_PER_SITEMAP (10,000)
  const shards: SitemapShard[] = [];

  for (const locDesc of ALL_SITEMAP_LOCALES) {
    for (const category of SITEMAP_CATEGORIES) {
      const bucketEntries: SitemapUrlEntry[] = [];

      for (const spec of routeSpecs) {
        if (spec.category !== category) continue;
        const routeInfo = routeActiveAlternates.get(spec.id);
        if (!routeInfo) continue;
        const localeEntry = routeInfo.byLocale.get(locDesc.localeKey);
        if (!localeEntry || localeEntry.stock <= 0) continue;

        bucketEntries.push({
          loc: localeEntry.href,
          lastmod: todayIso,
          changefreq: spec.changefreq,
          priority:
            locDesc.localeKey === 'es'
              ? spec.priority.toFixed(2)
              : Math.max(0.75, +(spec.priority - 0.05).toFixed(2)).toFixed(2),
          activeStockCount: localeEntry.stock,
          alternates: routeInfo.xhtmlAlternates,
        });
      }

      if (bucketEntries.length === 0) continue;

      const totalParts = Math.ceil(bucketEntries.length / MAX_URLS_PER_SITEMAP);
      for (let partIdx = 0; partIdx < totalParts; partIdx++) {
        const chunk = bucketEntries.slice(
          partIdx * MAX_URLS_PER_SITEMAP,
          (partIdx + 1) * MAX_URLS_PER_SITEMAP
        );
        const partNumber = totalParts > 1 ? partIdx + 1 : undefined;
        const filename = partNumber
          ? `sitemap-${locDesc.localeKey}-${category}-${partNumber}.xml`
          : `sitemap-${locDesc.localeKey}-${category}.xml`;

        shards.push({
          filename,
          loc: `${BASE_SITE_URL}/sitemaps/${filename}`,
          localeKey: locDesc.localeKey,
          category,
          partNumber,
          totalParts,
          lastmod: todayIso,
          entries: chunk,
        });
      }
    }
  }

  cachedShards = shards;
  cachedTimestampDay = todayIso;
  return shards;
}

export function escapeXml(unsafe: string): string {
  return unsafe
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;');
}

/**
 * Serializes the root `/sitemap.xml` Sitemap Index XML.
 */
export function buildSitemapIndexXml(forceRefresh: boolean = false): string {
  const shards = generateAllSitemapShards(forceRefresh);
  const lines: string[] = [
    '<?xml version="1.0" encoding="UTF-8"?>',
    '<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">',
  ];

  for (const shard of shards) {
    lines.push('  <sitemap>');
    lines.push(`    <loc>${escapeXml(shard.loc)}</loc>`);
    lines.push(`    <lastmod>${escapeXml(shard.lastmod)}</lastmod>`);
    lines.push('  </sitemap>');
  }

  lines.push('</sitemapindex>');
  return lines.join('\n');
}

/**
 * Serializes a single child sitemap shard (`/sitemaps/sitemap-<lang>-<type>.xml`)
 * with full `<xhtml:link rel="alternate" hreflang="..." href="..." />` tags.
 */
export function buildShardSitemapXml(
  filename: string,
  forceRefresh: boolean = false
): string | null {
  const shards = generateAllSitemapShards(forceRefresh);
  const shard = shards.find((s) => s.filename === filename);
  if (!shard) return null;

  const lines: string[] = [
    '<?xml version="1.0" encoding="UTF-8"?>',
    '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">',
  ];

  for (const entry of shard.entries) {
    lines.push('  <url>');
    lines.push(`    <loc>${escapeXml(entry.loc)}</loc>`);
    lines.push(`    <lastmod>${escapeXml(entry.lastmod)}</lastmod>`);
    lines.push(`    <changefreq>${entry.changefreq}</changefreq>`);
    lines.push(`    <priority>${entry.priority}</priority>`);
    for (const alt of entry.alternates) {
      lines.push(
        `    <xhtml:link rel="alternate" hreflang="${escapeXml(alt.hreflang)}" href="${escapeXml(alt.href)}" />`
      );
    }
    lines.push('  </url>');
  }

  lines.push('</urlset>');
  return lines.join('\n');
}
