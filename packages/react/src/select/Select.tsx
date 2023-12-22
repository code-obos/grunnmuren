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

import { formField, input, dropdown } from '../classes';
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
      className={cx(className, formField)}
      isInvalid={isInvalid}
    >
      {label && <Label>{label}</Label>}
      {description && <Description>{description}</Description>}

      <Button
        className={cx(
          input({ focusModifier: 'visible' }),
          // How to reuse placeholder text?
          'inline-flex cursor-default items-center gap-2',
        )}
      >
        <SelectValue className="flex-1 truncate text-left data-[placeholder]:text-[#727070]" />
        <ChevronDown className={dropdown.chevronIcon} />
      </Button>

      {errorMessage && <ErrorMessage>{errorMessage}</ErrorMessage>}

      <Popover className={dropdown.popover}>
        <ListBox className={dropdown.listbox}>{children}</ListBox>
      </Popover>
    </RACSelect>
  );
}

const SelectItem = (props: ListBoxItemProps) => {
  let textValue = props.textValue;

  // When the ListBoxItem child isn't a string we have to set textValue for keyboard completion to work.
  // Since we use a render function (to handle the selected state) the child is never a string.
  // This condition adds back that behaviour
  if (textValue == null && typeof props.children === 'string') {
    textValue = props.children;
  }

  return (
    <ListBoxItem
      {...props}
      className={cx(
        props.className,
        'flex cursor-default px-6 py-2 leading-6 outline-none data-[focused]:bg-sky-lightest',
      )}
      textValue={textValue}
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
};
