import type { Meta, StoryObj } from '@storybook/react';
import { Cards, Card } from './Cards';
import { Heading, Content, Media } from '../content';
import { ArrowRight } from '@obosbbl/grunnmuren-icons-react';

const meta: Meta<typeof Cards> = {
  title: 'Cards',
  component: Cards,
  render: (props) => (
    <Cards {...props}>
      <Card href="card-1">
        <Media>
          <img
            alt=""
            src="https://res.cloudinary.com/obosit-prd-ch-clry/image/upload/obos-logo-socialmeta.jpg"
          />
        </Media>
        <Heading level={3}>Kort 1</Heading>
        <Content>
          <p>Dette er en beskrivelse for kort 1</p>
        </Content>
      </Card>
      <Card href="card-2">
        <Media>
          <img
            alt=""
            src="https://res.cloudinary.com/obosit-prd-ch-clry/image/upload/obos-logo-socialmeta.jpg"
          />
        </Media>
        <Heading level={3}>Kort 2</Heading>
        <Content>
          <p>Dette er en beskrivelse for kort 2</p>
        </Content>
      </Card>
      <Card href="card-3">
        <Media>
          <img
            alt=""
            src="https://res.cloudinary.com/obosit-prd-ch-clry/image/upload/obos-logo-socialmeta.jpg"
          />
        </Media>
        <Heading level={3}>Kort 3</Heading>
        <Content>
          <p>Dette er en beskrivelse for kort 3</p>
        </Content>
      </Card>
      <Card href="card-4">
        <Media>
          <img
            alt=""
            src="https://res.cloudinary.com/obosit-prd-ch-clry/image/upload/obos-logo-socialmeta.jpg"
          />
        </Media>
        <Heading level={3}>Kort 4</Heading>
        <Content>
          <p>Dette er en beskrivelse for kort 4</p>
        </Content>
      </Card>
    </Cards>
  ),
};

export default meta;

type Story = StoryObj<typeof Cards>;

const defaultProps = {
  className: 'grid grid-cols-2 gap-6',
} as const;

export const CardsWithImage: Story = {
  args: {
    ...defaultProps,
  },
};

export const CardsWithoutImage = () => (
  <Cards {...defaultProps}>
    <Card href="card-1" border="black">
      <Heading level={3}>Kort 1</Heading>
      <Content>
        <p>Dette er en beskrivelse for kort 1</p>
      </Content>
      <ArrowRight className="transition-transform group-hover/card:motion-safe:translate-x-1" />
    </Card>
    <Card href="card-2" border="black">
      <Heading level={3}>Kort 2</Heading>
      <Content>
        <p>Dette er en beskrivelse for kort 2</p>
      </Content>
      <ArrowRight className="transition-transform group-hover/card:motion-safe:translate-x-1" />
    </Card>
    <Card href="card-3" border="black">
      <Heading level={3}>Kort 3</Heading>
      <Content>
        <p>Dette er en beskrivelse for kort 3</p>
      </Content>
      <ArrowRight className="transition-transform group-hover/card:motion-safe:translate-x-1" />
    </Card>
    <Card href="card-4" border="black">
      <Heading level={3}>Kort 4</Heading>
      <Content>
        <p>Dette er en beskrivelse for kort 4</p>
      </Content>
      <ArrowRight className="transition-transform group-hover/card:motion-safe:translate-x-1" />
    </Card>
  </Cards>
);
