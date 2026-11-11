'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { ChevronDown, FolderTree, Compass } from 'lucide-react';
import { SEO_AGE_ROUTES, SPECIFIC_YEAR_AGE_ROUTES, getSubcategorySlugMap } from '@/lib/seoRoutes';
import {
  ALL_STATIC_HUB_SLUGS,
  SEO_FILTER_ROUTES,
  matchProductsForAgeAndFilter,
} from '@/lib/filterRoutes';
import { PASSION_HUB_FILTERS_MAP } from '@/lib/passionHubFilters';
import { ALL_SITE_PRODUCTS } from '@/data/allCatalogProducts';
import { getHubStrings, getLocalizedAgeMeta } from '@/lib/i18nContent';
import { useActiveLocale } from '@/hooks/useActiveLocale';

export default function FooterDirectory({ isDark = false }: { isDark?: boolean }) {
  const { localeKey, activeCurrency, localePath, tTerm, ui } = useActiveLocale();
  const [isOpen, setIsOpen] = useState(true);

  const ageEntries = Object.entries(SEO_AGE_ROUTES).filter(([, meta]) => !meta.specificYear);
  const filterEntries = Object.values(SEO_FILTER_ROUTES);

  return (
    <div className={`border-t pt-8 pb-8 my-6 ${isDark ? 'border-slate-800' : 'border-slate-200/80'}`}>
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-6">
        <div className="flex items-center gap-2.5">
          <div
            className={`w-8 h-8 rounded-xl border flex items-center justify-center shadow-2xs shrink-0 ${
              isDark
                ? 'bg-indigo-950/60 border-indigo-700 text-indigo-300'
                : 'bg-indigo-50 border-indigo-200 text-indigo-700'
            }`}
          >
            <Compass className="w-4 h-4" />
          </div>
          <div>
            <h2 className={`text-sm font-black flex items-center gap-2 ${isDark ? 'text-white' : 'text-slate-900'}`}>
              <span>{ui.directoryTitle}</span>
              <span
                className={`hidden sm:inline-flex text-[10px] font-extrabold uppercase px-2 py-0.5 rounded-full border ${
                  isDark
                    ? 'bg-emerald-950 text-emerald-300 border-emerald-700'
                    : 'bg-emerald-50 text-emerald-800 border-emerald-200'
                }`}
              >
                {ui.directoryBadge}
              </span>
            </h2>
            <p className={`text-[11px] ${isDark ? 'text-slate-300' : 'text-slate-600'}`}>
              {ui.directorySubtitle}
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
          <span>{isOpen ? ui.directoryToggleClose : ui.directoryToggleOpen}</span>
          <ChevronDown
            className={`w-3.5 h-3.5 transition-transform duration-200 ${
              isDark ? 'text-slate-300' : 'text-slate-600'
            } ${isOpen ? 'rotate-180' : ''}`}
          />
        </button>
      </div>

      {isOpen && (
        <div
          className={`space-y-6 p-5 rounded-3xl border shadow-xs animate-in fade-in duration-200 ${
            isDark ? 'bg-slate-900/90 border-slate-800' : 'bg-white/90 border-slate-200/90'
          }`}
        >
          {/* 1. Age Stages + All ~80 Subcategories */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {ageEntries.map(([ageSlug, meta]) => {
              const subcategories = getSubcategorySlugMap(meta.ageId);
              const subSlugs = new Set(subcategories.map((s) => s.slug));
              const activeAgeFilters =
                meta.ageId === 'reveal'
                  ? []
                  : filterEntries.filter(
                      (flt) =>
                        !subSlugs.has(flt.slug) &&
                        matchProductsForAgeAndFilter(ageSlug, flt, ALL_SITE_PRODUCTS, true)
                          .length > 0
                    );
              const ageTitle = getLocalizedAgeMeta(localeKey, ageSlug, activeCurrency).h1;
              return (
                <div key={ageSlug} className="space-y-2">
                  <Link
                    href={localePath(`/${ageSlug}`)}
                    className={`font-bold text-xs transition-colors flex items-center gap-1.5 group py-0.5 ${
                      isDark ? 'text-white hover:text-indigo-300' : 'text-slate-900 hover:text-indigo-700'
                    }`}
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-indigo-500 group-hover:scale-125 transition-transform shrink-0" />
                    <span className="truncate">{ageTitle}</span>
                  </Link>

                  <ul className={`space-y-1 pl-3 border-l-2 ${isDark ? 'border-slate-700' : 'border-slate-200'}`}>
                    {subcategories.map((sub) => (
                      <li key={sub.slug}>
                        <Link
                          href={localePath(`/${ageSlug}/${sub.slug}`)}
                          className={`text-[11px] hover:underline line-clamp-1 transition-colors block py-0.5 ${
                            isDark
                              ? 'text-slate-300 hover:text-indigo-300'
                              : 'text-slate-600 hover:text-indigo-700'
                          }`}
                        >
                          {tTerm(sub.label)}
                        </Link>
                      </li>
                    ))}
                    {activeAgeFilters.map((flt) => (
                      <li key={`${ageSlug}-${flt.slug}`}>
                        <Link
                          href={localePath(`/${ageSlug}/${flt.slug}`)}
                          className={`text-[11px] hover:underline line-clamp-1 transition-colors block py-0.5 ${
                            isDark
                              ? 'text-slate-300 hover:text-amber-300'
                              : 'text-slate-600 hover:text-indigo-700'
                          }`}
                        >
                          <span aria-hidden="true">{flt.icon} </span>
                          {tTerm(flt.label)}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              );
            })}
          </div>

          {/* 1B. 18 Specific-Year Age Landing Pages (1 to 18 Years) */}
          <div className={`border-t pt-5 ${isDark ? 'border-slate-800' : 'border-slate-200/80'}`}>
            <div className="flex flex-wrap gap-1.5">
              {SPECIFIC_YEAR_AGE_ROUTES.map((yrRoute) => {
                const yrMeta = getLocalizedAgeMeta(localeKey, yrRoute.ageSlug, activeCurrency);
                return (
                  <Link
                    key={yrRoute.ageSlug}
                    href={localePath(`/${yrRoute.ageSlug}`)}
                    className={`px-2.5 py-1 rounded-xl text-[11px] font-semibold border transition-colors ${
                      isDark
                        ? 'bg-slate-800/80 border-slate-700 text-slate-200 hover:bg-slate-700 hover:text-white'
                        : 'bg-indigo-50/70 border-indigo-200 text-indigo-800 hover:bg-indigo-100 hover:border-indigo-300'
                    }`}
                  >
                    🎂 {yrMeta.h1}
                  </Link>
                );
              })}
            </div>
          </div>

          {/* 2. All 17 Niche Hubs & Interactive Tools + Their Respective Filters */}
          <div className={`border-t pt-5 ${isDark ? 'border-slate-800' : 'border-slate-200/80'}`}>
            <h3 className={`text-xs font-extrabold uppercase tracking-wider mb-3 ${isDark ? 'text-amber-300' : 'text-indigo-700'}`}>
              {ui.directoryHubsTitle}
            </h3>
            <div className="flex flex-wrap gap-1.5 mb-5">
              {ALL_STATIC_HUB_SLUGS.map((hubSlug) => {
                const hub = getHubStrings(localeKey, hubSlug);
                return (
                  <Link
                    key={hubSlug}
                    href={localePath(`/${hubSlug}`)}
                    className={`px-2.5 py-1 rounded-xl text-[11px] font-semibold border transition-colors ${
                      isDark
                        ? 'bg-slate-800/80 border-slate-700 text-slate-200 hover:bg-slate-700 hover:text-white'
                        : 'bg-slate-50 border-slate-200 text-slate-700 hover:bg-indigo-50 hover:border-indigo-300 hover:text-indigo-800'
                    }`}
                  >
                    {hub.breadcrumbLabel}
                  </Link>
                );
              })}
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5">
              {Object.entries(PASSION_HUB_FILTERS_MAP).map(([hubSlug, hubFilters]) => {
                const hub = getHubStrings(localeKey, hubSlug);
                return (
                  <div key={hubSlug} className="space-y-2">
                    <Link
                      href={localePath(`/${hubSlug}`)}
                      className={`font-bold text-xs transition-colors flex items-center gap-1.5 group py-0.5 ${
                        isDark ? 'text-white hover:text-amber-300' : 'text-slate-900 hover:text-indigo-700'
                      }`}
                    >
                      <span className="w-1.5 h-1.5 rounded-full bg-amber-500 group-hover:scale-125 transition-transform shrink-0" />
                      <span className="truncate">{hub.breadcrumbLabel}</span>
                    </Link>

                    <ul className={`space-y-1 pl-3 border-l-2 ${isDark ? 'border-slate-700' : 'border-slate-200'}`}>
                      {hubFilters.map((hf) => (
                        <li key={hf.slug}>
                          <Link
                            href={localePath(`/${hubSlug}/${hf.slug}`)}
                            className={`text-[11px] hover:underline line-clamp-1 transition-colors block py-0.5 ${
                              isDark
                                ? 'text-slate-300 hover:text-amber-300'
                                : 'text-slate-600 hover:text-indigo-700'
                            }`}
                          >
                            <span aria-hidden="true">{hf.icon} </span>
                            {tTerm(hf.label)}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                );
              })}
            </div>
          </div>

          {/* 3. All 44 Filter Landing Pages (Categories, Fashion, Anime, Vehicles, Budget, Gender) */}
          <div className={`border-t pt-5 ${isDark ? 'border-slate-800' : 'border-slate-200/80'}`}>
            <h3 className={`text-xs font-extrabold uppercase tracking-wider mb-3 ${isDark ? 'text-amber-300' : 'text-indigo-700'}`}>
              {ui.directoryFiltersTitle}
            </h3>
            <div className="flex flex-wrap gap-1.5">
              {filterEntries.map((flt) => (
                <Link
                  key={flt.slug}
                  href={localePath(`/${flt.slug}`)}
                  className={`px-2.5 py-1 rounded-xl text-[11px] font-medium border transition-colors ${
                    isDark
                      ? 'bg-slate-800/60 border-slate-700 text-slate-200 hover:bg-slate-700 hover:text-white'
                      : 'bg-slate-50 border-slate-200 text-slate-700 hover:bg-amber-50 hover:border-amber-300 hover:text-amber-900'
                  }`}
                >
                  <span aria-hidden="true">{flt.icon} </span>
                  {tTerm(flt.label)}
                </Link>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
