import { sanityFetch } from '@/lib/sanity';
import { AnchorHeading } from '@/ui/anchor-heading';
import { PropsTable } from '@/ui/props-table';
import { ResourceLink, ResourceLinks } from '@/ui/resource-links';
import { SanityContent } from '@/ui/sanity-content';
import { Child, CircusTent } from '@obosbbl/grunnmuren-icons-react';
import { Alertbox, Content } from '@obosbbl/grunnmuren-react';
import { createFileRoute, notFound } from '@tanstack/react-router';
import type * as props from 'docgen';
import { defineQuery } from 'groq';

const COMPONENT_QUERY = defineQuery(
  `*[_type == "component"
  && slug.current == $slug][0]{
    "content": content[] {
      ...,
      _type == "image-with-caption" => {
        ...,
        asset->
      }
    },
    "name": coalesce(name, ''),
    propsComponents,
    resourceLinks,
    componentState,
  }`,
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
      <h1 className="heading-l mt-9 mb-4">{data.name}</h1>

      <ResourceLinks className="mb-12">
        {figmaLink && <ResourceLink type="figma" href={figmaLink} />}
        {ghLink && <ResourceLink type="github" href={ghLink} />}
      </ResourceLinks>

      {data.componentState === 'new' && (
        // biome-ignore lint/a11y/useValidAriaRole: <explanation>
        <Alertbox
          variant="success"
          className="mb-12 w-fit"
          icon={Child}
          role="none"
        >
          <Content>
            <p>
              Denne komponenten er ny eller har nylig fått større endringer.
            </p>
            <p>
              Ta den i bruk og kom gjerne med innspill til oss på{' '}
              <a href="https://obos.slack.com/archives/C03FR05FJ9F">Slack</a>{' '}
              hvordan du synes den fungerer.
            </p>
          </Content>
        </Alertbox>
      )}

      {data.componentState === 'beta' && (
        // biome-ignore lint/a11y/useValidAriaRole: <explanation>
        <Alertbox
          variant="warning"
          className="mb-12 w-fit"
          icon={CircusTent}
          role="none"
        >
          <Content>
            <p>
              Denne komponenten er under aktiv utvikling, og vi trenger din
              feedback!
            </p>
            <p>
              Er du eventyrlysten, test den og kom med innspill til oss på{' '}
              <a href="https://obos.slack.com/archives/C03FR05FJ9F">Slack</a>.
            </p>
          </Content>
        </Alertbox>
      )}

      <SanityContent className="mb-12" content={data.content ?? []} />

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
