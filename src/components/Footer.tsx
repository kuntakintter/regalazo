'use client';

import React from 'react';
import Link from 'next/link';
import { Gift, ShieldCheck, Heart, TrendingUp, ShoppingBag } from 'lucide-react';
import BrandLogo from '@/components/BrandLogo';
import LanguageSelector from '@/components/LanguageSelector';
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
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
          
          {/* Col 1: Brand */}
          <div className="space-y-3">
            <BrandLogo size="compact" showSubtitle={false} />
            <p className="text-xs opacity-75 leading-relaxed">
              La plataforma más completa de recomendaciones de regalos para todas las edades: bebés, niños, jóvenes y adultos a partir de 18 años. Analizamos y seleccionamos los productos con mejores valoraciones y satisfacción garantizada en Amazon España.
            </p>
            <div className="text-[11px] opacity-60">
              Hecho con <Heart className="w-3 h-3 text-rose-500 inline fill-rose-500" /> para que encuentres el regalo perfecto en segundos.
            </div>
          </div>

          {/* Col 2: Edades */}
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
              <li><Link href="/adolescentes-13-a-15-anos" className="hover:underline">Adolescentes (13 a 15 Años)</Link></li>
              <li><Link href="/jovenes-16-a-18-anos" className="hover:underline">Jóvenes (16 a 18 Años)</Link></li>
              <li><Link href="/adultos-mas-de-18-anos" className="hover:underline">Adultos (+18 Años)</Link></li>
            </ul>
          </div>

          {/* Col 3: Hubs Especializados */}
          <div>
            <span className="text-xs font-bold uppercase tracking-wider mb-3 block opacity-90 text-indigo-600">
              Hubs Especializados
            </span>
            <ul className="space-y-2 text-xs opacity-80">
              <li><Link href="/motoristas" className="hover:underline">🏍️ Accesorios para Motoristas</Link></li>
              <li><Link href="/automovil" className="hover:underline">🚗 Gadgets para Automóvil</Link></li>
              <li><Link href="/gaming" className="hover:underline">🎮 Periféricos Gaming & Setup</Link></li>
              <li><Link href="/ciclismo" className="hover:underline">🚴 Equipamiento Ciclismo & MTB</Link></li>
              <li><Link href="/amantes-del-cafe" className="hover:underline">☕ Especial Amantes del Café</Link></li>
              <li><Link href="/mascotas" className="hover:underline">🐾 Lo Mejor para Mascotas</Link></li>
            </ul>
          </div>

          {/* Col 4: Confianza y Garantía */}
          <div>
            <span className="text-xs font-bold uppercase tracking-wider mb-3 block opacity-90 text-indigo-600">
              Garantía de Compra
            </span>
            <ul className="space-y-2 text-xs opacity-80">
              <li className="flex items-center gap-1.5">
                <ShoppingBag className="w-3.5 h-3.5 text-amber-500" />
                <span>Gestión directa por Amazon.es</span>
              </li>
              <li className="flex items-center gap-1.5">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-500" />
                <span>Devoluciones 30 días garantizadas</span>
              </li>
              <li className="flex items-center gap-1.5">
                <TrendingUp className="w-3.5 h-3.5 text-indigo-500" />
                <span>Precios actualizados en tiempo real</span>
              </li>
            </ul>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="border-t border-slate-200 pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs opacity-75">
          <div className="flex flex-wrap items-center justify-center sm:justify-start gap-3">
            <span>© {new Date().getFullYear()} Un Buen Regalo (unbuenregalo.vercel.app) • Todos los derechos reservados.</span>
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
              onClick={() => {
                if (typeof window !== 'undefined') {
                  window.dispatchEvent(new Event('openCookieBanner'));
                }
              }}
              className="text-slate-500 hover:text-indigo-600 hover:underline transition-colors cursor-pointer"
            >
              Preferencias de Cookies
            </button>
          </div>
        </div>

      </div>
    </footer>
  );
}
