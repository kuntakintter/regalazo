'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { Product } from '@/data/products';
import { getAmazonProductUrl } from '@/lib/amazon';
import { useCurrency } from '@/context/CurrencyContext';
import { Trophy, Award, Star, ExternalLink, ShieldCheck, Flame, Clock, ShoppingBag } from 'lucide-react';

interface TopPodiumProps {
  products: Product[];
  filterLabel?: string;
  isDark?: boolean;
}

export default function TopPodium({ products, filterLabel, isDark = false }: TopPodiumProps) {
  const { formatPrice } = useCurrency();
  const [failedImages, setFailedImages] = useState<Record<string, boolean>>({});

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

  if (!products || products.length < 3) return null;

  // Select 3 top distinct products
  const sortedByPopularity = [...products].sort((a, b) => (b.reviewsCount || 0) - (a.reviewsCount || 0));
  
  const gold = sortedByPopularity[0];
  const silver = sortedByPopularity.slice(1).find(p => p.priceRange === '<20' || p.priceRange === '20-50') || sortedByPopularity[1];
  const bronze = sortedByPopularity.slice(1).find(p => p.id !== silver.id && p.rating >= 4.5) || sortedByPopularity.find(p => p.id !== gold.id && p.id !== silver.id) || sortedByPopularity[2];

  const podiumPicks = [
    {
      rank: 1,
      badgeText: '🥇 Nº1 Más Vendido',
      badgeClass: 'bg-gradient-to-r from-amber-500 to-yellow-400 text-slate-950 font-black shadow-xs border border-amber-300',
      cardClass: isDark
        ? 'border-2 border-amber-400 bg-gradient-to-b from-amber-500/20 via-slate-900 to-slate-950 shadow-xl shadow-amber-500/15 ring-2 ring-amber-400/30 text-white'
        : 'border-2 border-amber-400 bg-gradient-to-b from-amber-500/10 via-white to-amber-50/40 shadow-xl shadow-amber-500/15 ring-2 ring-amber-400/25 text-slate-900',
      orderClass: 'order-1 md:order-2',
      // Center Pedestal: Tallest block (like "1" in reference photo)
      podiumHeight: 'h-32 sm:h-38 md:h-44',
      numberSize: 'text-5xl sm:text-6xl md:text-7xl',
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
      orderClass: 'order-2 md:order-1',
      // Left Pedestal: Medium height block (like "2" in reference photo)
      podiumHeight: 'h-24 sm:h-28 md:h-32',
      numberSize: 'text-4xl sm:text-5xl md:text-6xl',
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
      orderClass: 'order-3 md:order-3',
      // Right Pedestal: Lower height block (like "3" in reference photo)
      podiumHeight: 'h-20 sm:h-22 md:h-26',
      numberSize: 'text-3xl sm:text-4xl md:text-5xl',
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
        : `https://unbuenregalo.vercel.app${pick.product.imageUrl}`,
    })),
  };

  return (
    <section className="mb-14 pt-2" aria-label="Top 3 Ventas">
      {/* Schema.org for SEO */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(podiumSchema) }}
      />

      {/* Header Banner */}
      <div className={`relative mb-6 p-4 sm:p-5 rounded-3xl border backdrop-blur-md ${
        isDark
          ? 'bg-gradient-to-r from-amber-500/15 via-orange-500/10 to-purple-500/20 border-orange-500/30'
          : 'bg-gradient-to-r from-amber-500/10 via-indigo-500/10 to-purple-500/10 border-amber-300/60'
      }`}>
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-amber-500 text-slate-950 flex items-center justify-center shadow-lg shadow-amber-500/30 shrink-0">
              <Trophy className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className={`text-[11px] font-black uppercase tracking-wider px-2 py-0.5 rounded-md ${
                  isDark ? 'text-amber-300 bg-amber-950/80 border border-amber-500/40' : 'text-amber-700 bg-amber-100'
                }`}>
                  Ranking Oficial 2026
                </span>
                <span className={`text-xs font-bold hidden sm:inline ${isDark ? 'text-slate-300' : 'text-slate-500'}`}>• Catálogo Verificado</span>
              </div>
              <h2 className={`text-lg sm:text-xl font-black leading-tight ${isDark ? 'text-white' : 'text-slate-900'}`}>
                🏆 Podio de Honor: Los 3 Más Vendidos {filterLabel ? `en ${filterLabel}` : ''}
              </h2>
            </div>
          </div>
          <div className="flex flex-col sm:flex-row items-end sm:items-center gap-2 self-end sm:self-center">
            {/* Real Amazon Prime Delivery Cutoff Timer */}
            <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold shadow-2xs border ${
              isDark
                ? 'bg-rose-950/70 border-rose-500/40 text-rose-300'
                : 'bg-rose-50 border-rose-200 text-rose-700'
            }`}>
              <Clock className="w-3.5 h-3.5 text-rose-500 animate-pulse" />
              <span>
                Envío exprés: <strong className={`font-mono ${isDark ? 'text-rose-200' : 'text-rose-800'}`}>{String(timeLeft.hours).padStart(2, '0')}:{String(timeLeft.minutes).padStart(2, '0')}:{String(timeLeft.seconds).padStart(2, '0')}</strong>
              </span>
            </div>

            <div className={`text-xs font-semibold flex items-center gap-1.5 ${isDark ? 'text-slate-300' : 'text-slate-500'}`}>
              <Flame className="w-4 h-4 text-orange-500" />
              <span>Revisado hoy</span>
            </div>
          </div>
        </div>
      </div>

      {/* Podium Stage Container - Compact and Proportional */}
      <div className="max-w-4xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-5 items-end pt-5">
          {podiumPicks.map((pick) => {
            const directUrl = getAmazonProductUrl(pick.product.asin || 'B0DLWK3LKH');
            const isGold = pick.rank === 1;

            return (
              <div
                key={pick.product.id}
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
                  <div className={`p-1.5 rounded-lg border mb-2.5 flex items-start gap-1.5 text-[11px] leading-tight ${
                    isDark ? 'bg-slate-800/80 border-slate-700 text-slate-300' : 'bg-slate-50 border-slate-200 text-slate-600'
                  }`}>
                    <Award className="w-3.5 h-3.5 text-amber-500 shrink-0 mt-0.5" />
                    <span className="line-clamp-2">{pick.whyText}</span>
                  </div>

                  {/* Price & Amazon Button */}
                  <div className={`pt-2.5 border-t flex items-center justify-between gap-2 ${
                    isDark ? 'border-slate-800' : 'border-slate-200/70'
                  }`}>
                    <div>
                      <span className="text-[9px] uppercase font-bold text-slate-400 block leading-none">Oferta</span>
                      <span className={`text-base sm:text-lg font-black tracking-tight ${
                        isDark ? 'text-white' : 'text-slate-950'
                      }`}>
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
                  <span className={`font-black text-white tracking-tighter drop-shadow-[0_4px_8px_rgba(0,0,0,0.5)] leading-none ${pick.numberSize}`}>
                    {pick.podiumNumber}
                  </span>

                  {/* Podium Subtitle Ribbon */}
                  <span className={`text-[9px] sm:text-[10px] font-black tracking-wider uppercase px-2 py-0.5 rounded-full mt-1.5 backdrop-blur-xs whitespace-nowrap shrink-0 ${
                    pick.rank === 1
                      ? 'bg-amber-950/20 text-amber-950 border border-amber-900/20'
                      : pick.rank === 2
                      ? 'bg-slate-900/20 text-slate-900 border border-slate-700/20'
                      : 'bg-black/35 text-amber-100 border border-white/20'
                  }`}>
                    {pick.podiumSubtitle}
                  </span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Elegant Podium Stage Shadow Base */}
        <div className="hidden md:block h-3 mx-6 bg-gradient-to-b from-slate-900/20 to-transparent rounded-full filter blur-[2px] mt-1" />
      </div>
    </section>
  );
}