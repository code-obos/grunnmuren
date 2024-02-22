import React from 'react';
import { Preview } from '@storybook/react';
import { GrunnmurenProvider } from '../packages/react/src/index';

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
