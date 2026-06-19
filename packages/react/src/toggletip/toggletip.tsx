import { Close } from '@obosbbl/grunnmuren-icons-react';
import { cx } from 'cva';
import {
  Button as RACButton,
  type ButtonProps as RACButtonProps,
} from 'react-aria-components/Button';
import {
  Dialog as RACDialog,
  DialogTrigger as RACDialogTrigger,
  type DialogTriggerProps as RACDialogTriggerProps,
} from 'react-aria-components/Dialog';
import {
  OverlayArrow as RACOverlayArrow,
  Popover as RACPopover,
  type PopoverProps as RACPopoverProps,
} from 'react-aria-components/Popover';

import { Button } from '../button';
import { translations } from '../translations';
import { useLocale } from '../use-locale';

type ToggletipProps = RACDialogTriggerProps;

/** Root of the toggletip. Wraps a `<ToggletipTrigger>` and a `<ToggletipContent>`. */
const Toggletip = (props: ToggletipProps) => <RACDialogTrigger {...props} />;

type ToggletipTriggerProps = Omit<RACButtonProps, 'children' | 'className'> & {
  children: React.ReactNode;
  /**
   * Visual preset: `definition` (an inline, dashed-underlined term) or `info`
   * (a 44x44 icon button). Omit it to style the trigger yourself — children and
   * appearance are then up to you.
   */
  variant?: 'definition' | 'info';
  /** Additional class name for the trigger button. */
  className?: string;
};

/**
 * The button that toggles the toggletip. Needs an accessible name — `aria-label`
 * for an icon, or the visible text for a definition term.
 */
const ToggletipTrigger = ({ variant, className, ...restProps }: ToggletipTriggerProps) => (
  <RACButton
    {...restProps}
    className={cx('gm-toggletip-trigger', className)}
    data-variant={variant}
  />
);

type ToggletipContentProps = Omit<RACPopoverProps, 'children' | 'className'> & {
  /** Accessible label for the dialog. Required, since the content has no heading. */
  'aria-label': string;
  children: React.ReactNode;
  /** Additional class name for the popover. */
  className?: string;
};

/** The popover content of the toggletip: a `Dialog` (with `aria-label`) and a close button. */
const ToggletipContent = ({
  'aria-label': ariaLabel,
  children,
  className,
  ...restProps
}: ToggletipContentProps) => {
  const locale = useLocale();
  return (
    <RACPopover {...restProps} className={cx('gm-toggletip', className)} offset={8}>
      <RACOverlayArrow data-slot="toggletip-arrow" />
      <RACDialog aria-label={ariaLabel} data-slot="toggletip-dialog">
        {({ close }) => (
          <>
            <Button
              aria-label={translations.close[locale]}
              color="white"
              isIconOnly
              onPress={close}
              variant="tertiary"
            >
              <Close />
            </Button>
            {children}
          </>
        )}
      </RACDialog>
    </RACPopover>
  );
};

export {
  Toggletip as UNSAFE_Toggletip,
  ToggletipContent as UNSAFE_ToggletipContent,
  ToggletipTrigger as UNSAFE_ToggletipTrigger,
  type ToggletipContentProps as UNSAFE_ToggletipContentProps,
  type ToggletipProps as UNSAFE_ToggletipProps,
  type ToggletipTriggerProps as UNSAFE_ToggletipTriggerProps,
};
