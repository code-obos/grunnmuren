export type BlockBackgroundColor = 'yellow' | 'gray' | 'blue' | 'green';

export function useBlockBackgroundColor(
  blockBgColor: BlockBackgroundColor | undefined,
): string | undefined {
  switch (blockBgColor) {
    case 'gray':
      return 'bg-gray-concrete';
    case 'green':
      return 'bg-green-lightest';
    case 'yellow':
      return 'bg-yellow';
    case 'blue':
      return 'bg-blue-lightest';
  }
}
