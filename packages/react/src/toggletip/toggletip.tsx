import { Close } from '@obosbbl/grunnmuren-icons-react';
import { cx } from 'cva';
import { useCallback, useContext, useEffect, useRef } from 'react';
import {
  Button as RACButton,
  type ButtonProps as RACButtonProps,
} from 'react-aria-components/Button';
import {
  Dialog as RACDialog,
  DialogTrigger as RACDialogTrigger,
  type DialogTriggerProps as RACDialogTriggerProps,
  OverlayTriggerStateContext,
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

const TABBABLE_SELECTOR =
  'a[href], button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])';

const useTabToClose = (close: () => void) => {
  const dialogRef = useRef<HTMLElement>(null);

  // RAC's Dialog focuses the dialog container; move focus to the close button.
  useEffect(() => {
    dialogRef.current?.querySelector<HTMLButtonElement>('button')?.focus();
  }, []);

  // Tab from the last element should close, not loop. RAC's FocusScope contains
  // focus via a keydown listener on `document`; ours runs first (on the dialog)
  // and stops propagation so it never reaches FocusScope.
  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) {
      return;
    }
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key !== 'Tab' || event.shiftKey) {
        return;
      }
      const tabbables = dialog.querySelectorAll<HTMLElement>(TABBABLE_SELECTOR);
      if (document.activeElement === tabbables[tabbables.length - 1]) {
        event.preventDefault();
        event.stopPropagation();
        close();
      }
    };
    dialog.addEventListener('keydown', handleKeyDown);
    return () => dialog.removeEventListener('keydown', handleKeyDown);
  }, [close]);

  return dialogRef;
};

type ToggletipContentProps = Omit<RACPopoverProps, 'children'> & {
  /** Accessible label for the dialog. Required, since the content has no heading. */
  'aria-label': string;
  children: React.ReactNode;
};

const ToggletipDialog = ({
  'aria-label': ariaLabel,
  children,
}: Pick<ToggletipContentProps, 'aria-label' | 'children'>) => {
  const locale = useLocale();
  const state = useContext(OverlayTriggerStateContext);
  const close = useCallback(() => state?.close(), [state]);
  const dialogRef = useTabToClose(close);
  return (
    <RACDialog aria-label={ariaLabel} data-slot="toggletip-dialog" ref={dialogRef}>
      {/* First in the DOM so useTabToClose focuses it on open. */}
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
    </RACDialog>
  );
};

/** The popover content of the toggletip: a `Dialog` (with `aria-label`) and a close button. */
const ToggletipContent = ({
  'aria-label': ariaLabel,
  children,
  className,
  ...restProps
}: ToggletipContentProps) => (
  <RACPopover
    {...restProps}
    className={cx('gm-toggletip', className as string | undefined)}
    offset={8}
  >
    <RACOverlayArrow data-slot="toggletip-arrow">
      <svg height={8} viewBox="0 0 16 8" width={16}>
        <path d="M0 8 L8 0 L16 8 Z" />
      </svg>
    </RACOverlayArrow>
    <ToggletipDialog aria-label={ariaLabel}>{children}</ToggletipDialog>
  </RACPopover>
);

export {
  Toggletip as UNSAFE_Toggletip,
  ToggletipContent as UNSAFE_ToggletipContent,
  ToggletipTrigger as UNSAFE_ToggletipTrigger,
  type ToggletipContentProps as UNSAFE_ToggletipContentProps,
  type ToggletipProps as UNSAFE_ToggletipProps,
  type ToggletipTriggerProps as UNSAFE_ToggletipTriggerProps,
};
