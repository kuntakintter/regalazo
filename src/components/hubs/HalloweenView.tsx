'use client';

import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import ProductCard from '@/components/ProductCard';
import LiveAmazonProductCard from '@/components/LiveAmazonProductCard';
import AmazonLiveSearchCard from '@/components/AmazonLiveSearchCard';
import AmazonGridDiscoveryCard from '@/components/AmazonGridDiscoveryCard';
import ThemeAtmosphere from '@/components/ThemeAtmosphere';
import TopPodium from '@/components/TopPodium';
import {
  HALLOWEEN_HUB_PRODUCTS,
  HALLOWEEN_CATEGORIES,
  HALLOWEEN_PRICE_RANGES,
} from '@/data/halloweenData';
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
  Filter,
  ChevronRight,
  ArrowUpDown,
  Ghost,
} from 'lucide-react';

interface HubViewProps {
  omitSchema?: boolean;
  initialCategory?: string;
}

export default function HalloweenView({
  omitSchema = false,
  initialCategory = 'all',
}: HubViewProps) {
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

  const [selectedCategory, setSelectedCategory] = useState<string>(initialCategory);
  const [selectedPrice, setSelectedPrice] = useState<string>('all');
  const [sortBy, setSortBy] = useState<'featured' | 'price-asc' | 'price-desc' | 'rating'>('featured');
  const [liveAmazonProducts, setLiveAmazonProducts] = useState<LiveSearchResult[]>([]);
  const [isLoadingLive, setIsLoadingLive] = useState(false);

  const labels = getHubLabels(localeKey, activeCurrency);
  const niche = labels.halloween;
  const hubMeta = getLocalizedStaticHubMeta(localeKey, 'halloween', activeCurrency);
  const isEs = localeKey === 'es' || localeKey === 'es-us';

  const filteredProducts = useMemo(() => {
    return HALLOWEEN_HUB_PRODUCTS.filter((prod) => {
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
        category: 'Halloween',
        subcategory: m.categoryLabel,
        imageUrl: m.imageUrl,
        images: [m.imageUrl],
        description: m.description,
        pros: m.pros,
        idealFor: m.idealFor,
        searchQuery: m.searchQuery,
        gender: 'unisex',
        ageRange: '+18',
        style: 'gamer',
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
    if (selectedCategory === 'disfraces') {
      return isEs ? 'disfraz halloween adultos ninos terror fiesta' : 'halloween costumes cosplay adults kids';
    }
    if (selectedCategory === 'decoracion') {
      return isEs ? 'decoracion halloween telaranas aranas gigantes exteriores' : 'halloween outdoor spider web spooky yard decor';
    }
    if (selectedCategory === 'luces-calabaza') {
      return isEs ? 'calabaza halloween luces led decoracion fiesta' : 'halloween led pumpkin string lights decor';
    }
    if (selectedCategory === 'mascaras') {
      return isEs ? 'mascara led la purga halloween maquillaje terror' : 'halloween led purge mask fx makeup';
    }
    if (selectedCategory === 'chuches') {
      return isEs ? 'chuches caramelos halloween truco o trato bolsas' : 'halloween trick or treat candy party favors';
    }
    return niche.liveSearchDefaultQuery;
  }, [selectedCategory, isEs, niche.liveSearchDefaultQuery]);

  React.useEffect(() => {
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

  const handleLoadLiveToGrid = React.useCallback(async () => {
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

  const pageUrl = `https://www.unbuenregalo.es${localePath('/halloween')}`;
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

  const activeCategoryObj = HALLOWEEN_CATEGORIES.find((c) => c.id === selectedCategory);
  const podiumLabel =
    selectedCategory !== 'all' && activeCategoryObj
      ? tTerm(activeCategoryObj.label)
      : hubMeta.breadcrumbLabel;

  const hasActiveFilter =
    selectedCategory !== 'all' || selectedPrice !== 'all' || sortBy !== 'featured';

  return (
    <div
      dir={isRtl ? 'rtl' : 'ltr'}
      className="min-h-screen relative flex flex-col bg-slate-950 text-slate-100 selection:bg-orange-500 selection:text-white"
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
      <Header currentTheme="gamer" />

      {/* Breadcrumb */}
      <nav
        aria-label="Breadcrumb"
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-4 pb-2 w-full flex items-center gap-2 text-xs text-slate-300"
      >
        <Link href={localePath('/')} className="hover:text-orange-300 transition-colors py-1">
          {ui.breadcrumbHome}
        </Link>
        <ChevronRight className="w-3.5 h-3.5 text-slate-400" aria-hidden="true" />
        <span className="font-bold text-orange-300">{hubMeta.breadcrumbLabel}</span>
      </nav>

      {/* Main Content */}
      <main className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 w-full z-10">
        {/* HERO SECTION */}
        <section className="text-center py-6 sm:py-10 max-w-4xl mx-auto">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-bold mb-4 shadow-sm border border-orange-500/40 bg-orange-950/60 text-orange-200">
            <span className="flex h-2 w-2 rounded-full bg-emerald-400 animate-pulse" aria-hidden="true" />
            <span>{hubMeta.eyebrow}</span>
          </div>

          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black tracking-tight leading-[1.15] mb-5 text-white">
            {hubMeta.h1}
          </h1>

          <p className="text-sm sm:text-base lg:text-lg text-slate-300 leading-relaxed mb-6 max-w-2xl mx-auto">
            {hubMeta.subtitle}
          </p>

          <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-6 text-xs font-medium text-slate-200 mb-8">
            <span className="flex items-center gap-1.5">
              <Ghost className="w-4 h-4 text-orange-400" aria-hidden="true" />
              <span>{niche.trustBadges[0]}</span>
            </span>
            <span className="flex items-center gap-1.5">
              <BadgePercent className="w-4 h-4 text-amber-400" aria-hidden="true" />
              <span>{niche.trustBadges[1]}</span>
            </span>
            <span className="flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-emerald-400" aria-hidden="true" />
              <span>
                {niche.trustBadges[2]} · {amazonSiteName}
              </span>
            </span>
          </div>
        </section>

        {/* TOP PODIUM */}
        {sortedDisplayProducts.length >= 3 && (
          <TopPodium
            products={sortedDisplayProducts}
            filterLabel={podiumLabel}
            isDark={true}
            omitSchema={true}
          />
        )}

        {/* FILTER BAR */}
        <div className="bg-slate-900/90 rounded-3xl border border-orange-500/30 p-5 sm:p-6 mb-8 shadow-xl">
          <div className="mb-5">
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-bold uppercase tracking-wider text-orange-300 flex items-center gap-1.5">
                <Filter className="w-3.5 h-3.5 text-orange-300" aria-hidden="true" />
                <span>{niche.filterQuestion}</span>
              </span>
              <span className="text-xs font-semibold text-slate-300">
                {displayProducts.length + liveAmazonProducts.length} {labels.common.ideasUnit}
              </span>
            </div>

            <div className="flex flex-wrap items-center gap-2">
              {HALLOWEEN_CATEGORIES.map((cat) => (
                <button
                  key={cat.id}
                  type="button"
                  onClick={() => {
                    setSelectedCategory(cat.id);
                    setLiveAmazonProducts([]);
                  }}
                  className={`px-3.5 py-2 sm:px-4 sm:py-2.5 rounded-2xl text-xs sm:text-sm font-bold transition-all flex items-center gap-2 cursor-pointer border ${
                    selectedCategory === cat.id
                      ? 'bg-gradient-to-r from-orange-500 to-amber-500 text-slate-950 border-orange-300 shadow-md scale-[1.02]'
                      : 'bg-slate-800 text-slate-200 hover:bg-slate-700 border-slate-700'
                  }`}
                >
                  <span aria-hidden="true">{cat.icon}</span>
                  <span>{tTerm(cat.label)}</span>
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4 border-t border-slate-800">
            <div>
              <label
                htmlFor="halloween-price"
                className="block text-[11px] font-bold text-slate-200 uppercase tracking-wider mb-1.5"
              >
                {labels.common.priceRangeLabel}
              </label>
              <select
                id="halloween-price"
                aria-label={labels.common.priceRangeLabel}
                value={selectedPrice}
                onChange={(e) => {
                  setSelectedPrice(e.target.value);
                  setLiveAmazonProducts([]);
                }}
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-700 bg-slate-800 text-slate-100 text-xs font-semibold focus:border-orange-400 focus:bg-slate-900 outline-none cursor-pointer"
              >
                {HALLOWEEN_PRICE_RANGES.map((pr) => (
                  <option key={pr.id} value={pr.id}>
                    {pr.id === 'all' ? labels.common.allPrices : tTerm(pr.label)}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label
                htmlFor="halloween-sort"
                className="block text-[11px] font-bold text-slate-200 uppercase tracking-wider mb-1.5"
              >
                {labels.common.sortLabel}
              </label>
              <div className="relative">
                <select
                  id="halloween-sort"
                  aria-label={labels.common.sortLabel}
                  value={sortBy}
                  onChange={(e) =>
                    setSortBy(e.target.value as 'featured' | 'price-asc' | 'price-desc' | 'rating')
                  }
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-700 bg-slate-800 text-slate-100 text-xs font-semibold focus:border-orange-400 focus:bg-slate-900 outline-none cursor-pointer appearance-none"
                >
                  <option value="featured">{labels.common.sortFeatured}</option>
                  <option value="price-asc">{labels.common.sortPriceAsc}</option>
                  <option value="price-desc">{labels.common.sortPriceDesc}</option>
                  <option value="rating">{labels.common.sortRating}</option>
                </select>
                <ArrowUpDown
                  className="w-3.5 h-3.5 text-slate-300 absolute right-3.5 top-1/2 -translate-y-1/2 pointer-events-none"
                  aria-hidden="true"
                />
              </div>
            </div>
          </div>

          {hasActiveFilter && (
            <div className="mt-4 pt-3 border-t border-slate-800 flex items-center justify-between gap-3 flex-wrap">
              <span className="text-xs text-slate-300">{labels.common.activeFiltersNote}</span>
              <button
                type="button"
                onClick={handleResetFilters}
                className="text-xs font-bold text-orange-300 hover:text-orange-200 underline cursor-pointer"
              >
                {labels.common.clearAllFilters}
              </button>
            </div>
          )}
        </div>

        {/* PRODUCTS GRID */}
        {sortedDisplayProducts.length > 0 || sortedLiveAmazonProducts.length > 0 ? (
          <div>
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl sm:text-2xl font-black text-white flex items-center gap-2 flex-wrap">
                <span aria-hidden="true">🎃</span>
                <span>{hubMeta.breadcrumbLabel}</span>
                <span className="text-xs font-bold text-orange-200 bg-orange-950/80 px-2.5 py-0.5 rounded-full border border-orange-500/40">
                  {sortedDisplayProducts.length + sortedLiveAmazonProducts.length} {labels.common.ideasUnit}
                </span>
              </h2>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-2 sm:gap-2.5 lg:gap-3">
              {sortedDisplayProducts.map((product) => (
                <ProductCard key={product.id} product={product} currentTheme="gamer" />
              ))}

              {sortedLiveAmazonProducts.map((liveProd) => (
                <LiveAmazonProductCard
                  key={`live-hal-${liveProd.asin}`}
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

            <div className="mt-12">
              <AmazonLiveSearchCard
                currentTheme="gamer"
                initialQuery={niche.liveSearchDefaultQuery}
                selectedPrice={selectedPrice}
              />
            </div>
          </div>
        ) : (
          <div className="text-center py-16 bg-slate-900 rounded-3xl border border-slate-800 p-8">
            <Ghost className="w-12 h-12 text-orange-400 mx-auto mb-3" aria-hidden="true" />
            <h2 className="text-lg font-bold text-white mb-1">{labels.common.noLocalTitle}</h2>
            <p className="text-xs text-slate-300 mb-4 max-w-md mx-auto">
              {labels.common.noLocalDesc}
            </p>
            <button
              type="button"
              onClick={handleResetFilters}
              className="px-4 py-2 bg-orange-500 text-slate-950 rounded-xl text-xs font-bold hover:bg-orange-400 transition-colors cursor-pointer"
            >
              {labels.common.resetFilters}
            </button>
          </div>
        )}

        {/* EDITORIAL BUYING GUIDE */}
        <section className="mt-12 rounded-3xl p-6 sm:p-10 mb-8 border border-slate-800 bg-slate-900/90 text-slate-100 shadow-xl">
          <h2 className="text-2xl sm:text-3xl font-black mb-5 tracking-tight text-white flex items-center gap-2.5">
            <span aria-hidden="true">🎃</span>
            <span>{niche.guideTitle}</span>
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-xs sm:text-sm leading-relaxed text-slate-300">
            {niche.guideCards.map((card, idx) => (
              <div key={idx} className="space-y-2">
                <h3 className="font-bold text-base text-orange-300 flex items-center gap-2">
                  {card.icon && <span aria-hidden="true">{card.icon}</span>}
                  <span>{card.title}</span>
                </h3>
                <p>{card.body}</p>
              </div>
            ))}
          </div>
        </section>
      </main>

      <Footer currentTheme="gamer" />
    </div>
  );
}
