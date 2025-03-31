import {
  HeadContent,
  Outlet,
  Scripts,
  createRootRoute,
} from '@tanstack/react-router';
import { TanStackRouterDevtools } from '@tanstack/react-router-devtools';

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
    ],
  }),
  component: RootDocument,
});

function RootDocument() {
  return (
    <html lang="no">
      <head>
        <HeadContent />
      </head>
      {/* Setting the body position to relative enables setting the backdrop on expanded menu */}
      <body className="relative">
        <Outlet />
        <TanStackRouterDevtools position="bottom-right" />
        <Scripts />
      </body>
    </html>
  );
}
