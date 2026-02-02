import {
  ArrowRight,
  Bed,
  Documents,
  House,
  InfoCircle,
  PiggyBank,
} from '@obosbbl/grunnmuren-icons-react';
import type { Meta } from '@storybook/react-vite';
import { cx } from 'cva';
import { Avatar } from '../avatar';
import { Badge } from '../badge';
import { Button } from '../button';
import { Content, Footer, Heading, Media } from '../content';
import { Description } from '../label';
import { Card, CardLink } from './card';

const meta = {
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
} satisfies Meta<typeof Card>;

export default meta;

const Cards = ({ children }: { children: React.ReactNode }) => (
  <div className="grid gap-4">{children}</div>
);

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
        src="https://cdn.sanity.io/media-libraries/mln4u7f3Hc8r/images/99ef2e1ea751dbdebd992a6bc54f6b6c91915697-1600x837.jpg?auto=format"
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

export const OutlinedWithImageAnd = () => (
  <Card variant="outlined">
    <Media>
      <img
        alt=""
        src="https://cdn.sanity.io/media-libraries/mln4u7f3Hc8r/images/99ef2e1ea751dbdebd992a6bc54f6b6c91915697-1600x837.jpg?auto=format"
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
  <Card variant="outlined">
    <PiggyBank />
    <Content>
      <Heading level={3}>Kort med ikon i topp</Heading>
      <p>Dette kortet har svart border og et ikon i toppen</p>
    </Content>
  </Card>
);

export const WithIconBottom = () => (
  <Card variant="outlined">
    <Content>
      <Heading level={3}>Kort med ikon i bunn</Heading>
      <p>Dette kortet har svart border og et ikon i bunn</p>
    </Content>
    <PiggyBank />
  </Card>
);

const Illustration = () => (
  <svg
    aria-hidden="true"
    width="112"
    height="112"
    viewBox="0 0 112 112"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M29.8947 51.7441V25.0321H35.6627C37.6875 25.0321 39.6294 25.8364 41.0612 27.2682C42.493 28.7 43.2973 30.6419 43.2973 32.6667V44.1188C43.2973 46.1436 42.493 48.0855 41.0612 49.5173C39.6294 50.9491 37.6875 51.7534 35.6627 51.7534H29.8947V51.7441Z"
      fill="#002169"
    />
    <path
      d="M59.8827 27.4306C58.0224 25.8375 55.6539 24.9619 53.2047 24.9619C50.7555 24.9619 48.387 25.8375 46.5267 27.4306L17.304 52.4906V96.8053H89.1147V52.4906L59.8827 27.4306Z"
      fill="#0047BA"
    />
    <path d="M76.468 68.3198H60.8066V96.8052H76.468V68.3198Z" fill="white" />
    <path
      d="M60.8066 96.8053H76.468V97.664C76.4606 98.9934 75.9273 100.266 74.9847 101.203C74.042 102.141 72.7667 102.667 71.4373 102.667H65.8373C64.5031 102.667 63.2235 102.137 62.2801 101.193C61.3367 100.25 60.8066 98.9702 60.8066 97.636V96.7773V96.8053Z"
      fill="#BEDFEC"
    />
    <path
      d="M45.444 78.3161C43.387 78.3161 41.4142 77.4989 39.9597 76.0444C38.5052 74.5898 37.688 72.6171 37.688 70.5601C37.688 72.6171 36.8709 74.5898 35.4163 76.0444C33.9618 77.4989 31.989 78.3161 29.932 78.3161V83.7294H45.444V78.3161Z"
      fill="white"
    />
    <path
      d="M37.688 70.56C37.688 71.5785 37.8886 72.587 38.2784 73.528C38.6682 74.469 39.2395 75.3241 39.9597 76.0443C40.6799 76.7645 41.5349 77.3358 42.4759 77.7256C43.4169 78.1153 44.4255 78.316 45.444 78.316V68.2173H29.932V78.316C31.989 78.316 33.9618 77.4988 35.4163 76.0443C36.8709 74.5897 37.688 72.617 37.688 70.56Z"
      fill="#002169"
    />
    <path
      d="M100.203 94.0522C100.197 92.6146 99.7328 91.2164 98.8787 90.0602C98.0245 88.9039 96.8243 88.0498 95.452 87.6215V85.6988C95.4569 84.8639 95.2966 84.0363 94.9802 83.2636C94.6638 82.4909 94.1976 81.7885 93.6085 81.1968C93.0195 80.6051 92.3191 80.1358 91.5478 79.816C90.7766 79.4963 89.9496 79.3323 89.1147 79.3335C88.2829 79.3323 87.459 79.495 86.6902 79.8125C85.9214 80.13 85.2227 80.5959 84.6341 81.1836C84.0455 81.7714 83.5785 82.4694 83.2599 83.2377C82.9413 84.0061 82.7773 84.8297 82.7773 85.6615V87.5842C81.4061 88.0128 80.2071 88.8673 79.3545 90.0237C78.5019 91.1801 78.04 92.5781 78.036 94.0148V96.7495H100.203V94.0522Z"
      fill="#002169"
    />
    <path
      d="M91.868 30.8373C97.7958 30.8373 102.601 26.0318 102.601 20.1039C102.601 14.1761 97.7958 9.37061 91.868 9.37061C85.9401 9.37061 81.1346 14.1761 81.1346 20.1039C81.1346 26.0318 85.9401 30.8373 91.868 30.8373Z"
      fill="#BEDFEC"
    />
  </svg>
);

