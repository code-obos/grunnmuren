// routes/api/hello.ts
import { createAPIFileRoute } from '@tanstack/react-start/api';

export const APIRoute = createAPIFileRoute('/api/health')({
  GET: async () => {
    return new Response('Im alive!');
  },
});
