import {
  Outlet,
  ScrollRestoration,
  createRootRoute,
} from '@tanstack/react-router';
import { Meta, Scripts } from '@tanstack/start';
import type { ReactNode } from 'react';
import appCss from '@/app.css?url';
import { MainNav } from '@/ui/MainNav';

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
      <Outlet />
    </RootDocument>
  );
}

function RootDocument({ children }: Readonly<{ children: ReactNode }>) {
  return (
    <html lang="no">
      <head>
        <Meta />
      </head>
      <body className="lg:flex lg:gap-x-6">
        <MainNav />
        <main className="grow">{children}</main>
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  );
}
