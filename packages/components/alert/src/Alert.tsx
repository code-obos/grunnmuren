import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import {
  InfoCircle,
  CheckCircle,
  Warning,
} from '@obosbbl/grunnmuren-icons-react';

const alertVariants = cva(
  'inline-flex gap-4 items-start rounded-lg w-fit p-4',
  {
    variants: {
      variant: {
        info: 'bg-blue-light',
        success: 'bg-green-light',
        warning: 'bg-orange-light',
        error: 'bg-red-light',
      },
    },
    defaultVariants: {
      variant: 'info',
    },
  },
);

export interface AlertProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof alertVariants> {
  withoutIcon?: boolean;
}

function Alert({ variant, withoutIcon, children, ...props }: AlertProps) {
  return (
    <div className={alertVariants({ variant })} {...props}>
      {!withoutIcon && <AlertIcon variant={variant} />}
      <span>{children}</span>
    </div>
  );
}

function AlertIcon({ variant }: Pick<AlertProps, 'variant'>) {
  if (!variant) {
    return null;
  }

  const iconVariants = cva('w-6 h-6 flex-none', {
    variants: {
      variant: {
        info: 'text-blue-dark',
        success: 'text-green-dark',
        warning: 'text-black',
        error: 'text-red',
      },
    },
  });

  let IconComponent;
  switch (variant) {
    case 'info':
      IconComponent = InfoCircle;
      break;
    case 'success':
      IconComponent = CheckCircle;
      break;
    case 'warning':
      IconComponent = Warning;
      break;
    case 'error':
      IconComponent = Warning;
      break;
  }

  return (
    <span className="px-2">
      <IconComponent className={iconVariants({ variant })} />
    </span>
  );
}

export { Alert, alertVariants };
