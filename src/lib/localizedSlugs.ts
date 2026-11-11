import { AGE_SUBCATEGORIES_MAP } from '@/data/products';
import { SEO_AGE_ROUTES, slugify } from '@/lib/seoRoutes';
import { ALL_STATIC_HUB_SLUGS, SEO_FILTER_ROUTES } from '@/lib/filterRoutes';
import { PASSION_HUB_FILTERS_MAP } from '@/lib/passionHubFilters';
import { EN_TERMS } from '@/lib/locales/en';
import { WEST_EUROPE_PACKS } from '@/lib/locales/westEurope';
import { NORTH_EAST_EUROPE_PACKS } from '@/lib/locales/northEastEurope';
import { SOUTH_EAST_EUROPE_TR_PACKS } from '@/lib/locales/southEastEuropeTr';
import { ASIA_ARABIC_PACKS } from '@/lib/locales/asiaArabic';

let cachedTermTranslations: Record<string, Record<string, string>> | null = null;

function getTermTranslations(): Record<string, Record<string, string>> {
  if (!cachedTermTranslations) {
    cachedTermTranslations = {
      en: EN_TERMS,
      ...Object.fromEntries(
        Object.entries({
          ...WEST_EUROPE_PACKS,
          ...NORTH_EAST_EUROPE_PACKS,
          ...SOUTH_EAST_EUROPE_TR_PACKS,
          ...ASIA_ARABIC_PACKS,
        }).map(([k, pack]) => [k, pack?.terms || {}])
      ),
    };
  }
  return cachedTermTranslations;
}

/**
 * Languages that use Latin script and receive native translated ASCII slugs.
 * Non-Latin script locales (ru, uk, ar, zh, ja, ko, hi, el, bg) use clean English
 * ASCII slugs under their /<lang>/ prefix to avoid percent-encoded URLs.
 */
const LATIN_SCRIPT_LOCALES = new Set([
  'es',
  'es-us',
  'en',
  'en-gb',
  'de',
  'fr',
  'it',
  'pt',
  'nl',
  'pl',
  'sv',
  'no',
  'da',
  'fi',
  'tr',
  'ro',
  'cs',
  'hu',
]);

/**
 * Transliterates extended Latin characters (German umlauts, Nordic letters,
 * Polish ł, Turkish ı/ğ/ş, etc.) to clean ASCII before slugification.
 */
export function asciiSlugify(text: string): string {
  const transliterated = text
    .toString()
    .replace(/ß/g, 'ss')
    .replace(/Ä/g, 'Ae')
    .replace(/ä/g, 'ae')
    .replace(/Ö/g, 'Oe')
    .replace(/ö/g, 'oe')
    .replace(/Ü/g, 'Ue')
    .replace(/ü/g, 'ue')
    .replace(/[Øø]/g, 'o')
    .replace(/[Åå]/g, 'a')
    .replace(/[Ææ]/g, 'ae')
    .replace(/[Œœ]/g, 'oe')
    .replace(/[Łł]/g, 'l')
    .replace(/[Đđ]/g, 'd')
    .replace(/[İı]/g, 'i')
    .replace(/[Ğğ]/g, 'g')
    .replace(/[Şş]/g, 's')
    .replace(/[Çç]/g, 'c')
    .replace(/&/g, ' and ')
    .replace(/\+/g, ' plus ');

  return slugify(transliterated);
}

/**
 * Clean English slugs for all top-level Spanish slugs (hubs, filters, age stages, and specific years).
 */
