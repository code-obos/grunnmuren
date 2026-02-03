import { Close, Menu } from '@obosbbl/grunnmuren-icons-react';
import {
  Disclosure,
  DisclosureButton,
  DisclosurePanel,
  GrunnmurenProvider,
} from '@obosbbl/grunnmuren-react';
import {
  createFileRoute,
  Link,
  type NavigateOptions,
  Outlet,
  type ToOptions,
  useRouter,
} from '@tanstack/react-router';
import { defineQuery } from 'groq';
import { useEffect, useState } from 'react';
import logoUrl from '@/assets/OBOS_Hvit_Liggende.svg?url';
import { sanityFetch } from '@/lib/sanity';
import appCss from '@/styles/app.css?url';
import { Footer } from '@/ui/footer';
import { MainNav } from '@/ui/main-nav';

const NAVIGATION_QUERY = defineQuery(`{
  "components": *[_type == "component"]{ _id, name, 'slug': coalesce(slug.current, ''), componentState} | order(name asc),
  "menu": *[_type == "menu"][0]{
    categories[]->{
      title,
      "slug": slug.current,
      categoryItems[]->{
        name,
        "slug": slug.current
      }
    }
  }
}`);

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
  scripts: () =>
    process.env.NODE_ENV === 'production'
      ? [
          {
            src: 'https://cdn.cookielaw.org/scripttemplates/otSDKStub.js',
            'data-language': 'no',
            type: 'text/javascript',
            'data-domain-script': 'ea448f9e-5a74-4f6e-9260-c61b81f67013',
          },
          {
            type: 'text/javascript',
            children: 'function OptanonWrapper() {}',
          },
          {
            src: 'https://www.obos.no/collector.js',
            type: 'module',
            id: 'collector-script',
            'data-api-key': 'b85ae7f346517c8070821d6b66e9d69e',
            'data-app-name': 'grunnmuren',
            'data-enable-session-replay': 'true',
            crossOrigin: '',
          },
        ]
      : [],
  loader: () => sanityFetch({ query: NAVIGATION_QUERY }),
});

function RootLayout() {
  const router = useRouter();

  const [isMobileNavExpanded, setIsMobileNavExpanded] = useState(false);

  useEffect(() => {
    const unsubscribe = router.history.subscribe(() => {
      setIsMobileNavExpanded(false);
    });

    return () => {
      unsubscribe();
    };
  }, [router]);

  return (
    <GrunnmurenProvider
      locale="nb"
      // This integrates RAC/Grunnmuren with TanStack router
      // Giving us typesafe routes
      // See https://react-spectrum.adobe.com/react-aria/routing.html#tanstack-router
      navigate={(href, options) =>
        router.navigate({
          ...href,
          ...options,
        })
      }
      useHref={(href) => {
        // If it's an absolute URL, return it as it is instead of building a tanstack link
        if (typeof href === 'string' && URL.canParse(href)) {
          return href;
        }
        return router.buildLocation({ ...href }).href;
      }}
    >
      <Disclosure
        isExpanded={isMobileNavExpanded}
        onExpandedChange={setIsMobileNavExpanded}
      >
        <header className="relative z-3 flex items-center justify-between bg-blue-dark px-8 py-2 text-white">
          <Link to="/" aria-label="Gå til forsiden" className="py-2.5">
            <img src={logoUrl} alt="" className="h-6" />
          </Link>
          <DisclosureButton className="lg:hidden" aria-label="Meny">
            {isMobileNavExpanded ? (
              <Close className="h-6 w-6" />
            ) : (
              <Menu className="h-6 w-6" />
            )}
          </DisclosureButton>
        </header>
        <div className="relative lg:hidden">
          <div className="absolute top-0 left-0 z-3 w-full">
            <DisclosurePanel>
              <MainNav className="min-h-svh" />
            </DisclosurePanel>
          </div>
        </div>
        {isMobileNavExpanded && (
          <div className="absolute inset-0 z-2 bg-black opacity-70 lg:hidden" />
        )}
      </Disclosure>

      <div className="min-h-screen lg:flex">
        <MainNav className="hidden lg:block" />
        <div className="flex grow flex-col px-6">
          <main className="grow">
            <Outlet />
          </main>
          <Footer />
        </div>
      </div>
    </GrunnmurenProvider>
  );
}

// Configure the type of the `href` and `routerOptions` props on all React Aria components.
declare module 'react-aria-components' {
  interface RouterConfig {
    href: ToOptions;
    routerOptions: Omit<NavigateOptions, keyof ToOptions>;
  }
}
