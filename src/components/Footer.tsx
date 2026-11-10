'use client';

import React from 'react';
import Link from 'next/link';
import { Gift, ShieldCheck, Heart, TrendingUp, ShoppingBag } from 'lucide-react';
import BrandLogo from '@/components/BrandLogo';
import LanguageSelector from '@/components/LanguageSelector';
import SocialShareWidget from '@/components/SocialShareWidget';
import { I18N_SEO_ROUTES } from '@/lib/i18nRoutes';
import { AMAZON_DISCLOSURE, AMAZON_AFFILIATE_TAG_ES, AMAZON_AFFILIATE_TAG_INTL } from '@/lib/amazon';
import { useCurrency } from '@/context/CurrencyContext';
import FooterDirectory from '@/components/FooterDirectory';

interface FooterProps {
  currentTheme: string;
}

export default function Footer({ currentTheme }: FooterProps) {
  const isDark = currentTheme === 'emo' || currentTheme === 'gamer';
  const { amazonTag, amazonSiteName } = useCurrency();

  const selectCategory = (cat: string) => {
    if (typeof window !== 'undefined') {
      window.dispatchEvent(new CustomEvent('select-category', { detail: cat }));
    }
  };

  return (
    <footer className={`border-t transition-colors pt-12 pb-10 ${
      currentTheme === 'emo'
        ? 'bg-neutral-950 border-neutral-800 text-neutral-200'
        : currentTheme === 'gamer'
        ? 'bg-slate-950 border-purple-900/60 text-slate-200'
        : currentTheme === 'baby'
        ? 'bg-rose-50/60 border-rose-200 text-rose-950'
        : 'bg-slate-50 border-slate-200 text-slate-700'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Amazon Mandatory Affiliate Disclosure Callout */}
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
              Aviso Legal de Afiliación Global en {amazonSiteName} (StoreID activo: {amazonTag} · España: {AMAZON_AFFILIATE_TAG_ES} · Global: {AMAZON_AFFILIATE_TAG_INTL})
            </p>
            <p>
              {AMAZON_DISCLOSURE}
            </p>
          </div>
        </div>

        {/* 4 Columns Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 mb-12">
          
          {/* Col 1: Brand */}
          <div className="space-y-3">
            <BrandLogo size="compact" showSubtitle={false} variant={isDark ? 'light' : 'dark'} />
            <p className={`text-xs leading-relaxed ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>
              La plataforma global de ideas de regalos originales para todas las edades: bebés, niños, jóvenes y adultos (+18 años). Seleccionamos los productos mejor valorados con comparativas, precios en € y $ y votación en grupo por WhatsApp.
            </p>
            <div className={`text-[11px] font-medium ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>
              Hecho con <Heart className="w-3 h-3 text-rose-500 inline fill-rose-500" /> para encontrar el regalo perfecto en segundos en cualquier país.
            </div>
          </div>

          {/* Col 2: Ocasiones y Fiestas (SEO Poderoso) */}
          <div>
            <span className={`text-xs font-bold uppercase tracking-wider mb-3 block ${isDark ? 'text-indigo-300' : 'text-indigo-700'}`}>
              Ocasiones & Destinatarios
            </span>
            <ul className={`space-y-1.5 text-xs ${isDark ? 'text-slate-200' : 'text-slate-700'}`}>
              <li><Link href="/que-regalar-a-mi-novio" className={`inline-block py-0.5 hover:underline font-bold ${isDark ? 'text-indigo-300' : 'text-indigo-700'}`}>❤️ Qué Regalar a mi Novio</Link></li>
              <li><Link href="/que-regalar-a-mi-novia" className={`inline-block py-0.5 hover:underline font-bold ${isDark ? 'text-pink-300' : 'text-pink-700'}`}>💕 Qué Regalar a mi Novia</Link></li>
              <li><Link href="/que-regalar-a-un-hombre" className={`inline-block py-0.5 hover:underline font-bold ${isDark ? 'text-indigo-300' : 'text-indigo-700'}`}>👨 Qué Regalar a un Hombre</Link></li>
              <li><Link href="/que-regalar-a-una-mujer" className={`inline-block py-0.5 hover:underline font-bold ${isDark ? 'text-pink-300' : 'text-pink-700'}`}>👩 Qué Regalar a una Mujer</Link></li>
              <li><Link href="/regalos-para-los-que-tienen-de-todo" className={`inline-block py-0.5 hover:underline font-bold ${isDark ? 'text-purple-300' : 'text-purple-700'}`}>✨ Para los que Tienen de Todo</Link></li>
              <li><Link href="/regalos-menos-20-euros" className={`inline-block py-0.5 hover:underline font-bold ${isDark ? 'text-emerald-300' : 'text-emerald-800'}`}>🏷️ Regalos por Menos de 20€</Link></li>
              <li><Link href="/carta-papa-noel" className={`inline-block py-0.5 hover:underline font-bold ${isDark ? 'text-amber-300' : 'text-amber-800'}`}>🎅 Carta a Papá Noel (Oficial)</Link></li>
              <li><Link href="/navidad" className={`inline-block py-0.5 hover:underline font-bold ${isDark ? 'text-emerald-300' : 'text-emerald-800'}`}>🎄 Especial Navidad & Reyes Magos</Link></li>
              <li><Link href="/#catalogo-productos" className="inline-block py-0.5 hover:underline">🎂 Regalos de Cumpleaños</Link></li>
              <li><Link href="/votar" className={`inline-block py-0.5 hover:underline font-bold ${isDark ? 'text-purple-300' : 'text-purple-700'}`}>🗳️ Amigo Invisible & Votación en Grupo</Link></li>
              <li><Link href="/fiesta-revelacion-genero" className="inline-block py-0.5 hover:underline">🎈 Baby Shower & Revelación Género</Link></li>
              <li><Link href="/halloween" className="inline-block py-0.5 hover:underline">🎃 Regalos y Disfraces Halloween</Link></li>
              <li><Link href="/regalos-gta-6" className={`inline-block py-0.5 hover:underline font-bold ${isDark ? 'text-pink-300' : 'text-pink-700'}`}>🌴 Regalos GTA 6 / GTA VI</Link></li>
            </ul>
          </div>

          {/* Col 3: Pasiones y Hobbies */}
          <div>
            <span className={`text-xs font-bold uppercase tracking-wider mb-3 block ${isDark ? 'text-indigo-300' : 'text-indigo-700'}`}>
              Pasiones & Hobbies
            </span>
            <ul className={`space-y-1.5 text-xs ${isDark ? 'text-slate-200' : 'text-slate-700'}`}>
              <li><Link href="/motoristas" className="inline-block py-0.5 hover:underline">🏍️ Accesorios para Motoristas</Link></li>
              <li><Link href="/gaming" className="inline-block py-0.5 hover:underline">🎮 Periféricos Gaming & Setup</Link></li>
              <li><Link href="/amantes-del-cafe" className="inline-block py-0.5 hover:underline">☕ Especial Amantes del Café</Link></li>
              <li><Link href="/mascotas" className="inline-block py-0.5 hover:underline">🐾 Lo Mejor para Mascotas</Link></li>
              <li><Link href="/automovil" className="inline-block py-0.5 hover:underline">🚗 Gadgets para Automóvil</Link></li>
              <li><Link href="/ciclismo" className="inline-block py-0.5 hover:underline">🚴 Equipamiento Ciclismo & MTB</Link></li>
              <li>
                <Link
                  href="/#categoria-cartas-pokemon"
                  onClick={() => selectCategory('cartas-pokemon')}
                  className="inline-block py-0.5 hover:underline"
                >
                  ⚡ Cartas y Sobres Pokémon
                </Link>
              </li>
              <li>
                <Link
                  href="/#categoria-figuras-anime"
                  onClick={() => selectCategory('figuras-anime')}
                  className="inline-block py-0.5 hover:underline"
                >
                  🎎 Figuras Anime y Colección
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 4: Regalos por Edad */}
          <div>
            <span className={`text-xs font-bold uppercase tracking-wider mb-3 block ${isDark ? 'text-indigo-300' : 'text-indigo-700'}`}>
              Regalos por Edad
            </span>
            <ul className={`space-y-1.5 text-xs ${isDark ? 'text-slate-200' : 'text-slate-700'}`}>
              <li><Link href="/bebes-0-a-12-meses" className="inline-block py-0.5 hover:underline">Bebés y Recién Nacidos (0-12m)</Link></li>
              <li><Link href="/ninos-1-a-3-anos" className="inline-block py-0.5 hover:underline">Primeros Pasos (1 a 3 Años)</Link></li>
              <li><Link href="/ninos-4-a-6-anos" className="inline-block py-0.5 hover:underline">Infantil y Creatividad (4 a 6 Años)</Link></li>
              <li><Link href="/ninos-7-a-9-anos" className="inline-block py-0.5 hover:underline">Primaria y Estrategia (7 a 9 Años)</Link></li>
              <li><Link href="/ninos-10-a-12-anos" className="inline-block py-0.5 hover:underline">Preadolescentes (10 a 12 Años)</Link></li>
              <li><Link href="/jovenes-13-a-15-anos" className="inline-block py-0.5 hover:underline">Adolescentes (13 a 15 Años)</Link></li>
              <li><Link href="/jovenes-16-a-18-anos" className="inline-block py-0.5 hover:underline">Jóvenes (16 a 18 Años)</Link></li>
              <li><Link href="/adultos-mas-de-18-anos" className="inline-block py-0.5 hover:underline">Adultos (+18 Años)</Link></li>
            </ul>
          </div>

        </div>

        {/* Directory of all 80+ Subcategories for Googlebot & Users */}
        <FooterDirectory isDark={isDark} />

        {/* Social Sharing Bar (Clean, Non-intrusive for Real Users & SEO) */}
        <div className={`border-t pt-6 pb-6 mb-2 flex flex-col md:flex-row items-center justify-between gap-4 ${isDark ? 'border-slate-800' : 'border-slate-200/80'}`}>
          <div className="text-center md:text-left">
            <span className={`text-xs font-bold block ${isDark ? 'text-white' : 'text-slate-900'}`}>
              ¿Te gusta Un Buen Regalo? Compártelo con amigos o en tus grupos:
            </span>
            <span className={`text-[11px] ${isDark ? 'text-slate-300' : 'text-slate-600'}`}>
              Ayuda a otras personas a encontrar ideas de regalo originales sin dar vueltas.
            </span>
          </div>
          <SocialShareWidget compact={false} />
        </div>

        {/* International SEO Editions & Currencies Bar */}
        <div className={`border-t pt-5 pb-5 mb-2 ${isDark ? 'border-slate-800' : 'border-slate-200/80'}`}>
          <span className={`text-[11px] font-bold uppercase tracking-wider block mb-2.5 ${isDark ? 'text-slate-300' : 'text-slate-600'}`}>
            🌍 Ediciones Internacionales · Idiomas y Monedas (€ EUR / $ USD)
          </span>
          <div className={`flex flex-wrap items-center gap-x-2 gap-y-1.5 text-[11px] ${isDark ? 'text-slate-200' : 'text-slate-700'}`}>
            <Link
              href="/"
              className={`inline-flex items-center min-h-6 px-2 py-1 hover:underline font-semibold ${
                isDark ? 'hover:text-indigo-300' : 'hover:text-indigo-700'
              }`}
            >
              🇪🇸 Español (€ EUR)
            </Link>
            {Object.values(I18N_SEO_ROUTES).map((route) => (
              <Link
                key={route.slug}
                href={`/${route.slug}`}
                className={`inline-flex items-center min-h-6 px-2 py-1 hover:underline transition-colors ${
                  isDark ? 'hover:text-indigo-300' : 'hover:text-indigo-700'
                }`}
                title={`${route.brandTranslation} - ${route.title}`}
              >
                {route.flag} {route.brandTranslation} ({route.currencySymbol})
              </Link>
            ))}
          </div>
        </div>

        {/* Bottom Bar */}
        <div className={`border-t pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs ${isDark ? 'border-slate-800 text-slate-300' : 'border-slate-200 text-slate-700'}`}>
          <div className="flex flex-wrap items-center justify-center sm:justify-start gap-3">
            <span>© {new Date().getFullYear()} Un Buen Regalo (unbuenregalo.es) • Todos los derechos reservados.</span>
            <LanguageSelector dark={isDark} />
          </div>
          <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-6 font-medium">
            <Link href="/aviso-legal" className={`inline-flex items-center min-h-6 py-1 hover:underline transition-colors ${isDark ? 'hover:text-indigo-300' : 'hover:text-indigo-700'}`}>
              Aviso Legal
            </Link>
            <Link href="/politica-de-privacidad" className={`inline-flex items-center min-h-6 py-1 hover:underline transition-colors ${isDark ? 'hover:text-indigo-300' : 'hover:text-indigo-700'}`}>
              Política de Privacidad
            </Link>
            <Link href="/politica-de-cookies" className={`inline-flex items-center min-h-6 py-1 hover:underline transition-colors ${isDark ? 'hover:text-indigo-300' : 'hover:text-indigo-700'}`}>
              Política de Cookies
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
              Preferencias de Cookies
            </button>
          </div>
        </div>

      </div>
    </footer>
  );
}
