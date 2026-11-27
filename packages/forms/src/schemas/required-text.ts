import { z } from 'zod';

import type { Locale } from '../locale';
import { schemaMessages } from './messages';

/** Trimmed, non-empty text with an optional max length. */
export function requiredText({ locale, max }: { locale: Locale; max?: number }) {
  const messages = schemaMessages[locale].requiredText;

  return z
    .string({ error: messages.required })
    .transform((value) => value.trim())
    .pipe(
      max === undefined
        ? z.string().min(1, { error: messages.required })
        : z
            .string()
            .min(1, { error: messages.required, abort: true })
            .max(max, { error: messages.tooLong(max) }),
    );
}
