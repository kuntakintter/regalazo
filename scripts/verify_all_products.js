const fs = require('fs');
const https = require('https');

function verifyUrl(url) {
  return new Promise((resolve) => {
    if (url.startsWith('/')) {
      const exists = fs.existsSync('public' + url);
      return resolve(exists ? 200 : 404);
    }
    https.get(url, (res) => {
      resolve(res.statusCode);
    }).on('error', () => resolve(500));
  });
}

async function main() {
  const content = fs.readFileSync('src/data/products.ts', 'utf8');
  const match = content.match(/export const PRODUCTS: Product\[\] = (\[[\s\S]*?\]);\s*\n/);
  const list = JSON.parse(match[1]);

  console.log(`Checking all ${list.length} products in products.ts...`);
  const broken = [];

  for (let i = 0; i < list.length; i++) {
    const p = list[i];
    const status = await verifyUrl(p.imageUrl);
    if (status !== 200) {
      console.log(`[FAIL ${status}] ${p.id}: ${p.imageUrl}`);
      broken.push(p);
    }
  }

  console.log(`\nFinished check. Total broken: ${broken.length} / ${list.length}`);
}

main();
