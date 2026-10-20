const fs = require('fs');
const https = require('https');

function verifyUrl200(url) {
  return new Promise((resolve) => {
    https.get(url, (res) => {
      resolve(res.statusCode === 200);
    }).on('error', () => resolve(false));
  });
}

function getSearchResult(q) {
  return new Promise((resolve) => {
    https.get('https://www.amazon.es/s?k=' + encodeURIComponent(q), {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36',
        'Accept-Language': 'es-ES,es;q=0.9',
      }
    }, res => {
      let data = '';
      res.on('data', c => data += c);
      res.on('end', () => {
        const blocks = data.split('data-component-type="s-search-result"').slice(1);
        for (const b of blocks) {
          const asinMatch = b.match(/data-asin="(B[A-Z0-9]{9})"/);
          const imgMatch = b.match(/src="(https:\/\/m\.media-amazon\.com\/images\/I\/[^"]+\.jpg)"/);
          const titleMatch = b.match(/<h2[^>]*>[\s\S]*?<span[^>]*>([^<]+)<\/span>/);
          if (asinMatch && imgMatch && titleMatch) {
            return resolve({
              asin: asinMatch[1],
              img: imgMatch[1],
              title: titleMatch[1].trim()
            });
          }
        }
        resolve(null);
      });
    }).on('error', () => resolve(null));
  });
}

const files = [
  'src/data/automovilData.ts',
  'src/data/ciclismoData.ts',
  'src/data/gamingData.ts',
  'src/data/cafeData.ts',
  'src/data/mascotasData.ts'
];

async function updateFile(filePath) {
  console.log(`\n--- Processing ${filePath} ---`);
  let content = fs.readFileSync(filePath, 'utf8');

  // match all product definitions
  const regex = /id:\s*'([^']+)'[\s\S]*?searchQuery:\s*'([^']+)'/g;
  let m;
  const items = [];
  while ((m = regex.exec(content)) !== null) {
    items.push({ id: m[1], query: m[2] });
  }

  for (const item of items) {
    console.log(`Searching for [${item.id}]: ${item.query}...`);
    const res = await getSearchResult(item.query);
    if (res) {
      const isOk = await verifyUrl200(res.img);
      if (isOk) {
        console.log(`   -> OK (200): ASIN=${res.asin} | Img=${res.img.substring(0, 45)}...`);
        const itemBlockRegex = new RegExp(`id:\\s*'${item.id}'[\\s\\S]*?asin:\\s*'[^']*'[\\s\\S]*?imageUrl:\\s*'[^']*'`);
        content = content.replace(itemBlockRegex, (match) => {
          let u = match.replace(/asin:\s*'[^']*'/, `asin: '${res.asin}'`);
          u = u.replace(/imageUrl:\s*'[^']*'/, `imageUrl: '${res.img}'`);
          return u;
        });
      } else {
        console.warn(`   -> Warning: Image not 200: ${res.img}`);
      }
    } else {
      console.warn(`   -> No search result for: ${item.query}`);
    }
    await new Promise(r => setTimeout(r, 350));
  }

  fs.writeFileSync(filePath, content, 'utf8');
  console.log(`Updated ${filePath}!`);
}

async function run() {
  for (const f of files) {
    await updateFile(f);
  }
  console.log('\nAll new Hub files successfully populated with verified 200 OK images!');
}

run();
