'use client';

import React, { useState, useEffect, useMemo, useCallback } from 'react';
import Image from 'next/image';
import { Product } from '@/data/products';
import { getAmazonProductUrl, parsePrice } from '@/lib/amazon';
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
  ChevronRight,
  Zap,
  Tag,
  Coffee,
  Compass
} from 'lucide-react';

interface TopPodiumProps {
  products: Product[];
  filterLabel?: string;
  isDark?: boolean;
}

interface PodiumPick {
  rank: 1 | 2 | 3;
  badgeText: string;
  badgeClass: string;
  cardClass: string;
  orderClass: string;
  podiumHeight: string;
  numberSize: string;
  podiumNumber: string;
  podiumSubtitle: string;
  podiumBg: string;
  podiumBorder: string;
  podiumHighlight: string;
  btnClass: string;
  whyText: string;
  product: Product;
}

interface PodiumRanking {
  id: string;
  tabLabel: string;
  badge: string;
  title: string;
  subtitle: string;
  picks: [PodiumPick, PodiumPick, PodiumPick];
}

// Helper to categorize product family to prevent duplicates (e.g. NEVER 2 headphones, 2 books, etc.)
function getProductFamily(p: Product): string {
  const text = `${p.category} ${p.subcategory || ''} ${p.title} ${p.searchQuery || ''}`.toLowerCase();
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
  return (p.subcategory || p.category).toLowerCase();
}

// Helper to pick 3 products from diverse families
function pickDiverseTop3(
  candidates: Product[],
  excludedIds: Set<string>
): [Product, Product, Product] | null {
  if (!candidates || candidates.length < 3) return null;

  // First try with candidates not already used
  const poolNotUsed = candidates.filter((p) => !excludedIds.has(p.id));
  const pool = poolNotUsed.length >= 3 ? poolNotUsed : candidates;

  const sorted = [...pool].sort((a, b) => {
    const scoreA = (a.reviewsCount || 0) * (a.rating || 1);
    const scoreB = (b.reviewsCount || 0) * (b.rating || 1);
    return scoreB - scoreA;
  });

  const gold = sorted[0];
  const goldFamily = getProductFamily(gold);

  const silver = sorted.find(
    (p) => p.id !== gold.id && getProductFamily(p) !== goldFamily
  );
  if (!silver) return null;
  const silverFamily = getProductFamily(silver);

  const bronze = sorted.find(
    (p) =>
      p.id !== gold.id &&
      p.id !== silver.id &&
      getProductFamily(p) !== goldFamily &&
      getProductFamily(p) !== silverFamily
  );
  if (!bronze) return null;

  return [gold, silver, bronze];
}

