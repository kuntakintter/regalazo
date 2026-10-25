'use client';

import React, { useState, useEffect } from 'react';
import { X, CheckCircle, ArrowRight, Share2, Sparkles, ThumbsUp } from 'lucide-react';
import { useVoting } from '@/context/VotingContext';

interface VotingOnboardingTooltipProps {
  variant?: 'desktop' | 'mobile';
}

const STORAGE_KEY = 'ubr_voting_onboarding_dismissed';

export default function VotingOnboardingTooltip({ variant = 'desktop' }: VotingOnboardingTooltipProps) {
  const { setIsDrawerOpen } = useVoting();
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // 1. Check if already dismissed via localStorage or Cookie
    try {
      const isDismissedLocal = localStorage.getItem(STORAGE_KEY);
      const isDismissedCookie = document.cookie
        .split('; ')
        .some((row) => row.startsWith(`${STORAGE_KEY}=`));

      if (isDismissedLocal || isDismissedCookie) {
        return;
      }
    } catch {
      // In case localStorage is blocked in private browsing
    }

    // 2. Wait 1.5 seconds so Googlebot and user experience 0 CLS and clean initial paint
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 1500);

    return () => clearTimeout(timer);
  }, []);

  const handleDismiss = () => {
    setIsVisible(false);
    try {
      localStorage.setItem(STORAGE_KEY, 'true');
      // Set persistent 1-year cookie
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

  if (variant === 'mobile') {
    return (
      <aside
        aria-label="Guía de votación de regalos en grupo"
        className="fixed top-14 right-2 left-2 z-50 max-w-sm mx-auto bg-white text-slate-900 rounded-2xl shadow-2xl border-2 border-amber-400 p-4 animate-in fade-in slide-in-from-top-3 duration-300"
      >
        {/* Upward pointer arrow aimed at the mobile voting button */}
        <div 
          aria-hidden="true" 
          className="absolute -top-2 right-14 w-4 h-4 bg-white border-t-2 border-l-2 border-amber-400 rotate-45"
        />

        {/* Top Header */}
        <div className="flex items-center justify-between gap-2 mb-2">
          <div className="flex items-center gap-1.5">
            <span className="text-base">🗳️</span>
            <span className="px-2 py-0.5 rounded-full text-[10px] font-black uppercase tracking-wider bg-amber-100 text-amber-900 border border-amber-300">
              ¡Novedad para WhatsApp!
            </span>
          </div>
          <button
            type="button"
            onClick={handleDismiss}
            aria-label="Cerrar aviso de votación"
            className="p-1 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Title */}
        <h3 className="text-sm font-black text-slate-950 mb-1 leading-snug">
          ¿Hacéis un regalo entre varios?
        </h3>
        <p className="text-[11px] text-slate-600 mb-3 leading-relaxed">
          Evitad discusiones eternas en el grupo. Ahora podéis elegir juntos en 3 pasos:
        </p>

        {/* 3 Steps */}
        <div className="space-y-2 mb-3.5 bg-slate-50 p-2.5 rounded-xl border border-slate-100 text-xs">
          <div className="flex items-start gap-2">
            <span className="font-black text-amber-600 shrink-0">1.</span>
            <span className="text-slate-700">
              Añade ideas con el botón <strong>«Votar»</strong> de cualquier producto.
            </span>
          </div>
          <div className="flex items-start gap-2">
            <span className="font-black text-amber-600 shrink-0">2.</span>
            <span className="text-slate-700">
              Envía el enlace a tu grupo de <strong>WhatsApp</strong> con 1 clic.
            </span>
          </div>
          <div className="flex items-start gap-2">
            <span className="font-black text-amber-600 shrink-0">3.</span>
            <span className="text-slate-700">
              Cada uno vota su favorito y sale el <strong>ganador directo</strong>.
            </span>
          </div>
        </div>

        {/* Actions */}
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={handleTryNow}
            className="flex-1 py-2 px-3 rounded-xl bg-[#febd69] hover:bg-[#f3a847] text-slate-950 font-black text-xs text-center transition-colors shadow-xs cursor-pointer"
          >
            ¡Probar ahora!
          </button>
          <button
            type="button"
            onClick={handleDismiss}
            className="py-2 px-3 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs text-center transition-colors cursor-pointer"
          >
            Entendido
          </button>
        </div>
      </aside>
    );
  }

  // Desktop Variant
  return (
    <aside
      aria-label="Guía de votación de regalos en grupo"
      className="absolute top-full right-0 mt-3.5 w-84 sm:w-92 bg-white text-slate-900 rounded-2xl shadow-2xl border-2 border-amber-400 p-4.5 z-50 animate-in fade-in slide-in-from-top-2 duration-300 select-normal"
    >
      {/* Upward pointer arrow pointing up directly to Desktop Voting button */}
      <div 
        aria-hidden="true" 
        className="absolute -top-2.5 right-16 w-5 h-5 bg-white border-t-2 border-l-2 border-amber-400 rotate-45"
      />

      {/* Top Header */}
      <div className="flex items-center justify-between gap-2 mb-2">
        <div className="flex items-center gap-1.5">
          <span className="text-lg">🗳️</span>
          <span className="px-2.5 py-0.5 rounded-full text-[10px] font-black uppercase tracking-wider bg-amber-100 text-amber-900 border border-amber-300">
            ¡Novedad para WhatsApp!
          </span>
        </div>
        <button
          type="button"
          onClick={handleDismiss}
          aria-label="Cerrar explicación de votación"
          className="p-1 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors cursor-pointer"
        >
          <X className="w-4 h-4" />
        </button>
      </div>

      {/* Title */}
      <h3 className="text-sm font-black text-slate-950 mb-1 leading-snug">
        ¿Hacéis un regalo conjunto con amigos o familia?
      </h3>
      <p className="text-xs text-slate-600 mb-3 leading-relaxed">
        Olvídate de los líos en WhatsApp. Ahora podéis organizar la votación en 3 sencillos pasos:
      </p>

      {/* 3 Steps */}
      <div className="space-y-2 mb-4 bg-slate-50 p-3 rounded-xl border border-slate-100 text-xs">
        <div className="flex items-start gap-2">
          <span className="font-black text-amber-600 shrink-0">1.</span>
          <span className="text-slate-700">
            Selecciona regalos con el botón <strong>«Votar»</strong> en el catálogo.
          </span>
        </div>
        <div className="flex items-start gap-2">
          <span className="font-black text-amber-600 shrink-0">2.</span>
          <span className="text-slate-700">
            Comparte el enlace generado en tu grupo de <strong>WhatsApp</strong>.
          </span>
        </div>
        <div className="flex items-start gap-2">
          <span className="font-black text-amber-600 shrink-0">3.</span>
          <span className="text-slate-700">
            Cada miembro vota su favorito y descubrís el <strong>regalo ganador</strong>.
          </span>
        </div>
      </div>

      {/* Actions */}
      <div className="flex items-center gap-2">
        <button
          type="button"
          onClick={handleTryNow}
          className="flex-1 py-2 px-3 rounded-xl bg-[#febd69] hover:bg-[#f3a847] active:bg-[#e47911] text-slate-950 font-black text-xs text-center transition-colors shadow-xs cursor-pointer flex items-center justify-center gap-1.5"
        >
          <span>¡Probar ahora!</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </button>
        <button
          type="button"
          onClick={handleDismiss}
          className="py-2 px-3 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs text-center transition-colors cursor-pointer"
        >
          Entendido
        </button>
      </div>
    </aside>
  );
}
