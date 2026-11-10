'use client';

import React from 'react';
import Link from 'next/link';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { useActiveLocale } from '@/hooks/useActiveLocale';
import { getHubStrings, getLocaleCurrency, getLocaleHref, getUiStrings, localizeTerm, normalizeLocaleKey } from '@/lib/i18nContent';

interface StageDef {
  slug: string;
  termKey: string;
  rangeKey: string;
  icon: string;
  subtitleKey: string;
}

const AGE_STAGES_ORDER: StageDef[] = [
  { slug: 'bebes-0-a-12-meses', termKey: 'Bebés (0-12 meses)', rangeKey: 'Recién Nacidos (0-12m)', icon: '🧸', subtitleKey: 'Tartas de Pañales y Canastillas' },
  { slug: 'ninos-1-a-3-anos', termKey: 'Niños (1-3 años)', rangeKey: '1 a 3 Años', icon: '🧩', subtitleKey: 'Juguetes Montessori y Madera' },
  { slug: 'ninos-4-a-6-anos', termKey: 'Niños (4-6 años)', rangeKey: '4 a 6 Años', icon: '🎨', subtitleKey: 'Patinetes con Ruedas LED' },
  { slug: 'ninos-7-a-9-anos', termKey: 'Niños (7-9 años)', rangeKey: '7 a 9 Años', icon: '🏎️', subtitleKey: 'Scalextric y Pistas de Carreras' },
  { slug: 'ninos-10-a-12-anos', termKey: 'Preadolescentes (10-12 años)', rangeKey: '10 a 12 Años', icon: '🚀', subtitleKey: 'Juegos de Cartas Competitivos (Virus!)' },
  { slug: 'jovenes-13-a-15-anos', termKey: 'Adolescentes (13-15 años)', rangeKey: '13 a 15 Años', icon: '🎧', subtitleKey: 'Smartphones y Telefonía' },
  { slug: 'jovenes-16-a-18-anos', termKey: 'Jóvenes (16-18 años)', rangeKey: '16 a 18 Años', icon: '⚡', subtitleKey: 'Videojuegos y Setup Gamer' },
  { slug: 'adultos-mas-de-18-anos', termKey: 'Adultos (+18 años)', rangeKey: 'A partir de 18 Años', icon: '🎯', subtitleKey: 'Escapadas y Experiencias' },
];

interface AgeStageInterlinkingProps {
  currentAgeSlug: string;
  localeKey?: string;
}

