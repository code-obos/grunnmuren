export type BlockBackgroundColor =
  | 'yellow'
  | 'gray'
  | 'blue'
  | 'green'
  | 'mint'
  | 'sky';

export function useBlockBackgroundColor(
  blockBgColor: BlockBackgroundColor | undefined,
): string | undefined {
  switch (blockBgColor) {
    case 'gray':
      return 'bg-gray-lightest';
    case 'green':
    case 'mint':
      return 'bg-mint-light';
    case 'yellow':
      return 'bg-yellow';
    case 'blue':
    case 'sky':
      return 'bg-sky-light';
  }
}
