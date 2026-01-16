import type { Preview } from '@storybook/react-vite';
import { GrunnmurenProvider } from '../packages/react/src';

import './storybook.css';

const preview: Preview = {
  decorators: [
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
