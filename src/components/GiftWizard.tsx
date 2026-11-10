'use client';

import React, { useState, useEffect } from 'react';
import confetti from 'canvas-confetti';
import {
  Lightbulb,
  ArrowRight,
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
  Tag,
  Gift,
  Gem,
  Crown,
  Coins,
  Search,
} from 'lucide-react';
import { useActiveLocale } from '@/hooks/useActiveLocale';
import { getHubStrings } from '@/lib/i18nContent';

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
  termKey: string;
  badgeKey: string;
  esLabel: string;
  esBadge: string;
  esDesc: string;
  subtitleTermKey: string;
  icon: React.ComponentType<{ className?: string }>;
  iconColor: string;
}

const AGE_STEP_OPTIONS: Step1AgeOption[] = [
  {
    id: '0-12m',
    termKey: 'Bebés (0-12 meses)',
    badgeKey: 'Recién Nacidos (0-12m)',
    esLabel: 'Bebé y Recién Nacido (0 a 12 meses)',
    esBadge: '0-12 Meses',
    esDesc: 'Cochecitos, cunas colecho, tartas Dodot, bañeras, cuentos de tela y colonias suaves',
    subtitleTermKey: 'Tartas de Pañales y Canastillas',
    icon: Baby,
    iconColor: 'text-rose-500',
  },
  {
    id: '1-3',
    termKey: 'Niños (1-3 años)',
    badgeKey: '1 a 3 Años',
    esLabel: '1 a 3 Años (Primeros Pasos)',
    esBadge: '1-3 Años',
    esDesc: 'Juguetes Montessori de madera, LEGO DUPLO, triciclos evolutivos y plastilina',
    subtitleTermKey: 'Juguetes Montessori y Madera',
    icon: Puzzle,
    iconColor: 'text-emerald-500',
  },
  {
    id: '4-6',
    termKey: 'Niños (4-6 años)',
    badgeKey: '4 a 6 Años',
    esLabel: '4 a 6 Años (Infantil y Juego)',
    esBadge: '4-6 Años',
    esDesc: 'Circuitos Mario Kart, patinetes con luz LED, juegos de mesa y disfraces',
    subtitleTermKey: 'Patinetes con Ruedas LED',
    icon: Palette,
    iconColor: 'text-amber-500',
  },
  {
    id: '7-9',
    termKey: 'Niños (7-9 años)',
    badgeKey: '7 a 9 Años',
    esLabel: '7 a 9 Años (Primaria y Acción)',
    esBadge: '7-9 Años',
    esDesc: 'Scalextric, coches RC 4x4, LEGO Creator, Magia Borrás y cartas Pokémon',
    subtitleTermKey: 'Scalextric y Pistas de Carreras',
    icon: Wand2,
    iconColor: 'text-indigo-500',
  },
  {
    id: '10-12',
    termKey: 'Preadolescentes (10-12 años)',
    badgeKey: '10 a 12 Años',
    esLabel: '10 a 12 Años (Preadolescentes)',
    esBadge: '10-12 Años',
    esDesc: 'Juego Virus!, minidrones con cámara, escape rooms, Diario de Greg y cómic',
    subtitleTermKey: 'Juegos de Cartas Competitivos (Virus!)',
    icon: Rocket,
    iconColor: 'text-blue-500',
  },
  {
    id: '13-15',
    termKey: 'Adolescentes (13-15 años)',
    badgeKey: '13 a 15 Años',
    esLabel: '13 a 15 Años (Adolescentes)',
    esBadge: '13-15 Años',
    esDesc: 'Cómics & Manga, cartas Pokémon, smartphones, auriculares ANC y cámaras Instax',
    subtitleTermKey: 'Smartphones y Telefonía',
    icon: Headphones,
    iconColor: 'text-violet-500',
  },
  {
    id: '16-18',
    termKey: 'Jóvenes (16-18 años)',
    badgeKey: '16 a 18 Años',
    esLabel: '16 a 18 Años (Jóvenes)',
    esBadge: '16-18 Años',
    esDesc: 'Cultura Friki & Cómics, gaming PS5/PC, cartas Pokémon, smartphones y moda urbana',
    subtitleTermKey: 'Videojuegos y Setup Gamer',
    icon: Gamepad2,
    iconColor: 'text-purple-600',
  },
  {
    id: '+18',
    termKey: 'Adultos (+18 años)',
    badgeKey: 'A partir de 18 Años',
    esLabel: 'A partir de 18 Años (Adultos)',
    esBadge: 'Adultos 18+',
    esDesc: 'Coleccionismo retro, Smartbox escapadas, motos, LEGO Icons, gourmet y tecnología',
    subtitleTermKey: 'Escapadas y Experiencias',
    icon: Wine,
    iconColor: 'text-rose-600',
  },
  {
    id: 'reveal',
    termKey: 'Fiesta Revelación de Género',
    badgeKey: 'Fiesta Revelación de Género',
    esLabel: 'Fiesta Revelación de Género',
    esBadge: 'Baby Shower',
    esDesc: 'Cañones de confeti y humo holi biodegradables, globos enigma sorpresa y photocall',
    subtitleTermKey: 'Fiestas y Revelación de Género',
    icon: PartyPopper,
    iconColor: 'text-amber-500',
  },
  {
    id: 'all',
    termKey: 'Unisex / Todos',
    badgeKey: 'Unisex / Todos',
    esLabel: 'Todas las Edades (Ver Todo)',
    esBadge: 'Catálogo',
    esDesc: 'Explorar las mejores ideas de regalo y superventas para cualquier edad',
    subtitleTermKey: 'Todas las categorías',
    icon: LayoutGrid,
    iconColor: 'text-slate-600',
  },
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
      desc: 'Cómics Marvel, tomos manga (One Piece, Dragon Ball), figuras Banpresto y réplicas de cine',
      category: 'Figuras de Colección y Cine',
      searchQuery: 'comic',
      quickChips: ['Marvel', 'One Piece', 'Dragon Ball', 'Batman', 'Demon Slayer', 'Star Wars'],
    },
    {
      id: 'pokemon-tcg-1618',
      label: '⚡ Cartas Pokémon & Coleccionismo TCG',
      desc: 'Cajas de sobres booster box, barajas de combate oficiales y cartas coleccionables',
      category: 'Cartas y Sobres Pokémon',
      searchQuery: 'pokemon',
      quickChips: ['Pokémon', 'Booster Box', 'TCG'],
    },
    {
      id: 'gamer-ps5-pc-1618',
      label: '🎮 Gamer & Setup (PS5, PC, Switch)',
      desc: 'Spider-Man 2, mandos inalámbricos DualSense, ratones Logitech Lightspeed y accesorios de setup',
      category: 'Videojuegos y Setup Gamer',
      searchQuery: 'ps5',
      quickChips: ['Spider-Man 2', 'DualSense', 'Logitech'],
    },
    {
      id: 'tech-gadgets-vr-1618',
      label: '📱 Smartphones, Gadgets & Realidad Virtual',
      desc: 'Gafas VR Meta Quest 3S, smartphones de última generación, pulseras inteligentes y gadgets',
      category: 'Tecnología y Gadgets',
      searchQuery: 'meta quest',
      quickChips: ['Meta Quest 3S', 'iPhone', 'Galaxy', 'Smartwatch'],
    },
    {
      id: 'motor-biker-1618',
      label: '🏍️ Mundo Motorista & Dos Ruedas',
      desc: 'Cascos homologados, guantes térmicos, soportes de móvil anti-vibración y accesorios moteros',
      category: 'all',
      hubUrl: '/motoristas',
      quickChips: ['Cardo', 'Helmet', 'Moto'],
    },
    {
      id: 'art-creativity-vintage-1618',
      label: '🎨 Creativo, Arte, Dibujo & Papelería',
      desc: 'Rotuladores Posca, libretas de dibujo, cuadernos de piel Moonster y acuarelas',
      category: 'Manualidades y Creatividad',
      searchQuery: 'posca',
      quickChips: ['Posca', 'Moonster'],
    },
    {
      id: 'books-novels-1618',
      label: '📚 Lector / Novelas Juveniles & Fantasía',
      desc: 'Novelas gráficas Heartstopper, sagas de fantasía juvenil y literatura contemporánea',
      category: 'Libros y Lectura Infantil y Juvenil',
      searchQuery: 'heartstopper',
      quickChips: ['Heartstopper', 'Manga'],
    },
    {
      id: 'urban-fashion-perfume-1618',
      label: '👟 Moda Urbana, Zapatillas & Fragancias',
      desc: 'Colonias icónicas Calvin Klein, mochilas urbanas con puerto USB y carteras slim',
      category: 'Perfumería, Colonias y Fragancias',
      searchQuery: 'calvin klein',
      quickChips: ['Calvin Klein', 'Sneakers'],
    },
    {
      id: 'pets-lover-1618',
      label: '🐾 Amante de las Mascotas (Perros o Gatos)',
      desc: 'Juguetes interactivos Kong anti-ansiedad, accesorios de paseo y comederos inteligentes',
      category: 'all',
      hubUrl: '/mascotas',
      quickChips: ['KONG', 'Tractive', 'Catit'],
    },
    {
      id: 'all-infallible-1618',
      label: '🌟 El Regalo Infalible (Lo más vendido)',
      desc: 'Los productos más vendidos y mejor valorados con miles de compras positivas',
      category: 'all',
      quickChips: ['LEGO', 'PlayStation 5', 'Kindle'],
    },
  ],
  '13-15': [
    {
      id: 'friki-manga-anime-1315',
      label: '🦸‍♂️ Cómics, Manga & Figuras Anime',
      desc: 'Manga de One Piece, figuras de Saitama, Kakashi, Tanjiro y cómics de superhéroes',
      category: 'Figuras de Colección y Cine',
      searchQuery: 'one piece',
      quickChips: ['One Piece', 'Demon Slayer', 'Dragon Ball', 'Naruto'],
    },
    {
      id: 'pokemon-cards-1315',
      label: '⚡ Cartas Pokémon TCG & Coleccionismo',
      desc: 'Sobres de cartas coleccionables, booster packs, álbumes y barajas de combate',
      category: 'Cartas y Sobres Pokémon',
      searchQuery: 'pokemon',
      quickChips: ['Pokémon', 'Booster Box'],
    },
    {
      id: 'gaming-consoles-1315',
      label: '🎮 Videojuegos & Gaming (PS5, PC, Switch)',
      desc: 'Spider-Man 2, mandos DualSense, auriculares gaming y accesorios para el setup',
      category: 'Videojuegos y Setup Gamer',
      searchQuery: 'ps5',
      quickChips: ['PS5', 'Nintendo Switch', 'HyperX'],
    },
    {
      id: 'smartphones-audio-1315',
      label: '📱 Smartphones & Auriculares Inalámbricos',
      desc: 'Móviles iPhone y Galaxy con gran cámara y auriculares Soundcore',
      category: 'Smartphones y Telefonía',
      searchQuery: 'smartphone',
      quickChips: ['iPhone', 'Samsung Galaxy', 'Sony'],
    },
    {
      id: 'boardgames-catan-1315',
      label: '🎲 Juegos de Mesa (Catan, Virus!)',
      desc: 'Estrategia, risas familiares y enigmas cooperativos de escape room',
      category: 'Juegos de Mesa y Cartas',
      searchQuery: 'catan',
      quickChips: ['Catan', 'Virus!', 'EXIT'],
    },
    {
      id: 'all-infallible-1315',
      label: '🌟 El Regalo Infalible (Acierto Seguro)',
      desc: 'La selección estrella con la que no fallarás jamás para chicos y chicas de 13 a 15',
      category: 'all',
      quickChips: ['Instax', 'Catan', 'Pokémon'],
    },
  ],
  '+18': [
    {
      id: 'adult-pop-cine-retro',
      label: '🎬 Coleccionismo Pop, Réplicas de Cine & Cultura Friki',
      desc: 'Maqueta de metal DeLorean, Batmóvil Tumbler, figuras de colección y nostalgia retro',
      category: 'Figuras de Colección y Cine',
      searchQuery: 'delorean',
      quickChips: ['DeLorean', 'Batmobile', 'Star Wars'],
    },
    {
      id: 'adult-motor-biker',
      label: '🏍️ Motero / Amante de las Dos Ruedas',
      desc: 'Cascos integrales homologados ECE, intercomunicadores Cardo y soportes antivibración',
      category: 'all',
      hubUrl: '/motoristas',
      quickChips: ['Cardo', 'Quad Lock', 'Abus'],
    },
    {
      id: 'adult-auto',
      label: '🚗 Automóvil & Conducción',
      desc: 'Compresores de aire portátiles, arrancadores NOCO, dash cams 4K y detailing',
      category: 'all',
      hubUrl: '/automovil',
      quickChips: ['NOCO', 'Xiaomi', 'Dashcam'],
    },
    {
      id: 'adult-smartbox',
      label: '🍷 Escapadas, Spas & Experiencias (Smartbox)',
      desc: 'Cajas regalo de escapadas rurales de fin de semana, circuitos termales con spa y cenas gourmet',
      category: 'Escapadas y Experiencias',
      searchQuery: 'smartbox',
      quickChips: ['Smartbox', 'Spa', 'Wellness'],
    },
    {
      id: 'adult-coffee-gourmet',
      label: '☕ Café de Especialidad & Barista',
      desc: 'Cafeteras espresso, molinillos Timemore C3, Bialetti y café en grano de autor',
      category: 'Gourmet, Café y Coctelería',
      hubUrl: '/amantes-del-cafe',
      quickChips: ['Bialetti', 'Timemore C3', 'Stanley'],
    },
    {
      id: 'adult-lego-icons',
      label: '🧱 LEGO Icons & Maquetas para Adultos',
      desc: 'Sets botánicos, coches clásicos y maquetas arquitectónicas relajantes',
      category: 'LEGO y Construcción',
      searchQuery: 'lego',
      quickChips: ['LEGO Icons', 'LEGO Technic'],
    },
    {
      id: 'adult-tech-audio',
      label: '📱 Smartphones Buque Insignia & Sonido Prémium',
      desc: 'iPhone 16 Pro, Samsung Galaxy S24 Ultra, lectores Kindle Paperwhite y altavoces Bose',
      category: 'Smartphones y Telefonía',
      searchQuery: 'kindle',
      quickChips: ['Kindle', 'iPhone', 'Bose'],
    },
    {
      id: 'adult-boardgames',
      label: '🎲 Juegos de Mesa Expertos & para Parejas',
      desc: 'Terraforming Mars, Wingspan, Catan y juegos de estrategia profunda',
      category: 'Juegos de Mesa y Cartas',
      searchQuery: 'wingspan',
      quickChips: ['Wingspan', 'Terraforming Mars', 'Catan'],
    },
    {
      id: 'adult-perfumes',
      label: '💎 Perfumería Prémium de Autor & Cuidado',
      desc: 'Dior Sauvage, Giorgio Armani Sì y sets de afeitado clásico',
      category: 'Perfumería, Colonias y Fragancias',
      searchQuery: 'dior',
      quickChips: ['Dior Sauvage', 'Armani Sì'],
    },
    {
      id: 'adult-pets',
      label: '🐾 Amante de Perros y Gatos',
      desc: 'Localizadores Tractive GPS, fuentes Catit, juguetes Kong y camas ortopédicas',
      category: 'all',
      hubUrl: '/mascotas',
      quickChips: ['KONG', 'Tractive', 'Catit'],
    },
    {
      id: 'adult-infallible',
      label: '🌟 El Regalo Infalible (Acierto Seguro)',
      desc: 'Los regalos con mayores ventas y miles de valoraciones 5 estrellas',
      category: 'all',
      quickChips: ['Kindle', 'LEGO Icons', 'Smartbox'],
    },
  ],
  '10-12': [
    {
      id: 'comics-harrypotter-1012',
      label: '🧙‍♂️ Cómics, Harry Potter, Manga & Aventuras',
      desc: 'Diario de Greg, libros ilustrados de Harry Potter, cómics y novelas de intriga',
      category: 'Libros y Lectura Infantil y Juvenil',
      searchQuery: 'harry potter',
      quickChips: ['Harry Potter', 'Manga', 'Comics'],
    },
    {
      id: 'pokemon-cards-1012',
      label: '⚡ Cartas Pokémon & Coleccionismo TCG',
      desc: 'Sobres booster packs de cartas Pokémon, carpetas y barajas oficiales',
      category: 'Cartas y Sobres Pokémon',
      searchQuery: 'pokemon',
      quickChips: ['Pokémon', 'Booster Box'],
    },
    {
      id: 'competitive-games-1012',
      label: '🃏 Juegos de Cartas y Piques Rápidos (Virus!)',
      desc: 'Virus!, Dobble, Exploding Kittens y juegos de reflejos rápidos',
      category: 'Juegos de Mesa y Cartas',
      searchQuery: 'virus',
      quickChips: ['Virus!', 'Exploding Kittens', 'Carcassonne'],
    },
    {
      id: 'drones-stem-1012',
      label: '🚁 Minidrones con Cámara & Robótica STEM',
      desc: 'Drones Potensic con protectores anticolisión y kits de ciencia',
      category: 'Tecnología y Gadgets',
      searchQuery: 'dron',
      quickChips: ['Drone', 'STEM', 'LEGO'],
    },
    {
      id: 'art-lettering-1012',
      label: '🎨 Manualidades, Lettering & Rotuladores Posca',
      desc: 'Rotuladores Posca profesionales, libretas de caligrafía y kits creativos',
      category: 'Manualidades y Creatividad',
      searchQuery: 'posca',
      quickChips: ['Posca', 'Lettering'],
    },
    {
      id: 'all-infallible-1012',
      label: '🌟 El Regalo Infalible',
      desc: 'Top ventas garantizado para 10 a 12 años',
      category: 'all',
      quickChips: ['Virus!', 'Pokémon', 'Harry Potter'],
    },
  ],
  '7-9': [
    {
      id: 'scalextric-79',
      label: '🏎️ Scalextric & Pistas de Carreras',
      desc: 'Circuitos Scalextric Compact con looping, coches con luces y mandos con turbo',
      category: 'Scalextric y Circuitos de Coches',
      searchQuery: 'scalextric',
      quickChips: ['Scalextric', 'Slot Cars'],
    },
    {
      id: 'rc-cars-79',
      label: '🚙 Coches Teledirigidos RC 4x4 Todoterreno',
      desc: 'Monster trucks resistentes a golpes con batería recargable y tracción total',
      category: 'Sobre Ruedas: Coches, Quads y Patinetes',
      searchQuery: 'rc 4x4',
      quickChips: ['RC 4x4', 'Monster Truck'],
    },
    {
      id: 'lego-creator-79',
      label: '🧱 LEGO Creator 3 en 1',
      desc: 'Sets de construcción donde 1 caja permite armar 3 modelos distintos',
      category: 'LEGO y Construcción',
      searchQuery: 'lego creator',
      quickChips: ['LEGO Creator', 'LEGO'],
    },
    {
      id: 'pokemon-action-79',
      label: '⚡ Cartas Pokémon & Juguetes de Acción',
      desc: 'Sobres de cartas Pokémon TCG, cinturones Pokéball y figuras de acción',
      category: 'Cartas y Sobres Pokémon',
      searchQuery: 'pokemon',
      quickChips: ['Pokémon', 'Pikachu'],
    },
    {
      id: 'boardgames-79',
      label: '🎲 Juegos de Mesa Familiares (Catán Junior, Dixit)',
      desc: 'Juegos para reunir a toda la familia alrededor de la mesa con diversión garantizada',
      category: 'Juegos de Mesa y Cartas',
      searchQuery: 'dixit',
      quickChips: ['Catan Junior', 'Dixit'],
    },
    {
      id: 'all-infallible-79',
      label: '🌟 El Regalo Infalible (Más Vendido)',
      desc: 'El superventas seguro para acertar de 7 a 9 años',
      category: 'all',
      quickChips: ['LEGO', 'Scalextric'],
    },
  ],
  '4-6': [
    {
      id: 'mario-circuits-46',
      label: '🏎️ Circuitos de Coches Infantiles (Mario Kart)',
      desc: 'Pistas Carrera First diseñadas para niños pequeños con Mario y Luigi',
      category: 'Scalextric y Circuitos de Coches',
      searchQuery: 'mario kart',
      quickChips: ['Mario Kart', 'Carrera First'],
    },
    {
      id: 'scooters-led-46',
      label: '🛴 Patinetes de 3 Ruedas con Luces LED',
      desc: 'Patinetes autoestables con giro por inclinación natural y ruedas LED',
      category: 'Bicis y Patinetes con Ruedas',
      searchQuery: 'patinete',
      quickChips: ['LED Scooter', 'Micro'],
    },
    {
      id: 'boardgames-kids-46',
      label: '🎲 Juegos de Mesa Infantiles (Dobble Kids)',
      desc: 'Juegos cooperativos para gestionar emociones y agudeza visual en familia',
      category: 'Juegos de Mesa y Cartas',
      searchQuery: 'dobble',
      quickChips: ['Dobble Kids'],
    },
    {
      id: 'crafts-drawing-46',
      label: '🎨 Maletines de Dibujo, Acuarelas & Plastilina',
      desc: 'Ceras lavables, acuarelas seguras y botes Play-Doh para crear libremente',
      category: 'Manualidades y Creatividad',
      searchQuery: 'play doh',
      quickChips: ['Play-Doh', 'Crayola'],
    },
    {
      id: 'all-infallible-46',
      label: '🌟 El Regalo Infalible',
      desc: 'Los superventas favoritos de los niños de 4 a 6 años',
      category: 'all',
      quickChips: ['Mario Kart', 'Play-Doh'],
    },
  ],
  '1-3': [
    {
      id: 'montessori-wood-13',
      label: '🪵 Juguetes Montessori de Madera & Estimulación',
      desc: 'Torres de aprendizaje, bloques de encajar y motricidad fina',
      category: 'Manualidades y Creatividad',
      searchQuery: 'montessori',
      quickChips: ['Montessori', 'Wooden Toys'],
    },
    {
      id: 'lego-duplo-13',
      label: '🧱 LEGO DUPLO & Construcción Segura',
      desc: 'Ladrillos grandes anti-atragantamiento, tren de números y vehículos',
      category: 'LEGO y Construcción',
      searchQuery: 'lego duplo',
      quickChips: ['LEGO DUPLO'],
    },
    {
      id: 'trikes-bikes-13',
      label: '🚲 Triciclos Evolutivos & Bicis sin Pedales',
      desc: 'Correpasillos y bicicletas de equilibrio para dominar los primeros pasos',
      category: 'Bicis y Patinetes con Ruedas',
      searchQuery: 'bicicleta sin pedales',
      quickChips: ['Balance Bike'],
    },
    {
      id: 'all-infallible-13',
      label: '🌟 El Regalo Infalible (Acierto Seguro)',
      desc: 'Los juguetes infantiles con mejores valoraciones de pediatras y familias',
      category: 'all',
      quickChips: ['LEGO DUPLO', 'Montessori'],
    },
  ],
  '0-12m': [
    {
      id: 'diaper-cakes-012',
      label: '🎂 Tartas de Pañales & Canastillas',
      desc: 'El regalo estrella práctico con más de 50 pañales y cosmética para bebé',
      category: 'Cochecitos y Esenciales de Bebé',
      searchQuery: 'panales',
      quickChips: ['Dodot', 'Mustela'],
    },
    {
      id: 'strollers-gear-012',
      label: '🍼 Cochecitos Ligeros, Tronas & Mobiliario',
      desc: 'Sillas de paseo compactas para maletero y cunas de colecho',
      category: 'Cochecitos y Esenciales de Bebé',
      searchQuery: 'colecho',
      quickChips: ['Chicco Next2Me'],
    },
    {
      id: 'gender-reveal-012',
      label: '🎉 Fiestas y Revelación de Género & Baby Shower',
      desc: 'Cañones de confeti y humo holi biodegradables para desvelar si es niño o niña',
      category: 'Fiestas y Revelación de Género',
      searchQuery: 'revelacion',
      quickChips: ['Baby Shower', 'Confetti'],
    },
    {
      id: 'all-infallible-012',
      label: '🌟 El Regalo Infalible (Indispensables de Padres)',
      desc: 'Lo que todo padre y madre agradece recibir',
      category: 'all',
      quickChips: ['Sophie la Girafe'],
    },
  ],
  reveal: [
    {
      id: 'all-reveal-party',
      label: '🎉 Todo para Fiesta Revelación de Género',
      desc: 'Todos los artículos de fiesta enigma y sorpresa para celebrar la dulce espera',
      category: 'Fiestas y Revelación de Género',
      searchQuery: 'revelacion',
      quickChips: ['Gender Reveal', 'Confetti'],
    },
  ],
  all: [
    {
      id: 'all-friki-pop',
      label: '🦸‍♂️ Cultura Friki, Cómics, Manga & Pop Culture',
      desc: 'Cómics Marvel, tomos One Piece, Dragon Ball, figuras de colección y réplicas de cine',
      category: 'Figuras de Colección y Cine',
      searchQuery: 'comic',
      quickChips: ['Marvel', 'One Piece', 'Dragon Ball', 'Batman'],
    },
    {
      id: 'all-pokemon',
      label: '⚡ Cartas Pokémon TCG & Coleccionismo',
      desc: 'Cajas de sobres booster box y barajas oficiales',
      category: 'Cartas y Sobres Pokémon',
      searchQuery: 'pokemon',
      quickChips: ['Pokémon', 'Booster Box'],
    },
    {
      id: 'all-gaming',
      label: '🎮 Videojuegos & Setup Gamer',
      desc: 'Mandos PS5 DualSense, periféricos gaming Logitech y títulos top',
      category: 'Videojuegos y Setup Gamer',
      searchQuery: 'ps5',
      quickChips: ['PS5 DualSense', 'HyperX'],
    },
    {
      id: 'all-motor',
      label: '🏍️ Motoristas & Motos',
      desc: 'Cascos homologados, guantes y accesorios para moteros',
      category: 'all',
      hubUrl: '/motoristas',
      quickChips: ['Cardo', 'Quad Lock'],
    },
    {
      id: 'all-pets',
      label: '🐾 Mascotas (Perros y Gatos)',
      desc: 'Juguetes Kong anti-ansiedad y accesorios para animales',
      category: 'all',
      hubUrl: '/mascotas',
      quickChips: ['KONG', 'Tractive', 'Catit'],
    },
    {
      id: 'all-coffee',
      label: '☕ Café Barista & Especialidad',
      desc: 'Cafeteras espresso, molinillos y café de autor',
      category: 'all',
      hubUrl: '/amantes-del-cafe',
      quickChips: ['Bialetti', 'Timemore'],
    },
    {
      id: 'all-boardgames',
      label: '🎲 Juegos de Mesa & Cartas',
      desc: 'Desde Virus! y Catan hasta Wingspan y escape rooms',
      category: 'Juegos de Mesa y Cartas',
      searchQuery: 'catan',
      quickChips: ['Catan', 'Virus!', 'Wingspan'],
    },
    {
      id: 'all-lego',
      label: '🧱 LEGO y Construcción',
      desc: 'DUPLO, Creator 3 en 1 y LEGO Icons para adultos',
      category: 'LEGO y Construcción',
      searchQuery: 'lego',
      quickChips: ['LEGO Creator', 'LEGO Icons'],
    },
    {
      id: 'all-phones',
      label: '📱 Smartphones y Telefonía',
      desc: 'Apple iPhone, Samsung Galaxy, Google Pixel y Xiaomi',
      category: 'Smartphones y Telefonía',
      searchQuery: 'smartphone',
      quickChips: ['iPhone', 'Galaxy'],
    },
    {
      id: 'all-everything',
      label: '🌟 Ver Todas las Ideas (Catálogo Completo)',
      desc: 'Explora todos los productos verificados sin filtrar',
      category: 'all',
      quickChips: ['LEGO', 'Kindle', 'PlayStation'],
    },
  ],
};

