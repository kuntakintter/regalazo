'use client';

import React, { useState, useEffect, useRef } from 'react';
import { Globe, Check, ChevronDown, Search, X, Coins } from 'lucide-react';
import { useCurrency, Currency } from '@/context/CurrencyContext';

export interface LanguageOption {
  code: string;
  googleCode?: string;
  name: string;
  nativeName: string;
  flag: string;
  currency?: Currency;
  currencySymbol?: string;
  popular?: boolean;
}

export const LANGUAGES: LanguageOption[] = [
  // Principales solicitados
  {
    code: 'es',
    googleCode: 'es',
    name: 'Español (España)',
    nativeName: 'Español',
    flag: '🇪🇸',
    currency: 'EUR',
    currencySymbol: '€',
    popular: true,
  },
  {
    code: 'en-US',
    googleCode: 'en',
    name: 'English (US / Americano)',
    nativeName: 'American English',
    flag: '🇺🇸',
    currency: 'USD',
    currencySymbol: '$',
    popular: true,
  },
  {
    code: 'en-GB',
    googleCode: 'en',
    name: 'English (UK)',
    nativeName: 'British English',
    flag: '🇬🇧',
    currency: 'EUR',
    currencySymbol: '€',
    popular: true,
  },
  {
    code: 'de',
    googleCode: 'de',
    name: 'Alemán',
    nativeName: 'Deutsch',
    flag: '🇩🇪',
    currency: 'EUR',
    currencySymbol: '€',
    popular: true,
  },
  {
    code: 'ru',
    googleCode: 'ru',
    name: 'Ruso',
    nativeName: 'Русский',
    flag: '🇷🇺',
    currency: 'EUR',
    currencySymbol: '€',
    popular: true,
  },
  {
    code: 'fr',
    googleCode: 'fr',
    name: 'Francés',
    nativeName: 'Français',
    flag: '🇫🇷',
    currency: 'EUR',
    currencySymbol: '€',
    popular: true,
  },
  {
    code: 'it',
    googleCode: 'it',
    name: 'Italiano',
    nativeName: 'Italiano',
    flag: '🇮🇹',
    currency: 'EUR',
    currencySymbol: '€',
    popular: true,
  },
  {
    code: 'pt',
    googleCode: 'pt',
    name: 'Portugués',
    nativeName: 'Português',
    flag: '🇵🇹',
    currency: 'EUR',
    currencySymbol: '€',
    popular: true,
  },

  // Otros idiomas disponibles
  { code: 'nl', googleCode: 'nl', name: 'Holandés', nativeName: 'Nederlands', flag: '🇳🇱' },
  { code: 'pl', googleCode: 'pl', name: 'Polaco', nativeName: 'Polski', flag: '🇵🇱' },
  { code: 'zh-CN', googleCode: 'zh-CN', name: 'Chino (Simplificado)', nativeName: '简体中文', flag: '🇨🇳' },
  { code: 'ja', googleCode: 'ja', name: 'Japonés', nativeName: '日本語', flag: '🇯🇵' },
  { code: 'ar', googleCode: 'ar', name: 'Árabe', nativeName: 'العربية', flag: '🇸🇦' },
  { code: 'uk', googleCode: 'uk', name: 'Ucraniano', nativeName: 'Українська', flag: '🇺🇦' },
  { code: 'sv', googleCode: 'sv', name: 'Sueco', nativeName: 'Svenska', flag: '🇸🇪' },
  { code: 'no', googleCode: 'no', name: 'Noruego', nativeName: 'Norsk', flag: '🇳🇴' },
  { code: 'da', googleCode: 'da', name: 'Danés', nativeName: 'Dansk', flag: '🇩🇰' },
  { code: 'fi', googleCode: 'fi', name: 'Finlandés', nativeName: 'Suomi', flag: '🇫🇮' },
  { code: 'el', googleCode: 'el', name: 'Griego', nativeName: 'Ελληνικά', flag: '🇬🇷' },
  { code: 'tr', googleCode: 'tr', name: 'Turco', nativeName: 'Türkçe', flag: '🇹🇷' },
  { code: 'ro', googleCode: 'ro', name: 'Rumano', nativeName: 'Română', flag: '🇷🇴' },
  { code: 'bg', googleCode: 'bg', name: 'Búlgaro', nativeName: 'Български', flag: '🇧🇬' },
  { code: 'cs', googleCode: 'cs', name: 'Checo', nativeName: 'Čeština', flag: '🇨🇿' },
  { code: 'hu', googleCode: 'hu', name: 'Húngaro', nativeName: 'Magyar', flag: '🇭🇺' },
  { code: 'ko', googleCode: 'ko', name: 'Coreano', nativeName: '한국어', flag: '🇰🇷' },
  { code: 'hi', googleCode: 'hi', name: 'Hindi', nativeName: 'हिन्दी', flag: '🇮🇳' },
];

