import { sanityFetch } from '@/lib/sanity';
import { Content } from '@/ui/content';
import { PropsTable } from '@/ui/props-table';
import { Figma, Github } from '@obosbbl/grunnmuren-icons-react';
import { createFileRoute, notFound } from '@tanstack/react-router';
import type * as props from 'docgen';
import { defineQuery } from 'groq';

const COMPONENT_QUERY = defineQuery(
  `*[_type == "component" && slug.current == $slug][0]{ content, "name": coalesce(name, ''), propsComponents, resoureceLinks }`,
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

  const ghLink = data.resourceLinks?.find(
    (link) => link.linkType === 'github',
  )?.url;
  const figmaLink = data.resourceLinks?.find(
    (link) => link.linkType === 'figma',
  )?.url;

  return (
    <>
      <h1 className="heading-l mb-4 mt-9">{data.name}</h1>

      <div className="mb-12 flex gap-6">
        {ghLink && (
          <a className="flex gap-2" href={ghLink}>
            <Github />
            GitHub
          </a>
        )}
        {figmaLink && (
          <a className="flex gap-2" href={figmaLink}>
            <Figma />
            Figma
          </a>
        )}
      </div>

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
