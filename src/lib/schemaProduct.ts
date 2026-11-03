import { Product } from '@/data/products';
import { parsePrice, getAmazonProductUrl } from '@/lib/amazon';

export function generateProductItemListSchema(products: Product[], listName?: string) {
  return {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    ...(listName ? { name: listName } : {}),
    numberOfItems: products.length,
    itemListElement: products.slice(0, 30).map((prod, idx) => {
      const priceNum = parsePrice(prod.priceText) || 25;
      const directUrl = getAmazonProductUrl(prod.asin, prod.searchQuery || prod.title);
      return {
        '@type': 'ListItem',
        position: idx + 1,
        item: {
          '@type': 'Product',
          name: prod.title,
          image: prod.imageUrl?.startsWith('http')
            ? prod.imageUrl
            : `https://www.unbuenregalo.es${prod.imageUrl}`,
          description: prod.description || prod.title,
          ...(prod.asin ? { sku: prod.asin, mpn: prod.asin } : {}),
          brand: {
            '@type': 'Brand',
            name: prod.subcategory || prod.category || 'Un Buen Regalo',
          },
          offers: {
            '@type': 'Offer',
            price: priceNum.toFixed(2),
            priceCurrency: 'EUR',
            availability: 'https://schema.org/InStock',
            url: directUrl,
            priceValidUntil: '2026-12-31',
          },
          aggregateRating: {
            '@type': 'AggregateRating',
            ratingValue: (prod.rating || 4.7).toString(),
            reviewCount: (prod.reviewsCount || 100).toString(),
            bestRating: '5',
            worstRating: '1',
          },
        },
      };
    }),
  };
}
