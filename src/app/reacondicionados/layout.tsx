import { Metadata } from 'next';
import { HUB_OG_SNIPPETS, buildSocialMetadata } from '@/lib/ogMetadata';

const snippet = HUB_OG_SNIPPETS.reacondicionados;

export const metadata: Metadata = buildSocialMetadata({
  title: snippet.title,
  socialTitle: snippet.socialTitle,
  description: snippet.description,
  canonicalUrl: 'https://www.unbuenregalo.es/reacondicionados',
  imageUrl: snippet.imageUrl,
  imageAlt: snippet.imageAlt,
  keywords: [
    'reacondicionados amazon',
    'productos reacondicionados amazon',
    'amazon renewed españa',
    'garantia reacondicionados amazon',
    'iphone reacondicionado amazon',
    'ipad reacondicionado amazon',
    'portatiles reacondicionados amazon',
    'apple watch reacondicionado amazon',
    'estado excelente amazon reacondicionado',
    'moviles reacondicionados con garantia amazon',
  ],
});

export default function ReacondicionadosLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
