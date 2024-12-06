import { cx } from 'cva';
import { type LabelProps, Label as RACLabel } from 'react-aria-components';

function Label(props: LabelProps) {
  const { children, className, ...restProps } = props;

  return (
    <RACLabel
      className={cx(className, 'font-semibold leading-7')}
      {...restProps}
    >
      {children}
    </RACLabel>
  );
}

export { Label, type LabelProps };
