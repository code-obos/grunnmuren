// This component is based on a copy of ../textfield/TextField, refactoring is TBD: https://github.com/code-obos/grunnmuren/pull/722#issuecomment-1931478786
import { forwardRef, type Ref } from 'react';
import { cx, cva, compose } from 'cva';
import {
  Input,
  NumberField as RACNumberField,
  type NumberFieldProps as RACNumberFieldProps,
  Group,
} from 'react-aria-components';

import { formField, input, inputGroup } from '../classes';
import { InputAddonDivider } from '../internals';
import { Label } from '../label/Label';
import { Description } from '../label/Description';
import { ErrorMessageOrFieldError } from '../label/ErrorMessageOrFieldError';

type NumberFieldProps = {
  /** Additional CSS className for the element. */
  className?: string;
  /** Help text for the form control. */
  description?: React.ReactNode;
  /** Error message for the form control. Automatically sets `isInvalid` to true */
  errorMessage?: React.ReactNode;
  /** Element to be rendered in the left side of the input. */
  leftAddon?: React.ReactNode;
  /** Label for the form control. */
  label?: React.ReactNode;
  /** Element to be rendered in the right side of the input. */
  rightAddon?: React.ReactNode;
  /** Placeholder text. Only visible when the input value is empty. */
  placeholder?: string;
  /**
   * Text alignment of the input
   * @default left
   */
  textAlign?: 'left' | 'right';
  /** Additional style properties for the element. */
  style?: React.CSSProperties;
  /** Add a divider between the left/right addons and the input */
  withAddonDivider?: boolean;
} & Omit<
  RACNumberFieldProps,
  | 'className'
  | 'isReadOnly'
  | 'isDisabled'
  | 'children'
  | 'style'
  | 'hideStepper'
>;

const inputWithAlignment = compose(
  input,
  cva({
    base: '',
    variants: {
      textAlign: {
        right: 'text-right',
        left: '',
      },
    },
  }),
);

function NumberField(props: NumberFieldProps, ref: Ref<HTMLInputElement>) {
  const {
    className,
    description,
    errorMessage,
    label,
    leftAddon,
    isInvalid: _isInvalid,
    textAlign,
    rightAddon,
    withAddonDivider,
    ...restProps
  } = props;

  const isInvalid = _isInvalid || errorMessage != null;

  return (
    <RACNumberField
      {...restProps}
      className={cx(className, formField)}
      isInvalid={isInvalid}
    >
      {label && <Label>{label}</Label>}
      {description && <Description>{description}</Description>}

      {leftAddon || rightAddon ? (
        <Group className={inputGroup}>
          {leftAddon}
          {withAddonDivider && leftAddon && <InputAddonDivider />}
          <Input
            className={inputWithAlignment({ textAlign, isGrouped: true })}
            ref={ref}
          />
          {withAddonDivider && rightAddon && <InputAddonDivider />}
          {rightAddon}
        </Group>
      ) : (
        <Input className={inputWithAlignment({ textAlign })} ref={ref} />
      )}

      <ErrorMessageOrFieldError errorMessage={errorMessage} />
    </RACNumberField>
  );
}

const _NumberField = forwardRef(NumberField);
export { _NumberField as NumberField, type NumberFieldProps };
