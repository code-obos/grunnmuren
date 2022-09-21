import { cx } from '@/utils';

interface CardImageProps extends React.ComponentPropsWithoutRef<'img'> {
  width: number;
  height: number;
}

export const CardImage = (props: CardImageProps) => {
  const { className, ...rest } = props;

  return (
    <img
      className={cx(className, 'w-full object-cover')}
      loading="lazy"
      {...rest}
    />
  );
};
