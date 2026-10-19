const https = require('https');

const candidates = [
  { brand: 'Apple', name: 'iPhone 16 Pro', asins: ['B0D6R1WXWL', 'B0DHYFYZ5K', 'B0DGJJXBM5'] },
  { brand: 'Apple', name: 'iPhone 16', asins: ['B0DGJJXBM5', 'B0DHYG26HH'] },
  { brand: 'Apple', name: 'iPhone 15', asins: ['B0CP7P4RRQ', 'B0CVJ5FCK9'] },
  { brand: 'Samsung', name: 'Samsung Galaxy S24 Ultra', asins: ['B0CNQ5WD9K', 'B0D2P4Z9XY'] },
  { brand: 'Samsung', name: 'Samsung Galaxy S24', asins: ['B0D6CP3VX5', 'B0D6C3JVZY'] },
  { brand: 'Samsung', name: 'Samsung Galaxy A55 5G', asins: ['B0CVQ9ZHPP', 'B0F1FRL5HX'] },
  { brand: 'Xiaomi', name: 'Xiaomi 14', asins: ['B0DJPCPFKJ', 'B0CWKVN3JT'] },
  { brand: 'Xiaomi', name: 'Xiaomi Redmi Note 13 Pro+ 5G', asins: ['B0CPPZRQJK'] },
  { brand: 'Google', name: 'Google Pixel 9 Pro', asins: ['B0H62T8RPM', 'B0H62RSWBK'] },
  { brand: 'Google', name: 'Google Pixel 8a', asins: ['B0D37N4577'] },
  { brand: 'OPPO', name: 'OPPO Reno12 Pro 5G', asins: ['B0D5DC933P', 'B0D5DDTWZ3'] },
  { brand: 'HONOR', name: 'HONOR Magic6 Pro 5G', asins: ['B0CW9Q16J4'] },
  { brand: 'HUAWEI', name: 'HUAWEI Pura 70', asins: ['B0D22HGP4R', 'B0D22HHYVP'] }
];

function fetchAsin(asin) {
  return new Promise((resolve) => {
    const url = 'https://www.amazon.es/dp/' + asin;
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
        if (res.statusCode !== 200) {
          return resolve({ asin, statusCode: res.statusCode });
        }
        const titleMatch = data.match(/<span id="productTitle"[^>]*>([^<]+)<\/span>/);
        const title = titleMatch ? titleMatch[1].trim() : 'No title';
        
        // Find high-res image
        const imgMatch = data.match(/"hiRes":"(https:\/\/[^"]+\.jpg)"/) ||
                         data.match(/"large":"(https:\/\/[^"]+\.jpg)"/) ||
                         data.match(/data-old-hires="(https:\/\/[^"]+\.jpg)"/) ||
                         data.match(/id="landingImage"[^>]+src="(https:\/\/[^"]+\.jpg)"/);
        const image = imgMatch ? imgMatch[1] : null;

        resolve({ asin, statusCode: 200, title, image });
      });
    });
    req.on('error', (err) => resolve({ asin, error: err.message }));
  });
}

async function run() {
  for (const c of candidates) {
    console.log(`Checking ${c.brand} ${c.name}...`);
    for (const asin of c.asins) {
      const res = await fetchAsin(asin);
      console.log(`  -> ASIN ${asin}: HTTP ${res.statusCode} | ${res.title ? res.title.slice(0, 60) : ''} | Image: ${res.image ? res.image.slice(0, 50) + '...' : 'none'}`);
      if (res.statusCode === 200) {
        c.selected = res;
        break;
      }
      await new Promise(r => setTimeout(r, 400));
    }
  }
}
run();
