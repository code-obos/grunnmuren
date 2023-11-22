import { cx } from 'cva';
import { Text, type TextProps } from 'react-aria-components';

type ErrorMessageProps = TextProps;

function ErrorMessage(props: ErrorMessageProps) {
  const { children, className, ...restProps } = props;
  return (
    <Text
      {...restProps}
      className={cx(
        className,
        'w-fit rounded-sm bg-red-light px-2 py-1 text-sm leading-6 text-red',
      )}
      slot="errorMessage"
    >
      {children}
    </Text>
  );
}

export { ErrorMessage, type ErrorMessageProps };
