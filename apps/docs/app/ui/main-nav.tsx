import logoUrl from '@/assets/obos_liggende_hus_svart_rgb.png?url';
import { ChevronDown } from '@obosbbl/grunnmuren-icons-react';
import { Heading } from '@obosbbl/grunnmuren-react';
import { getRouteApi } from '@tanstack/react-router';
import { Link } from '@tanstack/react-router';
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
        className="description flex items-center justify-between gap-2 rounded-md px-3 py-2 focus-visible:outline-focus focus-visible:outline-focus-inset data-[status=active]:font-bold data-[status=active]:no-underline"
      >
        {title}
        <ComponentStateBadge componentState={componentState} />
      </Link>
    </li>
  );
};

type MainNavItemProps = {
  title: string;
  subNavItems: SubNavItemProps[];
};

const MainNavItem = ({ title, subNavItems }: MainNavItemProps) => (
  <li>
    <Disclosure>
      <Heading level={2}>
        <Button
          slot="trigger"
          className="group flex w-full cursor-pointer place-items-center justify-between rounded-md p-3 font-semibold focus-visible:outline-focus-inset data-[focus-visible]:outline-focus [&:not([data-focus-visible])]:outline-none"
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
    ],
  },
];

export const MainNav = () => {
  const routeApi = getRouteApi('/_docs');
  const { data } = routeApi.useLoaderData();

  const componentsNavLinks = data.map((component) => ({
    to: `/komponenter/${component.slug}`,
    title: component.name as string,
    componentState: component.componentState,
  }));

  return (
    <nav
      className="-order-1 w-72 max-w-full bg-sky-lightest px-5 py-9"
      aria-label="Navigasjonsmeny for grunnmuren"
    >
      <Link
        to="/"
        aria-label="Gå til forsiden"
        className="mb-6 ml-3 inline-block"
      >
        <img src={logoUrl} alt="" className="max-w-32" />
      </Link>

      <ul>
        <MainNavItem title="Komponenter" subNavItems={componentsNavLinks} />
        {mainNavItems.map((mainNavItem) => (
          <MainNavItem key={mainNavItem.title} {...mainNavItem} />
        ))}
      </ul>
    </nav>
  );
};
