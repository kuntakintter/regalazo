'use client';

import React from 'react';
import Image from 'next/image';
import { Product } from '@/data/products';
import { getAmazonProductUrl } from '@/lib/amazon';
import { useCurrency } from '@/context/CurrencyContext';
import { Trophy, Award, Sparkles, Star, ExternalLink, ShieldCheck, Flame, Check } from 'lucide-react';

interface TopPodiumProps {
  products: Product[];
  filterLabel?: string;
}

export default function TopPodium({ products, filterLabel }: TopPodiumProps) {
  const { formatPrice } = useCurrency();

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
      cardClass: 'border-2 border-amber-400 bg-gradient-to-b from-amber-500/10 via-white to-amber-500/5 shadow-xl shadow-amber-500/10 ring-2 ring-amber-400/20',
      pillClass: 'bg-amber-100 text-amber-900 border-amber-300',
      whyText: 'El favorito indiscutible con miles de compras verificadas',
      btnClass: 'bg-[#FF9900] hover:bg-[#ffad33] text-slate-950 shadow-md shadow-amber-500/30',
      product: gold,
    },
    {
      rank: 2,
      badgeText: '🥈 Mejor Calidad / Precio',
      badgeClass: 'bg-slate-700 text-white font-black shadow-md border border-slate-500',
      cardClass: 'border-2 border-slate-300 bg-gradient-to-b from-slate-100/60 via-white to-slate-50 shadow-lg',
      pillClass: 'bg-slate-100 text-slate-800 border-slate-300',
      whyText: 'Máxima calidad al precio más ajustado',
      btnClass: 'bg-indigo-600 hover:bg-indigo-700 text-white shadow-md shadow-indigo-500/25',
      product: silver,
    },
    {
      rank: 3,
      badgeText: '🥉 El Más Original',
      badgeClass: 'bg-orange-700 text-white font-black shadow-md border border-orange-500',
      cardClass: 'border-2 border-orange-200 bg-gradient-to-b from-orange-50/50 via-white to-orange-50/30 shadow-lg',
      pillClass: 'bg-orange-100 text-orange-900 border-orange-300',
      whyText: 'La opción sorpresa que enamora a cualquiera',
      btnClass: 'bg-slate-900 hover:bg-slate-800 text-white shadow-md',
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
      <div className="relative mb-6 p-4 sm:p-5 rounded-3xl bg-gradient-to-r from-amber-500/10 via-indigo-500/10 to-purple-500/10 border border-amber-300/60 backdrop-blur-md">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-2xl bg-amber-500 text-slate-950 flex items-center justify-center shadow-lg shadow-amber-500/30 shrink-0">
              <Trophy className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-black uppercase tracking-wider text-amber-600 bg-amber-100 px-2 py-0.5 rounded-md">
                  Ranking Oficial 2026
                </span>
                <span className="text-xs font-bold text-slate-500 hidden sm:inline">• Catálogo Verificado</span>
              </div>
              <h2 className="text-xl sm:text-2xl font-black text-slate-900 leading-tight">
                🏆 El Podio: Los 3 Más Vendidos {filterLabel ? `en ${filterLabel}` : ''}
              </h2>
            </div>
          </div>
          <div className="text-xs font-semibold text-slate-600 flex items-center gap-1.5 self-end sm:self-center">
            <Flame className="w-4 h-4 text-orange-500 animate-bounce" />
            <span>Actualizado hoy</span>
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
                <span className="text-[11px] font-bold text-slate-500 bg-white/90 px-2 py-1 rounded-lg border border-slate-200">
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
                <Image
                  src={pick.product.imageUrl}
                  alt={pick.product.title}
                  fill
                  sizes="(max-width: 768px) 100vw, 33vw"
                  className="object-contain p-2 group-hover:scale-108 transition-transform duration-300"
                  unoptimized={pick.product.imageUrl.startsWith('http')}
                />
                <span className="absolute bottom-2 right-2 text-[10px] font-bold bg-slate-900/85 text-white px-2 py-0.5 rounded-md backdrop-blur-xs flex items-center gap-1">
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
                    <span className="font-black text-slate-900">{pick.product.rating}</span>
                    <span className="text-slate-500">({pick.product.reviewsCount?.toLocaleString()} valoraciones)</span>
                  </div>
                </div>

                {/* Title */}
                <a
                  href={directUrl}
                  target="_blank"
                  rel="nofollow sponsored noopener noreferrer"
                  className="font-bold text-sm sm:text-base text-slate-900 line-clamp-2 hover:text-indigo-600 transition-colors mb-3 leading-snug cursor-pointer"
                  title={pick.product.title}
                >
                  {pick.product.title}
                </a>

                {/* Por qué está en el podio */}
                <div className="p-2.5 rounded-xl bg-white/80 border border-slate-200/80 text-xs text-slate-600 mb-4 flex items-start gap-2">
                  <Sparkles className="w-3.5 h-3.5 text-amber-500 shrink-0 mt-0.5" />
                  <span className="font-medium">{pick.whyText}</span>
                </div>

                {/* Price & Action */}
                <div className="mt-auto pt-3 border-t border-slate-200/80 flex items-center justify-between gap-3">
                  <div>
                    <span className="text-[10px] uppercase font-bold text-slate-400 block">Precio Oferta</span>
                    <span className="text-xl sm:text-2xl font-black text-slate-950 tracking-tight">
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
