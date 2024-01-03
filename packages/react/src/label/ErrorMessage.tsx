import { cx } from 'cva';
import { Text, type TextProps } from 'react-aria-components';
import { formFieldError } from '../classes';

type ErrorMessageProps = TextProps;

function ErrorMessage(props: ErrorMessageProps) {
  const { children, className, ...restProps } = props;
  return (
    <Text
      {...restProps}
      className={cx(className, formFieldError)}
      slot="errorMessage"
    >
      {children}
    </Text>
  );
}

export { ErrorMessage, type ErrorMessageProps };
