import React from 'react';
import { I18N_SEO_ROUTES } from '@/lib/i18nRoutes';
import {
  ALL_STATIC_HUB_SLUGS,
  BASE_SITE_URL,
  SEO_FILTER_ROUTES,
} from '@/lib/filterRoutes';
import { SEO_AGE_ROUTES, getSubcategorySlugMap } from '@/lib/seoRoutes';
import LocaleAutoInitializer from '@/components/LocaleAutoInitializer';
import HomeCatalogView from '@/components/HomeCatalogView';
import AgeLandingView from '@/components/AgeLandingView';
import SubcategoryLandingView from '@/components/SubcategoryLandingView';
import FilterLandingView from '@/components/FilterLandingView';
import PersonaHubView from '@/components/PersonaHubView';
import AutomovilView from '@/components/hubs/AutomovilView';
import CafeView from '@/components/hubs/CafeView';
import CartaPapaNoelView from '@/components/hubs/CartaPapaNoelView';
import CiclismoView from '@/components/hubs/CiclismoView';
import GamingView from '@/components/hubs/GamingView';
import HalloweenView from '@/components/hubs/HalloweenView';
import MascotasView from '@/components/hubs/MascotasView';
import MotoristasView from '@/components/hubs/MotoristasView';
import NavidadView from '@/components/hubs/NavidadView';
import RegalosGta6View from '@/components/hubs/RegalosGta6View';
import VotarView from '@/components/hubs/VotarView';

export function renderLocalizedHomeView(localeKey: string): React.ReactNode | null {
  const cfg = I18N_SEO_ROUTES[localeKey];
  if (!cfg) return null;

  const i18nSchema = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'WebPage',
        '@id': `${BASE_SITE_URL}/${cfg.slug}#webpage`,
        url: `${BASE_SITE_URL}/${cfg.slug}`,
        name: cfg.title,
        description: cfg.description,
        inLanguage: cfg.hreflang,
        isPartOf: {
          '@id': `${BASE_SITE_URL}/#website`,
        },
      },
      ...(cfg.faqItems.length > 0
        ? [
            {
              '@type': 'FAQPage',
              mainEntity: cfg.faqItems.map((item) => ({
                '@type': 'Question',
                name: item.question,
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: item.answer,
                },
              })),
            },
          ]
        : []),
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(i18nSchema) }}
      />
      <LocaleAutoInitializer
        langCode={cfg.langCode}
        googleCode={cfg.googleCode}
        currency={cfg.currency}
      />
      <HomeCatalogView i18nConfig={cfg} />
    </>
  );
}

function renderStaticHubComponent(slug: string): React.ReactNode | null {
  switch (slug) {
    case 'motoristas':
      return <MotoristasView omitSchema={false} />;
    case 'automovil':
      return <AutomovilView omitSchema={false} />;
    case 'ciclismo':
      return <CiclismoView omitSchema={false} />;
    case 'gaming':
      return <GamingView omitSchema={false} />;
    case 'amantes-del-cafe':
      return <CafeView omitSchema={false} />;
    case 'mascotas':
      return <MascotasView omitSchema={false} />;
    case 'halloween':
      return <HalloweenView omitSchema={false} />;
    case 'navidad':
      return <NavidadView omitSchema={false} />;
    case 'carta-papa-noel':
      return <CartaPapaNoelView omitSchema={false} />;
    case 'regalos-gta-6':
      return <RegalosGta6View omitSchema={false} />;
    case 'votar':
      return <VotarView omitSchema={false} />;
    case 'que-regalar-a-un-hombre':
      return (
        <PersonaHubView
          hubSlug="que-regalar-a-un-hombre"
          personaKey="hombre"
          themeAccent="indigo"
          omitSchema={false}
        />
      );
    case 'que-regalar-a-una-mujer':
      return (
        <PersonaHubView
          hubSlug="que-regalar-a-una-mujer"
          personaKey="mujer"
          themeAccent="rose"
          omitSchema={false}
        />
      );
    case 'que-regalar-a-mi-novio':
      return (
        <PersonaHubView
          hubSlug="que-regalar-a-mi-novio"
          personaKey="novio"
          themeAccent="indigo"
          parentBreadcrumbSlug="que-regalar-a-un-hombre"
          omitSchema={false}
        />
      );
    case 'que-regalar-a-mi-novia':
      return (
        <PersonaHubView
          hubSlug="que-regalar-a-mi-novia"
          personaKey="novia"
          themeAccent="rose"
          parentBreadcrumbSlug="que-regalar-a-una-mujer"
          omitSchema={false}
        />
      );
    case 'regalos-menos-20-euros':
      return (
        <PersonaHubView
          hubSlug="regalos-menos-20-euros"
          personaKey="under20"
          themeAccent="emerald"
          omitSchema={false}
        />
      );
    case 'regalos-para-los-que-tienen-de-todo':
      return (
        <PersonaHubView
          hubSlug="regalos-para-los-que-tienen-de-todo"
          personaKey="tienenDeTodo"
          themeAccent="purple"
          omitSchema={false}
        />
      );
    default:
      return null;
  }
}

export function renderLocalizedRouteView(
  localeKey: string,
  slugSegments: string[]
): React.ReactNode | null {
  const isRootEs = localeKey === 'es';
  const cfg = isRootEs ? null : I18N_SEO_ROUTES[localeKey];
  if (!isRootEs && !cfg) return null;

  const wrap = (node: React.ReactNode) => (
    <>
      {cfg && (
        <LocaleAutoInitializer
          langCode={cfg.langCode}
          googleCode={cfg.googleCode}
          currency={cfg.currency}
        />
      )}
      {node}
    </>
  );

  if (slugSegments.length === 1) {
    const slug = slugSegments[0];

    if (ALL_STATIC_HUB_SLUGS.includes(slug)) {
      const hubNode = renderStaticHubComponent(slug);
      return hubNode ? wrap(hubNode) : null;
    }

    if (SEO_FILTER_ROUTES[slug]) {
      return wrap(<FilterLandingView filterSlug={slug} omitSchema={false} />);
    }

    if (SEO_AGE_ROUTES[slug]) {
      return wrap(<AgeLandingView ageSlug={slug} omitSchema={false} />);
    }

    return null;
  }

  if (slugSegments.length === 2) {
    const [ageSlug, categorySlug] = slugSegments;
    const ageRoute = SEO_AGE_ROUTES[ageSlug];
    if (!ageRoute) return null;

    const validSub = getSubcategorySlugMap(ageRoute.ageId).some(
      (s) => s.slug === categorySlug
    );
    if (!validSub) return null;

    return wrap(
      <SubcategoryLandingView
        ageSlug={ageSlug}
        categorySlug={categorySlug}
        omitSchema={false}
      />
    );
  }

  return null;
}
