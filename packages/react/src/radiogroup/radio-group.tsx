import { cx } from 'cva';
import type { Ref } from 'react';
import {
  RadioGroup as RACRadioGroup,
  type RadioGroupProps as RACRadioGroupProps,
} from 'react-aria-components';

import { Description } from '../label/description';
import { ErrorMessageOrFieldError } from '../label/error-messsage-or-field-error';
import { Label } from '../label/label';

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
  /** Ref for the element. */
  ref?: Ref<HTMLDivElement>;
} & Omit<
  RACRadioGroupProps,
  | 'className'
  | 'isReadOnly'
  | 'isDisabled'
  | 'children'
  | 'style'
  | 'orientation'
>;

function RadioGroup(props: RadioGroupProps) {
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
    >
      {label && <Label>{label}</Label>}
      {description && <Description>{description}</Description>}
      {children}
      <ErrorMessageOrFieldError errorMessage={errorMessage} />
    </RACRadioGroup>
  );
}

export { RadioGroup, type RadioGroupProps };
