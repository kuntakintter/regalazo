'use client';

import PersonaHubView from '@/components/PersonaHubView';

export default function MujerClient({ omitSchema = false }: { omitSchema?: boolean }) {
  return (
    <PersonaHubView
      hubSlug="que-regalar-a-una-mujer"
      personaKey="mujer"
      themeAccent="rose"
      omitSchema={omitSchema}
    />
  );
}
