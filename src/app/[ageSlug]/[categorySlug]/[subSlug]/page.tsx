import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { I18N_SEO_ROUTES } from '@/lib/i18nRoutes';
import { getLocalizedNestedMetadata } from '@/lib/routeMetadata';
import { renderLocalizedRouteView } from '@/lib/routeViews';
import { getAllSitemapPathSegments } from '@/lib/sitemapEngine';

interface PageProps {
  params: Promise<{
    ageSlug: string;
    categorySlug: string;
    subSlug: string;
  }>;
}

export async function generateStaticParams() {
  const params = getAllSitemapPathSegments()
    .filter((segs) => segs.length === 3)
    .map(([ageSlug, categorySlug, subSlug]) => ({ ageSlug, categorySlug, subSlug }));
  return params.length > 0
    ? params
    : [{ ageSlug: 'en', categorySlug: '13-to-15-years', subSlug: 'gaming' }];
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { ageSlug, categorySlug, subSlug } = await params;

  if (!I18N_SEO_ROUTES[ageSlug]) {
    return {};
  }

  return getLocalizedNestedMetadata(ageSlug, [categorySlug, subSlug]) || {};
}

export default async function LocalizedSubcategoryPage({ params }: PageProps) {
  const { ageSlug, categorySlug, subSlug } = await params;

  if (!I18N_SEO_ROUTES[ageSlug]) {
    notFound();
  }

  const view = renderLocalizedRouteView(ageSlug, [categorySlug, subSlug]);
  if (!view) {
    notFound();
  }

  return view;
}
