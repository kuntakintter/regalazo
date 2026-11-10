'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import ChristmasCountdown from '@/components/ChristmasCountdown';
import SeoFaq from '@/components/SeoFaq';
import {
  CHRISTMAS_TOYS,
  CHRISTMAS_CATEGORIES,
  CHRISTMAS_AGE_RANGES,
  CHRISTMAS_WHEELS_SUBFILTERS,
  ChristmasToy,
  buildAmazonRemoteCartUrl,
} from '@/data/cartaNavidadToys';
import { useActiveLocale } from '@/hooks/useActiveLocale';
import { getLocalizedStaticHubMeta } from '@/lib/i18nContent';
import { getHubLabels } from '@/lib/hubLabels';
import {
  Send,
  Check,
  Copy,
  Printer,
  ShoppingBag,
  Share2,
  X,
  Star,
  ShieldCheck,
  Search,
  ChevronRight,
  AlertCircle,
} from 'lucide-react';

interface HubViewProps {
  omitSchema?: boolean;
}

function CartaContent() {
  const {
    localeKey,
    localePath,
    ui,
    activeCurrency,
    amazonRegion,
    amazonTag,
    amazonSiteName,
    tTerm,
  } = useActiveLocale();

  const labels = getHubLabels(localeKey, activeCurrency);
  const niche = labels.carta;
  const hubMeta = getLocalizedStaticHubMeta(localeKey, 'carta-papa-noel', activeCurrency);

  const [childName, setChildName] = useState('');
  const [childAge, setChildAge] = useState('7');
  const [childCity, setChildCity] = useState('');
  const [behavior, setBehavior] = useState<string>('excelente');
  const [extraNote, setExtraNote] = useState('');
  const [selectedToys, setSelectedToys] = useState<ChristmasToy[]>([]);
  const [activeCategory, setActiveCategory] = useState('all');
  const [activeWheelSub, setActiveWheelSub] = useState('all');
  const [activeAge, setActiveAge] = useState('all');
  const [searchToyQuery, setSearchToyQuery] = useState('');
  const [visibleCount, setVisibleCount] = useState(24);
  const [isSending, setIsSending] = useState(false);
  const [sendStep, setSendStep] = useState(0);
  const [isDelivered, setIsDelivered] = useState(false);
  const [copiedLink, setCopiedLink] = useState(false);
  const [alertMessage, setAlertMessage] = useState<string | null>(null);
  const [failedImgIds, setFailedImgIds] = useState<Record<string, boolean>>({});

  useEffect(() => {
    setVisibleCount(24);
  }, [activeCategory, activeWheelSub, activeAge, searchToyQuery]);

  useEffect(() => {
    const sp = new URLSearchParams(window.location.search);
    const urlName = sp.get('n') || sp.get('nombre');
    const urlAge = sp.get('edad');
    const urlCity = sp.get('c') || sp.get('ciudad');
    const urlWishes = sp.get('w') || sp.get('deseos');

    try {
      if (urlName) {
        setChildName(decodeURIComponent(urlName));
      } else {
        const savedName = localStorage.getItem('ubr_carta_nombre');
        if (savedName) setChildName(savedName);
      }
      if (urlAge) setChildAge(urlAge);
      if (urlCity) setChildCity(decodeURIComponent(urlCity));

      if (urlWishes) {
        const wishIds = urlWishes.split(',');
        const found = CHRISTMAS_TOYS.filter((t) => wishIds.includes(t.id));
        if (found.length > 0) {
          setSelectedToys(found);
          setIsDelivered(true);
        }
      } else {
        const savedToys = localStorage.getItem('ubr_carta_juguetes');
        if (savedToys) {
          const parsed = JSON.parse(savedToys);
          const found = CHRISTMAS_TOYS.filter((t) => parsed.includes(t.id));
          if (found.length > 0) setSelectedToys(found);
        }
      }
    } catch {
      // ignore invalid localStorage
    }
  }, []);

  useEffect(() => {
    try {
      if (childName) localStorage.setItem('ubr_carta_nombre', childName);
    } catch {
      // ignore
    }
  }, [childName]);

  useEffect(() => {
    try {
      const ids = selectedToys.map((t) => t.id);
      localStorage.setItem('ubr_carta_juguetes', JSON.stringify(ids));
    } catch {
      // ignore
    }
  }, [selectedToys]);

  const showAlert = (msg: string) => {
    setAlertMessage(msg);
  };

  const toggleToy = (toy: ChristmasToy) => {
    setAlertMessage(null);
    if (selectedToys.some((t) => t.id === toy.id)) {
      setSelectedToys((prev) => prev.filter((t) => t.id !== toy.id));
    } else {
      if (selectedToys.length >= 6) {
        showAlert(niche.maxToysAlert);
        return;
      }
      setSelectedToys((prev) => [...prev, toy]);
    }
  };

  const removeToy = (id: string) => {
    setSelectedToys((prev) => prev.filter((t) => t.id !== id));
  };

  const handleSendLetter = () => {
    setAlertMessage(null);
    if (!childName.trim()) {
      showAlert(niche.missingNameAlert);
      return;
    }
    if (selectedToys.length === 0) {
      showAlert(niche.missingToysAlert);
      return;
    }

    setIsSending(true);
    setSendStep(1);
    setTimeout(() => setSendStep(2), 1800);
    setTimeout(() => {
      setSendStep(3);
      setIsDelivered(true);
      setIsSending(false);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }, 4200);
  };

  const getShareableUrl = () => {
    if (typeof window === 'undefined') return '';
    const base = window.location.origin + window.location.pathname;
    const ids = selectedToys.map((t) => t.id).join(',');
    const cityParam = childCity.trim() ? `&c=${encodeURIComponent(childCity.trim())}` : '';
    return `${base}?n=${encodeURIComponent(childName.trim())}&edad=${encodeURIComponent(childAge)}${cityParam}&w=${ids}`;
  };

  const handleCopyLink = () => {
    if (typeof navigator === 'undefined' || !navigator.clipboard) return;
    navigator.clipboard.writeText(getShareableUrl());
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2500);
  };

  const handleShareWhatsApp = () => {
    const name = childName.trim() || '...';
    const toysText = selectedToys.map((t, idx) => `${idx + 1}. ${t.shortTitle}`).join('\n');
    const url = getShareableUrl();
    const message = niche.whatsappLetterTemplate
      .replace('{name}', name)
      .replace('{toys}', toysText)
      .replace('{url}', url);
    window.open(`https://api.whatsapp.com/send?text=${encodeURIComponent(message)}`, '_blank');
  };

  const handleOpenAmazonCart = () => {
    const asins = selectedToys.map((t) => t.asin);
    const fallbackTitles = selectedToys.map((t) => t.shortTitle || t.title);
    const cartUrl = buildAmazonRemoteCartUrl(asins, amazonTag, fallbackTitles, amazonRegion);
    window.open(cartUrl, '_blank');
  };

  const filteredToys = CHRISTMAS_TOYS.filter((t) => {
    const matchCat = activeCategory === 'all' || t.category === activeCategory;
    const matchWheelSub =
      activeWheelSub === 'all' ||
      (t.category === 'sobre-ruedas' && t.wheelSubcategory === activeWheelSub);
    const matchAge =
      activeAge === 'all' ||
      (Array.isArray(t.ages) &&
        t.ages.includes(activeAge as '0-3' | '4-6' | '7-9' | '10-12' | '13+')) ||
      t.ageRange === activeAge ||
      t.ageRange === 'all';
    const query = searchToyQuery.trim().toLowerCase();
    const matchQuery =
      !query ||
      t.title.toLowerCase().includes(query) ||
      t.shortTitle.toLowerCase().includes(query) ||
      t.categoryLabel.toLowerCase().includes(query);
    return matchCat && matchWheelSub && matchAge && matchQuery;
  });

  const selectedBehaviorLabel =
    niche.behaviorOptions.find((o) => o.value === behavior)?.label ||
    niche.behaviorOptions[0]?.label ||
    '';

  const renderedIntro = niche.letterIntroTemplate
    .replace('{name}', childName.trim() || '...')
    .replace('{age}', childAge)
    .replace('{city}', childCity.trim() || '...')
    .replace('{behavior}', selectedBehaviorLabel);

  return (
    <div className="text-slate-100 pb-20 relative overflow-x-clip">
      {/* Falling Snow decorative effect */}
      <div
        className="pointer-events-none fixed inset-0 z-0 opacity-45 overflow-hidden print:hidden"
        aria-hidden="true"
      >
        <div className="absolute -top-10 left-[8%] w-2 h-2 bg-white rounded-full animate-[snowfall_9s_linear_infinite]" />
        <div className="absolute -top-10 left-[25%] w-2.5 h-2.5 bg-white rounded-full animate-[snowfall_11s_linear_infinite_1s]" />
        <div className="absolute -top-10 left-[55%] w-2 h-2 bg-white rounded-full animate-[snowfall_8s_linear_infinite_2s]" />
        <div className="absolute -top-10 left-[82%] w-2.5 h-2.5 bg-white rounded-full animate-[snowfall_10s_linear_infinite_0.5s]" />
      </div>

      <style jsx global>{`
        @keyframes snowfall {
          0% {
            transform: translateY(-10px) translateX(0);
            opacity: 0;
          }
          20% {
            opacity: 0.8;
          }
          80% {
            opacity: 0.8;
          }
          100% {
            transform: translateY(105vh) translateX(30px);
            opacity: 0;
          }
        }
        .ruled-paper {
          background-color: #fcf9f2;
          background-image: repeating-linear-gradient(
            transparent,
            transparent 37px,
            rgba(180, 83, 9, 0.14) 37px,
            rgba(180, 83, 9, 0.14) 38px
          );
        }
        .air-mail-envelope {
          background: repeating-linear-gradient(
            135deg,
            #ed0001 0px,
            #ed0001 16px,
            #fcf9f2 16px,
            #fcf9f2 26px,
            #018bb2 26px,
            #018bb2 42px,
            #fcf9f2 42px,
            #fcf9f2 52px
          );
        }
      `}</style>

      {/* Breadcrumb Navigation */}
      <nav
        aria-label="Breadcrumb"
        className="relative z-10 max-w-5xl mx-auto px-4 pt-4 pb-2 flex items-center gap-2 text-xs text-amber-200 print:hidden"
      >
        <Link href={localePath('/')} className="hover:text-white transition-colors py-1">
          {ui.breadcrumbHome}
        </Link>
        <ChevronRight className="w-3.5 h-3.5 text-amber-300/70" aria-hidden="true" />
        <span className="font-bold text-white">{hubMeta.breadcrumbLabel}</span>
      </nav>

      {/* Main Content Container */}
      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 pt-2 space-y-8">
        {/* HERO */}
        <header className="text-center space-y-2 print:hidden">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-red-600/35 border border-amber-400/50 text-amber-200 text-xs sm:text-sm font-bold shadow-lg">
            <span>{niche.mailboxBadge}</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-black tracking-tight text-white drop-shadow-md">
            {hubMeta.h1}
          </h1>
          <p className="text-xs sm:text-sm text-slate-200 max-w-lg mx-auto">{hubMeta.subtitle}</p>
          <div className="pt-2 flex justify-center min-h-[64px]">
            <ChristmasCountdown />
          </div>
        </header>

        {/* ACCESSIBLE INLINE VALIDATION ALERT */}
        {alertMessage && (
          <div
            role="alert"
            className="p-4 rounded-2xl bg-amber-400 text-slate-950 font-bold text-xs sm:text-sm shadow-xl border-2 border-white flex items-center justify-between gap-3 print:hidden"
          >
            <div className="flex items-center gap-2.5">
              <AlertCircle className="w-5 h-5 text-red-900 shrink-0" aria-hidden="true" />
              <span>{alertMessage}</span>
            </div>
            <button
              type="button"
              onClick={() => setAlertMessage(null)}
              aria-label={ui.navClose}
              className="p-1.5 rounded-lg hover:bg-amber-500 cursor-pointer shrink-0"
            >
              <X className="w-4 h-4" aria-hidden="true" />
            </button>
          </div>
        )}

        {/* DELIVERED LETTER STATE */}
        {isDelivered && (
          <div className="air-mail-envelope p-2.5 sm:p-3.5 rounded-3xl sm:rounded-4xl shadow-2xl">
            <section className="bg-linear-to-b from-amber-50 to-orange-50 text-slate-900 rounded-2xl sm:rounded-3xl p-6 sm:p-10 relative overflow-hidden">
              <div className="max-w-2xl mx-auto text-center space-y-5">
                <div
                  className="w-20 h-20 mx-auto rounded-full bg-linear-to-tr from-red-600 to-amber-600 text-white flex items-center justify-center text-4xl shadow-xl ring-4 ring-amber-300 print:hidden"
                  aria-hidden="true"
                >
                  🎅
                </div>

                <div>
                  <span className="inline-block px-3 py-1 bg-red-700 text-white text-xs font-black rounded-full uppercase tracking-wider mb-2">
                    {niche.letterHeading}
                  </span>
                  <h2 className="text-2xl sm:text-3xl font-black text-slate-900 font-serif">
                    {niche.letterSalutation} {childName}
                  </h2>
                </div>

                <div className="bg-white/95 rounded-2xl p-6 border border-amber-300 shadow-inner text-left text-sm sm:text-base text-slate-800 leading-relaxed space-y-3 font-serif">
                  <p>{renderedIntro}</p>
                  {extraNote.trim() && (
                    <div className="pt-2">
                      <p className="text-xs font-sans font-bold uppercase text-red-800">
                        {niche.letterExtraNoteHeading}
                      </p>
                      <p className="italic text-slate-800">{extraNote}</p>
                    </div>
                  )}
                  <p className="font-semibold text-red-900 pt-2">{niche.letterClosing}</p>
                  <p className="text-right font-black text-slate-900 pt-2">
                    {niche.letterSignedBy} {childName}
                  </p>
                </div>

                {/* Wishes list */}
                <div className="pt-2 text-left">
                  <h3 className="text-xs font-black uppercase tracking-wider text-slate-700 mb-2">
                    {niche.letterWishesHeading}
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {selectedToys.map((t, idx) => (
                      <div
                        key={t.id}
                        className="flex items-center justify-between gap-2 bg-white p-2.5 rounded-xl border border-amber-200 shadow-xs"
                      >
                        <div className="flex items-center gap-3 min-w-0">
                          <div className="relative w-12 h-12 rounded-lg overflow-hidden shrink-0 bg-slate-50 flex items-center justify-center">
                            {!failedImgIds[t.id] ? (
                              <Image
                                src={t.imageUrl}
                                alt={t.shortTitle}
                                fill
                                unoptimized
                                onError={() => setFailedImgIds((prev) => ({ ...prev, [t.id]: true }))}
                                className="object-contain p-1"
                                sizes="48px"
                              />
                            ) : (
                              <span className="text-xl" aria-hidden="true">🎁</span>
                            )}
                          </div>
                          <div className="min-w-0 flex-1">
                            <span className="text-[10px] font-bold text-red-700 block">
                              #{idx + 1}
                            </span>
                            <p className="text-xs font-bold text-slate-900 truncate">{t.shortTitle}</p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => setIsDelivered(false)}
                  className="text-xs font-bold text-slate-700 hover:text-slate-950 underline transition-colors pt-2 cursor-pointer print:hidden"
                >
                  {niche.newLetterBtn}
                </button>

                {/* Parent Actions */}
                <div className="mt-8 pt-6 border-t-2 border-dashed border-amber-300 text-left bg-linear-to-r from-amber-100/70 to-orange-100/70 p-4 sm:p-6 rounded-2xl print:hidden">
                  <div className="flex items-center gap-2 mb-3">
                    <ShieldCheck className="w-4 h-4 text-emerald-700 shrink-0" aria-hidden="true" />
                    <span className="text-xs font-black uppercase tracking-wider text-slate-800">
                      {niche.viewToyOnAmazon} · {amazonSiteName}
                    </span>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                    <button
                      type="button"
                      onClick={handleCopyLink}
                      className="py-2.5 px-3 rounded-xl bg-white hover:bg-slate-50 text-slate-900 font-bold text-xs border border-slate-300 shadow-xs flex items-center justify-center gap-2 transition-all cursor-pointer"
                    >
                      {copiedLink ? (
                        <Check className="w-4 h-4 text-emerald-700" aria-hidden="true" />
                      ) : (
                        <Copy className="w-4 h-4 text-slate-700" aria-hidden="true" />
                      )}
                      <span>{copiedLink ? niche.copiedLinkBtn : niche.copyLinkBtn}</span>
                    </button>

                    <button
                      type="button"
                      onClick={handleShareWhatsApp}
                      className="py-2.5 px-3 rounded-xl bg-[#075E54] hover:bg-[#128C7E] text-white font-bold text-xs shadow-xs flex items-center justify-center gap-2 transition-all cursor-pointer"
                    >
                      <Share2 className="w-4 h-4" aria-hidden="true" />
                      <span>{niche.shareWhatsAppBtn}</span>
                    </button>

                    <button
                      type="button"
                      onClick={handleOpenAmazonCart}
                      className="py-2.5 px-3 rounded-xl bg-amber-500 hover:bg-amber-600 text-slate-950 font-black text-xs shadow-xs flex items-center justify-center gap-2 transition-all cursor-pointer"
                    >
                      <ShoppingBag className="w-4 h-4" aria-hidden="true" />
                      <span>
                        {niche.viewToyOnAmazon} · {amazonSiteName}
                      </span>
                    </button>

                    <button
                      type="button"
                      onClick={() => window.print()}
                      className="py-2.5 px-3 rounded-xl bg-slate-800 hover:bg-slate-900 text-white font-bold text-xs shadow-xs flex items-center justify-center gap-2 transition-all cursor-pointer"
                    >
                      <Printer className="w-4 h-4" aria-hidden="true" />
                      <span>{niche.printBtn}</span>
                    </button>
                  </div>
                </div>
              </div>
            </section>
          </div>
        )}

        {/* EDIT MODE: LETTER + TOY CATALOG */}
        {!isDelivered && (
          <>
            {/* Mobile Sleigh */}
            <div className="xl:hidden flex justify-center -mb-6 relative z-20 pointer-events-none select-none">
              <img
                src="/images/trineo-navidad-animado.gif"
                alt={hubMeta.breadcrumbLabel}
                width={160}
                height={200}
                style={{ width: '160px', height: 'auto', display: 'block' }}
                className="drop-shadow-2xl"
              />
            </div>

            <div className="relative">
              {/* Desktop Sleigh */}
              <div className="hidden xl:block absolute left-[calc(100%+1rem)] 2xl:left-[calc(100%+2rem)] top-2 w-52 2xl:w-60 z-30 pointer-events-none select-none">
                <img
                  src="/images/trineo-navidad-animado.gif"
                  alt={hubMeta.breadcrumbLabel}
                  width={200}
                  height={250}
                  fetchPriority="high"
                  style={{ width: '100%', height: 'auto', display: 'block' }}
                  className="drop-shadow-[0_20px_35px_rgba(0,0,0,0.85)] filter brightness-105"
                />
              </div>

              {/* LETTER FORM PAPER */}
              <div className="air-mail-envelope p-2.5 sm:p-3.5 rounded-3xl sm:rounded-4xl shadow-2xl">
                <section className="ruled-paper text-slate-900 rounded-2xl sm:rounded-3xl p-5 sm:p-10 relative overflow-hidden">
                  <div className="border-l-2 border-red-300/80 pl-4 sm:pl-8 ml-1 sm:ml-4 space-y-6 max-w-2xl">
                    <div className="space-y-1">
                      <span className="text-[11px] font-bold uppercase tracking-widest text-red-800 block font-sans">
                        {niche.step2Title}
                      </span>
                      <h2 className="text-2xl sm:text-4xl font-black text-slate-900 font-serif tracking-tight">
                        {niche.letterSalutation}
                      </h2>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 font-sans">
                      <div>
                        <label
                          htmlFor="carta-child-name"
                          className="block text-xs font-bold text-slate-800 mb-1"
                        >
                          {niche.childNameLabel}
                        </label>
                        <input
                          id="carta-child-name"
                          type="text"
                          value={childName}
                          onChange={(e) => setChildName(e.target.value)}
                          placeholder={niche.childNamePlaceholder}
                          maxLength={35}
                          className="w-full px-3 py-2 rounded-xl border border-red-300 bg-white/90 text-sm font-bold text-slate-900 placeholder:text-slate-600 focus:border-red-700 outline-none"
                        />
                      </div>

                      <div>
                        <label
                          htmlFor="carta-child-age"
                          className="block text-xs font-bold text-slate-800 mb-1"
                        >
                          {niche.childAgeLabel}
                        </label>
                        <input
                          id="carta-child-age"
                          type="number"
                          min={1}
                          max={16}
                          value={childAge}
                          onChange={(e) => setChildAge(e.target.value)}
                          className="w-full px-3 py-2 rounded-xl border border-red-300 bg-white/90 text-sm font-bold text-slate-900 focus:border-red-700 outline-none"
                        />
                      </div>

                      <div>
                        <label
                          htmlFor="carta-child-city"
                          className="block text-xs font-bold text-slate-800 mb-1"
                        >
                          {niche.childCityLabel}
                        </label>
                        <input
                          id="carta-child-city"
                          type="text"
                          value={childCity}
                          onChange={(e) => setChildCity(e.target.value)}
                          placeholder={niche.childCityPlaceholder}
                          maxLength={40}
                          className="w-full px-3 py-2 rounded-xl border border-red-300 bg-white/90 text-sm font-bold text-slate-900 placeholder:text-slate-600 focus:border-red-700 outline-none"
                        />
                      </div>
                    </div>

                    <div className="font-sans">
                      <label
                        htmlFor="carta-behavior"
                        className="block text-xs font-bold text-slate-800 mb-1"
                      >
                        {niche.behaviorLabel}
                      </label>
                      <select
                        id="carta-behavior"
                        value={behavior}
                        onChange={(e) => setBehavior(e.target.value)}
                        className="w-full px-3 py-2.5 rounded-xl border border-red-300 bg-white/90 text-sm font-bold text-slate-900 focus:border-red-700 outline-none cursor-pointer"
                      >
                        {niche.behaviorOptions.map((opt) => (
                          <option key={opt.value} value={opt.value}>
                            {opt.label}
                          </option>
                        ))}
                      </select>
                    </div>

                    {/* Selected Wishes Zone */}
                    <div className="bg-amber-100/50 rounded-2xl p-4 sm:p-5 border-2 border-dashed border-amber-500/70 space-y-3 font-sans">
                      <div className="flex items-center justify-between gap-2">
                        <span className="text-xs font-black uppercase tracking-wider text-red-900">
                          {niche.selectedCounterTemplate.replace(
                            '{count}',
                            String(selectedToys.length)
                          )}
                        </span>
                        {selectedToys.length > 0 && (
                          <button
                            type="button"
                            onClick={() => setSelectedToys([])}
                            className="text-[11px] text-red-800 hover:text-red-950 font-bold underline cursor-pointer"
                          >
                            {ui.clearFilters}
                          </button>
                        )}
                      </div>

                      {selectedToys.length === 0 ? (
                        <p className="py-5 px-4 text-center rounded-xl bg-white/80 border border-amber-300/70 text-slate-700 text-xs sm:text-sm">
                          {niche.step1Subtitle}
                        </p>
                      ) : (
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                          {selectedToys.map((t, idx) => (
                            <div
                              key={t.id}
                              className="bg-white p-2.5 rounded-xl border border-amber-300 shadow-md flex items-center justify-between gap-2.5"
                            >
                              <div className="flex items-center gap-2.5 min-w-0">
                                <div className="relative w-12 h-12 rounded-lg overflow-hidden shrink-0 bg-slate-50 border border-slate-100 flex items-center justify-center">
                                  {!failedImgIds[t.id] ? (
                                    <Image
                                      src={t.imageUrl}
                                      alt={t.shortTitle}
                                      fill
                                      unoptimized
                                      onError={() =>
                                        setFailedImgIds((prev) => ({ ...prev, [t.id]: true }))
                                      }
                                      className="object-contain p-1"
                                      sizes="48px"
                                    />
                                  ) : (
                                    <span className="text-xl" aria-hidden="true">🎁</span>
                                  )}
                                </div>
                                <div className="min-w-0 flex-1">
                                  <span className="text-[10px] font-black text-red-700 uppercase tracking-wider block">
                                    #{idx + 1}
                                  </span>
                                  <span className="text-xs font-bold text-slate-900 truncate block">
                                    {t.shortTitle}
                                  </span>
                                </div>
                              </div>

                              <button
                                type="button"
                                onClick={() => removeToy(t.id)}
                                aria-label={`${ui.removeFromVote} ${t.shortTitle}`}
                                className="min-w-7 min-h-7 flex items-center justify-center p-1.5 text-slate-700 hover:text-red-800 rounded-lg cursor-pointer shrink-0"
                              >
                                <X className="w-4 h-4" aria-hidden="true" />
                              </button>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>

                    <div className="font-sans">
                      <label
                        htmlFor="carta-extra-wishes"
                        className="block text-xs font-bold text-slate-800 mb-1"
                      >
                        {niche.wishesLabel}
                      </label>
                      <textarea
                        id="carta-extra-wishes"
                        rows={2}
                        value={extraNote}
                        onChange={(e) => setExtraNote(e.target.value)}
                        placeholder={niche.wishesPlaceholder}
                        maxLength={250}
                        className="w-full px-3 py-2 rounded-xl border border-red-300 bg-white/90 text-xs sm:text-sm text-slate-900 placeholder:text-slate-600 focus:border-red-700 outline-none"
                      />
                    </div>

                    {/* North Pole Mailbox Button */}
                    <div className="pt-2 text-center font-sans">
                      <div className="p-3 bg-gradient-to-b from-[#b31b2c] to-[#7f111e] rounded-2xl shadow-xl border-2 border-amber-300">
                        <button
                          type="button"
                          onClick={handleSendLetter}
                          className={`w-full py-4 px-6 rounded-xl font-black text-base sm:text-lg shadow-lg transition-all flex items-center justify-center gap-3 cursor-pointer ${
                            selectedToys.length > 0 && childName.trim()
                              ? 'bg-gradient-to-r from-amber-400 via-yellow-300 to-amber-500 hover:from-amber-300 hover:to-amber-400 text-slate-950 ring-2 ring-white/50'
                              : 'bg-amber-200 text-slate-900 hover:bg-amber-300'
                          }`}
                        >
                          <span className="text-2xl" aria-hidden="true">📮</span>
                          <span>{niche.generateBtn}</span>
                          <Send className="w-5 h-5 ml-1" aria-hidden="true" />
                        </button>
                      </div>
                    </div>
                  </div>
                </section>
              </div>
            </div>

            {/* HOLIDAY TOY MAGAZINE */}
            <section className="space-y-4 pt-4">
              <div className="text-center sm:text-left space-y-1">
                <h2 className="text-2xl sm:text-3xl font-black text-white">{niche.step1Title}</h2>
                <p className="text-xs sm:text-sm text-slate-200">{niche.step1Subtitle}</p>
              </div>

              <div className="bg-gradient-to-b from-slate-900/95 via-red-950/30 to-slate-900/95 rounded-3xl p-5 sm:p-7 border-2 border-amber-400/40 shadow-2xl space-y-5">
                {/* Age Filter */}
                <div className="space-y-2.5">
                  <span className="text-xs sm:text-sm font-black uppercase text-amber-300 tracking-wider block">
                    {niche.ageSelectLabel}
                  </span>
                  <div className="flex flex-wrap items-center gap-2">
                    {CHRISTMAS_AGE_RANGES.map((age) => {
                      const isAgeActive = activeAge === age.id;
                      return (
                        <button
                          key={age.id}
                          type="button"
                          onClick={() => setActiveAge(age.id)}
                          className={`px-3.5 py-2 rounded-2xl text-xs sm:text-sm font-bold transition-all cursor-pointer ${
                            isAgeActive
                              ? 'bg-gradient-to-r from-emerald-500 to-teal-400 text-slate-950 shadow-lg border-2 border-white scale-105 font-black'
                              : 'bg-white/10 hover:bg-white/20 text-slate-100 border-2 border-white/15'
                          }`}
                        >
                          {tTerm(age.label)}
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Toy Categories */}
                <div className="pt-3 border-t border-white/10 space-y-3">
                  <div className="flex flex-wrap items-center gap-2">
                    {CHRISTMAS_CATEGORIES.map((cat) => {
                      const isCatActive = activeCategory === cat.id;
                      const count = CHRISTMAS_TOYS.filter(
                        (t) => cat.id === 'all' || t.category === cat.id
                      ).length;
                      return (
                        <button
                          key={cat.id}
                          type="button"
                          onClick={() => {
                            setActiveCategory(cat.id);
                            if (cat.id !== 'sobre-ruedas') setActiveWheelSub('all');
                          }}
                          className={`px-3.5 py-2 rounded-2xl text-xs sm:text-sm transition-all cursor-pointer flex items-center gap-2 ${
                            isCatActive
                              ? 'bg-gradient-to-r from-amber-400 via-amber-300 to-yellow-400 text-slate-950 font-black shadow-lg border-2 border-white scale-105'
                              : 'bg-white/10 hover:bg-white/20 text-slate-100 border-2 border-white/15 font-bold'
                          }`}
                        >
                          <span>{tTerm(cat.label)}</span>
                          <span
                            className={`text-[10px] px-2 py-0.5 rounded-full font-black ${
                              isCatActive
                                ? 'bg-slate-950/20 text-slate-950'
                                : 'bg-white/20 text-white'
                            }`}
                          >
                            {count}
                          </span>
                        </button>
                      );
                    })}
                  </div>

                  {/* Ride-On Vehicles Subfilter */}
                  <div className="p-3.5 sm:p-4 rounded-2xl border-2 bg-white/5 border-amber-400/30 space-y-2.5">
                    <span className="text-xs font-black uppercase text-amber-300 tracking-wider block">
                      {niche.wheelSubfilterTitle}
                    </span>
                    <div className="flex flex-wrap items-center gap-2">
                      {CHRISTMAS_WHEELS_SUBFILTERS.map((sub) => {
                        const isSubActive =
                          activeCategory === 'sobre-ruedas' && activeWheelSub === sub.id;
                        const subCount = CHRISTMAS_TOYS.filter(
                          (t) =>
                            t.category === 'sobre-ruedas' &&
                            (sub.id === 'all' || t.wheelSubcategory === sub.id)
                        ).length;
                        return (
                          <button
                            key={sub.id}
                            type="button"
                            onClick={() => {
                              setActiveCategory('sobre-ruedas');
                              setActiveWheelSub(sub.id);
                            }}
                            className={`px-3 py-1.5 rounded-xl text-xs transition-all cursor-pointer flex items-center gap-1.5 ${
                              isSubActive
                                ? 'bg-amber-400 text-slate-950 font-black shadow-md border-2 border-white scale-105'
                                : 'bg-slate-900/80 hover:bg-slate-800 text-amber-100 border border-amber-400/40 font-bold'
                            }`}
                          >
                            <span>{tTerm(sub.label)}</span>
                            <span
                              className={`text-[10px] px-1.5 py-0.5 rounded-full font-black ${
                                isSubActive
                                  ? 'bg-slate-950/20 text-slate-950'
                                  : 'bg-amber-400/20 text-amber-200'
                              }`}
                            >
                              {subCount}
                            </span>
                          </button>
                        );
                      })}
                    </div>

                    <div className="pt-2 border-t border-white/10 flex items-start gap-2 text-[11px] text-amber-100">
                      <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" aria-hidden="true" />
                      <span>
                        <strong>{niche.safetyBannerTitle}:</strong> {niche.safetyBannerDesc}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Search Input */}
                <div className="pt-3 border-t border-white/10 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
                  <div className="relative flex-1 max-w-md">
                    <Search
                      className="w-4 h-4 text-amber-300 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none"
                      aria-hidden="true"
                    />
                    <input
                      type="text"
                      value={searchToyQuery}
                      onChange={(e) => setSearchToyQuery(e.target.value)}
                      aria-label={niche.searchPlaceholder}
                      placeholder={niche.searchPlaceholder}
                      className="w-full pl-10 pr-9 py-2.5 rounded-2xl bg-white/10 border-2 border-white/15 focus:border-amber-400 focus:bg-white/15 outline-none text-xs sm:text-sm text-white placeholder:text-slate-300"
                    />
                    {searchToyQuery && (
                      <button
                        type="button"
                        onClick={() => setSearchToyQuery('')}
                        aria-label={ui.headerClearSearch}
                        className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-200 hover:text-white min-w-7 min-h-7 flex items-center justify-center p-1 cursor-pointer"
                      >
                        <X className="w-3.5 h-3.5" aria-hidden="true" />
                      </button>
                    )}
                  </div>
                  {(activeCategory !== 'all' ||
                    activeWheelSub !== 'all' ||
                    activeAge !== 'all' ||
                    searchToyQuery) && (
                    <button
                      type="button"
                      onClick={() => {
                        setActiveCategory('all');
                        setActiveWheelSub('all');
                        setActiveAge('all');
                        setSearchToyQuery('');
                      }}
                      className="px-3.5 py-2 text-xs font-bold text-amber-300 hover:text-amber-200 underline cursor-pointer"
                    >
                      {niche.resetToysBtn}
                    </button>
                  )}
                </div>
              </div>

              {/* Empty Filter State */}
              {filteredToys.length === 0 && (
                <div className="py-12 text-center bg-white/5 rounded-2xl border border-white/10 p-6 space-y-3">
                  <p className="text-sm font-bold text-white">{niche.emptyToysTitle}</p>
                  <button
                    type="button"
                    onClick={() => {
                      setActiveCategory('all');
                      setActiveWheelSub('all');
                      setActiveAge('all');
                      setSearchToyQuery('');
                    }}
                    className="px-4 py-2 rounded-xl bg-amber-400 text-slate-950 font-black text-xs hover:bg-amber-300 transition-colors cursor-pointer"
                  >
                    {niche.resetToysBtn}
                  </button>
                </div>
              )}

              {/* Toys Grid */}
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4">
                {filteredToys.slice(0, visibleCount).map((toy) => {
                  const isSelected = selectedToys.some((t) => t.id === toy.id);
                  const limitReached = !isSelected && selectedToys.length >= 6;
                  return (
                    <button
                      key={toy.id}
                      type="button"
                      onClick={() => toggleToy(toy)}
                      aria-pressed={isSelected}
                      title={limitReached ? niche.maxReachedLabel : undefined}
                      className={`bg-white rounded-2xl p-3 sm:p-4 border-2 transition-all flex flex-col justify-between text-left cursor-pointer group text-slate-900 relative ${
                        isSelected
                          ? 'border-emerald-600 ring-4 ring-emerald-400/30 shadow-xl scale-[1.02]'
                          : 'border-slate-200 hover:border-amber-400 shadow-md hover:shadow-xl'
                      }`}
                    >
                      {toy.badge && (
                        <span className="absolute top-2 left-2 z-10 px-2 py-0.5 rounded-md bg-amber-400 text-slate-950 font-black text-[9px] uppercase tracking-wider shadow-xs">
                          {toy.badge}
                        </span>
                      )}

                      <span className="relative aspect-square w-full rounded-xl overflow-hidden bg-slate-50 mb-3 flex items-center justify-center">
                        {!failedImgIds[toy.id] ? (
                          <Image
                            src={toy.imageUrl}
                            alt={toy.shortTitle}
                            fill
                            unoptimized
                            onError={() => setFailedImgIds((prev) => ({ ...prev, [toy.id]: true }))}
                            className="object-contain p-2"
                            sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
                          />
                        ) : (
                          <span className="flex flex-col items-center justify-center p-3 text-center text-slate-600">
                            <span className="text-3xl mb-1" aria-hidden="true">🎁</span>
                            <span className="text-[11px] font-bold text-slate-700 line-clamp-2">
                              {toy.shortTitle}
                            </span>
                          </span>
                        )}
                      </span>

                      <span className="block space-y-1 mb-3 w-full">
                        <span className="text-[10px] font-bold text-slate-600 uppercase block tracking-wider">
                          {tTerm(toy.categoryLabel)}
                        </span>
                        <span className="block text-xs sm:text-sm font-black text-slate-900 leading-snug line-clamp-2">
                          {toy.shortTitle}
                        </span>
                      </span>

                      <span
                        className={`w-full py-2 px-2.5 rounded-xl text-xs font-black transition-all flex items-center justify-center gap-1.5 ${
                          isSelected
                            ? 'bg-emerald-700 text-white shadow-xs'
                            : 'bg-amber-400 group-hover:bg-amber-500 text-slate-950 shadow-xs'
                        }`}
                      >
                        {isSelected ? (
                          <>
                            <Check className="w-3.5 h-3.5" aria-hidden="true" />
                            <span>{niche.addedToyBtn}</span>
                          </>
                        ) : (
                          <>
                            <Star className="w-3.5 h-3.5 fill-current" aria-hidden="true" />
                            <span>{niche.addToyBtn}</span>
                            {limitReached && (
                              <span className="sr-only"> — {niche.maxReachedLabel}</span>
                            )}
                          </>
                        )}
                      </span>
                    </button>
                  );
                })}
              </div>

              {visibleCount < filteredToys.length && (
                <div className="text-center pt-6 space-y-2">
                  <button
                    type="button"
                    onClick={() => setVisibleCount((prev) => prev + 24)}
                    className="py-3.5 px-8 rounded-2xl bg-amber-400 hover:bg-amber-300 text-slate-950 font-black text-sm shadow-xl hover:scale-105 transition-all cursor-pointer ring-4 ring-amber-300/30"
                  >
                    + {Math.min(24, filteredToys.length - visibleCount)} {labels.common.ideasUnit}
                  </button>
                </div>
              )}
            </section>
          </>
        )}

        {/* EDITORIAL GUIDE & FAQS */}
        <section className="pt-8 border-t border-white/15 space-y-6 text-slate-200 print:hidden">
          <h2 className="text-xl sm:text-2xl font-black text-white font-serif text-center">
            {niche.guideTitle}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs sm:text-sm">
            {niche.guideCards.map((card, idx) => (
              <div
                key={idx}
                className="bg-white/10 rounded-2xl p-4 sm:p-5 border border-white/15 space-y-2"
              >
                <h3 className="font-bold text-amber-300 flex items-center gap-2 text-sm sm:text-base">
                  {card.icon && <span aria-hidden="true">{card.icon}</span>}
                  <span>{card.title}</span>
                </h3>
                <p className="text-slate-200 leading-relaxed">{card.body}</p>
              </div>
            ))}
          </div>
        </section>
      </div>

      {/* Sending modal overlay */}
      {isSending && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={niche.generateBtn}
          className="fixed inset-0 z-50 bg-slate-950/95 backdrop-blur-md flex items-center justify-center p-4"
        >
          <div className="max-w-md w-full bg-gradient-to-b from-red-900 via-rose-950 to-slate-950 text-white rounded-3xl p-8 border-4 border-amber-400 text-center shadow-2xl space-y-6">
            <div className="relative w-32 h-32 mx-auto flex items-center justify-center">
              <div className="text-7xl animate-bounce select-none" aria-hidden="true">
                {sendStep === 1 ? '📜' : sendStep === 2 ? '✉️' : '🎅'}
              </div>
            </div>
            <h3 className="text-xl font-black text-amber-300 font-serif">{niche.letterHeading}</h3>
            <div className="w-full h-3 bg-white/20 rounded-full overflow-hidden p-0.5">
              <div
                className="h-full bg-gradient-to-r from-amber-400 to-emerald-400 rounded-full transition-all duration-700"
                style={{
                  width: sendStep === 1 ? '35%' : sendStep === 2 ? '75%' : '100%',
                }}
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default function CartaPapaNoelView({ omitSchema = false }: HubViewProps) {
  const {
    localeKey,
    localePath,
    ui,
    langCode,
    activeCurrency,
    isRtl,
  } = useActiveLocale();

  const labels = getHubLabels(localeKey, activeCurrency);
  const niche = labels.carta;
  const hubMeta = getLocalizedStaticHubMeta(localeKey, 'carta-papa-noel', activeCurrency);

  const pageUrl = `https://www.unbuenregalo.es${localePath('/carta-papa-noel')}`;
  const homeUrl =
    localeKey === 'es'
      ? 'https://www.unbuenregalo.es'
      : `https://www.unbuenregalo.es${localePath('/')}`;

  const webAppSchema = {
    '@context': 'https://schema.org',
    '@type': 'WebApplication',
    name: hubMeta.h1,
    url: pageUrl,
    applicationCategory: 'EntertainmentApplication',
    operatingSystem: 'All',
    inLanguage: langCode,
    description: hubMeta.description,
    offers: {
      '@type': 'Offer',
      price: '0',
      priceCurrency: activeCurrency,
    },
  };

  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: ui.breadcrumbHome,
        item: homeUrl,
      },
      {
        '@type': 'ListItem',
        position: 2,
        name: hubMeta.breadcrumbLabel,
        item: pageUrl,
      },
    ],
  };

  return (
    <div
      dir={isRtl ? 'rtl' : 'ltr'}
      className="min-h-screen flex flex-col bg-linear-to-b from-[#2d0a0a] via-[#0f172a] to-[#062419]"
    >
      {!omitSchema && (
        <>
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(webAppSchema) }}
          />
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
          />
        </>
      )}

      <div className="print:hidden">
        <Header currentTheme="classic" />
      </div>

      <main className="flex-1">
        <CartaContent />

        <div className="max-w-4xl mx-auto px-4 sm:px-6 pb-8 print:hidden">
          <SeoFaq
            localeKey={localeKey}
            hubSlug="carta-papa-noel"
            customFaqs={niche.faqs}
            omitSchema={omitSchema}
          />
        </div>
      </main>

      <div className="print:hidden">
        <Footer currentTheme="classic" />
      </div>
    </div>
  );
}
