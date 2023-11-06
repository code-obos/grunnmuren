import { cx } from 'cva';
import {
  TextField as RACTextField,
  type TextFieldProps as RACTextFieldProps,
} from 'react-aria-components';

import { Input } from './Input';
import { Label } from '../label/Label';
import { Description } from '../label/Description';
import { ErrorMessage } from '../label/ErrorMessage';

// TODO: The design for the TextField hasn't been finalized. The spacing between the components could easily have been solved by using
// gap here, but that assumes equal spacing between all elements. Leaving this for now in case we end up with different spacing values
// in the 2.0 version.

// This handles spacing between the elements, in relation to each other
const defaultClasses = cx([
  'flex flex-col',
  '[&>label+input]:mt-2',
  '[&>label+[slot=description]]:mt-2',
  '[&>[slot=description]+[slot=control]]:mt-2',
  '[&>[slot=control]+[slot=errorMessage]]:mt-2',
]);

type TextFieldProps = {
  /** Additional CSS className for the element. */
  className?: string;
  /** Help text for the form control. */
  description?: React.ReactNode;
  /** Error message for the form control. Automatically sets `isInvalid` to true */
  errorMessage?: React.ReactNode;
  /** Label for the form control. */
  label?: React.ReactNode;
  /** Placeholder text. Only visible when the input value is empty. */
  placeholder?: string;
  /** Additional style properties for the element. */
  style?: React.CSSProperties;
} & Omit<
  RACTextFieldProps,
  'className' | 'isReadOnly' | 'isDisabled' | 'children' | 'style'
>;

function TextField(props: TextFieldProps) {
  const {
    className,
    description,
    errorMessage,
    label,
    isRequired,
    isInvalid: _isInvalid,
    ...restProps
  } = props;

  const isInvalid = _isInvalid || errorMessage != null;

  return (
    <RACTextField
      {...restProps}
      className={cx(className, defaultClasses)}
      isInvalid={isInvalid}
      isRequired={isRequired}
    >
      <Label>{label}</Label>
      {description && <Description>{description}</Description>}
      <Input />
      {errorMessage && <ErrorMessage>{errorMessage}</ErrorMessage>}
    </RACTextField>
  );
}

export { TextField, type TextFieldProps };
