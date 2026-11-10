'use client';

import React, { useState, useEffect } from 'react';

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

function getTimeLeft(): TimeLeft {
  const now = new Date();
  const currentYear = now.getFullYear();
  let target = new Date(currentYear, 11, 24, 23, 59, 59);

  if (now.getTime() > target.getTime()) {
    target = new Date(currentYear + 1, 11, 24, 23, 59, 59);
  }

  const diff = Math.max(0, target.getTime() - now.getTime());
  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
  const minutes = Math.floor((diff / (1000 * 60)) % 60);
  const seconds = Math.floor((diff / 1000) % 60);

  return { days, hours, minutes, seconds };
}

export default function ChristmasCountdown({ compact = false }: { compact?: boolean }) {
  const [mounted, setMounted] = useState(false);
  const [timeLeft, setTimeLeft] = useState<TimeLeft>({ days: 0, hours: 0, minutes: 0, seconds: 0 });

  useEffect(() => {
    setMounted(true);
    setTimeLeft(getTimeLeft());

    const timer = setInterval(() => {
      setTimeLeft(getTimeLeft());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const formatUnit = (num: number) => String(num).padStart(2, '0');

  if (!mounted) {
    // Placeholder estático durante SSR para evitar mismatch de hidratación
    return (
      <div className="shrink-0 flex flex-col items-center justify-center select-none py-1">
        <span className="text-[10px] font-black uppercase tracking-wider text-amber-100 mb-1 flex items-center gap-1">
          <span>⏰</span>
          <span>Papá Noel llega en:</span>
        </span>
        <div className="flex items-center gap-1.5 sm:gap-2">
          {['--', '--', '--', '--'].map((val, i) => (
            <div
              key={i}
              className="bg-black/45 backdrop-blur-xs border border-amber-400/40 rounded-xl px-2 sm:px-2.5 py-1 text-center min-w-[38px] sm:min-w-[44px]"
            >
              <div className="text-sm sm:text-base font-black text-amber-300 tabular-nums leading-none">
                {val}
              </div>
              <div className="text-[8px] sm:text-[9px] font-bold text-amber-200 uppercase tracking-tight mt-0.5">
                {i === 0 ? 'Días' : i === 1 ? 'Horas' : i === 2 ? 'Min' : 'Seg'}
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="shrink-0 flex flex-col items-center justify-center select-none py-1">
      <div className="text-[10px] sm:text-[11px] font-black uppercase tracking-wider text-amber-100 mb-1 flex items-center gap-1.5 drop-shadow-xs">
        <span className="animate-pulse">✨</span>
        <span>Papá Noel llega en:</span>
      </div>

      <div className="flex items-center gap-1 sm:gap-1.5">
        {/* DÍAS */}
        <div className="bg-black/50 backdrop-blur-xs border border-amber-400/50 rounded-xl px-2 sm:px-2.5 py-1 text-center min-w-[38px] sm:min-w-[44px] shadow-inner shadow-black/40">
          <span className="text-sm sm:text-lg font-black text-amber-300 tabular-nums leading-none block">
            {formatUnit(timeLeft.days)}
          </span>
          <span className="text-[8px] sm:text-[9px] font-bold text-amber-100 uppercase tracking-tight leading-none block mt-0.5">
            Días
          </span>
        </div>

        <span className="text-amber-300 font-black text-xs sm:text-sm animate-pulse leading-none">:</span>

        {/* HORAS */}
        <div className="bg-black/50 backdrop-blur-xs border border-amber-400/50 rounded-xl px-2 sm:px-2.5 py-1 text-center min-w-[38px] sm:min-w-[44px] shadow-inner shadow-black/40">
          <span className="text-sm sm:text-lg font-black text-amber-300 tabular-nums leading-none block">
            {formatUnit(timeLeft.hours)}
          </span>
          <span className="text-[8px] sm:text-[9px] font-bold text-amber-100 uppercase tracking-tight leading-none block mt-0.5">
            Horas
          </span>
        </div>

        <span className="text-amber-300 font-black text-xs sm:text-sm animate-pulse leading-none">:</span>

        {/* MINUTOS */}
        <div className="bg-black/50 backdrop-blur-xs border border-amber-400/50 rounded-xl px-2 sm:px-2.5 py-1 text-center min-w-[38px] sm:min-w-[44px] shadow-inner shadow-black/40">
          <span className="text-sm sm:text-lg font-black text-amber-300 tabular-nums leading-none block">
            {formatUnit(timeLeft.minutes)}
          </span>
          <span className="text-[8px] sm:text-[9px] font-bold text-amber-100 uppercase tracking-tight leading-none block mt-0.5">
            Min
          </span>
        </div>

        <span className="text-amber-300 font-black text-xs sm:text-sm animate-pulse leading-none">:</span>

        {/* SEGUNDOS */}
        <div className="bg-black/50 backdrop-blur-xs border border-amber-400/50 rounded-xl px-2 sm:px-2.5 py-1 text-center min-w-[38px] sm:min-w-[44px] shadow-inner shadow-black/40">
          <span className="text-sm sm:text-lg font-black text-amber-300 tabular-nums leading-none block">
            {formatUnit(timeLeft.seconds)}
          </span>
          <span className="text-[8px] sm:text-[9px] font-bold text-amber-100 uppercase tracking-tight leading-none block mt-0.5">
            Seg
          </span>
        </div>
      </div>
    </div>
  );
}