const EN_TOP_LEVEL_SLUGS: Record<string, string> = {
  // Static hubs (ocasiones & herramientas)
  'motoristas': 'biker-gifts',
  'automovil': 'car-lover-gifts',
  'ciclismo': 'cycling-gifts',
  'gaming': 'gaming-gifts',
  'amantes-del-cafe': 'coffee-lover-gifts',
  'mascotas': 'pet-lover-gifts',
  'regalos-menos-20-euros': 'gifts-under-20',
  'halloween': 'halloween-gifts',
  'navidad': 'christmas-gifts',
  'carta-papa-noel': 'letter-to-santa',
  'regalos-gta-6': 'gta-6-gifts',
  'que-regalar-a-un-hombre': 'what-to-gift-a-man',
  'que-regalar-a-una-mujer': 'what-to-gift-a-woman',
  'que-regalar-a-mi-novio': 'gifts-for-my-boyfriend',
  'que-regalar-a-mi-novia': 'gifts-for-my-girlfriend',
  'regalos-para-los-que-tienen-de-todo': 'gifts-for-people-who-have-everything',
  'votar': 'group-gift-voting',

  // Recipient gender filters
  'regalos-para-el': 'gifts-for-him',
  'regalos-para-ella': 'gifts-for-her',

  // Budget filters (presupuestos)
  'regalos-menos-15-euros': 'gifts-under-15',
  'regalos-de-15-a-30-euros': 'gifts-from-15-to-30',
  'regalos-de-20-a-50-euros': 'gifts-from-20-to-50',
  'regalos-de-30-a-60-euros': 'gifts-from-30-to-60',
  'regalos-de-50-a-100-euros': 'gifts-from-50-to-100',
  'regalos-mas-de-60-euros': 'gifts-over-60',
  'regalos-mas-de-100-euros': 'gifts-over-100',

  // Categories, themes, anime & wheels (tematicas)
  'sobre-ruedas-coches-quads-y-patinetes': 'ride-on-cars-quads-and-scooters',
  'smartphones-y-telefonia': 'smartphones-and-mobile-phones',
  'cartas-y-sobres-pokemon': 'pokemon-cards-and-boosters',
  'figuras-de-coleccion-y-cine': 'collectible-and-movie-figures',
  'juegos-de-mesa-y-cartas': 'board-and-card-games',
  'lego-y-construccion': 'lego-and-building-sets',
  'scalextric-y-circuitos-de-coches': 'slot-car-tracks-and-rc-cars',
  'videojuegos-y-setup-gamer': 'video-games-and-gaming-setup',
  'libros-y-lectura-infantil-y-juvenil': 'kids-and-teen-books',
  'perfumeria-colonias-y-fragancias': 'perfumes-colognes-and-fragrances',
  'manualidades-y-creatividad': 'arts-crafts-and-creativity',
  'moda-ropa-y-accesorios': 'fashion-clothing-and-accessories',
  'cochecitos-y-esenciales-de-bebe': 'baby-strollers-and-essentials',
  'tecnologia-y-gadgets': 'tech-and-gadgets',
  'bicis-y-patinetes-con-ruedas': 'bikes-and-scooters',
  'fiestas-y-revelacion-de-genero': 'party-and-gender-reveal-supplies',
  'escapadas-y-experiencias-regalo': 'getaways-and-experience-gifts',
  'regalos-gourmet-cafe-y-cocteleria': 'gourmet-coffee-and-cocktail-gifts',
  'ropa-pijamas-y-batas': 'pajamas-kigurumis-and-robes',
  'ropa-chandal-y-deporte': 'hoodies-tracksuits-and-sportswear',
  'calzado-y-zapatillas-regalo': 'footwear-sneakers-and-socks',
  'disfraces-y-fiestas': 'costumes-and-party-outfits',
  'ropa-diario-y-basicos': 'everyday-clothing-and-backpacks',
  'figuras-dragon-ball': 'dragon-ball-figures',
  'regalos-pokemon-figuras-y-cartas': 'pokemon-figures-and-cards',
  'figuras-one-piece': 'one-piece-figures',
  'figuras-one-punch-man': 'one-punch-man-figures',
  'figuras-demon-slayer': 'demon-slayer-figures',
  'figuras-naruto': 'naruto-figures',
  'figuras-cine-retro': 'retro-movie-collectibles',
  'coches-electricos-para-ninos': 'electric-ride-on-cars-for-kids',
  'quads-y-buggies-ninos': 'kids-quads-and-buggies',
  'minimotos-y-motos-electricas': 'electric-mini-bikes-and-motorcycles',
  'patinetes-electricos-y-hoverboards': 'electric-scooters-and-hoverboards',
  'bicis-karts-y-patines': 'balance-bikes-karts-and-skates',

  // Primary age stages (edades)
  'bebes-0-a-12-meses': 'babies-0-to-12-months',
  'ninos-1-a-3-anos': 'toddlers-1-to-3-years',
  'ninos-4-a-6-anos': 'kids-4-to-6-years',
  'ninos-7-a-9-anos': 'kids-7-to-9-years',
  'ninos-10-a-12-anos': 'tweens-10-to-12-years',
  'jovenes-13-a-15-anos': 'teens-13-to-15-years',
  'jovenes-16-a-18-anos': 'youth-16-to-18-years',
  'adultos-mas-de-18-anos': 'adults-over-18-years',
  'fiesta-revelacion-genero': 'gender-reveal-party-gifts',

  // Specific-year ages (1 to 18 years)
  'regalos-para-bebes-de-1-ano': 'gifts-for-1-year-old-babies',
  'regalos-para-ninos-de-2-anos': 'gifts-for-2-year-old-kids',
  'regalos-para-ninos-de-3-anos': 'gifts-for-3-year-old-kids',
  'regalos-para-ninos-de-4-anos': 'gifts-for-4-year-old-kids',
  'regalos-para-ninos-de-5-anos': 'gifts-for-5-year-old-kids',
  'regalos-para-ninos-de-6-anos': 'gifts-for-6-year-old-kids',
  'regalos-para-ninos-de-7-anos': 'gifts-for-7-year-old-kids',
  'regalos-para-ninos-de-8-anos': 'gifts-for-8-year-old-kids',
  'regalos-para-ninos-de-9-anos': 'gifts-for-9-year-old-kids',
  'regalos-para-ninos-de-10-anos': 'gifts-for-10-year-old-kids',
  'regalos-para-ninos-de-11-anos': 'gifts-for-11-year-old-kids',
  'regalos-para-ninos-de-12-anos': 'gifts-for-12-year-old-kids',
  'regalos-para-ninos-de-13-anos': 'gifts-for-13-year-old-kids',
  'regalos-para-ninos-de-14-anos': 'gifts-for-14-year-old-kids',
  'regalos-para-ninos-de-15-anos': 'gifts-for-15-year-old-kids',
  'regalos-para-jovenes-de-16-anos': 'gifts-for-16-year-old-teens',
  'regalos-para-jovenes-de-17-anos': 'gifts-for-17-year-old-teens',
  'regalos-para-jovenes-de-18-anos': 'gifts-for-18-year-olds',
};

