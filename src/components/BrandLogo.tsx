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

  return (
    <Link
      href={localePath('/')}
      className="inline-flex items-center shrink-0 group select-none transition-transform hover:scale-[1.02]"
      title="Un Buen Regalo - Inicio"
    >
      <div
        className={`relative shrink-0 flex items-center ${
          isCompact
            ? 'h-9 sm:h-10 w-[122px] sm:w-[136px]'
            : isLarge
            ? 'h-13 sm:h-15 w-[170px] sm:w-[200px]'
            : 'h-11 sm:h-12 w-[148px] sm:w-[168px]'
        }`}
      >
        <Image
          src="/logo-header.png"
          alt={ui.logoAlt || 'Un Buen Regalo'}
          fill
          priority
          sizes="(max-width: 640px) 136px, 168px"
          className="object-contain object-left"
        />
      </div>
      <span className="sr-only">{ui.brandName}</span>
    </Link>
  );
}
