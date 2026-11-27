import { z } from 'zod';

import { type Locale, type Market, marketFor } from '../locale';
import { schemaMessages } from './messages';
import { stripWhitespace } from './strip-whitespace';

const patterns: Record<Market, RegExp> = {
  no: /^[49]\d{7}$/,
  se: /^07[02369]\d{7}$/,
};

/** Mobile number without whitespace. Norway (nb, en): 8 digits starting with 4 or 9. Sweden (sv): 10 digits starting with 07. */
export function mobileNumber({ locale }: { locale: Locale }) {
  const messages = schemaMessages[locale].mobileNumber;

  return z
    .string({ error: messages.required })
    .transform(stripWhitespace)
    .pipe(
      z
        .string()
        .min(1, { error: messages.required, abort: true })
        .regex(patterns[marketFor(locale)], { error: messages.invalid }),
    );
}
