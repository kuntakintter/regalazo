'use client';

import React, { useState } from 'react';
import confetti from 'canvas-confetti';
import { Sparkles, ArrowRight, RotateCcw, Check, Heart, X, Bot, Compass, User, DollarSign } from 'lucide-react';

interface GiftWizardProps {
  isOpen: boolean;
  onClose: () => void;
  onApplyRecommendation: (filters: { age: string; category: string; gender: 'all' | 'boy' | 'girl' | 'reveal'; price: string }) => void;
}

export default function GiftWizard({ isOpen, onClose, onApplyRecommendation }: GiftWizardProps) {
  const [step, setStep] = useState(1);
  const [selectedGender, setSelectedGender] = useState<'all' | 'boy' | 'girl' | 'reveal'>('all');
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
      { id: 'all-0-12m', label: 'Ver Todo para Recién Nacidos', icon: '🌟', category: 'all' },
      { id: 'strollers', label: 'Cochecitos y Mobiliario de Bebé', icon: '🚼', category: 'Cochecitos y Mobiliario de Bebé' },
      { id: 'cribs', label: 'Cunas de Colecho y Descanso', icon: '🌙', category: 'Cunas de Colecho y Descanso' },
      { id: 'baths', label: 'Bañeras e Higiene del Bebé', icon: '🛁', category: 'Bañeras e Higiene del Bebé' },
      { id: 'diaper-cakes', label: 'Tartas de Pañales y Canastillas', icon: '🎂', category: 'Tartas de Pañales y Canastillas' },
      { id: 'sensory-toys', label: 'Juguetes Sensoriales y Mordedores', icon: '🧸', category: 'Juguetes Sensoriales y Mordedores' },
      { id: 'soft-books', label: 'Libros Blandos y Cuentos de Tela', icon: '📖', category: 'Libros Blandos y Cuentos de Tela' },
      { id: 'baby-cologne', label: 'Colonias y Cuidado de Bebé', icon: '🧴', category: 'Colonias y Cuidado de Bebé' },
      { id: 'baby-clothes', label: 'Ropa, Bodies y Patucos', icon: '👶', category: 'Ropa, Bodies y Patucos' },
      { id: 'gender-reveal', label: 'Fiestas y Revelación de Género', icon: '🎉', category: 'Fiestas y Revelación de Género' },
    ],
    '1-3': [
      { id: 'all-1-3', label: 'Ver Todo de 1 a 3 Años', icon: '🌟', category: 'all' },
      { id: 'montessori', label: 'Juguetes Montessori y Madera', icon: '🌿', category: 'Juguetes Montessori y Madera' },
      { id: 'duplo', label: 'LEGO DUPLO y Construcción', icon: '🧱', category: 'LEGO DUPLO y Construcción' },
      { id: 'trikes', label: 'Triciclos y Bicis de Equilibrio', icon: '🚲', category: 'Triciclos y Bicis de Equilibrio' },
      { id: 'toddler-books', label: 'Cuentos y Libros Infantiles (El Pollo Pepe)', icon: '📖', category: 'Cuentos y Libros Infantiles' },
      { id: 'imitation', label: 'Cocina Infantil y Juegos de Imitación', icon: '🍳', category: 'Cocina Infantil y Juegos de Imitación' },
      { id: 'playdoh', label: 'Manualidades, Plastilina y Pintura', icon: '🎨', category: 'Manualidades, Plastilina y Pintura' },
      { id: 'toddler-cologne', label: 'Colonias Infantiles y Cuidado', icon: '🧴', category: 'Colonias Infantiles y Cuidado' },
      { id: 'toddler-clothes', label: 'Ropa y Zapatillas Primeros Pasos', icon: '👟', category: 'Ropa y Zapatillas Primeros Pasos' },
    ],
    '4-6': [
      { id: 'all-4-6', label: 'Ver Todo de 4 a 6 Años', icon: '🌟', category: 'all' },
      { id: 'mario-circuits', label: 'Circuitos de Coches Infantiles (Mario Kart)', icon: '🏎️', category: 'Circuitos de Coches Infantiles' },
      { id: 'board-kids', label: 'Juegos de Mesa Infantiles (Monstruo de Colores)', icon: '🎲', category: 'Juegos de Mesa Infantiles' },
      { id: 'scooters', label: 'Patinetes con Ruedas LED', icon: '🛴', category: 'Patinetes con Ruedas LED' },
      { id: 'early-readers', label: 'Cuentos y Primeros Lectores', icon: '📚', category: 'Cuentos y Primeros Lectores' },
      { id: 'crafts-draw', label: 'Manualidades, Dibujo y Pintura', icon: '🎨', category: 'Manualidades, Dibujo y Pintura' },
      { id: 'plush-inter', label: 'Peluches Interactivos y Muñecos (Furby, Bitzee)', icon: '⚡', category: 'Peluches Interactivos y Muñecos' },
      { id: 'costumes', label: 'Disfraces y Ropa Infantil', icon: '👑', category: 'Disfraces y Ropa Infantil' },
      { id: 'kids-cologne', label: 'Colonias Infantiles Frescas (Tous Kids)', icon: '🌸', category: 'Colonias Infantiles Frescas' },
    ],
    '7-9': [
      { id: 'all-7-9', label: 'Ver Todo de 7 a 9 Años', icon: '🌟', category: 'all' },
      { id: 'scalextric', label: 'Scalextric y Pistas de Carreras', icon: '🏁', category: 'Scalextric y Pistas de Carreras' },
      { id: 'rc-cars', label: 'Coches RC y Teledirigidos 4x4', icon: '🎮', category: 'Coches RC y Teledirigidos' },
      { id: 'lego-creator', label: 'LEGO Creator y Construcción 3 en 1', icon: '🧱', category: 'LEGO Creator y Construcción' },
      { id: 'magic-borras', label: 'Juegos de Magia Borrás', icon: '🎩', category: 'Juegos de Magia Borrás' },
      { id: 'family-strategy', label: 'Estrategia Familiar (Catan Junior, Dixit)', icon: '🎲', category: 'Juegos de Mesa y Estrategia Familiar' },
      { id: 'comics-books', label: 'Libros y Cómics Infantiles (Los Compas)', icon: '📖', category: 'Libros y Cómics Infantiles' },
      { id: 'diy-crafts', label: 'Manualidades y Kits Creativos (Pulseras, Slime)', icon: '✂️', category: 'Manualidades y Kits Creativos' },
      { id: 'primary-cologne', label: 'Colonias y Cuidado Personal Infantil', icon: '🧴', category: 'Colonias y Cuidado Personal Infantil' },
      { id: 'sportswear', label: 'Moda y Ropa Deportiva Infantil (Relojes, Gorras)', icon: '🧢', category: 'Moda y Ropa Deportiva Infantil' },
    ],
    '10-12': [
      { id: 'all-10-12', label: 'Ver Todo de 10 a 12 Años', icon: '🌟', category: 'all' },
      { id: 'virus-cardgames', label: 'Juegos de Cartas Competitivos (Virus!)', icon: '🃏', category: 'Juegos de Cartas Competitivos (Virus!)' },
      { id: 'drones-stem', label: 'Drones RC y Robótica STEM', icon: '🛸', category: 'Drones RC y Robótica STEM' },
      { id: 'escape-board', label: 'Juegos de Mesa y Escape Room (Carcassonne)', icon: '🏰', category: 'Juegos de Mesa y Escape Room' },
      { id: 'teen-books', label: 'Libros Juveniles y Cómics (Diario de Greg, Harry Potter)', icon: '📚', category: 'Libros Juveniles y Cómics' },
      { id: 'lettering-crafts', label: 'Manualidades, Lettering y Creatividad (Posca)', icon: '✒️', category: 'Manualidades, Lettering y Creatividad' },
      { id: 'advanced-magic', label: 'Magia Borrás Avanzada y Mentalismo', icon: '✨', category: 'Magia Borrás Avanzada' },
      { id: 'youth-cologne', label: 'Colonias y Cuidado Juvenil (CK One)', icon: '🧴', category: 'Colonias y Cuidado Juvenil' },
      { id: 'streetwear-1012', label: 'Moda Urbana, Sudaderas y Mochilas', icon: '🎒', category: 'Moda Urbana, Sudaderas y Mochilas' },
    ],
    '13-15': [
      { id: 'all-13-15', label: 'Ver Todo de 13 a 15 Años', icon: '🌟', category: 'all' },
      { id: 'anc-audio', label: 'Auriculares Inalámbricos y Audio (JBL, Anker)', icon: '🎧', category: 'Auriculares Inalámbricos y Audio' },
      { id: 'instant-cams', label: 'Cámaras Instantáneas y Fotografía (Instax)', icon: '📸', category: 'Cámaras Instantáneas y Fotografía' },
      { id: 'classic-catan', label: 'Juegos de Mesa Clásicos (Catán Oficial)', icon: '🎲', category: 'Juegos de Mesa Clásicos (Catan)' },
      { id: 'skincare-teen', label: 'Cuidado Facial, Skincare y Colonias (CeraVe)', icon: '✨', category: 'Cuidado Facial, Skincare y Colonias' },
      { id: 'manga-novels', label: 'Libros Juveniles, Fantasía y Manga (Heartstopper)', icon: '📖', category: 'Libros Juveniles, Fantasía y Manga' },
      { id: 'bullet-journal', label: 'Papelería Creativa y Bullet Journal', icon: '📓', category: 'Papelería Creativa y Bullet Journal' },
      { id: 'teen-fashion', label: 'Moda Juvenil, Sudaderas y Gorras', icon: '🧢', category: 'Moda Juvenil, Sudaderas y Gorras' },
      { id: 'urban-backpacks', label: 'Mochilas Urbanas y Viaje Antirrobo', icon: '🎒', category: 'Mochilas Urbanas y Viaje' },
    ],
    '16-18': [
      { id: 'all-16-18', label: 'Ver Todo de 16 a 18 Años', icon: '🌟', category: 'all' },
      { id: 'ps5-gaming', label: 'Videojuegos y Accesorios PS5 (DualSense Edge)', icon: '🎮', category: 'Videojuegos y Accesorios PS5' },
      { id: 'pc-peripherals', label: 'Setup Gamer y Periféricos PC (Logitech G502)', icon: '💡', category: 'Setup Gamer y Periféricos PC' },
      { id: 'vr-audio-hifi', label: 'Tecnología, Audio Hi-Fi y Wearables (Quest 3S, Sony)', icon: '🥽', category: 'Tecnología, Audio Hi-Fi y Wearables' },
      { id: 'perfumes-fragrances', label: 'Perfumería y Fragancias (CK One, WoodWick)', icon: '🌸', category: 'Perfumería y Fragancias' },
      { id: 'young-adult-books', label: 'Libros y Novelas Juveniles (Hábitos Atómicos)', icon: '📚', category: 'Libros y Novelas Juveniles' },
      { id: 'leather-journals', label: 'Cuadernos de Piel y Papelería Artesanal (Moonster)', icon: '📓', category: 'Cuadernos de Piel y Papelería Artesanal' },
      { id: 'urban-fashion-style', label: 'Moda Urbana, Ropa y Accesorios', icon: '🕶️', category: 'Moda Urbana, Ropa y Accesorios' },
    ],
    '+18': [
      { id: 'all-18plus', label: 'Ver Todo a Partir de 18 Años', icon: '🌟', category: 'all' },
      { id: 'smartbox-escapes', label: 'Escapadas, Spa y Experiencias Gourmet (Smartbox)', icon: '✈️', category: 'Escapadas y Experiencias' },
      { id: 'lego-icons', label: 'LEGO Icons Botánico y Maquetas de Colección', icon: '🌸', category: 'LEGO Icons y Maquetas para Adultos' },
      { id: 'adult-boardgames', label: 'Juegos de Mesa y Estrategia (Terraforming Mars, Wingspan)', icon: '🎲', category: 'Juegos de Mesa para Adultos y Parejas' },
      { id: 'drones-rc-pro', label: 'Drones 4K, Buggy RC y Robótica Arduino', icon: '🛸', category: 'Drones, Robótica y RC Avanzado' },
      { id: 'tech-audio-hifi', label: 'Kindle, Audio Hi-Fi y Smart Home (Bose, Philips Hue)', icon: '⚡', category: 'Tecnología, Audio Hi-Fi y Smart Home' },
      { id: 'coffee-cocktails', label: 'Café de Especialidad y Coctelería Gourmet (Cecotec, Hario)', icon: '☕', category: 'Café de Especialidad y Coctelería Gourmet' },
      { id: 'premium-perfumes', label: 'Perfumería Prémium de Autor (Dior Sauvage, Armani Sì, Tom Ford)', icon: '✨', category: 'Perfumería Prémium de Autor' },
    ],
    'all': [
      { id: 'all-everything', label: 'Ver Catálogo Completo (Todas las Ideas)', icon: '🌟', category: 'all' },
      { id: 'all-boardgames', label: 'Juegos de Mesa y Cartas (Virus, Catan)', icon: '🎲', category: 'Juegos de Mesa y Cartas' },
      { id: 'all-lego', label: 'LEGO Classic, DUPLO y Creator', icon: '🧱', category: 'LEGO y Construcción' },
      { id: 'all-scalextric', label: 'Scalextric y Circuitos de Coches', icon: '🏁', category: 'Scalextric y Circuitos de Coches' },
      { id: 'all-gaming', label: 'Videojuegos y Setup Gamer (PS5, Logitech)', icon: '🎮', category: 'Videojuegos y Setup Gamer' },
      { id: 'all-books', label: 'Libros y Lectura Infantil y Juvenil', icon: '📚', category: 'Libros y Lectura Infantil y Juvenil' },
      { id: 'all-fragrances', label: 'Perfumería, Colonias y Fragancias', icon: '🌸', category: 'Perfumería, Colonias y Fragancias' },
      { id: 'all-crafts', label: 'Manualidades y Creatividad', icon: '🎨', category: 'Manualidades y Creatividad' },
      { id: 'all-fashion', label: 'Moda, Ropa y Accesorios', icon: '🧢', category: 'Moda, Ropa y Accesorios' },
      { id: 'all-baby', label: 'Cochecitos y Esenciales de Bebé', icon: '🚼', category: 'Cochecitos y Esenciales de Bebé' },
      { id: 'all-tech', label: 'Tecnología y Gadgets', icon: '⚡', category: 'Tecnología y Gadgets' },
      { id: 'all-wheels', label: 'Bicis y Patinetes con Ruedas', icon: '🛴', category: 'Bicis y Patinetes con Ruedas' },
      { id: 'all-reveal', label: 'Fiestas y Revelación de Género', icon: '🎉', category: 'Fiestas y Revelación de Género' },
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

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                {[
                  { id: 'all', label: 'Todos los Regalos / Unisex', icon: '🎁', desc: 'Ideas universales válidas para cualquier ocasión y estilo' },
                  { id: 'boy', label: 'Para Chico / Niño', icon: '👦', desc: 'Juguetes de acción, coches RC, gaming y tecnología' },
                  { id: 'girl', label: 'Para Chica / Niña', icon: '👧', desc: 'Creatividad, peluches, juegos y estilo propio' },
                  { id: 'reveal', label: 'Fiesta Revelación de Género', icon: '❓', desc: 'Cañones de confeti/humo, globos enigma sorpresa y decoración' },
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

              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5 pt-2">
                {[
                  { id: '0-12m', label: 'Bebé (0-12m)', icon: '🧸' },
                  { id: '1-3', label: '1 a 3 Años', icon: '🧩' },
                  { id: '4-6', label: '4 a 6 Años', icon: '🎨' },
                  { id: '7-9', label: '7 a 9 Años', icon: '🚀' },
                  { id: '10-12', label: '10 a 12 Años', icon: '👾' },
                  { id: '13-15', label: '13 a 15 Años', icon: '🎧' },
                  { id: '16-18', label: '16 a 18 Años', icon: '🖤' },
                  { id: '+18', label: 'A partir de 18 Años', icon: '🥂' },
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
