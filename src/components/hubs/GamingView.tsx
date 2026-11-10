'use client';

import React, { useState, useMemo, useCallback } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import ProductCard from '@/components/ProductCard';
import LiveAmazonProductCard from '@/components/LiveAmazonProductCard';
import AmazonLiveSearchCard from '@/components/AmazonLiveSearchCard';
import AmazonGridDiscoveryCard from '@/components/AmazonGridDiscoveryCard';
import ThemeAtmosphere from '@/components/ThemeAtmosphere';
import SocialShareWidget from '@/components/SocialShareWidget';
import SeoFaq from '@/components/SeoFaq';
import {
  GAMING_PRODUCTS,
  GAMING_CATEGORIES,
  GAMING_BRANDS,
  GAMING_PRICE_RANGES,
} from '@/data/gamingData';
import { Product } from '@/data/products';
import { LiveSearchResult } from '@/app/api/live-search/route';
import { parsePrice, getAmazonProductUrl } from '@/lib/amazon';
import { useActiveLocale } from '@/hooks/useActiveLocale';
import { getLocalizedStaticHubMeta } from '@/lib/i18nContent';
import { getHubLabels } from '@/lib/hubLabels';
import { generateProductItemListSchema } from '@/lib/schemaProduct';
import {
  ShieldCheck,
  TrendingUp,
  BadgePercent,
  ShoppingBag,
  Loader2,
  Filter,
  ChevronRight,
  Gamepad2,
  ArrowUpDown,
  Award,
  CheckCircle2,
} from 'lucide-react';

interface HubViewProps {
  omitSchema?: boolean;
}

const BRAND_OPTIONS = GAMING_BRANDS.filter((b) => b !== 'Todas las marcas');

