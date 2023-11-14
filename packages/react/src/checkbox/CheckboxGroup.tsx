import { cx } from 'cva';
import {
  CheckboxGroup as RACCheckboxGroup,
  type CheckboxGroupProps as RACCheckboxGroupProps,
} from 'react-aria-components';

import { Label } from '../label/Label';
import { Description } from '../label/Description';
import { ErrorMessage } from '../label/ErrorMessage';

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

  const isInvalid = _isInvalid || errorMessage != null;

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
      {errorMessage && <ErrorMessage>{errorMessage}</ErrorMessage>}
    </RACCheckboxGroup>
  );
}

export { CheckboxGroup, type CheckboxGroupProps };
