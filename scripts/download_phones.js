const https = require('https');
const fs = require('fs');
const path = require('path');

const phones = [
  {
    id: 'phone-iphone-16-pro',
    asin: 'B0DGHH9JY3',
    fallbackAsin: 'B0DHYDBXJ9',
    filename: 'phone-iphone-16-pro.jpg'
  },
  {
    id: 'phone-iphone-16',
    asin: 'B0DGJJXBM5',
    filename: 'phone-iphone-16.jpg'
  },
  {
    id: 'phone-iphone-15',
    asin: 'B0CHWV5HTM',
    filename: 'phone-iphone-15.jpg'
  },
  {
    id: 'phone-galaxy-s24-ultra',
    asin: 'B0CNQ5WD9K',
    filename: 'phone-galaxy-s24-ultra.jpg'
  },
  {
    id: 'phone-galaxy-s24',
    asin: 'B0D6CP3VX5',
    filename: 'phone-galaxy-s24.jpg'
  },
  {
    id: 'phone-galaxy-a55',
    asin: 'B0CVQ9ZHPP',
    filename: 'phone-galaxy-a55.jpg'
  },
  {
    id: 'phone-xiaomi-14',
    asin: 'B0DJPCPFKJ',
    filename: 'phone-xiaomi-14.jpg'
  },
  {
    id: 'phone-redmi-note-13-pro-plus',
    asin: 'B0CPPZRQJK',
    filename: 'phone-redmi-note-13-pro-plus.jpg'
  },
  {
    id: 'phone-google-pixel-9',
    asin: 'B0D7V1BY5D',
    filename: 'phone-pixel-9.jpg'
  },
  {
    id: 'phone-google-pixel-8a',
    asin: 'B0CXJDX8XY',
    filename: 'phone-pixel-8a.jpg'
  },
  {
    id: 'phone-oppo-reno-12',
    asin: 'B0D5DC933P',
    filename: 'phone-oppo-reno12.jpg'
  },
  {
    id: 'phone-honor-magic-6-pro',
    asin: 'B0CW9Q16J4',
    filename: 'phone-honor-magic6-pro.jpg'
  },
  {
    id: 'phone-huawei-pura-70-pro',
    asin: 'B0D22HGP4R',
    filename: 'phone-huawei-pura-70-pro.jpg'
  }
];

function fetchPage(asin) {
  return new Promise((resolve) => {
    https.get('https://www.amazon.es/dp/' + asin, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36',
        'Accept-Language': 'es-ES,es;q=0.9'
      }
    }, res => {
      let data = '';
      res.on('data', c => data += c);
      res.on('end', () => {
        if (res.statusCode !== 200) return resolve({ error: 'Status ' + res.statusCode });
        const imgMatch = data.match(/"hiRes":"(https:\/\/[^"]+\.jpg)"/) ||
                         data.match(/"large":"(https:\/\/[^"]+\.jpg)"/) ||
                         data.match(/data-old-hires="(https:\/\/[^"]+\.jpg)"/) ||
                         data.match(/id="landingImage"[^>]+src="(https:\/\/[^"]+\.jpg)"/) ||
                         data.match(/https:\/\/m\.media-amazon\.com\/images\/I\/[a-zA-Z0-9+_%\-]+\.jpg/);
        const imgUrl = imgMatch ? (imgMatch[1] || imgMatch[0]) : null;
        resolve({ imgUrl, titleMatch: data.match(/<span id="productTitle"[^>]*>([^<]+)<\/span>/) });
      });
    }).on('error', err => resolve({ error: err.message }));
  });
}

function downloadFile(url, destPath) {
  return new Promise((resolve, reject) => {
    https.get(url, (res) => {
      if (res.statusCode >= 300 && res.statusCode < 400 && res.headers.location) {
        return downloadFile(res.headers.location, destPath).then(resolve).catch(reject);
      }
      if (res.statusCode !== 200) {
        return reject(new Error(`Failed to download ${url}: status code ${res.statusCode}`));
      }
      const fileStream = fs.createWriteStream(destPath);
      res.pipe(fileStream);
      fileStream.on('finish', () => {
        fileStream.close(() => resolve(destPath));
      });
      fileStream.on('error', reject);
    }).on('error', reject);
  });
}

async function run() {
  const targetDir = path.join(__dirname, '../public/images/products');
  if (!fs.existsSync(targetDir)) fs.mkdirSync(targetDir, { recursive: true });

  for (const p of phones) {
    console.log(`Processing ${p.id} (${p.asin})...`);
    let res = await fetchPage(p.asin);
    if (!res.imgUrl && p.fallbackAsin) {
      console.log(`  Trying fallback ${p.fallbackAsin}...`);
      res = await fetchPage(p.fallbackAsin);
    }

    if (res.imgUrl) {
      // replace size tags with high-res _AC_SL1500_
      const highResUrl = res.imgUrl.replace(/\._[A-Z0-9_,]+_\.jpg/, '._AC_SL1500_.jpg');
      const dest = path.join(targetDir, p.filename);
      try {
        await downloadFile(highResUrl, dest);
        const stats = fs.statSync(dest);
        console.log(`  -> SUCCESS downloaded: ${p.filename} (${stats.size} bytes) from ${highResUrl}`);
      } catch (e) {
        console.log(`  -> Error with highRes, trying original ${res.imgUrl}`);
        await downloadFile(res.imgUrl, dest);
        const stats = fs.statSync(dest);
        console.log(`  -> SUCCESS downloaded original: ${p.filename} (${stats.size} bytes)`);
      }
    } else {
      console.warn(`  -> Could not extract image for ${p.id}`);
    }
    await new Promise(r => setTimeout(r, 600));
  }
}

run();