/**
 * Pattern templates for specific-year age slugs across Latin-script languages.
 */
const SPECIFIC_YEAR_TEMPLATES: Record<
  string,
  { year1: string; kids: (n: number) => string; teens: (n: number) => string }
> = {
  fr: {
    year1: 'cadeaux-pour-bebe-de-1-an',
    kids: (n) => `cadeaux-pour-enfants-de-${n}-ans`,
    teens: (n) => `cadeaux-pour-jeunes-de-${n}-ans`,
  },
  de: {
    year1: 'geschenke-fuer-1-jaehrige-babys',
    kids: (n) => `geschenke-fuer-${n}-jaehrige-kinder`,
    teens: (n) => `geschenke-fuer-${n}-jaehrige-jugendliche`,
  },
  it: {
    year1: 'regali-per-bambini-di-1-anno',
    kids: (n) => `regali-per-bambini-di-${n}-anni`,
    teens: (n) => `regali-per-ragazzi-di-${n}-anni`,
  },
  pt: {
    year1: 'presentes-para-bebes-de-1-ano',
    kids: (n) => `presentes-para-criancas-de-${n}-anos`,
    teens: (n) => `presentes-para-jovens-de-${n}-anos`,
  },
  nl: {
    year1: 'cadeaus-voor-babys-van-1-jaar',
    kids: (n) => `cadeaus-voor-kinderen-van-${n}-jaar`,
    teens: (n) => `cadeaus-voor-jongeren-van-${n}-jaar`,
  },
  pl: {
    year1: 'prezenty-na-roczek-1-rok',
    kids: (n) => `prezenty-dla-${n}-letnich-dzieci`,
    teens: (n) => `prezenty-dla-${n}-latkow`,
  },
  sv: {
    year1: 'presenter-till-1-aringar',
    kids: (n) => `presenter-till-${n}-aringar`,
    teens: (n) => `presenter-till-${n}-aringar`,
  },
  no: {
    year1: 'gaver-til-1-aringer',
    kids: (n) => `gaver-til-${n}-aringer`,
    teens: (n) => `gaver-til-${n}-aringer`,
  },
  da: {
    year1: 'gaver-til-1-arige',
    kids: (n) => `gaver-til-${n}-arige-born`,
    teens: (n) => `gaver-til-${n}-arige-unge`,
  },
  fi: {
    year1: 'lahjat-1-vuotiaille',
    kids: (n) => `lahjat-${n}-vuotiaille-lapsille`,
    teens: (n) => `lahjat-${n}-vuotiaille-nuorille`,
  },
  tr: {
    year1: '1-yas-bebek-hediyeleri',
    kids: (n) => `${n}-yas-cocuklar-icin-hediyeler`,
    teens: (n) => `${n}-yas-gencler-icin-hediyeler`,
  },
  ro: {
    year1: 'cadouri-pentru-copii-de-1-an',
    kids: (n) => `cadouri-pentru-copii-de-${n}-ani`,
    teens: (n) => `cadouri-pentru-tineri-de-${n}-ani`,
  },
  cs: {
    year1: 'darky-pro-1lete-dite',
    kids: (n) => `darky-pro-${n}lete-deti`,
    teens: (n) => `darky-pro-${n}lete-mlade`,
  },
  hu: {
    year1: 'ajandekok-1-eves-babaknak',
    kids: (n) => `ajandekok-${n}-eves-gyerekeknek`,
    teens: (n) => `ajandekok-${n}-eves-fiataloknak`,
  },
};

