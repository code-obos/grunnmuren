import { cx } from 'cva';
import {
  Checkbox as RACCheckbox,
  CheckboxProps as RACCheckboxProps,
} from 'react-aria-components';
import { Check as CheckIcon } from '@obosbbl/grunnmuren-icons-react';

const defaultClasses = cx([
  'group flex cursor-pointer items-center gap-4 leading-7',
]);

// Pulling this out into it's own component. Will probably export it in the future
// so it can be used in other views, outside of an input of type checkbox, like in table rows.
function CheckmarkBox() {
  return (
    <div
      className={cx([
        'relative z-0 grid h-6 w-6 place-content-center rounded-sm border-2 border-black p-1 text-white',
        // selected
        'group-data-[selected]:border-green group-data-[selected]:bg-green',
        // focus
        'group-data-[focus-visible]:ring-2 group-data-[focus-visible]:ring-black group-data-[focus-visible]:ring-offset-[9px]',
        // hovered
        'before:z-0 before:h-3 before:w-3 before:rounded-sm group-data-[selected=true]:before:hidden group-data-[hovered]:before:bg-green',
        // invalid - The border is 1 px thicker when invalid. We don't actually want to change the border width, as that causes the element's size to change
        // so we use an inner shadow of 1 px instead to pad the actual border
        'group-data-[invalid]:border-red group-data-[invalid]:group-data-[selected]:shadow-none group-data-[invalid]:shadow-[inset_0_0_0_1px] group-data-[invalid]:shadow-red group-data-[hovered]:group-data-[invalid]:before:bg-red',
      ])}
    >
      <CheckIcon className="h-full w-full opacity-0 group-data-[selected]:opacity-100" />
    </div>
  );
}

type CheckboxProps = {
  children: React.ReactNode;
  className?: string;
} & Omit<
  RACCheckboxProps,
  'isDisabled' | 'style' | 'children' | 'isIndeterminate' | 'isReadOnly'
>;

function Checkbox(props: CheckboxProps) {
  const { children, className, ...restProps } = props;
  return (
    <RACCheckbox
      {...restProps}
      className={cx(className, defaultClasses)}
      autoFocus
    >
      <CheckmarkBox />
      {children}
    </RACCheckbox>
  );
}

export { Checkbox, type CheckboxProps };
