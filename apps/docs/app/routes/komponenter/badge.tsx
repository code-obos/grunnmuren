import { PropsTable } from '@/ui/props-table';
import { createFileRoute } from '@tanstack/react-router';
import { BadgeDoc } from '../../../docgen';
import { ComponentPreview } from '@/ui/component-preview';
import { Badge } from '@obosbbl/grunnmuren-react';
import { PaintRoller } from '@obosbbl/grunnmuren-icons-react';
import { cx } from 'cva';

export const Route = createFileRoute('/komponenter/badge')({
  component: Page,
});

const colors = [
  'mint',
  'sky',
  'blue-dark',
  'green-dark',
  'gray-dark',
  'white',
] as const;

const examples = [
  {
    title: 'Badge',
    code: (
      <>
        {colors.map((color) => (
          <Badge color={color}>{color}</Badge>
        ))}
      </>
    ),
  },
  ...colors.map((color) => ({
    title: color.charAt(0).toUpperCase() + color.slice(1),
    code: (
      <div className={cx('space-x-4 p-2', color === 'white' && 'bg-gray')}>
        <Badge color={color} size="small">
          small
        </Badge>
        <Badge color={color} size="medium">
          medium
        </Badge>
        <Badge color={color} size="large">
          large
        </Badge>
      </div>
    ),
  })),
  ...colors.map((color) => ({
    title: `${color.charAt(0).toUpperCase() + color.slice(1)} med ikon`,
    code: (
      <div className={cx('space-x-4 p-2', color === 'white' && 'bg-gray')}>
        <Badge color={color} size="small">
          <PaintRoller />
          small
        </Badge>
        <Badge color={color} size="medium">
          <PaintRoller />
          medium
        </Badge>
        <Badge color={color} size="large">
          <PaintRoller />
          large
        </Badge>
      </div>
    ),
  })),
];

function Page() {
  return (
    <>
      <h1 className="heading-l mb-12 mt-9">{BadgeDoc.displayName}</h1>
      <div className="prose">
        <p>{BadgeDoc.description}</p>
      </div>

      {examples.map(({ title, code }) => (
        <ComponentPreview
          scope={{ Badge, PaintRoller }}
          key={title}
          title={title}
          code={code}
        />
      ))}

      <PropsTable props={BadgeDoc.props} />
    </>
  );
}
