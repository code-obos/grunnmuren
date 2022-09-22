import { useContext } from 'react';
import { cx } from '@/utils';
import { HeroContext } from './Hero';

interface HeroImageProps {
  /* Rendered on small screens in a 6/7 aspect ratio. Recommended size 600 px wide and 700 pixels high. */
  src: string;
  /* Rendered on larger screens in a 4/8 aspect ratio (square for vertical-split). Recommneded width 1280 */
  mdSrc: string;
  alt?: string;
}

export const HeroImage = (props: HeroImageProps) => {
  const { contentPosition } = useContext(HeroContext);

  return (
    <picture
      className={cx('aspect-w-6 aspect-h-7 block', {
        'sm:aspect-w-8 sm:aspect-h-4': contentPosition !== 'vertical-split',
        // calculate a square aspect ratio
        'sm:aspect-w-8 sm:aspect-h-8': contentPosition === 'vertical-split',
      })}
      style={
        contentPosition !== 'vertical-split' &&
        contentPosition !== 'below-center' &&
        contentPosition !== 'below-left'
          ? { gridArea: 'hero' }
          : undefined
      }
    >
      <source media="(min-width: 768px)" srcSet={props.mdSrc} />
      <img
        className="object-cover"
        decoding="async"
        src={props.src}
        alt={props.alt}
      />
    </picture>
  );
};
