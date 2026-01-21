import type { Preview } from '@storybook/react-vite';
import { STORY_FINISHED } from 'storybook/internal/core-events';
import { SNIPPET_RENDERED } from 'storybook/internal/docs-tools';
import { useChannel } from 'storybook/preview-api';
import { GrunnmurenProvider } from '../packages/react/src';

import './storybook.css';

const preview: Preview = {
  decorators: [
    (StoryFn, context) => {
      // Communicate with the parent window
      useChannel({
        [STORY_FINISHED]: () => {
          if (context.viewMode === 'docs') return;

          window.parent.postMessage(
            {
              type: 'STORY_FINISHED',
              scrollHeight: document.body.scrollHeight,
            },
            '*',
          );
        },
        [SNIPPET_RENDERED]: ({ source, format }) => {
          if (context.viewMode === 'docs') return;

          window.parent.postMessage(
            { type: 'SOURCE_SNIPPET_RENDERED', source, format },
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
