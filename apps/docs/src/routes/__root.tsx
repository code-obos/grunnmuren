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
        {process.env.NODE_ENV === 'development' && (
          <>
            <script
              src="https://cdn.cookielaw.org/scripttemplates/otSDKStub.js"
              data-language="no"
              type="text/javascript"
              charset="UTF-8"
              data-domain-script="ea448f9e-5a74-4f6e-9260-c61b81f67013"
            ></script>
            <script type="text/javascript">function OptanonWrapper() {}</script>
            <script
              src="https://www.obos.no/collector.js"
              strategy="afterInteractive"
              type="module"
              id="collector-script"
              data-api-key="4426822b50f2893bb0bc6cd74521848c"
              data-app-name="grunnmuren"
              data-collect-url="/collect"
              data-session-replay-collect-url="/collect-sr"
              data-enable-session-replay="true"
              crossOrigin=""
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
