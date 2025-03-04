import { Card, Heading } from '@obosbbl/grunnmuren-react';
import { cx } from 'cva';

type TableOfContentsNavProps = {
  className?: string;
  sections?: Array<{
    href: string;
    text: string;
  }>;
};

const TableOfContentsNav = ({
  className,
  sections,
}: TableOfContentsNavProps) => (
  // @ts-expect-error: the role prop is passed to the Card component, even though it is not valid TS
  // biome-ignore lint/a11y/useSemanticElements: this is a navigation component styled as a card
  <Card role="navigation" className={cx(className, 'h-fit min-h-96 bg-mint')}>
    <Heading level={2}>Innhold</Heading>
    <ul className="grid gap-y-[inherit]">
      {sections?.map(({ href, text }) => (
        <li key={href}>
          <a href={href}>{text}</a>
        </li>
      ))}
    </ul>
  </Card>
);

export { type TableOfContentsNavProps, TableOfContentsNav };
