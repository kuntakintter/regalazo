'use client';

import React, { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Search, X, ExternalLink, ArrowRight, Star, Loader2, ShoppingBag, ChevronDown } from 'lucide-react';
import BrandLogo from '@/components/BrandLogo';
import LanguageSelector from '@/components/LanguageSelector';
import VotingOnboardingTooltip from '@/components/VotingOnboardingTooltip';
import { useCurrency } from '@/context/CurrencyContext';
import { useVoting } from '@/context/VotingContext';
import { Product } from '@/data/products';
import { getAmazonSearchUrl } from '@/lib/amazon';

export interface AmazonLiveItem {
  asin: string;
  title: string;
  imageUrl: string | null;
  priceText: string;
  rating: number;
  url: string;
}

export const AGE_DROPDOWN_ITEMS = [
  { label: 'Recién Nacidos', range: '0-12 meses', slug: 'bebes-0-a-12-meses', icon: '🧸', desc: 'Cunas, cochecitos, tartas de pañales' },
  { label: 'Primeros Pasos', range: '1 a 3 años', slug: 'ninos-1-a-3-anos', icon: '🧩', desc: 'Montessori, triciclos, torres de madera' },
  { label: 'Infantil y Creatividad', range: '4 a 6 años', slug: 'ninos-4-a-6-anos', icon: '🎨', desc: 'Mario Kart, patinetes LED, disfraces' },
  { label: 'Primaria y Acción', range: '7 a 9 años', slug: 'ninos-7-a-9-anos', icon: '🎩', desc: 'Scalextric, LEGO Creator, Magia Borrás' },
  { label: 'Preadolescentes', range: '10 a 12 años', slug: 'ninos-10-a-12-anos', icon: '🚀', desc: 'Juego Virus!, minidrones, robótica' },
  { label: 'Adolescentes', range: '13 a 15 años', slug: 'jovenes-13-a-15-anos', icon: '🎧', desc: 'Auriculares ANC, Instax, Catan, skincare' },
  { label: 'Jóvenes y Gaming', range: '16 a 18 años', slug: 'jovenes-16-a-18-anos', icon: '⚡', desc: 'PlayStation 5, setup gamer, perfumes' },
  { label: 'Adultos (+18)', range: '+18 años', slug: 'adultos-mas-de-18-anos', icon: '🎯', desc: 'Smartbox, LEGO Icons, smartphones, gourmet' },
  { label: 'Revelación de Género', range: 'Baby Shower', slug: 'fiesta-revelacion-genero', icon: '🎈', desc: 'Cañones confeti, globos enigma, humo holi' },
];

