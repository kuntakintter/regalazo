'use client';

import React, { useState, useMemo, useCallback } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import ProductCard from '@/components/ProductCard';
import LiveAmazonProductCard from '@/components/LiveAmazonProductCard';
import AmazonLiveSearchCard from '@/components/AmazonLiveSearchCard';
import AmazonGridDiscoveryCard from '@/components/AmazonGridDiscoveryCard';
import ThemeAtmosphere from '@/components/ThemeAtmosphere';
import SocialShareWidget from '@/components/SocialShareWidget';
import {
  GAMING_PRODUCTS,
  GAMING_CATEGORIES,
  GAMING_BRANDS,
  GAMING_PRICE_RANGES,
} from '@/data/gamingData';
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
  Gamepad2,
  ArrowUpDown,
  Award,
  Sparkles,
  Zap,
  CheckCircle2,
  HelpCircle,
  ChevronDown,
} from 'lucide-react';
import { parsePrice, getAmazonProductUrl } from '@/lib/amazon';
import { generateProductItemListSchema } from '@/lib/schemaProduct';
import Link from 'next/link';
import Image from 'next/image';

const GAMING_FAQS = [
  {
    question: '¿Qué regalar a un gamer que ya tiene de todo?',
    answer: 'Cuando ya tiene consola o PC, regala accesorios de ergonomía y setup. Una barra de luz para monitor sin reflejos, una alfombrilla XXL micro-tejida o un soporte de cascos con base RGB son detalles universales que siempre encajan.'
  },
  {
    question: '¿Cuáles son los mejores regalos para gamers baratos por menos de 20 o 30 euros?',
    answer: 'Por menos de 30 € destacan el ratón Razer DeathAdder Essential (sensor óptico de 6.400 DPI), la lámpara ambiental oficial de PlayStation de Paladone, la alfombrilla gigante SteelSeries QcK Heavy o el soporte para cascos New Bee con luz RGB.'
  },
  {
    question: '¿Qué regalar a un novio o amigo gamer si no sé qué juegos le gustan?',
    answer: 'Evita comprar un juego concreto si no conoces sus gustos exactos. La apuesta segura son los periféricos universales: auriculares con audio 7.1 envolvente como los HyperX Cloud II o un ratón con botones extra como el Logitech G502 HERO.'
  },
  {
    question: '¿Los periféricos son compatibles con PC, PlayStation 5, Xbox y Nintendo Switch?',
    answer: 'Sí. Los auriculares con clavija jack 3.5 mm o USB y los mandos 2.4G ofrecen compatibilidad multiplataforma con PC, PS5, PS4, Xbox Series X/S y Switch. En cada ficha de producto indicamos la compatibilidad exacta.'
  }
];

