import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect, within } from 'storybook/test';
import { DateFormatter } from './date-formatter';

const meta = {
  title: 'DateFormatter',
  component: DateFormatter,
  render: (props) => <DateFormatter {...props} />,
} satisfies Meta<typeof DateFormatter>;

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
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await expect(canvas.getByText('19.08.1929')).toBeInTheDocument();
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
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await expect(canvas.getByText('19. august 1929')).toBeInTheDocument();
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
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await expect(
      canvas.getByText('19. august 1929 kl. 01:00:00'),
    ).toBeInTheDocument();
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
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await expect(
      canvas.getByText('18. august 1929 kl. 19:00:00'),
    ).toBeInTheDocument();
  },
};

export const Year: Story = {
  args: {
    value: new Date('1929-08-19'),
    options: {
      year: 'numeric',
    },
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await expect(canvas.getByText('1929')).toBeInTheDocument();
  },
};

export const ShortYear: Story = {
  args: {
    value: new Date('1929-08-19'),
    options: {
      year: '2-digit',
    },
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await expect(canvas.getByText('29')).toBeInTheDocument();
  },
};

export const Month: Story = {
  args: {
    value: new Date('1929-08-19'),
    options: {
      month: 'numeric',
    },
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await expect(canvas.getByText('8.')).toBeInTheDocument();
  },
};

export const LongMonth: Story = {
  args: {
    value: new Date('1929-08-19'),
    options: {
      month: 'long',
    },
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await expect(canvas.getByText('august')).toBeInTheDocument();
  },
};

export const ShortMonth: Story = {
  args: {
    value: new Date('1929-08-19'),
    options: {
      month: 'short',
    },
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await expect(canvas.getByText('aug')).toBeInTheDocument();
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
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await expect(canvas.getByText('August')).toBeInTheDocument();
  },
};

export const Day: Story = {
  args: {
    value: new Date('2001-01-01'),
    options: {
      day: 'numeric',
    },
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await expect(canvas.getByText('1.')).toBeInTheDocument();
  },
};

export default meta;
