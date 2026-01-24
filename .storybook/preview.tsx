import type { Preview } from '@storybook/react-vite';
import { STORY_FINISHED } from 'storybook/internal/core-events';
import { SNIPPET_RENDERED } from 'storybook/internal/docs-tools';
import { useChannel, useEffect } from 'storybook/preview-api';
import { GrunnmurenProvider } from '../packages/react/src';

import './storybook.css';
import { useRef } from 'react';

// only allow postmessages from these origins
const ALLOWED_MESSAGE_ORIGINS = new Set([
  'https://grunnmuren.obos.no',
  // grunnmuren docs running locally
  'http://localhost:3003',
]);

const preview: Preview = {
  decorators: [
    // decorator that communicates with the Grunnmuren docs site for embedded stories
    (Story, context) => {
      const sourceRef = useRef<string>(null);
      // if the storybook iframe loads before the parent window has finished loading,
      // this is how we pass data to the parent window. The parent sends a data request
      // that we respond to
      useEffect(() => {
        if (context.viewMode === 'docs') return;

        const messageHandler = (event: MessageEvent) => {
          if (!ALLOWED_MESSAGE_ORIGINS.has(event.origin)) return;
          console.log(event);

          const data = event.data;

          if (
            typeof data === 'object' &&
            'type' in data &&
            data.type === 'REQUEST_STORY_DATA'
          ) {
            window.parent.postMessage(
              {
                type: 'STORY_HEIGHT',
                scrollHeight: document.body.scrollHeight,
              },
              '*',
            );
            if (sourceRef.current) {
              window.parent.postMessage(
                {
                  type: 'STORY_SOURCE',
                  source: sourceRef.current,
                },
                '*',
              );
            }
          }
        };
        window.addEventListener('message', messageHandler);

        return () => {
          window.removeEventListener('message', messageHandler);
        };
      }, []);

      // If the frame parent loads before the iframe story, this is
      // how we pass the data to the parent window
      useChannel({
        [STORY_FINISHED]: () => {
          if (context.viewMode === 'docs') return;

          window.parent.postMessage(
            {
              type: 'STORY_HEIGHT',
              scrollHeight: document.body.scrollHeight,
            },
            '*',
          );
        },
        [SNIPPET_RENDERED]: ({ source }) => {
          if (context.viewMode === 'docs') return;

          sourceRef.current = source;

          window.parent.postMessage({ type: 'STORY_SOURCE', source }, '*');
        },
      });

      return Story();
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
