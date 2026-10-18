'use client';

import React from 'react';
import { AGE_CATEGORIES, AGE_SUBCATEGORIES_MAP, PRICE_FILTERS } from '@/data/products';
import { Filter, X, Sparkles, Check, ChevronRight } from 'lucide-react';

interface FilterBarProps {
  selectedAge: string;
  onSelectAge: (age: string) => void;
  selectedCategory: string;
  onSelectCategory: (cat: string) => void;
  selectedPrice: string;
  onSelectPrice: (price: string) => void;
  currentTheme: string;
  totalResults: number;
}

export default function FilterBar({
  selectedAge,
  onSelectAge,
  selectedCategory,
  onSelectCategory,
  selectedPrice,
  onSelectPrice,
  currentTheme,
  totalResults
}: FilterBarProps) {
  const isDark = currentTheme === 'emo' || currentTheme === 'gamer';

  const hasActiveFilters = selectedAge !== 'all' || selectedCategory !== 'all' || selectedPrice !== 'all';

  // Subcategorías específicas para la edad seleccionada (nunca mezcladas)
  const availableSubcategories = AGE_SUBCATEGORIES_MAP[selectedAge] || AGE_SUBCATEGORIES_MAP['all'];

  const resetFilters = () => {
    onSelectAge('all');
    onSelectCategory('all');
    onSelectPrice('all');
  };

  return (
    <div className={`rounded-2xl p-4 sm:p-6 mb-8 border transition-all shadow-sm ${
      currentTheme === 'emo'
        ? 'bg-neutral-900/80 border-neutral-800 text-neutral-100 shadow-rose-950/20'
        : currentTheme === 'gamer'
        ? 'bg-slate-900/80 border-purple-900/60 text-slate-100 shadow-purple-950/20'
        : currentTheme === 'baby'
        ? 'bg-white/80 border-rose-200 text-rose-950 shadow-rose-100/50'
        : 'bg-white border-slate-200 text-slate-900 shadow-slate-100'
    }`}>
      {/* 1. Age Selector Tabs */}
      <div className="mb-4">
        <div className="flex items-center justify-between mb-2.5">
          <label className="text-xs font-bold uppercase tracking-wider opacity-70 flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5 text-amber-500" />
            1. Selecciona la Edad:
          </label>
          <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-indigo-50 dark:bg-neutral-800 text-indigo-600 dark:text-indigo-400">
            {totalResults} ideas recomendadas
          </span>
        </div>

        <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-thin">
          <button
            onClick={() => {
              onSelectAge('all');
              onSelectCategory('all');
            }}
            className={`px-3.5 py-2 rounded-xl text-xs sm:text-sm font-semibold whitespace-nowrap transition-all border ${
              selectedAge === 'all'
                ? currentTheme === 'emo'
                  ? 'bg-rose-700 text-white border-rose-600 shadow-md'
                  : 'bg-indigo-600 text-white border-indigo-600 shadow-md'
                : 'border-transparent bg-black/5 dark:bg-white/5 hover:bg-black/10'
            }`}
          >
            🌟 Todas las Edades (0 a 18)
          </button>

          {AGE_CATEGORIES.map((cat) => (
            <button
              key={cat.id}
              onClick={() => {
                onSelectAge(cat.id);
                onSelectCategory('all');
              }}
              className={`px-3 py-2 rounded-xl text-xs sm:text-sm font-semibold whitespace-nowrap transition-all flex items-center gap-1.5 border ${
                selectedAge === cat.id
                  ? cat.id === '16-18'
                    ? 'bg-neutral-800 text-rose-300 border-rose-500/80 shadow-md'
                    : cat.id === '0-12m'
                    ? 'bg-pink-500 text-white border-pink-400 shadow-md'
                    : 'bg-indigo-600 text-white border-indigo-500 shadow-md'
                  : 'border-transparent bg-black/5 dark:bg-white/5 hover:bg-black/10'
              }`}
            >
              <span>{cat.icon}</span>
              <span>{cat.label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* 2. Quick Subcategory Pills matching strictly this age */}
      <div className="mb-4">
        <label className="text-[11px] font-bold uppercase tracking-wider opacity-60 block mb-2">
          2. Filtrar por Tipo de Regalo ({selectedAge === '0-12m' ? 'Exclusivo Bebés' : selectedAge === 'all' ? 'Populares' : 'Para esta edad'}):
        </label>
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-thin flex-wrap">
          <button
            onClick={() => onSelectCategory('all')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
              selectedCategory === 'all'
                ? 'bg-slate-900 dark:bg-white text-white dark:text-slate-900 shadow-xs'
                : 'bg-black/5 dark:bg-white/5 hover:bg-black/10 opacity-80 hover:opacity-100'
            }`}
          >
            Todas las opciones
          </button>
          {availableSubcategories.map((subcat) => (
            <button
              key={subcat}
              onClick={() => onSelectCategory(subcat)}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                selectedCategory === subcat
                  ? 'bg-indigo-600 text-white font-bold shadow-xs'
                  : 'bg-black/5 dark:bg-white/5 hover:bg-black/10 opacity-80 hover:opacity-100'
              }`}
            >
              {subcat}
            </button>
          ))}
        </div>
      </div>

      {/* 3. Price Filter + Reset */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-3 border-t border-black/5 dark:border-white/10">
        
        {/* Price Range */}
        <div>
          <label className="text-[11px] font-bold uppercase tracking-wider opacity-60 block mb-1.5">
            Presupuesto Máximo
          </label>
          <select
            value={selectedPrice}
            onChange={(e) => onSelectPrice(e.target.value)}
            className={`w-full text-xs sm:text-sm rounded-xl py-2 px-3 border outline-none font-medium cursor-pointer transition-colors ${
              isDark
                ? 'bg-neutral-800 border-neutral-700 text-white'
                : 'bg-slate-50 border-slate-200 text-slate-800 hover:bg-white'
            }`}
          >
            {PRICE_FILTERS.map((p) => (
              <option key={p.id} value={p.id}>{p.label}</option>
            ))}
          </select>
        </div>

        {/* Action button: Reset */}
        <div className="flex items-end">
          {hasActiveFilters ? (
            <button
              onClick={resetFilters}
              className="w-full py-2 px-3 rounded-xl text-xs font-semibold flex items-center justify-center gap-1.5 border border-dashed border-rose-300 text-rose-600 dark:text-rose-400 hover:bg-rose-50 dark:hover:bg-rose-950/30 transition-colors"
            >
              <X className="w-3.5 h-3.5" />
              Limpiar filtros aplicados
            </button>
          ) : (
            <div className="text-[11px] opacity-50 flex items-center gap-1 px-2 py-2">
              <Check className="w-3.5 h-3.5 text-emerald-500" />
              Explorando recomendaciones activas
            </div>
          )}
        </div>

      </div>
    </div>
  );
}
