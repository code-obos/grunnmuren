import type { Meta } from '@storybook/react';
import { DateFormatter } from './DateFormatter';

const meta: Meta = {
  title: 'DateFormatter',
};

export const Default = () => <DateFormatter value={new Date()} />;

export const LongDate = () => (
  <DateFormatter
    value={new Date()}
    options={{
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    }}
  />
);

export const FullDateTime = () => (
  <DateFormatter
    value={new Date()}
    options={{
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: 'numeric',
      minute: 'numeric',
      second: 'numeric',
    }}
  />
);

export const WithCustomTimeZone = () => (
  <DateFormatter
    value={new Date()}
    options={{
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: 'numeric',
      minute: 'numeric',
      second: 'numeric',
      timeZone: 'EST',
    }}
  />
);

export const Year = () => (
  <DateFormatter
    value={new Date()}
    options={{
      year: 'numeric',
    }}
  />
);

export const ShortYear = () => (
  <DateFormatter
    value={new Date()}
    options={{
      year: '2-digit',
    }}
  />
);

export const Month = () => (
  <DateFormatter
    value={new Date()}
    options={{
      month: 'numeric',
    }}
  />
);

export const LongMonth = () => (
  <DateFormatter
    value={new Date()}
    options={{
      month: 'long',
    }}
  />
);

export const ShortMonth = () => (
  <DateFormatter
    value={new Date()}
    options={{
      month: 'short',
    }}
  />
);

export const CapitalizedMonth = () => (
  <DateFormatter
    value={new Date()}
    options={{
      month: 'long',
    }}
    render={(formattedDate: string) =>
      formattedDate.charAt(0).toUpperCase() + formattedDate.slice(1)
    }
  />
);

export const Day = () => (
  <DateFormatter
    value={new Date()}
    options={{
      day: 'numeric',
    }}
  />
);

export const ShortDay = () => (
  <DateFormatter
    value={new Date()}
    options={{
      day: '2-digit',
    }}
  />
);

export default meta;
