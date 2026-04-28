import { ClientOnly, createRootRoute, HeadContent, Outlet, Scripts } from '@tanstack/react-router';
import { useSelector } from '@tanstack/react-store';
import { lazy, Suspense } from 'react';

import { previewStore } from '@/stores/preview-store';
import { ExitPreviewButton } from '@/ui/exit-preview-button';

// Lazy-loaded so the visual editing bundle is only shipped when actually needed.
const VisualEditing = lazy(() => import('@/ui/visual-editing'));

export const Route = createRootRoute({
  head: () => ({
    meta: [
      { charSet: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
    ],
  }),
  component: RootDocument,
});

function RootDocument() {
  // The Studio URL is read from process.env on the server during SSR and
  // exposed to the client via a script tag below.
  const studioUrl = '/studio';

  const isPreview = useSelector(previewStore, (s) => s.isPreview);

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
        {/* Visual editing + exit-preview UI are client-only and only mounted in preview mode. */}
        <ClientOnly>
          {isPreview ? (
            <Suspense fallback={null}>
              <VisualEditing />
            </Suspense>
          ) : null}
          <ExitPreviewButton />
        </ClientOnly>
      </body>
    </html>
  );
}
