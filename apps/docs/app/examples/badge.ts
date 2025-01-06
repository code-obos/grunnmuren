import { PaintRoller } from '@obosbbl/grunnmuren-icons-react';
import { Badge } from '@obosbbl/grunnmuren-react';
import { cx } from 'cva';

const colors = [
  'mint',
  'sky',
  'blue-dark',
  'green-dark',
  'gray-dark',
  'white',
] as const;

export const examples = [
  {
    title: 'Badge',
    code: `
<>
${colors.map((color) => `    <Badge color="${color}">${color}</Badge>`).join('\n')}
</>
    `,
  },
  ...colors.map((color) => ({
    title: color.charAt(0).toUpperCase() + color.slice(1),
    code: `
<div className="${cx('space-x-4 p-2', color === 'white' && 'bg-gray')}">
  <Badge color="${color}" size="small">
    small
  </Badge>
  <Badge color="${color}" size="medium">
    medium
  </Badge>
  <Badge color="${color}" size="large">
    large
  </Badge>
</div>`,
  })),
  ...colors.map((color) => ({
    title: `${color.charAt(0).toUpperCase() + color.slice(1)} med ikon`,
    code: `
<div className="${cx('space-x-4 p-2', color === 'white' && 'bg-gray')}">
  <Badge color="${color}" size="small">
    <PaintRoller />
    small
  </Badge>
  <Badge color="${color}" size="medium">
    <PaintRoller />
    medium
  </Badge>
  <Badge color="${color}" size="large">
    <PaintRoller />
    large
  </Badge>
</div>`,
  })),
];

export const scope = { Badge, PaintRoller };
