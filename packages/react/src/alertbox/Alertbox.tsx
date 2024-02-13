import { cva, type VariantProps } from 'cva';
import { Button, useLocale } from 'react-aria-components';
import {
  Close,
  InfoCircle,
  CheckCircle,
  Warning,
  CloseCircle,
} from '@obosbbl/grunnmuren-icons-react';
import { useState } from 'react';

// TODO: expand/collapse
// TODO: add border colors
// TODO: add new icons

const iconMap = {
  info: InfoCircle,
  success: CheckCircle,
  warning: Warning,
  danger: CloseCircle,
};

const alertVariants = cva({
  base: [
    'grid grid-cols-[auto_1fr_auto] items-center gap-2 rounded-md border-2 px-3 py-2',
  ],
  variants: {
    /**
     * The variant of the alert
     * @default info
     */
    variant: {
      info: 'bg-sky-light',
      success: 'bg-mint-light',
      warning: 'bg-yellow-light',
      danger: 'bg-red-light',
    },
    defaultVariants: {
      variant: 'info',
    },
  },
});

type Props = VariantProps<typeof alertVariants> & {
  children: React.ReactNode;
  /**
   * The ARIA role for the alertbox.
   */
  role: 'alert' | 'status' | 'dialog' | 'presentation' | 'none';
  /**
   * Controls if the alert kan be dismissed with a close button
   * This also implicitly changes the role from "alert" to "dialog".
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
  /**
   * Override the built in aria-label for the close button with a custom label.
   * Make sure to handle translations yourself.
   */
  customAriaCloseLabel?: string;
};

const Alertbox = ({
  children,
  role,
  className,
  variant = 'info',
  isDismissable,
  isVisible: isControlledVisible,
  onClose,
  customAriaCloseLabel,
}: Props) => {
  const Icon = iconMap[variant];

  const [isUncontrolledVisible, setIsUncontrolledVisible] = useState(true);

  const close = () => {
    setIsUncontrolledVisible(false);
    if (onClose) onClose();
  };

  if (onClose && !isDismissable) {
    console.warn(
      'Passing an `onClose` callback without setting the `isDismissable` prop to `true` will not have any effect.',
    );
  }

  const isVisible =
    isControlledVisible !== undefined
      ? isControlledVisible
      : isUncontrolledVisible;

  // Set a default aria-label for the close button and handle translations based on the current locale
  const { locale } = useLocale();
  let closeLabel = 'Lukk';
  if (locale === 'sv') closeLabel = 'Stäng';
  else if (locale === 'en') closeLabel = 'Close';

  return (
    isVisible && (
      <div
        className={alertVariants({
          className,
          variant,
        })}
        role={role}
      >
        <Icon className="col-start-1 col-end-1" />
        {children}
        {isDismissable && (
          <Button
            className="col-start-3 col-end-3 row-start-1"
            onPress={close}
            aria-label={customAriaCloseLabel || closeLabel}
          >
            <Close />
          </Button>
        )}
      </div>
    )
  );
};

type AlertboxHeadingProps = {
  children: React.ReactNode;
  /** The level of the heading */
  level: 1 | 2 | 3 | 4 | 5 | 6;
  /** Additional CSS className for the element. */
  className?: string;
};

const AlertboxHeading = ({ children, level }: AlertboxHeadingProps) => {
  const Heading = `h${level as number}` as keyof Pick<
    JSX.IntrinsicElements,
    `h${typeof level}`
  >;
  return (
    <Heading className="text-base font-medium leading-7">{children}</Heading>
  );
};

type AlertboxBodyProps = {
  children: React.ReactNode;
  /** Additional CSS className for the element. */
  className?: string;
};

const AlertboxBody = ({ children }: AlertboxBodyProps) => (
  <span className="text-sm leading-6 [&:nth-child(3)]:col-span-full">
    {children}
  </span>
);

type AlertboxFooterProps = {
  children: React.ReactNode;
  /** Additional CSS className for the element. */
  className?: string;
};

const AlertboxFooter = ({ children }: AlertboxFooterProps) => (
  <footer className="col-span-full text-xs leading-6">{children}</footer>
);

export {
  type Props as AlertboxProps,
  Alertbox,
  AlertboxHeading,
  AlertboxBody,
  AlertboxFooter,
};
