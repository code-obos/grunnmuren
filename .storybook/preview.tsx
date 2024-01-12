import React from 'react';
import { Preview } from '@storybook/react';
import { I18nProvider } from '../packages/react/src/index';

import './storybook.css';

const preview: Preview = {
  decorators: [
    (Story) => (
      <I18nProvider locale="nb">
        <Story />
      </I18nProvider>
    ),
  ],
};

export default preview;
