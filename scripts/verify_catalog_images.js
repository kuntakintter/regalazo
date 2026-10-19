const fs = require('fs');
const content = fs.readFileSync('src/data/products.ts', 'utf8');

// Check unsplash
const unsplashMatches = content.match(/unsplash\.com/g);
console.log('Unsplash occurrences:', unsplashMatches ? unsplashMatches.length : 0);

// Check all image paths
const imgMatches = [...content.matchAll(/"imageUrl":\s*"([^"]+)"/g)].map(m => m[1]);
console.log('Total imageUrls:', imgMatches.length);

let missingCount = 0;
let smallCount = 0;
imgMatches.forEach(url => {
  const diskPath = './public' + url;
  if (!fs.existsSync(diskPath)) {
    console.log('MISSING:', url);
    missingCount++;
  } else {
    const size = fs.statSync(diskPath).size;
    if (size < 1000) {
      console.log('TOO SMALL:', url, size);
      smallCount++;
    }
  }
});

console.log('Missing images:', missingCount);
console.log('Suspiciously small images (<1KB):', smallCount);
console.log('Valid local images on disk:', imgMatches.length - missingCount - smallCount);
