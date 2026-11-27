import { idnr } from '@navikt/fnrvalidator';
import { valid as validPersonnummer } from 'personnummer';
import { z } from 'zod';

import { type Locale, marketFor } from '../locale';
import { schemaMessages } from './messages';
import { stripWhitespace } from './strip-whitespace';

// fnrvalidator's fnr()/dnr() are aliases of idnr() that accept every type, so the type is checked here.
function isValidNorwegianId(value: string, allowDNumber: boolean) {
  const result = idnr(value);
  return (
    result.status === 'valid' && (result.type === 'fnr' || (allowDNumber && result.type === 'dnr'))
  );
}

/**
 * Norwegian fødselsnummer (d-nummer opt-in) or Swedish personnummer, whitespace stripped.
 * `allowDNumber` only affects the Norwegian market (nb, en).
 */
export function nationalIdNumber({
  locale,
  allowDNumber = false,
}: {
  locale: Locale;
  allowDNumber?: boolean;
}) {
  const messages = schemaMessages[locale].nationalIdNumber;
  const invalid = allowDNumber ? messages.invalidWithDNumber : messages.invalid;

  return z
    .string({ error: messages.required })
    .transform(stripWhitespace)
    .pipe(
      z
        .string()
        .min(1, { error: messages.required, abort: true })
        .refine(
          (value) =>
            marketFor(locale) === 'se'
              ? validPersonnummer(value)
              : isValidNorwegianId(value, allowDNumber),
          { error: invalid },
        ),
    );
}
