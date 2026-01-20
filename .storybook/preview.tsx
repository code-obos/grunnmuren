import type { Preview } from '@storybook/react-vite';
import {
  SNIPPET_RENDERED,
  STORY_RENDERED,
} from 'storybook/internal/docs-tools';
import { useChannel } from 'storybook/preview-api';
import { GrunnmurenProvider } from '../packages/react/src';

import './storybook.css';

const preview: Preview = {
  decorators: [
    (StoryFn, context) => {
      // Communicate with the parent window
      useChannel({
        [SNIPPET_RENDERED]: ({ source, format }) => {
          if (context.viewMode === 'docs') return;
          console.log(source, format);
          window.parent.postMessage(
            { type: 'SOURCE_CODE_RENDERED', source, format },
            '*',
          );
        },
        [STORY_RENDERED]: (ctx) => {
          if (context.viewMode === 'docs') return;
          console.log(ctx);

          window.parent.postMessage(
            {
              type: 'STORY_RENDERED',
              scrollHeight: document.body.scrollHeight,
            },
            '*',
          );
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
