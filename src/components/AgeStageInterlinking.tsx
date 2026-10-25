import React from 'react';
import Link from 'next/link';
import { ArrowLeft, ArrowRight, Sparkles as SparklesIcon, Compass } from 'lucide-react';

interface StageInfo {
  slug: string;
  label: string;
  range: string;
  icon: string;
  subtitle: string;
}

const AGE_STAGES_ORDER: StageInfo[] = [
  { slug: 'bebes-0-a-12-meses', label: 'Bebés y Recién Nacidos', range: '0 a 12 Meses', icon: '🧸', subtitle: 'Tartas de pañales, colecho y descanso' },
  { slug: 'ninos-1-a-3-anos', label: 'Primeros Pasos', range: '1 a 3 Años', icon: '🧩', subtitle: 'Montessori, torres de madera y triciclos' },
  { slug: 'ninos-4-a-6-anos', label: 'Infantil y Creatividad', range: '4 a 6 Años', icon: '🎨', subtitle: 'Patinetes LED, Mario Kart y dibujo' },
  { slug: 'ninos-7-a-9-anos', label: 'Primaria y Acción', range: '7 a 9 Años', icon: '🏎️', subtitle: 'LEGO Creator, Scalextric y ciencia STEM' },
  { slug: 'ninos-10-a-12-anos', label: 'Preadolescentes', range: '10 a 12 Años', icon: '🚀', subtitle: 'Virus!, minidrones y escape rooms' },
  { slug: 'jovenes-13-a-15-anos', label: 'Adolescentes', range: '13 a 15 Años', icon: '🎧', subtitle: 'Auriculares ANC, Instax y Catan' },
  { slug: 'jovenes-16-a-18-anos', label: 'Jóvenes y Gaming', range: '16 a 18 Años', icon: '⚡', subtitle: 'Setup PS5, fragancias y tecnología' },
  { slug: 'adultos-mas-de-18-anos', label: 'Adultos (+18)', range: '+18 Años', icon: '🎯', subtitle: 'Smartbox, LEGO Icons y gourmet' },
];

interface AgeStageInterlinkingProps {
  currentAgeSlug: string;
}

