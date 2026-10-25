'use client';

import React, { useState, useMemo, useCallback } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import ProductCard from '@/components/ProductCard';
import LiveAmazonProductCard from '@/components/LiveAmazonProductCard';
import AmazonLiveSearchCard from '@/components/AmazonLiveSearchCard';
import AmazonGridDiscoveryCard from '@/components/AmazonGridDiscoveryCard';
import ThemeAtmosphere from '@/components/ThemeAtmosphere';
import SocialShareBar from '@/components/SocialShareBar';
import TopPodium from '@/components/TopPodium';
import {
  MOTORISTA_PRODUCTS,
  MOTORISTA_CATEGORIES,
  MOTORISTA_BRANDS,
  MOTORISTA_PRICE_RANGES,
  MotoristaProduct,
} from '@/data/motoristasData';
import { Product } from '@/data/products';
import { LiveSearchResult } from '@/app/api/live-search/route';
import {
  ShieldCheck,
  TrendingUp,
  BadgePercent,
  Loader2,
  Filter,
  CheckCircle2,
  HelpCircle,
  ShoppingBag,
  ExternalLink,
  ChevronRight,
  Gauge,
  ArrowUpDown
} from 'lucide-react';
import { parsePrice } from '@/lib/amazon';
import Link from 'next/link';

