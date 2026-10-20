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

const MOTORISTA_SEARCHES = {
  'moto-casco-ls2-modular': 'LS2 Strobe Casco Moto Modular Abatible',
  'moto-casco-agv-k1s': 'AGV K1 S Casco Moto Integral',
  'moto-casco-ls2-rapid': 'LS2 Rapid II Casco Integral Moto',
  'moto-chaqueta-alpinestars-t-sps': 'Alpinestars T-SPS Chaqueta Moto Impermeable',
  'moto-chaqueta-dainese-sevilla': 'Dainese Sevilla Air Tex Chaqueta Moto Verano',
  'moto-guantes-alpinestars-smx1': 'Alpinestars SMX-1 Air V2 Guantes Moto',
  'moto-guantes-dainese-nembo': 'Dainese Nembo Gore-Tex Guantes Moto Invierno',
  'moto-intercom-cardo-spirit': 'Cardo Spirit Intercomunicador Moto Bluetooth HD',
  'moto-soporte-quadlock-amortiguador': 'Quad Lock Amortiguador de Vibraciones Moto',
  'moto-antirrobo-alarma-disco': 'Antirrobo Disco Moto con Alarma 110dB',
  'moto-candado-oxford-boss': 'Oxford Boss Candado Disco Alarma Moto',
  'moto-mochila-pierna-impermeable': 'Bolsa de Pierna Moto Impermeable',
  'moto-kit-limpiador-cascos-motul': 'Motul MC Care M1 M2 Limpiador Casco Moto',
  'moto-cargador-baterias-noco': 'NOCO Genius 1 Cargador Bateria Moto 12V',
};

async function main() {
  const filePath = 'src/data/motoristasData.ts';
  let content = fs.readFileSync(filePath, 'utf8');

  console.log('Searching & verifying real 200 OK images for MOTORISTAS...');

  for (const [id, query] of Object.entries(MOTORISTA_SEARCHES)) {
    console.log(`Searching for ${id} (${query})...`);
    const res = await getSearchResult(query);
    if (res) {
      const is200 = await verifyUrl200(res.img);
      if (is200) {
        console.log(`   -> SUCCESS [200 OK]: ASIN=${res.asin} | Img=${res.img}`);
        // Replace in motoristasData.ts
        const idRegex = new RegExp(`id:\\s*'${id}'[\\s\\S]*?asin:\\s*'[^']*'[\\s\\S]*?imageUrl:\\s*'[^']*'`);
        content = content.replace(idRegex, (match) => {
          let updated = match.replace(/asin:\s*'[^']*'/, `asin: '${res.asin}'`);
          updated = updated.replace(/imageUrl:\s*'[^']*'/, `imageUrl: '${res.img}'`);
          return updated;
        });
      } else {
        console.error(`   -> Image returned non-200: ${res.img}`);
      }
    } else {
      console.error(`   -> No search result found for: ${query}`);
    }
    await new Promise(r => setTimeout(r, 400));
  }

  fs.writeFileSync(filePath, content, 'utf8');
  console.log('Finished updating motoristasData.ts with verified 200 OK images!');
}

main();
