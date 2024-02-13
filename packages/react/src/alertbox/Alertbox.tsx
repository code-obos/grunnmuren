import { cva, type VariantProps } from 'cva';
import { Button } from 'react-aria-components';
import {
  Close,
  InfoCircle,
  CheckCircle,
  Warning,
  CloseCircle,
} from '@obosbbl/grunnmuren-icons-react';
import { useState } from 'react';

// TODO: add border colors
// TODO: add new icons
// TODO: expand/collapse
// TODO: evaluate roles with screen reader tests

const iconMap = {
  info: InfoCircle,
  success: CheckCircle,
  warning: Warning,
  danger: CloseCircle,
};

const variants = cva({
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
  },
});

type Props = VariantProps<typeof variants> & {
  children: React.ReactNode;
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
  isOpen?: boolean;
  /**
   * Callback that should be triggered when a dismissable alert is closed.
   * This is used to control the open/closed state of the component; make the component "controlled".
   */
  onClose?: () => void;
};

const Alertbox = ({
  children,
  className,
  variant = 'info',
  isDismissable,
  isOpen: isControlledOpen,
  onClose,
}: Props) => {
  const Icon = iconMap[variant];

  const [isUncontrolledOpen, setIsUncontrolledOpen] = useState(true);

  const close = () => {
    setIsUncontrolledOpen(false);
    if (onClose) onClose();
  };

  if (onClose && !isDismissable) {
    console.warn(
      'Passing an `onClose` callback without setting the `isDismissable` prop to `true` will not have any effect.',
    );
  }

  const isOpen =
    isControlledOpen !== undefined ? isControlledOpen : isUncontrolledOpen;
  return (
    isOpen && (
      <div
        className={variants({ className, variant })}
        role={isDismissable ? 'dialog' : 'alert'}
      >
        <Icon className="col-end-1" />
        {children}
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
  const Heading = `h${level as number}` as keyof JSX.IntrinsicElements;
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
