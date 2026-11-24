import { PRODUCTS, Product } from './products';
import { COMPETICION_PRODUCTS } from './competicionData';
import { AUTOMOVIL_PRODUCTS } from './automovilData';
import { CAFE_PRODUCTS } from './cafeData';
import { CICLISMO_PRODUCTS } from './ciclismoData';
import { GAMING_PRODUCTS } from './gamingData';
import { GTA_PRODUCTS } from './gtaData';
import { MASCOTAS_PRODUCTS } from './mascotasData';
import { MOTORISTA_PRODUCTS } from './motoristasData';
import { NAVIDAD_PRODUCTS } from './navidadData';
import { HALLOWEEN_PRODUCTS } from './halloweenData';
import { REACONDICIONADOS_PRODUCTS } from './reacondicionadosData';
import { VERIFIED_BLACK_FRIDAY_DEALS } from './blackFridayDeals';

interface NicheItemLike {
  id: string;
  asin?: string;
  title: string;
  category: string;
  categoryLabel?: string;
  priceText: string;
  priceNumeric?: number;
  rating: number;
  reviewsCount: number;
  imageUrl: string;
  badge: string;
  description: string;
  pros: string[];
  idealFor: string;
  searchQuery: string;
}

function getPriceRange(price: number): '<20' | '20-50' | '50-100' | '>100' {
  if (price < 20) return '<20';
  if (price <= 50) return '20-50';
  if (price <= 100) return '50-100';
  return '>100';
}

function adaptNicheProduct(item: NicheItemLike, hubLabel: string): Product {
  const num =
    item.priceNumeric ??
    (parseFloat(item.priceText.replace(/[^0-9,.]/g, '').replace(',', '.')) || 25);

  return {
    id: item.id,
    title: item.title,
    slug: item.id,
    searchQuery: `${item.searchQuery} ${hubLabel}`,
    asin: item.asin,
    category: hubLabel,
    subcategory: item.categoryLabel || item.category,
    ageRange: '+18',
    gender: 'unisex',
    priceRange: getPriceRange(num),
    priceText: item.priceText,
    rating: item.rating,
    reviewsCount: item.reviewsCount,
    badge: item.badge,
    description: item.description,
    pros: item.pros,
    idealFor: item.idealFor,
    style: 'classic',
    imageUrl: item.imageUrl,
  };
}

// Unified deduplicated catalog across all site hubs and age guides
const buildAllSiteProducts = (): Product[] => {
  const seenIds = new Set<string>();
  const seenAsins = new Set<string>();
  const unified: Product[] = [];

  const pushUnique = (prod: Product) => {
    if (seenIds.has(prod.id)) return;
    if (prod.asin && seenAsins.has(prod.asin)) return;
    seenIds.add(prod.id);
    if (prod.asin) seenAsins.add(prod.asin);
    unified.push(prod);
  };

  for (const p of PRODUCTS) pushUnique(p);
  for (const p of COMPETICION_PRODUCTS) pushUnique(adaptNicheProduct(p, 'Competición & Motor'));
  for (const p of NAVIDAD_PRODUCTS) pushUnique(adaptNicheProduct(p, 'Navidad y Reyes'));
  for (const p of GTA_PRODUCTS) pushUnique(adaptNicheProduct(p, 'GTA 6 / GTA VI'));
  for (const p of MOTORISTA_PRODUCTS) pushUnique(adaptNicheProduct(p, 'Motoristas'));
  for (const p of GAMING_PRODUCTS) pushUnique(adaptNicheProduct(p, 'Gaming'));
  for (const p of CAFE_PRODUCTS) pushUnique(adaptNicheProduct(p, 'Amantes del Café'));
  for (const p of MASCOTAS_PRODUCTS) pushUnique(adaptNicheProduct(p, 'Mascotas'));
  for (const p of AUTOMOVIL_PRODUCTS) pushUnique(adaptNicheProduct(p, 'Automóvil'));
  for (const p of CICLISMO_PRODUCTS) pushUnique(adaptNicheProduct(p, 'Ciclismo'));
  for (const p of HALLOWEEN_PRODUCTS) pushUnique(adaptNicheProduct(p, 'Halloween'));
  for (const r of REACONDICIONADOS_PRODUCTS) {
    pushUnique(
      adaptNicheProduct(
        {
          id: r.id,
          asin: r.asin,
          title: r.title,
          category: r.category,
          categoryLabel: r.categoryLabel,
          priceText: r.priceText,
          priceNumeric: r.priceNumeric,
          rating: r.rating,
          reviewsCount: r.reviewsCount,
          imageUrl: r.imageUrl,
          badge: r.warrantyBadge,
          description: r.description,
          pros: r.pros,
          idealFor: r.idealFor,
          searchQuery: `${r.title} reacondicionado reacondicionados segunda mano con garantia amazon renewed refurbished`,
        },
        'Reacondicionados'
      )
    );
  }
  for (const bf of VERIFIED_BLACK_FRIDAY_DEALS) {
    pushUnique(
      adaptNicheProduct(
        {
          id: bf.asin,
          asin: bf.asin,
          title: bf.title,
          category: bf.categoryId,
          categoryLabel: 'Black Friday',
          priceText: bf.priceText,
          priceNumeric: bf.priceNumeric,
          rating: bf.rating,
          reviewsCount: bf.reviewsCount,
          imageUrl: bf.imageUrl,
          badge: bf.dealBadge,
          description: bf.title,
          pros: [`-${bf.discountPercent}% Descuento Real`, `Antes ${bf.originalPriceText}`],
          idealFor: `Ahorras ${bf.savingsText} en Black Friday`,
          searchQuery: `${bf.title} black friday oferta chollo descuento`,
        },
        'Black Friday'
      )
    );
  }

  return unified;
};

