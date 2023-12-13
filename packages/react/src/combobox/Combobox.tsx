import { cx } from 'cva';
import {
  ListBox,
  Group,
  Popover,
  ComboBox as RACCombobox,
  Button,
  Input,
  type ComboBoxProps as RACComboboxProps,
  ListBoxItem,
  ListBoxItemProps,
} from 'react-aria-components';
import { ChevronDown, Check } from '@obosbbl/grunnmuren-icons-react';

import { Label } from '../label/Label';
import { Description } from '../label/Description';
import { ErrorMessage } from '../label/ErrorMessage';

type ComboboxProps<T extends object> = {
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
  RACComboboxProps<T>,
  'className' | 'isReadOnly' | 'isDisabled' | 'children' | 'style'
>;

function Combobox<T extends object>(props: ComboboxProps<T>) {
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
    <RACCombobox
      {...restProps}
      className={cx(className, 'group flex flex-col gap-2')}
      isInvalid={isInvalid}
    >
      {label && <Label>{label}</Label>}
      {description && <Description>{description}</Description>}

      <Group
        className={cx(
          'flex cursor-default items-center gap-2',
          'rounded-md border border-black px-3 py-2.5 text-sm font-normal leading-6',
          // focus
          'ring-black focus:outline-none focus-visible:ring-2',
          // invalid
          'group-data-[invalid]:border-red',
        )}
      >
        <Input className="flex-1 truncate text-left data-[placeholder]:text-[#727070]" />
        <Button>
          <ChevronDown className="text-base transition-transform duration-150 group-data-[open]:rotate-180 motion-reduce:transition-none" />
        </Button>
      </Group>

      {errorMessage && <ErrorMessage>{errorMessage}</ErrorMessage>}

      <Popover className="min-w-[--trigger-width] overflow-auto rounded-md border border-black bg-white shadow data-[entering]:animate-in data-[exiting]:animate-out data-[entering]:fade-in data-[exiting]:fade-out">
        <ListBox className="text-sm outline-none">{children}</ListBox>
      </Popover>
    </RACCombobox>
  );
}

const ComboboxItem = (props: ListBoxItemProps) => {
  return (
    <ListBoxItem
      {...props}
      className={cx(
        props.className,
        'flex cursor-default px-6 py-2 leading-6 outline-none focus:bg-sky-lightest',
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
  Combobox,
  ComboboxItem,
  type ComboboxProps,
  type ListBoxItemProps as ComboboxItemProps,
};
