'use client';

import React, { useState, useRef, useEffect, useMemo } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Gift, Search, X, ExternalLink, ArrowRight, Star, Loader2, Sparkles, ShoppingBag } from 'lucide-react';
import BrandLogo from '@/components/BrandLogo';
import { PRODUCTS, AMAZON_AFFILIATE_TAG } from '@/data/products';
import { matchesSearchQuery } from '@/utils/search';

interface HeaderProps {
  currentTheme?: 'baby' | 'kids' | 'gamer' | 'emo' | 'tech' | 'classic';
  onThemeChange?: (theme: 'baby' | 'kids' | 'gamer' | 'emo' | 'tech' | 'classic') => void;
  onSearchChange?: (query: string) => void;
  searchQuery?: string;
}

interface AmazonLiveItem {
  asin: string;
  title: string;
  imageUrl: string | null;
  priceText: string;
  rating: number;
  url: string;
}

export default function Header({
  currentTheme = 'classic',
  onThemeChange,
  onSearchChange,
  searchQuery = '',
}: HeaderProps) {
  const [isFocused, setIsFocused] = useState(false);
  const [amazonResults, setAmazonResults] = useState<AmazonLiveItem[]>([]);
  const [isLoadingAmazon, setIsLoadingAmazon] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsFocused(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Filter matching products from local verified catalog
  const liveMatches = useMemo(() => {
    if (!searchQuery || searchQuery.trim().length < 2) return [];
    return PRODUCTS.filter((p) => matchesSearchQuery(p, searchQuery)).slice(0, 3);
  }, [searchQuery]);

  // Live Amazon search with 300ms debounce
  useEffect(() => {
    const q = searchQuery.trim();
    if (q.length < 2) {
      setAmazonResults([]);
      setIsLoadingAmazon(false);
      return;
    }

    setIsLoadingAmazon(true);
    const controller = new AbortController();
    const timer = setTimeout(async () => {
      try {
        const res = await fetch(`/api/live-search?q=${encodeURIComponent(q)}`, {
          signal: controller.signal,
        });
        const data = await res.json();
        if (data.success && Array.isArray(data.results)) {
          setAmazonResults(data.results);
        } else {
          setAmazonResults([]);
        }
      } catch (err: any) {
        if (err.name !== 'AbortError') {
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
  }, [searchQuery]);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsFocused(false);
    const target = document.getElementById('catalogo-productos');
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const clearSearch = () => {
    onSearchChange?.('');
    setAmazonResults([]);
    setIsFocused(false);
  };

  const amazonSearchUrl = `https://www.amazon.es/s?k=${encodeURIComponent(
    searchQuery.trim() || 'regalos'
  )}&tag=${AMAZON_AFFILIATE_TAG}&linkCode=ll2`;

  const hasAnyResults = liveMatches.length > 0 || amazonResults.length > 0;

  return (
    <header className="sticky top-0 z-50 backdrop-blur-md transition-colors duration-300 border-b bg-white/95 border-slate-200 text-slate-900 shadow-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 gap-4">
          
          {/* Logo */}
          <BrandLogo />

          {/* Quick Search Bar with Live Amazon Integration */}
          <div ref={dropdownRef} className="flex-1 max-w-lg relative">
            <form onSubmit={handleSearchSubmit} className="relative flex items-center">
              <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
              <input
                type="text"
                value={searchQuery}
                onFocus={() => setIsFocused(true)}
                onChange={(e) => {
                  onSearchChange?.(e.target.value);
                  setIsFocused(true);
                }}
                placeholder="Buscar en Amazon: Lego, zapatillas, perfumes, PS5..."
                className="w-full pl-10 pr-20 py-2.5 text-sm rounded-full border border-slate-200 bg-slate-50 text-slate-800 placeholder-slate-400 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-100 outline-none transition-all"
              />

              {/* Action Buttons inside Input */}
              <div className="absolute right-2 flex items-center gap-1">
                {isLoadingAmazon && (
                  <Loader2 className="w-3.5 h-3.5 text-indigo-500 animate-spin mr-1" />
                )}
                {searchQuery.trim().length > 0 && (
                  <button
                    type="button"
                    onClick={clearSearch}
                    className="p-1 rounded-full text-slate-400 hover:text-slate-700 hover:bg-slate-200 transition-colors"
                    title="Borrar búsqueda"
                  >
                    <X className="w-3.5 h-3.5" />
                  </button>
                )}
                <button
                  type="submit"
                  className="px-2.5 py-1 rounded-full bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold transition-colors cursor-pointer shadow-xs"
                >
                  Buscar
                </button>
              </div>
            </form>

            {/* LIVE AUTOCOMPLETE DROPDOWN */}
            {isFocused && searchQuery.trim().length >= 2 && (
              <div className="absolute top-full left-0 right-0 mt-2 bg-white rounded-2xl shadow-2xl border border-slate-200 overflow-hidden z-50 animate-in fade-in slide-in-from-top-2 duration-150 max-h-[80vh] overflow-y-auto">
                
                {/* 1. SECCIÓN: PRODUCTOS EN CATÁLOGO LOCAL */}
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
                              <span className="text-xs font-black text-indigo-600">{product.priceText}</span>
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

                {/* 2. SECCIÓN: PRODUCTOS DIRECTOS DE AMAZON ESPAÑA EN TIEMPO REAL */}
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
                              <span className="text-xs font-black text-amber-700">{item.priceText}</span>
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

                {/* 3. ESTADO DE CARGA SI ESTÁ CONSULTANDO AMAZON */}
                {isLoadingAmazon && amazonResults.length === 0 && (
                  <div className="p-4 text-center text-xs text-slate-500 flex items-center justify-center gap-2">
                    <Loader2 className="w-4 h-4 text-indigo-500 animate-spin" />
                    <span>Buscando &quot;{searchQuery}&quot; en Amazon España...</span>
                  </div>
                )}

                {/* 4. SI NO HAY NINGÚN RESULTADO */}
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

                {/* 5. BARRA DE ACCIÓN INFERIOR */}
                {hasAnyResults && (
                  <div className="p-2.5 bg-slate-50 border-t border-slate-100 flex flex-col sm:flex-row gap-2">
                    {liveMatches.length > 0 && (
                      <button
                        type="button"
                        onClick={handleSearchSubmit}
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

        </div>
      </div>
    </header>
  );
}
