'use client';

import React from 'react';
import { AGE_CATEGORIES, AGE_SUBCATEGORIES_MAP } from '@/data/products';
import {
  LayoutGrid,
  X,
  Check,
  SlidersHorizontal,
  RotateCcw,
  Baby,
  Puzzle,
  Palette,
  Wand2,
  Rocket,
  Headphones,
  Gamepad2,
  Wine,
  User,
  Users,
  Heart,
  PartyPopper,
  Tag,
  Gift,
  Gem,
  Crown,
  Coins,
  Calendar,
  Target,
  Smartphone,
  ArrowUpDown
} from 'lucide-react';

const AGE_ICONS: Record<string, { icon: React.ComponentType<{ className?: string }>; color: string }> = {
  '0-12m': { icon: Baby, color: 'text-rose-500' },
  '1-3': { icon: Puzzle, color: 'text-emerald-500' },
  '4-6': { icon: Palette, color: 'text-amber-500' },
  '7-9': { icon: Wand2, color: 'text-indigo-500' },
  '10-12': { icon: Rocket, color: 'text-blue-500' },
  '13-15': { icon: Headphones, color: 'text-violet-500' },
  '16-18': { icon: Gamepad2, color: 'text-purple-600' },
  '+18': { icon: Wine, color: 'text-rose-600' },
};

