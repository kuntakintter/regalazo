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
  COMPETICION_PRODUCTS,
  COMPETICION_CATEGORIES,
  COMPETICION_BRANDS,
  COMPETICION_PRICE_RANGES,
} from '@/data/competicionData';
import { Product } from '@/data/products';
import { LiveSearchResult } from '@/app/api/live-search/route';
import { parsePrice } from '@/lib/amazon';
import { useActiveLocale } from '@/hooks/useActiveLocale';
import { generateProductItemListSchema } from '@/lib/schemaProduct';
import {
  ShieldCheck,
  TrendingUp,
  BadgePercent,
  ShoppingBag,
  Loader2,
  Filter,
  ChevronRight,
  Flame,
  ArrowUpDown,
  Trophy,
  Sparkles,
} from 'lucide-react';

interface HubViewProps {
  omitSchema?: boolean;
  initialCategory?: string;
}

const BRAND_OPTIONS = COMPETICION_BRANDS.filter((b) => b !== 'Todas las marcas');

export default function CompeticionView({
  omitSchema = false,
  initialCategory = 'all',
}: HubViewProps) {
  const {
    localeKey,
    localePath,
    ui,
    amazonRegion,
    amazonSiteName,
    tTerm,
  } = useActiveLocale();

  const [selectedCategory, setSelectedCategory] = useState<string>(initialCategory);
  const [selectedBrand, setSelectedBrand] = useState<string>('all');
  const [selectedPrice, setSelectedPrice] = useState<string>('all');
  const [sortBy, setSortBy] = useState<'featured' | 'price-asc' | 'price-desc' | 'rating'>('featured');
  const [liveAmazonProducts, setLiveAmazonProducts] = useState<LiveSearchResult[]>([]);
  const [isLoadingLive, setIsLoadingLive] = useState(false);

  const isEs = localeKey === 'es' || localeKey === 'es-us';

  const filteredProducts = useMemo(() => {
    return COMPETICION_PRODUCTS.filter((prod) => {
      if (selectedCategory !== 'all' && prod.category !== selectedCategory) return false;
      if (selectedBrand !== 'all' && prod.brand !== selectedBrand) return false;
      if (selectedPrice !== 'all') {
        if (selectedPrice === '<25' && prod.priceNumeric >= 25) return false;
        if (selectedPrice === '25-60' && (prod.priceNumeric < 25 || prod.priceNumeric > 60)) return false;
        if (selectedPrice === '60-150' && (prod.priceNumeric < 60 || prod.priceNumeric > 150)) return false;
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
        category: 'Competición & Motor',
        subcategory: m.categoryLabel,
        imageUrl: m.imageUrl,
        images: [m.imageUrl],
        description: m.description,
        pros: m.pros,
        idealFor: m.idealFor,
        searchQuery: m.searchQuery,
        gender: 'unisex',
        ageRange: '+18',
        style: 'tech',
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

    if (selectedCategory === 'f1') {
      parts.push(isEs ? 'formula 1 f1 escuderia oficial' : 'formula 1 team official f1');
    } else if (selectedCategory === 'motogp') {
      parts.push(isEs ? 'motogp marc marquez ducati oficial' : 'motogp ducati corse official');
    } else if (selectedCategory === 'scalextric') {
      parts.push(isEs ? 'scalextric carrera circuito slot coches' : 'slot car racing track set');
    } else if (selectedCategory === 'simracing') {
      parts.push(isEs ? 'volante simracing carreras ps5 pc logitech' : 'racing wheel pedals simracing ps5 pc');
    } else if (selectedCategory === 'maquetas') {
      parts.push(isEs ? 'maqueta coche carreras f1 1:43 diecast' : 'diecast f1 model car 1:43');
    } else if (selectedCategory === 'ropa-merch') {
      parts.push(isEs ? 'gorra camiseta oficial escuderia f1 motogp' : 'official racing team cap t-shirt f1');
    } else if (selectedCategory === 'garaje-lifestyle') {
      parts.push(isEs ? 'llavero coche carreras metalico garaje racing' : 'racing car keychain garage accessories');
    } else {
      parts.push(isEs ? 'regalos f1 carreras motogp scalextric' : 'motorsport racing gifts f1 motogp');
    }

    return parts.join(' ');
  }, [selectedCategory, selectedBrand, isEs]);

  React.useEffect(() => {
    // Reset live Amazon products when user changes filters to keep curated categories clean and focused
    setLiveAmazonProducts([]);
  }, [selectedCategory, selectedBrand, selectedPrice]);

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
      console.error('Error fetching live Amazon competicion products:', err);
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

  const pageUrl = `https://www.unbuenregalo.es${localePath('/competicion')}`;
  const homeUrl =
    localeKey === 'es'
      ? 'https://www.unbuenregalo.es'
      : `https://www.unbuenregalo.es${localePath('/')}`;

  const collectionSchema = useMemo(
    () => ({
      '@context': 'https://schema.org',
      '@type': 'CollectionPage',
      name: '🏁 Regalos de Competición, Motor y Carreras 【2026】 F1, MotoGP, Scalextric & Simracing',
      description:
        'Guía especializada de regalos de carreras y motor: Fórmula 1, escuderías oficiales, MotoGP, pistas de Scalextric, volantes simracing y merchandising de pilotos con compra directa en Amazon.',
      url: pageUrl,
    }),
    [pageUrl]
  );

  const breadcrumbSchema = useMemo(
    () => ({
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: ui.breadcrumbHome, item: homeUrl },
        { '@type': 'ListItem', position: 2, name: 'Mundo de la Competición', item: pageUrl },
      ],
    }),
    [ui.breadcrumbHome, homeUrl, pageUrl]
  );

  const productListSchema = useMemo(
    () =>
      generateProductItemListSchema(
        displayProducts,
        '🏁 Regalos Top de Competición y Carreras',
        { currency: 'EUR' }
      ),
    [displayProducts]
  );

  const faqItems = [
    {
      question: '¿Cuáles son los mejores regalos para un fanático de la Fórmula 1?',
      answer:
        'Entre los regalos más celebrados destacan las gorras y camisetas oficiales de escuderías (Aston Martin de Fernando Alonso, Scuderia Ferrari, Red Bull Racing), maquetas coleccionables a escala 1:43 de Bburago con vitrina, maquetas LEGO Speed Champions y cuadros en relieve con la silueta de circuitos legendarios como Mónaco o Spa.',
    },
    {
      question: '¿Qué diferencia hay entre Scalextric Compact y Scalextric Original?',
      answer:
        'Scalextric Compact funciona a escala 1:43, ocupa menos espacio en casa, incluye mandos inalámbricos turbo ergonómicos y pistas con loopings ideales para niños y juego en familia. Scalextric Original es a escala 1:32, con coches más grandes, detallados y pesados, orientado tanto a aficionados de toda la vida como a competiciones de slot de salón.',
    },
    {
      question: '¿Qué volante de simracing es más recomendable para empezar?',
      answer:
        'El Logitech G29 (o su versión G923) es el estándar indiscutible de la simulación deportiva para PS5 y PC. Cuenta con Force Feedback de doble motor, giro de 900 grados, aro forrado en cuero auténtico y una pedalera metálica con freno no lineal muy realista. Si se busca una opción de entrada más accesible con licencia Ferrari, el Thrustmaster T98 es una excelente alternativa.',
    },
    {
      question: '¿Cómo puedo acertar si no sé qué piloto o escudería le gusta?',
      answer:
        'Los detalles neutros de automovilismo siempre triunfan: un circuito de Scalextric para competir en casa, un llavero metálico con disco de freno giratorio con pinza Brembo, una taza térmica de paddock o un felpudo con parrilla de salida "Starting Grid". También puedes usar nuestro botón "Añadir a Votar en Grupo" para pasar la lista a sus amigos por WhatsApp y que voten el regalo ganador.',
    },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-slate-950 text-slate-100 selection:bg-red-600 selection:text-white">
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
            dangerouslySetInnerHTML={{ __html: JSON.stringify(productListSchema) }}
          />
        </>
      )}

      <ThemeAtmosphere />
      <Header />

      <main className="flex-1 pb-16">
        {/* HERO BANNER COMPETICIÓN */}
        <div className="relative overflow-hidden bg-gradient-to-b from-[#180a0a] via-[#12161f] to-slate-950 border-b border-red-500/20 pt-8 pb-10">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-red-600/15 via-transparent to-transparent pointer-events-none" />
          
          {/* Bandera de cuadros (Finish Line) SOLO en la cabecera superior del título, sin entrar en los botones de categorías */}
          <div
            className="absolute top-0 left-0 right-0 h-[220px] pointer-events-none select-none opacity-[0.08]"
            style={{
              backgroundImage: `
                linear-gradient(45deg, #ffffff 25%, transparent 25%), 
                linear-gradient(-45deg, #ffffff 25%, transparent 25%), 
                linear-gradient(45deg, transparent 75%, #ffffff 75%), 
                linear-gradient(-45deg, transparent 75%, #ffffff 75%)
              `,
              backgroundSize: '36px 36px',
              backgroundPosition: '0 0, 0 18px, 18px -18px, -18px 0px',
              maskImage: 'linear-gradient(to bottom, rgba(0,0,0,0.85) 0%, rgba(0,0,0,0.4) 65%, rgba(0,0,0,0) 100%)',
              WebkitMaskImage: 'linear-gradient(to bottom, rgba(0,0,0,0.85) 0%, rgba(0,0,0,0.4) 65%, rgba(0,0,0,0) 100%)',
            }}
          />

          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            {/* Breadcrumb */}
            <nav aria-label="Breadcrumb" className="flex items-center gap-1.5 text-xs text-slate-400 mb-4">
              <Link href={homeUrl} className="hover:text-red-400 transition-colors">
                {ui.breadcrumbHome}
              </Link>
              <ChevronRight className="w-3.5 h-3.5 text-slate-600" />
              <span className="text-red-400 font-bold">Mundo de la Competición</span>
            </nav>

            {/* Title & Tagline */}
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
              <div className="max-w-3xl">
                <h1 className="text-3xl sm:text-4xl md:text-5xl font-black text-white tracking-tight leading-tight">
                  Mundo de la <span className="bg-gradient-to-r from-red-500 via-rose-500 to-amber-400 bg-clip-text text-transparent">Competición</span>
                </h1>
                <p className="mt-3 text-sm sm:text-base md:text-[17px] text-slate-300 leading-relaxed font-normal">
                  La guía definitiva de regalos para apasionados del motor: ropa y gorras oficiales de <strong>Fórmula 1</strong> y <strong>MotoGP</strong>, circuitos míticos de <strong>Scalextric</strong>, simuladores de <strong>Simracing</strong>, maquetas de coleccionista y detalles de garaje con compra directa en Amazon.
                </p>
              </div>

              {/* Badges Highlights */}
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-1 gap-2.5 shrink-0 text-xs sm:text-sm">
                <div className="flex items-center gap-2 p-2.5 sm:p-3 rounded-xl bg-slate-900/80 border border-slate-800 shadow-sm">
                  <Trophy className="w-4 h-4 sm:w-5 sm:h-5 text-amber-400 shrink-0" />
                  <span className="font-bold text-slate-200">Selección Top del Motor</span>
                </div>
                <div className="flex items-center gap-2 p-2.5 sm:p-3 rounded-xl bg-slate-900/80 border border-slate-800 shadow-sm">
                  <ShieldCheck className="w-4 h-4 sm:w-5 sm:h-5 text-emerald-400 shrink-0" />
                  <span className="font-bold text-slate-200">Garantía Prime en {amazonSiteName}</span>
                </div>
                <div className="flex items-center gap-2 p-2.5 sm:p-3 rounded-xl bg-slate-900/80 border border-slate-800 shadow-sm">
                  <Flame className="w-4 h-4 sm:w-5 sm:h-5 text-rose-400 shrink-0" />
                  <span className="font-bold text-slate-200">F1 · MotoGP · IndyCar · NASCAR y ¡MÁS!</span>
                </div>
              </div>
            </div>

            {/* CATEGORY TABS - RESPONSIVE MOTORSPORT GRID */}
            <div className="mt-8 pt-6 border-t border-red-500/20 relative z-20">
              <div className="flex items-center justify-between mb-3.5">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-red-500 animate-pulse shadow-sm shadow-red-500/80" />
                  <span className="text-white uppercase tracking-wider font-black text-xs sm:text-sm">
                    Categorías de Competición
                  </span>
                  <span className="hidden sm:inline-block text-slate-400 text-xs font-semibold">
                    · Selecciona tu especialidad del motor
                  </span>
                </div>
                <span className="text-red-400 text-xs font-bold bg-red-950/60 px-2.5 py-1 rounded-md border border-red-900/40">
                  8 Especialidades
                </span>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 xl:grid-cols-8 gap-2 sm:gap-2.5">
                {COMPETICION_CATEGORIES.map((cat) => {
                  const isActive = selectedCategory === cat.id;
                  return (
                    <button
                      key={cat.id}
                      type="button"
                      onClick={() => setSelectedCategory(cat.id)}
                      className={`group relative flex flex-row sm:flex-col items-center sm:justify-center p-2.5 sm:p-3 rounded-xl transition-all duration-200 cursor-pointer text-left sm:text-center w-full border ${
                        isActive
                          ? 'bg-gradient-to-r sm:bg-gradient-to-b from-red-600 via-red-600 to-rose-700 text-white border-red-400 shadow-lg shadow-red-900/50 ring-2 ring-red-400/80 scale-[1.02]'
                          : 'bg-slate-900/90 hover:bg-slate-800/95 text-slate-200 hover:text-white border-slate-800/90 hover:border-red-500/50 hover:shadow-md hover:shadow-red-950/40'
                      }`}
                      aria-pressed={isActive}
                      title={cat.label}
                    >
                      <div className="flex items-center gap-2.5 sm:flex-col sm:gap-1 w-full">
                        <span className="text-2xl sm:text-3xl shrink-0 transition-transform group-hover:scale-110">
                          {cat.icon}
                        </span>
                        <div className="min-w-0 flex-1 sm:w-full">
                          <div className="font-black text-xs sm:text-sm tracking-tight leading-snug truncate">
                            {cat.label}
                          </div>
                          <div
                            className={`text-[10px] sm:text-[11px] font-semibold truncate ${
                              isActive ? 'text-red-100' : 'text-slate-400 group-hover:text-red-300'
                            }`}
                          >
                            {cat.sublabel}
                          </div>
                        </div>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        </div>

        {/* CONTROLS BAR: BRANDS, PRICE, SORT & COUNT */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-6">
          <div className="p-3.5 sm:p-4 rounded-2xl bg-slate-900/80 border border-slate-800/90 shadow-md flex flex-wrap items-center justify-between gap-3 text-xs sm:text-sm">
            {/* Left Filter Selectors */}
            <div className="flex flex-wrap items-center gap-2.5">
              <div className="flex items-center gap-1.5 text-slate-400 font-bold mr-1">
                <Filter className="w-4 h-4 text-red-400" />
                <span className="text-xs sm:text-sm">Filtrar:</span>
              </div>

              {/* Brand Selector */}
              <select
                value={selectedBrand}
                onChange={(e) => setSelectedBrand(e.target.value)}
                className="bg-slate-950 text-slate-200 border border-slate-800 rounded-xl px-3 py-2 text-xs sm:text-sm focus:outline-none focus:ring-1 focus:ring-red-500 font-medium cursor-pointer"
                aria-label="Filtrar por marca o escudería"
              >
                <option value="all">Todas las escuderías y marcas</option>
                {BRAND_OPTIONS.map((brand) => (
                  <option key={brand} value={brand}>
                    {brand}
                  </option>
                ))}
              </select>

              {/* Price Range Selector */}
              <select
                value={selectedPrice}
                onChange={(e) => setSelectedPrice(e.target.value)}
                className="bg-slate-950 text-slate-200 border border-slate-800 rounded-xl px-3 py-2 text-xs sm:text-sm focus:outline-none focus:ring-1 focus:ring-red-500 font-medium cursor-pointer"
                aria-label="Filtrar por rango de precio"
              >
                {COMPETICION_PRICE_RANGES.map((pr) => (
                  <option key={pr.id} value={pr.id}>
                    {pr.label}
                  </option>
                ))}
              </select>

              {(selectedCategory !== 'all' || selectedBrand !== 'all' || selectedPrice !== 'all') && (
                <button
                  type="button"
                  onClick={handleResetFilters}
                  className="text-red-400 hover:text-red-300 font-bold underline ml-1 cursor-pointer text-xs sm:text-sm"
                >
                  Limpiar filtros
                </button>
              )}
            </div>

            {/* Right Sort & Counters */}
            <div className="flex items-center gap-3 ml-auto text-xs sm:text-sm">
              <span className="text-slate-400 font-medium">
                <strong className="text-white font-bold">{sortedDisplayProducts.length}</strong> regalos seleccionados
              </span>

              <div className="flex items-center gap-1.5">
                <ArrowUpDown className="w-4 h-4 text-slate-500" />
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value as 'featured' | 'price-asc' | 'price-desc' | 'rating')}
                  className="bg-slate-950 text-slate-200 border border-slate-800 rounded-xl px-3 py-2 text-xs sm:text-sm focus:outline-none focus:ring-1 focus:ring-red-500 font-medium cursor-pointer"
                  aria-label="Ordenar productos"
                >
                  <option value="featured">Destacados</option>
                  <option value="price-asc">Precio: de menor a mayor</option>
                  <option value="price-desc">Precio: de mayor a menor</option>
                  <option value="rating">Mejor valorados ⭐</option>
                </select>
              </div>
            </div>
          </div>
        </div>

        {/* PRODUCTS GRID */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-6">
          {sortedDisplayProducts.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
              {sortedDisplayProducts.map((product, index) => (
                <React.Fragment key={product.id}>
                  <ProductCard product={product} />

                  {/* Intercalated Amazon Live Search Card */}
                  {index === 3 && (
                    <div className="col-span-1 sm:col-span-2 md:col-span-3 lg:col-span-4 my-2">
                      <AmazonLiveSearchCard
                        currentTheme="tech"
                        initialQuery={liveSearchQuery || 'f1 alonso ferrari scalextric'}
                      />
                    </div>
                  )}
                </React.Fragment>
              ))}

              {/* Appended Live Amazon Results when filtered */}
              {sortedLiveAmazonProducts.map((liveProd) => (
                <LiveAmazonProductCard
                  key={liveProd.asin}
                  product={liveProd}
                  categoryLabel="Competición"
                  badgeLabel="Amazon Prime"
                />
              ))}

              {/* Grid Discovery Card to fetch more from Amazon */}
              <div className="col-span-1 sm:col-span-2 md:col-span-3 lg:col-span-4 mt-4">
                <AmazonGridDiscoveryCard
                  searchQuery={liveSearchQuery}
                  selectedCategory="Mundo de la Competición"
                  onLoadLiveToGrid={handleLoadLiveToGrid}
                  isLoadingLive={isLoadingLive}
                  hasLoadedLive={liveAmazonProducts.length > 0}
                />
              </div>
            </div>
          ) : (
            <div className="text-center py-16 px-4 bg-slate-900/50 rounded-2xl border border-slate-800">
              <span className="text-4xl">🏎️💨</span>
              <h3 className="text-lg font-black text-white mt-3">
                No encontramos productos con esta combinación exacta de filtros
              </h3>
              <p className="text-xs text-slate-400 mt-1 max-w-md mx-auto">
                Prueba a seleccionar &quot;Todas las marcas&quot; o &quot;Cualquier presupuesto&quot; para ver el catálogo completo de carreras.
              </p>
              <button
                type="button"
                onClick={handleResetFilters}
                className="mt-4 px-5 py-2.5 rounded-xl bg-red-600 hover:bg-red-500 text-white font-bold text-xs shadow-md transition-all cursor-pointer"
              >
                Ver todos los regalos de competición
              </button>
            </div>
          )}
        </div>

        {/* SEO FAQ ACCORDION */}
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 mt-16">
          <div className="p-6 sm:p-8 rounded-3xl bg-slate-900/70 border border-slate-800 shadow-xl">
            <div className="flex items-center gap-2.5 mb-2">
              <Sparkles className="w-5 h-5 text-amber-400" />
              <h2 className="text-xl sm:text-2xl font-black text-white">
                Preguntas Frecuentes sobre Regalos de Carreras y Competición
              </h2>
            </div>
            <p className="text-xs sm:text-sm text-slate-400 mb-6">
              Consejos de expertos para elegir el regalo perfecto si le apasiona la F1, las motos o el automovilismo.
            </p>
            <SeoFaq customFaqs={faqItems} />
          </div>
        </div>
      </main>

      <Footer currentTheme="classic" />
    </div>
  );
}
