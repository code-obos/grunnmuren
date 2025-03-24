import { Outlet, createRootRoute } from '@tanstack/react-router';
import { Meta, Scripts } from '@tanstack/react-start';

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
        <Meta />
      </head>
      <body>
        <Outlet />
        <Scripts />
      </body>
    </html>
  );
}
