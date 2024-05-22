import { cx } from 'cva';
import { Text, type TextProps } from 'react-aria-components';

type DescriptionProps = TextProps;

function Description(props: DescriptionProps) {
  const { className, ...restProps } = props;

  return (
    <Text
      {...restProps}
      className={cx(className, 'description')}
      slot="description"
    />
  );
}
export { Description, type DescriptionProps };
