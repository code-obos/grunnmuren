import { cx } from 'cva';
import {
  Checkbox as RACCheckbox,
  CheckboxProps as RACCheckboxProps,
} from 'react-aria-components';
import { Check as CheckIcon } from '@obosbbl/grunnmuren-icons-react';

import { Description } from '../label';

const defaultClasses = cx([
  'group relative inline-flex max-w-fit cursor-pointer items-start gap-4 py-2 leading-7',
]);

// Pulling this out into it's own component. Will probably export it in the future
// so it can be used in other views, outside of an input of type checkbox, like in table rows.
function CheckmarkBox() {
  return (
    <div
      className={cx([
        'relative grid flex-none place-content-center rounded-sm border-2 border-black text-white',
        //
        'before:mt-[calc((1em_*_1.75_-_24px)_/_2)] before:h-[24px] before:w-[24px]',
        // selected
        'group-data-[selected]:!border-green group-data-[selected]:!bg-green',
        // focus
        'group-data-[focus-visible]:ring-2 group-data-[focus-visible]:ring-black group-data-[focus-visible]:ring-offset-[9px]',
        // hovered
        'group-data-[hovered]:border-green group-data-[hovered]:group-data-[invalid]:border-red group-data-[hovered]:bg-green-lightest group-data-[hovered]:group-data-[invalid]:bg-red-light',
        // invalid - The border is 1 px thicker when invalid. We don't actually want to change the border width, as that causes the element's size to change
        // so we use an inner shadow of 1 px instead to pad the actual border
        'group-data-[invalid]:border-red group-data-[invalid]:group-data-[selected]:shadow-none group-data-[invalid]:shadow-[inset_0_0_0_1px] group-data-[invalid]:shadow-red',
      ])}
    >
      <CheckIcon className="h-full w-full opacity-0 group-data-[selected]:opacity-100" />
    </div>
  );
}

type CheckboxProps = {
  children: React.ReactNode;
  /** Additional CSS className for the element. */
  className?: string;
  /** Help text for the form control. */
  description?: React.ReactNode;
  /** Additional style properties for the element. */
  style?: React.CSSProperties;
} & Omit<
  RACCheckboxProps,
  'isDisabled' | 'style' | 'children' | 'isIndeterminate' | 'isReadOnly'
>;

function Checkbox(props: CheckboxProps) {
  const { children, className, description, ...restProps } = props;
  return (
    <RACCheckbox {...restProps} className={cx(className, defaultClasses)}>
      {/* increases the clickable area of the checkbox for accessibility */}
      <div className="absolute -left-2.5 top-0 z-10 h-11 w-11" />
      <CheckmarkBox />
      <div>
        {children}
        {description && (
          <Description className="mt-2.5 block">{description}</Description>
        )}
      </div>
    </RACCheckbox>
  );
}

export { Checkbox, type CheckboxProps };
