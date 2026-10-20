const fs = require('fs');
const https = require('https');

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
            const rawTitle = titleMatch[1].toLowerCase();
            // skip accessories or generic collections if we want the actual brand
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

const SPECIFIC_QUERIES = {
  '1618-paco-rabanne-one-million': 'Paco Rabanne 1 Million Eau de Toilette 100ml',
  '1618-carolina-herrera-good-girl': 'Carolina Herrera Good Girl Eau de Parfum 80ml',
  '1618-jean-paul-gaultier-le-male': 'Jean Paul Gaultier Le Male 125ml',
  '1618-versace-eros-eau-de-toilette': 'Versace Eros Eau de Toilette 100ml',
  '1618-yves-saint-laurent-libre': 'Yves Saint Laurent Libre 50ml',
  '1618-sol-de-janeiro-cheirosa-68': 'Sol de Janeiro Brazilian Crush Cheirosa 68 90ml',
  '1618-tous-loveme-eau-de-parfum': 'Tous LoveMe Eau de Parfum 50ml',
  '1618-victorias-secret-pure-seduction': 'Victorias Secret Pure Seduction Mist 250ml',
  '1618-scalpers-the-club-eau-de-parfum': 'Scalpers The Club Eau de Parfum 125ml',
  '1618-calvin-klein-ck-be': 'Calvin Klein CK be Eau de Toilette 100ml',
  '1618-ea-sports-fc-25-ps5': 'EA SPORTS FC 25 PlayStation 5',
  '1618-hogwarts-legacy-ps5': 'Hogwarts Legacy PlayStation 5',
  '1618-sony-auriculares-pulse-3d': 'Sony PlayStation Pulse 3D Auriculares Inalámbricos PS5',
  '18plus-smartbox-3-dias-con-encanto': 'Smartbox 3 Dias con Encanto',
  '18plus-smartbox-spa-relax-dos': 'Smartbox Spa y Relax para Dos',
  '18plus-wonderbox-cena-gourmet-dos': 'Wonderbox Cena Gourmet Dos',
  '18plus-lego-icons-bonsai': 'LEGO Icons Bonsai 10281',
  '18plus-lego-icons-ramo-flores': 'LEGO Icons Ramo Flores Silvestres 10313',
  '18plus-lego-star-wars-casco-vader': 'LEGO Star Wars Casco Darth Vader 75304',
  '18plus-terraforming-mars-juego': 'Terraforming Mars juego de mesa Maldito Games',
  '18plus-wingspan-juego-mesa': 'Wingspan juego de mesa Maldito Games',
  '18plus-guatafac-juego-fiesta': 'Guatafac juego cartas fiesta',
  '18plus-dji-mini-4k-dron': 'DJI Mini 4K Dron',
  '18plus-coche-rc-wltoys-124019-buggy': 'Wltoys 124019 Buggy 1 12 RC',
  '18plus-elegoo-arduino-kit-robotica': 'ELEGOO Kit Inicio Avanzado Arduino UNO R3',
  '18plus-kindle-paperwhite-16gb': 'Kindle Paperwhite 16 GB',
  '18plus-philips-hue-kit-bombillas-led': 'Philips Hue White Color Ambiance Pack 2 E27',
  '18plus-bose-soundlink-flex-altavoz': 'Bose SoundLink Flex Altavoz Bluetooth',
  '18plus-cecotec-power-espresso-cafetera': 'Cecotec Cafetera Express Power Espresso 20 Professionale',
  '18plus-kit-cocteleria-boston-acero': 'Kit Cocteleria Boston Acero Inoxidable Soporte Bambu',
  '18plus-hario-v60-kit-cafe-filtro': 'Hario V60 Set Cafe Filtro Manual Jarra',
  '18plus-dior-sauvage-eau-de-toilette': 'Dior Sauvage Eau de Toilette 100ml',
  '18plus-armani-si-eau-de-parfum': 'Giorgio Armani Si Eau de Parfum 100ml',
  '18plus-tom-ford-black-orchid': 'Tom Ford Black Orchid 50ml'
};

async function main() {
  const filePath = 'src/data/products.ts';
  const content = fs.readFileSync(filePath, 'utf8');
  const match = content.match(/export const PRODUCTS: Product\[\] = (\[[\s\S]*?\]);\s*\n/);
  const list = JSON.parse(match[1]);

  const targetIds = Object.keys(SPECIFIC_QUERIES);
  console.log(`Starting targeted Amazon image & ASIN update for ${targetIds.length} products...`);

  for (let i = 0; i < targetIds.length; i++) {
    const id = targetIds[i];
    const q = SPECIFIC_QUERIES[id];
    const prod = list.find(p => p.id === id);
    if (!prod) {
      console.warn(`Product not found: ${id}`);
      continue;
    }

    console.log(`[${i + 1}/${targetIds.length}] Searching: ${q}...`);
    const res = await getSearchResult(q);
    if (res) {
      console.log(`   -> OK: ASIN=${res.asin} | Img=${res.img.substring(0, 50)}...`);
      prod.asin = res.asin;
      prod.imageUrl = res.img;
      prod.images = [res.img];
    } else {
      console.error(`   -> FAILED to find: ${q}`);
    }

    await new Promise(r => setTimeout(r, 400));
  }

  // Update file
  const newContent = content.replace(
    /export const PRODUCTS: Product\[\] = \[[\s\S]*?\];\s*\n/,
    'export const PRODUCTS: Product[] = ' + JSON.stringify(list, null, 2) + ';\n'
  );

  fs.writeFileSync(filePath, newContent, 'utf8');
  console.log('Finished updating src/data/products.ts with real Amazon images!');
}

main();
