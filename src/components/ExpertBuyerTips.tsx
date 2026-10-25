import React from 'react';
import { CheckCircle2, ShieldCheck, Lightbulb } from 'lucide-react';

interface ExpertBuyerTipsProps {
  ageTitle: string;
}

export default function ExpertBuyerTips({ ageTitle }: ExpertBuyerTipsProps) {
  return (
    <section className="my-10 p-6 sm:p-8 rounded-3xl bg-gradient-to-br from-amber-50/60 via-white to-orange-50/40 border border-amber-200/80 shadow-xs text-slate-900">
      <div className="flex items-center gap-2 mb-2 text-amber-800">
        <Lightbulb className="w-5 h-5 text-amber-600 shrink-0" />
        <span className="text-xs font-black uppercase tracking-wider">
          Consejos del Equipo Editorial para Acertar
        </span>
      </div>

      <h3 className="text-xl sm:text-2xl font-black text-slate-900 mb-4 tracking-tight">
        Claves para elegir el regalo perfecto para {ageTitle}
      </h3>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="p-4 rounded-2xl bg-white border border-slate-200 shadow-xs">
          <div className="flex items-center gap-2 mb-1.5 text-emerald-700 font-extrabold text-xs">
            <CheckCircle2 className="w-4 h-4 shrink-0 text-emerald-600" />
            <span>Seguridad y Certificación CE</span>
          </div>
          <p className="text-xs text-slate-600 leading-relaxed">
            Prioriza productos con marcado oficial de la UE, materiales atóxicos (libres de BPA o maderas certificadas FSC) y acabados con bordes redondeados.
          </p>
        </div>

        <div className="p-4 rounded-2xl bg-white border border-slate-200 shadow-xs">
          <div className="flex items-center gap-2 mb-1.5 text-indigo-700 font-extrabold text-xs">
            <CheckCircle2 className="w-4 h-4 shrink-0 text-indigo-600" />
            <span>Valor Evolutivo y Durabilidad</span>
          </div>
          <p className="text-xs text-slate-600 leading-relaxed">
            Elige juguetes o artículos que crezcan con su etapa de desarrollo y no queden obsoletos en un mes. Los artículos multi-etapa amortizan la inversión.
          </p>
        </div>

        <div className="p-4 rounded-2xl bg-white border border-slate-200 shadow-xs">
          <div className="flex items-center gap-2 mb-1.5 text-amber-700 font-extrabold text-xs">
            <ShieldCheck className="w-4 h-4 shrink-0 text-amber-600" />
            <span>Garantía Oficial y Devolución</span>
          </div>
          <p className="text-xs text-slate-600 leading-relaxed">
            Todas nuestras selecciones enlazan directamente con vendedores certificados y catálogo oficial de Amazon España, asegurando envío rápido y 30 días de devolución.
          </p>
        </div>
      </div>
    </section>
  );
}
