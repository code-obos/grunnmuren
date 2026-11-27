import { z } from 'zod';

import type { Locale } from '../locale';
import { schemaMessages } from './messages';

/** Trimmed, lowercased e-mail address (max 254 characters). */
export function email({ locale }: { locale: Locale }) {
  const messages = schemaMessages[locale].email;

  return z
    .string({ error: messages.required })
    .transform((value) => value.trim().toLowerCase())
    .pipe(
      z
        .string()
        .min(1, { error: messages.required, abort: true })
        .max(254, { error: messages.tooLong, abort: true })
        .pipe(z.email({ error: messages.invalid })),
    );
}