/**
 * Native top-level stage/hub overrides for major European languages.
 */
const NATIVE_STAGE_AND_HUB_OVERRIDES: Record<string, Record<string, string>> = {
  fr: {
    'bebes-0-a-12-meses': 'bebes-0-a-12-mois',
    'ninos-1-a-3-anos': 'enfants-1-a-3-ans',
    'ninos-4-a-6-anos': 'enfants-4-a-6-ans',
    'ninos-7-a-9-anos': 'enfants-7-a-9-ans',
    'ninos-10-a-12-anos': 'preadolescents-10-a-12-ans',
    'jovenes-13-a-15-anos': 'adolescents-13-a-15-ans',
    'jovenes-16-a-18-anos': 'jeunes-16-a-18-ans',
    'adultos-mas-de-18-anos': 'adultes-plus-de-18-ans',
    'fiesta-revelacion-genero': 'fete-revelation-du-sexe',
    'regalos-para-el': 'cadeaux-pour-lui',
    'regalos-para-ella': 'cadeaux-pour-elle',
    'regalos-menos-15-euros': 'cadeaux-moins-de-15-euros',
    'regalos-menos-20-euros': 'cadeaux-moins-de-20-euros',
    'regalos-de-15-a-30-euros': 'cadeaux-de-15-a-30-euros',
    'regalos-de-20-a-50-euros': 'cadeaux-de-20-a-50-euros',
    'regalos-de-30-a-60-euros': 'cadeaux-de-30-a-60-euros',
    'regalos-de-50-a-100-euros': 'cadeaux-de-50-a-100-euros',
    'regalos-mas-de-60-euros': 'cadeaux-plus-de-60-euros',
    'regalos-mas-de-100-euros': 'cadeaux-plus-de-100-euros',
    'motoristas': 'cadeaux-motards',
    'automovil': 'cadeaux-automobile',
    'ciclismo': 'cadeaux-cyclisme',
    'gaming': 'cadeaux-gaming',
    'amantes-del-cafe': 'amateurs-de-cafe',
    'mascotas': 'animaux-de-compagnie',
    'halloween': 'cadeaux-halloween',
    'navidad': 'cadeaux-noel',
    'carta-papa-noel': 'lettre-au-pere-noel',
    'regalos-gta-6': 'cadeaux-gta-6',
    'que-regalar-a-un-hombre': 'que-offrir-a-un-homme',
    'que-regalar-a-una-mujer': 'que-offrir-a-une-femme',
    'que-regalar-a-mi-novio': 'cadeaux-pour-mon-copain',
    'que-regalar-a-mi-novia': 'cadeaux-pour-ma-copine',
    'regalos-para-los-que-tienen-de-todo': 'cadeaux-pour-ceux-qui-ont-tout',
    'votar': 'vote-cadeau-groupe',
  },
  de: {
    'bebes-0-a-12-meses': 'babys-0-bis-12-monate',
    'ninos-1-a-3-anos': 'kleinkinder-1-bis-3-jahre',
    'ninos-4-a-6-anos': 'kinder-4-bis-6-jahre',
    'ninos-7-a-9-anos': 'kinder-7-bis-9-jahre',
    'ninos-10-a-12-anos': 'kinder-10-bis-12-jahre',
    'jovenes-13-a-15-anos': 'teenager-13-bis-15-jahre',
    'jovenes-16-a-18-anos': 'jugendliche-16-bis-18-jahre',
    'adultos-mas-de-18-anos': 'erwachsene-ab-18-jahren',
    'fiesta-revelacion-genero': 'gender-reveal-party-geschenke',
    'regalos-para-el': 'geschenke-fuer-ihn',
    'regalos-para-ella': 'geschenke-fuer-sie',
    'regalos-menos-15-euros': 'geschenke-unter-15-euro',
    'regalos-menos-20-euros': 'geschenke-unter-20-euro',
    'regalos-de-15-a-30-euros': 'geschenke-15-bis-30-euro',
    'regalos-de-20-a-50-euros': 'geschenke-20-bis-50-euro',
    'regalos-de-30-a-60-euros': 'geschenke-30-bis-60-euro',
    'regalos-de-50-a-100-euros': 'geschenke-50-bis-100-euro',
    'regalos-mas-de-60-euros': 'geschenke-ueber-60-euro',
    'regalos-mas-de-100-euros': 'geschenke-ueber-100-euro',
    'motoristas': 'geschenke-fuer-motorradfahrer',
    'automovil': 'geschenke-fuer-autofans',
    'ciclismo': 'geschenke-fuer-radfahrer',
    'gaming': 'gaming-geschenke',
    'amantes-del-cafe': 'geschenke-fuer-kaffeeliebhaber',
    'mascotas': 'geschenke-fuer-haustiere',
    'halloween': 'halloween-geschenke',
    'navidad': 'weihnachtsgeschenke',
    'carta-papa-noel': 'wunschzettel-an-den-weihnachtsmann',
    'regalos-gta-6': 'gta-6-geschenke',
    'que-regalar-a-un-hombre': 'geschenkideen-fuer-maenner',
    'que-regalar-a-una-mujer': 'geschenkideen-fuer-frauen',
    'que-regalar-a-mi-novio': 'geschenke-fuer-meinen-freund',
    'que-regalar-a-mi-novia': 'geschenke-fuer-meine-freundin',
    'regalos-para-los-que-tienen-de-todo': 'geschenke-fuer-leute-die-alles-haben',
    'votar': 'gruppen-geschenkabstimmung',
  },
  it: {
    'bebes-0-a-12-meses': 'neonati-0-a-12-mesi',
    'ninos-1-a-3-anos': 'bambini-1-a-3-anni',
    'ninos-4-a-6-anos': 'bambini-4-a-6-anni',
    'ninos-7-a-9-anos': 'bambini-7-a-9-anni',
    'ninos-10-a-12-anos': 'ragazzi-10-a-12-anni',
    'jovenes-13-a-15-anos': 'adolescenti-13-a-15-anni',
    'jovenes-16-a-18-anos': 'giovani-16-a-18-anni',
    'adultos-mas-de-18-anos': 'adulti-oltre-18-anni',
    'fiesta-revelacion-genero': 'festa-gender-reveal',
    'regalos-para-el': 'regali-per-lui',
    'regalos-para-ella': 'regali-per-lei',
    'regalos-menos-15-euros': 'regali-sotto-15-euro',
    'regalos-menos-20-euros': 'regali-sotto-20-euro',
    'regalos-de-15-a-30-euros': 'regali-da-15-a-30-euro',
    'regalos-de-20-a-50-euros': 'regali-da-20-a-50-euro',
    'regalos-de-30-a-60-euros': 'regali-da-30-a-60-euro',
    'regalos-de-50-a-100-euros': 'regali-da-50-a-100-euro',
    'regalos-mas-de-60-euros': 'regali-oltre-60-euro',
    'regalos-mas-de-100-euros': 'regali-oltre-100-euro',
    'motoristas': 'regali-motociclisti',
    'automovil': 'regali-automobilisti',
    'ciclismo': 'regali-ciclismo',
    'gaming': 'regali-gaming',
    'amantes-del-cafe': 'amanti-del-caffe',
    'mascotas': 'regali-animali-domestici',
    'halloween': 'regali-halloween',
    'navidad': 'regali-di-natale',
    'carta-papa-noel': 'lettera-a-babbo-natale',
    'regalos-gta-6': 'regali-gta-6',
    'que-regalar-a-un-hombre': 'cosa-regalare-a-un-uomo',
    'que-regalar-a-una-mujer': 'cosa-regalare-a-una-donna',
    'que-regalar-a-mi-novio': 'regali-per-il-mio-fidanzato',
    'que-regalar-a-mi-novia': 'regali-per-la-mia-fidanzata',
    'regalos-para-los-que-tienen-de-todo': 'regali-per-chi-ha-gia-tutto',
    'votar': 'vota-regalo-di-gruppo',
  },
  pt: {
    'bebes-0-a-12-meses': 'bebes-0-a-12-meses',
    'ninos-1-a-3-anos': 'criancas-1-a-3-anos',
    'ninos-4-a-6-anos': 'criancas-4-a-6-anos',
    'ninos-7-a-9-anos': 'criancas-7-a-9-anos',
    'ninos-10-a-12-anos': 'pre-adolescentes-10-a-12-anos',
    'jovenes-13-a-15-anos': 'adolescentes-13-a-15-anos',
    'jovenes-16-a-18-anos': 'jovens-16-a-18-anos',
    'adultos-mas-de-18-anos': 'adultos-mais-de-18-anos',
    'fiesta-revelacion-genero': 'cha-revelacao-presentes',
    'regalos-para-el': 'presentes-para-ele',
    'regalos-para-ella': 'presentes-para-ela',
    'regalos-menos-15-euros': 'presentes-ate-15-euros',
    'regalos-menos-20-euros': 'presentes-ate-20-euros',
    'regalos-de-15-a-30-euros': 'presentes-de-15-a-30-euros',
    'regalos-de-20-a-50-euros': 'presentes-de-20-a-50-euros',
    'regalos-de-30-a-60-euros': 'presentes-de-30-a-60-euros',
    'regalos-de-50-a-100-euros': 'presentes-de-50-a-100-euros',
    'regalos-mas-de-60-euros': 'presentes-mais-de-60-euros',
    'regalos-mas-de-100-euros': 'presentes-mais-de-100-euros',
    'motoristas': 'presentes-motociclistas',
    'automovil': 'presentes-automoveis',
    'ciclismo': 'presentes-ciclismo',
    'gaming': 'presentes-gaming',
    'amantes-del-cafe': 'amantes-de-cafe',
    'mascotas': 'presentes-pets',
    'halloween': 'presentes-halloween',
    'navidad': 'presentes-de-natal',
    'carta-papa-noel': 'carta-ao-pai-natal',
    'regalos-gta-6': 'presentes-gta-6',
    'que-regalar-a-un-hombre': 'o-que-oferecer-a-um-homem',
    'que-regalar-a-una-mujer': 'o-que-oferecer-a-uma-mulher',
    'que-regalar-a-mi-novio': 'presentes-para-o-meu-namorado',
    'que-regalar-a-mi-novia': 'presentes-para-a-minha-namorada',
    'regalos-para-los-que-tienen-de-todo': 'presentes-para-quem-tem-tudo',
    'votar': 'votar-presente-em-grupo',
  },
};

