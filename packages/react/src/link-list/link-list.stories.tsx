import type { Meta } from '@storybook/react-vite';
import { Heading } from '../content';
import { UNSAFE_Link as Link } from '../link';
import { LinkList, LinkListContainer, LinkListItem } from './link-list';

const meta = {
  title: 'LinkList',
  component: LinkList,
  decorators: [
    (Story) => {
      return <div className="grid gap-y-8">{Story()}</div>;
    },
  ],
} satisfies Meta<typeof LinkList>;

export default meta;

export const Default = () => (
  <LinkList>
    <LinkListItem>
      <Link href="/bolig">Bolig</Link>
    </LinkListItem>
    <LinkListItem>
      <Link href="/bank">Bank</Link>
    </LinkListItem>
    <LinkListItem>
      <Link href="/medlem">Medlem</Link>
    </LinkListItem>
  </LinkList>
);

export const Download = () => (
  <LinkList>
    <LinkListItem>
      <Link download href="/">
        Medlemsvilkår
      </Link>
    </LinkListItem>
    <LinkListItem>
      <Link download href="/about">
        Samtykke
      </Link>
    </LinkListItem>
  </LinkList>
);

export const ExternalLinkListItems = () => (
  <LinkList>
    <LinkListItem>
      <Link href="https://minside.obosnett.no/login" rel="external">
        OBOS Nett - Min side
      </Link>
    </LinkListItem>
    <LinkListItem>
      <Link
        href="https://www.tryg.no/forsikringer/fordeler-hos-tryg/bruk-medlemsfordelene-dine/obos/index.html?cmpid=obos_tryggjennomlivet"
        rel="external noopener noreferrer"
        target="_blank"
      >
        Les mer om trygg forsikring
      </Link>
    </LinkListItem>
  </LinkList>
);

export const WithHeadings = () => (
  <LinkListContainer>
    <Heading level={2}>
      <Link href="/om">OBOS</Link>
    </Heading>
    <LinkList>
      <LinkListItem>
        <Link href="/bolig">Bolig</Link>
      </LinkListItem>
      <LinkListItem>
        <Link href="/bank">Bank</Link>
      </LinkListItem>
      <LinkListItem>
        <Link href="/medlem">Medlem</Link>
      </LinkListItem>
    </LinkList>
  </LinkListContainer>
);

