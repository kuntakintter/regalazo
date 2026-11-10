'use client';

import React, { useState, useEffect } from 'react';
import { useVoting } from '@/context/VotingContext';
import { Users, ChevronRight } from 'lucide-react';

export default function FloatingVotingBar() {
  const { voteItems, setIsDrawerOpen, isDrawerOpen } = useVoting();
  const [hasScrolled, setHasScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 280) {
        setHasScrolled(true);
      } else {
        setHasScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Show if user has scrolled past header OR if user already has items in their vote list
  const isVisible = (hasScrolled || voteItems.length > 0) && !isDrawerOpen;

  if (!isVisible) return null;

  return (
    <aside 
      aria-label="Votación de Regalos en Grupo por WhatsApp"
      className="fixed bottom-4 sm:bottom-6 right-3 sm:right-6 z-40 animate-in fade-in slide-in-from-bottom-5 duration-200 select-none"
    >
      <button
        type="button"
        onClick={() => setIsDrawerOpen(true)}
        className="flex items-center gap-2.5 px-4 sm:px-5 py-3 rounded-full bg-linear-to-r from-emerald-700 via-teal-700 to-emerald-800 hover:from-emerald-600 hover:to-teal-600 text-white font-extrabold text-xs sm:text-sm shadow-xl hover:shadow-2xl hover:scale-105 active:scale-95 transition-all duration-200 border-2 border-emerald-300/40 cursor-pointer group ring-4 ring-emerald-500/20"
        title="Crear encuesta para votar regalos con amigos por WhatsApp"
      >
        <span className="relative block">
          <span className="text-xl sm:text-2xl group-hover:scale-110 transition-transform block" aria-hidden="true">🗳️</span>
          {voteItems.length > 0 && (
            <span className="absolute -top-1.5 -right-2 min-w-5 h-5 px-1 bg-amber-400 text-slate-950 font-black text-[11px] rounded-full flex items-center justify-center border-2 border-emerald-700 shadow-sm animate-pulse">
              {voteItems.length}
            </span>
          )}
        </span>
        <span className="flex flex-col text-left leading-tight">
          <span className="flex items-center gap-1">
            <span>Votar en Grupo</span>{' '}
            <span className="text-[10px] font-bold uppercase tracking-wider bg-white/20 px-1.5 py-0.5 rounded-sm">WhatsApp</span>
          </span>
          {' '}
          <span className="text-[10px] sm:text-[11px] text-emerald-100 font-semibold opacity-95">
            {voteItems.length === 0
              ? 'Crea tu encuesta gratis'
              : `${voteItems.length} regalo${voteItems.length > 1 ? 's' : ''} listo${voteItems.length > 1 ? 's' : ''}`}
          </span>
        </span>
        <span className="sr-only"> — Abrir panel de votación de regalos</span>
        <ChevronRight className="w-4 h-4 text-emerald-200 group-hover:translate-x-0.5 transition-transform ml-0.5" />
      </button>
    </aside>
  );
}
