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

const PRICE_PRESETS_ES = [
  { id: 'all', label: 'Todos los precios', min: '', max: '' },
  { id: '<100', label: 'Menos de 100 €', min: '', max: '100' },
  { id: '100-250', label: '100 € – 250 €', min: '100', max: '250' },
  { id: '250-500', label: '250 € – 500 €', min: '250', max: '500' },
  { id: '>500', label: 'Más de 500 €', min: '500', max: '' },
];

const PRICE_PRESETS_EN = [
  { id: 'all', label: 'All prices', min: '', max: '' },
  { id: '<100', label: 'Under $100 / €100', min: '', max: '100' },
  { id: '100-250', label: '$100 – $250', min: '100', max: '250' },
  { id: '250-500', label: '$250 – $500', min: '250', max: '500' },
  { id: '>500', label: 'Over $500', min: '500', max: '' },
];

const REAC_FAQS_ES = [
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
  {
    q: '¿Cuál es la diferencia entre un producto Reacondicionado de Amazon y comprar de Segunda Mano a un particular?',
    a: 'Al comprar de segunda mano a un particular no tienes garantía, la batería no está certificada y no puedes devolverlo si falla. En cambio, un Reacondicionado Certificado de Amazon (Amazon Renewed) pasa un test técnico oficial de 40 puntos, garantiza una batería con más del 80% de salud real, incluye 30 días de devolución gratuita y 1 año completo (365 días) de Garantía Oficial de Amazon con reemplazo o reembolso del 100%.',
  },
];

const REAC_FAQS_EN = [
  {
    q: 'What exactly are Certified Amazon Renewed (Refurbished) products?',
    a: 'They are top-brand devices (Apple, Samsung, Sony, Lenovo, Garmin, DeLonghi, etc.) professionally inspected, tested, cleaned, and sanitized by Amazon-qualified technicians to work and look like new—saving you up to 50% off the brand-new retail price.',
  },
  {
    q: 'How long is the official Amazon warranty after buying a refurbished product?',
    a: 'Every product includes a full 1-Year (12-Month) Official Amazon Renewed Guarantee after purchase: you are entitled to a free replacement or 100% full refund if the device does not perform as expected, plus a 30-day free home trial.',
  },
  {
    q: 'Are they 100% functional, and what condition are the battery and screen in?',
    a: 'Yes, 100% of devices are fully functional. For smartphones, tablets, laptops, and smartwatches, Amazon tests and guarantees a real battery capacity above 80% compared to a brand-new battery, with zero screen cracks or dead pixels.',
  },
  {
    q: 'What do "Excellent (Grade A+)" and "Very Good" mean when tapping "Read More" on a product?',
    a: '"Excellent (Grade A+)" means the device has zero visible cosmetic scratches from 12 inches (30 cm) away and looks like new. "Very Good" is 100% functional with >80% verified battery health and may only have minor micro-marks barely noticeable up close.',
  },
  {
    q: 'What is the difference between Certified Amazon Renewed and buying Used / Second-Hand from a private seller?',
    a: 'Buying second-hand from a random private seller comes with 0 days of warranty, an untested battery, and zero return rights. Certified Amazon Renewed devices pass a 40-point lab inspection, guarantee >80% real battery health, and include a 30-day free trial plus a full 1-Year (365-Day) Official Amazon Guarantee with free replacement or 100% refund.',
  },
];

const CATEGORY_LABEL_EN: Record<string, string> = {
  all: 'All Certified Refurbished',
  smartphones: 'iPhone & Smartphones',
  portatiles: 'Laptops, iPad & Tablets',
  audio: 'Smartwatches & Audio',
  hogar: 'Coffee Machines & Home',
  gaming: 'Consoles & Gaming',
  'Smartphones e iPhone': 'Smartphones & iPhone',
  'Portátiles, iPad y Tablets': 'Laptops, iPad & Tablets',
  'Smartwatches y Audio': 'Smartwatches & Audio',
  'Cafeteras y Hogar': 'Coffee Machines & Home',
  'Consolas y Gaming': 'Consoles & Gaming',
};

function translateConditionText(text: string, isEs: boolean): string {
  if (isEs || !text) return text;
  return text
    .replace('Estado: Excelente (Grado A+ · Como nuevo)', 'Condition: Excellent (Grade A+ · Like New)')
    .replace('Estado: Muy Bueno (Grado A · Revisado)', 'Condition: Very Good (Grade A · Certified)')
    .replace(
      '100% funcional · Batería testada con capacidad superior al 85% garantizada por Amazon Renewed.',
      '100% functional · Tested battery with >85% real capacity guaranteed by Amazon Renewed.'
    )
    .replace(
      '100% funcional · Diagnóstico electrónico y mecánico de 40 puntos superado.',
      '100% functional · Passed 40-point electronic and hardware diagnostic inspection.'
    )
    .replace(
      '1 año de Garantía Oficial Amazon Renewed + 30 días de prueba con devolución gratuita.',
      '1-Year Official Amazon Renewed Warranty + 30-day free home trial & returns.'
    )
    .replace('(Reacondicionado)', '(Certified Refurbished)');
}

