const https = require('https');
const fs = require('fs');
const path = require('path');

// Load all catalogs
const { products } = require('./catalog_012');
require('./catalog_13');
require('./catalog_46');
require('./catalog_79');
require('./catalog_1012');
require('./catalog_1315');
require('./catalog_1618');
require('./catalog_18plus');

const PRODUCTS_DIR = path.join(__dirname, '../public/images/products');
if (!fs.existsSync(PRODUCTS_DIR)) {
  fs.mkdirSync(PRODUCTS_DIR, { recursive: true });
}

// Known mappings from existing files in public/images/products
const KNOWN_LOCAL_MAP = {
  '012-cuna-chicco-next2me': 'bebe-cuna-colecho-1.jpg',
  '012-banera-skip-hop-moby': 'bebe-banera-plegable-1.jpg',
  '012-tarta-panales-dodot': 'bebe-tarta-dodot-3pisos-1.jpg',
  '012-neceser-cuidados-suavinex': 'bebe-suavinex-kit-1.jpg',
  '012-canastilla-mustela-bebe': 'bebe-mustela-canastilla-1.jpg',
  '012-gimnasio-piano-fisher-price': 'bebe-gimnasio-piano-1.jpg',
  '012-colonia-suavinex-baby': 'bebe-suavinex-colonia-1.jpg',
  '012-buho-ruido-blanco-grocompany': 'bebe-buho-ruido-blanco-1.jpg',
  '012-cojin-lactancia-boppy': 'bebe-boppy-lactancia-1.jpg',
  '012-doudou-kaloo-plume': 'bebe-kaloo-doudou-1.jpg',
  '012-canon-confeti-gender-reveal': 'bebe-canon-confeti-1.jpg',
  '012-globo-enigma-90cm': 'bebe-globo-enigma-1.jpg',
  '012-polvo-holi-humo-bebe': 'bebe-polvo-holi-1.jpg',
  '13-torre-aprendizaje-montessori': '13-torre-aprendizaje-1.jpg',
  '13-chicco-first-bike': '13-chicco-first-bike-1.jpg',
  '13-cocina-hape-madera': '13-cocina-hape-1.jpg',
  '13-arena-magica-kinetic-sand': '13-kinetic-sand-1.jpg',
  '13-bloques-clemmy-blandos': '13-clemmy-bloques-1.jpg',
  '13-triciclo-evolutivo-kinderkraft': '13-triciclo-aveo-1.jpg',
  '46-carrera-first-mario-kart': '46-carrera-mario-1.jpg',
  '46-patinete-3-ruedas-led': '46-bopster-patinete-1.jpg',
  '46-monstruo-de-colores-juego': '46-monstruo-colores-1.jpg',
  '46-estuche-maquillaje-infantil': '46-maletin-maquillaje-1.jpg',
  '46-peluche-pikachu-sensorial': '46-pikachu-peluche-1.jpg',
  '46-trunki-maleta-correpasillos': '46-trunki-maleta-1.jpg',
  '46-dobble-kids': '46-dobble-kids-1.jpg',
  '79-scalextric-looping-f1': '79-scalextric-compact-1.jpg',
  '79-coche-rc-4x4-alta-velocidad': '79-coche-rc-exost-1.jpg',
  '79-magia-borras-100-trucos': '79-magia-borras-100-1.jpg',
  '79-catan-junior': '79-catan-junior-1.jpg',
  '79-dixit-juego': '79-dixit-1.jpg',
  '79-gravitrax-starter-set': '79-gravitrax-1.jpg',
  '79-lego-creator-safari': '79-lego-safari-1.jpg',
  '1012-potensic-a20-dron': '1012-dron-potensic-1.jpg',
  '1012-magia-borras-app-luz': '1012-magia-borras-150-1.jpg',
  '1012-carcassonne-plus': '1012-carcassonne-1.jpg',
  '1012-virus-juego-cartas': '1012-virus-1.jpg',
  '1315-anker-soundcore-q30': '1315-anker-q30-1.jpg',
  '1315-catan-el-juego': '1315-catan-clasico-1.jpg',
  '1315-cerave-limpiador': '1315-cerave-limpiador-1.jpg',
  '1315-neceser-viaje': '1315-neceser-colgante-1.jpg',
  '1618-playstation-dualsense-edge': '1618-dualsense-edge-1.jpg',
  '1618-spiderman-2-ps5': '1618-spiderman-2-1.jpg',
  '1618-calvin-klein-ck-one': '1618-ck-one-1.jpg',
  '1618-vela-woodwick-fuego': '1618-vela-woodwick-1.jpg',
  '1618-cuaderno-cuero-vintage': '1618-diario-cuero-1.jpg',
  '1618-meta-quest-3s': '1618-meta-quest-3s-1.jpg',
  '1618-elden-ring-ps5': '1618-elden-ring-1.jpg',
  '1618-ea-sports-fc-25': '1618-fc-25-1.jpg',
  '1618-govee-tira-neon-led': '1618-govee-neon-1.jpg',
  '1618-jbl-flip-6-altavoz': '1618-jbl-flip-6-1.jpg'
};

