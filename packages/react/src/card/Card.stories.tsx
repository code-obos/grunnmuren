import type { Meta } from '@storybook/react';
import { Card } from './Card';
import { Heading, Content, Media } from '../content';
import { cx } from 'cva';
import { PiggyBank } from '@obosbbl/grunnmuren-icons-react';

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

export const WithImage = () => (
  <Card>
    <Media>
      <img
        alt=""
        src="https://res.cloudinary.com/obosit-prd-ch-clry/image/upload/obos-logo-socialmeta.jpg"
      />
    </Media>
    <Content>
      <Heading level={3}>Kort med bilde</Heading>
      <p>
        Dette kortet har et bilde og er uten border. Derfor er alle hjørner på
        bildet avrundet.
      </p>
    </Content>
  </Card>
);

export const WithImageAndBorder = () => (
  <Card border="blue-dark">
    <Media>
      <img
        alt=""
        src="https://res.cloudinary.com/obosit-prd-ch-clry/image/upload/obos-logo-socialmeta.jpg"
      />
    </Media>
    <Content>
      <Heading level={3}>Kort med bilde og border</Heading>
      <p>
        Dette kortet har et bilde og border. Derfor er kun hjørnene i toppen
        avrundet.
      </p>
    </Content>
  </Card>
);

export const WithIconTop = () => (
  <Card border="black">
    <PiggyBank />
    <Content>
      <Heading level={3}>Kort med ikon i topp</Heading>
      <p>Dette kortet har svart border og et ikon</p>
    </Content>
  </Card>
);

export const WithIconBottom = () => (
  <Card border="black">
    <Content>
      <Heading level={3}>Kort med ikon i bunn</Heading>
      <p>Dette kortet har svart border og et ikon</p>
    </Content>
    <PiggyBank />
  </Card>
);
