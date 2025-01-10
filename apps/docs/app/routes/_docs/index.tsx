import { Card, CardLink, Heading } from '@obosbbl/grunnmuren-react';
import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/_docs/')({
  component: Home,
});

function Home() {
  return (
    <>
      <h1 className="heading-l mb-12">Grunnmuren</h1>
      <div className="grid grid-cols-2 gap-4">
        <Card variant="outlined">
          <Heading level={2}>
            <CardLink href="/komponenter">Komponenter</CardLink>
          </Heading>
          Se alle byggeklossene våre
        </Card>
        <Card variant="outlined">
          <Heading level={2}>
            <CardLink href="/profil">Profil</CardLink>
          </Heading>
          Utforsk profilen vår
        </Card>
      </div>
    </>
  );
}
