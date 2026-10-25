'use client';

import React, { useState, useEffect, useMemo, useCallback } from 'react';
import HeaderMobile from '@/components/HeaderMobile';
import HeaderDesktop from '@/components/HeaderDesktop';
import { PRODUCTS } from '@/data/products';
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
  const [isFocused, setIsFocused] = useState(false);
  const [amazonResults, setAmazonResults] = useState<AmazonLiveItem[]>([]);
  const [isLoadingAmazon, setIsLoadingAmazon] = useState(false);

  // Filter matching products from local verified catalog
  const liveMatches = useMemo(() => {
    if (!searchQuery || searchQuery.trim().length < 2) return [];
    return PRODUCTS.filter((p) => matchesSearchQuery(p, searchQuery)).slice(0, 3);
  }, [searchQuery]);

  // Live Amazon search with 300ms debounce
  useEffect(() => {
    const q = searchQuery.trim();
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
  }, [searchQuery]);

  const handleSearchSubmit = useCallback((e: React.FormEvent) => {
    e.preventDefault();
    setIsFocused(false);
    const target = document.getElementById('catalogo-productos');
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  }, []);

  const clearSearch = useCallback(() => {
    onSearchChange?.('');
    setAmazonResults([]);
    setIsFocused(false);
  }, [onSearchChange]);

  return (
    <header className="sticky top-0 z-50 transition-colors duration-300 shadow-md w-full">
      {/* 1. PLANTILLA EXCLUSIVA MÓVIL (< md) */}
      <div className="block md:hidden">
        <HeaderMobile
          searchQuery={searchQuery}
          onSearchChange={onSearchChange}
          onSearchSubmit={handleSearchSubmit}
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
          searchQuery={searchQuery}
          onSearchChange={onSearchChange}
          onSearchSubmit={handleSearchSubmit}
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
