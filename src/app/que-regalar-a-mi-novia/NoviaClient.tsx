'use client';

import PersonaHubView from '@/components/PersonaHubView';

export default function NoviaClient({ omitSchema = false }: { omitSchema?: boolean }) {
  return (
    <PersonaHubView
      hubSlug="que-regalar-a-mi-novia"
      personaKey="novia"
      themeAccent="rose"
      parentBreadcrumbSlug="que-regalar-a-una-mujer"
      omitSchema={omitSchema}
    />
  );
}
