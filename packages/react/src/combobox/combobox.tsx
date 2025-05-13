import { ChevronDown, LoadingSpinner } from '@obosbbl/grunnmuren-icons-react';
import { cx } from 'cva';
import type { Ref } from 'react';
import {
  Button,
  Group,
  Input,
  Popover,
  ComboBox as RACCombobox,
  type ComboBoxProps as RACComboboxProps,
} from 'react-aria-components';

import { dropdown, formField, input, inputGroup } from '../classes';
import {
  ListBox,
  ListBoxHeader,
  ListBoxItem,
  type ListBoxItemProps,
  ListBoxSection,
} from '../internals';
import { Description } from '../label/description';
import { ErrorMessageOrFieldError } from '../label/error-messsage-or-field-error';
import { Label } from '../label/label';

type ComboboxProps<T extends object> = {
  children: React.ReactNode;
  /** Additional CSS className for the element. */
  className?: string;
  /** Help text for the form control. */
  description?: React.ReactNode;
  /** Error message for the form control. Automatically sets `isInvalid` to true */
  errorMessage?: React.ReactNode;
  /**
   * Display the dropdown button trigger in a pending state
   * @deprecated Use isPending instead.
   */
  isLoading?: boolean;
  /**
   * Display the dropdown button trigger in a pending state
   * @default false
   */
  isPending?: boolean;
  /** Label for the form control. */
  label?: React.ReactNode;
  /** Placeholder text. Only visible when the input value is empty. */
  placeholder?: string;
  /** Additional style properties for the element. */
  style?: React.CSSProperties;
  /** Ref for the input element. */
  ref?: Ref<HTMLInputElement>;
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
    isPending: _isPending,
    label,
    isInvalid: _isInvalid,
    ref,
    ...restProps
  } = props;

  const isPending = _isPending || isLoading;

  // the order of the conditions matter here, because providing a value for isInvalid makes the validation state "controlled",
  // which will override any built in validation
  const isInvalid = !!errorMessage || _isInvalid;

  return (
    <RACCombobox
      {...restProps}
      className={cx(className, formField)}
      isInvalid={isInvalid}
    >
      {label && <Label>{label}</Label>}
      {description && <Description>{description}</Description>}

      <Group className={inputGroup}>
        <Input className={input({ isGrouped: true })} ref={ref} />
        <Button>
          {isPending ? (
            <LoadingSpinner className="animate-spin" />
          ) : (
            <ChevronDown className={dropdown.chevronIcon} />
          )}
        </Button>
      </Group>

      <ErrorMessageOrFieldError errorMessage={errorMessage} />

      <Popover
        // FIXME: The trigger width doesn't include the padding of the group, so for now we have to apply this workaround.
        // Also... the combobox border gets a pixel wider when focused, so we account for that as well when calculating the width
        // and the offset.
        // The input gutter should probably be moved to a theme variable instead of using the hardcoded value as here.
        className={cx(
          dropdown.popover,
          'min-w-[calc(var(--trigger-width)+26px)]',
        )}
        crossOffset={-13}
      >
        <ListBox className={dropdown.listbox}>{children}</ListBox>
      </Popover>
    </RACCombobox>
  );
}

export {
  Combobox,
  ListBoxHeader as ComboboxHeader,
  ListBoxItem as ComboboxItem,
  ListBoxSection as ComboboxSection,
  type ListBoxItemProps as ComboboxItemProps,
  type ComboboxProps,
};
