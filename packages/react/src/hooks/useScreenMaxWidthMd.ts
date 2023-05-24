import { useMediaQuery } from '@react-hookz/web';

export const useScreenMaxWidthMd = (defaultState: boolean) =>
  useMediaQuery('(max-width: 767.9px)', { initializeWithValue: defaultState });