function getThemeDisplay(
  item: AgeThemeOption,
  isEs: boolean,
  localeKey: string,
  tTerm: (s: string) => string,
  ui: { showingAllCatalog: string; verifiedCatalogNote: string }
): { label: string; desc: string } {
  if (isEs) {
    return { label: item.label, desc: item.desc };
  }
  const emojiMatch = item.label.match(/^(\S+)\s+/);
  const emoji = emojiMatch ? emojiMatch[1] : '🎁';
  if (item.hubUrl) {
    const hubSlug = item.hubUrl.replace(/^\//, '');
    const hub = getHubStrings(localeKey, hubSlug);
    return {
      label: `${emoji} ${hub.breadcrumbLabel}`,
      desc: item.quickChips.join(' · ') || hub.subtitle,
    };
  }
  const catLabel = item.category === 'all' ? ui.showingAllCatalog : tTerm(item.category);
  return {
    label: `${emoji} ${catLabel}`,
    desc: item.quickChips.length > 0 ? item.quickChips.join(' · ') : ui.verifiedCatalogNote,
  };
}

export default function GiftWizard({
  isOpen,
  initialAge = 'all',
  initialGender = 'all',
  onClose,
  onApplyRecommendation,
}: GiftWizardProps) {
  const { localeKey, ui, tTerm, tBudget, localePath, isRtl } = useActiveLocale();
  const isEs = localeKey === 'es' || localeKey === 'es-us';

  const [step, setStep] = useState(1);
  const [selectedAge, setSelectedAge] = useState<string>('16-18');
  const [selectedVibe, setSelectedVibe] = useState<string>('friki-comics-manga-1618');
  const [customInterest, setCustomInterest] = useState<string>('');
  const [selectedGender, setSelectedGender] = useState<'all' | 'boy' | 'girl' | 'reveal'>('all');
  const [selectedBudget, setSelectedBudget] = useState<string>('20-50');

  useEffect(() => {
    if (isOpen) {
      setStep(1);
      const validInitial = initialAge && initialAge !== 'all' ? initialAge : '16-18';
      setSelectedAge(validInitial);
      setSelectedGender(initialGender || 'all');
      const themes = AGE_THEMES_MAP[validInitial] || AGE_THEMES_MAP['16-18'];
      setSelectedVibe(themes[0]?.id || 'all-everything');
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
    if (ageId === 'reveal') {
      setSelectedGender('reveal');
    } else if (selectedGender === 'reveal') {
      setSelectedGender('all');
    }
    const availableThemes = AGE_THEMES_MAP[ageId] || AGE_THEMES_MAP.all;
    setSelectedVibe(availableThemes[0]?.id || 'all-everything');
    setCustomInterest('');
  };

  const handleFinish = () => {
    triggerConfetti();

    let targetAge = selectedAge;
    let targetGender = selectedGender;
    let targetCategory = 'all';
    let searchQueryToApply: string | undefined = undefined;
    let hubUrlToApply: string | undefined = undefined;

    const currentOptions = AGE_THEMES_MAP[selectedAge] || AGE_THEMES_MAP.all;
    const matched = currentOptions.find((opt) => opt.id === selectedVibe);

    if (selectedAge === 'reveal') {
      targetAge = '0-12m';
      targetGender = 'reveal';
      targetCategory = 'Fiestas y Revelación de Género';
    } else if (matched) {
      targetCategory = matched.category;
      if (matched.hubUrl) {
        hubUrlToApply = localePath(matched.hubUrl);
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
      themeLabel: matched ? getThemeDisplay(matched, isEs, localeKey, tTerm, ui).label : undefined,
    });

    onClose();

    if (!hubUrlToApply) {
      const element = document.getElementById('catalogo-productos');
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  const currentThemes = AGE_THEMES_MAP[selectedAge] || AGE_THEMES_MAP.all;
  const isRevealMode = selectedAge === 'reveal';
  const selectedThemeObj = currentThemes.find((t) => t.id === selectedVibe) || currentThemes[0];
  const selectedAgeOpt = AGE_STEP_OPTIONS.find((a) => a.id === selectedAge);
  const selectedThemeDisplay = selectedThemeObj
    ? getThemeDisplay(selectedThemeObj, isEs, localeKey, tTerm, ui)
    : { label: ui.categoryAll, desc: '' };

  return (
    <div
      dir={isRtl ? 'rtl' : 'ltr'}
      role="dialog"
      aria-modal="true"
      aria-label={ui.wizardTitle}
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 animate-in fade-in duration-200"
    >
      <div
        aria-hidden="true"
        onClick={onClose}
        className="fixed inset-0 bg-slate-950/75 backdrop-blur-md"
      />
      <div className="w-full max-w-2xl bg-white rounded-3xl shadow-2xl border border-slate-200 overflow-hidden relative z-10 flex flex-col max-h-[92vh]">
        {/* Header */}
        <div className="p-4 sm:p-6 border-b border-slate-100 flex items-center justify-between bg-gradient-to-r from-indigo-50/90 via-white to-purple-50/50">
          <div className="flex items-center gap-3 min-w-0">
            <div className="w-10 h-10 rounded-2xl bg-indigo-600 text-white flex items-center justify-center shadow-md shrink-0">
              <Bot className="w-5 h-5 animate-pulse" />
            </div>
            <div className="min-w-0">
              <div className="flex items-center gap-2 flex-wrap">
                <span className="text-[11px] font-black uppercase tracking-wider text-indigo-700 bg-indigo-100/80 px-2 py-0.5 rounded-full">
                  {ui.wizardTitle}
                </span>
                <span className="text-xs text-slate-600 font-bold">
                  {ui.wizardStepLabel} {step} / 4
                </span>
              </div>
              <h2 className="text-base sm:text-lg font-black text-slate-900 leading-tight line-clamp-1">
                {ui.wizardSubtitle}
              </h2>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label={ui.wizardClose}
            className="w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-600 hover:text-slate-900 flex items-center justify-center transition-colors cursor-pointer shrink-0"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-4 sm:p-6 overflow-y-auto flex-1">
          {/* STEP 1 */}
          {step === 1 && (
            <div className="space-y-4">
              <div className="text-left">
                <span className="text-xs font-black uppercase tracking-wider text-indigo-700 block mb-1">
                  {ui.wizardStepLabel} 1 · {ui.navAges}
                </span>
                <h3 className="text-base sm:text-lg font-black text-slate-900">
                  {ui.wizardAgeQuestion}
                </h3>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-1">
                {AGE_STEP_OPTIONS.map((opt) => {
                  const IconComp = opt.icon;
                  const isSelected = selectedAge === opt.id;
                  const displayLabel = isEs
                    ? opt.esLabel
                    : opt.id === 'all'
                    ? ui.ageAllLabel
                    : tTerm(opt.termKey);
                  const displayDesc = isEs ? opt.esDesc : tTerm(opt.subtitleTermKey);
                  return (
                    <button
                      key={opt.id}
                      type="button"
                      onClick={() => handleSelectAge(opt.id)}
                      className={`p-3.5 rounded-2xl text-left border transition-all flex items-start gap-3 cursor-pointer ${
                        isSelected
                          ? 'border-indigo-600 bg-indigo-50/80 text-indigo-950 shadow-xs ring-2 ring-indigo-500'
                          : 'border-slate-200 bg-slate-50/60 hover:bg-slate-100 text-slate-800'
                      }`}
                    >
                      <span
                        className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0 ${
                          isSelected ? 'bg-indigo-600 text-white' : 'bg-white border border-slate-200'
                        }`}
                      >
                        <IconComp className={`w-4 h-4 ${isSelected ? 'text-white' : opt.iconColor}`} />
                      </span>
                      <span className="block flex-1 min-w-0">
                        <span className="font-bold text-xs sm:text-sm text-slate-900 leading-tight block mb-0.5">
                          {displayLabel}
                        </span>
                        <span className="block text-[11px] text-slate-600 leading-tight line-clamp-2">
                          {displayDesc}
                        </span>
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {/* STEP 2 */}
          {step === 2 && (
            <div className="space-y-4">
              <div className="text-left">
                <span className="text-xs font-black uppercase tracking-wider text-indigo-700 block mb-1">
                  {ui.wizardStepLabel} 2 · {ui.navThemes}
                </span>
                <h3 className="text-base sm:text-lg font-black text-slate-900">
                  {ui.wizardThemeQuestion}
                </h3>
                {selectedAgeOpt && (
                  <p className="text-xs text-indigo-700 font-bold mt-0.5">
                    {isEs ? selectedAgeOpt.esBadge : tTerm(selectedAgeOpt.badgeKey)}
                  </p>
                )}
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-1 max-h-[38vh] overflow-y-auto pr-1">
                {currentThemes.map((item) => {
                  const isSelected = selectedVibe === item.id;
                  const isInfalible = item.id.includes('infallible') || item.id.includes('everything');
                  const disp = getThemeDisplay(item, isEs, localeKey, tTerm, ui);
                  return (
                    <button
                      key={item.id}
                      type="button"
                      onClick={() => setSelectedVibe(item.id)}
                      className={`p-3.5 rounded-2xl text-left border transition-all flex flex-col gap-1 cursor-pointer ${
                        isSelected
                          ? 'border-indigo-600 bg-indigo-600 text-white shadow-md ring-2 ring-indigo-500'
                          : isInfalible
                          ? 'border-amber-300 bg-amber-50/70 text-amber-950 hover:bg-amber-100'
                          : 'border-slate-200 bg-slate-50/70 text-slate-800 hover:bg-slate-100'
                      }`}
                    >
                      <span className="flex items-center justify-between gap-2">
                        <span className="font-bold text-xs sm:text-sm leading-tight">{disp.label}</span>
                        {isInfalible && !isSelected && (
                          <span className="text-[10px] font-black uppercase px-2 py-0.5 bg-amber-200 text-amber-900 rounded-full shrink-0">
                            {ui.badgeTop}
                          </span>
                        )}
                      </span>
                      <span className={`text-[11px] leading-tight ${isSelected ? 'text-indigo-100' : 'text-slate-600'}`}>
                        {disp.desc}
                      </span>
                    </button>
                  );
                })}
              </div>

              <div className="mt-3 p-3.5 rounded-2xl bg-indigo-50/50 border border-indigo-100">
                <div className="text-xs font-bold text-indigo-950 flex items-center justify-between mb-1.5">
                  <label htmlFor="gift-wizard-interest" className="flex items-center gap-1.5 cursor-pointer">
                    <Lightbulb className="w-3.5 h-3.5 text-indigo-600" />
                    <span>{ui.headerSearchButton}</span>
                  </label>
                  {customInterest && (
                    <button
                      type="button"
                      onClick={() => setCustomInterest('')}
                      className="text-[11px] text-slate-700 hover:text-slate-950 underline cursor-pointer"
                    >
                      {ui.clearFilters}
                    </button>
                  )}
                </div>
                <div className="relative">
                  <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-slate-600 pointer-events-none" />
                  <input
                    id="gift-wizard-interest"
                    type="text"
                    value={customInterest}
                    onChange={(e) => setCustomInterest(e.target.value)}
                    aria-label={ui.wizardInterestPlaceholder}
                    placeholder={ui.wizardInterestPlaceholder}
                    className="w-full pl-9 pr-3.5 py-2 text-xs rounded-xl border border-slate-200 bg-white focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 outline-none transition-all placeholder:text-slate-500 text-slate-800"
                  />
                </div>

                {selectedThemeObj?.quickChips && selectedThemeObj.quickChips.length > 0 && (
                  <div className="flex flex-wrap items-center gap-1.5 mt-2">
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

          {/* STEP 3 */}
          {step === 3 && (
            <div className="space-y-4">
              <div className="text-left">
                <span className="text-xs font-black uppercase tracking-wider text-indigo-700 block mb-1">
                  {ui.wizardStepLabel} 3 · {ui.genderLabel}
                </span>
                <h3 className="text-base sm:text-lg font-black text-slate-900">
                  {ui.navRecipients}
                </h3>
                <p className="text-xs text-indigo-700 font-bold mt-0.5">
                  {selectedThemeDisplay.label}
                </p>
              </div>

              <div className={`grid grid-cols-1 ${isRevealMode ? 'sm:grid-cols-2' : 'sm:grid-cols-3'} gap-3 pt-2`}>
                {isRevealMode ? (
                  <>
                    <button
                      type="button"
                      onClick={() => setSelectedGender('reveal')}
                      className={`p-4 rounded-2xl text-left border transition-all flex flex-col gap-1.5 cursor-pointer ${
                        selectedGender === 'reveal'
                          ? 'border-amber-500 bg-amber-50 text-amber-950 ring-2 ring-amber-500 shadow-sm'
                          : 'border-slate-200 bg-slate-50 hover:bg-slate-100'
                      }`}
                    >
                      <PartyPopper className="w-6 h-6 text-amber-500 mb-1" />
                      <span className="font-bold text-sm text-slate-900">
                        {tTerm('Fiesta Revelación de Género')}
                      </span>
                      <span className="text-xs text-slate-600 leading-relaxed">
                        {tTerm('Fiestas y Revelación de Género')}
                      </span>
                    </button>

                    <button
                      type="button"
                      onClick={() => setSelectedGender('all')}
                      className={`p-4 rounded-2xl text-left border transition-all flex flex-col gap-1.5 cursor-pointer ${
                        selectedGender === 'all'
                          ? 'border-indigo-600 bg-indigo-50 text-indigo-950 ring-2 ring-indigo-500 shadow-sm'
                          : 'border-slate-200 bg-slate-50 hover:bg-slate-100'
                      }`}
                    >
                      <Gift className="w-6 h-6 text-indigo-600 mb-1" />
                      <span className="font-bold text-sm text-slate-900">{ui.genderAll}</span>
                      <span className="text-xs text-slate-600 leading-relaxed">
                        {tTerm('Cochecitos y Esenciales de Bebé')}
                      </span>
                    </button>
                  </>
                ) : (
                  <>
                    <button
                      type="button"
                      onClick={() => setSelectedGender('boy')}
                      className={`p-3.5 sm:p-4 rounded-2xl text-left border transition-all flex flex-col gap-1.5 cursor-pointer ${
                        selectedGender === 'boy'
                          ? 'border-blue-600 bg-blue-50 text-blue-950 ring-2 ring-blue-500 shadow-sm'
                          : 'border-slate-200 bg-slate-50 hover:bg-slate-100'
                      }`}
                    >
                      <User className="w-6 h-6 text-blue-600 mb-1" />
                      <span className="font-bold text-sm text-slate-900">{ui.genderBoy}</span>
                      <span className="text-xs text-slate-600 leading-relaxed">
                        {tTerm('Regalos para Él')}
                      </span>
                    </button>

                    <button
                      type="button"
                      onClick={() => setSelectedGender('girl')}
                      className={`p-3.5 sm:p-4 rounded-2xl text-left border transition-all flex flex-col gap-1.5 cursor-pointer ${
                        selectedGender === 'girl'
                          ? 'border-pink-600 bg-pink-50 text-pink-950 ring-2 ring-pink-500 shadow-sm'
                          : 'border-slate-200 bg-slate-50 hover:bg-slate-100'
                      }`}
                    >
                      <Heart className="w-6 h-6 text-pink-600 mb-1" />
                      <span className="font-bold text-sm text-slate-900">{ui.genderGirl}</span>
                      <span className="text-xs text-slate-600 leading-relaxed">
                        {tTerm('Regalos para Ella')}
                      </span>
                    </button>

                    <button
                      type="button"
                      onClick={() => setSelectedGender('all')}
                      className={`p-3.5 sm:p-4 rounded-2xl text-left border transition-all flex flex-col gap-1.5 cursor-pointer ${
                        selectedGender === 'all'
                          ? 'border-indigo-600 bg-indigo-50 text-indigo-950 ring-2 ring-indigo-500 shadow-sm'
                          : 'border-slate-200 bg-slate-50 hover:bg-slate-100'
                      }`}
                    >
                      <Users className="w-6 h-6 text-indigo-600 mb-1" />
                      <span className="font-bold text-sm text-slate-900">{ui.genderAll}</span>
                      <span className="text-xs text-slate-600 leading-relaxed">
                        {tTerm('Unisex / Todos')}
                      </span>
                    </button>
                  </>
                )}
              </div>
            </div>
          )}

          {/* STEP 4 */}
          {step === 4 && (
            <div className="space-y-4">
              <div className="text-left">
                <span className="text-xs font-black uppercase tracking-wider text-indigo-700 block mb-1">
                  {ui.wizardStepLabel} 4 · {ui.maxBudgetLabel}
                </span>
                <h3 className="text-base sm:text-lg font-black text-slate-900">
                  {ui.wizardBudgetQuestion}
                </h3>
                <p className="text-xs text-slate-600 mt-0.5">{ui.verifiedCatalogNote}</p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-1">
                {[
                  { id: '<20', icon: Tag, iconColor: 'text-emerald-500' },
                  { id: '20-50', icon: Gift, iconColor: 'text-indigo-500' },
                  { id: '50-100', icon: Gem, iconColor: 'text-purple-500' },
                  { id: '>100', icon: Crown, iconColor: 'text-amber-500' },
                  { id: 'all', icon: Coins, iconColor: 'text-slate-500' },
                ].map((item) => {
                  const IconComp = item.icon;
                  const isSelected = selectedBudget === item.id;
                  return (
                    <button
                      key={item.id}
                      type="button"
                      onClick={() => setSelectedBudget(item.id)}
                      className={`p-3.5 rounded-2xl text-left border transition-all flex items-center gap-3 cursor-pointer ${
                        isSelected
                          ? 'border-indigo-600 bg-indigo-50/80 text-indigo-950 ring-2 ring-indigo-500 shadow-xs'
                          : 'border-slate-200 bg-slate-50/70 text-slate-800 hover:bg-slate-100'
                      }`}
                    >
                      <span
                        className={`w-8 h-8 rounded-xl flex items-center justify-center shrink-0 ${
                          isSelected ? 'bg-indigo-600 text-white' : 'bg-white border border-slate-200'
                        }`}
                      >
                        <IconComp className={`w-4 h-4 ${isSelected ? 'text-white' : item.iconColor}`} />
                      </span>
                      <span className="font-bold text-xs sm:text-sm text-slate-900 block leading-tight">
                        {tBudget(item.id)}
                      </span>
                    </button>
                  );
                })}
              </div>

              <div className="mt-4 p-4 rounded-2xl bg-gradient-to-r from-indigo-50 via-purple-50 to-pink-50 border border-indigo-200/80">
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-xl bg-indigo-600 text-white flex items-center justify-center shrink-0 shadow-xs">
                    <Bot className="w-4 h-4 text-amber-300" />
                  </div>
                  <div className="text-xs">
                    <span className="font-black text-indigo-950 block mb-0.5">
                      {ui.wizardTitle}
                    </span>
                    <p className="text-slate-700">
                      <strong className="text-slate-900">
                        {selectedAgeOpt
                          ? isEs
                            ? selectedAgeOpt.esBadge
                            : tTerm(selectedAgeOpt.badgeKey)
                          : selectedAge}
                      </strong>{' '}
                      • <strong className="text-indigo-700">{selectedThemeDisplay.label}</strong>
                      {customInterest && (
                        <span>
                          {' '}
                          (<strong className="text-purple-700">&quot;{customInterest}&quot;</strong>)
                        </span>
                      )}{' '}
                      • <strong className="text-slate-900">{tBudget(selectedBudget)}</strong>
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
              type="button"
              onClick={() => setStep(step - 1)}
              className="text-xs font-bold text-slate-700 hover:text-slate-950 px-3 py-2 transition-colors cursor-pointer"
            >
              ← {ui.wizardBack}
            </button>
          ) : (
            <div />
          )}

          {step < 4 ? (
            <button
              type="button"
              onClick={() => setStep(step + 1)}
              className="px-6 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs sm:text-sm font-bold flex items-center gap-2 shadow-sm transition-all cursor-pointer"
            >
              <span>{ui.wizardNext}</span>
              <ArrowRight className={`w-4 h-4 ${isRtl ? 'rotate-180' : ''}`} />
            </button>
          ) : (
            <button
              type="button"
              onClick={handleFinish}
              className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-indigo-700 via-purple-700 to-pink-700 hover:opacity-95 text-white text-xs sm:text-sm font-black flex items-center gap-2 shadow-md transition-all scale-102 cursor-pointer"
            >
              <Bot className="w-4 h-4 text-amber-300" />
              <span>{ui.wizardSeeResults}</span>
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
