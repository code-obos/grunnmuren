import { forwardRef, type Ref } from 'react';
import { cx } from 'cva';
import {
  CheckboxGroup as RACCheckboxGroup,
  type CheckboxGroupProps as RACCheckboxGroupProps,
} from 'react-aria-components';

import { Label } from '../label/Label';
import { Description } from '../label/Description';
import { ErrorMessageOrFieldError } from '../label/ErrorMessageOrFieldError';

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
} & Omit<
  RACCheckboxGroupProps,
  | 'className'
  | 'isReadOnly'
  | 'isDisabled'
  | 'children'
  | 'style'
  | 'orientation'
>;

function CheckboxGroup(props: CheckboxGroupProps, ref: Ref<HTMLDivElement>) {
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

  const isInvalid = _isInvalid || errorMessage != null;

  return (
    <RACCheckboxGroup
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
    </RACCheckboxGroup>
  );
}

const _CheckboxGroup = forwardRef(CheckboxGroup);
export { _CheckboxGroup as CheckboxGroup, type CheckboxGroupProps };
