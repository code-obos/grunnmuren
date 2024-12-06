import { FieldError } from 'react-aria-components';
import { formFieldError } from '../classes';
import { ErrorMessage } from '../label/error-message';

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
    <FieldError className={formFieldError} />
  );
}