export default function GamingPage() {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedBrand, setSelectedBrand] = useState<string>('Todas las marcas');
  const [selectedPrice, setSelectedPrice] = useState<string>('all');
  const [sortBy, setSortBy] = useState<'featured' | 'price-asc' | 'price-desc' | 'rating'>('featured');
  const [liveAmazonProducts, setLiveAmazonProducts] = useState<LiveSearchResult[]>([]);
  const [isLoadingLive, setIsLoadingLive] = useState(false);
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);

  // Filter local curated products
  const filteredProducts = useMemo(() => {
    return GAMING_PRODUCTS.filter((prod) => {
      if (selectedCategory !== 'all' && prod.category !== selectedCategory) return false;
      if (selectedBrand !== 'Todas las marcas' && prod.brand !== selectedBrand) return false;
      if (selectedPrice !== 'all') {
        if (selectedPrice === '<30' && prod.priceNumeric >= 30) return false;
        if (selectedPrice === '30-70' && (prod.priceNumeric < 30 || prod.priceNumeric > 70)) return false;
        if (selectedPrice === '70-150' && (prod.priceNumeric < 70 || prod.priceNumeric > 150)) return false;
        if (selectedPrice === '>150' && prod.priceNumeric < 150) return false;
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
        category: 'Gaming',
        subcategory: m.categoryLabel,
        imageUrl: m.imageUrl,
        images: [m.imageUrl],
        description: m.description,
        pros: m.pros,
        idealFor: m.idealFor,
        searchQuery: m.searchQuery,
        gender: 'unisex',
        ageRange: '+18',
        style: 'gamer',
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

  // Schema ItemList for Rich Snippets (Product Stars & Reviews)
  const itemListSchema = useMemo(() => {
    return generateProductItemListSchema(sortedDisplayProducts, 'Regalos para Gamers y Setup 2026');
  }, [sortedDisplayProducts]);

  // Schema FAQPage for Google Accordion Rich Snippets
  const faqSchema = useMemo(() => ({
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: GAMING_FAQS.map((item) => ({
      '@type': 'Question',
      name: item.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: item.answer,
      },
    })),
  }), []);

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

    if (selectedCategory === 'auriculares') parts.push('auriculares gaming microfono pc ps5');
    else if (selectedCategory === 'ratones') parts.push('raton gaming optico rgb logitech razer');
    else if (selectedCategory === 'teclados') parts.push('teclado mecanico gaming rgb');
    else if (selectedCategory === 'iluminacion') parts.push('barra luz monitor quntis led rgb setup');
    else if (selectedCategory === 'mandos') parts.push('mando pc ps5 xbox inalambrico');
    else if (selectedCategory === 'sillas') parts.push('cojin lumbar ergonomico silla gaming');
    else parts.push('regalos originales gaming setup accesorios');

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
      console.error('Error fetching live Amazon gaming products:', err);
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

  const toggleFaq = (idx: number) => {
    setOpenFaqIndex(openFaqIndex === idx ? null : idx);
  };

  return (
    <div className="min-h-screen relative flex flex-col bg-slate-50 text-slate-900 selection:bg-purple-600 selection:text-white">
      {/* Product Stars & Reviews ItemList Schema for Google */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListSchema) }}
      />
      {/* FAQ Schema for Google Rich Snippets */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      <ThemeAtmosphere />
      <Header currentTheme="gamer" />

      {/* Breadcrumb */}
      <nav aria-label="Breadcrumb" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-4 w-full text-xs text-slate-500 flex items-center gap-1.5">
        <Link href="/" className="hover:text-indigo-600 font-medium">Inicio</Link>
        <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
        <span className="font-bold text-slate-800">Especial Gaming & Setup</span>
      </nav>

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 w-full z-10">
        
        {/* HERO SECTION */}
        <section className="text-center py-6 sm:py-10 max-w-4xl mx-auto">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-bold mb-4 shadow-xs border border-purple-200 bg-purple-50 text-purple-900">
            <span className="flex h-2 w-2 rounded-full bg-emerald-500 animate-pulse"></span>
            <span>Edición Setup & eSports {new Date().getFullYear()} • Periféricos de Alto Rendimiento</span>
          </div>

          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black tracking-tight leading-[1.15] mb-5 text-slate-900">
            Un Buen Regalo para un Gamer:{' '}
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-600 via-indigo-600 to-pink-500">
              Ideas de Regalos, Setup y Chollos 2026
            </span>
          </h1>

          <p className="text-sm sm:text-base lg:text-lg text-slate-600 leading-relaxed mb-6 max-w-2xl mx-auto">
            ¿Buscas un buen regalo para un gamer barato o ideas originales para PC, PS5 y Switch? Auriculares con audio posicional 7.1, ratones de 25K DPI y accesorios recomendados por menos de 30 €.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-6 text-xs font-medium text-slate-500 mb-8">
            <span className="flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-emerald-500" />
              Garantía Oficial Amazon España
            </span>
            <span className="flex items-center gap-1.5">
              <TrendingUp className="w-4 h-4 text-purple-600" />
              Marcas Competitivas: Logitech G, HyperX, Razer
            </span>
            <span className="flex items-center gap-1.5">
              <BadgePercent className="w-4 h-4 text-amber-500" />
              Precios Mínimos Históricos Prime
            </span>
          </div>
        </section>

        {/* VEREDICTO RÁPIDO: TOP 3 REGALOS GAMERS 2026 */}
        <section className="mb-10 p-5 sm:p-8 rounded-3xl bg-gradient-to-br from-slate-900 via-purple-950 to-slate-900 text-white shadow-xl border border-purple-800/40 relative overflow-hidden">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6 pb-4 border-b border-purple-800/50">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <Award className="w-5 h-5 text-amber-400" />
                <span className="text-xs font-extrabold uppercase tracking-wider text-amber-400">
                  Comparativa y Selección Editorial
                </span>
              </div>
              <h2 className="text-xl sm:text-2xl font-black text-white tracking-tight">
                Veredicto Rápido: Los 3 Mejores Regalos para Gamers de 2026
              </h2>
            </div>
            <span className="text-xs text-purple-200 bg-purple-900/60 border border-purple-700/50 px-3 py-1.5 rounded-full shrink-0 self-start sm:self-auto">
              Actualizado Noviembre 2026
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 lg:gap-6">
            {/* Top 1: HyperX Cloud II */}
            <div className="bg-slate-800/90 rounded-2xl p-4 sm:p-5 border border-amber-400/40 flex flex-col justify-between relative group hover:border-amber-400 transition-all">
              <div className="absolute -top-3 right-4 px-3 py-0.5 rounded-full bg-amber-400 text-slate-950 font-black text-[10px] uppercase tracking-wider shadow-md">
                🥇 El Mejor Regalo Global
              </div>
              <div>
                <div className="w-full h-36 relative mb-3 bg-white/5 rounded-xl overflow-hidden flex items-center justify-center p-2">
                  <Image
                    src="/images/products/game-auriculares-hyperx-cloud-2-1.jpg"
                    alt="HyperX Cloud II Auriculares Gaming"
                    width={140}
                    height={140}
                    className="object-contain max-h-32 group-hover:scale-105 transition-transform"
                  />
                </div>
                <div className="flex items-center justify-between gap-2 mb-1">
                  <span className="text-[11px] font-bold text-amber-400 uppercase">HyperX</span>
                  <span className="text-base font-black text-white">74,99 €</span>
                </div>
                <h3 className="text-sm font-bold text-white mb-2 line-clamp-2">
                  HyperX Cloud II Auriculares con Audio 7.1
                </h3>
                <ul className="text-xs text-slate-300 space-y-1 mb-4">
                  <li className="flex items-center gap-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                    <span>Sonido posicional para escuchar pasos</span>
                  </li>
                  <li className="flex items-center gap-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                    <span>Almohadillas memory foam ultrasuaves</span>
                  </li>
                  <li className="flex items-center gap-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                    <span>Compatible con PC, PS5, Switch y Xbox</span>
                  </li>
                </ul>
              </div>
              <a
                href={getAmazonProductUrl('', 'hyperx cloud ii auriculares gaming 7.1')}
                target="_blank"
                rel="nofollow noopener noreferrer"
                className="w-full py-2.5 px-4 rounded-xl bg-amber-400 hover:bg-amber-300 text-slate-950 font-black text-xs text-center shadow-md transition-all flex items-center justify-center gap-1.5 cursor-pointer"
              >
                <span>Ver Mejor Oferta en Amazon</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </a>
            </div>

            {/* Top 2: Logitech G502 HERO */}
            <div className="bg-slate-800/90 rounded-2xl p-4 sm:p-5 border border-purple-400/30 flex flex-col justify-between relative group hover:border-purple-400 transition-all">
              <div className="absolute -top-3 right-4 px-3 py-0.5 rounded-full bg-purple-400 text-slate-950 font-black text-[10px] uppercase tracking-wider shadow-md">
                🥈 Mejor Calidad / Precio
              </div>
              <div>
                <div className="w-full h-36 relative mb-3 bg-white/5 rounded-xl overflow-hidden flex items-center justify-center p-2">
                  <Image
                    src="/images/products/game-raton-logitech-g502-hero-1.jpg"
                    alt="Logitech G502 HERO Ratón Gaming"
                    width={140}
                    height={140}
                    className="object-contain max-h-32 group-hover:scale-105 transition-transform"
                  />
                </div>
                <div className="flex items-center justify-between gap-2 mb-1">
                  <span className="text-[11px] font-bold text-purple-300 uppercase">Logitech G</span>
                  <span className="text-base font-black text-white">47,90 €</span>
                </div>
                <h3 className="text-sm font-bold text-white mb-2 line-clamp-2">
                  Logitech G502 HERO Ratón 25.600 DPI
                </h3>
                <ul className="text-xs text-slate-300 space-y-1 mb-4">
                  <li className="flex items-center gap-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                    <span>Sensor HERO 25K de precisión eSports</span>
                  </li>
                  <li className="flex items-center gap-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                    <span>11 botones programables y rueda rápida</span>
                  </li>
                  <li className="flex items-center gap-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                    <span>5 pesas ajustables de 3,6g incluidas</span>
                  </li>
                </ul>
              </div>
              <a
                href={getAmazonProductUrl('B07GS6ZB7T', 'logitech g502 hero raton gaming rgb 25k')}
                target="_blank"
                rel="nofollow noopener noreferrer"
                className="w-full py-2.5 px-4 rounded-xl bg-purple-400 hover:bg-purple-300 text-slate-950 font-black text-xs text-center shadow-md transition-all flex items-center justify-center gap-1.5 cursor-pointer"
              >
                <span>Ver Mejor Oferta en Amazon</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </a>
            </div>

            {/* Top 3: Razer DeathAdder Essential (<25€) */}
            <div className="bg-slate-800/90 rounded-2xl p-4 sm:p-5 border border-emerald-400/30 flex flex-col justify-between relative group hover:border-emerald-400 transition-all">
              <div className="absolute -top-3 right-4 px-3 py-0.5 rounded-full bg-emerald-400 text-slate-950 font-black text-[10px] uppercase tracking-wider shadow-md">
                🥉 Mejor Chollo Barato (&lt;25 €)
              </div>
              <div>
                <div className="w-full h-36 relative mb-3 bg-white/5 rounded-xl overflow-hidden flex items-center justify-center p-2">
                  <Image
                    src="/images/products/game-raton-razer-deathadder-essential-1.jpg"
                    alt="Razer DeathAdder Essential"
                    width={140}
                    height={140}
                    className="object-contain max-h-32 group-hover:scale-105 transition-transform"
                  />
                </div>
                <div className="flex items-center justify-between gap-2 mb-1">
                  <span className="text-[11px] font-bold text-emerald-300 uppercase">Razer</span>
                  <span className="text-base font-black text-white">24,99 €</span>
                </div>
                <h3 className="text-sm font-bold text-white mb-2 line-clamp-2">
                  Razer DeathAdder Essential Óptico 6.400 DPI
                </h3>
                <ul className="text-xs text-slate-300 space-y-1 mb-4">
                  <li className="flex items-center gap-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                    <span>Ergonomía mítica Razer supercómoda</span>
                  </li>
                  <li className="flex items-center gap-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                    <span>Sensor 6.400 DPI sin retardo</span>
                  </li>
                  <li className="flex items-center gap-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                    <span>El mejor ratón gaming de marca por 25€</span>
                  </li>
                </ul>
              </div>
              <a
                href={getAmazonProductUrl('', 'razer deathadder essential raton gaming 6400 dpi')}
                target="_blank"
                rel="nofollow noopener noreferrer"
                className="w-full py-2.5 px-4 rounded-xl bg-emerald-400 hover:bg-emerald-300 text-slate-950 font-black text-xs text-center shadow-md transition-all flex items-center justify-center gap-1.5 cursor-pointer"
              >
                <span>Ver Mejor Oferta en Amazon</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>
        </section>

        {/* BANNER DESTACADO ESPECIAL GTA 6 / GTA VI */}
        <div className="mb-8 p-5 sm:p-6 rounded-3xl bg-gradient-to-r from-[#180e29] via-[#0f172a] to-[#200924] border border-pink-500/40 text-white shadow-xl relative overflow-hidden flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="absolute -top-12 -right-12 w-48 h-48 bg-pink-500/20 rounded-full blur-2xl pointer-events-none" />
          <div className="flex items-center gap-4 relative z-10">
            <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-pink-500 to-cyan-500 flex items-center justify-center shrink-0 shadow-lg text-2xl">
              🌴
            </div>
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className="px-2.5 py-0.5 rounded-full bg-pink-500/30 text-pink-300 font-black text-[10px] tracking-wide uppercase border border-pink-400/30">
                  Especial Lanzamiento
                </span>
                <span className="text-xs text-cyan-300 font-bold">Grand Theft Auto VI</span>
              </div>
              <h3 className="text-base sm:text-lg font-black text-white">
                ¿Buscando regalos para fans de GTA 6 y GTA VI?
              </h3>
              <p className="text-xs sm:text-sm text-slate-300">
                Descubre mandos PS5 Nova Pink, lámparas neón Vice City, camisetas retro y tarjetas de reserva en Amazon España.
              </p>
            </div>
          </div>
          <Link
            href="/regalos-gta-6"
            className="shrink-0 px-6 py-3 rounded-2xl bg-gradient-to-r from-pink-500 via-purple-600 to-cyan-500 hover:from-pink-600 hover:to-cyan-600 text-white font-black text-xs sm:text-sm shadow-lg hover:scale-105 transition-all flex items-center gap-2 cursor-pointer relative z-10"
          >
            <span>Explorar Merch GTA 6</span>
            <ChevronRight className="w-4 h-4" />
          </Link>
        </div>

        {/* FILTER BAR */}
        <div className="bg-white rounded-3xl border border-slate-200 p-5 sm:p-6 mb-8 shadow-xs">
          <div className="mb-5">
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-500 flex items-center gap-1.5">
                <Filter className="w-3.5 h-3.5 text-purple-600" />
                <span>¿Qué periférico o gadget buscas?</span>
              </span>
              <span className="text-xs font-semibold text-slate-400">
                {displayProducts.length + liveAmazonProducts.length} ideas
              </span>
            </div>

            <div className="flex flex-wrap items-center gap-2">
              {GAMING_CATEGORIES.map((cat) => (
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
                Marca gaming
              </label>
              <select
                value={selectedBrand}
                onChange={(e) => {
                  setSelectedBrand(e.target.value);
                  setLiveAmazonProducts([]);
                }}
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 bg-slate-50 text-slate-800 text-xs font-semibold focus:border-purple-500 focus:bg-white outline-none cursor-pointer"
              >
                {GAMING_BRANDS.map((brand) => (
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
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 bg-slate-50 text-slate-800 text-xs font-semibold focus:border-purple-500 focus:bg-white outline-none cursor-pointer"
              >
                {GAMING_PRICE_RANGES.map((pr) => (
                  <option key={pr.id} value={pr.id}>{pr.label}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-[11px] font-bold text-slate-500 uppercase tracking-wider mb-1.5 flex items-center gap-1.5">
                <ArrowUpDown className="w-3.5 h-3.5 text-purple-600" />
                <span>Ordenar productos</span>
              </label>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as any)}
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 bg-slate-50 text-slate-800 text-xs font-semibold focus:border-purple-500 focus:bg-white outline-none cursor-pointer"
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
                Filtros activos en gaming {sortBy !== 'featured' && `• Orden: ${sortBy === 'price-asc' ? 'Menor a mayor precio' : sortBy === 'price-desc' ? 'Mayor a menor precio' : 'Mejor valorados'}`}
              </span>
              <button
                onClick={handleResetFilters}
                className="text-xs font-bold text-purple-700 hover:text-purple-900 underline cursor-pointer"
              >
                Limpiar todos los filtros
              </button>
            </div>
          )}
        </div>

        {/* PRODUCTS GRID */}
        {sortedDisplayProducts.length > 0 ? (
          <>
            <section className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-2 sm:gap-2.5 lg:gap-3 mb-12">
              {sortedDisplayProducts.map((product) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  currentTheme="gamer"
                />
              ))}

              {sortedLiveAmazonProducts.map((liveProd) => (
                <LiveAmazonProductCard
                  key={liveProd.asin}
                  product={liveProd}
                  categoryLabel="Gaming Amazon"
                  badgeLabel="Top Ventas Setup"
                />
              ))}

              <AmazonGridDiscoveryCard
                searchQuery={liveSearchQuery}
                selectedCategory="Mundo Gaming"
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
                    <span>Ver más productos de gaming en directo (+8 opciones)</span>
                  </>
                )}
              </button>
            </div>
          </>
        ) : sortedLiveAmazonProducts.length > 0 ? (
          <div className="mb-16">
            <div className="mb-6 p-4 sm:p-5 bg-gradient-to-r from-purple-50 via-indigo-50 to-amber-50 border border-purple-200 rounded-3xl flex flex-wrap items-center justify-between gap-3 shadow-xs">
              <div className="flex items-center gap-3 text-purple-950 font-bold text-sm">
                <span className="p-2 bg-purple-500/20 text-purple-700 rounded-xl">
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
                className="text-xs bg-white text-purple-900 px-4 py-2 rounded-xl border border-purple-200 font-bold hover:bg-purple-100 transition-all shadow-xs cursor-pointer"
              >
                Restablecer filtros
              </button>
            </div>

            <section className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-2 sm:gap-2.5 lg:gap-3 mb-12">
              {sortedLiveAmazonProducts.map((liveProd) => (
                <LiveAmazonProductCard
                  key={liveProd.asin}
                  product={liveProd}
                  categoryLabel="Gaming Amazon"
                  badgeLabel="Top Ventas Setup"
                />
              ))}

              <AmazonGridDiscoveryCard
                searchQuery={liveSearchQuery}
                selectedCategory="Mundo Gaming"
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
          <div className="py-20 mb-16 text-center flex flex-col items-center justify-center gap-3 bg-white/80 rounded-3xl border border-purple-100 shadow-xs">
            <Loader2 className="w-10 h-10 animate-spin text-purple-600" />
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
            currentTheme="gamer"
            initialQuery="accesorios gaming setup escritorio"
            selectedPrice={selectedPrice}
          />
        </div>

        {/* SEO BUYING GUIDE */}
        <section className="rounded-3xl p-6 sm:p-10 mb-8 border border-slate-200 bg-white text-slate-800 shadow-xs">
          <h2 className="text-2xl sm:text-3xl font-black mb-5 tracking-tight text-slate-900 flex items-center gap-2.5">
            <Gamepad2 className="w-7 h-7 text-purple-600" />
            <span>Guía de Compra: ¿Cómo acertar con un regalo para gamers?</span>
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-xs sm:text-sm leading-relaxed text-slate-600 mb-6">
            <div className="space-y-2">
              <h3 className="font-bold text-base text-slate-900">
                🎧 El secreto del audio posicional en shooters
              </h3>
              <p>
                En juegos como Call of Duty, Fortnite o CS:GO, la diferencia está en escuchar la dirección de los pasos. Unos auriculares como los <strong>HyperX Cloud II</strong> con drivers de 53 mm y almohadillas memory foam son el estándar de sonido y confort.
              </p>
            </div>

            <div className="space-y-2">
              <h3 className="font-bold text-base text-slate-900">
                🖱️ Ratón ergonómico con sensor óptico de alta precisión
              </h3>
              <p>
                Los ratones de oficina fallan al realizar giros rápidos en pantalla. Modelos legendarios como el <strong>Logitech G502 HERO</strong> ofrecen 25.600 DPI, pesas ajustables y botones mapeables para recargar o usar habilidades al vuelo.
              </p>
            </div>

            <div className="space-y-2">
              <h3 className="font-bold text-base text-slate-900">
                💡 Barras de luz para monitor: Cero reflejos y relax visual
              </h3>
              <p>
                Una de las mayores tendencias de setup es la barra de luz para monitor. Alumbra el teclado sin rebotar luz en la pantalla, reduciendo el dolor de cabeza y la sequedad de ojos en partidas nocturnas.
              </p>
            </div>
          </div>

          <div className="pt-6 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="text-xs text-slate-500">
              ¿Te han gustado estas recomendaciones gamer? Compártelas con tus amigos o grupo de juego.
            </div>
            <SocialShareWidget
              url="https://www.unbuenregalo.es/gaming"
              title="Los Mejores Regalos para Gamers y Setup 2026 | Un Buen Regalo"
            />
          </div>
        </section>

        {/* FAQS SECTION (FAQPage SCHEMA COMPLIANT) */}
        <section className="rounded-3xl p-6 sm:p-10 mb-12 border border-slate-200 bg-white text-slate-900 shadow-xs">
          <div className="flex items-center gap-2 mb-3">
            <HelpCircle className="w-5 h-5 text-purple-600" />
            <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
              Preguntas Frecuentes de la Comunidad Gamer
            </span>
          </div>

          <h2 className="text-2xl sm:text-3xl font-black mb-6 tracking-tight text-slate-900">
            Dudas resueltas sobre regalos gaming y setup
          </h2>

          <div className="space-y-3">
            {GAMING_FAQS.map((faq, idx) => {
              const isOpen = openFaqIndex === idx;
              return (
                <div
                  key={idx}
                  className={`rounded-2xl border transition-all ${
                    isOpen
                      ? 'border-purple-300 bg-purple-50/40 shadow-xs'
                      : 'border-slate-200 hover:border-slate-300 bg-white'
                  }`}
                >
                  <button
                    onClick={() => toggleFaq(idx)}
                    className="w-full text-left px-5 py-4 flex items-center justify-between gap-4 font-bold text-sm sm:text-base text-slate-900 cursor-pointer"
                  >
                    <span>{faq.question}</span>
                    <ChevronDown
                      className={`w-5 h-5 text-slate-400 shrink-0 transition-transform duration-200 ${
                        isOpen ? 'rotate-180 text-purple-600' : ''
                      }`}
                    />
                  </button>

                  {isOpen && (
                    <div className="px-5 pb-5 pt-1 text-xs sm:text-sm text-slate-600 leading-relaxed border-t border-purple-100/60 mt-1">
                      {faq.answer}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </section>

      </main>

      <Footer currentTheme="classic" />
    </div>
  );
}
