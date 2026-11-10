'use client';

import React, { useState, useMemo, useEffect, useCallback } from 'react';
import Link from 'next/link';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import ProductCard from '@/components/ProductCard';
import LiveAmazonProductCard from '@/components/LiveAmazonProductCard';
import AmazonLiveSearchCard from '@/components/AmazonLiveSearchCard';
import AmazonGridDiscoveryCard from '@/components/AmazonGridDiscoveryCard';
import ThemeAtmosphere from '@/components/ThemeAtmosphere';
import TopPodium from '@/components/TopPodium';
import ChristmasCountdown from '@/components/ChristmasCountdown';
import SeoFaq from '@/components/SeoFaq';
import {
  NAVIDAD_PRODUCTS,
  NAVIDAD_CATEGORIES,
  NAVIDAD_PRICE_RANGES,
} from '@/data/navidadData';
import { Product } from '@/data/products';
import { LiveSearchResult } from '@/app/api/live-search/route';
import { parsePrice } from '@/lib/amazon';
import { useActiveLocale } from '@/hooks/useActiveLocale';
import { getLocalizedStaticHubMeta } from '@/lib/i18nContent';
import { getHubLabels } from '@/lib/hubLabels';
import { generateProductItemListSchema } from '@/lib/schemaProduct';
import {
  ShieldCheck,
  BadgePercent,
  Loader2,
  Filter,
  ChevronRight,
  Gift,
  ShoppingBag,
} from 'lucide-react';

interface HubViewProps {
  omitSchema?: boolean;
}

