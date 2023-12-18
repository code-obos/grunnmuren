import { cx } from 'cva';
import {
  Button,
  ListBox,
  Popover,
  Select as RACSelect,
  type SelectProps as RACSelectProps,
  SelectValue,
  ListBoxItem,
  ListBoxItemProps,
} from 'react-aria-components';
import { ChevronDown, Check } from '@obosbbl/grunnmuren-icons-react';

import { classes as inputClasses } from '../textfield/TextField';
import { Label } from '../label/Label';
import { Description } from '../label/Description';
import { ErrorMessage } from '../label/ErrorMessage';

const classes = {
  popover: cx(
    'min-w-[--trigger-width] overflow-auto rounded-md border border-black bg-white shadow data-[entering]:animate-in data-[exiting]:animate-out data-[entering]:fade-in data-[exiting]:fade-out',
  ),
  listbox: cx('text-sm outline-none'),
  chevron: cx(
    'text-base transition-transform duration-150 group-data-[open]:rotate-180 motion-reduce:transition-none',
  ),
};

type SelectProps<T extends object> = {
  children: React.ReactNode;
  /** Additional CSS className for the element. */
  className?: string;
  /** Help text for the form control. */
  description?: React.ReactNode;
  /** Error message for the form control. Automatically sets `isInvalid` to true */
  errorMessage?: React.ReactNode;
  /** Label for the form control. */
  label?: React.ReactNode;
  /** Placeholder text. Only visible when the input value is empty. */
  placeholder?: string;
  /** Additional style properties for the element. */
  style?: React.CSSProperties;
} & Omit<
  RACSelectProps<T>,
  'className' | 'isReadOnly' | 'isDisabled' | 'children' | 'style'
>;

function Select<T extends object>(props: SelectProps<T>) {
  const {
    className,
    children,
    description,
    errorMessage,
    label,
    isInvalid: _isInvalid,
    ...restProps
  } = props;

  const isInvalid = _isInvalid || errorMessage != null;

  return (
    <RACSelect
      {...restProps}
      className={cx(className, inputClasses.field)}
      isInvalid={isInvalid}
    >
      {label && <Label>{label}</Label>}
      {description && <Description>{description}</Description>}

      <Button
        className={cx(
          inputClasses.input({ focusModifier: 'visible' }),
          // How to reuse placeholder text?
          'inline-flex cursor-default items-center gap-2',
        )}
      >
        <SelectValue className="flex-1 truncate text-left data-[placeholder]:text-[#727070]" />
        <ChevronDown className={classes.chevron} />
      </Button>

      {errorMessage && <ErrorMessage>{errorMessage}</ErrorMessage>}

      <Popover className={classes.popover}>
        <ListBox className={classes.listbox}>{children}</ListBox>
      </Popover>
    </RACSelect>
  );
}

const SelectItem = (props: ListBoxItemProps) => {
  return (
    <ListBoxItem
      {...props}
      className={cx(
        props.className,
        'flex cursor-default px-6 py-2 leading-6 outline-none data-[focused]:bg-sky-lightest',
      )}
    >
      {({ isSelected }) => (
        <>
          {isSelected && <Check className="-ml-6 text-base" />}
          {props.children}
        </>
      )}
    </ListBoxItem>
  );
};

export {
  Select,
  SelectItem,
  type SelectProps,
  type ListBoxItemProps as SelectItemProps,
  classes,
};
