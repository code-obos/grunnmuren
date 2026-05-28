import { createFileRoute, notFound } from '@tanstack/react-router';
import { defineQuery } from 'groq';

import { infoDocs } from '@/lib/content';
import { sanityFetch } from '@/lib/sanity';
import { MdxInfoPage } from '@/ui/mdx-doc';
import { ResourceLink, type ResourceLinkProps, ResourceLinks } from '@/ui/resource-links';
import { SanityContent } from '@/ui/sanity-content';
import { ScrollToTop } from '@/ui/scroll-to-top';
import { TableOfContentsNav, type TableOfContentsSection } from '@/ui/table-of-contents-nav';

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
    // Prefer migrated MDX; fall back to Sanity for not-yet-migrated info pages.
    const mdxDoc = infoDocs[params.slug];
    if (mdxDoc) {
      return { source: 'mdx' as const, frontmatter: mdxDoc.frontmatter, toc: mdxDoc.toc };
    }

    const res = await sanityFetch({
      query: INFO_QUERY,
      params: { slug: params.slug },
    });

    if (res.data == null) {
      throw notFound();
    }

    return { source: 'sanity' as const, data: res.data };
  },
  head: (ctx) => {
    const name =
      ctx.loaderData?.source === 'mdx'
        ? ctx.loaderData.frontmatter.name
        : ctx.loaderData?.data?.name;
    return {
      meta: [
        { title: `${name} | Grunnmuren` },
        {
          name: 'description',
          content: `Grunnmuren dokumentasjon - ${name}`,
        },
      ],
    };
  },
});

function Page() {
  const loaderData = Route.useLoaderData();
  const { slug } = Route.useParams();

  if (loaderData.source === 'mdx') {
    const doc = infoDocs[slug];
    return <MdxInfoPage doc={doc} toc={loaderData.toc} frontmatter={loaderData.frontmatter} />;
  }

  const { data } = loaderData;

  const tocSections: TableOfContentsSection[] = (data?.content ?? []).flatMap((block) =>
    block._type === 'block' && block.style === 'h2'
      ? [{ href: `#${block._key}`, text: block.children?.[0].text ?? '' }]
      : [],
  );

  return (
    <>
      <h1 className="heading-l my-12">{data?.name}</h1>
      {data?.resourceLinks && (
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
      <TableOfContentsNav sections={tocSections} />
      <div className="lg:relative lg:flex lg:gap-4 lg:pt-9">
        <SanityContent className="mb-12 grow" content={data?.content ?? []} />
        <ScrollToTop />
      </div>
    </>
  );
}
