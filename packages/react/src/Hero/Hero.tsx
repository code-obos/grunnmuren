import { createContext, forwardRef, useMemo } from 'react';
import { cx } from '@/utils';
import { ButtonColorContext } from '../';
import { usesGridAreaPlacement } from './utils';

export const HeroContext = createContext<{
  bgColor: HeroColor;
  contentPosition: HeroContentPosition;
  hasImage: boolean;
}>({ bgColor: 'white', contentPosition: 'below-center', hasImage: false });

export type HeroColor = 'green' | 'blue' | 'white';

export type HeroContentPosition =
  | 'below-center'
  | 'below-left'
  | 'top-left'
  | 'bottom-left'
  | 'top-right'
  | 'bottom-right'
  | 'center'
  | 'vertical-split';

export interface HeroProps extends React.ComponentPropsWithoutRef<'div'> {
  /** @default white */
  bgColor?: HeroColor;
  className?: string;
  children: React.ReactNode;
  /** Positioning of the content relative to the image. Only affects wider screens
   * @default below-center
   */
  contentPosition?: HeroContentPosition;
  /** Instance of HeroImage */
  image?: React.ReactNode;
}

export const Hero = forwardRef<HTMLDivElement, HeroProps>((props, ref) => {
  const {
    bgColor = 'white',
    children,
    className,
    contentPosition: contentPositionProp = 'below-center',
    image,
    ...rest
  } = props;

  const hasImage = image != null;

  // If there is no image, we fall back to a below-center, a traditional looking "content header"
  const contentPosition = hasImage ? contentPositionProp : 'below-center';

  const context = useMemo(
    () => ({
      bgColor,
      contentPosition,
      hasImage,
    }),
    [bgColor, contentPosition, hasImage],
  );

  return (
    <ButtonColorContext.Provider
      value={bgColor === 'white' ? 'standard' : 'light-green'}
    >
      <HeroContext.Provider value={context}>
        <div
          className={cx(
            className,
            // disable padding on small screens so the hero image is flush with the screen edges
            'container px-0 md:grid lg:px-4',
            {
              'md:grid-cols-[50%,50%]': contentPosition === 'vertical-split',
            },
          )}
          style={
            usesGridAreaPlacement(contentPosition)
              ? { gridTemplateAreas: '"hero"' }
              : undefined
          }
          {...rest}
          ref={ref}
        >
          {image}
          {children}
        </div>
      </HeroContext.Provider>
    </ButtonColorContext.Provider>
  );
});
