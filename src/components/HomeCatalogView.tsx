'use client';

import React, { useState, useMemo, useEffect, useCallback } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { parsePrice, getAmazonProductUrl } from '@/lib/amazon';
import { generateProductItemListSchema } from '@/lib/schemaProduct';
import { matchesAnyKeywordWordSafe, matchesPriceFilter } from '@/lib/filterUtils';
import { SEO_AGE_ROUTES } from '@/lib/seoRoutes';
import { SEO_FILTER_ROUTES } from '@/lib/filterRoutes';
import { useActiveLocale } from '@/hooks/useActiveLocale';
import {
  applyCurrencyDisplay,
  getHubStrings,
  getLocalizedAgeMeta,
  getUiStrings,
  normalizeLocaleKey,
} from '@/lib/i18nContent';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import FilterBar from '@/components/FilterBar';
import ProductCard from '@/components/ProductCard';
import LiveAmazonProductCard from '@/components/LiveAmazonProductCard';
import GiftWizard from '@/components/GiftWizard';
import SeoFaq from '@/components/SeoFaq';
import SocialShareWidget from '@/components/SocialShareWidget';
import ThemeAtmosphere from '@/components/ThemeAtmosphere';
import AmazonLiveSearchCard from '@/components/AmazonLiveSearchCard';
import AmazonGridDiscoveryCard from '@/components/AmazonGridDiscoveryCard';
import ChristmasCountdown from '@/components/ChristmasCountdown';
import {
  PRODUCTS,
  AGE_CATEGORIES,
  GENERAL_CATEGORY_MAPPING,
  Product,
  CLOTHING_SUBFILTERS,
  isClothingCategory,
  ANIME_SERIES_SUBFILTERS,
  isFiguresCategory,
  WHEELS_MOTOR_SUBFILTERS,
  isWheelsMotorCategory,
} from '@/data/products';
import { ALL_SITE_PRODUCTS } from '@/data/allCatalogProducts';
import { matchesSearchQuery } from '@/utils/search';
import { LiveSearchResult } from '@/app/api/live-search/route';
import { I18nRouteConfig } from '@/lib/i18nRoutes';
import {
  BadgePercent,
  Gift,
  Baby,
  Puzzle,
  Palette,
  Wand2,
  Rocket,
  Headphones,
  Gamepad2,
  Wine,
  ShieldCheck,
  TrendingUp,
  Search,
  Star,
  Bot,
  Loader2,
  RefreshCw,
  ShoppingBag,
  SlidersHorizontal,
  ArrowRight,
  X,
} from 'lucide-react';

interface QuickPromptConfig {
  id: string;
  emoji: string;
  termKey?: string;
  hubSlug?: string;
  priceKey?: string;
  esLabel?: string;
  query: string;
  price?: string;
  category?: string;
  gender?: 'boy' | 'girl' | 'reveal' | 'all';
  sort?: 'featured' | 'price-asc' | 'price-desc' | 'rating';
}

const QUICK_PROMPTS: QuickPromptConfig[] = [
  { id: 'men', emoji: '👨', termKey: 'Regalos para Él', query: '', gender: 'boy' },
  { id: 'women', emoji: '👩', termKey: 'Regalos para Ella', query: '', gender: 'girl' },
  { id: 'boyfriend', emoji: '❤️', termKey: 'Qué Regalar a mi Novio', query: 'novio' },
  { id: 'under20', emoji: '🏷️', priceKey: '<20', query: '', price: '<20', sort: 'price-asc' },
  {
    id: 'under15',
    emoji: '🎁',
    priceKey: '<15',
    esLabel: 'Amigo Invisible (<15 €)',
    query: '',
    price: '<15',
    sort: 'price-asc',
  },
  { id: 'gaming', emoji: '🎮', hubSlug: 'gaming', query: 'gaming' },
  {
    id: 'wheels',
    emoji: '🏎️',
    termKey: 'Sobre Ruedas: Coches, Quads y Patinetes',
    query: '',
    category: 'Sobre Ruedas: Coches, Quads y Patinetes',
  },
  { id: 'kids', emoji: '👶', termKey: 'Bebés (0-12 meses)', query: 'bebe' },
  { id: 'bikers', emoji: '🏍️', hubSlug: 'motoristas', query: 'moto' },
  { id: 'coffee', emoji: '☕', hubSlug: 'amantes-del-cafe', query: 'cafe' },
];

const HOME_FEATURED_FILTERS = [
  'regalos-para-el',
  'regalos-para-ella',
  'regalos-menos-15-euros',
  'regalos-de-15-a-30-euros',
  'regalos-de-30-a-60-euros',
  'regalos-mas-de-60-euros',
  'minimotos-y-motos-electricas',
  'coches-electricos-para-ninos',
  'figuras-one-piece',
  'figuras-dragon-ball',
  'cartas-y-sobres-pokemon',
  'lego-y-construccion',
  'videojuegos-y-setup-gamer',
  'perfumeria-colonias-y-fragancias',
  'sobre-ruedas-coches-quads-y-patinetes',
  'escapadas-y-experiencias-regalo',
] as const;

const AGE_BANNER_ICONS: Record<
  string,
  { icon: React.ComponentType<{ className?: string }>; bg: string; color: string }
> = {
  '0-12m': { icon: Baby, bg: 'bg-rose-50 border-rose-200', color: 'text-rose-600' },
  '1-3': { icon: Puzzle, bg: 'bg-emerald-50 border-emerald-200', color: 'text-emerald-600' },
  '4-6': { icon: Palette, bg: 'bg-amber-50 border-amber-200', color: 'text-amber-600' },
  '7-9': { icon: Wand2, bg: 'bg-indigo-50 border-indigo-200', color: 'text-indigo-600' },
  '10-12': { icon: Rocket, bg: 'bg-blue-50 border-blue-200', color: 'text-blue-600' },
  '13-15': { icon: Headphones, bg: 'bg-violet-50 border-violet-200', color: 'text-violet-600' },
  '16-18': { icon: Gamepad2, bg: 'bg-purple-50 border-purple-200', color: 'text-purple-600' },
  '+18': { icon: Wine, bg: 'bg-rose-50 border-rose-200', color: 'text-rose-700' },
};

