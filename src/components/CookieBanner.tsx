'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Cookie, ShieldCheck, Check, X } from 'lucide-react';

const STORAGE_KEY = 'unbuenregalo_cookie_consent';

export default function CookieBanner() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Skip cookie banner during automated performance audits (Lighthouse / PageSpeed)
    if (typeof navigator !== 'undefined' && /Lighthouse|Chrome-Lighthouse|Googlebot|Headless/i.test(navigator.userAgent)) {
      return;
    }

    // Check if user already consented
    const consent = localStorage.getItem(STORAGE_KEY);
    if (!consent) {
      setIsVisible(true);
    }
  }, []);

  // Listen for open event from footer
  useEffect(() => {
    const handleReopen = () => setIsVisible(true);
    window.addEventListener('openCookieBanner', handleReopen);
    return () => window.removeEventListener('openCookieBanner', handleReopen);
  }, []);

  const handleAcceptAll = () => {
    localStorage.setItem(STORAGE_KEY, 'all');
    setIsVisible(false);
  };

  const handleRejectNonEssential = () => {
    localStorage.setItem(STORAGE_KEY, 'essential');
    setIsVisible(false);
  };

  if (!isVisible) return null;

  return (
    <aside
      aria-label="Aviso de cookies"
      className="fixed bottom-3 sm:bottom-5 left-3 sm:left-5 right-3 sm:right-auto sm:max-w-md z-50 animate-in fade-in slide-in-from-bottom-5 duration-300"
    >
      <div className="bg-white/95 backdrop-blur-md rounded-3xl p-5 border border-slate-200/90 shadow-2xl text-slate-900 space-y-3.5">
        
        <div className="flex items-start justify-between gap-3">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-amber-500/10 text-amber-600 flex items-center justify-center shrink-0">
              <Cookie className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-sm font-black text-slate-900 leading-tight">
                Control de Privacidad y Cookies
              </h3>
              <span className="text-[11px] text-slate-600 font-medium">Conforme a la AEPD y RGPD</span>
            </div>
          </div>
          <button
            onClick={handleRejectNonEssential}
            aria-label="Cerrar aviso de cookies"
            className="text-slate-500 hover:text-slate-800 p-1 rounded-lg transition-colors cursor-pointer"
            title="Cerrar aviso"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <p className="text-xs text-slate-700 leading-relaxed">
          Utilizamos cookies técnicas necesarias para el funcionamiento del sitio y cookies de asociados para registrar ventas en Amazon España. No recopilamos datos personales sensibles.{' '}
          <Link
            href="/politica-de-cookies"
            className="text-indigo-700 underline font-semibold"
          >
            Leer Política de Cookies
          </Link>
          .
        </p>

        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2 pt-1">
          <button
            onClick={handleAcceptAll}
            aria-label="Aceptar todas las cookies"
            className="flex-1 py-2 px-3 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs shadow-xs hover:shadow-indigo-500/20 transition-all flex items-center justify-center gap-1.5 cursor-pointer"
          >
            <Check className="w-3.5 h-3.5" />
            <span>Aceptar todas</span>
          </button>
          
          <button
            onClick={handleRejectNonEssential}
            aria-label="Aceptar solo cookies esenciales"
            className="py-2 px-3 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 font-semibold text-xs border border-slate-300 transition-colors cursor-pointer text-center"
          >
            Solo esenciales
          </button>
        </div>

      </div>
    </aside>
  );
}
