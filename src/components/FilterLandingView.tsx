'use client';

import React, { useMemo } from 'react';
import Link from 'next/link';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import ProductCard from '@/components/ProductCard';
import SeoFaq from '@/components/SeoFaq';
import AmazonLiveSearchCard from '@/components/AmazonLiveSearchCard';
import AmazonGridDiscoveryCard from '@/components/AmazonGridDiscoveryCard';
import ThemeAtmosphere from '@/components/ThemeAtmosphere';
import TopPodium from '@/components/TopPodium';
import AgeStageInterlinking from '@/components/AgeStageInterlinking';
import { ALL_SITE_PRODUCTS } from '@/data/allCatalogProducts';
import {
  SEO_FILTER_ROUTES,
  BASE_SITE_URL,
  matchProductsForFilter,
} from '@/lib/filterRoutes';
import { SEO_AGE_ROUTES } from '@/lib/seoRoutes';
import { useActiveLocale } from '@/hooks/useActiveLocale';
import { getLocalizedFilterMeta, getLocalizedAgeMeta } from '@/lib/i18nContent';
import { getHubLabels } from '@/lib/hubLabels';
import { generateProductItemListSchema } from '@/lib/schemaProduct';
import {
  ChevronRight,
  ShieldCheck,
  TrendingUp,
  ShoppingBag,
  Compass,
  ArrowRight,
  ArrowLeft,
  Sparkles,
  CheckCircle2,
  Gift,
} from 'lucide-react';

interface FilterLandingViewProps {
  filterSlug: string;
  omitSchema?: boolean;
}

