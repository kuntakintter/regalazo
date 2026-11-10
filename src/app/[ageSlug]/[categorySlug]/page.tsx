import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { I18N_SEO_ROUTES } from '@/lib/i18nRoutes';
import { SEO_AGE_ROUTES, getSubcategorySlugMap } from '@/lib/seoRoutes';
import { ALL_STATIC_HUB_SLUGS } from '@/lib/filterRoutes';
import { getLocalizedNestedMetadata } from '@/lib/routeMetadata';
import { renderLocalizedRouteView } from '@/lib/routeViews';

export const dynamicParams = true;
export const revalidate = 86400;

interface PageProps {
  params: Promise<{
    ageSlug: string;
    categorySlug: string;
  }>;
}

export async function generateStaticParams() {
  const params: { ageSlug: string; categorySlug: string }[] = [];

  for (const route of Object.values(SEO_AGE_ROUTES)) {
    const subcategories = getSubcategorySlugMap(route.ageId);
    for (const sub of subcategories) {
      params.push({
        ageSlug: route.ageSlug,
        categorySlug: sub.slug,
      });
    }
  }

  if (I18N_SEO_ROUTES.en) {
    for (const hubSlug of ALL_STATIC_HUB_SLUGS) {
      params.push({
        ageSlug: 'en',
        categorySlug: hubSlug,
      });
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
