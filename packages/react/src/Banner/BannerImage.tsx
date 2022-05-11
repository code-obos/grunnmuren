export interface BannerImageProps
  extends React.ComponentPropsWithoutRef<'img'> {
  /* Required for the image to keep it's aspect ratio. Doesn't have to be the natural width */
  width: number;
  /* Required for the image to keep it's aspect ratio. Doesn't have to be the natural height */
  height: number;
}

export const BannerImage = (props: BannerImageProps) => {
  return (
    <img
      loading="lazy"
      decoding="async"
      className="w-24 flex-none self-center md:w-40 md:self-start"
      {...props}
    />
  );
};
