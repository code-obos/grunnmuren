// See https://www.sanity.io/docs/embedding-sanity-studio

import { createFileRoute } from '@tanstack/react-router';
import { Studio } from 'sanity';
import sanityConfig from '@/sanity.config';

export const Route = createFileRoute('/studio/')({
  component: () => <Studio config={sanityConfig} />,
  // Disable SSR for this route, as the studio is not meant to be rendered on the server
  ssr: false,
});
