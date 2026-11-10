'use client';

import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import {
  GTA_PRODUCTS,
  GTA_CATEGORIES,
  GTA_PRICE_RANGES,
  GtaProduct,
} from '@/data/gtaData';
import { getAmazonProductUrl } from '@/lib/amazon';
import { useCurrency } from '@/context/CurrencyContext';
import { useVoting } from '@/context/VotingContext';
import {
  Gamepad2,
  Flame,
  Star,
  Heart,
  Share2,
  ExternalLink,
  ShieldCheck,
  CheckCircle2,
  ShoppingBag,
  HelpCircle,
  ChevronRight,
  Zap,
  Info,
} from 'lucide-react';

export default function RegalosGta6Page() {
  const { formatPrice, amazonRegion, amazonSiteName } = useCurrency();
  const { toggleItem, isItemInList } = useVoting();
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedPrice, setSelectedPrice] = useState<string>('all');
  const [copiedId, setCopiedId] = useState<string | null>(null);

  // Filter products by category and price
  const filteredProducts = useMemo(() => {
    return GTA_PRODUCTS.filter((prod) => {
      if (selectedCategory !== 'all' && prod.category !== selectedCategory) return false;
      if (selectedPrice !== 'all') {
        if (selectedPrice === '<20' && prod.priceNumeric >= 20) return false;
        if (selectedPrice === '20-50' && (prod.priceNumeric < 20 || prod.priceNumeric > 50)) return false;
        if (selectedPrice === '50-100' && (prod.priceNumeric < 50 || prod.priceNumeric > 100)) return false;
        if (selectedPrice === '>100' && prod.priceNumeric <= 100) return false;
      }
      return true;
    });
  }, [selectedCategory, selectedPrice]);

  const handleShare = async (e: React.MouseEvent, prod: GtaProduct) => {
    e.preventDefault();
    e.stopPropagation();
    const url = getAmazonProductUrl(prod.asin, prod.searchQuery || prod.title, amazonRegion);
    if (navigator.share) {
      try {
        await navigator.share({
          title: `${prod.title} | Regalos GTA 6 en Un Buen Regalo`,
          text: prod.description,
          url,
        });
      } catch {
        navigator.clipboard.writeText(url);
        setCopiedId(prod.id);
        setTimeout(() => setCopiedId(null), 2000);
      }
    } else {
      navigator.clipboard.writeText(url);
      setCopiedId(prod.id);
      setTimeout(() => setCopiedId(null), 2000);
    }
  };

  // Structured Data Schema.org
  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'CollectionPage',
        '@id': 'https://www.unbuenregalo.es/regalos-gta-6#webpage',
        url: 'https://www.unbuenregalo.es/regalos-gta-6',
        name: 'Regalos GTA 6 y Merchandising GTA VI | Ideas Grand Theft Auto',
        alternateName: [
          'GTA VI',
          'GTA 6',
          'Grand Theft Auto VI',
          'Grand Theft Auto 6',
          'Merchandising GTA 6',
          'Regalos GTA VI Vice City',
        ],
        description:
          'Catálogo exclusivo de regalos para fans de GTA 6 (Grand Theft Auto VI): mandos PS5 Nova Pink, lámparas neón Vice City, ropa retro y accesorios setup en Amazon.',
        inLanguage: 'es-ES',
        isPartOf: {
          '@type': 'WebSite',
          '@id': 'https://www.unbuenregalo.es/#website',
          name: 'Un Buen Regalo',
          url: 'https://www.unbuenregalo.es',
        },
      },
      {
        '@type': 'BreadcrumbList',
        itemListElement: [
          {
            '@type': 'ListItem',
            position: 1,
            name: 'Inicio',
            item: 'https://www.unbuenregalo.es',
          },
          {
            '@type': 'ListItem',
            position: 2,
            name: 'Gaming & Setup',
            item: 'https://www.unbuenregalo.es/gaming',
          },
          {
            '@type': 'ListItem',
            position: 3,
            name: 'Regalos GTA 6 / GTA VI',
            item: 'https://www.unbuenregalo.es/regalos-gta-6',
          },
        ],
      },
      {
        '@type': 'ItemList',
        name: 'Catálogo de Regalos y Merchandising GTA 6 y GTA VI',
        itemListElement: GTA_PRODUCTS.map((prod, index) => ({
          '@type': 'ListItem',
          position: index + 1,
          name: prod.title,
          url: getAmazonProductUrl(prod.asin, prod.searchQuery || prod.title, amazonRegion),
          image: prod.imageUrl,
          offers: {
            '@type': 'Offer',
            priceCurrency: 'EUR',
            price: prod.priceNumeric,
            availability: 'https://schema.org/InStock',
            validFrom: '2026-01-01',
            priceValidUntil: '2026-12-31',
            seller: {
              '@type': 'Organization',
              name: 'Amazon',
            },
            hasMerchantReturnPolicy: {
              '@type': 'MerchantReturnPolicy',
              applicableCountry: 'ES',
              returnPolicyCategory: 'https://schema.org/MerchantReturnFiniteReturnWindow',
              merchantReturnDays: 30,
              returnMethod: 'https://schema.org/ReturnByMail',
              returnFees: 'https://schema.org/FreeReturn',
            },
            shippingDetails: {
              '@type': 'OfferShippingDetails',
              shippingRate: {
                '@type': 'MonetaryAmount',
                value: '0.00',
                currency: 'EUR',
              },
              shippingDestination: {
                '@type': 'DefinedRegion',
                addressCountry: 'ES',
              },
              deliveryTime: {
                '@type': 'ShippingDeliveryTime',
                handlingTime: {
                  '@type': 'QuantitativeValue',
                  minValue: 0,
                  maxValue: 1,
                  unitCode: 'DAY',
                },
                transitTime: {
                  '@type': 'QuantitativeValue',
                  minValue: 1,
                  maxValue: 3,
                  unitCode: 'DAY',
                },
              },
            },
          },
        })),
      },
      {
        '@type': 'FAQPage',
        mainEntity: [
          {
            '@type': 'Question',
            name: '¿Cuándo sale GTA 6 y para qué plataformas estará disponible?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'Grand Theft Auto VI (GTA 6) está previsto por Rockstar Games para su lanzamiento en consolas de nueva generación: PlayStation 5 y Xbox Series X|S. Más adelante se espera su correspondiente adaptación para PC.',
            },
          },
          {
            '@type': 'Question',
            name: '¿Qué regalar a un fanático de GTA 6 o de la saga Grand Theft Auto?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'Las mejores opciones de regalo incluyen: mandos inalámbricos DualSense para PS5 en colores temáticos como Nova Pink o Galactic Purple, lámparas de neón LED estilo Vice City con palmeras o atardeceres ochenteros, alfombrillas gaming XXL synthwave, camisetas de algodón retro de Miami y tarjetas de saldo PlayStation Store o Xbox para reservar el juego el primer día.',
            },
          },
          {
            '@type': 'Question',
            name: '¿Por qué la estética de Vice City es el mejor estilo para un setup gamer?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'La ambientación de GTA VI rescata el ambiente retro-futurista de Vice City inspirado en Miami en los 80: contrastes intensos de fucsia neón, azul cian, siluetas de palmeras y coches deportivos. Esta paleta RGB es actualmente la tendencia número 1 en decoración de escritorios de streaming y videojuegos.',
            },
          },
          {
            '@type': 'Question',
            name: '¿Son seguros y oficiales los productos recomendados?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'Todos los productos mostrados en nuestra guía se compran directamente a través de Amazon con garantía de devolución oficial de 30 días, envío rápido Prime y máxima seguridad en el pago.',
            },
          },
        ],
      },
    ],
  };

  return (
    <div className="min-h-screen bg-[#0a0c16] text-slate-100 selection:bg-[#ff2a85] selection:text-white flex flex-col">
      {/* Schema.org Injected LD+JSON */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <Header currentTheme="gamer" />

      {/* Hero Section con Estética Neón Vice City */}
      <section className="relative overflow-hidden pt-8 pb-14 border-b border-purple-900/40 bg-gradient-to-b from-[#131127] via-[#0f0e22] to-[#0a0c16]">
        {/* Luces de Fondo Neón */}
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-[#ff2a85]/15 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute top-1/3 right-1/4 w-96 h-96 bg-[#00f0ff]/15 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          
          {/* Breadcrumbs */}
          <nav aria-label="Breadcrumb" className="mb-6 flex items-center gap-2 text-xs text-slate-300">
            <Link href="/" className="hover:text-pink-300 transition-colors">
              Inicio
            </Link>
            <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
            <Link href="/gaming" className="hover:text-pink-300 transition-colors">
              Gaming & Setup
            </Link>
            <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
            <span className="text-pink-300 font-semibold">Regalos GTA 6 / GTA VI</span>
          </nav>

          {/* Insignia Vice City */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-gradient-to-r from-pink-500/20 via-purple-500/20 to-cyan-500/20 border border-pink-500/40 text-pink-300 font-black text-xs tracking-wider uppercase mb-5 shadow-[0_0_20px_rgba(255,42,133,0.25)]">
            <span>🌴</span>
            <span>Vice City Edition • Grand Theft Auto VI & GTA 6</span>
            <span className="w-1.5 h-1.5 rounded-full bg-pink-400 animate-pulse" />
          </div>

          {/* H1 SEO Optimizado para GTA 6 y GTA VI */}
          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black tracking-tight text-white mb-6 leading-tight">
            Un Buen Regalo para Fans de{' '}
            <span className="bg-gradient-to-r from-[#ff2a85] via-[#ff7300] to-[#00f0ff] bg-clip-text text-transparent drop-shadow-[0_0_35px_rgba(255,42,133,0.4)]">
              GTA 6
            </span>: Ideas de Regalos y Merch{' '}
            <span className="bg-gradient-to-r from-[#00f0ff] to-[#a855f7] bg-clip-text text-transparent">
              GTA VI
            </span>
          </h1>

          <p className="max-w-3xl text-sm sm:text-base text-slate-300 leading-relaxed mb-8">
            Prepárate para el lanzamiento más esperado de la historia de los videojuegos en <strong>{amazonSiteName}</strong>. 
            Hemos seleccionado los mandos de <strong>PS5 Nova Pink</strong>, luces de <strong>neón Vice City</strong> para tu setup gamer, 
            camisetas retro de los 80, figuras coleccionables y <strong>tarjetas de saldo</strong> para asegurar la reserva de <strong>Grand Theft Auto VI</strong> desde el primer minuto.
          </p>

          {/* Trust Highlights */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 max-w-4xl pt-2">
            <div className="p-3 rounded-xl bg-slate-900/60 border border-slate-800 flex items-center gap-2.5">
              <ShoppingBag className="w-4 h-4 text-pink-400 shrink-0" />
              <span className="text-xs text-slate-300 font-semibold">Envío Prime Rápido</span>
            </div>
            <div className="p-3 rounded-xl bg-slate-900/60 border border-slate-800 flex items-center gap-2.5">
              <ShieldCheck className="w-4 h-4 text-cyan-400 shrink-0" />
              <span className="text-xs text-slate-300 font-semibold">Garantía 30 Días</span>
            </div>
            <div className="p-3 rounded-xl bg-slate-900/60 border border-slate-800 flex items-center gap-2.5">
              <Zap className="w-4 h-4 text-amber-400 shrink-0" />
              <span className="text-xs text-slate-300 font-semibold">Precios al Minuto</span>
            </div>
            <div className="p-3 rounded-xl bg-slate-900/60 border border-slate-800 flex items-center gap-2.5">
              <Gamepad2 className="w-4 h-4 text-purple-400 shrink-0" />
              <span className="text-xs text-slate-300 font-semibold">PS5, Xbox & PC</span>
            </div>
          </div>

        </div>
      </section>

      {/* Main Content & Products */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 flex-1 w-full">
        
        {/* Banner Reserva Rápida */}
        <div className="mb-10 p-5 rounded-2xl bg-gradient-to-r from-purple-950/70 via-slate-900 to-pink-950/50 border border-pink-500/30 flex flex-col sm:flex-row items-center justify-between gap-4 shadow-xl">
          <div className="flex items-center gap-3.5">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-pink-600 to-purple-700 flex items-center justify-center shrink-0 shadow-lg text-xl">
              🎮
            </div>
            <div>
              <p className="text-sm sm:text-base font-black text-white">
                ¿Planeas reservar GTA VI el día que abran la preventa?
              </p>
              <p className="text-xs text-slate-300">
                Consigue tarjetas de saldo de PlayStation Store y Xbox con código digital inmediato para tener la cartera lista.
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={() => setSelectedCategory('juego')}
            className="shrink-0 px-5 py-2.5 rounded-xl bg-gradient-to-r from-pink-600 to-purple-700 hover:from-pink-700 hover:to-purple-800 text-white font-bold text-xs shadow-md transition-all hover:scale-105 cursor-pointer whitespace-nowrap"
          >
            Ver Tarjetas de Saldo
          </button>
        </div>

        {/* Filtros por Categoría */}
        <div className="mb-6">
          <div className="flex items-center justify-between mb-3">
            <h2 className="text-xs font-bold uppercase tracking-wider text-pink-300">
              Filtrar por Categoría de Regalo
            </h2>
            <span className="text-xs text-slate-300">
              {filteredProducts.length} productos listos en Amazon
            </span>
          </div>

          <div className="flex flex-wrap gap-2">
            {GTA_CATEGORIES.map((cat) => {
              const isActive = selectedCategory === cat.id;
              return (
                <button
                  key={cat.id}
                  type="button"
                  onClick={() => setSelectedCategory(cat.id)}
                  className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                    isActive
                      ? 'bg-gradient-to-r from-pink-600 to-purple-700 text-white shadow-[0_0_15px_rgba(255,42,133,0.4)] border border-pink-400'
                      : 'bg-slate-900/80 hover:bg-slate-800 text-slate-200 border border-slate-800 hover:border-slate-700'
                  }`}
                >
                  <span>{cat.icon}</span>
                  <span>{cat.label}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Filtros por Precio */}
        <div className="mb-10 flex flex-wrap items-center gap-2 pb-6 border-b border-slate-800">
          <span className="text-xs text-slate-300 font-medium mr-2">Presupuesto:</span>
          {GTA_PRICE_RANGES.map((pr) => {
            const isActive = selectedPrice === pr.id;
            return (
              <button
                key={pr.id}
                type="button"
                onClick={() => setSelectedPrice(pr.id)}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                  isActive
                    ? 'bg-cyan-500/20 text-cyan-200 border border-cyan-400/50'
                    : 'bg-slate-900/60 text-slate-300 hover:text-slate-100 border border-slate-800/80'
                }`}
              >
                {pr.label}
              </button>
            );
          })}
        </div>

        {/* Grid de Productos */}
        {filteredProducts.length === 0 ? (
          <div className="text-center py-16 bg-slate-900/40 rounded-2xl border border-slate-800">
            <p className="text-slate-300 text-sm mb-4">
              No hay productos con este rango de precio en esta categoría.
            </p>
            <button
              type="button"
              onClick={() => {
                setSelectedCategory('all');
                setSelectedPrice('all');
              }}
              className="px-4 py-2 rounded-xl bg-pink-500/20 text-pink-200 font-bold text-xs border border-pink-500/30 hover:bg-pink-500/30 transition-colors cursor-pointer"
            >
              Restablecer Filtros
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredProducts.map((prod) => {
              const amazonUrl = getAmazonProductUrl(prod.asin, prod.searchQuery || prod.title, amazonRegion);
              const isInVote = isItemInList(prod.id);

              return (
                <GtaProductCard
                  key={prod.id}
                  prod={prod}
                  amazonUrl={amazonUrl}
                  isInVote={isInVote}
                  isCopied={copiedId === prod.id}
                  onToggleVote={() => {
                    toggleItem({
                      id: prod.id,
                      asin: prod.asin,
                      title: prod.title,
                      slug: prod.id,
                      category: 'Gaming',
                      subcategory: prod.categoryLabel,
                      ageRange: '+18',
                      gender: 'unisex',
                      priceText: prod.priceText,
                      priceRange: prod.priceNumeric < 20 ? '<20' : prod.priceNumeric <= 50 ? '20-50' : prod.priceNumeric <= 100 ? '50-100' : '>100',
                      description: prod.description,
                      imageUrl: prod.imageUrl,
                      rating: prod.rating,
                      reviewsCount: prod.reviewsCount,
                      badge: prod.badge,
                      searchQuery: prod.searchQuery,
                      pros: prod.pros,
                      idealFor: prod.idealFor,
                      style: 'gamer',
                    });
                  }}
                  onShare={(e) => handleShare(e, prod)}
                  formatPrice={formatPrice}
                />
              );
            })}
          </div>
        )}

        {/* Sección Informativa / Guía SEO de Compra GTA 6 & GTA VI */}
        <section className="mt-20 pt-12 border-t border-slate-800">
          <div className="max-w-4xl mx-auto">
            
            <div className="text-center mb-12">
              <span className="text-xs font-black uppercase tracking-wider text-pink-400 mb-2 block">
                Guía del Jugador
              </span>
              <h2 className="text-2xl sm:text-3xl font-black text-white mb-4">
                Todo lo que debes saber sobre Regalos y Merchandising de Grand Theft Auto VI
              </h2>
              <p className="text-sm text-slate-300">
                Preguntas frecuentes resueltas para acertar con el regalo de un fanático de GTA 6 en cumpleaños, Navidad o lanzamiento.
              </p>
            </div>

            <div className="space-y-4">
              
              {/* FAQ 1 */}
              <div className="p-5 rounded-2xl bg-slate-900/60 border border-slate-800">
                <h3 className="text-base font-bold text-pink-300 flex items-center gap-2.5 mb-2">
                  <HelpCircle className="w-4 h-4 text-pink-400 shrink-0" />
                  <span>¿Cuándo sale GTA 6 y para qué plataformas estará disponible?</span>
                </h3>
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed pl-6.5">
                  Rockstar Games ha confirmado oficialmente que <strong>Grand Theft Auto VI</strong> se lanzará primero en consolas de última generación: <strong>PlayStation 5</strong> y <strong>Xbox Series X|S</strong>. Si la persona a la que vas a regalar tiene alguna de estas dos consolas, el regalo más práctico son las <strong>tarjetas oficiales de saldo digital</strong> para tener la reserva asegurada en cuanto se abra la preventa oficial en la tienda digital de Sony o Microsoft.
                </p>
              </div>

              {/* FAQ 2 */}
              <div className="p-5 rounded-2xl bg-slate-900/60 border border-slate-800">
                <h3 className="text-base font-bold text-pink-300 flex items-center gap-2.5 mb-2">
                  <HelpCircle className="w-4 h-4 text-pink-400 shrink-0" />
                  <span>¿Qué regalar a un fan de GTA VI si aún no ha salido el juego?</span>
                </h3>
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed pl-6.5">
                  No hace falta esperar al día del estreno para hacer un regalo espectacular. El merchandising retro y los accesorios de setup triunfan ahora mismo: lámparas de <strong>neón LED de palmeras y atardeceres Vice City</strong>, mandos oficiales <strong>DualSense Nova Pink o Galactic Purple</strong> (los colores de la identidad visual de GTA 6), alfombrillas de ratón gigantes synthwave de 900x400 mm y soportes de mando Cable Guys.
                </p>
              </div>

              {/* FAQ 3 */}
              <div className="p-5 rounded-2xl bg-slate-900/60 border border-slate-800">
                <h3 className="text-base font-bold text-pink-300 flex items-center gap-2.5 mb-2">
                  <HelpCircle className="w-4 h-4 text-pink-400 shrink-0" />
                  <span>¿Por qué comprar a través de nuestros enlaces de {amazonSiteName}?</span>
                </h3>
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed pl-6.5">
                  En <strong>Un Buen Regalo</strong> verificamos personalmente que cada producto pertenezca al catálogo activo de <strong>{amazonSiteName}</strong> con envío rápido Prime y garantía de devolución de 30 días. Si un producto se agota o cambia su referencia, nuestro sistema redirige de forma inteligente a la búsqueda oficial en Amazon para que nunca encuentres un enlace roto.
                </p>
              </div>

              {/* FAQ 4 */}
              <div className="p-5 rounded-2xl bg-slate-900/60 border border-slate-800">
                <h3 className="text-base font-bold text-pink-300 flex items-center gap-2.5 mb-2">
                  <HelpCircle className="w-4 h-4 text-pink-400 shrink-0" />
                  <span>¿Cómo conseguir la atmósfera Vice City en tu habitación gamer?</span>
                </h3>
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed pl-6.5">
                  El secreto de la estética Vice City radica en combinar tiras LED inteligentes detrás del monitor configuradas en tonos degradados fucsia (#ff2a85) y cian eléctrico (#00f0ff), acompañadas de una lámpara de silueta de palmera y una alfombrilla XXL con motivo ochentero. Con menos de 50 € puedes transformar por completo cualquier escritorio.
                </p>
              </div>

            </div>

          </div>
        </section>

      </main>

      <Footer currentTheme="gamer" />
    </div>
  );
}

function GtaProductCard({
  prod,
  amazonUrl,
  isInVote,
  isCopied,
  onToggleVote,
  onShare,
  formatPrice,
}: {
  prod: GtaProduct;
  amazonUrl: string;
  isInVote: boolean;
  isCopied: boolean;
  onToggleVote: () => void;
  onShare: (e: React.MouseEvent) => void;
  formatPrice: (p: string) => string;
}) {
  const [hasImgError, setHasImgError] = useState(false);

  return (
    <div className="group rounded-2xl bg-[#111322] border border-slate-800/80 hover:border-pink-500/50 overflow-hidden flex flex-col transition-all duration-300 hover:shadow-[0_0_25px_rgba(255,42,133,0.15)] hover:-translate-y-1">
      {/* Imagen y Badges */}
      <div className="relative aspect-square w-full bg-slate-900/90 overflow-hidden p-3 flex items-center justify-center">
        {/* Badge destacado */}
        <div className="absolute top-3 left-3 z-20 px-2.5 py-1 rounded-full bg-slate-950/95 border border-pink-500/50 text-pink-300 text-[10px] font-black tracking-wide shadow-md flex items-center gap-1 backdrop-blur-xs select-none">
          <Flame className="w-3 h-3 text-pink-400" />
          <span>{prod.badge}</span>
        </div>

        {/* Acciones flotantes */}
        <div className="absolute top-3 right-3 z-20 flex flex-col gap-1.5">
          <button
            type="button"
            onClick={onToggleVote}
            aria-label={isInVote ? `Quitar ${prod.title} de la lista de votación` : `Añadir ${prod.title} a la lista de votación`}
            className={`min-w-8 min-h-8 p-2 rounded-xl flex items-center justify-center transition-all shadow-md cursor-pointer ${
              isInVote
                ? 'bg-pink-600 text-white shadow-pink-500/30'
                : 'bg-slate-950/90 text-slate-200 hover:text-white hover:bg-slate-900 border border-slate-700/60'
            }`}
            title={isInVote ? 'Quitar de mi lista' : 'Guardar / Votar'}
          >
            <Heart className={`w-3.5 h-3.5 ${isInVote ? 'fill-white' : ''}`} />
          </button>

          <button
            type="button"
            onClick={onShare}
            aria-label={`Compartir enlace de ${prod.title}`}
            className="min-w-8 min-h-8 p-2 rounded-xl bg-slate-950/90 text-slate-200 hover:text-white hover:bg-slate-900 border border-slate-700/60 flex items-center justify-center transition-all shadow-md cursor-pointer"
            title="Compartir enlace de Amazon"
          >
            <Share2 className="w-3.5 h-3.5" />
          </button>
        </div>

        {isCopied && (
          <div className="absolute inset-x-0 bottom-3 mx-auto w-max px-3 py-1 rounded-lg bg-pink-600 text-white text-[11px] font-bold z-30 shadow-lg animate-in fade-in">
            ¡Enlace copiado!
          </div>
        )}

        {/* Enlace clickable en imagen */}
        <a
          href={amazonUrl}
          target="_blank"
          rel="noopener noreferrer sponsored"
          className="relative w-full h-full block cursor-pointer"
        >
          {!hasImgError ? (
            <Image
              src={prod.imageUrl}
              alt={prod.title}
              fill
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
              onError={() => setHasImgError(true)}
              className="object-contain p-2 group-hover:scale-105 transition-transform duration-300"
            />
          ) : (
            <div className="w-full h-full flex flex-col items-center justify-center p-4 text-center bg-gradient-to-br from-pink-950/40 via-purple-950/30 to-slate-950 rounded-xl">
              <Gamepad2 className="w-10 h-10 text-pink-400 mb-2 opacity-80" />
              <span className="text-xs font-bold text-slate-200 line-clamp-2">{prod.title}</span>
              <span className="text-[10px] text-pink-300 mt-1">Ver en Amazon →</span>
            </div>
          )}
        </a>
      </div>

      {/* Cuerpo de la Card */}
      <div className="p-5 flex-1 flex flex-col justify-between">
        <div>
          <div className="flex items-center justify-between text-xs mb-2">
            <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">
              {prod.categoryLabel}
            </span>
            <div className="flex items-center gap-1 text-amber-400 font-bold text-xs">
              <Star className="w-3 h-3 fill-amber-400" />
              <span>{prod.rating}</span>
              <span className="text-slate-300 text-[10px]">
                ({prod.reviewsCount > 1000 ? `${(prod.reviewsCount / 1000).toFixed(1)}k` : prod.reviewsCount})
              </span>
            </div>
          </div>

          <h3 className="font-bold text-sm text-slate-100 group-hover:text-pink-300 transition-colors line-clamp-2 mb-2 leading-snug">
            <a href={amazonUrl} target="_blank" rel="noopener noreferrer sponsored">
              {prod.title}
            </a>
          </h3>

          <p className="text-xs text-slate-300 line-clamp-2 mb-3 leading-relaxed">
            {prod.description}
          </p>

          <ul className="space-y-1 mb-4">
            {prod.pros.slice(0, 2).map((pro, idx) => (
              <li key={idx} className="flex items-start gap-1.5 text-[11px] text-slate-200">
                <CheckCircle2 className="w-3 h-3 text-cyan-400 shrink-0 mt-0.5" />
                <span className="line-clamp-1">{pro}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="pt-3 border-t border-slate-800/80 flex items-center justify-between gap-3">
          <div>
            <span className="text-[10px] text-slate-300 block">Precio en Amazon</span>
            <span className="text-lg font-black text-white">
              {formatPrice(prod.priceText)}
            </span>
          </div>

          <a
            href={amazonUrl}
            target="_blank"
            rel="noopener noreferrer sponsored"
            className="flex-1 py-2.5 px-3 rounded-xl bg-gradient-to-r from-pink-600 via-purple-700 to-cyan-700 hover:from-pink-700 hover:to-cyan-800 text-white font-black text-xs text-center flex items-center justify-center gap-1.5 shadow-md hover:shadow-pink-500/25 transition-all cursor-pointer group/btn"
          >
            <span>Ver en Amazon</span>
            <ExternalLink className="w-3.5 h-3.5 group-hover/btn:translate-x-0.5 transition-transform" />
          </a>
        </div>
      </div>
    </div>
  );
}
