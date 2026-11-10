import { Metadata } from 'next';
import { I18N_SEO_ROUTES } from '@/lib/i18nRoutes';
import {
  ALL_STATIC_HUB_SLUGS,
  BASE_SITE_URL,
  SEO_FILTER_ROUTES,
} from '@/lib/filterRoutes';
import { SEO_AGE_ROUTES, getSubcategorySlugMap } from '@/lib/seoRoutes';
import {
  getLocalizedAgeMeta,
  getLocalizedFilterMeta,
  getLocalizedStaticHubMeta,
  getLocalizedSubcategoryMeta,
} from '@/lib/i18nContent';
import {
  HUB_OG_SNIPPETS,
  buildSocialMetadata,
  getCategoryOgImage,
} from '@/lib/ogMetadata';

const STATIC_HUB_FALLBACK_IMAGES: Record<string, { url: string; alt: string }> = {
  'carta-papa-noel': {
    url: 'https://www.unbuenregalo.es/og-cover.png',
    alt: 'Carta Oficial a Papá Noel 2026 - Un Buen Regalo',
  },
  votar: {
    url: 'https://images.unsplash.com/photo-1513885535751-8b9238bd345a?auto=format&fit=crop&w=1200&h=630&q=80',
    alt: 'Votación de Regalos en Grupo por WhatsApp - Un Buen Regalo',
  },
  'que-regalar-a-un-hombre': {
    url: 'https://www.unbuenregalo.es/og-cover.png',
    alt: 'Ideas de Regalo para un Hombre - Un Buen Regalo',
  },
  'que-regalar-a-una-mujer': {
    url: 'https://www.unbuenregalo.es/og-cover.png',
    alt: 'Ideas de Regalo para una Mujer - Un Buen Regalo',
  },
  'que-regalar-a-mi-novio': {
    url: 'https://www.unbuenregalo.es/og-cover.png',
    alt: 'Ideas de Regalo para mi Novio - Un Buen Regalo',
  },
  'que-regalar-a-mi-novia': {
    url: 'https://www.unbuenregalo.es/og-cover.png',
    alt: 'Ideas de Regalo para mi Novia - Un Buen Regalo',
  },
  'regalos-menos-20-euros': {
    url: 'https://www.unbuenregalo.es/og-cover.png',
    alt: 'Regalos Baratos Menos de 20 Euros / $20 - Un Buen Regalo',
  },
  'regalos-para-los-que-tienen-de-todo': {
    url: 'https://www.unbuenregalo.es/og-cover.png',
    alt: 'Regalos para los que Tienen de Todo - Un Buen Regalo',
  },
};

export function getLocalizedHomeMetadata(localeKey: string): Metadata | null {
  const cfg = I18N_SEO_ROUTES[localeKey];
  if (!cfg) return null;

  const canonicalUrl = `${BASE_SITE_URL}/${cfg.slug}`;
  return buildSocialMetadata({
    title: cfg.title,
    socialTitle: `🎁 ${cfg.title}`,
    description: cfg.description,
    canonicalUrl,
    routePath: '',
    ogLocale: cfg.ogLocale,
    siteName: `${cfg.brandTranslation} | Un Buen Regalo`,
    imageUrl:
      'https://images.unsplash.com/photo-1513542789411-b6a5d4f31634?auto=format&fit=crop&w=1200&h=630&q=85',
    imageAlt: cfg.h1,
    keywords: cfg.keywords,
  });
}

export function getLocalizedNestedMetadata(
  localeKey: string,
  slugSegments: string[]
): Metadata | null {
  const isRootEs = localeKey === 'es';
  const cfg = isRootEs ? null : I18N_SEO_ROUTES[localeKey];
  if (!isRootEs && !cfg) return null;

  const currency = cfg ? cfg.currency : 'EUR';
  const ogLocale = cfg ? cfg.ogLocale : 'es_ES';
  const siteName = cfg ? `${cfg.brandTranslation} | Un Buen Regalo` : 'Un Buen Regalo';
  const prefix = cfg ? `/${cfg.slug}` : '';

  if (slugSegments.length === 1) {
    const slug = slugSegments[0];
    const routePath = `/${slug}`;
    const canonicalUrl = `${BASE_SITE_URL}${prefix}${routePath}`;

    if (ALL_STATIC_HUB_SLUGS.includes(slug)) {
      const hubMeta = getLocalizedStaticHubMeta(localeKey, slug, currency);
      const snippet = HUB_OG_SNIPPETS[slug];
      const fallback = STATIC_HUB_FALLBACK_IMAGES[slug];

      return buildSocialMetadata({
        title: hubMeta.title,
        socialTitle: hubMeta.socialTitle || hubMeta.title,
        description: hubMeta.description,
        canonicalUrl,
        routePath,
        ogLocale,
        siteName,
        imageUrl: snippet?.imageUrl || fallback?.url || `${BASE_SITE_URL}/og-cover.png`,
        imageAlt: snippet?.imageAlt || fallback?.alt || hubMeta.h1,
        keywords: hubMeta.keywords,
      });
    }

    const filterRoute = SEO_FILTER_ROUTES[slug];
    if (filterRoute) {
      const localized = getLocalizedFilterMeta(localeKey, slug, currency);
      const ogImage = getCategoryOgImage(filterRoute.label);

      return buildSocialMetadata({
        title: localized.title,
        socialTitle: localized.socialTitle,
        description: localized.description,
        canonicalUrl,
        routePath,
        ogLocale,
        siteName,
        imageUrl: ogImage.url,
        imageAlt: localized.h1 || ogImage.alt,
        keywords: localized.keywords,
      });
    }

    const ageRoute = SEO_AGE_ROUTES[slug];
    if (ageRoute) {
      const localized = getLocalizedAgeMeta(localeKey, slug, currency);
      const snippet = HUB_OG_SNIPPETS[slug];

      return buildSocialMetadata({
        title: localized.title,
        socialTitle: localized.socialTitle,
        description: localized.description,
        canonicalUrl,
        routePath,
        ogLocale,
        siteName,
        imageUrl:
          snippet?.imageUrl ||
          'https://images.unsplash.com/photo-1513542789411-b6a5d4f31634?auto=format&fit=crop&w=1200&h=630&q=85',
        imageAlt: localized.h1,
        keywords: localized.keywords,
      });
    }

    return null;
  }

  if (slugSegments.length === 2) {
    const [ageSlug, categorySlug] = slugSegments;
    const ageRoute = SEO_AGE_ROUTES[ageSlug];
    if (!ageRoute) return null;

    const subcategories = getSubcategorySlugMap(ageRoute.ageId);
    const currentSub = subcategories.find((s) => s.slug === categorySlug);
    if (!currentSub) return null;

    const localized = getLocalizedSubcategoryMeta(
      localeKey,
      ageSlug,
      currentSub.label,
      currency
    );
    const ogImage = getCategoryOgImage(currentSub.label);
    const routePath = `/${ageSlug}/${categorySlug}`;
    const canonicalUrl = `${BASE_SITE_URL}${prefix}${routePath}`;

    return buildSocialMetadata({
      title: localized.title,
      socialTitle: localized.socialTitle,
      description: localized.description,
      canonicalUrl,
      routePath,
      ogLocale,
      siteName,
      imageUrl: ogImage.url,
      imageAlt: localized.h1 || ogImage.alt,
      keywords: localized.keywords,
    });
  }

  return null;
}
