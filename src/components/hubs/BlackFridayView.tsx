'use client';

import React, { useState, useMemo, useEffect, useCallback } from 'react';
import Link from 'next/link';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import ProductCard from '@/components/ProductCard';
import LiveAmazonProductCard from '@/components/LiveAmazonProductCard';
import { ALL_SITE_PRODUCTS } from '@/data/allCatalogProducts';
import { AGE_CATEGORIES } from '@/data/products';
import { LiveSearchResult } from '@/app/api/live-search/route';
import { parsePrice, getAmazonSearchUrl } from '@/lib/amazon';
import { matchesSearchQuery } from '@/utils/search';
import { useActiveLocale } from '@/hooks/useActiveLocale';
import {
  Search,
  SlidersHorizontal,
  ArrowDownWideNarrow,
  Tag,
  Clock,
  ShieldCheck,
  Sparkles,
  Loader2,
  RefreshCw,
  ExternalLink,
  X,
  ChevronRight,
  Percent,
  CheckCircle2,
  RotateCcw,
} from 'lucide-react';

interface BazaarCategory {
  id: string;
  label: string;
  emoji: string;
  amazonQueryEs: string;
  amazonQueryEn: string;
  catalogKeywords: string[];
}

const BAZAAR_CATEGORIES: BazaarCategory[] = [
  {
    id: 'all',
    label: 'Todas las categorías',
    emoji: '🛍️',
    amazonQueryEs: 'ofertas black friday',
    amazonQueryEn: 'black friday deals',
    catalogKeywords: [],
  },
  {
    id: 'tech',
    label: 'Tecnología y Gadgets',
    emoji: '💻',
    amazonQueryEs: 'ofertas black friday tecnologia gadgets auriculares',
    amazonQueryEn: 'black friday tech gadgets deals',
    catalogKeywords: ['tecnolog', 'gadget', 'electr', 'smartwatch', 'auricular', 'altavoz', 'tablet', 'drone'],
  },
  {
    id: 'home',
    label: 'Hogar y Cocina',
    emoji: '🏠',
    amazonQueryEs: 'ofertas black friday hogar cocina freidora aire cafetera robot aspirador',
    amazonQueryEn: 'black friday home kitchen air fryer coffee deals',
    catalogKeywords: ['hogar', 'cocina', 'caf', 'decoraci', 'manta', 'lámpara', 'vela'],
  },
  {
    id: 'gaming',
    label: 'Gaming y Consolas',
    emoji: '🎮',
    amazonQueryEs: 'ofertas black friday gaming ps5 nintendo switch teclado raton',
    amazonQueryEn: 'black friday gaming ps5 nintendo switch headset deals',
    catalogKeywords: ['gaming', 'gamer', 'videojuego', 'ps5', 'nintendo', 'gta', 'simracing'],
  },
  {
    id: 'toys',
    label: 'Juguetes y LEGO',
    emoji: '🧱',
    amazonQueryEs: 'ofertas black friday juguetes lego juegos de mesa',
    amazonQueryEn: 'black friday toys lego board games deals',
    catalogKeywords: ['lego', 'juguete', 'mesa', 'carta', 'pokémon', 'pokemon', 'figura', 'scalextric', 'manualidad'],
  },
  {
    id: 'beauty',
    label: 'Perfumería y Belleza',
    emoji: '✨',
    amazonQueryEs: 'ofertas black friday perfumes colonias cosmetica cuidado facial',
    amazonQueryEn: 'black friday perfume skincare beauty deals',
    catalogKeywords: ['perfum', 'colonia', 'fragancia', 'skincare', 'cosm', 'belleza', 'bruma'],
  },
  {
    id: 'fashion',
    label: 'Moda y Zapatillas',
    emoji: '👟',
    amazonQueryEs: 'ofertas black friday ropa zapatillas moda accesorios',
    amazonQueryEn: 'black friday fashion sneakers clothing deals',
    catalogKeywords: ['moda', 'ropa', 'accesorio', 'zapatilla', 'reloj', 'bolso', 'mochila'],
  },
  {
    id: 'phones',
    label: 'Smartphones y Audio',
    emoji: '📱',
    amazonQueryEs: 'ofertas black friday smartphone movil auriculares bluetooth',
    amazonQueryEn: 'black friday smartphone headphones earbuds deals',
    catalogKeywords: ['smartphone', 'telefon', 'móvil', 'audio', 'auricular', 'altavoz'],
  },
  {
    id: 'wheels',
    label: 'Motor, Bicis y Ruedas',
    emoji: '🏎️',
    amazonQueryEs: 'ofertas black friday patinete electrico bicicleta moto coche',
    amazonQueryEn: 'black friday electric scooter bike motorcycle car deals',
    catalogKeywords: ['rueda', 'coche', 'moto', 'patinete', 'bici', 'ciclismo', 'competición', 'automóvil'],
  },
  {
    id: 'books',
    label: 'Libros y Ocio',
    emoji: '📚',
    amazonQueryEs: 'ofertas black friday libros kindle lectores ocio',
    amazonQueryEn: 'black friday books kindle deals',
    catalogKeywords: ['libro', 'lectura', 'literatura', 'novela', 'cómic'],
  },
  {
    id: 'baby',
    label: 'Bebés y Familia',
    emoji: '👶',
    amazonQueryEs: 'ofertas black friday bebe pañales cochecito montessori',
    amazonQueryEn: 'black friday baby stroller montessori deals',
    catalogKeywords: ['bebé', 'bebe', 'pañal', 'cochecito', 'montessori', 'revelación'],
  },
];

