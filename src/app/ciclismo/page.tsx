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
  CICLISMO_PRODUCTS,
  CICLISMO_CATEGORIES,
  CICLISMO_BRANDS,
  CICLISMO_PRICE_RANGES,
} from '@/data/ciclismoData';
import { Product } from '@/data/products';
import { LiveSearchResult } from '@/app/api/live-search/route';
import {
  ShieldCheck,
  TrendingUp,
  BadgePercent,
  ShoppingBag,
  Loader2,
  Filter,
  ChevronRight,
  Bike,
  ArrowUpDown
} from 'lucide-react';
import { parsePrice } from '@/lib/amazon';
import Link from 'next/link';

export default function CiclismoPage() {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedBrand, setSelectedBrand] = useState<string>('Todas las marcas');
  const [selectedPrice, setSelectedPrice] = useState<string>('all');
  const [sortBy, setSortBy] = useState<'featured' | 'price-asc' | 'price-desc' | 'rating'>('featured');
  const [liveAmazonProducts, setLiveAmazonProducts] = useState<LiveSearchResult[]>([]);
  const [isLoadingLive, setIsLoadingLive] = useState(false);

  // Filter local curated products
  const filteredProducts = useMemo(() => {
    return CICLISMO_PRODUCTS.filter((prod) => {
      if (selectedCategory !== 'all' && prod.category !== selectedCategory) return false;
      if (selectedBrand !== 'Todas las marcas' && prod.brand !== selectedBrand) return false;
      if (selectedPrice !== 'all') {
        if (selectedPrice === '<30' && prod.priceNumeric >= 30) return false;
        if (selectedPrice === '30-80' && (prod.priceNumeric < 30 || prod.priceNumeric > 80)) return false;
        if (selectedPrice === '80-180' && (prod.priceNumeric < 80 || prod.priceNumeric > 180)) return false;
        if (selectedPrice === '>180' && prod.priceNumeric < 180) return false;
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
        category: 'Ciclismo',
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

    if (selectedCategory === 'gps') parts.push('ciclocomputador garmin edge gps bicicleta');
    else if (selectedCategory === 'luces') parts.push('luz trasera radar garmin varia bicicleta');
    else if (selectedCategory === 'cascos') parts.push('casco bicicleta mips carretera mtb');
    else if (selectedCategory === 'herramientas') parts.push('multiherramienta topeak bicicleta bomba co2');
    else if (selectedCategory === 'bolsas') parts.push('bolsa cuadro bicicleta impermeable rockbros');
    else if (selectedCategory === 'mantenimiento') parts.push('cera lubricante cadena bicicleta squirt');
    else parts.push('regalos originales ciclistas carretera mtb');

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
      console.error('Error fetching live Amazon ciclismo products:', err);
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
    <div className="min-h-screen relative flex flex-col bg-slate-50 text-slate-900 selection:bg-amber-500 selection:text-slate-950">
      <ThemeAtmosphere />
      <Header currentTheme="classic" />

      {/* Breadcrumb */}
      <nav aria-label="Breadcrumb" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-4 w-full text-xs text-slate-500 flex items-center gap-1.5">
        <Link href="/" className="hover:text-indigo-600 font-medium">Inicio</Link>
        <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
        <span className="font-bold text-slate-800">Especial Ciclismo & MTB</span>
      </nav>

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 w-full z-10">
        
        {/* HERO SECTION */}
        <section className="text-center py-6 sm:py-10 max-w-4xl mx-auto">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-bold mb-4 shadow-xs border border-emerald-200 bg-emerald-50 text-emerald-900">
            <span className="flex h-2 w-2 rounded-full bg-emerald-500 animate-pulse"></span>
            <span>Edición Especial Ciclismo {new Date().getFullYear()} • Carretera, Gravel y Montaña</span>
          </div>

          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black tracking-tight leading-[1.15] mb-5 text-slate-900">
            Mejores Regalos para Ciclistas:{' '}
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-emerald-600 via-teal-600 to-cyan-500">
              GPS, Luces Radar y Taller
            </span>
          </h1>

          <p className="text-sm sm:text-base lg:text-lg text-slate-600 leading-relaxed mb-6 max-w-2xl mx-auto">
            Selección contrastada de regalos para ciclistas: radares Garmin Varia que avisan de coches por detrás, ciclocomputadores con mapas de ruta, multiherramientas profesionales y lubricantes de cera pura.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-6 text-xs font-medium text-slate-500 mb-8">
            <span className="flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-emerald-500" />
              Garantía Oficial Amazon España
            </span>
            <span className="flex items-center gap-1.5">
              <TrendingUp className="w-4 h-4 text-emerald-600" />
              Primeras Marcas: Garmin, Topeak, Rockbros
            </span>
            <span className="flex items-center gap-1.5">
              <BadgePercent className="w-4 h-4 text-amber-500" />
              Envíos Prime 24 Horas
            </span>
          </div>
        </section>

        {/* FILTER BAR */}
        <div className="bg-white rounded-3xl border border-slate-200 p-5 sm:p-6 mb-8 shadow-xs">
          <div className="mb-5">
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-500 flex items-center gap-1.5">
                <Filter className="w-3.5 h-3.5 text-emerald-600" />
                <span>¿Qué tipo de accesorio ciclista buscas?</span>
              </span>
              <span className="text-xs font-semibold text-slate-400">
                {displayProducts.length + liveAmazonProducts.length} ideas
              </span>
            </div>

            <div className="flex flex-wrap items-center gap-2">
              {CICLISMO_CATEGORIES.map((cat) => (
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
                Marca destacada
              </label>
              <select
                value={selectedBrand}
                onChange={(e) => {
                  setSelectedBrand(e.target.value);
                  setLiveAmazonProducts([]);
                }}
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 bg-slate-50 text-slate-800 text-xs font-semibold focus:border-emerald-500 focus:bg-white outline-none cursor-pointer"
              >
                {CICLISMO_BRANDS.map((brand) => (
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
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 bg-slate-50 text-slate-800 text-xs font-semibold focus:border-emerald-500 focus:bg-white outline-none cursor-pointer"
              >
                {CICLISMO_PRICE_RANGES.map((pr) => (
                  <option key={pr.id} value={pr.id}>{pr.label}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-[11px] font-bold text-slate-500 uppercase tracking-wider mb-1.5 flex items-center gap-1.5">
                <ArrowUpDown className="w-3.5 h-3.5 text-emerald-600" />
                <span>Ordenar productos</span>
              </label>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as any)}
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 bg-slate-50 text-slate-800 text-xs font-semibold focus:border-emerald-500 focus:bg-white outline-none cursor-pointer"
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
                Filtros activos en ciclismo {sortBy !== 'featured' && `• Orden: ${sortBy === 'price-asc' ? 'Menor a mayor precio' : sortBy === 'price-desc' ? 'Mayor a menor precio' : 'Mejor valorados'}`}
              </span>
              <button
                onClick={handleResetFilters}
                className="text-xs font-bold text-emerald-700 hover:text-emerald-900 underline cursor-pointer"
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
                  categoryLabel="Ciclismo Amazon"
                  badgeLabel="Top Ventas Bici"
                />
              ))}

              <AmazonGridDiscoveryCard
                searchQuery={liveSearchQuery}
                selectedCategory="Mundo Ciclismo"
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
                    <ShoppingBag className="w-4 h-4 text-slate-950" />
                    <span>Ver más productos de ciclismo en directo (+8 opciones)</span>
                  </>
                )}
              </button>
            </div>
          </>
        ) : sortedLiveAmazonProducts.length > 0 ? (
          <div className="mb-16">
            <div className="mb-6 p-4 sm:p-5 bg-gradient-to-r from-emerald-50 via-teal-50 to-amber-50 border border-emerald-200 rounded-3xl flex flex-wrap items-center justify-between gap-3 shadow-xs">
              <div className="flex items-center gap-3 text-emerald-950 font-bold text-sm">
                <span className="p-2 bg-emerald-500/20 text-emerald-700 rounded-xl">
                  <ShoppingBag className="w-5 h-5" />
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
                className="text-xs bg-white text-emerald-900 px-4 py-2 rounded-xl border border-emerald-200 font-bold hover:bg-emerald-100 transition-all shadow-xs cursor-pointer"
              >
                Restablecer filtros
              </button>
            </div>

            <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 mb-12">
              {sortedLiveAmazonProducts.map((liveProd) => (
                <LiveAmazonProductCard
                  key={liveProd.asin}
                  product={liveProd}
                  categoryLabel="Ciclismo Amazon"
                  badgeLabel="Top Ventas Bici"
                />
              ))}

              <AmazonGridDiscoveryCard
                searchQuery={liveSearchQuery}
                selectedCategory="Mundo Ciclismo"
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
                    <ShoppingBag className="w-4 h-4 text-slate-950" />
                    <span>Cargar más productos en directo (+8 opciones)</span>
                  </>
                )}
              </button>
            </div>
          </div>
        ) : isLoadingLive ? (
          <div className="py-20 mb-16 text-center flex flex-col items-center justify-center gap-3 bg-white/80 rounded-3xl border border-emerald-100 shadow-xs">
            <Loader2 className="w-10 h-10 animate-spin text-emerald-600" />
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

        <div className="mb-12">
          <AmazonLiveSearchCard
            currentTheme="classic"
            initialQuery="accesorios ciclismo mtb carretera"
            selectedPrice={selectedPrice}
          />
        </div>

        {/* SEO BUYING GUIDE */}
        <section className="rounded-3xl p-6 sm:p-10 mb-12 border border-slate-200 bg-white text-slate-800 shadow-xs">
          <h2 className="text-2xl sm:text-3xl font-black mb-5 tracking-tight text-slate-900 flex items-center gap-2.5">
            <Bike className="w-7 h-7 text-emerald-600" />
            <span>Guía para Elegir el Regalo Perfecto para Ciclistas</span>
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-xs sm:text-sm leading-relaxed text-slate-600">
            <div className="space-y-2">
              <h3 className="font-bold text-base text-slate-900">
                🚨 El invento del siglo: Garmin Varia Radar
              </h3>
              <p>
                Cualquier ciclista de carretera o gravel te dirá que el <strong>Garmin Varia</strong> es el dispositivo que más tranquilidad aporta. Su radar detecta coches hasta a 140 metros por detrás y emite avisos visuales en el GPS antes de que los escuches por el ruido del viento.
              </p>
            </div>

            <div className="space-y-2">
              <h3 className="font-bold text-base text-slate-900">
                🔧 Multiherramientas con tronchacadenas
              </h3>
              <p>
                Romper la cadena o sufrir un desajuste a 30 kilómetros de casa arruina una salida. Modelos de referencia como la <strong>Topeak Hexus</strong> pesan menos de 170 gramos e incluyen llaves Torx y Allen para solucionar cualquier emergencia en el arcén.
              </p>
            </div>

            <div className="space-y-2">
              <h3 className="font-bold text-base text-slate-900">
                🧼 Adiós a la grasa negra: Cera Squirt Lube
              </h3>
              <p>
                Los aceites tradicionales convierten la transmisión en un imán de polvo y suciedad. La cera líquida <strong>Squirt</strong> seca formando una película antiadherente que mantiene los piñones relucientes y alarga el kilometraje de la cadena al doble.
              </p>
            </div>
          </div>
        </section>

      </main>

      <Footer currentTheme="classic" />
    </div>
  );
}
