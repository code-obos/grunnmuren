import { createFileRoute } from '@tanstack/react-router';

import { client } from '@/lib/sanity';
import { getPreviewSessionFromRequest } from '@/lib/sanity-preview-session';

export const Route = createFileRoute('/api/draft-token')({
  server: {
    handlers: {
      GET: async ({ request }) => {
        const session = await getPreviewSessionFromRequest(request);

        if (!session) {
          return Response.json({ error: 'Not in preview mode' }, { status: 401 });
        }

        if (
          session.projectId !== client.config().projectId ||
          session.dataset !== client.config().dataset
        ) {
          return Response.json({ error: 'Invalid preview session' }, { status: 401 });
        }

        const token = process.env.SANITY_VIEWER_TOKEN;

        if (!token) {
          return Response.json({ error: 'Token not configured' }, { status: 500 });
        }

        return Response.json({ token });
      },
    },
  },
});
