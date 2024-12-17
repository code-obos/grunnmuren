import { obosAuthStore } from '@code-obos/sanity-auth'
import { createFileRoute } from '@tanstack/react-router'
import { Studio, defineConfig } from 'sanity'
import appCss from './sanity.css?url';

// See https://www.sanity.io/docs/embedding-sanity-studio

const dataset = 'grunnmuren';

const config = defineConfig({
  projectId: 'tq6w17ny',
  dataset,
  basePath: '/sanity',
  title: 'Grunnmuren - Sanity Studio',
  auth: obosAuthStore({ dataset }),
})

export const Route = createFileRoute('/sanity')({
  head: () => ({
    links: [{ rel: 'stylesheet', href: appCss }],
  }),
  component: () => <Studio config={config} />,
})
