import { sanityFetch } from '@/lib/sanity';
import { AnchorHeading } from '@/ui/anchor-heading';
import { Content } from '@/ui/content';
import { PropsTable } from '@/ui/props-table';
import { ResourceLink, ResourceLinks } from '@/ui/resource-links';
import { createFileRoute, notFound } from '@tanstack/react-router';
import type * as props from 'docgen';
import { defineQuery } from 'groq';

const COMPONENT_QUERY = defineQuery(
  `*[_type == "component" && slug.current == $slug][0]{ "content": content[] {..., _type == "image-with-caption" => {...,asset->}}, "name": coalesce(name, ''), propsComponents, resourceLinks }`,
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

      <ResourceLinks className="mb-12">
        {figmaLink && <ResourceLink type="figma" href={figmaLink} />}
        {ghLink && <ResourceLink type="github" href={ghLink} />}
      </ResourceLinks>

      <Content className="mb-12" content={data.content ?? []} />

      {data.propsComponents?.length && (
        <AnchorHeading className="heading-m" level={2} id="props">
          Props
        </AnchorHeading>
      )}
      {data.propsComponents?.map((componentName) => (
        <PropsTable
          key={componentName}
          componentName={componentName as keyof typeof props}
        />
      ))}
    </>
  );
}
