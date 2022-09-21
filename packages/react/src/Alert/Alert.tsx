import { cx } from '@/utils';
import { InfoCircle, Warning } from '@obosbbl/grunnmuren-icons';

export interface AlertProps {
  className?: string;
  children?: React.ReactNode;
  heading: string;

  /** @default alert */
  severity?: 'alert' | 'info';
}

export const Alert = (props: AlertProps) => {
  const { className, children, heading, severity = 'alert', ...rest } = props;

  return (
    <section
      className={cx(className, 'p-4 md:py-8', {
        'bg-orange-light': severity === 'info',
        'bg-red-light': severity === 'alert',
      })}
      role="alert"
      {...rest}
    >
      <div className="flex justify-center">
        <AlertIcon
          className="mr-4 flex-none md:mr-8 md:text-2xl"
          severity={severity}
        />
        <div className="w-prose flex-initial">
          <h2 className="h4 mb-2">{heading}</h2>
          {children}
        </div>
      </div>
    </section>
  );
};

interface AlertIconProps {
  className?: string;
  severity: 'alert' | 'info';
}

const AlertIcon = ({ severity, className }: AlertIconProps) => {
  if (severity === 'alert') {
    return <Warning className={cx(className, 'text-red')} />;
  }

  return <InfoCircle className={cx(className, 'text-orange')} />;
};
