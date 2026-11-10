import { Product } from '@/data/products';

const KID_AGES = new Set(['0-12m', '1-3', '4-6', '7-9', '10-12']);

export function isAdultOrTeenProduct(p: Product): boolean {
  return !KID_AGES.has(p.ageRange);
}

export function matchesPersonaCategoryTab(p: Product, tabId: string): boolean {
  if (!tabId || tabId === 'all') return true;
  const text = `${p.category || ''} ${p.subcategory || ''} ${p.title || ''} ${p.description || ''} ${p.searchQuery || ''}`.toLowerCase();

  switch (tabId) {
    case 'tech':
      return (
        text.includes('tecnolog') ||
        text.includes('smartphone') ||
        text.includes('auricular') ||
        text.includes('proyector') ||
        text.includes('altavoz') ||
        text.includes('instax') ||
        text.includes('cámara') ||
        text.includes('camara') ||
        text.includes('kindle') ||
        text.includes('dron') ||
        text.includes('drone') ||
        text.includes('cargador') ||
        text.includes('smartwatch') ||
        text.includes('reloj') ||
        text.includes('lámpara') ||
        text.includes('lampara') ||
        text.includes('dashcam') ||
        text.includes('arrancador') ||
        text.includes('garmin') ||
        text.includes('tractive')
      );
    case 'gaming':
      return (
        text.includes('gaming') ||
        text.includes('videojuego') ||
        text.includes('gta') ||
        text.includes('ps5') ||
        text.includes('playstation') ||
        text.includes('switch') ||
        text.includes('nintendo') ||
        text.includes('xbox') ||
        text.includes('logitech') ||
        text.includes('hyperx') ||
        text.includes('razer') ||
        text.includes('mando') ||
        text.includes('setup')
      );
    case 'gourmet':
      return (
        text.includes('gourmet') ||
        text.includes('café') ||
        text.includes('cafe') ||
        text.includes('cafeter') ||
        text.includes('barista') ||
        text.includes('molinillo') ||
        text.includes('bialetti') ||
        text.includes('timemore') ||
        text.includes('hario') ||
        text.includes('stanley') ||
        text.includes('coctel') ||
        text.includes('cóctel') ||
        text.includes('termo') ||
        text.includes('taza')
      );
    case 'perfume':
      return (
        text.includes('perfum') ||
        text.includes('colonia') ||
        text.includes('fragancia') ||
        text.includes('eau de') ||
        text.includes('skincare') ||
        text.includes('sol de janeiro') ||
        text.includes('paula') ||
        text.includes('cosrx') ||
        text.includes('sérum') ||
        text.includes('serum') ||
        text.includes('crema') ||
        text.includes('mascarilla') ||
        text.includes('dior') ||
        text.includes('ysl')
      );
    case 'experiences':
      return (
        text.includes('smartbox') ||
        text.includes('escapada') ||
        text.includes('experiencia') ||
        text.includes('spa') ||
        text.includes('hotel') ||
        text.includes('cena') ||
        text.includes('bienestar') ||
        text.includes('masaje')
      );
    case 'fashion':
      return (
        text.includes('moda') ||
        text.includes('ropa') ||
        text.includes('joya') ||
        text.includes('joyero') ||
        text.includes('pendiente') ||
        text.includes('collar') ||
        text.includes('bolso') ||
        text.includes('cartera') ||
        text.includes('mochila') ||
        text.includes('zapatilla') ||
        text.includes('sudadera') ||
        text.includes('gafas')
      );
    case 'books':
      return (
        text.includes('libro') ||
        text.includes('novela') ||
        text.includes('manga') ||
        text.includes('cómic') ||
        text.includes('comic') ||
        text.includes('diario') ||
        text.includes('journal') ||
        text.includes('lectura') ||
        text.includes('cuaderno') ||
        text.includes('vela') ||
        text.includes('woodwick') ||
        text.includes('manta') ||
        text.includes('café') ||
        text.includes('cafe')
      );
    case 'games':
      return (
        text.includes('juego') ||
        text.includes('mesa') ||
        text.includes('cartas') ||
        text.includes('virus') ||
        text.includes('catan') ||
        text.includes('uno') ||
        text.includes('puzzle') ||
        text.includes('escape') ||
        text.includes('guatafac') ||
        text.includes('ajedrez') ||
        text.includes('dobble')
      );
    case 'beauty':
      return (
        text.includes('skincare') ||
        text.includes('perfum') ||
        text.includes('colonia') ||
        text.includes('vela') ||
        text.includes('woodwick') ||
        text.includes('difusor') ||
        text.includes('cosrx') ||
        text.includes('sérum') ||
        text.includes('hogar') ||
        text.includes('manta') ||
        text.includes('joyero') ||
        text.includes('cuidado')
      );
    case 'pokemon':
      return (
        text.includes('pokemon') ||
        text.includes('pokémon') ||
        text.includes('figura') ||
        text.includes('funko') ||
        text.includes('dragon ball') ||
        text.includes('one piece') ||
        text.includes('naruto') ||
        text.includes('coleccion') ||
        text.includes('colección')
      );
    case 'lego':
      return (
        text.includes('lego') ||
        text.includes('construcc') ||
        text.includes('maqueta') ||
        text.includes('botánic') ||
        text.includes('botanic') ||
        text.includes('icons')
      );
    default:
      return true;
  }
}
