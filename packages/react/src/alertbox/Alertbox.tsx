import { cva, type VariantProps } from 'cva';
import { Button } from 'react-aria-components';
import { Close, InfoCircle } from '@obosbbl/grunnmuren-icons-react';
import { useState } from 'react';

const variants = cva({
  base: [
    ':nth-child(4):col-span-12 grid grid-cols-[auto_1fr_auto] gap-2 rounded-md border-2 px-3 py-2',
  ],
  variants: {
    /**
     * The variant of the alert
     * @default info
     */
    variant: {
      info: 'bg-sky-light',
      success: 'bg-mint-light',
      danger: 'bg-red-light',
    },
  },
});

type Props = VariantProps<typeof variants> & {
  children: React.ReactNode;
  isOpen?: boolean;
  onClose?: () => void;
  isDismissable?: boolean;
  isExpandable?: boolean;
  className?: string;
};

const Alertbox = ({
  children,
  className,
  isOpen = true,
  onClose,
  variant = 'info',
  isDismissable = true,
}: Props) => {
  const [isDialogOpen, setIsDialogOpen] = useState(isOpen);
  // TODO: handle controlled close / open properly
  const closeDialog = () => {
    setIsDialogOpen(false);
    if (onClose) onClose();
  };

  return (
    isDialogOpen && (
      <div
        className={variants({ className, variant })}
        role={isDismissable ? 'dialog' : undefined}
      >
        <InfoCircle className="col-end-1" />
        {children}
        {isDismissable && (
          <Button
            className="col-start-12 col-end-12 row-start-1"
            onPress={() => closeDialog()}
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
  level: 1 | 2 | 3 | 4 | 5 | 6;
  className?: string;
};

const AlertboxHeading = ({ children, level }: AlertboxHeadingProps) => {
  const Heading = `h${level as number}` as keyof JSX.IntrinsicElements;
  return (
    <Heading className="col-span-10 text-base font-medium leading-7">
      {children}
    </Heading>
  );
};

const AlertboxBody = ({ children }: { children: React.ReactNode }) => (
  <span className="text-sm leading-6 [&:nth-child(3)]:col-span-12">
    {children}
  </span>
);

const AlertboxFooter = ({ children }: { children: React.ReactNode }) => (
  <footer className="col-span-12 text-xs leading-6">{children}</footer>
);

export {
  type Props as AlertboxProps,
  Alertbox,
  AlertboxHeading,
  AlertboxBody,
  AlertboxFooter,
};
