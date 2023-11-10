import { forwardRef, useContext } from 'react';
import { cx } from '@/utils';
import { HeroContext } from './Hero';
import { usesGridAreaPlacement } from './utils';

interface HeroContentProps extends React.ComponentPropsWithoutRef<'div'> {
  children?: React.ReactNode;
  className?: string;
  heading: string;
  description?: string;
}

export const HeroContent = forwardRef<HTMLDivElement, HeroContentProps>(
  (props, ref) => {
    const { bgColor, contentPosition, hasImage } = useContext(HeroContext);

    const { children, className, heading, description, ...rest } = props;

    const usesGridArea = usesGridAreaPlacement(contentPosition);

    return (
      <div
        className={cx(
          className,
          'relative mx-4 grid grid-flow-row grid-cols-[minmax(auto,_37rem)] content-center gap-6 rounded-3xl px-6 py-10 text-center md:p-12',
          {
            // On mobile we use negative margin on the content to pull the content up into the image
            '-mt-18': hasImage,
            'text-white': bgColor !== 'white',
            'bg-green-dark': bgColor === 'green',
            'bg-blue-dark': bgColor === 'blue',
            'bg-white': bgColor === 'white',
            // vertical split
            // vertically center the content, remove the border radius on the edge, add some negative margin to pull the image beneath the hero content, left align the content
            'md:z-10 md:-order-1 md:-mr-5 md:ml-0 md:mt-0 md:justify-center md:rounded-l-none md:text-left':
              contentPosition === 'vertical-split',
            // below center/content header
            'justify-center md:mx-auto md:w-4/5':
              contentPosition === 'below-center',
            // Below left style
            'md:-mt-32 md:ml-[8%] md:mr-0 md:max-w-[58%] md:text-left':
              contentPosition === 'below-left',
            // styles for when the contain is fully contained within the image
            'md:mx-32 md:my-9 md:w-2/5': usesGridArea,
            'self-end justify-self-start': contentPosition === 'bottom-left',
            'self-start justify-self-start': contentPosition === 'top-left',
            'self-start justify-self-end': contentPosition === 'top-right',
            'self-end justify-self-end': contentPosition === 'bottom-right',
            'self-center justify-self-center': contentPosition === 'center',
          },
        )}
        {...rest}
        style={usesGridArea ? { gridArea: 'hero' } : undefined}
        ref={ref}
      >
        <h1>{heading}</h1>

        {description && (
          <p className="text-lg font-semibold md:text-xl">{description}</p>
        )}
        {children}
      </div>
    );
  },
);
