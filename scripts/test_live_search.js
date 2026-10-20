const https = require('https');

function searchAmazonLive(query) {
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
        const results = [];
        // Extract product blocks
        const itemRegex = /data-asin="([B0-9A-Z]{10})"[\s\S]*?<h2[^>]*>([\s\S]*?)<\/h2>[\s\S]*?(?:src="(https:\/\/m\.media-amazon\.com\/images\/I\/[^"]+\.jpg)")?[\s\S]*?(?:<span class="a-price-whole">([0-9.,]+)<\/span>)?/g;
        let match;
        
        // Simpler, robust extraction by asin blocks
        const blocks = data.split('data-asin="').slice(1);
        for (const block of blocks) {
          const asin = block.substring(0, 10);
          if (!asin || !asin.startsWith('B')) continue;

          // Title
          const titleMatch = block.match(/<h2[^>]*>[\s\S]*?<span[^>]*>([^<]+)<\/span>/) ||
                             block.match(/<h2[^>]*>([^<]+)<\/h2>/);
          const title = titleMatch ? titleMatch[1].trim() : null;
          if (!title || title.length < 5 || title.includes('Resultados') || title.includes('patrocinado')) continue;

          // Image
          const imgMatch = block.match(/src="(https:\/\/m\.media-amazon\.com\/images\/I\/[^"]+\.jpg)"/);
          const imageUrl = imgMatch ? imgMatch[1] : null;

          // Price
          const priceWhole = block.match(/class="a-price-whole">([0-9.,]+)/);
          const priceFraction = block.match(/class="a-price-fraction">([0-9]+)/);
          const price = priceWhole ? `${priceWhole[1]},${priceFraction ? priceFraction[1] : '00'} €` : null;

          // Rating
          const ratingMatch = block.match(/([0-9],[0-9]) de 5 estrellas/);
          const rating = ratingMatch ? parseFloat(ratingMatch[1].replace(',', '.')) : 4.6;

          results.push({
            asin,
            title,
            imageUrl,
            priceText: price || 'Ver precio en Amazon',
            rating,
            url: `https://www.amazon.es/dp/${asin}/?tag=vapegadgets22-21&linkCode=ll1`
          });

          if (results.length >= 4) break;
        }

        resolve({ query, count: results.length, results });
      });
    });

    req.on('error', err => resolve({ query, error: err.message, results: [] }));
  });
}

async function test() {
  const queries = ['zapatillas nike', 'reloj digital casio', 'lego star wars'];
  for (const q of queries) {
    console.log(`Searching: "${q}"...`);
    const res = await searchAmazonLive(q);
    console.log(JSON.stringify(res, null, 2));
  }
}

test();