export const ALL_SITE_PRODUCTS: Product[] = buildAllSiteProducts();

// Map by ID (without ASIN deduplication so any specific product ID added to voting resolves)
const buildIdLookupMap = (): Map<string, Product> => {
  const map = new Map<string, Product>();
  for (const p of PRODUCTS) map.set(p.id, p);
  for (const p of COMPETICION_PRODUCTS) if (!map.has(p.id)) map.set(p.id, adaptNicheProduct(p, 'Competición & Motor'));
  for (const p of NAVIDAD_PRODUCTS) if (!map.has(p.id)) map.set(p.id, adaptNicheProduct(p, 'Navidad y Reyes'));
  for (const p of GTA_PRODUCTS) if (!map.has(p.id)) map.set(p.id, adaptNicheProduct(p, 'GTA 6 / GTA VI'));
  for (const p of MOTORISTA_PRODUCTS) if (!map.has(p.id)) map.set(p.id, adaptNicheProduct(p, 'Motoristas'));
  for (const p of GAMING_PRODUCTS) if (!map.has(p.id)) map.set(p.id, adaptNicheProduct(p, 'Gaming'));
  for (const p of CAFE_PRODUCTS) if (!map.has(p.id)) map.set(p.id, adaptNicheProduct(p, 'Amantes del Café'));
  for (const p of MASCOTAS_PRODUCTS) if (!map.has(p.id)) map.set(p.id, adaptNicheProduct(p, 'Mascotas'));
  for (const p of AUTOMOVIL_PRODUCTS) if (!map.has(p.id)) map.set(p.id, adaptNicheProduct(p, 'Automóvil'));
  for (const p of CICLISMO_PRODUCTS) if (!map.has(p.id)) map.set(p.id, adaptNicheProduct(p, 'Ciclismo'));
  for (const p of HALLOWEEN_PRODUCTS) if (!map.has(p.id)) map.set(p.id, adaptNicheProduct(p, 'Halloween'));
  for (const r of REACONDICIONADOS_PRODUCTS) {
    if (!map.has(r.id)) {
      map.set(
        r.id,
        adaptNicheProduct(
          {
            id: r.id,
            asin: r.asin,
            title: r.title,
            category: r.category,
            categoryLabel: r.categoryLabel,
            priceText: r.priceText,
            priceNumeric: r.priceNumeric,
            rating: r.rating,
            reviewsCount: r.reviewsCount,
            imageUrl: r.imageUrl,
            badge: r.warrantyBadge,
            description: r.description,
            pros: r.pros,
            idealFor: r.idealFor,
            searchQuery: r.title,
          },
          'Reacondicionados'
        )
      );
    }
  }
  for (const bf of VERIFIED_BLACK_FRIDAY_DEALS) {
    if (!map.has(bf.asin)) {
      map.set(
        bf.asin,
        adaptNicheProduct(
          {
            id: bf.asin,
            asin: bf.asin,
            title: bf.title,
            category: bf.categoryId,
            categoryLabel: 'Black Friday',
            priceText: bf.priceText,
            priceNumeric: bf.priceNumeric,
            rating: bf.rating,
            reviewsCount: bf.reviewsCount,
            imageUrl: bf.imageUrl,
            badge: bf.dealBadge,
            description: bf.title,
            pros: [`-${bf.discountPercent}% Descuento Real`, `Antes ${bf.originalPriceText}`],
            idealFor: `Ahorras ${bf.savingsText} en Black Friday`,
            searchQuery: bf.title,
          },
          'Black Friday'
        )
      );
    }
  }
  return map;
};

const PRODUCT_ID_MAP = buildIdLookupMap();

export function findProductById(id: string): Product | undefined {
  return PRODUCT_ID_MAP.get(id);
}
