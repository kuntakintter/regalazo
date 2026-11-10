'use client';

import React, { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { Globe, Check, ChevronDown, Search, X, Coins, ShoppingBag } from 'lucide-react';
import { Currency } from '@/context/CurrencyContext';
import { useActiveLocale } from '@/hooks/useActiveLocale';
import { getLocaleHref } from '@/lib/i18nContent';
import { LocaleKey } from '@/lib/i18nTypes';

export interface LanguageOption {
  code: string;
  localeKey: LocaleKey;
  seoPath: string;
  name: string;
  nativeName: string;
  flag: string;
  currency: Currency;
  currencySymbol: string;
  popular?: boolean;
}

export const LANGUAGES: LanguageOption[] = [
  // Principales solicitados
  {
    code: 'es',
    localeKey: 'es',
    seoPath: '/',
    name: 'Español (España)',
    nativeName: 'Español (€ EUR)',
    flag: '🇪🇸',
    currency: 'EUR',
    currencySymbol: '€',
    popular: true,
  },
  {
    code: 'es-US',
    localeKey: 'es-us',
    seoPath: '/es-us',
    name: 'Español (América / Global)',
    nativeName: 'Español ($ USD)',
    flag: '🌎',
    currency: 'USD',
    currencySymbol: '$',
    popular: true,
  },
  {
    code: 'en-US',
    localeKey: 'en',
    seoPath: '/en',
    name: 'English (US / Global)',
    nativeName: 'American English ($ USD)',
    flag: '🇺🇸',
    currency: 'USD',
    currencySymbol: '$',
    popular: true,
  },
  {
    code: 'en-GB',
    localeKey: 'en-gb',
    seoPath: '/en-gb',
    name: 'English (UK)',
    nativeName: 'British English (€ EUR)',
    flag: '🇬🇧',
    currency: 'EUR',
    currencySymbol: '€',
    popular: true,
  },
  {
    code: 'de',
    localeKey: 'de',
    seoPath: '/de',
    name: 'Deutsch',
    nativeName: 'Deutsch (€ EUR)',
    flag: '🇩🇪',
    currency: 'EUR',
    currencySymbol: '€',
    popular: true,
  },
  {
    code: 'ru',
    localeKey: 'ru',
    seoPath: '/ru',
    name: 'Русский',
    nativeName: 'Русский (€ EUR)',
    flag: '🇷🇺',
    currency: 'EUR',
    currencySymbol: '€',
    popular: true,
  },
  {
    code: 'fr',
    localeKey: 'fr',
    seoPath: '/fr',
    name: 'Français',
    nativeName: 'Français (€ EUR)',
    flag: '🇫🇷',
    currency: 'EUR',
    currencySymbol: '€',
    popular: true,
  },
  {
    code: 'it',
    localeKey: 'it',
    seoPath: '/it',
    name: 'Italiano',
    nativeName: 'Italiano (€ EUR)',
    flag: '🇮🇹',
    currency: 'EUR',
    currencySymbol: '€',
    popular: true,
  },
  {
    code: 'pt',
    localeKey: 'pt',
    seoPath: '/pt',
    name: 'Português',
    nativeName: 'Português (€ EUR)',
    flag: '🇵🇹',
    currency: 'EUR',
    currencySymbol: '€',
    popular: true,
  },

  // Otros idiomas disponibles
  { code: 'nl', localeKey: 'nl', seoPath: '/nl', name: 'Nederlands', nativeName: 'Nederlands (€ EUR)', flag: '🇳🇱', currency: 'EUR', currencySymbol: '€' },
  { code: 'pl', localeKey: 'pl', seoPath: '/pl', name: 'Polski', nativeName: 'Polski (€ EUR)', flag: '🇵🇱', currency: 'EUR', currencySymbol: '€' },
  { code: 'zh-CN', localeKey: 'zh', seoPath: '/zh', name: '简体中文', nativeName: '简体中文 ($ USD)', flag: '🇨🇳', currency: 'USD', currencySymbol: '$' },
  { code: 'ja', localeKey: 'ja', seoPath: '/ja', name: '日本語', nativeName: '日本語 ($ USD)', flag: '🇯🇵', currency: 'USD', currencySymbol: '$' },
  { code: 'ar', localeKey: 'ar', seoPath: '/ar', name: 'العربية', nativeName: 'العربية ($ USD)', flag: '🇸🇦', currency: 'USD', currencySymbol: '$' },
  { code: 'uk', localeKey: 'uk', seoPath: '/uk', name: 'Українська', nativeName: 'Українська (€ EUR)', flag: '🇺🇦', currency: 'EUR', currencySymbol: '€' },
  { code: 'sv', localeKey: 'sv', seoPath: '/sv', name: 'Svenska', nativeName: 'Svenska (€ EUR)', flag: '🇸🇪', currency: 'EUR', currencySymbol: '€' },
  { code: 'no', localeKey: 'no', seoPath: '/no', name: 'Norsk', nativeName: 'Norsk (€ EUR)', flag: '🇳🇴', currency: 'EUR', currencySymbol: '€' },
  { code: 'da', localeKey: 'da', seoPath: '/da', name: 'Dansk', nativeName: 'Dansk (€ EUR)', flag: '🇩🇰', currency: 'EUR', currencySymbol: '€' },
  { code: 'fi', localeKey: 'fi', seoPath: '/fi', name: 'Suomi', nativeName: 'Suomi (€ EUR)', flag: '🇫🇮', currency: 'EUR', currencySymbol: '€' },
  { code: 'el', localeKey: 'el', seoPath: '/el', name: 'Ελληνικά', nativeName: 'Ελληνικά (€ EUR)', flag: '🇬🇷', currency: 'EUR', currencySymbol: '€' },
  { code: 'tr', localeKey: 'tr', seoPath: '/tr', name: 'Türkçe', nativeName: 'Türkçe (€ EUR)', flag: '🇹🇷', currency: 'EUR', currencySymbol: '€' },
  { code: 'ro', localeKey: 'ro', seoPath: '/ro', name: 'Română', nativeName: 'Română (€ EUR)', flag: '🇷🇴', currency: 'EUR', currencySymbol: '€' },
  { code: 'bg', localeKey: 'bg', seoPath: '/bg', name: 'Български', nativeName: 'Български (€ EUR)', flag: '🇧🇬', currency: 'EUR', currencySymbol: '€' },
  { code: 'cs', localeKey: 'cs', seoPath: '/cs', name: 'Čeština', nativeName: 'Čeština (€ EUR)', flag: '🇨🇿', currency: 'EUR', currencySymbol: '€' },
  { code: 'hu', localeKey: 'hu', seoPath: '/hu', name: 'Magyar', nativeName: 'Magyar (€ EUR)', flag: '🇭🇺', currency: 'EUR', currencySymbol: '€' },
  { code: 'ko', localeKey: 'ko', seoPath: '/ko', name: '한국어', nativeName: '한국어 ($ USD)', flag: '🇰🇷', currency: 'USD', currencySymbol: '$' },
  { code: 'hi', localeKey: 'hi', seoPath: '/hi', name: 'हिन्दी', nativeName: 'हिन्दी ($ USD)', flag: '🇮🇳', currency: 'USD', currencySymbol: '$' },
];

const LEGAL_PATHS = new Set(['/aviso-legal', '/politica-de-privacidad', '/politica-de-cookies']);

export default function LanguageSelector({ dark = false }: { dark?: boolean }) {
  const router = useRouter();
  const {
    localeKey,
    basePath,
    ui,
    activeCurrency,
    currencySymbol,
    setCurrency,
    amazonRegion,
    setAmazonRegion,
  } = useActiveLocale();

  const [isOpen, setIsOpen] = useState(false);
  const [searchFilter, setSearchFilter] = useState('');
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Cerrar al hacer clic fuera
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen]);

  const changeLanguage = (langObj: LanguageOption) => {
    setIsOpen(false);
    setSearchFilter('');

    setCurrency(langObj.currency, true);
    setAmazonRegion(langObj.localeKey === 'es' ? 'es' : 'intl', true);

    try {
      localStorage.setItem('site_language', langObj.code);
      window.dispatchEvent(new CustomEvent('siteLanguageChange', { detail: langObj.code }));
      // Expirar cualquier cookie heredada de Google Translate
      document.cookie = 'googtrans=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
    } catch {
      // ignore storage errors
    }

    const safeTargetBase = LEGAL_PATHS.has(basePath) ? '/' : basePath || '/';
    const targetHref = getLocaleHref(langObj.localeKey, safeTargetBase);
    router.push(targetHref);
  };

  const activeLangObj = LANGUAGES.find((l) => l.localeKey === localeKey) || LANGUAGES[0];
  const activeCodeBadge = activeLangObj.code.split('-')[0].toUpperCase();

  const filteredLanguages = LANGUAGES.filter((l) => {
    const q = searchFilter.toLowerCase().trim();
    if (!q) return true;
    return (
      l.name.toLowerCase().includes(q) ||
      l.nativeName.toLowerCase().includes(q) ||
      l.code.toLowerCase().includes(q) ||
      l.localeKey.toLowerCase().includes(q)
    );
  });

  const popularLanguages = filteredLanguages.filter((l) => l.popular);
  const otherLanguages = filteredLanguages.filter((l) => !l.popular);

  return (
    <div ref={dropdownRef} className="relative inline-block text-left notranslate">
      {/* Botón Principal del Selector con Idioma y Símbolo de Moneda */}
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className={`flex items-center gap-1 sm:gap-1.5 px-2.5 sm:px-3 h-8 sm:h-9 rounded-full text-xs font-bold transition-all cursor-pointer shadow-2xs shrink-0 ${
          dark
            ? 'bg-slate-800 hover:bg-slate-700 text-white border border-slate-700 hover:border-slate-600'
            : 'bg-slate-100 hover:bg-slate-200 text-slate-800 border border-slate-200/90 hover:border-slate-300'
        }`}
        aria-expanded={isOpen}
        title={ui.langButtonAria}
      >
        <span className={`uppercase tracking-wider font-extrabold text-[11px] sm:text-xs leading-none ${dark ? 'text-slate-200' : 'text-slate-700'}`}>
          {activeCodeBadge}
        </span>
        {' '}
        <span className={`text-[10px] sm:text-[11px] font-black px-1.5 py-0.5 rounded-md border shadow-2xs leading-none ${
          dark
            ? 'bg-slate-900 border-slate-700 text-amber-400'
            : 'bg-white border-slate-200 text-indigo-700'
        }`}>
          {currencySymbol}
        </span>
        <span className="sr-only"> — {ui.langButtonAria}</span>
        <ChevronDown className={`w-3 h-3 sm:w-3.5 sm:h-3.5 shrink-0 transition-transform duration-200 ${dark ? 'text-slate-300' : 'text-slate-600'} ${isOpen ? 'rotate-180' : ''}`} />
      </button>

      {/* Menú Desplegable con Búsqueda, Selector de Moneda, Tienda e Idiomas */}
      {isOpen && (
        <div className="absolute right-0 mt-2 w-[calc(100vw-24px)] max-w-xs sm:w-84 rounded-2xl bg-white shadow-2xl border border-slate-200 z-50 overflow-hidden animate-in fade-in zoom-in-95 duration-150">
          {/* Header del Selector */}
          <div className="p-3 bg-gradient-to-r from-slate-50 via-indigo-50/40 to-slate-50 border-b border-slate-100 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Globe className="w-4 h-4 text-indigo-600" />
              <div>
                <span className="text-xs font-black text-slate-900 block leading-tight">
                  {ui.langModalTitle}
                </span>
                <span className="text-[10px] text-slate-600">
                  {ui.langModalSubtitle}
                </span>
              </div>
            </div>
            <button
              type="button"
              onClick={() => setIsOpen(false)}
              className="min-w-7 min-h-7 flex items-center justify-center p-1.5 rounded-lg text-slate-600 hover:text-slate-900 hover:bg-slate-200/60 transition-colors cursor-pointer"
              aria-label={ui.langCloseLabel}
            >
              <X className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Toggle Rápido de Moneda Directa (EUR € / USD $) */}
          <div className="px-3 py-2 bg-slate-50/90 border-b border-slate-100 flex items-center justify-between">
            <span className="text-[11px] font-bold text-slate-700 flex items-center gap-1.5">
              <Coins className="w-3.5 h-3.5 text-indigo-600" />
              <span>{ui.langCurrencyLabel}:</span>
            </span>
            <div className="flex items-center gap-1 bg-white p-0.5 rounded-xl border border-slate-200 shadow-2xs">
              <button
                type="button"
                onClick={() => setCurrency('EUR', true)}
                className={`px-2.5 py-1 min-h-[28px] rounded-lg text-xs font-black transition-all cursor-pointer ${
                  activeCurrency === 'EUR'
                    ? 'bg-indigo-600 text-white shadow-2xs'
                    : 'text-slate-700 hover:bg-slate-100'
                }`}
              >
                € EUR
              </button>
              <button
                type="button"
                onClick={() => setCurrency('USD', true)}
                className={`px-2.5 py-1 min-h-[28px] rounded-lg text-xs font-black transition-all cursor-pointer ${
                  activeCurrency === 'USD'
                    ? 'bg-emerald-700 text-white shadow-2xs'
                    : 'text-slate-700 hover:bg-slate-100'
                }`}
              >
                $ USD
              </button>
            </div>
          </div>

          {/* Toggle Rápido de Tienda Amazon (España .es / Global .com) */}
          <div className="px-3 py-2 bg-slate-50/60 border-b border-slate-100 flex items-center justify-between">
            <span className="text-[11px] font-bold text-slate-700 flex items-center gap-1.5">
              <ShoppingBag className="w-3.5 h-3.5 text-amber-700" />
              <span>{ui.langStoreLabel}:</span>
            </span>
            <div className="flex items-center gap-1 bg-white p-0.5 rounded-xl border border-slate-200 shadow-2xs">
              <button
                type="button"
                onClick={() => setAmazonRegion('es', true)}
                className={`px-2.5 py-1 min-h-[28px] rounded-lg text-xs font-black transition-all cursor-pointer ${
                  amazonRegion === 'es'
                    ? 'bg-slate-900 text-amber-300 shadow-2xs'
                    : 'text-slate-700 hover:bg-slate-100'
                }`}
                title={ui.langStoreEs}
              >
                <span aria-hidden="true">🇪🇸</span> .es
              </button>
              <button
                type="button"
                onClick={() => setAmazonRegion('intl', true)}
                className={`px-2.5 py-1 min-h-[28px] rounded-lg text-xs font-black transition-all cursor-pointer ${
                  amazonRegion === 'intl'
                    ? 'bg-slate-900 text-amber-300 shadow-2xs'
                    : 'text-slate-700 hover:bg-slate-100'
                }`}
                title={ui.langStoreIntl}
              >
                <span aria-hidden="true">🌎</span> .com
              </button>
            </div>
          </div>

          {/* Buscador de idioma rápido */}
          <div className="p-2.5 border-b border-slate-100 bg-white">
            <div className="relative flex items-center">
              <Search className="w-3.5 h-3.5 absolute left-2.5 text-slate-600" />
              <input
                type="text"
                value={searchFilter}
                onChange={(e) => setSearchFilter(e.target.value)}
                aria-label={ui.langSearchPlaceholder}
                placeholder={ui.langSearchPlaceholder}
                className="w-full pl-8 pr-3 py-1.5 text-xs rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:border-indigo-500 focus:ring-1 focus:ring-indigo-200 outline-none transition-all placeholder:text-slate-500 text-slate-900"
              />
            </div>
          </div>

          {/* Listado de Idiomas */}
          <div className="max-h-72 overflow-y-auto p-2 scrollbar-thin divide-y divide-slate-100">
            {popularLanguages.length > 0 && (
              <div className="pb-2">
                <span className="text-[10px] font-black uppercase tracking-wider text-slate-600 px-2 py-1 block">
                  {ui.langPopularTitle}
                </span>
                <div className="grid grid-cols-1 gap-1">
                  {popularLanguages.map((lang) => {
                    const isSelected = lang.localeKey === localeKey;
                    return (
                      <button
                        key={lang.code}
                        type="button"
                        onClick={() => changeLanguage(lang)}
                        className={`w-full flex items-center justify-between px-2.5 py-2 rounded-xl text-xs transition-all cursor-pointer ${
                          isSelected
                            ? 'bg-indigo-600 text-white font-bold shadow-xs'
                            : 'hover:bg-indigo-50/70 text-slate-800'
                        }`}
                      >
                        <span className="flex items-center gap-2.5">
                          <span className="text-lg leading-none">{lang.flag}</span>
                          <span className="block text-left">
                            <span className={`block font-semibold ${isSelected ? 'text-white' : 'text-slate-900'}`}>
                              {lang.name}
                            </span>
                            <span className={`block text-[10px] ${isSelected ? 'text-indigo-100' : 'text-slate-600'}`}>
                              {lang.nativeName}
                            </span>
                          </span>
                        </span>
                        <span className="flex items-center gap-2">
                          <span
                            className={`text-[11px] font-black px-1.5 py-0.5 rounded ${
                              isSelected ? 'bg-white/20 text-white' : 'bg-slate-100 text-slate-700'
                            }`}
                          >
                            {lang.currencySymbol} {lang.currency}
                          </span>
                          {isSelected && <Check className="w-4 h-4 text-white shrink-0" />}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>
            )}

            {otherLanguages.length > 0 && (
              <div className="pt-2">
                <span className="text-[10px] font-black uppercase tracking-wider text-slate-600 px-2 py-1 block">
                  {ui.langMoreTitle}
                </span>
                <div className="grid grid-cols-1 gap-1">
                  {otherLanguages.map((lang) => {
                    const isSelected = lang.localeKey === localeKey;
                    return (
                      <button
                        key={lang.code}
                        type="button"
                        onClick={() => changeLanguage(lang)}
                        className={`w-full flex items-center justify-between px-2.5 py-1.5 rounded-xl text-xs transition-all cursor-pointer ${
                          isSelected
                            ? 'bg-indigo-600 text-white font-bold shadow-xs'
                            : 'hover:bg-slate-100 text-slate-800'
                        }`}
                      >
                        <span className="flex items-center gap-2.5">
                          <span className="text-base leading-none">{lang.flag}</span>
                          <span className="block text-left">
                            <span className={`block font-medium ${isSelected ? 'text-white' : 'text-slate-900'}`}>
                              {lang.name}
                            </span>
                            <span className={`block text-[10px] ${isSelected ? 'text-indigo-100' : 'text-slate-600'}`}>
                              {lang.nativeName}
                            </span>
                          </span>
                        </span>
                        <span className="flex items-center gap-2">
                          <span
                            className={`text-[10px] font-black px-1.5 py-0.5 rounded ${
                              isSelected ? 'bg-white/20 text-white' : 'bg-slate-100 text-slate-700'
                            }`}
                          >
                            {lang.currencySymbol} {lang.currency}
                          </span>
                          {isSelected && <Check className="w-3.5 h-3.5 text-white shrink-0" />}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>
            )}

            {filteredLanguages.length === 0 && (
              <div className="py-6 text-center text-xs text-slate-600">
                {ui.langNoResults}
              </div>
            )}
          </div>

          {/* Footer Informativo */}
          <div className="p-2 bg-slate-50 border-t border-slate-100 text-[10px] text-center text-slate-600 flex items-center justify-center gap-1">
            <span>{ui.langFooterNote}</span>
          </div>
        </div>
      )}
    </div>
  );
}
