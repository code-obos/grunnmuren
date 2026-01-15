import {
  CheckCircle,
  ChevronDown,
  Close,
  Error as ErrorIcon,
  InfoCircle,
  Warning,
} from '@obosbbl/grunnmuren-icons-react';
import { cva, cx, type VariantProps } from 'cva';
import { Children, useId, useState } from 'react';
import { translations } from '../translations';
import { useLocale } from '../use-locale';

const iconMap = {
  info: InfoCircle,
  success: CheckCircle,
  warning: Warning,
  danger: ErrorIcon,
};

const alertVariants = cva({
  base: [
    'grid grid-cols-[auto_1fr_auto] gap-2 rounded-md border-2 px-3 py-2',
    // Icon styles:
    '[&:has([data-slot="heading"])>svg]:mt-0.5',
    // Heading styles:
    '**:data-[slot="heading"]:font-medium **:data-[slot="heading"]:text-base **:data-[slot="heading"]:leading-7',
    // Content styles:
    '**:data-[slot="content"]:text-sm **:data-[slot="content"]:leading-6 [&:has([data-slot="heading"])_[data-slot="content"]]:col-span-full',
    // Footer styles:
    '**:data-[slot="footer"]:col-span-full **:data-[slot="footer"]:font-light **:data-[slot="footer"]:text-xs **:data-[slot="footer"]:leading-6',
  ],
  variants: {
    /**
     * The variant of the alert
     * @default info
     */
    variant: {
      info: 'border-[#1A7FA7] bg-sky-light',
      success: 'border-[#0F9B6E] bg-mint-light',
      warning: 'border-[#C57C13] bg-[#FFF2DE]',
      danger: 'border-[#C0385D] bg-red-light',
    },
  },
  defaultVariants: {
    variant: 'info',
  },
});

type Props = VariantProps<typeof alertVariants> & {
  children: React.ReactNode;
  /**
   * The ARIA role for the alertbox.
   */
  role: 'alert' | 'status' | 'none';
  /** Additional CSS className for the element. */
  className?: string;
  /** Overrides the default icon for the alertbox variant. Should be used sparingly as the default icons are visually connected to the color of the variant. */
  icon?: React.ComponentType;
  /**
   * Controls if the alert is expandable or not
   * @default false
   */
  isExpandable?: boolean;
  /**
   * Controls if the alert can be dismissed with a close button.
   * @default false
   */
  isDismissable?: boolean;
  /**
   * Controls if the alert is rendered or not.
   * This is used to control the open/closed state of the component; make the component "controlled".
   * @default false
   */
  isDismissed?: boolean;
  /**
   * Callback that should be triggered when a dismissable alert is closed.
   * This is used to control the open/closed state of the component; make the component "controlled".
   */
  onDismiss?: () => void;
};

const Alertbox = ({
  children,
  role,
  className,
  icon,
  variant = 'info',
  isDismissable = false, // Assign default value to make cva variants apply correctly
  isDismissed,
  onDismiss,
  isExpandable,
}: Props) => {
  const Icon = icon ?? iconMap[variant];

  const locale = useLocale();

  const id = useId();
  const [isExpanded, setIsExpanded] = useState(false);
  const isCollapsed = isExpandable && !isExpanded;

  const [isUncontrolledVisible, setIsUncontrolledVisible] = useState(true);
  const isVisible =
    isDismissed !== undefined ? !isDismissed : isUncontrolledVisible;

  if (!isVisible) return;

  const close = () => {
    setIsUncontrolledVisible(false);
    if (onDismiss) onDismiss();
  };

  const isInDevMode = process.env.NODE_ENV !== 'production';

  if (isInDevMode && onDismiss && !isDismissable) {
    console.warn(
      'Passing an `onDismiss` callback without setting the `isDismissable` prop to `true` will not have any effect.',
    );
  }

  if (isInDevMode && !children) {
    console.error('`No children was passed to the <AlertBox/>` component.');
    return;
  }

  const [firstChild, ...restChildren] = Children.toArray(children);

  return (
    <div
      className={alertVariants({
        className,
        variant,
      })}
      // The role prop is required to force consumers to consider and choose the appropriate alertbox role.
      // role="none" will not have any effect on a div, so it can be omitted.
      role={role === 'none' ? undefined : role}
    >
      <Icon />
      {firstChild}
      {isDismissable && (
        <button
          className={cx(
            '-m-2 grid h-11 w-11 place-items-center rounded-xl',
            'cursor-pointer focus-visible:outline-focus focus-visible:-outline-offset-8',
          )}
          onClick={close}
          aria-label={translations.close[locale]}
          type="button"
        >
          <Close />
        </button>
      )}
      {isExpandable && (
        <button
          className={cx(
            'relative col-span-full row-start-2 -my-3 inline-flex max-w-fit cursor-pointer items-center gap-1 py-3 text-sm leading-6',
            // Focus styles:
            'outline-none after:absolute after:right-0 after:bottom-3 after:left-0 after:h-0',
            'focus-visible:after:h-0.5 focus-visible:after:bg-black',
          )}
          onClick={() => setIsExpanded((prevState) => !prevState)}
          aria-expanded={isExpanded}
          aria-controls={id}
          type="button"
        >
          {isExpanded
            ? translations.showLess[locale]
            : translations.showMore[locale]}
          <ChevronDown
            className={cx(
              'transition-transform duration-150 motion-reduce:transition-none',
              isExpanded && 'rotate-180',
            )}
          />
        </button>
      )}
      {restChildren?.length > 0 && (
        <div
          className={cx(
            'col-span-full grid gap-y-4',
            isCollapsed && '[&>*:not([data-slot="footer"])]:hidden',
          )}
          id={id}
        >
          {restChildren}
        </div>
      )}
    </div>
  );
};

export { Alertbox, type Props as AlertboxProps };
