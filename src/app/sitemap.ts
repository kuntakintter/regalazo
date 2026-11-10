import { MetadataRoute } from 'next';
import { SEO_AGE_ROUTES, getSubcategorySlugMap } from '@/lib/seoRoutes';
import { I18N_SEO_ROUTES } from '@/lib/i18nRoutes';
import {
  ALL_STATIC_HUB_SLUGS,
  BASE_SITE_URL,
  SEO_FILTER_ROUTES,
  getHreflangAlternatesForPath,
} from '@/lib/filterRoutes';

interface BaseRouteSpec {
  path: string;
  changeFrequency: 'daily' | 'weekly' | 'monthly' | 'yearly';
  priority: number;
}

const PERSONA_PRIORITY_SLUGS = new Set([
  'que-regalar-a-un-hombre',
  'que-regalar-a-una-mujer',
  'que-regalar-a-mi-novio',
  'que-regalar-a-mi-novia',
]);

function buildBaseCanonicalRoutes(): BaseRouteSpec[] {
  const baseRoutes: BaseRouteSpec[] = [];
  const seenPaths = new Set<string>();

  const pushRoute = (spec: BaseRouteSpec) => {
    if (seenPaths.has(spec.path)) return;
    seenPaths.add(spec.path);
    baseRoutes.push(spec);
  };

  // 1. Homepage (1)
  pushRoute({
    path: '',
    changeFrequency: 'daily',
    priority: 1.0,
  });

  // 2. Specialized Niche & Interactive Hubs (17)
  for (const hubSlug of ALL_STATIC_HUB_SLUGS) {
    const priority =
      hubSlug === 'halloween'
        ? 0.7
        : PERSONA_PRIORITY_SLUGS.has(hubSlug)
        ? 0.98
        : hubSlug === 'votar'
        ? 0.9
        : 0.95;

    pushRoute({
      path: `/${hubSlug}`,
      changeFrequency: hubSlug === 'votar' ? 'weekly' : 'daily',
      priority,
    });
  }

  // 3. SEO Filter Landing Pages (44: categories, clothing, anime, wheels, budgets, gender)
  for (const filterMeta of Object.values(SEO_FILTER_ROUTES)) {
    pushRoute({
      path: `/${filterMeta.slug}`,
      changeFrequency: 'weekly',
      priority: 0.85,
    });
  }

  // 4. Age Stage Hubs (9) & Age Subcategory Landings (82)
  for (const ageRoute of Object.values(SEO_AGE_ROUTES)) {
    pushRoute({
      path: `/${ageRoute.ageSlug}`,
      changeFrequency: 'daily',
      priority: 0.9,
    });

    const subcategories = getSubcategorySlugMap(ageRoute.ageId);
    for (const sub of subcategories) {
      pushRoute({
        path: `/${ageRoute.ageSlug}/${sub.slug}`,
        changeFrequency: 'weekly',
        priority: 0.8,
      });
    }
  }

  return baseRoutes;
}

export default function sitemap(): MetadataRoute.Sitemap {
  const LAST_MODIFIED = new Date();
  const baseRoutes = buildBaseCanonicalRoutes();
  const i18nRoutes = Object.values(I18N_SEO_ROUTES);

  const entries: MetadataRoute.Sitemap = [];

  for (const base of baseRoutes) {
    const alternates = {
      languages: getHreflangAlternatesForPath(base.path),
    };

    // Root Spanish edition (153 routes)
    entries.push({
      url: `${BASE_SITE_URL}${base.path}`,
      lastModified: LAST_MODIFIED,
      changeFrequency: base.changeFrequency,
      priority: base.priority,
      alternates,
    });

    // All 26 International Editions (26 × 153 = 3,978 routes -> 4,131 total)
    for (const localeRoute of i18nRoutes) {
      entries.push({
        url: `${BASE_SITE_URL}/${localeRoute.slug}${base.path}`,
        lastModified: LAST_MODIFIED,
        changeFrequency: base.changeFrequency,
        priority: Number(Math.max(0.5, base.priority - 0.05).toFixed(2)),
        alternates,
      });
    }
  }

  return entries;
}