function RefurbishedProductCard({ item }: { item: RefurbishedProduct }) {
  const { ui, localeKey, langCode, amazonRegion, formatPrice } = useActiveLocale();
  const isEs = localeKey === 'es' || localeKey === 'es-us';
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
          <span>{isEs ? '1 Año Garantía' : '1-Year Warranty'}</span>
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
            {isEs ? item.categoryLabel : CATEGORY_LABEL_EN[item.categoryLabel] || item.categoryLabel}
          </span>

          <p className="font-semibold text-xs sm:text-[13px] leading-snug text-slate-900 group-hover:text-emerald-800 transition-colors mb-1 min-h-[2.1rem]">
            <a
              href={directUrl}
              target="_blank"
              rel="nofollow sponsored noopener noreferrer"
              className="block line-clamp-2 hover:underline"
            >
              {translateConditionText(item.title, isEs)}
            </a>
          </p>

          {/* Visible Condition Pill */}
          <div className="mb-1.5">
            <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-emerald-50 border border-emerald-200 text-emerald-900 font-bold text-[10px] truncate max-w-full">
              <CheckCircle2 className="w-3 h-3 text-emerald-600 shrink-0" />
              <span className="truncate">{translateConditionText(item.conditionGrade, isEs)}</span>
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
                <span className="truncate">
                  {isEs ? 'Leer más: Estado y Garantía' : 'Read More: Condition & Warranty'}
                </span>
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
                    <span>{isEs ? 'Ficha Oficial Amazon Renewed' : 'Official Amazon Renewed Spec'}</span>
                  </span>
                  <button
                    type="button"
                    onClick={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                      setShowDetails(false);
                    }}
                    aria-label={isEs ? 'Cerrar' : 'Close'}
                    className="p-0.5 rounded-md text-slate-400 hover:text-slate-700 hover:bg-slate-100 cursor-pointer"
                  >
                    <X className="w-3.5 h-3.5" />
                  </button>
                </div>

                <div className="p-2 rounded-lg bg-emerald-50/80 border border-emerald-200">
                  <p className="text-[11px] font-black text-emerald-950">
                    {translateConditionText(item.conditionGrade, isEs)}
                  </p>
                  <p className="text-[11px] text-emerald-900 mt-0.5 leading-snug">
                    {isEs
                      ? '100% funcional, higienizado y verificado por técnicos certificados de Amazon.'
                      : '100% functional, sanitized, and verified by Amazon-certified technicians.'}
                  </p>
                </div>

                <ul className="space-y-1 text-[11px] text-slate-700 pl-3.5 list-disc marker:text-emerald-600 leading-snug">
                  {item.pros.map((pro, idx) => (
                    <li key={idx}>{translateConditionText(pro, isEs)}</li>
                  ))}
                </ul>

                <div className="pt-1.5 border-t border-emerald-100">
                  <p className="text-[10px] font-extrabold text-slate-900 flex items-center gap-1">
                    <Award className="w-3.5 h-3.5 text-amber-600 shrink-0" />
                    <span>{isEs ? 'Garantía tras la compra:' : 'Post-Purchase Warranty:'}</span>
                  </p>
                  <p className="text-[11px] text-slate-700 leading-snug mt-0.5">
                    {isEs ? (
                      <>
                        <strong>1 año (12 meses) de Garantía Amazon Renewed</strong> con reemplazo o reembolso total + 30 días de prueba gratuita.
                      </>
                    ) : (
                      <>
                        <strong>1-Year (12-Month) Official Amazon Renewed Guarantee</strong> with free replacement or 100% full refund + 30-day free trial.
                      </>
                    )}
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
            <span className="text-slate-700 font-medium">
              {isEs ? '1 Año de Garantía Oficial' : '1-Year Official Warranty'}
            </span>
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

