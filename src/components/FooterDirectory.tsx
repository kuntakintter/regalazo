'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { ChevronDown, FolderTree, Compass, Sparkles } from 'lucide-react';
import { SEO_AGE_ROUTES, getSubcategorySlugMap } from '@/lib/seoRoutes';

export default function FooterDirectory({ isDark = false }: { isDark?: boolean }) {
  const [isOpen, setIsOpen] = useState(true);

  // Exclude reveal category from standard age listing if needed or keep it
  const ageEntries = Object.entries(SEO_AGE_ROUTES).filter(([slug]) => slug !== 'fiesta-revelacion-genero');

  return (
    <div className={`border-t pt-8 pb-8 my-6 ${isDark ? 'border-slate-800' : 'border-slate-200/80'}`}>
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-6">
        <div className="flex items-center gap-2.5">
          <div
            className={`w-8 h-8 rounded-xl border flex items-center justify-center shadow-2xs ${
              isDark
                ? 'bg-indigo-950/60 border-indigo-700 text-indigo-300'
                : 'bg-indigo-50 border-indigo-200 text-indigo-700'
            }`}
          >
            <Compass className="w-4 h-4" />
          </div>
          <div>
            <h2 className={`text-sm font-black flex items-center gap-2 ${isDark ? 'text-white' : 'text-slate-900'}`}>
              <span>Directorio Completo de Ideas de Regalo por Etapa y Temática</span>
              <span
                className={`hidden sm:inline-flex text-[10px] font-extrabold uppercase px-2 py-0.5 rounded-full border ${
                  isDark
                    ? 'bg-emerald-950 text-emerald-300 border-emerald-700'
                    : 'bg-emerald-50 text-emerald-800 border-emerald-200'
                }`}
              >
                +80 Rankings 2026
              </span>
            </h2>
            <p className={`text-[11px] ${isDark ? 'text-slate-300' : 'text-slate-600'}`}>
              Guía oficial de comparativas y selecciones verificadas con opiniones de compradores en Amazon (España e Internacional)
            </p>
          </div>
        </div>

        <button
          type="button"
          onClick={() => setIsOpen((prev) => !prev)}
          className={`self-start sm:self-auto inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold border shadow-2xs transition-all cursor-pointer ${
            isDark
              ? 'text-slate-100 bg-slate-900 hover:bg-slate-800 border-slate-700'
              : 'text-slate-800 bg-white hover:bg-slate-100 border-slate-200'
          }`}
          aria-expanded={isOpen}
        >
          <FolderTree className={`w-3.5 h-3.5 ${isDark ? 'text-indigo-300' : 'text-indigo-700'}`} />
          <span>{isOpen ? 'Ocultar directorio' : 'Ver las 80+ temáticas'}</span>
          <span className="sr-only">{isOpen ? ' de temáticas' : ' del directorio'}</span>
          <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-200 ${isDark ? 'text-slate-300' : 'text-slate-600'} ${isOpen ? 'rotate-180' : ''}`} />
        </button>
      </div>

      {/* Directory Grid */}
      {isOpen && (
        <div
          className={`grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 p-5 rounded-3xl border shadow-xs animate-in fade-in duration-200 ${
            isDark
              ? 'bg-slate-900/90 border-slate-800'
              : 'bg-white/90 border-slate-200/90'
          }`}
        >
          {ageEntries.map(([ageSlug, meta]) => {
            const subcategories = getSubcategorySlugMap(meta.ageId);
            return (
              <div key={ageSlug} className="space-y-2">
                <Link
                  href={`/${ageSlug}`}
                  className={`font-bold text-xs transition-colors flex items-center gap-1.5 group py-0.5 ${
                    isDark
                      ? 'text-white hover:text-indigo-300'
                      : 'text-slate-900 hover:text-indigo-700'
                  }`}
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-indigo-500 group-hover:scale-125 transition-transform" />
                  <span className="truncate">{meta.h1.split(':')[0]}</span>
                </Link>

                <ul className={`space-y-1 pl-3 border-l-2 ${isDark ? 'border-slate-700' : 'border-slate-200'}`}>
                  {subcategories.map((sub) => (
                    <li key={sub.slug}>
                      <Link
                        href={`/${ageSlug}/${sub.slug}`}
                        className={`text-[11px] hover:underline line-clamp-1 transition-colors block py-1 ${
                          isDark
                            ? 'text-slate-300 hover:text-indigo-300'
                            : 'text-slate-600 hover:text-indigo-700'
                        }`}
                        title={`Los 10 mejores ${sub.label.toLowerCase()} para ${meta.h1.toLowerCase()}`}
                      >
                        {sub.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
