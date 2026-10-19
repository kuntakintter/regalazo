'use client';

import React, { useState } from 'react';
import confetti from 'canvas-confetti';
import { Sparkles, ArrowRight, RotateCcw, Check, Heart, Gamepad2, Flame, Baby, Compass } from 'lucide-react';

interface GiftWizardProps {
  onApplyRecommendation: (filters: { age: string; category: string; price: string; theme: any }) => void;
  currentTheme: string;
}

export default function GiftWizard({ onApplyRecommendation, currentTheme }: GiftWizardProps) {
  const [step, setStep] = useState(1);
  const [selectedAge, setSelectedAge] = useState<string>('0-12m');
  const [selectedVibe, setSelectedVibe] = useState<string>('any');
  const [selectedBudget, setSelectedBudget] = useState<string>('20-50');

  const triggerConfetti = () => {
    try {
      confetti({
        particleCount: 80,
        spread: 60,
        origin: { y: 0.7 },
        colors: ['#6366f1', '#ec4899', '#f59e0b', '#10b981'],
      });
    } catch {
      // Ignore if canvas-confetti is not loaded
    }
  };

  const AGE_VIBES_MAP: Record<string, Array<{ id: string; label: string; icon: string; category: string }>> = {
    '0-12m': [
      { id: 'baby-strollers', label: 'Cunas, Carritos y Bañeras', icon: '🚼', category: 'Cochecitos y Mobiliario de Bebé' },
      { id: 'baby-diapers', label: 'Tartas de Pañales Artesanales', icon: '🎂', category: 'Tartas de Pañales' },
      { id: 'baby-hygiene', label: 'Droguería, Aseo y Canastillas', icon: '🧴', category: 'Droguería y Cuidado Infantil' },
      { id: 'baby-toys', label: 'Peluches de Apego y Doudous', icon: '🧸', category: 'Juguetes y Peluches de Bebé' },
    ],
    '1-3': [
      { id: 'montessori', label: 'Método Montessori y Madera', icon: '🌿', category: 'Método Montessori y Madera' },
      { id: 'duplo', label: 'LEGO DUPLO y Construcción', icon: '🧱', category: 'LEGO DUPLO y Construcción' },
      { id: 'trikes', label: 'Triciclos y Bicis de Equilibrio', icon: '🚲', category: 'Triciclos y Bicis Infantiles' },
      { id: 'imitation', label: 'Cocinas y Juegos de Imitación', icon: '🍳', category: 'Cocina Infantil y Juegos de Imitación' },
    ],
    '4-6': [
      { id: 'board-kids', label: 'Juegos de Mesa Infantiles', icon: '🎲', category: 'Juegos de Mesa Infantiles' },
      { id: 'mario-circuits', label: 'Circuitos de Coches Carrera Mario', icon: '🏎️', category: 'Circuitos de Coches Infantiles' },
      { id: 'scooters', label: 'Patinetes con Ruedas LED', icon: '🛴', category: 'Patinetes Infantiles con Ruedas LED' },
      { id: 'plush-inter', label: 'Peluches Interactivos Pokémon', icon: '⚡', category: 'Peluches Interactivos' },
    ],
    '7-9': [
      { id: 'scalextric', label: 'Scalextric y Circuitos de Carreras', icon: '🏁', category: 'Scalextric y Pistas de Carreras' },
      { id: 'rc-cars', label: 'Coches RC y Teledirigidos Acrobáticos', icon: '🎮', category: 'Coches RC y Teledirigidos' },
      { id: 'magic-borras', label: 'Juegos de Magia Borrás (100 Trucos)', icon: '🎩', category: 'Juegos de Magia Borrás' },
      { id: 'stem-lego', label: 'LEGO Creator 3 en 1 y STEM', icon: '🧱', category: 'LEGO Creator y Construcción' },
    ],
    '10-12': [
      { id: 'virus-games', label: 'Juegos de Cartas (Virus!)', icon: '🃏', category: 'Juegos de Cartas Competitivos (Virus!)' },
      { id: 'drones', label: 'Minidrones Anticolisión con Despegue', icon: '🛸', category: 'Minidrones RC Anticolisión' },
      { id: 'magic-app', label: 'Magia Borrás Avanzada con App', icon: '✨', category: 'Magia Borrás Avanzada con App' },
      { id: 'carcassonne', label: 'Juegos de Estrategia (Carcassonne)', icon: '🏰', category: 'Juegos de Mesa Medievales (Carcassonne)' },
    ],
    '13-15': [
      { id: 'headphones', label: 'Auriculares ANC Inalámbricos', icon: '🎧', category: 'Auriculares Inalámbricos ANC' },
      { id: 'catan', label: 'Juegos de Mesa Clásicos (Catán)', icon: '🎲', category: 'Juegos de Mesa Clásicos (Catan)' },
      { id: 'skincare', label: 'Cuidado Facial y Skincare CeraVe', icon: '✨', category: 'Cuidado Facial y Skincare' },
      { id: 'travel-kit', label: 'Kits y Neceseres de Viaje', icon: '🧳', category: 'Kits de Viaje y Organizadores' },
    ],
    '16-18': [
      { id: 'ps5-games', label: 'Videojuegos PS5 y Mandos DualSense Pro', icon: '🎮', category: 'Videojuegos y Accesorios PS5' },
      { id: 'gamer-setup', label: 'Setup Gamer, Neón y Sonido JBL', icon: '💡', category: 'Setup Gamer y Periféricos' },
      { id: 'personal-style', label: 'Estilo Personal, Cuadernos de Cuero y Fragancias', icon: '📓', category: 'Estilo Personal, Cuadernos de Piel y Fragancias' },
      { id: 'tech-vr', label: 'Realidad Virtual Meta Quest', icon: '🥽', category: 'Tecnología y Gadgets (VR, Audio)' },
    ],
    'all': [
      { id: 'all-baby', label: 'Esenciales de Bebé y Pañales', icon: '🍼', category: 'Esenciales y Cuidado de Bebé' },
      { id: 'all-toys', label: 'Scalextric, Coches RC y LEGO', icon: '🏎️', category: 'Scalextric y Circuitos de Coches' },
      { id: 'all-games', label: 'Juegos de Mesa Familiares (Virus, Catan)', icon: '🎲', category: 'Juegos de Mesa y Cartas' },
      { id: 'all-gaming', label: 'Videojuegos PS5 y Setup Gamer', icon: '🎮', category: 'Videojuegos y Setup Gamer' },
    ]
  };

  const handleFinish = () => {
    triggerConfetti();

    let suggestedCategory = 'all';
    let suggestedTheme: 'baby' | 'kids' | 'gamer' | 'emo' | 'tech' | 'classic' = 'classic';

    if (selectedAge === '0-12m') suggestedTheme = 'baby';
    else if (selectedAge === '16-18') suggestedTheme = selectedVibe === 'ps5-games' || selectedVibe === 'gamer-setup' ? 'gamer' : 'emo';
    else if (selectedAge === '13-15') suggestedTheme = 'gamer';
    else if (selectedAge === '1-3' || selectedAge === '4-6') suggestedTheme = 'kids';

    // Find category from selected vibe
    const currentOptions = AGE_VIBES_MAP[selectedAge] || AGE_VIBES_MAP['all'];
    const matched = currentOptions.find(opt => opt.id === selectedVibe);
    if (matched) {
      suggestedCategory = matched.category;
    }

    onApplyRecommendation({
      age: selectedAge,
      category: suggestedCategory,
      price: selectedBudget,
      theme: suggestedTheme,
    });

    const element = document.getElementById('catalogo-productos');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const resetWizard = () => {
    setStep(1);
    setSelectedAge('0-12m');
    setSelectedVibe('any');
    setSelectedBudget('20-50');
  };

  const currentStep2Options = AGE_VIBES_MAP[selectedAge] || AGE_VIBES_MAP['all'];

  return (
    <section className={`rounded-3xl p-6 sm:p-8 mb-12 border relative overflow-hidden transition-all duration-300 shadow-lg ${
      currentTheme === 'emo'
        ? 'bg-neutral-900/95 border-neutral-800 text-neutral-100 shadow-rose-950/30'
        : currentTheme === 'gamer'
        ? 'bg-slate-900/95 border-purple-900/80 text-slate-100 shadow-purple-950/30'
        : currentTheme === 'baby'
        ? 'bg-gradient-to-br from-pink-50/90 via-rose-50/70 to-amber-50/60 border-rose-200 text-rose-950 shadow-rose-100/50'
        : 'bg-gradient-to-br from-indigo-50/80 via-white to-amber-50/40 border-slate-200 text-slate-900 shadow-slate-100'
    }`}>
      
      {/* Decorative Badge */}
      <div className="flex items-center justify-between mb-4">
        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-indigo-600 text-white">
          <Compass className="w-3.5 h-3.5" />
          Asistente Interactivo de Regalos
        </span>
        <span className="text-xs font-bold opacity-60">Paso {step} de 3</span>
      </div>

      {/* Title */}
      <h2 className="text-xl sm:text-2xl font-black mb-2 tracking-tight">
        ¿Indeciso con el Regalo? Te ayudamos a acertar en 15 segundos
      </h2>
      <p className="text-xs sm:text-sm opacity-75 mb-6 max-w-2xl">
        Responde 3 preguntas rápidas y nuestro algoritmo inteligente seleccionará las mejores ideas contrastadas de Amazon.es para no fallar.
      </p>

      {/* STEP 1: Age */}
      {step === 1 && (
        <div className="space-y-4">
          <label className="block text-sm font-bold">1. ¿Qué edad tiene el homenajeado o peque?</label>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
            {[
              { id: '0-12m', label: 'Bebé (0-12 meses)', icon: '🧸' },
              { id: '1-3', label: '1 a 3 Años', icon: '🧩' },
              { id: '4-6', label: '4 a 6 Años', icon: '🎨' },
              { id: '7-9', label: '7 a 9 Años', icon: '🚀' },
              { id: '10-12', label: '10 a 12 Años', icon: '👾' },
              { id: '13-15', label: '13 a 15 Años', icon: '🎧' },
              { id: '16-18', label: '16 a 18 Años (Jóvenes)', icon: '🖤' },
              { id: 'all', label: 'Ver todos', icon: '🎁' },
            ].map((item) => (
              <button
                key={item.id}
                onClick={() => {
                  setSelectedAge(item.id);
                  const firstVibe = (AGE_VIBES_MAP[item.id] || AGE_VIBES_MAP['all'])[0]?.id || 'any';
                  setSelectedVibe(firstVibe);
                }}
                className={`p-3.5 rounded-2xl text-left border text-xs sm:text-sm font-semibold transition-all flex items-center gap-2.5 ${
                  selectedAge === item.id
                    ? 'border-indigo-600 bg-indigo-600 text-white shadow-md'
                    : 'border-black/10 dark:border-white/10 bg-black/5 dark:bg-white/5 hover:bg-black/10'
                }`}
              >
                <span className="text-xl">{item.icon}</span>
                <span className="leading-tight">{item.label}</span>
              </button>
            ))}
          </div>

          <div className="pt-4 flex justify-end">
            <button
              onClick={() => setStep(2)}
              className="px-6 py-2.5 rounded-xl bg-indigo-600 text-white text-xs sm:text-sm font-bold flex items-center gap-2 hover:bg-indigo-700 transition-colors shadow-sm"
            >
              <span>Continuar al Paso 2</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {/* STEP 2: Style & Personality */}
      {step === 2 && (
        <div className="space-y-4">
          <label className="block text-sm font-bold">2. ¿Qué estilo o temática estás buscando?</label>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
            {currentStep2Options.map((item) => (
              <button
                key={item.id}
                onClick={() => setSelectedVibe(item.id)}
                className={`p-3.5 rounded-2xl text-left border text-xs sm:text-sm font-semibold transition-all flex items-center gap-2.5 ${
                  selectedVibe === item.id
                    ? 'border-indigo-600 bg-indigo-600 text-white shadow-md'
                    : 'border-black/10 dark:border-white/10 bg-black/5 dark:bg-white/5 hover:bg-black/10'
                }`}
              >
                <span className="text-xl">{item.icon}</span>
                <span className="leading-tight">{item.label}</span>
              </button>
            ))}
          </div>

          <div className="pt-4 flex justify-between items-center">
            <button
              onClick={() => setStep(1)}
              className="text-xs font-semibold opacity-70 hover:opacity-100 flex items-center gap-1"
            >
              ← Volver atrás
            </button>
            <button
              onClick={() => setStep(3)}
              className="px-6 py-2.5 rounded-xl bg-indigo-600 text-white text-xs sm:text-sm font-bold flex items-center gap-2 hover:bg-indigo-700 transition-colors shadow-sm"
            >
              <span>Continuar al Paso 3</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {/* STEP 3: Budget */}
      {step === 3 && (
        <div className="space-y-4">
          <label className="block text-sm font-bold">3. ¿Qué presupuesto te has fijado?</label>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
            {[
              { id: '<20', label: 'Menos de 20 €', desc: 'Detalle o regalo escolar' },
              { id: '20-50', label: '20 € a 50 €', desc: 'Rango ideal de cumpleaños' },
              { id: '50-100', label: '50 € a 100 €', desc: 'Regalo conjunto prémium' },
              { id: 'all', label: 'Sin límite', desc: 'Buscamos lo mejor de lo mejor' },
            ].map((item) => (
              <button
                key={item.id}
                onClick={() => setSelectedBudget(item.id)}
                className={`p-3.5 rounded-2xl text-left border text-xs sm:text-sm font-semibold transition-all flex flex-col justify-between ${
                  selectedBudget === item.id
                    ? 'border-indigo-600 bg-indigo-600 text-white shadow-md'
                    : 'border-black/10 dark:border-white/10 bg-black/5 dark:bg-white/5 hover:bg-black/10'
                }`}
              >
                <span className="font-bold text-sm mb-1">{item.label}</span>
                <span className="text-[11px] opacity-80">{item.desc}</span>
              </button>
            ))}
          </div>

          <div className="pt-4 flex justify-between items-center">
            <button
              onClick={() => setStep(2)}
              className="text-xs font-semibold opacity-70 hover:opacity-100 flex items-center gap-1"
            >
              ← Volver atrás
            </button>
            <button
              onClick={handleFinish}
              className="px-8 py-3 rounded-2xl bg-gradient-to-r from-emerald-600 to-teal-600 text-white text-sm font-black flex items-center gap-2 hover:from-emerald-500 hover:to-teal-500 transition-all shadow-md hover:scale-105 active:scale-95"
            >
              <Sparkles className="w-4 h-4" />
              <span>¡Encontrar mi Regalo Ideal!</span>
            </button>
          </div>
        </div>
      )}

    </section>
  );
}
