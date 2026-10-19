import React from 'react';
import { Metadata } from 'next';
import Link from 'next/link';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import ThemeAtmosphere from '@/components/ThemeAtmosphere';
import { Cookie, ShieldCheck, Settings, ArrowLeft, Info } from 'lucide-react';
import { AMAZON_AFFILIATE_TAG } from '@/lib/amazon';

export const metadata: Metadata = {
  title: 'Política de Cookies | Regalazo',
  description: 'Información clara y transparente sobre el uso de cookies propias, técnicas y de afiliados de Amazon en Regalazo conforme a la AEPD.',
  alternates: {
    canonical: 'https://buscaregalo.vercel.app/politica-de-cookies',
  },
};

export default function PoliticaCookiesPage() {
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
          <span className="text-slate-800 font-bold">Política de Cookies</span>
        </nav>

        <div className="bg-white rounded-3xl p-6 sm:p-10 border border-slate-200/80 shadow-xs space-y-8">
          
          <header className="border-b border-slate-100 pb-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold mb-3 bg-amber-50 text-amber-700 border border-amber-100">
              <Cookie className="w-3.5 h-3.5" />
              <span>Transparencia en Navegación • Guía de la AEPD</span>
            </div>
            <h1 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
              Política de Cookies
            </h1>
            <p className="text-sm text-slate-500 mt-2">
              Te explicamos qué son las cookies, cuáles utilizamos en Regalazo y cómo puedes gestionarlas o desactivarlas en cualquier momento.
            </p>
          </header>

          {/* 1. ¿Qué es una cookie? */}
          <section className="space-y-3 text-sm text-slate-700 leading-relaxed">
            <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2">
              <Info className="w-4 h-4 text-indigo-600" />
              1. ¿Qué es una Cookie?
            </h2>
            <p>
              Una cookie es un pequeño fichero de texto que se descarga en tu ordenador, smartphone o tableta al acceder a determinadas páginas web. Las cookies permiten a una página web, entre otras cosas, almacenar y recuperar información sobre los hábitos de navegación de un usuario o de su equipo y, dependiendo de la información que contengan y de la forma en que utilice su equipo, pueden utilizarse para reconocer al usuario.
            </p>
          </section>

          {/* 2. Qué cookies usamos en Regalazo */}
          <section className="space-y-4 text-sm text-slate-700 leading-relaxed">
            <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2">
              <Cookie className="w-4 h-4 text-indigo-600" />
              2. Tipos de Cookies Utilizadas en este Sitio Web
            </h2>
            <p>
              En Regalazo utilizamos cookies estrictamente necesarias para el funcionamiento del sitio web, así como cookies de terceros asociadas al programa de recomendación:
            </p>

            <div className="space-y-3">
              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200">
                <h3 className="font-bold text-slate-900 text-sm mb-1">A. Cookies Técnicas y Esenciales (Obligatorias)</h3>
                <p className="text-xs text-slate-600 mb-2">
                  Son aquellas necesarias para la navegación y el buen funcionamiento de nuestra página web, como recordar si has aceptado el aviso de cookies o mantener tus filtros activos en la sesión actual.
                </p>
                <span className="text-[11px] font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-100">
                  Exentas de consentimiento previo según el art. 22.2 LSSI
                </span>
              </div>

              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200">
                <h3 className="font-bold text-slate-900 text-sm mb-1">B. Cookies de Afiliación de Amazon España (Terceros)</h3>
                <p className="text-xs text-slate-600 mb-2">
                  Al hacer clic en el botón de compra o ver oferta de cualquier producto, eres redirigido a Amazon.es a través de nuestro enlace de afiliado (con identificador oficial <code>{AMAZON_AFFILIATE_TAG}</code>).
                </p>
                <p className="text-xs text-slate-600">
                  Amazon instala una cookie técnica de rastreo en tu navegador con una duración habitual de 24 horas para identificar que la visita provino de Regalazo y poder acreditar la comisión si decides realizar una compra. Esta cookie no recopila datos personales sensibles como tu nombre o tarjeta de crédito.
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200">
                <h3 className="font-bold text-slate-900 text-sm mb-1">C. Cookies Analíticas y de Rendimiento</h3>
                <p className="text-xs text-slate-600">
                  Nos ayudan a saber qué categorías y edades son las más buscadas (por ejemplo, juguetes Montessori o pistas de coches) para seguir mejorando y añadiendo productos que realmente interesen a los usuarios. Todas las métricas son completamente agregadas y anónimas.
                </p>
              </div>
            </div>
          </section>

          {/* 3. Cuadro Resumen de Cookies */}
          <section className="space-y-3 text-sm text-slate-700 leading-relaxed">
            <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-indigo-600" />
              3. Resumen de Cookies y Almacenamiento Local
            </h2>
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs border border-slate-200 rounded-xl overflow-hidden">
                <thead className="bg-slate-100 text-slate-800 font-bold">
                  <tr>
                    <th className="p-3 border-b">Cookie / Clave</th>
                    <th className="p-3 border-b">Proveedor</th>
                    <th className="p-3 border-b">Finalidad</th>
                    <th className="p-3 border-b">Duración</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 text-slate-600">
                  <tr>
                    <td className="p-3 font-mono font-semibold">regalazo_cookie_consent</td>
                    <td className="p-3">Propia</td>
                    <td className="p-3">Almacenar la preferencia de aceptación del banner de cookies</td>
                    <td className="p-3">1 año</td>
                  </tr>
                  <tr>
                    <td className="p-3 font-mono font-semibold">session-id / ubid-acbes</td>
                    <td className="p-3">Amazon.es</td>
                    <td className="p-3">Atribución de compras adscritas en el Programa de Afiliados</td>
                    <td className="p-3">24 horas / Sesión</td>
                  </tr>
                  <tr>
                    <td className="p-3 font-mono font-semibold">_vercel_jwt</td>
                    <td className="p-3">Vercel Inc.</td>
                    <td className="p-3">Seguridad y entrega ultra-rápida de páginas estáticas (CDN Edge)</td>
                    <td className="p-3">Sesión</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </section>

          {/* 4. Cómo gestionar y desactivar las cookies */}
          <section className="space-y-3 text-sm text-slate-700 leading-relaxed">
            <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2">
              <Settings className="w-4 h-4 text-indigo-600" />
              4. ¿Cómo Desactivar o Eliminar las Cookies en tu Navegador?
            </h2>
            <p>
              Puedes permitir, bloquear o eliminar las cookies instaladas en tu equipo mediante la configuración de las opciones del navegador instalado en tu dispositivo:
            </p>
            <ul className="list-disc pl-5 space-y-1 text-xs sm:text-sm text-slate-600">
              <li><strong>Google Chrome:</strong> Configuración &gt; Privacidad y seguridad &gt; Cookies y otros datos de sitios.</li>
              <li><strong>Mozilla Firefox:</strong> Opciones &gt; Privacidad y Seguridad &gt; Cookies y datos del sitio.</li>
              <li><strong>Apple Safari:</strong> Preferencias &gt; Privacidad &gt; Bloquear todas las cookies.</li>
              <li><strong>Microsoft Edge:</strong> Configuración &gt; Permisos del sitio &gt; Cookies y datos almacenados.</li>
            </ul>
            <p className="text-xs text-slate-500 mt-2">
              Ten en cuenta que si deshabilitas determinadas cookies técnicas, algunas funcionalidades de la web podrían no responder con la misma agilidad.
            </p>
          </section>

        </div>

      </main>

      <Footer currentTheme="classic" />
    </div>
  );
}
