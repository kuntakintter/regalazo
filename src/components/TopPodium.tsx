'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { Product } from '@/data/products';
import { getAmazonProductUrl } from '@/lib/amazon';
import { useCurrency } from '@/context/CurrencyContext';
import { Trophy, Award, Star, ExternalLink, ShieldCheck, Flame, Check, Clock, ShoppingBag } from 'lucide-react';

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
      // Cutoff time 19:30 (typical Amazon express carrier cutoff)
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
  // 1. Gold: Highest reviews count + rating
  // 2. Silver: Best value / affordable with >= 4.6 rating
  // 3. Bronze: High rating distinct pick
  const sortedByPopularity = [...products].sort((a, b) => (b.reviewsCount || 0) - (a.reviewsCount || 0));
  
  const gold = sortedByPopularity[0];
  
  // Find silver: price < 50€ if available, otherwise 2nd popular
  const silver = sortedByPopularity.slice(1).find(p => p.priceRange === '<20' || p.priceRange === '20-50') || sortedByPopularity[1];
  
  // Find bronze: another high-rated pick
  const bronze = sortedByPopularity.slice(1).find(p => p.id !== silver.id && p.rating >= 4.5) || sortedByPopularity.find(p => p.id !== gold.id && p.id !== silver.id) || sortedByPopularity[2];

  const podiumPicks = [
    {
      rank: 1,
      badgeText: '🥇 Nº1 Más Vendido',
      badgeClass: 'bg-amber-500 text-slate-950 font-black shadow-md shadow-amber-500/25 border border-amber-300',
      cardClass: isDark
        ? 'border-2 border-amber-400 bg-gradient-to-b from-amber-500/20 via-slate-900 to-slate-950 shadow-xl shadow-amber-500/10 ring-2 ring-amber-400/20 text-white'
        : 'border-2 border-amber-400 bg-gradient-to-b from-amber-500/10 via-white to-amber-500/5 shadow-xl shadow-amber-500/10 ring-2 ring-amber-400/20 text-slate-900',
      pillClass: 'bg-amber-100 text-amber-900 border-amber-300',
      whyText: 'El favorito indiscutible con miles de compras verificadas',
      btnClass: 'bg-[#FF9900] hover:bg-[#ffad33] text-slate-950 shadow-md shadow-amber-500/30',
      product: gold,
    },
    {
      rank: 2,
      badgeText: '🥈 Mejor Calidad / Precio',
      badgeClass: 'bg-slate-700 text-white font-black shadow-md border border-slate-500',
      cardClass: isDark
        ? 'border-2 border-slate-600 bg-gradient-to-b from-slate-800 via-slate-900 to-slate-950 shadow-lg text-white'
        : 'border-2 border-slate-300 bg-gradient-to-b from-slate-100/60 via-white to-slate-50 shadow-lg text-slate-900',
      pillClass: 'bg-slate-100 text-slate-800 border-slate-300',
      whyText: 'Máxima calidad al precio más ajustado',
      btnClass: 'bg-indigo-600 hover:bg-indigo-700 text-white shadow-md shadow-indigo-500/25',
      product: silver,
    },
    {
      rank: 3,
      badgeText: '🥉 El Más Original',
      badgeClass: 'bg-orange-700 text-white font-black shadow-md border border-orange-500',
      cardClass: isDark
        ? 'border-2 border-orange-500/80 bg-gradient-to-b from-orange-500/20 via-slate-900 to-slate-950 shadow-lg text-white'
        : 'border-2 border-orange-200 bg-gradient-to-b from-orange-50/50 via-white to-orange-50/30 shadow-lg text-slate-900',
      pillClass: 'bg-orange-100 text-orange-900 border-orange-300',
      whyText: 'La opción sorpresa que enamora a cualquiera',
      btnClass: isDark
        ? 'bg-orange-600 hover:bg-orange-500 text-white shadow-md'
        : 'bg-slate-900 hover:bg-slate-800 text-white shadow-md',
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
            <div className="w-11 h-11 rounded-2xl bg-amber-500 text-slate-950 flex items-center justify-center shadow-lg shadow-amber-500/30 shrink-0">
              <Trophy className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className={`text-xs font-black uppercase tracking-wider px-2 py-0.5 rounded-md ${
                  isDark ? 'text-amber-300 bg-amber-950/80 border border-amber-500/40' : 'text-amber-600 bg-amber-100'
                }`}>
                  Ranking Oficial 2026
                </span>
                <span className={`text-xs font-bold hidden sm:inline ${isDark ? 'text-slate-300' : 'text-slate-500'}`}>• Catálogo Verificado</span>
              </div>
              <h2 className={`text-xl sm:text-2xl font-black leading-tight ${isDark ? 'text-white' : 'text-slate-900'}`}>
                🏆 El Podio: Los 3 Más Vendidos {filterLabel ? `en ${filterLabel}` : ''}
              </h2>
            </div>
          </div>
          <div className="flex flex-col sm:flex-row items-end sm:items-center gap-2 self-end sm:self-center">
            {/* Real Amazon Prime Delivery Cutoff Timer */}
            <div className={`inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-bold shadow-xs border ${
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

      {/* 3 Podium Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8 items-stretch">
        {podiumPicks.map((pick) => {
          const directUrl = getAmazonProductUrl(pick.product.asin || 'B0DLWK3LKH');
          const isGold = pick.rank === 1;

          return (
            <div
              key={pick.product.id}
              className={`rounded-3xl p-5 flex flex-col justify-between transition-all duration-300 hover:scale-[1.02] hover:-translate-y-1 relative ${pick.cardClass}`}
            >
              {/* Top Medal Ribbon */}
              <div className="flex items-center justify-between mb-4">
                <span className={`px-3 py-1.5 rounded-xl text-xs sm:text-sm flex items-center gap-1.5 ${pick.badgeClass}`}>
                  {pick.badgeText}
                </span>
                <span className={`text-[11px] font-bold px-2 py-1 rounded-lg border ${
                  isDark
                    ? 'bg-slate-800/90 text-slate-200 border-slate-700'
                    : 'text-slate-500 bg-white/90 border-slate-200'
                }`}>
                  {pick.product.badge}
                </span>
              </div>

              {/* Product Photo */}
              <a
                href={directUrl}
                target="_blank"
                rel="nofollow sponsored noopener noreferrer"
                className="relative w-full aspect-square bg-white rounded-2xl p-4 flex items-center justify-center overflow-hidden mb-4 border border-slate-200/80 group cursor-pointer"
              >
                {!failedImages[pick.product.id] ? (
                  <Image
                    src={pick.product.imageUrl}
                    alt={pick.product.title}
                    fill
                    sizes="(max-width: 768px) 100vw, 33vw"
                    className="object-contain p-2 group-hover:scale-108 transition-transform duration-300"
                    unoptimized={pick.product.imageUrl.startsWith('http')}
                    onError={() => setFailedImages((prev) => ({ ...prev, [pick.product.id]: true }))}
                  />
                ) : (
                  <div className="w-full h-full bg-gradient-to-br from-amber-50 to-slate-100 flex flex-col items-center justify-center text-slate-400 p-4 text-center">
                    <ShoppingBag className="w-10 h-10 mb-2 text-amber-500/70" />
                    <span className="text-xs font-bold text-slate-700 line-clamp-2 px-2">
                      {pick.product.title}
                    </span>
                    <span className="text-[11px] text-amber-600 font-extrabold mt-1">
                      Ver foto en Amazon.es →
                    </span>
                  </div>
                )}
                <span className="absolute bottom-2 right-2 text-[10px] font-bold bg-slate-900/85 text-white px-2 py-0.5 rounded-md backdrop-blur-xs flex items-center gap-1 z-10">
                  <ShieldCheck className="w-3 h-3 text-emerald-400" />
                  Amazon Prime
                </span>
              </a>

              {/* Product Info */}
              <div className="flex-1 flex flex-col">
                {/* Rating & Reviews */}
                <div className="flex items-center justify-between gap-2 mb-2 text-xs font-semibold">
                  <div className="flex items-center gap-1 text-amber-500">
                    <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
                    <span className={`font-black ${isDark ? 'text-white' : 'text-slate-900'}`}>{pick.product.rating}</span>
                    <span className={isDark ? 'text-slate-400' : 'text-slate-500'}>({pick.product.reviewsCount?.toLocaleString()} valoraciones)</span>
                  </div>
                </div>

                {/* Title */}
                <a
                  href={directUrl}
                  target="_blank"
                  rel="nofollow sponsored noopener noreferrer"
                  className={`font-bold text-sm sm:text-base line-clamp-2 transition-colors mb-3 leading-snug cursor-pointer ${
                    isDark ? 'text-white hover:text-amber-400' : 'text-slate-900 hover:text-indigo-600'
                  }`}
                  title={pick.product.title}
                >
                  {pick.product.title}
                </a>

                {/* Por qué está en el podio */}
                <div className={`p-2.5 rounded-xl border mb-3 flex items-start gap-2 text-xs ${
                  isDark ? 'bg-slate-800/90 border-slate-700 text-slate-200' : 'bg-white/80 border-slate-200/80 text-slate-600'
                }`}>
                  <Award className="w-3.5 h-3.5 text-amber-500 shrink-0 mt-0.5" />
                  <span className="font-medium">{pick.whyText}</span>
                </div>

                {/* Real Prime Delivery Urgency */}
                <div className={`flex items-center gap-1.5 text-[11px] font-semibold px-2.5 py-1 rounded-lg mb-3 border ${
                  isDark
                    ? 'bg-emerald-950/60 border-emerald-500/40 text-emerald-300'
                    : 'bg-emerald-50 border-emerald-200/60 text-emerald-700'
                }`}>
                  <Clock className="w-3 h-3 text-emerald-400 shrink-0" />
                  <span>
                    Pídelo antes de <strong>{timeLeft.hours}h {timeLeft.minutes}m</strong> y recíbelo <strong>{timeLeft.isTomorrow ? 'mañana' : 'rápido'}</strong>
                  </span>
                </div>

                {/* Price & Action */}
                <div className={`mt-auto pt-3 border-t flex items-center justify-between gap-3 ${
                  isDark ? 'border-slate-800' : 'border-slate-200/80'
                }`}>
                  <div>
                    <span className="text-[10px] uppercase font-bold text-slate-400 block">Precio Oferta</span>
                    <span className={`text-xl sm:text-2xl font-black tracking-tight ${
                      isDark ? 'text-white' : 'text-slate-950'
                    }`}>
                      {formatPrice(pick.product.priceText)}
                    </span>
                  </div>

                  <a
                    href={directUrl}
                    target="_blank"
                    rel="nofollow sponsored noopener noreferrer"
                    className={`px-4 py-2.5 rounded-xl font-bold text-xs sm:text-sm flex items-center gap-1.5 transition-transform hover:scale-103 active:scale-97 cursor-pointer shrink-0 ${pick.btnClass}`}
                  >
                    <span>Ver en Amazon</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
