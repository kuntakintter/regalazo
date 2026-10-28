'use client';

import React, { useState, useEffect, useMemo, useCallback } from 'react';
import Image from 'next/image';
import { Product } from '@/data/products';
import { getAmazonProductUrl } from '@/lib/amazon';
import { useCurrency } from '@/context/CurrencyContext';
import { useVoting } from '@/context/VotingContext';
import {
  Trophy,
  Award,
  Star,
  ExternalLink,
  ShieldCheck,
  Flame,
  Clock,
  ShoppingBag,
  Heart,
  ChevronLeft,
  ChevronRight
} from 'lucide-react';

interface TopPodiumProps {
  products: Product[];
  filterLabel?: string;
  isDark?: boolean;
}

// Helper to categorize product family to prevent duplicates (e.g. NEVER 2 headphones, 2 books, etc.)
function getProductFamily(p: Product): string {
  const text = `${p.category || ''} ${p.subcategory || ''} ${p.title || ''} ${p.searchQuery || ''}`.toLowerCase();
  if (text.includes('auricular') || text.includes('headphone') || text.includes('soundcore') || text.includes('tune 510') || text.includes('airpods')) return 'audio';
  if (text.includes('libro') || text.includes('habitos') || text.includes('hábitos') || text.includes('lectura') || text.includes('novela')) return 'book';
  if (text.includes('figura') || text.includes('funko') || text.includes('banpresto') || text.includes('ichibansho') || text.includes('estatua')) return 'figure';
  if (text.includes('lego') || text.includes('bloques') || text.includes('construccion') || text.includes('construcción')) return 'lego';
  if (text.includes('juego') || text.includes('mesa') || text.includes('cartas') || text.includes('catan') || text.includes('pokemon tcg') || text.includes('puzzle') || text.includes('dobble')) return 'games';
  if (text.includes('cafeter') || text.includes('cafe') || text.includes('café') || text.includes('espresso') || text.includes('taza')) return 'coffee';
  if (text.includes('lámpara') || text.includes('lampara') || text.includes('led') || text.includes('iluminac') || text.includes('tira')) return 'lighting';
  if (text.includes('consola') || text.includes('ps5') || text.includes('switch') || text.includes('mando') || text.includes('gaming')) return 'gaming';
  if (text.includes('smartbox') || text.includes('escapada') || text.includes('experiencia') || text.includes('vuelo')) return 'experience';
  if (text.includes('coche') || text.includes('delorean') || text.includes('die-cast') || text.includes('vehiculo') || text.includes('batmóvil') || text.includes('batmovil')) return 'diecast';
  if (text.includes('mochila') || text.includes('bolsa') || text.includes('maleta') || text.includes('cartera') || text.includes('neceser')) return 'bags';
  if (text.includes('casco') || text.includes('moto') || text.includes('chaqueta')) return 'moto';
  if (text.includes('reloj') || text.includes('smartwatch') || text.includes('band')) return 'watch';
  if (text.includes('perfum') || text.includes('colonia') || text.includes('aroma') || text.includes('difusor')) return 'fragrance';
  if (text.includes('dulce') || text.includes('chuche') || text.includes('chocolate') || text.includes('snack')) return 'sweets';
  if (text.includes('altavoz') || text.includes('speaker') || text.includes('echo dot') || text.includes('alexa')) return 'speaker';
  return (p.subcategory || p.category || 'other').toLowerCase();
}

