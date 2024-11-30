import appCss from '@/app.css?url';
import { Footer } from '@/ui/footer';
import { MainNav } from '@/ui/main-nav';
import { GrunnmurenProvider } from '@obosbbl/grunnmuren-react';
import {
  type NavigateOptions,
  Outlet,
  ScrollRestoration,
  type ToOptions,
  createRootRoute,
  useRouter,
} from '@tanstack/react-router';
import { Meta, Scripts } from '@tanstack/start';

export const Route = createRootRoute({
  head: () => ({
    meta: [
      {
        charSet: 'utf-8',
      },
      {
        name: 'viewport',
        content: 'width=device-width, initial-scale=1',
      },
      {
        title: "Grunnmuren - OBOS' Design System",
      },
    ],
    links: [{ rel: 'stylesheet', href: appCss }],
  }),
  component: RootDocument,
});

function RootDocument() {
  const router = useRouter();

  return (
    <html lang="no">
      <head>
        <Meta />
      </head>
      <body>
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
        <Scripts />
      </body>
    </html>
  );
}

// See comments on GrunnmurenProvider in <RootDocument />
declare module 'react-aria-components' {
  interface RouterConfig {
    href: ToOptions['to'];
    routerOptions: Omit<NavigateOptions, keyof ToOptions>;
  }
}
