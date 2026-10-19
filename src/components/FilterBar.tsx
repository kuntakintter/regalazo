'use client';

import React from 'react';
import { AGE_CATEGORIES, AGE_SUBCATEGORIES_MAP } from '@/data/products';
import { Sparkles, X, Check, SlidersHorizontal, RotateCcw } from 'lucide-react';

interface FilterBarProps {
  selectedAge: string;
  onSelectAge: (age: string) => void;
  selectedCategory: string;
  onSelectCategory: (cat: string) => void;
  selectedGender: 'all' | 'boy' | 'girl' | 'reveal';
  onSelectGender: (gender: 'all' | 'boy' | 'girl' | 'reveal') => void;
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
  const hasActiveFilters =
    selectedAge !== 'all' ||
    selectedCategory !== 'all' ||
    selectedPrice !== 'all' ||
    selectedGender !== 'all';

  // Subcategorías específicas para la edad seleccionada
  const availableSubcategories =
    AGE_SUBCATEGORIES_MAP[selectedAge] || AGE_SUBCATEGORIES_MAP['all'];

  const resetFilters = () => {
    onSelectAge('all');
    onSelectCategory('all');
    onSelectGender('all');
    onSelectPrice('all');
  };

  // Convert current selectedPrice to numeric slider value (15 to 150)
  const getSliderValue = (): number => {
    if (selectedPrice === 'all') return 150;
    if (selectedPrice === '<20') return 20;
    if (selectedPrice === '20-50') return 50;
    if (selectedPrice === '50-100') return 100;
    if (selectedPrice === '>100') return 150;
    const num = Number(selectedPrice);
    if (!isNaN(num)) return Math.min(Math.max(num, 15), 150);
    return 150;
  };

  const sliderValue = getSliderValue();

