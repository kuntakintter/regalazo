'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { Product } from '@/data/products';
import { getAmazonProductUrl } from '@/lib/amazon';
import { useCurrency } from '@/context/CurrencyContext';
import { ExternalLink, Star, Heart, Share2, ShoppingBag, ChevronLeft, ChevronRight } from 'lucide-react';

interface ProductCardProps {
  product: Product;
  currentTheme?: string;
}

export default function ProductCard({ product }: ProductCardProps) {
  const { formatPrice } = useCurrency();
  const [copied, setCopied] = useState(false);
  const [isLiked, setIsLiked] = useState(false);
  const [activeImgIndex, setActiveImgIndex] = useState(0);

  // Multi-image navigation
  const imagesList = product.images && product.images.length > 0 ? product.images : (product.imageUrl ? [product.imageUrl] : []);
  const currentImgSrc = imagesList[activeImgIndex] || product.imageUrl || '';
  const [hasImgError, setHasImgError] = useState(false);

  React.useEffect(() => {
    setHasImgError(false);
  }, [currentImgSrc]);

  // Enlace directo al producto específico en Amazon España
  const directProductUrl = getAmazonProductUrl(product.asin || 'B0DLWK3LKH');

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

  return (
    <article className="group flex flex-col rounded-xl overflow-hidden border border-slate-200/90 hover:border-amber-400 bg-white shadow-2xs hover:shadow-md hover:-translate-y-0.5 transition-all duration-200">
      {/* Product Image Viewport (Amazon / Banggood Compact Style) */}
      <div className="relative aspect-square overflow-hidden bg-white p-1.5 sm:p-2">
        <a 
          href={directProductUrl}
          target="_blank"
          rel="nofollow sponsored noopener noreferrer"
          aria-label={`Ver ${product.title} en Amazon`}
          className="block w-full h-full cursor-pointer relative"
        >
          {currentImgSrc && !hasImgError ? (
            <Image
              src={currentImgSrc}
              alt={`${product.title} - Foto ${activeImgIndex + 1}`}
              fill
              unoptimized={currentImgSrc.startsWith('http')}
              onError={() => setHasImgError(true)}
              sizes="(max-width: 640px) 50vw, (max-width: 1024px) 25vw, 16vw"
              className="object-contain p-1.5 transition-all duration-200 group-hover:scale-105"
            />
          ) : (
            <div className="w-full h-full bg-slate-50 flex flex-col items-center justify-center text-slate-400 p-2 text-center">
              <ShoppingBag className="w-6 h-6 mb-1 text-slate-400 opacity-60" />
              <span className="text-[10px] font-bold text-slate-600 line-clamp-1">
                {product.title}
              </span>
            </div>
          )}
        </a>

        {/* Multi-image navigation arrows */}
        {imagesList.length > 1 && (
          <>
            <button
              onClick={handlePrevImage}
              aria-label="Ver imagen anterior"
              className="absolute left-1 top-1/2 -translate-y-1/2 w-5 h-5 rounded-full bg-black/60 hover:bg-black/80 text-white flex items-center justify-center backdrop-blur-md opacity-0 group-hover:opacity-100 transition-opacity z-20 cursor-pointer shadow-xs"
            >
              <ChevronLeft className="w-3 h-3" />
            </button>
            <button
              onClick={handleNextImage}
              aria-label="Ver siguiente imagen"
              className="absolute right-1 top-1/2 -translate-y-1/2 w-5 h-5 rounded-full bg-black/60 hover:bg-black/80 text-white flex items-center justify-center backdrop-blur-md opacity-0 group-hover:opacity-100 transition-opacity z-20 cursor-pointer shadow-xs"
            >
              <ChevronRight className="w-3 h-3" />
            </button>
          </>
        )}
        
        {/* Top Badge */}
        {product.badge && (
          <div className="absolute top-1.5 left-1.5 z-10 pointer-events-none">
            <span className="px-1.5 py-0.5 rounded text-[9px] font-extrabold uppercase tracking-wider bg-amber-500 text-slate-950 shadow-2xs">
              {product.badge}
            </span>
          </div>
        )}

        {/* Action icons (Wishlist & Share) */}
        <div className="absolute top-1.5 right-1.5 flex items-center gap-1 z-10">
          <button
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              setIsLiked(!isLiked);
            }}
            aria-label="Guardar en favoritos"
            className="w-6 h-6 rounded-full bg-white/90 backdrop-blur-xs flex items-center justify-center text-slate-500 hover:text-rose-500 hover:scale-110 transition-transform shadow-2xs cursor-pointer border border-slate-100"
          >
            <Heart className={`w-3 h-3 ${isLiked ? 'fill-rose-500 text-rose-500' : ''}`} />
          </button>
          <button
            onClick={handleShare}
            aria-label="Compartir idea"
            className="w-6 h-6 rounded-full bg-white/90 backdrop-blur-xs flex items-center justify-center text-slate-500 hover:text-slate-950 hover:scale-110 transition-transform shadow-2xs cursor-pointer border border-slate-100"
          >
            <Share2 className="w-3 h-3" />
          </button>
        </div>
      </div>

      {/* Product Content */}
      <div className="p-2 sm:p-2.5 flex flex-col flex-1 justify-between bg-white border-t border-slate-100">
        <div>
          {/* Rating and Reviews */}
          <div className="flex items-center gap-1 mb-1 text-[11px]">
            <Star className="w-3 h-3 fill-amber-400 text-amber-400 shrink-0" />
            <span className="font-black text-slate-900">{product.rating}</span>
            <span className="text-[10px] text-slate-400 font-medium truncate">
              ({product.reviewsCount ? product.reviewsCount.toLocaleString() : '100+'})
            </span>
          </div>

          {/* H3 Title (2 lines) */}
          <h3 className="font-semibold text-xs leading-snug text-slate-800 line-clamp-2 group-hover:text-amber-800 transition-colors mb-1.5 min-h-[2rem]">
            <a
              href={directProductUrl}
              target="_blank"
              rel="nofollow sponsored noopener noreferrer"
              className="hover:underline"
            >
              {product.title}
            </a>
          </h3>
        </div>

        {/* Pricing & CTA Button */}
        <div className="pt-1.5 border-t border-slate-100">
          <div className="flex items-center justify-between gap-1 mb-1.5">
            <span className="text-sm sm:text-base font-black text-slate-950 tracking-tight">
              {formatPrice(product.priceText)}
            </span>
            <span className="text-[9px] font-bold text-amber-900 bg-amber-50 border border-amber-200 px-1 py-0.2 rounded">
              Prime
            </span>
          </div>

          {/* CTA Button */}
          <a
            href={directProductUrl}
            target="_blank"
            rel="nofollow sponsored noopener noreferrer"
            className="w-full py-1.5 px-2 rounded-lg text-[11px] font-bold flex items-center justify-center gap-1 bg-[#FF9900] hover:bg-[#ffad33] text-slate-950 shadow-2xs transition-all hover:scale-101 active:scale-99 cursor-pointer"
          >
            <ShoppingBag className="w-3 h-3" />
            <span>Ver en Amazon</span>
            <ExternalLink className="w-2.5 h-2.5 opacity-70" />
          </a>

          {/* Toast feedback when copied */}
          {copied && (
            <div className="text-center text-[9px] text-emerald-600 font-bold mt-0.5">
              ✓ ¡Enlace copiado!
            </div>
          )}
        </div>
      </div>
    </article>
  );
}
