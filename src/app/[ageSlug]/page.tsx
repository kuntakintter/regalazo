import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { I18N_SEO_ROUTES } from '@/lib/i18nRoutes';
import { SEO_AGE_ROUTES } from '@/lib/seoRoutes';
import { SEO_FILTER_ROUTES } from '@/lib/filterRoutes';
import {
  getLocalizedHomeMetadata,
  getLocalizedNestedMetadata,
} from '@/lib/routeMetadata';
import {
  renderLocalizedHomeView,
  renderLocalizedRouteView,
} from '@/lib/routeViews';

export const dynamicParams = true;
export const revalidate = 86400;

interface PageProps {
  params: Promise<{
    ageSlug: string;
  }>;
}

export async function generateStaticParams() {
  const i18nSlugs = Object.keys(I18N_SEO_ROUTES);
  const ageSlugs = Object.keys(SEO_AGE_ROUTES);
  const filterSlugs = Object.keys(SEO_FILTER_ROUTES);

  return [...i18nSlugs, ...ageSlugs, ...filterSlugs].map((ageSlug) => ({
    ageSlug,
  }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { ageSlug } = await params;

  if (I18N_SEO_ROUTES[ageSlug]) {
    return getLocalizedHomeMetadata(ageSlug) || {};
  }

  return getLocalizedNestedMetadata('es', [ageSlug]) || {};
}

export default async function SingleSlugPage({ params }: PageProps) {
  const { ageSlug } = await params;

  if (I18N_SEO_ROUTES[ageSlug]) {
    const homeView = renderLocalizedHomeView(ageSlug);
    if (!homeView) notFound();
    return homeView;
  }

  const nestedView = renderLocalizedRouteView('es', [ageSlug]);
  if (!nestedView) {
    notFound();
  }

  return nestedView;
}
