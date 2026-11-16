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

// 5. Prune internal RSC payload files (*.txt) to stay strictly within Cloudflare Pages 20,000 file limit.
// Every static HTML page is 100% preserved for Googlebot, Search Console, and web visitors (13,118+ HTML pages).
let prunedCount = 0;
function pruneTxtFiles(dir) {
  if (!fs.existsSync(dir)) return;
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      pruneTxtFiles(fullPath);
    } else if (entry.name.endsWith('.txt') && entry.name !== 'robots.txt') {
      try {
        fs.unlinkSync(fullPath);
        prunedCount++;
      } catch {}
    }
  }
}
pruneTxtFiles('out');
console.log(`🧹 Pruned ${prunedCount} internal RSC .txt files (keeps total deployment under Cloudflare Pages 20k limit).`);

// 6. Ensure every directory has an index.html so Cloudflare Pages serves clean URLs without 404
let normalizedCount = 0;
function normalizeDirectoryIndex(dir) {
  if (!fs.existsSync(dir)) return;
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    if (entry.isDirectory()) {
      const subDir = path.join(dir, entry.name);
      normalizeDirectoryIndex(subDir);
      const siblingHtml = subDir + '.html';
      const targetIndex = path.join(subDir, 'index.html');
      if (fs.existsSync(siblingHtml) && !fs.existsSync(targetIndex)) {
        fs.renameSync(siblingHtml, targetIndex);
        normalizedCount++;
      }
    }
  }
}
normalizeDirectoryIndex('out');
console.log(`📁 Normalized ${normalizedCount} directory index.html files for Cloudflare Pages clean URLs.`);
console.log('✅ Cloudflare Pages static export completed in ./out');
