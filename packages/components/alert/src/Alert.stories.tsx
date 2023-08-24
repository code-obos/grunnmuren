import type { Meta } from '@storybook/react';
import { Alert, AlertProps } from './Alert';

const variants: AlertProps['variant'][] = [
  'info',
  'success',
  'warning',
  'error',
];

const meta: Meta<typeof Default> = {
  title: 'Alert',
  component: Alert,
};

export default meta;

export const Default = () => {
  return (
    <div className="flex gap-4">
      <div className="flex flex-col gap-2">
        {variants.map((variant) => (
          <>
            <Alert key={variant} variant={variant}>
              Alert variant: <code>{variant}</code>
            </Alert>
            <Alert key={variant + '-lang'} variant={variant}>
              Alert variant: <code>{variant}</code> med lang tekst som brekker
              over flere linjer
            </Alert>
          </>
        ))}
      </div>
      <div className="flex flex-col gap-2">
        {variants.map((variant) => (
          <>
            <Alert key={variant} variant={variant} withoutIcon>
              Alert variant: <code>{variant}</code>
            </Alert>
            <Alert key={variant + '-lang'} variant={variant} withoutIcon>
              Alert variant: <code>{variant}</code> med lang tekst som brekker
              over flere linjer
            </Alert>
          </>
        ))}
      </div>
    </div>
  );
};
