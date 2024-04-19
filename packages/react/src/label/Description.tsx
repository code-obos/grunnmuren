import { cx } from 'cva';
import { Text, type TextProps } from 'react-aria-components';

type DescriptionProps = TextProps;

const descriptionClasses = 'text-sm font-light leading-6';

function Description(props: DescriptionProps) {
  const { className, ...restProps } = props;

  return (
    <Text
      {...restProps}
      className={cx(className, descriptionClasses)}
      slot="description"
    />
  );
}
export { Description, type DescriptionProps, descriptionClasses };
