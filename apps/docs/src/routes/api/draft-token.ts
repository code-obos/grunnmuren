import { createFileRoute } from '@tanstack/react-router';

import { getPreviewSession } from '@/lib/sanity-preview-session';

import { PROJECT_ID } from '../../../util/env';

/**
 * Returns the Sanity viewer token to the browser **only** when the request
 * carries a valid preview session cookie. This token is used by the
 * VisualEditing component to create a live-mode client.
 *
 * The token never reaches the client otherwise.
 */
export const Route = createFileRoute('/api/draft-token')({
  server: {
    handlers: {
      GET: async () => {
        const session = await getPreviewSession();

        if (session.projectId !== PROJECT_ID) {
          return Response.json({ error: 'Not in preview mode' }, { status: 401 });
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
