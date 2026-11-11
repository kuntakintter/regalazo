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
import SeoFaq from '@/components/SeoFaq';
import {
  MASCOTAS_PRODUCTS,
  MASCOTAS_CATEGORIES,
  MASCOTAS_BRANDS,
  MASCOTAS_PRICE_RANGES,
  PetType,
  PET_TYPE_FILTERS,
} from '@/data/mascotasData';
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
  ShoppingBag,
  Loader2,
  Filter,
  ChevronRight,
  PawPrint,
  ArrowUpDown,
} from 'lucide-react';

interface HubViewProps {
  omitSchema?: boolean;
  initialCategory?: string;
}

const BRAND_OPTIONS = MASCOTAS_BRANDS.filter((b) => b !== 'Todas las marcas');

export default function MascotasView({
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

  const [selectedPetType, setSelectedPetType] = useState<PetType>('all');
  const [selectedCategory, setSelectedCategory] = useState<string>(initialCategory);
  const [selectedBrand, setSelectedBrand] = useState<string>('all');
  const [selectedPrice, setSelectedPrice] = useState<string>('all');
  const [sortBy, setSortBy] = useState<'featured' | 'price-asc' | 'price-desc' | 'rating'>('featured');
  const [liveAmazonProducts, setLiveAmazonProducts] = useState<LiveSearchResult[]>([]);
  const [isLoadingLive, setIsLoadingLive] = useState(false);

  const labels = getHubLabels(localeKey, activeCurrency);
  const niche = labels.mascotas;
  const hubMeta = getLocalizedStaticHubMeta(localeKey, 'mascotas', activeCurrency);
  const isEs = localeKey === 'es' || localeKey === 'es-us';

  const filteredProducts = useMemo(() => {
    return MASCOTAS_PRODUCTS.filter((prod) => {
      if (selectedPetType !== 'all' && prod.petType !== selectedPetType && prod.petType !== 'all') {
        return false;
      }
      if (selectedCategory !== 'all' && prod.category !== selectedCategory) return false;
      if (selectedBrand !== 'all' && prod.brand !== selectedBrand) return false;
      if (selectedPrice !== 'all') {
        if (selectedPrice === '<25' && prod.priceNumeric >= 25) return false;
        if (selectedPrice === '25-60' && (prod.priceNumeric < 25 || prod.priceNumeric > 60)) return false;
        if (selectedPrice === '60-120' && (prod.priceNumeric < 60 || prod.priceNumeric > 120)) return false;
        if (selectedPrice === '>120' && prod.priceNumeric < 120) return false;
      }
      return true;
    });
  }, [selectedPetType, selectedCategory, selectedBrand, selectedPrice]);

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
        category: 'Mascotas',
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

    if (selectedPetType === 'perro') {
      if (selectedCategory === 'kong-ansiedad') {
        parts.push(isEs ? 'kong classic perro juguete rellenable lick mat' : 'kong classic dog toy lick mat');
      } else if (selectedCategory === 'comederos') {
        parts.push(isEs ? 'comedero automatico perros bebedero' : 'automatic dog feeder water dispenser');
      } else if (selectedCategory === 'gps') {
        parts.push(isEs ? 'tractive localizador gps perros collar' : 'tractive gps dog tracker collar');
      } else if (selectedCategory === 'camas') {
        parts.push(isEs ? 'cama ortopedica perros viscoelastica' : 'orthopedic memory foam dog bed');
      } else if (selectedCategory === 'juguetes') {
        parts.push(isEs ? 'juguetes interactivos perros puzzle' : 'interactive puzzle dog toys');
      } else if (selectedCategory === 'viaje') {
        parts.push(isEs ? 'arnes perro antitirones julius k9 funda coche' : 'no pull dog harness car seat cover');
      } else if (selectedCategory === 'gadgets') {
        parts.push(isEs ? 'camara perros dispensador furminator' : 'pet camera treat dispenser furminator');
      } else {
        parts.push(isEs ? 'regalos originales perros accesorios caninos' : 'best gifts for dog lovers');
      }
    } else if (selectedPetType === 'gato') {
      if (selectedCategory === 'kong-ansiedad') {
        parts.push(isEs ? 'juguete interactivo gatos comedero lento lick mat' : 'cat slow feeder lick mat interactive');
      } else if (selectedCategory === 'comederos') {
        parts.push(isEs ? 'catit pixi fuente agua gatos inteligente' : 'catit pixi cat water fountain automatic');
      } else if (selectedCategory === 'gps') {
        parts.push(isEs ? 'localizador gps gatos collar tractive' : 'tractive gps cat tracker collar');
      } else if (selectedCategory === 'camas') {
        parts.push(isEs ? 'cama cueva gatos hamaca ventana rascador' : 'cat cave bed window hammock scratcher');
      } else if (selectedCategory === 'juguetes') {
        parts.push(isEs ? 'juguetes interactivos gatos catnip laser' : 'interactive cat toy catnip laser');
      } else if (selectedCategory === 'viaje') {
        parts.push(isEs ? 'transportin gatos homologado mochila' : 'airline approved cat carrier backpack');
      } else if (selectedCategory === 'gadgets') {
        parts.push(isEs ? 'camara gatos cepillo vaporizador' : 'cat camera grooming brush');
      } else {
        parts.push(isEs ? 'regalos originales gatos rascadores accesorios' : 'best gifts for cat lovers');
      }
    } else if (selectedPetType === 'roedor') {
      if (selectedCategory === 'kong-ansiedad') {
        parts.push(isEs ? 'dispensador heno interactivo conejos roedores' : 'rabbit hay feeder foraging toy');
      } else if (selectedCategory === 'comederos') {
        parts.push(isEs ? 'comedero ceramica bebedero conejos cobayas' : 'ceramic rabbit bowl water bottle');
      } else if (selectedCategory === 'gps') {
        parts.push(isEs ? 'valla parque conejos roedores plegable' : 'small animal rabbit playpen fence');
      } else if (selectedCategory === 'camas') {
        parts.push(isEs ? 'cama nido conejos hamaca cobayas tunel' : 'guinea pig fleece hideout tunnel bed');
      } else if (selectedCategory === 'juguetes') {
        parts.push(isEs ? 'trixie tunel mimbre conejos juguetes madera' : 'wooden chew toys tunnel for rabbits');
      } else if (selectedCategory === 'viaje') {
        parts.push(isEs ? 'transportin conejos cobayas pequenos mamiferos' : 'small pet rabbit travel carrier');
      } else if (selectedCategory === 'gadgets') {
        parts.push(isEs ? 'cepillo suave conejos esquinero roedores' : 'small animal grooming brush litter box');
      } else {
        parts.push(isEs ? 'accesorios juguetes conejos cobayas roedores' : 'rabbit guinea pig toys accessories');
      }
    } else {
      if (selectedCategory === 'kong-ansiedad') {
        parts.push(isEs ? 'kong perro juguete lick mat comedero lento' : 'kong enrichment pet toy lick mat');
      } else if (selectedCategory === 'comederos') {
        parts.push(isEs ? 'fuente agua gatos comedero automatico perros' : 'smart pet water fountain feeder');
      } else if (selectedCategory === 'gps') {
        parts.push(isEs ? 'localizador gps perros gatos tractive' : 'tractive gps pet tracker');
      } else if (selectedCategory === 'camas') {
        parts.push(isEs ? 'cama ortopedica perros gatos viscoelastica' : 'orthopedic dog cat bed');
      } else if (selectedCategory === 'juguetes') {
        parts.push(isEs ? 'juguetes interactivos mascotas puzzles' : 'interactive pet puzzle toys');
      } else if (selectedCategory === 'viaje') {
        parts.push(isEs ? 'arnes perro antitirones transportin mascotas' : 'pet travel carrier harness');
      } else if (selectedCategory === 'gadgets') {
        parts.push(isEs ? 'camara mascotas dispensador golosinas furminator' : 'pet camera treat dispenser grooming');
      } else {
        parts.push(niche.liveSearchQueryPrefix);
      }
    }

    return parts.join(' ');
  }, [selectedCategory, selectedBrand, selectedPetType, isEs, niche.liveSearchQueryPrefix]);

  React.useEffect(() => {
    const hasFilter =
      selectedPetType !== 'all' ||
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
  }, [selectedPetType, selectedCategory, selectedBrand, selectedPrice, liveSearchQuery, amazonRegion]);

  const handleLoadLiveToGrid = useCallback(async () => {
    if (isLoadingLive) return;
    setIsLoadingLive(true);
    try {
      const res = await fetch(
        `/api/live-search?q=${encodeURIComponent(liveSearchQuery)}&limit=12&region=${amazonRegion}`
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
      console.error('Error fetching live Amazon mascotas products:', err);
    } finally {
      setIsLoadingLive(false);
    }
  }, [isLoadingLive, liveSearchQuery, amazonRegion]);

  const handleResetFilters = () => {
    setSelectedPetType('all');
    setSelectedCategory('all');
    setSelectedBrand('all');
    setSelectedPrice('all');
    setSortBy('featured');
    setLiveAmazonProducts([]);
  };

  const pageUrl = `https://www.unbuenregalo.es${localePath('/mascotas')}`;
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
        { '@type': 'ListItem', position: 1, name: ui.breadcrumbHome, item: homeUrl },
        { '@type': 'ListItem', position: 2, name: hubMeta.breadcrumbLabel, item: pageUrl },
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

  const activePetFilter = PET_TYPE_FILTERS.find((p) => p.id === selectedPetType) || PET_TYPE_FILTERS[0];
  const hasActiveFilter =
    selectedPetType !== 'all' ||
    selectedCategory !== 'all' ||
    selectedBrand !== 'all' ||
    selectedPrice !== 'all' ||
    sortBy !== 'featured';

  return (
    <div
      dir={isRtl ? 'rtl' : 'ltr'}
      className="min-h-screen relative flex flex-col bg-slate-50 text-slate-900 selection:bg-rose-500 selection:text-white"
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

          <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-6 text-xs font-medium text-slate-700 mb-8">
            <span className="flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-emerald-700" aria-hidden="true" />
              <span>
                {niche.trustBadges[0]} · {amazonSiteName}
              </span>
            </span>
            <span className="flex items-center gap-1.5">
              <TrendingUp className="w-4 h-4 text-rose-700" aria-hidden="true" />
              <span>{niche.trustBadges[1]}</span>
            </span>
            <span className="flex items-center gap-1.5">
              <BadgePercent className="w-4 h-4 text-amber-800" aria-hidden="true" />
              <span>{niche.trustBadges[2]}</span>
            </span>
          </div>
        </section>

        {/* FILTER BAR */}
        <div className="bg-white rounded-3xl border border-slate-200 p-5 sm:p-6 mb-8 shadow-xs">
          {/* Animal Type Selector */}
          <div className="mb-6 pb-6 border-b border-slate-100">
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-bold uppercase tracking-wider text-rose-800 flex items-center gap-1.5">
                <PawPrint className="w-4 h-4 text-rose-700" aria-hidden="true" />
                <span>{niche.petTypeLabel || niche.filterQuestion}</span>
              </span>
              <span className="text-xs font-semibold text-slate-600">
                {tTerm(activePetFilter.label)} {activePetFilter.icon}
              </span>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 sm:gap-3">
              {PET_TYPE_FILTERS.map((pet) => {
                const isSelected = selectedPetType === pet.id;
                return (
                  <button
                    key={pet.id}
                    type="button"
                    onClick={() => {
                      setSelectedPetType(pet.id);
                      setLiveAmazonProducts([]);
                    }}
                    className={`py-3 px-3.5 rounded-2xl text-xs sm:text-sm font-bold transition-all flex items-center justify-center gap-2 cursor-pointer border ${
                      isSelected
                        ? 'bg-rose-700 text-white border-rose-700 shadow-md shadow-rose-500/25 scale-[1.02]'
                        : 'bg-slate-50 hover:bg-rose-50/50 text-slate-800 border-slate-200/90 hover:border-rose-300'
                    }`}
                  >
                    <span className="text-lg" aria-hidden="true">
                      {pet.icon}
                    </span>
                    <span>{tTerm(pet.label)}</span>
                  </button>
                );
              })}
            </div>
          </div>

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
              {MASCOTAS_CATEGORIES.map((cat) => (
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
                htmlFor="mascotas-brand"
                className="block text-[11px] font-bold text-slate-700 uppercase tracking-wider mb-1.5"
              >
                {labels.common.brandLabel}
              </label>
              <select
                id="mascotas-brand"
                value={selectedBrand}
                aria-label={labels.common.brandLabel}
                onChange={(e) => {
                  setSelectedBrand(e.target.value);
                  setLiveAmazonProducts([]);
                }}
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 bg-slate-50 text-slate-800 text-xs font-semibold focus:border-rose-600 focus:bg-white outline-none cursor-pointer"
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
                htmlFor="mascotas-price"
                className="block text-[11px] font-bold text-slate-700 uppercase tracking-wider mb-1.5"
              >
                {labels.common.priceRangeLabel}
              </label>
              <select
                id="mascotas-price"
                value={selectedPrice}
                aria-label={labels.common.priceRangeLabel}
                onChange={(e) => {
                  setSelectedPrice(e.target.value);
                  setLiveAmazonProducts([]);
                }}
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 bg-slate-50 text-slate-800 text-xs font-semibold focus:border-rose-600 focus:bg-white outline-none cursor-pointer"
              >
                {MASCOTAS_PRICE_RANGES.map((pr) => (
                  <option key={pr.id} value={pr.id}>
                    {pr.id === 'all' ? labels.common.allPrices : tTerm(pr.label)}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label
                htmlFor="mascotas-sort"
                className="flex items-center gap-1.5 text-[11px] font-bold text-slate-700 uppercase tracking-wider mb-1.5"
              >
                <ArrowUpDown className="w-3.5 h-3.5 text-rose-700" aria-hidden="true" />
                <span>{labels.common.sortLabel}</span>
              </label>
              <select
                id="mascotas-sort"
                value={sortBy}
                aria-label={labels.common.sortLabel}
                onChange={(e) =>
                  setSortBy(e.target.value as 'featured' | 'price-asc' | 'price-desc' | 'rating')
                }
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 bg-slate-50 text-slate-800 text-xs font-semibold focus:border-rose-600 focus:bg-white outline-none cursor-pointer"
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
                className="text-xs font-bold text-rose-800 hover:text-rose-950 underline cursor-pointer"
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
                className="px-7 py-4 rounded-2xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-slate-950 font-black text-sm shadow-md hover:shadow-lg hover:shadow-amber-500/20 transition-all flex items-center gap-2.5 cursor-pointer disabled:opacity-75 hover:scale-102"
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
            <div className="mb-6 p-4 sm:p-5 bg-gradient-to-r from-amber-50 via-rose-50 to-orange-50 border border-amber-200 rounded-3xl flex flex-wrap items-center justify-between gap-3 shadow-xs">
              <div className="flex items-center gap-3 text-amber-950 font-bold text-sm">
                <span className="p-2 bg-amber-500/20 text-amber-800 rounded-xl">
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
                className="text-xs bg-white text-amber-900 px-4 py-2 rounded-xl border border-amber-200 font-bold hover:bg-amber-100 transition-all shadow-xs cursor-pointer"
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
                className="px-7 py-4 rounded-2xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-slate-950 font-black text-sm shadow-md hover:shadow-lg hover:shadow-amber-500/20 transition-all flex items-center gap-2.5 cursor-pointer disabled:opacity-75 hover:scale-102"
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
          <div className="py-20 mb-16 text-center flex flex-col items-center justify-center gap-3 bg-white/80 rounded-3xl border border-amber-100 shadow-xs">
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
            <PawPrint className="w-7 h-7 text-rose-700 shrink-0" aria-hidden="true" />
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

        <SeoFaq localeKey={localeKey} hubSlug="mascotas" omitSchema={omitSchema} />
      </main>

      <Footer currentTheme="classic" />
    </div>
  );
}
