import { createRootRoute, HeadContent, Outlet, Scripts } from '@tanstack/react-router';
import { useEffect, useState } from 'react';

import { VisualEditing } from '@/ui/visual-editing';

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
  const studioUrl =
    typeof process !== 'undefined' ? (process.env.SANITY_STUDIO_URL ?? '/studio') : '/studio';
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  return (
    <html lang="no">
      <head>
        <HeadContent />
        <link rel="icon" href="/favicon.ico" sizes="32x32" />
        <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
      </head>
      {/* Setting the body position to relative enables setting the backdrop on expanded menu */}
      <body className="relative">
        <Outlet />
        <Scripts />
        <script>{`window.__SANITY_STUDIO_URL__=${JSON.stringify(studioUrl)};`}</script>
        {isClient ? <VisualEditing /> : null}
      </body>
    </html>
  );
}
