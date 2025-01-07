import { createAPIFileRoute } from '@tanstack/start/api';
import { deleteCookie, sendRedirect } from 'vinxi/http';

export const APIRoute = createAPIFileRoute('/api/preview-mode/disable')({
  GET: () => {
    deleteCookie('__sanity_preview', {
      path: '/',
      secure: import.meta.env.PROD,
      httpOnly: true,
      sameSite: 'strict',
    });
    sendRedirect('/');
  },
});