const QUICK_PRICE_PRESETS = [
  { id: 'all', label: 'Todos los precios', min: '', max: '' },
  { id: '<15', label: 'Menos de 15 €', min: '', max: '15' },
  { id: '15-30', label: '15 € – 30 €', min: '15', max: '30' },
  { id: '30-60', label: '30 € – 60 €', min: '30', max: '60' },
  { id: '60-120', label: '60 € – 120 €', min: '60', max: '120' },
  { id: '>120', label: 'Más de 120 €', min: '120', max: '' },
];

const TRENDING_BF_CHIPS = [
  { label: '🎧 Auriculares', query: 'ofertas black friday auriculares inalambricos' },
  { label: '🍟 Freidoras de aire', query: 'ofertas black friday freidora de aire' },
  { label: '🧱 LEGO', query: 'ofertas black friday lego' },
  { label: '🎮 PS5 y Gaming', query: 'ofertas black friday ps5 gaming' },
  { label: '☕ Cafeteras', query: 'ofertas black friday cafetera espresso' },
  { label: '🧴 Perfumes', query: 'ofertas black friday perfume hombre mujer' },
  { label: '⌚ Smartwatches', query: 'ofertas black friday smartwatch reloj inteligente' },
  { label: '🛴 Patinetes', query: 'ofertas black friday patinete electrico' },
  { label: '📱 Smartphones', query: 'ofertas black friday smartphone movil' },
  { label: '🤖 Robots aspirador', query: 'ofertas black friday robot aspirador' },
];

const AGE_QUERY_MAP: Record<string, { es: string; en: string }> = {
  '0-12m': { es: 'bebe recien nacido', en: 'baby newborn' },
  '1-3': { es: 'juguetes ninos 1 3 anos montessori', en: 'toddler toys 1 3 years' },
  '4-6': { es: 'juguetes ninos 4 6 anos', en: 'kids toys 4 6 years' },
  '7-9': { es: 'juguetes ninos 7 9 anos', en: 'kids toys 7 9 years' },
  '10-12': { es: 'regalos ninos 10 12 anos', en: 'tweens gifts 10 12 years' },
  '13-15': { es: 'regalos adolescentes 13 15 anos', en: 'teen gifts 13 15 years' },
  '16-18': { es: 'regalos jovenes 16 18 anos', en: 'young adult gifts 16 18' },
  '+18': { es: 'regalos adultos hombre mujer', en: 'adult gifts men women' },
};

const BF_FAQS = [
  {
    q: '¿Son reales los precios y descuentos que aparecen en Black Friday?',
    a: 'Sí. Nuestro buscador consulta en tiempo real las fichas activas de Amazon y únicamente muestra el precio tachado, el porcentaje de descuento (-%) y el ahorro en euros cuando Amazon publica oficialmente un precio anterior superior al precio en oferta. Nunca inventamos precios ni imágenes.',
  },
  {
    q: '¿Cómo encontrar los mayores descuentos primero?',
    a: 'Por defecto ordenamos las ofertas en directo de mayor a menor porcentaje de descuento real (%). Además, puedes activar el filtro "Solo con descuento verificado (%)" para ver exclusivamente productos con rebaja confirmada y combinarlo con tu rango de precio mínimo y máximo.',
  },
  {
    q: '¿Los enlaces de cada producto funcionan y tienen garantía oficial?',
    a: 'Todos los productos enlazan directamente con su ficha oficial verificada en Amazon mediante su código ASIN único, manteniendo envío rápido Prime, stock actualizado en directo y la garantía oficial de devolución ampliada para Navidad.',
  },
  {
    q: '¿Puedo buscar cualquier producto específico que no salga en la primera página?',
    a: 'Sí. Usa el buscador propio de Black Friday para escribir cualquier marca, modelo o idea (por ejemplo "freidora Cosori", "LEGO Star Wars", "Sony WH-1000XM4" o "perfume mujer") y verás al instante las ofertas reales disponibles con su foto original y ahorro aplicado.',
  },
];

function BlackFridayCountdown() {
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const compute = () => {
      const now = new Date();
      // Target Cyber Monday end (Nov 30, 2026 23:59:59) or next Black Friday if already past
      let target = new Date('2026-11-27T23:59:59+01:00');
      if (now.getTime() > target.getTime()) {
        target = new Date('2026-11-30T23:59:59+01:00');
      }
      const diff = Math.max(0, target.getTime() - now.getTime());
      const days = Math.floor(diff / (1000 * 60 * 60 * 24));
      const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
      const minutes = Math.floor((diff / (1000 * 60)) % 60);
      const seconds = Math.floor((diff / 1000) % 60);
      setTimeLeft({ days, hours, minutes, seconds });
    };
    compute();
    const id = setInterval(compute, 1000);
    return () => clearInterval(id);
  }, []);

  if (!mounted) {
    return (
      <div className="flex items-center gap-1.5 text-xs font-black text-amber-300">
        <Clock className="w-4 h-4" />
        <span>BLACK FRIDAY EN DIRECTO</span>
      </div>
    );
  }

  return (
    <div className="flex items-center gap-2">
      {[
        { val: timeLeft.days, label: 'DÍAS' },
        { val: timeLeft.hours, label: 'HRS' },
        { val: timeLeft.minutes, label: 'MIN' },
        { val: timeLeft.seconds, label: 'SEG' },
      ].map((unit) => (
        <div
          key={unit.label}
          className="flex flex-col items-center justify-center min-w-[46px] px-2 py-1.5 rounded-xl bg-white/10 border border-amber-400/40 backdrop-blur-xs"
        >
          <span className="text-base sm:text-lg font-black text-white leading-none tabular-nums">
            {String(unit.val).padStart(2, '0')}
          </span>
          <span className="text-[9px] font-bold text-amber-300 tracking-wider mt-0.5">
            {unit.label}
          </span>
        </div>
      ))}
    </div>
  );
}

