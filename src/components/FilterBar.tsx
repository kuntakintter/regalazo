'use client';

import React from 'react';
import { AGE_CATEGORIES, AGE_SUBCATEGORIES_MAP, PRICE_FILTERS } from '@/data/products';
import { Filter, X, Sparkles, Check } from 'lucide-react';

interface FilterBarProps {
  selectedAge: string;
  onSelectAge: (age: string) => void;
  selectedCategory: string;
  onSelectCategory: (cat: string) => void;
  selectedGender: 'all' | 'boy' | 'girl';
  onSelectGender: (gender: 'all' | 'boy' | 'girl') => void;
  selectedPrice: string;
  onSelectPrice: (price: string) => void;
  totalResults: number;
}

export default function FilterBar({
  selectedAge,
  onSelectAge,
  selectedCategory,
  onSelectCategory,
  selectedGender,
  onSelectGender,
  selectedPrice,
  onSelectPrice,
  totalResults
}: FilterBarProps) {
  const hasActiveFilters = selectedAge !== 'all' || selectedCategory !== 'all' || selectedPrice !== 'all' || selectedGender !== 'all';

  // Subcategorías específicas para la edad seleccionada (nunca mezcladas)
  const availableSubcategories = AGE_SUBCATEGORIES_MAP[selectedAge] || AGE_SUBCATEGORIES_MAP['all'];

  const resetFilters = () => {
    onSelectAge('all');
    onSelectCategory('all');
    onSelectGender('all');
    onSelectPrice('all');
  };

  return (
    <div className="rounded-2xl p-4 sm:p-6 mb-8 border border-slate-200 bg-white text-slate-900 shadow-sm transition-all">
      
      {/* 1. Gender Filter: Chico / Chica / Todos */}
      <div className="mb-5 pb-4 border-b border-slate-100">
        <label className="text-xs font-bold uppercase tracking-wider text-slate-500 flex items-center gap-1.5 mb-2.5">
          <Sparkles className="w-3.5 h-3.5 text-indigo-500" />
          1. ¿Para quién es el regalo?
        </label>
        <div className="flex items-center gap-2 flex-wrap">
          {[
            { id: 'all', label: 'Todos / Indiferente', icon: '🎁' },
            { id: 'boy', label: 'Para Chico / Niño', icon: '👦' },
            { id: 'girl', label: 'Para Chica / Niña', icon: '👧' },
          ].map((g) => (
            <button
              key={g.id}
              onClick={() => onSelectGender(g.id as any)}
              className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all flex items-center gap-2 border ${
                selectedGender === g.id
                  ? 'bg-indigo-600 text-white border-indigo-600 shadow-sm'
                  : 'bg-slate-50 border-slate-200 text-slate-700 hover:bg-slate-100 hover:text-slate-900'
              }`}
            >
              <span className="text-base">{g.icon}</span>
              <span>{g.label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* 2. Age Selector Tabs */}
      <div className="mb-4">
        <div className="flex items-center justify-between mb-2.5">
          <label className="text-xs font-bold uppercase tracking-wider text-slate-500 flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5 text-amber-500" />
            2. Selecciona la Edad:
          </label>
          <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-indigo-50 text-indigo-700">
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
                ? 'bg-slate-900 text-white border-slate-900 shadow-sm'
                : 'border-slate-200 bg-slate-50 text-slate-700 hover:bg-slate-100'
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
              className={`px-3.5 py-2 rounded-xl text-xs sm:text-sm font-semibold whitespace-nowrap transition-all flex items-center gap-1.5 border ${
                selectedAge === cat.id
                  ? 'bg-indigo-600 text-white border-indigo-600 shadow-sm'
                  : 'border-slate-200 bg-slate-50 text-slate-700 hover:bg-slate-100'
              }`}
            >
              <span>{cat.icon}</span>
              <span>{cat.label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* 3. Quick Subcategory Pills matching strictly this age */}
      <div className="mb-4">
        <label className="text-[11px] font-bold uppercase tracking-wider text-slate-400 block mb-2">
          3. Tipo de Regalo ({selectedAge === '0-12m' ? 'Exclusivo Bebés' : selectedAge === 'all' ? 'Populares' : 'Para esta edad'}):
        </label>
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-thin flex-wrap">
          <button
            onClick={() => onSelectCategory('all')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
              selectedCategory === 'all'
                ? 'bg-slate-900 text-white shadow-xs'
                : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
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
                  : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
              }`}
            >
              {subcat}
            </button>
          ))}
        </div>
      </div>

      {/* 4. Price Filter + Reset */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-3 border-t border-slate-100">
        
        {/* Price Range */}
        <div>
          <label className="text-[11px] font-bold uppercase tracking-wider text-slate-400 block mb-1.5">
            Presupuesto Máximo
          </label>
          <select
            value={selectedPrice}
            onChange={(e) => onSelectPrice(e.target.value)}
            className="w-full text-xs sm:text-sm rounded-xl py-2 px-3 border border-slate-200 bg-slate-50 text-slate-800 hover:bg-white outline-none font-medium cursor-pointer transition-colors"
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
              className="w-full py-2 px-3 rounded-xl text-xs font-semibold flex items-center justify-center gap-1.5 border border-dashed border-rose-300 text-rose-600 hover:bg-rose-50 transition-colors"
            >
              <X className="w-3.5 h-3.5" />
              Limpiar filtros aplicados
            </button>
          ) : (
            <div className="text-[11px] text-slate-400 flex items-center gap-1 px-2 py-2">
              <Check className="w-3.5 h-3.5 text-emerald-500" />
              Explorando recomendaciones activas
            </div>
          )}
        </div>

      </div>
    </div>
  );
}
