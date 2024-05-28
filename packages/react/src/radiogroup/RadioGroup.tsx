import { forwardRef, type Ref } from 'react';
import { cx } from 'cva';
import {
  RadioGroup as RACRadioGroup,
  type RadioGroupProps as RACRadioGroupProps,
} from 'react-aria-components';

import { Label } from '../label/Label';
import { Description } from '../label/Description';
import { ErrorMessageOrFieldError } from '../label/ErrorMessageOrFieldError';

type RadioGroupProps = {
  children: React.ReactNode;
  /** Additional CSS className for the element. */
  className?: string;
  /** Help text for the form control. */
  description?: React.ReactNode;
  /** Error message for the form control. Automatically sets `isInvalid` to true */
  errorMessage?: React.ReactNode;
  /** Label for the form control. */
  label?: React.ReactNode;
  /** Additional style properties for the element. */
  style?: React.CSSProperties;
} & Omit<
  RACRadioGroupProps,
  | 'className'
  | 'isReadOnly'
  | 'isDisabled'
  | 'children'
  | 'style'
  | 'orientation'
>;

function RadioGroup(props: RadioGroupProps, ref: Ref<HTMLDivElement>) {
  const {
    children,
    className,
    description,
    errorMessage,
    label,
    isRequired,
    isInvalid: _isInvalid,
    ...restProps
  } = props;

  // the order of the conditions matter here, because providing a value for isInvalid makes the validation state "controlled",
  // which will override any built in validation
  const isInvalid = errorMessage != null || _isInvalid;

  return (
    <RACRadioGroup
      {...restProps}
      className={cx(className, 'flex flex-col gap-2')}
      isInvalid={isInvalid}
      isRequired={isRequired}
      ref={ref}
    >
      {label && <Label>{label}</Label>}
      {description && <Description>{description}</Description>}
      {children}
      <ErrorMessageOrFieldError errorMessage={errorMessage} />
    </RACRadioGroup>
  );
}

const _RadioGroup = forwardRef(RadioGroup);
export { _RadioGroup as RadioGroup, type RadioGroupProps };
