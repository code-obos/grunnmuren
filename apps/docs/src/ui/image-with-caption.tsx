import { getImageDimensions } from '@sanity/asset-utils';
import type { COMPONENT_QUERY_RESULT } from '@/sanity.types';
import { urlForImage } from '@/lib/image-url';

type TSanityImage = Extract<
  NonNullable<NonNullable<COMPONENT_QUERY_RESULT>['content']>[number],
  { _type: 'image-with-caption' }
>;

interface ImageProps {
  asset: TSanityImage;
}

export function ImageWithCaption({ asset }: ImageProps) {
  if (!asset.asset) {
    return null;
  }

  const image = getImageDimensions(asset.asset);

  return (
    <div className="my-4">
      <img
        src={urlForImage(asset.asset).url()}
        alt={asset.alt}
        width={image?.width}
        height={image?.height}
        className="m-0 w-full"
      />
      <p className="description">{asset.caption}</p>
    </div>
  );
}
