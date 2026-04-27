import { validatePreviewUrl } from '@sanity/preview-url-secret';
import { createFileRoute } from '@tanstack/react-router';

import { client } from '@/lib/sanity';
import {
  createPreviewSessionToken,
  serializeClearedPreviewSessionCookie,
  serializePreviewSessionCookie,
} from '@/lib/sanity-preview-session';

export const Route = createFileRoute('/api/preview')({
  server: {
    handlers: {
      GET: async ({ request }) => {
        const token = process.env.SANITY_READ_TOKEN;

        if (!token) {
          return new Response('Missing SANITY_READ_TOKEN environment variable', { status: 500 });
        }

        const clientWithToken = client.withConfig({
          token,
          useCdn: false,
        });

        let result: Awaited<ReturnType<typeof validatePreviewUrl>>;

        try {
          result = await validatePreviewUrl(clientWithToken, request.url);
        } catch {
          return new Response('Invalid preview URL', { status: 401 });
        }

        if (!result.isValid) {
          return new Response('Invalid preview URL', { status: 401 });
        }

        const previewToken = await createPreviewSessionToken({
          mode: 'preview',
          projectId: client.config().projectId ?? 'tq6w17ny',
          dataset: client.config().dataset ?? 'grunnmuren',
        });

        const redirectTo =
          result.redirectTo && result.redirectTo.length > 0 ? result.redirectTo : '/';

        return new Response(null, {
          status: 302,
          headers: {
            Location: redirectTo,
            'Set-Cookie': serializePreviewSessionCookie(previewToken),
          },
        });
      },
      POST: async () => {
        return new Response(null, {
          status: 302,
          headers: {
            Location: '/',
            'Set-Cookie': serializeClearedPreviewSessionCookie(),
          },
        });
      },
    },
  },
});
