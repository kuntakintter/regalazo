'use client';

import React, { useState } from 'react';
import { getAmazonSearchUrl } from '@/lib/amazon';
import { Search, ExternalLink, Sparkles, ShoppingCart, ArrowRight } from 'lucide-react';

interface AmazonLiveSearchCardProps {
  currentTheme: string;
  initialQuery?: string;
  selectedPrice?: string;
}

export default function AmazonLiveSearchCard({
  currentTheme,
  initialQuery = '',
  selectedPrice = 'all'
}: AmazonLiveSearchCardProps) {
  const [customTerm, setCustomTerm] = useState(initialQuery);
  const [activeBudget, setActiveBudget] = useState(selectedPrice);

  // Sync with prop when search input in header changes
  React.useEffect(() => {
    if (initialQuery) {
      setCustomTerm(initialQuery);
    }
  }, [initialQuery]);

  const queryToSearch = (customTerm.trim() || initialQuery.trim() || 'regalos originales ninos jovenes');
  
  // Construct destination URL with affiliate tag vapegadgets22-21
  const amazonSearchUrl = getAmazonSearchUrl(
    activeBudget !== 'all' 
      ? `${queryToSearch} ${activeBudget === '<20' ? 'menos de 20 euros' : activeBudget === '20-50' ? '20 a 50 euros' : activeBudget === '50-100' ? '50 a 100 euros' : 'mas de 100 euros'}`
      : queryToSearch
  );

  const isDark = currentTheme === 'emo' || currentTheme === 'gamer';

  return (
    <div className={`rounded-3xl p-6 sm:p-8 mb-10 border transition-all shadow-md relative overflow-hidden ${
      currentTheme === 'emo'
        ? 'bg-gradient-to-br from-neutral-900 via-neutral-950 to-neutral-900 border-neutral-800 text-neutral-100 shadow-rose-950/20'
        : currentTheme === 'gamer'
        ? 'bg-gradient-to-br from-slate-900 via-indigo-950 to-slate-900 border-purple-900/60 text-slate-100 shadow-purple-950/20'
        : currentTheme === 'baby'
        ? 'bg-gradient-to-br from-white via-pink-50/40 to-amber-50/30 border-rose-200 text-rose-950 shadow-rose-100/40'
        : 'bg-gradient-to-br from-white via-slate-50 to-indigo-50/30 border-slate-200 text-slate-900 shadow-slate-100'
    }`}>
      {/* Decorative background glow */}
      <div className="absolute top-0 right-0 -mt-10 -mr-10 w-48 h-48 rounded-full bg-[#FF9900]/10 blur-3xl pointer-events-none" />

      <div className="max-w-3xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6 relative z-10">
        
        {/* Left: Persuasive Text */}
        <div className="flex-1 text-center md:text-left">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-black bg-amber-400 text-slate-950 shadow-xs mb-3 border border-amber-500/20">
            <ShoppingCart className="w-3.5 h-3.5" />
            <span>Buscador Oficial de Amazon España</span>
          </div>

          <h3 className={`text-lg sm:text-2xl font-black tracking-tight leading-snug mb-1.5 ${
            isDark ? 'text-white' : 'text-slate-900'
          }`}>
            {customTerm ? (
              <span>
                ¿Buscas <span className="text-amber-400">&quot;{customTerm}&quot;</span> en Amazon?
              </span>
            ) : (
              <span>¿Buscas un producto específico en Amazon?</span>
            )}
          </h3>

          <p className={`text-xs sm:text-sm leading-relaxed max-w-xl ${
            isDark ? 'text-slate-300' : 'text-slate-600'
          }`}>
            Encuentra cualquier marca o artículo (ej. <em>One Million, Scalextric, LEGO, PS5, zapatillas</em>) con los mejores precios, opiniones verificadas y envío rápido Prime.
          </p>

          {/* Quick budget pills */}
          <div className="flex flex-wrap items-center justify-center md:justify-start gap-1.5 mt-3">
            <span className={`text-[11px] font-bold ${
              isDark ? 'text-slate-400' : 'text-slate-500'
            }`}>
              Filtrar por:
            </span>
            {[
              { id: 'all', label: 'Cualquier precio' },
              { id: '<20', label: '< 20 €' },
              { id: '20-50', label: '20 - 50 €' },
              { id: '50-100', label: '50 - 100 €' },
              { id: '>100', label: '> 100 €' }
            ].map(b => (
              <button
                key={b.id}
                onClick={() => setActiveBudget(b.id)}
                className={`px-2.5 py-1 rounded-lg text-[11px] font-bold transition-all border cursor-pointer ${
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
        <div className="w-full md:w-80 flex flex-col gap-2.5 shrink-0">
          <div className="relative">
            <input
              type="text"
              value={customTerm}
              onChange={(e) => setCustomTerm(e.target.value)}
              placeholder="Ej. Colonia One Million, Scalextric..."
              className={`w-full py-2.5 pl-9 pr-3 rounded-xl text-xs sm:text-sm border outline-none font-medium transition-colors ${
                isDark
                  ? 'bg-neutral-800 border-neutral-700 text-white placeholder-neutral-500 focus:border-[#FF9900]'
                  : 'bg-white border-slate-300 text-slate-900 placeholder-slate-400 focus:border-[#FF9900]'
              }`}
            />
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-3 pointer-events-none" />
          </div>

          <a
            href={amazonSearchUrl}
            target="_blank"
            rel="nofollow sponsored noopener noreferrer"
            className="w-full py-3 px-4 rounded-xl font-bold text-xs sm:text-sm bg-[#FF9900] hover:bg-[#ffad33] text-slate-950 shadow-md shadow-amber-500/20 flex items-center justify-center gap-2 transition-transform hover:scale-[1.02] active:scale-[0.98]"
          >
            <span>Ver Resultados en Amazon.es</span>
            <ExternalLink className="w-4 h-4" />
          </a>

          <div className={`text-[10px] text-center font-medium ${
            isDark ? 'text-slate-300' : 'text-slate-500'
          }`}>
            ✓ Compra segura con garantía oficial Amazon.es
          </div>
        </div>

      </div>
    </div>
  );
}
