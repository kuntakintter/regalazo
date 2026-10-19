'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { Product } from '@/data/products';
import { getAmazonProductUrl } from '@/lib/amazon';
import { ExternalLink, Star, CheckCircle2, Heart, Share2, Sparkles, ShoppingBag, ChevronLeft, ChevronRight, Camera } from 'lucide-react';

interface ProductCardProps {
  product: Product;
  currentTheme: string;
}

export default function ProductCard({ product, currentTheme }: ProductCardProps) {
  const [copied, setCopied] = useState(false);
  const [isLiked, setIsLiked] = useState(false);
  const [activeImgIndex, setActiveImgIndex] = useState(0);

  // Fallback to imageUrl if images array is not provided
  const imagesList = product.images && product.images.length > 0 ? product.images : [product.imageUrl];
  const currentImgSrc = imagesList[activeImgIndex] || product.imageUrl;

  // Enlace directo al producto específico en Amazon España (NUNCA a páginas de búsqueda)
  const directProductUrl = getAmazonProductUrl(product.asin || 'B0DLWK3LKH');
  const isDark = currentTheme === 'emo' || currentTheme === 'gamer';

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: product.title,
          text: product.description,
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

  const handlePrevImage = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setActiveImgIndex((prev) => (prev > 0 ? prev - 1 : imagesList.length - 1));
  };

  const handleNextImage = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setActiveImgIndex((prev) => (prev < imagesList.length - 1 ? prev + 1 : 0));
  };

  return (
    <article className={`group flex flex-col rounded-3xl overflow-hidden border transition-all duration-300 hover:shadow-xl hover:-translate-y-1 ${
      currentTheme === 'emo'
        ? 'bg-neutral-900/90 border-neutral-800 text-neutral-100 hover:border-rose-900/80 shadow-rose-950/20'
        : currentTheme === 'gamer'
        ? 'bg-slate-900/90 border-purple-900/60 text-slate-100 hover:border-cyan-500/50 shadow-purple-950/20'
        : currentTheme === 'baby'
        ? 'bg-white border-rose-200/90 text-rose-950 hover:border-pink-300 shadow-sm'
        : 'bg-white border-slate-200/90 text-slate-900 hover:border-indigo-300 shadow-sm'
    }`}>
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
            src={currentImgSrc}
            alt={`${product.title} - Foto ${activeImgIndex + 1}`}
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            className="object-cover transition-all duration-500 group-hover:scale-105"
          />
        </a>

        {/* Multi-image navigation arrows (visible on hover or always on touch) */}
        {imagesList.length > 1 && (
          <>
            <button
              onClick={handlePrevImage}
              aria-label="Ver imagen anterior"
              className="absolute left-2 top-1/2 -translate-y-1/2 w-7 h-7 rounded-full bg-black/60 hover:bg-black/80 text-white flex items-center justify-center backdrop-blur-md opacity-80 sm:opacity-0 sm:group-hover:opacity-100 transition-opacity z-20 cursor-pointer shadow-md"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button
              onClick={handleNextImage}
              aria-label="Ver siguiente imagen"
              className="absolute right-2 top-1/2 -translate-y-1/2 w-7 h-7 rounded-full bg-black/60 hover:bg-black/80 text-white flex items-center justify-center backdrop-blur-md opacity-80 sm:opacity-0 sm:group-hover:opacity-100 transition-opacity z-20 cursor-pointer shadow-md"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </>
        )}
        
        {/* Top Badges */}
        <div className="absolute top-3 left-3 flex flex-col gap-1.5 z-10 pointer-events-none">
          <span className={`px-3 py-1 rounded-full text-xs font-bold tracking-wide shadow-md backdrop-blur-md flex items-center gap-1 ${
            currentTheme === 'emo'
              ? 'bg-rose-950/90 text-rose-200 border border-rose-800/80'
              : currentTheme === 'baby'
              ? 'bg-pink-600/95 text-white'
              : currentTheme === 'gamer'
              ? 'bg-purple-900/90 text-purple-200 border border-purple-500/40'
              : 'bg-amber-500 text-white'
          }`}>
            <Sparkles className="w-3 h-3" />
            {product.badge}
          </span>
          <span className="self-start px-2 py-0.5 rounded-md text-[10px] font-semibold bg-black/60 text-white backdrop-blur-xs">
            {product.subcategory}
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

        {/* Multi-image indicator & dots */}
        {imagesList.length > 1 && (
          <div className="absolute bottom-3 left-3 z-10 flex items-center gap-1 bg-black/60 backdrop-blur-md px-2 py-1 rounded-full text-white text-[10px] font-bold">
            <Camera className="w-3 h-3 opacity-80 mr-0.5" />
            {imagesList.map((_, idx) => (
              <button
                key={idx}
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  setActiveImgIndex(idx);
                }}
                aria-label={`Ver foto ${idx + 1}`}
                className={`h-1.5 rounded-full transition-all cursor-pointer ${
                  activeImgIndex === idx ? 'w-4 bg-white' : 'w-1.5 bg-white/40 hover:bg-white/80'
                }`}
              />
            ))}
          </div>
        )}

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
          <span className="text-[11px] opacity-60">({product.reviewsCount.toLocaleString()} opiniones)</span>
        </div>

        {/* H3 Title for perfect SEO structure */}
        <h3 className="font-bold text-base line-clamp-2 leading-snug mb-2 group-hover:text-indigo-600 transition-colors">
          <a
            href={directProductUrl}
            target="_blank"
            rel="nofollow sponsored noopener noreferrer"
            className="hover:underline"
          >
            {product.title}
          </a>
        </h3>

        {/* Persuasive Description */}
        <p className="text-xs opacity-80 leading-relaxed mb-4 line-clamp-3">
          {product.description}
        </p>

        {/* Pros checklist */}
        <ul className="mb-5 space-y-1.5 text-xs opacity-90">
          {product.pros.map((pro, index) => (
            <li key={index} className="flex items-start gap-1.5">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 shrink-0 mt-0.5" />
              <span className="leading-tight">{pro}</span>
            </li>
          ))}
        </ul>

        {/* Ideal For hint */}
        <div className="mt-auto pt-3 border-t border-slate-100 mb-4 text-[11px] text-slate-500">
          <span className="font-semibold text-slate-700">Ideal para: </span>
          <span>{product.idealFor}</span>
        </div>

        {/* Live sync trust indicator */}
        <div className="flex items-center justify-between mb-3 text-[11px] font-semibold text-emerald-700 bg-emerald-50 border border-emerald-100 px-2.5 py-1 rounded-lg">
          <span className="flex items-center gap-1.5">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
            </span>
            <span>Precio al día en Amazon España</span>
          </span>
          <span className="text-[10px] text-emerald-800 font-normal">Envío Prime</span>
        </div>

        {/* CTAs */}
        <div className="space-y-2">
          {/* Main Affiliate CTA: Direct Product Page with Tag */}
          <a
            href={directProductUrl}
            target="_blank"
            rel="nofollow sponsored noopener noreferrer"
            className={`w-full py-3 px-4 rounded-2xl text-xs sm:text-sm font-bold flex items-center justify-center gap-2 shadow-md transition-all duration-200 hover:scale-[1.02] active:scale-[0.98] ${
              currentTheme === 'emo'
                ? 'bg-gradient-to-r from-rose-800 to-rose-950 text-white hover:from-rose-700 hover:to-rose-900 border border-rose-700/60 shadow-rose-950/40'
                : currentTheme === 'gamer'
                ? 'bg-gradient-to-r from-purple-600 to-indigo-600 text-white hover:from-purple-500 hover:to-indigo-500 shadow-purple-950/40'
                : currentTheme === 'baby'
                ? 'bg-gradient-to-r from-pink-500 to-rose-500 text-white hover:from-pink-400 hover:to-rose-400 shadow-rose-200'
                : 'bg-[#FF9900] text-slate-950 hover:bg-[#ffad33] shadow-amber-500/20'
            }`}
          >
            <ShoppingBag className="w-4 h-4" />
            <span>Ver Mejor Precio en Amazon</span>
            <ExternalLink className="w-3.5 h-3.5 opacity-80" />
          </a>

          {/* Secondary CTA: Direct product reviews and details */}
          <a
            href={directProductUrl}
            target="_blank"
            rel="nofollow sponsored noopener noreferrer"
            className="w-full py-1.5 px-3 rounded-xl text-[11px] font-medium text-center block opacity-60 hover:opacity-100 hover:underline transition-opacity"
          >
            Ver opiniones y comprar en Amazon.es →
          </a>
        </div>

        {/* Toast feedback when copied */}
        {copied && (
          <div className="text-center text-[10px] text-emerald-600 font-bold mt-1">
            ✓ ¡Enlace copiado al portapapeles!
          </div>
        )}

      </div>
    </article>
  );
}
