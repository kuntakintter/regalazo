'use client';

import React, { useState, useEffect } from 'react';
import { Clock } from 'lucide-react';

export default function BlackFridayCountdown({ compact = false }: { compact?: boolean }) {
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const compute = () => {
      const now = new Date();
      let target = new Date('2026-11-27T23:59:59+01:00');
      if (now.getTime() > target.getTime()) {
        target = new Date('2026-11-30T23:59:59+01:00');
      }
      const diff = Math.max(0, target.getTime() - now.getTime());
      const days = Math.floor(diff / (1000 * 60 * 60 * 24));
      const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
      const minutes = Math.floor((diff / (1000 * 60)) % 60);
      const seconds = Math.floor((diff / 1000) % 60);
      setTimeLeft({ days, hours, minutes, seconds });
    };
    compute();
    const id = setInterval(compute, 1000);
    return () => clearInterval(id);
  }, []);

  if (!mounted) return null;

  if (compact) {
    return (
      <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-xl bg-rose-950/80 border border-rose-500/60 text-white shadow-sm">
        <Clock className="w-3.5 h-3.5 text-amber-300 animate-pulse shrink-0" aria-hidden="true" />
        <span className="text-[11px] font-bold text-rose-200 uppercase tracking-wide whitespace-nowrap">
          Termina en:
        </span>
        <span className="text-xs font-black text-amber-300 tabular-nums whitespace-nowrap">
          {String(timeLeft.days).padStart(2, '0')}d : {String(timeLeft.hours).padStart(2, '0')}h :{' '}
          {String(timeLeft.minutes).padStart(2, '0')}m : {String(timeLeft.seconds).padStart(2, '0')}s
        </span>
      </div>
    );
  }

  return (
    <div className="flex items-center gap-2">
      {[
        { val: timeLeft.days, label: 'DÍAS' },
        { val: timeLeft.hours, label: 'HRS' },
        { val: timeLeft.minutes, label: 'MIN' },
        { val: timeLeft.seconds, label: 'SEG' },
      ].map((unit) => (
        <div
          key={unit.label}
          className="flex flex-col items-center justify-center min-w-[46px] px-2 py-1.5 rounded-xl bg-white/10 border border-amber-400/40 backdrop-blur-xs"
        >
          <span className="text-base sm:text-lg font-black text-white leading-none tabular-nums">
            {String(unit.val).padStart(2, '0')}
          </span>
          <span className="text-[9px] font-bold text-amber-300 tracking-wider mt-0.5">
            {unit.label}
          </span>
        </div>
      ))}
    </div>
  );
}
