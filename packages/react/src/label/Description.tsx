import { cx } from 'cva';
import { Text } from 'react-aria-components';

type DescriptionProps = {
  className?: string;
  children: React.ReactNode;
  id?: string;
};

function Description(props: DescriptionProps) {
  const { className, ...restProps } = props;

  return (
    <Text
      {...restProps}
      className={cx(className, 'text-sm font-light leading-6')}
      slot="description"
    />
  );
}
export { Description, type DescriptionProps };
