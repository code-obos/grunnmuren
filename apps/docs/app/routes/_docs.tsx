import appCss from '@/app.css?url';
import {sanityFetch} from '@/lib/sanity'
import { Footer } from '@/ui/footer';
import { MainNav } from '@/ui/main-nav';
import { GrunnmurenProvider } from '@obosbbl/grunnmuren-react';
import {
  type NavigateOptions,
  Outlet,
  ScrollRestoration,
  type ToOptions,
  createFileRoute,
  useRouter,
} from '@tanstack/react-router';
import {defineQuery} from 'groq'

const COMPONENTS_QUERY = defineQuery(`*[_type == "component"]{_id,name,slug} | order(name asc)`)

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
  loader: () => sanityFetch({ query: COMPONENTS_QUERY }),
});

function RootLayout() {
  const router = useRouter();

  const data = Route.useLoaderData();
  console.log(data)

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
        <div className="grid min-h-screen lg:flex">
          <div className="flex grow flex-col px-6">
            <main className="grow">
              <Outlet />
            </main>
            <Footer />
          </div>
          <MainNav />
        </div>
      </GrunnmurenProvider>
      <ScrollRestoration />
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
