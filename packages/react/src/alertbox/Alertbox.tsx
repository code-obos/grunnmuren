import { Children } from 'react';
import { cva, type VariantProps, cx } from 'cva';
import { useLocale, Button } from 'react-aria-components';
import {
  Close,
  ChevronDown,
  InfoCircle,
  CheckCircle,
  Warning,
  CloseCircle,
} from '@obosbbl/grunnmuren-icons-react';
import { useId, useState } from 'react';

// TODO: add new icons
const iconMap = {
  info: InfoCircle,
  success: CheckCircle,
  warning: Warning,
  danger: CloseCircle,
};

const alertVariants = cva({
  base: ['grid items-center gap-x-2 gap-y-4 rounded-md border-2 px-3 py-2'],
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
    isExpandable: {
      true: 'grid-cols-[auto_1fr_auto]',
    },
    isDismissable: {
      true: 'grid-cols-[auto_1fr_auto]',
    },
  },
  compoundVariants: [
    {
      isDismissable: true,
      isExpandable: true,
      className: 'grid-cols-[auto_1fr_auto_auto]',
    },
    {
      isDismissable: false,
      isExpandable: false,
      className: 'grid-cols-[auto_1fr]',
    },
  ],
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
  /**
   * Controls if the alert is expandable or not
   * @default false
   */
  isExpandable?: boolean;
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
  isDismissable = false, // Assign default value to make cva variants apply correctly
  isVisible: isControlledVisible,
  onClose,
  isExpandable = false, // Assign default value to make cva variants apply correctly
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

  const [isExpanded, setIsExpanded] = useState(false);
  const id = useId();

  if (!children) {
    console.error('`No children was passed to the <AlertBox/>` component.');
    return;
  }

  const [firstChild, ...restChildren] = Children.toArray(children);

  const btnClasses = cx(
    'grid h-11 w-11 place-items-center',
    // Focus styles:
    '-m-2 outline-transparent transition-[outline] duration-200 focus:-outline-offset-8 focus:outline-black',
  );

  const isCollapsed = isExpandable && !isExpanded;

  return (
    isVisible && (
      <div
        className={alertVariants({
          className,
          variant,
          isExpandable,
          isDismissable,
        })}
        role={role}
      >
        <Icon />
        {firstChild}
        {isExpandable && (
          <Button
            className={btnClasses}
            onPress={() => setIsExpanded((prevState) => !prevState)}
            aria-expanded={isExpanded}
            aria-controls={id}
          >
            <ChevronDown
              className={cx(
                'transition-transform duration-150 motion-reduce:transition-none',
                isExpanded && 'rotate-180',
              )}
            />
          </Button>
        )}
        {isDismissable && (
          <Button
            className={btnClasses}
            onPress={close}
            aria-label={closeLabel}
          >
            <Close />
          </Button>
        )}
        {!isCollapsed && restChildren.length > 0 && (
          <div className="col-span-full grid gap-y-4" id={id}>
            {restChildren}
          </div>
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

const AlertboxHeading = ({
  children,
  level,
  className,
}: AlertboxHeadingProps) => {
  const Heading = `h${level}` as const;
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
  <div className={cx(className, 'text-sm leading-6')}>{children}</div>
);

type AlertboxFooterProps = {
  children: React.ReactNode;
  /** Additional CSS className for the element. */
  className?: string;
};

const AlertboxFooter = ({ children, className }: AlertboxFooterProps) => (
  <div className={cx(className, '-mt-[6px] text-xs font-light leading-6')}>
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
