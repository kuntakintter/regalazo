'use client';

import React, { useState, useMemo } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import ProductCard from '@/components/ProductCard';
import LiveAmazonProductCard from '@/components/LiveAmazonProductCard';
import AmazonLiveSearchCard from '@/components/AmazonLiveSearchCard';
import AmazonGridDiscoveryCard from '@/components/AmazonGridDiscoveryCard';
import ThemeAtmosphere from '@/components/ThemeAtmosphere';
import TopPodium from '@/components/TopPodium';
import {
  NAVIDAD_PRODUCTS,
  NAVIDAD_CATEGORIES,
  NAVIDAD_PRICE_RANGES,
} from '@/data/navidadData';
import { Product } from '@/data/products';
import { LiveSearchResult } from '@/app/api/live-search/route';
import {
  ShieldCheck,
  TrendingUp,
  BadgePercent,
  Loader2,
  Filter,
  ChevronRight,
  Flame,
  ArrowUpDown,
  Gift,
  TreePine
} from 'lucide-react';
import { parsePrice } from '@/lib/amazon';
import Link from 'next/link';

export default function NavidadPage() {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedPrice, setSelectedPrice] = useState<string>('all');
  const [sortBy, setSortBy] = useState<'featured' | 'price-asc' | 'price-desc' | 'rating'>('featured');
  const [liveAmazonProducts, setLiveAmazonProducts] = useState<LiveSearchResult[]>([]);
  const [isLoadingLive, setIsLoadingLive] = useState(false);

  // Filter local curated products
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

  // Convert to generic Product interface
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

  // Build live Amazon query for Navidad
  const liveSearchQuery = useMemo(() => {
    const parts: string[] = [];

    if (selectedCategory === 'amigo-invisible') parts.push('regalos amigo invisible divertidos originales menos 15 euros');
    else if (selectedCategory === 'adviento') parts.push('calendario de adviento chocolate juguetes lego belleza');
    else if (selectedCategory === 'jerseis-luces') parts.push('jersey navideno luces led divertido ugly sweater familia');
    else if (selectedCategory === 'decoracion') parts.push('luces navidad cortina led exterior arbol decoracion');
    else if (selectedCategory === 'gourmet') parts.push('cesta navidad bombones lindt chocolate dulces regalos');
    else parts.push('mejores regalos navidad reyes magos papa noel ideas');

    return parts.join(' ');
  }, [selectedCategory]);

  // Auto-fetch live products
  React.useEffect(() => {
    const hasFilter = selectedCategory !== 'all' || selectedPrice !== 'all';

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
  }, [selectedCategory, selectedPrice, liveSearchQuery]);

  return (
    <div className="min-h-screen relative flex flex-col bg-slate-50 text-slate-900 selection:bg-rose-600 selection:text-white">
      {/* Background Ambience */}
      <ThemeAtmosphere />

      {/* Global Header */}
      <Header />

      {/* Breadcrumb Navigation */}
      <nav aria-label="Breadcrumb" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-4 pb-2 w-full flex items-center gap-2 text-xs text-slate-500">
        <Link href="/" className="hover:text-rose-600 transition-colors">Inicio</Link>
        <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
        <span className="font-bold text-rose-700">Especial Navidad & Reyes 2026</span>
      </nav>

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 w-full z-10">
        
        {/* HERO SECTION */}
        <section className="text-center py-6 sm:py-10 max-w-4xl mx-auto">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-bold mb-4 shadow-xs border border-rose-200 bg-rose-50 text-rose-900">
            <span className="flex h-2 w-2 rounded-full bg-emerald-500 animate-pulse"></span>
            <span>Campaña Oficial de Navidad & Reyes Magos 2026 • Regalos para Acertar al 100%</span>
          </div>

          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black tracking-tight leading-[1.15] mb-5 text-slate-900">
            Especial Navidad & Reyes:{' '}
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-rose-600 via-amber-600 to-emerald-600">
              Ideas, Amigo Invisible & Adviento
            </span>
          </h1>

          <p className="text-sm sm:text-base lg:text-lg text-slate-600 leading-relaxed mb-6 max-w-2xl mx-auto">
            La guía definitiva para no complicarte: desde detalles divertidos para el Amigo Invisible por menos de 15 € hasta calendarios de adviento, jerséis navideños con luces LED y bombones gourmet de lujo.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-6 text-xs font-medium text-slate-500 mb-8">
            <span className="flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-emerald-600" />
              Garantía de Devolución Extendida hasta Enero
            </span>
            <span className="flex items-center gap-1.5">
              <Gift className="w-4 h-4 text-rose-600" />
              Empaquetado para Regalo Disponible
            </span>
            <span className="flex items-center gap-1.5">
              <BadgePercent className="w-4 h-4 text-amber-500" />
              Envíos Rápidos Prime 24h
            </span>
          </div>
        </section>

        {/* TOP PODIUM (BEST-SELLERS NAVIDAD) */}
        {sortedDisplayProducts.length >= 3 && (
          <div className="bg-gradient-to-b from-rose-50/70 to-emerald-50/30 rounded-3xl p-4 sm:p-6 mb-8 border border-rose-200 shadow-sm">
            <TopPodium
              products={sortedDisplayProducts}
              filterLabel="Especial Navidad & Reyes"
            />
          </div>
        )}

        {/* FILTER BAR */}
        <div className="bg-white rounded-3xl border border-slate-200 p-5 sm:p-6 mb-8 shadow-xs">
          <div className="mb-5">
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-bold uppercase tracking-wider text-rose-700 flex items-center gap-1.5">
                <Filter className="w-3.5 h-3.5 text-rose-600" />
                <span>¿Para qué ocasión navideña buscas el regalo?</span>
              </span>
              <span className="text-xs font-semibold text-slate-400">
                {displayProducts.length + liveAmazonProducts.length} ideas
              </span>
            </div>

            <div className="flex flex-wrap items-center gap-2">
              {NAVIDAD_CATEGORIES.map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => {
                    setSelectedCategory(cat.id);
                    setLiveAmazonProducts([]);
                  }}
                  className={`px-3.5 py-2 sm:px-4 sm:py-2.5 rounded-2xl text-xs sm:text-sm font-bold transition-all flex items-center gap-2 cursor-pointer border ${
                    selectedCategory === cat.id
                      ? 'bg-rose-600 text-white border-rose-600 shadow-md shadow-rose-600/20 scale-[1.02]'
                      : 'bg-slate-100 text-slate-700 hover:bg-slate-200 border-slate-200'
                  }`}
                >
                  <span>{cat.icon}</span>
                  <span>{cat.label}</span>
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4 border-t border-slate-100">
            <div>
              <label className="block text-[11px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">
                Presupuesto
              </label>
              <select
                value={selectedPrice}
                onChange={(e) => {
                  setSelectedPrice(e.target.value);
                  setLiveAmazonProducts([]);
                }}
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 bg-slate-50 text-slate-800 text-xs font-semibold focus:border-rose-500 focus:bg-white outline-none cursor-pointer"
              >
                {NAVIDAD_PRICE_RANGES.map((pr) => (
                  <option key={pr.id} value={pr.id}>{pr.label}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-[11px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">
                Ordenar por
              </label>
              <div className="relative">
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value as any)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 bg-slate-50 text-slate-800 text-xs font-semibold focus:border-rose-500 focus:bg-white outline-none cursor-pointer appearance-none"
                >
                  <option value="featured">✨ Más recomendados y vendidos</option>
                  <option value="price-asc">💶 Precio: de menor a mayor</option>
                  <option value="price-desc">💎 Precio: de mayor a menor</option>
                  <option value="rating">⭐ Mejor valoración</option>
                </select>
                <ArrowUpDown className="w-3.5 h-3.5 text-slate-400 absolute right-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
              </div>
            </div>
          </div>
        </div>

        {/* PRODUCTS GRID */}
        {sortedDisplayProducts.length > 0 || sortedLiveAmazonProducts.length > 0 ? (
          <div>
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl sm:text-2xl font-black text-slate-900 flex items-center gap-2">
                <span>🎄 Catálogo Oficial Navidad & Reyes 2026</span>
                <span className="text-xs font-bold text-rose-700 bg-rose-100 px-2.5 py-0.5 rounded-full border border-rose-200">
                  {sortedDisplayProducts.length + sortedLiveAmazonProducts.length} regalos
                </span>
              </h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {/* Curated Products */}
              {sortedDisplayProducts.map((product) => (
                <ProductCard key={product.id} product={product} currentTheme="classic" />
              ))}

              {/* Dynamic Amazon Grid Card */}
              {selectedCategory !== 'all' && (
                <AmazonGridDiscoveryCard
                  searchQuery={liveSearchQuery}
                  selectedCategory={NAVIDAD_CATEGORIES.find(c => c.id === selectedCategory)?.label || 'Navidad'}
                />
              )}

              {/* Live Amazon Search Products */}
              {sortedLiveAmazonProducts.map((liveProd) => (
                <LiveAmazonProductCard key={`live-nav-${liveProd.asin}`} product={liveProd} />
              ))}
            </div>

            {/* Amazon Live Search Bottom Banner */}
            <div className="mt-12">
              <AmazonLiveSearchCard
                currentTheme="classic"
                initialQuery={liveSearchQuery}
              />
            </div>
          </div>
        ) : (
          <div className="text-center py-16 bg-white rounded-3xl border border-slate-200 p-8">
            <TreePine className="w-12 h-12 text-rose-500 mx-auto mb-3" />
            <h3 className="text-lg font-bold text-slate-900 mb-1">No se encontraron productos con estos filtros</h3>
            <p className="text-xs text-slate-500 mb-4">Prueba a seleccionar otra categoría o cambiar el presupuesto.</p>
            <button
              onClick={() => {
                setSelectedCategory('all');
                setSelectedPrice('all');
              }}
              className="px-4 py-2 bg-rose-600 text-white rounded-xl text-xs font-bold hover:bg-rose-700 transition-colors"
            >
              Restablecer filtros
            </button>
          </div>
        )}

      </main>

      {/* Global Footer */}
      <Footer currentTheme="classic" />
    </div>
  );
}
