import { cx } from 'cva';
import { Text } from 'react-aria-components';

type DescriptionProps = {
  className?: string;
  children: React.ReactNode;
};

function Description(props: DescriptionProps) {
  const { className, ...restProps } = props;

  return (
    <Text
      {...restProps}
      className={cx(className, 'text-sm text-gray-dark')}
      slot="description"
    />
  );
}
export { Description, type DescriptionProps };
