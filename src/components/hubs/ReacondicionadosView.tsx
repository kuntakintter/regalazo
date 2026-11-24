'use client';

import React, { useState, useMemo, useEffect, useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import {
  REACONDICIONADOS_PRODUCTS,
  REACONDICIONADOS_CATEGORIES,
  RefurbishedProduct,
} from '@/data/reacondicionadosData';
import { getAmazonProductUrl, getAmazonSearchUrl } from '@/lib/amazon';
import { useActiveLocale } from '@/hooks/useActiveLocale';
import { useVoting } from '@/context/VotingContext';
import { Product } from '@/data/products';
import {
  Search,
  ShieldCheck,
  CheckCircle2,
  BatteryCharging,
  RefreshCw,
  Award,
  ChevronRight,
  ChevronDown,
  ExternalLink,
  Heart,
  Share2,
  Star,
  ArrowDownWideNarrow,
  Tag,
  RotateCcw,
  X,
  Info,
  ShoppingBag,
} from 'lucide-react';

const PRICE_PRESETS = [
  { id: 'all', label: 'Todos los precios', min: '', max: '' },
  { id: '<100', label: 'Menos de 100 €', min: '', max: '100' },
  { id: '100-250', label: '100 € – 250 €', min: '100', max: '250' },
  { id: '250-500', label: '250 € – 500 €', min: '250', max: '500' },
  { id: '>500', label: 'Más de 500 €', min: '500', max: '' },
];

const REAC_FAQS = [
  {
    q: '¿Qué son exactamente los productos Reacondicionados de Amazon (Amazon Renewed)?',
    a: 'Son productos de primeras marcas (Apple, Samsung, Sony, Lenovo, Garmin, DeLonghi, etc.) que han sido inspeccionados, probados, limpiados e higienizados profesionalmente por proveedores cualificados por Amazon para funcionar y lucir como nuevos, con un ahorro de hasta el 50% frente a su precio nuevo.',
  },
  {
    q: '¿Cuánto tiempo de garantía da Amazon después de comprar un producto reacondicionado?',
    a: 'Todos los productos de Amazon Renewed incluyen 1 año (12 meses) de Garantía Oficial Amazon Renewed tras la compra: tienes derecho a un reemplazo o reembolso completo si el producto no funciona como se espera, además de 30 días de prueba con devolución gratuita y el respaldo de la garantía legal en España.',
  },
  {
    q: '¿Son 100% funcionales y en qué estado están la batería y la pantalla?',
    a: 'Sí, el 100% de los dispositivos son totalmente funcionales. En smartphones, tablets, portátiles y smartwatches, Amazon exige y verifica que la batería tenga una capacidad superior al 80% respecto a una batería nueva, y que la pantalla no tenga roturas ni píxeles muertos.',
  },
  {
    q: '¿Qué significan los estados "Excelente" y "Muy Bueno" al pulsar en "Leer más" en cada producto?',
    a: 'El estado "Excelente" significa que el producto no presenta ningún daño estético ni arañazo visible a 30 cm de distancia (luce como nuevo). El estado "Muy Bueno" es 100% funcional con batería verificada >80% y solo puede tener micro-marcas estéticas muy leves apenas perceptibles de cerca.',
  },
];

function RefurbishedProductCard({ item }: { item: RefurbishedProduct }) {
  const { ui, langCode, amazonRegion, formatPrice } = useActiveLocale();
  const { toggleItem, isItemInList } = useVoting();
  const isInVote = isItemInList(item.id);
  const [copied, setCopied] = useState(false);
  const [hasImgError, setHasImgError] = useState(false);
  const [showDetails, setShowDetails] = useState(false);
  const detailsRef = useRef<HTMLDivElement>(null);

  const directUrl = getAmazonProductUrl(item.asin, item.title, amazonRegion);

  useEffect(() => {
    if (!showDetails) return;
    const handleOutside = (e: MouseEvent) => {
      if (detailsRef.current && !detailsRef.current.contains(e.target as Node)) {
        setShowDetails(false);
      }
    };
    const handleCloseOthers = (e: Event) => {
      const ce = e as CustomEvent<string>;
      if (ce.detail !== item.id) setShowDetails(false);
    };
    document.addEventListener('mousedown', handleOutside);
    window.addEventListener('ubr:reac-open', handleCloseOthers);
    return () => {
      document.removeEventListener('mousedown', handleOutside);
      window.removeEventListener('ubr:reac-open', handleCloseOthers);
    };
  }, [showDetails, item.id]);

  const handleToggleVote = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    const adapted: Product = {
      id: item.id,
      asin: item.asin,
      slug: item.id,
      title: item.title,
      priceText: item.priceText,
      priceRange: item.priceNumeric < 20 ? '<20' : item.priceNumeric <= 50 ? '20-50' : item.priceNumeric <= 100 ? '50-100' : '>100',
      rating: item.rating,
      reviewsCount: item.reviewsCount,
      badge: item.warrantyBadge,
      category: 'Reacondicionados',
      subcategory: item.categoryLabel,
      imageUrl: item.imageUrl,
      description: item.description,
      pros: item.pros,
      idealFor: item.idealFor,
      searchQuery: item.title,
      gender: 'unisex',
      ageRange: '+18',
      style: 'classic',
    };
    toggleItem(adapted);
  };

  const handleShare = async (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (navigator.share) {
      try {
        await navigator.share({ title: item.title, text: item.description, url: directUrl });
      } catch {
        navigator.clipboard.writeText(directUrl);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      }
    } else {
      navigator.clipboard.writeText(directUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <article
      className={`group flex flex-col justify-between p-2.5 sm:p-3 rounded-2xl bg-white border border-emerald-200/90 hover:border-emerald-400 shadow-xs hover:shadow-md transition-all duration-200 relative ${
        showDetails ? 'z-30' : 'z-0'
      }`}
    >
      {/* Top-Left Warranty & Discount Badges */}
      <div className="absolute top-2.5 left-2.5 z-20 flex flex-col items-start gap-1 pointer-events-none">
        <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-lg bg-emerald-700 text-white font-black text-[10px] tracking-tight shadow-sm">
          <span>♻️</span>
          <span>1 Año Garantía</span>
        </span>
        {item.discountPercent && item.discountPercent > 0 && (
          <span className="inline-flex items-center px-2 py-0.5 rounded-lg bg-black border border-amber-400 text-amber-300 font-black text-[10px] shadow-sm">
            -{item.discountPercent}%
          </span>
        )}
      </div>

      {/* Product Image */}
      <div className="relative aspect-square w-full mb-2 bg-slate-50/80 rounded-xl overflow-hidden p-2 flex items-center justify-center border border-slate-100">
        <a
          href={directUrl}
          target="_blank"
          rel="nofollow sponsored noopener noreferrer"
          aria-label={`${ui.viewOnAmazon}: ${item.title}`}
          className="block w-full h-full cursor-pointer relative"
        >
          {item.imageUrl && !hasImgError ? (
            <Image
              src={item.imageUrl}
              alt={item.title}
              fill
              unoptimized
              onError={() => setHasImgError(true)}
              sizes="(max-width: 640px) 50vw, (max-width: 1024px) 25vw, 16vw"
              className="object-contain p-1 transition-transform duration-200 group-hover:scale-105"
            />
          ) : (
            <span className="w-full h-full bg-slate-50 flex flex-col items-center justify-center text-slate-600 p-2 text-center">
              <ShoppingBag className="w-6 h-6 mb-1 text-slate-500 opacity-75" />
              <span className="text-[10px] font-bold text-slate-700 line-clamp-1">{item.title}</span>
            </span>
          )}
        </a>

        <div className="absolute top-1.5 right-1.5 flex items-center gap-1 z-10">
          <button
            type="button"
            onClick={handleToggleVote}
            aria-label={`${isInVote ? ui.removeFromVote : ui.addToVote}: ${item.title}`}
            className={`w-7 h-7 rounded-full backdrop-blur-xs flex items-center justify-center transition-transform shadow-2xs cursor-pointer border ${
              isInVote
                ? 'bg-rose-50 border-rose-200 text-rose-600 scale-105'
                : 'bg-white/95 border-slate-200 text-slate-600 hover:text-rose-600 hover:scale-105'
            }`}
          >
            <Heart className={`w-3.5 h-3.5 ${isInVote ? 'fill-rose-500 text-rose-600' : ''}`} />
          </button>
          <button
            type="button"
            onClick={handleShare}
            aria-label={`Compartir: ${item.title}`}
            className="w-7 h-7 rounded-full bg-white/95 backdrop-blur-xs flex items-center justify-center text-slate-600 hover:text-slate-950 hover:scale-105 transition-transform shadow-2xs cursor-pointer border border-slate-200"
          >
            <Share2 className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Product Info */}
      <div className="flex flex-col flex-1 justify-between">
        <div>
          <span className="text-[10px] text-emerald-800 font-bold uppercase tracking-wider truncate block mb-0.5">
            {item.categoryLabel}
          </span>

          <p className="font-semibold text-xs sm:text-[13px] leading-snug text-slate-900 group-hover:text-emerald-800 transition-colors mb-1 min-h-[2.1rem]">
            <a
              href={directUrl}
              target="_blank"
              rel="nofollow sponsored noopener noreferrer"
              className="block line-clamp-2 hover:underline"
            >
              {item.title}
            </a>
          </p>

          {/* Visible Condition Pill */}
          <div className="mb-1.5">
            <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-emerald-50 border border-emerald-200 text-emerald-900 font-bold text-[10px] truncate max-w-full">
              <CheckCircle2 className="w-3 h-3 text-emerald-600 shrink-0" />
              <span className="truncate">{item.conditionGrade}</span>
            </span>
          </div>

          {/* Rating */}
          <div className="flex items-center gap-1 text-[11px] mb-1.5">
            <div className="flex items-center text-amber-500">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className={`w-3 h-3 ${
                    i < Math.floor(item.rating)
                      ? 'fill-amber-400 text-amber-400'
                      : 'fill-slate-200 text-slate-200'
                  }`}
                />
              ))}
            </div>
            <span className="font-bold text-slate-900 text-xs ml-0.5">{item.rating}</span>
            <span className="text-[#007185] font-medium text-[11px]">
              ({item.reviewsCount.toLocaleString(langCode)})
            </span>
          </div>

          {/* "Leer más: Estado y Garantía" Floating Popover Toggle */}
          <div ref={detailsRef} className="my-1.5 relative">
            <button
              type="button"
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                setShowDetails((prev) => {
                  const next = !prev;
                  if (next && typeof window !== 'undefined') {
                    window.dispatchEvent(new CustomEvent('ubr:reac-open', { detail: item.id }));
                  }
                  return next;
                });
              }}
              aria-expanded={showDetails}
              className={`w-full flex items-center justify-between px-2.5 py-1.5 rounded-lg text-[11px] font-bold transition-all border cursor-pointer select-none ${
                showDetails
                  ? 'bg-emerald-50 border-emerald-500 text-emerald-950 shadow-2xs ring-2 ring-emerald-200/70'
                  : 'bg-slate-50 hover:bg-emerald-50/70 border-emerald-200/90 hover:border-emerald-400 text-emerald-900'
              }`}
            >
              <span className="flex items-center gap-1.5 truncate">
                <Info className="w-3.5 h-3.5 text-emerald-700 shrink-0" />
                <span className="truncate">Leer más: Estado y Garantía</span>
              </span>
              <ChevronDown
                className={`w-3 h-3 text-emerald-700 transition-transform duration-200 shrink-0 ml-1 ${
                  showDetails ? 'rotate-180' : ''
                }`}
              />
            </button>

            {showDetails && (
              <div className="absolute left-0 right-0 top-full mt-1.5 z-40 p-3 rounded-xl bg-white border-2 border-emerald-500 text-left text-xs shadow-xl shadow-slate-900/15 ring-1 ring-emerald-400/20 animate-in fade-in zoom-in-95 duration-150 space-y-2">
                <div className="flex items-center justify-between pb-1.5 border-b border-emerald-100 gap-1">
                  <span className="text-[10px] font-black uppercase tracking-wider text-emerald-800 flex items-center gap-1">
                    <ShieldCheck className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                    <span>Ficha Oficial Amazon Renewed</span>
                  </span>
                  <button
                    type="button"
                    onClick={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                      setShowDetails(false);
                    }}
                    aria-label="Cerrar"
                    className="p-0.5 rounded-md text-slate-400 hover:text-slate-700 hover:bg-slate-100 cursor-pointer"
                  >
                    <X className="w-3.5 h-3.5" />
                  </button>
                </div>

                <div className="p-2 rounded-lg bg-emerald-50/80 border border-emerald-200">
                  <p className="text-[11px] font-black text-emerald-950">{item.conditionGrade}</p>
                  <p className="text-[11px] text-emerald-900 mt-0.5 leading-snug">
                    100% funcional, higienizado y verificado por técnicos certificados de Amazon.
                  </p>
                </div>

                <ul className="space-y-1 text-[11px] text-slate-700 pl-3.5 list-disc marker:text-emerald-600 leading-snug">
                  {item.pros.map((pro, idx) => (
                    <li key={idx}>{pro}</li>
                  ))}
                </ul>

                <div className="pt-1.5 border-t border-emerald-100">
                  <p className="text-[10px] font-extrabold text-slate-900 flex items-center gap-1">
                    <Award className="w-3.5 h-3.5 text-amber-600 shrink-0" />
                    <span>Garantía tras la compra:</span>
                  </p>
                  <p className="text-[11px] text-slate-700 leading-snug mt-0.5">
                    <strong>1 año (12 meses) de Garantía Amazon Renewed</strong> con reemplazo o reembolso total + 30 días de prueba gratuita.
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Price & CTA */}
        <div className="pt-1 mt-auto">
          <div className="flex flex-wrap items-baseline gap-1.5 mb-0.5">
            <span className="text-base sm:text-lg font-black text-slate-950 tracking-tight">
              {formatPrice(item.priceText)}
            </span>
            {item.originalPriceText && (
              <span className="text-xs font-semibold text-slate-400 line-through">
                {formatPrice(item.originalPriceText)}
              </span>
            )}
          </div>

          <div className="flex items-center gap-1 text-[10px] sm:text-[11px] text-slate-600 font-normal mb-2">
            <span className="text-[#007185] font-black text-xs">✓prime</span>
            <span className="text-slate-700 font-medium">1 Año de Garantía Oficial</span>
          </div>

          <a
            href={directUrl}
            target="_blank"
            rel="nofollow sponsored noopener noreferrer"
            className="w-full py-2.5 px-3 rounded-xl text-xs font-black text-slate-950 bg-[#ffd814] hover:bg-[#f7ca00] active:bg-[#f0b800] border border-[#fcd200] shadow-xs text-center flex items-center justify-center gap-1.5 transition-all cursor-pointer hover:scale-101"
          >
            <span>{ui.viewOnAmazon}</span>
            <ExternalLink className="w-3.5 h-3.5 text-slate-900" />
          </a>

          {copied && (
            <div className="text-center text-[9px] text-emerald-700 font-bold mt-1">
              ✓ {ui.shareBtnCopied}
            </div>
          )}
        </div>
      </div>
    </article>
  );
}

