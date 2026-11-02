'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';

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
    <Link
      href="/"
      className="inline-flex items-center gap-2 sm:gap-2.5 shrink-0 group select-none transition-transform hover:scale-[1.01]"
    >
      {/* Bursting Gift Box Official Brand Icon */}
      <div
        className={`relative shrink-0 transition-transform duration-200 group-hover:scale-105 ${
          isCompact
            ? 'w-9 h-10'
            : isLarge
            ? 'w-13 h-14 sm:w-15 sm:h-16'
            : 'w-11 h-12 sm:w-12 sm:h-13'
        }`}
      >
        <Image
          src="/brand-icon.png"
          alt="Logo Un Buen Regalo"
          fill
          priority
          sizes="64px"
          className="object-contain drop-shadow-[0_1px_2px_rgba(255,255,255,0.25)]"
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
            <span className={isLight ? 'text-[#18b8d6]' : 'text-[#0aa2c0]'}>
              UN BUEN
            </span>{' '}
            <span className="text-[#f15950]">
              REGALO
            </span>
          </span>
        </div>

        {/* Subtitle / Domain */}
        {showSubtitle && (
          <div className="flex items-center gap-1.5 mt-1">
            <span
              className={`text-[10px] sm:text-[10.5px] font-black tracking-wide ${
                isLight ? 'text-[#18b8d6]' : 'text-[#0aa2c0]'
              }`}
            >
              unbuenregalo.es
            </span>
            <span className={`text-[9px] font-bold ${isLight ? 'text-slate-500' : 'text-slate-300'}`}>•</span>
            <span
              className={`text-[9px] sm:text-[9.5px] uppercase tracking-[0.1em] font-extrabold ${
                isLight ? 'text-slate-300 group-hover:text-white' : 'text-slate-500 group-hover:text-slate-800'
              } transition-colors`}
            >
              De 0 a +18 Años
            </span>
          </div>
        )}
      </div>
    </Link>
  );
}
