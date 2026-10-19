'use client';

import React from 'react';
import Link from 'next/link';

interface BrandLogoProps {
  size?: 'normal' | 'large' | 'compact';
  showSubtitle?: boolean;
}

export default function BrandLogo({ size = 'normal', showSubtitle = true }: BrandLogoProps) {
  const isCompact = size === 'compact';
  const isLarge = size === 'large';

  return (
    <Link href="/" className="inline-flex flex-col shrink-0 group select-none transition-opacity hover:opacity-95">
      {/* Premium Typographic Wordmark */}
      <div className="flex items-center tracking-tight leading-none">
        <span
          className={`font-black tracking-tight text-slate-900 ${
            isCompact
              ? 'text-lg tracking-[-0.03em]'
              : isLarge
              ? 'text-2xl sm:text-3xl tracking-[-0.04em]'
              : 'text-xl sm:text-[22px] tracking-[-0.035em]'
          }`}
        >
          UN BUEN{' '}
          <span className="bg-gradient-to-r from-indigo-600 via-indigo-600 to-violet-600 bg-clip-text text-transparent">
            REGALO
          </span>
        </span>
      </div>

      {/* Elegant Editorial Subtitle */}
      {showSubtitle && (
        <div className="flex items-center gap-1.5 mt-1">
          <span className="text-[9.5px] uppercase tracking-[0.18em] font-extrabold text-slate-400 group-hover:text-indigo-600 transition-colors">
            Guía de Regalos
          </span>
          <span className="text-[9px] text-slate-300 font-bold">•</span>
          <span className="text-[9.5px] uppercase tracking-[0.12em] font-extrabold text-indigo-600">
            0 a +18 Años
          </span>
        </div>
      )}
    </Link>
  );
}
