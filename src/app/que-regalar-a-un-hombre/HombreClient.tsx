'use client';

import React, { useState, useMemo } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import ProductCard from '@/components/ProductCard';
import { PRODUCTS, Product } from '@/data/products';
import { parsePrice } from '@/lib/amazon';
import { HelpCircle, ShieldCheck, TrendingUp, Sparkles, SlidersHorizontal, ChevronRight } from 'lucide-react';
import Link from 'next/link';

export default function HombreClient() {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedPrice, setSelectedPrice] = useState<string>('all');
  const [sortBy, setSortBy] = useState<'featured' | 'price-asc' | 'price-desc' | 'rating'>('featured');
  const [searchQuery, setSearchQuery] = useState('');

  // Filter pool for men
  const hombreProducts = useMemo(() => {
    return PRODUCTS.filter((p) => {
      if (p.gender === 'girl') return false;
      if (p.ageRange === '0-12m' || p.ageRange === '1-3' || p.ageRange === '4-6' || p.ageRange === '7-9' || p.ageRange === '10-12') return false;
      return true;
    });
  }, []);

  // Categories present in this pool
  const categoriesList = useMemo(() => {
    const set = new Set<string>();
    hombreProducts.forEach((p) => {
      if (p.category) set.add(p.category);
    });
    return Array.from(set).sort();
  }, [hombreProducts]);

  // Filtered
  const filteredProducts = useMemo(() => {
    return hombreProducts.filter((p) => {
      if (selectedCategory !== 'all' && p.category !== selectedCategory) {
        return false;
      }
      if (selectedPrice !== 'all') {
        const price = parsePrice(p.priceText);
        if (selectedPrice === '<20' && price >= 20) return false;
        if (selectedPrice === '20-50' && (price < 20 || price > 50)) return false;
        if (selectedPrice === '50-100' && (price < 50 || price > 100)) return false;
        if (selectedPrice === '>100' && price <= 100) return false;
      }
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const text = `${p.title} ${p.description || ''} ${p.searchQuery || ''} ${p.subcategory || ''}`.toLowerCase();
        if (!text.includes(q)) return false;
      }
      return true;
    });
  }, [hombreProducts, selectedCategory, selectedPrice, searchQuery]);

  // Sorted
  const sortedProducts = useMemo(() => {
    const list = [...filteredProducts];
    if (sortBy === 'price-asc') {
      list.sort((a, b) => parsePrice(a.priceText) - parsePrice(b.priceText));
    } else if (sortBy === 'price-desc') {
      list.sort((a, b) => parsePrice(b.priceText) - parsePrice(a.priceText));
    } else if (sortBy === 'rating') {
      list.sort((a, b) => (b.rating || 0) - (a.rating || 0));
    } else {
      list.sort((a, b) => {
        const aBoy = a.gender === 'boy' ? 1 : 0;
        const bBoy = b.gender === 'boy' ? 1 : 0;
        if (aBoy !== bBoy) return bBoy - aBoy;
        return ((b.reviewsCount || 0) * (b.rating || 1)) - ((a.reviewsCount || 0) * (a.rating || 1));
      });
    }
    return list;
  }, [filteredProducts, sortBy]);

  // JSON-LD FAQ Schema
  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name: '¿Qué regalar a un hombre que tiene de todo?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Cuando un hombre parece tener de todo, los regalos que mejor funcionan son los gadgets funcionales y las experiencias gourmet o sensoriales: una cafetera espresso de viaje, multiherramientas suizas Victorinox, accesorios para barbacoa o gadgets de setup como lámparas de monitor o cargadores magnéticos 3 en 1.',
        },
      },
      {
        '@type': 'Question',
        name: '¿Cuáles son los mejores regalos para mi novio en su cumpleaños o aniversario?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Para tu novio triunfan los detalles con personalidad según sus aficiones: videojuegos y accesorios de PS5 o PC Gaming, fragancias frescas y duraderas (como CK One o Hugo Boss), carteras inteligentes RFID ultraplanas o auriculares inalámbricos con cancelación de ruido activa.',
        },
      },
      {
        '@type': 'Question',
        name: '¿Qué regalar a un padre para acertar sin gastar una fortuna?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Para un padre los regalos prácticos de calidad son los más agradecidos: sets de afeitado clásico, organizadores de reloj y accesorios, libros de historia o narrativa de gran éxito, tazas térmicas de viaje o gadgets para su coche.',
        },
      },
    ],
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 flex flex-col">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      <Header
        currentTheme="classic"
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
      />

      <main className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 w-full">
        {/* Breadcrumb */}
        <nav aria-label="Breadcrumb" className="mb-4 text-xs text-slate-500 flex items-center gap-1.5">
          <Link href="/" className="hover:underline hover:text-slate-900">Inicio</Link>
          <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
          <span className="font-bold text-slate-900">Qué Regalar a un Hombre</span>
        </nav>

        {/* HERO BANNER */}
        <section className="bg-gradient-to-r from-slate-950 via-slate-900 to-indigo-950 text-white rounded-3xl p-6 sm:p-10 mb-8 shadow-xl relative overflow-hidden border border-slate-800">
          <div className="absolute top-0 right-0 w-80 h-80 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />

          <div className="max-w-3xl relative z-10 space-y-3">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full text-xs font-bold bg-indigo-500/20 text-indigo-300 border border-indigo-500/30">
              <Sparkles className="w-3.5 h-3.5 text-amber-400" />
              <span>Guía de Compras 2026 · Ideas Verificadas</span>
            </div>

            <h1 className="text-2xl sm:text-4xl lg:text-5xl font-black tracking-tight leading-tight">
              ¿Qué Regalar a un Hombre?{' '}
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-amber-400 via-orange-300 to-amber-200">
                Las Mejores Ideas de 2026
              </span>
            </h1>

            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed max-w-2xl">
              ¿No sabes qué comprarle a tu novio, padre, hermano o amigo? Hemos seleccionado los regalos para hombres mejor valorados en Amazon: tecnología, gadgets originales, motor, café barista, gaming y accesorios prácticos con los que acertarás seguro.
            </p>

            <div className="flex flex-wrap items-center gap-4 pt-2 text-xs text-slate-300 font-medium">
              <span className="flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-emerald-400" />
                Garantía y Envíos Prime en Amazon.es
              </span>
              <span className="flex items-center gap-1.5">
                <TrendingUp className="w-4 h-4 text-amber-400" />
                Solo productos con 4.5+ ★ y opiniones reales
              </span>
            </div>
          </div>
        </section>

        {/* CONTROL BAR: BUDGET PILLS + CATEGORIES + SORT */}
        <div className="bg-white border border-slate-200/90 rounded-2xl p-4 shadow-xs mb-6 space-y-3">
          <div className="flex flex-wrap items-center justify-between gap-3 pb-3 border-b border-slate-100">
            <div>
              <h2 className="text-base sm:text-lg font-black text-slate-900 tracking-tight flex items-center gap-2">
                <span>Regalos para Hombres Seleccionados</span>
                <span className="text-xs font-bold text-indigo-900 bg-indigo-50 border border-indigo-200 px-2.5 py-0.5 rounded-full">
                  {sortedProducts.length} ideas
                </span>
              </h2>
              <p className="text-[11px] text-slate-500">
                Filtra por presupuesto o afición para encontrar la sorpresa ideal
              </p>
            </div>

            {/* Sorting */}
            <div className="flex items-center gap-1.5 bg-slate-50 border border-slate-200 rounded-xl px-2.5 py-1">
              <span className="text-[11px] text-slate-500 font-bold">Ordenar:</span>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as any)}
                aria-label="Ordenar productos"
                className="text-xs font-bold text-slate-800 bg-transparent focus:outline-hidden cursor-pointer"
              >
                <option value="featured">Recomendados (Top)</option>
                <option value="price-asc">Precio: Menor a mayor</option>
                <option value="price-desc">Precio: Mayor a menor</option>
                <option value="rating">Mejor valorados (5★)</option>
              </select>
            </div>
          </div>

          {/* Budget Quick Access Pills */}
          <div className="flex items-center gap-1.5 overflow-x-auto scrollbar-none text-xs pb-1">
            <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider shrink-0 mr-1">
              Presupuesto:
            </span>
            <button
              type="button"
              onClick={() => setSelectedPrice('all')}
              className={`px-3 py-1 rounded-xl text-xs font-bold whitespace-nowrap transition-all cursor-pointer ${
                selectedPrice === 'all'
                  ? 'bg-slate-900 text-white'
                  : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
              }`}
            >
              Todos los precios
            </button>
            <button
              type="button"
              onClick={() => setSelectedPrice('<20')}
              className={`px-3 py-1 rounded-xl text-xs font-bold whitespace-nowrap transition-all cursor-pointer ${
                selectedPrice === '<20'
                  ? 'bg-emerald-600 text-white'
                  : 'bg-emerald-50 text-emerald-800 hover:bg-emerald-100 border border-emerald-200'
              }`}
            >
              🟢 Menos de 20 €
            </button>
            <button
              type="button"
              onClick={() => setSelectedPrice('20-50')}
              className={`px-3 py-1 rounded-xl text-xs font-bold whitespace-nowrap transition-all cursor-pointer ${
                selectedPrice === '20-50'
                  ? 'bg-amber-500 text-slate-950'
                  : 'bg-amber-50 text-amber-800 hover:bg-amber-100 border border-amber-200'
              }`}
            >
              🟡 De 20 € a 50 €
            </button>
            <button
              type="button"
              onClick={() => setSelectedPrice('50-100')}
              className={`px-3 py-1 rounded-xl text-xs font-bold whitespace-nowrap transition-all cursor-pointer ${
                selectedPrice === '50-100'
                  ? 'bg-purple-600 text-white'
                  : 'bg-purple-50 text-purple-800 hover:bg-purple-100 border border-purple-200'
              }`}
            >
              🟣 De 50 € a 100 €
            </button>
            <button
              type="button"
              onClick={() => setSelectedPrice('>100')}
              className={`px-3 py-1 rounded-xl text-xs font-bold whitespace-nowrap transition-all cursor-pointer ${
                selectedPrice === '>100'
                  ? 'bg-indigo-600 text-white'
                  : 'bg-indigo-50 text-indigo-800 hover:bg-indigo-100 border border-indigo-200'
              }`}
            >
              💎 Más de 100 €
            </button>
          </div>

          {/* Category Pills */}
          <div className="flex items-center gap-1.5 overflow-x-auto scrollbar-none text-xs pt-1 border-t border-slate-100">
            <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider shrink-0 mr-1">
              Categoría:
            </span>
            <button
              type="button"
              onClick={() => setSelectedCategory('all')}
              className={`px-2.5 py-1 rounded-lg text-xs font-semibold whitespace-nowrap transition-all cursor-pointer ${
                selectedCategory === 'all'
                  ? 'bg-slate-800 text-white'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              Todas
            </button>
            {categoriesList.map((cat) => (
              <button
                key={cat}
                type="button"
                onClick={() => setSelectedCategory(cat)}
                className={`px-2.5 py-1 rounded-lg text-xs font-semibold whitespace-nowrap transition-all cursor-pointer ${
                  selectedCategory === cat
                    ? 'bg-indigo-600 text-white'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* PRODUCTS GRID */}
        {sortedProducts.length > 0 ? (
          <section className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-2 sm:gap-2.5 lg:gap-3 mb-12">
            {sortedProducts.map((product, idx) => (
              <ProductCard
                key={product.id}
                product={product}
                currentTheme="classic"
                rankBadge={sortBy === 'featured' ? (idx === 0 ? 1 : idx === 1 ? 2 : idx === 2 ? 3 : undefined) : undefined}
              />
            ))}
          </section>
        ) : (
          <div className="text-center py-16 bg-white rounded-3xl border border-slate-200 p-8 mb-12">
            <p className="text-slate-600 text-sm mb-4">No se han encontrado regalos para hombres con estos filtros.</p>
            <button
              onClick={() => {
                setSelectedCategory('all');
                setSelectedPrice('all');
                setSearchQuery('');
              }}
              className="px-4 py-2 rounded-xl bg-slate-900 text-white text-xs font-bold hover:bg-slate-800 transition-colors"
            >
              Ver todos los regalos para hombres
            </button>
          </div>
        )}

        {/* EDITORIAL BUYING GUIDE FOR MEN */}
        <section className="bg-white rounded-3xl p-6 sm:p-10 mb-10 border border-slate-200 shadow-xs space-y-6">
          <h2 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
            Guía de Compra: Cómo Acertar al Elegir un Regalo para un Hombre
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-xs sm:text-sm text-slate-600 leading-relaxed">
            <div className="space-y-2">
              <h3 className="font-bold text-slate-900 text-base flex items-center gap-2">
                <span>📱</span> Tecnología y Gadgets Útiles
              </h3>
              <p>
                A la mayoría de hombres les apasiona la tecnología que resuelve problemas diarios o que eleva su espacio de trabajo y ocio: soportes de carga inalámbrica rápida, auriculares con cancelación de ruido, teclados mecánicos o gadgets de audio de alta fidelidad.
              </p>
            </div>
            <div className="space-y-2">
              <h3 className="font-bold text-slate-900 text-base flex items-center gap-2">
                <span>☕</span> Experiencias y Hobbies
              </h3>
              <p>
                Si tiene una pasión clara, no lo dudes: si le gusta el café, un molinillo manual de precisión o una prensa francesa; si es motero, candados con alarma y soportes antivibración para el móvil; si es gamer, accesorios ergonómicos y merchandising oficial.
              </p>
            </div>
            <div className="space-y-2">
              <h3 className="font-bold text-slate-900 text-base flex items-center gap-2">
                <span>✨</span> Calidad frente a Cantidad
              </h3>
              <p>
                Un accesorio bien fabricado (como una cartera delgada de cuero con bloqueo RFID o una navaja multiusos suiza) deja una impresión duradera mucho más potente que un regalo genérico sin utilidad real.
              </p>
            </div>
          </div>
        </section>

        {/* FAQ SECTION */}
        <section className="bg-white rounded-3xl p-6 sm:p-10 mb-12 border border-slate-200 shadow-xs">
          <div className="flex items-center gap-2 mb-4">
            <HelpCircle className="w-5 h-5 text-indigo-600" />
            <h2 className="text-lg font-black text-slate-900">Preguntas Frecuentes sobre Regalos para Hombres</h2>
          </div>
          <div className="space-y-4">
            {faqSchema.mainEntity.map((faq, idx) => (
              <div key={idx} className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80">
                <h3 className="font-bold text-sm text-slate-900 mb-1.5">{faq.name}</h3>
                <p className="text-xs text-slate-600 leading-relaxed">{faq.acceptedAnswer.text}</p>
              </div>
            ))}
          </div>
        </section>
      </main>

      <Footer currentTheme="classic" />
    </div>
  );
}
