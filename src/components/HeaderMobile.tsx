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
import { useActiveLocale } from '@/hooks/useActiveLocale';

export interface AmazonLiveItem {
  asin: string;
  title: string;
  imageUrl: string | null;
  priceText: string;
  rating: number;
  url: string;
}

export const AGE_DROPDOWN_ITEMS = [
  {
    termKey: 'Recién Nacidos (0-12m)',
    descTermKey: 'Cochecitos y Esenciales de Bebé',
    range: '0-12m',
    slug: 'bebes-0-a-12-meses',
    icon: '🧸',
  },
  {
    termKey: '1 a 3 Años',
    descTermKey: 'Juguetes Montessori y Madera',
    range: '1-3',
    slug: 'ninos-1-a-3-anos',
    icon: '🧩',
  },
  {
    termKey: '4 a 6 Años',
    descTermKey: 'Manualidades y Creatividad',
    range: '4-6',
    slug: 'ninos-4-a-6-anos',
    icon: '🎨',
  },
  {
    termKey: '7 a 9 Años',
    descTermKey: 'Scalextric y Circuitos de Coches',
    range: '7-9',
    slug: 'ninos-7-a-9-anos',
    icon: '🎩',
  },
  {
    termKey: '10 a 12 Años',
    descTermKey: 'Drones RC y Robótica STEM',
    range: '10-12',
    slug: 'ninos-10-a-12-anos',
    icon: '🚀',
  },
  {
    termKey: '13 a 15 Años',
    descTermKey: 'Auriculares Inalámbricos y Audio',
    range: '13-15',
    slug: 'jovenes-13-a-15-anos',
    icon: '🎧',
  },
  {
    termKey: '16 a 18 Años',
    descTermKey: 'Videojuegos y Setup Gamer',
    range: '16-18',
    slug: 'jovenes-16-a-18-anos',
    icon: '⚡',
  },
  {
    termKey: 'A partir de 18 Años',
    descTermKey: 'Escapadas y Experiencias',
    range: '18+',
    slug: 'adultos-mas-de-18-anos',
    icon: '🎯',
  },
  {
    termKey: 'Fiesta Revelación de Género',
    descTermKey: 'Fiestas y Revelación de Género',
    range: 'Baby Shower',
    slug: 'fiesta-revelacion-genero',
    icon: '🎈',
  },
];

export const PASSION_DROPDOWN_ITEMS = [
  { termKey: 'Motoristas', descTermKey: 'Motoristas', slug: 'motoristas', icon: '🏍️' },
  { termKey: 'Gaming', descTermKey: 'Videojuegos y Setup Gamer', slug: 'gaming', icon: '🎮' },
  { termKey: 'Amantes del Café', descTermKey: 'Gourmet, Café y Coctelería', slug: 'amantes-del-cafe', icon: '☕' },
  { termKey: 'Mascotas', descTermKey: 'Mascotas', slug: 'mascotas', icon: '🐾' },
  { termKey: 'Automóvil', descTermKey: 'Automóvil', slug: 'automovil', icon: '🚗' },
  { termKey: 'Ciclismo y MTB', descTermKey: 'Ciclismo y MTB', slug: 'ciclismo', icon: '🚴' },
  { termKey: 'Cartas y Sobres Pokémon', descTermKey: 'Pokémon (Cartas TCG & Figuras)', slug: 'cartas-y-sobres-pokemon', icon: '⚡' },
  { termKey: 'Figuras de Colección y Cine', descTermKey: 'Todo Anime, Cine & Series', slug: 'figuras-de-coleccion-y-cine', icon: '🎎' },
];

