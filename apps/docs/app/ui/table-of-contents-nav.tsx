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
  const sections: Array<{
    href: string;
    text: string;
    subSections: Array<{ href: string; text: string }>;
  }> = [];

  for (const block of content ?? []) {
    // a h2 marks the start of a new section
    if (block._type === 'block' && block.style === 'h2') {
      const section = {
        href: `#${block._key}`,
        text: block.children?.[0].text ?? '',
        subSections: [],
      };

      sections.push(section);
    }

    // every h3 we discover is added to the latest section, as that is the section we are currently in
    if (block._type === 'block' && block.style === 'h3') {
      const latestSection = sections.at(-1);

      latestSection?.subSections.push({
        href: `#${block._key}`,
        text: block.children?.[0].text ?? '',
      });
    }
  }

  if (propsTables && propsTables.length > 0) {
    sections.push({
      href: '#props',
      text: 'Props',
      subSections: propsTables.map((componentName) => ({
        href: `#${componentName.toLowerCase()}-props`,
        text: componentName,
      })),
    });
  }

  return (
    // @ts-expect-error: the role prop is passed to the Card component, even though it is not valid TS
    // biome-ignore lint/a11y/useSemanticElements: this is a navigation component styled as a card
    <Card role="navigation" className={cx(className, 'h-fit min-h-96 bg-mint')}>
      <Heading level={2}>Innhold</Heading>
      <ul className="grid gap-y-4">
        {sections?.map(({ href, text, subSections = [] }) => (
          <li key={href}>
            <a href={href}>{text}</a>

            {subSections.length > 0 && (
              <ul className="description mt-4 ml-4 grid gap-y-4">
                {subSections.map(({ href, text }) => (
                  <li key={href}>
                    <a href={href}>{text}</a>
                  </li>
                ))}
              </ul>
            )}
          </li>
        ))}
      </ul>
    </Card>
  );
};

export { type TableOfContentsNavProps, TableOfContentsNav };
