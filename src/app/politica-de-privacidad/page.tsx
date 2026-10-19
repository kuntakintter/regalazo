import React from 'react';
import { Metadata } from 'next';
import Link from 'next/link';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import ThemeAtmosphere from '@/components/ThemeAtmosphere';
import { Shield, Lock, Eye, ArrowLeft, CheckCircle2 } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Política de Privacidad (RGPD) | Un Buen Regalo',
  description: 'Política de Privacidad y Protección de Datos personales conforme al Reglamento General de Protección de Datos (RGPD) y la LOPDGDD.',
  alternates: {
    canonical: 'https://unbuenregalo.vercel.app/politica-de-privacidad',
  },
};

export default function PoliticaPrivacidadPage() {
  return (
    <div className="min-h-screen relative flex flex-col bg-slate-50 text-slate-900 selection:bg-indigo-600 selection:text-white">
      <ThemeAtmosphere />
      <Header currentTheme="classic" />

      <main className="flex-1 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-14 w-full z-10">
        
        {/* Breadcrumb */}
        <nav className="mb-6 flex items-center gap-2 text-xs text-slate-500 font-medium">
          <Link href="/" className="hover:text-indigo-600 flex items-center gap-1 transition-colors">
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Volver al inicio</span>
          </Link>
          <span>/</span>
          <span className="text-slate-800 font-bold">Política de Privacidad</span>
        </nav>

        <div className="bg-white rounded-3xl p-6 sm:p-10 border border-slate-200/80 shadow-xs space-y-8">
          
          <header className="border-b border-slate-100 pb-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold mb-3 bg-emerald-50 text-emerald-700 border border-emerald-100">
              <Shield className="w-3.5 h-3.5" />
              <span>Privacidad Garantizada • RGPD (UE 2016/679) & LOPDGDD 3/2018</span>
            </div>
            <h1 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
              Política de Privacidad y Protección de Datos
            </h1>
            <p className="text-sm text-slate-500 mt-2">
              En Un Buen Regalo respetamos al 100% tu privacidad. No comercializamos con tus datos personales ni almacenamos información bancaria.
            </p>
          </header>

          {/* Quick summary box */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 p-4 rounded-2xl bg-slate-50 border border-slate-200 text-xs">
            <div className="flex items-start gap-2.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
              <div>
                <p className="font-bold text-slate-800">Sin Datos Bancarios</p>
                <p className="text-slate-500">Nunca te pediremos tarjetas ni contraseñas. Compras directo en Amazon.</p>
              </div>
            </div>
            <div className="flex items-start gap-2.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
              <div>
                <p className="font-bold text-slate-800">Navegación Anónima</p>
                <p className="text-slate-500">Puedes explorar todo el catálogo de regalos sin registrarte.</p>
              </div>
            </div>
            <div className="flex items-start gap-2.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
              <div>
                <p className="font-bold text-slate-800">Tus Derechos</p>
                <p className="text-slate-500">Acceso, rectificación, supresión y oposición garantizados según el RGPD.</p>
              </div>
            </div>
          </div>

          {/* 1. Responsable del Tratamiento */}
          <section className="space-y-3 text-sm text-slate-700 leading-relaxed">
            <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2">
              <Lock className="w-4 h-4 text-indigo-600" />
              1. Responsable del Tratamiento de tus Datos
            </h2>
            <p>
              El responsable del tratamiento de los datos recabados en este sitio web es el equipo gestor de <strong>Un Buen Regalo</strong> (accesible desde https://unbuenregalo.vercel.app). Nos comprometemos a tratar todos los datos de conformidad con el Reglamento (UE) 2016/679 del Parlamento Europeo (RGPD) y la Ley Orgánica 3/2018 (LOPDGDD).
            </p>
          </section>

          {/* 2. Qué datos recopilamos */}
          <section className="space-y-3 text-sm text-slate-700 leading-relaxed">
            <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2">
              <Eye className="w-4 h-4 text-indigo-600" />
              2. Datos que Recopilamos y Finalidad
            </h2>
            <p>
              En Un Buen Regalo minimizamos la recolección de datos al mínimo técnico indispensable:
            </p>
            <ul className="list-disc pl-5 space-y-1.5 text-xs sm:text-sm text-slate-600">
              <li>
                <strong>Datos técnicos de navegación:</strong> Dirección IP anonimizada, tipo de navegador, sistema operativo y páginas visitadas para garantizar la seguridad de la infraestructura y métricas de rendimiento.
              </li>
              <li>
                <strong>Preferencias de interfaz:</strong> Filtros de edad o temas guardados localmente en tu propio dispositivo (Local Storage) para mejorar tu experiencia de usuario.
              </li>
              <li>
                <strong>Enlaces de Afiliación de Amazon:</strong> Cuando haces clic en un enlace de producto, eres redirigido a Amazon.es. En ese momento, Amazon puede colocar una cookie de seguimiento de afiliado para atribuir la comisión correspondiente de acuerdo a su propia política de privacidad.
              </li>
            </ul>
          </section>

          {/* 3. Base Jurídica */}
          <section className="space-y-3 text-sm text-slate-700 leading-relaxed">
            <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2">
              <Lock className="w-4 h-4 text-indigo-600" />
              3. Base Jurídica del Tratamiento
            </h2>
            <p>
              La base legal para el tratamiento de tus datos es:
            </p>
            <ul className="list-disc pl-5 space-y-1 text-xs sm:text-sm text-slate-600">
              <li>El <strong>consentimiento del usuario</strong> al aceptar nuestra política de cookies y navegación en el sitio.</li>
              <li>El <strong>interés legítimo</strong> del responsable para asegurar el correcto funcionamiento técnico, prevenir fraudes y optimizar el catálogo de recomendaciones.</li>
            </ul>
          </section>

          {/* 4. Cesión de datos a terceros */}
          <section className="space-y-3 text-sm text-slate-700 leading-relaxed">
            <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2">
              <Lock className="w-4 h-4 text-indigo-600" />
              4. Comunicación de Datos a Terceros
            </h2>
            <p>
              Un Buen Regalo <strong>no vende, alquila ni cede datos personales a terceros</strong> bajo ningún concepto. Únicamente proveedores tecnológicos esenciales de alojamiento y distribución de contenido (como Vercel Inc. para la infraestructura web de alta disponibilidad) pueden procesar datos técnicos bajo estrictos acuerdos de procesamiento conformes al marco de privacidad UE-EE.UU.
            </p>
          </section>

          {/* 5. Tus Derechos */}
          <section className="space-y-3 text-sm text-slate-700 leading-relaxed">
            <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2">
              <Lock className="w-4 h-4 text-indigo-600" />
              5. Ejercicio de tus Derechos ARCO / RGPD
            </h2>
            <p>
              Como usuario, la legislación europea te otorga el derecho a:
            </p>
            <ul className="list-disc pl-5 space-y-1 text-xs sm:text-sm text-slate-600">
              <li>Solicitar el <strong>acceso</strong> a los datos personales que tengamos sobre ti.</li>
              <li>Solicitar la <strong>rectificación</strong> de datos inexactos o incompletos.</li>
              <li>Solicitar la <strong>supresión</strong> de tus datos cuando ya no sean necesarios.</li>
              <li>Solicitar la <strong>limitación</strong> u <strong>oposición</strong> al tratamiento de tus datos.</li>
              <li>Presentar una reclamación ante la Agencia Española de Protección de Datos (AEPD, www.aepd.es) si consideras vulnerados tus derechos.</li>
            </ul>
          </section>

        </div>

      </main>

      <Footer currentTheme="classic" />
    </div>
  );
}
