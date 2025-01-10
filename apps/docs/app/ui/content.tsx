import { PortableText } from '@portabletext/react';
import type { Content as IContent } from 'sanity.types';
import { ComponentPreview } from './component-preview';

const components = {
  types: {
    'live-code-block': ({ value }) => (
      <ComponentPreview caption={value.caption} code={value.code.code} />
    ),
  },
};

export function Content({ content }: { content: IContent }) {
  return (
    <div className="prose">
      <PortableText value={content} components={components} />
    </div>
  );
}
