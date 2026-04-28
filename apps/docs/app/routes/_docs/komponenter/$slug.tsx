import * as badgeExamples from '@/examples/badge';
import * as buttonExamples from '@/examples/button';
import { sanityFetch } from '@/lib/sanity.server';
import { Content } from '@/ui/content';
import { PropsTable } from '@/ui/props-table';
import { createFileRoute, notFound } from '@tanstack/react-router';
import * as props from 'docgen';
import { defineQuery } from 'groq';

const COMPONENT_QUERY = defineQuery(
  `*[_type == "component" && slug.current == $slug][0]{ content, "name": coalesce(name, '') }`,
);

export const Route = createFileRoute('/_docs/komponenter/$slug')({
  component: Page,
  loader: async ({ params, context }) => {
    console.log('context in component route', context);
    const res = await sanityFetch({
      data: {
        query: COMPONENT_QUERY,
        params: { slug: params.slug },
      },
    });

    if (res.data == null) {
      throw notFound();
    }

    const componentName = res.data.name;
    const componentProps = props[componentName].props;

    return { data: res.data, componentProps };
  },
});

function Page() {
  const { data, componentProps } = Route.useLoaderData();

  // @ts-expect-error this works for now until we figure how to make the examples work better with Sanity
  const { scope, examples } = {
    Button: buttonExamples,
    Badge: badgeExamples,
  }[data.name];

  return (
    <>
      <h1 className="heading-l mb-12 mt-9">{data.name}</h1>

      <Content content={data.content ?? []} />

      <PropsTable props={componentProps} />
    </>
  );
}
