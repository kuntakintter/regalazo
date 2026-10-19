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
    <Link href="/" className="flex items-center gap-3 shrink-0 group select-none">
      {/* Premium Custom SVG Emblem */}
      <div className={`relative rounded-2xl bg-gradient-to-br from-indigo-600 via-indigo-700 to-slate-900 p-0.5 shadow-md shadow-indigo-600/20 group-hover:shadow-indigo-600/35 transition-all duration-300 group-hover:scale-105 flex items-center justify-center shrink-0 ${
        isCompact ? 'w-9 h-9 rounded-xl' : isLarge ? 'w-12 h-12 rounded-2xl' : 'w-10 h-10 sm:w-11 sm:h-11'
      }`}>
        {/* Subtle glass reflection overlay */}
        <div className="w-full h-full rounded-[14px] bg-gradient-to-b from-white/15 to-transparent flex items-center justify-center relative overflow-hidden">
          <svg
            className={`${isCompact ? 'w-4 h-4' : isLarge ? 'w-6 h-6' : 'w-5 h-5'} transition-transform group-hover:scale-105 duration-300`}
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            {/* Box Body */}
            <rect
              x="3.5"
              y="10.5"
              width="17"
              height="10"
              rx="2.5"
              className="fill-indigo-400/30 stroke-white"
              strokeWidth="1.8"
              strokeLinejoin="round"
            />
            {/* Box Lid */}
            <rect
              x="2.5"
              y="6.5"
              width="19"
              height="4"
              rx="1.5"
              className="fill-white/90 stroke-white"
              strokeWidth="1.8"
              strokeLinejoin="round"
            />
            {/* Vertical Golden Ribbon */}
            <path
              d="M12 6.5V20.5"
              stroke="#F59E0B"
              strokeWidth="2.4"
              strokeLinecap="round"
            />
            {/* Horizontal Golden Ribbon on Lid */}
            <path
              d="M2.5 8.5H21.5"
              stroke="#F59E0B"
              strokeWidth="1.4"
              strokeOpacity="0.4"
              strokeLinecap="round"
            />
            {/* Ribbon Bow Knot (Left & Right Wings) */}
            <path
              d="M12 6.5C10 6.5 8 4.8 9 3.2C10 1.6 12 4.2 12 6.5Z"
              fill="#FDE68A"
              stroke="#D97706"
              strokeWidth="1.2"
              strokeLinejoin="round"
            />
            <path
              d="M12 6.5C14 6.5 16 4.8 15 3.2C14 1.6 12 4.2 12 6.5Z"
              fill="#FDE68A"
              stroke="#D97706"
              strokeWidth="1.2"
              strokeLinejoin="round"
            />
            {/* Center Bow Gem */}
            <circle cx="12" cy="6.5" r="1.2" fill="#F59E0B" />
          </svg>
        </div>
      </div>

      {/* Typography */}
      <div>
        <div className="flex items-center tracking-tight leading-none">
          <span className={`font-black text-slate-900 tracking-tight flex items-baseline ${
            isCompact ? 'text-base' : isLarge ? 'text-2xl' : 'text-lg sm:text-[20px]'
          }`}>
            <span>UN BUEN&nbsp;</span>
            <span className="bg-gradient-to-r from-indigo-600 to-violet-600 bg-clip-text text-transparent">
              REGALO
            </span>
          </span>
        </div>

        {showSubtitle && (
          <div className="flex items-center gap-1.5 mt-0.5">
            <span className="text-[9.5px] uppercase tracking-wider font-extrabold text-indigo-700 bg-indigo-50 px-1.5 py-0.2 rounded border border-indigo-100">
              0 a +18 Años
            </span>
            <span className="text-[10px] tracking-wide text-slate-400 font-medium hidden sm:inline">
              • Guía Oficial
            </span>
          </div>
        )}
      </div>
    </Link>
  );
}
