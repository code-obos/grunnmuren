import { cx, cva } from 'cva';
import {
  Input,
  TextField as RACTextField,
  type TextFieldProps as RACTextFieldProps,
} from 'react-aria-components';

// import { Input } from './Input';
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
  /** Additional style properties for the element. */
  style?: React.CSSProperties;
  /** Add a divider between the left/right addons and the input */
  withAddonDivider?: boolean;
} & Omit<
  RACTextFieldProps,
  'className' | 'isReadOnly' | 'isDisabled' | 'children' | 'style'
>;

const slots = {
  base: cx('group flex flex-col gap-2.5'),
  inputWrapper: cva({
    base: [
      'relative inline-flex flex-row items-center gap-3 rounded-md border border-black px-3 py-2 text-sm font-light leading-6',
      // focus
      'focus-within:ring-2 focus-within:ring-blue-dark',
      // invalid
      'group-data-[invalid]:border-red',
    ],
    variants: {
      withAddonDivider: {
        true: 'divide-x',
      },
    },
  }),
  input: cx('w-full pl-2.5 font-normal placeholder-[#727070] !outline-none'),
};

function TextField(props: TextFieldProps) {
  const {
    className,
    description,
    errorMessage,
    label,
    leftAddon,
    isRequired,
    isInvalid: _isInvalid,
    rightAddon,
    withAddonDivider,
    ...restProps
  } = props;

  const isInvalid = _isInvalid || errorMessage != null;

  return (
    <RACTextField
      {...restProps}
      className={cx(className, slots.base)}
      isInvalid={isInvalid}
      isRequired={isRequired}
    >
      <Label>{label}</Label>
      {description && <Description>{description}</Description>}
      <div className={slots.inputWrapper({ withAddonDivider })}>
        {leftAddon}
        <Input className={slots.input} />
        {rightAddon}
      </div>
      {errorMessage && <ErrorMessage>{errorMessage}</ErrorMessage>}
    </RACTextField>
  );
}

export { TextField, type TextFieldProps };
