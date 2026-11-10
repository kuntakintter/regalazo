'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { Product } from '@/data/products';
import { getAmazonProductUrl } from '@/lib/amazon';
import { useCurrency } from '@/context/CurrencyContext';
import { useVoting } from '@/context/VotingContext';
import { Star, Heart, Share2, ShoppingBag, ChevronLeft, ChevronRight, ExternalLink, MessageSquare, ChevronDown, Users, CheckCircle2, Target } from 'lucide-react';

interface ProductCardProps {
  product: Product;
  currentTheme?: string;
  rankBadge?: 1 | 2 | 3;
}

export default function ProductCard({ product, rankBadge }: ProductCardProps) {
  const { formatPrice, amazonRegion } = useCurrency();
  const { toggleItem, isItemInList } = useVoting();
  const isInVote = isItemInList(product.id);
  const [copied, setCopied] = useState(false);
  const [activeImgIndex, setActiveImgIndex] = useState(0);
  const [showVerdict, setShowVerdict] = useState(false);

  // Multi-image navigation
  const imagesList = product.images && product.images.length > 0 ? product.images : (product.imageUrl ? [product.imageUrl] : []);
  const currentImgSrc = imagesList[activeImgIndex] || product.imageUrl || '';
  const [hasImgError, setHasImgError] = useState(false);

  React.useEffect(() => {
    setHasImgError(false);
  }, [currentImgSrc]);

  // Enlace directo al producto específico en Amazon (con fallback seguro antierror 404)
  const directProductUrl = getAmazonProductUrl(product.asin, product.searchQuery || product.title, amazonRegion);

  const handleShare = async (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
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

  const isGold = rankBadge === 1;
  const isSilver = rankBadge === 2;
  const isBronze = rankBadge === 3;

  return (
    <article
      className={`group flex flex-col justify-between p-2.5 sm:p-3 rounded-2xl bg-white transition-all duration-200 relative ${
        isGold
          ? 'border-2 border-amber-400 shadow-md ring-2 ring-amber-400/20 hover:border-amber-500'
          : isSilver
          ? 'border-2 border-slate-300 shadow-md ring-2 ring-slate-300/30 hover:border-slate-400'
          : isBronze
          ? 'border-2 border-amber-700/60 shadow-md ring-2 ring-amber-700/20 hover:border-amber-700'
          : 'border border-slate-300 hover:border-slate-400 shadow-xs hover:shadow-md'
      }`}
    >
      {/* Top 1, 2, 3 Luxury Medal Badge */}
      {rankBadge && (
        <div className="absolute -top-2.5 left-3 z-30 select-none">
          {isGold && (
            <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-black tracking-wider uppercase bg-linear-to-r from-amber-400 via-yellow-300 to-amber-500 text-slate-950 shadow-md ring-1 ring-amber-500/50">
              <span>🥇</span>
              <span>Nº1 TOP VENTAS</span>
            </span>
          )}
          {isSilver && (
            <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-black tracking-wider uppercase bg-linear-to-r from-slate-200 via-gray-100 to-slate-300 text-slate-900 shadow-md ring-1 ring-slate-400/50">
              <span>🥈</span>
              <span>Nº2 CALIDAD/PRECIO</span>
            </span>
          )}
          {isBronze && (
            <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-black tracking-wider uppercase bg-linear-to-r from-amber-700 via-amber-600 to-amber-800 text-white shadow-md ring-1 ring-amber-800/50">
              <span>🥉</span>
              <span>Nº3 MÁS ORIGINAL</span>
            </span>
          )}
        </div>
      )}
      {/* Product Image Viewport - Clean Amazon White Box */}
      <div className="relative aspect-square w-full mb-2 bg-slate-50/80 rounded-xl overflow-hidden p-2 flex items-center justify-center border border-slate-100">
        <a 
          href={directProductUrl}
          target="_blank"
          rel="nofollow sponsored noopener noreferrer"
          aria-label={`Ver foto de ${product.title}`}
          className="block w-full h-full cursor-pointer relative"
        >
          {currentImgSrc && !hasImgError ? (
            <Image
              src={currentImgSrc}
              alt={`${product.title} - Foto ${activeImgIndex + 1}`}
              fill
              loading={rankBadge === 1 || rankBadge === 2 ? 'eager' : 'lazy'}
              unoptimized={currentImgSrc.startsWith('http')}
              onError={() => setHasImgError(true)}
              sizes="(max-width: 640px) 50vw, (max-width: 1024px) 25vw, 16vw"
              className="object-contain p-1 transition-transform duration-200 group-hover:scale-105"
            />
          ) : (
            <span className="w-full h-full bg-slate-50 flex flex-col items-center justify-center text-slate-600 p-2 text-center">
              <ShoppingBag className="w-6 h-6 mb-1 text-slate-500 opacity-75" />
              <span className="text-[10px] font-bold text-slate-700 line-clamp-1">
                {product.title}
              </span>
            </span>
          )}
        </a>

        {/* Multi-image navigation arrows */}
        {imagesList.length > 1 && (
          <>
            <button
              type="button"
              onClick={handlePrevImage}
              aria-label="Ver imagen anterior"
              className="absolute left-1 top-1/2 -translate-y-1/2 w-7 h-7 rounded-full bg-black/70 hover:bg-black/85 text-white flex items-center justify-center backdrop-blur-md opacity-0 group-hover:opacity-100 transition-opacity z-20 cursor-pointer shadow-xs"
            >
              <ChevronLeft className="w-3.5 h-3.5" />
            </button>
            <button
              type="button"
              onClick={handleNextImage}
              aria-label="Ver siguiente imagen"
              className="absolute right-1 top-1/2 -translate-y-1/2 w-7 h-7 rounded-full bg-black/70 hover:bg-black/85 text-white flex items-center justify-center backdrop-blur-md opacity-0 group-hover:opacity-100 transition-opacity z-20 cursor-pointer shadow-xs"
            >
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </>
        )}

        {/* Action icons (Wishlist & Share) */}
        <div className="absolute top-1.5 right-1.5 flex items-center gap-1 z-10">
          <button
            type="button"
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              toggleItem(product);
            }}
            aria-label={isInVote ? 'Quitar de la lista de votación' : 'Añadir a la lista de votación'}
            title={isInVote ? 'En tu lista de votación en grupo' : 'Añadir a votación en grupo'}
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
            aria-label="Compartir idea"
            className="w-7 h-7 rounded-full bg-white/95 backdrop-blur-xs flex items-center justify-center text-slate-600 hover:text-slate-950 hover:scale-105 transition-transform shadow-2xs cursor-pointer border border-slate-200"
          >
            <Share2 className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Product Content (Amazon Exact Clean Layout) */}
      <div className="flex flex-col flex-1 justify-between">
        <div>
          {/* Subcategory Label */}
          {product.subcategory && (
            <div className="mb-1">
              <span className="text-[11px] text-slate-600 font-medium truncate block">
                {product.subcategory}
              </span>
            </div>
          )}

          {/* Title (Amazon clean style: text-slate-900, 2 lines, no heavy cards) */}
          <p className="font-medium text-xs sm:text-[13px] leading-snug text-slate-900 group-hover:text-[#c45500] transition-colors mb-1 min-h-[2rem]">
            <a
              href={directProductUrl}
              target="_blank"
              rel="nofollow sponsored noopener noreferrer"
              className="block line-clamp-2 hover:underline"
            >
              {product.title}
            </a>
          </p>

          {/* Rating and Reviews (Amazon star rating with blue review count) */}
          <div className="flex items-center gap-1 text-[11px] mb-1.5">
            <div className="flex items-center text-amber-500">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className={`w-3 h-3 ${
                    i < Math.floor(product.rating)
                      ? 'fill-amber-400 text-amber-400'
                      : 'fill-slate-200 text-slate-200'
                  }`}
                />
              ))}
            </div>
            <span className="font-bold text-slate-900 text-xs ml-0.5">{product.rating}</span>
            <span className="text-[#007185] hover:underline font-medium text-[11px]">
              ({product.reviewsCount ? product.reviewsCount.toLocaleString('es-ES') : '120'})
            </span>
          </div>

          {/* Botón interactivo: Veredicto y opinión de compradores */}
          <div className="my-1.5">
            <button
              type="button"
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                setShowVerdict((prev) => !prev);
              }}
              aria-expanded={showVerdict}
              className={`w-full flex items-center justify-between px-2 py-1.5 rounded-lg text-[11px] font-semibold transition-all border cursor-pointer select-none ${
                showVerdict
                  ? 'bg-amber-50 border-amber-300 text-amber-900 shadow-2xs'
                  : 'bg-slate-50/80 hover:bg-amber-50/60 border-slate-200/90 hover:border-amber-200 text-slate-700 hover:text-amber-900'
              }`}
            >
              <span className="flex items-center gap-1.5 truncate">
                <MessageSquare className="w-3.5 h-3.5 text-amber-600 shrink-0" />
                <span className="truncate">¿Por qué gusta a los compradores?</span>
                <span className="sr-only"> — {showVerdict ? 'Ocultar' : 'Ver'} opinión y reseñas</span>
              </span>
              <ChevronDown
                className={`w-3 h-3 text-slate-600 transition-transform duration-200 shrink-0 ml-1 ${
                  showVerdict ? 'rotate-180 text-amber-600' : ''
                }`}
              />
            </button>

            {/* Desplegable con el consenso editorial y pros */}
            {showVerdict && (
              <div className="mt-1.5 p-2.5 rounded-xl bg-amber-50/40 border border-amber-200/80 text-left text-xs transition-all animate-in fade-in duration-150">
                {/* Cabecera del consenso */}
                <div className="flex items-center justify-between pb-1.5 mb-1.5 border-b border-amber-200/60 gap-1.5">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-slate-600 flex items-center gap-1 min-w-0">
                    <Users className="w-3 h-3 text-amber-600 shrink-0" />
                    <span className="truncate">Consenso ({product.reviewsCount ? product.reviewsCount.toLocaleString('es-ES') : '100+'} reseñas)</span>
                  </span>
                  <span className="text-[10px] font-black text-emerald-700 bg-emerald-100/90 px-1.5 py-0.5 rounded whitespace-nowrap shrink-0">
                    ★ {product.rating} / 5
                  </span>
                </div>

                {/* Lo más destacado / Pros */}
                {product.pros && product.pros.length > 0 ? (
                  <div className="mb-2">
                    <p className="text-[10px] font-extrabold text-slate-800 mb-1 flex items-center gap-1">
                      <CheckCircle2 className="w-3 h-3 text-emerald-600 shrink-0" />
                      <span>Lo más valorado por quienes lo tienen:</span>
                    </p>
                    <ul className="space-y-1 text-[11px] text-slate-700 pl-3.5 list-disc marker:text-emerald-500 leading-snug">
                      {product.pros.slice(0, 2).map((pro, idx) => (
                        <li key={idx}>{pro}</li>
                      ))}
                    </ul>
                  </div>
                ) : (
                  <div className="mb-2">
                    <p className="text-[10px] font-extrabold text-slate-800 mb-1 flex items-center gap-1">
                      <CheckCircle2 className="w-3 h-3 text-emerald-600 shrink-0" />
                      <span>Por qué destaca:</span>
                    </p>
                    <p className="text-[11px] text-slate-700 leading-snug">
                      {product.description || 'Excelente valoración media por su fiabilidad, facilidad de uso y relación calidad/precio.'}
                    </p>
                  </div>
                )}

                {/* Ideal para */}
                {product.idealFor && (
                  <div className="pt-1.5 border-t border-amber-200/50">
                    <p className="text-[10px] font-extrabold text-slate-800 mb-0.5 flex items-center gap-1">
                      <Target className="w-3 h-3 text-amber-700 shrink-0" />
                      <span>Para quién es ideal:</span>
                    </p>
                    <p className="text-[11px] text-slate-700 leading-snug">
                      {product.idealFor}
                    </p>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>

        {/* Pricing, Prime & Amazon Official Yellow Pill Button */}
        <div className="pt-1 mt-auto">
          {/* Price & Prime Badge */}
          <div className="flex items-baseline gap-1 mb-0.5">
            <span className="text-base sm:text-lg font-black text-slate-950 tracking-tight">
              {formatPrice(product.priceText)}
            </span>
          </div>

          {/* Prime delivery line */}
          <div className="flex items-center gap-1 text-[10px] sm:text-[11px] text-slate-600 font-normal mb-2">
            <span className="text-[#007185] font-black text-xs">✓prime</span>
            <span>Entrega <span className="text-slate-800 font-semibold">Mañana</span></span>
          </div>

          {/* Amazon Yellow Button */}
          <a
            href={directProductUrl}
            target="_blank"
            rel="nofollow sponsored noopener noreferrer"
            className="w-full py-2 px-3 rounded-xl text-xs font-black text-slate-950 bg-[#ffd814] hover:bg-[#f7ca00] active:bg-[#f0b800] border border-[#fcd200] shadow-xs text-center flex items-center justify-center gap-1.5 transition-all cursor-pointer hover:scale-101"
          >
            <span>Ver oferta en Amazon</span>
            <span className="sr-only">: {product.title}</span>
            <ExternalLink className="w-3.5 h-3.5 text-slate-900" />
          </a>

          {/* Toast feedback when copied */}
          {copied && (
            <div className="text-center text-[9px] text-emerald-700 font-bold mt-1">
              ✓ ¡Enlace copiado!
            </div>
          )}
        </div>
      </div>
    </article>
  );
}
