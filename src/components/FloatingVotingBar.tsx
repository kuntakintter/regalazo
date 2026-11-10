'use client';

import React, { useState, useEffect } from 'react';
import { useVoting } from '@/context/VotingContext';
import { useActiveLocale } from '@/hooks/useActiveLocale';
import { ChevronRight } from 'lucide-react';

export default function FloatingVotingBar() {
  const { voteItems, setIsDrawerOpen, isDrawerOpen } = useVoting();
  const { ui, isRtl } = useActiveLocale();
  const [hasScrolled, setHasScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setHasScrolled(window.scrollY > 280);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const isVisible = (hasScrolled || voteItems.length > 0) && !isDrawerOpen;

  if (!isVisible) return null;

  return (
    <aside
      aria-label={ui.navVoting}
      className="fixed bottom-4 sm:bottom-6 right-3 sm:right-6 z-40 animate-in fade-in slide-in-from-bottom-5 duration-200 select-none"
    >
      <button
        type="button"
        onClick={() => setIsDrawerOpen(true)}
        className="flex items-center gap-2.5 px-4 sm:px-5 py-3 rounded-full bg-linear-to-r from-emerald-700 via-teal-700 to-emerald-800 hover:from-emerald-600 hover:to-teal-600 text-white font-extrabold text-xs sm:text-sm shadow-xl hover:shadow-2xl hover:scale-105 active:scale-95 transition-all duration-200 border-2 border-emerald-300/40 cursor-pointer group ring-4 ring-emerald-500/20"
        title={ui.floatingBarOpenBtn}
      >
        <span className="relative block">
          <span className="text-xl sm:text-2xl group-hover:scale-110 transition-transform block" aria-hidden="true">
            🗳️
          </span>
          {voteItems.length > 0 && (
            <span className="absolute -top-1.5 -right-2 min-w-5 h-5 px-1 bg-amber-400 text-slate-950 font-black text-[11px] rounded-full flex items-center justify-center border-2 border-emerald-700 shadow-sm animate-pulse">
              {voteItems.length}
            </span>
          )}
        </span>
        <span className="flex flex-col text-left leading-tight">
          <span className="flex items-center gap-1">
            <span>{ui.navVoting}</span>{' '}
            <span className="text-[10px] font-bold uppercase tracking-wider bg-white/20 px-1.5 py-0.5 rounded-sm">
              WhatsApp
            </span>
          </span>{' '}
          <span className="text-[10px] sm:text-[11px] text-emerald-100 font-semibold opacity-95">
            {voteItems.length === 0
              ? ui.floatingBarOpenBtn
              : `${voteItems.length} ${ui.floatingBarCandidates}`}
          </span>
        </span>
        <ChevronRight
          className={`w-4 h-4 text-emerald-200 group-hover:translate-x-0.5 transition-transform ml-0.5 ${
            isRtl ? 'rotate-180' : ''
          }`}
          aria-hidden="true"
        />
      </button>
    </aside>
  );
}