export function HomeCatalogView({ i18nConfig }: { i18nConfig?: I18nRouteConfig }) {
  const router = useRouter();
  const {
    localeKey: routeLocaleKey,
    localePath,
    tTerm,
    tBudget,
    ui: routeUi,
    activeCurrency,
    countryCode,
    amazonRegion,
    amazonSiteName,
    formatPrice,
    isRtl,
  } = useActiveLocale();

  const effectiveLocaleKey = i18nConfig
    ? normalizeLocaleKey(i18nConfig.slug)
    : routeLocaleKey;
  const ui = i18nConfig ? getUiStrings(effectiveLocaleKey) : routeUi;
  const isEs = effectiveLocaleKey === 'es' || effectiveLocaleKey === 'es-us';

  const [selectedAge, setSelectedAge] = useState<string>('all');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedClothingSub, setSelectedClothingSub] = useState<string>('all');
  const [selectedAnimeSub, setSelectedAnimeSub] = useState<string>('all');
  const [selectedWheelsSub, setSelectedWheelsSub] = useState<string>('all');
  const [selectedGender, setSelectedGender] = useState<'all' | 'boy' | 'girl' | 'reveal'>('all');
  const [selectedPrice, setSelectedPrice] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [sortBy, setSortBy] = useState<'featured' | 'price-asc' | 'price-desc' | 'rating'>('featured');
  const [visibleCount, setVisibleCount] = useState<number>(18);
  const [isAiModalOpen, setIsAiModalOpen] = useState(false);
  const [showAdvancedFilters, setShowAdvancedFilters] = useState<boolean>(false);

  const getPromptLabel = (prompt: QuickPromptConfig): string => {
    if (prompt.priceKey) {
      if (effectiveLocaleKey === 'es' && prompt.esLabel) {
        return `${prompt.emoji} ${prompt.esLabel}`;
      }
      return `${prompt.emoji} ${tBudget(prompt.priceKey)}`;
    }
    if (prompt.hubSlug) {
      return `${prompt.emoji} ${getHubStrings(effectiveLocaleKey, prompt.hubSlug).breadcrumbLabel}`;
    }
    if (prompt.termKey) {
      return `${prompt.emoji} ${tTerm(prompt.termKey)}`;
    }
    return prompt.emoji;
  };

  // Sample diverse products across categories so every 2x2 wing slide is varied
  const sampleDiverseShowcase = (pool: Product[], count: number = 16, seed: number = 0): Product[] => {
    const categoryMap: Record<string, Product[]> = {};
    pool.forEach((p) => {
      const cat = p.category || 'Varios';
      if (!categoryMap[cat]) categoryMap[cat] = [];
      categoryMap[cat].push(p);
    });

    const categories = Object.keys(categoryMap);
    if (categories.length === 0) return pool.slice(0, count);

    categories.forEach((cat) => {
      categoryMap[cat].sort(
        (a, b) => (b.reviewsCount || 0) * (b.rating || 1) - (a.reviewsCount || 0) * (a.rating || 1)
      );
    });

    const offset = seed % categories.length;
    const rotatedCategories = [...categories.slice(offset), ...categories.slice(0, offset)];

    const result: Product[] = [];
    const pointers: Record<string, number> = {};
    rotatedCategories.forEach((cat) => (pointers[cat] = 0));

    let iteration = 0;
    while (result.length < count && iteration < 40) {
      iteration++;
      let addedInRound = false;

      for (const cat of rotatedCategories) {
        if (result.length >= count) break;
        const list = categoryMap[cat];
        const ptr = pointers[cat];
        if (ptr < list.length) {
          result.push(list[ptr]);
          pointers[cat] = ptr + 1;
          addedInRound = true;
        }
      }

      if (!addedInRound) break;
    }

    return result.length > 0 ? result : pool.slice(0, count);
  };

  const topShowcasePool = useMemo(() => {
    const highRated = PRODUCTS.filter((p) => p.rating >= 4.6 && p.imageUrl);
    return sampleDiverseShowcase(highRated, 16, 0);
  }, []);

  const budgetShowcasePool = useMemo(() => {
    const topIds = new Set(topShowcasePool.map((p) => p.id));
    const budgetItems = PRODUCTS.filter((p) => {
      const price = parsePrice(p.priceText);
      return price > 0 && price <= 20 && p.imageUrl && !topIds.has(p.id);
    });
    return sampleDiverseShowcase(budgetItems, 16, 3);
  }, [topShowcasePool]);

  const [leftCarouselIndex, setLeftCarouselIndex] = useState(0);
  const [rightCarouselIndex, setRightCarouselIndex] = useState(0);
  const [isLeftPaused, setIsLeftPaused] = useState(false);
  const [isRightPaused, setIsRightPaused] = useState(false);

  const leftSlides = useMemo(() => {
    const slides: Product[][] = [];
    for (let i = 0; i < topShowcasePool.length; i += 4) {
      slides.push(topShowcasePool.slice(i, i + 4));
    }
    return slides;
  }, [topShowcasePool]);

  const rightSlides = useMemo(() => {
    const slides: Product[][] = [];
    for (let i = 0; i < budgetShowcasePool.length; i += 4) {
      slides.push(budgetShowcasePool.slice(i, i + 4));
    }
    return slides;
  }, [budgetShowcasePool]);

  useEffect(() => {
    if (isLeftPaused || leftSlides.length <= 1) return;
    const timer = setInterval(() => {
      setLeftCarouselIndex((prev) => (prev + 1) % leftSlides.length);
    }, 10000);
    return () => clearInterval(timer);
  }, [isLeftPaused, leftSlides.length]);

  useEffect(() => {
    if (isRightPaused || rightSlides.length <= 1) return;
    const timer = setInterval(() => {
      setRightCarouselIndex((prev) => (prev + 1) % rightSlides.length);
    }, 10000);
    return () => clearInterval(timer);
  }, [isRightPaused, rightSlides.length]);

  const [liveAmazonProducts, setLiveAmazonProducts] = useState<LiveSearchResult[]>([]);
  const [isLoadingLive, setIsLoadingLive] = useState(false);

  const handleQuickPrompt = (promptItem: {
    query: string;
    price?: string;
    category?: string;
    gender?: 'boy' | 'girl' | 'reveal' | 'all';
    sort?: 'featured' | 'price-asc' | 'price-desc' | 'rating';
  }) => {
    setSearchQuery(promptItem.query);
    setSelectedPrice(promptItem.price || 'all');
    setSelectedGender(promptItem.gender || 'all');
    setSortBy(promptItem.sort || 'featured');
    setSelectedAge('all');
    if (promptItem.category) {
      setSelectedCategory(promptItem.category);
      setShowAdvancedFilters(true);
    } else {
      setSelectedCategory('all');
    }
    setSelectedClothingSub('all');
    setSelectedAnimeSub('all');
    setSelectedWheelsSub('all');
    setLiveAmazonProducts([]);
    setTimeout(() => {
      const el = document.getElementById('catalogo-productos');
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    }, 50);
  };

  const handleHeroSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const el = document.getElementById('catalogo-productos');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  const handleSelectAge = (age: string) => {
    setSelectedAge(age);
    setSelectedCategory('all');
    setSelectedClothingSub('all');
    setSelectedAnimeSub('all');
    setSelectedWheelsSub('all');
    setVisibleCount(18);
    if (selectedPrice !== 'all') setSelectedPrice('all');
    if (searchQuery) setSearchQuery('');
    setLiveAmazonProducts([]);
  };

  const handleSelectCategory = (cat: string) => {
    setSelectedCategory(cat);
    setSelectedClothingSub('all');
    setSelectedAnimeSub('all');
    setSelectedWheelsSub('all');
    if (selectedPrice !== 'all') setSelectedPrice('all');
    if (searchQuery) setSearchQuery('');
    setLiveAmazonProducts([]);
  };

  const handleSelectClothingSub = (sub: string) => {
    setSelectedClothingSub(sub);
    setVisibleCount(18);
    setLiveAmazonProducts([]);
  };

  const handleSelectAnimeSub = (sub: string) => {
    setSelectedAnimeSub(sub);
    setVisibleCount(18);
    setLiveAmazonProducts([]);
  };

  const handleSelectWheelsSub = (sub: string) => {
    setSelectedWheelsSub(sub);
    setVisibleCount(18);
    setLiveAmazonProducts([]);
  };

  const handleSelectGender = (gender: 'all' | 'boy' | 'girl' | 'reveal') => {
    setSelectedGender(gender);
    setVisibleCount(18);
    if (searchQuery) setSearchQuery('');
    setLiveAmazonProducts([]);
  };

  const handleSearchChange = (query: string) => {
    setSearchQuery(query);
    setLiveAmazonProducts([]);
    if (query.trim().length > 0) {
      if (selectedAge !== 'all') setSelectedAge('all');
      if (selectedCategory !== 'all') setSelectedCategory('all');
      if (selectedClothingSub !== 'all') setSelectedClothingSub('all');
      if (selectedAnimeSub !== 'all') setSelectedAnimeSub('all');
      if (selectedWheelsSub !== 'all') setSelectedWheelsSub('all');
      if (selectedGender !== 'all') setSelectedGender('all');
      if (selectedPrice !== 'all') setSelectedPrice('all');
    }
  };

  // Filter products across ALL_SITE_PRODUCTS for search, category or subfilters
  const filteredProducts = useMemo(() => {
    const isSearching = searchQuery.trim() !== '';
    const useFullCatalog =
      isSearching ||
      selectedCategory !== 'all' ||
      selectedClothingSub !== 'all' ||
      selectedAnimeSub !== 'all' ||
      selectedWheelsSub !== 'all';
    const sourceCatalog = useFullCatalog ? ALL_SITE_PRODUCTS : PRODUCTS;

    return sourceCatalog.filter((product) => {
      // 1. Search query filter
      if (isSearching && !matchesSearchQuery(product, searchQuery)) {
        return false;
      }

      // 2. Gender filter
      if (!isSearching && selectedGender === 'reveal') {
        const isRevealSub = product.subcategory === 'Fiestas y Revelación de Género';
        const hasRevealKeyword =
          product.title.toLowerCase().includes('revelación') ||
          product.description.toLowerCase().includes('revelación') ||
          product.searchQuery.toLowerCase().includes('revelacion');
        if (!isRevealSub && !hasRevealKeyword) return false;
      } else if (!isSearching && selectedGender !== 'all') {
        if (product.gender !== 'unisex' && product.gender !== selectedGender) {
          return false;
        }
      }

      // 3. Age filter
      if (!isSearching && selectedAge !== 'all' && product.ageRange !== selectedAge) {
        return false;
      }

      // 4. Category / Subcategory filter
      if (!isSearching && selectedCategory !== 'all') {
        const sel = selectedCategory.trim();

        if (selectedAge !== 'all') {
          if (product.subcategory.toLowerCase() !== sel.toLowerCase()) {
            return false;
          }
        } else {
          const allowedSubcategories = GENERAL_CATEGORY_MAPPING[sel] || [sel];
          const matchesMapping = allowedSubcategories.some(
            (allowed) => allowed.toLowerCase() === product.subcategory.toLowerCase()
          );
          if (!matchesMapping) {
            return false;
          }
        }
      }

      // 4.5. Clothing subfilter (word-boundary safe)
      if (!isSearching && isClothingCategory(selectedCategory) && selectedClothingSub !== 'all') {
        const currentSub = CLOTHING_SUBFILTERS.find((s) => s.id === selectedClothingSub);
        if (currentSub && currentSub.keywords.length > 0) {
          const textToMatch = `${product.title} ${product.description} ${product.subcategory} ${product.searchQuery}`.toLowerCase();
          if (!matchesAnyKeywordWordSafe(textToMatch, currentSub.keywords)) {
            return false;
          }
        }
      }

      // 4.6. Anime & Series subfilter (word-boundary safe: avoids 'ace'/'boros'/'vegeta' false positives)
      if (!isSearching && isFiguresCategory(selectedCategory) && selectedAnimeSub !== 'all') {
        const currentAnime = ANIME_SERIES_SUBFILTERS.find((s) => s.id === selectedAnimeSub);
        if (currentAnime && currentAnime.keywords.length > 0) {
          const textToMatch = `${product.title} ${product.description} ${product.subcategory} ${product.searchQuery} ${product.badge}`.toLowerCase();
          if (!matchesAnyKeywordWordSafe(textToMatch, currentAnime.keywords)) {
            return false;
          }
        }
      }

      // 4.7. Wheels & Motor subfilter (word-boundary safe + scope guard)
      if (!isSearching && isWheelsMotorCategory(selectedCategory) && selectedWheelsSub !== 'all') {
        const currentWheel = WHEELS_MOTOR_SUBFILTERS.find((s) => s.id === selectedWheelsSub);
        if (currentWheel && currentWheel.keywords.length > 0) {
          const isWheelsScope =
            isWheelsMotorCategory(product.subcategory) ||
            isWheelsMotorCategory(product.category) ||
            product.subcategory === 'Coches RC y Teledirigidos' ||
            product.id.startsWith('wheels-') ||
            product.id.startsWith('13-') ||
            product.id.startsWith('46-');
          if (!isWheelsScope) return false;

          const textToMatch = `${product.title} ${product.description} ${product.subcategory} ${product.searchQuery} ${product.badge}`.toLowerCase();
          if (!matchesAnyKeywordWordSafe(textToMatch, currentWheel.keywords)) {
            return false;
          }
        }
      }

      // 5. Price filter (supports all presets including 15-30, 30-60, >60)
      if (selectedPrice !== 'all' && !matchesPriceFilter(product.priceText, selectedPrice)) {
        return false;
      }

      return true;
    });
  }, [
    selectedAge,
    selectedCategory,
    selectedClothingSub,
    selectedAnimeSub,
    selectedWheelsSub,
    selectedGender,
    selectedPrice,
    searchQuery,
  ]);

  const sortedFilteredProducts = useMemo(() => {
    const list = [...filteredProducts];
    if (sortBy === 'price-asc') {
      list.sort((a, b) => parsePrice(a.priceText) - parsePrice(b.priceText));
    } else if (sortBy === 'price-desc') {
      list.sort((a, b) => parsePrice(b.priceText) - parsePrice(a.priceText));
    } else if (sortBy === 'rating') {
      list.sort((a, b) => b.rating - a.rating);
    } else {
      list.sort((a, b) => {
        if (selectedGender === 'girl') {
          const aGirl = a.gender === 'girl' ? 1 : 0;
          const bGirl = b.gender === 'girl' ? 1 : 0;
          if (aGirl !== bGirl) return bGirl - aGirl;
        } else if (selectedGender === 'boy') {
          const aBoy = a.gender === 'boy' ? 1 : 0;
          const bBoy = b.gender === 'boy' ? 1 : 0;
          if (aBoy !== bBoy) return bBoy - aBoy;
        }
        return (b.reviewsCount || 0) * (b.rating || 1) - (a.reviewsCount || 0) * (a.rating || 1);
      });
    }
    return list;
  }, [filteredProducts, sortBy, selectedGender]);

  // Structured Data ItemList matching active currency & Amazon region
  const itemListSchema = useMemo(() => {
    const listName = i18nConfig ? i18nConfig.h1 : 'Ideas de Regalo Recomendadas';
    return generateProductItemListSchema(sortedFilteredProducts, listName, {
      currency: activeCurrency,
      countryCode,
      region: amazonRegion,
      brandFallback: ui.brandName,
    });
  }, [sortedFilteredProducts, i18nConfig, activeCurrency, countryCode, amazonRegion, ui.brandName]);

  const sortedLiveAmazonProducts = useMemo(() => {
    const list = [...liveAmazonProducts];
    if (sortBy === 'price-asc') {
      list.sort((a, b) => parsePrice(a.priceText) - parsePrice(b.priceText));
    } else if (sortBy === 'price-desc') {
      list.sort((a, b) => parsePrice(b.priceText) - parsePrice(a.priceText));
    } else if (sortBy === 'rating') {
      list.sort((a, b) => b.rating - a.rating);
    }
    return list;
  }, [liveAmazonProducts, sortBy]);

  const currentAgeMeta = useMemo(() => {
    return AGE_CATEGORIES.find((c) => c.id === selectedAge);
  }, [selectedAge]);

  const currentAgeRouteSlug = useMemo(() => {
    if (!currentAgeMeta) return '';
    const match = Object.values(SEO_AGE_ROUTES).find((r) => r.ageId === currentAgeMeta.id);
    return match?.ageSlug || '';
  }, [currentAgeMeta]);

  const localizedAgeMeta = useMemo(() => {
    if (!currentAgeRouteSlug) return null;
    return getLocalizedAgeMeta(effectiveLocaleKey, currentAgeRouteSlug, activeCurrency);
  }, [effectiveLocaleKey, currentAgeRouteSlug, activeCurrency]);

  const liveSearchQuery = useMemo(() => {
    if (searchQuery.trim().length > 0) return searchQuery.trim();

    const parts: string[] = [];

    if (isClothingCategory(selectedCategory) && selectedClothingSub !== 'all') {
      const subObj = CLOTHING_SUBFILTERS.find((s) => s.id === selectedClothingSub);
      if (subObj) parts.push(subObj.searchPhrase);
    } else if (isFiguresCategory(selectedCategory) && selectedAnimeSub !== 'all') {
      const animeObj = ANIME_SERIES_SUBFILTERS.find((s) => s.id === selectedAnimeSub);
      if (animeObj) parts.push(animeObj.searchPhrase);
    } else if (isWheelsMotorCategory(selectedCategory) && selectedWheelsSub !== 'all') {
      const wheelObj = WHEELS_MOTOR_SUBFILTERS.find((s) => s.id === selectedWheelsSub);
      if (wheelObj) parts.push(wheelObj.searchPhrase);
    } else if (isWheelsMotorCategory(selectedCategory)) {
      parts.push('coche electrico para ninos 12v quad minimoto patinete electrico');
    } else if (selectedCategory === 'Cartas y Sobres Pokémon') {
      parts.push('cartas pokemon sobres booster box elite trainer album tcg oficial');
    } else if (selectedCategory === 'Figuras de Colección y Cine') {
      parts.push('figuras coleccion anime peliculas jurassic park fast furious dodge charger jada toys batman');
    } else if (selectedCategory && selectedCategory !== 'all') {
      parts.push(selectedCategory);
    }

    if (selectedGender === 'boy') parts.push('nino');
    else if (selectedGender === 'girl') parts.push('nina');

    if (selectedAge && selectedAge !== 'all') {
      const ageMap: Record<string, string> = {
        '0-12m': 'bebes',
        '1-3': '1 a 3 anos',
        '4-6': '4 a 6 anos',
        '7-9': '7 a 9 anos',
        '10-12': '10 a 12 anos',
        '13-15': '13 a 15 anos',
        '16-18': '16 a 18 anos',
        '+18': 'adultos',
      };
      parts.push(ageMap[selectedAge] || `${selectedAge} anos`);
    }

    if (parts.length === 0) {
      return isEs ? 'ideas regalos originales amazon' : 'best original gift ideas';
    }

    return parts.join(' ');
  }, [
    searchQuery,
    selectedCategory,
    selectedClothingSub,
    selectedAnimeSub,
    selectedWheelsSub,
    selectedGender,
    selectedAge,
    isEs,
  ]);

  const handleLoadLiveToGrid = useCallback(async () => {
    if (isLoadingLive) return;
    setIsLoadingLive(true);
    try {
      const res = await fetch(
        `/api/live-search?q=${encodeURIComponent(liveSearchQuery)}&limit=12&region=${amazonRegion}`
      );
      const data = await res.json();
      if (data.success && Array.isArray(data.results)) {
        setLiveAmazonProducts((prev) => {
          const existingAsins = new Set(prev.map((p) => p.asin));
          const newItems = data.results.filter((p: LiveSearchResult) => !existingAsins.has(p.asin));
          return [...prev, ...newItems];
        });
      }
    } catch (err) {
      console.error('Error fetching live Amazon products:', err);
    } finally {
      setIsLoadingLive(false);
    }
  }, [isLoadingLive, liveSearchQuery, amazonRegion]);

  useEffect(() => {
    const hasFilter =
      selectedCategory !== 'all' ||
      selectedAge !== 'all' ||
      selectedGender !== 'all' ||
      searchQuery.trim().length > 0;

    if (hasFilter && liveSearchQuery) {
      let isMounted = true;
      setIsLoadingLive(true);

      const timer = setTimeout(() => {
        fetch(`/api/live-search?q=${encodeURIComponent(liveSearchQuery)}&limit=8&region=${amazonRegion}`)
          .then((res) => res.json())
          .then((data) => {
            if (isMounted && data.success && Array.isArray(data.results)) {
              setLiveAmazonProducts(data.results);
            }
          })
          .catch((err) => console.error(err))
          .finally(() => {
            if (isMounted) setIsLoadingLive(false);
          });
      }, 120);

      return () => {
        isMounted = false;
        clearTimeout(timer);
      };
    } else {
      setLiveAmazonProducts([]);
    }
  }, [selectedCategory, selectedAge, selectedGender, searchQuery, liveSearchQuery, amazonRegion]);

  useEffect(() => {
    const applyCategoryFromUrl = () => {
      if (typeof window === 'undefined') return;
      const hash = window.location.hash;
      if (hash === '#categoria-cartas-pokemon') {
        setSelectedCategory('Cartas y Sobres Pokémon');
        setSelectedAge('all');
        setSelectedClothingSub('all');
        setSelectedAnimeSub('all');
        setTimeout(() => {
          const el = document.getElementById('catalogo-productos');
          if (el) el.scrollIntoView({ behavior: 'smooth' });
        }, 60);
        return;
      }
      if (hash === '#categoria-figuras-anime') {
        setSelectedCategory('Figuras de Colección y Cine');
        setSelectedAge('all');
        setSelectedClothingSub('all');
        setSelectedAnimeSub('all');
        setTimeout(() => {
          const el = document.getElementById('catalogo-productos');
          if (el) el.scrollIntoView({ behavior: 'smooth' });
        }, 60);
        return;
      }

      const params = new URLSearchParams(window.location.search);
      const queryParam = params.get('q') || params.get('search') || params.get('query');
      if (queryParam) {
        handleSearchChange(queryParam);
        setTimeout(() => {
          const el = document.getElementById('catalogo-productos');
          if (el) el.scrollIntoView({ behavior: 'smooth' });
        }, 80);
        return;
      }

      const cat = params.get('categoria') || params.get('cat');
      if (cat === 'cartas-pokemon' || cat === 'pokemon') {
        setSelectedCategory('Cartas y Sobres Pokémon');
        setSelectedAge('all');
        setSelectedClothingSub('all');
        setSelectedAnimeSub('all');
      } else if (cat === 'figuras-anime' || cat === 'anime' || cat === 'figuras') {
        setSelectedCategory('Figuras de Colección y Cine');
        setSelectedAge('all');
        setSelectedClothingSub('all');
        const serie = params.get('serie');
        if (serie) setSelectedAnimeSub(serie);
      }
    };

    applyCategoryFromUrl();

    const handleCategoryEvent = (e: Event) => {
      const customEvent = e as CustomEvent<string>;
      if (customEvent.detail) {
        setSelectedCategory(customEvent.detail);
        setSelectedAge('all');
        setSelectedClothingSub('all');
        setSelectedAnimeSub('all');
        setTimeout(() => {
          const el = document.getElementById('catalogo-productos');
          if (el) el.scrollIntoView({ behavior: 'smooth' });
        }, 50);
      }
    };

    const handleSearchEvent = (e: Event) => {
      const customEvent = e as CustomEvent<string>;
      if (typeof customEvent.detail === 'string') {
        handleSearchChange(customEvent.detail);
        setTimeout(() => {
          const el = document.getElementById('catalogo-productos');
          if (el) el.scrollIntoView({ behavior: 'smooth' });
        }, 80);
      }
    };

    const handleOpenWizard = () => setIsAiModalOpen(true);

    window.addEventListener('select-category', handleCategoryEvent);
    window.addEventListener('site-search', handleSearchEvent);
    window.addEventListener('popstate', applyCategoryFromUrl);
    window.addEventListener('hashchange', applyCategoryFromUrl);
    window.addEventListener('open-ai-wizard', handleOpenWizard);

    return () => {
      window.removeEventListener('select-category', handleCategoryEvent);
      window.removeEventListener('site-search', handleSearchEvent);
      window.removeEventListener('popstate', applyCategoryFromUrl);
      window.removeEventListener('hashchange', applyCategoryFromUrl);
      window.removeEventListener('open-ai-wizard', handleOpenWizard);
    };
  }, []);

  const handleApplyRecommendation = (filters: {
    age: string;
    category: string;
    gender: 'all' | 'boy' | 'girl' | 'reveal';
    price: string;
    searchQuery?: string;
    hubUrl?: string;
  }) => {
    if (filters.hubUrl) {
      router.push(localePath(filters.hubUrl));
      return;
    }
    setSearchQuery(filters.searchQuery || '');
    setSelectedAge(filters.age);
    setSelectedCategory(filters.category);
    setSelectedGender(filters.gender);
    setSelectedPrice(filters.price);
    setLiveAmazonProducts([]);
  };

  const santaHub = getHubStrings(effectiveLocaleKey, 'carta-papa-noel');
  const votingHub = getHubStrings(effectiveLocaleKey, 'votar');
  const gtaHub = getHubStrings(effectiveLocaleKey, 'regalos-gta-6');
  const gamingHub = getHubStrings(effectiveLocaleKey, 'gaming');
  const bikersHub = getHubStrings(effectiveLocaleKey, 'motoristas');
  const coffeeHub = getHubStrings(effectiveLocaleKey, 'amantes-del-cafe');
  const under20Hub = getHubStrings(effectiveLocaleKey, 'regalos-menos-20-euros');

  return (
    <div
      dir={isRtl ? 'rtl' : 'ltr'}
      className="min-h-screen relative flex flex-col bg-[#eaeded] text-slate-900 selection:bg-amber-500 selection:text-slate-950 overflow-x-hidden w-full max-w-full"
    >
      {/* Product Stars & Reviews ItemList Schema for Google */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListSchema) }}
      />

      <ThemeAtmosphere />

      <Header
        currentTheme="classic"
        onThemeChange={() => {}}
        searchQuery={searchQuery}
        onSearchChange={handleSearchChange}
      />

      <main className="flex-1 max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 w-full z-10">
        {/* CHRISTMAS SANTA LETTER BANNER + COUNTDOWN */}
        <div className="mb-4 bg-gradient-to-r from-[#8a1420] via-[#5c0f18] to-[#0c2217] text-white rounded-3xl p-4 sm:p-5 shadow-xl border-2 border-amber-400/90 flex flex-col lg:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3.5 text-center lg:text-left">
            <span className="text-4xl animate-bounce select-none shrink-0" aria-hidden="true">
              🎅
            </span>
            <div>
              <div className="flex items-center justify-center lg:justify-start gap-2 mb-0.5">
                <span className="px-2 py-0.5 rounded-full bg-amber-400 text-slate-950 font-black text-[10px] uppercase tracking-wider">
                  {ui.badgeUpdated2026}
                </span>
                <span className="text-xs text-amber-200">{santaHub.eyebrow}</span>
              </div>
              <p className="text-base sm:text-lg font-black text-white">
                {isEs ? '¿Aún no has escrito la Carta a Papá Noel?' : santaHub.breadcrumbLabel}
              </p>
              <p className="text-xs text-slate-100 max-w-xl">
                {isEs
                  ? 'Elige entre más de 370 juguetes oficiales (coches eléctricos, minimotos, quads, LEGO, patinetes, gaming) y envíala al buzón mágico.'
                  : santaHub.subtitle}
              </p>
            </div>
          </div>

          <div className="shrink-0 my-1 lg:my-0">
            <ChristmasCountdown />
          </div>

          <Link
            href={localePath('/carta-papa-noel')}
            className="shrink-0 px-5 py-2.5 rounded-2xl bg-gradient-to-r from-amber-400 via-yellow-300 to-amber-500 hover:from-amber-300 hover:to-amber-400 text-slate-950 font-black text-xs sm:text-sm shadow-md hover:scale-105 transition-all flex items-center gap-2 cursor-pointer"
          >
            <span>✉️ {ui.navLetter}</span>
            <ArrowRight className="w-4 h-4" aria-hidden="true" />
          </Link>
        </div>

        {/* GTA 6 & GTA VI PROMO BANNER */}
        <div className="mb-6 bg-gradient-to-r from-[#190a28] via-[#0f0e24] to-[#061822] text-white rounded-2xl px-4 py-2.5 sm:px-5 sm:py-3 shadow-lg border border-pink-500/50 flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="flex items-center gap-3 text-center sm:text-left">
            <span className="text-2xl select-none shrink-0" aria-hidden="true">
              🌴
            </span>
            <div className="flex flex-wrap items-center gap-2">
              <span className="px-2 py-0.5 rounded-full bg-gradient-to-r from-pink-500 to-purple-600 text-white font-black text-[10px] uppercase tracking-wider">
                {ui.bannerGtaBadge}
              </span>
              <p className="text-xs sm:text-sm font-black text-white">{ui.bannerGtaTitle}</p>
              <span className="text-xs text-slate-200 hidden md:inline">{ui.bannerGtaDesc}</span>
            </div>
          </div>
          <Link
            href={localePath('/regalos-gta-6')}
            className="shrink-0 px-4 py-1.5 rounded-xl bg-gradient-to-r from-pink-500 via-purple-600 to-cyan-500 hover:from-pink-600 hover:to-cyan-600 text-white font-black text-xs shadow-md hover:scale-105 transition-all flex items-center gap-1.5 cursor-pointer"
          >
            <span>{ui.bannerGtaCta}</span>
            <ArrowRight className="w-3.5 h-3.5" aria-hidden="true" />
          </Link>
        </div>

        {/* HERO SECTION: LEFT WING + CENTER SEARCH ENGINE + RIGHT WING */}
        <section className="mb-8">
          <div className="flex flex-col xl:flex-row items-start justify-center gap-5">
            {/* LEFT SHOWCASE WING */}
            <aside
              aria-label={ui.leftWingAria}
              onMouseEnter={() => setIsLeftPaused(true)}
              onMouseLeave={() => setIsLeftPaused(false)}
              className="hidden lg:flex flex-col w-64 xl:w-72 2xl:w-80 shrink-0 bg-gradient-to-b from-amber-50/80 via-white to-amber-50/40 rounded-3xl p-5 shadow-lg shadow-amber-900/5 border-2 border-amber-400/90 relative group overflow-hidden"
            >
              <div>
                <div className="bg-[#131921] -mx-5 -mt-5 px-4 py-3.5 border-b-2 border-amber-400/60 flex items-center justify-between mb-3 text-white">
                  <div>
                    <p className="text-sm font-black text-[#febd69] flex items-center gap-1.5 uppercase tracking-wide">
                      <span aria-hidden="true">🔥</span>
                      <span>{ui.leftWingTitle}</span>
                    </p>
                    <p className="text-[11px] text-amber-200/90 font-medium">{ui.leftWingSubtitle}</p>
                  </div>
                </div>

                <div className="overflow-hidden w-full rounded-2xl">
                  <div
                    className="flex transition-transform duration-700 ease-out"
                    style={{ transform: `translateX(-${leftCarouselIndex * 100}%)` }}
                  >
                    {leftSlides.map((slideProducts, sIdx) => {
                      const isHiddenSlide = sIdx !== leftCarouselIndex;
                      return (
                        <div
                          key={sIdx}
                          aria-hidden={isHiddenSlide}
                          inert={isHiddenSlide ? true : undefined}
                          className="w-full shrink-0 grid grid-cols-2 gap-2.5"
                        >
                          {slideProducts.map((item) => {
                            const amazonUrl = getAmazonProductUrl(
                              item.asin,
                              item.searchQuery || item.title,
                              amazonRegion
                            );
                            const shortTitle = item.title.split(' - ')[0].trim();
                            return (
                              <a
                                key={item.id}
                                href={amazonUrl}
                                target="_blank"
                                rel="noopener noreferrer sponsored"
                                tabIndex={isHiddenSlide ? -1 : undefined}
                                className="group/item flex flex-col p-2 rounded-2xl bg-white hover:bg-amber-100/60 border border-amber-200/80 hover:border-amber-400 transition-all cursor-pointer shadow-xs hover:shadow-md"
                              >
                                <div className="relative w-full aspect-square bg-white rounded-xl overflow-hidden mb-1.5 p-1 border border-amber-100">
                                  <Image
                                    src={item.imageUrl}
                                    alt={shortTitle}
                                    fill
                                    sizes="(max-width: 640px) 120px, 150px"
                                    className="object-contain p-1 group-hover/item:scale-105 transition-transform"
                                  />
                                </div>
                                <span className="text-[11px] font-bold text-slate-800 truncate h-4 leading-4 block group-hover/item:text-amber-900 transition-colors">
                                  {shortTitle}
                                </span>
                                <div className="flex items-center justify-between mt-0.5">
                                  <span className="text-xs font-black text-slate-950">
                                    {formatPrice(item.priceText)}
                                  </span>
                                  <span className="text-[10px] text-amber-800 font-bold flex items-center gap-0.5">
                                    <Star className="w-2.5 h-2.5 fill-amber-500 text-amber-500" aria-hidden="true" />
                                    {item.rating}
                                  </span>
                                </div>
                              </a>
                            );
                          })}
                        </div>
                      );
                    })}
                  </div>
                </div>

                <div className="flex items-center justify-center gap-1 mt-3">
                  {leftSlides.map((_, idx) => (
                    <button
                      key={idx}
                      type="button"
                      onClick={() => setLeftCarouselIndex(idx)}
                      aria-current={leftCarouselIndex === idx ? 'true' : undefined}
                      aria-label={`${ui.slideIndicatorAria} ${idx + 1}`}
                      className="min-w-6 min-h-6 inline-flex items-center justify-center p-1 rounded-full cursor-pointer"
                    >
                      <span
                        className={`block w-3.5 h-1.5 rounded-full origin-center transition-transform transition-colors ${
                          leftCarouselIndex === idx
                            ? 'scale-x-100 bg-amber-600'
                            : 'scale-x-50 bg-slate-400 hover:bg-slate-500'
                        }`}
                      />
                    </button>
                  ))}
                </div>
              </div>

              <button
                type="button"
                onClick={() => handleQuickPrompt({ query: '', sort: 'rating' })}
                className="w-full pt-2.5 mt-3 border-t border-amber-200 text-xs font-bold text-amber-900 hover:text-amber-950 flex items-center justify-between group/link cursor-pointer bg-amber-100/80 -mx-5 -mb-5 px-5 py-3 text-left"
              >
                <span>{isEs ? 'Ver catálogo superventas' : ui.navAllIdeas}</span>
                <ArrowRight className="w-3.5 h-3.5 group-hover/link:translate-x-1 transition-transform" aria-hidden="true" />
              </button>
            </aside>

            {/* CENTER SEARCH ENGINE */}
            <div className="flex-1 max-w-3xl 2xl:max-w-4xl text-center py-6 sm:py-8 px-4 sm:px-8 bg-white rounded-3xl shadow-md border-2 border-slate-300 flex flex-col justify-between">
              <div>
                <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-bold mb-3 shadow-2xs border border-amber-200 bg-amber-50/80 text-amber-950">
                  <span className="flex h-2 w-2 rounded-full bg-emerald-500 animate-pulse"></span>
                  <span>
                    {i18nConfig
                      ? `${i18nConfig.flag} ${i18nConfig.brandTranslation} · ${i18nConfig.nativeName} · ${activeCurrency}`
                      : `Buscador Inteligente Global · Edición ${new Date().getFullYear()} (€ / $)`}
                  </span>
                </div>

                <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight leading-[1.15] mb-3 text-slate-900">
                  {localizedAgeMeta ? (
                    <span>{localizedAgeMeta.h1}</span>
                  ) : i18nConfig ? (
                    <span>{applyCurrencyDisplay(i18nConfig.h1, activeCurrency)}</span>
                  ) : (
                    <span>
                      Ideas de Regalos Originales:{' '}
                      <span className="inline-block pr-2.5 pb-1 bg-clip-text text-transparent bg-gradient-to-r from-amber-700 via-orange-700 to-indigo-700">
                        ¿Qué Regalar en 2026?
                      </span>
                    </span>
                  )}
                </h1>

                <p className="text-xs sm:text-sm lg:text-base text-slate-600 leading-relaxed mb-4 max-w-2xl mx-auto">
                  {localizedAgeMeta
                    ? localizedAgeMeta.description
                    : i18nConfig
                    ? applyCurrencyDisplay(i18nConfig.subtitle, activeCurrency)
                    : 'Encuentra qué regalar a hombres, mujeres, niños o amigos invisibles. Selección de productos mejor valorados en Amazon con comparativas de precios reales (€ / $) y votación en grupo por WhatsApp.'}
                </p>

                {/* MAIN SEARCH BAR */}
                <form onSubmit={handleHeroSearchSubmit} className="relative max-w-2xl mx-auto mb-4">
                  <div className="relative flex items-center shadow-md rounded-2xl bg-white border-2 border-slate-300 hover:border-slate-400 focus-within:border-[#febd69] focus-within:ring-4 focus-within:ring-amber-100 transition-all p-1.5 sm:p-2">
                    <div className="pl-3 pr-2 text-slate-500">
                      <Search className="w-5 h-5 text-slate-500" aria-hidden="true" />
                    </div>
                    <input
                      type="text"
                      value={searchQuery}
                      onChange={(e) => handleSearchChange(e.target.value)}
                      aria-label={i18nConfig?.searchPlaceholder || ui.headerSearchPlaceholder}
                      placeholder={
                        i18nConfig?.searchPlaceholder || ui.headerSearchPlaceholder
                      }
                      className="w-full bg-transparent px-2 py-2 text-sm sm:text-base text-slate-800 placeholder-slate-500 focus:outline-none"
                    />
                    {searchQuery && (
                      <button
                        type="button"
                        onClick={() => handleSearchChange('')}
                        aria-label={ui.headerClearSearch}
                        className="min-w-7 min-h-7 flex items-center justify-center p-1.5 text-slate-600 hover:text-slate-900 rounded-lg mr-1 cursor-pointer transition-colors"
                        title={ui.headerClearSearch}
                      >
                        <X className="w-4 h-4" />
                      </button>
                    )}
                    <button
                      type="submit"
                      aria-label={ui.headerSearchButton}
                      className="px-5 sm:px-6 py-2.5 bg-[#febd69] hover:bg-[#f3a847] active:bg-[#e47911] text-slate-950 font-black text-sm rounded-xl transition-colors shadow-xs shrink-0 flex items-center gap-1.5 cursor-pointer border border-[#febd69]"
                    >
                      <Search className="w-4 h-4 stroke-[2.5]" aria-hidden="true" />
                      <span className="hidden sm:inline">{ui.headerSearchButton}</span>
                    </button>
                  </div>
                </form>

                {/* QUICK INSPIRATION CHIPS */}
                <div className="flex flex-wrap items-center justify-center gap-2 mb-6 max-w-3xl mx-auto">
                  <span className="text-xs font-semibold text-slate-600 mr-1 flex items-center gap-1">
                    {ui.navFilters}:
                  </span>
                  {QUICK_PROMPTS.map((prompt) => {
                    const label = getPromptLabel(prompt);
                    return (
                      <button
                        key={prompt.id}
                        type="button"
                        onClick={() => handleQuickPrompt(prompt)}
                        className="text-xs px-3.5 py-2 sm:py-1.5 min-h-[40px] inline-flex items-center rounded-full font-semibold bg-slate-50 hover:bg-amber-50 border border-slate-300 hover:border-amber-400 text-slate-800 hover:text-slate-950 transition-all shadow-2xs hover:scale-105 active:scale-95 cursor-pointer"
                      >
                        {label}
                      </button>
                    );
                  })}
                </div>

                {/* AI GIFT FINDER POPUP TRIGGER */}
                <div className="flex items-center justify-center gap-3 mb-3.5">
                  <button
                    type="button"
                    onClick={() => setIsAiModalOpen(true)}
                    className="inline-flex items-center gap-2 px-5 py-2.5 rounded-2xl bg-[#232f3e] hover:bg-[#131921] text-amber-300 hover:text-white border border-slate-700 font-bold text-xs sm:text-sm shadow-md transition-all hover:scale-102 active:scale-98 cursor-pointer"
                  >
                    <Bot className="w-4 h-4 text-amber-400 animate-pulse" aria-hidden="true" />
                    <span>{ui.aiWizardOpenBtn}</span>
                    <ArrowRight className="w-3.5 h-3.5 text-amber-300" aria-hidden="true" />
                  </button>
                </div>
              </div>

              {/* Trust Badges */}
              <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-6 text-xs font-medium text-slate-600 pt-3 border-t border-slate-100">
                <span className="flex items-center gap-1.5">
                  <ShieldCheck className="w-4 h-4 text-emerald-700" aria-hidden="true" />
                  {ui.trustGuarantee} ({amazonSiteName})
                </span>
                <span className="flex items-center gap-1.5">
                  <TrendingUp className="w-4 h-4 text-amber-700" aria-hidden="true" />
                  {ui.trustRatings}
                </span>
                <span className="flex items-center gap-1.5">
                  <BadgePercent className="w-4 h-4 text-orange-700" aria-hidden="true" />
                  {ui.trustStock}
                </span>
              </div>
            </div>

            {/* RIGHT SHOWCASE WING */}
            <aside
              aria-label={ui.rightWingAria}
              onMouseEnter={() => setIsRightPaused(true)}
              onMouseLeave={() => setIsRightPaused(false)}
              className="hidden lg:flex flex-col w-64 xl:w-72 2xl:w-80 shrink-0 bg-gradient-to-b from-emerald-50/80 via-white to-emerald-50/40 rounded-3xl p-5 shadow-lg shadow-emerald-900/5 border-2 border-emerald-400/90 relative group overflow-hidden"
            >
              <div>
                <div className="bg-[#131921] -mx-5 -mt-5 px-4 py-3.5 border-b-2 border-emerald-400/60 flex items-center justify-between mb-3 text-white">
                  <div>
                    <p className="text-sm font-black text-emerald-300 flex items-center gap-1.5 uppercase tracking-wide">
                      <span aria-hidden="true">⚡</span>
                      <span>{tBudget('<20')}</span>
                    </p>
                    <p className="text-[11px] text-emerald-200/90 font-medium">{ui.rightWingSubtitle}</p>
                  </div>
                </div>

                <div className="overflow-hidden w-full rounded-2xl">
                  <div
                    className="flex transition-transform duration-700 ease-out"
                    style={{ transform: `translateX(-${rightCarouselIndex * 100}%)` }}
                  >
                    {rightSlides.map((slideProducts, sIdx) => {
                      const isHiddenSlide = sIdx !== rightCarouselIndex;
                      return (
                        <div
                          key={sIdx}
                          aria-hidden={isHiddenSlide}
                          inert={isHiddenSlide ? true : undefined}
                          className="w-full shrink-0 grid grid-cols-2 gap-2.5"
                        >
                          {slideProducts.map((item) => {
                            const amazonUrl = getAmazonProductUrl(
                              item.asin,
                              item.searchQuery || item.title,
                              amazonRegion
                            );
                            const shortTitle = item.title.split(' - ')[0].trim();
                            return (
                              <a
                                key={item.id}
                                href={amazonUrl}
                                target="_blank"
                                rel="noopener noreferrer sponsored"
                                tabIndex={isHiddenSlide ? -1 : undefined}
                                className="group/item flex flex-col p-2 rounded-2xl bg-white hover:bg-emerald-100/60 border border-emerald-200/80 hover:border-emerald-400 transition-all cursor-pointer shadow-xs hover:shadow-md"
                              >
                                <div className="relative w-full aspect-square bg-white rounded-xl overflow-hidden mb-1.5 p-1 border border-emerald-100">
                                  <Image
                                    src={item.imageUrl}
                                    alt={shortTitle}
                                    fill
                                    sizes="(max-width: 640px) 120px, 150px"
                                    className="object-contain p-1 group-hover/item:scale-105 transition-transform"
                                  />
                                </div>
                                <span className="text-[11px] font-bold text-slate-800 truncate h-4 leading-4 block group-hover/item:text-emerald-900 transition-colors">
                                  {shortTitle}
                                </span>
                                <div className="flex items-center justify-between mt-0.5">
                                  <span className="text-xs font-black text-emerald-800">
                                    {formatPrice(item.priceText)}
                                  </span>
                                  <span className="text-[10px] text-slate-700 font-bold">
                                    {ui.badgeTop}
                                  </span>
                                </div>
                              </a>
                            );
                          })}
                        </div>
                      );
                    })}
                  </div>
                </div>

                <div className="flex items-center justify-center gap-1 mt-3">
                  {rightSlides.map((_, idx) => (
                    <button
                      key={idx}
                      type="button"
                      onClick={() => setRightCarouselIndex(idx)}
                      aria-current={rightCarouselIndex === idx ? 'true' : undefined}
                      aria-label={`${ui.slideIndicatorAria} ${idx + 1}`}
                      className="min-w-6 min-h-6 inline-flex items-center justify-center p-1 rounded-full cursor-pointer"
                    >
                      <span
                        className={`block w-3.5 h-1.5 rounded-full origin-center transition-transform transition-colors ${
                          rightCarouselIndex === idx
                            ? 'scale-x-100 bg-emerald-700'
                            : 'scale-x-50 bg-slate-400 hover:bg-slate-500'
                        }`}
                      />
                    </button>
                  ))}
                </div>
              </div>

              <button
                type="button"
                onClick={() => handleQuickPrompt({ query: '', price: '<20', sort: 'price-asc' })}
                className="w-full pt-2.5 mt-3 border-t border-emerald-200 text-xs font-bold text-emerald-900 hover:text-emerald-950 flex items-center justify-between group/link cursor-pointer bg-emerald-100/80 -mx-5 -mb-5 px-5 py-3 text-left"
              >
                <span>
                  {ui.showcaseViewOffer} ({tBudget('<20')})
                </span>
                <ArrowRight className="w-3.5 h-3.5 group-hover/link:translate-x-1 transition-transform" aria-hidden="true" />
              </button>
            </aside>
          </div>
        </section>

        {/* AI GIFT ASSISTANT MODAL */}
        <GiftWizard
          isOpen={isAiModalOpen}
          initialAge={selectedAge}
          initialGender={selectedGender}
          onClose={() => setIsAiModalOpen(false)}
          onApplyRecommendation={handleApplyRecommendation}
        />

        {/* TRENDING DEALS & QUICK BUDGET ACTION BAR */}
        <section aria-label={ui.rightWingTitle} className="my-6">
          <div className="bg-gradient-to-r from-slate-950 via-[#131921] to-slate-950 text-white rounded-3xl p-4 sm:p-5 border-2 border-amber-400 shadow-xl relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />

            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 relative z-10">
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <span className="px-2.5 py-0.5 rounded-full bg-amber-400 text-slate-950 font-black text-[11px] uppercase tracking-wider flex items-center gap-1 shadow-xs">
                    <span aria-hidden="true">🔥</span> {ui.rightWingTitle}
                  </span>
                  <span className="text-xs text-amber-300 font-bold">
                    {amazonSiteName} · {activeCurrency}
                  </span>
                </div>
                <h2 className="text-base sm:text-lg font-black text-white leading-tight">
                  {isEs
                    ? 'Regalos y Chollos Top Valorados con Descuentos Activos'
                    : `${ui.leftWingTitle} · ${ui.verifiedCatalogNote}`}
                </h2>
                <p className="text-xs text-slate-200 leading-snug">
                  {isEs
                    ? 'Filtrados con envío rápido Prime y garantía oficial de devolución.'
                    : `${ui.trustPrimeShipping} · ${ui.trustFreeReturns}`}
                </p>
              </div>

              <div className="flex flex-wrap items-center gap-2">
                <button
                  type="button"
                  onClick={() => handleQuickPrompt({ query: 'ofertas', sort: 'rating' })}
                  className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-500 hover:to-amber-600 text-slate-950 font-black text-xs flex items-center gap-1.5 transition-all shadow-md hover:scale-102 active:scale-98 cursor-pointer"
                >
                  <span>🔥 {ui.sortRating}</span>
                </button>
                <button
                  type="button"
                  onClick={() => handleQuickPrompt({ query: '', price: '<20', sort: 'price-asc' })}
                  className="px-4 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 text-white border border-white/20 font-bold text-xs flex items-center gap-1.5 transition-all hover:scale-102 active:scale-98 cursor-pointer"
                >
                  <span>💸 {tBudget('<20')}</span>
                </button>
                <button
                  type="button"
                  onClick={() => handleQuickPrompt({ query: '', price: '<15', sort: 'price-asc' })}
                  className="px-4 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 text-white border border-white/20 font-bold text-xs flex items-center gap-1.5 transition-all hover:scale-102 active:scale-98 cursor-pointer"
                >
                  <span>🎁 {tBudget('<15')}</span>
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* CATALOG SECTION */}
        <div id="catalogo-productos" className="pt-2">
          <div className="bg-white border border-slate-200/90 rounded-2xl p-3.5 sm:p-4 shadow-xs mb-6">
            <div
              className={`flex flex-wrap items-center justify-between gap-3 ${
                !showAdvancedFilters ? 'pb-3 border-b border-slate-100' : ''
              }`}
            >
              <div className="flex items-center gap-2.5">
                <span className="w-2 h-6 rounded-full bg-amber-500 shrink-0"></span>
                <div>
                  <h2 className="text-base sm:text-lg font-black text-slate-900 tracking-tight flex items-center gap-2">
                    <span>
                      {selectedCategory !== 'all'
                        ? tTerm(selectedCategory)
                        : currentAgeMeta
                        ? tTerm(currentAgeMeta.label)
                        : ui.showingAllCatalog}
                    </span>
                    {searchQuery.trim() && (
                      <span className="text-[11px] font-bold text-amber-900 bg-amber-100 border border-amber-200 px-2 py-0.5 rounded-full">
                        &ldquo;{searchQuery}&rdquo;
                      </span>
                    )}
                  </h2>
                  <p className="text-[11px] text-slate-600">
                    <strong className="text-slate-900 font-bold">
                      {filteredProducts.length + liveAmazonProducts.length}
                    </strong>{' '}
                    {ui.productsUnit} · {ui.amazonStoreBadge}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <div className="flex items-center gap-1.5 bg-slate-50 border border-slate-200 rounded-xl px-2.5 py-1">
                  <span className="text-[11px] text-slate-600 font-bold">{ui.sortLabel}:</span>
                  <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value as 'featured' | 'price-asc' | 'price-desc' | 'rating')}
                    aria-label={ui.sortLabel}
                    className="text-xs font-bold text-slate-800 bg-transparent focus:outline-hidden cursor-pointer"
                  >
                    <option value="featured">{ui.sortFeatured}</option>
                    <option value="price-asc">{ui.sortPriceAsc}</option>
                    <option value="price-desc">{ui.sortPriceDesc}</option>
                    <option value="rating">{ui.sortRating}</option>
                  </select>
                </div>

                <button
                  type="button"
                  onClick={() => setShowAdvancedFilters((prev) => !prev)}
                  aria-expanded={showAdvancedFilters}
                  aria-label={showAdvancedFilters ? ui.hideFilters : ui.showMoreFilters}
                  className={`inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-bold rounded-xl border transition-all cursor-pointer ${
                    showAdvancedFilters
                      ? 'bg-amber-100 text-amber-950 border-amber-300'
                      : 'bg-slate-50 hover:bg-slate-100 text-slate-700 border-slate-200'
                  }`}
                >
                  <SlidersHorizontal className="w-3.5 h-3.5 text-amber-700" aria-hidden="true" />
                  <span className="hidden sm:inline">
                    {showAdvancedFilters ? ui.hideFilters : ui.showMoreFilters}
                  </span>
                </button>
              </div>
            </div>

            {!showAdvancedFilters && (
              <div className="pt-3 flex items-center justify-between gap-2 overflow-x-auto scrollbar-none">
                <div className="flex items-center gap-1.5 text-xs shrink-0">
                  <span className="text-[11px] font-bold text-slate-600 uppercase tracking-wider mr-1">
                    {ui.maxBudgetLabel}:
                  </span>
                  <button
                    type="button"
                    onClick={() => setSelectedPrice('all')}
                    className={`px-2.5 py-1 rounded-lg text-xs font-bold whitespace-nowrap transition-all cursor-pointer ${
                      selectedPrice === 'all'
                        ? 'bg-slate-900 text-white'
                        : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                    }`}
                  >
                    {ui.ageAllShort}
                  </button>
                  <button
                    type="button"
                    onClick={() => setSelectedPrice('<15')}
                    className={`px-2.5 py-1 rounded-lg text-xs font-bold whitespace-nowrap transition-all cursor-pointer flex items-center gap-1 ${
                      selectedPrice === '<15'
                        ? 'bg-emerald-700 text-white'
                        : 'bg-emerald-50 text-emerald-900 hover:bg-emerald-100 border border-emerald-200/80'
                    }`}
                  >
                    <span aria-hidden="true">🟢</span>
                    <span>{tBudget('<15')}</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => setSelectedPrice('15-30')}
                    className={`px-2.5 py-1 rounded-lg text-xs font-bold whitespace-nowrap transition-all cursor-pointer flex items-center gap-1 ${
                      selectedPrice === '15-30'
                        ? 'bg-amber-400 text-slate-950'
                        : 'bg-amber-50 text-amber-900 hover:bg-amber-100 border border-amber-200/80'
                    }`}
                  >
                    <span aria-hidden="true">🟡</span>
                    <span>{tBudget('15-30')}</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => setSelectedPrice('30-60')}
                    className={`px-2.5 py-1 rounded-lg text-xs font-bold whitespace-nowrap transition-all cursor-pointer flex items-center gap-1 ${
                      selectedPrice === '30-60'
                        ? 'bg-purple-700 text-white'
                        : 'bg-purple-50 text-purple-900 hover:bg-purple-100 border border-purple-200/80'
                    }`}
                  >
                    <span aria-hidden="true">🟣</span>
                    <span>{tBudget('30-60')}</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => setSelectedPrice('>60')}
                    className={`px-2.5 py-1 rounded-lg text-xs font-bold whitespace-nowrap transition-all cursor-pointer flex items-center gap-1 ${
                      selectedPrice === '>60'
                        ? 'bg-indigo-700 text-white'
                        : 'bg-indigo-50 text-indigo-900 hover:bg-indigo-100 border border-indigo-200/80'
                    }`}
                  >
                    <span aria-hidden="true">💎</span>
                    <span>{tBudget('>60')}</span>
                  </button>
                </div>

                {selectedPrice !== 'all' && (
                  <button
                    type="button"
                    onClick={() => setSelectedPrice('all')}
                    className="text-[11px] font-bold text-rose-700 hover:underline cursor-pointer shrink-0 ml-auto"
                  >
                    ✕ {ui.clearFilters}
                  </button>
                )}
              </div>
            )}
          </div>

          {showAdvancedFilters && (
            <div className="animate-in fade-in duration-200 mb-6">
              <FilterBar
                selectedAge={selectedAge}
                onSelectAge={handleSelectAge}
                selectedCategory={selectedCategory}
                onSelectCategory={handleSelectCategory}
                selectedClothingSub={selectedClothingSub}
                onSelectClothingSub={handleSelectClothingSub}
                selectedAnimeSub={selectedAnimeSub}
                onSelectAnimeSub={handleSelectAnimeSub}
                selectedWheelsSub={selectedWheelsSub}
                onSelectWheelsSub={handleSelectWheelsSub}
                selectedGender={selectedGender}
                onSelectGender={handleSelectGender}
                selectedPrice={selectedPrice}
                onSelectPrice={setSelectedPrice}
                sortBy={sortBy}
                onSelectSort={setSortBy}
                totalResults={filteredProducts.length + liveAmazonProducts.length}
              />
            </div>
          )}
        </div>

        {/* DYNAMIC AGE BANNER WHEN FILTERED */}
        {currentAgeMeta && localizedAgeMeta && (
          <div className="p-5 sm:p-6 rounded-3xl my-6 border border-indigo-100 bg-white shadow-xs transition-all flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4">
            <div className="flex items-center gap-3.5">
              {(() => {
                const badge = AGE_BANNER_ICONS[currentAgeMeta.id];
                const IconComp = badge ? badge.icon : Gift;
                const bgClass = badge ? badge.bg : 'bg-indigo-50 border-indigo-200';
                const textClass = badge ? badge.color : 'text-indigo-600';
                return (
                  <div
                    className={`w-11 h-11 sm:w-12 sm:h-12 rounded-2xl ${bgClass} border flex items-center justify-center shadow-xs shrink-0`}
                  >
                    <IconComp className={`w-5 h-5 sm:w-6 sm:h-6 ${textClass}`} />
                  </div>
                );
              })()}
              <div>
                <h2 className="text-base sm:text-lg font-black text-slate-900">
                  {tTerm(currentAgeMeta.label)}
                </h2>
                <p className="text-xs sm:text-sm text-slate-600 leading-snug">
                  {localizedAgeMeta.tagline}
                </p>
              </div>
            </div>
            {currentAgeMeta.seoKeywords.length > 0 && isEs && (
              <div className="flex flex-wrap items-center gap-1.5 pt-2 lg:pt-0 border-t lg:border-t-0 border-slate-100 w-full lg:w-auto">
                <span className="text-[11px] font-bold text-slate-600 uppercase tracking-wider mr-1 shrink-0">
                  {ui.popularFiltersHeading}:
                </span>
                {currentAgeMeta.seoKeywords.map((kw, idx) => (
                  <span
                    key={idx}
                    className="px-2.5 py-1 rounded-xl text-xs font-semibold bg-slate-50 border border-slate-200 text-slate-700 shadow-2xs"
                  >
                    {applyCurrencyDisplay(kw, activeCurrency)}
                  </span>
                ))}
              </div>
            )}
          </div>
        )}

        {/* ACTIVE SEARCH BANNER */}
        {searchQuery.trim() !== '' && (
          <div className="mb-6 flex flex-wrap items-center justify-between gap-3 p-4 bg-indigo-50/80 border border-indigo-200 rounded-2xl shadow-xs">
            <div className="flex items-center gap-2.5 text-indigo-950 font-bold text-sm">
              <span className="flex h-2.5 w-2.5 rounded-full bg-emerald-500 animate-pulse"></span>
              <span>
                {ui.showingResults}:{' '}
                <mark className="bg-indigo-100 text-indigo-900 px-2 py-0.5 rounded font-black">
                  &ldquo;{searchQuery}&rdquo;
                </mark>
              </span>
            </div>
            <button
              type="button"
              onClick={() => setSearchQuery('')}
              className="text-xs bg-white text-indigo-800 px-3.5 py-1.5 rounded-xl border border-indigo-200 font-bold hover:bg-indigo-100 hover:text-indigo-950 transition-all shadow-xs cursor-pointer flex items-center gap-1.5"
            >
              <span>✕ {ui.headerClearSearch}</span>
            </button>
          </div>
        )}

        {/* PRODUCTS GRID */}
        {filteredProducts.length > 0 ? (
          <>
            <section className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-2 sm:gap-2.5 lg:gap-3 mb-12">
              {sortedFilteredProducts.slice(0, visibleCount).map((product, idx) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  currentTheme="classic"
                  rankBadge={
                    sortBy === 'featured'
                      ? idx === 0
                        ? 1
                        : idx === 1
                        ? 2
                        : idx === 2
                        ? 3
                        : undefined
                      : undefined
                  }
                />
              ))}

              {sortedLiveAmazonProducts.map((liveProd) => (
                <LiveAmazonProductCard
                  key={liveProd.asin}
                  product={liveProd}
                  categoryLabel={selectedCategory !== 'all' ? tTerm(selectedCategory) : amazonSiteName}
                  badgeLabel={ui.liveBadge}
                />
              ))}

              <AmazonGridDiscoveryCard
                searchQuery={searchQuery}
                selectedAge={selectedAge}
                selectedCategory={selectedCategory}
                onLoadLiveToGrid={handleLoadLiveToGrid}
                isLoadingLive={isLoadingLive}
                hasLoadedLive={liveAmazonProducts.length > 0}
              />
            </section>

            {sortedFilteredProducts.length > visibleCount && (
              <div className="mb-12 flex flex-col items-center justify-center gap-2">
                <button
                  type="button"
                  onClick={() => setVisibleCount((prev) => prev + 18)}
                  className="px-8 py-4 rounded-2xl bg-gradient-to-r from-indigo-700 to-indigo-800 hover:from-indigo-800 hover:to-indigo-900 text-white font-black text-sm shadow-md hover:shadow-lg hover:shadow-indigo-500/20 transition-all flex items-center gap-2.5 cursor-pointer hover:scale-102 active:scale-98"
                >
                  <RefreshCw className="w-4 h-4 text-amber-300" aria-hidden="true" />
                  <span>
                    {isEs
                      ? 'Cargar más ideas de regalo (+18 productos)'
                      : `${ui.amazonGridBtn} (+18 ${ui.productsUnit})`}
                  </span>
                </button>
                <span className="text-xs text-slate-700 font-medium">
                  {Math.min(visibleCount, sortedFilteredProducts.length)} / {sortedFilteredProducts.length}{' '}
                  {ui.ideasUnit}
                </span>
              </div>
            )}

            {(selectedCategory !== 'all' ||
              selectedAge !== 'all' ||
              searchQuery.trim() !== '' ||
              liveAmazonProducts.length > 0) && (
              <div className="mb-12 flex flex-col items-center justify-center gap-2">
                <button
                  type="button"
                  onClick={handleLoadLiveToGrid}
                  disabled={isLoadingLive}
                  className="px-7 py-4 rounded-2xl bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-500 hover:to-amber-600 text-slate-950 font-black text-sm shadow-md hover:shadow-lg hover:shadow-amber-500/25 transition-all flex items-center gap-2.5 cursor-pointer disabled:opacity-75 hover:scale-102 active:scale-98"
                >
                  {isLoadingLive ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin text-slate-950" aria-hidden="true" />
                      <span>{ui.loadingLiveTitle}</span>
                    </>
                  ) : (
                    <>
                      <ShoppingBag className="w-4 h-4 text-slate-950" aria-hidden="true" />
                      <span>{ui.liveSearchBtn}</span>
                    </>
                  )}
                </button>
                <span className="text-[11px] text-slate-600 font-medium">
                  {ui.trustStock} · {amazonSiteName}
                </span>
              </div>
            )}

            <AmazonLiveSearchCard
              currentTheme="classic"
              initialQuery={searchQuery}
              selectedPrice={selectedPrice}
            />
          </>
        ) : (
          <div className="mb-16">
            {liveAmazonProducts.length > 0 ? (
              <div>
                <div className="mb-6 p-4 sm:p-5 bg-gradient-to-r from-amber-50 to-orange-50 border border-amber-200 rounded-3xl flex flex-wrap items-center justify-between gap-3 shadow-xs">
                  <div className="flex items-center gap-3 text-amber-950 font-bold text-sm">
                    <span className="p-2 bg-amber-400/20 text-amber-700 rounded-xl">
                      <ShoppingBag className="w-5 h-5" aria-hidden="true" />
                    </span>
                    <div>
                      <p className="font-extrabold text-slate-900">
                        {ui.liveResultsTitle} {amazonSiteName}
                      </p>
                      <p className="text-xs text-slate-600 font-normal">{ui.liveResultsSubtitle}</p>
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={() => {
                      setSelectedAge('all');
                      setSelectedCategory('all');
                      setSelectedGender('all');
                      setSelectedPrice('all');
                      setSearchQuery('');
                      setLiveAmazonProducts([]);
                    }}
                    className="text-xs bg-white text-slate-800 px-4 py-2 rounded-xl border border-amber-200 font-bold hover:bg-amber-100 transition-all shadow-xs cursor-pointer"
                  >
                    {ui.resetFiltersBtn}
                  </button>
                </div>

                <section className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-2 sm:gap-2.5 lg:gap-3 mb-12">
                  {sortedLiveAmazonProducts.map((liveProd) => (
                    <LiveAmazonProductCard
                      key={liveProd.asin}
                      product={liveProd}
                      categoryLabel={selectedCategory !== 'all' ? tTerm(selectedCategory) : amazonSiteName}
                      badgeLabel={ui.liveBadge}
                    />
                  ))}
                  <AmazonGridDiscoveryCard
                    searchQuery={searchQuery}
                    selectedAge={selectedAge}
                    selectedCategory={selectedCategory}
                    onLoadLiveToGrid={handleLoadLiveToGrid}
                    isLoadingLive={isLoadingLive}
                    hasLoadedLive={true}
                  />
                </section>
              </div>
            ) : isLoadingLive ? (
              <div className="py-20 text-center flex flex-col items-center justify-center gap-3">
                <Loader2 className="w-10 h-10 animate-spin text-amber-500" aria-hidden="true" />
                <h2 className="text-lg font-bold text-slate-900">
                  {ui.loadingLiveTitle} ({amazonSiteName})
                </h2>
                <p className="text-xs text-slate-600 max-w-md">{ui.loadingLiveDesc}</p>
              </div>
            ) : (
              <div className="py-12 mb-16">
                <div className="text-center py-10 px-4 rounded-3xl border border-dashed border-slate-300 mb-8 bg-white/60">
                  <Search className="w-12 h-12 mx-auto mb-3 text-slate-500" aria-hidden="true" />
                  <h2 className="text-xl font-bold mb-2 text-slate-900">{ui.noResultsTitle}</h2>
                  <p className="text-sm text-slate-600 mb-5 max-w-xl mx-auto">
                    {ui.noResultsBody} ({amazonSiteName})
                  </p>
                  <button
                    type="button"
                    onClick={() => {
                      setSelectedAge('all');
                      setSelectedCategory('all');
                      setSelectedGender('all');
                      setSelectedPrice('all');
                      setSearchQuery('');
                    }}
                    className="px-5 py-2.5 rounded-xl bg-slate-200 text-slate-800 text-xs font-bold hover:bg-slate-300 transition-colors cursor-pointer"
                  >
                    {ui.resetFiltersBtn}
                  </button>
                </div>

                <AmazonLiveSearchCard
                  currentTheme="classic"
                  initialQuery={
                    searchQuery || (isEs ? 'ofertas regalos ninos y jovenes' : 'best gift ideas')
                  }
                  selectedPrice={selectedPrice}
                />
              </div>
            )}
          </div>
        )}

        {/* SEO CONTENT & INTERNAL DISCOVERY HUB SECTION */}
        <section className="rounded-3xl p-6 sm:p-10 mb-12 border border-slate-200 bg-white text-slate-800 shadow-xs space-y-8">
          <div>
            <h2 className="text-2xl sm:text-3xl font-black mb-4 tracking-tight text-slate-900">
              {i18nConfig
                ? applyCurrencyDisplay(i18nConfig.seoSectionTitle, activeCurrency)
                : '¿Qué Regalar? Guía de Ideas de Regalo Originales para Todas las Edades'}
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed mb-6">
              {i18nConfig ? (
                <>
                  {applyCurrencyDisplay(i18nConfig.seoSectionBody, activeCurrency)}{' '}
                  <Link href={localePath('/votar')} className="text-indigo-700 font-bold hover:underline">
                    {votingHub.breadcrumbLabel}
                  </Link>
                  {' · '}
                  <Link href={localePath('/carta-papa-noel')} className="text-indigo-700 font-bold hover:underline">
                    {santaHub.breadcrumbLabel}
                  </Link>
                  {' · '}
                  <Link href={localePath('/regalos-gta-6')} className="text-indigo-700 font-bold hover:underline">
                    {gtaHub.breadcrumbLabel}
                  </Link>
                  {' · '}
                  <Link href={localePath('/gaming')} className="text-indigo-700 font-bold hover:underline">
                    {gamingHub.breadcrumbLabel}
                  </Link>
                  {' · '}
                  <Link href={localePath('/motoristas')} className="text-indigo-700 font-bold hover:underline">
                    {bikersHub.breadcrumbLabel}
                  </Link>
                  {' · '}
                  <Link href={localePath('/amantes-del-cafe')} className="text-indigo-700 font-bold hover:underline">
                    {coffeeHub.breadcrumbLabel}
                  </Link>
                  {' · '}
                  <Link href={localePath('/regalos-menos-20-euros')} className="text-emerald-800 font-bold hover:underline">
                    {under20Hub.breadcrumbLabel}
                  </Link>
                </>
              ) : (
                <>
                  Elegir qué <strong>regalar</strong> en un cumpleaños, aniversario, amigo invisible o Navidad es mucho más sencillo al filtrar por edad y aficiones reales. En <strong>Un Buen Regalo</strong> seleccionamos los productos mejor valorados para que aciertes siempre. Descubre desde{' '}
                  <Link href={localePath('/regalos-menos-20-euros')} className="text-emerald-800 font-bold hover:underline">
                    regalos por menos de 20 euros
                  </Link>{' '}
                  hasta detalles que sorprenden de verdad. Además, puedes utilizar nuestra{' '}
                  <Link href={localePath('/votar')} className="text-indigo-700 font-bold hover:underline">
                    votación de regalos en grupo por WhatsApp
                  </Link>{' '}
                  o escribir la{' '}
                  <Link href={localePath('/carta-papa-noel')} className="text-indigo-700 font-bold hover:underline">
                    Carta a Papá Noel online
                  </Link>
                  . Explora también nuestros catálogos temáticos de{' '}
                  <Link href={localePath('/regalos-gta-6')} className="text-indigo-700 font-bold hover:underline">
                    GTA 6
                  </Link>
                  ,{' '}
                  <Link href={localePath('/motoristas')} className="text-indigo-700 font-bold hover:underline">
                    Motoristas
                  </Link>
                  ,{' '}
                  <Link href={localePath('/gaming')} className="text-indigo-700 font-bold hover:underline">
                    Gaming
                  </Link>{' '}
                  o{' '}
                  <Link href={localePath('/amantes-del-cafe')} className="text-indigo-700 font-bold hover:underline">
                    Café Barista
                  </Link>
                  .
                </>
              )}
            </p>

            {i18nConfig && i18nConfig.faqItems.length > 0 && (
              <div className="mb-8 grid grid-cols-1 md:grid-cols-2 gap-4">
                {i18nConfig.faqItems.map((faq, idx) => (
                  <div
                    key={idx}
                    className="p-4 rounded-2xl bg-slate-50 border border-slate-200/90 space-y-1.5"
                  >
                    <h3 className="font-bold text-sm text-slate-900 flex items-center gap-2">
                      <span>{i18nConfig.flag}</span>
                      <span>{applyCurrencyDisplay(faq.question, activeCurrency)}</span>
                    </h3>
                    <p className="text-xs text-slate-600 leading-relaxed">
                      {applyCurrencyDisplay(faq.answer, activeCurrency)}
                    </p>
                  </div>
                ))}
              </div>
            )}

            {isEs ? (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-xs sm:text-sm leading-relaxed text-slate-600">
                <div className="space-y-2">
                  <h3 className="font-bold text-base flex items-center gap-2 text-indigo-700">
                    <span>🧸</span> Recién Nacidos y 0 a 3 Años
                  </h3>
                  <p>
                    Para los más pequeños, los regalos deben combinar <strong>seguridad certificada</strong> y practicidad para los padres. Las <strong>tartas de pañales</strong> son un acierto seguro al incluir pañales de primera calidad. Además, los juguetes Montessori de madera estimulan la motricidad libre sin pantallas ni sobreestimulación.
                  </p>
                </div>
                <div className="space-y-2">
                  <h3 className="font-bold text-base flex items-center gap-2 text-indigo-700">
                    <span>🎨</span> Niños de 4 a 12 Años
                  </h3>
                  <p>
                    En esta etapa el juego en familia cobra protagonismo. Los <strong>juegos de mesa modernos</strong> como Catán Junior o Virus desarrollan la agilidad mental y reúnen a todos. También triunfan los sets de construcción LEGO Creator y los circuitos Scalextric para disfrutar compitiendo sin pantallas.
                  </p>
                </div>
                <div className="space-y-2">
                  <h3 className="font-bold text-base flex items-center gap-2 text-indigo-700">
                    <span>🎧</span> Jóvenes, Adultos y Regalazos (+18)
                  </h3>
                  <p>
                    Para adolescentes y adultos que parecen tenerlo todo, los detalles con personalidad propia son la clave. Destacan los videojuegos de <strong>PlayStation 5</strong>, el merchandising de <strong>GTA VI</strong> y los periféricos gaming. Para amantes del relax, las cafeteras espresso barista, el equipamiento motero y las cajas Smartbox nunca fallan.
                  </p>
                </div>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-xs sm:text-sm leading-relaxed text-slate-600">
                {ui.tipsCards.map((card, idx) => (
                  <div key={idx} className="space-y-2 p-4 rounded-2xl bg-slate-50 border border-slate-200/80">
                    <h3 className="font-bold text-base text-indigo-800">
                      {applyCurrencyDisplay(card.title, activeCurrency)}
                    </h3>
                    <p>{applyCurrencyDisplay(card.body, activeCurrency)}</p>
                  </div>
                ))}
              </div>
            )}

            {/* Indexable Filter Guides Strip for Full Multilingual Discovery */}
            <div className="mt-8 pt-6 border-t border-slate-100">
              <h3 className="text-sm font-black text-slate-900 mb-3 flex items-center gap-2">
                <span aria-hidden="true">🧭</span>
                <span>{ui.seoGuideLinksTitle}</span>
              </h3>
              <div className="flex flex-wrap gap-2">
                {HOME_FEATURED_FILTERS.map((slug) => {
                  const meta = SEO_FILTER_ROUTES[slug];
                  if (!meta) return null;
                  return (
                    <Link
                      key={slug}
                      href={localePath(`/${slug}`)}
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-50 hover:bg-amber-50 border border-slate-200 hover:border-amber-300 text-xs font-semibold text-slate-800 hover:text-slate-950 transition-colors"
                    >
                      <span aria-hidden="true">{meta.icon}</span>
                      <span>{tTerm(meta.label)}</span>
                    </Link>
                  );
                })}
              </div>
            </div>

            <div className="mt-8 pt-6 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="text-xs text-slate-600 text-center sm:text-left">
                <span className="font-bold text-slate-900 block">{ui.sharePromptTitle}</span>
                <span>{ui.sharePromptSubtitle}</span>
              </div>
              <SocialShareWidget />
            </div>
          </div>
        </section>

        {/* Avoid duplicate FAQPage JSON-LD when [ageSlug]/page.tsx renders it for /<lang> */}
        <SeoFaq
          currentTheme="classic"
          localeKey={effectiveLocaleKey}
          omitSchema={Boolean(i18nConfig)}
        />
      </main>

      <Footer currentTheme="classic" />
    </div>
  );
}

export default HomeCatalogView;
