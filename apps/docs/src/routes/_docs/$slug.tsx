import { sanityFetch } from '@/lib/sanity';
import { ResourceLink, ResourceLinks } from '@/ui/resource-links';
import { SanityContent } from '@/ui/sanity-content';
import { ScrollToTop } from '@/ui/scroll-to-top';
import { TableOfContentsNav } from '@/ui/table-of-contents-nav';
import { createFileRoute, notFound } from '@tanstack/react-router';
import { defineQuery } from 'groq';

const INFO_QUERY = defineQuery(
  `*[_type == "info"
  && slug.current == $slug][0]{
    "content": content[] {
      ...,
      _type == "image-with-caption" => {
        ...,
        asset->
      }
    },
    "name": coalesce(name, ''),
    resourceLinks,
  }`,
);

export const Route = createFileRoute('/_docs/$slug')({
  component: Page,
  loader: async ({ params }) => {
    const res = await sanityFetch({
      query: INFO_QUERY,
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

  return (
    <>
      <h1 className="heading-l my-12">{data.name}</h1>
      {data.resourceLinks && (
        <ResourceLinks className="mb-12">
          {data.resourceLinks?.map(
            ({ url, linkType = 'other', text, _key }) =>
              url && (
                <ResourceLink
                  key={_key}
                  type={linkType}
                  href={url}
                  text={text}
                />
              ),
          )}
        </ResourceLinks>
      )}
      <div className="lg:relative lg:flex lg:gap-4 lg:pt-9">
        <TableOfContentsNav
          className="w-56 lg:sticky lg:top-9 lg:order-1 lg:shrink-0"
          content={data.content}
        />

        <SanityContent className="mb-12 grow" content={data.content ?? []} />
        <ScrollToTop />
      </div>
    </>
  );
}
