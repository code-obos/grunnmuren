import type { Meta, StoryObj } from '@storybook/react';
import { Heading, Media, Content } from '../content';
import { UNSAFE_Hero as Hero } from './hero';
import { Description } from '../label';
import { VideoLoop } from '../video-loop';

const meta: Meta<typeof Hero> = {
  title: 'Hero',
  component: Hero,
  parameters: {
    // disable built in padding in story, because we provide our own
    layout: 'fullscreen',
  },
  render: () => (
    <main className="container">
      <Hero>
        <Content>
          <Heading level={2}>Dette er en Hero</Heading>
          <Description>– et samarbeidsprosjekt med Nordr</Description>
        </Content>
        <Media>
          <img
            src="https://res.cloudinary.com/obosit-prd-ch-clry/image/upload/f_auto,c_limit,w_2048,q_auto/v1582122753/Boligprosjekter/Oslo/Ulven/Ulven-N%C3%A6romr%C3%A5de-Oslo-OBOS-Construction-city.jpg"
            alt="Random"
          />
        </Media>
      </Hero>
      <p>Test</p>
      <VideoLoop
        src="https://res.cloudinary.com/obosit-prd-ch-clry/video/upload/v1732199756/Mellom%20husene/Frysja_Loop2.mp4"
        format="mp4"
        alt="En postbil kjører rundt i det moderne nabolaget på Frysja. Her finnes det fine uteområder, med husker og kafeer."
      />
    </main>
  ),
};

export default meta;

type Story = StoryObj<typeof Hero>;

export const WithImage: Story = {
  args: {},
};

export const WithVideoLoop = () => (
  <main className="container">
    <Hero>
      <Content>
        <Heading level={2}>Dette er en Hero</Heading>
        <Description>– et samarbeidsprosjekt med Nordr</Description>
      </Content>
      <Media>
        <VideoLoop
          src="https://res.cloudinary.com/obosit-prd-ch-clry/video/upload/v1732199756/Mellom%20husene/Frysja_Loop2.mp4"
          format="mp4"
          alt="En postbil kjører rundt i det moderne nabolaget på Frysja. Her finnes det fine uteområder, med husker og kafeer."
        />
      </Media>
    </Hero>

    <p>Test</p>
    <VideoLoop
      src="https://res.cloudinary.com/obosit-prd-ch-clry/video/upload/v1732199756/Mellom%20husene/Frysja_Loop2.mp4"
      format="mp4"
      alt="En postbil kjører rundt i det moderne nabolaget på Frysja. Her finnes det fine uteområder, med husker og kafeer."
    />
  </main>
);
