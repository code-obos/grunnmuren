import { cx } from 'cva';
import { type LabelProps, Label as RACLabel } from 'react-aria-components/Label';

function Label(props: LabelProps) {
  const { children, className, ...restProps } = props;

  return (
    <RACLabel className={cx(className, 'leading-7 font-medium')} {...restProps}>
      {children}
    </RACLabel>
  );
}

export { Label, type LabelProps };
