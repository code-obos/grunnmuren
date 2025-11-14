import { createMiddleware } from '@tanstack/start';
import { getCookie } from 'vinxi/http';

export const previewMiddleware = createMiddleware().server(({ next }) => {
  const isPreview = getCookie('__sanity_preview') === 'true';
  console.log('middleware', { isPreview });
  return next({
    context: {
      previewMode: isPreview,
    },
  });
});
