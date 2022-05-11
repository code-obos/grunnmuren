import { createContext, useMemo } from 'react';
import classNames from 'clsx';
import { ButtonColorContext } from '../';
import { defu } from '../utils';
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

export interface HeroProps {
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

const defaultProps = {
  bgColor: 'white',
  contentPosition: 'below-center',
} as const;

export const Hero = (props: HeroProps) => {
  const {
    bgColor,
    children,
    className,
    contentPosition: contentPositionProp,
    image,
    ...rest
  } = defu(props, defaultProps);

  const hasImage = image != null;

  // If there is no image, we fall back to a below-center, a traditional looking "content header"
  // TODO: Remove casting once the return type of defu is fixed
  const contentPosition = (
    hasImage ? contentPositionProp : 'below-center'
  ) as HeroContentPosition;

  // TODO: Remove casting once the return type of defu is fixed
  const context = useMemo(
    () => ({
      bgColor: bgColor as HeroColor,
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
          className={classNames(
            className,
            // disable padding on small screens so the hero image is flush with the screen edges
            '<md:px-0 container md:grid',
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
        >
          {image}
          {children}
        </div>
      </HeroContext.Provider>
    </ButtonColorContext.Provider>
  );
};
