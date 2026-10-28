import React from 'react';
import { Metadata } from 'next';
import Link from 'next/link';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import ThemeAtmosphere from '@/components/ThemeAtmosphere';
import { ShieldCheck, Scale, FileText, ArrowLeft, ExternalLink } from 'lucide-react';
import { AMAZON_AFFILIATE_TAG } from '@/lib/amazon';

export const metadata: Metadata = {
  title: 'Aviso Legal | Un Buen Regalo',
  description: 'Información legal, condiciones de uso y divulgación obligatoria del programa de Afiliados de Amazon España para Un Buen Regalo.',
  alternates: {
    canonical: 'https://www.unbuenregalo.es/aviso-legal',
  },
};

export default function AvisoLegalPage() {
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
          <span className="text-slate-800 font-bold">Aviso Legal</span>
        </nav>

        <div className="bg-white rounded-3xl p-6 sm:p-10 border border-slate-200/80 shadow-xs space-y-8">
          
          <header className="border-b border-slate-100 pb-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold mb-3 bg-indigo-50 text-indigo-700 border border-indigo-100">
              <Scale className="w-3.5 h-3.5" />
              <span>Marco Legal y Transparencia • Ley LSSI-CE</span>
            </div>
            <h1 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
              Aviso Legal y Condiciones de Uso
            </h1>
            <p className="text-sm text-slate-500 mt-2">
              Última actualización: {new Date().getFullYear()} • Conforme a la Ley 34/2002 (LSSI-CE) y normativas de comercio digital.
            </p>
          </header>

          {/* Amazon Affiliate Mandatory Disclosure */}
          <section className="p-5 rounded-2xl bg-amber-50/70 border border-amber-200 text-amber-950 text-xs sm:text-sm leading-relaxed space-y-2">
            <div className="flex items-center gap-2 font-bold text-amber-900 text-base">
              <ShieldCheck className="w-5 h-5 text-amber-600" />
              <span>Divulgación Obligatoria del Programa de Afiliados de Amazon</span>
            </div>
            <p>
              En calidad de Afiliado de Amazon, <strong>Un Buen Regalo</strong> (unbuenregalo.es) obtiene ingresos por las compras adscritas que cumplen los requisitos aplicables. El identificador oficial de asociado asignado es <strong>{AMAZON_AFFILIATE_TAG}</strong>.
            </p>
            <p className="text-xs opacity-90">
              Esto significa que al hacer clic en los enlaces de compra de nuestra web y completar un pedido en Amazon.es, podemos recibir una pequeña comisión de recomendación. <strong>Esto no supone jamás un coste adicional para ti</strong>: el precio que pagas en Amazon es exactamente el mismo (o menor si hay ofertas activas).
            </p>
          </section>

          {/* 1. Datos Identificativos */}
          <section className="space-y-3 text-sm text-slate-700 leading-relaxed">
            <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2">
              <FileText className="w-4 h-4 text-indigo-600" />
              1. Datos Identificativos del Responsable
            </h2>
            <p>
              En cumplimiento del artículo 10 de la Ley 34/2002, de 11 de julio, de Servicios de la Sociedad de la Información y de Comercio Electrónico (LSSI-CE), se informa de los datos de la presente plataforma:
            </p>
            <ul className="list-disc pl-5 space-y-1 text-xs sm:text-sm text-slate-600">
              <li><strong>Denominación comercial:</strong> Un Buen Regalo</li>
              <li><strong>Sitio Web:</strong> https://www.unbuenregalo.es</li>
              <li><strong>Actividad:</strong> Portal informativo, agregador editorial y recomendador de ideas de regalo para bebés, niños y adolescentes con monetización mediante enlaces de afiliación.</li>
              <li><strong>Contacto legal:</strong> A través de los canales de atención y reporte habilitados en el sitio web.</li>
            </ul>
          </section>

          {/* 2. Objeto y Funcionamiento */}
          <section className="space-y-3 text-sm text-slate-700 leading-relaxed">
            <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2">
              <FileText className="w-4 h-4 text-indigo-600" />
              2. Objeto y Naturaleza del Servicio
            </h2>
            <p>
              Un Buen Regalo no es una tienda online física ni almacena, vende, envía ni factura los productos mostrados. Nuestra labor es estrictamente <strong>editorial, comparativa y de recomendación</strong> de productos verificados.
            </p>
            <p>
              Cualquier transacción de compra, garantía, envío o devolución se celebra y gestiona íntegramente en la plataforma de destino (<strong>Amazon.es</strong>) bajo sus propias condiciones de venta y políticas de protección al consumidor.
            </p>
          </section>

          {/* 3. Propiedad Intelectual e Industrial */}
          <section className="space-y-3 text-sm text-slate-700 leading-relaxed">
            <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2">
              <FileText className="w-4 h-4 text-indigo-600" />
              3. Propiedad Intelectual y Marcas
            </h2>
            <p>
              El código fuente, diseño gráfico, logotipos, arquitectura de software, bases de datos y textos elaborados por el equipo de Un Buen Regalo están protegidos por las leyes de propiedad intelectual e industrial.
            </p>
            <p>
              Las marcas comerciales, logotipos de productos, nombres de fabricantes (como LEGO, Hot Wheels, Scalextric, Sony, Nintendo, Chicco, Tous, etc.) e imágenes de producto mostradas pertenecen a sus respectivos propietarios y se utilizan únicamente con fines legítimos de identificación y referencia en el marco del comercio de afiliación.
            </p>
          </section>

          {/* 4. Precios y Disponibilidad */}
          <section className="space-y-3 text-sm text-slate-700 leading-relaxed">
            <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2">
              <FileText className="w-4 h-4 text-indigo-600" />
              4. Exactitud de Precios y Disponibilidad de Stock
            </h2>
            <p>
              Hacemos todo lo posible para mantener los precios y valoraciones sincronizados con Amazon España. No obstante, los precios y la disponibilidad de los productos están sujetos a continuas fluctuaciones por parte de los vendedores de Amazon.
            </p>
            <p>
              <strong>El precio vinculante y final será siempre el mostrado en la página de Amazon.es en el momento exacto de la compra.</strong>
            </p>
          </section>

          {/* 5. Ley Aplicable y Jurisdicción */}
          <section className="space-y-3 text-sm text-slate-700 leading-relaxed">
            <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2">
              <FileText className="w-4 h-4 text-indigo-600" />
              5. Legislación Aplicable y Jurisdicción
            </h2>
            <p>
              Para la resolución de todas las controversias o cuestiones relacionadas con el presente sitio web o de las actividades en él desarrolladas, será de aplicación la legislación española, a la que se someten expresamente las partes, siendo competentes para la resolución de todos los conflictos derivados o relacionados con su uso los Juzgados y Tribunales del territorio español.
            </p>
          </section>

        </div>

      </main>

      <Footer currentTheme="classic" />
    </div>
  );
}
