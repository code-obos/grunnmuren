import type { FieldWithValue } from '@tanstack/react-form';

/** `field.errors` is already filtered by errorVisibility, so this only picks the first message. */
export function firstErrorMessage(field: Pick<FieldWithValue<unknown>, 'errors'>) {
  return field.errors.at(0)?.message ?? null;
}
