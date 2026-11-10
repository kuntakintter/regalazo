'use client';

import React, { useState, useEffect, useMemo, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import HeaderMobile from '@/components/HeaderMobile';
import HeaderDesktop from '@/components/HeaderDesktop';
import { Product } from '@/data/products';
import { ALL_SITE_PRODUCTS } from '@/data/allCatalogProducts';
import { matchesSearchQuery } from '@/utils/search';
import { AmazonLiveItem } from '@/components/HeaderMobile';
import { useActiveLocale } from '@/hooks/useActiveLocale';

interface HeaderProps {
  currentTheme?: 'baby' | 'kids' | 'gamer' | 'emo' | 'tech' | 'classic';
  onThemeChange?: (theme: 'baby' | 'kids' | 'gamer' | 'emo' | 'tech' | 'classic') => void;
  onSearchChange?: (query: string) => void;
  searchQuery?: string;
}

export default function Header({
  onSearchChange,
  searchQuery = '',
}: HeaderProps) {
  const router = useRouter();
  const { pathname, amazonRegion, localePath } = useActiveLocale();

  const homePath = localePath('/');

  // Internal state ensures the search bar is always interactive on ANY page/filter
  const [internalQuery, setInternalQuery] = useState(searchQuery || '');
  const [isFocused, setIsFocused] = useState(false);
  const [amazonResults, setAmazonResults] = useState<AmazonLiveItem[]>([]);
  const [isLoadingAmazon, setIsLoadingAmazon] = useState(false);

  // Sync internal state when parent passes or updates searchQuery
  useEffect(() => {
    setInternalQuery(searchQuery || '');
  }, [searchQuery]);

  // Handle live input typing
  const handleSearchChangeInternal = useCallback(
    (query: string) => {
      setInternalQuery(query);
      if (onSearchChange) {
        onSearchChange(query);
      }
    },
    [onSearchChange]
  );

  // Filter matching products across all site catalogs (Age guides + Niche Hubs)
  const liveMatches = useMemo(() => {
    const q = internalQuery.trim();
    if (q.length < 2) return [];
    return ALL_SITE_PRODUCTS.filter((p) => matchesSearchQuery(p, q)).slice(0, 5);
  }, [internalQuery]);

  // Live Amazon search with 320ms debounce
  useEffect(() => {
    const q = internalQuery.trim();
    if (q.length < 2) {
      setAmazonResults([]);
      setIsLoadingAmazon(false);
      return;
    }

    setIsLoadingAmazon(true);
    const controller = new AbortController();
    const timer = setTimeout(async () => {
      try {
        const res = await fetch(
          `/api/live-search?q=${encodeURIComponent(q)}&region=${amazonRegion}`,
          {
            signal: controller.signal,
          }
        );
        const data = await res.json();
        if (data.success && Array.isArray(data.results)) {
          setAmazonResults(data.results);
        } else {
          setAmazonResults([]);
        }
      } catch (err: unknown) {
        if ((err as { name?: string })?.name !== 'AbortError') {
          setAmazonResults([]);
        }
      } finally {
        setIsLoadingAmazon(false);
      }
    }, 320);

    return () => {
      clearTimeout(timer);
      controller.abort();
    };
  }, [internalQuery, amazonRegion]);

  // Submit search from header (works on ANY page or active filter)
  const handleSearchSubmit = useCallback(
    (e: React.FormEvent) => {
      e.preventDefault();
      const q = internalQuery.trim();
      if (!q) return;

      setIsFocused(false);

      if (pathname === homePath) {
        if (onSearchChange) {
          onSearchChange(q);
        }
        if (typeof window !== 'undefined') {
          window.dispatchEvent(new CustomEvent('site-search', { detail: q }));
        }
        const target = document.getElementById('catalogo-productos');
        if (target) {
          target.scrollIntoView({ behavior: 'smooth' });
        }
      } else {
        router.push(`${homePath}?q=${encodeURIComponent(q)}`);
      }
    },
    [internalQuery, pathname, homePath, onSearchChange, router]
  );

  // Clear search input
  const clearSearch = useCallback(() => {
    setInternalQuery('');
    if (onSearchChange) {
      onSearchChange('');
    }
    if (typeof window !== 'undefined') {
      window.dispatchEvent(new CustomEvent('site-search', { detail: '' }));
    }
    setAmazonResults([]);
    setIsFocused(false);
  }, [onSearchChange]);

  // Select a product from the recommended live matches dropdown
  const handleSelectProduct = useCallback(
    (product: Product) => {
      setIsFocused(false);
      setInternalQuery(product.title);
      if (pathname === homePath) {
        if (onSearchChange) {
          onSearchChange(product.title);
        }
        if (typeof window !== 'undefined') {
          window.dispatchEvent(new CustomEvent('site-search', { detail: product.title }));
        }
        const target = document.getElementById('catalogo-productos');
        if (target) {
          target.scrollIntoView({ behavior: 'smooth' });
        }
      } else {
        router.push(`${homePath}?q=${encodeURIComponent(product.title)}`);
      }
    },
    [pathname, homePath, onSearchChange, router]
  );

  return (
    <header className="sticky top-0 z-50 transition-colors duration-300 shadow-md w-full">
      {/* 1. PLANTILLA EXCLUSIVA MÓVIL (< md) */}
      <div className="block md:hidden">
        <HeaderMobile
          searchQuery={internalQuery}
          onSearchChange={handleSearchChangeInternal}
          onSearchSubmit={handleSearchSubmit}
          onSelectProduct={handleSelectProduct}
          clearSearch={clearSearch}
          isFocused={isFocused}
          setIsFocused={setIsFocused}
          liveMatches={liveMatches}
          amazonResults={amazonResults}
          isLoadingAmazon={isLoadingAmazon}
        />
      </div>

      {/* 2. PLANTILLA EXCLUSIVA ORDENADOR (>= md) */}
      <div className="hidden md:block">
        <HeaderDesktop
          searchQuery={internalQuery}
          onSearchChange={handleSearchChangeInternal}
          onSearchSubmit={handleSearchSubmit}
          onSelectProduct={handleSelectProduct}
          clearSearch={clearSearch}
          isFocused={isFocused}
          setIsFocused={setIsFocused}
          liveMatches={liveMatches}
          amazonResults={amazonResults}
          isLoadingAmazon={isLoadingAmazon}
        />
      </div>
    </header>
  );
}
