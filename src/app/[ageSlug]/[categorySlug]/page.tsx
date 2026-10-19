import React from 'react';
import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import ProductCard from '@/components/ProductCard';
import SeoFaq from '@/components/SeoFaq';
import AmazonLiveSearchCard from '@/components/AmazonLiveSearchCard';
import ThemeAtmosphere from '@/components/ThemeAtmosphere';
import { PRODUCTS } from '@/data/products';
import { SEO_AGE_ROUTES, getSubcategorySlugMap } from '@/lib/seoRoutes';
import { Gift, ChevronRight, ShieldCheck, Sparkles, TrendingUp } from 'lucide-react';
import Link from 'next/link';

interface PageProps {
  params: Promise<{
    ageSlug: string;
    categorySlug: string;
  }>;
}

export async function generateStaticParams() {
  const params: { ageSlug: string; categorySlug: string }[] = [];

  for (const [ageSlug, route] of Object.entries(SEO_AGE_ROUTES)) {
    const subcategories = getSubcategorySlugMap(route.ageId);
    for (const sub of subcategories) {
      params.push({
        ageSlug,
        categorySlug: sub.slug,
      });
    }
  }

  return params;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { ageSlug, categorySlug } = await params;
  const ageMeta = SEO_AGE_ROUTES[ageSlug];
  if (!ageMeta) return {};

  const subcategories = getSubcategorySlugMap(ageMeta.ageId);
  const currentSub = subcategories.find((s) => s.slug === categorySlug);
  if (!currentSub) return {};

  const pageTitle = `Mejores ${currentSub.label} (${ageMeta.h1}) | Un Buen Regalo 2026`;
  const pageDesc = `Descubre los mejores productos y ofertas en ${currentSub.label} para ${ageMeta.h1}. Opiniones reales, marcas oficiales y garantía directa de Amazon España.`;
  const canonicalUrl = `https://unbuenregalo.vercel.app/${ageSlug}/${categorySlug}`;

  return {
    title: pageTitle,
    description: pageDesc,
    alternates: {
      canonical: canonicalUrl,
    },
    openGraph: {
      title: pageTitle,
      description: pageDesc,
      url: canonicalUrl,
      type: 'website',
      siteName: 'Un Buen Regalo',
      locale: 'es_ES',
    },
  };
}

