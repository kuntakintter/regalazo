'use client';

import React from 'react';
import {
  AGE_CATEGORIES,
  AGE_SUBCATEGORIES_MAP,
  CLOTHING_SUBFILTERS,
  isClothingCategory,
  ANIME_SERIES_SUBFILTERS,
  isFiguresCategory,
  WHEELS_MOTOR_SUBFILTERS,
  isWheelsMotorCategory,
} from '@/data/products';
import { useActiveLocale } from '@/hooks/useActiveLocale';
import {
  LayoutGrid,
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
  Calendar,
  Target,
  Smartphone,
  Clapperboard,
  Zap,
  ArrowUpDown,
  Shirt,
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
  selectedClothingSub?: string;
  onSelectClothingSub?: (sub: string) => void;
  selectedAnimeSub?: string;
  onSelectAnimeSub?: (sub: string) => void;
  selectedWheelsSub?: string;
  onSelectWheelsSub?: (sub: string) => void;
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
  selectedClothingSub = 'all',
  onSelectClothingSub,
  selectedAnimeSub = 'all',
  onSelectAnimeSub,
  selectedWheelsSub = 'all',
  onSelectWheelsSub,
  selectedGender,
  onSelectGender,
  selectedPrice,
  onSelectPrice,
  sortBy = 'featured',
  onSelectSort,
  totalResults,
}: FilterBarProps) {
  const { ui, activeCurrency, tTerm, tBudget } = useActiveLocale();

  const hasActiveFilters =
    selectedAge !== 'all' ||
    selectedCategory !== 'all' ||
    selectedClothingSub !== 'all' ||
    selectedAnimeSub !== 'all' ||
    selectedWheelsSub !== 'all' ||
    selectedPrice !== 'all' ||
    selectedGender !== 'all' ||
    sortBy !== 'featured';

  const availableSubcategories =
    AGE_SUBCATEGORIES_MAP[selectedAge] || AGE_SUBCATEGORIES_MAP['all'];

  const resetFilters = () => {
    onSelectAge('all');
    onSelectCategory('all');
    if (onSelectClothingSub) onSelectClothingSub('all');
    if (onSelectAnimeSub) onSelectAnimeSub('all');
    if (onSelectWheelsSub) onSelectWheelsSub('all');
    onSelectGender('all');
    onSelectPrice('all');
    if (onSelectSort) onSelectSort('featured');
  };

  // Convert current selectedPrice to numeric slider value (15 to 150)
  const getSliderValue = (): number => {
    if (selectedPrice === 'all') return 150;
    if (selectedPrice === '<15') return 15;
    if (selectedPrice === '<20') return 20;
    if (selectedPrice === '15-30') return 30;
    if (selectedPrice === '20-50') return 50;
    if (selectedPrice === '30-60') return 60;
    if (selectedPrice === '50-100') return 100;
    if (selectedPrice === '>60') return 150;
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

  const getBudgetLabel = () => {
    if (selectedPrice === 'all' || sliderValue >= 150) {
      return ui.budgetAnyUnlimited;
    }
    if (
      selectedPrice === '<15' ||
      selectedPrice === '<20' ||
      selectedPrice === '15-30' ||
      selectedPrice === '20-50' ||
      selectedPrice === '30-60' ||
      selectedPrice === '50-100' ||
      selectedPrice === '>60' ||
      selectedPrice === '>100'
    ) {
      return tBudget(selectedPrice);
    }
    const isUsd = activeCurrency === 'USD';
    return isUsd
      ? `${ui.budgetUpToPrefix} $${Math.round(sliderValue * 1.08)}`
      : `${ui.budgetUpToPrefix} ${sliderValue} €`;
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
              <span className="text-xs font-black uppercase tracking-wider text-slate-600 block">
                {ui.maxBudgetLabel}
              </span>
              <span className="text-sm sm:text-base font-black text-indigo-700">
                {getBudgetLabel()}
              </span>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-2 self-start sm:self-auto">
            <span className="text-xs font-bold px-3 py-1.5 rounded-xl bg-white text-indigo-700 border border-indigo-200 shadow-xs">
              {totalResults} {ui.ideasUnit}
            </span>
            {onSelectSort && (
              <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-xl bg-white text-slate-800 border border-indigo-200 shadow-xs">
                <ArrowUpDown className="w-3.5 h-3.5 text-indigo-600 shrink-0" />
                <select
                  value={sortBy}
                  aria-label={ui.sortLabel}
                  onChange={(e) => onSelectSort(e.target.value as 'featured' | 'price-asc' | 'price-desc' | 'rating')}
                  className="bg-transparent text-slate-800 font-bold text-xs outline-none cursor-pointer"
                >
                  <option value="featured">{ui.sortFeatured}</option>
                  <option value="price-asc">{ui.sortPriceAsc}</option>
                  <option value="price-desc">{ui.sortPriceDesc}</option>
                  <option value="rating">{ui.sortRating}</option>
                </select>
              </div>
            )}
            {hasActiveFilters && (
              <button
                type="button"
                onClick={resetFilters}
                className="text-xs font-bold px-2.5 py-1.5 rounded-xl text-rose-700 hover:bg-rose-50 border border-transparent hover:border-rose-200 transition-colors flex items-center gap-1 cursor-pointer"
                title={ui.resetFiltersBtn}
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>{ui.clearFilters}</span>
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
            aria-label={ui.maxBudgetLabel}
            className="w-full h-2.5 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-indigo-600 transition-all focus:outline-none"
          />
          <div className="flex justify-between text-[11px] font-bold text-slate-600 mt-1.5 px-0.5">
            <span>{activeCurrency === 'USD' ? '$16' : '15 €'}</span>
            <span>{activeCurrency === 'USD' ? '$32' : '30 €'}</span>
            <span>{activeCurrency === 'USD' ? '$55' : '50 €'}</span>
            <span>{activeCurrency === 'USD' ? '$80' : '75 €'}</span>
            <span>{activeCurrency === 'USD' ? '$110' : '100 €'}</span>
            <span>{activeCurrency === 'USD' ? `$160+ ${ui.budgetNoLimitSuffix}` : `150 €+ ${ui.budgetNoLimitSuffix}`}</span>
          </div>
        </div>
      </div>

      {/* 2. SELECTOR DE EDAD */}
      <div>
        <div className="flex items-center justify-between mb-2.5">
          <p className="text-xs font-black uppercase tracking-wider text-slate-600 flex items-center gap-2">
            <Calendar className="w-4 h-4 text-indigo-600" />
            <span>{ui.ageSelectLabel}</span>
          </p>
        </div>

        <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-thin flex-wrap">
          <button
            type="button"
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
            <LayoutGrid className={`w-4 h-4 ${selectedAge === 'all' ? 'text-indigo-400' : 'text-slate-600'}`} />
            <span>{ui.ageAllLabel}</span>
          </button>

          {AGE_CATEGORIES.map((cat) => {
            const ageIconData = AGE_ICONS[cat.id];
            const IconComp = ageIconData ? ageIconData.icon : LayoutGrid;
            const iconColor = ageIconData ? ageIconData.color : 'text-indigo-500';
            const isActive = selectedAge === cat.id;

            return (
              <button
                key={cat.id}
                type="button"
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
                <span>{tTerm(cat.label)}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* 3. SELECTOR DE DESTINATARIO */}
      <div className="pt-1">
        <p className="text-xs font-black uppercase tracking-wider text-slate-600 flex items-center gap-2 mb-2.5">
          <Target className="w-4 h-4 text-indigo-600" />
          <span>{ui.genderLabel}</span>
        </p>

        <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-thin">
          <button
            type="button"
            onClick={() => onSelectGender('all')}
            className={`px-4 py-2 rounded-2xl text-xs sm:text-sm font-bold whitespace-nowrap transition-all border cursor-pointer flex items-center gap-2 ${
              selectedGender === 'all'
                ? 'bg-indigo-600 text-white border-indigo-600 shadow-xs'
                : 'border-slate-200 bg-slate-50 text-slate-700 hover:bg-slate-100'
            }`}
          >
            <Users className={`w-4 h-4 ${selectedGender === 'all' ? 'text-white' : 'text-indigo-600'}`} />
            <span>{ui.genderAll}</span>
          </button>

          <button
            type="button"
            onClick={() => onSelectGender('boy')}
            className={`px-4 py-2 rounded-2xl text-xs sm:text-sm font-bold whitespace-nowrap transition-all border cursor-pointer flex items-center gap-2 ${
              selectedGender === 'boy'
                ? 'bg-blue-700 text-white border-blue-700 shadow-xs'
                : 'border-slate-200 bg-slate-50 text-slate-700 hover:bg-blue-50 hover:text-blue-800'
            }`}
          >
            <User className={`w-4 h-4 ${selectedGender === 'boy' ? 'text-white' : 'text-blue-700'}`} />
            <span>{ui.genderBoy}</span>
          </button>

          <button
            type="button"
            onClick={() => onSelectGender('girl')}
            className={`px-4 py-2 rounded-2xl text-xs sm:text-sm font-bold whitespace-nowrap transition-all border cursor-pointer flex items-center gap-2 ${
              selectedGender === 'girl'
                ? 'bg-pink-700 text-white border-pink-700 shadow-xs'
                : 'border-slate-200 bg-slate-50 text-slate-700 hover:bg-pink-50 hover:text-pink-800'
            }`}
          >
            <Heart className={`w-4 h-4 ${selectedGender === 'girl' ? 'text-white' : 'text-pink-700'}`} />
            <span>{ui.genderGirl}</span>
          </button>

          {selectedAge === '0-12m' && (
            <button
              type="button"
              onClick={() => onSelectGender('reveal')}
              className={`px-4 py-2 rounded-2xl text-xs sm:text-sm font-bold whitespace-nowrap transition-all border cursor-pointer flex items-center gap-2 ${
                selectedGender === 'reveal'
                  ? 'bg-amber-700 text-white border-amber-700 shadow-xs'
                  : 'border-slate-200 bg-slate-50 text-slate-700 hover:bg-amber-50 hover:text-amber-800'
              }`}
            >
              <PartyPopper className={`w-4 h-4 ${selectedGender === 'reveal' ? 'text-white' : 'text-amber-700'}`} />
              <span>{tTerm('Fiesta Revelación de Género')}</span>
            </button>
          )}
        </div>
      </div>

      {/* 4. CATEGORÍAS Y SUBCATEGORÍAS */}
      <div>
        <p className="text-[11px] font-black uppercase tracking-wider text-slate-600 block mb-2">
          {ui.categoryLabel}
        </p>
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-thin flex-wrap">
          <button
            type="button"
            onClick={() => {
              onSelectCategory('all');
              if (onSelectClothingSub) onSelectClothingSub('all');
            }}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
              selectedCategory === 'all'
                ? 'bg-slate-900 text-white shadow-xs'
                : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
            }`}
          >
            {ui.categoryAll}
          </button>
          {availableSubcategories.map((subcat) => {
            const isSmartphone = subcat === 'Smartphones y Telefonía';
            const isPokemon = subcat === 'Cartas y Sobres Pokémon';
            const isFigures = subcat === 'Figuras de Colección y Cine';
            const isClothing = isClothingCategory(subcat);
            const isWheels = isWheelsMotorCategory(subcat);
            const isSelected = selectedCategory === subcat;
            return (
              <button
                key={subcat}
                type="button"
                onClick={() => {
                  onSelectCategory(subcat);
                  if (!isClothing && onSelectClothingSub) {
                    onSelectClothingSub('all');
                  }
                  if (!isWheels && onSelectWheelsSub) {
                    onSelectWheelsSub('all');
                  }
                }}
                className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all cursor-pointer flex items-center gap-1.5 ${
                  isSelected
                    ? 'bg-indigo-600 text-white font-bold shadow-xs'
                    : isWheels
                    ? 'bg-emerald-50 text-emerald-950 border border-emerald-300 hover:bg-emerald-100 font-bold'
                    : isPokemon
                    ? 'bg-yellow-50 text-yellow-950 border border-yellow-300 hover:bg-yellow-100 font-bold'
                    : isFigures
                    ? 'bg-amber-50 text-amber-800 border border-amber-300 hover:bg-amber-100 font-bold'
                    : isSmartphone
                    ? 'bg-indigo-50 text-indigo-700 border border-indigo-200/80 hover:bg-indigo-100 font-bold'
                    : isClothing
                    ? 'bg-purple-50 text-purple-700 border border-purple-200/80 hover:bg-purple-100 font-semibold'
                    : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                }`}
              >
                {isWheels && <span>🏎️</span>}
                {isPokemon && <Zap className={`w-3.5 h-3.5 ${isSelected ? 'text-white' : 'text-amber-500 fill-amber-400'}`} />}
                {isFigures && <Clapperboard className={`w-3.5 h-3.5 ${isSelected ? 'text-white' : 'text-amber-600'}`} />}
                {isSmartphone && <Smartphone className={`w-3.5 h-3.5 ${isSelected ? 'text-white' : 'text-indigo-600'}`} />}
                {isClothing && <Shirt className={`w-3.5 h-3.5 ${isSelected ? 'text-white' : 'text-purple-600'}`} />}
                <span>{tTerm(subcat)}</span>
              </button>
            );
          })}
        </div>

        {/* SUBFILTRO DE SOBRE RUEDAS & MOTOR */}
        {isWheelsMotorCategory(selectedCategory) && (
          <div className="mt-3.5 p-3.5 sm:p-4 rounded-2xl bg-gradient-to-r from-emerald-50/90 via-teal-50/80 to-amber-50/70 border border-emerald-300/90 shadow-xs animate-fadeIn">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-2.5">
              <div className="flex items-center gap-2">
                <span className="w-6 h-6 rounded-lg bg-emerald-700 text-white flex items-center justify-center text-xs font-bold shadow-xs">
                  🏎️
                </span>
                <div>
                  <span className="text-[11px] font-black uppercase tracking-wider text-emerald-950 block leading-tight">
                    {ui.wheelsSubfilterLabel}
                  </span>
                </div>
              </div>
              {selectedWheelsSub !== 'all' && onSelectWheelsSub && (
                <button
                  type="button"
                  onClick={() => onSelectWheelsSub('all')}
                  className="text-xs font-bold text-emerald-800 hover:text-emerald-950 underline self-start sm:self-auto cursor-pointer"
                >
                  {ui.viewAllLink}
                </button>
              )}
            </div>

            <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-thin flex-wrap">
              {WHEELS_MOTOR_SUBFILTERS.map((sub) => {
                const isActive = selectedWheelsSub === sub.id;
                return (
                  <button
                    key={sub.id}
                    type="button"
                    onClick={() => onSelectWheelsSub && onSelectWheelsSub(sub.id)}
                    className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
                      isActive
                        ? 'bg-emerald-700 text-white shadow-xs ring-2 ring-emerald-300'
                        : 'bg-white text-slate-700 border border-emerald-200/80 hover:bg-emerald-50 hover:border-emerald-400'
                    }`}
                  >
                    <span>{sub.icon}</span>
                    <span>{tTerm(sub.label)}</span>
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {/* SUBFILTRO DE ROPA Y PRENDAS */}
        {isClothingCategory(selectedCategory) && (
          <div className="mt-3.5 p-3.5 sm:p-4 rounded-2xl bg-gradient-to-r from-purple-50/80 via-indigo-50/70 to-pink-50/70 border border-purple-200/80 shadow-xs animate-fadeIn">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-2.5">
              <div className="flex items-center gap-2">
                <span className="w-6 h-6 rounded-lg bg-purple-600 text-white flex items-center justify-center text-xs font-bold shadow-xs">
                  👕
                </span>
                <div>
                  <span className="text-[11px] font-black uppercase tracking-wider text-purple-950 block leading-tight">
                    {ui.clothingSubfilterLabel}
                  </span>
                </div>
              </div>
              {selectedClothingSub !== 'all' && onSelectClothingSub && (
                <button
                  type="button"
                  onClick={() => onSelectClothingSub('all')}
                  className="text-xs font-bold text-purple-700 hover:text-purple-900 underline self-start sm:self-auto cursor-pointer"
                >
                  {ui.viewAllLink}
                </button>
              )}
            </div>

            <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-thin flex-wrap">
              {CLOTHING_SUBFILTERS.map((sub) => {
                const isActive = selectedClothingSub === sub.id;
                return (
                  <button
                    key={sub.id}
                    type="button"
                    onClick={() => onSelectClothingSub && onSelectClothingSub(sub.id)}
                    className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
                      isActive
                        ? 'bg-purple-600 text-white shadow-xs ring-2 ring-purple-300'
                        : 'bg-white text-slate-700 border border-purple-200/60 hover:bg-purple-50 hover:border-purple-300'
                    }`}
                  >
                    <span>{sub.icon}</span>
                    <span>{tTerm(sub.label)}</span>
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {/* SUBFILTRO DE ANIME, CINE & SERIES */}
        {isFiguresCategory(selectedCategory) && (
          <div className="mt-3.5 p-3.5 sm:p-4 rounded-2xl bg-gradient-to-r from-amber-500/10 via-orange-500/10 to-rose-500/10 border border-amber-300/80 shadow-xs animate-fadeIn">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-2.5">
              <div className="flex items-center gap-2">
                <span className="w-6 h-6 rounded-lg bg-amber-500 text-slate-950 flex items-center justify-center text-xs font-bold shadow-xs">
                  🎌
                </span>
                <div>
                  <span className="text-[11px] font-black uppercase tracking-wider text-amber-950 block leading-tight">
                    {ui.animeSubfilterLabel}
                  </span>
                </div>
              </div>
              {selectedAnimeSub !== 'all' && onSelectAnimeSub && (
                <button
                  type="button"
                  onClick={() => onSelectAnimeSub('all')}
                  className="text-xs font-bold text-amber-700 hover:text-amber-900 underline self-start sm:self-auto cursor-pointer"
                >
                  {ui.viewAllLink}
                </button>
              )}
            </div>

            <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-thin flex-wrap">
              {ANIME_SERIES_SUBFILTERS.map((sub) => {
                const isActive = selectedAnimeSub === sub.id;
                return (
                  <button
                    key={sub.id}
                    type="button"
                    onClick={() => onSelectAnimeSub && onSelectAnimeSub(sub.id)}
                    className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
                      isActive
                        ? 'bg-amber-500 text-slate-950 shadow-xs ring-2 ring-amber-300'
                        : 'bg-white text-slate-700 border border-amber-200/80 hover:bg-amber-50 hover:border-amber-300'
                    }`}
                  >
                    <span>{sub.icon}</span>
                    <span>{tTerm(sub.label)}</span>
                  </button>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
