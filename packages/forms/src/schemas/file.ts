import { z } from 'zod';

import type { Locale } from '../locale';
import { schemaMessages } from './messages';

export const ACCEPTED_FILE_TYPES = ['image/jpeg', 'image/jpg', 'image/png', 'application/pdf'];
/** Maximum size per file in bytes (5 MB). A file of exactly this size is rejected. */
export const MAXIMUM_FILE_SIZE = 5_000_000;
export const MAXIMUM_NUMBER_OF_FILES = 3;

const extensionOf = (type: string) => {
  const subtype = type.split('/')[1] ?? type;
  return `.${subtype === 'jpeg' ? 'jpg' : subtype}`;
};

/** List of files: type, size per file and number of files. Output is `File[]`. */
export function file({
  locale,
  maxFiles = MAXIMUM_NUMBER_OF_FILES,
  maxSize = MAXIMUM_FILE_SIZE,
  acceptedTypes = ACCEPTED_FILE_TYPES,
}: {
  locale: Locale;
  maxFiles?: number;
  maxSize?: number;
  acceptedTypes?: string[];
}) {
  const messages = schemaMessages[locale].file;
  const extensions = [...new Set(acceptedTypes.map(extensionOf))];

  return z
    .array(z.custom<File>())
    .refine((files) => files.every((value) => acceptedTypes.includes(value.type)), {
      error: messages.invalidType(extensions),
    })
    .refine((files) => files.length <= maxFiles, { error: messages.tooMany(maxFiles) })
    .refine((files) => files.every((value) => value.size < maxSize), {
      error: messages.tooLarge(Number((maxSize / 1_000_000).toFixed(1))),
    });
}
