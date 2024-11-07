import type { Meta } from '@storybook/react';
import { Card } from './Card';
import { Heading, Content } from '../content';
import { cx } from 'cva';

const meta: Meta<typeof Card> = {
  title: 'Card',
  component: Card,
  render: () => (
    <Card>
      <Content>
        <Heading level={3}>Min bolig</Heading>
        <p>
          Her finner du alt om din nye bolig og hva som venter deg fremover. Du
          finner dine dokumenter, salgsoppgave og mye mer.
        </p>
      </Content>
    </Card>
  ),
};

export default meta;

const Cards = ({ children }: { children: React.ReactNode }) => (
  <div className="grid gap-4">{children}</div>
);

export const WithBorder = () => {
  const colors = ['black', 'blue-dark', 'green-dark'] as const;

  return (
    <Cards>
      {colors.map((color) => (
        <Card border={color} key={color}>
          <Content>
            <Heading level={3}>Border {color}</Heading>
            <p>Dette kortet har {color} som border</p>
          </Content>
        </Card>
      ))}
    </Cards>
  );
};

export const WithBackground = () => {
  const bgColors = [
    'bg-mint-lightest',
    'bg-sky-light',
    'bg-blue-dark',
    'bg-green-dark',
  ] as const;
  return (
    <Cards>
      {bgColors.map((bgColor) => (
        <Card
          className={cx(bgColor, bgColor.includes('dark') && 'text-white')}
          key={bgColor}
        >
          <Content>
            <Heading level={3}>Bakgrunn {bgColor}</Heading>
            <p>Dette kortet har {bgColor} som bakgrunnsfarge</p>
          </Content>
        </Card>
      ))}
    </Cards>
  );
};
