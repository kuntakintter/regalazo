'use client';

import React, { useState, useEffect, Suspense } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { 
  CHRISTMAS_TOYS, 
  CHRISTMAS_CATEGORIES, 
  CHRISTMAS_AGE_RANGES,
  CHRISTMAS_WHEELS_SUBFILTERS,
  ChristmasToy, 
  buildAmazonRemoteCartUrl 
} from '@/data/cartaNavidadToys';
import { 
  Send, 
  Check, 
  Copy, 
  Printer, 
  ShoppingBag, 
  Share2, 
  X,
  Star,
  ShieldCheck,
  Search
} from 'lucide-react';
import ChristmasCountdown from '@/components/ChristmasCountdown';

function CartaPapaNoelContent() {
  const searchParams = useSearchParams();

  // State
  const [childName, setChildName] = useState('');
  const [childAge, setChildAge] = useState('7');
  const [behavior, setBehavior] = useState('🌟 súper bien');
  const [selectedToys, setSelectedToys] = useState<ChristmasToy[]>([]);
  const [activeCategory, setActiveCategory] = useState('all');
  const [activeWheelSub, setActiveWheelSub] = useState('all');
  const [activeAge, setActiveAge] = useState('all');
  const [searchToyQuery, setSearchToyQuery] = useState('');
  const [visibleCount, setVisibleCount] = useState(24);
  const [isSending, setIsSending] = useState(false);
  const [sendStep, setSendStep] = useState(0); // 0 = idle, 1 = folding, 2 = flying, 3 = delivered
  const [isDelivered, setIsDelivered] = useState(false);
  const [copiedLink, setCopiedLink] = useState(false);
  const [failedImgIds, setFailedImgIds] = useState<Record<string, boolean>>({});

  // Reset pagination when filters change
  useEffect(() => {
    setVisibleCount(24);
  }, [activeCategory, activeWheelSub, activeAge, searchToyQuery]);

  // Load from URL or localStorage on mount
  useEffect(() => {
    const urlName = searchParams.get('n') || searchParams.get('nombre');
    const urlAge = searchParams.get('edad');
    const urlWishes = searchParams.get('w') || searchParams.get('deseos');

    if (urlName) {
      setChildName(decodeURIComponent(urlName));
    } else {
      const savedName = localStorage.getItem('ubr_carta_nombre');
      if (savedName) setChildName(savedName);
    }

    if (urlAge) {
      setChildAge(urlAge);
    }

    if (urlWishes) {
      const wishIds = urlWishes.split(',');
      const found = CHRISTMAS_TOYS.filter(t => wishIds.includes(t.id));
      if (found.length > 0) {
        setSelectedToys(found);
        setIsDelivered(true);
      }
    } else {
      const savedToys = localStorage.getItem('ubr_carta_juguetes');
      if (savedToys) {
        try {
          const parsed = JSON.parse(savedToys);
          const found = CHRISTMAS_TOYS.filter(t => parsed.includes(t.id));
          if (found.length > 0) setSelectedToys(found);
        } catch {}
      }
    }
  }, [searchParams]);

  // Persist to localStorage
  useEffect(() => {
    if (childName) localStorage.setItem('ubr_carta_nombre', childName);
  }, [childName]);

  useEffect(() => {
    const ids = selectedToys.map(t => t.id);
    localStorage.setItem('ubr_carta_juguetes', JSON.stringify(ids));
  }, [selectedToys]);

  // Toggle toy in letter
  const toggleToy = (toy: ChristmasToy) => {
    if (selectedToys.some(t => t.id === toy.id)) {
      setSelectedToys(prev => prev.filter(t => t.id !== toy.id));
    } else {
      if (selectedToys.length >= 6) {
        alert('¡Has alcanzado el límite de 6 deseos mágicos! Puedes quitar uno de tu carta para añadir este.');
        return;
      }
      setSelectedToys(prev => [...prev, toy]);
    }
  };

  const removeToy = (id: string) => {
    setSelectedToys(prev => prev.filter(t => t.id !== id));
  };

  // Handle Send to North Pole Animation
  const handleSendLetter = () => {
    if (!childName.trim()) {
      alert('¡Por favor, escribe tu nombre en la firma de la carta para que Papá Noel sepa de quién es!');
      return;
    }
    if (selectedToys.length === 0) {
      alert('¡Elige al menos 1 juguete o deseo de la revista de abajo para añadirlo a tu carta!');
      return;
    }

    setIsSending(true);
    setSendStep(1); // Folding & wax stamp

    setTimeout(() => {
      setSendStep(2); // Flying through stars with reindeer
    }, 1800);

    setTimeout(() => {
      setSendStep(3); // Delivered to Santa's workshop
      setIsDelivered(true);
      setIsSending(false);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }, 4200);
  };

  // Generate shareable link
  const getShareableUrl = () => {
    if (typeof window === 'undefined') return '';
    const base = window.location.origin + window.location.pathname;
    const ids = selectedToys.map(t => t.id).join(',');
    return `${base}?n=${encodeURIComponent(childName.trim())}&edad=${childAge}&w=${ids}`;
  };

  // Copy link
  const handleCopyLink = () => {
    const url = getShareableUrl();
    navigator.clipboard.writeText(url);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2500);
  };

  // Share via WhatsApp (clean and private)
  const handleShareWhatsApp = () => {
    const name = childName.trim() || 'Nuestro peque';
    const lines = selectedToys.map((t, idx) => `${idx + 1}. ${t.shortTitle}`).join('\n');
    const url = getShareableUrl();
    const text = `🎅 ¡Carta a Papá Noel de ${name}! 🎄✨\n\nHa pedido estos deseos:\n${lines}\n\n👉 Puedes ver la carta completa aquí: ${url}`;
    const waUrl = `https://api.whatsapp.com/send?text=${encodeURIComponent(text)}`;
    window.open(waUrl, '_blank');
  };

  // Amazon Remote Cart URL (All selected items straight to Amazon cart with affiliate tag)
  const handleOpenAmazonCart = () => {
    const asins = selectedToys.map((t) => t.asin);
    const fallbackTitles = selectedToys.map((t) => t.shortTitle || t.title);
    const cartUrl = buildAmazonRemoteCartUrl(asins, 'vapegadgets22-21', fallbackTitles);
    window.open(cartUrl, '_blank');
  };

  // Filter toys by category, wheel subcategory, age and text search
  const filteredToys = CHRISTMAS_TOYS.filter(t => {
    const matchCat = activeCategory === 'all' || t.category === activeCategory;
    const matchWheelSub =
      activeWheelSub === 'all' ||
      (t.category === 'sobre-ruedas' && t.wheelSubcategory === activeWheelSub);
    const matchAge = activeAge === 'all' || 
      (Array.isArray(t.ages) && t.ages.includes(activeAge as any)) ||
      t.ageRange === activeAge || 
      t.ageRange === 'all';
    const query = searchToyQuery.trim().toLowerCase();
    const matchQuery = !query || 
      t.title.toLowerCase().includes(query) ||
      t.shortTitle.toLowerCase().includes(query) ||
      t.categoryLabel.toLowerCase().includes(query);
    return matchCat && matchWheelSub && matchAge && matchQuery;
  });

  return (
    <div className="min-h-screen bg-linear-to-b from-[#2d0a0a] via-[#0f172a] to-[#062419] text-slate-100 font-sans pb-24 relative overflow-x-clip">
      
      {/* Falling Snow Effect in CSS */}
      <div className="pointer-events-none fixed inset-0 z-0 opacity-50 overflow-hidden" aria-hidden="true">
        <div className="absolute -top-10 left-[8%] w-2 h-2 bg-white rounded-full blur-[0.5px] animate-[snowfall_9s_linear_infinite]" />
        <div className="absolute -top-10 left-[22%] w-3 h-3 bg-white rounded-full blur-[1px] animate-[snowfall_11s_linear_infinite_1s]" />
        <div className="absolute -top-10 left-[40%] w-1.5 h-1.5 bg-white rounded-full animate-[snowfall_7s_linear_infinite_2.5s]" />
        <div className="absolute -top-10 left-[58%] w-2.5 h-2.5 bg-white rounded-full blur-[0.5px] animate-[snowfall_10s_linear_infinite_0.5s]" />
        <div className="absolute -top-10 left-[75%] w-2 h-2 bg-white rounded-full animate-[snowfall_8s_linear_infinite_3s]" />
        <div className="absolute -top-10 left-[90%] w-3 h-3 bg-white rounded-full blur-[1px] animate-[snowfall_12s_linear_infinite_1.5s]" />
      </div>

      <style jsx global>{`
        @keyframes snowfall {
          0% { transform: translateY(-10px) translateX(0); opacity: 0; }
          20% { opacity: 0.8; }
          80% { opacity: 0.8; }
          100% { transform: translateY(105vh) translateX(30px); opacity: 0; }
        }
        .ruled-paper {
          background-color: #fcf9f2;
          background-image: repeating-linear-gradient(
            transparent,
            transparent 37px,
            rgba(180, 83, 9, 0.14) 37px,
            rgba(180, 83, 9, 0.14) 38px
          );
        }
        .air-mail-envelope {
          background: repeating-linear-gradient(
            135deg,
            #ed0001 0px,
            #ed0001 16px,
            #fcf9f2 16px,
            #fcf9f2 26px,
            #018bb2 26px,
            #018bb2 42px,
            #fcf9f2 42px,
            #fcf9f2 52px
          );
        }
      `}</style>

      {/* Breadcrumb Navigation */}
      <div className="relative z-10 max-w-5xl mx-auto px-4 pt-6 pb-2">
        <Link
          href="/"
          className="inline-flex items-center gap-1.5 text-xs text-amber-200/90 hover:text-white transition-colors bg-black/30 backdrop-blur-sm px-3.5 py-1.5 rounded-full border border-amber-400/30"
        >
          <span>← Volver a UnBuenRegalo.es</span>
        </Link>
      </div>

      {/* Main Container */}
      <main className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 pt-2 space-y-8">

        {/* ============================================================ */}
        {/* TITULAR DE LA PÁGINA                                         */}
        {/* ============================================================ */}
        <header className="text-center space-y-2">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-red-600/30 border border-amber-400/40 text-amber-200 text-xs sm:text-sm font-bold shadow-lg">
            <span>✨ Correo Oficial del Polo Norte • Navidad 2026 ✨</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-black tracking-tight text-white drop-shadow-md">
            🎅 Carta Oficial a Papá Noel ❄️
          </h1>
          <p className="text-xs sm:text-sm text-slate-300 max-w-lg mx-auto">
            Escribe tu carta personalizada, añade tus deseos favoritos de la revista y envíala volando directa a Laponia.
          </p>
          <div className="pt-2 flex justify-center">
            <ChristmasCountdown />
          </div>
        </header>

        {/* ============================================================ */}
        {/* ESTADO: SI YA HA SIDO ENTREGADA EN EL POLO NORTE              */}
        {/* ============================================================ */}
        {isDelivered && (
          <div className="air-mail-envelope p-2.5 sm:p-3.5 rounded-3xl sm:rounded-4xl shadow-2xl animate-in fade-in duration-500">
            <section className="bg-linear-to-b from-amber-50 to-orange-50 text-slate-900 rounded-2xl sm:rounded-3xl p-6 sm:p-10 relative overflow-hidden">
              {/* North Pole Official Stamp Watermark */}
            <div className="absolute -top-6 -right-6 w-36 h-36 rounded-full border-4 border-dashed border-red-700/30 flex items-center justify-center rotate-12 pointer-events-none select-none">
              <span className="text-[11px] font-black uppercase text-red-800/40 text-center tracking-widest">
                POLO NORTE EXPEDICIÓN<br />ENTREGADO • 2026
              </span>
            </div>

            <div className="max-w-2xl mx-auto text-center space-y-5">
              <div className="w-20 h-20 mx-auto rounded-full bg-linear-to-tr from-red-600 to-amber-600 text-white flex items-center justify-center text-4xl shadow-xl ring-4 ring-amber-300">
                🎅
              </div>

              <div>
                <span className="inline-block px-3 py-1 bg-red-600 text-white text-xs font-black rounded-full uppercase tracking-wider mb-2">
                  ¡Carta recibida en el Taller de Laponia!
                </span>
                <h2 className="text-2xl sm:text-3xl font-black text-slate-900 font-serif">
                  ¡Ho, ho, ho, {childName || 'pequeño/a'}! 🎄
                </h2>
              </div>

              {/* Mensaje oficial de Papá Noel */}
              <div className="bg-white/95 rounded-2xl p-6 border border-amber-300 shadow-inner text-left text-sm sm:text-base text-slate-800 leading-relaxed space-y-3 font-serif">
                <p>
                  &ldquo;¡Qué alegría leer tu carta! He recibido tu mensaje aquí en el Polo Norte. Mis elfos ya tienen apuntados en el libro mágico tus {selectedToys.length} deseos para Nochebuena.&rdquo;
                </p>
                <p className="font-semibold text-red-900">
                  &ldquo;Sigue portándote así de bien en casa y en el cole, comparte tus cosas y acuéstate prontito la noche de Navidad. ¡Rodolfo y yo ya estamos preparando el trineo!&rdquo;
                </p>
                <p className="text-right font-black text-slate-900 pt-3">
                  — Con todo mi cariño, Papá Noel 🎅❄️
                </p>
              </div>

              {/* Lista de deseos pedidos */}
              <div className="pt-2 text-left">
                <h3 className="text-xs font-black uppercase tracking-wider text-slate-600 mb-2">
                  📜 Tus deseos sellados en la carta:
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {selectedToys.map((t, idx) => (
                    <div key={t.id} className="flex items-center gap-3 bg-white p-2.5 rounded-xl border border-amber-200 shadow-xs">
                      <div className="relative w-12 h-12 rounded-lg overflow-hidden shrink-0 bg-slate-50 flex items-center justify-center">
                        {!failedImgIds[t.id] ? (
                          <Image
                            src={t.imageUrl}
                            alt={t.shortTitle}
                            fill
                            unoptimized
                            onError={() => setFailedImgIds(prev => ({ ...prev, [t.id]: true }))}
                            className="object-contain p-1"
                            sizes="48px"
                          />
                        ) : (
                          <span className="text-xl" aria-hidden="true">🎁</span>
                        )}
                      </div>
                      <div className="min-w-0 flex-1">
                        <span className="text-[10px] font-bold text-red-700 block">Deseo #{idx + 1}</span>
                        <p className="text-xs font-bold text-slate-900 truncate">{t.shortTitle}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Botón para volver a editar */}
              <button
                onClick={() => setIsDelivered(false)}
                className="text-xs font-bold text-slate-600 hover:text-slate-900 underline transition-colors pt-2 cursor-pointer"
              >
                ✏️ ¿Quieres cambiar o añadir algún deseo a tu carta? Pulsa aquí
              </button>

              {/* ============================================================ */}
              {/* ZONA DISCRETA PARA PAPÁS Y MAMÁS                             */}
              {/* ============================================================ */}
              <div className="mt-8 pt-6 border-t-2 border-dashed border-amber-300 text-left bg-linear-to-r from-amber-100/70 to-orange-100/70 p-4 sm:p-6 rounded-2xl">
                <div className="flex items-center gap-2 mb-2">
                  <ShieldCheck className="w-4 h-4 text-emerald-700 shrink-0" />
                  <span className="text-xs font-black uppercase tracking-wider text-slate-800">
                    Copia de recuerdo de la carta de {childName || 'tu peque'}
                  </span>
                </div>
                <p className="text-xs text-slate-600 mb-4">
                  Guarda el enlace de la carta de Papá Noel para no perder sus deseos o prepara la compra cómodamente:
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  <button
                    type="button"
                    onClick={handleCopyLink}
                    aria-label="Copiar enlace de la carta de Papá Noel"
                    className="py-2.5 px-3 rounded-xl bg-white hover:bg-slate-50 text-slate-900 font-bold text-xs border border-slate-300 shadow-xs flex items-center justify-center gap-2 transition-all cursor-pointer"
                  >
                    {copiedLink ? <Check className="w-4 h-4 text-emerald-600" /> : <Copy className="w-4 h-4 text-slate-600" />}
                    <span>{copiedLink ? '¡Enlace copiado!' : 'Copiar enlace de la carta'}</span>
                  </button>

                  <button
                    onClick={handleShareWhatsApp}
                    className="py-2.5 px-3 rounded-xl bg-[#075E54] hover:bg-[#128C7E] text-white font-bold text-xs shadow-xs flex items-center justify-center gap-2 transition-all cursor-pointer"
                  >
                    <Share2 className="w-4 h-4" />
                    <span>Guardar copia en WhatsApp</span>
                  </button>

                  <button
                    onClick={handleOpenAmazonCart}
                    className="py-2.5 px-3 rounded-xl bg-amber-500 hover:bg-amber-600 text-slate-950 font-black text-xs shadow-xs flex items-center justify-center gap-2 transition-all cursor-pointer"
                    title="Añade automáticamente todos los deseos seleccionados a tu cesta de Amazon"
                  >
                    <ShoppingBag className="w-4 h-4" />
                    <span>Preparar cesta en Amazon 🛒</span>
                  </button>

                  <button
                    onClick={() => window.print()}
                    className="py-2.5 px-3 rounded-xl bg-slate-800 hover:bg-slate-900 text-white font-bold text-xs shadow-xs flex items-center justify-center gap-2 transition-all cursor-pointer"
                  >
                    <Printer className="w-4 h-4" />
                    <span>Imprimir para dejar junto a las galletas</span>
                  </button>
                </div>
              </div>

            </div>
          </section>
        </div>
        )}

        {/* ============================================================ */}
        {/* AUTÉNTICO PAPEL DE CARTA ESCOLAR NAVIDEÑA (MODO EDICIÓN)     */}
        {/* ============================================================ */}
        {!isDelivered && (
          <>
            {/* TRINEO ANIMADO EN PANTALLAS MÓVILES / TABLETS (VOLANDO SOBRE LA CARTA) */}
            <div className="xl:hidden flex justify-center -mb-6 relative z-20 pointer-events-none select-none">
              <img
                src="/images/trineo-navidad-animado.gif"
                alt="Trineo de Papá Noel"
                style={{ width: '170px', height: 'auto', display: 'block' }}
                className="drop-shadow-2xl"
              />
            </div>

            <div className="relative">
              {/* TRINEO ANIMADO EN PANTALLAS GRANDES / ESCRITORIO (A LA DERECHA DE LA CARTA) */}
              <div className="hidden xl:block absolute left-[calc(100%+1rem)] 2xl:left-[calc(100%+2rem)] top-2 w-52 2xl:w-60 z-30 pointer-events-none select-none">
                <img
                  src="/images/trineo-navidad-animado.gif"
                  alt="Trineo de Navidad animado"
                  style={{ width: '100%', height: 'auto', display: 'block' }}
                  className="drop-shadow-[0_20px_35px_rgba(0,0,0,0.85)] filter brightness-105"
                />
              </div>

              {/* ENVOLTORIO CON BORDE CORREO AÉREO / AIR MAIL (ROJO, CREMA, AZUL) */}
              <div className="air-mail-envelope p-2.5 sm:p-3.5 rounded-3xl sm:rounded-4xl shadow-2xl">
                <section className="ruled-paper text-slate-900 rounded-2xl sm:rounded-3xl p-5 sm:p-12 relative overflow-hidden">
              
              {/* SELLO POSTAL OFICIAL DEL POLO NORTE (ESQUINA SUPERIOR DERECHA) */}
              <div className="absolute top-4 right-4 sm:top-6 sm:right-6">
                {/* Sello con bordes dentados */}
                <div className="w-20 sm:w-24 h-24 sm:h-28 bg-[#c82333] border-2 border-dashed border-white rounded-md p-2 shadow-md flex flex-col items-center justify-center gap-2 text-white text-center rotate-3 transform hover:rotate-0 transition-transform select-none">
                  <span className="text-[10px] font-black uppercase tracking-wider block">POLO NORTE</span>
                  <span className="text-3xl sm:text-4xl">🎅</span>
                </div>
              </div>

              {/* Decoración navideña en esquina izquierda */}
              <div className="text-3xl select-none mb-4">🎄❄️</div>

              {/* CUERPO MANUSCRITO DE LA CARTA */}
              <div className="border-l-2 border-red-300/80 pl-4 sm:pl-8 ml-1 sm:ml-4 space-y-6 max-w-2xl">
                
                {/* Encabezado */}
                <div className="space-y-1">
                  <span className="text-[11px] font-bold uppercase tracking-widest text-red-800/80 block font-sans">
                    Para: Papá Noel (Polo Norte, Laponia)
                  </span>
                  <h2 className="text-3xl sm:text-4xl font-black text-slate-900 font-serif tracking-tight">
                    Querido Papá Noel:
                  </h2>
                </div>

                {/* Texto redactado manuscrito con líneas interactivas */}
                <div className="text-base sm:text-lg text-slate-800 font-serif leading-[38px] space-y-2">
                  <p>
                    ¡Hola! Te escribo esta carta con mucha ilusión. Me llamo{' '}
                    <input
                      type="text"
                      value={childName}
                      onChange={(e) => setChildName(e.target.value)}
                      aria-label="Nombre del niño o niña"
                      placeholder="Escribe tu nombre..."
                      className="border-b-2 border-dashed border-red-700 bg-transparent text-lg sm:text-xl font-bold font-serif text-red-950 focus:outline-hidden focus:border-red-900 px-2 py-0 inline-block w-48 sm:w-60 placeholder:text-slate-400 placeholder:font-normal placeholder:text-sm text-center"
                      maxLength={30}
                    />
                    {' '}y tengo{' '}
                    <input
                      type="number"
                      value={childAge}
                      onChange={(e) => setChildAge(e.target.value)}
                      aria-label="Edad del niño o niña en años"
                      min="1"
                      max="14"
                      className="border-b-2 border-dashed border-red-700 bg-transparent text-lg sm:text-xl font-bold font-serif text-red-950 focus:outline-hidden px-1 py-0 inline-block w-14 text-center"
                    />
                    {' '}años.
                  </p>

                  <p>
                    Este año en casa y en el colegio me he portado{' '}
                    <select
                      value={behavior}
                      onChange={(e) => setBehavior(e.target.value)}
                      className="border-b-2 border-dashed border-red-700 bg-transparent text-base sm:text-lg font-bold font-serif text-red-950 focus:outline-hidden cursor-pointer px-1 py-0 inline-block"
                    >
                      <option value="🌟 súper bien">🌟 súper bien</option>
                      <option value="🚀 genial ayudando en casa">🚀 genial ayudando en casa</option>
                      <option value="📚 genial con las notas">📚 genial con las notas</option>
                      <option value="💖 compartiendo mis cosas">💖 compartiendo mis cosas</option>
                    </select>
                    . He ayudado mucho a mi familia y he hecho mis deberes con ganas.
                  </p>

                  <p>
                    Para esta Nochebuena me haría muchísima ilusión si en tu trineo pudieras traerme estos deseos:
                  </p>
                </div>

                {/* ============================================================ */}
                {/* ZONA DE DESEOS PEGADOS EN LA CARTA (RECORTES CON CELO)      */}
                {/* ============================================================ */}
                <div className="bg-amber-100/40 rounded-2xl p-4 sm:p-5 border-2 border-dashed border-amber-400/80 space-y-3 font-sans">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-black uppercase tracking-wider text-red-900 flex items-center gap-1.5">
                      <span>🎁</span>
                      <span>Deseos pegados en mi carta ({selectedToys.length}/6)</span>
                    </span>
                    {selectedToys.length > 0 && (
                      <button
                        onClick={() => setSelectedToys([])}
                        className="text-[11px] text-red-700 hover:text-red-900 font-bold underline cursor-pointer"
                      >
                        Despegar todos
                      </button>
                    )}
                  </div>

                  {selectedToys.length === 0 ? (
                    <div className="py-6 px-4 text-center rounded-xl bg-white/60 border border-amber-300/60 text-slate-600 text-xs sm:text-sm font-serif italic">
                      ✨ Aún no has pegado ningún deseo en tu carta. <br />
                      👇 <strong>Elige abajo tus juguetes favoritos de la revista</strong> y se pegarán automáticamente aquí con su sello mágico.
                    </div>
                  ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                      {selectedToys.map((t, idx) => (
                        <div 
                          key={t.id} 
                          className="bg-white p-2.5 rounded-xl border border-amber-300 shadow-md flex items-center justify-between gap-2.5 relative group transform hover:-translate-y-0.5 transition-transform"
                        >
                          {/* Trozo de celo decorativo en la esquina */}
                          <div className="absolute -top-1.5 left-4 w-8 h-3 bg-amber-200/70 border border-amber-300/80 -rotate-3 rounded-xs pointer-events-none" />

                          <div className="flex items-center gap-2.5 min-w-0">
                            <div className="relative w-12 h-12 rounded-lg overflow-hidden shrink-0 bg-slate-50 border border-slate-100 flex items-center justify-center">
                              {!failedImgIds[t.id] ? (
                                <Image
                                  src={t.imageUrl}
                                  alt={t.shortTitle}
                                  fill
                                  unoptimized
                                  onError={() => setFailedImgIds(prev => ({ ...prev, [t.id]: true }))}
                                  className="object-contain p-1"
                                  sizes="48px"
                                />
                              ) : (
                                <span className="text-xl" aria-hidden="true">🎁</span>
                              )}
                            </div>
                            <div className="min-w-0 flex-1">
                              <span className="text-[10px] font-black text-red-700 uppercase tracking-wider block">
                                Deseo #{idx + 1}
                              </span>
                              <span className="text-xs font-bold text-slate-900 truncate block">
                                {t.shortTitle}
                              </span>
                            </div>
                          </div>

                          <button
                            onClick={() => removeToy(t.id)}
                            className="p-1.5 text-slate-400 hover:text-red-600 rounded-lg transition-colors cursor-pointer shrink-0"
                            title="Quitar deseo de la carta"
                            aria-label="Quitar deseo"
                          >
                            <X className="w-4 h-4" />
                          </button>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                {/* Despedida manuscrita y promesa de galletas */}
                <div className="text-base sm:text-lg text-slate-800 font-serif leading-[38px] space-y-3 pt-2">
                  <p>
                    Prometo dejarte en el salón un vaso de leche calentita con galletas, y unas zanahorias para Rodolfo y los renos.
                  </p>
                  <p className="font-semibold text-slate-900">
                    ¡Buen viaje volando por el cielo en tu trineo!
                  </p>
                  
                  {/* Firma del niño */}
                  <div className="pt-2 flex items-center gap-2">
                    <span className="text-base sm:text-lg font-serif">Con mucho cariño,</span>
                    <span className="text-xl sm:text-2xl font-black font-serif text-red-900 underline decoration-wavy decoration-red-400">
                      {childName.trim() || '________________'}
                    </span>
                    <span>✍️</span>
                  </div>
                </div>

                {/* ============================================================ */}
                {/* RANURA DE BUZÓN MÁGICO DEL POLO NORTE (BOTÓN DE ENVIAR)      */}
                {/* ============================================================ */}
                <div className="pt-6 text-center font-sans">
                  <div className="p-3 bg-gradient-to-b from-[#b31b2c] to-[#7f111e] rounded-2xl shadow-xl border-2 border-amber-300">
                    <button
                      onClick={handleSendLetter}
                      disabled={selectedToys.length === 0}
                      className={`w-full py-4 px-6 rounded-xl font-black text-base sm:text-lg shadow-lg transition-all flex items-center justify-center gap-3 cursor-pointer ${
                        selectedToys.length > 0
                          ? 'bg-gradient-to-r from-amber-400 via-yellow-300 to-amber-500 hover:from-amber-300 hover:to-amber-400 text-slate-950 transform hover:scale-[1.01] active:scale-[0.99] ring-2 ring-white/50'
                          : 'bg-slate-300 text-slate-500 cursor-not-allowed opacity-60'
                      }`}
                    >
                      <span className="text-2xl animate-bounce">📮</span>
                      <span>¡Echar mi carta al Buzón Mágico del Polo Norte!</span>
                      <Send className="w-5 h-5 ml-1" />
                    </button>
                    <span className="text-xs text-amber-200/90 block mt-2 font-medium">
                      {selectedToys.length === 0
                        ? '⚠️ Elige al menos 1 juguete de abajo para poder echar tu carta'
                        : '❄️ ¡Tu carta volará directa a Laponia en cuanto pulses el buzón!'}
                    </span>
                  </div>
                </div>

              </div>
            </section>
          </div>
        </div>

            {/* ============================================================ */}
            {/* LA GRAN REVISTA DE JUGUETES DE PAPÁ NOEL                     */}
            {/* ============================================================ */}
            <section className="space-y-4 pt-6">
              <div className="text-center sm:text-left space-y-1">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 text-amber-300 text-xs font-bold">
                  <span>📖 Revista Navideña de Juguetes</span>
                </div>
                <h2 className="text-2xl sm:text-3xl font-black text-white flex items-center justify-center sm:justify-start gap-2">
                  <span>🧸</span>
                  <span>Elige los Juguetes para tu Carta</span>
                </h2>
                <p className="text-xs sm:text-sm text-slate-300">
                  Explora el catálogo y pulsa en <strong>&ldquo;⭐ ¡Pedir este deseo!&rdquo;</strong> para pegar los juguetes que más te gusten en tu carta:
                </p>
              </div>

              {/* Panel de Filtros y Búsqueda con diseño infantil navideño */}
              <div className="bg-gradient-to-b from-slate-900/95 via-red-950/30 to-slate-900/95 rounded-3xl p-5 sm:p-7 border-2 border-amber-400/40 shadow-2xl space-y-5">
                
                {/* 1. Filtro por Edad (Infantil, visual y sin cortes) */}
                <div className="space-y-2.5">
                  <div className="flex items-center gap-2">
                    <span className="text-lg">🎈</span>
                    <span className="text-xs sm:text-sm font-black uppercase text-amber-300 tracking-wider">
                      ¿Cuántos años tienes?
                    </span>
                  </div>
                  <div className="flex flex-wrap items-center gap-2 sm:gap-2.5">
                    {CHRISTMAS_AGE_RANGES.map(age => {
                      const isAgeActive = activeAge === age.id;
                      return (
                        <button
                          key={age.id}
                          onClick={() => setActiveAge(age.id)}
                          className={`px-3.5 py-2 rounded-2xl text-xs sm:text-sm font-bold transition-all duration-150 cursor-pointer flex items-center gap-1.5 ${
                            isAgeActive
                              ? 'bg-gradient-to-r from-emerald-500 to-teal-400 text-white shadow-lg shadow-emerald-500/25 border-2 border-white scale-105 ring-2 ring-emerald-300 font-black'
                              : 'bg-white/10 hover:bg-white/20 text-slate-100 border-2 border-white/15 hover:border-amber-300/60 hover:scale-102'
                          }`}
                        >
                          {age.label}
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* 2. Categorías de Juguetes estilo pegatinas divertidas */}
                <div className="pt-3 border-t border-white/10 space-y-2.5">
                  <div className="flex items-center gap-2">
                    <span className="text-lg">🎁</span>
                    <span className="text-xs sm:text-sm font-black uppercase text-amber-300 tracking-wider">
                      ¿Qué juguetes te gustan más?
                    </span>
                  </div>
                  <div className="flex flex-wrap items-center gap-2 sm:gap-2.5">
                    {CHRISTMAS_CATEGORIES.map(cat => {
                      const isCatActive = activeCategory === cat.id;
                      const count = CHRISTMAS_TOYS.filter(t => cat.id === 'all' || t.category === cat.id).length;
                      return (
                        <button
                          key={cat.id}
                          onClick={() => {
                            setActiveCategory(cat.id);
                            if (cat.id !== 'sobre-ruedas') {
                              setActiveWheelSub('all');
                            }
                          }}
                          className={`px-3.5 py-2 rounded-2xl text-xs sm:text-sm transition-all duration-150 cursor-pointer flex items-center gap-2 ${
                            isCatActive
                              ? 'bg-gradient-to-r from-amber-400 via-amber-300 to-yellow-400 text-slate-950 font-black shadow-lg shadow-amber-400/25 border-2 border-white scale-105 ring-2 ring-amber-300'
                              : 'bg-white/10 hover:bg-white/20 text-slate-100 border-2 border-white/15 hover:border-amber-300/60 font-bold hover:scale-102'
                          }`}
                        >
                          <span>{cat.label}</span>
                          <span className={`text-[10px] px-2 py-0.5 rounded-full font-black ${
                            isCatActive ? 'bg-slate-950/20 text-slate-950' : 'bg-white/20 text-white'
                          }`}>
                            {count}
                          </span>
                        </button>
                      );
                    })}
                  </div>

                  {/* SUBFILTRO DEDICADO DE COCHES ELÉCTRICOS, QUADS, MINIMOTOS Y PATINETES ELÉCTRICOS */}
                  <div className={`mt-3 p-3.5 sm:p-4 rounded-2xl border-2 transition-all ${
                    activeCategory === 'sobre-ruedas'
                      ? 'bg-gradient-to-r from-amber-500/25 via-orange-500/20 to-red-500/20 border-amber-400 shadow-lg shadow-amber-500/10'
                      : 'bg-white/5 border-amber-400/30 hover:border-amber-400/50'
                  }`}>
                    <div className="flex flex-wrap items-center justify-between gap-2 mb-2.5">
                      <div className="flex items-center gap-2">
                        <span className="text-base">🏎️</span>
                        <span className="text-xs font-black uppercase text-amber-300 tracking-wider">
                          Subfiltro Sobre Ruedas & Motor (Coches 12V/24V, Quads, Minimotos y Patinetes):
                        </span>
                      </div>
                      {activeWheelSub !== 'all' && (
                        <button
                          type="button"
                          onClick={() => setActiveWheelSub('all')}
                          className="text-[11px] font-bold text-amber-200 hover:text-white underline cursor-pointer"
                        >
                          Ver los 34 vehículos
                        </button>
                      )}
                    </div>
                    <div className="flex flex-wrap items-center gap-2">
                      {CHRISTMAS_WHEELS_SUBFILTERS.map((sub) => {
                        const isSubActive = activeCategory === 'sobre-ruedas' && activeWheelSub === sub.id;
                        const subCount = CHRISTMAS_TOYS.filter(
                          (t) => t.category === 'sobre-ruedas' && (sub.id === 'all' || t.wheelSubcategory === sub.id)
                        ).length;
                        return (
                          <button
                            key={sub.id}
                            type="button"
                            onClick={() => {
                              setActiveCategory('sobre-ruedas');
                              setActiveWheelSub(sub.id);
                            }}
                            className={`px-3 py-1.5 rounded-xl text-xs transition-all cursor-pointer flex items-center gap-1.5 ${
                              isSubActive
                                ? 'bg-amber-400 text-slate-950 font-black shadow-md border-2 border-white scale-105'
                                : 'bg-slate-900/80 hover:bg-slate-800 text-amber-100 border border-amber-400/40 hover:border-amber-300 font-bold'
                            }`}
                          >
                            <span>{sub.label}</span>
                            <span className={`text-[10px] px-1.5 py-0.5 rounded-full font-black ${
                              isSubActive ? 'bg-slate-950/20 text-slate-950' : 'bg-amber-400/20 text-amber-300'
                            }`}>
                              {subCount}
                            </span>
                          </button>
                        );
                      })}
                    </div>
                  </div>
                </div>

                {/* 3. Buscador amigable y rápido */}
                <div className="pt-3 border-t border-white/10 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
                  <div className="relative flex-1 max-w-md">
                    <Search className="w-4 h-4 text-amber-300 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                    <input
                      type="text"
                      value={searchToyQuery}
                      onChange={(e) => setSearchToyQuery(e.target.value)}
                      aria-label="Buscar juguete específico en el catálogo"
                      placeholder="🔍 Buscar juguete específico (Mercedes, Quad, Minimoto, Patinete, Lego...)"
                      className="w-full pl-10 pr-9 py-2.5 rounded-2xl bg-white/10 border-2 border-white/15 focus:border-amber-400 focus:bg-white/15 focus:outline-hidden text-xs sm:text-sm text-white placeholder:text-slate-300 shadow-inner"
                    />
                    {searchToyQuery && (
                      <button
                        onClick={() => setSearchToyQuery('')}
                        aria-label="Borrar búsqueda de juguetes"
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-300 hover:text-white p-1"
                        title="Borrar búsqueda"
                      >
                        <X className="w-3.5 h-3.5" />
                      </button>
                    )}
                  </div>
                  {(activeCategory !== 'all' || activeWheelSub !== 'all' || activeAge !== 'all' || searchToyQuery) && (
                    <button
                      onClick={() => {
                        setActiveCategory('all');
                        setActiveWheelSub('all');
                        setActiveAge('all');
                        setSearchToyQuery('');
                      }}
                      className="px-3.5 py-2 text-xs font-bold text-amber-300 hover:text-amber-200 underline cursor-pointer text-center sm:text-right"
                    >
                      🔄 Ver todos los juguetes
                    </button>
                  )}
                </div>

              </div>

              {/* Mensaje de resultados vacíos */}
              {filteredToys.length === 0 && (
                <div className="py-12 text-center bg-white/5 rounded-2xl border border-white/10 p-6 space-y-3">
                  <span className="text-4xl block">🔍🧸</span>
                  <p className="text-sm font-bold text-white">
                    No encontramos ningún juguete con esos filtros.
                  </p>
                  <button
                    onClick={() => {
                      setActiveCategory('all');
                      setActiveAge('all');
                      setSearchToyQuery('');
                    }}
                    className="px-4 py-2 rounded-xl bg-amber-400 text-slate-950 font-black text-xs hover:bg-amber-300 transition-colors cursor-pointer"
                  >
                    Restablecer todos los filtros (Ver 300+ juguetes)
                  </button>
                </div>
              )}

              {/* Grid de Juguetes (Revista de Juguetes) */}
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4">
                {filteredToys.slice(0, visibleCount).map(toy => {
                  const isSelected = selectedToys.some(t => t.id === toy.id);
                  return (
                    <div
                      key={toy.id}
                      onClick={() => toggleToy(toy)}
                      className={`bg-white rounded-2xl p-3 sm:p-4 border-2 transition-all flex flex-col justify-between cursor-pointer group text-slate-900 relative ${
                        isSelected
                          ? 'border-emerald-500 ring-4 ring-emerald-400/30 shadow-xl shadow-emerald-500/10 scale-[1.02]'
                          : 'border-slate-200 hover:border-amber-400 shadow-md hover:shadow-xl'
                      }`}
                    >
                      {/* Badge */}
                      {toy.badge && (
                        <span className="absolute top-2 left-2 z-10 px-2 py-0.5 rounded-md bg-amber-500/90 text-slate-950 font-black text-[9px] uppercase tracking-wider shadow-xs">
                          {toy.badge}
                        </span>
                      )}

                      {/* Imagen grande del juguete */}
                      <div className="relative aspect-square w-full rounded-xl overflow-hidden bg-slate-50 mb-3 group-hover:scale-105 transition-transform duration-300 flex items-center justify-center">
                        {!failedImgIds[toy.id] ? (
                          <Image
                            src={toy.imageUrl}
                            alt={toy.shortTitle}
                            fill
                            unoptimized
                            onError={() => setFailedImgIds(prev => ({ ...prev, [toy.id]: true }))}
                            className="object-contain p-2"
                            sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
                          />
                        ) : (
                          <div className="flex flex-col items-center justify-center p-3 text-center text-slate-500">
                            <span className="text-3xl mb-1" aria-hidden="true">🎁</span>
                            <span className="text-[11px] font-bold text-slate-700 line-clamp-2">{toy.shortTitle}</span>
                          </div>
                        )}
                      </div>

                      {/* Título del juguete */}
                      <div className="space-y-1 mb-3">
                        <span className="text-[10px] font-bold text-slate-500 uppercase block tracking-wider">
                          {toy.categoryLabel}
                        </span>
                        <h3 className="text-xs sm:text-sm font-black text-slate-900 leading-snug line-clamp-2">
                          {toy.shortTitle}
                        </h3>
                      </div>

                      {/* Botón de acción */}
                      <button
                        type="button"
                        className={`w-full py-2 px-2.5 rounded-xl text-xs font-black transition-all flex items-center justify-center gap-1.5 ${
                          isSelected
                            ? 'bg-emerald-600 text-white shadow-xs'
                            : 'bg-amber-400 group-hover:bg-amber-500 text-slate-950 shadow-xs'
                        }`}
                      >
                        {isSelected ? (
                          <>
                            <Check className="w-3.5 h-3.5" />
                            <span>¡Pegado en tu carta!</span>
                          </>
                        ) : (
                          <>
                            <Star className="w-3.5 h-3.5 fill-current" />
                            <span>¡Pedir deseo!</span>
                          </>
                        )}
                      </button>
                    </div>
                  );
                })}
              </div>

              {/* Botón Cargar Más Juguetes */}
              {visibleCount < filteredToys.length && (
                <div className="text-center pt-6 space-y-2">
                  <button
                    onClick={() => setVisibleCount(prev => prev + 24)}
                    className="py-3.5 px-8 rounded-2xl bg-amber-400 hover:bg-amber-300 text-slate-950 font-black text-sm shadow-xl hover:scale-105 transition-all cursor-pointer ring-4 ring-amber-300/30"
                  >
                    🎁 Ver más juguetes del catálogo (+{Math.min(24, filteredToys.length - visibleCount)} más)
                  </button>
                  <span className="text-xs text-slate-400 block">
                    Mostrando {Math.min(visibleCount, filteredToys.length)} de {filteredToys.length} juguetes disponibles
                  </span>
                </div>
              )}

            </section>
          </>
        )}

        {/* ============================================================ */}
        {/* GUÍA INFORMATIVA & PREGUNTAS FRECUENTES (SEO & PADRES)       */}
        {/* ============================================================ */}
        <section aria-labelledby="faq-navidad-title" className="pt-8 border-t border-white/10 space-y-6 text-slate-300">
          <div className="text-center space-y-1">
            <span className="text-xs font-bold text-amber-300 uppercase tracking-widest block">
              🎄 Todo sobre el Correo Mágico de Laponia
            </span>
            <h2 id="faq-navidad-title" className="text-xl sm:text-2xl font-black text-white font-serif">
              Preguntas Frecuentes sobre la Carta a Papá Noel 2026
            </h2>
            <p className="text-xs sm:text-sm text-slate-400 max-w-2xl mx-auto">
              Descubre cómo funciona el buzón mágico del Polo Norte, las novedades del catálogo de juguetes y cómo guardar la lista de deseos para Nochebuena.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs sm:text-sm">
            <div className="bg-white/5 rounded-2xl p-4 sm:p-5 border border-white/10 space-y-2">
              <h3 className="font-bold text-amber-300 flex items-center gap-2 text-sm sm:text-base">
                <span>✉️</span>
                <span>¿Cómo escribir y enviar la carta a Papá Noel online?</span>
              </h3>
              <p className="text-slate-300 leading-relaxed">
                El niño puede rellenar su nombre, edad y cómo se ha portado este año directamente sobre la hoja manuscrita con pauta escolar y sobre de correo aéreo. Luego, basta con explorar la revista interactiva con más de 370 juguetes y pulsar en <em>⭐ ¡Pedir deseo!</em> para pegarlos en su carta. Al pulsar el botón del buzón mágico, la carta volará por el cielo estrellado con Rodolfo el reno directa al taller de Laponia.
              </p>
            </div>

            <div className="bg-white/5 rounded-2xl p-4 sm:p-5 border border-white/10 space-y-2">
              <h3 className="font-bold text-amber-300 flex items-center gap-2 text-sm sm:text-base">
                <span>🏎️</span>
                <span>¿Qué novedades incluye la sección Sobre Ruedas & Motor?</span>
              </h3>
              <p className="text-slate-300 leading-relaxed">
                Hemos incorporado los regalos con ruedas más deseados de esta Navidad: <strong>coches eléctricos para niños a batería (12V y 24V)</strong> con mando parental (Lamborghini Urus, Mercedes-AMG GT verde, buggies todoterreno 4x4), <strong>minimotos infantiles de cross 49cc</strong>, <strong>pocket bikes COBRA de circuito</strong>, <strong>miniquads de gasolina y eléctricos</strong>, además de patinetes eléctricos (Xiaomi y Cecotec) y patines con luces LED.
              </p>
            </div>

            <div className="bg-white/5 rounded-2xl p-4 sm:p-5 border border-white/10 space-y-2">
              <h3 className="font-bold text-amber-300 flex items-center gap-2 text-sm sm:text-base">
                <span>🛡️</span>
                <span>¿Por qué es fundamental el apartado de Cascos & Seguridad?</span>
              </h3>
              <p className="text-slate-300 leading-relaxed">
                La seguridad de los peques es lo primero. En el catálogo encontrarás <strong>cascos de motocross homologados</strong> (muchos en packs con gafas y guantes a juego), <strong>cascos de bicicleta con luz LED trasera</strong>, <strong>sets de protecciones 6 en 1</strong> (rodilleras, coderas y muñequeras) y <strong>petos integrales con espaldera</strong> para que disfruten de sus vehículos con total tranquilidad.
              </p>
            </div>

            <div className="bg-white/5 rounded-2xl p-4 sm:p-5 border border-white/10 space-y-2">
              <h3 className="font-bold text-amber-300 flex items-center gap-2 text-sm sm:text-base">
                <span>🛒</span>
                <span>¿Cómo pueden los padres guardar la lista o pedir los regalos?</span>
              </h3>
              <p className="text-slate-300 leading-relaxed">
                Al enviar la carta, los peques ven la carta de respuesta firmada por Papá Noel y, justo debajo, aparece un panel privado para los padres. Permite <strong>añadir todos los juguetes elegidos a la cesta de Amazon en un solo clic</strong> (mediante Amazon Remote Cart), <strong>compartir la lista por WhatsApp</strong> con la familia o <strong>imprimir la carta en papel</strong> para dejarla junto a las galletas y la leche la noche del 24 de diciembre.
              </p>
            </div>
          </div>
        </section>

      </main>

      {/* ============================================================ */}
      {/* ANIMACIÓN MÁGICA DE ENVÍO A PANTALLA COMPLETA                */}
      {/* ============================================================ */}
      {isSending && (
        <div className="fixed inset-0 z-50 bg-slate-950/95 backdrop-blur-md flex items-center justify-center p-4">
          <div className="max-w-md w-full bg-gradient-to-b from-red-900 via-rose-950 to-slate-950 text-white rounded-3xl p-8 border-4 border-amber-400 text-center shadow-2xl space-y-6 animate-in zoom-in-95 duration-300">
            
            {/* Animación de sobre volando */}
            <div className="relative w-32 h-32 mx-auto flex items-center justify-center">
              <div className="absolute inset-0 rounded-full bg-amber-400/20 animate-ping" />
              <div className="text-7xl animate-bounce select-none">
                {sendStep === 1 ? '📜' : sendStep === 2 ? '✉️' : '🎅'}
              </div>
            </div>

            <div className="space-y-2">
              <h3 className="text-xl sm:text-2xl font-black text-amber-300 font-serif">
                {sendStep === 1 && 'Plegando tu carta y sellando con cera roja... 🔴'}
                {sendStep === 2 && '¡Volando hacia el Polo Norte con Rodolfo! 🦌✨'}
                {sendStep === 3 && '¡Entregada en el taller de Papá Noel! 🎁'}
              </h3>
              <p className="text-xs sm:text-sm text-slate-300">
                {sendStep === 1 && 'Estampando el sello oficial de cera de Laponia...'}
                {sendStep === 2 && 'Cruzando el cielo estrellado con los renos...'}
                {sendStep === 3 && 'Papá Noel y los elfos acaban de abrir tu carta.'}
              </p>
            </div>

            {/* Barra de progreso navideña */}
            <div className="w-full h-3 bg-white/20 rounded-full overflow-hidden p-0.5">
              <div
                className="h-full bg-gradient-to-r from-amber-400 to-emerald-400 rounded-full transition-all duration-700"
                style={{
                  width: sendStep === 1 ? '35%' : sendStep === 2 ? '75%' : '100%'
                }}
              />
            </div>
          </div>
        </div>
      )}

    </div>
  );
}

export default function CartaPapaNoelPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-slate-950 flex items-center justify-center text-amber-200">
        <div className="text-center space-y-3">
          <span className="text-4xl animate-bounce block">🎅</span>
          <p className="font-bold text-sm">Abriendo el Taller del Polo Norte...</p>
        </div>
      </div>
    }>
      <CartaPapaNoelContent />
    </Suspense>
  );
}
