import { createMiddleware } from '@tanstack/start';
import { getCookie } from 'vinxi/http';

export const previewMiddleware = createMiddleware().server(async ({ next }) => {
  const isPreview = getCookie('__sanity_preview') === 'true';
  console.log({ isPreview });
  return next({
    context: {
      previewMode: isPreview,
    },
  });
});
