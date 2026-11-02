import { cx } from 'cva';
import type { RefAttributes } from 'react';
import {
  ToggleButton as RACToggleButton,
  type ToggleButtonProps as RACToggleButtonProps,
} from 'react-aria-components/ToggleButton';
import {
  ToggleButtonGroup as RACToggleButtonGroup,
  type ToggleButtonGroupProps as RACToggleButtonGroupProps,
} from 'react-aria-components/ToggleButtonGroup';

type ToggleButtonGroupProps = Omit<RACToggleButtonGroupProps, 'className'> &
  RefAttributes<HTMLDivElement> & {
    /** CSS classes to apply to the group */
    className?: string;
  };

type ToggleButtonProps = Omit<RACToggleButtonProps, 'className' | 'id' | 'children'> &
  RefAttributes<HTMLButtonElement> & {
    /** Unique key of the button within its group. Used for `selectedKeys`. */
    id: string;
    /** Text, icon and text, or only an icon. An icon-only button needs an `aria-label`. */
    children: React.ReactNode;
    /**
     * When the button has a single icon and no text. Makes the button square.
     * @default false
     */
    isIconOnly?: boolean;
    /** CSS classes to apply to the button */
    className?: string;
  };

/**
 * A segmented control of `ToggleButton`s where one or several can be selected.
 * The group has no visible label, so give it an `aria-label` or `aria-labelledby`.
 */
function ToggleButtonGroup(props: ToggleButtonGroupProps) {
  const { className, ...restProps } = props;

  return (
    <RACToggleButtonGroup
      {...restProps}
      className={cx(
        'border-neutral-border-strong bg-neutral-surface-default inline-flex gap-1 rounded-lg border-2 p-1',
        'data-[orientation=vertical]:flex-col',
        className,
      )}
    />
  );
}

/** A button within a `ToggleButtonGroup` that can be toggled on and off. */
function ToggleButton(props: ToggleButtonProps) {
  const { className, isIconOnly = false, ...restProps } = props;

  return (
    <RACToggleButton
      {...restProps}
      className={cx(
        'inline-flex min-h-[44px] cursor-pointer items-center justify-center gap-2 rounded-md font-medium transition-colors duration-200',
        isIconOnly ? 'min-w-[44px]' : 'px-4',
        'text-neutral-text-default',
        'focus-visible:outline-focus-inset focus-visible:outline-white',
        'data-hovered:bg-primary-surface-hover',
        'data-selected:bg-primary-base-default data-selected:text-primary-base-contrast-default data-selected:data-hovered:bg-primary-base-hover',
        'data-disabled:cursor-not-allowed data-disabled:opacity-50',
        '[&_svg]:size-5 [&_svg]:shrink-0',
        className,
      )}
    />
  );
}

export {
  ToggleButtonGroup as UNSAFE_ToggleButtonGroup,
  ToggleButton as UNSAFE_ToggleButton,
  type ToggleButtonGroupProps as UNSAFE_ToggleButtonGroupProps,
  type ToggleButtonProps as UNSAFE_ToggleButtonProps,
};
