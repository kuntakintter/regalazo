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
import { SEO_AGE_ROUTES, getSubcategorySlugMap } from '@/lib/seoRoutes';
import { BASE_SITE_URL } from '@/lib/filterRoutes';
import { matchProductsForSubcategory } from '@/lib/subcategoryMatcher';
import { useActiveLocale } from '@/hooks/useActiveLocale';
import { getLocalizedAgeMeta, getLocalizedSubcategoryMeta } from '@/lib/i18nContent';
import { generateProductItemListSchema } from '@/lib/schemaProduct';
import {
  Gift,
  ChevronRight,
  ShieldCheck,
  ShoppingBag,
  TrendingUp,
  Compass,
  ArrowRight,
  ArrowLeft,
} from 'lucide-react';

interface SubcategoryLandingViewProps {
  ageSlug: string;
  categorySlug: string;
  omitSchema?: boolean;
}

export default function SubcategoryLandingView({
  ageSlug,
  categorySlug,
  omitSchema = false,
}: SubcategoryLandingViewProps) {
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

  const ageRoute = SEO_AGE_ROUTES[ageSlug];

  const subcategories = useMemo(
    () => (ageRoute ? getSubcategorySlugMap(ageRoute.ageId) : []),
    [ageRoute]
  );

  const currentSub = useMemo(
    () => subcategories.find((s) => s.slug === categorySlug),
    [subcategories, categorySlug]
  );

  const ageMeta = useMemo(
    () => getLocalizedAgeMeta(localeKey, ageSlug, activeCurrency),
    [localeKey, ageSlug, activeCurrency]
  );

  const subMeta = useMemo(
    () =>
      getLocalizedSubcategoryMeta(
        localeKey,
        ageSlug,
        currentSub?.label || categorySlug,
        activeCurrency
      ),
    [localeKey, ageSlug, currentSub?.label, categorySlug, activeCurrency]
  );

  const matchedProducts = useMemo(() => {
    if (!ageRoute || !currentSub) return [];
    return matchProductsForSubcategory(
      ageRoute.ageId,
      currentSub.label,
      ALL_SITE_PRODUCTS,
      6
    );
  }, [ageRoute, currentSub]);

  const homeUrl =
    localeKey === 'es' ? BASE_SITE_URL : `${BASE_SITE_URL}${localePath('/')}`;
  const agePageUrl = `${BASE_SITE_URL}${localePath(`/${ageSlug}`)}`;
  const currentPageUrl = `${BASE_SITE_URL}${localePath(`/${ageSlug}/${categorySlug}`)}`;

  const localizedSubLabel = currentSub ? tTerm(currentSub.label) : categorySlug;

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
          name: ageMeta.h1,
          item: agePageUrl,
        },
        {
          '@type': 'ListItem',
          position: 3,
          name: localizedSubLabel,
          item: currentPageUrl,
        },
      ],
    }),
    [ui.breadcrumbHome, homeUrl, ageMeta.h1, agePageUrl, localizedSubLabel, currentPageUrl]
  );

  const itemListSchema = useMemo(
    () =>
      generateProductItemListSchema(matchedProducts, subMeta.h1, {
        currency: activeCurrency,
        countryCode,
        region: amazonRegion,
        brandFallback: ui.brandName,
      }),
    [matchedProducts, subMeta.h1, activeCurrency, countryCode, amazonRegion, ui.brandName]
  );

  if (!ageRoute || !currentSub) return null;

  const siblingSubcategories = subcategories.filter((s) => s.slug !== categorySlug);

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
          <Link
            href={localePath(`/${ageSlug}`)}
            className="hover:text-indigo-800 transition-colors py-1"
          >
            {ageMeta.h1}
          </Link>
          <ChevronRight
            className={`w-3.5 h-3.5 text-slate-500 ${isRtl ? 'rotate-180' : ''}`}
            aria-hidden="true"
          />
          <span className="text-slate-950 font-bold">{localizedSubLabel}</span>
        </nav>

        {/* HERO */}
        <section className="text-center py-6 sm:py-8 max-w-4xl mx-auto">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-bold mb-4 shadow-xs border border-slate-200 bg-white/95 backdrop-blur-md text-slate-800">
            <span className="flex h-2 w-2 rounded-full bg-emerald-500 animate-pulse" aria-hidden="true" />
            <span>{ui.updatedBadge2026}</span>
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight leading-[1.15] mb-4 text-slate-900">
            {subMeta.h1}
          </h1>

          <p className="text-sm sm:text-base text-slate-700 leading-relaxed mb-6 max-w-3xl mx-auto">
            {subMeta.description}
          </p>

          {/* THEMATIC EXPLORATION BOX (SIBLING CATEGORIES) */}
          {siblingSubcategories.length > 0 && (
            <div className="max-w-4xl mx-auto mb-10 text-left rounded-3xl overflow-hidden border-2 border-slate-300 bg-white shadow-lg">
              <div className="bg-[#131921] px-5 py-3.5 border-b-2 border-amber-400/60 flex items-center justify-between text-white gap-3">
                <div className="flex items-center gap-2.5 min-w-0">
                  <div className="w-8 h-8 rounded-xl bg-[#febd69] text-slate-950 flex items-center justify-center font-black shadow-xs shrink-0">
                    <Compass className="w-4 h-4 stroke-[2.5]" aria-hidden="true" />
                  </div>
                  <div className="min-w-0">
                    <h2 className="text-xs sm:text-sm font-black text-[#febd69] uppercase tracking-wider truncate">
                      {ui.otherThemesIn} {ageMeta.h1}
                    </h2>
                    <p className="text-[11px] text-slate-300 hidden sm:block">
                      {ui.moreAlternatives}
                    </p>
                  </div>
                </div>
                <Link
                  href={localePath(`/${ageSlug}`)}
                  className="text-xs font-bold text-amber-300 hover:text-white flex items-center gap-1 transition-colors px-3 py-1 rounded-full bg-white/10 border border-white/20 shrink-0"
                >
                  <ArrowLeft className={`w-3.5 h-3.5 ${isRtl ? 'rotate-180' : ''}`} aria-hidden="true" />
                  <span>{ui.viewAllLink.replace(/^←\s*/, '')}</span>
                </Link>
              </div>

              <div className="p-4 sm:p-5 bg-gradient-to-b from-slate-50/80 via-white to-amber-50/30">
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2.5">
                  {siblingSubcategories.map((sub) => (
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
              </div>
            </div>
          )}

          {/* Trust badges */}
          <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-6 text-xs font-medium text-slate-700">
            <span className="flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-emerald-700" aria-hidden="true" />
              {ui.trustFreeReturns}
            </span>
            <span className="flex items-center gap-1.5">
              <TrendingUp className="w-4 h-4 text-indigo-700" aria-hidden="true" />
              {ui.trustRatings}
            </span>
            <span className="flex items-center gap-1.5">
              <ShoppingBag className="w-4 h-4 text-amber-700" aria-hidden="true" />
              {ui.trustPrimeShipping}
            </span>
          </div>
        </section>

        {/* PRODUCTS GRID */}
        <section className="mb-14">
          {matchedProducts.length >= 3 && (
            <TopPodium
              products={matchedProducts}
              filterLabel={localizedSubLabel}
              omitSchema={true}
            />
          )}

          <div className="flex items-center justify-between mb-6 gap-4 flex-wrap">
            <h2 className="text-xl font-black text-slate-900 flex items-center gap-2">
              <Gift className="w-5 h-5 text-indigo-700 shrink-0" aria-hidden="true" />
              <span>
                {localizedSubLabel} ({matchedProducts.length} {ui.productsUnit})
              </span>
            </h2>
          </div>

          {matchedProducts.length > 0 ? (
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-2 sm:gap-2.5 lg:gap-3 mb-12">
              {matchedProducts.map((product) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  currentTheme="classic"
                />
              ))}
              <AmazonGridDiscoveryCard
                selectedCategory={currentSub.label}
                selectedAge={ageRoute.ageId}
              />
            </div>
          ) : (
            <div className="text-center py-12 px-4 rounded-3xl border border-dashed border-slate-300 mb-8 bg-white/80">
              <p className="text-sm text-slate-700 mb-4">{ui.emptyFallbackDesc}</p>
              <Link
                href={localePath(`/${ageSlug}`)}
                className="px-5 py-2.5 rounded-xl bg-indigo-700 text-white font-bold text-xs hover:bg-indigo-800 transition-colors inline-block"
              >
                {ui.emptyFallbackBtn}
              </Link>
            </div>
          )}

          <AmazonLiveSearchCard
            currentTheme="classic"
            initialQuery={
              localeKey === 'es' || localeKey === 'es-us'
                ? currentSub.label
                : localizedSubLabel
            }
          />
        </section>

        {/* EXPERT EDITORIAL BUYER'S GUIDE */}
        <ExpertBuyerTips
          ageTitle={`${localizedSubLabel} (${ageMeta.h1})`}
          localeKey={localeKey}
        />

        {/* INTERLINKING ADJACENT STAGES */}
        <AgeStageInterlinking currentAgeSlug={ageSlug} localeKey={localeKey} />

        <SeoFaq currentTheme="classic" localeKey={localeKey} omitSchema={omitSchema} />
      </main>

      <Footer currentTheme="classic" />
    </div>
  );
}
