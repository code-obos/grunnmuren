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

/**
 * Root of the toggletip. Wraps a `<ToggletipTrigger>` and a `<ToggletipContent>`,
 * and manages the open/close state. Only one toggletip can be open at a time:
 * opening another (or clicking anywhere outside) dismisses the current one,
 * which comes for free from the underlying popover's click-outside behaviour.
 */
const Toggletip = (props: ToggletipProps) => <RACDialogTrigger {...props} />;

type ToggletipTriggerProps = Omit<RACButtonProps, 'children' | 'className'> & {
  children: React.ReactNode;
  /**
   * Visual style of the trigger. `default` is a 44x44 icon button (pass the
   * icon as children); `definition` is an inline term with a dashed underline.
   * @default default
   */
  variant?: 'default' | 'definition';
  /** Additional class name for the trigger button. */
  className?: string;
};

/**
 * The button that toggles the toggletip. Always a `<button>` (toggling a dialog
 * is an action, not navigation). The `default` variant is an icon button and
 * needs an `aria-label`; the `definition` variant renders its children as an
 * inline, dashed-underlined term. The variant is exposed as `data-variant` for
 * styling.
 */
const ToggletipTrigger = ({
  variant = 'default',
  className,
  ...restProps
}: ToggletipTriggerProps) => (
  <RACButton
    {...restProps}
    className={cx('gm-toggletip-trigger', className)}
    data-variant={variant}
  />
);

// Matches the elements RAC's FocusScope considers tabbable, so we can detect
// when focus is on the last one.
const TABBABLE_SELECTOR =
  'a[href], button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])';

/**
 * RAC's `Dialog` wraps its content in a `FocusScope` that contains focus —
 * `Tab` from the last element loops back to the first. For a toggletip we want
 * the opposite: tabbing past the content dismisses it and returns focus to the
 * trigger. FocusScope handles `Tab` via a `keydown` listener on `document` in
 * the bubble phase. We attach our own listener on the dialog element (a
 * descendant of `document`, so it fires first) and `stopPropagation()` to keep
 * the event from reaching FocusScope — letting us close instead of looping.
 */
const useTabToClose = (close: () => void) => {
  const dialogRef = useRef<HTMLElement>(null);

  // RAC's Dialog moves initial focus to the dialog container. The spec wants
  // the close button focused instead, so we move it there once on open. It's
  // the first button in the dialog.
  useEffect(() => {
    dialogRef.current?.querySelector<HTMLButtonElement>('button')?.focus();
  }, []);

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
      const last = tabbables[tabbables.length - 1];
      if (last && document.activeElement === last) {
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
  /** Accessible label for the dialog. Required, since the content is informational and has no heading. */
  'aria-label': string;
  children: React.ReactNode;
};

/**
 * The dialog inside the popover. Reads the overlay state from context to wire up
 * the close button and the tab-to-close handler. Split out from
 * `ToggletipContent` so it can consume the context the `Popover` provides.
 */
const ToggletipDialog = ({
  'aria-label': ariaLabel,
  children,
}: Pick<ToggletipContentProps, 'aria-label' | 'children'>) => {
  const locale = useLocale();
  const state = useContext(OverlayTriggerStateContext);
  const close = useCallback(() => state?.close(), [state]);
  // Tab from the last focusable element closes instead of looping (see useTabToClose).
  const dialogRef = useTabToClose(close);
  return (
    <RACDialog aria-label={ariaLabel} data-slot="toggletip-dialog" ref={dialogRef}>
      {/* Rendered first so it's the close button useTabToClose focuses on open. */}
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

/**
 * The popover content of the toggletip. Renders a `Dialog` (with `aria-label`)
 * inside a `Popover`, plus a close button that receives initial focus when the
 * toggletip opens.
 */
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
