import { PortableText } from '@portabletext/react';
import { cx } from 'cva';
import type { Content as IContent } from 'sanity.types';
import { AnchorHeading } from './anchor-heading';
import { ComponentPreview } from './component-preview';

export type ContentProps = {
  content: IContent;
  className?: string;
};

export function Content({ content, className }: ContentProps) {
  return (
    <div className={cx('prose', className)}>
      <PortableText
        value={content}
        components={{
          types: {
            'live-code-block': ({ value }) => (
              <ComponentPreview
                caption={value.caption}
                code={value.code.code}
              />
            ),
          },
          block: {
            h2: ({ children, value }) => (
              <AnchorHeading level={2} id={value._key ?? ''}>
                {children}
              </AnchorHeading>
            ),
            h3: ({ children, value }) => (
              <AnchorHeading level={3} id={value._key ?? ''}>
                {children}
              </AnchorHeading>
            ),
            h4: ({ children, value }) => (
              <AnchorHeading level={4} id={value._key ?? ''}>
                {children}
              </AnchorHeading>
            ),
            h5: ({ children, value }) => (
              <AnchorHeading level={5} id={value._key ?? ''}>
                {children}
              </AnchorHeading>
            ),
          },
        }}
      />
    </div>
  );
}
