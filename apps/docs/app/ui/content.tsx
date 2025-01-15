import { PortableText } from '@portabletext/react';
import { cx } from 'cva';
import type { Content as IContent } from 'sanity.types';
import { AnchorHeading } from './anchor-heading';
import { ComponentPreview } from './component-preview';

export type ContentProps = {
  content: IContent;
  className?: string;
};

const components = {
  types: {
    'live-code-block': ({ value }) => (
      <ComponentPreview caption={value.caption} code={value.code.code} />
    ),
  },
  block: {
    h2: ({ children, node }) => (
      <AnchorHeading level={2} id={node._key}>
        {children}
      </AnchorHeading>
    ),
    h3: ({ children, node }) => (
      <AnchorHeading level={3} id={node._key}>
        {children}
      </AnchorHeading>
    ),
    h4: ({ children, node }) => (
      <AnchorHeading level={4} id={node._key}>
        {children}
      </AnchorHeading>
    ),
    h5: ({ children, node }) => (
      <AnchorHeading level={5} id={node._key}>
        {children}
      </AnchorHeading>
    ),
  },
};

export function Content({ content, className }: ContentProps) {
  return (
    <div className={cx('prose', className)}>
      <PortableText value={content} components={components} />
    </div>
  );
}
