type ImageProps = {
  /** Imported asset URL (resolved by Vite). */
  src: string;
  alt?: string;
  caption?: string;
  width?: number;
  height?: number;
};

/**
 * Renders a documentation image with an optional caption. Mirrors the old
 * Sanity `image-with-caption` block, but the source is a locally committed,
 * pre-optimised asset imported through Vite instead of the Sanity CDN.
 */
export function Image({ src, alt, caption, width, height }: ImageProps) {
  return (
    <div className="my-4">
      <img src={src} alt={alt ?? ''} width={width} height={height} className="m-0 w-full" />
      {caption && <p className="description">{caption}</p>}
    </div>
  );
}
