import { z } from 'zod';

import type { Locale } from '../locale';
import { schemaMessages } from './messages';

const ALLOWED_CHARSET = /^[A-Za-z0-9_'+\-.@]*$/;

/** Trimmed, lowercased e-mail address: max 102 characters, ASCII charset, no "+". */
export function email({ locale }: { locale: Locale }) {
  const messages = schemaMessages[locale].email;

  return z
    .string({ error: messages.required })
    .transform((value) => value.trim().toLowerCase())
    .pipe(
      z
        .string()
        .min(1, { error: messages.required, abort: true })
        .max(102, { error: messages.tooLong, abort: true })
        .regex(ALLOWED_CHARSET, { error: messages.specialCharacters, abort: true })
        .refine((value) => z.email().safeParse(value).success, { error: messages.invalid })
        .refine((value) => !value.includes('+'), { error: messages.plusSign }),
    );
}
