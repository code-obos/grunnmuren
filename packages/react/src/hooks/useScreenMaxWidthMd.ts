import { useMedia } from '@/hooks';

export const useScreenMaxWidthMd = (defaultState: boolean) =>
  useMedia('(max-width: 767.9px)', defaultState);