interface HeaderMobileProps {
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

export default function HeaderMobile({
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
}: HeaderMobileProps) {
  const { localeKey, ui, amazonRegion, amazonSiteName, formatPrice, localePath, tTerm } = useActiveLocale();
  const { voteItems, setIsDrawerOpen } = useVoting();
  const [isAgesOpen, setIsAgesOpen] = useState(false);
  const [isPassionsOpen, setIsPassionsOpen] = useState(false);
  const agesDropdownRef = useRef<HTMLDivElement>(null);
  const passionsDropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (agesDropdownRef.current && !agesDropdownRef.current.contains(event.target as Node)) {
        setIsAgesOpen(false);
      }
      if (passionsDropdownRef.current && !passionsDropdownRef.current.contains(event.target as Node)) {
        setIsPassionsOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const defaultQuery = localeKey === 'es' || localeKey === 'es-us' ? 'regalos' : 'gifts';
  const amazonSearchUrl = getAmazonSearchUrl(searchQuery.trim() || defaultQuery, amazonRegion);

  const hasAnyResults = liveMatches.length > 0 || amazonResults.length > 0;

  return (
    <div className="w-full overflow-hidden select-none">
      {/* 1. BARRA PRINCIPAL MÓVIL */}
      <div className="bg-[#131921] text-white px-3 py-2">
        <div className="flex items-center justify-between gap-2">
          <div className="shrink-0">
            <BrandLogo variant="light" size="compact" />
          </div>

          <div className="flex items-center gap-1.5 shrink-0">
            <button
              type="button"
              onClick={() => setIsDrawerOpen(true)}
              className="flex items-center gap-1.5 px-3 h-8.5 rounded-xl bg-[#febd69] hover:bg-[#f3a847] text-slate-950 font-black text-xs transition-all shadow-sm cursor-pointer group active:scale-95 shrink-0 border border-amber-400"
              title={ui.navVoting}
            >
              <span className="text-base leading-none" aria-hidden="true">🗳️</span>
              <span className="font-extrabold text-xs tracking-normal text-slate-950">{ui.navVoting}</span>
              {' '}
              <span
                className={`px-1.5 py-0.5 rounded-full text-[10px] font-black leading-none transition-colors ${
                  voteItems.length > 0
                    ? 'bg-slate-950 text-white'
                    : 'bg-black/15 text-slate-900'
                }`}
              >
                {voteItems.length}
              </span>
            </button>

            <LanguageSelector dark={true} />
            <VotingOnboardingTooltip variant="mobile" />
          </div>
        </div>

        {/* BARRA DE BÚSQUEDA MÓVIL */}
        <div className="mt-2 relative">
          <form
            onSubmit={onSearchSubmit}
            className="relative flex items-center rounded-xl overflow-hidden shadow-inner focus-within:ring-2 focus-within:ring-[#febd69] transition-all bg-white border border-slate-200"
          >
            <Search className="w-4 h-4 text-slate-600 ml-3 shrink-0" />

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
              className="w-full px-2.5 py-2 text-xs text-slate-900 placeholder-slate-600 focus:outline-none bg-transparent"
            />

            <div className="flex items-center shrink-0">
              {isLoadingAmazon && (
                <Loader2 className="w-3.5 h-3.5 text-slate-600 animate-spin mr-1.5" />
              )}
              {searchQuery.trim().length > 0 && (
                <button
                  type="button"
                  onClick={clearSearch}
                  aria-label={ui.headerClearSearch}
                  className="min-w-7 min-h-7 flex items-center justify-center p-1 mr-1 rounded-full text-slate-600 hover:text-slate-900 hover:bg-slate-200 transition-colors cursor-pointer"
                  title={ui.headerClearSearch}
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              )}
              <button
                type="submit"
                aria-label={ui.headerSearchButton}
                className="bg-[#febd69] hover:bg-[#f3a847] active:bg-[#e47911] text-slate-950 px-3.5 py-2.5 flex items-center justify-center transition-colors cursor-pointer shrink-0"
              >
                <Search className="w-4 h-4 stroke-[2.5]" />
              </button>
            </div>
          </form>

          {isFocused && searchQuery.trim().length >= 2 && (
            <div className="absolute top-full left-0 right-0 mt-2 bg-white rounded-2xl shadow-2xl border border-slate-200 overflow-hidden z-50 animate-in fade-in slide-in-from-top-2 duration-150 max-h-[75vh] overflow-y-auto">
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

              {hasAnyResults && (
                <div className="p-2.5 bg-slate-50 border-t border-slate-100">
                  <a
                    href={amazonSearchUrl}
                    target="_blank"
                    rel="noopener noreferrer sponsored"
                    className="w-full flex items-center justify-center gap-1.5 py-2 px-3 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 text-slate-950 text-xs font-black shadow-xs"
                  >
                    <span>{ui.searchDirectOn} {amazonSiteName}</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      {/* 2. SUB-NAV MENÚ MÓVIL */}
      <nav aria-label={ui.navMenu} className="bg-[#1f2833] text-white border-t border-slate-700/60 shadow-inner px-3 py-2">
        <div className="grid grid-cols-2 gap-2.5 w-full text-xs">
          {/* 1. Dropdown Edades */}
          <div ref={agesDropdownRef} className="relative w-full">
            <button
              type="button"
              onClick={() => setIsAgesOpen((prev) => !prev)}
              aria-expanded={isAgesOpen}
              className={`w-full h-10 flex items-center justify-center gap-1.5 px-2 rounded-xl text-xs font-black transition-all shadow-xs cursor-pointer ${
                isAgesOpen
                  ? 'bg-[#febd69] text-slate-950 shadow-md ring-2 ring-amber-300/40'
                  : 'bg-amber-400/15 text-amber-200 border border-amber-400/30 active:bg-amber-400/25'
              }`}
            >
              <span className="text-sm shrink-0" aria-hidden="true">🎁</span>
              <span className="truncate">{ui.navAges}</span>
              <ChevronDown
                className={`w-3.5 h-3.5 shrink-0 transition-transform duration-200 ${
                  isAgesOpen ? 'rotate-180 text-slate-950' : 'text-amber-200'
                }`}
              />
            </button>

            {isAgesOpen && (
              <>
                <div
                  aria-hidden="true"
                  className="fixed inset-0 z-40 bg-black/40"
                  onClick={() => setIsAgesOpen(false)}
                />
                <div className="fixed inset-x-3 top-24 w-auto bg-white text-slate-900 rounded-2xl shadow-2xl border border-slate-200 z-50 overflow-hidden animate-in fade-in zoom-in-95 duration-150">
                  <div className="px-4 py-3 bg-gradient-to-r from-amber-500/10 via-amber-50 to-orange-50/50 border-b border-amber-100 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="text-base">🎁</span>
                      <p className="text-xs font-black text-slate-900">
                        {ui.navAges}
                      </p>
                    </div>
                    <button
                      type="button"
                      onClick={() => setIsAgesOpen(false)}
                      className="min-w-7 min-h-7 flex items-center justify-center p-1.5 rounded-lg text-slate-600 hover:text-slate-900 cursor-pointer"
                      aria-label={ui.navClose}
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>

                  <div className="p-3 grid grid-cols-1 gap-2 max-h-[60vh] overflow-y-auto">
                    {AGE_DROPDOWN_ITEMS.map((item) => (
                      <Link
                        key={item.slug}
                        href={localePath(`/${item.slug}`)}
                        onClick={() => setIsAgesOpen(false)}
                        className="flex items-center gap-2.5 p-2 rounded-xl hover:bg-amber-50/70 border border-slate-100"
                      >
                        <span className="text-xl p-1 rounded-lg bg-slate-50 shrink-0">
                          {item.icon}
                        </span>
                        <div className="min-w-0 flex-1">
                          <span className="text-xs font-bold text-slate-900 truncate block">
                            {tTerm(item.termKey)}
                          </span>
                          <span className="text-[10px] text-amber-800 font-bold truncate block">
                            {tTerm(item.descTermKey)}
                          </span>
                        </div>
                      </Link>
                    ))}
                  </div>
                </div>
              </>
            )}
          </div>

          {/* 2. Dropdown Pasiones y Temas */}
          <div className="relative w-full" ref={passionsDropdownRef}>
            <button
              type="button"
              onClick={() => setIsPassionsOpen(!isPassionsOpen)}
              aria-expanded={isPassionsOpen}
              className={`w-full h-10 flex items-center justify-center gap-1.5 px-2 rounded-xl border text-xs font-black transition-all shadow-xs cursor-pointer ${
                isPassionsOpen
                  ? 'bg-purple-500/25 border-purple-400 text-white ring-1 ring-purple-400/50'
                  : 'bg-white/5 border-white/10 text-slate-100 hover:bg-white/10 active:bg-white/20'
              }`}
            >
              <span className="text-sm shrink-0" aria-hidden="true">🎯</span>
              <span className="truncate">{ui.navThemes}</span>
              <ChevronDown className="w-3.5 h-3.5 shrink-0 transition-transform duration-200" />
            </button>

            {isPassionsOpen && (
              <>
                <div
                  aria-hidden="true"
                  className="fixed inset-0 z-40 bg-black/40 backdrop-blur-xs"
                  onClick={() => setIsPassionsOpen(false)}
                />
                <div className="fixed left-2 right-2 top-28 z-50 rounded-2xl bg-white border border-slate-200 shadow-2xl overflow-hidden max-h-[75vh] flex flex-col animate-in fade-in zoom-in-95 duration-150">
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
                      className="min-w-7 min-h-7 flex items-center justify-center p-1.5 rounded-lg bg-white/10 text-white hover:bg-white/20 text-xs px-2 font-bold cursor-pointer"
                      aria-label={ui.navClose}
                    >
                      ✕
                    </button>
                  </div>
                  <div className="p-2 grid grid-cols-1 sm:grid-cols-2 gap-1.5 overflow-y-auto">
                    {PASSION_DROPDOWN_ITEMS.map((item) => (
                      <Link
                        key={item.slug}
                        href={localePath(`/${item.slug}`)}
                        onClick={() => setIsPassionsOpen(false)}
                        className="flex items-center gap-2.5 p-2 rounded-xl hover:bg-purple-50 border border-slate-100 transition-colors group"
                      >
                        <span className="text-xl p-1.5 rounded-lg bg-slate-50 group-hover:bg-white shadow-2xs shrink-0">
                          {item.icon}
                        </span>
                        <div className="min-w-0 flex-1">
                          <span className="block text-xs font-bold text-slate-900 group-hover:text-purple-950 truncate">
                            {tTerm(item.termKey)}
                          </span>
                          <span className="block text-[10px] text-slate-600 truncate">
                            {tTerm(item.descTermKey)}
                          </span>
                        </div>
                      </Link>
                    ))}
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      </nav>
    </div>
  );
}
