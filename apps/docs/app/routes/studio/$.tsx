// See https://www.sanity.io/docs/embedding-sanity-studio
import cssLink from '@/styles/sanity.css?url';
import { createFileRoute } from '@tanstack/react-router';
import { Studio } from 'sanity';
import sanityConfig from 'sanity.config';

export const Route = createFileRoute('/studio/$')({
  head: () => ({
    links: [{ rel: 'stylesheet', href: cssLink }],
  }),
  component: () => <Studio config={sanityConfig} />,
  // Disable SSR for this route, as the studio is not meant to be rendered on the server
  ssr: false,
});
