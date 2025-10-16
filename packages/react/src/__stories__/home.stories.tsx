import type { Meta } from '@storybook/react-vite';
const meta: Meta = {
  title: 'Home',
  parameters: {
    previewTabs: {
      canvas: { hidden: true },
    },
    viewMode: 'page',
  },
};

// noinspection JSUnusedGlobalSymbols <"magically" included>
export default meta;

export const Page = {
  render: () => (
    <div>
      <h1 className="heading-xl mb-8">Velkommen til OBOS Grunnmuren</h1>
      <blockquote className="blockquote mb-8">
        Grunnmuren er... eh, grunnmuren i all visuell kommunikasjon; den bærer
        budskapets vekt og gir strukturen vi bygger vår forståelse på.
      </blockquote>
      <span className="text-9xl">🐩</span>
    </div>
  ),
};
