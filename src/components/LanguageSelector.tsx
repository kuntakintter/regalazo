'use client';

import React, { useState, useEffect, useRef } from 'react';
import { Globe, Check, ChevronDown, Search, X } from 'lucide-react';

export interface LanguageOption {
  code: string;
  name: string;
  nativeName: string;
  flag: string;
  popular?: boolean;
}

export const LANGUAGES: LanguageOption[] = [
  // Principales solicitados
  { code: 'es', name: 'Español', nativeName: 'Español', flag: '🇪🇸', popular: true },
  { code: 'en', name: 'Inglés', nativeName: 'English', flag: '🇬🇧', popular: true },
  { code: 'de', name: 'Alemán', nativeName: 'Deutsch', flag: '🇩🇪', popular: true },
  { code: 'ru', name: 'Ruso', nativeName: 'Русский', flag: '🇷🇺', popular: true },
  { code: 'fr', name: 'Francés', nativeName: 'Français', flag: '🇫🇷', popular: true },
  { code: 'it', name: 'Italiano', nativeName: 'Italiano', flag: '🇮🇹', popular: true },
  { code: 'pt', name: 'Portugués', nativeName: 'Português', flag: '🇵🇹', popular: true },
  
  // Otros idiomas disponibles
  { code: 'nl', name: 'Holandés', nativeName: 'Nederlands', flag: '🇳🇱' },
  { code: 'pl', name: 'Polaco', nativeName: 'Polski', flag: '🇵🇱' },
  { code: 'zh-CN', name: 'Chino (Simplificado)', nativeName: '简体中文', flag: '🇨🇳' },
  { code: 'ja', name: 'Japonés', nativeName: '日本語', flag: '🇯🇵' },
  { code: 'ar', name: 'Árabe', nativeName: 'العربية', flag: '🇸🇦' },
  { code: 'uk', name: 'Ucraniano', nativeName: 'Українська', flag: '🇺🇦' },
  { code: 'sv', name: 'Sueco', nativeName: 'Svenska', flag: '🇸🇪' },
  { code: 'no', name: 'Noruego', nativeName: 'Norsk', flag: '🇳🇴' },
  { code: 'da', name: 'Danés', nativeName: 'Dansk', flag: '🇩🇰' },
  { code: 'fi', name: 'Finlandés', nativeName: 'Suomi', flag: '🇫🇮' },
  { code: 'el', name: 'Griego', nativeName: 'Ελληνικά', flag: '🇬🇷' },
  { code: 'tr', name: 'Turco', nativeName: 'Türkçe', flag: '🇹🇷' },
  { code: 'ro', name: 'Rumano', nativeName: 'Română', flag: '🇷🇴' },
  { code: 'bg', name: 'Búlgaro', nativeName: 'Български', flag: '🇧🇬' },
  { code: 'cs', name: 'Checo', nativeName: 'Čeština', flag: '🇨🇿' },
  { code: 'hu', name: 'Húngaro', nativeName: 'Magyar', flag: '🇭🇺' },
  { code: 'ko', name: 'Coreano', nativeName: '한국어', flag: '🇰🇷' },
  { code: 'hi', name: 'Hindi', nativeName: 'हिन्दी', flag: '🇮🇳' },
];

