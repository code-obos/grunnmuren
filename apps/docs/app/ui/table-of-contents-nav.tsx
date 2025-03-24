import { Card, Heading } from '@obosbbl/grunnmuren-react';
import { cx } from 'cva';
import type { COMPONENT_QUERYResult } from 'sanity.types';

type TableOfContentsNavProps = {
  className?: string;
  content: NonNullable<COMPONENT_QUERYResult>['content'];
  propsTables?: string[] | null;
};

const TableOfContentsNav = ({
  className,
  content,
  propsTables,
}: TableOfContentsNavProps) => {
  const sections = (
    content?.filter(
      (c) =>
        c._type === 'block' &&
        // Only include headings (h1, h2, h3 etc.)
        c.style?.startsWith('h'),
    ) as {
      _key: string;
      children: { text: string }[];
    }[]
  ).map(({ _key, children }) => ({
    href: `#${_key}`,
    text: children[0].text,
  }));

  if (propsTables && propsTables.length > 0) {
    sections.push({
      href: '#props',
      text: 'Props',
    });

    for (const componentName of propsTables) {
      sections.push({
        href: `#${componentName.toLowerCase()}-props`,
        text: componentName,
      });
    }
  }

  return (
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
};

export { type TableOfContentsNavProps, TableOfContentsNav };
