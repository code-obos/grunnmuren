import { sanityFetch } from '@/lib/sanity';
import { PropsTable } from '@/ui/props-table';
import { createFileRoute, notFound } from '@tanstack/react-router';
import * as props from 'docgen';
import { defineQuery } from 'groq';

const COMPONENT_QUERY = defineQuery(
  `*[_type == "component" && slug.current == $slug][0]{ name }`,
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

    const componentName = res.data.name;
    const componentProps = props[componentName as string].props;

    return { data: res.data, componentProps }
  },
});

function Page() {
  const { data, componentProps } = Route.useLoaderData();

  return (
    <>
      <h1 className="heading-l mb-12 mt-9">{data.name}</h1>
      {/* <div className="prose">
        <p>{data}</p>
      </div> */}

      <PropsTable props={componentProps} />
    </>
  );
}
