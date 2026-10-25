import React from 'react';
import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import ProductCard from '@/components/ProductCard';
import SeoFaq from '@/components/SeoFaq';
import AmazonLiveSearchCard from '@/components/AmazonLiveSearchCard';
import AmazonGridDiscoveryCard from '@/components/AmazonGridDiscoveryCard';
import ThemeAtmosphere from '@/components/ThemeAtmosphere';
import TopPodium from '@/components/TopPodium';
import { PRODUCTS } from '@/data/products';
import { SEO_AGE_ROUTES, getSubcategorySlugMap } from '@/lib/seoRoutes';
import { buildSocialMetadata, getCategoryOgImage } from '@/lib/ogMetadata';
import { Gift, ChevronRight, ShieldCheck, ShoppingBag, TrendingUp, Compass, ArrowRight } from 'lucide-react';
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
  const socialTitle = `🎁 Ideas de Regalo: ${currentSub.label} (${ageMeta.h1})`;
  const pageDesc = `Descubre los mejores productos y ofertas en ${currentSub.label} para ${ageMeta.h1}. Opiniones reales, marcas oficiales y garantía directa de Amazon España.`;
  const canonicalUrl = `https://unbuenregalo.vercel.app/${ageSlug}/${categorySlug}`;
  const ogImage = getCategoryOgImage(currentSub.label);

  return buildSocialMetadata({
    title: pageTitle,
    socialTitle,
    description: pageDesc,
    canonicalUrl,
    imageUrl: ogImage.url,
    imageAlt: ogImage.alt,
    keywords: [currentSub.label.toLowerCase(), `regalos ${currentSub.label.toLowerCase()}`, ageMeta.h1.toLowerCase()],
  });
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

          {/* THEMATIC EXPLORATION BOX (SIBLING CATEGORIES) */}
          {subcategories.filter((s) => s.slug !== categorySlug).length > 0 && (
            <div className="max-w-4xl mx-auto mb-10 text-left rounded-3xl overflow-hidden border-2 border-slate-300 bg-white shadow-lg">
              {/* Header Bar */}
              <div className="bg-[#131921] px-5 py-3.5 border-b-2 border-amber-400/60 flex items-center justify-between text-white">
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-xl bg-[#febd69] text-slate-950 flex items-center justify-center font-black shadow-xs shrink-0">
                    <Compass className="w-4 h-4 stroke-[2.5]" />
                  </div>
                  <div>
                    <h2 className="text-xs sm:text-sm font-black text-[#febd69] uppercase tracking-wider">
                      Otras Temáticas en {ageMeta.h1}
                    </h2>
                    <p className="text-[11px] text-slate-300 hidden sm:block">
                      Explora más alternativas dentro de esta misma etapa
                    </p>
                  </div>
                </div>
                <Link
                  href={`/${ageSlug}`}
                  className="text-xs font-bold text-amber-300 hover:text-white flex items-center gap-1 transition-colors px-3 py-1 rounded-full bg-white/10 border border-white/20 shrink-0"
                >
                  <span>← Ver todas</span>
                </Link>
              </div>

              {/* Grid of Other Subcategories */}
              <div className="p-4 sm:p-5 bg-gradient-to-b from-slate-50/80 via-white to-amber-50/30">
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2.5">
                  {subcategories
                    .filter((s) => s.slug !== categorySlug)
                    .map((sub) => (
                      <Link
                        key={sub.slug}
                        href={`/${ageSlug}/${sub.slug}`}
                        className="group relative flex items-center justify-between p-3 rounded-2xl bg-white hover:bg-[#131921] border-2 border-slate-200 hover:border-[#131921] text-slate-800 hover:text-white transition-all shadow-xs hover:shadow-md hover:-translate-y-0.5 cursor-pointer"
                      >
                        <div className="flex items-center gap-2.5 min-w-0 pr-2">
                          <span className="w-2 h-2 rounded-full bg-amber-500 group-hover:scale-125 transition-transform shrink-0" />
                          <span className="text-xs font-bold truncate group-hover:text-amber-200 transition-colors">
                            {sub.label}
                          </span>
                        </div>
                        <ArrowRight className="w-3.5 h-3.5 text-slate-400 group-hover:text-[#febd69] group-hover:translate-x-1 transition-all shrink-0" />
                      </Link>
                    ))}
                </div>
              </div>
            </div>
          )}

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
              <ShoppingBag className="w-4 h-4 text-amber-500" />
              Envío Rápido Prime
            </span>
          </div>
        </section>

        {/* PRODUCTS GRID */}
        <section className="mb-14">
          {/* TOP 3 PODIUM */}
          {matchedProducts.length >= 3 && (
            <TopPodium products={matchedProducts} filterLabel={currentSub.label} />
          )}

          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-black text-slate-900 flex items-center gap-2">
              <Gift className="w-5 h-5 text-indigo-600" />
              <span>{currentSub.label} ({matchedProducts.length} productos)</span>
            </h2>
          </div>

          {matchedProducts.length > 0 ? (
            <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4 lg:gap-5 mb-12">
              {matchedProducts.map((product) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  currentTheme="classic"
                />
              ))}
              <AmazonGridDiscoveryCard
                selectedCategory={currentSub.label}
                selectedAge={ageMeta.ageId}
              />
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
