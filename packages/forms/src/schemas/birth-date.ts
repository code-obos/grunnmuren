import { z } from 'zod';

import type { Locale } from '../locale';
import { schemaMessages } from './messages';

const DATE_PATTERN = /^(\d{4})-(\d{2})-(\d{2})$/;

const pad = (value: number) => String(value).padStart(2, '0');

function isRealDate(year: number, month: number, day: number) {
  const date = new Date(Date.UTC(year, month - 1, day));
  return (
    date.getUTCFullYear() === year && date.getUTCMonth() === month - 1 && date.getUTCDate() === day
  );
}

/**
 * Date string `yyyy-MM-dd`: a real date, not in the future, not before 1900,
 * and optionally at least `minimumAge` years ago. Compared against the local date.
 */
export function birthDate({ locale, minimumAge }: { locale: Locale; minimumAge?: number }) {
  const messages = schemaMessages[locale].birthDate;

  return z
    .string({ error: messages.required })
    .transform((value) => value.trim())
    .pipe(
      z
        .string()
        .min(1, { error: messages.required, abort: true })
        .superRefine((value, ctx) => {
          const match = DATE_PATTERN.exec(value);
          if (!match || !isRealDate(Number(match[1]), Number(match[2]), Number(match[3]))) {
            ctx.addIssue({ code: 'custom', message: messages.invalid });
            return;
          }

          const now = new Date();
          const year = now.getFullYear();
          const monthDay = `${pad(now.getMonth() + 1)}-${pad(now.getDate())}`;

          if (value > `${year}-${monthDay}`) {
            ctx.addIssue({ code: 'custom', message: messages.inFuture });
          }
          if (Number(match[1]) < 1900) {
            ctx.addIssue({ code: 'custom', message: messages.before1900 });
          }
          if (
            minimumAge !== undefined &&
            value > `${String(year - minimumAge).padStart(4, '0')}-${monthDay}`
          ) {
            ctx.addIssue({ code: 'custom', message: messages.tooYoung(minimumAge) });
          }
        }),
    );
}
