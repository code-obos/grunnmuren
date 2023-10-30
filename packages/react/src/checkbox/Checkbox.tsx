import { cx } from 'cva';
import {
  Checkbox as RACCheckbox,
  CheckboxProps as RACCheckboxProps,
} from 'react-aria-components';
import { Check as CheckIcon } from '@obosbbl/grunnmuren-icons-react';

const defaultClasses = cx(['flex cursor-pointer items-center gap-2']);

function Checkmark({
  isSelected,
  isFocusVisible,
  isHovered,
}: {
  isSelected: boolean;
  isFocusVisible: boolean;
  isHovered: boolean;
}) {
  return (
    <div
      className={cx(
        'grid h-5 w-5 place-content-center rounded-sm border border-black p-0.5 text-white transition-all duration-200',
        isSelected ? 'bg-green' : '[&>svg]:hidden',
        isFocusVisible && 'ring-2 ring-black ring-offset-2',
        isHovered && 'border-green bg-green-lightest',
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
      {({ isSelected, isFocusVisible, isHovered }) => (
        <>
          <Checkmark
            isSelected={isSelected}
            isFocusVisible={isFocusVisible}
            isHovered={isHovered}
          />
          {children}
        </>
      )}
    </RACCheckbox>
  );
}

export { Checkbox, type CheckboxProps };
