import { cx } from 'cva';
import {
  RadioGroup as RACRadioGroup,
  type RadioGroupProps as RACRadioGroupProps,
} from 'react-aria-components';

import { Label } from '../label/Label';
import { Description } from '../label/Description';
import { ErrorMessage } from '../label/ErrorMessage';

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

  const isInvalid = _isInvalid || errorMessage != null;

  return (
    <RACRadioGroup
      {...restProps}
      className={cx(className, 'flex flex-col gap-2')}
    >
      <Label isInvalid={isInvalid} isRequired={isRequired}>
        {label}
      </Label>
      {description && <Description>{description}</Description>}
      {children}
      {errorMessage && <ErrorMessage>{errorMessage}</ErrorMessage>}
    </RACRadioGroup>
  );
}

export { RadioGroup, type RadioGroupProps };
