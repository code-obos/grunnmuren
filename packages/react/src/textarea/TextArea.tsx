import { cx } from 'cva';
import { type Ref, forwardRef } from 'react';
import {
  TextArea as RACTextArea,
  TextField as RACTextField,
  type TextFieldProps as RACTextFieldProps,
} from 'react-aria-components';

import { formField, input } from '../classes';
import { Description } from '../label/Description';
import { ErrorMessageOrFieldError } from '../label/ErrorMessageOrFieldError';
import { Label } from '../label/Label';

type TextAreaProps = {
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
  /**
   * The number of visible text lines for the control.
   * @default 2
   */
  rows?: number;
} & Omit<
  RACTextFieldProps,
  'className' | 'isReadOnly' | 'isDisabled' | 'children' | 'style'
>;

function TextArea(props: TextAreaProps, ref: Ref<HTMLTextAreaElement>) {
  const {
    className,
    description,
    errorMessage,
    label,
    isInvalid: _isInvalid,
    rows,
    ...restProps
  } = props;

  const isInvalid = errorMessage != null || _isInvalid;

  return (
    <RACTextField
      {...restProps}
      className={cx(className, formField)}
      isInvalid={isInvalid}
    >
      {label && <Label>{label}</Label>}
      {description && <Description>{description}</Description>}
      <RACTextArea className={input()} rows={rows} ref={ref} />
      <ErrorMessageOrFieldError errorMessage={errorMessage} />
    </RACTextField>
  );
}

const _TextArea = forwardRef(TextArea);
export { _TextArea as TextArea, type TextAreaProps };
