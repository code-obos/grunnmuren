import * as badgeExamples from '@/examples/badge';
import * as buttonExamples from '@/examples/button';
import { sanityFetch } from '@/lib/sanity';
import { Content } from '@/ui/content';
import { PropsTable } from '@/ui/props-table';
import { createFileRoute, notFound } from '@tanstack/react-router';
import type * as props from 'docgen';
import { defineQuery } from 'groq';

const COMPONENT_QUERY = defineQuery(
  `*[_type == "component" && slug.current == $slug][0]{ content, "name": coalesce(name, ''), propsComponents }`,
);

export const Route = createFileRoute('/_docs/komponenter/$slug')({
  component: Page,
  loader: async ({ params }) => {
    const res = await sanityFetch({
      query: COMPONENT_QUERY,
      params: { slug: params.slug },
    });

    if (res.data == null) {
      throw notFound();
    }

    return { data: res.data };
  },
});

function Page() {
  const { data } = Route.useLoaderData();

  // @ts-expect-error this works for now until we figure how to make the examples work better with Sanity
  const { scope, examples } = {
    Button: buttonExamples,
    Badge: badgeExamples,
  }[data.name];

  return (
    <>
      <h1 className="heading-l mb-12 mt-9">{data.name}</h1>

      <Content className="mb-12" content={data.content ?? []} />

      {data.propsComponents?.length && <h2 className="heading-m">Props</h2>}
      {data.propsComponents?.map((componentName) => (
        <PropsTable
          key={componentName}
          componentName={componentName as keyof typeof props}
        />
      ))}
    </>
  );
}
