import { Card, CardLink, Heading } from '@obosbbl/grunnmuren-react';
import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/_docs/profil/')({
  component: Page,
  head: () => ({
    meta: [
      { title: 'Profil | Grunnmuren' },
      { name: 'description', content: 'Grunnmuren sin grafiske profil' },
    ],
  }),
});

function Page() {
  return (
    <>
      <h1 className="heading-l my-12">Profil</h1>
      <div className="grid grid-cols-2 gap-4">
        <Card variant="outlined">
          <Heading level={2}>
            <CardLink href="/profil/farger">Farger</CardLink>
          </Heading>
          Se alle fargene våre
        </Card>
        <Card variant="outlined">
          <Heading level={2}>
            <CardLink href="/profil/ikoner">Ikoner</CardLink>
          </Heading>
          Utforsk ikonsettet vårt
        </Card>
      </div>
    </>
  );
}