export default function LanguageSelector({ dark = false }: { dark?: boolean }) {
  const [isOpen, setIsOpen] = useState(false);
  const [currentLang, setCurrentLang] = useState('es');
  const [searchFilter, setSearchFilter] = useState('');
  const dropdownRef = useRef<HTMLDivElement>(null);
  const { currency, setCurrency, currencySymbol } = useCurrency();

  // Leer idioma actual al montar desde cookie o localStorage
  useEffect(() => {
    try {
      const match = document.cookie.match(/googtrans=\/es\/([a-zA-Z-]+)/);
      const savedLang = localStorage.getItem('site_language');
      if (savedLang) {
        setCurrentLang(savedLang);
      } else if (match && match[1]) {
        setCurrentLang(match[1]);
      }
    } catch {
      // ignore
    }
  }, []);

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
    const langCode = langObj.code;
    const googleCode = langObj.googleCode || langCode;

    setCurrentLang(langCode);
    setIsOpen(false);
    setSearchFilter('');

    // Ajustar automáticamente la moneda si el idioma tiene una moneda asociada
    if (langObj.currency) {
      setCurrency(langObj.currency);
    }

    try {
      localStorage.setItem('site_language', langCode);

      const domain = window.location.hostname;
      const rootDomain = domain.replace(/^www\./, '');

      if (googleCode === 'es') {
        // Borrar cookie para restaurar español nativo
        const expirePast = 'expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
        document.cookie = `googtrans=; ${expirePast}`;
        document.cookie = `googtrans=; domain=${domain}; ${expirePast}`;
        document.cookie = `googtrans=; domain=.${rootDomain}; ${expirePast}`;
        document.cookie = `googtrans=/es/es; path=/; max-age=31536000;`;
      } else {
        const transVal = `/es/${googleCode}`;
        const maxAge = 'max-age=31536000; path=/;';
        document.cookie = `googtrans=${transVal}; ${maxAge}`;
        document.cookie = `googtrans=${transVal}; domain=${domain}; ${maxAge}`;
        document.cookie = `googtrans=${transVal}; domain=.${rootDomain}; ${maxAge}`;
      }

      // Interactuar con el combo de Google Translate
      const select = document.querySelector('.goog-te-combo') as HTMLSelectElement | null;
      if (select) {
        select.value = googleCode;
        select.dispatchEvent(new Event('change'));
      } else {
        window.location.reload();
      }
    } catch (err) {
      console.error('Error switching language:', err);
      window.location.reload();
    }
  };

  const activeLangObj = LANGUAGES.find((l) => l.code === currentLang) || LANGUAGES[0];

  const filteredLanguages = LANGUAGES.filter((l) => {
    const q = searchFilter.toLowerCase().trim();
    if (!q) return true;
    return (
      l.name.toLowerCase().includes(q) ||
      l.nativeName.toLowerCase().includes(q) ||
      l.code.toLowerCase().includes(q)
    );
  });

  const popularLanguages = filteredLanguages.filter((l) => l.popular);
  const otherLanguages = filteredLanguages.filter((l) => !l.popular);

  return (
    <div ref={dropdownRef} className="relative inline-block text-left notranslate">
      {/* Botón Principal del Selector con Bandera, Idioma y Símbolo de Moneda */}
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold transition-all cursor-pointer shadow-2xs ${
          dark
            ? 'bg-slate-800 hover:bg-slate-700 text-white border border-slate-700 hover:border-slate-600'
            : 'bg-slate-100 hover:bg-slate-200 text-slate-800 border border-slate-200/90 hover:border-slate-300'
        }`}
        aria-label="Cambiar idioma y moneda del sitio"
        title="Cambiar idioma y moneda (Español €, Americano $, Alemán, Ruso y más)"
      >
        <span className="text-base leading-none">{activeLangObj.flag}</span>
        <span className={`uppercase tracking-wider font-extrabold text-[11px] ${dark ? 'text-slate-200' : 'text-slate-700'}`}>
          {activeLangObj.code.split('-')[0]}
        </span>
        <span className={`text-[11px] font-black px-1.5 py-0.5 rounded-md border shadow-2xs ${
          dark
            ? 'bg-slate-900 border-slate-700 text-amber-400'
            : 'bg-white border-slate-200 text-indigo-700'
        }`}>
          {currencySymbol}
        </span>
        <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-200 ${dark ? 'text-slate-400' : 'text-slate-500'} ${isOpen ? 'rotate-180' : ''}`} />
      </button>

      {/* Menú Desplegable con Búsqueda, Selector de Moneda e Idiomas */}
      {isOpen && (
        <div className="absolute right-0 mt-2 w-76 sm:w-84 rounded-2xl bg-white shadow-2xl border border-slate-200 z-50 overflow-hidden animate-in fade-in zoom-in-95 duration-150">
          
          {/* Header del Selector */}
          <div className="p-3 bg-gradient-to-r from-slate-50 via-indigo-50/40 to-slate-50 border-b border-slate-100 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Globe className="w-4 h-4 text-indigo-600" />
              <div>
                <span className="text-xs font-black text-slate-900 block leading-tight">
                  Idioma y Moneda
                </span>
                <span className="text-[10px] text-slate-500">
                  Selecciona tu país y formato de precio
                </span>
              </div>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="p-1 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-200/60 transition-colors"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Toggle Rápido de Moneda Directa (EUR € / USD $) */}
          <div className="px-3 py-2.5 bg-slate-50/90 border-b border-slate-100 flex items-center justify-between">
            <span className="text-[11px] font-bold text-slate-600 flex items-center gap-1.5">
              <Coins className="w-3.5 h-3.5 text-indigo-600" />
              <span>Moneda de precios:</span>
            </span>
            <div className="flex items-center gap-1 bg-white p-0.5 rounded-xl border border-slate-200 shadow-2xs">
              <button
                type="button"
                onClick={() => setCurrency('EUR')}
                className={`px-2.5 py-1 rounded-lg text-xs font-black transition-all cursor-pointer ${
                  currency === 'EUR'
                    ? 'bg-indigo-600 text-white shadow-2xs'
                    : 'text-slate-600 hover:bg-slate-100'
                }`}
              >
                € EUR
              </button>
              <button
                type="button"
                onClick={() => setCurrency('USD')}
                className={`px-2.5 py-1 rounded-lg text-xs font-black transition-all cursor-pointer ${
                  currency === 'USD'
                    ? 'bg-emerald-600 text-white shadow-2xs'
                    : 'text-slate-600 hover:bg-slate-100'
                }`}
              >
                $ USD
              </button>
            </div>
          </div>

          {/* Buscador de idioma rápido */}
          <div className="p-2.5 border-b border-slate-100 bg-white">
            <div className="relative flex items-center">
              <Search className="w-3.5 h-3.5 absolute left-2.5 text-slate-400" />
              <input
                type="text"
                value={searchFilter}
                onChange={(e) => setSearchFilter(e.target.value)}
                placeholder="Buscar idioma o país (americano, alemán, ruso)..."
                className="w-full pl-8 pr-3 py-1.5 text-xs rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:border-indigo-500 focus:ring-1 focus:ring-indigo-200 outline-none transition-all placeholder:text-slate-400"
                autoFocus
              />
            </div>
          </div>

          {/* Listado de Idiomas */}
          <div className="max-h-72 overflow-y-auto p-2 scrollbar-thin divide-y divide-slate-100">
            
            {/* Idiomas Destacados */}
            {popularLanguages.length > 0 && (
              <div className="pb-2">
                <span className="text-[10px] font-black uppercase tracking-wider text-slate-400 px-2 py-1 block">
                  Idiomas y Monedas Principales
                </span>
                <div className="grid grid-cols-1 gap-1">
                  {popularLanguages.map((lang) => {
                    const isSelected = lang.code === currentLang;
                    return (
                      <button
                        key={lang.code}
                        type="button"
                        onClick={() => changeLanguage(lang)}
                        className={`w-full flex items-center justify-between px-2.5 py-2 rounded-xl text-xs transition-all cursor-pointer ${
                          isSelected
                            ? 'bg-indigo-600 text-white font-bold shadow-xs'
                            : 'hover:bg-indigo-50/70 text-slate-700'
                        }`}
                      >
                        <div className="flex items-center gap-2.5">
                          <span className="text-lg leading-none">{lang.flag}</span>
                          <div className="text-left">
                            <span className={`block font-semibold ${isSelected ? 'text-white' : 'text-slate-900'}`}>
                              {lang.name}
                            </span>
                            <span className={`text-[10px] ${isSelected ? 'text-indigo-200' : 'text-slate-400'}`}>
                              {lang.nativeName}
                            </span>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          {lang.currencySymbol && (
                            <span className={`text-[11px] font-black px-1.5 py-0.5 rounded ${
                              isSelected
                                ? 'bg-white/20 text-white'
                                : 'bg-slate-100 text-slate-600'
                            }`}>
                              {lang.currencySymbol} {lang.currency}
                            </span>
                          )}
                          {isSelected && <Check className="w-4 h-4 text-white shrink-0" />}
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Otros Idiomas Disponibles */}
            {otherLanguages.length > 0 && (
              <div className="pt-2">
                <span className="text-[10px] font-black uppercase tracking-wider text-slate-400 px-2 py-1 block">
                  Más Idiomas Disponibles
                </span>
                <div className="grid grid-cols-1 gap-1">
                  {otherLanguages.map((lang) => {
                    const isSelected = lang.code === currentLang;
                    return (
                      <button
                        key={lang.code}
                        type="button"
                        onClick={() => changeLanguage(lang)}
                        className={`w-full flex items-center justify-between px-2.5 py-1.5 rounded-xl text-xs transition-all cursor-pointer ${
                          isSelected
                            ? 'bg-indigo-600 text-white font-bold shadow-xs'
                            : 'hover:bg-slate-100 text-slate-700'
                        }`}
                      >
                        <div className="flex items-center gap-2.5">
                          <span className="text-base leading-none">{lang.flag}</span>
                          <div className="text-left">
                            <span className={`block font-medium ${isSelected ? 'text-white' : 'text-slate-800'}`}>
                              {lang.name}
                            </span>
                            <span className={`text-[10px] ${isSelected ? 'text-indigo-200' : 'text-slate-400'}`}>
                              {lang.nativeName}
                            </span>
                          </div>
                        </div>
                        {isSelected && <Check className="w-3.5 h-3.5 text-white shrink-0" />}
                      </button>
                    );
                  })}
                </div>
              </div>
            )}

            {filteredLanguages.length === 0 && (
              <div className="py-6 text-center text-xs text-slate-400">
                No se encontraron opciones para &quot;{searchFilter}&quot;
              </div>
            )}

          </div>

          {/* Footer Informativo */}
          <div className="p-2 bg-slate-50 border-t border-slate-100 text-[10px] text-center text-slate-400 flex items-center justify-center gap-1">
            <span>Conversión automática de precios y traducción instantánea</span>
          </div>

        </div>
      )}
    </div>
  );
}
