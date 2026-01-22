import type { Preview } from '@storybook/react-vite';
import { STORY_FINISHED } from 'storybook/internal/core-events';
import { SNIPPET_RENDERED } from 'storybook/internal/docs-tools';
import { useChannel, useEffect } from 'storybook/preview-api';
import { GrunnmurenProvider } from '../packages/react/src';

import './storybook.css';

// only allow postmessages from these origins
const ALLOWED_MESSAGE_ORIGINS = new Set([
  'https://grunnmuren.obos.no',
  // grunnmuren docs running locally
  'http://localhost:3003',
]);

const preview: Preview = {
  decorators: [
    (StoryFn, context) => {
      useEffect(() => {
        if (context.viewMode === 'docs') return;

        const messageHandler = (event: MessageEvent) => {
          if (!ALLOWED_MESSAGE_ORIGINS.has(event.origin)) return;
          console.log(event);

          const data = event.data;

          if (
            typeof data === 'object' &&
            'type' in data &&
            data.type === 'FRAME_PARENT_MOUNTED'
          ) {
            console.log('parent requesting data');
          }

          window.parent.postMessage(
            {
              type: 'STORY_FINISHED',
              scrollHeight: document.body.scrollHeight,
            },
            '*',
          );

          // const data = event.data;

          // if (typeof data === 'object' && 'type' in data) {
          //   if (data.type === 'SOURCE_SNIPPET_RENDERED') {
          //     setSourceCode(data.source);
          //   } else if (data.type === 'STORY_FINISHED') {
          //     setContentHeight(data.scrollHeight);
          //   }
          // }
        };
        window.addEventListener('message', messageHandler);

        return () => {
          window.removeEventListener('message', messageHandler);
        };
        // Your effect logic here
      }, []);

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
