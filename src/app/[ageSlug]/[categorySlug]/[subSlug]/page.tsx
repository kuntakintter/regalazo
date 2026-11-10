import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { I18N_SEO_ROUTES } from '@/lib/i18nRoutes';
import { getLocalizedNestedMetadata } from '@/lib/routeMetadata';
import { renderLocalizedRouteView } from '@/lib/routeViews';

export const dynamicParams = true;
export const revalidate = 86400;

interface PageProps {
  params: Promise<{
    ageSlug: string;
    categorySlug: string;
    subSlug: string;
  }>;
}

export async function generateStaticParams() {
  return [];
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
