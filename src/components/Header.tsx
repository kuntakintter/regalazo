'use client';

import React, { useState, useRef, useEffect, useMemo } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Gift, Search, X, ExternalLink, ArrowRight, Star } from 'lucide-react';
import { PRODUCTS, AMAZON_AFFILIATE_TAG } from '@/data/products';
import { matchesSearchQuery } from '@/utils/search';

interface HeaderProps {
  currentTheme?: 'baby' | 'kids' | 'gamer' | 'emo' | 'tech' | 'classic';
  onThemeChange?: (theme: 'baby' | 'kids' | 'gamer' | 'emo' | 'tech' | 'classic') => void;
  onSearchChange?: (query: string) => void;
  searchQuery?: string;
}

export default function Header({ currentTheme = 'classic', onThemeChange, onSearchChange, searchQuery = '' }: HeaderProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isFocused, setIsFocused] = useState(false);
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

  // Filter matching products for live suggestions
  const liveMatches = useMemo(() => {
    if (!searchQuery || searchQuery.trim().length < 2) return [];
    return PRODUCTS.filter((p) => matchesSearchQuery(p, searchQuery)).slice(0, 4);
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
    setIsFocused(false);
  };

  const amazonSearchUrl = `https://www.amazon.es/s?k=${encodeURIComponent(
    searchQuery.trim() || 'regalos infantiles'
  )}&tag=${AMAZON_AFFILIATE_TAG}`;

  return (
    <header className="sticky top-0 z-50 backdrop-blur-md transition-colors duration-300 border-b bg-white/95 border-slate-200 text-slate-900 shadow-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 gap-4">
          
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2.5 shrink-0 group">
            <div className="w-10 h-10 rounded-2xl flex items-center justify-center shadow-lg transition-transform group-hover:scale-110 bg-gradient-to-br from-amber-500 via-rose-500 to-indigo-600 text-white shadow-indigo-200">
              <Gift className="w-5 h-5 animate-pulse" />
            </div>
            <div>
              <div className="flex items-center gap-1">
                <span className="text-xl font-black tracking-tight block leading-none">
                  REGAL<span className="text-indigo-600">AZO</span>
                </span>
                <span className="text-amber-500 text-xs font-black">⚡</span>
              </div>
              <span className="text-[10px] tracking-wider uppercase font-extrabold opacity-60">0 a 18 Años</span>
            </div>
          </Link>

          {/* Quick Search Bar with Live Suggestions Dropdown */}
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
                placeholder="Buscar Scalextric, PS5, LEGO, pañales, magia..."
                className="w-full pl-10 pr-20 py-2.5 text-sm rounded-full border border-slate-200 bg-slate-50 text-slate-800 placeholder-slate-400 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-100 outline-none transition-all"
              />

              {/* Action Buttons inside Input */}
              <div className="absolute right-2 flex items-center gap-1">
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
              <div className="absolute top-full left-0 right-0 mt-2 bg-white rounded-2xl shadow-2xl border border-slate-200 overflow-hidden z-50 animate-in fade-in slide-in-from-top-2 duration-150">
                {liveMatches.length > 0 ? (
                  <div>
                    <div className="p-2.5 bg-slate-50 border-b border-slate-100 flex items-center justify-between text-[11px] font-bold text-slate-500 uppercase tracking-wider">
                      <span>Sugerencias en catálogo verificado</span>
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
                          <div className="relative w-12 h-12 rounded-lg bg-slate-100 shrink-0 overflow-hidden border border-slate-200">
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
                              <span className="text-[10px] px-1.5 py-0.2 rounded bg-slate-100 text-slate-600 font-medium truncate">
                                {product.category}
                              </span>
                            </div>
                          </div>
                          <ArrowRight className="w-4 h-4 text-slate-300 group-hover:text-indigo-600 group-hover:translate-x-0.5 transition-all shrink-0" />
                        </div>
                      ))}
                    </div>

                    {/* Bottom Actions */}
                    <div className="p-2.5 bg-slate-50 border-t border-slate-100 flex flex-col sm:flex-row gap-2">
                      <button
                        type="button"
                        onClick={handleSearchSubmit}
                        className="flex-1 text-center py-2 px-3 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold transition-colors cursor-pointer"
                      >
                        Ver todos los resultados en el catálogo
                      </button>
                      <a
                        href={amazonSearchUrl}
                        target="_blank"
                        rel="nofollow noopener noreferrer"
                        className="flex items-center justify-center gap-1.5 py-2 px-3 rounded-xl bg-amber-500 hover:bg-amber-600 text-slate-950 text-xs font-bold transition-colors"
                      >
                        <span>Buscar en Amazon</span>
                        <ExternalLink className="w-3.5 h-3.5" />
                      </a>
                    </div>
                  </div>
                ) : (
                  <div className="p-4 text-center">
                    <p className="text-xs text-slate-600 mb-3">
                      No encontramos coincidencias exactas para &quot;<strong>{searchQuery}</strong>&quot; en las recomendaciones locales.
                    </p>
                    <a
                      href={amazonSearchUrl}
                      target="_blank"
                      rel="nofollow noopener noreferrer"
                      className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold text-xs transition-colors shadow-sm"
                    >
                      <span>Buscar &quot;{searchQuery}&quot; en Amazon España</span>
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
