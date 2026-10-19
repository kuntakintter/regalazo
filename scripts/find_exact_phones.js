const https = require('https');

function searchTitle(q) {
  return new Promise(resolve => {
    https.get('https://www.amazon.es/s?k=' + encodeURIComponent(q), {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36',
        'Accept-Language': 'es-ES,es;q=0.9'
      }
    }, res => {
      let data = '';
      res.on('data', c => data += c);
      res.on('end', () => {
        const regex = /data-asin="([B0-9A-Z]{10})"[\s\S]*?<h2[^>]*>([\s\S]*?)<\/h2>/g;
        let match;
        const results = [];
        while ((match = regex.exec(data)) !== null && results.length < 8) {
          const asin = match[1];
          const title = match[2].replace(/<[^>]+>/g, '').trim();
          if (asin && asin.length === 10 && asin.startsWith('B') && !results.some(r => r.asin === asin)) {
            results.push({ asin, title });
          }
        }
        resolve({ q, results });
      });
    });
  });
}

async function main() {
  const qs = [
    'Apple iPhone 16 Pro 128 GB Titanio',
    'Apple iPhone 15 128 GB',
    'Google Pixel 9 128GB',
    'Google Pixel 8a 128 GB',
    'OPPO Reno12 Pro 5G 512GB'
  ];
  for (const q of qs) {
    const res = await searchTitle(q);
    console.log('Query:', q);
    res.results.forEach(r => console.log('  ', r.asin, '->', r.title.slice(0, 80)));
    await new Promise(r => setTimeout(r, 600));
  }
}
main();
