interface ImageProps {
  src: string;
  alt: string;
  caption?: string;
  width?: number;
  height?: number;
}

export const ImageWithCaption: React.FC<ImageProps> = ({
  src,
  alt,
  caption,
  width,
  height,
}) => {
  return (
    <div className="my-4">
      <img
        src={src}
        alt={alt}
        width={width}
        height={height}
        className="m-0 w-full"
      />
      <p className="description">{caption}</p>
    </div>
  );
};
