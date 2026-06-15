import { Close } from '@obosbbl/grunnmuren-icons-react';
import { cva, cx, type VariantProps } from 'cva';
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

const triggerVariants = cva({
  base: ['cursor-pointer outline-none', 'data-focus-visible:outline-focus-offset'],
  variants: {
    /**
     * - `default`: a 44x44 icon button (pass the icon as children).
     * - `definition`: an inline term with a dashed underline, highlighted
     *   yellow while the toggletip is open.
     * @default default
     */
    variant: {
      default:
        'text-blue-dark inline-grid size-11 place-content-center rounded-full [&>svg]:size-6',
      definition:
        'aria-expanded:bg-yellow rounded-xs underline decoration-dashed decoration-1 underline-offset-4',
    },
  },
  defaultVariants: {
    variant: 'default',
  },
});

type ToggletipTriggerProps = Omit<RACButtonProps, 'children' | 'className'> &
  VariantProps<typeof triggerVariants> & {
    children: React.ReactNode;
    /** Additional class name for the trigger button. */
    className?: string;
  };

/**
 * The button that toggles the toggletip. Always a `<button>` (toggling a dialog
 * is an action, not navigation). The `default` variant is an icon button and
 * needs an `aria-label`; the `definition` variant renders its children as an
 * inline, dashed-underlined term.
 */
const ToggletipTrigger = ({
  variant = 'default',
  className,
  ...restProps
}: ToggletipTriggerProps) => (
  <RACButton
    {...restProps}
    className={cx(triggerVariants({ variant }), className)}
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
    <RACDialog
      aria-label={ariaLabel}
      className="bg-blue-dark relative rounded-lg p-4 pr-12 text-white outline-none"
      ref={dialogRef}
    >
      {/* Rendered first so it's the close button useTabToClose focuses on open. */}
      <Button
        aria-label={translations.close[locale]}
        className="absolute top-1 right-1"
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
    className={cx(
      'max-w-72', // 288px
      'data-entering:fade-in data-exiting:fade-out data-entering:animate-in data-exiting:animate-out motion-reduce:animate-none',
      className as string | undefined,
    )}
    // 8px gap between the trigger and the popover.
    offset={8}
  >
    {/* The arrow points up by default (placement bottom); rotate it to point at
        the trigger for the other placements. */}
    <RACOverlayArrow className="data-[placement=left]:[&>svg]:rotate-90 data-[placement=right]:[&>svg]:-rotate-90 data-[placement=top]:[&>svg]:rotate-180">
      <svg className="fill-blue-dark block" height={8} viewBox="0 0 16 8" width={16}>
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
