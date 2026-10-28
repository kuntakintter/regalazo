import { Metadata } from 'next';
import { HUB_OG_SNIPPETS, buildSocialMetadata } from '@/lib/ogMetadata';

const snippet = HUB_OG_SNIPPETS.motoristas;

export const metadata: Metadata = buildSocialMetadata({
  title: snippet.title,
  socialTitle: snippet.socialTitle,
  description: snippet.description,
  canonicalUrl: 'https://www.unbuenregalo.es/motoristas',
  imageUrl: snippet.imageUrl,
  imageAlt: snippet.imageAlt,
  keywords: [
    'regalos para motoristas',
    'regalos moteros',
    'cascos de moto para regalar',
    'casco moto modular doble visera',
    'chaquetas moto impermeables alpinestars',
    'guantes moto homologados dainese',
    'intercomunicador moto bluetooth cardo',
    'candado disco moto alarma',
  ],
});

export default function MotoristasLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
