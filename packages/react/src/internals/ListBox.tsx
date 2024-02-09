import { ListBox as RACListBox, ListBoxProps } from 'react-aria-components';
import { cx } from 'cva';
import { dropdown } from '../classes';

const ListBox = <T extends object>({
  className,
  ...restProps
}: ListBoxProps<T>) => (
  <RACListBox {...restProps} className={cx(dropdown.listbox, className)} />
);

export default ListBox;
