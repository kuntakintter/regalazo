'use client';

import React, { useState, useEffect } from 'react';
import confetti from 'canvas-confetti';
import {
  Sparkles,
  ArrowRight,
  RotateCcw,
  Check,
  Heart,
  X,
  Bot,
  User,
  Users,
  Baby,
  Puzzle,
  Palette,
  Wand2,
  Rocket,
  Headphones,
  Gamepad2,
  Wine,
  PartyPopper,
  LayoutGrid,
  Smartphone,
  Tag,
  Gift,
  Gem,
  Crown,
  Coins
} from 'lucide-react';

interface GiftWizardProps {
  isOpen: boolean;
  initialAge?: string;
  initialGender?: 'all' | 'boy' | 'girl' | 'reveal';
  onClose: () => void;
  onApplyRecommendation: (filters: { age: string; category: string; gender: 'all' | 'boy' | 'girl' | 'reveal'; price: string }) => void;
}

interface Step1AgeOption {
  id: string;
  label: string;
  badge: string;
  desc: string;
  icon: React.ComponentType<{ className?: string }>;
  iconColor: string;
}

const AGE_STEP_OPTIONS: Step1AgeOption[] = [
  {
    id: '0-12m',
    label: 'Bebé y Recién Nacido (0 a 12 meses)',
    badge: '0-12 Meses',
    desc: 'Cochecitos, cunas colecho, tartas Dodot, bañeras, cuentos de tela y colonias suaves',
    icon: Baby,
    iconColor: 'text-rose-500'
  },
  {
    id: '1-3',
    label: '1 a 3 Años (Primeros Pasos)',
    badge: '1-3 Años',
    desc: 'Juguetes Montessori de madera, LEGO DUPLO, triciclos evolutivos y plastilina',
    icon: Puzzle,
    iconColor: 'text-emerald-500'
  },
  {
    id: '4-6',
    label: '4 a 6 Años (Infantil y Juego)',
    badge: '4-6 Años',
    desc: 'Circuitos Mario Kart, patinetes con luz LED, juegos de mesa y manualidades',
    icon: Palette,
    iconColor: 'text-amber-500'
  },
  {
    id: '7-9',
    label: '7 a 9 Años (Primaria y Acción)',
    badge: '7-9 Años',
    desc: 'Scalextric, coches RC teledirigidos 4x4, LEGO Creator 3 en 1 y Magia Borrás',
    icon: Wand2,
    iconColor: 'text-indigo-500'
  },
  {
    id: '10-12',
    label: '10 a 12 Años (Preadolescentes)',
    badge: '10-12 Años',
    desc: 'Juego Virus!, minidrones con cámara anticolisión, escape rooms y Diario de Greg',
    icon: Rocket,
    iconColor: 'text-blue-500'
  },
  {
    id: '13-15',
    label: '13 a 15 Años (Adolescentes)',
    badge: '13-15 Años',
    desc: 'Smartphones, auriculares ANC, cámaras Instax, Catan oficial y cuidado facial teen',
    icon: Headphones,
    iconColor: 'text-violet-500'
  },
  {
    id: '16-18',
    label: '16 a 18 Años (Jóvenes)',
    badge: '16-18 Años',
    desc: 'Smartphones de alta gama, mandos PS5 Edge, periféricos PC gamer, libros y perfumería',
    icon: Gamepad2,
    iconColor: 'text-purple-600'
  },
  {
    id: '+18',
    label: 'A partir de 18 Años (Adultos)',
    badge: 'Adultos 18+',
    desc: 'Smartbox escapadas spa, smartphones buque insignia, LEGO Icons, drones 4K y gourmet',
    icon: Wine,
    iconColor: 'text-rose-600'
  },
  {
    id: 'reveal',
    label: 'Fiesta Revelación de Género',
    badge: 'Baby Shower',
    desc: 'Cañones de confeti y humo holi biodegradables, globos enigma sorpresa y photocall',
    icon: PartyPopper,
    iconColor: 'text-amber-500'
  },
  {
    id: 'all',
    label: 'Todas las Edades (Ver Todo)',
    badge: 'Catálogo',
    desc: 'Explorar las mejores ideas de regalo y superventas para cualquier edad',
    icon: LayoutGrid,
    iconColor: 'text-slate-600'
  }
];

