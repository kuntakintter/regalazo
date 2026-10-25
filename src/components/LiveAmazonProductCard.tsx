'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { Star, Heart, Share2, ShoppingBag } from 'lucide-react';
import { LiveSearchResult } from '@/app/api/live-search/route';
import { getAmazonProductUrl } from '@/lib/amazon';
import { useCurrency } from '@/context/CurrencyContext';
import { useVoting } from '@/context/VotingContext';
import { Product } from '@/data/products';

interface LiveAmazonProductCardProps {
  product: LiveSearchResult;
  categoryLabel?: string;
  badgeLabel?: string;
}

export default function LiveAmazonProductCard({
  product,
  categoryLabel = 'Amazon España',
  badgeLabel = 'Oferta flash',
}: LiveAmazonProductCardProps) {
  const { formatPrice } = useCurrency();
  const { toggleItem, isItemInList } = useVoting();
  const isInVote = isItemInList(product.asin);
  const [copied, setCopied] = useState(false);
  const [hasImgError, setHasImgError] = useState(false);

  const handleToggleVote = () => {
    const adapted: Product = {
      id: product.asin,
      slug: product.asin.toLowerCase(),
      title: product.title,
      priceText: product.priceText,
      priceRange: '20-50',
      rating: product.rating || 4.5,
      reviewsCount: product.reviewsCount || 100,
      badge: badgeLabel,
      category: categoryLabel,
      subcategory: categoryLabel,
      imageUrl: product.imageUrl || '',
      description: product.title,
      pros: [],
      idealFor: '',
      searchQuery: product.title,
      gender: 'unisex',
      ageRange: '+18',
      style: 'classic',
      asin: product.asin,
    };
    toggleItem(adapted);
  };

  React.useEffect(() => {
    setHasImgError(false);
  }, [product.imageUrl]);

  // Direct product URL with affiliate tag
  const directProductUrl = product.asin
    ? getAmazonProductUrl(product.asin)
    : product.url;

  const handleShare = async (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
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
    <article className="group flex flex-col justify-between p-2.5 sm:p-3 rounded-2xl bg-white border border-slate-300 hover:border-slate-400 shadow-xs hover:shadow-md transition-all duration-200 relative">
      {/* Product Image Viewport */}
      <div className="relative aspect-square w-full mb-2 bg-slate-50/80 rounded-xl overflow-hidden p-2 flex items-center justify-center border border-slate-100">
        <a
          href={directProductUrl}
          target="_blank"
          rel="nofollow sponsored noopener noreferrer"
          aria-label={`Ver ${product.title} en Amazon`}
          className="block w-full h-full cursor-pointer relative"
        >
          {product.imageUrl && !hasImgError ? (
            <Image
              src={product.imageUrl}
              alt={product.title}
              fill
              unoptimized
              onError={() => setHasImgError(true)}
              sizes="(max-width: 640px) 50vw, (max-width: 1024px) 25vw, 16vw"
              className="object-contain p-1 transition-transform duration-200 group-hover:scale-105"
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

        {/* Action icons (Wishlist & Share) */}
        <div className="absolute top-1.5 right-1.5 flex items-center gap-1 z-10">
          <button
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              handleToggleVote();
            }}
            aria-label={isInVote ? 'Quitar de la lista de votación' : 'Añadir a la lista de votación'}
            title={isInVote ? 'En tu lista de votación en grupo' : 'Añadir a votación en grupo'}
            className={`w-6 h-6 rounded-full backdrop-blur-xs flex items-center justify-center transition-transform shadow-2xs cursor-pointer border ${
              isInVote
                ? 'bg-rose-50 border-rose-200 text-rose-500 scale-110'
                : 'bg-white/90 border-slate-100 text-slate-400 hover:text-rose-500 hover:scale-110'
            }`}
          >
            <Heart className={`w-3.5 h-3.5 ${isInVote ? 'fill-rose-500 text-rose-500' : ''}`} />
          </button>
          <button
            onClick={handleShare}
            aria-label="Compartir idea"
            className="w-6 h-6 rounded-full bg-white/90 backdrop-blur-xs flex items-center justify-center text-slate-400 hover:text-slate-950 hover:scale-110 transition-transform shadow-2xs cursor-pointer border border-slate-100"
          >
            <Share2 className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Product Content */}
      <div className="flex flex-col flex-1 justify-between">
        <div>
          {/* Subcategory Label */}
          {categoryLabel && (
            <div className="mb-1">
              <span className="text-[11px] text-slate-500 font-medium truncate block">
                {categoryLabel}
              </span>
            </div>
          )}

          {/* Title */}
          <h3 className="font-medium text-xs sm:text-[13px] leading-snug text-slate-900 line-clamp-2 group-hover:text-[#c45500] transition-colors mb-1 min-h-[2rem]">
            <a
              href={directProductUrl}
              target="_blank"
              rel="nofollow sponsored noopener noreferrer"
              className="hover:underline"
            >
              {product.title}
            </a>
          </h3>

          {/* Rating and Reviews */}
          <div className="flex items-center gap-1 text-[11px] mb-1.5">
            <div className="flex items-center text-amber-500">
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
            <span className="font-bold text-slate-900 text-xs ml-0.5">{product.rating}</span>
            <span className="text-[#007185] hover:underline font-medium text-[11px]">
              ({(product.reviewsCount || 180).toLocaleString()})
            </span>
          </div>
        </div>

        {/* Pricing, Prime & Amazon Official Yellow Pill Button */}
        <div className="pt-1 mt-auto">
          {/* Price */}
          <div className="flex items-baseline gap-1 mb-0.5">
            <span className="text-base sm:text-lg font-black text-slate-950 tracking-tight">
              {formatPrice(product.priceText)}
            </span>
          </div>

          {/* Prime delivery line */}
          <div className="flex items-center gap-1 text-[10px] sm:text-[11px] text-slate-600 font-normal mb-2">
            <span className="text-[#007185] font-black text-xs">✓prime</span>
            <span>Entrega <strong className="text-slate-800 font-bold">Mañana</strong></span>
          </div>

          {/* Amazon Yellow Button */}
          <a
            href={directProductUrl}
            target="_blank"
            rel="nofollow sponsored noopener noreferrer"
            className="w-full py-1.5 px-3 rounded-full text-xs font-semibold text-slate-950 bg-[#ffd814] hover:bg-[#f7ca00] active:bg-[#f0b800] border border-[#fcd200] shadow-2xs text-center flex items-center justify-center gap-1.5 transition-all cursor-pointer"
          >
            <span>Ir al producto</span>
          </a>

          {/* Toast feedback when copied */}
          {copied && (
            <div className="text-center text-[9px] text-emerald-600 font-bold mt-1">
              ✓ ¡Enlace copiado!
            </div>
          )}
        </div>
      </div>
    </article>
  );
}
