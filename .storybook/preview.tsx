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
};

export default preview;