/**
 * Legacy/alias Spanish slugs that should also resolve cleanly to their canonical Spanish slug.
 */
const ES_SLUG_ALIASES: Record<string, string> = {
  'adolescentes-13-a-15-anos': 'jovenes-13-a-15-anos',
  'preadolescentes-10-a-12-anos': 'ninos-10-a-12-anos',
  'adolescentes-16-a-18-anos': 'jovenes-16-a-18-anos',
  'regalos-para-ninos-de-1-ano': 'regalos-para-bebes-de-1-ano',
  'regalos-para-ninos-de-16-anos': 'regalos-para-jovenes-de-16-anos',
  'regalos-para-ninos-de-17-anos': 'regalos-para-jovenes-de-17-anos',
  'regalos-para-ninos-de-18-anos': 'regalos-para-jovenes-de-18-anos',
  'creative-stationery-and-bullet-journal': 'papeleria-creativa-y-bullet-journal',
};

interface LocaleSlugTable {
  forward: Record<string, string>;
  reverse: Record<string, string>;
}

const SLUG_TABLES_BY_LANG: Record<string, LocaleSlugTable> = {};

function getBaseLangKey(localeKey: string | null | undefined): string {
  if (!localeKey) return 'es';
  const clean = localeKey.toLowerCase().trim();
  if (clean === 'es' || clean === 'es-us') return 'es';
  if (clean === 'en' || clean === 'en-gb') return 'en';
  return clean;
}

