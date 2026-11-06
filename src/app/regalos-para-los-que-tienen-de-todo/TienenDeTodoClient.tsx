'use client';

import React, { useState, useMemo } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import ProductCard from '@/components/ProductCard';
import TopPodium from '@/components/TopPodium';
import { PRODUCTS, Product } from '@/data/products';
import { generateProductItemListSchema } from '@/lib/schemaProduct';
import { Sparkles, HelpCircle, Gift, Compass, Lightbulb, ArrowUpDown } from 'lucide-react';
import Link from 'next/link';

export default function TienenDeTodoClient() {
  const [sortBy, setSortBy] = useState<'featured' | 'rating' | 'reviews'>('featured');
  const [searchQuery, setSearchQuery] = useState('');

  // Curate products that are unique, innovative, high-rating, or experience-based
  const curiousProducts = useMemo(() => {
    return PRODUCTS.filter((p) => {
      const text = `${p.title} ${p.description || ''} ${p.category || ''} ${p.subcategory || ''}`.toLowerCase();
      const isCurious =
        text.includes('smartbox') ||
        text.includes('experiencia') ||
        text.includes('gadget') ||
        text.includes('barista') ||
        text.includes('cafeter') ||
        text.includes('dron') ||
        text.includes('drone') ||
        text.includes('led') ||
        text.includes('retro') ||
        text.includes('lego') ||
        text.includes('juego') ||
        text.includes('altavoz') ||
        text.includes('proyector') ||
        text.includes('termic') ||
        text.includes('térmic') ||
        (p.rating && p.rating >= 4.7 && (p.reviewsCount || 0) > 1000);
      return isCurious;
    });
  }, []);

  const sortedProducts = useMemo(() => {
    const list = [...curiousProducts];
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      return list.filter((p) =>
        `${p.title} ${p.description || ''}`.toLowerCase().includes(q)
      );
    }
    if (sortBy === 'rating') {
      list.sort((a, b) => (b.rating || 0) - (a.rating || 0));
    } else if (sortBy === 'reviews') {
      list.sort((a, b) => (b.reviewsCount || 0) - (a.reviewsCount || 0));
    } else {
      list.sort((a, b) => ((b.reviewsCount || 0) * (b.rating || 1)) - ((a.reviewsCount || 0) * (a.rating || 1)));
    }
    return list;
  }, [curiousProducts, sortBy, searchQuery]);

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name: '¿Qué se le regala a alguien que ya lo tiene todo?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'A quien tiene de todo no se le regalan objetos básicos, sino experiencias (escapadas con encanto, catas gastronómicas), versiones premium de cosas cotidianas (cafeteras espresso manuales, vasos térmicos de titanio) o artículos que despierten nostalgia y curiosidad (sets de construcción para adultos, juegos de mesa modernos).',
        },
      },
      {
        '@type': 'Question',
        name: '¿Es mejor regalar una experiencia o un regalo material?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Si la persona es minimalista o tiene poco espacio en casa, una caja de experiencias como Smartbox o una cena gourmet es el acierto seguro. Si prefieres un objeto físico, opta por gadgets tecnológicos innovadores que resuelvan un problema que ni siquiera sabía que tenía.',
        },
      },
      {
        '@type': 'Question',
        name: '¿Cómo sorprender a un padre o madre que dice que no quiere nada?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'El mejor regalo para quienes dicen no necesitar nada son los detalles que mejoran su confort diario: almohadas de masaje cervical, difusores ultrasónicos de aceites esenciales o libros superventas inspiradores.',
        },
      },
    ],
  };

  // Schema ItemList for Google Product Stars
  const itemListSchema = useMemo(() => {
    return generateProductItemListSchema(sortedProducts, 'Regalos para los que Tienen de Todo');
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
      <section className="bg-gradient-to-r from-purple-950 via-indigo-950 to-slate-900 text-white py-10 px-4 sm:px-6 lg:px-8 border-b border-purple-800/40">
        <div className="max-w-6xl mx-auto text-center space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-500/20 border border-purple-400/30 text-purple-300 text-xs font-bold uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Selección Editorial de Sorpresas Únicas 2026</span>
          </div>
          <h1 className="text-2xl sm:text-4xl lg:text-5xl font-black tracking-tight">
            Un Buen Regalo para los que Tienen de Todo: Ideas de Regalos Únicas
          </h1>
          <p className="text-xs sm:text-sm text-purple-100/90 max-w-2xl mx-auto leading-relaxed">
            ¿Es imposible encontrarle algo? Aquí tienes ideas fuera de lo común: tecnología curiosa, experiencias inolvidables y regalos que jamás se comprarían por sí mismos.
          </p>
        </div>
      </section>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 flex-1 w-full">
        {/* PODIUM */}
        <div className="mb-8">
          <TopPodium
            products={curiousProducts}
            filterLabel="Tienen de Todo"
          />
        </div>

        {/* Sorting Bar */}
        <div className="bg-white p-4 rounded-2xl border border-slate-200/80 shadow-xs mb-6 flex items-center justify-between gap-3">
          <div className="flex items-center gap-2 text-xs font-bold text-slate-700">
            <Gift className="w-4 h-4 text-purple-600" />
            <span>Mostrando {sortedProducts.length} ideas sorprendentes</span>
          </div>

          <div className="flex items-center gap-2">
            <ArrowUpDown className="w-4 h-4 text-slate-400" />
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as any)}
              className="text-xs font-bold bg-slate-50 border border-slate-200 rounded-xl px-3 py-1.5 focus:outline-hidden focus:ring-2 focus:ring-purple-500 cursor-pointer"
            >
              <option value="featured">Más sorprendentes</option>
              <option value="rating">Mayor valoración (5★)</option>
              <option value="reviews">Más vendidos (+10.000 opiniones)</option>
            </select>
          </div>
        </div>

        {/* Product Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-2 sm:gap-2.5 lg:gap-3 mb-12">
          {sortedProducts.map((product) => (
            <ProductCard key={product.id} product={product} currentTheme="classic" />
          ))}
        </div>

        {/* SEO Editorial Content */}
        <section className="mt-14 pt-8 border-t border-slate-200 bg-white p-6 sm:p-8 rounded-3xl border shadow-xs space-y-6">
          <div>
            <h2 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight mb-2">
              El secreto para regalar a quien no necesita nada
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              Todos tenemos en la familia o en el grupo de amigos a esa persona que ya se compra todo lo que quiere en el momento en que sale. Intentar regalarle ropa básica o un perfume comercial suele terminar en un ticket regalo en el cajón. La estrategia psicológica de <strong>Un Buen Regalo</strong> para triunfar en estos casos se basa en tres reglas infalibles:
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 text-xs sm:text-sm text-slate-600">
            <div className="p-4 rounded-2xl bg-purple-50/60 border border-purple-100 space-y-1.5">
              <h3 className="font-bold text-slate-900 flex items-center gap-1.5 text-sm">
                <span>✨</span> La regla del «Capricho Culpable»
              </h3>
              <p className="text-xs leading-relaxed">
                Regálale algo que le haga ilusión pero que le dé reparo comprarse a sí mismo por considerarlo un lujo innecesario: un molinillo de café cerámico de precisión, una lámpara retro de lava o un set de LEGO para adultos.
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-indigo-50/60 border border-indigo-100 space-y-1.5">
              <h3 className="font-bold text-slate-900 flex items-center gap-1.5 text-sm">
                <span>🎟️</span> Experiencias Inolvidables
              </h3>
              <p className="text-xs leading-relaxed">
                Los recuerdos no ocupan espacio en el armario. Una escapada rural con spa, una cata de vinos o una noche bajo las estrellas con cajas de regalo <strong>Smartbox</strong> garantizan una experiencia que recordará toda la vida.
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-1.5">
              <h3 className="font-bold text-slate-900 flex items-center gap-1.5 text-sm">
                <span>💡</span> Gadgets que Solucionan la Vida
              </h3>
              <p className="text-xs leading-relaxed">
                Dispositivos de domótica, mini proyectores portátiles o cargadores inalámbricos 3 en 1 para la mesilla de noche que simplifican el día a día y sorprenden desde el primer uso.
              </p>
            </div>
          </div>

          <div className="pt-4 border-t border-slate-100">
            <h3 className="text-base font-extrabold text-slate-900 mb-4 flex items-center gap-2">
              <HelpCircle className="w-4 h-4 text-purple-600" />
              <span>Preguntas Frecuentes sobre Regalos Difíciles</span>
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200/80 space-y-1">
                <h4 className="font-bold text-slate-900">¿Qué regalar a un hombre que tiene de todo?</h4>
                <p className="text-slate-600 leading-relaxed">
                  Los gadgets prácticos para el coche, multiherramientas suizas de bolsillo, kits de cuidado de barba o accesorios para amantes de la carne y barbacoas son aciertos probados con valoraciones sobresalientes.
                </p>
              </div>
              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200/80 space-y-1">
                <h4 className="font-bold text-slate-900">¿Y a una mujer que no pide nada?</h4>
                <p className="text-slate-600 leading-relaxed">
                  Cajas de cuidado personal tipo spa en casa, tazas inteligentes con calentador constante, libros inspiradores o lámparas de noche con luz cálida y altavoz Bluetooth integrado.
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
