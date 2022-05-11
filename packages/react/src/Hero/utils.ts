import type { HeroContentPosition } from './Hero';

export function usesGridAreaPlacement(contentPosition: HeroContentPosition) {
  return (
    contentPosition !== 'vertical-split' &&
    contentPosition !== 'below-center' &&
    contentPosition !== 'below-left'
  );
}
