'use client';

import React, { useState, useMemo } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import ProductCard from '@/components/ProductCard';
import TopPodium from '@/components/TopPodium';
import { PRODUCTS, Product } from '@/data/products';
import { parsePrice } from '@/lib/amazon';
import { generateProductItemListSchema } from '@/lib/schemaProduct';
import { Tag, Sparkles, HelpCircle, ShieldCheck, Heart, ArrowUpDown, CheckCircle2, Compass } from 'lucide-react';
import Link from 'next/link';

export default function Under20Client() {
  const [selectedSubcat, setSelectedSubcat] = useState<string>('all');
  const [sortBy, setSortBy] = useState<'featured' | 'price-asc' | 'price-desc' | 'rating'>('featured');
  const [searchQuery, setSearchQuery] = useState('');
  const [isFocused, setIsFocused] = useState(false);

  // Filter products whose numeric price is > 0 and <= 20 euros
  const under20Products = useMemo(() => {
    return PRODUCTS.filter((p) => {
      const price = parsePrice(p.priceText);
      return price > 0 && price <= 20;
    });
  }, []);

  // Unique categories/subcategories available in under 20 pool
  const availableSubcategories = useMemo(() => {
    const set = new Set<string>();
    under20Products.forEach((p) => {
      if (p.subcategory) set.add(p.subcategory);
      else if (p.category) set.add(p.category);
    });
    return Array.from(set).sort();
  }, [under20Products]);

  // Filtered by subcategory and optional search
  const filteredProducts = useMemo(() => {
    return under20Products.filter((p) => {
      if (selectedSubcat !== 'all') {
        const matchesCat = p.subcategory === selectedSubcat || p.category === selectedSubcat;
        if (!matchesCat) return false;
      }
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const text = `${p.title} ${p.description || ''} ${p.searchQuery || ''}`.toLowerCase();
        if (!text.includes(q)) return false;
      }
      return true;
    });
  }, [under20Products, selectedSubcat, searchQuery]);

  // Sorted
  const sortedProducts = useMemo(() => {
    const list = [...filteredProducts];
    if (sortBy === 'price-asc') {
      list.sort((a, b) => parsePrice(a.priceText) - parsePrice(b.priceText));
    } else if (sortBy === 'price-desc') {
      list.sort((a, b) => parsePrice(b.priceText) - parsePrice(a.priceText));
    } else if (sortBy === 'rating') {
      list.sort((a, b) => (b.rating || 0) - (a.rating || 0));
    } else {
      // featured: reviews * rating
      list.sort((a, b) => ((b.reviewsCount || 0) * (b.rating || 1)) - ((a.reviewsCount || 0) * (a.rating || 1)));
    }
    return list;
  }, [filteredProducts, sortBy]);

  // Schema FAQPage for Google Rich Snippets
  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name: '¿Qué se puede regalar por menos de 20 euros?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Por menos de 20 euros puedes encontrar juegos de mesa súper adictivos como Virus! o Dobble, auriculares inalámbricos de gran autonomía, tazas térmicas de viaje, libros de desarrollo personal como Hábitos Atómicos, lámparas LED decorativas y accesorios de tecnología.',
        },
      },
      {
        '@type': 'Question',
        name: '¿Cómo acertar con un regalo económico sin que parezca barato?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'La clave está en elegir un regalo de máxima calidad en su categoría: en lugar de un reloj inteligente barato de 20€ que se romperá, regala el mejor juego de mesa de 15€, una colonia de marca en formato viaje o un accesorio barista de acero inoxidable.',
        },
      },
      {
        '@type': 'Question',
        name: '¿Cuáles son los mejores regalos de amigo invisible por 20 euros?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Para el amigo invisible triunfan los regalos universales y divertidos: juegos de cartas rápidos para jugar con amigos, tazas inteligentes para el café, botellas térmicas de doble pared o calcetines y gadgets con diseño humorístico de alta valoración en Amazon.',
        },
      },
    ],
  };

  // Schema ItemList for Google Product Stars
  const itemListSchema = useMemo(() => {
    return generateProductItemListSchema(sortedProducts, 'Regalos por Menos de 20 Euros');
  }, [sortedProducts]);

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 flex flex-col font-sans">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListSchema) }}
      />

      <Header
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
      />

      {/* Hero Banner */}
      <section className="bg-gradient-to-r from-emerald-900 via-teal-900 to-slate-900 text-white py-10 px-4 sm:px-6 lg:px-8 border-b border-emerald-800/40">
        <div className="max-w-6xl mx-auto text-center space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/20 border border-emerald-400/30 text-emerald-300 text-xs font-bold uppercase tracking-wider">
            <Tag className="w-3.5 h-3.5" />
            <span>Guía Oficial de Regalos Económicos 2026</span>
          </div>
          <h1 className="text-2xl sm:text-4xl lg:text-5xl font-black tracking-tight">
            Regalos por Menos de 20 Euros
          </h1>
          <p className="text-xs sm:text-sm text-emerald-100/90 max-w-2xl mx-auto leading-relaxed">
            Las ideas de regalo más originales, valoradas y sorprendentes con presupuesto ajustado. Ideales para cumpleaños, aniversarios, amigo invisible y detalles con envío en 24h.
          </p>
        </div>
      </section>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 flex-1 w-full">
        {/* PODIUM 3D FOR BEST UNDER 20 GIFTS */}
        <div className="mb-8">
          <TopPodium
            products={under20Products}
            filterLabel="Regalos < 20€"
          />
        </div>

        {/* Filters and Sorting Bar */}
        <div className="bg-white p-4 rounded-2xl border border-slate-200/80 shadow-xs mb-6 flex flex-wrap items-center justify-between gap-3">
          {/* Subcategory Pills */}
          <div className="flex items-center gap-1.5 overflow-x-auto scrollbar-none py-1 max-w-full">
            <button
              type="button"
              onClick={() => setSelectedSubcat('all')}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap transition-all cursor-pointer ${
                selectedSubcat === 'all'
                  ? 'bg-emerald-600 text-white shadow-xs'
                  : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
              }`}
            >
              Todos ({under20Products.length})
            </button>
            {availableSubcategories.slice(0, 8).map((cat) => (
              <button
                key={cat}
                type="button"
                onClick={() => setSelectedSubcat(cat)}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap transition-all cursor-pointer ${
                  selectedSubcat === cat
                    ? 'bg-emerald-600 text-white shadow-xs'
                    : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Sorting */}
          <div className="flex items-center gap-2 shrink-0">
            <ArrowUpDown className="w-4 h-4 text-slate-400" />
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as any)}
              className="text-xs font-bold bg-slate-50 border border-slate-200 rounded-xl px-3 py-1.5 focus:outline-hidden focus:ring-2 focus:ring-emerald-500 cursor-pointer"
            >
              <option value="featured">Más recomendados</option>
              <option value="price-asc">Precio: Más barato</option>
              <option value="price-desc">Precio: Más alto (&lt;20€)</option>
              <option value="rating">Mejor valoración</option>
            </select>
          </div>
        </div>

        {/* Product Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-2 sm:gap-2.5 lg:gap-3 mb-12">
          {sortedProducts.map((product) => (
            <ProductCard key={product.id} product={product} currentTheme="classic" />
          ))}
        </div>

        {/* SEO Editorial Content Block for Google Top Ranking */}
        <section className="mt-14 pt-8 border-t border-slate-200 bg-white p-6 sm:p-8 rounded-3xl border shadow-xs space-y-6">
          <div>
            <h2 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight mb-2">
              ¿Cómo acertar con un regalo de menos de 20 euros?
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              Tener un presupuesto fijado en <strong>20 euros</strong> no significa conformarse con un detalle mediocre. De hecho, en el comercio online actual, este rango de precio concentra algunos de los productos con mayor índice de satisfacción y miles de opiniones de 5 estrellas en Amazon. El truco editorial de <strong>Un Buen Regalo</strong> consiste en elegir el <em>«número uno absoluto»</em> de una categoría accesible en vez de una imitación barata de un artículo de gama alta.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 text-xs sm:text-sm text-slate-600">
            <div className="p-4 rounded-2xl bg-emerald-50/60 border border-emerald-100 space-y-1.5">
              <h3 className="font-bold text-slate-900 flex items-center gap-1.5 text-sm">
                <span>🎲</span> Juegos de Mesa Adictivos
              </h3>
              <p className="text-xs leading-relaxed">
                Juegos como <strong>Virus!</strong> o <strong>Dobble</strong> cuestan entre 12€ y 15€ y ofrecen horas de diversión garantizada para familias, fiestas o reuniones con amigos. Son el regalo estrella por excelencia.
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-teal-50/60 border border-teal-100 space-y-1.5">
              <h3 className="font-bold text-slate-900 flex items-center gap-1.5 text-sm">
                <span>🎧</span> Tecnología Práctica
              </h3>
              <p className="text-xs leading-relaxed">
                Auriculares inalámbricos con Bluetooth 5.3, soportes magnéticos para móvil con carga rápida o lámparas LED de escritorio con batería recargable que parecen costar más del triple de su precio real.
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-1.5">
              <h3 className="font-bold text-slate-900 flex items-center gap-1.5 text-sm">
                <span>☕</span> Experiencia y Hogar
              </h3>
              <p className="text-xs leading-relaxed">
                Tazas térmicas herméticas de acero inoxidable, espumadores de leche eléctricos para café barista o difusores de aromas con aceites esenciales para crear ambientes acogedores.
              </p>
            </div>
          </div>

          {/* Preguntas Frecuentes FAQ Rich Snippets */}
          <div className="pt-4 border-t border-slate-100">
            <h3 className="text-base font-extrabold text-slate-900 mb-4 flex items-center gap-2">
              <HelpCircle className="w-4 h-4 text-emerald-600" />
              <span>Preguntas Frecuentes sobre Regalos Económicos</span>
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200/80 space-y-1">
                <h4 className="font-bold text-slate-900">¿Llegan a tiempo los regalos para el Amigo Invisible?</h4>
                <p className="text-slate-600 leading-relaxed">
                  Sí, la gran mayoría de artículos recomendados cuentan con envío prioritario Prime de Amazon en 24 horas, garantizando que recibas tu paquete antes de tu evento o cena navideña.
                </p>
              </div>
              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200/80 space-y-1">
                <h4 className="font-bold text-slate-900">¿Se pueden devolver si a la persona no le gusta?</h4>
                <p className="text-slate-600 leading-relaxed">
                  Totalmente. Al tramitarse directamente en Amazon España, dispones del período oficial de devoluciones de 30 días con reembolso íntegro y sin complicaciones.
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer currentTheme="classic" />
    </div>
  );
}
