import cssLink from '@/sanity.css?url';
import { obosAuthStore } from '@code-obos/sanity-auth';
import { createFileRoute } from '@tanstack/react-router';
import { Studio, defineConfig } from 'sanity';

// See https://www.sanity.io/docs/embedding-sanity-studio

const dataset = 'grunnmuren';

const config = defineConfig({
  projectId: 'tq6w17ny',
  dataset,
  basePath: '/studio',
  title: 'Grunnmuren - Sanity Studio',
  auth: obosAuthStore({ dataset }),
});

export const Route = createFileRoute('/studio')({
  head: () => ({
    links: [{ rel: 'stylesheet', href: cssLink }],
  }),
  component: () => <Studio config={config} />,
});
