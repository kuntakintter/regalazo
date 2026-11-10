'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useActiveLocale } from '@/hooks/useActiveLocale';

interface BrandLogoProps {
  size?: 'normal' | 'large' | 'compact';
  showSubtitle?: boolean;
  variant?: 'light' | 'dark';
}

export default function BrandLogo({ size = 'normal', showSubtitle = true, variant = 'dark' }: BrandLogoProps) {
  const { ui, localePath } = useActiveLocale();
  const isCompact = size === 'compact';
  const isLarge = size === 'large';
  const isLight = variant === 'light';

  const brandWords = ui.brandName.trim().split(/\s+/);
  const firstPart = brandWords.length > 1 ? brandWords.slice(0, -1).join(' ') : ui.brandName;
  const lastWord = brandWords.length > 1 ? brandWords[brandWords.length - 1] : '';

  return (
    <Link
      href={localePath('/')}
      className="inline-flex items-center gap-2 sm:gap-2.5 shrink-0 group select-none transition-transform hover:scale-[1.01]"
    >
      {/* Bursting Gift Box Official Brand Icon */}
      <div
        className={`relative shrink-0 transition-transform duration-200 group-hover:scale-105 ${
          isCompact
            ? 'w-10 h-11'
            : isLarge
            ? 'w-14 h-15 sm:w-16 sm:h-17'
            : 'w-12 h-13 sm:w-[52px] sm:h-[58px]'
        }`}
      >
        <Image
          src="/brand-icon.png"
          alt={ui.logoAlt}
          fill
          loading="eager"
          sizes="(max-width: 640px) 48px, 64px"
          className="object-contain"
        />
      </div>

      {/* Brand Wordmark & Subtitle matching the official logo palette */}
      <div className="flex flex-col justify-center leading-none">
        <div className="flex items-center tracking-tight leading-none">
          <span
            className={`font-black uppercase ${
              isCompact
                ? 'text-[17px] tracking-[-0.02em]'
                : isLarge
                ? 'text-2xl sm:text-3xl tracking-[-0.03em]'
                : 'text-xl sm:text-[23px] tracking-[-0.025em]'
            }`}
          >
            <span className={isLight ? 'text-[#38bdf8]' : 'text-[#07687a]'}>
              {firstPart}
            </span>
            {lastWord ? (
              <>
                {' '}
                <span className={isLight ? 'text-[#f87171]' : 'text-[#c42b22]'}>
                  {lastWord}
                </span>
              </>
            ) : null}
          </span>
        </div>

        {/* Subtitle / Domain */}
        {showSubtitle && (
          <div className="flex items-center gap-1.5 mt-1">
            <span
              className={`text-[10px] sm:text-[10.5px] font-black tracking-wide ${
                isLight ? 'text-[#38bdf8]' : 'text-[#07687a]'
              }`}
            >
              unbuenregalo.es
            </span>
            <span className={`text-[9px] font-bold ${isLight ? 'text-slate-400' : 'text-slate-600'}`}>•</span>
            <span
              className={`text-[9px] sm:text-[9.5px] uppercase tracking-[0.1em] font-extrabold ${
                isLight ? 'text-slate-300 group-hover:text-white' : 'text-slate-600 group-hover:text-slate-900'
              } transition-colors`}
            >
              {ui.brandAgesSubtitle}
            </span>
          </div>
        )}
      </div>
    </Link>
  );
}
