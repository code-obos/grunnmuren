import { Card, CardLink, Heading } from '@obosbbl/grunnmuren-react';
import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/_docs/')({
  component: Home,
});

function Home() {
  return (
    <>
      <h1 className="heading-l mt-12 mb-10 lg:mb-12">Grunnmuren</h1>
      <p className="lead mb-12">
        Grunnmuren skal være det naturlige førstevalget for digitale flater ved
        å tilby en felles verktøykasse med grunnleggende, universelt utformede
        UI-komponenter, retningslinjer og utvalgte mønstre. Vi setter uu og
        brukerbehov først, har enkelhet som utgangpunkt og vi designer og
        utvikler sammen.
      </p>
      <div className="grid grid-cols-2 gap-4">
        <Card variant="outlined">
          <Heading level={2}>
            <CardLink
              href={{
                to: '/komponenter',
              }}
            >
              Komponenter
            </CardLink>
          </Heading>
          Se alle byggeklossene våre
        </Card>
        <Card variant="outlined">
          <Heading level={2}>
            <CardLink href={{ to: '/profil' }}>Profil</CardLink>
          </Heading>
          Utforsk profilen vår
        </Card>
      </div>
    </>
  );
}
