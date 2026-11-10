import { Product } from '@/data/products';
import { parsePrice, getAmazonProductUrl, isValidActiveAsin, AmazonRegion } from '@/lib/amazon';
import { EUR_TO_USD_RATE } from '@/context/CurrencyContext';

export interface ItemListSchemaOptions {
  currency?: 'EUR' | 'USD';
  countryCode?: string;
  region?: AmazonRegion;
  brandFallback?: string;
}

export function generateProductItemListSchema(
  products: Product[],
  listName?: string,
  options?: ItemListSchemaOptions
) {
  const currency = options?.currency === 'USD' ? 'USD' : 'EUR';
  const region: AmazonRegion = options?.region || (currency === 'USD' ? 'intl' : 'es');
  const countryCode = options?.countryCode || (currency === 'USD' ? 'US' : 'ES');
  const brandFallback = options?.brandFallback || 'Un Buen Regalo';

  return {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    ...(listName ? { name: listName } : {}),
    numberOfItems: products.length,
    itemListElement: products.slice(0, 30).map((prod, idx) => {
      const basePrice = parsePrice(prod.priceText) || 25;
      const isSourceUsd = prod.priceText?.includes('$');
      const finalPrice =
        currency === 'USD'
          ? isSourceUsd
            ? basePrice
            : basePrice * EUR_TO_USD_RATE
          : isSourceUsd
          ? basePrice / EUR_TO_USD_RATE
          : basePrice;

      const cleanAsin = prod.asin?.trim();
      const validAsin = cleanAsin && isValidActiveAsin(cleanAsin) ? cleanAsin : undefined;
      const directUrl = getAmazonProductUrl(prod.asin, prod.searchQuery || prod.title, region);

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
          ...(validAsin ? { sku: validAsin, mpn: validAsin } : {}),
          brand: {
            '@type': 'Brand',
            name: prod.subcategory || prod.category || brandFallback,
          },
          offers: {
            '@type': 'Offer',
            price: finalPrice.toFixed(2),
            priceCurrency: currency,
            availability: 'https://schema.org/InStock',
            url: directUrl,
            validFrom: '2026-01-01',
            priceValidUntil: '2026-12-31',
            hasMerchantReturnPolicy: {
              '@type': 'MerchantReturnPolicy',
              applicableCountry: countryCode,
              returnPolicyCategory: 'https://schema.org/MerchantReturnFiniteReturnWindow',
              merchantReturnDays: 30,
              returnMethod: 'https://schema.org/ReturnByMail',
              returnFees: 'https://schema.org/FreeReturn',
            },
            shippingDetails: {
              '@type': 'OfferShippingDetails',
              shippingRate: {
                '@type': 'MonetaryAmount',
                value: '0.00',
                currency,
              },
              shippingDestination: {
                '@type': 'DefinedRegion',
                addressCountry: countryCode,
              },
              deliveryTime: {
                '@type': 'ShippingDeliveryTime',
                handlingTime: {
                  '@type': 'QuantitativeValue',
                  minValue: 0,
                  maxValue: 1,
                  unitCode: 'DAY',
                },
                transitTime: {
                  '@type': 'QuantitativeValue',
                  minValue: 1,
                  maxValue: 3,
                  unitCode: 'DAY',
                },
              },
            },
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