interface HeaderMobileProps {
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

export default function HeaderMobile({
  searchQuery,
  onSearchChange,
  onSearchSubmit,
  clearSearch,
  isFocused,
  setIsFocused,
  liveMatches,
  amazonResults,
  isLoadingAmazon,
}: HeaderMobileProps) {
  const { formatPrice } = useCurrency();
  const { voteItems, setIsDrawerOpen } = useVoting();
  const [isAgesOpen, setIsAgesOpen] = useState(false);
  const agesDropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (agesDropdownRef.current && !agesDropdownRef.current.contains(event.target as Node)) {
        setIsAgesOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const amazonSearchUrl = getAmazonSearchUrl(searchQuery.trim() || 'regalos');

  const hasAnyResults = liveMatches.length > 0 || amazonResults.length > 0;

  return (
    <div className="w-full overflow-hidden select-none">
      {/* 1. BARRA PRINCIPAL MÓVIL (DEEP NAVY AMAZON) */}
      <div className="bg-[#131921] text-white px-3 py-2">
        {/* FILA 1: LOGO + ACCIONES DERECHA (VOTACIÓN Y SELECTOR DE IDIOMA/MONEDA) */}
        <div className="flex items-center justify-between gap-2">
          {/* Logo */}
          <div className="shrink-0">
            <BrandLogo variant="light" size="compact" />
          </div>

          {/* Acciones Derecha: Votación en Grupo e Idioma/Moneda */}
          <div className="flex items-center gap-1.5 shrink-0">
            {/* Botón de Votación en Grupo */}
            <button
              type="button"
              onClick={() => setIsDrawerOpen(true)}
              className="flex items-center gap-1.5 px-3 h-8.5 rounded-xl bg-[#febd69] hover:bg-[#f3a847] text-slate-950 font-black text-xs transition-all shadow-sm cursor-pointer group active:scale-95 shrink-0 border border-amber-400"
              title="Votación de Regalos en Grupo"
              aria-label="Abrir lista de votación de regalos"
            >
              <span className="text-base leading-none">🗳️</span>
              <span className="font-extrabold text-xs tracking-normal text-slate-950">Votar</span>
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

            {/* Selector de Idioma y Moneda */}
            <LanguageSelector dark={true} />

            {/* Smart Mobile Onboarding Callout */}
            <VotingOnboardingTooltip variant="mobile" />
          </div>
        </div>

        {/* FILA 2: BARRA DE BÚSQUEDA COMPLETA CON LUPA INTEGRADA */}
        <div className="mt-2 relative">
          <form
            onSubmit={onSearchSubmit}
            className="relative flex items-center rounded-xl overflow-hidden shadow-inner focus-within:ring-2 focus-within:ring-[#febd69] transition-all bg-white border border-slate-200"
          >
            <Search className="w-4 h-4 text-slate-400 ml-3 shrink-0" />

            <input
              type="text"
              value={searchQuery}
              onFocus={() => setIsFocused(true)}
              onChange={(e) => {
                onSearchChange?.(e.target.value);
                setIsFocused(true);
              }}
              placeholder="Buscar regalo: Lego, zapatillas, perfumes, PS5..."
              className="w-full px-2.5 py-2 text-xs text-slate-900 placeholder-slate-400 focus:outline-none bg-transparent"
            />

            {/* Iconos de Limpiar y Botón Lupa */}
            <div className="flex items-center shrink-0">
              {isLoadingAmazon && (
                <Loader2 className="w-3.5 h-3.5 text-slate-400 animate-spin mr-1.5" />
              )}
              {searchQuery.trim().length > 0 && (
                <button
                  type="button"
                  onClick={clearSearch}
                  aria-label="Borrar búsqueda"
                  className="p-1 mr-1 rounded-full text-slate-400 hover:text-slate-700 hover:bg-slate-200 transition-colors cursor-pointer"
                  title="Borrar búsqueda"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              )}
              <button
                type="submit"
                aria-label="Buscar regalo"
                className="bg-[#febd69] hover:bg-[#f3a847] active:bg-[#e47911] text-slate-950 px-3.5 py-2.5 flex items-center justify-center transition-colors cursor-pointer shrink-0"
              >
                <Search className="w-4 h-4 stroke-[2.5]" />
              </button>
            </div>
          </form>

          {/* AUTOCOMPLETE DROPDOWN MÓVIL A PANTALLA COMPLETA */}
          {isFocused && searchQuery.trim().length >= 2 && (
            <div className="absolute top-full left-0 right-0 mt-2 bg-white rounded-2xl shadow-2xl border border-slate-200 overflow-hidden z-50 animate-in fade-in slide-in-from-top-2 duration-150 max-h-[75vh] overflow-y-auto">
              
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
                        className="p-3 hover:bg-indigo-50/60 transition-colors flex items-center gap-2.5 cursor-pointer"
                      >
                        <div className="relative w-11 h-11 rounded-lg bg-slate-50 shrink-0 overflow-hidden border border-slate-200">
                          <Image
                            src={product.imageUrl}
                            alt={product.title}
                            fill
                            className="object-contain p-1"
                          />
                        </div>
                        <div className="flex-1 min-w-0">
                          <h4 className="text-xs font-bold text-slate-900 truncate">
                            {product.title}
                          </h4>
                          <div className="flex items-center gap-2 mt-0.5">
                            <span className="text-xs font-black text-indigo-600">{formatPrice(product.priceText)}</span>
                            <span className="text-[10px] text-slate-400 flex items-center gap-0.5">
                              <Star className="w-3 h-3 text-amber-400 fill-amber-400" />
                              {product.rating}
                            </span>
                          </div>
                        </div>
                        <ArrowRight className="w-4 h-4 text-slate-300 shrink-0" />
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
                      <span>En Vivo Amazon.es</span>
                    </div>
                    <span className="text-[9px] bg-amber-200 text-amber-900 px-1.5 py-0.5 rounded-full font-black">
                      Al minuto
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
                              unoptimized
                              className="object-contain p-1"
                            />
                          ) : (
                            <div className="w-full h-full flex items-center justify-center bg-slate-100 text-slate-400">
                              <ShoppingBag className="w-4 h-4" />
                            </div>
                          )}
                        </div>
                        <div className="flex-1 min-w-0">
                          <h4 className="text-xs font-bold text-slate-900 line-clamp-1">
                            {item.title}
                          </h4>
                          <div className="flex items-center gap-2 mt-0.5">
                            <span className="text-xs font-black text-amber-700">{formatPrice(item.priceText)}</span>
                            <span className="text-[10px] px-1.5 py-0.5 rounded bg-emerald-50 text-emerald-700 font-bold border border-emerald-200/60">
                              Prime
                            </span>
                          </div>
                        </div>
                        <div className="flex items-center gap-1 px-2 py-1 rounded-lg bg-amber-100 text-amber-900 text-[11px] font-bold shrink-0">
                          <span>Ver</span>
                          <ExternalLink className="w-3 h-3" />
                        </div>
                      </a>
                    ))}
                  </div>
                </div>
              )}

              {/* Botón de acción */}
              {hasAnyResults && (
                <div className="p-2.5 bg-slate-50 border-t border-slate-100">
                  <a
                    href={amazonSearchUrl}
                    target="_blank"
                    rel="noopener noreferrer sponsored"
                    className="w-full flex items-center justify-center gap-1.5 py-2 px-3 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 text-slate-950 text-xs font-black shadow-xs"
                  >
                    <span>Ver más en Amazon.es</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      {/* 2. SUB-NAV MENÚ MÓVIL (DESPLAZABLE HORIZONTALMENTE) */}
      <div className="bg-[#1f2833] text-white border-t border-slate-700/60 shadow-inner px-3 py-2">
        <div className="flex items-center gap-1.5 overflow-x-auto scrollbar-none text-xs">
          {/* Dropdown Por Edades */}
          <div ref={agesDropdownRef} className="relative shrink-0">
            <button
              type="button"
              onClick={() => setIsAgesOpen((prev) => !prev)}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold transition-all whitespace-nowrap shadow-2xs ${
                isAgesOpen
                  ? 'bg-[#febd69] text-slate-950 shadow-md ring-2 ring-amber-300/40'
                  : 'bg-amber-400/15 text-amber-300 border border-amber-400/30'
              }`}
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
              <>
                <div
                  className="fixed inset-0 z-40 bg-black/40"
                  onClick={() => setIsAgesOpen(false)}
                />
                <div className="fixed inset-x-3 top-24 w-auto bg-white text-slate-900 rounded-2xl shadow-2xl border border-slate-200 z-50 overflow-hidden animate-in fade-in zoom-in-95 duration-150">
                  <div className="px-4 py-3 bg-gradient-to-r from-amber-500/10 via-amber-50 to-orange-50/50 border-b border-amber-100 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="text-base">🎁</span>
                      <h3 className="text-xs font-black text-slate-900">
                        Regalos por Rango de Edad
                      </h3>
                    </div>
                    <button
                      type="button"
                      onClick={() => setIsAgesOpen(false)}
                      className="p-1 rounded-lg text-slate-400 hover:text-slate-700"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>

                  <div className="p-3 grid grid-cols-1 gap-2 max-h-[60vh] overflow-y-auto">
                    {AGE_DROPDOWN_ITEMS.map((item) => (
                      <Link
                        key={item.slug}
                        href={`/${item.slug}`}
                        onClick={() => setIsAgesOpen(false)}
                        className="flex items-center gap-2.5 p-2 rounded-xl hover:bg-amber-50/70 border border-slate-100"
                      >
                        <span className="text-xl p-1 rounded-lg bg-slate-50 shrink-0">
                          {item.icon}
                        </span>
                        <div className="min-w-0 flex-1">
                          <span className="text-xs font-bold text-slate-900 truncate block">
                            {item.label}
                          </span>
                          <span className="text-[10px] text-amber-700 font-bold">
                            {item.range}
                          </span>
                        </div>
                      </Link>
                    ))}
                  </div>
                </div>
              </>
            )}
          </div>

          <Link
            href="/motoristas"
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/5 border border-white/10 text-slate-100 font-medium text-xs whitespace-nowrap shrink-0"
          >
            <span>🏍️</span>
            <span>Motoristas</span>
          </Link>

          <Link
            href="/gaming"
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/5 border border-white/10 text-slate-100 font-medium text-xs whitespace-nowrap shrink-0"
          >
            <span>🎮</span>
            <span>Gaming</span>
          </Link>

          <Link
            href="/amantes-del-cafe"
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/5 border border-white/10 text-slate-100 font-medium text-xs whitespace-nowrap shrink-0"
          >
            <span>☕</span>
            <span>Café Barista</span>
          </Link>

          <Link
            href="/mascotas"
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/5 border border-white/10 text-slate-100 font-medium text-xs whitespace-nowrap shrink-0"
          >
            <span>🐾</span>
            <span>Mascotas</span>
          </Link>

          <Link
            href="/automovil"
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/5 border border-white/10 text-slate-100 font-medium text-xs whitespace-nowrap shrink-0"
          >
            <span>🚗</span>
            <span>Automóvil</span>
          </Link>

          <Link
            href="/ciclismo"
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/5 border border-white/10 text-slate-100 font-medium text-xs whitespace-nowrap shrink-0"
          >
            <span>🚴</span>
            <span>Ciclismo</span>
          </Link>

          <Link
            href="/?categoria=cartas-pokemon#catalogo-productos"
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-amber-400/10 border border-amber-400/30 text-amber-200 font-semibold text-xs whitespace-nowrap shrink-0"
          >
            <span>⚡</span>
            <span>Pokémon</span>
          </Link>

          <Link
            href="/navidad"
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-emerald-500/15 border border-emerald-400/30 text-emerald-200 font-semibold text-xs whitespace-nowrap shrink-0"
          >
            <span>🎄</span>
            <span>Navidad</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
