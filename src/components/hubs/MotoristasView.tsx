'use client';

import React, { useState, useMemo, useCallback } from 'react';
import Link from 'next/link';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import ProductCard from '@/components/ProductCard';
import LiveAmazonProductCard from '@/components/LiveAmazonProductCard';
import AmazonLiveSearchCard from '@/components/AmazonLiveSearchCard';
import AmazonGridDiscoveryCard from '@/components/AmazonGridDiscoveryCard';
import ThemeAtmosphere from '@/components/ThemeAtmosphere';
import TopPodium from '@/components/TopPodium';
import SeoFaq from '@/components/SeoFaq';
import {
  MOTORISTA_PRODUCTS,
  MOTORISTA_CATEGORIES,
  MOTORISTA_BRANDS,
  MOTORISTA_PRICE_RANGES,
} from '@/data/motoristasData';
import { Product } from '@/data/products';
import { LiveSearchResult } from '@/app/api/live-search/route';
import { parsePrice } from '@/lib/amazon';
import { useActiveLocale } from '@/hooks/useActiveLocale';
import { getLocalizedStaticHubMeta } from '@/lib/i18nContent';
import { getHubLabels } from '@/lib/hubLabels';
import { generateProductItemListSchema } from '@/lib/schemaProduct';
import {
  ShieldCheck,
  TrendingUp,
  BadgePercent,
  Loader2,
  Filter,
  ShoppingBag,
  ChevronRight,
  ArrowUpDown,
} from 'lucide-react';

interface HubViewProps {
  omitSchema?: boolean;
  initialCategory?: string;
}

const BRAND_OPTIONS = MOTORISTA_BRANDS.filter((b) => b !== 'Todas las marcas');

