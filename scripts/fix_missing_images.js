const fs = require('fs');
const https = require('https');

function fetchAmazonProductImageAndAsin(query) {
  return new Promise((resolve) => {
    const searchUrl = 'https://www.amazon.es/s?k=' + encodeURIComponent(query);
    const req = https.get(
      searchUrl,
      {
        headers: {
          'User-Agent':
            'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36',
          'Accept-Language': 'es-ES,es;q=0.9',
          Accept: 'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,*/*;q=0.8',
        },
      },
      (res) => {
        const chunks = [];
        res.on('data', (c) => chunks.push(c));
        res.on('end', () => {
          const data = Buffer.concat(chunks).toString('utf-8');
          const blocks = data.split('data-asin="').slice(1);
          for (const b of blocks) {
            const asin = b.substring(0, 10);
            if (!asin || !asin.startsWith('B')) continue;
            const imgMatch = b.match(/src="(https:\/\/m\.media-amazon\.com\/images\/I\/[^"]+\.jpg)"/);
            if (imgMatch) {
              return resolve({ asin, imageUrl: imgMatch[1] });
            }
          }
          resolve(null);
        });
      }
    );
    req.on('error', () => resolve(null));
  });
}

async function run() {
  const filePath = 'src/data/products.ts';
  const content = fs.readFileSync(filePath, 'utf8');
  const match = content.match(/export const PRODUCTS: Product\[\] = (\[[\s\S]*?\]);\s*\n/);
  if (!match) {
    console.error('Could not find PRODUCTS array');
    return;
  }

  const list = JSON.parse(match[1]);
  const missing = list.filter((p) => !p.imageUrl || p.imageUrl.trim() === '');
  console.log(`Found ${missing.length} products with missing imageUrl.`);

  for (let i = 0; i < missing.length; i++) {
    const p = missing[i];
    console.log(`[${i + 1}/${missing.length}] Fetching for: ${p.title.substring(0, 50)}...`);
    const q = p.searchQuery || p.title;
    const result = await fetchAmazonProductImageAndAsin(q);
    if (result) {
      console.log(`   -> Found ASIN ${result.asin}, Img: ${result.imageUrl.substring(0, 60)}...`);
      p.imageUrl = result.imageUrl;
      p.images = [result.imageUrl];
      if (!p.asin) p.asin = result.asin;
    } else {
      console.log(`   -> No image found directly, trying simpler title...`);
      const simpleQ = p.title.split('-')[0].trim();
      const res2 = await fetchAmazonProductImageAndAsin(simpleQ);
      if (res2) {
        console.log(`   -> Found fallback ASIN ${res2.asin}`);
        p.imageUrl = res2.imageUrl;
        p.images = [res2.imageUrl];
        if (!p.asin) p.asin = res2.asin;
      } else {
        console.warn(`   -> WARNING: Could not find image for ${p.id}`);
      }
    }
    // Small pause to be polite
    await new Promise((r) => setTimeout(r, 400));
  }

  // Check if any still missing
  const stillMissing = list.filter((p) => !p.imageUrl || p.imageUrl.trim() === '');
  console.log(`Still missing: ${stillMissing.length}`);

  // Re-serialize formatted
  const newContent = content.replace(
    /export const PRODUCTS: Product\[\] = \[[\s\S]*?\];\s*\n/,
    'export const PRODUCTS: Product[] = ' + JSON.stringify(list, null, 2) + ';\n'
  );

  fs.writeFileSync(filePath, newContent, 'utf8');
  console.log('Successfully updated src/data/products.ts!');
}

run();
