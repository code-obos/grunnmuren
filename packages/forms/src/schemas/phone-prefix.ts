import { z } from 'zod';

import type { Locale } from '../locale';
import { schemaMessages } from './messages';

/** Trimmed, non-empty country code for a mobile number (max 10 characters). */
export function phonePrefix({ locale }: { locale: Locale }) {
  const messages = schemaMessages[locale].phonePrefix;

  return z
    .string({ error: messages.required })
    .transform((value) => value.trim())
    .pipe(
      z
        .string()
        .min(1, { error: messages.required, abort: true })
        .max(10, { error: messages.tooLong }),
    );
}
