import { forwardRef, type Ref } from 'react';
import { cx } from 'cva';
import {
  Button,
  Popover,
  Select as RACSelect,
  type SelectProps as RACSelectProps,
  SelectValue,
} from 'react-aria-components';
import { ChevronDown } from '@obosbbl/grunnmuren-icons-react';

import { formField, input, dropdown } from '../classes';
import { Label } from '../label/Label';
import { Description } from '../label/Description';
import { ErrorMessageOrFieldError } from '../label/ErrorMessageOrFieldError';
import {
  ListBox,
  ListBoxItem,
  ListBoxItemProps,
  Section,
  Header,
} from '../internals';

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

function Select<T extends object>(
  props: SelectProps<T>,
  ref: Ref<HTMLButtonElement>,
) {
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
        // See https://github.com/adobe/react-spectrum/discussions/4792#discussioncomment-6492305
        ref={ref}
      >
        <SelectValue className="flex-1 truncate text-left data-[placeholder]:text-[#727070]" />
        <ChevronDown className={dropdown.chevronIcon} />
      </Button>

      <ErrorMessageOrFieldError errorMessage={errorMessage} />

      <Popover className={dropdown.popover}>
        <ListBox>{children}</ListBox>
      </Popover>
    </RACSelect>
  );
}

const _Select = forwardRef(Select);
export {
  _Select as Select,
  ListBoxItem as SelectItem,
  type SelectProps,
  type ListBoxItemProps as SelectItemProps,
  Section as SelectSection,
  Header as SelectHeader,
};
