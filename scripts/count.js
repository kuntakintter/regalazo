const fs = require('fs');
const file = fs.readFileSync('src/data/products.ts', 'utf8');

const ages = ['0-12m', '1-3', '4-6', '7-9', '10-12', '13-15', '16-18'];
console.log('--- PRODUCTS PER AGE ---');
for (const age of ages) {
  const matches = file.match(new RegExp(`ageRange:\\s*'${age}'`, 'g')) || [];
  console.log(`${age}: ${matches.length} productos`);
}
