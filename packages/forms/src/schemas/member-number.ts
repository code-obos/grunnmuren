import { z } from 'zod';

import type { Locale } from '../locale';
import { schemaMessages } from './messages';

/** Member number: exactly 7 digits, spaces removed. */
export function memberNumber({ locale }: { locale: Locale }) {
  const messages = schemaMessages[locale].memberNumber;

  return z
    .string({ error: messages.required })
    .transform((value) => value.replaceAll(' ', ''))
    .pipe(
      z
        .string()
        .min(1, { error: messages.required, abort: true })
        .regex(/^\d{7}$/, { error: messages.invalid }),
    );
}
