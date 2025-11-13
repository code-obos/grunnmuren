import { createFileRoute, notFound } from '@tanstack/react-router';
import { defineQuery } from 'groq';
import { sanityFetch } from '@/lib/sanity';
import {
  ResourceLink,
  type ResourceLinkProps,
  ResourceLinks,
} from '@/ui/resource-links';
import { SanityContent } from '@/ui/sanity-content';
import { ScrollToTop } from '@/ui/scroll-to-top';
import { TableOfContentsNav } from '@/ui/table-of-contents-nav';

const INFO_QUERY = defineQuery(
  `*[_type == "info"
  && slug.current == $slug][0]{
    "content": content[] {
      ...,
      _type == "image-with-caption" => {
        ...,
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

    return res as any;
  },
  head: (ctx) => {
    return {
      meta: [
        { title: `Grunnmuren - ${ctx.loaderData.data.name}` },
        {
          name: 'description',
          content: `Grunnmuren dokumentasjon - ${ctx.loaderData.data.name}`,
        },
      ],
    };
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
                  type={linkType as ResourceLinkProps['type']}
                  href={url}
                  text={text}
                />
              ),
          )}
        </ResourceLinks>
      )}
      <TableOfContentsNav content={data.content} />
      <div className="lg:relative lg:flex lg:gap-4 lg:pt-9">
        <SanityContent className="mb-12 grow" content={data.content ?? []} />
        <ScrollToTop />
      </div>
    </>
  );
}
