import { cx, cva } from 'cva';
import {
  Input,
  TextField as RACTextField,
  type TextFieldProps as RACTextFieldProps,
} from 'react-aria-components';

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

const classes = {
  base: cx('group flex flex-col gap-2'),
  inputWrapper: cva({
    base: [
      'relative inline-flex flex-row items-center rounded-md border border-black py-2.5 text-sm font-normal leading-6',
      // prevent icons in addons from being flexed and affected by the text size of the input
      '[&>svg]:flex-none [&>svg]:text-base',
      // focus
      'focus-within:ring-2 focus-within:ring-blue-dark',
      // invalid
      'group-data-[invalid]:border-red group-data-[invalid]:outline group-data-[invalid]:outline-1 group-data-[invalid]:outline-red',
    ],
    variants: {
      leftAddon: {
        true: 'pl-3',
      },
      rightAddon: {
        true: 'pr-3',
      },
    },
  }),
  input: cva({
    base: 'relative w-full px-3 font-normal leading-6 placeholder-[#727070] !outline-none',
    variants: {
      textAlign: {
        right: 'text-right',
        left: '',
      },
    },
  }),
  divider: cx('block h-6 w-px flex-none bg-black'),
};

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
      className={cx(className, classes.base)}
      isInvalid={isInvalid}
    >
      {label && <Label>{label}</Label>}
      {description && <Description>{description}</Description>}
      <div
        className={classes.inputWrapper({
          leftAddon: !!leftAddon,
          rightAddon: !!rightAddon,
        })}
      >
        {leftAddon}
        {withAddonDivider && leftAddon && <Divider className="ml-3" />}
        <Input className={classes.input({ textAlign })} />
        {withAddonDivider && rightAddon && <Divider className="mr-3" />}
        {rightAddon}
      </div>
      {errorMessage && <ErrorMessage>{errorMessage}</ErrorMessage>}
    </RACTextField>
  );
}

function Divider({ className }: { className: string }) {
  return <span className={cx(className, classes.divider)} />;
}

export { TextField, type TextFieldProps };