interface FilterBarProps {
  selectedAge: string;
  onSelectAge: (age: string) => void;
  selectedCategory: string;
  onSelectCategory: (cat: string) => void;
  selectedGender: 'all' | 'boy' | 'girl' | 'reveal';
  onSelectGender: (gender: 'all' | 'boy' | 'girl' | 'reveal') => void;
  selectedPrice: string;
  onSelectPrice: (price: string) => void;
  sortBy?: 'featured' | 'price-asc' | 'price-desc' | 'rating';
  onSelectSort?: (sort: 'featured' | 'price-asc' | 'price-desc' | 'rating') => void;
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
  sortBy = 'featured',
  onSelectSort,
  totalResults
}: FilterBarProps) {
  const hasActiveFilters =
    selectedAge !== 'all' ||
    selectedCategory !== 'all' ||
    selectedPrice !== 'all' ||
    selectedGender !== 'all' ||
    sortBy !== 'featured';

  // Subcategorías específicas para la edad seleccionada
  const availableSubcategories =
    AGE_SUBCATEGORIES_MAP[selectedAge] || AGE_SUBCATEGORIES_MAP['all'];

  const resetFilters = () => {
    onSelectAge('all');
    onSelectCategory('all');
    onSelectGender('all');
    onSelectPrice('all');
    if (onSelectSort) onSelectSort('featured');
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

          <div className="flex flex-wrap items-center gap-2 self-start sm:self-auto">
            <span className="text-xs font-bold px-3 py-1.5 rounded-xl bg-white text-indigo-700 border border-indigo-200 shadow-xs">
              {totalResults} ideas recomendadas
            </span>
            {onSelectSort && (
              <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-xl bg-white text-slate-700 border border-indigo-200 shadow-xs">
                <ArrowUpDown className="w-3.5 h-3.5 text-indigo-600 shrink-0" />
                <select
                  value={sortBy}
                  onChange={(e) => onSelectSort(e.target.value as any)}
                  className="bg-transparent text-slate-800 font-bold text-xs outline-none cursor-pointer"
                >
                  <option value="featured">⭐ Recomendados</option>
                  <option value="price-asc">📉 Más baratos a más caros</option>
                  <option value="price-desc">📈 Más caros a más baratos</option>
                  <option value="rating">🏆 Mejor valorados</option>
                </select>
              </div>
            )}
            {hasActiveFilters && (
              <button
                onClick={resetFilters}
                className="text-xs font-bold px-2.5 py-1.5 rounded-xl text-rose-600 hover:bg-rose-50 border border-transparent hover:border-rose-200 transition-colors flex items-center gap-1 cursor-pointer"
                title="Restablecer filtros"
              >
                <RotateCcw className="w-3.5 h-3.5" />
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
            { id: 'all', label: 'Cualquier Presupuesto', icon: Coins, iconColor: 'text-amber-500' },
            { id: '20', label: 'Hasta 20 €', icon: Tag, iconColor: 'text-emerald-500' },
            { id: '50', label: 'Hasta 50 €', icon: Gift, iconColor: 'text-indigo-500' },
            { id: '100', label: 'Hasta 100 €', icon: Gem, iconColor: 'text-purple-500' },
            { id: '>100', label: 'Más de 100 €', icon: Crown, iconColor: 'text-amber-600' },
          ].map((preset) => {
            const isActive =
              preset.id === selectedPrice ||
              (preset.id === '20' && selectedPrice === '<20') ||
              (preset.id === '50' && selectedPrice === '20-50') ||
              (preset.id === '100' && selectedPrice === '50-100');
            const IconComp = preset.icon;

            return (
              <button
                key={preset.id}
                onClick={() => onSelectPrice(preset.id)}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all border cursor-pointer flex items-center gap-1.5 ${
                  isActive
                    ? 'bg-indigo-600 text-white border-indigo-600 shadow-xs'
                    : 'bg-white border-slate-200 text-slate-700 hover:bg-slate-100'
                }`}
              >
                <IconComp className={`w-3.5 h-3.5 ${isActive ? 'text-white' : preset.iconColor}`} />
                <span>{preset.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* 2. SELECTOR DE EDAD */}
      <div>
        <div className="flex items-center justify-between mb-2.5">
          <label className="text-xs font-black uppercase tracking-wider text-slate-500 flex items-center gap-2">
            <Calendar className="w-4 h-4 text-indigo-600" />
            <span>Selecciona la Edad:</span>
          </label>
        </div>

        <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-thin">
          <button
            onClick={() => {
              onSelectAge('all');
              onSelectCategory('all');
            }}
            className={`px-3.5 py-2.5 rounded-2xl text-xs sm:text-sm font-bold whitespace-nowrap transition-all flex items-center gap-2 border cursor-pointer ${
              selectedAge === 'all'
                ? 'bg-slate-900 text-white border-slate-900 shadow-sm'
                : 'border-slate-200 bg-slate-50 text-slate-700 hover:bg-slate-100'
            }`}
          >
            <LayoutGrid className={`w-4 h-4 ${selectedAge === 'all' ? 'text-indigo-400' : 'text-slate-500'}`} />
            <span>Todas las Edades</span>
          </button>

          {AGE_CATEGORIES.map((cat) => {
            const ageIconData = AGE_ICONS[cat.id];
            const IconComp = ageIconData ? ageIconData.icon : LayoutGrid;
            const iconColor = ageIconData ? ageIconData.color : 'text-indigo-500';
            const isActive = selectedAge === cat.id;

            return (
              <button
                key={cat.id}
                onClick={() => {
                  onSelectAge(cat.id);
                  onSelectCategory('all');
                }}
                className={`px-3.5 py-2.5 rounded-2xl text-xs sm:text-sm font-bold whitespace-nowrap transition-all flex items-center gap-2 border cursor-pointer ${
                  isActive
                    ? 'bg-indigo-600 text-white border-indigo-600 shadow-sm'
                    : 'border-slate-200 bg-slate-50 text-slate-700 hover:bg-slate-100'
                }`}
              >
                <IconComp className={`w-4 h-4 ${isActive ? 'text-white' : iconColor}`} />
                <span>{cat.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* 3. SELECTOR DE DESTINATARIO: PARA ÉL / PARA ELLA / UNISEX */}
      <div className="pt-1">
        <label className="text-xs font-black uppercase tracking-wider text-slate-500 flex items-center gap-2 mb-2.5">
          <Target className="w-4 h-4 text-indigo-600" />
          <span>¿Para quién es el regalo?:</span>
        </label>

        <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-thin">
          <button
            onClick={() => onSelectGender('all')}
            className={`px-4 py-2 rounded-2xl text-xs sm:text-sm font-bold whitespace-nowrap transition-all border cursor-pointer flex items-center gap-2 ${
              selectedGender === 'all'
                ? 'bg-indigo-600 text-white border-indigo-600 shadow-xs'
                : 'border-slate-200 bg-slate-50 text-slate-700 hover:bg-slate-100'
            }`}
          >
            <Users className={`w-4 h-4 ${selectedGender === 'all' ? 'text-white' : 'text-indigo-600'}`} />
            <span>Todos / Unisex</span>
          </button>

          <button
            onClick={() => onSelectGender('boy')}
            className={`px-4 py-2 rounded-2xl text-xs sm:text-sm font-bold whitespace-nowrap transition-all border cursor-pointer flex items-center gap-2 ${
              selectedGender === 'boy'
                ? 'bg-blue-600 text-white border-blue-600 shadow-xs'
                : 'border-slate-200 bg-slate-50 text-slate-700 hover:bg-blue-50 hover:text-blue-700'
            }`}
          >
            <User className={`w-4 h-4 ${selectedGender === 'boy' ? 'text-white' : 'text-blue-600'}`} />
            <span>Para Él</span>
          </button>

          <button
            onClick={() => onSelectGender('girl')}
            className={`px-4 py-2 rounded-2xl text-xs sm:text-sm font-bold whitespace-nowrap transition-all border cursor-pointer flex items-center gap-2 ${
              selectedGender === 'girl'
                ? 'bg-pink-600 text-white border-pink-600 shadow-xs'
                : 'border-slate-200 bg-slate-50 text-slate-700 hover:bg-pink-50 hover:text-pink-700'
            }`}
          >
            <Heart className={`w-4 h-4 ${selectedGender === 'girl' ? 'text-white' : 'text-pink-600'}`} />
            <span>Para Ella</span>
          </button>

          {selectedAge === '0-12m' && (
            <button
              onClick={() => onSelectGender('reveal')}
              className={`px-4 py-2 rounded-2xl text-xs sm:text-sm font-bold whitespace-nowrap transition-all border cursor-pointer flex items-center gap-2 ${
                selectedGender === 'reveal'
                  ? 'bg-amber-500 text-white border-amber-500 shadow-xs'
                  : 'border-slate-200 bg-slate-50 text-slate-700 hover:bg-amber-50 hover:text-amber-700'
              }`}
            >
              <PartyPopper className={`w-4 h-4 ${selectedGender === 'reveal' ? 'text-white' : 'text-amber-500'}`} />
              <span>Fiesta Revelación de Género</span>
            </button>
          )}
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
          {availableSubcategories.map((subcat) => {
            const isSmartphone = subcat === 'Smartphones y Telefonía';
            const isSelected = selectedCategory === subcat;
            return (
              <button
                key={subcat}
                onClick={() => onSelectCategory(subcat)}
                className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all cursor-pointer flex items-center gap-1.5 ${
                  isSelected
                    ? 'bg-indigo-600 text-white font-bold shadow-xs'
                    : isSmartphone
                    ? 'bg-indigo-50 text-indigo-700 border border-indigo-200/80 hover:bg-indigo-100 font-bold'
                    : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                }`}
              >
                {isSmartphone && <Smartphone className={`w-3.5 h-3.5 ${isSelected ? 'text-white' : 'text-indigo-600'}`} />}
                <span>{subcat}</span>
              </button>
            );
          })}
        </div>
      </div>

    </div>
  );
}
