'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { X, ArrowRight, Clock, ShieldCheck, CheckCircle2 } from 'lucide-react';
import BlackFridayCountdown from '@/components/BlackFridayCountdown';

const SESSION_DISMISS_KEY = 'ubr_bf_popup_seen_2026';

export default function BlackFridayPopup() {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    try {
      if (sessionStorage.getItem(SESSION_DISMISS_KEY) === '1') return;
    } catch {
      // ignore storage errors
    }

    const timer = setTimeout(() => {
      setIsOpen(true);
    }, 1100);

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (!isOpen) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') handleClose();
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [isOpen]);

  const handleClose = () => {
    setIsOpen(false);
    try {
      sessionStorage.setItem(SESSION_DISMISS_KEY, '1');
    } catch {
      // ignore storage errors
    }
  };

  if (!isOpen) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="bf-popup-title"
      className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-950/75 backdrop-blur-sm animate-in fade-in duration-200"
      onClick={handleClose}
    >
      <div
        className="relative w-full max-w-lg rounded-3xl bg-gradient-to-br from-black via-slate-950 to-neutral-950 text-white border-2 border-amber-400 shadow-2xl shadow-black/75 overflow-hidden p-6 sm:p-8 animate-in zoom-in-95 duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Subtle Gold Glows */}
        <div className="absolute -top-20 -right-20 w-56 h-56 rounded-full bg-amber-500/15 blur-3xl pointer-events-none" />
        <div className="absolute -bottom-20 -left-20 w-56 h-56 rounded-full bg-amber-400/10 blur-3xl pointer-events-none" />

        {/* Close Button */}
        <button
          type="button"
          onClick={handleClose}
          aria-label="Cerrar aviso de Black Friday"
          className="absolute top-4 right-4 z-20 w-9 h-9 rounded-full bg-white/10 hover:bg-white/20 text-slate-200 hover:text-white flex items-center justify-center transition-colors cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="relative z-10 text-center flex flex-col items-center">
          {/* Top Badge */}
          <span className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-black border-2 border-amber-400 text-amber-300 font-black text-xs uppercase tracking-wider shadow-md mb-4">
            <span className="inline-flex items-center justify-center px-1 rounded bg-amber-400/20 text-amber-300 font-black">
              %
            </span>
            <span>BLACK FRIDAY 2026 ACTIVO</span>
          </span>

          <h2
            id="bf-popup-title"
            className="text-2xl sm:text-3xl font-black tracking-tight leading-tight mb-2.5"
          >
            ¡Miles de productos con{' '}
            <span className="bg-gradient-to-r from-amber-300 via-yellow-400 to-amber-200 bg-clip-text text-transparent">
              descuento real
            </span>{' '}
            en Black Friday!
          </h2>

          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed max-w-md mb-5">
            Hemos abierto el especial <strong>Black Friday</strong> ordenado de mayor a menor{' '}
            <strong>% de ahorro real</strong>, con filtro por precio exacto, edades, categorías y los
            precios más bajos de vendedores verificados.
          </p>

          {/* Urgency Countdown Box */}
          <div className="w-full rounded-2xl bg-black/90 border border-amber-400/60 p-4 mb-5 flex flex-col items-center gap-2.5">
            <span className="text-[11px] font-black uppercase tracking-widest text-amber-300 flex items-center gap-1.5">
              <Clock className="w-3.5 h-3.5 text-amber-300 animate-pulse" aria-hidden="true" />
              <span>¡El Black Friday termina en:</span>
            </span>
            <BlackFridayCountdown />
          </div>

          {/* Trust bullets */}
          <div className="flex flex-wrap items-center justify-center gap-x-4 gap-y-1.5 text-[11px] text-slate-200 font-semibold mb-6">
            <span className="flex items-center gap-1">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
              <span>Precios y fotos 100% reales</span>
            </span>
            <span className="flex items-center gap-1">
              <ShieldCheck className="w-3.5 h-3.5 text-amber-400" />
              <span>Devolución ampliada Navidad</span>
            </span>
          </div>

          {/* Primary CTA */}
          <Link
            href="/black-friday"
            onClick={handleClose}
            className="w-full py-3.5 px-6 rounded-2xl bg-black hover:bg-slate-900 text-amber-300 hover:text-amber-200 border-2 border-amber-400 font-black text-sm sm:text-base shadow-lg shadow-amber-500/20 hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-center gap-2 cursor-pointer"
          >
            <span className="inline-flex items-center justify-center px-1.5 py-0.5 rounded bg-amber-400/20 text-amber-300 font-black text-xs">
              %
            </span>
            <span>Ver Black Friday</span>
            <ArrowRight className="w-4 h-4 stroke-[2.5]" aria-hidden="true" />
          </Link>

          <button
            type="button"
            onClick={handleClose}
            className="mt-3 text-xs font-semibold text-slate-400 hover:text-slate-200 transition-colors cursor-pointer"
          >
            Seguir explorando la portada
          </button>
        </div>
      </div>
    </div>
  );
}