export default function GamingView({ omitSchema = false }: HubViewProps) {
  const {
    localeKey,
    localePath,
    ui,
    activeCurrency,
    countryCode,
    amazonRegion,
    amazonSiteName,
    formatPrice,
    isRtl,
    tTerm,
  } = useActiveLocale();

  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedBrand, setSelectedBrand] = useState<string>('all');
  const [selectedPrice, setSelectedPrice] = useState<string>('all');
  const [sortBy, setSortBy] = useState<'featured' | 'price-asc' | 'price-desc' | 'rating'>('featured');
  const [liveAmazonProducts, setLiveAmazonProducts] = useState<LiveSearchResult[]>([]);
  const [isLoadingLive, setIsLoadingLive] = useState(false);

  const labels = getHubLabels(localeKey, activeCurrency);
  const niche = labels.gaming;
  const hubMeta = getLocalizedStaticHubMeta(localeKey, 'gaming', activeCurrency);
  const isEs = localeKey === 'es' || localeKey === 'es-us';

  const filteredProducts = useMemo(() => {
    return GAMING_PRODUCTS.filter((prod) => {
      if (selectedCategory !== 'all' && prod.category !== selectedCategory) return false;
      if (selectedBrand !== 'all' && prod.brand !== selectedBrand) return false;
      if (selectedPrice !== 'all') {
        if (selectedPrice === '<30' && prod.priceNumeric >= 30) return false;
        if (selectedPrice === '30-70' && (prod.priceNumeric < 30 || prod.priceNumeric > 70)) return false;
        if (selectedPrice === '70-150' && (prod.priceNumeric < 70 || prod.priceNumeric > 150)) return false;
        if (selectedPrice === '>150' && prod.priceNumeric < 150) return false;
      }
      return true;
    });
  }, [selectedCategory, selectedBrand, selectedPrice]);

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
        category: 'Gaming',
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
    const parts: string[] = [];
    if (selectedBrand !== 'all') parts.push(selectedBrand);

    if (selectedCategory === 'auriculares') {
      parts.push(isEs ? 'auriculares gaming microfono pc ps5' : 'gaming headset surround pc ps5');
    } else if (selectedCategory === 'ratones') {
      parts.push(isEs ? 'raton gaming optico rgb logitech razer' : 'rgb optical gaming mouse logitech razer');
    } else if (selectedCategory === 'teclados') {
      parts.push(isEs ? 'teclado mecanico gaming rgb' : 'mechanical gaming keyboard rgb');
    } else if (selectedCategory === 'iluminacion') {
      parts.push(isEs ? 'barra luz monitor quntis led rgb setup' : 'monitor light bar rgb gaming setup');
    } else if (selectedCategory === 'mandos') {
      parts.push(isEs ? 'mando pc ps5 xbox inalambrico' : 'wireless gaming controller pc ps5 xbox');
    } else if (selectedCategory === 'sillas') {
      parts.push(isEs ? 'cojin lumbar ergonomico silla gaming' : 'ergonomic lumbar pillow gaming chair');
    } else {
      parts.push(niche.liveSearchQueryPrefix);
    }

    return parts.join(' ');
  }, [selectedCategory, selectedBrand, isEs, niche.liveSearchQueryPrefix]);

  React.useEffect(() => {
    const hasFilter =
      selectedCategory !== 'all' ||
      selectedBrand !== 'all' ||
      selectedPrice !== 'all';

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
  }, [selectedCategory, selectedBrand, selectedPrice, liveSearchQuery, amazonRegion]);

  const handleLoadLiveToGrid = useCallback(async () => {
    if (isLoadingLive) return;
    setIsLoadingLive(true);
    try {
      const res = await fetch(
        `/api/live-search?q=${encodeURIComponent(liveSearchQuery)}&limit=10&region=${amazonRegion}`
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
      console.error('Error fetching live Amazon gaming products:', err);
    } finally {
      setIsLoadingLive(false);
    }
  }, [isLoadingLive, liveSearchQuery, amazonRegion]);

  const handleResetFilters = () => {
    setSelectedCategory('all');
    setSelectedBrand('all');
    setSelectedPrice('all');
    setSortBy('featured');
    setLiveAmazonProducts([]);
  };

  const pageUrl = `https://www.unbuenregalo.es${localePath('/gaming')}`;
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

  const verdictPicks = niche.verdictPicks || [
    {
      badge: '🥇 Best Overall',
      title: 'HyperX Cloud II (7.1)',
      summary: '',
    },
    {
      badge: '🥈 Best Budget < 30',
      title: 'Razer DeathAdder Essential',
      summary: '',
    },
    {
      badge: '🥉 Competitive Pick',
      title: 'Logitech G502 HERO',
      summary: '',
    },
  ];

  const hasActiveFilter =
    selectedCategory !== 'all' ||
    selectedBrand !== 'all' ||
    selectedPrice !== 'all' ||
    sortBy !== 'featured';

  return (
    <div
      dir={isRtl ? 'rtl' : 'ltr'}
      className="min-h-screen relative flex flex-col bg-slate-50 text-slate-900 selection:bg-purple-600 selection:text-white"
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
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-bold mb-4 shadow-xs border border-purple-200 bg-purple-50 text-purple-900">
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
              <TrendingUp className="w-4 h-4 text-purple-700" aria-hidden="true" />
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

        {/* VERDICT TOP 3 GAMER PICKS */}
        <section className="mb-10 p-5 sm:p-8 rounded-3xl bg-gradient-to-br from-slate-900 via-purple-950 to-slate-900 text-white shadow-xl border border-purple-800/40 relative overflow-hidden">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6 pb-4 border-b border-purple-800/50">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <Award className="w-5 h-5 text-amber-400" aria-hidden="true" />
                <span className="text-xs font-extrabold uppercase tracking-wider text-amber-300">
                  {ui.podiumEyebrow}
                </span>
              </div>
              <h2 className="text-xl sm:text-2xl font-black text-white tracking-tight">
                {niche.verdictTitle || hubMeta.h1}
              </h2>
              {niche.verdictSubtitle && (
                <p className="text-xs sm:text-sm text-purple-200 mt-1">{niche.verdictSubtitle}</p>
              )}
            </div>
            <span className="text-xs text-purple-100 bg-purple-900/70 border border-purple-600/50 px-3 py-1.5 rounded-full shrink-0 self-start sm:self-auto font-semibold">
              {ui.badgeUpdated2026}
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 lg:gap-6">
            {/* Pick 1: HyperX Cloud II */}
            <div className="bg-slate-800/90 rounded-2xl p-4 sm:p-5 border border-amber-400/40 flex flex-col justify-between relative group hover:border-amber-400 transition-all">
              <div className="absolute -top-3 right-4 px-3 py-0.5 rounded-full bg-amber-400 text-slate-950 font-black text-[10px] uppercase tracking-wider shadow-md">
                {verdictPicks[0].badge}
              </div>
              <div>
                <div className="w-full h-36 relative mb-3 bg-white/5 rounded-xl overflow-hidden flex items-center justify-center p-2">
                  <Image
                    src="/images/products/game-auriculares-hyperx-cloud-2-1.jpg"
                    alt={verdictPicks[0].title}
                    width={140}
                    height={140}
                    className="object-contain max-h-32 group-hover:scale-105 transition-transform"
                  />
                </div>
                <div className="flex items-center justify-between gap-2 mb-1">
                  <span className="text-[11px] font-bold text-amber-300 uppercase">HyperX</span>
                  <span className="text-base font-black text-white">{formatPrice('74,99 €')}</span>
                </div>
                <h3 className="text-sm font-bold text-white mb-2 line-clamp-2">
                  {verdictPicks[0].title}
                </h3>
                <p className="text-xs text-slate-200 leading-relaxed mb-4 flex items-start gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" aria-hidden="true" />
                  <span>{verdictPicks[0].summary}</span>
                </p>
              </div>
              <a
                href={getAmazonProductUrl('', 'hyperx cloud ii auriculares gaming 7.1', amazonRegion)}
                target="_blank"
                rel="nofollow sponsored noopener noreferrer"
                className="w-full py-2.5 px-4 rounded-xl bg-amber-400 hover:bg-amber-300 text-slate-950 font-black text-xs text-center shadow-md transition-all flex items-center justify-center gap-1.5 cursor-pointer"
              >
                <span>{labels.common.viewOnAmazon}</span>
                <span className="sr-only"> — {verdictPicks[0].title}</span>
                <ChevronRight className="w-3.5 h-3.5" aria-hidden="true" />
              </a>
            </div>

            {/* Pick 2: Budget < 30 */}
            <div className="bg-slate-800/90 rounded-2xl p-4 sm:p-5 border border-emerald-400/30 flex flex-col justify-between relative group hover:border-emerald-400 transition-all">
              <div className="absolute -top-3 right-4 px-3 py-0.5 rounded-full bg-emerald-400 text-slate-950 font-black text-[10px] uppercase tracking-wider shadow-md">
                {verdictPicks[1].badge}
              </div>
              <div>
                <div className="w-full h-36 relative mb-3 bg-white/5 rounded-xl overflow-hidden flex items-center justify-center p-2">
                  <Image
                    src="/images/products/game-raton-razer-deathadder-essential-1.jpg"
                    alt={verdictPicks[1].title}
                    width={140}
                    height={140}
                    className="object-contain max-h-32 group-hover:scale-105 transition-transform"
                  />
                </div>
                <div className="flex items-center justify-between gap-2 mb-1">
                  <span className="text-[11px] font-bold text-emerald-300 uppercase">Logitech / Razer / Quntis</span>
                  <span className="text-base font-black text-white">{formatPrice('24,99 €')}</span>
                </div>
                <h3 className="text-sm font-bold text-white mb-2 line-clamp-2">
                  {verdictPicks[1].title}
                </h3>
                <p className="text-xs text-slate-200 leading-relaxed mb-4 flex items-start gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" aria-hidden="true" />
                  <span>{verdictPicks[1].summary}</span>
                </p>
              </div>
              <a
                href={getAmazonProductUrl('', 'razer deathadder essential raton gaming 6400 dpi', amazonRegion)}
                target="_blank"
                rel="nofollow sponsored noopener noreferrer"
                className="w-full py-2.5 px-4 rounded-xl bg-emerald-400 hover:bg-emerald-300 text-slate-950 font-black text-xs text-center shadow-md transition-all flex items-center justify-center gap-1.5 cursor-pointer"
              >
                <span>{labels.common.viewOnAmazon}</span>
                <span className="sr-only"> — {verdictPicks[1].title}</span>
                <ChevronRight className="w-3.5 h-3.5" aria-hidden="true" />
              </a>
            </div>

            {/* Pick 3: Logitech G502 HERO */}
            <div className="bg-slate-800/90 rounded-2xl p-4 sm:p-5 border border-purple-400/30 flex flex-col justify-between relative group hover:border-purple-400 transition-all">
              <div className="absolute -top-3 right-4 px-3 py-0.5 rounded-full bg-purple-400 text-slate-950 font-black text-[10px] uppercase tracking-wider shadow-md">
                {verdictPicks[2].badge}
              </div>
              <div>
                <div className="w-full h-36 relative mb-3 bg-white/5 rounded-xl overflow-hidden flex items-center justify-center p-2">
                  <Image
                    src="/images/products/game-raton-logitech-g502-hero-1.jpg"
                    alt={verdictPicks[2].title}
                    width={140}
                    height={140}
                    className="object-contain max-h-32 group-hover:scale-105 transition-transform"
                  />
                </div>
                <div className="flex items-center justify-between gap-2 mb-1">
                  <span className="text-[11px] font-bold text-purple-300 uppercase">Logitech G</span>
                  <span className="text-base font-black text-white">{formatPrice('47,90 €')}</span>
                </div>
                <h3 className="text-sm font-bold text-white mb-2 line-clamp-2">
                  {verdictPicks[2].title}
                </h3>
                <p className="text-xs text-slate-200 leading-relaxed mb-4 flex items-start gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" aria-hidden="true" />
                  <span>{verdictPicks[2].summary}</span>
                </p>
              </div>
              <a
                href={getAmazonProductUrl('B07GS6ZB7T', 'logitech g502 hero raton gaming rgb 25k', amazonRegion)}
                target="_blank"
                rel="nofollow sponsored noopener noreferrer"
                className="w-full py-2.5 px-4 rounded-xl bg-purple-400 hover:bg-purple-300 text-slate-950 font-black text-xs text-center shadow-md transition-all flex items-center justify-center gap-1.5 cursor-pointer"
              >
                <span>{labels.common.viewOnAmazon}</span>
                <span className="sr-only"> — {verdictPicks[2].title}</span>
                <ChevronRight className="w-3.5 h-3.5" aria-hidden="true" />
              </a>
            </div>
          </div>
        </section>

        {/* GTA VI FEATURED BANNER */}
        {niche.extraBannerTitle && (
          <div className="mb-8 p-5 sm:p-6 rounded-3xl bg-gradient-to-r from-[#180e29] via-[#0f172a] to-[#200924] border border-pink-500/40 text-white shadow-xl relative overflow-hidden flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="absolute -top-12 -right-12 w-48 h-48 bg-pink-500/20 rounded-full blur-2xl pointer-events-none" aria-hidden="true" />
            <div className="flex items-center gap-4 relative z-10">
              <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-pink-500 to-cyan-500 flex items-center justify-center shrink-0 shadow-lg text-2xl" aria-hidden="true">
                🌴
              </div>
              <div>
                <div className="flex items-center gap-2 mb-1">
                  {niche.extraBannerBadge && (
                    <span className="px-2.5 py-0.5 rounded-full bg-pink-500/30 text-pink-200 font-black text-[10px] tracking-wide uppercase border border-pink-400/30">
                      {niche.extraBannerBadge}
                    </span>
                  )}
                  <span className="text-xs text-cyan-300 font-bold">Grand Theft Auto VI</span>
                </div>
                <p className="text-base sm:text-lg font-black text-white">{niche.extraBannerTitle}</p>
                {niche.extraBannerDesc && (
                  <p className="text-xs sm:text-sm text-slate-200">{niche.extraBannerDesc}</p>
                )}
              </div>
            </div>
            <Link
              href={localePath('/regalos-gta-6')}
              className="shrink-0 px-6 py-3 rounded-2xl bg-gradient-to-r from-pink-600 via-purple-700 to-cyan-700 hover:from-pink-500 hover:to-cyan-600 text-white font-black text-xs sm:text-sm shadow-lg hover:scale-105 transition-all flex items-center gap-2 cursor-pointer relative z-10"
            >
              <span>{niche.extraBannerCta || 'GTA 6'}</span>
              <ChevronRight className="w-4 h-4" aria-hidden="true" />
            </Link>
          </div>
        )}

        {/* FILTER BAR */}
        <div className="bg-white rounded-3xl border border-slate-200 p-5 sm:p-6 mb-8 shadow-xs">
          <div className="mb-5">
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-700 flex items-center gap-1.5">
                <Filter className="w-3.5 h-3.5 text-purple-700" aria-hidden="true" />
                <span>{niche.filterQuestion}</span>
              </span>
              <span className="text-xs font-semibold text-slate-600">
                {displayProducts.length + liveAmazonProducts.length} {labels.common.ideasUnit}
              </span>
            </div>

            <div className="flex flex-wrap items-center gap-2">
              {GAMING_CATEGORIES.map((cat) => (
                <button
                  key={cat.id}
                  type="button"
                  onClick={() => {
                    setSelectedCategory(cat.id);
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

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4 border-t border-slate-100">
            <div>
              <label
                htmlFor="gaming-brand"
                className="block text-[11px] font-bold text-slate-700 uppercase tracking-wider mb-1.5"
              >
                {labels.common.brandLabel}
              </label>
              <select
                id="gaming-brand"
                aria-label={labels.common.brandLabel}
                value={selectedBrand}
                onChange={(e) => {
                  setSelectedBrand(e.target.value);
                  setLiveAmazonProducts([]);
                }}
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 bg-slate-50 text-slate-800 text-xs font-semibold focus:border-purple-600 focus:bg-white outline-none cursor-pointer"
              >
                <option value="all">{labels.common.allBrands}</option>
                {BRAND_OPTIONS.map((brand) => (
                  <option key={brand} value={brand}>
                    {brand}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label
                htmlFor="gaming-price"
                className="block text-[11px] font-bold text-slate-700 uppercase tracking-wider mb-1.5"
              >
                {labels.common.priceRangeLabel}
              </label>
              <select
                id="gaming-price"
                aria-label={labels.common.priceRangeLabel}
                value={selectedPrice}
                onChange={(e) => {
                  setSelectedPrice(e.target.value);
                  setLiveAmazonProducts([]);
                }}
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 bg-slate-50 text-slate-800 text-xs font-semibold focus:border-purple-600 focus:bg-white outline-none cursor-pointer"
              >
                {GAMING_PRICE_RANGES.map((pr) => (
                  <option key={pr.id} value={pr.id}>
                    {pr.id === 'all' ? labels.common.allPrices : tTerm(pr.label)}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label
                htmlFor="gaming-sort"
                className="flex items-center gap-1.5 text-[11px] font-bold text-slate-700 uppercase tracking-wider mb-1.5"
              >
                <ArrowUpDown className="w-3.5 h-3.5 text-purple-700" aria-hidden="true" />
                <span>{labels.common.sortLabel}</span>
              </label>
              <select
                id="gaming-sort"
                aria-label={labels.common.sortLabel}
                value={sortBy}
                onChange={(e) =>
                  setSortBy(e.target.value as 'featured' | 'price-asc' | 'price-desc' | 'rating')
                }
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 bg-slate-50 text-slate-800 text-xs font-semibold focus:border-purple-600 focus:bg-white outline-none cursor-pointer"
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
                className="text-xs font-bold text-purple-700 hover:text-purple-900 underline cursor-pointer"
              >
                {labels.common.clearAllFilters}
              </button>
            </div>
          )}
        </div>

        {/* PRODUCTS GRID */}
        {sortedDisplayProducts.length > 0 ? (
          <>
            <section className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-2 sm:gap-2.5 lg:gap-3 mb-12">
              {sortedDisplayProducts.map((product) => (
                <ProductCard key={product.id} product={product} currentTheme="gamer" />
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
                className="px-7 py-4 rounded-2xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-slate-950 font-black text-sm shadow-md hover:shadow-lg transition-all flex items-center gap-2.5 cursor-pointer disabled:opacity-75 hover:scale-102"
              >
                {isLoadingLive ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin text-slate-950" aria-hidden="true" />
                    <span>{niche.loadingLiveBtn}</span>
                  </>
                ) : (
                  <>
                    <ShoppingBag className="w-4 h-4 text-slate-950" aria-hidden="true" />
                    <span>{niche.loadMoreLiveBtn}</span>
                  </>
                )}
              </button>
            </div>
          </>
        ) : sortedLiveAmazonProducts.length > 0 ? (
          <div className="mb-16">
            <div className="mb-6 p-4 sm:p-5 bg-gradient-to-r from-purple-50 via-indigo-50 to-amber-50 border border-purple-200 rounded-3xl flex flex-wrap items-center justify-between gap-3 shadow-xs">
              <div className="flex items-center gap-3 text-purple-950 font-bold text-sm">
                <span className="p-2 bg-purple-500/20 text-purple-700 rounded-xl">
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
                className="text-xs bg-white text-purple-900 px-4 py-2 rounded-xl border border-purple-200 font-bold hover:bg-purple-100 transition-all shadow-xs cursor-pointer"
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
                className="px-7 py-4 rounded-2xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-slate-950 font-black text-sm shadow-md hover:shadow-lg transition-all flex items-center gap-2.5 cursor-pointer disabled:opacity-75 hover:scale-102"
              >
                {isLoadingLive ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin text-slate-950" aria-hidden="true" />
                    <span>{labels.common.loadingMoreOffers}</span>
                  </>
                ) : (
                  <>
                    <ShoppingBag className="w-4 h-4 text-slate-950" aria-hidden="true" />
                    <span>{labels.common.loadMoreOptions}</span>
                  </>
                )}
              </button>
            </div>
          </div>
        ) : isLoadingLive ? (
          <div className="py-20 mb-16 text-center flex flex-col items-center justify-center gap-3 bg-white/80 rounded-3xl border border-purple-100 shadow-xs">
            <Loader2 className="w-10 h-10 animate-spin text-purple-700" aria-hidden="true" />
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

        <div className="mb-12">
          <AmazonLiveSearchCard
            currentTheme="gamer"
            initialQuery={niche.liveSearchDefaultQuery}
            selectedPrice={selectedPrice}
          />
        </div>

        {/* EDITORIAL BUYING GUIDE */}
        <section className="rounded-3xl p-6 sm:p-10 mb-8 border border-slate-200 bg-white text-slate-800 shadow-xs">
          <h2 className="text-2xl sm:text-3xl font-black mb-5 tracking-tight text-slate-900 flex items-center gap-2.5">
            <Gamepad2 className="w-7 h-7 text-purple-700" aria-hidden="true" />
            <span>{niche.guideTitle}</span>
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-xs sm:text-sm leading-relaxed text-slate-600 mb-6">
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

          <div className="pt-6 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="text-xs text-slate-600 font-medium">{ui.sharePromptTitle}</div>
            <SocialShareWidget url={pageUrl} title={hubMeta.socialTitle} />
          </div>
        </section>

        <SeoFaq
          localeKey={localeKey}
          hubSlug="gaming"
          customFaqs={niche.faqs}
          omitSchema={omitSchema}
        />
      </main>

      <Footer currentTheme="gamer" />
    </div>
  );
}
