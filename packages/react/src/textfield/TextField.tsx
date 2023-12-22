import { cx, cva, compose } from 'cva';
import {
  Input,
  TextField as RACTextField,
  type TextFieldProps as RACTextFieldProps,
  Group,
} from 'react-aria-components';

import { formField, input, inputGroup } from '../classes';
import { Label } from '../label/Label';
import { Description } from '../label/Description';
import { ErrorMessage } from '../label/ErrorMessage';

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
  /** Add a divider between the left/right addons and the input */
  withAddonDivider?: boolean;
} & Omit<
  RACTextFieldProps,
  'className' | 'isReadOnly' | 'isDisabled' | 'children' | 'style'
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
    ...restProps
  } = props;

  const isInvalid = _isInvalid || errorMessage != null;

  return (
    <RACTextField
      {...restProps}
      className={cx(className, formField)}
      isInvalid={isInvalid}
    >
      {label && <Label>{label}</Label>}
      {description && <Description>{description}</Description>}

      {leftAddon || rightAddon ? (
        <Group className={inputGroup}>
          {leftAddon}
          {withAddonDivider && leftAddon && <Divider className="ml-3" />}
          <Input
            className={inputWithAlignment({ textAlign, isGrouped: true })}
          />
          {withAddonDivider && rightAddon && <Divider className="mr-3" />}
          {rightAddon}
        </Group>
      ) : (
        <Input className={inputWithAlignment({ textAlign })} />
      )}

      {errorMessage && <ErrorMessage>{errorMessage}</ErrorMessage>}
    </RACTextField>
  );
}

function Divider({ className }: { className: string }) {
  return (
    <span className={cx(className, 'block h-6 w-px flex-none bg-black')} />
  );
}

export { TextField, type TextFieldProps };
