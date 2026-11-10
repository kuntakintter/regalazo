'use client';

import React, { useState, useMemo } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import ProductCard from '@/components/ProductCard';
import { PRODUCTS, Product } from '@/data/products';
import { parsePrice } from '@/lib/amazon';
import { useCurrency } from '@/context/CurrencyContext';
import { generateProductItemListSchema } from '@/lib/schemaProduct';
import { HelpCircle, ShieldCheck, TrendingUp, Sparkles, SlidersHorizontal, ChevronRight, Compass } from 'lucide-react';
import Link from 'next/link';

export default function MujerClient() {
  const { amazonSiteName } = useCurrency();
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedPrice, setSelectedPrice] = useState<string>('all');
  const [sortBy, setSortBy] = useState<'featured' | 'price-asc' | 'price-desc' | 'rating'>('featured');
  const [searchQuery, setSearchQuery] = useState('');

  // Filter pool for women
  const mujerProducts = useMemo(() => {
    return PRODUCTS.filter((p) => {
      if (p.gender === 'boy') return false;
      if (p.ageRange === '0-12m' || p.ageRange === '1-3' || p.ageRange === '4-6' || p.ageRange === '7-9' || p.ageRange === '10-12') return false;
      return true;
    });
  }, []);

  // Categories present in this pool
  const categoriesList = useMemo(() => {
    const set = new Set<string>();
    mujerProducts.forEach((p) => {
      if (p.category) set.add(p.category);
    });
    return Array.from(set).sort();
  }, [mujerProducts]);

  // Filtered
  const filteredProducts = useMemo(() => {
    return mujerProducts.filter((p) => {
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
  }, [mujerProducts, selectedCategory, selectedPrice, searchQuery]);

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
        const aGirl = a.gender === 'girl' ? 1 : 0;
        const bGirl = b.gender === 'girl' ? 1 : 0;
        if (aGirl !== bGirl) return bGirl - aGirl;
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
        name: '¿Qué regalar a una mujer que parece tener de todo?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Para una mujer que ya tiene de todo, los regalos sensoriales y de autocuidado son la opción infalible: velas aromáticas de alta gama WoodWick con mecha de madera crujiente, brumas corporales virales (como Sol de Janeiro Cheirosa 68), mantas con peso para relax o un juego de tazas artesanales.',
        },
      },
      {
        '@type': 'Question',
        name: '¿Cuáles son los mejores regalos para mi novia en su cumpleaños o San Valentín?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Los detalles que combinan emoción y utilidad son los favoritos: cámaras de fotos instantáneas Instax Mini para crear recuerdos juntos, joyeros organizadores de viaje, perfumes icónicos o lámparas ambientales regulables con luz cálida.',
        },
      },
      {
        '@type': 'Question',
        name: '¿Qué regalar a una madre para sorprenderla?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'A las madres les encantan los regalos que les regalan tiempo para ellas mismas: difusores de aceites esenciales ultrasónicos, sets de baño y cuidado facial de ingredientes naturales, cafeteras para capuchino cremoso o libros inspiradores de autores aclamados.',
        },
      },
    ],
  };

  // Schema ItemList with Product Stars
  const itemListSchema = useMemo(() => {
    return generateProductItemListSchema(sortedProducts, 'Ideas de Regalo para Mujeres');
  }, [sortedProducts]);

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 flex flex-col">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListSchema) }}
      />

      <Header
        currentTheme="classic"
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
      />

      <main className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 w-full">
        {/* Breadcrumb */}
        <nav aria-label="Breadcrumb" className="mb-4 text-xs text-slate-600 flex items-center gap-1.5">
          <Link href="/" className="hover:underline hover:text-slate-900">Inicio</Link>
          <ChevronRight className="w-3.5 h-3.5 text-slate-500" />
          <span className="font-bold text-slate-900">Qué Regalar a una Mujer</span>
        </nav>

        {/* HERO BANNER */}
        <section className="bg-gradient-to-r from-slate-950 via-rose-950/60 to-purple-950 text-white rounded-3xl p-6 sm:p-10 mb-8 shadow-xl relative overflow-hidden border border-rose-900/40">
          <div className="absolute top-0 right-0 w-80 h-80 bg-rose-500/10 rounded-full blur-3xl pointer-events-none" />

          <div className="max-w-3xl relative z-10 space-y-3">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full text-xs font-bold bg-rose-500/20 text-rose-300 border border-rose-500/30">
              <Sparkles className="w-3.5 h-3.5 text-amber-300" />
              <span>Guía de Compras 2026 · Ideas Seleccionadas</span>
            </div>

            <h1 className="text-2xl sm:text-4xl lg:text-5xl font-black tracking-tight leading-tight">
              Un Buen Regalo para una Mujer:{' '}
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-rose-300 via-pink-200 to-amber-200">
                ¿Qué Regalar? Ideas de Regalos 2026
              </span>
            </h1>

            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed max-w-2xl">
              ¿Buscando el detalle perfecto para tu novia, madre, hermana o mejor amiga? Descubre regalos originales para mujer con opiniones contrastadas en Amazon: belleza viral, estilo, cuidado personal, lectura, hogar acogedor y sorpresas inolvidables.
            </p>

            <div className="flex flex-wrap items-center gap-4 pt-2 text-xs text-slate-300 font-medium">
              <span className="flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-emerald-400" />
                Garantía y Envíos Prime en {amazonSiteName}
              </span>
              <span className="flex items-center gap-1.5">
                <TrendingUp className="w-4 h-4 text-amber-400" />
                Solo valoraciones 4.5+ ★ con opiniones reales
              </span>
            </div>
          </div>
        </section>

        {/* VEREDICTO RÁPIDO: TOP 3 RECOMENDACIONES EN 5 SEGUNDOS */}
        <div className="mb-8 grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="p-4 rounded-2xl bg-amber-50/80 border-2 border-amber-300/80 shadow-xs flex flex-col justify-between">
            <div>
              <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[10px] font-black uppercase tracking-wider bg-amber-500 text-slate-950 mb-2">
                <span>🥇</span> Mejor Elección Global
              </span>
              <p className="font-bold text-sm text-slate-900 mb-1">Sol de Janeiro 68 / Paula&apos;s Choice</p>
              <p className="text-xs text-slate-600 leading-relaxed">
                El aroma floral y el tratamiento facial más deseados y virales. Un regalo de culto con el que es imposible fallar.
              </p>
            </div>
            <div className="mt-3 pt-2 border-t border-amber-200/60 flex items-center justify-between text-xs font-bold text-amber-900">
              <span>Valoración 4.8 ★</span>
              <span>Top Viral</span>
            </div>
          </div>

          <div className="p-4 rounded-2xl bg-emerald-50/80 border-2 border-emerald-300/80 shadow-xs flex flex-col justify-between">
            <div>
              <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[10px] font-black uppercase tracking-wider bg-emerald-700 text-white mb-2">
                <span>🥈</span> Mejor Calidad/Precio
              </span>
              <p className="font-bold text-sm text-slate-900 mb-1">Joyero Terciopelo / Vela WoodWick</p>
              <p className="text-xs text-slate-600 leading-relaxed">
                Detalles coquetos y muy útiles por menos de 25 €: organizador de joyas o velas que crepitan como chimenea.
              </p>
            </div>
            <div className="mt-3 pt-2 border-t border-emerald-200/60 flex items-center justify-between text-xs font-bold text-emerald-900">
              <span>Valoración 4.8 ★</span>
              <span>Económico y elegante</span>
            </div>
          </div>

          <div className="p-4 rounded-2xl bg-purple-50/80 border-2 border-purple-300/80 shadow-xs flex flex-col justify-between">
            <div>
              <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[10px] font-black uppercase tracking-wider bg-purple-700 text-white mb-2">
                <span>💎</span> Opción Prémium / Gran Detalle
              </span>
              <p className="font-bold text-sm text-slate-900 mb-1">Smartbox Spa / YSL Libre</p>
              <p className="text-xs text-slate-600 leading-relaxed">
                Experiencias de bienestar en más de 1.100 spas o alta perfumería parisina en frasco joya.
              </p>
            </div>
            <div className="mt-3 pt-2 border-t border-purple-200/60 flex items-center justify-between text-xs font-bold text-purple-900">
              <span>Valoración 4.9 ★</span>
              <span>Lujo & Bienestar</span>
            </div>
          </div>
        </div>

        {/* ENLAZADO INTERNO CRUZADO ESTRATÉGICO */}
        <div className="mb-6 p-3 bg-white rounded-2xl border border-slate-200 flex flex-wrap items-center justify-between gap-2 text-xs">
          <span className="font-bold text-slate-600 flex items-center gap-1.5">
            <Compass className="w-4 h-4 text-rose-600" />
            Explora otras guías recomendadas:
          </span>
          <div className="flex flex-wrap items-center gap-2">
            <Link href="/que-regalar-a-mi-novia" className="px-3 py-1 rounded-xl bg-rose-50 hover:bg-rose-100 text-rose-800 border border-rose-200 font-bold transition-colors">
              ❤️ ¿Es tu pareja? Ver Regalos para mi Novia →
            </Link>
            <Link href="/regalos-menos-20-euros" className="px-3 py-1 rounded-xl bg-emerald-50 hover:bg-emerald-100 text-emerald-800 border border-emerald-200 font-bold transition-colors">
              🏷️ Menos de 20 € →
            </Link>
            <Link href="/regalos-para-los-que-tienen-de-todo" className="px-3 py-1 rounded-xl bg-purple-50 hover:bg-purple-100 text-purple-800 border border-purple-200 font-bold transition-colors">
              ✨ Para los que Tienen de Todo →
            </Link>
            <Link href="/que-regalar-a-un-hombre" className="px-3 py-1 rounded-xl bg-indigo-50 hover:bg-indigo-100 text-indigo-800 border border-indigo-200 font-bold transition-colors">
              👨 Para Hombres →
            </Link>
          </div>
        </div>

        {/* CONTROL BAR: BUDGET PILLS + CATEGORIES + SORT */}
        <div className="bg-white border border-slate-200/90 rounded-2xl p-4 shadow-xs mb-6 space-y-3">
          <div className="flex flex-wrap items-center justify-between gap-3 pb-3 border-b border-slate-100">
            <div>
              <h2 className="text-base sm:text-lg font-black text-slate-900 tracking-tight flex items-center gap-2">
                <span>Regalos para Mujeres Seleccionados</span>
                <span className="text-xs font-bold text-rose-900 bg-rose-50 border border-rose-200 px-2.5 py-0.5 rounded-full">
                  {sortedProducts.length} ideas
                </span>
              </h2>
              <p className="text-[11px] text-slate-600">
                Filtra por presupuesto o estilo para dar en el clavo
              </p>
            </div>

            {/* Sorting */}
            <div className="flex items-center gap-1.5 bg-slate-50 border border-slate-200 rounded-xl px-2.5 py-1">
              <span className="text-[11px] text-slate-600 font-bold">Ordenar:</span>
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
            <span className="text-[11px] font-bold text-slate-600 uppercase tracking-wider shrink-0 mr-1">
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
                  ? 'bg-emerald-700 text-white'
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
                  ? 'bg-purple-700 text-white'
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
                  ? 'bg-rose-700 text-white'
                  : 'bg-rose-50 text-rose-800 hover:bg-rose-100 border border-rose-200'
              }`}
            >
              💎 Más de 100 €
            </button>
          </div>

          {/* Category Pills */}
          <div className="flex items-center gap-1.5 overflow-x-auto scrollbar-none text-xs pt-1 border-t border-slate-100">
            <span className="text-[11px] font-bold text-slate-600 uppercase tracking-wider shrink-0 mr-1">
              Categoría:
            </span>
            <button
              type="button"
              onClick={() => setSelectedCategory('all')}
              className={`px-2.5 py-1 rounded-lg text-xs font-semibold whitespace-nowrap transition-all cursor-pointer ${
                selectedCategory === 'all'
                  ? 'bg-slate-800 text-white'
                  : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
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
                    ? 'bg-rose-700 text-white'
                    : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
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
            <p className="text-slate-600 text-sm mb-4">No se han encontrado regalos para mujeres con estos filtros.</p>
            <button
              type="button"
              onClick={() => {
                setSelectedCategory('all');
                setSelectedPrice('all');
                setSearchQuery('');
              }}
              className="px-4 py-2 rounded-xl bg-slate-900 text-white text-xs font-bold hover:bg-slate-800 transition-colors cursor-pointer"
            >
              Ver todos los regalos para mujeres
            </button>
          </div>
        )}

        {/* EDITORIAL BUYING GUIDE FOR WOMEN */}
        <section className="bg-white rounded-3xl p-6 sm:p-10 mb-10 border border-slate-200 shadow-xs space-y-6">
          <h2 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
            Guía de Compra: Claves para Acertar al Regalar a una Mujer
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-xs sm:text-sm text-slate-600 leading-relaxed">
            <div className="space-y-2">
              <h3 className="font-bold text-slate-900 text-base flex items-center gap-2">
                <span>🌸</span> Bienestar y Autocuidado
              </h3>
              <p>
                Los regalos orientados a crear momentos de desconexión triunfan siempre: brumas corporales con fragancias gourmand (como vainilla o pistacho), bombas de baño artesanales, mascarillas faciales de cosmética coreana o mantas térmicas ultrasuaves.
              </p>
            </div>
            <div className="space-y-2">
              <h3 className="font-bold text-slate-900 text-base flex items-center gap-2">
                <span>📷</span> Recuerdos y Creatividad
              </h3>
              <p>
                Si buscas un regalo emotivo, una cámara instantánea (como la Instax Mini) permite capturar viajes y cenas con amigos en papel real. Los cuadernos de diseño con papel de alta densidad o los sets de acuarelas son ideales para personas creativas.
              </p>
            </div>
            <div className="space-y-2">
              <h3 className="font-bold text-slate-900 text-base flex items-center gap-2">
                <span>✨</span> Detalles Prácticos con Estilo
              </h3>
              <p>
                Un joyero de viaje compacto con cremallera, botellas térmicas con acabado mate, organizadores de maquillaje giratorios o lámparas de noche con cargador inalámbrico integrado combinan estética y funcionalidad en el día a día.
              </p>
            </div>
          </div>
        </section>

        {/* FAQ SECTION */}
        <section className="bg-white rounded-3xl p-6 sm:p-10 mb-12 border border-slate-200 shadow-xs">
          <div className="flex items-center gap-2 mb-4">
            <HelpCircle className="w-5 h-5 text-rose-600" />
            <h2 className="text-lg font-black text-slate-900">Preguntas Frecuentes sobre Regalos para Mujeres</h2>
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
