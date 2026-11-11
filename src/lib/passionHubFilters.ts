import { slugify } from '@/lib/seoRoutes';
import {
  AUTOMOVIL_CATEGORIES,
  AUTOMOVIL_PRODUCTS,
} from '@/data/automovilData';
import { CAFE_CATEGORIES, CAFE_HUB_PRODUCTS } from '@/data/cafeData';
import { CICLISMO_CATEGORIES, CICLISMO_PRODUCTS } from '@/data/ciclismoData';
import { GAMING_CATEGORIES, GAMING_PRODUCTS } from '@/data/gamingData';
import { GTA_CATEGORIES, GTA_PRODUCTS } from '@/data/gtaData';
import { HALLOWEEN_CATEGORIES, HALLOWEEN_PRODUCTS } from '@/data/halloweenData';
import { MASCOTAS_CATEGORIES, MASCOTAS_PRODUCTS } from '@/data/mascotasData';
import { MOTORISTA_CATEGORIES, MOTORISTA_PRODUCTS } from '@/data/motoristasData';
import { NAVIDAD_CATEGORIES, NAVIDAD_PRODUCTS } from '@/data/navidadData';

export interface PassionHubFilterItem {
  hubSlug: string;
  id: string;
  slug: string;
  label: string;
  icon: string;
}

export interface PassionProductItem {
  id: string;
  title: string;
  category: string;
  priceText?: string;
  priceNumeric?: number;
  imageUrl: string;
}

const RAW_HUB_CATEGORIES: Record<
  string,
  { id: string; label: string; icon: string }[]
> = {
  'motoristas': MOTORISTA_CATEGORIES,
  'automovil': AUTOMOVIL_CATEGORIES,
  'ciclismo': CICLISMO_CATEGORIES,
  'gaming': GAMING_CATEGORIES,
  'amantes-del-cafe': CAFE_CATEGORIES,
  'mascotas': MASCOTAS_CATEGORIES,
  'halloween': HALLOWEEN_CATEGORIES,
  'navidad': NAVIDAD_CATEGORIES,
  'regalos-gta-6': GTA_CATEGORIES,
};

export const PASSION_HUB_PRODUCTS_MAP: Record<string, PassionProductItem[]> = {
  'motoristas': MOTORISTA_PRODUCTS,
  'automovil': AUTOMOVIL_PRODUCTS,
  'ciclismo': CICLISMO_PRODUCTS,
  'gaming': GAMING_PRODUCTS,
  'amantes-del-cafe': CAFE_HUB_PRODUCTS,
  'mascotas': MASCOTAS_PRODUCTS,
  'halloween': HALLOWEEN_PRODUCTS,
  'navidad': NAVIDAD_PRODUCTS,
  'regalos-gta-6': GTA_PRODUCTS,
};

export const PASSION_HUB_FILTERS_MAP: Record<string, PassionHubFilterItem[]> =
  Object.fromEntries(
    Object.entries(RAW_HUB_CATEGORIES).map(([hubSlug, cats]) => [
      hubSlug,
      cats
        .filter((c) => c.id !== 'all')
        .map((c) => ({
          hubSlug,
          id: c.id,
          slug: slugify(c.label),
          label: c.label,
          icon: c.icon,
        })),
    ])
  );

export function getPassionHubFilterList(hubSlug: string): PassionHubFilterItem[] {
  return PASSION_HUB_FILTERS_MAP[hubSlug] || [];
}

export function resolvePassionHubFilter(
  hubSlug: string,
  filterSlug: string
): PassionHubFilterItem | undefined {
  const list = PASSION_HUB_FILTERS_MAP[hubSlug];
  if (!list) return undefined;
  return list.find((item) => item.slug === filterSlug || item.id === filterSlug);
}

export function getPassionHubFilterProducts(
  hubSlug: string,
  categoryId: string
): PassionProductItem[] {
  const pool = PASSION_HUB_PRODUCTS_MAP[hubSlug] || [];
  return pool.filter((p) => p.category === categoryId);
}
