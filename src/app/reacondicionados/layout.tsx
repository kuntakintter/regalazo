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
    'reacondicionado',
    'reacondicionados',
    'reacondicionados amazon',
    'segunda mano',
    'segunda mano con garantia',
    'moviles de segunda mano con garantia',
    'iphone segunda mano o reacondicionado',
    'reacondicionado vs segunda mano',
    'productos reacondicionados amazon',
    'amazon renewed españa',
    'garantia reacondicionados amazon',
    'iphone reacondicionado amazon',
    'ipad reacondicionado amazon',
    'portatiles reacondicionados amazon',
    'portatiles segunda mano con garantia',
    'apple watch reacondicionado amazon',
    'estado excelente amazon reacondicionado',
    'moviles reacondicionados con garantia amazon',
    'comprar reacondicionado seguro',
  ],
});

export default function ReacondicionadosLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
