import {
  ListBoxItem as RACListBoxItem,
  ListBoxItemProps,
} from 'react-aria-components';
import { cx } from 'cva';
import { Check } from '@obosbbl/grunnmuren-icons-react';

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

export { ListBoxItem, ListBoxItemProps };
