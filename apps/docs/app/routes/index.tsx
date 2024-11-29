import { createFileRoute } from '@tanstack/react-router';
import { Card, CardLink, Heading } from '@obosbbl/grunnmuren-react';

export const Route = createFileRoute('/')({
  component: Home,
});

function Home() {
  return (
    <>
      <h1 className="heading-l mb-12">Grunnmuren</h1>
      <div className="grid grid-cols-2 gap-4">
        <Card variant="outlined">
          <Heading level={2}>
            <CardLink href="/">Komponenter</CardLink>
          </Heading>
          Se alle byggeklossene våre
        </Card>
        <Card variant="outlined">
          <Heading level={2}>
            <CardLink href="/ikoner">Ikoner</CardLink>
          </Heading>
          Utforsk ikonsettet vårt
        </Card>
      </div>
    </>
  );
}
