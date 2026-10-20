'use client';

import React, { useState, useMemo, useEffect, useCallback } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import FilterBar from '@/components/FilterBar';
import ProductCard from '@/components/ProductCard';
import LiveAmazonProductCard from '@/components/LiveAmazonProductCard';
import GiftWizard from '@/components/GiftWizard';
import SeoFaq from '@/components/SeoFaq';
import ThemeAtmosphere from '@/components/ThemeAtmosphere';
import AmazonLiveSearchCard from '@/components/AmazonLiveSearchCard';
import AmazonGridDiscoveryCard from '@/components/AmazonGridDiscoveryCard';
import { PRODUCTS, AGE_CATEGORIES, GENERAL_CATEGORY_MAPPING, Product } from '@/data/products';
import { matchesSearchQuery } from '@/utils/search';
import { LiveSearchResult } from '@/app/api/live-search/route';
import {
  BadgePercent,
  Gift,
  Flame,
  Baby,
  Puzzle,
  Palette,
  Wand2,
  Rocket,
  Headphones,
  Gamepad2,
  Wine,
  ShieldCheck,
  TrendingUp,
  Search,
  Bot,
  Sparkles,
  Loader2,
  RefreshCw
} from 'lucide-react';

const AGE_BANNER_ICONS: Record<string, { icon: React.ComponentType<{ className?: string }>; bg: string; color: string }> = {
  '0-12m': { icon: Baby, bg: 'bg-rose-50 border-rose-200', color: 'text-rose-600' },
  '1-3': { icon: Puzzle, bg: 'bg-emerald-50 border-emerald-200', color: 'text-emerald-600' },
  '4-6': { icon: Palette, bg: 'bg-amber-50 border-amber-200', color: 'text-amber-600' },
  '7-9': { icon: Wand2, bg: 'bg-indigo-50 border-indigo-200', color: 'text-indigo-600' },
  '10-12': { icon: Rocket, bg: 'bg-blue-50 border-blue-200', color: 'text-blue-600' },
  '13-15': { icon: Headphones, bg: 'bg-violet-50 border-violet-200', color: 'text-violet-600' },
  '16-18': { icon: Gamepad2, bg: 'bg-purple-50 border-purple-200', color: 'text-purple-600' },
  '+18': { icon: Wine, bg: 'bg-rose-50 border-rose-200', color: 'text-rose-700' },
};