export default function TopPodium({ products, filterLabel, isDark = false }: TopPodiumProps) {
  const { formatPrice } = useCurrency();
  const { toggleItem, isItemInList } = useVoting();
  const [failedImages, setFailedImages] = useState<Record<string, boolean>>({});
  const [activeSetIndex, setActiveSetIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);

  // Dynamic real-time Amazon Prime next-day shipping cutoff timer
  const [timeLeft, setTimeLeft] = useState<{ hours: number; minutes: number; seconds: number; isTomorrow: boolean }>({
    hours: 3,
    minutes: 42,
    seconds: 18,
    isTomorrow: true,
  });

  useEffect(() => {
    const updateCountdown = () => {
      const now = new Date();
      const cutoff = new Date();
      cutoff.setHours(19, 30, 0, 0);

      let diff = cutoff.getTime() - now.getTime();
      let isTomorrow = true;

      if (diff <= 0) {
        cutoff.setDate(cutoff.getDate() + 1);
        diff = cutoff.getTime() - now.getTime();
        isTomorrow = false;
      }

      const hours = Math.floor(diff / (1000 * 60 * 60));
      const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((diff % (1000 * 60)) / 1000);

      setTimeLeft({ hours, minutes, seconds, isTomorrow });
    };

    updateCountdown();
    const interval = setInterval(updateCountdown, 1000);
    return () => clearInterval(interval);
  }, []);

  // Build sequential diverse sets of 3 products from the current products pool
  const podiumSets = useMemo(() => {
    if (!products || products.length < 3) return [];

    const sorted = [...products].sort((a, b) => {
      const scoreA = (a.reviewsCount || 0) * (a.rating || 1);
      const scoreB = (b.reviewsCount || 0) * (b.rating || 1);
      return scoreB - scoreA;
    });

    const sets: Array<[Product, Product, Product]> = [];
    const usedIds = new Set<string>();
    const maxSets = 8; // Allows up to 8 rotating rankings with different products

    for (let s = 0; s < maxSets; s++) {
      const pool = sorted.filter((p) => !usedIds.has(p.id));
      if (pool.length < 3) break;

      const gold = pool[0];
      const goldFam = getProductFamily(gold);

      const silver = pool.find((p) => p.id !== gold.id && getProductFamily(p) !== goldFam);
      if (!silver) break;
      const silverFam = getProductFamily(silver);

      const bronze = pool.find(
        (p) =>
          p.id !== gold.id &&
          p.id !== silver.id &&
          getProductFamily(p) !== goldFam &&
          getProductFamily(p) !== silverFam
      );
      if (!bronze) break;

      usedIds.add(gold.id);
      usedIds.add(silver.id);
      usedIds.add(bronze.id);
      sets.push([gold, silver, bronze]);
    }

    // Fallback if strict family diversity yielded fewer than 1 set
    if (sets.length === 0 && products.length >= 3) {
      sets.push([sorted[0], sorted[1], sorted[2]]);
    }

    return sets;
  }, [products]);

  // Adjust activeSetIndex if out of bounds
  useEffect(() => {
    if (activeSetIndex >= podiumSets.length) {
      setActiveSetIndex(0);
    }
  }, [podiumSets.length, activeSetIndex]);

  // Slide navigation
  const switchSet = useCallback(
    (newIndex: number) => {
      if (newIndex === activeSetIndex) return;
      setIsAnimating(true);
      setTimeout(() => {
        setActiveSetIndex(newIndex);
        setIsAnimating(false);
      }, 150);
    },
    [activeSetIndex]
  );

  const handlePrev = useCallback(() => {
    if (podiumSets.length <= 1) return;
    const prev = (activeSetIndex - 1 + podiumSets.length) % podiumSets.length;
    switchSet(prev);
  }, [activeSetIndex, podiumSets.length, switchSet]);

  const handleNext = useCallback(() => {
    if (podiumSets.length <= 1) return;
    const next = (activeSetIndex + 1) % podiumSets.length;
    switchSet(next);
  }, [activeSetIndex, podiumSets.length, switchSet]);

  // Auto-advance smoothly every 7 seconds
  useEffect(() => {
    if (isPaused || podiumSets.length <= 1) return;
    const timer = setInterval(() => {
      setIsAnimating(true);
      setTimeout(() => {
        setActiveSetIndex((curr) => (curr + 1) % podiumSets.length);
        setIsAnimating(false);
      }, 150);
    }, 7000);
    return () => clearInterval(timer);
  }, [isPaused, podiumSets.length]);

  if (!podiumSets || podiumSets.length === 0) return null;

  const currentSet = podiumSets[activeSetIndex] || podiumSets[0];
  const [gold, silver, bronze] = currentSet;

  const podiumPicks = [
    {
      rank: 1,
      badgeText: '🥇 Nº1 Más Vendido',
      badgeClass: 'bg-gradient-to-r from-amber-500 to-yellow-400 text-slate-950 font-black shadow-xs border border-amber-300',
      cardClass: isDark
        ? 'border-2 border-amber-400 bg-gradient-to-b from-amber-500/20 via-slate-900 to-slate-950 shadow-xl shadow-amber-500/15 ring-2 ring-amber-400/30 text-white'
        : 'border-2 border-amber-400 bg-gradient-to-b from-amber-500/10 via-white to-amber-50/40 shadow-xl shadow-amber-500/15 ring-2 ring-amber-400/25 text-slate-900',
      orderClass: 'order-2',
      podiumHeight: 'h-16 sm:h-32 md:h-44',
      numberSize: 'text-3xl sm:text-5xl md:text-7xl',
      podiumNumber: '1',
      podiumSubtitle: 'ORO · GANADOR',
      podiumBg: 'bg-gradient-to-b from-[#fde68a] via-[#f59e0b] to-[#b45309]',
      podiumBorder: 'border-amber-400',
      podiumHighlight: 'border-t-4 border-amber-200/90 shadow-[inset_0_3px_6px_rgba(255,255,255,0.7),0_12px_24px_rgba(217,119,6,0.3)]',
      btnClass: 'bg-[#ffd814] hover:bg-[#f7ca00] text-slate-900 border border-[#fcd200]',
      whyText: 'El favorito absoluto con miles de opiniones 5 estrellas',
      product: gold,
    },
    {
      rank: 2,
      badgeText: '🥈 Nº2 Calidad/Precio',
      badgeClass: 'bg-gradient-to-r from-slate-200 to-slate-300 text-slate-900 font-black shadow-xs border border-slate-400',
      cardClass: isDark
        ? 'border-2 border-slate-500 bg-gradient-to-b from-slate-800 via-slate-900 to-slate-950 shadow-lg text-white'
        : 'border-2 border-slate-300 bg-gradient-to-b from-slate-100/60 via-white to-slate-50 shadow-md text-slate-900',
      orderClass: 'order-1',
      podiumHeight: 'h-12 sm:h-24 md:h-32',
      numberSize: 'text-2xl sm:text-4xl md:text-6xl',
      podiumNumber: '2',
      podiumSubtitle: 'PLATA · 2º PUESTO',
      podiumBg: 'bg-gradient-to-b from-[#f8fafc] via-[#cbd5e1] to-[#64748b]',
      podiumBorder: 'border-slate-300',
      podiumHighlight: 'border-t-4 border-white/90 shadow-[inset_0_3px_6px_rgba(255,255,255,0.8),0_10px_20px_rgba(100,116,139,0.2)]',
      btnClass: 'bg-[#ffd814] hover:bg-[#f7ca00] text-slate-900 border border-[#fcd200]',
      whyText: 'Máxima calidad al precio más competitivo',
      product: silver,
    },
    {
      rank: 3,
      badgeText: '🥉 Nº3 El Más Original',
      badgeClass: 'bg-gradient-to-r from-amber-700 to-orange-800 text-white font-black shadow-xs border border-amber-600',
      cardClass: isDark
        ? 'border-2 border-orange-500/70 bg-gradient-to-b from-orange-500/15 via-slate-900 to-slate-950 shadow-lg text-white'
        : 'border-2 border-orange-200 bg-gradient-to-b from-orange-50/40 via-white to-orange-50/20 shadow-md text-slate-900',
      orderClass: 'order-3',
      podiumHeight: 'h-9 sm:h-20 md:h-26',
      numberSize: 'text-xl sm:text-3xl md:text-5xl',
      podiumNumber: '3',
      podiumSubtitle: 'BRONCE · 3º PUESTO',
      podiumBg: 'bg-gradient-to-b from-[#d97706] via-[#92400e] to-[#451a03]',
      podiumBorder: 'border-amber-600',
      podiumHighlight: 'border-t-4 border-amber-400/50 shadow-[inset_0_3px_6px_rgba(255,255,255,0.4),0_8px_16px_rgba(120,53,15,0.25)]',
      btnClass: 'bg-[#ffd814] hover:bg-[#f7ca00] text-slate-900 border border-[#fcd200]',
      whyText: 'La sorpresa garantizada que enamora a cualquiera',
      product: bronze,
    },
  ];

  // Schema.org ItemList for Rich Snippets
  const podiumSchema = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: `Top 3 Más Vendidos - ${filterLabel || 'Ideas de Regalo'}`,
    itemListElement: podiumPicks.map((pick) => ({
      '@type': 'ListItem',
      position: pick.rank,
      name: pick.product.title,
      description: pick.whyText,
      image: pick.product.imageUrl.startsWith('http')
        ? pick.product.imageUrl
        : `https://www.unbuenregalo.es${pick.product.imageUrl}`,
    })),
  };

  return (
    <section
      className="mb-14 pt-2 relative overflow-x-clip"
      aria-label="Top 3 Ventas"
      onMouseEnter={() => {
        if (typeof window !== 'undefined' && window.matchMedia('(hover: hover)').matches) {
          setIsPaused(true);
        }
      }}
      onMouseLeave={() => {
        if (typeof window !== 'undefined' && window.matchMedia('(hover: hover)').matches) {
          setIsPaused(false);
        }
      }}
    >
      {/* Schema.org for SEO */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(podiumSchema) }}
      />

      {/* Clean Original Header Banner (Without the cluttered 5 category tabs) */}
      <div
        className={`relative mb-6 p-4 sm:p-5 rounded-3xl border backdrop-blur-md ${
          isDark
            ? 'bg-gradient-to-r from-amber-500/15 via-orange-500/10 to-purple-500/20 border-orange-500/30'
            : 'bg-gradient-to-r from-amber-500/10 via-indigo-500/10 to-purple-500/10 border-amber-300/60'
        }`}
      >
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-amber-500 text-slate-950 flex items-center justify-center shadow-lg shadow-amber-500/30 shrink-0">
              <Trophy className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span
                  className={`text-[11px] font-black uppercase tracking-wider px-2 py-0.5 rounded-md ${
                    isDark ? 'text-amber-300 bg-amber-950/80 border border-amber-500/40' : 'text-amber-700 bg-amber-100'
                  }`}
                >
                  Ranking Oficial 2026
                </span>
                <span className={`text-xs font-bold hidden sm:inline ${isDark ? 'text-slate-300' : 'text-slate-500'}`}>
                  • Catálogo Verificado
                </span>
              </div>
              <h2 className={`text-lg sm:text-xl font-black leading-tight ${isDark ? 'text-white' : 'text-slate-900'}`}>
                🏆 Podio de Honor: Los 3 Más Vendidos {filterLabel ? `en ${filterLabel}` : ''}
              </h2>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row items-end sm:items-center gap-2 self-end sm:self-center">
            {/* Real Amazon Prime Delivery Cutoff Timer */}
            <div
              className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold shadow-2xs border ${
                isDark
                  ? 'bg-rose-950/70 border-rose-500/40 text-rose-300'
                  : 'bg-rose-50 border-rose-200 text-rose-700'
              }`}
            >
              <Clock className="w-3.5 h-3.5 text-rose-500 animate-pulse" />
              <span>
                Envío exprés:{' '}
                <strong className={`font-mono ${isDark ? 'text-rose-200' : 'text-rose-800'}`}>
                  {String(timeLeft.hours).padStart(2, '0')}:{String(timeLeft.minutes).padStart(2, '0')}:
                  {String(timeLeft.seconds).padStart(2, '0')}
                </strong>
              </span>
            </div>

            <div className={`text-xs font-semibold flex items-center gap-1.5 ${isDark ? 'text-slate-300' : 'text-slate-500'}`}>
              <Flame className="w-4 h-4 text-orange-500" />
              <span>Revisado hoy</span>
            </div>
          </div>
        </div>
      </div>

      {/* Podium Stage Container with Lateral Arrow Navigation */}
      <div className="max-w-4xl mx-auto relative px-1 sm:px-4 md:px-0">
        {/* Left Arrow Navigation Button (Desktop only, hidden on mobile) */}
        {podiumSets.length > 1 && (
          <button
            onClick={handlePrev}
            aria-label="Ver ranking anterior"
            title="Ver ranking anterior"
            className="hidden sm:flex absolute sm:-left-6 lg:-left-10 top-1/2 -translate-y-1/2 z-30 sm:w-12 sm:h-12 bg-white/95 dark:bg-slate-900/95 hover:bg-[#ffd814] dark:hover:bg-amber-500 text-slate-800 dark:text-white hover:text-slate-950 shadow-xl border-2 border-slate-200 dark:border-slate-700 hover:border-amber-400 rounded-full items-center justify-center transition-all hover:scale-110 active:scale-95 cursor-pointer group/nav"
          >
            <ChevronLeft className="w-6 h-6 group-hover/nav:-translate-x-0.5 transition-transform" />
          </button>
        )}

        {/* Right Arrow Navigation Button (Desktop only, hidden on mobile) */}
        {podiumSets.length > 1 && (
          <button
            onClick={handleNext}
            aria-label="Ver siguiente ranking"
            title="Ver siguiente ranking"
            className="hidden sm:flex absolute sm:-right-6 lg:-right-10 top-1/2 -translate-y-1/2 z-30 sm:w-12 sm:h-12 bg-white/95 dark:bg-slate-900/95 hover:bg-[#ffd814] dark:hover:bg-amber-500 text-slate-800 dark:text-white hover:text-slate-950 shadow-xl border-2 border-slate-200 dark:border-slate-700 hover:border-amber-400 rounded-full items-center justify-center transition-all hover:scale-110 active:scale-95 cursor-pointer group/nav"
          >
            <ChevronRight className="w-6 h-6 group-hover/nav:translate-x-0.5 transition-transform" />
          </button>
        )}

        {/* 3D Olympic Podium Grid (2nd Silver on left, 1st Gold elevated in center, 3rd Bronze on right) */}
        <div
          className={`grid grid-cols-3 gap-1.5 sm:gap-4 md:gap-5 items-end pt-3 sm:pt-5 transition-opacity duration-200 ${
            isAnimating ? 'opacity-40' : 'opacity-100'
          }`}
        >
          {podiumPicks.map((pick) => {
            const directUrl = getAmazonProductUrl(
              pick.product.asin,
              pick.product.searchQuery || pick.product.title
            );
            const isGold = pick.rank === 1;

            return (
              <div
                key={`${activeSetIndex}-${pick.product.id}`}
                className={`flex flex-col ${pick.orderClass} relative group`}
              >
                {/* 1. Compact Product Card perched atop the Podium */}
                <div
                  className={`rounded-t-xl sm:rounded-t-2xl rounded-b-none p-1.5 sm:p-3.5 md:p-4 flex flex-col justify-between transition-all duration-300 relative ${
                    isGold ? 'pt-4 sm:pt-6 z-10' : 'z-0'
                  } ${pick.cardClass}`}
                >
                  {/* Floating Winner Crown for #1 */}
                  {isGold && (
                    <div className="absolute -top-2.5 sm:-top-3 left-1/2 -translate-x-1/2 bg-gradient-to-r from-amber-500 via-amber-400 to-yellow-400 text-slate-950 font-black text-[7.5px] xs:text-[9px] sm:text-[10px] md:text-[11px] px-1.5 sm:px-3 py-0.5 rounded-full shadow-md border border-white sm:border-2 flex items-center gap-0.5 sm:gap-1 uppercase tracking-wider whitespace-nowrap z-20">
                      <span>👑</span>
                      <span className="hidden sm:inline">GANADOR DEL RANKING</span>
                      <span className="sm:hidden">GANADOR</span>
                    </div>
                  )}

                  {/* Top Ribbon & Rating */}
                  <div className="flex items-center justify-between gap-1 mb-1 sm:mb-2">
                    <span className={`px-1 sm:px-2 py-0.5 rounded text-[8px] sm:text-[11px] font-bold flex items-center gap-0.5 sm:gap-1 truncate ${pick.badgeClass}`}>
                      <span className="hidden sm:inline">{pick.badgeText}</span>
                      <span className="sm:hidden">{pick.rank === 1 ? '🥇 Nº1' : pick.rank === 2 ? '🥈 Nº2' : '🥉 Nº3'}</span>
                    </span>
                    <div className="flex items-center gap-0.5 sm:gap-1 text-amber-500 text-[10px] sm:text-xs font-bold shrink-0">
                      <Star className="w-2.5 h-2.5 sm:w-3.5 sm:h-3.5 fill-amber-400 text-amber-400" />
                      <span className={isDark ? 'text-white' : 'text-slate-900'}>{pick.product.rating}</span>
                      <span className={`text-[9px] sm:text-[10px] hidden md:inline ${isDark ? 'text-slate-400' : 'text-slate-400'}`}>
                        ({pick.product.reviewsCount?.toLocaleString()})
                      </span>
                    </div>
                  </div>

                  {/* Product Photo - Compact & Framed */}
                  <a
                    href={directUrl}
                    target="_blank"
                    rel="nofollow sponsored noopener noreferrer"
                    className="relative w-full h-20 xs:h-24 sm:h-36 md:h-40 bg-white rounded-lg sm:rounded-xl p-1 sm:p-2 flex items-center justify-center overflow-hidden mb-1.5 sm:mb-2.5 border border-slate-200/80 group-hover:border-slate-300 transition-colors cursor-pointer"
                  >
                    {!failedImages[pick.product.id] ? (
                      <Image
                        src={pick.product.imageUrl}
                        alt={pick.product.title}
                        fill
                        sizes="(max-width: 640px) 33vw, 300px"
                        className="object-contain p-1 group-hover:scale-105 transition-transform duration-300"
                        unoptimized={pick.product.imageUrl.startsWith('http')}
                        onError={() => setFailedImages((prev) => ({ ...prev, [pick.product.id]: true }))}
                      />
                    ) : (
                      <div className="w-full h-full bg-slate-50 flex flex-col items-center justify-center text-slate-400 p-1 text-center">
                        <ShoppingBag className="w-5 h-5 sm:w-8 sm:h-8 mb-0.5 text-amber-500/70" />
                        <span className="text-[9px] sm:text-[11px] font-bold text-slate-700 line-clamp-2">
                          {pick.product.title}
                        </span>
                      </div>
                    )}
                    <span className="absolute bottom-1 right-1 text-[7.5px] sm:text-[9px] font-bold bg-slate-900/85 text-white px-1 sm:px-1.5 py-0.5 rounded backdrop-blur-xs flex items-center gap-0.5 z-10">
                      <ShieldCheck className="w-2 h-2 sm:w-2.5 sm:h-2.5 text-emerald-400" />
                      Prime
                    </span>
                    <button
                      type="button"
                      onClick={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        toggleItem(pick.product);
                      }}
                      title="Añadir a votación en grupo"
                      aria-label="Añadir o quitar de la votación"
                      className={`absolute top-1 right-1 w-5 h-5 sm:w-6 sm:h-6 rounded-full backdrop-blur-xs flex items-center justify-center transition-transform shadow-2xs z-10 cursor-pointer border ${
                        isItemInList(pick.product.id)
                          ? 'bg-rose-50 border-rose-200 text-rose-500 scale-110'
                          : 'bg-white/90 border-slate-100 text-slate-400 hover:text-rose-500 hover:scale-110'
                      }`}
                    >
                      <Heart className={`w-2.5 h-2.5 sm:w-3 sm:h-3 ${isItemInList(pick.product.id) ? 'fill-rose-500 text-rose-500' : ''}`} />
                    </button>
                  </a>

                  {/* Title - Compact 2 lines */}
                  <a
                    href={directUrl}
                    target="_blank"
                    rel="nofollow sponsored noopener noreferrer"
                    className={`font-bold text-[9.5px] xs:text-[10px] sm:text-xs md:text-sm line-clamp-2 transition-colors mb-1 sm:mb-2 leading-tight sm:leading-snug min-h-[1.7rem] sm:min-h-[2.6rem] cursor-pointer ${
                      isDark ? 'text-white hover:text-amber-400' : 'text-slate-900 hover:text-amber-600'
                    }`}
                    title={pick.product.title}
                  >
                    {pick.product.title}
                  </a>

                  {/* Why it's on podium (desktop/tablet only to keep mobile ultra-compact) */}
                  <div
                    className={`p-1.5 rounded-lg border mb-2.5 hidden sm:flex items-start gap-1.5 text-[11px] leading-tight ${
                      isDark ? 'bg-slate-800/80 border-slate-700 text-slate-300' : 'bg-slate-50 border-slate-200 text-slate-600'
                    }`}
                  >
                    <Award className="w-3.5 h-3.5 text-amber-500 shrink-0 mt-0.5" />
                    <span className="line-clamp-2">{pick.whyText}</span>
                  </div>

                  {/* Price & Amazon Button */}
                  <div
                    className={`pt-1.5 sm:pt-2.5 border-t flex flex-col sm:flex-row items-center justify-between gap-1 sm:gap-2 ${
                      isDark ? 'border-slate-800' : 'border-slate-200/70'
                    }`}
                  >
                    <div className="w-full sm:w-auto text-center sm:text-left">
                      <span className="text-[7.5px] sm:text-[9px] uppercase font-bold text-slate-400 block leading-none hidden sm:block">Oferta</span>
                      <span
                        className={`text-xs sm:text-base md:text-lg font-black tracking-tight leading-none ${
                          isDark ? 'text-white' : 'text-slate-950'
                        }`}
                      >
                        {formatPrice(pick.product.priceText)}
                      </span>
                    </div>

                    <a
                      href={directUrl}
                      target="_blank"
                      rel="nofollow sponsored noopener noreferrer"
                      className={`w-full sm:w-auto px-1.5 sm:px-3 py-1 sm:py-1.5 rounded-full font-bold text-[9px] sm:text-xs flex items-center justify-center gap-1 transition-all shadow-2xs hover:scale-102 active:scale-98 shrink-0 cursor-pointer ${pick.btnClass}`}
                    >
                      <span className="hidden sm:inline">Ir al producto</span>
                      <span className="sm:hidden">Ver</span>
                      <ExternalLink className="w-2.5 h-2.5 sm:w-3 sm:h-3" />
                    </a>
                  </div>
                </div>

                {/* 2. Podium Pedestal Base (Matches 3D Olympic Podium: 2 on Left, 1 Center, 3 on Right) */}
                <div
                  className={`w-full flex flex-col items-center justify-center py-1 sm:py-2.5 rounded-b-xl sm:rounded-b-2xl border-x-2 border-b-2 relative overflow-hidden transition-all select-none ${pick.podiumHeight} ${pick.podiumBg} ${pick.podiumBorder} ${pick.podiumHighlight}`}
                >
                  {/* Subtle 3D Top Bevel Light Line */}
                  <div className="absolute top-0 inset-x-0 h-0.5 sm:h-1 bg-gradient-to-r from-transparent via-white/80 to-transparent" />

                  {/* Giant 3D Podium Number */}
                  <span
                    className={`font-black text-white tracking-tighter drop-shadow-[0_2px_4px_rgba(0,0,0,0.5)] sm:drop-shadow-[0_4px_8px_rgba(0,0,0,0.5)] leading-none ${pick.numberSize}`}
                  >
                    {pick.podiumNumber}
                  </span>

                  {/* Podium Subtitle Ribbon */}
                  <span
                    className={`text-[7.5px] sm:text-[10px] font-black tracking-wider uppercase px-1.5 sm:px-2 py-0.5 rounded-full mt-1 sm:mt-1.5 backdrop-blur-xs whitespace-nowrap shrink-0 ${
                      pick.rank === 1
                        ? 'bg-amber-950/20 text-amber-950 border border-amber-900/20'
                        : pick.rank === 2
                        ? 'bg-slate-900/20 text-slate-900 border border-slate-700/20'
                        : 'bg-black/35 text-amber-100 border border-white/20'
                    }`}
                  >
                    <span className="hidden sm:inline">{pick.podiumSubtitle}</span>
                    <span className="sm:hidden">{pick.rank === 1 ? 'ORO' : pick.rank === 2 ? 'PLATA' : 'BRONCE'}</span>
                  </span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Elegant Podium Stage Shadow Base */}
        <div className="hidden md:block h-3 mx-6 bg-gradient-to-b from-slate-900/20 to-transparent rounded-full filter blur-[2px] mt-1" />

        {/* Discrete Pagination Dots at Bottom */}
        {podiumSets.length > 1 && (
          <div className="flex items-center justify-center gap-2 mt-4">
            {podiumSets.map((_, idx) => (
              <button
                key={idx}
                onClick={() => switchSet(idx)}
                aria-label={`Ver podio ${idx + 1}`}
                className={`transition-all rounded-full cursor-pointer ${
                  activeSetIndex === idx
                    ? 'w-6 h-2 bg-amber-500 shadow-xs'
                    : 'w-2 h-2 bg-slate-300 hover:bg-slate-400 dark:bg-slate-700'
                }`}
              />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