export default function AgeStageInterlinking({ currentAgeSlug }: AgeStageInterlinkingProps) {
  const currentIndex = AGE_STAGES_ORDER.findIndex((stage) => stage.slug === currentAgeSlug);

  if (currentIndex === -1) {
    // If on a special page like revelacion-genero, show main gateway stages
    return (
      <div className="my-12 p-6 sm:p-8 rounded-3xl bg-white border border-slate-200 shadow-xs">
        <h3 className="text-lg font-black text-slate-900 mb-4 flex items-center gap-2">
          <span>Explorar otras etapas de edad recomendadas</span>
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
          {AGE_STAGES_ORDER.slice(0, 4).map((stage) => (
            <Link
              key={stage.slug}
              href={`/${stage.slug}`}
              className="p-3.5 rounded-2xl border border-slate-200 bg-slate-50 hover:bg-amber-50 hover:border-amber-300 transition-all flex items-center gap-3 group"
            >
              <span className="text-2xl shrink-0 group-hover:scale-110 transition-transform">{stage.icon}</span>
              <div className="min-w-0">
                <p className="text-xs font-bold text-slate-900 group-hover:text-amber-700 truncate">{stage.label}</p>
                <p className="text-[11px] text-slate-500">{stage.range}</p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    );
  }

  const prevStage = currentIndex > 0 ? AGE_STAGES_ORDER[currentIndex - 1] : null;
  const nextStage = currentIndex < AGE_STAGES_ORDER.length - 1 ? AGE_STAGES_ORDER[currentIndex + 1] : null;

  return (
    <div className="my-10 p-5 sm:p-7 rounded-3xl bg-white border border-slate-200 shadow-xs">
      <div className="flex items-center justify-between mb-4">
        <div>
          <span className="text-[11px] font-bold uppercase tracking-wider text-amber-700 bg-amber-50 px-2.5 py-0.5 rounded-full border border-amber-200">
            Navegación por Etapas
          </span>
          <h3 className="text-base sm:text-lg font-black text-slate-900 mt-1">
            ¿Está cerca de cambiar de edad? Explora las etapas contiguas
          </h3>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
        {prevStage ? (
          <Link
            href={`/${prevStage.slug}`}
            className="p-4 rounded-2xl border border-slate-200 bg-slate-50 hover:bg-amber-50/70 hover:border-amber-300 transition-all flex items-center gap-3.5 group"
          >
            <div className="w-10 h-10 rounded-xl bg-white border border-slate-200 flex items-center justify-center shrink-0 text-xl shadow-xs group-hover:scale-105 transition-transform">
              {prevStage.icon}
            </div>
            <div className="flex-1 min-w-0">
              <span className="text-[10px] font-bold text-slate-500 uppercase flex items-center gap-1 group-hover:text-amber-800">
                <ArrowLeft className="w-3 h-3 text-slate-400 group-hover:text-amber-700" /> Etapa anterior
              </span>
              <p className="text-xs sm:text-sm font-extrabold text-slate-900 group-hover:text-amber-950 truncate">
                {prevStage.label} ({prevStage.range})
              </p>
              <p className="text-[11px] text-slate-500 truncate">{prevStage.subtitle}</p>
            </div>
          </Link>
        ) : (
          <Link
            href="/fiesta-revelacion-genero"
            className="p-4 rounded-2xl border border-slate-200 bg-slate-50 hover:bg-amber-50/70 hover:border-amber-300 transition-all flex items-center gap-3.5 group"
          >
            <div className="w-10 h-10 rounded-xl bg-white border border-slate-200 flex items-center justify-center shrink-0 text-xl shadow-xs">
              🎈
            </div>
            <div className="flex-1 min-w-0">
              <span className="text-[10px] font-bold text-slate-500 uppercase">Previo al nacimiento</span>
              <p className="text-xs sm:text-sm font-extrabold text-slate-900 group-hover:text-amber-950 truncate">
                Fiesta Revelación de Género
              </p>
              <p className="text-[11px] text-slate-500 truncate">Cañones de confeti, globos enigma y humo</p>
            </div>
          </Link>
        )}

        {nextStage ? (
          <Link
            href={`/${nextStage.slug}`}
            className="p-4 rounded-2xl border border-slate-200 bg-slate-50 hover:bg-amber-50/70 hover:border-amber-300 transition-all flex items-center gap-3.5 group"
          >
            <div className="flex-1 min-w-0 text-left sm:text-right">
              <span className="text-[10px] font-bold text-slate-500 uppercase flex items-center gap-1 sm:justify-end group-hover:text-amber-800">
                Siguiente etapa <ArrowRight className="w-3 h-3 text-slate-400 group-hover:text-amber-700" />
              </span>
              <p className="text-xs sm:text-sm font-extrabold text-slate-900 group-hover:text-amber-950 truncate">
                {nextStage.label} ({nextStage.range})
              </p>
              <p className="text-[11px] text-slate-500 truncate">{nextStage.subtitle}</p>
            </div>
            <div className="w-10 h-10 rounded-xl bg-white border border-slate-200 flex items-center justify-center shrink-0 text-xl shadow-xs group-hover:scale-105 transition-transform order-first sm:order-last">
              {nextStage.icon}
            </div>
          </Link>
        ) : (
          <Link
            href="/gaming"
            className="p-4 rounded-2xl border border-slate-200 bg-slate-50 hover:bg-amber-50/70 hover:border-amber-300 transition-all flex items-center gap-3.5 group"
          >
            <div className="flex-1 min-w-0 text-left sm:text-right">
              <span className="text-[10px] font-bold text-slate-500 uppercase flex items-center gap-1 sm:justify-end">
                Catálogo especializado <ArrowRight className="w-3 h-3 text-slate-400" />
              </span>
              <p className="text-xs sm:text-sm font-extrabold text-slate-950 group-hover:text-amber-950 truncate">
                Hub Especial Gamers & Setup
              </p>
              <p className="text-[11px] text-slate-500 truncate">Mandos PS5, periféricos pro e iluminación</p>
            </div>
            <div className="w-10 h-10 rounded-xl bg-white border border-slate-200 flex items-center justify-center shrink-0 text-xl shadow-xs order-first sm:order-last">
              🎮
            </div>
          </Link>
        )}
      </div>
    </div>
  );
}
