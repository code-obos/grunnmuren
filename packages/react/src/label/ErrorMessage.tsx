import { cx } from 'cva';
import { Text } from 'react-aria-components';
import { Warning } from '@obosbbl/grunnmuren-icons-react';

type ErrorMessageProps = {
  className?: string;
  children: React.ReactNode;
};

function ErrorMessage(props: ErrorMessageProps) {
  const { children, className, ...restProps } = props;
  return (
    <Text
      {...restProps}
      className={cx(
        className,
        'flex items-center gap-2 rounded bg-red-light px-2 py-1 text-sm text-red',
      )}
      slot="errorMessage"
    >
      <Warning className="flex-shrink-0 text-red" />
      {children}
    </Text>
  );
}

export { ErrorMessage, type ErrorMessageProps };
