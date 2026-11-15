'use client';

import React, { useState, useEffect, useMemo, useRef } from 'react';
import Image from 'next/image';
import { getAmazonSearchUrl } from '@/lib/amazon';
import { useActiveLocale } from '@/hooks/useActiveLocale';
import { ALL_SITE_PRODUCTS } from '@/data/allCatalogProducts';
import { matchesSearchQuery } from '@/utils/search';
import { Search, ExternalLink, ShoppingCart, Star, ShoppingBag, ArrowRight, Loader2, X } from 'lucide-react';
import { AmazonLiveItem } from '@/components/HeaderMobile';

interface AmazonLiveSearchCardProps {
  currentTheme: string;
  initialQuery?: string;
  selectedPrice?: string;
}

export default function AmazonLiveSearchCard({
  currentTheme,
  initialQuery = '',
  selectedPrice = 'all',
}: AmazonLiveSearchCardProps) {
  const { localeKey, amazonRegion, amazonSiteName, activeCurrency, formatPrice, ui } = useActiveLocale();
  const [customTerm, setCustomTerm] = useState(initialQuery);
  const [activeBudget, setActiveBudget] = useState(selectedPrice);
  const [isFocused, setIsFocused] = useState(false);
  const [amazonResults, setAmazonResults] = useState<AmazonLiveItem[]>([]);
  const [isLoadingAmazon, setIsLoadingAmazon] = useState(false);
  const cardSearchRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (cardSearchRef.current && !cardSearchRef.current.contains(event.target as Node)) {
        setIsFocused(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  React.useEffect(() => {
    if (initialQuery) {
      setCustomTerm(initialQuery);
    }
  }, [initialQuery]);

  const liveMatches = useMemo(() => {
    const q = customTerm.trim();
    if (q.length < 2) return [];
    return ALL_SITE_PRODUCTS.filter((p) => matchesSearchQuery(p, q)).slice(0, 5);
  }, [customTerm]);

  useEffect(() => {
    const q = customTerm.trim();
    if (q.length < 2) {
      setAmazonResults([]);
      setIsLoadingAmazon(false);
      return;
    }

    setIsLoadingAmazon(true);
    const controller = new AbortController();
    const timer = setTimeout(async () => {
      try {
        const res = await fetch(
          `/api/live-search?q=${encodeURIComponent(q)}&region=${amazonRegion}`,
          { signal: controller.signal }
        );
        const data = await res.json();
        if (data.success && Array.isArray(data.results)) {
          setAmazonResults(data.results);
        } else {
          setAmazonResults([]);
        }
      } catch (err: unknown) {
        if ((err as { name?: string })?.name !== 'AbortError') {
          setAmazonResults([]);
        }
      } finally {
        setIsLoadingAmazon(false);
      }
    }, 320);

    return () => {
      clearTimeout(timer);
      controller.abort();
    };
  }, [customTerm, amazonRegion]);

  const isEs = localeKey === 'es' || localeKey === 'es-us';
  const queryToSearch =
    customTerm.trim() ||
    initialQuery.trim() ||
    (isEs ? 'regalos originales ninos jovenes' : 'best original gift ideas');

  const budgetKeyword =
    amazonRegion === 'intl'
      ? activeBudget === '<20'
        ? 'under 20 dollars'
        : activeBudget === '20-50'
        ? '20 to 50 dollars'
        : activeBudget === '50-100'
        ? '50 to 100 dollars'
        : 'over 100 dollars'
      : activeBudget === '<20'
      ? 'menos de 20 euros'
      : activeBudget === '20-50'
      ? '20 a 50 euros'
      : activeBudget === '50-100'
      ? '50 a 100 euros'
      : 'mas de 100 euros';

  const amazonSearchUrl = getAmazonSearchUrl(
    activeBudget !== 'all' ? `${queryToSearch} ${budgetKeyword}` : queryToSearch,
    amazonRegion
  );

  const isDark = currentTheme === 'emo' || currentTheme === 'gamer';

  return (
    <div
      className={`rounded-3xl p-6 sm:p-8 mb-10 border transition-all shadow-md relative ${
        currentTheme === 'emo'
          ? 'bg-gradient-to-br from-neutral-900 via-neutral-950 to-neutral-900 border-neutral-800 text-neutral-100 shadow-rose-950/20'
          : currentTheme === 'gamer'
          ? 'bg-gradient-to-br from-slate-900 via-indigo-950 to-slate-900 border-purple-900/60 text-slate-100 shadow-purple-950/20'
          : currentTheme === 'baby'
          ? 'bg-gradient-to-br from-white via-pink-50/40 to-amber-50/30 border-rose-200 text-rose-950 shadow-rose-100/40'
          : 'bg-gradient-to-br from-white via-slate-50 to-indigo-50/30 border-slate-200 text-slate-900 shadow-slate-100'
      }`}
    >
      <div className="max-w-3xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6 relative z-10">
        {/* Left: Persuasive Text */}
        <div className="flex-1 text-center md:text-left">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-black bg-amber-400 text-slate-950 shadow-xs mb-3 border border-amber-500/20">
            <ShoppingCart className="w-3.5 h-3.5" />
            <span>
              {ui.amazonStoreBadge} · {amazonSiteName}
            </span>
          </div>

          <h2
            className={`text-lg sm:text-2xl font-black tracking-tight leading-snug mb-1.5 ${
              isDark ? 'text-white' : 'text-slate-900'
            }`}
          >
            {customTerm ? (
              <span>
                {ui.liveResultsTitle}{' '}
                <span className={isDark ? 'text-amber-300' : 'text-amber-800'}>
                  &quot;{customTerm}&quot;
                </span>
              </span>
            ) : (
              <span>{ui.amazonLiveTitle}</span>
            )}
          </h2>

          <p
            className={`text-xs sm:text-sm leading-relaxed max-w-xl ${
              isDark ? 'text-slate-300' : 'text-slate-600'
            }`}
          >
            {ui.amazonLiveSubtitle}
          </p>

          {/* Quick budget pills */}
          <div className="flex flex-wrap items-center justify-center md:justify-start gap-1.5 mt-3">
            <span className={`text-[11px] font-bold ${isDark ? 'text-slate-300' : 'text-slate-600'}`}>
              {ui.maxBudgetLabel}:
            </span>
            {[
              { id: 'all', label: ui.ageAllShort },
              { id: '<20', label: activeCurrency === 'USD' ? '< $20' : '< 20 €' },
              { id: '20-50', label: activeCurrency === 'USD' ? '$20–$50' : '20–50 €' },
              { id: '50-100', label: activeCurrency === 'USD' ? '$50–$100' : '50–100 €' },
              { id: '>100', label: activeCurrency === 'USD' ? '> $100' : '> 100 €' },
            ].map((b) => (
              <button
                key={b.id}
                type="button"
                onClick={() => setActiveBudget(b.id)}
                className={`px-2.5 py-1 min-h-7 rounded-lg text-[11px] font-bold transition-all border cursor-pointer ${
                  activeBudget === b.id
                    ? 'bg-amber-400 text-slate-950 border-amber-500 shadow-xs'
                    : isDark
                    ? 'bg-slate-800/80 border-slate-700 text-slate-200 hover:bg-slate-700'
                    : 'bg-white border-slate-200 text-slate-700 hover:bg-slate-100'
                }`}
              >
                {b.label}
              </button>
            ))}
          </div>
        </div>

        {/* Right: Interactive Search Box & Affiliate CTA Button */}
        <div ref={cardSearchRef} className="w-full md:w-80 flex flex-col gap-2.5 shrink-0 relative z-40">
          <div className="relative flex items-center">
            <input
              type="text"
              value={customTerm}
              onFocus={() => setIsFocused(true)}
              onChange={(e) => {
                setCustomTerm(e.target.value);
                setIsFocused(true);
              }}
              aria-label={ui.amazonLivePlaceholder}
              placeholder={ui.amazonLivePlaceholder}
              className={`w-full py-2.5 pl-9 pr-16 rounded-xl text-xs sm:text-sm border outline-none font-medium transition-colors ${
                isDark
                  ? 'bg-neutral-800 border-neutral-700 text-white placeholder-neutral-400 focus:border-[#FF9900]'
                  : 'bg-white border-slate-300 text-slate-900 placeholder-slate-500 focus:border-[#FF9900]'
              }`}
            />
            <Search className="w-4 h-4 text-slate-500 absolute left-3 top-3 pointer-events-none" />
            <div className="absolute right-2 flex items-center gap-1">
              {isLoadingAmazon && (
                <Loader2 className="w-3.5 h-3.5 text-slate-500 animate-spin" />
              )}
              {customTerm.trim().length > 0 && (
                <button
                  type="button"
                  onClick={() => {
                    setCustomTerm('');
                    setAmazonResults([]);
                    setIsFocused(false);
                  }}
                  aria-label={ui.headerClearSearch}
                  className="p-1 rounded-full text-slate-500 hover:text-slate-800 cursor-pointer"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              )}
            </div>
          </div>

          {isFocused && customTerm.trim().length >= 2 && (
            <div className="absolute top-12 left-0 right-0 bg-white text-slate-900 rounded-2xl shadow-2xl border border-slate-200 overflow-hidden z-[80] max-h-[65vh] overflow-y-auto text-left">
              {liveMatches.length > 0 && (
                <div>
                  <div className="p-2.5 bg-slate-50 border-b border-slate-100 flex items-center justify-between text-[11px] font-bold text-slate-700 uppercase tracking-wider">
                    <span>{ui.searchRecommendedCatalog}</span>
                    <span className="text-indigo-700">{liveMatches.length} {ui.productsUnit}</span>
                  </div>

                  <div className="divide-y divide-slate-100">
                    {liveMatches.map((product) => (
                      <button
                        key={product.id}
                        type="button"
                        onClick={() => {
                          setIsFocused(false);
                          window.dispatchEvent(new CustomEvent('site-search', { detail: product.title }));
                          const target = document.getElementById('catalogo-productos');
                          if (target) target.scrollIntoView({ behavior: 'smooth' });
                        }}
                        className="w-full text-left p-3 hover:bg-indigo-50/60 transition-colors flex items-center gap-2.5 cursor-pointer"
                      >
                        <span className="relative block w-11 h-11 rounded-lg bg-slate-50 shrink-0 overflow-hidden border border-slate-200">
                          <Image
                            src={product.imageUrl}
                            alt={product.title}
                            fill
                            sizes="44px"
                            className="object-contain p-1"
                          />
                        </span>
                        <span className="block flex-1 min-w-0">
                          <span className="block text-xs font-bold text-slate-900 truncate">
                            {product.title}
                          </span>
                          <span className="flex items-center gap-2 mt-0.5">
                            <span className="text-xs font-black text-indigo-700">{formatPrice(product.priceText)}</span>
                            <span className="text-[10px] text-slate-600 flex items-center gap-0.5">
                              <Star className="w-3 h-3 text-amber-500 fill-amber-400" />
                              {product.rating}
                            </span>
                          </span>
                        </span>
                        <ArrowRight className="w-4 h-4 text-slate-500 shrink-0" />
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {amazonResults.length > 0 && (
                <div className={liveMatches.length > 0 ? 'border-t-2 border-slate-100' : ''}>
                  <div className="p-2.5 bg-gradient-to-r from-amber-50/80 to-orange-50/50 border-b border-amber-100 flex items-center justify-between text-[11px] font-bold text-amber-900 uppercase tracking-wider">
                    <div className="flex items-center gap-1.5">
                      <ShoppingBag className="w-3.5 h-3.5 text-amber-700" />
                      <span>{ui.searchLiveFrom} {amazonSiteName}</span>
                    </div>
                    <span className="text-[9px] bg-amber-200 text-amber-950 px-1.5 py-0.5 rounded-full font-black">
                      {ui.searchLivePrices}
                    </span>
                  </div>

                  <div className="divide-y divide-slate-100">
                    {amazonResults.map((item) => (
                      <a
                        key={item.asin}
                        href={item.url}
                        target="_blank"
                        rel="noopener noreferrer sponsored"
                        onClick={() => setIsFocused(false)}
                        className="p-3 hover:bg-amber-50/50 transition-colors flex items-center gap-2.5 cursor-pointer"
                      >
                        <div className="relative w-11 h-11 rounded-lg bg-white shrink-0 overflow-hidden border border-slate-200 shadow-2xs">
                          {item.imageUrl ? (
                            <Image
                              src={item.imageUrl}
                              alt={item.title}
                              fill
                              sizes="44px"
                              unoptimized
                              className="object-contain p-1"
                            />
                          ) : (
                            <div className="w-full h-full flex items-center justify-center bg-slate-100 text-slate-500">
                              <ShoppingBag className="w-4 h-4" />
                            </div>
                          )}
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-xs font-bold text-slate-900 line-clamp-1">
                            {item.title}
                          </p>
                          <div className="flex items-center gap-2 mt-0.5">
                            <span className="text-xs font-black text-amber-800">{formatPrice(item.priceText)}</span>
                            <span className="text-[10px] px-1.5 py-0.5 rounded bg-emerald-50 text-emerald-800 font-bold border border-emerald-200/60">
                              Prime
                            </span>
                          </div>
                        </div>
                        <div className="flex items-center gap-1 px-2 py-1 rounded-lg bg-amber-100 text-amber-950 text-[11px] font-bold shrink-0">
                          <span>{ui.searchBuyBtn}</span>
                          <ExternalLink className="w-3 h-3" />
                        </div>
                      </a>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}

          <a
            href={amazonSearchUrl}
            target="_blank"
            rel="nofollow sponsored noopener noreferrer"
            className="w-full py-3 px-4 rounded-xl font-bold text-xs sm:text-sm bg-[#FF9900] hover:bg-[#ffad33] text-slate-950 shadow-md shadow-amber-500/20 flex items-center justify-center gap-2 transition-transform hover:scale-[1.02] active:scale-[0.98]"
          >
            <span>
              {ui.amazonLiveButton} · {amazonSiteName}
            </span>
            <ExternalLink className="w-4 h-4" />
          </a>

          <div className={`text-[10px] text-center font-medium ${isDark ? 'text-slate-300' : 'text-slate-600'}`}>
            ✓ {ui.trustGuarantee} · {amazonSiteName}
          </div>
        </div>
      </div>
    </div>
  );
}
