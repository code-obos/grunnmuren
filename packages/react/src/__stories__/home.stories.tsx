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
      <h1 className="heading-xl mb-8">Storybook for OBOS Grunnmuren</h1>
      <p className="lead mb-8">
          Storybooken brukes fremst til å lage eksempler under utvikling. Men her finner du kodeeksempler og litt dokumentasjon for React-komponenter og tailwind-klasser.
      </p>
      <span className="text-9xl">🐩</span>
    </div>
  ),
};
