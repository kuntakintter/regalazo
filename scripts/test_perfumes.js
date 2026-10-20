const https = require('https');

function getFirstSearchResult(q) {
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

async function test() {
  const perfumes = [
    'Paco Rabanne 1 Million Eau de Toilette 100ml',
    'Carolina Herrera Good Girl Eau de Parfum 80ml',
    'Jean Paul Gaultier Le Male 125ml',
    'Versace Eros Eau de Toilette 100ml',
    'Yves Saint Laurent Libre 50ml',
    'Dior Sauvage Eau de Toilette 100ml',
    'Armani Si Eau de Parfum 100ml',
    'Tom Ford Black Orchid 50ml'
  ];
  for (const p of perfumes) {
    const res = await getFirstSearchResult(p);
    console.log(p, '=>', res ? res.asin + ' | ' + res.title.substring(0, 35) + ' | ' + res.img : 'NONE');
  }
}
test();
