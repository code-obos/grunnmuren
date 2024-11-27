import appCss from '@/app.css?url';
import { MainNav } from '@/ui/main-nav';
import { GrunnmurenProvider } from '@obosbbl/grunnmuren-react';
import {
  Outlet,
  ScrollRestoration,
  createRootRoute,
} from '@tanstack/react-router';
import { Meta, Scripts } from '@tanstack/start';
import type { ReactNode } from 'react';

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
  component: RootComponent,
});

function RootComponent() {
  return (
    <RootDocument>
      <GrunnmurenProvider locale="nb">
        <Outlet />
      </GrunnmurenProvider>
    </RootDocument>
  );
}

function RootDocument({ children }: Readonly<{ children: ReactNode }>) {
  return (
    <html lang="no">
      <head>
        <Meta />
      </head>
      <body className="grid gap-6 lg:flex">
        <main className="grow">{children}</main>
        <MainNav />
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  );
}
