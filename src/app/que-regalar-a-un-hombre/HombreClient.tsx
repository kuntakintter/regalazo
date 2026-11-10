'use client';

import PersonaHubView from '@/components/PersonaHubView';

export default function HombreClient({ omitSchema = false }: { omitSchema?: boolean }) {
  return (
    <PersonaHubView
      hubSlug="que-regalar-a-un-hombre"
      personaKey="hombre"
      themeAccent="indigo"
      omitSchema={omitSchema}
    />
  );
}
