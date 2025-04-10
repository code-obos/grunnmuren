import { cx } from 'cva';
import type { Ref } from 'react';
import {
  CheckboxGroup as RACCheckboxGroup,
  type CheckboxGroupProps as RACCheckboxGroupProps,
} from 'react-aria-components';

import { Description } from '../label/description';
import { ErrorMessageOrFieldError } from '../label/error-messsage-or-field-error';
import { Label } from '../label/label';

type CheckboxGroupProps = {
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
  /** Ref to the element. */
  ref?: Ref<HTMLDivElement>;
} & Omit<
  RACCheckboxGroupProps,
  | 'className'
  | 'isReadOnly'
  | 'isDisabled'
  | 'children'
  | 'style'
  | 'orientation'
>;

function CheckboxGroup(props: CheckboxGroupProps) {
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
    <RACCheckboxGroup
      {...restProps}
      className={cx(className, 'flex flex-col gap-2')}
      isInvalid={isInvalid}
      isRequired={isRequired}
    >
      {label && <Label>{label}</Label>}
      {description && <Description>{description}</Description>}
      {children}
      <ErrorMessageOrFieldError errorMessage={errorMessage} />
    </RACCheckboxGroup>
  );
}

export { CheckboxGroup, type CheckboxGroupProps };
