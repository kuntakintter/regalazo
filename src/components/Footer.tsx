'use client';

import React from 'react';
import Link from 'next/link';
import { ShieldCheck, Heart } from 'lucide-react';
import BrandLogo from '@/components/BrandLogo';
import LanguageSelector from '@/components/LanguageSelector';
import SocialShareWidget from '@/components/SocialShareWidget';
import FooterDirectory from '@/components/FooterDirectory';
import { AMAZON_AFFILIATE_TAG_ES, AMAZON_AFFILIATE_TAG_INTL } from '@/lib/amazon';
import { getHubStrings } from '@/lib/i18nContent';
import { useActiveLocale } from '@/hooks/useActiveLocale';

interface FooterProps {
  currentTheme: string;
}

const FEATURED_FILTER_LINKS = [
  { slug: 'regalos-para-el', icon: '👨', termKey: 'Regalos para Él' },
  { slug: 'regalos-para-ella', icon: '👩', termKey: 'Regalos para Ella' },
  { slug: 'regalos-menos-15-euros', icon: '🏷️', termKey: 'Regalos Menos de 15 €' },
  { slug: 'regalos-de-15-a-30-euros', icon: '🎁', termKey: 'Regalos de 15 € a 30 €' },
  { slug: 'figuras-one-piece', icon: '🏴‍☠️', termKey: 'One Piece' },
  { slug: 'minimotos-y-motos-electricas', icon: '🏍️', termKey: 'Minimotos y Motos Eléctricas' },
  { slug: 'lego-y-construccion', icon: '🧱', termKey: 'LEGO y Construcción' },
  { slug: 'cartas-y-sobres-pokemon', icon: '⚡', termKey: 'Cartas y Sobres Pokémon' },
  { slug: 'figuras-de-coleccion-y-cine', icon: '🎎', termKey: 'Figuras de Colección y Cine' },
];

const AGE_STAGE_LINKS = [
  { slug: 'bebes-0-a-12-meses', termKey: 'Bebés (0-12 meses)' },
  { slug: 'ninos-1-a-3-anos', termKey: 'Niños (1-3 años)' },
  { slug: 'ninos-4-a-6-anos', termKey: 'Niños (4-6 años)' },
  { slug: 'ninos-7-a-9-anos', termKey: 'Niños (7-9 años)' },
  { slug: 'ninos-10-a-12-anos', termKey: 'Preadolescentes (10-12 años)' },
  { slug: 'jovenes-13-a-15-anos', termKey: 'Adolescentes (13-15 años)' },
  { slug: 'jovenes-16-a-18-anos', termKey: 'Jóvenes (16-18 años)' },
  { slug: 'adultos-mas-de-18-anos', termKey: 'Adultos (+18 años)' },
];

