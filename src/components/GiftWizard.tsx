'use client';

import React, { useState, useEffect } from 'react';
import confetti from 'canvas-confetti';
import {
  Lightbulb,
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
  Coins,
  Film,
  BookOpen,
  Bike,
  Compass,
  Coffee,
  Dog,
  Flame,
  Camera,
  ShieldCheck,
  Search
} from 'lucide-react';

export interface GiftWizardRecommendation {
  age: string;
  category: string;
  gender: 'all' | 'boy' | 'girl' | 'reveal';
  price: string;
  searchQuery?: string;
  hubUrl?: string;
  themeLabel?: string;
}

interface GiftWizardProps {
  isOpen: boolean;
  initialAge?: string;
  initialGender?: 'all' | 'boy' | 'girl' | 'reveal';
  onClose: () => void;
  onApplyRecommendation: (filters: GiftWizardRecommendation) => void;
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
    desc: 'Circuitos Mario Kart, patinetes con luz LED, juegos de mesa y disfraces',
    icon: Palette,
    iconColor: 'text-amber-500'
  },
  {
    id: '7-9',
    label: '7 a 9 Años (Primaria y Acción)',
    badge: '7-9 Años',
    desc: 'Scalextric, coches RC 4x4, LEGO Creator, Magia Borrás y cartas Pokémon',
    icon: Wand2,
    iconColor: 'text-indigo-500'
  },
  {
    id: '10-12',
    label: '10 a 12 Años (Preadolescentes)',
    badge: '10-12 Años',
    desc: 'Juego Virus!, minidrones con cámara, escape rooms, Diario de Greg y cómic',
    icon: Rocket,
    iconColor: 'text-blue-500'
  },
  {
    id: '13-15',
    label: '13 a 15 Años (Adolescentes)',
    badge: '13-15 Años',
    desc: 'Cómics & Manga, cartas Pokémon, smartphones, auriculares ANC y cámaras Instax',
    icon: Headphones,
    iconColor: 'text-violet-500'
  },
  {
    id: '16-18',
    label: '16 a 18 Años (Jóvenes)',
    badge: '16-18 Años',
    desc: 'Cultura Friki & Cómics, gaming PS5/PC, cartas Pokémon, smartphones y moda urbana',
    icon: Gamepad2,
    iconColor: 'text-purple-600'
  },
  {
    id: '+18',
    label: 'A partir de 18 Años (Adultos)',
    badge: 'Adultos 18+',
    desc: 'Coleccionismo retro, Smartbox escapadas, motos, LEGO Icons, gourmet y tecnología',
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

export interface AgeThemeOption {
  id: string;
  label: string;
  desc: string;
  category: string;
  searchQuery?: string;
  hubUrl?: string;
  quickChips: string[];
}

export const AGE_THEMES_MAP: Record<string, AgeThemeOption[]> = {
  '16-18': [
    {
      id: 'friki-comics-manga-1618',
      label: '🦸‍♂️ Cultura Friki, Cómics, Manga & Anime',
      desc: 'Cómics Marvel, tomos manga (One Piece, Dragon Ball), figuras Banpresto y réplicas de cine (DeLorean, Batmóvil)',
      category: 'Figuras de Colección y Cine',
      searchQuery: 'comic',
      quickChips: ['Cómics Marvel', 'One Piece', 'Dragon Ball', 'Batman', 'Demon Slayer', 'Star Wars']
    },
    {
      id: 'pokemon-tcg-1618',
      label: '⚡ Cartas Pokémon & Coleccionismo TCG',
      desc: 'Cajas de sobres booster box, barajas de combate oficiales y cartas coleccionables',
      category: 'Cartas y Sobres Pokémon',
      searchQuery: 'pokemon',
      quickChips: ['Sobres Pokémon', 'Booster Box', 'Baraja Pokémon', 'Álbum Cartas']
    },
    {
      id: 'gamer-ps5-pc-1618',
      label: '🎮 Gamer & Setup (PS5, PC, Switch)',
      desc: 'Spider-Man 2, mandos inalámbricos DualSense, ratones Logitech Lightspeed y accesorios de setup',
      category: 'Videojuegos y Accesorios PS5',
      searchQuery: 'ps5',
      quickChips: ['Spider-Man 2', 'Mando PS5', 'Ratón Gamer', 'Teclado Mecánico', 'Gafas VR']
    },
    {
      id: 'tech-gadgets-vr-1618',
      label: '📱 Smartphones, Gadgets & Realidad Virtual',
      desc: 'Gafas VR Meta Quest 3S, smartphones de última generación, pulseras inteligentes y gadgets',
      category: 'Tecnología, Audio Hi-Fi y Wearables',
      searchQuery: 'meta quest',
      quickChips: ['Meta Quest 3S', 'iPhone', 'Galaxy S24', 'Smartwatch']
    },
    {
      id: 'music-anc-audio-1618',
      label: '🎧 Música, Festivales & Auriculares',
      desc: 'Auriculares inalámbricos con cancelación de ruido activa (JBL, Sony, Soundcore) y altavoces portátiles',
      category: 'Tecnología, Audio Hi-Fi y Wearables',
      searchQuery: 'auriculares',
      quickChips: ['Auriculares Bluetooth', 'Altavoz JBL', 'Cancelación Ruido']
    },
    {
      id: 'motor-biker-1618',
      label: '🏍️ Mundo Motorista & Dos Ruedas',
      desc: 'Cascos homologados, guantes térmicos, soportes de móvil anti-vibración y accesorios moteros',
      category: 'all',
      hubUrl: '/motoristas',
      quickChips: ['Casco Moto', 'Guantes Moto', 'Soporte Móvil Moto']
    },
    {
      id: 'art-creativity-vintage-1618',
      label: '🎨 Creativo, Arte, Dibujo & Papelería',
      desc: 'Rotuladores Posca, libretas de dibujo, cuadernos de piel encuadernados a mano Moonster y acuarelas',
      category: 'Cuadernos de Piel y Papelería Artesanal',
      searchQuery: 'posca',
      quickChips: ['Rotuladores Posca', 'Diario de Piel', 'Set Dibujo']
    },
    {
      id: 'books-novels-1618',
      label: '📚 Lector / Novelas Juveniles & Fantasía',
      desc: 'Novelas gráficas Heartstopper, sagas de fantasía juvenil y literatura contemporánea',
      category: 'Libros y Novelas Juveniles',
      searchQuery: 'novela',
      quickChips: ['Heartstopper', 'Fantasía Juvenil', 'Novela Gráfica']
    },
    {
      id: 'urban-fashion-perfume-1618',
      label: '👟 Moda Urbana, Zapatillas & Fragancias',
      desc: 'Colonias icónicas Calvin Klein, mochilas urbanas con puerto USB para portátil y carteras slim',
      category: 'Perfumería y Fragancias',
      searchQuery: 'calvin klein',
      quickChips: ['Calvin Klein', 'Mochila Portátil', 'Cartera Slim']
    },
    {
      id: 'pets-lover-1618',
      label: '🐾 Amante de las Mascotas (Perros o Gatos)',
      desc: 'Juguetes interactivos Kong anti-ansiedad, accesorios de paseo y comederos inteligentes',
      category: 'all',
      hubUrl: '/mascotas',
      quickChips: ['Juguete Kong', 'Perros', 'Gatos']
    },
    {
      id: 'all-infallible-1618',
      label: '🌟 El Regalo Infalible (Lo más vendido)',
      desc: 'Los productos más vendidos y mejor valorados con miles de compras positivas para acertar sí o sí',
      category: 'all',
      quickChips: ['Superventas', 'Regalo Seguro', 'Top Valorados']
    }
  ],

  '13-15': [
    {
      id: 'friki-manga-anime-1315',
      label: '🦸‍♂️ Cómics, Manga & Figuras Anime',
      desc: 'Manga en español de One Piece, figuras de Saitama, Kakashi, Tanjiro y cómics de superhéroes',
      category: 'Libros Juveniles, Fantasía y Manga',
      searchQuery: 'one piece',
      quickChips: ['One Piece', 'Demon Slayer', 'Dragon Ball', 'Naruto', 'Marvel']
    },
    {
      id: 'pokemon-cards-1315',
      label: '⚡ Cartas Pokémon TCG & Coleccionismo',
      desc: 'Sobres de cartas coleccionables, booster packs, álbumes y barajas de combate',
      category: 'Cartas y Sobres Pokémon',
      searchQuery: 'pokemon',
      quickChips: ['Cartas Pokémon', 'Sobres Booster', 'Mazo Combate']
    },
    {
      id: 'gaming-consoles-1315',
      label: '🎮 Videojuegos & Gaming (PS5, PC, Switch)',
      desc: 'Spider-Man 2, mandos DualSense, auriculares gaming y accesorios para el setup',
      category: 'Figuras de Colección y Cine',
      searchQuery: 'ps5',
      quickChips: ['Spider-Man 2', 'Mando PS5', 'Auriculares Gaming']
    },
    {
      id: 'photography-instant-1315',
      label: '📸 Fotografía Instantánea & Recuerdos',
      desc: 'Cámaras Fujifilm Instax Mini 12 para hacer fotos físicas al instante con los amigos',
      category: 'Cámaras Instantáneas y Fotografía',
      searchQuery: 'instax',
      quickChips: ['Instax Mini 12', 'Carretes Fotos', 'Cámara Instantánea']
    },
    {
      id: 'smartphones-audio-1315',
      label: '📱 Smartphones & Auriculares Inalámbricos',
      desc: 'Móviles iPhone y Galaxy con gran cámara y auriculares Soundcore con cancelación de ruido',
      category: 'Smartphones y Telefonía',
      searchQuery: 'smartphone',
      quickChips: ['iPhone', 'Galaxy', 'Auriculares Inalámbricos']
    },
    {
      id: 'skincare-beauty-1315',
      label: '💄 Skincare Adolescente, Colonias & Cuidado',
      desc: 'Rutinas CeraVe antiimperfecciones, fragancias frescas y bálsamos labiales',
      category: 'Cuidado Facial, Skincare y Colonias',
      searchQuery: 'cerave',
      quickChips: ['CeraVe', 'Limpiador Facial', 'Colonia Fresca']
    },
    {
      id: 'boardgames-catan-1315',
      label: '🎲 Juegos de Mesa (Catán Oficial, Virus!)',
      desc: 'Estrategia, risas familiares y enigmas cooperativos de escape room',
      category: 'Juegos de Mesa Clásicos (Catan)',
      searchQuery: 'catan',
      quickChips: ['Catán', 'Virus!', 'Escape Room']
    },
    {
      id: 'all-infallible-1315',
      label: '🌟 El Regalo Infalible (Acierto Seguro)',
      desc: 'La selección estrella con la que no fallarás jamás para chicos y chicas de 13 a 15',
      category: 'all',
      quickChips: ['Superventas', 'Regalo Seguro']
    }
  ],

  '+18': [
    {
      id: 'adult-pop-cine-retro',
      label: '🎬 Coleccionismo Pop, Réplicas de Cine & Cultura Friki',
      desc: 'Maqueta de metal DeLorean de Regreso al Futuro, Batmóvil Tumbler, figuras de colección y nostalgia retro',
      category: 'Figuras de Colección y Cine',
      searchQuery: 'delorean',
      quickChips: ['DeLorean', 'Regreso al Futuro', 'Batmóvil', 'Star Wars', 'Cine Retro']
    },
    {
      id: 'adult-motor-biker',
      label: '🏍️ Motero / Amante de las Dos Ruedas',
      desc: 'Cascos integrales homologados ECE, guantes de invierno, soportes antivibración y chaquetas moteras',
      category: 'all',
      hubUrl: '/motoristas',
      quickChips: ['Casco Moto', 'Guantes Invierno', 'Intercomunicador', 'Soporte Móvil']
    },
    {
      id: 'adult-auto',
      label: '🚗 Automóvil & Conducción',
      desc: 'Compresores de aire portátiles, arrancadores de batería, dash cams y accesorios de coche',
      category: 'all',
      hubUrl: '/automovil',
      quickChips: ['Compresor Xiaomi', 'Arrancador Batería', 'Dash Cam']
    },
    {
      id: 'adult-smartbox',
      label: '🍷 Escapadas, Spas & Experiencias (Smartbox)',
      desc: 'Cajas regalo de escapadas rurales de fin de semana, circuitos termales con spa y cenas gourmet',
      category: 'Escapadas y Experiencias (Smartbox)',
      searchQuery: 'smartbox',
      quickChips: ['Smartbox Spa', 'Escapada 2 Días', 'Cena Gourmet']
    },
    {
      id: 'adult-coffee-gourmet',
      label: '☕ Café de Especialidad & Barista',
      desc: 'Cafeteras espresso Cecotec, molinillos de muelas, prensadores y café en grano de autor',
      category: 'Café de Especialidad y Coctelería Gourmet',
      hubUrl: '/amantes-del-cafe',
      quickChips: ['Cafetera Cecotec', 'Molinillo Café', 'Café Especialidad']
    },
    {
      id: 'adult-lego-icons',
      label: '🧱 LEGO Icons & Maquetas para Adultos',
      desc: 'Sets de orquídeas y flores botánicas, coches clásicos y maquetas arquitectónicas relajantes',
      category: 'LEGO Icons y Maquetas para Adultos',
      searchQuery: 'lego',
      quickChips: ['LEGO Flores', 'LEGO Coche Clásico', 'LEGO Bonsái']
    },
    {
      id: 'adult-tech-audio',
      label: '📱 Smartphones Buque Insignia & Sonido Prémium',
      desc: 'iPhone 16 Pro Titanio, Samsung Galaxy S24 Ultra, lectores Kindle Paperwhite y altavoces Bose',
      category: 'Smartphones y Telefonía',
      searchQuery: 'kindle',
      quickChips: ['Kindle Paperwhite', 'iPhone 16 Pro', 'Altavoz Bose']
    },
    {
      id: 'adult-boardgames',
      label: '🎲 Juegos de Mesa Expertos & para Parejas',
      desc: 'Terraforming Mars, Wingspan, Catán y juegos de estrategia profunda para compartir',
      category: 'Juegos de Mesa para Adultos y Parejas',
      searchQuery: 'wingspan',
      quickChips: ['Wingspan', 'Terraforming Mars', 'Juegos Pareja']
    },
    {
      id: 'adult-drones-rc',
      label: '🚁 Drones 4K, Robótica & RC Avanzado',
      desc: 'Drones Potensic con cámara 4K gimbal y buggies todoterreno de alta velocidad',
      category: 'Drones, Robótica y RC Avanzado',
      searchQuery: 'dron',
      quickChips: ['Dron 4K', 'Potensic Atom', 'Buggy RC']
    },
    {
      id: 'adult-perfumes',
      label: '💎 Perfumería Prémium de Autor & Cuidado',
      desc: 'Dior Sauvage, Giorgio Armani Sì, Tom Ford y sets de afeitado vintage',
      category: 'Perfumería Prémium de Autor',
      searchQuery: 'dior',
      quickChips: ['Dior Sauvage', 'Armani Sì', 'Set Afeitado']
    },
    {
      id: 'adult-pets',
      label: '🐾 Amante de Perros y Gatos',
      desc: 'Comederos automáticos, juguetes Kong anti-ansiedad y camas ortopédicas',
      category: 'all',
      hubUrl: '/mascotas',
      quickChips: ['Kong Perros', 'Rascador Gatos', 'Cama Ortopédica']
    },
    {
      id: 'adult-infallible',
      label: '🌟 El Regalo Infalible (Acierto Seguro)',
      desc: 'Los regalos con mayores ventas y más de 10.000 valoraciones 5 estrellas',
      category: 'all',
      quickChips: ['Superventas', 'Acierto Seguro']
    }
  ],

  '10-12': [
    {
      id: 'comics-harrypotter-1012',
      label: '🧙‍♂️ Cómics, Harry Potter, Manga & Aventuras',
      desc: 'Diario de Greg, libros ilustrados de Harry Potter, cómics y novelas de intriga',
      category: 'Libros Juveniles y Cómics',
      searchQuery: 'harry potter',
      quickChips: ['Harry Potter', 'Diario de Greg', 'Cómics', 'Manga']
    },
    {
      id: 'pokemon-cards-1012',
      label: '⚡ Cartas Pokémon & Coleccionismo TCG',
      desc: 'Sobres booster packs de cartas Pokémon, carpetas y barajas oficiales',
      category: 'Cartas y Sobres Pokémon',
      searchQuery: 'pokemon',
      quickChips: ['Cartas Pokémon', 'Sobres Booster', 'Álbum Pokémon']
    },
    {
      id: 'competitive-games-1012',
      label: '🃏 Juegos de Cartas y Piques Rápidos (Virus!)',
      desc: 'El superventas Virus!, Dobble, Exploding Kittens y juegos de reflejos rápidos',
      category: 'Juegos de Cartas Competitivos (Virus!)',
      searchQuery: 'virus',
      quickChips: ['Virus!', 'Exploding Kittens', 'Dobble']
    },
    {
      id: 'drones-stem-1012',
      label: '🚁 Minidrones con Cámara & Robótica STEM',
      desc: 'Drones Potensic con protectores 360° anticolisión y kits de ciencia',
      category: 'Drones RC y Robótica STEM',
      searchQuery: 'dron',
      quickChips: ['Minidron Cámara', 'Robótica STEM']
    },
    {
      id: 'art-lettering-1012',
      label: '🎨 Manualidades, Lettering & Rotuladores Posca',
      desc: 'Rotuladores Posca profesionales, libretas de caligrafía y kits creativos',
      category: 'Manualidades, Lettering y Creatividad',
      searchQuery: 'posca',
      quickChips: ['Rotuladores Posca', 'Lettering', 'Kits Creativos']
    },
    {
      id: 'magic-1012',
      label: '🪄 Magia Borrás & Trucos de Ilusionismo',
      desc: 'Kits de magia con efectos luminosos y trucos de cartas para dejar a todos boquiabiertos',
      category: 'Magia Borrás Avanzada',
      searchQuery: 'magia borras',
      quickChips: ['Magia Borrás', 'Trucos Ilusionismo']
    },
    {
      id: 'escapes-board-1012',
      label: '🧩 Escape Rooms & Juegos de Mesa (Carcassonne)',
      desc: 'Enigmas cooperativos Exit y juegos de estrategia mental',
      category: 'Juegos de Mesa y Escape Room',
      searchQuery: 'carcassonne',
      quickChips: ['Carcassonne', 'Exit Escape Room']
    },
    {
      id: 'all-infallible-1012',
      label: '🌟 El Regalo Infalible',
      desc: 'Top ventas garantizado para 10 a 12 años',
      category: 'all',
      quickChips: ['Superventas', 'Regalo Seguro']
    }
  ],

  '7-9': [
    {
      id: 'scalextric-79',
      label: '🏎️ Scalextric & Pistas de Carreras',
      desc: 'Circuitos Scalextric Compact con looping, coches con luces y mandos con turbo',
      category: 'Scalextric y Pistas de Carreras',
      searchQuery: 'scalextric',
      quickChips: ['Scalextric Compact', 'Coches Carreras']
    },
    {
      id: 'rc-cars-79',
      label: '🚙 Coches Teledirigidos RC 4x4 Todoterreno',
      desc: 'Monster trucks resistentes a golpes con batería recargable y tracción total',
      category: 'Coches RC y Teledirigidos',
      searchQuery: 'teledirigido',
      quickChips: ['Coche Teledirigido', 'Monster Truck 4x4']
    },
    {
      id: 'lego-creator-79',
      label: '🧱 LEGO Creator 3 en 1',
      desc: 'Sets de construcción donde 1 caja permite armar 3 modelos distintos (dragones, dinosaurios, naves)',
      category: 'LEGO Creator y Construcción',
      searchQuery: 'lego creator',
      quickChips: ['LEGO Creator', 'LEGO Dinosaurio', 'Castillo Medieval']
    },
    {
      id: 'pokemon-action-79',
      label: '⚡ Cartas Pokémon & Juguetes de Acción',
      desc: 'Sobres de cartas Pokémon TCG, cinturones Pokéball y figuras de acción',
      category: 'Cartas y Sobres Pokémon',
      searchQuery: 'pokemon',
      quickChips: ['Cartas Pokémon', 'Pokéball', 'Pikachu']
    },
    {
      id: 'magic-borras-79',
      label: '🪄 Magia Borrás Oficial (100 Trucos)',
      desc: 'El clásico juego de magia español con varita, chistera y trucos explicados paso a paso',
      category: 'Juegos de Magia Borrás',
      searchQuery: 'magia borras',
      quickChips: ['Magia Borrás', 'Trucos de Magia']
    },
    {
      id: 'comics-books-79',
      label: '📚 Libros Divertidos & Cómics (Los Compas)',
      desc: 'Cómics de Los Compas, Amanda Black y aventuras con muchas ilustraciones a color',
      category: 'Libros y Cómics Infantiles',
      searchQuery: 'los compas',
      quickChips: ['Los Compas', 'Amanda Black', 'Cómics Infantiles']
    },
    {
      id: 'boardgames-79',
      label: '🎲 Juegos de Mesa Familiares (Catán Junior, Dixit)',
      desc: 'Juegos para reunir a toda la familia alrededor de la mesa con diversión garantizada',
      category: 'Juegos de Mesa y Estrategia Familiar',
      searchQuery: 'catan junior',
      quickChips: ['Catan Junior', 'Dixit', 'Fantasma Blitz']
    },
    {
      id: 'all-infallible-79',
      label: '🌟 El Regalo Infalible (Más Vendido)',
      desc: 'El superventas seguro para acertar de 7 a 9 años',
      category: 'all',
      quickChips: ['Superventas', 'Acierto Seguro']
    }
  ],

  '4-6': [
    {
      id: 'mario-circuits-46',
      label: '🏎️ Circuitos de Coches Infantiles (Mario Kart)',
      desc: 'Pistas Carrera First diseñadas para niños pequeños con Mario y Luigi, mandos ergonómicos y no se salen',
      category: 'Circuitos de Coches Infantiles',
      searchQuery: 'mario kart',
      quickChips: ['Mario Kart Circuito', 'Carrera First']
    },
    {
      id: 'scooters-led-46',
      label: '🛴 Patinetes de 3 Ruedas con Luces LED',
      desc: 'Patinetes autoestables con giro por inclinación natural y ruedas que se iluminan al rodar',
      category: 'Patinetes con Ruedas LED',
      searchQuery: 'patinete',
      quickChips: ['Patinete LED', 'Patinete 3 Ruedas']
    },
    {
      id: 'boardgames-kids-46',
      label: '🎲 Juegos de Mesa Infantiles (El Monstruo de Colores, Dobble)',
      desc: 'Juegos cooperativos para gestionar emociones, agudeza visual y risas en familia',
      category: 'Juegos de Mesa Infantiles',
      searchQuery: 'monstruo de colores',
      quickChips: ['El Monstruo de Colores', 'Dobble Kids']
    },
    {
      id: 'plush-interactive-46',
      label: '🤖 Peluches Interactivos & Mascotas Digitales (Bitzee, Pikachu)',
      desc: 'Mascotas que responden al tacto, luces y sonidos reales sin pantallas adictivas',
      category: 'Peluches Interactivos y Muñecos',
      searchQuery: 'bitzee',
      quickChips: ['Bitzee', 'Pikachu Peluche', 'Mascota Interactiva']
    },
    {
      id: 'costumes-superheroes-46',
      label: '🦸 Disfraces de Superhéroes (Spiderman, Batman) & Princesas',
      desc: 'Capas con máscaras suaves de velcro seguro para imaginar aventuras heroicas',
      category: 'Disfraces y Ropa Infantil',
      searchQuery: 'disfraz spiderman',
      quickChips: ['Spiderman', 'Batman', 'Disfraz Princesa', 'Superhéroes']
    },
    {
      id: 'crafts-drawing-46',
      label: '🎨 Maletines de Dibujo, Acuarelas & Plastilina',
      desc: 'Ceras lavables, acuarelas seguras y botes de plastilina Play-Doh para crear libremente',
      category: 'Manualidades, Dibujo y Pintura',
      searchQuery: 'play doh',
      quickChips: ['Maletín Pintura', 'Play-Doh', 'Acuarelas Lavables']
    },
    {
      id: 'early-readers-46',
      label: '📖 Cuentos & Primeros Lectores (Letra Mayúscula)',
      desc: 'Historias con letra grande e ilustraciones vivas para empezar a amar la lectura',
      category: 'Cuentos y Primeros Lectores',
      searchQuery: 'cuentos letra mayuscula',
      quickChips: ['Cuentos Letra Mayúscula', 'Primeros Lectores']
    },
    {
      id: 'all-infallible-46',
      label: '🌟 El Regalo Infalible',
      desc: 'Los superventas favoritos de los niños de 4 a 6 años',
      category: 'all',
      quickChips: ['Superventas', 'Regalo Seguro']
    }
  ],

  '1-3': [
    {
      id: 'montessori-wood-13',
      label: '🪵 Juguetes Montessori de Madera & Estimulación',
      desc: 'Torres de aprendizaje, bloques de encajar y motricidad fina recomendados por pedagogos',
      category: 'Juguetes Montessori y Madera',
      searchQuery: 'montessori madera',
      quickChips: ['Torre Aprendizaje', 'Bloques Madera', 'Juguete Montessori']
    },
    {
      id: 'lego-duplo-13',
      label: '🧱 LEGO DUPLO & Construcción Segura',
      desc: 'Ladrillos grandes anti-atragantamiento, tren de números y vehículos de construcción',
      category: 'LEGO DUPLO y Construcción',
      searchQuery: 'lego duplo',
      quickChips: ['LEGO DUPLO Tren', 'LEGO DUPLO Caja']
    },
    {
      id: 'trikes-bikes-13',
      label: '🚲 Triciclos Evolutivos & Bicis sin Pedales',
      desc: 'Correpasillos y bicicletas de equilibrio para dominar los primeros pasos con seguridad',
      category: 'Triciclos y Bicis de Equilibrio',
      searchQuery: 'bicicleta sin pedales',
      quickChips: ['Bicicleta sin Pedales', 'Triciclo Evolutivo']
    },
    {
      id: 'imitation-kitchen-13',
      label: '🍳 Cocinitas & Juegos de Imitación de Madera',
      desc: 'Comiditas cortables de velcro con cuchillos de madera redondeados y cocinitas',
      category: 'Cocina Infantil y Juegos de Imitación',
      searchQuery: 'cocinita madera',
      quickChips: ['Cocinita Madera', 'Comiditas Velcro']
    },
    {
      id: 'toddler-books-13',
      label: '📖 Cuentos con Solapas & Títeres (El Pollo Pepe)',
      desc: 'Cuentos interactivos de cartón grueso para tocar, levantar solapas y escuchar',
      category: 'Cuentos y Libros Infantiles',
      searchQuery: 'el pollo pepe',
      quickChips: ['El Pollo Pepe', 'Cuentos Solapas']
    },
    {
      id: 'playdoh-crafts-13',
      label: '🎨 Plastilina Play-Doh No Tóxica & Manualidades',
      desc: 'Botes de colores seguros y herramientas blandas para aplastar y moldear',
      category: 'Manualidades, Plastilina y Pintura',
      searchQuery: 'play doh',
      quickChips: ['Play-Doh', 'Plastilina Segura']
    },
    {
      id: 'all-infallible-13',
      label: '🌟 El Regalo Infalible (Acierto Seguro)',
      desc: 'Los juguetes infantiles con mejores valoraciones de pediatras y familias',
      category: 'all',
      quickChips: ['Superventas', 'Acierto Seguro']
    }
  ],

  '0-12m': [
    {
      id: 'diaper-cakes-012',
      label: '🎂 Tartas de Pañales Dodot & Canastillas',
      desc: 'El regalo estrella práctico por excelencia con más de 50 pañales y cosmética Mustela',
      category: 'Tartas de Pañales y Canastillas',
      searchQuery: 'tarta panales dodot',
      quickChips: ['Tarta Pañales', 'Canastilla Mustela']
    },
    {
      id: 'cribs-sleep-012',
      label: '🛏️ Cunas de Colecho, Hamacas & Nidos Antivuelco',
      desc: 'Cunas Chicco Next2Me, hamacas ergonómicas y nidos para el descanso seguro del bebé',
      category: 'Cunas de Colecho y Descanso',
      searchQuery: 'cuna colecho',
      quickChips: ['Cuna Colecho', 'Hamaca Ergonómica']
    },
    {
      id: 'strollers-gear-012',
      label: '🍼 Cochecitos Ligeros, Tronas & Mobiliario',
      desc: 'Sillas de paseo compactas para maletero y tronas evolutivas de primera puesta',
      category: 'Cochecitos y Mobiliario de Bebé',
      searchQuery: 'silla paseo ligera',
      quickChips: ['Silla Paseo', 'Trona Evolutiva']
    },
    {
      id: 'baths-hygiene-012',
      label: '🛁 Bañeras Plegables & Cuidado Suave',
      desc: 'Bañeras con termómetro integrado antideslizantes y sets de tijeritas seguras',
      category: 'Bañeras e Higiene del Bebé',
      searchQuery: 'banera plegable',
      quickChips: ['Bañera Plegable', 'Set Higiene Bebé']
    },
    {
      id: 'sensory-sophie-012',
      label: '🧸 Juguetes Sensoriales & Sophie la Girafe',
      desc: 'Mordedores de caucho natural Hevea 100% seguros y mantitas de estimulación',
      category: 'Juguetes Sensoriales y Mordedores',
      searchQuery: 'sophie la girafe',
      quickChips: ['Sophie la Girafe', 'Manta Sensorial']
    },
    {
      id: 'soft-books-012',
      label: '📖 Libros Blandos de Tela de Alto Contraste',
      desc: 'Cuentos en blanco y negro y texturas táctiles ideales para la vista del recién nacido',
      category: 'Libros Blandos y Cuentos de Tela',
      searchQuery: 'libros blandos tela',
      quickChips: ['Libro Blando Tela', 'Alto Contraste']
    },
    {
      id: 'clothes-organic-012',
      label: '👶 Bodies & Pijamas 100% Algodón Orgánico',
      desc: 'Packs de bodies Carter\'s con cuello expandible hipoalergénicos',
      category: 'Ropa, Bodies y Patucos',
      searchQuery: 'bodies algodon',
      quickChips: ['Bodies Algodón', 'Pijama Bebé']
    },
    {
      id: 'gender-reveal-012',
      label: '🎉 Fiestas y Revelación de Género & Baby Shower',
      desc: 'Cañones de confeti y humo holi biodegradables para desvelar si es niño o niña',
      category: 'Fiestas y Revelación de Género',
      searchQuery: 'revelacion genero',
      quickChips: ['Cañones Confeti', 'Globos Enigma']
    },
    {
      id: 'all-infallible-012',
      label: '🌟 El Regalo Infalible (Indispensables de Padres)',
      desc: 'Lo que todo padre y madre agradece de corazón recibir',
      category: 'all',
      quickChips: ['Superventas', 'Regalo Seguro']
    }
  ],

  'reveal': [
    {
      id: 'all-reveal-party',
      label: '🎉 Todo para Fiesta Revelación de Género',
      desc: 'Todos los artículos de fiesta enigma y sorpresa para celebrar la dulce espera',
      category: 'Fiestas y Revelación de Género',
      searchQuery: 'revelacion genero',
      quickChips: ['Cañones Confeti', 'Globos Enigma', 'Polvos Holi']
    },
    {
      id: 'cannons-confetti',
      label: '💥 Cañones de Confeti y Humo Holi',
      desc: 'Disparadores biodegradables rosas o azules para el clímax de la fiesta',
      category: 'Fiestas y Revelación de Género',
      searchQuery: 'canones confeti revelacion',
      quickChips: ['Cañón Rosa', 'Cañón Azul']
    },
    {
      id: 'enigma-balloons',
      label: '🎈 Globos Gigantes Enigma de 90 cm',
      desc: 'Globos negros sorpresa para pinchar con confeti y polvo interior',
      category: 'Fiestas y Revelación de Género',
      searchQuery: 'globos sorpresa revelacion',
      quickChips: ['Globo Enigma', 'Photocall']
    }
  ],

  'all': [
    {
      id: 'all-friki-pop',
      label: '🦸‍♂️ Cultura Friki, Cómics, Manga & Pop Culture',
      desc: 'Cómics Marvel, tomos One Piece, Dragon Ball, figuras de colección y réplicas de cine',
      category: 'Figuras de Colección y Cine',
      searchQuery: 'comic',
      quickChips: ['Cómics Marvel', 'One Piece', 'Dragon Ball', 'Batman']
    },
    {
      id: 'all-pokemon',
      label: '⚡ Cartas Pokémon TCG & Coleccionismo',
      desc: 'Cajas de sobres booster box y barajas oficiales',
      category: 'Cartas y Sobres Pokémon',
      searchQuery: 'pokemon',
      quickChips: ['Cartas Pokémon', 'Booster Box']
    },
    {
      id: 'all-gaming',
      label: '🎮 Videojuegos & Setup Gamer',
      desc: 'Mandos PS5 DualSense, periféricos gaming Logitech y títulos top',
      category: 'Videojuegos y Setup Gamer',
      searchQuery: 'ps5',
      quickChips: ['Mando PS5', 'Spider-Man 2', 'Setup Gamer']
    },
    {
      id: 'all-motor',
      label: '🏍️ Motoristas & Motos',
      desc: 'Cascos homologados, guantes y accesorios para moteros',
      category: 'all',
      hubUrl: '/motoristas',
      quickChips: ['Casco Moto', 'Guantes Moto']
    },
    {
      id: 'all-pets',
      label: '🐾 Mascotas (Perros y Gatos)',
      desc: 'Juguetes Kong anti-ansiedad y accesorios para animales',
      category: 'all',
      hubUrl: '/mascotas',
      quickChips: ['Juguete Kong', 'Perros', 'Gatos']
    },
    {
      id: 'all-coffee',
      label: '☕ Café Barista & Especialidad',
      desc: 'Cafeteras express Cecotec y café de autor',
      category: 'all',
      hubUrl: '/amantes-del-cafe',
      quickChips: ['Cafetera Cecotec', 'Molinillo Café']
    },
    {
      id: 'all-boardgames',
      label: '🎲 Juegos de Mesa & Cartas',
      desc: 'Desde Virus! y Catan hasta Wingspan y escape rooms',
      category: 'Juegos de Mesa y Cartas',
      searchQuery: 'catan',
      quickChips: ['Catan', 'Virus!', 'Escape Room']
    },
    {
      id: 'all-lego',
      label: '🧱 LEGO y Construcción',
      desc: 'DUPLO, Creator 3 en 1 y LEGO Icons para adultos',
      category: 'LEGO y Construcción',
      searchQuery: 'lego',
      quickChips: ['LEGO Creator', 'LEGO Icons']
    },
    {
      id: 'all-phones',
      label: '📱 Smartphones y Telefonía',
      desc: 'Apple iPhone, Samsung Galaxy, Google Pixel y Xiaomi',
      category: 'Smartphones y Telefonía',
      searchQuery: 'smartphone',
      quickChips: ['iPhone', 'Galaxy S24']
    },
    {
      id: 'all-everything',
      label: '🌟 Ver Todas las Ideas (Catálogo Completo)',
      desc: 'Explora todos los productos verificados sin filtrar',
      category: 'all',
      quickChips: ['Superventas', 'Ofertas']
    }
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
  const [selectedAge, setSelectedAge] = useState<string>('16-18');
  const [selectedVibe, setSelectedVibe] = useState<string>('friki-comics-manga-1618');
  const [customInterest, setCustomInterest] = useState<string>('');
  const [selectedGender, setSelectedGender] = useState<'all' | 'boy' | 'girl' | 'reveal'>('all');
  const [selectedBudget, setSelectedBudget] = useState<string>('20-50');

  // Sincronizar inteligentemente si el usuario ya tenía una edad seleccionada en la web
  useEffect(() => {
    if (isOpen) {
      setStep(1);
      const validInitial = initialAge && initialAge !== 'all' ? initialAge : '16-18';
      setSelectedAge(validInitial);
      setSelectedGender(initialGender || 'all');
      const themes = AGE_THEMES_MAP[validInitial] || AGE_THEMES_MAP['16-18'];
      setSelectedVibe(themes[0]?.id || 'any');
      setCustomInterest('');
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

    const availableThemes = AGE_THEMES_MAP[ageId] || AGE_THEMES_MAP['all'];
    setSelectedVibe(availableThemes[0]?.id || 'any');
    setCustomInterest('');
  };

  const handleFinish = () => {
    triggerConfetti();

    let targetAge = selectedAge;
    let targetGender = selectedGender;
    let targetCategory = 'all';
    let searchQueryToApply: string | undefined = undefined;
    let hubUrlToApply: string | undefined = undefined;

    const currentOptions = AGE_THEMES_MAP[selectedAge] || AGE_THEMES_MAP['all'];
    const matched = currentOptions.find((opt) => opt.id === selectedVibe);

    if (selectedAge === 'reveal') {
      targetAge = '0-12m';
      targetGender = 'reveal';
      targetCategory = 'Fiestas y Revelación de Género';
    } else if (matched) {
      targetCategory = matched.category;
      if (matched.hubUrl) {
        hubUrlToApply = matched.hubUrl;
      }
      if (customInterest.trim().length > 0) {
        searchQueryToApply = customInterest.trim();
      } else if (matched.searchQuery) {
        searchQueryToApply = matched.searchQuery;
      }
    }

    onApplyRecommendation({
      age: targetAge,
      gender: targetGender,
      category: targetCategory,
      price: selectedBudget,
      searchQuery: searchQueryToApply,
      hubUrl: hubUrlToApply,
      themeLabel: matched?.label
    });

    onClose();

    if (!hubUrlToApply) {
      const element = document.getElementById('catalogo-productos');
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  const currentThemes = AGE_THEMES_MAP[selectedAge] || AGE_THEMES_MAP['all'];
  const isRevealMode = selectedAge === 'reveal';
  const selectedThemeObj = currentThemes.find((t) => t.id === selectedVibe) || currentThemes[0];

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
                Encuentra el regalo perfecto según sus gustos
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
                  Las preguntas, temáticas frikis, gaming y aficiones se adaptarán exclusivamente a esta edad.
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

          {/* PASO 2: TEMÁTICA / AFICIONES / GUSTOS (¡LA CLAVE QUE PIDIÓ EL USUARIO!) */}
          {step === 2 && (
            <div className="space-y-4">
              <div className="text-left">
                <span className="text-xs font-black uppercase tracking-wider text-indigo-600 block mb-1">
                  Paso 2 · Temática & Aficiones
                </span>
                <h4 className="text-base sm:text-lg font-black text-slate-900">
                  ¿Tiene alguna afición o temática en especial?
                </h4>
                <p className="text-xs text-slate-500 mt-0.5">
                  Si tu amigo es friki de los cómics, gamer, motero o le gusta la música, el asistente seleccionará los mejores regalos específicos para{' '}
                  <strong className="text-indigo-700">
                    {AGE_STEP_OPTIONS.find((a) => a.id === selectedAge)?.badge || selectedAge}
                  </strong>.
                </p>
              </div>

              {/* Grid de Temáticas adaptadas */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-1 max-h-[38vh] overflow-y-auto pr-1">
                {currentThemes.map((item) => {
                  const isSelected = selectedVibe === item.id;
                  const isInfalible = item.id.includes('infallible') || item.id.includes('everything');
                  return (
                    <button
                      key={item.id}
                      onClick={() => setSelectedVibe(item.id)}
                      className={`p-3.5 rounded-2xl text-left border transition-all flex flex-col gap-1 cursor-pointer ${
                        isSelected
                          ? 'border-indigo-600 bg-indigo-600 text-white shadow-md ring-2 ring-indigo-500'
                          : isInfalible
                          ? 'border-amber-300 bg-amber-50/70 text-amber-950 hover:bg-amber-100'
                          : 'border-slate-200 bg-slate-50/70 text-slate-800 hover:bg-slate-100'
                      }`}
                    >
                      <div className="flex items-center justify-between gap-2">
                        <span className="font-bold text-xs sm:text-sm leading-tight">
                          {item.label}
                        </span>
                        {isInfalible && !isSelected && (
                          <span className="text-[10px] font-black uppercase px-2 py-0.5 bg-amber-200 text-amber-900 rounded-full">
                            Infalible
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

              {/* INPUT DE INTERÉS CONCRETO / PERSONAJE FAVORITO (OPCIONAL) */}
              <div className="mt-3 p-3.5 rounded-2xl bg-indigo-50/50 border border-indigo-100">
                <label className="text-xs font-bold text-indigo-950 flex items-center justify-between mb-1.5">
                  <span className="flex items-center gap-1.5">
                    <Lightbulb className="w-3.5 h-3.5 text-indigo-600" />
                    <span>¿Le gusta algún personaje, saga o detalle concreto? (Opcional)</span>
                  </span>
                  {customInterest && (
                    <button
                      type="button"
                      onClick={() => setCustomInterest('')}
                      className="text-[10px] text-slate-400 hover:text-slate-700 underline cursor-pointer"
                    >
                      Limpiar
                    </button>
                  )}
                </label>
                <div className="relative">
                  <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
                  <input
                    type="text"
                    value={customInterest}
                    onChange={(e) => setCustomInterest(e.target.value)}
                    placeholder="Ej: Cómics de Marvel, One Piece, Spider-Man, Batman, Harry Potter..."
                    className="w-full pl-9 pr-3.5 py-2 text-xs rounded-xl border border-slate-200 bg-white focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 outline-none transition-all placeholder:text-slate-400 text-slate-800"
                  />
                </div>

                {/* Chips rápidos de sugerencia */}
                {selectedThemeObj?.quickChips && selectedThemeObj.quickChips.length > 0 && (
                  <div className="flex flex-wrap items-center gap-1.5 mt-2">
                    <span className="text-[10px] font-bold text-slate-400">Sugerencias rápidas:</span>
                    {selectedThemeObj.quickChips.map((chip) => (
                      <button
                        key={chip}
                        type="button"
                        onClick={() => setCustomInterest(chip)}
                        className={`px-2 py-0.5 rounded-lg text-[10px] font-bold transition-colors cursor-pointer border ${
                          customInterest === chip
                            ? 'bg-indigo-600 text-white border-indigo-600 shadow-2xs'
                            : 'bg-white hover:bg-indigo-100 text-indigo-700 border-indigo-200'
                        }`}
                      >
                        +{chip}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>
          )}

          {/* PASO 3: DESTINATARIO (ADAPTADO LÓGICAMENTE A LA EDAD DEL PASO 1) */}
          {step === 3 && (
            <div className="space-y-4">
              <div className="text-left">
                <span className="text-xs font-black uppercase tracking-wider text-indigo-600 block mb-1">
                  Paso 3 · Destinatario
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
                  Adaptado a la temática elegida:{' '}
                  <strong className="text-indigo-700">
                    {selectedThemeObj?.label || 'General'}
                  </strong>
                </p>
              </div>

              <div className={`grid grid-cols-1 ${isRevealMode ? 'sm:grid-cols-2' : 'sm:grid-cols-3'} gap-3 pt-2`}>
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
                      className={`p-3.5 sm:p-4 rounded-2xl text-left border transition-all flex flex-col gap-1.5 cursor-pointer ${
                        selectedGender === 'boy'
                          ? 'border-blue-600 bg-blue-50 text-blue-950 ring-2 ring-blue-500 shadow-sm'
                          : 'border-slate-200 bg-slate-50 hover:bg-slate-100'
                      }`}
                    >
                      <User className="w-6 h-6 text-blue-600 mb-1" />
                      <span className="font-bold text-sm text-slate-900">Para Él (Hombre / Chico)</span>
                      <span className="text-xs text-slate-500 leading-relaxed">
                        Fragancias como Dior Sauvage, réplicas retro de cine, motos y tecnología.
                      </span>
                    </button>

                    <button
                      onClick={() => setSelectedGender('girl')}
                      className={`p-3.5 sm:p-4 rounded-2xl text-left border transition-all flex flex-col gap-1.5 cursor-pointer ${
                        selectedGender === 'girl'
                          ? 'border-pink-600 bg-pink-50 text-pink-950 ring-2 ring-pink-500 shadow-sm'
                          : 'border-slate-200 bg-slate-50 hover:bg-slate-100'
                      }`}
                    >
                      <Heart className="w-6 h-6 text-pink-600 mb-1" />
                      <span className="font-bold text-sm text-slate-900">Para Ella (Mujer / Chica)</span>
                      <span className="text-xs text-slate-500 leading-relaxed">
                        Armani Sì, sets botánicos LEGO Icons, spas y coctelería gourmet.
                      </span>
                    </button>

                    <button
                      onClick={() => setSelectedGender('all')}
                      className={`p-3.5 sm:p-4 rounded-2xl text-left border transition-all flex flex-col gap-1.5 cursor-pointer ${
                        selectedGender === 'all'
                          ? 'border-indigo-600 bg-indigo-50 text-indigo-950 ring-2 ring-indigo-500 shadow-sm'
                          : 'border-slate-200 bg-slate-50 hover:bg-slate-100'
                      }`}
                    >
                      <Users className="w-6 h-6 text-indigo-600 mb-1" />
                      <span className="font-bold text-sm text-slate-900">Todos / Unisex / Pareja</span>
                      <span className="text-xs text-slate-500 leading-relaxed">
                        Smartphones buque insignia, juegos de mesa expertos y escapadas.
                      </span>
                    </button>
                  </>
                ) : (
                  <>
                    <button
                      onClick={() => setSelectedGender('boy')}
                      className={`p-3.5 sm:p-4 rounded-2xl text-left border transition-all flex flex-col gap-1.5 cursor-pointer ${
                        selectedGender === 'boy'
                          ? 'border-blue-600 bg-blue-50 text-blue-950 ring-2 ring-blue-500 shadow-sm'
                          : 'border-slate-200 bg-slate-50 hover:bg-slate-100'
                      }`}
                    >
                      <User className="w-6 h-6 text-blue-600 mb-1" />
                      <span className="font-bold text-sm text-slate-900">Para Chico / Amigo</span>
                      <span className="text-xs text-slate-500 leading-relaxed">
                        Cultura friki, gaming, cartas coleccionables, coches o ropa urbana.
                      </span>
                    </button>

                    <button
                      onClick={() => setSelectedGender('girl')}
                      className={`p-3.5 sm:p-4 rounded-2xl text-left border transition-all flex flex-col gap-1.5 cursor-pointer ${
                        selectedGender === 'girl'
                          ? 'border-pink-600 bg-pink-50 text-pink-950 ring-2 ring-pink-500 shadow-sm'
                          : 'border-slate-200 bg-slate-50 hover:bg-slate-100'
                      }`}
                    >
                      <Heart className="w-6 h-6 text-pink-600 mb-1" />
                      <span className="font-bold text-sm text-slate-900">Para Chica / Amiga</span>
                      <span className="text-xs text-slate-500 leading-relaxed">
                        Creatividad, manga, fotografía instantánea Instax, skincare y estilo.
                      </span>
                    </button>

                    <button
                      onClick={() => setSelectedGender('all')}
                      className={`p-3.5 sm:p-4 rounded-2xl text-left border transition-all flex flex-col gap-1.5 cursor-pointer ${
                        selectedGender === 'all'
                          ? 'border-indigo-600 bg-indigo-50 text-indigo-950 ring-2 ring-indigo-500 shadow-sm'
                          : 'border-slate-200 bg-slate-50 hover:bg-slate-100'
                      }`}
                    >
                      <Users className="w-6 h-6 text-indigo-600 mb-1" />
                      <span className="font-bold text-sm text-slate-900">Todos / Unisex</span>
                      <span className="text-xs text-slate-500 leading-relaxed">
                        Recomendaciones neutrales, cómic, manga, cartas Pokémon y superventas.
                      </span>
                    </button>
                  </>
                )}
              </div>
            </div>
          )}

          {/* PASO 4: PRESUPUESTO & CONFIRMACIÓN */}
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
                  { id: '<20', label: 'Menos de 20 €', desc: 'Detalles económicos, cómics, cartas y accesorios', icon: Tag, iconColor: 'text-emerald-500' },
                  { id: '20-50', label: '20 € a 50 €', desc: 'El rango más popular para cumpleaños y amigos invisibles', icon: Gift, iconColor: 'text-indigo-500' },
                  { id: '50-100', label: '50 € a 100 €', desc: 'Regalos prémium, figuras de colección, sets de LEGO y gaming', icon: Gem, iconColor: 'text-purple-500' },
                  { id: '>100', label: 'Más de 100 €', desc: 'Smartphones buque insignia, PS5, Smartbox de lujo y drones', icon: Crown, iconColor: 'text-amber-500' },
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

              {/* RESUMEN VISUAL DEL ASISTENTE */}
              <div className="mt-4 p-4 rounded-2xl bg-gradient-to-r from-indigo-50 via-purple-50 to-pink-50 border border-indigo-200/80">
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-xl bg-indigo-600 text-white flex items-center justify-center shrink-0 shadow-xs">
                    <Bot className="w-4 h-4 text-amber-300" />
                  </div>
                  <div className="text-xs">
                    <span className="font-black text-indigo-950 block mb-0.5">
                      Resumen del Asistente IA:
                    </span>
                    <p className="text-slate-600">
                      Buscando para:{' '}
                      <strong className="text-slate-900">
                        {AGE_STEP_OPTIONS.find((a) => a.id === selectedAge)?.badge || selectedAge}
                      </strong>{' '}
                      • Temática:{' '}
                      <strong className="text-indigo-700">
                        {selectedThemeObj?.label}
                      </strong>
                      {customInterest && (
                        <span>
                          {' '}(Gusto específico: <strong className="text-purple-700">&quot;{customInterest}&quot;</strong>)
                        </span>
                      )}
                      {' '}• Rango:{' '}
                      <strong className="text-slate-900">
                        {selectedBudget === '<20' ? '<20 €' : selectedBudget === '20-50' ? '20-50 €' : selectedBudget === '50-100' ? '50-100 €' : selectedBudget === '>100' ? '>100 €' : 'Todos'}
                      </strong>
                    </p>
                  </div>
                </div>
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
              <Bot className="w-4 h-4 text-amber-300" />
              <span>Ver Recomendaciones IA</span>
            </button>
          )}
        </div>

      </div>
    </div>
  );
}