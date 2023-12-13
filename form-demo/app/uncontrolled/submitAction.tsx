'use server';
import { z } from 'zod';

const schema = z.object({
  name: z.string(),
  email: z.string().email().endsWith('.no'),
});

export async function submitForm(formData: FormData) {
  const rawFormData = Object.fromEntries(formData.entries());

  // Simulate a delay
  await new Promise((resolve) => setTimeout(resolve, 2000));

  const data = schema.parse(rawFormData);

  console.log(data);

  throw new Error('validation failed');

  return true;
}
