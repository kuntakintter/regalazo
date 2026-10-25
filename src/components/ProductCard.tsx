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
    <article className="group flex flex-col rounded-2xl overflow-hidden border border-slate-200/90 hover:border-amber-400 bg-white shadow-xs hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
      {/* Product Image Viewport (Square, Compact & High-Converting) */}
      <div className="relative aspect-square overflow-hidden bg-white p-2">
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
              sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
              className="object-contain p-2 transition-all duration-300 group-hover:scale-105"
            />
          ) : (
            <div className="w-full h-full bg-gradient-to-br from-slate-100 to-slate-200 flex flex-col items-center justify-center text-slate-400 p-3 text-center">
              <ShoppingBag className="w-8 h-8 mb-1.5 text-slate-400 opacity-60" />
              <span className="text-[11px] font-bold text-slate-600 line-clamp-2 px-1">
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
              className="absolute left-1.5 top-1/2 -translate-y-1/2 w-6 h-6 rounded-full bg-black/60 hover:bg-black/80 text-white flex items-center justify-center backdrop-blur-md opacity-0 group-hover:opacity-100 transition-opacity z-20 cursor-pointer shadow-md"
            >
              <ChevronLeft className="w-3.5 h-3.5" />
            </button>
            <button
              onClick={handleNextImage}
              aria-label="Ver siguiente imagen"
              className="absolute right-1.5 top-1/2 -translate-y-1/2 w-6 h-6 rounded-full bg-black/60 hover:bg-black/80 text-white flex items-center justify-center backdrop-blur-md opacity-0 group-hover:opacity-100 transition-opacity z-20 cursor-pointer shadow-md"
            >
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </>
        )}
        
        {/* Top Badge */}
        <div className="absolute top-2 left-2 flex flex-col gap-1 z-10 pointer-events-none">
          {product.badge && (
            <span className="px-2 py-0.5 rounded-md text-[10px] font-black uppercase tracking-wider shadow-xs bg-amber-500 text-slate-950">
              {product.badge}
            </span>
          )}
        </div>

        {/* Action icons (Wishlist & Share) */}
        <div className="absolute top-2 right-2 flex items-center gap-1 z-10">
          <button
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              setIsLiked(!isLiked);
            }}
            aria-label="Guardar en favoritos"
            className="w-7 h-7 rounded-full bg-white/90 backdrop-blur-xs flex items-center justify-center text-slate-600 hover:text-rose-500 hover:scale-110 transition-transform shadow-xs cursor-pointer border border-slate-100"
          >
            <Heart className={`w-3.5 h-3.5 ${isLiked ? 'fill-rose-500 text-rose-500' : ''}`} />
          </button>
          <button
            onClick={handleShare}
            aria-label="Compartir idea"
            className="w-7 h-7 rounded-full bg-white/90 backdrop-blur-xs flex items-center justify-center text-slate-600 hover:text-slate-950 hover:scale-110 transition-transform shadow-xs cursor-pointer border border-slate-100"
          >
            <Share2 className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Multi-image dots */}
        {imagesList.length > 1 && (
          <div className="absolute bottom-2 left-1/2 -translate-x-1/2 z-10 flex items-center gap-1 bg-black/50 backdrop-blur-md px-1.5 py-0.5 rounded-full">
            {imagesList.map((_, idx) => (
              <span
                key={idx}
                className={`h-1 rounded-full transition-all ${
                  activeImgIndex === idx ? 'w-3 bg-white' : 'w-1 bg-white/50'
                }`}
              />
            ))}
          </div>
        )}
      </div>

      {/* Product Content */}
      <div className="p-3 sm:p-3.5 flex flex-col flex-1 justify-between bg-white border-t border-slate-100">
        <div>
          {/* Rating and Reviews */}
          <div className="flex items-center justify-between gap-1 mb-1.5">
            <div className="flex items-center gap-1 text-amber-500">
              <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
              <span className="text-xs font-black text-slate-900">{product.rating}</span>
              <span className="text-[10px] text-slate-400 font-medium">
                ({product.reviewsCount ? product.reviewsCount.toLocaleString() : '100+'})
              </span>
            </div>
            <span className="text-[10px] text-slate-400 font-medium truncate max-w-[90px]">
              {product.subcategory}
            </span>
          </div>

          {/* H3 Title */}
          <h3 className="font-bold text-xs sm:text-sm line-clamp-2 leading-snug text-slate-900 group-hover:text-amber-800 transition-colors mb-2 min-h-[2.4rem]">
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
        <div className="pt-2 border-t border-slate-100/80">
          <div className="flex items-baseline justify-between mb-2">
            <span className="text-base sm:text-lg font-black text-slate-950 tracking-tight">
              {formatPrice(product.priceText)}
            </span>
            <span className="text-[10px] font-bold text-amber-900 bg-amber-50 border border-amber-200 px-1.5 py-0.5 rounded">
              Amazon Prime
            </span>
          </div>

          {/* CTA Button */}
          <a
            href={directProductUrl}
            target="_blank"
            rel="nofollow sponsored noopener noreferrer"
            className="w-full py-2 px-3 rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 bg-[#FF9900] hover:bg-[#ffad33] text-slate-950 shadow-xs transition-all hover:scale-102 active:scale-98 cursor-pointer"
          >
            <ShoppingBag className="w-3.5 h-3.5" />
            <span>Ver en Amazon</span>
            <ExternalLink className="w-3 h-3 opacity-70" />
          </a>

          {/* Toast feedback when copied */}
          {copied && (
            <div className="text-center text-[10px] text-emerald-600 font-bold mt-1">
              ✓ ¡Enlace copiado!
            </div>
          )}
        </div>
      </div>
    </article>
  );
}
