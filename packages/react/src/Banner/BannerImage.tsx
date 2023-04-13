import { cx } from '@/utils';

export interface BannerImageProps
  extends React.ComponentPropsWithoutRef<'img'> {
  /* Required for the image to keep it's aspect ratio. Doesn't have to be the natural width */
  width: number;
  /* Required for the image to keep it's aspect ratio. Doesn't have to be the natural height */
  height: number;
  bannerFull?: boolean;
}

export const BannerImage = (props: BannerImageProps) => {
  return (
    <img
      loading="lazy"
      decoding="async"
      className={cx(
        props.bannerFull ? 'self-start' : 'self-center md:self-start',
        'w-20 flex-none  md:w-32',
      )}
      {...props}
    />
  );
};
