import { validatePreviewUrl } from '@sanity/preview-url-secret';
import { createFileRoute } from '@tanstack/react-router';

import { client } from '@/lib/sanity';
import { commitPreviewSession, destroyPreviewSession } from '@/lib/sanity-preview-session';

import { PROJECT_ID } from '../../../util/env';

/**
 * Preview-mode API:
 *
 * - GET  /api/preview  → entered from Sanity Studio's Presentation tool.
 *                        Validates the signed preview URL secret, then sets
 *                        a sealed `sanity-preview-session` cookie and
 *                        redirects to the requested URL.
 *
 * - POST /api/preview  → called by the in-app "Exit preview" button to
 *                        clear the cookie and return to published content.
 */
export const Route = createFileRoute('/api/preview')({
  server: {
    handlers: {
      GET: async ({ request }) => {
        const token = process.env.SANITY_VIEWER_TOKEN;
        if (!token) {
          return new Response('Missing SANITY_VIEWER_TOKEN environment variable', {
            status: 500,
          });
        }

        // validatePreviewUrl needs a token-authenticated client to look up
        // the secret stored in the dataset.
        const clientWithToken = client.withConfig({ token, useCdn: false });

        let result: Awaited<ReturnType<typeof validatePreviewUrl>>;
        try {
          result = await validatePreviewUrl(clientWithToken, request.url);
        } catch {
          return new Response('Invalid preview URL', { status: 401 });
        }

        if (!result.isValid) {
          return new Response('Invalid preview URL', { status: 401 });
        }

        await commitPreviewSession({ projectId: PROJECT_ID });
        const redirectTo =
          result.redirectTo && result.redirectTo.length > 0 ? result.redirectTo : '/';

        return new Response(null, {
          status: 302,
          headers: { Location: redirectTo },
        });
      },

      POST: async () => {
        await destroyPreviewSession();
        return new Response(null, {
          status: 302,
          headers: { Location: '/' },
        });
      },
    },
  },
});
