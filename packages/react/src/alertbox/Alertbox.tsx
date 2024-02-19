import { Children } from 'react';
import { cva, type VariantProps } from 'cva';
import { useLocale, Button } from 'react-aria-components';
import {
  Close,
  InfoCircle,
  CheckCircle,
  Warning,
  CloseCircle,
} from '@obosbbl/grunnmuren-icons-react';
import { useState } from 'react';

// TODO: expand/collapse
// TODO: add new icons

const iconMap = {
  info: InfoCircle,
  success: CheckCircle,
  warning: Warning,
  danger: CloseCircle,
};

const alertVariants = cva({
  base: [
    'grid grid-cols-[auto_1fr_auto] items-center gap-x-2 gap-y-4 rounded-md border-2 px-3 py-2',
    // Heading styles:
    '[&_[data-slot="heading"]]:text-base [&_[data-slot="heading"]]:font-medium [&_[data-slot="heading"]]:leading-7',
    // Content styles:
    '[&:has([data-slot="heading"])_[data-slot="content"]]:col-span-full [&_[data-slot="content"]]:text-sm [&_[data-slot="content"]]:leading-6',
    // Footer styles:
    '[&_[data-slot="footer"]]:col-span-full [&_[data-slot="footer"]]:-mt-[6px] [&_[data-slot="footer"]]:text-xs [&_[data-slot="footer"]]:font-light [&_[data-slot="footer"]]:leading-6',
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
  /**
   * Controls if the alert can be dismissed with a close button.
   * @default true
   */
  isDismissable?: boolean;
  /** Additional CSS className for the element. */
  className?: string;
  /**
   * Controls if the alert is rendered or not.
   * This is used to control the open/closed state of the component; make the component "controlled".
   */
  isVisible?: boolean;
  /**
   * Callback that should be triggered when a dismissable alert is closed.
   * This is used to control the open/closed state of the component; make the component "controlled".
   */
  onClose?: () => void;
};

const Alertbox = ({
  children,
  role,
  className,
  variant = 'info',
  isDismissable,
  isVisible: isControlledVisible,
  onClose,
}: Props) => {
  const Icon = iconMap[variant];

  // Set a default aria-label for the close button and handle translations based on the current locale
  const { locale } = useLocale();
  let closeLabel = 'Lukk';
  if (locale === 'sv') closeLabel = 'Stäng';
  else if (locale === 'en') closeLabel = 'Close';

  const [isUncontrolledVisible, setIsUncontrolledVisible] = useState(true);
  const isVisible =
    isControlledVisible !== undefined
      ? isControlledVisible
      : isUncontrolledVisible;

  if (!isVisible) return;

  const close = () => {
    setIsUncontrolledVisible(false);
    if (onClose) onClose();
  };

  const isInDevMode = process.env.NODE_ENV !== 'production';

  if (isInDevMode && onClose && !isDismissable) {
    console.warn(
      'Passing an `onClose` callback without setting the `isDismissable` prop to `true` will not have any effect.',
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
      role={role}
    >
      <Icon />
      {firstChild}
      {isDismissable && (
        <Button
          className="-m-2 grid h-11 w-11 place-items-center outline-transparent transition-[outline] duration-200 focus:-outline-offset-8 focus:outline-black"
          onPress={close}
          aria-label={closeLabel}
        >
          <Close />
        </Button>
      )}
      {restChildren}
    </div>
  );
};

export { type Props as AlertboxProps, Alertbox };
