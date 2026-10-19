'use client';

import React, { useState, useMemo } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import FilterBar from '@/components/FilterBar';
import ProductCard from '@/components/ProductCard';
import GiftWizard from '@/components/GiftWizard';
import SeoFaq from '@/components/SeoFaq';
import ThemeAtmosphere from '@/components/ThemeAtmosphere';
import AmazonLiveSearchCard from '@/components/AmazonLiveSearchCard';
import { PRODUCTS, AGE_CATEGORIES, Product } from '@/data/products';
import { Sparkles, Gift, Flame, Baby, Gamepad2, ShieldCheck, TrendingUp, Search } from 'lucide-react';

export default function HomePage() {
  const [currentTheme, setCurrentTheme] = useState<'baby' | 'kids' | 'gamer' | 'emo' | 'tech' | 'classic'>('classic');
  const [selectedAge, setSelectedAge] = useState<string>('all');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedPrice, setSelectedPrice] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');

  // Handle age selection and automatically adapt theme mood
  const handleSelectAge = (age: string) => {
    setSelectedAge(age);
    setSelectedCategory('all'); // Reset subcategory when switching age
    if (age === '0-12m') {
      setCurrentTheme('baby');
    } else if (age === '16-18') {
      setCurrentTheme('emo');
    } else if (age === '13-15') {
      setCurrentTheme('gamer');
    } else if (age === '1-3' || age === '4-6') {
      setCurrentTheme('kids');
    } else {
      setCurrentTheme('classic');
    }
  };

  // Handle category selection with automatic theme reflection
  const handleSelectCategory = (cat: string) => {
    setSelectedCategory(cat);
    const catLower = cat.toLowerCase();
    if (catLower.includes('pañal') || catLower.includes('cochecito') || catLower.includes('bañera') || catLower.includes('cuidado infantil') || catLower.includes('bebé')) {
      setCurrentTheme('baby');
    } else if (catLower.includes('emo') || catLower.includes('vela')) {
      setCurrentTheme('emo');
    } else if (catLower.includes('ps5') || catLower.includes('gamer')) {
      setCurrentTheme('gamer');
    } else if (selectedAge !== 'all') {
      handleSelectAge(selectedAge);
    } else {
      setCurrentTheme('classic');
    }
  };

  // Handle live search with smart atmospheric theme detection
  const handleSearchChange = (query: string) => {
    setSearchQuery(query);
    const q = query.toLowerCase();
    if (q.includes('bebe') || q.includes('bebé') || q.includes('cuna') || q.includes('cochecito') || q.includes('pañal') || q.includes('bañera') || q.includes('lactancia') || q.includes('doudou')) {
      setCurrentTheme('baby');
    } else if (q.includes('emo') || q.includes('vela') || q.includes('gotico') || q.includes('gótico') || q.includes('grunge')) {
      setCurrentTheme('emo');
    } else if (q.includes('ps5') || q.includes('gamer') || q.includes('mando') || q.includes('videojuego')) {
      setCurrentTheme('gamer');
    } else if (selectedAge !== 'all') {
      handleSelectAge(selectedAge);
    } else {
      setCurrentTheme('classic');
    }
  };

  // Filter products based on search, age, category, price
  const filteredProducts = useMemo(() => {
    return PRODUCTS.filter((product) => {
      // Age filter
      if (selectedAge !== 'all' && product.ageRange !== selectedAge) {
        return false;
      }

      // Category / Subcategory filter
      if (selectedCategory !== 'all') {
        const matchesCategory = product.category.toLowerCase().includes(selectedCategory.toLowerCase());
        const matchesSubcategory = product.subcategory.toLowerCase().includes(selectedCategory.toLowerCase());
        if (!matchesCategory && !matchesSubcategory) {
          return false;
        }
      }

      // Price filter
      if (selectedPrice !== 'all') {
        if (selectedPrice === '<20' && product.priceRange !== '<20') return false;
        if (selectedPrice === '20-50' && product.priceRange !== '20-50') return false;
        if (selectedPrice === '50-100' && product.priceRange !== '50-100') return false;
        if (selectedPrice === '>100' && product.priceRange !== '>100') return false;
      }

      // Search query
      if (searchQuery.trim() !== '') {
        const query = searchQuery.toLowerCase().trim();
        const matchesTitle = product.title.toLowerCase().includes(query);
        const matchesDesc = product.description.toLowerCase().includes(query);
        const matchesSub = product.subcategory.toLowerCase().includes(query);
        const matchesSearchKey = product.searchQuery.toLowerCase().includes(query);
        if (!matchesTitle && !matchesDesc && !matchesSub && !matchesSearchKey) {
          return false;
        }
      }

      return true;
    });
  }, [selectedAge, selectedCategory, selectedPrice, searchQuery]);

  // Current active age category metadata
  const currentAgeMeta = useMemo(() => {
    return AGE_CATEGORIES.find((c) => c.id === selectedAge);
  }, [selectedAge]);

  // Handle recommendation from wizard
  const handleApplyRecommendation = (filters: { age: string; category: string; price: string; theme: any }) => {
    setSelectedAge(filters.age);
    setSelectedCategory(filters.category);
    setSelectedPrice(filters.price);
    if (filters.theme) {
      setCurrentTheme(filters.theme);
    }
  };

  return (
    <div
      data-theme={currentTheme}
      className={`min-h-screen relative flex flex-col transition-colors duration-500 ${
        currentTheme === 'emo'
          ? 'bg-neutral-950 text-neutral-100'
          : currentTheme === 'gamer'
          ? 'bg-slate-950 text-slate-100'
          : currentTheme === 'baby'
          ? 'bg-[#fdf7f8] text-rose-950'
          : 'bg-slate-50 text-slate-900'
      }`}
    >
      {/* Background Interactive Atmosphere */}
      <ThemeAtmosphere theme={currentTheme} />

      {/* Navigation Header */}
      <Header
        currentTheme={currentTheme}
        onThemeChange={setCurrentTheme}
        searchQuery={searchQuery}
        onSearchChange={handleSearchChange}
      />

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 w-full z-10">
        
        {/* HERO SECTION - Optimized for SEO H1 and CRO */}
        <section className="text-center py-6 sm:py-12 max-w-4xl mx-auto">
          
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-bold mb-4 shadow-xs border bg-white/80 dark:bg-neutral-900/80 backdrop-blur-md">
            <span className="flex h-2 w-2 rounded-full bg-emerald-500 animate-pulse"></span>
            <span>Edición Actualizada 2025 • Más de 100 Ideas Vetted</span>
          </div>

          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black tracking-tight leading-[1.15] mb-5">
            {currentAgeMeta ? (
              <span>{currentAgeMeta.h1}</span>
            ) : (
              <span>
                Ideas de Regalo para Niños y Jóvenes de{' '}
                <span className={`bg-clip-text text-transparent ${
                  currentTheme === 'emo'
                    ? 'bg-gradient-to-r from-rose-400 via-rose-300 to-amber-200'
                    : currentTheme === 'baby'
                    ? 'bg-gradient-to-r from-pink-500 to-amber-500'
                    : currentTheme === 'gamer'
                    ? 'bg-gradient-to-r from-purple-400 via-pink-400 to-cyan-400'
                    : 'bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-500'
                }`}>
                  0 a 18 Años
                </span>
              </span>
            )}
          </h1>

          <p className="text-sm sm:text-base lg:text-lg opacity-80 leading-relaxed mb-8 max-w-2xl mx-auto">
            {currentAgeMeta
              ? currentAgeMeta.description
              : 'Descubre recomendaciones contrastadas para acertar siempre: desde tartas de pañales artesanales para recién nacidos y juguetes Montessori, hasta videojuegos de PS5 y regalos aesthetic alternativos para adolescentes. Compra con la garantía oficial de Amazon España.'}
          </p>

          {/* Quick Badges of Trust */}
          <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-6 text-xs font-medium opacity-80">
            <span className="flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-emerald-500" />
              Garantía de Devolución Amazon.es
            </span>
            <span className="flex items-center gap-1.5">
              <TrendingUp className="w-4 h-4 text-indigo-500" />
              Basado en Valoraciones Reales 4.5+ ★
            </span>
            <span className="flex items-center gap-1.5">
              <Sparkles className="w-4 h-4 text-amber-500" />
              Precios y Ofertas al Día
            </span>
          </div>
        </section>

        {/* INTERACTIVE GIFT WIZARD (3 Steps + Confetti) */}
        <GiftWizard
          onApplyRecommendation={handleApplyRecommendation}
          currentTheme={currentTheme}
        />

        {/* DYNAMIC AGE BANNER WHEN FILTERED */}
        {currentAgeMeta && (
          <div className={`p-6 rounded-3xl mb-8 border transition-all flex flex-col sm:flex-row items-center justify-between gap-4 ${
            currentTheme === 'emo'
              ? 'bg-neutral-900 border-rose-900/60 text-rose-100 shadow-rose-950/30'
              : currentTheme === 'baby'
              ? 'bg-gradient-to-r from-pink-100/80 to-amber-100/50 border-pink-200 text-rose-950 shadow-rose-100'
              : currentTheme === 'gamer'
              ? 'bg-slate-900 border-purple-800/60 text-slate-100 shadow-purple-950/30'
              : 'bg-indigo-50/70 border-indigo-200 text-indigo-950'
          }`}>
            <div className="flex items-center gap-4">
              <span className="text-4xl">{currentAgeMeta.icon}</span>
              <div>
                <h2 className="text-lg sm:text-xl font-black">{currentAgeMeta.label}</h2>
                <p className="text-xs sm:text-sm opacity-80">{currentAgeMeta.tagline}</p>
              </div>
            </div>
            <div className="flex flex-wrap gap-1.5">
              {currentAgeMeta.seoKeywords.map((kw, idx) => (
                <span
                  key={idx}
                  className="px-2.5 py-1 rounded-full text-[11px] font-semibold bg-white/60 dark:bg-black/40 border border-black/5 dark:border-white/10"
                >
                  #{kw}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* FILTER BAR & SEARCH */}
        <div id="catalogo-productos">
          <FilterBar
            selectedAge={selectedAge}
            onSelectAge={handleSelectAge}
            selectedCategory={selectedCategory}
            onSelectCategory={handleSelectCategory}
            selectedPrice={selectedPrice}
            onSelectPrice={setSelectedPrice}
            currentTheme={currentTheme}
            totalResults={filteredProducts.length}
          />
        </div>

        {/* PRODUCTS GRID */}
        {filteredProducts.length > 0 ? (
          <>
            <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 mb-12">
              {filteredProducts.map((product) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  currentTheme={currentTheme}
                />
              ))}
            </section>

            {/* Universal Amazon Live Search Bar (Cookie & Global Search) */}
            <AmazonLiveSearchCard
              currentTheme={currentTheme}
              initialQuery={searchQuery}
              selectedPrice={selectedPrice}
            />
          </>
        ) : (
          <div className="py-12 mb-16">
            <div className="text-center py-10 px-4 rounded-3xl border border-dashed border-slate-300 dark:border-neutral-700 mb-8 bg-white/40 dark:bg-neutral-900/40">
              <Search className="w-12 h-12 mx-auto mb-3 opacity-30" />
              <h3 className="text-xl font-bold mb-2">¿Buscas un producto específico en Amazon?</h3>
              <p className="text-sm opacity-80 mb-5 max-w-xl mx-auto">
                No tenemos ese producto exacto en nuestro catálogo verificado local, pero puedes buscarlo directamente en <strong>Amazon España</strong> con un solo clic con las mejores ofertas y disponibilidad al momento.
              </p>
              <button
                onClick={() => {
                  setSelectedAge('all');
                  setSelectedCategory('all');
                  setSelectedPrice('all');
                  setSearchQuery('');
                }}
                className="px-5 py-2.5 rounded-xl bg-slate-200 dark:bg-neutral-800 text-slate-800 dark:text-neutral-200 text-xs font-bold hover:bg-slate-300 dark:hover:bg-neutral-700 transition-colors"
              >
                Limpiar filtros locales
              </button>
            </div>

            {/* Prominent Live Search on Amazon España */}
            <AmazonLiveSearchCard
              currentTheme={currentTheme}
              initialQuery={searchQuery || 'ofertas regalos ninos y jovenes'}
              selectedPrice={selectedPrice}
            />
          </div>
        )}

        {/* SEO CONTENT SECTION - Rich Educational Buying Guides */}
        <section className={`rounded-3xl p-6 sm:p-10 mb-12 border ${
          currentTheme === 'emo'
            ? 'bg-neutral-900/70 border-neutral-800 text-neutral-200'
            : currentTheme === 'gamer'
            ? 'bg-slate-900/70 border-purple-900/50 text-slate-200'
            : currentTheme === 'baby'
            ? 'bg-white/80 border-rose-200 text-rose-950'
            : 'bg-white border-slate-200 text-slate-800'
        }`}>
          <h2 className="text-2xl sm:text-3xl font-black mb-4 tracking-tight">
            Guía de Compra Inteligente: ¿Cómo acertar con el regalo según la edad?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-xs sm:text-sm leading-relaxed opacity-85">
            <div className="space-y-2">
              <h3 className="font-bold text-base flex items-center gap-2 text-indigo-600 dark:text-rose-400">
                <span>🧸</span> Recién Nacidos y 0 a 3 Años
              </h3>
              <p>
                Para los más pequeños, los regalos deben combinar <strong>seguridad certificada</strong>, materiales hipoalergénicos y practicidad para los padres. Las <strong>tartas de pañales personalizadas</strong> son el detalle por excelencia porque ofrecen más de 50 pañales de primera puesta organizados con estética de alta gama. Los juguetes de madera Montessori impulsan el agarre y la motricidad libre sin sobreestimular.
              </p>
            </div>
            <div className="space-y-2">
              <h3 className="font-bold text-base flex items-center gap-2 text-indigo-600 dark:text-rose-400">
                <span>🎨</span> Niños de 4 a 12 Años
              </h3>
              <p>
                En esta franja el juego simbólico y social cobra protagonismo. Los <strong>juegos de mesa familiares modernos</strong> como Catán Junior o Virus desarrollan la agilidad mental y reúnen a toda la familia alrededor de la mesa. Los sets de construcción tipo LEGO Creator y los experimentos de ciencia STEM despiertan vocaciones tempranas con entretenimiento activo sin pantallas.
              </p>
            </div>
            <div className="space-y-2">
              <h3 className="font-bold text-base flex items-center gap-2 text-indigo-600 dark:text-rose-400">
                <span>🖤</span> Jóvenes y Adolescentes (13 a 18 Años)
              </h3>
              <p>
                Los adolescentes buscan reafirmar su identidad propia. En lugar de regalos genéricos, triunfan los artículos con personalidad: desde videojuegos de <strong>PlayStation 5</strong> y periféricos de setup gaming hasta <strong>estilo personal y creativo</strong> con velas aromáticas WoodWick, diarios encuadernados en piel vintage y auriculares de alta fidelidad con cancelación de ruido.
              </p>
            </div>
          </div>
        </section>

        {/* SEO FAQ SECTION (with JSON-LD Schema) */}
        <SeoFaq currentTheme={currentTheme} />

      </main>

      {/* Footer with Amazon Affiliate Compliance */}
      <Footer currentTheme={currentTheme} />
    </div>
  );
}
