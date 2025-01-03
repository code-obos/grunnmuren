// See https://www.sanity.io/docs/embedding-sanity-studio
import cssLink from '@/sanity.css?url';
import sanityConfig from '@/studio/sanity-config';
import { createFileRoute } from '@tanstack/react-router';
import { Studio } from 'sanity';

export const Route = createFileRoute('/studio/$')({
  head: () => ({
    links: [{ rel: 'stylesheet', href: cssLink }],
  }),
  component: () => <Studio config={sanityConfig} />,
});
