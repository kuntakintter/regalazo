const https = require('https');

function searchAmazon(query) {
  return new Promise((resolve) => {
    const url = 'https://www.amazon.es/s?k=' + encodeURIComponent(query);
    const req = https.get(url, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36',
        'Accept-Language': 'es-ES,es;q=0.9',
        'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8'
      }
    }, res => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => {
        const regex = /data-asin="([B0-9A-Z]{10})"/g;
        const asins = [];
        let match;
        while ((match = regex.exec(data)) !== null) {
          if (match[1] && match[1].length === 10 && match[1].startsWith('B')) {
            asins.push(match[1]);
          }
        }
        resolve({ query, statusCode: res.statusCode, asins: [...new Set(asins)].slice(0, 5) });
      });
    });
    req.on('error', (err) => resolve({ query, error: err.message }));
  });
}

async function run() {
  const queries = [
    'iPhone 16 Pro',
    'iPhone 16',
    'iPhone 15',
    'Samsung Galaxy S24 Ultra',
    'Samsung Galaxy S24',
    'Samsung Galaxy A55 5G',
    'Xiaomi 14',
    'Xiaomi Redmi Note 13 Pro',
    'Google Pixel 9 Pro',
    'Google Pixel 8a',
    'OPPO Reno12 Pro 5G',
    'HONOR Magic6 Pro',
    'HUAWEI Pura 70'
  ];
  for (const q of queries) {
    const res = await searchAmazon(q);
    console.log(JSON.stringify(res));
    await new Promise(r => setTimeout(r, 600));
  }
}
run();
