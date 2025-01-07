import { randomBytes } from 'node:crypto';
import { client } from '@/lib/sanity';
import { validatePreviewUrl } from '@sanity/preview-url-secret';
import { createAPIFileRoute } from '@tanstack/start/api';
import { SanityClient } from 'sanity';
import { sendRedirect, setCookie } from 'vinxi/http';

export const APIRoute = createAPIFileRoute('/api/preview-mode/enable')({
  GET: async ({ request }) => {
    if (!process.env.SANITY_VIEWER_TOKEN) {
      throw new Response('Preview mode missing token', { status: 401 });
    }

    const clientWithToken = client.withConfig({
      token: process.env.SANITY_VIEWER_TOKEN,
    });

    const { isValid, redirectTo = '/' } = await validatePreviewUrl(
      clientWithToken,
      request.url,
    );

    if (!isValid) {
      throw new Response('Invalid secret', { status: 401 });
    }

    // we can use sameSite: 'strict' because we're running an embedded studio
    // setCookie('__sanity_preview', randomBytes(16).toString('hex'), {
    setCookie('__sanity_preview', 'true', {
      path: '/',
      secure: import.meta.env.PROD,
      httpOnly: true,
      sameSite: 'strict',
    });
    sendRedirect(redirectTo);
  },
});
