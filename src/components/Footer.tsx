'use client';

import React from 'react';
import Link from 'next/link';
import { Gift, ShieldCheck, Heart, Sparkles, ShoppingBag } from 'lucide-react';
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
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-indigo-600 text-white flex items-center justify-center">
                <Gift className="w-4 h-4" />
              </div>
              <span className="font-black text-lg tracking-tight">REGALAZO⚡</span>
            </div>
            <p className="text-xs opacity-75 leading-relaxed">
              La plataforma más dinámica de recomendaciones de regalos para niños y jóvenes de 0 a 18 años. Analizamos y seleccionamos los productos con mejores valoraciones y satisfacción garantizada en Amazon España.
            </p>
            <div className="text-[11px] opacity-60">
              Hecho con <Heart className="w-3 h-3 text-rose-500 inline fill-rose-500" /> para que encuentres el regalo perfecto en segundos.
            </div>
          </div>

          {/* Col 2: Edades */}
          <div>
            <h3 className="text-xs font-bold uppercase tracking-wider mb-3 opacity-90 text-indigo-600">
              Regalos por Edad
            </h3>
            <ul className="space-y-2 text-xs opacity-80">
              <li><a href="#catalogo-productos" className="hover:underline">Bebés y Recién Nacidos (0-12m)</a></li>
              <li><a href="#catalogo-productos" className="hover:underline">Primeros Pasos (1 a 3 Años)</a></li>
              <li><a href="#catalogo-productos" className="hover:underline">Infantil y Juego (4 a 6 Años)</a></li>
              <li><a href="#catalogo-productos" className="hover:underline">Primaria y Estrategia (7 a 9 Años)</a></li>
              <li><a href="#catalogo-productos" className="hover:underline">Preadolescentes (10 a 12 Años)</a></li>
              <li><a href="#catalogo-productos" className="hover:underline">Adolescentes (13 a 15 Años)</a></li>
              <li><a href="#catalogo-productos" className="hover:underline">Jóvenes (16 a 18 Años - Gaming & Estilo)</a></li>
            </ul>
          </div>

          {/* Col 3: Categorías Top SEO */}
          <div>
            <h3 className="text-xs font-bold uppercase tracking-wider mb-3 opacity-90 text-indigo-600">
              Top Búsquedas
            </h3>
            <ul className="space-y-2 text-xs opacity-80">
              <li><a href="#catalogo-productos" className="hover:underline">Tartas de Pañales Personalizadas</a></li>
              <li><a href="#catalogo-productos" className="hover:underline">Perfumería y Colonias Juveniles</a></li>
              <li><a href="#catalogo-productos" className="hover:underline">Maquillaje Infantil y Skincare Teen</a></li>
              <li><a href="#catalogo-productos" className="hover:underline">Kits de Viaje y Maletas Infantiles</a></li>
              <li><a href="#catalogo-productos" className="hover:underline">Droguería y Cuidado del Bebé</a></li>
              <li><a href="#catalogo-productos" className="hover:underline">Juegos PS5 para Chicos y Chicas</a></li>
              <li><a href="#catalogo-productos" className="hover:underline">Cuadernos Vintage de Piel y Fragancias</a></li>
            </ul>
          </div>

          {/* Col 4: Confianza y Garantía */}
          <div>
            <h3 className="text-xs font-bold uppercase tracking-wider mb-3 opacity-90 text-indigo-600">
              Garantía de Compra
            </h3>
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
                <Sparkles className="w-3.5 h-3.5 text-indigo-500" />
                <span>Precios actualizados en tiempo real</span>
              </li>
            </ul>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="border-t border-slate-200 pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs opacity-60">
          <div>
            © {new Date().getFullYear()} Regalazo (regalazo.vercel.app) • Todos los derechos reservados.
          </div>
          <div className="flex gap-4">
            <span className="hover:underline cursor-pointer">Aviso Legal</span>
            <span className="hover:underline cursor-pointer">Política de Privacidad</span>
            <span className="hover:underline cursor-pointer">Política de Cookies</span>
          </div>
        </div>

      </div>
    </footer>
  );
}