export default async function SubcategoryLandingPage({ params }: PageProps) {
  const { ageSlug, categorySlug } = await params;
  const ageMeta = SEO_AGE_ROUTES[ageSlug];

  if (!ageMeta) notFound();

  const subcategories = getSubcategorySlugMap(ageMeta.ageId);
  const currentSub = subcategories.find((s) => s.slug === categorySlug);

  if (!currentSub) notFound();

  // Filter products for this age AND subcategory
  const targetSub = currentSub.label.toLowerCase().trim();
  const matchedProducts = PRODUCTS.filter((p) => {
    // Check age match
    if (ageMeta.ageId !== 'reveal' && p.ageRange !== ageMeta.ageId) {
      return false;
    }

    const pSub = p.subcategory.toLowerCase().trim();
    return pSub === targetSub;
  });

  // Breadcrumb schema
  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: 'Inicio',
        item: 'https://unbuenregalo.vercel.app',
      },
      {
        '@type': 'ListItem',
        position: 2,
        name: ageMeta.h1,
        item: `https://unbuenregalo.vercel.app/${ageSlug}`,
      },
      {
        '@type': 'ListItem',
        position: 3,
        name: currentSub.label,
        item: `https://unbuenregalo.vercel.app/${ageSlug}/${categorySlug}`,
      },
    ],
  };

  return (
    <div className="min-h-screen relative flex flex-col bg-slate-50 text-slate-900 selection:bg-indigo-600 selection:text-white">
      <ThemeAtmosphere />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />

      <Header currentTheme="classic" />

      <main className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 w-full z-10">
        
        {/* Breadcrumb Navigation */}
        <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-xs font-semibold text-slate-500 mb-6 flex-wrap">
          <Link href="/" className="hover:text-indigo-600 transition-colors">Inicio</Link>
          <ChevronRight className="w-3.5 h-3.5" />
          <Link href={`/${ageSlug}`} className="hover:text-indigo-600 transition-colors">{ageMeta.h1}</Link>
          <ChevronRight className="w-3.5 h-3.5" />
          <span className="text-slate-900 font-bold">{currentSub.label}</span>
        </nav>

        {/* HERO */}
        <section className="text-center py-6 sm:py-8 max-w-4xl mx-auto">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-bold mb-4 shadow-xs border border-slate-200 bg-white/90 backdrop-blur-md text-slate-800">
            <span className="flex h-2 w-2 rounded-full bg-emerald-500 animate-pulse"></span>
            <span>Edición 2026 • Catálogo Especializado</span>
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight leading-[1.15] mb-4 text-slate-900">
            Mejores Opciones de {currentSub.label}
          </h1>

          <p className="text-sm sm:text-base text-slate-600 leading-relaxed mb-6 max-w-3xl mx-auto">
            Selección exclusiva verificada de {currentSub.label.toLowerCase()} recomendados para {ageMeta.h1.toLowerCase()}. Consulta valoraciones reales, stock y precios actualizados directamente con la garantía oficial de Amazon España.
          </p>

          {/* Quick links to sibling subcategories */}
          <div className="flex flex-wrap items-center justify-center gap-2 mb-8">
            <Link
              href={`/${ageSlug}`}
              className="px-3 py-1.5 rounded-xl text-xs font-bold bg-slate-900 text-white shadow-xs"
            >
              ← Ver todas las opciones
            </Link>
            {subcategories
              .filter((s) => s.slug !== categorySlug)
              .map((sub) => (
                <Link
                  key={sub.slug}
                  href={`/${ageSlug}/${sub.slug}`}
                  className="px-3 py-1.5 rounded-xl text-xs font-semibold bg-white hover:bg-indigo-50 border border-slate-200 hover:border-indigo-300 text-slate-700 hover:text-indigo-600 transition-all shadow-xs"
                >
                  {sub.label}
                </Link>
              ))}
          </div>

          {/* Trust badges */}
          <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-6 text-xs font-medium text-slate-500">
            <span className="flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-emerald-500" />
              Devolución Gratuita 30 días
            </span>
            <span className="flex items-center gap-1.5">
              <TrendingUp className="w-4 h-4 text-indigo-500" />
              Top Valorados
            </span>
            <span className="flex items-center gap-1.5">
              <Sparkles className="w-4 h-4 text-amber-500" />
              Envío Rápido Prime
            </span>
          </div>
        </section>

        {/* PRODUCTS GRID */}
        <section className="mb-14">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-black text-slate-900 flex items-center gap-2">
              <Gift className="w-5 h-5 text-indigo-600" />
              <span>{currentSub.label} ({matchedProducts.length} productos)</span>
            </h2>
          </div>

          {matchedProducts.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 mb-12">
              {matchedProducts.map((product) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  currentTheme="classic"
                />
              ))}
            </div>
          ) : (
            <div className="text-center py-12 px-4 rounded-3xl border border-dashed border-slate-300 mb-8 bg-white/60">
              <p className="text-sm text-slate-600 mb-4">
                Estamos actualizando la selección de {currentSub.label} con las últimas novedades de 2026.
              </p>
              <Link
                href={`/${ageSlug}`}
                className="px-5 py-2.5 rounded-xl bg-indigo-600 text-white font-bold text-xs hover:bg-indigo-700 transition-colors inline-block"
              >
                Explorar el catálogo completo de {ageMeta.h1}
              </Link>
            </div>
          )}

          <AmazonLiveSearchCard
            currentTheme="classic"
            initialQuery={currentSub.label}
          />
        </section>

        <SeoFaq currentTheme="classic" />

      </main>

      <Footer currentTheme="classic" />
    </div>
  );
}
