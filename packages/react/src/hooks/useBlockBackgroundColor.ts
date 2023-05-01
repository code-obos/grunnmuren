export type BlockBackgroundColor = 'yellow' | 'gray' | 'blue' | 'green';

export function useBlockBackgroundColor(
  blockBgColor: BlockBackgroundColor | undefined,
): string | undefined {
  switch (blockBgColor) {
    case 'gray':
      return 'bg-gray-lightest';
    case 'green':
      return 'bg-mint-light';
    case 'yellow':
      return 'bg-yellow';
    case 'blue':
      return 'bg-sky-light';
  }
}
