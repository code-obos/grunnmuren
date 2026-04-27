import { createFileRoute } from '@tanstack/react-router';

import { client } from '@/lib/sanity';
import { getPreviewSessionFromRequest } from '@/lib/sanity-preview-session';

export const Route = createFileRoute('/api/draft-token')({
  server: {
    handlers: {
      GET: async ({ request }) => {
        const session = await getPreviewSessionFromRequest(request);

        if (!session) {
          return new Response(JSON.stringify({ error: 'Not in preview mode' }), {
            status: 401,
            headers: { 'Content-Type': 'application/json' },
          });
        }

        if (
          session.projectId !== client.config().projectId ||
          session.dataset !== client.config().dataset
        ) {
          return new Response(JSON.stringify({ error: 'Invalid preview session' }), {
            status: 401,
            headers: { 'Content-Type': 'application/json' },
          });
        }

        const token = process.env.SANITY_READ_TOKEN;

        if (!token) {
          return new Response(JSON.stringify({ error: 'Token not configured' }), {
            status: 500,
            headers: { 'Content-Type': 'application/json' },
          });
        }

        return new Response(JSON.stringify({ token }), {
          status: 200,
          headers: { 'Content-Type': 'application/json' },
        });
      },
    },
  },
});
