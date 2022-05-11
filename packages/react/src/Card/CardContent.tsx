import classNames from 'clsx';

interface CardContentProps extends React.ComponentPropsWithoutRef<'div'> {}

export const CardContent = (props: CardContentProps) => {
  const { className, ...rest } = props;
  return <div className={classNames(className, 'p-8 md:p-10')} {...rest} />;
};
