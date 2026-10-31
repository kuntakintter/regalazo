'use client';

import React, { useState, useEffect, Suspense } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { 
  CHRISTMAS_TOYS, 
  CHRISTMAS_CATEGORIES, 
  CHRISTMAS_AGE_RANGES,
  ChristmasToy, 
  buildAmazonRemoteCartUrl 
} from '@/data/cartaNavidadToys';
import { getAmazonProductUrl } from '@/lib/amazon';
import { 
  Send, 
  Heart, 
  Check, 
  Copy, 
  Printer, 
  ShoppingBag, 
  Share2, 
  ChevronRight, 
  X,
  Star,
  ExternalLink,
  ShieldCheck,
  Award,
  Search
} from 'lucide-react';

function CartaPapaNoelContent() {
  const searchParams = useSearchParams();

  // State
  const [childName, setChildName] = useState('');
  const [behavior, setBehavior] = useState('🌟 Me he portado súper bien');
  const [selectedToys, setSelectedToys] = useState<ChristmasToy[]>([]);
  const [activeCategory, setActiveCategory] = useState('all');
  const [activeAge, setActiveAge] = useState('all');
  const [searchToyQuery, setSearchToyQuery] = useState('');
  const [isSending, setIsSending] = useState(false);
  const [sendStep, setSendStep] = useState(0); // 0 = idle, 1 = folding, 2 = flying, 3 = delivered
  const [isDelivered, setIsDelivered] = useState(false);
  const [copiedLink, setCopiedLink] = useState(false);

  // Load from URL or localStorage on mount
  useEffect(() => {
    const urlName = searchParams.get('n') || searchParams.get('nombre');
    const urlWishes = searchParams.get('w') || searchParams.get('deseos');

    if (urlName) {
      setChildName(decodeURIComponent(urlName));
    } else {
      const savedName = localStorage.getItem('ubr_carta_nombre');
      if (savedName) setChildName(savedName);
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
        alert('¡Has alcanzado el límite de 6 deseos mágicos! Puedes quitar uno para poner este.');
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
      alert('¡Por favor, escribe tu nombre en la carta para que Papá Noel sepa de quién es!');
      return;
    }
    if (selectedToys.length === 0) {
      alert('¡Elige al menos 1 juguete o deseo para añadir a tu carta!');
      return;
    }

    setIsSending(true);
    setSendStep(1); // Folding

    setTimeout(() => {
      setSendStep(2); // Flying through stars
    }, 1800);

    setTimeout(() => {
      setSendStep(3); // Delivered to North Pole
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
    return `${base}?n=${encodeURIComponent(childName.trim())}&w=${ids}`;
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
    const text = `🎅 ¡Carta a Papá Noel y Reyes Magos de ${name}! 🎄✨\n\nHa pedido estos deseos:\n${lines}\n\n👉 Puedes ver la carta completa aquí: ${url}`;
    const waUrl = `https://api.whatsapp.com/send?text=${encodeURIComponent(text)}`;
    window.open(waUrl, '_blank');
  };

  // Amazon Remote Cart URL (All selected items straight to Amazon cart with affiliate tag)
  const handleOpenAmazonCart = () => {
    const asins = selectedToys.map(t => t.asin);
    const cartUrl = buildAmazonRemoteCartUrl(asins, 'vapegadgets22-21');
    window.open(cartUrl, '_blank');
  };

  // Filter toys by category, age and text search
  const filteredToys = CHRISTMAS_TOYS.filter(t => {
    const matchCat = activeCategory === 'all' || t.category === activeCategory;
    const matchAge = activeAge === 'all' || t.ageRange === activeAge || t.ageRange === 'all';
    const query = searchToyQuery.trim().toLowerCase();
    const matchQuery = !query || 
      t.title.toLowerCase().includes(query) ||
      t.shortTitle.toLowerCase().includes(query) ||
      t.categoryLabel.toLowerCase().includes(query);
    return matchCat && matchAge && matchQuery;
  });

  return (
    <div className="min-h-screen bg-linear-to-b from-red-950 via-slate-900 to-emerald-950 text-slate-100 font-sans pb-24 relative overflow-hidden">
      
      {/* Falling Snow Effect in CSS */}
      <div className="pointer-events-none fixed inset-0 z-0 opacity-40 overflow-hidden" aria-hidden="true">
        <div className="absolute -top-10 left-[10%] w-2 h-2 bg-white rounded-full blur-[0.5px] animate-[snowfall_8s_linear_infinite]" />
        <div className="absolute -top-10 left-[25%] w-3 h-3 bg-white rounded-full blur-[1px] animate-[snowfall_11s_linear_infinite_1s]" />
        <div className="absolute -top-10 left-[45%] w-1.5 h-1.5 bg-white rounded-full animate-[snowfall_7s_linear_infinite_2.5s]" />
        <div className="absolute -top-10 left-[60%] w-2.5 h-2.5 bg-white rounded-full blur-[0.5px] animate-[snowfall_9s_linear_infinite_0.5s]" />
        <div className="absolute -top-10 left-[75%] w-2 h-2 bg-white rounded-full animate-[snowfall_10s_linear_infinite_3s]" />
        <div className="absolute -top-10 left-[90%] w-3 h-3 bg-white rounded-full blur-[1px] animate-[snowfall_12s_linear_infinite_1.5s]" />
      </div>

      <style jsx global>{`
        @keyframes snowfall {
          0% { transform: translateY(-10px) translateX(0); opacity: 0; }
          20% { opacity: 0.8; }
          80% { opacity: 0.8; }
          100% { transform: translateY(105vh) translateX(30px); opacity: 0; }
        }
      `}</style>

      {/* Breadcrumb & Navigation */}
      <div className="relative z-10 max-w-5xl mx-auto px-4 pt-6 pb-2">
        <Link
          href="/"
          className="inline-flex items-center gap-1.5 text-xs text-amber-200/80 hover:text-amber-100 transition-colors bg-white/5 backdrop-blur-sm px-3 py-1.5 rounded-full border border-amber-400/20"
        >
          <span>← Volver a UnBuenRegalo.es</span>
        </Link>
      </div>

      {/* Main Container */}
      <main className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 pt-4 space-y-8">

        {/* ============================================================ */}
        {/* HEADER: Carta Mágica a Papá Noel y Reyes Magos               */}
        {/* ============================================================ */}
        <header className="text-center space-y-3">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-linear-to-r from-red-600/40 via-amber-500/30 to-emerald-600/40 border border-amber-400/40 text-amber-200 text-xs sm:text-sm font-bold shadow-lg">
            <span>✨ Edición Mágica Navidad & Reyes 2026 ✨</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-black tracking-tight text-white drop-shadow-md">
            🎅 Carta a Papá Noel <br className="sm:hidden" />
            <span className="text-transparent bg-clip-text bg-linear-to-r from-amber-200 via-yellow-300 to-amber-100">
              y los Reyes Magos
            </span> 👑
          </h1>
          <p className="text-sm sm:text-base text-slate-300 max-w-xl mx-auto leading-relaxed">
            Escribe tu nombre, pide tus deseos favoritos y envíala directamente volando al Polo Norte en un clic.
          </p>
        </header>

        {/* ============================================================ */}
        {/* STATE: SI YA HA SIDO ENVIADA / CERTIFICADO DE ENTREGA        */}
        {/* ============================================================ */}
        {isDelivered && (
          <section className="bg-linear-to-b from-amber-50 to-orange-50 text-slate-900 rounded-3xl p-6 sm:p-10 border-4 border-amber-400/80 shadow-2xl relative overflow-hidden animate-in fade-in duration-500">
            {/* North Pole Official Stamp Watermark */}
            <div className="absolute -top-6 -right-6 w-32 h-32 rounded-full border-4 border-dashed border-red-700/30 flex items-center justify-center rotate-12 pointer-events-none">
              <span className="text-[11px] font-black uppercase text-red-800/40 text-center tracking-widest">
                OFICIAL POLO NORTE<br />ENTREGADO 2026
              </span>
            </div>

            <div className="max-w-2xl mx-auto text-center space-y-5">
              <div className="w-20 h-20 mx-auto rounded-full bg-linear-to-tr from-red-600 to-emerald-600 text-white flex items-center justify-center text-4xl shadow-xl ring-4 ring-amber-300">
                🎅
              </div>

              <div>
                <span className="inline-block px-3 py-1 bg-red-600 text-white text-xs font-black rounded-full uppercase tracking-wider mb-2">
                  ¡Carta recibida con éxito en Laponia!
                </span>
                <h2 className="text-2xl sm:text-3xl font-black text-slate-900">
                  ¡Ho, ho, ho, {childName || 'pequeño/a'}! ✨
                </h2>
              </div>

              <div className="bg-white/90 backdrop-blur-xs rounded-2xl p-5 border border-amber-300 shadow-inner text-left text-sm sm:text-base text-slate-800 leading-relaxed space-y-3 font-serif">
                <p>
                  &ldquo;Hemos recibido tu carta en el taller del Polo Norte. Los elfos ya tienen apuntados tus {selectedToys.length} deseos y los renos Rodolfo y comitiva están preparando el trineo.&rdquo;
                </p>
                <p className="font-semibold text-red-800">
                  &ldquo;Sigue portándote así de bien en casa y en el cole, comparte tus juguetes y acuéstate prontito en Nochebuena y la noche de Reyes. ¡Feliz Navidad!&rdquo;
                </p>
                <p className="text-right font-black text-slate-900 pt-2">
                  — Con cariño, Papá Noel, Melchor, Gaspar y Baltasar 🎁
                </p>
              </div>

              {/* Lista de deseos pedidos */}
              <div className="pt-2 text-left">
                <h3 className="text-xs font-black uppercase tracking-wider text-slate-600 mb-2">
                  📜 Tus deseos incluidos en la carta:
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {selectedToys.map((t, idx) => (
                    <div key={t.id} className="flex items-center gap-3 bg-white p-2.5 rounded-xl border border-amber-200">
                      <div className="relative w-12 h-12 rounded-lg overflow-hidden shrink-0 bg-slate-100">
                        <Image src={t.imageUrl} alt={t.shortTitle} fill unoptimized className="object-contain p-1" sizes="48px" />
                      </div>
                      <div className="min-w-0 flex-1">
                        <span className="text-[11px] font-bold text-red-700 block">Deseo #{idx + 1}</span>
                        <p className="text-xs font-bold text-slate-900 truncate">{t.shortTitle}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Botón para volver a editar si el niño quiere añadir más */}
              <button
                onClick={() => setIsDelivered(false)}
                className="text-xs font-bold text-slate-600 hover:text-slate-900 underline transition-colors pt-2 cursor-pointer"
              >
                ✏️ ¿Quieres cambiar o añadir algún deseo a tu carta? Pulsa aquí
              </button>

              {/* ============================================================ */}
              {/* ZONA DISCRETA PARA PAPÁS Y MAMÁS (GUARDAR COPIA / REMOTECART) */}
              {/* ============================================================ */}
              <div className="mt-8 pt-6 border-t-2 border-dashed border-amber-300 text-left bg-linear-to-r from-amber-100/60 to-orange-100/60 p-4 sm:p-6 rounded-2xl">
                <div className="flex items-center gap-2 mb-2">
                  <ShieldCheck className="w-4 h-4 text-emerald-700 shrink-0" />
                  <span className="text-xs font-black uppercase tracking-wider text-slate-800">
                    Copia de recuerdo de la carta (Para guardar o compartir)
                  </span>
                </div>
                <p className="text-xs text-slate-600 mb-4">
                  Guarda el enlace de la carta de {childName || 'tu peque'} para no perder la lista de deseos o prepara la compra cómodamente:
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  <button
                    onClick={handleCopyLink}
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
                    <span>Imprimir para dejar bajo el árbol</span>
                  </button>
                </div>
              </div>

            </div>
          </section>
        )}

        {/* ============================================================ */}
        {/* MODO EDICIÓN: EL PERGAMINO Y EL CATÁLOGO DE DESEOS           */}
        {/* ============================================================ */}
        {!isDelivered && (
          <>
            {/* EL PERGAMINO DE LA CARTA */}
            <section className="bg-[#FFFDF6] text-slate-900 rounded-3xl p-6 sm:p-10 border-4 border-amber-300 shadow-2xl relative overflow-hidden">
              
              {/* Decoración navideña de esquinas */}
              <div className="absolute top-2 left-2 text-2xl select-none">🎄</div>
              <div className="absolute top-2 right-2 text-2xl select-none">🔔</div>

              <div className="max-w-2xl mx-auto space-y-6">
                
                {/* Cabecera del pergamino */}
                <div className="border-b-2 border-dashed border-amber-300 pb-4 text-center">
                  <span className="text-xs font-black uppercase tracking-widest text-red-700 block mb-1">
                    Polo Norte Express • Taller Oficial
                  </span>
                  <h2 className="text-xl sm:text-2xl font-black text-slate-900 font-serif">
                    Querido Papá Noel y Reyes Magos 📜
                  </h2>
                </div>

                {/* Formulario de Nombre y Comportamiento del niño */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-xs font-black uppercase text-slate-700 block">
                      Me llamo: <span className="text-red-600">*</span>
                    </label>
                    <input
                      type="text"
                      value={childName}
                      onChange={(e) => setChildName(e.target.value)}
                      placeholder="Escribe tu nombre aquí..."
                      className="w-full px-4 py-2.5 rounded-xl border-2 border-amber-300 focus:border-red-600 focus:outline-hidden font-bold text-slate-900 bg-white placeholder:font-normal placeholder:text-slate-400 text-sm shadow-inner"
                      maxLength={30}
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-black uppercase text-slate-700 block">
                      Este año...
                    </label>
                    <select
                      value={behavior}
                      onChange={(e) => setBehavior(e.target.value)}
                      className="w-full px-4 py-2.5 rounded-xl border-2 border-amber-300 focus:border-red-600 focus:outline-hidden font-bold text-slate-900 bg-white text-sm cursor-pointer"
                    >
                      <option value="🌟 Me he portado súper bien">🌟 Me he portado súper bien</option>
                      <option value="🚀 He ayudado mucho en casa">🚀 He ayudado mucho en casa</option>
                      <option value="📚 He sacado muy buenas notas">📚 He sacado muy buenas notas</option>
                      <option value="💖 He compartido mis juguetes">💖 He compartido mis juguetes</option>
                    </select>
                  </div>
                </div>

                {/* Buzón de Deseos Añadidos (Visual en tiempo real) */}
                <div className="bg-amber-50/80 rounded-2xl p-4 border border-amber-200 space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="text-base">🎁</span>
                      <h3 className="text-xs sm:text-sm font-black uppercase tracking-wider text-slate-800">
                        Mis Deseos para Navidad ({selectedToys.length}/6)
                      </h3>
                    </div>
                    {selectedToys.length > 0 && (
                      <button
                        onClick={() => setSelectedToys([])}
                        className="text-[11px] text-red-700 hover:text-red-900 font-bold underline cursor-pointer"
                      >
                        Vaciar carta
                      </button>
                    )}
                  </div>

                  {selectedToys.length === 0 ? (
                    <div className="py-6 text-center text-slate-500 text-xs sm:text-sm italic">
                      Tu carta todavía está vacía. <br />
                      👇 <strong>Elige abajo tus juguetes favoritos</strong> y se añadirán automáticamente aquí.
                    </div>
                  ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                      {selectedToys.map((t, idx) => (
                        <div key={t.id} className="flex items-center justify-between gap-2 bg-white p-2 rounded-xl border border-amber-300 shadow-xs">
                          <div className="flex items-center gap-2.5 min-w-0">
                            <div className="relative w-10 h-10 rounded-lg overflow-hidden shrink-0 bg-slate-50">
                              <Image src={t.imageUrl} alt={t.shortTitle} fill unoptimized className="object-contain p-1" sizes="40px" />
                            </div>
                            <div className="truncate">
                              <span className="text-[10px] font-bold text-red-700 block">Deseo #{idx + 1}</span>
                              <span className="text-xs font-bold text-slate-900 block truncate">{t.shortTitle}</span>
                            </div>
                          </div>
                          <button
                            onClick={() => removeToy(t.id)}
                            className="p-1 text-slate-400 hover:text-red-600 rounded-lg transition-colors cursor-pointer shrink-0"
                            title="Quitar de mi carta"
                          >
                            <X className="w-4 h-4" />
                          </button>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                {/* BOTÓN GIGANTE DE ENVIAR AL POLO NORTE */}
                <div className="text-center pt-2">
                  <button
                    onClick={handleSendLetter}
                    disabled={selectedToys.length === 0}
                    className={`w-full py-4 px-6 rounded-2xl font-black text-base sm:text-lg shadow-xl transition-all flex items-center justify-center gap-3 cursor-pointer ${
                      selectedToys.length > 0
                        ? 'bg-linear-to-r from-red-600 via-rose-600 to-emerald-600 hover:from-red-700 hover:to-emerald-700 text-white transform hover:scale-[1.02] shadow-red-500/25 ring-4 ring-amber-300/60'
                        : 'bg-slate-300 text-slate-500 cursor-not-allowed'
                    }`}
                  >
                    <Send className="w-5 h-5 animate-bounce" />
                    <span>✉️ ¡Enviar mi carta al Polo Norte! 🚀🎅</span>
                  </button>
                  <span className="text-[11px] text-slate-500 block mt-2">
                    {selectedToys.length === 0 
                      ? '⚠️ Añade al menos 1 juguete para poder enviarla'
                      : '¡El sobre volará directo a Laponia en cuanto pulses el botón!'}
                  </span>
                </div>

              </div>
            </section>

            {/* ============================================================ */}
            {/* EL CATÁLOGO MÁGICO DE JUGUETES                                */}
            {/* ============================================================ */}
            <section className="space-y-4 pt-4">
              <div className="text-center sm:text-left space-y-1">
                <h2 className="text-xl sm:text-2xl font-black text-white flex items-center justify-center sm:justify-start gap-2">
                  <span>🧸</span>
                  <span>Elige tus Juguetes Favoritos</span>
                </h2>
                <p className="text-xs sm:text-sm text-slate-300">
                  Haz clic en <strong>&ldquo;⭐ ¡Pedir este deseo!&rdquo;</strong> en los juguetes que más te gusten para ponerlos en tu carta:
                </p>
              </div>

              {/* Panel de Filtros y Búsqueda */}
              <div className="bg-white/5 backdrop-blur-md rounded-2xl p-4 border border-white/10 space-y-3.5">
                
                {/* 1. Categorías principales (100% visibles con flex-wrap) */}
                <div>
                  <span className="text-[11px] font-black uppercase text-amber-300 block mb-2 tracking-wider">
                    Categorías de Juguetes:
                  </span>
                  <div className="flex flex-wrap items-center gap-2">
                    {CHRISTMAS_CATEGORIES.map(cat => {
                      const isCatActive = activeCategory === cat.id;
                      const count = CHRISTMAS_TOYS.filter(t => cat.id === 'all' || t.category === cat.id).length;
                      return (
                        <button
                          key={cat.id}
                          onClick={() => setActiveCategory(cat.id)}
                          className={`px-3.5 py-2 rounded-xl text-xs font-black transition-all cursor-pointer flex items-center gap-1.5 shadow-xs ${
                            isCatActive
                              ? 'bg-amber-400 text-slate-950 shadow-md shadow-amber-400/20 scale-105 ring-2 ring-amber-300'
                              : 'bg-white/10 hover:bg-white/20 text-slate-200 border border-white/15'
                          }`}
                        >
                          <span>{cat.label}</span>
                          <span className={`text-[10px] px-1.5 py-0.2 rounded-full font-bold ${
                            isCatActive ? 'bg-black/15 text-slate-950' : 'bg-white/15 text-slate-300'
                          }`}>
                            {count}
                          </span>
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* 2. Filtro por Edad y Buscador rápido */}
                <div className="pt-2 border-t border-white/10 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
                  
                  {/* Edades */}
                  <div className="flex items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0 scrollbar-none">
                    <span className="text-[11px] font-bold text-slate-400 mr-1 shrink-0">Edad:</span>
                    {CHRISTMAS_AGE_RANGES.map(age => {
                      const isAgeActive = activeAge === age.id;
                      return (
                        <button
                          key={age.id}
                          onClick={() => setActiveAge(age.id)}
                          className={`px-2.5 py-1 rounded-lg text-[11px] font-bold transition-all cursor-pointer whitespace-nowrap shrink-0 ${
                            isAgeActive
                              ? 'bg-emerald-500 text-white shadow-xs'
                              : 'bg-white/5 hover:bg-white/10 text-slate-300 border border-white/10'
                          }`}
                        >
                          {age.label}
                        </button>
                      );
                    })}
                  </div>

                  {/* Buscador de juguetes */}
                  <div className="relative w-full sm:w-64 shrink-0">
                    <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                    <input
                      type="text"
                      value={searchToyQuery}
                      onChange={(e) => setSearchToyQuery(e.target.value)}
                      placeholder="Buscar juguete (ej. Lego, Mario...)"
                      className="w-full pl-8 pr-7 py-1.5 rounded-xl bg-white/10 border border-white/15 focus:border-amber-400 focus:outline-hidden text-xs text-white placeholder:text-slate-400"
                    />
                    {searchToyQuery && (
                      <button
                        onClick={() => setSearchToyQuery('')}
                        className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white"
                      >
                        <X className="w-3 h-3" />
                      </button>
                    )}
                  </div>

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
                    Restablecer todos los filtros (Ver 24 juguetes)
                  </button>
                </div>
              )}

              {/* Grid de Juguetes */}
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4">
                {filteredToys.map(toy => {
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
                      <div className="relative aspect-square w-full rounded-xl overflow-hidden bg-slate-50 mb-3 group-hover:scale-105 transition-transform duration-300">
                        <Image
                          src={toy.imageUrl}
                          alt={toy.shortTitle}
                          fill
                          unoptimized
                          className="object-contain p-2"
                          sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
                        />
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
                            <span>¡En tu carta!</span>
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
            </section>
          </>
        )}

      </main>

      {/* ============================================================ */}
      {/* ANIMACIÓN MÁGICA DE ENVÍO A PANTALLA COMPLETA                */}
      {/* ============================================================ */}
      {isSending && (
        <div className="fixed inset-0 z-50 bg-slate-950/95 backdrop-blur-md flex items-center justify-center p-4">
          <div className="max-w-md w-full bg-linear-to-b from-red-900 to-slate-900 text-white rounded-3xl p-8 border-4 border-amber-400 text-center shadow-2xl space-y-6 animate-in zoom-in-95 duration-300">
            
            {/* Animación de sobre volando */}
            <div className="relative w-32 h-32 mx-auto flex items-center justify-center">
              <div className="absolute inset-0 rounded-full bg-amber-400/20 animate-ping" />
              <div className="text-7xl animate-bounce select-none">
                {sendStep === 1 ? '📜' : sendStep === 2 ? '✉️' : '🎅'}
              </div>
            </div>

            <div className="space-y-2">
              <h3 className="text-xl sm:text-2xl font-black text-amber-300">
                {sendStep === 1 && 'Sellando tu carta mágica... 🔴'}
                {sendStep === 2 && '¡Volando hacia el Polo Norte! ❄️✨'}
                {sendStep === 3 && '¡Entregada en el taller de Papá Noel! 🎁'}
              </h3>
              <p className="text-xs sm:text-sm text-slate-300">
                {sendStep === 1 && 'Estampando el sello de cera roja oficial de Laponia...'}
                {sendStep === 2 && 'Cruzando el cielo estrellado y las nubes con los renos...'}
                {sendStep === 3 && 'Papá Noel y los elfos acaban de abrir tu carta.'}
              </p>
            </div>

            {/* Barra de progreso navideña */}
            <div className="w-full h-3 bg-white/20 rounded-full overflow-hidden p-0.5">
              <div
                className="h-full bg-linear-to-r from-amber-400 to-emerald-400 rounded-full transition-all duration-700"
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
