import { cx } from '@/utils';

interface CardContentProps extends React.ComponentPropsWithoutRef<'div'> {}

export const CardContent = (props: CardContentProps) => {
  const { className, ...rest } = props;
  return <div className={cx(className, 'p-8 md:px-10')} {...rest} />;
};
