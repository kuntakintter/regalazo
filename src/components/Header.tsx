'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Gift, Sparkles, Moon, Flame, Gamepad2, Baby, Search, Menu, X, ShieldCheck } from 'lucide-react';

interface HeaderProps {
  currentTheme: 'baby' | 'kids' | 'gamer' | 'emo' | 'tech' | 'classic';
  onThemeChange: (theme: 'baby' | 'kids' | 'gamer' | 'emo' | 'tech' | 'classic') => void;
  onSearchChange?: (query: string) => void;
  searchQuery?: string;
}

export default function Header({ currentTheme, onThemeChange, onSearchChange, searchQuery = '' }: HeaderProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const isDark = currentTheme === 'emo' || currentTheme === 'gamer';

  return (
    <header className={`sticky top-0 z-50 backdrop-blur-md transition-colors duration-300 border-b ${
      currentTheme === 'emo'
        ? 'bg-neutral-950/90 border-neutral-800 text-neutral-100'
        : currentTheme === 'gamer'
        ? 'bg-slate-950/90 border-purple-900/50 text-slate-100'
        : currentTheme === 'baby'
        ? 'bg-rose-50/90 border-rose-200/80 text-rose-950'
        : 'bg-white/95 border-slate-200 text-slate-900 shadow-xs'
    }`}>
      {/* Top Banner Amazon Tag & Trust Indicator */}
      <div className={`py-1.5 px-4 text-xs font-medium text-center flex items-center justify-center gap-2 border-b ${
        currentTheme === 'emo'
          ? 'bg-neutral-900/80 border-neutral-800 text-neutral-400'
          : currentTheme === 'baby'
          ? 'bg-pink-100/60 border-pink-200 text-rose-700'
          : 'bg-amber-500/10 border-amber-500/20 text-amber-900'
      }`}>
        <ShieldCheck className="w-3.5 h-3.5 text-emerald-600 inline" />
        <span>Recomendaciones verificadas de Amazon España</span>
        <span className="hidden sm:inline opacity-70">• Enlaces de Afiliado Oficiales (StoreID: vapegadgets22-21)</span>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 gap-4">
          
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2.5 shrink-0 group">
            <div className={`w-10 h-10 rounded-2xl flex items-center justify-center shadow-lg transition-transform group-hover:scale-110 ${
              currentTheme === 'emo'
                ? 'bg-gradient-to-br from-rose-900 to-neutral-900 text-rose-200 border border-rose-800/50 shadow-rose-950/40'
                : currentTheme === 'baby'
                ? 'bg-gradient-to-br from-pink-400 to-amber-300 text-white shadow-pink-200'
                : currentTheme === 'gamer'
                ? 'bg-gradient-to-br from-purple-600 via-indigo-600 to-cyan-500 text-white shadow-purple-950/50'
                : 'bg-gradient-to-br from-amber-500 via-rose-500 to-indigo-600 text-white shadow-indigo-200'
            }`}>
              <Gift className="w-5 h-5 animate-pulse" />
            </div>
            <div>
              <div className="flex items-center gap-1">
                <span className="text-xl font-black tracking-tight block leading-none">
                  REGAL<span className={currentTheme === 'emo' ? 'text-rose-400' : 'text-indigo-600'}>AZO</span>
                </span>
                <span className="text-amber-500 text-xs font-black">⚡</span>
              </div>
              <span className="text-[10px] tracking-wider uppercase font-extrabold opacity-60">0 a 18 Años</span>
            </div>
          </Link>

          {/* Quick Search Bar */}
          <div className="hidden md:flex flex-1 max-w-md relative">
            <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 opacity-40" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => onSearchChange?.(e.target.value)}
              placeholder="Buscar pastel de pañales, juegos PS5, montessori..."
              className={`w-full pl-10 pr-4 py-2 text-sm rounded-full border outline-none transition-all ${
                isDark
                  ? 'bg-neutral-900/90 border-neutral-700 text-white placeholder-neutral-500 focus:border-rose-500 focus:ring-1 focus:ring-rose-500'
                  : 'bg-slate-50 border-slate-200 text-slate-800 placeholder-slate-400 focus:border-indigo-500 focus:bg-white focus:ring-1 focus:ring-indigo-500'
              }`}
            />
          </div>

          {/* Mood Theme Switcher */}
          <div className="flex items-center gap-2">
            <div className="hidden lg:flex items-center gap-1 p-1 rounded-full text-xs font-medium border bg-black/5 dark:bg-white/5">
              <button
                onClick={() => onThemeChange('baby')}
                className={`px-2.5 py-1 rounded-full flex items-center gap-1.5 transition-all ${
                  currentTheme === 'baby' ? 'bg-pink-500 text-white shadow-xs font-semibold' : 'opacity-70 hover:opacity-100'
                }`}
                title="Ambiente Tierno Bebé"
              >
                <Baby className="w-3.5 h-3.5" />
                <span>Bebé</span>
              </button>
              <button
                onClick={() => onThemeChange('classic')}
                className={`px-2.5 py-1 rounded-full flex items-center gap-1.5 transition-all ${
                  currentTheme === 'classic' || currentTheme === 'kids' ? 'bg-indigo-600 text-white shadow-xs font-semibold' : 'opacity-70 hover:opacity-100'
                }`}
                title="Modo Niños Estándar"
              >
                <Sparkles className="w-3.5 h-3.5" />
                <span>Infantil</span>
              </button>
              <button
                onClick={() => onThemeChange('gamer')}
                className={`px-2.5 py-1 rounded-full flex items-center gap-1.5 transition-all ${
                  currentTheme === 'gamer' ? 'bg-purple-600 text-white shadow-xs font-semibold' : 'opacity-70 hover:opacity-100'
                }`}
                title="Modo Gamer PS5"
              >
                <Gamepad2 className="w-3.5 h-3.5" />
                <span>Gamer</span>
              </button>
              <button
                onClick={() => onThemeChange('emo')}
                className={`px-2.5 py-1 rounded-full flex items-center gap-1.5 transition-all ${
                  currentTheme === 'emo' ? 'bg-rose-900 text-rose-100 shadow-xs font-semibold' : 'opacity-70 hover:opacity-100'
                }`}
                title="Modo Emo / Dark Aesthetic con Velas"
              >
                <Flame className="w-3.5 h-3.5 text-amber-400" />
                <span>Emo 16-18</span>
              </button>
            </div>

            {/* Mobile menu toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 rounded-lg border opacity-80 hover:opacity-100"
              aria-label="Abrir menú"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Search & Mood Selector */}
        {mobileMenuOpen && (
          <div className="md:hidden py-4 border-t border-black/10 dark:border-white/10 space-y-3">
            <div className="relative">
              <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 opacity-40" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => onSearchChange?.(e.target.value)}
                placeholder="Buscar regalos (ej. pañales, ps5, emo)..."
                className={`w-full pl-10 pr-4 py-2 text-sm rounded-lg border outline-none ${
                  isDark ? 'bg-neutral-900 border-neutral-700 text-white' : 'bg-white border-slate-200'
                }`}
              />
            </div>
            <div className="grid grid-cols-4 gap-1 text-center text-xs">
              <button
                onClick={() => { onThemeChange('baby'); setMobileMenuOpen(false); }}
                className={`p-2 rounded-md ${currentTheme === 'baby' ? 'bg-pink-500 text-white font-bold' : 'border'}`}
              >
                🧸 Bebé
              </button>
              <button
                onClick={() => { onThemeChange('classic'); setMobileMenuOpen(false); }}
                className={`p-2 rounded-md ${currentTheme === 'classic' || currentTheme === 'kids' ? 'bg-indigo-600 text-white font-bold' : 'border'}`}
              >
                🎨 Niños
              </button>
              <button
                onClick={() => { onThemeChange('gamer'); setMobileMenuOpen(false); }}
                className={`p-2 rounded-md ${currentTheme === 'gamer' ? 'bg-purple-600 text-white font-bold' : 'border'}`}
              >
                🎮 Gamer
              </button>
              <button
                onClick={() => { onThemeChange('emo'); setMobileMenuOpen(false); }}
                className={`p-2 rounded-md ${currentTheme === 'emo' ? 'bg-rose-900 text-rose-200 font-bold' : 'border'}`}
              >
                🖤 Emo
              </button>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}
