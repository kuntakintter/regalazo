import fs from 'fs';
import path from 'path';
import { execSync } from 'child_process';

const isCfPages = process.env.CF_PAGES === '1';

if (!isCfPages) {
  execSync('npx next build', { stdio: 'inherit' });
  process.exit(0);
}

console.log('⚡ Preparing Cloudflare Pages Static Export Build (CF_PAGES=1)...');

// 1. Replace dynamic API routes during static export (handled by Cloudflare Pages /functions/api/live-search.js)
const liveSearchPath = 'src/app/api/live-search/route.ts';
if (fs.existsSync(liveSearchPath)) {
  fs.writeFileSync(
    liveSearchPath,
    `import { NextResponse } from 'next/server';
export const dynamic = 'force-static';
export interface LiveSearchResult {
  asin: string;
  title: string;
  imageUrl: string;
  priceText: string;
  rating: number;
  reviewsCount: number;
  url: string;
}
export async function GET() {
  return NextResponse.json({ success: true, count: 0, results: [] });
}
`,
    'utf8'
  );
}

for (const dir of ['src/app/api/cron', 'src/app/api/sync-prices']) {
  if (fs.existsSync(dir)) {
    fs.rmSync(dir, { recursive: true, force: true });
  }
}

const pinterestFeedPath = 'src/app/feed/pinterest.xml/route.ts';
if (fs.existsSync(pinterestFeedPath)) {
  let feedContent = fs.readFileSync(pinterestFeedPath, 'utf8');
  feedContent = `export const dynamic = 'force-static';\n` + feedContent.replace(
    'export async function GET(request: NextRequest) {',
    `export async function GET() {\n  const request = { url: 'https://www.unbuenregalo.es/feed/pinterest.xml?lang=es&board=all', nextUrl: new URL('https://www.unbuenregalo.es/feed/pinterest.xml?lang=es&board=all') } as unknown as NextRequest;`
  );
  fs.writeFileSync(pinterestFeedPath, feedContent, 'utf8');
}

// 2. Pre-render all routes dynamically from sitemapEngine (handled directly in page.tsx generateStaticParams)

// 3. Write Cloudflare Pages _redirects file into public/_redirects
const redirects = [
  '/regalos-para-mi-novio /que-regalar-a-mi-novio 301',
  '/regalos-novio /que-regalar-a-mi-novio 301',
  '/regalos-para-mi-novia /que-regalar-a-mi-novia 301',
  '/regalos-novia /que-regalar-a-mi-novia 301',
  '/regalos-para-hombres /que-regalar-a-un-hombre 301',
  '/regalos-hombre /que-regalar-a-un-hombre 301',
  '/regalos-para-mujeres /que-regalar-a-una-mujer 301',
  '/regalos-mujer /que-regalar-a-una-mujer 301',
  '/gta-6 /regalos-gta-6 301',
  '/gta-vi /regalos-gta-6 301',
  '/regalos-gta-vi /regalos-gta-6 301',
  '/gta6 /regalos-gta-6 301',
  '/gtavi /regalos-gta-6 301',
  '/adolescentes-13-a-15-anos /jovenes-13-a-15-anos 301',
  '/votacion-en-grupo /votar 301',
  '/regalos-15-a-30-euros /regalos-de-15-a-30-euros 301',
  '/regalos-30-a-60-euros /regalos-de-30-a-60-euros 301',
  '/regalos-20-a-50-euros /regalos-de-20-a-50-euros 301',
  '/regalos-50-a-100-euros /regalos-de-50-a-100-euros 301',
  '/coches-electricos-infantiles /coches-electricos-para-ninos 301',
].join('\n') + '\n';
fs.writeFileSync('public/_redirects', redirects, 'utf8');

// 4. Run Next.js static export build -> outputs to ./out
execSync('npx next build', { stdio: 'inherit' });

// 5. Prune internal RSC payload files (*.txt) and __next.* segment folders to stay strictly within
// Cloudflare Pages 20,000 file limit AND keep clean *.html files (so Cloudflare Pages serves /ruta
// directly with 200 OK instead of 308-redirecting /ruta -> /ruta/ which conflicts with canonical URLs).
const KEEP_TXT_FILES = new Set([
  'robots.txt',
  'llms.txt',
  '4af0ebafeccf6a3aa51203d44de90ad6.txt',
]);
let prunedCount = 0;
let prunedDirs = 0;
function pruneTxtAndRscDirs(dir) {
  if (!fs.existsSync(dir)) return;
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      if (entry.name.startsWith('__next.')) {
        try {
          fs.rmSync(fullPath, { recursive: true, force: true });
          prunedDirs++;
        } catch {}
        continue;
      }
      pruneTxtAndRscDirs(fullPath);
      try {
        if (fs.readdirSync(fullPath).length === 0) {
          fs.rmdirSync(fullPath);
          prunedDirs++;
        }
      } catch {}
    } else if (entry.name.endsWith('.txt') && !KEEP_TXT_FILES.has(entry.name)) {
      try {
        fs.unlinkSync(fullPath);
        prunedCount++;
      } catch {}
    }
  }
}
pruneTxtAndRscDirs('out');
console.log(
  `🧹 Pruned ${prunedCount} internal RSC .txt files and ${prunedDirs} RSC/empty directories (preserves clean *.html files without trailing-slash 308 redirects).`
);