export default function HomePage() {
  const [selectedAge, setSelectedAge] = useState<string>('all');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedGender, setSelectedGender] = useState<'all' | 'boy' | 'girl' | 'reveal'>('all');
  const [selectedPrice, setSelectedPrice] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [isAiModalOpen, setIsAiModalOpen] = useState(false);

  // Live Amazon products state to render in the grid
  const [liveAmazonProducts, setLiveAmazonProducts] = useState<LiveSearchResult[]>([]);
  const [isLoadingLive, setIsLoadingLive] = useState(false);

  // Handle age selection
  const handleSelectAge = (age: string) => {
    setSelectedAge(age);
    setSelectedCategory('all');
    if (selectedPrice !== 'all') setSelectedPrice('all');
    if (searchQuery) setSearchQuery('');
    setLiveAmazonProducts([]);
  };

  // Handle category selection
  const handleSelectCategory = (cat: string) => {
    setSelectedCategory(cat);
    if (selectedPrice !== 'all') setSelectedPrice('all');
    if (searchQuery) setSearchQuery('');
    setLiveAmazonProducts([]);
  };

  // Handle gender selection
  const handleSelectGender = (gender: 'all' | 'boy' | 'girl' | 'reveal') => {
    setSelectedGender(gender);
    if (searchQuery) setSearchQuery('');
    setLiveAmazonProducts([]);
  };

  // Handle live search
  const handleSearchChange = (query: string) => {
    setSearchQuery(query);
    setLiveAmazonProducts([]);
    if (query.trim().length > 0) {
      if (selectedAge !== 'all') setSelectedAge('all');
      if (selectedCategory !== 'all') setSelectedCategory('all');
    }
  };

  // Filter products based on search, age, category, gender, price
  const filteredProducts = useMemo(() => {
    const isSearching = searchQuery.trim() !== '';

    return PRODUCTS.filter((product) => {
      // 1. Search query filter
      if (isSearching) {
        if (!matchesSearchQuery(product, searchQuery)) {
          return false;
        }
      }

      // 2. Gender filter
      if (selectedGender === 'reveal') {
        const isRevealSub = product.subcategory === 'Fiestas y Revelación de Género';
        const hasRevealKeyword =
          product.title.toLowerCase().includes('revelación') ||
          product.description.toLowerCase().includes('revelación') ||
          product.searchQuery.toLowerCase().includes('revelacion');
        if (!isRevealSub && !hasRevealKeyword) return false;
      } else if (selectedGender !== 'all') {
        if (product.gender !== 'unisex' && product.gender !== selectedGender) {
          return false;
        }
      }

      // 3. Age filter
      if (!isSearching && selectedAge !== 'all' && product.ageRange !== selectedAge) {
        return false;
      }

      // 4. Category / Subcategory filter
      if (!isSearching && selectedCategory !== 'all') {
        const sel = selectedCategory.trim();

        if (selectedAge !== 'all') {
          if (product.subcategory.toLowerCase() !== sel.toLowerCase()) {
            return false;
          }
        } else {
          const allowedSubcategories = GENERAL_CATEGORY_MAPPING[sel] || [sel];
          const matchesMapping = allowedSubcategories.some(
            (allowed) => allowed.toLowerCase() === product.subcategory.toLowerCase()
          );
          if (!matchesMapping) {
            return false;
          }
        }
      }

      // 5. Price filter
      if (selectedPrice !== 'all') {
        const prodPrice =
          parseFloat(product.priceText.replace(/[^0-9,.]/g, '').replace(',', '.')) || 0;

        if (selectedPrice === '<20') {
          if (prodPrice > 20) return false;
        } else if (selectedPrice === '20-50') {
          if (prodPrice < 20 || prodPrice > 50) return false;
        } else if (selectedPrice === '50-100') {
          if (prodPrice < 50 || prodPrice > 100) return false;
        } else if (selectedPrice === '>100') {
          if (prodPrice < 100) return false;
        } else {
          const maxBudget = Number(selectedPrice);
          if (!isNaN(maxBudget) && maxBudget < 150) {
            if (prodPrice > maxBudget) return false;
          }
        }
      }

      return true;
    });
  }, [selectedAge, selectedCategory, selectedGender, selectedPrice, searchQuery]);

  // Current active age category metadata
  const currentAgeMeta = useMemo(() => {
    return AGE_CATEGORIES.find((c) => c.id === selectedAge);
  }, [selectedAge]);

  // Contextual live search phrase for Amazon API
  const liveSearchQuery = useMemo(() => {
    if (searchQuery.trim().length > 0) return searchQuery.trim();
    if (selectedCategory && selectedCategory !== 'all') {
      if (selectedAge && selectedAge !== 'all') {
        return `${selectedCategory} ${selectedAge} anos`;
      }
      return selectedCategory;
    }
    if (selectedAge && selectedAge !== 'all') {
      const ageMap: Record<string, string> = {
        '0-12m': 'regalos bebes 0 a 12 meses',
        '1-3': 'juguetes regalos ninos 1 a 3 anos',
        '4-6': 'juegos y regalos ninos 4 a 6 anos',
        '7-9': 'juegos y regalos ninos 7 a 9 anos',
        '10-12': 'regalos y tecnologia ninos 10 a 12 anos',
        '13-15': 'regalos adolescentes 13 a 15 anos',
        '16-18': 'regalos jovenes 16 a 18 anos',
        '+18': 'regalos adultos originales',
      };
      return ageMap[selectedAge] || `regalos ${selectedAge} anos`;
    }
    return 'ideas regalos originales amazon';
  }, [searchQuery, selectedCategory, selectedAge]);

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
      console.error('Error fetching live Amazon products:', err);
    } finally {
      setIsLoadingLive(false);
    }
  }, [isLoadingLive, liveSearchQuery]);

  // Auto-fetch live products when 0 local results match active filter
  useEffect(() => {
    if (filteredProducts.length === 0 && liveSearchQuery) {
      let isMounted = true;
      setIsLoadingLive(true);
      fetch(`/api/live-search?q=${encodeURIComponent(liveSearchQuery)}&limit=6`)
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

      return () => {
        isMounted = false;
      };
    }
  }, [filteredProducts.length, liveSearchQuery]);

  // Handle recommendation from AI wizard
  const handleApplyRecommendation = (filters: { age: string; category: string; gender: 'all' | 'boy' | 'girl' | 'reveal'; price: string }) => {
    setSearchQuery('');
    setSelectedAge(filters.age);
    setSelectedCategory(filters.category);
    setSelectedGender(filters.gender);
    setSelectedPrice(filters.price);
    setLiveAmazonProducts([]);
  };

  return (
    <div className="min-h-screen relative flex flex-col bg-slate-50 text-slate-900 selection:bg-indigo-600 selection:text-white">
      {/* Background Subtle Atmosphere */}
      <ThemeAtmosphere />

      {/* Navigation Header */}
      <Header
        currentTheme="classic"
        onThemeChange={() => {}}
        searchQuery={searchQuery}
        onSearchChange={handleSearchChange}
      />

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 w-full z-10">
        
        {/* HERO SECTION */}
        <section className="text-center py-6 sm:py-10 max-w-4xl mx-auto">
          
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-bold mb-4 shadow-xs border border-slate-200 bg-white/90 backdrop-blur-md text-slate-800">
            <span className="flex h-2 w-2 rounded-full bg-emerald-500 animate-pulse"></span>
            <span>Edición Actualizada {new Date().getFullYear()} • Catálogo Verificado en Amazon España</span>
          </div>

          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black tracking-tight leading-[1.15] mb-5 text-slate-900">
            {currentAgeMeta ? (
              <span>{currentAgeMeta.h1}</span>
            ) : (
              <span>
                Ideas de Regalo para Todas las Edades:{' '}
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-500">
                  De 0 a más de 18 Años
                </span>
              </span>
            )}
          </h1>

          <p className="text-sm sm:text-base lg:text-lg text-slate-600 leading-relaxed mb-6 max-w-2xl mx-auto">
            {currentAgeMeta
              ? currentAgeMeta.description
              : 'Descubre recomendaciones contrastadas para acertar siempre: desde recién nacidos y niños, hasta tecnología, smartphones, gaming, Smartbox, maquetas y perfumería para adultos y mayores de 18 años. Compra con la garantía oficial de Amazon España.'}
          </p>

          {/* AI COPILOT POPUP TRIGGER BUTTON IN HERO */}
          <div className="flex flex-wrap items-center justify-center gap-4 mb-8">
            <button
              onClick={() => setIsAiModalOpen(true)}
              className="px-6 py-3.5 rounded-2xl bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-500 hover:from-indigo-700 hover:to-pink-600 text-white font-black text-sm sm:text-base shadow-lg hover:shadow-indigo-500/25 transition-all hover:scale-102 active:scale-98 flex items-center gap-2.5 cursor-pointer"
            >
              <Bot className="w-5 h-5 text-amber-300 animate-pulse" />
              <span>¿Te ayudamos a buscar? Probar Asistente IA</span>
            </button>
          </div>

          {/* Quick Badges of Trust */}
          <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-6 text-xs font-medium text-slate-500">
            <span className="flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-emerald-500" />
              Garantía de Devolución Amazon.es
            </span>
            <span className="flex items-center gap-1.5">
              <TrendingUp className="w-4 h-4 text-indigo-500" />
              Basado en Valoraciones Reales 4.5+ ★
            </span>
            <span className="flex items-center gap-1.5">
              <BadgePercent className="w-4 h-4 text-amber-500" />
              Precios y Ofertas al Día
            </span>
          </div>
        </section>

        {/* AI GIFT ASSISTANT MODAL (POPUP) */}
        <GiftWizard
          isOpen={isAiModalOpen}
          initialAge={selectedAge}
          initialGender={selectedGender}
          onClose={() => setIsAiModalOpen(false)}
          onApplyRecommendation={handleApplyRecommendation}
        />

        {/* FILTER BAR & SEARCH */}
        <div id="catalogo-productos">
          <FilterBar
            selectedAge={selectedAge}
            onSelectAge={handleSelectAge}
            selectedCategory={selectedCategory}
            onSelectCategory={handleSelectCategory}
            selectedGender={selectedGender}
            onSelectGender={handleSelectGender}
            selectedPrice={selectedPrice}
            onSelectPrice={setSelectedPrice}
            totalResults={filteredProducts.length + liveAmazonProducts.length}
          />
        </div>

        {/* DYNAMIC AGE BANNER WHEN FILTERED */}
        {currentAgeMeta && (
          <div className="p-5 sm:p-6 rounded-3xl my-6 border border-indigo-100 bg-white shadow-xs transition-all flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4">
            <div className="flex items-center gap-3.5">
              {(() => {
                const badge = AGE_BANNER_ICONS[currentAgeMeta.id];
                const IconComp = badge ? badge.icon : Gift;
                const bgClass = badge ? badge.bg : 'bg-indigo-50 border-indigo-200';
                const textClass = badge ? badge.color : 'text-indigo-600';
                return (
                  <div className={`w-11 h-11 sm:w-12 sm:h-12 rounded-2xl ${bgClass} border flex items-center justify-center shadow-xs shrink-0`}>
                    <IconComp className={`w-5 h-5 sm:w-6 sm:h-6 ${textClass}`} />
                  </div>
                );
              })()}
              <div>
                <h2 className="text-base sm:text-lg font-black text-slate-900">{currentAgeMeta.label}</h2>
                <p className="text-xs sm:text-sm text-slate-500 leading-snug">{currentAgeMeta.tagline}</p>
              </div>
            </div>
            {currentAgeMeta.seoKeywords.length > 0 && (
              <div className="flex flex-wrap items-center gap-1.5 pt-2 lg:pt-0 border-t lg:border-t-0 border-slate-100 w-full lg:w-auto">
                <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider mr-1 shrink-0">
                  Ideas destacadas:
                </span>
                {currentAgeMeta.seoKeywords.map((kw, idx) => (
                  <span
                    key={idx}
                    className="px-2.5 py-1 rounded-xl text-xs font-semibold bg-slate-50 border border-slate-200 text-slate-700 shadow-2xs hover:border-indigo-300 transition-colors"
                  >
                    {kw}
                  </span>
                ))}
              </div>
            )}
          </div>
        )}

        {/* ACTIVE SEARCH BANNER IF SEARCHING */}
        {searchQuery.trim() !== '' && (
          <div className="mb-6 flex flex-wrap items-center justify-between gap-3 p-4 bg-indigo-50/80 border border-indigo-200 rounded-2xl shadow-xs">
            <div className="flex items-center gap-2.5 text-indigo-950 font-bold text-sm">
              <span className="flex h-2.5 w-2.5 rounded-full bg-indigo-600 animate-pulse"></span>
              <span>Resultados para la búsqueda: <mark className="bg-indigo-100 text-indigo-900 px-2 py-0.5 rounded font-black">&ldquo;{searchQuery}&rdquo;</mark></span>
            </div>
            <button
              onClick={() => setSearchQuery('')}
              className="text-xs bg-white text-indigo-700 px-3.5 py-1.5 rounded-xl border border-indigo-200 font-bold hover:bg-indigo-100 hover:text-indigo-900 transition-all shadow-xs cursor-pointer flex items-center gap-1.5"
            >
              <span>✕ Quitar búsqueda (ver todo)</span>
            </button>
          </div>
        )}

        {/* PRODUCTS GRID */}
        {filteredProducts.length > 0 ? (
          <>
            <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 mb-12">
              {filteredProducts.map((product) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  currentTheme="classic"
                />
              ))}

              {/* LIVE AMAZON PRODUCTS LOADED INTO GRID */}
              {liveAmazonProducts.map((liveProd) => (
                <LiveAmazonProductCard
                  key={liveProd.asin}
                  product={liveProd}
                  categoryLabel={selectedCategory !== 'all' ? selectedCategory : 'Amazon España'}
                  badgeLabel="En Directo Amazon"
                />
              ))}

              {/* DISCOVERY / LOAD LIVE CARD IN SAME FORMAT */}
              <AmazonGridDiscoveryCard
                searchQuery={searchQuery}
                selectedAge={selectedAge}
                selectedCategory={selectedCategory}
                onLoadLiveToGrid={handleLoadLiveToGrid}
                isLoadingLive={isLoadingLive}
                hasLoadedLive={liveAmazonProducts.length > 0}
              />
            </section>

            {/* Quick action bar to load more live products directly */}
            {liveAmazonProducts.length === 0 && (
              <div className="mb-12 flex justify-center">
                <button
                  onClick={handleLoadLiveToGrid}
                  disabled={isLoadingLive}
                  className="px-6 py-3.5 rounded-2xl bg-amber-50 hover:bg-amber-100 border border-amber-300 text-amber-950 font-bold text-sm shadow-xs hover:shadow-md transition-all flex items-center gap-2 cursor-pointer disabled:opacity-70"
                >
                  {isLoadingLive ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin text-amber-700" />
                      <span>Conectando con Amazon en directo...</span>
                    </>
                  ) : (
                    <>
                      <Sparkles className="w-4 h-4 text-amber-600" />
                      <span>Cargar más ofertas en directo de Amazon para esta selección</span>
                    </>
                  )}
                </button>
              </div>
            )}

            {/* Universal Amazon Live Search Bar (Cookie & Global Search) */}
            <AmazonLiveSearchCard
              currentTheme="classic"
              initialQuery={searchQuery}
              selectedPrice={selectedPrice}
            />
          </>
        ) : (
          <div className="mb-16">
            {liveAmazonProducts.length > 0 ? (
              <div>
                {/* Live notice banner */}
                <div className="mb-6 p-4 sm:p-5 bg-gradient-to-r from-amber-50 to-orange-50 border border-amber-200 rounded-3xl flex flex-wrap items-center justify-between gap-3 shadow-xs">
                  <div className="flex items-center gap-3 text-amber-950 font-bold text-sm">
                    <span className="p-2 bg-amber-400/20 text-amber-700 rounded-xl">
                      <Sparkles className="w-5 h-5" />
                    </span>
                    <div>
                      <p className="font-extrabold text-slate-900">
                        Mostrando productos en directo de Amazon España para tu selección:
                      </p>
                      <p className="text-xs text-slate-600 font-normal">
                        Precios, fotos y disponibilidad al día obtenidos en tiempo real de Amazon.es
                      </p>
                    </div>
                  </div>
                  <button
                    onClick={() => {
                      setSelectedAge('all');
                      setSelectedCategory('all');
                      setSelectedGender('all');
                      setSelectedPrice('all');
                      setSearchQuery('');
                      setLiveAmazonProducts([]);
                    }}
                    className="text-xs bg-white text-slate-800 px-4 py-2 rounded-xl border border-amber-200 font-bold hover:bg-amber-100 transition-all shadow-xs cursor-pointer"
                  >
                    Restablecer filtros
                  </button>
                </div>

                {/* Grid populated with live products in the user's preferred card format */}
                <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 mb-12">
                  {liveAmazonProducts.map((liveProd) => (
                    <LiveAmazonProductCard
                      key={liveProd.asin}
                      product={liveProd}
                      categoryLabel={selectedCategory !== 'all' ? selectedCategory : 'Amazon España'}
                      badgeLabel="En Directo Amazon"
                    />
                  ))}
                  <AmazonGridDiscoveryCard
                    searchQuery={searchQuery}
                    selectedAge={selectedAge}
                    selectedCategory={selectedCategory}
                    onLoadLiveToGrid={handleLoadLiveToGrid}
                    isLoadingLive={isLoadingLive}
                    hasLoadedLive={true}
                  />
                </section>
              </div>
            ) : isLoadingLive ? (
              <div className="py-20 text-center flex flex-col items-center justify-center gap-3">
                <Loader2 className="w-10 h-10 animate-spin text-amber-500" />
                <h3 className="text-lg font-bold text-slate-900">Buscando productos en directo en Amazon España...</h3>
                <p className="text-xs text-slate-500 max-w-md">
                  Estamos consultando en tiempo real las mejores ofertas y disponibilidad para tus filtros activos.
                </p>
              </div>
            ) : (
              <div className="py-12 mb-16">
                <div className="text-center py-10 px-4 rounded-3xl border border-dashed border-slate-300 mb-8 bg-white/60">
                  <Search className="w-12 h-12 mx-auto mb-3 text-slate-400" />
                  <h3 className="text-xl font-bold mb-2 text-slate-900">¿Buscas un producto específico en Amazon?</h3>
                  <p className="text-sm text-slate-600 mb-5 max-w-xl mx-auto">
                    No tenemos ese producto exacto en nuestro catálogo verificado local, pero puedes buscarlo directamente en <strong>Amazon España</strong> con un solo clic con las mejores ofertas y disponibilidad al momento.
                  </p>
                  <button
                    onClick={() => {
                      setSelectedAge('all');
                      setSelectedCategory('all');
                      setSelectedGender('all');
                      setSelectedPrice('all');
                      setSearchQuery('');
                    }}
                    className="px-5 py-2.5 rounded-xl bg-slate-200 text-slate-800 text-xs font-bold hover:bg-slate-300 transition-colors"
                  >
                    Limpiar filtros locales
                  </button>
                </div>

                <AmazonLiveSearchCard
                  currentTheme="classic"
                  initialQuery={searchQuery || 'ofertas regalos ninos y jovenes'}
                  selectedPrice={selectedPrice}
                />
              </div>
            )}
          </div>
        )}

        {/* SEO CONTENT SECTION */}
        <section className="rounded-3xl p-6 sm:p-10 mb-12 border border-slate-200 bg-white text-slate-800 shadow-xs">
          <h2 className="text-2xl sm:text-3xl font-black mb-4 tracking-tight text-slate-900">
            Guía de Compra Inteligente: ¿Cómo acertar con el regalo según la edad?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-xs sm:text-sm leading-relaxed text-slate-600">
            <div className="space-y-2">
              <h3 className="font-bold text-base flex items-center gap-2 text-indigo-600">
                <span>🧸</span> Recién Nacidos y 0 a 3 Años
              </h3>
              <p>
                Para los más pequeños, los regalos deben combinar <strong>seguridad certificada</strong>, materiales hipoalergénicos y practicidad para los padres. Las <strong>tartas de pañales personalizadas</strong> son el detalle por excelencia porque ofrecen más de 50 pañales de primera puesta organizados con estética de alta gama. Los juguetes de madera Montessori impulsan el agarre y la motricidad libre sin sobreestimular.
              </p>
            </div>
            <div className="space-y-2">
              <h3 className="font-bold text-base flex items-center gap-2 text-indigo-600">
                <span>🎨</span> Niños de 4 a 12 Años
              </h3>
              <p>
                En esta franja el juego simbólico y social cobra protagonismo. Los <strong>juegos de mesa familiares modernos</strong> como Catán Junior o Virus desarrollan la agilidad mental y reúnen a toda la familia alrededor de la mesa. Los sets de construcción tipo LEGO Creator y los circuitos Scalextric despiertan la emoción de la competición sana sin pantallas.
              </p>
            </div>
            <div className="space-y-2">
              <h3 className="font-bold text-base flex items-center gap-2 text-indigo-600">
                <span>🎧</span> Jóvenes y Adolescentes (13 a 18 Años)
              </h3>
              <p>
                Los adolescentes buscan reafirmar su personalidad propia. En lugar de regalos genéricos, triunfan los artículos con personalidad: desde videojuegos de <strong>PlayStation 5</strong> y periféricos de setup gaming hasta <strong>estilo personal y creativo</strong> con velas aromáticas WoodWick, diarios encuadernados en piel vintage y auriculares de alta fidelidad con cancelación de ruido.
              </p>
            </div>
          </div>
        </section>

        {/* SEO FAQ SECTION (with JSON-LD Schema) */}
        <SeoFaq currentTheme="classic" />

      </main>

      {/* Floating AI Copilot Launcher Button in Bottom Right */}
      <button
        onClick={() => setIsAiModalOpen(true)}
        aria-label="Abrir Asistente IA de Regalos"
        className="fixed bottom-6 right-6 z-40 px-5 py-3.5 rounded-full bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-500 hover:from-indigo-700 hover:to-pink-600 text-white shadow-2xl flex items-center gap-2.5 transition-all hover:scale-105 active:scale-95 cursor-pointer font-extrabold text-sm border-2 border-white/20"
      >
        <Bot className="w-5 h-5 text-amber-300 animate-pulse" />
        <span>¿Te ayudamos a buscar? Asistente IA</span>
      </button>

      {/* Footer with Amazon Affiliate Compliance */}
      <Footer currentTheme="classic" />
    </div>
  );
}
