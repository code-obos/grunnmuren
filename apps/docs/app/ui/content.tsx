import { PortableText } from '@portabletext/react';
import type { Content as IContent } from 'sanity.types';

const components = {};

export function Content({ content }: { content: IContent }) {
  return (
    <div className="prose">
      <PortableText value={content} components={components} />
    </div>
  );
}
