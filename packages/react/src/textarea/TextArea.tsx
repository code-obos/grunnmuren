import { cx } from 'cva';
import {
  TextArea as RACTextArea,
  TextField as RACTextField,
  type TextFieldProps as RACTextFieldProps,
} from 'react-aria-components';

import { Label } from '../label/Label';
import { Description } from '../label/Description';
import { ErrorMessage } from '../label/ErrorMessage';

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

const classes = {
  base: cx('group flex flex-col gap-2'),
  textarea: cx([
    'rounded-md border border-black px-3 py-2.5 text-sm font-normal leading-6 placeholder-[#727070]',
    // focus
    'focus:outline-none focus:ring-2 focus:ring-black',
    // invalid
    'data-[invalid]:border-red',
  ]),
};

function TextArea(props: TextAreaProps) {
  const {
    className,
    description,
    errorMessage,
    label,
    isRequired,
    isInvalid: _isInvalid,
    rows,
    ...restProps
  } = props;

  const isInvalid = _isInvalid || errorMessage != null;

  return (
    <RACTextField
      {...restProps}
      className={cx(className, classes.base)}
      isInvalid={isInvalid}
      isRequired={isRequired}
    >
      {label && <Label>{label}</Label>}
      {description && <Description>{description}</Description>}
      <RACTextArea className={classes.textarea} rows={rows} />
      {errorMessage && <ErrorMessage>{errorMessage}</ErrorMessage>}
    </RACTextField>
  );
}

export { TextArea, type TextAreaProps };