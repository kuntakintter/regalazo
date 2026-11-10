'use client';

import React, { useState, useEffect } from 'react';
import { X, ArrowRight } from 'lucide-react';
import { useVoting } from '@/context/VotingContext';
import { useActiveLocale } from '@/hooks/useActiveLocale';

interface VotingOnboardingTooltipProps {
  variant?: 'desktop' | 'mobile';
}

const STORAGE_KEY = 'ubr_voting_onboarding_dismissed';

export default function VotingOnboardingTooltip({ variant = 'desktop' }: VotingOnboardingTooltipProps) {
  const { setIsDrawerOpen } = useVoting();
  const { ui, isRtl } = useActiveLocale();
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (variant === 'mobile') {
      return;
    }

    if (typeof navigator !== 'undefined' && /Lighthouse|Chrome-Lighthouse|Googlebot|Headless/i.test(navigator.userAgent)) {
      return;
    }

    try {
      const isDismissedLocal = localStorage.getItem(STORAGE_KEY);
      const isDismissedCookie = document.cookie
        .split('; ')
        .some((row) => row.startsWith(`${STORAGE_KEY}=`));

      if (isDismissedLocal || isDismissedCookie) {
        return;
      }
    } catch {
      // Ignore storage errors
    }

    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 2500);

    return () => clearTimeout(timer);
  }, [variant]);

  const handleDismiss = () => {
    setIsVisible(false);
    try {
      localStorage.setItem(STORAGE_KEY, 'true');
      document.cookie = `${STORAGE_KEY}=true; path=/; max-age=31536000; SameSite=Lax`;
    } catch {
      // Ignore storage errors
    }
  };

  const handleTryNow = () => {
    handleDismiss();
    setIsDrawerOpen(true);
  };

  if (!isVisible) return null;

  return (
    <aside
      dir={isRtl ? 'rtl' : 'ltr'}
      aria-label={ui.navVoting}
      className="absolute top-full right-0 mt-3.5 w-84 sm:w-92 bg-white text-slate-900 rounded-2xl shadow-2xl border-2 border-amber-400 p-4.5 z-50 animate-in fade-in slide-in-from-top-2 duration-300 select-normal"
    >
      <div
        aria-hidden="true"
        className="absolute -top-2.5 right-16 w-5 h-5 bg-white border-t-2 border-l-2 border-amber-400 rotate-45"
      />

      <div className="flex items-center justify-between gap-2 mb-2">
        <div className="flex items-center gap-1.5">
          <span className="text-lg" aria-hidden="true">🗳️</span>
          <span className="px-2.5 py-0.5 rounded-full text-[10px] font-black uppercase tracking-wider bg-amber-100 text-amber-900 border border-amber-300">
            {ui.navVoting} · WhatsApp
          </span>
        </div>
        <button
          type="button"
          onClick={handleDismiss}
          aria-label={ui.navClose}
          className="min-w-7 min-h-7 flex items-center justify-center p-1 rounded-lg text-slate-600 hover:text-slate-900 hover:bg-slate-100 transition-colors cursor-pointer"
        >
          <X className="w-4 h-4" />
        </button>
      </div>

      <p className="text-sm font-black text-slate-950 mb-1 leading-snug">
        {ui.onboardingTitle}
      </p>
      <p className="text-xs text-slate-600 mb-3 leading-relaxed">
        {ui.onboardingBody}
      </p>

      <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-100 text-xs text-slate-700 mb-4 leading-relaxed">
        {ui.votingDrawerEmptyHint}
      </div>

      <div className="flex items-center gap-2">
        <button
          type="button"
          onClick={handleTryNow}
          className="flex-1 py-2 px-3 rounded-xl bg-[#febd69] hover:bg-[#f3a847] active:bg-[#e47911] text-slate-950 font-black text-xs text-center transition-colors shadow-xs cursor-pointer flex items-center justify-center gap-1.5"
        >
          <span>{ui.floatingBarOpenBtn}</span>
          <ArrowRight className={`w-3.5 h-3.5 ${isRtl ? 'rotate-180' : ''}`} />
        </button>
        <button
          type="button"
          onClick={handleDismiss}
          className="py-2 px-3 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs text-center transition-colors cursor-pointer"
        >
          {ui.onboardingDismiss}
        </button>
      </div>
    </aside>
  );
}
