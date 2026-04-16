import { ChevronDown } from '@obosbbl/grunnmuren-icons-react';
import { Heading } from '@obosbbl/grunnmuren-react';
import { getRouteApi, Link } from '@tanstack/react-router';
import { cx } from 'cva';
import { Button, Disclosure, DisclosurePanel } from 'react-aria-components';

import { ComponentStateBadge } from './component-state-badge';

type SubNavItemProps = {
  to: string;
  title: string;
  componentState?: 'new' | 'deprecated' | 'beta' | 'stable' | null;
};

const SubNavItem = ({ to, title, componentState }: SubNavItemProps) => {
  return (
    <li>
      <Link
        to={to}
        className="description focus-visible:outline-focus focus-visible:outline-focus-inset flex items-center justify-between gap-2 rounded-md px-3 py-2 data-[status=active]:font-bold data-[status=active]:no-underline"
      >
        {title}
        <ComponentStateBadge componentState={componentState} />
      </Link>
    </li>
  );
};

type MainNavItemProps = {
  title: string;
  to?: string;
  subNavItems?: SubNavItemProps[];
};

const MainNavItem = ({ to, title, subNavItems }: MainNavItemProps) => (
  <li>
    {subNavItems ? (
      <Disclosure>
        <Heading level={2}>
          <Button
            slot="trigger"
            className="group focus-visible:outline-focus focus-visible:outline-focus-inset flex w-full cursor-pointer place-items-center justify-between rounded-md p-3 font-semibold"
          >
            {title}
            <ChevronDown className="flex-none transition-transform duration-300 group-aria-expanded:rotate-180 motion-reduce:transition-none" />
          </Button>
        </Heading>
        <DisclosurePanel>
          <ul className="grid gap-y-3.5 px-3">
            {subNavItems.map((subNavItem) => (
              <SubNavItem key={subNavItem.to} {...subNavItem} />
            ))}
          </ul>
        </DisclosurePanel>
      </Disclosure>
    ) : (
      <ul>
        <Link
          to={to}
          className="group focus-visible:outline-focus focus-visible:outline-focus-inset flex w-full cursor-pointer place-items-center justify-between rounded-md p-3 font-semibold data-[status=active]:font-bold data-[status=active]:no-underline"
        >
          {title}
        </Link>
      </ul>
    )}
  </li>
);

const mainNavItems = [
  {
    title: 'Profil',
    subNavItems: [
      {
        to: '/profil/farger',
        title: 'Farger',
      },
      {
        to: '/profil/ikoner',
        title: 'Ikoner',
      },
      {
        to: '/profil/layout',
        title: 'Layout',
      },
    ],
  },
];

type MainNavProps = {
  className?: string;
};

export const MainNav = ({ className }: MainNavProps) => {
  const routeApi = getRouteApi('/_docs');
  const { data } = routeApi.useLoaderData();

  // Extract components and menu data
  const components = data.components ?? [];
  const menuData = data.menu ?? { categories: [] };

  const componentsNavLinks = components.map((component) => ({
    to: `/komponenter/${component.slug}`,
    title: component.name as string,
    componentState: component.componentState,
  }));

  // Transform categories into nav items
  const categoryNavItems =
    menuData.categories?.map((category) => ({
      title: category.title ?? '',
      subNavItems:
        category.categoryItems?.map((item) => ({
          to: `/${item.slug}`,
          title: item.name ?? '',
        })) ?? [],
    })) ?? [];

  return (
    <nav
      className={cx('bg-sky-lightest max-w-full shrink-0 basis-80 px-5 py-9', className)}
      aria-label="Navigasjonsmeny for grunnmuren"
    >
      <ul>
        {categoryNavItems.map((categoryItem) => (
          <MainNavItem key={categoryItem.title} {...categoryItem} />
        ))}

        <hr className="my-4" />
        {mainNavItems.map((mainNavItem) => (
          <MainNavItem key={mainNavItem.title} {...mainNavItem} />
        ))}

        <MainNavItem title="Komponenter" subNavItems={componentsNavLinks} />

        <MainNavItem title="Referanseskjema" to="/referanseskjema" />
      </ul>
    </nav>
  );
};
