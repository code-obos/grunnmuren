import { sanityFetch } from '@/lib/sanity';
import { createFileRoute, notFound } from '@tanstack/react-router';
import { defineQuery } from 'groq';

const COMPONENT_QUERY = defineQuery(
  // make sure the slug is always a string so we don't have add fallback value in code just to make TypeScript happy
  `*[_type == "component" && slug == $slug][0]{ name }`,
);

export const Route = createFileRoute('/_docs/komponenter/$slug')({
  component: Page,
  loader: async ({ params }) => {
    const res = await sanityFetch({
      query: COMPONENT_QUERY,
      params: { slug: params.slug },
    });

    if (!res.data) {
      throw notFound();
    }
    return res;
  },
});

function Page() {
  const { data } = Route.useLoaderData();

  return (
    <>
      <h1 className="heading-l mb-12 mt-9">{data?.name}</h1>
      {/* <div className="prose">
        <p>{data}</p>
      </div> */}

      {/* <PropsTable props={BadgeDoc.props} /> */}
    </>
  );
}
