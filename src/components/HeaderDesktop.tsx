'use client';

import React, { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Search, X, ExternalLink, ArrowRight, Star, Loader2, ShoppingBag, ChevronDown } from 'lucide-react';
import BrandLogo from '@/components/BrandLogo';
import LanguageSelector from '@/components/LanguageSelector';
import VotingOnboardingTooltip from '@/components/VotingOnboardingTooltip';
import { useVoting } from '@/context/VotingContext';
import { Product } from '@/data/products';
import { getAmazonSearchUrl } from '@/lib/amazon';
import { AmazonLiveItem, AGE_DROPDOWN_ITEMS, PASSION_DROPDOWN_ITEMS } from '@/components/HeaderMobile';
import { useActiveLocale } from '@/hooks/useActiveLocale';

interface HeaderDesktopProps {
  searchQuery: string;
  onSearchChange?: (query: string) => void;
  onSearchSubmit: (e: React.FormEvent) => void;
  onSelectProduct?: (product: Product) => void;
  clearSearch: () => void;
  isFocused: boolean;
  setIsFocused: (focused: boolean) => void;
  liveMatches: Product[];
  amazonResults: AmazonLiveItem[];
  isLoadingAmazon: boolean;
}

export default function HeaderDesktop({
  searchQuery,
  onSearchChange,
  onSearchSubmit,
  onSelectProduct,
  clearSearch,
  isFocused,
  setIsFocused,
  liveMatches,
  amazonResults,
  isLoadingAmazon,
}: HeaderDesktopProps) {
  const { localeKey, ui, amazonRegion, amazonSiteName, formatPrice, localePath, tTerm } = useActiveLocale();
  const { voteItems, setIsDrawerOpen } = useVoting();
  const [isAgesOpen, setIsAgesOpen] = useState(false);
  const [isPassionsOpen, setIsPassionsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const agesDropdownRef = useRef<HTMLDivElement>(null);
  const passionsDropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsFocused(false);
      }
      if (agesDropdownRef.current && !agesDropdownRef.current.contains(event.target as Node)) {
        setIsAgesOpen(false);
      }
      if (passionsDropdownRef.current && !passionsDropdownRef.current.contains(event.target as Node)) {
        setIsPassionsOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [setIsFocused]);

  const defaultQuery = localeKey === 'es' || localeKey === 'es-us' ? 'regalos' : 'gifts';
  const amazonSearchUrl = getAmazonSearchUrl(searchQuery.trim() || defaultQuery, amazonRegion);

  const hasAnyResults = liveMatches.length > 0 || amazonResults.length > 0;

  return (
    <div className="w-full select-none">
      {/* 1. AMAZON-STYLE MAIN HEADER BAR (DEEP NAVY) */}
      <div className="bg-[#131921] text-white py-2">
        <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between gap-4 lg:gap-8">
            <BrandLogo variant="light" />

            {/* Quick Search Bar with Live Amazon Integration */}
            <div ref={dropdownRef} className="flex-1 max-w-2xl relative mx-2 lg:mx-4">
              <form
                onSubmit={onSearchSubmit}
                className="relative flex items-center rounded-xl overflow-hidden shadow-inner focus-within:ring-2 focus-within:ring-[#febd69] transition-all bg-white border border-slate-200"
              >
                <Search className="w-4 h-4 text-slate-600 ml-3.5 shrink-0" />

                <input
                  type="text"
                  value={searchQuery}
                  onFocus={() => setIsFocused(true)}
                  onChange={(e) => {
                    onSearchChange?.(e.target.value);
                    setIsFocused(true);
                  }}
                  aria-label={ui.headerSearchPlaceholder}
                  placeholder={ui.headerSearchPlaceholder}
                  className="w-full px-3 py-2 text-sm text-slate-900 placeholder-slate-600 focus:outline-none bg-transparent"
                />

                <div className="flex items-center shrink-0">
                  {isLoadingAmazon && (
                    <Loader2 className="w-4 h-4 text-slate-600 animate-spin mr-2" />
                  )}
                  {searchQuery.trim().length > 0 && (
                    <button
                      type="button"
                      onClick={clearSearch}
                      aria-label={ui.headerClearSearch}
                      className="min-w-7 min-h-7 flex items-center justify-center p-1 mr-1 rounded-full text-slate-600 hover:text-slate-900 hover:bg-slate-200 transition-colors cursor-pointer"
                      title={ui.headerClearSearch}
                    >
                      <X className="w-4 h-4" />
                    </button>
                  )}
                  <button
                    type="submit"
                    aria-label={ui.headerSearchButton}
                    className="bg-[#febd69] hover:bg-[#f3a847] active:bg-[#e47911] text-slate-950 px-5 py-2.5 flex items-center justify-center transition-colors cursor-pointer"
                  >
                    <Search className="w-4 h-4 stroke-[2.5]" />
                  </button>
                </div>
              </form>

              {/* LIVE AUTOCOMPLETE DROPDOWN */}
              {isFocused && searchQuery.trim().length >= 2 && (
                <div className="absolute top-full left-0 right-0 mt-2 bg-white rounded-2xl shadow-2xl border border-slate-200 overflow-hidden z-50 animate-in fade-in slide-in-from-top-2 duration-150 max-h-[80vh] overflow-y-auto">
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
                              if (onSelectProduct) {
                                onSelectProduct(product);
                              } else {
                                setIsFocused(false);
                                const target = document.getElementById('catalogo-productos');
                                if (target) target.scrollIntoView({ behavior: 'smooth' });
                              }
                            }}
                            className="w-full text-left p-3 hover:bg-indigo-50/60 transition-colors flex items-center gap-3 cursor-pointer group"
                          >
                            <span className="relative block w-12 h-12 rounded-lg bg-slate-50 shrink-0 overflow-hidden border border-slate-200">
                              <Image
                                src={product.imageUrl}
                                alt={product.title}
                                fill
                                sizes="48px"
                                className="object-contain p-1 group-hover:scale-105 transition-transform"
                              />
                            </span>
                            <span className="block flex-1 min-w-0">
                              <span className="block text-xs font-bold text-slate-900 truncate group-hover:text-indigo-700">
                                {product.title}
                              </span>
                              <span className="flex items-center gap-2 mt-0.5">
                                <span className="text-xs font-black text-indigo-700">{formatPrice(product.priceText)}</span>
                                <span className="text-[11px] text-slate-600 flex items-center gap-0.5">
                                  <Star className="w-3 h-3 text-amber-500 fill-amber-400" />
                                  {product.rating}
                                </span>
                                <span className="text-[10px] px-1.5 py-0.5 rounded bg-slate-100 text-slate-700 font-medium truncate">
                                  {tTerm(product.subcategory || product.category)}
                                </span>
                              </span>
                            </span>
                            <ArrowRight className="w-4 h-4 text-slate-500 group-hover:text-indigo-700 group-hover:translate-x-0.5 transition-all shrink-0" />
                          </button>
                        ))}
                      </div>
                    </div>
                  )}

                  {amazonResults.length > 0 && (
                    <div className={liveMatches.length > 0 ? 'border-t-2 border-slate-100' : ''}>
                      <div className="p-2.5 bg-gradient-to-r from-amber-50/80 to-orange-50/50 border-b border-amber-100 flex items-center justify-between text-[11px] font-bold text-amber-950 uppercase tracking-wider">
                        <div className="flex items-center gap-1.5">
                          <ShoppingBag className="w-3.5 h-3.5 text-amber-700" />
                          <span>{ui.searchLiveFrom} {amazonSiteName}</span>
                        </div>
                        <span className="text-[10px] bg-amber-200 text-amber-950 px-2 py-0.5 rounded-full font-black">
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
                            className="p-3 hover:bg-amber-50/50 transition-colors flex items-center gap-3 cursor-pointer group"
                          >
                            <div className="relative w-12 h-12 rounded-lg bg-white shrink-0 overflow-hidden border border-slate-200 shadow-2xs">
                              {item.imageUrl ? (
                                <Image
                                  src={item.imageUrl}
                                  alt={item.title}
                                  fill
                                  sizes="48px"
                                  unoptimized
                                  className="object-contain p-1 group-hover:scale-105 transition-transform"
                                />
                              ) : (
                                <div className="w-full h-full flex items-center justify-center bg-slate-100 text-slate-500">
                                  <ShoppingBag className="w-5 h-5" />
                                </div>
                              )}
                            </div>
                            <div className="flex-1 min-w-0">
                              <p className="text-xs font-bold text-slate-900 line-clamp-1 group-hover:text-amber-800">
                                {item.title}
                              </p>
                              <div className="flex items-center gap-2 mt-0.5">
                                <span className="text-xs font-black text-amber-800">{formatPrice(item.priceText)}</span>
                                <span className="text-[11px] text-slate-600 flex items-center gap-0.5">
                                  <Star className="w-3 h-3 text-amber-500 fill-amber-400" />
                                  {item.rating}
                                </span>
                                <span className="text-[10px] px-1.5 py-0.5 rounded bg-emerald-50 text-emerald-800 font-bold border border-emerald-200/60">
                                  Prime &bull; Amazon
                                </span>
                              </div>
                            </div>
                            <div className="flex items-center gap-1 px-2 py-1 rounded-lg bg-amber-50 text-amber-900 text-[11px] font-bold shrink-0 group-hover:bg-amber-600 group-hover:text-white transition-colors">
                              <span>{ui.searchBuyBtn}</span>
                              <ExternalLink className="w-3 h-3" />
                            </div>
                          </a>
                        ))}
                      </div>
                    </div>
                  )}

                  {isLoadingAmazon && amazonResults.length === 0 && (
                    <div className="p-4 text-center text-xs text-slate-600 flex items-center justify-center gap-2">
                      <Loader2 className="w-4 h-4 text-indigo-600 animate-spin" />
                      <span>{ui.searchLoadingAmazon}</span>
                    </div>
                  )}

                  {!hasAnyResults && !isLoadingAmazon && (
                    <div className="p-5 text-center bg-gradient-to-b from-white to-amber-50/40">
                      <p className="text-xs text-slate-700 mb-3">
                        {ui.searchNoLocalMatches}
                      </p>
                      <a
                        href={amazonSearchUrl}
                        target="_blank"
                        rel="noopener noreferrer sponsored"
                        className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-slate-950 font-black text-xs transition-transform hover:scale-102 shadow-md cursor-pointer"
                      >
                        <span>{ui.searchDirectOn} {amazonSiteName}</span>
                        <ExternalLink className="w-4 h-4" />
                      </a>
                    </div>
                  )}

                  {hasAnyResults && (
                    <div className="p-2.5 bg-slate-50 border-t border-slate-100 flex gap-2">
                      {liveMatches.length > 0 && (
                        <button
                          type="button"
                          onClick={onSearchSubmit}
                          className="flex-1 text-center py-2 px-3 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold transition-colors cursor-pointer"
                        >
                          {ui.searchRecommendedCatalog} ({liveMatches.length})
                        </button>
                      )}
                      <a
                        href={amazonSearchUrl}
                        target="_blank"
                        rel="noopener noreferrer sponsored"
                        className="flex-1 flex items-center justify-center gap-1.5 py-2 px-3 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-slate-950 text-xs font-black transition-colors shadow-xs"
                      >
                        <span>{ui.searchDirectOn} {amazonSiteName}</span>
                        <ExternalLink className="w-3.5 h-3.5" />
                      </a>
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* Right Actions: Group Voting Button & Language Selector */}
            <div className="flex items-center gap-3 shrink-0">
              <div className="relative">
                <button
                  type="button"
                  onClick={() => setIsDrawerOpen(true)}
                  className="flex items-center gap-2.5 px-5 h-11 rounded-xl bg-[#febd69] hover:bg-[#f3a847] active:bg-[#e47911] text-slate-950 font-black transition-all duration-150 shadow-sm hover:scale-102 active:scale-98 cursor-pointer shrink-0 border border-amber-400 group"
                  title={ui.navVoting}
                >
                  <span className="text-xl group-hover:scale-110 transition-transform leading-none" aria-hidden="true">🗳️</span>
                  <span className="text-sm font-extrabold text-slate-950 tracking-normal whitespace-nowrap">
                    {ui.navVoting}
                  </span>
                  {' '}
                  <span
                    className={`ml-1 px-2.5 py-0.5 rounded-full text-xs font-black leading-none transition-colors ${
                      voteItems.length > 0
                        ? 'bg-slate-950 text-white'
                        : 'bg-black/15 text-slate-900'
                    }`}
                  >
                    {voteItems.length}
                  </span>
                </button>

                <VotingOnboardingTooltip variant="desktop" />
              </div>

              <LanguageSelector dark={true} />
            </div>
          </div>
        </div>
      </div>

      {/* 2. SUB-NAV MENÚ DE ESCRITORIO */}
      <nav aria-label={ui.navMenu} className="bg-[#1f2833] text-white border-t border-slate-700/60 shadow-inner">
        <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-center gap-3 py-2 text-xs">
            {/* Dropdown Edades */}
            <div ref={agesDropdownRef} className="relative shrink-0">
              <button
                type="button"
                onClick={() => setIsAgesOpen((prev) => !prev)}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold transition-all cursor-pointer whitespace-nowrap shadow-2xs ${
                  isAgesOpen
                    ? 'bg-[#febd69] text-slate-950 shadow-md ring-2 ring-amber-300/40'
                    : 'bg-amber-400/15 hover:bg-amber-400/25 text-amber-300 hover:text-amber-100 border border-amber-400/30 hover:border-amber-400/50'
                }`}
                aria-expanded={isAgesOpen}
              >
                <span aria-hidden="true">🎁</span>
                <span>{ui.navAges}</span>
                <ChevronDown
                  className={`w-3.5 h-3.5 transition-transform duration-200 ${
                    isAgesOpen ? 'rotate-180 text-slate-950' : 'text-amber-300/80'
                  }`}
                />
              </button>

              {isAgesOpen && (
                <div className="absolute left-0 mt-2 w-[540px] bg-white text-slate-900 rounded-2xl shadow-2xl border border-slate-200 z-50 overflow-hidden animate-in fade-in zoom-in-95 duration-150">
                  <div className="px-4 py-3 bg-gradient-to-r from-amber-500/10 via-amber-50 to-orange-50/50 border-b border-amber-100 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="text-base">🎁</span>
                      <div>
                        <p className="text-xs font-black text-slate-900 leading-tight">
                          {ui.navAges}
                        </p>
                        <p className="text-[11px] text-slate-600">
                          {ui.exploreThemesSubtitle}
                        </p>
                      </div>
                    </div>
                    <button
                      type="button"
                      onClick={() => setIsAgesOpen(false)}
                      className="min-w-7 min-h-7 flex items-center justify-center p-1.5 rounded-lg text-slate-600 hover:text-slate-900 hover:bg-slate-200/60 transition-colors cursor-pointer"
                      aria-label={ui.navClose}
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>

                  <div className="p-3 grid grid-cols-2 gap-2 max-h-[70vh] overflow-y-auto">
                    {AGE_DROPDOWN_ITEMS.map((item) => (
                      <Link
                        key={item.slug}
                        href={localePath(`/${item.slug}`)}
                        onClick={() => setIsAgesOpen(false)}
                        className="flex items-start gap-2.5 p-2.5 rounded-xl hover:bg-amber-50/70 border border-slate-100 hover:border-amber-200 transition-all group cursor-pointer"
                      >
                        <span className="text-xl p-1.5 rounded-lg bg-slate-50 group-hover:bg-white group-hover:scale-110 transition-transform shrink-0 shadow-2xs">
                          {item.icon}
                        </span>
                        <div className="min-w-0 flex-1">
                          <div className="flex items-center justify-between gap-1">
                            <span className="text-xs font-bold text-slate-900 group-hover:text-amber-900 truncate">
                              {tTerm(item.termKey)}
                            </span>
                            <span className="text-[10px] font-black text-amber-800 bg-amber-100/80 px-1.5 py-0.5 rounded shrink-0">
                              {item.range}
                            </span>
                          </div>
                          <p className="text-[11px] text-slate-600 group-hover:text-slate-800 line-clamp-1 mt-0.5">
                            {tTerm(item.descTermKey)}
                          </p>
                        </div>
                      </Link>
                    ))}
                  </div>

                  <div className="p-2.5 bg-slate-50 border-t border-slate-100 flex items-center justify-between text-xs">
                    <span className="text-[11px] text-slate-600 font-medium">
                      {amazonSiteName} · {ui.amazonStoreBadge}
                    </span>
                    <Link
                      href={localePath('/')}
                      onClick={() => setIsAgesOpen(false)}
                      className="text-xs font-bold text-amber-800 hover:text-amber-950 hover:underline flex items-center gap-1 ml-auto"
                    >
                      <span>{ui.navAllIdeas}</span>
                      <span>→</span>
                    </Link>
                  </div>
                </div>
              )}
            </div>

            {/* 2. DROPDOWN PASIONES Y HOBBIES */}
            <div className="relative shrink-0" ref={passionsDropdownRef}>
              <button
                type="button"
                onClick={() => setIsPassionsOpen(!isPassionsOpen)}
                aria-expanded={isPassionsOpen}
                className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-full border text-xs tracking-wide transition-all shadow-2xs cursor-pointer select-none whitespace-nowrap shrink-0 hover:scale-102 active:scale-98 ${
                  isPassionsOpen
                    ? 'bg-purple-500/25 border-purple-400 text-white ring-1 ring-purple-400/50'
                    : 'bg-white/5 hover:bg-white/15 border-white/10 hover:border-white/25 text-slate-100 hover:text-white font-medium'
                }`}
              >
                <span aria-hidden="true">🎯</span>
                <span className="font-semibold">{ui.navThemes}</span>
                <ChevronDown
                  className={`w-3.5 h-3.5 transition-transform duration-200 ${
                    isPassionsOpen ? 'rotate-180 text-purple-300' : 'text-slate-300'
                  }`}
                />
              </button>

              {isPassionsOpen && (
                <div className="absolute left-0 top-full mt-2 w-[460px] bg-white rounded-2xl shadow-2xl border border-slate-200 z-50 overflow-hidden animate-in fade-in zoom-in-95 duration-150">
                  <div className="p-3 bg-linear-to-r from-purple-900 to-indigo-900 text-white flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="text-xl">🎯</span>
                      <div>
                        <p className="font-extrabold text-sm leading-none">{ui.navThemes}</p>
                        <p className="text-[10px] text-purple-100 mt-0.5">{ui.verifiedCatalogNote}</p>
                      </div>
                    </div>
                    <button
                      type="button"
                      onClick={() => setIsPassionsOpen(false)}
                      className="min-w-7 min-h-7 flex items-center justify-center text-xs font-bold text-purple-100 hover:text-white p-1.5 cursor-pointer"
                      aria-label={ui.navClose}
                    >
                      ✕
                    </button>
                  </div>

                  <div className="p-3 grid grid-cols-2 gap-2 max-h-[70vh] overflow-y-auto">
                    {PASSION_DROPDOWN_ITEMS.map((item) => (
                      <Link
                        key={item.slug}
                        href={localePath(`/${item.slug}`)}
                        onClick={() => setIsPassionsOpen(false)}
                        className="flex items-start gap-2.5 p-2 rounded-xl hover:bg-purple-50/70 border border-slate-100 hover:border-purple-200 transition-all group cursor-pointer"
                      >
                        <span className="text-xl p-1.5 rounded-lg bg-slate-50 group-hover:bg-white group-hover:scale-110 transition-transform shrink-0 shadow-2xs">
                          {item.icon}
                        </span>
                        <div className="min-w-0 flex-1">
                          <span className="text-xs font-bold text-slate-900 group-hover:text-purple-950 truncate block">
                            {tTerm(item.termKey)}
                          </span>
                          <p className="text-[10px] text-slate-600 group-hover:text-slate-800 line-clamp-1 mt-0.5">
                            {tTerm(item.descTermKey)}
                          </p>
                        </div>
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* 3. VOTAR EN GRUPO */}
            <button
              type="button"
              onClick={() => setIsDrawerOpen(true)}
              className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-linear-to-r from-emerald-500/25 to-teal-500/25 hover:from-emerald-500/40 hover:to-teal-500/40 border border-emerald-400/50 hover:border-emerald-300 text-emerald-100 hover:text-white font-black text-xs tracking-wide transition-all shadow-md whitespace-nowrap shrink-0 hover:scale-105 active:scale-98 ring-1 ring-emerald-400/30 cursor-pointer"
              title={ui.navVoting}
            >
              <span aria-hidden="true">🗳️</span>
              <span>{ui.navVoting}</span>
              {' '}
              <span className="text-[10px] font-black bg-emerald-400 text-slate-950 px-1.5 py-0.2 rounded-full ml-0.5">
                {voteItems.length}
              </span>
            </button>

            {/* 4. GTA 6 */}
            <Link
              href={localePath('/regalos-gta-6')}
              className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-gradient-to-r from-pink-500/25 via-purple-500/25 to-cyan-500/25 hover:from-pink-500/40 hover:to-cyan-500/40 border border-pink-400/50 hover:border-pink-300 text-pink-200 hover:text-white font-black text-xs tracking-wide transition-all shadow-md whitespace-nowrap shrink-0 hover:scale-105 active:scale-98 ring-1 ring-pink-400/30"
            >
              <span>🌴</span>
              <span>GTA 6</span>
            </Link>

            {/* 5. NAVIDAD & CARTA PAPÁ NOEL */}
            <Link
              href={localePath('/carta-papa-noel')}
              className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-linear-to-r from-red-600/30 to-amber-500/30 hover:from-red-600/40 hover:to-amber-500/40 border border-amber-400/50 text-amber-200 hover:text-white font-black text-xs tracking-wide transition-all shadow-md whitespace-nowrap shrink-0 hover:scale-105 active:scale-98 ring-1 ring-amber-400/30"
            >
              <span>🎅</span>
              <span>{ui.navLetter}</span>
            </Link>
          </div>
        </div>
      </nav>
    </div>
  );
}