export default function MotoristasView({
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
  const [selectedBrand, setSelectedBrand] = useState<string>('all');
  const [selectedPrice, setSelectedPrice] = useState<string>('all');
  const [selectedStyle, setSelectedStyle] = useState<string>('all');
  const [sortBy, setSortBy] = useState<'featured' | 'price-asc' | 'price-desc' | 'rating'>('featured');
  const [liveAmazonProducts, setLiveAmazonProducts] = useState<LiveSearchResult[]>([]);
  const [isLoadingLive, setIsLoadingLive] = useState(false);

  const labels = getHubLabels(localeKey, activeCurrency);
  const niche = labels.motoristas;
  const hubMeta = getLocalizedStaticHubMeta(localeKey, 'motoristas', activeCurrency);
  const isEs = localeKey === 'es' || localeKey === 'es-us';

  const filteredProducts = useMemo(() => {
    return MOTORISTA_PRODUCTS.filter((prod) => {
      if (selectedCategory !== 'all' && prod.category !== selectedCategory) {
        return false;
      }
      if (selectedBrand !== 'all' && prod.brand !== selectedBrand) {
        return false;
      }
      if (selectedStyle !== 'all' && prod.style && prod.style !== selectedStyle) {
        return false;
      }
      if (selectedPrice !== 'all') {
        if (selectedPrice === '<30' && prod.priceNumeric >= 30) return false;
        if (selectedPrice === '30-80' && (prod.priceNumeric < 30 || prod.priceNumeric > 80)) return false;
        if (selectedPrice === '80-180' && (prod.priceNumeric < 80 || prod.priceNumeric > 180)) return false;
        if (selectedPrice === '>180' && prod.priceNumeric < 180) return false;
      }
      return true;
    });
  }, [selectedCategory, selectedBrand, selectedPrice, selectedStyle]);

  const displayProducts: Product[] = useMemo(() => {
    return filteredProducts.map((m) => {
      let priceRange: '<20' | '20-50' | '50-100' | '>100' = '50-100';
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
        category: 'Motoristas',
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
    const parts: string[] = [];
    if (selectedBrand !== 'all') parts.push(selectedBrand);

    if (selectedCategory === 'cascos') {
      if (selectedStyle === 'modular') {
        parts.push(isEs ? 'casco moto modular' : 'modular motorcycle helmet');
      } else if (selectedStyle === 'integral') {
        parts.push(isEs ? 'casco moto integral' : 'full face motorcycle helmet');
      } else {
        parts.push(isEs ? 'casco moto homologado' : 'ece motorcycle helmet');
      }
    } else if (selectedCategory === 'chaquetas') {
      parts.push(isEs ? 'chaqueta moto protecciones' : 'armored motorcycle jacket');
    } else if (selectedCategory === 'guantes') {
      parts.push(isEs ? 'guantes moto homologados' : 'motorcycle riding gloves');
    } else if (selectedCategory === 'intercom') {
      parts.push(isEs ? 'intercomunicador moto bluetooth' : 'motorcycle bluetooth intercom cardo');
    } else if (selectedCategory === 'antirrobo') {
      parts.push(isEs ? 'antirrobo disco moto alarma' : 'motorcycle disc lock alarm');
    } else if (selectedCategory === 'accesorios') {
      parts.push(isEs ? 'accesorios regalos motorista' : 'motorcycle biker accessories gifts');
    } else {
      parts.push(niche.liveSearchQueryPrefix);
    }

    return parts.join(' ');
  }, [selectedCategory, selectedBrand, selectedStyle, isEs, niche.liveSearchQueryPrefix]);

  const handleLoadLiveToGrid = useCallback(async () => {
    if (isLoadingLive) return;
    setIsLoadingLive(true);
    try {
      const res = await fetch(
        `/api/live-search?q=${encodeURIComponent(liveSearchQuery)}&limit=6&region=${amazonRegion}`
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
      console.error('Error fetching live Amazon motoristas products:', err);
    } finally {
      setIsLoadingLive(false);
    }
  }, [isLoadingLive, liveSearchQuery, amazonRegion]);

  React.useEffect(() => {
    const hasFilter =
      selectedCategory !== 'all' ||
      selectedBrand !== 'all' ||
      selectedPrice !== 'all' ||
      selectedStyle !== 'all';

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
  }, [selectedCategory, selectedBrand, selectedPrice, selectedStyle, liveSearchQuery, amazonRegion]);

  const handleResetFilters = () => {
    setSelectedCategory('all');
    setSelectedBrand('all');
    setSelectedPrice('all');
    setSelectedStyle('all');
    setSortBy('featured');
    setLiveAmazonProducts([]);
  };

  const pageUrl = `https://www.unbuenregalo.es${localePath('/motoristas')}`;
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

  const activeCategoryObj = MOTORISTA_CATEGORIES.find((c) => c.id === selectedCategory);
  const podiumLabel =
    selectedCategory !== 'all' && activeCategoryObj
      ? tTerm(activeCategoryObj.label)
      : hubMeta.breadcrumbLabel;

  const hasActiveFilter =
    selectedCategory !== 'all' ||
    selectedBrand !== 'all' ||
    selectedPrice !== 'all' ||
    selectedStyle !== 'all' ||
    sortBy !== 'featured';

  return (
    <div
      dir={isRtl ? 'rtl' : 'ltr'}
      className="min-h-screen relative flex flex-col bg-slate-50 text-slate-900 selection:bg-amber-500 selection:text-slate-950"
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
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-4 w-full text-xs text-slate-600 flex items-center gap-1.5"
      >
        <Link href={localePath('/')} className="hover:text-indigo-700 font-medium py-1">
          {ui.breadcrumbHome}
        </Link>
        <ChevronRight className="w-3.5 h-3.5 text-slate-500" aria-hidden="true" />
        <span className="font-bold text-slate-900">{hubMeta.breadcrumbLabel}</span>
      </nav>

      {/* Main Content */}
      <main className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 w-full z-10">
        {/* HERO SECTION */}
        <section className="text-center py-6 sm:py-10 max-w-4xl mx-auto">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-bold mb-4 shadow-xs border border-amber-200 bg-amber-50 text-amber-900">
            <span className="flex h-2 w-2 rounded-full bg-emerald-700 animate-pulse" aria-hidden="true" />
            <span>{hubMeta.eyebrow}</span>
          </div>

          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black tracking-tight leading-[1.15] mb-5 text-slate-900">
            {hubMeta.h1}
          </h1>

          <p className="text-sm sm:text-base lg:text-lg text-slate-600 leading-relaxed mb-6 max-w-2xl mx-auto">
            {hubMeta.subtitle}
          </p>

          <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-6 text-xs font-medium text-slate-700 mb-8">
            <span className="flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-emerald-700" aria-hidden="true" />
              <span>{niche.trustBadges[0]}</span>
            </span>
            <span className="flex items-center gap-1.5">
              <TrendingUp className="w-4 h-4 text-amber-800" aria-hidden="true" />
              <span>{niche.trustBadges[1]}</span>
            </span>
            <span className="flex items-center gap-1.5">
              <BadgePercent className="w-4 h-4 text-indigo-700" aria-hidden="true" />
              <span>
                {niche.trustBadges[2]} · {amazonSiteName}
              </span>
            </span>
          </div>
        </section>

        {/* FILTER BAR */}
        <div className="bg-white rounded-3xl border border-slate-200 p-5 sm:p-6 mb-8 shadow-xs">
          <div className="mb-5">
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-700 flex items-center gap-1.5">
                <Filter className="w-3.5 h-3.5 text-amber-800" aria-hidden="true" />
                <span>{niche.filterQuestion}</span>
              </span>
              <span className="text-xs font-semibold text-slate-600">
                {displayProducts.length + liveAmazonProducts.length} {labels.common.ideasUnit}
              </span>
            </div>

            <div className="flex flex-wrap items-center gap-2">
              {MOTORISTA_CATEGORIES.map((cat) => (
                <button
                  key={cat.id}
                  type="button"
                  onClick={() => {
                    setSelectedCategory(cat.id);
                    setSelectedStyle('all');
                    setLiveAmazonProducts([]);
                  }}
                  className={`px-3.5 py-2 sm:px-4 sm:py-2.5 rounded-2xl text-xs sm:text-sm font-bold transition-all flex items-center gap-2 cursor-pointer ${
                    selectedCategory === cat.id
                      ? 'bg-slate-900 text-white shadow-md scale-102'
                      : 'bg-slate-100 text-slate-800 hover:bg-slate-200'
                  }`}
                >
                  <span aria-hidden="true">{cat.icon}</span>
                  <span>{tTerm(cat.label)}</span>
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 pt-4 border-t border-slate-100">
            {/* Brand Filter */}
            <div>
              <label
                htmlFor="motoristas-brand"
                className="block text-[11px] font-bold text-slate-700 uppercase tracking-wider mb-1.5"
              >
                {labels.common.brandLabel}
              </label>
              <select
                id="motoristas-brand"
                aria-label={labels.common.brandLabel}
                value={selectedBrand}
                onChange={(e) => {
                  setSelectedBrand(e.target.value);
                  setLiveAmazonProducts([]);
                }}
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 bg-slate-50 text-slate-800 text-xs font-semibold focus:border-amber-600 focus:bg-white outline-none cursor-pointer"
              >
                <option value="all">{labels.common.allBrands}</option>
                {BRAND_OPTIONS.map((brand) => (
                  <option key={brand} value={brand}>
                    {brand}
                  </option>
                ))}
              </select>
            </div>

            {/* Price Filter */}
            <div>
              <label
                htmlFor="motoristas-price"
                className="block text-[11px] font-bold text-slate-700 uppercase tracking-wider mb-1.5"
              >
                {labels.common.priceRangeLabel}
              </label>
              <select
                id="motoristas-price"
                aria-label={labels.common.priceRangeLabel}
                value={selectedPrice}
                onChange={(e) => {
                  setSelectedPrice(e.target.value);
                  setLiveAmazonProducts([]);
                }}
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 bg-slate-50 text-slate-800 text-xs font-semibold focus:border-amber-600 focus:bg-white outline-none cursor-pointer"
              >
                {MOTORISTA_PRICE_RANGES.map((pr) => (
                  <option key={pr.id} value={pr.id}>
                    {pr.id === 'all' ? labels.common.allPrices : tTerm(pr.label)}
                  </option>
                ))}
              </select>
            </div>

            {/* Style Filter */}
            <div>
              <label
                htmlFor="motoristas-style"
                className="block text-[11px] font-bold text-slate-700 uppercase tracking-wider mb-1.5"
              >
                {labels.common.styleLabel}
              </label>
              <select
                id="motoristas-style"
                aria-label={labels.common.styleLabel}
                value={selectedStyle}
                onChange={(e) => {
                  setSelectedStyle(e.target.value);
                  setLiveAmazonProducts([]);
                }}
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 bg-slate-50 text-slate-800 text-xs font-semibold focus:border-amber-600 focus:bg-white outline-none cursor-pointer"
              >
                <option value="all">{labels.common.allStyles}</option>
                {selectedCategory === 'cascos' && (
                  <>
                    <option value="integral">{labels.common.styleIntegral}</option>
                    <option value="modular">{labels.common.styleModular}</option>
                  </>
                )}
                {selectedCategory === 'chaquetas' && (
                  <>
                    <option value="cordura">{labels.common.styleCordura}</option>
                    <option value="verano">{labels.common.styleSummer}</option>
                  </>
                )}
                {selectedCategory === 'guantes' && (
                  <>
                    <option value="verano">{labels.common.styleSummer}</option>
                    <option value="invierno">{labels.common.styleWinter}</option>
                  </>
                )}
              </select>
            </div>

            {/* Sort */}
            <div>
              <label
                htmlFor="motoristas-sort"
                className="flex items-center gap-1.5 text-[11px] font-bold text-slate-700 uppercase tracking-wider mb-1.5"
              >
                <ArrowUpDown className="w-3.5 h-3.5 text-amber-800" aria-hidden="true" />
                <span>{labels.common.sortLabel}</span>
              </label>
              <select
                id="motoristas-sort"
                aria-label={labels.common.sortLabel}
                value={sortBy}
                onChange={(e) =>
                  setSortBy(e.target.value as 'featured' | 'price-asc' | 'price-desc' | 'rating')
                }
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 bg-slate-50 text-slate-800 text-xs font-semibold focus:border-amber-600 focus:bg-white outline-none cursor-pointer"
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
                className="text-xs font-bold text-amber-800 hover:text-amber-950 underline cursor-pointer"
              >
                {labels.common.clearAllFilters}
              </button>
            </div>
          )}
        </div>

        {/* PRODUCTS GRID */}
        {sortedDisplayProducts.length > 0 ? (
          <>
            <TopPodium
              products={sortedDisplayProducts}
              filterLabel={podiumLabel}
              omitSchema={true}
            />

            <section className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-2 sm:gap-2.5 lg:gap-3 mb-12">
              {sortedDisplayProducts.map((product) => (
                <ProductCard key={product.id} product={product} currentTheme="classic" />
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
            </section>

            <div className="mb-12 flex justify-center">
              <button
                type="button"
                onClick={handleLoadLiveToGrid}
                disabled={isLoadingLive}
                className="px-6 py-3.5 rounded-2xl bg-amber-50 hover:bg-amber-100 border border-amber-300 text-amber-950 font-bold text-sm shadow-xs hover:shadow-md transition-all flex items-center gap-2 cursor-pointer disabled:opacity-70"
              >
                {isLoadingLive ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin text-amber-800" aria-hidden="true" />
                    <span>{niche.loadingLiveBtn}</span>
                  </>
                ) : (
                  <>
                    <ShoppingBag className="w-4 h-4 text-amber-800" aria-hidden="true" />
                    <span>{niche.loadMoreLiveBtn}</span>
                  </>
                )}
              </button>
            </div>
          </>
        ) : sortedLiveAmazonProducts.length > 0 ? (
          <div className="mb-16">
            <div className="mb-6 p-4 sm:p-5 bg-gradient-to-r from-amber-50 to-orange-50 border border-amber-200 rounded-3xl flex flex-wrap items-center justify-between gap-3 shadow-xs">
              <div className="flex items-center gap-3 text-amber-950 font-bold text-sm">
                <span className="p-2 bg-amber-400/20 text-amber-800 rounded-xl">
                  <ShoppingBag className="w-5 h-5" aria-hidden="true" />
                </span>
                <div>
                  <p className="font-extrabold text-slate-900">
                    {labels.common.showingLiveFrom} {amazonSiteName}:
                  </p>
                  <p className="text-xs text-slate-600 font-normal">
                    {labels.common.liveSubnote} ({amazonSiteName})
                  </p>
                </div>
              </div>
              <button
                type="button"
                onClick={handleResetFilters}
                className="text-xs bg-white text-slate-800 px-4 py-2 rounded-xl border border-amber-200 font-bold hover:bg-amber-100 transition-all shadow-xs cursor-pointer"
              >
                {labels.common.resetFilters}
              </button>
            </div>

            <section className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-2 sm:gap-2.5 lg:gap-3 mb-12">
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
                hasLoadedLive={true}
              />
            </section>

            <div className="mb-12 flex justify-center">
              <button
                type="button"
                onClick={handleLoadLiveToGrid}
                disabled={isLoadingLive}
                className="px-6 py-3.5 rounded-2xl bg-amber-50 hover:bg-amber-100 border border-amber-300 text-amber-950 font-bold text-sm shadow-xs hover:shadow-md transition-all flex items-center gap-2 cursor-pointer disabled:opacity-70"
              >
                {isLoadingLive ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin text-amber-800" aria-hidden="true" />
                    <span>{labels.common.loadingMoreOffers}</span>
                  </>
                ) : (
                  <>
                    <ShoppingBag className="w-4 h-4 text-amber-800" aria-hidden="true" />
                    <span>{labels.common.loadMoreOptions}</span>
                  </>
                )}
              </button>
            </div>
          </div>
        ) : isLoadingLive ? (
          <div className="py-20 mb-16 text-center flex flex-col items-center justify-center gap-3 bg-white/80 rounded-3xl border border-amber-200 shadow-xs">
            <Loader2 className="w-10 h-10 animate-spin text-amber-800" aria-hidden="true" />
            <h2 className="text-lg font-bold text-slate-900">
              {labels.common.searchingOn} {amazonSiteName}...
            </h2>
            <p className="text-xs text-slate-600 max-w-md">{labels.common.loadingRealtimeNote}</p>
          </div>
        ) : (
          <div className="py-12 mb-16 text-center bg-white/70 rounded-3xl border border-dashed border-slate-300 p-8">
            <h2 className="text-xl font-bold mb-2 text-slate-900">{labels.common.noLocalTitle}</h2>
            <p className="text-sm text-slate-600 mb-6 max-w-md mx-auto">
              {labels.common.noLocalDesc} ({amazonSiteName})
            </p>
            <div className="flex justify-center gap-3 flex-wrap">
              <button
                type="button"
                onClick={handleLoadLiveToGrid}
                className="px-6 py-3 rounded-2xl bg-[#FF9900] hover:bg-[#ffad33] text-slate-950 font-black text-sm flex items-center gap-2 shadow-md cursor-pointer transition-transform hover:scale-102"
              >
                <ShoppingBag className="w-4 h-4" aria-hidden="true" />
                <span>{labels.common.searchLiveAmazonBtn}</span>
              </button>
              <button
                type="button"
                onClick={handleResetFilters}
                className="px-5 py-3 rounded-2xl bg-slate-200 text-slate-800 font-bold text-sm hover:bg-slate-300 cursor-pointer transition-colors"
              >
                {labels.common.resetFilters}
              </button>
            </div>
          </div>
        )}

        {/* LIVE SEARCH CARD */}
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
            <span aria-hidden="true">🏍️</span>
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

        <SeoFaq localeKey={localeKey} hubSlug="motoristas" omitSchema={omitSchema} />
      </main>

      <Footer currentTheme="classic" />
    </div>
  );
}
