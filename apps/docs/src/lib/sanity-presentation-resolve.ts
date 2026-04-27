import { defineLocations, type PresentationPluginOptions } from 'sanity/presentation';

function getCategoryHref(title: string) {
  const normalized = title.trim().toLowerCase();

  if (normalized === 'profil') {
    return '/profil/';
  }

  if (normalized === 'komponenter') {
    return '/komponenter/';
  }

  return null;
}

function getCategoryItemHref(
  categoryTitle: string,
  item: { slug?: string | null; type?: string | null },
) {
  const slug = typeof item.slug === 'string' && item.slug.length > 0 ? item.slug : '';

  if (!slug) {
    return null;
  }

  if (item.type === 'component') {
    return `/komponenter/${slug}`;
  }

  const normalizedCategory = categoryTitle.trim().toLowerCase();

  if (normalizedCategory === 'profil') {
    if (slug === 'farger' || slug === 'ikoner' || slug === 'layout') {
      return `/profil/${slug}`;
    }

    return '/profil/';
  }

  return `/${slug}`;
}

export const presentationResolve: PresentationPluginOptions['resolve'] = {
  locations: {
    info: defineLocations({
      select: {
        title: 'name',
        slug: 'slug.current',
      },
      resolve: (doc) => {
        const slug = typeof doc?.slug === 'string' && doc.slug.length > 0 ? doc.slug : '';

        return {
          locations: slug
            ? [
                {
                  title: doc?.title || 'Info',
                  href: `/${slug}`,
                },
              ]
            : [],
        };
      },
    }),
    component: defineLocations({
      select: {
        title: 'name',
        slug: 'slug.current',
      },
      resolve: (doc) => {
        const slug = typeof doc?.slug === 'string' && doc.slug.length > 0 ? doc.slug : '';

        return {
          locations: slug
            ? [
                {
                  title: 'Komponenter',
                  href: '/komponenter/',
                },
                {
                  title: doc?.title || 'Component',
                  href: `/komponenter/${slug}`,
                },
              ]
            : [],
        };
      },
    }),
    category: defineLocations({
      select: {
        title: 'title',
        categoryItems: 'categoryItems[]->{_type, "slug": slug.current, name}',
      },
      resolve: (doc) => {
        const title = typeof doc?.title === 'string' ? doc.title : '';
        const indexHref = title ? getCategoryHref(title) : null;

        const itemLocations = Array.isArray(doc?.categoryItems)
          ? doc.categoryItems
              .map((item) => {
                const href = getCategoryItemHref(title, {
                  slug: typeof item?.slug === 'string' ? item.slug : null,
                  type: typeof item?._type === 'string' ? item._type : null,
                });

                if (!href) {
                  return null;
                }

                return {
                  title: typeof item?.name === 'string' && item.name.length > 0 ? item.name : href,
                  href,
                };
              })
              .filter((location): location is { title: string; href: string } => location !== null)
          : [];

        return {
          locations: [
            ...(indexHref
              ? [
                  {
                    title: title || 'Category',
                    href: indexHref,
                  },
                ]
              : []),
            ...itemLocations,
          ],
        };
      },
    }),
    menu: defineLocations({
      select: {
        categories: 'categories[]->{title, categoryItems[]->{_type, "slug": slug.current, name}}',
      },
      resolve: (doc) => {
        const categoryLocations = Array.isArray(doc?.categories)
          ? doc.categories
              .flatMap((category) => {
                const categoryTitle = typeof category?.title === 'string' ? category.title : '';
                const categoryIndexHref = categoryTitle ? getCategoryHref(categoryTitle) : null;

                const items = Array.isArray(category?.categoryItems)
                  ? category.categoryItems
                      .map((item) => {
                        const href = getCategoryItemHref(categoryTitle, {
                          slug: typeof item?.slug === 'string' ? item.slug : null,
                          type: typeof item?._type === 'string' ? item._type : null,
                        });

                        if (!href) {
                          return null;
                        }

                        return {
                          title:
                            typeof item?.name === 'string' && item.name.length > 0
                              ? item.name
                              : href,
                          href,
                        };
                      })
                      .filter(
                        (location): location is { title: string; href: string } =>
                          location !== null,
                      )
                  : [];

                return [
                  ...(categoryIndexHref
                    ? [
                        {
                          title: categoryTitle,
                          href: categoryIndexHref,
                        },
                      ]
                    : []),
                  ...items,
                ];
              })
              .filter((location) => location.href !== '/')
          : [];

        return {
          locations: [
            {
              title: 'Forside',
              href: '/',
            },
            ...categoryLocations,
          ],
        };
      },
    }),
  },
};
