'use server';
import { z } from 'zod';

const schema = z.object({
  name: z.string(),
  email: z.string().email().endsWith('.no'),
});

type SubmitFormResult = {
  errors: Record<string, string[]>;
};

export async function submitForm(
  _prevState: SubmitFormResult,
  formData: FormData,
): Promise<SubmitFormResult> {
  const result = schema.safeParse(Object.fromEntries(formData));

  // Simulate a delay
  await new Promise((resolve) => setTimeout(resolve, 2000));

  if (!result.success) {
    return {
      errors: result.error.flatten().fieldErrors,
    };
  }

  return { errors: {} };
}
