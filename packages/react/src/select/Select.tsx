import { cx } from 'cva';
import {
  Button,
  ListBox,
  Popover,
  Select as RACSelect,
  type SelectProps as RACSelectProps,
  SelectValue,
  ListBoxItem,
} from 'react-aria-components';
import { ChevronDown } from '@obosbbl/grunnmuren-icons-react';

import { Label } from '../label/Label';
import { Description } from '../label/Description';
import { ErrorMessage } from '../label/ErrorMessage';

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
      className={cx(className, 'group flex flex-col gap-2')}
      isInvalid={isInvalid}
    >
      {label && <Label>{label}</Label>}
      {description && <Description>{description}</Description>}

      <Button
        className={cx(
          'flex items-center gap-2',
          'rounded-md border border-black px-3 py-2.5 text-sm font-normal leading-6',
          'group-data-[invalid]:border-red',
        )}
      >
        <SelectValue className="flex-1 truncate text-left data-[placeholder]:text-[#727070]" />
        <ChevronDown className="text-base transition-transform duration-150 group-data-[open]:rotate-180 motion-reduce:transition-none" />
      </Button>

      {errorMessage && <ErrorMessage>{errorMessage}</ErrorMessage>}

      <Popover className="data-[entering]:animate-in data-[entering]:fade-in data-[exiting]:animate-out data-[exiting]:fade-out min-w-[--trigger-width] overflow-auto rounded-md border border-black bg-white shadow">
        <ListBox
          className={cx(
            'text-sm outline-none',
            // the items
            '[&>[role=option]]:cursor-default [&>[role=option]]:px-6 [&>[role=option]]:py-2 [&>[role=option]]:outline-none',
            // focus here is really item hover
            'focus:[&>[role=option]]:bg-sky-lightest',
          )}
        >
          {children}
        </ListBox>
      </Popover>
    </RACSelect>
  );
}

export { Select, ListBoxItem as SelectItem, type SelectProps };