function buildAllCanonicalEsSlugs(): {
  topLevelSlugs: string[];
  subcatSlugsWithLabels: { slug: string; labelEs: string }[];
} {
  const topSet = new Set<string>();
  for (const s of ALL_STATIC_HUB_SLUGS) topSet.add(s);
  for (const s of Object.keys(SEO_FILTER_ROUTES)) topSet.add(s);
  for (const s of Object.keys(SEO_AGE_ROUTES)) topSet.add(s);

  const subcatMap = new Map<string, string>();
  for (const subs of Object.values(AGE_SUBCATEGORIES_MAP)) {
    for (const labelEs of subs) {
      const s = slugify(labelEs);
      if (!subcatMap.has(s)) {
        subcatMap.set(s, labelEs);
      }
    }
  }
  for (const filterList of Object.values(PASSION_HUB_FILTERS_MAP)) {
    for (const item of filterList) {
      if (!subcatMap.has(item.slug)) {
        subcatMap.set(item.slug, item.label);
      }
    }
  }

  return {
    topLevelSlugs: Array.from(topSet),
    subcatSlugsWithLabels: Array.from(subcatMap.entries()).map(([slug, labelEs]) => ({
      slug,
      labelEs,
    })),
  };
}

let cachedCanonicalSlugs: {
  topLevelSlugs: string[];
  subcatSlugsWithLabels: { slug: string; labelEs: string }[];
} | null = null;

