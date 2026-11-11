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
import ExpertBuyerTips from '@/components/ExpertBuyerTips';
import { ALL_SITE_PRODUCTS } from '@/data/allCatalogProducts';
import { Product } from '@/data/products';
import { SEO_AGE_ROUTES, getSubcategorySlugMap } from '@/lib/seoRoutes';
import {
  BASE_SITE_URL,
  SEO_FILTER_ROUTES,
  matchProductsForAgeAndFilter,
} from '@/lib/filterRoutes';
import { matchProductsForSubcategory } from '@/lib/subcategoryMatcher';
import { useActiveLocale } from '@/hooks/useActiveLocale';
import { getLocalizedAgeMeta } from '@/lib/i18nContent';
import { generateProductItemListSchema } from '@/lib/schemaProduct';
import {
  ShieldCheck,
  TrendingUp,
  Gift,
  ChevronRight,
  ShoppingBag,
  Compass,
  ArrowRight,
  ArrowLeft,
} from 'lucide-react';

interface AgeLandingViewProps {
  ageSlug: string;
  omitSchema?: boolean;
}

export default function AgeLandingView({
  ageSlug,
  omitSchema = false,
}: AgeLandingViewProps) {
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

  const routeMeta = SEO_AGE_ROUTES[ageSlug];

  const meta = useMemo(
    () => getLocalizedAgeMeta(localeKey, ageSlug, activeCurrency),
    [localeKey, ageSlug, activeCurrency]
  );

  const subcategoryList = useMemo(
    () => (routeMeta ? getSubcategorySlugMap(routeMeta.ageId) : []),
    [routeMeta]
  );

  const activeAgeFilters = useMemo(() => {
    if (!routeMeta) return [];
    const subSlugs = new Set(subcategoryList.map((s) => s.slug));
    return Object.values(SEO_FILTER_ROUTES).filter(
      (flt) =>
        !subSlugs.has(flt.slug) &&
        matchProductsForAgeAndFilter(ageSlug, flt, ALL_SITE_PRODUCTS, true).length > 0
    );
  }, [routeMeta, subcategoryList, ageSlug]);

  const ageProducts: Product[] = useMemo(() => {
    if (!routeMeta) return [];

    if (routeMeta.ageId === 'reveal') {
      const strictReveal = ALL_SITE_PRODUCTS.filter(
        (p) =>
          p.subcategory === 'Fiestas y Revelación de Género' ||
          p.title.toLowerCase().includes('revelación') ||
          p.description.toLowerCase().includes('revelación') ||
          p.searchQuery.toLowerCase().includes('revelacion')
      );
      if (strictReveal.length >= 6) return strictReveal;
      const padded = matchProductsForSubcategory(
        'reveal',
        'Fiestas y Revelación de Género',
        ALL_SITE_PRODUCTS,
        6
      );
      const seen = new Set(strictReveal.map((p) => p.id));
      return [...strictReveal, ...padded.filter((p) => !seen.has(p.id))];
    }

    return ALL_SITE_PRODUCTS.filter((p) => p.ageRange === routeMeta.ageId);
  }, [routeMeta]);

  const homeUrl =
    localeKey === 'es' ? BASE_SITE_URL : `${BASE_SITE_URL}${localePath('/')}`;
  const pageUrl = `${BASE_SITE_URL}${localePath(`/${ageSlug}`)}`;

  const itemListSchema = useMemo(
    () =>
      generateProductItemListSchema(ageProducts, meta.h1, {
        currency: activeCurrency,
        countryCode,
        region: amazonRegion,
        brandFallback: ui.brandName,
      }),
    [ageProducts, meta.h1, activeCurrency, countryCode, amazonRegion, ui.brandName]
  );

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
          name: meta.h1,
          item: pageUrl,
        },
      ],
    }),
    [ui.breadcrumbHome, homeUrl, meta.h1, pageUrl]
  );

  if (!routeMeta) return null;

  const liveSearchInitial =
    localeKey === 'es' || localeKey === 'es-us'
      ? routeMeta.keywords[0] || 'regalos recomendados'
      : tTerm(meta.keywords[0] || routeMeta.h1);

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
          <span className="text-slate-950 font-bold">{meta.h1}</span>
        </nav>

        {/* HERO SEO SECTION */}
        <section className="text-center py-6 sm:py-8 max-w-4xl mx-auto">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-bold mb-4 shadow-xs border border-slate-200 bg-white/95 backdrop-blur-md text-slate-800">
            <span className="flex h-2 w-2 rounded-full bg-emerald-500 animate-pulse" aria-hidden="true" />
            <span>{ui.updatedBadge2026}</span>
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight leading-[1.15] mb-4 text-slate-900">
            {meta.h1}
          </h1>

          <p className="text-sm sm:text-base text-slate-700 leading-relaxed mb-6 max-w-3xl mx-auto">
            {meta.description}
          </p>

          {/* THEMATIC EXPLORATION BOX (AMAZON-STYLE CATEGORY NAV) */}
          {subcategoryList.length > 0 && (
            <div className="max-w-4xl mx-auto mb-10 text-left rounded-3xl overflow-hidden border-2 border-slate-300 bg-white shadow-lg">
              <div className="bg-[#131921] px-5 py-3.5 border-b-2 border-amber-400/60 flex items-center justify-between text-white gap-3">
                <div className="flex items-center gap-3 min-w-0">
                  <div className="w-8 h-8 rounded-xl bg-[#febd69] text-slate-950 flex items-center justify-center font-black shadow-xs shrink-0">
                    <Compass className="w-4 h-4 stroke-[2.5]" aria-hidden="true" />
                  </div>
                  <div className="min-w-0">
                    <h2 className="text-xs sm:text-sm font-black text-[#febd69] uppercase tracking-wider">
                      {ui.exploreThemesTitle}
                    </h2>
                    <p className="text-[11px] text-slate-300 hidden sm:block">
                      {ui.exploreThemesSubtitle}
                    </p>
                  </div>
                </div>
                <span className="text-[10px] font-black uppercase tracking-wider px-3 py-1 rounded-full bg-white/10 text-amber-300 border border-white/20 shrink-0">
                  {subcategoryList.length} {ui.themesCountWord}
                </span>
              </div>

              <div className="p-4 sm:p-5 bg-gradient-to-b from-slate-50/80 via-white to-amber-50/30">
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2.5">
                  {subcategoryList.map((sub) => (
                    <Link
                      key={sub.slug}
                      href={localePath(`/${ageSlug}/${sub.slug}`)}
                      className="group relative flex items-center justify-between p-3 rounded-2xl bg-white hover:bg-[#131921] border-2 border-slate-200 hover:border-[#131921] text-slate-900 hover:text-white transition-all shadow-xs hover:shadow-md hover:-translate-y-0.5 cursor-pointer"
                    >
                      <div className="flex items-center gap-2.5 min-w-0 pr-2">
                        <span className="w-2 h-2 rounded-full bg-amber-500 group-hover:scale-125 transition-transform shrink-0" aria-hidden="true" />
                        <span className="text-xs font-bold truncate group-hover:text-amber-200 transition-colors">
                          {tTerm(sub.label)}
                        </span>
                      </div>
                      <ArrowRight
                        className={`w-3.5 h-3.5 text-slate-600 group-hover:text-[#febd69] transition-all shrink-0 ${
                          isRtl ? 'rotate-180 group-hover:-translate-x-1' : 'group-hover:translate-x-1'
                        }`}
                        aria-hidden="true"
                      />
                    </Link>
                  ))}
                </div>

                {activeAgeFilters.length > 0 && (
                  <div className="mt-4 pt-4 border-t border-slate-200/80">
                    <h3 className="text-[11px] font-black uppercase tracking-wider text-slate-700 mb-2.5">
                      {ui.directoryFiltersTitle}
                    </h3>
                    <div className="flex flex-wrap gap-1.5">
                      {activeAgeFilters.map((flt) => (
                        <Link
                          key={flt.slug}
                          href={localePath(`/${ageSlug}/${flt.slug}`)}
                          className="px-2.5 py-1 rounded-xl text-[11px] font-semibold bg-white hover:bg-[#131921] text-slate-800 hover:text-amber-200 border border-slate-200 hover:border-[#131921] transition-colors"
                        >
                          <span aria-hidden="true">{flt.icon} </span>
                          {tTerm(flt.label)}
                        </Link>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              <div className="px-5 py-2.5 bg-slate-50 border-t border-slate-200/80 flex flex-col sm:flex-row items-center justify-between gap-1 text-[11px] text-slate-700">
                <span className="flex items-center gap-1.5 font-medium">
                  <span className="text-amber-800 font-black" aria-hidden="true">✓</span>
                  <span>{ui.verifiedCatalogNote}</span>
                </span>
                <span className="font-bold text-slate-800">
                  {ageProducts.length} {ui.analyzedWord}
                </span>
              </div>
            </div>
          )}

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

        {/* PRODUCTS GRID */}
        <section className="mb-14">
          <TopPodium
            products={ageProducts}
            filterLabel={meta.h1}
            omitSchema={true}
          />

          <div className="flex items-center justify-between mb-6 gap-4 flex-wrap">
            <h2 className="text-xl font-black text-slate-900 flex items-center gap-2">
              <Gift className="w-5 h-5 text-indigo-700 shrink-0" aria-hidden="true" />
              <span>
                {ui.recommendedProductsTitle} ({ageProducts.length} {ui.ideasUnit})
              </span>
            </h2>
            <Link
              href={localePath('/')}
              className="text-xs font-bold text-indigo-800 hover:text-indigo-950 hover:underline py-1 inline-flex items-center gap-1"
            >
              <ArrowLeft className={`w-3.5 h-3.5 ${isRtl ? 'rotate-180' : ''}`} aria-hidden="true" />
              <span>{ui.viewAllAges.replace(/^←\s*/, '')}</span>
            </Link>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-2 sm:gap-2.5 lg:gap-3 mb-12">
            {ageProducts.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                currentTheme="classic"
              />
            ))}
            <AmazonGridDiscoveryCard selectedAge={routeMeta.ageId} />
          </div>

          <AmazonLiveSearchCard
            currentTheme="classic"
            initialQuery={liveSearchInitial}
          />
        </section>

        {/* EXPERT EDITORIAL BUYER'S GUIDE */}
        <ExpertBuyerTips ageTitle={meta.h1} localeKey={localeKey} />

        {/* INTERLINKING ADJACENT STAGES */}
        <AgeStageInterlinking currentAgeSlug={ageSlug} localeKey={localeKey} />

        {/* SEO FAQ SECTION */}
        <SeoFaq currentTheme="classic" localeKey={localeKey} omitSchema={omitSchema} />
      </main>

      <Footer currentTheme="classic" />
    </div>
  );
}