export default function ReacondicionadosView() {
  const { localePath, amazonRegion, amazonSiteName, isRtl, formatPrice } = useActiveLocale();

  const [searchQuery, setSearchQuery] = useState('');
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const searchBoxRef = useRef<HTMLDivElement>(null);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [minPrice, setMinPrice] = useState('');
  const [maxPrice, setMaxPrice] = useState('');
  const [activePricePreset, setActivePricePreset] = useState('all');
  const [sortBy, setSortBy] = useState<'featured' | 'price-asc' | 'price-desc' | 'rating'>('featured');
  const [visibleCount, setVisibleCount] = useState(24);

  useEffect(() => {
    const handleOutsideClick = (e: MouseEvent) => {
      if (searchBoxRef.current && !searchBoxRef.current.contains(e.target as Node)) {
        setIsSearchFocused(false);
      }
    };
    document.addEventListener('mousedown', handleOutsideClick);
    return () => document.removeEventListener('mousedown', handleOutsideClick);
  }, []);

  const QUICK_REAC_CHIPS = [
    { label: '📱 iPhone 13 / 15', query: 'iPhone', cat: 'smartphones' },
    { label: '📲 Apple iPad', query: 'iPad', cat: 'tablets' },
    { label: '💻 Portátiles 32GB', query: 'Portátil', cat: 'laptops' },
    { label: '⌚ Apple Watch / Garmin', query: 'Watch', cat: 'smartwatches' },
    { label: '🎧 Sony / AirPods', query: 'Auriculares', cat: 'audio' },
    { label: '☕ Cafeteras DeLonghi', query: 'Cafetera', cat: 'home' },
    { label: '🎮 Consolas y Gaming', query: 'Consola', cat: 'gaming' },
  ];

  const liveSearchSuggestions = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();
    if (q.length < 1) return [];
    const tokens = q.split(/\s+/).filter(Boolean);
    return REACONDICIONADOS_PRODUCTS.filter((item) => {
      const hay = `${item.title} ${item.categoryLabel} ${item.conditionGrade}`.toLowerCase();
      return tokens.every((t) => hay.includes(t));
    }).slice(0, 7);
  }, [searchQuery]);

  const matchingCategoryChips = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();
    if (q.length < 1) return REACONDICIONADOS_CATEGORIES.filter((c) => c.id !== 'all');
    return REACONDICIONADOS_CATEGORIES.filter(
      (c) => c.id !== 'all' && (`${c.label} ${c.query}`.toLowerCase().includes(q))
    );
  }, [searchQuery]);

  const selectedCatObj = useMemo(
    () => REACONDICIONADOS_CATEGORIES.find((c) => c.id === selectedCategory) || REACONDICIONADOS_CATEGORIES[0],
    [selectedCategory]
  );

  const filteredProducts = useMemo(() => {
    const minVal = parseFloat(minPrice) || 0;
    const maxVal = parseFloat(maxPrice) || 0;
    const qTokens = searchQuery
      .trim()
      .toLowerCase()
      .split(/\s+/)
      .filter((t) => t.length >= 2);

    let list = REACONDICIONADOS_PRODUCTS.filter((item) => {
      if (selectedCategory !== 'all' && item.category !== selectedCategory) return false;
      if (minVal > 0 && item.priceNumeric < minVal) return false;
      if (maxVal > 0 && item.priceNumeric > maxVal) return false;
      if (qTokens.length > 0) {
        const hay = `${item.title} ${item.categoryLabel} ${item.conditionGrade}`.toLowerCase();
        if (!qTokens.every((tok) => hay.includes(tok))) return false;
      }
      return true;
    });

    if (sortBy === 'price-asc') {
      list = [...list].sort((a, b) => a.priceNumeric - b.priceNumeric);
    } else if (sortBy === 'price-desc') {
      list = [...list].sort((a, b) => b.priceNumeric - a.priceNumeric);
    } else if (sortBy === 'rating') {
      list = [...list].sort((a, b) => b.rating - a.rating || b.reviewsCount - a.reviewsCount);
    }

    return list;
  }, [selectedCategory, minPrice, maxPrice, searchQuery, sortBy]);

  const handleSelectPricePreset = (preset: (typeof PRICE_PRESETS)[number]) => {
    setActivePricePreset(preset.id);
    setMinPrice(preset.min);
    setMaxPrice(preset.max);
  };

  const handleResetFilters = () => {
    setSearchQuery('');
    setSelectedCategory('all');
    setMinPrice('');
    setMaxPrice('');
    setActivePricePreset('all');
    setSortBy('featured');
  };

  const structuredData = useMemo(
    () => ({
      '@context': 'https://schema.org',
      '@graph': [
        {
          '@type': 'CollectionPage',
          name: 'Productos Reacondicionados Certificados de Amazon (Amazon Renewed) con 1 Año de Garantía',
          url: 'https://www.unbuenregalo.es/reacondicionados',
          description:
            'Catálogo de productos reacondicionados certificados de Amazon 100% funcionales: iPhones, iPads, portátiles, consolas, smartwatches y cafeteras con 1 año de Garantía Oficial Amazon Renewed.',
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
              name: 'Reacondicionados Certificados Amazon',
              item: 'https://www.unbuenregalo.es/reacondicionados',
            },
          ],
        },
        {
          '@type': 'FAQPage',
          mainEntity: REAC_FAQS.map((f) => ({
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
    <div dir={isRtl ? 'rtl' : 'ltr'} className="min-h-screen flex flex-col bg-[#f4f6f5] text-slate-900">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />

      <Header currentTheme="classic" />

      {/* 1. HERO & OFFICIAL AMAZON RENEWED WARRANTY EXPLANATION */}
      <section className="relative bg-gradient-to-br from-[#062019] via-[#0a2e23] to-[#0f172a] text-white border-b-4 border-emerald-400 overflow-visible z-30">
        <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8 py-3 sm:py-10 relative z-10">
          <nav aria-label="Breadcrumb" className="flex items-center gap-1.5 text-xs text-emerald-200 mb-2 sm:mb-4 flex-nowrap overflow-x-auto whitespace-nowrap">
            <Link href={localePath('/')} className="hover:text-white transition-colors font-medium">
              Inicio
            </Link>
            <ChevronRight className="w-3.5 h-3.5 text-emerald-500" />
            <span className="text-emerald-300 font-bold">Reacondicionados Certificados Amazon</span>
          </nav>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-3 sm:gap-6 items-center mb-3 sm:mb-6">
            <div className="lg:col-span-7">
              <div className="hidden sm:flex flex-wrap items-center gap-2 mb-3">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500 text-slate-950 font-black text-xs uppercase tracking-wider shadow-md">
                  <span>♻️</span>
                  <span>AMAZON RENEWED · CERTIFICADOS</span>
                </span>
                <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-white/10 border border-emerald-400/40 text-emerald-200 font-bold text-[11px]">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-300" />
                  <span>1 Año de Garantía Oficial Amazon + 100% Funcionales</span>
                </span>
              </div>

              <h1 className="text-2xl sm:text-4xl lg:text-5xl font-black tracking-tight leading-tight mb-2 sm:mb-3">
                Productos{' '}
                <span className="bg-gradient-to-r from-emerald-300 via-teal-200 to-amber-300 bg-clip-text text-transparent">
                  Reacondicionados de Amazon
                </span>{' '}
                Como Nuevos
              </h1>

              <p className="text-sm sm:text-base text-slate-200 leading-relaxed max-w-2xl line-clamp-2 sm:line-clamp-none">
                Ahorra hasta un 50% en tecnología de primeras marcas (Apple iPhone, iPad, Samsung, portátiles,
                consolas, relojes y cafeteras). Cada dispositivo ha sido <strong>probado, limpiado y certificado como 100% funcional</strong> y
                cuenta con <strong>1 año completo de Garantía Oficial Amazon Renewed</strong> tras tu compra.
              </p>
              <p className="sm:hidden mt-2 inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-500/15 border border-emerald-400/50 text-[11px] font-bold text-emerald-200">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-300" aria-hidden="true" />
                <span>1 año de garantía Amazon · 100% funcionales</span>
              </p>
            </div>

            {/* 4 Official Amazon Renewed Guarantee Pillars */}
            <div className="hidden sm:grid lg:col-span-5 grid-cols-1 sm:grid-cols-2 gap-3">
              <div className="p-3.5 rounded-2xl bg-white/10 border border-emerald-400/35 backdrop-blur-xs">
                <div className="flex items-center gap-2 text-emerald-300 font-black text-xs uppercase mb-1">
                  <ShieldCheck className="w-4 h-4 shrink-0" />
                  <span>1 Año de Garantía Amazon</span>
                </div>
                <p className="text-[11px] text-slate-200 leading-snug">
                  Reemplazo o reembolso total durante <strong>12 meses tras la compra</strong> si no funciona como se espera.
                </p>
              </div>

              <div className="p-3.5 rounded-2xl bg-white/10 border border-emerald-400/35 backdrop-blur-xs">
                <div className="flex items-center gap-2 text-emerald-300 font-black text-xs uppercase mb-1">
                  <CheckCircle2 className="w-4 h-4 shrink-0" />
                  <span>100% Funcionales</span>
                </div>
                <p className="text-[11px] text-slate-200 leading-snug">
                  Inspección técnica profesional de 40 puntos: pantalla, sensores, cámaras, audio y conectividad.
                </p>
              </div>

              <div className="p-3.5 rounded-2xl bg-white/10 border border-emerald-400/35 backdrop-blur-xs">
                <div className="flex items-center gap-2 text-emerald-300 font-black text-xs uppercase mb-1">
                  <BatteryCharging className="w-4 h-4 shrink-0" />
                  <span>Batería &gt;80% Certificada</span>
                </div>
                <p className="text-[11px] text-slate-200 leading-snug">
                  Todos los móviles, tablets y portátiles garantizan una salud de batería superior al 80% respecto a una nueva.
                </p>
              </div>

              <div className="p-3.5 rounded-2xl bg-white/10 border border-emerald-400/35 backdrop-blur-xs">
                <div className="flex items-center gap-2 text-emerald-300 font-black text-xs uppercase mb-1">
                  <RefreshCw className="w-4 h-4 shrink-0" />
                  <span>30 Días Prueba Gratis</span>
                </div>
                <p className="text-[11px] text-slate-200 leading-snug">
                  Pruébalo en casa con envío rápido Prime. Si no te convence su estado, lo devuelves gratis sin preguntas.
                </p>
              </div>
            </div>
          </div>

          {/* Search Bar with Live Autocomplete Dropdown & Quick Filter Chips */}
          <div ref={searchBoxRef} className="max-w-4xl relative z-40">
            <div className="relative flex items-center bg-white rounded-2xl p-1.5 shadow-2xl border-2 border-emerald-400 focus-within:ring-4 focus-within:ring-emerald-400/30 transition-all">
              <Search className="w-5 h-5 text-slate-500 ml-3 mr-2 shrink-0" />
              <input
                type="text"
                value={searchQuery}
                onFocus={() => setIsSearchFocused(true)}
                onChange={(e) => {
                  setSearchQuery(e.target.value);
                  setIsSearchFocused(true);
                }}
                placeholder="Busca en Reacondicionados... (ej: iPhone 13, iPad, Samsung, portátil, Watch, cafetera)"
                aria-label="Buscar productos reacondicionados"
                className="w-full py-2.5 px-1 text-sm sm:text-base text-slate-900 placeholder-slate-500 focus:outline-none bg-transparent font-medium"
              />
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => {
                    setSearchQuery('');
                    setIsSearchFocused(true);
                  }}
                  aria-label="Limpiar búsqueda"
                  className="p-2 text-slate-500 hover:text-slate-900 cursor-pointer"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
              <a
                href={getAmazonSearchUrl(`${searchQuery.trim() || 'amazon renewed'} reacondicionado`, amazonRegion)}
                target="_blank"
                rel="nofollow sponsored noopener noreferrer"
                className="px-3.5 sm:px-6 py-2.5 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white font-black text-xs sm:text-sm shadow-sm transition-all shrink-0 flex items-center gap-1.5"
              >
                <span className="hidden xs:inline">Buscar en {amazonSiteName}</span>
                <span className="xs:hidden">Amazon</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>

            {/* Quick clickable filter chips right under the search bar (mobile & desktop) */}
            <div className="flex items-center gap-1.5 sm:gap-2 flex-nowrap sm:flex-wrap overflow-x-auto mt-2.5 pb-1 [&>*]:shrink-0 [&>*]:whitespace-nowrap">
              <span className="text-[11px] font-bold text-emerald-200 uppercase tracking-wider">
                Filtros rápidos:
              </span>
              {QUICK_REAC_CHIPS.map((chip) => {
                const isActive =
                  searchQuery.toLowerCase() === chip.query.toLowerCase() ||
                  (selectedCategory === chip.cat && !searchQuery);
                return (
                  <button
                    key={chip.label}
                    type="button"
                    onClick={() => {
                      setSearchQuery(chip.query);
                      setSelectedCategory('all');
                      setIsSearchFocused(false);
                    }}
                    className={`px-2.5 py-1 rounded-full text-xs font-bold border transition-all cursor-pointer ${
                      isActive
                        ? 'bg-emerald-400 text-slate-950 border-emerald-300 shadow-sm'
                        : 'bg-white/10 hover:bg-white/20 text-white border-emerald-400/40'
                    }`}
                  >
                    {chip.label}
                  </button>
                );
              })}
            </div>

            {/* Live Autocomplete Dropdown while typing or focusing (Mobile & Desktop) */}
            {isSearchFocused && (
              <div className="absolute left-0 right-0 top-[58px] mt-1 bg-white text-slate-900 rounded-2xl shadow-2xl border-2 border-emerald-500 overflow-hidden z-50 max-h-[72vh] overflow-y-auto">
                {/* Quick category filter pills inside dropdown */}
                <div className="p-2.5 sm:p-3 bg-emerald-50/70 border-b border-emerald-100">
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="text-[10px] font-black uppercase tracking-wider text-emerald-900">
                      Filtrar por categoría reacondicionada:
                    </span>
                    <button
                      type="button"
                      onClick={() => setIsSearchFocused(false)}
                      className="text-[11px] font-bold text-slate-500 hover:text-slate-900 flex items-center gap-0.5 cursor-pointer"
                    >
                      <span>Cerrar</span>
                      <X className="w-3.5 h-3.5" />
                    </button>
                  </div>
                  <div className="flex items-center gap-1.5 overflow-x-auto pb-1 [&>*]:shrink-0 [&>*]:whitespace-nowrap">
                    {(matchingCategoryChips.length > 0
                      ? matchingCategoryChips
                      : REACONDICIONADOS_CATEGORIES.filter((c) => c.id !== 'all')
                    ).map((cat) => (
                      <button
                        key={cat.id}
                        type="button"
                        onClick={() => {
                          setSelectedCategory(cat.id);
                          setSearchQuery('');
                          setIsSearchFocused(false);
                        }}
                        className={`px-2.5 py-1 rounded-lg text-xs font-bold border transition-all cursor-pointer flex items-center gap-1 ${
                          selectedCategory === cat.id
                            ? 'bg-emerald-700 text-white border-emerald-700'
                            : 'bg-white hover:bg-emerald-50 text-slate-800 border-emerald-200'
                        }`}
                      >
                        <span>{cat.emoji}</span>
                        <span>{cat.label}</span>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Matching clickable product suggestions */}
                {searchQuery.trim().length > 0 ? (
                  liveSearchSuggestions.length > 0 ? (
                    <div className="divide-y divide-slate-100">
                      <div className="px-3 py-1.5 bg-slate-50 text-[10px] font-black uppercase tracking-wider text-slate-500 flex items-center justify-between">
                        <span>Productos Reacondicionados encontrados ({liveSearchSuggestions.length}+)</span>
                        <span className="text-emerald-700">Toca para abrir en Amazon</span>
                      </div>
                      {liveSearchSuggestions.map((item) => {
                        const itemUrl = getAmazonProductUrl(item.asin, item.title, amazonRegion);
                        return (
                          <a
                            key={item.id}
                            href={itemUrl}
                            target="_blank"
                            rel="nofollow sponsored noopener noreferrer"
                            onClick={() => setIsSearchFocused(false)}
                            className="flex items-center gap-3 p-2.5 sm:p-3 hover:bg-emerald-50/70 active:bg-emerald-100/70 transition-colors cursor-pointer group"
                          >
                            <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-xl bg-white border border-slate-200 p-1 shrink-0 flex items-center justify-center overflow-hidden">
                              <img
                                src={item.imageUrl}
                                alt={item.title}
                                className="w-full h-full object-contain"
                                loading="lazy"
                              />
                            </div>
                            <div className="flex-1 min-w-0">
                              <div className="flex items-center gap-1.5 mb-0.5">
                                <span className="px-1.5 py-0.5 rounded bg-emerald-100 text-emerald-900 font-black text-[9px] uppercase">
                                  ♻️ 1 Año Garantía
                                </span>
                                <span className="text-[10px] font-bold text-slate-500 truncate">
                                  {item.conditionGrade}
                                </span>
                              </div>
                              <p className="text-xs sm:text-sm font-bold text-slate-900 group-hover:text-emerald-800 line-clamp-1">
                                {item.title}
                              </p>
                              <div className="flex items-center gap-2 mt-0.5">
                                <span className="text-sm font-black text-emerald-800">
                                  {formatPrice(item.priceText)}
                                </span>
                                {item.originalPriceText && (
                                  <span className="text-[11px] text-slate-400 line-through">
                                    {formatPrice(item.originalPriceText)}
                                  </span>
                                )}
                                {item.discountPercent && item.discountPercent > 0 && (
                                  <span className="px-1.5 py-0.2 rounded bg-black border border-amber-400 text-amber-300 font-black text-[10px]">
                                    -{item.discountPercent}%
                                  </span>
                                )}
                              </div>
                            </div>
                            <span className="px-2.5 py-1.5 rounded-xl bg-[#ffd814] group-hover:bg-[#f7ca00] text-slate-950 font-black text-[11px] shrink-0 flex items-center gap-1 shadow-2xs">
                              <span className="hidden sm:inline">Ver oferta</span>
                              <ExternalLink className="w-3.5 h-3.5" />
                            </span>
                          </a>
                        );
                      })}
                    </div>
                  ) : (
                    <div className="p-4 text-center space-y-2">
                      <p className="text-xs font-bold text-slate-700">
                        No hay coincidencias exactas en el catálogo local para &ldquo;{searchQuery}&rdquo;
                      </p>
                      <a
                        href={getAmazonSearchUrl(`${searchQuery.trim()} reacondicionado amazon renewed`, amazonRegion)}
                        target="_blank"
                        rel="nofollow sponsored noopener noreferrer"
                        onClick={() => setIsSearchFocused(false)}
                        className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white font-black text-xs shadow-sm"
                      >
                        <span>Buscar &ldquo;{searchQuery}&rdquo; en Amazon Renewed ({amazonSiteName})</span>
                        <ExternalLink className="w-3.5 h-3.5" />
                      </a>
                    </div>
                  )
                ) : (
                  <div className="divide-y divide-slate-100">
                    <div className="px-3 py-1.5 bg-slate-50 text-[10px] font-black uppercase tracking-wider text-slate-500">
                      Reacondicionados más buscados hoy (1 Año de Garantía Oficial)
                    </div>
                    {REACONDICIONADOS_PRODUCTS.slice(0, 5).map((item) => {
                      const itemUrl = getAmazonProductUrl(item.asin, item.title, amazonRegion);
                      return (
                        <a
                          key={item.id}
                          href={itemUrl}
                          target="_blank"
                          rel="nofollow sponsored noopener noreferrer"
                          onClick={() => setIsSearchFocused(false)}
                          className="flex items-center gap-3 p-2.5 hover:bg-emerald-50/70 transition-colors cursor-pointer group"
                        >
                          <div className="w-11 h-11 rounded-xl bg-white border border-slate-200 p-1 shrink-0 flex items-center justify-center overflow-hidden">
                            <img src={item.imageUrl} alt={item.title} className="w-full h-full object-contain" loading="lazy" />
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className="text-xs font-bold text-slate-900 group-hover:text-emerald-800 line-clamp-1">
                              {item.title}
                            </p>
                            <div className="flex items-center gap-2 mt-0.5">
                              <span className="text-xs font-black text-emerald-800">{formatPrice(item.priceText)}</span>
                              <span className="text-[10px] font-semibold text-emerald-700">{item.conditionGrade}</span>
                            </div>
                          </div>
                          <ExternalLink className="w-4 h-4 text-slate-400 group-hover:text-emerald-700 shrink-0" />
                        </a>
                      );
                    })}
                  </div>
                )}

                {/* Direct Amazon Renewed search footer link inside dropdown */}
                <a
                  href={getAmazonSearchUrl(`${searchQuery.trim() || 'amazon renewed'} reacondicionado`, amazonRegion)}
                  target="_blank"
                  rel="nofollow sponsored noopener noreferrer"
                  onClick={() => setIsSearchFocused(false)}
                  className="block p-3 bg-slate-900 hover:bg-slate-800 text-center text-xs font-black text-emerald-300 transition-colors"
                >
                  🔍 Ver todos los resultados de &ldquo;{searchQuery.trim() || 'Amazon Renewed'}&rdquo; en {amazonSiteName} →
                </a>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* 2. MAIN WORKSPACE */}
      <main className="flex-1 max-w-[1600px] w-full mx-auto px-4 sm:px-6 lg:px-8 py-3 sm:py-8">
        {/* FILTERS */}
        <section
          aria-label="Filtros de productos reacondicionados"
          className="bg-white rounded-3xl border border-slate-200/90 shadow-sm p-3 sm:p-6 mb-4 sm:mb-7 space-y-3 sm:space-y-5"
        >
          <div className="flex flex-col xl:flex-row xl:items-center justify-between gap-4 pb-4 border-b border-slate-100">
            <div className="flex flex-wrap items-center gap-2.5">
              <div className="flex items-center gap-2 bg-slate-50 border border-emerald-200 rounded-xl px-3 py-2">
                <ArrowDownWideNarrow className="w-4 h-4 text-emerald-700 shrink-0" />
                <span className="text-xs font-black text-slate-700">Ordenar:</span>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value as 'featured' | 'price-asc' | 'price-desc' | 'rating')}
                  aria-label="Ordenar productos reacondicionados"
                  className="text-xs sm:text-sm font-bold text-slate-900 bg-transparent focus:outline-none cursor-pointer"
                >
                  <option value="featured">Destacados Amazon Renewed</option>
                  <option value="price-asc">Precio: menor a mayor</option>
                  <option value="price-desc">Precio: mayor a menor</option>
                  <option value="rating">Mejor valorados (★)</option>
                </select>
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-2">
              <span className="text-xs font-black text-slate-700 flex items-center gap-1">
                <Tag className="w-3.5 h-3.5 text-emerald-700" />
                <span>Rango de precio:</span>
              </span>
              <input
                type="number"
                min={0}
                value={minPrice}
                onChange={(e) => {
                  setMinPrice(e.target.value);
                  setActivePricePreset('custom');
                }}
                placeholder="Mín €"
                aria-label="Precio mínimo"
                className="w-24 px-3 py-1.5 rounded-xl border border-emerald-200 bg-slate-50 text-xs sm:text-sm font-bold text-slate-900 focus:outline-none focus:border-emerald-500"
              />
              <span className="text-slate-400 font-bold">–</span>
              <input
                type="number"
                min={0}
                value={maxPrice}
                onChange={(e) => {
                  setMaxPrice(e.target.value);
                  setActivePricePreset('custom');
                }}
                placeholder="Máx €"
                aria-label="Precio máximo"
                className="w-24 px-3 py-1.5 rounded-xl border border-emerald-200 bg-slate-50 text-xs sm:text-sm font-bold text-slate-900 focus:outline-none focus:border-emerald-500"
              />
              {(searchQuery || selectedCategory !== 'all' || minPrice || maxPrice) && (
                <button
                  type="button"
                  onClick={handleResetFilters}
                  className="inline-flex items-center gap-1 px-3 py-1.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-bold cursor-pointer"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span>Reiniciar</span>
                </button>
              )}
            </div>
          </div>

          {/* Categories */}
          <div>
            <p className="text-[11px] font-black uppercase tracking-wider text-slate-600 mb-2">
              Categorías de Reacondicionados Certificados:
            </p>
            <div className="flex items-center gap-2 flex-nowrap sm:flex-wrap overflow-x-auto [&>*]:shrink-0 [&>*]:whitespace-nowrap">
              {REACONDICIONADOS_CATEGORIES.map((cat) => {
                const isActive = selectedCategory === cat.id;
                return (
                  <button
                    key={cat.id}
                    type="button"
                    onClick={() => setSelectedCategory(cat.id)}
                    className={`px-3.5 py-2 rounded-xl text-xs font-bold border transition-all cursor-pointer flex items-center gap-1.5 ${
                      isActive
                        ? 'bg-emerald-700 text-white border-emerald-700 shadow-sm ring-2 ring-emerald-200'
                        : 'bg-gradient-to-b from-white to-emerald-50/40 text-slate-800 border-emerald-200/90 hover:border-emerald-400 hover:bg-emerald-50/70'
                    }`}
                  >
                    <span aria-hidden="true">{cat.emoji}</span>
                    <span>{cat.label}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Quick Price Presets */}
          <div>
            <p className="text-[11px] font-black uppercase tracking-wider text-slate-600 mb-2">
              Presupuesto:
            </p>
            <div className="flex items-center gap-2 flex-nowrap sm:flex-wrap overflow-x-auto [&>*]:shrink-0 [&>*]:whitespace-nowrap">
              {PRICE_PRESETS.map((preset) => {
                const isActive = activePricePreset === preset.id;
                return (
                  <button
                    key={preset.id}
                    type="button"
                    onClick={() => handleSelectPricePreset(preset)}
                    className={`px-3.5 py-1.5 rounded-xl text-xs font-bold border transition-all cursor-pointer ${
                      isActive
                        ? 'bg-slate-900 text-white border-slate-900 shadow-sm'
                        : 'bg-gradient-to-b from-white to-slate-50 text-slate-800 border-emerald-200/85 hover:border-emerald-400'
                    }`}
                  >
                    {preset.label}
                  </button>
                );
              })}
            </div>
          </div>
        </section>

        {/* PRODUCTS GRID */}
        <section aria-label="Catálogo de productos reacondicionados" className="mb-12">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4">
            <div>
              <h2 className="text-xl sm:text-2xl font-black text-slate-950 flex items-center gap-2">
                <span>♻️</span>
                <span>
                  {selectedCatObj.label} ({filteredProducts.length} verificados)
                </span>
              </h2>
              <p className="text-xs sm:text-sm text-slate-600 mt-0.5">
                Pulsa en <strong>&ldquo;Leer más: Estado y Garantía&rdquo;</strong> en cualquier producto para ver su grado estético, salud de batería y el año completo de garantía de Amazon.
              </p>
            </div>

            <a
              href={getAmazonSearchUrl(selectedCatObj.query, amazonRegion)}
              target="_blank"
              rel="nofollow sponsored noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white font-bold text-xs shadow-xs transition-all shrink-0 self-start sm:self-auto"
            >
              <span>Ver todos en Amazon Renewed</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>

          {filteredProducts.length > 0 ? (
            <>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-2.5 sm:gap-3">
                {filteredProducts.slice(0, visibleCount).map((item) => (
                  <RefurbishedProductCard key={item.id} item={item} />
                ))}
              </div>

              {filteredProducts.length > visibleCount && (
                <div className="mt-7 flex justify-center">
                  <button
                    type="button"
                    onClick={() => setVisibleCount((v) => v + 24)}
                    className="px-7 py-3.5 rounded-2xl bg-emerald-700 hover:bg-emerald-800 text-white font-black text-sm shadow-md cursor-pointer transition-all"
                  >
                    Mostrar más reacondicionados (+24 · {Math.min(visibleCount, filteredProducts.length)}/{filteredProducts.length})
                  </button>
                </div>
              )}
            </>
          ) : (
            <div className="bg-white rounded-3xl border border-dashed border-slate-300 p-10 text-center space-y-3">
              <p className="text-base font-bold text-slate-900">
                No hay productos en el listado actual con ese filtro exacto
              </p>
              <div className="flex items-center justify-center gap-2 pt-2">
                <button
                  type="button"
                  onClick={handleResetFilters}
                  className="px-4 py-2 rounded-xl bg-emerald-700 text-white text-xs font-bold cursor-pointer"
                >
                  Ver todos los Reacondicionados
                </button>
                <a
                  href={getAmazonSearchUrl(`${searchQuery || selectedCatObj.query} reacondicionado`, amazonRegion)}
                  target="_blank"
                  rel="nofollow sponsored noopener noreferrer"
                  className="px-4 py-2 rounded-xl bg-amber-400 text-slate-950 text-xs font-black inline-flex items-center gap-1"
                >
                  <span>Buscar en {amazonSiteName}</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>
          )}
        </section>

        {/* DETAILED SEO GUIDE ON AMAZON RENEWED GRADES & WARRANTY */}
        <section className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-xs space-y-6">
          <div>
            <h2 className="text-xl sm:text-2xl font-black text-slate-950 mb-2">
              Guía Oficial: ¿Qué estado tienen los Reacondicionados de Amazon y qué cubre su Garantía?
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              Comprar o regalar un dispositivo de <strong>Amazon Renewed</strong> es la forma más inteligente de conseguir un iPhone, iPad, MacBook, Samsung Galaxy o cafetera de gama alta ahorrando entre un 30% y un 50%, con total tranquilidad postventa.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            <div className="p-4 rounded-2xl bg-emerald-50/60 border border-emerald-200 space-y-1.5">
              <h3 className="text-sm font-black text-emerald-950 flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                <span>Estado Excelente (Como Nuevo)</span>
              </h3>
              <p className="text-xs text-slate-700 leading-relaxed">
                Pantalla 100% libre de arañazos y cuerpo sin marcas estéticas visibles a 30 centímetros de distancia. Batería comprobada con capacidad superior al 80%-85% de una nueva.
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-emerald-50/60 border border-emerald-200 space-y-1.5">
              <h3 className="text-sm font-black text-emerald-950 flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-emerald-600" />
                <span>1 Año de Garantía Oficial Amazon</span>
              </h3>
              <p className="text-xs text-slate-700 leading-relaxed">
                Después de tu compra tienes <strong>1 año entero (365 días) de cobertura directa con Amazon Renewed</strong>: si surge cualquier fallo técnico, Amazon gestiona el reemplazo o el reembolso íntegro de tu dinero.
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-emerald-50/60 border border-emerald-200 space-y-1.5">
              <h3 className="text-sm font-black text-emerald-950 flex items-center gap-1.5">
                <Award className="w-4 h-4 text-emerald-600" />
                <span>100% Funcionales e Higienizados</span>
              </h3>
              <p className="text-xs text-slate-700 leading-relaxed">
                Cada producto supera un diagnóstico completo de hardware, limpieza profesional, borrado seguro de datos de fábrica e incluye los accesorios de carga compatibles listos para usar o regalar.
              </p>
            </div>
          </div>

          <div className="pt-4 border-t border-slate-100">
            <h2 className="text-lg sm:text-xl font-black text-slate-900 mb-4">
              Preguntas frecuentes sobre los Reacondicionados de Amazon
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {REAC_FAQS.map((faq, idx) => (
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
