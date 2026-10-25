'use client';

import React from 'react';
import Link from 'next/link';

interface BrandLogoProps {
  size?: 'normal' | 'large' | 'compact';
  showSubtitle?: boolean;
  variant?: 'light' | 'dark';
}

export default function BrandLogo({ size = 'normal', showSubtitle = true, variant = 'dark' }: BrandLogoProps) {
  const isCompact = size === 'compact';
  const isLarge = size === 'large';
  const isLight = variant === 'light';

  return (
    <Link href="/" className="inline-flex flex-col shrink-0 group select-none transition-opacity hover:opacity-95">
      {/* Premium Typographic Wordmark */}
      <div className="flex items-center tracking-tight leading-none">
        <span
          className={`font-black tracking-tight ${
            isLight ? 'text-white' : 'text-slate-900'
          } ${
            isCompact
              ? 'text-lg tracking-[-0.03em]'
              : isLarge
              ? 'text-2xl sm:text-3xl tracking-[-0.04em]'
              : 'text-xl sm:text-[22px] tracking-[-0.035em]'
          }`}
        >
          UN BUEN{' '}
          <span
            className={
              isLight
                ? 'bg-gradient-to-r from-amber-400 via-amber-300 to-orange-400 bg-clip-text text-transparent'
                : 'bg-gradient-to-r from-indigo-600 via-indigo-600 to-violet-600 bg-clip-text text-transparent'
            }
          >
            REGALO
          </span>
        </span>
      </div>

      {/* Elegant Editorial Subtitle */}
      {showSubtitle && (
        <div className="flex items-center gap-1.5 mt-1">
          <span
            className={`text-[9.5px] uppercase tracking-[0.18em] font-extrabold ${
              isLight ? 'text-slate-300 group-hover:text-amber-300' : 'text-slate-400 group-hover:text-indigo-600'
            } transition-colors`}
          >
            Guía de Regalos
          </span>
          <span className={`text-[9px] font-bold ${isLight ? 'text-slate-500' : 'text-slate-300'}`}>•</span>
          <span
            className={`text-[9.5px] uppercase tracking-[0.12em] font-extrabold ${
              isLight ? 'text-amber-400' : 'text-indigo-600'
            }`}
          >
            De 0 a más de 18 Años
          </span>
        </div>
      )}
    </Link>
  );
}
