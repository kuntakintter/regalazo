'use client';

import React, { useState, useMemo, useEffect } from 'react';
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
  Gift,
  HelpCircle,
  ShoppingBag,
} from 'lucide-react';
import { parsePrice } from '@/lib/amazon';

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

    if (selectedCategory === 'trenes') parts.push('tren de navidad electrico arbol polar express vias humo sonido');
    else if (selectedCategory === 'decoracion') parts.push('decoracion arbol navidad luces led cortina villa navidena belen adorno');
    else if (selectedCategory === 'amigo-invisible') parts.push('regalos amigo invisible divertidos originales menos 15 euros');
    else if (selectedCategory === 'adviento') parts.push('calendario de adviento chocolate juguetes lego belleza');
    else if (selectedCategory === 'jerseis-luces') parts.push('jersey navideno luces led divertido ugly sweater familia');
    else if (selectedCategory === 'gourmet') parts.push('cesta navidad bombones lindt chocolate dulces regalos');
    else parts.push('mejores regalos navidad reyes magos trenes arbol decoracion ideas');

    return parts.join(' ');
  }, [selectedCategory]);

  // Auto-fetch live products
  useEffect(() => {
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

  // Schema.org Structured Data
  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'CollectionPage',
        '@id': 'https://www.unbuenregalo.es/navidad#webpage',
        url: 'https://www.unbuenregalo.es/navidad',
        name: 'Top Regalos de Navidad y Reyes 2026 | Trenes de Árbol, Decoración y Novedades',
        description:
          'Catálogo oficial de Navidad y Reyes Magos: trenes eléctricos para rodear el árbol, luces y decoración festiva, calendarios de adviento y regalos de amigo invisible en Amazon España.',
        inLanguage: 'es-ES',
      },
      {
        '@type': 'FAQPage',
        mainEntity: [
          {
            '@type': 'Question',
            name: '¿Por qué poner un tren eléctrico debajo del árbol de Navidad?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'El tren navideño que rodea la base del árbol es una de las tradiciones festivas más entrañables. Los modelos modernos incorporan sonido realista de locomotora, faro luminoso y humo frío de vapor de agua 100% seguro para niños y mascotas, creando una atmósfera mágica en el salón.',
            },
          },
          {
            '@type': 'Question',
            name: '¿Cuáles son las mejores tendencias en decoración navideña para 2026?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'Destacan las villas nevadas con luces LED y patinadores en movimiento, cortinas de micro-LED en cascada de tono blanco cálido, faldas de pie de árbol de felpa blanca nieve y árboles artificiales frondosos de aspecto natural.',
            },
          },
          {
            '@type': 'Question',
            name: '¿Qué regalar en el Amigo Invisible por menos de 15 euros?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'Tazas originales y divertidas de cerámica, packs de calcetines temáticos navideños con caja de regalo, jerséis navideños con luces LED y cajas de bombones gourmet suizos son opciones infalibles con entrega rápida Prime.',
            },
          },
        ],
      },
    ],
  };

  return (
    <div className="min-h-screen relative flex flex-col bg-slate-50 text-slate-900 selection:bg-rose-600 selection:text-white">
      {/* Schema.org Injected LD+JSON */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Background Ambience */}
      <ThemeAtmosphere />

      {/* Global Header */}
      <Header />

      {/* Breadcrumb Navigation */}
      <nav aria-label="Breadcrumb" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-4 pb-2 w-full flex items-center gap-2 text-xs text-slate-500">
        <Link href="/" className="hover:text-rose-600 transition-colors">Inicio</Link>
        <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
        <span className="font-bold text-rose-700">Especial Navidad, Reyes & Decoración 2026</span>
      </nav>

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 w-full z-10">
        
        {/* HERO SECTION */}
        <section className="text-center py-6 sm:py-10 max-w-4xl mx-auto">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-bold mb-4 shadow-xs border border-rose-200 bg-rose-50 text-rose-900">
            <span className="flex h-2 w-2 rounded-full bg-emerald-500 animate-pulse"></span>
            <span>Campaña Oficial de Navidad & Reyes Magos 2026 • Trenes, Decoración & Regalos</span>
          </div>

          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black tracking-tight leading-[1.15] mb-5 text-slate-900">
            Especial Navidad & Reyes:{' '}
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-rose-600 via-amber-600 to-emerald-600">
              Trenes de Árbol, Decoración & Regalos
            </span>
          </h1>

          <p className="text-sm sm:text-base lg:text-lg text-slate-600 leading-relaxed mb-6 max-w-2xl mx-auto">
            La guía definitiva para llenar tu hogar de ilusión: trenes eléctricos para la base del árbol con humo frío y sonido, pueblos nevados con luz y movimiento, calendarios de adviento, regalos para el Amigo Invisible y cestas gourmet.
          </p>

          {/* CONTADOR EN VIVO HASTA NAVIDAD */}
          <div className="mb-8 flex justify-center">
            <div className="bg-gradient-to-r from-[#8a1420] via-[#5c0f18] to-[#0c2217] p-3 sm:p-4 rounded-3xl border-2 border-amber-400/90 shadow-xl">
              <ChristmasCountdown />
            </div>
          </div>

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
          
          {/* Categorías */}
          <div className="mb-5">
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-500 flex items-center gap-1.5">
                <Filter className="w-3.5 h-3.5 text-rose-600" />
                <span>¿Qué buscas para esta Navidad?</span>
              </span>
              <span className="text-xs font-semibold text-slate-400">
                {displayProducts.length + liveAmazonProducts.length} ideas disponibles
              </span>
            </div>

            <div className="flex flex-wrap items-center gap-2">
              {NAVIDAD_CATEGORIES.map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => setSelectedCategory(cat.id)}
                  className={`px-3.5 py-2 rounded-2xl text-xs font-bold transition-all flex items-center gap-2 cursor-pointer ${
                    selectedCategory === cat.id
                      ? 'bg-rose-600 text-white shadow-md shadow-rose-200 scale-102 ring-2 ring-rose-300'
                      : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
                  }`}
                >
                  <span>{cat.icon}</span>
                  <span>{cat.label}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Rango de Precios */}
          <div className="pt-4 border-t border-slate-100 flex flex-wrap items-center justify-between gap-4">
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-xs font-bold text-slate-500 mr-1">Presupuesto:</span>
              {NAVIDAD_PRICE_RANGES.map((range) => (
                <button
                  key={range.id}
                  onClick={() => setSelectedPrice(range.id)}
                  className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                    selectedPrice === range.id
                      ? 'bg-amber-500 text-slate-950 font-bold shadow-xs'
                      : 'bg-slate-100 hover:bg-slate-200 text-slate-600'
                  }`}
                >
                  {range.label}
                </button>
              ))}
            </div>

            {/* Ordenación */}
            <div className="flex items-center gap-2">
              <span className="text-xs text-slate-500">Ordenar por:</span>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as any)}
                className="text-xs font-semibold bg-slate-100 border-none rounded-xl px-3 py-1.5 text-slate-700 cursor-pointer focus:ring-2 focus:ring-rose-500"
              >
                <option value="featured">Destacados</option>
                <option value="price-asc">Precio: de menor a mayor</option>
                <option value="price-desc">Precio: de mayor a menor</option>
                <option value="rating">Mejor valorados</option>
              </select>
            </div>
          </div>
        </div>

        {/* PRODUCT GRID */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-12">
          {sortedDisplayProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}

          {/* LIVE AMAZON PRODUCTS */}
          {sortedLiveAmazonProducts.map((liveProd) => (
            <LiveAmazonProductCard
              key={liveProd.asin}
              product={liveProd}
              categoryLabel="Navidad Amazon"
              badgeLabel="Top Ventas Navidad"
            />
          ))}

          {/* LIVE DISCOVERY CARDS */}
          {selectedCategory !== 'all' && (
            <>
              <AmazonGridDiscoveryCard
                searchQuery={liveSearchQuery}
                selectedCategory={
                  NAVIDAD_CATEGORIES.find((c) => c.id === selectedCategory)?.label || 'Navidad'
                }
              />
              <AmazonLiveSearchCard
                currentTheme="classic"
                initialQuery={liveSearchQuery}
              />
            </>
          )}
        </div>

        {/* LOADING SPINNER FOR LIVE RESULTS */}
        {isLoadingLive && (
          <div className="flex items-center justify-center gap-2 py-8 text-xs text-slate-500">
            <Loader2 className="w-4 h-4 animate-spin text-rose-600" />
            <span>Consultando novedades navideñas en Amazon España en tiempo real...</span>
          </div>
        )}

        {/* SEO FAQ SECTION */}
        <section className="mt-16 pt-12 border-t border-slate-200">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-10">
              <span className="text-xs font-bold uppercase tracking-wider text-rose-600 block mb-2">
                Guía de Navidad 2026
              </span>
              <h2 className="text-2xl sm:text-3xl font-black text-slate-900 mb-3">
                Preguntas Frecuentes sobre Trenes de Árbol, Decoración y Regalos
              </h2>
              <p className="text-sm text-slate-600">
                Resolvemos las dudas habituales para decorar tu casa y acertar con los regalos en Nochebuena y Reyes.
              </p>
            </div>

            <div className="space-y-4">
              <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-xs">
                <h3 className="text-sm sm:text-base font-bold text-slate-900 flex items-center gap-2 mb-2">
                  <HelpCircle className="w-4 h-4 text-rose-600 shrink-0" />
                  <span>¿Por qué poner un tren eléctrico debajo del árbol de Navidad?</span>
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed pl-6">
                  El tren de Navidad es un clásico que llena de vida el salón. Los modelos actuales incluyen vías adaptables (redondas u ovaladas), faros LED luminosos, melodías festivas y <strong>vapor de agua frío seguro</strong> que emula el humo de una locomotora real sin riesgos para niños ni mascotas.
                </p>
              </div>

              <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-xs">
                <h3 className="text-sm sm:text-base font-bold text-slate-900 flex items-center gap-2 mb-2">
                  <HelpCircle className="w-4 h-4 text-rose-600 shrink-0" />
                  <span>¿Cuáles son las mejores opciones de decoración para el árbol en 2026?</span>
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed pl-6">
                  Las faldas cubrepíe de felpa blanca nieve aportan calidez y ocultan la base metálica del abeto. Junto a las cortinas de luces LED en cascada, las villas navideñas con movimiento y las bolas irrompibles doradas y rojas, consigues una decoración digna de revista.
                </p>
              </div>

              <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-xs">
                <h3 className="text-sm sm:text-base font-bold text-slate-900 flex items-center gap-2 mb-2">
                  <HelpCircle className="w-4 h-4 text-rose-600 shrink-0" />
                  <span>¿Qué regalar en el Amigo Invisible por menos de 15 euros?</span>
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed pl-6">
                  En nuestra categoría de Amigo Invisible tienes tazas cómicas de cerámica, calcetines festivos de algodón peinado en estuche de regalo, bombones de chocolate suizo Lindt y jerséis navideños con luces LED para triunfar sin salirte del presupuesto.
                </p>
              </div>
            </div>
          </div>
        </section>

      </main>

      {/* Global Footer */}
      <Footer currentTheme="classic" />
    </div>
  );
}