export default function ReacondicionadosView({
  initialCategory,
}: {
  initialCategory?: string;
} = {}) {
  const { localeKey, localePath, activeCurrency, amazonRegion, amazonSiteName, isRtl, formatPrice } = useActiveLocale();
  const isEs = localeKey === 'es' || localeKey === 'es-us';
  const activeFaqs = isEs ? REAC_FAQS_ES : REAC_FAQS_EN;
  const activePricePresets = isEs ? PRICE_PRESETS_ES : PRICE_PRESETS_EN;

  const [searchQuery, setSearchQuery] = useState('');
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const searchBoxRef = useRef<HTMLDivElement>(null);
  const [selectedCategory, setSelectedCategory] = useState(initialCategory || 'all');
  const [minPrice, setMinPrice] = useState('');
  const [maxPrice, setMaxPrice] = useState('');
  const [activePricePreset, setActivePricePreset] = useState('all');
  const [sortBy, setSortBy] = useState<'featured' | 'price-asc' | 'price-desc' | 'rating'>('featured');
  const [visibleCount, setVisibleCount] = useState(24);

  useEffect(() => {
    if (initialCategory) {
      setSelectedCategory(initialCategory);
    }
  }, [initialCategory]);

  useEffect(() => {
    const handleOutsideClick = (e: MouseEvent) => {
      if (searchBoxRef.current && !searchBoxRef.current.contains(e.target as Node)) {
        setIsSearchFocused(false);
      }
    };
    document.addEventListener('mousedown', handleOutsideClick);
    return () => document.removeEventListener('mousedown', handleOutsideClick);
  }, []);

  const QUICK_REAC_CHIPS = isEs
    ? [
        { label: '📱 iPhone 13 / 15', query: 'iPhone', cat: 'smartphones' },
        { label: '📲 Apple iPad', query: 'iPad', cat: 'portatiles' },
        { label: '💻 Portátiles 32GB', query: 'Portátil', cat: 'portatiles' },
        { label: '⌚ Apple Watch / Garmin', query: 'Watch', cat: 'audio' },
        { label: '🎧 Sony / AirPods', query: 'Auriculares', cat: 'audio' },
        { label: '☕ Cafeteras DeLonghi', query: 'Cafetera', cat: 'hogar' },
        { label: '🎮 Consolas y Gaming', query: 'Consola', cat: 'gaming' },
      ]
    : [
        { label: '📱 iPhone 13 / 15', query: 'iPhone', cat: 'smartphones' },
        { label: '📲 Apple iPad', query: 'iPad', cat: 'portatiles' },
        { label: '💻 32GB Laptops', query: 'Lenovo', cat: 'portatiles' },
        { label: '⌚ Apple Watch / Garmin', query: 'Watch', cat: 'audio' },
        { label: '🎧 Sony / AirPods', query: 'Sony', cat: 'audio' },
        { label: '☕ DeLonghi Coffee', query: 'DeLonghi', cat: 'hogar' },
        { label: '🎮 Consoles & Gaming', query: 'Gaming', cat: 'gaming' },
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
      (c) =>
        c.id !== 'all' &&
        `${c.label} ${CATEGORY_LABEL_EN[c.id] || ''} ${c.query}`.toLowerCase().includes(q)
    );
  }, [searchQuery]);

  const selectedCatObj = useMemo(
    () => REACONDICIONADOS_CATEGORIES.find((c) => c.id === selectedCategory) || REACONDICIONADOS_CATEGORIES[0],
    [selectedCategory]
  );

  const selectedCatLabel = isEs
    ? selectedCatObj.label
    : CATEGORY_LABEL_EN[selectedCatObj.id] || selectedCatObj.label;

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

  const handleSelectPricePreset = (preset: (typeof PRICE_PRESETS_ES)[number]) => {
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

  const structuredData = useMemo(() => {
    const schemaCurrency = activeCurrency === 'USD' ? 'USD' : 'EUR';
    const countryCode = schemaCurrency === 'USD' ? 'US' : 'ES';
    const topItems = filteredProducts.slice(0, 30);

    return {
      '@context': 'https://schema.org',
      '@graph': [
        {
          '@type': 'CollectionPage',
          name: isEs
            ? 'Productos Reacondicionados Certificados de Amazon y Segunda Mano con 1 Año de Garantía Oficial'
            : 'Certified Amazon Renewed & Second-Hand Tech with 1-Year Official Warranty',
          url: isEs
            ? 'https://www.unbuenregalo.es/reacondicionados'
            : 'https://www.unbuenregalo.es/en/refurbished',
          description: isEs
            ? 'Catálogo comparativo de productos reacondicionados certificados de Amazon (la alternativa segura a la segunda mano) 100% funcionales: iPhones, iPads, portátiles, consolas, smartwatches y cafeteras con 1 año de Garantía Oficial Amazon Renewed.'
            : 'Catalog of 100% functional Certified Amazon Renewed devices (the safe alternative to second-hand): iPhones, iPads, laptops, consoles, smartwatches, and coffee machines with a 1-Year Official Amazon Renewed Guarantee.',
          inLanguage: isEs ? 'es-ES' : 'en-US',
        },
        {
          '@type': 'ItemList',
          name: isEs
            ? `${selectedCatLabel} — Reacondicionados Certificados Amazon Renewed (1 Año Garantía)`
            : `${selectedCatLabel} — Certified Amazon Renewed (1-Year Official Warranty)`,
          numberOfItems: filteredProducts.length,
          itemListElement: topItems.map((prod, idx) => {
            const directUrl = getAmazonProductUrl(prod.asin, prod.title, amazonRegion);
            const cleanTitle = translateConditionText(prod.title, isEs);
            const cleanDesc = translateConditionText(prod.description, isEs);
            const priceVal =
              schemaCurrency === 'USD' ? (prod.priceNumeric * 1.08).toFixed(2) : prod.priceNumeric.toFixed(2);
            return {
              '@type': 'ListItem',
              position: idx + 1,
              item: {
                '@type': 'Product',
                name: cleanTitle,
                image: prod.imageUrl,
                description: cleanDesc,
                sku: prod.asin,
                mpn: prod.asin,
                itemCondition: 'https://schema.org/RefurbishedCondition',
                brand: {
                  '@type': 'Brand',
                  name: prod.title.split(' ')[0] || 'Amazon Renewed',
                },
                offers: {
                  '@type': 'Offer',
                  price: priceVal,
                  priceCurrency: schemaCurrency,
                  itemCondition: 'https://schema.org/RefurbishedCondition',
                  availability: 'https://schema.org/InStock',
                  url: directUrl,
                  validFrom: '2026-01-01',
                  priceValidUntil: '2026-12-31',
                  hasMerchantReturnPolicy: {
                    '@type': 'MerchantReturnPolicy',
                    applicableCountry: countryCode,
                    returnPolicyCategory: 'https://schema.org/MerchantReturnFiniteReturnWindow',
                    merchantReturnDays: 30,
                    returnMethod: 'https://schema.org/ReturnByMail',
                    returnFees: 'https://schema.org/FreeReturn',
                  },
                  shippingDetails: {
                    '@type': 'OfferShippingDetails',
                    shippingRate: {
                      '@type': 'MonetaryAmount',
                      value: '0.00',
                      currency: schemaCurrency,
                    },
                    shippingDestination: {
                      '@type': 'DefinedRegion',
                      addressCountry: countryCode,
                    },
                    deliveryTime: {
                      '@type': 'ShippingDeliveryTime',
                      handlingTime: {
                        '@type': 'QuantitativeValue',
                        minValue: 0,
                        maxValue: 1,
                        unitCode: 'DAY',
                      },
                      transitTime: {
                        '@type': 'QuantitativeValue',
                        minValue: 1,
                        maxValue: 3,
                        unitCode: 'DAY',
                      },
                    },
                  },
                },
                aggregateRating: {
                  '@type': 'AggregateRating',
                  ratingValue: (prod.rating || 4.5).toString(),
                  reviewCount: (prod.reviewsCount || 50).toString(),
                  bestRating: '5',
                  worstRating: '1',
                },
              },
            };
          }),
        },
        {
          '@type': 'BreadcrumbList',
          itemListElement: [
            {
              '@type': 'ListItem',
              position: 1,
              name: isEs ? 'Inicio' : 'Home',
              item: isEs ? 'https://www.unbuenregalo.es/' : 'https://www.unbuenregalo.es/en',
            },
            {
              '@type': 'ListItem',
              position: 2,
              name: isEs ? 'Reacondicionados Certificados Amazon' : 'Certified Amazon Renewed',
              item: isEs
                ? 'https://www.unbuenregalo.es/reacondicionados'
                : 'https://www.unbuenregalo.es/en/refurbished',
            },
          ],
        },
        {
          '@type': 'FAQPage',
          mainEntity: activeFaqs.map((f) => ({
            '@type': 'Question',
            name: f.q,
            acceptedAnswer: {
              '@type': 'Answer',
              text: f.a,
            },
          })),
        },
      ],
    };
  }, [isEs, activeFaqs, activeCurrency, filteredProducts, selectedCatLabel, amazonRegion]);

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
              {isEs ? 'Inicio' : 'Home'}
            </Link>
            <ChevronRight className="w-3.5 h-3.5 text-emerald-500" />
            <span className="text-emerald-300 font-bold">
              {isEs ? 'Reacondicionados Certificados Amazon' : 'Certified Amazon Renewed (Refurbished)'}
            </span>
          </nav>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-3 sm:gap-6 items-center mb-3 sm:mb-6">
            <div className="lg:col-span-7">
              <div className="hidden sm:flex flex-wrap items-center gap-2 mb-3">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500 text-slate-950 font-black text-xs uppercase tracking-wider shadow-md">
                  <span>♻️</span>
                  <span>{isEs ? 'AMAZON RENEWED · CERTIFICADOS' : 'AMAZON RENEWED · CERTIFIED'}</span>
                </span>
                <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-white/10 border border-emerald-400/40 text-emerald-200 font-bold text-[11px]">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-300" />
                  <span>
                    {isEs
                      ? '1 Año de Garantía Oficial Amazon + 100% Funcionales'
                      : '1-Year Official Amazon Warranty + 100% Functional'}
                  </span>
                </span>
              </div>

              <h1 className="text-2xl sm:text-4xl lg:text-5xl font-black tracking-tight leading-tight mb-2 sm:mb-3">
                {isEs ? (
                  <>
                    Productos{' '}
                    <span className="bg-gradient-to-r from-emerald-300 via-teal-200 to-amber-300 bg-clip-text text-transparent">
                      Reacondicionados de Amazon
                    </span>{' '}
                    Como Nuevos
                  </>
                ) : (
                  <>
                    Certified{' '}
                    <span className="bg-gradient-to-r from-emerald-300 via-teal-200 to-amber-300 bg-clip-text text-transparent">
                      Amazon Renewed Tech
                    </span>{' '}
                    Like New
                  </>
                )}
              </h1>

              <p className="text-sm sm:text-base text-slate-200 leading-relaxed max-w-2xl line-clamp-2 sm:line-clamp-none">
                {isEs ? (
                  <>
                    Ahorra hasta un 50% en tecnología de primeras marcas (Apple iPhone, iPad, Samsung, portátiles,
                    consolas, relojes y cafeteras). Cada dispositivo ha sido{' '}
                    <strong>probado, limpiado y certificado como 100% funcional</strong> y cuenta con{' '}
                    <strong>1 año completo de Garantía Oficial Amazon Renewed</strong> tras tu compra.
                  </>
                ) : (
                  <>
                    Save up to 50% on top-brand tech (Apple iPhone, iPad, Samsung, laptops, consoles, smartwatches,
                    and espresso machines). Every device is{' '}
                    <strong>40-point tested, sanitized, and certified 100% functional</strong>, backed by a{' '}
                    <strong>full 1-Year Official Amazon Renewed Guarantee</strong> after your purchase.
                  </>
                )}
              </p>
              <p className="sm:hidden mt-2 inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-500/15 border border-emerald-400/50 text-[11px] font-bold text-emerald-200">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-300" aria-hidden="true" />
                <span>
                  {isEs
                    ? '1 año de garantía Amazon · 100% funcionales'
                    : '1-Year Amazon Warranty · 100% functional'}
                </span>
              </p>
            </div>

            {/* 4 Official Amazon Renewed Guarantee Pillars */}
            <div className="hidden sm:grid lg:col-span-5 grid-cols-1 sm:grid-cols-2 gap-3">
              <div className="p-3.5 rounded-2xl bg-white/10 border border-emerald-400/35 backdrop-blur-xs">
                <div className="flex items-center gap-2 text-emerald-300 font-black text-xs uppercase mb-1">
                  <ShieldCheck className="w-4 h-4 shrink-0" />
                  <span>{isEs ? '1 Año de Garantía Amazon' : '1-Year Amazon Warranty'}</span>
                </div>
                <p className="text-[11px] text-slate-200 leading-snug">
                  {isEs ? (
                    <>
                      Reemplazo o reembolso total durante <strong>12 meses tras la compra</strong> si no funciona como se espera.
                    </>
                  ) : (
                    <>
                      Free replacement or 100% full refund for <strong>12 months after purchase</strong> if anything fails.
                    </>
                  )}
                </p>
              </div>

              <div className="p-3.5 rounded-2xl bg-white/10 border border-emerald-400/35 backdrop-blur-xs">
                <div className="flex items-center gap-2 text-emerald-300 font-black text-xs uppercase mb-1">
                  <CheckCircle2 className="w-4 h-4 shrink-0" />
                  <span>{isEs ? '100% Funcionales' : '100% Functional (40-Pt)'}</span>
                </div>
                <p className="text-[11px] text-slate-200 leading-snug">
                  {isEs
                    ? 'Inspección técnica profesional de 40 puntos: pantalla, sensores, cámaras, audio y conectividad.'
                    : 'Professional 40-point diagnostic inspection: display, sensors, cameras, audio, and connectivity.'}
                </p>
              </div>

              <div className="p-3.5 rounded-2xl bg-white/10 border border-emerald-400/35 backdrop-blur-xs">
                <div className="flex items-center gap-2 text-emerald-300 font-black text-xs uppercase mb-1">
                  <BatteryCharging className="w-4 h-4 shrink-0" />
                  <span>{isEs ? 'Batería >80% Certificada' : 'Battery >80% Certified'}</span>
                </div>
                <p className="text-[11px] text-slate-200 leading-snug">
                  {isEs
                    ? 'Todos los móviles, tablets y portátiles garantizan una salud de batería superior al 80% respecto a una nueva.'
                    : 'All phones, tablets, and laptops guarantee real battery capacity above 80% compared to brand new.'}
                </p>
              </div>

              <div className="p-3.5 rounded-2xl bg-white/10 border border-emerald-400/35 backdrop-blur-xs">
                <div className="flex items-center gap-2 text-emerald-300 font-black text-xs uppercase mb-1">
                  <RefreshCw className="w-4 h-4 shrink-0" />
                  <span>{isEs ? '30 Días Prueba Gratis' : '30-Day Free Home Trial'}</span>
                </div>
                <p className="text-[11px] text-slate-200 leading-snug">
                  {isEs
                    ? 'Pruébalo en casa con envío rápido Prime. Si no te convence su estado, lo devuelves gratis sin preguntas.'
                    : 'Try it at home with fast Prime delivery. Not happy with the condition? Return it free, no questions asked.'}
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
                placeholder={
                  isEs
                    ? 'Busca en Reacondicionados... (ej: iPhone 13, iPad, Samsung, portátil, Watch, cafetera)'
                    : 'Search Certified Refurbished... (e.g.: iPhone 13, iPad, Samsung, laptop, Watch, DeLonghi)'
                }
                aria-label={isEs ? 'Buscar productos reacondicionados' : 'Search certified refurbished products'}
                className="w-full py-2.5 px-1 text-sm sm:text-base text-slate-900 placeholder-slate-500 focus:outline-none bg-transparent font-medium"
              />
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => {
                    setSearchQuery('');
                    setIsSearchFocused(true);
                  }}
                  aria-label={isEs ? 'Limpiar búsqueda' : 'Clear search'}
                  className="p-2 text-slate-500 hover:text-slate-900 cursor-pointer"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
              <a
                href={getAmazonSearchUrl(`${searchQuery.trim() || 'amazon renewed'} ${isEs ? 'reacondicionado' : 'renewed'}`, amazonRegion)}
                target="_blank"
                rel="nofollow sponsored noopener noreferrer"
                className="px-3.5 sm:px-6 py-2.5 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white font-black text-xs sm:text-sm shadow-sm transition-all shrink-0 flex items-center gap-1.5"
              >
                <span className="hidden xs:inline">
                  {isEs ? `Buscar en ${amazonSiteName}` : `Search on ${amazonSiteName}`}
                </span>
                <span className="xs:hidden">Amazon</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>

            {/* Quick clickable filter chips right under the search bar (mobile & desktop) */}
            <div className="flex items-center gap-1.5 sm:gap-2 flex-nowrap sm:flex-wrap overflow-x-auto mt-2.5 pb-1 [&>*]:shrink-0 [&>*]:whitespace-nowrap">
              <span className="text-[11px] font-bold text-emerald-200 uppercase tracking-wider">
                {isEs ? 'Filtros rápidos:' : 'Quick filters:'}
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
                      {isEs ? 'Filtrar por categoría reacondicionada:' : 'Filter by refurbished category:'}
                    </span>
                    <button
                      type="button"
                      onClick={() => setIsSearchFocused(false)}
                      className="text-[11px] font-bold text-slate-500 hover:text-slate-900 flex items-center gap-0.5 cursor-pointer"
                    >
                      <span>{isEs ? 'Cerrar' : 'Close'}</span>
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
                        <span>{isEs ? cat.label : CATEGORY_LABEL_EN[cat.id] || cat.label}</span>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Matching clickable product suggestions */}
                {searchQuery.trim().length > 0 ? (
                  liveSearchSuggestions.length > 0 ? (
                    <div className="divide-y divide-slate-100">
                      <div className="px-3 py-1.5 bg-slate-50 text-[10px] font-black uppercase tracking-wider text-slate-500 flex items-center justify-between">
                        <span>
                          {isEs
                            ? `Productos Reacondicionados encontrados (${liveSearchSuggestions.length}+)`
                            : `Certified Refurbished matches (${liveSearchSuggestions.length}+)`}
                        </span>
                        <span className="text-emerald-700">
                          {isEs ? 'Toca para abrir en Amazon' : 'Tap to open on Amazon'}
                        </span>
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
                                  ♻️ {isEs ? '1 Año Garantía' : '1-Year Warranty'}
                                </span>
                                <span className="text-[10px] font-bold text-slate-500 truncate">
                                  {translateConditionText(item.conditionGrade, isEs)}
                                </span>
                              </div>
                              <p className="text-xs sm:text-sm font-bold text-slate-900 group-hover:text-emerald-800 line-clamp-1">
                                {translateConditionText(item.title, isEs)}
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
                              <span className="hidden sm:inline">{isEs ? 'Ver oferta' : 'View deal'}</span>
                              <ExternalLink className="w-3.5 h-3.5" />
                            </span>
                          </a>
                        );
                      })}
                    </div>
                  ) : (
                    <div className="p-4 text-center space-y-2">
                      <p className="text-xs font-bold text-slate-700">
                        {isEs
                          ? `No hay coincidencias exactas en el catálogo local para “${searchQuery}”`
                          : `No exact local catalog match for “${searchQuery}”`}
                      </p>
                      <a
                        href={getAmazonSearchUrl(`${searchQuery.trim()} ${isEs ? 'reacondicionado' : ''} amazon renewed`, amazonRegion)}
                        target="_blank"
                        rel="nofollow sponsored noopener noreferrer"
                        onClick={() => setIsSearchFocused(false)}
                        className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white font-black text-xs shadow-sm"
                      >
                        <span>
                          {isEs
                            ? `Buscar “${searchQuery}” en Amazon Renewed (${amazonSiteName})`
                            : `Search “${searchQuery}” on Amazon Renewed (${amazonSiteName})`}
                        </span>
                        <ExternalLink className="w-3.5 h-3.5" />
                      </a>
                    </div>
                  )
                ) : (
                  <div className="divide-y divide-slate-100">
                    <div className="px-3 py-1.5 bg-slate-50 text-[10px] font-black uppercase tracking-wider text-slate-500">
                      {isEs
                        ? 'Reacondicionados más buscados hoy (1 Año de Garantía Oficial)'
                        : 'Most searched Certified Refurbished deals today (1-Year Official Warranty)'}
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
                              {translateConditionText(item.title, isEs)}
                            </p>
                            <div className="flex items-center gap-2 mt-0.5">
                              <span className="text-xs font-black text-emerald-800">{formatPrice(item.priceText)}</span>
                              <span className="text-[10px] font-semibold text-emerald-700">
                                {translateConditionText(item.conditionGrade, isEs)}
                              </span>
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
                  href={getAmazonSearchUrl(`${searchQuery.trim() || 'amazon renewed'} ${isEs ? 'reacondicionado' : 'renewed'}`, amazonRegion)}
                  target="_blank"
                  rel="nofollow sponsored noopener noreferrer"
                  onClick={() => setIsSearchFocused(false)}
                  className="block p-3 bg-slate-900 hover:bg-slate-800 text-center text-xs font-black text-emerald-300 transition-colors"
                >
                  🔍{' '}
                  {isEs
                    ? `Ver todos los resultados de “${searchQuery.trim() || 'Amazon Renewed'}” en ${amazonSiteName} →`
                    : `See all “${searchQuery.trim() || 'Amazon Renewed'}” results on ${amazonSiteName} →`}
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
          aria-label={isEs ? 'Filtros de productos reacondicionados' : 'Refurbished product filters'}
          className="bg-white rounded-3xl border border-slate-200/90 shadow-sm p-3 sm:p-6 mb-4 sm:mb-7 space-y-3 sm:space-y-5"
        >
          <div className="flex flex-col xl:flex-row xl:items-center justify-between gap-4 pb-4 border-b border-slate-100">
            <div className="flex flex-wrap items-center gap-2.5">
              <div className="flex items-center gap-2 bg-slate-50 border border-emerald-200 rounded-xl px-3 py-2">
                <ArrowDownWideNarrow className="w-4 h-4 text-emerald-700 shrink-0" />
                <span className="text-xs font-black text-slate-700">{isEs ? 'Ordenar:' : 'Sort by:'}</span>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value as 'featured' | 'price-asc' | 'price-desc' | 'rating')}
                  aria-label={isEs ? 'Ordenar productos reacondicionados' : 'Sort refurbished products'}
                  className="text-xs sm:text-sm font-bold text-slate-900 bg-transparent focus:outline-none cursor-pointer"
                >
                  <option value="featured">{isEs ? 'Destacados Amazon Renewed' : 'Featured Amazon Renewed'}</option>
                  <option value="price-asc">{isEs ? 'Precio: menor a mayor' : 'Price: low to high'}</option>
                  <option value="price-desc">{isEs ? 'Precio: mayor a menor' : 'Price: high to low'}</option>
                  <option value="rating">{isEs ? 'Mejor valorados (★)' : 'Top rated (★)'}</option>
                </select>
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-2">
              <span className="text-xs font-black text-slate-700 flex items-center gap-1">
                <Tag className="w-3.5 h-3.5 text-emerald-700" />
                <span>{isEs ? 'Rango de precio:' : 'Price range:'}</span>
              </span>
              <input
                type="number"
                min={0}
                value={minPrice}
                onChange={(e) => {
                  setMinPrice(e.target.value);
                  setActivePricePreset('custom');
                }}
                placeholder={isEs ? 'Mín €' : 'Min $'}
                aria-label={isEs ? 'Precio mínimo' : 'Minimum price'}
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
                placeholder={isEs ? 'Máx €' : 'Max $'}
                aria-label={isEs ? 'Precio máximo' : 'Maximum price'}
                className="w-24 px-3 py-1.5 rounded-xl border border-emerald-200 bg-slate-50 text-xs sm:text-sm font-bold text-slate-900 focus:outline-none focus:border-emerald-500"
              />
              {(searchQuery || selectedCategory !== 'all' || minPrice || maxPrice) && (
                <button
                  type="button"
                  onClick={handleResetFilters}
                  className="inline-flex items-center gap-1 px-3 py-1.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-bold cursor-pointer"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span>{isEs ? 'Reiniciar' : 'Reset'}</span>
                </button>
              )}
            </div>
          </div>

          {/* Categories */}
          <div>
            <p className="text-[11px] font-black uppercase tracking-wider text-slate-600 mb-2">
              {isEs ? 'Categorías de Reacondicionados Certificados:' : 'Certified Refurbished Categories:'}
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
                    <span>{isEs ? cat.label : CATEGORY_LABEL_EN[cat.id] || cat.label}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Quick Price Presets */}
          <div>
            <p className="text-[11px] font-black uppercase tracking-wider text-slate-600 mb-2">
              {isEs ? 'Presupuesto:' : 'Budget:'}
            </p>
            <div className="flex items-center gap-2 flex-nowrap sm:flex-wrap overflow-x-auto [&>*]:shrink-0 [&>*]:whitespace-nowrap">
              {activePricePresets.map((preset) => {
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
        <section aria-label={isEs ? 'Catálogo de productos reacondicionados' : 'Certified refurbished catalog'} className="mb-12">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4">
            <div>
              <h2 className="text-xl sm:text-2xl font-black text-slate-950 flex items-center gap-2">
                <span>♻️</span>
                <span>
                  {selectedCatLabel} ({filteredProducts.length} {isEs ? 'verificados' : 'verified'})
                </span>
              </h2>
              <p className="text-xs sm:text-sm text-slate-600 mt-0.5">
                {isEs ? (
                  <>
                    Pulsa en <strong>&ldquo;Leer más: Estado y Garantía&rdquo;</strong> en cualquier producto para ver su grado estético, salud de batería y el año completo de garantía de Amazon.
                  </>
                ) : (
                  <>
                    Tap <strong>&ldquo;Read More: Condition &amp; Warranty&rdquo;</strong> on any product to inspect its cosmetic grade, battery health, and full 1-year official Amazon warranty.
                  </>
                )}
              </p>
            </div>

            <a
              href={getAmazonSearchUrl(selectedCatObj.query, amazonRegion)}
              target="_blank"
              rel="nofollow sponsored noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white font-bold text-xs shadow-xs transition-all shrink-0 self-start sm:self-auto"
            >
              <span>{isEs ? 'Ver todos en Amazon Renewed' : 'Browse all on Amazon Renewed'}</span>
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
                    {isEs
                      ? `Mostrar más reacondicionados (+24 · ${Math.min(visibleCount, filteredProducts.length)}/${filteredProducts.length})`
                      : `Load more refurbished deals (+24 · ${Math.min(visibleCount, filteredProducts.length)}/${filteredProducts.length})`}
                  </button>
                </div>
              )}
            </>
          ) : (
            <div className="bg-white rounded-3xl border border-dashed border-slate-300 p-10 text-center space-y-3">
              <p className="text-base font-bold text-slate-900">
                {isEs
                  ? 'No hay productos en el listado actual con ese filtro exacto'
                  : 'No products in the current list match that exact filter'}
              </p>
              <div className="flex items-center justify-center gap-2 pt-2">
                <button
                  type="button"
                  onClick={handleResetFilters}
                  className="px-4 py-2 rounded-xl bg-emerald-700 text-white text-xs font-bold cursor-pointer"
                >
                  {isEs ? 'Ver todos los Reacondicionados' : 'Show all Certified Refurbished'}
                </button>
                <a
                  href={getAmazonSearchUrl(`${searchQuery || selectedCatObj.query} ${isEs ? 'reacondicionado' : 'renewed'}`, amazonRegion)}
                  target="_blank"
                  rel="nofollow sponsored noopener noreferrer"
                  className="px-4 py-2 rounded-xl bg-amber-400 text-slate-950 text-xs font-black inline-flex items-center gap-1"
                >
                  <span>{isEs ? `Buscar en ${amazonSiteName}` : `Search on ${amazonSiteName}`}</span>
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
              {isEs
                ? 'Guía Oficial: ¿Qué estado tienen los Reacondicionados de Amazon y qué cubre su Garantía?'
                : 'Official Guide: What Condition Are Amazon Renewed Devices In & What Does the Warranty Cover?'}
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              {isEs ? (
                <>
                  Comprar o regalar un dispositivo de <strong>Amazon Renewed</strong> es la forma más inteligente de conseguir un iPhone, iPad, MacBook, Samsung Galaxy o cafetera de gama alta ahorrando entre un 30% y un 50%, con total tranquilidad postventa.
                </>
              ) : (
                <>
                  Buying or gifting a certified device from <strong>Amazon Renewed</strong> is the smartest way to get a flagship iPhone, iPad, MacBook, Samsung Galaxy, or espresso machine at 30% to 50% off retail—with complete post-purchase peace of mind.
                </>
              )}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            <div className="p-4 rounded-2xl bg-emerald-50/60 border border-emerald-200 space-y-1.5">
              <h3 className="text-sm font-black text-emerald-950 flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                <span>{isEs ? 'Estado Excelente (Como Nuevo)' : 'Excellent Condition (Like New · Grade A+)'}</span>
              </h3>
              <p className="text-xs text-slate-700 leading-relaxed">
                {isEs
                  ? 'Pantalla 100% libre de arañazos y cuerpo sin marcas estéticas visibles a 30 centímetros de distancia. Batería comprobada con capacidad superior al 80%-85% de una nueva.'
                  : '100% scratch-free screen and body with zero visible cosmetic marks from 12 inches (30 cm) away. Verified battery capacity guaranteed above 80%–85% of a brand-new battery.'}
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-emerald-50/60 border border-emerald-200 space-y-1.5">
              <h3 className="text-sm font-black text-emerald-950 flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-emerald-600" />
                <span>{isEs ? '1 Año de Garantía Oficial Amazon' : '1-Year Official Amazon Guarantee'}</span>
              </h3>
              <p className="text-xs text-slate-700 leading-relaxed">
                {isEs ? (
                  <>
                    Después de tu compra tienes <strong>1 año entero (365 días) de cobertura directa con Amazon Renewed</strong>: si surge cualquier fallo técnico, Amazon gestiona el reemplazo o el reembolso íntegro de tu dinero.
                  </>
                ) : (
                  <>
                    After your purchase you get a <strong>full 1-Year (365-Day) direct Amazon Renewed Guarantee</strong>: if any technical issue arises, Amazon provides a free replacement or a 100% full refund.
                  </>
                )}
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-emerald-50/60 border border-emerald-200 space-y-1.5">
              <h3 className="text-sm font-black text-emerald-950 flex items-center gap-1.5">
                <Award className="w-4 h-4 text-emerald-600" />
                <span>{isEs ? '100% Funcionales e Higienizados' : '100% Functional & Professionally Sanitized'}</span>
              </h3>
              <p className="text-xs text-slate-700 leading-relaxed">
                {isEs
                  ? 'Cada producto supera un diagnóstico completo de hardware, limpieza profesional, borrado seguro de datos de fábrica e incluye los accesorios de carga compatibles listos para usar o regalar.'
                  : 'Every product passes a full 40-point hardware diagnostic, professional cleaning, factory data wipe, and includes compatible charging accessories ready to use or gift.'}
              </p>
            </div>
          </div>

          <div className="pt-4 border-t border-slate-100">
            <h2 className="text-lg sm:text-xl font-black text-slate-950 mb-2">
              {isEs
                ? 'Comparativa: Reacondicionado Certificado (Amazon Renewed) vs. Segunda Mano Particular'
                : 'Comparison: Certified Amazon Renewed vs. Private Used / Second-Hand'}
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 mb-4 leading-relaxed">
              {isEs ? (
                <>
                  Si estás buscando un móvil, iPhone, iPad, portátil o reloj de <strong>segunda mano</strong> para ahorrar dinero, mira por qué un <strong>Reacondicionado Certificado de Amazon</strong> elimina todos los riesgos de comprar usado a un particular:
                </>
              ) : (
                <>
                  If you are searching for a <strong>used or second-hand</strong> iPhone, iPad, laptop, or smartwatch to save money, see why a <strong>Certified Amazon Renewed</strong> device eliminates every risk of buying from a random private seller:
                </>
              )}
            </p>
            <div className="overflow-x-auto rounded-2xl border-2 border-emerald-400/80 shadow-md">
              <table className="w-full text-left border-collapse text-xs sm:text-sm">
                <thead>
                  <tr>
                    <th className="p-3.5 font-black bg-slate-900 text-slate-100 w-1/4">
                      {isEs ? 'Criterio de Seguridad' : 'Safety & Quality Check'}
                    </th>
                    <th className="p-3.5 font-black bg-gradient-to-r from-emerald-500 via-emerald-600 to-teal-500 text-white border-x-2 border-emerald-400 shadow-inner w-[38%]">
                      <div className="flex flex-wrap items-center gap-2">
                        <span className="text-base">♻️</span>
                        <span>{isEs ? 'Reacondicionado Certificado Amazon' : 'Certified Amazon Renewed'}</span>
                        <span className="px-2 py-0.5 rounded-full text-[10px] font-black uppercase bg-white text-emerald-800 shadow-2xs">
                          {isEs ? '★ 100% Seguro' : '★ 100% Safe'}
                        </span>
                      </div>
                    </th>
                    <th className="p-3.5 font-bold bg-rose-950 text-rose-100 w-[37%]">
                      <div className="flex flex-wrap items-center gap-2">
                        <span className="text-base">⚠️</span>
                        <span>
                          {isEs
                            ? 'Fuera de Amazon sin Garantía / Particular'
                            : 'Outside Amazon without Warranty / Private Used'}
                        </span>
                        <span className="px-2 py-0.5 rounded-full text-[10px] font-extrabold uppercase bg-rose-800/90 text-rose-100 border border-rose-600">
                          {isEs ? 'Alto Riesgo' : 'High Risk'}
                        </span>
                      </div>
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-200/90 bg-white">
                  <tr>
                    <td className="p-3.5 font-bold text-slate-900 bg-slate-50/70">
                      {isEs ? 'Garantía Oficial postventa' : 'Official Post-Purchase Warranty'}
                    </td>
                    <td className="p-3.5 font-black text-emerald-950 bg-gradient-to-r from-emerald-50 via-emerald-100/80 to-teal-50 border-x-2 border-emerald-400">
                      ✅ {isEs ? '1 Año (365 días) de Garantía Oficial Amazon' : '1 Full Year (365 Days) Official Amazon Guarantee'}
                    </td>
                    <td className="p-3.5 font-medium text-rose-900 bg-rose-50/70">
                      ❌ {isEs ? 'Sin respaldo de Amazon (si falla al mes, pierdes tu dinero)' : 'No Amazon backing (if it fails, your money is gone)'}
                    </td>
                  </tr>
                  <tr>
                    <td className="p-3.5 font-bold text-slate-900 bg-slate-50/70">
                      {isEs ? 'Salud de la Batería' : 'Real Battery Health'}
                    </td>
                    <td className="p-3.5 font-black text-emerald-950 bg-gradient-to-r from-emerald-50 via-emerald-100/80 to-teal-50 border-x-2 border-emerald-400">
                      ✅ {isEs ? 'Certificada >80% – 100% de capacidad real' : 'Certified >80% – 100% real battery capacity'}
                    </td>
                    <td className="p-3.5 font-medium text-rose-900 bg-rose-50/70">
                      ❌ {isEs ? 'Batería degradada o manipulada sin certificar' : 'Degraded or unverified battery health'}
                    </td>
                  </tr>
                  <tr>
                    <td className="p-3.5 font-bold text-slate-900 bg-slate-50/70">
                      {isEs ? 'Inspección y Estado Estético' : 'Hardware & Cosmetic Inspection'}
                    </td>
                    <td className="p-3.5 font-black text-emerald-950 bg-gradient-to-r from-emerald-50 via-emerald-100/80 to-teal-50 border-x-2 border-emerald-400">
                      ✅ {isEs ? 'Test de 40 puntos + 0 arañazos a 30 cm (Grado A+)' : '40-point lab test + 0 scratches at 12 inches (Grade A+)'}
                    </td>
                    <td className="p-3.5 font-medium text-rose-900 bg-rose-50/70">
                      ❌ {isEs ? 'Piezas no originales o fallos ocultos sin auditar' : 'Unverified parts or hidden defects without lab audit'}
                    </td>
                  </tr>
                  <tr>
                    <td className="p-3.5 font-bold text-slate-900 bg-slate-50/70">
                      {isEs ? 'Devolución y Reembolso' : 'Returns & Full Refund'}
                    </td>
                    <td className="p-3.5 font-black text-emerald-950 bg-gradient-to-r from-emerald-50 via-emerald-100/80 to-teal-50 border-x-2 border-emerald-400 border-b-2">
                      ✅ {isEs ? '30 días de prueba gratis + Reemplazo o 100% reembolso' : '30-day free trial + Free replacement or 100% refund'}
                    </td>
                    <td className="p-3.5 font-medium text-rose-900 bg-rose-50/70">
                      ❌ {isEs ? 'Trabas para devolver o sin devolución tras el pago' : 'Hard to return or zero refund once paid'}
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          <div className="pt-4 border-t border-slate-100">
            <h2 className="text-lg sm:text-xl font-black text-slate-900 mb-4">
              {isEs
                ? 'Preguntas frecuentes sobre los Reacondicionados de Amazon y Segunda Mano con Garantía'
                : 'Frequently Asked Questions about Certified Amazon Renewed vs. Second-Hand'}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {activeFaqs.map((faq, idx) => (
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
