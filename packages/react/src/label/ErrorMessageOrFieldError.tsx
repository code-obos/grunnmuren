import { FieldError } from 'react-aria-components';
import { ErrorMessage } from '../label/ErrorMessage';

type Props = {
  errorMessage?: React.ReactNode;
};

/**
 * This component handles renders a custom error message (if provided), otherwise it falls back to the browser's native validation.
 * In other words, this handles controlled and uncontrolled form errors.
 */
export function ErrorMessageOrFieldError({ errorMessage }: Props) {
  return errorMessage ? (
    <ErrorMessage>{errorMessage}</ErrorMessage>
  ) : (
    <FieldError className="w-fit rounded-sm bg-red-light px-2 py-1 text-sm leading-6 text-red" />
  );
}
