import {
  Button,
  Hero,
  HeroProps,
  HeroContent,
  HeroImage,
  HeroActions,
} from '../../';

const metadata = {
  title: 'Hero',
  argTypes: {
    contentPosition: {
      options: [
        'below-center',
        'below-left',
        'top-left',
        'bottom-left',
        'top-right',
        'bottom-right',
        'center',
        'vertical-split',
      ],
      control: { type: 'select' },
    },
    bgColor: {
      options: ['white', 'blue', 'green'],
      control: { type: 'select' },
    },
  },
};

export default metadata;

const heading = 'Velkommen til visning';
const description =
  'Se hva vi selger der du vil bo og finn drømmeboligen til fastpris. Du kan forhåndsbestille visning eller kontakte prosjektselgerne – påmeldingsskjema og kontaktinformasjon finner du på hvert enkelt boligprosjekt.';

const image = {
  src: 'https://res.cloudinary.com/obosit-prd-ch-clry/image/upload/c_fill,g_auto,w_600,h_700/f_auto,q_auto/v1578381769/Hammersborg%20Inkasso/2018_Bank_003',
  mdSrc:
    'https://res.cloudinary.com/obosit-prd-ch-clry/image/upload/c_fill,g_auto,w_1280/f_auto,q_auto/v1578381769/Hammersborg%20Inkasso/2018_Bank_003',
  alt: 'To personer finner svar på spørsmål via kundeservicesidene',
};

export function WithImage(props: HeroProps) {
  const heroImage = <HeroImage {...image} />;

  return (
    <Hero image={heroImage} {...props}>
      <HeroContent heading={heading} description={description}>
        <HeroActions>
          <Button>Primary</Button>
          <Button variant="secondary">Secondary</Button>
        </HeroActions>
      </HeroContent>
    </Hero>
  );
}

WithImage.args = {
  contentPosition: 'below-center',
  bgColor: 'white',
};

export function WithoutImage(props: HeroProps) {
  return (
    <Hero {...props}>
      <HeroContent heading={heading} description={description}>
        <HeroActions>
          <Button>Primary</Button>
          <Button variant="secondary">Secondary</Button>
        </HeroActions>
      </HeroContent>
    </Hero>
  );
}

WithoutImage.args = {
  contentPosition: 'below-center',
  bgColor: 'white',
};