export const CardWithInlineTopIllustration = () => (
  <Card variant="outlined" className="w-72">
    <Illustration />
    <Content>
      <Heading level={3}>Utemiljø og grøntanlegg</Heading>
      <p>
        Et godt utemiljø er viktig for trivselen. Vi har en egen utenhusavdeling
        med flinke folk som kan hjelpe med realisering av nye prosjekter.
      </p>
    </Content>
  </Card>
);

export const CardWithCoveringIllustration = () => (
  <Card variant="outlined" className="w-72">
    <Media>
      <Illustration />
    </Media>
    <Content>
      <div className="grid gap-1">
        <Heading level={3}>Rødbergvn 88C</Heading>
        <small className="description">Bjerke - Oslo</small>
      </div>
      <small className="description -order-1">
        Forhåndsvarsling - Saksnr. F0347565
      </small>
      <p className="font-semibold">100 m² | Prisantydning 9 600 000 kr</p>
      <p className="flex gap-x-1">
        <House /> Rekkehus/småhus
      </p>
      <p className="flex gap-x-1">
        <Bed /> 3 soverom
      </p>
      <p className="flex gap-x-1">
        <PiggyBank /> Totalpris 9 989 838
      </p>
      <Badge size="small" color="mint">
        Visning 13. oktober
      </Badge>
    </Content>
  </Card>
);

export const ClickableWithIcon = () => (
  <Card variant="outlined">
    <Content>
      <Heading level={3}>
        <CardLink href="#card">Klikkbar med ikon</CardLink>
      </Heading>
      <p>Dette kortet er klikkbart og har svart border med et ikon</p>
    </Content>
    <ArrowRight className="transition-transform group-hover/card:motion-safe:translate-x-1" />
  </Card>
);

export const ClickableWithImage = () => (
  <Card>
    <Media>
      <img
        alt=""
        src="https://cdn.sanity.io/media-libraries/mln4u7f3Hc8r/images/99ef2e1ea751dbdebd992a6bc54f6b6c91915697-1600x837.jpg?auto=format"
      />
    </Media>
    <Content>
      <Heading level={3}>
        <CardLink href="#card">Klikkbar med bilde</CardLink>
      </Heading>
      <p>
        Dette kortet er klikkbart. Det har et bilde og er uten border. Derfor er
        alle hjørner på bildet avrundet.
      </p>
    </Content>
  </Card>
);

export const ClickableWithBackground = () => (
  <Card className="bg-blue-dark text-white">
    <Content>
      <Heading level={3}>
        <CardLink href="#card">Klikkbar med bakgrunnsfarge</CardLink>
      </Heading>
      <p>Dette kortet er klikkbart og har en bakgrunnsfarge</p>
    </Content>
    <ArrowRight className="transition-transform group-hover/card:motion-safe:translate-x-1" />
  </Card>
);

export const ClickableWithImageAndCTA = () => (
  <Card>
    <Media>
      <img
        alt=""
        src="https://cdn.sanity.io/media-libraries/mln4u7f3Hc8r/images/99ef2e1ea751dbdebd992a6bc54f6b6c91915697-1600x837.jpg?auto=format"
      />
    </Media>
    <Content>
      <Heading level={3}>Med bilde og CTA</Heading>
      <p>Dette kortet har bilde og er klikkbart mot en CTA-lenke</p>
      <CardLink className="group/cta">
        <Button href="#cta" variant="tertiary">
          Les mer
          <ArrowRight className="transition-transform group-hover/cta:motion-safe:translate-x-1" />
        </Button>
      </CardLink>
    </Content>
  </Card>
);

export const ClickableWithBackgroundAndCTA = () => (
  <Card className="bg-blue-dark text-white">
    <Content>
      <Heading level={3}>Bakgrunnsfarge og CTA</Heading>
      <p>Dette kortet har bakgrunnsfarge og er klikkbart mot en CTA-lenke.</p>
      <CardLink className="group/cta mt-1">
        <Button href="#cta" variant="tertiary">
          Les mer
          <ArrowRight className="transition-transform group-hover/cta:motion-safe:translate-x-1" />
        </Button>
      </CardLink>
    </Content>
  </Card>
);

