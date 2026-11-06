'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { ChevronDown, FolderTree, Compass, Sparkles } from 'lucide-react';
import { SEO_AGE_ROUTES, getSubcategorySlugMap } from '@/lib/seoRoutes';

export default function FooterDirectory() {
  const [isOpen, setIsOpen] = useState(true);

  // Exclude reveal category from standard age listing if needed or keep it
  const ageEntries = Object.entries(SEO_AGE_ROUTES).filter(([slug]) => slug !== 'fiesta-revelacion-genero');

  return (
    <div className="border-t border-slate-200/80 pt-8 pb-8 my-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-6">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-xl bg-indigo-50 border border-indigo-200 flex items-center justify-center text-indigo-600 shadow-2xs">
            <Compass className="w-4 h-4" />
          </div>
          <div>
            <h3 className="text-sm font-black text-slate-900 flex items-center gap-2">
              <span>Directorio Completo de Ideas de Regalo por Etapa y Temática</span>
              <span className="hidden sm:inline-flex text-[10px] font-extrabold uppercase px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200">
                +80 Rankings 2026
              </span>
            </h3>
            <p className="text-[11px] text-slate-500">
              Guía oficial de comparativas y selecciones verificadas con opiniones de compradores en Amazon.es
            </p>
          </div>
        </div>

        <button
          type="button"
          onClick={() => setIsOpen((prev) => !prev)}
          className="self-start sm:self-auto inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold text-slate-700 bg-white hover:bg-slate-100 border border-slate-200 shadow-2xs transition-all cursor-pointer"
          aria-expanded={isOpen}
          aria-label={isOpen ? 'Plegar directorio de temáticas' : 'Desplegar directorio de temáticas'}
        >
          <FolderTree className="w-3.5 h-3.5 text-indigo-600" />
          <span>{isOpen ? 'Ocultar directorio' : 'Ver las 80+ temáticas'}</span>
          <ChevronDown className={`w-3.5 h-3.5 text-slate-400 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} />
        </button>
      </div>

      {/* Directory Grid */}
      {isOpen && (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 p-5 rounded-3xl bg-white/80 border border-slate-200/90 shadow-xs animate-in fade-in duration-200">
          {ageEntries.map(([ageSlug, meta]) => {
            const subcategories = getSubcategorySlugMap(meta.ageId);
            return (
              <div key={ageSlug} className="space-y-2">
                <Link
                  href={`/${ageSlug}`}
                  className="font-bold text-xs text-slate-900 hover:text-indigo-600 transition-colors flex items-center gap-1.5 group"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-indigo-500 group-hover:scale-125 transition-transform" />
                  <span className="truncate">{meta.h1.split(':')[0]}</span>
                </Link>

                <ul className="space-y-1 pl-3 border-l-2 border-slate-100">
                  {subcategories.map((sub) => (
                    <li key={sub.slug}>
                      <Link
                        href={`/${ageSlug}/${sub.slug}`}
                        className="text-[11px] text-slate-500 hover:text-indigo-600 hover:underline line-clamp-1 transition-colors block py-0.5"
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
