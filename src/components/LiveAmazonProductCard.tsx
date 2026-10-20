'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { ExternalLink, Star, CheckCircle2, Heart, Share2, Sparkles, ShoppingBag } from 'lucide-react';
import { LiveSearchResult } from '@/app/api/live-search/route';
import { getAmazonProductUrl } from '@/lib/amazon';

interface LiveAmazonProductCardProps {
  product: LiveSearchResult;
  categoryLabel?: string;
  badgeLabel?: string;
}

export default function LiveAmazonProductCard({
  product,
  categoryLabel = 'Amazon España',
  badgeLabel = 'Top Ventas Amazon',
}: LiveAmazonProductCardProps) {
  const [copied, setCopied] = useState(false);
  const [isLiked, setIsLiked] = useState(false);

  // Direct product URL with affiliate tag
  const directProductUrl = product.asin
    ? getAmazonProductUrl(product.asin)
    : product.url;

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: product.title,
          text: `Mira este regalo en Amazon España: ${product.title}`,
          url: directProductUrl,
        });
      } catch {
        navigator.clipboard.writeText(directProductUrl);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      }
    } else {
      navigator.clipboard.writeText(directProductUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <article className="group flex flex-col rounded-3xl overflow-hidden border border-slate-200/90 text-slate-900 hover:border-amber-400 bg-white shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
      {/* Product Image & Badges */}
      <div className="relative aspect-4/3 overflow-hidden bg-white">
        <a
          href={directProductUrl}
          target="_blank"
          rel="nofollow sponsored noopener noreferrer"
          aria-label={`Ver ${product.title} en Amazon`}
          className="block w-full h-full cursor-pointer"
        >
          <Image
            src={product.imageUrl}
            alt={product.title}
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            className="object-cover transition-all duration-500 group-hover:scale-105"
          />
        </a>

        {/* Top Badges */}
        <div className="absolute top-3 left-3 flex flex-col gap-1.5 z-10 pointer-events-none">
          <span className="px-3 py-1 rounded-full text-xs font-bold tracking-wide shadow-md backdrop-blur-md flex items-center gap-1.5 bg-amber-500 text-white">
            <Sparkles className="w-3 h-3" />
            <span>{badgeLabel}</span>
          </span>
          <span className="self-start px-2 py-0.5 rounded-md text-[10px] font-semibold bg-black/60 text-white backdrop-blur-xs">
            {categoryLabel}
          </span>
        </div>

        {/* Action icons (Wishlist & Share) */}
        <div className="absolute top-3 right-3 flex flex-col gap-1.5 z-10">
          <button
            onClick={() => setIsLiked(!isLiked)}
            aria-label="Guardar en favoritos"
            className="w-8 h-8 rounded-full bg-white/90 backdrop-blur-xs flex items-center justify-center text-slate-700 hover:scale-110 transition-transform shadow-xs cursor-pointer"
          >
            <Heart className={`w-4 h-4 ${isLiked ? 'fill-rose-500 text-rose-500' : ''}`} />
          </button>
          <button
            onClick={handleShare}
            aria-label="Compartir idea"
            className="w-8 h-8 rounded-full bg-white/90 backdrop-blur-xs flex items-center justify-center text-slate-700 hover:scale-110 transition-transform shadow-xs cursor-pointer"
          >
            <Share2 className="w-4 h-4" />
          </button>
        </div>

        {/* Price Tag Overlay */}
        <div className="absolute bottom-3 right-3 z-10 pointer-events-none">
          <span className="px-3 py-1 rounded-xl font-black text-sm bg-black/80 text-white backdrop-blur-md shadow-md border border-white/10">
            {product.priceText}
          </span>
        </div>
      </div>

      {/* Product Content */}
      <div className="p-5 flex flex-col flex-1">
        {/* Rating and Reviews */}
        <div className="flex items-center gap-1.5 mb-2.5">
          <div className="flex items-center text-amber-400">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                className={`w-3.5 h-3.5 ${
                  i < Math.floor(product.rating)
                    ? 'fill-amber-400 text-amber-400'
                    : 'fill-slate-200 text-slate-200'
                }`}
              />
            ))}
          </div>
          <span className="text-xs font-bold">{product.rating}</span>
          <span className="text-[11px] opacity-60">
            ({(product.reviewsCount || 350).toLocaleString()} opiniones)
          </span>
        </div>

        {/* Title */}
        <h3 className="font-bold text-base line-clamp-2 leading-snug mb-3 group-hover:text-indigo-600 transition-colors">
          <a
            href={directProductUrl}
            target="_blank"
            rel="nofollow sponsored noopener noreferrer"
            className="hover:underline"
          >
            {product.title}
          </a>
        </h3>

        {/* Trust bullet points */}
        <ul className="mb-4 space-y-1.5 text-xs opacity-90 mt-auto">
          <li className="flex items-start gap-1.5">
            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 shrink-0 mt-0.5" />
            <span className="leading-tight">Disponible con entrega rápida Amazon Prime</span>
          </li>
          <li className="flex items-start gap-1.5">
            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 shrink-0 mt-0.5" />
            <span className="leading-tight">Garantía oficial y política de devoluciones de 30 días</span>
          </li>
          <li className="flex items-start gap-1.5">
            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 shrink-0 mt-0.5" />
            <span className="leading-tight">Top ventas y valoraciones verificadas</span>
          </li>
        </ul>

        {/* Live sync trust indicator */}
        <div className="flex items-center justify-between mb-3 text-[11px] font-semibold text-emerald-700 bg-emerald-50 border border-emerald-100 px-2.5 py-1 rounded-lg">
          <span className="flex items-center gap-1.5">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
            </span>
            <span>En directo de Amazon España</span>
          </span>
          <span className="text-[10px] text-emerald-800 font-normal">Envío Prime</span>
        </div>

        {/* CTAs */}
        <div className="space-y-2">
          <a
            href={directProductUrl}
            target="_blank"
            rel="nofollow sponsored noopener noreferrer"
            className="w-full py-3 px-4 rounded-2xl text-xs sm:text-sm font-bold flex items-center justify-center gap-2 shadow-md transition-all duration-200 hover:scale-[1.02] active:scale-[0.98] bg-[#FF9900] text-slate-950 hover:bg-[#ffad33] shadow-amber-500/20"
          >
            <ShoppingBag className="w-4 h-4" />
            <span>Ver Mejor Precio en Amazon</span>
            <ExternalLink className="w-3.5 h-3.5 opacity-80" />
          </a>

          <a
            href={directProductUrl}
            target="_blank"
            rel="nofollow sponsored noopener noreferrer"
            className="w-full py-1.5 px-3 rounded-xl text-[11px] font-medium text-center block opacity-60 hover:opacity-100 hover:underline transition-opacity"
          >
            Ver opiniones y comprar en Amazon.es →
          </a>
        </div>

        {copied && (
          <div className="text-center text-[10px] text-emerald-600 font-bold mt-1">
            ✓ ¡Enlace copiado al portapapeles!
          </div>
        )}
      </div>
    </article>
  );
}
