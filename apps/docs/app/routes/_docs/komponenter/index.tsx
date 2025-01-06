import { sanityFetch } from '@/lib/sanity';
import { Card, CardLink, Heading } from '@obosbbl/grunnmuren-react';
import { createFileRoute } from '@tanstack/react-router';
import { defineQuery } from 'groq';

const COMPONENTS_INDEX_QUERY = defineQuery(
  // make sure the slug is always a string so we don't have add fallback value in code just to make TypeScript happy
  `*[_type == "component"]{ _id, name, 'slug': coalesce(slug.current, '')} | order(name asc)`,
);

export const Route = createFileRoute('/_docs/komponenter/')({
  component: Page,
  head: () => ({
    meta: [
      { title: 'Komponenter - Grunnmuren' },
      { name: 'description', content: 'Grunnmuren sine komponenter' },
    ],
  }),
  loader: () => sanityFetch({ query: COMPONENTS_INDEX_QUERY }),
});

function Page() {
  const { data: components } = Route.useLoaderData();

  return (
    <>
      <h1 className="heading-l mb-12 mt-9">Komponenter</h1>
      <div className="grid grid-cols-2 gap-4">
        {components.map((component) => (
          <Card key={component._id} variant="outlined">
            <Heading level={2}>
              {/* @ts-expect-error figure out how to make this typesafe */}
              <CardLink href={`/komponenter/${component.slug}`}>{component.name}</CardLink>
            </Heading>
          </Card>
        ))}
      </div>
    </>
  );
}
