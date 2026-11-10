'use client';

import React from 'react';
import { CheckCircle2, ShieldCheck, Lightbulb } from 'lucide-react';
import { useActiveLocale } from '@/hooks/useActiveLocale';
import { getUiStrings, normalizeLocaleKey } from '@/lib/i18nContent';

interface ExpertBuyerTipsProps {
  ageTitle: string;
  localeKey?: string;
}

export default function ExpertBuyerTips({ ageTitle, localeKey: explicitLocaleKey }: ExpertBuyerTipsProps) {
  const { localeKey: routeLocaleKey } = useActiveLocale();
  const effectiveLocale = normalizeLocaleKey(explicitLocaleKey || routeLocaleKey);
  const ui = getUiStrings(effectiveLocale);

  const card0 = ui.tipsCards[0];
  const card1 = ui.tipsCards[1];
  const card2 = ui.tipsCards[2];

  return (
    <section className="my-10 p-6 sm:p-8 rounded-3xl bg-gradient-to-br from-amber-50/60 via-white to-orange-50/40 border border-amber-200/80 shadow-xs text-slate-900">
      <div className="flex items-center gap-2 mb-2 text-amber-800">
        <Lightbulb className="w-5 h-5 text-amber-600 shrink-0" />
        <span className="text-xs font-black uppercase tracking-wider">
          {ui.verifiedCatalogNote}
        </span>
      </div>

      <h2 className="text-xl sm:text-2xl font-black text-slate-900 mb-1.5 tracking-tight">
        {ui.tipsTitle} {ageTitle}
      </h2>
      <p className="text-xs sm:text-sm text-slate-600 mb-5 leading-relaxed">
        {ui.tipsSubtitle}
      </p>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="p-4 rounded-2xl bg-white border border-slate-200 shadow-xs">
          <div className="flex items-center gap-2 mb-1.5 text-emerald-700 font-extrabold text-xs">
            <CheckCircle2 className="w-4 h-4 shrink-0 text-emerald-600" />
            <span>{card0.title}</span>
          </div>
          <p className="text-xs text-slate-600 leading-relaxed">{card0.body}</p>
        </div>

        <div className="p-4 rounded-2xl bg-white border border-slate-200 shadow-xs">
          <div className="flex items-center gap-2 mb-1.5 text-indigo-700 font-extrabold text-xs">
            <CheckCircle2 className="w-4 h-4 shrink-0 text-indigo-600" />
            <span>{card1.title}</span>
          </div>
          <p className="text-xs text-slate-600 leading-relaxed">{card1.body}</p>
        </div>

        <div className="p-4 rounded-2xl bg-white border border-slate-200 shadow-xs">
          <div className="flex items-center gap-2 mb-1.5 text-amber-700 font-extrabold text-xs">
            <ShieldCheck className="w-4 h-4 shrink-0 text-amber-600" />
            <span>{card2.title}</span>
          </div>
          <p className="text-xs text-slate-600 leading-relaxed">{card2.body}</p>
        </div>
      </div>
    </section>
  );
}
