import { sanityFetch } from '@/lib/sanity';
import { Card, CardLink, Heading } from '@obosbbl/grunnmuren-react';
import { createFileRoute } from '@tanstack/react-router';
import { defineQuery } from 'groq';

const COMPONENTS_INDEX_QUERY = defineQuery(
  // make sure the slug is always a string so we don't have add fallback value in code just to make TypeScript happy
  `*[_type == "component"]{ _id, name, 'slug': coalesce(slug.current, '')} | order(name asc)`,
);

export const Route = createFileRoute('/_docs/profil/')({
  component: Page,
  head: () => ({
    meta: [
      { title: 'Profil - Grunnmuren' },
      { name: 'description', content: 'Grunnmuren sin grafiske profil' },
    ],
  }),
  loader: () => sanityFetch({ query: COMPONENTS_INDEX_QUERY }),
});

function Page() {
  return (
    <>
      <h1 className='heading-l mt-9 mb-12'>Profil</h1>
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