export default function NavidadView({ omitSchema = false }: HubViewProps) {
  const {
    localeKey,
    localePath,
    ui,
    activeCurrency,
    countryCode,
    amazonRegion,
    amazonSiteName,
    isRtl,
    tTerm,
  } = useActiveLocale();

  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedPrice, setSelectedPrice] = useState<string>('all');
  const [sortBy, setSortBy] = useState<'featured' | 'price-asc' | 'price-desc' | 'rating'>('featured');
  const [liveAmazonProducts, setLiveAmazonProducts] = useState<LiveSearchResult[]>([]);
  const [isLoadingLive, setIsLoadingLive] = useState(false);

  const labels = getHubLabels(localeKey, activeCurrency);
  const niche = labels.navidad;
  const hubMeta = getLocalizedStaticHubMeta(localeKey, 'navidad', activeCurrency);
  const isEs = localeKey === 'es' || localeKey === 'es-us';

  const filteredProducts = useMemo(() => {
    return NAVIDAD_PRODUCTS.filter((prod) => {
      if (selectedCategory !== 'all' && prod.category !== selectedCategory) return false;
      if (selectedPrice !== 'all') {
        if (selectedPrice === '<15' && prod.priceNumeric >= 15) return false;
        if (selectedPrice === '15-30' && (prod.priceNumeric < 15 || prod.priceNumeric > 30)) return false;
        if (selectedPrice === '30-60' && (prod.priceNumeric < 30 || prod.priceNumeric > 60)) return false;
        if (selectedPrice === '>60' && prod.priceNumeric < 60) return false;
      }
      return true;
    });
  }, [selectedCategory, selectedPrice]);

  const displayProducts: Product[] = useMemo(() => {
    return filteredProducts.map((m) => {
      let priceRange: '<20' | '20-50' | '50-100' | '>100' = '20-50';
      if (m.priceNumeric < 20) priceRange = '<20';
      else if (m.priceNumeric <= 50) priceRange = '20-50';
      else if (m.priceNumeric <= 100) priceRange = '50-100';
      else priceRange = '>100';

      return {
        id: m.id,
        asin: m.asin,
        title: m.title,
        slug: m.id,
        priceText: m.priceText,
        priceRange,
        rating: m.rating,
        reviewsCount: m.reviewsCount,
        badge: m.badge,
        category: 'Navidad',
        subcategory: m.categoryLabel,
        imageUrl: m.imageUrl,
        images: [m.imageUrl],
        description: m.description,
        pros: m.pros,
        idealFor: m.idealFor,
        searchQuery: m.searchQuery,
        gender: 'unisex',
        ageRange: '+18',
        style: 'classic',
      };
    });
  }, [filteredProducts]);

  const sortedDisplayProducts = useMemo(() => {
    const list = [...displayProducts];
    if (sortBy === 'price-asc') {
      list.sort((a, b) => parsePrice(a.priceText) - parsePrice(b.priceText));
    } else if (sortBy === 'price-desc') {
      list.sort((a, b) => parsePrice(b.priceText) - parsePrice(a.priceText));
    } else if (sortBy === 'rating') {
      list.sort((a, b) => b.rating - a.rating);
    }
    return list;
  }, [displayProducts, sortBy]);

  const sortedLiveAmazonProducts = useMemo(() => {
    const list = [...liveAmazonProducts];
    if (sortBy === 'price-asc') {
      list.sort((a, b) => parsePrice(a.priceText) - parsePrice(b.priceText));
    } else if (sortBy === 'price-desc') {
      list.sort((a, b) => parsePrice(b.priceText) - parsePrice(a.priceText));
    } else if (sortBy === 'rating') {
      list.sort((a, b) => b.rating - a.rating);
    }
    return list;
  }, [liveAmazonProducts, sortBy]);

  const liveSearchQuery = useMemo(() => {
    if (selectedCategory === 'trenes') {
      return isEs
        ? 'tren de navidad electrico arbol polar express vias humo sonido'
        : 'christmas tree electric train set smoke sound';
    }
    if (selectedCategory === 'decoracion') {
      return isEs
        ? 'decoracion arbol navidad luces led cortina villa navidena adorno'
        : 'christmas tree lights ornaments holiday village decor';
    }
    if (selectedCategory === 'amigo-invisible') {
      return isEs
        ? 'regalos amigo invisible divertidos originales menos 15 euros'
        : 'secret santa gifts under 15 funny practical';
    }
    if (selectedCategory === 'adviento') {
      return isEs
        ? 'calendario de adviento chocolate juguetes lego belleza'
        : 'advent calendar lego chocolate beauty 2026';
    }
    if (selectedCategory === 'jerseis-luces') {
      return isEs
        ? 'jersey navideno luces led divertido ugly sweater familia'
        : 'light up christmas ugly sweater holiday family';
    }
    if (selectedCategory === 'gourmet') {
      return isEs
        ? 'cesta navidad bombones lindt chocolate dulces regalos'
        : 'gourmet christmas gift hamper chocolate lindt';
    }
    return niche.liveSearchDefaultQuery;
  }, [selectedCategory, isEs, niche.liveSearchDefaultQuery]);

  useEffect(() => {
    const hasFilter = selectedCategory !== 'all' || selectedPrice !== 'all';

    if (hasFilter && liveSearchQuery) {
      let isMounted = true;
      setIsLoadingLive(true);
      const timer = setTimeout(() => {
        fetch(`/api/live-search?q=${encodeURIComponent(liveSearchQuery)}&limit=8&region=${amazonRegion}`)
          .then((res) => res.json())
          .then((data) => {
            if (isMounted && data.success && Array.isArray(data.results)) {
              setLiveAmazonProducts(data.results);
            }
          })
          .catch((err) => console.error(err))
          .finally(() => {
            if (isMounted) setIsLoadingLive(false);
          });
      }, 120);

      return () => {
        isMounted = false;
        clearTimeout(timer);
      };
    } else {
      setLiveAmazonProducts([]);
    }
  }, [selectedCategory, selectedPrice, liveSearchQuery, amazonRegion]);

  const handleLoadLiveToGrid = useCallback(async () => {
    if (isLoadingLive) return;
    setIsLoadingLive(true);
    try {
      const res = await fetch(
        `/api/live-search?q=${encodeURIComponent(liveSearchQuery)}&limit=8&region=${amazonRegion}`
      );
      const data = await res.json();
      if (data.success && Array.isArray(data.results)) {
        setLiveAmazonProducts((prev) => {
          const existingAsins = new Set(prev.map((p) => p.asin));
          const newItems = data.results.filter((p: LiveSearchResult) => !existingAsins.has(p.asin));
          return [...prev, ...newItems];
        });
      }
    } catch (err) {
      console.error(err);
    } finally {
      setIsLoadingLive(false);
    }
  }, [isLoadingLive, liveSearchQuery, amazonRegion]);

  const handleResetFilters = () => {
    setSelectedCategory('all');
    setSelectedPrice('all');
    setSortBy('featured');
    setLiveAmazonProducts([]);
  };

  const pageUrl = `https://www.unbuenregalo.es${localePath('/navidad')}`;
  const homeUrl =
    localeKey === 'es'
      ? 'https://www.unbuenregalo.es'
      : `https://www.unbuenregalo.es${localePath('/')}`;

  const collectionSchema = useMemo(
    () => ({
      '@context': 'https://schema.org',
      '@type': 'CollectionPage',
      name: hubMeta.h1,
      description: hubMeta.description,
      url: pageUrl,
    }),
    [hubMeta.h1, hubMeta.description, pageUrl]
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
          name: hubMeta.breadcrumbLabel,
          item: pageUrl,
        },
      ],
    }),
    [ui.breadcrumbHome, homeUrl, hubMeta.breadcrumbLabel, pageUrl]
  );

  const itemListSchema = useMemo(
    () =>
      generateProductItemListSchema(sortedDisplayProducts, hubMeta.h1, {
        currency: activeCurrency,
        countryCode,
        region: amazonRegion,
        brandFallback: ui.brandName,
      }),
    [sortedDisplayProducts, hubMeta.h1, activeCurrency, countryCode, amazonRegion, ui.brandName]
  );

  const activeCategoryObj = NAVIDAD_CATEGORIES.find((c) => c.id === selectedCategory);
  const podiumLabel =
    selectedCategory !== 'all' && activeCategoryObj
      ? tTerm(activeCategoryObj.label)
      : hubMeta.breadcrumbLabel;

  const hasActiveFilter =
    selectedCategory !== 'all' || selectedPrice !== 'all' || sortBy !== 'featured';

  return (
    <div
      dir={isRtl ? 'rtl' : 'ltr'}
      className="min-h-screen relative flex flex-col bg-slate-50 text-slate-900 selection:bg-rose-600 selection:text-white"
    >
      {!omitSchema && (
        <>
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(collectionSchema) }}
          />
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

      <ThemeAtmosphere />
      <Header currentTheme="classic" />

      {/* Breadcrumb */}
      <nav
        aria-label="Breadcrumb"
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-4 pb-2 w-full flex items-center gap-2 text-xs text-slate-600"
      >
        <Link href={localePath('/')} className="hover:text-rose-700 transition-colors py-1">
          {ui.breadcrumbHome}
        </Link>
        <ChevronRight className="w-3.5 h-3.5 text-slate-500" aria-hidden="true" />
        <span className="font-bold text-rose-700">{hubMeta.breadcrumbLabel}</span>
      </nav>

      {/* Main Content */}
      <main className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 w-full z-10">
        {/* HERO SECTION */}
        <section className="text-center py-6 sm:py-10 max-w-4xl mx-auto">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-bold mb-4 shadow-xs border border-rose-200 bg-rose-50 text-rose-900">
            <span className="flex h-2 w-2 rounded-full bg-emerald-700 animate-pulse" aria-hidden="true" />
            <span>{hubMeta.eyebrow}</span>
          </div>

          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black tracking-tight leading-[1.15] mb-5 text-slate-900">
            {hubMeta.h1}
          </h1>

          <p className="text-sm sm:text-base lg:text-lg text-slate-600 leading-relaxed mb-6 max-w-2xl mx-auto">
            {hubMeta.subtitle}
          </p>

          {/* LIVE CHRISTMAS COUNTDOWN WITH CLS GUARD */}
          <div className="mb-8 flex justify-center">
            <div className="min-h-[68px] flex items-center justify-center bg-gradient-to-r from-[#8a1420] via-[#5c0f18] to-[#0c2217] p-3 sm:p-4 rounded-3xl border-2 border-amber-400/90 shadow-xl">
              <ChristmasCountdown />
            </div>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-6 text-xs font-medium text-slate-700 mb-8">
            <span className="flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-emerald-700" aria-hidden="true" />
              <span>{niche.trustBadges[0]}</span>
            </span>
            <span className="flex items-center gap-1.5">
              <Gift className="w-4 h-4 text-rose-700" aria-hidden="true" />
              <span>{niche.trustBadges[1]}</span>
            </span>
            <span className="flex items-center gap-1.5">
              <BadgePercent className="w-4 h-4 text-amber-800" aria-hidden="true" />
              <span>
                {niche.trustBadges[2]} · {amazonSiteName}
              </span>
            </span>
          </div>
        </section>

        {/* SANTA LETTER PROMO BANNER */}
        {niche.extraBannerTitle && (
          <div className="mb-8 p-5 sm:p-6 rounded-3xl bg-gradient-to-r from-[#7f1d1d] via-[#450a0a] to-[#064e3b] border-2 border-amber-400/70 text-white shadow-xl flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-2xl bg-amber-400/20 border border-amber-300/40 flex items-center justify-center shrink-0 text-2xl" aria-hidden="true">
                🎅
              </div>
              <div>
                {niche.extraBannerBadge && (
                  <span className="inline-block px-2.5 py-0.5 rounded-full bg-amber-400 text-slate-950 font-black text-[10px] uppercase tracking-wider mb-1">
                    {niche.extraBannerBadge}
                  </span>
                )}
                <p className="text-base sm:text-lg font-black text-white">{niche.extraBannerTitle}</p>
                {niche.extraBannerDesc && (
                  <p className="text-xs sm:text-sm text-amber-100">{niche.extraBannerDesc}</p>
                )}
              </div>
            </div>
            <Link
              href={localePath('/carta-papa-noel')}
              className="shrink-0 px-6 py-3 rounded-2xl bg-amber-400 hover:bg-amber-300 text-slate-950 font-black text-xs sm:text-sm shadow-md transition-all hover:scale-105 flex items-center gap-2 whitespace-nowrap"
            >
              <span>{niche.extraBannerCta || ui.navLetter}</span>
              <ChevronRight className="w-4 h-4" aria-hidden="true" />
            </Link>
          </div>
        )}

        {/* TOP PODIUM */}
        {sortedDisplayProducts.length >= 3 && (
          <div className="bg-gradient-to-b from-rose-50/70 to-emerald-50/30 rounded-3xl p-4 sm:p-6 mb-8 border border-rose-200 shadow-xs">
            <TopPodium
              products={sortedDisplayProducts}
              filterLabel={podiumLabel}
              omitSchema={true}
            />
          </div>
        )}

        {/* FILTER BAR */}
        <div className="bg-white rounded-3xl border border-slate-200 p-5 sm:p-6 mb-8 shadow-xs">
          <div className="mb-5">
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-700 flex items-center gap-1.5">
                <Filter className="w-3.5 h-3.5 text-rose-700" aria-hidden="true" />
                <span>{niche.filterQuestion}</span>
              </span>
              <span className="text-xs font-semibold text-slate-600">
                {displayProducts.length + liveAmazonProducts.length} {labels.common.ideasUnit}
              </span>
            </div>

            <div className="flex flex-wrap items-center gap-2">
              {NAVIDAD_CATEGORIES.map((cat) => (
                <button
                  key={cat.id}
                  type="button"
                  onClick={() => {
                    setSelectedCategory(cat.id);
                    setLiveAmazonProducts([]);
                  }}
                  className={`px-3.5 py-2 rounded-2xl text-xs font-bold transition-all flex items-center gap-2 cursor-pointer ${
                    selectedCategory === cat.id
                      ? 'bg-rose-700 text-white shadow-md shadow-rose-200 scale-102 ring-2 ring-rose-300'
                      : 'bg-slate-100 hover:bg-slate-200 text-slate-800'
                  }`}
                >
                  <span aria-hidden="true">{cat.icon}</span>
                  <span>{tTerm(cat.label)}</span>
                </button>
              ))}
            </div>
          </div>

          <div className="pt-4 border-t border-slate-100 flex flex-wrap items-center justify-between gap-4">
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-xs font-bold text-slate-700 mr-1">
                {labels.common.priceRangeLabel}:
              </span>
              {NAVIDAD_PRICE_RANGES.map((range) => (
                <button
                  key={range.id}
                  type="button"
                  onClick={() => {
                    setSelectedPrice(range.id);
                    setLiveAmazonProducts([]);
                  }}
                  className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                    selectedPrice === range.id
                      ? 'bg-amber-500 text-slate-950 font-bold shadow-xs'
                      : 'bg-slate-100 hover:bg-slate-200 text-slate-800'
                  }`}
                >
                  {range.id === 'all' ? labels.common.allPrices : tTerm(range.label)}
                </button>
              ))}
            </div>

            <div className="flex items-center gap-2">
              <label htmlFor="navidad-sort" className="text-xs text-slate-700 font-semibold">
                {labels.common.sortLabel}:
              </label>
              <select
                id="navidad-sort"
                aria-label={labels.common.sortLabel}
                value={sortBy}
                onChange={(e) =>
                  setSortBy(e.target.value as 'featured' | 'price-asc' | 'price-desc' | 'rating')
                }
                className="text-xs font-semibold bg-slate-100 border border-slate-200 rounded-xl px-3 py-1.5 text-slate-800 cursor-pointer focus:ring-2 focus:ring-rose-500"
              >
                <option value="featured">{labels.common.sortFeatured}</option>
                <option value="price-asc">{labels.common.sortPriceAsc}</option>
                <option value="price-desc">{labels.common.sortPriceDesc}</option>
                <option value="rating">{labels.common.sortRating}</option>
              </select>
            </div>
          </div>

          {hasActiveFilter && (
            <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between gap-3 flex-wrap">
              <span className="text-xs text-slate-600">{labels.common.activeFiltersNote}</span>
              <button
                type="button"
                onClick={handleResetFilters}
                className="text-xs font-bold text-rose-700 hover:text-rose-900 underline cursor-pointer"
              >
                {labels.common.clearAllFilters}
              </button>
            </div>
          )}
        </div>

        {/* PRODUCT GRID */}
        {sortedDisplayProducts.length > 0 ? (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-10">
              {sortedDisplayProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}

              {sortedLiveAmazonProducts.map((liveProd) => (
                <LiveAmazonProductCard
                  key={liveProd.asin}
                  product={liveProd}
                  categoryLabel={niche.amazonCategoryLabel}
                  badgeLabel={niche.amazonBadgeLabel}
                />
              ))}

              <AmazonGridDiscoveryCard
                searchQuery={liveSearchQuery}
                selectedCategory={hubMeta.breadcrumbLabel}
                onLoadLiveToGrid={handleLoadLiveToGrid}
                isLoadingLive={isLoadingLive}
                hasLoadedLive={liveAmazonProducts.length > 0}
              />
            </div>

            <div className="mb-12 flex justify-center">
              <button
                type="button"
                onClick={handleLoadLiveToGrid}
                disabled={isLoadingLive}
                className="px-6 py-3.5 rounded-2xl bg-rose-50 hover:bg-rose-100 border border-rose-300 text-rose-950 font-bold text-sm shadow-xs hover:shadow-md transition-all flex items-center gap-2 cursor-pointer disabled:opacity-70"
              >
                {isLoadingLive ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin text-rose-700" aria-hidden="true" />
                    <span>{niche.loadingLiveBtn}</span>
                  </>
                ) : (
                  <>
                    <ShoppingBag className="w-4 h-4 text-rose-700" aria-hidden="true" />
                    <span>{niche.loadMoreLiveBtn}</span>
                  </>
                )}
              </button>
            </div>
          </>
        ) : (
          <div className="py-12 mb-12 text-center bg-white rounded-3xl border border-dashed border-slate-300 p-8">
            <h2 className="text-xl font-bold mb-2 text-slate-900">{labels.common.noLocalTitle}</h2>
            <p className="text-sm text-slate-600 mb-6 max-w-md mx-auto">
              {labels.common.noLocalDesc} ({amazonSiteName})
            </p>
            <div className="flex justify-center gap-3 flex-wrap">
              <button
                type="button"
                onClick={handleLoadLiveToGrid}
                className="px-6 py-3 rounded-2xl bg-[#FF9900] hover:bg-[#ffad33] text-slate-950 font-black text-sm flex items-center gap-2 shadow-md cursor-pointer"
              >
                <ShoppingBag className="w-4 h-4" aria-hidden="true" />
                <span>{labels.common.searchLiveAmazonBtn}</span>
              </button>
              <button
                type="button"
                onClick={handleResetFilters}
                className="px-5 py-3 rounded-2xl bg-slate-200 text-slate-800 font-bold text-sm hover:bg-slate-300 cursor-pointer"
              >
                {labels.common.resetFilters}
              </button>
            </div>
          </div>
        )}

        <div className="mb-12">
          <AmazonLiveSearchCard
            currentTheme="classic"
            initialQuery={niche.liveSearchDefaultQuery}
            selectedPrice={selectedPrice}
          />
        </div>

        {/* EDITORIAL BUYING GUIDE */}
        <section className="rounded-3xl p-6 sm:p-10 mb-12 border border-slate-200 bg-white text-slate-800 shadow-xs">
          <h2 className="text-2xl sm:text-3xl font-black mb-5 tracking-tight text-slate-900 flex items-center gap-2.5">
            <span aria-hidden="true">🎄</span>
            <span>{niche.guideTitle}</span>
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-xs sm:text-sm leading-relaxed text-slate-600">
            {niche.guideCards.map((card, idx) => (
              <div key={idx} className="space-y-2">
                <h3 className="font-bold text-base text-slate-900 flex items-center gap-2">
                  {card.icon && <span aria-hidden="true">{card.icon}</span>}
                  <span>{card.title}</span>
                </h3>
                <p>{card.body}</p>
              </div>
            ))}
          </div>
        </section>

        <SeoFaq
          localeKey={localeKey}
          hubSlug="navidad"
          customFaqs={niche.faqs}
          omitSchema={omitSchema}
        />
      </main>

      <Footer currentTheme="classic" />
    </div>
  );
}
