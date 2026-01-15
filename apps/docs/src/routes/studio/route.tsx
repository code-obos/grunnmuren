// Layout route for all /studio routes
// See https://www.sanity.io/docs/embedding-sanity-studio

import { createFileRoute, Outlet } from '@tanstack/react-router';
import cssLink from '@/styles/sanity.css?url';

export const Route = createFileRoute('/studio')({
  head: () => ({
    links: [{ rel: 'stylesheet', href: cssLink }],
  }),
  scripts: () => [
    {
      src: 'https://core.sanity-cdn.com/bridge.js',
      async: true,
      type: 'module',
    },
  ],
  component: () => <Outlet />,
});