export default function TopPodium({ products, filterLabel, isDark = false }: TopPodiumProps) {
  const { formatPrice } = useCurrency();
  const { toggleItem, isItemInList } = useVoting();
  const [failedImages, setFailedImages] = useState<Record<string, boolean>>({});
  const [activeRankingIndex, setActiveRankingIndex] = useState(0);
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

  // Assemble the podium pick structure
  const createPodiumPicks = useCallback(
    (
      productsTuple: [Product, Product, Product],
      goldReason: string,
      silverReason: string,
      bronzeReason: string
    ): [PodiumPick, PodiumPick, PodiumPick] => {
      const [gold, silver, bronze] = productsTuple;
      return [
        {
          rank: 1,
          badgeText: '🥇 Nº1 Más Vendido',
          badgeClass: 'bg-gradient-to-r from-amber-500 to-yellow-400 text-slate-950 font-black shadow-xs border border-amber-300',
          cardClass: isDark
            ? 'border-2 border-amber-400 bg-gradient-to-b from-amber-500/20 via-slate-900 to-slate-950 shadow-xl shadow-amber-500/15 ring-2 ring-amber-400/30 text-white'
            : 'border-2 border-amber-400 bg-gradient-to-b from-amber-500/10 via-white to-amber-50/40 shadow-xl shadow-amber-500/15 ring-2 ring-amber-400/25 text-slate-900',
          orderClass: 'order-1 md:order-2',
          podiumHeight: 'h-32 sm:h-38 md:h-44',
          numberSize: 'text-5xl sm:text-6xl md:text-7xl',
          podiumNumber: '1',
          podiumSubtitle: 'ORO · GANADOR',
          podiumBg: 'bg-gradient-to-b from-[#fde68a] via-[#f59e0b] to-[#b45309]',
          podiumBorder: 'border-amber-400',
          podiumHighlight: 'border-t-4 border-amber-200/90 shadow-[inset_0_3px_6px_rgba(255,255,255,0.7),0_12px_24px_rgba(217,119,6,0.3)]',
          btnClass: 'bg-[#ffd814] hover:bg-[#f7ca00] text-slate-900 border border-[#fcd200]',
          whyText: goldReason,
          product: gold,
        },
        {
          rank: 2,
          badgeText: '🥈 Nº2 Calidad/Precio',
          badgeClass: 'bg-gradient-to-r from-slate-200 to-slate-300 text-slate-900 font-black shadow-xs border border-slate-400',
          cardClass: isDark
            ? 'border-2 border-slate-500 bg-gradient-to-b from-slate-800 via-slate-900 to-slate-950 shadow-lg text-white'
            : 'border-2 border-slate-300 bg-gradient-to-b from-slate-100/60 via-white to-slate-50 shadow-md text-slate-900',
          orderClass: 'order-2 md:order-1',
          podiumHeight: 'h-24 sm:h-28 md:h-32',
          numberSize: 'text-4xl sm:text-5xl md:text-6xl',
          podiumNumber: '2',
          podiumSubtitle: 'PLATA · 2º PUESTO',
          podiumBg: 'bg-gradient-to-b from-[#f8fafc] via-[#cbd5e1] to-[#64748b]',
          podiumBorder: 'border-slate-300',
          podiumHighlight: 'border-t-4 border-white/90 shadow-[inset_0_3px_6px_rgba(255,255,255,0.8),0_10px_20px_rgba(100,116,139,0.2)]',
          btnClass: 'bg-[#ffd814] hover:bg-[#f7ca00] text-slate-900 border border-[#fcd200]',
          whyText: silverReason,
          product: silver,
        },
        {
          rank: 3,
          badgeText: '🥉 Nº3 El Más Original',
          badgeClass: 'bg-gradient-to-r from-amber-700 to-orange-800 text-white font-black shadow-xs border border-amber-600',
          cardClass: isDark
            ? 'border-2 border-orange-500/70 bg-gradient-to-b from-orange-500/15 via-slate-900 to-slate-950 shadow-lg text-white'
            : 'border-2 border-orange-200 bg-gradient-to-b from-orange-50/40 via-white to-orange-50/20 shadow-md text-slate-900',
          orderClass: 'order-3 md:order-3',
          podiumHeight: 'h-20 sm:h-22 md:h-26',
          numberSize: 'text-3xl sm:text-4xl md:text-5xl',
          podiumNumber: '3',
          podiumSubtitle: 'BRONCE · 3º PUESTO',
          podiumBg: 'bg-gradient-to-b from-[#d97706] via-[#92400e] to-[#451a03]',
          podiumBorder: 'border-amber-600',
          podiumHighlight: 'border-t-4 border-amber-400/50 shadow-[inset_0_3px_6px_rgba(255,255,255,0.4),0_8px_16px_rgba(120,53,15,0.25)]',
          btnClass: 'bg-[#ffd814] hover:bg-[#f7ca00] text-slate-900 border border-[#fcd200]',
          whyText: bronzeReason,
          product: bronze,
        },
      ];
    },
    [isDark]
  );

  // Compute multiple dynamic rankings from available products
  const rankings: PodiumRanking[] = useMemo(() => {
    if (!products || products.length < 3) return [];

    const usedIds = new Set<string>();
    const list: PodiumRanking[] = [];

    // 1. RANKING 1: Top Superventas Absolutos (General Top 3)
    const topPicks = pickDiverseTop3(products, usedIds);
    if (topPicks) {
      topPicks.forEach((p) => usedIds.add(p.id));
      list.push({
        id: 'superventas',
        tabLabel: '🏆 Top Superventas',
        badge: 'Ranking Oficial 2026',
        title: filterLabel
          ? `🏆 Podio de Honor: Los Más Vendidos en ${filterLabel}`
          : '🏆 Podio de Honor: Los 3 Más Vendidos de 2026',
        subtitle: 'El podio absoluto con las mejores valoraciones y miles de compras verificadas',
        picks: createPodiumPicks(
          topPicks,
          'El favorito indiscutible con miles de compras y 5 estrellas',
          'Máxima satisfacción y calidad insuperable',
          'El regalo perfecto para acertar al 100%'
        ),
      });
    }

    // 2. RANKING 2: Top Calidad/Precio & Chollos (< 35 €)
    const budgetPool = products.filter((p) => {
      const price = parsePrice(p.priceText);
      return (price > 0 && price <= 35) || p.priceRange === '<20';
    });
    if (budgetPool.length >= 3) {
      const budgetPicks = pickDiverseTop3(budgetPool, usedIds);
      if (budgetPicks) {
        budgetPicks.forEach((p) => usedIds.add(p.id));
        list.push({
          id: 'chollos',
          tabLabel: '💸 Chollos < 35 €',
          badge: 'Mejor Precio Garantizado',
          title: '💸 Podio Chollos: Top Aciertos por Menos de 35 €',
          subtitle: 'Regalos espectaculares que parecen caros pero cuestan muy poco',
          picks: createPodiumPicks(
            budgetPicks,
            'La mejor ganga del catálogo: calidad premium a precio mínimo',
            'Superventas accesible con valoraciones excelentes',
            'Detalle económico y sorprendente para cualquier ocasión'
          ),
        });
      }
    }

    // 3. RANKING 3: Top Frikis, Gaming & Colección
    const frikiPool = products.filter((p) => {
      const fam = getProductFamily(p);
      const txt = `${p.category} ${p.subcategory || ''} ${p.title} ${p.searchQuery || ''}`.toLowerCase();
      return (
        fam === 'gaming' ||
        fam === 'figure' ||
        fam === 'lego' ||
        fam === 'games' ||
        fam === 'diecast' ||
        p.style === 'gamer' ||
        txt.includes('star wars') ||
        txt.includes('harry potter') ||
        txt.includes('pokemon') ||
        txt.includes('manga') ||
        txt.includes('anime')
      );
    });
    if (frikiPool.length >= 3) {
      const frikiPicks = pickDiverseTop3(frikiPool, usedIds);
      if (frikiPicks) {
        frikiPicks.forEach((p) => usedIds.add(p.id));
        list.push({
          id: 'frikis',
          tabLabel: '⚡ Frikis & Colección',
          badge: 'Cultura Pop & Gaming',
          title: '⚡ Podio Geek: Top Frikis, Gaming y Coleccionismo',
          subtitle: 'Lo más buscado para fans de los videojuegos, Lego, manga y cine de culto',
          picks: createPodiumPicks(
            frikiPicks,
            'La joya de la corona para fans incondicionales y coleccionistas',
            'Detalle friki con acabados de primera y gran reconocimiento',
            'Sorpresa garantizada para amantes de la cultura pop'
          ),
        });
      }
    }

    // 4. RANKING 4: Top Gadgets, Tech & Curiosidades Virales
    const techPool = products.filter((p) => {
      const fam = getProductFamily(p);
      const txt = `${p.category} ${p.subcategory || ''} ${p.title} ${p.searchQuery || ''}`.toLowerCase();
      return (
        fam === 'audio' ||
        fam === 'lighting' ||
        fam === 'speaker' ||
        fam === 'watch' ||
        p.style === 'tech' ||
        txt.includes('gadget') ||
        txt.includes('bluetooth') ||
        txt.includes('inalámbrico') ||
        txt.includes('inalambrico') ||
        txt.includes('viral') ||
        txt.includes('inteligente')
      );
    });
    if (techPool.length >= 3) {
      const techPicks = pickDiverseTop3(techPool, usedIds);
      if (techPicks) {
        techPicks.forEach((p) => usedIds.add(p.id));
        list.push({
          id: 'gadgets',
          tabLabel: '💡 Gadgets & Virales',
          badge: 'Tendencia Tecnológica',
          title: '💡 Podio Tech: Top Gadgets y Novedades Virales',
          subtitle: 'Inventos curiosos, audio inalámbrico e iluminación para sorprender',
          picks: createPodiumPicks(
            techPicks,
            'El chisme más deseado de las redes con tecnología útil y divertida',
            'Sonido o iluminación de alto nivel con diseño futurista',
            'Accesorio inteligente original que nadie se espera'
          ),
        });
      }
    }

    // 5. RANKING 5: Top Hogar, Bienestar & Relax
    const lifestylePool = products.filter((p) => {
      const fam = getProductFamily(p);
      const txt = `${p.category} ${p.subcategory || ''} ${p.title}`.toLowerCase();
      return (
        fam === 'coffee' ||
        fam === 'experience' ||
        fam === 'fragrance' ||
        fam === 'sweets' ||
        fam === 'book' ||
        txt.includes('masaje') ||
        txt.includes('cocina') ||
        txt.includes('confort') ||
        txt.includes('manta') ||
        txt.includes('hogar')
      );
    });
    if (lifestylePool.length >= 3) {
      const lifestylePicks = pickDiverseTop3(lifestylePool, usedIds);
      if (lifestylePicks) {
        lifestylePicks.forEach((p) => usedIds.add(p.id));
        list.push({
          id: 'hogar',
          tabLabel: '☕ Hogar & Relax',
          badge: 'Estilo de Vida & Confort',
          title: '☕ Podio Bienestar: Top Hogar, Café y Experiencias',
          subtitle: 'Placeres cotidianos, aromas, momentos gourmet y descanso total',
          picks: createPodiumPicks(
            lifestylePicks,
            'El favorito para disfrutar en casa y desconectar al instante',
            'Momento de relax o experiencia gourmet de máxima categoría',
            'Un detalle cálido y elegante que enamora a cualquiera'
          ),
        });
      }
    }

    // If specific search or small filter didn't trigger themed pools, generate ranked tiers
    if (list.length < 2 && products.length >= 6) {
      // Tier 2: Next best products
      const tier2Picks = pickDiverseTop3(products, usedIds);
      if (tier2Picks) {
        tier2Picks.forEach((p) => usedIds.add(p.id));
        list.push({
          id: 'tier2',
          tabLabel: '⭐ Selección Top',
          badge: 'Altamente Valorados',
          title: `⭐ Podio Recomendado: Grandes Aciertos ${filterLabel ? `en ${filterLabel}` : ''}`,
          subtitle: 'Segunda selección oficial con excelentes comentarios de compradores',
          picks: createPodiumPicks(
            tier2Picks,
            'Opción premium muy destacada en su categoría',
            'Equilibrio óptimo entre prestaciones y satisfacción',
            'Alternativa original que destaca por su originalidad'
          ),
        });
      }

      // Tier 3: Third set if available
      if (products.length >= 9) {
        const tier3Picks = pickDiverseTop3(products, usedIds);
        if (tier3Picks) {
          tier3Picks.forEach((p) => usedIds.add(p.id));
          list.push({
            id: 'tier3',
            tabLabel: '🎁 Joyas Ocultas',
            badge: 'Descubrimientos',
            title: `🎁 Podio Descubrimiento: Joyas Ocultas ${filterLabel ? `en ${filterLabel}` : ''}`,
            subtitle: 'Productos con notas sobresalientes que muchos pasan por alto',
            picks: createPodiumPicks(
              tier3Picks,
              'Descubrimiento destacado por su innovación y valor',
              'Calidad contrastada con muy buenas opiniones',
              'Regalo único y muy especial'
            ),
          });
        }
      }
    }

    return list;
  }, [products, filterLabel, createPodiumPicks]);

  // Adjust activeRankingIndex if out of bounds
  useEffect(() => {
    if (activeRankingIndex >= rankings.length) {
      setActiveRankingIndex(0);
    }
  }, [rankings.length, activeRankingIndex]);

  // Handle switching ranking with slight animation
  const switchRanking = useCallback(
    (newIndex: number) => {
      if (newIndex === activeRankingIndex) return;
      setIsAnimating(true);
      setTimeout(() => {
        setActiveRankingIndex(newIndex);
        setIsAnimating(false);
      }, 150);
    },
    [activeRankingIndex]
  );

  const handlePrev = useCallback(() => {
    if (rankings.length <= 1) return;
    const prev = (activeRankingIndex - 1 + rankings.length) % rankings.length;
    switchRanking(prev);
  }, [activeRankingIndex, rankings.length, switchRanking]);

  const handleNext = useCallback(() => {
    if (rankings.length <= 1) return;
    const next = (activeRankingIndex + 1) % rankings.length;
    switchRanking(next);
  }, [activeRankingIndex, rankings.length, switchRanking]);

  // Auto-cycle every 9 seconds when not hovered
  useEffect(() => {
    if (isPaused || rankings.length <= 1) return;
    const timer = setInterval(() => {
      setActiveRankingIndex((curr) => (curr + 1) % rankings.length);
    }, 9000);
    return () => clearInterval(timer);
  }, [isPaused, rankings.length]);

  if (!rankings || rankings.length === 0) return null;

  const currentRanking = rankings[activeRankingIndex] || rankings[0];

  // Schema.org ItemList for Rich Snippets
  const podiumSchema = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: `${currentRanking.title} - ${filterLabel || 'Ideas de Regalo'}`,
    itemListElement: currentRanking.picks.map((pick) => ({
      '@type': 'ListItem',
      position: pick.rank,
      name: pick.product.title,
      description: pick.whyText,
      image: pick.product.imageUrl.startsWith('http')
        ? pick.product.imageUrl
        : `https://unbuenregalo.vercel.app${pick.product.imageUrl}`,
    })),
  };

  return (
    <section
      className="mb-14 pt-2 relative"
      aria-label="Podio de Honor y Rankings"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      {/* Schema.org for SEO */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(podiumSchema) }}
      />

      {/* HEADER BANNER WITH RANKING SWITCHER CONTROLS */}
      <div
        className={`relative mb-6 p-4 sm:p-5 rounded-3xl border backdrop-blur-md transition-colors ${
          isDark
            ? 'bg-gradient-to-r from-amber-500/15 via-orange-500/10 to-purple-500/20 border-orange-500/30'
            : 'bg-gradient-to-r from-amber-500/10 via-indigo-500/10 to-purple-500/10 border-amber-300/60'
        }`}
      >
        <div className="flex flex-col gap-3.5">
          {/* Top Line: Icon, Title, and Amazon Prime timer */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-2xl bg-amber-500 text-slate-950 flex items-center justify-center shadow-lg shadow-amber-500/30 shrink-0">
                <Trophy className="w-5 h-5" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <span
                    className={`text-[11px] font-black uppercase tracking-wider px-2 py-0.5 rounded-md ${
                      isDark
                        ? 'text-amber-300 bg-amber-950/80 border border-amber-500/40'
                        : 'text-amber-700 bg-amber-100'
                    }`}
                  >
                    {currentRanking.badge}
                  </span>
                  <span className={`text-xs font-bold hidden sm:inline ${isDark ? 'text-slate-300' : 'text-slate-500'}`}>
                    • Catálogo Verificado
                  </span>
                  {rankings.length > 1 && (
                    <span className="text-[11px] font-bold text-amber-950 bg-amber-400/90 px-2 py-0.5 rounded-full shadow-2xs">
                      Ranking {activeRankingIndex + 1} de {rankings.length}
                    </span>
                  )}
                </div>
                <h2 className={`text-lg sm:text-xl font-black leading-tight mt-0.5 ${isDark ? 'text-white' : 'text-slate-900'}`}>
                  {currentRanking.title}
                </h2>
                <p className={`text-xs font-medium line-clamp-1 mt-0.5 ${isDark ? 'text-slate-300' : 'text-slate-600'}`}>
                  {currentRanking.subtitle}
                </p>
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-2 self-end sm:self-center shrink-0">
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

              {/* Prev / Next mini buttons in header */}
              {rankings.length > 1 && (
                <div className="flex items-center gap-1 bg-white/90 dark:bg-slate-800/90 p-0.5 rounded-xl border border-slate-200 dark:border-slate-700 shadow-2xs">
                  <button
                    onClick={handlePrev}
                    aria-label="Ranking anterior"
                    title="Ranking anterior"
                    className="p-1.5 rounded-lg hover:bg-amber-100 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 transition-colors cursor-pointer"
                  >
                    <ChevronLeft className="w-4 h-4" />
                  </button>
                  <span className="text-[11px] font-bold px-1 text-slate-600 dark:text-slate-300">
                    {activeRankingIndex + 1}/{rankings.length}
                  </span>
                  <button
                    onClick={handleNext}
                    aria-label="Siguiente ranking"
                    title="Siguiente ranking"
                    className="p-1.5 rounded-lg hover:bg-amber-100 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 transition-colors cursor-pointer"
                  >
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* THEMATIC RANKING PILL TABS (Click to switch to any ranking immediately) */}
          {rankings.length > 1 && (
            <div className="flex items-center gap-2 overflow-x-auto pt-1 pb-0.5 scrollbar-none border-t border-slate-200/60 dark:border-slate-800/60">
              <span className="text-[11px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider shrink-0 mr-1 hidden sm:inline">
                Ver otros podios:
              </span>
              <div className="flex items-center gap-1.5 flex-nowrap">
                {rankings.map((r, idx) => {
                  const isActive = activeRankingIndex === idx;
                  return (
                    <button
                      key={r.id}
                      onClick={() => switchRanking(idx)}
                      className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all whitespace-nowrap cursor-pointer flex items-center gap-1.5 shrink-0 ${
                        isActive
                          ? 'bg-amber-500 text-slate-950 shadow-md scale-102 font-black ring-2 ring-amber-300'
                          : isDark
                          ? 'bg-slate-800/90 text-slate-300 hover:bg-slate-700 hover:text-white border border-slate-700'
                          : 'bg-white/85 text-slate-700 hover:bg-white hover:text-slate-950 border border-slate-200 shadow-2xs'
                      }`}
                    >
                      <span>{r.tabLabel}</span>
                    </button>
                  );
                })}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* PODIUM STAGE CONTAINER WITH PROMINENT SIDE NAVIGATION ARROWS */}
      <div className="max-w-4xl mx-auto relative px-2 sm:px-4 md:px-0">
        {/* BIG LEFT NAVIGATION ARROW (As highlighted by user in screenshot) */}
        {rankings.length > 1 && (
          <button
            onClick={handlePrev}
            aria-label="Ver ranking anterior"
            title="Ver ranking anterior"
            className="absolute -left-3 sm:-left-6 lg:-left-10 top-1/2 -translate-y-1/2 z-30 w-11 h-11 sm:w-13 sm:h-13 bg-white/95 dark:bg-slate-900/95 hover:bg-[#ffd814] dark:hover:bg-amber-500 text-slate-800 dark:text-white hover:text-slate-950 shadow-xl border-2 border-slate-200 dark:border-slate-700 hover:border-amber-400 rounded-full flex items-center justify-center transition-all hover:scale-110 active:scale-95 cursor-pointer group/nav"
          >
            <ChevronLeft className="w-6 h-6 group-hover/nav:-translate-x-0.5 transition-transform" />
          </button>
        )}

        {/* BIG RIGHT NAVIGATION ARROW (As highlighted by user in screenshot) */}
        {rankings.length > 1 && (
          <button
            onClick={handleNext}
            aria-label="Ver siguiente ranking"
            title="Ver siguiente ranking"
            className="absolute -right-3 sm:-right-6 lg:-right-10 top-1/2 -translate-y-1/2 z-30 w-11 h-11 sm:w-13 sm:h-13 bg-white/95 dark:bg-slate-900/95 hover:bg-[#ffd814] dark:hover:bg-amber-500 text-slate-800 dark:text-white hover:text-slate-950 shadow-xl border-2 border-slate-200 dark:border-slate-700 hover:border-amber-400 rounded-full flex items-center justify-center transition-all hover:scale-110 active:scale-95 cursor-pointer group/nav"
          >
            <ChevronRight className="w-6 h-6 group-hover/nav:translate-x-0.5 transition-transform" />
          </button>
        )}

        {/* 3D Olympic Podium Grid (2nd Silver on left, 1st Gold elevated in center, 3rd Bronze on right) */}
        <div
          className={`grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-5 items-end pt-5 transition-opacity duration-200 ${
            isAnimating ? 'opacity-40' : 'opacity-100'
          }`}
        >
          {currentRanking.picks.map((pick) => {
            const directUrl = getAmazonProductUrl(
              pick.product.asin,
              pick.product.searchQuery || pick.product.title
            );
            const isGold = pick.rank === 1;

            return (
              <div
                key={`${currentRanking.id}-${pick.product.id}`}
                className={`flex flex-col ${pick.orderClass} relative group`}
              >
                {/* 1. Compact Product Card perched atop the Podium */}
                <div
                  className={`rounded-t-2xl rounded-b-none p-3.5 sm:p-4 flex flex-col justify-between transition-all duration-300 relative ${
                    isGold ? 'pt-5 sm:pt-6 z-10' : 'z-0'
                  } ${pick.cardClass}`}
                >
                  {/* Floating Winner Crown for #1 */}
                  {isGold && (
                    <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-gradient-to-r from-amber-500 via-amber-400 to-yellow-400 text-slate-950 font-black text-[10px] sm:text-[11px] px-3 py-0.5 rounded-full shadow-md border-2 border-white flex items-center gap-1 uppercase tracking-wider whitespace-nowrap z-20">
                      <span>👑</span>
                      <span>GANADOR DEL RANKING</span>
                    </div>
                  )}

                  {/* Top Ribbon & Rating */}
                  <div className="flex items-center justify-between gap-1.5 mb-2">
                    <span className={`px-2 py-0.5 rounded-lg text-[11px] font-bold flex items-center gap-1 ${pick.badgeClass}`}>
                      {pick.badgeText}
                    </span>
                    <div className="flex items-center gap-1 text-amber-500 text-xs font-bold">
                      <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                      <span className={isDark ? 'text-white' : 'text-slate-900'}>{pick.product.rating}</span>
                      <span className={`text-[10px] ${isDark ? 'text-slate-400' : 'text-slate-400'}`}>
                        ({pick.product.reviewsCount?.toLocaleString()})
                      </span>
                    </div>
                  </div>

                  {/* Product Photo - Compact & Framed */}
                  <a
                    href={directUrl}
                    target="_blank"
                    rel="nofollow sponsored noopener noreferrer"
                    className="relative w-full h-32 sm:h-36 md:h-40 bg-white rounded-xl p-2 flex items-center justify-center overflow-hidden mb-2.5 border border-slate-200/80 group-hover:border-slate-300 transition-colors cursor-pointer"
                  >
                    {!failedImages[pick.product.id] ? (
                      <Image
                        src={pick.product.imageUrl}
                        alt={pick.product.title}
                        fill
                        sizes="(max-width: 768px) 100vw, 300px"
                        className="object-contain p-1.5 group-hover:scale-105 transition-transform duration-300"
                        unoptimized={pick.product.imageUrl.startsWith('http')}
                        onError={() => setFailedImages((prev) => ({ ...prev, [pick.product.id]: true }))}
                      />
                    ) : (
                      <div className="w-full h-full bg-slate-50 flex flex-col items-center justify-center text-slate-400 p-2 text-center">
                        <ShoppingBag className="w-8 h-8 mb-1 text-amber-500/70" />
                        <span className="text-[11px] font-bold text-slate-700 line-clamp-2">
                          {pick.product.title}
                        </span>
                      </div>
                    )}
                    <span className="absolute bottom-1.5 right-1.5 text-[9px] font-bold bg-slate-900/85 text-white px-1.5 py-0.5 rounded backdrop-blur-xs flex items-center gap-1 z-10">
                      <ShieldCheck className="w-2.5 h-2.5 text-emerald-400" />
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
                      className={`absolute top-1.5 right-1.5 w-6 h-6 rounded-full backdrop-blur-xs flex items-center justify-center transition-transform shadow-2xs z-10 cursor-pointer border ${
                        isItemInList(pick.product.id)
                          ? 'bg-rose-50 border-rose-200 text-rose-500 scale-110'
                          : 'bg-white/90 border-slate-100 text-slate-400 hover:text-rose-500 hover:scale-110'
                      }`}
                    >
                      <Heart className={`w-3 h-3 ${isItemInList(pick.product.id) ? 'fill-rose-500 text-rose-500' : ''}`} />
                    </button>
                  </a>

                  {/* Title - Compact 2 lines */}
                  <a
                    href={directUrl}
                    target="_blank"
                    rel="nofollow sponsored noopener noreferrer"
                    className={`font-bold text-xs sm:text-sm line-clamp-2 transition-colors mb-2 leading-snug min-h-[2.6rem] cursor-pointer ${
                      isDark ? 'text-white hover:text-amber-400' : 'text-slate-900 hover:text-amber-600'
                    }`}
                    title={pick.product.title}
                  >
                    {pick.product.title}
                  </a>

                  {/* Why it's on podium */}
                  <div
                    className={`p-1.5 rounded-lg border mb-2.5 flex items-start gap-1.5 text-[11px] leading-tight ${
                      isDark ? 'bg-slate-800/80 border-slate-700 text-slate-300' : 'bg-slate-50 border-slate-200 text-slate-600'
                    }`}
                  >
                    <Award className="w-3.5 h-3.5 text-amber-500 shrink-0 mt-0.5" />
                    <span className="line-clamp-2">{pick.whyText}</span>
                  </div>

                  {/* Price & Amazon Button */}
                  <div
                    className={`pt-2.5 border-t flex items-center justify-between gap-2 ${
                      isDark ? 'border-slate-800' : 'border-slate-200/70'
                    }`}
                  >
                    <div>
                      <span className="text-[9px] uppercase font-bold text-slate-400 block leading-none">Oferta</span>
                      <span
                        className={`text-base sm:text-lg font-black tracking-tight ${
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
                      className={`px-3 py-1.5 rounded-full font-bold text-xs flex items-center gap-1 transition-all shadow-2xs hover:scale-102 active:scale-98 shrink-0 cursor-pointer ${pick.btnClass}`}
                    >
                      <span>Ir al producto</span>
                      <ExternalLink className="w-3 h-3" />
                    </a>
                  </div>
                </div>

                {/* 2. Podium Pedestal Base (Matches User's 3D Olympic Podium Photo: 2 on Left, 1 Center, 3 on Right) */}
                <div
                  className={`w-full flex flex-col items-center justify-center py-2 sm:py-2.5 rounded-b-2xl border-x-2 border-b-2 relative overflow-hidden transition-all select-none ${pick.podiumHeight} ${pick.podiumBg} ${pick.podiumBorder} ${pick.podiumHighlight}`}
                >
                  {/* Subtle 3D Top Bevel Light Line */}
                  <div className="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-transparent via-white/80 to-transparent" />

                  {/* Giant 3D Podium Number (matching user's reference photo) */}
                  <span
                    className={`font-black text-white tracking-tighter drop-shadow-[0_4px_8px_rgba(0,0,0,0.5)] leading-none ${pick.numberSize}`}
                  >
                    {pick.podiumNumber}
                  </span>

                  {/* Podium Subtitle Ribbon */}
                  <span
                    className={`text-[9px] sm:text-[10px] font-black tracking-wider uppercase px-2 py-0.5 rounded-full mt-1.5 backdrop-blur-xs whitespace-nowrap shrink-0 ${
                      pick.rank === 1
                        ? 'bg-amber-950/20 text-amber-950 border border-amber-900/20'
                        : pick.rank === 2
                        ? 'bg-slate-900/20 text-slate-900 border border-slate-700/20'
                        : 'bg-black/35 text-amber-100 border border-white/20'
                    }`}
                  >
                    {pick.podiumSubtitle}
                  </span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Elegant Podium Stage Shadow Base */}
        <div className="hidden md:block h-3 mx-6 bg-gradient-to-b from-slate-900/20 to-transparent rounded-full filter blur-[2px] mt-1" />

        {/* Pagination Dots at Bottom */}
        {rankings.length > 1 && (
          <div className="flex items-center justify-center gap-2 mt-4">
            {rankings.map((r, idx) => (
              <button
                key={r.id}
                onClick={() => switchRanking(idx)}
                aria-label={`Ir al ranking ${idx + 1}: ${r.tabLabel}`}
                className={`transition-all rounded-full cursor-pointer ${
                  activeRankingIndex === idx
                    ? 'w-7 h-2.5 bg-amber-500 shadow-xs'
                    : 'w-2.5 h-2.5 bg-slate-300 hover:bg-slate-400 dark:bg-slate-700'
                }`}
              />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
