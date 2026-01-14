import {
  createRootRoute,
  HeadContent,
  Outlet,
  Scripts,
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
        <link rel="icon" href="/favicon.ico" sizes="32x32" />
        <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
        {process.env.NODE_ENV === 'production' && (
          <>
            <script
              src="https://cdn.cookielaw.org/scripttemplates/otSDKStub.js"
              data-language="no"
              type="text/javascript"
              data-domain-script="ea448f9e-5a74-4f6e-9260-c61b81f67013"
            />
            <script type="text/javascript">function OptanonWrapper() {}</script>
            <script
              src="https://www.obos.no/collector.js"
              type="module"
              id="collector-script"
              data-api-key="b85ae7f346517c8070821d6b66e9d69e"
              data-app-name="grunnmuren"
              data-enable-session-replay="true"
              crossOrigin=""
            />
            <script
              src="https://core.sanity-cdn.com/bridge.js"
              async
              type="module"
            />
          </>
        )}
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
