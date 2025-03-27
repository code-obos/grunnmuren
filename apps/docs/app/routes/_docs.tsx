import logoUrl from '@/assets/OBOS_Hvit_Liggende.png?url';
import { sanityFetch } from '@/lib/sanity';
import appCss from '@/styles/app.css?url';
import { Footer } from '@/ui/footer';
import { MainNav } from '@/ui/main-nav';
import { Close, Menu } from '@obosbbl/grunnmuren-icons-react';
import {
  GrunnmurenProvider,
  UNSAFE_Disclosure as Disclosure,
  UNSAFE_DisclosurePanel as DisclosurePanel,
  UNSAFE_DisclosureButton as DisclosureButton,
} from '@obosbbl/grunnmuren-react';
import {
  type NavigateOptions,
  Outlet,
  type ToOptions,
  createFileRoute,
  useRouter,
} from '@tanstack/react-router';
import { Link } from '@tanstack/react-router';
import { defineQuery } from 'groq';

const COMPONENTS_NAVIGATION_QUERY = defineQuery(
  // make sure the slug is always a string so we don't have add fallback value in code just to make TypeScript happy
  `*[_type == "component"]{ _id, name, 'slug': coalesce(slug.current, ''), componentState} | order(name asc)`,
);

// This is the shared layout for all the Grunnmuren docs pages that are "public", ie not the Sanity studio
export const Route = createFileRoute('/_docs')({
  component: RootLayout,
  head: () => ({
    links: [{ rel: 'stylesheet', href: appCss }],
    meta: [
      {
        title: "Grunnmuren - OBOS' Design System",
      },
    ],
  }),
  loader: () => sanityFetch({ query: COMPONENTS_NAVIGATION_QUERY }),
});

function RootLayout() {
  const router = useRouter();

  return (
    <>
      <GrunnmurenProvider
        locale="nb"
        // This integrates RAC/Grunnmuren with TanStack router
        // Giving us typesafe routes
        // See https://react-spectrum.adobe.com/react-aria/routing.html#tanstack-router
        navigate={(to, options) => router.navigate({ to, ...options })}
        useHref={(to) => router.buildLocation({ to }).href}
      >
        <Disclosure>
          {({ isExpanded }) => (
            <>
              <header className="relative z-[3] flex items-center justify-between bg-blue-dark px-8 py-2 text-white">
                <Link to="/" aria-label="Gå til forsiden" className="py-2.5">
                  <img src={logoUrl} alt="" className="h-6" />
                </Link>
                <DisclosureButton className="lg:hidden" aria-label="Meny">
                  {isExpanded ? (
                    <Close className="h-6 w-6" />
                  ) : (
                    <Menu className="h-6 w-6" />
                  )}
                </DisclosureButton>
              </header>
              <div className="relative lg:hidden">
                <div className="absolute top-0 left-0 z-[3] w-full">
                  <DisclosurePanel>
                    <MainNav className="min-h-svh" />
                  </DisclosurePanel>
                </div>
              </div>
              {isExpanded && (
                <div className="absolute inset-0 z-[2] bg-black opacity-70" />
              )}
            </>
          )}
        </Disclosure>

        <div className="grid min-h-screen lg:flex">
          <MainNav className="hidden lg:block" />
          <div className="flex grow flex-col px-6">
            <main className="grow">
              <Outlet />
            </main>
            <Footer />
          </div>
        </div>
      </GrunnmurenProvider>
    </>
  );
}

// See comments on GrunnmurenProvider in <RootLayout />
declare module 'react-aria-components' {
  interface RouterConfig {
    href: ToOptions['to'];
    routerOptions: Omit<NavigateOptions, keyof ToOptions>;
  }
}