export default function Footer({ currentTheme }: FooterProps) {
  const { localeKey, localePath, tTerm, ui, amazonRegion, amazonSiteName, isRtl } = useActiveLocale();
  const isDark = currentTheme === 'emo' || currentTheme === 'gamer';
  const activeTag = amazonRegion === 'es' ? AMAZON_AFFILIATE_TAG_ES : AMAZON_AFFILIATE_TAG_INTL;

  const hubLabel = (slug: string) => getHubStrings(localeKey, slug).breadcrumbLabel;

  return (
    <footer
      dir={isRtl ? 'rtl' : 'ltr'}
      className={`border-t transition-colors pt-12 pb-10 ${
        currentTheme === 'emo'
          ? 'bg-neutral-950 border-neutral-800 text-neutral-200'
          : currentTheme === 'gamer'
          ? 'bg-slate-950 border-purple-900/60 text-slate-200'
          : currentTheme === 'baby'
          ? 'bg-rose-50/60 border-rose-200 text-rose-950'
          : 'bg-slate-50 border-slate-200 text-slate-700'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Amazon Affiliate Disclosure Callout */}
        <div
          className={`p-4 rounded-2xl border mb-10 text-xs leading-relaxed flex items-start gap-3 shadow-xs ${
            isDark
              ? 'bg-slate-900 border-slate-700 text-slate-200'
              : 'bg-white border-slate-200 text-slate-700'
          }`}
        >
          <ShieldCheck className="w-5 h-5 text-amber-500 shrink-0 mt-0.5" />
          <div>
            <p className={`font-semibold mb-1 ${isDark ? 'text-white' : 'text-slate-900'}`}>
              {ui.footerDisclosureTitle} · {amazonSiteName} ({activeTag})
            </p>
            <p>{ui.footerDisclosureText}</p>
          </div>
        </div>

        {/* 4 Columns Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 mb-12">
          {/* Col 1: Brand */}
          <div className="space-y-3.5">
            <BrandLogo size="compact" showSubtitle={false} variant={isDark ? 'light' : 'dark'} />
            <p
              className={`text-[13px] font-medium leading-relaxed tracking-[-0.01em] ${
                isDark ? 'text-slate-300' : 'text-slate-600'
              }`}
            >
              {ui.footerTagline}
            </p>
            <div
              className={`inline-flex items-start gap-2 px-3 py-2 rounded-xl border text-[11.5px] font-semibold leading-snug ${
                isDark
                  ? 'bg-rose-950/30 border-rose-800/50 text-rose-200'
                  : 'bg-rose-50/80 border-rose-200/80 text-rose-900'
              }`}
            >
              <Heart className="w-3.5 h-3.5 text-rose-500 shrink-0 fill-rose-500 mt-0.5" aria-hidden="true" />
              <span>{ui.footerLoveNote}</span>
            </div>
          </div>

          {/* Col 2: Occasions & Recipients */}
          <div>
            <span className={`text-xs font-bold uppercase tracking-wider mb-3 block ${isDark ? 'text-indigo-300' : 'text-indigo-700'}`}>
              {ui.footerColOccasions}
            </span>
            <ul className={`space-y-1.5 text-xs ${isDark ? 'text-slate-200' : 'text-slate-700'}`}>
              <li><Link href={localePath('/reacondicionados')} className={`inline-block py-0.5 hover:underline font-black ${isDark ? 'text-emerald-300' : 'text-emerald-800'}`}>♻️ {hubLabel('reacondicionados')}</Link></li>
              <li><Link href={localePath('/black-friday')} className={`inline-block py-0.5 hover:underline font-black ${isDark ? 'text-amber-300' : 'text-slate-950'}`}>% {hubLabel('black-friday')}</Link></li>
              <li><Link href={localePath('/que-regalar-a-mi-novio')} className={`inline-block py-0.5 hover:underline font-bold ${isDark ? 'text-indigo-300' : 'text-indigo-700'}`}>❤️ {hubLabel('que-regalar-a-mi-novio')}</Link></li>
              <li><Link href={localePath('/que-regalar-a-mi-novia')} className={`inline-block py-0.5 hover:underline font-bold ${isDark ? 'text-pink-300' : 'text-pink-700'}`}>💕 {hubLabel('que-regalar-a-mi-novia')}</Link></li>
              <li><Link href={localePath('/que-regalar-a-un-hombre')} className={`inline-block py-0.5 hover:underline font-bold ${isDark ? 'text-indigo-300' : 'text-indigo-700'}`}>👨 {hubLabel('que-regalar-a-un-hombre')}</Link></li>
              <li><Link href={localePath('/que-regalar-a-una-mujer')} className={`inline-block py-0.5 hover:underline font-bold ${isDark ? 'text-pink-300' : 'text-pink-700'}`}>👩 {hubLabel('que-regalar-a-una-mujer')}</Link></li>
              <li><Link href={localePath('/regalos-para-los-que-tienen-de-todo')} className={`inline-block py-0.5 hover:underline font-bold ${isDark ? 'text-purple-300' : 'text-purple-700'}`}>✨ {hubLabel('regalos-para-los-que-tienen-de-todo')}</Link></li>
              <li><Link href={localePath('/regalos-menos-20-euros')} className={`inline-block py-0.5 hover:underline font-bold ${isDark ? 'text-emerald-300' : 'text-emerald-800'}`}>🏷️ {hubLabel('regalos-menos-20-euros')}</Link></li>
              <li><Link href={localePath('/carta-papa-noel')} className={`inline-block py-0.5 hover:underline font-bold ${isDark ? 'text-amber-300' : 'text-amber-800'}`}>🎅 {hubLabel('carta-papa-noel')}</Link></li>
              <li><Link href={localePath('/navidad')} className={`inline-block py-0.5 hover:underline font-bold ${isDark ? 'text-emerald-300' : 'text-emerald-800'}`}>🎄 {hubLabel('navidad')}</Link></li>
              <li><Link href={localePath('/votar')} className={`inline-block py-0.5 hover:underline font-bold ${isDark ? 'text-purple-300' : 'text-purple-700'}`}>🗳️ {hubLabel('votar')}</Link></li>
              <li><Link href={localePath('/fiesta-revelacion-genero')} className="inline-block py-0.5 hover:underline">🎈 {tTerm('Fiesta Revelación de Género')}</Link></li>
              <li><Link href={localePath('/halloween')} className="inline-block py-0.5 hover:underline">🎃 {hubLabel('halloween')}</Link></li>
              <li><Link href={localePath('/regalos-gta-6')} className={`inline-block py-0.5 hover:underline font-bold ${isDark ? 'text-pink-300' : 'text-pink-700'}`}>🌴 {hubLabel('regalos-gta-6')}</Link></li>
            </ul>
          </div>

          {/* Col 3: Passions & Popular Filters */}
          <div>
            <span className={`text-xs font-bold uppercase tracking-wider mb-3 block ${isDark ? 'text-indigo-300' : 'text-indigo-700'}`}>
              {ui.footerColPassions}
            </span>
            <ul className={`space-y-1.5 text-xs ${isDark ? 'text-slate-200' : 'text-slate-700'}`}>
              <li><Link href={localePath('/motoristas')} className="inline-block py-0.5 hover:underline">🏍️ {hubLabel('motoristas')}</Link></li>
              <li><Link href={localePath('/gaming')} className="inline-block py-0.5 hover:underline">🎮 {hubLabel('gaming')}</Link></li>
              <li><Link href={localePath('/amantes-del-cafe')} className="inline-block py-0.5 hover:underline">☕ {hubLabel('amantes-del-cafe')}</Link></li>
              <li><Link href={localePath('/mascotas')} className="inline-block py-0.5 hover:underline">🐾 {hubLabel('mascotas')}</Link></li>
              <li><Link href={localePath('/automovil')} className="inline-block py-0.5 hover:underline">🚗 {hubLabel('automovil')}</Link></li>
              <li><Link href={localePath('/ciclismo')} className="inline-block py-0.5 hover:underline">🚴 {hubLabel('ciclismo')}</Link></li>
              <li className={`pt-2 font-bold text-[11px] uppercase tracking-wider ${isDark ? 'text-amber-300' : 'text-indigo-700'}`}>
                {ui.footerColFilters}
              </li>
              {FEATURED_FILTER_LINKS.map((flt) => (
                <li key={flt.slug}>
                  <Link href={localePath(`/${flt.slug}`)} className="inline-block py-0.5 hover:underline">
                    {flt.icon} {tTerm(flt.termKey)}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 4: Gifts by Age */}
          <div>
            <span className={`text-xs font-bold uppercase tracking-wider mb-3 block ${isDark ? 'text-indigo-300' : 'text-indigo-700'}`}>
              {ui.footerColAges}
            </span>
            <ul className={`space-y-1.5 text-xs ${isDark ? 'text-slate-200' : 'text-slate-700'}`}>
              {AGE_STAGE_LINKS.map((stage) => (
                <li key={stage.slug}>
                  <Link href={localePath(`/${stage.slug}`)} className="inline-block py-0.5 hover:underline">
                    {tTerm(stage.termKey)}
                  </Link>
                </li>
              ))}
              <li>
                <Link href={localePath('/')} className={`inline-block py-1 font-bold hover:underline ${isDark ? 'text-amber-300' : 'text-indigo-700'}`}>
                  🎁 {ui.navAllIdeas}
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Full Localized Directory of Hubs, Filters & Age Subcategories */}
        <FooterDirectory isDark={isDark} />

        {/* Social Sharing Bar */}
        <div className={`border-t pt-6 pb-6 mb-2 flex flex-col md:flex-row items-center justify-between gap-4 ${isDark ? 'border-slate-800' : 'border-slate-200/80'}`}>
          <div className="text-center md:text-left">
            <span className={`text-xs font-bold block ${isDark ? 'text-white' : 'text-slate-900'}`}>
              {ui.sharePromptTitle}
            </span>
            <span className={`text-[11px] ${isDark ? 'text-slate-300' : 'text-slate-600'}`}>
              {ui.sharePromptSubtitle}
            </span>
          </div>
          <SocialShareWidget compact={false} dark={isDark} />
        </div>

        {/* Bottom Bar */}
        <div className={`border-t pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs ${isDark ? 'border-slate-800 text-slate-300' : 'border-slate-200 text-slate-700'}`}>
          <div className="flex flex-wrap items-center justify-center sm:justify-start gap-3">
            <span>
              © {new Date().getFullYear()} {ui.brandName} (unbuenregalo.es) • {ui.footerRights}
            </span>
            <LanguageSelector dark={isDark} />
          </div>
          <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-6 font-medium">
            <Link href="/aviso-legal" className={`inline-flex items-center min-h-6 py-1 hover:underline transition-colors ${isDark ? 'hover:text-indigo-300' : 'hover:text-indigo-700'}`}>
              {ui.footerLegalNotice}
            </Link>
            <Link href="/politica-de-privacidad" className={`inline-flex items-center min-h-6 py-1 hover:underline transition-colors ${isDark ? 'hover:text-indigo-300' : 'hover:text-indigo-700'}`}>
              {ui.footerPrivacy}
            </Link>
            <Link href="/politica-de-cookies" className={`inline-flex items-center min-h-6 py-1 hover:underline transition-colors ${isDark ? 'hover:text-indigo-300' : 'hover:text-indigo-700'}`}>
              {ui.footerCookies}
            </Link>
            <button
              type="button"
              onClick={() => {
                if (typeof window !== 'undefined') {
                  window.dispatchEvent(new Event('openCookieBanner'));
                }
              }}
              className={`inline-flex items-center min-h-6 py-1 hover:underline transition-colors cursor-pointer ${
                isDark ? 'text-slate-200 hover:text-white' : 'text-slate-700 hover:text-indigo-900'
              }`}
            >
              {ui.footerCookiePrefs}
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}
