import { PortableText } from '@portabletext/react';
import type { Content as IContent } from 'sanity.types';
import { ComponentPreview } from './component-preview';
import { Badge, Button } from '@obosbbl/grunnmuren-react';
import { PaintRoller, Edit, Search } from '@obosbbl/grunnmuren-icons-react';

const components = {
  types: {
    'live-code-block': ({ value }) => (
      <ComponentPreview
        scope={{ Badge, PaintRoller, Button, Edit, Search }}
        title={value.caption}
        code={value.code.code}
      />
    ),
  },
};

export function Content({ content }: { content: IContent }) {
  return (
    <div>
      <PortableText value={content} components={components} />
    </div>
  );
}
