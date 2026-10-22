import React from 'react';
import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import ProductCard from '@/components/ProductCard';
import FilterBar from '@/components/FilterBar';
import SeoFaq from '@/components/SeoFaq';
import AmazonLiveSearchCard from '@/components/AmazonLiveSearchCard';
import AmazonGridDiscoveryCard from '@/components/AmazonGridDiscoveryCard';
import ThemeAtmosphere from '@/components/ThemeAtmosphere';
import SocialShareBar from '@/components/SocialShareBar';
import TopPodium from '@/components/TopPodium';
import { PRODUCTS, Product } from '@/data/products';
import { SEO_AGE_ROUTES, getSubcategorySlugMap } from '@/lib/seoRoutes';
import { HUB_OG_SNIPPETS, buildSocialMetadata } from '@/lib/ogMetadata';
import { Sparkles, ShieldCheck, TrendingUp, Gift, ChevronRight } from 'lucide-react';
import Link from 'next/link';

interface PageProps {
  params: Promise<{
    ageSlug: string;
  }>;
}

export async function generateStaticParams() {
  return Object.keys(SEO_AGE_ROUTES).map((ageSlug) => ({
    ageSlug,
  }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { ageSlug } = await params;
  const meta = SEO_AGE_ROUTES[ageSlug];
  if (!meta) return {};

  const snippet = HUB_OG_SNIPPETS[ageSlug];
  const canonicalUrl = `https://unbuenregalo.vercel.app/${ageSlug}`;

  return buildSocialMetadata({
    title: meta.title,
    socialTitle: snippet?.socialTitle || meta.title,
    description: snippet?.description || meta.description,
    canonicalUrl,
    imageUrl: snippet?.imageUrl || 'https://images.unsplash.com/photo-1513542789411-b6a5d4f31634?auto=format&fit=crop&w=1200&h=630&q=85',
    imageAlt: snippet?.imageAlt || meta.h1,
    keywords: meta.keywords,
  });
}

export default async function AgeLandingPage({ params }: PageProps) {
  const { ageSlug } = await params;
  const routeMeta = SEO_AGE_ROUTES[ageSlug];

  if (!routeMeta) {
    notFound();
  }

  // Filter products for this specific age category
  const ageProducts = PRODUCTS.filter((p) => {
    if (routeMeta.ageId === 'reveal') {
      return (
        p.subcategory === 'Fiestas y Revelación de Género' ||
        p.title.toLowerCase().includes('revelación') ||
        p.description.toLowerCase().includes('revelación') ||
        p.searchQuery.toLowerCase().includes('revelacion')
      );
    }
    return p.ageRange === routeMeta.ageId;
  });

  const subcategoryList = getSubcategorySlugMap(routeMeta.ageId);

  // JSON-LD ItemList Schema
  const itemListSchema = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    itemListElement: ageProducts.slice(0, 15).map((p, idx) => ({
      '@type': 'ListItem',
      position: idx + 1,
      name: p.title,
      description: p.description,
      image: `https://unbuenregalo.vercel.app${p.imageUrl}`,
    })),
  };

  // JSON-LD BreadcrumbList Schema
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
        name: routeMeta.h1,
        item: `https://unbuenregalo.vercel.app/${ageSlug}`,
      },
    ],
  };

  return (
    <div className="min-h-screen relative flex flex-col bg-slate-50 text-slate-900 selection:bg-indigo-600 selection:text-white">
      <ThemeAtmosphere />

      {/* JSON-LD Schemas */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />

      <Header currentTheme="classic" />

      <main className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 w-full z-10">
        
        {/* Breadcrumb Navigation */}
        <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-xs font-semibold text-slate-500 mb-6">
          <Link href="/" className="hover:text-indigo-600 transition-colors">Inicio</Link>
          <ChevronRight className="w-3.5 h-3.5" />
          <span className="text-slate-900">{routeMeta.h1}</span>
        </nav>

        {/* HERO SEO SECTION */}
        <section className="text-center py-6 sm:py-8 max-w-4xl mx-auto">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-bold mb-4 shadow-xs border border-slate-200 bg-white/90 backdrop-blur-md text-slate-800">
            <span className="flex h-2 w-2 rounded-full bg-emerald-500 animate-pulse"></span>
            <span>Edición Actualizada {new Date().getFullYear()} • Catálogo Verificado en Amazon</span>
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight leading-[1.15] mb-4 text-slate-900">
            {routeMeta.h1}
          </h1>

          <p className="text-sm sm:text-base text-slate-600 leading-relaxed mb-6 max-w-3xl mx-auto">
            {routeMeta.description}
          </p>

          {/* Subcategory Pill Links for Crawlers and Users */}
          {subcategoryList.length > 0 && (
            <div className="flex flex-wrap items-center justify-center gap-2 mb-8">
              <span className="text-xs font-bold text-slate-400 uppercase tracking-wider mr-1">
                Explorar por temática:
              </span>
              {subcategoryList.map((sub) => (
                <Link
                  key={sub.slug}
                  href={`/${ageSlug}/${sub.slug}`}
                  className="px-3.5 py-1.5 rounded-xl text-xs font-bold bg-white hover:bg-indigo-50 border border-slate-200 hover:border-indigo-300 text-slate-700 hover:text-indigo-600 transition-all shadow-xs"
                >
                  {sub.label}
                </Link>
              ))}
            </div>
          )}

          {/* Trust badges */}
          <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-6 text-xs font-medium text-slate-500">
            <span className="flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-emerald-500" />
              Garantía Oficial Amazon.es
            </span>
            <span className="flex items-center gap-1.5">
              <TrendingUp className="w-4 h-4 text-indigo-500" />
              Valoraciones 4.5+ Estrellas
            </span>
            <span className="flex items-center gap-1.5">
              <Sparkles className="w-4 h-4 text-amber-500" />
              Precios y Stock Actualizados
            </span>
          </div>
        </section>

        {/* SOCIAL SHARE WIDGET */}
        <SocialShareBar />

        {/* PRODUCTS GRID */}
        <section className="mb-14">
          {/* TOP 3 PODIUM */}
          <TopPodium products={ageProducts} filterLabel={routeMeta.h1} />

          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-black text-slate-900 flex items-center gap-2">
              <Gift className="w-5 h-5 text-indigo-600" />
              <span>Productos Recomendados ({ageProducts.length} ideas)</span>
            </h2>
            <Link
              href="/"
              className="text-xs font-bold text-indigo-600 hover:text-indigo-800 hover:underline"
            >
              ← Ver todas las edades
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 mb-12">
            {ageProducts.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                currentTheme="classic"
              />
            ))}
            <AmazonGridDiscoveryCard
              selectedAge={routeMeta.ageId}
            />
          </div>

          {/* Amazon live card for custom search */}
          <AmazonLiveSearchCard
            currentTheme="classic"
            initialQuery={routeMeta.keywords[0] || 'regalos infantiles'}
          />
        </section>

        {/* SEO FAQ SECTION */}
        <SeoFaq currentTheme="classic" />

      </main>

      <Footer currentTheme="classic" />
    </div>
  );
}
