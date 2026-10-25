'use client';

import React, { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Search, X, ExternalLink, ArrowRight, Star, Loader2, ShoppingBag, ChevronDown } from 'lucide-react';
import BrandLogo from '@/components/BrandLogo';
import LanguageSelector from '@/components/LanguageSelector';
import { useCurrency } from '@/context/CurrencyContext';
import { useVoting } from '@/context/VotingContext';
import { Product, AMAZON_AFFILIATE_TAG } from '@/data/products';
import { AmazonLiveItem, AGE_DROPDOWN_ITEMS } from '@/components/HeaderMobile';

interface HeaderDesktopProps {
  searchQuery: string;
  onSearchChange?: (query: string) => void;
  onSearchSubmit: (e: React.FormEvent) => void;
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
  clearSearch,
  isFocused,
  setIsFocused,
  liveMatches,
  amazonResults,
  isLoadingAmazon,
}: HeaderDesktopProps) {
  const { formatPrice } = useCurrency();
  const { voteItems, setIsDrawerOpen } = useVoting();
  const [isAgesOpen, setIsAgesOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const agesDropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsFocused(false);
      }
      if (agesDropdownRef.current && !agesDropdownRef.current.contains(event.target as Node)) {
        setIsAgesOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [setIsFocused]);

  const amazonSearchUrl = `https://www.amazon.es/s?k=${encodeURIComponent(
    searchQuery.trim() || 'regalos'
  )}&tag=${AMAZON_AFFILIATE_TAG}&linkCode=ll2`;

  const hasAnyResults = liveMatches.length > 0 || amazonResults.length > 0;

  return (
    <div className="w-full select-none">
      {/* 1. AMAZON-STYLE MAIN HEADER BAR (DEEP NAVY) */}
      <div className="bg-[#131921] text-white py-2">
        <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between gap-4 lg:gap-8">
            
            {/* Logo */}
            <BrandLogo variant="light" />

            {/* Quick Search Bar with Live Amazon Integration */}
            <div ref={dropdownRef} className="flex-1 max-w-2xl relative mx-2 lg:mx-4">
              <form
                onSubmit={onSearchSubmit}
                className="relative flex items-center rounded-xl overflow-hidden shadow-inner focus-within:ring-2 focus-within:ring-[#febd69] transition-all bg-white border border-slate-200"
              >
                <Search className="w-4 h-4 text-slate-400 ml-3.5 shrink-0" />

                <input
                  type="text"
                  value={searchQuery}
                  onFocus={() => setIsFocused(true)}
                  onChange={(e) => {
                    onSearchChange?.(e.target.value);
                    setIsFocused(true);
                  }}
                  placeholder="Buscar regalo: Lego, zapatillas, perfumes, PS5..."
                  className="w-full px-3 py-2 text-sm text-slate-900 placeholder-slate-400 focus:outline-none bg-transparent"
                />

                {/* Action Buttons inside Input */}
                <div className="flex items-center shrink-0">
                  {isLoadingAmazon && (
                    <Loader2 className="w-4 h-4 text-slate-400 animate-spin mr-2" />
                  )}
                  {searchQuery.trim().length > 0 && (
                    <button
                      type="button"
                      onClick={clearSearch}
                      className="p-1 mr-1 rounded-full text-slate-400 hover:text-slate-700 hover:bg-slate-200 transition-colors cursor-pointer"
                      title="Borrar búsqueda"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  )}
                  <button
                    type="submit"
                    aria-label="Buscar regalo"
                    className="bg-[#febd69] hover:bg-[#f3a847] active:bg-[#e47911] text-slate-950 px-5 py-2.5 flex items-center justify-center transition-colors cursor-pointer"
                  >
                    <Search className="w-4 h-4 stroke-[2.5]" />
                  </button>
                </div>
              </form>

              {/* LIVE AUTOCOMPLETE DROPDOWN */}
              {isFocused && searchQuery.trim().length >= 2 && (
                <div className="absolute top-full left-0 right-0 mt-2 bg-white rounded-2xl shadow-2xl border border-slate-200 overflow-hidden z-50 animate-in fade-in slide-in-from-top-2 duration-150 max-h-[80vh] overflow-y-auto">
                  
                  {/* Catálogo Recomendado */}
                  {liveMatches.length > 0 && (
                    <div>
                      <div className="p-2.5 bg-slate-50 border-b border-slate-100 flex items-center justify-between text-[11px] font-bold text-slate-500 uppercase tracking-wider">
                        <span>Catálogo Recomendado</span>
                        <span className="text-indigo-600">{liveMatches.length} productos</span>
                      </div>

                      <div className="divide-y divide-slate-100">
                        {liveMatches.map((product) => (
                          <div
                            key={product.id}
                            onClick={() => {
                              setIsFocused(false);
                              const target = document.getElementById('catalogo-productos');
                              if (target) target.scrollIntoView({ behavior: 'smooth' });
                            }}
                            className="p-3 hover:bg-indigo-50/60 transition-colors flex items-center gap-3 cursor-pointer group"
                          >
                            <div className="relative w-12 h-12 rounded-lg bg-slate-50 shrink-0 overflow-hidden border border-slate-200">
                              <Image
                                src={product.imageUrl}
                                alt={product.title}
                                fill
                                className="object-contain p-1 group-hover:scale-105 transition-transform"
                              />
                            </div>
                            <div className="flex-1 min-w-0">
                              <h4 className="text-xs font-bold text-slate-900 truncate group-hover:text-indigo-600">
                                {product.title}
                              </h4>
                              <div className="flex items-center gap-2 mt-0.5">
                                <span className="text-xs font-black text-indigo-600">{formatPrice(product.priceText)}</span>
                                <span className="text-[11px] text-slate-400 flex items-center gap-0.5">
                                  <Star className="w-3 h-3 text-amber-400 fill-amber-400" />
                                  {product.rating}
                                </span>
                                <span className="text-[10px] px-1.5 py-0.5 rounded bg-slate-100 text-slate-600 font-medium truncate">
                                  {product.category}
                                </span>
                              </div>
                            </div>
                            <ArrowRight className="w-4 h-4 text-slate-300 group-hover:text-indigo-600 group-hover:translate-x-0.5 transition-all shrink-0" />
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Productos en Vivo de Amazon.es */}
                  {amazonResults.length > 0 && (
                    <div className={liveMatches.length > 0 ? 'border-t-2 border-slate-100' : ''}>
                      <div className="p-2.5 bg-gradient-to-r from-amber-50/80 to-orange-50/50 border-b border-amber-100 flex items-center justify-between text-[11px] font-bold text-amber-900 uppercase tracking-wider">
                        <div className="flex items-center gap-1.5">
                          <ShoppingBag className="w-3.5 h-3.5 text-amber-600" />
                          <span>Productos en Vivo de Amazon.es</span>
                        </div>
                        <span className="text-[10px] bg-amber-200 text-amber-900 px-2 py-0.5 rounded-full font-black">
                          Precios al minuto
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
                                  unoptimized
                                  className="object-contain p-1 group-hover:scale-105 transition-transform"
                                />
                              ) : (
                                <div className="w-full h-full flex items-center justify-center bg-slate-100 text-slate-400">
                                  <ShoppingBag className="w-5 h-5" />
                                </div>
                              )}
                            </div>
                            <div className="flex-1 min-w-0">
                              <h4 className="text-xs font-bold text-slate-900 line-clamp-1 group-hover:text-amber-700">
                                {item.title}
                              </h4>
                              <div className="flex items-center gap-2 mt-0.5">
                                <span className="text-xs font-black text-amber-700">{formatPrice(item.priceText)}</span>
                                <span className="text-[11px] text-slate-400 flex items-center gap-0.5">
                                  <Star className="w-3 h-3 text-amber-400 fill-amber-400" />
                                  {item.rating}
                                </span>
                                <span className="text-[10px] px-1.5 py-0.5 rounded bg-emerald-50 text-emerald-700 font-bold border border-emerald-200/60">
                                  Prime &bull; Amazon
                                </span>
                              </div>
                            </div>
                            <div className="flex items-center gap-1 px-2 py-1 rounded-lg bg-amber-50 text-amber-800 text-[11px] font-bold shrink-0 group-hover:bg-amber-600 group-hover:text-white transition-colors">
                              <span>Comprar</span>
                              <ExternalLink className="w-3 h-3" />
                            </div>
                          </a>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Estado de carga */}
                  {isLoadingAmazon && amazonResults.length === 0 && (
                    <div className="p-4 text-center text-xs text-slate-500 flex items-center justify-center gap-2">
                      <Loader2 className="w-4 h-4 text-indigo-500 animate-spin" />
                      <span>Buscando &quot;{searchQuery}&quot; en Amazon España...</span>
                    </div>
                  )}

                  {/* Sin resultados */}
                  {!hasAnyResults && !isLoadingAmazon && (
                    <div className="p-5 text-center bg-gradient-to-b from-white to-amber-50/40">
                      <p className="text-xs text-slate-600 mb-3">
                        ¿Buscas &quot;<strong>{searchQuery}</strong>&quot;? Encuéntralo con envío rápido y garantía oficial en Amazon España.
                      </p>
                      <a
                        href={amazonSearchUrl}
                        target="_blank"
                        rel="noopener noreferrer sponsored"
                        className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-slate-950 font-black text-xs transition-transform hover:scale-102 shadow-md cursor-pointer"
                      >
                        <span>Buscar &quot;{searchQuery}&quot; en Amazon España</span>
                        <ExternalLink className="w-4 h-4" />
                      </a>
                    </div>
                  )}

                  {/* Barra de acción inferior */}
                  {hasAnyResults && (
                    <div className="p-2.5 bg-slate-50 border-t border-slate-100 flex gap-2">
                      {liveMatches.length > 0 && (
                        <button
                          type="button"
                          onClick={onSearchSubmit}
                          className="flex-1 text-center py-2 px-3 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold transition-colors cursor-pointer"
                        >
                          Filtrar en catálogo ({liveMatches.length})
                        </button>
                      )}
                      <a
                        href={amazonSearchUrl}
                        target="_blank"
                        rel="noopener noreferrer sponsored"
                        className="flex-1 flex items-center justify-center gap-1.5 py-2 px-3 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-slate-950 text-xs font-black transition-colors shadow-xs"
                      >
                        <span>Ver más en Amazon.es (+50.000)</span>
                        <ExternalLink className="w-3.5 h-3.5" />
                      </a>
                    </div>
                  )}

                </div>
              )}
            </div>

            {/* Right Actions: Group Voting Button & Language Selector */}
            <div className="flex items-center gap-3 shrink-0">
              {/* Votación en Grupo Button (Hero Feature) */}
              <button
                type="button"
                onClick={() => setIsDrawerOpen(true)}
                className="flex items-center gap-2.5 px-4 sm:px-5 h-11 rounded-xl bg-[#febd69] hover:bg-[#f3a847] active:bg-[#e47911] text-slate-950 font-black transition-all duration-150 shadow-sm hover:scale-102 active:scale-98 cursor-pointer shrink-0 border border-amber-400 group"
                title="Votación de Regalos en Grupo para WhatsApp"
                aria-label="Abrir lista de votación de regalos"
              >
                <span className="text-xl group-hover:scale-110 transition-transform leading-none">🗳️</span>
                <div className="flex flex-col text-left leading-tight">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-amber-950/80">Amigos & Familia</span>
                  <span className="text-sm font-black text-slate-950 tracking-tight">Votar en grupo</span>
                </div>
                <span
                  className={`ml-1 px-2.5 py-0.5 rounded-full text-xs font-black leading-none transition-colors ${
                    voteItems.length > 0
                      ? 'bg-slate-950 text-[#febd69]'
                      : 'bg-black/15 text-slate-900'
                  }`}
                >
                  {voteItems.length}
                </span>
              </button>

              <LanguageSelector dark={true} />
            </div>

          </div>
        </div>
      </div>

      {/* 2. SUB-NAV MENÚ DE ESCRITORIO (TABS CONTEXTUALES Y DROPDOWN) */}
      <div className="bg-[#1f2833] text-white border-t border-slate-700/60 shadow-inner">
        <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-2 py-2 text-xs">
            
            {/* Dropdown Por Edades */}
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
                aria-label="Abrir catálogo por edades"
              >
                <span>🎁</span>
                <span>Por Edades</span>
                <ChevronDown
                  className={`w-3.5 h-3.5 transition-transform duration-200 ${
                    isAgesOpen ? 'rotate-180 text-slate-950' : 'text-amber-300/80'
                  }`}
                />
              </button>

              {isAgesOpen && (
                <div className="absolute left-0 mt-2 w-[540px] bg-white text-slate-900 rounded-2xl shadow-2xl border border-slate-200 z-50 overflow-hidden animate-in fade-in zoom-in-95 duration-150">
                  {/* Header */}
                  <div className="px-4 py-3 bg-gradient-to-r from-amber-500/10 via-amber-50 to-orange-50/50 border-b border-amber-100 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="text-base">🎁</span>
                      <div>
                        <h3 className="text-xs font-black text-slate-900 leading-tight">
                          Regalos por Rango de Edad
                        </h3>
                        <p className="text-[11px] text-slate-500">
                          Selecciona una etapa para ver ideas verificadas
                        </p>
                      </div>
                    </div>
                    <button
                      type="button"
                      onClick={() => setIsAgesOpen(false)}
                      className="p-1 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-200/60 transition-colors"
                      aria-label="Cerrar menú de edades"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>

                  {/* Grid of Ages */}
                  <div className="p-3 grid grid-cols-2 gap-2 max-h-[70vh] overflow-y-auto">
                    {AGE_DROPDOWN_ITEMS.map((item) => (
                      <Link
                        key={item.slug}
                        href={`/${item.slug}`}
                        onClick={() => setIsAgesOpen(false)}
                        className="flex items-start gap-2.5 p-2.5 rounded-xl hover:bg-amber-50/70 border border-slate-100 hover:border-amber-200 transition-all group cursor-pointer"
                      >
                        <span className="text-xl p-1.5 rounded-lg bg-slate-50 group-hover:bg-white group-hover:scale-110 transition-transform shrink-0 shadow-2xs">
                          {item.icon}
                        </span>
                        <div className="min-w-0 flex-1">
                          <div className="flex items-center justify-between gap-1">
                            <span className="text-xs font-bold text-slate-900 group-hover:text-amber-900 truncate">
                              {item.label}
                            </span>
                            <span className="text-[10px] font-black text-amber-700 bg-amber-100/80 px-1.5 py-0.5 rounded shrink-0">
                              {item.range}
                            </span>
                          </div>
                          <p className="text-[11px] text-slate-500 group-hover:text-slate-600 line-clamp-1 mt-0.5">
                            {item.desc}
                          </p>
                        </div>
                      </Link>
                    ))}
                  </div>

                  {/* Footer bar */}
                  <div className="p-2.5 bg-slate-50 border-t border-slate-100 flex items-center justify-between text-xs">
                    <span className="text-[11px] text-slate-500 font-medium">
                      Recomendados por valoraciones reales en Amazon.es
                    </span>
                    <Link
                      href="/#catalogo-productos"
                      onClick={() => setIsAgesOpen(false)}
                      className="text-xs font-bold text-amber-700 hover:text-amber-900 hover:underline flex items-center gap-1 ml-auto"
                    >
                      <span>Ver catálogo completo</span>
                      <span>→</span>
                    </Link>
                  </div>
                </div>
              )}
            </div>

            <Link
              href="/motoristas"
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/5 hover:bg-white/15 border border-white/10 hover:border-white/25 text-slate-100 hover:text-white font-medium text-xs tracking-wide transition-all shadow-2xs whitespace-nowrap shrink-0 hover:scale-102 active:scale-98"
            >
              <span>🏍️</span>
              <span>Motoristas</span>
            </Link>

            <Link
              href="/gaming"
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/5 hover:bg-white/15 border border-white/10 hover:border-white/25 text-slate-100 hover:text-white font-medium text-xs tracking-wide transition-all shadow-2xs whitespace-nowrap shrink-0 hover:scale-102 active:scale-98"
            >
              <span>🎮</span>
              <span>Gaming</span>
            </Link>

            <Link
              href="/amantes-del-cafe"
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/5 hover:bg-white/15 border border-white/10 hover:border-white/25 text-slate-100 hover:text-white font-medium text-xs tracking-wide transition-all shadow-2xs whitespace-nowrap shrink-0 hover:scale-102 active:scale-98"
            >
              <span>☕</span>
              <span>Café Barista</span>
            </Link>

            <Link
              href="/mascotas"
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/5 hover:bg-white/15 border border-white/10 hover:border-white/25 text-slate-100 hover:text-white font-medium text-xs tracking-wide transition-all shadow-2xs whitespace-nowrap shrink-0 hover:scale-102 active:scale-98"
            >
              <span>🐾</span>
              <span>Mascotas</span>
            </Link>

            <Link
              href="/automovil"
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/5 hover:bg-white/15 border border-white/10 hover:border-white/25 text-slate-100 hover:text-white font-medium text-xs tracking-wide transition-all shadow-2xs whitespace-nowrap shrink-0 hover:scale-102 active:scale-98"
            >
              <span>🚗</span>
              <span>Automóvil</span>
            </Link>

            <Link
              href="/ciclismo"
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/5 hover:bg-white/15 border border-white/10 hover:border-white/25 text-slate-100 hover:text-white font-medium text-xs tracking-wide transition-all shadow-2xs whitespace-nowrap shrink-0 hover:scale-102 active:scale-98"
            >
              <span>🚴</span>
              <span>Ciclismo</span>
            </Link>

            <Link
              href="/?categoria=cartas-pokemon#catalogo-productos"
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-amber-400/10 hover:bg-amber-400/20 border border-amber-400/30 hover:border-amber-400/50 text-amber-200 hover:text-amber-100 font-semibold text-xs tracking-wide transition-all shadow-2xs whitespace-nowrap shrink-0 hover:scale-102 active:scale-98"
            >
              <span>⚡</span>
              <span>Pokémon</span>
            </Link>

            <Link
              href="/?categoria=figuras-anime#catalogo-productos"
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/5 hover:bg-white/15 border border-white/10 hover:border-white/25 text-slate-100 hover:text-white font-medium text-xs tracking-wide transition-all shadow-2xs whitespace-nowrap shrink-0 hover:scale-102 active:scale-98"
            >
              <span>🎎</span>
              <span>Figuras & Anime</span>
            </Link>

            <Link
              href="/halloween"
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-orange-500/15 hover:bg-orange-500/25 border border-orange-400/30 hover:border-orange-400/50 text-orange-200 hover:text-orange-100 font-semibold text-xs tracking-wide transition-all shadow-2xs whitespace-nowrap shrink-0 hover:scale-102 active:scale-98"
            >
              <span>🎃</span>
              <span>Halloween</span>
            </Link>

            <Link
              href="/navidad"
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-emerald-500/15 hover:bg-emerald-500/25 border border-emerald-400/30 hover:border-emerald-400/50 text-emerald-200 hover:text-emerald-100 font-semibold text-xs tracking-wide transition-all shadow-2xs whitespace-nowrap shrink-0 hover:scale-102 active:scale-98"
            >
              <span>🎄</span>
              <span>Navidad & Reyes</span>
            </Link>

          </div>
        </div>
      </div>
    </div>
  );
}