export default function LanguageSelector() {
  const [isOpen, setIsOpen] = useState(false);
  const [currentLang, setCurrentLang] = useState('es');
  const [searchFilter, setSearchFilter] = useState('');
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Leer idioma actual al montar desde cookie o localStorage
  useEffect(() => {
    try {
      const match = document.cookie.match(/googtrans=\/es\/([a-zA-Z-]+)/);
      if (match && match[1]) {
        setCurrentLang(match[1]);
      } else {
        const saved = localStorage.getItem('site_language');
        if (saved) setCurrentLang(saved);
      }
    } catch (e) {
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

  const changeLanguage = (langCode: string) => {
    setCurrentLang(langCode);
    setIsOpen(false);
    setSearchFilter('');

    try {
      localStorage.setItem('site_language', langCode);

      const domain = window.location.hostname;
      const rootDomain = domain.replace(/^www\./, '');

      if (langCode === 'es') {
        // Borrar cookie para restaurar español nativo
        const expirePast = 'expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
        document.cookie = `googtrans=; ${expirePast}`;
        document.cookie = `googtrans=; domain=${domain}; ${expirePast}`;
        document.cookie = `googtrans=; domain=.${rootDomain}; ${expirePast}`;
        document.cookie = `googtrans=/es/es; path=/; max-age=31536000;`;
      } else {
        const transVal = `/es/${langCode}`;
        const maxAge = 'max-age=31536000; path=/;';
        document.cookie = `googtrans=${transVal}; ${maxAge}`;
        document.cookie = `googtrans=${transVal}; domain=${domain}; ${maxAge}`;
        document.cookie = `googtrans=${transVal}; domain=.${rootDomain}; ${maxAge}`;
      }

      // Intentar interactuar con el combo nativo de Google Translate
      const select = document.querySelector('.goog-te-combo') as HTMLSelectElement | null;
      if (select) {
        select.value = langCode;
        select.dispatchEvent(new Event('change'));
      } else {
        // Si no está listo en el DOM, recargar para que el motor lea la cookie googtrans
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
      {/* Botón Principal del Selector */}
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold bg-slate-100 hover:bg-slate-200 text-slate-800 border border-slate-200/80 shadow-2xs transition-all cursor-pointer hover:border-slate-300"
        aria-label="Cambiar idioma del sitio"
        title="Cambiar idioma (Español, Inglés, Alemán, Ruso y más)"
      >
        <span className="text-base leading-none">{activeLangObj.flag}</span>
        <span className="uppercase tracking-wider font-extrabold text-[11px] text-slate-700">
          {activeLangObj.code.split('-')[0]}
        </span>
        <ChevronDown className={`w-3.5 h-3.5 text-slate-500 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} />
      </button>

      {/* Menú Desplegable con Búsqueda e Idiomas */}
      {isOpen && (
        <div className="absolute right-0 mt-2 w-72 sm:w-80 rounded-2xl bg-white shadow-2xl border border-slate-200 z-50 overflow-hidden animate-in fade-in zoom-in-95 duration-150">
          
          {/* Header del Selector */}
          <div className="p-3 bg-gradient-to-r from-slate-50 via-indigo-50/40 to-slate-50 border-b border-slate-100 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Globe className="w-4 h-4 text-indigo-600" />
              <div>
                <span className="text-xs font-black text-slate-900 block leading-tight">
                  Idioma / Language
                </span>
                <span className="text-[10px] text-slate-500">
                  Traduce toda la web al instante
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

          {/* Buscador de idioma rápido */}
          <div className="p-2.5 border-b border-slate-100 bg-white">
            <div className="relative flex items-center">
              <Search className="w-3.5 h-3.5 absolute left-2.5 text-slate-400" />
              <input
                type="text"
                value={searchFilter}
                onChange={(e) => setSearchFilter(e.target.value)}
                placeholder="Buscar idioma (ej. alemán, ruso, english)..."
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
                  Idiomas Principales
                </span>
                <div className="grid grid-cols-1 gap-1">
                  {popularLanguages.map((lang) => {
                    const isSelected = lang.code === currentLang;
                    return (
                      <button
                        key={lang.code}
                        type="button"
                        onClick={() => changeLanguage(lang.code)}
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
                        {isSelected && <Check className="w-4 h-4 text-white shrink-0" />}
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
                        onClick={() => changeLanguage(lang.code)}
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
                No se encontraron idiomas para &quot;{searchFilter}&quot;
              </div>
            )}

          </div>

          {/* Footer Informativo */}
          <div className="p-2 bg-slate-50 border-t border-slate-100 text-[10px] text-center text-slate-400 flex items-center justify-center gap-1">
            <span>Traducción instantánea en todo el sitio</span>
          </div>

        </div>
      )}
    </div>
  );
}
