import { cx } from 'cva';
import {
  Checkbox as RACCheckbox,
  CheckboxProps as RACCheckboxProps,
} from 'react-aria-components';
import { Check as CheckIcon } from '@obosbbl/grunnmuren-icons-react';

const defaultClasses = cx(['flex cursor-pointer items-center gap-2 leading-7']);

function Checkmark({
  isSelected,
  isFocusVisible,
  isHovered,
  isInvalid,
}: {
  isSelected: boolean;
  isFocusVisible: boolean;
  isHovered: boolean;
  isInvalid: boolean;
}) {
  return (
    <div
      className={cx(
        'grid h-6 w-6 place-content-center rounded-sm border-2 border-black p-0.5 text-white',
        isSelected ? 'bg-green' : '[&>svg]:hidden',
        isFocusVisible && 'ring-2 ring-black ring-offset-[10px]',
        isHovered && ' bg-green shadow-[inset_0_0_0_4px_rgb(255,255,255)]',
        isInvalid && 'border-red',
      )}
    >
      <CheckIcon className="h-full w-full" />
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
      {({ isSelected, isFocusVisible, isHovered, isInvalid }) => (
        <>
          <Checkmark
            isSelected={isSelected}
            isFocusVisible={isFocusVisible}
            isHovered={isHovered}
            isInvalid={isInvalid}
          />
          {children}
        </>
      )}
    </RACCheckbox>
  );
}

export { Checkbox, type CheckboxProps };
