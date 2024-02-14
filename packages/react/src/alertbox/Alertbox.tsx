import { Children } from 'react';
import { cva, type VariantProps } from 'cva';
import { useLocale } from 'react-aria-components';
import {
  Close,
  InfoCircle,
  CheckCircle,
  Warning,
  CloseCircle,
} from '@obosbbl/grunnmuren-icons-react';
import { useState } from 'react';
import { Button } from '../button';

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
    'grid grid-cols-[auto_1fr_auto] items-center gap-x-2 gap-y-4 rounded-md border-2 px-3 py-2',
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

  if (!children) {
    console.error('`No children was passed to the <AlertBox/>` component.');
    return;
  }

  const [firstChild, ...restChildren] = Children.toArray(children);

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
        {firstChild}
        {isDismissable && (
          <Button
            className="col-start-3 col-end-3 row-start-1 -mb-2 -mr-2  -mt-2 focus-visible:ring-2 focus-visible:ring-offset-0"
            onClick={close}
            aria-label={closeLabel}
            isIconOnly
            variant="tertiary"
          >
            <Close />
          </Button>
        )}
        {restChildren}
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
  // Make the body text span the entire container when it is not passed as the first child (small alerts)
  <p className="text-sm leading-6 [&:not(:nth-child(2))]:col-span-full">
    {children}
  </p>
);

type AlertboxFooterProps = {
  children: React.ReactNode;
  /** Additional CSS className for the element. */
  className?: string;
};

const AlertboxFooter = ({ children }: AlertboxFooterProps) => (
  <p className="col-span-full -mt-[6px] text-xs leading-6">{children}</p>
);

export {
  type Props as AlertboxProps,
  Alertbox,
  AlertboxHeading,
  AlertboxBody,
  AlertboxFooter,
};