// Opciones de temáticas estrictamente ligadas a la edad seleccionada
const AGE_VIBES_MAP: Record<string, Array<{ id: string; label: string; desc: string; category: string }>> = {
  '0-12m': [
    { id: 'all-0-12m', label: 'Ver Todo para Recién Nacidos', desc: 'Las mejores recomendaciones indispensables para bebés', category: 'all' },
    { id: 'diaper-cakes', label: 'Tartas de Pañales y Canastillas', desc: 'Regalo estrella útil con pañales Dodot y cosmética Mustela', category: 'Tartas de Pañales y Canastillas' },
    { id: 'cribs', label: 'Cunas de Colecho y Descanso', desc: 'Cunas Chicco, hamacas ergonómicas y nidos antivuelco', category: 'Cunas de Colecho y Descanso' },
    { id: 'strollers', label: 'Cochecitos y Mobiliario de Bebé', desc: 'Sillas de paseo ligeras, tronas evolutivas y parque cuna', category: 'Cochecitos y Mobiliario de Bebé' },
    { id: 'baths', label: 'Bañeras e Higiene del Bebé', desc: 'Bañeras plegables antideslizantes y sets de cuidado', category: 'Bañeras e Higiene del Bebé' },
    { id: 'sensory-toys', label: 'Juguetes Sensoriales y Mordedores', desc: 'Sonajeros suaves, Sophie la Girafe y mantas de juego', category: 'Juguetes Sensoriales y Mordedores' },
    { id: 'soft-books', label: 'Libros Blandos y Cuentos de Tela', desc: 'Libros táctiles con texturas y alto contraste', category: 'Libros Blandos y Cuentos de Tela' },
    { id: 'baby-cologne', label: 'Colonias y Cuidado de Bebé', desc: 'Fragancias sin alcohol suaves de Suavinex y Mustela', category: 'Colonias y Cuidado de Bebé' },
    { id: 'baby-clothes', label: 'Ropa, Bodies y Patucos', desc: 'Prendas 100% algodón orgánico hipoalergénico', category: 'Ropa, Bodies y Patucos' },
    { id: 'gender-reveal', label: 'Fiestas y Revelación de Género', desc: 'Cañones de confeti, polvos holi y globos sorpresa', category: 'Fiestas y Revelación de Género' }
  ],
  '1-3': [
    { id: 'all-1-3', label: 'Ver Todo de 1 a 3 Años', desc: 'Selección pedagógica contrastada para primeros pasos', category: 'all' },
    { id: 'montessori', label: 'Juguetes Montessori y Madera', desc: 'Torres de aprendizaje, bloques de apilar y motricidad fina', category: 'Juguetes Montessori y Madera' },
    { id: 'duplo', label: 'LEGO DUPLO y Construcción', desc: 'Piezas grandes y seguras para manos pequeñas', category: 'LEGO DUPLO y Construcción' },
    { id: 'trikes', label: 'Triciclos y Bicis de Equilibrio', desc: 'Bicicletas sin pedales y correpasillos evolutivos', category: 'Triciclos y Bicis de Equilibrio' },
    { id: 'toddler-books', label: 'Cuentos y Libros Infantiles', desc: 'El Pollo Pepe, cuentos con solapas y títeres', category: 'Cuentos y Libros Infantiles' },
    { id: 'imitation', label: 'Cocina Infantil y Juegos de Imitación', desc: 'Comiditas de madera, cocinitas y herramientas seguras', category: 'Cocina Infantil y Juegos de Imitación' },
    { id: 'playdoh', label: 'Manualidades, Plastilina y Pintura', desc: 'Botes Play-Doh libres de tóxicos y ceras lavables', category: 'Manualidades, Plastilina y Pintura' },
    { id: 'toddler-cologne', label: 'Colonias Infantiles y Cuidado', desc: 'Aromas frescos y colonias suaves para peques', category: 'Colonias Infantiles y Cuidado' },
    { id: 'toddler-clothes', label: 'Ropa y Zapatillas Primeros Pasos', desc: 'Calzado respetuoso ergonómico y conjuntos cómodos', category: 'Ropa y Zapatillas Primeros Pasos' }
  ],
  '4-6': [
    { id: 'all-4-6', label: 'Ver Todo de 4 a 6 Años', desc: 'Los regalos infantiles más divertidos y creativos', category: 'all' },
    { id: 'mario-circuits', label: 'Circuitos de Coches Infantiles (Mario Kart)', desc: 'Pistas Carrera First y bólidos teledirigidos', category: 'Circuitos de Coches Infantiles' },
    { id: 'board-kids', label: 'Juegos de Mesa Infantiles', desc: 'El Monstruo de Colores, Dobble Kids y juegos cooperativos', category: 'Juegos de Mesa Infantiles' },
    { id: 'scooters', label: 'Patinetes con Ruedas LED', desc: 'Patinetes de 3 ruedas autoestables con luces dinámicas', category: 'Patinetes con Ruedas LED' },
    { id: 'early-readers', label: 'Cuentos y Primeros Lectores', desc: 'Letra mayúscula y cuentos ilustrados de aventuras', category: 'Cuentos y Primeros Lectores' },
    { id: 'crafts-draw', label: 'Manualidades, Dibujo y Pintura', desc: 'Maletines de dibujo, acuarelas y plastilina', category: 'Manualidades, Dibujo y Pintura' },
    { id: 'plush-inter', label: 'Peluches Interactivos y Muñecos', desc: 'Bitzee mascota digital interactiva, Pikachu y peluches', category: 'Peluches Interactivos y Muñecos' },
    { id: 'costumes', label: 'Disfraces y Ropa Infantil', desc: 'Superhéroes, princesas y ropa temática divertida', category: 'Disfraces y Ropa Infantil' },
    { id: 'kids-cologne', label: 'Colonias Infantiles Frescas', desc: 'Tous Kids, frescura y aromas suaves duraderos', category: 'Colonias Infantiles Frescas' }
  ],
  '7-9': [
    { id: 'all-7-9', label: 'Ver Todo de 7 a 9 Años', desc: 'Acción, circuitos, magia y estrategia familiar', category: 'all' },
    { id: 'scalextric', label: 'Scalextric y Pistas de Carreras', desc: 'Pistas Scalextric Compact con looping y mandos turbo', category: 'Scalextric y Pistas de Carreras' },
    { id: 'rc-cars', label: 'Coches RC y Teledirigidos 4x4', desc: 'Monster trucks todoterreno resistentes a choques', category: 'Coches RC y Teledirigidos' },
    { id: 'lego-creator', label: 'LEGO Creator y Construcción 3 en 1', desc: 'Sets para construir animales, vehículos y naves', category: 'LEGO Creator y Construcción' },
    { id: 'magic-borras', label: 'Juegos de Magia Borrás', desc: 'Kits oficiales de ilusionismo y trucos de magia', category: 'Juegos de Magia Borrás' },
    { id: 'family-strategy', label: 'Estrategia Familiar (Catan Junior, Dixit)', desc: 'Partidas dinámicas para jugar juntos en familia', category: 'Juegos de Mesa y Estrategia Familiar' },
    { id: 'comics-books', label: 'Libros y Cómics Infantiles', desc: 'Los Compas, Amanda Black y cómics divertidos', category: 'Libros y Cómics Infantiles' },
    { id: 'diy-crafts', label: 'Manualidades y Kits Creativos', desc: 'Kits de pulseras, alfarería y experimentos científicos', category: 'Manualidades y Kits Creativos' },
    { id: 'sportswear', label: 'Moda y Ropa Deportiva Infantil', desc: 'Sudaderas deportivas, gorras y relojes digitales', category: 'Moda y Ropa Deportiva Infantil' }
  ],
  '10-12': [
    { id: 'all-10-12', label: 'Ver Todo de 10 a 12 Años', desc: 'Juegos competitivos, drones STEM y retos mentales', category: 'all' },
    { id: 'virus-cardgames', label: 'Juegos de Cartas Competitivos (Virus!)', desc: 'El superventas Virus! y juegos de piques rápidos', category: 'Juegos de Cartas Competitivos (Virus!)' },
    { id: 'drones-stem', label: 'Drones RC y Robótica STEM', desc: 'Minidrones Potensic con cámara y protectores 360°', category: 'Drones RC y Robótica STEM' },
    { id: 'escape-board', label: 'Juegos de Mesa y Escape Room', desc: 'Carcassonne, Exit y enigmas cooperativos', category: 'Juegos de Mesa y Escape Room' },
    { id: 'teen-books', label: 'Libros Juveniles y Cómics', desc: 'Diario de Greg, Harry Potter y novelas de intriga', category: 'Libros Juveniles y Cómics' },
    { id: 'lettering-crafts', label: 'Manualidades, Lettering y Creatividad', desc: 'Rotuladores Posca, libretas de dibujo y caligrafía', category: 'Manualidades, Lettering y Creatividad' },
    { id: 'advanced-magic', label: 'Magia Borrás Avanzada', desc: 'Trucos de prestidigitación con efectos luminosos', category: 'Magia Borrás Avanzada' },
    { id: 'streetwear-1012', label: 'Moda Urbana, Sudaderas y Mochilas', desc: 'Mochilas escolares resistentes y ropa urbana juvenil', category: 'Moda Urbana, Sudaderas y Mochilas' }
  ],
  '13-15': [
    { id: 'all-13-15', label: 'Ver Todo de 13 a 15 Años', desc: 'Tecnología, audio, smartphones y estilo adolescente', category: 'all' },
    { id: 'smartphones-1315', label: 'Smartphones y Telefonía', desc: 'iPhone 15, Galaxy A55 5G, Pixel 8a y Xiaomi Redmi', category: 'Smartphones y Telefonía' },
    { id: 'anc-audio', label: 'Auriculares Inalámbricos y Audio', desc: 'Auriculares JBL y Soundcore con cancelación de ruido', category: 'Auriculares Inalámbricos y Audio' },
    { id: 'instant-cams', label: 'Cámaras Instantáneas y Fotografía', desc: 'Fujifilm Instax Mini 12 y carretes para fotos físicas', category: 'Cámaras Instantáneas y Fotografía' },
    { id: 'classic-catan', label: 'Juegos de Mesa Clásicos (Catán Oficial)', desc: 'El gran clásico de comercio, colonización y estrategia', category: 'Juegos de Mesa Clásicos (Catan)' },
    { id: 'skincare-teen', label: 'Cuidado Facial, Skincare y Colonias', desc: 'Rutinas CeraVe antiimperfecciones y fragancias frescas', category: 'Cuidado Facial, Skincare y Colonias' },
    { id: 'manga-novels', label: 'Libros Juveniles, Fantasía y Manga', desc: 'Manga shonen, novelas gráficas y literatura juvenil', category: 'Libros Juveniles, Fantasía y Manga' },
    { id: 'urban-backpacks', label: 'Mochilas Urbanas y Viaje Antirrobo', desc: 'Mochilas ergonómicas con puerto USB para portátil', category: 'Mochilas Urbanas y Viaje' }
  ],
  '16-18': [
    { id: 'all-16-18', label: 'Ver Todo de 16 a 18 Años', desc: 'Lo último en gaming, smartphones de alta gama y estilo propio', category: 'all' },
    { id: 'smartphones-1618', label: 'Smartphones y Telefonía', desc: 'iPhone 16, Samsung Galaxy S24, Xiaomi 14 y OPPO Reno12', category: 'Smartphones y Telefonía' },
    { id: 'ps5-gaming', label: 'Videojuegos y Accesorios PS5', desc: 'Mandos de competición DualSense Edge y títulos top', category: 'Videojuegos y Accesorios PS5' },
    { id: 'pc-peripherals', label: 'Setup Gamer y Periféricos PC', desc: 'Ratones Logitech Lightspeed, teclados mecánicos y luces', category: 'Setup Gamer y Periféricos PC' },
    { id: 'vr-audio-hifi', label: 'Tecnología, Audio Hi-Fi y Wearables', desc: 'Gafas VR Meta Quest 3S y auriculares de alta fidelidad', category: 'Tecnología, Audio Hi-Fi y Wearables' },
    { id: 'perfumes-fragrances', label: 'Perfumería y Fragancias', desc: 'CK One, fragancias icónicas y velas aromáticas WoodWick', category: 'Perfumería y Fragancias' },
    { id: 'leather-journals', label: 'Cuadernos de Piel y Papelería Artesanal', desc: 'Diarios encuadernados a mano en cuero vintage Moonster', category: 'Cuadernos de Piel y Papelería Artesanal' },
    { id: 'urban-fashion-style', label: 'Moda Urbana, Ropa y Accesorios', desc: 'Gafas de sol, relojes minimalistas y carteras slim', category: 'Moda Urbana, Ropa y Accesorios' }
  ],
  '+18': [
    { id: 'all-18plus', label: 'Ver Todo a Partir de 18 Años', desc: 'Regalos premium para adultos, experiencias y tecnología', category: 'all' },
    { id: 'smartphones-18plus', label: 'Smartphones y Buques Insignia', desc: 'iPhone 16 Pro Titanio, Galaxy S24 Ultra, Pixel 9 y Huawei', category: 'Smartphones y Telefonía' },
    { id: 'smartbox-escapes', label: 'Escapadas y Experiencias (Smartbox)', desc: 'Cajas regalo de fin de semana, spas, cenas y aventuras', category: 'Escapadas y Experiencias' },
    { id: 'lego-icons', label: 'LEGO Icons y Maquetas para Adultos', desc: 'Sets botánicos, vehículos clásicos y maquetas avanzadas', category: 'LEGO Icons y Maquetas para Adultos' },
    { id: 'adult-boardgames', label: 'Juegos de Mesa para Adultos y Parejas', desc: 'Terraforming Mars, Wingspan y juegos estratégicos expertos', category: 'Juegos de Mesa para Adultos y Parejas' },
    { id: 'drones-rc-pro', label: 'Drones, Robótica y RC Avanzado', desc: 'Drones con cámara 4K gimbal, buggies 60 km/h y kits Arduino', category: 'Drones, Robótica y RC Avanzado' },
    { id: 'tech-audio-hifi', label: 'Tecnología, Audio Hi-Fi y Smart Home', desc: 'Lectores Kindle, altavoces Bose y domótica Philips Hue', category: 'Tecnología, Audio Hi-Fi y Smart Home' },
    { id: 'coffee-cocktails', label: 'Café de Especialidad y Coctelería Gourmet', desc: 'Cafeteras express Cecotec, kits coctelería y accesorios barista', category: 'Café de Especialidad y Coctelería Gourmet' },
    { id: 'premium-perfumes', label: 'Perfumería Prémium de Autor', desc: 'Dior Sauvage, Giorgio Armani Sì, Tom Ford y alta perfumería', category: 'Perfumería Prémium de Autor' }
  ],
  'reveal': [
    { id: 'all-reveal-party', label: 'Ver Todo para Fiesta Revelación', desc: 'Todos los artículos de fiesta enigma y sorpresa', category: 'Fiestas y Revelación de Género' },
    { id: 'cannons-confetti', label: 'Cañones de Confeti y Humo Holi', desc: 'Disparadores biodegradables rosas o azules para el clímax', category: 'Fiestas y Revelación de Género' },
    { id: 'enigma-balloons', label: 'Globos Gigantes Enigma de 90 cm', desc: 'Globos negros sorpresa para pinchar con confeti interior', category: 'Fiestas y Revelación de Género' },
    { id: 'powder-smoke', label: 'Polvos Holi y Efectos Visuales', desc: 'Polvos de colores 100% naturales no tóxicos para fotos', category: 'Fiestas y Revelación de Género' }
  ],
  'all': [
    { id: 'all-everything', label: 'Ver Catálogo Completo (Todas las Ideas)', desc: 'Explora los 218 productos verificados', category: 'all' },
    { id: 'all-phones', label: 'Smartphones y Telefonía', desc: 'Buques insignia Apple, Samsung, Xiaomi, Pixel y Oppo', category: 'Smartphones y Telefonía' },
    { id: 'all-boardgames', label: 'Juegos de Mesa y Cartas', desc: 'Desde Virus! y Catan hasta Terraforming Mars', category: 'Juegos de Mesa y Cartas' },
    { id: 'all-lego', label: 'LEGO y Construcción', desc: 'DUPLO, Creator 3 en 1 y LEGO Icons para adultos', category: 'LEGO y Construcción' },
    { id: 'all-gaming', label: 'Videojuegos y Setup Gamer', desc: 'Mandos PS5, periféricos Logitech y setup', category: 'Videojuegos y Setup Gamer' },
    { id: 'all-escapes', label: 'Escapadas y Experiencias (Smartbox)', desc: 'Fines de semana, spas y cenas gourmet', category: 'Escapadas y Experiencias' },
    { id: 'all-perfumes', label: 'Perfumería y Fragancias', desc: 'Colonias infantiles, CK One y perfumería prémium', category: 'Perfumería, Colonias y Fragancias' },
    { id: 'all-baby', label: 'Cochecitos y Esenciales de Bebé', desc: 'Tartas de pañales, cunas, carritos y bañeras', category: 'Cochecitos y Esenciales de Bebé' }
  ]
};

