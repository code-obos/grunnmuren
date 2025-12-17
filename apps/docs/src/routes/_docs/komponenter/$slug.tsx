import { Child, CircusTent } from '@obosbbl/grunnmuren-icons-react';
import { Alertbox, Content } from '@obosbbl/grunnmuren-react';
import { createFileRoute, notFound } from '@tanstack/react-router';
import type * as props from 'component-props';
import { defineQuery } from 'groq';
import { sanityFetch } from '@/lib/sanity';
import { AnchorHeading } from '@/ui/anchor-heading';
import { PropsTable } from '@/ui/props-table';
import {
  ResourceLink,
  type ResourceLinkProps,
  ResourceLinks,
} from '@/ui/resource-links';
import { SanityContent } from '@/ui/sanity-content';
import { ScrollToTop } from '@/ui/scroll-to-top';
import { TableOfContentsNav } from '@/ui/table-of-contents-nav';

const COMPONENT_QUERY = defineQuery(
  `*[_type == "component"
  && slug.current == $slug][0]{
    "content": content[] {
      ...,
      _type == "image-with-caption" => {
        ...,
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

    if (res.data === null) {
      throw notFound();
    }

    return res.data as any;
  },
  head: (ctx) => ({
    meta: [
      { title: `${ctx.loaderData.name} | Komponenter | Grunnmuren` },
      {
        name: 'description',
        content: `Grunnmuren sine komponenter - ${ctx.loaderData.name}`,
      },
    ],
  }),
});

function Page() {
  const data = Route.useLoaderData();

  const _ghLink = data.resourceLinks?.find(
    (link) => link.linkType === 'github',
  )?.url;
  const _figmaLink = data.resourceLinks?.find(
    (link) => link.linkType === 'figma',
  )?.url;

  return (
    <>
      <h1 className="heading-l my-12">{data.name}</h1>

      <ResourceLinks className="mb-12">
        {data.resourceLinks?.map(
          ({ url, linkType = 'other', text, _key }) =>
            url && (
              <ResourceLink
                key={_key}
                type={linkType as ResourceLinkProps['type']}
                href={url}
                text={text}
              />
            ),
        )}
      </ResourceLinks>
      <TableOfContentsNav
        content={data.content}
        propsTables={data.propsComponents}
      />
      <div className="lg:relative lg:flex lg:gap-4">
        <div>
          {data.componentState === 'new' && (
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
                  <a href="https://obos.slack.com/archives/C03FR05FJ9F">
                    Slack
                  </a>{' '}
                  hvordan du synes den fungerer.
                </p>
              </Content>
            </Alertbox>
          )}

          {data.componentState === 'beta' && (
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
                  <a href="https://obos.slack.com/archives/C03FR05FJ9F">
                    Slack
                  </a>
                  .
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
        </div>
      </div>

      <ScrollToTop />
    </>
  );
}
