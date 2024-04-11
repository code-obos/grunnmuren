import { FieldError } from 'react-aria-components';
import { ErrorMessage } from '../label/ErrorMessage';
import { formFieldError } from '../classes';

type Props = {
  errorMessage?: React.ReactNode;
  className?: string;
};

/**
 * This component handles renders a custom error message (if provided), otherwise it falls back to the browser's native validation.
 * In other words, this handles controlled and uncontrolled form errors.
 */
export function ErrorMessageOrFieldError({ errorMessage, className }: Props) {
  return errorMessage ? (
    <ErrorMessage className={className}>{errorMessage}</ErrorMessage>
  ) : (
    <FieldError className={formFieldError} />
  );
}
