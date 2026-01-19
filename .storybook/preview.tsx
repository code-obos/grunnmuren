import type { Preview } from '@storybook/react-vite';
// import { SNIPPET_RENDERED } from 'storybook/internal/docs-tools';
import { useChannel } from 'storybook/preview-api';
import { GrunnmurenProvider } from '../packages/react/src';

import './storybook.css';
import { useLayoutEffect } from 'react';
import { useEffect } from 'storybook/internal/preview-api';

const preview: Preview = {
  decorators: [
    (StoryFn, context) => {
      if (context.viewMode === 'docs') return StoryFn();
      console.log(context);

      useEffect(() => {
        window.parent.postMessage({ type: 'handshake' }, '*');
      }, []);

      // emitTransformCode(StoryFn(context.args, context), context).then(() =>
      //   console.log(context),
      // );

      useChannel({
        [SNIPPET_RENDERED]: ({ source, format }) => {
          console.log({ source, format });
          window.parent.postMessage(source, '*');
          // setSourceCode({ source, format });
        },
      });

      return StoryFn();
    },
    (Story) => (
      <GrunnmurenProvider locale="nb">
        <Story />
      </GrunnmurenProvider>
    ),
  ],
  tags: ['autodocs'],
  parameters: {
    docs: { codePanel: true },

    options: {
      storySort: {
        order: ['Home', '*'],
      },
    },
    backgrounds: {
      options: {
        'blue-dark': { name: 'Blue dark', value: '#002169' },
        white: { name: 'White', value: '#fff' },
      },
    },
  },
  initialGlobals: {
    backgrounds: { value: 'white' },
  },
};

export default preview;