export const ClickableWithOtherClickableElements = () => (
  <div className="flex gap-10">
    <Card variant="outlined" className="w-72">
      <Media>
        <img
          alt=""
          src="https://cdn.sanity.io/media-libraries/mln4u7f3Hc8r/images/410001cfde5211194e0072bf39abd3214befb1c2-1920x1080.jpg?auto=format"
        />
      </Media>
      <Content className="grow">
        <div className="grid gap-1">
          <Heading level={3}>
            <CardLink href="#card">Rødbergvn 88C</CardLink>
          </Heading>
          <small className="description">Bjerke - Oslo</small>
        </div>
        <small className="description -order-1">
          Forhåndsvarsling - Saksnr. F0347565
        </small>
        <p className="font-semibold">100 m² | Prisantydning 9 600 000 kr</p>
        <p className="flex gap-x-1">
          <House /> Rekkehus/småhus
        </p>
        <p className="flex gap-x-1">
          <Bed /> 3 soverom
        </p>
        <p className="flex gap-x-1">
          <PiggyBank /> Totalpris 9 989 838
        </p>
        <Badge size="small" color="mint">
          Visning 13. oktober
        </Badge>
        <Footer className="relative grid gap-y-2">
          <hr className="border-t border-t-current" />
          <Button href="#other-link" variant="tertiary">
            Se prospekt
            <Documents />
          </Button>
        </Footer>
      </Content>
    </Card>
  </div>
);

export const ClickableWithOtherClickableElementsAndBackgroundColor = () => (
  <Card variant="outlined" className="w-72 bg-blue-dark text-mint">
    <Media>
      <img
        alt=""
        src="https://cdn.sanity.io/media-libraries/mln4u7f3Hc8r/images/410001cfde5211194e0072bf39abd3214befb1c2-1920x1080.jpg?auto=format"
      />
    </Media>
    <Content>
      <div className="grid gap-1">
        <Heading level={3}>
          <CardLink href="#card">Rødbergvn 88C</CardLink>
        </Heading>
        <small className="description">Bjerke - Oslo</small>
      </div>
      <small className="description -order-1">
        Forhåndsvarsling - Saksnr. F0347565
      </small>
      <p className="font-semibold">100 m² | Prisantydning 9 600 000 kr</p>
      <p className="flex gap-x-1">
        <House /> Rekkehus/småhus
      </p>
      <p className="flex gap-x-1">
        <Bed /> 3 soverom
      </p>
      <p className="flex gap-x-1">
        <PiggyBank /> Totalpris 9 989 838
      </p>
      <Badge size="small" color="mint" className="text-black">
        Visning 13. oktober
      </Badge>
    </Content>
    <Footer className="relative grid gap-y-2">
      <hr className="border-t border-t-current" />
      <Button
        href="#other-link"
        variant="tertiary"
        className="data-focus-visible:outline-current"
      >
        Se prospekt
        <Documents />
      </Button>
    </Footer>
  </Card>
);

export const ClickableWithBadge = () => (
  <Card variant="outlined" className="w-72 bg-blue-dark text-mint">
    <Media>
      <Badge color="blue-dark">
        <InfoCircle />
        Meldefrist
      </Badge>
      <img
        alt=""
        src="https://cdn.sanity.io/media-libraries/mln4u7f3Hc8r/images/410001cfde5211194e0072bf39abd3214befb1c2-1920x1080.jpg?auto=format"
      />
    </Media>
    <Content>
      <div className="grid gap-1">
        <Heading level={3}>
          <CardLink href="#card">Rødbergvn 88C</CardLink>
        </Heading>
        <small className="description">Bjerke - Oslo</small>
      </div>
      <small className="description -order-1">
        Forhåndsvarsling - Saksnr. F0347565
      </small>
      <p className="font-semibold">100 m² | Prisantydning 9 600 000 kr</p>
      <p className="flex gap-x-1">
        <House /> Rekkehus/småhus
      </p>
      <p className="flex gap-x-1">
        <Bed /> 3 soverom
      </p>
      <p className="flex gap-x-1">
        <PiggyBank /> Totalpris 9 989 838
      </p>
      <Badge size="small" color="mint" className="text-black">
        Visning 13. oktober
      </Badge>
    </Content>
    <Footer className="relative grid gap-y-2">
      <hr className="border-t border-t-current" />
      <Button
        href="#other-link"
        variant="tertiary"
        className="focus-visible:outline-current"
      >
        Se prospekt
        <Documents />
      </Button>
    </Footer>
  </Card>
);

