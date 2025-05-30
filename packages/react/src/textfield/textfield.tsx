import { compose, cva, cx } from 'cva';
import type { Ref } from 'react';
import {
  Group,
  Input,
  TextField as RACTextField,
  type TextFieldProps as RACTextFieldProps,
} from 'react-aria-components';

import { formField, input, inputGroup } from '../classes';
import { InputAddonDivider } from '../internals';
import { Description } from '../label/description';
import { ErrorMessageOrFieldError } from '../label/error-messsage-or-field-error';
import { Label } from '../label/label';

type TextFieldProps = {
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
  /** Add a divider between the left/right addons and the input, a value of 0 will be ignored */
  withAddonDivider?: boolean;
  /** Defines the number of characters and determines the width of the input element */
  size?: number;
  /** Ref for the input element. */
  ref?: Ref<HTMLInputElement>;
} & Omit<
  RACTextFieldProps,
  'className' | 'isReadOnly' | 'isDisabled' | 'children' | 'style'
>;

const inputVariants = compose(
  input,
  cva({
    base: '',
    variants: {
      textAlign: {
        right: 'text-right',
        left: '',
      },
      autoWidth: {
        true: 'max-w-fit',
        false: '',
      },
    },
  }),
);

function TextField(props: TextFieldProps) {
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
    size,
    ref,
    ...restProps
  } = props;

  // the order of the conditions matter here, because providing a value for isInvalid makes the validation state "controlled",
  // which will override any built in validation
  const isInvalid = !!errorMessage || _isInvalid;

  return (
    <RACTextField
      {...restProps}
      className={cx(className, formField)}
      isInvalid={isInvalid}
    >
      {label && <Label>{label}</Label>}
      {description && <Description>{description}</Description>}

      {leftAddon || rightAddon ? (
        <Group className={cx(inputGroup, { 'w-fit': !!size })}>
          {leftAddon}
          {withAddonDivider && leftAddon && <InputAddonDivider />}
          <Input
            className={inputVariants({
              textAlign,
              isGrouped: true,
              autoWidth: !!size,
            })}
            ref={ref}
            size={size}
          />
          {withAddonDivider && rightAddon && <InputAddonDivider />}
          {rightAddon}
        </Group>
      ) : (
        <Input
          className={inputVariants({ textAlign, autoWidth: !!size })}
          ref={ref}
          size={size}
        />
      )}

      <ErrorMessageOrFieldError errorMessage={errorMessage} />
    </RACTextField>
  );
}

export { TextField, type TextFieldProps };