export default function FilterLandingView({
  filterSlug,
  omitSchema = false,
}: FilterLandingViewProps) {
  const {
    localeKey,
    localePath,
    ui,
    activeCurrency,
    countryCode,
    amazonRegion,
    isRtl,
    tTerm,
  } = useActiveLocale();

  const routeMeta = SEO_FILTER_ROUTES[filterSlug];

  const meta = useMemo(
    () => getLocalizedFilterMeta(localeKey, filterSlug, activeCurrency),
    [localeKey, filterSlug, activeCurrency]
  );

  const labels = useMemo(
    () => getHubLabels(localeKey, activeCurrency),
    [localeKey, activeCurrency]
  );

  const matchedProducts = useMemo(() => {
    if (!routeMeta) return [];
    return matchProductsForFilter(routeMeta, ALL_SITE_PRODUCTS);
  }, [routeMeta]);

  const relatedFilters = useMemo(() => {
    if (!routeMeta) return [];
    const allFilters = Object.values(SEO_FILTER_ROUTES);
    const sameKind = allFilters.filter(
      (f) => f.filterKind === routeMeta.filterKind && f.slug !== routeMeta.slug
    );
    const otherFilters = allFilters.filter(
      (f) => f.filterKind !== routeMeta.filterKind && f.slug !== routeMeta.slug
    );
    return [...sameKind, ...otherFilters].slice(0, 12);
  }, [routeMeta]);

  const ageLinks = useMemo(
    () =>
      Object.values(SEO_AGE_ROUTES)
        .slice(0, 8)
        .map((ageRoute) => ({
          slug: ageRoute.ageSlug,
          label: getLocalizedAgeMeta(localeKey, ageRoute.ageSlug, activeCurrency).h1,
        })),
    [localeKey, activeCurrency]
  );

  const homeUrl =
    localeKey === 'es' ? BASE_SITE_URL : `${BASE_SITE_URL}${localePath('/')}`;
  const pageUrl = `${BASE_SITE_URL}${localePath(`/${filterSlug}`)}`;

  const localizedLabel = routeMeta ? tTerm(routeMeta.label) : filterSlug;

  const breadcrumbSchema = useMemo(
    () => ({
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: [
        {
          '@type': 'ListItem',
          position: 1,
          name: ui.breadcrumbHome,
          item: homeUrl,
        },
        {
          '@type': 'ListItem',
          position: 2,
          name: localizedLabel,
          item: pageUrl,
        },
      ],
    }),
    [ui.breadcrumbHome, homeUrl, localizedLabel, pageUrl]
  );

  const itemListSchema = useMemo(
    () =>
      generateProductItemListSchema(matchedProducts, meta.h1, {
        currency: activeCurrency,
        countryCode,
        region: amazonRegion,
        brandFallback: ui.brandName,
      }),
    [matchedProducts, meta.h1, activeCurrency, countryCode, amazonRegion, ui.brandName]
  );

  if (!routeMeta) return null;

  const filterLabels = labels.filterLanding;
  const searchInitial =
    localeKey === 'es' || localeKey === 'es-us'
      ? routeMeta.liveSearchQuery
      : localizedLabel;

  return (
    <div
      dir={isRtl ? 'rtl' : 'ltr'}
      className="min-h-screen relative flex flex-col bg-slate-50 text-slate-900 selection:bg-indigo-600 selection:text-white"
    >
      <ThemeAtmosphere />

      {!omitSchema && (
        <>
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
          />
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListSchema) }}
          />
        </>
      )}

      <Header currentTheme="classic" />

      <main className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 w-full z-10">
        {/* Breadcrumb Navigation */}
        <nav
          aria-label="Breadcrumb"
          className="flex items-center gap-2 text-xs font-semibold text-slate-700 mb-6 flex-wrap"
        >
          <Link
            href={localePath('/')}
            className="hover:text-indigo-800 transition-colors py-1"
          >
            {ui.breadcrumbHome}
          </Link>
          <ChevronRight
            className={`w-3.5 h-3.5 text-slate-500 ${isRtl ? 'rotate-180' : ''}`}
            aria-hidden="true"
          />
          <span className="text-slate-950 font-bold">{localizedLabel}</span>
        </nav>

        {/* HERO */}
        <section className="text-center py-6 sm:py-8 max-w-4xl mx-auto">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-bold mb-4 shadow-xs border border-slate-200 bg-white/95 backdrop-blur-md text-slate-800">
            <span aria-hidden="true">{routeMeta.icon}</span>
            <span>{ui.updatedBadge2026}</span>
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight leading-[1.15] mb-4 text-slate-900">
            {meta.h1}
          </h1>

          <p className="text-sm sm:text-base text-slate-700 leading-relaxed mb-6 max-w-3xl mx-auto">
            {meta.description}
          </p>

          {/* Trust badges */}
          <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-6 text-xs font-medium text-slate-700">
            <span className="flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-emerald-700" aria-hidden="true" />
              {ui.trustGuarantee}
            </span>
            <span className="flex items-center gap-1.5">
              <TrendingUp className="w-4 h-4 text-indigo-700" aria-hidden="true" />
              {ui.trustRatings}
            </span>
            <span className="flex items-center gap-1.5">
              <ShoppingBag className="w-4 h-4 text-amber-700" aria-hidden="true" />
              {ui.trustStock}
            </span>
          </div>
        </section>

        {/* PODIUM & FILTERED PRODUCTS */}
        <section className="mb-14">
          {matchedProducts.length >= 3 && (
            <TopPodium
              products={matchedProducts}
              filterLabel={localizedLabel}
              omitSchema={true}
            />
          )}

          <div className="flex items-center justify-between mb-4 gap-4 flex-wrap">
            <h2 className="text-xl font-black text-slate-900 flex items-center gap-2">
              <Gift className="w-5 h-5 text-indigo-700 shrink-0" aria-hidden="true" />
              <span>
                {filterLabels.catalogHeading}: {localizedLabel} ({matchedProducts.length}{' '}
                {ui.ideasUnit})
              </span>
            </h2>
            <Link
              href={localePath('/')}
              className="text-xs font-bold text-indigo-800 hover:text-indigo-950 hover:underline py-1 inline-flex items-center gap-1"
            >
              <ArrowLeft
                className={`w-3.5 h-3.5 ${isRtl ? 'rotate-180' : ''}`}
                aria-hidden="true"
              />
              <span>{filterLabels.allAgesCta}</span>
            </Link>
          </div>

          {matchedProducts.length <= 6 && (
            <p className="text-xs text-slate-700 bg-amber-50/80 border border-amber-200/80 rounded-xl px-3.5 py-2 mb-5 inline-flex items-center gap-2">
              <Sparkles className="w-3.5 h-3.5 text-amber-700 shrink-0" aria-hidden="true" />
              <span>{filterLabels.noStrictProductsNote}</span>
            </p>
          )}

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-2 sm:gap-2.5 lg:gap-3 mb-12">
            {matchedProducts.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                currentTheme="classic"
              />
            ))}
            <AmazonGridDiscoveryCard
              searchQuery={searchInitial}
              selectedCategory={
                routeMeta.filterKind === 'category' ? routeMeta.filterValue : ''
              }
            />
          </div>

          <AmazonLiveSearchCard
            currentTheme="classic"
            initialQuery={searchInitial}
            selectedPrice={routeMeta.filterKind === 'price' ? routeMeta.filterValue : 'all'}
          />
        </section>

        {/* WHY BUY / EDITORIAL VALUE PROPS */}
        <section className="my-10 p-6 sm:p-8 rounded-3xl bg-white border border-slate-200 shadow-xs text-slate-900">
          <div className="flex items-center gap-2 mb-2 text-indigo-800">
            <Sparkles className="w-5 h-5 text-indigo-700 shrink-0" aria-hidden="true" />
            <span className="text-xs font-black uppercase tracking-wider">
              {labels.common.editorialGuideEyebrow}
            </span>
          </div>

          <h2 className="text-xl sm:text-2xl font-black text-slate-900 mb-5 tracking-tight">
            {filterLabels.whyTitlePrefix} {localizedLabel}
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {filterLabels.whyCards.map((card, idx) => (
              <div
                key={idx}
                className="p-4 rounded-2xl bg-slate-50 border border-slate-200/90 space-y-1.5"
              >
                <div className="flex items-center gap-2 text-slate-900 font-extrabold text-sm">
                  {card.icon ? (
                    <span aria-hidden="true">{card.icon}</span>
                  ) : (
                    <CheckCircle2 className="w-4 h-4 text-emerald-700 shrink-0" aria-hidden="true" />
                  )}
                  <h3>{card.title}</h3>
                </div>
                <p className="text-xs text-slate-700 leading-relaxed">{card.body}</p>
              </div>
            ))}
          </div>
        </section>

        {/* RELATED FILTERS & BUDGETS */}
        <section className="my-10 rounded-3xl overflow-hidden border-2 border-slate-200 bg-white shadow-xs">
          <div className="bg-[#131921] px-5 py-3.5 border-b-2 border-amber-400/60 flex items-center justify-between text-white gap-3">
            <div className="flex items-center gap-2.5 min-w-0">
              <div className="w-8 h-8 rounded-xl bg-[#febd69] text-slate-950 flex items-center justify-center font-black shrink-0">
                <Compass className="w-4 h-4 stroke-[2.5]" aria-hidden="true" />
              </div>
              <h2 className="text-xs sm:text-sm font-black text-[#febd69] uppercase tracking-wider truncate">
                {filterLabels.relatedFiltersTitle}
              </h2>
            </div>
            <Link
              href={localePath('/')}
              className="text-xs font-bold text-amber-300 hover:text-white transition-colors shrink-0"
            >
              {ui.viewAllAges}
            </Link>
          </div>

          <div className="p-4 sm:p-6 space-y-5">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2.5">
              {relatedFilters.map((other) => (
                <Link
                  key={other.slug}
                  href={localePath(`/${other.slug}`)}
                  className="group flex items-center justify-between p-3 rounded-2xl bg-slate-50 hover:bg-[#131921] border border-slate-200 hover:border-[#131921] text-slate-900 hover:text-white transition-all"
                >
                  <span className="flex items-center gap-2 min-w-0 pr-2 text-xs font-bold truncate">
                    <span aria-hidden="true">{other.icon}</span>
                    <span className="truncate">{tTerm(other.label)}</span>
                  </span>
                  <ArrowRight
                    className={`w-3.5 h-3.5 text-slate-600 group-hover:text-[#febd69] shrink-0 ${
                      isRtl ? 'rotate-180' : ''
                    }`}
                    aria-hidden="true"
                  />
                </Link>
              ))}
            </div>

            <div className="pt-4 border-t border-slate-100">
              <h3 className="text-xs font-black uppercase tracking-wider text-slate-700 mb-3">
                {ui.navAges}
              </h3>
              <div className="flex flex-wrap gap-2">
                {ageLinks.map((age) => (
                  <Link
                    key={age.slug}
                    href={localePath(`/${age.slug}`)}
                    className="px-3 py-1.5 rounded-xl bg-slate-100 hover:bg-indigo-700 text-slate-800 hover:text-white text-xs font-semibold transition-colors"
                  >
                    {age.label}
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </section>

        <AgeStageInterlinking currentAgeSlug="" localeKey={localeKey} />

        <SeoFaq currentTheme="classic" localeKey={localeKey} omitSchema={omitSchema} />
      </main>

      <Footer currentTheme="classic" />
    </div>
  );
}
