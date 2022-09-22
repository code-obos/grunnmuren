import { useContext } from 'react';
import { cx } from '@/utils';
import { HeroContext } from './Hero';
import { usesGridAreaPlacement } from './utils';

interface HeroContentProps {
  children?: React.ReactNode;
  className?: string;
  heading: string;
  description?: string;
}

export const HeroContent = (props: HeroContentProps) => {
  const { bgColor, contentPosition, hasImage } = useContext(HeroContext);

  const { children, className, heading, description, ...rest } = props;

  const usesGridArea = usesGridAreaPlacement(contentPosition);

  return (
    <div
      className={cx(
        className,
        '<md:mx-4 relative grid grid-flow-row grid-cols-[minmax(auto,_37rem)] content-center gap-6 rounded-3xl py-10 px-6 text-center md:p-12',
        {
          // On mobile we use negative margin on the content to pull the content up into the image
          '<md:-mt-18': hasImage,
          'text-white': bgColor !== 'white',
          'bg-green-dark': bgColor === 'green',
          'bg-blue-dark': bgColor === 'blue',
          'bg-white': bgColor === 'white',
          // vertical split
          // vertically center the content, remove the border radius on the edge, add some negative margin to pull the image beneath the hero content, left align the content
          'md:z-10 md:-order-1 md:mt-0 md:-mr-5 md:justify-center md:rounded-l-none md:text-left':
            contentPosition === 'vertical-split',
          // below center/content header
          'justify-center md:mx-auto md:w-4/5':
            contentPosition === 'below-center',
          'md:-mt-18': hasImage && contentPosition === 'below-center',
          // Below left style
          'md:ml-[8%] md:-mt-32 md:max-w-[58%] md:text-left':
            contentPosition === 'below-left',
          // styles for when the contain is fully contained within the image
          'md:my-9 md:mx-32 md:w-2/5': usesGridArea,
          'self-end justify-self-start': contentPosition === 'bottom-left',
          'self-start justify-self-start': contentPosition === 'top-left',
          'self-start justify-self-end': contentPosition === 'top-right',
          'self-end justify-self-end': contentPosition === 'bottom-right',
          'self-center justify-self-center': contentPosition === 'center',
        },
      )}
      {...rest}
      style={usesGridArea ? { gridArea: 'hero' } : undefined}
    >
      <h1>{heading}</h1>

      {description && <p className="text-lg md:text-xl">{description}</p>}
      {children}
    </div>
  );
};
