import { cva, type VariantProps } from 'cva';
import { Button } from 'react-aria-components';
import {
  Close,
  ChevronDown,
  InfoCircle,
  CheckCircle,
  Warning,
  CloseCircle,
} from '@obosbbl/grunnmuren-icons-react';
import { useState } from 'react';
import { dropdown } from '../classes';

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
    isCollapsed: {
      true: 'transition-height h-12 overflow-hidden duration-500 ease-in-out',
    },
    defaultVariants: {
      variant: 'info',
      isCollapsed: false,
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
  isDismissable,
  isVisible: isControlledVisible,
  onClose,
  isExpandable,
}: Props) => {
  const Icon = iconMap[variant];

  const [isExpanded, setIsExpanded] = useState(false);

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

  return (
    isVisible && (
      <div
        className={alertVariants({
          className,
          variant,
          isCollapsed: isExpandable && !isExpanded,
        })}
        role={role}
      >
        <Icon className="col-start-1 col-end-1" />
        {children}
        {isExpandable && (
          <Button
            className="col-start-3 col-end-3 row-start-1"
            onPress={() => setIsExpanded((prevState) => !prevState)}
            aria-expanded={isExpanded}
          >
            <ChevronDown className={dropdown.chevronIcon} />
          </Button>
        )}
        {isDismissable && (
          <Button className="col-start-3 col-end-3 row-start-1" onPress={close}>
            <Close />
          </Button>
        )}
      </div>
    )
  );
};

type AlertboxHeadingProps = {
  children: React.ReactNode;
  level: 1 | 2 | 3 | 4 | 5 | 6;
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

const AlertboxBody = ({ children }: { children: React.ReactNode }) => (
  <span className="text-sm leading-6 [&:nth-child(3)]:col-span-full">
    {children}
  </span>
);

const AlertboxFooter = ({ children }: { children: React.ReactNode }) => (
  <footer className="col-span-full text-xs leading-6">{children}</footer>
);

export {
  type Props as AlertboxProps,
  Alertbox,
  AlertboxHeading,
  AlertboxBody,
  AlertboxFooter,
};
