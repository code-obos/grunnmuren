import { ChevronDown } from '@obosbbl/grunnmuren-icons-react';
import { cx } from 'cva';
import type { Ref } from 'react';
import {
  Button,
  Popover,
  Select as RACSelect,
  type SelectProps as RACSelectProps,
  SelectValue,
} from 'react-aria-components';

import { dropdown, formField, input } from '../classes';
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
  /** Ref for the button element. */
  ref?: Ref<HTMLButtonElement>;
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
    ref,
    ...restProps
  } = props;

  // the order of the conditions matter here, because providing a value for isInvalid makes the validation state "controlled",
  // which will override any built in validation
  const isInvalid = !!errorMessage || _isInvalid;

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
        // See https://github.com/adobe/react-spectrum/discussions/4792#discussioncomment-6492305
        ref={ref}
      >
        <SelectValue className="flex-1 truncate text-left data-[placeholder]:text-[#727070]" />
        <ChevronDown className={dropdown.chevronIcon} />
      </Button>

      <ErrorMessageOrFieldError errorMessage={errorMessage} />

      <Popover className={dropdown.popover}>
        <ListBox className={dropdown.listbox}>{children}</ListBox>
      </Popover>
    </RACSelect>
  );
}

export {
  Select,
  ListBoxItem as SelectItem,
  type SelectProps,
  type ListBoxItemProps as SelectItemProps,
  ListBoxSection as SelectSection,
  ListBoxHeader as SelectHeader,
};
