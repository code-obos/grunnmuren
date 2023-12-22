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
import {
  ChevronDown,
  Check,
  LoadingSpinner,
} from '@obosbbl/grunnmuren-icons-react';

import { classes as inputClasses } from '../textfield/TextField';
import { classes as selectClasses } from '../select/Select';
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
  /**
   * Display the dropdown button in a loading state
   * @default false
   */
  isLoading?: boolean;
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
    isLoading,
    label,
    isInvalid: _isInvalid,
    ...restProps
  } = props;

  const isInvalid = _isInvalid || errorMessage != null;

  return (
    <RACCombobox
      {...restProps}
      className={cx(className, inputClasses.field)}
      isInvalid={isInvalid}
    >
      {label && <Label>{label}</Label>}
      {description && <Description>{description}</Description>}

      <Group className={inputClasses.inputGroup}>
        <Input className={inputClasses.input({ isGrouped: true })} />
        <Button>
          {isLoading ? (
            <LoadingSpinner className="animate-spin" />
          ) : (
            <ChevronDown className={selectClasses.chevron} />
          )}
        </Button>
      </Group>

      {errorMessage && <ErrorMessage>{errorMessage}</ErrorMessage>}

      <Popover
        // FIXME: The trigger width doesn't include the padding of the group, so for now we have to apply this workaround.
        // Also... the combobox border gets a pixel wider when focused, so we account for that as well when calculating the width
        // and the offset.
        // The input gutter should probably be moved to a theme variable instead of using the hardcoded value as here.
        className={cx(
          selectClasses.popover,
          'min-w-[calc(var(--trigger-width)+26px)]',
        )}
        crossOffset={-13}
      >
        <ListBox className={selectClasses.listbox}>{children}</ListBox>
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
  Combobox,
  ComboboxItem,
  type ComboboxProps,
  type ListBoxItemProps as ComboboxItemProps,
};
