import type { Preview } from '@storybook/react';
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
};

export default preview;