export default function MotoristasPage() {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedBrand, setSelectedBrand] = useState<string>('Todas las marcas');
  const [selectedPrice, setSelectedPrice] = useState<string>('all');
  const [selectedStyle, setSelectedStyle] = useState<string>('all');
  const [sortBy, setSortBy] = useState<'featured' | 'price-asc' | 'price-desc' | 'rating'>('featured');
  const [liveAmazonProducts, setLiveAmazonProducts] = useState<LiveSearchResult[]>([]);
  const [isLoadingLive, setIsLoadingLive] = useState(false);

  // Filter local curated motorista products
  const filteredProducts = useMemo(() => {
    return MOTORISTA_PRODUCTS.filter((prod) => {
      // Category filter
      if (selectedCategory !== 'all' && prod.category !== selectedCategory) {
        return false;
      }

      // Brand filter
      if (selectedBrand !== 'Todas las marcas' && prod.brand !== selectedBrand) {
        return false;
      }

      // Style filter (if applicable to helmets or jackets)
      if (selectedStyle !== 'all' && prod.style && prod.style !== selectedStyle) {
        return false;
      }

      // Price filter
      if (selectedPrice !== 'all') {
        if (selectedPrice === '<30' && prod.priceNumeric >= 30) return false;
        if (selectedPrice === '30-80' && (prod.priceNumeric < 30 || prod.priceNumeric > 80)) return false;
        if (selectedPrice === '80-180' && (prod.priceNumeric < 80 || prod.priceNumeric > 180)) return false;
        if (selectedPrice === '>180' && prod.priceNumeric < 180) return false;
      }

      return true;
    });
  }, [selectedCategory, selectedBrand, selectedPrice, selectedStyle]);

  // Convert to generic Product interface
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

  // Sorted products based on sortBy selector
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

  // Build live Amazon query based on active filters
  const liveSearchQuery = useMemo(() => {
    const parts: string[] = [];
    if (selectedBrand !== 'Todas las marcas') parts.push(selectedBrand);

    if (selectedCategory === 'cascos') {
      if (selectedStyle === 'modular') parts.push('casco moto modular');
      else if (selectedStyle === 'integral') parts.push('casco moto integral');
      else parts.push('casco moto homologado');
    } else if (selectedCategory === 'chaquetas') {
      parts.push('chaqueta moto protecciones');
    } else if (selectedCategory === 'guantes') {
      parts.push('guantes moto homologados');
    } else if (selectedCategory === 'intercom') {
      parts.push('intercomunicador moto bluetooth');
    } else if (selectedCategory === 'antirrobo') {
      parts.push('antirrobo disco moto alarma');
    } else if (selectedCategory === 'accesorios') {
      parts.push('accesorios regalos motorista');
    } else {
      parts.push('regalos originales para motoristas');
    }

    return parts.join(' ');
  }, [selectedCategory, selectedBrand, selectedStyle]);

  // Load live products into the grid
  const handleLoadLiveToGrid = useCallback(async () => {
    if (isLoadingLive) return;
    setIsLoadingLive(true);
    try {
      const res = await fetch(`/api/live-search?q=${encodeURIComponent(liveSearchQuery)}&limit=6`);
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
  }, [isLoadingLive, liveSearchQuery]);

  // Auto-fetch live products when filters are active to keep the grid abundant and full
  React.useEffect(() => {
    const hasFilter =
      selectedCategory !== 'all' ||
      selectedBrand !== 'Todas las marcas' ||
      selectedPrice !== 'all' ||
      selectedStyle !== 'all';

    if (hasFilter && liveSearchQuery) {
      let isMounted = true;
      setIsLoadingLive(true);
      const timer = setTimeout(() => {
        fetch(`/api/live-search?q=${encodeURIComponent(liveSearchQuery)}&limit=8`)
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
  }, [selectedCategory, selectedBrand, selectedPrice, selectedStyle, liveSearchQuery]);

  // Reset filters
  const handleResetFilters = () => {
    setSelectedCategory('all');
    setSelectedBrand('Todas las marcas');
    setSelectedPrice('all');
    setSelectedStyle('all');
    setSortBy('featured');
    setLiveAmazonProducts([]);
  };

  return (
    <div className="min-h-screen relative flex flex-col bg-slate-50 text-slate-900 selection:bg-amber-500 selection:text-slate-950">
      <ThemeAtmosphere />

      {/* Navigation Header */}
      <Header currentTheme="classic" />

      {/* Breadcrumb */}
      <nav aria-label="Breadcrumb" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-4 w-full text-xs text-slate-500 flex items-center gap-1.5">
        <Link href="/" className="hover:text-indigo-600 font-medium">Inicio</Link>
        <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
        <span className="font-bold text-slate-800">Especial Motoristas</span>
      </nav>

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 w-full z-10">
        
        {/* HERO SECTION MOTORISTAS */}
        <section className="text-center py-6 sm:py-10 max-w-4xl mx-auto">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-bold mb-4 shadow-xs border border-amber-200 bg-amber-50 text-amber-900">
            <span className="flex h-2 w-2 rounded-full bg-emerald-500 animate-pulse"></span>
            <span>Edición Especial Moteros {new Date().getFullYear()} • Homologación ECE y Calidad Certificada</span>
          </div>

          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black tracking-tight leading-[1.15] mb-5 text-slate-900">
            Mejores Regalos para Motoristas:{' '}
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-amber-500 via-orange-600 to-red-600">
              Cascos, Ropa y Accesorios
            </span>
          </h1>

          <p className="text-sm sm:text-base lg:text-lg text-slate-600 leading-relaxed mb-6 max-w-2xl mx-auto">
            Selección experta de regalos para apasionados de las motos: cascos modulares e integrales, chaquetas con protecciones, guantes térmicos, intercomunicadores y candados antirrobo con las mejores valoraciones de Amazon España.
          </p>

          {/* Quick Badges of Trust */}
          <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-6 text-xs font-medium text-slate-500 mb-8">
            <span className="flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-emerald-500" />
              Normativa ECE 22.06 Oficial
            </span>
            <span className="flex items-center gap-1.5">
              <TrendingUp className="w-4 h-4 text-amber-500" />
              Primeras Marcas: Alpinestars, Dainese, AGV
            </span>
            <span className="flex items-center gap-1.5">
              <BadgePercent className="w-4 h-4 text-indigo-500" />
              Precios y Envíos Prime al Día
            </span>
          </div>
        </section>

        {/* SOCIAL SHARE WIDGET */}
        <SocialShareBar />

        {/* MOTORISTA FILTER BAR */}
        <div className="bg-white rounded-3xl border border-slate-200 p-5 sm:p-6 mb-8 shadow-xs">
          
          {/* 1. Categoría de equipamiento */}
          <div className="mb-5">
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-500 flex items-center gap-1.5">
                <Filter className="w-3.5 h-3.5 text-amber-600" />
                <span>¿Qué tipo de regalo buscas?</span>
              </span>
              <span className="text-xs font-semibold text-slate-400">
                {displayProducts.length + liveAmazonProducts.length} ideas
              </span>
            </div>

            <div className="flex flex-wrap items-center gap-2">
              {MOTORISTA_CATEGORIES.map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => {
                    setSelectedCategory(cat.id);
                    setSelectedStyle('all');
                    setLiveAmazonProducts([]);
                  }}
                  className={`px-3.5 py-2 sm:px-4 sm:py-2.5 rounded-2xl text-xs sm:text-sm font-bold transition-all flex items-center gap-2 cursor-pointer ${
                    selectedCategory === cat.id
                      ? 'bg-slate-900 text-white shadow-md scale-102'
                      : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                  }`}
                >
                  <span>{cat.icon}</span>
                  <span>{cat.label}</span>
                </button>
              ))}
            </div>
          </div>

          {/* 2. Subfiltros por marca, presupuesto, estilo y ordenación */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 pt-4 border-t border-slate-100">
            
            {/* Filtro Marca */}
            <div>
              <label className="block text-[11px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">
                Marca destacada
              </label>
              <select
                value={selectedBrand}
                onChange={(e) => {
                  setSelectedBrand(e.target.value);
                  setLiveAmazonProducts([]);
                }}
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 bg-slate-50 text-slate-800 text-xs font-semibold focus:border-amber-500 focus:bg-white outline-none cursor-pointer"
              >
                {MOTORISTA_BRANDS.map((brand) => (
                  <option key={brand} value={brand}>{brand}</option>
                ))}
              </select>
            </div>

            {/* Filtro Presupuesto */}
            <div>
              <label className="block text-[11px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">
                Rango de precio
              </label>
              <select
                value={selectedPrice}
                onChange={(e) => {
                  setSelectedPrice(e.target.value);
                  setLiveAmazonProducts([]);
                }}
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 bg-slate-50 text-slate-800 text-xs font-semibold focus:border-amber-500 focus:bg-white outline-none cursor-pointer"
              >
                {MOTORISTA_PRICE_RANGES.map((pr) => (
                  <option key={pr.id} value={pr.id}>{pr.label}</option>
                ))}
              </select>
            </div>

            {/* Subfiltro específico de estilo en cascos o chaquetas */}
            <div>
              <label className="block text-[11px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">
                Tipo / Estilo
              </label>
              <select
                value={selectedStyle}
                onChange={(e) => {
                  setSelectedStyle(e.target.value);
                  setLiveAmazonProducts([]);
                }}
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 bg-slate-50 text-slate-800 text-xs font-semibold focus:border-amber-500 focus:bg-white outline-none cursor-pointer"
              >
                <option value="all">Todos los estilos</option>
                {selectedCategory === 'cascos' && (
                  <>
                    <option value="integral">Integrales (Máxima seguridad)</option>
                    <option value="modular">Modulares (Abatibles)</option>
                  </>
                )}
                {selectedCategory === 'chaquetas' && (
                  <>
                    <option value="cordura">Cordura 4 Estaciones</option>
                    <option value="verano">Verano / Perforadas</option>
                  </>
                )}
                {selectedCategory === 'guantes' && (
                  <>
                    <option value="verano">Verano / Ventilados</option>
                    <option value="invierno">Invierno / Térmicos Gore-Tex</option>
                  </>
                )}
              </select>
            </div>

            {/* Ordenar productos */}
            <div>
              <label className="block text-[11px] font-bold text-slate-500 uppercase tracking-wider mb-1.5 flex items-center gap-1.5">
                <ArrowUpDown className="w-3.5 h-3.5 text-amber-600" />
                <span>Ordenar productos</span>
              </label>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as any)}
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 bg-slate-50 text-slate-800 text-xs font-semibold focus:border-amber-500 focus:bg-white outline-none cursor-pointer"
              >
                <option value="featured">⭐ Recomendados</option>
                <option value="price-asc">📉 Más baratos a más caros</option>
                <option value="price-desc">📈 Más caros a más baratos</option>
                <option value="rating">🏆 Mejor valorados</option>
              </select>
            </div>

          </div>

          {/* Reset button if any filter is active */}
          {(selectedCategory !== 'all' || selectedBrand !== 'Todas las marcas' || selectedPrice !== 'all' || selectedStyle !== 'all' || sortBy !== 'featured') && (
            <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between">
              <span className="text-xs text-slate-500">
                Filtros activos aplicados a motoristas {sortBy !== 'featured' && `• Orden: ${sortBy === 'price-asc' ? 'Menor a mayor precio' : sortBy === 'price-desc' ? 'Mayor a menor precio' : 'Mejor valorados'}`}
              </span>
              <button
                onClick={handleResetFilters}
                className="text-xs font-bold text-amber-700 hover:text-amber-900 underline cursor-pointer"
              >
                Limpiar todos los filtros
              </button>
            </div>
          )}

        </div>

        {/* PRODUCTS GRID */}
        {sortedDisplayProducts.length > 0 ? (
          <>
            {/* TOP 3 PODIUM */}
            <TopPodium
              products={sortedDisplayProducts}
              filterLabel={
                selectedCategory !== 'all'
                  ? (MOTORISTA_CATEGORIES.find(c => c.id === selectedCategory)?.label || selectedCategory)
                  : 'Motoristas'
              }
            />

            <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 mb-12">
              {sortedDisplayProducts.map((product) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  currentTheme="classic"
                />
              ))}

              {/* LIVE AMAZON PRODUCTS */}
              {sortedLiveAmazonProducts.map((liveProd) => (
                <LiveAmazonProductCard
                  key={liveProd.asin}
                  product={liveProd}
                  categoryLabel="Motoristas Amazon"
                  badgeLabel="Oferta Motorista"
                />
              ))}

              {/* DISCOVERY CARD */}
              <AmazonGridDiscoveryCard
                searchQuery={liveSearchQuery}
                selectedCategory="Mundo Motorista"
                onLoadLiveToGrid={handleLoadLiveToGrid}
                isLoadingLive={isLoadingLive}
                hasLoadedLive={liveAmazonProducts.length > 0}
              />
            </section>

            {/* Quick button to load more live motorista deals */}
            <div className="mb-12 flex justify-center">
              <button
                onClick={handleLoadLiveToGrid}
                disabled={isLoadingLive}
                className="px-6 py-3.5 rounded-2xl bg-amber-50 hover:bg-amber-100 border border-amber-300 text-amber-950 font-bold text-sm shadow-xs hover:shadow-md transition-all flex items-center gap-2 cursor-pointer disabled:opacity-70"
              >
                {isLoadingLive ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin text-amber-700" />
                    <span>Buscando ofertas de motoristas en Amazon...</span>
                  </>
                ) : (
                  <>
                    <ShoppingBag className="w-4 h-4 text-amber-600" />
                    <span>Cargar más ofertas en directo de Amazon para motoristas</span>
                  </>
                )}
              </button>
            </div>
          </>
        ) : liveAmazonProducts.length > 0 ? (
          <div className="mb-16">
            <div className="mb-6 p-4 sm:p-5 bg-gradient-to-r from-amber-50 to-orange-50 border border-amber-200 rounded-3xl flex flex-wrap items-center justify-between gap-3 shadow-xs">
              <div className="flex items-center gap-3 text-amber-950 font-bold text-sm">
                <span className="p-2 bg-amber-400/20 text-amber-700 rounded-xl">
                  <ShoppingBag className="w-5 h-5" />
                </span>
                <div>
                  <p className="font-extrabold text-slate-900">
                    Mostrando productos en directo de Amazon España para motoristas:
                  </p>
                  <p className="text-xs text-slate-600 font-normal">
                    Precios, fotos y disponibilidad al día obtenidos en tiempo real de Amazon.es
                  </p>
                </div>
              </div>
              <button
                onClick={handleResetFilters}
                className="text-xs bg-white text-slate-800 px-4 py-2 rounded-xl border border-amber-200 font-bold hover:bg-amber-100 transition-all shadow-xs cursor-pointer"
              >
                Restablecer filtros
              </button>
            </div>

            <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 mb-12">
              {sortedLiveAmazonProducts.map((liveProd) => (
                <LiveAmazonProductCard
                  key={liveProd.asin}
                  product={liveProd}
                  categoryLabel="Motoristas Amazon"
                  badgeLabel="Oferta Motorista"
                />
              ))}

              <AmazonGridDiscoveryCard
                searchQuery={liveSearchQuery}
                selectedCategory="Mundo Motorista"
                onLoadLiveToGrid={handleLoadLiveToGrid}
                isLoadingLive={isLoadingLive}
                hasLoadedLive={true}
              />
            </section>

            <div className="mb-12 flex justify-center">
              <button
                onClick={handleLoadLiveToGrid}
                disabled={isLoadingLive}
                className="px-6 py-3.5 rounded-2xl bg-amber-50 hover:bg-amber-100 border border-amber-300 text-amber-950 font-bold text-sm shadow-xs hover:shadow-md transition-all flex items-center gap-2 cursor-pointer disabled:opacity-70"
              >
                {isLoadingLive ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin text-amber-700" />
                    <span>Cargando más ofertas de Amazon...</span>
                  </>
                ) : (
                  <>
                    <ShoppingBag className="w-4 h-4 text-amber-600" />
                    <span>Cargar más ofertas en directo (+8 opciones)</span>
                  </>
                )}
              </button>
            </div>
          </div>
        ) : isLoadingLive ? (
          <div className="py-20 mb-16 text-center flex flex-col items-center justify-center gap-3 bg-white/80 rounded-3xl border border-amber-200 shadow-xs">
            <Loader2 className="w-10 h-10 animate-spin text-amber-600" />
            <h3 className="text-lg font-bold text-slate-900">Buscando productos de motoristas en Amazon España...</h3>
            <p className="text-xs text-slate-500 max-w-md">
              Estamos consultando el catálogo en tiempo real con stock oficial y precios actualizados.
            </p>
          </div>
        ) : (
          <div className="py-12 mb-16 text-center bg-white/70 rounded-3xl border border-dashed border-slate-300 p-8">
            <h3 className="text-xl font-bold mb-2 text-slate-900">No encontramos productos locales para este filtro exacto</h3>
            <p className="text-sm text-slate-600 mb-6 max-w-md mx-auto">
              Puedes cargar las ofertas disponibles en Amazon España o restablecer los filtros para explorar otras opciones.
            </p>
            <div className="flex justify-center gap-3">
              <button
                onClick={handleLoadLiveToGrid}
                className="px-6 py-3 rounded-2xl bg-[#FF9900] hover:bg-[#ffad33] text-slate-950 font-black text-sm flex items-center gap-2 shadow-md cursor-pointer transition-transform hover:scale-102"
              >
                <ShoppingBag className="w-4 h-4" />
                <span>Buscar en Amazon en directo</span>
              </button>
              <button
                onClick={handleResetFilters}
                className="px-5 py-3 rounded-2xl bg-slate-200 text-slate-800 font-bold text-sm hover:bg-slate-300 cursor-pointer transition-colors"
              >
                Restablecer filtros
              </button>
            </div>
          </div>
        )}

        {/* PROMINENT LIVE SEARCH CARD */}
        <div className="mb-12">
          <AmazonLiveSearchCard
            currentTheme="classic"
            initialQuery="accesorios motorista regalos"
            selectedPrice={selectedPrice}
          />
        </div>

        {/* SEO BUYING GUIDE FOR MOTORISTAS */}
        <section className="rounded-3xl p-6 sm:p-10 mb-12 border border-slate-200 bg-white text-slate-800 shadow-xs">
          <h2 className="text-2xl sm:text-3xl font-black mb-5 tracking-tight text-slate-900 flex items-center gap-2.5">
            <span>🏍️</span>
            <span>Guía para Acertar con un Regalo para Motoristas (Sin equivocarte de talla)</span>
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-xs sm:text-sm leading-relaxed text-slate-600">
            <div className="space-y-2">
              <h3 className="font-bold text-base text-slate-900 flex items-center gap-2">
                <span>📏</span> ¿Y si no sé su talla de casco o chaqueta?
              </h3>
              <p>
                Si no quieres arriesgarte con tallas de casco o ropa, los regalos estrella universales son los <strong>intercomunicadores Bluetooth (como Cardo o Sena)</strong>, los <strong>antirrobos de disco con alarma acústica de 110 dB</strong> y los <strong>soportes de móvil Quad Lock con amortiguador de vibraciones</strong>. Son 100% universales y cualquier motero los valora enormemente.
              </p>
            </div>

            <div className="space-y-2">
              <h3 className="font-bold text-base text-slate-900 flex items-center gap-2">
                <span>⛑️</span> Casco Modular vs Integral: ¿Cuál elegir?
              </h3>
              <p>
                Si la persona hace principalmente trayectos urbanos, scooter o salidas de turismo relajado, los <strong>cascos modulares abatibles</strong> con doble visor solar son los reyes de la comodidad. Para quienes disfrutan de curvas, motos deportivas o viajes rápidos por autovía, un <strong>casco integral homologado ECE 22.06</strong> ofrece la máxima insonorización y resistencia al impacto.
              </p>
            </div>

            <div className="space-y-2">
              <h3 className="font-bold text-base text-slate-900 flex items-center gap-2">
                <span>🧤</span> Detalles económicos que siempre triunfan (&lt; 30 €)
              </h3>
              <p>
                Con poco presupuesto puedes triunfar con un kit limpiador de viseras Motul con toalla de microfibra, una bolsa de pierna impermeable o un pasamontañas sotocasco térmico de alta transpiración. Son regalos prácticos que demuestran que conoces su afición.
              </p>
            </div>
          </div>
        </section>

      </main>

      <Footer currentTheme="classic" />
    </div>
  );
}
