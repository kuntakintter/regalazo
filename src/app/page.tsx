'use client';

import { parsePrice, getAmazonProductUrl } from '@/lib/amazon';

import React, { useState, useMemo, useEffect, useCallback } from 'react';
import Image from 'next/image';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import FilterBar from '@/components/FilterBar';
import ProductCard from '@/components/ProductCard';
import LiveAmazonProductCard from '@/components/LiveAmazonProductCard';
import GiftWizard from '@/components/GiftWizard';
import SeoFaq from '@/components/SeoFaq';
import ThemeAtmosphere from '@/components/ThemeAtmosphere';
import AmazonLiveSearchCard from '@/components/AmazonLiveSearchCard';
import AmazonGridDiscoveryCard from '@/components/AmazonGridDiscoveryCard';
import SocialShareBar from '@/components/SocialShareBar';
import TopPodium from '@/components/TopPodium';
import { useCurrency } from '@/context/CurrencyContext';
import { PRODUCTS, AGE_CATEGORIES, GENERAL_CATEGORY_MAPPING, Product, CLOTHING_SUBFILTERS, isClothingCategory, ANIME_SERIES_SUBFILTERS, isFiguresCategory } from '@/data/products';
import { matchesSearchQuery } from '@/utils/search';
import { LiveSearchResult } from '@/app/api/live-search/route';
import {
  BadgePercent,
  Gift,
  Flame,
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
  X
} from 'lucide-react';

const QUICK_PROMPTS: Array<{
  label: string;
  query: string;
  price?: string;
  sort?: 'featured' | 'price-asc' | 'price-desc' | 'rating';
}> = [
  { label: '🎁 Para mi novio', query: 'novio' },
  { label: '🎮 Gamer / Friki', query: 'gaming' },
  { label: '💸 Menos de 20 €', query: '', price: '<20', sort: 'price-asc' },
  { label: '🏍️ Moteros', query: 'moto' },
  { label: '☕ Amante del café', query: 'cafe' },
  { label: '👶 Bebés y Niños', query: 'bebe' },
  { label: '🐾 Mascotas', query: 'mascotas' },
];

const AGE_BANNER_ICONS: Record<string, { icon: React.ComponentType<{ className?: string }>; bg: string; color: string }> = {
  '0-12m': { icon: Baby, bg: 'bg-rose-50 border-rose-200', color: 'text-rose-600' },
  '1-3': { icon: Puzzle, bg: 'bg-emerald-50 border-emerald-200', color: 'text-emerald-600' },
  '4-6': { icon: Palette, bg: 'bg-amber-50 border-amber-200', color: 'text-amber-600' },
  '7-9': { icon: Wand2, bg: 'bg-indigo-50 border-indigo-200', color: 'text-indigo-600' },
  '10-12': { icon: Rocket, bg: 'bg-blue-50 border-blue-200', color: 'text-blue-600' },
  '13-15': { icon: Headphones, bg: 'bg-violet-50 border-violet-200', color: 'text-violet-600' },
  '16-18': { icon: Gamepad2, bg: 'bg-purple-50 border-purple-200', color: 'text-purple-600' },
  '+18': { icon: Wine, bg: 'bg-rose-50 border-rose-200', color: 'text-rose-700' },
};

