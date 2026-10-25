'use client';

import React from 'react';
import { ExternalLink, ShoppingBag, ShieldCheck, Star, Loader2, ArrowDown } from 'lucide-react';
import { AMAZON_AFFILIATE_TAG } from '@/data/products';

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
  // Determine contextual search term
  let displayTitle = '¿Buscas más opciones y ofertas?';
  let searchTerm = 'regalos recomendados';

  if (searchQuery.trim().length > 0) {
    displayTitle = `¿Buscas más resultados de "${searchQuery.trim()}"?`;
    searchTerm = searchQuery.trim();
  } else if (selectedCategory && selectedCategory !== 'all') {
    displayTitle = `¿Quieres ver más regalos de "${selectedCategory}"?`;
    searchTerm = selectedCategory;
  } else if (selectedAge && selectedAge !== 'all') {
    displayTitle = `¿Buscas más opciones para esta edad?`;
    searchTerm = `regalos para ${selectedAge} anos`;
  }

  const amazonSearchUrl = `https://www.amazon.es/s?k=${encodeURIComponent(searchTerm)}&tag=${AMAZON_AFFILIATE_TAG}`;

  return (
    <article className="flex flex-col rounded-3xl overflow-hidden border border-amber-300/80 bg-gradient-to-br from-amber-500/10 via-white to-amber-500/5 shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-1 relative group">
      {/* Top Banner Tag */}
      <div className="bg-gradient-to-r from-amber-500 to-amber-600 px-4 py-2 flex items-center justify-between text-slate-950 font-black text-[11px] uppercase tracking-wider shadow-xs">
        <div className="flex items-center gap-1.5">
          <ShoppingBag className="w-3.5 h-3.5" />
          <span>Catálogo Abierto Amazon.es</span>
        </div>
        <span className="bg-black/15 text-slate-950 px-2 py-0.5 rounded-full text-[10px] font-extrabold">
          En directo
        </span>
      </div>

      <div className="p-6 sm:p-7 flex-1 flex flex-col justify-between">
        <div>
          {/* Amazon Badge */}
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-amber-100 text-amber-900 border border-amber-200 mb-4">
            <ShoppingBag className="w-3.5 h-3.5 text-amber-600" />
            <span>Conexión en directo con Amazon</span>
          </div>

          <h3 className="text-xl font-black text-slate-900 leading-tight mb-3 group-hover:text-amber-700 transition-colors">
            {displayTitle}
          </h3>

          <p className="text-xs sm:text-sm text-slate-600 leading-relaxed mb-4">
            Carga productos actualizados al momento directamente en esta cuadrícula con precios, valoraciones y disponibilidad oficial de <strong>Amazon España</strong>.
          </p>

          <div className="space-y-2 mb-6">
            <div className="flex items-center gap-2 text-xs text-slate-700 font-medium">
              <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
              <span>Garantía de devolución oficial de 30 días</span>
            </div>
            <div className="flex items-center gap-2 text-xs text-slate-700 font-medium">
              <Star className="w-4 h-4 text-amber-500 fill-amber-500 shrink-0" />
              <span>Millones de opiniones y valoraciones verificadas</span>
            </div>
          </div>
        </div>

        {/* CTA Buttons */}
        <div>
          {onLoadLiveToGrid ? (
            <div className="space-y-2">
              <button
                type="button"
                onClick={onLoadLiveToGrid}
                disabled={isLoadingLive}
                className="w-full py-3.5 px-5 rounded-2xl bg-gradient-to-r from-amber-500 via-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-slate-950 font-black text-sm flex items-center justify-center gap-2 shadow-md hover:shadow-lg hover:shadow-amber-500/25 transition-all group-hover:scale-102 cursor-pointer disabled:opacity-75"
              >
                {isLoadingLive ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin text-slate-950" />
                    <span>Buscando en Amazon...</span>
                  </>
                ) : (
                  <>
                    <ShoppingBag className="w-4 h-4 text-slate-950" />
                    <span>{hasLoadedLive ? 'Cargar más en esta cuadrícula' : 'Ver productos en directo aquí'}</span>
                    <ArrowDown className="w-4 h-4 text-slate-950" />
                  </>
                )}
              </button>

              <a
                href={amazonSearchUrl}
                target="_blank"
                rel="noopener noreferrer sponsored"
                className="w-full py-2 px-3 rounded-xl text-xs font-semibold text-center block text-slate-600 hover:text-slate-900 hover:underline transition-all"
              >
                O abrir búsqueda en Amazon.es →
              </a>
            </div>
          ) : (
            <a
              href={amazonSearchUrl}
              target="_blank"
              rel="noopener noreferrer sponsored"
              className="w-full py-3.5 px-5 rounded-2xl bg-gradient-to-r from-amber-500 via-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-slate-950 font-black text-sm flex items-center justify-center gap-2 shadow-md hover:shadow-lg hover:shadow-amber-500/25 transition-all group-hover:scale-102 cursor-pointer"
            >
              <span>Ver todo en Amazon España</span>
              <ExternalLink className="w-4 h-4 text-slate-900" />
            </a>
          )}
          <span className="block text-center text-[10px] text-slate-400 mt-2 font-medium">
            Precios y stock actualizados en tiempo real
          </span>
        </div>
      </div>
    </article>
  );
}
