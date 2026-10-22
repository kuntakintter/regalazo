'use client';

import React, { useState, useMemo, useCallback } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import ProductCard from '@/components/ProductCard';
import LiveAmazonProductCard from '@/components/LiveAmazonProductCard';
import AmazonLiveSearchCard from '@/components/AmazonLiveSearchCard';
import AmazonGridDiscoveryCard from '@/components/AmazonGridDiscoveryCard';
import ThemeAtmosphere from '@/components/ThemeAtmosphere';
import {
  MASCOTAS_PRODUCTS,
  MASCOTAS_CATEGORIES,
  MASCOTAS_BRANDS,
  MASCOTAS_PRICE_RANGES,
} from '@/data/mascotasData';
import { Product } from '@/data/products';
import { LiveSearchResult } from '@/app/api/live-search/route';
import {
  ShieldCheck,
  TrendingUp,
  BadgePercent,
  Sparkles,
  Loader2,
  Filter,
  ChevronRight,
  PawPrint,
  ArrowUpDown
} from 'lucide-react';
import { parsePrice } from '@/lib/amazon';
import Link from 'next/link';

export default function MascotasPage() {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedBrand, setSelectedBrand] = useState<string>('Todas las marcas');
  const [selectedPrice, setSelectedPrice] = useState<string>('all');
  const [sortBy, setSortBy] = useState<'featured' | 'price-asc' | 'price-desc' | 'rating'>('featured');
  const [liveAmazonProducts, setLiveAmazonProducts] = useState<LiveSearchResult[]>([]);
  const [isLoadingLive, setIsLoadingLive] = useState(false);

  // Filter local curated products
  const filteredProducts = useMemo(() => {
    return MASCOTAS_PRODUCTS.filter((prod) => {
      if (selectedCategory !== 'all' && prod.category !== selectedCategory) return false;
      if (selectedBrand !== 'Todas las marcas' && prod.brand !== selectedBrand) return false;
      if (selectedPrice !== 'all') {
        if (selectedPrice === '<25' && prod.priceNumeric >= 25) return false;
        if (selectedPrice === '25-60' && (prod.priceNumeric < 25 || prod.priceNumeric > 60)) return false;
        if (selectedPrice === '60-120' && (prod.priceNumeric < 60 || prod.priceNumeric > 120)) return false;
        if (selectedPrice === '>120' && prod.priceNumeric < 120) return false;
      }
      return true;
    });
  }, [selectedCategory, selectedBrand, selectedPrice]);

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

  // Build live Amazon query
  const liveSearchQuery = useMemo(() => {
    const parts: string[] = [];
    if (selectedBrand !== 'Todas las marcas') parts.push(selectedBrand);

    if (selectedCategory === 'kong-ansiedad') parts.push('kong perro juguete rellenable comedero antivoracidad plato lento alfombrilla lamido lick mat');
    else if (selectedCategory === 'comederos') parts.push('fuente agua gatos inteligente comedero automatico');
    else if (selectedCategory === 'gps') parts.push('localizador gps perros sumergible collar tractive');
    else if (selectedCategory === 'camas') parts.push('cama ortopedica perros viscoelastica lavable');
    else if (selectedCategory === 'juguetes') parts.push('juguetes interactivos perros puzzle olfato');
    else if (selectedCategory === 'viaje') parts.push('arnes perro antitirones julius k9 transportin');
    else if (selectedCategory === 'gadgets') parts.push('camara mascotas dispensador golosinas furminator');
    else parts.push('regalos originales amantes de los perros y gatos');

    return parts.join(' ');
  }, [selectedCategory, selectedBrand]);

  // Auto-fetch live products
  React.useEffect(() => {
    const hasFilter =
      selectedCategory !== 'all' ||
      selectedBrand !== 'Todas las marcas' ||
      selectedPrice !== 'all';

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
  }, [selectedCategory, selectedBrand, selectedPrice, liveSearchQuery]);

  const handleLoadLiveToGrid = useCallback(async () => {
    if (isLoadingLive) return;
    setIsLoadingLive(true);
    try {
      const res = await fetch(`/api/live-search?q=${encodeURIComponent(liveSearchQuery)}&limit=12`);
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
  }, [isLoadingLive, liveSearchQuery]);

  const handleResetFilters = () => {
    setSelectedCategory('all');
    setSelectedBrand('Todas las marcas');
    setSelectedPrice('all');
    setSortBy('featured');
    setLiveAmazonProducts([]);
  };

  return (
    <div className="min-h-screen relative flex flex-col bg-slate-50 text-slate-900 selection:bg-rose-500 selection:text-white">
      <ThemeAtmosphere />
      <Header currentTheme="classic" />

      {/* Breadcrumb */}
      <nav aria-label="Breadcrumb" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-4 w-full text-xs text-slate-500 flex items-center gap-1.5">
        <Link href="/" className="hover:text-indigo-600 font-medium">Inicio</Link>
        <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
        <span className="font-bold text-slate-800">Especial Amantes de las Mascotas</span>
      </nav>

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 w-full z-10">
        
        {/* HERO SECTION */}
        <section className="text-center py-6 sm:py-10 max-w-4xl mx-auto">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-bold mb-4 shadow-xs border border-rose-200 bg-rose-50 text-rose-900">
            <span className="flex h-2 w-2 rounded-full bg-rose-500 animate-pulse"></span>
            <span>Edición Especial Perros & Gatos {new Date().getFullYear()} • Bienestar y Gadgets Útiles</span>
          </div>

          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black tracking-tight leading-[1.15] mb-5 text-slate-900">
            Mejores Regalos para Mascotas:{' '}
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-rose-600 via-pink-600 to-amber-500">
              Perros, Gatos y sus Dueños
            </span>
          </h1>

          <p className="text-sm sm:text-base lg:text-lg text-slate-600 leading-relaxed mb-6 max-w-2xl mx-auto">
            Detalles que enamoran a cualquier dueño de perro o gato: localizadores GPS en tiempo real para no perderlos nunca, fuentes de agua inteligentes ultrasilenciosas, arneses ergonómicos antitirones y cepillos deslanadores profesionales.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-6 text-xs font-medium text-slate-500 mb-8">
            <span className="flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-emerald-500" />
              Garantía Oficial Amazon España
            </span>
            <span className="flex items-center gap-1.5">
              <TrendingUp className="w-4 h-4 text-rose-600" />
              Marcas Veterinarias: Tractive, Catit, Julius-K9
            </span>
            <span className="flex items-center gap-1.5">
              <BadgePercent className="w-4 h-4 text-amber-500" />
              Envíos Rápidos Prime 24h
            </span>
          </div>
        </section>

        {/* FILTER BAR */}
        <div className="bg-white rounded-3xl border border-slate-200 p-5 sm:p-6 mb-8 shadow-xs">
          <div className="mb-5">
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-500 flex items-center gap-1.5">
                <Filter className="w-3.5 h-3.5 text-rose-600" />
                <span>¿Para qué momento buscas el regalo?</span>
              </span>
              <span className="text-xs font-semibold text-slate-400">
                {displayProducts.length + liveAmazonProducts.length} ideas
              </span>
            </div>

            <div className="flex flex-wrap items-center gap-2">
              {MASCOTAS_CATEGORIES.map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => {
                    setSelectedCategory(cat.id);
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

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4 border-t border-slate-100">
            <div>
              <label className="block text-[11px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">
                Marca de confianza
              </label>
              <select
                value={selectedBrand}
                onChange={(e) => {
                  setSelectedBrand(e.target.value);
                  setLiveAmazonProducts([]);
                }}
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 bg-slate-50 text-slate-800 text-xs font-semibold focus:border-rose-500 focus:bg-white outline-none cursor-pointer"
              >
                {MASCOTAS_BRANDS.map((brand) => (
                  <option key={brand} value={brand}>{brand}</option>
                ))}
              </select>
            </div>

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
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 bg-slate-50 text-slate-800 text-xs font-semibold focus:border-rose-500 focus:bg-white outline-none cursor-pointer"
              >
                {MASCOTAS_PRICE_RANGES.map((pr) => (
                  <option key={pr.id} value={pr.id}>{pr.label}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-[11px] font-bold text-slate-500 uppercase tracking-wider mb-1.5 flex items-center gap-1.5">
                <ArrowUpDown className="w-3.5 h-3.5 text-rose-600" />
                <span>Ordenar productos</span>
              </label>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as any)}
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 bg-slate-50 text-slate-800 text-xs font-semibold focus:border-rose-500 focus:bg-white outline-none cursor-pointer"
              >
                <option value="featured">⭐ Recomendados</option>
                <option value="price-asc">📉 Más baratos a más caros</option>
                <option value="price-desc">📈 Más caros a más baratos</option>
                <option value="rating">🏆 Mejor valorados</option>
              </select>
            </div>
          </div>

          {(selectedCategory !== 'all' || selectedBrand !== 'Todas las marcas' || selectedPrice !== 'all' || sortBy !== 'featured') && (
            <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between">
              <span className="text-xs text-slate-500">
                Filtros activos en mascotas {sortBy !== 'featured' && `• Orden: ${sortBy === 'price-asc' ? 'Menor a mayor precio' : sortBy === 'price-desc' ? 'Mayor a menor precio' : 'Mejor valorados'}`}
              </span>
              <button
                onClick={handleResetFilters}
                className="text-xs font-bold text-rose-700 hover:text-rose-900 underline cursor-pointer"
              >
                Limpiar todos los filtros
              </button>
            </div>
          )}
        </div>

        {/* PRODUCTS GRID */}
        {sortedDisplayProducts.length > 0 ? (
          <>
            <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 mb-12">
              {sortedDisplayProducts.map((product) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  currentTheme="classic"
                />
              ))}

              {sortedLiveAmazonProducts.map((liveProd) => (
                <LiveAmazonProductCard
                  key={liveProd.asin}
                  product={liveProd}
                  categoryLabel="Mascotas Amazon"
                  badgeLabel="Top Ventas Peludos"
                />
              ))}

              <AmazonGridDiscoveryCard
                searchQuery={liveSearchQuery}
                selectedCategory="Mundo Mascotas"
                onLoadLiveToGrid={handleLoadLiveToGrid}
                isLoadingLive={isLoadingLive}
                hasLoadedLive={liveAmazonProducts.length > 0}
              />
            </section>

            <div className="mb-12 flex justify-center">
              <button
                onClick={handleLoadLiveToGrid}
                disabled={isLoadingLive}
                className="px-7 py-4 rounded-2xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-slate-950 font-black text-sm shadow-md hover:shadow-lg hover:shadow-amber-500/20 transition-all flex items-center gap-2.5 cursor-pointer disabled:opacity-75 hover:scale-102"
              >
                {isLoadingLive ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin text-slate-950" />
                    <span>Cargando ofertas de Amazon España...</span>
                  </>
                ) : (
                  <>
                    <Sparkles className="w-4 h-4 text-slate-950" />
                    <span>Ver más productos de mascotas en directo (+8 opciones)</span>
                  </>
                )}
              </button>
            </div>
          </>
        ) : sortedLiveAmazonProducts.length > 0 ? (
          <div className="mb-16">
            <div className="mb-6 p-4 sm:p-5 bg-gradient-to-r from-amber-50 via-rose-50 to-orange-50 border border-amber-200 rounded-3xl flex flex-wrap items-center justify-between gap-3 shadow-xs">
              <div className="flex items-center gap-3 text-amber-950 font-bold text-sm">
                <span className="p-2 bg-amber-500/20 text-amber-700 rounded-xl">
                  <Sparkles className="w-5 h-5" />
                </span>
                <div>
                  <p className="font-extrabold text-slate-900">
                    Mostrando productos en directo de Amazon España para tu selección:
                  </p>
                  <p className="text-xs text-slate-600 font-normal">
                    Precios, disponibilidad y valoraciones actualizadas al segundo desde Amazon.es
                  </p>
                </div>
              </div>
              <button
                onClick={handleResetFilters}
                className="text-xs bg-white text-amber-900 px-4 py-2 rounded-xl border border-amber-200 font-bold hover:bg-amber-100 transition-all shadow-xs cursor-pointer"
              >
                Restablecer filtros
              </button>
            </div>

            <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 mb-12">
              {sortedLiveAmazonProducts.map((liveProd) => (
                <LiveAmazonProductCard
                  key={liveProd.asin}
                  product={liveProd}
                  categoryLabel="Mascotas Amazon"
                  badgeLabel="Top Ventas Peludos"
                />
              ))}

              <AmazonGridDiscoveryCard
                searchQuery={liveSearchQuery}
                selectedCategory="Mundo Mascotas"
                onLoadLiveToGrid={handleLoadLiveToGrid}
                isLoadingLive={isLoadingLive}
                hasLoadedLive={true}
              />
            </section>

            <div className="mb-12 flex justify-center">
              <button
                onClick={handleLoadLiveToGrid}
                disabled={isLoadingLive}
                className="px-7 py-4 rounded-2xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-slate-950 font-black text-sm shadow-md hover:shadow-lg hover:shadow-amber-500/20 transition-all flex items-center gap-2.5 cursor-pointer disabled:opacity-75 hover:scale-102"
              >
                {isLoadingLive ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin text-slate-950" />
                    <span>Cargando más ofertas de Amazon...</span>
                  </>
                ) : (
                  <>
                    <Sparkles className="w-4 h-4 text-slate-950" />
                    <span>Cargar más productos en directo (+8 opciones)</span>
                  </>
                )}
              </button>
            </div>
          </div>
        ) : isLoadingLive ? (
          <div className="py-20 mb-16 text-center flex flex-col items-center justify-center gap-3 bg-white/80 rounded-3xl border border-amber-100 shadow-xs">
            <Loader2 className="w-10 h-10 animate-spin text-amber-600" />
            <h3 className="text-lg font-bold text-slate-900">Buscando productos disponibles en Amazon España...</h3>
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
                <Sparkles className="w-4 h-4" />
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

        <div className="mb-12">
          <AmazonLiveSearchCard
            currentTheme="classic"
            initialQuery="regalos perros gatos mascotas accesorios"
            selectedPrice={selectedPrice}
          />
        </div>

        {/* SEO BUYING GUIDE */}
        <section className="rounded-3xl p-6 sm:p-10 mb-12 border border-slate-200 bg-white text-slate-800 shadow-xs">
          <h2 className="text-2xl sm:text-3xl font-black mb-5 tracking-tight text-slate-900 flex items-center gap-2.5">
            <PawPrint className="w-7 h-7 text-rose-600" />
            <span>Guía de Compra: ¿Cómo acertar con un regalo para amantes de los animales?</span>
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-xs sm:text-sm leading-relaxed text-slate-600">
            <div className="space-y-2">
              <h3 className="font-bold text-base text-slate-900">
                📍 GPS en el collar: Cero angustias en el parque
              </h3>
              <p>
                El miedo número uno de cualquier tutor de perro o gato es que se asuste y se escape. Un rastreador como <strong>Tractive</strong> actualiza la ubicación en vivo cada 3 segundos, tiene valla virtual y es 100% sumergible para perros que se tiran a ríos y charcos.
              </p>
            </div>

            <div className="space-y-2">
              <h3 className="font-bold text-base text-slate-900">
                🥣 Fuentes automáticas: Salud renal felina
              </h3>
              <p>
                Los gatos por naturaleza beben poca agua estancada en cuencos, lo que causa problemas urinarios a partir de cierta edad. Fuentes como la <strong>Catit PIXI</strong> oxigenan el agua en movimiento continuo y la filtran tres veces, animándolos a beber el doble a diario.
              </p>
            </div>

            <div className="space-y-2">
              <h3 className="font-bold text-base text-slate-900">
                🐕 Arneses antitirones que cuidan su espalda
              </h3>
              <p>
                Pasear con collar tradicional puede causar lesiones cervicales si el perro tira. El modelo <strong>Julius-K9 IDC</strong> distribuye la tensión uniformemente en la caja torácica y cuenta con un asa superior de rescate para cruzar pasos de cebra o retenerlo ante otros perros.
              </p>
            </div>
          </div>
        </section>

      </main>

      <Footer currentTheme="classic" />
    </div>
  );
}