export default function HomePage() {
  const { formatPrice } = useCurrency();
  const [selectedAge, setSelectedAge] = useState<string>('all');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedClothingSub, setSelectedClothingSub] = useState<string>('all');
  const [selectedAnimeSub, setSelectedAnimeSub] = useState<string>('all');
  const [selectedGender, setSelectedGender] = useState<'all' | 'boy' | 'girl' | 'reveal'>('all');
  const [selectedPrice, setSelectedPrice] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [sortBy, setSortBy] = useState<'featured' | 'price-asc' | 'price-desc' | 'rating'>('featured');
  const [visibleCount, setVisibleCount] = useState<number>(18);
  const [isAiModalOpen, setIsAiModalOpen] = useState(false);
  const [showAdvancedFilters, setShowAdvancedFilters] = useState<boolean>(false);

  // Curated Superventas pool for Left Showcase Wing (16 top products -> 4 slides of 4 products)
  const topShowcasePool = useMemo(() => {
    return PRODUCTS.filter((p) => p.rating >= 4.6 && p.imageUrl).slice(0, 16);
  }, []);

  // Curated Chollos pool (< 20 €) for Right Showcase Wing (16 products -> 4 slides of 4 products)
  const budgetShowcasePool = useMemo(() => {
    return PRODUCTS.filter((p) => {
      const price = parsePrice(p.priceText);
      return price > 0 && price <= 20 && p.imageUrl;
    }).slice(0, 16);
  }, []);

  // Carousel page state (changes every 10 seconds)
  const [leftCarouselIndex, setLeftCarouselIndex] = useState(0);
  const [rightCarouselIndex, setRightCarouselIndex] = useState(0);
  const [isLeftPaused, setIsLeftPaused] = useState(false);
  const [isRightPaused, setIsRightPaused] = useState(false);

  // Group topShowcasePool into slides of 4 products (2x2)
  const leftSlides = useMemo(() => {
    const slides: Product[][] = [];
    for (let i = 0; i < topShowcasePool.length; i += 4) {
      slides.push(topShowcasePool.slice(i, i + 4));
    }
    return slides;
  }, [topShowcasePool]);

  // Group budgetShowcasePool into slides of 4 products (2x2)
  const rightSlides = useMemo(() => {
    const slides: Product[][] = [];
    for (let i = 0; i < budgetShowcasePool.length; i += 4) {
      slides.push(budgetShowcasePool.slice(i, i + 4));
    }
    return slides;
  }, [budgetShowcasePool]);

  // Auto-advance Left Carousel every 10 seconds with smooth slide
  useEffect(() => {
    if (isLeftPaused || leftSlides.length <= 1) return;

    const timer = setInterval(() => {
      setLeftCarouselIndex((prev) => (prev + 1) % leftSlides.length);
    }, 10000);

    return () => clearInterval(timer);
  }, [isLeftPaused, leftSlides.length]);

  // Auto-advance Right Carousel every 10 seconds with smooth slide
  useEffect(() => {
    if (isRightPaused || rightSlides.length <= 1) return;

    const timer = setInterval(() => {
      setRightCarouselIndex((prev) => (prev + 1) % rightSlides.length);
    }, 10000);

    return () => clearInterval(timer);
  }, [isRightPaused, rightSlides.length]);

  // Live Amazon products state to render in the grid
  const [liveAmazonProducts, setLiveAmazonProducts] = useState<LiveSearchResult[]>([]);
  const [isLoadingLive, setIsLoadingLive] = useState(false);

  // Quick prompt handler from hero chips
  const handleQuickPrompt = (promptItem: {
    label: string;
    query: string;
    price?: string;
    sort?: 'featured' | 'price-asc' | 'price-desc' | 'rating';
  }) => {
    setSearchQuery(promptItem.query);
    if (promptItem.price) {
      setSelectedPrice(promptItem.price);
    } else {
      setSelectedPrice('all');
    }
    if (promptItem.sort) {
      setSortBy(promptItem.sort);
    } else {
      setSortBy('featured');
    }
    setSelectedAge('all');
    setSelectedCategory('all');
    setSelectedClothingSub('all');
    setSelectedAnimeSub('all');
    setLiveAmazonProducts([]);
    setTimeout(() => {
      const el = document.getElementById('catalogo-productos');
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    }, 50);
  };

  // Submit search from Hero input
  const handleHeroSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const el = document.getElementById('catalogo-productos');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  // Handle age selection
  const handleSelectAge = (age: string) => {
    setSelectedAge(age);
    setSelectedCategory('all');
    setSelectedClothingSub('all');
    setSelectedAnimeSub('all');
    setVisibleCount(18);
    if (selectedPrice !== 'all') setSelectedPrice('all');
    if (searchQuery) setSearchQuery('');
    setLiveAmazonProducts([]);
  };

  // Handle category selection
  const handleSelectCategory = (cat: string) => {
    setSelectedCategory(cat);
    setSelectedClothingSub('all');
    setSelectedAnimeSub('all');
    if (selectedPrice !== 'all') setSelectedPrice('all');
    if (searchQuery) setSearchQuery('');
    setLiveAmazonProducts([]);
  };

  // Handle clothing subfilter selection (pijamas, chandal, calzado, disfraces, diario)
  const handleSelectClothingSub = (sub: string) => {
    setSelectedClothingSub(sub);
    setVisibleCount(18);
    setLiveAmazonProducts([]);
  };

  // Handle anime / series subfilter selection (dragon ball, pokemon, one piece, etc.)
  const handleSelectAnimeSub = (sub: string) => {
    setSelectedAnimeSub(sub);
    setVisibleCount(18);
    setLiveAmazonProducts([]);
  };

  // Handle gender selection
  const handleSelectGender = (gender: 'all' | 'boy' | 'girl' | 'reveal') => {
    setSelectedGender(gender);
    setVisibleCount(18);
    if (searchQuery) setSearchQuery('');
    setLiveAmazonProducts([]);
  };

  // Handle live search
  const handleSearchChange = (query: string) => {
    setSearchQuery(query);
    setLiveAmazonProducts([]);
    if (query.trim().length > 0) {
      if (selectedAge !== 'all') setSelectedAge('all');
      if (selectedCategory !== 'all') setSelectedCategory('all');
      setSelectedClothingSub('all');
    }
  };

  // Filter products based on search, age, category, gender, price
  const filteredProducts = useMemo(() => {
    const isSearching = searchQuery.trim() !== '';

    return PRODUCTS.filter((product) => {
      // 1. Search query filter
      if (isSearching) {
        if (!matchesSearchQuery(product, searchQuery)) {
          return false;
        }
      }

      // 2. Gender filter
      if (selectedGender === 'reveal') {
        const isRevealSub = product.subcategory === 'Fiestas y Revelación de Género';
        const hasRevealKeyword =
          product.title.toLowerCase().includes('revelación') ||
          product.description.toLowerCase().includes('revelación') ||
          product.searchQuery.toLowerCase().includes('revelacion');
        if (!isRevealSub && !hasRevealKeyword) return false;
      } else if (selectedGender !== 'all') {
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

      // 4.5. Clothing subfilter (pijamas, chandal, calzado, disfraces, diario)
      if (!isSearching && isClothingCategory(selectedCategory) && selectedClothingSub !== 'all') {
        const currentSub = CLOTHING_SUBFILTERS.find((s) => s.id === selectedClothingSub);
        if (currentSub && currentSub.keywords.length > 0) {
          const textToMatch = `${product.title} ${product.description} ${product.subcategory} ${product.searchQuery}`.toLowerCase();
          const matchesKeyword = currentSub.keywords.some((kw) => textToMatch.includes(kw.toLowerCase()));
          if (!matchesKeyword) {
            return false;
          }
        }
      }

      // 4.6. Anime & Series subfilter (Dragon Ball, Pokémon, One Piece, One Punch Man, etc.)
      if (!isSearching && isFiguresCategory(selectedCategory) && selectedAnimeSub !== 'all') {
        const currentAnime = ANIME_SERIES_SUBFILTERS.find((s) => s.id === selectedAnimeSub);
        if (currentAnime && currentAnime.keywords.length > 0) {
          const textToMatch = `${product.title} ${product.description} ${product.subcategory} ${product.searchQuery} ${product.badge}`.toLowerCase();
          const matchesKeyword = currentAnime.keywords.some((kw) => textToMatch.includes(kw.toLowerCase()));
          if (!matchesKeyword) {
            return false;
          }
        }
      }

      // 5. Price filter
      if (selectedPrice !== 'all') {
        const prodPrice =
          parseFloat(product.priceText.replace(/[^0-9,.]/g, '').replace(',', '.')) || 0;

        if (selectedPrice === '<20') {
          if (prodPrice > 20) return false;
        } else if (selectedPrice === '20-50') {
          if (prodPrice < 20 || prodPrice > 50) return false;
        } else if (selectedPrice === '50-100') {
          if (prodPrice < 50 || prodPrice > 100) return false;
        } else if (selectedPrice === '>100') {
          if (prodPrice < 100) return false;
        } else {
          const maxBudget = Number(selectedPrice);
          if (!isNaN(maxBudget) && maxBudget < 150) {
            if (prodPrice > maxBudget) return false;
          }
        }
      }

      return true;
    });
  }, [selectedAge, selectedCategory, selectedClothingSub, selectedAnimeSub, selectedGender, selectedPrice, searchQuery]);

  // Sorted products based on sortBy
  const sortedFilteredProducts = useMemo(() => {
    const list = [...filteredProducts];
    if (sortBy === 'price-asc') {
      list.sort((a, b) => parsePrice(a.priceText) - parsePrice(b.priceText));
    } else if (sortBy === 'price-desc') {
      list.sort((a, b) => parsePrice(b.priceText) - parsePrice(a.priceText));
    } else if (sortBy === 'rating') {
      list.sort((a, b) => b.rating - a.rating);
    }
    return list;
  }, [filteredProducts, sortBy]);

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

  // Current active age category metadata
  const currentAgeMeta = useMemo(() => {
    return AGE_CATEGORIES.find((c) => c.id === selectedAge);
  }, [selectedAge]);

  // Contextual live search phrase for Amazon API with high-converting buyer intent
  const liveSearchQuery = useMemo(() => {
    if (searchQuery.trim().length > 0) return searchQuery.trim();

    const parts: string[] = [];

    // Prioridad a subfiltro de ropa específico si está activo
    if (isClothingCategory(selectedCategory) && selectedClothingSub !== 'all') {
      const subObj = CLOTHING_SUBFILTERS.find((s) => s.id === selectedClothingSub);
      if (subObj) {
        parts.push(subObj.searchPhrase);
      }
    } else if (isFiguresCategory(selectedCategory) && selectedAnimeSub !== 'all') {
      const animeObj = ANIME_SERIES_SUBFILTERS.find((s) => s.id === selectedAnimeSub);
      if (animeObj) {
        parts.push(animeObj.searchPhrase);
      }
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
      return 'ideas regalos originales amazon';
    }

    return parts.join(' ');
  }, [searchQuery, selectedCategory, selectedClothingSub, selectedAnimeSub, selectedGender, selectedAge]);

  // Load more live products into the grid (accumulates)
  const handleLoadLiveToGrid = useCallback(async () => {
    if (isLoadingLive) return;
    setIsLoadingLive(true);
    try {
      const res = await fetch(`/api/live-search?q=${encodeURIComponent(liveSearchQuery)}&limit=12`);
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
  }, [isLoadingLive, liveSearchQuery]);

  // Auto-fetch live products whenever a filter is active so the grid ALWAYS displays an abundant, rich selection (8+ items)
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
        fetch(`/api/live-search?q=${encodeURIComponent(liveSearchQuery)}&limit=8`)
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
  }, [selectedCategory, selectedAge, selectedGender, searchQuery, liveSearchQuery]);

  // Handle URL params and custom navigation event for direct category shortcuts (e.g. Especiales: Cartas Pokémon / Figuras & Anime)
  useEffect(() => {
    const applyCategoryFromUrl = () => {
      if (typeof window === 'undefined') return;
      const params = new URLSearchParams(window.location.search);
      const cat = params.get('categoria') || params.get('cat');
      if (cat === 'cartas-pokemon' || cat === 'pokemon') {
        setSelectedCategory('Cartas y Sobres Pokémon');
        setSelectedAge('all');
      } else if (cat === 'figuras-anime' || cat === 'anime' || cat === 'figuras') {
        setSelectedCategory('Figuras de Colección y Cine');
        setSelectedAge('all');
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

    const handleOpenWizard = () => setIsAiModalOpen(true);

    window.addEventListener('select-category', handleCategoryEvent);
    window.addEventListener('popstate', applyCategoryFromUrl);
    window.addEventListener('open-ai-wizard', handleOpenWizard);

    return () => {
      window.removeEventListener('select-category', handleCategoryEvent);
      window.removeEventListener('popstate', applyCategoryFromUrl);
      window.removeEventListener('open-ai-wizard', handleOpenWizard);
    };
  }, []);

  // Handle recommendation from AI wizard
  const handleApplyRecommendation = (filters: {
    age: string;
    category: string;
    gender: 'all' | 'boy' | 'girl' | 'reveal';
    price: string;
    searchQuery?: string;
    hubUrl?: string;
  }) => {
    if (filters.hubUrl) {
      window.location.href = filters.hubUrl;
      return;
    }
    if (filters.searchQuery) {
      setSearchQuery(filters.searchQuery);
    } else {
      setSearchQuery('');
    }
    setSelectedAge(filters.age);
    setSelectedCategory(filters.category);
    setSelectedGender(filters.gender);
    setSelectedPrice(filters.price);
    setLiveAmazonProducts([]);
  };

  return (
    <div className="min-h-screen relative flex flex-col bg-[#eaeded] text-slate-900 selection:bg-amber-500 selection:text-slate-950">
      {/* Background Subtle Atmosphere */}
      <ThemeAtmosphere />

      {/* Navigation Header (Amazon Theme: Deep Navy #131921 & #232f3e with Amber accents) */}
      <Header
        currentTheme="classic"
        onThemeChange={() => {}}
        searchQuery={searchQuery}
        onSearchChange={handleSearchChange}
      />

      {/* Main Content Area */}
      <main className="flex-1 max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 w-full z-10">
        
        {/* HERO SECTION CONTAINER: 3 COLUMNS ON WIDESCREEN (LEFT SHOWCASE + CENTER SEARCH + RIGHT SHOWCASE) */}
        <section className="mb-8">
          <div className="flex flex-col xl:flex-row items-stretch justify-center gap-5">
            
            {/* LEFT SHOWCASE WING (AMAZON 2x2 CARD ROTATING EVERY 10s WITH SMOOTH SLIDE) */}
            <aside
              onMouseEnter={() => setIsLeftPaused(true)}
              onMouseLeave={() => setIsLeftPaused(false)}
              className="hidden lg:flex flex-col w-64 xl:w-72 2xl:w-80 shrink-0 bg-gradient-to-b from-amber-50/80 via-white to-amber-50/40 rounded-3xl p-5 shadow-lg shadow-amber-900/5 border-2 border-amber-400/90 justify-between relative group overflow-hidden"
            >
              <div>
                {/* Header Banner - Amazon Navy Theme with Amber Highlight */}
                <div className="bg-[#131921] -mx-5 -mt-5 px-4 py-3.5 border-b-2 border-amber-400/60 flex items-center justify-between mb-3 text-white">
                  <div>
                    <h2 className="text-sm font-black text-[#febd69] flex items-center gap-1.5 uppercase tracking-wide">
                      <span>🔥</span>
                      <span>Más Regalados</span>
                    </h2>
                    <p className="text-[11px] text-amber-200/90 font-medium">Top ventas verificados</p>
                  </div>
                </div>

                {/* Sliding Carousel Viewport */}
                <div className="overflow-hidden w-full rounded-2xl">
                  <div
                    className="flex transition-transform duration-700 ease-out"
                    style={{ transform: `translateX(-${leftCarouselIndex * 100}%)` }}
                  >
                    {leftSlides.map((slideProducts, sIdx) => (
                      <div key={sIdx} className="w-full shrink-0 grid grid-cols-2 gap-2.5">
                        {slideProducts.map((item) => {
                          const amazonUrl = getAmazonProductUrl(item.asin || 'B0DLWK3LKH');
                          return (
                            <a
                              key={item.id}
                              href={amazonUrl}
                              target="_blank"
                              rel="noopener noreferrer sponsored"
                              className="group/item flex flex-col p-2 rounded-2xl bg-white hover:bg-amber-100/60 border border-amber-200/80 hover:border-amber-400 transition-all cursor-pointer shadow-xs hover:shadow-md"
                            >
                              <div className="relative w-full aspect-square bg-white rounded-xl overflow-hidden mb-1.5 p-1 border border-amber-100">
                                <Image
                                  src={item.imageUrl}
                                  alt={item.title}
                                  fill
                                  className="object-contain p-1 group-hover/item:scale-105 transition-transform"
                                />
                              </div>
                              <span className="text-[11px] font-bold text-slate-800 line-clamp-1 group-hover/item:text-amber-800 transition-colors">
                                {item.title}
                              </span>
                              <div className="flex items-center justify-between mt-0.5">
                                <span className="text-xs font-black text-slate-950">
                                  {formatPrice(item.priceText)}
                                </span>
                                <span className="text-[10px] text-amber-600 font-bold flex items-center gap-0.5">
                                  <Star className="w-2.5 h-2.5 fill-amber-500 text-amber-500" />
                                  {item.rating}
                                </span>
                              </div>
                            </a>
                          );
                        })}
                      </div>
                    ))}
                  </div>
                </div>

                {/* Dots indicator */}
                <div className="flex items-center justify-center gap-1.5 mt-3">
                  {leftSlides.map((_, idx) => (
                    <button
                      key={idx}
                      type="button"
                      onClick={() => setLeftCarouselIndex(idx)}
                      className={`h-1.5 rounded-full transition-all cursor-pointer ${
                        leftCarouselIndex === idx ? 'w-5 bg-amber-500' : 'w-1.5 bg-slate-200 hover:bg-slate-300'
                      }`}
                      aria-label={`Ver página ${idx + 1}`}
                    />
                  ))}
                </div>
              </div>

              <a
                href="#catalogo-productos"
                onClick={() => handleQuickPrompt({ label: 'Top Ventas', query: '', sort: 'rating' })}
                className="pt-2.5 mt-3 border-t border-amber-200 text-xs font-bold text-amber-900 hover:text-amber-700 flex items-center justify-between group/link cursor-pointer bg-amber-100/70 -mx-5 -mb-5 px-5 py-3"
              >
                <span>Ver catálogo superventas</span>
                <ArrowRight className="w-3.5 h-3.5 group-hover/link:translate-x-1 transition-transform" />
              </a>
            </aside>

            {/* CENTER SEARCH ENGINE */}
            <div className="flex-1 max-w-3xl 2xl:max-w-4xl text-center py-8 sm:py-10 px-4 sm:px-8 bg-white rounded-3xl shadow-md border-2 border-slate-300 flex flex-col justify-between">
              <div>
                <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-bold mb-5 shadow-2xs border border-amber-200 bg-amber-50/80 text-amber-950">
                  <span className="flex h-2 w-2 rounded-full bg-emerald-500 animate-pulse"></span>
                  <span>Búsqueda Inteligente Amazon España · Edición {new Date().getFullYear()}</span>
                </div>

                <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black tracking-tight leading-[1.15] mb-4 text-slate-900">
                  {currentAgeMeta ? (
                    <span>{currentAgeMeta.h1}</span>
                  ) : (
                    <span>
                      ¿A quién quieres{' '}
                      <span className="bg-clip-text text-transparent bg-gradient-to-r from-amber-600 via-orange-600 to-indigo-600">
                        sorprender hoy?
                      </span>
                    </span>
                  )}
                </h1>

                <p className="text-sm sm:text-base lg:text-lg text-slate-600 leading-relaxed mb-8 max-w-2xl mx-auto">
                  {currentAgeMeta
                    ? currentAgeMeta.description
                    : 'Escribe a quién quieres regalar o qué le apasiona. Nuestro motor inteligente encontrará las mejores ideas verificadas en Amazon al instante.'}
                </p>

                {/* MAIN PROMPT / SEARCH BAR ESTILO AMAZON */}
                <form onSubmit={handleHeroSearchSubmit} className="relative max-w-2xl mx-auto mb-5">
                  <div className="relative flex items-center shadow-md rounded-2xl bg-white border-2 border-slate-300 hover:border-slate-400 focus-within:border-[#febd69] focus-within:ring-4 focus-within:ring-amber-100 transition-all p-1.5 sm:p-2">
                    <div className="pl-3 pr-2 text-slate-400">
                      <Search className="w-5 h-5 text-slate-400" />
                    </div>
                    <input
                      type="text"
                      value={searchQuery}
                      onChange={(e) => handleSearchChange(e.target.value)}
                      placeholder="Ej: Para mi novio friki de Star Wars, gamer, cafetera, niña 6 años..."
                      className="w-full bg-transparent px-2 py-2 text-sm sm:text-base text-slate-800 placeholder-slate-400 focus:outline-none"
                    />
                    {searchQuery && (
                      <button
                        type="button"
                        onClick={() => handleSearchChange('')}
                        className="p-1.5 text-slate-400 hover:text-slate-600 rounded-lg mr-1 cursor-pointer transition-colors"
                        title="Borrar búsqueda"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    )}
                    <button
                      type="submit"
                      className="px-5 sm:px-6 py-2.5 bg-[#febd69] hover:bg-[#f3a847] active:bg-[#e47911] text-slate-950 font-black text-sm rounded-xl transition-colors shadow-xs shrink-0 flex items-center gap-1.5 cursor-pointer border border-[#febd69]"
                    >
                      <Search className="w-4 h-4 stroke-[2.5]" />
                      <span className="hidden sm:inline">Buscar</span>
                    </button>
                  </div>
                </form>

                {/* QUICK INSPIRATION PROMPT CHIPS */}
                <div className="flex flex-wrap items-center justify-center gap-2 mb-6 max-w-3xl mx-auto">
                  <span className="text-xs font-semibold text-slate-500 mr-1 flex items-center gap-1">
                    Inspiración rápida:
                  </span>
                  {QUICK_PROMPTS.map((prompt) => (
                    <button
                      key={prompt.label}
                      type="button"
                      onClick={() => handleQuickPrompt(prompt)}
                      className="text-xs px-3 py-1.5 rounded-full font-semibold bg-slate-50 hover:bg-amber-50 border border-slate-200 hover:border-amber-300 text-slate-700 hover:text-slate-900 transition-all shadow-2xs hover:scale-105 active:scale-95 cursor-pointer"
                    >
                      {prompt.label}
                    </button>
                  ))}
                </div>

                {/* AI COPILOT POPUP TRIGGER BUTTON (ESTILO AMAZON RUFUS) */}
                <div className="flex items-center justify-center gap-3 mb-6">
                  <button
                    onClick={() => setIsAiModalOpen(true)}
                    className="inline-flex items-center gap-2 px-5 py-2.5 rounded-2xl bg-[#232f3e] hover:bg-[#131921] text-amber-300 hover:text-white border border-slate-700 font-bold text-xs sm:text-sm shadow-md transition-all hover:scale-102 active:scale-98 cursor-pointer"
                  >
                    <Bot className="w-4 h-4 text-amber-400 animate-pulse" />
                    <span>¿No sabes qué elegir? Pregúntale a nuestro Asistente IA</span>
                    <ArrowRight className="w-3.5 h-3.5 text-amber-300" />
                  </button>
                </div>
              </div>

              {/* Quick Badges of Trust */}
              <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-6 text-xs font-medium text-slate-500 pt-3 border-t border-slate-100">
                <span className="flex items-center gap-1.5">
                  <ShieldCheck className="w-4 h-4 text-emerald-500" />
                  Garantía de Devolución Amazon.es
                </span>
                <span className="flex items-center gap-1.5">
                  <TrendingUp className="w-4 h-4 text-amber-500" />
                  Basado en Valoraciones Reales 4.5+ ★
                </span>
                <span className="flex items-center gap-1.5">
                  <BadgePercent className="w-4 h-4 text-orange-500" />
                  Precios y Ofertas al Día
                </span>
              </div>
            </div>

            {/* RIGHT SHOWCASE WING (AMAZON 2x2 CARD ROTATING EVERY 10s WITH SMOOTH SLIDE) */}
            <aside
              onMouseEnter={() => setIsRightPaused(true)}
              onMouseLeave={() => setIsRightPaused(false)}
              className="hidden lg:flex flex-col w-64 xl:w-72 2xl:w-80 shrink-0 bg-gradient-to-b from-emerald-50/80 via-white to-emerald-50/40 rounded-3xl p-5 shadow-lg shadow-emerald-900/5 border-2 border-emerald-400/90 justify-between relative group overflow-hidden"
            >
              <div>
                {/* Header Banner - Amazon Navy Theme with Emerald Highlight */}
                <div className="bg-[#131921] -mx-5 -mt-5 px-4 py-3.5 border-b-2 border-emerald-400/60 flex items-center justify-between mb-3 text-white">
                  <div>
                    <h2 className="text-sm font-black text-emerald-300 flex items-center gap-1.5 uppercase tracking-wide">
                      <span>⚡</span>
                      <span>Chollos &lt; 20 €</span>
                    </h2>
                    <p className="text-[11px] text-emerald-200/90 font-medium">Ideas para acertar sin gastar</p>
                  </div>
                </div>

                {/* Sliding Carousel Viewport */}
                <div className="overflow-hidden w-full rounded-2xl">
                  <div
                    className="flex transition-transform duration-700 ease-out"
                    style={{ transform: `translateX(-${rightCarouselIndex * 100}%)` }}
                  >
                    {rightSlides.map((slideProducts, sIdx) => (
                      <div key={sIdx} className="w-full shrink-0 grid grid-cols-2 gap-2.5">
                        {slideProducts.map((item) => {
                          const amazonUrl = getAmazonProductUrl(item.asin || 'B0DLWK3LKH');
                          return (
                            <a
                              key={item.id}
                              href={amazonUrl}
                              target="_blank"
                              rel="noopener noreferrer sponsored"
                              className="group/item flex flex-col p-2 rounded-2xl bg-white hover:bg-emerald-100/60 border border-emerald-200/80 hover:border-emerald-400 transition-all cursor-pointer shadow-xs hover:shadow-md"
                            >
                              <div className="relative w-full aspect-square bg-white rounded-xl overflow-hidden mb-1.5 p-1 border border-emerald-100">
                                <Image
                                  src={item.imageUrl}
                                  alt={item.title}
                                  fill
                                  className="object-contain p-1 group-hover/item:scale-105 transition-transform"
                                />
                              </div>
                              <span className="text-[11px] font-bold text-slate-800 line-clamp-1 group-hover/item:text-emerald-800 transition-colors">
                                {item.title}
                              </span>
                              <div className="flex items-center justify-between mt-0.5">
                                <span className="text-xs font-black text-emerald-700">
                                  {formatPrice(item.priceText)}
                                </span>
                                <span className="text-[10px] text-slate-400 font-bold">
                                  Chollo
                                </span>
                              </div>
                            </a>
                          );
                        })}
                      </div>
                    ))}
                  </div>
                </div>

                {/* Dots indicator */}
                <div className="flex items-center justify-center gap-1.5 mt-3">
                  {rightSlides.map((_, idx) => (
                    <button
                      key={idx}
                      type="button"
                      onClick={() => setRightCarouselIndex(idx)}
                      className={`h-1.5 rounded-full transition-all cursor-pointer ${
                        rightCarouselIndex === idx ? 'w-5 bg-emerald-500' : 'w-1.5 bg-slate-200 hover:bg-slate-300'
                      }`}
                      aria-label={`Ver página ${idx + 1}`}
                    />
                  ))}
                </div>
              </div>

              <a
                href="#catalogo-productos"
                onClick={() => handleQuickPrompt({ label: 'Menos de 20 €', query: '', price: '<20', sort: 'price-asc' })}
                className="pt-2.5 mt-3 border-t border-emerald-200 text-xs font-bold text-emerald-900 hover:text-emerald-700 flex items-center justify-between group/link cursor-pointer bg-emerald-100/70 -mx-5 -mb-5 px-5 py-3"
              >
                <span>Ver todos por &lt; 20 €</span>
                <ArrowRight className="w-3.5 h-3.5 group-hover/link:translate-x-1 transition-transform" />
              </a>
            </aside>

          </div>
        </section>

        {/* AI GIFT ASSISTANT MODAL (POPUP) */}
        <GiftWizard
          isOpen={isAiModalOpen}
          initialAge={selectedAge}
          initialGender={selectedGender}
          onClose={() => setIsAiModalOpen(false)}
          onApplyRecommendation={handleApplyRecommendation}
        />

        {/* SOCIAL SHARE WIDGET */}
        <SocialShareBar />

        {/* CATALOG SECTION WITH COLLAPSIBLE MANUAL FILTERS */}
        <div id="catalogo-productos" className="pt-2">
          {/* Header Row: Result count & Toggle Manual Filters */}
          <div className="flex flex-wrap items-center justify-between gap-4 mb-4 pb-3 border-b border-slate-200/80">
            <div className="flex items-center gap-3">
              <span className="w-2 h-7 rounded-full bg-amber-500 shrink-0"></span>
              <div>
                <h2 className="text-lg sm:text-xl font-black text-slate-900 tracking-tight flex items-center gap-2">
                  <span>Catálogo de Regalos</span>
                  {searchQuery.trim() && (
                    <span className="text-xs font-bold text-amber-900 bg-amber-100 border border-amber-200 px-2 py-0.5 rounded-full">
                      Buscando: &quot;{searchQuery}&quot;
                    </span>
                  )}
                </h2>
                <p className="text-xs text-slate-500 font-medium">
                  Mostrando <strong className="text-slate-900 font-bold">{filteredProducts.length + liveAmazonProducts.length}</strong> regalos verificados con opiniones reales
                </p>
              </div>
            </div>

            <button
              type="button"
              onClick={() => setShowAdvancedFilters((prev) => !prev)}
              className={`inline-flex items-center gap-2 px-3.5 py-1.5 text-xs font-bold rounded-xl border transition-all cursor-pointer shadow-xs ${
                showAdvancedFilters || (selectedAge !== 'all' || selectedCategory !== 'all' || selectedGender !== 'all' || selectedPrice !== 'all')
                  ? 'bg-amber-50 border-amber-300 text-amber-950 hover:bg-amber-100'
                  : 'bg-white border-slate-200 text-slate-700 hover:bg-slate-50'
              }`}
            >
              <SlidersHorizontal className="w-3.5 h-3.5 text-amber-600" />
              <span>{showAdvancedFilters ? 'Ocultar filtros manuales' : 'Filtros manuales (edad, categoría...)'}</span>
              {(selectedAge !== 'all' || selectedCategory !== 'all' || selectedGender !== 'all' || selectedPrice !== 'all') && (
                <span className="w-2 h-2 rounded-full bg-amber-600 animate-pulse"></span>
              )}
            </button>
          </div>

          {/* COLLAPSIBLE FILTER BAR */}
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
        {currentAgeMeta && (
          <div className="p-5 sm:p-6 rounded-3xl my-6 border border-indigo-100 bg-white shadow-xs transition-all flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4">
            <div className="flex items-center gap-3.5">
              {(() => {
                const badge = AGE_BANNER_ICONS[currentAgeMeta.id];
                const IconComp = badge ? badge.icon : Gift;
                const bgClass = badge ? badge.bg : 'bg-indigo-50 border-indigo-200';
                const textClass = badge ? badge.color : 'text-indigo-600';
                return (
                  <div className={`w-11 h-11 sm:w-12 sm:h-12 rounded-2xl ${bgClass} border flex items-center justify-center shadow-xs shrink-0`}>
                    <IconComp className={`w-5 h-5 sm:w-6 sm:h-6 ${textClass}`} />
                  </div>
                );
              })()}
              <div>
                <h2 className="text-base sm:text-lg font-black text-slate-900">{currentAgeMeta.label}</h2>
                <p className="text-xs sm:text-sm text-slate-500 leading-snug">{currentAgeMeta.tagline}</p>
              </div>
            </div>
            {currentAgeMeta.seoKeywords.length > 0 && (
              <div className="flex flex-wrap items-center gap-1.5 pt-2 lg:pt-0 border-t lg:border-t-0 border-slate-100 w-full lg:w-auto">
                <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider mr-1 shrink-0">
                  Ideas destacadas:
                </span>
                {currentAgeMeta.seoKeywords.map((kw, idx) => (
                  <span
                    key={idx}
                    className="px-2.5 py-1 rounded-xl text-xs font-semibold bg-slate-50 border border-slate-200 text-slate-700 shadow-2xs hover:border-indigo-300 transition-colors"
                  >
                    {kw}
                  </span>
                ))}
              </div>
            )}
          </div>
        )}

        {/* ACTIVE SEARCH BANNER IF SEARCHING */}
        {searchQuery.trim() !== '' && (
          <div className="mb-6 flex flex-wrap items-center justify-between gap-3 p-4 bg-indigo-50/80 border border-indigo-200 rounded-2xl shadow-xs">
            <div className="flex items-center gap-2.5 text-indigo-950 font-bold text-sm">
              <span className="flex h-2.5 w-2.5 rounded-full bg-emerald-500 animate-pulse"></span>
              <span>Resultados para la búsqueda: <mark className="bg-indigo-100 text-indigo-900 px-2 py-0.5 rounded font-black">&ldquo;{searchQuery}&rdquo;</mark></span>
            </div>
            <button
              onClick={() => setSearchQuery('')}
              className="text-xs bg-white text-indigo-700 px-3.5 py-1.5 rounded-xl border border-indigo-200 font-bold hover:bg-indigo-100 hover:text-indigo-900 transition-all shadow-xs cursor-pointer flex items-center gap-1.5"
            >
              <span>✕ Quitar búsqueda (ver todo)</span>
            </button>
          </div>
        )}

        {/* PRODUCTS GRID */}
        {filteredProducts.length > 0 ? (
          <>
            {/* TOP 3 PODIUM RANKING */}
            <TopPodium
              products={sortedFilteredProducts}
              filterLabel={
                selectedCategory !== 'all'
                  ? selectedCategory
                  : selectedAge !== 'all'
                  ? (currentAgeMeta?.label || selectedAge)
                  : 'Catálogo General'
              }
            />

            <section className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-2 sm:gap-2.5 lg:gap-3 mb-12">
              {sortedFilteredProducts.slice(0, visibleCount).map((product) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  currentTheme="classic"
                />
              ))}

              {/* LIVE AMAZON PRODUCTS LOADED INTO GRID */}
              {sortedLiveAmazonProducts.map((liveProd) => (
                <LiveAmazonProductCard
                  key={liveProd.asin}
                  product={liveProd}
                  categoryLabel={selectedCategory !== 'all' ? selectedCategory : 'Amazon España'}
                  badgeLabel="En Directo Amazon"
                />
              ))}

              {/* DISCOVERY / LOAD LIVE CARD IN SAME FORMAT */}
              <AmazonGridDiscoveryCard
                searchQuery={searchQuery}
                selectedAge={selectedAge}
                selectedCategory={selectedCategory}
                onLoadLiveToGrid={handleLoadLiveToGrid}
                isLoadingLive={isLoadingLive}
                hasLoadedLive={liveAmazonProducts.length > 0}
              />
            </section>

            {/* Botón Cargar Más Productos para aligerar el DOM y optimizar SEO */}
            {sortedFilteredProducts.length > visibleCount && (
              <div className="mb-12 flex flex-col items-center justify-center gap-2">
                <button
                  onClick={() => setVisibleCount((prev) => prev + 18)}
                  className="px-8 py-4 rounded-2xl bg-gradient-to-r from-indigo-600 to-indigo-700 hover:from-indigo-700 hover:to-indigo-800 text-white font-black text-sm shadow-md hover:shadow-lg hover:shadow-indigo-500/20 transition-all flex items-center gap-2.5 cursor-pointer hover:scale-102 active:scale-98"
                >
                  <RefreshCw className="w-4 h-4 text-amber-300" />
                  <span>Cargar más ideas de regalo (+18 productos)</span>
                </button>
                <span className="text-xs text-slate-500 font-medium">
                  Mostrando {Math.min(visibleCount, sortedFilteredProducts.length)} de {sortedFilteredProducts.length} ideas disponibles
                </span>
              </div>
            )}

            {/* Quick action bar to load more live products directly */}
            {(selectedCategory !== 'all' || selectedAge !== 'all' || searchQuery.trim() !== '' || liveAmazonProducts.length > 0) && (
              <div className="mb-12 flex flex-col items-center justify-center gap-2">
                <button
                  onClick={handleLoadLiveToGrid}
                  disabled={isLoadingLive}
                  className="px-7 py-4 rounded-2xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-slate-950 font-black text-sm shadow-md hover:shadow-lg hover:shadow-amber-500/25 transition-all flex items-center gap-2.5 cursor-pointer disabled:opacity-75 hover:scale-102 active:scale-98"
                >
                  {isLoadingLive ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin text-slate-950" />
                      <span>Conectando con Amazon en directo...</span>
                    </>
                  ) : (
                    <>
                      <ShoppingBag className="w-4 h-4 text-slate-950" />
                      <span>Ver más productos recomendados en directo (+8 opciones)</span>
                    </>
                  )}
                </button>
                <span className="text-[11px] text-slate-400 font-medium">
                  Precios, stock y valoraciones actualizadas en tiempo real desde Amazon.es
                </span>
              </div>
            )}

            {/* Universal Amazon Live Search Bar (Cookie & Global Search) */}
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
                {/* Live notice banner */}
                <div className="mb-6 p-4 sm:p-5 bg-gradient-to-r from-amber-50 to-orange-50 border border-amber-200 rounded-3xl flex flex-wrap items-center justify-between gap-3 shadow-xs">
                  <div className="flex items-center gap-3 text-amber-950 font-bold text-sm">
                    <span className="p-2 bg-amber-400/20 text-amber-700 rounded-xl">
                      <ShoppingBag className="w-5 h-5" />
                    </span>
                    <div>
                      <p className="font-extrabold text-slate-900">
                        Mostrando productos en directo de Amazon España para tu selección:
                      </p>
                      <p className="text-xs text-slate-600 font-normal">
                        Precios, fotos y disponibilidad al día obtenidos en tiempo real de Amazon.es
                      </p>
                    </div>
                  </div>
                  <button
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
                    Restablecer filtros
                  </button>
                </div>

                {/* Grid populated with live products in the user's preferred card format */}
                <section className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-2 sm:gap-2.5 lg:gap-3 mb-12">
                  {sortedLiveAmazonProducts.map((liveProd) => (
                    <LiveAmazonProductCard
                      key={liveProd.asin}
                      product={liveProd}
                      categoryLabel={selectedCategory !== 'all' ? selectedCategory : 'Amazon España'}
                      badgeLabel="En Directo Amazon"
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
                <Loader2 className="w-10 h-10 animate-spin text-amber-500" />
                <h3 className="text-lg font-bold text-slate-900">Buscando productos en directo en Amazon España...</h3>
                <p className="text-xs text-slate-500 max-w-md">
                  Estamos consultando en tiempo real las mejores ofertas y disponibilidad para tus filtros activos.
                </p>
              </div>
            ) : (
              <div className="py-12 mb-16">
                <div className="text-center py-10 px-4 rounded-3xl border border-dashed border-slate-300 mb-8 bg-white/60">
                  <Search className="w-12 h-12 mx-auto mb-3 text-slate-400" />
                  <h3 className="text-xl font-bold mb-2 text-slate-900">¿Buscas un producto específico en Amazon?</h3>
                  <p className="text-sm text-slate-600 mb-5 max-w-xl mx-auto">
                    No tenemos ese producto exacto en nuestro catálogo verificado local, pero puedes buscarlo directamente en <strong>Amazon España</strong> con un solo clic con las mejores ofertas y disponibilidad al momento.
                  </p>
                  <button
                    onClick={() => {
                      setSelectedAge('all');
                      setSelectedCategory('all');
                      setSelectedGender('all');
                      setSelectedPrice('all');
                      setSearchQuery('');
                    }}
                    className="px-5 py-2.5 rounded-xl bg-slate-200 text-slate-800 text-xs font-bold hover:bg-slate-300 transition-colors"
                  >
                    Limpiar filtros locales
                  </button>
                </div>

                <AmazonLiveSearchCard
                  currentTheme="classic"
                  initialQuery={searchQuery || 'ofertas regalos ninos y jovenes'}
                  selectedPrice={selectedPrice}
                />
              </div>
            )}
          </div>
        )}

        {/* SEO CONTENT SECTION */}
        <section className="rounded-3xl p-6 sm:p-10 mb-12 border border-slate-200 bg-white text-slate-800 shadow-xs">
          <h2 className="text-2xl sm:text-3xl font-black mb-4 tracking-tight text-slate-900">
            Guía de Compra Inteligente: ¿Cómo acertar con el regalo según la edad?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-xs sm:text-sm leading-relaxed text-slate-600">
            <div className="space-y-2">
              <h3 className="font-bold text-base flex items-center gap-2 text-indigo-600">
                <span>🧸</span> Recién Nacidos y 0 a 3 Años
              </h3>
              <p>
                Para los más pequeños, los regalos deben combinar <strong>seguridad certificada</strong>, materiales hipoalergénicos y practicidad para los padres. Las <strong>tartas de pañales personalizadas</strong> son el detalle por excelencia porque ofrecen más de 50 pañales de primera puesta organizados con estética de alta gama. Los juguetes de madera Montessori impulsan el agarre y la motricidad libre sin sobreestimular.
              </p>
            </div>
            <div className="space-y-2">
              <h3 className="font-bold text-base flex items-center gap-2 text-indigo-600">
                <span>🎨</span> Niños de 4 a 12 Años
              </h3>
              <p>
                En esta franja el juego simbólico y social cobra protagonismo. Los <strong>juegos de mesa familiares modernos</strong> como Catán Junior o Virus desarrollan la agilidad mental y reúnen a toda la familia alrededor de la mesa. Los sets de construcción tipo LEGO Creator y los circuitos Scalextric despiertan la emoción de la competición sana sin pantallas.
              </p>
            </div>
            <div className="space-y-2">
              <h3 className="font-bold text-base flex items-center gap-2 text-indigo-600">
                <span>🎧</span> Jóvenes y Adolescentes (13 a 18 Años)
              </h3>
              <p>
                Los adolescentes buscan reafirmar su personalidad propia. En lugar de regalos genéricos, triunfan los artículos con personalidad: desde videojuegos de <strong>PlayStation 5</strong> y periféricos de setup gaming hasta <strong>estilo personal y creativo</strong> con velas aromáticas WoodWick, diarios encuadernados en piel vintage y auriculares de alta fidelidad con cancelación de ruido.
              </p>
            </div>
          </div>
        </section>

        {/* SEO FAQ SECTION (with JSON-LD Schema) */}
        <SeoFaq currentTheme="classic" />

      </main>

      {/* Footer with Amazon Affiliate Compliance */}
      <Footer currentTheme="classic" />
    </div>
  );
}
