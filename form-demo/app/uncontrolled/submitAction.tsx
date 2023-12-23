'use server';
import { schema } from '../schema';

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
