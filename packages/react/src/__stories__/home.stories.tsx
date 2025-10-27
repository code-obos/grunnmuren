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
        Storybook brukes primært til å utvikle og presentere eksempler på
        komponenter og grunnelementer som er under arbeid. Her finner du også
        kodeeksempler og dokumentasjon for React-komponenter og
        Tailwind-klasser, slik at du raskt kan forstå bruk, varianter og
        anbefalte mønstre.
      </p>
    </div>
  ),
};
