'use client';
import { useLocale } from 'react-aria-components';

import { type Locale, toLocale } from './locale';

/** The locale set on GrunnmurenProvider. */
export function useFormsLocale(): Locale {
  return toLocale(useLocale().locale);
}
