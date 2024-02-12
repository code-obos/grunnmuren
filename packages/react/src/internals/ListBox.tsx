import {
  ListBox as RACListBox,
  ListBoxProps,
  ListBoxItem as RACListBoxItem,
  type ListBoxItemProps,
  Header,
  HeadingProps,
  Section,
  SectionProps,
} from 'react-aria-components';
import { cx } from 'cva';
import { dropdown } from '../classes';
import { Check } from '@obosbbl/grunnmuren-icons-react';

const ListBox = <T extends object>({
  className,
  ...restProps
}: ListBoxProps<T>) => (
  <RACListBox {...restProps} className={cx(dropdown.listbox, className)} />
);

const ListBoxItem = (props: ListBoxItemProps) => {
  let textValue = props.textValue;

  // When the ListBoxItem child isn't a string we have to set textValue for keyboard completion to work.
  // Since we use a render function (to handle the selected state) the child is never a string.
  // This condition adds back that behaviour
  if (textValue == null && typeof props.children === 'string') {
    textValue = props.children;
  }

  return (
    <RACListBoxItem
      {...props}
      className={cx(
        props.className,
        'flex cursor-pointer px-6 py-2 leading-6 outline-none data-[focused]:bg-sky-lightest',
      )}
      textValue={textValue}
    >
      {({ isSelected }) => (
        <>
          {isSelected && <Check className="-ml-6 text-base" />}
          {props.children}
        </>
      )}
    </RACListBoxItem>
  );
};

/**
 * This component can be used to group items in a listbox
 */
const ListBoxSection = <T extends object>({
  className,
  ...restProps
}: SectionProps<T>) => (
  <Section
    {...restProps}
    // The :not(:first-child) selector adds extra spacing to all the options, but not the section (group) headings
    // This way we get the desired extra indent on all options within a group
    className={cx(className, 'py-2 [&>:not(:first-child)]:pl-10')}
  />
);

/**
 * This component can be used to label grouped items in a `ListBoxSection` with a heading
 */
const ListBoxHeader = (props: HeadingProps) => (
  <Header
    {...props}
    className={cx(
      props.className,
      'mx-6 py-2 font-medium leading-6 text-blue-dark',
    )}
  />
);

export {
  ListBox,
  ListBoxItem,
  ListBoxItemProps,
  ListBoxSection,
  ListBoxHeader,
};
