import { cx } from 'cva';
import { Label as RACLabel, type LabelProps } from 'react-aria-components';

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
