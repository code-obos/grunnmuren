import { Children } from 'react';
import { cva, type VariantProps, cx } from 'cva';
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
  role: 'alert' | 'status' | 'dialog' | 'presentation' | 'none';
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
            className="col-start-3 col-end-3 row-start-1 -m-2 grid h-11 w-11 place-items-center outline-transparent transition-[outline] duration-200 focus:-outline-offset-8 focus:outline-black"
            onPress={close}
            aria-label={closeLabel}
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

const AlertboxHeading = ({
  children,
  level,
  className,
}: AlertboxHeadingProps) => {
  const Heading = `h${level as number}` as keyof Pick<
    JSX.IntrinsicElements,
    `h${typeof level}`
  >;
  return (
    <Heading className={cx(className, 'text-base font-medium leading-7')}>
      {children}
    </Heading>
  );
};

type AlertboxBodyProps = {
  children: React.ReactNode;
  /** Additional CSS className for the element. */
  className?: string;
};

const AlertboxBody = ({ children, className }: AlertboxBodyProps) => (
  // Make the body text span the entire container when it is not passed as the first child (small alerts)
  <div
    className={cx(
      className,
      'text-sm leading-6 [&:not(:nth-child(2))]:col-span-full',
    )}
  >
    {children}
  </div>
);

type AlertboxFooterProps = {
  children: React.ReactNode;
  /** Additional CSS className for the element. */
  className?: string;
};

const AlertboxFooter = ({ children, className }: AlertboxFooterProps) => (
  <div className={cx(className, 'col-span-full -mt-[6px] text-xs leading-6')}>
    {children}
  </div>
);

export {
  type Props as AlertboxProps,
  Alertbox,
  AlertboxHeading,
  AlertboxBody,
  AlertboxFooter,
};
