'use client';

import React from 'react';
import Link from 'next/link';
import { Gift, ShieldCheck, Heart, TrendingUp, ShoppingBag } from 'lucide-react';
import BrandLogo from '@/components/BrandLogo';
import LanguageSelector from '@/components/LanguageSelector';
import { I18N_SEO_ROUTES } from '@/lib/i18nRoutes';
import { AMAZON_DISCLOSURE, AMAZON_AFFILIATE_TAG } from '@/lib/amazon';

interface FooterProps {
  currentTheme: string;
}

export default function Footer({ currentTheme }: FooterProps) {
  const isDark = currentTheme === 'emo' || currentTheme === 'gamer';

  return (
    <footer className={`border-t transition-colors pt-12 pb-10 ${
      currentTheme === 'emo'
        ? 'bg-neutral-950 border-neutral-800 text-neutral-300'
        : currentTheme === 'gamer'
        ? 'bg-slate-950 border-purple-900/60 text-slate-300'
        : currentTheme === 'baby'
        ? 'bg-rose-50/60 border-rose-200 text-rose-950'
        : 'bg-slate-50 border-slate-200 text-slate-700'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Amazon Mandatory Affiliate Disclosure Callout */}
        <div className="p-4 rounded-2xl border mb-10 text-xs leading-relaxed flex items-start gap-3 bg-white border-slate-200 text-slate-600 shadow-xs">
          <ShieldCheck className="w-5 h-5 text-amber-500 shrink-0 mt-0.5" />
          <div>
            <p className="font-semibold text-slate-900 mb-1">
              Aviso Legal de Afiliación de Amazon España (StoreID: {AMAZON_AFFILIATE_TAG})
            </p>
            <p className="opacity-90">
              {AMAZON_DISCLOSURE}
            </p>
          </div>
        </div>

        {/* 4 Columns Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 mb-12">
          
          {/* Col 1: Brand */}
          <div className="space-y-3">
            <BrandLogo size="compact" showSubtitle={false} />
            <p className="text-xs text-slate-700 leading-relaxed">
              La plataforma de ideas de regalos originales para todas las edades: bebés, niños, jóvenes y adultos (+18 años). Seleccionamos los productos mejor valorados con comparativas, precios actualizados y votación en grupo por WhatsApp.
            </p>
            <div className="text-[11px] text-slate-700 font-medium">
              Hecho con <Heart className="w-3 h-3 text-rose-500 inline fill-rose-500" /> para encontrar el regalo perfecto en segundos.
            </div>
          </div>

          {/* Col 2: Ocasiones y Fiestas (SEO Poderoso) */}
          <div>
            <span className="text-xs font-bold uppercase tracking-wider mb-3 block opacity-90 text-indigo-600">
              Ocasiones & Destinatarios
            </span>
            <ul className="space-y-2 text-xs opacity-80">
              <li><Link href="/que-regalar-a-mi-novio" className="hover:underline font-bold text-indigo-700">❤️ Qué Regalar a mi Novio</Link></li>
              <li><Link href="/que-regalar-a-mi-novia" className="hover:underline font-bold text-pink-700">💕 Qué Regalar a mi Novia</Link></li>
              <li><Link href="/que-regalar-a-un-hombre" className="hover:underline font-bold text-indigo-600">👨 Qué Regalar a un Hombre</Link></li>
              <li><Link href="/que-regalar-a-una-mujer" className="hover:underline font-bold text-pink-600">👩 Qué Regalar a una Mujer</Link></li>
              <li><Link href="/regalos-para-los-que-tienen-de-todo" className="hover:underline font-bold text-purple-700">✨ Para los que Tienen de Todo</Link></li>
              <li><Link href="/regalos-menos-20-euros" className="hover:underline font-bold text-emerald-700">🏷️ Regalos por Menos de 20€</Link></li>
              <li><Link href="/carta-papa-noel" className="hover:underline font-bold text-amber-700">🎅 Carta a Papá Noel (Oficial)</Link></li>
              <li><Link href="/navidad" className="hover:underline font-bold text-emerald-700">🎄 Especial Navidad & Reyes Magos</Link></li>
              <li><Link href="/#catalogo-productos" className="hover:underline">🎂 Regalos de Cumpleaños</Link></li>
              <li><Link href="/votar" className="hover:underline font-bold text-purple-700">🗳️ Amigo Invisible & Votación en Grupo</Link></li>
              <li><Link href="/fiesta-revelacion-genero" className="hover:underline">🎈 Baby Shower & Revelación Género</Link></li>
              <li><Link href="/halloween" className="hover:underline">🎃 Regalos y Disfraces Halloween</Link></li>
              <li><Link href="/regalos-gta-6" className="hover:underline font-bold text-pink-600">🌴 Regalos GTA 6 / GTA VI</Link></li>
            </ul>
          </div>

          {/* Col 3: Pasiones y Hobbies */}
          <div>
            <span className="text-xs font-bold uppercase tracking-wider mb-3 block opacity-90 text-indigo-600">
              Pasiones & Hobbies
            </span>
            <ul className="space-y-2 text-xs opacity-80">
              <li><Link href="/motoristas" className="hover:underline">🏍️ Accesorios para Motoristas</Link></li>
              <li><Link href="/gaming" className="hover:underline">🎮 Periféricos Gaming & Setup</Link></li>
              <li><Link href="/amantes-del-cafe" className="hover:underline">☕ Especial Amantes del Café</Link></li>
              <li><Link href="/mascotas" className="hover:underline">🐾 Lo Mejor para Mascotas</Link></li>
              <li><Link href="/automovil" className="hover:underline">🚗 Gadgets para Automóvil</Link></li>
              <li><Link href="/ciclismo" className="hover:underline">🚴 Equipamiento Ciclismo & MTB</Link></li>
              <li><Link href="/?categoria=cartas-pokemon#catalogo-productos" className="hover:underline">⚡ Cartas y Sobres Pokémon</Link></li>
              <li><Link href="/?categoria=figuras-anime#catalogo-productos" className="hover:underline">🎎 Figuras Anime y Colección</Link></li>
            </ul>
          </div>

          {/* Col 4: Regalos por Edad */}
          <div>
            <span className="text-xs font-bold uppercase tracking-wider mb-3 block opacity-90 text-indigo-600">
              Regalos por Edad
            </span>
            <ul className="space-y-2 text-xs opacity-80">
              <li><Link href="/bebes-0-a-12-meses" className="hover:underline">Bebés y Recién Nacidos (0-12m)</Link></li>
              <li><Link href="/ninos-1-a-3-anos" className="hover:underline">Primeros Pasos (1 a 3 Años)</Link></li>
              <li><Link href="/ninos-4-a-6-anos" className="hover:underline">Infantil y Creatividad (4 a 6 Años)</Link></li>
              <li><Link href="/ninos-7-a-9-anos" className="hover:underline">Primaria y Estrategia (7 a 9 Años)</Link></li>
              <li><Link href="/ninos-10-a-12-anos" className="hover:underline">Preadolescentes (10 a 12 Años)</Link></li>
              <li><Link href="/jovenes-13-a-15-anos" className="hover:underline">Adolescentes (13 a 15 Años)</Link></li>
              <li><Link href="/jovenes-16-a-18-anos" className="hover:underline">Jóvenes (16 a 18 Años)</Link></li>
              <li><Link href="/adultos-mas-de-18-anos" className="hover:underline">Adultos (+18 Años)</Link></li>
            </ul>
          </div>

        </div>

        {/* International SEO Editions & Currencies Bar */}
        <div className="border-t border-slate-200/80 pt-5 pb-5 mb-2">
          <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500 block mb-2.5">
            🌍 Ediciones Internacionales · Idiomas y Monedas (€ EUR / $ USD)
          </span>
          <div className="flex flex-wrap items-center gap-x-3.5 gap-y-1.5 text-[11px] text-slate-600">
            <Link href="/" className="hover:text-indigo-600 hover:underline font-semibold">
              🇪🇸 Español (€ EUR)
            </Link>
            {Object.values(I18N_SEO_ROUTES).map((route) => (
              <Link
                key={route.slug}
                href={`/${route.slug}`}
                className="hover:text-indigo-600 hover:underline transition-colors"
                title={`${route.brandTranslation} - ${route.title}`}
              >
                {route.flag} {route.brandTranslation} ({route.currencySymbol})
              </Link>
            ))}
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-slate-200 pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs opacity-75">
          <div className="flex flex-wrap items-center justify-center sm:justify-start gap-3">
            <span>© {new Date().getFullYear()} Un Buen Regalo (unbuenregalo.es) • Todos los derechos reservados.</span>
            <LanguageSelector />
          </div>
          <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-6 font-medium">
            <Link href="/aviso-legal" className="hover:text-indigo-600 hover:underline transition-colors">
              Aviso Legal
            </Link>
            <Link href="/politica-de-privacidad" className="hover:text-indigo-600 hover:underline transition-colors">
              Política de Privacidad
            </Link>
            <Link href="/politica-de-cookies" className="hover:text-indigo-600 hover:underline transition-colors">
              Política de Cookies
            </Link>
            <button
              type="button"
              onClick={() => {
                if (typeof window !== 'undefined') {
                  window.dispatchEvent(new Event('openCookieBanner'));
                }
              }}
              className="text-slate-700 hover:text-indigo-900 hover:underline transition-colors cursor-pointer"
            >
              Preferencias de Cookies
            </button>
          </div>
        </div>

      </div>
    </footer>
  );
}