export default function GiftWizard({
  isOpen,
  initialAge = 'all',
  initialGender = 'all',
  onClose,
  onApplyRecommendation
}: GiftWizardProps) {
  const [step, setStep] = useState(1);
  const [selectedAge, setSelectedAge] = useState<string>('0-12m');
  const [selectedGender, setSelectedGender] = useState<'all' | 'boy' | 'girl' | 'reveal'>('all');
  const [selectedVibe, setSelectedVibe] = useState<string>('all-0-12m');
  const [selectedBudget, setSelectedBudget] = useState<string>('20-50');

  // Sincronizar inteligentemente si el usuario ya tenía una edad seleccionada en la web
  useEffect(() => {
    if (isOpen) {
      setStep(1);
      const validInitial = initialAge && initialAge !== 'all' ? initialAge : '0-12m';
      setSelectedAge(validInitial);
      setSelectedGender(initialGender || 'all');
      const vibes = AGE_VIBES_MAP[validInitial] || AGE_VIBES_MAP['all'];
      setSelectedVibe(vibes[0]?.id || 'any');
    }
  }, [isOpen, initialAge, initialGender]);

  if (!isOpen) return null;

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

  const handleSelectAge = (ageId: string) => {
    setSelectedAge(ageId);

    // Si elige fiesta revelación, el género es automáticamente reveal
    if (ageId === 'reveal') {
      setSelectedGender('reveal');
    } else if (selectedGender === 'reveal') {
      setSelectedGender('all');
    }

    const availableVibes = AGE_VIBES_MAP[ageId] || AGE_VIBES_MAP['all'];
    setSelectedVibe(availableVibes[0]?.id || 'any');
  };

  const handleFinish = () => {
    triggerConfetti();

    let targetAge = selectedAge;
    let targetGender = selectedGender;
    let targetCategory = 'all';

    if (selectedAge === 'reveal') {
      targetAge = '0-12m';
      targetGender = 'reveal';
      targetCategory = 'Fiestas y Revelación de Género';
    } else {
      const currentOptions = AGE_VIBES_MAP[selectedAge] || AGE_VIBES_MAP['all'];
      const matched = currentOptions.find((opt) => opt.id === selectedVibe);
      if (matched) {
        targetCategory = matched.category;
      }
    }

    onApplyRecommendation({
      age: targetAge,
      gender: targetGender,
      category: targetCategory,
      price: selectedBudget,
    });

    onClose();

    const element = document.getElementById('catalogo-productos');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const currentVibes = AGE_VIBES_MAP[selectedAge] || AGE_VIBES_MAP['all'];
  const isRevealMode = selectedAge === 'reveal';

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-950/75 backdrop-blur-md animate-in fade-in duration-200">
      <div 
        className="w-full max-w-2xl bg-white rounded-3xl shadow-2xl border border-slate-200 overflow-hidden relative flex flex-col max-h-[92vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="p-4 sm:p-6 border-b border-slate-100 flex items-center justify-between bg-gradient-to-r from-indigo-50/90 via-white to-purple-50/50">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-indigo-600 text-white flex items-center justify-center shadow-md">
              <Bot className="w-5 h-5 animate-pulse" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-[11px] font-black uppercase tracking-wider text-indigo-700 bg-indigo-100/80 px-2 py-0.5 rounded-full">
                  Asistente Inteligente IA
                </span>
                <span className="text-xs text-slate-400 font-bold">Paso {step} de 4</span>
              </div>
              <h3 className="text-base sm:text-lg font-black text-slate-900 leading-tight">
                Encuentra el regalo perfecto con lógica
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
        <div className="p-4 sm:p-6 overflow-y-auto flex-1">
          
          {/* PASO 1: EDAD / ETAPA (PUNTO DE PARTIDA INELUDIBLE) */}
          {step === 1 && (
            <div className="space-y-4">
              <div className="text-left">
                <span className="text-xs font-black uppercase tracking-wider text-indigo-600 block mb-1">
                  Paso 1 · Edad del destinatario
                </span>
                <h4 className="text-base sm:text-lg font-black text-slate-900">
                  ¿Para qué edad o etapa es el regalo?
                </h4>
                <p className="text-xs text-slate-500 mt-0.5">
                  Las preguntas y categorías siguientes se adaptarán exclusivamente a esta edad.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-1">
                {AGE_STEP_OPTIONS.map((opt) => {
                  const IconComp = opt.icon;
                  const isSelected = selectedAge === opt.id;
                  return (
                    <button
                      key={opt.id}
                      onClick={() => handleSelectAge(opt.id)}
                      className={`p-3.5 rounded-2xl text-left border transition-all flex items-start gap-3 cursor-pointer ${
                        isSelected
                          ? 'border-indigo-600 bg-indigo-50/80 text-indigo-950 shadow-xs ring-2 ring-indigo-500'
                          : 'border-slate-200 bg-slate-50/60 hover:bg-slate-100 text-slate-800'
                      }`}
                    >
                      <div className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0 ${isSelected ? 'bg-indigo-600 text-white' : 'bg-white border border-slate-200'}`}>
                        <IconComp className={`w-4 h-4 ${isSelected ? 'text-white' : opt.iconColor}`} />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between gap-1 mb-0.5">
                          <span className="font-bold text-xs sm:text-sm text-slate-900 leading-tight">
                            {opt.label}
                          </span>
                        </div>
                        <p className="text-[11px] text-slate-500 leading-tight line-clamp-2">
                          {opt.desc}
                        </p>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {/* PASO 2: DESTINATARIO (ADAPTADO LÓGICAMENTE A LA EDAD DEL PASO 1) */}
          {step === 2 && (
            <div className="space-y-4">
              <div className="text-left">
                <span className="text-xs font-black uppercase tracking-wider text-indigo-600 block mb-1">
                  Paso 2 · Destinatario
                </span>
                <h4 className="text-base sm:text-lg font-black text-slate-900">
                  {selectedAge === '+18'
                    ? '¿Para quién es el regalo de adulto?'
                    : selectedAge === '0-12m'
                    ? '¿El bebé es niño, niña o aún es sorpresa?'
                    : isRevealMode
                    ? 'Ocasión de la Fiesta Revelación'
                    : '¿Para quién buscas el regalo?'}
                </h4>
                <p className="text-xs text-slate-500 mt-0.5">
                  Adaptado a la edad seleccionada:{' '}
                  <strong className="text-indigo-700">
                    {AGE_STEP_OPTIONS.find((a) => a.id === selectedAge)?.label || selectedAge}
                  </strong>
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                {isRevealMode ? (
                  <>
                    <button
                      onClick={() => setSelectedGender('reveal')}
                      className={`p-4 rounded-2xl text-left border transition-all flex flex-col gap-1.5 cursor-pointer ${
                        selectedGender === 'reveal'
                          ? 'border-amber-500 bg-amber-50 text-amber-950 ring-2 ring-amber-500 shadow-sm'
                          : 'border-slate-200 bg-slate-50 hover:bg-slate-100'
                      }`}
                    >
                      <PartyPopper className="w-6 h-6 text-amber-500 mb-1" />
                      <span className="font-bold text-sm text-slate-900">Fiesta Revelación de Género & Baby Shower</span>
                      <span className="text-xs text-slate-500 leading-relaxed">
                        Kits enigma, cañones de humo holi, globos sorpresa para desvelar el sexo del bebé.
                      </span>
                    </button>

                    <button
                      onClick={() => setSelectedGender('all')}
                      className={`p-4 rounded-2xl text-left border transition-all flex flex-col gap-1.5 cursor-pointer ${
                        selectedGender === 'all'
                          ? 'border-indigo-600 bg-indigo-50 text-indigo-950 ring-2 ring-indigo-500 shadow-sm'
                          : 'border-slate-200 bg-slate-50 hover:bg-slate-100'
                      }`}
                    >
                      <Gift className="w-6 h-6 text-indigo-600 mb-1" />
                      <span className="font-bold text-sm text-slate-900">Regalo para los Futuros Papás</span>
                      <span className="text-xs text-slate-500 leading-relaxed">
                        Detalles para celebrar la dulce espera y artículos conmemorativos.
                      </span>
                    </button>
                  </>
                ) : selectedAge === '+18' ? (
                  <>
                    <button
                      onClick={() => setSelectedGender('boy')}
                      className={`p-4 rounded-2xl text-left border transition-all flex flex-col gap-1.5 cursor-pointer ${
                        selectedGender === 'boy'
                          ? 'border-blue-600 bg-blue-50 text-blue-950 ring-2 ring-blue-500 shadow-sm'
                          : 'border-slate-200 bg-slate-50 hover:bg-slate-100'
                      }`}
                    >
                      <User className="w-6 h-6 text-blue-600 mb-1" />
                      <span className="font-bold text-sm text-slate-900">Para Él (Hombre)</span>
                      <span className="text-xs text-slate-500 leading-relaxed">
                        Fragancias como Dior Sauvage, drones 4K, Smartbox de motor/aventura y tecnología.
                      </span>
                    </button>

                    <button
                      onClick={() => setSelectedGender('girl')}
                      className={`p-4 rounded-2xl text-left border transition-all flex flex-col gap-1.5 cursor-pointer ${
                        selectedGender === 'girl'
                          ? 'border-pink-600 bg-pink-50 text-pink-950 ring-2 ring-pink-500 shadow-sm'
                          : 'border-slate-200 bg-slate-50 hover:bg-slate-100'
                      }`}
                    >
                      <Heart className="w-6 h-6 text-pink-600 mb-1" />
                      <span className="font-bold text-sm text-slate-900">Para Ella (Mujer)</span>
                      <span className="text-xs text-slate-500 leading-relaxed">
                        Armani Sì, sets botánicos LEGO Icons, escapadas relax con spa y coctelería gourmet.
                      </span>
                    </button>

                    <button
                      onClick={() => setSelectedGender('all')}
                      className={`p-4 rounded-2xl text-left border transition-all flex flex-col gap-1.5 sm:col-span-2 cursor-pointer ${
                        selectedGender === 'all'
                          ? 'border-indigo-600 bg-indigo-50 text-indigo-950 ring-2 ring-indigo-500 shadow-sm'
                          : 'border-slate-200 bg-slate-50 hover:bg-slate-100'
                      }`}
                    >
                      <Users className="w-6 h-6 text-indigo-600 mb-1" />
                      <span className="font-bold text-sm text-slate-900">Para Pareja / Unisex / Cualquier Destinatario</span>
                      <span className="text-xs text-slate-500 leading-relaxed">
                        Smartphones buque insignia, juegos de mesa expertos (Wingspan), cafeteras Cecotec y escapadas.
                      </span>
                    </button>
                  </>
                ) : (
                  <>
                    <button
                      onClick={() => setSelectedGender('all')}
                      className={`p-4 rounded-2xl text-left border transition-all flex flex-col gap-1.5 cursor-pointer ${
                        selectedGender === 'all'
                          ? 'border-indigo-600 bg-indigo-50 text-indigo-950 ring-2 ring-indigo-500 shadow-sm'
                          : 'border-slate-200 bg-slate-50 hover:bg-slate-100'
                      }`}
                    >
                      <Users className="w-6 h-6 text-indigo-600 mb-1" />
                      <span className="font-bold text-sm text-slate-900">Todos / Unisex / Indiferente</span>
                      <span className="text-xs text-slate-500 leading-relaxed">
                        Recomendaciones neutrales, juegos universales y superventas.
                      </span>
                    </button>

                    <button
                      onClick={() => setSelectedGender('boy')}
                      className={`p-4 rounded-2xl text-left border transition-all flex flex-col gap-1.5 cursor-pointer ${
                        selectedGender === 'boy'
                          ? 'border-blue-600 bg-blue-50 text-blue-950 ring-2 ring-blue-500 shadow-sm'
                          : 'border-slate-200 bg-slate-50 hover:bg-slate-100'
                      }`}
                    >
                      <User className="w-6 h-6 text-blue-600 mb-1" />
                      <span className="font-bold text-sm text-slate-900">Para Chico / Niño</span>
                      <span className="text-xs text-slate-500 leading-relaxed">
                        Juguetes de acción, coches teledirigidos, Scalextric y gaming.
                      </span>
                    </button>

                    <button
                      onClick={() => setSelectedGender('girl')}
                      className={`p-4 rounded-2xl text-left border transition-all flex flex-col gap-1.5 cursor-pointer ${
                        selectedGender === 'girl'
                          ? 'border-pink-600 bg-pink-50 text-pink-950 ring-2 ring-pink-500 shadow-sm'
                          : 'border-slate-200 bg-slate-50 hover:bg-slate-100'
                      }`}
                    >
                      <Heart className="w-6 h-6 text-pink-600 mb-1" />
                      <span className="font-bold text-sm text-slate-900">Para Chica / Niña</span>
                      <span className="text-xs text-slate-500 leading-relaxed">
                        Creatividad, manualidades, peluches interactivos y estilo propio.
                      </span>
                    </button>

                    {selectedAge === '0-12m' && (
                      <button
                        onClick={() => setSelectedGender('reveal')}
                        className={`p-4 rounded-2xl text-left border transition-all flex flex-col gap-1.5 cursor-pointer ${
                          selectedGender === 'reveal'
                            ? 'border-amber-500 bg-amber-50 text-amber-950 ring-2 ring-amber-500 shadow-sm'
                            : 'border-slate-200 bg-slate-50 hover:bg-slate-100'
                        }`}
                      >
                        <PartyPopper className="w-6 h-6 text-amber-500 mb-1" />
                        <span className="font-bold text-sm text-slate-900">Fiesta Revelación de Género</span>
                        <span className="text-xs text-slate-500 leading-relaxed">
                          Kits de fiesta para revelar si el recién nacido será niño o niña.
                        </span>
                      </button>
                    )}
                  </>
                )}
              </div>
            </div>
          )}

          {/* PASO 3: CATEGORÍAS ESTRICTAS DE ESTA EDAD */}
          {step === 3 && (
            <div className="space-y-4">
              <div className="text-left">
                <span className="text-xs font-black uppercase tracking-wider text-indigo-600 block mb-1">
                  Paso 3 · Tipo de regalo
                </span>
                <h4 className="text-base sm:text-lg font-black text-slate-900">
                  ¿Qué temática o categoría prefieres?
                </h4>
                <p className="text-xs text-slate-500 mt-0.5">
                  Mostrando únicamente opciones reales y verificadas para{' '}
                  <strong className="text-indigo-700">
                    {AGE_STEP_OPTIONS.find((a) => a.id === selectedAge)?.label || selectedAge}
                  </strong>
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-1 max-h-[46vh] overflow-y-auto pr-1">
                {currentVibes.map((item) => {
                  const isSelected = selectedVibe === item.id;
                  const isAll = item.category === 'all';
                  return (
                    <button
                      key={item.id}
                      onClick={() => setSelectedVibe(item.id)}
                      className={`p-3.5 rounded-2xl text-left border transition-all flex flex-col gap-1 cursor-pointer ${
                        isSelected
                          ? 'border-indigo-600 bg-indigo-600 text-white shadow-md ring-2 ring-indigo-500'
                          : isAll
                          ? 'border-amber-300 bg-amber-50/70 text-amber-950 hover:bg-amber-100'
                          : 'border-slate-200 bg-slate-50/70 text-slate-800 hover:bg-slate-100'
                      }`}
                    >
                      <div className="flex items-center justify-between gap-2">
                        <span className="font-bold text-xs sm:text-sm leading-tight">
                          {item.label}
                        </span>
                        {isAll && !isSelected && (
                          <span className="text-[10px] font-black uppercase px-2 py-0.5 bg-amber-200 text-amber-900 rounded-full">
                            Destacado
                          </span>
                        )}
                      </div>
                      <span className={`text-[11px] leading-tight ${isSelected ? 'text-indigo-100' : 'text-slate-500'}`}>
                        {item.desc}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {/* PASO 4: PRESUPUESTO */}
          {step === 4 && (
            <div className="space-y-4">
              <div className="text-left">
                <span className="text-xs font-black uppercase tracking-wider text-indigo-600 block mb-1">
                  Paso 4 · Presupuesto
                </span>
                <h4 className="text-base sm:text-lg font-black text-slate-900">
                  ¿Cuál es tu rango de precio?
                </h4>
                <p className="text-xs text-slate-500 mt-0.5">
                  Seleccionaremos las opciones con mejor puntuación y garantía oficial de Amazon España.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-1">
                {[
                  { id: '<20', label: 'Menos de 20 €', desc: 'Detalles económicos, libros y detalles para el cole', icon: Tag, iconColor: 'text-emerald-500' },
                  { id: '20-50', label: '20 € a 50 €', desc: 'El rango más popular para cumpleaños y celebraciones', icon: Gift, iconColor: 'text-indigo-500' },
                  { id: '50-100', label: '50 € a 100 €', desc: 'Regalos prémium, sets grandes de LEGO y tecnología', icon: Gem, iconColor: 'text-purple-500' },
                  { id: '>100', label: 'Más de 100 €', desc: 'Smartphones buque insignia, PS5 Edge, Smartbox y drones', icon: Crown, iconColor: 'text-amber-500' },
                  { id: 'all', label: 'Cualquier Presupuesto', desc: 'Ver todas las recomendaciones sin límite de precio', icon: Coins, iconColor: 'text-slate-500' },
                ].map((item) => {
                  const IconComp = item.icon;
                  const isSelected = selectedBudget === item.id;
                  return (
                    <button
                      key={item.id}
                      onClick={() => setSelectedBudget(item.id)}
                      className={`p-3.5 rounded-2xl text-left border transition-all flex items-start gap-3 cursor-pointer ${
                        isSelected
                          ? 'border-indigo-600 bg-indigo-50/80 text-indigo-950 ring-2 ring-indigo-500 shadow-xs'
                          : 'border-slate-200 bg-slate-50/70 text-slate-800 hover:bg-slate-100'
                      }`}
                    >
                      <div className={`w-8 h-8 rounded-xl flex items-center justify-center shrink-0 ${isSelected ? 'bg-indigo-600 text-white' : 'bg-white border border-slate-200'}`}>
                        <IconComp className={`w-4 h-4 ${isSelected ? 'text-white' : item.iconColor}`} />
                      </div>
                      <div className="flex-1 min-w-0">
                        <span className="font-bold text-xs sm:text-sm text-slate-900 block leading-tight">
                          {item.label}
                        </span>
                        <span className="text-[11px] text-slate-500 leading-tight block mt-0.5">
                          {item.desc}
                        </span>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>
          )}

        </div>

        {/* Footer Navigation */}
        <div className="p-4 sm:p-5 border-t border-slate-100 bg-slate-50/90 flex items-center justify-between">
          {step > 1 ? (
            <button
              onClick={() => setStep(step - 1)}
              className="text-xs font-bold text-slate-600 hover:text-slate-900 px-3 py-2 transition-colors cursor-pointer"
            >
              ← Volver al paso {step - 1}
            </button>
          ) : (
            <div />
          )}

          {step < 4 ? (
            <button
              onClick={() => setStep(step + 1)}
              className="px-6 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs sm:text-sm font-bold flex items-center gap-2 shadow-sm transition-all cursor-pointer"
            >
              <span>Continuar al Paso {step + 1}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          ) : (
            <button
              onClick={handleFinish}
              className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-500 hover:opacity-95 text-white text-xs sm:text-sm font-black flex items-center gap-2 shadow-md transition-all scale-102 cursor-pointer"
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
