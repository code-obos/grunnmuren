import { sanityFetch } from '@/lib/sanity';
import { AnchorHeading } from '@/ui/anchor-heading';
import { PropsTable } from '@/ui/props-table';
import { ResourceLink, ResourceLinks } from '@/ui/resource-links';
import { SanityContent } from '@/ui/sanity-content';
import { TableOfContentsNav } from '@/ui/table-of-contents-nav';
import { ArrowUp, Child, CircusTent } from '@obosbbl/grunnmuren-icons-react';
import { Alertbox, Content } from '@obosbbl/grunnmuren-react';
import { createFileRoute, notFound } from '@tanstack/react-router';
import { useEffect, useState } from 'react';
import type * as props from 'component-props';
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
  const [showScrollToTop, setShowScrollToTop] = useState(false);

  // Show/hide scroll to top button based on scroll position
  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY || document.documentElement.scrollTop;
      setShowScrollToTop(scrollTop > 300); // Show after scrolling 300px
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  const ghLink = data.resourceLinks?.find(
    (link) => link.linkType === 'github',
  )?.url;
  const figmaLink = data.resourceLinks?.find(
    (link) => link.linkType === 'figma',
  )?.url;

  return (
    <>
      <h1 className="heading-l my-12">{data.name}</h1>

      <ResourceLinks className="mb-12">
        {data.resourceLinks?.map(
          ({ url, linkType = 'other', text, _key }) =>
            url && (
              <ResourceLink key={_key} type={linkType} href={url} text={text} />
            ),
        )}
      </ResourceLinks>
      <div className="lg:relative lg:flex lg:gap-4">
        <TableOfContentsNav
          className="hidden w-56 lg:sticky lg:top-9 lg:order-1 lg:block lg:shrink-0"
          content={data.content}
          propsTables={data.propsComponents}
        />
        <div>
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
                  <a href="https://obos.slack.com/archives/C03FR05FJ9F">
                    Slack
                  </a>{' '}
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
          <div className="overflow-x-auto">
            {data.propsComponents?.map((componentName) => (
              <PropsTable
                key={componentName}
                componentName={componentName as keyof typeof props}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Scroll to top button */}
      {showScrollToTop && (
        <div className="fixed right-4 bottom-4 z-50 flex flex-col items-center md:right-16 md:bottom-16">
          <button
            onClick={scrollToTop}
            className="flex h-12 w-12 items-center justify-center rounded-full bg-blue-dark transition-all duration-300 hover:animate-spin focus-visible:outline-focus"
            aria-label="Scroll to top"
            type="button"
          >
            <ArrowUp className="h-6 w-6 text-white" />
          </button>
          <span className="mt-2 font-medium">Til tops</span>
        </div>
      )}
    </>
  );
}