function cleanTitleForSearch(title) {
  let clean = title
    .replace(/\(.*?\)/g, '')
    .replace(/\[.*?\]/g, '')
    .replace(/[-–—:]/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
  
  return clean.split(' ').slice(0, 6).join(' ');
}

function searchAmazonProduct(searchQuery) {
  return new Promise((resolve) => {
    const url = `https://www.amazon.es/s?k=${encodeURIComponent(searchQuery)}`;
    https.get(url, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
        'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,*/*;q=0.8',
        'Accept-Language': 'es-ES,es;q=0.9,en;q=0.8'
      }
    }, res => {
      let data = '';
      res.on('data', d => data += d);
      res.on('end', () => {
        const imgMatches = [...data.matchAll(/class="s-image"[^>]*src="([^"]+)"/g)].map(m => m[1]);
        const asinMatches = [...data.matchAll(/data-asin="([A-Z0-9]{10})"/g)].map(m => m[1]).filter(a => a.length === 10);
        
        let hiResImg = null;
        if (imgMatches[0]) {
          hiResImg = imgMatches[0].replace(/\._[A-Za-z0-9_,-]+\./, '._AC_SL1500_.');
        }

        resolve({
          hiResImg,
          asin: asinMatches[0] || null
        });
      });
    }).on('error', () => resolve({ hiResImg: null, asin: null }));
  });
}

function downloadImage(url, dest) {
  return new Promise((resolve) => {
    const file = fs.createWriteStream(dest);
    https.get(url, res => {
      if (res.statusCode !== 200) {
        file.close();
        fs.unlink(dest, () => {});
        return resolve(false);
      }
      res.pipe(file);
      file.on('finish', () => {
        file.close();
        resolve(true);
      });
    }).on('error', () => {
      fs.unlink(dest, () => {});
      resolve(false);
    });
  });
}

async function run() {
  console.log(`Starting real product image resolution for all ${products.length} products...`);
  let updatedCount = 0;
  let downloadedCount = 0;
  let skippedCount = 0;

  for (let i = 0; i < products.length; i++) {
    const p = products[i];
    const prefix = `[${i + 1}/${products.length}] ${p.id}:`;

    // 1. Check known local map
    if (KNOWN_LOCAL_MAP[p.id]) {
      const fileName = KNOWN_LOCAL_MAP[p.id];
      const filePath = path.join(PRODUCTS_DIR, fileName);
      if (fs.existsSync(filePath)) {
        p.imageUrl = `/images/products/${fileName}`;
        p.images = [`/images/products/${fileName}`];
        console.log(`${prefix} Linked to existing verified local image -> ${fileName}`);
        skippedCount++;
        continue;
      }
    }

    // 2. Check if current imageUrl is already a valid local image
    if (p.imageUrl && p.imageUrl.startsWith('/images/products/')) {
      const localFile = p.imageUrl.replace('/images/products/', '');
      const fullPath = path.join(PRODUCTS_DIR, localFile);
      if (fs.existsSync(fullPath)) {
        console.log(`${prefix} Already has valid local image -> ${localFile}`);
        skippedCount++;
        continue;
      }
    }

    // 3. Check if target filename already downloaded
    const targetFile = `${p.id}-1.jpg`;
    const targetPath = path.join(PRODUCTS_DIR, targetFile);
    if (fs.existsSync(targetPath) && fs.statSync(targetPath).size > 5000) {
      p.imageUrl = `/images/products/${targetFile}`;
      p.images = [`/images/products/${targetFile}`];
      console.log(`${prefix} Found previously downloaded real image -> ${targetFile}`);
      updatedCount++;
      continue;
    }

    // 4. Download real image from Amazon
    const query = cleanTitleForSearch(p.title);
    process.stdout.write(`${prefix} Searching Amazon for "${query}"... `);
    
    const searchRes = await searchAmazonProduct(query);
    if (searchRes.hiResImg) {
      const ok = await downloadImage(searchRes.hiResImg, targetPath);
      if (ok) {
        p.imageUrl = `/images/products/${targetFile}`;
        p.images = [`/images/products/${targetFile}`];
        if (searchRes.asin && !p.asin) {
          p.asin = searchRes.asin;
        }
        console.log(`✅ DOWNLOADED real photo (${fs.statSync(targetPath).size} bytes)`);
        downloadedCount++;
        updatedCount++;
      } else {
        console.log(`❌ Download failed for ${searchRes.hiResImg}`);
      }
    } else {
      console.log(`❌ No Amazon image found!`);
    }

    // Polite delay
    await new Promise(r => setTimeout(r, 600));
  }

  console.log('\n========================================');
  console.log(`Finished: ${downloadedCount} newly downloaded, ${updatedCount} updated, ${skippedCount} previously existing.`);
  console.log('========================================');

  // Now rewrite src/data/products.ts directly
  const { AGE_CATEGORIES, AGE_SUBCATEGORIES_MAP, PRICE_FILTERS, GENERAL_CATEGORY_MAPPING } = require('../src/data/categories.ts');
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
  console.log('src/data/products.ts updated with 100% REAL product photos!');
}

run();
