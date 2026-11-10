'use client';

import React from 'react';
import { ExternalLink, ShoppingBag, Star, Loader2, ArrowDown } from 'lucide-react';
import { getAmazonSearchUrl } from '@/lib/amazon';
import { useActiveLocale } from '@/hooks/useActiveLocale';

interface AmazonGridDiscoveryCardProps {
  searchQuery?: string;
  selectedCategory?: string;
  selectedAge?: string;
  onLoadLiveToGrid?: () => void;
  isLoadingLive?: boolean;
  hasLoadedLive?: boolean;
}

export default function AmazonGridDiscoveryCard({
  searchQuery = '',
  selectedCategory = '',
  selectedAge = 'all',
  onLoadLiveToGrid,
  isLoadingLive = false,
  hasLoadedLive = false,
}: AmazonGridDiscoveryCardProps) {
  const { localeKey, amazonRegion, amazonSiteName, ui, tTerm } = useActiveLocale();

  const isEs = localeKey === 'es' || localeKey === 'es-us';
  let displayTitle = ui.amazonGridTitle;
  let searchTerm = isEs ? 'regalos recomendados' : 'best gift ideas';

  if (searchQuery.trim().length > 0) {
    displayTitle = searchQuery.trim();
    searchTerm = searchQuery.trim();
  } else if (selectedCategory && selectedCategory !== 'all') {
    displayTitle = tTerm(selectedCategory);
    searchTerm = isEs ? selectedCategory : tTerm(selectedCategory);
  } else if (selectedAge && selectedAge !== 'all') {
    displayTitle = ui.amazonGridTitle;
    searchTerm = isEs ? `regalos ${selectedAge}` : `gifts ${selectedAge}`;
  }

  const amazonSearchUrl = getAmazonSearchUrl(searchTerm, amazonRegion);

  return (
    <article className="group flex flex-col justify-between p-2.5 sm:p-3 rounded-2xl bg-gradient-to-b from-amber-50/70 via-white to-amber-50/30 border border-amber-300 hover:border-amber-400 shadow-xs hover:shadow-md transition-all duration-200 relative">
      {/* Visual Box - Matches product photo aspect ratio */}
      <button
        type="button"
        onClick={onLoadLiveToGrid || (() => window.open(amazonSearchUrl, '_blank', 'noopener,noreferrer'))}
        className="relative aspect-square w-full mb-2 bg-gradient-to-br from-amber-100/90 via-amber-50 to-orange-100/80 rounded-xl overflow-hidden p-2.5 flex flex-col items-center justify-center text-center border border-amber-200/90 group-hover:border-amber-300 transition-colors cursor-pointer select-none"
      >
        <span className="w-10 h-10 rounded-full bg-amber-500 text-slate-950 flex items-center justify-center shadow-xs mb-1.5 group-hover:scale-110 transition-transform">
          <ShoppingBag className="w-5 h-5" />
        </span>
        <span className="text-[10px] font-black uppercase tracking-wider text-amber-900 bg-amber-200/80 px-2 py-0.5 rounded-full mb-1">
          {ui.liveBadge}
        </span>{' '}
        <span className="text-[11px] font-extrabold text-slate-800 line-clamp-1 px-1">
          +50,000
        </span>{' '}
        <span className="text-[9px] text-amber-900 font-semibold mt-0.5">
          {amazonSiteName}
        </span>
        <span className="sr-only"> — {displayTitle}</span>
      </button>

      {/* Content Viewport */}
      <div className="flex flex-col flex-1 justify-between">
        <div>
          <div className="mb-1">
            <span className="text-[11px] text-amber-800 font-semibold truncate block">
              {ui.amazonStoreBadge}
            </span>
          </div>

          <p className="font-bold text-xs sm:text-[13px] leading-snug text-slate-900 line-clamp-2 group-hover:text-amber-800 transition-colors mb-1 min-h-[2rem]">
            {displayTitle}
          </p>

          <div className="flex items-center gap-1 text-[11px] mb-1.5">
            <div className="flex items-center text-amber-500" aria-hidden="true">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-3 h-3 fill-amber-400 text-amber-400" />
              ))}
            </div>
            <span className="font-bold text-slate-800 text-xs">4.9</span>
            <span className="text-[#007185] font-semibold text-[10px]">({ui.badgeTop})</span>
          </div>
        </div>

        <div>
          <div className="flex items-baseline gap-1.5 mb-0.5">
            <span className="text-xs sm:text-sm font-black text-slate-950 tracking-tight line-clamp-1">
              {ui.searchLivePrices}
            </span>
          </div>

          <div className="flex items-center gap-1 text-[10px] sm:text-[11px] text-slate-600 font-normal mb-2">
            <span className="text-[#007185] font-black text-xs">✓ Prime</span>
            <span className="truncate">{ui.freeShippingPrime}</span>
          </div>

          {onLoadLiveToGrid ? (
            <button
              type="button"
              onClick={onLoadLiveToGrid}
              disabled={isLoadingLive}
              className="w-full py-1.5 px-3 rounded-full text-xs font-semibold text-slate-950 bg-[#ffd814] hover:bg-[#f7ca00] active:bg-[#f0b800] border border-[#fcd200] shadow-2xs text-center flex items-center justify-center gap-1.5 transition-all cursor-pointer disabled:opacity-75"
            >
              {isLoadingLive ? (
                <>
                  <Loader2 className="w-3 h-3 animate-spin text-slate-950" />
                  <span>{ui.loadingLiveTitle}</span>
                </>
              ) : (
                <>
                  <span>{hasLoadedLive ? ui.amazonGridBtn : ui.liveSearchBtn}</span>
                  <ArrowDown className="w-3 h-3 text-slate-950" />
                </>
              )}
            </button>
          ) : (
            <a
              href={amazonSearchUrl}
              target="_blank"
              rel="noopener noreferrer sponsored"
              className="w-full py-1.5 px-3 rounded-full text-xs font-semibold text-slate-950 bg-[#ffd814] hover:bg-[#f7ca00] active:bg-[#f0b800] border border-[#fcd200] shadow-2xs text-center flex items-center justify-center gap-1.5 transition-all cursor-pointer"
            >
              <span>{ui.viewOnAmazon}</span>
              <ExternalLink className="w-3 h-3 text-slate-950" />
            </a>
          )}
        </div>
      </div>
    </article>
  );
}
