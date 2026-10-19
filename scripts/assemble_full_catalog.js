const fs = require('fs');
const path = require('path');

const { AGE_CATEGORIES, AGE_SUBCATEGORIES_MAP, PRICE_FILTERS, GENERAL_CATEGORY_MAPPING } = require('../src/data/categories.ts');
const { products } = require('./catalog_012');
require('./catalog_13');
require('./catalog_46');
require('./catalog_79');
require('./catalog_1012');
require('./catalog_1315');
require('./catalog_1618');
require('./catalog_18plus');
require('./catalog_smartphones');

console.log(`Total assembled products: ${products.length}`);

// Validation: Check that every age and subcategory has at least 3 products!
for (const [ageId, subcats] of Object.entries(AGE_SUBCATEGORIES_MAP)) {
  if (ageId === 'all') continue;
  for (const sub of subcats) {
    const count = products.filter(p => {
      if (ageId === 'reveal') return p.subcategory === sub;
      return p.ageRange === ageId && p.subcategory === sub;
    }).length;
    console.log(`[${ageId}] "${sub}": ${count} products`);
    if (count < 3) {
      console.warn(`WARNING: Underpopulated subcategory [${ageId}] "${sub}" has only ${count} products!`);
    }
  }
}

// Write src/data/products.ts
const code = `// ============================================================================
// CATÁLOGO COMPLETO DE PRODUCTOS VERIFICADOS - REGALAZO 2026
// Afiliación oficial con Amazon España (tag: vapegadgets22-21)
// ============================================================================

import { AGE_CATEGORIES, AGE_SUBCATEGORIES_MAP, PRICE_FILTERS, GENERAL_CATEGORY_MAPPING, AgeCategoryMeta } from './categories';

export const AMAZON_AFFILIATE_TAG = 'vapegadgets22-21';

export { AGE_CATEGORIES, AGE_SUBCATEGORIES_MAP, PRICE_FILTERS, GENERAL_CATEGORY_MAPPING };
export type { AgeCategoryMeta };

export interface Product {
  id: string;
  title: string;
  slug: string;
  searchQuery: string;
  asin?: string;
  category: string;
  subcategory: string;
  ageRange: '0-12m' | '1-3' | '4-6' | '7-9' | '10-12' | '13-15' | '16-18' | '+18';
  gender: 'unisex' | 'girl' | 'boy';
  priceRange: '<20' | '20-50' | '50-100' | '>100';
  priceText: string;
  rating: number;
  reviewsCount: number;
  badge: string;
  badgeColor?: string;
  description: string;
  pros: string[];
  idealFor: string;
  style: 'baby' | 'kids' | 'gamer' | 'emo' | 'tech' | 'creativity' | 'classic';
  imageUrl: string;
  images?: string[];
}

export const PRODUCTS: Product[] = ${JSON.stringify(products, null, 2)};
`;

fs.writeFileSync(path.join(__dirname, '../src/data/products.ts'), code, 'utf8');
console.log('src/data/products.ts successfully generated and updated!');