function getCanonicalEsSlugs() {
  if (!cachedCanonicalSlugs) {
    cachedCanonicalSlugs = buildAllCanonicalEsSlugs();
  }
  return cachedCanonicalSlugs;
}

const STAGE_AND_HUB_TERM_KEYS: Record<string, string> = {
  'bebes-0-a-12-meses': 'Bebés (0-12 meses)',
  'ninos-1-a-3-anos': 'Niños (1-3 años)',
  'ninos-4-a-6-anos': 'Niños (4-6 años)',
  'ninos-7-a-9-anos': 'Niños (7-9 años)',
  'ninos-10-a-12-anos': 'Preadolescentes (10-12 años)',
  'jovenes-13-a-15-anos': 'Adolescentes (13-15 años)',
  'jovenes-16-a-18-anos': 'Jóvenes (16-18 años)',
  'adultos-mas-de-18-anos': 'Adultos (+18 años)',
  'fiesta-revelacion-genero': 'Fiesta Revelación de Género',
  'motoristas': 'Motoristas',
  'automovil': 'Automóvil',
  'ciclismo': 'Ciclismo y MTB',
  'gaming': 'Gaming y Setup',
  'amantes-del-cafe': 'Amantes del Café',
  'mascotas': 'Mascotas',
  'regalos-menos-20-euros': 'Regalos Menos de 20 Euros',
  'que-regalar-a-un-hombre': 'Qué Regalar a un Hombre',
  'que-regalar-a-una-mujer': 'Qué Regalar a una Mujer',
  'que-regalar-a-mi-novio': 'Qué Regalar a mi Novio',
  'que-regalar-a-mi-novia': 'Qué Regalar a mi Novia',
  'regalos-para-los-que-tienen-de-todo': 'Regalos para los que Tienen de Todo',
};

function computeRawLocalizedTopSlug(lang: string, esSlug: string): string {
  if (lang === 'es') return esSlug;
  if (lang === 'en' || !LATIN_SCRIPT_LOCALES.has(lang)) {
    return EN_TOP_LEVEL_SLUGS[esSlug] || esSlug;
  }

  // 1. Check explicit stage/hub overrides for this language
  const override = NATIVE_STAGE_AND_HUB_OVERRIDES[lang]?.[esSlug];
  if (override) return override;

  // 2. Check specific-year age routes (1 to 18 years)
  const ageRoute = SEO_AGE_ROUTES[esSlug];
  if (ageRoute?.specificYear) {
    const tpl = SPECIFIC_YEAR_TEMPLATES[lang];
    const yr = ageRoute.specificYear;
    if (tpl) {
      if (yr === 1) return tpl.year1;
      if (yr >= 16) return tpl.teens(yr);
      return tpl.kids(yr);
    }
  }

  // 3. Check stage/hub/filter label translation in TERM_TRANSLATIONS[lang]
  const filterMeta = SEO_FILTER_ROUTES[esSlug];
  const termKey = filterMeta?.label || STAGE_AND_HUB_TERM_KEYS[esSlug];
  const dict = getTermTranslations()[lang];
  if (termKey && dict && dict[termKey]) {
    const candidate = asciiSlugify(dict[termKey]);
    if (candidate.length >= 3) return candidate;
  }

  // 4. Fallback to clean English slug
  return EN_TOP_LEVEL_SLUGS[esSlug] || esSlug;
}

function computeRawLocalizedSubcatSlug(lang: string, esSlug: string, labelEs: string): string {
  if (lang === 'es') return esSlug;
  const targetDictLang = LATIN_SCRIPT_LOCALES.has(lang) ? lang : 'en';
  const termsMap = getTermTranslations();
  const dict = termsMap[targetDictLang] || termsMap.en || {};
  const translated = dict[labelEs] || termsMap.en?.[labelEs] || labelEs;
  const candidate = asciiSlugify(translated);
  return candidate.length >= 2 ? candidate : esSlug;
}