export default function BlackFridayView() {
  const { localeKey, localePath, amazonRegion, amazonSiteName, isRtl } = useActiveLocale();
  const isEs = localeKey === 'es' || localeKey === 'es-us';

  const [searchInput, setSearchInput] = useState('');
  const [activeQuery, setActiveQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedAge, setSelectedAge] = useState<string>('all');
  const [minPrice, setMinPrice] = useState<string>('');
  const [maxPrice, setMaxPrice] = useState<string>('');
  const [activePricePreset, setActivePricePreset] = useState<string>('all');
  const [sortBy, setSortBy] = useState<'discount-desc' | 'price-asc' | 'price-desc' | 'rating' | 'featured'>('discount-desc');
  const [dealsOnly, setDealsOnly] = useState<boolean>(false);

  // Live Amazon Bazaar results state
  const [liveProducts, setLiveProducts] = useState<LiveSearchResult[]>([]);
  const [isLoadingLive, setIsLoadingLive] = useState<boolean>(true);
  const [isLoadingMore, setIsLoadingMore] = useState<boolean>(false);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [hasMorePages, setHasMorePages] = useState<boolean>(true);
  const [catalogVisibleCount, setCatalogVisibleCount] = useState<number>(18);

  const selectedCategoryObj = useMemo(
    () => BAZAAR_CATEGORIES.find((c) => c.id === selectedCategory) || BAZAAR_CATEGORIES[0],
    [selectedCategory]
  );

  // Build the real Amazon search query from user search + category + age
  const computedLiveQuery = useMemo(() => {
    const parts: string[] = [];
    if (activeQuery.trim().length >= 2) {
      const q = activeQuery.trim();
      parts.push(q);
      if (!/black friday|oferta|deal/i.test(q)) {
        parts.push(isEs ? 'oferta black friday' : 'black friday deal');
      }
    } else {
      parts.push(isEs ? selectedCategoryObj.amazonQueryEs : selectedCategoryObj.amazonQueryEn);
    }

    if (selectedAge !== 'all' && AGE_QUERY_MAP[selectedAge]) {
      parts.push(isEs ? AGE_QUERY_MAP[selectedAge].es : AGE_QUERY_MAP[selectedAge].en);
    }

    return parts.join(' ').trim();
  }, [activeQuery, selectedCategoryObj, selectedAge, isEs]);

  const fetchLiveDeals = useCallback(
    async (pageToFetch: number, append: boolean) => {
      if (append) setIsLoadingMore(true);
      else setIsLoadingLive(true);

      try {
        const params = new URLSearchParams();
        params.set('q', computedLiveQuery);
        params.set('region', amazonRegion);
        params.set('limit', '32');
        params.set('page', String(pageToFetch));
        params.set('sort', sortBy);
        if (minPrice.trim() && Number(minPrice) > 0) params.set('minPrice', minPrice.trim());
        if (maxPrice.trim() && Number(maxPrice) > 0) params.set('maxPrice', maxPrice.trim());
        if (dealsOnly) params.set('dealsOnly', '1');

        const res = await fetch(`/api/live-search?${params.toString()}`);
        const data = await res.json();

        if (data.success && Array.isArray(data.results)) {
          const incoming: LiveSearchResult[] = data.results;
          if (append) {
            setLiveProducts((prev) => {
              const seen = new Set(prev.map((p) => p.asin));
              const merged = [...prev];
              for (const item of incoming) {
                if (!seen.has(item.asin)) {
                  seen.add(item.asin);
                  merged.push(item);
                }
              }
              return merged;
            });
          } else {
            setLiveProducts(incoming);
          }
          setHasMorePages(incoming.length >= 6 && pageToFetch < 10);
        } else if (!append) {
          setLiveProducts([]);
          setHasMorePages(false);
        }
      } catch {
        if (!append) {
          setLiveProducts([]);
          setHasMorePages(false);
        }
      } finally {
        setIsLoadingLive(false);
        setIsLoadingMore(false);
      }
    },
    [computedLiveQuery, amazonRegion, sortBy, minPrice, maxPrice, dealsOnly]
  );

  // Trigger live fetch whenever filters or search change (with gentle debounce)
  useEffect(() => {
    setCurrentPage(1);
    const timer = setTimeout(() => {
      fetchLiveDeals(1, false);
    }, 220);
    return () => clearTimeout(timer);
  }, [fetchLiveDeals]);

  // Client-side sorting of live products (always exact)
  const displayedLiveProducts = useMemo(() => {
    let list = [...liveProducts];
    const minVal = parseFloat(minPrice) || 0;
    const maxVal = parseFloat(maxPrice) || 0;

    if (minVal > 0 || maxVal > 0) {
      list = list.filter((item) => {
        const p = parsePrice(item.priceText);
        if (p <= 0) return true;
        if (minVal > 0 && p < minVal) return false;
        if (maxVal > 0 && p > maxVal) return false;
        return true;
      });
    }

    if (dealsOnly) {
      list = list.filter((item) => Boolean(item.discountPercent && item.discountPercent > 0));
    }

    if (sortBy === 'discount-desc') {
      list.sort((a, b) => (b.discountPercent || 0) - (a.discountPercent || 0));
    } else if (sortBy === 'price-asc') {
      list.sort((a, b) => parsePrice(a.priceText) - parsePrice(b.priceText));
    } else if (sortBy === 'price-desc') {
      list.sort((a, b) => parsePrice(b.priceText) - parsePrice(a.priceText));
    } else if (sortBy === 'rating') {
      list.sort((a, b) => (b.rating || 0) - (a.rating || 0));
    }

    return list;
  }, [liveProducts, minPrice, maxPrice, dealsOnly, sortBy]);

  // Verified local catalog products matching the exact same filters (for instant browsing & SEO)
  const filteredCatalogProducts = useMemo(() => {
    const minVal = parseFloat(minPrice) || 0;
    const maxVal = parseFloat(maxPrice) || 0;
    const q = activeQuery.trim();

    let list = ALL_SITE_PRODUCTS.filter((prod) => {
      if (selectedAge !== 'all' && prod.ageRange !== selectedAge) return false;

      if (selectedCategory !== 'all' && selectedCategoryObj.catalogKeywords.length > 0) {
        const haystack = `${prod.category} ${prod.subcategory} ${prod.title} ${prod.description}`.toLowerCase();
        const matchesCat = selectedCategoryObj.catalogKeywords.some((kw) => haystack.includes(kw));
        if (!matchesCat) return false;
      }

      if (q.length >= 2 && !matchesSearchQuery(prod, q)) return false;

      const num = parsePrice(prod.priceText);
      if (minVal > 0 && num < minVal) return false;
      if (maxVal > 0 && num > maxVal) return false;

      return true;
    });

    if (sortBy === 'price-asc') {
      list = [...list].sort((a, b) => parsePrice(a.priceText) - parsePrice(b.priceText));
    } else if (sortBy === 'price-desc') {
      list = [...list].sort((a, b) => parsePrice(b.priceText) - parsePrice(a.priceText));
    } else if (sortBy === 'rating') {
      list = [...list].sort((a, b) => b.rating - a.rating || b.reviewsCount - a.reviewsCount);
    } else {
      list = [...list].sort((a, b) => b.reviewsCount * b.rating - a.reviewsCount * a.rating);
    }

    return list;
  }, [activeQuery, selectedCategory, selectedCategoryObj, selectedAge, minPrice, maxPrice, sortBy]);

  const liveDiscountStats = useMemo(() => {
    const withDiscount = displayedLiveProducts.filter((p) => p.discountPercent && p.discountPercent > 0);
    const maxDiscount = withDiscount.reduce((acc, p) => Math.max(acc, p.discountPercent || 0), 0);
    return {
      discountedCount: withDiscount.length,
      maxDiscount,
    };
  }, [displayedLiveProducts]);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setActiveQuery(searchInput.trim());
  };

  const handleSelectPricePreset = (preset: (typeof QUICK_PRICE_PRESETS)[number]) => {
    setActivePricePreset(preset.id);
    setMinPrice(preset.min);
    setMaxPrice(preset.max);
  };

  const handleResetFilters = () => {
    setSearchInput('');
    setActiveQuery('');
    setSelectedCategory('all');
    setSelectedAge('all');
    setMinPrice('');
    setMaxPrice('');
    setActivePricePreset('all');
    setSortBy('discount-desc');
    setDealsOnly(false);
  };

  const handleLoadMoreLive = () => {
    const nextPage = currentPage + 1;
    setCurrentPage(nextPage);
    fetchLiveDeals(nextPage, true);
  };

  const hasActiveFilters =
    activeQuery.trim() !== '' ||
    selectedCategory !== 'all' ||
    selectedAge !== 'all' ||
    minPrice !== '' ||
    maxPrice !== '' ||
    dealsOnly;

  // Structured Data JSON-LD (CollectionPage + BreadcrumbList + FAQPage)
  const structuredData = useMemo(
    () => ({
      '@context': 'https://schema.org',
      '@graph': [
        {
          '@type': 'CollectionPage',
          name: 'Black Friday 2026: Ofertas Reales y Mayores Descuentos en Directo',
          url: 'https://www.unbuenregalo.es/black-friday',
          description:
            'Explora miles de ofertas reales de Black Friday ordenadas por mayor descuento (%), con filtro por precio exacto, edades, categorías y buscador en directo en Amazon.',
          inLanguage: 'es-ES',
        },
        {
          '@type': 'BreadcrumbList',
          itemListElement: [
            {
              '@type': 'ListItem',
              position: 1,
              name: 'Inicio',
              item: 'https://www.unbuenregalo.es/',
            },
            {
              '@type': 'ListItem',
              position: 2,
              name: 'Black Friday 2026',
              item: 'https://www.unbuenregalo.es/black-friday',
            },
          ],
        },
        {
          '@type': 'FAQPage',
          mainEntity: BF_FAQS.map((f) => ({
            '@type': 'Question',
            name: f.q,
            acceptedAnswer: {
              '@type': 'Answer',
              text: f.a,
            },
          })),
        },
      ],
    }),
    []
  );

  return (
    <div dir={isRtl ? 'rtl' : 'ltr'} className="min-h-screen flex flex-col bg-[#f4f5f7] text-slate-900">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />

      <Header currentTheme="classic" />

      {/* 1. BLACK FRIDAY HERO */}
      <section className="relative bg-gradient-to-br from-black via-slate-950 to-black text-white border-b-4 border-amber-400 overflow-hidden">
        <div className="absolute -top-24 -right-24 w-96 h-96 rounded-full bg-amber-500/10 blur-3xl pointer-events-none" />
        <div className="absolute -bottom-24 -left-24 w-96 h-96 rounded-full bg-amber-400/10 blur-3xl pointer-events-none" />

        <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8 py-7 sm:py-10 relative z-10">
          {/* Breadcrumbs */}
          <nav aria-label="Breadcrumb" className="flex items-center gap-1.5 text-xs text-slate-300 mb-4">
            <Link href={localePath('/')} className="hover:text-amber-300 transition-colors font-medium">
              Inicio
            </Link>
            <ChevronRight className="w-3.5 h-3.5 text-slate-500" />
            <span className="text-amber-300 font-bold">Black Friday 2026</span>
          </nav>

          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 mb-6">
            <div className="max-w-3xl">
              <div className="flex flex-wrap items-center gap-2 mb-3">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-black border-2 border-amber-400 text-amber-300 font-black text-xs uppercase tracking-wider shadow-md">
                  <span className="inline-flex items-center justify-center px-1 rounded bg-amber-400/20 text-amber-300 font-black">%</span>
                  <span>BLACK FRIDAY 2026</span>
                </span>
                <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-emerald-500/20 border border-emerald-400/40 text-emerald-200 font-bold text-[11px]">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  <span>Precios y fotos 100% reales en directo ({amazonSiteName})</span>
                </span>
              </div>

              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight leading-tight mb-3">
                Ofertas{' '}
                <span className="bg-gradient-to-r from-amber-300 via-yellow-400 to-amber-200 bg-clip-text text-transparent">
                  Black Friday
                </span>{' '}
                con Descuento Real
              </h1>

              <p className="text-sm sm:text-base text-slate-300 leading-relaxed max-w-2xl">
                Filtra miles de productos por <strong>mayor porcentaje de descuento (%)</strong>, rango exacto de precio,
                edad o categoría. Comprueba la <strong>diferencia de precio real</strong> sobre el precio anterior y compra
                directamente en {amazonSiteName} con envío rápido Prime.
              </p>
            </div>

            <div className="flex flex-col items-start lg:items-end gap-2 shrink-0 bg-black border-2 border-amber-400 rounded-2xl p-3.5 shadow-lg">
              <span className="text-[11px] font-black uppercase tracking-widest text-amber-300 flex items-center gap-1.5">
                <Clock className="w-3.5 h-3.5 text-amber-300 animate-pulse" />
                <span>¡El Black Friday termina en:</span>
              </span>
              <BlackFridayCountdown />
              <span className="text-[11px] font-bold text-amber-200 mt-0.5">
                {liveDiscountStats.maxDiscount > 0
                  ? `🔥 Ofertas activas hasta -${liveDiscountStats.maxDiscount}% antes de que suban los precios`
                  : '⏳ Aprovecha los descuentos antes de que vuelvan a subir'}
              </span>
            </div>
          </div>

          {/* DEDICATED BLACK FRIDAY SEARCH BAR */}
          <div className="max-w-4xl">
            <form onSubmit={handleSearchSubmit} className="relative flex items-center bg-white rounded-2xl p-1.5 shadow-2xl border-2 border-amber-400/90 focus-within:ring-4 focus-within:ring-amber-400/30 transition-all">
              <Search className="w-5 h-5 text-slate-500 ml-3 mr-2 shrink-0" />
              <input
                type="text"
                value={searchInput}
                onChange={(e) => setSearchInput(e.target.value)}
                placeholder="Busca cualquier oferta de Black Friday... (ej: AirPods, freidora aire, LEGO, PS5, perfume, reloj)"
                aria-label="Buscar ofertas Black Friday"
                className="w-full py-2.5 px-1 text-sm sm:text-base text-slate-900 placeholder-slate-500 focus:outline-none bg-transparent font-medium"
              />
              {searchInput && (
                <button
                  type="button"
                  onClick={() => {
                    setSearchInput('');
                    setActiveQuery('');
                  }}
                  aria-label="Limpiar búsqueda"
                  className="p-2 text-slate-500 hover:text-slate-900 cursor-pointer"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
              <button
                type="submit"
                className="px-5 sm:px-7 py-2.5 rounded-xl bg-gradient-to-r from-amber-400 via-yellow-400 to-amber-500 hover:from-amber-300 hover:to-amber-400 text-slate-950 font-black text-xs sm:text-sm shadow-md transition-all cursor-pointer shrink-0 flex items-center gap-1.5"
              >
                <Search className="w-4 h-4 stroke-[2.5]" />
                <span>Buscar Chollos</span>
              </button>
            </form>

            {/* Quick Trending Black Friday Search Chips */}
            <div className="flex items-center gap-2 flex-wrap mt-3">
              <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">
                Más buscado hoy:
              </span>
              {TRENDING_BF_CHIPS.map((chip) => (
                <button
                  key={chip.label}
                  type="button"
                  onClick={() => {
                    setSearchInput(chip.label.replace(/^[^\w\s]+\s*/, ''));
                    setActiveQuery(chip.query);
                  }}
                  className="px-2.5 py-1 rounded-full bg-white/10 hover:bg-amber-400 hover:text-slate-950 border border-white/15 hover:border-amber-300 text-xs font-semibold text-slate-100 transition-all cursor-pointer"
                >
                  {chip.label}
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 2. MAIN BAZAAR WORKSPACE */}
      <main className="flex-1 max-w-[1600px] w-full mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
        {/* COMPLETE FILTER PANEL */}
        <section
          aria-label="Filtros de Black Friday"
          className="bg-white rounded-3xl border border-slate-200/90 shadow-sm p-4 sm:p-6 mb-7 space-y-5"
        >
          {/* Row 1: Sort + Deals Only Toggle + Exact Price Min/Max */}
          <div className="flex flex-col xl:flex-row xl:items-center justify-between gap-4 pb-4 border-b border-slate-100">
            <div className="flex flex-wrap items-center gap-2.5">
              <div className="flex items-center gap-2 bg-slate-50 border border-indigo-200/85 rounded-xl px-3 py-2 shadow-2xs">
                <ArrowDownWideNarrow className="w-4 h-4 text-amber-600 shrink-0" />
                <span className="text-xs font-black text-slate-700">Ordenar:</span>
                <select
                  value={sortBy}
                  onChange={(e) =>
                    setSortBy(
                      e.target.value as 'discount-desc' | 'price-asc' | 'price-desc' | 'rating' | 'featured'
                    )
                  }
                  aria-label="Ordenar productos"
                  className="text-xs sm:text-sm font-bold text-slate-900 bg-transparent focus:outline-none cursor-pointer"
                >
                  <option value="discount-desc">% Mayor descuento primero</option>
                  <option value="price-asc">Precio: menor a mayor</option>
                  <option value="price-desc">Precio: mayor a menor</option>
                  <option value="rating">Mejor valorados (★)</option>
                  <option value="featured">Destacados Black Friday</option>
                </select>
              </div>

              <button
                type="button"
                onClick={() => setDealsOnly((prev) => !prev)}
                aria-pressed={dealsOnly}
                className={`inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs sm:text-sm font-bold border-2 transition-all cursor-pointer ${
                  dealsOnly
                    ? 'bg-black text-amber-300 border-amber-400 shadow-sm ring-2 ring-amber-300/40'
                    : 'bg-black/90 hover:bg-black text-amber-300 border-amber-400/80 hover:border-amber-400'
                }`}
              >
                <Percent className="w-3.5 h-3.5 text-amber-300" />
                <span>Solo con descuento verificado (%)</span>
              </button>
            </div>

            {/* Exact Price Range Inputs (Min / Max €) */}
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-xs font-black text-slate-700 flex items-center gap-1">
                <Tag className="w-3.5 h-3.5 text-indigo-600" />
                <span>Rango exacto:</span>
              </span>
              <div className="flex items-center gap-1.5">
                <input
                  type="number"
                  min={0}
                  step={1}
                  value={minPrice}
                  onChange={(e) => {
                    setMinPrice(e.target.value);
                    setActivePricePreset('custom');
                  }}
                  placeholder="Mín €"
                  aria-label="Precio mínimo en euros"
                  className="w-24 px-3 py-1.5 rounded-xl border border-indigo-200/90 bg-slate-50/70 focus:bg-white focus:border-indigo-500 text-xs sm:text-sm font-bold text-slate-900 focus:outline-none"
                />
                <span className="text-slate-400 font-bold">–</span>
                <input
                  type="number"
                  min={0}
                  step={1}
                  value={maxPrice}
                  onChange={(e) => {
                    setMaxPrice(e.target.value);
                    setActivePricePreset('custom');
                  }}
                  placeholder="Máx €"
                  aria-label="Precio máximo en euros"
                  className="w-24 px-3 py-1.5 rounded-xl border border-indigo-200/90 bg-slate-50/70 focus:bg-white focus:border-indigo-500 text-xs sm:text-sm font-bold text-slate-900 focus:outline-none"
                />
              </div>

              {hasActiveFilters && (
                <button
                  type="button"
                  onClick={handleResetFilters}
                  className="inline-flex items-center gap-1 px-3 py-1.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-bold cursor-pointer transition-colors"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span>Reiniciar</span>
                </button>
              )}
            </div>
          </div>

          {/* Row 2: Quick Price Range Pills */}
          <div>
            <p className="text-[11px] font-black uppercase tracking-wider text-slate-600 mb-2">
              Presupuesto rápido:
            </p>
            <div className="flex items-center gap-2 flex-wrap">
              {QUICK_PRICE_PRESETS.map((preset) => {
                const isActive = activePricePreset === preset.id;
                return (
                  <button
                    key={preset.id}
                    type="button"
                    onClick={() => handleSelectPricePreset(preset)}
                    className={`px-3.5 py-1.5 rounded-xl text-xs font-bold border transition-all cursor-pointer ${
                      isActive
                        ? 'bg-slate-900 text-white border-slate-900 shadow-sm ring-2 ring-slate-900/15'
                        : 'bg-gradient-to-b from-white to-indigo-50/35 text-slate-800 border-indigo-200/85 hover:border-indigo-400 hover:bg-indigo-50/70'
                    }`}
                  >
                    {preset.label}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Row 3: Categories */}
          <div>
            <p className="text-[11px] font-black uppercase tracking-wider text-slate-600 mb-2">
              Categorías Black Friday:
            </p>
            <div className="flex items-center gap-2 flex-wrap">
              {BAZAAR_CATEGORIES.map((cat) => {
                const isActive = selectedCategory === cat.id;
                return (
                  <button
                    key={cat.id}
                    type="button"
                    onClick={() => setSelectedCategory(cat.id)}
                    className={`px-3.5 py-2 rounded-xl text-xs font-bold border transition-all cursor-pointer flex items-center gap-1.5 ${
                      isActive
                        ? 'bg-gradient-to-r from-indigo-600 to-violet-600 text-white border-indigo-600 shadow-sm ring-2 ring-indigo-200'
                        : 'bg-gradient-to-b from-white to-indigo-50/35 text-slate-800 border-indigo-200/85 shadow-2xs hover:border-indigo-400 hover:from-indigo-50/70 hover:to-indigo-100/50 hover:text-indigo-950'
                    }`}
                  >
                    <span aria-hidden="true">{cat.emoji}</span>
                    <span>{cat.label}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Row 4: Ages Filter */}
          <div>
            <p className="text-[11px] font-black uppercase tracking-wider text-slate-600 mb-2">
              Filtrar por edad del destinatario:
            </p>
            <div className="flex items-center gap-2 flex-wrap">
              <button
                type="button"
                onClick={() => setSelectedAge('all')}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-bold border transition-all cursor-pointer ${
                  selectedAge === 'all'
                    ? 'bg-slate-900 text-white border-slate-900 shadow-sm'
                    : 'bg-gradient-to-b from-white to-slate-50 text-slate-800 border-indigo-200/85 hover:border-indigo-400'
                }`}
              >
                Todas las edades
              </button>
              {AGE_CATEGORIES.map((age) => {
                const isActive = selectedAge === age.id;
                return (
                  <button
                    key={age.id}
                    type="button"
                    onClick={() => setSelectedAge(age.id)}
                    className={`px-3.5 py-1.5 rounded-xl text-xs font-bold border transition-all cursor-pointer ${
                      isActive
                        ? 'bg-gradient-to-r from-indigo-600 to-violet-600 text-white border-indigo-600 shadow-sm'
                        : 'bg-gradient-to-b from-white to-slate-50 text-slate-800 border-indigo-200/85 hover:border-indigo-400'
                    }`}
                  >
                    {age.label}
                  </button>
                );
              })}
            </div>
          </div>
        </section>

        {/* 3. LIVE AMAZON BLACK FRIDAY DEALS GRID */}
        <section aria-label="Ofertas Black Friday en directo" className="mb-12">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4">
            <div>
              <h2 className="text-xl sm:text-2xl font-black text-slate-950 flex items-center gap-2">
                <span className="inline-flex items-center justify-center w-7 h-7 rounded-lg bg-black border-2 border-amber-400 text-amber-300 text-sm font-black">
                  %
                </span>
                <span>
                  Ofertas Black Friday en Directo ({displayedLiveProducts.length})
                </span>
              </h2>
              <p className="text-xs sm:text-sm text-slate-600 mt-0.5">
                Productos obtenidos ahora mismo de {amazonSiteName} con foto original, precio actual, precio anterior tachado y enlace directo verificado.
              </p>
            </div>

            <a
              href={getAmazonSearchUrl(computedLiveQuery, amazonRegion)}
              target="_blank"
              rel="nofollow sponsored noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-amber-300 font-bold text-xs shadow-xs transition-all shrink-0 self-start sm:self-auto"
            >
              <span>Ver todas en {amazonSiteName}</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>

          {isLoadingLive ? (
            <div className="bg-white rounded-3xl border border-slate-200 p-12 text-center flex flex-col items-center justify-center gap-3 shadow-xs">
              <Loader2 className="w-9 h-9 text-rose-600 animate-spin" />
              <p className="text-sm font-bold text-slate-900">
                Buscando ofertas reales de Black Friday en {amazonSiteName}...
              </p>
              <p className="text-xs text-slate-500">
                Comprobando precios tachados, descuentos reales (%) y fotos originales en directo.
              </p>
            </div>
          ) : displayedLiveProducts.length > 0 ? (
            <>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-2.5 sm:gap-3">
                {displayedLiveProducts.map((item) => (
                  <LiveAmazonProductCard
                    key={item.asin}
                    product={item}
                    categoryLabel={selectedCategoryObj.label}
                    badgeLabel={item.dealBadge || 'Black Friday'}
                  />
                ))}
              </div>

              {hasMorePages && (
                <div className="mt-7 flex flex-col items-center justify-center gap-2">
                  <button
                    type="button"
                    onClick={handleLoadMoreLive}
                    disabled={isLoadingMore}
                    className="px-7 py-3.5 rounded-2xl bg-black hover:bg-slate-900 text-amber-300 hover:text-amber-200 border-2 border-amber-400 font-black text-sm shadow-lg hover:shadow-xl transition-all flex items-center gap-2 cursor-pointer disabled:opacity-70"
                  >
                    {isLoadingMore ? (
                      <>
                        <Loader2 className="w-4 h-4 animate-spin" />
                        <span>Cargando más ofertas reales...</span>
                      </>
                    ) : (
                      <>
                        <RefreshCw className="w-4 h-4" />
                        <span>Cargar más ofertas reales de Black Friday (Página {currentPage + 1})</span>
                      </>
                    )}
                  </button>
                  <span className="text-xs text-slate-500 font-medium">
                    Explora miles de productos con enlace directo verificado en {amazonSiteName}
                  </span>
                </div>
              )}
            </>
          ) : (
            <div className="bg-white rounded-3xl border border-dashed border-slate-300 p-10 text-center space-y-3">
              <SlidersHorizontal className="w-10 h-10 text-slate-400 mx-auto" />
              <p className="text-base font-bold text-slate-900">
                No hemos encontrado ofertas con esta combinación exacta ahora mismo
              </p>
              <p className="text-xs text-slate-600 max-w-md mx-auto">
                Prueba a desactivar &ldquo;Solo con descuento verificado&rdquo;, ampliar el rango de precio o buscar otro término.
              </p>
              <div className="flex items-center justify-center gap-2 pt-2">
                <button
                  type="button"
                  onClick={handleResetFilters}
                  className="px-4 py-2 rounded-xl bg-slate-900 text-white text-xs font-bold cursor-pointer hover:bg-slate-800"
                >
                  Ver todo Black Friday
                </button>
                <a
                  href={getAmazonSearchUrl(computedLiveQuery, amazonRegion)}
                  target="_blank"
                  rel="nofollow sponsored noopener noreferrer"
                  className="px-4 py-2 rounded-xl bg-amber-400 text-slate-950 text-xs font-black inline-flex items-center gap-1"
                >
                  <span>Buscar directo en {amazonSiteName}</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>
          )}
        </section>

        {/* 4. CURATED SITE CATALOG MATCHING FILTERS (NO INVENTED DISCOUNTS) */}
        {filteredCatalogProducts.length > 0 && (
          <section aria-label="Selección verificada de Un Buen Regalo" className="mb-12">
            <div className="flex flex-wrap items-center justify-between gap-2 mb-4">
              <div>
                <h2 className="text-lg sm:text-xl font-black text-slate-950 flex items-center gap-2">
                  <Sparkles className="w-5 h-5 text-amber-500" />
                  <span>Selección Destacada del Catálogo ({filteredCatalogProducts.length} ideas)</span>
                </h2>
                <p className="text-xs text-slate-600">
                  Productos top valorados de nuestro catálogo filtrados por tu presupuesto, edad y categoría. Comprueba el descuento de Black Friday actualizado al abrir cada ficha en Amazon.
                </p>
              </div>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-2.5 sm:gap-3">
              {filteredCatalogProducts.slice(0, catalogVisibleCount).map((prod, idx) => (
                <ProductCard
                  key={prod.id}
                  product={prod}
                  currentTheme="classic"
                  rankBadge={idx === 0 ? 1 : idx === 1 ? 2 : idx === 2 ? 3 : undefined}
                />
              ))}
            </div>

            {filteredCatalogProducts.length > catalogVisibleCount && (
              <div className="mt-6 flex justify-center">
                <button
                  type="button"
                  onClick={() => setCatalogVisibleCount((c) => c + 18)}
                  className="px-6 py-3 rounded-2xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs sm:text-sm shadow-sm cursor-pointer transition-all"
                >
                  Mostrar más productos del catálogo (+18)
                </button>
              </div>
            )}
          </section>
        )}

        {/* 5. SEO GUIDE & BLACK FRIDAY FAQS */}
        <section className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-xs space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-1.5">
              <div className="flex items-center gap-2 text-slate-950 font-black text-sm">
                <span className="inline-flex items-center justify-center w-5 h-5 rounded bg-black border border-amber-400 text-amber-300 text-[11px] font-black">
                  %
                </span>
                <span>Descuentos Reales Verificados</span>
              </div>
              <p className="text-xs text-slate-600 leading-relaxed">
                Cada producto muestra la diferencia exacta entre el precio anterior recomendado y el precio de oferta actual en Amazon. Sin trucos ni rebajas inventadas.
              </p>
            </div>
            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-1.5">
              <div className="flex items-center gap-2 text-emerald-700 font-black text-sm">
                <ShieldCheck className="w-4 h-4" />
                <span>Devoluciones Ampliadas Navidad</span>
              </div>
              <p className="text-xs text-slate-600 leading-relaxed">
                Compra tus regalos de Navidad y Reyes aprovechando los precios del Black Friday con tranquilidad: Amazon amplía el plazo de devolución hasta finales de enero.
              </p>
            </div>
            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-1.5">
              <div className="flex items-center gap-2 text-indigo-700 font-black text-sm">
                <Search className="w-4 h-4" />
                <span>Buscador Black Friday Ilimitado</span>
              </div>
              <p className="text-xs text-slate-600 leading-relaxed">
                Filtra por precio mínimo y máximo, ordena por mayor porcentaje de ahorro o busca cualquier marca específica para comparar al instante con foto original y enlace directo.
              </p>
            </div>
          </div>

          <div className="pt-4 border-t border-slate-100">
            <h2 className="text-lg sm:text-xl font-black text-slate-900 mb-4">
              Preguntas frecuentes sobre Black Friday 2026
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {BF_FAQS.map((faq, idx) => (
                <div key={idx} className="p-4 rounded-2xl bg-slate-50/80 border border-slate-200/70 space-y-1.5">
                  <h3 className="text-sm font-bold text-slate-900">{faq.q}</h3>
                  <p className="text-xs text-slate-600 leading-relaxed">{faq.a}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>

      <Footer currentTheme="classic" />
    </div>
  );
}
