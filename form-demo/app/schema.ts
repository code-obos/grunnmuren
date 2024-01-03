import { z } from 'zod';

export const schema = z.object({
  name: z.string(),
  email: z.string().email().endsWith('.no'),
});