// 6. Append 301 redirects for legacy English age-stage slugs under localized Latin-script prefixes
// (nl, pl, sv, no, da, fi, tr, ro, cs, hu) to resolve all legacy 404 & alternate-canonical URLs in GSC.
const enEdadesSitemapPath = path.join('out', 'sitemaps', 'sitemap-en-edades.xml');
if (fs.existsSync(enEdadesSitemapPath)) {
  const xml = fs.readFileSync(enEdadesSitemapPath, 'utf8');
  const targetLangs = new Set(['nl', 'pl', 'sv', 'no', 'da', 'fi', 'tr', 'ro', 'cs', 'hu']);
  const enStages = new Set([
    'babies-0-to-12-months',
    'toddlers-1-to-3-years',
    'kids-4-to-6-years',
    'kids-7-to-9-years',
    'tweens-10-to-12-years',
    'teens-13-to-15-years',
    'youth-16-to-18-years',
    'adults-over-18-years',
    'gender-reveal-party-gifts',
  ]);
  const dynRules = new Set();
  const statRules = new Set();
  const blocks = xml.match(/<url>[\s\S]*?<\/url>/g) || [];
  for (const b of blocks) {
    const m = b.match(/<loc>https:\/\/www\.unbuenregalo\.es\/en\/([^/<]+)(?:\/[^<]+)?<\/loc>/);
    if (!m || !enStages.has(m[1])) continue;
    const enSlug = m[1];
    const altRe = /href="https:\/\/www\.unbuenregalo\.es\/([^/"<]+)\/([^/"<]+)(?:\/[^"<]+)?"/g;
    let am;
    while ((am = altRe.exec(b)) !== null) {
      const lang = am[1];
      const locSlug = am[2];
      if (targetLangs.has(lang) && locSlug !== enSlug) {
        dynRules.add(`/${lang}/${enSlug}/* /${lang}/${locSlug}/:splat 301`);
        statRules.add(`/${lang}/${enSlug} /${lang}/${locSlug} 301`);
      }
    }
  }
  const extraRedirects = [...statRules, ...dynRules].join('\n') + '\n';
  fs.appendFileSync(path.join('out', '_redirects'), extraRedirects, 'utf8');
  console.log(
    `🔀 Added ${statRules.size} static + ${dynRules.size} dynamic legacy age-stage 301 rules to out/_redirects.`
  );
}

// 7. Notify IndexNow (Bing, Yandex, DuckDuckGo, Seznam & ChatGPT Search index)
try {
  const indexNowPayload = JSON.stringify({
    host: 'www.unbuenregalo.es',
    key: '4af0ebafeccf6a3aa51203d44de90ad6',
    keyLocation: 'https://www.unbuenregalo.es/4af0ebafeccf6a3aa51203d44de90ad6.txt',
    urlList: [
      'https://www.unbuenregalo.es/',
      'https://www.unbuenregalo.es/competicion',
      'https://www.unbuenregalo.es/competicion/formula-1',
      'https://www.unbuenregalo.es/competicion/motogp',
      'https://www.unbuenregalo.es/competicion/scalextric',
      'https://www.unbuenregalo.es/competicion/simracing',
      'https://www.unbuenregalo.es/competicion/maquetas',
      'https://www.unbuenregalo.es/regalos-menos-20-euros',
      'https://www.unbuenregalo.es/regalos-para-los-que-tienen-de-todo',
      'https://www.unbuenregalo.es/navidad',
      'https://www.unbuenregalo.es/carta-papa-noel',
      'https://www.unbuenregalo.es/votar',
      'https://www.unbuenregalo.es/motoristas',
      'https://www.unbuenregalo.es/gaming',
      'https://www.unbuenregalo.es/amantes-del-cafe',
      'https://www.unbuenregalo.es/automovil',
      'https://www.unbuenregalo.es/ciclismo',
      'https://www.unbuenregalo.es/mascotas',
      'https://www.unbuenregalo.es/que-regalar-a-un-hombre',
      'https://www.unbuenregalo.es/que-regalar-a-una-mujer',
      'https://www.unbuenregalo.es/que-regalar-a-mi-novio',
      'https://www.unbuenregalo.es/que-regalar-a-mi-novia',
      'https://www.unbuenregalo.es/bebes-0-a-12-meses',
      'https://www.unbuenregalo.es/ninos-1-a-3-anos',
      'https://www.unbuenregalo.es/ninos-4-a-6-anos',
      'https://www.unbuenregalo.es/ninos-7-a-9-anos',
      'https://www.unbuenregalo.es/ninos-10-a-12-anos',
      'https://www.unbuenregalo.es/jovenes-13-a-15-anos',
      'https://www.unbuenregalo.es/jovenes-16-a-18-anos',
      'https://www.unbuenregalo.es/adultos-mas-de-18-anos',
      'https://www.unbuenregalo.es/en',
      'https://www.unbuenregalo.es/en-gb/letter-to-santa',
      'https://www.unbuenregalo.es/es-us/carta-papa-noel',
      'https://www.unbuenregalo.es/llms.txt',
      'https://www.unbuenregalo.es/sitemap.xml',
    ],
  });
  await fetch('https://api.indexnow.org/indexnow', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json; charset=utf-8' },
    body: indexNowPayload,
  });
  console.log('🚀 IndexNow instant indexing notification sent successfully.');
} catch (err) {
  console.log('ℹ️ IndexNow notification skipped:', err?.message || err);
}

console.log('✅ Cloudflare Pages static export completed in ./out');