  const handleSliderChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = Number(e.target.value);
    if (val >= 150) {
      onSelectPrice('all');
    } else {
      onSelectPrice(val.toString());
    }
  };

  // Human-readable current budget label
  const getBudgetLabel = () => {
    if (selectedPrice === 'all' || sliderValue >= 150) {
      return 'Cualquier Presupuesto (Sin límite)';
    }
    if (selectedPrice === '<20') return 'Hasta 20 €';
    if (selectedPrice === '20-50') return 'Entre 20 € y 50 €';
    if (selectedPrice === '50-100') return 'Entre 50 € y 100 €';
    if (selectedPrice === '>100') return 'Más de 100 €';
    return `Hasta ${sliderValue} €`;
  };

  return (
    <div className="rounded-3xl p-5 sm:p-7 mb-8 border border-slate-200 bg-white text-slate-900 shadow-sm transition-all space-y-6">
      
      {/* 1. BARRA DE PRESUPUESTO MÁXIMO (SLIDER INTERACTIVO) */}
      <div className="bg-gradient-to-r from-slate-50 via-indigo-50/30 to-purple-50/30 rounded-2xl p-4 sm:p-5 border border-indigo-100/70">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-3">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-xl bg-indigo-600 text-white flex items-center justify-center shadow-xs">
              <SlidersHorizontal className="w-4 h-4" />
            </div>
            <div>
              <span className="text-xs font-black uppercase tracking-wider text-slate-500 block">
                Presupuesto Máximo
              </span>
              <span className="text-sm sm:text-base font-black text-indigo-700">
                {getBudgetLabel()}
              </span>
            </div>
          </div>

          <div className="flex items-center gap-2 self-start sm:self-auto">
            <span className="text-xs font-bold px-3 py-1 rounded-full bg-white text-indigo-700 border border-indigo-200 shadow-xs">
              {totalResults} ideas recomendadas
            </span>
            {hasActiveFilters && (
              <button
                onClick={resetFilters}
                className="text-xs font-bold px-2.5 py-1 rounded-full text-rose-600 hover:bg-rose-50 border border-transparent hover:border-rose-200 transition-colors flex items-center gap-1 cursor-pointer"
                title="Restablecer filtros"
              >
                <RotateCcw className="w-3 h-3" />
                <span>Limpiar</span>
              </button>
            )}
          </div>
        </div>

        {/* Range Slider Track */}
        <div className="relative py-2">
          <input
            type="range"
            min={15}
            max={150}
            step={5}
            value={sliderValue}
            onChange={handleSliderChange}
            className="w-full h-2.5 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-indigo-600 transition-all focus:outline-none"
          />
          {/* Milestone markers below track */}
          <div className="flex justify-between text-[11px] font-bold text-slate-400 mt-1.5 px-0.5">
            <span>15 €</span>
            <span>30 €</span>
            <span>50 €</span>
            <span>75 €</span>
            <span>100 €</span>
            <span>150 €+ (Sin límite)</span>
          </div>
        </div>

        {/* Quick Shortcut Buttons */}
        <div className="flex items-center gap-1.5 pt-3 overflow-x-auto scrollbar-thin flex-wrap">
          <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider mr-1">
            Accesos rápidos:
          </span>
          {[
            { id: 'all', label: '🌟 Cualquier Presupuesto', val: 150 },
            { id: '20', label: '🏷️ Hasta 20 €', val: 20 },
            { id: '50', label: '🎁 Hasta 50 €', val: 50 },
            { id: '100', label: '💎 Hasta 100 €', val: 100 },
            { id: '>100', label: '👑 Más de 100 €', val: 150 },
          ].map((preset) => {
            const isActive =
              preset.id === selectedPrice ||
              (preset.id === '20' && selectedPrice === '<20') ||
              (preset.id === '50' && selectedPrice === '20-50') ||
              (preset.id === '100' && selectedPrice === '50-100');

            return (
              <button
                key={preset.id}
                onClick={() => onSelectPrice(preset.id)}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all border cursor-pointer ${
                  isActive
                    ? 'bg-indigo-600 text-white border-indigo-600 shadow-xs'
                    : 'bg-white border-slate-200 text-slate-700 hover:bg-slate-100'
                }`}
              >
                {preset.label}
              </button>
            );
          })}
        </div>

        {/* Active AI Gender Tag (if applied via wizard) */}
        {selectedGender !== 'all' && (
          <div className="mt-3 pt-3 border-t border-indigo-100/60 flex items-center justify-between text-xs">
            <span className="text-slate-600 font-medium">
              Filtro de género activo desde el asistente:{' '}
              <strong className="text-indigo-700">
                {selectedGender === 'boy'
                  ? '👦 Para Chico'
                  : selectedGender === 'girl'
                  ? '👧 Para Chica'
                  : '❓ Revelación de Género'}
              </strong>
            </span>
            <button
              onClick={() => onSelectGender('all')}
              className="text-indigo-600 hover:text-indigo-800 font-bold underline cursor-pointer text-xs"
            >
              Quitar filtro de género
            </button>
          </div>
        )}
      </div>

      {/* 2. SELECTOR DE EDAD */}
      <div>
        <div className="flex items-center justify-between mb-2.5">
          <label className="text-xs font-black uppercase tracking-wider text-slate-500 flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5 text-amber-500" />
            Selecciona la Edad:
          </label>
        </div>

        <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-thin">
          <button
            onClick={() => {
              onSelectAge('all');
              onSelectCategory('all');
            }}
            className={`px-3.5 py-2.5 rounded-2xl text-xs sm:text-sm font-bold whitespace-nowrap transition-all border cursor-pointer ${
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
              className={`px-3.5 py-2.5 rounded-2xl text-xs sm:text-sm font-bold whitespace-nowrap transition-all flex items-center gap-1.5 border cursor-pointer ${
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

      {/* 3. TIPO DE REGALO (CATEGORÍAS Y SUBCATEGORÍAS) */}
      <div>
        <label className="text-[11px] font-black uppercase tracking-wider text-slate-400 block mb-2">
          Tipo de Regalo ({selectedAge === '0-12m' ? 'Exclusivo Bebés' : selectedAge === 'all' ? 'Populares' : 'Para esta edad'}):
        </label>
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-thin flex-wrap">
          <button
            onClick={() => onSelectCategory('all')}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
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
              className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
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

    </div>
  );
}
