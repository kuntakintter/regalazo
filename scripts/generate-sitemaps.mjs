/**
 * Programmatic Sitemap Engine CLI Validator & Cron Runner
 * Usage: node scripts/generate-sitemaps.mjs
 */
import fs from 'node:fs';
import path from 'node:path';

const rootDir = process.cwd();
const nextServerAppDir = path.join(rootDir, '.next', 'server', 'app');
const indexBodyPath = path.join(nextServerAppDir, 'sitemap.xml.body');
const sitemapsDir = path.join(nextServerAppDir, 'sitemaps');

function main() {
  console.log('==============================================================');
  console.log('  UN BUEN REGALO — PROGRAMMATIC SITEMAP ENGINE (27 LOCALES)   ');
  console.log('==============================================================');

  if (!fs.existsSync(indexBodyPath)) {
    console.log(
      'Note: Static build artifacts not found in .next/server/app yet. Run `npm run build` to pre-generate all static XML sitemaps.'
    );
    return;
  }

  const indexXml = fs.readFileSync(indexBodyPath, 'utf8');
  const shardLocs = [...indexXml.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1]);
  console.log(`Root Sitemap Index (/sitemap.xml): ${shardLocs.length} child sitemaps indexed.`);

  if (fs.existsSync(sitemapsDir)) {
    const bodyFiles = fs
      .readdirSync(sitemapsDir)
      .filter((f) => f.endsWith('.xml.body'));
    let totalUrls = 0;
    let maxUrlsInSingleShard = 0;

    for (const file of bodyFiles) {
      const xml = fs.readFileSync(path.join(sitemapsDir, file), 'utf8');
      const count = (xml.match(/<url>/g) || []).length;
      totalUrls += count;
      if (count > maxUrlsInSingleShard) maxUrlsInSingleShard = count;
    }

    console.log(`Pre-rendered Static Shards: ${bodyFiles.length} XML files`);
    console.log(`Total Active URLs Indexed (Stock > 0): ${totalUrls}`);
    console.log(`Max URLs in any single shard: ${maxUrlsInSingleShard} (Limit: 10,000)`);
  }
  console.log('==============================================================');
}

main();
