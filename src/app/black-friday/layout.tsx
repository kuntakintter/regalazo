import { Metadata } from 'next';
import { HUB_OG_SNIPPETS, buildSocialMetadata } from '@/lib/ogMetadata';

const snippet = HUB_OG_SNIPPETS['black-friday'];

export const metadata: Metadata = buildSocialMetadata({
  title: snippet.title,
  socialTitle: snippet.socialTitle,
  description: snippet.description,
  canonicalUrl: 'https://www.unbuenregalo.es/black-friday',
  imageUrl: snippet.imageUrl,
  imageAlt: snippet.imageAlt,
  keywords: [
    'ofertas black friday 2026',
    'chollos black friday amazon',
    'bazar black friday descuentos reales',
    'regalos black friday 2026',
    'mayores descuentos black friday',
    'black friday tecnologia hogar juguetes',
    'ofertas black friday menos de 20 euros',
    'ofertas black friday menos de 50 euros',
    'comparador descuentos black friday amazon',
    'un buen regalo black friday',
  ],
});

export default function BlackFridayLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
