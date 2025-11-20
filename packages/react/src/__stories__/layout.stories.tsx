import { ArrowRight } from '@obosbbl/grunnmuren-icons-react';
import type { Meta } from '@storybook/react-vite';
import { Card, CardLink } from '../card';
import { Content, Heading, Media } from '../content';
import { UNSAFE_Hero as Hero } from '../hero';

const meta: Meta = {
  title: 'Layout',
};

export default meta;

export const GridContainer = () => (
  <main className="layout-grid-container">
    <Hero>
      <Content>
        <Heading level={1} size="xl">
          Jobb i OBOS
        </Heading>
        <p className="lead">
          Bli med å oppfylle boligdrømmer! Vi søker engasjerte og dyktige
          personer som vil ta OBOS videre. Søk på våre ledige stillinger!
        </p>
      </Content>
      <Media>
        <img
          src="https://cdn.sanity.io/media-libraries/mln4u7f3Hc8r/images/410001cfde5211194e0072bf39abd3214befb1c2-1920x1080.jpg?auto=format"
          alt=""
        />
      </Media>
    </Hero>
  </main>
);

export const GridContainerWithSubGrids = () => (
  <main className="layout-grid-container layout-gap-y">
    <h1 className="heading-xl sm:col-end-9">Dette er OBOS</h1>
    <ul className="layout-subgrid-12 *:md:col-span-3">
      <Card role="listitem">
        <Content>
          <Heading level={2}>
            <CardLink href="/bolig">Bolig</CardLink>
          </Heading>
          <p>Oppfyll boligdrømmen med OBOS!</p>
        </Content>
        <ArrowRight className="transition-transform group-hover/card:motion-safe:translate-x-1" />
      </Card>
      <Card role="listitem">
        <Content>
          <Heading level={2}>
            <CardLink href="/medlem">Medlem</CardLink>
          </Heading>
          <p>Bli medlem i OBOS og få tilgang til eksklusive fordeler!</p>
        </Content>
        <ArrowRight className="transition-transform group-hover/card:motion-safe:translate-x-1" />
      </Card>
      <Card role="listitem">
        <Content>
          <Heading level={2}>
            <CardLink href="/bli-bankkunde">Bank</CardLink>
          </Heading>
          <p>
            OBOS Bank tilbyr konkurransedyktige rente på boliglån og sparekonto!
          </p>
        </Content>
        <ArrowRight className="transition-transform group-hover/card:motion-safe:translate-x-1" />
      </Card>
      <Card role="listitem">
        <Content>
          <Heading level={2}>
            <CardLink href="/medlem-i-obos">Forkjøp</CardLink>
          </Heading>
          <p>
            Som medlem i OBOS har du forkjøpsrett på tusenvis av boliger hvert
            år!
          </p>
        </Content>
        <ArrowRight className="transition-transform group-hover/card:motion-safe:translate-x-1" />
      </Card>
    </ul>
  </main>
);
