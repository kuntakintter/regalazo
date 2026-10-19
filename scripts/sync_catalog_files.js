const fs = require('fs');
const path = require('path');

const content = fs.readFileSync('src/data/products.ts', 'utf8');
const regex = /"id":\s*"([^"]+)",[\s\S]*?"imageUrl":\s*"([^"]+)",[\s\S]*?"images":\s*(\[[^\]]+\])/g;

const prodMap = {};
let match;
while ((match = regex.exec(content)) !== null) {
  prodMap[match[1]] = {
    imageUrl: match[2],
    images: JSON.parse(match[3])
  };
}

console.log('Mapped products from src/data/products.ts:', Object.keys(prodMap).length);

const catalogFiles = [
  'catalog_012.js',
  'catalog_13.js',
  'catalog_46.js',
  'catalog_79.js',
  'catalog_1012.js',
  'catalog_1315.js',
  'catalog_1618.js'
];

for (const catFile of catalogFiles) {
  const filePath = path.join(__dirname, catFile);
  let fileContent = fs.readFileSync(filePath, 'utf8');

  for (const [id, data] of Object.entries(prodMap)) {
    if (fileContent.includes(`id: '${id}'`)) {
      // replace imageUrl
      fileContent = fileContent.replace(
        new RegExp(`(id:\\s*'${id}'[\\s\\S]*?imageUrl:\\s*)'[^']+'`),
        `$1'${data.imageUrl}'`
      );
      // replace images
      const imagesStr = JSON.stringify(data.images);
      fileContent = fileContent.replace(
        new RegExp(`(id:\\s*'${id}'[\\s\\S]*?images:\\s*)\\[[^\\]]*\\]`),
        `$1${imagesStr.replace(/"/g, "'")}`
      );
    }
  }

  fs.writeFileSync(filePath, fileContent, 'utf8');
  console.log(`Updated ${catFile}`);
}

console.log('All catalog files synced!');
