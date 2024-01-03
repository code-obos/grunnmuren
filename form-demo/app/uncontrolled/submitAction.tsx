'use server';
import { z } from 'zod';

const schema = z.object({
  name: z.string(),
  email: z.string().email().endsWith('.no'),
});

export async function submitForm(prevState: unknown, formData: FormData) {
  const result = schema.safeParse(Object.fromEntries(formData));

  if (!result.success) {
    return {
      errors: result.error.flatten().fieldErrors,
    };
  }

  // Simulate a delay
  await new Promise((resolve) => setTimeout(resolve, 2000));

  return { errors: {} };
}