export default function AgeStageInterlinking({
  currentAgeSlug,
  localeKey: explicitLocaleKey,
}: AgeStageInterlinkingProps) {
  const { localeKey: routeLocaleKey, isRtl } = useActiveLocale();
  const effectiveLocale = normalizeLocaleKey(explicitLocaleKey || routeLocaleKey);
  const ui = getUiStrings(effectiveLocale);
  const { currency } = getLocaleCurrency(effectiveLocale);

  const lPath = (p: string) => getLocaleHref(effectiveLocale, p);
  const t = (raw: string) => localizeTerm(effectiveLocale, raw, currency);

  const currentIndex = AGE_STAGES_ORDER.findIndex((stage) => stage.slug === currentAgeSlug);

  if (currentIndex === -1) {
    return (
      <div className="my-12 p-6 sm:p-8 rounded-3xl bg-white border border-slate-200 shadow-xs">
        <h2 className="text-lg font-black text-slate-900 mb-4 flex items-center gap-2">
          <span>{ui.interlinkTitle}</span>
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
          {AGE_STAGES_ORDER.slice(0, 4).map((stage) => (
            <Link
              key={stage.slug}
              href={lPath(`/${stage.slug}`)}
              className="p-3.5 rounded-2xl border border-slate-200 bg-slate-50 hover:bg-amber-50 hover:border-amber-300 transition-all flex items-center gap-3 group"
            >
              <span className="text-2xl shrink-0 group-hover:scale-110 transition-transform" aria-hidden="true">
                {stage.icon}
              </span>
              <div className="min-w-0">
                <p className="text-xs font-bold text-slate-900 group-hover:text-amber-800 truncate">
                  {t(stage.termKey)}
                </p>
                <p className="text-[11px] text-slate-600 truncate">{t(stage.rangeKey)}</p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    );
  }

  const prevStage = currentIndex > 0 ? AGE_STAGES_ORDER[currentIndex - 1] : null;
  const nextStage = currentIndex < AGE_STAGES_ORDER.length - 1 ? AGE_STAGES_ORDER[currentIndex + 1] : null;
  const gamingHub = getHubStrings(effectiveLocale, 'gaming');

  return (
    <div className="my-10 p-5 sm:p-7 rounded-3xl bg-white border border-slate-200 shadow-xs">
      <div className="flex items-center justify-between mb-4">
        <div>
          <span className="text-[11px] font-bold uppercase tracking-wider text-amber-800 bg-amber-50 px-2.5 py-0.5 rounded-full border border-amber-200">
            {ui.navAges}
          </span>
          <h2 className="text-base sm:text-lg font-black text-slate-900 mt-1">
            {ui.interlinkTitle}
          </h2>
          <p className="text-xs text-slate-600 mt-0.5">{ui.interlinkSubtitle}</p>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
        {prevStage ? (
          <Link
            href={lPath(`/${prevStage.slug}`)}
            className="p-4 rounded-2xl border border-slate-200 bg-slate-50 hover:bg-amber-50/70 hover:border-amber-300 transition-all flex items-center gap-3.5 group"
          >
            <div className="w-10 h-10 rounded-xl bg-white border border-slate-200 flex items-center justify-center shrink-0 text-xl shadow-xs group-hover:scale-105 transition-transform" aria-hidden="true">
              {prevStage.icon}
            </div>
            <div className="flex-1 min-w-0">
              <span className="text-[10px] font-bold text-slate-600 uppercase flex items-center gap-1 group-hover:text-amber-800">
                <ArrowLeft className={`w-3 h-3 text-slate-600 group-hover:text-amber-700 ${isRtl ? 'rotate-180' : ''}`} />
                {ui.wizardBack}
              </span>
              <p className="text-xs sm:text-sm font-extrabold text-slate-900 group-hover:text-amber-950 truncate">
                {t(prevStage.termKey)}
              </p>
              <p className="text-[11px] text-slate-600 truncate">{t(prevStage.subtitleKey)}</p>
            </div>
          </Link>
        ) : (
          <Link
            href={lPath('/fiesta-revelacion-genero')}
            className="p-4 rounded-2xl border border-slate-200 bg-slate-50 hover:bg-amber-50/70 hover:border-amber-300 transition-all flex items-center gap-3.5 group"
          >
            <div className="w-10 h-10 rounded-xl bg-white border border-slate-200 flex items-center justify-center shrink-0 text-xl shadow-xs" aria-hidden="true">
              🎈
            </div>
            <div className="flex-1 min-w-0">
              <span className="text-[10px] font-bold text-slate-600 uppercase">{ui.navAges}</span>
              <p className="text-xs sm:text-sm font-extrabold text-slate-900 group-hover:text-amber-950 truncate">
                {t('Fiesta Revelación de Género')}
              </p>
              <p className="text-[11px] text-slate-600 truncate">{t('Fiestas y Revelación de Género')}</p>
            </div>
          </Link>
        )}

        {nextStage ? (
          <Link
            href={lPath(`/${nextStage.slug}`)}
            className="p-4 rounded-2xl border border-slate-200 bg-slate-50 hover:bg-amber-50/70 hover:border-amber-300 transition-all flex items-center gap-3.5 group"
          >
            <div className="flex-1 min-w-0 text-left sm:text-right">
              <span className="text-[10px] font-bold text-slate-600 uppercase flex items-center gap-1 sm:justify-end group-hover:text-amber-800">
                {ui.wizardNext}
                <ArrowRight className={`w-3 h-3 text-slate-600 group-hover:text-amber-700 ${isRtl ? 'rotate-180' : ''}`} />
              </span>
              <p className="text-xs sm:text-sm font-extrabold text-slate-900 group-hover:text-amber-950 truncate">
                {t(nextStage.termKey)}
              </p>
              <p className="text-[11px] text-slate-600 truncate">{t(nextStage.subtitleKey)}</p>
            </div>
            <div className="w-10 h-10 rounded-xl bg-white border border-slate-200 flex items-center justify-center shrink-0 text-xl shadow-xs group-hover:scale-105 transition-transform order-first sm:order-last" aria-hidden="true">
              {nextStage.icon}
            </div>
          </Link>
        ) : (
          <Link
            href={lPath('/gaming')}
            className="p-4 rounded-2xl border border-slate-200 bg-slate-50 hover:bg-amber-50/70 hover:border-amber-300 transition-all flex items-center gap-3.5 group"
          >
            <div className="flex-1 min-w-0 text-left sm:text-right">
              <span className="text-[10px] font-bold text-slate-600 uppercase flex items-center gap-1 sm:justify-end">
                {ui.navThemes}
                <ArrowRight className={`w-3 h-3 text-slate-600 ${isRtl ? 'rotate-180' : ''}`} />
              </span>
              <p className="text-xs sm:text-sm font-extrabold text-slate-950 group-hover:text-amber-950 truncate">
                {gamingHub.breadcrumbLabel}
              </p>
              <p className="text-[11px] text-slate-600 truncate">{t('Videojuegos y Setup Gamer')}</p>
            </div>
            <div className="w-10 h-10 rounded-xl bg-white border border-slate-200 flex items-center justify-center shrink-0 text-xl shadow-xs order-first sm:order-last" aria-hidden="true">
              🎮
            </div>
          </Link>
        )}
      </div>
    </div>
  );
}