function getOrBuildTable(localeKey: string | null | undefined): LocaleSlugTable {
  const lang = getBaseLangKey(localeKey);
  if (SLUG_TABLES_BY_LANG[lang]) {
    return SLUG_TABLES_BY_LANG[lang];
  }

  const { topLevelSlugs: ALL_TOP_LEVEL_ES_SLUGS, subcatSlugsWithLabels: ALL_SUBCAT_ES_ENTRIES } =
    getCanonicalEsSlugs();

  const forward: Record<string, string> = {};
  const reverse: Record<string, string> = { ...ES_SLUG_ALIASES };
  const usedTopLevel = new Set<string>();
  const usedSubcats = new Set<string>();

  // Register all canonical Spanish slugs in reverse first (for 100% backward compatibility)
  for (const esSlug of ALL_TOP_LEVEL_ES_SLUGS) {
    reverse[esSlug] = esSlug;
    const enSlug = EN_TOP_LEVEL_SLUGS[esSlug];
    if (enSlug) reverse[enSlug] = esSlug;
  }
  for (const { slug: esSlug, labelEs } of ALL_SUBCAT_ES_ENTRIES) {
    reverse[esSlug] = esSlug;
    const enSubSlug = computeRawLocalizedSubcatSlug('en', esSlug, labelEs);
    if (enSubSlug) reverse[enSubSlug] = esSlug;
  }

  // Build top-level slug mappings
  for (const esSlug of ALL_TOP_LEVEL_ES_SLUGS) {
    let locSlug = computeRawLocalizedTopSlug(lang, esSlug);
    if (usedTopLevel.has(locSlug) && locSlug !== esSlug) {
      locSlug = `${locSlug}-${esSlug.split('-')[0]}`;
    }
    usedTopLevel.add(locSlug);
    forward[esSlug] = locSlug;
    reverse[locSlug] = esSlug;
  }

  // Build subcategory slug mappings
  for (const { slug: esSlug, labelEs } of ALL_SUBCAT_ES_ENTRIES) {
    let locSlug = computeRawLocalizedSubcatSlug(lang, esSlug, labelEs);
    if ((usedSubcats.has(locSlug) || (usedTopLevel.has(locSlug) && reverse[locSlug] !== esSlug)) && locSlug !== esSlug) {
      locSlug = `${locSlug}-${esSlug.split('-')[0]}`;
    }
    usedSubcats.add(locSlug);
    forward[esSlug] = locSlug;
    reverse[locSlug] = esSlug;
  }

  const table = { forward, reverse };
  SLUG_TABLES_BY_LANG[lang] = table;
  return table;
}

/**
 * Translates a canonical Spanish slug segment into its clean localized slug for `localeKey`.
 */
export function toLocalizedSlug(localeKey: string | null | undefined, esSlug: string): string {
  const canonicalEs = ES_SLUG_ALIASES[esSlug] || esSlug;
  const { forward } = getOrBuildTable(localeKey);
  return forward[canonicalEs] || canonicalEs;
}

/**
 * Resolves a localized (or legacy Spanish/English) slug segment back to its canonical Spanish slug.
 */
export function toBaseEsSlug(localeKey: string | null | undefined, slugSegment: string): string {
  const clean = decodeURIComponent(slugSegment).trim().toLowerCase();
  if (ES_SLUG_ALIASES[clean]) return ES_SLUG_ALIASES[clean];
  const { reverse } = getOrBuildTable(localeKey);
  if (reverse[clean]) return reverse[clean];
  // Also check English table in case an English slug was used on another locale
  const enTable = getOrBuildTable('en');
  if (enTable.reverse[clean]) return enTable.reverse[clean];
  return clean;
}

/**
 * Converts a canonical Spanish path (e.g. `/regalos-para-ninos-de-13-anos` or
 * `/jovenes-13-a-15-anos/papeleria-creativa-y-bullet-journal`) into the full
 * localized URL path with locale prefix and translated slug segments
 * (e.g. `/en/gifts-for-13-year-old-kids`).
 */
export function localizeRoutePath(
  localeKey: string | null | undefined,
  baseEsPath: string = '/'
): string {
  const key = (localeKey || 'es').toLowerCase().trim();
  const raw = baseEsPath.startsWith('/') ? baseEsPath : `/${baseEsPath}`;
  const segments = raw.split('/').filter(Boolean);

  if (segments.length === 0) {
    return key === 'es' ? '/' : `/${key}`;
  }

  // Normalize segments back to canonical ES first in case an already-localized path was passed
  const canonicalEsSegments = segments.map((seg) => toBaseEsSlug(key, seg));
  const localizedSegments = canonicalEsSegments.map((seg) => toLocalizedSlug(key, seg));
  const joined = `/${localizedSegments.join('/')}`;

  return key === 'es' ? joined : `/${key}${joined}`;
}

/**
 * Resolves an array of URL slug segments (from a dynamic Next.js route `[ageSlug]/[categorySlug]`
 * or pathname) back into canonical Spanish slug segments for internal lookup.
 */
export function delocalizeRouteSegments(
  localeKey: string | null | undefined,
  segments: string[]
): string[] {
  return segments.map((seg) => toBaseEsSlug(localeKey, seg));
}