export const GridLayout = () => (
  <>
    <LinkListContainer layout="grid">
      <Heading level={2}>2 items</Heading>
      <LinkList>
        <LinkListItem>
          <Link download href="/">
            Medlemsvilkår
          </Link>
        </LinkListItem>
        <LinkListItem>
          <Link download href="/about">
            Samtykke
          </Link>
        </LinkListItem>
      </LinkList>
    </LinkListContainer>
    <LinkListContainer layout="grid">
      <Heading level={2}>3 items</Heading>
      <LinkList>
        <LinkListItem>
          <Link href="/bolig">Bolig</Link>
        </LinkListItem>
        <LinkListItem>
          <Link href="/bank">Bank</Link>
        </LinkListItem>
        <LinkListItem>
          <Link href="/medlem">Medlem</Link>
        </LinkListItem>
      </LinkList>
    </LinkListContainer>
    <LinkListContainer layout="grid">
      <Heading level={2}>5 items</Heading>
      <LinkList>
        <LinkListItem>
          <Link href="/konsernledelsen">Konsernledelsen</Link>
        </LinkListItem>
        <LinkListItem>
          <Link href="/styret">Styret</Link>
        </LinkListItem>
        <LinkListItem>
          <Link href="/representantskapet">Representantskapet</Link>
        </LinkListItem>
        <LinkListItem>
          <Link href="/boligpriser-og-statistikk">
            Boligpriser og statistikk
          </Link>
        </LinkListItem>
        <LinkListItem>
          <Link href="/investor-relations">Investor Relations</Link>
        </LinkListItem>
      </LinkList>
    </LinkListContainer>
    <LinkListContainer layout="grid">
      <Heading level={2}>6 items</Heading>
      <LinkList>
        <LinkListItem>
          <Link href="/konsernledelsen">Konsernledelsen</Link>
        </LinkListItem>
        <LinkListItem>
          <Link href="/styret">Styret</Link>
        </LinkListItem>
        <LinkListItem>
          <Link href="/representantskapet">Representantskapet</Link>
        </LinkListItem>
        <LinkListItem>
          <Link href="/boligpriser-og-statistikk">
            Boligpriser og statistikk
          </Link>
        </LinkListItem>
        <LinkListItem>
          <Link href="/investor-relations">Investor Relations</Link>
        </LinkListItem>
        <LinkListItem>
          <Link href="/digital-arsrapport">Digital årsrapport</Link>
        </LinkListItem>
      </LinkList>
    </LinkListContainer>
    <LinkListContainer layout="grid">
      <Heading level={2}>7 items</Heading>
      <LinkList>
        <LinkListItem>
          <Link href="/konsernledelsen">Konsernledelsen</Link>
        </LinkListItem>
        <LinkListItem>
          <Link href="/styret">Styret</Link>
        </LinkListItem>
        <LinkListItem>
          <Link href="/representantskapet">Representantskapet</Link>
        </LinkListItem>
        <LinkListItem>
          <Link href="/boligpriser-og-statistikk">
            Boligpriser og statistikk
          </Link>
        </LinkListItem>
        <LinkListItem>
          <Link href="/investor-relations">Investor Relations</Link>
        </LinkListItem>
        <LinkListItem>
          <Link href="/digital-arsrapport">Digital årsrapport</Link>
        </LinkListItem>
        <LinkListItem>
          <Link href="/jobb-i-obos">Jobb i OBOS</Link>
        </LinkListItem>
      </LinkList>
    </LinkListContainer>
    <LinkListContainer layout="grid">
      <Heading level={2}>9 items</Heading>
      <LinkList>
        <LinkListItem>
          <Link href="/konsernledelsen">Konsernledelsen</Link>
        </LinkListItem>
        <LinkListItem>
          <Link href="/styret">Styret</Link>
        </LinkListItem>
        <LinkListItem>
          <Link href="/representantskapet">Representantskapet</Link>
        </LinkListItem>
        <LinkListItem>
          <Link href="/boligpriser-og-statistikk">
            Boligpriser og statistikk
          </Link>
        </LinkListItem>
        <LinkListItem>
          <Link href="/investor-relations">Investor Relations</Link>
        </LinkListItem>
        <LinkListItem>
          <Link href="/digital-arsrapport">Digital årsrapport</Link>
        </LinkListItem>
        <LinkListItem>
          <Link href="/jobb-i-obos">Jobb i OBOS</Link>
        </LinkListItem>
        <LinkListItem>
          <Link href="/presse">Presse</Link>
        </LinkListItem>
        <LinkListItem>
          <Link href="/logoer">Logoer</Link>
        </LinkListItem>
      </LinkList>
    </LinkListContainer>
    <LinkListContainer layout="grid">
      <Heading level={2}>10 items</Heading>
      <LinkList>
        <LinkListItem>
          <Link href="/konsernledelsen">Konsernledelsen</Link>
        </LinkListItem>
        <LinkListItem>
          <Link href="/styret">Styret</Link>
        </LinkListItem>
        <LinkListItem>
          <Link href="/representantskapet">Representantskapet</Link>
        </LinkListItem>
        <LinkListItem>
          <Link href="/boligpriser-og-statistikk">
            Boligpriser og statistikk
          </Link>
        </LinkListItem>
        <LinkListItem>
          <Link href="/investor-relations">Investor Relations</Link>
        </LinkListItem>
        <LinkListItem>
          <Link href="/digital-arsrapport">Digital årsrapport</Link>
        </LinkListItem>
        <LinkListItem>
          <Link href="/jobb-i-obos">Jobb i OBOS</Link>
        </LinkListItem>
        <LinkListItem>
          <Link href="/presse">Presse</Link>
        </LinkListItem>
        <LinkListItem>
          <Link href="/logoer">Logoer</Link>
        </LinkListItem>
        <LinkListItem>
          <Link href="/obos-boligkonferanse">OBOS Boligkonferanse</Link>
        </LinkListItem>
      </LinkList>
    </LinkListContainer>
    <LinkListContainer layout="grid">
      <Heading level={2}>15 items</Heading>
      <LinkList>
        <LinkListItem>
          <Link href="/konsernledelsen">Konsernledelsen</Link>
        </LinkListItem>
        <LinkListItem>
          <Link href="/styret">Styret</Link>
        </LinkListItem>
        <LinkListItem>
          <Link href="/representantskapet">Representantskapet</Link>
        </LinkListItem>
        <LinkListItem>
          <Link href="/boligpriser-og-statistikk">
            Boligpriser og statistikk
          </Link>
        </LinkListItem>
        <LinkListItem>
          <Link href="/investor-relations">Investor Relations</Link>
        </LinkListItem>
        <LinkListItem>
          <Link href="/digital-arsrapport">Digital årsrapport</Link>
        </LinkListItem>
        <LinkListItem>
          <Link href="/jobb-i-obos">Jobb i OBOS</Link>
        </LinkListItem>
        <LinkListItem>
          <Link href="/presse">Presse</Link>
        </LinkListItem>
        <LinkListItem>
          <Link href="/logoer">Logoer</Link>
        </LinkListItem>
        <LinkListItem>
          <Link href="/obos-boligkonferanse">OBOS Boligkonferanse</Link>
        </LinkListItem>
        <LinkListItem>
          <Link href="/obos-ligaen">OBOS-ligaen</Link>
        </LinkListItem>
        <LinkListItem>
          <Link href="/datterselskaper">Datterselskaper</Link>
        </LinkListItem>
        <LinkListItem>
          <Link href="/vedtekter">Vedtekter</Link>
        </LinkListItem>
        <LinkListItem>
          <Link href="/generalforsamlingen-i-obos">
            Generalforsamlingen i OBOS
          </Link>
        </LinkListItem>
        <LinkListItem>
          <Link href="/strategi-og-styrende-dokumenter">
            Strategi og styrende dokumenter
          </Link>
        </LinkListItem>
      </LinkList>
    </LinkListContainer>
  </>
);
