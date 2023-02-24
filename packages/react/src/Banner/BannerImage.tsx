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
      className="mx-auto w-20 flex-none self-start md:m-0 md:w-32"
      {...props}
    />
  );
};
