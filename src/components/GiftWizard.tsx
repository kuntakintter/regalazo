'use client';

import React, { useState } from 'react';
import confetti from 'canvas-confetti';
import { Sparkles, ArrowRight, RotateCcw, Check, Heart, X, Bot, Compass, User, DollarSign } from 'lucide-react';

interface GiftWizardProps {
  isOpen: boolean;
  onClose: () => void;
  onApplyRecommendation: (filters: { age: string; category: string; gender: 'all' | 'boy' | 'girl'; price: string }) => void;
}

export default function GiftWizard({ isOpen, onClose, onApplyRecommendation }: GiftWizardProps) {
  const [step, setStep] = useState(1);
  const [selectedGender, setSelectedGender] = useState<'all' | 'boy' | 'girl'>('all');
  const [selectedAge, setSelectedAge] = useState<string>('0-12m');
  const [selectedVibe, setSelectedVibe] = useState<string>('all-0-12m');
  const [selectedBudget, setSelectedBudget] = useState<string>('20-50');

  const triggerConfetti = () => {
    try {
      confetti({
        particleCount: 80,
        spread: 60,
        origin: { y: 0.6 },
        colors: ['#6366f1', '#ec4899', '#f59e0b', '#10b981'],
      });
    } catch {}
  };

  const AGE_VIBES_MAP: Record<string, Array<{ id: string; label: string; icon: string; category: string }>> = {
    '0-12m': [
      { id: 'all-0-12m', label: 'Ver Todo de Bebé (0-12m)', icon: '🌟', category: 'all' },
      { id: 'baby-strollers', label: 'Cunas, Carritos y Bañeras', icon: '🚼', category: 'Cochecitos y Mobiliario de Bebé' },
      { id: 'baby-diapers', label: 'Tartas de Pañales Artesanales', icon: '🎂', category: 'Tartas de Pañales' },
      { id: 'baby-hygiene', label: 'Droguería, Aseo y Canastillas', icon: '🧴', category: 'Droguería y Cuidado Infantil' },
      { id: 'baby-toys', label: 'Peluches de Apego y Doudous', icon: '🧸', category: 'Juguetes y Peluches de Bebé' },
    ],
    '1-3': [
      { id: 'all-1-3', label: 'Ver Todo de 1 a 3 Años', icon: '🌟', category: 'all' },
      { id: 'montessori', label: 'Método Montessori y Madera', icon: '🌿', category: 'Método Montessori y Madera' },
      { id: 'duplo', label: 'LEGO DUPLO y Construcción', icon: '🧱', category: 'LEGO DUPLO y Construcción' },
      { id: 'trikes', label: 'Triciclos y Bicis de Equilibrio', icon: '🚲', category: 'Triciclos y Bicis Infantiles' },
      { id: 'imitation', label: 'Cocinas y Juegos de Imitación', icon: '🍳', category: 'Cocina Infantil y Juegos de Imitación' },
      { id: 'sensory', label: 'Arena Mágica y Bloques Blandos', icon: '✨', category: 'Bloques Blandos y Arena Mágica' },
    ],
    '4-6': [
      { id: 'all-4-6', label: 'Ver Todo de 4 a 6 Años', icon: '🌟', category: 'all' },
      { id: 'board-kids', label: 'Juegos de Mesa Infantiles (Monstruo de Colores, Dobble)', icon: '🎲', category: 'Juegos de Mesa Infantiles' },
      { id: 'mario-circuits', label: 'Circuitos de Coches Carrera Mario', icon: '🏎️', category: 'Circuitos de Coches Infantiles' },
      { id: 'scooters', label: 'Patinetes con Ruedas LED', icon: '🛴', category: 'Patinetes Infantiles con Ruedas LED' },
      { id: 'plush-inter', label: 'Peluches Interactivos Pokémon', icon: '⚡', category: 'Peluches Interactivos' },
      { id: 'trunki', label: 'Maletas Correpasillos y Maquillaje Infantil', icon: '🧳', category: 'Maletas Infantiles Correpasillos' },
    ],
    '7-9': [
      { id: 'all-7-9', label: 'Ver Todo de 7 a 9 Años', icon: '🌟', category: 'all' },
      { id: 'scalextric', label: 'Scalextric y Pistas de Carreras', icon: '🏁', category: 'Scalextric y Pistas de Carreras' },
      { id: 'rc-cars', label: 'Coches RC y Teledirigidos Acrobáticos', icon: '🎮', category: 'Coches RC y Teledirigidos' },
      { id: 'magic-borras', label: 'Juegos de Magia Borrás (100 Trucos)', icon: '🎩', category: 'Juegos de Magia Borrás' },
      { id: 'stem-lego', label: 'LEGO Creator 3 en 1 y STEM', icon: '🧱', category: 'LEGO Creator y Construcción' },
      { id: 'family-board', label: 'Estrategia Familiar (Catan Junior, Dixit)', icon: '🎲', category: 'Juegos de Mesa y Estrategia Familiar' },
    ],
    '10-12': [
      { id: 'all-10-12', label: 'Ver Todo de 10 a 12 Años', icon: '🌟', category: 'all' },
      { id: 'virus-games', label: 'Juegos de Cartas (Virus!)', icon: '🃏', category: 'Juegos de Cartas Competitivos (Virus!)' },
      { id: 'drones', label: 'Minidrones Anticolisión con Despegue', icon: '🛸', category: 'Minidrones RC Anticolisión' },
      { id: 'magic-app', label: 'Magia Borrás Avanzada con App', icon: '✨', category: 'Magia Borrás Avanzada con App' },
      { id: 'carcassonne', label: 'Juegos de Estrategia Medieval (Carcassonne)', icon: '🏰', category: 'Juegos de Mesa Medievales (Carcassonne)' },
    ],
    '13-15': [
      { id: 'all-13-15', label: 'Ver Todo de 13 a 15 Años', icon: '🌟', category: 'all' },
      { id: 'headphones', label: 'Auriculares ANC Inalámbricos Anker', icon: '🎧', category: 'Auriculares Inalámbricos ANC' },
      { id: 'catan', label: 'Juegos de Mesa Clásicos (Catán)', icon: '🎲', category: 'Juegos de Mesa Clásicos (Catan)' },
      { id: 'skincare', label: 'Cuidado Facial y Skincare CeraVe', icon: '✨', category: 'Cuidado Facial y Skincare' },
      { id: 'travel-kit', label: 'Kits y Neceseres de Viaje Plegables', icon: '🧳', category: 'Kits de Viaje y Organizadores' },
    ],
    '16-18': [
      { id: 'all-16-18', label: 'Ver Todo de 16 a 18 Años', icon: '🌟', category: 'all' },
      { id: 'ps5-games', label: 'Videojuegos PS5 (FC 25, Elden Ring, Mandos Edge)', icon: '🎮', category: 'Videojuegos y Accesorios PS5' },
      { id: 'gamer-setup', label: 'Setup Gamer, Tiras Neón y Sonido JBL', icon: '💡', category: 'Setup Gamer y Periféricos' },
      { id: 'personal-style', label: 'Estilo Personal, Cuadernos de Cuero y Fragancias', icon: '📓', category: 'Estilo Personal, Cuadernos de Piel y Fragancias' },
      { id: 'tech-vr', label: 'Realidad Virtual Meta Quest 3S', icon: '🥽', category: 'Tecnología y Gadgets (VR, Audio)' },
    ],
    'all': [
      { id: 'all-everything', label: 'Ver Catálogo Completo (Todas las Ideas)', icon: '🌟', category: 'all' },
      { id: 'all-baby', label: 'Cunas, Carritos y Bañeras de Bebé', icon: '🚼', category: 'Cochecitos y Mobiliario de Bebé' },
      { id: 'all-diapers', label: 'Tartas de Pañales Artesanales', icon: '🎂', category: 'Tartas de Pañales' },
      { id: 'all-montessori', label: 'Juguetes Montessori y Madera', icon: '🌿', category: 'Método Montessori y Madera' },
      { id: 'all-lego', label: 'LEGO Classic, DUPLO y Creator', icon: '🧱', category: 'LEGO y Construcción' },
      { id: 'all-scalextric', label: 'Scalextric y Circuitos de Carreras', icon: '🏁', category: 'Scalextric y Circuitos de Coches' },
      { id: 'all-rc', label: 'Coches RC y Teledirigidos Acrobáticos', icon: '🎮', category: 'Coches RC y Teledirigidos' },
      { id: 'all-magic', label: 'Juegos de Magia Borrás', icon: '🎩', category: 'Juegos de Magia Borrás' },
      { id: 'all-boardgames', label: 'Juegos de Mesa y Cartas (Virus, Catan)', icon: '🎲', category: 'Juegos de Mesa y Cartas' },
      { id: 'all-drones', label: 'Minidrones Anticolisión con Cámara', icon: '🛸', category: 'Minidrones RC Anticolisión' },
      { id: 'all-ps5', label: 'Videojuegos PS5 y Mandos Pro', icon: '🎮', category: 'Videojuegos y Accesorios PS5' },
      { id: 'all-gamer', label: 'Setup Gamer, Iluminación Neón y JBL', icon: '💡', category: 'Setup Gamer y Periféricos' },
      { id: 'all-audio', label: 'Auriculares Inalámbricos ANC', icon: '🎧', category: 'Auriculares Inalámbricos ANC' },
      { id: 'all-style', label: 'Cuadernos Vintage de Piel y Perfumes', icon: '📓', category: 'Estilo Personal, Cuadernos de Piel y Fragancias' },
      { id: 'all-skincare', label: 'Cuidado Facial, Skincare y Aseo', icon: '🧴', category: 'Cuidado Facial y Skincare' },
      { id: 'all-travel', label: 'Kits y Maletas de Viaje', icon: '🧳', category: 'Kits de Viaje y Maletas' },
    ]
  };

  const handleFinish = () => {
    triggerConfetti();

    let suggestedCategory = 'all';
    const currentOptions = AGE_VIBES_MAP[selectedAge] || AGE_VIBES_MAP['all'];
    const matched = currentOptions.find((opt) => opt.id === selectedVibe);
    if (matched) {
      suggestedCategory = matched.category;
    }

    onApplyRecommendation({
      gender: selectedGender,
      age: selectedAge,
      category: suggestedCategory,
      price: selectedBudget,
    });

    onClose();

    const element = document.getElementById('catalogo-productos');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  if (!isOpen) return null;

  const currentStep3Options = AGE_VIBES_MAP[selectedAge] || AGE_VIBES_MAP['all'];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-md animate-in fade-in duration-200">
      <div 
        className="w-full max-w-2xl bg-white rounded-3xl shadow-2xl border border-slate-200 overflow-hidden relative flex flex-col max-h-[90vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="p-5 sm:p-6 border-b border-slate-100 flex items-center justify-between bg-gradient-to-r from-indigo-50/80 via-white to-amber-50/50">
          <div className="flex items-center gap-2.5">
            <div className="w-10 h-10 rounded-2xl bg-indigo-600 text-white flex items-center justify-center shadow-md">
              <Bot className="w-5 h-5 animate-pulse" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-black uppercase tracking-wider text-indigo-600 bg-indigo-100/70 px-2 py-0.5 rounded-full">
                  Asistente Inteligente IA
                </span>
                <span className="text-xs text-slate-400 font-bold">Paso {step} de 4</span>
              </div>
              <h3 className="text-lg font-black text-slate-900 leading-tight">
                ¿Te ayudamos a encontrar el regalo perfecto?
              </h3>
            </div>
          </div>
          <button
            onClick={onClose}
            aria-label="Cerrar asistente"
            className="w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-500 hover:text-slate-800 flex items-center justify-center transition-colors cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-5 sm:p-6 overflow-y-auto flex-1">
          
          {/* STEP 1: GENDER */}
          {step === 1 && (
            <div className="space-y-4">
              <div className="text-center sm:text-left">
                <h4 className="text-base font-bold text-slate-900 mb-1">
                  1. ¿Para quién estás buscando el regalo?
                </h4>
                <p className="text-xs text-slate-500">
                  Filtraremos las recomendaciones para adaptar el estilo y acertar seguro.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
                {[
                  { id: 'boy', label: 'Para Chico / Niño', icon: '👦', desc: 'Juguetes, gaming, acción y tecnología' },
                  { id: 'girl', label: 'Para Chica / Niña', icon: '👧', desc: 'Creatividad, estilo, juegos y peluches' },
                  { id: 'all', label: 'Indiferente / Todos', icon: '🎁', desc: 'Regalos unisex y para cualquier ocasión' },
                ].map((item) => (
                  <button
                    key={item.id}
                    onClick={() => setSelectedGender(item.id as any)}
                    className={`p-4 rounded-2xl text-left border transition-all flex flex-col gap-2 ${
                      selectedGender === item.id
                        ? 'border-indigo-600 bg-indigo-50/70 text-indigo-950 shadow-sm ring-2 ring-indigo-500'
                        : 'border-slate-200 bg-slate-50 hover:bg-slate-100 text-slate-800'
                    }`}
                  >
                    <span className="text-3xl">{item.icon}</span>
                    <span className="font-bold text-sm">{item.label}</span>
                    <span className="text-[11px] text-slate-500 leading-tight">{item.desc}</span>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* STEP 2: AGE */}
          {step === 2 && (
            <div className="space-y-4">
              <div className="text-center sm:text-left">
                <h4 className="text-base font-bold text-slate-900 mb-1">
                  2. ¿Qué edad tiene el peque o joven?
                </h4>
                <p className="text-xs text-slate-500">
                  Las temáticas y categorías se adaptarán estrictamente a este rango de edad.
                </p>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 pt-2">
                {[
                  { id: '0-12m', label: 'Bebé (0-12m)', icon: '🧸' },
                  { id: '1-3', label: '1 a 3 Años', icon: '🧩' },
                  { id: '4-6', label: '4 a 6 Años', icon: '🎨' },
                  { id: '7-9', label: '7 a 9 Años', icon: '🚀' },
                  { id: '10-12', label: '10 a 12 Años', icon: '👾' },
                  { id: '13-15', label: '13 a 15 Años', icon: '🎧' },
                  { id: '16-18', label: '16 a 18 Años', icon: '🖤' },
                  { id: 'all', label: 'Todas las edades', icon: '🌟' },
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
                        : 'border-slate-200 bg-slate-50 text-slate-700 hover:bg-slate-100'
                    }`}
                  >
                    <span className="text-xl">{item.icon}</span>
                    <span className="leading-tight">{item.label}</span>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* STEP 3: VIBE / THEME */}
          {step === 3 && (
            <div className="space-y-4">
              <div className="text-center sm:text-left">
                <h4 className="text-base font-bold text-slate-900 mb-1">
                  3. ¿Qué estilo o temática le apasiona?
                </h4>
                <p className="text-xs text-slate-500">
                  Puedes elegir &quot;Ver Todo&quot; para no limitarte o elegir una categoría específica.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-2 max-h-[45vh] overflow-y-auto pr-1">
                {currentStep3Options.map((item) => (
                  <button
                    key={item.id}
                    onClick={() => setSelectedVibe(item.id)}
                    className={`p-3.5 rounded-2xl text-left border text-xs sm:text-sm font-semibold transition-all flex items-center gap-2.5 ${
                      selectedVibe === item.id
                        ? 'border-indigo-600 bg-indigo-600 text-white shadow-md'
                        : item.category === 'all'
                        ? 'border-amber-400 bg-amber-50 text-amber-950 font-bold hover:bg-amber-100'
                        : 'border-slate-200 bg-slate-50 text-slate-700 hover:bg-slate-100'
                    }`}
                  >
                    <span className="text-xl shrink-0">{item.icon}</span>
                    <span className="leading-tight">{item.label}</span>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* STEP 4: BUDGET */}
          {step === 4 && (
            <div className="space-y-4">
              <div className="text-center sm:text-left">
                <h4 className="text-base font-bold text-slate-900 mb-1">
                  4. ¿Cuál es tu presupuesto aproximado?
                </h4>
                <p className="text-xs text-slate-500">
                  Mostraremos las mejores opciones con la mejor relación calidad-precio en Amazon.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                {[
                  { id: '<20', label: 'Menos de 20 €', desc: 'Detalles económicos, regalos escolares y amigos invisibles' },
                  { id: '20-50', label: '20 € a 50 €', desc: 'El rango más equilibrado para cumpleaños y detalles familiares' },
                  { id: '50-100', label: '50 € a 100 €', desc: 'Regalos prémium, juguetes interactivos y periféricos' },
                  { id: '>100', label: 'Más de 100 €', desc: 'Ocasiones especiales, cochecitos, consolas y realidad virtual' },
                  { id: 'all', label: 'Cualquier presupuesto', desc: 'Ver todas las recomendaciones sin límite de precio' },
                ].map((item) => (
                  <button
                    key={item.id}
                    onClick={() => setSelectedBudget(item.id)}
                    className={`p-4 rounded-2xl text-left border transition-all flex flex-col gap-1 ${
                      selectedBudget === item.id
                        ? 'border-indigo-600 bg-indigo-50 text-indigo-950 ring-2 ring-indigo-500'
                        : 'border-slate-200 bg-slate-50 text-slate-700 hover:bg-slate-100'
                    }`}
                  >
                    <span className="font-black text-sm">{item.label}</span>
                    <span className="text-[11px] text-slate-500 leading-tight">{item.desc}</span>
                  </button>
                ))}
              </div>
            </div>
          )}

        </div>

        {/* Footer Navigation */}
        <div className="p-4 sm:p-5 border-t border-slate-100 bg-slate-50/80 flex items-center justify-between">
          {step > 1 ? (
            <button
              onClick={() => setStep(step - 1)}
              className="text-xs font-bold text-slate-500 hover:text-slate-800 px-3 py-2"
            >
              ← Volver al paso {step - 1}
            </button>
          ) : (
            <div />
          )}

          {step < 4 ? (
            <button
              onClick={() => setStep(step + 1)}
              className="px-6 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs sm:text-sm font-bold flex items-center gap-2 shadow-sm transition-all"
            >
              <span>Continuar al Paso {step + 1}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          ) : (
            <button
              onClick={handleFinish}
              className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-500 hover:opacity-95 text-white text-xs sm:text-sm font-black flex items-center gap-2 shadow-md transition-all scale-102"
            >
              <Sparkles className="w-4 h-4 text-amber-300" />
              <span>Ver Recomendaciones IA</span>
            </button>
          )}
        </div>

      </div>
    </div>
  );
}
