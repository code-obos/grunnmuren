import { cx } from '@/utils';
import { useBlockBackgroundColor, BlockBackgroundColor } from '../hooks';

interface CardListProps extends React.ComponentPropsWithoutRef<'div'> {
  bgColor?: BlockBackgroundColor;
}

export const CardList = (props: CardListProps) => {
  const { bgColor: bgColorProp, className, ...rest } = props;

  const bgColor = useBlockBackgroundColor(bgColorProp);

  return (
    <div className={cx(bgColor, className)}>
      <div
        className="container grid grid-cols-1 gap-12 py-16 md:grid-cols-2 md:py-20 lg:py-24"
        {...rest}
      />
    </div>
  );
};
