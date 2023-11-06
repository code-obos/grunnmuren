import { cx } from 'cva';
import { Label as RACLabel } from 'react-aria-components';

type LabelProps = {
  children: React.ReactNode;
  className?: string;
};

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
