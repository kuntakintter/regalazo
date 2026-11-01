'use client';

import React, { useState, useEffect, useMemo, useCallback } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import HeaderMobile from '@/components/HeaderMobile';
import HeaderDesktop from '@/components/HeaderDesktop';
import { PRODUCTS, Product } from '@/data/products';
import { matchesSearchQuery } from '@/utils/search';
import { AmazonLiveItem } from '@/components/HeaderMobile';

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
  const pathname = usePathname();

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

  // Filter matching products from local verified catalog
  const liveMatches = useMemo(() => {
    const q = internalQuery.trim();
    if (q.length < 2) return [];
    return PRODUCTS.filter((p) => matchesSearchQuery(p, q)).slice(0, 4);
  }, [internalQuery]);

  // Live Amazon search with 300ms debounce
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
        const res = await fetch(`/api/live-search?q=${encodeURIComponent(q)}`, {
          signal: controller.signal,
        });
        const data = await res.json();
        if (data.success && Array.isArray(data.results)) {
          setAmazonResults(data.results);
        } else {
          setAmazonResults([]);
        }
      } catch (err: any) {
        if (err.name !== 'AbortError') {
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
  }, [internalQuery]);

  // Submit search from header (works on ANY page or active filter)
  const handleSearchSubmit = useCallback(
    (e: React.FormEvent) => {
      e.preventDefault();
      const q = internalQuery.trim();
      if (!q) return;

      setIsFocused(false);

      if (pathname === '/') {
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
        router.push(`/?q=${encodeURIComponent(q)}#catalogo-productos`);
      }
    },
    [internalQuery, pathname, onSearchChange, router]
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
      if (pathname === '/') {
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
        router.push(`/?q=${encodeURIComponent(product.title)}#catalogo-productos`);
      }
    },
    [pathname, onSearchChange, router]
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