export const ClickableWithBadgeRight = () => (
  <Card variant="outlined" className="w-72 bg-blue-dark text-mint">
    <Media>
      <img
        alt=""
        src="https://cdn.sanity.io/media-libraries/mln4u7f3Hc8r/images/410001cfde5211194e0072bf39abd3214befb1c2-1920x1080.jpg?auto=format"
      />
      <Badge color="blue-dark">
        <InfoCircle />
        Meldefrist
      </Badge>
    </Media>
    <Content>
      <div className="grid gap-1">
        <Heading level={3}>
          <CardLink href="#card">Rødbergvn 88C</CardLink>
        </Heading>
        <small className="description">Bjerke - Oslo</small>
      </div>
      <small className="description -order-1">
        Forhåndsvarsling - Saksnr. F0347565
      </small>
      <p className="font-semibold">100 m² | Prisantydning 9 600 000 kr</p>
      <p className="flex gap-x-1">
        <House /> Rekkehus/småhus
      </p>
      <p className="flex gap-x-1">
        <Bed /> 3 soverom
      </p>
      <p className="flex gap-x-1">
        <PiggyBank /> Totalpris 9 989 838
      </p>
      <Badge size="small" color="mint" className="text-black">
        Visning 13. oktober
      </Badge>
    </Content>
    <Footer className="relative grid gap-y-2">
      <hr className="border-t border-t-current" />
      <Button
        href="#other-link"
        variant="tertiary"
        className="focus-visible:outline-current"
      >
        Se prospekt
        <Documents />
      </Button>
    </Footer>
  </Card>
);

export const HorizontalLeft = () => (
  <Card layout="horizontal">
    <Media>
      <img
        alt=""
        src="https://cdn.sanity.io/media-libraries/mln4u7f3Hc8r/images/99ef2e1ea751dbdebd992a6bc54f6b6c91915697-1600x837.jpg?auto=format"
      />
    </Media>
    <Content>
      <Heading level={3}>Med bilde til venstre</Heading>
      <p>
        Dette kortet har bilde til venstre på større skjermer og er klikkbart
        mot en CTA-lenke
      </p>
      <CardLink className="group/cta">
        <Button href="#cta" variant="tertiary">
          Les mer
          <ArrowRight className="transition-transform group-hover/cta:motion-safe:translate-x-1" />
        </Button>
      </CardLink>
    </Content>
  </Card>
);

export const HorizontalRight = () => (
  <Card layout="horizontal">
    <Content>
      <Heading level={3}>Med bilde til høyre</Heading>
      <p>
        Dette kortet har bilde til høyre på større skjermer og er klikkbart mot
        en CTA-lenke
      </p>
      <CardLink className="group/cta">
        <Button href="#cta" variant="tertiary">
          Les mer
          <ArrowRight className="transition-transform group-hover/cta:motion-safe:translate-x-1" />
        </Button>
      </CardLink>
    </Content>
    <Media>
      <img
        alt=""
        src="https://cdn.sanity.io/media-libraries/mln4u7f3Hc8r/images/99ef2e1ea751dbdebd992a6bc54f6b6c91915697-1600x837.jpg?auto=format"
      />
    </Media>
  </Card>
);

export const HorizontalWithIconLeft = () => (
  <Card layout="horizontal" variant="outlined">
    <PiggyBank />
    <Content>
      <Heading level={3}>Med ikon til venstre</Heading>
      <p>
        Dette kortet er liggende, har et ikon til venstre og er klikkbart mot en
        CTA-lenke
      </p>
      <CardLink className="group/cta">
        <Button href="#cta" variant="tertiary">
          Les mer
          <ArrowRight className="transition-transform group-hover/cta:motion-safe:translate-x-1" />
        </Button>
      </CardLink>
    </Content>
  </Card>
);

export const HorizontalWithIconRight = () => (
  <Card className="group/cta" layout="horizontal" variant="outlined">
    <Content>
      <Heading level={3}>
        <CardLink href="#cta">Med ikon til høyre</CardLink>
      </Heading>
      <p>
        Dette kortet er liggende, har et ikon til høyre og er klikkbart mot en
        CTA-lenke
      </p>
    </Content>
    <ArrowRight className="transition-transform group-hover/cta:motion-safe:translate-x-1" />
  </Card>
);

export const WithAvatar = () => (
  <Card layout="horizontal" variant="outlined" className="w-96 max-w-full">
    <Avatar src="https://cdn.sanity.io/media-libraries/mln4u7f3Hc8r/images/3c7245912b338f058f6f555a4b6c964911658d46-820x447.jpg?auto=format" />
    <Content>
      <div className="flex flex-col-reverse gap-2">
        <Heading level={3}>Daniel Kjørberg Siraj</Heading>
        <Description>Konsernsjef (CEO)</Description>
      </div>
      <p>Dette kortet er liggende, med et rundt bilde til høyre</p>
    </Content>
  </Card>
);
