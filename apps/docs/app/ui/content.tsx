import { PortableText } from '@portabletext/react';
import type { Content as IContent } from 'sanity.types';
import { ComponentPreview } from './component-preview';
import { cx } from 'cva';

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
};

export function Content({ content, className }: ContentProps) {
  return (
    <div className={cx('prose', className)}>
      <PortableText value={content} components={components} />
    </div>
  );
}
