import { cx, cva, compose } from 'cva';
import {
  Input,
  TextField as RACTextField,
  type TextFieldProps as RACTextFieldProps,
  Group,
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
  field: cx('group flex flex-col gap-2'),
  input: cva({
    base: [
      'rounded-md px-3 py-2.5 text-sm font-normal leading-6 placeholder-[#727070] outline-none ring-1 ring-black',
      // invalid styles
      'group-data-[invalid]:ring-2 group-data-[invalid]:ring-red',
    ],
    variants: {
      // Focus rings. Can either be :focus or :focus-visible based on the needs of the particular component.
      focusModifier: {
        focus: 'focus:ring-2 group-data-[invalid]:focus:ring',
        visible:
          'data-[focus-visible]:ring-2 group-data-[invalid]:data-[focus-visible]:ring',
      },
      isGrouped: {
        false: '',
        //
        true: 'flex-1 !ring-0 first:pl-0 last:pr-0',
      },
    },
    defaultVariants: {
      focusModifier: 'focus',
      isGrouped: false,
    },
  }),
  inputGroup: cx(
    'inline-flex items-center overflow-hidden rounded-md px-3 ring-1 ring-black focus-within:ring-2 group-data-[invalid]:ring-2 group-data-[invalid]:ring-red group-data-[invalid]:focus-within:ring',
  ),
  divider: cx('block h-6 w-px flex-none bg-black'),
};

const variants = {
  input: cva({
    base: '',
    variants: {
      textAlign: {
        right: 'text-right',
        left: '',
      },
    },
  }),
};

const test = compose(classes.input, variants.input);

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
      className={cx(className, classes.field)}
      isInvalid={isInvalid}
    >
      {label && <Label>{label}</Label>}
      {description && <Description>{description}</Description>}

      {leftAddon || rightAddon ? (
        <Group className={classes.inputGroup}>
          {leftAddon}
          {withAddonDivider && leftAddon && <Divider className="ml-3" />}
          <Input className={test({ textAlign, isGrouped: true })} />
          {withAddonDivider && rightAddon && <Divider className="mr-3" />}
          {rightAddon}
        </Group>
      ) : (
        <Input className={test({ textAlign })} />
      )}

      {errorMessage && <ErrorMessage>{errorMessage}</ErrorMessage>}
    </RACTextField>
  );
}

function Divider({ className }: { className: string }) {
  return <span className={cx(className, classes.divider)} />;
}

export { TextField, type TextFieldProps, classes };
