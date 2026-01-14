import type { Meta, StoryObj } from '@storybook/react-vite';
import { DateFormatter } from './date-formatter';

const meta: Meta<typeof DateFormatter> = {
  title: 'DateFormatter',
  component: DateFormatter,
  render: (props) => <DateFormatter {...props} />,
};

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    value: new Date('1929-08-19'),
    options: {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
    },
  },
};

export const LongDate: Story = {
  args: {
    value: new Date('1929-08-19'),
    options: {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    },
  },
};

export const FullDateTime: Story = {
  args: {
    value: new Date('1929-08-19'),
    options: {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: 'numeric',
      minute: 'numeric',
      second: 'numeric',
    },
  },
};

export const WithCustomTimeZone: Story = {
  args: {
    value: new Date('1929-08-19'),
    options: {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: 'numeric',
      minute: 'numeric',
      second: 'numeric',
      timeZone: 'EST',
    },
  },
};

export const Year: Story = {
  args: {
    value: new Date('1929-08-19'),
    options: {
      year: 'numeric',
    },
  },
};

export const ShortYear: Story = {
  args: {
    value: new Date('1929-08-19'),
    options: {
      year: '2-digit',
    },
  },
};

export const Month: Story = {
  args: {
    value: new Date('1929-08-19'),
    options: {
      month: 'numeric',
    },
  },
};

export const LongMonth: Story = {
  args: {
    value: new Date('1929-08-19'),
    options: {
      month: 'long',
    },
  },
};

export const ShortMonth: Story = {
  args: {
    value: new Date('1929-08-19'),
    options: {
      month: 'short',
    },
  },
};

export const CapitalizedMonth: Story = {
  args: {
    value: new Date('1929-08-19'),
    options: {
      month: 'long',
    },
  },
  render: (props) => (
    <DateFormatter {...props}>
      {(formattedDate: string) =>
        formattedDate.charAt(0).toUpperCase() + formattedDate.slice(1)
      }
    </DateFormatter>
  ),
};

export const Day: Story = {
  args: {
    value: new Date('2001-01-01'),
    options: {
      day: 'numeric',
    },
  },
};

export default meta;
