import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { I18N_SEO_ROUTES } from '@/lib/i18nRoutes';
import { PRIMARY_SEO_AGE_ROUTES, getSubcategorySlugMap } from '@/lib/seoRoutes';
import {
  ALL_STATIC_HUB_SLUGS,
  SEO_FILTER_ROUTES,
  matchProductsForAgeAndFilter,
} from '@/lib/filterRoutes';
import { PASSION_HUB_FILTERS_MAP } from '@/lib/passionHubFilters';
import { ALL_SITE_PRODUCTS } from '@/data/allCatalogProducts';
import { toLocalizedSlug } from '@/lib/localizedSlugs';
import { getLocalizedNestedMetadata } from '@/lib/routeMetadata';
import { renderLocalizedRouteView } from '@/lib/routeViews';

interface PageProps {
  params: Promise<{
    ageSlug: string;
    categorySlug: string;
  }>;
}

export async function generateStaticParams() {
  const params: { ageSlug: string; categorySlug: string }[] = [];

  for (const route of PRIMARY_SEO_AGE_ROUTES) {
    const subcategories = getSubcategorySlugMap(route.ageId);
    const subSlugs = new Set(subcategories.map((s) => s.slug));
    for (const sub of subcategories) {
      params.push({
        ageSlug: route.ageSlug,
        categorySlug: sub.slug,
      });
    }

    if (route.ageId !== 'reveal') {
      for (const flt of Object.values(SEO_FILTER_ROUTES)) {
        if (subSlugs.has(flt.slug)) continue;
        if (
          matchProductsForAgeAndFilter(route.ageSlug, flt, ALL_SITE_PRODUCTS, true)
            .length > 0
        ) {
          params.push({
            ageSlug: route.ageSlug,
            categorySlug: flt.slug,
          });
        }
      }
    }
  }

  for (const [hubSlug, hubFilters] of Object.entries(PASSION_HUB_FILTERS_MAP)) {
    for (const hf of hubFilters) {
      params.push({
        ageSlug: hubSlug,
        categorySlug: hf.slug,
      });
    }
  }

  const CORE_FILTER_LOCALES = new Set(['en', 'en-gb', 'es-us', 'de', 'fr', 'it', 'pt', 'nl', 'pl']);

  for (const lang of Object.keys(I18N_SEO_ROUTES)) {
    const seen = new Set<string>();
    const addSlug = (s: string) => {
      if (s && !seen.has(s)) {
        seen.add(s);
        params.push({ ageSlug: lang, categorySlug: s });
      }
    };

    for (const hubSlug of ALL_STATIC_HUB_SLUGS) {
      addSlug(hubSlug);
      addSlug(toLocalizedSlug(lang, hubSlug));
    }

    for (const route of PRIMARY_SEO_AGE_ROUTES) {
      addSlug(route.ageSlug);
      addSlug(toLocalizedSlug(lang, route.ageSlug));
    }

    if (CORE_FILTER_LOCALES.has(lang)) {
      for (const filterSlug of Object.keys(SEO_FILTER_ROUTES)) {
        addSlug(filterSlug);
        addSlug(toLocalizedSlug(lang, filterSlug));
      }
    }
  }

  return params;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { ageSlug, categorySlug } = await params;

  if (I18N_SEO_ROUTES[ageSlug]) {
    return getLocalizedNestedMetadata(ageSlug, [categorySlug]) || {};
  }

  return getLocalizedNestedMetadata('es', [ageSlug, categorySlug]) || {};
}

export default async function TwoSegmentDynamicPage({ params }: PageProps) {
  const { ageSlug, categorySlug } = await params;

  if (I18N_SEO_ROUTES[ageSlug]) {
    const localizedView = renderLocalizedRouteView(ageSlug, [categorySlug]);
    if (!localizedView) notFound();
    return localizedView;
  }

  const rootSubcatView = renderLocalizedRouteView('es', [ageSlug, categorySlug]);
  if (!rootSubcatView) {
    notFound();
  }

  return rootSubcatView;
}
